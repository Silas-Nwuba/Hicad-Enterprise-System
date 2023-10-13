import { getDatabase, ref, set } from 'firebase/database';
import { app } from './firebaseConfig';
import Swal from 'sweetalert2';

const loader = document.querySelector('.loader-spinner');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('form');
const displayLoader = () => {
  loader.style.display = 'block';
  overlay.style.display = 'block';
  overlay.style.cursor = 'wait';
  document.querySelector('html').overflowY = 'hidden';
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
export function writeUserData(data) {
  displayLoader();
  const db = getDatabase(app);
  const employeeId = `Emp${generateId(100, 1000)}`;
  set(ref(db, 'employee/' + employeeId), data)
    .then(() => {
      hideLoader();
      setTimeout(() => {
        Swal.fire(
          {
            icon: 'success',
            title: '<h4 style="color:rgb(3, 133, 3)">Success</h4>',
            text: 'Successfully Registered',
            confirmButtonColor: 'rgb(3, 133, 3)',
          },
          1000
        );
      });
    })
    .catch(() => {
      hideLoader();
      setTimeout(() => {
        Swal.fire({
          icon: 'error',
          title: '<h4 style="color:rgb(179, 6, 6)">Error</h4>',
          text: 'Registration Fails',
          confirmButtonColor: 'rgb(3, 133, 3)',
        });
      }, 1000);
    });
}
