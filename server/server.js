const express = require('express');
const path = require('path');
const PORT = 3000;
const loginRouter = require('./routes/loginRouter');
const movieRouter = require('./routes/movieRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, '../client')));
app.use('/assets', express.static(path.resolve(__dirname, '../client/assets')));

app.use('/api', movieRouter);
app.use('/login', loginRouter);

app.get('/', (req, res) => res.status(200).send('home page route is working'));

app.use((req, res) => res.status(200).send('catch all route is working'));


app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Express error handler caught middleware error',
    status: 500,
    message: {error: 'An Error occured with server and middleware'},
  };
  const errorObj = Object.assign({}, defaultError, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () =>{
  console.log(`Listening on ${PORT}`);
})