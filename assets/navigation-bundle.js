import {
  ab as api,
  r as reactExports,
  j as jsxRuntimeExports,
  ac as Ye,
  ad as cn,
  ae as yt,
  af as je,
  a7 as reactDomExports,
  a8 as ThemeProviders,
  a9 as createTheme,
} from 'shared';
import {
  T as ThemeIconMap,
  S as Sun,
  M as Moon,
  C as Close,
  P as PrimaryButton,
  a as Search,
  B as ButtonBase,
  L as LinkBase,
  b as MiniUnicon,
  c as Menu,
} from 'index';

class StorageManager {
  key;
  constructor(key) {
    this.key = key;
  }
  set(value) {
    const valueToSet = JSON.stringify(value);
    api.set(this.key, valueToSet, { expires: 365, domain: 'zendesk.com' });
  }
  get() {
    const value = api.get(this.key);
    if (value) {
      return JSON.parse(value);
    }
    return undefined;
  }
  remove() {
    api.remove(this.key, { domain: 'zendesk.com' });
  }
}
const THEME_STORAGE_NAME = 'uniswap-ui-theme';
const ThemeManager = new StorageManager(THEME_STORAGE_NAME);

const UIContext = reactExports.createContext(undefined);
const useUIProvider = () => {
  const context = reactExports.useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUIProvider must be used within a UIProvider');
  }
  return context;
};
const UIProvider = ({ children }) => {
  const [theme, setTheme] = reactExports.useState('light');
  reactExports.useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentTheme = ThemeManager.get();
      if (!currentTheme) {
        ThemeManager.set('light');
      } else {
        setTheme(currentTheme);
      }
      document.documentElement.classList.toggle('dark', currentTheme === 'dark');
    }
  }, []);
  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      ThemeManager.set(newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark'); // Toggles the dark class
      return newTheme;
    });
  };
  return jsxRuntimeExports.jsx(UIContext.Provider, {
    value: {
      theme,
      toggleTheme,
    },
    children: children,
  });
};

const ThemeSwitch = () => {
  const { toggleTheme, theme } = useUIProvider();
  return jsxRuntimeExports.jsxs(Ye, {
    checked: theme === 'dark',
    onChange: toggleTheme,
    className: cn(
      'group relative inline-flex h-8 w-[3.75rem] items-center rounded-full bg-light-surface-3 dark:!bg-dark-surface-3'
    ),
    'aria-label': 'Toggle theme',
    children: [
      jsxRuntimeExports.jsx('span', {
        className:
          'flex h-6 w-6 translate-x-1 items-center justify-center rounded-full bg-white transition group-data-[checked]:translate-x-8',
        children: jsxRuntimeExports.jsx(ThemeIconMap, {
          className: 'h-4 w-4',
          icon: theme === 'dark' ? 'moon' : 'sun',
        }),
      }),
      jsxRuntimeExports.jsx(Sun, { className: 'absolute left-2 h-4 w-4' }),
      jsxRuntimeExports.jsx(Moon, { className: 'absolute right-2 h-4 w-4' }),
    ],
  });
};

const MobileMenuModal = ({ isOpen, close }) => {
  const { theme } = useUIProvider();
  const [modalTransition, setModalTransition] = reactExports.useState(false);
  const handleClose = () => {
    setModalTransition(false);
    setTimeout(close, 100);
  };
  reactExports.useEffect(() => {
    if (isOpen) {
      setTimeout(() => setModalTransition(true), 100);
    }
  }, [isOpen]);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
    children: jsxRuntimeExports.jsxs(yt, {
      open: isOpen,
      onClose: handleClose,
      className: 'MobileMenuModal relative z-modal md:hidden',
      children: [
        jsxRuntimeExports.jsx('button', {
          className: cn('fixed inset-0 z-[790] bg-scrim transition duration-500', {
            'pointer-events-none opacity-0': !isOpen,
            'opacity-1': isOpen,
          }),
          onClick: handleClose,
        }),
        jsxRuntimeExports.jsx('div', {
          className: cn(
            'fixed bottom-0 left-0 right-0 flex w-screen translate-y-0 items-center transition-all z-[900]',
            {
              'opacity-1 translate-y-0': modalTransition,
              'translate-y-4 opacity-0': !modalTransition,
            }
          ),
          children: jsxRuntimeExports.jsxs(je, {
            className: cn('w-full rounded-t-large border-t px-margin-mobile', {
              'border-dark-surface-3 bg-dark-surface-1': theme === 'dark',
              'border-light-surface-3 bg-light-surface-1': theme === 'light',
            }),
            children: [
              jsxRuntimeExports.jsxs('div', {
                className: 'pt-margin-mobile',
                children: [
                  jsxRuntimeExports.jsxs('div', {
                    className: 'relative',
                    children: [
                      jsxRuntimeExports.jsx('div', {
                        className: 'flex flex-row-reverse mb-margin-mobile',
                        children: jsxRuntimeExports.jsx('button', {
                          onClick: handleClose,
                          className: 'group',
                          children: jsxRuntimeExports.jsx(Close, { className: 'h-3.5 w-3.5' }),
                        }),
                      }),
                      jsxRuntimeExports.jsx('nav', { id: 'new-mobile-nav' }),
                    ],
                  }),
                  jsxRuntimeExports.jsxs('div', {
                    className: 'flex flex-row items-center justify-between',
                    children: [
                      jsxRuntimeExports.jsx('h3', {
                        className: cn('body-1', {
                          'text-light-neutral-1': theme === 'light',
                          'text-dark-neutral-1': theme === 'dark',
                        }),
                        children: 'Theme',
                      }),
                      jsxRuntimeExports.jsx(ThemeSwitch, {}),
                    ],
                  }),
                ],
              }),
              jsxRuntimeExports.jsx('div', {
                className: 'py-margin-mobile',
                children: jsxRuntimeExports.jsx(PrimaryButton, {
                  onClick: handleClose,
                  className: 'ml-padding-small-dense',
                  label: 'Submit Request',
                  href: '/hc/en-us/requests/new',
                  size: 'large',
                  theme: theme,
                  color: 'accent-2',
                  fullWidth: true,
                }),
              }),
            ],
          }),
        }),
      ],
    }),
  });
};

const Navigation = () => {
  const [scrollIsOnTop, setScrollIsOnTop] = reactExports.useState(false);
  const [menuIsOpen, setMenuIsOpen] = reactExports.useState(false);
  const [mobileSearchBarIsOpen, setMobileSearchBarIsOpen] = reactExports.useState(false);
  const searchBarRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
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
  reactExports.useEffect(() => {
    const timeout = setTimeout(() => {
      const searchBarPlaceholder = document.getElementById('search-bar-placeholder-nav-mobile');
      if (searchBarPlaceholder && searchBarRef.current) {
        searchBarRef.current.appendChild(searchBarPlaceholder);
        searchBarPlaceholder.style.opacity = '1';
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, []);
  return jsxRuntimeExports.jsxs(UIProvider, {
    children: [
      jsxRuntimeExports.jsxs('nav', {
        className: cn(
          'Navigation fixed top-0 left-0 right-0 z-nav flex w-screen justify-center bg-light-surface-1 dark:border-dark-surface-3 dark:bg-dark-surface-1',
          {
            'border-b': !scrollIsOnTop,
          }
        ),
        children: [
          jsxRuntimeExports.jsxs('div', {
            className: cn(
              'absolute w-full h-full top-0 left-0 !bg-light-surface-1 dark:!bg-dark-surface-1 px-4 py-[1.15625rem] flex flex-row justify-between items-center',
              {
                hidden: !mobileSearchBarIsOpen,
              }
            ),
            children: [
              jsxRuntimeExports.jsxs('div', {
                className: 'flex flex-row items-center grow',
                children: [
                  jsxRuntimeExports.jsx(Search, { className: 'h-padding-large w-padding-large' }),
                  jsxRuntimeExports.jsx('div', { ref: searchBarRef, className: 'grow' }),
                ],
              }),
              jsxRuntimeExports.jsx(ButtonBase, {
                onClick: () => {
                  setMobileSearchBarIsOpen((prev) => !prev);
                },
                className:
                  'body-2 text-light-neutral-2 dark:text-dark-neutral-2 shrink-0 absolute right-4',
                children: 'Cancel',
              }),
            ],
          }),
          jsxRuntimeExports.jsxs('div', {
            className:
              'flex w-full flex-row items-center justify-between border-light-surface-3 px-4 py-[1.15625rem] md:px-[0.9375rem] md:py-3 md:h-[4.5rem]',
            children: [
              jsxRuntimeExports.jsx('div', {
                className: 'flex flex-row items-center',
                children: jsxRuntimeExports.jsxs(LinkBase, {
                  href: '/hc/en-us',
                  className: 'flex flex-row items-center',
                  children: [
                    jsxRuntimeExports.jsx(MiniUnicon, { className: 'mb-[0.1875rem] h-8 w-8' }),
                    jsxRuntimeExports.jsx('p', {
                      className:
                        'body-3 md:button-label-2 ml-2 text-light-accent-1 dark:text-dark-accent-1',
                      children: 'Uniswap Support',
                    }),
                  ],
                }),
              }),
              jsxRuntimeExports.jsxs('div', {
                className: 'md:hidden',
                children: [
                  jsxRuntimeExports.jsx(ButtonBase, {
                    onClick: () => {
                      setMobileSearchBarIsOpen((prev) => !prev);
                    },
                    className: 'mr-3',
                    children: jsxRuntimeExports.jsx(Search, {
                      className: 'h-padding-large w-padding-large',
                    }),
                  }),
                  jsxRuntimeExports.jsx(ButtonBase, {
                    id: 'mobile-menu-button',
                    onClick: () => {
                      setMenuIsOpen((prev) => !prev);
                    },
                    children: jsxRuntimeExports.jsx(Menu, {
                      className: 'h-padding-large w-padding-large',
                    }),
                  }),
                ],
              }),
              jsxRuntimeExports.jsxs('div', {
                className: 'hidden md:flex',
                children: [
                  jsxRuntimeExports.jsx(ThemeSwitch, {}),
                  jsxRuntimeExports.jsx(PrimaryButton, {
                    className: 'ml-padding-small-dense !my-auto !py-0 !h-8',
                    label: 'Submit Request',
                    href: '/hc/en-us/requests/new',
                    color: 'accent-2',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      jsxRuntimeExports.jsx(MobileMenuModal, {
        isOpen: menuIsOpen,
        close: () => {
          setMenuIsOpen(false);
        },
      }),
    ],
  });
};

async function renderNavigation(settings, container) {
  reactDomExports.render(
    jsxRuntimeExports.jsx(ThemeProviders, {
      theme: createTheme(settings),
      children: jsxRuntimeExports.jsx(Navigation, {}),
    }),
    container
  );
}

export { renderNavigation };
