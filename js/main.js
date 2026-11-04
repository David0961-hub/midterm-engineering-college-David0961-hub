document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. ВАЛИДАЦИЯ ФОРМЫ РЕГИСТРАЦИИ (Advanced)
    // ==========================================
    const regForm = document.getElementById('registrationForm');
    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Сброс ошибок
            regForm.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
            
            // Пароли
            const pass = document.getElementById('password');
            const confirmPass = document.getElementById('confirmPassword');
            if (pass.value.length < 6) {
                showError(pass, 'Пароль должен быть не менее 6 символов');
                isValid = false;
            }
            if (pass.value !== confirmPass.value || !confirmPass.value) {
                showError(confirmPass, 'Пароли не совпадают');
                isValid = false;
            }

            // Обязательный чекбокс
            const policy = document.getElementById('policyCheck');
            if (!policy.checked) {
                showError(policy, 'Вы должны принять условия соглашения');
                isValid = false;
            }

            // Стандартная проверка HTML5
            if (!regForm.checkValidity()) {
                isValid = false;
            }

            if (isValid) {
                regForm.reset();
                document.getElementById('regSuccessAlert').classList.remove('d-none');
            } else {
                regForm.classList.add('was-validated');
            }
        });
    }

    // ==========================================
    // 2. ВАЛИДАЦИЯ КОНТАКТНОЙ ФОРМЫ (Basic + Anti-Spam)
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const spamCheck = document.getElementById('antiSpam').value.trim();
            const alertBox = document.getElementById('contactAlert');

            if (spamCheck !== '5') { // Ответ на 2 + 3
                alertBox.className = 'alert alert-danger';
                alertBox.textContent = 'Ошибка anti-spam: Неверный ответ на математический вопрос.';
                alertBox.classList.remove('d-none');
                return;
            }

            if (contactForm.checkValidity()) {
                contactForm.reset();
                alertBox.className = 'alert alert-success';
                alertBox.textContent = 'Спасибо! Ваше сообщение успешно отправлено.';
                alertBox.classList.remove('d-none');
            } else {
                contactForm.classList.add('was-validated');
            }
        });
    }

    // ==========================================
    // 3. JS INTERACTION 1: Фильтрация программ
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const programCards = document.querySelectorAll('.program-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active', 'btn-primary'));
            filterBtns.forEach(b => b.classList.add('btn-outline-primary'));
            btn.classList.add('active', 'btn-primary');
            btn.classList.remove('btn-outline-primary');

            const filter = btn.getAttribute('data-filter');

            programCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.parentElement.style.display = 'block';
                } else {
                    card.parentElement.style.display = 'none';
                }
            });
        });
    });

    // ==========================================
    // 4. JS INTERACTION 2: FAQ Toggle
    // ==========================================
    const faqToggles = document.querySelectorAll('.faq-toggle');
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const answer = toggle.nextElementSibling;
            const isVisible = answer.classList.contains('show');

            document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('show'));
            if (!isVisible) {
                answer.classList.add('show');
            }
        });
    });

    function showError(input, message) {
        input.classList.add('is-invalid');
        const feedback = input.parentElement.querySelector('.invalid-feedback');
        if (feedback) feedback.textContent = message;
    }
});