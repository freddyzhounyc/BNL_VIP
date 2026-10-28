import "./Footer.css"

const Footer = () => {
    return(
        <footer className="footer">
            <div className="footer-content">
                <h3 className="footer-title">
                    Brookhaven National Laboratory
                </h3>
                <p className="footer-text">
                    Operated by Brookhaven Science Associates for the U.S.
                    Department of Energy Office of Science
                </p>
                <p className="footer-text">
                    Upton, New York • Relativistic Heavy Ion Collider (RHIC) &
                    Electron-Ion Collider (EIC)
                </p>
                <p className="footer-copyright">
                    © 2026 Brookhaven National Laboratory. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer;

