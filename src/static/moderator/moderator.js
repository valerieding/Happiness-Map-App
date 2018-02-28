// validate admin on submit
$(function() {
  $("#adminLoginForm").submit(function(e) {
    e.preventDefault();
    adminLogin();
  });
});

// submit login info
function adminLogin(){
  $.ajax({
    url: 'request/',
    type: 'post',
    dataType: 'json',
    data: {
           'password': $("#adminLoginForm").serialize().slice(8),
           },
    success: (function(data) {
      console.log("admin login successful");
    }),
    error: function(msg) {
      alert("Oops! Looks like you're not an admin. Try again...");
    }
  });
}


