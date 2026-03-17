// слайдер
const slider = document.getElementById('price-slider');
const minInput = document.getElementById('min-input');
const maxInput = document.getElementById('max-input');

noUiSlider.create(slider, {
	start: [30, 100],
	connect: true,
	range: { 'min': 0, 'max': 100 },
	step: 1,
	tooltips: false,
});

slider.noUiSlider.on('update', (values) => {
	minInput.value = Math.round(values[0]);
	maxInput.value = Math.round(values[1]);
});

// лайки
const likeBtns = document.querySelectorAll('.btn-like');

likeBtns.forEach((btn) => {
	btn.addEventListener('click', function () {
		this.classList.toggle('btn-like--active');
	});
});

// проценты бар
document.querySelectorAll('.card__level').forEach((block) => {
	const svg = block.querySelector('.card__level-bar');
	const percentSpan = block.querySelector('.card__level-percent');

	if (svg && percentSpan) {
		const percent = parseInt(percentSpan.textContent, 10);
		svg.style.setProperty('--progress', percent);
	}
});

// открытие табов формы
const titles = document.querySelectorAll('.filter-form__group-btn');

titles.forEach((title) => {
	title.addEventListener('click', function () {
		const parentGroup = this.closest('.filter-form__group');

		if (parentGroup) {
			parentGroup.classList.toggle('filter-form__group--open');
		}
	});
});

// результаты формы 
document.querySelector('.filter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  this.classList.add('filter-form--result');
  
  const result = {
    Хобби: [...document.querySelectorAll('[name="interest"]:checked')].map(cb => cb.value),
    Музыка: [...document.querySelectorAll('[name="music"]:checked')].map(cb => cb.value),
    Еда: [...document.querySelectorAll('[name="food"]:checked')].map(cb => cb.value),
    Транспорт: [...document.querySelectorAll('[name="transport"]:checked')].map(cb => cb.value),
    Левел: {
      от: document.getElementById('min-input')?.value || null,
      до: document.getElementById('max-input')?.value || null
    }
  };
  
  const formResult = document.querySelector('.filter-form__result');
  const oldResults = formResult.querySelector('.filter-form__result-list');
  if (oldResults) oldResults.remove();
  
  const resultList = document.createElement('ul');
  resultList.className = 'filter-form__result-list';
  
  Object.entries(result).forEach(([category, values]) => {
    if (category === 'Левел') {
      const levelText = [];
      if (values.от) levelText.push(`от ${values.от}`);
      if (values.до) levelText.push(`до ${values.до}`);
      if (levelText.length) {
        resultList.innerHTML += `<li class="filter-form__result-item">
                                  <span class="filter-form__result-category">${category}: </span>
                                  <span class="filter-form__result-value">${levelText.join(' ')}</span>
                                </li>`;
      }
    } else if (values.length) {
      resultList.innerHTML += `<li class="filter-form__result-item">
                                <span class="filter-form__result-category">${category}: </span>
                                <span class="filter-form__result-value">${values.join(', ')}</span>
                              </li>`;
    }
  });
  
  if (resultList.children.length) formResult.appendChild(resultList);
});

// Сброс формы
document.querySelector('.filter-form').addEventListener('reset', function(e) {
  this.classList.remove('filter-form--result');
  
  const resultList = document.querySelector('.filter-form__result-list');
  if (resultList) resultList.remove();
});