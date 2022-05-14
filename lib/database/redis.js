import { Client, Entity, Schema, Repository } from 'redis-om';

const client = new Client();

// Connect to client
async function connect() {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL);
        console.log(process.env.REDIS_URL);
        console.log(await client.execute(['PING']));
    }
}

class Hole extends Entity {}
const hole = new Schema(Hole, {
        courseId: { type: 'number' },
        sequence: { type: 'number' },
        name: { type: 'string' },
        point: { type: 'point' },
    },
    {
        dataStructure: 'JSON',
    }
);

// Create
export async function createHole(newHole) {
    await connect();

    const repository = client.fetchRepository(hole);
    const holeEntity = repository.createEntity(newHole);
    const id = await repository.save(holeEntity);

    await repository.expire(holeEntity.entityId, 60 * 5); // Expire after 5 minutes.

    return id;
}

// Index
export async function holeIndex() {
    await connect();

    const repository = client.fetchRepository(hole);
    await repository.createIndex();
}

// Get
export async function getHole(entityId) {
    await connect();

    const repository = client.fetchRepository(hole);

    const data = await repository.fetch(entityId);

    return JSON.parse(JSON.stringify(data));
}

export async function getHoles(courseId) {
    await connect();

    const repository = client.fetchRepository(hole);

    await createHole({
        courseId: 0,
        name: 'temp',
        sequence: 0,
        point: { latitude: 0, longitude: 0 }
    });
    await holeIndex();

    const data = await repository.search()
        //.where('courseId').equals(courseId)
        .return.all();
        
    return JSON.parse(JSON.stringify(data));
}