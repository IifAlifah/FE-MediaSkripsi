import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarMahasiswa = () => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [progress, setProgress] = useState(1);
  const token = localStorage.getItem("token");

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

    const dropdownRoutes = [
    [
      "/materi/materiPengenalanObject",
      "/materi/domTree",
      "/materi/node",
      "/kuis2",
    ], // dropdown 1
    [
      "/materi/id",
      "/materi/tagname",
      "/materi/classname",
      "/materi/querySelector",
      "/materi/nodeTraversing",
      "/kuis3",
    ], // dropdown 2
    [
      "/materi/mengubahKonten",
      "/materi/memanipulasiAtributElemen",
      "/materi/menambah_menghapus",
      "/materi/mengubahCss",
      "/kuis4"
    ],
    [
      "/materi/mengenalEvent",
      "/materi/menanganiEventDom",
      "/materi/menghentikanEventBawaan",
      "/materi/perambatanEvent",
      "/kuis5"
    ],
    [
      "/materi/mengaksesForm-elemenForm",
      "/materi/menanganiEventFormDom",
      "/materi/validasiForm",
      "/kuis6" 
    ]
  ];

//   const dropdownRoutes = [
//     [
//       "/materi/materiPengenalanObject",
//       "/materi/domTree",
//       "/materi/node",
//       "/materi/metode-properti",
//       "/kuis2",
//     ], // dropdown 1
//     [
//       "/materi/id",
//       "/materi/tagname",
//       "/materi/classname",
//       "/materi/querySelector",
//       "/materi/nodeTraversing",
//       "/kuis3",
//     ], // dropdown 2
//     [
//       "/materi/mengubahKonten",
//       "/materi/memanipulasiAtributElemen",
//       "/materi/menambah_menghapus",
//       "/materi/mengubahCss",
//       "/kuis4"
//     ],
//     [
//       "/materi/mengenalEvent",
//       "/materi/menanganiEventDom",
//       "/materi/menghentikanEventBawaan",
//       "/materi/perambatanEvent",
//       "/kuis5"
//     ],
//     [
//       "/materi/mengaksesForm-elemenForm",
//       "/materi/menanganiEventFormDom",
//       "/materi/validasiForm",
//       "/kuis6" 
//     ]
//   ];

    useEffect(() => {
    // Cari dropdown yang URL-nya cocok dengan current path
    const currentDropdownIndex = dropdownRoutes.findIndex((routes) =>
      routes.includes(location.pathname)
    );
    setOpenDropdown(currentDropdownIndex === -1 ? null : currentDropdownIndex);
  }, [location.pathname]);

    const toggleMenu = (index) => {
        // Toggle dropdown kecuali kalau sudah terbuka
        setOpenDropdown(openDropdown === index ? null : index);
    };

  useEffect(() => {
      // Fetch progress dari backend saat komponen mount
      const fetchProgress = async () => {
        const response = await fetch("http://localhost:5000/progress", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setProgress(data.progress); // update state
      };
      fetchProgress();
    }, []);

  return (
    <div>
      <style>{`
        .sidebar-menu {
          width: 100%;
          max-width: 350px;
          transition: transform 0.3s ease;
          border-right: 1px solid #ccc;
        }
        .sidebar-menu a {
            text-decoration: none !important;
        }
        .sidebar-menu .btn-link {
            text-decoration: none !important;
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
        .dropdown-content {
          background-color: #cce5ff;
          padding: 8px;
          border-radius: 4px;
          width: 100%;
        }
        .dropdown-item {
          font-weight: normal;
          color: #6c757d;
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          text-decoration: none !important;
        }
        .dropdown-item i {
          margin-right: 8px;
          color: rgb(11, 30, 48);
        }
      `}</style>

      <div
        className={`offcanvas-lg offcanvas-start bg-light sidebar-menu${isOpen ? " show" : ""}`}
        id="sidebarMahasiswa"
        tabIndex="-1"
        aria-labelledby="sidebar-label"
        style={{
          width: "100%",
          maxWidth: "350px",
          position: "fixed",
          top: "58px",
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
            <ul className="nav flex-column p-3">

            {/* Dashboard */}
            <li className="nav-item mb-2">
                <Link
                to="/dashboard"
                className={`btn btn-link w-100 text-start text-decoration-none py-3 ${
                    location.pathname === "/dashboard" ? "bg-primary text-white" : ""
                }`}
                >
                Dashboard
                </Link>
            </li>

            {/* Pengenalan Object */}
            {/* <li className="nav-item mb-2">
                <button
                className="btn btn-link w-100 text-start py-3 d-flex justify-content-between align-items-center"
                onClick={() => toggleMenu(0)}
                >
                Pendahuluan
                <i className={`bi ${openDropdown === 0 ? "bi-chevron-up" : "bi-chevron-down"}`} />
                </button>
                {openDropdown === 0 && (
                <ul className="list-unstyled dropdown-content">
                    <li>
                        <Link to="/materi/materiPengenalanObject" className={`dropdown-item ${
                        location.pathname === "/materi/materiPengenalanObject"
                        ? "bg-primary text-white"
                        : ""
                    }`}>
                        <i className="bi bi-dot"></i>Pengenalan Document Object
                        </Link>
                    </li>
                    <li>
                        {progress >= 1 ? (
                        <Link to="/kuis1" className={`dropdown-item ${location.pathname === "/kuis1" ? "bg-primary text-white" : ""}`}>
                            <i className="bi bi-unlock"></i> Kuis 1
                        </Link>
                        ) : (
                        <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                            <i className="bi bi-lock"></i> Kuis 1
                        </span>
                        )}
                    </li>
                </ul>
                )}
            </li> */}

            {/* Pengenalan DOM HTML */}
            <li className="nav-item mb-2">
                <button
                className="btn btn-link w-100 text-start py-3 d-flex justify-content-between align-items-center"
                onClick={() => toggleMenu(0)}
                >
                Pendahuluan
                <i className={`bi ${openDropdown === 0 ? "bi-chevron-up" : "bi-chevron-down"}`} />
                </button>
                {openDropdown === 0 && (
                <ul className="list-unstyled dropdown-content">
                     <li>
                        <Link to="/materi/materiPengenalanObject" className={`dropdown-item ${
                        location.pathname === "/materi/materiPengenalanObject"
                        ? "bg-primary text-white"
                        : ""
                    }`}>
                        <i className="bi bi-dot"></i>Pengenalan DOM
                        </Link>
                    </li>
                    {/* <li>
                        {progress >= 2 ? (
                        <Link to="/materi/materiDom" className={`dropdown-item ${location.pathname === "/materi/materiDom" ? "bg-primary text-white" : ""}`}>
                            <i className="bi bi-unlock"></i> Apa itu DOM?
                        </Link>
                        ) : (
                        <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                            <i className="bi bi-lock"></i> Apa itu DOM?
                        </span>
                        )}
                    </li> */}
                    <li>
                        {progress >= 1 ? (
                        <Link to="/materi/domTree" className={`dropdown-item ${location.pathname === "/materi/domTree" ? "bg-primary text-white" : ""}`}>
                            <i className="bi bi-unlock"></i> DOM TREE
                        </Link>
                        ) : (
                        <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                            <i className="bi bi-lock"></i> DOM TREE
                        </span>
                        )}
                    </li>
                    <li>
                        {progress >= 2 ? (
                        <Link to="/materi/node" className={`dropdown-item ${location.pathname === "/materi/node" ? "bg-primary text-white" : ""}`}>
                            <i className="bi bi-unlock"></i> Node
                        </Link>
                        ) : (
                        <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                            <i className="bi bi-lock"></i> Node
                        </span>
                        )}
                    </li>
                    {/* <li>
                        {progress >= 5 ? (
                        <Link to="/materi/metode-properti" className={`dropdown-item ${location.pathname === "/materi/metode-properti" ? "bg-primary text-white" : ""}`}>
                            <i className="bi bi-unlock"></i> Metode dan Properti DOM
                        </Link>
                        ) : (
                        <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                            <i className="bi bi-lock"></i> Metode dan Properti DOM
                        </span>
                        )}
                    </li> */}
                    <li>
                        {progress >= 3 ? (
                        <Link to="/kuis2" className={`dropdown-item ${location.pathname === "/kuis2" ? "bg-primary text-white" : ""}`}>
                            <i className="bi bi-unlock"></i> Kuis 1
                        </Link>
                        ) : (
                        <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                            <i className="bi bi-lock"></i> Kuis 1
                        </span>
                        )}
                    </li>
                </ul>
                )}
            </li>

            {/* Mengakses Elemen */}
            <li className="nav-item mb-2">
                <button
                className="btn btn-link w-100 text-start py-3 d-flex justify-content-between align-items-center"
                onClick={() => toggleMenu(1)}
                >
                Mengakses Elemen
                <i className={`bi ${openDropdown === 1 ? "bi-chevron-up" : "bi-chevron-down"}`} />
                </button>
                {openDropdown === 1 && (
                <ul className="list-unstyled dropdown-content">
                    <li>
                        {progress >= 4 ? (
                        <Link to="/materi/id" className={`dropdown-item ${location.pathname === "/materi/id" ? "bg-primary text-white" : ""}`}>
                            <i className="bi bi-unlock"></i> getElementById
                        </Link>
                        ) : (
                        <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                            <i className="bi bi-lock"></i> getElementById
                        </span>
                        )}
                    </li>
                    <li>
                        {progress >= 5 ? (
                        <Link to="/materi/tagname" className={`dropdown-item ${location.pathname === "/materi/tagname" ? "bg-primary text-white" : ""}`}>
                            <i className="bi bi-unlock"></i> getElementsByTagName
                        </Link>
                        ) : (
                        <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                            <i className="bi bi-lock"></i> getElementsByTagName
                        </span>
                        )}
                    </li>
                    <li>
                        {progress >= 6 ? (
                        <Link to="/materi/classname" className={`dropdown-item ${location.pathname === "/materi/classname" ? "bg-primary text-white" : ""}`}>
                            <i className="bi bi-unlock"></i> getElementsByClassName
                        </Link>
                        ) : (
                        <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                            <i className="bi bi-lock"></i> getElementsByClassName
                        </span>
                        )}
                    </li>
                    <li>
                        {progress >= 7 ? (
                        <Link to="/materi/querySelector" className={`dropdown-item ${location.pathname === "/materi/querySelector" ? "bg-primary text-white" : ""}`}>
                            <i className="bi bi-unlock"></i> querySelector dan querySelectorAll
                        </Link>
                        ) : (
                        <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                            <i className="bi bi-lock"></i> querySelector dan querySelectorAll
                        </span>
                        )}
                    </li>
                    <li>
                        {progress >= 8 ? (
                        <Link to="/materi/nodeTraversing" className={`dropdown-item ${location.pathname === "/materi/nodeTraversing" ? "bg-primary text-white" : ""}`}>
                            <i className="bi bi-unlock"></i> Node Traversing
                        </Link>
                        ) : (
                        <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                            <i className="bi bi-lock"></i> Node Traversing
                        </span>
                        )}
                    </li>
                    <li>
                        {progress >= 9 ? (
                        <Link to="/kuis3" className={`dropdown-item ${location.pathname === "/kuis3" ? "bg-primary text-white" : ""}`}>
                            <i className="bi bi-unlock"></i> Kuis 2
                        </Link>
                        ) : (
                        <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                            <i className="bi bi-lock"></i> Kuis 2
                        </span>
                        )}
                    </li>
                </ul>
                )}
            </li>

            {/* Manipulasi Konten */}
            <li className="nav-item mb-2">
                <button
                className="btn btn-link w-100 text-start py-3 d-flex justify-content-between align-items-center"
                onClick={() => toggleMenu(2)}
                >
                Memanipulasi Konten
                <i className={`bi ${openDropdown === 2 ? "bi-chevron-up" : "bi-chevron-down"}`} />
                </button>
                {openDropdown === 2 && (
                <ul className="list-unstyled dropdown-content">
                    <li>
                        {progress >= 10 ? (
                        <Link to="/materi/mengubahKonten" className={`dropdown-item ${location.pathname === "/materi/mengubahKonten" ? "bg-primary text-white" : ""}`}>
                            <i className="bi bi-unlock"></i> Mengubah Konten
                        </Link>
                        ) : (
                        <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                            <i className="bi bi-lock"></i> Mengubah Konten
                        </span>
                        )}
                    </li>
                    <li>
                        {progress >= 11 ? (
                        <Link to="/materi/memanipulasiAtributElemen" className={`dropdown-item ${location.pathname === "/materi/memanipulasiAtributElemen" ? "bg-primary text-white" : ""}`}>
                            <i className="bi bi-unlock"></i> Memanipulasi Atribut Elemen
                        </Link>
                        ) : (
                        <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                            <i className="bi bi-lock"></i> Memanipulasi Atribut Elemen
                        </span>
                        )}
                    </li>
                    <li>
                        {progress >= 12 ? (
                        <Link to="/materi/menambah_menghapus" className={`dropdown-item ${location.pathname === "/materi/menambah_menghapus" ? "bg-primary text-white" : ""}`}>
                            <i className="bi bi-unlock"></i> Menambah dan Menghapus Elemen
                        </Link>
                        ) : (
                        <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                            <i className="bi bi-lock"></i> Menambah dan Menghapus Elemen
                        </span>
                        )}
                    </li>
                    <li>
                        {progress >= 13 ? (
                        <Link to="/materi/mengubahCss" className={`dropdown-item ${location.pathname === "/materi/mengubahCss" ? "bg-primary text-white" : ""}`}>
                            <i className="bi bi-unlock"></i> Mengubah Gaya(CSS) Elemen
                        </Link>
                        ) : (
                        <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                            <i className="bi bi-lock"></i> Mengubah Gaya(CSS) Elemen
                        </span>
                        )}
                    </li>
                    <li>
                        {progress >= 14 ? (
                        <Link to="/kuis4" className={`dropdown-item ${location.pathname === "/kuis4" ? "bg-primary text-white" : ""}`}>
                            <i className="bi bi-unlock"></i> Kuis 3
                        </Link>
                        ) : (
                        <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                            <i className="bi bi-lock"></i> Kuis 3
                        </span>
                        )}
                    </li>
                </ul>
                )}
            </li>

            {/* Event pada DOM */}
            <li className="nav-item mb-2">
                <button
                className="btn btn-link w-100 text-start py-3 d-flex justify-content-between align-items-center"
                onClick={() => toggleMenu(3)}
                >
                Event pada DOM
                <i className={`bi ${openDropdown === 3 ? "bi-chevron-up" : "bi-chevron-down"}`} />
                </button>
                {openDropdown === 3 && (
                <ul className="list-unstyled dropdown-content">
                    <li>
                        {progress >= 15 ? (
                        <Link to="/materi/mengenalEvent" className={`dropdown-item ${location.pathname === "/materi/mengenalEvent" ? "bg-primary text-white" : ""}`}>
                            <i className="bi bi-unlock"></i> Mengenal Event DOM
                        </Link>
                        ) : (
                        <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                            <i className="bi bi-lock"></i> Mengenal Event DOM
                        </span>
                        )}
                    </li>
                    <li>
                        {progress >= 16 ? (
                        <Link to="/materi/menanganiEventDom" className={`dropdown-item ${location.pathname === "/materi/menanganiEventDom" ? "bg-primary text-white" : ""}`}>
                            <i className="bi bi-unlock"></i> Menangani Event DOM
                        </Link>
                        ) : (
                        <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                            <i className="bi bi-lock"></i> Menangani Event DOM
                        </span>
                        )}
                    </li>
                    <li>
                        {progress >= 17 ? (
                        <Link to="/materi/menghentikanEventBawaan" className={`dropdown-item ${location.pathname === "/materi/menghentikanEventBawaan" ? "bg-primary text-white" : ""}`}>
                            <i className="bi bi-unlock"></i> Menghentikan Event Bawaan
                        </Link>
                        ) : (
                        <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                            <i className="bi bi-lock"></i> Menghentikan Event Bawaan
                        </span>
                        )}
                    </li>
                    <li>
                        {progress >= 18 ? (
                        <Link to="/materi/perambatanEvent" className={`dropdown-item ${location.pathname === "/materi/perambatanEvent" ? "bg-primary text-white" : ""}`}>
                            <i className="bi bi-unlock"></i> Menghentikan Perambatan Event
                        </Link>
                        ) : (
                        <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                            <i className="bi bi-lock"></i> Menghentikan Perambatan Event
                        </span>
                        )}
                    </li>
                    <li>
                        {progress >= 19 ? (
                        <Link to="/kuis5" className={`dropdown-item ${location.pathname === "/kuis5" ? "bg-primary text-white" : ""}`}>
                            <i className="bi bi-unlock"></i> Kuis 4
                        </Link>
                        ) : (
                        <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                            <i className="bi bi-lock"></i> Kuis 4
                        </span>
                        )}
                    </li>
                </ul>
                )}
            </li>

            {/* Form DOM */}
            <li className="nav-item mb-2">
                <button
                className="btn btn-link w-100 text-start py-3 d-flex justify-content-between align-items-center"
                onClick={() => toggleMenu(4)}
                >
                Form DOM
                <i className={`bi ${openDropdown === 4 ? "bi-chevron-up" : "bi-chevron-down"}`} />
                </button>
                {openDropdown === 4 && (
                <ul className="list-unstyled dropdown-content">
                    <li>
                        {progress >= 20 ? (
                        <Link to="/materi/mengaksesForm-elemenForm" className={`dropdown-item ${location.pathname === "/materi/mengaksesForm-elemenForm" ? "bg-primary text-white" : ""}`}>
                            <i className="bi bi-unlock"></i> Mengakses Form dan Elemen Form
                        </Link>
                        ) : (
                        <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                            <i className="bi bi-lock"></i> Mengakses Form dan Elemen Form
                        </span>
                        )}
                    </li>
                    {/* <li>
                        {progress >= 24 ? (
                        <Link to="/materi/menanganiEventFormDom" className={`dropdown-item ${location.pathname === "/materi/menanganiEventFormDom" ? "bg-primary text-white" : ""}`}>
                            <i className="bi bi-unlock"></i> Menangani Event dalam Form
                        </Link>
                        ) : (
                        <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                            <i className="bi bi-lock"></i> Menangani Event dalam Form
                        </span>
                        )}
                    </li> */}
                    <li>
                        {progress >= 21 ? (
                        <Link to="/materi/validasiForm" className={`dropdown-item ${location.pathname === "/materi/validasiForm" ? "bg-primary text-white" : ""}`}>
                            <i className="bi bi-unlock"></i> Validasi Form
                        </Link>
                        ) : (
                        <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                            <i className="bi bi-lock"></i> Validasi Form
                        </span>
                        )}
                    </li>
                    <li>
                        {progress >= 22 ? (
                        <Link to="/kuis6" className={`dropdown-item ${location.pathname === "/kuis6" ? "bg-primary text-white" : ""}`}>
                            <i className="bi bi-unlock"></i> Kuis 5
                        </Link>
                        ) : (
                        <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                            <i className="bi bi-lock"></i> Kuis 5
                        </span>
                        )}
                    </li>
                </ul>
                )}
            </li>

            {/* Evaluasi */}
            <li className="nav-item mb-2">
                {progress >= 23 ? (
                    <Link to="/evaluasi" className={`dropdown-item ${location.pathname === "/evaluasi" ? "bg-primary text-white" : ""}`}>
                        <i className="bi bi-unlock"></i> Evaluasi
                    </Link>
                    ) : (
                    <span className="dropdown-item text-muted" style={{ cursor: "not-allowed" }}>
                        <i className="bi bi-lock"></i> Evaluasi
                    </span>
                    )}
            </li>

            </ul>
        </div>
      </div>
    </div>
  );
};

export default SidebarMahasiswa;
