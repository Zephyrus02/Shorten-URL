const mongoose = require("mongoose");

async function connect() {
	try {
		await mongoose.connect("mongodb://localhost:27017/url-shortener", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	} catch (error) {
		console.error("Error connecting to database", error);
	}
}

module.exports = connect;
