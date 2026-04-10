module.exports.config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb'
        }
    }
};
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

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
        const { name, phone, email, delivery, items, total, screenshot_base64, screenshot_mime } = req.body;

        if (!name || !phone || !email || !delivery || !items || !total) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Generate unique order ID
        let orderId;
        let isUnique = false;
        while (!isUnique) {
            orderId = generateOrderId();
            const { data } = await supabase
                .from('orders')
                .select('order_id')
                .eq('order_id', orderId)
                .single();
            if (!data) isUnique = true;
        }

        // Upload screenshot
        let screenshot_url = null;
        if (screenshot_base64 && screenshot_mime) {
            const base64Data = screenshot_base64.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');
            const ext = screenshot_mime.split('/')[1] || 'png';
            const fileName = `${orderId}.${ext}`;

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('screenshots')
                .upload(fileName, buffer, { contentType: screenshot_mime, upsert: true });

            if (uploadError) {
                // Return the upload error so we can see it
                return res.status(500).json({
                    error: 'Screenshot upload failed: ' + uploadError.message,
                    details: uploadError
                });
            }

            const { data: urlData } = supabase.storage
                .from('screenshots')
                .getPublicUrl(fileName);
            screenshot_url = urlData.publicUrl;
        }

        // Save order
        const { error } = await supabase.from('orders').insert({
            order_id: orderId,
            name,
            phone,
            email,
            delivery,
            items,
            total,
            status: 'pending',
            screenshot_url
        });

        if (error) throw error;

        return res.status(200).json({ success: true, orderId, screenshot_url });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};