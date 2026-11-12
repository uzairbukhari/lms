import { SAY, SS, H, T, PHOTO, ACT, MAN, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Computer Science, Data & AI, Class 1 (Layla, age 7), topic 7: Make characters move.
// Story thread: Layla makes a cartoon cat walk, grow and meow with command blocks.
const CAT = "data-ai-class-1-make-it-move-1-c6b54415.jpg";
const RINGS = "data-ai-class-1-make-it-move-2-8baff485.jpg";
const OKM = (label) => ["ok", "✅", 50, 88, 2, "bounce", label];
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });

// ---------------------------------------------------------------------------------------------- 1. learn
const blocks = {
  id: "blocks", kind: "learn", title: "Sprites and blocks",
  blocks: [
    H("Welcome back, young coder!"),
    SAY("Today we make a character move. Layla wants her cartoon cat to walk and talk.",
      T("Today's big question: how do we make a character move?")),
    SAY("This real cat inspired Layla. She turns it into a character on a screen.",
      PHOTO(CAT, "An orange and white cat sitting on a paved path looking up", "A real cat. Layla draws a cartoon cat from it.", "Photo by Louis Droege on Unsplash")),
    H("Stop 1: A sprite is a picture you control"),
    SAY("A character on a screen is called a sprite. A sprite is a picture a program can move.",
      T("A **sprite** is a picture that a program can move.")),
    EXP("Meet the sprite",
      SS("Here is Layla's cat. It is a sprite on a green background.", S("The cat sprite.", ["c", "🐱", 50, 50, 3, "pulse", "sprite"])),
      SS("A background is the picture behind the sprite. This one is a garden.", S("A garden background.", ["g", "🌳", 25, 50, 3], ["c", "🐱", 62, 50, 3, "bounce", "sprite"])),
      SS("The program tells the sprite what to do. The sprite cannot move alone.", S("A program controls it.", ["c", "🐱", 30, 50, 3, "bounce"], ["p", "💻", 70, 50, 3, "pulse"]))),
    CHK(mc("Which one is a sprite?", "A cartoon cat on the screen", ["A cable", "The keyboard"], { hint: "It is a picture you control.", why: "A sprite is a character a program can move.", tag: "move.sprite" })),
    H("Stop 2: Blocks snap in order"),
    SAY("We give the sprite commands. Each command is a block. Blocks snap together in order.",
      T("A **command block** tells the sprite to do one thing.")),
    SAY("The cat does the first block first. Then the next block. The order matters.",
      PHOTO(RINGS, "A wooden stacking toy with red, yellow, blue, orange, purple and green rings", "Rings go on in order, like blocks in a program.", "Photo by Tomáš Petz on Unsplash")),
    EXP("Blocks in order",
      SS("The first block says move five steps. The cat walks.", S("Move 5 steps.", ["c", "🐱", 30, 50, 3, "bounce"], ["b", "🟦", 70, 50, 2, "pulse", "move 5"])),
      SS("The next block says grow. The cat gets bigger.", S("Grow.", ["c", "🐱", 50, 50, 3, "grow"], ["b", "🟩", 80, 30, 2, "pulse", "grow"])),
      SS("The last block says meow. The program is a sequence.", S("Meow.", ["c", "🐱", 40, 50, 3, "pulse"], ["s", "🔊", 70, 50, 3, "bounce", "meow"], OKM("a sequence")))),
    CHK(mc("What does a command block do?", "Tells the sprite to do one thing", ["Turns off the screen", "Makes the cat sleep for ever"], { hint: "It is one command.", why: "Each block gives the sprite one job.", tag: "move.block" })),
    SAY("Let us remember. A sprite is a picture you control. Blocks tell it what to do, in order.",
      SUM("A sprite is a picture a program can move", "Command blocks tell the sprite what to do", "The order of blocks matters")),
    GLOSS({ sprite: "A picture or character that a program can move.", "command block": "A block that tells a sprite to do one thing.", background: "The picture behind the sprite.", program: "Blocks that tell a computer what to do.", sequence: "Steps in a set order.", block: "A piece that snaps into a program." }),
  ],
  mini: [
    mc("What is the picture behind a sprite called?", "The background", ["The block", "The mouse"], { hint: "It is behind.", why: "The background is behind the sprite." }),
    tf("A sprite moves because blocks tell it to.", true, { hint: "A program controls it.", why: "Blocks give the sprite its commands." }),
    mc("Blocks run...", "In order, one after another", ["All at the same moment", "Never"], { hint: "Think of a sequence.", why: "A program runs blocks in order." }),
    mc("What does a grow block do?", "Makes the sprite bigger", ["Makes it vanish", "Makes it sing"], { hint: "Its name says it.", why: "Grow makes a sprite bigger." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const walk = {
  id: "walk", kind: "try", title: "Make a sprite walk",
  blocks: [
    H("Stop 1: Change the numbers"),
    SAY("A move block has a number. Move three steps goes a short way. Move five steps goes further.",
      T("Change the **number** in a block to change what happens.")),
    EXP("Change the number",
      SS("The block says move three steps. The cat walks a little.", S("Move 3.", ["c", "🐱", 25, 50, 3, "bounce"], ["b", "🟦", 70, 50, 2, "none", "move 3"])),
      SS("Change it to five. Now the cat walks further.", S("Move 5.", ["c", "🐱", 55, 50, 3, "bounce"], ["b", "🟦", 80, 50, 2, "pulse", "move 5"])),
      SS("A bigger number moves the sprite further.", S("Bigger means further.", ["c", "🐱", 70, 50, 3, "pulse"], OKM("bigger number, further")))),
    MAN("Hop along", "Move the 6 hops of the cat across the garden. Each hop is one block.", "🐱", 6, ["Hops done", "Hops to do"]),
    CHK(mc("A block says move 3. You change it to 6. What happens?", "The sprite goes further", ["The sprite goes backwards", "Nothing at all"], { hint: "A bigger number goes further.", why: "A bigger number moves the sprite further.", tag: "move.number" })),
    H("Stop 2: Each sprite has its own blocks"),
    SAY("Layla adds a dog. The dog has its own blocks. The cat's blocks do not move the dog.",
      T("Each sprite has its own set of **blocks**.")),
    EXP("Two sprites",
      SS("The cat has move blocks. The dog has turn blocks.", S("Two sets.", ["c", "🐱", 25, 50, 3, "none", "cat blocks"], ["d", "🐶", 75, 50, 3, "none", "dog blocks"])),
      SS("Run the program. The cat walks and the dog turns round.", S("Both act.", ["c", "🐱", 40, 50, 3, "bounce"], ["d", "🐶", 75, 50, 3, "spin"])),
      SS("Each sprite follows only its own blocks.", S("Own blocks.", ["c", "🐱", 30, 50, 3, "pulse"], ["d", "🐶", 70, 50, 3, "pulse"], OKM("own blocks")))),
    SAY("Now you try. Ask a grown-up to open a blocks program on a tablet.",
      ACT("Make it walk", ["A tablet with a blocks coding app", "A grown-up"], ["Pick a sprite and add a move block.", "Change the number and run it. What changes?", "Add a second sprite with its own blocks."])),
    CHK(tf("The cat's blocks also control the dog.", false, { hint: "Each sprite has its own blocks.", why: "Each sprite follows only its own blocks.", tag: "move.own_blocks" })),
    SAY("Let us remember. Numbers change what blocks do. Each sprite has its own blocks.",
      SUM("A bigger number moves further", "Each sprite has its own blocks")),
    GLOSS({ number: "A value in a block, like 3 or 5.", blocks: "The pieces of a program.", step: "One small move.", turn: "A block that changes the way a sprite faces.", hop: "A small jump." }),
  ],
  mini: [
    mc("Which block makes the sprite face a new way?", "Turn", ["Grow", "Say"], { hint: "Think about direction.", why: "Turn changes the way it faces." }),
    tf("Changing a number changes what the block does.", true, { hint: "3 and 5 are different.", why: "A different number means a different amount." }),
    mc("How many sets of blocks does each sprite have?", "Its own set", ["No blocks", "One set shared by all"], { hint: "Think of the dog and cat.", why: "Each sprite has its own blocks." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const predict = {
  id: "predict", kind: "play", title: "Predict the animation",
  blocks: [
    H("Stop 1: Guess, then run"),
    SAY("Before we run a program, we predict. A prediction is a guess about what will happen.",
      T("A **prediction** is a guess about what will happen.")),
    EXP("Predict and test",
      SS("The blocks say: move two, turn right, move two. Where will the cat go?", S("Predict.", ["c", "🐱", 30, 50, 3, "none"], ["q", "❓", 70, 40, 2, "pulse", "guess"])),
      SS("Run it. The cat goes right, turns and goes down.", S("Run.", ["c", "🐱", 60, 70, 3, "bounce"], OKM("run it"))),
      SS("Our prediction was right! If it is wrong, we learn.", S("Check.", ["c", "🐱", 60, 70, 3, "pulse"], ["t", "👍", 80, 30, 2, "bounce"]))),
    CHK(mc("What is a prediction?", "A guess about what will happen", ["A mistake", "A background"], { hint: "We make it before running.", why: "A prediction is a guess before we run it.", tag: "move.predict" })),
    H("Stop 2: Brain game"),
    SAY("First a memory game. Then spot the bug in a program.",
      T("Play the memory game. Then look for a **bug**.")),
    BRAIN("memory_match", "Block pairs", "Find the pairs.", ["🐱", "➡️", "⬆️", "🔊"]),
    CHK(mc("The cat should turn right but turns left. What is that?", "A bug", ["A background", "A new sprite"], { hint: "It is a mistake in the blocks.", why: "A wrong turn block is a bug.", tag: "move.bug" })),
    SAY("Let us remember. Predict first, then run. Fix any bug.",
      SUM("A prediction is a guess", "A bug is a mistake in the blocks", "Run the program to test it")),
    GLOSS({ prediction: "A guess about what will happen.", bug: "A mistake in a program.", run: "To start a program.", test: "To try something to see if it works.", debug: "To find and fix a bug." }),
  ],
  mini: [
    mc("What do we do before running a program?", "Make a prediction", ["Turn it off", "Delete it"], { hint: "A guess.", why: "We predict first." }),
    tf("A bug is a mistake in a program.", true, { hint: "It is not a real insect.", why: "A bug is a mistake." }),
    mc("What do we do to a bug?", "Find it and fix it", ["Ignore it", "Hide it"], { hint: "Debug.", why: "We fix bugs." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const design = {
  id: "design", kind: "use", title: "Design a short animation",
  blocks: [
    H("Stop 1: Plan with a picture"),
    SAY("Layla wants a short cartoon. A cat walks, grows and meows. First she draws a plan.",
      T("**Design** first. Draw what each sprite will do.")),
    SAY("She draws three boxes. Box one: the cat walks. Box two: the cat grows. Box three: the cat meows.",
      T("A plan has steps, like a story.")),
    SAY("She writes which block goes with each box. The plan tells her what to build.",
      ACT("Plan an animation", ["Paper and a pencil", "A grown-up"], ["Draw three boxes. Show what happens in each.", "Write which block each box needs.", "Share your plan with a friend."])),
    EXP("Layla's three boxes",
      SS("Box one shows the cat walking across the garden.", S("Box 1: walk.", ["c", "🐱", 40, 50, 3, "bounce"], ["b", "1️⃣", 75, 25, 2])),
      SS("Box two shows the cat growing bigger.", S("Box 2: grow.", ["c", "🐱", 50, 50, 3, "grow"], ["b", "2️⃣", 75, 25, 2])),
      SS("Box three shows the cat saying meow. A plan saves time.", S("Box 3: meow.", ["c", "🐱", 40, 50, 3, "pulse"], ["s", "🔊", 70, 50, 3, "bounce"], ["b", "3️⃣", 85, 25, 2]))),
    CHK(ord("Put the animation steps in order.", ["Draw a plan", "Build the blocks", "Test it", "Make it better"], { hint: "Plan first.", why: "Plan, build, test, then improve.", tag: "move.design_order" })),
    H("Stop 2: Test and improve"),
    SAY("Layla builds her program and runs it. The cat walks. But it turns the wrong way.",
      T("**Test** your program. Then make it better.")),
    EXP("Test and fix",
      SS("She runs the program. The cat walks. Then it spins the wrong way.", S("A bug.", ["c", "🐱", 40, 50, 3, "spin"], ["b", "🐛", 75, 30, 2, "bounce", "bug"])),
      SS("She swaps the turn block to the right one. She runs it again.", S("Fix it.", ["c", "🐱", 50, 50, 3, "bounce"], ["s", "🔧", 80, 40, 2, "pulse"])),
      SS("Now it works. She asks a friend for kind feedback.", S("It works.", ["c", "🐱", 50, 50, 3, "pulse"], OKM("it works")))),
    SAY("Her friend says, I like the meow. Maybe make the cat bigger.",
      T("Kind feedback says what is good and what could be better.")),
    CHK(mc("What should you do after you build a program?", "Test it", ["Delete it", "Hide it"], { hint: "Try it out.", why: "We test to find bugs.", tag: "move.test" })),
    SAY("Let us remember. Plan, build, test and improve with kind feedback.",
      SUM("Plan with a picture first", "Test to find bugs", "Improve with kind feedback")),
    GLOSS({ design: "A plan for what you will make.", test: "Try it to see if it works.", feedback: "Kind comments that help someone improve.", improve: "Make something better.", plan: "Steps drawn or written before you build." }),
  ],
  mini: [
    mc("What do we do before building?", "Make a plan", ["Go to sleep", "Run it"], { hint: "Think first.", why: "A plan comes before building." }),
    tf("Testing can help us find bugs.", true, { hint: "Try it out.", why: "Testing shows bugs." }),
    mc("Which feedback is kind?", "I like it. Maybe add a sound", ["That is rubbish", "Delete it"], { hint: "Be helpful.", why: "Kind feedback names a good thing and a way to improve." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Layla's cartoon cat", backdrop: "home", caption: "Layla joins blocks so her cat walks, grows and meows.",
  scenes: [
    { caption: "A cartoon cat.", say: "Layla draws a cartoon cat. It is her sprite.",
      items: [{ id: "l", emoji: "👧", label: "Layla", x: 25, y: 56, size: 3, enter: "walk_right" }, { id: "c", emoji: "🐱", label: "sprite", x: 72, y: 50, size: 3, enter: "pop" }] },
    { caption: "A plan.", say: "She plans three boxes. Walk, grow, meow.",
      items: [{ id: "w", emoji: "🟦", label: "walk", x: 25, y: 50, size: 3 }, { id: "g", emoji: "🟩", label: "grow", x: 50, y: 50, size: 3 }, { id: "m", emoji: "🟥", label: "meow", x: 75, y: 50, size: 3 }] },
    { caption: "Join the blocks.", say: "She snaps blocks together in order.",
      items: [{ id: "b", emoji: "🧱", x: 50, y: 50, size: 3, enter: "grow", effect: "sparkle" }] },
    { caption: "Run!", say: "She runs it. The cat walks across the garden.",
      items: [{ id: "c", emoji: "🐱", x: 70, y: 50, size: 3, enter: "slide_right" }] },
    { caption: "Grow.", say: "The cat grows bigger. Next it should meow.",
      items: [{ id: "c", emoji: "🐱", x: 50, y: 48, size: 3, anim: "grow" }] },
    { caption: "A wrong turn.", say: "Oh no. The cat turns the wrong way. That is a bug.",
      items: [{ id: "c", emoji: "🐱", x: 40, y: 50, size: 3, anim: "spin" }, { id: "b", emoji: "🐛", x: 72, y: 35, size: 2, anim: "bounce" }] },
    { caption: "Fix it.", say: "Layla swaps one block. She runs it again.",
      items: [{ id: "f", emoji: "🔧", x: 30, y: 50, size: 3, anim: "bounce" }, { id: "c", emoji: "🐱", x: 70, y: 50, size: 3, effect: "glow" }] },
    { caption: "Meow!", say: "Now it walks, grows and meows. Layla shares it kindly.",
      items: [{ id: "c", emoji: "🐱", x: 40, y: 50, size: 3, anim: "bounce" }, { id: "s", emoji: "🔊", label: "meow", x: 75, y: 40, size: 3, effect: "hearts" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- blocks (q1-q8)
  Q(mc("What is a sprite in a program?", "A picture or character that the program can move", ["A kind of cable", "A computer screen"], { hint: "Think about the cat.", why: "A sprite is a character a program can move.", tag: "move.sprite" }), "blocks", "recall",
    [mc("In a blocks program, what do we call the character we move?", "A sprite", ["A cable", "A mouse"], { hint: "Think about the cat.", why: "The character is called a sprite.", tag: "move.sprite" })]),
  Q(mc("What does one command block do?", "It tells the sprite to do one thing", ["It builds a whole movie", "It turns off the screen"], { hint: "One block, one job.", why: "A command block gives one command.", tag: "move.block" }), "blocks", "recall",
    [mc("Which describes a command block?", "A piece that gives the sprite one job", ["A kind of battery", "A sprite's tail"], { hint: "One block, one job.", why: "A command block gives one command.", tag: "move.block" })]),
  Q(tf("The order of the blocks matters.", true, { hint: "Blocks run one after another.", why: "A different order can give a different result.", tag: "move.order" }), "blocks", "recall",
    [tf("A program works the same if you swap all the blocks around.", false, { hint: "Blocks run in order.", why: "Swapping blocks can change what happens.", tag: "move.order" })]),
  Q(mat("Match each block to what the sprite does.", [["Move 3 steps", "Walks forward"], ["Turn right", "Faces right"], ["Grow", "Gets bigger"]], { hint: "Think about each name.", why: "Each block makes the sprite do one thing.", tag: "move.match_block" }), "blocks", "apply",
    [mat("Join each block to its action.", [["Say hello", "Shows words"], ["Shrink", "Gets smaller"], ["Play sound", "Makes a noise"]], { hint: "Think about each name.", why: "Each block makes the sprite do one thing.", tag: "move.match_block" })]),
  Q(hot("Tap the sprite.", [["🐱", "Cat sprite", 22, 50], ["🌳", "Background tree", 50, 50], ["🧱", "Block", 78, 50]], ["Cat sprite"], { labels: true, hint: "It is the character.", why: "The cat is the sprite.", tag: "move.tap_sprite" }), "blocks", "recall",
    [hot("Tap the background.", [["🐱", "Cat sprite", 22, 50], ["🏞️", "Park scene", 50, 50], ["🧱", "Block", 78, 50]], ["Park scene"], { labels: true, hint: "It is behind the sprite.", why: "The park scene is the background.", tag: "move.tap_sprite" })]),
  Q(mc("Aisha says the order of blocks does not matter. Is she right?", "No. A different order can make a different result", ["Yes, order never matters", "Yes, only the first block matters"], { hint: "Think about walk then grow.", why: "Blocks run in order, so order matters.", tag: "move.reason_order" }), "blocks", "reason",
    [mc("Ben says you can put blocks in any order and get the same result. Is he right?", "No. Changing the order can change what happens", ["Yes, any order works", "Yes, blocks run all at once"], { hint: "Think about walk then grow.", why: "Blocks run in order.", tag: "move.reason_order" })]),
  Q(mc("Sam says all sprites share one set of blocks. Is he right?", "No. Each sprite has its own blocks", ["Yes, they all share", "Yes, only the first sprite has blocks"], { hint: "Think about the cat and dog.", why: "Each sprite has its own blocks.", tag: "move.reason_own" }), "blocks", "reason",
    [mc("Mina says the cat's blocks also move the dog. Is she right?", "No. The dog follows its own blocks", ["Yes, they share", "Yes, the dog has none"], { hint: "Think about the cat and dog.", why: "Each sprite has its own blocks.", tag: "move.reason_own" })]),
  Q(fill("Finish the sentences about a scene.", "A {b1} is a character you can move. The {b2} is the picture behind it.", [["sprite", "block", "cable"], ["background", "sprite", "number"]], { hint: "Think about the cat and the garden.", why: "A sprite moves. The background is behind it.", tag: "move.vocab" }), "blocks", "recall",
    [fill("Complete the sentences about blocks.", "Each {b1} tells a sprite to do one thing. The blocks run in {b2}.", [["command block", "background", "cable"], ["order", "colour", "pairs"]], { hint: "Think about a sequence.", why: "Command blocks run one after another in order.", tag: "move.vocab" })]),
  // ----- walk (q9-q16)
  Q(num("A sprite moves 3 steps, then 4 steps. How many steps is that in all?", 7, { hint: "Add 3 and 4.", why: "3 + 4 = 7 steps.", tag: "move.add_steps" }), "walk", "apply",
    [num("A sprite moves 6 steps, then 2 steps. How many steps is that in all?", 8, { hint: "Add 6 and 2.", why: "6 + 2 = 8 steps.", tag: "move.add_steps" })]),
  Q(tf("If you change 3 to 5 in a move block, the sprite goes further.", true, { hint: "Bigger number, further.", why: "5 steps is further than 3 steps.", tag: "move.number" }), "walk", "apply",
    [tf("Changing the number in a move block changes the sprite's colour.", false, { hint: "What does a move block do?", why: "A move block changes how far, not colour.", tag: "move.number" })]),
  Q(ord("Put the blocks in order to make the cat walk and then meow.", ["When the green flag is tapped", "Move 5 steps", "Play the meow sound"], { hint: "Start first.", why: "Start, move, then meow.", tag: "move.block_order" }), "walk", "apply",
    [ord("Put the blocks in order to make the cat grow and then say hello.", ["When the green flag is tapped", "Grow", "Say hello"], { hint: "Start first.", why: "Start, grow, then say hello.", tag: "move.block_order" })]),
  Q(mc("Which block makes a sprite face a new way?", "A turn block", ["A grow block", "A say block"], { hint: "Think about direction.", why: "Turn changes the way a sprite faces.", tag: "move.turn" }), "walk", "recall",
    [mc("Which block makes a sprite look bigger?", "A grow block", ["A turn block", "A sound block"], { hint: "Think about size.", why: "Grow makes a sprite bigger.", tag: "move.grow" })]),
  Q(sld("A cat hops 3 times. Each hop is 2 steps. Slide to show the total steps.", { min: 0, max: 15 }, 6, 0, { hint: "2 + 2 + 2.", why: "3 hops of 2 steps is 6 steps.", tag: "move.hops" }), "walk", "apply",
    [sld("A cat hops 4 times. Each hop is 2 steps. Slide to show the total steps.", { min: 0, max: 15 }, 8, 0, { hint: "2 + 2 + 2 + 2.", why: "4 hops of 2 steps is 8 steps.", tag: "move.hops" })]),
  Q(mc("The blocks swap: move first then turn becomes turn first then move. What changes?", "The path the sprite takes", ["Nothing at all", "The sprite's name"], { hint: "Think about where it faces.", why: "Swapping blocks changes the route.", tag: "move.swap" }), "walk", "apply",
    [mc("You swap a grow block and a move block. What can change?", "The order things happen in", ["The sprite becomes a dog", "The tablet turns off"], { hint: "Think about order.", why: "Swapping blocks changes the order of actions.", tag: "move.swap" })]),
  Q(mc("Zainab says bigger numbers in a block always mean the sprite goes faster. Is she right?", "No. A bigger number usually means further, not faster", ["Yes, bigger is always faster", "Yes, numbers are speed"], { hint: "Think about move 3 and move 5.", why: "A bigger move number means a longer move.", tag: "move.reason_numbers" }), "walk", "reason",
    [mc("Hana says a bigger number makes the sprite angry. Is she right?", "No. A bigger number only changes how far or how big", ["Yes, bigger makes it angry", "Yes, bigger turns it red"], { hint: "Numbers are amounts.", why: "A number sets an amount.", tag: "move.reason_numbers" })]),
  Q(ms("Which two blocks change how a sprite looks or sounds? Pick two.", ["Grow", "Play sound"], ["Move 5 steps", "Wait"], { hint: "Think about size and noise.", why: "Grow changes size and play sound makes noise.", tag: "move.look_sound" }), "walk", "apply",
    [ms("Pick two blocks that change size or speech.", ["Shrink", "Say hello"], ["Move 3 steps", "Turn left"], { hint: "Think about size and words.", why: "Shrink changes size and say shows words.", tag: "move.look_sound" })]),
  // ----- predict (q17-q23)
  Q(mc("A sprite faces up. The blocks say: move 2, turn right, move 2. Which way does it face at the end?", "Right", ["Left", "Down"], { hint: "Turn right from facing up.", why: "Facing up, a turn right makes it face right.", tag: "move.predict_dir" }), "predict", "apply",
    [mc("A sprite faces up. The blocks say: move 3, turn left, move 1. Which way does it face at the end?", "Left", ["Right", "Down"], { hint: "Turn left from facing up.", why: "Facing up, a turn left makes it face left.", tag: "move.predict_dir" })]),
  Q(mc("Sam says a program can only be built in one way. Is he right?", "No. Different blocks can give the same result", ["Yes, only one way", "Yes, programs are never changed"], { hint: "Think about move 4 and move 2 twice.", why: "There can be many ways to reach the same outcome.", tag: "move.reason_one_way" }), "predict", "reason",
    [mc("Layla says there is only one program for walking to the tree. Is she right?", "No. There are many programs that get there", ["Yes, only one", "Yes, the tree decides"], { hint: "Think of two routes.", why: "Different programs can reach the same place.", tag: "move.reason_one_way" })]),
  Q(mat("Match each bug to its fix.", [["Sprite faces the wrong way", "Change the turn block"], ["Sprite stops too soon", "Make the number bigger"], ["Nothing happens", "Add a start block"]], { hint: "Think about what went wrong.", why: "Each fix matches the bug.", tag: "move.bug_fix" }), "predict", "apply",
    [mat("Pair each problem with a fix.", [["Sprite goes too far", "Make the number smaller"], ["Sprite will not speak", "Add a say block"], ["Sprite is too small", "Add a grow block"]], { hint: "Think about what went wrong.", why: "Each fix matches the problem.", tag: "move.bug_fix" })]),
  Q(mc("Omar says if his program does not work, the computer is broken. Is he right?", "No. There is probably a bug in the blocks", ["Yes, computers are broken", "Yes, blocks never fail"], { hint: "Check the blocks.", why: "Usually a bug in the blocks is the problem.", tag: "move.reason_broken" }), "predict", "reason",
    [mc("Mina says a wrong turn means her tablet is broken. Is she right?", "No. She can check and fix the blocks", ["Yes, the tablet is broken", "Yes, wrong turns are normal for tablets"], { hint: "Check the blocks.", why: "A bug is a mistake in blocks, not a broken tablet.", tag: "move.reason_broken" })]),
  Q(fill("Finish the sentences about testing.", "We {b1} what will happen, then {b2} the program to check.", [["predict", "forget", "hide"], ["run", "sleep", "paint"]], { hint: "Guess, then try.", why: "We predict first and then run it to check.", tag: "move.predict_fill" }), "predict", "apply",
    [fill("Complete the sentences about bugs.", "A {b1} is a mistake in a program. We {b2} it to fix it.", [["bug", "block", "sprite"], ["debug", "paint", "eat"]], { hint: "Think about fixing.", why: "We debug a bug to fix it.", tag: "move.predict_fill" })]),
  Q(hot("Tap the block that makes the cat bigger.", [["⬆️", "Grow", 22, 50], ["↩️", "Turn", 50, 50], ["➡️", "Move", 78, 50]], ["Grow"], { labels: true, hint: "Think about size.", why: "Grow makes the sprite bigger.", tag: "move.tap_block" }), "predict", "recall",
    [hot("Tap the block that makes the cat smaller.", [["⬇️", "Shrink", 22, 50], ["↩️", "Turn", 50, 50], ["➡️", "Move", 78, 50]], ["Shrink"], { labels: true, hint: "Think about size.", why: "Shrink makes the sprite smaller.", tag: "move.tap_block" })]),
  Q(mc("Aisha says testing once is enough. Is she right?", "No. Test again after every fix", ["Yes, once is enough", "Yes, testing is not needed"], { hint: "Did the fix work?", why: "We test again after fixing, to check the fix.", tag: "move.reason_test" }), "predict", "reason",
    [mc("Ravi says you should never test a program twice. Is he right?", "No. A new fix needs a new test", ["Yes, never twice", "Yes, once is perfect"], { hint: "Did the fix work?", why: "We test again after changes.", tag: "move.reason_test" })]),
  // ----- design (q24-q30)
  Q(ord("Put these animation steps in order.", ["Draw a plan", "Build the blocks", "Test the animation", "Improve it with feedback"], { hint: "Plan comes first.", why: "Plan, build, test, then improve.", tag: "move.make_order" }), "design", "apply",
    [ord("Put these steps for a bus animation in order.", ["Sketch the bus route", "Snap the blocks together", "Run it and watch", "Fix any bug"], { hint: "Sketch first.", why: "Sketch, build, run, then fix.", tag: "move.make_order" })]),
  Q(sld("A plan has 5 steps. You have built 3. Slide to show how many steps are left.", { min: 0, max: 8 }, 2, 0, { hint: "5 take away 3.", why: "5 - 3 = 2 steps left.", tag: "move.steps_left" }), "design", "apply",
    [sld("A plan has 6 steps. You have built 4. Slide to show how many steps are left.", { min: 0, max: 8 }, 2, 0, { hint: "6 take away 4.", why: "6 - 4 = 2 steps left.", tag: "move.steps_left" })]),
  Q(mc("Layla says you should start coding with no plan. Is she right?", "No. A plan helps you know what to build", ["Yes, plans are never needed", "Yes, plans make coding slower"], { hint: "Think about the three boxes.", why: "A plan saves time and shows what to build.", tag: "move.reason_plan" }), "design", "reason",
    [mc("Ben says he does not need a design for a long animation. Is he right?", "No. A design helps most with long animations", ["Yes, long ones design themselves", "Yes, designs are useless"], { hint: "Think about the three boxes.", why: "A design shows what each part does.", tag: "move.reason_plan" })]),
  Q(mc("Omar says a sprite moves by itself without any blocks. Is he right?", "No. A sprite only does what its blocks say", ["Yes, sprites are alive", "Yes, sprites think for themselves"], { hint: "Who controls the sprite?", why: "A program controls the sprite.", tag: "move.reason_alone" }), "design", "reason",
    [mc("Sana says a sprite chooses what to do on its own. Is she right?", "No. The blocks tell it what to do", ["Yes, it chooses", "Yes, it is alive"], { hint: "Who controls the sprite?", why: "A sprite follows its program.", tag: "move.reason_alone" })]),
  Q(num("An animation has 4 pictures. Each picture shows 2 sprites. How many sprites is that in all?", 8, { hint: "2 + 2 + 2 + 2.", why: "4 pictures of 2 sprites make 8 sprites.", tag: "move.count_sprites" }), "design", "apply",
    [num("An animation has 5 pictures. Each picture shows 2 sprites. How many sprites is that in all?", 10, { hint: "2 + 2 + 2 + 2 + 2.", why: "5 pictures of 2 sprites make 10 sprites.", tag: "move.count_sprites" })]),
  Q(mc("Which is a kind way to give feedback on a friend's animation?", "I like the meow. Maybe make the cat bigger", ["It is boring", "You are bad at this"], { hint: "Say something good and helpful.", why: "Kind feedback names a good thing and a way to improve.", tag: "move.kind_feedback" }), "design", "apply",
    [mc("What could you say about a friend's animation to be kind?", "The jump is fun. Could it be faster?", ["I hate it", "Delete it now"], { hint: "Say something good and helpful.", why: "Kind feedback is helpful.", tag: "move.kind_feedback" })]),
  Q(ms("Which two things help you improve a program? Pick two.", ["Test it again", "Listen to kind feedback"], ["Ignore the bugs", "Never run it"], { hint: "Try again and listen.", why: "Testing and feedback help you improve.", tag: "move.improve" }), "design", "apply",
    [ms("Which two help you make an animation better? Pick two.", ["Fix the bugs", "Ask a friend what they think"], ["Hide it from everyone", "Delete it at once"], { hint: "Fix and ask.", why: "Fixing bugs and asking for feedback improve work.", tag: "move.improve" })]),
];

export const topics = [
  topicLesson({
    slug: "data-ai-class-1-make-it-move", subject: "data-ai", cls: 1, topic: 7, title: "Make Characters Move",
    summary: "Join command blocks so a sprite moves, grows and talks, then test the program.",
    unit: "Topic 7: Make characters move", difficulty: 1,
    objectives: ["Join blocks into a sequence", "Change values and see the result", "Test and fix a small program"],
    success_criteria: ["I can say what a sprite and a block are", "I can change a number and predict what happens", "I can test a program and fix a bug"],
    real_life: "Making a cartoon on a tablet, or telling a robot toy where to go.",
    standards: [
      { framework: "nc_england", code: "KS1 algorithms", text: "Create and debug simple programs; use logical reasoning to predict the behaviour of simple programs" },
      { framework: "csta", code: "1A-AP-10", text: "Develop programs with sequences and simple loops, to express ideas or address a problem" },
    ],
    warm_up: [
      mc("What is a loop?", "Instructions that repeat", ["A mistake", "A background"], { hint: "Do it again.", why: "A loop repeats instructions." }),
      mc("Which key makes a capital letter?", "Shift", ["Space bar", "Delete"], { hint: "Hold it down.", why: "Shift makes capitals." }),
      num("What is 6 + 4?", 10, { hint: "Count on from 6.", why: "6 + 4 = 10." }),
    ],
    intro: [],
    subs: [blocks, walk, predict, design],
    clip,
    quiz,
  }),
];
