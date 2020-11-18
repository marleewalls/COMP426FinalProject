$(function() {
    const $form = $('#login-form');
  
    $form.submit(function(e) {
      e.preventDefault();  
      
    fetch('http://localhost:3000/login', {
      method: 'POST', 
      mode: 'no-cors', 
    });
  });
});