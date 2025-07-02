import cors from 'cors';

const corsMiddleware = cors({
  origin: 'http://localhost:5713',
  credentials: true
})

export default corsMiddleware;