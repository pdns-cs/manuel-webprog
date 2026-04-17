import aboutDinoImage from '../../assets/about.png';
import previewOneImage from '../../assets/1.png';
import previewTwoImage from '../../assets/2.png';
import previewThreeImage from '../../assets/3.png';
import previewFourImage from '../../assets/4.png';
import Button from '../../components/Button';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="mx-4 mt-4 rounded-[2rem] bg-[#e5e8cc] px-6 py-6 sm:mx-6 sm:px-8 sm:py-8 lg:mx-8 lg:px-12">
        <div className="mx-auto grid w-full max-w-7xl gap-4 lg:relative lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="flex items-center justify-center lg:justify-start">
            <img
              src={aboutDinoImage}
              alt="Dinosaurs for the About page hero section"
              className="h-full min-h-56 w-full max-w-md rounded-[2rem] object-contain"
            />
          </div>

          <div className="relative z-10 text-right">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Our Dino Story
            </p>
            <h1 className="font-adigiana ml-auto whitespace-nowrap text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                A Friendly Place to Explore Dinosaurs
            </h1>
            <p className="mt-4 ml-auto text-sm leading-7 text-zinc-600 sm:text-base">
              DinoWorld is a fun and friendly space where you can discover amazing dinosaurs in a 
              simple and exciting way. From giant long-necked plant eaters to fast and clever hunters, 
              we make learning about dinosaurs easy, colorful, and enjoyable for everyone.

            </p>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <Button
                to="/"
                variant="primary"
                className="!border-[#FAEDCB] !bg-[#FAEDCB] !text-[#1E5D3B] hover:!bg-[#f3dfad]"
              >
                Back Home
              </Button>
              <Button
                to="/articles"
                className="!border-[#FAEDCB] !bg-[#FAEDCB] !text-[#1E5D3B] hover:!bg-[#f3dfad]"
              >
                Open Articles
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F8EF] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <h2 className="font-adigiana mt-2 text-2xl font-semibold text-zinc-900">
            DinoWorld at a Glance
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl bg-[#006382] p-5">
            <p className="text-2xl font-bold text-white">50+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/85">
              Facts to Explore
            </p>
          </div>

          <div className="rounded-3xl bg-[#CF842C] p-5">
            <p className="text-2xl font-bold text-white">4 Types</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/85">
              Dinosaur Groups Featured
            </p>
          </div>

          <div className="rounded-3xl bg-[#BBAE3A] p-5">
            <p className="text-2xl font-bold text-white">10+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/85">
              Popular Dinosaurs
            </p>
          </div>

          <div className="rounded-3xl bg-[#821400] p-5">
            <p className="text-2xl font-bold text-white">100%</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/85">
              Accessible Learning
            </p>
          </div>
        </div>
      </section>

        <section className="bg-[#F7F8EF] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="flex h-full flex-col">
            <h2 className="font-adigiana mt-2 text-2xl font-semibold text-black">
                How to Navigate the Dino Experience
            </h2>

            <div className="mt-6 flex flex-1 flex-col gap-4">
                <article className="rounded-3xl border-2 border-[#FAEDCB] bg-[#25754A] p-5">
                <h3 className="text-lg font-semibold text-[#F7F8EF]">Start with the Basics</h3>
                <p className="mt-3 text-sm leading-6 text-[#F7F8EF]">
                    Explore key dinosaur facts, timelines, and essential information to build your foundation.
                </p>
                </article>

                <article className="rounded-3xl border-2 border-[#FAEDCB] bg-[#006382] p-5">
                <h3 className="text-lg font-semibold text-[#F7F8EF]">Discover Dino Types</h3>
                <p className="mt-3 text-sm leading-6 text-[#F7F8EF]">
                    Learn about different dinosaur groups, from long-necked giants to fast-moving predators.
                </p>
                </article>

                <article className="rounded-3xl border-2 border-[#FAEDCB] bg-[#CF842C] p-5">
                <h3 className="text-lg font-semibold text-[#F7F8EF]">Dive Deeper</h3>
                <p className="mt-3 text-sm leading-6 text-[#F7F8EF]">
                    Explore detailed insights, fossil discoveries, and unique characteristics of each species.
                </p>
                </article>

                <article className="rounded-3xl border-2 border-[#FAEDCB] bg-[#821400] p-5">
                <h3 className="text-lg font-semibold text-[#F7F8EF]">Follow the Timeline</h3>
                <p className="mt-3 text-sm leading-6 text-[#F7F8EF]">
                    See how dinosaurs changed across the Triassic, Jurassic, and Cretaceous periods.
                </p>
                </article>
            </div>
            </div>

            <div className="flex h-full flex-col rounded-3xl border-2 border-[#FAEDCB] bg-[#257572] px-5 pb-5 pt-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#25754A]">
                Dino Previews
            </p>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <div className="overflow-hidden rounded-[1.25rem] bg-[#BBAE3A]">
                <img
                  src={previewOneImage}
                  alt="Preview one"
                  className="aspect-[5/4] w-full object-cover"
                />
                </div>
                <div className="overflow-hidden rounded-[1.25rem] bg-[#821400]">
                <img
                  src={previewTwoImage}
                  alt="Preview two"
                  className="aspect-[5/4] w-full object-cover"
                />
                </div>
                <div className="overflow-hidden rounded-[1.25rem] bg-[#006382]">
                <img
                  src={previewThreeImage}
                  alt="Preview three"
                  className="aspect-[5/4] w-full object-cover"
                />
                </div>
                <div className="overflow-hidden rounded-[1.25rem] bg-[#25754A]">
                <img
                  src={previewFourImage}
                  alt="Preview four"
                  className="aspect-[5/4] w-full object-cover"
                />
                </div>
            </div>

            <Button
              className="mt-4 self-start !border-[#FAEDCB] !bg-[#FAEDCB] !text-[#1E5D3B] hover:!bg-[#f3dfad]"
            >
              Start Exploring
            </Button>
            </div>
        </div>
        </section>
    </div>
    );
};

export default AboutPage;
