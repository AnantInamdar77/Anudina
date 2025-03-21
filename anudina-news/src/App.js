import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from "react-router-dom";
import "./App.css";

const initialNewsData = [
  {
    id: 1,
    title: "Breaking: India lifts World Cup after 17 years!",
    meta: "By PTI | 21 Feb 2025",
    image: "news1.jpg",
    content: "India has won the World Cup after a thrilling match...",
    videoId: "dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Technology: New AI chip unveiled in Lord Ganesh Idol!",
    meta: "By Ganesh Inamdar | 21 Feb 2025",
    image: "news2.jpg",
    content: "A leading tech company has launched an advanced AI chip...",
    videoId: "3tmd-ClpJxA",
  }
];

const AdminCredentials = { username: "admin", password: "password" };

const Navbar = ({ toggleSidebar }) => (
  <div className="navbar">
    <div className="brand">
      <img src="image.png" alt="Logo" />
      Anudina Sudhhi
    </div>
    <span className="menu-icon" onClick={toggleSidebar}>☰</span>
  </div>
);

const Sidebar = ({ showSidebar, toggleSidebar }) => (
  <div className={`sidebar ${showSidebar ? "show" : ""}`}>
    <span className="close-btn" onClick={toggleSidebar}>×</span>
    <Link to="/">Home</Link>
    <Link to="/category/politics">Politics</Link>
    <Link to="/category/business">Business</Link>
    <Link to="/category/technology">Technology</Link>
    <Link to="/category/sports">Sports</Link>
    <Link to="/category/entertainment">Entertainment</Link>
    <Link to="/contact">Contact</Link>
    <Link to="/admin">Admin</Link>
  </div>
);

const NewsList = ({ news }) => (
  <div className="news-container">
    {news.map((item) => (
      <Link key={item.id} to={`/news/${item.id}`} className="news-item">
        <div className="news-title">{item.title}</div>
        <div className="news-meta">{item.meta}</div>
        <img className="news-image" src={item.image} alt="News" />
      </Link>
    ))}
  </div>
);

const NewsDetail = ({ news }) => {
  const { id } = useParams();
  const newsItem = news.find((item) => item.id === parseInt(id));
  if (!newsItem) return <div>News not found</div>;
  
  return (
    <div className="news-detail">
      <Link to="/" className="back-btn">← Back to News</Link>
      <div className="news-title">{newsItem.title}</div>
      <div className="news-meta">{newsItem.meta}</div>
      <img className="news-image" src={newsItem.image} alt="News" />
      <div className="news-content">{newsItem.content}</div>
      <iframe
        width="100%"
        height="315"
        src={`https://www.youtube.com/embed/${newsItem.videoId}`}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const AdminLogin = ({ setIsAdmin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === AdminCredentials.username && password === AdminCredentials.password) {
      setIsAdmin(true);
      navigate("/admin-panel");
    } else {
      setError("Invalid credentials!");
    }
  };

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>
      {error && <p className="error">{error}</p>}
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

const AdminPanel = ({ news, setNews, isAdmin }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [videoId, setVideoId] = useState("");
  const [image, setImage] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const addNews = () => {
    if (!title || !content) {
      alert("Please enter all fields!");
      return;
    }
    setNews([...news, { id: news.length + 1, title, content, videoId, image, meta: "By Admin | " + new Date().toDateString() }]);
    setTitle("");
    setContent("");
    setVideoId("");
    setImage("");
  };

  const deleteNews = (id) => {
    setNews(news.filter((item) => item.id !== id));
  };

  if (!isAdmin) {
    return <div>Access Denied! <Link to="/admin">Login</Link></div>;
  }

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <input type="text" placeholder="News Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="News Content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
      <input type="text" placeholder="YouTube Video ID" value={videoId} onChange={(e) => setVideoId(e.target.value)} />
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Preview" className="news-preview" />}
      <button onClick={addNews}>Add News</button>

      <h3>Current News</h3>
      <div className="admin-news-list">
        {news.map((item) => (
          <div key={item.id} className="admin-news-item">
            <img src={item.image} alt="News" />
            <p>{item.title}</p>
            <button onClick={() => deleteNews(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [news, setNews] = useState(initialNewsData);

  return (
    <Router>
      <Navbar toggleSidebar={() => setShowSidebar(!showSidebar)} />
      <Sidebar showSidebar={showSidebar} toggleSidebar={() => setShowSidebar(!showSidebar)} />
      <Routes>
        <Route path="/" element={<NewsList news={news} />} />
        <Route path="/news/:id" element={<NewsDetail news={news} />} />
        <Route path="/admin" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
        <Route path="/admin-panel" element={<AdminPanel news={news} setNews={setNews} isAdmin={isAdmin} />} />
      </Routes>
    </Router>
  );
};

export default App;

