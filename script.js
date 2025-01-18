const toggle = document.getElementById('toggleDark');
const body = document.querySelector('body');

toggle.addEventListener('click', function(){
    this.classList.toggle('bi-moon');
    if(this.classList.toggle('bi-brightness-high-fill')){
        body.style.background = 'url("pics/background.png")'; // Set the PNG background
        body.style.backgroundSize = 'Cover'; // Make sure the background covers the body
        body.style.background = 'url("pics/negative.png")'; // Set the PNG background
        body.style.backgroundSize = 'Cover'; // Make sure the background covers the body
        body.style.transition = '1s';
    }else{
        body.style.background = 'url("pics/background.png")'; // Set the PNG background
        body.style.backgroundSize = 'Cover'; // Make sure the background covers the body
        body.style.color = 'white';
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
