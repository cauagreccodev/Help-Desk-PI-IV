/* ============================================
   HELP DESK PI IV — App Principal
   CRUD de Chamados + Inicialização
   
   TODO (Futuro): Substituir operações em memória
   por chamadas ao backend Java via WebSocket.
   ============================================ */

const App = (() => {
  // ── State ──
  let currentFilters = {
    search: '',
    status: '',
    prioridade: '',
    categoria: ''
  };
  let sortField = 'criadoEm';
  let sortDir = 'desc';

  // ── Inicialização ──
  function init() {
    // Inicializa tema
    ThemeManager.init();

    // Monta layout base
    const appEl = document.getElementById('app');
    appEl.innerHTML = `
      ${renderSidebar()}
      <div class="sidebar-overlay" id="sidebarOverlay"></div>
      <div class="main-wrapper" id="mainWrapper">
        <div id="headerContainer"></div>
        <main class="page-content" id="pageContent"></main>
      </div>
      <div class="toast-container" id="toastContainer"></div>
      <div id="modalContainer"></div>
    `;

    // Registra rotas
    Router.register('dashboard', () => {
      renderPage('Dashboard', ['Início', 'Dashboard'], renderDashboard());
    });

    Router.register('chamados', () => {
      renderPage('Chamados', ['Início', 'Chamados'], renderChamadosList(getFilteredChamados()));
      bindChamadosEvents();
    });

    Router.register('chamado/:id', (params) => {
      const chamado = chamados.find(c => c.id === parseInt(params.id));
      const title = chamado ? `Chamado #${String(chamado.id).padStart(4, '0')}` : 'Chamado';
      renderPage(title, ['Início', 'Chamados', title], renderChamadoDetail(params.id));
    });

    Router.register('configuracoes', () => {
      renderPage('Configurações', ['Início', 'Configurações'], renderConfiguracoes());
    });

    // Bind sidebar & header events
    bindGlobalEvents();

    // Inicia router
    Router.init();
  }

  // ── Renderização de Página ──
  function renderPage(title, breadcrumbs, content) {
    document.title = `${title} — HelpDesk`;
    document.getElementById('headerContainer').innerHTML = renderHeader(breadcrumbs);
    document.getElementById('pageContent').innerHTML = content;

    // Re-bind header events
    bindHeaderEvents();
  }

  // ── Filtros e Busca ──
  function getFilteredChamados() {
    let data = [...chamados];

    // Filtro de busca
    if (currentFilters.search) {
      const q = currentFilters.search.toLowerCase();
      data = data.filter(c =>
        c.titulo.toLowerCase().includes(q) ||
        String(c.id).includes(q) ||
        c.descricao.toLowerCase().includes(q)
      );
    }

    // Filtro de status
    if (currentFilters.status) {
      data = data.filter(c => c.status === currentFilters.status);
    }

    // Filtro de prioridade
    if (currentFilters.prioridade) {
      data = data.filter(c => c.prioridade === currentFilters.prioridade);
    }

    // Filtro de categoria
    if (currentFilters.categoria) {
      data = data.filter(c => c.categoria === parseInt(currentFilters.categoria));
    }

    // Ordenação
    const prioridadeOrder = { urgente: 0, alta: 1, media: 2, baixa: 3 };
    const statusOrder = { aberto: 0, em_andamento: 1, pendente: 2, resolvido: 3, fechado: 4 };

    data.sort((a, b) => {
      let valA, valB;

      switch (sortField) {
        case 'id':
          valA = a.id;
          valB = b.id;
          break;
        case 'titulo':
          valA = a.titulo.toLowerCase();
          valB = b.titulo.toLowerCase();
          break;
        case 'status':
          valA = statusOrder[a.status] ?? 99;
          valB = statusOrder[b.status] ?? 99;
          break;
        case 'prioridade':
          valA = prioridadeOrder[a.prioridade] ?? 99;
          valB = prioridadeOrder[b.prioridade] ?? 99;
          break;
        case 'criadoEm':
        default:
          valA = new Date(a.criadoEm).getTime();
          valB = new Date(b.criadoEm).getTime();
          break;
      }

      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return data;
  }

  function applyFilters() {
    const content = renderChamadosList(getFilteredChamados());
    document.getElementById('pageContent').innerHTML = content;
    bindChamadosEvents();
  }

  // ── CRUD: Create ──
  function openNewChamado() {
    const container = document.getElementById('modalContainer');
    container.innerHTML = renderChamadoModal(null);
    document.body.style.overflow = 'hidden';
  }

  // ── CRUD: Read (View) ──
  function viewChamado(id) {
    Router.navigate(`#chamado/${id}`);
  }

  // ── CRUD: Update (Edit) ──
  function editChamado(id) {
    const chamado = chamados.find(c => c.id === id);
    if (!chamado) return;
    const container = document.getElementById('modalContainer');
    container.innerHTML = renderChamadoModal(chamado);
    document.body.style.overflow = 'hidden';
  }

  // ── CRUD: Save (Create or Update) ──
  function saveChamado() {
    const id = document.getElementById('chamadoId').value;
    const titulo = document.getElementById('chamadoTitulo').value.trim();
    const descricao = document.getElementById('chamadoDescricao').value.trim();
    const categoria = document.getElementById('chamadoCategoria').value;
    const prioridade = document.getElementById('chamadoPrioridade').value;
    const status = document.getElementById('chamadoStatus').value;
    const tecnicoId = document.getElementById('chamadoTecnico').value;

    // Validação
    let valid = true;

    if (!titulo) {
      showFieldError('chamadoTitulo', 'errorTitulo', 'O título é obrigatório.');
      valid = false;
    } else {
      clearFieldError('chamadoTitulo', 'errorTitulo');
    }

    if (!descricao) {
      showFieldError('chamadoDescricao', 'errorDescricao', 'A descrição é obrigatória.');
      valid = false;
    } else {
      clearFieldError('chamadoDescricao', 'errorDescricao');
    }

    if (!categoria) {
      showFieldError('chamadoCategoria', 'errorCategoria', 'Selecione uma categoria.');
      valid = false;
    } else {
      clearFieldError('chamadoCategoria', 'errorCategoria');
    }

    if (!prioridade) {
      showFieldError('chamadoPrioridade', 'errorPrioridade', 'Selecione uma prioridade.');
      valid = false;
    } else {
      clearFieldError('chamadoPrioridade', 'errorPrioridade');
    }

    if (!valid) return;

    const now = new Date().toISOString();

    if (id) {
      // ── UPDATE ──
      const chamado = chamados.find(c => c.id === parseInt(id));
      if (!chamado) return;

      const changes = [];
      if (chamado.titulo !== titulo) changes.push('título');
      if (chamado.status !== status) changes.push('status');
      if (chamado.prioridade !== prioridade) changes.push('prioridade');

      chamado.titulo = titulo;
      chamado.descricao = descricao;
      chamado.categoria = parseInt(categoria);
      chamado.prioridade = prioridade;
      chamado.status = status;
      chamado.tecnicoId = tecnicoId ? parseInt(tecnicoId) : null;
      chamado.atualizadoEm = now;

      if (changes.length > 0) {
        chamado.timeline.push({
          tipo: 'status',
          autorId: CURRENT_USER.id,
          data: now,
          mensagem: `Chamado atualizado: ${changes.join(', ')} alterado(s) por ${CURRENT_USER.nome}.`
        });
      }

      closeModal();
      showToast('success', 'Chamado atualizado', `Chamado #${String(chamado.id).padStart(4, '0')} foi atualizado com sucesso.`);
    } else {
      // ── CREATE ──
      const solicitanteEl = document.getElementById('chamadoSolicitante');
      const solicitanteId = solicitanteEl ? solicitanteEl.value : '';

      if (!solicitanteId && solicitanteEl) {
        showFieldError('chamadoSolicitante', 'errorSolicitante', 'Selecione um solicitante.');
        return;
      }

      const slaDate = new Date();
      slaDate.setDate(slaDate.getDate() + (prioridade === 'urgente' ? 1 : prioridade === 'alta' ? 2 : 3));

      const novoChamado = {
        id: getNextId(),
        titulo,
        descricao,
        status,
        prioridade,
        categoria: parseInt(categoria),
        solicitanteId: parseInt(solicitanteId),
        tecnicoId: tecnicoId ? parseInt(tecnicoId) : null,
        criadoEm: now,
        atualizadoEm: now,
        sla: slaDate.toISOString(),
        timeline: [
          {
            tipo: 'criacao',
            autorId: parseInt(solicitanteId),
            data: now,
            mensagem: 'Chamado aberto pelo solicitante.'
          }
        ]
      };

      if (tecnicoId) {
        const tecnico = getUserById(parseInt(tecnicoId));
        novoChamado.timeline.push({
          tipo: 'atribuicao',
          autorId: CURRENT_USER.id,
          data: now,
          mensagem: `Chamado atribuído ao técnico ${tecnico ? tecnico.nome : 'desconhecido'}.`
        });
      }

      chamados.push(novoChamado);
      closeModal();
      showToast('success', 'Chamado criado', `Chamado #${String(novoChamado.id).padStart(4, '0')} foi criado com sucesso.`);
    }

    // Refresh view
    refreshCurrentView();
  }

  // ── CRUD: Delete ──
  function confirmDeleteChamado(id) {
    const chamado = chamados.find(c => c.id === id);
    if (!chamado) return;
    const container = document.getElementById('modalContainer');
    container.innerHTML = renderDeleteModal(chamado);
    document.body.style.overflow = 'hidden';
  }

  function deleteChamado(id) {
    const chamado = chamados.find(c => c.id === id);
    if (!chamado) return;

    chamados = chamados.filter(c => c.id !== id);
    closeModal();
    showToast('success', 'Chamado excluído', `Chamado #${String(id).padStart(4, '0')} foi excluído com sucesso.`);

    // Se estava na página de detalhe, volta para lista
    if (Router.getCurrentRoute() && Router.getCurrentRoute().startsWith('chamado/')) {
      Router.navigate('#chamados');
    } else {
      refreshCurrentView();
    }
  }

  // ── Quick Actions ──
  function quickStatusChange(chamadoId, newStatus) {
    const chamado = chamados.find(c => c.id === chamadoId);
    if (!chamado || !newStatus) return;

    const statusObj = getStatusById(newStatus);
    chamado.status = newStatus;
    chamado.atualizadoEm = new Date().toISOString();
    chamado.timeline.push({
      tipo: 'status',
      autorId: CURRENT_USER.id,
      data: new Date().toISOString(),
      mensagem: `Status alterado para "${statusObj.nome}" por ${CURRENT_USER.nome}.`
    });

    showToast('success', 'Status alterado', `Chamado #${String(chamadoId).padStart(4, '0')} agora está "${statusObj.nome}".`);
    refreshCurrentView();
  }

  function quickTecnicoChange(chamadoId, tecnicoId) {
    const chamado = chamados.find(c => c.id === chamadoId);
    if (!chamado || !tecnicoId) return;

    const tecnico = getUserById(parseInt(tecnicoId));
    chamado.tecnicoId = parseInt(tecnicoId);
    chamado.atualizadoEm = new Date().toISOString();
    chamado.timeline.push({
      tipo: 'atribuicao',
      autorId: CURRENT_USER.id,
      data: new Date().toISOString(),
      mensagem: `Chamado atribuído ao técnico ${tecnico ? tecnico.nome : 'desconhecido'} por ${CURRENT_USER.nome}.`
    });

    showToast('success', 'Técnico atribuído', `${tecnico ? tecnico.nome : 'Técnico'} foi atribuído ao chamado #${String(chamadoId).padStart(4, '0')}.`);
    refreshCurrentView();
  }

  // ── Theme ──
  function changeTheme(theme) {
    ThemeManager.setTheme(theme);
    // Update header icon
    const btn = document.getElementById('themeToggleBtn');
    if (btn) {
      btn.innerHTML = ThemeManager.isDark() ? Icons.sun : Icons.moon;
    }
    showToast('info', 'Tema alterado', `Tema ${theme === 'dark' ? 'escuro' : 'claro'} aplicado com sucesso.`);
  }

  // ── Helpers ──
  function closeModal() {
    const container = document.getElementById('modalContainer');
    const overlay = container.querySelector('.modal-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      setTimeout(() => {
        container.innerHTML = '';
        document.body.style.overflow = '';
      }, 200);
    }
  }

  function refreshCurrentView() {
    Router.resolve();
  }

  function showFieldError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input) input.classList.add('error');
    if (error) error.textContent = message;
  }

  function clearFieldError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input) input.classList.remove('error');
    if (error) error.textContent = '';
  }

  // ── Event Bindings ──
  function bindGlobalEvents() {
    // Mobile & overlay events
    document.addEventListener('click', (e) => {
      // Mobile menu
      const menuBtn = e.target.closest('#mobileMenuBtn');
      if (menuBtn) {
        document.getElementById('sidebar').classList.add('mobile-open');
        document.getElementById('sidebarOverlay').classList.add('active');
      }

      // Overlay click closes mobile sidebar
      if (e.target.id === 'sidebarOverlay') {
        document.getElementById('sidebar').classList.remove('mobile-open');
        document.getElementById('sidebarOverlay').classList.remove('active');
      }

      // Modal overlay click closes modal
      if (e.target.classList.contains('modal-overlay')) {
        closeModal();
      }
    });

    // ESC key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
        // Close mobile sidebar too
        document.getElementById('sidebar')?.classList.remove('mobile-open');
        document.getElementById('sidebarOverlay')?.classList.remove('active');
      }
    });
  }

  function bindHeaderEvents() {
    // Theme toggle in header
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const newTheme = ThemeManager.toggle();
        themeBtn.innerHTML = ThemeManager.isDark() ? Icons.sun : Icons.moon;

        // Sync settings page if visible
        const radioLight = document.querySelector('input[name="theme"][value="light"]');
        const radioDark = document.querySelector('input[name="theme"][value="dark"]');
        if (radioLight && radioDark) {
          radioLight.checked = newTheme === 'light';
          radioDark.checked = newTheme === 'dark';
        }
      });
    }

    // Global search
    const globalSearch = document.getElementById('globalSearch');
    if (globalSearch) {
      globalSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const query = globalSearch.value.trim();
          if (query) {
            currentFilters.search = query;
            Router.navigate('#chamados');
          }
        }
      });
    }
  }

  function bindChamadosEvents() {
    // New ticket button
    const btnNovo = document.getElementById('btnNovoChamado');
    if (btnNovo) btnNovo.addEventListener('click', openNewChamado);

    const btnNovoEmpty = document.getElementById('btnNovoChamadoEmpty');
    if (btnNovoEmpty) btnNovoEmpty.addEventListener('click', openNewChamado);

    // Search
    const searchInput = document.getElementById('searchChamados');
    if (searchInput) {
      searchInput.value = currentFilters.search;
      let debounce;
      searchInput.addEventListener('input', () => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          currentFilters.search = searchInput.value.trim();
          applyFilters();
        }, 300);
      });
    }

    // Filters
    const filterStatus = document.getElementById('filterStatus');
    if (filterStatus) {
      filterStatus.value = currentFilters.status;
      filterStatus.addEventListener('change', () => {
        currentFilters.status = filterStatus.value;
        applyFilters();
      });
    }

    const filterPrioridade = document.getElementById('filterPrioridade');
    if (filterPrioridade) {
      filterPrioridade.value = currentFilters.prioridade;
      filterPrioridade.addEventListener('change', () => {
        currentFilters.prioridade = filterPrioridade.value;
        applyFilters();
      });
    }

    const filterCategoria = document.getElementById('filterCategoria');
    if (filterCategoria) {
      filterCategoria.value = currentFilters.categoria;
      filterCategoria.addEventListener('change', () => {
        currentFilters.categoria = filterCategoria.value;
        applyFilters();
      });
    }

    // Table sort
    const table = document.getElementById('chamadosTable');
    if (table) {
      table.querySelectorAll('th[data-sort]').forEach(th => {
        th.addEventListener('click', () => {
          const field = th.getAttribute('data-sort');
          if (sortField === field) {
            sortDir = sortDir === 'asc' ? 'desc' : 'asc';
          } else {
            sortField = field;
            sortDir = 'asc';
          }
          applyFilters();
        });
      });
    }
  }

  // ── Public API ──
  return {
    init,
    viewChamado,
    editChamado,
    saveChamado,
    confirmDeleteChamado,
    deleteChamado,
    closeModal,
    changeTheme,
    quickStatusChange,
    quickTecnicoChange
  };
})();

// ── Bootstrap ──
document.addEventListener('DOMContentLoaded', App.init);
