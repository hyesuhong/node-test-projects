import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import router from './router/posts';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/posts', router);

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
