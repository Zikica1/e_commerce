'use client';
import styles from './LoginForm.module.css';
import { useActionState } from 'react';
import { loginUser } from '@/lib/action/auth/loginUser';
import { FormState } from '../../../types';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import LogoutButton from '../LogoutButton';

const initialState: FormState = {
  success: false,
  errors: {},
};

const Auth = () => {
  const [state, formAction] = useActionState(loginUser, initialState);

  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/';

  return (
    <section className='text-white w-full min-h-screen grid place-items-center'>
      <div className='bg-[rgb(30,41,57)] w-full max-w-105 p-[1.5em] rounded-2xl'>
        {state.errors?.form && <p>{state.errors.form[0]}</p>}
        <form
          action={formAction}
          key={state.success ? 'reset' : 'form'}
          className={`${styles.formRegister} rounded-2xl`}
        >
          <input type='hidden' name='from' value={from} />
          <label htmlFor='password'>Password:</label>
          <input type='password' name='password' id='password' required />
          {state.errors?.password && <p>{state.errors.password[0]}</p>}
          <label htmlFor='email'>Email:</label>
          <input type='email' name='email' required />

          {state.errors?.email && <p>{state.errors.email[0]}</p>}
          <button className='w-full text-black bg-white rounded-[10px] p-2 hover:cursor-pointer transition-all'>
            Sign in
          </button>
          <div className='flex gap-2 justify-start items-center my-[1em]'>
            <input
              className='size-5'
              type='checkbox'
              name='remember'
              id='remember'
              value='true'
            />
            <label
              className='text-sm font-medium font-[inherit]'
              htmlFor='persist'
            >
              Remember me
            </label>
          </div>
        </form>
        <p className='text-xl'>
          Need an Account?
          <br />
          <span className='my-4 block'>
            <Link className='underline' href='/register'>
              Sign up
            </Link>
          </span>
        </p>
        <LogoutButton />
      </div>
    </section>
  );
};

export default Auth;
