import 'core-js/stable';
import 'regenerator-runtime/runtime.js';
import { app } from '../modal/firebaseConfig';
import { getDatabase, ref, onValue } from 'firebase/database';

const totalEmployee = document.querySelector('.total-employee');
const totalDepartment = document.querySelector('.total-department');
const totalLeaveApplied = document.querySelector('.total-leave-applied');
const totalLeaveApprove = document.querySelector('.total-leave-approve');
const totalLeaveDecline = document.querySelector('.total-leave-decline');
totalEmployee.innerHTML = 0;
totalDepartment.innerHTML = 0;
totalLeaveApplied.innerHTML = 0;
totalLeaveApprove.innerHTML = 0;
totalLeaveDecline.innerHTML = 0;

const db = getDatabase(app);
const getEmployee = ref(db, 'employee');
onValue(getEmployee, (snapshot) => {
  const employeeTotal = snapshot.size;
  if (+employeeTotal >= 1 && employeeTotal < 10)
    totalEmployee.innerHTML = `0${employeeTotal}`;
});

const getDepartment = ref(db, 'department');
onValue(getDepartment, (snapshot) => {
  const departmentTotal = snapshot.size;
  if (+departmentTotal >= 1 && departmentTotal < 10)
    totalDepartment.innerHTML = `0${departmentTotal}`;
});

const getLeaveApplied = ref(db, 'leave');
onValue(getLeaveApplied, (snapshot) => {
  const leaveApplied = snapshot.size;
  if (+leaveApplied >= 1 && leaveApplied < 10)
    totalLeaveApplied.innerHTML = `0${leaveApplied}`;
});

const getLeaveApprove = ref(db, 'leaveHistory');
onValue(getLeaveApprove, (snapshot) => {
  const approveArr = [];
  const declineArr = [];
  snapshot.forEach((childSnaphot) => {
    const { leaveOption } = childSnaphot.val();
    if (leaveOption === 'Approve') {
      approveArr.push(childSnaphot);
      const item = approveArr.length;
      if (+item >= 1 && item < 10) totalLeaveApprove.innerHTML = `0${item}`;
    }
    if (leaveOption === 'Decline') {
      declineArr.push(childSnaphot);
      const item = declineArr.length;
      if (+item >= 1 && item < 10) totalLeaveDecline.innerHTML = `0${item}`;
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
