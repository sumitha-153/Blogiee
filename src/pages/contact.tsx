
import React from 'react';
import styles from './contact.module.css';

const Contact: React.FC = () => {
    return (
        <div className={styles.contactcontainer}>
            <div className={styles.contactcard}>
                <h1>Contact Us</h1>
                <p>If you have any questions, feel free to reach out to us!</p>
                <div>
                    <h2>Contact Details</h2>
                    <p>Email: contact@blogapplication.com</p>
                    <p>Phone: +123 456 7890</p>
                    <p>Address: 123 Blog St, Blog City, BC 12345</p>
                </div>
                <div>
                    <h2>Follow Us</h2>
                    <p>Twitter: <a href="https://twitter.com/blogapplication" target="_blank" rel="noopener noreferrer">@blogapplication</a></p>
                    <p>Facebook: <a href="https://facebook.com/blogapplication" target="_blank" rel="noopener noreferrer">Blog Application</a></p>
                </div>
            </div>
        </div>
    );
};

export default Contact;

