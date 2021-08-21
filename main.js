let $data = localStorage.getItem("__users")
var id = 0

if (!$data) $data = []
else {
  $data = JSON.parse($data)
  $data.forEach(function (rowData) {
    if (!rowData) return
  
    id+=1
    let li = document.createElement('li');
  })
}

Object.size = function(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

function register () {
  id++;
  var username = document.getElementById('username').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var password2 = document.getElementById('password-confirm').value;

  document.getElementById('error-username').innerHTML = ""
  document.getElementById('error-email').innerHTML = ""
  document.getElementById('error-password').innerHTML = ""
  document.getElementById('error-password-confirm').innerHTML = ""

  var errors = {}
  if (username.length < 1) {
    errors.username = "Username is required."
  }
  if (email.length < 1) {
    errors.email = "Email is required."
  }
  if (password.length < 1) {
    errors.password = "Password is required."
  }
  if (password != password2) {
    errors.password = "Passwords should match."
  }

  $data.forEach(function (rowData) {
    if (rowData.username == username) {
      errors.username = "Username already exists."
    }
    if (rowData.email == email) {
      errors.username = "Email already exists."
    }
  })

  if (Object.size(errors)) {
    Object.entries(errors).forEach(entry => {
      const [key, value] = entry;
      document.getElementById('error-' + key).innerHTML = value
    });
    return;
  }

  $data.push({
    id,
    username,
    email,
    password
  })
  localStorage.setItem("__users", JSON.stringify($data))

  document.getElementById('username').value = ""
  document.getElementById('email').value = ""
  document.getElementById('password').value = ""
  document.getElementById('password-confirm').value = ""
  alert("Registration successful.")
}

function login () {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  var errors = {}
  if (username.length < 1) {
    errors.username = "Username is required."
  }
  if (password.length < 1) {
    errors.password = "Password is required."
  }
  var match = 0
  var matchIdx = 0
  $data.forEach(function (rowData, idx) {
    if (rowData.username == username && rowData.password == password) {
      match++;
      matchIdx = idx
    }
  })

  if (match < 1) {
    errors.password = "Username/password is invalid."
  }

  if (Object.size(errors)) {
    document.getElementById('result').innerHTML = 
    `<div class="error-username">${errors.username?errors.username:''}</div><div class="error-password">${errors.password?errors.password:''}</div>`
    return;
  }

  localStorage.setItem("__currentUser", JSON.stringify($data[matchIdx]))
  window.location = './home.html'
}

if (document.getElementById('form-submit')) document.getElementById('form-submit').addEventListener('click', register)
if (document.getElementById('sign-in-btn')) document.getElementById('sign-in-btn').addEventListener('click', login)