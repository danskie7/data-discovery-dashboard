import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="md:flex min-h-screen">
      <aside className="hidden md:block w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:text-gray-400">Home</a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-gray-400">Companies</a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-grow p-6 bg-gray-100">{children}</main>
      <footer className="md:hidden bg-gray-800">
        <nav>
          <ul className="flex justify-between px-20 py-5">
            <li className="mb-2">
              <a href="#" className="hover:text-gray-400">Home</a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-gray-400">Companies</a>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default Layout;
