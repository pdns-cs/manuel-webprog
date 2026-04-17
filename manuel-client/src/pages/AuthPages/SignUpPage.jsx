import { Link } from 'react-router-dom';

const SignUpPage = () => {
  return (
    <div className="rounded-[2rem] border-2 border-zinc-900/10 bg-white p-8 shadow-[0_20px_60px_rgba(24,24,27,0.08)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#CF842C]">
        Join DinoWorld
      </p>
      <h1 className="mt-3 text-3xl font-bold text-zinc-900">Create your account</h1>
      <p className="mt-4 text-sm leading-7 text-zinc-600">
        Make a new account to start your dinosaur learning journey and keep track of your favorite
        articles.
      </p>

      <form className="mt-8 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-zinc-800">Full Name</span>
          <input
            type="text"
            placeholder="Your full name"
            className="w-full rounded-2xl border-2 border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[#CF842C] focus:bg-white"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-zinc-800">Email</span>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-2xl border-2 border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[#CF842C] focus:bg-white"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-zinc-800">Password</span>
          <input
            type="password"
            placeholder="Create a password"
            className="w-full rounded-2xl border-2 border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[#CF842C] focus:bg-white"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-full border-2 border-[#CF842C] bg-[#CF842C] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-[#b47124]"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-6 text-sm text-zinc-600">
        Already have an account?{' '}
        <Link to="/sign-in" className="font-semibold text-[#CF842C] hover:text-[#b47124]">
          Go to sign in
        </Link>
        .
      </p>
    </div>
  );
};

export default SignUpPage;
