// Wait for the HTML before executing JavaScript
document.addEventListener('DOMContentLoaded', function () {

     // selects all HTML elements with the tag name 'section' and stores them in the sections variable. 
    const sections = document.querySelectorAll('section');
  
    // Call the buildNavbar  fun -  navigation bar
    buildNavbar(sections);

    // Ascroll event listener to call the highlight fun active section 
    window.addEventListener('scroll', function () {
        highlightActiveSection(sections);
    });
});



  //----------------------------------------------------------------------------------


//  building the navigation bar 
function buildNavbar(sections) {

    // Get the navigation bar element
    const navbarList = document.getElementById('navbar__list');

    // Clear existing  item
    navbarList.innerHTML = '';


    // Iterate through each section to create an navigation link == list item with a link (<a>) for each section.

    sections.forEach(section => {
     
        const listItem = document.createElement('li');

                //It sets the innerHTMLto new list item to  HTML string.
        // Create a link with an href attribute pointing to the section and the appropriate class
       
        listItem.innerHTML = `<a href="#${section.id}" class="navbar__link">${section.dataset.nav}</a>`;
       
        navbarList.appendChild(listItem);

        //href="#${section.id}": creates a link that, when clicked, will scroll to the  section. The #${section.id} is a anchor link pointing to section ID.
       // For each iteration  loop, the content link will set to the value of[ data-nav] for section.
           //section.dataset.nav is accessing attribute of the section.
       // ex = <section id="section1" data-nav="Introduction">...</section>
    });

    // Highlight the active section 
    
    highlightActiveSection(sections);
}

  //------------------------------------------------------------------------------



  //scrolling to a  section  when the navigation link is clicked.
  function scrollToSection(event) {
   
    // ensures clicking link triggers only the custom scrolling behavior instead of navigating away.
    event.preventDefault();

    // Extract  the section id from the href in the  clicked link
    const targetId = event.target.getAttribute('href').slice(1);

    // section element
    const targetSection = document.getElementById(targetId);

    //  smooth scrolling 
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }



  //------------------------------------------------------------------------
  


  // highlight the active section
function highlightActiveSection(sections) {


    // Get all sections and navigation links
    const navbarLinks = document.querySelectorAll('.navbar__link');

    // Get the index of the section currently in the viewport
    let activeSectionIndex = -1; // no section 
   
    //iterates through each section to determine if it is currently in the viewport by checking its position relative to the viewport using getBoundingClientRect().
   //loop iterates through each section 
    sections.forEach((section, index) => {

     //calculates the position of each section relative to the viewport.

        const rect = section.getBoundingClientRect();
         //This method returns an object with properties ==  top, right, bottom, left, width, and height of the position.
                //checks  top of the section is above the viewport ? (i.e., rect.top >= 0) and if the bottom of the section is below the viewport (i.e., rect.bottom <= window.innerHeight). If both conditions are true, the section is considered to be in the viewport.
     
     
                //If a section is in the viewport, its index is stored in the activeSectionIndex variable.
                //viewport position are in = window.innerHeight and window.innerWidth. 
       const isInViewport = rect.top >= 0 
       && rect.bottom <= window.innerHeight;

        if (isInViewport) {
            activeSectionIndex = index;
        }
    });

    // Remove 'active' class from all links
    navbarLinks.forEach(link => link.classList.remove('active'));

    // Add 'active' class to the link corresponding to the active section
    if (activeSectionIndex !== -1) {
        navbarLinks[activeSectionIndex].classList.add('active');
    }
}




  //-----------------------------------------------------------------------------


  // Function to scroll to the top of the page when the "Top" button is clicked
  function scrollToTop() {
    console.log('Scrolling to top');
  window.scrollTo({ top: 0, behavior: 'smooth' });
   
  }
  