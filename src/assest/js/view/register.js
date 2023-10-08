import { writeUserData } from "../modal/EmployeeService";


function init() {
//   const logoutEvent = document.querySelector('.logout');
//   const element = document.querySelector('.logout-modal');
//   const modal = document.querySelector('.modal').className;
//   const backdrop = document.querySelector('.backdrop').className;
//   const closeEventClass = document.querySelector('.close').className;
//   const declineBtn = document.querySelector('.decline');
//   const confirmBtn = document.querySelector('.confirm');
//   const dropDown = document.querySelector('.dropdown-content');

//   logout.logoutFunction(logoutEvent, element, modal, backdrop);
//   logout.closeModalFunction(closeEventClass, element, modal, backdrop);
//   logout.declineFunction(declineBtn, element, modal, backdrop);

//   ///////////////////////////////////////////
//   // sidebar
//   const sideMenuIcon = document.querySelector('.bi-list');
//   const sidebarElement = document.querySelector('.menu');
//   const sidebarBackdrop = document.querySelector('.backdrop');
//   sidebar.sidebarfunction(
//     sideMenuIcon,
//     sidebarElement,
//     sidebarBackdrop,
//     dropDown
//   );
//   sidebar.closeSidebarFunction(sidebarBackdrop, sidebarElement);

//   /////////////////////////////////////////////////////
//   //user model
//   const userPersonIcon = document.querySelector('.bi-person');
//   userAcct.showModelFunction(userPersonIcon, dropDown);

     const customDateInput = document.querySelector('.dob');
        const hiddenDateInput = document.querySelector('.hidden-date');

        // Attach an event listener to the custom date input
        customDateInput.addEventListener('input', function () {
            // Parse and format the date as needed
            const enteredDate = parseCustomDate(this.value);
            
            // Update the hidden input with a standard date format (e.g., ISO 8601)
            hiddenDateInput.value = enteredDate;
        });


function parseCustomDate(dateString) {
  // Implement your custom date parsing logic here
  // Example: parse 'MM/DD/YYYY' format
  const parts = dateString.split('/');
  if (parts.length === 3) {
      const month = parseInt(parts[0], 10);
      const day = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);
      if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
          // Construct a standard date format (e.g., ISO 8601)
          return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      }
  }
  return '';
}

  // //////////////////////////////////////////////
  //form validation
  const validateForm = () => {
    const fname = document.querySelector('.first-name');
    const lname = document.querySelector('.last-name');
    const middleName = document.querySelector('.middle-name');
    const genderParent = document.querySelector('.gender-content');
    const gender = genderParent.querySelectorAll('.gender');
    const age = document.querySelector('.age');
    const email = document.querySelector('.email');
    const address = document.querySelector(".address");
    const city = document.querySelector(".city");
    const postCode = document.querySelector(".postCode");
    const stateOfOrigin = document.querySelector('.stateOfOrigin');
    const maritalStatue = document.querySelector(".marital-status");
    const emergencyContact = document.querySelector(".emergency-contact-name");
    const password = document.querySelector('.password');
    const confirmPassword = document.querySelector('.confirmPassword');
    const position = document.querySelector(".position");
    const startDate = document.querySelector(".start-date")

   
    //prettier-ignore
    let nameErr = true;

    if (fname.value.trim() === '') {
      errorMessage(fname, 'is required');
      nameErr = false;
    } else {
      const regrex = /^[a-zA-Z]+$/;
      if (!regrex.test(fname.value.trim())) {
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
      if (!regrex.test(middleName.value.trim())) {
        errorMessage(middleName, 'is not valid');
        nameErr = false;
      } else {
        successMessage(middleName);
        nameErr = true;
      }
    }
    if (gender[0].checked === false && gender[1].checked === false) {
      nameErrr = false;
    } else {
      successMessage(genderParent);
     nameErr = false;
    }
    if (age.value === '') {
      errorMessage(age, 'is required');
   nameErr = false;
    } else {
      const regrex = /^[0-9]+$/;
      if (!regrex.test(age.value.trim())) {
        errorMessage(age, 'is not valid');
     nameErr = false;
      } else if (Number(age.value) < 18) {
        errorMessage(age, 'should not be less than 18');
     nameErr = false;
      } else if (Number(age.value) > 40) {
        errorMessage(age, 'should not be greater than 40');
     nameErr = false;
      } else {
        successMessage(age);
     nameErr = true;
      }
    }

    if (email.value.trim() === '') {
      errorMessage(email, 'is required');
      nameErr = false;
    } else {
      const regrex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
      if (!regrex.test(email.value.trim())) {
        errorMessage(email, 'is not valid');
        nameErr = false;
      } else {
        successMessage(email);
        nameErr = true;
      }
    }

    if (stateOfOrigin.value === 'Choose...') {
      errorMessage(stateOfOrigin, 'is required');
      countryErr = false;
    } else {
      nameErr = true;
    }

    if (password.value.trim() === '') {
      errorMessage(password, 'is required');
     nameErr = false;
    } else {
      const regex = new RegExp('hicad+[0-9]{3,3}');
      if (!regex.test(password.value.trim())) {
        errorMessage(password, 'is not valid');
       nameErr = false;
      } else {
        successMessage(password);
       nameErr = true;
      }
    }

    if (confirmPassword.value.trim() === '') {
      errorMessage(confirmPassword, 'is required');
     nameErr = false;
    } else if (confirmPassword.value.trim() != password.value.trim()) {
      errorMessage(confirmPassword, 'do not match');
     nameErr = false;
    } else {
      successMessage(confirmPassword);
     nameErr = true;
    }
    if (city.value.trim() === '') {
      errorMessage(city, 'is required');
      nameErr = false;
    }
    else {
      const regrex = /^[a-zA-Z]+$/;
      if (!regrex.test(city.value.trim())) {
        errorMessage(city, 'is not valid');
        nameErr = false;
      } else {
        successMessage(city);
        nameErr = true;
      }
    }
    if (postCode.value.trim() === '') {
      errorMessage(postCode, 'is required');
      nameErr = false;
    }
    else {
      const regrex = /^[a-zA-Z]+$/;
      if (!regrex.test(postCode.value.trim())) {
        errorMessage(postCode, 'is not valid');
        nameErr = false;
      } else {
        successMessage(postCode);
        nameErr = true;
      }
    }
    if (address.value.trim() === '') {
      errorMessage(address, 'is required');
      nameErr = false;
    }
    else {
      const regrex = /^[a-zA-Z]+$/;
      if (!regrex.test(address.value.trim())) {
        errorMessage(address, 'is not valid');
        nameErr = false;
      }
      if( address.value.length !== 10 && address.value.length !== 30 ){
        errorMessage(address, 'address should be atleast 10 character');
        nameErr = false;
      } else {
        successMessage(address);
        nameErr = true;
      }
    }
    if (maritalStatue.value.trim() === '') {
      errorMessage(maritalStatue, 'is required');
      nameErr = false;
    }
    else {
        successMessage(maritalStatue);
        nameErr = true;
      }

      if (emergencyContact.value.trim() === '') {
        errorMessage(emergencyContact, 'is required');
        nameErr = false;
      }
      else {
        const regrex = /^[a-zA-Z]+$/;
        if (!regrex.test(emergencyContact.value.trim())) {
          errorMessage(emergencyContact, 'is not valid');
          nameErr = false;
        } else {
          successMessage(emergencyContact);
          nameErr = true;
        }
      }
      if (postCode.value.trim() === '') {
        errorMessage(postCode, 'is required');
        nameErr = false;
      }
      else {
        const regrex = /^[a-zA-Z]+$/;
        if (!regrex.test(postCode.value.trim())) {
          errorMessage(postCode, 'is not valid');
          nameErr = false;
        } else {
          successMessage(postCode);
          nameErr = true;
        }
      }
      

      if (position.value.trim() === '') {
        errorMessage(position, 'is required');
        nameErr = false;
      }
      else {
          successMessage(position);
          nameErr = true;
        }
      
      if (startDate.value === '') {
        errorMessage(startDate, 'is required');
        nameErr = false;
      }
      else {
        successMessage(startDate);
        nameErr = true;
      }
     
    
    //prettier-ignore
    if(nameErr === true ){
      return true;
    }
    else{
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
    if (validateForm()) {
      sendDataToFirebase(form);
    }
  });

  const sendDataToFirebase = (formElement) => {
    const firstName = formElement.querySelector('.first-name').value;
    const lastName = formElement.querySelector('.last-name').value;
    const middleName = formElement.querySelector('.middle-name').value;
    const gender = formElement.querySelector('.gender:checked').value;
    const age = formElement.querySelector('.age').value;
    const email = formElement.querySelector('.email').value;
    const stateOfOrigin = formElement.querySelector('.stateOfOrigin').value;
    const password = formElement.querySelector('.password').value;
    const confirmPassword = formElement.querySelector('.confirmPassword').value;
    const address = formElement.querySelector(".address");
    const city = formElement.querySelector(".city");
    const postCode = formElement.querySelector(".postCode");
    const maritalStatue = formElement.querySelector(".marital-status");
    const emergencyContact = formElement.querySelector(".emergency-contact-name");
    const position = formElement.querySelector(".position");
    const startDate = formElement.querySelector(".start-date")


    //prettier-ignore
    const data = {
     firstName : firstName,
     lastName : lastName,
     middleName : middleName,
     gender : gender,
     age:age,
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
     startDate:startDate
    }
    writeUserData(data);
  };
}
init();
