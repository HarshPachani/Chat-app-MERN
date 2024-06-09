import cors from 'cors';
const corsOptions = {
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:4173",
      process.env.CLIENT_URL,
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

export default corsOptions;