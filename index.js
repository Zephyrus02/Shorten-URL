const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const URL = require("./model/url");
const connect = require("./connect");
const staticRouter = require("./routes/staticrouter");
const app = express();
const port = 3000;

connect("mongodb://localhost:27017/short-url")
	.then(() => {
		console.log("Connected to database");
	})
	.catch((error) => {
		console.error("Error connecting to database", error);
	});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/url", urlRoute);
app.use("/", staticRouter);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/test", async (req, res) => {
	const urls = await URL.find({});
	return res.render("index", { urls: urls });
});

app.get("/url/:short_id", async (req, res) => {
	const short_id = req.params.short_id;
	const url = await URL.findOneAndUpdate(
		{ short_id: short_id },
		{
			$push: {
				visits: {
					timestamp: Date.now(),
				},
			},
		}
	);
	if (!url) {
		return res.status(404).json({ error: "url not found" });
	}
	return res.redirect(url.redirected_url);
});

app.listen(port, () =>
	console.log(`app listening on http://localhost:${port}/`)
);
