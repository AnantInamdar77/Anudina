import React, { useState } from 'react';
import { newsAPI } from './services/api';

const Admin = ({ news, setNews, onLogout }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newMeta, setNewMeta] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [newContent, setNewContent] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newCategory, setNewCategory] = useState('general');
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddNews = async () => {
    if (!newTitle || !newMeta || !newImage || !newContent) {
      setError('Please fill all required fields.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('title', newTitle);
      formData.append('meta', newMeta);
      formData.append('content', newContent);
      formData.append('category', newCategory);
      formData.append('videoUrl', newVideoUrl);
      formData.append('image', newImage);

      const response = await newsAPI.createNews(formData);
      setNews([response.data, ...news]);

      setNewTitle('');
      setNewMeta('');
      setNewContent('');
      setNewVideoUrl('');
      setNewCategory('general');
      setNewImage(null);
      setImagePreview(null);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to add news');
      setIsLoading(false);
      console.error('Add news error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this news item?')) {
      try {
        setIsLoading(true);
        await newsAPI.deleteNews(id);
        setNews(news.filter((item) => item._id !== id));
        setIsLoading(false);
      } catch (err) {
        setError('Failed to delete news');
        setIsLoading(false);
        console.error('Delete news error:', err);
      }
    }
  };

  const inputStyle = {
    padding: '10px',
    width: '100%',
    marginBottom: '12px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '16px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    padding: '10px 16px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px',
    marginRight: '10px',
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Segoe UI, sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Admin Panel</h2>
        <button onClick={onLogout} style={{ ...buttonStyle, background: '#dc3545', color: 'white' }}>
          Logout
        </button>
      </div>

      {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

      <div style={{ marginTop: '30px' }}>
        <h3>Add News</h3>
        <input style={inputStyle} type="text" placeholder="Title *" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        <input style={inputStyle} type="text" placeholder="Meta (author, date) *" value={newMeta} onChange={(e) => setNewMeta(e.target.value)} />
        <select style={inputStyle} value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
          <option value="general">General</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
          <option value="politics">Politics</option>
          <option value="entertainment">Entertainment</option>
          <option value="business">Business</option>
          <option value="health">Health</option>
        </select>
        <input style={inputStyle} type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" style={{ width: '100%', maxWidth: '150px', height: 'auto', marginBottom: '10px', borderRadius: '6px' }} />
        )}
        <textarea style={{ ...inputStyle, height: '100px', resize: 'vertical' }} placeholder="Content *" value={newContent} onChange={(e) => setNewContent(e.target.value)} />
        <input style={inputStyle} type="text" placeholder="YouTube URL" value={newVideoUrl} onChange={(e) => setNewVideoUrl(e.target.value)} />
        <button onClick={handleAddNews} style={{ ...buttonStyle, background: '#28a745', color: 'white', opacity: isLoading ? 0.7 : 1 }} disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add News'}
        </button>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3>Manage News</h3>
        {isLoading && <p>Loading...</p>}
        {news.length === 0 && !isLoading && <p>No news items available.</p>}
        {news.map((item) => (
          <div key={item._id} style={{
            padding: '15px',
            border: '1px solid #eee',
            marginBottom: '10px',
            borderRadius: '8px',
            backgroundColor: '#fafafa',
            boxShadow: '0px 2px 5px rgba(0,0,0,0.05)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: '1' }}>
              <strong>{item.title}</strong>
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>{item.meta}</p>
            </div>
            <button onClick={() => handleDelete(item._id)} style={{ ...buttonStyle, background: '#dc3545', color: 'white' }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;