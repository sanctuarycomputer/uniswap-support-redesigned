import Cookies from 'js-cookie';

export class StorageManager<T> {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  set(value: T): void {
    Cookies.set(this.key, value as string, { expires: 365, domain: 'uniswap.org' });
  }

  get(): T | undefined {
    const value = Cookies.get(this.key);

    return value ? (value as T) : undefined;
  }

  remove(): void {
    Cookies.remove(this.key, { domain: 'uniswap.org' });
  }
}

export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

const THEME_STORAGE_NAME = 'uniswap-ui-theme';
export const ThemeManager = new StorageManager<Theme>(THEME_STORAGE_NAME);
