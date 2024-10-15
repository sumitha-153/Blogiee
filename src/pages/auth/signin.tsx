

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import styles from './signin.module.css';
import Image from 'next/image';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });     

      if (result && result.error === "CredentialsSignin") {
        setError("User does not exist(Please sign up)");
      } else {
        router.push('/blogs/blog');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError('An unexpected error occurred: ' + err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    
    <div>
   
    <section className="bg-gray-50 dark:bg-gray-900">
      <div  className={styles.formcontainer}>

        <div className={styles.logo}>
          <Image className={styles.image} src="/logo.jpg" alt="logo" width={25} height={25} /> <b className={styles.title}>BLOGIEE</b>
      </div>

        <div className={styles.innerconatiner}>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form  onSubmit={handleSubmit}>
              <div>
                <label htmlFor="Email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input
                 className={styles.inputs}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                 className={styles.inputs}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <div className={styles.error}>{error}</div>} <br />
              <button
                type="submit"
                className={styles.buttons}
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <Link href="/auth/signup">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
    </div>
    
  );
};

export default SignIn;