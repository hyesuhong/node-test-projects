import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import postRouter from './router/posts';
import authRouter from './router/auth';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
/* app.use(
	cors({
		origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
		// credentials: true,
	})
); */
app.use(morgan('tiny'));

app.use('/posts', postRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
	res.sendStatus(404);
});

app.use(
	(
		error: any,
		req: any,
		res: { sendStatus: (arg0: number) => void },
		next: any
	) => {
		console.error(error);
		res.sendStatus(500);
	}
);
app.listen(8080);
