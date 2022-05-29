import bcrypt from 'bcrypt'

/**
 * Number of rounds to use when creating a hash. The number of iterations the hash module will process is determined by raising two to the number of rounds.
 */
const saltRounds = 10;

/**
 * Encrypt a value.
 * @param {string} plaintext Value to encrypt.
 * @returns Encrypted value.
 */
export async function hash(plaintext) {
    const hash = await bcrypt.hash(plaintext, saltRounds);

    return hash;
}

/**
 * Determine if a plaintext value matches a hashed value or not.
 * @param {string} plaintext Value to encrypt.
 * @param {string} hash Value to compare against.
 * @returns Whether the two values match or not.
 */
export async function compare(plaintext, hash) {
    const result = await bcrypt.compare(plaintext, hash);

    return result;
}