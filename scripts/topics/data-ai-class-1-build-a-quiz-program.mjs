import { SAY, SS, H, T, PHOTO, ACT, MAN, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Computer Science, Data & AI, Class 1 (Zainab, age 7), topic 8: Build a quiz program.
// Story thread: Zainab builds a quiz about the flag of Pakistan, finds a bug and fixes it.
const FLAG = "data-ai-class-1-build-a-quiz-program-1-21b22782.jpg";
const BALLOON = "data-ai-class-1-build-a-quiz-program-2-bf3bbd99.jpg";
const OKM = (label) => ["ok", "✅", 50, 88, 2, "bounce", label];
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });

// ---------------------------------------------------------------------------------------------- 1. learn
const outcomes = {
  id: "outcomes", kind: "learn", title: "Sequences have outcomes",
  blocks: [
    H("Welcome back, young coder!"),
    SAY("Today we build a quiz program. Zainab wants to ask a question about a flag.",
      T("Today's big question: how do we build and improve a program?")),
    SAY("This is the flag of Pakistan. Zainab's quiz asks about the colours of this flag.",
      PHOTO(FLAG, "The green and white flag of Pakistan with a crescent and star, flying in front of mountains", "The flag of Pakistan. Zainab's quiz is about its colours.", "Photo by Burhan Ahmad on Unsplash")),
    H("Stop 1: Read, then predict"),
    SAY("A program is a sequence of blocks. When it runs, something happens. That is the outcome.",
      T("A **sequence** is steps in order. The **outcome** is what happens when it runs.")),
    EXP("Predict the outcome",
      SS("Zainab reads the blocks. Ask a question. Wait. Say the answer.", S("Read the blocks.", ["b1", "🟦", 25, 50, 2, "none", "ask"], ["b2", "🟨", 50, 50, 2, "none", "wait"], ["b3", "🟩", 75, 50, 2, "none", "answer"])),
      SS("She predicts: the sprite will ask, then wait, then answer.", S("Predict.", ["q", "🤔", 50, 40, 3, "pulse", "prediction"])),
      SS("She runs it. The outcome matches her prediction.", S("Run and check.", ["c", "🐱", 40, 50, 3, "bounce"], OKM("same as prediction")))),
    CHK(mc("What is an outcome?", "What happens when a program runs", ["A new sprite", "A kind of block"], { hint: "It comes after you press run.", why: "The outcome is what the program does.", tag: "quiz.outcome" })),
    H("Stop 2: Same result, different blocks"),
    SAY("Two programs can have the same outcome. One uses a loop. One uses extra blocks. Both reach the answer.",
      T("Different blocks can give the same **outcome**.")),
    EXP("Two ways, one outcome",
      SS("Program A has one block that says the flag is green and white.", S("Program A.", ["a", "🟩", 50, 50, 3, "pulse", "one block"])),
      SS("Program B has two blocks. One says green. One says white.", S("Program B.", ["g", "🟩", 35, 50, 3, "pulse", "green"], ["w", "⬜", 65, 50, 3, "pulse", "white"])),
      SS("Both programs tell us the same thing. There is more than one way.", S("Same outcome.", ["g", "🟩", 40, 50, 3], OKM("same outcome")))),
    CHK(tf("Two different programs can have the same outcome.", true, { hint: "Think about A and B.", why: "Different blocks can reach the same outcome.", tag: "quiz.same_outcome" })),
    SAY("Let us remember. Read, predict, then run. There can be more than one way.",
      SUM("An outcome is what happens when a program runs", "Predict before you run", "Different programs can have the same outcome")),
    GLOSS({ sequence: "Steps in a set order.", outcome: "What happens when a program runs.", prediction: "A guess about what will happen.", program: "Blocks that tell a computer what to do.", quiz: "Questions with answers.", sprite: "A character a program can move." }),
  ],
  mini: [
    mc("What do we do before we run a program?", "Predict what will happen", ["Switch it off", "Delete it"], { hint: "Make a guess first.", why: "We predict first, then run." }),
    tf("A sequence is steps in a set order.", true, { hint: "One after another.", why: "A sequence runs in order." }),
    mc("What does outcome mean?", "What the program does", ["The name of a sprite", "The colour of the screen"], { hint: "It comes after running.", why: "The outcome is what happens." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const twosprite = {
  id: "twosprite", kind: "try", title: "Build a two-sprite quiz",
  blocks: [
    H("Stop 1: A question sprite"),
    SAY("Zainab makes a teacher sprite. It asks, What colours are on the flag of Pakistan?",
      T("A **question sprite** asks the question.")),
    EXP("The teacher sprite",
      SS("The teacher sprite appears. A block makes it say the question.", S("Ask.", ["t", "👩‍🏫", 30, 50, 3, "bounce", "teacher"], ["b", "💬", 70, 40, 3, "pulse", "question"])),
      SS("A wait block makes it pause. The program waits for an answer.", S("Wait.", ["t", "👩‍🏫", 30, 50, 3], ["w", "⏳", 70, 50, 3, "pulse", "wait"])),
      SS("Now the answer sprite can speak.", S("Over to the answer sprite.", ["t", "👩‍🏫", 30, 50, 3], ["a", "🐱", 70, 50, 3, "bounce", "answer sprite"]))),
    MAN("Build the quiz", "Put the 4 blocks into the quiz program in order.", "🟦", 4, ["In the program", "Waiting"]),
    CHK(mc("What does the question sprite do?", "Asks the question", ["Gives the answer", "Turns off the quiz"], { hint: "It speaks first.", why: "The question sprite asks.", tag: "quiz.question" })),
    H("Stop 2: An answer sprite"),
    SAY("A second sprite is the answer sprite. It waits, then says, Green and white.",
      T("An **answer sprite** gives the answer.")),
    EXP("The answer sprite",
      SS("The answer sprite waits for the question to finish.", S("Wait for the question.", ["a", "🐱", 70, 50, 3, "none"], ["t", "👩‍🏫", 30, 50, 3])),
      SS("Then it says, Green and white. The sprites take turns.", S("Answer.", ["a", "🐱", 70, 50, 3, "bounce"], ["s", "💬", 50, 30, 3, "pulse", "green and white"])),
      SS("Two sprites talking in order makes a quiz.", S("A two-sprite quiz.", ["t", "👩‍🏫", 30, 50, 3], ["a", "🐱", 70, 50, 3], OKM("a quiz")))),
    SAY("Now you try. Ask a grown-up to open a blocks program on a tablet.",
      ACT("Build a quiz", ["A tablet with a blocks coding app", "A grown-up"], ["Add two sprites. Give each some blocks.", "Make the first one ask a question.", "Make the second one answer. Run it and check."])),
    CHK(tf("The answer sprite speaks after the question.", true, { hint: "They take turns.", why: "The answer comes after the question.", tag: "quiz.order" })),
    SAY("Let us remember. A quiz needs a question and an answer. Sprites take turns.",
      SUM("A question sprite asks", "An answer sprite replies", "They take turns in order")),
    GLOSS({ "question sprite": "The sprite that asks the question.", "answer sprite": "The sprite that gives the answer.", wait: "A block that makes the program pause.", turns: "Going one after another.", sprites: "Characters a program can move." }),
  ],
  mini: [
    mc("How many sprites are in our quiz?", "Two", ["One", "Ten"], { hint: "A question and an answer.", why: "A question sprite and an answer sprite." }),
    tf("Both sprites speak at exactly the same moment.", false, { hint: "They take turns.", why: "They speak in order." }),
    mc("Which block makes a sprite pause?", "Wait", ["Grow", "Turn"], { hint: "Think about stopping.", why: "Wait makes the program pause." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const bugs = {
  id: "bugs", kind: "play", title: "Bug or feature?",
  blocks: [
    H("Stop 1: Find the bug"),
    SAY("Zainab runs her quiz. The teacher asks the question. But the answer never appears.",
      T("A **bug** is a mistake in a program.")),
    EXP("A missing answer",
      SS("She runs the quiz. The teacher asks. Nothing answers.", S("No answer.", ["t", "👩‍🏫", 30, 50, 3], ["q", "❓", 70, 40, 3, "pulse", "silence"])),
      SS("She looks at the answer sprite. It has no say block.", S("Missing block.", ["a", "🐱", 50, 50, 3], ["b", "🐛", 75, 30, 2, "bounce", "bug"])),
      SS("She adds the say block. Now the quiz works.", S("Fixed.", ["a", "🐱", 50, 50, 3, "bounce"], OKM("bug fixed")))),
    CHK(mc("The answer sprite does not speak. What could be missing?", "A say block", ["A new background", "A second screen"], { hint: "It has no words.", why: "Without a say block, it cannot speak.", tag: "quiz.missing_block" })),
    H("Stop 2: Fix and run again"),
    SAY("Fix one thing at a time. Then run it again. Checking helps us find more bugs.",
      T("**Test** after each fix.")),
    SAY("First a memory game. Then spot the wrong order.",
      T("Play the memory game. Then check the order.")),
    BRAIN("memory_match", "Quiz pairs", "Find the pairs.", ["❓", "💬", "🐛", "✅"]),
    CHK(ord("The quiz is muddled. Put the blocks in the right order.", ["Ask the question", "Wait", "Say the answer"], { hint: "Ask, wait, answer.", why: "A quiz asks, waits and then answers.", tag: "quiz.fix_order" })),
    SAY("Let us remember. Bugs are mistakes. Fix, then test again.",
      SUM("A bug is a mistake in a program", "Fix one thing at a time", "Test again after a fix")),
    GLOSS({ bug: "A mistake in a program.", test: "Run it to see if it works.", fix: "To make something right.", muddled: "In the wrong order.", feature: "Something a program does on purpose." }),
  ],
  mini: [
    mc("What is a bug?", "A mistake in a program", ["A new sprite", "A kind of sound"], { hint: "Not an insect.", why: "A bug is a mistake." }),
    tf("We should test again after we fix a bug.", true, { hint: "Did the fix work?", why: "Testing checks the fix." }),
    mc("A quiz asks, then answers, then waits. What is wrong?", "The order of the blocks", ["The sprite colour", "The tablet"], { hint: "Think about the sequence.", why: "The blocks are in the wrong order." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const mine = {
  id: "mine", kind: "use", title: "Design your own quiz",
  blocks: [
    H("Stop 1: Draw the design"),
    SAY("Zainab wants a quiz about Eid. First she draws a design on paper.",
      T("**Design** first. Draw the sprites and what they say.")),
    SAY("She draws a question sprite and an answer sprite. She writes what each will say.",
      T("A design is a plan.")),
    SAY("A design helps her remember what to build. It also helps a friend understand.",
      ACT("Design a quiz", ["Paper and a pencil", "A grown-up"], ["Draw two sprites. Write the question for the first.", "Write the answer for the second.", "Draw the order the blocks will go in."])),
    SAY("She checks the design with her mum. Then she is ready to build.",
      PHOTO(BALLOON, "A single yellow hot air balloon high in a clear blue sky", "A balloon to celebrate a finished quiz.", "Photo by Waldemar Brandt on Unsplash")),
    CHK(ord("Put the quiz-making steps in order.", ["Draw a design", "Build the blocks", "Test the quiz", "Improve it"], { hint: "Design comes first.", why: "Design, build, test, then improve.", tag: "quiz.make_order" })),
    H("Stop 2: Evaluate and improve"),
    SAY("A friend tries the quiz. They say the answer is too quick. Zainab adds a wait block.",
      T("**Evaluate** means to check how good something is.")),
    EXP("Evaluate and improve",
      SS("A friend plays the quiz. They find it fun but too fast.", S("A friend plays.", ["f", "🧒", 30, 50, 3, "bounce"], ["q", "💬", 70, 40, 3, "pulse"])),
      SS("Zainab adds a wait block so the answer appears later.", S("Add a wait.", ["w", "⏳", 50, 50, 3, "pulse", "wait"])),
      SS("The quiz is better now. She shares it with kind words.", S("Better.", ["z", "👧", 50, 50, 3, "bounce"], OKM("improved")))),
    CHK(mc("What does evaluate mean?", "To check how good something is", ["To delete it", "To paint it"], { hint: "Think about a friend trying it.", why: "To evaluate is to check how good it is.", tag: "quiz.evaluate" })),
    SAY("Let us remember. Design, build, test and improve with a friend.",
      SUM("Design before building", "Test with a friend", "Evaluate and improve")),
    GLOSS({ design: "A plan for what you will build.", evaluate: "To check how good something is.", improve: "To make something better.", feedback: "Kind comments to help someone.", share: "To show your work to others." }),
  ],
  mini: [
    mc("What comes first when making a quiz?", "A design", ["A bug", "A trophy"], { hint: "Plan before building.", why: "A design comes first." }),
    tf("A friend's feedback can help you improve.", true, { hint: "Listen kindly.", why: "Feedback helps improvement." }),
    mc("Which is kind feedback?", "I like it. Maybe add a sound", ["That is bad", "Do it again"], { hint: "Be helpful.", why: "Kind feedback is helpful." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Zainab's flag quiz", backdrop: "classroom", caption: "Zainab builds a flag quiz, finds a bug and fixes it.",
  scenes: [
    { caption: "A quiz idea.", say: "Zainab wants to make a quiz about the flag of Pakistan.",
      items: [{ id: "z", emoji: "👧", label: "Zainab", x: 25, y: 56, size: 3, enter: "walk_right" }, { id: "f", emoji: "🇵🇰", x: 72, y: 45, size: 3, enter: "pop" }] },
    { caption: "A design.", say: "First she draws a design. Two sprites will talk.",
      items: [{ id: "d", emoji: "📝", x: 30, y: 50, size: 3 }, { id: "t", emoji: "👩‍🏫", x: 60, y: 50, size: 2 }, { id: "a", emoji: "🐱", x: 85, y: 50, size: 2 }] },
    { caption: "Predict.", say: "She predicts: ask, wait, answer. That is the outcome.",
      items: [{ id: "q", emoji: "🤔", x: 50, y: 40, size: 3, anim: "pulse" }] },
    { caption: "Run it.", say: "She runs it. The teacher asks the question.",
      items: [{ id: "t", emoji: "👩‍🏫", x: 30, y: 50, size: 3, anim: "bounce" }, { id: "b", emoji: "💬", label: "colours?", x: 70, y: 40, size: 3 }] },
    { caption: "A bug!", say: "No answer comes. There is a bug.",
      items: [{ id: "a", emoji: "🐱", x: 40, y: 50, size: 3 }, { id: "b", emoji: "🐛", label: "bug", x: 72, y: 35, size: 2, anim: "bounce" }] },
    { caption: "Fix it.", say: "She adds a say block to the answer sprite.",
      items: [{ id: "s", emoji: "🟩", label: "say", x: 35, y: 50, size: 3, enter: "grow" }, { id: "a", emoji: "🐱", x: 70, y: 50, size: 3, effect: "sparkle" }] },
    { caption: "It works!", say: "Now the cat says, Green and white!",
      items: [{ id: "a", emoji: "🐱", x: 40, y: 50, size: 3, anim: "bounce" }, { id: "g", emoji: "🟩", x: 70, y: 50, size: 3 }, { id: "w", emoji: "⬜", x: 85, y: 50, size: 2 }] },
    { caption: "Share it.", say: "Zainab shares the quiz and asks for kind feedback.",
      items: [{ id: "z", emoji: "👧", x: 28, y: 56, size: 3, anim: "bounce" }, { id: "h", emoji: "👏", x: 72, y: 45, size: 3, effect: "hearts" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- outcomes (q1-q8)
  Q(mc("What do we call what happens when a program runs?", "The outcome", ["The background", "The cable"], { hint: "It is the result.", why: "The outcome is what the program does.", tag: "quiz.outcome" }), "outcomes", "recall",
    [mc("What do we call the result of running a program?", "The outcome", ["The battery", "The keyboard"], { hint: "It is the result.", why: "The outcome is the result of running a program.", tag: "quiz.outcome" })]),
  Q(mc("What is a prediction?", "A guess about what a program will do", ["A mistake", "A background"], { hint: "We make it before running.", why: "A prediction is a guess before running.", tag: "quiz.predict" }), "outcomes", "recall",
    [mc("When do we make a prediction?", "Before we run the program", ["After we delete it", "While it is switched off for ever"], { hint: "It is a guess.", why: "We predict before we run.", tag: "quiz.predict" })]),
  Q(tf("A sequence is a list of steps in a set order.", true, { hint: "Think about the quiz blocks.", why: "A sequence runs in order.", tag: "quiz.sequence" }), "outcomes", "recall",
    [tf("A sequence runs all its steps in a random order.", false, { hint: "Think about the quiz blocks.", why: "A sequence runs in a set order.", tag: "quiz.sequence" })]),
  Q(mat("Match each word to its meaning.", [["Outcome", "What happens when it runs"], ["Prediction", "A guess before running"], ["Sequence", "Steps in order"]], { hint: "Think back to the stops.", why: "Each word has its own meaning.", tag: "quiz.vocab" }), "outcomes", "recall",
    [mat("Join each word to what it means.", [["Bug", "A mistake in a program"], ["Design", "A plan before building"], ["Test", "Running to check it works"]], { hint: "Think back to the stops.", why: "Each word has its own meaning.", tag: "quiz.vocab" })]),
  Q(hot("Tap the start block.", [["🏁", "Start block", 22, 50], ["💬", "Say block", 50, 50], ["🔊", "Sound block", 78, 50]], ["Start block"], { labels: true, hint: "It comes first.", why: "A start block begins the program.", tag: "quiz.start" }), "outcomes", "recall",
    [hot("Tap the block that makes a sprite speak.", [["🏁", "Start block", 22, 50], ["💬", "Say block", 50, 50], ["⏳", "Wait block", 78, 50]], ["Say block"], { labels: true, hint: "It shows words.", why: "A say block makes a sprite speak.", tag: "quiz.say" })]),
  Q(mc("Sam says there is only one set of blocks that can make the quiz work. Is he right?", "No. Different blocks can give the same outcome", ["Yes, only one way", "Yes, the first idea is always the only one"], { hint: "Think about programs A and B.", why: "More than one program can reach the same outcome.", tag: "quiz.reason_one_way" }), "outcomes", "reason",
    [mc("Ben says there is only one way to build a quiz about Eid. Is he right?", "No. There are many ways to build it", ["Yes, only one", "Yes, only Zainab's"], { hint: "Think about programs A and B.", why: "There can be many ways to get the same result.", tag: "quiz.reason_one_way" })]),
  Q(mc("Aisha says there is no need to predict. She just runs the program. Is she right?", "No. Predicting helps us spot mistakes", ["Yes, predicting is useless", "Yes, running is slower than guessing"], { hint: "What if the outcome differs from your guess?", why: "Predicting helps us notice bugs.", tag: "quiz.reason_predict" }), "outcomes", "reason",
    [mc("Mina says predicting is a waste of time. Is she right?", "No. A prediction helps us find bugs", ["Yes, always", "Yes, bugs fix themselves"], { hint: "What if the outcome differs from your guess?", why: "Predicting helps us notice bugs.", tag: "quiz.reason_predict" })]),
  Q(fill("Finish the sentences about programs.", "A {b1} is a set of steps in order. What it does is the {b2}.", [["sequence", "sprite", "cable"], ["outcome", "bug", "screen"]], { hint: "Think about the stops.", why: "A sequence is steps in order. The outcome is what happens.", tag: "quiz.vocab_fill" }), "outcomes", "recall",
    [fill("Complete the sentences about a prediction.", "A {b1} is a guess before running. Then we {b2} the program.", [["prediction", "bug", "cable"], ["run", "eat", "paint"]], { hint: "Guess then try.", why: "We predict, then run.", tag: "quiz.vocab_fill" })]),
  // ----- twosprite (q9-q16)
  Q(mc("The blocks say: ask the question, wait, then say Green and white. What is the last thing said?", "Green and white", ["The question", "Nothing"], { hint: "Read in order.", why: "The last block says Green and white.", tag: "quiz.read_blocks" }), "twosprite", "apply",
    [mc("The blocks say: say hello, wait, then say goodbye. What is the last thing said?", "Goodbye", ["Hello", "Nothing"], { hint: "Read in order.", why: "The last block says goodbye.", tag: "quiz.read_blocks" })]),
  Q(ord("Put these quiz blocks in order.", ["Ask the question", "Wait for the answer", "Say well done"], { hint: "Question first.", why: "Ask, wait, then say well done.", tag: "quiz.block_order" }), "twosprite", "apply",
    [ord("Put these blocks in order for a quiz about a bus.", ["Ask what colour the bus is", "Wait", "Say red"], { hint: "Question first.", why: "Ask, wait, then answer.", tag: "quiz.block_order" })]),
  Q(num("A quiz has 3 questions. Each question needs 2 blocks. How many blocks is that in all?", 6, { hint: "2 + 2 + 2.", why: "3 questions of 2 blocks make 6 blocks.", tag: "quiz.count_blocks" }), "twosprite", "apply",
    [num("A quiz has 4 questions. Each question needs 2 blocks. How many blocks is that in all?", 8, { hint: "2 + 2 + 2 + 2.", why: "4 questions of 2 blocks make 8 blocks.", tag: "quiz.count_blocks" })]),
  Q(tf("Two sprites can take turns talking in one program.", true, { hint: "Think about teacher and answer.", why: "Sprites can take turns.", tag: "quiz.two_sprites" }), "twosprite", "recall",
    [tf("A program can only ever have one sprite.", false, { hint: "Think about teacher and answer.", why: "A program can have many sprites.", tag: "quiz.two_sprites" })]),
  Q(sld("A quiz has 5 questions. Sam has answered 3. Slide to show how many are left.", { min: 0, max: 8 }, 2, 0, { hint: "5 take away 3.", why: "5 - 3 = 2 questions left.", tag: "quiz.questions_left" }), "twosprite", "apply",
    [sld("A quiz has 6 questions. Aisha has answered 4. Slide to show how many are left.", { min: 0, max: 8 }, 2, 0, { hint: "6 take away 4.", why: "6 - 4 = 2 questions left.", tag: "quiz.questions_left" })]),
  Q(mc("Which block would add a sound to the quiz?", "A play sound block", ["A wait block", "A grow block"], { hint: "Think about noise.", why: "A sound block plays a noise.", tag: "quiz.sound" }), "twosprite", "apply",
    [mc("Which block makes the quiz pause for a moment?", "A wait block", ["A grow block", "A sound block"], { hint: "Think about stopping.", why: "A wait block pauses the program.", tag: "quiz.wait" })]),
  Q(mc("Aisha says two sprites cannot talk to each other. Is she right?", "No. They can take turns using blocks", ["Yes, sprites never talk", "Yes, only one can speak ever"], { hint: "Think about the teacher and the cat.", why: "Sprites can take turns talking.", tag: "quiz.reason_talk" }), "twosprite", "reason",
    [mc("Omar says a sprite cannot answer another sprite. Is he right?", "No. Blocks let sprites answer each other", ["Yes, never", "Yes, only the teacher speaks"], { hint: "Think about the teacher and the cat.", why: "Blocks can make sprites reply to each other.", tag: "quiz.reason_talk" })]),
  Q(ms("Which two could be sprites in a quiz? Pick two.", ["A teacher sprite", "An answer sprite"], ["A plug", "A keyboard key"], { hint: "Think about characters.", why: "A teacher and an answer sprite are characters.", tag: "quiz.sprite_pick" }), "twosprite", "apply",
    [ms("Which two sprites could play a flag quiz? Pick two.", ["A question sprite", "A cat answer sprite"], ["A power cable", "A mouse pad"], { hint: "Think about characters.", why: "A question sprite and an answer sprite are characters.", tag: "quiz.sprite_pick" })]),
  // ----- bugs (q17-q23)
  Q(mat("Match each problem to its fix.", [["No answer appears", "Add a say block"], ["Answer comes too early", "Add a wait block"], ["Sprite faces the wrong way", "Change the turn block"]], { hint: "Think about each bug.", why: "Each fix matches the bug.", tag: "quiz.bug_fix" }), "bugs", "apply",
    [mat("Pair each bug with its fix.", [["No sound plays", "Add a sound block"], ["Quiz never starts", "Add a start block"], ["Sprite too small", "Add a grow block"]], { hint: "Think about each bug.", why: "Each fix matches the bug.", tag: "quiz.bug_fix" })]),
  Q(tf("The first try at a program always works perfectly.", false, { hint: "Think about the missing say block.", why: "Programs often have bugs on the first try.", tag: "quiz.first_try" }), "bugs", "recall",
    [tf("Running a program again helps us find bugs.", true, { hint: "Think about testing.", why: "Running and testing helps us find bugs.", tag: "quiz.first_try" })]),
  Q(mc("The quiz asks a question but never shows the answer. What is missing?", "An answer block", ["A new tablet", "A second teacher"], { hint: "Think about the answer sprite.", why: "The answer sprite needs a block to say the answer.", tag: "quiz.answer_missing" }), "bugs", "apply",
    [mc("The quiz shows the answer but never asks the question. What is missing?", "A question block", ["A new tablet", "A second answer"], { hint: "Think about the teacher sprite.", why: "The question sprite needs a block to ask.", tag: "quiz.question_missing" })]),
  Q(mc("Zainab says a bug means she is bad at coding. Is she right?", "No. Every coder makes bugs and fixes them", ["Yes, bugs mean you are bad", "Yes, good coders never have bugs"], { hint: "Think about the quiz she fixed.", why: "Bugs are normal. We learn by fixing them.", tag: "quiz.reason_bug" }), "bugs", "reason",
    [mc("Hana says finding a bug means her program is useless. Is she right?", "No. She can fix the bug and the program works", ["Yes, useless", "Yes, delete it"], { hint: "Think about the quiz she fixed.", why: "A bug is fixed and the program improves.", tag: "quiz.reason_bug" })]),
  Q(fill("Finish the sentences about bugs.", "We {b1} a program to find bugs. Then we {b2} them.", [["test", "hide", "paint"], ["fix", "eat", "grow"]], { hint: "Try it, then repair.", why: "We test to find bugs and fix them.", tag: "quiz.test_fill" }), "bugs", "apply",
    [fill("Complete the sentences about checking.", "After a fix, we {b1} the program {b2}.", [["run", "sing", "hide"], ["again", "never", "blue"]], { hint: "Did the fix work?", why: "We run it again after a fix.", tag: "quiz.test_fill" })]),
  Q(hot("Tap the extra block that does not belong in the quiz.", [["❓", "Ask the question", 22, 50], ["💃", "Dance on the table", 50, 50], ["💬", "Say the answer", 78, 50]], ["Dance on the table"], { labels: true, hint: "Which is not part of the quiz?", why: "Dancing is not part of a quiz about a flag.", tag: "quiz.extra_block" }), "bugs", "apply",
    [hot("Tap the block that does not help the quiz.", [["❓", "Ask the question", 22, 50], ["⏳", "Wait", 50, 50], ["🎈", "Pop a balloon", 78, 50]], ["Pop a balloon"], { labels: true, hint: "Which is not part of the quiz?", why: "Popping a balloon is not part of the quiz.", tag: "quiz.extra_block" })]),
  Q(mc("Sam says testing once finds every bug at the same time. Is he right?", "No. Fixing one bug can show another", ["Yes, one test finds all", "Yes, bugs always appear together"], { hint: "Think about the next run.", why: "We test again because fixes can reveal new bugs.", tag: "quiz.reason_test_all" }), "bugs", "reason",
    [mc("Layla says one test finds every bug. Is she right?", "No. We test again after each fix", ["Yes, one is always enough", "Yes, bugs show once"], { hint: "Think about the next run.", why: "New bugs can appear after fixes.", tag: "quiz.reason_test_all" })]),
  // ----- mine (q24-q30)
  Q(ord("Put the steps for making a quiz in order.", ["Draw a design", "Build the quiz", "Test it with a friend", "Improve it"], { hint: "Design first.", why: "Design, build, test, then improve.", tag: "quiz.make_steps" }), "mine", "apply",
    [ord("Put these steps for an Eid quiz in order.", ["Plan the questions", "Snap the blocks together", "Try it out", "Make changes"], { hint: "Plan first.", why: "Plan, build, try, then change.", tag: "quiz.make_steps" })]),
  Q(sld("A quiz plan has 4 sprites. 3 are built. Slide to show how many are left to build.", { min: 0, max: 6 }, 1, 0, { hint: "4 take away 3.", why: "4 - 3 = 1 sprite left.", tag: "quiz.sprites_left" }), "mine", "apply",
    [sld("A quiz plan has 6 sprites. 4 are built. Slide to show how many are left to build.", { min: 0, max: 8 }, 2, 0, { hint: "6 take away 4.", why: "6 - 4 = 2 sprites left.", tag: "quiz.sprites_left" })]),
  Q(mc("Omar says a design is a waste of time. Is he right?", "No. A design helps you know what to build", ["Yes, never design", "Yes, designs are slow"], { hint: "Think about the paper plan.", why: "A design saves time and shows what to build.", tag: "quiz.reason_design" }), "mine", "reason",
    [mc("Sana says she can build a quiz without any plan. Is she right?", "She can try, but a plan makes it easier", ["Yes, plans are always useless", "No, nobody can build without a plan ever"], { hint: "Think about the paper plan.", why: "A design makes building easier.", tag: "quiz.reason_design" })]),
  Q(mc("Layla says more blocks always mean a better program. Is she right?", "No. A good program uses the blocks it needs", ["Yes, more is always better", "Yes, a long program is always best"], { hint: "Think about programs A and B.", why: "Better programs are clear, not just longer.", tag: "quiz.reason_more" }), "mine", "reason",
    [mc("Ravi says the longest program must be the best. Is he right?", "No. A short program can work just as well", ["Yes, longest wins", "Yes, short ones never work"], { hint: "Think about programs A and B.", why: "Length does not make a program better.", tag: "quiz.reason_more" })]),
  Q(mc("Omar says a quiz needs no answer sprite. Is he right?", "No. Something must give the answer", ["Yes, quizzes only ask", "Yes, answers appear by magic"], { hint: "Think about the cat.", why: "A quiz needs an answer as well as a question.", tag: "quiz.reason_answer" }), "mine", "reason",
    [mc("Hana says a quiz with only questions is complete. Is she right?", "No. It also needs answers", ["Yes, only questions matter", "Yes, answers are optional"], { hint: "Think about the cat.", why: "A quiz needs an answer as well.", tag: "quiz.reason_answer" })]),
  Q(num("A quiz has 2 sprites and 5 blocks on each. How many blocks is that in all?", 10, { hint: "5 + 5.", why: "2 sprites with 5 blocks each make 10 blocks.", tag: "quiz.blocks_total" }), "mine", "apply",
    [num("A quiz has 3 sprites and 4 blocks on each. How many blocks is that in all?", 12, { hint: "4 + 4 + 4.", why: "3 sprites with 4 blocks each make 12 blocks.", tag: "quiz.blocks_total" })]),
  Q(ms("Which two questions help you evaluate a program? Pick two.", ["Did it work?", "What could be better?"], ["Who has the biggest tablet?", "What colour is the table?"], { hint: "Think about checking quality.", why: "Asking if it worked and what to improve helps evaluate.", tag: "quiz.evaluate_qs" }), "mine", "apply",
    [ms("Which two things help you improve a quiz? Pick two.", ["Kind feedback", "Testing it again"], ["Hiding it", "Deleting all the blocks"], { hint: "Think about the friend.", why: "Feedback and testing improve a quiz.", tag: "quiz.evaluate_qs" })]),
];

export const topics = [
  topicLesson({
    slug: "data-ai-class-1-build-a-quiz-program", subject: "data-ai", cls: 1, topic: 8, title: "Build a Quiz Program",
    summary: "Predict, build and improve a short program that asks and answers a quiz question.",
    unit: "Topic 8: Build a quiz program", difficulty: 1,
    objectives: ["Predict what a sequence does", "Build a program with several sprites", "Judge and improve a program"],
    success_criteria: ["I can predict the outcome of a sequence", "I can build a quiz with two sprites", "I can find a bug and improve my program"],
    real_life: "Making a quiz for the family about Eid, flags or buses.",
    standards: [
      { framework: "nc_england", code: "KS1 algorithms", text: "Create and debug simple programs; use logical reasoning to predict the behaviour of simple programs" },
      { framework: "csta", code: "1A-AP-14", text: "Debug errors in an algorithm or program" },
    ],
    warm_up: [
      mc("What is a sprite?", "A character a program can move", ["A cable", "A keyboard"], { hint: "Think about the cat.", why: "A sprite is a character." }),
      mc("What is a bug?", "A mistake in a program", ["A new sprite", "A flower"], { hint: "Not an insect.", why: "A bug is a mistake." }),
      num("What is 7 + 3?", 10, { hint: "Count on from 7.", why: "7 + 3 = 10." }),
    ],
    intro: [],
    subs: [outcomes, twosprite, bugs, mine],
    clip,
    quiz,
  }),
];
