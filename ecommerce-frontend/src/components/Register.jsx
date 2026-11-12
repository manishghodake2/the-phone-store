import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import registerBackground from '../assets/register_background.jpg';

function Register() {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      name,
      email,
      password,
    };

    const response = await axios.post(
      'http://localhost:8080/api/auth/register',
      user,
    );

    console.log(response.data);
    navigate('/');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-end px-24 py-8"
      style={{
        backgroundImage: `url(${registerBackground})`,
      }}
    >
      {/* Glass Register Card */}

      <div className="w-full max-w-md rounded-3xl border border-white/50 bg-white/65 p-8 shadow-2xl backdrop-blur-xl">
        {/* Heading */}

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-wide text-slate-800">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-slate-500">Join The Phone Store</p>
        </div>

        {/* Register Form */}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-xl border border-slate-300/70 bg-white/60 px-5 py-3 text-slate-800 outline-none backdrop-blur-md transition duration-300 placeholder:text-slate-400 focus:border-amber-500/70 focus:bg-white/80 focus:ring-4 focus:ring-amber-500/10"
            />
          </div>

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
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-300/70 bg-white/60 px-5 py-3 text-slate-800 outline-none backdrop-blur-md transition duration-300 placeholder:text-slate-400 focus:border-amber-500/70 focus:bg-white/80 focus:ring-4 focus:ring-amber-500/10"
            />
          </div>

          {/* Register Button */}

          <button
            type="submit"
            className="w-full rounded-xl border border-white/40 bg-slate-800/85 py-3 font-semibold text-white shadow-lg shadow-slate-900/20 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl"
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}

        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account?
          <Link
            to="/"
            className="ml-1 font-semibold text-amber-700 transition hover:text-amber-600"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
