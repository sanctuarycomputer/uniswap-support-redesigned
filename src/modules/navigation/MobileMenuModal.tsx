import { FC, useState, useEffect } from 'react';

import { useUIProvider } from '../../context/uiProvider';
import { Theme } from '../../utils/storage';

import { Dialog, DialogPanel } from '@headlessui/react';
import { PrimaryButton } from '../../base/Button';
import ThemeSwitch from './ThemeSwitch';
import { Close } from '../../svgs/Icons';

import cn from 'classnames';

type Props = {
  isOpen: boolean;
  close: () => void;
};

const MobileMenuModal: FC<Props> = ({ isOpen, close }) => {
  const { theme } = useUIProvider();
  const [modalTransition, setModalTransition] = useState(false);

  const handleClose = () => {
    setModalTransition(false);
    setTimeout(close, 100);
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setModalTransition(true), 100);
    }
  }, [isOpen]);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        className="MobileMenuModal relative z-modal md:hidden"
      >
        <button
          className={cn('fixed inset-0 z-[790] bg-scrim transition duration-500', {
            'pointer-events-none opacity-0': !isOpen,
            'opacity-1': isOpen,
          })}
          onClick={handleClose}
        />
        <div
          className={cn(
            'fixed bottom-0 left-0 right-0 flex w-screen translate-y-0 items-center transition-all z-[900]',
            {
              'opacity-1 translate-y-0': modalTransition,
              'translate-y-4 opacity-0': !modalTransition,
            }
          )}
        >
          <DialogPanel
            className={cn('w-full rounded-t-large border-t px-margin-mobile', {
              'border-dark-surface-3 bg-dark-surface-1': theme === Theme.Dark,
              'border-light-surface-3 bg-light-surface-1': theme === Theme.Light,
            })}
          >
            <div className="pt-margin-mobile">
              <div className="relative">
                <div className="flex flex-row-reverse mb-margin-mobile">
                  <button onClick={handleClose} className="group">
                    <Close className="h-3.5 w-3.5" />
                  </button>
                </div>
                <nav id="new-mobile-nav"></nav>
              </div>
              <div className="flex flex-row items-center justify-between">
                <h3
                  className={cn('body-1', {
                    'text-light-neutral-1': theme === Theme.Light,
                    'text-dark-neutral-1': theme === Theme.Dark,
                  })}
                >
                  Theme
                </h3>
                <ThemeSwitch />
              </div>
            </div>
            <div className="py-margin-mobile">
              <PrimaryButton
                onClick={handleClose}
                className="ml-padding-small-dense"
                label="Submit Request"
                href="/hc/en-us/requests/new"
                size="large"
                theme={theme}
                color="accent-2"
                fullWidth
              />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileMenuModal;
