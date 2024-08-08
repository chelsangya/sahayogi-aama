import axios from 'axios';

const logToBackend = (level, message) => {
  axios.post('/api/logs', { level, message })
    .catch(err => console.error('Failed to log to backend', err));
};

const logger = {
  info: (message) => logToBackend('info', message),
  warn: (message) => logToBackend('warn', message),
  error: (message) => logToBackend('error', message),
};

export default logger;
