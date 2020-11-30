
console.log('it works');

const email = document.querySelector('[name="email"]');
const password = document.querySelector('[name="password"]');
const loginForm = document.querySelector('.login-form');
const msg = document.querySelector('.msg');

loginForm.onsubmit = (e) =>{
    e.preventDefault();

    const data = { 
        email: email.value,
        password: password.value
     };

     if (data.email == "" || data.password == ""){
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

     fetch('/admin/login',

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
        console.log(data.succ);
        if (data.succ == 0 || data.succ == 1){
            msg.innerHTML = '';
            const html = `<p class="msg-content">${data.msg}</p>`;
            msg.insertAdjacentHTML('afterbegin',html);

        }
        
    }).catch((err)=>{
        return err;
    });
}


