import { FC } from 'react';
import { ArticlePageData } from '../../lib/types';
import cn from 'classnames';

type Props = {
  articlePageData: ArticlePageData;
};

export const ArticleBreadcrumbs: FC<Props> = ({ articlePageData }) => {
  return (
    <>
      <div className="Breadcrumbs mb-8 flex flex-row items-center overflow-scroll col-span-4 sm:col-span-8">
        <a href="/" target="_self" className="group flex">
          <span className="body-3 text-nowrap transition text-light-neutral-1 dark:text-dark-neutral-1 group-hover:text-light-neutral-2 group-hover:dark:text-dark-neutral-2">
            Home
          </span>
        </a>
        {articlePageData.article.path_steps.map((step) => {
          return (
            <>
              <Chevron />
              <a href={step.url} target={step.target} className="group flex">
                <span className="body-3 text-nowrap text-light-neutral-1 dark:text-dark-neutral-1 transition group-hover:text-light-neutral-2 group-hover:dark:text-dark-neutral-2">
                  {step.name}
                </span>
              </a>
            </>
          );
        })}
      </div>
    </>
  );
};

const Chevron: FC<{
  color?: 'neutral-1';
}> = ({ color = 'neutral-1' }) => {
  return (
    <svg
      className="mx-0.5 min-w-4 min-h-4"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.52827 3.52827C5.26792 3.78862 5.26792 4.21073 5.52827 4.47108L9.05687 7.99967L5.52827 11.5283C5.26792 11.7886 5.26792 12.2107 5.52827 12.4711C5.78862 12.7314 6.21073 12.7314 6.47108 12.4711L10.4711 8.47108C10.7314 8.21073 10.7314 7.78862 10.4711 7.52827L6.47108 3.52827C6.21073 3.26792 5.78862 3.26792 5.52827 3.52827Z"
        className={cn({
          'fill-light-neutral-1 dark:fill-dark-neutral-1': color === 'neutral-1',
        })}
      />
    </svg>
  );
};
