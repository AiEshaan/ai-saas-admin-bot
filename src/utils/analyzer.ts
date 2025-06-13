import { AnalysisResult, SaaSPattern } from '../types';
import { saasPatterns } from '../data/mockData';

export const analyzeURL = async (url: string): Promise<AnalysisResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
  
  const domain = extractDomain(url);
  const pattern = saasPatterns[domain] || generateGenericPattern(url);
  
  const baseConfidence = 0.7 + Math.random() * 0.25; // 70-95%
  
  return {
    url,
    timestamp: new Date().toISOString(),
    confidence: Math.round(baseConfidence * 100) / 100,
    elements: {
      username: {
        ...pattern.username,
        confidence: Math.min(0.98, pattern.username.confidence + (Math.random() * 0.1 - 0.05))
      },
      password: {
        ...pattern.password,
        confidence: Math.min(0.99, pattern.password.confidence + (Math.random() * 0.1 - 0.05))
      },
      submit: {
        ...pattern.submit,
        confidence: Math.min(0.95, pattern.submit.confidence + (Math.random() * 0.1 - 0.05))
      }
    },
    authMethods: pattern.authMethods,
    selectors: pattern.specificSelectors,
    recommendations: generateRecommendations(baseConfidence, pattern)
  };
};

const extractDomain = (url: string): string => {
  try {
    const domain = new URL(url).hostname.replace('www.', '');
    return domain;
  } catch {
    return 'unknown.com';
  }
};

const generateGenericPattern = (url: string): SaaSPattern => {
  const confidence = 0.75 + Math.random() * 0.15;
  
  return {
    username: { 
      selector: '#username', 
      confidence: confidence, 
      type: 'input', 
      label: 'Username/Email' 
    },
    password: { 
      selector: '#password', 
      confidence: confidence + 0.05, 
      type: 'password', 
      label: 'Password' 
    },
    submit: { 
      selector: 'button[type="submit"]', 
      confidence: confidence - 0.05, 
      type: 'button', 
      label: 'Sign in' 
    },
    authMethods: ['Username/Password', 'SSO'],
    specificSelectors: {
      username: ['#username', '[name="username"]', '[name="email"]', '.username-input'],
      password: ['#password', '[type="password"]', '.password-field'],
      submit: ['button[type="submit"]', '.login-btn', '.signin-button']
    }
  };
};

const generateRecommendations = (confidence: number, pattern: SaaSPattern): string[] => {
  const recommendations = [];
  
  if (confidence > 0.85) {
    recommendations.push('High confidence detection - ready for automation');
  } else if (confidence > 0.70) {
    recommendations.push('Good detection accuracy - minor validation recommended');
  } else {
    recommendations.push('Moderate confidence - manual verification suggested');
  }
  
  recommendations.push('Multiple selector options available for robust automation');
  
  if (pattern.authMethods.includes('SSO')) {
    recommendations.push('SSO authentication detected - handle redirects appropriately');
  }
  
  if (pattern.authMethods.length > 2) {
    recommendations.push('Multiple auth methods available - implement fallback strategies');
  }
  
  return recommendations;
};

export const generateAutomationCode = (result: AnalysisResult): string => {
  return `// AI-Generated Automation Script for ${result.url}
// Generated on ${new Date(result.timestamp).toLocaleString()}
// Confidence Score: ${Math.round(result.confidence * 100)}%

async function loginToSaaS(page, credentials) {
  try {
    // Navigate to login page
    await page.goto('${result.url}');
    
    // Smart element detection with fallback selectors
    const usernameField = await page.locator('${result.selectors.username.join(", ")}').first();
    const passwordField = await page.locator('${result.selectors.password.join(", ")}').first();
    const submitButton = await page.locator('${result.selectors.submit.join(", ")}').first();
    
    // Intelligent form filling
    await usernameField.waitFor({ state: 'visible' });
    await usernameField.fill(credentials.username);
    
    await passwordField.waitFor({ state: 'visible' });
    await passwordField.fill(credentials.password);
    
    // Submit form
    await submitButton.click();
    
    // Wait for navigation or error handling
    await page.waitForLoadState('networkidle');
    
    // Verify successful login
    const isLoggedIn = await page.locator('[data-testid="user-menu"], .user-profile, .logout-btn').isVisible();
    
    return {
      success: isLoggedIn,
      url: page.url(),
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Login automation failed:', error);
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

// Usage example
const result = await loginToSaaS(page, {
  username: 'your-username@example.com',
  password: 'your-secure-password'
});

console.log('Automation result:', result);`;
};