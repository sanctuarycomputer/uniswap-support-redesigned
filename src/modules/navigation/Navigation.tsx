import { FC, useState, useEffect, useRef } from 'react';
import type { Navigation } from './data-types';

import cn from 'classnames';

import { MiniUnicon } from '../../svgs/Logos';
import { Menu, Search } from '../../svgs/Icons';
import { PrimaryButton, ButtonBase, LinkBase } from '../../base/Button';
import ThemeSwitch from './ThemeSwitch';
import MobileMenuModal from './MobileMenuModal';
import { UIProvider } from '../../context/uiProvider';

const Navigation: FC = () => {
  const [scrollIsOnTop, setScrollIsOnTop] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [mobileSearchBarIsOpen, setMobileSearchBarIsOpen] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      if (position === 0) {
        setScrollIsOnTop(true);
      } else {
        setScrollIsOnTop(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setScrollIsOnTop]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const searchBarPlaceholder = document.getElementById('search-bar-placeholder-nav-mobile');
      if (searchBarPlaceholder && searchBarRef.current) {
        searchBarRef.current.appendChild(searchBarPlaceholder);
        searchBarPlaceholder.style.opacity = '1';
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <UIProvider>
      <nav
        className={cn(
          'Navigation fixed top-0 left-0 right-0 z-nav flex w-screen justify-center bg-light-surface-1 dark:border-dark-surface-3 dark:bg-dark-surface-1',
          {
            'border-b': !scrollIsOnTop,
          }
        )}
      >
        <div
          className={cn(
            'absolute w-full h-full top-0 left-0 !bg-light-surface-1 dark:!bg-dark-surface-1 px-4 py-[1.15625rem] flex flex-row justify-between items-center',
            {
              hidden: !mobileSearchBarIsOpen,
            }
          )}
        >
          <div className="flex flex-row items-center grow">
            <Search className="h-padding-large w-padding-large" />
            <div ref={searchBarRef} className="grow"></div>
          </div>
          <ButtonBase
            onClick={() => {
              setMobileSearchBarIsOpen((prev) => !prev);
            }}
            className="body-2 text-light-neutral-2 dark:text-dark-neutral-2 shrink-0 absolute right-4"
          >
            Cancel
          </ButtonBase>
        </div>
        <div className="flex w-full flex-row items-center justify-between border-light-surface-3 px-4 py-[1.15625rem] md:px-[0.9375rem] md:py-3 md:h-[4.5rem]">
          <div className="flex flex-row items-center">
            <LinkBase href="/hc/en-us" className="flex flex-row items-center">
              <MiniUnicon className="mb-[0.1875rem] h-8 w-8" />
              <p className="body-3 md:button-label-2 ml-2 text-light-accent-1 dark:text-dark-accent-1">
                Uniswap Support
              </p>
            </LinkBase>
          </div>
          <div className="md:hidden">
            <ButtonBase
              onClick={() => {
                setMobileSearchBarIsOpen((prev) => !prev);
              }}
              className="mr-3"
            >
              <Search className="h-padding-large w-padding-large" />
            </ButtonBase>
            <ButtonBase
              id="mobile-menu-button"
              onClick={() => {
                setMenuIsOpen((prev) => !prev);
              }}
            >
              <Menu className="h-padding-large w-padding-large" />
            </ButtonBase>
          </div>
          <div className="hidden md:flex">
            <ThemeSwitch />
            <PrimaryButton
              className="ml-padding-small-dense !my-auto !py-0 !h-8"
              label="Submit Request"
              href="/hc/en-us/requests/new"
              color="accent-2"
            />
          </div>
        </div>
      </nav>
      <MobileMenuModal
        isOpen={menuIsOpen}
        close={() => {
          setMenuIsOpen(false);
        }}
      />
    </UIProvider>
  );
};

export default Navigation;
