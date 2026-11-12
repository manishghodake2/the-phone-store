import { useState, useContext } from 'react';
import { Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.jpg';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

function Header() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const { cart, setCart } = useContext(CartContext);

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCart([]);
    setIsLoggedIn(false);
    navigate('/');
  };

  const totalItems = cart.reduce((total, item) => total + item.cartQuantity, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-white/30 bg-gradient-to-r from-slate-100/95 via-slate-200/85 to-slate-500/60 shadow-md backdrop-blur-sm">
      {' '}
      <div className="mx-auto flex h-22 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link to="/products" className="flex items-center">
          <img
            src={logo}
            alt="Phone Store"
            className="h-22 w-auto object-contain border-2 border-slate-300 rounded-lg"
          />
        </Link>

        {/* Navigation */}
        <div className="mx-6 hidden flex-1 md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search smartphones..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  navigate(
                    `/products?search=${encodeURIComponent(searchTerm)}`,
                  );
                }
              }}
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-5 pr-12 text-sm text-slate-700 shadow-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />

            <button
              type="button"
              onClick={() => {
                if (searchTerm.trim() !== '') {
                  navigate(
                    `/products?search=${encodeURIComponent(searchTerm)}`,
                  );
                }
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-orange-600"
            >
              <Search size={20} />
            </button>
          </div>
        </div>

        <nav className="hidden md:flex items-center">
          <Link
            to="/products"
            className="relative px-5 py-2 text-sm font-semibold tracking-wide text-slate-700 transition duration-300 hover:text-blue-600"
          >
            Products
            <span className="absolute bottom-0 left-5 right-5 h-[2px] origin-left scale-x-0 rounded-full bg-blue-500 transition duration-300 group-hover:scale-x-100"></span>
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link
                to="/cart"
                className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-900 hover:text-white"
              >
                Cart ({totalItems})
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-xl border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold tracking-wide text-slate-800 shadow-sm transition duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white hover:shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="rounded-xl border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold tracking-wide text-slate-800 shadow-sm transition duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white hover:shadow-md"
              >
                Login
              </Link>

              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
