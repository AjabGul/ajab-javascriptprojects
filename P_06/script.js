const toggle = document.getElementById('toggle');
const open = document.getElementById('open');
const close = document.getElementById('close');
const modal = document.getElementById('modal');

// Event Listeners
// 1. show the navigation bar upon clicking on toggle bar
toggle.addEventListener('click', () => 
    document.body.classList.toggle('show-nav')
);

// 2. show form upon clicking the apply button
open.addEventListener('click', () =>
    modal.classList.add('show-modal')
);

// 3. Close the form by clicking close button
close.addEventListener('click', () => 
    modal.classList.remove('show-modal')
);

// 4. Close the Modal on Click Outside Modal
window.addEventListener('click', e => 
    e.target === modal ? modal.classList.remove('show-modal') : false
);