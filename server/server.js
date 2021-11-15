const mongoose = require('mongoose')
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();


mongoose
  .connect("mongodb://localhost:27017/tip-counter", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to DB");
  });

const PORT = process.env.PORT || 3001;
 app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});


