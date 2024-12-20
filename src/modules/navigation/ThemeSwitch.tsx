import { FC } from 'react';

import { useUIProvider } from '../../context/uiProvider';
import { Theme } from '../../utils/storage';

import { ThemeIconMap, Sun, Moon } from '../../svgs/Icons';
import { Switch } from '@headlessui/react';

import cn from 'classnames';

const ThemeSwitch: FC = () => {
  const { toggleTheme, theme } = useUIProvider();

  return (
    <Switch
      checked={theme === Theme.Dark}
      onChange={toggleTheme}
      className={cn(
        'group relative inline-flex h-8 w-[3.75rem] items-center rounded-full bg-light-surface-3 dark:!bg-dark-surface-3'
      )}
      aria-label="Toggle theme"
    >
      <span className="flex h-6 w-6 translate-x-1 items-center justify-center rounded-full bg-white transition group-data-[checked]:translate-x-8">
        <ThemeIconMap className="h-4 w-4" icon={theme === Theme.Dark ? 'moon' : 'sun'} />
      </span>
      <Sun className="absolute left-2 h-4 w-4" />
      <Moon className="absolute right-2 h-4 w-4" />
    </Switch>
  );
};

export default ThemeSwitch;
