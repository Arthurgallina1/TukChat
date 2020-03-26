const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server =
//Set static folder
app.use(express.static(path.join(__dirname, 'public')));


const PORT = 3000 || process.ENV.PORT;

app.listen(PORT, () => console.log(`Server on ${PORT}`));