import { menuItems } from '/data.js';

//function to render the menu items
function getMenuHtml() {
  let menuHtml = ``;

  menuItems.forEach((item) => {
    menuHtml += `
      <div class="menu-item">
          <img src="${item.image}" alt="${item.name}" />
          <h2>${item.name}</h2>
          <p>${item.description}</p>
          <h3>
            $${item.price}
          </h3>
          <button class="add-item" data-add-btn="${item.uuid}">+</button>
      </div>
    `;
  });

  return menuHtml;
}

function render() {
  document.getElementById('menu').innerHTML = getMenuHtml();
}

render();

const orderArray = [];
const orderHtml = document.getElementById('order-process');
const orderTitle = document.querySelector('.title');
const orderSummary = document.querySelector('#order-summary');
const paymentModal = document.querySelector('.modal');
const creditCardInput = document.getElementById('card-number');
const overlay = document.querySelector('.overlay');
const paymentForm = document.querySelector('form');

creditCardInput.addEventListener('input', formatCreditCardInput);
document.addEventListener('click', handleButtonClick);
paymentForm.addEventListener('submit', handleFormSubmit);

function formatCreditCardInput(e) {
  const input = e.target.value.replace(/\D/g, '').substring(0, 16);
  const cardNumber = input.match(/.{1,4}/g);
  if (cardNumber) {
    e.target.value = cardNumber.join(' ');
  }
}

function handleButtonClick(e) {
  if (e.target.dataset.addBtn) {
    handleAddBtnClick(e.target.dataset.addBtn);
  } else if (e.target.dataset.removeBtn) {
    handleRemoveBtnClick(e.target.dataset.removeBtn);
  } else if (e.target.dataset.completeOrder) {
    handleCompleteOrderBtn(e.target.dataset.completeOrder);
  } else if (e.target.dataset.closeModal) {
    handleCloseModalBtn(e.target.dataset.closeModal);
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  closeModal();
  const buyerName = document.getElementById('buyer-name').value;
  orderTitle.classList.add('hidden');
  orderHtml.innerHTML = '';
  orderSummary.innerHTML = `
    <div class="thank-you">Thanks, <span>${buyerName}!</span> your order is on the way!
      <div class="rating">
        <h3>How would you rate your experience?</h3>
        <div class="rating-stars">
          <button class="rating-star" data-rating="1">★</button>
          <button class="rating-star" data-rating="2">★</button>
          <button class="rating-star" data-rating="3">★</button>
          <button class="rating-star" data-rating="4">★</button>
          <button class="rating-star" data-rating="5">★</button>
        </div>
      </div>
    </div>
  `;
  clearAllInput();
  setupRating();
}

function handleAddBtnClick(id) {
  const targetAddBtn = menuItems.find((item) => item.uuid === id);
  targetAddBtn.numberOrdered++;

  const existingOrder = orderArray.find((order) => order[0] === targetAddBtn.name);
  if (existingOrder) {
    existingOrder[1] = targetAddBtn.numberOrdered;
    existingOrder[2] = targetAddBtn.price * targetAddBtn.numberOrdered;
    existingOrder[3] = targetAddBtn.uuid;
  } else {
    orderArray.push([targetAddBtn.name, targetAddBtn.numberOrdered, targetAddBtn.price, targetAddBtn.uuid]);
  }

  orderDisplay();
  orderProcess();
}

function handleRemoveBtnClick(removeBtnId) {
  const target = menuItems.find((item) => item.uuid === removeBtnId);
  target.numberOrdered--;

  for (let i = orderArray.length - 1; i >= 0; i--) {
    const order = orderArray[i];
    if (order[0] === target.name) {
      order[1] = target.numberOrdered;
      order[2] = target.price * target.numberOrdered;
      order[3] = target.uuid;
      if (order[1] === 0) {
        orderArray.splice(i, 1);
      }
    }
  }

  orderProcess();
}

function orderDisplay() {
  orderTitle.classList.remove('hidden');
}

function orderProcess() {
  orderHtml.innerHTML = '';
  orderSummary.innerHTML = '';
  let totalPrice = 0;

  orderArray.forEach(([name, numberOrdered, price, uuid]) => {
    orderHtml.innerHTML += `
      <div class="order-wrapper">
        <p class="order-item">${name}<button data-remove="${uuid}" class="remove-btn" data-remove-btn="${uuid}">remove</button></p>
        <p class="order-price"><small>${numberOrdered}x</small>${price}$</p>
      </div>
    `;

    totalPrice += price;
    if (orderArray.length >= 3 || numberOrdered >= 3) {
      totalPrice = totalPrice * 0.9;
    }
  });

  totalPrice = Math.round(totalPrice * 100) / 100;

  orderSummary.innerHTML = `
    <div class="divider-total"></div>
    <div class="total total-wrapper">
      <h3>Total</h3>
      <p class="total-price">${totalPrice}$</p>
    </div>
    ${orderArray.length >= 3 ? `<p class="discount">10% discount meal deal applied</p>` : ''}
    <button class="complete-order-btn total-wrapper" data-complete-order="complete-order">Complete order</button>
  `;

  if (totalPrice === 0) {
    orderTitle.classList.add('hidden');
    orderHtml.innerHTML = '';
    orderSummary.innerHTML = '';
  }
}

function handleCompleteOrderBtn() {
  openModal();
}

function openModal() {
  paymentModal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function handleCloseModalBtn() {
  closeModal();
}

function closeModal() {
  paymentModal.classList.add('hidden');
  overlay.classList.add('hidden');
  event.preventDefault();
}

function clearAllInput() {
  let allInputs = document.querySelectorAll('input');
  allInputs.forEach((input) => (input.value = ''));
}

function setupRating() {
  const ratingStars = document.querySelectorAll('.rating-star');
  const ratingContainer = document.querySelector('.rating-stars');
  let selectedRating = 0;

  ratingStars.forEach((star) => {
    star.addEventListener('click', () => {
      const ratingValue = star.dataset.rating;
      renderRating(ratingValue);
      const closeRatingBtn = document.getElementById('close-rating-btn');
      closeRatingBtn.addEventListener('click', handleCloseRatingBtn);
    });
  });

  function handleStarHover(event) {
    const hoverRating = Number(event.target.dataset.rating);

    ratingStars.forEach((star) => {
      star.classList.remove('filled');
    });

    for (let i = 0; i < hoverRating; i++) {
      ratingStars[i].classList.add('filled');
    }
  }

  function handleStarHoverOut() {
    ratingStars.forEach((star) => {
      star.classList.remove('filled');
    });

    for (let i = 0; i < selectedRating; i++) {
      ratingStars[i].classList.add('filled');
    }
  }

  function handleStarClick(event) {
    selectedRating = Number(event.target.dataset.rating);

    ratingStars.forEach((star) => {
      star.classList.remove('filled');
    });

    for (let i = 0; i < selectedRating; i++) {
      ratingStars[i].classList.add('filled');
    }
  }

  ratingContainer.addEventListener('mouseover', handleStarHover);
  ratingContainer.addEventListener('mouseout', handleStarHoverOut);
  ratingContainer.addEventListener('click', handleStarClick);
}

function renderRating(ratingValue) {
  const message = ratingValue <= '3' ? `You rated us ${ratingValue} star, we will do better next time!` : `You rated us ${ratingValue} stars, Wohoo!`;
  orderHtml.innerHTML = `
    <div class="thank-you">
      <h2>Thanks for your rating!</h2>
      <h3>${message}</h3>
      <button id="close-rating-btn" data-close-rating="close-rating">Close</button>
    </div>
  `;
}

function handleCloseRatingBtn() {
  orderHtml.innerHTML = '';
  orderTitle.classList.add('hidden');
  orderArray.splice(0, orderArray.length);
  menuItems.forEach((item) => {
    item.numberOrdered = 0;
  });
  orderProcess();
}
