import { findHoles } from "../../lib/prisma";

export default async function handler(req, res) {
    const body = req.body;

    const holes = await findHoles(body.courseId);

    res.status(200).json({holes});
}