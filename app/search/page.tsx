
import { getArtworks } from "@/library/getArtworks";

// Defines the properties we want to use from each artwork record.
// The question mark indicates that property could be optional for example image might not exist for that artwork.
type Artwork = {
    id: number;
    title: string;
    primaryimageurl?: string;
    people?: {
        name: string;
    }[];
    dated?: string;
};

// The keyword comes from the search bar such as /search?keyword=Silver which is entered by the user.
type SearchProps = { searchParams: Promise<{ keyword?: string; }>; };

export default async function Search({ searchParams }: SearchProps) {

    // wait for the search parameter from the user
    const params = await searchParams;

    // extract the keyword, or use an empty string if none was provided.
    const keyword = params.keyword || "";
    // initializing artworks as an empty array
    let artworks: Artwork[] = [];
    // Store an error message if the API request fails.
    let error = "";

    try {
        artworks = await getArtworks(keyword);
    } catch {
        error = "Unable to load artworks. Please try again later.";
    }

    return (
        <main>
            <h1>Search Artworks</h1>

            <p>
                Explore artworks from the Harvard Art Museums collection.
            </p>

            {/* Search form that submits the keyword through the URL. */}
            <form action="/search" method="GET" className="search-form">
            {/* Input where users enter their search keyword. */}
            <input type="text" name="keyword" placeholder="Search for artworks..." defaultValue={keyword}/>

            <button type="submit">Search</button></form>

            {/* Display the search keyword when one has been entered. */}
            {keyword && (<p>Showing results for: {keyword}</p>)}

            {/* Display an error message if the API request fails. */}
            {error && (<p>{error}</p>)}

            {/* Display a message if no matching artworks were found. */}
            {!error && artworks.length === 0 && (
                <p>No artworks were found.</p>
            )}

            <div className="artwork-grid">
                {artworks.map((artwork) => (
                    <div className="artwork-card" key={artwork.id}>
                        <div className="artwork-image-container">
                            {artwork.primaryimageurl ? (
                                <img src={artwork.primaryimageurl} alt={artwork.title} className="artwork-image"/>
                            ) : (
                                <div className="artwork-placeholder">
                                    <p>Image Not Available</p>
                                </div>
                            )}

                        </div>

                        <div className="artwork-info">

                            <h2>{artwork.title}</h2>
                            <p>
                                Artist: {artwork.people?.[0]?.name || "Unknown"}
                            </p>
                            <p>
                                Date: {artwork.dated|| "Unknown"}
                            </p>

                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
