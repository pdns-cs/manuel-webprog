import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F8EF] text-zinc-900">
      <NavBar />
      <main className="pb-16 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
