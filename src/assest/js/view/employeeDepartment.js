import 'core-js/stable';
import 'regenerator-runtime/runtime.js';
import data from '../../../data.json';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../modal/firebaseConfig';
import { createEmployeeDepartment } from '../modal/departmentService';

const employeeName = document.querySelector('.employee-name');
const departmentName = document.querySelector('.department-name');
const position = document.querySelector('.employee-position');
const jobType = document.querySelector('.job-type');
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
window.onload = function () {
  departmentName.disabled = true;
  position.disabled = true;
  jobType.disabled = true;
  select.forEach((select) => {
    if (select.disabled === true) {
      select.style.cursor = 'auto';
    }
  });
  data.forEach((value) => {
    departmentName.options[departmentName.options.length] = new Option(
      value.department,
      value.department
    );
  });

  //state change
  employeeName.addEventListener('change', (e) => {
    if (e.target.value != '') {
      departmentName.disabled = false;
      position.disabled = true;
      jobType.disabled = true;
      departmentName.length = 1;
      position.length = 1;
      jobType.length = 1;
      data.forEach((item) => {
        const { department } = item;
        //prettier-ignore
        departmentName.options[departmentName.options.length] = new Option(department,department);
      });
    } else {
      departmentName.disabled = true;
      position.disabled = true;
      jobType.disabled = true;
      departmentName.length = 1;
      position.length = 1;
      jobType.length = 1;
    }
  });
  //department change
  departmentName.addEventListener('change', (e) => {
    if (e.target.value != '') {
      position.disabled = false;
      jobType.disabled = true;
      position.length = 1;
      jobType.length = 1;
      data.forEach((item) => {
        if (item.department === e.target.value) {
          item.position.forEach((pos) => {
            //prettier-ignore
            position.options[position.options.length] = new Option(pos,pos);
          });
        }
      });
    } else {
      position.disabled = true;
      position.length = 1;
    }
  });
  //job type
  position.addEventListener('change', (e) => {
    if (e.target.value != '') {
      jobType.disabled = false;
      jobType.length = 1;
      data.forEach((item) => {
        item.position.forEach((position) => {
          if (position === e.target.value) {
            item.type.forEach((job) => {
              jobType.options[jobType.options.length] = new Option(job, job);
            });
          }
        });
      });
    } else {
      jobType.disabled = true;
      jobType.length = 1;
    }
  });
};
//validations
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validateForm()) {
    sendEmployeeDepartmentData();
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

const sendEmployeeDepartmentData = () => {
  const employeeName = document.querySelector('.employee-name').value;
  const departmentName = document.querySelector('.department-name').value;
  const position = document.querySelector('.employee-position').value;
  const jobType = document.querySelector('.job-type').value;

  const data = {
    employeeName: employeeName,
    departmentName: departmentName,
    employeePosition: position,
    jobType: jobType,
  };
  createEmployeeDepartment(data);
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
