export const randomNameGenerator = () => {
  const adjectives = [
    'Clever',
    'Bold',
    'Swift',
    'Mighty',
    'Serene',
    'Ancient',
    'Steady',
    'Vigilant',
    'Fierce',
    'Gallant',
  ];

  const nouns = [
    'Eagle',
    'Panther',
    'Sage',
    'Oracle',
    'Sentinel',
    'Guardian',
    'Pioneer',
    'Voyager',
    'Maverick',
    'Champion',
  ];

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adjective} ${noun}`;
};
