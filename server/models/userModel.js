const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = 'mongodb+srv://A3ds:CodesmithAxolotl@cluster0.jy9u7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

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

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  favorites: [Number]
});

module.exports = mongoose.model('User', userSchema);