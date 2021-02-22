const express = require('express')
const app = express();
require('dotenv').config()


const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 1500

app.use(express.static('./public'));
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
	console.log("MongoDB database connection established successfully");
});


const userRouter = require('./routes/users/users');
const stationRouter = require('./routes/stations/stations');


app.use('/authentication', userRouter);
app.use('/stations', stationRouter);


app.listen(PORT, function () {
	console.log("Server is running on Port: " + PORT);
});
