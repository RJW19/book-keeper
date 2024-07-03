import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import User from "/app/models/user";
import { connectToDB } from "/utils/database";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await connectToDB();
        const user = await User.findOne({
          username: credentials.username,
        });

        if (!user) {
          throw new Error("Invalid username or password");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Invalid username or password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      await connectToDB();
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // Log the profile information for debugging
        console.log("Profile information received:", profile);

        // Fallback checks for profile fields
        const email = profile?.email || user?.email;
        const name = profile?.name || user?.name || "Unknown";
        const picture =
          profile?.picture || user?.image || "/default-profile.png";

        // Check if profile contains the required fields
        if (!email) {
          throw new Error("Profile information is incomplete");
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });

        // If not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email,
            username: name.replace(" ", "").toLowerCase(),
            image: picture,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists:", error.message);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      // Ensure that the user is redirected to the sign-up page if needed
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
