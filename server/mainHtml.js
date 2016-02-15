const isProduction = process.env.NODE_ENV === 'production';
const urlToHtml = isProduction ? "/static/app.bundle.js" : "http://localhost:4001/static/app.bundle.js";

const html = `
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Redux</title>
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <div id="root"></div>
  </body>
  <script src=${urlToHtml}></script>
</html>
`;

export default html;
