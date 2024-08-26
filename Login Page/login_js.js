const wrapper = document.querySelector('.wrapper');
const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.login-link');

const loginButton = document.querySelector('.login-button');
const iconClose = document.querySelector('.icon-close');


loginLink.addEventListener('click', ()=>{
    wrapper.classList.add('active');
});

registerLink.addEventListener('click', ()=>{
    wrapper.classList.remove('active');
});

loginButton.addEventListener('click', ()=>{
    wrapper.classList.add('active-open');
});

iconClose.addEventListener('click', ()=>{
    wrapper.classList.remove('active-open');
});