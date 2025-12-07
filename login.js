// An hien password
let showPassword = document.getElementById('showPassword');
let inputPassword = document.getElementById('password');

showPassword.onclick = function () {
  if (inputPassword.type == 'password') {
    inputPassword.type = 'text';
    showPassword.classList.add('show');
  } else {
    inputPassword.type = 'password'
    showPassword.classList.remove('show');
  }
}


// Chuyen doi giua form login va register
let options = document.querySelectorAll('.changeType');
let form = document.getElementById('form');

options.forEach(val => {
  val.addEventListener('click', function (event) {
    form.classList.remove('login');
    form.classList.remove('register');
    form.classList.add(this.id);
  })
})

// Chuyen huong den trang user
document.getElementById('loginButton').addEventListener('click', function () {
  window.location.href = 'profile.html';
});

// Chuyen tu form Register sang Login khi nhan Button Dang Ky
document.getElementById("registerButton").addEventListener("click", function (e) {
  e.preventDefault();
  form.classList.remove('register');
  form.classList.add('login');
});

