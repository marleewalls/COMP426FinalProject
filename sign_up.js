const redirectHome = function () {
    const $afterSignUp = $('#signup-form');
    console.log("redirect");
    $afterSignUp.append(`<p>You have successfully created an account!</p>`);
    window.location.replace('http://localhost:5000/index.html');
}
const alreadyAccount = function () {
    const $afterSignUp = $('#signup-form');
    $afterSignUp.append(`<p>An account already exists with that username.</p>`);
}

$(function () {
    const $form = $('#signup-form');
    $form.submit(function (e) {
        e.preventDefault();

        fetch('http://localhost:5000/signup', {
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
        }).then(response => {
            if (response.status == 404) {
                alreadyAccount();
            } else {
                redirectHome();
            }
        })
    });
});