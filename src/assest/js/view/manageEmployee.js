import 'core-js/stable';
import 'regenerator-runtime/runtime.js';
import DataTable from 'datatables.net-bs5';
import { app } from '../modal/firebaseConfig';
import { ref, getDatabase, onValue } from 'firebase/database';

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

let temp = [];
const tableElement = document.querySelector('#myTable');
//renderItem in the table
const btnEditIcon = `<button type="button"class="edit-btn"><svg
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
  let dataArr = [];
  const db = getDatabase(app);
  const getItem = ref(db, 'employee');
  onValue(getItem, (snapshot) => {
    snapshot.forEach((childSnaphot) => {
      const data = childSnaphot.val();
      const id = snapshot.key;
      //prettier-ignore
      const {imageUrl, firstName, lastName,gender, Dob, email, stateOfOrigin,startDate} = data;
      //prettier-ignore
      const firstname = firstName.charAt(0).toUpperCase() + firstName.slice(1);
      const lastname = lastName.charAt(0).toUpperCase() + lastName.slice(1);
      const birthDate = Dob.split('/');
      const birthFormat = `${birthDate[0]}-${birthDate[1]}-${birthDate[2]}`;
      const filePath = imageUrl.split('\\');
      const filenameAndExtension = filePath[2];
      dataArr.push({
        id: id,
        photo: `<img src=${filenameAndExtension} alt="Photo">`,
        fullname: firstname + ' ' + lastname,
        gender: gender.charAt(0).toUpperCase() + gender.slice(1),
        DOB: birthFormat,
        state: stateOfOrigin.charAt(0).toUpperCase() + stateOfOrigin.slice(1),
        startDate: startDate,
        email: email.charAt(0).toUpperCase() + email.slice(1),
      });
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
      alert('working');
      const row =
        e.target.closest('.edit-btn').parentElement.parentElement.parentElement;
      const id = row.children[0].innerText;
      const name = row.children[1].innerText;
      const gender = row.children[2].innerText;
      const age = row.children[3].innerText;
      const state = row.children[4].innerText;
      const email = row.children[5].innerText;
    }
  });
};
editEmployee();
