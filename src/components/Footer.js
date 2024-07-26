import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRq_LmiEG7PEV3p9MGjSYDxsn1BzvEy5fEdg&s"
              alt="Logo"
              className="h-12 mr-3"
            />
            <span className="text-2xl font-bold">Food Villa</span>
          </div>

          {/* Links */}
          <div className="flex space-x-8">
            <Link  className="text-white hover:text-gray-400">
              Home
            </Link>
            <Link  className="text-white hover:text-gray-400">
              About Us
            </Link>
            <Link  className="text-white hover:text-gray-400">
              Contact
            </Link>
            <Link  className="text-white hover:text-gray-400">
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-6 flex justify-center space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <i className="fab fa-facebook-f"></i> {/* Add FontAwesome icon */}
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <i className="fab fa-twitter"></i> {/* Add FontAwesome icon */}
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <i className="fab fa-instagram"></i> {/* Add FontAwesome icon */}
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <i className="fab fa-linkedin-in"></i> {/* Add FontAwesome icon */}
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm mt-6">
          &copy; {new Date().getFullYear()} Food Villa. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
