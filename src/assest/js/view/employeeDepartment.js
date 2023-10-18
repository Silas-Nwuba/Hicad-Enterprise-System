import 'core-js/stable';
import 'regenerator-runtime/runtime.js';
import data from '../../../data.json';

const employeeName = document.querySelector('.employee-name');
const departmentName = document.querySelector('.department-name');
const position = document.querySelector('.employee-position');
const jobType = document.querySelector('.job-type');
const select = document.querySelectorAll('select');
const form = document.querySelector('form');
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
      const type = `<option value="Full Time">Full Time</option>
      <option value="Part Time">Part Time</option>
      <option value="Contract">Contract</option>`;
      jobType.insertAdjacentHTML('beforeend', type);
    } else {
      jobType.disabled = true;
      jobType.length = 1;
    }
  });
};

//validation

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validateForm()) {
    console.log('working');
  }
});

const validateForm = () => {
  const selectError = true;
  select.forEach((input) => {
    if (input.value.trim() === '') {
      errorMessage(input, 'is required');
      selectError = false;
    } else {
      successMessage(input);
      selectError = true;
    }
    if (selectError === true) {
      return true;
    } else {
      return false;
    }
  });
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
