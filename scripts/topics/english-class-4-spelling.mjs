import { SAY, SS, H, T, IMG, ACT, BRAIN, SUM, CHK, S, EXP, ROW, GLOSS, mc, ms, tf, st, ord, mat, fill, hot, sld, PHOTO } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// English topic 2 for Fatima (Class 4): Spelling detective. Standards from docs/CURRICULUM_V2.md section 3 (NC Year 3/4, Cambridge Stage 4).
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });

const TILES = "english-class-4-spelling-detective-1-ee195080.jpg";
const WORDS = "english-class-4-spelling-detective-2-e51aa379.jpg";

const tricky = {
  id: "tricky", kind: "learn", title: "Homophones and silent letters",
  blocks: [
    H("Welcome back, spelling detective!"),
    SAY("Today we hunt for tricky spellings. How do we spot clues and fix mistakes?", T("Today's big question: how do spelling detectives find and fix mistakes?")),
    SAY("Every word is built from letters like these. A detective checks each one, even the silent ones.", PHOTO(TILES, "A heap of wooden letter tiles with black capital letters", "Spelling detectives study every letter, even the silent ones.", "Photo by Sven Brandsma on Unsplash")),
    H("Stop 1: Homophones"),
    SAY("Spelling detectives need sharp eyes and ears. Some words sound identical but are spelled differently. There, their and they're. There points to a place: over there. Their shows belonging: their coats. They're is they are squashed together: they're late. Same sound, three jobs. We call these homophones. Let's see each one at work.", T("**Homophones** sound the same but are spelled differently.", "there = a place, their = belonging, they're = they are.")),
    EXPP("There, their, they're",
      SS("There is a place. The ball is over there.", S("over there", ["b", "⚽", 70, 50, 3, "bounce", "there"], ["a", "👉", 35, 50, 3, "none", "over"])),
      SS("Their shows that something belongs to them. Their coats are on the hook.", S("their coats", ["c", "🧥", 50, 50, 3, "grow", "their coats"])),
      SS("They're is they are squashed together. They're running late. The apostrophe shows the missing letter.", S("they're = they are", ["r", "🏃", 50, 50, 3, "bounce", "they're"]))),
    CHK(mc("Pick the right word: ___ going to the museum.", "They're", ["Their", "There"], { hint: "Can you say they are?", why: "They are going to the museum, so they're.", tag: "homophone.their" })),
    CHK(mc("Pick the right word: The children lost ___ books.", "their", ["there", "they're"], { hint: "Whose books?", why: "Their shows the books belong to the children.", tag: "homophone.their" })),
    H("Stop 2: Silent letters"),
    SAY("Some words hide a letter you cannot hear. Knight starts with a silent k. Write starts with a silent w. Lamb ends with a silent b. These letters were once pronounced long ago, and the spelling stayed even after the sound disappeared. Spot them and you can spell tricky words.", T("A **silent letter** is written but not said: knight, write, lamb.")),
    EXPP("Hidden letters",
      SS("Knight. We say night, but we write a k at the start. The k is silent.", S("knight: silent k", ["k", "🛡️", 50, 50, 3, "grow", "knight"])),
      SS("Write. We say rite, but there is a w at the start. The w is silent.", S("write: silent w", ["w", "✍️", 50, 50, 3, "grow", "write"])),
      SS("Lamb. The b at the end is silent.", S("lamb: silent b", ["l", "🐑", 50, 50, 3, "grow", "lamb"]))),
    CHK(mc("Which letter is silent in knee?", "k", ["n", "e"], { hint: "Say the word out loud.", why: "We say nee, so the k is silent.", tag: "silent.find" })),
    SAY("Let us remember. Homophones sound the same but are spelled differently. Silent letters are written but not said.", SUM("Homophones sound the same but have different spellings and meanings", "A silent letter is written but not said")),
    GLOSS({ homophones: "Words that sound the same but are spelled differently and mean different things.", "silent letter": "A letter we write but do not say, like the k in knight.", apostrophe: "A mark that shows a missing letter or belonging." }),
  ],
  mini: [
    mc("Pick the right word: Put the book over ___.", "there", ["their", "they're"], { hint: "Is it a place?", why: "There is a place.", tag: "homophone.their" }),
    mc("Which letter is silent in wrist?", "w", ["r", "t"], { hint: "Say the word out loud.", why: "We say rist, so the w is silent.", tag: "silent.find" }),
    tf("They're means they are.", true, { hint: "Think of the apostrophe.", why: "They're is they are squashed together.", tag: "homophone.their" }),
  ],
};

const plurals = {
  id: "plurals", kind: "try", title: "Plurals and prefixes",
  blocks: [
    H("Stop 1: Plural patterns"),
    SAY("Plurals follow patterns. Most words add s. Words ending in s, x, sh or ch add es. When a word ends in a consonant plus y, we swap the y for i and add es. Baby becomes babies. Story becomes stories. Let's see it happen.", T("A **plural** means more than one. Most add s, some add es.", "A consonant then y: change y to i and add es. baby → babies.")),
    EXPP("Baby to babies",
      SS("One baby.", S("one baby", ["b", "👶", 50, 50, 3, "grow", "baby"])),
      SS("To make a plural, the y changes to i, and we add es. Babies.", S("babies", ...ROW("b", "👶", 3, 25, 75, 50, 3, "grow"), ["l", "✏️", 50, 18, 1, "none", "babies"]))),
    CHK(st("Write the plural of city.", ["cities"], { hint: "Change y to i and add es.", why: "City becomes cities.", tag: "plural.y" })),
    CHK(mc("Which is the plural of watch?", "watches", ["watchs", "watchies"], { hint: "Ends in ch.", why: "Words ending in ch add es.", tag: "plural.es" })),
    H("Stop 2: Prefixes"),
    SAY("A prefix is added to the front of a word and changes its meaning. Dis means not or the opposite: disagree. Re means again: replay. Mis means wrongly: misspell. Sub means under: submarine, a boat that goes under the sea. Now try building some words.", T("A **prefix** goes at the front of a word and changes its meaning.", "dis- = not, re- = again, mis- = wrongly, sub- = under.")),
    EXPP("Prefixes at work",
      SS("Play. Add re at the front. Replay means play again.", S("re + play = replay", ["p", "▶️", 50, 50, 3, "grow", "replay"])),
      SS("Marine means to do with the sea. Add sub for under. Submarine goes under the sea.", S("sub + marine = submarine", ["s", "🚢", 50, 50, 3, "grow", "submarine"]))),
    SAY("Time for a word hunt. Look around for words with a prefix. Write them and say what each prefix does.", ACT("Prefix hunt", ["Paper and a pencil", "A book"], ["Find five words with dis, re, mis or sub at the front.", "Write each word and underline the prefix.", "Cover the prefix. What is the root word left?", "Explain to a grown-up how the prefix changes the meaning."])),
    CHK(mc("What does the prefix re mean?", "again", ["not", "under"], { hint: "Think of replay.", why: "Re means again.", tag: "prefix.meaning" })),
    SAY("Let us remember. Plurals follow patterns. Prefixes change the meaning of a word.", SUM("Consonant then y: change y to i and add es", "A prefix at the front changes the meaning")),
    GLOSS({ plural: "More than one of something.", prefix: "A group of letters added to the front of a word.", "root word": "The main part of a word that is left when you take off a prefix or suffix.", consonant: "Any letter that is not a, e, i, o or u." }),
  ],
  mini: [
    st("Write the plural of story.", ["stories"], { hint: "Change y to i and add es.", why: "Story becomes stories.", tag: "plural.y" }),
    mc("What does the prefix dis mean?", "not or the opposite", ["again", "under"], { hint: "Think of disagree.", why: "Dis means not or the opposite.", tag: "prefix.meaning" }),
    mc("Which word means to spell wrongly?", "misspell", ["respell", "subspell"], { hint: "Which prefix means wrongly?", why: "Mis means wrongly.", tag: "prefix.meaning" }),
  ],
};

const suffixes = {
  id: "suffixes", kind: "play", title: "Suffixes and word roots",
  blocks: [
    H("Stop 1: Suffixes"),
    SAY("A suffix goes at the end of a word. Ly turns a describing word into an adverb: slow becomes slowly. Ness turns a describing word into a noun: kind becomes kindness. Tion makes a noun from a verb: act becomes action. Watch the word grow.", T("A **suffix** goes at the end of a word: slow + ly = slowly, kind + ness = kindness.")),
    EXPP("Growing words",
      SS("Slow. The snail is slow.", S("slow", ["s", "🐌", 50, 50, 3, "none", "slow"])),
      SS("Add ly. Slowly. Now it tells us how the snail moves. The snail moves slowly.", S("slowly", ["s", "🐌", 50, 50, 3, "bounce", "slowly"]))),
    CHK(mc("Add ness to sad. What is the new word?", "sadness", ["sadly", "unsad"], { hint: "Ness makes a noun.", why: "Sad + ness = sadness.", tag: "suffix.ness" })),
    H("Stop 2: Word roots and a brain game"),
    SAY("Many words share a root. The root act means do. Action, actor and active are all about doing. Spotting the root helps us spell and understand new words. First a memory game, then be a root detective.", T("A **root** is the core of a word that gives its meaning: act in action, actor and active.")),
    BRAIN("memory_match", "Root detective", "Find the matching pairs.", ["🎭", "⚡", "🏃", "🔎", "📖", "✍️"]),
    CHK(mc("Which word shares a root with action?", "actor", ["after", "answer"], { hint: "Both are about doing.", why: "Action and actor share the root act.", tag: "root.find" })),
    SAY("Let us remember. A suffix goes at the end. Words that share a root share a meaning.", SUM("A suffix goes at the end of a word", "Words with the same root share a meaning")),
    GLOSS({ suffix: "A group of letters added to the end of a word.", root: "The core of a word that gives its meaning.", adverb: "A word that tells us how, when or where something happens." }),
  ],
  mini: [
    mc("Add ly to quick. What is the new word?", "quickly", ["quickness", "unquick"], { hint: "Ly tells how.", why: "Quick + ly = quickly.", tag: "suffix.ly" }),
    mc("Which word shares a root with player?", "replay", ["plain", "place"], { hint: "Both come from play.", why: "Player and replay share the root play.", tag: "root.find" }),
    tf("A suffix goes at the front of a word.", false, { hint: "Suf is near the end.", why: "A suffix goes at the end of a word.", tag: "suffix.def" }),
  ],
};

const synonyms = {
  id: "synonyms", kind: "use", title: "Synonyms and shades of meaning",
  blocks: [
    H("Stop 1: Synonyms"),
    SAY("A synonym is a word with a similar meaning. Big, large and huge are synonyms. But they are not exactly the same. Each one has its own shade of meaning, like different shades of one colour. Big is plain. Huge is bigger. Enormous is bigger still. Watch the elephant grow.", T("A **synonym** is a word with a similar meaning. Words have different shades of meaning.")),
    EXPP("Big, huge, enormous",
      SS("A big elephant. Big is a plain word.", S("big", ["e", "🐘", 50, 50, 1, "none", "big"])),
      SS("Huge is stronger. The elephant is bigger now.", S("huge", ["e", "🐘", 50, 50, 2, "grow", "huge"])),
      SS("Enormous is the strongest word of all. The elephant fills the page.", S("enormous", ["e", "🐘", 50, 50, 3, "grow", "enormous"]))),
    CHK(mc("Which word is a synonym for glad?", "joyful", ["gloomy", "angry"], { hint: "Which word means happy?", why: "Glad and joyful both mean happy.", tag: "synonym.find" })),
    H("Stop 2: Choosing the best word"),
    SAY("Choosing the best word is a skill. Spell it right and pick it well.", PHOTO(WORDS, "Wooden letter tiles spelling the words CHOOSE YOUR WORDS in a crossword layout", "Choosing the right word is a spelling skill and a writing skill.", "Photo by Brett Jordan on Unsplash")),
    SAY("Great writers choose their words carefully. Instead of said, they might write whispered, shouted or muttered. Each one paints a different picture. Try upgrading some plain words in your own writing.", T("Choose the word that gives the clearest picture.")),
    SAY("A writer's word choices change the whole picture.", IMG("🎨", "Choosing a stronger word paints a clearer picture.")),
    SAY("Have a go at a real writing job. Take a plain sentence and make it come alive by swapping the dull words for stronger ones.", ACT("Word upgrade", ["Paper and a pencil"], ["Write: The dog was big and it ran.", "Swap big for a stronger word, like enormous.", "Swap ran for a stronger word, like sprinted.", "Read both sentences to a grown-up. Which is better?"])),
    CHK(mc("Which word is the strongest?", "furious", ["cross", "annoyed"], { hint: "Which shows the most anger?", why: "Furious shows more anger than cross or annoyed.", tag: "synonym.shade" })),
    SAY("Let us remember. Synonyms are words with similar meanings. Strong words paint a clearer picture.", SUM("Synonyms have similar meanings", "Choose the word that paints the clearest picture")),
    GLOSS({ synonym: "A word that means almost the same as another word.", "shade of meaning": "A small difference in meaning between similar words.", strong: "A word that gives a clearer or bigger picture." }),
  ],
  mini: [
    mc("Which word is a synonym for small?", "tiny", ["huge", "tall"], { hint: "Which means little?", why: "Small and tiny both mean little.", tag: "synonym.find" }),
    tf("Whispered and shouted have the same shade of meaning.", false, { hint: "One is quiet, one is loud.", why: "Whispered is quiet and shouted is loud.", tag: "synonym.shade" }),
    mc("Which word is the strongest?", "exhausted", ["tired", "sleepy"], { hint: "Which shows the most tiredness?", why: "Exhausted means very, very tired.", tag: "synonym.shade" }),
  ],
};

const clip = {
  title: "The spelling detective", backdrop: "classroom", caption: "A detective hunts for tricky spellings.",
  scenes: [
    { caption: "A case.", say: "Detective Zara has a case. Someone has misspelt a word.",
      items: [{ id: "z", emoji: "🕵️", label: "Zara", x: 30, y: 58, size: 3, enter: "pop" }, { id: "p", emoji: "📄", x: 72, y: 58, size: 3 }] },
    { caption: "A silent letter.", say: "The word is knee. The k is silent, but it must stay.",
      items: [{ id: "k", emoji: "🦵", x: 50, y: 56, size: 3 }] },
    { caption: "Homophones.", say: "Allowed and aloud sound alike but mean different things.",
      items: [{ id: "a", emoji: "🔊", x: 30, y: 54, size: 3 }, { id: "b", emoji: "✅", x: 72, y: 54, size: 3 }] },
    { caption: "Plurals.", say: "Baby becomes babies. A city becomes cities.",
      items: [{ id: "b", emoji: "👶", x: 30, y: 58, size: 3 }, { id: "c", emoji: "🏙️", x: 72, y: 54, size: 3 }] },
    { caption: "Prefixes.", say: "Kind becomes unkind. Possible becomes impossible.",
      items: [{ id: "p", emoji: "➖", x: 50, y: 56, size: 3, anim: "pulse" }] },
    { caption: "Suffixes.", say: "Quick becomes quickly. Sun becomes sunny.",
      items: [{ id: "s", emoji: "☀️", x: 50, y: 40, size: 3 }] },
    { caption: "Strategy.", say: "Look, cover, write, check. That is the detective's method.",
      items: [{ id: "l", emoji: "🔍", x: 50, y: 56, size: 3, anim: "bounce" }] },
    { caption: "Solved.", say: "Case closed. Every word is spelt right!",
      items: [{ id: "z", emoji: "🕵️", x: 50, y: 56, size: 3, effect: "sparkle" }] },
  ],
};

export const topics = [
  topicLesson({
    slug: "english-class-4-spelling-detective", subject: "english", cls: 4, topic: 2, title: "Spelling Detective",
    summary: "Homophones, silent letters, plurals, prefixes, suffixes, word roots and synonyms.",
    unit: "Topic 2: Spelling detective", difficulty: 2,
    objectives: ["Choose the right homophone", "Spot silent letters", "Spell plurals and use prefixes and suffixes", "Use word roots and synonyms to understand and choose words"],
    success_criteria: ["I can pick between there, their and they're", "I can spell plurals like babies and watches", "I can explain what a prefix or suffix does", "I can choose a stronger synonym"],
    real_life: "Proofreading your own writing and picking the best word for a story.",
    standards: [
      { framework: "nc_england", code: "Y3/Y4 spelling", text: "Spell homophones, words with silent letters, plurals, and words with prefixes and suffixes" },
      { framework: "cambridge", code: "4Ww.01" }, { framework: "cambridge", code: "4Ww.02" }, { framework: "cambridge", code: "4Ww.03" }, { framework: "cambridge", code: "4Ww.04" }, { framework: "cambridge", code: "4Ww.05" }, { framework: "cambridge", code: "4Ww.08" }, { framework: "cambridge", code: "4Rv.01" }, { framework: "cambridge", code: "4Rv.04" }, { framework: "cambridge", code: "4Wv.02" },
    ],
    warm_up: [
      mc("Which sentence is a question?", "Where is my bag?", ["My bag is red.", "What a big bag!"], { hint: "Which one asks something?", why: "Where is my bag? asks something." }),
      tf("A noun is a naming word.", true, { hint: "Think of cat, school, Lahore.", why: "A noun names a person, place or thing." }),
      mc("Which pronoun replaces the girls?", "they", ["she", "it"], { hint: "More than one person.", why: "The girls is more than one, so they." }),
    ],
    intro: [],
    subs: [tricky, plurals, suffixes, synonyms],
    clip,
    quiz: [
      Q(mc("Pick the right word: ___ going to the park.", "They're", ["Their", "There"], { hint: "Can you say they are?", why: "They are going, so they're.", tag: "homophone.their" }), "tricky", "recall", [
        mc("Pick the right word: ___ coats are on the hook.", "Their", ["There", "They're"], { hint: "Whose coats?", why: "Their shows the coats belong to them.", tag: "homophone.their" }),
        mc("Choose the right word: Put the box over ___.", "there", ["their", "they're"], { hint: "Is it a place?", why: "There is a place.", tag: "homophone.their" })]),
      Q(mc("Why does knife start with a silent k?", "The k was once pronounced in an older word", ["It is a spelling mistake", "The k helps it rhyme"], { hint: "Think about how English words changed over time.", why: "Many silent letters were once pronounced long ago.", tag: "silent.reason" }), "tricky", "reason", [
        mc("Why is there a silent w in the word write?", "The w was once pronounced in an older word", ["It is a spelling mistake", "The w makes it longer"], { hint: "Think about how English words changed over time.", why: "Many silent letters were once pronounced long ago.", tag: "silent.reason" }),
        mc("Why is there a silent b in the word lamb?", "The b was once pronounced in an older word", ["It is a spelling mistake", "The b helps it rhyme"], { hint: "Think about how English words changed over time.", why: "Many silent letters were once pronounced long ago.", tag: "silent.reason" })]),
      Q(fill("Find the silent letters.", "The silent letter in knot is {b1}. The silent letter in wrap is {b2}.", [["k", "n", "t"], ["w", "r", "p"]], { hint: "Say each word out loud.", why: "Knot has a silent k and wrap has a silent w.", tag: "silent.find" }), "tricky", "apply", [
        fill("Spot the silent letters.", "The silent letter in gnat is {b1}. The silent letter in comb is {b2}.", [["g", "n", "t"], ["b", "c", "m"]], { hint: "Say each word out loud.", why: "Gnat has a silent g and comb has a silent b.", tag: "silent.find" }),
        fill("Choose the silent letters.", "The silent letter in knit is {b1}. The silent letter in wrong is {b2}.", [["k", "n", "t"], ["w", "r", "g"]], { hint: "Say each word out loud.", why: "Knit has a silent k and wrong has a silent w.", tag: "silent.find" })]),
      Q(ms("Which words have a silent letter? Pick two.", ["knee", "write"], ["table", "happy"], { hint: "Say each word out loud.", why: "Knee has a silent k and write has a silent w.", tag: "silent.find" }), "tricky", "apply", [
        ms("Pick the two words with a silent letter.", ["gnome", "lamb"], ["crisp", "window"], { hint: "Say each word out loud.", why: "Gnome has a silent g and lamb has a silent b.", tag: "silent.find" }),
        ms("Choose two words that contain a silent letter.", ["knock", "wrap"], ["plant", "market"], { hint: "Say each word out loud.", why: "Knock has a silent k and wrap has a silent w.", tag: "silent.find" })]),
      Q(st("Write the plural of baby.", ["babies"], { hint: "Change y to i and add es.", why: "Baby becomes babies.", tag: "plural.y" }), "plurals", "apply", [
        st("Write the plural of fly.", ["flies"], { hint: "Change y to i and add es.", why: "Fly becomes flies.", tag: "plural.y" }),
        st("Write the plural of puppy.", ["puppies"], { hint: "Change y to i and add es.", why: "Puppy becomes puppies.", tag: "plural.y" })]),
      Q(ord("Put the letters in order to spell the plural.", ["l", "e", "a", "v", "e", "s"], { hint: "It is the plural of leaf.", why: "Leaf becomes leaves.", tag: "plural.f" }), "plurals", "apply", [
        ord("Arrange the letters to spell the plural.", ["w", "o", "l", "v", "e", "s"], { hint: "It is the plural of wolf.", why: "Wolf becomes wolves.", tag: "plural.f" }),
        ord("Sort the letters to spell the plural.", ["k", "n", "i", "v", "e", "s"], { hint: "It is the plural of knife.", why: "Knife becomes knives.", tag: "plural.f" })]),
      Q(mc("Why does baby become babies, not babys?", "A consonant before the y means y changes to i and we add es", ["Es is always added to every word", "Baby is a long word"], { hint: "Look at the letter before the y.", why: "After a consonant, y changes to i before es.", tag: "plural.reason" }), "plurals", "reason", [
        mc("Why is the plural of city cities, not citys?", "A consonant before the y means y changes to i and we add es", ["Es is always added to every word", "City is a short word"], { hint: "Look at the letter before the y.", why: "After a consonant, y changes to i before es.", tag: "plural.reason" }),
        mc("Why is the plural of box boxes?", "Words ending in x need es so we can say the plural", ["The x changes to i", "Box is a short word"], { hint: "Look at the end of the word.", why: "Words ending in x add es.", tag: "plural.reason" })]),
      Q(mat("Match each prefix to its meaning.", [["dis-", "not or the opposite"], ["re-", "again"], ["sub-", "under"]], { hint: "Think of disagree, replay and submarine.", why: "Dis means not, re means again, sub means under.", tag: "prefix.meaning" }), "plurals", "recall", [
        mat("Which meaning goes with each prefix?", [["mis-", "wrongly"], ["re-", "again"], ["un-", "not"]], { hint: "Think of misspell, replay and unkind.", why: "Mis means wrongly, re means again, un means not.", tag: "prefix.meaning" }),
        mat("Pair each prefix with its meaning.", [["dis-", "not"], ["super-", "above or beyond"], ["re-", "again"]], { hint: "Think of dislike, superman and redo.", why: "Dis means not, super means above, re means again.", tag: "prefix.meaning" })]),
      Q(hot("Tap the word with the suffix -ness.", [["😊", "happiness", 22, 50], ["🏃", "running", 50, 50], ["🍎", "apple", 78, 50]], ["happiness"], { labels: true, hint: "Look for ness at the end.", why: "Happiness ends in -ness.", tag: "suffix.find" }), "suffixes", "apply", [
        hot("Tap the word with the suffix -ly.", [["🐌", "slowly", 22, 50], ["🐌", "slow", 50, 50], ["😴", "sleep", 78, 50]], ["slowly"], { labels: true, hint: "Look for ly at the end.", why: "Slowly ends in -ly.", tag: "suffix.find" }),
        hot("Tap the word with the prefix re-.", [["▶️", "replay", 22, 50], ["⏯️", "play", 50, 50], ["🗓️", "plan", 78, 50]], ["replay"], { labels: true, hint: "Look for re at the front.", why: "Replay begins with re-.", tag: "prefix.find" })]),
      Q(sld("Slide to show how many letters are in the root word of unhappy.", { min: 0, max: 10 }, 5, 0, { hint: "Take off the un at the front.", why: "The root is happy, which has 5 letters.", tag: "root.count" }), "suffixes", "apply", [
        sld("Slide to show how many letters are in the root word of unkind.", { min: 0, max: 10 }, 4, 0, { hint: "Take off the un at the front.", why: "The root is kind, which has 4 letters.", tag: "root.count" }),
        sld("Slide to show how many letters are in the root word of disagree.", { min: 0, max: 10 }, 5, 0, { hint: "Take off the dis at the front.", why: "The root is agree, which has 5 letters.", tag: "root.count" })]),
      Q(mc("Why does knowing the root act help with action, actor and active?", "They all share the root and a related meaning", ["They are all spelled the same", "They are all nouns"], { hint: "What do the three words have in common?", why: "Words with the same root share a related meaning.", tag: "root.reason" }), "suffixes", "reason", [
        mc("Why does knowing the root play help with replay and player?", "They all share the root and a related meaning", ["They are all spelled the same", "They are all adverbs"], { hint: "What do the words have in common?", why: "Words with the same root share a related meaning.", tag: "root.reason" }),
        mc("Why does knowing the root help help with helpful and helpless?", "They all share the root and a related meaning", ["They are all spelled the same", "They are all verbs"], { hint: "What do the words have in common?", why: "Words with the same root share a related meaning.", tag: "root.reason" })]),
      Q(mc("Which word is a synonym for big?", "huge", ["tiny", "narrow"], { hint: "Which word means large?", why: "Big and huge both mean large.", tag: "synonym.find" }), "synonyms", "recall", [
        mc("Which word is a synonym for happy?", "glad", ["sad", "slow"], { hint: "Which word means pleased?", why: "Happy and glad both mean pleased.", tag: "synonym.find" }),
        mc("Which word is a synonym for cold?", "chilly", ["boiling", "sunny"], { hint: "Which word means not warm?", why: "Cold and chilly both mean not warm.", tag: "synonym.find" })]),
      Q(tf("A synonym is a word with a similar meaning.", true, { hint: "Syn means same.", why: "Synonyms have similar meanings.", tag: "synonym.def" }), "synonyms", "recall", [
        tf("Huge and tiny are synonyms.", false, { hint: "Do they mean the same?", why: "Huge and tiny are opposites.", tag: "synonym.def" }),
        tf("Glad and joyful are synonyms.", true, { hint: "Do they mean the same?", why: "Both mean happy.", tag: "synonym.def" })]),
      Q(ord("Order these words from weakest to strongest.", ["warm", "hot", "boiling"], { hint: "Which is the least hot?", why: "Warm is mild, hot is stronger, boiling is strongest.", tag: "synonym.shade" }), "synonyms", "apply", [
        ord("Arrange these words from weakest to strongest.", ["breeze", "wind", "gale"], { hint: "Which is the gentlest?", why: "A breeze is gentle, wind is stronger, a gale is strongest.", tag: "synonym.shade" }),
        ord("Sort these words from weakest to strongest.", ["sleepy", "tired", "exhausted"], { hint: "Which is the least tired?", why: "Sleepy is mild, tired is stronger, exhausted is strongest.", tag: "synonym.shade" })]),
      Q(mc("Why is enormous a better word than big for an elephant?", "It paints a stronger picture of the size", ["It is a shorter word", "It means something different"], { hint: "Think about the picture the word makes.", why: "A strong word gives the reader a clearer picture.", tag: "synonym.reason" }), "synonyms", "reason", [
        mc("Why is sprinted a better word than ran in a race story?", "It paints a stronger picture of the speed", ["It is a shorter word", "It means something different"], { hint: "Think about the picture the word makes.", why: "A strong word gives the reader a clearer picture.", tag: "synonym.reason" }),
        mc("Why is delicious a better word than nice for a mango?", "It paints a stronger picture of the taste", ["It is a shorter word", "It means something different"], { hint: "Think about the picture the word makes.", why: "A strong word gives the reader a clearer picture.", tag: "synonym.reason" })]),
      // ----- upgrade: 15 new mains (q16-q30), 1 variant each
      Q(st("Write the word for the joint between your hand and arm. It has a silent w.", ["wrist"], { hint: "It starts with wr.", why: "Wrist has a silent w.", tag: "silent.write" }), "tricky", "recall", [
        st("Write the word for the joint in the middle of your leg. It has a silent k.", ["knee"], { hint: "It starts with kn.", why: "Knee has a silent k.", tag: "silent.write" })]),
      Q(mc("Idris says silent letters have no reason. Is he right?", "No, many come from how the words were once pronounced", ["Yes, they were put in by accident", "Yes, they are never needed"], { hint: "Think about the history of words.", why: "The k in knee was once said aloud, so many silent letters are echoes of old pronunciation.", tag: "silent.reason" }), "tricky", "reason", [
        mc("Maryam says silent letters can be left out when you spell. Is she right?", "No, the word is spelt wrongly without them", ["Yes, they can always be dropped", "Yes, only teachers need them"], { hint: "Try writing nee for knee.", why: "Silent letters are still part of the correct spelling.", tag: "silent.reason" })]),
      Q(st("Write the adverb made from gentle.", ["gently"], { hint: "Drop the e and add y after l.", why: "Gentle becomes gently.", tag: "suffix.ly" }), "suffixes", "apply", [
        st("Write the adverb made from happy.", ["happily"], { hint: "Change the y to i before ly.", why: "Happy becomes happily.", tag: "suffix.ly" })]),
      Q(mc("Idris says copying a misspelt word ten times will fix it. Is he right?", "No, you would practise the mistake, so check the correct spelling first", ["Yes, copying always fixes it", "Yes, the more the better"], { hint: "What are you practising?", why: "Practise only the correct spelling. Use look, cover, write, check.", tag: "strategy.reason" }), "tricky", "reason", [
        mc("Hamza copies wich many times. Is that a good plan?", "No, he should find the correct spelling, which, and practise that", ["Yes, practice always helps", "Yes, it will become correct"], { hint: "Check it first.", why: "Practice only helps if the spelling is correct.", tag: "strategy.reason" })]),
      Q(ms("Which two words show the -est form? Pick two.", ["biggest", "hottest"], ["bigger", "hotter"], { hint: "Est means the most.", why: "Biggest and hottest are -est forms.", tag: "suffix.est" }), "suffixes", "apply", [
        ms("Pick the two -est words.", ["tallest", "smallest"], ["taller", "smaller"], { hint: "Est means the most.", why: "Tallest and smallest are -est forms.", tag: "suffix.est" })]),
      Q(fill("Make adjectives with -y.", "A {b1} day and a {b2} afternoon.", [["sunny", "suny", "sunnie"], ["rainy", "rainey", "rainny"]], { hint: "Double the final consonant after a short vowel.", why: "Sun becomes sunny. Rain becomes rainy.", tag: "suffix.y" }), "suffixes", "apply", [
        fill("Add -y to these words.", "A {b1} dog and a {b2} jumper.", [["furry", "fury", "furrie"], ["woolly", "wooly", "wolly"]], { hint: "Double the consonant after a short vowel.", why: "Fur becomes furry and wool becomes woolly.", tag: "suffix.y" })]),
      Q(mc("Idris says allowed and aloud mean the same because they sound the same. Is he right?", "No, they are homophones with different meanings", ["Yes, same sound means same meaning", "Yes, they can be swapped"], { hint: "Think about permission and speaking.", why: "Allowed means permitted. Aloud means out loud.", tag: "homophone.reason" }), "tricky", "reason", [
        mc("Mira says their and there mean the same. Is she right?", "No, their shows belonging and there shows place", ["Yes, they mean the same", "Yes, they are interchangeable"], { hint: "Think of belonging and place.", why: "Their and there are homophones with different meanings.", tag: "homophone.reason" })]),
      Q(mat("Match each word to the prefix that makes its opposite.", [["kind", "un"], ["possible", "im"], ["regular", "ir"]], { hint: "Think about unkind, impossible and irregular.", why: "Kind takes un, possible takes im and regular takes ir.", tag: "prefix.opposite" }), "plurals", "apply", [
        mat("Join each word to its opposite prefix.", [["happy", "un"], ["visible", "in"], ["patient", "im"]], { hint: "Think about unhappy, invisible and impatient.", why: "Happy takes un, visible takes in and patient takes im.", tag: "prefix.opposite" })]),
      Q(sld("Slide to show how many letters are in the word knee.", { min: 0, max: 8 }, 4, 0, { hint: "Count every letter, even the silent one.", why: "Knee has 4 letters.", tag: "silent.count" }), "tricky", "apply", [
        sld("Slide to show how many letters are in the word wrist.", { min: 0, max: 8 }, 5, 0, { hint: "Count every letter, even the silent one.", why: "Wrist has 5 letters.", tag: "silent.count" })]),
      Q(st("Write the plural of potato.", ["potatoes"], { hint: "Add es after o.", why: "Potato becomes potatoes.", tag: "plural.o" }), "plurals", "apply", [
        st("Write the plural of tomato.", ["tomatoes"], { hint: "Add es after o.", why: "Tomato becomes tomatoes.", tag: "plural.o" })]),
      Q(mc("Maryam says all words ending in y just add s to make plurals. Is she right?", "No, after a consonant we change y to i and add es", ["Yes, always add s", "Yes, y never changes"], { hint: "Think of baby and babies.", why: "Baby becomes babies, but day becomes days.", tag: "plural.reason" }), "plurals", "reason", [
        mc("Ali says the plural of city is citys. Is he right?", "No, it is cities", ["Yes, citys is right", "Yes, cityes is right"], { hint: "Consonant then y.", why: "City ends in a consonant plus y, so it becomes cities.", tag: "plural.reason" })]),
      Q(ord("Order the shades of cold from mildest to coldest.", ["cool", "chilly", "cold", "freezing"], { hint: "Think of a gentle chill first.", why: "Cool is mildest and freezing is the coldest.", tag: "synonym.shade" }), "synonyms", "apply", [
        ord("Order the shades of hot from mildest to hottest.", ["warm", "hot", "boiling"], { hint: "Think of a gentle warmth first.", why: "Warm is mildest and boiling is hottest.", tag: "synonym.shade" })]),
      Q(tf("Aloud and allowed are homophones.", true, { hint: "They sound the same.", why: "They sound the same but have different meanings.", tag: "homophone.def" }), "tricky", "apply", [
        tf("Its and it's are homophones that mean exactly the same.", false, { hint: "One has an apostrophe.", why: "It's means it is. Its shows belonging.", tag: "homophone.def" })]),
      Q(ord("Put the look, cover, write, check steps in order.", ["Look at the word", "Cover it", "Write it from memory", "Check it"], { hint: "Look before you cover.", why: "Look, cover, write, check.", tag: "strategy.order" }), "tricky", "apply", [
        ord("Order these spelling steps.", ["Choose a tricky word", "Look carefully", "Cover and write", "Check and fix"], { hint: "Choose first.", why: "Choose, look, cover and write, then check.", tag: "strategy.order" })]),
      Q(hot("Tap the silent letter in knee.", [["1️⃣", "k", 22, 50], ["2️⃣", "n", 50, 50], ["3️⃣", "e", 78, 50]], ["k"], { labels: true, hint: "It is not said aloud.", why: "The k in knee is silent.", tag: "silent.find" }), "tricky", "apply", [
        hot("Tap the silent letter in lamb.", [["1️⃣", "l", 22, 50], ["2️⃣", "a", 50, 50], ["3️⃣", "b", 78, 50]], ["b"], { labels: true, hint: "It is not said aloud.", why: "The b in lamb is silent.", tag: "silent.find" })]),
    ],
  }),
];
