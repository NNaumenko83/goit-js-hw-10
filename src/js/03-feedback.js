import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const inputEmail = document.querySelector('[name=email]');
const textarea = document.querySelector('[name=message]');

inputEmail.required = true;
textarea.required = true;

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

populateTexarea();

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
}

function populateTexarea() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    const parsedData = JSON.parse(savedData);
    Object.entries(parsedData).forEach(([name, value]) => {
      formData[name] = value;
      form.elements[name].value = value;
    });
  }
}
