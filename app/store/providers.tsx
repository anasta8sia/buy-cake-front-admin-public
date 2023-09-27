'use client';

import React from 'react';
import store from './index';

import { Provider } from 'react-redux';

export const Providers = (props: React.PropsWithChildren) =>
  <Provider store={store}>
    {props.children}
  </Provider>;
