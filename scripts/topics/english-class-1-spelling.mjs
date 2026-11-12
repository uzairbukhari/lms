import { SAY, SS, H, T, IMG, ACT, BRAIN, SUM, CHK, S, EXP, ROW, GLOSS, mc, ms, tf, st, ord, mat, fill, hot, sld, PHOTO } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// English topic 2 for Zainab (Class 1): Spelling patterns. Standards from docs/CURRICULUM_V2.md section 3 (NC Year 2, Cambridge Stage 2).
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });

const BLOCKS = "english-class-1-spelling-patterns-1-56d69082.jpg";
const ABC = "english-class-1-spelling-patterns-2-5708590f.jpg";

const vowels = {
  id: "vowels", kind: "learn", title: "Vowel teams and split vowels",
  blocks: [
    H("Welcome back, word explorer!"),
    SAY("Today we look at spelling patterns. How do letters work together to make words?", T("Today's big question: how do letters work together to make words?")),
    SAY("These blocks hold the letters of the alphabet. Words are built from them.", PHOTO(BLOCKS, "A pile of old wooden alphabet blocks with painted letters", "Letters make words, and words follow spelling patterns.", "Photo by Susan Holt Simpson on Unsplash")),
    H("Stop 1: Vowel teams"),
    SAY("Some sounds are spelled with two letters that work together as a team. In rain, the letters a and i make one long sound, ay. In tree, e and e make the sound ee. In boat, o and a make the sound oh. We call these vowel teams. Watch them work.", T("A **vowel team** is two letters that work together to make one sound.", "ai in rain, ee in tree, oa in boat.")),
    EXPP("Three vowel teams",
      SS("Rain. The letters a and i work together to say ay.", S("ai in rain", ["r", "🌧️", 50, 50, 3, "grow", "rain"])),
      SS("Tree. The two e letters make the sound ee.", S("ee in tree", ["t", "🌳", 50, 50, 3, "grow", "tree"])),
      SS("Boat. The o and a make the sound oh.", S("oa in boat", ["b", "⛵", 50, 50, 3, "grow", "boat"]))),
    CHK(mc("Which word has the vowel team ee?", "feet", ["fat", "fit"], { hint: "Look for two e letters.", why: "Feet has ee together.", tag: "vowelteam.ee" })),
    CHK(mc("Which word has the vowel team oa?", "coat", ["cat", "cut"], { hint: "Look for o and a side by side.", why: "Coat has oa together.", tag: "vowelteam.oa" })),
    H("Stop 2: Split vowels"),
    SAY("Here is a magic trick. Look at the word cap. Now add an e at the end. Cape! The e is silent. It changes the a so it says its own name. The vowel and the e are split apart, with a letter in the middle. We write this a-e. Kite is i-e. Home is o-e.", T("A **split vowel** has a silent e that makes the first vowel say its name: a-e in cake, i-e in kite, o-e in home.")),
    EXPP("The magic e",
      SS("Cap. A short a. Like a hat.", S("cap", ["c", "🧢", 50, 50, 3, "none", "cap"])),
      SS("Add a magic e at the end. Now it is cape. The a says its name!", S("cape", ["c", "🦸", 50, 50, 3, "grow", "cape"], ["e", "✨", 80, 25, 2, "float", "magic e"]))),
    CHK(mc("Which word has a split vowel?", "kite", ["kit", "kick"], { hint: "Look for a silent e at the end.", why: "Kite has i-e with a silent e.", tag: "splitvowel.find" })),
    SAY("Let us remember. Vowel teams are two letters, one sound. A split vowel uses a silent e.", SUM("A vowel team is two letters that make one sound", "A silent e at the end makes the vowel say its name")),
    GLOSS({ "vowel team": "Two letters working together to make one sound, like ai or oa.", "split vowel": "A vowel, a letter, then a silent e, like a-e in cake.", vowel: "The letters a, e, i, o and u." }),
  ],
  mini: [
    mc("Which word has the vowel team ai?", "train", ["trip", "tram"], { hint: "Look for a and i together.", why: "Train has ai.", tag: "vowelteam.ai" }),
    mc("Which word has a split vowel?", "bone", ["bon", "born"], { hint: "Look for a silent e.", why: "Bone has o-e.", tag: "splitvowel.find" }),
    tf("Boat has a split vowel.", false, { hint: "Is the e at the end?", why: "Boat has the vowel team oa, not a split vowel.", tag: "splitvowel.find" }),
  ],
};

const affixes = {
  id: "affixes", kind: "try", title: "Prefixes and suffixes",
  blocks: [
    H("Stop 1: Changing words"),
    SAY("We can change a word by adding a bit to the front or back. A bit at the front is a prefix. Un means not. Happy becomes unhappy, not happy. A bit at the back is a suffix. Ful means full of. Help becomes helpful, full of help. Let's see them change the words.", T("A **prefix** goes at the front: un + happy = unhappy.", "A **suffix** goes at the back: help + ful = helpful.")),
    EXPP("Adding bits to words",
      SS("Happy. A smiling face.", S("happy", ["h", "😀", 50, 50, 3, "none", "happy"])),
      SS("Add un at the front. Now it is unhappy, which means not happy.", S("unhappy", ["h", "😢", 50, 50, 3, "grow", "unhappy"])),
      SS("Now help. Add ful at the back. Helpful means full of help.", S("helpful", ["h", "🤝", 50, 50, 3, "grow", "helpful"]))),
    CHK(mc("Add un to kind. What is the new word?", "unkind", ["kindun", "unkindful"], { hint: "Put un at the front.", why: "Un goes at the front: unkind.", tag: "prefix.un" })),
    CHK(mc("Add ful to care. What is the new word?", "careful", ["fulcare", "uncare"], { hint: "Put ful at the back.", why: "Ful goes at the back: careful.", tag: "suffix.ful" })),
    H("Stop 2: Build words"),
    SAY("Now be a word builder. Take some word cards. Add un to the front, or ful to the back. Say each new word out loud, and tell a grown-up what it means.", ACT("Word builder", ["Paper cut into small cards", "A pencil"], ["Write these on cards: happy, kind, help, care, tidy.", "Make new words with un at the front: unhappy, unkind, untidy.", "Make new words with ful at the back: helpful, careful.", "Read each new word to a grown-up and say what it means."])),
    SAY("Here are the word builders, ready to work.", IMG("🔧", "Prefixes go at the front, suffixes go at the back.")),
    SAY("Let us remember. A prefix goes at the front. A suffix goes at the back.", SUM("A prefix goes at the front: un + happy", "A suffix goes at the back: help + ful")),
    GLOSS({ prefix: "A bit added to the front of a word, like un.", suffix: "A bit added to the back of a word, like ful.", opposite: "A word that means something completely different, like happy and sad." }),
  ],
  mini: [
    mc("Add un to tidy. What is the new word?", "untidy", ["tidyun", "untidyful"], { hint: "Put un at the front.", why: "Untidy means not tidy.", tag: "prefix.un" }),
    mc("Add ful to joy. What is the new word?", "joyful", ["fuljoy", "unjoy"], { hint: "Put ful at the back.", why: "Joyful means full of joy.", tag: "suffix.ful" }),
    tf("A prefix goes at the back of a word.", false, { hint: "Pre means before.", why: "A prefix goes at the front.", tag: "prefix.def" }),
  ],
};

const homophones = {
  id: "homophones", kind: "play", title: "Homophones and short forms",
  blocks: [
    H("Stop 1: Same sound, different word"),
    SAY("Listen. Tail. Tale. They sound exactly the same! But tail is the wiggly end of a dog, and tale is a story. Words that sound the same but are spelled differently are called homophones. Sun and son. Pair and pear. We have to look at the meaning to choose the right one.", T("**Homophones** sound the same but are spelled differently and mean different things.", "tail and tale, sun and son, pair and pear.")),
    EXPP("Tail or tale?",
      SS("This is a tail, on a dog.", S("tail: the end of an animal", ["d", "🐕", 50, 50, 3, "bounce", "tail"])),
      SS("And this is a tale, a story in a book. They sound the same, but the spellings are different.", S("tale: a story", ["b", "📖", 50, 50, 3, "grow", "tale"]))),
    CHK(mc("Which word means a fruit?", "pear", ["pair", "pare"], { hint: "Think of a juicy fruit.", why: "A pear is a fruit. A pair is two things.", tag: "homophone.pick" })),
    H("Stop 2: Brain game and short forms"),
    SAY("Time for a memory game. Find the matching pairs. Then learn one more trick: squashing two words together, like do not into don't. The apostrophe shows where a letter has gone missing.", BRAIN("memory_match", "Sound-alike pairs", "Find the matching pairs.", ["🐕", "📖", "☀️", "👦", "🍐", "👫"])),
    SAY("Don't is do not squashed together. The apostrophe sits where the o went missing.", IMG("✂️", "do not becomes don't. The apostrophe shows a missing letter.")),
    CHK(mc("What does don't mean?", "do not", ["did not", "does not"], { hint: "Which letter is missing?", why: "Don't is do not squashed together.", tag: "apostrophe.short" })),
    SAY("Let us remember. Homophones sound the same but are spelled differently. An apostrophe shows a missing letter.", SUM("Homophones sound the same but are spelled differently", "An apostrophe shows where a letter is missing")),
    GLOSS({ homophones: "Words that sound the same but are spelled differently and mean different things.", apostrophe: "A little mark that shows a missing letter, like in don't.", pair: "Two things that go together." }),
  ],
  mini: [
    mc("Which word means a boy child?", "son", ["sun", "sin"], { hint: "Think of a family.", why: "Son is a boy child. Sun is the star in the sky.", tag: "homophone.pick" }),
    mc("What does can't mean?", "can not", ["could not", "can now"], { hint: "Some letters are missing.", why: "Can't is can not squashed together.", tag: "apostrophe.short" }),
    tf("Tail and tale sound the same.", true, { hint: "Say them out loud.", why: "They are homophones: same sound, different spelling.", tag: "homophone.def" }),
  ],
};

const alphabet = {
  id: "alphabet", kind: "use", title: "Alphabetical order and dictionaries",
  blocks: [
    H("Stop 1: The alphabet"),
    SAY("These letters are not in order yet. We put them in ABC order.", PHOTO(ABC, "Stacked wooden alphabet blocks showing the letters M, S, X, J, D, A, K, Z and P", "The alphabet has twenty-six letters in a special order.", "Photo by Susan Holt Simpson on Unsplash")),
    SAY("The alphabet has twenty-six letters, in a special order. A, b, c, d, and on to z. Putting words in this order is called alphabetical order. We look at the first letter. Ant comes before bus, because a comes before b.", T("**Alphabetical order** means ABC order. Ant comes before bus because a comes before b.")),
    EXPP("ABC order",
      SS("First, ant. It starts with a.", S("ant", ["a", "🐜", 25, 50, 3, "grow", "ant"])),
      SS("Then bus. It starts with b, the next letter.", S("ant, bus", ["a", "🐜", 25, 50, 3, "none", "ant"], ["b", "🚌", 50, 50, 3, "grow", "bus"])),
      SS("Then cat, starting with c. Ant, bus, cat is in alphabetical order.", S("ant, bus, cat", ["a", "🐜", 25, 50, 3, "none", "ant"], ["b", "🚌", 50, 50, 3, "none", "bus"], ["c", "🐈", 75, 50, 3, "grow", "cat"]))),
    CHK(mc("Which word comes first in ABC order?", "dog", ["fox", "hen"], { hint: "Which letter comes earliest?", why: "D comes before f and h.", tag: "alphabet.first" })),
    H("Stop 2: Using a dictionary"),
    SAY("A dictionary is a book full of words in alphabetical order, with their meanings. To find a word, look at its first letter. Then flick to that part of the book. Try finding the word moon. It is under m.", T("A **dictionary** lists words in alphabetical order with their meanings.")),
    SAY("A dictionary with words ready to find.", IMG("📚", "A dictionary lists words in alphabetical order.")),
    SAY("Try it for real. Ask a grown-up for a dictionary. Or use a picture book with a word list. Pick three words and look them up.", ACT("Dictionary detective", ["A dictionary or a word list", "Paper and a pencil"], ["Choose three words.", "Put them in alphabetical order.", "Find each one in the dictionary.", "Read the meaning to a grown-up."])),
    CHK(mc("Where would you find the word sun in a dictionary?", "under s", ["under m", "under t"], { hint: "Look at the first letter.", why: "Sun starts with s, so it is under s.", tag: "alphabet.dictionary" })),
    SAY("Let us remember. Alphabetical order is ABC order. A dictionary uses it to help us find words.", SUM("Alphabetical order is ABC order", "A dictionary lists words in alphabetical order")),
    GLOSS({ alphabet: "All the letters in order, from a to z.", dictionary: "A book that lists words in ABC order and tells us what they mean." }),
  ],
  mini: [
    mc("Which word comes last in ABC order?", "pig", ["cow", "goat"], { hint: "Which letter comes latest?", why: "P comes after c and g.", tag: "alphabet.first" }),
    tf("In the alphabet, c comes before b.", false, { hint: "Say a, b, c.", why: "B comes before c.", tag: "alphabet.order" }),
    mc("Where would you find the word frog in a dictionary?", "under f", ["under g", "under r"], { hint: "Look at the first letter.", why: "Frog starts with f.", tag: "alphabet.dictionary" }),
  ],
};

const clip = {
  title: "Zainab and the word blocks", backdrop: "classroom", caption: "Zainab plays with spelling blocks and finds spelling patterns.",
  scenes: [
    { caption: "The blocks.", say: "Zainab finds a box of old word blocks.",
      items: [{ id: "z", emoji: "👧", label: "Zainab", x: 30, y: 58, size: 3, enter: "walk_right" }, { id: "b", emoji: "🧱", x: 72, y: 62, size: 3 }] },
    { caption: "Vowel teams.", say: "Rain, tree and boat all have a vowel team.",
      items: [{ id: "r", emoji: "🌧️", x: 25, y: 56, size: 2 }, { id: "t", emoji: "🌳", x: 50, y: 56, size: 2 }, { id: "b", emoji: "⛵", x: 75, y: 56, size: 2 }] },
    { caption: "The magic e.", say: "Add a magic e and cap becomes cape.",
      items: [{ id: "c", emoji: "🧢", x: 30, y: 60, size: 3 }, { id: "e", emoji: "✨", x: 70, y: 40, size: 2, anim: "float" }] },
    { caption: "Prefix.", say: "Un goes at the front. Happy becomes unhappy.",
      items: [{ id: "h", emoji: "😀", x: 30, y: 58, size: 3 }, { id: "u", emoji: "😢", x: 72, y: 58, size: 3, enter: "pop" }] },
    { caption: "Suffix.", say: "Ful goes at the back. Help becomes helpful.",
      items: [{ id: "h", emoji: "🤝", x: 50, y: 58, size: 3, anim: "grow" }] },
    { caption: "Homophones.", say: "Pair and pear sound the same. One is fruit!",
      items: [{ id: "p", emoji: "🍐", x: 30, y: 58, size: 3 }, { id: "s", emoji: "🧦", x: 72, y: 62, size: 2 }] },
    { caption: "Short form.", say: "Do not shrinks to don't. The apostrophe holds the gap.",
      items: [{ id: "s", emoji: "✂️", x: 50, y: 58, size: 3, anim: "pulse" }] },
    { caption: "ABC.", say: "Ant, bus, cat. Zainab puts the blocks in ABC order.",
      items: [{ id: "a", emoji: "🐜", x: 25, y: 60, size: 2 }, { id: "b", emoji: "🚌", x: 50, y: 60, size: 2 }, { id: "c", emoji: "🐈", x: 75, y: 60, size: 2, effect: "sparkle" }] },
  ],
};

export const topics = [
  topicLesson({
    slug: "english-class-1-spelling-patterns", subject: "english", cls: 1, topic: 2, title: "Spelling Patterns",
    summary: "Vowel teams, split vowels, prefixes and suffixes, homophones, short forms and alphabetical order.",
    unit: "Topic 2: Spelling patterns", difficulty: 1,
    objectives: ["Spell words with vowel teams and split vowels", "Add un- and -ful to words", "Tell homophones apart", "Put words in alphabetical order and use a dictionary"],
    success_criteria: ["I can spell words with ai, ee, oa and a silent e", "I can add un or ful to a word", "I can choose between tail and tale", "I can put words in ABC order"],
    real_life: "Writing a card to a friend and looking up words in a dictionary.",
    standards: [
      { framework: "nc_england", code: "Y2 spelling", text: "Spell words with vowel digraphs, add suffixes and prefixes, and spell common homophones and contractions" },
      { framework: "cambridge", code: "2Rw.01" }, { framework: "cambridge", code: "2Rw.02" }, { framework: "cambridge", code: "2Rw.03" }, { framework: "cambridge", code: "2Ww.01" }, { framework: "cambridge", code: "2Ww.02" }, { framework: "cambridge", code: "2Ww.06" }, { framework: "cambridge", code: "2Ww.07" }, { framework: "cambridge", code: "2Rv.03" },
    ],
    warm_up: [
      mc("Which mark ends a question?", "?", [".", "!"], { hint: "It looks like a hook with a dot.", why: "A question ends with a question mark." }),
      tf("The plural of cat is cats.", true, { hint: "Most words add s.", why: "Cat adds s to make cats." }),
      mc("Which word is a describing word?", "big", ["run", "dog"], { hint: "It tells us what a thing is like.", why: "Big describes a thing." }),
    ],
    intro: [],
    subs: [vowels, affixes, homophones, alphabet],
    clip,
    quiz: [
      Q(mc("Which word has the ai vowel team?", "rain", ["ran", "run"], { hint: "Look for a and i together.", why: "Rain has ai.", tag: "vowelteam.ai" }), "vowels", "recall", [
        mc("Pick the word with the oa vowel team.", "boat", ["bat", "bet"], { hint: "Look for o and a together.", why: "Boat has oa.", tag: "vowelteam.oa" }),
        mc("Spot the word with the ee vowel team.", "seed", ["said", "sad"], { hint: "Look for two e letters.", why: "Seed has ee.", tag: "vowelteam.ee" })]),
      Q(mc("Why does the word cake say a, not the sound in cap?", "The silent e at the end changes the vowel sound", ["The k is very long", "The c is a capital"], { hint: "Look at the end of the word.", why: "The silent e makes the a say its name.", tag: "splitvowel.reason" }), "vowels", "reason", [
        mc("Why does the word kite say i, not the sound in kit?", "The silent e at the end changes the vowel sound", ["The t is loud", "The k is silent"], { hint: "Look at the end of the word.", why: "The silent e makes the i say its name.", tag: "splitvowel.reason" }),
        mc("Why does the word home say o, not the sound in hot?", "The silent e at the end changes the vowel sound", ["The h is silent", "The m is long"], { hint: "Look at the end of the word.", why: "The silent e makes the o say its name.", tag: "splitvowel.reason" })]),
      Q(fill("Finish the sentences.", "Rain has the vowel team {b1}. Cake has the split vowel {b2}.", [["ai", "ee", "oa"], ["a-e", "i-e", "o-e"]], { hint: "Rain has a and i. Cake has a and e.", why: "Rain has ai. Cake has a-e.", tag: "vowelteam.fill" }), "vowels", "apply", [
        fill("Complete the sentences.", "Boat has the vowel team {b1}. Kite has the split vowel {b2}.", [["oa", "ai", "ee"], ["i-e", "a-e", "o-e"]], { hint: "Boat has o and a. Kite has i and e.", why: "Boat has oa. Kite has i-e.", tag: "vowelteam.fill" }),
        fill("Fill in the gaps.", "Tree has the vowel team {b1}. Home has the split vowel {b2}.", [["ee", "ai", "oa"], ["o-e", "a-e", "i-e"]], { hint: "Tree has two e letters. Home has o and e.", why: "Tree has ee. Home has o-e.", tag: "vowelteam.fill" })]),
      Q(ms("Which words have a split vowel? Pick two.", ["cake", "home"], ["rain", "boat"], { hint: "Look for a silent e at the end.", why: "Cake has a-e and home has o-e.", tag: "splitvowel.find" }), "vowels", "apply", [
        ms("Pick the two split vowel words.", ["kite", "bone"], ["tree", "feet"], { hint: "Look for a silent e at the end.", why: "Kite has i-e and bone has o-e.", tag: "splitvowel.find" }),
        ms("Choose two words with a split vowel.", ["game", "hope"], ["seed", "coat"], { hint: "Look for a silent e at the end.", why: "Game has a-e and hope has o-e.", tag: "splitvowel.find" })]),
      Q(st("Add un to lock. Write the new word.", ["unlock"], { hint: "Put un at the front.", why: "Un + lock = unlock.", tag: "prefix.un" }), "affixes", "apply", [
        st("Add un to the word fair. Write the new word.", ["unfair"], { hint: "Put un at the front.", why: "Un + fair = unfair.", tag: "prefix.un" }),
        st("Put un in front of safe. Write the new word.", ["unsafe"], { hint: "Put un at the front.", why: "Un + safe = unsafe.", tag: "prefix.un" })]),
      Q(ord("Put the letters in order to spell the word.", ["h", "e", "l", "p", "f", "u", "l"], { hint: "It is help and then ful.", why: "Help + ful = helpful.", tag: "suffix.ful" }), "affixes", "apply", [
        ord("Arrange the letters to spell the word.", ["c", "a", "r", "e", "f", "u", "l"], { hint: "It is care and then ful.", why: "Care + ful = careful.", tag: "suffix.ful" }),
        ord("Sort the letters to spell the word.", ["j", "o", "y", "f", "u", "l"], { hint: "It is joy and then ful.", why: "Joy + ful = joyful.", tag: "suffix.ful" })]),
      Q(mc("Why does unhappy mean the opposite of happy?", "The prefix un means not", ["The suffix ful means full of", "It is a longer word"], { hint: "Look at the bit at the front.", why: "Un at the front means not.", tag: "affix.reason" }), "affixes", "reason", [
        mc("Why does unfair mean not fair?", "The prefix un means not", ["The suffix ful means full of", "It is a longer word"], { hint: "Look at the bit at the front.", why: "Un at the front means not.", tag: "affix.reason" }),
        mc("Why does careful mean full of care?", "The suffix ful means full of", ["The prefix un means not", "It is a longer word"], { hint: "Look at the bit at the back.", why: "Ful at the back means full of.", tag: "affix.reason" })]),
      Q(mat("Match each word to its meaning.", [["tail", "the end of an animal"], ["tale", "a story"], ["sun", "the star in our sky"]], { hint: "Think about the picture each word makes.", why: "Tail is on an animal, a tale is a story, and the sun shines.", tag: "homophone.pick" }), "homophones", "recall", [
        mat("Which meaning goes with each word?", [["pair", "two of something"], ["pear", "a fruit"], ["son", "a boy child"]], { hint: "Think about the picture each word makes.", why: "A pair is two, a pear is a fruit, and a son is a boy child.", tag: "homophone.pick" }),
        mat("Pair each word with its meaning.", [["sea", "salty water"], ["see", "to look"], ["tale", "a story"]], { hint: "Think about the picture each word makes.", why: "The sea is water, see means look, and a tale is a story.", tag: "homophone.pick" })]),
      Q(hot("Tap the picture of a tale.", [["📖", "tale", 22, 50], ["🐕", "tail", 50, 50], ["☀️", "sun", 78, 50]], ["tale"], { labels: true, hint: "A tale is a story.", why: "A tale is a story, so the book is right.", tag: "homophone.pick" }), "homophones", "apply", [
        hot("Tap the picture of a pear.", [["🍐", "pear", 22, 50], ["👫", "pair", 50, 50], ["🌊", "sea", 78, 50]], ["pear"], { labels: true, hint: "A pear is a fruit.", why: "A pear is a fruit.", tag: "homophone.pick" }),
        hot("Tap the picture of the sun.", [["☀️", "sun", 22, 50], ["👦", "son", 50, 50], ["⭐", "star", 78, 50]], ["sun"], { labels: true, hint: "The sun shines in the sky.", why: "The sun is the star in our sky.", tag: "homophone.pick" })]),
      Q(sld("Slide to show how many vowel letters (a, e, i, o, u) are in the word boat.", { min: 0, max: 6 }, 2, 0, { hint: "Look for a, e, i, o and u.", why: "Boat has o and a.", tag: "vowel.count" }), "homophones", "apply", [
        sld("Slide to show how many vowel letters (a, e, i, o, u) are in the word sun.", { min: 0, max: 6 }, 1, 0, { hint: "Look for a, e, i, o and u.", why: "Sun has only u.", tag: "vowel.count" }),
        sld("Slide to show how many vowel letters (a, e, i, o, u) are in the word banana.", { min: 0, max: 6 }, 3, 0, { hint: "Look for a, e, i, o and u.", why: "Banana has three a letters.", tag: "vowel.count" })]),
      Q(mc("Why do tail and tale need different spellings?", "They sound the same but mean different things", ["One of them is a mistake", "They mean the same thing"], { hint: "What do the two words mean?", why: "They are homophones: the same sound but different meanings.", tag: "homophone.reason" }), "homophones", "reason", [
        mc("Why do we check the spelling of sun and son?", "They sound the same but mean different things", ["They are the same word", "One has more letters"], { hint: "What do the two words mean?", why: "They are homophones with different meanings.", tag: "homophone.reason" }),
        mc("Why must we choose carefully between pair and pear?", "They sound the same but mean different things", ["They mean the same thing", "Pear is a longer word"], { hint: "What do the two words mean?", why: "They are homophones with different meanings.", tag: "homophone.reason" })]),
      Q(tf("In the alphabet, b comes before a.", false, { hint: "Say a, b, c.", why: "A comes before b.", tag: "alphabet.order" }), "alphabet", "recall", [
        tf("In the alphabet, d comes after c.", true, { hint: "Say a, b, c, d.", why: "D comes right after c.", tag: "alphabet.order" }),
        tf("In the alphabet, m comes before l.", false, { hint: "Say k, l, m.", why: "L comes before m.", tag: "alphabet.order" })]),
      Q(ord("Put these words in alphabetical order.", ["ant", "bus", "cat", "dog"], { hint: "Look at the first letters.", why: "A, b, c, d is the order.", tag: "alphabet.order" }), "alphabet", "apply", [
        ord("Sort these words into ABC order.", ["fish", "goat", "hen", "jug"], { hint: "Look at the first letters.", why: "F, g, h, j is the order.", tag: "alphabet.order" }),
        ord("Arrange these words in ABC order.", ["kite", "lamp", "moon", "nest"], { hint: "Look at the first letters.", why: "K, l, m, n is the order.", tag: "alphabet.order" })]),
      Q(mc("Which word comes first in a dictionary?", "apple", ["mango", "zebra"], { hint: "Which first letter is earliest?", why: "A comes before m and z.", tag: "alphabet.first" }), "alphabet", "apply", [
        mc("Which word would you find first in a dictionary?", "ball", ["tree", "wolf"], { hint: "Which first letter is earliest?", why: "B comes before t and w.", tag: "alphabet.first" }),
        mc("Which word is earliest in a dictionary?", "cat", ["dog", "fox"], { hint: "Which first letter is earliest?", why: "C comes before d and f.", tag: "alphabet.first" })]),
      Q(mc("Why do dictionary words go in alphabetical order?", "So we can find a word quickly", ["So the long words come first", "So the pictures fit"], { hint: "Think about finding a word.", why: "ABC order helps us find a word fast.", tag: "alphabet.reason" }), "alphabet", "reason", [
        mc("Why do we look at the first letter first in a dictionary?", "Words are sorted by their first letter", ["Words are sorted by length", "Words are sorted by colour"], { hint: "How is the dictionary sorted?", why: "Words are sorted by first letter, then the next.", tag: "alphabet.reason" }),
        mc("Why does bat come before bus in a dictionary?", "a comes before u in the alphabet", ["bat is shorter", "bus is a vehicle"], { hint: "Both start with b. Look at the second letter.", why: "The second letters decide: a comes before u.", tag: "alphabet.reason" })]),
      // ----- upgrade: 15 new mains (q16-q30), 1 variant each
      Q(fill("Pick the vowel teams.", "The word s{b1}l has the sound ay. The word f{b2}t has the sound ee.", [["ai", "ee", "oa"], ["ee", "ai", "oa"]], { hint: "Say each word slowly.", why: "Sail has ai and feet has ee.", tag: "vowelteam.fill" }), "vowels", "apply", [
        fill("Choose the vowel teams that finish the words.", "The word c{b1}t keeps you warm. The word gr{b2}n is a colour.", [["oa", "ai", "ee"], ["ee", "oa", "ai"]], { hint: "Say each word slowly.", why: "Coat has oa and green has ee.", tag: "vowelteam.fill" })]),
      Q(sld("Slide to show how many vowel letters (a, e, i, o, u) are in the word sail.", { min: 0, max: 6 }, 2, 0, { hint: "Look for a and i.", why: "Sail has two vowel letters, a and i.", tag: "vowel.count" }), "vowels", "apply", [
        sld("Slide to show how many vowel letters (a, e, i, o, u) are in the word cheese.", { min: 0, max: 6 }, 3, 0, { hint: "Look for the e letters.", why: "Cheese has three vowel letters, all e.", tag: "vowel.count" })]),
      Q(mc("Sam says the e in cake makes no difference because it is silent. Is he right?", "No, the silent e makes the a say its name", ["Yes, a silent e does nothing", "Yes, the e is said out loud"], { hint: "Compare cap and cape.", why: "A silent e changes cap to cape, so the a says its name.", tag: "splitvowel.reason" }), "vowels", "reason", [
        mc("Mira says kit and kite have the same vowel sound. Is she right?", "No, the silent e in kite makes the i say its name", ["Yes, they sound the same", "Yes, kit has a silent e too"], { hint: "Say both words.", why: "The silent e changes kit to kite and the i says its name.", tag: "splitvowel.reason" })]),
      Q(hot("Tap the picture whose word has a split vowel.", [["🪁", "kite", 22, 50], ["🐖", "pig", 50, 50], ["🐕", "dog", 78, 50]], ["kite"], { labels: true, hint: "Look for a silent e at the end.", why: "Kite has i-e with a silent e.", tag: "splitvowel.find" }), "vowels", "apply", [
        hot("Tap the word that has the vowel team oa.", [["🐐", "goat", 22, 50], ["🐈", "cat", 50, 50], ["🐖", "pig", 78, 50]], ["goat"], { labels: true, hint: "Look for o and a side by side.", why: "Goat has the vowel team oa.", tag: "vowelteam.oa" })]),
      Q(tf("Unkind means not kind.", true, { hint: "Un means not.", why: "The prefix un means not.", tag: "prefix.un" }), "affixes", "apply", [
        tf("Careful means not careful.", false, { hint: "Ful means full of.", why: "Careful means full of care.", tag: "suffix.ful" })]),
      Q(st("Add ful to help. Write the new word.", ["helpful"], { hint: "Put ful at the back.", why: "Help plus ful makes helpful.", tag: "suffix.ful" }), "affixes", "recall", [
        st("Add ful to thank. Write the new word.", ["thankful"], { hint: "Put ful at the back.", why: "Thank plus ful makes thankful.", tag: "suffix.ful" })]),
      Q(mc("Aisha says un means full of. Is she right?", "No, un means not and ful means full of", ["Yes, un means full of", "Yes, un and ful mean the same"], { hint: "Think of unhappy.", why: "Un means not. Ful means full of.", tag: "affix.reason" }), "affixes", "reason", [
        mc("Omar says a suffix goes at the front of a word. Is he right?", "No, a suffix goes at the back", ["Yes, suffixes go at the front", "Yes, suffixes go in the middle"], { hint: "Think of helpful.", why: "A suffix goes at the back of a word.", tag: "affix.reason" })]),
      Q(mat("Match each new word to what it means.", [["unhappy", "not happy"], ["helpful", "full of help"], ["untidy", "not tidy"]], { hint: "Un means not. Ful means full of.", why: "Un means not and ful means full of.", tag: "affix.meaning" }), "affixes", "apply", [
        mat("Link each word to its meaning.", [["unkind", "not kind"], ["careful", "full of care"], ["unfair", "not fair"]], { hint: "Un means not. Ful means full of.", why: "Un means not and ful means full of.", tag: "affix.meaning" })]),
      Q(mc("Choose the right word: Aisha ate a juicy ___.", "pear", ["pair", "pare"], { hint: "Which one is a fruit?", why: "A pear is a fruit.", tag: "homophone.pick" }), "homophones", "apply", [
        mc("Choose the right word: The dog wagged its ___.", "tail", ["tale", "tial"], { hint: "Which one belongs to a dog?", why: "A tail is the end of an animal.", tag: "homophone.pick" })]),
      Q(fill("Pick the right spellings.", "A {b1} of socks lives in my drawer. A ripe {b2} is on the table.", [["pair", "pear", "pare"], ["pear", "pair", "pare"]], { hint: "Which is two things and which is a fruit?", why: "A pair is two things. A pear is a fruit.", tag: "homophone.pick" }), "homophones", "apply", [
        fill("Choose the right spellings.", "The {b1} is shining. My {b2} is called Hamza.", [["sun", "son", "sin"], ["son", "sun", "sin"]], { hint: "Which is in the sky and which is a boy?", why: "The sun shines. A son is a boy child.", tag: "homophone.pick" })]),
      Q(mc("Zainab writes do'nt for do not. Is she right?", "No, the apostrophe goes where the o is missing: don't", ["Yes, the apostrophe goes before the n", "Yes, do'nt is the right spelling"], { hint: "Which letter has gone?", why: "Don't is do not with the o missing, so the apostrophe sits where the o was.", tag: "homophone.reason" }), "homophones", "reason", [
        mc("Ali writes is'nt for is not. Is he right?", "No, the apostrophe goes where the o is missing: isn't", ["Yes, is'nt is correct", "Yes, the apostrophe goes after the s"], { hint: "Which letter has gone?", why: "Isn't is is not with the o missing.", tag: "homophone.reason" })]),
      Q(mat("Match each short form to its long form.", [["can't", "can not"], ["don't", "do not"], ["isn't", "is not"]], { hint: "Which letter is missing?", why: "The apostrophe shows a missing letter.", tag: "apostrophe.short" }), "homophones", "apply", [
        mat("Join each short form to its long form.", [["didn't", "did not"], ["hasn't", "has not"], ["doesn't", "does not"]], { hint: "Which letter is missing?", why: "The apostrophe shows a missing letter.", tag: "apostrophe.short" })]),
      Q(ms("Which two words sound the same as each other? Pick two.", ["tail", "tale"], ["tall", "tell"], { hint: "Say them out loud.", why: "Tail and tale are homophones.", tag: "homophone.def" }), "homophones", "apply", [
        ms("Pick the two words that sound the same.", ["sun", "son"], ["sin", "sad"], { hint: "Say them out loud.", why: "Sun and son are homophones.", tag: "homophone.def" })]),
      Q(ord("Order these words using their second letters.", ["bat", "bed", "bus"], { hint: "All start with b. Look at a, e, u.", why: "Bat, bed, bus follow a, e, u.", tag: "alphabet.order" }), "alphabet", "apply", [
        ord("Arrange these words using their second letters.", ["cap", "cow", "cup"], { hint: "All start with c. Look at a, o, u.", why: "Cap, cow, cup follow a, o, u.", tag: "alphabet.order" })]),
      Q(mc("Layla says zoo comes before ant in a dictionary because it is shorter. Is she right?", "No, a comes before z, so ant comes first", ["Yes, short words come first", "Yes, z comes before a"], { hint: "Look at the first letters.", why: "A comes before z. Length does not matter.", tag: "alphabet.reason" }), "alphabet", "reason", [
        mc("Sam says a dictionary lists words by how long they are. Is he right?", "No, it lists them in alphabetical order", ["Yes, the shortest word is first", "Yes, the longest word is first"], { hint: "Think of ABC.", why: "A dictionary uses alphabetical order.", tag: "alphabet.reason" })]),
    ],
  }),
];
