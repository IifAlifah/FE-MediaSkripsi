import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path ? 'nav-link active text-primary fw-bold' : 'nav-link';

  return (
    <nav className="navbar navbar-expand-lg bg-light px-4 border-bottom">
      <p className="navbar-brand text-primary fw-bold d-flex align-items-center mb-0" style={{ height: '56px' }}>
        BelajarDOM
      </p>

      <button
        className="navbar-toggler me-3"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className={isActive("/")} to="/">
              Beranda
            </Link>
          </li>
          <li className="nav-item">
            <Link className={isActive("/editor")} to="/editor">
              Editor
            </Link>
          </li>
          <li className="nav-item">
            <Link className={isActive("/petunjukPenggunaan")} to="/petunjukPenggunaan">
              Petunjuk Penggunaan
            </Link>
          </li>
          <li className="nav-item">
            <Link className={isActive("/tentang")} to="/tentang">
              Tentang
            </Link>
          </li>
        </ul>

        {/* Tombol Daftar dan Masuk di layar besar */}
        <div className="ms-3 d-none d-lg-flex gap-2 me-3">
          <Link to="/register">
            <button className="btn btn-outline-primary">Daftar</button>
          </Link>
          <Link to="/login">
            <button className="btn btn-primary">Masuk</button>
          </Link>
        </div>

        {/* Tombol Daftar dan Masuk di layar kecil */}
        <div className="d-lg-none me-3">
          <Link to="/register">
            <button className="btn btn-outline-primary w-100 mb-2">Daftar</button>
          </Link>
          <Link to="/login">
            <button className="btn btn-primary w-100">Masuk</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
