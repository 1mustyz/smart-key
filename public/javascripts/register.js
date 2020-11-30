console.log('it works');

const firstName = document.querySelector('[name="first_name"]');
const lastName = document.querySelector('[name="last_name"]');
const email = document.querySelector('[name="email"]');
const password = document.querySelector('[name="password"]');
const confirmPassword = document.querySelector('[name="confirmPassword"]');
const registerForm =document.querySelector('.register');
const msg = document.querySelector('.msg');

registerForm.onsubmit = (e) =>{
    e.preventDefault();

    const data = { 
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value
     };

     if (data.firstName == "" || data.lastName == "" || data.email == "" || data.password == "" || data.confirmPassword == ""){
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

     fetch('/admin/register/create',

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
        console.log(data);
        if (data.succ == 0){
            msg.innerHTML = '';
            const html = `<p class="msg-content">${data.msg}</p>`;
            msg.insertAdjacentHTML('afterbegin',html);

        }else{
            //redirect to login page
        }
        
    }).catch((err)=>{
        return err;
    });
}