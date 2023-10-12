import { writeUserData } from '../modal/EmployeeService';

function init() {
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
  // //////////////////////////////////////////////
  //form validation
  const validateForm = () => {
    const fname = document.querySelector('.first-name');
    const lname = document.querySelector('.last-name');
    const middleName = document.querySelector('.middle-name');
    const genderParent = document.querySelector('.gender-content');
    const gender = genderParent.querySelectorAll('.gender');
    const Dob = document.querySelector('.dob');
    const email = document.querySelector('.email');
    const address = document.querySelector('.address');
    const city = document.querySelector('.city');
    const postCode = document.querySelector('.postCode');
    const stateOfOrigin = document.querySelector('.stateOfOrigin');
    const maritalStatue = document.querySelector('.marital-status');
    const password = document.querySelector('.password');
    const confirmPassword = document.querySelector('.confirmPassword');
    const startDate = document.querySelector('.start-date');

    //prettier-ignore
    let nameErr =  genderError = DobErr = emailErr = addressError = cityErr = stateError = postalCodeErr = maritalErr = startDateError = passwordError = confirmErr= true;
    if (fname.value.trim() === '') {
      errorMessage(fname, 'is required');
      nameErr = false;
    } else {
      const regrex = /^[a-zA-Z]+$/;
      if (regrex.test(fname.value.trim()) === false) {
        errorMessage(fname, 'is not valid');
        nameErr = false;
      } else {
        successMessage(fname);
        nameErr = true;
      }
    }
    if (lname.value.trim() === '') {
      errorMessage(lname, 'is required');
      nameErr = false;
    } else {
      const regrex = /^[a-zA-Z]+$/;
      if (!regrex.test(lname.value.trim())) {
        errorMessage(lname, 'is not valid');
        nameErr = false;
      } else {
        successMessage(lname);
        nameErr = true;
      }
    }
    if (middleName.value.trim() === '') {
      errorMessage(middleName, 'is required');
      nameErr = false;
    } else {
      const regrex = /^[a-zA-Z]+$/;
      if (regrex.test(middleName.value.trim()) === false) {
        errorMessage(middleName, 'is not valid');
        nameErr = false;
      } else {
        successMessage(middleName);
        nameErr = true;
      }
    }
    if (gender[0].checked === false && gender[1].checked === false) {
      errorMessage(genderParent, 'is required');
      genderError = false;
    } else {
      successMessage(genderParent);
      genderError = false;
    }
    //Get the date from the TextBox.
    const regex =
      /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;
    const parts = Dob.value.split('/');
    const dtDOB = new Date(parts[1] + '/' + parts[0] + '/' + parts[2]);
    const dtCurrent = new Date();
    //Check whether valid dd/MM/yyyy Date Format.
    if (regex.test(Dob.value.trim()) === false) {
      errorMessage(Dob, 'Enter date in dd/MM/yyyy format ONLY.');
      DobErr = false;
    } else if (dtCurrent.getFullYear() - dtDOB.getFullYear() < 18) {
      errorMessage(Dob, 'Eligibility 18 years ONLY.');
      DobErr = false;
    } else {
      successMessage(Dob);
      DobErr = true;
    }
    if (email.value.trim() === '') {
      errorMessage(email, 'is required');
      emailErr = false;
    } else {
      const regrex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
      if (regrex.test(email.value.trim()) === false) {
        errorMessage(email, 'is not valid');
        emailErr = false;
      } else {
        successMessage(email);
        emailErr = true;
      }
    }
    if (stateOfOrigin.value === 'Choose...') {
      errorMessage(stateOfOrigin, 'is required');
      stateError = false;
    } else {
      successMessage(stateOfOrigin);
      stateError = true;
    }
    if (city.value.trim() === '') {
      errorMessage(city, 'is required');
      cityErr = false;
    } else {
      const regrex = /^[a-zA-Z]+$/;
      if (regrex.test(city.value.trim()) === false) {
        errorMessage(city, 'is not valid');
        cityErr = false;
      } else {
        successMessage(city);
        cityErr = true;
      }
    }
    if (postCode.value.trim() === '') {
      errorMessage(postCode, 'is required');
      postalCodeErr = false;
    } else {
      const regex = /^\d{6}$/;
      if (regex.test(postCode.value) === false) {
        errorMessage(postCode, 'is not valid');
        postalCodeErr = false;
      } else {
        successMessage(postCode);
        postalCodeErr = true;
      }
    }
    if (address.value.trim() === '') {
      errorMessage(address, 'is required');
      addressError = false;
    } else {
      if (address.value.length < 10) {
        errorMessage(address, 'address should be atleast 10 character');
        addressError = false;
      } else {
        successMessage(address);
        addressError = true;
      }
    }
    if (maritalStatue.value.trim() === '') {
      errorMessage(maritalStatue, 'is required');
      maritalErr = false;
    } else {
      successMessage(maritalStatue);
      maritalErr = true;
    }
    if (startDate.value === '') {
      errorMessage(startDate, 'is required');
      startDateError = false;
    } else {
      successMessage(startDate);
      startDateError = true;
    }
    if (password.value.trim() === '') {
      errorMessage(password, 'is required');
      passwordError = false;
    } else {
      const regex = new RegExp(`${fname.value}+${parts[1]}+${parts[2]}`);
      if (!regex.test(password.value.trim())) {
        errorMessage(password, 'is not valid');
        passwordError = false;
      } else {
        successMessage(password);
        passwordError = true;
      }
    }

    if (confirmPassword.value.trim() === '') {
      errorMessage(confirmPassword, 'is required');
      confirmErr = false;
    } else if (confirmPassword.value.trim() != password.value.trim()) {
      errorMessage(confirmPassword, 'do not match');
      confirmErr = false;
    } else {
      successMessage(confirmPassword);
      confirmErr = true;
    }

    if (nameErr === true) {
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
  const showTextPassword = () => {
    const eyeIcon = document.querySelector('.eye-icon');
    const eyeFillIcon = document.querySelector('.bi-eye-fill');
    const eyeSlashIcon = document.querySelector('.bi-eye-slash-fill');
    //////////////////////////////////////////////////////
    //changing password type to text type
    eyeIcon.addEventListener('click', () => {
      const inputType = document.querySelector('.password');
      if (inputType.getAttribute('type') === 'password') {
        inputType.setAttribute('type', 'text');
        eyeSlashIcon.classList.remove('hidden');
        eyeFillIcon.classList.add('hidden');
      } else if (inputType.getAttribute('type') === 'text') {
        inputType.setAttribute('type', 'password');
        eyeSlashIcon.classList.add('hidden');
        eyeFillIcon.classList.remove('hidden');
      }
    });
  };
  const showTextConfirmPassword = () => {
    const eyeIcon = document.querySelector('.confirmPassword-eye-icon');
    //////////////////////////////////////////////////////
    //changing password type to text type
    eyeIcon.addEventListener('click', (e) => {
      const parentElement = e.target.parentElement.parentElement;
      const eyeSlashIcon = parentElement.querySelector('.bi-eye-slash-fill');
      const eyeFillIcon = parentElement.querySelector('.bi-eye-fill');
      const inputType = document.querySelector('.confirmPassword');
      if (inputType.getAttribute('type') === 'password') {
        inputType.setAttribute('type', 'text');
        eyeSlashIcon.classList.remove('hidden');
        eyeFillIcon.classList.add('hidden');
      } else if (inputType.getAttribute('type') === 'text') {
        inputType.setAttribute('type', 'password');
        eyeSlashIcon.classList.add('hidden');
        eyeFillIcon.classList.remove('hidden');
      }
    });
  };
  showTextPassword();
  showTextConfirmPassword();
  const form = document.querySelector('form');
  form.setAttribute('novalidate', '');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    validateForm();
  });
  const sendDataToFirebase = (formElement) => {
    const firstName = formElement.querySelector('.first-name').value;
    const lastName = formElement.querySelector('.last-name').value;
    const middleName = formElement.querySelector('.middle-name').value;
    const gender = formElement.querySelector('.gender:checked').value;
    const Dob = formElement.querySelector('.dob').value;
    const email = formElement.querySelector('.email').value;
    const stateOfOrigin = formElement.querySelector('.stateOfOrigin').value;
    const password = formElement.querySelector('.password').value;
    const confirmPassword = formElement.querySelector('.confirmPassword').value;
    const address = formElement.querySelector('.address');
    const city = formElement.querySelector('.city');
    const postCode = formElement.querySelector('.postCode');
    const maritalStatue = formElement.querySelector('.marital-status');
    const emergencyContact = formElement.querySelector(
      '.emergency-contact-name'
    );
    const position = formElement.querySelector('.position');
    const startDate = formElement.querySelector('.start-date');
    //prettier-ignore
    const data = {
     firstName : firstName,
     lastName : lastName,
     middleName : middleName,
     gender : gender,
     Dob:Dob,
     email : email,
     stateOfOrigin:stateOfOrigin,
     password : password,
     confirmPassword:confirmPassword,
     address:address,
     city:city,
     postCode : postCode,
     maritalStatue: maritalStatue,
     emergencyContact: emergencyContact,
     position: position,
     startDate:startDate,
   
    }
    writeUserData(data);
  };
}
init();
