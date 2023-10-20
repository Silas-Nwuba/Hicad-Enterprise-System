import { ref, getDatabase, set } from 'firebase/database';
import { app } from './firebaseConfig';

const loader = document.querySelector('.loader-spinner');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('form');
const notification = document.querySelector('.notification-modal');

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

const showError = () => {
  notification.style.right = '0px';
  notification.querySelector('.message').innerHTML = 'Network issue';
  notification.style.backgroundColor = 'red';
  setTimeout(() => {
    notification.style.right = '-300px';
  }, 3000);
};
const showSuccess = () => {
  notification.style.right = '0px';
  setTimeout(() => {
    notification.style.right = '-300px';
  }, 3000);
};

const generateId = (start, range) => {
  let id = Math.floor(Math.random() * range + start);
  while (id > range) {
    id = Math.floor(Math.random() * range + start);
  }
  return id;
};

export const createEmployeeDepartment = (data) => {
  displayLoader();
  const db = getDatabase(app);
  const departmentId = `${generateId(100, 1000)}`;
  set(ref(db, 'department/' + departmentId), data)
    .then(() => {
      hideLoader();
      showSuccess();
    })
    .catch(() => {
      hideLoader();
      showError();
    });
};
