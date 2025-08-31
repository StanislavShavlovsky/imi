
function closeModal() {
    const modal = document.getElementById('brandModal');
    const modalOverlay = document.getElementById('modalOverlay');
    if (modal) modal.style.display = 'none';
    if (modalOverlay) modalOverlay.style.display = 'none';
    document.body.style.overflow = '';
}


document.addEventListener('DOMContentLoaded', function() {
    const brandBtn = document.getElementById('brandBtn');
    const modal = document.getElementById('brandModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const brandForm = document.getElementById('brandForm');


    if (brandBtn) {
        brandBtn.addEventListener('click', () => {
            modal.style.display = 'block';
            modalOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }


    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }


    if (brandForm) {
        brandForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(brandForm);
            const data = {
                email: formData.get('email'),
                inn: formData.get('inn'),
                regdate: formData.get('regdate'),
                phone: formData.get('phone')
            };
            
       
            localStorage.setItem('brandData', JSON.stringify(data));
            
           
            showSuccessMessage();
            
          
            setTimeout(() => {
                window.location.href = 'brand_index.html';
            }, 1500);
        });
    }

    
    const roleButtons = document.querySelectorAll('.role-btn');
    roleButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});


function showSuccessMessage() {
    const modal = document.getElementById('brandModal');
    if (modal) {
        modal.innerHTML = `
            <button class="close-btn" onclick="closeModal()">&times;</button>
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title" style="color: #4CAF50;">✓ Регистрация успешна!</h2>
                    <p class="modal-subtitle">Ваш аккаунт создан. Перенаправляем на главную страницу...</p>
                </div>
                <div style="text-align: center; padding: 32px;">
                    <div style="width: 60px; height: 60px; border: 4px solid #4CAF50; border-top: 4px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 24px;"></div>
                    <p style="color: #a0a0a0; font-size: 14px;">Подготовка дашборда...</p>
                </div>
            </div>
        `;
        
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}


function showStubModal() {
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('modalOverlay');
    
    if (!modal || !overlay) return;
    
    modal.innerHTML = `
        <button class="close-btn" onclick="closeModal()">&times;</button>
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">Страница в разработке</h2>
                <p class="modal-subtitle">Эта функция появится чуть позже</p>
            </div>
            <div style="text-align: center; padding: 32px;">
                <div style="font-size: 48px; margin-bottom: 16px;">🚧</div>
                <p style="color: #a0a0a0; font-size: 16px;">Мы работаем над этим разделом</p>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
} 