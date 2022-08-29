// const { default: axios } = require('axios');
const edit = document.querySelectorAll('.edit');
const clear = document.querySelector('.clear');
const date = document.querySelector('.date');
const month = document.querySelector('.month');

const input = document.querySelector('#title');
const form = document.querySelector('.form-submit');
let isEdit = false;
let editId = '';
const errorText = document.querySelector('.error');

/* get Month and Day */
const getDate = new Date()
  .toLocaleString('en-US', {
    weekday: 'long',
    day: 'numeric',
  })
  .split(' ')
  .reverse()
  .join(', ');

date.textContent = `${getDate}th`;
month.textContent = new Date().toLocaleString('en-US', { month: 'long' });

/* Post or Edit items */
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!input.value) {
    /* Tell user to add a value and remove after 2s */
    errorText.textContent = 'Please input a value!!';
    setTimeout(() => {
      errorText.textContent = '';
    }, 2000);
    return;
  }
  try {
    if (isEdit) {
      window.location.reload();
      await axios.patch(
        `https://simple-todolist-project.herokuapp.com/todo/${editId}`,
        {
          title: input.value,
        }
      );
    } else {
      await axios.post('https://simple-todolist-project.herokuapp.com/todo', {
        title: input.value,
      });
    }
    isEdit = false;
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
form.addEventListener('submit', handleSubmit);

/* Clear all Items */
clear.addEventListener('click', async () => {
  window.location.reload();
  await axios.delete(
    'https://simple-todolist-project.herokuapp.com/todo/remove'
  );
});

/* Edit Item */
edit.forEach((btn, btnIndex) => {
  btn.addEventListener('click', async () => {
    try {
      const { data: items } = await axios.get(
        'https://simple-todolist-project.herokuapp.com/todo/'
      );
      items.reverse().forEach((item, index) => {
        if (btnIndex === index) {
          isEdit = true;
          editId = item._id;
          input.value = item.title;
          input.focus();
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
});
