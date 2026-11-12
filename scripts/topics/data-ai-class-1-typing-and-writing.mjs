import { SAY, SS, H, T, PHOTO, ACT, MAN, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Computer Science, Data & AI, Class 1 (Sam, age 7), topic 6: Typing and writing on a computer.
// Story thread: Sam types a get-well note for Nani and makes a poster.
const NOTE = "data-ai-class-1-typing-and-writing-1-7d92ab0b.jpg";
const PENS = "data-ai-class-1-typing-and-writing-2-65d2f512.jpg";
const OKM = (label) => ["ok", "✅", 50, 88, 2, "bounce", label];
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });

// ---------------------------------------------------------------------------------------------- 1. learn
const keys = {
  id: "keys", kind: "learn", title: "Know your keyboard",
  blocks: [
    H("Welcome back, young writer!"),
    SAY("Today we write with a computer. Sam wants to type a note for his Nani.",
      T("Today's big question: how do we write on a computer?")),
    SAY("Here is a notebook and a pen. Writing by hand is one way to write.",
      PHOTO(NOTE, "An open lined notebook with a pen and two pencils on a wooden desk", "Writing on paper. A keyboard is another way to write.", "Photo by Clay Banks on Unsplash")),
    H("Stop 1: Keys have an order"),
    SAY("A keyboard has lots of keys. Letters, numbers and special keys. We use it to type words.",
      T("A **keyboard** has letter keys, number keys and special keys.")),
    EXP("A keyboard",
      SS("The letter keys are in the middle. They spell words.", S("Letter keys.", ["l", "🔤", 50, 50, 3, "pulse", "letters"])),
      SS("The number keys are along the top. They type 1, 2, 3.", S("Number keys.", ["n", "🔢", 50, 50, 3, "pulse", "numbers"])),
      SS("A keyboard is an input. We tell the computer things with it.", S("Keyboard: input.", ["k", "⌨️", 30, 50, 3, "bounce"], ["c", "💻", 70, 50, 3, "pulse"]))),
    CHK(mc("What is a keyboard used for?", "Typing letters, numbers and words", ["Making toast", "Playing football"], { hint: "We type on it.", why: "A keyboard lets us type letters, numbers and words.", tag: "typing.keyboard" })),
    H("Stop 2: Space, enter and delete"),
    SAY("The space bar makes a gap between words. The enter key starts a new line.",
      T("The **space bar** makes a gap. The **enter key** starts a new line.")),
    SAY("The delete key removes a letter. Use it to fix a mistake.",
      T("The **delete key** removes a letter.")),
    EXP("Three special keys",
      SS("Sam presses the space bar. A gap appears between two words.", S("Space bar.", ["s", "␣", 50, 50, 3, "pulse", "space"])),
      SS("He presses enter. The cursor jumps to a new line.", S("Enter key.", ["e", "⏎", 50, 50, 3, "bounce", "enter"])),
      SS("He types a wrong letter. He presses delete and it goes away.", S("Delete key.", ["d", "⌫", 50, 50, 3, "pulse", "delete"], OKM("fixed")))),
    CHK(mc("Which key removes a letter?", "Delete", ["Space bar", "Enter"], { hint: "It deletes.", why: "The delete key removes a letter.", tag: "typing.delete" })),
    SAY("Let us remember. A keyboard is an input. Space makes gaps. Delete fixes mistakes.",
      SUM("A keyboard is an input", "Space makes a gap, enter starts a new line", "Delete removes a letter")),
    GLOSS({ keyboard: "A set of keys we use to type.", "space bar": "The long key that makes a gap.", "enter key": "The key that starts a new line.", "delete key": "The key that removes a letter.", typing: "Pressing keys to write words.", key: "A button on a keyboard." }),
  ],
  mini: [
    mc("Which key makes a gap between words?", "Space bar", ["Delete", "Shift"], { hint: "It is the long key.", why: "The space bar makes a gap." }),
    tf("A keyboard is an input.", true, { hint: "We tell the computer with it.", why: "We put information in with a keyboard." }),
    mc("Which key starts a new line?", "Enter", ["Space bar", "Delete"], { hint: "It sounds like going in.", why: "Enter starts a new line." }),
    mc("What do we call pressing keys to write?", "Typing", ["Painting", "Baking"], { hint: "We press keys.", why: "Typing means pressing keys to write." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const type = {
  id: "type", kind: "try", title: "Type your name and a sentence",
  blocks: [
    H("Stop 1: Type and fix"),
    SAY("Sam types his name. He looks for each letter key. Then he checks it on the screen.",
      T("Find each key, type the letter and **check** the screen.")),
    EXP("Sam types his name",
      SS("Sam finds the letter S and presses it.", S("Type S.", ["s", "🔤", 30, 50, 3, "pulse", "S"], ["t", "💻", 70, 50, 3])),
      SS("He types a, then m. The word Sam appears.", S("Type am.", ["w", "💻", 50, 50, 3, "bounce", "Sam"])),
      SS("Oh no, he typed Smm. He presses delete and types a.", S("Fix it.", ["d", "⌫", 30, 50, 3, "bounce", "delete"], ["w", "💻", 70, 50, 3, "pulse", "Sam"]))),
    CHK(ord("Put the steps for typing a name in order.", ["Find the first letter key", "Press each key", "Check the screen"], { hint: "Find the key first.", why: "Find, press, then check.", tag: "typing.name_order" })),
    H("Stop 2: Capital letters with shift"),
    SAY("A sentence starts with a capital letter. Hold shift and press a letter. The shift key makes a capital.",
      T("Hold the **shift key** and press a letter. It makes a **capital** letter.")),
    EXP("Shift makes a capital",
      SS("Sam types i. It is a small letter.", S("A small letter.", ["a", "🔡", 50, 50, 3, "none", "i"])),
      SS("He holds shift and presses i. Now it is I.", S("Shift + i.", ["h", "⇧", 30, 50, 3, "bounce", "shift"], ["c", "🔠", 70, 50, 3, "pulse", "I"])),
      SS("He ends with a full stop. Now it is a sentence.", S("A full sentence.", ["f", "💻", 50, 50, 3, "pulse", "I like mangoes."]))),
    SAY("Now you try. Ask a grown-up to open a writing program.",
      ACT("Type a sentence", ["A computer or tablet with a keyboard", "A grown-up"], ["Type your name. Fix any mistake with delete.", "Type I like and a food. Use shift for the capital I.", "End with a full stop."])),
    CHK(tf("A sentence starts with a capital letter.", true, { hint: "Think about the first letter.", why: "A sentence starts with a capital letter.", tag: "typing.capital" })),
    SAY("Let us remember. Check what you type. Shift makes capitals. Delete fixes mistakes.",
      SUM("Check the screen after you type", "Shift makes a capital letter", "Delete fixes a mistake")),
    GLOSS({ check: "Look again to make sure it is right.", "shift key": "A key that makes capital letters.", capital: "A big letter, like A or S.", "full stop": "A dot that ends a sentence.", cursor: "The blinking line that shows where you type." }),
  ],
  mini: [
    mc("Which key helps make a capital letter?", "Shift", ["Space bar", "Delete"], { hint: "Hold it down.", why: "Hold shift to make a capital." }),
    tf("We can fix a typing mistake with delete.", true, { hint: "Think about the delete key.", why: "Delete removes a wrong letter." }),
    mc("What ends a sentence?", "A full stop", ["A space bar", "A capital"], { hint: "A little dot.", why: "A full stop ends a sentence." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const hunt = {
  id: "hunt", kind: "play", title: "Key hunt race",
  blocks: [
    H("Stop 1: Find the key"),
    SAY("It is a race. Find the key that does each job. Look carefully at the keyboard.",
      T("Each key has a **job**. Find the right key fast.")),
    EXP("Key hunt",
      SS("Find the key for a gap. It is the long one at the bottom.", S("Space bar.", ["s", "␣", 50, 50, 3, "pulse", "space"])),
      SS("Find the key for a capital letter. It says shift.", S("Shift.", ["h", "⇧", 50, 50, 3, "pulse", "shift"])),
      SS("Find the keys that type numbers. They are in a row.", S("Number keys.", ["n", "🔢", 50, 50, 3, "pulse", "numbers"]))),
    CHK(mc("Which key makes a new line?", "Enter", ["Shift", "Delete"], { hint: "It starts a new line.", why: "The enter key starts a new line.", tag: "typing.enter" })),
    H("Stop 2: Brain game"),
    SAY("First a memory game. Then type the word in your head.",
      T("Play the memory game. Then think about the **word**.")),
    BRAIN("memory_match", "Key pairs", "Find the pairs.", ["⌨️", "🔤", "🔢", "⏎"]),
    CHK(mat("Match each key to what it does.", [["Space bar", "Makes a gap"], ["Delete", "Removes a letter"], ["Shift", "Makes a capital"]], { hint: "Think about each job.", why: "Each key has its own job.", tag: "typing.key_jobs" })),
    SAY("Let us remember. Know your keys and you type faster.",
      SUM("Each key has a job", "Letters, numbers and special keys", "Practice makes typing quicker")),
    GLOSS({ job: "What something is for.", word: "Letters that mean something.", race: "A game to see who is fastest.", practice: "Doing something again and again to get better." }),
  ],
  mini: [
    mc("Which keys type 1, 2 and 3?", "Number keys", ["Letter keys", "Delete key"], { hint: "They are numbers.", why: "Number keys type digits." }),
    tf("Practice helps us type faster.", true, { hint: "Think about getting better.", why: "Practice makes us quicker." }),
    mc("Which key is the long one at the bottom?", "Space bar", ["Enter", "Shift"], { hint: "It makes a gap.", why: "The space bar is the long key." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const poster = {
  id: "poster", kind: "use", title: "Make a poster",
  blocks: [
    H("Stop 1: Bigger text for titles"),
    SAY("Sam makes a get-well poster for Nani. A poster needs a title.",
      T("Make a title **bigger** so it stands out.")),
    SAY("He picks the title and makes the text bigger and bold.",
      PHOTO(PENS, "A pot of bright felt tip pens with different coloured caps", "Bright pens. A poster uses colours that stand out.", "Photo by Alexander von Schulz on Unsplash")),
    SAY("A bigger title tells us what the poster is about. Small words are for the details.",
      T("Titles are big. Details are smaller.")),
    SAY("Sam plans the poster on paper first. He writes the title and two lines.",
      ACT("Plan a poster", ["Paper and a pencil", "A grown-up"], ["Write a title for a poster, like Get Well Soon.", "Write two short lines under the title.", "Decide which words will be big."])),
    CHK(ord("Put the poster steps in order.", ["Plan the title and lines", "Type the words", "Make the title big"], { hint: "Plan first.", why: "Plan, type, then format.", tag: "typing.poster_order" })),
    H("Stop 2: Pick colours that are easy to read"),
    SAY("Sam picks dark blue words on a light page. They are easy to read. Pink on pink would be hard.",
      T("Pick colours that are easy to **read** together.")),
    EXP("Easy or hard to read",
      SS("Dark blue words on a yellow page. They stand out.", S("Easy to read.", ["g", "🟦", 30, 50, 3, "pulse", "dark on light"], ["y", "🟨", 70, 50, 3])),
      SS("Pink words on a pink page. They are hard to see.", S("Hard to read.", ["p", "🟪", 30, 50, 3, "none", "pink on pink"], ["q", "❓", 70, 50, 3, "pulse"])),
      SS("Sam picks the easy colours. Nani can read it from her bed.", S("Good choice.", ["s", "📄", 50, 50, 3, "bounce", "easy to read"], OKM("easy to read")))),
    SAY("Sam saves the poster and shows his teacher. He asks for kind feedback.",
      T("Save your work. Share it politely.")),
    CHK(mc("Which words are easiest to read?", "Dark words on a light page", ["Pink words on pink", "Pale grey on white"], { hint: "They must look different.", why: "Strong colour differences are easy to read.", tag: "typing.readable" })),
    SAY("Let us remember. Big titles, clear colours and kind sharing make a good poster.",
      SUM("A bigger title stands out", "Choose colours that are easy to read", "Save and share your work kindly")),
    GLOSS({ bigger: "Larger in size.", read: "To look at words and understand them.", poster: "A big picture and words to show a message.", title: "The big name at the top.", format: "To change how text looks.", bold: "Thick, strong letters." }),
  ],
  mini: [
    mc("Which is bigger on a poster?", "The title", ["The small details", "The full stop"], { hint: "It should stand out.", why: "A title is big to catch the eye." }),
    tf("Pink words on a pink page are easy to read.", false, { hint: "Do they stand out?", why: "They look too alike." }),
    mc("What should you do with finished work?", "Save it", ["Lose it", "Hide it"], { hint: "Keep it for later.", why: "Saving lets you open it again." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Sam writes to Nani", backdrop: "home", caption: "Sam types a get-well note, fixes a typo and makes a poster.",
  scenes: [
    { caption: "A note for Nani.", say: "Sam's Nani is not well. He wants to write her a note.",
      items: [{ id: "s", emoji: "👦", label: "Sam", x: 25, y: 56, size: 3, enter: "walk_right" }, { id: "n", emoji: "👵", label: "Nani", x: 78, y: 52, size: 3 }] },
    { caption: "Find the keys.", say: "He looks for the letter keys on the keyboard.",
      items: [{ id: "k", emoji: "⌨️", x: 50, y: 52, size: 3, enter: "grow" }] },
    { caption: "Start with a capital.", say: "He holds shift and types a capital G for Get.",
      items: [{ id: "h", emoji: "⇧", label: "shift", x: 32, y: 50, size: 3, anim: "bounce" }, { id: "g", emoji: "🔠", label: "G", x: 68, y: 50, size: 3, effect: "sparkle" }] },
    { caption: "A typo!", say: "Oops, he types a wrong letter.",
      items: [{ id: "w", emoji: "💻", label: "Gat", x: 50, y: 50, size: 3, anim: "pulse" }, { id: "q", emoji: "😮", x: 80, y: 30, size: 2 }] },
    { caption: "Delete.", say: "He presses delete and types the right letter.",
      items: [{ id: "d", emoji: "⌫", label: "delete", x: 30, y: 50, size: 3, anim: "bounce" }, { id: "w", emoji: "💻", label: "Get", x: 70, y: 50, size: 3, effect: "glow" }] },
    { caption: "A big title.", say: "He makes the title big and bold.",
      items: [{ id: "t", emoji: "📄", label: "GET WELL", x: 50, y: 48, size: 3, enter: "grow" }] },
    { caption: "Easy colours.", say: "Dark blue words on yellow are easy to read.",
      items: [{ id: "b", emoji: "🟦", x: 30, y: 50, size: 3 }, { id: "y", emoji: "🟨", x: 70, y: 50, size: 3, effect: "glow" }] },
    { caption: "Send love.", say: "Sam saves it and sends it with Mum's help.",
      items: [{ id: "s", emoji: "👦", x: 28, y: 56, size: 3, anim: "bounce" }, { id: "h", emoji: "❤️", x: 72, y: 40, size: 3, effect: "hearts" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- keys (q1-q8)
  Q(mc("What is a keyboard for?", "Typing letters, numbers and words", ["Making toast", "Playing football"], { hint: "We press its keys.", why: "A keyboard is for typing.", tag: "typing.keyboard" }), "keys", "recall",
    [mc("What do we use a keyboard to do?", "Type words into a computer", ["Cook rice", "Ride a bike"], { hint: "We press its keys.", why: "A keyboard lets us type words.", tag: "typing.keyboard" })]),
  Q(tf("A keyboard is an input device.", true, { hint: "We tell the computer with it.", why: "A keyboard puts information into a computer.", tag: "typing.input" }), "keys", "recall",
    [tf("A keyboard gives us sound out of the computer.", false, { hint: "Which way does information go?", why: "A keyboard is an input. A speaker gives sound.", tag: "typing.input" })]),
  Q(mc("What is a word processor?", "A program for writing and changing text", ["A kind of food mixer", "A paint bucket"], { hint: "We write words in it.", why: "A word processor is a program for writing text.", tag: "typing.wordprocessor" }), "keys", "recall",
    [mc("Which program would you use to type a note?", "A word processor", ["A drawing tool", "A music player"], { hint: "We write words in it.", why: "A word processor is for writing text.", tag: "typing.wordprocessor" })]),
  Q(hot("Tap the space bar.", [["␣", "Space bar", 22, 50], ["🔤", "Letter keys", 50, 50], ["🔢", "Number keys", 78, 50]], ["Space bar"], { labels: true, hint: "It is the long key.", why: "The space bar is the long key at the bottom.", tag: "typing.spacebar" }), "keys", "recall",
    [hot("Tap the enter key.", [["␣", "Space bar", 22, 50], ["⏎", "Enter", 50, 50], ["⌫", "Delete", 78, 50]], ["Enter"], { labels: true, hint: "It starts a new line.", why: "The enter key starts a new line.", tag: "typing.enter" })]),
  Q(mat("Match each key to its job.", [["Space bar", "Makes a gap between words"], ["Delete", "Removes a letter"], ["Shift", "Makes a capital letter"]], { hint: "Think about each key.", why: "Each key has its own job.", tag: "typing.key_jobs" }), "keys", "apply",
    [mat("Join each key to what it does.", [["Enter", "Starts a new line"], ["Number keys", "Type digits"], ["Letter keys", "Type letters"]], { hint: "Think about each key.", why: "Each key has its own job.", tag: "typing.key_jobs" })]),
  Q(mc("Omar says a keyboard has only letters on it. Is he right?", "No. It also has numbers and special keys", ["Yes, only letters", "Yes, only numbers"], { hint: "Look at the top row.", why: "A keyboard has letters, numbers and special keys.", tag: "typing.reason_letters" }), "keys", "reason",
    [mc("Mina says a keyboard has no number keys. Is she right?", "No. A keyboard has a row of number keys", ["Yes, no numbers", "Yes, only on phones"], { hint: "Look at the top row.", why: "Keyboards have number keys.", tag: "typing.reason_letters" })]),
  Q(mc("Aisha says the space bar is not needed. Is she right?", "No. Without it, words would run together", ["Yes, it does nothing", "Yes, enter does the same job"], { hint: "Think about gaps between words.", why: "Without spaces, wordswouldruntogether.", tag: "typing.reason_space" }), "keys", "reason",
    [mc("Ben says we can skip the space bar. Is he right?", "No. Spaces make words easy to read", ["Yes, spaces are not needed", "Yes, only for numbers"], { hint: "Think about gaps between words.", why: "Gaps between words make them clear.", tag: "typing.reason_space" })]),
  Q(fill("Finish the sentence about gaps.", "The {b1} key makes a gap between {b2}.", [["space bar", "shift", "delete"], ["words", "pencils", "clouds"]], { hint: "Think about the long key.", why: "The space bar makes a gap between words.", tag: "typing.space_fill" }), "keys", "apply",
    [fill("Complete the sentence about mistakes.", "The {b1} key removes a letter, so we use it to fix a {b2}.", [["delete", "space", "enter"], ["mistake", "banana", "cloud"]], { hint: "Think about fixing.", why: "Delete removes a letter and fixes a mistake.", tag: "typing.space_fill" })]),
  // ----- type (q9-q16)
  Q(ord("Put the steps for typing your name in order.", ["Click where you want to type", "Press the letter keys", "Check your spelling"], { hint: "Click first.", why: "Click, type, then check.", tag: "typing.name_steps" }), "type", "apply",
    [ord("Put these steps for typing a sentence in order.", ["Start with a capital letter", "Type the words with spaces", "End with a full stop"], { hint: "Capital first.", why: "Capital, words, then full stop.", tag: "typing.name_steps" })]),
  Q(mc("Zainab says the delete key removes the whole page. Is she right?", "No. It removes one letter at a time", ["Yes, the whole page", "Yes, the whole computer"], { hint: "Think about fixing one letter.", why: "Delete removes a letter.", tag: "typing.reason_delete" }), "type", "reason",
    [mc("Hana says delete wipes everything you typed. Is she right?", "No. It removes just the letter before the cursor", ["Yes, everything", "Yes, the screen too"], { hint: "Think about fixing one letter.", why: "Delete removes one letter at a time.", tag: "typing.reason_delete" })]),
  Q(mc("Sam types 'We go school'. Which word is missing?", "to", ["blue", "jump"], { hint: "We go ___ school.", why: "We go to school.", tag: "typing.missing_word" }), "type", "apply",
    [mc("Layla types 'I have cat'. Which word is missing?", "a", ["blue", "run"], { hint: "I have ___ cat.", why: "I have a cat.", tag: "typing.missing_word" })]),
  Q(tf("Every sentence begins with a capital letter.", true, { hint: "Think about the first letter.", why: "Sentences start with a capital letter.", tag: "typing.capital" }), "type", "recall",
    [tf("We put a capital letter after every comma.", false, { hint: "Think about when we use capitals.", why: "A capital starts a sentence. Commas do not need capitals.", tag: "typing.capital" })]),
  Q(num("Zainab types her name. Z, a, i, n, a, b. How many letters is that?", 6, { hint: "Count each letter.", why: "Z a i n a b is 6 letters.", tag: "typing.count_letters" }), "type", "apply",
    [num("Sam types the name Layla. How many letters is that?", 5, { hint: "Count each letter.", why: "L a y l a is 5 letters.", tag: "typing.count_letters" })]),
  Q(sld("The sentence is The cat sat on the mat. Slide to show how many words.", { min: 0, max: 10 }, 6, 0, { hint: "Count each word.", why: "The, cat, sat, on, the, mat is 6 words.", tag: "typing.count_words" }), "type", "apply",
    [sld("The sentence is I like mangoes. Slide to show how many words.", { min: 0, max: 10 }, 3, 0, { hint: "Count each word.", why: "I, like, mangoes is 3 words.", tag: "typing.count_words" })]),
  Q(mc("Omar says you cannot fix a typing mistake. Is he right?", "No. You can use the delete key and type again", ["Yes, never", "Yes, you must start again"], { hint: "Think about the delete key.", why: "Delete fixes mistakes.", tag: "typing.reason_fix" }), "type", "reason",
    [mc("Sana says a typo means you must start the whole note again. Is she right?", "No. Delete and fix just the typo", ["Yes, start again", "Yes, the note is ruined"], { hint: "Think about the delete key.", why: "You can fix one typo.", tag: "typing.reason_fix" })]),
  Q(ms("Which two ways fix a typing mistake? Pick two.", ["Press delete", "Type the right letter again"], ["Close the laptop", "Eat a sandwich"], { hint: "Use the keyboard.", why: "Delete and retyping fix mistakes.", tag: "typing.fix_ways" }), "type", "apply",
    [ms("Which two help you fix a wrong word? Pick two.", ["Delete the wrong letters", "Type the right word"], ["Shout at the screen", "Turn off the lights"], { hint: "Use the keyboard.", why: "Delete and retyping fix wrong words.", tag: "typing.fix_ways" })]),
  // ----- hunt (q17-q23)
  Q(mat("Match each key to its action.", [["Shift and a letter", "Makes a capital"], ["Enter", "Starts a new line"], ["Number keys", "Type 1, 2, 3"]], { hint: "Think about each key.", why: "Each key has its own job.", tag: "typing.key_jobs2" }), "hunt", "apply",
    [mat("Pair each key with its job.", [["Delete", "Removes a letter"], ["Space bar", "Makes a gap"], ["Letter keys", "Type words"]], { hint: "Think about each key.", why: "Each key has its own job.", tag: "typing.key_jobs2" })]),
  Q(ms("Which two can you use to write a note? Pick two.", ["A keyboard", "A pencil"], ["A spoon", "A shoe"], { hint: "Both put words on a page.", why: "A keyboard and a pencil both write words.", tag: "typing.write_tools" }), "hunt", "recall",
    [ms("Which two help you write a message? Pick two.", ["A pen", "A tablet keyboard"], ["A pillow", "A bucket"], { hint: "Both put words on a page.", why: "A pen and a keyboard both write words.", tag: "typing.write_tools" })]),
  Q(mc("Which key makes a capital letter when you hold it?", "Shift", ["Enter", "Delete"], { hint: "Hold it with a letter.", why: "Shift makes capitals.", tag: "typing.shift" }), "hunt", "recall",
    [mc("Which key do you hold to type a capital S?", "Shift", ["Space bar", "Delete"], { hint: "Hold it with a letter.", why: "Shift makes capitals.", tag: "typing.shift" })]),
  Q(mc("Sam says typing is always faster than writing by hand. Is he right?", "No. It depends how well you know the keys", ["Yes, always", "Yes, pencils are slow"], { hint: "Think about practice.", why: "Typing speed grows with practice. Writing can be fast too.", tag: "typing.reason_faster" }), "hunt", "reason",
    [mc("Aisha says writing by hand is always faster than typing. Is she right?", "No. It depends on practice and the job", ["Yes, always", "Yes, keyboards are slow"], { hint: "Think about practice.", why: "Speed depends on practice.", tag: "typing.reason_faster" })]),
  Q(fill("Finish the sentence about capitals.", "Hold the {b1} key and press a letter to make a {b2} letter.", [["shift", "space", "delete"], ["capital", "tiny", "pink"]], { hint: "Think about the capital key.", why: "Shift plus a letter makes a capital.", tag: "typing.shift_fill" }), "hunt", "apply",
    [fill("Complete the sentence about keys.", "The {b1} key starts a new {b2}.", [["enter", "shift", "delete"], ["line", "cloud", "shoe"]], { hint: "Think about starting a new line.", why: "Enter starts a new line.", tag: "typing.shift_fill" })]),
  Q(hot("Tap the number keys.", [["🔢", "Number keys", 22, 50], ["🔤", "Letter keys", 50, 50], ["␣", "Space bar", 78, 50]], ["Number keys"], { labels: true, hint: "They type 1, 2, 3.", why: "Number keys type digits.", tag: "typing.numbers" }), "hunt", "recall",
    [hot("Tap the letter keys.", [["🔢", "Number keys", 22, 50], ["🔤", "Letter keys", 50, 50], ["⏎", "Enter", 78, 50]], ["Letter keys"], { labels: true, hint: "They type A, B, C.", why: "Letter keys type letters.", tag: "typing.letters" })]),
  Q(mc("Aisha says a word processor is only for stories. Is she right?", "No. We can write notes, lists and posters too", ["Yes, only stories", "Yes, only letters to teachers"], { hint: "Think of the poster.", why: "A word processor writes any text.", tag: "typing.reason_wp" }), "hunt", "reason",
    [mc("Omar says you can only write letters with a word processor. Is he right?", "No. You can write lists, notes and posters too", ["Yes, only letters", "Yes, only stories"], { hint: "Think of the poster.", why: "A word processor writes any text.", tag: "typing.reason_wp" })]),
  // ----- poster (q24-q30)
  Q(ord("Put these steps for making a poster in order.", ["Choose the title", "Type the words", "Pick the colours", "Check and save"], { hint: "Title first.", why: "Title, words, colours, then check and save.", tag: "typing.poster_steps" }), "poster", "apply",
    [ord("Put these steps for a get-well note in order.", ["Think of kind words", "Type the note", "Check the spelling", "Save and send"], { hint: "Think first.", why: "Think, type, check, then send.", tag: "typing.poster_steps" })]),
  Q(mc("Which poster text is easiest to read?", "Big dark letters on a light page", ["Pink letters on a pink page", "Tiny pale letters on white"], { hint: "It should stand out.", why: "Big, dark letters on a light page are clear.", tag: "typing.readable" }), "poster", "apply",
    [mc("Which colours are easiest to read together?", "Dark blue on yellow", ["Green on green", "Grey on grey"], { hint: "They should stand out.", why: "Strong differences are easy to read.", tag: "typing.readable" })]),
  Q(mc("Layla says pink words on a pink page are fine. Is she right?", "No. The words would be hard to see", ["Yes, pink is lovely", "Yes, pink is the easiest to read"], { hint: "Do they stand out?", why: "Same colours make words hard to read.", tag: "typing.reason_pink" }), "poster", "reason",
    [mc("Ben says yellow words on a white page are the best. Is he right?", "No. Pale words on white are hard to read", ["Yes, yellow is bright", "Yes, yellow is best"], { hint: "Do they stand out?", why: "Yellow on white is too pale.", tag: "typing.reason_pink" })]),
  Q(mc("Sam says making every word big makes the poster clearer. Is he right?", "No. If everything is big, nothing stands out", ["Yes, bigger is always clearer", "Yes, small words are bad"], { hint: "Which words need to stand out?", why: "A big title stands out because other words are smaller.", tag: "typing.reason_big" }), "poster", "reason",
    [mc("Mina says all her words should be bold. Is she right?", "No. Too much bold makes it hard to see the title", ["Yes, bold is always best", "Yes, bold is the only way"], { hint: "Which words need to stand out?", why: "Bold works best for a few important words.", tag: "typing.reason_big" })]),
  Q(num("A poster has 1 title and 3 lines of words. How many pieces of text is that?", 4, { hint: "Add 1 and 3.", why: "1 + 3 = 4.", tag: "typing.count_text" }), "poster", "apply",
    [num("A poster has 2 titles and 5 lines of words. How many pieces of text is that?", 7, { hint: "Add 2 and 5.", why: "2 + 5 = 7.", tag: "typing.count_text" })]),
  Q(mc("Which makes a title stand out?", "Making it bigger", ["Making it tiny", "Hiding it"], { hint: "Big words get noticed.", why: "A bigger title stands out.", tag: "typing.title_big" }), "poster", "recall",
    [mc("What does bold text do?", "Makes letters thick and strong", ["Makes letters vanish", "Turns letters pink only"], { hint: "Think about heavy letters.", why: "Bold makes letters thicker.", tag: "typing.title_big" })]),
  Q(sld("A poster has 12 words. 5 are in the title. Slide to show how many are in the rest.", { min: 0, max: 15 }, 7, 0, { hint: "12 take away 5.", why: "12 - 5 = 7 words.", tag: "typing.rest_words" }), "poster", "apply",
    [sld("A poster has 10 words. 4 are in the title. Slide to show how many are in the rest.", { min: 0, max: 15 }, 6, 0, { hint: "10 take away 4.", why: "10 - 4 = 6 words.", tag: "typing.rest_words" })]),
];

export const topics = [
  topicLesson({
    slug: "data-ai-class-1-typing-and-writing", subject: "data-ai", cls: 1, topic: 6, title: "Typing and Writing on a Computer",
    summary: "Find keys, type words, fix mistakes and change how text looks.",
    unit: "Topic 6: Typing and writing on a computer", difficulty: 1,
    objectives: ["Find letter, space and delete keys", "Add and remove text", "Choose a font size and colour for a reason"],
    success_criteria: ["I can find the space bar, enter and delete keys", "I can fix a typing mistake", "I can make a title big and pick colours that are easy to read"],
    real_life: "Typing a note to a grandparent, a school poster or a short story on a tablet.",
    standards: [
      { framework: "nc_england", code: "KS1 uses of IT", text: "Use technology purposefully to create, organise, store, manipulate and retrieve digital content" },
      { framework: "csta", code: "1A-CS-01", text: "Select and operate appropriate software and hardware to perform a variety of tasks" },
    ],
    warm_up: [
      mc("Which tool takes back a step in a paint app?", "Undo", ["Fill", "Line"], { hint: "It goes back.", why: "Undo takes back a step." }),
      mc("What does digital mean?", "Made or shown on a computer", ["Made of metal", "Very old"], { hint: "Think of a tablet.", why: "Digital means on a computer." }),
      num("What is 5 + 6?", 11, { hint: "Count on from 5.", why: "5 + 6 = 11." }),
    ],
    intro: [],
    subs: [keys, type, hunt, poster],
    clip,
    quiz,
  }),
];
