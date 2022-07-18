import { createHole } from "../../lib/prisma";

export default async function handler(req, res) {
    const body = req.body;

    const hole = await createHole(body.name, body.description, body.previousHoleId, body.tee, body.teeDescription, body.target, body.targetDescription, body.courseId, body.authorId);

    res.status(201).json({hole});
}