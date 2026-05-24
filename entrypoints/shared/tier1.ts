const HASHTAG_NOISE = new Set([
  'fyp', 'foryoupage', 'foryou', 'viral', 'trending', 'parati', 'xyzbca'
]);

const KEYWORD_MAP: Record<string, { keywords: string[]; hashtags: string[] }> = {
  cooking: {
    // Cooking demands BOTH instructional language (recipe/how-to-make) AND
    // cooking-specific terms. Generic food hashtags alone are NOT cooking.
    keywords: ['recipe', 'how to make', 'how to cook', 'ingredients:', 'preheat', 'simmer for', 'sauté', 'whisk together', 'fold in', 'minutes at', 'stir in', 'bake at'],
    hashtags: ['cookingtiktok', 'easyrecipe', 'recipevideo', 'cookingclass', 'cheflife', 'kitchenhacks']
  },
  educational: {
    keywords: ['how to', 'tutorial', 'explained', 'tip:', 'did you know', 'pro tip', 'lesson', 'fact:', 'in this video'],
    hashtags: ['learnontiktok', 'edutok', 'studytok', 'didyouknow', 'sciencetok', 'history', 'tutorial']
  },
  comedy: {
    keywords: ['skit', 'pov:', 'when you', 'when my', 'me when', 'tell me without telling me', 'pov when'],
    hashtags: ['comedy', 'funny', 'humor', 'jokes', 'meme', 'lmao']
  },
  fitness: {
    keywords: [
      'shirtless', 'pump', 'pump cover', 'gym session', 'workout',
      'deadlift', 'squat', 'bench press', 'chest day', 'back day',
      'leg day', 'arm day', 'lifting', 'gainz', 'shredded',
      'physique', 'natty', 'mens physique', 'bodybuilding',
      'cutting', 'bulking', 'reps', 'sets', 'rep range', 'gym pr',
      'six pack', 'aesthetic gym', 'gym flex', 'flexing muscle'
    ],
    hashtags: [
      'gymtok', 'fittok', 'fitness', 'gymrat', 'bodybuilding',
      'physique', 'gainz', 'gym', 'gymflex', 'shredded',
      'mensphysique', 'womensphysique', 'natty', 'lifting',
      'fitfam', 'fitspo', 'workout', 'gymmotivation', 'gymlife',
      'chestday', 'backday', 'legday', 'pumpcover', 'sixpack',
      'aestheticgym', 'gymbros', 'gymtransformation'
    ]
  },
  baddies: {
    keywords: [
      'baddie', 'bad bitch', 'pretty privilege', 'glam', 'glow up',
      'outfit of the day', 'ootd', 'fit check', 'feeling cute',
      'baddie aesthetic', 'gym girl', 'fit girl', 'gym fit',
      'how she walks', 'just girls'
    ],
    hashtags: [
      'baddie', 'baddies', 'baddietok', 'baddievibes', 'baddieaesthetic',
      'badbitch', 'badbitchenergy',
      'fitgirl', 'fitgirls', 'gymgirl', 'gymgirls', 'gymbaddie',
      'glam', 'glamour', 'glammakeup', 'ootd', 'fashiongirl',
      'fashionista', 'fitcheck', 'fitcheckdaily',
      'glowup', 'glowupchallenge', 'instabaddie',
      'baddiesonly', 'thatgirl', 'cleangirl', 'cleangirlaesthetic',
      'softgirl', 'gymgirlaesthetic', 'gymgirlfit'
    ]
  },
  motivational: {
    keywords: ['grind', 'success', 'never give up', 'mindset', 'discipline', 'hustle', 'mentality'],
    hashtags: ['motivation', 'sigma', 'mindset', 'success', 'entrepreneur', 'inspiration']
  },
  brain_rot: {
    // Tight brain rot signals — must indicate ANIMATED/AI/EDITED content.
    // Removed satisfying/asmr/slime (often real people doing real things).
    keywords: [
      'skibidi', 'skibidi toilet',
      'sigma', 'gigachad', 'gyatt', 'rizz', 'ohio', 'fanum',
      'mewing', 'looksmax', 'looksmaxxing',
      'subway surfers', 'minecraft parkour',
      'ai voice', 'ai narrator', 'ai voiceover',
      'peter griffin', 'family guy edit', 'stewie',
      'spongebob edit', 'simpsons edit',
      'anime edit', 'animeedit'
    ],
    hashtags: [
      // Skibidi + meme brainrot
      'skibidi', 'skibiditoilet', 'brainrot',
      'sigma', 'sigmaedit', 'sigmamale', 'gigachad',
      'gyatt', 'rizz', 'ohio', 'fanumtax', 'mewing', 'looksmaxxing',
      // AI / animated content
      'aigenerated', 'aivoice', 'aivideo', 'aishorts', 'airelaxing',
      'familyguy', 'familyguyedit', 'peterstewieedit', 'petergriffin',
      'spongebob', 'spongebobedit', 'simpsonsedit', 'rickandmorty',
      // Edits with phonk music
      'phonk', 'phonky', 'phonkedit', 'phonkmusic',
      'animeedit', 'animeedits', 'manhwa', 'manhwaedit',
      // Multi-layer filler / parkour background
      'subwaysurfers', 'minecraftparkour', 'parkour',
      // Generic brainrot tags
      'edit', 'edits', 'cope', 'slop', 'sloppost', 'ragebait'
    ]
  },
  wholesome: {
    keywords: ['rescued', 'wholesome', 'made my day', 'good news'],
    hashtags: ['wholesome', 'cute', 'feelgood', 'adoption', 'kindness']
  },
  food_porn: {
    keywords: [],
    hashtags: ['foodporn', 'food', 'yummy', 'tasty', 'foodie']
  },
  larp: {
    // Tight LARP signals only — luxury ITEMS and explicit flex phrases.
    // Avoid generic finance/business/lifestyle terms which create false positives.
    keywords: [
      // Cars — only the absolute flex brands
      'lamborghini', 'lambo', 'ferrari', 'mclaren', 'rolls royce', 'bentley',
      'aventador', 'huracan', 'urus', 'g wagon', 'g-wagon', 'g63',
      // Watches — only the absolute flex brands
      'rolex', 'patek philippe', 'audemars piguet', 'richard mille',
      // Designer flex (specific brands only)
      'birkin', 'louis vuitton', 'hermes bag', 'gucci flex',
      // Explicit flex phrases
      'secured the bag', 'first million', 'made my first million',
      'luxury lifestyle', "i'm rich", "i'm so rich", 'rich kid',
      'private jet', 'mansion tour', 'penthouse tour',
      // Wealth-personality content (very LARP-specific)
      'andrew tate', 'tristan tate', 'iman gadzhi', 'tai lopez', 'grant cardone',
      'alpha male', 'sigma grindset', 'high value man'
    ],
    hashtags: [
      // Cars
      'lambo', 'lamborghini', 'ferrari', 'mclaren', 'bentley', 'rollsroyce',
      'supercar', 'supercars', 'exoticcars', 'exoticcar',
      'sportscar', 'sportscars', 'luxurycar', 'luxurycars',
      'aventador', 'huracan', 'urus', 'gwagon', 'g63',
      // Watches
      'rolex', 'rolexwatch', 'patekphilippe', 'audemarspiguet', 'richardmille',
      'luxurywatches',
      // Designer
      'birkin', 'hermesbirkin', 'louisvuitton', 'gucciflex',
      // Wealth
      'luxurylifestyle', 'richlife', 'millionairelifestyle', 'billionairelifestyle',
      'millionaire', 'billionaire',
      // Personalities + alpha-male
      'andrewtate', 'tristantate', 'sigmamale', 'alphamale', 'sigmagrindset',
      'sigmaedit', 'highvalueman', 'imanagadzhi', 'tailopez', 'grantcardone',
      // Flex / money
      'flex', 'moneyflex', 'getrichquick',
      // Lifestyle (specific to flex)
      'privatejet', 'oldmoney', 'newmoney', 'hustlegrindset'
    ]
  },
  startup: {
    keywords: [
      'startup', 'founder', 'y combinator', ' yc ', 'seed round', 'series a',
      'mvp', 'product market fit', 'pmf', 'fundraising', 'pitch deck',
      'launching', 'building in public', 'saas', 'indie hacker'
    ],
    hashtags: [
      'startup', 'startups', 'founder', 'founders', 'ycombinator', 'yc',
      'startuplife', 'entrepreneur', 'saas', 'indiehackers', 'buildinpublic',
      'techstartup', 'siliconvalley', 'techtok'
    ]
  }
};

export function tier1Classify(caption: string, hashtags: string[], sound: string) {
  const cleanHashtags = hashtags
    .map(h => h.toLowerCase().replace(/^#/, ''))
    .filter(h => !HASHTAG_NOISE.has(h));
  const text = ((caption || '') + ' ' + (sound || '')).toLowerCase();

  const scores: Record<string, number> = {};
  for (const [cat, sigs] of Object.entries(KEYWORD_MAP)) {
    let score = 0;
    for (const kw of sigs.keywords) {
      if (text.includes(kw)) score += 2;
    }
    for (const ht of sigs.hashtags) {
      if (cleanHashtags.includes(ht)) score += 3;
    }
    if (score > 0) scores[cat] = score;
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  if (!sorted.length) return { category: null as string | null, confidence: 0 };

  const [topCat, topScore] = sorted[0];
  return {
    category: topCat,
    confidence: Math.min(topScore / 6, 0.95)
  };
}
