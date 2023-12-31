import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import CallToAction from "@/partials/CallToAction";
import SeoMeta from "@/partials/SeoMeta";
import Testimonials from "@/partials/Testimonials";
import { Button, Feature, HomepageBlogs } from "@/types";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const Home = () => {
  const homepage = getListPage("homepage/_index.md");
  const testimonial = getListPage("sections/testimonial.md");
  const callToAction = getListPage("sections/call-to-action.md");
  const { frontmatter } = homepage;
  const {
    banner,
    homepage_blogs,
  }: {
    banner: {
      title: string;
      tag_line: string;
      image: string;
      content?: string;
      button?: Button;
    };
    homepage_blogs: HomepageBlogs[];
  } = frontmatter;

  console.log(homepage_blogs)
  return (
    <>
      <SeoMeta />
      <section
        style={{ backgroundImage: `url(${banner.image})` }}
        className="bg-cover bg-center bg-no-repeat"
      >
        <div className="section">
          <div className="container-lg">
            <div className="row">
              <div className="col-6">
                <p
                  className="mb-4 bg-primary font-semibold h5 text-dark rounded-full inline-block px-6 py-2"
                  dangerouslySetInnerHTML={markdownify(banner.tag_line ?? "")}
                />
                <h1
                  className="mb-6 text-white"
                  dangerouslySetInnerHTML={markdownify(banner.title)}
                />
                <p
                  className="mb-10 text-white"
                  dangerouslySetInnerHTML={markdownify(banner.content ?? "")}
                />
                {banner.button && banner.button.enable && (
                  <Link
                    className="btn btn-primary px-12 py-6"
                    href={banner.button.link}
                  >
                    <span>{banner.button.label}</span>
                    <FaArrowRightLong className="ml-2 inline-block" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* {features.map((feature, index: number) => (
        <section
          key={index}
          className={`section-sm ${index % 2 === 0 && "bg-gradient"}`}
        >
          <div className="container">
            <div className="row items-center justify-between">
              <div
                className={`mb:md-0 mb-6 md:col-5 ${
                  index % 2 !== 0 && "md:order-2"
                }`}
              >
                <ImageFallback
                  src={feature.image}
                  height={480}
                  width={520}
                  alt={feature.title}
                />
              </div>
              <div
                className={`md:col-7 lg:col-6 ${
                  index % 2 !== 0 && "md:order-1"
                }`}
              >
                <h2
                  className="mb-4"
                  dangerouslySetInnerHTML={markdownify(feature.title)}
                />
                <p
                  className="mb-8 text-lg"
                  dangerouslySetInnerHTML={markdownify(feature.content)}
                />
                <ul>
                  {feature.bulletpoints.map((bullet: string) => (
                    <li className="relative mb-4 pl-6" key={bullet}>
                      <FaCheck className={"absolute left-0 top-1.5"} />
                      <span dangerouslySetInnerHTML={markdownify(bullet)} />
                    </li>
                  ))}
                </ul>
                {feature.button.enable && (
                  <Link
                    className="btn btn-primary mt-5"
                    href={feature.button.link}
                  >
                    {feature.button.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      ))} */}

      <Testimonials data={testimonial} />
      <CallToAction data={callToAction} />
    </>
  );
};

export default Home;
