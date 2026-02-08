
export enum SafetyLevel {
  SAFE = 'Safe',
  MILD = 'Mild',
  EXOTHERMIC = 'Exothermic',
  DANGEROUS = 'Dangerous',
  VERY_DANGEROUS = 'Very Dangerous',
  UNKNOWN = 'No data available'
}

export interface Chemical {
  id: string;
  name: string;
  formula: string;
  aliases: string[];
}

export interface ReactionResult {
  type: SafetyLevel;
  title: string;
  explanation: string;
  recommendations: string[];
  chemicals: [string, string];
  timestamp: number;
}

export interface Rule {
  chemicals: [string, string]; // IDs
  result: Omit<ReactionResult, 'timestamp' | 'chemicals'>;
}
