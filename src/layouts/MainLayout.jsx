import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useMovieStore } from '@/Store/zustand/useMovieStore';
import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router';

const MainLayout = () => {
  const sync = useMovieStore((state) => state.syncWithUser);
  useEffect(() => {
    sync();
  }, [sync]);
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </>
  );
};

export default MainLayout;
