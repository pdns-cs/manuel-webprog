import articleHeroImage from '../assets/article.png';
import articles from '../assets/article-content';
import ArticleList from '../components/ArticleList';
import Button from '../components/Button';

const ArticleListPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="mx-4 mt-4 rounded-[2rem] bg-[#1E5D3B] px-6 py-6 sm:mx-6 sm:px-8 sm:py-8 lg:mx-8 lg:px-12">
        <div className="mx-auto w-full max-w-6xl lg:relative">
          <div className="relative z-10 max-w-2xl text-left">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FAEDCB]">
              Articles
            </p>

            <h1 className="font-adigiana max-w-3xl text-3xl font-bold leading-tight text-[#F7F8EF] sm:text-4xl">
              Dino Stories, Discoveries, and Deep Dives
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-emerald-50/90 sm:text-base">
              Browse colorful dinosaur articles about origins, fossils, giant sauropods, armored
              species, and the discoveries that changed how we understand prehistoric life.
            </p>

            <div className="mt-6">
              <Button
                to="/"
                variant="primary"
                className="!border-[#FAEDCB] !bg-[#FAEDCB] !text-[#1E5D3B] hover:!bg-[#f3dfad]"
              >
                Back Home
              </Button>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center lg:pointer-events-none lg:absolute lg:inset-y-0 lg:-right-10 lg:mt-0 lg:w-[34rem] lg:justify-end">
            <img
              src={articleHeroImage}
              alt="Illustration for the article list hero section"
              className="w-full max-w-2xl object-contain"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#F7F8EF] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#25754A]">
            Featured Articles
          </p>
          <h2 className="font-adigiana mt-2 text-2xl font-semibold text-zinc-900">
            Latest dino reads
          </h2>
        </div>

        <ArticleList articles={articles} />
      </section>
    </div>
  );
};

export default ArticleListPage;
