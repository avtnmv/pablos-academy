document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('contactPhone');
    const telegramInput = document.getElementById('contactTelegram');
    const form = document.querySelector('.contact__form');

    // Автоматическое добавление "+" к телефону только при фокусе
    phoneInput.addEventListener('focus', function() {
        if (this.value === '') {
            this.value = '+';
        }
    });

    phoneInput.addEventListener('blur', function() {
        if (this.value === '+') {
            this.value = '';
        }
    });

    phoneInput.addEventListener('input', function() {
        let value = this.value;
        
        // Убираем все кроме цифр и плюса
        value = value.replace(/[^+\d]/g, '');
        
        // Если есть текст и первый символ не +, добавляем его
        if (value.length > 0 && value[0] !== '+') {
            value = '+' + value;
        }
        
        // Ограничиваем длину
        if (value.length > 15) {
            value = value.substring(0, 15);
        }
        
        this.value = value;
    });

    // Автоматическое добавление "@" к телеграму только при фокусе
    telegramInput.addEventListener('focus', function() {
        if (this.value === '') {
            this.value = '@';
        }
    });

    telegramInput.addEventListener('blur', function() {
        if (this.value === '@') {
            this.value = '';
        }
    });

    telegramInput.addEventListener('input', function() {
        let value = this.value;
        
        // Если есть текст и первый символ не @, добавляем его
        if (value.length > 0 && value[0] !== '@') {
            value = '@' + value;
        }
        
        // Убираем пробелы и специальные символы кроме _ и @
        value = value.replace(/[^@\w]/g, '');
        
        // Ограничиваем длину
        if (value.length > 33) { // максимальная длина username в Telegram
            value = value.substring(0, 33);
        }
        
        this.value = value;
    });

    // Функция валидации
    function validateForm() {
        let isValid = true;
        const nameInput = document.getElementById('contactName');
        const emailInput = document.getElementById('contactEmail');
        const checkbox = document.querySelector('.contact__checkbox');
        const checkboxCustom = document.querySelector('.contact__checkbox-custom');
        const errorElements = [];
        
        // Очищаем предыдущие ошибки
        [nameInput, phoneInput, emailInput, telegramInput].forEach(input => {
            input.classList.remove('error');
        });
        checkboxCustom.classList.remove('error');
        
        // Проверяем имя
        if (!nameInput.value.trim()) {
            errorElements.push(nameInput);
            isValid = false;
        }
        
        // Проверяем телефон
        if (!phoneInput.value.trim() || phoneInput.value === '+') {
            errorElements.push(phoneInput);
            isValid = false;
        }
        
        // Проверяем email
        if (!emailInput.value.trim()) {
            errorElements.push(emailInput);
            isValid = false;
        }
        
        // Проверяем телеграм
        if (!telegramInput.value.trim() || telegramInput.value === '@') {
            errorElements.push(telegramInput);
            isValid = false;
        }
        
        // Проверяем чекбокс
        if (!checkbox.checked) {
            errorElements.push(checkboxCustom);
            isValid = false;
        }
        
        // Добавляем ошибки сразу
        errorElements.forEach(element => {
            element.classList.add('error');
        });
        
        return isValid;
    }

    // Обработка отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Форма валидна - отправляем данные
            console.log('Form submitted with data:', {
                name: document.getElementById('contactName').value,
                phone: phoneInput.value,
                email: document.getElementById('contactEmail').value,
                telegram: telegramInput.value,
                checkbox: document.querySelector('.contact__checkbox').checked
            });
            
            // Показать сообщение об успешной отправке
            alert('Дякуємо! Ваша заявка надіслана. Ми звʼяжемося з вами найближчим часом.');
            
            // Очистить форму
            form.reset();
            
            // Восстановить начальные значения для специальных полей
            phoneInput.value = '';
            telegramInput.value = '';
        }
    });
    
    // Убираем ошибку при вводе в поля
    [document.getElementById('contactName'), phoneInput, document.getElementById('contactEmail'), telegramInput].forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
    
    // Убираем ошибку при изменении чекбокса
    document.querySelector('.contact__checkbox').addEventListener('change', function() {
        document.querySelector('.contact__checkbox-custom').classList.remove('error');
    });
});
