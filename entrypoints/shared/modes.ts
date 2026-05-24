export const MODES = [
  { id: 'auto_scroll', emoji: '⏩',   label: 'Auto Scroll', matches: [] },
  { id: 'brain_rot',   emoji: '🧠💀', label: 'Brain Rot',   matches: ['brain_rot', 'food_porn'] },
  { id: 'cooking',     emoji: '🍳',   label: 'Cooking',     matches: ['cooking'] },
  { id: 'laugh',       emoji: '😂',   label: 'Laugh',       matches: ['comedy'] },
  { id: 'larp',        emoji: '💎',   label: 'LARP',        matches: ['larp'] },
  { id: 'fitness',     emoji: '💪',   label: 'Fitness',     matches: ['fitness'] },
  { id: 'baddies',     emoji: '💅',   label: 'Baddies',     matches: ['baddies'] },
  { id: 'custom',      emoji: '✨',   label: 'Custom',      matches: [] }
] as const;

export type ModeId = typeof MODES[number]['id'];
export type Category =
  | 'brain_rot' | 'educational' | 'comedy' | 'wholesome'
  | 'food_porn' | 'cooking' | 'news_politics' | 'motivational'
  | 'drama_storytime' | 'wind_down' | 'fitness' | 'startup' | 'larp' | 'baddies' | 'other';

export const CATEGORY_DISPLAY: Record<string, { emoji: string; label: string; color: string }> = {
  brain_rot:       { emoji: '🧠💀', label: 'Brain Rot',     color: '#e74c3c' },
  educational:     { emoji: '📚',   label: 'Educational',   color: '#27ae60' },
  comedy:          { emoji: '😂',   label: 'Comedy',        color: '#f1c40f' },
  wholesome:       { emoji: '💛',   label: 'Wholesome',     color: '#ff69b4' },
  food_porn:       { emoji: '🍔',   label: 'Food Porn',     color: '#e67e22' },
  cooking:         { emoji: '🍳',   label: 'Cooking',       color: '#d35400' },
  news_politics:   { emoji: '📰',   label: 'News/Politics', color: '#7f8c8d' },
  motivational:    { emoji: '💪',   label: 'Motivational',  color: '#3498db' },
  drama_storytime: { emoji: '🎭',   label: 'Drama',         color: '#9b59b6' },
  wind_down:       { emoji: '🌙',   label: 'Wind Down',     color: '#1abc9c' },
  fitness:         { emoji: '🏋️',   label: 'Fitness',       color: '#2980b9' },
  startup:         { emoji: '🚀',   label: 'Startup',       color: '#5856d6' },
  larp:            { emoji: '💎',   label: 'LARP',          color: '#d4af37' },
  baddies:         { emoji: '💅',   label: 'Baddies',       color: '#ff4d80' },
  other:           { emoji: '📦',   label: 'Other',         color: '#95a5a6' }
};
