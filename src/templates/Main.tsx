import React, { ReactNode } from "react";

import Link from "next/link";
import { FaTwitter } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

import ThemeSwithcer from "../components/ThemeSwitcher";
import { Navbar } from "../navigation/Navbar";
import { AppConfig } from "../utils/AppConfig";

interface IMainProps {
  meta?: ReactNode;
  children: ReactNode;
}

const Main = (props: IMainProps) => (
  <div className="antialiased w-full text-gray-700 px-3 md:px-0">
    {props.meta && props.meta}

    <div className="max-w-screen-md mx-auto">
      <div className="border-b border-white-900">
        <div className="pt-16 pb-8 flex flex-row justify-center items-center">
          <div className="flex-1">
            <div className="font-semibold text-3xl">
              <h1 className="dark:text-white-50">
                <Link href="/">
                  <a className="text-deep-blush-400 hover:no-underline">
                    {AppConfig.title}
                  </a>
                </Link>
              </h1>
            </div>
            <div className="text-xl">
              <h2 className="dark:text-white-100">{AppConfig.description}</h2>
            </div>
          </div>
          <div>
            <ThemeSwithcer />
          </div>
        </div>
        <div className="flex items-center pb-[20px]">
          <Navbar
            links={[
              [
                {
                  label: "Home",
                  target: "/",
                },
                {
                  label: "About",
                  target: "/about",
                },
              ],
              [
                {
                  label: <FiGithub />,
                  target: "https://www.github.com/zilahir",
                },
                {
                  label: <FaTwitter />,
                  target: "https://twitter.com/zilahy",
                },
              ],
            ]}
          />
        </div>
      </div>

      <div className="text-xl py-5">{props.children}</div>

      <div className="border-t border-white-900 text-center py-8 text-sm">
        {AppConfig.title}. made with{" "}
        <span role="img" aria-label="Love">
          ♥
        </span>
      </div>
    </div>
  </div>
);

export { Main };
