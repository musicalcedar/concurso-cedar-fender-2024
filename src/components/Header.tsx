import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link as ScrollLink, Events, scrollSpy } from "react-scroll";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navItems = [
    {
      name: "Inicio",
      href: "home", // Ajuste de id para scroll
    },
    {
      name: "Acerca del concurso",
      href: "about",
    },
    {
      name: "Premios",
      href: "awards",
    },
    {
      name: "Registro",
      href: "registration",
    },
    {
      name: "Preguntas frecuentes",
      href: "faq",
    },
  ];

  useEffect(() => {
    Events.scrollEvent.register("begin", function (to, element) {
      //console.log("begin", to, element);
    });

    Events.scrollEvent.register("end", function (to, element) {
      //console.log("end", to, element);
    });

    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="w-full max-w-screen-lg lg:fixed  flex flex-row justify-between items-center h-14 lg:left-1/2 lg:-translate-x-1/2">
      <p className="p-2 text-slate-200 lg:hidden">Cazatalentos Cedar Fender</p>
      <button
        onClick={toggleMenu}
        className=" w-auto p-2 rounded-lg border-white border lg:hidden"
      >
        <XMarkIcon
          className={`${isOpen ? "" : "hidden"} w-8 h-8 text-slate-200`}
        />
        <Bars3Icon
          className={`${isOpen ? "hidden" : ""} w-8 h-8 text-slate-200`}
        />
      </button>

      <nav
        className={`${isOpen ? "" : "hidden"} bg-transparent lg:bg-transparent w-full absolute top-[56px] lg:block lg:fixed  lg:max-w-screen-lg  lg:h-16 lg:top-2 lg:border lg:border-black lg:rounded-full z-10`}
      >
        <ul className="flex flex-col justify-between items-center lg:flex-row lg:my-0">
          {navItems.map((item) => (
            <li
              key={item.href}
              className={`py-4 text-center w-full h-full items-center   lg:mb-0 lg:h-[63px] lg:rounded-full ${activeSection === item.href ? "bg-black  text-neutral-100" : activeSection === "home" ? "bg-transparent text-slate-200" : ""}`}
            >
              <ScrollLink
                to={item.href}
                spy
                smooth
                duration={500}
                onSetActive={() => setActiveSection(item.href)}
                className="block w-full h-full cursor-pointer  font-bold"
                onClick={() => toggleMenu()}
              >
                {item.name}
              </ScrollLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
