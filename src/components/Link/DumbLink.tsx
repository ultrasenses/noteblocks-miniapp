import { classNames } from '@telegram-apps/sdk-react';
import { FC } from 'react';
import { Link as RouterLink, type LinkProps } from 'react-router-dom';

import classes from './Link.module.css';

export const DumbLink: FC<LinkProps> = ({ className, to, ...rest }) => {
  return (
    <RouterLink
      {...rest}
      to={to}
      className={classNames(className, classes.link)}
    />
  );
};
