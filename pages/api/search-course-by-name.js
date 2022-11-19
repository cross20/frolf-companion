import { searchCourseByName } from "../../lib/prisma";

export default async function handler(req, res) {
    const body = req.body;

    const courses = await searchCourseByName(body.name);

    res.status(200).json({ courses });
}