import { searchData } from "../../lib/redis";

export default async function handler(req, res) {
    const q = req.query.q;
    const test = await searchData(q);
    res.status(200).json({ test });
}