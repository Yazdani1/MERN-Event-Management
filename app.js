const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

  // "proxy": "http://localhost:8080"
    // "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"

//db connection
require("./model/db");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//router

app.use("/api", require("./router/user"));
// app.use("/auth", require("./router/post"));
// app.use("/auth", require("./router/announcement"));
// app.use("/auth", require("./router/profile"));

//to deploy heroku
// Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

//to deploy vercel

if(process.env.NODE_ENV=='production'){
  const path = require('path')

  app.get('/',(req,res)=>{
      app.use(express.static(path.resolve(__dirname,'client','build')))
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

app.listen(PORT, (req, res) => {
  console.log("Server connected");
});



