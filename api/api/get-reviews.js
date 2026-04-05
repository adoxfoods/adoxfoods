const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

module.exports = async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { data: reviews, error } = await supabase
            .from('reviews')
            .select('id, customer_name, rating, review_text, created_at, order_id')
            .eq('is_approved', true)
            .eq('token_used', true)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return res.status(200).json({ success: true, reviews });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}