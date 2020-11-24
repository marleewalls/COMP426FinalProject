const redirectHome = function () {
    const $afterSignUp = $('#signup-form');
    $afterSignUp.append(`<p>You have successfully created an account!</p>`);
    window.location.replace('https://powerful-brook-12795.herokuapp.com/index.html');
}
const alreadyAccount = function () {
    const $afterSignUp = $('#signup-form');
    $afterSignUp.append(`<p>An account already exists with that username.</p>`);
}

$(function () {
    const $form = $('#signup-form');
    $form.submit(function (e) {
        e.preventDefault();

        fetch('https://powerful-brook-12795.herokuapp.com/signup', {
            method: 'POST',
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
        }).then(response => {
            if (response.status == 404) {
                alreadyAccount();
            } else {
                redirectHome();
            }
        })
    });
});