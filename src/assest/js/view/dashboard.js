const user = document.querySelector(".info")
const logoutModal = document.querySelector(".logout-modal").querySelector(".modal");
user.addEventListener("click",() =>{
   if(logoutModal.style.display === "block"){
    logoutModal.style.display = "none";
   }
   else{
    logoutModal.style.display = "block";
   }
})