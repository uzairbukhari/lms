import { SAY, SS, H, T, PHOTO, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, mc, ms, tf, ord, mat, fill, hot, sld, st } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC } from "./_science-kit.mjs";

// English Class 1, topic 9: The Owl Who Was Afraid of the Dark (Zainab, age 7).
// The lesson describes the story in general terms; it does not quote the book.
const OWL = "english-class-1-the-owl-afraid-of-the-dark-1-42a167ce.jpg";
const NIGHT = "english-class-1-the-owl-afraid-of-the-dark-2-b06e9b32.jpg";

// ---------------------------------------------------------------------------------------------- 1. learn
const meet = {
  id: "meet", kind: "learn", title: "Meet Plop",
  blocks: [
    H("Welcome back, young reader!"),
    SAY("Today we meet a little owl with a big problem. What could it be?", T("Today's big question: how does Plop beat his fear?")),
    SAY("This is a barn owl. Our story is about a baby one called Plop.", PHOTO(OWL, "A barn owl with a pale heart-shaped face perched on a wooden post", "A barn owl perched on a post. Barn owls hunt at night.", "Photo by Michael Campos on Unsplash")),
    H("Stop 1: Characters and setting"),
    SAY("The Owl Who Was Afraid of the Dark is a story by Jill Tomlinson. Plop is a baby barn owl.", T("A **character** is a person or animal in a story.")),
    SAY("Plop lives in a tree with his family. The story happens at night.", T("The **setting** is where and when a story happens.")),
    EB("forest", "Plop's world",
      SS("Plop is a baby barn owl. He has soft feathers and big eyes.", S("Plop.", ["p", "🦉", 50, 54, 3, "float"])),
      SS("He lives in a tree. The forest is his home.", S("The setting.", ["t", "🌳", 50, 54, 3])),
      SS("Owls are nocturnal. They are awake at night and sleep in the day.", S("Nocturnal.", ["o", "🦉", 35, 54, 3], ["m", "🌙", 75, 28, 2, "float"]))),
    CHK(mc("What is a baby barn owl called in this story?", "Plop", ["Hoot", "Wing"], { hint: "It is the main character's name.", why: "The baby barn owl is called Plop.", tag: "meet.chk1" })),
    H("Stop 2: The problem"),
    SAY("Here is the problem. Plop is afraid of the dark, but owls live at night.", T("The **problem** is what goes wrong in a story.")),
    EB("forest", "The problem",
      SS("Night comes. Plop is scared of the dark.", S("Afraid.", ["p", "🦉", 40, 54, 3], ["d", "🌑", 75, 40, 3, "pulse"])),
      SS("An owl who fears the dark is a puzzle. How will he fix it?", S("A puzzle.", ["p", "🦉", 50, 54, 3], ["q", "❓", 50, 25, 2, "pulse"])),
      SS("Plop will meet people who like the dark. They will help him.", S("Helpers.", ["p", "🦉", 30, 54, 3], ["h", "🤝", 72, 54, 3, "grow"]))),
    CHK(tf("Plop is afraid of the dark.", true, { hint: "That is the problem.", why: "Plop is a barn owl who is scared of the dark.", tag: "meet.chk2" })),
    SAY("Let us remember. Plop is a baby owl. He is afraid of the dark, but owls live at night.", SUM("Plop is a baby barn owl", "The story happens at night", "His problem is that he fears the dark")),
    GLOSS({ character: "A person or animal in a story.", setting: "Where and when a story happens.", problem: "What goes wrong in a story.", nocturnal: "Awake at night and asleep in the day.", afraid: "Scared of something.", plot: "What happens in a story." }),
  ],
  mini: [
    mc("What kind of animal is Plop?", "A baby barn owl", ["A bat", "A rabbit"], { hint: "He lives in a tree.", why: "Plop is a baby barn owl." }),
    tf("Owls are awake at night.", true, { hint: "They are nocturnal.", why: "Owls are nocturnal." }),
    mc("When does the story happen?", "At night", ["At noon", "At breakfast"], { hint: "Think about the dark.", why: "The story is set at night." }),
    mc("What goes wrong at the start?", "Plop is scared of the dark", ["Plop loses a shoe", "Plop cannot fly"], { hint: "It is the problem.", why: "Plop is scared of the dark." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const predict = {
  id: "predict", kind: "try", title: "Predict and check",
  blocks: [
    H("Stop 1: Make a prediction"),
    SAY("A prediction is a clever guess. We use clues from the story.", T("A **prediction** is a clever guess about what happens next.")),
    EB("forest", "Clues about Plop",
      SS("Plop shivers when the sun goes down. That is a clue.", S("A clue.", ["p", "🥶", 50, 54, 3, "pulse"])),
      SS("He hides behind his mum. Another clue. How does he feel?", S("Hiding.", ["p", "🦉", 30, 54, 2], ["m", "🦉", 72, 52, 3])),
      SS("We might predict that someone will help him. Our guess could be wrong.", S("Predict.", ["h", "🤝", 50, 54, 3, "grow"]))),
    CHK(mc("Plop hides behind his mum when it gets dark. How does he feel?", "scared", ["bored", "hungry"], { hint: "Hiding is a clue.", why: "Hiding shows he feels scared.", tag: "predict.chk1" })),
    H("Stop 2: Read on and check"),
    SAY("This night sky is full of stars. Plop will see stars. What might he think?", PHOTO(NIGHT, "A sky full of stars and a purple Milky Way above dark pine trees", "A night sky full of stars. The dark can be beautiful.", "Photo by Ryan Hutton on Unsplash")),
    SAY("Read on. Was our prediction right? A wrong one is still a good guess.", T("Check each prediction against the story.")),
    SAY("Now sort these words. Are they scared words or brave words?", MAN("Scared or brave?", "Move each word. Words about fear go in Scared. Words about courage go in Brave.", "🦉", 8, ["Scared", "Brave"])),
    ACT("Predict and check", ["A short story", "A grown-up to read with you"], ["Read until a problem happens.", "Stop. Write what you think will happen next.", "Read on and check your prediction."]),
    CHK(tf("A prediction can be wrong and still be a good guess.", true, { hint: "It is a guess.", why: "A prediction is a clever guess, so it can be wrong.", tag: "predict.chk2" })),
    SAY("Let us remember. We use clues to predict. Then we read on and check.", SUM("Clues help us predict", "Predictions can be wrong", "Read on and check")),
    GLOSS({ prediction: "A clever guess about what happens next.", clue: "A hint that helps you work something out.", scared: "Afraid.", brave: "Ready to face something scary.", check: "To look again and see if you were right.", milky: "A band of stars across the night sky." }),
  ],
  mini: [
    mc("What do we use to make a prediction?", "Clues", ["Dice", "Pictures only"], { hint: "Think of detectives.", why: "We use clues." }),
    tf("A prediction is always right.", false, { hint: "It is a guess.", why: "A prediction can be wrong." }),
    mc("Which word means scared?", "frightened", ["delighted", "bold"], { hint: "It is how Plop feels.", why: "Frightened means scared." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const brave = {
  id: "brave", kind: "play", title: "Brave or scared?",
  blocks: [
    H("Stop 1: Feelings in a story"),
    SAY("Plop's feelings change. At first he is afraid. At the end he is brave.", T("Feelings can **change** in a story.")),
    EB("forest", "Plop changes",
      SS("At the start, Plop shakes. He is afraid.", S("Afraid.", ["p", "🥶", 50, 54, 3])),
      SS("In the middle, he meets kind people. They are not afraid of the dark.", S("Helped.", ["p", "🦉", 30, 54, 3], ["k", "🤝", 72, 54, 3])),
      SS("At the end, Plop feels safe. The dark feels kind.", S("Brave.", ["p", "🦉", 50, 54, 3, "pulse"], ["m", "🌙", 75, 28, 2, "float"]))),
    CHK(mc("How does Plop feel at the start?", "afraid", ["bold", "sleepy"], { hint: "Think of the problem.", why: "At the start Plop is afraid.", tag: "brave.chk1" })),
    H("Stop 2: Brain game"),
    SAY("Warm up your memory. Watch the night pictures light up, then copy them.", T("Play the game, then answer a question.")),
    SAY("Watch the order closely. Then copy it.", BRAIN("remember_order", "Night sky", "Watch the order, then copy it. It gets longer each time!", ["🌙", "⭐", "🦉", "🌳"])),
    CHK(ms("Pick two words that mean scared.", ["frightened", "nervous"], ["bold", "proud"], { hint: "Think of Plop at the start.", why: "Frightened and nervous mean scared.", tag: "brave.chk2" })),
    SAY("Let us remember. Everyone feels scared sometimes. Plop learns the dark can be kind.", SUM("Plop is afraid at the start", "Kind people help him", "At the end he feels safe")),
    GLOSS({ change: "To become different.", afraid: "Scared of something.", nervous: "A little worried.", frightened: "Very scared.", bold: "Brave and not afraid.", cosy: "Warm, safe and comfortable.", kind: "Gentle and caring." }),
  ],
  mini: [
    mc("Which word means brave?", "bold", ["afraid", "tearful"], { hint: "It is the opposite of scared.", why: "Bold means brave." }),
    tf("Everyone feels scared sometimes.", true, { hint: "Even owls.", why: "Everyone feels scared sometimes." }),
    mc("What helps Plop feel braver?", "Kind people", ["A loud noise", "A closed door"], { hint: "Think about the middle.", why: "Kind people help him." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const tell = {
  id: "tell", kind: "use", title: "Tell our own story",
  blocks: [
    H("Stop 1: Plan a fear and a fix"),
    SAY("Now we make our own story. Every story has a problem and a fix.", T("Plan a **fear** and a **fix**.")),
    SAY("In Pakistan, some children feel nervous in a power cut. Candles can help.", T("Nights in Lahore can feel dark and long.")),
    SAY("In the UK, some children feel nervous when the clocks go back. Winter nights come early.", T("Winter nights in the Lake District are long.")),
    SAY("Many families say a bedtime dua. It helps them feel calm and safe.", T("Calm routines help us feel safe.")),
    EB("home", "Fear and fix",
      SS("Omar is afraid of the dark. His night light flickers.", S("The fear.", ["o", "👦", 30, 58, 3], ["l", "💡", 72, 44, 2, "pulse"])),
      SS("He thinks of Plop. Plop learned the dark can be kind.", S("The fix.", ["o", "👦", 30, 58, 3], ["p", "🦉", 72, 50, 3])),
      SS("Omar takes a deep breath. The dark feels cosy now.", S("Calm.", ["o", "😌", 50, 54, 3, "pulse"]))),
    CHK(mc("Which is a good fear and fix?", "Afraid of thunder; a friend counts the seconds", ["Afraid of thunder; nothing at all", "Afraid of apples; no fix"], { hint: "A fix helps.", why: "A fix is something that helps with the fear.", tag: "tell.chk1" })),
    H("Stop 2: Retell in order"),
    SAY("Tell your story in order. Use a beginning, a middle and an end.", T("Beginning, middle and end.")),
    EB("classroom", "Retelling",
      SS("The beginning. We meet the character and the fear.", S("Beginning.", ["b", "🦉", 40, 54, 3], ["f", "😟", 75, 50, 2])),
      SS("The middle. Someone kind helps with the fear.", S("Middle.", ["m", "🤝", 50, 54, 3, "grow"])),
      SS("The end. The fear feels smaller and the character feels safe.", S("End.", ["e", "😌", 50, 54, 3, "pulse"]))),
    ACT("Tell our own story", ["Paper and a pencil", "A listener"], ["Choose a fear.", "Think of a kind person or idea that helps.", "Write beginning, middle and end.", "Tell it aloud with expression."]),
    CHK(tf("We should listen kindly when someone tells a story.", true, { hint: "Think of respect.", why: "Kind listening helps storytellers.", tag: "tell.chk2" })),
    SAY("Let us remember. Plan a fear and a fix. Tell it in order. Listen kindly.", SUM("Plan a fear and a fix", "Tell it beginning, middle, end", "Listen kindly")),
    GLOSS({ fear: "A scared feeling about something.", fix: "Something that solves a problem.", dua: "A prayer or special words said to Allah.", retell: "To tell a story again in your own words.", expression: "Using your voice to show feeling." }),
  ],
  mini: [
    mc("What goes in the middle of a story?", "The problem and how it changes", ["Only the title", "The page number"], { hint: "Think about plot.", why: "The middle is where the problem happens and changes." }),
    tf("A story needs a problem and a fix.", true, { hint: "Think about Plop.", why: "Stories have a problem and a fix." }),
    mc("How should we read our story aloud?", "With expression", ["In a flat voice", "As fast as possible"], { hint: "Show feeling.", why: "Expression makes it interesting." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Omar and the night light", backdrop: "home", caption: "Omar thinks of Plop when his night light flickers.",
  scenes: [
    { caption: "Bedtime.", say: "It is bedtime. Omar's night light flickers.",
      items: [{ id: "o", emoji: "👦", label: "Omar", x: 30, y: 58, size: 3 }, { id: "l", emoji: "💡", x: 72, y: 40, size: 2, anim: "pulse" }] },
    { caption: "Dark.", say: "The room goes dark. Omar feels a little scared.",
      items: [{ id: "o", emoji: "😟", x: 50, y: 54, size: 3 }] },
    { caption: "Plop.", say: "He thinks of Plop, the owl afraid of the dark.",
      items: [{ id: "p", emoji: "🦉", label: "Plop", x: 50, y: 54, size: 3, enter: "pop" }] },
    { caption: "Kind people.", say: "Plop met kind people. They showed him good things about the dark.",
      items: [{ id: "p", emoji: "🦉", x: 30, y: 54, size: 3 }, { id: "k", emoji: "🤝", x: 72, y: 54, size: 3 }] },
    { caption: "Stars.", say: "Omar looks at the window. He sees the stars.",
      items: [{ id: "s", emoji: "⭐", x: 50, y: 30, size: 3, effect: "sparkle" }] },
    { caption: "Breathing.", say: "He takes a slow, deep breath. He says a bedtime dua.",
      items: [{ id: "o", emoji: "😌", x: 50, y: 54, size: 3 }] },
    { caption: "Cosy.", say: "The dark feels soft and cosy. He is not afraid.",
      items: [{ id: "o", emoji: "😴", x: 40, y: 58, size: 3 }, { id: "m", emoji: "🌙", x: 75, y: 28, size: 2, anim: "float" }] },
    { caption: "Goodnight.", say: "Omar sleeps. The dark can be kind, just like Plop learned.",
      items: [{ id: "p", emoji: "🦉", x: 50, y: 54, size: 3, effect: "glow" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- meet (q1-q8)
  Q("meet", "recall", "owl.character", mc("Which one is a character in the story?", "Plop the baby barn owl", ["A tall dark tree", "The night sky"], { hint: "A character is a person or animal.", why: "Plop is an animal character." }),
    mc("Who is the main character?", "Plop", ["The moon", "The forest"], { hint: "Who is the story about?", why: "Plop is the main character." })),
  Q("meet", "reason", "owl.never_afraid", mc("Sam says an owl should never be afraid. Is he right?", "No, any animal or person can feel afraid", ["Yes, owls are never scared", "Yes, only people feel afraid"], { hint: "Think of Plop.", why: "Everyone feels scared sometimes, even owls." }),
    mc("Hana says a baby owl cannot feel scared. Is she right?", "No, even a baby owl can be scared", ["Yes, babies are never scared", "Yes, owls have no feelings"], { hint: "Think of Plop.", why: "A baby owl can feel scared." })),
  Q("meet", "recall", "owl.setting", mc("What is the setting of the story?", "A tree in a forest at night", ["A shop at noon", "A beach in summer"], { hint: "Where and when?", why: "The story happens in a forest tree at night." }),
    mc("Which tells us the setting?", "At night, in a tree", ["Plop is scared", "Kind people help"], { hint: "Where and when?", why: "A tree at night is the place and time." })),
  Q("meet", "recall", "owl.nocturnal", mc("What does nocturnal mean?", "Awake at night and asleep in the day", ["Awake only in winter", "Always asleep"], { hint: "Think of owls.", why: "Nocturnal animals are active at night." }),
    mc("Which animal is nocturnal?", "An owl", ["A hen", "A cow"], { hint: "Think of Plop.", why: "Owls are nocturnal." })),
  Q("meet", "reason", "owl.no_problem", mc("Layla says a story has no problem. Is she right?", "No, stories have a problem to solve", ["Yes, stories are only happy", "Yes, nothing goes wrong"], { hint: "What is Plop afraid of?", why: "Most stories have a problem." }),
    mc("Mira says a story needs no problem. Is she right?", "No, the problem makes the story interesting", ["Yes, no problem is best", "Yes, only the ending matters"], { hint: "Think about Plop.", why: "The problem drives the story." })),
  Q("meet", "apply", "owl.owl_tap", hot("Tap the owl.", [["🦉", "Plop", 22, 50], ["🐕", "dog", 50, 50], ["🐈", "cat", 78, 50]], ["Plop"], { labels: true, hint: "He lives in a tree.", why: "Plop is an owl." }),
    hot("Tap the setting for the story.", [["🌳", "a tree at night", 22, 50], ["🏖️", "a beach", 50, 50], ["🛒", "a shop", 78, 50]], ["a tree at night"], { labels: true, hint: "Where and when?", why: "The story happens in a tree at night." })),
  Q("meet", "recall", "owl.name_st", st("What is the name of the little owl in the story?", ["Plop", "plop"], { hint: "It sounds like a splash.", why: "The little owl is called Plop." }),
    st("What kind of owl is Plop?", ["barn owl", "a barn owl", "barn"], { hint: "It lives near farms and barns.", why: "Plop is a barn owl." })),
  Q("meet", "recall", "owl.scares", mc("What is Plop afraid of?", "The dark", ["Flowers", "Water"], { hint: "It is the title.", why: "Plop is afraid of the dark." }),
    mc("What problem does Plop have?", "He is scared of the dark", ["He is too heavy", "He has lost his mum"], { hint: "It is in the title.", why: "His problem is fear of the dark." })),
  // ----- predict (q9-q16)
  Q("predict", "apply", "owl.owls_sld", sld("Plop's tree has 5 owls. 2 fly away. Slide to show how many owls stay.", { min: 0, max: 8, unit: "owls" }, 3, 0, { hint: "5 take away 2.", why: "5 - 2 = 3 owls." }),
    sld("A forest tree has 6 owls. 4 fly away. Slide to show how many owls stay.", { min: 0, max: 8, unit: "owls" }, 2, 0, { hint: "6 take away 4.", why: "6 - 4 = 2 owls." })),
  Q("predict", "reason", "owl.right", mc("Aisha says all predictions must be right. Is she right?", "No, a prediction is a clever guess and can be wrong", ["Yes, predictions are always right", "Yes, wrong guesses are banned"], { hint: "It is a guess.", why: "A prediction can be wrong." }),
    mc("Ali says a prediction that does not come true is silly. Is he right?", "No, it was still a clever guess from clues", ["Yes, it was silly", "Yes, never guess"], { hint: "Think about clues.", why: "Predictions can be wrong and still clever." })),
  Q("predict", "apply", "owl.order", ord("Put the story events in order.", ["Plop is afraid", "Plop meets kind people", "Plop learns the dark is kind", "Plop feels brave"], { hint: "Start with the problem.", why: "Problem, helpers, learning, then feeling brave." }),
    ord("Put the events in order.", ["Omar sees the light flicker", "He feels scared", "He thinks of Plop", "He feels calm"], { hint: "Start with the light.", why: "Flicker, scared, Plop, calm." })),
  Q("predict", "apply", "owl.check", mc("Hamza predicted Plop would stay afraid. In the story he learns the dark is kind. Was Hamza's guess a good one?", "It was a clever guess, but the story ended differently", ["No, guessing is wrong", "Yes, exactly right"], { hint: "Think about predictions.", why: "A prediction can be wrong and still clever." }),
    mc("Nadia predicted the kind people would help Plop. They did. Was she right?", "Yes, her clue-based guess came true", ["No, she was wrong", "No, guessing is banned"], { hint: "Check the story.", why: "Her prediction matched the story." })),
  Q("predict", "apply", "owl.infer", mc("Plop shivers and hides. How does he feel?", "scared", ["happy", "hungry"], { hint: "Shivering and hiding are clues.", why: "These clues show he is scared." }),
    mc("Plop's eyes go wide and he trembles. How does he feel?", "frightened", ["delighted", "sleepy"], { hint: "Trembling is a clue.", why: "Trembling shows fear." })),
  Q("predict", "reason", "owl.always_scary", mc("Omar says the dark is always scary. Is he right?", "No, the dark can be kind and calm", ["Yes, dark is always scary", "Yes, nobody likes the dark"], { hint: "Think about the stars.", why: "The dark can be cosy and calm." }),
    mc("Sana says nobody ever likes the dark. Is she right?", "No, some people find the dark cosy", ["Yes, everybody hates it", "Yes, the dark is always bad"], { hint: "Think about Plop's helpers.", why: "Some people like the dark." })),
  Q("predict", "apply", "owl.chapters_sld", sld("The book has 7 chapters. Zainab has read 4. Slide to show how many chapters are left.", { min: 0, max: 8, unit: "chapters" }, 3, 0, { hint: "7 take away 4.", why: "7 - 4 = 3 chapters." }),
    sld("The book has 8 chapters. Hamza has read 5. Slide to show how many chapters are left.", { min: 0, max: 10, unit: "chapters" }, 3, 0, { hint: "8 take away 5.", why: "8 - 5 = 3 chapters." })),
  Q("predict", "recall", "owl.scared_st", st("Write a word that means scared.", ["afraid", "frightened", "nervous", "worried", "terrified", "anxious"], { hint: "How does Plop feel?", why: "Afraid and frightened mean scared." }),
    st("Write a word that means brave.", ["bold", "fearless", "courageous", "daring", "strong", "confident"], { hint: "The opposite of scared.", why: "Bold and courageous mean brave." })),
  // ----- brave (q17-q23)
  Q("brave", "apply", "owl.word_match", mat("Match each word to its meaning.", [["afraid", "scared"], ["brave", "not scared"], ["kind", "gentle and caring"]], { hint: "Think about Plop.", why: "Each word has its own meaning." }),
    mat("Join each word to its meaning.", [["nocturnal", "awake at night"], ["cosy", "warm and safe"], ["shiver", "shake with fear or cold"]], { hint: "Think about Plop.", why: "Each word has its own meaning." })),
  Q("brave", "reason", "owl.only_brave", mc("Zainab says only brave people feel scared. Is she right?", "No, everyone feels scared sometimes", ["Yes, only brave people are scared", "Yes, scared people are weak"], { hint: "Think about Plop.", why: "Feeling scared is normal." }),
    mc("Ali says feeling scared means you are weak. Is he right?", "No, feeling scared is normal and brave people feel it too", ["Yes, scared means weak", "Yes, only babies feel scared"], { hint: "Think about courage.", why: "Courage is doing something even when we feel scared." })),
  Q("brave", "apply", "owl.scared_ms", ms("Which two words mean scared? Pick two.", ["frightened", "nervous"], ["bold", "proud"], { hint: "Think of Plop at the start.", why: "Frightened and nervous mean scared." }),
    ms("Pick two words that mean brave.", ["bold", "fearless"], ["afraid", "tearful"], { hint: "Think of Plop at the end.", why: "Bold and fearless mean brave." })),
  Q("brave", "reason", "owl.setting_char", mc("Sam says the setting is the same as the character. Is he right?", "No, the setting is where and when, and the character is who", ["Yes, they are the same", "Yes, characters are places"], { hint: "Think about the tree and Plop.", why: "A setting is a place and time. A character is a person or animal." }),
    mc("Hana says the character is the place. Is she right?", "No, a character is a person or animal", ["Yes, a character is a place", "Yes, a character is a time"], { hint: "Think about Plop.", why: "A character is who is in the story." })),
  Q("brave", "apply", "owl.change_fill", fill("Finish the sentences.", "At first Plop was {b1} of the dark. At the end he felt {b2}.", [["afraid", "bold", "kind"], ["safe", "scared", "lost"]], { hint: "Think about how he changes.", why: "He changes from afraid to safe." }),
    fill("Complete the sentences.", "A {b1} friend helped him. The dark felt {b2}.", [["kind", "scary", "loud"], ["cosy", "angry", "tiny"]], { hint: "Think about the kind helpers.", why: "Kind friends made the dark feel cosy." })),
  Q("brave", "apply", "owl.parts_match", mat("Match each part of the story to what happens.", [["Beginning", "Plop is afraid of the dark"], ["Middle", "He meets kind people"], ["End", "He feels safe"]], { hint: "Think of the plot.", why: "The problem comes first, then help, then the fix." }),
    mat("Join each part of Omar's story to what happens.", [["Beginning", "The night light flickers"], ["Middle", "He thinks of Plop"], ["End", "He feels calm"]], { hint: "Think of the plot.", why: "The problem, the idea, then the fix." })),
  Q("brave", "apply", "owl.dark_tf", tf("The dark can be kind and cosy.", true, { hint: "Think about what Plop learns.", why: "Plop learns that the dark can be kind." }),
    tf("Owls are awake only in the daytime.", false, { hint: "Owls are nocturnal.", why: "Owls are awake at night." })),
  // ----- tell (q24-q30)
  Q("tell", "reason", "owl.same_end", mc("Aisha says the end of the story is the same as the beginning. Is she right?", "No, Plop changes by the end", ["Yes, nothing changes", "Yes, the end repeats the start"], { hint: "How does Plop feel at the end?", why: "Plop starts afraid and ends safe." }),
    mc("Ben says a story ends exactly as it starts. Is he right?", "No, things change in a story", ["Yes, never", "Yes, always"], { hint: "Think about the problem.", why: "Stories show change." })),
  Q("tell", "reason", "owl.talk_fears", mc("Omar says you cannot talk about your fears. Is he right?", "No, talking about fears can help", ["Yes, fears are secret", "Yes, never talk"], { hint: "Think about kind helpers.", why: "Talking to someone kind can help." }),
    mc("Layla says it is silly to tell someone you are scared. Is she right?", "No, a kind person can help you feel better", ["Yes, say nothing", "Yes, it is silly"], { hint: "Think about Plop.", why: "Kind people help." })),
  Q("tell", "apply", "owl.story_ord", ord("Put the story planning steps in order.", ["Choose a fear", "Think of a fix", "Write beginning, middle and end", "Read it aloud"], { hint: "Choose first.", why: "Choose, fix, write, read." }),
    ord("Put the steps in order.", ["Plan my story", "Write the beginning", "Write the middle", "Write the end"], { hint: "Plan first.", why: "Plan, then beginning, middle, end." })),
  Q("tell", "apply", "owl.help_ms", ms("Which two things help us feel braver? Pick two.", ["Talking to a kind friend", "Taking slow deep breaths"], ["Hiding for ever", "Telling nobody"], { hint: "Think about what helped Plop.", why: "Talking and breathing help." }),
    ms("Pick two calm ideas.", ["Thinking of something cosy", "Asking a grown-up to sit with you"], ["Staying awake all night", "Shouting"], { hint: "Think about feeling safe.", why: "Cosy thoughts and company help." })),
  Q("tell", "apply", "owl.fears_tf", tf("Feeling scared is something every person and animal can experience.", true, { hint: "Even owls.", why: "Everyone feels scared sometimes." }),
    tf("Feeling scared means you will always be afraid.", false, { hint: "Plop changed.", why: "Feelings can change." })),
  Q("tell", "apply", "owl.problem_tap", hot("Tap the sentence that tells the problem.", [["1️⃣", "Plop was afraid of the dark.", 22, 50], ["2️⃣", "Plop lived in a tree.", 50, 50], ["3️⃣", "Plop had soft feathers.", 78, 50]], ["Plop was afraid of the dark."], { labels: true, hint: "What goes wrong?", why: "Being afraid is the problem." }),
    hot("Tap the sentence that tells the fix.", [["1️⃣", "A kind friend showed Plop the stars.", 22, 50], ["2️⃣", "Plop was afraid.", 50, 50], ["3️⃣", "It was night.", 78, 50]], ["A kind friend showed Plop the stars."], { labels: true, hint: "What helps?", why: "A kind friend helping is the fix." })),
  Q("tell", "apply", "owl.parts_fill", fill("Finish the sentences about a story.", "A story has a {b1}, a {b2} and an end.", [["beginning", "hat", "page"], ["middle", "door", "spoon"]], { hint: "Think of the three parts.", why: "A story has a beginning, a middle and an end." }),
    fill("Complete the lines about a story.", "The problem happens in the {b1}. It is solved at the {b2}.", [["middle", "title", "cover"], ["end", "front", "top"]], { hint: "Think of the plot.", why: "The problem is in the middle and solved at the end." })),
];

export const topics = [
  topicLesson({
    slug: "english-class-1-the-owl-afraid-of-the-dark", subject: "english", cls: 1, topic: 9, title: "The Owl Who Was Afraid of the Dark",
    summary: "Read and talk about a story where a little owl learns that the dark can be kind.",
    unit: "Topic 9: The Owl Who Was Afraid of the Dark", difficulty: 1,
    objectives: ["Name character, setting and plot", "Predict what happens next", "Explain the theme of facing a fear"],
    success_criteria: ["I can name the character and setting", "I can use clues to predict", "I can say how the dark can be kind"],
    real_life: "Night skies in Lahore and the Lake District, bedtime duas, and calm night routines.",
    standards: [NC("Y2 reading", "Discuss characters, settings and events; make predictions; draw inferences about feelings; link a story's theme to our own lives")],
    warm_up: [
      mc("Which animal is awake at night?", "An owl", ["A hen", "A cow"], { hint: "It says hoot.", why: "Owls are awake at night." }),
      tf("A prediction is a clever guess.", true, { hint: "Use clues.", why: "A prediction is a clever guess." }),
      mc("Which word is the opposite of brave?", "afraid", ["bold", "proud"], { hint: "It is how Plop feels.", why: "Afraid means scared." }),
    ],
    intro: [],
    subs: [meet, predict, brave, tell],
    clip,
    quiz,
  }),
];
