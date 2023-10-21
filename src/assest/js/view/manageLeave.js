import 'core-js/stable';
import 'regenerator-runtime/runtime.js';
import DataTable from 'datatables.net-bs5';
import { app } from '../modal/firebaseConfig';
import { getDatabase, ref, onValue } from 'firebase/database';
import { deleteEmployeeData, editEmployeeData } from '../modal/EmployeeService';

const tableElement = document.querySelector('#myTable');
const viewDetailModal = document.querySelector('.view-detail');
const overlay = document.querySelector('.overlay');
//renderItem in the table
// const btnEditIcon = `<button type="button"class="decline-btn">Decline</button>`;
const approveBtn = `<button type="button"class="btn btn-info">View Details</button>`;
const actionBtn = `<span class="action-button">
${approveBtn}</span>`;
let table = new DataTable(tableElement, {
  pageLength: 5,
  columns: [
    { data: 'id' },
    { data: 'fullname' },
    { data: 'position' },
    { data: 'leaveType' },
    { data: 'appliedDate' },
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
      const {employeeName,position,leaveType,appliedDate,status} = data;
      //prettier-ignore
      if (!uniqueKey.includes(id)) {
        dataArr.push({
          id: id,
          fullname: employeeName,
          position:position,
          leaveType:leaveType,
          appliedDate:appliedDate,
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

const approveLeave = () => {
  tableElement.querySelector('tbody').addEventListener('click', (e) => {
    if (e.target.closest('.btn-info')) {
      const row =
        e.target.closest('.btn-info').parentElement.parentElement.parentElement;
      const id = row.children[0].innerText;
      sendApproveLeave(id);
    }
  });
};
approveLeave();
const sendApproveLeave = (id) => {
  const html = ` <div class="modal" data-id = ${id}>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">
          SET ACTION
        </h5>
        <span class="close">&times;</span>
      </div>
      <div class="modal-body">
        <form action="" autocomplete="off">
          <div class="col">
            <select>
              <option value="" selected>Choose..</option>
              <option value="Accept">Accept</option>
              <option value="Decline">Decline</option>
            </select>
            <small></small>
          </div>
          <div class="col">
            <input type="text" placeholder="Descripton" />
            <small></small>
          </div>
          <button type="button" class="btn btn-danger">Close</button>
          <button type="submit" class="btn btn-success">Apply</button>
        </form>
      </div>
    </div>
  </div>
</div>`;
  viewDetailModal.insertAdjacentHTML('beforeend', html);
  overlay.style.display = 'block';
  viewDetailModal.querySelector('.close').addEventListener('click', closeModal);
  viewDetailModal
    .querySelector('.btn-danger')
    .addEventListener('click', closeModal);
};

//close edit modal
const closeModal = () => {
  viewDetailModal.querySelector('.modal').remove();
  overlay.style.display = 'none';
  temp = [];
  document.querySelector('html').style.overflowY = 'visible';
};

///logout

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
