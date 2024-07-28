const output = document.getElementById('result');

//creating popup
function popup(){
  output.style.display = 'flex';
  let popup = document.createElement('div');
  popup.innerHTML= `
  <div class= form-container>
    <p class="popup-title">Just one more step...</p>
    <p class="popup-subtitle">Complete the form to download your file<br> We promise we won't spam</p>
    <div id="cancel-popup-btn">&#x2715;</div>
    <form id="popup-form">
    
    <input class="popup-input" id="firstName" name="firstName" placeholder="First Name" required><br>
    
    <input class="popup-input" name="lastName" id="lastName" placeholder="Last Name" required><br>
    
    <input type="email" class="popup-input" placeholder="Email" name="email" required><br>
    <div class="popup-button-container"><br>
      <button type=submit id="popup-download-btn">Download Now</button>
    <div>
    </form>
  <div>
  `;
  output.appendChild(popup);
  uploadData()

  //fucntion to cancel the popup
  const cancelPopup = document.getElementById('cancel-popup-btn');
    cancelPopup.onclick = ()=>{
    output.innerHTML="";
    output.style.display = 'none';
  }
}


function uploadData(){

  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');

  //function to display the popup
  const form = document.getElementById('popup-form');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();

  //saving the cookie in cache for 2days

  setCookie('TES-First-Name', firstName.value, 365);
  setCookie('TES-Last-Name', lastName.value, 365);


  const formData = new FormData(form);
  //making a json object and uploading it
  const data = Object.fromEntries(formData);
  fetch('https://parental-score-card-app.onrender.com/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    success();
  })
  .catch(error => console.error(error));
  //download file
  function success(){
    console.log('file downloaded!')
    window.print();
    output.style.display = 'none';
    output.innerHTML="";
  }
  })
}

//cancelling the popup
function closePopup(){
  const cancelPopup = document.getElementById('cancel-popup-btn');
  cancelPopup.onclick = ()=>{
    popup.innerHTML=" "
  }
}


// popup();

