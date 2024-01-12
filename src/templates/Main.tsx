import React, { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

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
      <div className="flex pt-6">
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
            [],
          ]}
        />
        <ThemeSwithcer />
      </div>

      <div className="border-b border-white-900 pt-16 pb-8">
        <div className="flex flex-row justify-center items-center">
          <div className="flex-1">
            <div className="font-semibold text-3xl flex justify-between">
              <h1 className="dark:text-white-50">
                <Link href="/">
                  <a className="text-deep-blush-400 hover:no-underline">
                    {AppConfig.title}
                  </a>
                </Link>
              </h1>
              <div>
                <Image
                  src="/assets/images/profile.png"
                  alt="zilahir"
                  width={30}
                  height={30}
                  className="rounded-md"
                />
              </div>
            </div>
            <div className="text-xl">
              <h2 className="dark:text-white-100">{AppConfig.description}</h2>
            </div>
          </div>
          <div></div>
        </div>
        <div className="flex items-center pb-[20px]"></div>
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
