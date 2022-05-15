// _app.tsx

import { SessionProvider } from 'next-auth/react';

const MyApp = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
