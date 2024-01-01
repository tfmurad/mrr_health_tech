import HomeBlogCard from "@/components/HomeBlogCard";
import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import CallToAction from "@/partials/CallToAction";
import SeoMeta from "@/partials/SeoMeta";
import Testimonials from "@/partials/Testimonials";
import { Blog, Button, HomepageBlogs } from "@/types";
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
    homepage_blogs: HomepageBlogs;
  } = frontmatter;

  return (
    <>
      <SeoMeta />
      <section
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%), url(${banner.image})`,
        }}
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

      {homepage_blogs.enable && (
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="mx-auto mb-12 text-center md:col-10 lg:col-8 xl:col-5">
                <h2
                  dangerouslySetInnerHTML={markdownify(homepage_blogs.title)}
                  className="mb-4"
                />
                <p
                  dangerouslySetInnerHTML={markdownify(
                    homepage_blogs.sub_title ?? "",
                  )}
                />
              </div>

              <div className="row">
                {homepage_blogs.blogs.map((blog: Blog, i: number) => (
                  <div key={i} className="col-4">
                    <HomeBlogCard blog={blog} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Testimonials data={testimonial} />
      <CallToAction data={callToAction} />
    </>
  );
};

export default Home;
