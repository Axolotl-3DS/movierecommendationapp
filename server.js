const path = require ('path');
const express = require ('express');
const app = express();
const PORT = 3000;
//const userRouter = require('./userRouter.js');
//const authRouter = require('./authRouter.js'); 
const movieRouter = require('./routers/movieRouter');


app.use(express.json());

app.get('/', function (request, response) {
    //response.sendFile(path.join(__dirname, './index.html'))
    response.send('hello');
});

//app.use('/user', userRouter);

//app.use('/auth', authRouter);
app.use('/movie', movieRouter);

module.exports = app;







app.listen(PORT, () => console.log(`Listening on Port ${PORT}...`))