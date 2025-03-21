import React, { useEffect, useState } from "react";

const NewsFeed = () => {
    const [news, setNews] = useState(null);

    useEffect(() => {
        const storedNews = localStorage.getItem("newsData");
        if (storedNews) {
            setNews(JSON.parse(storedNews));
        }
    }, []);

    return (
        <div className="news-container" style={{ maxWidth: "800px", margin: "20px auto", padding: "10px" }}>
            <h1>Latest News</h1>
            {news ? (
                <div className="news-item" style={{ background: "white", marginBottom: "20px", padding: "15px", borderLeft: "6px solid #003366", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", transition: "0.3s", cursor: "pointer" }}>
                    <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#003366" }}>{news.title}</h2>
                    <p style={{ fontSize: "16px", lineHeight: "1.6" }}>{news.content}</p>
                    {news.image && <img src={news.image} alt="News" style={{ width: "100%", borderRadius: "8px" }} />}
                    {news.videoId && <iframe width="100%" height="315" src={`https://www.youtube.com/embed/${news.videoId}`} frameBorder="0" allowFullScreen></iframe>}
                </div>
            ) : (
                <p>No news available.</p>
            )}
        </div>
    );
};

export default NewsFeed;
