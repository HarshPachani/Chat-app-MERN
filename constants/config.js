const corsOptions = {
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:4173",
      process.env.CLIENT_URL,
      process.env.CLIENT_URL2,
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

export default corsOptions;