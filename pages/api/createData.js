import { createData } from '../../lib/redis';

export default async function handler(req, res) {
    const id = await createData(req.body);
    res.status(200).json({ id });
}