import { FC, useState } from 'react';
import { SideNavData, NavState } from '../../lib/types';
import cn from 'classnames';

type Props = {
  sideNavData: SideNavData;
  navState: NavState;
};

export const SideNav: FC<Props> = ({ sideNavData, navState }) => {
  const [activeNavState, setActiveNavState] = useState<NavState>(navState);
  const [sideNavLoadedFirstTime, setSideNavLoadedFirstTime] = useState(true);
  // initialActiveSection is used to set the initial state of the section when the side nav is loaded for the first time. Even if the section is active, it should be closed.
  const [initialActiveSection] = useState<{ [key: number]: boolean }>({
    [navState.section || '']: false,
  });
  const [activeSection, setActiveSection] = useState<{ [key: number]: boolean }>({
    [navState.section || '']: true,
  });

  const handleSectiontoggle = (sectionId: number) => {
    sideNavLoadedFirstTime
      ? navState.section !== sectionId &&
        setActiveSection((prev) => ({
          ...prev,
          [sectionId]: !prev[sectionId],
        }))
      : setActiveSection((prev) => ({
          ...prev,
          [sectionId]: !prev[sectionId],
        }));
    setSideNavLoadedFirstTime(false);
  };

  if (!sideNavData) {
    return null;
  }

  const navStateIsEmpty =
    !activeNavState.category && !activeNavState.section && !activeNavState.article;

  return (
    <aside className="SideNav overflow-hidden flex flex-row relative h-full">
      <div
        aria-hidden={!navStateIsEmpty}
        className={cn(
          'p-padding-large pb-margin-web absolute inset-0 transition category-side-nav w-full overflow-scroll',
          {
            'opacity-0 pointer-events-none': !navStateIsEmpty,
          }
        )}
      >
        {sideNavData.categories.map((category) => {
          return (
            <div key={category.id} className="mt-4 first:mt-0">
              <h3>
                <a
                  href={category.url}
                  className="transition text-light-neutral-1 dark:text-dark-neutral-1 subheading-2 hover:text-light-accent-1 dark:hover:text-dark-accent-1"
                >
                  {category.name}
                </a>
              </h3>
              <ul>
                {category.sections.map((section) => {
                  return (
                    <li key={section.id} className="mt-2">
                      <a
                        href={section.url}
                        className="transition text-light-neutral-2 dark:text-dark-neutral-2 body-3 hover:text-light-accent-1 dark:hover:text-dark-accent-1  block !leading-[1.4]"
                      >
                        {section.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <div
        aria-hidden={navStateIsEmpty}
        className={cn(
          'p-padding-large pb-margin-web transition absolute inset-0 section-side-nav w-full overflow-scroll',
          {
            'opacity-0 pointer-events-none': navStateIsEmpty,
          }
        )}
      >
        <div className="pb-3">
          <button
            className="group flex flex-row items-center"
            onClick={() => setActiveNavState({})}
          >
            <ChevronLeft />
            <span className="ml-2 transition text-light-neutral-2 dark:text-dark-neutral-2 group-hover:text-light-neutral-1 group-hover:dark:text-dark-neutral-1 body-3">
              All Topics
            </span>
          </button>
        </div>
        {sideNavData.categories.map((category, i) => {
          const categoryisActive = activeNavState.category === category.id;

          return (
            <>
              <div
                className={cn(
                  'border-t border-light-neutral-2 dark:border-dark-neutral-2 opacity-10',
                  {
                    hidden: i === 0,
                  }
                )}
              />
              <div key={`section-nav-${category.id}`}>
                <a href={category.url}>
                  <h3
                    className={cn(
                      'transition subheading-2 my-3 hover:text-light-accent-1 hover:dark:text-dark-accent-1',
                      {
                        'text-light-accent-1 dark:text-dark-accent-1': categoryisActive,
                        'text-light-neutral-2 dark:text-dark-neutral-2': !categoryisActive,
                      }
                    )}
                  >
                    {category.name}
                  </h3>
                </a>
                <ul
                  className={cn('pb-6', {
                    hidden: !categoryisActive,
                  })}
                >
                  {category.sections.map((section) => {
                    const sectionIsActive = activeNavState.section === section.id;

                    return (
                      <li key={section.id} className="mt-4 first:mt-6">
                        <button
                          className="w-full group flex flex-row items-center justify-between"
                          onClick={() => handleSectiontoggle(section.id)}
                        >
                          <span
                            className={cn(
                              'transition body-3 group-hover:text-light-accent-1 dark:group-hover:text-dark-accent-1 text-left',
                              {
                                'text-light-accent-1 dark:text-dark-accent-1': sectionIsActive,
                                'text-light-neutral-2 dark:text-dark-neutral-2': !sectionIsActive,
                              }
                            )}
                          >
                            {section.name}
                          </span>
                          <div className="shrink-0">
                            <ChevronDown />
                          </div>
                        </button>
                        <ul
                          className={cn('accordion-body overflow-hidden', {
                            'accordion-body-active':
                              (sideNavLoadedFirstTime && initialActiveSection[section.id]) ||
                              (!sideNavLoadedFirstTime && activeSection[section.id]),
                          })}
                        >
                          <div className="overflow-hidden">
                            {section.articles.map((article) => {
                              const isActiveArticle = activeNavState.article === article.id;

                              return (
                                <li key={article.id} className="mt-2 first:mt-4">
                                  <a
                                    href={article.url}
                                    className={cn(
                                      'transition body-3 block !leading-[1.4] hover:text-light-accent-1 dark:hover:text-dark-accent-1',
                                      {
                                        'text-light-accent-1 dark:text-dark-accent-1':
                                          isActiveArticle,
                                        'text-light-neutral-2 dark:text-dark-neutral-2':
                                          !isActiveArticle,
                                      }
                                    )}
                                  >
                                    {article.name}
                                  </a>
                                </li>
                              );
                            })}
                          </div>
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          );
        })}
      </div>
    </aside>
  );
};

const ChevronLeft: FC<{
  color?: 'neutral-2';
}> = ({ color = 'neutral-2' }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.4715 3.52827C10.7318 3.78862 10.7318 4.21073 10.4715 4.47108L6.94289 7.99967L10.4715 11.5283C10.7318 11.7886 10.7318 12.2107 10.4715 12.4711C10.2111 12.7314 9.78903 12.7314 9.52868 12.4711L5.52868 8.47108C5.26833 8.21073 5.26833 7.78862 5.52868 7.52827L9.52868 3.52827C9.78903 3.26792 10.2111 3.26792 10.4715 3.52827Z"
        className={cn({
          'transition fill-light-neutral-2 dark:fill-dark-neutral-2 group-hover:fill-light-neutral-1 group-hover:dark:fill-dark-neutral-1':
            color === 'neutral-2',
        })}
      />
    </svg>
  );
};

const ChevronDown: FC<{
  color?: 'neutral-2';
}> = ({ color = 'neutral-2' }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.52876 5.52827C3.78911 5.26792 4.21122 5.26792 4.47157 5.52827L8.00016 9.05687L11.5288 5.52827C11.7891 5.26792 12.2112 5.26792 12.4716 5.52827C12.7319 5.78862 12.7319 6.21073 12.4716 6.47108L8.47157 10.4711C8.21122 10.7314 7.78911 10.7314 7.52876 10.4711L3.52876 6.47108C3.26841 6.21073 3.26841 5.78862 3.52876 5.52827Z"
        className={cn({
          'transition fill-light-neutral-2 dark:fill-dark-neutral-2 group-hover:fill-light-accent-1 group-hover:dark:fill-dark-accent-1':
            color === 'neutral-2',
        })}
      />
    </svg>
  );
};
