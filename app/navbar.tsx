"use client";

import Image from 'next/image';
import Link from "next/link";
import React, { useRef } from 'react';
import threelines from '../public/threelines.png';
import checkmark from '../public/checkmark.png';

const Navbar = () => {
  const sideMenuRef = useRef<HTMLUListElement>(null);

  const openMenu = () => {
    if (sideMenuRef.current) {
      sideMenuRef.current.style.right = '0';
    }
  }

  const closeMenu = () => {
    if (sideMenuRef.current) {
      sideMenuRef.current.style.right = '-64rem';
    }
  }

  return (
    <nav className="main-nav">
      {/* Desktop menu */}
      <ul className="main-nav-list" id="nav-list">
        <li className="nav-item"><Link className="nav-link" href="/">Home</Link></li>
        <li className="nav-item"><Link className="nav-link" href="/resume">Resume</Link></li>
        <li className="nav-item"><Link className="nav-link" href="/rss_feed">Articles</Link></li>
        <li className="nav-item"><Link className="nav-link" href="/portfolio">Portfolio</Link></li>
        <li className="nav-item"><Link className="nav-link" href="/contact">Contact</Link></li>
      </ul>

      {/* Hamburger button - mobile only */}
      <button className="hamburger-btn" onClick={openMenu}>
        <Image src={threelines} alt='open menu' width={24} height={24} />
      </button>

      {/* Mobile slide-in menu */}
      <ul ref={sideMenuRef} className="mobile-nav-list">
        <div className="close-btn" onClick={closeMenu}>
          <Image src={checkmark} alt='close menu' width={20} height={20} />
        </div>
        <li className="nav-item"><Link className="nav-link" onClick={closeMenu} href="/">Home</Link></li>
        <li className="nav-item"><Link className="nav-link" onClick={closeMenu} href="/resume">Resume</Link></li>
        <li className="nav-item"><Link className="nav-link" onClick={closeMenu} href="/rss_feed">Articles</Link></li>
        <li className="nav-item"><Link className="nav-link" onClick={closeMenu} href="/portfolio">Portfolio</Link></li>
        <li className="nav-item"><Link className="nav-link" onClick={closeMenu} href="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
