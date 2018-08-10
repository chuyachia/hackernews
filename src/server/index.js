import App from "../shared/App";
import express from "express";
import React from "react";
import {renderToString} from "react-dom/server";
import {StaticRouter} from "react-router-dom";

const app = express();
app.use(express.static("public"));

app.get("*",(req,res) => {
    const context = {};
    const markup = renderToString(
        <StaticRouter location={req.url} context={context}>
          <App/>
        </StaticRouter>
        );

    res.send(`
    <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Hacker New Watch</title>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.6/css/all.css">
          <link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet'>
          <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
          <script src="/bundle.js" defer></script>
          <style>
          html,body,#root, #root>* {
            margin:0;
            padding:0;
            font-family: 'Lato';
            height:100%;
          }
          </style>
        </head>
        <body>
          <div id="root">${markup}</div>
        </body>
      </html>
      `)
})


app.listen(process.env.PORT || 3000,()=>
console.log("Server is listening")
)