const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

// database connectivity
require('./config');

// cross platform compatibility
app.use(cors());

// body parser
app.use(express.json());

// routers
app.use('/api', require('./routers'));
app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.status(200).setHeader("Content-Type", "text/html");
    res.end("<hmtl><body><h1>Express Server</h1></body></hmtl>");
    next();
});

// dotenv file configuration
dotenv.config({ path: '.env' });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));