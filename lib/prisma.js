import { PrismaClient } from '@prisma/client';

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