import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

// Metadata defines the title and description of our website.
export const metadata: Metadata = {
    title: "Harvard Art Explorer",
    description: "Explore artworks from the Harvard Art Museums",
};

// RootLayout provides the shared structure for all pages.
export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body>
        {/* Navigation is placed here so it appears on every page. */}
        <nav>
            <Link href="/">Home</Link>
            <Link href="/search">Search</Link>
        </nav>

        {children}
        </body>
        </html>
    );
}
