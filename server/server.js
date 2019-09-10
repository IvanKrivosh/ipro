const express = require('express');

const compression = require('compression');
const bodyParser = require('body-parser');
const routes = require('./route/routes.js');
const db = require('./config/db.config.js');

const CONTEXT = `/${process.env.CONTEXT || 'ipro'}`;
const PORT = process.env.PORT || 3000;
const app = express();

db.sequelize.sync({force: false}, () => {
  console.log('DB synchronized');
});

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', routes);

app.listen(PORT, function () {
  console.log(`App running on http://localhost:${PORT}${CONTEXT}`);
});
