import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [newsTitle, setNewsTitle] = useState("");
    const [newsContent, setNewsContent] = useState("");
    const [newsImage, setNewsImage] = useState("");
    const [youtubeVideoId, setYoutubeVideoId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const validUsername = "admin";
    const validPassword = "password";

    const authenticate = () => {
        if (username === validUsername && password === validPassword) {
            setIsAuthenticated(true);
            setErrorMessage("");
        } else {
            setErrorMessage("Invalid username or password.");
        }
    };

    const previewImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setNewsImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const updateNews = () => {
        const newsData = {
            title: newsTitle,
            content: newsContent,
            image: newsImage,
            videoId: youtubeVideoId,
        };

        localStorage.setItem("newsData", JSON.stringify(newsData));
        alert("News updated successfully!");
        navigate("/");
    };

    return (
        <div style={{ fontFamily: "Georgia, serif", margin: "20px" }}>
            {!isAuthenticated ? (
                <div style={{ border: "1px solid #ccc", padding: "20px", maxWidth: "300px", margin: "20px auto" }}>
                    <h2>Admin Login</h2>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={authenticate} style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#003366", color: "white", border: "none", cursor: "pointer" }}>
                        Login
                    </button>
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                </div>
            ) : (
                <div>
                    <h1>Admin Panel - Anudina Sudhhi</h1>
                    <label>News Title:</label>
                    <input type="text" value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} />
                    
                    <label>News Image:</label>
                    <input type="file" accept="image/*" onChange={previewImage} />
                    {newsImage && <img src={newsImage} alt="Preview" style={{ maxWidth: "200px", maxHeight: "200px", marginTop: "10px" }} />}

                    <label>News Content:</label>
                    <textarea rows="4" value={newsContent} onChange={(e) => setNewsContent(e.target.value)}></textarea>

                    <label>YouTube Video ID:</label>
                    <input type="text" value={youtubeVideoId} onChange={(e) => setYoutubeVideoId(e.target.value)} />

                    <button onClick={updateNews}>Update News</button>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
