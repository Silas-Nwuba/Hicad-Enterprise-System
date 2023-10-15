import 'core-js/stable';
import { getDatabase, ref, set } from 'firebase/database';
import { app } from './firebaseConfig';
import toastify from 'toastify-js';

const loader = document.querySelector('.loader-spinner');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('form');
const notification = document.querySelector('.notification-model');
const displayLoader = () => {
  loader.style.display = 'block';
  overlay.style.display = 'block';
  overlay.style.cursor = 'wait';
  document.querySelector('html').style.overflowY = 'hidden';
};
const hideLoader = () => {
  loader.style.display = 'none';
  overlay.style.display = 'none';
  document.querySelector('html').style.overflowY = 'visible';
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
const showError = () => {
  notification.style.right = 10;
  notification.querySelector('.message').innerHTML = 'Network issue';
  notification.style.backgroundColor = 'red';
  setTimeout(() => {
    notification.style.right = '-300px';
  }, 3000);
};
const showSuccess = () => {
  notification.style.right = 10;
  setTimeout(() => {
    notification.style.right = '-300px';
  }, 3000);
};

export function writeUserData(data) {
  displayLoader();
  const db = getDatabase(app);
  const employeeId = `Emp${generateId(100, 1000)}`;
  set(ref(db, 'employee/' + employeeId), data)
    .then(() => {
      hideLoader();
      showSuccess();
    })
    .catch(() => {
      hideLoader();
      showError();
    });
}
export function editUserData(data) {}
