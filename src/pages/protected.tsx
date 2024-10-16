import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

const ProtectedPage = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn();
    }
  }, [status]);

  console.log('session:', session);
  
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated') {
    return <div>Welcome!</div>;
  }

  return null;
};

export default ProtectedPage;