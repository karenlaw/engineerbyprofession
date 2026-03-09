"use client";

import Image from "next/image";
import Navbar from "./navbar";

const Header = () => {
  return (
    <>
      <div className="image-container">
        <Image
          src="/Typography_from_Hermann_Esser's_(1845–1908)_Draughtsman's_Alphabet,_from_rawpixel's_own_antique_edition_Monogram_KL_white_background.jpg"
          alt="Antique Monogram KL"
          width={100}
          height={100}
        />
      </div>
      <h1>Karen Law</h1>
      <h5>An engineer by profession</h5>
      <Navbar />
    </>
  );
}

export default Header;
