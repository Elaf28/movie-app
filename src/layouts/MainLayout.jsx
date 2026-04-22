import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router';

const ThemeWatcher = () => {
  //   const theme = useThemeStore((state) => state.theme);
  const theme = 'dark';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return null;
};

const MainLayout = () => {
  return (
    <>
      {/* <div className="min-h-screen flex flex-col bg-back"> */}
      <ThemeWatcher />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      {/* </div> */}
    </>
  );
};

export default MainLayout;
