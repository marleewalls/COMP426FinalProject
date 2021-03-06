const successMessage = function () {
  const $afterSignIn = $('#login-form');
  $afterSignIn.append(`<p>You have successfully signed in!</p>`);
  window.location.replace("https://powerful-brook-12795.herokuapp.com/home.html");
}
const notFound = function () {
  const $afterSignIn = $('#login-form');
  $afterSignIn.append(`<p>User not found.</p>`);
}
const unauthorizedMessage = function () {
  const $afterSignIn = $('#login-form');
  $afterSignIn.append(`<p>You have entered your username and/or password incorrectly.</p>`);
}

const redirectSU = function () {
  window.location.replace("https://powerful-brook-12795.herokuapp.com/sign_up.html");
}

$(function () {
  $('body').on('click', '#signup', redirectSU);

  const $form = $('#login-form');

  $form.submit(function (e) {
    e.preventDefault();

    fetch('https://powerful-brook-12795.herokuapp.com/login', {
      method: 'POST',
      body: JSON.stringify({
        "user": $('#username_check').val(),
        "password": $('#password_check').val()
      }),
      credentials: "same-origin",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(response => {
      if (response.status == 200) {
        successMessage();
      }
      if (response.status == 404) {
        notFound();
      }
      if (response.status == 403) {
        unauthorizedMessage();
      }
    });
  });
});