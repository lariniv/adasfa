'use server';

import { api } from '@/app/api/axios-config';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const loginAction = async (
  prevState: {
    emailError: boolean;
    passwordError: boolean;
    formError: boolean;
  },
  formData: FormData
): Promise<{
  emailError: boolean;
  passwordError: boolean;
  formError: boolean;
}> => {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email) {
    prevState.emailError = true;
  }
  if (!password) {
    prevState.passwordError = true;
  }

  if (prevState.emailError || prevState.passwordError) {
    return prevState;
  }

  try {
    const res = await api.post('/auth/login', {
      email,
      password,
    });
    cookies().set('_at', res.data._at, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });
    cookies().set('_rt', res.data._rt, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });
  } catch (error) {
    console.error(error);
    return {
      emailError: false,
      passwordError: false,
      formError: true,
    };
  }

  revalidatePath('/posts');
  redirect('/platform');
};
