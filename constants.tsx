
import { Chemical, Rule, SafetyLevel } from './types';

export const COMMON_CHEMICALS: Chemical[] = [
  { id: 'bleach', name: 'Sodium Hypochlorite', formula: 'NaClO', aliases: ['bleach', 'clorox', 'hypochlorite'] },
  { id: 'vinegar', name: 'Acetic Acid', formula: 'CH3COOH', aliases: ['vinegar', 'acetic acid', 'white vinegar'] },
  { id: 'ammonia', name: 'Ammonia', formula: 'NH3', aliases: ['ammonia', 'windex'] },
  { id: 'alcohol', name: 'Isopropyl Alcohol', formula: 'C3H8O', aliases: ['rubbing alcohol', 'iso', 'propan-2-ol'] },
  { id: 'hydrogen-peroxide', name: 'Hydrogen Peroxide', formula: 'H2O2', aliases: ['peroxide', 'h2o2'] },
  { id: 'baking-soda', name: 'Sodium Bicarbonate', formula: 'NaHCO3', aliases: ['baking soda', 'sodium bicarb', 'nahco3'] },
  { id: 'water', name: 'Water', formula: 'H2O', aliases: ['water', 'h2o'] },
  { id: 'acetone', name: 'Acetone', formula: 'C3H6O', aliases: ['nail polish remover', 'acetone'] },
  { id: 'drain-cleaner', name: 'Sodium Hydroxide', formula: 'NaOH', aliases: ['drain cleaner', 'lye', 'caustic soda'] },
  { id: 'salt', name: 'Sodium Chloride', formula: 'NaCl', aliases: ['table salt', 'salt'] },
];

export const REACTION_RULES: Rule[] = [
  {
    chemicals: ['bleach', 'vinegar'],
    result: {
      type: SafetyLevel.DANGEROUS,
      title: 'Toxic Chlorine Gas Production',
      explanation: 'Mixing bleach with an acid (vinegar) releases chlorine gas, which is highly toxic and corrosive.',
      recommendations: ['Do not mix', 'Ensure ventilation', 'Avoid inhalation', 'Call emergency services if exposed']
    }
  },
  {
    chemicals: ['bleach', 'ammonia'],
    result: {
      type: SafetyLevel.DANGEROUS,
      title: 'Toxic Chloramine Vapor',
      explanation: 'Produces chloramine vapors that cause severe respiratory distress and lung damage.',
      recommendations: ['Stop immediately', 'Leave the area', 'Seek fresh air', 'Do not attempt to clean up without protection']
    }
  },
  {
    chemicals: ['bleach', 'alcohol'],
    result: {
      type: SafetyLevel.VERY_DANGEROUS,
      title: 'Chloroform Production',
      explanation: 'The "haloform reaction" creates chloroform and other toxic organochlorines.',
      recommendations: ['Extremely hazardous', 'Do not mix', 'May cause unconsciousness']
    }
  },
  {
    chemicals: ['hydrogen-peroxide', 'vinegar'],
    result: {
      type: SafetyLevel.DANGEROUS,
      title: 'Peracetic Acid Production',
      explanation: 'Forms peracetic acid, which is highly corrosive and can irritate/damage eyes, skin, and lungs.',
      recommendations: ['Corrosive hazard', 'Wear protective gear if handled', 'Do not mix']
    }
  },
  {
    chemicals: ['baking-soda', 'vinegar'],
    result: {
      type: SafetyLevel.MILD,
      title: 'Carbon Dioxide Release',
      explanation: 'Rapidly produces carbon dioxide gas and heat (neutralization reaction). Useful for drain cleaning but can cause pressure buildup in closed containers.',
      recommendations: ['Do not keep in closed containers', 'Safe for open-vessel cleaning']
    }
  },
  {
    chemicals: ['water', 'drain-cleaner'],
    result: {
      type: SafetyLevel.EXOTHERMIC,
      title: 'Strong Exothermic Reaction',
      explanation: 'Adding water to concentrated lye releases significant heat and can cause splashing (boiling).',
      recommendations: ['Add chemical to water, never water to chemical', 'Wear eye protection', 'Be prepared for high heat']
    }
  }
];

export const SAFETY_COLORS = {
  [SafetyLevel.SAFE]: 'var(--safe)',
  [SafetyLevel.MILD]: 'var(--mild)',
  [SafetyLevel.EXOTHERMIC]: 'var(--exo)',
  [SafetyLevel.DANGEROUS]: 'var(--danger)',
  [SafetyLevel.VERY_DANGEROUS]: 'var(--extreme)',
  [SafetyLevel.UNKNOWN]: 'var(--text-muted)'
};
