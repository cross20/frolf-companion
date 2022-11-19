import { findHole } from "../../lib/prisma";

export default async function handler(req, res) {
    const body = req.body;

    const hole = await findHole(body.holeId);

    res.status(200).json({hole});
}