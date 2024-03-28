'use strict';
const path = require('path');
const express = require('express');
const morgan = require('morgan');

// Env Variabels
const port = process.env.PORT || "8080";
const metricsFile = process.env.METRICS_FILE || '/mnt';
const metricsUrl = process.env.METRICS_URL || 'metrics';
const hostname = process.env.HOSTNAME;

// APP
const app = express();

// Logging
app.use(morgan('combined'))

// Root
app.get('/', function (req, res) {
  res.send('<h1>nodejs sample app</h1><h3>' + hostname + '</h3><a href="./metrics">metrics<a/><br><a href="./env">env<a/>');
});

// env
app.get('/env', function (req, res) {
  res.setHeader('content-type', 'application/json');
  res.send(process.env);
});

// metrics
if (metricsFile.startsWith('./'))
{
  app.use(metricsUrl, express.static(path.join(__dirname, metricsFile)));
} else if (metricsFile != null && metricsFile != ''){
  app.use(metricsUrl, express.static(metricsFile));
}

// Start Server
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});