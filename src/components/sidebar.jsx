import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ menuData }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();

  useEffect(() => {
    menuData.forEach((menu, index) => {
      if (menu.links) {
        const isActive = menu.links.some((link) => link.to === location.pathname);
        if (isActive) {
          setOpenDropdown(index);
          setActiveMenu(index);
        }
      } else if (menu.to === location.pathname) {
        setActiveMenu(index);
      }
    });
  }, [location.pathname, menuData]);

  const toggleMenu = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <style>
        {`
          .sidebar-menu {
            width: 100%;
            max-width: 350px;
            transition: transform 0.3s ease;
            border-right: 1px solid #ccc;
          }
          .nav-item .btn-link {
            color: #000;
            transition: background-color 0.3s, color 0.3s;
            border-radius: 0;
            border-bottom: 1px solid #ddd;
          }
          .nav-item .btn-link:hover {
            background-color: #e9ecef;
            color: #007bff;
          }
          .nav-item .btn-link.active {
            background-color: #007bff;
            color: #fff;
          }
          .list-unstyled .dropdown-item {
            color: #000;
            transition: background-color 0.3s, color 0.3s;
            border-radius: 0;
            border-bottom: 1px solid #ddd;
            width: 100%; /* Agar dropdown item menyesuaikan lebar container */
          }
         
          /* Warna latar belakang isi dropdown jika dropdown terbuka */
          .dropdown-content {
            background-color: #cce5ff ;
            padding: 8px;
            border-radius: 4px;
            width: 100%; 
          }
          
          /* Dropdown Button (Container) */
          .btn-link {
            color: #343a40;
            display: flex;
            justify-content: flex-start; /* biar panah di ujung kanan */
            align-items: center;
            width: 100%;
            padding-left: 1rem;
            padding-right: 1rem;
            box-sizing: border-box;
          }

          .btn-link > span {
            display: flex;
            align-items: center;
            gap: 0.5rem; /* jarak ikon dan teks menu */
          }

          .btn-link i {
            margin-left: 10px;
            font-size: 1rem; /* Ukuran ikon di samping teks */
          }

          /* Dropdown Item */
          .dropdown-item {
            font-weight: normal; /* Font normal */
            color: #6c757d; /* Warna lebih terang */
            display: flex;
            align-items: center;
            padding: 0.75rem 1rem; /* Padding agar ikon dan teks terlihat rapi */
          }

          .dropdown-item i {
            margin-right: 8px; /* Jarak ikon dengan teks */
            color:rgb(11, 30, 48); /* Warna ikon dropdown item */
          }
        `}
      </style>
      <div
        className={`offcanvas-lg offcanvas-start bg-light sidebar-menu${isOpen ? " show" : ""}`}
        id="sidebar"
        tabIndex="-1"
        aria-labelledby="sidebar-label"
        style={{
          width: "100%",
          maxWidth: "300px",
          position: "fixed",
          top: "57px",
          paddingBottom: "77px",
          height: "100vh",
          overflowY: "auto",
          zIndex: 1055,
          background: "#f8f9fa",
        }}
      >
        <div className="offcanvas-header d-lg-none">
          <h5 className="offcanvas-title" id="sidebar-label">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            onClick={toggleSidebar}
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body d-flex flex-column">
          <ul className="nav flex-column">
            {menuData.map((menu, index) => {
              const Icon = menu.icon;
              return (
                <li key={index} className="nav-item mb-2">
                  {menu.links ? (
                    <>
                      {/* Dropdown Button */}
                      <button
                        className={`btn btn-link w-100 text-start py-3`}
                        onClick={() => toggleMenu(index)}
                      >
                        <span className="d-flex align-items-center" style={{ gap: "6px" }}>
                          {Icon && <Icon />}
                          <span>{menu.title}</span>
                        </span>
                        <i
                          className={`bi ${
                            openDropdown === index ? "bi-chevron-up" : "bi-chevron-down"
                          }`}
                        ></i>
                      </button>

                      {/* Dropdown Items */}
                      <ul
                        className={`list-unstyled ${
                          openDropdown === index ? "dropdown-content d-block" : "d-none"
                        }`}
                      >
                        {menu.links.map((link, idx) => {
                          const LinkIcon = link.icon;
                          return (
                            <li key={idx}>
                              <Link
                                to={link.to}
                                className={`text-decoration-none dropdown-item d-flex align-items-center gap-2 py-3 ${
                                  location.pathname === link.to ? "bg-primary text-white" : ""
                                }`}
                                style={{ borderBottom: "1px solid #ddd" }}
                              >
                                {LinkIcon && <LinkIcon />}
                                <span>{link.title}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  ) : (
                    <Link
                      to={menu.to}
                      className={`btn btn-link w-100 text-start text-decoration-none py-3 d-flex align-items-center gap-2 ${
                        activeMenu === index ? "bg-primary text-white" : ""
                      }`}
                    >
                      {Icon && <Icon />}
                      <span>{menu.title}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
