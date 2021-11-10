const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require("dotenv");
const pinRoute = require("./routes/pins");

// load env vars
dotenv.config({ path: './configs/config.env' });

// Body parser
app.use(express.json());

// Enable cors
app.use(cors());

// Routes
app.use("/api/pins", pinRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);