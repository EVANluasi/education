import type { Question } from './types';

export const QUESTIONS: Question[] = [
  // ─── Level 1: Ibu Kota (multichoice) ───────────────────────────────────────
  {
    id: 'l1q1', level: 1, type: 'multichoice', points: 20,
    question: 'What is the capital city of South Kalimantan (Kalimantan Selatan)?',
    answer: 'Banjarmasin',
    options: ['Banjarmasin', 'Banjarbaru', 'Martapura', 'Kandangan'],
    hint: 'It is known as the "City of a Thousand Rivers".',
  },
  {
    id: 'l1q2', level: 1, type: 'multichoice', points: 20,
    question: 'Which city is the administrative capital of South Kalimantan province?',
    answer: 'Banjarbaru',
    options: ['Banjarmasin', 'Banjarbaru', 'Amuntai', 'Pelaihari'],
    hint: 'This city was officially designated as the provincial capital in 2022.',
  },
  {
    id: 'l1q3', level: 1, type: 'multichoice', points: 20,
    question: 'What is South Kalimantan\'s provincial abbreviation?',
    answer: 'KalSel',
    options: ['KalSel', 'KalTim', 'KalTeng', 'KalBar'],
    hint: 'The abbreviation combines "Kalimantan" and "Selatan" (South).',
  },
  {
    id: 'l1q4', level: 1, type: 'multichoice', points: 20,
    question: 'Which river runs through Banjarmasin making it a unique water city?',
    answer: 'Barito River',
    options: ['Barito River', 'Mahakam River', 'Kapuas River', 'Kahayan River'],
    hint: 'This river is one of the longest in Borneo.',
  },
  {
    id: 'l1q5', level: 1, type: 'multichoice', points: 20,
    question: 'How many regencies (kabupaten) does South Kalimantan have?',
    answer: '13',
    options: ['11', '12', '13', '14'],
    hint: 'Count includes both regencies and cities.',
  },

  // ─── Level 2: Sungai & Alam (typing) ───────────────────────────────────────
  {
    id: 'l2q1', level: 2, type: 'typing', points: 20,
    question: 'Type the name of the famous floating market in Banjarmasin.',
    answer: 'Lok Baintan',
    hint: 'This market is held on the river at dawn.',
  },
  {
    id: 'l2q2', level: 2, type: 'typing', points: 20,
    question: 'Type the name of the national park in South Kalimantan known for its orangutans.',
    answer: 'Meratus',
    hint: 'It is part of the Meratus mountain range.',
  },
  {
    id: 'l2q3', level: 2, type: 'typing', points: 20,
    question: 'Type the name of the large lake in Hulu Sungai Utara regency of South Kalimantan.',
    answer: 'Danau Panggang',
    hint: 'It is famous for its fishing communities.',
  },
  {
    id: 'l2q4', level: 2, type: 'typing', points: 20,
    question: 'Type the name of the mountain range that runs through South Kalimantan.',
    answer: 'Pegunungan Meratus',
    hint: 'Also called the Meratus Mountains.',
  },
  {
    id: 'l2q5', level: 2, type: 'typing', points: 20,
    question: 'Type the name of the iconic tree that grows in South Kalimantan\'s peat swamps.',
    answer: 'Ramin',
    hint: 'A protected timber species found in Borneo.',
  },

  // ─── Level 3: Budaya Banjar (dragdrop) ─────────────────────────────────────
  {
    id: 'l3q1', level: 3, type: 'dragdrop', points: 20,
    question: 'Match: Which traditional dance represents the Banjar people\'s welcome ceremony?',
    answer: 'Tari Baksa Kembang',
    options: ['Tari Baksa Kembang', 'Tari Kecak', 'Tari Saman', 'Tari Pendet'],
    hint: 'This dance uses flowers as props.',
  },
  {
    id: 'l3q2', level: 3, type: 'dragdrop', points: 20,
    question: 'Arrange the syllables to form the traditional Banjar house name: LANTING RUMAH',
    answer: 'Rumah Lanting',
    options: ['Rumah', 'Lanting', 'Adat', 'Banjar'],
    hint: 'It is a floating house on the river.',
  },
  {
    id: 'l3q3', level: 3, type: 'dragdrop', points: 20,
    question: 'Which traditional textile is South Kalimantan famous for?',
    answer: 'Sasirangan',
    options: ['Sasirangan', 'Batik Tulis', 'Tenun Ikat', 'Songket'],
    hint: 'It is made by tying and dyeing cloth.',
  },
  {
    id: 'l3q4', level: 3, type: 'dragdrop', points: 20,
    question: 'Select the traditional Banjar musical instrument played with strings.',
    answer: 'Panting',
    options: ['Panting', 'Gamelan', 'Sape', 'Kolintang'],
    hint: 'Similar to a small lute, unique to Banjar culture.',
  },
  {
    id: 'l3q5', level: 3, type: 'dragdrop', points: 20,
    question: 'Which ceremony is performed when a Banjar child is born?',
    answer: 'Batumbang',
    options: ['Batumbang', 'Selamatan', 'Tasmiyah', 'Aruh'],
    hint: 'An initiation ritual for newborns.',
  },

  // ─── Level 4: Kuliner Khas (speech) ────────────────────────────────────────
  {
    id: 'l4q1', level: 4, type: 'speech', points: 20,
    question: 'Say the name of the famous South Kalimantan soup made with yellow broth and fish.',
    answer: 'Soto Banjar',
    hint: 'It contains rice cakes and boiled eggs.',
  },
  {
    id: 'l4q2', level: 4, type: 'speech', points: 20,
    question: 'Say the name of the fried fish snack popular in South Kalimantan.',
    answer: 'Amplang',
    hint: 'Crunchy fish crackers, a popular souvenir.',
  },
  {
    id: 'l4q3', level: 4, type: 'speech', points: 20,
    question: 'Say the name of the traditional Banjar dessert made from sticky rice and palm sugar.',
    answer: 'Wadai Cincin',
    hint: 'Ring-shaped sweet cake.',
  },
  {
    id: 'l4q4', level: 4, type: 'speech', points: 20,
    question: 'Say the name of the fermented shrimp paste widely used in South Kalimantan cooking.',
    answer: 'Terasi',
    hint: 'A pungent paste made from fermented shrimp.',
  },
  {
    id: 'l4q5', level: 4, type: 'speech', points: 20,
    question: 'Say the name of the popular grilled fish dish in Banjarmasin.',
    answer: 'Ikan Bakar Banjar',
    hint: 'Marinated and grilled freshwater fish.',
  },

  // ─── Level 5: Sejarah KalSel (typing) ──────────────────────────────────────
  {
    id: 'l5q1', level: 5, type: 'typing', points: 20,
    question: 'Type the name of the Banjar Kingdom that was the most powerful in South Kalimantan.',
    answer: 'Kerajaan Banjar',
    hint: 'Established in the 16th century.',
  },
  {
    id: 'l5q2', level: 5, type: 'typing', points: 20,
    question: 'Type the name of the hero from South Kalimantan who led resistance against the Dutch.',
    answer: 'Pangeran Antasari',
    hint: 'He led the Banjar War (Perang Banjar) in 1859.',
  },
  {
    id: 'l5q3', level: 5, type: 'typing', points: 20,
    question: 'Type the year South Kalimantan became an Indonesian province.',
    answer: '1950',
    hint: 'It was established after Indonesian independence.',
  },
  {
    id: 'l5q4', level: 5, type: 'typing', points: 20,
    question: 'Type the name of the Dutch colonial war fought in South Kalimantan (1859-1905).',
    answer: 'Perang Banjar',
    hint: 'Also called the Banjar War.',
  },
  {
    id: 'l5q5', level: 5, type: 'typing', points: 20,
    question: 'Type the name of the first Sultan of Banjar Kingdom.',
    answer: 'Suriansyah',
    hint: 'He converted to Islam in the 16th century.',
  },
  {
    id: 'l5q6', level: 5, type: 'typing', points: 20,
    question: 'Type the name of the city famous for its diamond mining in South Kalimantan.',
    answer: 'Martapura',
    hint: 'Known as the "City of Diamonds" (Kota Intan).',
  },

  // ─── Level 6: Flora & Fauna (dragdrop) ─────────────────────────────────────
  {
    id: 'l6q1', level: 6, type: 'dragdrop', points: 20,
    question: 'Which endangered primate is found in South Kalimantan\'s forests?',
    answer: 'Orangutan',
    options: ['Orangutan', 'Gorilla', 'Chimpanzee', 'Gibbon'],
    hint: 'A great ape native to Borneo island.',
  },
  {
    id: 'l6q2', level: 6, type: 'dragdrop', points: 20,
    question: 'Select the provincial flower of South Kalimantan.',
    answer: 'Anggrek Hitam',
    options: ['Anggrek Hitam', 'Melati', 'Rafflesia', 'Bunga Bangkai'],
    hint: 'A rare black orchid found in Borneo.',
  },
  {
    id: 'l6q3', level: 6, type: 'dragdrop', points: 20,
    question: 'Which tree species is the symbol of South Kalimantan province?',
    answer: 'Ulin',
    options: ['Ulin', 'Meranti', 'Ramin', 'Dipterocarp'],
    hint: 'Also known as "ironwood" – extremely hard timber.',
  },
  {
    id: 'l6q4', level: 6, type: 'dragdrop', points: 20,
    question: 'Which is the mascot (fauna icon) of South Kalimantan?',
    answer: 'Bekantan',
    options: ['Bekantan', 'Enggang', 'Kakatua', 'Elang Bondol'],
    hint: 'Actually a primate, the proboscis monkey.',
  },
  {
    id: 'l6q5', level: 6, type: 'dragdrop', points: 20,
    question: 'Select the unique carnivorous plant found in KalSel\'s peat swamps.',
    answer: 'Kantong Semar',
    options: ['Kantong Semar', 'Venus Flytrap', 'Sundew', 'Bladderwort'],
    hint: 'A pitcher plant that traps insects.',
  },
  {
    id: 'l6q6', level: 6, type: 'dragdrop', points: 20,
    question: 'Which freshwater fish is most associated with South Kalimantan cuisine?',
    answer: 'Ikan Gabus',
    options: ['Ikan Gabus', 'Ikan Mas', 'Ikan Lele', 'Ikan Nila'],
    hint: 'Snakehead fish, used in many local dishes.',
  },

  // ─── Level 7: Pahlawan Lokal (speech) ──────────────────────────────────────
  {
    id: 'l7q1', level: 7, type: 'speech', points: 20,
    question: 'Say the name of the female hero from South Kalimantan who fought for women\'s rights.',
    answer: 'Ratu Zaleha',
    hint: 'Daughter of Pangeran Antasari.',
  },
  {
    id: 'l7q2', level: 7, type: 'speech', points: 20,
    question: 'Say the full name of the National Hero who is the main symbol of KalSel resistance.',
    answer: 'Pangeran Antasari',
    hint: 'He was proclaimed a National Hero in 1968.',
  },
  {
    id: 'l7q3', level: 7, type: 'speech', points: 20,
    question: 'Say the name of the Islamic scholar and founder of Pesantren Darussalam in Martapura.',
    answer: 'Guru Sekumpul',
    hint: 'His full name is Muhammad Zaini Abdul Ghani.',
  },
  {
    id: 'l7q4', level: 7, type: 'speech', points: 20,
    question: 'Say the name of the Dutch-appointed last Sultan of Banjar Kingdom.',
    answer: 'Sultan Adam',
    hint: 'He ruled from 1825 until his death in 1857.',
  },
  {
    id: 'l7q5', level: 7, type: 'speech', points: 20,
    question: 'Say the name of the first Governor of South Kalimantan province.',
    answer: 'Dokter Murjani',
    hint: 'He served as governor starting from 1950.',
  },
  {
    id: 'l7q6', level: 7, type: 'speech', points: 20,
    question: 'Say the name of the famous South Kalimantan poet who composed "Syair Banjar".',
    answer: 'Haji Gusti Muhammad Said',
    hint: 'A Banjar literary figure from the 19th century.',
  },

  // ─── Level 8: Kerajinan Tangan (dragdrop) ──────────────────────────────────
  {
    id: 'l8q1', level: 8, type: 'dragdrop', points: 20,
    question: 'Which traditional handicraft uses "ikat" (tie-dye) technique in South Kalimantan?',
    answer: 'Sasirangan',
    options: ['Sasirangan', 'Batik Solo', 'Ulos', 'Tapis'],
    hint: 'The cloth pattern is tied before dyeing.',
  },
  {
    id: 'l8q2', level: 8, type: 'dragdrop', points: 20,
    question: 'Select the gemstone that Martapura is famous for cutting and selling.',
    answer: 'Diamond',
    options: ['Diamond', 'Ruby', 'Sapphire', 'Emerald'],
    hint: 'The hardest natural mineral.',
  },
  {
    id: 'l8q3', level: 8, type: 'dragdrop', points: 20,
    question: 'Which traditional boat type is used in KalSel\'s river markets?',
    answer: 'Jukung',
    options: ['Jukung', 'Pinisi', 'Proa', 'Sampan'],
    hint: 'A dugout canoe traditional to Banjar river life.',
  },
  {
    id: 'l8q4', level: 8, type: 'dragdrop', points: 20,
    question: 'Select the traditional weapon associated with Banjar warriors.',
    answer: 'Mandau',
    options: ['Mandau', 'Keris', 'Rencong', 'Badik'],
    hint: 'A machete-like blade weapon of Borneo.',
  },
  {
    id: 'l8q5', level: 8, type: 'dragdrop', points: 20,
    question: 'Which material is used to make traditional KalSel rattan handicrafts?',
    answer: 'Rotan',
    options: ['Rotan', 'Bambu', 'Kayu Jati', 'Nipah'],
    hint: 'A flexible palm plant material.',
  },
  {
    id: 'l8q6', level: 8, type: 'dragdrop', points: 20,
    question: 'Which traditional KalSel headgear is worn during ceremonies?',
    answer: 'Laung',
    options: ['Laung', 'Blangkon', 'Tanjak', 'Kopiah'],
    hint: 'A Banjar traditional head wrap.',
  },

  // ─── Level 9: Geografi Lanjut (typing) ─────────────────────────────────────
  {
    id: 'l9q1', level: 9, type: 'typing', points: 20,
    question: 'Type the name of the southernmost regency of South Kalimantan.',
    answer: 'Tanah Bumbu',
    hint: 'Located at the southeastern tip of KalSel.',
  },
  {
    id: 'l9q2', level: 9, type: 'typing', points: 20,
    question: 'Type the name of the highest mountain in South Kalimantan.',
    answer: 'Gunung Halau-Halau',
    hint: 'Located in the Meratus range, altitude ~1,892m.',
  },
  {
    id: 'l9q3', level: 9, type: 'typing', points: 20,
    question: 'Type the name of the strait that separates Kalimantan from Java.',
    answer: 'Selat Karimata',
    hint: 'A strait in the Java Sea region.',
  },
  {
    id: 'l9q4', level: 9, type: 'typing', points: 20,
    question: 'Type the name of the regency in KalSel famous for producing rice.',
    answer: 'Barito Kuala',
    hint: 'Located in the delta area of the Barito River.',
  },
  {
    id: 'l9q5', level: 9, type: 'typing', points: 20,
    question: 'Type the name of the industrial port city in South Kalimantan.',
    answer: 'Kotabaru',
    hint: 'Located on Laut Island (Pulau Laut).',
  },
  {
    id: 'l9q6', level: 9, type: 'typing', points: 20,
    question: 'Type the number of cities (kota) in South Kalimantan province.',
    answer: '2',
    hint: 'Banjarmasin and Banjarbaru.',
  },
  {
    id: 'l9q7', level: 9, type: 'typing', points: 20,
    question: 'Type the name of the border province east of South Kalimantan.',
    answer: 'Kalimantan Timur',
    hint: 'It is home to the new national capital Nusantara.',
  },

  // ─── Level 10: Maestro KalSel (speech) ─────────────────────────────────────
  {
    id: 'l10q1', level: 10, type: 'speech', points: 20,
    question: 'Say the name of the unique floating market held every morning at 6 AM in South Kalimantan.',
    answer: 'Pasar Terapung Lok Baintan',
    hint: 'Located in Sungai Tabuk area.',
  },
  {
    id: 'l10q2', level: 10, type: 'speech', points: 20,
    question: 'Say the name of the Banjar language greeting equivalent to "Hello".',
    answer: 'Halo atau Assalamualaikum',
    hint: 'Banjar people commonly use Islamic greeting.',
  },
  {
    id: 'l10q3', level: 10, type: 'speech', points: 20,
    question: 'Say the name of the annual festival celebrating South Kalimantan culture in Banjarmasin.',
    answer: 'Festival Budaya Pasar Terapung',
    hint: 'A cultural festival held along the river.',
  },
  {
    id: 'l10q4', level: 10, type: 'speech', points: 20,
    question: 'Say the name of the ancient Chinese-influenced temple in Banjarmasin.',
    answer: 'Klenteng Soetji Nurani',
    hint: 'Located near the waterfront area.',
  },
  {
    id: 'l10q5', level: 10, type: 'speech', points: 20,
    question: 'Say the name of the coal mining company that operates in South Kalimantan.',
    answer: 'Adaro Energy',
    hint: 'One of Indonesia\'s largest coal producers.',
  },
  {
    id: 'l10q6', level: 10, type: 'speech', points: 20,
    question: 'Say the complete name of South Kalimantan\'s provincial motto.',
    answer: 'Waja Sampai Kaputing',
    hint: 'Means "Strong to the very end" in Banjar language.',
  },
  {
    id: 'l10q7', level: 10, type: 'speech', points: 20,
    question: 'Say the name of the traditional South Kalimantan martial art.',
    answer: 'Kuntau',
    hint: 'A Banjar style of self-defense martial art.',
  },
];

export function getQuestionsForLevel(level: number): Question[] {
  return QUESTIONS.filter(q => q.level === level);
}
