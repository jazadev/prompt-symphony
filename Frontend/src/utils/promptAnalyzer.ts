
export interface GrammarIssue {
  text: string;
  suggestion: string;
  severity: 'low' | 'medium' | 'high';
  type: 'grammar' | 'spelling' | 'punctuation';
  position: [number, number];
}

export interface ClarityIssue {
  text: string;
  suggestion: string;
  reason: string;
  severity: 'low' | 'medium' | 'high';
  type: 'ambiguity' | 'vagueness' | 'incomplete';
}

export interface EthicalIssue {
  text: string;
  suggestion: string;
  reason: string;
  severity: 'low' | 'medium' | 'high';
  type: 'bias' | 'harmful' | 'sensitive' | 'privacy';
}

export interface OptimizationSuggestion {
  original: string;
  improved: string;
  explanation: string;
  category: 'specificity' | 'structure' | 'context' | 'tone';
}

export interface AnalysisResult {
  grammarIssues: GrammarIssue[];
  clarityIssues: ClarityIssue[];
  ethicalIssues: EthicalIssue[];
  optimizationSuggestions: OptimizationSuggestion[];
  improvedPrompt: string;
  originalPrompt: string;
  analysisScore: {
    grammar: number;
    clarity: number;
    ethics: number;
    overall: number;
  };
}

// Mock data and logic for demo purposes
// In a real application, this would connect to an NLP service or API
export async function analyzePrompt(prompt: string): Promise<AnalysisResult> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const result: AnalysisResult = {
    grammarIssues: [],
    clarityIssues: [],
    ethicalIssues: [],
    optimizationSuggestions: [],
    improvedPrompt: prompt,
    originalPrompt: prompt,
    analysisScore: {
      grammar: 0,
      clarity: 0,
      ethics: 0,
      overall: 0
    }
  };
  
  // Very simple mock analysis - in a real app this would be much more sophisticated

  // Check for common grammar issues
  if (prompt.includes("..") && !prompt.includes("...")) {
    result.grammarIssues.push({
      text: "..",
      suggestion: "...",
      severity: 'low',
      type: 'punctuation',
      position: [prompt.indexOf(".."), prompt.indexOf("..") + 2]
    });
    result.improvedPrompt = result.improvedPrompt.replace("..", "...");
  }
  
  // Look for vague terms
  const vagueTerms = ["cosa", "algo", "etc", "y más", "muchos", "pocos"];
  for (const term of vagueTerms) {
    if (prompt.toLowerCase().includes(term)) {
      result.clarityIssues.push({
        text: term,
        suggestion: `Reemplazar "${term}" con un término más específico`,
        reason: "Los términos vagos pueden llevar a respuestas imprecisas",
        severity: 'medium',
        type: 'vagueness'
      });
    }
  }
  
  // Check for potential ethical issues
  const sensitiveTerms = [
    { term: "raza", type: 'sensitive' as const },
    { term: "odio", type: 'harmful' as const },
    { term: "género", type: 'sensitive' as const },
    { term: "ilegal", type: 'sensitive' as const }
  ];
  
  for (const { term, type } of sensitiveTerms) {
    if (prompt.toLowerCase().includes(term)) {
      result.ethicalIssues.push({
        text: term,
        suggestion: `Considerar reformular para evitar referencias directas a "${term}"`,
        reason: "Este término puede tocar temas sensibles que requieren un enfoque cuidadoso",
        severity: 'medium',
        type
      });
    }
  }
  
  // Optimization suggestions
  if (prompt.length < 20) {
    result.optimizationSuggestions.push({
      original: prompt,
      improved: prompt + " [Se recomienda expandir con más detalles]",
      explanation: "Los prompts muy cortos suelen producir respuestas menos precisas. Añade más contexto y detalles específicos.",
      category: 'specificity'
    });
  }
  
  if (!prompt.includes("?") && prompt.length > 30) {
    const improved = prompt + "?";
    result.optimizationSuggestions.push({
      original: prompt,
      improved,
      explanation: "Formular el prompt como una pregunta clara puede mejorar la calidad de las respuestas.",
      category: 'structure'
    });
    result.improvedPrompt = improved;
  }
  
  // Generate scores
  result.analysisScore = {
    grammar: calculateScore(result.grammarIssues.length, 5),
    clarity: calculateScore(result.clarityIssues.length, 3),
    ethics: calculateScore(result.ethicalIssues.length, 2),
    overall: 0
  };
  
  result.analysisScore.overall = (
    (result.analysisScore.grammar + result.analysisScore.clarity + result.analysisScore.ethics) / 3
  );
  
  if (result.optimizationSuggestions.length > 0) {
    // If we have optimization suggestions and no critical issues, provide an improved version
    const hasImproved = result.improvedPrompt !== prompt;
    if (!hasImproved && result.ethicalIssues.length === 0) {
      // Enhance the prompt with better structure if we haven't already
      result.improvedPrompt = enhancePromptStructure(prompt);
    }
  }
  
  return result;
}

// Helper functions
function calculateScore(issueCount: number, threshold: number): number {
  return Math.max(0, Math.min(100, 100 - (issueCount / threshold) * 100)) / 100;
}

function enhancePromptStructure(prompt: string): string {
  // Very simple enhancement for demo purposes
  let enhanced = prompt;
  
  // Add a polite opener if missing
  if (!prompt.toLowerCase().startsWith("por favor") && 
      !prompt.toLowerCase().startsWith("puedes") &&
      !prompt.toLowerCase().startsWith("podrías")) {
    enhanced = "Por favor, " + enhanced.charAt(0).toLowerCase() + enhanced.slice(1);
  }
  
  // Add a clear request pattern
  if (!enhanced.includes("necesito") && !enhanced.includes("quiero")) {
    enhanced = enhanced.replace(/\. /g, ". Necesito que ");
  }
  
  return enhanced;
}
