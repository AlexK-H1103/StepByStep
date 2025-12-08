import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Sidebar({ onOpenTagManager, isOpen, closeSidebar }) {
  const location = useLocation();

  const baseClasses =
    "w-56 bg-gray-800/95 backdrop-blur-sm p-4 flex flex-col h-full text-gray-100 shadow-xl border-r border-gray-700";

  return (
    <>
      {/* PC Sidebar */}
      <aside
        className={`${baseClasses} hidden md:flex fixed top-14 h-[calc(100vh-3.5rem)]`}
      >
        <Nav />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`${baseClasses} fixed top-0 left-0 h-screen z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >
        <button
          className="px-3 py-2 mb-4 rounded-md bg-violet-600 text-white text-sm hover:bg-violet-700 transition"
          onClick={closeSidebar}
        >
          Close
        </button>

        <Nav closeSidebar={closeSidebar} />
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}
    </>
  );

  function Nav({ closeSidebar }) {
    const navItems = [
      { name: "Home", path: "/" },
      { name: "Goals", path: "/goals" },
      { name: "Tags", action: "openTags" },
      { name: "Calendar", path: "/calendar" },
    ];

    return (
      <nav className="flex flex-col gap-2">
        {navItems.map((item) =>
          item.action === "openTags" ? (
            <button
              key="tags"
              onClick={onOpenTagManager}
              className="flex items-center gap-2 px-3 py-2 rounded-lg
                hover:bg-violet-500/20 text-left text-gray-200 transition"
            >
              Tags
            </button>
          ) : (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeSidebar}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition border-l-4 ${
                location.pathname === item.path
                  ? "bg-violet-600/20 text-violet-300 border-violet-500"
                  : "border-transparent hover:bg-gray-700/60"
              }`}
            >
              {item.name}
            </Link>
          )
        )}
      </nav>
    );
  }
}
