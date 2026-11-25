'use client';

import styles from './RegisterForm.module.css';
import { useActionState } from 'react';
import { registerUser } from '@/lib/action/auth/registerUser';
import { FormState } from '../../../types';

const initialState: FormState = {
  success: false,
  errors: {},
};

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const [state, formAction] = useActionState(registerUser, initialState);

  return (
    <section className='text-white w-full min-h-screen grid place-items-center'>
      <div className='bg-[rgb(30,41,57)] w-full max-w-105 p-[1.5em] rounded-2xl'>
        <h1 className='text-[33px] mbe-[0.5em]'>Register</h1>
        <form
          className={styles.formRegister}
          action={formAction}
          key={state.success ? 'reset' : 'form'}
        >
          <label htmlFor='text'> Username</label>
          <input name='username' type='username' pattern={USER_REGEX.source} />

          {state.errors?.username && <p>{state.errors.username[0]}</p>}
          <label htmlFor='email'>Email</label>
          <input name='email' type='email' />

          {state.errors?.email && <p>{state.errors.email[0]}</p>}
          <label htmlFor='password'>Password</label>
          <input name='password' type='password' pattern={PWD_REGEX.source} />

          {state.errors?.password && <p>{state.errors.password[0]}</p>}
          <button
            className='bg-white text-black px-3 py-0.5 rounded-lg cursor-pointer'
            type='submit'
          >
            Register
          </button>
          {state.errors?.form && <p>{state.errors.form}</p>}
          {state.success && <p>Successful registration</p>}
        </form>
      </div>
    </section>
  );
};

export default Register;
