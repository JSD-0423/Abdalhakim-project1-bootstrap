const coursesContainer = document.querySelector('.cards');

export const createCourse = (courses) => {
  courses.forEach((course) => {
    const div = document.createElement('div');
    div.className = 'col';
    div.setAttribute('id', course.id);

    const a = document.createElement('a');
    a.href = './pages/details.html';
    a.className = 'card border-0 overflow-hidden';
    a.style.backgroundColor = 'var(--bg-default)';

    const img = document.createElement('img');
    img.src = `../assets/${course.image}`;
    img.style.objectFit = 'cover';
    img.className = 'card-img-top';
    img.alt = `${course.image}`;

    const cardInfoDiv = document.createElement('div');
    cardInfoDiv.className = 'card-info custom-background';

    const preTitleH3 = document.createElement('h3');
    preTitleH3.className = 'pre-title';
    preTitleH3.textContent = course.category;

    const titleH2 = document.createElement('h2');
    titleH2.className = 'title';
    titleH2.textContent = course.topic;

    const rateDiv = document.createElement('div');
    rateDiv.className = 'rate';

    for (let i = 0; i < Math.floor(course.rating); i++) {
      const ionIcon = document.createElement('ion-icon');
      ionIcon.role = 'img';
      ionIcon.className = 'md hydrated';
      ionIcon.name = 'star';

      rateDiv.appendChild(ionIcon);
    }

    const starOutlineIcon = document.createElement('ion-icon');
    starOutlineIcon.role = 'img';
    starOutlineIcon.className = 'md hydrated';
    starOutlineIcon.name = 'star-outline';
    rateDiv.appendChild(starOutlineIcon);

    const authorP = document.createElement('p');
    authorP.className = 'author mb-0';
    authorP.textContent = `Author: ${course.name}`;

    cardInfoDiv.appendChild(preTitleH3);
    cardInfoDiv.appendChild(titleH2);
    cardInfoDiv.appendChild(rateDiv);
    cardInfoDiv.appendChild(authorP);

    a.appendChild(img);
    a.appendChild(cardInfoDiv);

    div.appendChild(a);
    coursesContainer.appendChild(div);
  });
};
