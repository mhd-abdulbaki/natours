/*eslint-disable */
const axios = require('axios');

const userDataForm = document.getElementById('profile');

const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

// *@Uesr Data Form

const userData = async (name, email) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://localhost:3000/api/v1/users/me',
      data: {
        name,
        email
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 500);
    }
  } catch (error) {
    console.log({ error });
    showAlert('error', error.response.data.message);
  }
};

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    console.log('clicked');
    e.preventDefault();
    const name = document.getElementById('profile-name').value;
    const email = document.getElementById('profile-email').value;

    console.log(name, email);

    userData(name, email);
  });
