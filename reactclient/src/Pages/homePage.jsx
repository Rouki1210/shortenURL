import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { shortenurlAPI } from "../Service/api";

function HomePage() {
    const [currentUrl, setCurrentUrl] = useState("");
    const [shortenedLink, setShortenedLink] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [history, setHistory] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Get user ID from localStorage or fallback to 1
    const userID = localStorage.getItem("token") || 1;

    // Fetch history of shortened URLs
    const fetchHistory = async () => {
        try {
            const response = await shortenurlAPI.fetchURLs(userID);
            console.log("Fetched History:", response); // Debugging API response
            setHistory(response || []);  // Ensure it falls back to an empty array if no data
        } catch (err) {
            setError(err.message || "An error occurred while fetching history");
        }
    };

    useEffect(() => {
        // Fetch history initially when component mounts or userID changes
        fetchHistory();
    }, [userID]);

    const handleShortenLink = async (event) => {
        event.preventDefault();

        if (!currentUrl) {
            setStatusMessage("Please enter an original link");
            return;
        }

        setLoading(true); // Start loading

        try {
            const payload = { userId: userID, currentUrl: currentUrl };
            const response = await shortenurlAPI.shortenURL(payload);

            setShortenedLink(response.shortUrl);
            setStatusMessage("Shortened link generated successfully!");
            setCurrentUrl(""); // Clear the input field
            fetchHistory(); // Update history after shortening a new URL
        } catch (err) {
            setStatusMessage(err.message || "An error occurred, please try again");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div>
            <div className="navbar" style={{ display: "flex", justifyContent: "space-between" }}>
                <h1 style={{ margin: "13px" }}>Shorten URL</h1>
                <div className="authButton" style={{ display: "flex", margin: "13px" }}>
                    <Link to="/Login">
                        <Button type="primary" style={{ display: "flex", marginRight: "10px" }}>
                            Login
                        </Button>
                    </Link>
                    <Link to="/Register">
                        <Button>Register</Button>
                    </Link>
                </div>
            </div>

            <div
                className="shortenURL"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "13%",
                }}
            >
                <h1 style={{ fontSize: "40px" }}>Start shorten</h1>
                <Input
                    placeholder="Enter the URL"
                    value={currentUrl}
                    onChange={(e) => {
                        setCurrentUrl(e.target.value);
                        setError(""); // Clear error when URL changes
                    }}
                    style={{ marginBottom: "10px", width: "75%", height: "40px" }}
                />
                <Button
                    type="primary"
                    style={{ width: "600px", height: "40px", fontSize: "16px" }}
                    loading={loading}
                    onClick={handleShortenLink}
                >
                    Shorten URL
                </Button>
                {statusMessage && <p>{statusMessage}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>

            <div className="shortenedUrls" style={{ marginTop: "30px", textAlign: "center" }} >
                <Button
                    type="default"
                    onClick={fetchHistory} // Manually trigger fetch when clicked
                    style={{ marginBottom: "20px", fontSize: "16px" }}
                >
                    Fetch Shortened URLs
                </Button>
                <div className="shortened-link-history">
                    <h2>Your Shortened Links History</h2>
                    {error && <p className="error" style={{ color: "red" }}>{error}</p>}
                    {history.length > 0 ? (
                        <table className="history-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Original Link</th>
                                    <th>Shortened Link</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <a href={item.currentUrl} target="_blank" rel="noopener noreferrer">
                                                {item.currentUrl}
                                            </a>
                                        </td>
                                        <td>
                                            <a
                                                href={`https://localhost:7136/api/Urls/redirect/${item.shorturl}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {item.shorturl}
                                            </a>
                                        </td>
                                        <td>{new Date(item.DateCreate).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No history found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
