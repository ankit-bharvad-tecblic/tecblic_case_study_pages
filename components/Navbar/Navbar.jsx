'use client';
import Link from 'next/link';
import { useState } from 'react';
// import '../../styles/navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'What We Do', path: '/what-we-do' },
    { name: 'Industries', path: '/industries' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Who We Are', path: '/who-we-are' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link href="/">🌀 Tecblic</Link>
        </div>

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path}>
              <a>{link.name}</a>
            </Link>
          ))}
          <Link href="/contact">
            <a className="contact-btn">Contact Us</a>
          </Link>
        </div>

        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✖' : '☰'}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
