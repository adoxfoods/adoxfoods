const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { token, rating, review_text } = req.body;

        if (!token || !rating || !review_text) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Rating must be between 1 and 5' });
        }

        // Find review by token
        const { data: review, error: findError } = await supabase
            .from('reviews')
            .select('*')
            .eq('token', token)
            .single();

        if (findError || !review) {
            return res.status(404).json({ error: 'Invalid link' });
        }

        // Check if already used
        if (review.token_used) {
            return res.status(400).json({ error: 'This review link has already been used' });
        }

        // Save review and mark token as used
        const { error: updateError } = await supabase
            .from('reviews')
            .update({
                rating,
                review_text,
                token_used: true,
                is_approved: false,
            })
            .eq('token', token);

        if (updateError) throw updateError;

        return res.status(200).json({
            success: true,
            message: 'Review submitted successfully! It will appear after approval.'
        });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}