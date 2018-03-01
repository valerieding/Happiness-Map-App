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
    url: '/request/admin_login',
    type: 'post',
    dataType: 'text',
    data: {
        'username': document.getElementById('username').value,
        'password': document.getElementById('password').value,
    },
    success: function(data) {
      console.log("admin login successful");
      window.location.reload();
    },
    error: function(msg) {
      alert("Oops! Looks like you're not an admin. Try again...");
    }
  });
}


