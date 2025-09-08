// Маска для телефона +380
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('contactPhone');
    
    if (phoneInput) {
        // Добавляем +380 при фокусе, если поле пустое
        phoneInput.addEventListener('focus', function() {
            if (this.value === '') {
                this.value = '+380';
            }
        });
        
        // Обработка ввода
        phoneInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, ''); // Убираем все нецифровые символы
            
            // Если начинается с 380, добавляем +
            if (value.startsWith('380')) {
                this.value = '+' + value;
            } else if (value.startsWith('0')) {
                // Если начинается с 0, заменяем на +380
                this.value = '+380' + value.substring(1);
            } else if (value.length > 0 && !value.startsWith('380')) {
                // Если вводят другие цифры, добавляем +380
                this.value = '+380' + value;
            } else if (value === '') {
                this.value = '';
            }
            
            // Ограничиваем длину (украинский номер: +380XXXXXXXXX = 13 символов)
            if (this.value.length > 13) {
                this.value = this.value.substring(0, 13);
            }
        });
        
        // Обработка вставки из буфера обмена
        phoneInput.addEventListener('paste', function(e) {
            setTimeout(() => {
                let value = this.value.replace(/\D/g, '');
                if (value.startsWith('380')) {
                    this.value = '+' + value;
                } else if (value.startsWith('0')) {
                    this.value = '+380' + value.substring(1);
                } else if (value.length > 0) {
                    this.value = '+380' + value;
                }
                
                if (this.value.length > 13) {
                    this.value = this.value.substring(0, 13);
                }
            }, 0);
        });
        
        // Обработка клавиш (разрешаем только цифры, +, backspace, delete, стрелки)
        phoneInput.addEventListener('keydown', function(e) {
            const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
            const isDigit = e.key >= '0' && e.key <= '9';
            const isPlus = e.key === '+';
            
            if (!allowedKeys.includes(e.key) && !isDigit && !isPlus) {
                e.preventDefault();
            }
        });
    }
});
