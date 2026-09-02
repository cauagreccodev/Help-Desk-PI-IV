/* ============================================
   HELP DESK PI IV — Dados Fictícios
   Estrutura preparada para integração futura
   com banco de dados via Java WebSocket
   ============================================ */

// ── Usuários ──
const USERS = [];

// ── Categorias ──
const CATEGORIAS = [];

// ── Status possíveis ──
const STATUS_LIST = [
  { id: 'aberto',       nome: 'Aberto',        classe: 'badge-open' },
  { id: 'em_andamento', nome: 'Em Andamento',   classe: 'badge-progress' },
  { id: 'pendente',     nome: 'Pendente',       classe: 'badge-pending' },
  { id: 'resolvido',    nome: 'Resolvido',      classe: 'badge-resolved' },
  { id: 'fechado',      nome: 'Fechado',        classe: 'badge-closed' }
];

// ── Prioridades ──
const PRIORIDADES = [
  { id: 'baixa',   nome: 'Baixa',   classe: 'badge-low' },
  { id: 'media',   nome: 'Média',   classe: 'badge-medium' },
  { id: 'alta',    nome: 'Alta',    classe: 'badge-high' },
  { id: 'urgente', nome: 'Urgente', classe: 'badge-urgent' }
];

// ── Chamados ──
let chamados = [];

// ── Usuário logado (simulação) ──
let CURRENT_USER = null;

// ── Notificações (dados fictícios para teste) ──
let notificacoes = [];

// ── Helpers de Notificações ──
function getUnreadNotificationsCount() {
  return notificacoes.filter(n => !n.lida).length;
}

function markNotificationAsRead(id) {
  const notif = notificacoes.find(n => n.id === id);
  if (notif) notif.lida = true;
}

function markAllNotificationsAsRead() {
  notificacoes.forEach(n => n.lida = true);
}


// ── Helper: próximo ID ──
function getNextId() {
  return chamados.length > 0 ? Math.max(...chamados.map(c => c.id)) + 1 : 1;
}

// ── Helper: buscar usuário por ID ──
function getUserById(id) {
  return USERS.find(u => u.id === id) || null;
}

// ── Helper: buscar categoria por ID ──
function getCategoriaById(id) {
  return CATEGORIAS.find(c => c.id === id) || null;
}

// ── Helper: buscar status por ID ──
function getStatusById(id) {
  return STATUS_LIST.find(s => s.id === id) || null;
}

// ── Helper: buscar prioridade por ID ──
function getPrioridadeById(id) {
  return PRIORIDADES.find(p => p.id === id) || null;
}

// ── Estatísticas do Dashboard ──
function getDashboardStats() {
  const total = chamados.length;
  const abertos = chamados.filter(c => c.status === 'aberto').length;
  const emAndamento = chamados.filter(c => c.status === 'em_andamento').length;
  const resolvidos = chamados.filter(c => c.status === 'resolvido').length;
  const pendentes = chamados.filter(c => c.status === 'pendente').length;
  const fechados = chamados.filter(c => c.status === 'fechado').length;

  return { total, abertos, emAndamento, resolvidos, pendentes, fechados };
}

// ── Formatação de Data ──
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

function formatDateTime(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function formatTimeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Agora mesmo';
  if (diffMins < 60) return `${diffMins}min atrás`;
  if (diffHours < 24) return `${diffHours}h atrás`;
  if (diffDays < 7) return `${diffDays}d atrás`;
  return formatDate(dateStr);
}
