import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-white">
        {/* Left side: Text */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm md:text-base font-semibold">
            © {new Date().getFullYear()}{" "}
            <span className="font-bold">CollegeMate</span>. All rights reserved.
          </p>
          <p className="text-xs md:text-sm mt-1">
            Created by
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="underline ml-1 hover:text-gray-200"
            >
              SRISHTY JAIN
            </a>
          </p>
        </div>

        {/* Right side: Icons */}
        <div className="flex gap-6">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-200 transition-all duration-300 text-2xl"
          >
            <FaGithub />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-200 transition-all duration-300 text-2xl"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
