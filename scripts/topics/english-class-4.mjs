import { SAY, SS, H, T, IMG, TIP, FACT, REVEAL, ACT, BRAIN, SUM, CHK, S, EXP, ROW, GLOSS, mc, ms, tf, num, st, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// English topic lessons for Fatima (Class 4, age 9). Standards from docs/CURRICULUM_V2.md section 3 (NC Year 4, Cambridge Stage 4).
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });

/* ---------------------------------------------------------------------------------------------
   Topic 1: Grammar toolkit
   --------------------------------------------------------------------------------------------- */

const similes = {
  id: "similes", kind: "learn", title: "Similes and noun phrases",
  blocks: [
    H("Stop 1: Similes"),
    SAY("Good writers paint pictures with words. One powerful tool is the simile. A simile compares two different things using the word like or as. The moon was like a silver coin. The cheetah was as quick as lightning. The moon is not really a coin, and the cheetah is not lightning. But the comparison helps you picture it clearly. Watch the moon turn into a coin.", T("A **simile** compares two things using like or as.", "The moon was like a silver coin.", "The cheetah was as quick as lightning.")),
    EXPP("The moon and the coin",
      SS("Here is the moon, glowing in the night sky.", S("The moon.", ["m", "🌕", 50, 50, 3, "grow", "the moon"])),
      SS("A writer wants us to see its shape and shine. So they compare it to something familiar, a silver coin.", S("The moon was like a silver coin.", ["m", "🌕", 30, 50, 3, "none", "the moon"], ["l", "🟰", 50, 50, 2, "none", "like"], ["c", "🪙", 72, 50, 3, "grow", "a silver coin"]))),
    CHK(mc("Which sentence has a simile?", "The snow was like a soft blanket.", ["The snow was deep.", "The snow fell all night."], { hint: "Look for like or as.", why: "It compares snow to a blanket using the word like.", tag: "simile.find" })),
    CHK(tf("A simile compares two things using the words like or as.", true, { hint: "Think of the two joining words.", why: "Similes always use like or as.", tag: "simile.def" })),
    H("Stop 2: Expanded noun phrases"),
    SAY("A noun is a naming word, like lighthouse. But a plain noun can be a little dull. We can build it up with describing words. The tall, silver lighthouse. This is called an expanded noun phrase. It gives the reader more to see. Watch the lighthouse grow, one detail at a time.", T("An **expanded noun phrase** adds describing words to a noun.", "lighthouse → the tall, silver lighthouse")),
    EXPP("Growing a noun phrase",
      SS("Just a lighthouse. We can picture it, but not very well.", S("lighthouse", ["l", "🗼", 50, 55, 3, "grow", "lighthouse"])),
      SS("Add the tall. Now it towers over us.", S("the tall lighthouse", ["l", "🗼", 50, 55, 3, "grow", "the tall lighthouse"])),
      SS("Add silver, and a comma between the describing words. The tall, silver lighthouse. Now we see its height and its shine.", S("the tall, silver lighthouse", ["l", "🗼", 50, 55, 3, "pulse", "the tall, silver lighthouse"]))),
    CHK(mc("Which is an expanded noun phrase?", "the shy, brown rabbit", ["ran quickly", "the rabbit"], { hint: "Look for a noun with describing words added.", why: "The shy, brown rabbit adds two describing words to the noun rabbit.", tag: "nounphrase.find" })),
    CHK(mc("Which noun is being described in: a crumbly chocolate biscuit?", "biscuit", ["crumbly", "chocolate"], { hint: "The describing words come before it.", why: "Crumbly and chocolate describe the noun biscuit.", tag: "nounphrase.noun" })),
    SAY("Let us remember. A simile compares using like or as. An expanded noun phrase adds describing words to a noun.", SUM("A simile compares two things using like or as", "An expanded noun phrase adds describing words to a noun")),
    GLOSS({ simile: "A comparison between two things using the words like or as.", "expanded noun phrase": "A noun with describing words added, like the tall, silver lighthouse.", noun: "A naming word for a person, place or thing." }),
  ],
  mini: [
    mc("Which sentence has a simile?", "His voice was as loud as thunder.", ["His voice was very loud.", "He shouted all day."], { hint: "Look for as ... as or like.", why: "As loud as thunder compares his voice with thunder.", tag: "simile.find" }),
    tf("Our dog is like a furry rocket is a simile.", true, { hint: "Does it use like or as?", why: "It compares a dog to a rocket using like.", tag: "simile.find" }),
    mc("Which is an expanded noun phrase?", "a rusty old bicycle", ["pedalled slowly", "the bicycle"], { hint: "A noun with describing words.", why: "A rusty old bicycle adds rusty and old to the noun bicycle.", tag: "nounphrase.find" }),
  ],
};

const speech = {
  id: "speech", kind: "try", title: "Speech marks and apostrophes",
  blocks: [
    H("Stop 1: Showing who is speaking"),
    SAY("When someone speaks in a story, we show their exact words with speech marks. Speech marks look like tiny quotation marks, and they wrap around only the words that are said. Here is Mum calling. Come here, said Mum. The words Come here go inside the speech marks. Notice the comma. It sits inside, just before the closing speech marks.", T("**Speech marks** go around the exact words someone says.", "\"Come here,\" said Mum.", "The comma goes inside the speech marks.")),
    EXPP("Mum calls",
      SS("Mum is calling from the kitchen. These are her exact words: come here.", S("Mum says: come here.", ["m", "👩", 30, 55, 3, "grow", "Mum"], ["s", "💬", 62, 30, 3, "grow", "Come here"])),
      SS("To write it, we wrap the spoken words in speech marks, add a comma inside, and then say who spoke. Come here, said Mum.", S("\"Come here,\" said Mum.", ["m", "👩", 30, 55, 3, "none", "said Mum"], ["s", "💬", 62, 30, 3, "pulse", "\"Come here,\""]))),
    CHK(mc("Which is punctuated correctly?", "\"I am hungry,\" said Sam.", ["\"I am hungry\" said Sam.", "I am hungry, said Sam."], { hint: "Speech marks go around the spoken words, with the comma inside.", why: "The spoken words are inside speech marks and the comma sits just before the closing marks.", tag: "speech.punct" })),
    H("Stop 2: Write your own"),
    SAY("It is your turn to write. Listen to a conversation at home, then write down two lines of what people say. Give each speaker a new line. Use speech marks, a comma, and the word said.", ACT("Catch some speech", ["Paper and a pencil"], ["Listen to a short chat at home or imagine one between two friends.", "Write what one person says inside speech marks, with a comma inside.", "Add who said it, for example said Hamza.", "Start a new line when a different person speaks."])),
    SAY("Here are two friends chatting, with their words in speech bubbles.", IMG("🗣️", "Each speaker's words go inside speech marks, and a new speaker starts a new line.")),
    CHK(mc("Which words go inside the speech marks in: Dad said, \"Dinner is ready.\"?", "Dinner is ready.", ["Dad said", "Dad said, Dinner"], { hint: "Only the spoken words.", why: "Speech marks go around the exact words that are spoken.", tag: "speech.inside" })),
    H("Stop 3: Showing belonging"),
    SAY("The apostrophe is a tiny mark with a big job. It can show that something belongs to someone. Hassan owns a bike. We write Hassan's bike. The apostrophe and the s show belonging. Watch the bike become Hassan's.", T("An **apostrophe** can show that something belongs to someone.", "Hassan's bike. Mina's coat.")),
    EXPP("Hassan's bike",
      SS("Here is a bike. Whose is it? It belongs to Hassan.", S("The bike belongs to Hassan.", ["h", "🧒", 30, 55, 3, "grow", "Hassan"], ["b", "🚲", 70, 55, 3, "grow", "bike"])),
      SS("To show belonging, we add an apostrophe and an s to the owner's name. Hassan's bike.", S("Hassan's bike", ["h", "🧒", 30, 55, 3, "none", "Hassan's"], ["b", "🚲", 70, 55, 3, "pulse", "bike"]))),
    CHK(mc("Which shows the coat belongs to Mina?", "Mina's coat", ["Minas coat", "Minas' coat"], { hint: "Add an apostrophe and s to the owner.", why: "Mina's coat shows the coat belongs to Mina.", tag: "apostrophe.possession" })),
    H("Stop 4: Missing letters"),
    SAY("The apostrophe has a second job. It shows where letters are missing when we squash two words together. Do not becomes don't. The apostrophe sits where the letter o was. Can not becomes can't. We call these short forms contractions. Let's squash two words into one.", T("An apostrophe also shows where letters are missing.", "do not → don't, they did not → they didn't")),
    EXPP("Squashing words together",
      SS("Two words: do not.", S("do not", ["a", "🔵", 35, 50, 3, "grow", "do"], ["b", "🔵", 65, 50, 3, "grow", "not"])),
      SS("Squash them together. The o in not disappears, and the apostrophe marks the gap. Don't.", S("don't", ["a", "🔵", 50, 50, 3, "grow", "don't"], ["t", "✂️", 70, 25, 2, "none", "o is missing"]))),
    CHK(mc("Which is the short form of did not?", "didn't", ["did'nt", "didnt"], { hint: "The apostrophe goes where the letter is missing.", why: "Didn't has the apostrophe where the o is missing.", tag: "apostrophe.contraction" })),
    SAY("Let us remember. Speech marks wrap around the exact words spoken. The comma goes inside. A new speaker starts a new line.", SUM("Speech marks wrap around the exact spoken words", "The comma goes inside the speech marks", "An apostrophe shows belonging or missing letters")),
    GLOSS({ "speech marks": "Marks that go around the exact words someone says.", "spoken words": "The exact words a person says.", comma: "A mark that shows a small pause.", apostrophe: "A mark that shows belonging or missing letters.", contraction: "Two words squashed into one, like don't.", belonging: "When something is owned by someone." }),
  ],
  mini: [
    mc("Which is punctuated correctly?", "\"Let's go,\" said Aisha.", ["\"Let's go\" said Aisha.", "Let's go, said Aisha."], { hint: "Spoken words inside speech marks, comma inside.", why: "The spoken words and the comma sit inside the speech marks.", tag: "speech.punct" }),
    tf("A new speaker starts a new line.", true, { hint: "Think about how a conversation looks on a page.", why: "A new speaker starts a new line so the reader can follow.", tag: "speech.newline" }),
    mc("Which shows the book belongs to Sara?", "Sara's book", ["Saras book", "Saras' book"], { hint: "Apostrophe and s.", why: "Sara's book shows belonging.", tag: "apostrophe.possession" }),
    mc("Which words go inside the speech marks in: Ali asked, \"Can I help?\"", "Can I help?", ["Ali asked", "Ali asked, Can"], { hint: "Only the spoken words.", why: "Speech marks go around the exact words spoken.", tag: "speech.inside" }),
  ],
};

const pronouns = {
  id: "pronouns", kind: "play", title: "Pronouns and fronted adverbials",
  blocks: [
    H("Stop 1: Pronouns"),
    SAY("Imagine writing Fatima picked up Fatima's book and Fatima opened Fatima's book. That sounds very odd, doesn't it? Pronouns save us from repeating nouns. Fatima becomes she. The book becomes it. The children become they. Pronouns are small words, but they make our writing smooth.", T("A **pronoun** takes the place of a noun: she, he, it, they, we.", "Fatima picked up the book. She opened it.")),
    EXPP("Swapping nouns for pronouns",
      SS("Fatima picked up the book. Then Fatima opened the book. Fatima and the book are repeated.", S("Fatima picked up the book. Fatima opened the book.", ["f", "👧", 30, 55, 3, "grow", "Fatima"], ["b", "📖", 70, 55, 3, "grow", "the book"])),
      SS("Let's swap. Fatima becomes she. The book becomes it. Fatima picked up the book. She opened it. Much smoother!", S("Fatima picked up the book. She opened it.", ["f", "👧", 30, 55, 3, "none", "she"], ["b", "📖", 70, 55, 3, "none", "it"], ["s", "✨", 50, 20, 2, "float", "smoother"]))),
    CHK(mc("Which pronoun replaces the boys?", "they", ["it", "she"], { hint: "More than one person.", why: "The boys is more than one person, so we use they.", tag: "pronoun.swap" })),
    H("Stop 2: Fronted adverbials"),
    SAY("A fronted adverbial is a phrase at the start of a sentence. It tells us when, where or how something happens. Before bedtime, Zainab read a story. Under the old bridge, a troll lived. After the rain, the sun came out. And look: a comma always follows a fronted adverbial.", T("A **fronted adverbial** starts a sentence and tells us when, where or how.", "After lunch, we went to the park.", "A comma follows a fronted adverbial.")),
    EXPP("After lunch, we went to the park",
      SS("First, lunch. Everyone eats.", S("After lunch...", ["l", "🍽️", 25, 55, 3, "grow", "lunch"])),
      SS("Then we go to the park. After lunch, we went to the park. The words After lunch come first, so it is a fronted adverbial. Notice the comma after it.", S("After lunch, we went to the park.", ["l", "🍽️", 25, 55, 3, "none", "After lunch,"], ["a", "➡️", 50, 55, 2, "none", "then"], ["p", "🌳", 75, 55, 3, "grow", "we went to the park"]))),
    CHK(mc("Which is the fronted adverbial in: Before bedtime, Zainab read a story.?", "Before bedtime", ["Zainab", "read a story"], { hint: "Which phrase comes first and tells us when?", why: "Before bedtime starts the sentence and tells us when.", tag: "adverbial.find" })),
    H("Stop 3: Brain game"),
    SAY("Time for a memory game. Match up the pairs, and think about how pronouns replace nouns.", BRAIN("memory_match", "Pronoun pairs", "Find the matching pairs.", ["👧", "👦", "📖", "🐶", "🌳", "⭐"])),
    CHK(mc("Which pronoun replaces Fatima's brother?", "he", ["she", "they"], { hint: "One boy.", why: "One boy is he.", tag: "pronoun.swap" })),
    SAY("Let us remember. A pronoun takes the place of a noun. A fronted adverbial starts a sentence, and a comma follows it.", SUM("A pronoun takes the place of a noun", "A fronted adverbial starts a sentence and is followed by a comma")),
    GLOSS({ pronoun: "A word that takes the place of a noun, like she, it or they.", "fronted adverbial": "A phrase at the start of a sentence that tells us when, where or how.", adverbial: "A word or phrase that tells us more about a verb." }),
  ],
  mini: [
    mc("Which pronoun replaces the girls?", "they", ["she", "it"], { hint: "More than one person.", why: "The girls is more than one person, so we use they.", tag: "pronoun.swap" }),
    mc("Which is the fronted adverbial in: Under the bridge, a troll lived.?", "Under the bridge", ["a troll", "lived"], { hint: "It comes first and tells us where.", why: "Under the bridge starts the sentence and tells us where.", tag: "adverbial.find" }),
    tf("A comma follows a fronted adverbial.", true, { hint: "Think about After lunch, we ...", why: "A comma always follows a fronted adverbial.", tag: "adverbial.comma" }),
  ],
};

const tenses = {
  id: "tenses_agreement", kind: "use", title: "Connectives, tenses and agreement",
  blocks: [
    H("Stop 1: Connectives"),
    SAY("Connectives are joining words that link ideas. Although, however, because, so, meanwhile. They show how ideas are connected. I wanted to go outside, but it was raining. I stayed in because it was raining. Connectives help the reader follow your thinking.", T("A **connective** joins ideas: because, but, so, however, meanwhile.", "It was raining, so we stayed in.")),
    EXPP("Linking ideas",
      SS("Rain falls. We could not play outside.", S("It was raining.", ["r", "🌧️", 30, 40, 3, "grow", "It was raining"])),
      SS("The connective so links the cause and the result. It was raining, so we stayed in.", S("It was raining, so we stayed in.", ["r", "🌧️", 25, 40, 3, "none", "It was raining,"], ["c", "➡️", 50, 50, 2, "none", "so"], ["h", "🏠", 75, 50, 3, "grow", "we stayed in"]))),
    CHK(mc("Pick the best connective: I was tired ___ I went to bed early.", "so", ["although", "meanwhile"], { hint: "Tired is the cause. Going to bed is the result.", why: "So links a cause to its result.", tag: "connective.pick" })),
    H("Stop 2: Past and present"),
    SAY("Verbs change to show time. Present tense: she runs. Past tense: she ran. Many past tense verbs end in ed, like jumped. But some are irregular and change completely. Run becomes ran. Swim becomes swam. Write becomes wrote. We have to learn these.", T("**Tense** shows when something happens: past, present or future.", "Many past tense verbs add -ed. **Irregular** verbs change: run → ran.")),
    EXPP("Run and ran",
      SS("Right now, she runs. This is present tense.", S("She runs.", ["g", "🏃", 30, 55, 3, "bounce", "she runs"], ["t", "🕐", 80, 25, 2, "none", "now"])),
      SS("Yesterday, she ran. The whole word changes. It is an irregular verb.", S("Yesterday she ran.", ["g", "🏃", 60, 55, 3, "none", "she ran"], ["t", "🕐", 80, 25, 2, "none", "yesterday"]))),
    CHK(mc("Which is the past tense of swim?", "swam", ["swimmed", "swum"], { hint: "It is an irregular verb.", why: "Swim changes to swam in the past tense.", tag: "tense.irregular" })),
    H("Stop 3: Subject and verb agree"),
    SAY("The verb has to agree with who or what is doing it. One dog barks. Two dogs bark. The dog is barking. The dogs are barking. If the subject is one, use is. If it is more than one, use are. The dogs is barking sounds wrong, and now you know why.", T("The verb must **agree** with the subject.", "The dog is barking. The dogs are barking.")),
    EXPP("One dog, two dogs",
      SS("One dog. The dog is barking.", S("The dog is barking.", ["d", "🐕", 50, 55, 3, "grow", "The dog is barking"])),
      SS("Now two dogs. The dogs are barking. Plural subject, so are.", S("The dogs are barking.", ...ROW("d", "🐕", 2, 35, 65, 55, 3, "grow"), ["l", "🗣️", 50, 20, 2, "none", "are barking"]))),
    CHK(mc("Which sentence is correct?", "The birds are singing.", ["The birds is singing.", "The bird are singing."], { hint: "Does the verb match one or many?", why: "Birds is plural, so we use are.", tag: "agreement.pick" })),
    SAY("Let us remember. Connectives link ideas. Tense shows when. The verb must agree with the subject.", SUM("Connectives link ideas", "Irregular verbs change completely: run → ran", "The verb agrees with the subject: is or are")),
    GLOSS({ connective: "A word that links ideas, like because, so or however.", tense: "The form of a verb that shows when something happens.", irregular: "A verb that does not just add -ed in the past, like run to ran.", agree: "When the verb matches the subject, like the dogs are." }),
  ],
  mini: [
    mc("Pick the best connective: It was cold ___ I wore a jumper.", "so", ["although", "meanwhile"], { hint: "Cold is the cause.", why: "So links the cause to the result.", tag: "connective.pick" }),
    mc("Which is the past tense of write?", "wrote", ["writed", "written"], { hint: "It is an irregular verb.", why: "Write changes to wrote in the past.", tag: "tense.irregular" }),
    mc("Which sentence is correct?", "The children are playing.", ["The children is playing.", "The child are playing."], { hint: "Children is plural.", why: "Children is more than one, so we use are.", tag: "agreement.pick" }),
  ],
};

export const topics = [
  topicLesson({
    slug: "english-class-4-grammar-toolkit", subject: "english", cls: 4, topic: 1, title: "Grammar Toolkit",
    summary: "Similes, expanded noun phrases, speech marks, pronouns, fronted adverbials, apostrophes, connectives, tenses and agreement.",
    unit: "Topic 1: Grammar toolkit", difficulty: 2,
    objectives: ["Use similes and expanded noun phrases to paint pictures with words", "Punctuate speech correctly", "Use pronouns and fronted adverbials", "Use apostrophes for belonging and missing letters", "Choose connectives and the right tense", "Make verbs agree with their subject"],
    success_criteria: ["I can write a simile and an expanded noun phrase", "I can punctuate speech with speech marks", "I can use apostrophes correctly", "I can make my verbs agree with the subject"],
    real_life: "Writing stories, messages and school reports that readers enjoy.",
    standards: [
      { framework: "nc_england", code: "Y4 grammar", text: "Use fronted adverbials, expanded noun phrases, apostrophes and speech punctuation" },
      { framework: "cambridge", code: "4Rv.07" }, { framework: "cambridge", code: "4Wv.05" }, { framework: "cambridge", code: "4Rg.03" }, { framework: "cambridge", code: "4Rg.07" }, { framework: "cambridge", code: "4Wg.03" }, { framework: "cambridge", code: "4Wg.04" }, { framework: "cambridge", code: "4Wg.05" }, { framework: "cambridge", code: "4Wg.06" }, { framework: "cambridge", code: "4Wg.07" },
    ],
    warm_up: [
      mc("Which mark ends a question?", "?", [".", "!"], { hint: "It looks like a hook with a dot.", why: "A question ends with a question mark." }),
      tf("A noun is a naming word.", true, { hint: "Think of cat, school, Lahore.", why: "A noun names a person, place or thing." }),
      mc("Which word is a verb?", "run", ["red", "table"], { hint: "A verb is a doing word.", why: "Run is something you do." }),
    ],
    intro: [
      H("Welcome back, word detective!"),
      SAY("Welcome back, word detective! Today we have a big question. How do great writers make sentences that sound clear, smooth and exciting? The answer is a toolkit. Similes, speech marks, pronouns, apostrophes, connectives, and more. By the end, you will have every tool in your pocket. Let's go!", T("Today's big question: how do great writers make sentences clear, smooth and exciting?", "We will build a toolkit of grammar tools.")),
      IMG("🧰", "A grammar toolkit helps us write well."),
      GLOSS({ grammar: "The rules for how words fit together in sentences." }),
    ],
    subs: [similes, speech, pronouns, tenses],
    quiz: [
      Q(mc("Pick the sentence that contains a simile.", "The moon was like a silver coin.", ["The moon was bright.", "The moon is far away."], { hint: "Look for like or as.", why: "It compares the moon to a coin using like.", tag: "simile.find" }), "similes", "recall", [
        mc("Spot the simile: which sentence has one?", "The wind howled as loudly as a wolf.", ["The wind howled all night.", "The wind was very cold."], { hint: "Look for as ... as or like.", why: "It compares the wind to a wolf using as ... as.", tag: "simile.find" }),
        mc("Which of these sentences is a simile?", "The grass felt like a green carpet.", ["The grass was long.", "The grass grew quickly."], { hint: "Look for like or as.", why: "It compares grass with a carpet using like.", tag: "simile.find" })]),
      Q(tf("A simile compares two things without using the words like or as.", false, { hint: "What two words do similes use?", why: "Similes use like or as.", tag: "simile.def" }), "similes", "recall", [
        tf("In as quick as a cheetah, the word as shows it is a simile.", true, { hint: "Similes use like or as.", why: "As ... as is one way to make a simile.", tag: "simile.def" }),
        tf("A simile always uses the word because.", false, { hint: "Which two words?", why: "A simile uses like or as, not because.", tag: "simile.def" })]),
      Q(fill("Complete: the tall, silver tower.", "Tall and silver are {b1}. Tower is the {b2}.", [["describing words", "verbs", "pronouns"], ["noun", "adverb", "verb"]], { hint: "Which words describe? Which is the naming word?", why: "Tall and silver describe the noun tower.", tag: "nounphrase.parts" }), "similes", "apply", [
        fill("Complete: the shy, brown rabbit.", "Shy and brown are {b1}. Rabbit is the {b2}.", [["describing words", "verbs", "pronouns"], ["noun", "adverb", "verb"]], { hint: "Which words describe? Which is the naming word?", why: "Shy and brown describe the noun rabbit.", tag: "nounphrase.parts" }),
        fill("Complete: a crumbly chocolate biscuit.", "Crumbly and chocolate are {b1}. Biscuit is the {b2}.", [["describing words", "verbs", "pronouns"], ["noun", "adverb", "verb"]], { hint: "Which words describe? Which is the naming word?", why: "Crumbly and chocolate describe the noun biscuit.", tag: "nounphrase.parts" })]),
      Q(ms("Which are expanded noun phrases? Pick two.", ["the grumpy old dragon", "a bright red balloon"], ["ran quickly home", "she laughed loudly"], { hint: "A noun with describing words added.", why: "The grumpy old dragon and a bright red balloon are nouns with describing words.", tag: "nounphrase.find" }), "similes", "apply", [
        ms("Pick the two expanded noun phrases.", ["the tiny, blue boat", "a warm, fluffy blanket"], ["jumped over it", "he spoke softly"], { hint: "A noun with describing words added.", why: "The tiny, blue boat and a warm, fluffy blanket are nouns with describing words.", tag: "nounphrase.find" }),
        ms("Choose two expanded noun phrases.", ["a sparkling mountain stream", "the ancient stone bridge"], ["was running fast", "they sang happily"], { hint: "A noun with describing words added.", why: "A sparkling mountain stream and the ancient stone bridge are nouns with describing words.", tag: "nounphrase.find" })]),
      Q(mc("Which sentence has its speech punctuated correctly?", "\"Come here,\" said Mum.", ["\"Come here\" said Mum.", "Come here, said Mum."], { hint: "Speech marks around spoken words, comma inside.", why: "The spoken words and comma are inside the speech marks.", tag: "speech.punct" }), "speech", "apply", [
        mc("Pick the sentence with correct speech punctuation.", "\"I am hungry,\" said Hamza.", ["\"I am hungry\" said Hamza.", "I am hungry, said Hamza."], { hint: "Speech marks around spoken words, comma inside.", why: "The spoken words and comma are inside the speech marks.", tag: "speech.punct" }),
        mc("Which version shows speech correctly?", "\"Wait for me,\" called Ayesha.", ["\"Wait for me\" called Ayesha.", "Wait for me, called Ayesha."], { hint: "Speech marks around spoken words, comma inside.", why: "The spoken words and comma are inside the speech marks.", tag: "speech.punct" })]),
      Q(ord("Put the words in order to make a sentence with speech.", ["\"I", "love", "this", "book,\"", "said", "Amna."], { hint: "Start with the spoken words.", why: "\"I love this book,\" said Amna.", tag: "speech.order" }), "speech", "apply", [
        ord("Arrange the words into a sentence with speech.", ["\"Let's", "play", "outside,\"", "said", "Bilal."], { hint: "Start with the spoken words.", why: "\"Let's play outside,\" said Bilal.", tag: "speech.order" }),
        ord("Sort the words to make a sentence with speech.", ["\"Please", "pass", "the", "salt,\"", "said", "Dad."], { hint: "Start with the spoken words.", why: "\"Please pass the salt,\" said Dad.", tag: "speech.order" })]),
      Q(mc("Why does the comma go inside the speech marks in \"Come here,\" said Mum?", "It marks the end of the spoken words", ["It shows a question", "It shows who is speaking"], { hint: "What does the comma do for the spoken words?", why: "The comma sits inside the speech marks to mark the end of the spoken words.", tag: "speech.reason" }), "speech", "reason", [
        mc("Why do speech marks go around \"Look out!\" in \"Look out!\" shouted Dad?", "They show the exact words spoken", ["They show who is speaking", "They show a question"], { hint: "What is inside the marks?", why: "Speech marks wrap around the exact words spoken.", tag: "speech.reason" }),
        mc("Why does a new speaker start a new line?", "It helps the reader follow who is talking", ["It uses more paper", "It makes the words longer"], { hint: "Think about reading a conversation.", why: "A new line shows a new speaker and helps the reader follow.", tag: "speech.reason" })]),
      Q(mat("Match each noun to its pronoun.", [["Fatima", "she"], ["the boys", "they"], ["the book", "it"]], { hint: "One girl, more than one, one thing.", why: "Fatima is she, the boys are they, the book is it.", tag: "pronoun.swap" }), "pronouns", "recall", [
        mat("Which pronoun goes with each noun?", [["Hamza", "he"], ["the girls", "they"], ["the bike", "it"]], { hint: "One boy, more than one, one thing.", why: "Hamza is he, the girls are they, the bike is it.", tag: "pronoun.swap" }),
        mat("Pair each noun with its pronoun.", [["Zainab", "she"], ["the cats", "they"], ["the ball", "it"]], { hint: "One girl, more than one, one thing.", why: "Zainab is she, the cats are they, the ball is it.", tag: "pronoun.swap" })]),
      Q(hot("Tap what happened first: Before bedtime, Zainab read a story.", [["📖", "Reading", 22, 50], ["🛏️", "Bedtime", 50, 50], ["🍎", "Snack", 78, 50]], ["Reading"], { labels: true, hint: "Before bedtime means earlier than bedtime.", why: "Before bedtime, so she read first and then went to bed.", tag: "adverbial.meaning" }), "pronouns", "apply", [
        hot("Tap what happened first: After lunch, we went to the park.", [["🍽️", "Lunch", 22, 50], ["🌳", "The park", 50, 50], ["🏫", "School", 78, 50]], ["Lunch"], { labels: true, hint: "After lunch means lunch came first.", why: "After lunch, so lunch happened first.", tag: "adverbial.meaning" }),
        hot("Tap what happened last: Before the match, the team practised.", [["⚽", "The match", 22, 50], ["🏃", "Practice", 50, 50], ["🏆", "Trophy", 78, 50]], ["The match"], { labels: true, hint: "Before the match means practice came earlier.", why: "Practice came before the match, so the match came last.", tag: "adverbial.meaning" })]),
      Q(sld("Slide to show how many pronouns there are: She gave him her book.", { min: 0, max: 6 }, 3, 0, { hint: "Find words that take the place of nouns.", why: "She, him and her are all pronouns.", tag: "pronoun.count" }), "pronouns", "apply", [
        sld("Slide to show how many pronouns there are: They showed us the way.", { min: 0, max: 6 }, 2, 0, { hint: "Find words that take the place of nouns.", why: "They and us are pronouns.", tag: "pronoun.count" }),
        sld("Slide to show how many pronouns there are: I gave it to her.", { min: 0, max: 6 }, 3, 0, { hint: "Find words that take the place of nouns.", why: "I, it and her are pronouns.", tag: "pronoun.count" })]),
      Q(mc("Why do writers use pronouns like she and it?", "To avoid repeating the same noun", ["To make sentences longer", "To show a question"], { hint: "Think about Fatima picked up Fatima's book.", why: "Pronouns stop us repeating the same noun again and again.", tag: "pronoun.reason" }), "pronouns", "reason", [
        mc("Why does a comma follow After lunch in After lunch, we went home?", "It marks the end of the fronted adverbial", ["It shows a question", "It shows speech"], { hint: "What comes after the comma?", why: "A comma follows a fronted adverbial.", tag: "adverbial.reason" }),
        mc("Why is Under the bridge, a troll lived a good opening?", "It tells the reader where it happens", ["It tells the reader what a troll eats", "It shows a question"], { hint: "What does Under the bridge tell us?", why: "A fronted adverbial like this tells us where.", tag: "adverbial.reason" })]),
      Q(mc("Why does Hassan's bike need an apostrophe?", "It shows the bike belongs to Hassan", ["It shows letters are missing", "It makes the word plural"], { hint: "Who owns the bike?", why: "The apostrophe and s show belonging.", tag: "apostrophe.reason" }), "speech", "reason", [
        mc("Why does don't need an apostrophe?", "It shows a letter is missing", ["It shows belonging", "It makes the word plural"], { hint: "Which letter is missing?", why: "The apostrophe sits where the o is missing.", tag: "apostrophe.reason" }),
        mc("Why does Mina's coat need an apostrophe?", "It shows the coat belongs to Mina", ["It shows a letter is missing", "It makes the word plural"], { hint: "Who owns the coat?", why: "The apostrophe and s show belonging.", tag: "apostrophe.reason" })]),
      Q(fill("Choose the correct words.", "They {b1} come today. The {b2} bag is blue.", [["didn't", "did'nt", "didnt"], ["girl's", "girls", "girls'"]], { hint: "One shows missing letters, one shows belonging.", why: "Didn't has a missing o. Girl's shows the bag belongs to the girl.", tag: "apostrophe.mix" }), "speech", "apply", [
        fill("Pick the right words.", "We {b1} like peas. The {b2} hat is red.", [["don't", "do'nt", "dont"], ["boy's", "boys", "boys'"]], { hint: "One shows missing letters, one shows belonging.", why: "Don't has a missing o. Boy's shows the hat belongs to the boy.", tag: "apostrophe.mix" }),
        fill("Complete the sentences.", "She {b1} swim. The {b2} paw is sore.", [["can't", "cant", "ca'nt"], ["dog's", "dogs", "dogs'"]], { hint: "One shows missing letters, one shows belonging.", why: "Can't has missing letters. Dog's shows the paw belongs to the dog.", tag: "apostrophe.mix" })]),
      Q(st("Write the past tense of run.", ["ran"], { hint: "It is an irregular verb.", why: "Run changes to ran in the past.", tag: "tense.irregular" }), "tenses_agreement", "recall", [
        st("Write the past tense of swim.", ["swam"], { hint: "It is an irregular verb.", why: "Swim changes to swam in the past.", tag: "tense.irregular" }),
        st("Write the past tense of write.", ["wrote"], { hint: "It is an irregular verb.", why: "Write changes to wrote in the past.", tag: "tense.irregular" })]),
      Q(mc("Why is The dogs are barking correct and The dogs is barking wrong?", "Dogs is plural, so it needs are", ["Dogs is singular, so it needs is", "Barking is a noun"], { hint: "Is it one dog or more?", why: "Plural subjects need are.", tag: "agreement.reason" }), "tenses_agreement", "reason", [
        mc("Why is The bird is singing correct and The bird are singing wrong?", "Bird is singular, so it needs is", ["Bird is plural, so it needs are", "Singing is a noun"], { hint: "Is it one bird or more?", why: "Singular subjects need is.", tag: "agreement.reason" }),
        mc("Why is The children are playing correct and The children is playing wrong?", "Children is plural, so it needs are", ["Children is singular, so it needs is", "Playing is a noun"], { hint: "Is it one child or more?", why: "Children is more than one, so it needs are.", tag: "agreement.reason" })]),
    ],
  }),
];
