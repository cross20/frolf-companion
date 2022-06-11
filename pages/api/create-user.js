import { createUser } from "../../lib/prisma";

export default async function handler(req, res) {
    console.log('success', req.body);

    const body = req.body;

    console.log('username', body.email);

    const user = await createUser(body.email, body.firstName, body.lastName, body.password, null);

    res.status(201).json({user}); 
}