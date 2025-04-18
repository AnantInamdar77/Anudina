import axios from 'axios';

const api = axios.create({
  baseURL: 'https://anudina-1.onrender.com/api',
});

export const newsAPI = {
  getAllNews: () => api.get('/news'),
  createNews: (formData) => api.post('/news', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deleteNews: (id) => api.delete(`/news/${id}`),
};
