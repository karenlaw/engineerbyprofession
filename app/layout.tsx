import React, { ReactNode } from 'react';
import "./globals.css"
import Header from './header';
import Footer from './footer';

export const metadata = {
  title: "Karen Law | Senior Python Developer",
  description:
    "Senior Python developer with experience building scalable backend systems at Apple, Airbus, and Western Digital.",
};

interface LayoutProps {
	children: ReactNode;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
	  	<div className="layout">
			<Header/>
        <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
          {children}
        </main>
			<Footer/>
		</div>
      </body>
    </html>
  );
}