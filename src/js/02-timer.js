import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('button[data-start]');
let inputEl = document.querySelector('#datetime-picker');
let interval = null;
let selectDate = Date.now();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectDate = selectedDates[0];
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.setAttribute('disabled', true);
    } else {
      btnStart.removeAttribute('disabled', '');
    }
  },
};

btnStart.addEventListener('click', () => {
  btnStart.setAttribute('disabled', '');
  inputEl.setAttribute('disabled', '');
  interval = setInterval(timeOut, 1000);
});

function timeOut() {
  const getTimeComponents = selectDate - new Date();

  if (getTimeComponents <= 0) {
    Notiflix.Notify.success('Timer is Over!');
    clearInterval(interval);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(getTimeComponents);

  document.querySelector('span[data-days]').textContent = pad(days);
  document.querySelector('span[data-hours]').textContent = pad(hours);
  document.querySelector('span[data-minutes]').textContent = pad(minutes);
  document.querySelector('span[data-seconds]').textContent = pad(seconds);
}

function pad(value) {
  return String(value).padStart(2, 0);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr('input#datetime-picker', options);