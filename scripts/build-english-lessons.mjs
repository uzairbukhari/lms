// Writes the two Week 1 English diagnostic lessons (Class 1 and Class 4) to content/lessons.
//   node scripts/build-english-lessons.mjs
// The lessons follow docs/LESSON_GUIDELINES.md: every new word is shown (explainer, picture or movable thing), every bold word
// is in the glossary, and the quiz has 12 questions with a hint and an explanation on each.
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = join(dirname(fileURLToPath(import.meta.url)), "../content/lessons");
const it = (emoji, x, y, o = {}) => ({ emoji, x, y, ...o });
const letters = "abcdefgh";
const opts = (texts) => texts.map((text, i) => ({ id: letters[i], text }));

const mc = (ref, skill_tag, prompt, texts, correct, extra = {}) => ({ type: "multiple_choice", prompt, ref, skill_tag, options: opts(texts), answer: [letters[correct]], ...extra });
const multi = (ref, skill_tag, prompt, texts, correct, extra = {}) => ({ type: "multi_select", prompt, ref, skill_tag, options: opts(texts), answer: correct.map((i) => letters[i]), ...extra });
const tf = (ref, skill_tag, prompt, answer, extra = {}) => ({ type: "true_false", prompt, ref, skill_tag, answer: [answer], ...extra });
const num = (ref, skill_tag, prompt, value, extra = {}) => ({ type: "number", prompt, ref, skill_tag, answer: { value, tolerance: 0 }, ...extra });
const text = (ref, skill_tag, prompt, accepted, extra = {}) => ({ type: "short_text", prompt, ref, skill_tag, answer: { accepted }, ...extra });
const order = (ref, skill_tag, prompt, words, extra = {}) => ({ type: "order", prompt, ref, skill_tag, items: opts(words), answer: words.map((_, i) => letters[i]), ...extra });
const match = (ref, skill_tag, prompt, pairs, extra = {}) => ({
  type: "match", prompt, ref, skill_tag,
  left: pairs.map(([l], i) => ({ id: `l${i + 1}`, text: l })),
  right: pairs.map(([, r], i) => ({ id: `r${i + 1}`, text: r })),
  answer: Object.fromEntries(pairs.map((_, i) => [`l${i + 1}`, `r${i + 1}`])),
  ...extra,
});
const heading = (t) => ({ type: "heading", text: t });
const para = (markdown) => ({ type: "text", markdown });
const check = (question) => ({ type: "check", question });

// ---------------------------------------------------------------------------------------------------------------------
// Class 1 (age 7 to 8)
// ---------------------------------------------------------------------------------------------------------------------
const class1 = {
  schema_version: "1.0",
  lesson: {
    slug: "diag-english-class-1",
    subject: "english",
    title: "English Check-In: Where Am I?",
    summary: "Play with letters, sounds, rhymes, sentences, opposites and a tiny story so we can see what you already know.",
    age_band: "7-8",
    difficulty: 1,
    estimated_minutes: 60,
    unit: "Week 1: Where am I?",
    learning_objectives: [
      "Show I can hear sounds in words and match rhymes",
      "Show I can build a sentence with a capital letter and a full stop",
      "Show I can spot naming words, action words and opposites, and read a short story",
    ],
    tags: ["diagnostic", "week-1"],
    curriculum: { course: "english-class-1", semester: 1, week: 1 },
  },
  blocks: [
    heading("Welcome, Word Explorer!"),
    para("Today is a **check-in**. We will play with letters, sounds, words and a little story. There are no wrong guesses, only tries!"),
    { type: "image", emoji: "📚", alt: "A pile of books", caption: "Let us explore words!" },

    heading("Stop 1: Letters and sounds"),
    para("The **alphabet** has 26 letters. Each letter makes a **sound**. Put the sounds together and you can read a word!"),
    { type: "image", emoji: "🔤", alt: "Letters A B C", caption: "The alphabet: a, b, c and 23 more letters" },
    { type: "explainer", title: "Sounds make a word", scenes: [
      { caption: "Say the first sound: c.", items: [it("c", 30, 50, { id: "c", size: 3, anim: "bounce" })] },
      { caption: "Now the next sound: a.", items: [it("c", 30, 50, { id: "c", size: 3 }), it("a", 50, 50, { id: "a", size: 3, anim: "bounce" })] },
      { caption: "And the last sound: t.", items: [it("c", 30, 50, { id: "c", size: 3 }), it("a", 50, 50, { id: "a", size: 3 }), it("t", 70, 50, { id: "t", size: 3, anim: "bounce" })] },
      { caption: "Push the sounds together: c, a, t says cat!", items: [it("c", 38, 50, { id: "c", size: 3 }), it("a", 50, 50, { id: "a", size: 3 }), it("t", 62, 50, { id: "t", size: 3 }), it("🐱", 50, 18, { size: 3, anim: "grow", label: "cat" })] },
    ] },
    check({ type: "multiple_choice", prompt: "Which word starts with the same sound as snake?", emoji: "🐍", options: opts(["sun", "hat", "dog"]), answer: ["a"] }),

    heading("Stop 2: Rhymes"),
    para("Words that **rhyme** sound the same at the end. Cat and hat rhyme. They both end in the sound at."),
    { type: "image", emoji: "🐱🎩", alt: "A cat and a hat", caption: "cat and hat rhyme" },
    check(match("c1", "rhyme.match", "Match the words that rhyme.", [["cat", "hat"], ["bee", "tree"], ["sun", "run"]])),

    heading("Stop 3: Sentences"),
    para("A **sentence** tells us a whole idea. It starts with a **capital letter** and ends with a **full stop**."),
    { type: "explainer", title: "Building a sentence", scenes: [
      { caption: "A sentence starts with a capital letter. Here is a capital T.", items: [it("The", 15, 50, { id: "w1", size: 3, anim: "pulse", label: "capital T" })] },
      { caption: "Add the next word.", items: [it("The", 15, 50, { id: "w1", size: 3 }), it("dog", 40, 50, { id: "w2", size: 3, anim: "grow" })] },
      { caption: "Add the action word.", items: [it("The", 15, 50, { id: "w1", size: 3 }), it("dog", 40, 50, { id: "w2", size: 3 }), it("runs", 68, 50, { id: "w3", size: 3, anim: "grow" })] },
      { caption: "A full stop goes at the end. Now it is a sentence!", items: [it("The", 15, 50, { id: "w1", size: 3 }), it("dog", 40, 50, { id: "w2", size: 3 }), it("runs", 68, 50, { id: "w3", size: 3 }), it("🔴", 90, 62, { id: "dot", size: 1, anim: "pulse", label: "full stop" }), it("🐕", 50, 18, { size: 3, anim: "bounce" })] },
    ] },
    { type: "manipulative", title: "Word bricks", goal: "Think of a sentence, like I like red apples. Move one brick for every word. How many words is your sentence?", emoji: "🧱", count: 8, zones: ["Words in my sentence", "Spare bricks"] },
    check(order("c2", "sentences.order", "Put the words in order to make a sentence.", ["The", "cat", "sat", "down."])),

    heading("Stop 4: Naming words and action words"),
    para("A **noun** is a naming word, like frog, ball or Mum. A **verb** is an action word, like jump, run or eat."),
    { type: "explainer", title: "Noun and verb", scenes: [
      { caption: "This is a frog. Frog is a noun. It names something.", items: [it("🐸", 30, 55, { id: "frog", size: 3, label: "frog (noun)" })] },
      { caption: "Now the frog is doing something. Jump is a verb. It is an action word.", items: [it("🐸", 70, 35, { id: "frog", size: 3, anim: "bounce", label: "jump (verb)" })] },
    ] },
    check(mc("c3", "grammar.verbs", "Which one is an action word?", ["table", "jump", "red"], 1)),

    heading("Stop 5: Opposites"),
    para("**Opposites** are words that mean the very opposite. Hot and cold are opposites."),
    { type: "explainer", title: "Opposites", scenes: [
      { caption: "The sun is hot.", items: [it("☀️", 50, 45, { id: "t1", size: 3, anim: "spin", label: "hot" })] },
      { caption: "The snow is cold. Hot and cold are opposites!", items: [it("❄️", 50, 45, { id: "t1", size: 3, anim: "pulse", label: "cold" })] },
      { caption: "An elephant is big. A mouse is small. Big and small are opposites too!", items: [it("🐘", 30, 50, { size: 3, label: "big" }), it("🐭", 75, 60, { size: 1, label: "small" })] },
    ] },
    check(match("c4", "vocab.opposites", "Match each word to its opposite.", [["up", "down"], ["happy", "sad"], ["day", "night"]])),
    { type: "activity", title: "Rhyme hunt", materials: ["a pencil", "paper", "a grown-up helper"], instructions: ["Say cat. Can you think of two words that rhyme with cat?", "Say dog. Can you think of a word that rhymes with dog?", "Write your favourite rhyming pair and draw a picture of each word."] },

    heading("Stop 6: A little story"),
    para("Read this story. Pip has a red kite. The wind is strong. Pip runs and the kite goes up, up, up!"),
    { type: "image", emoji: "🪁", alt: "A red kite flying", caption: "Pip's kite" },
    check(mc("c5", "reading.literal", "What colour is Pip's kite?", ["red", "blue", "green"], 0)),
    { type: "reveal", prompt: "What do you think Pip does next?", answer_markdown: "Any answer is great! Maybe Pip keeps running, or the kite flies over the trees. Making a guess about what happens next is a big reading skill." },

    { type: "brain_game", game: "memory_match", title: "Match the pictures", goal: "Turn over two cards. Can you find all the pairs?", emojis: ["🐱", "🐶", "🐸", "🍎", "🌞", "🪁"] },
    { type: "summary", points: [
      "Letters make sounds, and sounds make words.",
      "Rhyming words sound the same at the end.",
      "A sentence starts with a capital letter and ends with a full stop.",
      "A noun names something and a verb is an action.",
      "Opposites are words that mean the very opposite.",
    ] },
    { type: "callout", style: "tip", markdown: "Ready? Start the quiz. It has 12 questions and takes about 15 minutes. A guess is better than a blank." },
    { type: "glossary", terms: [
      { term: "check-in", meaning: "A friendly game that shows us what you know. It is not a test." },
      { term: "alphabet", meaning: "All the letters we use for reading and writing. There are 26 of them." },
      { term: "sound", meaning: "What you hear when you say a letter, like sss for s." },
      { term: "rhyme", meaning: "Words that sound the same at the end, like cat and hat." },
      { term: "sentence", meaning: "Words that tell a whole idea. It starts with a capital letter and ends with a full stop." },
      { term: "capital letter", meaning: "A big letter, like T, used at the start of a sentence or a name." },
      { term: "full stop", meaning: "A little dot at the end of a sentence." },
      { term: "noun", meaning: "A naming word, like frog, ball or Mum." },
      { term: "verb", meaning: "An action word, like jump, run or eat." },
      { term: "opposites", meaning: "Words that mean the very opposite, like hot and cold." },
    ] },
  ],
  quiz: {
    pass_percent: 1,
    shuffle_questions: false,
    shuffle_options: true,
    max_attempts: null,
    questions: [
      mc("q1", "phonics.initial_sound", "Which word starts with the same sound as fish?", ["fan", "sun", "bat"], 0, { emoji: "🐟", hint: "Say fish slowly. What is the first sound?", explanation: "Fish and fan both start with the sound fff." }),
      mc("q2", "alphabet.order", "Which letter comes after b in the alphabet?", ["a", "c", "d"], 1, { hint: "Say it: a, b, ...", explanation: "The order is a, b, c, d." }),
      num("q3", "phonics.segmenting", "How many sounds do you hear in the word dog? (d, o, g)", 3, { hint: "Say each sound and count them on your fingers.", explanation: "d, o, g is 3 sounds." }),
      mc("q4", "rhyme.match", "Which word rhymes with cake?", ["lake", "kite", "cat"], 0, { hint: "Listen to the end of cake.", explanation: "Cake and lake both end in the sound ake." }),
      mc("q5", "spelling.sight_words", "Which word is spelled correctly?", ["sed", "said", "siad"], 1, { hint: "It has the letters s, a, i, d.", explanation: "The right spelling is said." }),
      mc("q6", "sentences.punctuation", "Which sentence is written correctly?", ["the dog runs.", "The dog runs.", "The dog runs"], 1, { points: 2, hint: "Look for a capital letter at the start and a full stop at the end.", explanation: "A sentence starts with a capital letter and ends with a full stop." }),
      order("q7", "sentences.order", "Put the words in order to make a sentence.", ["I", "like", "red", "apples."], { points: 2, hint: "Start with the word I.", explanation: "I like red apples. makes sense and ends with a full stop." }),
      mc("q8", "grammar.nouns", "Which word is a naming word (a noun)?", ["run", "apple", "jump"], 1, { hint: "A noun is a thing you could see or hold.", explanation: "Apple names a thing, so it is a noun. Run and jump are actions." }),
      tf("q9", "grammar.verbs", "Jump is an action word.", true, { hint: "Can you do it with your body?", explanation: "Yes! Jump is something you do, so it is a verb." }),
      match("q10", "vocab.opposites", "Match each word to its opposite.", [["hot", "cold"], ["big", "small"], ["in", "out"]], { points: 2, hint: "Think of the very opposite.", explanation: "Hot and cold, big and small, in and out are opposites." }),
      mc("q11", "reading.literal", "Sam has a blue hat. He puts it on his head. What does Sam put on his head?", ["a hat", "a shoe", "a bag"], 0, { hint: "Read the second sentence again.", explanation: "The story says Sam puts his blue hat on his head." }),
      mc("q12", "reading.inference", "Ben puts on his coat and boots. Then he picks up his umbrella. What is the weather like?", ["rainy", "sunny", "hot"], 0, { points: 2, hint: "Why would Ben need an umbrella and boots?", explanation: "Coats, boots and umbrellas are for rainy days, so we can guess it is raining." }),
    ],
  },
};

// ---------------------------------------------------------------------------------------------------------------------
// Class 4 (age 9 to 10)
// ---------------------------------------------------------------------------------------------------------------------
const class4 = {
  schema_version: "1.0",
  lesson: {
    slug: "diag-english-class-4",
    subject: "english",
    title: "English Check-In: Where Am I?",
    summary: "Check what you know about word classes, punctuation, tenses, word building, vocabulary and reading between the lines so we can plan your English year.",
    age_band: "9-10",
    difficulty: 2,
    estimated_minutes: 60,
    unit: "Week 1: Where am I?",
    learning_objectives: [
      "Show I can name nouns, verbs, adjectives and adverbs",
      "Show I can use capital letters, commas, apostrophes and speech marks",
      "Show I can use tenses, prefixes and word meanings, and read between the lines",
    ],
    tags: ["diagnostic", "week-1"],
    curriculum: { course: "english-class-4", semester: 1, week: 1 },
  },
  blocks: [
    heading("Welcome, Wordsmith!"),
    para("This is a **check-in**, not a test. Good writers are curious about words and not afraid to guess. Show us what you know and where you want to learn more."),
    { type: "image", emoji: "✍️", alt: "A hand writing", caption: "Time to play with words!" },

    heading("Stop 1: The jobs words do"),
    para("Every word has a job. A **noun** names a person, place or thing. A **verb** is an action. An **adjective** describes a noun. An **adverb** tells us how, when or where something happens."),
    { type: "explainer", title: "The jobs in a sentence", scenes: [
      { caption: "Here is a sentence: The big dog runs quickly.", items: [it("The", 8, 50), it("big", 27, 50, { id: "adj" }), it("dog", 46, 50, { id: "noun" }), it("runs", 65, 50, { id: "verb" }), it("quickly", 87, 50, { id: "adv" })] },
      { caption: "Dog is a noun. It names the animal.", items: [it("The", 8, 50), it("big", 27, 50, { id: "adj" }), it("dog", 46, 50, { id: "noun", anim: "pulse", label: "noun" }), it("runs", 65, 50, { id: "verb" }), it("quickly", 87, 50, { id: "adv" })] },
      { caption: "Runs is a verb. It is the action.", items: [it("The", 8, 50), it("big", 27, 50, { id: "adj" }), it("dog", 46, 50, { id: "noun", label: "noun" }), it("runs", 65, 50, { id: "verb", anim: "pulse", label: "verb" }), it("quickly", 87, 50, { id: "adv" })] },
      { caption: "Big is an adjective. It describes the dog.", items: [it("The", 8, 50), it("big", 27, 50, { id: "adj", anim: "pulse", label: "adjective" }), it("dog", 46, 50, { id: "noun", label: "noun" }), it("runs", 65, 50, { id: "verb", label: "verb" }), it("quickly", 87, 50, { id: "adv" })] },
      { caption: "Quickly is an adverb. It tells us how the dog runs.", items: [it("The", 8, 50), it("big", 27, 50, { id: "adj", label: "adjective" }), it("dog", 46, 50, { id: "noun", label: "noun" }), it("runs", 65, 50, { id: "verb", label: "verb" }), it("quickly", 87, 50, { id: "adv", anim: "pulse", label: "adverb" }), it("🐕", 50, 15, { size: 3, anim: "bounce" })] },
    ] },
    check({ type: "multi_select", prompt: "Pick both verbs: The children laughed and played.", options: opts(["children", "laughed", "and", "played"]), answer: ["b", "d"] }),

    heading("Stop 2: Punctuation"),
    para("**Capital letters** begin sentences and names. A **comma** separates the things in a list. **Speech marks** go round the exact words someone says. An **apostrophe** shows that letters are missing, or that something belongs to someone."),
    { type: "explainer", title: "Capitals, commas and speech marks", scenes: [
      { caption: "Capital letters start sentences and names. Mia has a capital M.", items: [it("Mia", 50, 50, { id: "name", size: 3, anim: "pulse", label: "capital letter" })] },
      { caption: "Commas separate things in a list. Mia packed apples, bananas and grapes.", items: [it("🍎", 22, 45, { id: "f1", size: 3 }), it(",", 33, 60, { id: "c1", size: 3, anim: "grow", label: "comma" }), it("🍌", 48, 45, { id: "f2", size: 3 }), it(",", 59, 60, { id: "c2", size: 3, anim: "grow", label: "comma" }), it("🍇", 75, 45, { id: "f3", size: 3 })] },
      { caption: "Speech marks go round the exact words someone says.", items: [it("🗣️", 18, 50, { size: 3 }), it("“", 38, 40, { id: "q1", size: 3, anim: "grow", label: "speech marks" }), it("Hello!", 56, 50, { id: "say", size: 3 }), it("”", 78, 40, { id: "q2", size: 3, anim: "grow" })] },
    ] },
    { type: "explainer", title: "What the apostrophe does", scenes: [
      { caption: "Two words: do and not.", items: [it("do", 30, 50, { id: "a", size: 3 }), it("not", 65, 50, { id: "b", size: 3 })] },
      { caption: "Squash them together and the letter o falls out.", items: [it("do", 40, 50, { id: "a", size: 3 }), it("n't", 62, 50, { id: "b", size: 3, anim: "pulse" })] },
      { caption: "The apostrophe takes the place of the missing o: don't.", items: [it("don't", 50, 50, { id: "a", size: 3, anim: "grow", label: "apostrophe replaces o" })] },
      { caption: "It also shows who owns something. The dog's bone is the bone that belongs to the dog.", items: [it("🐕", 30, 50, { size: 3, label: "dog's" }), it("🦴", 70, 55, { size: 3, anim: "bounce", label: "bone" })] },
    ] },
    check(mc("c1", "punctuation.apostrophe", "Which sentence uses an apostrophe correctly?", ["The dogs bone is big.", "The dog's bone is big.", "The dogs' bone's is big."], 1)),
    check(tf("c2", "punctuation.comma", "A comma can be used to separate the things in a list.", true)),

    heading("Stop 3: Tenses"),
    para("**Tense** tells us when something happens. Past: I walked. Present: I walk. Future: I will walk. Some verbs change in tricky ways, like go becomes went."),
    { type: "explainer", title: "Past, present and future", scenes: [
      { caption: "Yesterday I walked to school. That is the past.", items: [it("🚶", 20, 55, { id: "me", size: 3, label: "walked (past)" }), it("🏫", 85, 40, { size: 3 })] },
      { caption: "Today I walk to school. That is the present.", items: [it("🚶", 50, 55, { id: "me", size: 3, anim: "bounce", label: "walk (present)" }), it("🏫", 85, 40, { size: 3 })] },
      { caption: "Tomorrow I will walk to school. That is the future.", items: [it("🚶", 78, 55, { id: "me", size: 3, label: "will walk (future)" }), it("🏫", 85, 40, { size: 3 })] },
    ] },
    check(match("c3", "grammar.tense", "Match each verb to its past tense.", [["run", "ran"], ["eat", "ate"], ["swim", "swam"]])),

    heading("Stop 4: Building words and meanings"),
    para("A **prefix** goes at the start of a word and changes its meaning, like un in unhappy. A **suffix** goes at the end, like ful in careful."),
    { type: "explainer", title: "Building new words", scenes: [
      { caption: "Start with the word happy.", items: [it("happy", 55, 50, { id: "w", size: 3 })] },
      { caption: "Add the prefix un at the start.", items: [it("un", 25, 50, { id: "p", size: 3, anim: "grow" }), it("happy", 62, 50, { id: "w", size: 3 })] },
      { caption: "Unhappy means not happy. A prefix changed the meaning!", items: [it("unhappy", 50, 50, { id: "w", size: 3, anim: "pulse", label: "not happy" }), it("😢", 50, 15, { size: 3 })] },
      { caption: "Now try a suffix. Add ful to care and you get careful, which means full of care.", items: [it("care", 35, 50, { id: "c", size: 3 }), it("ful", 68, 50, { id: "s", size: 3, anim: "grow", label: "suffix" })] },
    ] },
    check(mc("c4", "morphology.prefix", "Which prefix makes happy mean not happy?", ["un", "re", "pre"], 0)),
    para("A **synonym** is a word with almost the same meaning. An **antonym** is a word with the opposite meaning."),
    { type: "explainer", title: "Synonyms and antonyms", scenes: [
      { caption: "Big and large mean almost the same. They are synonyms.", items: [it("🐘", 30, 50, { id: "e1", size: 3, label: "big" }), it("🐘", 70, 50, { id: "e2", size: 3, label: "large" })] },
      { caption: "Big and small mean the opposite. They are antonyms.", items: [it("🐘", 30, 50, { id: "e1", size: 3, label: "big" }), it("🐭", 70, 60, { id: "m1", size: 1, label: "small" })] },
    ] },
    check(mc("c5", "vocabulary.synonyms", "Which word is a synonym of tiny?", ["small", "huge", "loud"], 0)),

    heading("Stop 5: Reading between the lines"),
    para("Good readers notice clues. Read this: Mia packed her bag the night before the trip. In the morning she woke early and ran to the window. Thick grey clouds covered the sky, but she grinned and pulled on her raincoat anyway. She could not wait to see the waterfalls."),
    { type: "image", emoji: "🌧️", alt: "Grey rainy clouds", caption: "Grey clouds over Mia's trip" },
    check(mc("c6", "reading.inference", "How did Mia feel about the trip?", ["excited", "bored", "afraid"], 0)),
    { type: "reveal", prompt: "Which clues in the story tell you how Mia felt?", answer_markdown: "She packed the night before, woke early, ran to the window and grinned even though it was cloudy. All of these clues show she was excited." },
    { type: "activity", title: "Sentence builder", materials: ["paper", "a pencil"], instructions: ["Write one sentence that has a noun, a verb, an adjective and an adverb in it.", "Underline each of the four words and write its job above it.", "Now change the sentence into the past tense and read it aloud."] },

    { type: "brain_game", game: "remember_order", title: "Writer's memory", goal: "Watch the order, then copy it.", emojis: ["📖", "✏️", "🔤", "📝"] },
    { type: "summary", points: [
      "Nouns name, verbs act, adjectives describe and adverbs tell how.",
      "Punctuation marks help the reader: capital letters, commas, apostrophes and speech marks.",
      "Tense tells us if something happened in the past, present or future.",
      "Prefixes and suffixes change words. Synonyms and antonyms are about meaning.",
      "Clues in a text help us work out what is not said.",
    ] },
    { type: "callout", style: "tip", markdown: "Ready? Start the quiz. It has 12 questions and takes about 15 minutes. A guess is better than a blank." },
    { type: "glossary", terms: [
      { term: "check-in", meaning: "A friendly game that shows us what you know. It is not a test." },
      { term: "noun", meaning: "A word that names a person, place or thing." },
      { term: "verb", meaning: "A word for an action or a state, like run or is." },
      { term: "adjective", meaning: "A word that describes a noun, like big or red." },
      { term: "adverb", meaning: "A word that tells how, when or where something happens, like quickly." },
      { term: "capital letters", meaning: "Big letters used at the start of sentences and names." },
      { term: "comma", meaning: "A small mark (,) that separates things in a list or pauses a sentence." },
      { term: "speech marks", meaning: "Marks (\" \") that go around the exact words someone says." },
      { term: "apostrophe", meaning: "A mark (') that shows missing letters, as in don't, or belonging, as in the dog's bone." },
      { term: "tense", meaning: "Tells us when something happens: past, present or future." },
      { term: "prefix", meaning: "A group of letters added to the start of a word to change its meaning." },
      { term: "suffix", meaning: "A group of letters added to the end of a word to change its meaning." },
      { term: "synonym", meaning: "A word that means almost the same as another word." },
      { term: "antonym", meaning: "A word that means the opposite of another word." },
    ] },
  ],
  quiz: {
    pass_percent: 1,
    shuffle_questions: false,
    shuffle_options: true,
    max_attempts: null,
    questions: [
      mc("q1", "grammar.nouns", "Which word is a noun? A quiet librarian smiled.", ["quiet", "librarian", "smiled"], 1, { hint: "A noun names a person, place or thing.", explanation: "Librarian names a person. Quiet describes and smiled is an action." }),
      mc("q2", "grammar.adjectives", "Which word is an adjective? The enormous whale swam away.", ["enormous", "whale", "swam", "away"], 0, { hint: "It describes the whale.", explanation: "Enormous describes the whale, so it is an adjective." }),
      mc("q3", "grammar.adverbs", "Which word is the adverb? Birds sing sweetly.", ["Birds", "sing", "sweetly"], 2, { hint: "It tells us how the birds sing.", explanation: "Sweetly tells us how the birds sing, so it is an adverb." }),
      multi("q4", "grammar.verbs", "Pick the two verbs: We painted pictures and hung them up.", ["painted", "pictures", "hung", "them"], [0, 2], { points: 2, hint: "Look for the two actions.", explanation: "Painted and hung are the actions, so they are verbs." }),
      mc("q5", "punctuation.apostrophe", "Which sentence is correct?", ["I cant find Toms bag.", "I can't find Tom's bag.", "I ca'nt find Toms' bag."], 1, { points: 2, hint: "One apostrophe shows a missing letter. One shows who owns the bag.", explanation: "Can't has a missing o and Tom's bag belongs to Tom." }),
      mc("q6", "punctuation.speech_marks", "Which sentence uses speech marks correctly?", ["She asked, Can I come?", "She asked, \"Can I come?\"", "She \"asked, Can\" I come?"], 1, { hint: "Speech marks go round the exact words spoken.", explanation: "The spoken words, Can I come?, sit inside the speech marks." }),
      match("q7", "grammar.tense", "Match each verb to its past tense.", [["go", "went"], ["see", "saw"], ["buy", "bought"]], { points: 2, hint: "Say each one in a sentence that starts with yesterday.", explanation: "Go becomes went, see becomes saw and buy becomes bought." }),
      text("q8", "spelling.plurals", "Write the plural of child.", ["children"], { hint: "It does not end in s.", explanation: "The plural of child is children." }),
      mc("q9", "grammar.tense", "Which sentence is in the future tense?", ["I walked to school.", "I walk to school.", "I will walk to school."], 2, { hint: "Look for the word that says it has not happened yet.", explanation: "Will walk tells us it is going to happen." }),
      mc("q10", "morphology.prefix", "Which word means to build again?", ["rebuild", "unbuild", "prebuild"], 0, { hint: "Which prefix means again?", explanation: "The prefix re means again, so rebuild is to build again." }),
      mc("q11", "vocabulary.antonyms", "Which word is an antonym of ancient?", ["modern", "old", "huge"], 0, { hint: "An antonym means the opposite. Ancient means very, very old.", explanation: "Modern means new, which is the opposite of ancient." }),
      mc("q12", "reading.inference", "The cake was gone from the plate. Tom's sister had chocolate on her chin and a guilty smile. What can we guess?", ["His sister ate the cake", "Tom lost the plate", "The cake was never made"], 0, { points: 2, hint: "Use the clues about the sister.", explanation: "The chocolate on her chin and her guilty smile are clues that she ate the cake." }),
    ],
  },
};

// Every bold word must be explained in the glossary (docs/LESSON_GUIDELINES.md rule 2).
for (const file of [class1, class4]) {
  const terms = file.blocks.find((b) => b.type === "glossary").terms.map((t) => t.term.toLowerCase());
  for (const b of file.blocks.filter((b) => b.type === "text")) {
    for (const [, bold] of b.markdown.matchAll(/\*\*(.+?)\*\*/g)) {
      if (!terms.includes(bold.toLowerCase())) throw new Error(`${file.lesson.slug}: bold word "${bold}" is not in the glossary`);
    }
  }
}

writeFileSync(join(dir, "diag-english-class-1.json"), JSON.stringify(class1, null, 2) + "\n");
writeFileSync(join(dir, "diag-english-class-4.json"), JSON.stringify(class4, null, 2) + "\n");
console.log("wrote diag-english-class-1.json and diag-english-class-4.json");
