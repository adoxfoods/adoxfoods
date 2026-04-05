import { createClient } from '@supabase/supabase-js';

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

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, phone, email, delivery, items, total } = req.body;

        // Validate
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

        // Save to Supabase
        const { error } = await supabase.from('orders').insert({
            order_id: orderId,
            name,
            phone,
            email,
            delivery,
            items,
            total,
            status: 'pending'
        });

        if (error) throw error;

        return res.status(200).json({ success: true, orderId });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}