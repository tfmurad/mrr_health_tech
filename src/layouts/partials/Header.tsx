"use client";

import Logo from "@/components/Logo";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import Button from "@/shortcodes/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";
import Image from "next/image";
import Social from "@/components/Social";
import social from "@/config/social.json";

//  child navigation link interface
export interface IChildNavigationLink {
  name: string;
  url: string;
}

// navigation link interface
export interface INavigationLink {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: IChildNavigationLink[];
}

const Header = () => {
  // destructuring the main menu from menu object
  const { main }: { main: INavigationLink[] } = menu;
  const { navigation_button, header_taglines, settings, approved_by } = config;
  // get current path
  const pathname = usePathname();

  // scroll to top on route change
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return (
    <header
      className={`header z-30 ${settings.sticky_header && "sticky top-0"}`}
    >
      <nav className="navbar container">
        {/* logo */}
        <div className="order-2 lg:order-0 max-lg:mt-5">
          <Logo />
        </div>

        <div className="order-0 flex items-center justify-between max-lg:w-full lg:gap-x-10 md:order-1 text-white">
          {header_taglines && (
            <div className="flex flex-col lg:flex-row gap-x-4 lg:items-center lg:text-xl font-bold">
              <p>{header_taglines.primary_tagline}</p>
              <FaCircle className="text-primary max-lg:hidden" size={10} />
              <p>{header_taglines.secondary_tagline}</p>
            </div>
          )}

          {navigation_button.enable && (
            // <Link
            //   className="btn btn-outline-primary btn-sm hidden lg:inline-block"
            //   href={navigation_button.link}
            // >
            //   {navigation_button.label}
            // </Link>
            <Button
              label={navigation_button.label}
              link={navigation_button.link}
              Icon={FaArrowRightLong}
            />
          )}
        </div>

        <div className="order-2 mt-5 lg:mt-10 flex justify-between lg:w-full">
          {/* navbar toggler */}
          <input id="nav-toggle" type="checkbox" className="hidden" />
          <label
            htmlFor="nav-toggle"
            className="order-3 cursor-pointer flex items-center lg:hidden lg:order-1 text-white border border-border p-2 rounded-md"
          >
            <svg
              id="show-button"
              className="h-4 fill-current block"
              viewBox="0 0 20 20"
            >
              <title>Menu Open</title>
              <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
            </svg>
            <svg
              id="hide-button"
              className="h-4 fill-current hidden"
              viewBox="0 0 20 20"
            >
              <title>Menu Close</title>
              <polygon
                points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                transform="rotate(45 10 10)"
              ></polygon>
            </svg>
          </label>
          {/* /navbar toggler */}

          <ul
            id="nav-menu"
            className="navbar-nav hidden w-full pb-6 lg:flex lg:w-auto lg:space-x-2 lg:pb-0 xl:space-x-10"
          >
            {main.map((menu, i) => (
              <React.Fragment key={`menu-${i}`}>
                {menu.hasChildren ? (
                  <li className="nav-item nav-dropdown group relative">
                    <span
                      className={`nav-link inline-flex items-center ${
                        menu.children
                          ?.map(({ url }) => url)
                          .includes(pathname) ||
                        menu.children
                          ?.map(({ url }) => `${url}/`)
                          .includes(pathname)
                          ? "active"
                          : ""
                      }`}
                    >
                      {menu.name}
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                    <ul className="nav-dropdown-list hidden group-hover:block lg:invisible lg:absolute lg:block lg:opacity-0 lg:group-hover:visible lg:group-hover:opacity-100">
                      {menu.children?.map((child, i) => (
                        <li className="nav-dropdown-item" key={`children-${i}`}>
                          <Link
                            href={child.url}
                            className={`nav-dropdown-link block ${
                              (pathname === `${child.url}/` ||
                                pathname === child.url) &&
                              "active"
                            }`}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link
                      href={menu.url}
                      className={`nav-link block ${
                        (pathname === `${menu.url}/` ||
                          pathname === menu.url) &&
                        "active"
                      }`}
                    >
                      {menu.name}
                    </Link>
                  </li>
                )}
              </React.Fragment>
            ))}

            {navigation_button.enable && (
              <li className="mt-4 inline-block lg:hidden">
                <Link
                  className="btn btn-outline-primary btn-sm"
                  href={navigation_button.link}
                >
                  {navigation_button.label}
                </Link>
              </li>
            )}
          </ul>

          <div className="flex items-center gap-x-6">
            {approved_by.enable && (
              <Image
                src={approved_by.dmca_url}
                alt="DMCA"
                width={124}
                height={36}
                className="max-md:w-12 max-md:h-4 max-lg:mr-4"
              />
            )}
            <Social
              source={social.main}
              className="social-icons max-lg:hidden"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
