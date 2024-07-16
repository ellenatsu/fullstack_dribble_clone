import { connectDB } from '@/lib/mongodb';
import { UserModel } from '@/models/user.model';
import NextAuth, { NextAuthOptions, Session, User} from 'next-auth';
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";


export const authOptions : NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt:{
    secret: process.env.JWT_SECRET!,
  },
  //callback to control what happens when an action is performed
  callbacks:{
    //Use the SignIn Callback to Save Custom User Data
    async signIn({ user}) {
        
          const { name, email, image } = user;
          try {
            await connectDB();
            const userExists = await UserModel.findOne({ email });
  
            if (!userExists) {
              const newUser = new UserModel({
                name,
                email,
                avatarUrl: image,
                // Add any additional fields you need here
                description: '',
                githubUrl: '',
                linkedinUrl: '',
                likedProjectIds: [],
              });
              await newUser.save();
            }
          } catch (error) {
            console.log(error);
            return false;
          
        }
        return true;
      },
    //session callback is called whenever a session is checked
      async session({ session, token}: { session: Session; token: JWT }): Promise<Session> {
        if (token?.id && session.user) {
          session.user.id = token.id as string;
        }
        return session
      },
    //called whenever a JSON Web Token is created (i.e. at sign in) or updated (i.e whenever a session is accessed in the client). 
    //The returned value will be encrypted, and it is stored in a cookie.
      async jwt({ token, user } : { token: JWT; user?: User }): Promise<JWT> {
        if (user) {
            token.id = user.id;
          }
        return token
      }
  }
}


export default NextAuth(authOptions);
