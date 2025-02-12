import { useEffect, useState } from "react"
import { NAVIGATION_LINKS } from "../constants";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";

/* import logo from "../assets/logo.png"*/
    const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    useEffect(()=>{
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
        } else{
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () =>{
        setTheme(theme === "dark" ? "light" : "dark");
    };
    const toggleMobileMenu = () =>{
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }
    const handleLinkClick = (e, href) =>{
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
            const offset = -85;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY + offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            })
        }
        setIsMobileMenuOpen(false);
    }
  return (
    <div>
        <nav className="fixed left-0 right-0 top-4 z-50">
           {/*  desktop menu */}
           <div className="mx-auto hidden max-w-2xl items-center justify-center rounded-lg border border-stone-50/30 bg-black/20 py-3 backdrop-blur-lg lg:flex">
                <div className="flex items-center justify-between gap-6">
                    <div>
                            <a id="logo" href="#" className=" text-3xl hover:text-red-500">MedFolio</a>
                    </div>
                    <div className="flex items-center gap-6">
                        <ul className="flex items-center gap-4 navbar-links">
                            {NAVIGATION_LINKS.map((item, index) =>(
                                <li key={index}>
                                    <a href={item.href} className="text-sm hover:text-yellow-400" onClick={(e => handleLinkClick(e, item.href))}>
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <button onClick={toggleTheme} className="ml-4 p-2 rounded-full border border-white/30 hover:bg-white/10 transition">
                            {theme === "dark" ? <BsSun className="text-yellow-400" /> : <BsMoon className="text-blue-500"/>} 
                        </button>
                    </div>
                </div>
           </div>
           {/* Mobile menu */}
           <div className="rounded-lg backdrop-blur-md lg:hidden">
                <div className="flex items-center justify-between ">
                    <div>
                        <a href="#">
                            <a href="#" id="logo" className="m-6 text-3xl  hover:text-red-500">MedFolio</a>
                        </a>

                    </div>
                    <div className="flex items-center gap-4">

                        <button onClick={toggleTheme} className="ml-4 p-2 rounded-full border border-white/30 hover:bg-white/10 transition">
                            {theme === "dark" ? <BsSun className="text-yellow-400" /> : <BsMoon className="text-blue-500"/>} 
                        </button>

                        <button className="focus:outline-none lg:hidden" onClick={toggleMobileMenu}>
                            {isMobileMenuOpen ? (
                                <FaTimes className="m-2 h-6 w-5" />
                            ) : (
                                <FaBars className="m-2 h-6 w-5" />
                            )}
                        </button>
                    </div>
                </div>
                {isMobileMenuOpen && (
                    <ul className="ml-4 mt-4 flex flex-col gap-4 backdrop-blur-md navbar-links">
                        {NAVIGATION_LINKS.map((item, index) =>(
                            <li key={index}>
                                <a href={item.href} className="block w-full text-lg  hover:text-yellow-400" onClick={(e)=>handleLinkClick(e, item.href)}>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
           </div>
        </nav>
    </div>
  )
}

export default Navbar
