import { SAY, SS, H, T, IMG, TIP, FACT, REVEAL, ACT, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld, PHOTO } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Computer Science, Data & AI, Class 1 (Zainab, age 7), topic 1: Algorithms and robots.
// Standards: NC Computing KS1 (algorithms, debugging), CSTA 1A algorithms and programming. See docs/CURRICULUM_V2.md.
const o = (hint, why, tag) => ({ hint, why, tag });
const RG = (id, col, row, facing, anim = "none") => [id, { kind: "robot_grid", col, row, facing }, 50, 50, 3, anim];

const BREAD = "data-ai-class-1-algorithms-robots-1-5c921c25.jpg";
const SANDWICH = "data-ai-class-1-algorithms-robots-2-ab974f83.jpg";

const directions = {
  id: "directions", kind: "learn", title: "Directions and algorithms",
  blocks: [
    H("Welcome back, robot trainer!"),
    SAY("Today we learn how to tell a robot exactly what to do.", T("Today's big question: how do we give clear steps?")),
    SAY("These two slices of bread are the start of a sandwich. Steps matter.", PHOTO(BREAD, "Two slices of white bread on a dark table", "Even a sandwich needs steps in order.", "Photo by Graphy Co on Unsplash")),
    H("Stop 1: Giving a robot directions"),
    SAY("Meet our robot. It cannot think for itself. It only does exactly what we tell it, one instruction at a time. The robot wants to reach the star in the corner. We can say forward, to move one square. Or turn, to face a new way. Watch the robot walk along the top row.", T("A robot does exactly what we tell it. These are **instructions**.", "**Forward** moves one square. **Turn** changes the way it faces.")),
    EXP("The robot walks to the star",
      SS("Here is the robot at the start. The star is far away in the opposite corner. The robot faces right.", S("The robot starts in the top corner.", RG("r", 0, 0, "right"))),
      SS("Forward, forward. Two squares along.", S("Forward, forward.", RG("r", 2, 0, "right"))),
      SS("Forward, forward again. Now the robot is in the top right corner.", S("Forward, forward again.", RG("r", 4, 0, "right"))),
      SS("Now turn. The robot turns to face down, ready to walk to the star.", S("Turn to face down.", RG("r", 4, 0, "down", "pulse"))),
      SS("Forward four times, and the robot reaches the star! Well done, robot.", S("Forward four times and we reach the star!", RG("r", 4, 4, "down", "bounce")))),
    CHK(mc("Which instruction moves the robot one square?", "Forward", ["Turn", "Stop"], o("Think about walking.", "Forward moves the robot one square along.", "algo.instructions"))),
    H("Stop 2: What is an algorithm?"),
    SAY("A list of clear steps, in the right order, is called an algorithm. You use algorithms every day without noticing. Think about making a sandwich. First the bread, then the cheese, then the top slice. If we muddle the order, we get a very silly sandwich!", T("An **algorithm** is a list of clear steps in the right **order**.", "Muddle the order and it does not work!")),
    EXP("A sandwich algorithm",
      SS("Step one. Put the bread on the plate.", S("1. Bread on the plate.", ["b", "🍞", 50, 62, 3])),
      SS("Step two. Add the cheese on top of the bread.", S("2. Add the cheese.", ["b", "🍞", 50, 62, 3], ["c", "🧀", 50, 44, 3, "grow"])),
      SS("Step three. Put the top slice on. Now it is a sandwich! The order mattered.", S("3. Top slice on. Yum!", ["b", "🍞", 50, 68, 3], ["c", "🧀", 50, 52, 3], ["t", "🍞", 50, 34, 3, "bounce"]))),
    CHK(ord("Put these steps for washing your hands in order.", ["Turn on the tap", "Use soap", "Rinse and dry"], o("What do you do first?", "We wet our hands, then use soap, then rinse and dry.", "algo.order"))),
    SAY("Let us remember. Instructions tell a robot what to do. An algorithm is a list of clear steps in the right order.", SUM("Instructions tell a robot what to do", "An algorithm is clear steps in the right order")),
    GLOSS({ robot: "A machine that follows exact instructions.", instructions: "Clear orders that tell a robot or computer what to do.", forward: "Move one square the way you are facing.", turn: "Change the way you are facing.", algorithm: "A list of clear steps in the right order.", order: "What comes first, next and last." }),
  ],
  mini: [
    mc("What do we call a list of clear steps in the right order?", "An algorithm", ["A picture", "A bug"], o("It is a word for a recipe of steps.", "A list of clear steps in order is an algorithm.")),
    tf("A robot can think for itself and guess what we mean.", false, o("Robots only do what we tell them.", "A robot does exactly what the instructions say.")),
    ord("Put these steps for putting on shoes in order.", ["Pick up your shoes", "Put them on your feet", "Tie the laces"], o("What do you do first?", "You pick them up, put them on, then tie them.")),
    mc("A robot faces right. Which instruction makes it face down?", "Turn", ["Forward", "Jump"], o("Which one changes the way it faces?", "Turn changes the way the robot faces.")),
  ],
};

const loopsIf = {
  id: "loops_if", kind: "try", title: "Loops and if-then",
  blocks: [
    H("Stop 1: Doing it again with a loop"),
    SAY("Sometimes a robot must do the same thing again and again. We could say forward, forward, forward, forward. That is a lot of words! Instead we can say repeat forward four times. A set of instructions that repeats is called a loop. Watch the frog hop three times using one loop.", T("A **loop** repeats instructions. Instead of hop, hop, hop, say: repeat hop 3 times.")),
    EXP("A frog loop",
      SS("The frog starts on the log.", S("Start.", ["f", "🐸", 15, 55, 3])),
      SS("Hop number one. Our loop says: repeat hop, three times.", S("Hop 1.", ["f", "🐸", 38, 55, 3, "bounce"], ["c1", "1️⃣", 38, 25, 1])),
      SS("Hop number two. The same instruction again.", S("Hop 2.", ["f", "🐸", 61, 55, 3, "bounce"], ["c2", "2️⃣", 61, 25, 1])),
      SS("Hop number three. The loop is finished!", S("Hop 3. The loop is done.", ["f", "🐸", 84, 55, 3, "bounce"], ["c3", "3️⃣", 84, 25, 1]))),
    CHK(mc("A loop says: repeat clap, 4 times. How many claps is that?", "4", ["1", "2"], o("A loop repeats the instruction.", "Repeat 4 times means 4 claps.", "algo.loops"))),
    ACT("Be the robot loop", ["A grown-up or a friend", "Open floor space"], ["Ask your friend to say: repeat jump, 3 times.", "Do the loop exactly: jump, jump, jump.", "Now swap. Can you make up a loop with clap and stamp?"]),
    H("Stop 2: If this, then that"),
    SAY("Computers make choices too. They use the words if and then. If it is raining, then take an umbrella. If it is sunny, then wear a hat. The computer checks the question first, and then chooses what to do.", T("**If** something is true, **then** do something.", "If it is raining, then take an umbrella.")),
    IMG("🌧️☂️", "If it is raining, then take an umbrella.", "A rain cloud and an umbrella."),
    CHK(mc("If the light is red, then the car must...", "Stop", ["Go faster", "Honk"], o("Think about traffic lights.", "If the light is red, then the car stops.", "algo.if_then"))),
    SAY("Let us remember. A loop repeats instructions. If-then lets a computer choose what to do.", SUM("A loop repeats instructions", "If this, then that helps a computer choose")),
    GLOSS({ loop: "A set of instructions that repeats.", repeat: "To do the same thing again.", if: "A word that asks a question before we choose.", then: "A word that tells what to do next." }),
  ],
  mini: [
    mc("What does a loop do?", "Repeats instructions", ["Fixes a bug", "Turns the screen off"], o("Think about doing it again.", "A loop repeats instructions.")),
    num("A loop says: repeat hop, 5 times. How many hops?", 5, o("Count the repeats.", "Repeat 5 times is 5 hops.")),
    tf("If it is cold, then wear a coat. It is cold. You should wear a coat.", true, o("The if part is true.", "The if is true, so we do the then.")),
    mc("If it is night, then switch on...", "The light", ["The sun", "The rain"], o("What helps us see at night?", "If it is night, then we switch on a light.")),
  ],
};

const bugs = {
  id: "bugs", kind: "play", title: "Bug hunt",
  blocks: [
    H("Stop 1: Finding the bug"),
    SAY("Sometimes our instructions have a mistake. A mistake in instructions is called a bug. Finding and fixing a bug is called debugging. Look at this robot. We told it forward, forward, forward, forward, then turn. But the star is in the corner. The robot stopped before it got there. Where is the bug?", T("A **bug** is a mistake in the instructions.", "**Debugging** means finding and fixing the bug.")),
    EXP("The robot stops too soon",
      SS("The robot follows: forward, forward, forward. That is only three steps.", S("Three forwards only.", RG("r", 3, 0, "right"))),
      SS("It needed four steps to reach the corner. The star is still far away. The bug is that one forward is missing.", S("One forward is missing. That is the bug!", RG("r", 3, 0, "right", "pulse"), ["bug", "🐛", 80, 20, 2, "bounce"])),
      SS("We add one more forward. Now the robot reaches the corner. We fixed the bug!", S("Add one forward. Bug fixed!", RG("r", 4, 0, "right", "bounce")))),
    CHK(mc("A robot must go forward 3 steps but only goes 2. What is the bug?", "A forward is missing", ["The robot is too tall", "The floor is blue"], o("Count the steps.", "The instructions are missing one forward.", "algo.debug"))),
    H("Stop 2: Brain game"),
    SAY("Time for a brain game. Watch the lights, then copy them in the same order. Remembering the order is just like following an algorithm.", T("Watch carefully, then copy the **order** of the lights.")),
    BRAIN("remember_order", "Robot lights", "Watch the order, then copy it.", ["🔴", "🟡", "🟢", "🔵"]),
    CHK(mc("Debugging means...", "Fixing a mistake in instructions", ["Making a robot run faster", "Switching a computer off"], o("A bug is a mistake.", "Debugging is finding and fixing mistakes.", "algo.debug"))),
    SAY("Let us remember. A bug is a mistake. Debugging means fixing it.", SUM("A bug is a mistake in instructions", "Debugging means finding and fixing it")),
    GLOSS({ bug: "A mistake in instructions.", debugging: "Finding and fixing a bug.", order: "What comes first, next and last." }),
  ],
  mini: [
    mc("What is a bug in a computer program?", "A mistake", ["A small insect that helps", "A new button"], o("It is not a real insect.", "A bug is a mistake in the instructions.")),
    tf("Debugging means finding and fixing mistakes.", true, o("Think about fixing.", "Debugging is fixing mistakes.")),
    mc("Sam's instructions: wash hands, use soap, turn on the tap. What is the bug?", "The steps are in the wrong order", ["Soap is not allowed", "There are too few words"], o("Which step should be first?", "The tap must be turned on before washing.")),
  ],
};

const around = {
  id: "around", kind: "use", title: "Algorithms around us",
  blocks: [
    H("Stop 1: Algorithms at home"),
    SAY("A sandwich has steps in order. Bread, filling, then the top slice.", PHOTO(SANDWICH, "A sandwich with cheese, lettuce and tomato on a wooden board", "Bread, filling, then the top slice.", "Photo by Raphael Nogueira on Unsplash")),
    SAY("Algorithms are not only for robots. People follow them all the time. Getting ready for school has steps. So does making a cup of chai, or cooking rice, or tidying a room. If you do the steps in order, the job works. What other algorithms can you think of at home?", T("We follow **algorithms** at home: making chai, cooking rice, getting ready for school.")),
    SAY("Here are three algorithms from home. Cooking rice, making chai and packing a bag.", IMG("🍚🫖🎒", "Cooking rice, making chai and packing a school bag all have steps in order.")),
    CHK(mc("Which of these is an algorithm?", "Steps to make a cup of chai", ["A song you like", "A big red ball"], o("Look for steps in order.", "Making chai has steps in a fixed order.", "algo.everyday"))),
    H("Stop 2: Write your own"),
    SAY("Now it is your turn to be the programmer. Choose a job, like making a sandwich or tidying the toys. Write the steps in order, or draw them. Then ask a grown-up to follow only your steps, exactly. If they get stuck, you found a bug!", T("Write your own **algorithm**. Then test it on a grown-up. If it goes wrong, **debug** it!")),
    SAY("Write the steps down or draw them. Then test them.", IMG("✍️📋", "Write the steps, then test them.")),
    SAY("Now you try. Follow the steps on the card. Take your time.", ACT("My own algorithm", ["Paper and pencil", "A grown-up helper"], ["Choose a job, such as making a sandwich.", "Draw or write each step in order.", "Ask a grown-up to follow your steps exactly.", "Did it work? If not, find the bug and fix it."])),
    SAY("Have a think. Could you give a robot the steps for brushing teeth? Tap to find out.", REVEAL("Could you give a robot the steps for brushing teeth?", "Yes! Put paste on the brush, brush the front, brush the back, rinse. A robot would need every tiny step.")),
    CHK(tf("A good algorithm has clear steps in the right order.", true, o("Think about our sandwich.", "Clear steps in order make an algorithm work.", "algo.everyday"))),
    SAY("Let us remember. Algorithms are all around us. We can write our own, test it, and debug it.", SUM("Algorithms are all around us", "Write, test and debug your own")),
    GLOSS({ algorithm: "A list of clear steps in the right order.", debug: "To find and fix a bug.", programmer: "A person who writes instructions for a computer." }),
  ],
  mini: [
    mc("Which job needs an algorithm?", "Making a paratha", ["Looking at the moon", "Being asleep"], o("Which has steps?", "Cooking has steps in order.")),
    ord("Put these in order for planting a seed.", ["Dig a small hole", "Put in the seed", "Cover it and water it"], o("What first?", "Dig, plant, then cover and water.")),
    tf("If an algorithm goes wrong, we should look for the bug.", true, o("A bug is a mistake.", "We debug to fix the problem.")),
  ],
};

const ALTS = [
  [mc("What do we call one clear order we give to a robot?", "An instruction", ["A star", "A loop"], o("It tells the robot what to do.", "One order is an instruction.", "algo.instructions")), mc("A robot reads: forward. What does it do?", "Moves one square", ["Sings a song", "Falls asleep"], o("Forward is about moving.", "Forward moves one square.", "algo.instructions"))],
  [tf("Robots always know what you mean even if the instruction is wrong.", false, o("Robots do exactly what we say.", "A robot only does exactly what the instructions say.", "algo.robots")), tf("A robot follows exactly the instructions it is given.", true, o("Think about our robot.", "A robot does exactly what we say.", "algo.robots"))],
  [ord("Put these steps for getting dressed in order.", ["Take out your clothes", "Put on your clothes", "Do up the buttons"], o("What is first?", "Take out, put on, then do up the buttons.", "algo.order")), ord("Put these steps for drinking water in order.", ["Pick up an empty cup", "Fill the cup", "Drink the water"], o("What first?", "Pick up, fill, then drink.", "algo.order"))],
  [fill("Finish the sentence.", "An {b1} is clear steps in the right {b2}.", [["algorithm", "ant", "apple"], ["order", "colour", "size"]], o("Use the words from the lesson.", "An algorithm is clear steps in the right order.", "algo.vocab")), fill("Finish this sentence about bugs.", "A {b1} is a mistake in the instructions.", [["bug", "loop", "star"]], o("It is not a real insect.", "A bug is a mistake in instructions.", "algo.vocab"))],
  [ms("Which are instructions for a robot? Pick two.", ["Forward", "Turn"], ["Happy", "Purple"], o("Instructions say what to do.", "Forward and turn tell a robot what to do.", "algo.instructions")), ms("Which are things that could be a loop? Pick two.", ["Repeat clap 3 times", "Repeat hop 5 times"], ["Blue sky", "A red star"], o("A loop repeats.", "Both repeat an action.", "algo.loops"))],
  [num("A loop says: repeat jump, 4 times. How many jumps?", 4, o("Count the repeats.", "Repeat 4 times is 4 jumps.", "algo.loops")), num("A loop says: repeat clap, 6 times. How many claps?", 6, o("Count the repeats.", "Repeat 6 times is 6 claps.", "algo.loops"))],
  [mat("Match each word to what it means.", [["Loop", "Repeats instructions"], ["Bug", "A mistake"], ["Algorithm", "Steps in order"]], o("Think back to the stops.", "Loop repeats, bug is a mistake, algorithm is steps in order.", "algo.vocab")), mat("Match each robot word to its job.", [["Forward", "Move one square"], ["Turn", "Change direction"], ["Debug", "Fix a mistake"]], o("Think back to the stops.", "Each word has its own meaning.", "algo.vocab"))],
  [mc("Mia says an algorithm can have the steps in any order. Is she right?", "No, the order matters", ["Yes, any order works", "Only for robots"], o("Think about the sandwich.", "If the order is wrong, the job may not work.", "algo.reason")), mc("Ravi says the top slice of bread can go on first. Is he right?", "No, the bread goes on the plate first", ["Yes, it makes no difference", "Only on Fridays"], o("Think about the sandwich.", "The order matters, so the bread goes down first.", "algo.reason"))],
  [sld("A robot starts at the left of the top row and the star is 4 squares away. Slide to show how many forwards it needs.", { min: 0, max: 8 }, 4, 0, o("Count the squares.", "It needs 4 forward steps.", "algo.count_steps")), sld("The star is 3 squares away. Slide to show how many forwards the robot needs.", { min: 0, max: 8 }, 3, 0, o("Count the squares.", "It needs 3 forward steps.", "algo.count_steps"))],
  [hot("Tap the picture that says what to do when it rains.", [["☔", "If rain, take an umbrella", 22, 50], ["🍎", "An apple", 50, 50], ["🌟", "A star", 78, 50]], ["If rain, take an umbrella"], { labels: true, ...o("Look for 'if' and 'then'.", "If rain, then take an umbrella is an if-then.", "algo.if_then") }), hot("Tap the picture that says what to do when it is cold.", [["🧥", "If cold, wear a coat", 22, 50], ["🐟", "A fish", 50, 50], ["🎈", "A balloon", 78, 50]], ["If cold, wear a coat"], { labels: true, ...o("Look for 'if' and 'then'.", "If cold, then wear a coat is an if-then.", "algo.if_then") })],
  [mc("Which instruction would you use to repeat something many times?", "A loop", ["A bug", "A star"], o("Think about repeating.", "A loop repeats instructions.", "algo.loops")), mc("What helps us avoid writing the same step five times?", "A loop", ["A bug", "A crayon"], o("Think about repeating.", "A loop repeats steps.", "algo.loops"))],
  [mc("A robot is told forward, forward, forward, but the star is 4 squares away. What should we do?", "Add another forward", ["Take away the star", "Turn the robot off"], o("Count the squares.", "We add one more forward to fix the bug.", "algo.debug")), mc("A robot is told to go forward 5 times but the star is 4 squares away. What is the bug?", "There is one forward too many", ["There is one forward missing", "The star is blue"], o("Count again.", "One forward is too many.", "algo.debug"))],
  [tf("A bug is a real insect inside a computer.", false, o("In coding, a bug is a mistake.", "A bug is a mistake in the instructions.", "algo.debug")), tf("A bug in computing is an insect that lives in the wires.", false, o("Think about what we learned.", "A bug is a mistake.", "algo.debug"))],
  [mc("Aisha followed steps for making toast but forgot to put the bread in. What happened?", "No toast, so there was a bug in the steps", ["The toast was perfect", "The toaster flew"], o("A step was missed.", "A missing step is a bug.", "algo.reason")), mc("Zain's steps for tea left out the hot water. What is the problem?", "A step is missing, so the tea fails", ["Nothing is wrong", "The cup is too big"], o("A step was missed.", "A missing step is a bug.", "algo.reason"))],
  [ord("Put these steps for planting a flower in order.", ["Dig a hole", "Place the plant in the hole", "Pour on some water"], o("What first?", "Dig, plant, then water.", "algo.everyday")), ord("Put these steps for making lemonade in order.", ["Squeeze the lemons", "Add water and sugar", "Stir and pour"], o("What first?", "Squeeze, add, then stir and pour.", "algo.everyday"))],
];

const qd = (q, sub, depth) => ({ q, sub, depth });
const qa = (q, sub, depth, alts) => ({ q, sub, depth, alts });
const clip = {
  title: "Zainab and the robot", backdrop: "classroom", caption: "Zainab gives a robot exact steps and fixes a bug.",
  scenes: [
    { caption: "Meet the robot.", say: "Zainab has a toy robot. It only follows exact steps.",
      items: [{ id: "z", emoji: "👧", label: "Zainab", x: 25, y: 56, size: 3, enter: "walk_right" }, { id: "r", emoji: "🤖", x: 72, y: 50, size: 3, enter: "pop" }] },
    { caption: "Forward!", say: "She says forward, forward. The robot moves two squares.",
      items: [{ id: "r", emoji: "🤖", x: 55, y: 50, size: 3, enter: "slide_right" }, { id: "a", emoji: "➡️", x: 25, y: 50, size: 2 }] },
    { caption: "Turn.", say: "Then turn. The robot now faces the star.",
      items: [{ id: "r", emoji: "🤖", x: 40, y: 50, size: 3, anim: "spin" }, { id: "s", emoji: "⭐", x: 75, y: 50, size: 3 }] },
    { caption: "A bug!", say: "Oh no! The robot stops short. One forward is missing.",
      items: [{ id: "r", emoji: "🤖", x: 40, y: 50, size: 3 }, { id: "b", emoji: "🐛", label: "bug", x: 62, y: 35, size: 2, anim: "bounce" }, { id: "s", emoji: "⭐", x: 80, y: 50, size: 3 }] },
    { caption: "Debug it.", say: "Zainab adds one more forward. That is called debugging.",
      items: [{ id: "z", emoji: "👧", x: 25, y: 56, size: 3 }, { id: "f", emoji: "➕", label: "forward", x: 65, y: 45, size: 3, effect: "sparkle" }] },
    { caption: "A loop.", say: "Now she uses a loop. Repeat forward four times.",
      items: [{ id: "l", emoji: "🔁", label: "repeat 4", x: 50, y: 45, size: 3, anim: "pulse" }] },
    { caption: "The star!", say: "The robot reaches the star. Clear steps in order worked.",
      items: [{ id: "r", emoji: "🤖", x: 40, y: 50, size: 3, anim: "bounce" }, { id: "s", emoji: "⭐", x: 75, y: 50, size: 3, effect: "glow" }] },
    { caption: "Sandwich steps.", say: "Zainab uses steps to make a sandwich too. Order matters!",
      items: [{ id: "s", emoji: "🥪", x: 50, y: 48, size: 3, effect: "hearts" }] },
  ],
};

export const topics = [
  topicLesson({
    slug: "data-ai-class-1-algorithms-robots", subject: "data-ai", cls: 1, topic: 1, title: "Algorithms and Robots",
    summary: "Giving a robot directions, algorithms, loops, if-then and finding bugs.",
    unit: "Topic 1: Algorithms and robots", difficulty: 1,
    objectives: ["Give a robot clear instructions", "Say what an algorithm, a loop and a bug are", "Fix a mistake in a set of instructions"],
    success_criteria: ["I can put steps in the right order", "I can say what a loop does", "I can find and fix a bug"],
    real_life: "Cooking rice, making chai and getting ready for school all follow steps in order.",
    standards: [
      { framework: "nc_england", code: "KS1 algorithms", text: "Understand what algorithms are; create and debug simple programs" },
      { framework: "csta", code: "1A-AP-08", text: "Model daily processes by creating and following algorithms" },
      { framework: "csta", code: "1A-AP-10", text: "Develop programs with sequences and simple loops" },
      { framework: "csta", code: "1A-AP-14", text: "Debug errors in an algorithm or program" },
    ],
    warm_up: [
      mc("Which comes next? Red, blue, red, blue, ...", "Red", ["Green", "Yellow"], o("The colours take turns.", "The pattern repeats red then blue.")),
      num("What is 5 + 3?", 8, o("Count on from 5.", "5 and 3 make 8.")),
      tf("A triangle has three sides.", true, o("Count the sides.", "A triangle has three sides.")),
    ],
    intro: [],
    subs: [directions, loopsIf, bugs, around],
    clip,
    quiz: [
      qd(mc("Which instruction moves the robot one square along?", "Forward", ["Turn", "Loop"], o("Think about walking.", "Forward moves one square.", "algo.instructions")), "directions", "recall"),
      qd(tf("A robot can guess what we mean if our instruction is unclear.", false, o("Robots do exactly what we tell them.", "A robot only follows the exact instructions.", "algo.robots")), "directions", "recall"),
      qd(ord("Put these steps for brushing teeth in order.", ["Put paste on the brush", "Brush your teeth", "Rinse your mouth"], o("What is first?", "Paste, brush, then rinse.", "algo.order")), "directions", "apply"),
      qd(fill("Finish this sentence about algorithms.", "An {b1} is a list of clear steps in the right {b2}.", [["algorithm", "apple", "ant"], ["order", "colour", "shape"]], o("Use the lesson words.", "An algorithm is clear steps in the right order.", "algo.vocab")), "directions", "recall"),
      qd(ms("Which are instructions a robot could follow? Pick two.", ["Forward", "Turn"], ["Sleepy", "Rainbow"], o("Instructions say what to do.", "Forward and turn are robot instructions.", "algo.instructions")), "directions", "apply"),
      qd(num("A loop says: repeat clap, 3 times. How many claps is that?", 3, o("Count the repeats.", "Repeat 3 times is 3 claps.", "algo.loops")), "loops_if", "apply"),
      qd(mat("Match each word to its meaning.", [["Loop", "Repeats instructions"], ["Bug", "A mistake"], ["Algorithm", "Steps in order"]], o("Think back to the stops.", "Each word has its own meaning.", "algo.vocab")), "bugs", "recall"),
      qd(mc("Sana says the steps of an algorithm can go in any order. Is she right?", "No, the order matters", ["Yes, any order works", "Only when it is sunny"], o("Think about the sandwich.", "If the order is wrong, the job may not work.", "algo.reason")), "directions", "reason"),
      qd(sld("The star is 4 squares away from the robot. Slide to show how many forwards it needs.", { min: 0, max: 8 }, 4, 0, o("Count the squares.", "It needs 4 forward steps.", "algo.count_steps")), "directions", "apply"),
      qd(hot("Tap the picture that shows an if-then.", [["🌧️", "If rain, take an umbrella", 22, 50], ["🍌", "A banana", 50, 50], ["🌙", "The moon", 78, 50]], ["If rain, take an umbrella"], { labels: true, ...o("Look for 'if' and 'then'.", "If rain, then take an umbrella is an if-then.", "algo.if_then") }), "loops_if", "apply"),
      qd(mc("What helps us avoid writing the same step many times?", "A loop", ["A bug", "A crayon"], o("Think about repeating.", "A loop repeats steps.", "algo.loops")), "loops_if", "reason"),
      qd(mc("A robot is told forward, forward, forward, but the star is 4 squares away. What is the bug?", "A forward is missing", ["The star is blue", "The robot is happy"], o("Count the squares.", "One forward is missing.", "algo.debug")), "bugs", "reason"),
      qd(tf("In computing, a bug is a real insect inside the computer.", false, o("A bug is a mistake.", "A bug is a mistake in the instructions.", "algo.debug")), "bugs", "recall"),
      qd(mc("Aliyah followed steps for toast but forgot to put the bread in. What was the problem?", "A step was missing, so there was a bug", ["Nothing was wrong", "The toaster was too cold"], o("A step was missed.", "A missing step is a bug.", "algo.reason")), "around", "reason"),
      qd(ord("Put these steps for making a cup of chai in order.", ["Boil the water", "Add the tea", "Pour into a cup"], o("What is first?", "Boil, add, then pour.", "algo.everyday")), "around", "apply"),
      // ----- upgrade: 15 new mains (q16-q30), 1 variant each
      qa(num("A robot goes forward 2 times, then forward 3 times. How many squares has it moved?", 5, o("Add 2 and 3.", "2 + 3 = 5 squares.", "algo.count_steps")), "directions", "apply",
        [num("A robot goes forward 4 times, then forward 2 times. How many squares has it moved?", 6, o("Add 4 and 2.", "4 + 2 = 6 squares.", "algo.count_steps"))]),
      qa(mc("Aisha says only one set of instructions can reach the star. Is she right?", "No. Different instructions can reach the same star", ["Yes, there is only one way", "No, robots cannot reach stars"], o("Try two different routes.", "There can be more than one correct algorithm.", "algo.reason")), "directions", "reason",
        [mc("Omar says there is only one way to get to the corner. Is he right?", "No. A robot can take different routes to the same corner", ["Yes, only one route works", "No, robots cannot move"], o("Think of two routes.", "Different routes can reach the same place.", "algo.reason"))]),
      qa(mc("Layla makes toast. She puts the bread in the toaster before she gets the bread. What goes wrong?", "The order is wrong, so it does not work", ["Nothing goes wrong", "The toaster gets hungry"], o("Which step comes first?", "Changing the order of steps can break an algorithm.", "algo.reason")), "directions", "reason",
        [mc("Sam puts on his shoes before his socks. What goes wrong?", "The order is wrong, so the socks end up outside", ["Nothing goes wrong", "The socks get happy"], o("Which step comes first?", "The order of steps matters.", "algo.reason"))]),
      qa(mc("Zayn says a robot can understand 'go to the star' without any other steps. Why is he wrong?", "A robot needs exact steps, such as forward and turn", ["Robots hate stars", "Robots only need one word"], o("Robots cannot guess.", "A robot does only what the exact steps say.", "algo.reason")), "directions", "reason",
        [mc("Hana says a robot can just guess what she means. Why is she wrong?", "A robot only does exactly what the steps say", ["Robots guess very well", "Robots read minds"], o("Robots cannot guess.", "A robot follows exact steps.", "algo.reason"))]),
      qa(mc("Sam tells a robot: 'Go over there.' Why is that a bad instruction?", "It is too vague. The robot needs clear steps", ["It is too short", "Robots do not like talking"], o("Which way is there?", "A good instruction is clear and exact.", "algo.reason")), "bugs", "reason",
        [mc("Mina tells a robot: 'Move a bit.' Why is that a bad instruction?", "It is too vague. The robot needs an exact number of steps", ["It has too many words", "Robots only move at night"], o("How far is a bit?", "A good instruction is clear and exact.", "algo.reason"))]),
      qa(mat("Match each command to what the robot does.", [["Forward", "Moves one square"], ["Turn left", "Faces its left"], ["Turn right", "Faces its right"]], o("Think about each word.", "Each command makes the robot do one thing.", "algo.instructions")), "directions", "apply",
        [mat("Match each word to its job.", [["Repeat 3 times", "Does it three times"], ["Stop", "Stops moving"], ["Forward", "Moves ahead"]], o("Think about each word.", "Each word tells the robot what to do.", "algo.instructions"))]),
      qa(fill("Finish the sentences about loops.", "A {b1} lets us write repeat clap 5 times instead of {b2} lines.", [["loop", "bug", "star"], ["5", "1", "0"]], o("Think about repeating.", "A loop saves us writing the same line 5 times.", "algo.loops")), "loops_if", "apply",
        [fill("Complete the sentences about repeating.", "Repeat hop 4 times is the same as hop {b1} times. It uses a {b2}.", [["4", "1", "2"], ["loop", "bug", "star"]], o("Think about repeating.", "Repeat 4 times means 4 hops, and it uses a loop.", "algo.loops"))]),
      qa(hot("Tap the instruction that is too vague for a robot.", [["➡️", "Forward 2 squares", 22, 50], ["❓", "Go over there", 50, 50], ["↪️", "Turn right", 78, 50]], ["Go over there"], { labels: true, ...o("Which one is not exact?", "Go over there does not say how far or which way.", "algo.instructions") }), "bugs", "apply",
        [hot("Tap the step that does NOT help the robot reach the star.", [["⬇️", "Forward", 22, 50], ["🎂", "Eat a cake", 50, 50], ["↪️", "Turn", 78, 50]], ["Eat a cake"], { labels: true, ...o("Which one is not a robot move?", "Eating cake does not move the robot.", "algo.instructions") })]),
      qa(sld("The star is 5 squares away. Slide to show how many forwards the robot needs.", { min: 0, max: 8 }, 5, 0, o("Count the squares.", "It needs 5 forward steps.", "algo.count_steps")), "directions", "apply",
        [sld("The star is 6 squares away. Slide to show how many forwards the robot needs.", { min: 0, max: 8 }, 6, 0, o("Count the squares.", "It needs 6 forward steps.", "algo.count_steps"))]),
      qa(ms("Which two instructions turn a robot? Pick two.", ["Turn left", "Turn right"], ["Forward", "Repeat"], o("Look for the word turn.", "Turn left and turn right change the way it faces.", "algo.instructions")), "directions", "apply",
        [ms("Which two are good steps for brushing teeth? Pick two.", ["Put paste on the brush", "Rinse your mouth"], ["Eat a sandwich", "Go to bed"], o("Think about brushing teeth.", "Paste and rinsing are part of brushing teeth.", "algo.order"))]),
      qa(tf("If it is raining, then take an umbrella. It is sunny. You must take an umbrella.", false, o("Is the if part true?", "It is not raining, so you do not need an umbrella.", "algo.if_then")), "loops_if", "apply",
        [tf("If it is dark, then switch on the light. It is dark. You switch on the light.", true, o("Is the if part true?", "It is dark, so you switch on the light.", "algo.if_then"))]),
      qa(ord("Put these steps for crossing the road safely in order.", ["Stop at the kerb", "Look both ways", "Cross when it is clear"], o("What first?", "Stop, look, then cross.", "algo.order")), "around", "apply",
        [ord("Put these steps for making a paper boat in order.", ["Fold the paper in half", "Fold the corners", "Open it into a boat"], o("What first?", "Fold, fold, then open.", "algo.order"))]),
      qa(tf("A program can have a bug even when the robot moves.", true, o("Moving is not the same as correct.", "The robot can move but go the wrong way.", "algo.debug")), "bugs", "recall",
        [tf("Once we fix a bug, we never need to test again.", false, o("Always test again.", "We test again to check the fix worked.", "algo.debug"))]),
      qa(mc("A robot faces right. It does turn right. Which way does it face now?", "Down", ["Up", "Left"], o("Turn right like a clock hand.", "Right then turn right faces down.", "algo.turns")), "directions", "apply",
        [mc("A robot faces right. It does turn left. Which way does it face now?", "Up", ["Down", "Right"], o("Turn left like a clock hand going back.", "Right then turn left faces up.", "algo.turns"))]),
      qa(mc("Steps for a sandwich: bread on plate, add the top slice. Which step is missing?", "Add the filling", ["Wash the plate", "Sing a song"], o("What goes in the middle?", "The filling goes between the slices.", "algo.debug")), "around", "apply",
        [mc("Steps for brushing teeth: put paste on the brush, then rinse. Which step is missing?", "Brush your teeth", ["Open the window", "Play a game"], o("What do you do with the brush?", "You must brush before you rinse.", "algo.debug"))]),
    ].map((x, i) => (x.alts ? x : { ...x, alts: ALTS[i] })),
  }),
];
