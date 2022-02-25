const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');


app.listen(port, () => {
  console.log('Listening on *:3000');
});

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
