import { Button, Input, message } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";



function HomePage() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [shortenedUrls, setShortenedUrls] = useState([]);

    const handleShortenUrl = async () => {
        if (!url) {
            message.error("Please enter a URL.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('https://localhost:7136/api/Urls/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currentUrl: url }),
            });



            if (!response.ok) {
                message.error("Failed to shorten the URL. Please try again.");
                return;
            }

            const result = await response.json();

            if (result.shortUrl) {
                message.success(`ShortUrl: ${result.shortUrl}`);
                setUrl(""); // Clear input field
            }
            else {
                message.error("Failed to shorten the URL. Please try again.");
            }

            //if (response.data && response.data.shortenUrl) {
            //    message.success(`Shortened URL: ${response.data.shortenUrl}`);
            //    setUrl(""); // Clear input field
            //} else {
            //    message.error("Failed to shorten the URL. Please try again.");
            //}
        } catch (error) {
            message.error("Error while connecting to the gateway.");
            console.error("API Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchShortenedUrls = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://localhost:7136/Urls"); // Adjust API endpoint if needed
            if (response.data) {
                setShortenedUrls(response.data); // Assume response.data is an array of URLs
            } else {
                message.error("Failed to fetch shortened URLs.");
            }
        } catch (error) {
            message.error("Error while fetching URLs.");
            console.error("API Error:", error);
        } finally {
            setLoading(false);
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
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    style={{ marginBottom: "10px", width: "75%", height: "40px" }} />
                <Button
                    type="primary"
                    style={{ width: "600px", height: "40px", fontSize: "16px" }}
                    loading={loading}
                    onClick={handleShortenUrl}
                >
                    Shorten URL
                </Button>
            </div>

            <div className="shortenedUrls" style={{ marginTop: "30px", textAlign: "center" }}>
                <Button
                    type="default"
                    onClick={fetchShortenedUrls}
                    style={{ marginBottom: "20px", fontSize: "16px" }}
                >
                    Fetch Shortened URLs
                </Button>
                <div>
                    {shortenedUrls && shortenedUrls.length > 0 ? (
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>Original URL</th>
                                    <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>Shortened URL</th>
                                    <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shortenedUrls.map((urlData, index) => (
                                    <tr key={index}>
                                        <td style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
                                            {urlData.currentUrl}
                                        </td>
                                        <td style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
                                            <a
                                                href={urlData.shorturl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Visit shortened URL for ${urlData.currentUrl}`}
                                            >
                                                {urlData.shorturl}
                                            </a>
                                        </td>
                                        <td>
                                            {urlData.dateCreate }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No shortened URLs found.</p>
                    )}
                </div>

            </div>
        </div>
    );
}

export default HomePage;
