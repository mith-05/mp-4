import Link from "next/link";

// This component displays the Home page of our application.
// Next.js automatically assigns app/page.tsx to the "/" route.
export default function Home() {
    return (
        <main>

            <h1>Harvard Art Explorer</h1>

            <p>
                Welcome to Harvard Art Explorer! Discover artworks
                from the Harvard Art Museums collection, including
                paintings, sculptures, and historical objects.
            </p>

            <p>
                Browse the collection and search for artworks
                by entering a keyword.
            </p>

            {/* Next.js Link navigates to the Search page. */}
            <Link href="/search">
                Explore the Collection
            </Link>
        </main>
    );
}
