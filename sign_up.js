$(function () {
    const $form = $('#signup-form');

    $form.submit(function (e) {
        e.preventDefault();

        fetch('https://powerful-brook-12795.herokuapp.com/signup', {
            method: 'POST',
            // mode: 'no-cors',
            body: JSON.stringify({
                "first_name": $('#first_name').val(),
                "last_name": $('#last_name').val(),
                "email": $('#email').val(),
                "user": $('#username').val(),
                "password": $('#password').val()
            }),
            credentials: "same-origin",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
    });
});