import { createHole } from "../../lib/prisma";

export default async function handler(req, res) {
    const body = req.body;

    const hole = await createHole(body.name, body.description, body.index, body.start, body.stop, body.courseId, body.authorId);

    res.status(201).json({hole});
}