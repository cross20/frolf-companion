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

/**
 * Retrieve a course based on its name.
 * @param {string} name name used to identify the course.
 * @returns the course, if found.
 */
export async function findCourseByName(name) {
  return await prisma.course.findUnique({
    where: {
      name: name,
    },
  });
}

/**
 * Adds a new hole to the database.
 * @param {string} name name used to identify the hole.
 * @param {string} description details about the hole.
 * @param {number} index position of the hole relative to other holes in the course.
 * @param {json} start location where the Frisbee if first thrown from.
 * @param {json} stop location to target when throwing the Frisbee.
 * @param {string} courseId id of the course that contains the hole.
 * @param {string} authorId id of the user that created the hole.
 * @returns the new hole that was created.
 */
export async function createHole(name, description, index, start, stop, courseId, authorId) {
  return await prisma.hole.create({
    data: {
      name: name,
      description: description,
      index: index,
      start: start,
      stop: stop,
      courseId: courseId,
      authorId: authorId,
    },
  });
}

/**
 * Retrieves a hole.
 * @param {string} id hole id.
 * @returns the hole, if found.
 */
export async function findHole(id) {
  return await prisma.hole.findUnique({
    where: {
      id: id,
    },
  });
}