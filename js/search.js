import { debounce, fetchApi } from './utils.js';
import { createCourse } from './card.js';
import {
  coursesContainer,
  searchTopicInput,
  sortSelect,
  filterSelect,
} from './constants.js';

let topics = await fetchApi('https://tap-web-1.herokuapp.com/topics/list');
const categories = [...new Set(topics.map((topic) => topic.category))];

// Create Filter Options
const createFilterOptions = (categories) => {
  categories.forEach((category) => {
    const option = document.createElement('option', { value: category });
    option.textContent = category;
    filterSelect.appendChild(option);
  });
};
createFilterOptions(categories);

searchTopicInput.addEventListener('input', debounce(applyFilters));
sortSelect.addEventListener('change', applyFilters);
filterSelect.addEventListener('change', applyFilters);

function applyFilters() {
  let topicsToFilter = topics;

  // Search Input
  const searchValue = searchTopicInput.value.toLowerCase();
  topicsToFilter = topics.filter((topic) =>
    topic.topic.toLowerCase().startsWith(searchValue)
  );

  // Sort By
  topicsToFilter = sortBy(topicsToFilter);

  // Filter By
  console.log(topicsToFilter);
  topicsToFilter = filterBy(topicsToFilter);

  // add to dom

  if (topicsToFilter.length) {
    coursesContainer.innerHTML = '';
    createCourse(topicsToFilter);
  } else {
    coursesContainer.innerHTML = 'No Items Found!';
  }
}

const sortBy = (topics) => {
  let topicsList = topics;
  const value = sortSelect.value;

  if (value === 'topic-title') {
    topicsList = topicsList.sort((a, b) => a.topic.localeCompare(b.topic));
  } else if (value === 'author-name') {
    topicsList = topicsList.sort((a, b) => a.name.localeCompare(b.name));
  } else if (value === 'default') {
    return topics;
  }

  return topicsList;
};

const filterBy = (topics) => {
  const value = filterSelect.value;

  if (value === 'default') {
    return topics;
  }

  return topics.filter((topic) => topic.category === value);
};

// // First Code
// let topicsList = topics;
// searchTopicInput.addEventListener(
//   'input',
//   debounce(() => {
//     const searchValue = searchTopicInput.value.toLowerCase();
//     topicsList = topics.filter((topic) =>
//       topic.topic.toLowerCase().startsWith(searchValue)
//     );

//     coursesContainer.innerHTML = '';
//     createCourse(topicsList);
//   })
// );

// sortSelect.addEventListener('change', () => {
//   const value = sortSelect.value;

//   if (value === 'topic-title') {
//     topicsList = topicsList.sort((a, b) => a.topic.localeCompare(b.topic));
//   } else if (value === 'author-name') {
//     topicsList = topicsList.sort((a, b) => a.name.localeCompare(b.name));
//   } else {
//     return topics;
//   }

//   coursesContainer.innerHTML = '';
//   createCourse(topicsList);
// });

// filterSelect.addEventListener('change', (e) => {
//   let searchedAndSortedData = topicsList;

//   const value = filterSelect.value;

//   searchedAndSortedData = topicsList.filter(
//     (topic) => topic.category === value
//   );

//   console.log(searchedAndSortedData);

//   coursesContainer.innerHTML = '';
//   createCourse(searchedAndSortedData);

//   searchedAndSortedData = topicsList;
// });
