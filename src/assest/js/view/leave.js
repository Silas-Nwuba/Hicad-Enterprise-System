import 'core-js/stable';
import 'regenerator-runtime/runtime.js';
import { app } from '../modal/firebaseConfig';
import data from '../../../data.json';
import { getDatabase, ref, onValue } from 'firebase/database';
//prettier-ignore
import {editDepartmentData,deleteDepartmentData} from '../modal/departmentService';
import { createEmployeeLeave } from '../modal/leaveSevice';

const employeeName = document.querySelector('.employee');
const select = document.querySelectorAll('select');
const form = document.querySelector('form');

const db = getDatabase(app);
const startRef = ref(db, 'employee');
onValue(startRef, (snaphot) => {
  snaphot.forEach((childSnapshot) => {
    const { firstName, lastName, middleName } = childSnapshot.val();
    const dot = '.';
    const fullname =
      firstName.charAt(0).toUpperCase() +
      firstName.slice(1) +
      ' ' +
      middleName.charAt(0).toUpperCase() +
      dot +
      ' ' +
      lastName.charAt(0).toUpperCase() +
      lastName.slice(1);
    employeeName.options[employeeName.options.length] = new Option(
      fullname,
      fullname
    );
  });
});

form.setAttribute('novalidate', '');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validateForm()) {
    sendEmployeeLeaveData(form);
  }
});

const validateForm = () => {
  let selectError = true;
  select.forEach((input) => {
    if (input.value.trim() === '') {
      errorMessage(input, 'is required');
      selectError = false;
    } else {
      successMessage(input);
      selectError = true;
    }
  });
  if (selectError === true) {
    return true;
  } else {
    return false;
  }
};

const errorMessage = (input, message) => {
  const inputParent = input.parentElement;
  const small = inputParent.querySelector('small');
  small.classList.add('error-message');
  small.textContent = `${getInputName(inputParent)} ${message}`;
};
const successMessage = (input) => {
  const inputParent = input.parentElement;
  const small = inputParent.querySelector('small');
  small.classList.remove('error-message');
  small.textContent = '';
};
const getInputName = (input) => {
  const text = input.querySelector('label');
  return text.textContent;
};

const sendEmployeeLeaveData = (form) => {
  const employeeName = form.querySelector('.employee').value;
  const position = form.querySelector('.position').value;
  const leaveType = form.querySelector('.leave-type').value;
  const requestLeave = form.querySelector('.leave-request').value;

  const data = {
    employeeName: employeeName,
    position: position,
    leaveType: leaveType,
    requestLeave: requestLeave,
    status: 'Pending',
  };
  createEmployeeLeave(data);
};

//logout
const user = document.querySelector('.info');
const logoutModal = document
  .querySelector('.logout-modal')
  .querySelector('.modal');
user.addEventListener('click', () => {
  if (logoutModal.style.display === 'block') {
    logoutModal.style.display = 'none';
  } else {
    logoutModal.style.display = 'block';
  }
});
