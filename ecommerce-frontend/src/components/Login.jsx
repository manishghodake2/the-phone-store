import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import loginBackground from '../assets/login-background.jpg';

function Login() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/login',
        loginData,
      );

      console.log(response.data);

      localStorage.setItem('token', response.data);
      setIsLoggedIn(true);
      navigate('/products');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${loginBackground})`,
      }}
    >
      {/* Glass Login Card */}

      <div className="w-full max-w-md rounded-3xl border border-white/40 bg-white/70 p-8 shadow-2xl backdrop-blur-xl">
        {/* Heading */}

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-wide text-slate-800">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-slate-500">Sign in to continue</p>
        </div>

        {/* Login Form */}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-300/70 bg-white/60 px-5 py-3 text-slate-800 outline-none backdrop-blur-md transition duration-300 placeholder:text-slate-400 focus:border-amber-500/70 focus:bg-white/80 focus:ring-4 focus:ring-amber-500/10"
            />
          </div>

          {/* Password */}

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700">
                Password
              </label>

              <Link
                to="/forgot-password"
                className="text-xs font-medium text-slate-600 transition hover:text-amber-600"
              >
                Forgot Password?
              </Link>
            </div>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-300/70 bg-white/60 px-5 py-3 text-slate-800 outline-none backdrop-blur-md transition duration-300 placeholder:text-slate-400 focus:border-amber-500/70 focus:bg-white/80 focus:ring-4 focus:ring-amber-500/10"
            />
          </div>

          {/* Login Button */}

          <button
            type="submit"
            className="w-full rounded-xl border border-white/40 bg-slate-800/85 py-3 font-semibold text-white shadow-lg shadow-slate-900/20 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl"
          >
            Login
          </button>
        </form>

        {/* Register */}

        <div className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?
          <Link
            to="/register"
            className="ml-1 font-semibold text-amber-700 transition hover:text-amber-600"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
