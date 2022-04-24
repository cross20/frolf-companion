import { getHole } from "../../../lib/database/redis";

export default async function handler(req, res) {
    const method = 'POST';
    
    if (req.method.toUpperCase() !== method.toUpperCase()) {
        res.status(405).send({ message: `Invalid request method: ${req.method}. Only ${method} requests are allowed.`})
    }

    const body = req.body;
    if (body === undefined) {
        res.status(400).send({ message: `Request must contain a body.`});
    }

    const entityId = 'entityId';
    if (body[entityId] === undefined) {
        res.status(400).send({ message: `Body must contain an '${entityId}' property.`});
    }
    
    res.status(200).json(await getHole(body[entityId]));
}