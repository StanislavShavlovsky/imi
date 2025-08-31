window.addEventListener('DOMContentLoaded', function() {
    const block = document.getElementById('brandDataBlock');
    if (block) {
        const data = localStorage.getItem('brandData');
        if (data) {
            const brand = JSON.parse(data);
            block.innerHTML = `
                <b>Контактный email:</b> ${brand.email || 'Не указан'}<br>
                <b>ИНН:</b> ${brand.inn || 'Не указан'}<br>
                <b>Дата регистрации:</b> ${brand.regdate || 'Не указана'}<br>
                <b>Номер телефона:</b> ${brand.phone || 'Не указан'}
            `;
        } else {
            block.innerHTML = '<i>Данные не заполнены</i>';
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    
    const tabBtns = document.querySelectorAll('.settings-tab-btn');
    const tabSections = document.querySelectorAll('.settings-section');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabSections.forEach(s => s.classList.remove('active'));
            btn.classList.add('active');
            const targetSection = document.getElementById('tab-' + btn.dataset.tab);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    
    const securityForm = document.getElementById('securityForm');
    if (securityForm) {
        const securityFields = ['email', 'inn', 'regdate', 'phone'];
        // Заполнить из локалки
        const brandData = JSON.parse(localStorage.getItem('brandData') || '{}');
        securityFields.forEach(f => {
            const field = securityForm[f];
            if (field && brandData[f]) {
                field.value = brandData[f];
            }
        });
        securityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const data = {};
            securityFields.forEach(f => {
                const field = securityForm[f];
                if (field) {
                    data[f] = field.value;
                }
            });
            localStorage.setItem('brandData', JSON.stringify(data));
            alert('Данные сохранены!');
        });
    }

    
    const financeForm = document.getElementById('financeForm');
    if (financeForm) {
        const financeFields = ['limit', 'max_partners', 'budget'];
        const financeData = JSON.parse(localStorage.getItem('financeData') || '{}');
        financeFields.forEach(f => {
            const field = financeForm[f];
            if (field && financeData[f]) {
                field.value = financeData[f];
            }
        });
        financeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const data = {};
            financeFields.forEach(f => {
                const field = financeForm[f];
                if (field) {
                    data[f] = field.value;
                }
            });
            localStorage.setItem('financeData', JSON.stringify(data));
            alert('Данные сохранены!');
        });
    }
}); 