import Footer from "@/components/Footer";
import Header from "@/components/Header";

import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
