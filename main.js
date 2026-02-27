(function () {
  emailjs.init('s6OQ_yIYGKqO-eSx3');
})();

const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal-order');
  const orderForm = document.getElementById('order-form');
  const modalContent = modal.querySelector('.modal-content');
  const closeBtn = document.querySelector('.close-modal');
  const partNameInput = document.getElementById('part-name-input');
  const phoneInput = orderForm.querySelector('input[type="tel"]');
  const buttons = document.querySelectorAll('.button');

  const openModal = (partName = 'Общая заявка') => {
    orderForm.style.display = 'flex';
    const successMsg = modal.querySelector('.success-message');
    if (successMsg) successMsg.remove();

    partNameInput.value = partName;
    modal.style.display = 'flex';
  };

  const closeModal = () => {
    modal.style.display = 'none';
  };

  phoneInput.addEventListener('focus', () => {
    if (!phoneInput.value) phoneInput.value = '+996 ';
  });

  phoneInput.addEventListener('input', (e) => {
    if (!e.target.value.startsWith('+996')) {
      e.target.value = '+996 ' + e.target.value.replace(/^\+?996\s?/, '');
    }

    if (e.target.value.replace(/\D/g, '').length > 12) {
      e.target.value = e.target.value.slice(0, 16);
    }
  });

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.closest('.modal-content') || btn.closest('.footer-contacts')) {
        openModal('Общая заявка');
        return;
      }
      const partItem = btn.closest('.part-item');
      const partName = partItem?.querySelector('.part-name')?.innerText;
      openModal(partName);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  orderForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const rawPhone = phoneInput.value.replace(/\D/g, '');

    if (rawPhone.length < 12) {
      alert('Пожалуйста, введите полный номер телефона: +996 (XXX) XX-XX-XX');
      return;
    }

    const submitBtn = this.querySelector('button');
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = 'ОТПРАВКА...';
    submitBtn.disabled = true;

    emailjs
      .send('service_a3y1kds', 'template_h1931ax', {
        user_name: this.user_name.value,
        user_phone: phoneInput.value,
        part_name: partNameInput.value,
      })
      .then(() => {
        orderForm.style.display = 'none';

        const successHTML = `
          <div class="success-message" style="text-align: center; padding: 20px 0;">
            <div style="font-size: 50px; color: #e62e2e; margin-bottom: 15px;">✓</div>
            <h2 style="margin-bottom: 10px;">Спасибо, ${this.user_name.value}!</h2>
            <p>Заявка на "${partNameInput.value}" принята. Мы перезвоним вам в ближайшее время.</p>
            <button type="button" class="button" style="margin-top: 20px;" onclick="this.closest('.modal').style.display='none'">ЗАКРЫТЬ</button>
          </div>
        `;

        modalContent.insertAdjacentHTML('beforeend', successHTML);
        orderForm.reset();
      })
      .catch((error) => {
        console.error(error);
        alert('Ошибка при отправке. Попробуйте еще раз или позвоните нам.');
      })
      .finally(() => {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
      });
  });
});
