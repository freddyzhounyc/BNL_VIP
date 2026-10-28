import { NavLink } from "react-router-dom";
import "./Navbar.css";

type NavbarProps = {
    title: string;
};

const Navbar = ({ title }: NavbarProps) => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <div className="navbar-logo"><span className="navbar-logo-dot" /></div>
                <span className="navbar-title">{title}</span>
            </div>

            <div className="navbar-links">
                <NavLink to="/" className="nav-link">Home</NavLink>
                <NavLink to="/how-it-works" className="nav-link">How It Works</NavLink>
                <NavLink to="/narratives" className="nav-link">Narratives & People</NavLink>
                <NavLink to="/timeline" className="nav-link">BNL Timeline</NavLink>
            </div>

            <div className="navbar-actions">
                <NavLink to="/3d-view" className="nav-button secondary">3D View</NavLink>
                <NavLink to="/explore" className="nav-button primary">Explore Lab</NavLink>
            </div>
        </nav>
    )
}


export default Navbar;