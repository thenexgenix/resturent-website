import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <section className="py-10 bg-bg-footer text-footer-text sm:pt-16 lg:pt-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <h4 className="text-bg-primary text-5xl font-bold ">QuickBite</h4>

            <p className="text-base leading-relaxed text-footer-text mt-7">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>

            <ul className="flex items-center space-x-3 mt-9">
              {["#", "#", "#", "#"].map((href, index) => (
                <li key={index}>
                  <Link
                    to={href}
                    title=""
                    className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600"
                  >
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="..." />{" "}
                      {/* use appropriate path from your SVGs */}
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-widest  uppercase">
              Company
            </p>
            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  to="/about"
                  className="flex text-base  transition-all duration-200 hover:text-bg-primary focus:text-bg-primary"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className="flex text-baset transition-all duration-200 hover:text-bg-primary focus:text-bg-primary"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/works"
                  className="flex text-base transition-all duration-200 hover:text-bg-primary focus:text-bg-primary"
                >
                  Works
                </Link>
              </li>
              <li>
                <Link
                  to="/career"
                  className="flex text-base  transition-all duration-200 hover:text-bg-primary focus:text-bg-primary"
                >
                  Career
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-widest uppercase">
              Help
            </p>
            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  to="/support"
                  className="flex text-base  transition-all duration-200 hover:text-bg-primary focus:text-bg-primary"
                >
                  Customer Support
                </Link>
              </li>
              <li>
                <Link
                  to="/delivery"
                  className="flex text-base  transition-all duration-200 hover:text-bg-primary focus:text-bg-primary"
                >
                  Delivery Details
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="flex text-base  transition-all duration-200 hover:text-bg-primary focus:text-bg-primary"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="flex text-base  transition-all duration-200 hover:text-bg-primary focus:text-bg-primary"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
            <p className="text-sm font-semibold tracking-widest  uppercase">
              Subscribe to newsletter
            </p>
            <form action="#" method="POST" className="mt-6">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="block w-full p-4  placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-4 mt-3 font-semibold text-white transition-all duration-200 bg-bg-primary rounded-md "
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="mt-16 mb-10 border-gray-200" />
        <p className="text-sm text-center ">
          © Copyright 2021, All Rights Reserved by Quickbite
        </p>
      </div>
    </section>
  );
};

export default Footer;
