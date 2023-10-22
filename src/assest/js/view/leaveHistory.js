import 'core-js/stable';
import 'regenerator-runtime/runtime.js';
import DataTable from 'datatables.net-bs5';
import { app } from '../modal/firebaseConfig';
import { getDatabase, ref, onValue } from 'firebase/database';

const tableElement = document.querySelector('#myTable');

//renderItem in the table
let table = new DataTable(tableElement, {
  pageLength: 5,
  columns: [
    { data: 'id' },
    { data: 'fullname' },
    { data: 'position' },
    { data: 'leaveType' },
    { data: 'appliedDate' },
    { data: 'approveDate' },
    { data: 'status' },
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
    },
  ],
});
const renderEmployee = () => {
  let uniqueKey = [];
  let dataArr = [];
  const db = getDatabase(app);
  const getItem = ref(db, 'leaveHistory');
  onValue(getItem, (snapshot) => {
    snapshot.forEach((childSnaphot) => {
      const data = childSnaphot.val();
      const id = childSnaphot.key;
      //prettier-ignore
      const {employeeName,position,leaveType,appliedDate,approveDate,leaveOption} = data;
      if (!uniqueKey.includes(id)) {
        //prettier-ignore
        dataArr.push({
          id: id,
          fullname: employeeName,
          position:position,
          leaveType:leaveType,
          appliedDate:appliedDate,
          approveDate:approveDate,
          status:leaveOption,
        });
        uniqueKey.push(id);
      }

      table.clear();
      table.rows.add(dataArr);
      table.draw();

      const tbody = tableElement.querySelector('tbody');
      const row = tbody.getElementsByTagName('tr');
      for (let index = 0; index < row.length; index++) {
        const cell = row[index].getElementsByTagName('td')[6];
        if (cell.innerText === 'Approve') {
          cell.style.color = 'green';
          cell.style.fontWeight = '500';
        } else {
          cell.style.color = 'red';
          cell.style.fontWeight = '500';
        }
      }
    });
  });
};
renderEmployee();

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
