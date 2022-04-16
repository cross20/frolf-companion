import { Client, Entity, Schema } from 'redis-om';

const client = new Client();

// Connect to client
async function connect() {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL);
        console.log(await client.execute(['PING']));
    }
}

// Create entities (tables)
class Test extends Entity {}
let schema = new Schema(
    Test,
    {
        name: { type: 'string' },
        description: { type: 'text', textSearch: true },
    },
    {
        dataStructure: 'JSON',
    }
);

export async function createData(data) {
    await connect();

    const repository = client.fetchRepository(schema);

    const test = repository.createEntity(data);

    const id = await repository.save(test);

    return id;
}

export async function createIndex() {
    await connect();

    const repository = client.fetchRepository(schema);
    await repository.createIndex();
}

export async function searchData(q) {
    await connect();

    const repository = client.fetchRepository(schema);

    const test = await repository.search()
      .where('name').eq(q)
      .or('description').matches(q)
      .return.all();

    return test;
}