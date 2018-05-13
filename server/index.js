const express = require('express');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./services/rhymeMachine');

const app = express();

require('./routes/rhymeRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
