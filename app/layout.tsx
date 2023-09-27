'use client';
import React from 'react';
import { Nunito } from 'next/font/google';
import { Providers } from './store/providers';
import WithAuthCheck from './components/withAuthCheck';
import SideBar from './components/sidebar';
import './globals.scss';

const nunito = Nunito({ subsets: ['latin'] });

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <head>
          <title>BuyCake</title>
        </head>
        <body className={nunito.className}>
          <WithAuthCheck>
            <SideBar/>
            <main className='main_container'>
              {children}
            </main>
          </WithAuthCheck>
        </body>
      </html>
    </Providers>
  );
}
