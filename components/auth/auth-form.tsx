import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

async function createUser(email: string, password: string): Promise<{ email: string, password: string }> {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

function AuthForm() {
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event: React.FormEvent) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value || '';
    const enteredPassword = passwordInputRef.current?.value || '';

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result.error) {
        router.replace('/projects');
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-14">
      <h1 className="text-2xl font-semibold">
        {isLogin ? 'Login' : 'Sign Up'}
      </h1>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label htmlFor='email' className="block text-gray-600">Your Email</label>
          <input
            type='email'
            id='email'
            required
            ref={emailInputRef}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor='password' className="block text-gray-600">Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col items-center">
          <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg mb-2">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
          <button
            type='button'
            className="text-blue-500 hover:underline"
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create a new account' : 'Login with an existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
