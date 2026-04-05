import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

function generateToken() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let token = '';
    for (let i = 0; i < 32; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { order_id } = req.body;

        if (!order_id) {
            return res.status(400).json({ error: 'Order ID is required' });
        }

        // Check order exists
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .select('*')
            .eq('order_id', order_id)
            .single();

        if (orderError || !order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Check if review link already exists for this order
        const { data: existing } = await supabase
            .from('reviews')
            .select('token, token_used')
            .eq('order_id', order_id)
            .single();

        if (existing && !existing.token_used) {
            // Return existing unused link
            const link = `${process.env.SITE_URL}/review-form.html?token=${existing.token}`;
            return res.status(200).json({ success: true, link });
        }

        // Generate new token
        const token = generateToken();

        // Save token to reviews table
        const { error } = await supabase.from('reviews').insert({
            order_id,
            token,
            token_used: false,
            customer_name: order.name,
        });

        if (error) throw error;

        const link = `${process.env.SITE_URL}/review-form.html?token=${token}`;
        return res.status(200).json({ success: true, link });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}