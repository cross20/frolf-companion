import { createCourse } from "../../lib/prisma";

export default async function handler(req, res) {
    const body = req.body;

    const course = await createCourse(body.name, body.description, body.authorId);

    res.status(201).json({course});
}