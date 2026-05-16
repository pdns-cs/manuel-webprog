import Button from './Button';

const cardStyles = [
  {
    card: 'bg-[#25754A]',
    label: 'text-[#FAEDCB]',
    title: 'text-[#F7F8EF]',
    body: 'text-[#F7F8EF]',
  },
  {
    card: 'bg-[#006382]',
    label: 'text-[#FAEDCB]',
    title: 'text-[#F7F8EF]',
    body: 'text-[#F7F8EF]',
  },
  {
    card: 'bg-[#CF842C]',
    label: 'text-[#FAEDCB]',
    title: 'text-[#F7F8EF]',
    body: 'text-[#F7F8EF]',
  },
  {
    card: 'bg-[#BBAE3A]',
    label: 'text-[#F7F8EF]',
    title: 'text-[#F7F8EF]',
    body: 'text-[#F7F8EF]',
  },
];

const colorOrder = [0, 2, 1, 3, 0, 1, 2, 3];

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => {
        const previewText = Array.isArray(article.content)
          ? article.content.join(' ')
          : article.content;
        const style = cardStyles[colorOrder[index % colorOrder.length]];
        const articlePath = `/articles/${article.name}`;

        return (
          <article
            key={article.name}
            className={`flex h-full flex-col rounded-3xl p-4 ${style.card}`}
          >
            <div className="overflow-hidden rounded-[1.25rem] bg-[#F7F8EF]/20">
              <img
                src={article.image}
                alt={article.imageAlt}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            <p className={`mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] ${style.label}`}>
              Article {String(index + 1).padStart(2, '0')}
            </p>

            <h3 className={`mt-2 min-h-[5.5rem] text-lg font-semibold ${style.title}`}>
              {article.title}
            </h3>

            <p className={`mt-3 min-h-[8.5rem] text-sm leading-6 ${style.body}`}>
              {previewText.substring(0, 150)}
              {previewText.length > 150 ? '...' : ''}
            </p>

            <Button
              className="mt-auto !border-transparent !bg-[#FAEDCB] pt-4 !text-[#1E5D3B] hover:!bg-[#f3dfad]"
              to={articlePath}
            >
              Read More
            </Button>
          </article>
        );
      })}
    </div>
  );
};

export default ArticleList;
