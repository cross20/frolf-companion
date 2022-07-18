import { findHoles } from "../../lib/prisma";

export default async function handler(req, res) {
    const body = req.body;

    const holes = await findHoles(body.courseId);

    res.status(200).json({holes: holes.sort((first, second) => {
        return compareHoles(first, second);
    })});
}

/**
 * Helper function for sorting holes.
 * @param {object} first first hole to compare.
 * @param {object} second second hole to compare.
 * @returns result to be used in the Array.sort() function.
 */
 export function compareHoles(first, second) {
    if (!first.previousHole || first.previousHole.id === second.id) {
        return 1;
    } else if (!second.previousHole || second.previousHole.id === first.id) {
        return -1;
    } else {
        return 0;
    }
}