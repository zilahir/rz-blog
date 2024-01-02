import React, { ReactElement } from "react";

import Link from "next/link";

interface MenuItem {
  label: string | ReactElement;
  target: string;
}

type INavbarProps = {
  links: MenuItem[][];
};

const Navbar = (props: INavbarProps) => (
  <>
    <ul className="navbar flex flex-wrap flex-1 text-xl">
      {props.links[0].map(({ label, target }) => (
        <li className="mr-6" key={target}>
          <Link href={target}>{label}</Link>
        </li>
      ))}
      <style jsx>
        {`
          .navbar :global(a) {
            @apply text-deep-blush-200;
          }

          .navbar :global(a:hover) {
            @apply no-underline text-deep-blush-400;
          }
        `}
      </style>
    </ul>
    <ul className="navbar flex flex-wrap text-xl cursor-pointer">
      {props.links[1].map(({ label, target }) => (
        <li key={target} className="mr-6">
          <Link href={target}>
            <a>{label}</a>
          </Link>
        </li>
      ))}
      <style jsx>
        {`
          .navbar :global(a:hover) {
            @apply text-white-50;
          }
        `}
      </style>
    </ul>
  </>
);

export { Navbar };
