import { Link } from 'react-router-dom';

const SignInPage = () => {
  return (
    <div className="rounded-[2rem] border-2 border-zinc-900/10 bg-white p-8 shadow-[0_20px_60px_rgba(24,24,27,0.08)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#25754A]">
        Welcome Back
      </p>
      <h1 className="mt-3 text-3xl font-bold text-zinc-900">Sign in to DinoWorld</h1>
      <p className="mt-4 text-sm leading-7 text-zinc-600">
        Access your account to continue exploring dinosaur stories, discoveries, and saved reads.
      </p>

      <form className="mt-8 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-zinc-800">Email</span>
          <input
            type="email"
            className="w-full rounded-2xl border-2 border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[#25754A] focus:bg-white"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-zinc-800">Password</span>
          <input
            type="password"
            className="w-full rounded-2xl border-2 border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[#25754A] focus:bg-white"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-full border-2 border-[#25754A] bg-[#25754A] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-[#1E5D3B]"
        >
          Sign In
        </button>
      </form>

      <p className="mt-6 text-sm text-zinc-600">
        Don&apos;t have an account?{' '}
        <Link to="/sign-up" className="font-semibold text-[#25754A] hover:text-[#1E5D3B]">
          Create one here
        </Link>
        .
      </p>
    </div>
  );
};

export default SignInPage;
