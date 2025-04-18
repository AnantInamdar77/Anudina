import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import "./App.css";
import Admin from "./Admin";
import AboutUs from "./AboutUs";
import { newsAPI } from "./services/api";

const extractVideoId = (url) => {
  if (!url) return "";
  if (url.length === 11 && !url.includes("/") && !url.includes(".")) return url;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : "";
};

const LogoAnimation = ({ onAnimationComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => onAnimationComplete(), 2500);
    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  return (
    <div className="logo-animation">
      <img src="/images/logo.png" alt="Logo" className="animated-logo" />
      <h1 className="animated-title">ಅನುದಿನ ಸುದ್ದಿ ಜಾಲ</h1>
    </div>
  );
};

const Navbar = ({ toggleSidebar }) => (
  <div className="navbar">
    <div className="brand">
      <img src="/images/logo.png" alt="Logo" className="full-logo" />
      <span className="brand-text">ಅನುದಿನ ಸುದ್ದಿ ಜಾಲ</span>
    </div>
    <span className="menu-icon" onClick={toggleSidebar}>☰</span>
  </div>
);

const Sidebar = ({ showSidebar, toggleSidebar }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showSidebar &&
        !event.target.closest(".sidebar") &&
        !event.target.closest(".menu-icon")
      ) {
        toggleSidebar();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showSidebar, toggleSidebar]);

  return (
    <div className={`sidebar ${showSidebar ? "show" : ""}`}>
      <span className="close-btn" onClick={toggleSidebar}>X</span>
      <Link to="/" onClick={toggleSidebar}>Home</Link>
      <Link to="/" onClick={toggleSidebar}>Home</Link>
      <Link to="/category/news" onClick={toggleSidebar}>Latest News</Link>
      <Link to="/AboutUs" onClick={toggleSidebar}>About Us</Link>
      <Link to="/Admin" onClick={toggleSidebar}>Admin</Link>
    </div>
  );
};

const NewsList = ({ news }) => (
  <div className="news-container">
    {news.map((item) => (
      <Link key={item._id} to={`/news/${item._id}`} className="news-item">
        <div className="news-title">{item.title}</div>
        <div className="news-meta">{item.meta}</div>
        <img
          className="news-image"
          src={`http://localhost:5000/uploads/${item.image}`}
          alt="News"
        />
      </Link>
    ))}
  </div>
);

const NewsDetail = ({ news }) => {
  const { id } = useParams();
  const newsItem = news.find((item) => item._id === id);
  if (!newsItem) return <div>News not found</div>;

  const videoId = newsItem.videoId || extractVideoId(newsItem.videoUrl);

  return (
    <div className="news-detail">
      <Link to="/" className="back-btn">← Back to News</Link>
      <div className="news-title">{newsItem.title}</div>
      <div className="news-meta">{newsItem.meta}</div>
      <img
        className="news-image"
        src={`http://localhost:5000/uploads/${newsItem.image}`}
        alt="News"
      />
      <div className="news-content">{newsItem.content}</div>
      {videoId && (
        <div className="video-container">
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allowFullScreen
            title="YouTube video"
          ></iframe>
          {newsItem.videoUrl && (
            <div className="video-source">
              <a href={newsItem.videoUrl} target="_blank" rel="noopener noreferrer">
                Watch on YouTube
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const CategoryPage = ({ news }) => {
  const { categoryName } = useParams();
  const filtered = news.filter(
    (item) => item.category?.toLowerCase() === categoryName?.toLowerCase()
  );
  return (
    <div>
      <h2 style={{ textTransform: "capitalize", padding: "10px 20px" }}>
        {categoryName} News
      </h2>
      <NewsList news={filtered} />
    </div>
  );
};

const Footer = () => (
  <footer
    style={{
      textAlign: "center",
      padding: "15px 10px",
      backgroundColor: "#f5f5f5",
      fontSize: "14px",
      color: "#333",
      marginTop: "40px",
      borderTop: "1px solid #ddd",
    }}
  >
    © 2025. All rights reserved. Made with <span style={{ color: "red" }}>❤️</span> by{" "}
    <strong>Anant</strong>
  </footer>
);

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [news, setNews] = useState([]);
  const [showAnimation, setShowAnimation] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('adminLoggedIn') === 'true');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await newsAPI.getAllNews();
        console.log("Fetched news:", res.data);
        setNews(res.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);

  const handleLogin = () => {
    setError(null);
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminLoggedIn', 'true');
      setIsAuthenticated(true);
      setUsername('');
      setPassword('');
      console.log('Login successful');
    } else {
      setError('Invalid username or password');
      console.log('Login failed: Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    setIsAuthenticated(false);
  };

  const inputStyle = {
    padding: '10px',
    width: '100%',
    marginBottom: '12px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '16px',
  };

  const buttonStyle = {
    padding: '10px 16px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px',
  };

  return (
    <Router>
      {showAnimation ? (
        <LogoAnimation onAnimationComplete={() => setShowAnimation(false)} />
      ) : (
        <>
          <Navbar toggleSidebar={() => setShowSidebar(!showSidebar)} />
          <Sidebar
            showSidebar={showSidebar}
            toggleSidebar={() => setShowSidebar(false)}
          />
          <Routes>
            <Route path="/" element={<NewsList news={news} />} />
            <Route path="/news/:id" element={<NewsDetail news={news} />} />
            <Route
              path="/admin"
              element={
                isAuthenticated ? (
                  <Admin news={news} setNews={setNews} onLogout={handleLogout} />
                ) : (
                  <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
                    <h2 style={{ textAlign: 'center' }}>Admin Login</h2>
                    {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
                    <input
                      style={inputStyle}
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                      style={inputStyle}
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      style={{ ...buttonStyle, background: '#007BFF', color: 'white', width: '100%' }}
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </div>
                )
              }
            />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/category/:categoryName" element={<CategoryPage news={news} />} />
          </Routes>
          <Footer />
        </>
      )}
    </Router>
  );
};

export default App;