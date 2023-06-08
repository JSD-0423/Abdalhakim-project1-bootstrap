import { fetchApi } from './utils.js';
import { createCourse } from './card.js';

import {
  body,
  toggleTheme,
  darkTheme,
  lightTheme,
  spinner,
  topicsNumber,
  errorMessage,
} from './constants.js';

// toggleTheme
const themeValue = localStorage.getItem('theme') || 'light';
body.classList.add(themeValue);

if (body.classList.contains('dark')) {
  darkTheme.classList.remove('d-sm-inline');
  lightTheme.classList.add('d-sm-inline');
} else {
  darkTheme.classList.add('d-sm-inline');
  lightTheme.classList.remove('d-sm-inline');
}

toggleTheme.addEventListener('click', (e) => {
  if (!body.classList.contains('dark')) {
    body.classList.add('dark');
    localStorage.setItem('theme', 'dark');

    darkTheme.classList.remove('d-sm-inline');
    lightTheme.classList.add('d-sm-inline');
  } else {
    localStorage.setItem('theme', 'light');
    body.classList.remove('dark');

    darkTheme.classList.add('d-sm-inline');
    lightTheme.classList.remove('d-sm-inline');
  }
});

let error = false;
let topics = null;

if (!topics) {
  spinner.classList.remove('d-none');
  spinner.classList.add('d-flex');
}

topics = await fetchApi('https://tap-web-1.herokuapp.com/topics/list');

if (typeof topics === 'string') error = true;

if (topics && !error) {
  spinner.classList.add('d-none');
  spinner.classList.remove('d-flex');
  createCourse(topics);
  topicsNumber.textContent = topics.length;
} else if (error) {
  spinner.classList.add('d-none');
  errorMessage.classList.remove('d-none');
  errorMessage.classList.add('d-flex');
}
