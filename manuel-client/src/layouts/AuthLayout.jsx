import { Outlet, useLocation } from 'react-router-dom';
import signInBackground from '../assets/signin.png';
import signUpBackground from '../assets/signup.png';

const AuthLayout = () => {
  const { pathname } = useLocation();
  const isSignInPage = pathname === '/sign-in';
  const isSignUpPage = pathname === '/sign-up';
  const authBackground = isSignInPage
    ? signInBackground
    : isSignUpPage
      ? signUpBackground
      : null;

  return (
    <section
      className="min-h-screen text-zinc-900"
      style={
        authBackground
          ? {
              backgroundImage: `linear-gradient(rgba(24, 24, 27, 0.3), rgba(24, 24, 27, 0.3)), url(${authBackground})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }
          : undefined
      }
    >
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
        <div className={authBackground ? 'hidden lg:block' : 'flex items-center justify-center border-b-2 border-zinc-300 bg-zinc-200 p-8 sm:p-10 lg:border-b-0 lg:border-r-2 lg:border-zinc-300 lg:p-16'}>
          {!authBackground && (
            <div className="flex w-full max-w-md items-center justify-center rounded-[2rem] border-2 border-dashed border-zinc-300 bg-zinc-100/60 p-8 sm:p-10">
              <div className="relative aspect-square w-full max-w-[18rem] border-[10px] border-zinc-50/90">
                <span className="absolute left-1/2 top-0 h-full w-2 -translate-x-1/2 rotate-45 bg-zinc-50/90" />
                <span className="absolute left-1/2 top-0 h-full w-2 -translate-x-1/2 -rotate-45 bg-zinc-50/90" />
              </div>
            </div>
          )}
        </div>

        <main
          className={
            authBackground
              ? 'flex items-center px-6 py-10 sm:px-10 lg:px-16'
              : 'flex items-center bg-zinc-50 px-6 py-10 sm:px-10 lg:px-16'
          }
        >
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;
