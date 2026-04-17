import heroImage from '../../assets/hero.png';
import grassImage from '../../assets/grass.png';
import articles from '../../assets/article-content';
import Button from '../../components/Button';

const HomePage = () => {
  const featuredArticles = articles.slice(0, 3);

  return (
    <div className="flex w-full flex-col">
      {/* Hero Section */}
      <section className="mx-4 mt-4 rounded-[2rem] border-2 border-zinc-900 bg-[#1E5D3B] px-6 py-8 sm:mx-6 sm:px-8 sm:py-10 lg:mx-8 lg:px-12">
        <div className="mx-auto w-full max-w-6xl lg:relative">
          <div className="relative z-10 max-w-xl text-left">
            <h1 className="font-adigiana max-w-xl text-3xl font-bold leading-tight !text-[#F7F8EF] sm:text-4xl">
              Roam Into the Age of Dinosaurs
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-emerald-50/90 sm:text-base">
              Step into a world where giant footprints, sharp claws, and amazing
              discoveries come to life. DinoWorld is your friendly guide to learning
              about dinosaurs in a fun, simple, and exciting way.
              <br />
              <br />
              From mighty hunters
              to gentle giants, there&apos;s always something awesome to discover!
            </p>

            <div className="mt-6">
              <Button
                to="/about"
                variant="primary"
                className="!border-[#FAEDCB] !bg-[#FAEDCB] !text-[#1E5D3B] hover:!bg-[#f3dfad]"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center lg:pointer-events-none lg:absolute lg:inset-y-0 lg:-right-16 lg:mt-0 lg:w-[58rem] lg:justify-end">
            <img
              src={heroImage}
              alt="Illustration for the DinoWorld hero section"
              className="w-full max-w-5xl object-contain"
            />
          </div>
        </div>
      </section>

      {/* KPI Section */}
      <section className="bg-[#F7F8EF] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">

          <h2 className="font-adigiana mt-2 text-2xl font-bold text-zinc-900">
            Dino Discovery Highlights
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl bg-[#BBAE3A] p-5">
            <p className="text-2xl font-bold text-white">1,000+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/85">
              Known Dinosaur Species
            </p>
          </div>

          <div className="rounded-3xl bg-[#006382] p-5">
            <p className="text-2xl font-bold text-white">165 Million</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/85">
              Years Dinosaurs Lived on Earth
            </p>
          </div>

          <div className="rounded-3xl bg-[#821400] p-5">
            <p className="text-2xl font-bold text-white">700+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/85">
              Nearly Complete Skeletons Found
            </p>
          </div>

          <div className="rounded-3xl bg-[#CF842C] p-5">
            <p className="text-2xl font-bold text-white">2 Main Types</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/85">
              Herbivores & Carnivores
            </p>
          </div>
        </div>
      </section>

      <div className="bg-[#F7F8EF]">
        <img
          src={grassImage}
          alt="Grass divider"
          className="h-16 w-full object-cover"
        />
      </div>

        <section className="bg-[#25754A] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
            <h2 className="font-adigiana mt-2 text-2xl font-semibold text-[#F7F8EF]">
            Featured Dino Articles
            </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {featuredArticles.map((article) => (
            <article
              key={article.name}
              className="flex h-full flex-col rounded-3xl bg-[#257572] p-4"
            >
              <div className="overflow-hidden rounded-[1.25rem] bg-zinc-200">
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              <h3 className="mt-4 min-h-[5.5rem] text-lg font-semibold text-[#F7F8EF]">
                {article.title}
              </h3>

              <p className="mt-3 min-h-[8.5rem] text-sm leading-6 text-[#F7F8EF]">
                {article.content[0].substring(0, 150)}
                {article.content[0].length > 150 ? '...' : ''}
              </p>

              <Button
                to={`/articles/${article.name}`}
                className="mt-auto !border-[#FAEDCB] !bg-[#FAEDCB] !text-[#1E5D3B] hover:!bg-[#f3dfad]"
                variant="primary"
              >
                Read More
              </Button>
            </article>
          ))}
        </div>
        </section>
        </div>
  );
};

export default HomePage;
