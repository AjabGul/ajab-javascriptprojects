const togglebtn = document.getElementById('togglebtn');
const navbarLinks = document.getElementById('navbar-links');


togglebtn.addEventListener('click', ()=>{
    navbarLinks.classList.toggle('active')
});