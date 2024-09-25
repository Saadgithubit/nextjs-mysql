'use server';

// import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { NextResponse } from 'next/server';

// ...

// export async function authenticate(formData: {}) {
//     // console.log('receive form', formData);

//     try {
//         await signIn('credentials', formData);
//     } catch (error) {
//         if (error instanceof AuthError) {
//             switch (error.type) {
//                 case 'CredentialsSignin':
//                     return 'Invalid credentials.';
//                 default:
//                     return 'Something went wrong.';
//             }
//         }
//         throw error;
//     }
// }
