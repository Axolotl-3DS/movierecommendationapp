const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.mongoose_URL;

mongoose.set('useCreateIndex', true)
mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'A3ds'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

// const db = mongoose.connection;
// db.once('open', () => {
//   console.log('Database connected:', mongoURI);
// });

// db.on('error', (err) => {
//   console.error('connection error:', err);
// });


// const SALT_WORK_FACTOR = 10;
// const bcrypt = require('bcryptjs');

// const mongoose = require('mongoose');

// mongoose.connect(
//   'mongodb+srv://A3ds:CodesmithAxolotl@cluster0.jy9u7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
//   {useNewUrlParser: true, useUnifiedTopology: true}
// );
// mongoose.connection.once('open', () => {
//   console.log('Connected to Database');
// });


const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);