/* ============================================
   HELP DESK PI IV — Componentes de Renderização
   Todas as views e componentes reutilizáveis
   ============================================ */

// ── Ícones SVG (Lucide-style) ──
const Icons = {
  headphones: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>',
  layoutDashboard: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>',
  ticket: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>',
  settings: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
  search: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  bell: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
  sun: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
  moon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
  plus: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
  edit: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>',
  eye: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>',
  trash: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>',
  x: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  chevronLeft: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
  chevronRight: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
  chevronsSort: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>',
  arrowUp: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>',
  arrowDown: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>',
  trendingUp: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
  trendingDown: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>',
  clipboardList: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>',
  alertCircle: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>',
  loader: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>',
  checkCircle: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>',
  xCircle: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',
  info: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
  menu: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>',
  user: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  calendar: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',
  clock: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  tag: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>',
  messageSquare: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  arrowLeft: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
  inbox: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
  shieldCheck: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>',
};

// ── Componente: Sidebar ──
function renderSidebar() {
  const stats = getDashboardStats();
  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar__logo">
        <div class="sidebar__logo-icon">${Icons.headphones}</div>
        <div class="sidebar__logo-text">Help<span>Desk</span></div>
      </div>


      <nav class="sidebar__nav">
        <div class="sidebar__section-title">Principal</div>
        <a class="sidebar__link active" data-route="dashboard" href="#dashboard">
          <span class="sidebar__link-icon">${Icons.layoutDashboard}</span>
          <span class="sidebar__link-text">Dashboard</span>
        </a>
        <a class="sidebar__link" data-route="chamados" href="#chamados">
          <span class="sidebar__link-icon">${Icons.ticket}</span>
          <span class="sidebar__link-text">Chamados</span>
          <span class="sidebar__link-badge">${stats.total}</span>
        </a>
        
        <div class="sidebar__section-title">Sistema</div>
        <a class="sidebar__link" data-route="configuracoes" href="#configuracoes">
          <span class="sidebar__link-icon">${Icons.settings}</span>
          <span class="sidebar__link-text">Configurações</span>
        </a>
      </nav>

      <div class="sidebar__footer">
        <div class="sidebar__user" id="sidebarUser">
          <div class="sidebar__user-avatar">${CURRENT_USER.iniciais}</div>
          <div class="sidebar__user-info">
            <div class="sidebar__user-name">${CURRENT_USER.nome}</div>
            <div class="sidebar__user-role">${CURRENT_USER.cargo}</div>
          </div>
        </div>
      </div>
    </aside>
  `;
}

// ── Componente: Header ──
function renderHeader(breadcrumbs) {
  const themeIcon = ThemeManager.isDark() ? Icons.sun : Icons.moon;
  const unreadCount = getUnreadNotificationsCount();
  return `
    <header class="header">
      <div class="header__left">
        <button class="mobile-menu-btn" id="mobileMenuBtn" title="Menu">
          ${Icons.menu}
        </button>
        <div class="header__breadcrumb">
          ${breadcrumbs.map((b, i) => {
            if (i === breadcrumbs.length - 1) {
              return `<span class="header__breadcrumb-current">${b}</span>`;
            }
            return `<span>${b}</span><span class="header__breadcrumb-separator">/</span>`;
          }).join('')}
        </div>
      </div>
      <div class="header__right">
        <div class="header__search">
          <span class="header__search-icon">${Icons.search}</span>
          <input type="text" class="header__search-input" id="globalSearch" placeholder="Buscar chamados..." autocomplete="off">
        </div>
        <button class="header__icon-btn" id="themeToggleBtn" title="Alternar tema">
          ${themeIcon}
        </button>
        <div class="header__dropdown-wrapper">
          <button class="header__icon-btn" id="notificationsBtn" title="Notificações">
            ${Icons.bell}
            ${unreadCount > 0 ? '<span class="notification-dot"></span>' : ''}
          </button>
          <div class="header__dropdown header__dropdown--notifications" id="notificationsDropdown">
            <div class="dropdown__header">
              <h3 class="dropdown__title">Notificações</h3>
              ${unreadCount > 0 ? `<button class="dropdown__action" id="markAllReadBtn">${unreadCount} não lida${unreadCount > 1 ? 's' : ''} — Marcar todas</button>` : '<span class="dropdown__action-muted">Tudo lido</span>'}
            </div>
            <div class="dropdown__list" id="notificationsList">
              ${renderNotificationsList()}
            </div>
          </div>
        </div>
        <div class="header__dropdown-wrapper">
          <div class="header__avatar" id="profileBtn" title="${CURRENT_USER.nome}">${CURRENT_USER.iniciais}</div>
          <div class="header__dropdown header__dropdown--profile" id="profileDropdown">
            <div class="dropdown__profile-header">
              <div class="dropdown__profile-avatar">${CURRENT_USER.iniciais}</div>
              <div class="dropdown__profile-info">
                <div class="dropdown__profile-name">${CURRENT_USER.nome}</div>
                <div class="dropdown__profile-email">${CURRENT_USER.email}</div>
              </div>
            </div>
            <div class="dropdown__divider"></div>
            <div class="dropdown__menu">
              <button class="dropdown__menu-item" id="profileGoSettings">
                ${Icons.settings}
                <span>Configurações</span>
              </button>
              <button class="dropdown__menu-item" id="profileGoUser">
                ${Icons.user}
                <span>Meu Perfil</span>
              </button>
            </div>
            <div class="dropdown__divider"></div>
            <div class="dropdown__footer">
              <span class="dropdown__footer-role">${Icons.shieldCheck} ${CURRENT_USER.perfil === 'admin' ? 'Administrador' : CURRENT_USER.perfil === 'tecnico' ? 'Técnico' : 'Usuário'}</span>
              <span class="dropdown__footer-dept">${CURRENT_USER.departamento}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;
}

// ── Componente: Lista de Notificações ──
function renderNotificationsList() {
  if (notificacoes.length === 0) {
    return `<div class="dropdown__empty">
      ${Icons.bell}
      <p>Nenhuma notificação</p>
    </div>`;
  }

  const notifIconMap = {
    chamado_novo: Icons.plus,
    status_alterado: Icons.tag,
    comentario: Icons.messageSquare,
    atribuicao: Icons.user,
    sla_alerta: Icons.alertCircle,
    resolvido: Icons.checkCircle
  };

  const notifColorMap = {
    chamado_novo: 'notif--info',
    status_alterado: 'notif--warning',
    comentario: 'notif--primary',
    atribuicao: 'notif--primary',
    sla_alerta: 'notif--danger',
    resolvido: 'notif--success'
  };

  return notificacoes
    .sort((a, b) => new Date(b.criadaEm) - new Date(a.criadaEm))
    .map(n => `
      <div class="dropdown__notif-item ${n.lida ? '' : 'dropdown__notif-item--unread'}" data-notif-id="${n.id}" data-chamado-id="${n.chamadoId}">
        <div class="dropdown__notif-icon ${notifColorMap[n.tipo] || 'notif--primary'}">
          ${notifIconMap[n.tipo] || Icons.bell}
        </div>
        <div class="dropdown__notif-content">
          <div class="dropdown__notif-title">${n.titulo}</div>
          <p class="dropdown__notif-message">${n.mensagem}</p>
          <span class="dropdown__notif-time">${formatTimeAgo(n.criadaEm)}</span>
        </div>
        ${!n.lida ? '<div class="dropdown__notif-unread-dot"></div>' : ''}
      </div>
    `).join('');
}


// ── View: Dashboard ──
function renderDashboard() {
  const stats = getDashboardStats();
  const recentChamados = [...chamados]
    .sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm))
    .slice(0, 5);

  return `
    <div class="page-transition-enter">
      <div class="page-header">
        <div>
          <h1 class="page-header__title">Dashboard</h1>
          <p class="page-header__subtitle" style="margin-bottom:0">Visão geral dos chamados do sistema</p>
        </div>
      </div>

      <!-- Stat Cards -->
      <div class="stats-grid">
        <div class="stat-card" style="--stat-accent: var(--purple-500)">
          <div class="stat-card__info">
            <span class="stat-card__label">Total de Chamados</span>
            <span class="stat-card__value">${stats.total}</span>
            <span class="stat-card__trend up">${Icons.trendingUp} +12%</span>
          </div>
          <div class="stat-card__icon" style="--stat-icon-bg: var(--color-primary-light); --stat-icon-color: var(--color-primary)">
            ${Icons.clipboardList}
          </div>
        </div>
        <div class="stat-card" style="--stat-accent: var(--status-open)">
          <div class="stat-card__info">
            <span class="stat-card__label">Abertos</span>
            <span class="stat-card__value">${stats.abertos}</span>
            <span class="stat-card__trend up">${Icons.trendingUp} +3</span>
          </div>
          <div class="stat-card__icon" style="--stat-icon-bg: var(--status-open-bg); --stat-icon-color: var(--status-open)">
            ${Icons.inbox}
          </div>
        </div>
        <div class="stat-card" style="--stat-accent: var(--status-progress)">
          <div class="stat-card__info">
            <span class="stat-card__label">Em Andamento</span>
            <span class="stat-card__value">${stats.emAndamento}</span>
          </div>
          <div class="stat-card__icon" style="--stat-icon-bg: var(--status-progress-bg); --stat-icon-color: var(--status-progress)">
            ${Icons.loader}
          </div>
        </div>
        <div class="stat-card" style="--stat-accent: var(--status-resolved)">
          <div class="stat-card__info">
            <span class="stat-card__label">Resolvidos</span>
            <span class="stat-card__value">${stats.resolvidos}</span>
            <span class="stat-card__trend up">${Icons.trendingUp} +5</span>
          </div>
          <div class="stat-card__icon" style="--stat-icon-bg: var(--status-resolved-bg); --stat-icon-color: var(--status-resolved)">
            ${Icons.shieldCheck}
          </div>
        </div>
      </div>

      <!-- Chart + Recent -->
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap: var(--space-6);">
        <!-- Distribution Chart -->
        <div class="detail-card">
          <div class="detail-card__header">
            <h3 class="detail-card__title">Distribuição por Status</h3>
          </div>
          <div class="detail-card__body">
            <div class="chart-bar-group">
              ${renderChartBar('Abertos', stats.abertos, stats.total, 'var(--status-open)')}
              ${renderChartBar('Em Andamento', stats.emAndamento, stats.total, 'var(--status-progress)')}
              ${renderChartBar('Pendentes', stats.pendentes, stats.total, 'var(--status-pending)')}
              ${renderChartBar('Resolvidos', stats.resolvidos, stats.total, 'var(--status-resolved)')}
              ${renderChartBar('Fechados', stats.fechados, stats.total, 'var(--status-closed)')}
            </div>
          </div>
        </div>

        <!-- Recent Tickets -->
        <div class="detail-card">
          <div class="detail-card__header">
            <h3 class="detail-card__title">Chamados Recentes</h3>
            <a href="#chamados" class="btn btn-ghost btn-sm">Ver todos</a>
          </div>
          <div class="detail-card__body" style="padding:0;">
            <table class="data-table">
              <tbody>
                ${recentChamados.map(c => {
                  const status = getStatusById(c.status);
                  return `
                    <tr>
                      <td class="table-cell-id">#${String(c.id).padStart(4, '0')}</td>
                      <td class="table-cell-title">
                        <a href="#chamado/${c.id}" class="truncate" style="display:block;max-width:220px;">${c.titulo}</a>
                      </td>
                      <td><span class="badge ${status.classe}"><span class="badge-dot"></span>${status.nome}</span></td>
                      <td class="table-cell-date">${formatTimeAgo(c.criadoEm)}</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderChartBar(label, value, total, color) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return `
    <div class="chart-bar-item">
      <span class="chart-bar-item__label">${label}</span>
      <div class="chart-bar-item__track">
        <div class="chart-bar-item__fill" style="width:${pct}%; background:${color};">
          ${pct > 10 ? pct + '%' : ''}
        </div>
      </div>
      <span class="chart-bar-item__value">${value}</span>
    </div>
  `;
}

// ── View: Lista de Chamados ──
function renderChamadosList(filteredData) {
  const data = filteredData || chamados;

  return `
    <div class="page-transition-enter">
      <div class="page-header">
        <div>
          <h1 class="page-header__title">Chamados</h1>
          <p class="page-header__subtitle" style="margin-bottom:0">Gerencie todos os chamados do sistema</p>
        </div>
        <button class="btn btn-primary" id="btnNovoChamado">
          ${Icons.plus} Novo Chamado
        </button>
      </div>

      <div class="table-container">
        <div class="table-toolbar">
          <div class="table-toolbar__filters">
            <div class="table-toolbar__search">
              <span class="table-toolbar__search-icon">${Icons.search}</span>
              <input type="text" class="table-toolbar__search-input" id="searchChamados" placeholder="Buscar por título ou ID...">
            </div>
            <select class="filter-select" id="filterStatus">
              <option value="">Todos os Status</option>
              ${STATUS_LIST.map(s => `<option value="${s.id}">${s.nome}</option>`).join('')}
            </select>
            <select class="filter-select" id="filterPrioridade">
              <option value="">Todas as Prioridades</option>
              ${PRIORIDADES.map(p => `<option value="${p.id}">${p.nome}</option>`).join('')}
            </select>
            <select class="filter-select" id="filterCategoria">
              <option value="">Todas as Categorias</option>
              ${CATEGORIAS.map(c => `<option value="${c.id}">${c.nome}</option>`).join('')}
            </select>
          </div>
        </div>

        ${data.length > 0 ? `
          <div style="overflow-x:auto;">
            <table class="data-table" id="chamadosTable">
              <thead>
                <tr>
                  <th data-sort="id">ID <span class="sort-icon">${Icons.chevronsSort}</span></th>
                  <th data-sort="titulo">Título <span class="sort-icon">${Icons.chevronsSort}</span></th>
                  <th data-sort="status">Status <span class="sort-icon">${Icons.chevronsSort}</span></th>
                  <th data-sort="prioridade">Prioridade <span class="sort-icon">${Icons.chevronsSort}</span></th>
                  <th>Categoria</th>
                  <th>Solicitante</th>
                  <th>Técnico</th>
                  <th data-sort="criadoEm">Data <span class="sort-icon">${Icons.chevronsSort}</span></th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                ${data.map(c => renderChamadoRow(c)).join('')}
              </tbody>
            </table>
          </div>
          ${renderPagination(data.length)}
        ` : `
          <div class="table-empty">
            <div class="table-empty__icon">${Icons.inbox}</div>
            <h3 class="table-empty__title">Nenhum chamado encontrado</h3>
            <p class="table-empty__text">Tente ajustar os filtros ou crie um novo chamado.</p>
            <button class="btn btn-primary" id="btnNovoChamadoEmpty">
              ${Icons.plus} Novo Chamado
            </button>
          </div>
        `}
      </div>
    </div>
  `;
}

function renderChamadoRow(c) {
  const status = getStatusById(c.status);
  const prioridade = getPrioridadeById(c.prioridade);
  const categoria = getCategoriaById(c.categoria);
  const solicitante = getUserById(c.solicitanteId);
  const tecnico = getUserById(c.tecnicoId);

  return `
    <tr data-chamado-id="${c.id}">
      <td class="table-cell-id">#${String(c.id).padStart(4, '0')}</td>
      <td class="table-cell-title">
        <a href="#chamado/${c.id}">${c.titulo}</a>
      </td>
      <td>
        <span class="badge ${status.classe}">
          <span class="badge-dot"></span>
          ${status.nome}
        </span>
      </td>
      <td>
        <span class="badge ${prioridade.classe}">${prioridade.nome}</span>
      </td>
      <td style="font-size:var(--text-sm); color:var(--color-text-secondary)">${categoria ? categoria.nome : '-'}</td>
      <td>
        ${solicitante ? `
          <div class="table-cell-user">
            <div class="table-cell-user__avatar">${solicitante.iniciais}</div>
            <span style="font-size:var(--text-sm)">${solicitante.nome.split(' ')[0]}</span>
          </div>
        ` : '-'}
      </td>
      <td>
        ${tecnico ? `
          <div class="table-cell-user">
            <div class="table-cell-user__avatar">${tecnico.iniciais}</div>
            <span style="font-size:var(--text-sm)">${tecnico.nome.split(' ')[0]}</span>
          </div>
        ` : '<span style="font-size:var(--text-sm);color:var(--color-text-tertiary)">Não atribuído</span>'}
      </td>
      <td class="table-cell-date">${formatDate(c.criadoEm)}</td>
      <td>
        <div class="table-actions">
          <button class="btn-icon" title="Visualizar" onclick="App.viewChamado(${c.id})">
            ${Icons.eye}
          </button>
          <button class="btn-icon" title="Editar" onclick="App.editChamado(${c.id})">
            ${Icons.edit}
          </button>
          <button class="btn-icon danger" title="Excluir" onclick="App.confirmDeleteChamado(${c.id})">
            ${Icons.trash}
          </button>
        </div>
      </td>
    </tr>
  `;
}

function renderPagination(total) {
  const perPage = 10;
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return '';

  return `
    <div class="pagination">
      <span class="pagination__info">Mostrando ${Math.min(total, perPage)} de ${total} chamados</span>
      <div class="pagination__controls">
        <button class="pagination__btn" disabled title="Anterior">${Icons.chevronLeft}</button>
        ${Array.from({length: totalPages}, (_, i) => `
          <button class="pagination__btn ${i === 0 ? 'active' : ''}">${i + 1}</button>
        `).join('')}
        <button class="pagination__btn" ${totalPages <= 1 ? 'disabled' : ''} title="Próximo">${Icons.chevronRight}</button>
      </div>
    </div>
  `;
}

// ── View: Detalhe do Chamado ──
function renderChamadoDetail(id) {
  const chamado = chamados.find(c => c.id === parseInt(id));
  if (!chamado) {
    return `
      <div class="page-transition-enter" style="text-align:center; padding:var(--space-16);">
        <div style="font-size:48px; margin-bottom:var(--space-4); opacity:0.3;">${Icons.alertCircle}</div>
        <h2>Chamado não encontrado</h2>
        <p style="color:var(--color-text-secondary)">O chamado #${id} não existe ou foi removido.</p>
        <a href="#chamados" class="btn btn-primary" style="margin-top:var(--space-4);">${Icons.arrowLeft} Voltar aos chamados</a>
      </div>
    `;
  }

  const status = getStatusById(chamado.status);
  const prioridade = getPrioridadeById(chamado.prioridade);
  const categoria = getCategoriaById(chamado.categoria);
  const solicitante = getUserById(chamado.solicitanteId);
  const tecnico = getUserById(chamado.tecnicoId);

  return `
    <div class="page-transition-enter">
      <div class="page-header">
        <div style="display:flex; align-items:center; gap:var(--space-3);">
          <a href="#chamados" class="btn btn-ghost btn-icon" title="Voltar">${Icons.arrowLeft}</a>
          <div>
            <h1 class="page-header__title">Chamado #${String(chamado.id).padStart(4, '0')}</h1>
            <p class="page-header__subtitle" style="margin-bottom:0">Aberto em ${formatDateTime(chamado.criadoEm)}</p>
          </div>
        </div>
        <div style="display:flex; gap:var(--space-2);">
          <button class="btn btn-secondary" onclick="App.editChamado(${chamado.id})">${Icons.edit} Editar</button>
          <button class="btn btn-danger" onclick="App.confirmDeleteChamado(${chamado.id})">${Icons.trash} Excluir</button>
        </div>
      </div>

      <div class="ticket-detail">
        <div class="ticket-detail__main">
          <!-- Ticket Header -->
          <div class="ticket-header">
            <div class="ticket-header__top">
              <div>
                <span class="ticket-header__id">#${String(chamado.id).padStart(4, '0')}</span>
                <h2 class="ticket-header__title">${chamado.titulo}</h2>
              </div>
              <div class="ticket-header__badges">
                <span class="badge ${status.classe}"><span class="badge-dot"></span>${status.nome}</span>
                <span class="badge ${prioridade.classe}">${prioridade.nome}</span>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="detail-card">
            <div class="detail-card__header">
              <h3 class="detail-card__title">Descrição</h3>
            </div>
            <div class="detail-card__body">
              <p style="margin-bottom:0; line-height:1.7; color:var(--color-text-secondary)">${chamado.descricao}</p>
            </div>
          </div>

          <!-- Timeline -->
          <div class="detail-card">
            <div class="detail-card__header">
              <h3 class="detail-card__title">Atividade</h3>
            </div>
            <div class="detail-card__body">
              <div class="timeline">
                ${chamado.timeline.map(item => {
                  const autor = getUserById(item.autorId);
                  let icon = Icons.messageSquare;
                  if (item.tipo === 'criacao') icon = Icons.plus;
                  if (item.tipo === 'status') icon = Icons.checkCircle;
                  if (item.tipo === 'atribuicao') icon = Icons.user;

                  return `
                    <div class="timeline-item">
                      <div class="timeline-item__dot">${icon}</div>
                      <div class="timeline-item__content">
                        <div class="timeline-item__header">
                          <span class="timeline-item__author">${autor ? autor.nome : 'Sistema'}</span>
                          <span class="timeline-item__time">${formatDateTime(item.data)}</span>
                        </div>
                        <div class="timeline-item__body">${item.mensagem}</div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="ticket-detail__sidebar">
          <div class="detail-card">
            <div class="detail-card__header">
              <h3 class="detail-card__title">Informações</h3>
            </div>
            <div class="detail-card__body">
              <div class="info-list">
                <div class="info-item">
                  <span class="info-item__icon">${Icons.user}</span>
                  <div class="info-item__content">
                    <span class="info-item__label">Solicitante</span>
                    <span class="info-item__value">${solicitante ? solicitante.nome : '-'}</span>
                  </div>
                </div>
                <div class="info-item">
                  <span class="info-item__icon">${Icons.user}</span>
                  <div class="info-item__content">
                    <span class="info-item__label">Técnico Responsável</span>
                    <span class="info-item__value">${tecnico ? tecnico.nome : 'Não atribuído'}</span>
                  </div>
                </div>
                <div class="info-item">
                  <span class="info-item__icon">${Icons.tag}</span>
                  <div class="info-item__content">
                    <span class="info-item__label">Categoria</span>
                    <span class="info-item__value">${categoria ? categoria.nome : '-'}</span>
                  </div>
                </div>
                <div class="info-item">
                  <span class="info-item__icon">${Icons.calendar}</span>
                  <div class="info-item__content">
                    <span class="info-item__label">Criado em</span>
                    <span class="info-item__value">${formatDateTime(chamado.criadoEm)}</span>
                  </div>
                </div>
                <div class="info-item">
                  <span class="info-item__icon">${Icons.clock}</span>
                  <div class="info-item__content">
                    <span class="info-item__label">Última Atualização</span>
                    <span class="info-item__value">${formatDateTime(chamado.atualizadoEm)}</span>
                  </div>
                </div>
                <div class="info-item">
                  <span class="info-item__icon">${Icons.clock}</span>
                  <div class="info-item__content">
                    <span class="info-item__label">SLA</span>
                    <span class="info-item__value">${formatDateTime(chamado.sla)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="detail-card">
            <div class="detail-card__header">
              <h3 class="detail-card__title">Ações Rápidas</h3>
            </div>
            <div class="detail-card__body" style="display:flex; flex-direction:column; gap:var(--space-2);">
              <select class="form-select" id="quickStatusChange" onchange="App.quickStatusChange(${chamado.id}, this.value)">
                <option value="" disabled selected>Alterar Status...</option>
                ${STATUS_LIST.map(s => `<option value="${s.id}" ${s.id === chamado.status ? 'disabled' : ''}>${s.nome}</option>`).join('')}
              </select>
              <select class="form-select" id="quickTecnicoChange" onchange="App.quickTecnicoChange(${chamado.id}, this.value)">
                <option value="" disabled selected>Atribuir Técnico...</option>
                ${USERS.filter(u => u.perfil === 'tecnico' || u.perfil === 'admin').map(u => `<option value="${u.id}" ${u.id === chamado.tecnicoId ? 'disabled' : ''}>${u.nome}</option>`).join('')}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ── View: Configurações ──
function renderConfiguracoes() {
  const currentTheme = ThemeManager.getTheme();

  return `
    <div class="page-transition-enter">
      <div class="page-header">
        <div>
          <h1 class="page-header__title">Configurações</h1>
          <p class="page-header__subtitle" style="margin-bottom:0">Personalize sua experiência no sistema</p>
        </div>
      </div>

      <div class="settings-grid">
        <!-- Aparência -->
        <div class="settings-card">
          <div class="settings-card__header">
            <h3 class="settings-card__title">Aparência</h3>
            <p class="settings-card__desc">Escolha o tema de sua preferência</p>
          </div>
          <div class="settings-card__body">
            <div class="theme-switcher">
              <label class="theme-option theme-option--light">
                <input type="radio" name="theme" value="light" ${currentTheme === 'light' ? 'checked' : ''} onchange="App.changeTheme('light')">
                <div class="theme-option__preview">
                  <div class="theme-option__preview-mock">
                    <div class="theme-option__preview-mock-sidebar"></div>
                    <div class="theme-option__preview-mock-content"></div>
                  </div>
                </div>
                <div class="theme-option__label">${Icons.sun} Claro</div>
              </label>
              <label class="theme-option theme-option--dark">
                <input type="radio" name="theme" value="dark" ${currentTheme === 'dark' ? 'checked' : ''} onchange="App.changeTheme('dark')">
                <div class="theme-option__preview">
                  <div class="theme-option__preview-mock">
                    <div class="theme-option__preview-mock-sidebar"></div>
                    <div class="theme-option__preview-mock-content"></div>
                  </div>
                </div>
                <div class="theme-option__label">${Icons.moon} Escuro</div>
              </label>
            </div>
          </div>
        </div>

        <!-- Perfil -->
        <div class="settings-card">
          <div class="settings-card__header">
            <h3 class="settings-card__title">Perfil</h3>
            <p class="settings-card__desc">Informações da sua conta</p>
          </div>
          <div class="settings-card__body">
            <div class="profile-info">
              <div class="profile-avatar">${CURRENT_USER.iniciais}</div>
              <div class="profile-details">
                <div class="profile-name">${CURRENT_USER.nome}</div>
                <div class="profile-role">${CURRENT_USER.cargo}</div>
                <div class="profile-email">${CURRENT_USER.email}</div>
              </div>
            </div>
            <div style="margin-top:var(--space-5); display:grid; grid-template-columns:1fr 1fr; gap:var(--space-4);">
              <div>
                <span class="info-item__label">Departamento</span>
                <span class="info-item__value">${CURRENT_USER.departamento}</span>
              </div>
              <div>
                <span class="info-item__label">Perfil</span>
                <span class="info-item__value" style="text-transform:capitalize">${CURRENT_USER.perfil === 'admin' ? 'Administrador' : CURRENT_USER.perfil === 'tecnico' ? 'Técnico' : 'Usuário'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ── Modal: Criar/Editar Chamado ──
function renderChamadoModal(chamado = null) {
  const isEdit = chamado !== null;
  const title = isEdit ? 'Editar Chamado' : 'Novo Chamado';
  const tecnicos = USERS.filter(u => u.perfil === 'tecnico' || u.perfil === 'admin');

  return `
    <div class="modal-overlay active" id="chamadoModal">
      <div class="modal modal--lg">
        <div class="modal__header">
          <h2 class="modal__title">${title}</h2>
          <button class="modal__close" onclick="App.closeModal()">${Icons.x}</button>
        </div>
        <div class="modal__body">
          <form id="chamadoForm" novalidate>
            <input type="hidden" id="chamadoId" value="${isEdit ? chamado.id : ''}">
            
            <div class="form-group">
              <label class="form-label" for="chamadoTitulo">Título <span class="required">*</span></label>
              <input type="text" class="form-input" id="chamadoTitulo" placeholder="Descreva o problema brevemente..." value="${isEdit ? chamado.titulo : ''}" required>
              <span class="form-error" id="errorTitulo"></span>
            </div>

            <div class="form-group">
              <label class="form-label" for="chamadoDescricao">Descrição <span class="required">*</span></label>
              <textarea class="form-textarea" id="chamadoDescricao" placeholder="Descreva o problema com detalhes..." required>${isEdit ? chamado.descricao : ''}</textarea>
              <span class="form-error" id="errorDescricao"></span>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="chamadoCategoria">Categoria <span class="required">*</span></label>
                <select class="form-select" id="chamadoCategoria" required>
                  <option value="">Selecione...</option>
                  ${CATEGORIAS.map(c => `<option value="${c.id}" ${isEdit && chamado.categoria === c.id ? 'selected' : ''}>${c.nome}</option>`).join('')}
                </select>
                <span class="form-error" id="errorCategoria"></span>
              </div>
              <div class="form-group">
                <label class="form-label" for="chamadoPrioridade">Prioridade <span class="required">*</span></label>
                <select class="form-select" id="chamadoPrioridade" required>
                  <option value="">Selecione...</option>
                  ${PRIORIDADES.map(p => `<option value="${p.id}" ${isEdit && chamado.prioridade === p.id ? 'selected' : ''}>${p.nome}</option>`).join('')}
                </select>
                <span class="form-error" id="errorPrioridade"></span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="chamadoStatus">Status</label>
                <select class="form-select" id="chamadoStatus">
                  ${STATUS_LIST.map(s => `<option value="${s.id}" ${isEdit && chamado.status === s.id ? 'selected' : (!isEdit && s.id === 'aberto' ? 'selected' : '')}>${s.nome}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="chamadoTecnico">Técnico Responsável</label>
                <select class="form-select" id="chamadoTecnico">
                  <option value="">Não atribuído</option>
                  ${tecnicos.map(t => `<option value="${t.id}" ${isEdit && chamado.tecnicoId === t.id ? 'selected' : ''}>${t.nome}</option>`).join('')}
                </select>
              </div>
            </div>

            ${!isEdit ? `
              <div class="form-group">
                <label class="form-label" for="chamadoSolicitante">Solicitante <span class="required">*</span></label>
                <select class="form-select" id="chamadoSolicitante" required>
                  <option value="">Selecione...</option>
                  ${USERS.map(u => `<option value="${u.id}">${u.nome} (${u.departamento})</option>`).join('')}
                </select>
                <span class="form-error" id="errorSolicitante"></span>
              </div>
            ` : ''}
          </form>
        </div>
        <div class="modal__footer">
          <button class="btn btn-secondary" onclick="App.closeModal()">Cancelar</button>
          <button class="btn btn-primary" onclick="App.saveChamado()">${isEdit ? 'Salvar Alterações' : 'Criar Chamado'}</button>
        </div>
      </div>
    </div>
  `;
}

// ── Modal: Confirmação de Exclusão ──
function renderDeleteModal(chamado) {
  return `
    <div class="modal-overlay active" id="deleteModal">
      <div class="modal modal--sm">
        <div class="modal__header">
          <h2 class="modal__title">Confirmar Exclusão</h2>
          <button class="modal__close" onclick="App.closeModal()">${Icons.x}</button>
        </div>
        <div class="modal__body">
          <p class="confirm-dialog__text">
            Tem certeza que deseja excluir o chamado 
            <span class="confirm-dialog__highlight">#${String(chamado.id).padStart(4, '0')} — ${chamado.titulo}</span>?
          </p>
          <p class="confirm-dialog__text" style="margin-top:var(--space-3); color:var(--color-danger);">
            Esta ação não pode ser desfeita.
          </p>
        </div>
        <div class="modal__footer">
          <button class="btn btn-secondary" onclick="App.closeModal()">Cancelar</button>
          <button class="btn btn-danger" onclick="App.deleteChamado(${chamado.id})">Excluir</button>
        </div>
      </div>
    </div>
  `;
}

// ── Toast Notification ──
function showToast(type, title, message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const iconMap = {
    success: Icons.checkCircle,
    error: Icons.xCircle,
    warning: Icons.alertCircle,
    info: Icons.info
  };

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <span class="toast__icon">${iconMap[type] || iconMap.info}</span>
    <div class="toast__content">
      <div class="toast__title">${title}</div>
      <p class="toast__message">${message}</p>
    </div>
    <button class="toast__close" onclick="this.closest('.toast').remove()">${Icons.x}</button>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
