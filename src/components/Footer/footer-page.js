import React from "react";
import Link from "next/link";
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillInstagram,
} from "react-icons/ai";
import { useRouter } from "next/router";
// useRouter
const FooterPage = () => {
  const router = useRouter();

  const isDashboardPage =
    router.pathname.startsWith("/admin") ||
    router.pathname.startsWith("/customer") ||
    router.pathname.startsWith("/panel");

  return (
    <div>
      {isDashboardPage && (
        <footer className=" bg-black/80 lg:text-white transition duration-700 ease-in-out shadow-inner ">
          <div className="mx-auto w-full max-w-screen-2xl ">
            <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-3 mx-auto max-w-screen-xl ">
              <div className="">
                <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">
                  Company
                </h2>
                <ul className=" font-medium">
                  <li className="mb-4">
                    <Link href="/" className=" hover:underline">
                      Home
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link href="/aboutus/about-us" className="hover:underline">
                      About
                    </Link>
                  </li>
                  <li className="mb-4">
                    <a href="/contact/contact-page" className="hover:underline">
                      Contact
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline"></a>
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">
                  Help center
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <Link href="/services/services" className="hover:underline">
                      Service
                    </Link>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Twitter
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Facebook
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              <div className="text-right">
                <h2 className="mb-6 text-sm font-semibold  uppercase dark:text-white">
                  Legal
                </h2>
                <ul className="  font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Licensing
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Terms &amp; Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="px-4 py-6   lg:text-white transition duration-700 ease-in-out md:flex justify-center sm:items-center md:justify-center">
              <div className="flex mt-4 space-x-6 sm:justify-center md:mt-0">
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <AiFillFacebook size={25} />
                  <span className="sr-only">Facebook page</span>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <AiFillInstagram size={25} />
                  <span className="sr-only">Instagram page</span>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <AiFillLinkedin size={25} />
                  <span className="sr-only">Twitter page</span>
                </a>
              </div>
            </div>

            <span className="flex justify-center text-sm  text-gray-300">
              © {new Date().getFullYear()} <a href="#">. PEarl-TEch™ </a>. All
              Rights Reserved.
            </span>
          </div>
        </footer>
      )}
    </div>
  );
};

export default FooterPage;
