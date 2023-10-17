import 'core-js/stable';
import 'regenerator-runtime/runtime.js';
import DataTable from 'datatables.net-bs5';
import { app } from '../modal/firebaseConfig';
import { getDatabase, onValue, ref } from 'firebase/database';
import { editEmployeeData } from '../modal/EmployeeService';

//logout
const user = document.querySelector('.info');
const editModal = document.querySelector('.edit-modal');
const overlay = document.querySelector('.overlay');
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

const tableElement = document.querySelector('#myTable');
//renderItem in the table
const btnEditIcon = `<button type="button"class="edit-btn" data-toggle="model" data-target="#editModal"><svg
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  fill="currentColor"
  class="bi bi-pencil-square"
  viewBox="0 0 16 16">
  <path
    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
  />
  <path
    fill-rule="evenodd"
    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
  />
</svg> </button>`;
const btnDeleteIcon = `<button type="button"class="delete-btn"><svg
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  fill="currentColor"
  class="bi bi-trash"
  viewBox="0 0 16 16"
>
  <path
    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
  />
  <path
    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
  />
</svg></button>`;

const actionBtn = `<span class="action-button">
${btnEditIcon + ' ' + btnDeleteIcon}</span>`;
let table = new DataTable(tableElement, {
  pageLength: 5,
  columns: [
    { data: 'id' },
    { data: 'photo' },
    { data: 'fullname' },
    { data: 'gender' },
    { data: 'DOB' },
    { data: 'state' },
    { data: 'startDate' },
    { data: 'email' },
    { data: `${actionBtn}` },
  ],
  lengthMenu: [
    [5, 20, 30, -1],
    [5, 10, 20, 30, 40, 50],
  ],
  columnDefs: [
    {
      target: [0],
      visible: true,
    },
    {
      target: -1,
      defaultContent: `${actionBtn}`,
    },
  ],
});
const renderEmployee = () => {
  let uniqueKey = [];
  let dataArr = [];
  const db = getDatabase(app);
  const getItem = ref(db, 'employee');
  onValue(getItem, (snapshot) => {
    snapshot.forEach((childSnaphot) => {
      const data = childSnaphot.val();
      const id = childSnaphot.key;
      //prettier-ignore
      const {imageUrl, firstName, lastName,gender, Dob, email, stateOfOrigin,startDate} = data;
      //prettier-ignore
      const firstname = firstName.charAt(0).toUpperCase() + firstName.slice(1);
      const lastname = lastName.charAt(0).toUpperCase() + lastName.slice(1);
      const birthDate = Dob.split('/');
      const birthFormat = `${birthDate[0]}-${birthDate[1]}-${birthDate[2]}`;

      if (!uniqueKey.includes(id)) {
        dataArr.push({
          id: id,
          photo: `<img src="${imageUrl}"alt="Photo">`,
          fullname: firstname + ' ' + lastname,
          gender: gender.charAt(0).toUpperCase() + gender.slice(1),
          DOB: birthFormat,
          state: stateOfOrigin.charAt(0).toUpperCase() + stateOfOrigin.slice(1),
          startDate: startDate,
          email: email.charAt(0).toUpperCase() + email.slice(1),
        });
        uniqueKey.push(id);
      }
      table.clear();
      table.rows.add(dataArr);
      table.draw();
    });
  });
};
renderEmployee();

const editEmployee = () => {
  tableElement.querySelector('tbody').addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.closest('.edit-btn')) {
      const row =
        e.target.closest('.edit-btn').parentElement.parentElement.parentElement;
      const id = row.children[0].innerText;
      const name = row.children[2].innerText;
      const gender = row.children[3].innerText;
      const dob = row.children[4].innerText;
      const state = row.children[5].innerText;
      const stateDate = row.children[6].innerText;
      const email = row.children[7].innerText;
      renderItemOnEditModal(id, name, gender, dob, state, stateDate, email);
    }
  });
};
const renderItemOnEditModal = (
  id,
  name,
  gender,
  dob,
  state,
  startDate,
  email
) => {
  let temp = [];
  const details = {
    id: id,
    name: name,
    gender: gender,
    dob: dob,
    state: state,
    startDate: startDate,
    email: email,
  };
  if (temp.length > 0) {
    temp = [];
  }
  temp.push(details);
  temp.forEach((data) => {
    const firstName = data.name.split(' ')[0];
    const lastName = data.name.split(' ')[1];
    const genderCheck = data.gender;
    let maleCheck;
    let femaleCheck;
    let maleCheckValue;
    let femaleCheckValue;
    const html = ` <div class="modal" data-id = ${data.id}>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Edit Employee</h5>
            <span aria-hidden="true" class="close">&times;</span>
        </div>
        <div class="modal-body">
           <form autoComplete="off">
           <div class="col">
            <label for="fname">Firstname<svg
              xmlns="http://www.w3.org/2000/svg"
              width="5" 
              height="5"
              fill="currentColor"
              class="bi bi-asterisk"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z"
              /></svg
          ></label>
           <input type="text" placeholder="Firstname" value=${firstName} class="firstname">
            <small></small>
            </div>
            <div class="col">
            <label for="fname">Lastname<svg
              xmlns="http://www.w3.org/2000/svg"
              width="5" 
              height="5"
              fill="currentColor"
              class="bi bi-asterisk"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z"
              /></svg
          ></label>
           <input type="text" placeholder="Lastname" value=${lastName} class="lastname">
            <small></small>
            </div>
            <div class="col">
            <label for="Gender">Gender<svg
              xmlns="http://www.w3.org/2000/svg"
              width="5" 
              height="5"
              fill="currentColor"
              class="bi bi-asterisk"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z"
              /></svg
          ></label>
          <div class="gender-content" name="gender">
          <input
          type="radio"
          name="gender"
          value="${data.gender}"checked
          class="gender"
        /><label for="male">male</label>
        <input
          type="radio"
          name="gender"
          value="${data.gender}" ${femaleCheck}
          class="gender"
          required
        /><label for="female">female</label>
      </div>
      <small></small>
      </div>

      <div class="col">
      <label for="age"
      >Date of Birth
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="5"
        fill="currentColor"
        class="bi bi-asterisk"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z"
        /></svg
    ></label>

    <input
      type="text"
      class="dob"
      placeholder="DD/MM/YYYY"
      required
      value=${data.dob}
    />
    <small></small>
    </div>

    <div class="col">
    <label for="state"
      >State of Origin
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5"
        height="5"
        fill="currentColor"
        class="bi bi-asterisk"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z"
        /></svg
    ></label>
    <select name="state of origin" class="stateOfOrigin" required>
      <option value=${data.state}>${data.state}</option>
      <option value="Abia">Abia</option>
      <option value="Adamawa">Adamawa</option>
      <option value="Akwa ibom">Akwa ibom</option>
      <option value="Anambra">Anambra</option>
      <option value="Bauchi">Bauchi</option>
      <option value="Bayelsa">Bayelsa</option>
      <option value="Benue">Benue</option>
      <option value="Borno">Borno</option>
      <option value="Cross river">cross river</option>
      <option value="Delta">Delta</option>
      <option value="Ebonyi">Ebonyi</option>
      <option value="Edo">Edo</option>
      <option value="Ekiti">Ekiti</option>
      <option value="Enugu">Enugu</option>
      <option value="Gombe">Gombe</option>
      <option value="Imo">Imo</option>
      <option value="Jigawa">Jigawa</option>
      <option value="Kaduna">Kaduna</option>
      <option value="Kano">Kano</option>
      <option value="Katstina">Katstina</option>
      <option value="Kebbi">Kebbi</option>
      <option value="Kogi">Kogi</option>
      <option value="Kwara">Kwara</option>
      <option value="Lagos">Lagos</option>
      <option value="Nasarawa">Nasarawa</option>
      <option value="Niger">Niger</option>
      <option value="Ogun">Ogun</option>
      <option value="Ondo">Ondo</option>
      <option value="Osun">Osun</option>
      <option value="Oyo">Oyo</option>
      <option value="Plateau">Plateau</option>
      <option value="River">River</option>
      <option value="Sokoto">Sokoto</option>
      <option value="Taraba">Taraba</option>
      <option value="Yobe">Yobe</option>
      <option value="Zamfara">Zamfara</option>
      <option value="Fct">Fct</option>
    </select>

    <small></small>
    </div>
    <div class="col">
    <label for="start-date"> Start Date
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="5"
      fill="currentColor"
      class="bi bi-asterisk"
      viewBox="0 0 16 16"
    >
      <path
        d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z"
      />
    </svg></label>
    <input type="date" class="start-date" required value=${data.startDate} />
    <small></small>
</div>

     <div class="col">
    <label for="email"
    >Email address
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="5"
      fill="currentColor"
      class="bi bi-asterisk"
      viewBox="0 0 16 16"
    >
      <path
        d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z"
      /></svg
  ></label>
  <input
    type="email"
    class="email"
    name="Email address"
    placeholder="Email Address"
    required
    value=${data.email}
  />
  <small></small>
  </div>

  <button type="submit" class="submit-btn">Submit</button>
          </form>
        </div>
         
      </div>
    </div>
  </div>`;
    document.querySelector('html').style.overflowY = 'hidden';
    editModal.insertAdjacentHTML('beforeend', html);
    editModal.querySelector('.modal').style.display = 'block';
    overlay.style.display = 'block';
    const formUpdate = document.querySelector('form');
    formUpdate.setAttribute('novalidate', '');
    formUpdate.addEventListener('submit', validateUpdateForm);
  });
};
editEmployee();

const validateUpdateForm = (e) => {
  e.preventDefault();
  const targetElement = e.target;
  if (validateForm(targetElement)) {
    updateEmployee(targetElement);
  }
};
const validateForm = (element) => {
  console.log(element);
  const firstname = element.querySelector('.firstname');
  console.log(firstname);
  const lastname = element.querySelector('.lastname');
  const genderParent = element.querySelector('.gender-content');
  const gender = genderParent.querySelectorAll('.gender');
  const dob = element.querySelector('.dob');
  const state = element.querySelector('.stateOfOrigin');
  const startDate = element.querySelector('.start-date');
  const email = element.querySelector('.email');

  //prettier-ignore
  let nameErr =  genderError = dobErr = emailErr = stateError = startDateError = true;
  if (firstname.value.trim() === '') {
    errorMessage(firstname, 'is required');
    nameErr = false;
  } else {
    const regrex = /^[a-zA-Z]+$/;
    if (!regrex.test(firstname.value.trim())) {
      errorMessage(firstname, 'is not valid');
      nameErr = false;
    } else {
      successMessage(firstname);
      nameErr = true;
    }
  }
  if (lastname.value.trim() === '') {
    errorMessage(lastname, 'is required');
    nameErr = false;
  } else {
    const regrex = /^[a-zA-Z]+$/;
    if (!regrex.test(lastname.value.trim())) {
      errorMessage(lastname, 'is not valid');
      nameErr = false;
    } else {
      successMessage(lastname);
      nameErr = true;
    }
  }
  if (gender[0].checked === false && gender[1].checked === false) {
    errorMessage(genderParent, 'is required');
    genderError = false;
  } else {
    successMessage(genderParent);
    genderError = true;
  }
  //Get the date from the TextBox.
  const regex = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;
  const parts = dob.value.split('/');
  const dtDOB = new Date(parts[1] + '/' + parts[0] + '/' + parts[2]);
  const dtCurrent = new Date();
  //Check whether valid dd/MM/yyyy Date Format.
  if (dob.value.trim() === '') {
    errorMessage(dob, 'is required');
    dobErr = false;
  } else if (dtCurrent.getFullYear() - dtDOB.getFullYear() < 18) {
    errorMessage(dob, 'Eligibility 18 years ONLY.');
    dobErr = false;
  } else {
    successMessage(dob);
    dobErr = true;
  }
  if (email.value.trim() === '') {
    errorMessage(email, 'is required');
    emailErr = false;
  } else {
    const regrex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    if (!regrex.test(email.value.trim())) {
      errorMessage(email, 'is not valid');
      emailErr = false;
    } else {
      successMessage(email);
      emailErr = true;
    }
  }

  if (state.value === 'Choose...') {
    errorMessage(state, 'is required');
    stateError = false;
  } else {
    successMessage(state);
    stateError = true;
  }
  if (startDate.value === '') {
    errorMessage(startDate, 'is required');
    startDateError = false;
  } else {
    successMessage(startDate);
    startDateError = true;
  }

  if (
    nameErr &&
    genderError &&
    dobErr &&
    emailErr &&
    stateError &&
    startDateError === true
  ) {
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
const updateEmployee = (formElement) => {
  const id = document.querySelector('.modal').dataset.id;
  const firstName = formElement.querySelector('.firstname').value;
  const lastName = formElement.querySelector('.lastname').value;
  const gender = formElement.querySelector('.gender:checked').value;
  const Dob = formElement.querySelector('.dob').value;
  const email = formElement.querySelector('.email').value;
  const stateOfOrigin = formElement.querySelector('.stateOfOrigin').value;
  const startDate = formElement.querySelector('.start-date').value;
  console.log(gender);
  const data = {
    firstName: firstName,
    lastName: lastName,
    gender: gender,
    Dob: Dob,
    email: email,
    stateOfOrigin: stateOfOrigin,
    startDate: startDate,
  };

  // const submitBtn = formElement.querySelector('.submit-btn');
  // submitBtn.innerText = 'Processing...';
  // editEmployeeData(id, data, submitBtn);
};
