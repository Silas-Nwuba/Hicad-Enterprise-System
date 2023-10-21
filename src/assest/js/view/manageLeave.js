import 'core-js/stable';
import 'regenerator-runtime/runtime.js';
import DataTable from 'datatables.net-bs5';
import { app } from '../modal/firebaseConfig';
import { getDatabase, ref, onValue } from 'firebase/database';
import { deleteEmployeeData, editEmployeeData } from '../modal/EmployeeService';

const tableElement = document.querySelector('#myTable');
//renderItem in the table
const btnEditIcon = `<button type="button"class="decline-btn">Decline</button>`;
const btnDeleteIcon = `<button type="button"class="approve-btn">Approve</button>`;

const actionBtn = `<span class="action-button">
${btnEditIcon + ' ' + btnDeleteIcon}</span>`;
let table = new DataTable(tableElement, {
  pageLength: 5,
  columns: [
    { data: 'id' },
    { data: 'fullname' },
    { data: 'position' },
    { data: 'leaveType' },
    { data: 'leaveRequestFor' },
    { data: 'currentStatus' },
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
  const getItem = ref(db, 'leave');
  onValue(getItem, (snapshot) => {
    snapshot.forEach((childSnaphot) => {
      const data = childSnaphot.val();
      const id = childSnaphot.key;
      //prettier-ignore
      const {employeeName,position,leaveType,requestLeave,status} = data;
      //prettier-ignore
      if (!uniqueKey.includes(id)) {
        dataArr.push({
          id: id,
          fullname: employeeName,
          position:position,
          leaveType:leaveType,
          leaveRequestFor:requestLeave,
          currentStatus:status,
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

///logout
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
