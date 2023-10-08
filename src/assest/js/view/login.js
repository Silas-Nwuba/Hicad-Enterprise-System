 import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../modal/firebaseConfig";
 
const username = document.querySelector(".username");
const password = document.querySelector(".password");
const eyeIcon = document.querySelector(".eyeIcon")
const notification = document.querySelector(".notification-model");
const form = document.querySelector("form")
const loginBtn = document.querySelector(".loginBtn")

eyeIcon.addEventListener('click', (e) => {
    const parentElement = e.target.parentElement.parentElement;
    const eyeSlashIcon = parentElement.querySelector('.bi-eye-slash-fill');
    const eyeFillIcon = parentElement.querySelector('.bi-eye-fill');
    if (password.getAttribute('type') === 'password') {
      password.setAttribute('type', 'text');
      eyeSlashIcon.classList.remove('hidden');
      eyeFillIcon.classList.add('hidden');
    } else if (password.getAttribute('type') === 'text') {
      password.setAttribute('type', 'password');
      eyeSlashIcon.classList.add('hidden');
      eyeFillIcon.classList.remove('hidden');
    }
  });

const formValidation = () => {
form.setAttribute("novalidate","")
form.addEventListener("submit",(e)=> {
e.preventDefault()
if(validateInput()){
  loader()
  signUser(username.value,password.value)
  
}
})
}
const loader = () =>{
  loginBtn.innerHTML = "Processing..."
}
const showError = () => {
    notification.style.right = 0;
  setTimeout(() =>{
    notification.style.right = '-300px';

  },3000);
  }
  const showSuccess = () => {
    notification.style.right = '-300px';
  }
 const validateInput = () => {
    let passwordErr = true;
    let emailErr = true;
    const emailRegx = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    if (username.value.trim() === null || username.value.length === 0) {
     showError();
 
      emailErr = false;
    } else if (!emailRegx.test(username.value.trim())) {
     showError();
 
      emailErr = false;
    } else {
     showSuccess();
      emailErr = true;
    }
    /////////////////////////////////////////
    ///password validation
    const passRegX = new RegExp('hicad+[0-9]{3,3}');
    const adminRegx = new RegExp('admin2224');

    if (
      password.value.trim() === null ||
      password.value.length === 0
    ) {
     showError();
 
      passwordErr = false;
    } else if (
      passRegX.test(password.value.trim()) ||
      adminRegx.test(password.value.trim())
    ) {
     showSuccess(password);
      passwordErr = true;
    } else if (
      !passRegX.test(password.value.trim()) ||
      !adminRegx.test(password.value.trim())
    ) {
     showError();
 
      passwordErr = false;
    } else {
     showSuccess(password);
      passwordErr = true;
    }

    if (emailErr && passwordErr === true) {
      return true;
    } else {
      return false;
    }
  }
formValidation();
const signUser = (username,password) => {
  signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
       if(user){
        window.location.href = "http://localhost:1234/dashboard.html";
        form.reset()
       }
    })
    .catch((error) => {
      console.log(error.message);
      notification.querySelector(".message").innerHTML = "network issues";
      notification.style.right = 0;
      setTimeout(() =>{
        notification.style.right = '-300px';
      },3000);

    });
}
