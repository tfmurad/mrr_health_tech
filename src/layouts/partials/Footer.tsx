import Logo from "@/components/Logo";
import Social from "@/components/Social";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import social from "@/config/social.json";
import DynamicIcon from "@/helpers/DynamicIcon";
import { markdownify, slugify } from "@/lib/utils/textConverter";
import Link from "next/link";

interface FooterPage {
  page: string;
  url: string;
  icon?: string;
}

const Footer = () => {
  const { footer } = menu;
  const { copyright, footer_description } = config.params;

  return (
    <footer className="bg-theme-dark px-4">
      <div className="container-lg">
        <div className="mb-6 border-b border-[rgba(255,255,255,0.06)] py-10 lg:py-[100px] relative">
          <div className="row lg:justify-center">
            <div className="lg:col-4">
              <div>
                <Logo />
                <p
                  className="text-xs lg:text-lg text-light mt-4 mb-5 lg:mb-10"
                  dangerouslySetInnerHTML={markdownify(footer_description)}
                />
              </div>
              <div className="col-12 mb-10 xl:mb-0">
                <h3 className="h6 lg:h5 mb-4 font-semibold capitalize text-white">
                  Social
                </h3>
                <Social
                  source={social.main}
                  className="social-icons-square inline-block"
                />
              </div>
            </div>

            {footer.map((item, i) => {
              const isLastItem = i === footer.length - 1;

              return (
                <div
                  key={`footer-menu-${i}`}
                  className={`${
                    isLastItem
                      ? "col-12 lg:col-10 xl:col-3"
                      : i === 0
                        ? "col-12 sm:col-6 md:col-4 lg:col-3 xl:col-2"
                        : "col-12 sm:col-6 md:col-3 lg:col-3 xl:col-2"
                  } mb-5 pb-4 lg:mb-0 lg:pb-0`}
                >
                  <h3 className="h6 lg:h5 mb-5 font-semibold capitalize text-white">
                    {item.name}
                  </h3>

                  <ul>
                    {item.pages.map((page: FooterPage, index) => (
                      <li key={`page-${index}`} className="mb-1">
                        {page.icon && (
                          <DynamicIcon
                            className="mr-2 text-primary inline-block"
                            icon={page.icon}
                          />
                        )}
                        <Link
                          href={page.url}
                          className={`max-lg:text-xs text-light hover:text-white footer-${slugify(
                            page.page,
                          )}`}
                        >
                          {page.page}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* footer bottom */}
        <div className="max-lg:text-xs text-center text-light pb-6">
          <p dangerouslySetInnerHTML={markdownify(copyright)} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
