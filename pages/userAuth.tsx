import { useSession, signOut } from 'next-auth/react';

// after authorization, user gets redirected to this page by default
// this probably has to be changed, but can be used for testing purposes for now
export default function UserAuth() {
  const { data: session, status } = useSession();

  // status is either loading, authenticated, or unauthenticated
  console.log('status:', status);

  // session is either null or a session object
  console.log('session:', session);

  return (
    <>
      <h1>Test page</h1>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
}