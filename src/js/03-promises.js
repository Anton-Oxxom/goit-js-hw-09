import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const delayEl = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
  });
}


formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  let delayPrm = Number(delayEl.value);

  for (let i = 1; i <= amountEl.value; i += 1) {
    createPromise(i, delayPrm).then(succes).catch(error);
    delayPrm += Number(stepEl.value);
  }
}



function succes(result) {
  Notiflix.Notify.success(result);
}

function error(error) {
  Notiflix.Notify.failure(error);
}