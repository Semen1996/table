const tbody = document.querySelector('.tbody');
const rowTemp = document.querySelector('#row').content;
const rowHead = document.querySelector('.row_head');
const form = document.forms.form;

let clickName = false;
let clickLastName = false;
let clickAbout = false;
let clickEye = false;

let submitRow = 0;

// Функция, собирающая информацию из строки и отдающая в форму
function handleRow(evt, index) {
  submitRow = index;
  form.firstName.value = evt.path[1].querySelector('.column_name').textContent;
  form.lastName.value = evt.path[1].querySelector('.column_last-name').textContent;
  form.about.value = evt.path[1].querySelector('.column_about').textContent;
  form.eyeColor.value = evt.path[1].querySelector('.column_eye-color').textContent;
}

// Функция для отображения таблицы
function insertRows() {
  data.forEach((item, index) => {
    const row = rowTemp.querySelector('.row').cloneNode(true);

    row.querySelector('.column_name').textContent = item.name.firstName;
    row.querySelector('.column_last-name').textContent = item.name.lastName;
    row.querySelector('.column_about').textContent = item.about;
    row.querySelector('.column_eye-color').textContent = item.eyeColor;

    row.addEventListener('click', (evt) => {
      handleRow(evt, index);
    });

    tbody.append(row);
  });
}

// Функция для очистки таблицы
function clearTable() {
  tbody.querySelectorAll('.row').forEach(item => item.remove());
}

// Заполняем таблицу начальными значениями
insertRows();

// Навешиваем слушателей на заголовки для сортировки
rowHead.querySelector('.column_name-head').addEventListener('click', () => {
  if(clickName) {
    data.sort((x, y) => y.name.firstName.localeCompare(x.name.firstName));
    clickName = false;
  } else {
    data.sort((x, y) => x.name.firstName.localeCompare(y.name.firstName));
    clickName = true;
  }

  clearTable();
  insertRows();
});

rowHead.querySelector('.column_last-name-head').addEventListener('click', () => {
  if(clickLastName) {
    data.sort((x, y) => y.name.lastName.localeCompare(x.name.lastName));
    clickLastName = false;
  } else {
    data.sort((x, y) => x.name.lastName.localeCompare(y.name.lastName));
    clickLastName = true;
  }

  clearTable();
  insertRows();
});

rowHead.querySelector('.column_about-head').addEventListener('click', () => {
  if(clickAbout) {
    data.sort((x, y) => y.about.localeCompare(x.about));
    clickAbout = false;
  } else {
    data.sort((x, y) => x.about.localeCompare(y.about));
    clickAbout = true;
  }

  clearTable();
  insertRows();
});

rowHead.querySelector('.column_eye-color-head').addEventListener('click', () => {
  if(clickEye) {
    data.sort((x, y) => y.eyeColor.localeCompare(x.eyeColor));
    clickEye = false;
  } else {
    data.sort((x, y) => x.eyeColor.localeCompare(y.eyeColor));
    clickEye = true;
  }

  clearTable();
  insertRows();
});

//Навешиваем слушателя на кнопку сохранить
form.addEventListener('submit', (e) => {
  e.preventDefault();
  data[submitRow].name.firstName = form.firstName.value;
  data[submitRow].name.lastName = form.lastName.value;
  data[submitRow].about = form.about.value;
  data[submitRow].eyeColor = form.eyeColor.value;
  clearTable();
  insertRows();
});