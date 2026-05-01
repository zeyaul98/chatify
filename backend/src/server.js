import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import path from 'path';
import cookieParser from 'cookie-parser'
import { app, server } from './lib/socket.js';
import cors from 'cors'
dotenv.config();

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';


const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

app.use(express.json({limit:"5mb"}));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes); 



//make ready for production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
}


app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the API!' });
    console.log('API endpoint was hit');
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});