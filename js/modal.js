let currentAmount = 10000;
let isIndividual = true;


function openModal(content) {
  let modalOverlay = document.getElementById('modalOverlay');
  
  
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'modalOverlay';
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);
  }
  
  modalOverlay.innerHTML = content;
  modalOverlay.style.display = 'block';
  modalOverlay.style.zIndex = '9999';
  document.body.style.overflow = 'hidden';
  
  
  const modalElement = modalOverlay.querySelector('.topup-modal, .blogger-modal, .product-approval-modal, .market-stub-modal, .add-modal, .edit-field-modal, .chat-modal');
  if (modalElement) {
    modalElement.style.display = 'block';
  }
  
  
  const closeBtn = modalOverlay.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.onclick = closeModal;
  }
  
  
  modalOverlay.onclick = function(e) {
    if (e.target === modalOverlay) {
      closeModal();
    }
  };
}


function closeModal() {
  const modalOverlay = document.getElementById('modalOverlay');
  if (modalOverlay) {
    
    const modalElements = modalOverlay.querySelectorAll('.topup-modal, .blogger-modal, .product-approval-modal, .market-stub-modal, .add-modal, .edit-field-modal, .chat-modal');
    modalElements.forEach(modal => {
      modal.style.display = 'none';
    });
    
    modalOverlay.style.display = 'none';
    modalOverlay.innerHTML = '';
  }
  document.body.style.overflow = '';
  
 
  const marketBtn = document.querySelector('.sidebar-market button[data-action="market"]');
  if (marketBtn) {
    marketBtn.classList.remove('active');
  }
}


function initializeTopupModal() {
  const amountDisplay = document.getElementById('amountDisplay');
  const topupAmount = document.getElementById('topupAmount');
  const minusBtn = document.getElementById('minusBtn');
  const plusBtn = document.getElementById('plusBtn');
  const individualBtn = document.getElementById('individualBtn');
  const legalBtn = document.getElementById('legalBtn');
  const payerName = document.getElementById('payerName');
  const topupActionBtn = document.getElementById('topupActionBtn');

  function updateAmount() {
    const formattedAmount = currentAmount.toLocaleString('ru-RU') + ' p';
    if (amountDisplay) amountDisplay.textContent = formattedAmount;
    if (topupAmount) topupAmount.textContent = formattedAmount;
  }

  function updateEntityType() {
    if (isIndividual) {
      if (individualBtn) individualBtn.classList.add('active');
      if (legalBtn) legalBtn.classList.remove('active');
      if (payerName) payerName.textContent = 'Иванов Иван Иванович';
    } else {
      if (legalBtn) legalBtn.classList.add('active');
      if (individualBtn) individualBtn.classList.remove('active');
      if (payerName) payerName.textContent = 'По счету';
    }
  }

  
  if (minusBtn) {
    minusBtn.onclick = function() {
      if (currentAmount > 1000) {
        currentAmount -= 1000;
        updateAmount();
      }
    };
  }

  if (plusBtn) {
    plusBtn.onclick = function() {
      currentAmount += 1000;
      updateAmount();
    };
  }


  if (individualBtn) {
    individualBtn.onclick = function() {
      isIndividual = true;
      updateEntityType();
    };
  }

  if (legalBtn) {
    legalBtn.onclick = function() {
      isIndividual = false;
      updateEntityType();
    };
  }


  if (topupActionBtn) {
    topupActionBtn.onclick = function() {
      alert(`Баланс пополнен на ${currentAmount.toLocaleString('ru-RU')} рублей (заглушка)`);
      closeModal();
    };
  }

  
  updateAmount();
  updateEntityType();
}


function initializeWithdrawModal() {
  const amountDisplay = document.getElementById('amountDisplay');
  const withdrawAmount = document.getElementById('withdrawAmount');
  const minusBtn = document.getElementById('minusBtn');
  const plusBtn = document.getElementById('plusBtn');
  const withdrawActionBtn = document.getElementById('withdrawActionBtn');

  let currentWithdrawAmount = 1000;

  function updateAmount() {
    const formattedAmount = currentWithdrawAmount.toLocaleString('ru-RU') + ' p';
    if (amountDisplay) amountDisplay.textContent = formattedAmount;
    if (withdrawAmount) withdrawAmount.textContent = formattedAmount;
  }

  
  if (minusBtn) {
    minusBtn.onclick = function() {
      if (currentWithdrawAmount > 100) {
        currentWithdrawAmount -= 100;
        updateAmount();
      }
    };
  }

  if (plusBtn) {
    plusBtn.onclick = function() {
      currentWithdrawAmount += 100;
      updateAmount();
    };
  }


  if (withdrawActionBtn) {
    withdrawActionBtn.onclick = function() {
      alert(`Средства выведены на сумму ${currentWithdrawAmount.toLocaleString('ru-RU')} рублей (заглушка)`);
      closeModal();
    };
  }

  
  updateAmount();
}


function showMarketStub() {
  
  const marketBtn = document.querySelector('.sidebar-market button[data-action="market"]');
  if (marketBtn) {
    marketBtn.classList.add('active');
  }
  
  const modalContent = `
    <div class="market-stub-modal">
      <button class="modal-close">&times;</button>
      <div class="market-stub-content">
        <div class="market-stub-icon">🛒</div>
        <h2>Маркет</h2>
        <p>Маркет пока в разработке! Скоро здесь появится возможность покупать товары и услуги.</p>
      </div>
    </div>
  `;
  openModal(modalContent);
}


function showTopupModal() {
  const modalContent = `
    <div class="topup-modal">
      <button class="modal-close">&times;</button>
      <div class="topup-modal-header">
        <h2>Пополнение баланса</h2>
      </div>
      <div class="topup-modal-content">
        <div class="topup-left-section">
          <div class="amount-controls">
            <button class="amount-btn minus-btn" id="minusBtn">-</button>
            <div class="amount-display" id="amountDisplay">10 000 p</div>
            <button class="amount-btn plus-btn" id="plusBtn">+</button>
          </div>
          
          <div class="entity-type-selection">
            <button class="entity-btn individual-btn active" id="individualBtn">Физ.лицо</button>
            <button class="entity-btn legal-btn" id="legalBtn">Юр.лицо</button>
          </div>
          
          <div class="payment-method-section">
            <label class="section-label">Способ оплаты</label>
            <button class="dropdown-btn" id="paymentMethodBtn">
              <span>Банковская карта</span>
              <span class="chevron">▼</span>
            </button>
          </div>
          
          <div class="payer-section">
            <label class="section-label">Плательщик</label>
            <button class="dropdown-btn" id="payerBtn">
              <span id="payerName">Иванов Иван Иванович</span>
              <span class="chevron">▼</span>
            </button>
          </div>
        </div>
        
        <div class="topup-right-section">
          <button class="topup-action-btn" id="topupActionBtn">
            <span>Пополнить</span>
            <span>счет</span>
            <span id="topupAmount">10 000 p</span>
          </button>
        </div>
      </div>
    </div>
  `;
  
  openModal(modalContent);
  initializeTopupModal();
}


function openBloggerModal(name, avatar) {
  const modalContent = `
    <div class="blogger-modal">
      <button class="modal-close">&times;</button>
      <div class="blogger-modal-content">
        <div class="blogger-modal-left">
          <div class="blogger-modal-header-left">
            <div class="blogger-name-section-left">
              <span class="blogger-name-left">Александр Рогов</span>
              <div class="blogger-info-tooltip-left">
                <span class="tooltip-icon-left">?</span>
                <div class="tooltip-content-left">
                  <p><strong>Александр Рогов</strong></p>
                  <p>Российский стилист, модельер, телеведущий, продюсер, блогер</p>
                  <p>Ведущий программ «Рогов в городе» и «Модный приговор»</p>
                </div>
              </div>
            </div>
          </div>
          <div class="blogger-modal-avatar">
            <img src="assets/rogov.png" alt="Александр Рогов" style="pointer-events: none;" />
          </div>
        </div>
        
        <div class="blogger-modal-right">
          <div class="blogger-modal-header">
            <h3>Уведомления</h3>
          </div>
          
          <div class="metrics-grid">
            <div class="metric-item">
              <span class="metric-label">Количество товаров:</span>
              <span class="metric-value">XXX</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">Количество партнёрств:</span>
              <span class="metric-value">XXX</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">Среднее количество продаж в месяц:</span>
              <span class="metric-value">XXX</span>
            </div>
          </div>
          
          <div class="blogger-modal-bottom">
            <div class="social-networks-section">
              <h4>Социальные сети</h4>
              <div class="social-buttons">
                <div class="social-btn">VK</div>
                <div class="social-btn">YouTube</div>
                <div class="social-btn">Telegram</div>
              </div>
            </div>
            
            <button class="modal-btn selected-products-btn" onclick="openBloggerProfile()">Выбранные товары</button>
          </div>
        </div>
      </div>
    </div>
  `;
  openModal(modalContent);
}


function openProductModal(name, image) {
  const modalContent = `
    <div class="product-approval-modal">
      <button class="modal-close">&times;</button>
      <div class="product-approval-content">
        <h2>${name}</h2>
        <div class="product-details">
          <div class="product-approval-image">
            <img src="${image}" alt="${name}" />
          </div>
          <div class="product-info">
            <h3 class="product-name">${name}</h3>
            <div class="product-info-single-line">
              <span class="product-price">Цена: 1500 р</span>
              <span class="product-category">Категория: Одежда</span>
            </div>
            <p><strong>Описание:</strong> Стильная футболка для летнего сезона</p>
          </div>
        </div>
        <div class="approval-buttons">
          <button class="approve-btn">Одобрить</button>
          <button class="reject-btn">Отклонить</button>
        </div>
      </div>
    </div>
  `;
  openModal(modalContent);
}


function initializeModalHandlers() {
  
  const topupBtn = document.getElementById('topupBtn');
  if (topupBtn) {
    topupBtn.onclick = showTopupModal;
  }

  
  const currentPage = window.location.pathname.split('/').pop() || 'brand_index.html';
  const isBloggerPage = currentPage.includes('blogger');
  
  
  let activeButton = null;
  
  if (currentPage.includes('stats') && !currentPage.includes('dashboard')) {
    activeButton = document.querySelector('[data-action="stats"]');
  } else if (currentPage.includes('partners')) {
    activeButton = document.querySelector('[data-action="partners"]');
  } else if (currentPage.includes('notifications')) {
    activeButton = document.querySelector('[data-action="notifications"]');
  } else if (currentPage.includes('settings')) {
    activeButton = document.querySelector('[data-action="settings"]');
  } else if (currentPage.includes('index') || currentPage.includes('dashboard')) {
    
    activeButton = null;
  }
  
  
  document.querySelectorAll('.sidebar-buttons button, .sidebar-market button').forEach(btn => {
    btn.classList.remove('active');
  });
  
  if (activeButton) {
    activeButton.classList.add('active');
  }

  
  document.querySelectorAll('.sidebar-buttons button, .sidebar-market button').forEach(btn => {
    btn.onclick = function() {
      
      document.querySelectorAll('.sidebar-buttons button').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.sidebar-market button').forEach(b => b.classList.remove('active'));
      
      this.classList.add('active');
      
      
      const action = this.dataset.action;
      
      if (action === 'stats') {
        if (isBloggerPage) {
          window.location.href = 'blogger_stats.html';
        } else {
          const currentPage = window.location.pathname.split('/').pop();
          if (currentPage === 'brand_partner_stats.html') {
            
            return;
          } else {
            
            window.location.href = 'brand_stats.html';
          }
        }
      } else if (action === 'partners') {
        window.location.href = isBloggerPage ? 'blogger_partners.html' : 'brand_partners.html';
             } else if (action === 'notifications') {
         window.location.href = isBloggerPage ? 'blogger_notifications.html' : 'brand_notifications.html';
       } else if (action === 'contracts') {
         window.location.href = isBloggerPage ? 'blogger_contracts.html' : 'brand_contracts.html';
       } else if (action === 'settings') {
         window.location.href = isBloggerPage ? 'blogger_settings.html' : 'brand_settings.html';
       } else if (action === 'market') {
         
         this.classList.add('active');
         showMarketStub();
       }
    };
  });

  
  const brandLogo = document.querySelector('.brand-logo-img');
  if (brandLogo) {
    brandLogo.onclick = function() {
      window.location.href = 'brand_index.html';
    };
  }

  
  const companyLogo = document.querySelector('.company-logo');
  if (companyLogo) {
    companyLogo.onclick = function() {
      const isBloggerPage = currentPage.includes('blogger');
      window.location.href = isBloggerPage ? 'blogger_dashboard.html' : 'brand_index.html';
    };
  }

  
  document.querySelectorAll('.notifications-tab-btn').forEach(btn => {
    btn.onclick = function() {
      
      document.querySelectorAll('.notifications-tab-btn').forEach(b => b.classList.remove('active'));
      
      this.classList.add('active');
      
      
      const tab = this.dataset.tab;
      console.log('Переключение на вкладку:', tab);
    };
  });
}


function openBloggerProfile() {
  window.location.href = 'brand_blogger_profile.html';
}


function openProductApprovalModal(productName, productImage) {
  const modalContent = `
    <div class="product-approval-modal">
      <button class="modal-close">&times;</button>
      <div class="product-approval-content">
        <h2>Одобрить товар?</h2>
        <div class="product-details">
          <img src="${productImage}" alt="${productName}" class="product-approval-image" />
          <div class="product-info">
            <h3 class="product-name">${productName}</h3>
            <div class="product-info-details">
              <div class="product-price">Цена: 1000 руб.</div>
              <div class="product-category">Категория: Одежда</div>
            </div>
          </div>
        </div>
        <div class="approval-buttons">
          <button class="reject-btn" onclick="rejectProduct('${productName}')">Нет</button>
          <button class="approve-btn" onclick="approveProduct('${productName}')">Да</button>
        </div>
      </div>
    </div>
  `;
  
  openModal(modalContent);
}


function approveProduct(productName) {
  
  const lastAction = {
    type: 'approve',
    productName: productName,
    timestamp: Date.now()
  };
  localStorage.setItem('lastAction', JSON.stringify(lastAction));
  
  
  const floatingUndoContainer = document.querySelector('.floating-undo-container');
  if (floatingUndoContainer) {
    floatingUndoContainer.classList.remove('disabled');
    floatingUndoContainer.classList.add('visible');
  }
  
  
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    const cardName = card.querySelector('.product-info .product-price')?.textContent || '';
    const cardTitle = card.getAttribute('onclick')?.match(/'([^']+)'/)?.[1] || '';
    
    if (cardTitle === productName || cardName.includes(productName)) {
      
      const cardHTML = card.outerHTML;
      localStorage.setItem('removedProductCard', cardHTML);
      
      card.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => {
        card.remove();
      }, 300);
    }
  });
  
  
  showApprovalNotification(productName);
  closeModal();
}


function showApprovalNotification(productName) {
  
  const notification = document.createElement('div');
  notification.className = 'approval-notification';
  notification.id = 'approvalNotification';
  
  let timeLeft = 10;
  
  notification.innerHTML = `
    <div class="approval-notification-content">
      <div class="approval-notification-icon">✓</div>
      <div class="approval-notification-text">
        <div class="approval-notification-title">Товар "${productName}" одобрен!</div>
        <div class="approval-notification-subtitle">Быстрая отмена: <span id="timeLeft">10</span> сек | Основная кнопка работает всегда</div>
      </div>
      <button class="approval-notification-undo" onclick="undoLastAction()">Быстрая отмена</button>
      <button class="approval-notification-close">&times;</button>
    </div>
  `;
  
  
  document.body.appendChild(notification);
  
  
  const closeBtn = notification.querySelector('.approval-notification-close');
  closeBtn.onclick = () => {
    removeApprovalNotification();
  };
  
  
  const undoBtn = notification.querySelector('.approval-notification-undo');
  undoBtn.onclick = () => {
    undoLastAction();
  };
  
  
  const timeLeftElement = notification.querySelector('#timeLeft');
  const countdown = setInterval(() => {
    timeLeft--;
    if (timeLeftElement) {
      timeLeftElement.textContent = timeLeft;
    }
    
    if (timeLeft <= 0) {
      clearInterval(countdown);
      removeApprovalNotification();
    }
  }, 1000);
  
  
  notification.countdown = countdown;
  
  
  setTimeout(() => {
    if (document.body.contains(notification)) {
      clearInterval(countdown);
      removeApprovalNotification();
    }
  }, 10000);
}


function removeApprovalNotification() {
  const notification = document.getElementById('approvalNotification');
  if (notification) {
    
    if (notification.countdown) {
      clearInterval(notification.countdown);
    }
    
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }
}


function undoLastAction() {
  const lastActionData = localStorage.getItem('lastAction');
  if (lastActionData) {
    const lastAction = JSON.parse(lastActionData);
    
   
    if (lastAction.type === 'approve') {
      
      restoreProductCard(lastAction.productName);
      showSimpleNotification(`Действие отменено: товар "${lastAction.productName}" не был одобрен`);
    }
    
   
    localStorage.removeItem('lastAction');
    
    
    removeApprovalNotification();
    
    
    const floatingUndoContainer = document.querySelector('.floating-undo-container');
    if (floatingUndoContainer) {
      floatingUndoContainer.classList.add('disabled');
      floatingUndoContainer.classList.remove('visible');
    }
  } else {
    showSimpleNotification('Нет действий для отмены');
  }
}


function restoreProductCard(productName) {
  const removedCardHTML = localStorage.getItem('removedProductCard');
  if (removedCardHTML) {
    
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = removedCardHTML;
    const restoredCard = tempContainer.firstElementChild;
    
    if (restoredCard) {
      
      const productsGrid = document.querySelector('.products-grid');
      if (productsGrid) {
        
        productsGrid.appendChild(restoredCard);
        
      
        restoredCard.style.animation = 'fadeIn 0.3s ease';
        restoredCard.style.opacity = '0';
        setTimeout(() => {
          restoredCard.style.opacity = '1';
        }, 10);
        
        localStorage.removeItem('removedProductCard');
        showSimpleNotification(`Карточка товара "${productName}" восстановлена`);
      } else {
        showSimpleNotification('Контейнер товаров не найден');
      }
    } else {
      showSimpleNotification('Ошибка при восстановлении карточки товара');
    }
  } else {
    showSimpleNotification(`Карточка товара "${productName}" не найдена для восстановления`);
  }
}


function rejectProduct(productName) {
  showSimpleNotification('Товар отклонен');
  closeModal();
}


function showSimpleNotification(message) {
  
  const notification = document.createElement('div');
  notification.className = 'simple-notification';
  notification.innerHTML = `
    <div class="simple-notification-content">
      <span class="simple-notification-text">${message}</span>
      <button class="simple-notification-close">&times;</button>
    </div>
  `;
  
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #ff8c8c 0%, #ff6c6c 100%);
    color: #fff;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
    max-width: 400px;
  `;
  
  
  document.body.appendChild(notification);
  
  
  const closeBtn = notification.querySelector('.simple-notification-close');
  closeBtn.onclick = () => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  };
  
  
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  }, 5000);
}


const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .simple-notification-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .simple-notification-text {
    flex: 1;
    font-weight: 600;
    font-size: 16px;
  }
  
  .simple-notification-close {
    background: none;
    border: none;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.3s ease;
  }
  
  .simple-notification-close:hover {
    background: rgba(255,255,255,0.2);
  }
`;
document.head.appendChild(notificationStyle);


document.addEventListener('DOMContentLoaded', function() {
  initializeModalHandlers();
  
  
  const currentPage = window.location.pathname.split('/').pop() || 'brand_index.html';
  if (!currentPage.includes('notifications')) {
    const warningBanner = document.querySelector('.alert-warning');
    if (warningBanner) {
      warningBanner.style.cursor = 'pointer';
      warningBanner.onclick = function() {
        showSimpleNotification('Ахуеть что-то важное!');
      };
    }
    
    const updateBanner = document.querySelector('.alert-update');
    if (updateBanner) {
      updateBanner.style.cursor = 'pointer';
      updateBanner.onclick = function() {
        showSimpleNotification('Ахуеть что-то важное!');
      };
    }
  }
}); 