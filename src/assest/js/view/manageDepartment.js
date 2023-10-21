import 'core-js/stable';
import 'regenerator-runtime/runtime.js';
import DataTable from 'datatables.net-bs5';
import { app } from '../modal/firebaseConfig';
import data from '../../../data.json';
import { getDatabase, ref, onValue } from 'firebase/database';
import {
  editDepartmentData,
  deleteDepartmentData,
} from '../modal/departmentService';

const editModal = document.querySelector('.edit-modal');
const overlay = document.querySelector('.overlay');

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
const tableElement = document.querySelector('#myTable');
//renderItem in the table
const btnEditIcon = `<button type="button"class="edit-btn"><svg
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
    { data: 'Employee' },
    { data: 'Department' },
    { data: 'Position' },
    { data: 'JobType' },
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
const renderDepartment = () => {
  let uniqueKey = [];
  let dataArr = [];
  const db = getDatabase(app);
  const getItem = ref(db, 'department');
  onValue(getItem, (snapshot) => {
    snapshot.forEach((childSnaphot) => {
      const data = childSnaphot.val();
      const id =
        childSnaphot.key.charAt(0).toUpperCase() + childSnaphot.key.slice(1);
      //prettier-ignore
      const { employeeName, departmentName, employeePosition,jobType} = data;

      //prettier-ignore
      if (!uniqueKey.includes(id)) {
        dataArr.push({
          id: id,
          Employee: employeeName,
          Department:departmentName,
          Position:employeePosition,
          JobType:jobType,
        });
        uniqueKey.push(id);
      }
      table.clear();
      table.rows.add(dataArr);
      table.draw();
    });
  });
};
renderDepartment();
const editEmployee = () => {
  tableElement.querySelector('tbody').addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.closest('.edit-btn')) {
      const row =
        e.target.closest('.edit-btn').parentElement.parentElement.parentElement;
      const id = row.children[0].innerText;
      const employeeName = row.children[1].innerText;
      const department = row.children[2].innerText;
      const position = row.children[3].innerText;
      const jobType = row.children[4].innerText;
      renderItemOnEditModal(id, employeeName, department, position, jobType);
    }
  });
};
editEmployee();
const renderItemOnEditModal = (
  id,
  employeeName,
  department,
  position,
  jobType
) => {
  let temp = [];
  const details = {
    id: id,
    employeeName,
    department,
    position,
    jobType,
  };
  if (temp.length > 0) {
    temp = [];
  }
  temp.push(details);
  temp.forEach((data) => {
    const html = `  <div class="modal" data-id = ${id}>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Department</h5>
            <span class="close">&times;</span>
          </button>
        </div>
        <div class="modal-body">
         <form action="" autocomplete="off">
           <div class="col">
             <label for="employee">
               Employee
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
         </svg>
             </label>
             <select class="employee-name" required> 
               <option value="${data.employeeName}" selected> ${data.employeeName}</option>
              
              </select>
             <small></small>
           </div>
           <div class="col">
             <label for="department">
               Department
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
             </svg>
             </label>
              <select class="department-name" required> 
               <option value="" selected>Select..</option>
              </select>
             <small></small>
           </div>
           <div class="col">
             <label for="position">
               Position
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
             </svg>
             </label>
            <select class="employee-position" required>
             <option value=""selected>Select..</option>
            </select>
             <small></small>
           </div>
           <div class="col">
             <label for="department">
               Job Type
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
             </svg>
             </label>
            <select class="job-type" required>
             <option value="" selected>Select..</option>
            </select>
             <small></small>
           </div>
           <button type="submit" class="submit-btn">Update</button>
         </form>
        </div>
      </div>
    </div>
  </div>`;
    editModal.insertAdjacentHTML('beforeend', html);
    overlay.style.display = 'block';
    const formUpdate = document.querySelector('form');
    formUpdate.addEventListener('submit', validateForm);
    formUpdate.setAttribute('novalidate', '');
    editModal.querySelector('.close').addEventListener('click', closeModal);
    dataFunction(formUpdate);
    document.querySelector('html').style.overflowY = 'hidden';
  });
};

//validations
const validateForm = (e) => {
  e.preventDefault();
  const targetElement = e.target;
  if (validate(targetElement)) {
    sendEmployeeDepartmentData(targetElement);
  }
};
const validate = (form) => {
  const selectInput = form.querySelectorAll('select');
  let selectError = true;
  selectInput.forEach((input) => {
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

const sendEmployeeDepartmentData = (formElement) => {
  const id = document.querySelector('.modal').dataset.id;
  const employeeName = formElement.querySelector('.employee-name').value;
  const departmentName = formElement.querySelector('.department-name').value;
  const position = formElement.querySelector('.employee-position').value;
  const jobType = formElement.querySelector('.job-type').value;

  const data = {
    employeeName: employeeName,
    departmentName: departmentName,
    employeePosition: position,
    jobType: jobType,
  };
  const submitBtn = document.querySelector('.submit-btn');
  submitBtn.innerHTML = 'Processing...';
  editDepartmentData(id, data);
};
//delete employee
const deleteEmployee = () => {
  tableElement.querySelector('tbody').addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.closest('.delete-btn')) {
      const row =
        e.target.closest('.delete-btn').parentElement.parentElement
          .parentElement;
      const id = row.children[0].innerText;
      deleteDepartmentData(id);
    }
  });
};
deleteEmployee();

const dataFunction = function (form) {
  const departmentName = form.querySelector('.department-name');
  departmentName.disabled = false;
  const position = form.querySelector('.employee-position');
  position.disabled = true;
  const jobType = form.querySelector('.job-type');
  jobType.disabled = true;
  form.querySelectorAll('select').forEach((select) => {
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

//close edit modal
const closeModal = () => {
  editModal.querySelector('.modal').remove();
  overlay.style.display = 'none';
  temp = [];
  document.querySelector('html').style.overflowY = 'visible';
};
