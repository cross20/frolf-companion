import { holeIndex } from "../../../lib/database/redis";

export default async function handler(req, res) {
    await holeIndex();
    res.status(200).send('ok');
}