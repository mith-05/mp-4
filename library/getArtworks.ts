/*
 * Retrieves artwork records from the Harvard Art Museums API.
 * This function is called by our server-rendered Search page.
 */

// The searchTerm parameter contains the keyword entered by the user.
// An empty string is used when the user hasn't searched for anything.
export async function getArtworks(searchTerm: string = "") {

    const apiKey = process.env.HARVARD_API_KEY;

    // Create the API URL with our key and a limit of 15 artworks.
    let url = `https://api.harvardartmuseums.org/object?apikey=${apiKey}&size=15&hasimage=1`;

    // Only add a search parameter if the user entered a keyword.
    if (searchTerm.trim() !== "") {

    // The title parameter searches artwork titles only.
    // encodeURIComponent makes the search term safe to include in the URL. (FROM the API documentation)
        url += `&title=${encodeURIComponent(searchTerm)}`;
    }

    // Fetch artwork data from the API on the server.
    const response = await fetch(url, {cache: "no-store",});

    // Handle unsuccessful API responses.
    if (!response.ok) {
        throw new Error("Unable to retrieve artworks.");
    }
    const data = await response.json();

    return data.records;
}
