import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-auto bg-[#25754A] px-4 py-10 text-[#F7F8EF] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="font-adigiana text-2xl leading-none text-[#FAEDCB] sm:text-3xl">
            DinoWorld
          </p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#F7F8EF]">
            A friendly dinosaur learning space filled with fun facts, featured articles,
            and simple guides that make prehistoric life easier to explore.
          </p>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FAEDCB]">
            Explore
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link className="transition hover:text-[#FAEDCB]" to="/">
              Home
            </Link>
            <Link className="transition hover:text-[#FAEDCB]" to="/about">
              About
            </Link>
            <Link className="transition hover:text-[#FAEDCB]" to="/articles">
              Articles
            </Link>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FAEDCB]">
            Dino Notes
          </p>
          <div className="mt-4 space-y-3 text-sm leading-6 text-[#F7F8EF]">
            <p>Discover dinosaur groups, fossil finds, and prehistoric timelines.</p>
            <p>Built for curious learners who want something simple, playful, and clear.</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-[#FAEDCB]/30 pt-4 text-xs uppercase tracking-[0.24em] text-[#FAEDCB]">
        DinoWorld • Explore the ancient world
      </div>
    </footer>
  );
};

export default Footer;
