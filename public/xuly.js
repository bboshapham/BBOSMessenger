var socket = io("http://localhost:3000");

socket.on("server-send-register-failed", function(){
  alert("Dang ky that bai!");
});

socket.on("server-send-register-success", function(data){
  $("#currentUser").html(data);
  $("#loginForm").hide(2000);
  $("#chatForm").show(1000);
});

socket.on("server-send-user-list", function(data){
    $("#boxContent").html("");
  data.forEach(function(i){
    $("#boxContent").append("<div class='user'>"+i+"</div>");
  });
});

socket.on("server-send-message", function(data){
    $("#listMessages").append(""+data+"<br>");
});

$(document).ready(function(){
  $("#loginForm").show();
  $("#chatForm").hide();
  $("#btnRegister").click(function(){
    socket.emit("client-send-username",$("#txtUserName").val());
  });
  $("#btnSend").click(function(){
    socket.emit("client-send-message",$("#txtMessage").val());
  });
});
