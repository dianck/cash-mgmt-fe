'use client';

import { Mail, Lock } from 'lucide-react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
    // Logic autentikasi bisa ditambahkan di sini
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-10 to-purple-200 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-[var(--foreground)] text-center mb-2">Sign In</h2>
        <p className="text-[var(--foreground)] text-center text-sm mb-6">Welcome back! Please login to continue.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--foreground)] hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-md transition"
            >
            Login
          </button>
        </form>

        {/* <p className="text-sm text-center text-gray-500 mt-4">
          Don't have an account? <a href="#" className="text-indigo-600 hover:underline">Register</a>
        </p> */}
      </div>
    </div>
  );
}
