import 'core-js/stable';
import { getDatabase, ref, set, update, remove } from 'firebase/database';
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
const generateId = (start, range) => {
  let id = Math.floor(Math.random() * range + start);
  while (id > range) {
    id = Math.floor(Math.random() * range + start);
  }
  return id;
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

export function editEmployeeData(id, data) {
  const db = getDatabase(app);
  update(ref(db, 'employee/' + id), data)
    .then(() => {
      //localStorage for success message
      const localKey = 'successMessage';
      localStorage.setItem(localKey, 'Successfully Updated');
      window.location.reload();
    })
    .catch(() => {
      notification.style.right = '0px';
      notification.querySelector('.message').innerHTML = 'Network issue';
      notification.style.backgroundColor = 'red';
      setTimeout(() => {
        notification.style.right = '-300px';
      }, 1000);
    });
}
export function deleteEmployeeData(id) {
  displayLoader();
  const db = getDatabase(app);
  remove(ref(db, 'employee/' + id))
    .then(() => {
      //localStorage for success message
      const localKey = 'successMessage';
      localStorage.setItem(localKey, 'Successfully Deleted');
      window.location.reload();
    })
    .catch(() => {
      hideLoader();
      notification.style.right = '0px';
      notification.querySelector('.message').innerHTML = 'Network issue';
      notification.style.backgroundColor = 'red';
      setTimeout(() => {
        notification.style.right = '-300px';
      }, 1000);
    });
}

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
successMessage();
