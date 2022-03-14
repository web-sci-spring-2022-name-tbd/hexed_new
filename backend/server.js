const express = require('express');
const path = require('path');
const axios = require('axios');

const PORT = 3000;

const app = express();

app.use( express.static(path.join(__dirname, '../dist/hexed_new/')));

app.get("/", (req, res) => {
  res.status(200)
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
  const { name } = req.query;
  const { score } = req.query;
  if (name === undefined || score === undefined ) {
    // throw an error here
    res.status(400).send();
    return;
  } else {
    // make GET request to https://freebee.fun/cgi-bin/scores?name=score
    axios.get(`https://freebee.fun/cgi-bin/scores?${name}=${score}`)
      .then((data) => {
        console.log("it worked");
        res.status(200).send();
      }
      )
      .catch((err) => {
        console.log("Error: " + err);
      });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
