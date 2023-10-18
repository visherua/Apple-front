import { ReactNode } from 'react';

import MainNavigation from './main-navigation';

interface LayoutProps {
  children: ReactNode;
}

function Layout(props: LayoutProps) {
  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      <MainNavigation />
      <main>{props.children}</main>
    </>
  );
}

export default Layout;