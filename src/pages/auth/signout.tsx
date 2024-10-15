import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const SignOut: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        // Clear user session or token here
        localStorage.removeItem('userToken');
        
        // Redirect to home or login page
        router.push('/blogs/blog');
    }, [router]);

    return (
        <div>
            <h1>Signing Out...</h1>
        </div>
    );
};

export default SignOut;