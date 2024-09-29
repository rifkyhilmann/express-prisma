import express, {Request, Response} from 'express';

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./app/router');
const port = 3030;

app.use(bodyParser.json());
app.use(cors());
app.use("/", router);
app.use('/uploads', express.static('uploads'))

app.get('/', (req : Request, res : Response) => {
    res.send("Hello World!");
})

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
