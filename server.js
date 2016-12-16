var express = require('express');

var app = express();



app.use("/",express.static('./test/visual'));

app.use("/three",express.static('./node_modules/three/build'));
app.use("/dev",express.static('./src/'));


app.listen(80, function () {
  console.log('Example app listening on port 80!')
});