// js/blogger.js
document.addEventListener('DOMContentLoaded', function() {
  // Модальные окна
  const modal = document.getElementById('modal');
  const modalOverlay = document.getElementById('modalOverlay');
  
  function openModal(contentHtml) {
    modal.innerHTML = contentHtml;
    modal.style.display = 'block';
    modalOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close').onclick = closeModal;
  }
  
  function closeModal() {
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';
    document.body.style.overflow = '';
  }
  
  if (modalOverlay) modalOverlay.onclick = closeModal;
  
  // Глобальная функция для открытия окна одобрения товара
  window.openProductApproval = function(productName, productPrice) {
    openModal(`
      <button class="modal-close">&times;</button>
      <div class="product-approval-modal">
        <div class="product-approval-content">
          <h2>Одобрение товара</h2>
          <div class="product-details">
            <img src="assets/clothes.png" alt="${productName}" class="product-approval-image">
            <div class="product-approval-info">
              <h3>${productName}</h3>
              <p class="product-price">${productPrice} ₽</p>
              <p>Товар от блоггера готов к добавлению в каталог</p>
            </div>
          </div>
          <div class="approval-buttons">
            <button class="approve-btn" onclick="approveProduct('${productName}')">Одобрить</button>
            <button class="reject-btn" onclick="rejectProduct('${productName}')">Отклонить</button>
          </div>
        </div>
      </div>
    `);
  };
  
  // Глобальные функции для одобрения/отклонения товаров
  window.approveProduct = function(productName) {
    alert(`Товар "${productName}" одобрен и добавлен в каталог!`);
    closeModal();
  };
  
  window.rejectProduct = function(productName) {
    alert(`Товар "${productName}" отклонен.`);
    closeModal();
  };
  
  // Обработчик кнопки пополнения баланса
  const topupBtn = document.getElementById('topupBtn');
  if (topupBtn) {
    topupBtn.onclick = function() {
      // Здесь можно добавить логику пополнения баланса
      alert('Функция пополнения баланса (заглушка)');
    };
  }
  
  // Обработчики социальных кнопок
  document.querySelectorAll('.social-btn').forEach(btn => {
    btn.onclick = function() {
      const platform = this.textContent;
      alert(`Переход на ${platform} (заглушка)`);
    };
  });
}); 

// Функции для страницы блогера

// Показ модального окна регистрации
function showBloggerModal() {
    document.getElementById('bloggerModalOverlay').style.display = 'block';
    document.getElementById('bloggerRegistrationModal').style.display = 'block';
}

// Закрытие модального окна регистрации
function closeBloggerModal() {
    document.getElementById('bloggerModalOverlay').style.display = 'none';
    document.getElementById('bloggerRegistrationModal').style.display = 'none';
}

// Переключение между секциями
function showSection(sectionName) {
    // Скрываем все секции
    document.querySelectorAll('.blogger-content-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Показываем нужную секцию
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.style.display = 'block';
    }
    
    // Обновляем активную кнопку
    document.querySelectorAll('.blogger-nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Обработка выбора специализации
function initSpecializationSelection() {
    document.querySelectorAll('.specialization-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.specialization-item').forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

// Обработка выбора социальных сетей
function initSocialNetworksSelection() {
    document.querySelectorAll('.social-network-item').forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });
}

// Обработка отправки формы регистрации
function initBloggerRegistrationForm() {
    const form = document.getElementById('bloggerRegistrationForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Собираем данные формы
            const formData = new FormData(this);
            const selectedSpecializations = Array.from(document.querySelectorAll('.specialization-item.selected'))
                .map(item => item.dataset.specialization);
            const selectedNetworks = Array.from(document.querySelectorAll('.social-network-item.selected'))
                .map(item => item.dataset.network);
            
            // Валидация
            if (selectedSpecializations.length === 0) {
                alert('Пожалуйста, выберите хотя бы одну специализацию');
                return;
            }
            
            if (selectedNetworks.length === 0) {
                alert('Пожалуйста, выберите хотя бы одну социальную сеть');
                return;
            }
            
            // Здесь можно отправить данные на сервер
            console.log('Данные регистрации:', {
                formData: Object.fromEntries(formData),
                specializations: selectedSpecializations,
                networks: selectedNetworks
            });
            
            // Показываем сообщение об успешной регистрации
            alert('Регистрация успешно завершена! Добро пожаловать в систему!');
            
            // Закрываем модальное окно
            closeBloggerModal();
            
            // Перенаправляем на главную страницу блогера
            setTimeout(() => {
                window.location.href = 'blogger_stats.html';
            }, 1000);
        });
    }
}

// Инициализация всех функций при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Показываем модальное окно регистрации при загрузке страницы blogger.html
    if (window.location.pathname.includes('blogger.html')) {
        showBloggerModal();
    }
    
    // Инициализируем обработчики событий
    initSpecializationSelection();
    initSocialNetworksSelection();
    initBloggerRegistrationForm();
    
    // Закрытие модального окна при клике на оверлей
    const overlay = document.getElementById('bloggerModalOverlay');
    if (overlay) {
        overlay.addEventListener('click', closeBloggerModal);
    }
});

// Функции для статистики блогера
function initStatsFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Здесь можно добавить логику фильтрации данных
            console.log('Фильтр изменен:', this.textContent);
        });
    });
}

// Функции для партнеров блогера
function initPartnersFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Здесь можно добавить логику фильтрации партнеров
            console.log('Фильтр партнеров изменен:', this.textContent);
        });
    });
}

// Функции для уведомлений блогера
function initNotificationsTabs() {
    document.querySelectorAll('.notifications-tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.notifications-tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const tabType = this.dataset.tab;
            console.log('Переключение на вкладку уведомлений:', tabType);
            
            // Здесь можно добавить логику фильтрации уведомлений
        });
    });
}

// Функции для настроек блогера
function saveSettings() {
    console.log('Сохранение настроек...');
    alert('Настройки успешно сохранены!');
}

function resetSettings() {
    console.log('Сброс настроек...');
    if (confirm('Вы уверены, что хотите отменить изменения?')) {
        location.reload();
    }
}

// Экспорт функций для использования в других файлах
window.bloggerFunctions = {
    showBloggerModal,
    closeBloggerModal,
    showSection,
    saveSettings,
    resetSettings
}; 