import { SAY, SS, H, T, IMG, REVEAL, ACT, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld, PHOTO } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Computer Science, Data & AI, Class 4 (Fatima, age 9), topic 1: Thinking like a programmer.
// Standards: NC KS2 programming, CSTA 1B algorithms and programming (docs/CURRICULUM_V2.md).
const o = (hint, why, tag) => ({ hint, why, tag });
const RG = (id, col, row, facing, anim = "none") => [id, { kind: "robot_grid", col, row, facing }, 50, 50, 3, anim];

const PUZZLE = "data-ai-class-4-thinking-like-a-programmer-1-4ef8ce11.jpg";
const SPIRAL = "data-ai-class-4-thinking-like-a-programmer-2-ce564075.jpg";

const decompose = {
  id: "decompose", kind: "learn", title: "Breaking problems down and flowcharts",
  blocks: [
    H("Welcome back, young programmer!"),
    SAY("Today we think like a programmer. How do we solve a big problem in small steps?", T("Today's big question: how do programmers solve big problems?")),
    SAY("A jigsaw has many small pieces. Programmers solve big problems by fitting small parts together.", PHOTO(PUZZLE, "A blue jigsaw puzzle with one piece missing", "Small pieces make a big picture.", "Photo by Tanja Tepavac on Unsplash")),
    H("Stop 1: Decomposition"),
    SAY("Big problems can feel scary. Programmers have a trick: they break a big problem into small parts that are easier to solve. This is called decomposition. Imagine we want to make a birthday card app. That is big! But we can split it: draw the picture, write the message, choose the colours, and share it. Each small part is simple to build.", T("**Decomposition** means breaking a big problem into small parts.", "Each part is easier to solve, and together they solve the whole problem.")),
    EXP("Splitting a big problem",
      SS("Here is the big problem: make a birthday card app.", S("The big problem.", ["big", "🎂", 50, 50, 3, "pulse", "Card app"])),
      SS("We break it into four smaller jobs.", S("Four smaller jobs.", ["a", "🎨", 20, 35, 2, "bounce", "Picture"], ["b", "✏️", 40, 35, 2, "bounce", "Message"], ["c", "🌈", 60, 35, 2, "bounce", "Colours"], ["d", "📤", 80, 35, 2, "bounce", "Share"])),
      SS("Now each job is small enough to do one at a time. When all four are done, the app is finished.", S("Do each part, then join them up.", ["a", "🎨", 20, 55, 2, "none", "Picture"], ["b", "✏️", 40, 55, 2, "none", "Message"], ["c", "🌈", 60, 55, 2, "none", "Colours"], ["d", "📤", 80, 55, 2, "none", "Share"], ["ok", "✅", 50, 20, 3, "bounce"]))),
    CHK(mc("What does decomposition mean?", "Breaking a big problem into small parts", ["Making a program faster", "Deleting a program"], o("Think of cutting a cake.", "Decomposition splits a problem into smaller parts.", "prog.decompose"))),
    H("Stop 2: Flowcharts"),
    SAY("A flowchart is a picture of an algorithm. Each box is a step, and arrows show the order. A diamond shape asks a yes or no question. Let us look at a flowchart for crossing the road safely. Start, then stop at the kerb. Then look both ways. Is the road clear? If yes, cross. If no, wait and look again.", T("A **flowchart** draws an **algorithm** with boxes and arrows.", "A diamond asks a yes or no question.")),
    EXP("Crossing the road",
      SS("We start at the kerb and stop.", S("Start: stop at the kerb.", ["a", "🛑", 50, 25, 3, "bounce", "Stop at the kerb"])),
      SS("Then we look both ways. Next comes the question diamond: is the road clear?", S("Look both ways. Is the road clear?", ["a", "🛑", 50, 15, 2, "none", "Stop"], ["b", "👀", 50, 45, 3, "bounce", "Look both ways"], ["q", "❓", 50, 75, 2, "pulse", "Clear?"])),
      SS("If yes, we cross. If no, we wait and look again. The arrow loops back to the question.", S("Yes: cross. No: wait and look again.", ["q", "❓", 50, 50, 2, "pulse", "Clear?"], ["y", "🚶", 80, 50, 3, "bounce", "Yes: cross"], ["n", "⏳", 20, 50, 3, "bounce", "No: wait"]))),
    CHK(mc("In a flowchart, what does a diamond ask?", "A yes or no question", ["A colour", "A song"], o("There are two ways out.", "A diamond is a question with yes and no.", "prog.flowchart"))),
    SAY("Let us remember. Break big problems into parts. Draw an algorithm as a flowchart.", SUM("Decomposition breaks a big problem into parts", "A flowchart shows an algorithm as boxes and arrows")),
    GLOSS({ procedure: "A named set of steps that can be used again.", decomposition: "Breaking a big problem into smaller parts.", flowchart: "A picture of an algorithm with boxes and arrows.", algorithm: "A list of clear steps in the right order.", problem: "Something we need to solve." }),
  ],
  mini: [
    mc("Why do programmers break problems into parts?", "Small parts are easier to solve", ["It uses more paper", "It is slower"], o("Think about a big jigsaw.", "Small parts are easier to solve.")),
    tf("An arrow in a flowchart shows which step comes next.", true, o("Arrows show direction.", "Arrows show the order of steps.")),
    ord("Put the parts of making a sandwich app in a sensible order.", ["Choose bread", "Choose filling", "Show the finished sandwich"], o("What first?", "Bread, filling, then the finished sandwich.")),
    mc("A flowchart is a picture of an...", "Algorithm", ["Animal", "Answer"], o("Steps in order.", "A flowchart shows an algorithm.")),
  ],
};

const loopsIf = {
  id: "loops_if", kind: "try", title: "Loops and decisions",
  blocks: [
    H("Stop 1: Loops"),
    SAY("A spiral staircase repeats the same step again and again. A loop repeats steps in a program.", PHOTO(SPIRAL, "A spiral staircase seen from above", "A spiral repeats the same step again and again, like a loop.", "Photo by Jean-Luc Benazet on Unsplash")),
    SAY("A loop repeats a set of steps. To draw a square we could write: forward, turn, forward, turn, forward, turn, forward, turn. That is eight steps. With a loop we just write: repeat four times, forward then turn. Same square, much shorter. Loops save time and avoid mistakes. Watch the robot drive round a square using a loop.", T("A **loop** repeats steps. Repeat 4 times: forward, turn.", "Loops make programs shorter.")),
    EXP("A loop draws a square",
      SS("The robot starts here and faces right. Repeat four times: forward, turn.", S("Loop 1 begins.", RG("r", 0, 0, "right"))),
      SS("First pass: it moves forward, then turns right to face down.", S("Pass 1: forward, turn.", RG("r", 2, 0, "down", "pulse"))),
      SS("Second pass. Forward, and turn to face left.", S("Pass 2: forward, turn.", RG("r", 2, 2, "left", "pulse"))),
      SS("Third and fourth passes complete the square, and the robot is back where it started.", S("Passes 3 and 4 finish the square.", RG("r", 0, 0, "right", "bounce")))),
    CHK(num("A loop says: repeat 5 times: clap. How many claps in all?", 5, o("Count the repeats.", "Repeat 5 times means 5 claps.", "prog.loops"))),
    ACT("Program a friend", ["A friend or grown-up", "Open floor space"], ["Write a short program on paper using a loop, like: repeat 3 times: step forward, clap.", "Read it out. Your friend acts it out exactly.", "Did it work? Swap roles."]),
    H("Stop 2: Decisions with if and else"),
    SAY("Programs make decisions. If a condition is true, they do one thing. Else, they do something different. If the traffic light is green, then go. Else, stop. The condition is the question the computer checks. It is always true or false. Try writing your own: if it is raining, take an umbrella, else wear sunglasses.", T("**If** a **condition** is true, do one thing. **Else**, do another.", "If the light is green, go. Else, stop.")),
    IMG("🟢🚦🔴", "If green, go. Else, stop."),
    CHK(mc("If it is raining, take an umbrella. Else, wear sunglasses. It is sunny. What do you do?", "Wear sunglasses", ["Take an umbrella", "Do both"], o("Is the condition true?", "It is not raining, so we use the else.", "prog.decisions"))),
    SAY("Let us remember. Loops repeat. If and else make decisions.", SUM("A loop repeats steps", "If and else let a program decide")),
    GLOSS({ loop: "A set of steps that repeats.", condition: "A question that is true or false.", if: "Do this when the condition is true.", else: "Do this when the condition is false.", repeat: "To do the same steps again." }),
  ],
  mini: [
    num("Repeat 3 times: forward 2 squares. How many squares in all?", 6, o("3 times 2.", "3 x 2 = 6.")),
    mc("What does else mean in a program?", "What to do if the condition is false", ["What to do first", "The end of the program"], o("The other choice.", "Else is for when the condition is false.")),
    tf("A condition is always true or false.", true, o("Yes or no.", "A condition has two possible answers.")),
    mc("Which program is shorter?", "Repeat 4 times: forward, turn", ["Forward, turn, forward, turn, forward, turn, forward, turn", "They are the same length"], o("Loops save writing.", "A loop is shorter.")),
  ],
};

const variables = {
  id: "variables", kind: "play", title: "Variables: boxes that remember",
  blocks: [
    H("Stop 1: What is a variable?"),
    SAY("A variable is like a labelled box that holds a value. Games use variables to remember things, like your score. We give the box a name, such as score, and put a number in it. When you catch a star, the program changes the number inside. Watch the score variable change.", T("A **variable** is a labelled box that stores a **value**.", "A game keeps your score in a variable.")),
    EXP("The score variable",
      SS("The program sets score to zero. The box is labelled score and holds 0.", S("score = 0", ["bx", "📦", 50, 60, 3, "none", "score: 0"])),
      SS("You catch a star! The program adds one. Now score holds 1.", S("score = score + 1, so it is 1.", ["bx", "📦", 50, 60, 3, "bounce", "score: 1"], ["st", "⭐", 80, 25, 2, "bounce"])),
      SS("Catch another star, and score holds 2. The value changes but the name stays the same.", S("Now score is 2.", ["bx", "📦", 50, 60, 3, "bounce", "score: 2"], ["st", "⭐", 80, 25, 2, "bounce"], ["st2", "⭐", 65, 25, 2, "bounce"]))),
    CHK(num("score is 4. You catch one more star and the program adds 1. What is score now?", 5, o("Add 1.", "4 + 1 = 5.", "prog.variables"))),
    H("Stop 2: Brain game"),
    SAY("Time for a brain game to stretch your memory. Watch the order of the lights and copy them. Programs remember steps in order too.", T("Watch carefully, then copy the **order**.")),
    BRAIN("remember_order", "Memory lights", "Watch the order, then copy it.", ["🔴", "🟡", "🟢", "🔵", "🟣"]),
    CHK(tf("A variable's value can change while the program runs.", true, o("Think about a score.", "That is why it is called a variable.", "prog.variables"))),
    SAY("Let us remember. A variable is a named box that stores a value. The value can change.", SUM("A variable has a name and a value", "The value can change as the program runs")),
    GLOSS({ variable: "A named box that stores a value.", value: "The thing stored in a variable, such as a number.", score: "A number that counts points.", order: "What comes first, next and last." }),
  ],
  mini: [
    mc("What is a variable?", "A named box that stores a value", ["A kind of loop", "A broken program"], o("Like a labelled box.", "A variable stores a value with a name.")),
    num("lives = 3. You lose one life: lives = lives - 1. What is lives now?", 2, o("Take away 1.", "3 - 1 = 2.")),
    tf("The name of a variable usually changes every time its value changes.", false, o("Does the box change its label?", "The name stays the same.")),
  ],
};

const debugUse = {
  id: "debug", kind: "use", title: "Debug and design a program",
  blocks: [
    H("Stop 1: Finding bugs"),
    SAY("Programs often have bugs. A bug is a mistake, and debugging means finding it and fixing it. A good way to debug is to trace the program. That means following it step by step, like the computer would, and checking what happens at each step. Look at this robot program: forward, forward, forward, turn right, forward, forward. The goal is to reach the star at the bottom right corner.", T("A **bug** is a mistake in a program. To **debug**, we **trace** it step by step.")),
    EXP("Tracing a program",
      SS("The robot starts at the top left and faces right. Three forwards take it along the top row.", S("After three forwards.", RG("r", 3, 0, "right"))),
      SS("Turn right to face down. Then two forwards.", S("After the turn and two forwards.", RG("r", 3, 2, "down"))),
      SS("But the star is at the bottom right corner, which is four across and four down. The robot is not there! The program needs one more forward across and two more down. We found the bugs.", S("The robot is short of the star. Bugs found!", RG("r", 3, 2, "down", "pulse"), ["bug", "🐛", 80, 20, 2, "bounce"]))),
    CHK(mc("A program should move the robot 4 squares, but it only moves 3. What is the best way to find the bug?", "Trace it step by step", ["Delete the whole program", "Guess and hope"], o("Follow it like the computer.", "Tracing shows exactly where the mistake is.", "prog.debug"))),
    H("Stop 2: Design your own"),
    SAY("Now design a program of your own. Choose a game idea, like a dice game. Break it into parts and draw a flowchart. Decide what variables you need, and use a loop and a decision. Test it with a friend. If it goes wrong, debug it.", T("Design a program: decompose it, draw a flowchart, use a variable, then test and debug.")),
    IMG("🎲🧩", "Plan the parts, then test and debug."),
    ACT("My dice game plan", ["Paper and pencil", "A dice and a friend"], ["Write your game idea in one sentence.", "Break it into three parts.", "Draw a flowchart with one question diamond.", "Name one variable, such as score.", "Test it with a friend and fix any bug."]),
    REVEAL("Why is testing important even if the plan looks perfect?", "A plan can hide small mistakes. Testing shows them so we can debug."),
    CHK(tf("Debugging means finding and fixing mistakes in a program.", true, o("Think about bugs.", "Debugging means fixing mistakes.", "prog.debug"))),
    SAY("Let us remember. Trace to find bugs. Design, test and debug.", SUM("Trace a program to find bugs", "Design, test and debug")),
    GLOSS({ bug: "A mistake in a program.", debug: "To find and fix bugs.", trace: "To follow a program step by step.", test: "To try something to see if it works." }),
  ],
  mini: [
    mc("What does trace mean?", "Follow a program step by step", ["Draw a picture", "Delete the code"], o("Like the computer would.", "Tracing follows each step.")),
    tf("A bug is a mistake in a program.", true, o("Not an insect.", "A bug is a mistake.")),
    ord("Put these steps for fixing a program in order.", ["Notice the problem", "Trace to find the bug", "Fix and test again"], o("What first?", "Notice, trace, fix and test.")),
  ],
};

const ALTS = [
  [mc("A programmer splits a big game into small jobs. This is called...", "Decomposition", ["Debugging", "Looping"], o("Breaking apart.", "Splitting a problem is decomposition.", "prog.decompose")), mc("Which word means breaking a problem into smaller parts?", "Decomposition", ["Variable", "Condition"], o("Breaking apart.", "That is decomposition.", "prog.decompose"))],
  [mc("Which flowchart shape holds a yes or no question?", "A diamond", ["A circle drawn as a face", "A heart"], o("Two ways out.", "A diamond holds a question.", "prog.flowchart")), mc("What shape is used for a question in a flowchart?", "A diamond", ["A star", "A triangle"], o("Two ways out.", "A diamond holds a question.", "prog.flowchart"))],
  [num("Repeat 6 times: step forward. How many steps?", 6, o("Count the repeats.", "6 repeats is 6 steps.", "prog.loops")), num("Repeat 8 times: jump. How many jumps?", 8, o("Count the repeats.", "8 repeats is 8 jumps.", "prog.loops"))],
  [fill("Finish this sentence about decisions.", "If the condition is true we do the first thing, {b1} we do the {b2} thing.", [["else", "and", "but"], ["other", "same", "first"]], o("Think about if and else.", "Else covers the false case.", "prog.vocab")), fill("Complete this sentence about loops.", "A {b1} {b2} steps.", [["loop", "bug", "box"], ["repeats", "deletes", "hides"]], o("What does a loop do?", "A loop repeats steps.", "prog.vocab"))],
  [ms("Which two are true about loops? Pick two.", ["They repeat steps", "They make programs shorter"], ["They hide bugs", "They need no steps"], o("Think back.", "Loops repeat steps and shorten programs.", "prog.loops")), ms("Pick the two true statements about variables.", ["They have a name", "They store a value"], ["They never change", "They are bugs"], o("Think back.", "Variables have a name and a value.", "prog.variables"))],
  [mat("Match each coding word to what it means.", [["Variable", "A named box"], ["Bug", "A mistake"], ["Loop", "Repeats steps"]], o("Think back.", "Each word has its own meaning.", "prog.vocab")), mat("Pair each programming idea with its job.", [["Condition", "True or false"], ["Flowchart", "Picture of steps"], ["Trace", "Follow step by step"]], o("Think back.", "Each idea has a job.", "prog.vocab"))],
  [mc("The traffic light is red. The program says: if green, go, else stop. What happens?", "Stop", ["Go", "Nothing"], o("Is the condition true?", "It is not green, so the else runs.", "prog.decisions")), mc("The rule: if the door is open, walk in, else knock. The door is closed. What happens?", "Knock", ["Walk in", "Run away"], o("Is the condition true?", "The door is not open, so knock.", "prog.decisions"))],
  [mc("Layla says a variable's value can never change. Is she right?", "No, the value can change", ["Yes, never", "Only at night"], o("Think of a score.", "Variables can change.", "prog.reason")), mc("Faisal says a score variable stays at 0 forever. Is he right?", "No, it changes as you play", ["Yes, always 0", "Only on weekends"], o("Think of a score.", "The value changes.", "prog.reason"))],
  [sld("Slide to show the value of score after 6 stars, each adding 1 to 0.", { min: 0, max: 10 }, 6, 0, o("Add 1 six times.", "score is 6.", "prog.variables")), sld("Slide to show lives after starting with 5 and losing 2.", { min: 0, max: 10 }, 3, 0, o("Take away 2.", "5 - 2 = 3.", "prog.variables"))],
  [hot("Tap the box that shows a variable.", [["📦", "score: 3", 22, 50], ["🛑", "Stop sign", 50, 50], ["🌳", "Tree", 78, 50]], ["score: 3"], { labels: true, ...o("A name and a value.", "score: 3 has a name and a value.", "prog.variables") }), hot("Tap the labelled box that stores a number.", [["🎲", "Dice", 22, 50], ["📦", "lives: 2", 50, 50], ["🧸", "Teddy", 78, 50]], ["lives: 2"], { labels: true, ...o("A name and a value.", "lives: 2 is a variable.", "prog.variables") })],
  [mc("Which is the shorter program for four claps?", "Repeat 4 times: clap", ["Clap, clap, clap, clap", "They are the same"], o("Loops save writing.", "A loop is shorter.", "prog.loops")), mc("Which is the shorter way to write eight jumps?", "Repeat 8 times: jump", ["Jump, jump, jump, jump, jump, jump, jump, jump", "They are the same"], o("Loops save writing.", "A loop is shorter.", "prog.loops"))],
  [mc("The robot ends two squares before the star. What should you do first to find why?", "Trace the program", ["Switch it off forever", "Paint it blue"], o("Follow each step.", "Tracing finds the bug.", "prog.debug")), mc("A program gives the wrong answer. What is the best first step?", "Trace it step by step", ["Ignore it", "Delete it"], o("Follow each step.", "Tracing finds the bug.", "prog.debug"))],
  [tf("A flowchart can only be used by computers.", false, o("We can use it for any steps.", "People use flowcharts for all kinds of steps.", "prog.flowchart")), tf("We can draw a flowchart for a daily routine, like getting ready for school.", true, o("Any steps in order.", "Flowcharts work for any steps.", "prog.flowchart"))],
  [mc("Ahmed says we never need to test a plan that looks perfect. Is he right?", "No, testing can reveal hidden bugs", ["Yes, never test", "Only for games"], o("Plans can hide bugs.", "Testing shows hidden bugs.", "prog.reason")), mc("Sara says a program works perfectly the first time. Is that always true?", "No, we usually need to test and debug", ["Yes, always", "Only for loops"], o("Think about bugs.", "Programs often need debugging.", "prog.reason"))],
  [ord("Arrange these programming jobs in order.", ["Break the problem into parts", "Write the steps", "Test and debug"], o("Plan first.", "Decompose, write, then test.", "prog.process")), ord("Order these steps for making a game.", ["Have an idea", "Draw a flowchart", "Test it with a friend"], o("Plan first.", "Idea, flowchart, then test.", "prog.process"))],
];

const qd = (q, sub, depth) => ({ q, sub, depth });
const qa = (q, sub, depth, alts) => ({ q, sub, depth, alts });
const clip = {
  title: "Fatima's dice game", backdrop: "classroom", caption: "Fatima plans a dice game, traces it and finds a bug.",
  scenes: [
    { caption: "A big problem.", say: "Fatima wants to make a dice game. It feels like a very big problem.",
      items: [{ id: "f", emoji: "👧", label: "Fatima", x: 25, y: 56, size: 3, enter: "walk_right" }, { id: "d", emoji: "🎲", x: 72, y: 50, size: 3, enter: "pop" }] },
    { caption: "Break it down.", say: "She breaks it into small parts. This is called decomposition.",
      items: [{ id: "a", emoji: "🎲", label: "roll", x: 25, y: 50, size: 2 }, { id: "b", emoji: "🔢", label: "score", x: 50, y: 50, size: 2 }, { id: "c", emoji: "🏆", label: "win", x: 75, y: 50, size: 2 }] },
    { caption: "A flowchart.", say: "She draws a flowchart. A diamond asks whether the roll is a six.",
      items: [{ id: "q", emoji: "🔶", label: "six?", x: 50, y: 48, size: 3, anim: "pulse" }] },
    { caption: "A loop.", say: "A loop repeats the roll three times. Fatima does not copy the steps.",
      items: [{ id: "l", emoji: "🔁", label: "repeat 3", x: 40, y: 48, size: 3, anim: "spin" }, { id: "d", emoji: "🎲", x: 75, y: 50, size: 3 }] },
    { caption: "A variable.", say: "A variable called score remembers the points. It starts at zero.",
      items: [{ id: "v", emoji: "📦", label: "score: 0", x: 50, y: 52, size: 3 }] },
    { caption: "A bug!", say: "She runs it. The score stays at zero. There is a bug.",
      items: [{ id: "v", emoji: "📦", label: "score: 0", x: 40, y: 52, size: 3 }, { id: "b", emoji: "🐛", x: 75, y: 35, size: 2, anim: "bounce" }] },
    { caption: "Trace it.", say: "She traces it step by step. She forgot to add one to the score.",
      items: [{ id: "t", emoji: "🔍", x: 35, y: 50, size: 3, effect: "sparkle" }, { id: "p", emoji: "➕", label: "score + 1", x: 72, y: 50, size: 3, effect: "glow" }] },
    { caption: "Fixed.", say: "She adds the line and tests again. Now the score goes up.",
      items: [{ id: "v", emoji: "📦", label: "score: 3", x: 40, y: 52, size: 3, anim: "bounce" }, { id: "f", emoji: "🎉", x: 75, y: 40, size: 3, effect: "hearts" }] },
  ],
};

export const topics = [
  topicLesson({
    slug: "data-ai-class-4-thinking-like-a-programmer", subject: "data-ai", cls: 4, topic: 1, title: "Thinking Like a Programmer",
    summary: "Decomposition, flowcharts, loops, if and else, variables and debugging.",
    unit: "Topic 1: Thinking like a programmer", difficulty: 2,
    objectives: ["Break a big problem into smaller parts", "Read a flowchart, a loop and an if-else decision", "Say what a variable is and debug a program by tracing"],
    success_criteria: ["I can break a problem into parts", "I can say what a loop, an if-else and a variable do", "I can trace a program to find a bug"],
    real_life: "Planning a route to school, following a recipe and keeping score in a game all use programmer thinking.",
    standards: [
      { framework: "nc_england", code: "KS2 programming", text: "Design, write and debug programs; use sequence, selection and repetition; work with variables" },
      { framework: "csta", code: "1B-AP-10", text: "Create programs that use repetition to solve problems" },
      { framework: "csta", code: "1B-AP-11", text: "Decompose problems into smaller, manageable subproblems" },
      { framework: "csta", code: "1B-AP-15", text: "Test and debug a program or algorithm to ensure it runs as intended" },
    ],
    warm_up: [
      mc("What do we call a list of clear steps in the right order?", "An algorithm", ["A tally", "A bug"], o("Think of a recipe.", "A list of steps is an algorithm.")),
      mc("What is the middle number in 3, 5, 9?", "5", ["3", "9"], o("It is in the middle.", "5 is in the middle.")),
      num("What is 6 x 4?", 24, o("Count in fours.", "6 x 4 = 24.")),
    ],
    intro: [],
    subs: [decompose, loopsIf, variables, debugUse],
    clip,
    quiz: [
      qd(mc("A programmer splits a big game into small jobs. What is this called?", "Decomposition", ["Debugging", "Looping"], o("Breaking apart.", "Splitting a problem is decomposition.", "prog.decompose")), "decompose", "recall"),
      qd(mc("Which shape in a flowchart asks a yes or no question?", "A diamond", ["A star", "A heart"], o("Two ways out.", "A diamond holds a question.", "prog.flowchart")), "decompose", "recall"),
      qd(num("Repeat 7 times: hop. How many hops in all?", 7, o("Count the repeats.", "7 repeats is 7 hops.", "prog.loops")), "loops_if", "apply"),
      qd(fill("Complete this sentence about decisions.", "If the condition is true we do the first thing, {b1} we do the {b2} thing.", [["else", "and", "but"], ["other", "same", "first"]], o("Think about if and else.", "Else covers the false case.", "prog.vocab")), "loops_if", "recall"),
      qd(ms("Pick the two true statements about loops.", ["They repeat steps", "They make programs shorter"], ["They hide bugs", "They need no steps"], o("Think back.", "Loops repeat steps and shorten programs.", "prog.loops")), "loops_if", "apply"),
      qd(mat("Match each word to its meaning.", [["Variable", "A named box"], ["Bug", "A mistake"], ["Loop", "Repeats steps"]], o("Think back.", "Each word has its own meaning.", "prog.vocab")), "variables", "recall"),
      qd(mc("The rule is: if the light is green, go, else stop. The light is red. What happens?", "Stop", ["Go", "Nothing"], o("Is the condition true?", "It is not green, so the else runs.", "prog.decisions")), "loops_if", "apply"),
      qd(mc("Zara says a variable's value can never change. Is she right?", "No, the value can change", ["Yes, never", "Only at night"], o("Think of a score.", "Variables can change.", "prog.reason")), "variables", "reason"),
      qd(sld("Slide to show the value of score after 5 stars, each adding 1 to 0.", { min: 0, max: 10 }, 5, 0, o("Add 1 five times.", "score is 5.", "prog.variables")), "variables", "apply"),
      qd(hot("Tap the labelled box that shows a variable.", [["📦", "score: 3", 22, 50], ["🛑", "Stop sign", 50, 50], ["🌳", "Tree", 78, 50]], ["score: 3"], { labels: true, ...o("A name and a value.", "score: 3 has a name and a value.", "prog.variables") }), "variables", "apply"),
      qd(mc("Which program is shorter for four claps?", "Repeat 4 times: clap", ["Clap, clap, clap, clap", "They are the same"], o("Loops save writing.", "A loop is shorter.", "prog.loops")), "loops_if", "reason"),
      qd(mc("The robot stops two squares before the star. What should you do first?", "Trace the program", ["Switch it off forever", "Paint it blue"], o("Follow each step.", "Tracing finds the bug.", "prog.debug")), "debug", "reason"),
      qd(tf("A flowchart can only be used for computer programs.", false, o("Any steps in order.", "People use flowcharts for all kinds of steps.", "prog.flowchart")), "decompose", "recall"),
      qd(mc("Ahmed says testing is a waste of time if the plan looks perfect. Is he right?", "No, testing can reveal hidden bugs", ["Yes, never test", "Only for games"], o("Plans can hide bugs.", "Testing shows hidden bugs.", "prog.reason")), "debug", "reason"),
      qd(ord("Put these programming jobs in order.", ["Break the problem into parts", "Write the steps", "Test and debug"], o("Plan first.", "Decompose, write, then test.", "prog.process")), "debug", "apply"),
      // ----- upgrade: 15 new mains (q16-q30), 1 variant each
      qa(num("Trace the program: repeat 4 times: move 3 steps. How many steps does the sprite move in all?", 12, o("Four lots of three.", "4 x 3 = 12 steps.", "prog.trace_loop")), "loops_if", "apply",
        [num("Trace the program: repeat 5 times: move 2 steps. How many steps does the sprite move in all?", 10, o("Five lots of two.", "5 x 2 = 10 steps.", "prog.trace_loop"))]),
      qa(mc("A robot draws a triangle with a loop. How many times should the loop repeat?", "3 times", ["4 times", "6 times"], o("A triangle has three sides.", "One pass for each of the three sides.", "prog.shapes_loop")), "loops_if", "apply",
        [mc("A robot draws a pentagon with a loop. How many times should the loop repeat?", "5 times", ["3 times", "6 times"], o("A pentagon has five sides.", "One pass for each of the five sides.", "prog.shapes_loop"))]),
      qa(mat("Match each programming word to its meaning.", [["Procedure", "A named set of steps you can use again"], ["Trace", "Follow a program step by step"], ["Value", "What a variable stores"]], o("Think about each word.", "Each word has its own meaning.", "prog.vocab2")), "debug", "recall",
        [mat("Pair each word with what it means.", [["Condition", "A question that is true or false"], ["Repeat", "Do the steps again"], ["Debug", "Find and fix a mistake"]], o("Think about each word.", "Each word has its own meaning.", "prog.vocab2"))]),
      qa(mc("Idris says a loop that repeats 20 times always draws a big shape. Is he right?", "No. How big it is depends on the length of each side, not just how many repeats", ["Yes, more repeats is always bigger", "Yes, 20 is always the biggest"], o("Think about what controls the size.", "The size comes from the side length. The repeat count sets how many sides.", "prog.reason_big")), "loops_if", "reason",
        [mc("Zara says repeating more times always makes a shape larger. Is she right?", "No. More repeats can draw more sides, but each side's length sets the size", ["Yes, always larger", "Yes, repeats set the size"], o("Think about what controls the size.", "The side length controls the size.", "prog.reason_big"))]),
      qa(mc("Maryam says changing the repeat value from 3 to 6 changes nothing about the loop. Is she right?", "No. The loop will run twice as many times", ["Yes, nothing changes", "No, it runs half as many times"], o("Trace both versions.", "Changing the value changes how many times the loop runs.", "prog.reason_value")), "loops_if", "reason",
        [mc("Hamza says changing a loop's value from 2 to 8 does not matter. Is he right?", "No. The loop will run four times as often", ["Yes, it does not matter", "No, it runs half as often"], o("Trace both versions.", "A new value changes how many repeats happen.", "prog.reason_value"))]),
      qa(sld("A program says: repeat 3 times: (repeat 4 times: step). Slide to show the total number of steps.", { min: 0, max: 20 }, 12, 0, o("Three lots of four.", "3 x 4 = 12 steps.", "prog.nested")), "loops_if", "apply",
        [sld("A program says: repeat 2 times: (repeat 5 times: step). Slide to show the total number of steps.", { min: 0, max: 20 }, 10, 0, o("Two lots of five.", "2 x 5 = 10 steps.", "prog.nested"))]),
      qa(ms("Which two things does a count-controlled loop need? Pick two.", ["A number of repeats", "Steps to repeat"], ["A flowchart diamond", "A dice"], o("Think about repeat 4 times: forward.", "A loop needs how many times and what to repeat.", "prog.loop_parts")), "loops_if", "apply",
        [ms("Which two are part of a decision? Pick two.", ["A condition", "An else branch"], ["A loop counter", "A sprite"], o("Think about if and else.", "A decision has a condition and an else branch.", "prog.decision_parts"))]),
      qa(ord("Put these debugging steps in order.", ["Run the program and watch", "Spot where it goes wrong", "Change one thing", "Run it again"], o("Watch first.", "Run, spot, change one thing, then run again.", "prog.debug_steps")), "debug", "apply",
        [ord("Put these steps for fixing a score bug in order.", ["See the score is wrong", "Trace each step", "Fix the line that is wrong", "Test again"], o("See the problem first.", "See, trace, fix, then test.", "prog.debug_steps"))]),
      qa(fill("Complete the sentences about loops and variables.", "A loop {b1} its steps. A {b2} changes as the program runs.", [["repeats", "hides", "deletes"], ["variable", "bug", "flowchart"]], o("Think about the jobs.", "A loop repeats and a variable can change.", "prog.vocab3")), "variables", "recall",
        [fill("Finish the sentences about procedures.", "A procedure is a {b1} set of steps. We give it a {b2} so we can use it again.", [["named", "hidden", "broken"], ["name", "bug", "colour"]], o("Think about reuse.", "A procedure has a name so we can use it again.", "prog.vocab3"))]),
      qa(mc("A loop says: repeat until the score reaches 10. The score never changes. What is the problem?", "The loop never ends", ["The loop ends too early", "The loop draws a square"], o("What would stop the loop?", "If the score never changes, the loop cannot finish.", "prog.infinite")), "debug", "apply",
        [mc("A program waits until a button is pressed. Nobody can press it. What happens?", "It waits for ever", ["It finishes at once", "It draws a circle"], o("What would end the wait?", "Nothing ends the wait, so it never finishes.", "prog.infinite"))]),
      qa(mc("Hana says a procedure can only ever be used once. Is she right?", "No. A procedure is named so it can be used again and again", ["Yes, only once", "Yes, procedures are deleted after use"], o("Why give it a name?", "A name lets us call the same steps again.", "prog.reason_procedure")), "debug", "reason",
        [mc("Ali says writing the same steps again is better than a procedure. Is he right?", "No. A procedure saves time and avoids mistakes", ["Yes, copying is better", "Yes, procedures are slower"], o("Why give it a name?", "A procedure avoids repeating the same steps.", "prog.reason_procedure"))]),
      qa(hot("This program should draw a square. Tap the line with the bug.", [["▫️", "repeat 4 times", 22, 50], ["▫️", "forward 10", 50, 50], ["▫️", "turn 45 degrees", 78, 50]], ["turn 45 degrees"], { labels: true, ...o("A square turns a quarter turn.", "A square needs a 90 degree turn.", "prog.bug_line") }), "debug", "apply",
        [hot("This program should draw a triangle. Tap the line with the bug.", [["▫️", "repeat 3 times", 22, 50], ["▫️", "forward 10", 50, 50], ["▫️", "turn 90 degrees", 78, 50]], ["turn 90 degrees"], { labels: true, ...o("A triangle turns 120 degrees.", "A triangle needs a 120 degree turn.", "prog.bug_line") })]),
      qa(tf("If it is sunny, we go out. It is raining. We go out.", false, o("Is the condition true?", "It is not sunny, so we do not go out.", "prog.if_sunny")), "loops_if", "apply",
        [tf("If the score is more than 10, show well done. The score is 12. The program shows well done.", true, o("Is the condition true?", "12 is more than 10, so it shows well done.", "prog.if_sunny"))]),
      qa(mc("Ali says a variable called score will always show the right score even if you forget to add 1. Is he right?", "No. The variable only changes when the program changes it", ["Yes, it updates by itself", "Yes, variables are magic"], o("Who changes the value?", "A variable only changes when the program changes it.", "prog.reason_score")), "variables", "reason",
        [mc("Nina says the score fixes itself if the program forgets to add points. Is she right?", "No. The program must add the points", ["Yes, it fixes itself", "Yes, computers guess"], o("Who changes the value?", "The program must change the variable.", "prog.reason_score"))]),
      qa(num("Score starts at 0 and adds 2 each round. What is score after 3 rounds?", 6, o("Add 2 three times.", "2 + 2 + 2 = 6.", "prog.score_rounds")), "variables", "apply",
        [num("Score starts at 0 and adds 5 each round. What is score after 4 rounds?", 20, o("Add 5 four times.", "5 + 5 + 5 + 5 = 20.", "prog.score_rounds"))]),
    ].map((x, i) => (x.alts ? x : { ...x, alts: ALTS[i] })),
  }),
];
