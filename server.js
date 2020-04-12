const express = require("express");
const path = require("path");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

require("dotenv").config();

// Defining middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets on heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now listening on port ${PORT}!`);
});
