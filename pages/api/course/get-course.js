export function getCourse(id) {
    // TODO: retrieve course from database.

    const course = {
        id: id,
        name: 'Whitworth University',
    }

    return course;
}

export default function handler(req, res) {
    const method = 'POST';
    
    if (req.method.toUpperCase() !== method.toUpperCase()) {
        res.status(405).send({ message: `Invalid request method: ${req.method}. Only ${method} requests are allowed.`})
    }

    const body = req.body;

    if (body.id === undefined) {
        res.status(400).send({ message: `Request body must contain an 'id' property.`});
    }
    
    res.status(200).json(getCourse(body.id));
}