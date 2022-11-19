import { createUser } from "../../lib/prisma";

export default async function handler(req, res) {
    const body = req.body;

    const user = await createUser(body.email, body.firstName, body.lastName, body.password, null);

    res.status(201).json({user}); 
}