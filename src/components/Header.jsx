"use client";

import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-md">
      {/* Logo / Home Link */}
      <Link
        href="/"
        className="text-3xl font-bold text-white hover:text-blue-400 transition-colors duration-300"
      >
        Quiz App
      </Link>
    </header>
  );
};

export default Header;
