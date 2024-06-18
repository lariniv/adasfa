"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

function Header() {
  const [burgerMenu, setBurgerMenu] = useState(false);

  useEffect(() => {
    if (burgerMenu) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [burgerMenu]);
  function handleClick() {
    setBurgerMenu(false);
  }
  return (
    <header className="fixed my-4 p-2 z-[100] items-center justify-between max-w-7xl w-11/12 md:w-full flex mt-[3.5rem] rounded-lg bg-white/20 backdrop-blur-lg">
      <Link
        href={"/"}
        onClick={() => setBurgerMenu(false)}
        className="flex z-[100] items-center justify-center gap-2"
      >
        <figure className="h-9 w-9 rounded-full bg-zenith-gradient-to-t aspect-square "></figure>
        <h1 className="text-3xl  whitespace-nowrap text-white font-semibold drop-shadow-md">
          Zenith AI
        </h1>
      </Link>

      <nav className="hidden gap-5 max-xl:gap-3 lg:flex text-primary">
        <Button
          onClick={() => {
            const element = document.getElementById("forClients");
            element &&
              window.scrollTo({
                top: element?.offsetTop - 200,
                behavior: "smooth",
              });
          }}
        >
          For Clients
        </Button>
        <Button
          onClick={() => {
            const element = document.getElementById("forVendors");
            element &&
              window.scrollTo({
                top: element?.offsetTop - 200,
                behavior: "smooth",
              });
          }}
        >
          For Vendors
        </Button>
        <Button target="_blank" href="https://zenithai.substack.com/">
          AI Strategy
          <br />
          Newsletter
        </Button>
        <Button
          onClick={() => {
            const element = document.getElementById("aboutUs");
            element &&
              window.scrollTo({
                top: element?.offsetTop - 200,
                behavior: "smooth",
              });
          }}
        >
          About Us
        </Button>
        <Link
          target="_blank"
          href={
            "https://ien3r4fhpkk.typeform.com/to/tzSoVio1?typeform-source=www.linkedin.com"
          }
        >
          <button className="bg-zenith-gradient-to-t outline-none flex hover:opacity-80 transition-opacity duration-300 items-center justify-center border-white border-2 h-16 font-semibold text-white w-40 rounded-md">
            Let`s talk!
          </button>
        </Link>
      </nav>

      <input
        checked={burgerMenu}
        onChange={() => setBurgerMenu(!burgerMenu)}
        className="lg:hidden z-50"
        type="checkbox"
        id="checkbox"
      />
      <label htmlFor="checkbox" className="toggle z-50 lg:hidden">
        <div className="bars" id="bar1"></div>
        <div className="bars" id="bar2"></div>
        <div className="bars" id="bar3"></div>
      </label>

      <nav
        className={` flex-col  ${
          burgerMenu ? "max-lg:flex overflow-hidden" : "hidden"
        } w-screen h-[110vh] lg:hidden outline-none fixed backdrop-blur-lg left-[calc(50%-50vw)] z-[20] -translate-y-[64px] bg-black/80 gap-5 items-start px-3 justify-center top-0`}
      >
        <Button
          onClick={() => {
            const element = document.getElementById("forClients");
            element &&
              window.scrollTo({
                top: element?.offsetTop - 200,
                behavior: "smooth",
              });
            handleClick();
          }}
        >
          For Clients
        </Button>

        <Button
          onClick={() => {
            const element = document.getElementById("forVendors");
            element &&
              window.scrollTo({
                top: element?.offsetTop - 200,
                behavior: "smooth",
              });
            handleClick();
          }}
        >
          For Vendors
        </Button>

        <Button target="_blank" href="https://zenithai.substack.com/">
          AI Strategy
          <br />
          Newsletter
        </Button>

        <Button
          onClick={() => {
            const element = document.getElementById("aboutUs");
            element &&
              window.scrollTo({
                top: element?.offsetTop - 200,
                behavior: "smooth",
              });
            handleClick();
          }}
        >
          About Us
        </Button>

        <Link
          target="_blank"
          href={
            "https://ien3r4fhpkk.typeform.com/to/tzSoVio1?typeform-source=www.linkedin.com"
          }
        >
          <button className="bg-zenith-gradient-to-t outline-none flex hover:opacity-80 transition-opacity duration-300 items-center justify-center border-white border-2 h-16 font-semibold text-white w-40 rounded-md">
            Let`s talk!
          </button>
        </Link>
      </nav>
    </header>
  );
}

function Button({
  children,
  href,
  onClick,
  target,
}: {
  children: React.ReactNode;
  href?: string;
  target?: string;
  onClick?: () => void;
}) {
  if (href)
    return (
      <Link
        target={target}
        href={href}
        onClick={onClick}
        className="bg-zenith-gradient outline-none block hover:opacity-80 transition-opacity duration-300 h-16 p-0.5 w-40 rounded-md"
      >
        <div className="w-full h-full flex rounded-[4px]  items-center font-semibold text-primary justify-center bg-white">
          {children}
        </div>
      </Link>
    );

  if (!href)
    return (
      <div
        onClick={onClick}
        className="cursor-pointer bg-zenith-gradient outline-none block hover:opacity-80 transition-opacity duration-300 h-16 p-0.5 w-40 rounded-md"
      >
        <div className="w-full h-full flex rounded-[4px]  items-center font-semibold text-primary justify-center bg-white">
          {children}
        </div>
      </div>
    );
}
export default Header;
