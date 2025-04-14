import React from 'react';
import Image from 'next/image';
import bg from '../assets/img/bg.webp';
import Link from 'next/link';
import { Button } from '@mui/material';

const LoginDashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  relative overflow-hidden">

      <div className="fixed inset-0 z-0 h-screen">
        <Image
          src={bg}
          alt="Background"
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'top center',
          }}
          className="overflow-hidden"
          quality={100}
          priority
        />
      </div>

      <div className="relative z-10 w-full max-w-md p-3 md:p-4 lg:p-8 m-2 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#9A5AE3]">লগইন
          </h1>
          <p className="text-gray-600 mt-2">অনুগ্রহ করে আপনার ইমেইল বা ফোন নম্বর লিখুন!</p>
        </div>

        <form className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              ইমেইল বা ফোন নম্বর
            </label>
            <input
              type="email"
              id="email"
              placeholder="আপনার ইমেইল বা ফোন নম্বর লিখুন"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#9A5AE3] focus:border-[#9A5AE3] outline-none "
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              id="password"
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#9A5AE3] focus:border-[#9A5AE3] outline-none "
              required
            />
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">

            <Link href="#" className="text-sm text-[#9A5AE3] hover:text-blue-800 underline">
              পাসওয়ার্ড ভুলে গেছেন?
            </Link>
          </div>


          <Button
            type="submit"
            href="#"
            sx={{
              backgroundColor: '#9A5AE3', 
              color: 'white', 
              fontFamily: 'inherit',
              ":hover": {
                backgroundColor: '#9b73c9', color: 'white'
              }
            }}
            className="w-full py-2 px-4  text-white font-medium rounded-lg transition duration-200"
          >
            লগইন
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginDashboard;