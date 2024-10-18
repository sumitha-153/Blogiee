
// import { SessionProvider } from 'next-auth/react';
// import '../styles/global.css';
// import type { AppProps } from "next/app";
// import  '../pages/blogs/blog.module.css';

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <SessionProvider session={pageProps.session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   );
// }

// export default MyApp;

import '../styles/global.css';
import React from 'react';
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;