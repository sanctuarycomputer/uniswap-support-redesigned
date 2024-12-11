import React, { FC, createContext, useState, useContext, useEffect } from 'react';

import { ThemeManager, Theme } from '../utils/storage';

type UIProviderProps = {
  theme: Theme;
  toggleTheme: () => void;
};

export const UIContext = createContext<UIProviderProps | undefined>(undefined);

export const useUIProvider = () => {
  const context = useContext(UIContext);

  if (context === undefined) {
    throw new Error('useUIProvider must be used within a UIProvider');
  }

  return context;
};

export const UIProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.Light);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const themeCookieValue = ThemeManager.get();

      if (themeCookieValue) {
        setTheme(themeCookieValue);
      } else {
        // If no theme is set, check for the user's system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          ThemeManager.set(Theme.Dark);
          setTheme(Theme.Dark);
        } else {
          ThemeManager.set(Theme.Light);
          setTheme(Theme.Light);
        }
      }
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === Theme.Dark ? Theme.Light : Theme.Dark;
      ThemeManager.set(newTheme);
      document.documentElement.classList.toggle(Theme.Dark, newTheme === Theme.Dark); // Toggles the dark class

      return newTheme;
    });
  };

  return (
    <UIContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
