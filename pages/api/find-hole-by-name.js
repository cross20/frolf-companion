import { findHoleByName } from "../../lib/prisma";

export default async function handler(req, res) {
    const body = req.body;

    const hole = await findHoleByName(body.courseId, body.name);

    res.status(200).json({hole});
}