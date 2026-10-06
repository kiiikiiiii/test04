// 음식명으로 카드 아이콘(이모지)과 배경색을 자동으로 정한다.

// 더 구체적인 단어가 먼저 오도록 순서를 유지한다 (예: "국수"가 "국"보다 먼저)
const KEYWORD_EMOJI: [string, string][] = [
  ["샐러드", "🥗"],
  ["김밥", "🍙"],
  ["주먹밥", "🍙"],
  ["카레", "🍛"],
  ["국수", "🍜"],
  ["라면", "🍜"],
  ["파스타", "🍝"],
  ["스파게티", "🍝"],
  ["수프", "🍲"],
  ["스프", "🍲"],
  ["찌개", "🍲"],
  ["국", "🍲"],
  ["탕", "🍲"],
  ["죽", "🥣"],
  ["면", "🍜"],
  ["밥", "🍚"],
  ["닭", "🍗"],
  ["치킨", "🍗"],
  ["소고기", "🥩"],
  ["스테이크", "🥩"],
  ["돼지", "🥓"],
  ["삼겹", "🥓"],
  ["연어", "🍣"],
  ["초밥", "🍣"],
  ["새우", "🍤"],
  ["생선", "🐟"],
  ["오믈렛", "🍳"],
  ["달걀", "🍳"],
  ["계란", "🍳"],
  ["두부", "🍱"],
  ["만두", "🥟"],
  ["꼬치", "🍢"],
  ["샌드위치", "🥪"],
  ["토스트", "🍞"],
  ["빵", "🍞"],
  ["버거", "🍔"],
  ["피자", "🍕"],
  ["타코", "🌮"],
  ["떡", "🍡"],
  ["케이크", "🍰"],
  ["머핀", "🧁"],
  ["쿠키", "🍪"],
  ["요거트", "🥣"],
  ["스무디", "🥤"],
  ["주스", "🧃"],
  ["고구마", "🍠"],
  ["감자", "🥔"],
  ["옥수수", "🌽"],
  ["버섯", "🍄"],
  ["아보카도", "🥑"],
  ["토마토", "🍅"],
  ["브로콜리", "🥦"],
  ["당근", "🥕"],
  ["단호박", "🎃"],
  ["사과", "🍎"],
  ["바나나", "🍌"],
  ["딸기", "🍓"],
  ["베리", "🫐"],
];

const FALLBACK_EMOJI = ["🍽️", "🥘", "🍲", "🥗", "🍱", "🍛", "🥙", "🍜"];

const COLORS = [
  "#dff3e3",
  "#fdf1d8",
  "#fbe7dc",
  "#fde0dc",
  "#e6e3f7",
  "#ffe4d6",
  "#e4f2d6",
  "#fff0cc",
  "#dcefe9",
  "#f3ead9",
  "#ece4dc",
  "#f7e1ea",
];

function hash(text: string): number {
  let h = 0;
  for (const ch of text) h = (h * 31 + ch.codePointAt(0)!) >>> 0;
  return h;
}

export function pickEmoji(title: string): string {
  const name = title.trim();
  const match = KEYWORD_EMOJI.find(([keyword]) => name.includes(keyword));
  if (match) return match[1];
  return FALLBACK_EMOJI[hash(name) % FALLBACK_EMOJI.length];
}

export function pickColor(title: string): string {
  return COLORS[hash(title.trim()) % COLORS.length];
}
