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

/**
 * Converts a string representing an entity into a value that can represent the entity in a URL.
 * @param {string} value Value to convert.
 * @returns Converted value.
 */
function urlName(value) {
  return value.toLowerCase().trim().replace(/\s+/g, '-');
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
      urlName: urlName(name),
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
      urlName: urlName(name),
    },
  });
}

/**
 * Retrieve a course based on a partial match to its name.
 * @param {string} name part of the name used to identify the course.
 * @returns all matching courses, if any are found.
 */
export async function searchCourseByName(name) {
  // TODO: parameter validation.

  return await prisma.course.findMany({
    where: {
      name: {
        search: name, // TODO: figure out how to search on partial word matches.
      },
    },
  });
}

/**
 * Adds a new hole to the database.
 * @param {string} name name used to identify the hole.
 * @param {string} description details about the hole.
 * @param {json} tee location where the Frisbee if first thrown from.
 * @param {json} target location to target when throwing the Frisbee.
 * @param {string} courseId id of the course that contains the hole.
 * @param {string} authorId id of the user that created the hole.
 * @returns the new hole that was created.
 */
export async function createHole(name, description, previousHoleId, tee, teeDescription, target, targetDescription, courseId, authorId) { // TODO: document new parameters.
  return await prisma.hole.create({
    data: {
      name: name,
      urlName: urlName(name),
      description: description,
      previousHoleId: previousHoleId,
      tee: tee,
      teeDescription: teeDescription,
      target: target,
      targetDescription, targetDescription,
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

/**
 * Retrieve a hole based on its name.
 * @param {string} courseId course id.
 * @param {string} name name used to identify the hole.
 * @returns the hole, if found.
 */
export async function findHoleByName(courseId, name) {
  return await prisma.hole.findFirst({
    where: {
      courseId: courseId,
      urlName: urlName(name),
    },
  });
}

/**
 * Retrieves all holes associated with a course.
 * @param {string} courseId course id.
 * @returns the holes associated with the course, if any exist.
 */
export async function findHoles(courseId) {
  return await prisma.hole.findMany({
    where: {
      courseId: courseId,
    },
    include: {
      previousHole: true,
      nextHoles: true,
    },
  });
}

/**
 * Sets the value of the specified attribute for the specified hole.
 * @param {string} id hole id.
 * @param {string} attribute name of attribute to update.
 * @param {*} value new value of attribute.
 * @returns the updated hole.
 */
export async function updateHole(id, attribute, value) {
  return await prisma.hole.update({
    where: {
      id: id,
    },
    data: {
      [attribute]: value,
    },
  });
}