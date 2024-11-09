import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-6">
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
    </div>
  );
};

export default Layout;
