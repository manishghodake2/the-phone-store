import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
function ProductList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedRam, setSelectedRam] = useState('');

  const { cart, setCart } = useContext(CartContext);

  const searchTerm = searchParams.get('search') || '';

  // Add product to cart
  const handleAddToCart = (product) => {
    if (product.quantity <= 0) {
      return;
    }

    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        if (existingProduct.cartQuantity >= product.quantity) {
          return prevCart;
        }

        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                cartQuantity: item.cartQuantity + 1,
              }
            : item,
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          cartQuantity: 1,
        },
      ];
    });
  };

  // Calculate total price
  // const totalPrice = cart.reduce(
  //   (total, item) => total + item.price * item.cartQuantity,
  //   0,
  // );

  // // Calculate total number of units
  // const totalItems = cart.reduce((total, item) => total + item.cartQuantity, 0);

  // // Remove product completely from cart
  // const handleRemoveFromCart = (productId) => {
  //   setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  // };

  // Increase product quantity
  const handleIncreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId && item.cartQuantity < item.quantity) {
          return {
            ...item,
            cartQuantity: item.cartQuantity + 1,
          };
        }

        return item;
      }),
    );
  };

  // Decrease product quantity
  const handleDecreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productId) {
            return {
              ...item,
              cartQuantity: item.cartQuantity - 1,
            };
          }

          return item;
        })
        .filter((item) => item.cartQuantity > 0),
    );
  };

  // Filter products by search, brand, price, and RAM
  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      (product.name || '').toLowerCase().includes(search) ||
      (product.brand || '').toLowerCase().includes(search);

    const matchesBrand =
      selectedBrand === '' || product.brand === selectedBrand;

    let matchesPrice = true;

    if (selectedPrice !== '') {
      const [min, max] = selectedPrice.split('-');

      matchesPrice =
        Number(product.price) >= Number(min) &&
        Number(product.price) <= Number(max);
    }

    let matchesRam = true;

    if (selectedRam !== '') {
      matchesRam =
        String(product.ram)
          .replace(/\s*GB\s*/i, '')
          .trim() === selectedRam;
    }

    return matchesSearch && matchesBrand && matchesPrice && matchesRam;
  });

  // Fetch products from Spring Boot API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setProducts(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to Fetch Products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Page Title */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-slate-800">
            Latest Products
          </h2>

          <p className="mt-2 text-orange-600">Explore our latest smartphones</p>
        </div>

        {/* Filters */}
        <div className="mx-auto mb-5 mt-6 flex max-w-4xl flex-col gap-4 md:flex-row">
          {/* Brand Filter */}
          <select
            value={selectedBrand}
            onChange={(event) => {
              setSelectedBrand(event.target.value);
              navigate('/products');
            }}
            className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-700 shadow-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 md:w-56"
          >
            <option value="">All Brands</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="OnePlus">OnePlus</option>
            <option value="Xiaomi">Xiaomi</option>
            <option value="Motorola">Motorola</option>
            <option value="Vivo">Vivo</option>
            <option value="Oppo">Oppo</option>
            <option value="Realme">Realme</option>
            <option value="Google">Google</option>
            <option value="Nothing">Nothing</option>
          </select>

          {/* Price Filter */}
          <select
            value={selectedPrice}
            onChange={(event) => setSelectedPrice(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-700 shadow-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 md:w-56"
          >
            <option value="">All Prices</option>
            <option value="0-20000">Under ₹20,000</option>
            <option value="20000-40000">₹20,000 - ₹40,000</option>
            <option value="40000-60000">₹40,000 - ₹60,000</option>
            <option value="60000-80000">₹60,000 - ₹80,000</option>
            <option value="80000-999999">Above ₹80,000</option>
          </select>

          {/* RAM Filter */}
          <select
            value={selectedRam}
            onChange={(event) => setSelectedRam(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-700 shadow-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 md:w-56"
          >
            <option value="">All RAM</option>
            <option value="4">4 GB</option>
            <option value="6">6 GB</option>
            <option value="8">8 GB</option>
            <option value="12">12 GB</option>
            <option value="16">16 GB</option>
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-lg text-orange-600">
            Loading Products...
          </p>
        )}

        {/* Error */}
        {error && (
          <div className="mx-auto max-w-md rounded-lg bg-red-100 p-4 text-center text-red-600">
            {error}
          </div>
        )}

        {/* Products */}
        {!loading && !error && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => {
              const existingProduct = cart.find(
                (item) => item.id === product.id,
              );

              return (
                <div
                  key={product.id}
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="cursor-pointer overflow-hidden rounded-2xl border border-slate-500 bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  {/* Product Image */}
                  <div className="flex h-64 items-center justify-center overflow-hidden bg-white">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-contain p-2 transition duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-6">
                    <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-orange-600">
                      {product.brand}
                    </p>

                    <h3 className="mb-2 text-xl font-bold text-slate-800">
                      {product.name}
                    </h3>

                    <p className="mb-4 line-clamp-2 text-sm text-slate-500">
                      {product.description}
                    </p>

                    {/* Specifications */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {product.ram} RAM
                      </span>

                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {product.storage}
                      </span>

                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {product.color}
                      </span>
                    </div>

                    {/* Price and Stock */}
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <span className="text-xl font-bold text-slate-600">
                        ₹{product.price}
                      </span>

                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        Stock: {product.quantity}
                      </span>
                    </div>

                    {/* Add to Cart / Quantity Controls */}
                    {!existingProduct ? (
                      <button
                        type="button"
                        disabled={product.quantity <= 0}
                        className="w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white transition duration-300 hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleAddToCart(product);
                        }}
                      >
                        {product.quantity <= 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                    ) : (
                      <div
                        className="flex w-full items-center justify-between rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <button
                          type="button"
                          aria-label={`Decrease ${product.name} quantity`}
                          onClick={() => handleDecreaseQuantity(product.id)}
                        >
                          −
                        </button>

                        <span>{existingProduct.cartQuantity}</span>

                        <button
                          type="button"
                          aria-label={`Increase ${product.name} quantity`}
                          disabled={
                            existingProduct.cartQuantity >= product.quantity
                          }
                          className="disabled:cursor-not-allowed disabled:opacity-50"
                          onClick={() => handleIncreaseQuantity(product.id)}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredProducts.length === 0 && (
              <p className="mt-10 text-center text-lg text-orange-600">
                No products found.
              </p>
            )}
          </div>
        )}

        {/* Cart Summary */}
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-slate-900 py-6 text-center text-slate-300">
        <p>© 2026 The Phone Store. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default ProductList;
