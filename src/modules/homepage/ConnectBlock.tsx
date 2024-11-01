import { FC } from 'react';
import { ConnectBlock as ConnectBlockType } from '../../lib/types';

import { HelpCircle, Chat } from './Icons';

import cn from 'classnames';
import NewsletterForm from './NewsletterForm';

type Props = {
  connectBlock?: ConnectBlockType;
};

const ConnectBlock: FC<Props> = ({ connectBlock }) => {
  if (!connectBlock) {
    return null;
  }

  return (
    <div className="ConnectBlock pt-padding-x-large">
      <h2 className="heading-2 md:heading-1 text-light-neutral-1 dark:text-dark-neutral-1">
        {connectBlock.title}
      </h2>
      <div className="default-grid mt-margin-mobile sm:mt-padding-x-large">
        <div className="col-span-4 flex flex-col justify-between rounded-large bg-light-orange-fade p-8 dark:bg-dark-orange-fade-80 sm:min-h-[15.625rem] sm:pt-[1.8125rem] md:col-span-2">
          <h3 className="heading-3 dark:dark-orange-vibrant max-w-[17rem] text-light-orange-vibrant">
            {connectBlock.supportTitle}
          </h3>
          <IconButton
            href={connectBlock.supportButton.url}
            label={connectBlock.supportButton.name}
            color="orange-vibrant"
          />
        </div>
        <div className="col-span-4 flex flex-col justify-between rounded-large bg-light-brown-fade p-8 dark:bg-dark-brown-fade-80 sm:min-h-[15.625rem] sm:pt-[1.8125rem] md:col-span-2">
          <h3 className="heading-3 dark:dark-brown-vibrant max-w-[17rem] text-light-brown-vibrant">
            {connectBlock.socialTitle}
          </h3>
          <IconButton
            href={connectBlock.socialButton.url}
            label={connectBlock.socialButton.name}
            color="brown-vibrant"
          />
        </div>
        <div className="col-span-4 flex min-h-[15.625rem] flex-col justify-between space-y-12 rounded-large bg-light-pink-fade p-8 dark:bg-dark-pink-fade-80 sm:col-span-8 sm:space-y-0 sm:pt-[1.8125rem] md:col-span-4">
          <NewsletterForm
            inputClass="bg-light-surface-1 p-3 pl-[2.1875rem] text-light-pink-vibrant placeholder:text-light-pink-vibrant dark:bg-dark-surface-1 dark:text-dark-pink-vibrant dark:placeholder:text-dark-pink-vibrant border-none"
            globeColorClass="pink-vibrant"
            headerTextClass="dark:text-dark-accent-1 max-w-[25rem] text-light-accent-1"
            headerText={connectBlock.newsletterTitle}
          />
        </div>
      </div>
    </div>
  );
};

export default ConnectBlock;

const IconButton: FC<{
  href: string;
  ariaLabel?: string;
  label: string;
  color: 'orange-vibrant' | 'brown-vibrant';
}> = ({ href, label, color }) => {
  return (
    <div className="mt-12 flex">
      <a
        className="group flex items-center justify-center rounded-large bg-light-surface-1 p-3 hover:bg-light-surface-3-hovered dark:bg-dark-surface-1 dark:hover:bg-dark-surface-3-hovered"
        href={href}
      >
        {color === 'orange-vibrant' && <HelpCircle className="mr-2 h-6 w-6" color={color} />}
        {color === 'brown-vibrant' && <Chat className="mr-2 h-6 w-6" color={color} />}
        <span
          className={cn('button-label-1 transition', {
            'text-light-orange-vibrant dark:text-dark-orange-vibrant': color === 'orange-vibrant',
            'text-light-brown-vibrant dark:text-dark-brown-vibrant': color === 'brown-vibrant',
          })}
        >
          {label}
        </span>
      </a>
    </div>
  );
};
