import { PrismaClient } from '@prisma/client';
import { hash } from './bcrypt.js';

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;

/**
 * Adds a new user to the database.
 * @param {string} email email address the user will sign in with.
 * @param {string} firstName user's first name.
 * @param {string} lastName user's last name.
 * @param {string} password plaintext password the user will sign in with.
 * @param {*} image url linking to an image the user will use as their avatar.
 * @returns new user that was created.
 */
export async function createUser(email, firstName, lastName, password, image) {
  return await prisma.user.create({
    data: {
      email: email,
      name: `${firstName} ${lastName}`,
      password: await hash(password),
      image: image,
    },
  });
}

/**
 * Retrieve a user.
 * @param {string} email email address belonging to the user.
 * @returns the user, if found.
 */
export async function findUser(email) {
  return await prisma.user.findUnique({
    where: {
      email: email,
    }
  });
}

/**
 * Adds a new course to the database.
 * @param {string} name name used to identify the course.
 * @param {string} description details about the course.
 * @param {string} authorId id of the user that created the course.
 * @returns the new course that was created.
 */
export async function createCourse(name, description, authorId) {
  return await prisma.course.create({
    data: {
      name: name,
      description: description,
      authorId: authorId,
    },
  });
}

/**
 * Retrieve a course.
 * @param {string} id course id.
 * @returns the course, if found.
 */
export async function findCourse(id) {
  return await prisma.course.findUnique({
    where: {
      id: id,
    },
  });
}