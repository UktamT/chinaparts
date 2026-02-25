document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal-order');
  const orderForm = document.getElementById('order-form');
  const closeBtn = document.querySelector('.close-modal');
  const partNameInput = document.getElementById('part-name-input');
  const phoneInput = orderForm.querySelector('input[type="tel"]');
  const buttons = document.querySelectorAll('.button');

  const openModal = (partName = 'Общая заявка') => {
    partNameInput.value = partName;
    modal.style.display = 'flex';
  };

  const closeModal = () => {
    modal.style.display = 'none';
  };

  phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, '');
  });

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.closest('.modal-content')) return;

      const partItem = btn.closest('.part-item');
      const partName = partItem?.querySelector('.part-name')?.innerText;

      openModal(partName);
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (phoneInput.value.length < 5) {
      alert('Введите корректный номер телефона');
      return;
    }

    alert('Заявка отправлена!');
    closeModal();
    orderForm.reset();
  });
});
