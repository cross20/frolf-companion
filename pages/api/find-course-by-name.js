import { findCourseByName } from "../../lib/prisma";

export default async function handler(req, res) {
    const body = req.body;

    const course = await findCourseByName(body.name);

    res.status(200).json({ course });
}