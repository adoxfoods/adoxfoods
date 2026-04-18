const { createClient } = require('@supabase/supabase-js');
 
module.exports.config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
};
 
function generateOrderId() {
  const year = new Date().getFullYear();
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let random = '';
  for (let i = 0; i < 6; i++) {
    random += chars[Math.floor(Math.random() * chars.length)];
  }
  return `ADX-${year}-${random}`;
}
 
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
 
  try {
    console.log('=== CREATE ORDER START ===');
    console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'SET' : 'MISSING');
    console.log('SUPABASE_SERVICE_KEY:', process.env.SUPABASE_SERVICE_KEY ? 'SET' : 'MISSING');
 
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );
 
    const { name, phone, email, delivery, items, total, screenshot_base64, screenshot_mime } = req.body;
 
    console.log('screenshot_base64 received:', !!screenshot_base64);
    console.log('screenshot_base64 length:', screenshot_base64 ? screenshot_base64.length : 0);
    console.log('screenshot_mime:', screenshot_mime);
 
    if (!name || !phone || !email || !delivery || !items || !total) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
 
    // Generate order ID
    let orderId;
    let isUnique = false;
    while (!isUnique) {
      orderId = generateOrderId();
      const { data } = await supabase.from('orders').select('order_id').eq('order_id', orderId).single();
      if (!data) isUnique = true;
    }
    console.log('Order ID:', orderId);
 
    // Upload screenshot
    let screenshot_url = null;
 
    if (screenshot_base64 && screenshot_mime) {
      console.log('Starting upload...');
 
      // List buckets to confirm access
      const { data: buckets, error: bucketErr } = await supabase.storage.listBuckets();
      console.log('Buckets found:', buckets ? buckets.map(b => b.name).join(', ') : 'none');
      if (bucketErr) console.log('Bucket error:', bucketErr.message);
 
      const base64Data = screenshot_base64.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const ext = screenshot_mime.split('/')[1] || 'png';
      const fileName = `${orderId}.${ext}`;
 
      console.log('File name:', fileName);
      console.log('Buffer size:', buffer.length, 'bytes');
 
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('screenshots')
        .upload(fileName, buffer, { contentType: screenshot_mime, upsert: true });
 
      if (uploadError) {
        console.log('UPLOAD ERROR:', JSON.stringify(uploadError));
      } else {
        console.log('Upload success:', JSON.stringify(uploadData));
        const { data: urlData } = supabase.storage.from('screenshots').getPublicUrl(fileName);
        screenshot_url = urlData.publicUrl;
        console.log('Public URL:', screenshot_url);
      }
    } else {
      console.log('No screenshot in request body');
    }
 
    // Save order
    const { error: insertError } = await supabase.from('orders').insert({
      order_id: orderId, name, phone, email, delivery, items, total,
      status: 'pending', screenshot_url
    });
 
    if (insertError) throw insertError;
 
    console.log('=== ORDER SAVED SUCCESSFULLY ===');
    return res.status(200).json({ success: true, orderId, screenshot_url });
 
  } catch (err) {
    console.log('FATAL ERROR:', err.message);
    return res.status(500).json({ error: err.message });
  }
};