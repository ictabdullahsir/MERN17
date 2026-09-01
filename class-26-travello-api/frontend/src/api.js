import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('travello_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authApi = {
  register: (data) => api.post('/auth/register', data),
  verifyOtp: (data) => api.post('/auth/verify-otp', data),
  resendOtp: (data) => api.post('/auth/resend-otp', data),
  login: (data) => api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
};

export const destinationApi = {
  list: () => api.get('/destinations'),
  get: (id) => api.get(`/destinations/${id}`),
  create: (data) => api.post('/destinations', data),
  update: (id, data) => api.patch(`/destinations/${id}`, data),
  remove: (id) => api.delete(`/destinations/${id}`),
};

export const tourApi = {
  list: (destination) => api.get('/tours', { params: destination ? { destination } : {} }),
  get: (id) => api.get(`/tours/${id}`),
  create: (data) => api.post('/tours', data),
  update: (id, data) => api.patch(`/tours/${id}`, data),
  remove: (id) => api.delete(`/tours/${id}`),
};

export const bookingApi = {
  create: (data) => api.post('/bookings', data),
  mine: () => api.get('/bookings/my'),
  all: () => api.get('/bookings'),
  cancel: (id) => api.patch(`/bookings/${id}/cancel`),
  status: (id, status) => api.patch(`/bookings/${id}/status`, { status }),
};

export default api;
