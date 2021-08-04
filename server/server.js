const express = require('express');
const path = require('path');
const PORT = 3000;
const loginRouter = require('./routes/loginRouter');
const movieRouter = require('./routes/movieRouter');
const passport = require('passport');
const cookieParser = require('cookie-parser');
// const gOauthRouter = require('./routes/google_Oauth');
const dotenv = require('dotenv').config();
const cookieSession = require('cookie-session');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client')));
app.use('/assets', express.static(path.resolve(__dirname, '../client/assets')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', movieRouter);
app.use('/login', loginRouter);
// app.use('/auth', gOauthRouter);

app.use(
  cookieSession({
    // milliseconds of a day
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/home', (req, res) =>
  res.status(200).send('home page route is working')
);
app.delete('/logout', (req, res) => {
  res.clearCookie('Google Oauth Cookie:');
  res.redirect('http://localhost:8080/');
});
app.get('/', (req, res) => res.status(200).sendFile('../index.html'));
app.use((req, res) => res.status(200).send('catch all route is working'));

app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Express error handler caught middleware error',
    status: 500,
    message: { error: 'An Error occured with server and middleware' },
  };
  const errorObj = Object.assign({}, defaultError, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
