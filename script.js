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

// кнопка формы
const form = document.querySelector('.filter-form');

form.addEventListener('submit', function (event) {
	event.preventDefault(); //
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
