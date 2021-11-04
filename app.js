import express from "express";
import dotenv from 'dotenv'
import userRouter from './routes/user.js';

dotenv.config();

const app = express();

app.use(express.json())

app.use('/users',userRouter);

app.get("/", (req, res) => {
	res.send("Hello world");
});

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
	console.log(`Server started at http://localhost:${PORT}`);
});
