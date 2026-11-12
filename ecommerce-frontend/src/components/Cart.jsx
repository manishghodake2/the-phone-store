import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const handleIncreaseQuantity = (item) => {
    setCart((prevCart) =>
      prevCart.map((product) => {
        if (product.id === item.id) {
          if (product.cartQuantity < product.quantity) {
            return {
              ...product,
              cartQuantity: product.cartQuantity + 1,
            };
          }
        }
        return product;
      }),
    );
  };

  const handleDecreaseQuantity = (item) => {
    setCart((prevCart) =>
      prevCart
        .map((product) => {
          if (product.id === item.id) {
            return {
              ...product,
              cartQuantity: product.cartQuantity - 1,
            };
          }
          return product;
        })
        .filter((product) => product.cartQuantity > 0),
    );
  };

  const handleRemove = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const totalItems = cart.reduce((total, item) => total + item.cartQuantity, 0);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.cartQuantity,
    0,
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Shopping Cart</h1>
          <p className="mt-2 text-sm text-slate-500">
            {totalItems} item(s) in your cart
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800">
              Your cart is empty
            </h2>
            <p className="mt-2 text-slate-500">
              Discover your next smartphone.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-block rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
            <section className="space-y-4 lg:col-span-2">
              {cart.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row"
                >
                  <div className="flex h-40 w-full shrink-0 items-center justify-center rounded-xl bg-slate-50 p-3 sm:w-36">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Brand: {item.brand || 'Not specified'}
                      </p>

                      {item.ram && (
                        <p className="mt-1 text-sm text-slate-500">
                          RAM: {item.ram} GB
                        </p>
                      )}

                      <p className="mt-3 text-lg font-semibold text-slate-800">
                        ₹{Number(item.price).toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleDecreaseQuantity(item)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-lg hover:bg-slate-100"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>

                        <span className="min-w-6 text-center font-semibold">
                          {item.cartQuantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleIncreaseQuantity(item)}
                          disabled={item.cartQuantity >= item.quantity}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-lg hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </div>

                      <p className="font-bold text-slate-900">
                        ₹
                        {(
                          Number(item.price) * item.cartQuantity
                        ).toLocaleString('en-IN')}
                      </p>

                      <button
                        type="button"
                        onClick={() => handleRemove(item.id)}
                        className="text-sm font-medium text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-28">
              <h2 className="text-xl font-bold text-slate-900">
                Order Summary
              </h2>

              <div className="mt-5 flex justify-between text-sm text-slate-600">
                <span>Items ({totalItems})</span>
                <span>₹{Number(totalPrice).toLocaleString('en-IN')}</span>
              </div>

              <div className="mt-4 flex justify-between border-t border-slate-200 pt-4">
                <span className="font-semibold text-slate-900">Total</span>
                <span className="text-xl font-bold text-orange-600">
                  ₹{Number(totalPrice).toLocaleString('en-IN')}
                </span>
              </div>

              <button
                type="button"
                className="mt-6 w-full rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
                onClick={() => alert('Checkout will be implemented next.')}
              >
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="mt-4 block text-center text-sm font-medium text-slate-600 hover:text-orange-600"
              >
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

export default Cart;
