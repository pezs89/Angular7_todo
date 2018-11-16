
const express = require('express');
const path = require('path');
const app = express();
const expressStatic = require('express-static-gzip');

app.use(expressStatic(path.join(__dirname, '../dist'), { enableBrotli: true }));
app.listen(3000);
