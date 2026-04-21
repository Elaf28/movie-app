import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <>
        <div className='min-h-screen flex flex-col bg-slate-50'>
            <Header />
            <main >
                <Outlet />
            </main>
            <Footer />
        </div>
        </>
    );
};

export default MainLayout;
