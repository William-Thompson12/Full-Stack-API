require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./models");

var corsOptions = {
  origin: "https://full-budget-tool.herokuapp.com/"
};

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "This is the route" });
});

require("./routes/user.routes")(app);

require("./routes/budget.routes")(app);

require("./routes/transaction.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
//my one change