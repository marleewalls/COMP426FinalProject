const renderProfile = function (user_data) {
    console.log(user_data);
    let first_name = user_data.first_name;
    let last_name = user_data.last_name;
    let username = user_data.username;
    const $profileDiv = $('#profile');
    $profileDiv.append(`<div id="profileData">
    <h4>You are currently signed in with this account information.</h4>
    <ul>
        <li>First Name: ${first_name}</li>
        <li>Last Name: ${last_name}</li>
        <li>Username: ${username}</li>
    </ul>
    
    </div>
    <button type="submit" id="logout">Log Out</button>`)


}


const fetProfile = function () {
    fetch('http://localhost:5000/currentUserData', {
        method: 'GET',
        //mode: 'no-cors',
        credentials: "same-origin",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(response => response.json()).then(data => renderProfile(data));
}

const fetLogout = function () {
    fetch('http://localhost:5000/logout', {
        method: 'GET',
        //mode: 'no-cors',
        credentials: "same-origin",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(window.location.replace("http://localhost:5000/"));
}


$(function () {
    fetProfile();
    $('body').on('click', '#logout', fetLogout);
})