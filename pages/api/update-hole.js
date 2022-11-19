import { updateHole } from "../../lib/prisma";

export default async function handler(req, res) {
    const body = req.body;

    const updatedHole = await updateHole(body.id, body.attribute, body.value);

    res.status(200).json({updatedHole});
}