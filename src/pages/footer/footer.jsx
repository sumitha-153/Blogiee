import React from 'react';
// import './footer.css';
import styles from './footer.module.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className={styles.footercontent}>
                <p >&copy; {new Date().getFullYear()} Blog Application. All rights reserved.</p>
                {/* <nav>
                    <ul>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                    </ul>
                </nav> */}
            </div>
        </footer>
    );
};

export default Footer;