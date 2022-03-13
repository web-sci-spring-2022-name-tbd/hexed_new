const express = require('express');
const path = require('path');
const axios = require('axios');

const PORT = 3000;

const app = express();

app.use( express.static(path.join(__dirname, '../dist/hexed_new/')));

app.get('/getscores', function (req, res) {
  axios.get("https://freebee.fun/cgi-bin/scores")
    .then((res2) => {
      res.send(res2.data);
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
});

app.get("/sendscore", (req, res) => {
  console.log(req.body);
  res.json({ 'test': 'hi' });
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
