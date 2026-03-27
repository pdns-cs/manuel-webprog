import { NavLink } from 'react-router-dom';
import dinoWorldLogo from '../assets/dinoworld-logo.png';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition duration-200',
    isActive
      ? 'border-[#25754A] bg-[#25754A] text-white shadow-[0_10px_30px_rgba(37,117,74,0.28)]'
      : 'border-transparent text-zinc-500 hover:border-[#25754A] hover:bg-zinc-50 hover:text-zinc-900',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-900/10 bg-[#F7F8EF]/95 shadow-[0_10px_35px_rgba(24,24,27,0.08)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="group flex items-center gap-3">
          <img
            src={dinoWorldLogo}
            alt="DinoWorld logo"
            className="h-14 w-auto object-contain transition duration-200 group-hover:-translate-y-0.5"
          />
          <div className="space-y-0.5">
            <p className="font-adigiana text-base uppercase tracking-[0.2em] text-zinc-900 sm:text-lg">
              DinoWorld
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-zinc-500 sm:text-[11px]">
              soft roars, happy tails
            </p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
