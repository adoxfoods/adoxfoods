import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({ error: 'Token is required' });
        }

        // Find the review with this token
        const { data: review, error } = await supabase
            .from('reviews')
            .select('*, orders(*)')
            .eq('token', token)
            .single();

        if (error || !review) {
            return res.status(404).json({ error: 'Invalid or expired link' });
        }

        // Check if token already used
        if (review.token_used) {
            return res.status(400).json({ error: 'This review link has already been used' });
        }

        return res.status(200).json({
            success: true,
            customer_name: review.customer_name,
            order_id: review.order_id,
        });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}