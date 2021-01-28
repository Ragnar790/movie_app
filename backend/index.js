const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");

const session_secret = "newton";

const app = express();
app.use(express.json());
var cors = require("cors");

app.use(cors());

app.use(
	session({
		secret: session_secret,
	})
);

//CREATE CONNECTION
const mongoURI = "mongodb://localhost:27017" + "/signUp";
const db = mongoose.createConnection(mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
db.on("connected", () => {
	console.log("connected to mongodb");
});

//DEFINING SCHEMA
const userSchema = new mongoose.Schema({
	userName: String,
	password: String,
});
const userMoviesSchema = new mongoose.Schema({
	liked: [],
	userId: mongoose.Schema.Types.ObjectId,
});
const userMovieModel = db.model("userMovie", userMoviesSchema);
const userModel = db.model("user", userSchema);

const isInvalid = (val) => val === null || val === undefined;
const SALT = 7;

const isNullOrUndefined = (val) => val === null || val === undefined;

const authMW = async (req, res, next) => {
	if (isNullOrUndefined(req.session) || isNullOrUndefined(req.session.userId)) {
		res.status(401).send({ err: "Not logged in." });
	} else {
		next();
	}
};

//BACKEND API's
app.post("/signup", async (req, res) => {
	const { userName, password } = req.body;
	const existingUser = await userModel.findOne({ userName });
	if (isInvalid(existingUser)) {
		const hashedPW = bcrypt.hashSync(password, SALT);
		const newUser = new userModel({ userName, password: hashedPW });
		await newUser.save();
		req.session.userId = newUser._id;
		console.log("session ", req.session);
		res.status(201).send({ Success: "Congratulations! Signed up." });
	} else {
		res.status(400).send({ Error: `Username ${userName} already exists.` });
	}
});

app.post("/login", async (req, res) => {
	let { userName, password } = req.body;
	userName = userName.trim();
	password = password.trim();
	const existingUser = await userModel.findOne({ userName });
	if (isInvalid(existingUser)) {
		res.status(401).send({ error: `Username ${userName} does not exist.` });
	} else {
		const hashedPW = existingUser.password;
		if (bcrypt.compareSync(password, hashedPW)) {
			res.status(200).send("Logged in.");
			req.session.userId = existingUser._id;
			// console.log("session ", req.session);
		} else {
			res.status(401).send({ error: "Incorrect password." });
		}
	}
});

app.get("/demo", (req, res) => {
	res.status(200).send("Working!!");
});

app.listen(8080, () => console.log(`App listening on port 8080!`));
