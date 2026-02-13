import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

interface HealthResponse {
  status: string;
  uptime: number;
  timestamp: string;
}

app.get('/health', (_req, res) => {
  const response: HealthResponse = {
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
  res.json(response);
});

app.get('/api/greeting/:name', (req, res) => {
  const { name } = req.params;
  res.json({
    message: `Hello, ${name}!`,
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/echo', (req, res) => {
  res.json({
    query: req.query,
    headers: req.headers,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
