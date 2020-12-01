console.log('it works');
const name = document.querySelector('[name="name"]');
const email = document.querySelector('[name="email"]');
const text = document.querySelector('[name="text"]');
const contactForm = document.querySelector('.contact-form');
const msg = document.querySelector('.msg');

contactForm.onsubmit = (e) =>{
  e.preventDefault();

  const data = { 
    name: name.value,
    email: email.value,
    text: text.value
 };

 

  if (data.name == "" || data.email == "" || data.text == ""){
      msg.innerHTML = '';
      const html = `<p class="msg-content">You have to fill in  all fields</p>`;
      msg.insertAdjacentHTML("afterbegin",html);
      return;
  }

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  //  headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
  headers.append('Origin','http://localhost:3000');

  fetch('/contact/send',

      {method: 'POST',
      body: new URLSearchParams(data),
      mode: 'no-cors',
      credentials: 'include',
      method: 'POST',
      headers: headers
    }

  ).then(function(res){
      console.log('hello data');
      return res.json(data);

  }).then(function(data){
      
      if (data){
          msg.innerHTML = '';
          const html = `<p class="msg-content">${data.msg}</p>`;
          msg.insertAdjacentHTML('afterbegin',html);

      }
      
  }).catch((err)=>{
      return err;
  });
}