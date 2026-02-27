import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header>
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

      <nav className="navbar">
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/resume">Resume</Link></li>
		  <li><Link href="/rss_feed">Articles</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
