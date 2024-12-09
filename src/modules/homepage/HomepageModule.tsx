import { FC, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { HeaderBackgroundLeft } from './HeaderBackgroundLeft';
import { HeaderBackgroundRight } from './HeaderBackgroundRight';

import {
  ColoredCardsIconMap,
  ColoredCardsIconColor,
  GraduationCap,
  ArrowRight,
  BookOpen,
  Layers,
} from './Icons';
import { HomepageData, ColoredCardsColor } from '../../lib/types';
import ConnectBlock from './ConnectBlock';
import { HeaderBackgroundMobile } from './HeaderBackgroundMobile';

type Props = {
  homepageData: HomepageData;
};

const Homepage: FC<Props> = ({ homepageData }) => {
  const getColorName = (color: ColoredCardsColor): ColoredCardsIconColor => {
    if (color === 'blue') {
      return 'blue-vibrant';
    }
    if (color === 'green') {
      return 'green-base';
    }
    if (color === 'orange') {
      return 'orange-vibrant';
    }
    return 'pink-vibrant';
  };
  const heros = homepageData.heros || [];
  const hero = heros[Math.floor(Math.random() * heros.length)];

  const searchBarRef = useRef<HTMLDivElement>(null);

  const [heroTextReveal, setHeroTextReveal] = useState(false);

  useEffect(() => {
    const searchBarTimeout = setTimeout(() => {
      const searchBarPlaceholder = document.getElementById('search-bar-placeholder-mobile');
      if (searchBarPlaceholder && searchBarRef.current) {
        searchBarRef.current.appendChild(searchBarPlaceholder);
        searchBarPlaceholder.style.opacity = '1';
      }
    }, 100);

    return () => clearTimeout(searchBarTimeout);
  }, []);

  useEffect(() => {
    const heroTextRevealTimeout = setTimeout(() => {
      setHeroTextReveal(true);
    }, 400);

    return () => clearTimeout(heroTextRevealTimeout);
  }, []);

  return (
    <div className="page-wrapper">
      {hero && (
        <div className="Hero rounded-large py-[4.84375rem] xs:py-[3.75rem] px-padding-medium bg-light-surface-2 dark:bg-dark-surface-2 relative overflow-hidden aspect-[327/320] xs:aspect-auto h-auto flex flex-col items-center justify-center space-y-8">
          <div className="size-full absolute top-0 left-0 pointer-events-none flex flex-row items-center justify-center xs:justify-between m-auto overflow-hidden">
            <HeaderBackgroundLeft className="h-full object-contain absolute top-0 xs:-left-32 sm:-left-24 md:left-0 sm-md:right-auto bottom-0 m-auto xs:block hidden" />
            <HeaderBackgroundRight className="h-full object-contain absolute top-0 xs:-right-32 sm:-right-24 md:right-0 bottom-0 xs:block hidden" />
            <HeaderBackgroundMobile className="w-full object-contain absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 xs:hidden block" />
          </div>
          <h2 className="flex flex-col items-center text-light-neutral-1 dark:text-dark-neutral-1 z-50 relative">
            <span
              className={cn(
                'heading-0-mobile sm:heading-0 text-center transition-opacity duration-500',
                {
                  'opacity-0': !heroTextReveal,
                  'opacity-100': heroTextReveal,
                }
              )}
            >
              {hero.headerLine1}
            </span>
            <span
              className={cn(
                'serif-heading-0-mobile sm:serif-heading-0 !italic text-center transition-opacity duration-500 delay-700',
                {
                  'opacity-0': !heroTextReveal,
                  'opacity-100': heroTextReveal,
                }
              )}
            >
              {hero.headerLine2}
            </span>
          </h2>
          <div
            ref={searchBarRef}
            className="relative z-nav bg-light-surface-2 dark:bg-dark-surface-2 rounded-[1.25rem] w-full"
          ></div>
        </div>
      )}
      {homepageData.coloredCardsBlock && homepageData.coloredCardsBlock.cards.length > 0 ? (
        <div className="ColoredCardBlock default-grid py-padding-x-large">
          {homepageData.coloredCardsBlock.cards.map((card) => {
            const textColorName = getColorName(card.color);

            return (
              <a
                key={card.title}
                href={card.url}
                className={cn(
                  'ColoredCard rounded-large p-padding-medium col-span-4 md:col-span-2',
                  {
                    'bg-light-pink-fade dark:bg-dark-pink-fade hover:bg-light-accent-2-hovered dark:hover:bg-dark-accent-2-hovered':
                      card.color === 'pink',
                    'bg-light-green dark:bg-dark-green hover:bg-light-green-base-hovered dark:hover:bg-dark-green-base-hovered':
                      card.color === 'green',
                    'bg-light-blue dark:bg-dark-blue hover:bg-light-blue-base-hovered dark:hover:bg-dark-blue-base-hovered':
                      card.color === 'blue',
                    'bg-light-orange-fade dark:bg-dark-orange-fade hover:bg-light-orange-base-hovered dark:hover:bg-dark-orange-base-hovered':
                      card.color === 'orange',
                  }
                )}
              >
                <ColoredCardsIconMap icon={card.icon} className="w-6 h-6" color={textColorName} />
                <div className="mt-[1.875rem]">
                  <h4
                    className={cn('subheading-1', {
                      'text-light-orange-vibrant dark:text-dark-orange-vibrant':
                        textColorName === 'orange-vibrant',
                      'text-blue-base dark:text-blue-base': textColorName === 'blue-vibrant',
                      'text-green-base dark:text-green-base': textColorName === 'green-base',
                      'text-light-pink-vibrant dark:text-dark-pink-vibrant':
                        textColorName === 'pink-vibrant',
                    })}
                  >
                    {card.title}
                  </h4>
                  <p className="body-3 text-light-neutral-2 dark:text-dark-neutral-2">
                    {card.description}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      ) : null}
      <Divider />
      {homepageData.faqBlock && homepageData.faqBlock.articles.length > 0 ? (
        <div className="FAQBlock py-padding-x-large">
          <div className="flex flex-row items-center">
            <GraduationCap className="w-6 h-6 mr-2" color="neutral-1" />
            <h3 className="heading-2 text-light-neutral-1 dark:text-dark-neutral-2">FAQ</h3>
          </div>
          <div className="default-grid gap-4 mt-padding-x-large">
            {homepageData.faqBlock.articles.map((article) => (
              <ArticleLinkCard
                key={article.title}
                title={article.title}
                description={article.description}
                url={article.url}
              />
            ))}
          </div>
        </div>
      ) : null}
      <Divider />
      {homepageData.guidesBlock && homepageData.guidesBlock.promotedArticles.length > 0 ? (
        <div className="FAQBlock py-padding-x-large">
          <div className="flex flex-row items-center">
            <BookOpen className="w-6 h-6 mr-2" color="neutral-1" />
            <h3 className="heading-2 text-light-neutral-1 dark:text-dark-neutral-2">Guides</h3>
          </div>
          <div className="default-grid gap-4 mt-padding-x-large">
            {homepageData.guidesBlock.promotedArticles.map((article) => {
              return (
                <ArticleLinkCard
                  key={article.id}
                  title={article.title}
                  description={article.snippet}
                  url={article.url}
                />
              );
            })}
          </div>
        </div>
      ) : null}
      <Divider />
      {homepageData.topicsBlock && homepageData.topicsBlock.categories.length > 0 ? (
        <div className="FAQBlock py-padding-x-large md:mb-16">
          <div className="flex flex-row items-center">
            <Layers className="w-6 h-6 mr-2" color="neutral-1" />
            <h3 className="heading-2 text-light-neutral-1 dark:text-dark-neutral-2">Topics</h3>
          </div>
          <div className="mt-padding-x-large w-full grid grid-cols-2 gap-x-4 sm:flex sm:flex-row sm:flex-wrap">
            {homepageData.topicsBlock.categories.map((category) => {
              return (
                <a
                  key={category.name}
                  href={category.url}
                  target="_self"
                  className="transition hover:text-light-pink-vibrant dark:hover:text-dark-pink-vibrant hover:bg-light-accent-2 hover:dark:bg-dark-accent-2 mb-3 block rounded-medium py-margin-mobile-dense px-margin-extension text-light-neutral-1 dark:text-dark-neutral-1 bg-light-surface-2 dark:bg-dark-surface-2"
                >
                  {category.name}
                </a>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Homepage;

const ArticleLinkCard: FC<{
  title: string;
  description: string;
  url: string;
}> = ({ title, description, url }) => {
  return (
    <a
      href={url}
      className="col-span-4 group flex flex-row transition rounded-medium py-padding-small px-padding-medium bg-light-surface-2 dark:bg-dark-surface-2 hover:bg-light-accent-2 hover:dark:bg-dark-accent-2"
      target="_self"
    >
      <div className="flex flex-col w-full">
        <h4 className="transition subheading-2 text-light-neutral-1 dark:text-dark-neutral-1 group-hover:text-light-pink-vibrant dark:group-hover:text-dark-pink-vibrant">
          {title}
        </h4>
        <p className="body-3 text-light-neutral-2 dark:text-dark-neutral-2">{description}</p>
      </div>
      <div className="transition opacity-0 group-hover:opacity-100">
        <ArrowRight className="my-1 w-5 h-5" />
      </div>
    </a>
  );
};

const Divider: FC = () => {
  return (
    <div className="Divider border-t-[1px] border-light-surface-3 dark:border-dark-surface-3 my-1.5 w-full" />
  );
};
