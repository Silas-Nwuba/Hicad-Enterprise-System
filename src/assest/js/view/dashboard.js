import 'core-js/stable';
import 'regenerator-runtime/runtime.js';
import { app } from '../modal/firebaseConfig';
import { getDatabase, ref, onValue } from 'firebase/database';

const totalEmployee = document.querySelector('.total-employee');
const totalDepartment = document.querySelector('.total-department');
const totalLeaveApplied = document.querySelector('.total-leave-applied');
const totalLeaveApprove = document.querySelector('.total-leave-approved');

let employeeTotal;
let departmentTotal;
let leaveApplied;
let leaveApprove;
const db = getDatabase(app);
const getEmployee = ref(db, 'employee');
onValue(getEmployee, (snapshot) => {
  snapshot.forEach((childSnaphot) => {
    employeeTotal = childSnaphot.key.length;
  });
  totalEmployee.innerHTML = employeeTotal;
});

const getDepartment = ref(db, 'department');
onValue(getDepartment, (snapshot) => {
  snapshot.forEach((childSnaphot) => {
    departmentTotal = childSnaphot.key.length;
  });
  totalDepartment.innerHTML = departmentTotal;
});

const getLeaveApplied = ref(db, 'leave');
onValue(getLeaveApplied, (snapshot) => {
  snapshot.forEach((childSnaphot) => {
    leaveApplied = childSnaphot.key.length;
  });
  totalDepartment.innerHTML = leaveApplied;
});

const getLeaveApprove = ref(db, 'leaveHistory');
onValue(getLeaveApprove, (snapshot) => {
  snapshot.forEach((childSnaphot) => {
    const { leaveOption } = childSnaphot.val();
    if (leaveOption === 'Approve') {
      leaveApprove = childSnaphot.key.length;
      totalDepartment.innerHTML = leaveApprove;
    }
  });
});

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
