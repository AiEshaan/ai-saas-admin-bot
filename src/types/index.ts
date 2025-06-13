export interface AnalysisResult {
  url: string;
  timestamp: string;
  confidence: number;
  elements: {
    username: ElementDetection;
    password: ElementDetection;
    submit: ElementDetection;
  };
  authMethods: string[];
  selectors: SelectorGroup;
  recommendations: string[];
}

export interface ElementDetection {
  selector: string;
  confidence: number;
  type: string;
  label?: string;
}

export interface SelectorGroup {
  username: string[];
  password: string[];
  submit: string[];
}

export interface SaaSPattern {
  username: ElementDetection;
  password: ElementDetection;
  submit: ElementDetection;
  authMethods: string[];
  specificSelectors: SelectorGroup;
}

export interface DemoStats {
  pagesAnalyzed: number;
  averageConfidence: number;
  successRate: number;
  supportedAuthMethods: number;
}