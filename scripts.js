const logo = document.querySelector('.logo-container');

logo.addEventListener('click', () => {
  const paw = document.querySelector('.paw-icon');
  paw.style.transform = 'scale(1.1) rotate(15deg)';
  setTimeout(() => {
    paw.style.transform = 'scale(1)';
  }, 300);
  console.log("Logo clicked! 🐾");
});