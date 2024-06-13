"use client";

import Link from "next/link";

function Footer() {
  return (
    <div className="flex flex-col items-center justify-center	w-full mt-28">
      <section className="pb-24 flex flex-col items-center justify-center gap-20">
        <h1 className="text-white text-center font-bold text-3xl">
          Ready to bring your company into AI era?
        </h1>
        <div className="flex text-2xl gap-10 max-md:flex-col lg:gap-28 mx-auto ">
          <Link
            href="https://zenithai.substack.com/"
            target="_blank"
            className="w-full md:w-[360px] lg:w-[400px] max-md:px-4 border-2 border-white font-semibold py-5 rounded-lg flex items-center justify-center"
          >
            <p className="text-white max-md:text-lg">
              Join our <i>AI Strategy</i> Newsletter!
            </p>
          </Link>
          <Link
            className="w-full md:w-[360px] lg:w-[400px] py-5 bg-white font-semibold rounded-lg flex items-center justify-center max-md:text-lg"
            target="_blank"
            href="https://ien3r4fhpkk.typeform.com/to/tzSoVio1?typeform-source=www.linkedin.com"
          >
            <p className="clip-gradient font-bold">
              Sign up to join our Platform!
            </p>
          </Link>
        </div>
      </section>
      <div className="w-full bg-white">
        <footer className="h-[500px] relative max-w-7xl flex flex-col justify-start items-start p-5 md:p-20 mx-auto w-full section rounded-md">
          <article
            className="flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => {
              window.scrollTo({ behavior: "smooth", top: 0 });
            }}
          >
            <figure className="w-9 h-9 bg-zenith-gradient-to-t rounded-full"></figure>
            <h1 className="heading">Zenith AI</h1>
          </article>
          <div className="flex flex-col md:flex-row justify-between md:max-w-[70%] w-full mx-1 gap-4 md:mx-12 mt-20">
            <section className="flex flex-col gap-4">
              <button
                className="footer-item block text-start"
                onClick={() => {
                  window.scrollTo({ behavior: "smooth", top: 0 });
                }}
              >
                <b>zenith.ai</b>
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById("forClients");

                  element &&
                    window.scrollTo({
                      behavior: "smooth",
                      top: element.offsetTop - 200,
                    });
                }}
                className="footer-item text-start"
              >
                For clients
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById("forVendors");
                  element &&
                    window.scrollTo({
                      behavior: "smooth",
                      top: element.offsetTop - 200,
                    });
                }}
                className="footer-item text-start"
              >
                For Vendors
              </button>
              <Link
                href="https://zenithai.substack.com/"
                target="_blank"
                className="footer-item block text-start"
              >
                AI Strategy Newsletter
              </Link>
              <button
                className="footer-item block text-start"
                onClick={() => {
                  const element = document.getElementById("aboutUs");
                  element &&
                    window.scrollTo({
                      behavior: "smooth",
                      top: element.offsetTop - 200,
                    });
                }}
              >
                About Us
              </button>
            </section>
          </div>
          <Link
            href={"https://www.linkedin.com/company/ai-zenith/"}
            className="block absolute right-10 bottom-10"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M34.6996 2.50146H5.4894C3.89331 2.50146 2.49878 3.6499 2.49878 5.22725V34.5022C2.49878 36.0882 3.89331 37.5015 5.4894 37.5015H34.691C36.2957 37.5015 37.4988 36.0788 37.4988 34.5022V5.22725C37.5082 3.6499 36.2957 2.50146 34.6996 2.50146ZM13.348 31.6757H8.33394V16.0858H13.348V31.6757ZM11.0144 13.7155H10.9785C9.37378 13.7155 8.33472 12.521 8.33472 11.0257C8.33472 9.50303 9.40112 8.33662 11.0417 8.33662C12.6824 8.33662 13.6863 9.49443 13.7222 11.0257C13.7214 12.521 12.6824 13.7155 11.0144 13.7155ZM31.673 31.6757H26.6589V23.1515C26.6589 21.1093 25.9292 19.714 24.1152 19.714C22.7292 19.714 21.9089 20.6515 21.5441 21.5647C21.4074 21.8929 21.3707 22.3397 21.3707 22.796V31.6757H16.3566V16.0858H21.3707V18.2554C22.1003 17.2163 23.2402 15.721 25.8925 15.721C29.1839 15.721 31.6738 17.8905 31.6738 22.5679L31.673 31.6757Z"
                fill="url(#paint0_linear_184_481)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_184_481"
                  x1="10.8001"
                  y1="-61.6652"
                  x2="39.7163"
                  y2="-60.0875"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#25BDB3" />
                  <stop offset="0.735" stopColor="#9747FF" />
                  <stop offset="1" stopColor="#462078" />
                </linearGradient>
              </defs>
            </svg>
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
