const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
    const { items, email } = req.body

    const transformedItem = items.map(item => ({
        description: item.description,
        quantity: 1,
        price_data: {
            currency: 'eur',
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                images: [item.image]
            },
        }
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_rates: ['shr_1JQB5rLeVVHKDG4tkDXQO9vm'],
        shipping_address_collection: {
            allowed_countries: ['BD', 'GB', 'CA', 'IN', 'NL']
        },
        line_items: transformedItem,
        mode: 'payment',
        success_url: `${process.env.HOST}/seccess`,
        cancel_url: `${process.env.HOST}/failed`,
        metadata: {
            email,
            images: JSON.stringify(items.map(item => item.image)),
            titles: JSON.stringify(items.map(item => item.title))
        }
    })

    res.status(200).json({ id: session.id })
}