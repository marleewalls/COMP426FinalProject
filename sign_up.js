$(function () {
    const $form = $('#signup-form');

    $form.submit(function (e) {
        e.preventDefault();

        fetch('http://localhost:3030/signup', {
            method: 'POST',
            mode: 'no-cors',
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