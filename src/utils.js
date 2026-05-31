export const C = {
  bg:        '#f4edd8',
  paper:     '#faf6ec',
  ink:       '#2c1810',
  inkLight:  '#7a5c4e',
  gold:      '#c9a84c',
  goldLight: '#e8d5a3',
  purple:    '#3d2b6b',
  orange:    '#c05621',
  blue:      '#1a5276',
  green:     '#1e6b45',
  red:       '#922b21',
  border:    '#c4a882',
};

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function fmt(s) {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

export function cellColor(t) {
  if (t === 'inicio')  return '#2b6cb0';
  if (t === 'fim')     return '#b8860b';
  if (t === 'dilema')  return '#e8752a';
  if (t === 'sabias')  return '#f5b93a';
  if (t === 'reflete') return '#3aaa60';
  return '#aaa';
}
