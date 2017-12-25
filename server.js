var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var mangUsers=[];

io.on("connection",function(socket){
  console.log("Co nguoi ket noi "+socket.id);

  socket.on("client-send-username",function(data){
  if (mangUsers.indexOf(data)>=0)
  {
    socket.emit("server-send-register-failed");
  }
  else {
    mangUsers.push(data);
    socket.username = data;
    console.log("Co nguoi dang ky "+data);
    socket.emit("server-send-register-success", data);
    io.sockets.emit("server-send-user-list", mangUsers);
  }

  socket.on("client-send-message",function(data){
    io.sockets.emit("server-send-message", socket.username + ": " + data);
  });

  socket.on("disconnect",function(){
    console.log(socket.username + " out");
  });

});

});

app.get("/",function(req,res){
  res.render("trangchu");
});
