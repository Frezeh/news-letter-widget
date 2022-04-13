export default async function handler(req, res) {

    const { firstname, lastname, email } = req.body;
    if (!firstname || !lastname || !email) {
        return res.status(400).json({
            error: "Forgot to add your email?",
        });
    }

    // Construct req data
    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };

    const postData = JSON.stringify(data);
    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const LIST_ID = process.env.MAILCHIMP_LIST_ID;
    const DATACENTER = API_KEY.split("-")[1];
    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;
    const base64ApiKey = Buffer.from(`anystring:${API_KEY}`).toString("base64");
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${base64ApiKey}`,
            },
            body: postData
        })

        // Success
        return res.status(201).json({ error: null });
    } catch (error) {
        return res.status(400).json({
            error: `Oops, something went wrong... Send me an email at ezehfrank87@gmail.com and I'll add you to the list.`,
        });
    }
}