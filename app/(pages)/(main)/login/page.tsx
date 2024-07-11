'use client';
import { useFormState } from 'react-dom';
import { loginAction } from './actions/login-action';
import Link from 'next/link';

export default function LoginPage() {
  const [state, formAction] = useFormState(loginAction, {
    emailError: false,
    passwordError: false,
    formError: false,
  });

  return (
    <main className="w-full min-h-screen h-full pt-32 flex justify-center">
      <form
        action={formAction}
        className="bg-white p-4 h-fit rounded-md border border-accent w-fit min-w-[400px] flex flex-col gap-4"
      >
        <div className="login-wrapper">
          <label htmlFor="email" className="login-label">
            Email
          </label>
          <input
            className={`login-input`}
            type="text"
            name="email"
            id="email"
            placeholder="john.smith@gmail.com"
          />
          {state.emailError && <p className="login-error">Email is required</p>}
        </div>
        <div className="login-wrapper">
          <label htmlFor="password" className="login-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="login-input"
            placeholder="********"
          />
          {state.passwordError && (
            <p className="login-error">Password is required</p>
          )}
        </div>

        {state.formError && (
          <p className="login-error">
            Oops, something went wrong! Try again later, or contact our{' '}
            <Link
              className="font-medium text-accent"
              href="mailto:maciej@zenithstrategy.ai"
              target="_blank"
            >
              support team
            </Link>
          </p>
        )}
        <button
          type="submit"
          className="flex items-center justify-center py-2 bg-accent rounded-lg transition-opacity hover:opacity-80 text-white w-full "
        >
          Submit
        </button>
      </form>
    </main>
  );
}
