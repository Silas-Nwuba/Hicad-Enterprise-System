import { ref, getDatabase, set } from 'firebase/database';
import { app } from './firebaseConfig';

const notification = document.querySelector('.notification-modal');
const generateId = (start, range) => {
  let id = Math.floor(Math.random() * range + start);
  while (id > range) {
    id = Math.floor(Math.random() * range + start);
  }
  return id;
};

export const sendleaveHistory = (data) => {
  const db = getDatabase(app);
  const employeeLeaveId = `EmpleaveId${generateId(100, 1000)}`;
  set(ref(db, 'leaveHistory/' + employeeLeaveId), data)
    .then(() => {
      //localStorage for success message
      const localKey = 'successMessage';
      localStorage.setItem(localKey, 'Successfully Sent');
      window.location.reload();
    })
    .catch(() => {
      const localKey = 'errorMessage';
      localStorage.setItem(localKey, 'Network Issue');
      window.location.reload();
    });
};
const successMessage = () => {
  const message = localStorage.getItem('successMessage');
  if (message) {
    notification.querySelector('.message').innerHTML = message;
    notification.style.right = '0px';
    setTimeout(() => {
      notification.style.right = '-300px';
    }, 3500);
    localStorage.removeItem('successMessage');
  }
};
const errorMessage = () => {
  const message = localStorage.getItem('errorMessage');
  if (message) {
    notification.querySelector('.message').innerHTML = message;
    notification.style.right = '0px';
    notification.style.backgroundColor = 'red';
    setTimeout(() => {
      notification.style.right = '-300px';
    }, 3500);
    localStorage.removeItem('errorMessage');
  }
};
successMessage();
errorMessage();
