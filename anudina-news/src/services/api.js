import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const newsAPI = {
  getAllNews: () => api.get('/news'),
  createNews: (formData) => api.post('/news', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deleteNews: (id) => api.delete(`/news/${id}`),
};