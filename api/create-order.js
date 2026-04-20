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
                WHATSAPP: phone,
                LAST_ORDER_ID: orderId,
                DELIVERY_LOCATION: delivery
            },
            listIds: [7],
            updateEnabled: true
        })
    });

    const brevoData = await brevoRes.json();
    console.log('Brevo status:', brevoRes.status);
    console.log('Brevo response:', JSON.stringify(brevoData));

} catch (brevoErr) {
    console.log('Brevo error:', brevoErr.message);
}
// ===== END BREVO =====