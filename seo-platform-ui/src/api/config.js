// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  TIMEOUT: 30000,
  ENDPOINTS: {
    // Auth
    LOGIN: '/api/v1/auth/login',
    LOGOUT: '/api/v1/auth/logout',
    ME: '/api/v1/auth/me',
    
    // Projects
    PROJECTS: '/api/v1/projects/',
    PROJECT: (id) => `/api/v1/projects/${id}`,
    
    // Tasks
    TASKS: '/api/v1/tasks',
    TASK: (id) => `/api/v1/tasks/${id}`,
    
    // Integrations
    INTEGRATIONS: '/api/v1/integrations',
    INTEGRATION_CONNECT: (type) => `/api/v1/integrations/${type}/connect`,
    INTEGRATION_STATUS: (type) => `/api/v1/integrations/${type}/status`,
    
    // Agents
    AGENTS: '/api/v1/agents',
    AGENT_EXECUTE: (agentId) => `/api/v1/agents/${agentId}/execute`,
    
    // Content
    CONTENT_BRIEFS: '/api/v1/content/briefs',
    ACTION_CHECKLISTS: '/api/v1/content/checklists',
  }
}

export default API_CONFIG
