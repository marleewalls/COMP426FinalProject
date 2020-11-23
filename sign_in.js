$(function () {
  const $form = $('#login-form');

  $form.submit(function (e) {
    e.preventDefault();

    fetch('https://powerful-brook-12795.herokuapp.com/login', {
      method: 'POST',
      // mode: 'no-cors',
      body: JSON.stringify({
        "user": $('#username_check').val(),
        "password": $('#password_check').val()
      }),
      credentials: "same-origin",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  });
});