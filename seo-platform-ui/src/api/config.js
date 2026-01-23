// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  TIMEOUT: 30000,
  ENDPOINTS: {
    // Auth
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    
    // Projects
    PROJECTS: '/projects',
    PROJECT: (id) => `/projects/${id}`,
    
    // Tasks
    TASKS: '/tasks',
    TASK: (id) => `/tasks/${id}`,
    
    // Integrations
    INTEGRATIONS: '/integrations',
    INTEGRATION_CONNECT: (type) => `/integrations/${type}/connect`,
    INTEGRATION_STATUS: (type) => `/integrations/${type}/status`,
    
    // Agents
    AGENTS: '/agents',
    AGENT_EXECUTE: (agentId) => `/agents/${agentId}/execute`,
    
    // Content
    CONTENT_BRIEFS: '/content/briefs',
    ACTION_CHECKLISTS: '/content/checklists',
  }
}

export default API_CONFIG
