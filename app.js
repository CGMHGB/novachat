/**
 * NovaChat — Minimalist BYOK LLM Chat Interface
 * Supports xAI Grok, OpenAI, Google Gemini, Anthropic Claude, OpenRouter, DeepSeek, Ollama, and Demo Mode.
 */

const PROVIDER_PRESETS = {
  openai: {
    name: 'OpenAI',
    format: 'openai',
    baseUrl: 'https://api.openai.com/v1',
    defaultModel: 'gpt-6.1-sol',
    models: [
      { id: 'gpt-6.1-sol', name: 'GPT-6.1 Sol (Flagship)', supportsThinking: false },
      { id: 'gpt-6.1-terra', name: 'GPT-6.1 Terra (Balanced)', supportsThinking: false },
      { id: 'gpt-6-luna', name: 'GPT-6 Luna (Fast Chat)', supportsThinking: false },
      { id: 'o3-pro', name: 'o3 Pro (Deep Reasoning)', supportsThinking: true },
      { id: 'o4-mini', name: 'o4-mini (Fast Reasoning)', supportsThinking: true }
    ],
    requiresKey: true,
    keyPlaceholder: 'sk-proj-...'
  },
  anthropic: {
    name: 'Anthropic',
    format: 'anthropic',
    baseUrl: 'https://api.anthropic.com/v1',
    defaultModel: 'claude-opus-5.5',
    models: [
      { id: 'claude-fable-5.1', name: 'Claude Fable 5.1 (Frontier)', supportsThinking: true },
      { id: 'claude-opus-5.5', name: 'Claude Opus 5.5 (Agent & Coding)', supportsThinking: true },
      { id: 'claude-sonnet-5.5', name: 'Claude Sonnet 5.5 (Everyday)', supportsThinking: true },
      { id: 'claude-haiku-5.5', name: 'Claude Haiku 5.5 (Speed)', supportsThinking: false }
    ],
    requiresKey: true,
    keyPlaceholder: 'sk-ant-...'
  },
  gemini: {
    name: 'Google Gemini',
    format: 'gemini',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    defaultModel: 'gemini-4-argon',
    models: [
      { id: 'gemini-4-argon', name: 'Gemini 4 Argon', supportsThinking: true },
      { id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash', supportsThinking: true },
      { id: 'gemini-3.5-flash-lite', name: 'Gemini 3.5 Flash-Lite', supportsThinking: false }
    ],
    requiresKey: true,
    keyPlaceholder: 'AIzaSy...'
  },
  deepseek: {
    name: 'DeepSeek',
    format: 'openai',
    baseUrl: 'https://api.deepseek.com/v1',
    defaultModel: 'deepseek-chat',
    models: [
      { id: 'deepseek-chat', name: 'DeepSeek-V4.1 Flash', supportsThinking: false },
      { id: 'deepseek-reasoner', name: 'DeepSeek-R1 (Reasoner)', supportsThinking: true }
    ],
    requiresKey: true,
    keyPlaceholder: 'sk-...'
  },
  grok: {
    name: 'xAI Grok',
    format: 'openai',
    baseUrl: 'https://api.x.ai/v1',
    defaultModel: 'grok-4.7',
    models: [
      { id: 'grok-4.7', name: 'Grok 4.7 (Flagship)', supportsThinking: true },
      { id: 'grok-4.3', name: 'Grok 4.3 (Fast & Tool Use)', supportsThinking: false },
      { id: 'grok-4.6', name: 'Grok 4.6 (Coding)', supportsThinking: true },
      { id: 'grok-2-latest', name: 'Grok 2 Latest', supportsThinking: false },
      { id: 'grok-beta', name: 'Grok Beta', supportsThinking: false }
    ],
    requiresKey: true,
    keyPlaceholder: 'xai-...'
  },
  openrouter: {
    name: 'OpenRouter',
    format: 'openai',
    baseUrl: 'https://openrouter.ai/api/v1',
    defaultModel: 'openai/gpt-6.1-sol',
    models: [
      { id: 'deepseek/deepseek-v4.1-flash', name: 'DeepSeek V4.1 Flash', supportsThinking: false },
      { id: 'anthropic/claude-opus-5.5', name: 'Claude Opus 5.5', supportsThinking: true },
      { id: 'openai/gpt-6.1-sol', name: 'GPT-6.1 Sol', supportsThinking: false },
      { id: 'google/gemini-4-argon', name: 'Gemini 4 Argon', supportsThinking: true }
    ],
    requiresKey: true,
    keyPlaceholder: 'sk-or-v1-...'
  },
  ollama: {
    name: 'Ollama 本地',
    format: 'openai',
    baseUrl: 'http://localhost:11434/v1',
    defaultModel: 'qwen3.8:27b',
    models: [
      { id: 'qwen3.8:27b', name: 'Qwen 3.8 27B', supportsThinking: false },
      { id: 'llama4:scout', name: 'Llama 4 Scout', supportsThinking: false },
      { id: 'gpt-oss:20b', name: 'GPT OSS 20B', supportsThinking: true },
      { id: 'deepseek-r1:14b', name: 'DeepSeek R1 14B', supportsThinking: true }
    ],
    requiresKey: false,
    keyPlaceholder: '本地免金鑰 (可留空)'
  },
  custom: {
    name: '自訂 API',
    format: 'openai',
    baseUrl: 'https://api.openai.com/v1',
    defaultModel: 'gpt-6.1-sol',
    models: [
      { id: 'gpt-6.1-sol', name: 'GPT-6.1 Sol', supportsThinking: false }
    ],
    requiresKey: false,
    keyPlaceholder: 'API Token / Bearer'
  },
  demo: {
    name: '免 Key 預覽',
    format: 'demo',
    baseUrl: 'builtin://demo-simulator',
    defaultModel: 'grok-4.7-preview',
    models: [
      { id: 'grok-4.7-preview', name: 'Grok 4.7 (Preview)', supportsThinking: true },
      { id: 'claude-opus-5.5-preview', name: 'Claude Opus 5.5 (Preview)', supportsThinking: true },
      { id: 'gpt-6.1-preview', name: 'GPT-6.1 (Preview)', supportsThinking: false }
    ],
    requiresKey: false,
    keyPlaceholder: '免金鑰預覽'
  }
};

const STORAGE_KEYS = {
  CONFIG: 'novachat_cfg_v2',
  PROFILES: 'novachat_profiles_v2',
  CHATS: 'novachat_chats_v2',
  ACTIVE_CHAT: 'novachat_active_v2',
  THEME: 'novachat_theme_v2'
};

const state = {
  config: {
    provider: 'grok',
    format: 'openai',
    baseUrl: 'https://api.x.ai/v1',
    apiKey: '',
    model: 'grok-4.7',
    customHeaders: '',
    stream: true,
    systemPrompt: '',
    temperature: 0.7,
    contextLimit: 20
  },
  profiles: {},
  chats: [],
  activeChatId: null,
  attachments: [],
  isGenerating: false,
  abortController: null,
  modalSelectedProvider: 'grok'
};

const el = {};

document.addEventListener('DOMContentLoaded', () => {
  cacheElements();
  configureMarkdown();
  loadStateFromStorage();
  initTheme();
  bindEvents();
  renderAll();
});

function cacheElements() {
  el.sidebar = document.getElementById('sidebar');
  el.sidebarBackdrop = document.getElementById('sidebarBackdrop');
  el.toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
  el.closeSidebarBtn = document.getElementById('closeSidebarBtn');
  el.newChatBtn = document.getElementById('newChatBtn');
  el.chatList = document.getElementById('chatList');

  el.sidebarStatusDot = document.getElementById('sidebarStatusDot');
  el.sidebarProviderName = document.getElementById('sidebarProviderName');
  el.sidebarKeyStatus = document.getElementById('sidebarKeyStatus');
  el.openSettingsSidebarBtn = document.getElementById('openSettingsSidebarBtn');

  el.openSettingsTopBtn = document.getElementById('openSettingsTopBtn');
  el.topProviderBadge = document.getElementById('topProviderBadge');
  el.topModelName = document.getElementById('topModelName');
  el.openPromptModalBtn = document.getElementById('openPromptModalBtn');
  el.exportChatBtn = document.getElementById('exportChatBtn');
  el.themeToggleBtn = document.getElementById('themeToggleBtn');
  el.themeIconSun = document.getElementById('themeIconSun');
  el.themeIconMoon = document.getElementById('themeIconMoon');

  el.messagesViewport = document.getElementById('messagesViewport');
  el.emptyState = document.getElementById('emptyState');
  el.emptyGreeting = document.getElementById('emptyGreeting');
  el.messagesList = document.getElementById('messagesList');

  el.attachmentStrip = document.getElementById('attachmentStrip');
  el.messageInput = document.getElementById('messageInput');
  el.fileInput = document.getElementById('fileInput');
  el.clearContextBtn = document.getElementById('clearContextBtn');
  el.stopGenBtn = document.getElementById('stopGenBtn');
  el.sendBtn = document.getElementById('sendBtn');

  // Modal elements
  el.apiSettingsModal = document.getElementById('apiSettingsModal');
  el.closeApiModalBtn = document.getElementById('closeApiModalBtn');
  el.cancelApiModalBtn = document.getElementById('cancelApiModalBtn');
  el.providerTabs = document.getElementById('providerTabs');
  el.apiFormatSelect = document.getElementById('apiFormatSelect');
  el.apiBaseUrlInput = document.getElementById('apiBaseUrlInput');
  el.apiKeyInput = document.getElementById('apiKeyInput');
  el.toggleKeyVisibilityBtn = document.getElementById('toggleKeyVisibilityBtn');
  el.modelInput = document.getElementById('modelInput');
  el.modelSuggestionsList = document.getElementById('modelSuggestionsList');
  el.modelPresetChips = document.getElementById('modelPresetChips');
  el.customHeadersInput = document.getElementById('customHeadersInput');
  el.testResultBox = document.getElementById('testResultBox');
  el.testConnectionBtn = document.getElementById('testConnectionBtn');
  el.saveApiSettingsBtn = document.getElementById('saveApiSettingsBtn');

  el.promptSettingsModal = document.getElementById('promptSettingsModal');
  el.closePromptModalBtn = document.getElementById('closePromptModalBtn');
  el.systemPromptInput = document.getElementById('systemPromptInput');
  el.temperatureRange = document.getElementById('temperatureRange');
  el.temperatureVal = document.getElementById('temperatureVal');
  el.contextLimitRange = document.getElementById('contextLimitRange');
  el.contextLimitVal = document.getElementById('contextLimitVal');
  el.resetPromptParamsBtn = document.getElementById('resetPromptParamsBtn');
  el.savePromptParamsBtn = document.getElementById('savePromptParamsBtn');

  el.toastContainer = document.getElementById('toastContainer');
}

function configureMarkdown() {
  if (!window.marked) return;
  const renderer = new marked.Renderer();
  renderer.code = function (codeOrToken, langArg) {
    let codeText = typeof codeOrToken === 'object' ? codeOrToken.text || '' : String(codeOrToken || '');
    let language = (typeof codeOrToken === 'object' ? codeOrToken.lang : langArg) || '';
    let highlighted = escapeHtml(codeText);
    if (window.hljs) {
      try {
        if (language && hljs.getLanguage(language)) {
          highlighted = hljs.highlight(codeText, { language }).value;
        } else {
          highlighted = hljs.highlightAuto(codeText).value;
        }
      } catch (_) {}
    }
    return `<pre><code class="hljs">${highlighted}</code></pre>`;
  };
  marked.setOptions({ renderer, gfm: true, breaks: true });
}

function loadStateFromStorage() {
  try {
    const p = localStorage.getItem(STORAGE_KEYS.PROFILES);
    if (p) state.profiles = JSON.parse(p);

    const c = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (c) state.config = { ...state.config, ...JSON.parse(c) };

    const ch = localStorage.getItem(STORAGE_KEYS.CHATS);
    if (ch) state.chats = JSON.parse(ch);

    const a = localStorage.getItem(STORAGE_KEYS.ACTIVE_CHAT);
    if (a && state.chats.some((x) => x.id === a)) {
      state.activeChatId = a;
    } else if (state.chats.length > 0) {
      state.activeChatId = state.chats[0].id;
    } else {
      createNewChat(false);
    }
  } catch (err) {
    createNewChat(false);
  }
}

function saveConfigToStorage() {
  state.profiles[state.config.provider] = {
    format: state.config.format,
    baseUrl: state.config.baseUrl,
    apiKey: state.config.apiKey,
    model: state.config.model,
    customHeaders: state.config.customHeaders
  };
  localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(state.profiles));
  localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(state.config));
}

function saveChatsToStorage() {
  localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(state.chats));
  if (state.activeChatId) localStorage.setItem(STORAGE_KEYS.ACTIVE_CHAT, state.activeChatId);
}

function initTheme() {
  const theme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  setTheme(theme);
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
  if (theme === 'dark') {
    el.themeIconSun.classList.remove('hidden');
    el.themeIconMoon.classList.add('hidden');
  } else {
    el.themeIconSun.classList.add('hidden');
    el.themeIconMoon.classList.remove('hidden');
  }
}

function bindEvents() {
  el.toggleSidebarBtn.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      el.sidebar.classList.toggle('mobile-open');
    } else {
      el.sidebar.classList.toggle('collapsed');
    }
  });

  el.closeSidebarBtn.addEventListener('click', () => el.sidebar.classList.remove('mobile-open'));
  el.sidebarBackdrop.addEventListener('click', () => el.sidebar.classList.remove('mobile-open'));

  el.newChatBtn.addEventListener('click', () => {
    createNewChat(true);
    el.sidebar.classList.remove('mobile-open');
  });

  el.themeToggleBtn.addEventListener('click', (e) => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!document.startViewTransition || reduceMotion) {
      setTheme(next);
      return;
    }

    const rect = el.themeToggleBtn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const transition = document.startViewTransition(() => setTheme(next));
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 520, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    });
  });

  const openApiModal = () => {
    populateApiModal(state.config.provider);
    el.testResultBox.classList.add('hidden');
    el.apiSettingsModal.showModal();
  };
  el.openSettingsSidebarBtn.addEventListener('click', openApiModal);
  el.openSettingsTopBtn.addEventListener('click', openApiModal);
  el.closeApiModalBtn.addEventListener('click', () => el.apiSettingsModal.close());
  el.cancelApiModalBtn.addEventListener('click', () => el.apiSettingsModal.close());

  // Provider Tab Switching
  el.providerTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    saveDraftProfile(state.modalSelectedProvider);
    populateApiModal(btn.dataset.provider);
    el.testResultBox.classList.add('hidden');
  });

  el.toggleKeyVisibilityBtn.addEventListener('click', () => {
    const isPwd = el.apiKeyInput.type === 'password';
    el.apiKeyInput.type = isPwd ? 'text' : 'password';
    el.toggleKeyVisibilityBtn.textContent = isPwd ? '隱藏' : '顯示';
  });

  el.modelPresetChips.addEventListener('click', (e) => {
    const pill = e.target.closest('.mini-pill');
    if (!pill) return;
    el.modelInput.value = pill.dataset.model;
    highlightModelPill(pill.dataset.model);
  });

  el.modelInput.addEventListener('input', () => {
    highlightModelPill(el.modelInput.value.trim());
  });

  el.testConnectionBtn.addEventListener('click', testApiConnection);

  el.saveApiSettingsBtn.addEventListener('click', () => {
    state.config.provider = state.modalSelectedProvider;
    state.config.format = el.apiFormatSelect.value;
    state.config.baseUrl = el.apiBaseUrlInput.value.trim().replace(/\/+$/, '');
    state.config.apiKey = el.apiKeyInput.value.trim();
    state.config.model = el.modelInput.value.trim() || PROVIDER_PRESETS[state.modalSelectedProvider].defaultModel;
    state.config.customHeaders = el.customHeadersInput.value.trim();

    saveConfigToStorage();
    renderHeaderAndStatus();
    el.apiSettingsModal.close();
    showToast(`已套用：${PROVIDER_PRESETS[state.config.provider]?.name}`);
  });

  // Prompt Modal
  el.openPromptModalBtn.addEventListener('click', () => {
    el.systemPromptInput.value = state.config.systemPrompt;
    el.temperatureRange.value = state.config.temperature;
    el.temperatureVal.textContent = state.config.temperature;
    el.contextLimitRange.value = state.config.contextLimit;
    el.contextLimitVal.textContent = `${state.config.contextLimit} 則`;
    el.promptSettingsModal.showModal();
  });

  el.closePromptModalBtn.addEventListener('click', () => el.promptSettingsModal.close());
  el.temperatureRange.addEventListener('input', () => {
    el.temperatureVal.textContent = el.temperatureRange.value;
  });
  el.contextLimitRange.addEventListener('input', () => {
    el.contextLimitVal.textContent = `${el.contextLimitRange.value} 則`;
  });

  el.resetPromptParamsBtn.addEventListener('click', () => {
    el.systemPromptInput.value = '';
    el.temperatureRange.value = 0.7;
    el.temperatureVal.textContent = '0.7';
    el.contextLimitRange.value = 20;
    el.contextLimitVal.textContent = '20 則';
  });

  el.savePromptParamsBtn.addEventListener('click', () => {
    state.config.systemPrompt = el.systemPromptInput.value.trim();
    state.config.temperature = parseFloat(el.temperatureRange.value);
    state.config.contextLimit = parseInt(el.contextLimitRange.value, 10);
    saveConfigToStorage();
    el.promptSettingsModal.close();
    showToast('已儲存設定');
  });

  // Composer
  el.messageInput.addEventListener('input', () => {
    autoResizeTextarea();
    updateSendBtnState();
  });

  el.messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      if (!state.isGenerating) handleSendMessage();
    }
  });

  el.sendBtn.addEventListener('click', handleSendMessage);
  el.stopGenBtn.addEventListener('click', () => {
    if (state.abortController) state.abortController.abort();
  });

  el.clearContextBtn.addEventListener('click', () => {
    const c = getActiveChat();
    if (!c || c.messages.length === 0) return;
    c.messages = [];
    c.title = '新對話';
    saveChatsToStorage();
    renderAll();
  });

  el.exportChatBtn.addEventListener('click', exportActiveChatToMarkdown);
  el.fileInput.addEventListener('change', handleFileSelect);
  el.messagesList.addEventListener('click', handleMessageListClick);
}

function saveDraftProfile(providerKey) {
  if (!providerKey) return;
  state.profiles[providerKey] = {
    format: el.apiFormatSelect.value,
    baseUrl: el.apiBaseUrlInput.value.trim(),
    apiKey: el.apiKeyInput.value.trim(),
    model: el.modelInput.value.trim(),
    customHeaders: el.customHeadersInput.value.trim()
  };
}

function populateApiModal(providerKey) {
  state.modalSelectedProvider = providerKey;
  const preset = PROVIDER_PRESETS[providerKey] || PROVIDER_PRESETS.custom;
  const saved = state.profiles[providerKey] || (state.config.provider === providerKey ? state.config : null);

  el.providerTabs.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.provider === providerKey);
  });

  el.apiFormatSelect.value = saved?.format || preset.format;
  el.apiBaseUrlInput.value = saved?.baseUrl || preset.baseUrl;
  el.apiKeyInput.value = saved?.apiKey ?? '';
  el.apiKeyInput.placeholder = preset.keyPlaceholder;
  el.modelInput.value = saved?.model || preset.defaultModel;
  el.customHeadersInput.value = saved?.customHeaders || '';

  renderModelSuggestions(preset.models, el.modelInput.value);
}

function renderModelSuggestions(models, activeModel) {
  el.modelSuggestionsList.innerHTML = models
    .map((m) => {
      const id = typeof m === 'object' ? m.id : m;
      const label = typeof m === 'object' ? `${m.name} (${m.id})` : m;
      return `<option value="${escapeHtml(id)}">${escapeHtml(label)}</option>`;
    })
    .join('');

  el.modelPresetChips.innerHTML = models
    .map((m) => {
      const id = typeof m === 'object' ? m.id : m;
      const name = typeof m === 'object' ? m.name : m;
      const thinkingBadge = typeof m === 'object' && m.supportsThinking ? '<span class="think-tag" title="支援深度思考推理">💭 Think</span>' : '';
      return `
        <button type="button" class="mini-pill ${id === activeModel ? 'active' : ''}" data-model="${escapeHtml(id)}">
          <span>${escapeHtml(name)}</span>
          ${thinkingBadge}
        </button>
      `;
    })
    .join('');
}

function highlightModelPill(modelName) {
  el.modelPresetChips.querySelectorAll('.mini-pill').forEach((p) => {
    p.classList.toggle('active', p.dataset.model === modelName);
  });
}

async function testApiConnection() {
  const draftConfig = {
    provider: state.modalSelectedProvider,
    format: el.apiFormatSelect.value,
    baseUrl: el.apiBaseUrlInput.value.trim().replace(/\/+$/, ''),
    apiKey: el.apiKeyInput.value.trim(),
    model: el.modelInput.value.trim() || 'grok-2-latest',
    customHeaders: el.customHeadersInput.value.trim(),
    stream: false,
    temperature: 0.2
  };

  el.testConnectionBtn.disabled = true;
  el.testResultBox.classList.remove('hidden', 'success', 'error');
  el.testResultBox.textContent = '測試連線中...';

  const start = performance.now();
  try {
    const res = await sendSingleTestRequest(draftConfig);
    const ms = Math.round(performance.now() - start);
    el.testResultBox.classList.add('success');
    el.testResultBox.textContent = `連線成功 (${ms}ms) · 回應：「${res.slice(0, 40)}」`;
  } catch (err) {
    el.testResultBox.classList.add('error');
    el.testResultBox.textContent = `連線失敗：${err.message}`;
  } finally {
    el.testConnectionBtn.disabled = false;
  }
}

function createNewChat(shouldRender = true) {
  const cur = getActiveChat();
  if (cur && cur.messages.length === 0) {
    if (shouldRender) {
      renderAll();
      el.messageInput.focus();
    }
    return cur;
  }
  const chat = {
    id: 'c_' + Date.now(),
    title: '新對話',
    createdAt: Date.now(),
    messages: []
  };
  state.chats.unshift(chat);
  state.activeChatId = chat.id;
  saveChatsToStorage();
  if (shouldRender) {
    renderAll();
    el.messageInput.focus();
  }
  return chat;
}

function getActiveChat() {
  return state.chats.find((c) => c.id === state.activeChatId) || null;
}

function renderAll() {
  renderHeaderAndStatus();
  renderChatList();
  renderMessages();
  renderAttachments();
  updateSendBtnState();
}

function renderHeaderAndStatus() {
  const preset = PROVIDER_PRESETS[state.config.provider] || PROVIDER_PRESETS.custom;
  const hasKey = Boolean(state.config.apiKey) || !preset.requiresKey || state.config.format === 'demo';

  el.topProviderBadge.textContent = preset.name;
  el.topModelName.textContent = state.config.model;
  el.sidebarProviderName.textContent = `${preset.name}`;
  el.sidebarKeyStatus.textContent = hasKey ? '已就緒' : '未設定金鑰';
  el.sidebarStatusDot.classList.toggle('ready', hasKey);
}

function renderChatList() {
  if (state.chats.length === 0) {
    el.chatList.innerHTML = '';
    return;
  }
  el.chatList.innerHTML = state.chats
    .map((chat) => {
      const isActive = chat.id === state.activeChatId;
      return `
        <div class="chat-item ${isActive ? 'active' : ''}" data-id="${chat.id}">
          <span class="chat-item-title">${escapeHtml(chat.title)}</span>
          <button class="chat-item-del" data-id="${chat.id}" title="刪除">×</button>
        </div>
      `;
    })
    .join('');

  el.chatList.querySelectorAll('.chat-item').forEach((item) => {
    item.addEventListener('click', (e) => {
      if (e.target.classList.contains('chat-item-del')) {
        e.stopPropagation();
        deleteChat(item.dataset.id);
        return;
      }
      state.activeChatId = item.dataset.id;
      saveChatsToStorage();
      renderChatList();
      renderMessages();
      el.sidebar.classList.remove('mobile-open');
    });
  });
}

function deleteChat(id) {
  const idx = state.chats.findIndex((c) => c.id === id);
  if (idx === -1) return;
  state.chats.splice(idx, 1);
  if (state.chats.length === 0) createNewChat(false);
  else if (state.activeChatId === id) state.activeChatId = state.chats[0].id;
  saveChatsToStorage();
  renderAll();
}

const TYPING_DOTS_HTML = '<span class="typing-dots" aria-label="思考中"><i></i><i></i><i></i></span>';
const renderTrack = { chatId: null, count: 0 };

function renderMessages() {
  const cur = getActiveChat();
  if (!cur || cur.messages.length === 0) {
    el.emptyState.classList.remove('hidden');
    el.messagesList.classList.add('hidden');
    el.messagesList.innerHTML = '';
    renderTrack.chatId = cur ? cur.id : null;
    renderTrack.count = 0;
    return;
  }

  el.emptyState.classList.add('hidden');
  el.messagesList.classList.remove('hidden');

  // Decide which rows get an entrance animation
  const switchedChat = renderTrack.chatId !== cur.id;
  const animateFrom = switchedChat ? 0 : renderTrack.count;
  renderTrack.chatId = cur.id;
  renderTrack.count = cur.messages.length;

  el.messagesList.innerHTML = cur.messages
    .map((msg, idx) => {
      const isUser = msg.role === 'user';
      let attachmentsHtml = '';
      if (msg.attachments && msg.attachments.length > 0) {
        attachmentsHtml = `<div style="display:flex;gap:6px;margin-bottom:6px;">${msg.attachments
          .map((a) => (a.type === 'image' ? `<img src="${a.dataUrl}" style="max-height:120px;border-radius:6px;"/>` : `<span style="font-size:0.75rem;padding:2px 6px;background:var(--bg-subtle);border-radius:4px;">📄 ${escapeHtml(a.name)}</span>`))
          .join('')}</div>`;
      }

      const assistantInner = msg.streaming && !msg.content ? TYPING_DOTS_HTML : renderMarkdownSafe(msg.content || '');
      const body = isUser
        ? `<div class="message-bubble">${attachmentsHtml}${escapeHtml(msg.content)}</div>`
        : `<div class="message-bubble"><div class="markdown-body ${msg.streaming ? 'streaming-cursor' : ''}">${assistantInner}</div></div>`;

      let animClass = '';
      let animStyle = '';
      if (idx >= animateFrom) {
        animClass = 'animate-in';
        if (switchedChat) animStyle = `style="--stagger:${Math.min(idx, 8) * 45}ms"`;
      }

      return `
        <div class="message-row ${isUser ? 'user' : 'assistant'} ${animClass}" data-idx="${idx}" ${animStyle}>
          ${body}
          <div class="message-actions">
            <button class="msg-act-link" data-act="copy" data-idx="${idx}">複製</button>
            ${isUser ? `<button class="msg-act-link" data-act="edit" data-idx="${idx}">編輯</button>` : `<button class="msg-act-link" data-act="regen" data-idx="${idx}">重試</button>`}
          </div>
        </div>
      `;
    })
    .join('');

  scrollToBottom();
}

function renderMarkdownSafe(mdText) {
  if (!window.marked) return escapeHtml(mdText);
  const raw = marked.parse(mdText);
  return window.DOMPurify ? DOMPurify.sanitize(raw) : raw;
}

function handleMessageListClick(e) {
  const btn = e.target.closest('.msg-act-link');
  if (!btn || state.isGenerating) return;

  const idx = parseInt(btn.dataset.idx, 10);
  const act = btn.dataset.act;
  const chat = getActiveChat();
  if (!chat || !chat.messages[idx]) return;

  if (act === 'copy') {
    navigator.clipboard.writeText(chat.messages[idx].content || '').then(() => showToast('已複製'));
  } else if (act === 'edit') {
    el.messageInput.value = chat.messages[idx].content;
    chat.messages.splice(idx);
    saveChatsToStorage();
    renderMessages();
    autoResizeTextarea();
    updateSendBtnState();
    el.messageInput.focus();
  } else if (act === 'regen') {
    chat.messages.splice(idx);
    saveChatsToStorage();
    renderMessages();
    triggerAssistantResponse(chat);
  }
}

async function handleFileSelect(e) {
  const files = Array.from(e.target.files || []);
  for (const f of files) {
    if (f.type.startsWith('image/')) {
      const dataUrl = await readFileAsDataUrl(f);
      state.attachments.push({ type: 'image', name: f.name, mimeType: f.type, dataUrl });
    } else {
      const content = await f.text();
      state.attachments.push({ type: 'text', name: f.name, content: content.slice(0, 30000) });
    }
  }
  el.fileInput.value = '';
  renderAttachments();
  updateSendBtnState();
}

function readFileAsDataUrl(file) {
  return new Promise((resolve) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.readAsDataURL(file);
  });
}

function renderAttachments() {
  if (state.attachments.length === 0) {
    el.attachmentStrip.classList.add('hidden');
    el.attachmentStrip.innerHTML = '';
    return;
  }
  el.attachmentStrip.classList.remove('hidden');
  el.attachmentStrip.innerHTML = state.attachments
    .map(
      (a, i) =>
        `<div class="attachment-pill"><span>${escapeHtml(a.name)}</span><button class="attachment-remove" data-i="${i}">×</button></div>`
    )
    .join('');
  el.attachmentStrip.querySelectorAll('.attachment-remove').forEach((b) => {
    b.addEventListener('click', () => {
      state.attachments.splice(parseInt(b.dataset.i, 10), 1);
      renderAttachments();
      updateSendBtnState();
    });
  });
}

async function handleSendMessage() {
  const text = el.messageInput.value.trim();
  if ((!text && state.attachments.length === 0) || state.isGenerating) return;

  const preset = PROVIDER_PRESETS[state.config.provider] || PROVIDER_PRESETS.custom;
  if (preset.requiresKey && !state.config.apiKey && state.config.format !== 'demo') {
    showToast('請先填入 API Key');
    populateApiModal(state.config.provider);
    el.apiSettingsModal.showModal();
    return;
  }

  const chat = getActiveChat() || createNewChat(false);
  const currentAttachments = [...state.attachments];
  state.attachments = [];
  renderAttachments();

  chat.messages.push({
    role: 'user',
    content: text,
    attachments: currentAttachments,
    timestamp: Date.now()
  });

  if (chat.messages.filter((m) => m.role === 'user').length === 1) {
    chat.title = (text || '對話').slice(0, 20);
  }

  el.messageInput.value = '';
  autoResizeTextarea();
  updateSendBtnState();
  saveChatsToStorage();
  renderChatList();
  renderMessages();

  await triggerAssistantResponse(chat);
}

async function triggerAssistantResponse(chat) {
  state.isGenerating = true;
  state.abortController = new AbortController();
  updateGenerationUI(true);

  const assistantMsg = {
    role: 'assistant',
    content: '',
    model: state.config.model,
    timestamp: Date.now(),
    streaming: true
  };
  chat.messages.push(assistantMsg);
  const assistantIdx = chat.messages.length - 1;
  renderMessages();

  try {
    const context = buildContext(chat.messages.slice(0, -1), state.config.contextLimit);
    const onChunk = (chunk) => {
      assistantMsg.content += chunk;
      updateSingleMsg(assistantIdx, assistantMsg.content);
    };

    if (state.config.format === 'demo') {
      await runDemoSimulator(context, onChunk, state.abortController.signal);
    } else if (state.config.format === 'gemini') {
      await callGeminiApi(context, state.config, onChunk, state.abortController.signal);
    } else if (state.config.format === 'anthropic') {
      await callAnthropicApi(context, state.config, onChunk, state.abortController.signal);
    } else {
      await callOpenAiCompatibleApi(context, state.config, onChunk, state.abortController.signal);
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      assistantMsg.content += ' *(已停止)*';
    } else {
      assistantMsg.content = `⚠️ API 錯誤：${err.message}`;
    }
  } finally {
    assistantMsg.streaming = false;
    state.isGenerating = false;
    state.abortController = null;
    updateGenerationUI(false);
    saveChatsToStorage();
    renderMessages();
  }
}

function updateSingleMsg(idx, content) {
  const row = el.messagesList.querySelector(`.message-row[data-idx="${idx}"]`);
  if (!row) return;
  const bubble = row.querySelector('.markdown-body');
  if (bubble) bubble.innerHTML = renderMarkdownSafe(content);
  scrollToBottom();
}

function buildContext(messages, limit) {
  return messages.slice(-limit).map((m) => {
    let text = m.content || '';
    if (m.attachments) {
      const texts = m.attachments.filter((a) => a.type === 'text');
      if (texts.length) text += '\n' + texts.map((t) => `\n[File: ${t.name}]\n${t.content}`).join('');
    }
    return {
      role: m.role,
      content: text,
      images: (m.attachments || []).filter((a) => a.type === 'image')
    };
  });
}

// Adapters
async function callOpenAiCompatibleApi(context, cfg, onChunk, signal) {
  const url = `${cfg.baseUrl.replace(/\/+$/, '')}/chat/completions`;
  const headers = { 'Content-Type': 'application/json', ...buildExtraHeaders(cfg.customHeaders) };
  if (cfg.apiKey) headers['Authorization'] = `Bearer ${cfg.apiKey}`;

  const msgs = [];
  if (cfg.systemPrompt) msgs.push({ role: 'system', content: cfg.systemPrompt });
  for (const m of context) {
    if (m.images && m.images.length) {
      const parts = [{ type: 'text', text: m.content || '' }];
      m.images.forEach((img) => parts.push({ type: 'image_url', image_url: { url: img.dataUrl } }));
      msgs.push({ role: m.role, content: parts });
    } else {
      msgs.push({ role: m.role, content: m.content });
    }
  }

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: cfg.model,
      messages: msgs,
      temperature: cfg.temperature,
      stream: true
    }),
    signal
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);

  await parseSse(res.body, (data) => {
    if (data === '[DONE]') return;
    try {
      const json = JSON.parse(data);
      const delta = json.choices?.[0]?.delta?.content || '';
      if (delta) onChunk(delta);
    } catch (_) {}
  });
}

async function callGeminiApi(context, cfg, onChunk, signal) {
  const base = cfg.baseUrl.replace(/\/+$/, '');
  const model = cfg.model.startsWith('models/') ? cfg.model : `models/${cfg.model}`;
  const url = `${base}/${model}:streamGenerateContent?alt=sse&key=${encodeURIComponent(cfg.apiKey)}`;

  const contents = context.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content || '' }]
  }));

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents }),
    signal
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);

  await parseSse(res.body, (data) => {
    try {
      const json = JSON.parse(data);
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) onChunk(text);
    } catch (_) {}
  });
}

async function callAnthropicApi(context, cfg, onChunk, signal) {
  const url = `${cfg.baseUrl.replace(/\/+$/, '')}/messages`;
  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': cfg.apiKey,
    'anthropic-version': '2023-06-01',
    'anthropic-dangerous-direct-browser-access': 'true'
  };

  const msgs = context.map((m) => ({ role: m.role, content: m.content }));
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: cfg.model,
      max_tokens: 4096,
      messages: msgs,
      stream: true
    }),
    signal
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);

  await parseSse(res.body, (data) => {
    try {
      const json = JSON.parse(data);
      if (json.type === 'content_block_delta' && json.delta?.text) {
        onChunk(json.delta.text);
      }
    } catch (_) {}
  });
}

async function runDemoSimulator(context, onChunk, signal) {
  const reply = `這是一則預覽回覆。當您填入真實的 API Key（例如 **xAI Grok** 或 **OpenAI**）後，就會直接呼叫對應模型產生即時回答！`;
  for (const char of reply) {
    if (signal.aborted) return;
    onChunk(char);
    await sleep(20);
  }
}

async function sendSingleTestRequest(cfg) {
  if (cfg.format === 'demo') return 'OK';
  const url = `${cfg.baseUrl.replace(/\/+$/, '')}/chat/completions`;
  const headers = { 'Content-Type': 'application/json' };
  if (cfg.apiKey) headers['Authorization'] = `Bearer ${cfg.apiKey}`;

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: cfg.model,
      messages: [{ role: 'user', content: 'Say hi in 1 word' }],
      max_tokens: 5
    })
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || 'OK';
}

async function parseSse(stream, onData) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buf = '';
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    const lines = buf.split('\n');
    buf = lines.pop() || '';
    for (const l of lines) {
      const trimmed = l.trim();
      if (trimmed.startsWith('data:')) {
        onData(trimmed.slice(5).trim());
      }
    }
  }
}

function buildExtraHeaders(raw) {
  try {
    return raw ? JSON.parse(raw) : {};
  } catch (_) {
    return {};
  }
}

function updateGenerationUI(generating) {
  el.stopGenBtn.classList.toggle('hidden', !generating);
  el.sendBtn.classList.toggle('hidden', generating);
}

function updateSendBtnState() {
  const hasText = el.messageInput.value.trim().length > 0;
  const hasAtt = state.attachments.length > 0;
  el.sendBtn.disabled = state.isGenerating || (!hasText && !hasAtt);
}

function autoResizeTextarea() {
  el.messageInput.style.height = 'auto';
  el.messageInput.style.height = Math.min(el.messageInput.scrollHeight, 180) + 'px';
}

function scrollToBottom() {
  el.messagesViewport.scrollTop = el.messagesViewport.scrollHeight;
}

function exportActiveChatToMarkdown() {
  const chat = getActiveChat();
  if (!chat || !chat.messages.length) return showToast('沒有內容可匯出');
  const md = chat.messages.map((m) => `**${m.role === 'user' ? 'User' : 'Assistant'}**:\n\n${m.content}\n`).join('\n---\n\n');
  const blob = new Blob([md], { type: 'text/markdown' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${chat.title}.md`;
  a.click();
}

function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  el.toastContainer.appendChild(t);
  setTimeout(() => t.remove(), 2400);
}

function escapeHtml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
