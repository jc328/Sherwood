
window.addEventListener('DOMContentLoaded', e => {

  let demo = document.querySelector('.demo')
  let i=0;
  let k=0;
  let spd = 50;
  let txt = 'SchroogeMcDuck@gmail.com'
  let pwd = 'myMoneyBin2020'

  demo.addEventListener('click', (e => {
    document.querySelector('.emailDemo').value = ''
    document.querySelector('.passwordDemo').value = ''
    typeEmail()
    setTimeout(typePassword, spd*txt.length)
  }))

  function typeEmail() {
    if (i < txt.length) {
      let email = document.querySelector('.emailDemo')
      email.value += txt.charAt(i);
      i++
      setTimeout(typeEmail, spd);
    }
  }
  function typePassword() {
    if (k < pwd.length) {
      let password = document.querySelector('.passwordDemo')
      password.value += pwd.charAt(k);
      k++;
      setTimeout(typePassword, spd);
    }
    // document.querySelector('.signIn').click()
  }
});
