import { createHole } from "../../../lib/database/redis";

export default async function handler(req, res) {
    const id = await createHole(req.body);
    
    res.status(200).json({ id });
}