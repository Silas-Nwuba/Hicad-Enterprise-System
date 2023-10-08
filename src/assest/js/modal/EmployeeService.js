import {ref, set } from "firebase/database";
import { getDatabase } from "./firebaseConfig";

const loader = document.querySelector(".loader-spinner");
const overlay = document.querySelector(".overlay");

const displayLoader = () => {
    document.querySelector('html').style.overflowY = 'hidden';
    loader.style.display = 'block';
    overlay.style.display = "block";
  };
  const hideLoader = () => {
    document.querySelector('html').style.overflowY = 'visible';
    loader.style.display = 'block';
    overlay.style.display = "block";
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

export async function writeUserData(data) {
    try {
        displayLoader();
        const db = getDatabase;
       await set(ref(db, 'employee/' + `Emp${generateId(100,1000)}`),data);
       hideLoader();

    } catch (error) {
        alert("error occur",error)
    }
 
  }
 