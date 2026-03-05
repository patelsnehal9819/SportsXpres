import axios from 'axios';

// Use the Codespaces URL, NOT localhost
const API = axios.create({
  baseURL: 'https://solid-fishstick-7v74445764vj3pjgx-5000.app.github.dev/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;