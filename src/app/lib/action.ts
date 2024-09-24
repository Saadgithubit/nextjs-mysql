'use server';

import { signIn } from '@/auth';
import User from '@/models/Users';
import { AuthError } from 'next-auth';
import { NextResponse } from 'next/server';

// ...

export async function authenticate(formData: {}) {
    // console.log('receive form', formData);

    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function getAllUsers() {
    const users = await User.findAll();
    return {users}
}

export async function addUser(name:string) {
    console.log(name);
    try {
        const newUser = await User.create({ name });
        return NextResponse.json({status:200,message:'User Add Successfull',newUser})
    } catch (error) {
        console.error('Error creating user:', error);
    }
}