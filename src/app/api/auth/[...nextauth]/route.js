import { connectDB } from "@/lib/connectDB";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler = NextAuth({
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    rolling: false,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {  },
        password: {  },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

       

        // Connect to the database
        const db = await connectDB();
        const userCollection = db.collection("users");

        // Find user by email
        const currentUser = await userCollection.findOne({ email });
        if (!currentUser) {
          throw new Error("User not found");
        }

        // Compare provided password with the hashed password in the database
        const passwordMatched = bcrypt.compareSync(password, currentUser.password);
        if (!passwordMatched) {
          throw new Error("Incorrect password");
        }

        // Return the user data
        return {
          id: currentUser._id,
          name: currentUser.name,
          email: currentUser.email,
          role: currentUser.role || "user", 
        };
      },
    }),
  ],
  pages: {
    signIn: "/login", // Custom login page
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user details to the token after successful login
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role || "user";
      }
      return token;
    },
    async session({ session, token }) {
      // Add token data to the session
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
