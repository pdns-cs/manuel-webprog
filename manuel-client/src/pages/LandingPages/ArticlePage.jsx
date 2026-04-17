import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import articles from '../../assets/article-content';
import Button from '../../components/Button';

const ArticlePage = () => {
  const { name } = useParams();
  const article = useMemo(
    () => articles.find((entry) => entry.name === name),
    [name]
  );

  if (!article) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[2rem] bg-[#e5e8cc] p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Article
          </p>
          <h1 className="mt-3 text-3xl font-bold text-zinc-900 sm:text-4xl">
            Article not found
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">
            The article you selected is unavailable. You can go back to the article list and
            choose another one.
          </p>
          <div className="mt-6">
            <Button
              to="/articles"
              variant="primary"
              className="!border-[#FAEDCB] !bg-[#FAEDCB] !text-[#1E5D3B] hover:!bg-[#f3dfad]"
            >
              Back To Articles
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="mx-4 mt-4 rounded-[2rem] bg-[#e5e8cc] px-6 py-6 sm:mx-6 sm:px-8 sm:py-8 lg:mx-8 lg:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-4xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Full Article
          </p>
          <h1 className="font-adigiana mt-2 text-2xl font-bold leading-tight text-zinc-900 sm:text-3xl">
            {article.title}
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-600">
            Read the full article content here, then use the original source button if you want
            to continue to the external reference.
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
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="!border-[#1E5D3B] !bg-[#1E5D3B] !text-[#F7F8EF] hover:!bg-[#25754A]"
            >
              Open Original Source
            </Button>
          </div>
          </div>
        </div>
      </section>

      <section className="mx-4 rounded-[2rem] bg-[#e5e8cc] px-6 py-6 sm:mx-6 sm:px-8 sm:py-8 lg:mx-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[2rem] bg-[#257572]">
            <img
              src={article.image}
              alt={article.imageAlt}
              className="aspect-[16/7] w-full object-cover"
            />
          </div>

          <div className="mt-6 rounded-[2rem] bg-[#25754A] p-6 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FAEDCB]">
              Dino Reading
            </p>
            <div className="mt-4 space-y-4 text-base leading-8 text-[#F7F8EF]">
            {article.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
