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
        const supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_SERVICE_KEY, { auth: { autoRefreshToken: false, persistSession: false } }
        );

        const { name, phone, email, delivery, items, total, screenshot_base64, screenshot_mime } = req.body;

        if (!name || !phone || !email || !delivery || !items || !total) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Generate unique order ID
        let orderId;
        let isUnique = false;
        while (!isUnique) {
            orderId = generateOrderId();
            const { data } = await supabase.from('orders').select('order_id').eq('order_id', orderId).single();
            if (!data) isUnique = true;
        }

        // Upload screenshot to Supabase Storage
        let screenshot_url = null;
        if (screenshot_base64 && screenshot_mime) {
            try {
                const base64Data = screenshot_base64.replace(/^data:image\/\w+;base64,/, '');
                const buffer = Buffer.from(base64Data, 'base64');
                const ext = screenshot_mime.split('/')[1] || 'jpeg';
                const fileName = `${orderId}.${ext}`;

                const { error: uploadError } = await supabase.storage
                    .from('screenshots')
                    .upload(fileName, buffer, { contentType: screenshot_mime, upsert: true });

                if (!uploadError) {
                    const { data: urlData } = supabase.storage.from('screenshots').getPublicUrl(fileName);
                    screenshot_url = urlData.publicUrl;
                } else {
                    console.log('Screenshot upload error:', uploadError.message);
                }
            } catch (e) {
                console.log('Screenshot error (non-fatal):', e.message);
            }
        }

        // Save order to Supabase
        const { error: insertError } = await supabase.from('orders').insert({
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

        if (insertError) throw insertError;

        // ===== ADD CUSTOMER TO BREVO =====
        try {
            const firstName = name.split(' ')[0];
            const lastName = name.split(' ').slice(1).join(' ') || '';

            const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
                method: 'POST',
                headers: {
                    'api-key': process.env.BREVO_API_KEY,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    attributes: {
                        FIRSTNAME: firstName,
                        LASTNAME: lastName,
                        SMS: phone,
                        LAST_ORDER_ID: orderId
                    },
                    listIds: [7],
                    updateEnabled: true
                })
            });

            const brevoText = await brevoRes.text();
            console.log('Brevo status:', brevoRes.status);
            console.log('Brevo response text:', brevoText);

        } catch (brevoErr) {
            console.log('Brevo error (non-fatal):', brevoErr.message);
        }
        // ===== END BREVO =====
        return res.status(200).json({ success: true, orderId, screenshot_url });

    } catch (err) {
        console.log('Error:', err.message);
        return res.status(500).json({ error: err.message });
    }
};