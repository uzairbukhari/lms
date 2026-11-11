import { SAY, SS, H, T, PHOTO, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, mc, ms, tf, ord, mat, fill, hot, sld, st } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC } from "./_science-kit.mjs";

// English Class 1, topic 12: Neat joined-up handwriting (Zainab, age 7).
const SCRIPT = "english-class-1-joined-up-handwriting-1-70f3cec8.jpg";
const NIB = "english-class-1-joined-up-handwriting-2-37971dee.jpg";

// ---------------------------------------------------------------------------------------------- 1. learn
const lead = {
  id: "lead", kind: "learn", title: "Lead-in and lead-out",
  blocks: [
    H("Welcome back, young writer!"),
    SAY("Today we make our writing flow. How do we join letters so they hold hands?", T("Today's big question: how do we join letters neatly?")),
    SAY("This writing flows along the page. Many of the letters are joined together.", PHOTO(SCRIPT, "Joined-up handwriting in black ink on lined paper with stripes of shadow across it", "Joined-up writing flows because the pencil stays on the page.", "Photo by Micah Boswell on Unsplash")),
    H("Stop 1: Baseline and x-height"),
    SAY("Letters sit on an invisible line. We call it the baseline.", T("The **baseline** is the line that letters sit on.")),
    SAY("Small letters like a, e, o and n reach the x-height. That is the middle zone.", T("The **x-height** is the height of small letters.")),
    EB("classroom", "Lines for writing",
      SS("The baseline is the bottom line. Letters sit on it like toys on a shelf.", S("Baseline.", ["b", "➖", 50, 66, 3], ["a", "🔤", 50, 46, 3])),
      SS("Small letters like a and n fill the middle. That is the x-height.", S("x-height.", ["x", "🔤", 50, 52, 3, "pulse"])),
      SS("Tall letters like b and d reach higher. They have ascenders.", S("Ascenders.", ["b", "🅱️", 30, 48, 3], ["d", "🔤", 72, 48, 3]))),
    CHK(mc("What is the baseline?", "The line that letters sit on", ["The top of the page", "A kind of pencil"], { hint: "Think of toys on a shelf.", why: "Letters sit on the baseline.", tag: "lead.chk1" })),
    H("Stop 2: Lead-in and the first join"),
    SAY("A lead-in is a small stroke before a letter. It starts the join.", T("A **lead-in** starts a letter. A **lead-out** leaves it.")),
    SAY("After a letter, the lead-out swings up to meet the next letter. That is a join.", T("A **join** connects two letters.")),
    EB("classroom", "Lead-in and join",
      SS("Start on the baseline with a little lead-in. Then write the letter.", S("Lead-in.", ["p", "✏️", 30, 62, 3], ["l", "↗️", 75, 56, 2, "pulse"])),
      SS("Finish the letter with a lead-out. The pencil stays on the page.", S("Lead-out.", ["p", "✏️", 50, 62, 3, "bounce"])),
      SS("The first join goes diagonally up, as in in. The letters hold hands.", S("First join.", ["j", "🔗", 50, 56, 3, "grow"]))),
    CHK(tf("A lead-in is a small stroke that starts a letter.", true, { hint: "Think about the start.", why: "A lead-in begins the letter.", tag: "lead.chk2" })),
    SAY("Let us remember. Letters sit on the baseline. Lead-ins and lead-outs make joins.", SUM("Letters sit on the baseline", "Small letters reach the x-height", "Lead-ins and lead-outs make joins")),
    GLOSS({ baseline: "The line that letters sit on.", "x-height": "The height of small letters like a and n.", "lead-in": "A small stroke that starts a letter.", "lead-out": "A small stroke that leaves a letter.", join: "A stroke that connects two letters.", ascender: "The tall part of letters like b, d, h and k." }),
  ],
  mini: [
    mc("Which letters have an ascender?", "b and d", ["a and e", "o and n"], { hint: "They are tall.", why: "B and d are tall letters." }),
    tf("Letters sit on the baseline.", true, { hint: "Think of a shelf.", why: "The baseline is the bottom line." }),
    mc("What does a join do?", "Connects two letters", ["Makes the page longer", "Hides the pencil"], { hint: "Letters hold hands.", why: "A join connects letters." }),
    mc("What is the middle zone for small letters called?", "x-height", ["lead-out", "ascender"], { hint: "Think of a and n.", why: "Small letters fill the x-height." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const joins = {
  id: "joins", kind: "try", title: "Practise the joins",
  blocks: [
    H("Stop 1: Joins one and two"),
    SAY("The first join goes diagonally up to a small letter. Try in, ig, ed, eg, an and ar.", T("The **first join** goes diagonally up to a small letter.")),
    SAY("The second join goes up to a tall letter. Try ck and ch.", T("The **second join** goes up to a tall letter.")),
    EB("classroom", "Two joins",
      SS("In the word in, the first join goes from i up to n.", S("First join: in.", ["i", "🔤", 40, 56, 3], ["a", "↗️", 72, 52, 2, "pulse"])),
      SS("In ch, the second join goes up to a tall letter, h.", S("Second join: ch.", ["c", "🔤", 40, 56, 3], ["a", "↗️", 72, 44, 2, "pulse"])),
      SS("Keep the pencil moving. Do not lift it inside a word.", S("Do not lift.", ["p", "✏️", 50, 58, 3, "bounce"]))),
    CHK(mc("Which pair uses the first join?", "in", ["ck", "on"], { hint: "It goes diagonally up to a small letter.", why: "In uses the first join.", tag: "joins.chk1" })),
    H("Stop 2: The third join"),
    SAY("This pen writes on lined paper. Its nib glides along without lifting.", PHOTO(NIB, "A fountain pen nib resting on lined paper beside joined handwriting", "A pen nib glides across the lines in joined-up writing.", "Photo by Aaron Burden on Unsplash")),
    SAY("The third join starts from the letter o. It goes straight across. Try on, om and ow.", T("The **third join** goes across from o.")),
    SAY("Now sort the pairs. Which join does each use?", MAN("Which join?", "Move each pair. Diagonal to a small letter goes in First. Across from o goes in Third.", "🔤", 8, ["First join", "Third join"])),
    ACT("Practise joins", ["A pencil", "Lined paper", "A grown-up to help"], ["Write in, ig and ed with the first join.", "Write ck and ch with the second join.", "Write on, om and ow with the third join."]),
    CHK(mc("Which pair uses the third join?", "on", ["in", "ch"], { hint: "It starts from o.", why: "On starts from o and goes across.", tag: "joins.chk2" })),
    SAY("Let us remember. First join goes up to a small letter. Second goes up to a tall letter. Third goes across from o.", SUM("First join: diagonal up to a small letter", "Second join: up to a tall letter", "Third join: across from o")),
    GLOSS({ "first join": "A diagonal join up to a small letter.", "second join": "A join up to a tall letter.", "third join": "A join that goes across from the letter o.", diagonal: "Slanting up or down.", nib: "The pointed tip of a pen." }),
  ],
  mini: [
    mc("Which pair has the second join?", "ck", ["in", "on"], { hint: "It goes to a tall letter.", why: "Ck uses the second join." }),
    tf("Do not lift the pencil inside a word.", true, { hint: "Let it flow.", why: "The pencil stays on the page." }),
    mc("Where does the third join start?", "From the letter o", ["From the letter i", "From the letter t"], { hint: "Think of on.", why: "The third join starts from o." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const game = {
  id: "game", kind: "play", title: "Join-up game",
  blocks: [
    H("Stop 1: Spot the broken join"),
    SAY("A broken join leaves a gap. Look for letters that float.", T("A **broken join** leaves a gap between letters.")),
    EB("classroom", "Spot the problem",
      SS("This word has a gap between letters. The pencil was lifted.", S("A gap.", ["g", "🔤", 35, 56, 3], ["q", "❓", 75, 40, 2, "pulse"])),
      SS("This letter floats above the baseline. It is not sitting on the line.", S("Floating.", ["f", "🎈", 50, 44, 3, "float"])),
      SS("Neat writing has even letters and equal gaps between words.", S("Neat.", ["n", "✅", 50, 54, 3, "grow"]))),
    CHK(mc("What is a broken join?", "A gap where letters should be joined", ["A very long word", "A torn page"], { hint: "Letters hold hands.", why: "A broken join leaves a gap.", tag: "game.chk1" })),
    H("Stop 2: Brain game"),
    SAY("Warm up your memory. Watch the pencils light up, then copy them.", T("Play the game, then answer a question.")),
    SAY("Watch the order closely. Then copy it.", BRAIN("remember_order", "Joining game", "Watch the order, then copy it. It gets longer each time!", ["✏️", "🔤", "🔗", "📄"])),
    CHK(tf("In joined-up writing, the pencil stays on the page along a word.", true, { hint: "Think of flow.", why: "The pencil keeps moving.", tag: "game.chk2" })),
    SAY("Let us remember. Check for gaps and floating letters. Keep letters even.", SUM("A broken join leaves a gap", "Letters sit on the baseline", "Keep letters the same height")),
    GLOSS({ "broken join": "A gap where two letters should connect.", floating: "Not sitting on the line.", even: "The same size all the way along.", spacing: "The gaps between words.", neat: "Tidy and easy to read." }),
  ],
  mini: [
    mc("What should you check for?", "Gaps and floating letters", ["Loud noises", "The colour of the desk"], { hint: "Look at the writing.", why: "We check for gaps and floating letters." }),
    tf("Letters in a word should be the same height.", true, { hint: "Look at the x-height.", why: "Small letters are the same height." }),
    mc("Where do letters sit?", "On the baseline", ["Above the page", "Below the pencil"], { hint: "Think of a shelf.", why: "Letters sit on the baseline." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const note = {
  id: "note", kind: "use", title: "Write a note",
  blocks: [
    H("Stop 1: Copy a short line"),
    SAY("Now use your joins in a real note. First copy a short line carefully.", T("Copy a **model** line, then write your own.")),
    SAY("English joined script and Urdu calligraphy are two ways of flowing writing.", T("Many writing styles flow along a line.")),
    SAY("Both need patience, even shapes and a steady hand.", T("Practice makes writing neat.")),
    SAY("Sam writes a thank-you note to his teacher. His letters hold hands along the baseline.", T("A note can say thank you.")),
    EB("classroom", "A thank-you note",
      SS("Dear Miss Khan, thank you for helping me.", S("The note.", ["n", "📝", 50, 56, 3, "grow"])),
      SS("Each word has a small finger space after it.", S("Spacing.", ["w", "☝️", 35, 56, 3], ["n", "📝", 72, 56, 3])),
      SS("Each letter sits on the baseline. The joins are smooth.", S("Neat joins.", ["j", "🔗", 50, 56, 3, "pulse"]))),
    CHK(mc("What should a note have between words?", "A finger space", ["No space", "A big blank page"], { hint: "Use your finger.", why: "A finger space keeps words clear.", tag: "note.chk1" })),
    H("Stop 2: Write and check"),
    SAY("Write your own note to a friend. Check size, spacing and joins.", T("Write, check and compare.")),
    EB("classroom", "Write and check",
      SS("Write your note slowly. Keep each letter on the baseline.", S("Write.", ["p", "✏️", 35, 58, 3], ["n", "📝", 72, 58, 3])),
      SS("Check the size, the spacing and the joins. Fix any gaps.", S("Check.", ["c", "🔍", 35, 58, 3], ["n", "📝", 72, 58, 3, "pulse"])),
      SS("Compare your note with the model. Improve one word.", S("Compare.", ["m", "📄", 35, 58, 3], ["n", "📝", 72, 58, 3]))),
    ACT("Write a note", ["A pencil", "Lined paper", "A friend to write to"], ["Copy a short model line carefully.", "Write a note to a friend.", "Check size, spacing and joins.", "Compare with the model and improve one word."]),
    CHK(tf("Comparing our writing with a model helps us improve.", true, { hint: "Look and learn.", why: "A model shows what neat writing looks like.", tag: "note.chk2" })),
    SAY("Let us remember. Copy carefully, write a note, check, compare and keep a writing book.", SUM("Copy a model carefully", "Check size, spacing and joins", "Keep practising in a writing book")),
    GLOSS({ model: "An example to copy and learn from.", calligraphy: "Beautiful, flowing writing made with a special pen.", thank: "To say you are grateful.", spacing: "The gaps between words.", practice: "Doing something again and again to get better." }),
  ],
  mini: [
    mc("What should we do first?", "Copy a model carefully", ["Rush it", "Hide the pencil"], { hint: "Look first.", why: "Copying a model helps." }),
    tf("Neat writing helps readers.", true, { hint: "Think of your friend.", why: "Neat writing is easy to read." }),
    mc("How can we get better?", "Practise often", ["Practise once", "Never write"], { hint: "Think about a writing book.", why: "Practice improves handwriting." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Sam's thank-you note", backdrop: "classroom", caption: "Sam writes a joined-up thank-you note to his teacher.",
  scenes: [
    { caption: "A note.", say: "Sam wants to say thank you to his teacher.",
      items: [{ id: "s", emoji: "🧒", label: "Sam", x: 30, y: 58, size: 3 }, { id: "t", emoji: "👩‍🏫", x: 72, y: 58, size: 3 }] },
    { caption: "The baseline.", say: "He sits his letters on the baseline.",
      items: [{ id: "b", emoji: "➖", x: 50, y: 62, size: 3 }, { id: "l", emoji: "🔤", x: 50, y: 46, size: 3 }] },
    { caption: "Lead-in.", say: "Each letter starts with a tiny lead-in.",
      items: [{ id: "p", emoji: "✏️", x: 40, y: 60, size: 3, anim: "bounce" }, { id: "a", emoji: "↗️", x: 75, y: 50, size: 2 }] },
    { caption: "Joins.", say: "His letters hold hands. The pencil does not lift.",
      items: [{ id: "j", emoji: "🔗", x: 50, y: 56, size: 3, anim: "pulse" }] },
    { caption: "Spaces.", say: "He leaves a finger space between words.",
      items: [{ id: "f", emoji: "☝️", x: 50, y: 56, size: 3 }] },
    { caption: "Check.", say: "He checks for gaps and floating letters.",
      items: [{ id: "c", emoji: "🔍", x: 40, y: 58, size: 3 }, { id: "n", emoji: "📝", x: 75, y: 58, size: 3 }] },
    { caption: "Neat.", say: "His note is neat and easy to read.",
      items: [{ id: "n", emoji: "📝", x: 50, y: 56, size: 3, effect: "sparkle" }] },
    { caption: "Thank you.", say: "His teacher smiles. She loves the note!",
      items: [{ id: "t", emoji: "👩‍🏫", x: 40, y: 58, size: 3 }, { id: "h", emoji: "💗", x: 72, y: 44, size: 3, effect: "hearts" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- lead (q1-q8)
  Q("lead", "recall", "hand.baseline", mc("What does baseline mean in handwriting?", "The line letters sit on", ["The top of a letter", "The edge of the page"], { hint: "Think of a shelf.", why: "Letters sit on the baseline." }),
    mc("Where do most letters start and finish?", "On the baseline", ["At the top of the page", "In the margin"], { hint: "Think of a shelf.", why: "Letters sit on the baseline." })),
  Q("lead", "recall", "hand.xheight", mc("What is x-height?", "The height of small letters like a and n", ["The height of the page", "The height of the desk"], { hint: "Think of small letters.", why: "X-height is the height of small letters." }),
    mc("Which letters reach the x-height?", "a, n and o", ["b, d and h", "g, y and p"], { hint: "Think of small letters.", why: "Small letters fill the x-height." })),
  Q("lead", "reason", "hand.leadin_end", mc("Layla says a lead-in is the end of a letter. Is she right?", "No, a lead-in starts a letter", ["Yes, it is the end", "Yes, it is a full stop"], { hint: "Think of lead-in and lead-out.", why: "A lead-in begins a letter." }),
    mc("Hana says a lead-out is the start of a letter. Is she right?", "No, a lead-out leaves a letter", ["Yes, it starts it", "Yes, it is the same as a lead-in"], { hint: "Think of lead-in and lead-out.", why: "A lead-out leaves a letter." })),
  Q("lead", "apply", "hand.ascender_ms", ms("Pick two letters with ascenders. Pick two.", ["b", "d"], ["a", "e"], { hint: "Which are tall?", why: "B and d are tall letters." }),
    ms("Choose two tall letters.", ["h", "k"], ["o", "n"], { hint: "Which reach up?", why: "H and k are tall letters." })),
  Q("lead", "apply", "hand.descender_ms", ms("Pick two letters with descenders. Pick two.", ["g", "y"], ["a", "o"], { hint: "Which hang below the line?", why: "G and y hang below the line." }),
    ms("Choose two letters that hang below the line.", ["p", "q"], ["e", "c"], { hint: "Which have tails?", why: "P and q hang below the line." })),
  Q("lead", "apply", "hand.baseline_tap", hot("Tap the line that letters sit on.", [["➖", "baseline", 22, 50], ["🔝", "top of the page", 50, 50], ["📏", "ruler", 78, 50]], ["baseline"], { labels: true, hint: "Think of a shelf.", why: "Letters sit on the baseline." }),
    hot("Tap the stroke that starts a letter.", [["↗️", "lead-in", 22, 50], ["🛑", "stop", 50, 50], ["📄", "page", 78, 50]], ["lead-in"], { labels: true, hint: "It comes first.", why: "A lead-in starts a letter." })),
  Q("lead", "reason", "hand.lift", mc("Sam says you lift your pencil for every join. Is he right?", "No, the pencil stays on the page for a join", ["Yes, lift for every join", "Yes, joins need gaps"], { hint: "Think of flow.", why: "A join connects without lifting." }),
    mc("Mira says you must lift your pencil between every letter. Is she right?", "No, in joined writing it stays down", ["Yes, always lift", "Yes, never join"], { hint: "Think of flow.", why: "In joined writing the pencil keeps moving." })),
  Q("lead", "recall", "hand.ascender_st", st("What do we call the tall part of b, d, h and k?", ["ascender", "ascenders", "an ascender"], { hint: "It starts with a.", why: "The tall part is the ascender." }),
    st("What do we call the part of g, y and p that hangs below the line?", ["descender", "descenders", "a descender"], { hint: "It starts with d.", why: "The tail is the descender." })),
  // ----- joins (q9-q16)
  Q("joins", "apply", "hand.first_join", mc("Which join goes diagonally up to a small letter, as in in?", "The first join", ["The third join", "No join"], { hint: "Think of in.", why: "The first join goes diagonally up." }),
    mc("Which join do we use in the word an?", "The first join", ["The third join", "The second join"], { hint: "It goes up to a small letter.", why: "An uses the first join." })),
  Q("joins", "apply", "hand.second_join", mc("Which join goes up to a tall letter, as in ch?", "The second join", ["The first join", "The third join"], { hint: "It goes to a tall letter.", why: "Ch uses the second join." }),
    mc("Which join do we use in ck?", "The second join", ["The first join", "The third join"], { hint: "It goes to a tall letter.", why: "Ck uses the second join." })),
  Q("joins", "reason", "hand.same_height", mc("Aisha says all letters are the same height. Is she right?", "No, some letters are tall and some are small", ["Yes, all the same", "Yes, no letters are tall"], { hint: "Think of b and a.", why: "Letters have different heights." }),
    mc("Layla says a and b are the same height. Is she right?", "No, b is taller than a", ["Yes, they are the same", "Yes, a is taller"], { hint: "Think of ascenders.", why: "B has an ascender." })),
  Q("joins", "apply", "hand.join_match", mat("Match each pair to its join.", [["in", "first join"], ["ck", "second join"], ["on", "third join"]], { hint: "Think about each shape.", why: "Each pair uses a different join." }),
    mat("Join each pair to its join.", [["an", "first join"], ["ch", "second join"], ["ow", "third join"]], { hint: "Think about each shape.", why: "Each pair uses a different join." })),
  Q("joins", "apply", "hand.letters_sld", sld("Slide to show how many letters are in the word pencil.", { min: 0, max: 10, unit: "letters" }, 6, 0, { hint: "Count each letter.", why: "Pencil has 6 letters." }),
    sld("Slide to show how many letters are in the word ticket.", { min: 0, max: 10, unit: "letters" }, 6, 0, { hint: "Count each letter.", why: "Ticket has 6 letters." })),
  Q("joins", "apply", "hand.pencil_ord", ord("Put the pencil steps in order.", ["Sit up straight", "Hold the pencil gently", "Start on the baseline", "Join the letters"], { hint: "Sit first.", why: "Sit, hold, start, join." }),
    ord("Arrange the steps in order.", ["Get a pencil", "Open the writing book", "Write the first letter", "Join the next letter"], { hint: "Get ready first.", why: "Get ready, then write and join." })),
  Q("joins", "reason", "hand.neat_matter", mc("Omar says neat handwriting does not matter. Is he right?", "No, neat writing is easier to read", ["Yes, no one cares", "Yes, messy is better"], { hint: "Think about readers.", why: "Neat writing helps readers." }),
    mc("Sana says nobody ever reads handwriting. Is she right?", "No, people read notes and cards", ["Yes, nobody reads", "Yes, only computers read"], { hint: "Think of a thank-you note.", why: "People read handwritten notes." })),
  Q("joins", "apply", "hand.terms_match", mat("Match each word to what it means.", [["baseline", "the line letters sit on"], ["ascender", "a tall part of a letter"], ["descender", "a part that hangs below the line"]], { hint: "Think about each word.", why: "Each word has its own meaning." }),
    mat("Join each word to its meaning.", [["lead-in", "a stroke that starts a letter"], ["lead-out", "a stroke that leaves a letter"], ["x-height", "the height of small letters"]], { hint: "Think about each word.", why: "Each word has its own meaning." })),
  // ----- game (q17-q23)
  Q("game", "reason", "hand.speed", mc("Zainab says speed matters more than neatness. Is she right?", "No, neat writing is more important than rushing", ["Yes, speed is everything", "Yes, neatness is wrong"], { hint: "Think about readers.", why: "If we rush, our writing may be hard to read." }),
    mc("Ali says writing as fast as possible is always best. Is he right?", "No, a steady pace gives neat writing", ["Yes, always fastest", "Yes, neatness is slow"], { hint: "Think about neatness.", why: "A steady pace gives neat writing." })),
  Q("game", "apply", "hand.joins_sld", sld("A word has 5 letters and all are joined. Slide to show how many joins there are.", { min: 0, max: 8, unit: "joins" }, 4, 0, { hint: "There is one less join than letters.", why: "5 letters have 4 joins." }),
    sld("A word has 4 letters and all are joined. Slide to show how many joins there are.", { min: 0, max: 8, unit: "joins" }, 3, 0, { hint: "There is one less join than letters.", why: "4 letters have 3 joins." })),
  Q("game", "reason", "hand.spaces", mc("Sam says word spaces are not needed. Is he right?", "No, spaces keep words clear", ["Yes, never use spaces", "Yes, spaces make it messy"], { hint: "Think about reading.", why: "Spaces show where words start and end." }),
    mc("Hana says words can touch each other. Is she right?", "No, we leave a finger space", ["Yes, they should touch", "Yes, never leave a space"], { hint: "Think about readers.", why: "A finger space keeps words clear." })),
  Q("game", "apply", "hand.stay_tf", tf("In a joined word the pencil stays on the page.", true, { hint: "Think of flow.", why: "The pencil keeps moving along the word." }),
    tf("We should lift the pencil after every letter in a joined word.", false, { hint: "Think of flow.", why: "We keep the pencil down." })),
  Q("game", "recall", "hand.base_st", st("What do we call the line that letters sit on?", ["baseline", "the baseline"], { hint: "It starts with b.", why: "The line is the baseline." }),
    st("What do we call the stroke that starts a letter?", ["lead-in", "lead in", "a lead-in"], { hint: "It starts with l.", why: "A lead-in starts a letter." })),
  Q("game", "apply", "hand.join_tap", hot("Tap the letters that make the first join.", [["1️⃣", "in", 22, 50], ["2️⃣", "ck", 50, 50], ["3️⃣", "on", 78, 50]], ["in"], { labels: true, hint: "Diagonal to a small letter.", why: "In uses the first join." }),
    hot("Tap the letters that make the second join.", [["1️⃣", "ig", 22, 50], ["2️⃣", "ck", 50, 50], ["3️⃣", "om", 78, 50]], ["ck"], { labels: true, hint: "Up to a tall letter.", why: "Ck uses the second join." })),
  Q("game", "apply", "hand.broken", mc("Which problem is a broken join?", "A gap between letters that should connect", ["A long word", "A short pencil"], { hint: "Letters hold hands.", why: "A broken join leaves a gap." }),
    mc("Which is a sign of neat writing?", "Letters sit on the baseline", ["Letters float everywhere", "Gaps in every word"], { hint: "Look at the baseline.", why: "Neat writing sits on the line." })),
  // ----- note (q24-q30)
  Q("note", "reason", "hand.big_writers", mc("Aisha says joins are only for big writers. Is she right?", "No, children can learn joins and practise them", ["Yes, only adults can join", "Yes, children cannot join"], { hint: "Think about our lesson.", why: "Anyone can learn joins." }),
    mc("Omar says children cannot learn joined writing. Is he right?", "No, with practice they can", ["Yes, only adults", "Yes, only big writers"], { hint: "Think about practice.", why: "Children can learn joins." })),
  Q("note", "reason", "hand.once", mc("Omar says you only practise once. Is he right?", "No, we practise often to improve", ["Yes, once is enough", "Yes, practising makes writing worse"], { hint: "Think about a writing book.", why: "Practice improves writing." }),
    mc("Layla says one go is enough to be neat. Is she right?", "No, we keep practising", ["Yes, one go", "Yes, never practise"], { hint: "Think about a writing book.", why: "Practice improves writing." })),
  Q("note", "apply", "hand.note_ord", ord("Put the note writing steps in order.", ["Copy the line carefully", "Check size and spacing", "Write the note to a friend", "Compare to a model"], { hint: "Copy first.", why: "Copy, write, check, compare." }),
    ord("Put these note steps in order.", ["Choose a friend", "Write the note", "Check the joins", "Give it kindly"], { hint: "Choose first.", why: "Choose, write, check, give." })),
  Q("note", "apply", "hand.note_fill", fill("Finish the sentences about a note.", "Each word has a {b1} space after it. Letters sit on the {b2}.", [["finger", "banana", "giant"], ["baseline", "ceiling", "cloud"]], { hint: "Think about neat writing.", why: "A finger space follows each word and letters sit on the baseline." }),
    fill("Complete the lines about a note.", "A neat note has even {b1} and smooth {b2}.", [["letters", "clouds", "rocks"], ["joins", "gaps", "blots"]], { hint: "Think about neat writing.", why: "Neat writing has even letters and smooth joins." })),
  Q("note", "apply", "hand.neatest", mc("Which note is neatest?", "Letters the same size with even spacing", ["Letters of all sizes with no spaces", "Letters that float above the line"], { hint: "Think about size and spacing.", why: "Even size and spacing make neat writing." }),
    mc("Pick the neatest note.", "Letters sit on the line with smooth joins", ["Letters jump up and down", "Letters have big gaps inside words"], { hint: "Think about the baseline.", why: "Smooth joins and the baseline make neat writing." })),
  Q("note", "apply", "hand.model_tf", tf("Comparing our writing to a model can help us improve one word.", true, { hint: "Look and learn.", why: "A model shows what to aim for." }),
    tf("A model is only for people who cannot write.", false, { hint: "Everyone can learn from a model.", why: "A model helps everyone improve." })),
  Q("note", "apply", "hand.check_fill", fill("Finish the checking lines.", "Check the size of letters, the {b1} between words and the {b2} between letters.", [["spacing", "weather", "colour"], ["joins", "clouds", "sounds"]], { hint: "Think about neat writing.", why: "Check spacing and joins." }),
    fill("Complete the checking lines.", "A good writer checks for {b1} and floating {b2}.", [["gaps", "wheels", "storms"], ["letters", "buses", "toys"]], { hint: "Think about broken joins.", why: "Check for gaps and floating letters." })),
];

export const topics = [
  topicLesson({
    slug: "english-class-1-joined-up-handwriting", subject: "english", cls: 1, topic: 12, title: "Neat Joined-Up Handwriting",
    summary: "Practise joining letters with lead-ins so writing is neat and flowing.",
    unit: "Topic 12: Joined-up handwriting", difficulty: 1,
    objectives: ["Form lead-in and lead-out strokes", "Make the first, second and third joins", "Keep letter size and spacing even"],
    success_criteria: ["I can sit letters on the baseline", "I can make the first, second and third joins", "I can write a neat note"],
    real_life: "English joined script and Urdu calligraphy as two ways of flowing writing, and a thank-you note to a teacher.",
    standards: [NC("Y2 handwriting", "Form lower-case letters of the correct size relative to one another; start using diagonal and horizontal strokes needed to join letters")],
    warm_up: [
      mc("Where do letters sit?", "On the baseline", ["On the ceiling", "In the air"], { hint: "Think of a shelf.", why: "Letters sit on the baseline." }),
      tf("A neat note is easier to read.", true, { hint: "Think about your friend.", why: "Neat writing is easier to read." }),
      mc("Which is a tall letter?", "b", ["a", "o"], { hint: "It has an ascender.", why: "B is tall." }),
    ],
    intro: [],
    subs: [lead, joins, game, note],
    clip,
    quiz,
  }),
];
