// import bcrypt from "bcryptjs";
// import NextAuth from "next-auth"
// import { ZodError } from "zod";
// import Credentials from "next-auth/providers/credentials"

// import { signInSchema } from "@/app/lib/zod";
// import { authConfig } from "@/auth.config";
// import query from "./app/lib/mysql";

// const login = async (credentials: { username: string, password: string }) => {
//     try {
//         // const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
//         const user = await query("SELECT * FROM users WHERE Name = ?", [credentials.username]);
//         if (!user) throw new Error("Wrong credentials!");
//         console.log('user is find', user);
//         const isPasswordCorrect = await bcrypt.compare(
//             credentials.password,
//             user.password
//         );
//         console.log('password is matched', isPasswordCorrect);
//         if (!isPasswordCorrect) throw new Error("Wrong credentials!");
//         return user;
//     } catch (error) {
//         console.error('Failed to fetch user:', error);
//         throw new Error('Failed to fetch user.');
//     }
// }

// export const { handlers, signIn, signOut, auth } = NextAuth({
//     ...authConfig,
//     providers: [
//         Credentials({
//             credentials: {
//                 username: {},
//                 password: {},
//             },
//             authorize: async (credentials) => {
//                 try {
//                     const validCredentials = await signInSchema.parseAsync(credentials)
//                     console.log(validCredentials);

//                     const user = await login(validCredentials);
//                     alert('User Login Successfull')
//                     return user
//                 } catch (error) {
//                     if (error instanceof ZodError) {
//                         // Return `null` to indicate that the credentials are invalid
//                         return null
//                     }
//                 }
//             },
//         }),
//     ],
//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) {
//                 token.username = user.username;
//                 token.img = user.img;
//             }
//             // console.log(token);

//             return token;
//         },
//         async session({ session, token }) {
//             if (token) {
//                 session.user.username = token.username;
//                 session.user.img = token.img;
//             }
//             return session;
//         },
//     }
// })

// declare module "next-auth" {
//     interface User {
//         username: string;
//         img: string;
//     }
//     interface Session {
//         user: {
//             username: string | any;
//             img: string | any
//         }
//     }
// }