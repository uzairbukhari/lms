import { SAY, SS, H, T, IMG, REVEAL, ACT, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Computer Science, Data & AI, Class 4 (Fatima, age 9), topic 1: Thinking like a programmer.
// Standards: NC KS2 programming, CSTA 1B algorithms and programming (docs/CURRICULUM_V2.md).
const o = (hint, why, tag) => ({ hint, why, tag });
const RG = (id, col, row, facing, anim = "none") => [id, { kind: "robot_grid", col, row, facing }, 50, 50, 3, anim];

const decompose = {
  id: "decompose", kind: "learn", title: "Breaking problems down and flowcharts",
  blocks: [
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
    GLOSS({ decomposition: "Breaking a big problem into smaller parts.", flowchart: "A picture of an algorithm with boxes and arrows.", algorithm: "A list of clear steps in the right order.", problem: "Something we need to solve." }),
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
    SAY("Now design a program of your own. Choose a game idea, like a dice game. Break it into parts, draw a flowchart, decide what variables you need, and use a loop and a decision. Test it with a friend. If it goes wrong, debug it.", T("Design a program: decompose it, draw a flowchart, use a variable, then test and debug.")),
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
    intro: [
      H("Welcome, young programmer!"),
      SAY("Welcome, young programmer! Today's big question: how do programmers solve big problems? They break them down, plan with flowcharts, repeat with loops, decide with if and else, remember with variables, and fix bugs. By the end you will think like a programmer. Let's go!", T("Today's big question: how do programmers solve big problems?", "We will learn the tools programmers use every day.")),
      IMG("💻🧩", "Programmers solve problems one small step at a time."),
      GLOSS({ programmer: "A person who writes instructions for a computer." }),
    ],
    subs: [decompose, loopsIf, variables, debugUse],
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
    ].map((x, i) => ({ ...x, alts: ALTS[i] })),
  }),
];
