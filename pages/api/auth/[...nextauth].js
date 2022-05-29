import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import { findUser } from '../../../lib/prisma';
import { compare, hash } from '../../../lib/bcrypt';

const authHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  pages: {
    signIn: "/auth/signin", // TODO: implement custom pages.
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Email", type: "email" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        console.log('credentials', credentials);

        if (credentials.username) {
          const user = await findUser(credentials.username);

          console.log('user', user);

          if (credentials.password && await compare(credentials.password, await hash(credentials.password))) {
            console.log('authenticated');

            return user;
          }
        }

        console.log('not authenticated');

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log('url', url);
      console.log('baseUrl', baseUrl);
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
  },
  jwt: {
    secret: process.env.SECRET,
    encryption: true,
  },
  secret: process.env.SECRET,
};