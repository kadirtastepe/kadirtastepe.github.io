const toggle = document.getElementById('toggleDark');
const body = document.querySelector('body');
const polaroids = document.querySelectorAll('.polaroid'); // Select all elements with class "polaroid"

toggle.addEventListener('click', function(){
    this.classList.toggle('bi-moon');
    if(this.classList.toggle('bi-brightness-high-fill')){
        body.style.backgroundSize = 'Cover'; // Make sure the background covers the body
        body.style.background = 'url("pics/background.png") no-repeat center center fixed'; // Set the PNG background
        body.style.backgroundSize = 'Cover'; // Make sure the background covers the body
        body.style.color = 'black';
        // Change color for .polaroid elements
        polaroids.forEach(element => {
            element.style.color = 'black';
        });
        body.style.transition = '1s';
    }else{
        body.style.backgroundSize = 'Cover'; // Make sure the background covers the body
        body.style.background = 'url("pics/negative.png" no-repeat center center fixed)'; // Set the PNG background
        body.style.backgroundSize = 'Cover'; // Make sure the background covers the body
        body.style.color = 'white';
        // Change color for .polaroid elements
        polaroids.forEach(element => {
            element.style.color = 'black';
        });
        body.style.transition = '1s';
    }
});

function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
