const http=require('http');
const app=require('./app');
const port= process.env.PORT ||5000;
const server = http.createServer(app);
global.baseDir = __dirname;
//server.listen(port);
server.listen(port, () => {
    console.log(`Server running at http://${port}/`);
  });