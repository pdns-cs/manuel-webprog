import notFoundHeroImage from '../assets/not-found.png';
import Button from '../components/Button';

const NotFoundPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="mx-4 mt-4 rounded-[2rem] bg-[#2E2B2B] px-6 py-8 sm:mx-6 sm:px-8 sm:py-10 lg:mx-8 lg:px-12">
        <div className="mx-auto w-full max-w-6xl lg:relative">
          <div className="relative z-10 max-w-3xl text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FAEDCB]">
              Article Unavailable
            </p>
            <h1 className="font-adigiana mt-3 text-3xl leading-tight text-[#F7F8EF] sm:text-4xl">
              This Dino Article Couldn&apos;t Be Found
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#F7F8EF] sm:text-base">
              The article you selected is currently unavailable on this page. You can go back to
              the article list and explore another dinosaur story instead.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                to="/articles"
                variant="primary"
                className="!border-[#FAEDCB] !bg-[#FAEDCB] !text-[#1E5D3B] hover:!bg-[#f3dfad]"
              >
                Back To Articles
              </Button>
              <Button
                to="/"
                variant="primary"
                className="!border-[#F7F8EF] !bg-transparent !text-[#F7F8EF] hover:!bg-white/10"
              >
                Back Home
              </Button>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center lg:pointer-events-none lg:absolute lg:inset-y-0 lg:-right-8 lg:mt-0 lg:w-[30rem] lg:justify-end">
            <img
              src={notFoundHeroImage}
              alt="Illustration for the not found page"
              className="w-full max-w-xl object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFoundPage;
