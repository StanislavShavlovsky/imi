document.addEventListener('DOMContentLoaded', function() {
    const openBtn = document.getElementById('openChatBtn');
    const modal = document.getElementById('chatModal');
    const overlay = document.getElementById('chatModalOverlay');
  
    if (!openBtn || !modal || !overlay) return;
  
    function renderChat() {
      modal.innerHTML = `
        <div class="chat-header">
          <div style="display:flex;align-items:center;">
            <span class="avatar"></span>
            <span class="name">Александр Рогов</span>
          </div>
          <button class="close-btn" id="closeChatBtn">&times;</button>
        </div>
        <div class="chat-messages" id="chatMessages">
          <div class="chat-message">
            <div class="chat-bubble">xxx</div>
          </div>
          <div class="chat-message">
            <div class="chat-bubble">xxxxxxx</div>
          </div>
          <div class="chat-message user">
            <div class="chat-bubble">xxxxxxxxxx</div>
          </div>
        </div>
        <div class="chat-input-row">
          <textarea class="chat-input" id="chatInput" placeholder="Введите сообщение..."></textarea>
          <button class="chat-send-btn" id="sendChatBtn">⮞</button>
        </div>
        <div class="chat-actions">
          <button class="chat-action-btn">Остановить сотрудничество</button>
          <button class="chat-action-btn">Согласовать новые условия</button>
          <button class="chat-action-btn">Вызвать модератора</button>
        </div>
      `;
    }
  
    function openChat() {
      renderChat();
      modal.style.display = 'block';
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
  
      document.getElementById('closeChatBtn').onclick = closeChat;
      overlay.onclick = closeChat;
  
      
      document.getElementById('sendChatBtn').onclick = function() {
        const input = document.getElementById('chatInput');
        const text = input.value.trim();
        if (!text) return;
        const msg = document.createElement('div');
        msg.className = 'chat-message user';
        msg.innerHTML = `<div class="chat-bubble">${text}</div>`;
        document.getElementById('chatMessages').appendChild(msg);
        input.value = '';
        setTimeout(() => {
          document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
        }, 50);
      };
    }
  
    function closeChat() {
      modal.style.display = 'none';
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }
  
    openBtn.onclick = openChat;
  });