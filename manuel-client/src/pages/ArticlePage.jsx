import theropodsImage from '../assets/theropods.png';
import sauropodsImage from '../assets/sauropods.png';
import boneOneImage from '../assets/bone-1.png';
import previewFourImage from '../assets/4.png';
import Button from '../components/button';

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Hero Section */}
      <section className="mx-4 mt-4 rounded-[2rem] bg-[#6F8F3A] px-6 py-6 sm:mx-6 sm:px-8 sm:py-8 lg:mx-8 lg:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FAEDCB]">
            Articles
          </p>

          <h1 className="font-adigiana max-w-3xl text-3xl leading-tight text-[#F7F8EF] sm:text-4xl">
            Explore the World of Dinosaurs Through Stories and Facts
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#F7F8EF] sm:text-base">
            Browse featured articles about dinosaur species, fossil discoveries, prehistoric
            life, and the science that helps us understand the ancient world.
          </p>

          <div className="mt-6">
            <Button
              to="/"
              className="!border-[#FAEDCB] !bg-[#FAEDCB] !text-[#1E5D3B] hover:!bg-[#f3dfad]"
            >
              Back Home
            </Button>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="bg-[#F7F8EF] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-[90rem]">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#25754A]">
            Featured Articles
          </p>
          <h2 className="font-adigiana mt-2 text-2xl font-semibold text-zinc-900">
            Latest dino reads
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Article Card 1 */}
          <article className="rounded-3xl border-2 border-[#FAEDCB] bg-[#25754A] p-4">
            <div className="overflow-hidden rounded-[1.25rem] bg-[#e5e8cc]">
              <img
                src={theropodsImage}
                alt="Theropod dinosaur article preview"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#FAEDCB]">
              Featured 01
            </p>

            <h3 className="mt-2 text-lg font-semibold text-[#F7F8EF]">
              How Dinosaurs Ruled the Earth for Millions of Years
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#F7F8EF]">
              Discover how dinosaurs lived, adapted, and thrived across changing environments
              for over 165 million years.
            </p>

            <Button className="mt-4 !border-[#FAEDCB] !bg-[#FAEDCB] !text-[#1E5D3B] hover:!bg-[#f3dfad]">Read More</Button>
          </article>

          {/* Article Card 2 */}
          <article className="rounded-3xl border-2 border-[#FAEDCB] bg-[#006382] p-4">
            <div className="overflow-hidden rounded-[1.25rem] bg-[#dbeaf0]">
              <img
                src={sauropodsImage}
                alt="Sauropod dinosaur article preview"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#FAEDCB]">
              Featured 02
            </p>

            <h3 className="mt-2 text-lg font-semibold text-[#F7F8EF]">
              Meet the Major Dinosaur Groups
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#F7F8EF]">
              Learn the differences between theropods, sauropods, ceratopsians, and other
              well-known dinosaur groups.
            </p>

            <Button className="mt-4 !border-[#FAEDCB] !bg-[#FAEDCB] !text-[#1E5D3B] hover:!bg-[#f3dfad]">Read More</Button>
          </article>

            <article className="rounded-3xl border-2 border-[#FAEDCB] bg-[#CF842C] p-4">
            <div className="overflow-hidden rounded-[1.25rem] bg-[#FAEDCB]">
                <img
                  src={boneOneImage}
                  alt="Fossil article preview"
                  className="aspect-[4/3] w-full object-cover"
                />
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#FAEDCB]">
                Featured 03
            </p>

            <h3 className="mt-2 text-lg font-semibold text-[#F7F8EF]">
                What Fossils Reveal About Prehistoric Life
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#F7F8EF]">
                Explore how fossils help scientists uncover dinosaur behavior, diet, movement,
                and ancient ecosystems.
            </p>

            <Button className="mt-4 !border-[#FAEDCB] !bg-[#FAEDCB] !text-[#1E5D3B] hover:!bg-[#f3dfad]">Read More</Button>
            </article>

            <article className="rounded-3xl border-2 border-[#FAEDCB] bg-[#BBAE3A] p-4">
            <div className="overflow-hidden rounded-[1.25rem] bg-[#e5e8cc]">
                <img
                  src={previewFourImage}
                  alt="Prehistoric timeline article preview"
                  className="aspect-[4/3] w-full object-cover"
                />
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F7F8EF]">
                Featured 04
            </p>

            <h3 className="mt-2 text-lg font-semibold text-[#F7F8EF]">
                The Triassic, Jurassic, and Cretaceous Explained
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#F7F8EF]">
                A simple guide to the three periods of the Mesozoic Era and the dinosaurs that
                lived in each one.
            </p>

            <Button className="mt-4 !border-[#FAEDCB] !bg-[#FAEDCB] !text-[#1E5D3B] hover:!bg-[#f3dfad]">Read More</Button>
            </article>
        </div>
        </div>
        </section> 
        </div>
  );
};

export default ArticlePage;
