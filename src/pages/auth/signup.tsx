// /c:/Users/Sumitha/Downloads/Desktop/BlogApplication/application/src/pages/auth/signup.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './signin.module.css';
import Link from 'next/link';
import Image from 'next/image';

const Signup: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      if (!email || !password) {
          setError('Email and password are required');
          return;
      }
  
      setError('');
   
      try {
          const response = await fetch('/api/auth/signup', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
          });
  
          if (!response.ok) {
              const data = await response.json();
              setError(data.error || 'Something went wrong');
              return;
          }
  
          // Navigate to signin page
          router.push('/auth/signin');
      } catch (error) {
          setError('An unexpected error occurred' + error);
      }
  };
  

    return (
      <>
        <section className="bg-gray-50 dark:bg-gray-900">
        <div  className={styles.formcontainer}>

        <div className={styles.logo}>
          <Image className={styles.image} src="/logo.jpg" alt="logo" width={25} height={25} /> <b className={styles.title}>BLOGIEE</b>
      </div>

            <div className={styles.innerconatiner}>
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create your account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                  </div> <br />
                  <div>
                    <label htmlFor="Password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
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
                  </div> <br />
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className={styles.pass}>
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        />
                     
                        <div className={styles.pass}>
                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label> 
                       <a  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a> </div>
                       </div>
                    </div>
                  </div> 
                  {error && <div className="text-red-500">{error}</div>} <br />
                  <button
                    type="submit"
                    className={styles.buttons}>
                    Sign up
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  <Link href="/auth/signin">Continue to Sign in</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
    </>);
};

export default Signup;