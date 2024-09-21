document.getElementById("loginBtn").addEventListener("click", function () {
  var loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
  loginModal.show();
});

document.getElementById("showRegisterForm").addEventListener("click", function (e) {
  e.preventDefault();
  var loginModal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
  loginModal.hide();
  
  var registerModal = new bootstrap.Modal(document.getElementById("registerModal"));
  registerModal.show();
});