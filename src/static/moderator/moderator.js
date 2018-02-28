// validate admin on submit
$(function() {
  $("#adminLoginForm").submit(function(e) {
    e.preventDefault();
    adminLogin();
    window.location.reload();
  });
});

// submit login info
function adminLogin(){
  $.ajax({
    url: 'request/',
    type: 'post',
    dataType: 'json',
    data: {
           'username': document.getElementById('username').value,
           'password': document.getElementById('password').value,
           },
    success: (function(data) {
      console.log("admin login successful");
    }),
    error: function(msg) {
      alert("Oops! Looks like you're not an admin. Try again...");
    }
  });
}


