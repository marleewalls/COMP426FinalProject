$(function() {
  const $form = $('#login-form');

  
  $form.submit(function(e) {
    e.preventDefault();  
    let data = {
      "user": "marlee",
      "password": "123"
    }
      
    fetch('http://localhost:3030/login', {
      method: 'POST', 
      mode: 'no-cors',
      body: JSON.stringify(data)
    }).then(function(data) {
      console.log(data);
    });
  });
});