import {getDatabase, ref, set } from "firebase/database";
import { app } from "./firebaseConfig";
import Swal from "sweetalert2";

const loader = document.querySelector(".loader-spinner");
const overlay = document.querySelector(".overlay");
const form = document.querySelector('form')

const displayLoader = () => {
    document.querySelector('html').style.overflowY = 'hidden';
    loader.style.display = 'block';
    overlay.style.display = "block";
    document.querySelector("html").overflowY = "hidden";
  };
  const hideLoader = () => {
    document.querySelector('html').style.overflowY = 'visible';
    loader.style.display = 'none';
    overlay.style.display = "none";
    resetForm();
  };
  const resetForm = () => {
    form.reset();
  };

const generateId = (start, range) => {
    let id = Math.floor(Math.random() * range + start);
    while (id > range) {
      id = Math.floor(Math.random() * range + start);
    }
    return id;
  };
export function writeUserData(data) {
    try {
        displayLoader();
        const db = getDatabase(app);
       set(ref(db, 'employee/' + `Emp${generateId(100,1000)}`),data);
      hideLoader();
     setTimeout(()=>{
     Swal.fire({ 
      icon:"success",
      title:'<h4 style="color:rgb(3, 133, 3)">Success</h4>',
      text:'Successfully Registered',
      confirmButtonColor:'rgb(3, 133, 3)',
     
     },3000)
     })
    } catch (error) {
        hideLoader();
        setTimeout(() => {
          Swal.fire({
            icon: 'error',
            title: '<h4 style="color:rgb(179, 6, 6)">Error</h4>',
            text: 'Registration Fails',
            confirmButtonColor: 'rgb(3, 133, 3)',
          });
        }, 1000);
    }
 
  }
 