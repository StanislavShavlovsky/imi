document.addEventListener('DOMContentLoaded', function() {
  
  const productPlaceholders = [
    'assets/Group 2087325579.png',
    'assets/brend_logo.png'
  ];
  function getRandomPlaceholder() {
    return productPlaceholders[Math.floor(Math.random() * productPlaceholders.length)];
  }
  const products = [
    {id: 1, name: 'Пиджак Серая Мышь', price: 100, click: 1, transition: 1, img: 'assets/clothes.png'},
    {id: 2, name: 'Пиджак Черный', price: 100, click: 1, transition: 5, img: 'assets/clothes.png'},
    {id: 3, name: 'Пиджак Синий', price: 100, click: 1, transition: 3, img: 'assets/clothes.png'},
    {id: 4, name: 'Пиджак Красный', price: 100, click: 1, transition: 2, img: 'assets/clothes.png'},
    {id: 5, name: 'Пиджак Зеленый', price: 100, click: 1, transition: 4, img: 'assets/clothes.png'},
    {id: 6, name: 'Пиджак Белый', price: 100, click: 1, transition: 1, img: 'assets/clothes.png'},
    {id: 7, name: 'Пиджак Бежевый', price: 100, click: 1, transition: 2, img: 'assets/clothes.png'},
    {id: 8, name: 'Пиджак Коричневый', price: 100, click: 1, transition: 3, img: 'assets/clothes.png'},
    
  ];


  function getProducts() {
    return JSON.parse(localStorage.getItem('products') || '[]');
  }
  function setProducts(arr) {
    localStorage.setItem('products', JSON.stringify(arr));
  }


  function renderCatalog() {
    const catalog = document.getElementById('catalog');
    if (!catalog) return;
    const products = getProducts();
    catalog.innerHTML = '';
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="product-image-box">
          <img src="${product.img}" alt="${product.name}" onerror="this.onerror=null;this.src='${getRandomPlaceholder()}'">
          <div class="product-pink-bar"></div>
        </div>
        <div class="product-info">
          ${product.name ? product.name + '<br>' : ''}
          Цена товара: ${product.price} руб.<br>
          Цена перехода: ${product.transition} руб.<br>
          Цена клика: ${product.click} руб.
        </div>
      `;
      card.addEventListener('click', () => openProductModal(product));
      catalog.appendChild(card);
    });
  }




  function openProductModal(product) {
    const modalContent = `
      <div class="add-modal">
        <button class="modal-close">&times;</button>
        <div class="modal-content">
          <div class="add-modal-grid">
            <div class="add-modal-photo-col">
              <div class="add-modal-photo-box">
                <img src="${product.img}" class="add-modal-photo-img" alt="${product.name}" style="display:block;">
              </div>
            </div>
            <div class="add-modal-vertical-bar"></div>
            <div class="add-modal-fields-col" style="align-items:flex-start;">
              <div style="font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 16px; text-align:left;">${product.name}</div>
              <div class="auto-field" style="font-size:18px; margin-bottom:10px;">Цена товара<br><span style='font-size:20px;'>${product.price} руб.</span></div>
              <div class="auto-field" style="font-size:18px; margin-bottom:10px;">Цена клика<br><span style='font-size:20px;'>${product.click} руб.</span></div>
              <div class="auto-field" style="font-size:18px; margin-bottom:24px;">Цена перехода<br><span style='font-size:20px;'>${product.transition} руб.</span></div>
              <button class="modal-btn" id="deleteProductBtn" style="width:180px;">Удалить товар</button>
            </div>
          </div>
        </div>
      </div>
    `;
    openModal(modalContent);
    

    setTimeout(() => {
      const deleteBtn = document.getElementById('deleteProductBtn');
      if (deleteBtn) {
        deleteBtn.onclick = function() {
          let products = getProducts();
          products = products.filter(p => p.id !== product.id);
          setProducts(products);
          renderCatalog();
          closeModal();
        };
      }
    }, 100);
  }


  const addProductBtn = document.getElementById('addProductBtn');
  if (addProductBtn) {
    addProductBtn.onclick = function() {
      let previewImg = '';
      const modalContent = `
        <div class="add-modal">
          <button class="modal-close">&times;</button>
          <div class="modal-content">
            <form id="addProductForm" autocomplete="off">
              <div class="add-modal-grid">
                <div class="add-modal-photo-col">
                  <div class="add-modal-photo-box" id="photoBox">
                    <img id="addProductImgPreview" class="add-modal-photo-img" style="display:none;" alt="Фото товара">
                  </div>
                  <input type="file" id="addProductImg" accept="image/*" style="display:none;">
                </div>
                <div class="add-modal-vertical-bar"></div>
                <div class="add-modal-fields-col">
                  <label for="addProductName">Название</label>
                  <input type="text" id="addProductName" name="name" required placeholder="Введите название">
                  <label for="addProductPrice">Цена товара</label>
                  <input type="text" pattern="[0-9]*" inputmode="numeric" id="addProductPrice" name="price" required placeholder="Введите цену">
                  <div class="auto-field">Цена клика: <span id="autoClick">0</span> руб.</div>
                  <div class="auto-field">Цена перехода: <span id="autoTransition">0</span> руб.</div>
                  <button class="modal-btn" type="submit">Добавить товар</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      `;
      openModal(modalContent);

      const imgInput = document.getElementById('addProductImg');
      const imgPreview = document.getElementById('addProductImgPreview');
      const photoBox = document.getElementById('photoBox');
      imgPreview.style.pointerEvents = 'none';
      photoBox.onclick = function() {
        imgInput.click();
      };
      imgInput.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(ev) {
            imgPreview.src = ev.target.result;
            imgPreview.style.display = 'block';
            previewImg = ev.target.result;
          };
          reader.readAsDataURL(file);
        }
      };

      const priceInput = document.getElementById('addProductPrice');
      const autoClick = document.getElementById('autoClick');
      const autoTransition = document.getElementById('autoTransition');
      priceInput.oninput = function() {

        priceInput.value = priceInput.value.replace(/[^0-9]/g, '');
        const price = parseFloat(priceInput.value) || 0;
        autoClick.textContent = (price * 0.0001).toFixed(2);
        autoTransition.textContent = (price * 0.0005).toFixed(2);
      };
      document.getElementById('addProductForm').onsubmit = function(e) {
        e.preventDefault();
        const products = getProducts();
        const form = e.target;
        const newId = Date.now();
        const price = parseFloat(form.price.value) || 0;
        const newProduct = {
          id: newId,
          name: form.name.value,
          price: price,
          transition: (price * 0.0005).toFixed(2),
          click: (price * 0.0001).toFixed(2),
          img: previewImg || 'assets/clothes.png'
        };
        products.unshift(newProduct);
        setProducts(products);
        renderCatalog();
        closeModal();
      };
    };
  }


  renderCatalog();


  document.querySelectorAll('.sidebar-buttons button').forEach(btn => {

    if (btn.dataset.action === 'stats') {
      btn.onclick = function() { window.location.href = 'brand_stats.html'; };
    }

    else if (btn.dataset.action === 'partners') {
      btn.onclick = function() { window.location.href = 'brand_partners.html'; };
    }

    else if (btn.dataset.action === 'notifications') {
      btn.onclick = function() { window.location.href = 'brand_notifications.html'; };
    }

    else if (btn.dataset.action === 'contracts') {
      btn.onclick = function() { 
        openModal(`
          <div class="contracts-stub-modal">
            <button class="modal-close">&times;</button>
            <div class="contracts-stub-content">
              <div class="contracts-stub-icon">📋</div>
              <h2>Контракты</h2>
              <p>Контракты пока в разработке! Скоро здесь появится возможность управления договорами и соглашениями.</p>
            </div>
          </div>
        `);
      };
    }

    else if (btn.dataset.action === 'settings') {
      btn.onclick = function() { window.location.href = 'brand_settings.html'; };
    }

    else if (!btn.disabled) {
      btn.onclick = () => alert('Заглушка: ' + btn.textContent);
    }
  });


  const topupBtn = document.getElementById('topupBtn');
  if (topupBtn) {
    topupBtn.onclick = function() {
      openModal(`
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
      `);
      
   
      initializeTopupModal();
    };
  }
  
  function initializeTopupModal() {
    let currentAmount = 10000;
    let isIndividual = true;
    
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
      amountDisplay.textContent = formattedAmount;
      topupAmount.textContent = formattedAmount;
    }
    
    function updateEntityType() {
      if (isIndividual) {
        individualBtn.classList.add('active');
        legalBtn.classList.remove('active');
        payerName.textContent = 'Иванов Иван Иванович';
      } else {
        legalBtn.classList.add('active');
        individualBtn.classList.remove('active');
        payerName.textContent = 'По счету';
      }
    }
    
    
    minusBtn.onclick = function() {
      if (currentAmount > 1000) {
        currentAmount -= 1000;
        updateAmount();
      }
    };
    
    plusBtn.onclick = function() {
      currentAmount += 1000;
      updateAmount();
    };
    
    
    individualBtn.onclick = function() {
      isIndividual = true;
      updateEntityType();
    };
    
    legalBtn.onclick = function() {
      isIndividual = false;
      updateEntityType();
    };
    
    
    topupActionBtn.onclick = function() {
      
      alert(`Баланс пополнен на ${currentAmount.toLocaleString('ru-RU')} рублей (заглушка)`);
      closeModal();
    };
    
   
    updateAmount();
    updateEntityType();
  }
  
  
  function showMarketStub() {
    openModal(`
      <div class="market-stub-modal">
        <button class="modal-close">&times;</button>
        <div class="market-stub-content">
          <div class="market-stub-icon">🛒</div>
          <h2>Маркет</h2>
          <p>Маркет пока в разработке! Скоро здесь появится возможность покупать товары и услуги.</p>
        </div>
      </div>
    `);
  }
  

});