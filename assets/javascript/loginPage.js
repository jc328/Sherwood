
window.addEventListener('DOMContentLoaded', e => {

  let demo = document.querySelector('.demo')
  let i=0;
  let k=0;
  let spd = 75;
  let txt = 'SchroogeMcDuck@gmail.com'
  let pwd = 'myMoneyBin2020'

  demo.addEventListener('click', (e => {
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

  // const bcrypt = require('../node_modules/bcrypt')
  // const saltRounds = 10;
  // let password = 'my test password';
  // let fakePassword = 'blackhat';

  // bcrypt.genSalt(saltRounds, function(err, salt) {
  //   bcrypt.hash(password, salt, function(err, hash) {
  //     console.log(hash)
    // })


  // const crypto = require('crypto');
  // console.log(crypto.getHashes());

  // const util = require('util');
  // const salter = util.promisify(crypto.randomBytes);
  // const hasher = util.promisify(crypto.pbkdf2);

  // (async () => {
  //   const salt = await salter(64);
  //   const hashedPwd = await hasher (
  //     password,
  //     salt,
  //     10000,
  //     64,
  //     'sha256'
  //   )
  //   const salts = salt.toString('base64');
  //   const pwds = hashedPwd.toString('base64');
  //   console.log('salt:', salts, 'password:', pwds)
  // })
