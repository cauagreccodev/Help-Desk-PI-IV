/* ============================================
   HELP DESK PI IV — Dados Fictícios
   Estrutura preparada para integração futura
   com banco de dados via Java WebSocket
   ============================================ */

// ── Usuários ──
const USERS = [
  {
    id: 1,
    nome: 'Carlos Mendes',
    email: 'carlos.mendes@empresa.com.br',
    cargo: 'Analista de Suporte',
    departamento: 'TI',
    avatar: null, // futuramente URL da imagem
    iniciais: 'CM',
    perfil: 'tecnico'
  },
  {
    id: 2,
    nome: 'Ana Beatriz Silva',
    email: 'ana.silva@empresa.com.br',
    cargo: 'Gerente de TI',
    departamento: 'TI',
    avatar: null,
    iniciais: 'AS',
    perfil: 'admin'
  },
  {
    id: 3,
    nome: 'Rafael Oliveira',
    email: 'rafael.oliveira@empresa.com.br',
    cargo: 'Técnico de Redes',
    departamento: 'TI',
    avatar: null,
    iniciais: 'RO',
    perfil: 'tecnico'
  },
  {
    id: 4,
    nome: 'Juliana Costa',
    email: 'juliana.costa@empresa.com.br',
    cargo: 'Analista Financeiro',
    departamento: 'Financeiro',
    avatar: null,
    iniciais: 'JC',
    perfil: 'usuario'
  },
  {
    id: 5,
    nome: 'Pedro Henrique Santos',
    email: 'pedro.santos@empresa.com.br',
    cargo: 'Coordenador de RH',
    departamento: 'Recursos Humanos',
    avatar: null,
    iniciais: 'PS',
    perfil: 'usuario'
  },
  {
    id: 6,
    nome: 'Mariana Ferreira',
    email: 'mariana.ferreira@empresa.com.br',
    cargo: 'Assistente Administrativo',
    departamento: 'Administrativo',
    avatar: null,
    iniciais: 'MF',
    perfil: 'usuario'
  }
];

// ── Categorias ──
const CATEGORIAS = [
  { id: 1, nome: 'Hardware',  icone: 'monitor' },
  { id: 2, nome: 'Software',  icone: 'code' },
  { id: 3, nome: 'Rede',      icone: 'wifi' },
  { id: 4, nome: 'Acesso',    icone: 'key' },
  { id: 5, nome: 'E-mail',    icone: 'mail' },
  { id: 6, nome: 'Outros',    icone: 'help-circle' }
];

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
let chamados = [
  {
    id: 1,
    titulo: 'Computador não liga após queda de energia',
    descricao: 'O computador da estação de trabalho 14 no setor financeiro não liga após a queda de energia de ontem. Já tentei trocar o cabo de energia e verificar a tomada, mas sem sucesso. O monitor funciona normalmente quando conectado a outra máquina.',
    status: 'aberto',
    prioridade: 'alta',
    categoria: 1,
    solicitanteId: 4,
    tecnicoId: 1,
    criadoEm: '2026-08-15T09:30:00',
    atualizadoEm: '2026-08-15T09:30:00',
    sla: '2026-08-16T09:30:00',
    timeline: [
      {
        tipo: 'criacao',
        autorId: 4,
        data: '2026-08-15T09:30:00',
        mensagem: 'Chamado aberto pelo solicitante.'
      },
      {
        tipo: 'atribuicao',
        autorId: 2,
        data: '2026-08-15T09:45:00',
        mensagem: 'Chamado atribuído ao técnico Carlos Mendes.'
      }
    ]
  },
  {
    id: 2,
    titulo: 'Erro ao acessar sistema ERP - Tela branca',
    descricao: 'Ao tentar acessar o módulo de contas a pagar no ERP, a tela fica completamente branca após o login. O problema ocorre apenas no Chrome. No Firefox funciona normalmente. Já limpei cache e cookies sem sucesso.',
    status: 'em_andamento',
    prioridade: 'urgente',
    categoria: 2,
    solicitanteId: 4,
    tecnicoId: 1,
    criadoEm: '2026-08-14T14:20:00',
    atualizadoEm: '2026-08-15T11:00:00',
    sla: '2026-08-15T14:20:00',
    timeline: [
      {
        tipo: 'criacao',
        autorId: 4,
        data: '2026-08-14T14:20:00',
        mensagem: 'Chamado aberto pelo solicitante.'
      },
      {
        tipo: 'comentario',
        autorId: 1,
        data: '2026-08-14T15:00:00',
        mensagem: 'Verificado que o problema está relacionado à extensão do bloqueador de anúncios. Desativando para teste.'
      },
      {
        tipo: 'status',
        autorId: 1,
        data: '2026-08-15T11:00:00',
        mensagem: 'Status alterado para Em Andamento. Aguardando atualização do Chrome pela equipe de infra.'
      }
    ]
  },
  {
    id: 3,
    titulo: 'Impressora do 3º andar com atolamento de papel',
    descricao: 'A impressora HP LaserJet do 3º andar está com atolamento de papel constante. Mesmo após remover o papel atolado, o problema volta a ocorrer após poucas impressões. Modelo: HP LaserJet Pro M404dn. Patrimônio: IMP-2024-087.',
    status: 'resolvido',
    prioridade: 'media',
    categoria: 1,
    solicitanteId: 6,
    tecnicoId: 3,
    criadoEm: '2026-08-13T10:15:00',
    atualizadoEm: '2026-08-14T16:30:00',
    sla: '2026-08-14T10:15:00',
    timeline: [
      {
        tipo: 'criacao',
        autorId: 6,
        data: '2026-08-13T10:15:00',
        mensagem: 'Chamado aberto pelo solicitante.'
      },
      {
        tipo: 'comentario',
        autorId: 3,
        data: '2026-08-13T14:00:00',
        mensagem: 'Rolo de alimentação com desgaste identificado. Peça de reposição solicitada ao almoxarifado.'
      },
      {
        tipo: 'status',
        autorId: 3,
        data: '2026-08-14T16:30:00',
        mensagem: 'Rolo substituído. Impressora funcionando normalmente após teste com 50 páginas. Chamado resolvido.'
      }
    ]
  },
  {
    id: 4,
    titulo: 'Solicitar acesso ao SharePoint do projeto Alpha',
    descricao: 'Preciso de acesso de leitura e escrita ao site SharePoint do projeto Alpha para acompanhar os documentos de planejamento. Meu gerente direto, Paulo Andrade, já autorizou verbalmente.',
    status: 'pendente',
    prioridade: 'baixa',
    categoria: 4,
    solicitanteId: 5,
    tecnicoId: 1,
    criadoEm: '2026-08-15T08:00:00',
    atualizadoEm: '2026-08-15T14:00:00',
    sla: '2026-08-17T08:00:00',
    timeline: [
      {
        tipo: 'criacao',
        autorId: 5,
        data: '2026-08-15T08:00:00',
        mensagem: 'Chamado aberto pelo solicitante.'
      },
      {
        tipo: 'comentario',
        autorId: 1,
        data: '2026-08-15T14:00:00',
        mensagem: 'Necessária autorização formal por e-mail do gestor Paulo Andrade. Aguardando documento.'
      }
    ]
  },
  {
    id: 5,
    titulo: 'VPN corporativa desconectando frequentemente',
    descricao: 'A conexão VPN cai a cada 10-15 minutos durante o home office. Estou usando o GlobalProtect versão 6.1.2. Minha internet residencial funciona normalmente para outros serviços. O problema começou após a última atualização do Windows.',
    status: 'em_andamento',
    prioridade: 'alta',
    categoria: 3,
    solicitanteId: 5,
    tecnicoId: 3,
    criadoEm: '2026-08-14T07:45:00',
    atualizadoEm: '2026-08-15T10:20:00',
    sla: '2026-08-15T07:45:00',
    timeline: [
      {
        tipo: 'criacao',
        autorId: 5,
        data: '2026-08-14T07:45:00',
        mensagem: 'Chamado aberto pelo solicitante.'
      },
      {
        tipo: 'comentario',
        autorId: 3,
        data: '2026-08-14T09:30:00',
        mensagem: 'Coletando logs do GlobalProtect. Solicitado ao usuário executar diagnóstico de rede.'
      },
      {
        tipo: 'comentario',
        autorId: 3,
        data: '2026-08-15T10:20:00',
        mensagem: 'Identificado conflito com o Windows Defender Firewall após update KB5040442. Aplicando correção.'
      }
    ]
  },
  {
    id: 6,
    titulo: 'Instalação do Adobe Acrobat Pro DC',
    descricao: 'Necessito da instalação do Adobe Acrobat Pro DC para edição de contratos em PDF. A versão gratuita não atende às necessidades do setor jurídico. Licença já adquirida - chave disponível com o gestor de TI.',
    status: 'fechado',
    prioridade: 'baixa',
    categoria: 2,
    solicitanteId: 6,
    tecnicoId: 1,
    criadoEm: '2026-08-10T11:00:00',
    atualizadoEm: '2026-08-11T09:00:00',
    sla: '2026-08-12T11:00:00',
    timeline: [
      {
        tipo: 'criacao',
        autorId: 6,
        data: '2026-08-10T11:00:00',
        mensagem: 'Chamado aberto pelo solicitante.'
      },
      {
        tipo: 'comentario',
        autorId: 1,
        data: '2026-08-10T14:30:00',
        mensagem: 'Licença validada. Agendando instalação remota para amanhã às 8h.'
      },
      {
        tipo: 'status',
        autorId: 1,
        data: '2026-08-11T09:00:00',
        mensagem: 'Software instalado e ativado com sucesso. Chamado fechado.'
      }
    ]
  },
  {
    id: 7,
    titulo: 'Lentidão na rede Wi-Fi do 2º andar',
    descricao: 'A rede Wi-Fi corporativa no 2º andar está extremamente lenta desde segunda-feira. Velocidade medida: 2 Mbps (deveria ser 100 Mbps). Afetando cerca de 30 colaboradores. Rede cabeada funciona normalmente.',
    status: 'aberto',
    prioridade: 'urgente',
    categoria: 3,
    solicitanteId: 6,
    tecnicoId: 3,
    criadoEm: '2026-08-15T13:00:00',
    atualizadoEm: '2026-08-15T13:00:00',
    sla: '2026-08-16T13:00:00',
    timeline: [
      {
        tipo: 'criacao',
        autorId: 6,
        data: '2026-08-15T13:00:00',
        mensagem: 'Chamado aberto pelo solicitante. Impacto alto: ~30 colaboradores afetados.'
      }
    ]
  },
  {
    id: 8,
    titulo: 'Reset de senha - conta bloqueada do Active Directory',
    descricao: 'Minha conta do AD foi bloqueada após tentativas de login com a senha antiga. Preciso de reset urgente para acessar o e-mail e os sistemas corporativos.',
    status: 'resolvido',
    prioridade: 'alta',
    categoria: 4,
    solicitanteId: 4,
    tecnicoId: 1,
    criadoEm: '2026-08-15T07:15:00',
    atualizadoEm: '2026-08-15T07:30:00',
    sla: '2026-08-15T08:15:00',
    timeline: [
      {
        tipo: 'criacao',
        autorId: 4,
        data: '2026-08-15T07:15:00',
        mensagem: 'Chamado aberto pelo solicitante.'
      },
      {
        tipo: 'status',
        autorId: 1,
        data: '2026-08-15T07:30:00',
        mensagem: 'Conta desbloqueada e senha temporária enviada por SMS. Solicitada troca no primeiro acesso.'
      }
    ]
  },
  {
    id: 9,
    titulo: 'Configurar novo notebook Dell Latitude para novo colaborador',
    descricao: 'Novo colaborador ingressando no setor de Marketing dia 18/08. Necessário configurar notebook Dell Latitude 5540 com: Windows 11, Office 365, Teams, VPN, e softwares do departamento (Canva Pro, Figma).',
    status: 'aberto',
    prioridade: 'media',
    categoria: 1,
    solicitanteId: 5,
    tecnicoId: null,
    criadoEm: '2026-08-15T10:00:00',
    atualizadoEm: '2026-08-15T10:00:00',
    sla: '2026-08-18T10:00:00',
    timeline: [
      {
        tipo: 'criacao',
        autorId: 5,
        data: '2026-08-15T10:00:00',
        mensagem: 'Chamado aberto pelo solicitante. Prazo: antes de 18/08.'
      }
    ]
  },
  {
    id: 10,
    titulo: 'E-mail corporativo não recebe mensagens externas',
    descricao: 'Desde ontem às 16h não recebo e-mails de remetentes externos (Gmail, Outlook.com, etc). E-mails internos funcionam normalmente. Já verifiquei a caixa de spam e lixeira. Outros colegas do setor também relatam o mesmo problema.',
    status: 'em_andamento',
    prioridade: 'urgente',
    categoria: 5,
    solicitanteId: 4,
    tecnicoId: 3,
    criadoEm: '2026-08-15T08:30:00',
    atualizadoEm: '2026-08-15T12:00:00',
    sla: '2026-08-15T16:30:00',
    timeline: [
      {
        tipo: 'criacao',
        autorId: 4,
        data: '2026-08-15T08:30:00',
        mensagem: 'Chamado aberto pelo solicitante. Problema coletivo no setor financeiro.'
      },
      {
        tipo: 'comentario',
        autorId: 3,
        data: '2026-08-15T09:15:00',
        mensagem: 'Identificada regra de bloqueio no filtro de spam do Exchange. Analisando registros MX e SPF.'
      },
      {
        tipo: 'comentario',
        autorId: 3,
        data: '2026-08-15T12:00:00',
        mensagem: 'Registro SPF atualizado. Regra de bloqueio ajustada. Monitorando recebimento de e-mails nas próximas horas.'
      }
    ]
  },
  {
    id: 11,
    titulo: 'Monitor secundário sem sinal de vídeo',
    descricao: 'O monitor secundário (Dell P2422H) da minha estação de trabalho parou de exibir imagem. O monitor liga mas exibe "Sem sinal". Já testei com outro cabo HDMI e o problema persiste.',
    status: 'pendente',
    prioridade: 'media',
    categoria: 1,
    solicitanteId: 5,
    tecnicoId: 1,
    criadoEm: '2026-08-14T16:00:00',
    atualizadoEm: '2026-08-15T09:00:00',
    sla: '2026-08-16T16:00:00',
    timeline: [
      {
        tipo: 'criacao',
        autorId: 5,
        data: '2026-08-14T16:00:00',
        mensagem: 'Chamado aberto pelo solicitante.'
      },
      {
        tipo: 'comentario',
        autorId: 1,
        data: '2026-08-15T09:00:00',
        mensagem: 'Possível problema na porta HDMI da placa de vídeo. Necessário agendar visita presencial. Aguardando disponibilidade do solicitante.'
      }
    ]
  },
  {
    id: 12,
    titulo: 'Atualização do antivírus corporativo em todas as máquinas',
    descricao: 'A licença do Kaspersky Endpoint Security precisa ser renovada e atualizada em todas as 120 estações de trabalho da empresa. A nova chave de licença já foi adquirida.',
    status: 'em_andamento',
    prioridade: 'alta',
    categoria: 2,
    solicitanteId: 2,
    tecnicoId: 1,
    criadoEm: '2026-08-12T09:00:00',
    atualizadoEm: '2026-08-15T15:00:00',
    sla: '2026-08-19T09:00:00',
    timeline: [
      {
        tipo: 'criacao',
        autorId: 2,
        data: '2026-08-12T09:00:00',
        mensagem: 'Chamado aberto pela gerência de TI.'
      },
      {
        tipo: 'comentario',
        autorId: 1,
        data: '2026-08-13T10:00:00',
        mensagem: 'Política de atualização via GPO configurada. Rollout iniciado no 1º andar (30 máquinas).'
      },
      {
        tipo: 'comentario',
        autorId: 1,
        data: '2026-08-15T15:00:00',
        mensagem: '75 de 120 máquinas atualizadas (62.5%). Continuando rollout nos andares 2 e 3.'
      }
    ]
  },
  {
    id: 13,
    titulo: 'Cabo de rede rompido na sala de reunião 4',
    descricao: 'O ponto de rede na sala de reunião 4 (tomada R4-P02) está sem conectividade. Aparentemente o cabo foi danificado durante a mudança de mobiliário da semana passada.',
    status: 'fechado',
    prioridade: 'baixa',
    categoria: 3,
    solicitanteId: 6,
    tecnicoId: 3,
    criadoEm: '2026-08-11T14:00:00',
    atualizadoEm: '2026-08-12T11:00:00',
    sla: '2026-08-13T14:00:00',
    timeline: [
      {
        tipo: 'criacao',
        autorId: 6,
        data: '2026-08-11T14:00:00',
        mensagem: 'Chamado aberto pelo solicitante.'
      },
      {
        tipo: 'status',
        autorId: 3,
        data: '2026-08-12T11:00:00',
        mensagem: 'Cabo substituído e novo conector crimpado. Ponto testado com certificador Fluke: aprovado. Chamado fechado.'
      }
    ]
  },
  {
    id: 14,
    titulo: 'Criar conta de e-mail para estagiário do setor jurídico',
    descricao: 'Solicitamos a criação de conta de e-mail corporativo para o estagiário Lucas Almeida que inicia dia 16/08 no setor jurídico. E-mail sugerido: lucas.almeida@empresa.com.br',
    status: 'resolvido',
    prioridade: 'media',
    categoria: 5,
    solicitanteId: 5,
    tecnicoId: 1,
    criadoEm: '2026-08-14T11:00:00',
    atualizadoEm: '2026-08-14T14:00:00',
    sla: '2026-08-16T11:00:00',
    timeline: [
      {
        tipo: 'criacao',
        autorId: 5,
        data: '2026-08-14T11:00:00',
        mensagem: 'Chamado aberto pelo solicitante.'
      },
      {
        tipo: 'status',
        autorId: 1,
        data: '2026-08-14T14:00:00',
        mensagem: 'Conta lucas.almeida@empresa.com.br criada com sucesso no Exchange. Credenciais enviadas ao gestor por canal seguro.'
      }
    ]
  },
  {
    id: 15,
    titulo: 'Projetor da sala de treinamento com imagem amarelada',
    descricao: 'O projetor Epson PowerLite da sala de treinamento está exibindo imagem com tom amarelado/esverdeado. A lâmpada já tem mais de 3.000 horas de uso. Patrimônio: PROJ-2023-012.',
    status: 'aberto',
    prioridade: 'baixa',
    categoria: 1,
    solicitanteId: 6,
    tecnicoId: null,
    criadoEm: '2026-08-15T15:30:00',
    atualizadoEm: '2026-08-15T15:30:00',
    sla: '2026-08-18T15:30:00',
    timeline: [
      {
        tipo: 'criacao',
        autorId: 6,
        data: '2026-08-15T15:30:00',
        mensagem: 'Chamado aberto pelo solicitante. Possível necessidade de troca de lâmpada.'
      }
    ]
  }
];

// ── Usuário logado (simulação) ──
const CURRENT_USER = USERS.find(u => u.id === 2); // Ana Beatriz - Admin

// ── Notificações (dados fictícios para teste) ──
let notificacoes = [
  {
    id: 1,
    tipo: 'chamado_novo',
    titulo: 'Novo chamado aberto',
    mensagem: 'Juliana Costa abriu o chamado #0001 — Computador não liga após queda de energia.',
    chamadoId: 1,
    lida: false,
    criadaEm: '2026-08-15T09:30:00'
  },
  {
    id: 2,
    tipo: 'status_alterado',
    titulo: 'Status alterado',
    mensagem: 'O chamado #0002 foi movido para "Em Andamento" por Carlos Mendes.',
    chamadoId: 2,
    lida: false,
    criadaEm: '2026-08-15T11:00:00'
  },
  {
    id: 3,
    tipo: 'comentario',
    titulo: 'Novo comentário',
    mensagem: 'Rafael Oliveira comentou no chamado #0005 — VPN corporativa desconectando.',
    chamadoId: 5,
    lida: false,
    criadaEm: '2026-08-15T10:20:00'
  },
  {
    id: 4,
    tipo: 'atribuicao',
    titulo: 'Chamado atribuído a você',
    mensagem: 'O chamado #0007 — Lentidão na rede Wi-Fi do 2º andar foi atribuído à sua equipe.',
    chamadoId: 7,
    lida: false,
    criadaEm: '2026-08-15T13:05:00'
  },
  {
    id: 5,
    tipo: 'sla_alerta',
    titulo: 'Alerta de SLA',
    mensagem: 'O chamado #0010 — E-mail corporativo não recebe mensagens está próximo do vencimento do SLA.',
    chamadoId: 10,
    lida: true,
    criadaEm: '2026-08-15T15:00:00'
  },
  {
    id: 6,
    tipo: 'resolvido',
    titulo: 'Chamado resolvido',
    mensagem: 'Carlos Mendes resolveu o chamado #0008 — Reset de senha - conta bloqueada.',
    chamadoId: 8,
    lida: true,
    criadaEm: '2026-08-15T07:30:00'
  }
];

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
