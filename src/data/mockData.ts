import { SaaSPattern, DemoStats } from '../types';

export const saasPatterns: Record<string, SaaSPattern> = {
  'github.com': {
    username: { selector: '#login_field', confidence: 0.95, type: 'input', label: 'Username or email' },
    password: { selector: '#password', confidence: 0.98, type: 'password', label: 'Password' },
    submit: { selector: '[type="submit"]', confidence: 0.90, type: 'button', label: 'Sign in' },
    authMethods: ['Username/Password', 'SSO', 'GitHub Mobile'],
    specificSelectors: {
      username: ['#login_field', '[name="login"]', '.js-username-field'],
      password: ['#password', '[type="password"]', '.js-password-field'],
      submit: ['[type="submit"]', '.btn-primary', 'button:has-text("Sign in")']
    }
  },
  'notion.so': {
    username: { selector: '[data-testid="login-email"]', confidence: 0.92, type: 'email', label: 'Email' },
    password: { selector: '[data-testid="login-password"]', confidence: 0.95, type: 'password', label: 'Password' },
    submit: { selector: '[data-testid="login-submit"]', confidence: 0.88, type: 'button', label: 'Continue with email' },
    authMethods: ['Email/Password', 'Google SSO', 'Apple SSO'],
    specificSelectors: {
      username: ['[data-testid="login-email"]', '[name="email"]', '.email-input'],
      password: ['[data-testid="login-password"]', '[type="password"]', '.password-input'],
      submit: ['[data-testid="login-submit"]', '.login-button', 'button[type="submit"]']
    }
  },
  'dropbox.com': {
    username: { selector: '[name="login_email"]', confidence: 0.93, type: 'email', label: 'Email' },
    password: { selector: '[name="login_password"]', confidence: 0.96, type: 'password', label: 'Password' },
    submit: { selector: '.login-button', confidence: 0.91, type: 'button', label: 'Sign in' },
    authMethods: ['Email/Password', 'Google SSO', 'Apple SSO', 'SSO'],
    specificSelectors: {
      username: ['[name="login_email"]', '#pyxl2u3', '.text-input-input'],
      password: ['[name="login_password"]', '#pyxl2u4', '.password-input'],
      submit: ['.login-button', 'button[type="submit"]', '.auth-button']
    }
  },
  'slack.com': {
    username: { selector: '#email', confidence: 0.94, type: 'email', label: 'Email' },
    password: { selector: '#password', confidence: 0.97, type: 'password', label: 'Password' },
    submit: { selector: '#signin_btn', confidence: 0.89, type: 'button', label: 'Sign In with Email' },
    authMethods: ['Email/Password', 'Google SSO', 'Apple SSO', 'SAML SSO'],
    specificSelectors: {
      username: ['#email', '[name="email"]', '.c-input_text'],
      password: ['#password', '[type="password"]', '.c-input_password'],
      submit: ['#signin_btn', 'button[type="submit"]', '.c-button--primary']
    }
  },
  'trello.com': {
    username: { selector: '#user', confidence: 0.91, type: 'email', label: 'Email' },
    password: { selector: '#password', confidence: 0.94, type: 'password', label: 'Password' },
    submit: { selector: '#login', confidence: 0.87, type: 'button', label: 'Log in' },
    authMethods: ['Email/Password', 'Google SSO', 'Microsoft SSO'],
    specificSelectors: {
      username: ['#user', '[name="user"]', '.form-field-input'],
      password: ['#password', '[type="password"]', '.password-input'],
      submit: ['#login', 'input[type="submit"]', '.btn-login']
    }
  }
};

export const demoStats: DemoStats = {
  pagesAnalyzed: 1247,
  averageConfidence: 87,
  successRate: 94,
  supportedAuthMethods: 8
};

export const supportedPlatforms = [
  { name: 'GitHub', logo: '🐙', status: 'supported' },
  { name: 'Notion', logo: '📝', status: 'supported' },
  { name: 'Slack', logo: '💬', status: 'supported' },
  { name: 'Dropbox', logo: '📦', status: 'supported' },
  { name: 'Trello', logo: '📋', status: 'supported' },
  { name: 'HubSpot', logo: '🔶', status: 'supported' },
  { name: 'Salesforce', logo: '☁️', status: 'coming-soon' },
  { name: 'Zoom', logo: '📹', status: 'coming-soon' }
];

export const exampleUrls = [
  { name: 'GitHub', url: 'https://github.com/login' },
  { name: 'Notion', url: 'https://www.notion.so/login' },
  { name: 'Dropbox', url: 'https://www.dropbox.com/login' },
  { name: 'Slack', url: 'https://slack.com/signin' },
  { name: 'Trello', url: 'https://trello.com/login' }
];