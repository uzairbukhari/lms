import { SAY, SS, H, T, IMG, TIP, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, NLINE, S, EXP, GLOSS, PV, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Class 1 Maths topic 3: adding and taking away within 100 (format 3.0). Standards from docs/CURRICULUM_V2.md.
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });
const NL = (id, from, to, value, x = 50, y = 46, size = 3, anim = "none") => [id, { kind: "number_line", from, to, value }, x, y, size, anim];

const countOn = {
  id: "count_on", kind: "learn", title: "Count on and count back",
  blocks: [
    H("Stop 1: Count on to add"),
    SAY("Here is a speedy way to add. Say we want thirty-four plus three. Do we have to count from one? No way! We start at thirty-four, and then we count on three more. Thirty-five, thirty-six, thirty-seven. The answer is thirty-seven. Watch the frog hop along the number line.", T("To **add** a small number, start at the bigger number and **count on**.", "34 + 3: start at 34, then say 35, 36, 37.")),
    EXPP("34 + 3 on the number line",
      SS("Here is a number line from thirty to forty. The frog sits on thirty-four. That is where we start.", S("Start at 34.", NL("f", 30, 40, 34))),
      SS("Hop one. Thirty-five. Hop two. Thirty-six. Hop three. Thirty-seven. Three hops, because we are adding three.", S("34 + 3: hop three times.", NL("f", 30, 40, 37, 50, 46, 3, "pulse"))),
      SS("The frog landed on thirty-seven. So thirty-four plus three equals thirty-seven.", S("34 + 3 = 37.", NL("f", 30, 40, 37, 50, 46, 3, "pulse"), ["s", "✅", 50, 88, 2, "bounce", "34 + 3 = 37"]))),
    CHK(num("What is 52 + 4?", 56, { hint: "Start at 52 and count on 4.", why: "53, 54, 55, 56. So 52 + 4 = 56.", tag: "addsub.count_on" })),
    H("Stop 2: Count back to take away"),
    SAY("Taking away goes the other way. To take away, we count back. Let's try forty-one take away three. Start at forty-one. Count back: forty, thirty-nine, thirty-eight. The answer is thirty-eight. The frog hops backwards, to the left.", T("To **take away** a small number, start at the bigger number and **count back**.", "41 - 3: start at 41, then say 40, 39, 38.")),
    EXPP("41 - 3 on the number line",
      SS("The frog starts on forty-one, at the right.", S("Start at 41.", NL("f", 35, 45, 41))),
      SS("Now hop back. Forty. Thirty-nine. Thirty-eight. Three hops to the left, because we are taking away three.", S("41 - 3: hop back three times.", NL("f", 35, 45, 38, 50, 46, 3, "pulse"), ["s", "✅", 50, 88, 2, "bounce", "41 - 3 = 38"]))),
    CHK(mc("Which sum does this say? Start at 60, then count back 2.", "60 - 2", ["60 + 2", "62 - 60"], { hint: "Counting back means take away.", why: "Counting back 2 from 60 is 60 - 2 = 58.", tag: "addsub.count_back" })),
    SAY("Let us remember. To add, count on. To take away, count back. Always start at the bigger number.", SUM("To add, count on", "To take away, count back", "Start at the bigger number")),
    GLOSS({ add: "Put numbers together to make a bigger number.", "count on": "Start at a number and say the next numbers.", "take away": "Make a number smaller by taking some off.", "count back": "Start at a number and say the numbers before it." }),
  ],
  mini: [
    num("What is 27 + 3?", 30, { hint: "Count on 3 from 27.", why: "28, 29, 30." }),
    num("What is 45 - 2?", 43, { hint: "Count back 2 from 45.", why: "44, 43." }),
    tf("To add, you count back.", false, { hint: "Which way does the frog hop?", why: "To add you count on. To take away you count back." }),
    mc("What is 68 + 2?", "70", ["66", "71"], { hint: "Count on 2 from 68.", why: "69, 70." }),
  ],
};

const bridge = {
  id: "bridge", kind: "try", title: "Crossing a ten",
  blocks: [
    H("Stop 1: Make a ten first"),
    SAY("Sometimes our jump goes over a ten. Take eight plus five. We could count on five, but let's be clever. Eight needs two more to make ten. So take two from the five. Eight and two make ten. We still have three left. Ten and three make thirteen! Making a ten first is a super trick.", T("To add across a ten, make a **ten** first.", "8 + 5: 8 + 2 = 10, then 10 + 3 = 13.")),
    EXPP("8 + 5 by making ten",
      SS("Here are eight dots in a ten frame. The frame has two empty spaces. We need two more to make ten.", S("8 needs 2 more to make 10.", ["f", { kind: "ten_frame", value: 8 }, 50, 44, 3])),
      SS("We take two from the five and fill the frame. Now the frame is full. That is ten!", S("The frame is full: 10.", ["f", { kind: "ten_frame", value: 10 }, 50, 44, 3, "pulse"])),
      SS("Five take away two leaves three more. Ten and three make thirteen. So eight plus five is thirteen.", S("8 + 5 = 10 + 3 = 13.", ["f", { kind: "ten_frame", value: 10 }, 28, 44, 1], ["g", { kind: "ten_frame", value: 3 }, 72, 44, 1, "pulse"], ["s", "✅", 50, 88, 2, "bounce", "10 + 3 = 13"]))),
    MAN("Fill the ten frame", "You have 15 apples. Move 10 apples into the Ten box to make a full ten, then see how many are left over.", "🍎", 15, ["Ones", "Ten box"]),
    CHK(num("What is 9 + 4?", 13, { hint: "9 needs 1 more to make 10. Then 3 are left.", why: "9 + 1 = 10, and 10 + 3 = 13.", tag: "addsub.bridge" })),
    H("Stop 2: Take away across a ten"),
    SAY("We can cross a ten when we take away too. Thirteen take away four. First take away three to get to ten. Then take away one more. Ten take away one is nine. So thirteen take away four is nine. Try it at home with buttons.", T("To take away across a ten, go back to **ten** first.", "13 - 4: 13 - 3 = 10, then 10 - 1 = 9.")),
    SAY("Thirteen buttons, take away three to reach ten, then one more.", IMG("🔘", "13 take away 3 is 10. Then take away 1 more to make 9.")),
    ACT("Buttons and a ten box", ["15 buttons or coins", "A cup or box"], ["Put 13 buttons in a row.", "Take away 3 buttons. How many are left? That is 10.", "Now take away 1 more. How many are left?", "So what is 13 - 4?"]),
    CHK(mc("What is 12 - 5?", "7", ["6", "8"], { hint: "Take away 2 to get to 10, then 3 more.", why: "12 - 2 = 10, and 10 - 3 = 7.", tag: "addsub.bridge_back" })),
    SAY("Remember. Make a ten first when you cross a ten. It works for adding and for taking away.", SUM("Make a ten first when you cross a ten", "It works for adding and for taking away")),
    GLOSS({ ten: "A group of 10 things.", "ten frame": "A box with 10 spaces for counters.", cross: "To go past a number, like going past 10.", leftover: "What is left when you have used some." }),
  ],
  mini: [
    num("What is 7 + 6?", 13, { hint: "7 + 3 = 10, then 3 more.", why: "7 + 3 = 10, and 10 + 3 = 13." }),
    num("What is 15 - 6?", 9, { hint: "15 - 5 = 10, then 1 more.", why: "15 - 5 = 10, and 10 - 1 = 9." }),
    tf("8 + 5 is 15.", false, { hint: "8 + 2 = 10, then 3 more.", why: "8 + 5 = 13, not 15." }),
    mc("How many more does 6 need to make 10?", "4", ["3", "5"], { hint: "Think of a ten frame with 6 counters.", why: "6 + 4 = 10." }),
  ],
};

const tensAdd = {
  id: "tens_add", kind: "play", title: "Tens and missing numbers",
  blocks: [
    H("Stop 1: Add and take away tens"),
    SAY("Adding tens is easy once you know tens and ones. Here is thirty-four. Three tens and four ones. Now add two tens. The tens change. Three tens and two tens make five tens. But the ones stay the same! Fifty-four. Taking away tens works the same way.", T("To add or take away **tens**, change the tens digit. The ones stay the same.", "34 + 20 = 54. 54 - 20 = 34.")),
    EXPP("34 + 20",
      SS("Here is thirty-four. Three tens and four ones.", S("34 is 3 tens and 4 ones.", PV("pv", 3, 4))),
      SS("Now we add two more tens. Look at the board. Five tens now! The four ones did not change. Thirty-four plus twenty is fifty-four.", S("34 + 20 = 54.", PV("pv", 5, 4, 50, 48, 3, "pulse")))),
    CHK(num("What is 46 + 30?", 76, { hint: "4 tens and 3 tens make 7 tens. The ones stay 6.", why: "46 + 30 = 76.", tag: "addsub.tens" })),
    H("Stop 2: Missing numbers"),
    SAY("Time for a number puzzle. What goes in the box? Seven plus something makes ten. Add the missing number: seven plus three is ten. We can also take away to find a missing number. Ten take away seven leaves three. Adding and taking away are partners. Warm up your brain first with a memory game.", T("A missing number puzzle: 7 + ? = 10. The answer is 3.", "Adding and taking away are **partners**: 7 + 3 = 10 and 10 - 7 = 3.")),
    SAY("Flip the cards and find the matching pairs.", BRAIN("memory_match", "Number match", "Find the matching pairs of cards.", ["🍎", "🍌", "🍇", "🍓", "🍊", "🥝"])),
    CHK(mc("What is the missing number? 6 + ? = 10", "4", ["3", "5"], { hint: "How many more does 6 need to make 10?", why: "6 + 4 = 10.", tag: "addsub.missing" })),
    SAY("Remember. Add tens by changing the tens digit. Use a number you know to find a missing number. Adding and taking away are partners.", SUM("Add tens by changing the tens digit", "Use a number you know to find a missing number", "Adding and taking away are partners")),
    GLOSS({ tens: "Groups of ten. In 34 there are 3 tens.", partners: "Two things that belong together, like adding and taking away.", missing: "Not there yet. The number you have to find.", puzzle: "A problem that makes you think." }),
  ],
  mini: [
    num("What is 52 + 20?", 72, { hint: "5 tens and 2 tens make 7 tens.", why: "52 + 20 = 72." }),
    num("What is 85 - 30?", 55, { hint: "8 tens take away 3 tens leaves 5 tens.", why: "85 - 30 = 55." }),
    num("8 + ? = 10. What is the missing number?", 2, { hint: "How many more does 8 need to make 10?", why: "8 + 2 = 10." }),
    tf("In 34 + 20 the ones change.", false, { hint: "Look at the digit on the right.", why: "You only add tens, so the ones stay the same." }),
  ],
};

const problems = {
  id: "problems", kind: "use", title: "Solve word problems",
  blocks: [
    H("Stop 1: Read, think, solve"),
    SAY("Word problems are stories with a number puzzle hiding inside. Here is a way to solve them. First, read the story. Second, spot the clue words. If it says more or altogether, we add. If it says left or fewer, we take away. Third, work it out. Fourth, check that the answer makes sense.", T("Solve a story problem in steps: **read**, find the clue, work it out, then check.", "Clue words: altogether and more mean add. Left and fewer mean take away.")),
    SAY("Read the story, find the clue, work it out, and check.", IMG("🔍", "Read, find the clue, work it out, check.")),
    CHK(mc("Which clue word tells us to take away?", "left", ["altogether", "more"], { hint: "If some go away, what is it?", why: "The word left tells us to take away.", tag: "addsub.clue_words" })),
    H("Stop 2: Stories with money and sweets"),
    SAY("Here is one for you. Maryam has twenty-five sweets. Her aunt gives her thirty more. How many sweets does Maryam have altogether? The clue word is altogether, so we add. Twenty-five plus thirty. Two tens and three tens make five tens. Ones stay five. Fifty-five sweets. Does that make sense? Yes, it is more than we started with.", T("Maryam has 25 sweets. Her aunt gives her 30 more. How many altogether?", "25 + 30 = 55 sweets.")),
    EXPP("Maryam's sweets",
      SS("Maryam has twenty-five sweets. Two tens and five ones.", S("Maryam starts with 25 sweets.", PV("pv", 2, 5))),
      SS("Her aunt gives her thirty more. That is three more tens. Now there are five tens and five ones. Fifty-five sweets!", S("25 + 30 = 55. That is 55 sweets altogether.", PV("pv", 5, 5, 50, 48, 3, "pulse")))),
    REVEAL("A bag of 60 stickers has 20 taken out. How many are left? Have a think first.", "40 stickers are left. 60 - 20 = 40, because 6 tens take away 2 tens leaves 4 tens."),
    CHK(num("Ahmed has 48 marbles. He loses 5. How many marbles does he have left?", 43, { hint: "Left means take away. Count back 5 from 48.", why: "48 - 5 = 43 marbles.", tag: "addsub.word_problem" })),
    SAY("Remember. Read the story, find the clue words, then work it out. Always check that the answer makes sense.", SUM("Read the story and find the clue words", "Altogether means add. Left means take away", "Check that your answer makes sense")),
    GLOSS({ read: "Look at the words and understand them.", altogether: "All the things put together.", left: "What remains after some are taken away.", clue: "A word that helps you find the answer.", check: "Look again to see if your answer makes sense." }),
  ],
  mini: [
    num("There are 30 children in a hall. 20 more come in. How many are there altogether?", 50, { hint: "Altogether means add.", why: "30 + 20 = 50 children." }),
    num("A shelf has 70 books. 30 are taken away. How many are left?", 40, { hint: "Left means take away.", why: "70 - 30 = 40 books." }),
    mc("A jar has 15 coins. Dad adds 4 more. Which sum is right?", "15 + 4", ["15 - 4", "4 - 15"], { hint: "Adding more means plus.", why: "More coins means add: 15 + 4 = 19." }),
    tf("The answer to a take-away problem is bigger than the start.", false, { hint: "If you take some away, is there more or less?", why: "Taking away makes the number smaller." }),
  ],
};

export const topics = [
  topicLesson({
    slug: "maths-class-1-add-subtract", subject: "maths", cls: 1, topic: 3, title: "Adding and Taking Away to 100",
    summary: "Count on and back, cross a ten, add tens, find missing numbers and solve word problems.",
    unit: "Topic 3: Add and subtract", difficulty: 1,
    objectives: ["Add and take away by counting on and back", "Add and take away across a ten", "Add and take away tens", "Solve word problems and find missing numbers"],
    success_criteria: ["I can add and take away numbers within 100", "I can make a ten to cross a ten", "I can solve a story problem and check my answer"],
    real_life: "Counting sweets, pocket money and how many pages are left in a book.",
    standards: [
      { framework: "nc_england", code: "Y2 add/sub", text: "Add and subtract numbers using concrete objects, number lines and mental methods" },
      { framework: "cambridge", code: "2Ni.02" }, { framework: "cambridge", code: "2Ni.04" },
    ],
    warm_up: [
      mc("What do 6 and 4 make together?", "10", ["9", "11"], { hint: "Count on from 6.", why: "6 and 4 make 10." }),
      num("How many tens are in 70?", 7, { hint: "The 7 is the tens.", why: "70 is 7 tens." }),
      tf("34 is bigger than 43.", false, { hint: "Compare the tens first.", why: "43 has 4 tens, so it is bigger." }),
    ],
    intro: [
      H("Welcome back, number explorer!"),
      SAY("Welcome back, number explorer! Today we get faster at adding and taking away. By the end you will count on and back, cross a ten with a clever trick, add tens in a snap, and solve word problems like a detective.", T("Today we add and take away numbers to 100, with tricks that make it quick.")),
      IMG("➕", "Adding and taking away to 100."),
      GLOSS({ "adding and taking away": "Putting numbers together and taking numbers off." }),
    ],
    subs: [countOn, bridge, tensAdd, problems],
    quiz: [
      { q: num("What is 63 + 5?", 68, { hint: "Count on 5 from 63.", why: "64, 65, 66, 67, 68.", tag: "addsub.count_on" }), sub: "count_on", depth: "recall", alts: [num("What is 34 + 4?", 38, { hint: "Count on 4 from 34.", why: "35, 36, 37, 38.", tag: "addsub.count_on" }), num("What is 76 + 3?", 79, { hint: "Count on 3 from 76.", why: "77, 78, 79.", tag: "addsub.count_on" })] },
      { q: num("What is 57 - 4?", 53, { hint: "Count back 4 from 57.", why: "56, 55, 54, 53.", tag: "addsub.count_back" }), sub: "count_on", depth: "recall", alts: [num("What is 82 - 3?", 79, { hint: "Count back 3 from 82.", why: "81, 80, 79.", tag: "addsub.count_back" }), num("What is 49 - 5?", 44, { hint: "Count back 5 from 49.", why: "48, 47, 46, 45, 44.", tag: "addsub.count_back" })] },
      { q: tf("To work out 40 - 3 you count on.", false, { hint: "Taking away goes which way?", why: "To take away, count back.", tag: "addsub.count_back" }), sub: "count_on", depth: "recall", alts: [tf("To work out 25 + 4 you count on.", true, { hint: "Adding goes which way?", why: "To add, count on.", tag: "addsub.count_on" }), tf("To work out 70 + 2 you count back.", false, { hint: "Adding goes which way?", why: "To add, count on.", tag: "addsub.count_on" })] },
      { q: fill("Finish the steps for 8 + 5.", "8 + {b1} = 10, then 10 + {b2} = 13.", [["2", "3", "5"], ["3", "2", "5"]], { hint: "How many does 8 need to make 10?", why: "8 + 2 = 10, then 10 + 3 = 13.", tag: "addsub.bridge" }), sub: "bridge", depth: "apply", alts: [fill("Finish the steps for 7 + 6.", "7 + {b1} = 10, then 10 + {b2} = 13.", [["3", "4", "6"], ["3", "4", "6"]], { hint: "How many does 7 need to make 10?", why: "7 + 3 = 10, then 10 + 3 = 13.", tag: "addsub.bridge" }), fill("Finish the steps for 9 + 4.", "9 + {b1} = 10, then 10 + {b2} = 13.", [["1", "2", "3"], ["3", "1", "4"]], { hint: "How many does 9 need to make 10?", why: "9 + 1 = 10, then 10 + 3 = 13.", tag: "addsub.bridge" })] },
      { q: ms("Which sums make 13? Pick two.", ["8 + 5", "9 + 4"], ["8 + 4", "7 + 5"], { hint: "Make a ten first.", why: "8 + 5 = 13 and 9 + 4 = 13.", tag: "addsub.bridge" }), sub: "bridge", depth: "apply", alts: [ms("Which sums make 12? Pick two.", ["8 + 4", "9 + 3"], ["8 + 5", "7 + 6"], { hint: "Make a ten first.", why: "8 + 4 = 12 and 9 + 3 = 12.", tag: "addsub.bridge" }), ms("Which sums make 14? Pick two.", ["9 + 5", "8 + 6"], ["9 + 6", "7 + 6"], { hint: "Make a ten first.", why: "9 + 5 = 14 and 8 + 6 = 14.", tag: "addsub.bridge" })] },
      { q: ord("Put these answers in order, smallest first.", ["8 + 3", "9 + 4", "8 + 6", "9 + 8"], { hint: "Work out each sum first.", why: "11, 13, 14 and 17 are in order.", tag: "addsub.bridge" }), sub: "bridge", depth: "apply", alts: [ord("Order these sums by their answers, smallest first.", ["7 + 4", "8 + 5", "9 + 5", "9 + 7"], { hint: "Work out each sum first.", why: "11, 13, 14 and 16 are in order.", tag: "addsub.bridge" }), ord("Arrange these by answer, smallest first.", ["6 + 5", "7 + 6", "8 + 7", "9 + 8"], { hint: "Work out each sum first.", why: "11, 13, 15 and 17 are in order.", tag: "addsub.bridge" })] },
      { q: num("What is 53 + 20?", 73, { hint: "5 tens and 2 tens make 7 tens.", why: "53 + 20 = 73. The ones stay 3.", tag: "addsub.tens" }), sub: "tens_add", depth: "apply", alts: [num("What is 41 + 30?", 71, { hint: "4 tens and 3 tens make 7 tens.", why: "41 + 30 = 71.", tag: "addsub.tens" }), num("What is 28 + 40?", 68, { hint: "2 tens and 4 tens make 6 tens.", why: "28 + 40 = 68.", tag: "addsub.tens" })] },
      { q: mat("Match each sum to its answer.", [["30 + 20", "50"], ["70 - 30", "40"], ["46 + 30", "76"]], { hint: "Work with the tens.", why: "30 + 20 = 50, 70 - 30 = 40, 46 + 30 = 76.", tag: "addsub.tens" }), sub: "tens_add", depth: "apply", alts: [mat("Join each sum to the answer that goes with it.", [["40 + 30", "70"], ["90 - 40", "50"], ["52 + 20", "72"]], { hint: "Work with the tens.", why: "40 + 30 = 70, 90 - 40 = 50, 52 + 20 = 72.", tag: "addsub.tens" }), mat("Pair up each sum with its answer.", [["20 + 60", "80"], ["80 - 50", "30"], ["35 + 40", "75"]], { hint: "Work with the tens.", why: "20 + 60 = 80, 80 - 50 = 30, 35 + 40 = 75.", tag: "addsub.tens" })] },
      { q: hot("Tap the bag that shows 9 + 4.", [["🛍️", "Bag A: 12", 22, 50], ["🛍️", "Bag B: 13", 50, 50], ["🛍️", "Bag C: 14", 78, 50]], ["Bag B: 13"], { labels: true, hint: "9 + 1 = 10, then 3 more.", why: "9 + 4 = 13.", tag: "addsub.bridge" }), sub: "bridge", depth: "apply", alts: [hot("Tap the bag that shows 8 + 6.", [["🛍️", "Bag A: 13", 22, 50], ["🛍️", "Bag B: 14", 50, 50], ["🛍️", "Bag C: 15", 78, 50]], ["Bag B: 14"], { labels: true, hint: "8 + 2 = 10, then 4 more.", why: "8 + 6 = 14.", tag: "addsub.bridge" }), hot("Tap the bag that shows 7 + 5.", [["🛍️", "Bag A: 11", 22, 50], ["🛍️", "Bag B: 12", 50, 50], ["🛍️", "Bag C: 13", 78, 50]], ["Bag B: 12"], { labels: true, hint: "7 + 3 = 10, then 2 more.", why: "7 + 5 = 12.", tag: "addsub.bridge" })] },
      { q: sld("Slide to show the answer to 20 + 25 on the number line.", { min: 0, max: 100 }, 45, 0, { hint: "2 tens and 2 tens make 4 tens. Then 5 ones.", why: "20 + 25 = 45.", tag: "addsub.number_line" }), sub: "tens_add", depth: "apply", alts: [sld("Slide to show the answer to 30 + 35 on the number line.", { min: 0, max: 100 }, 65, 0, { hint: "3 tens and 3 tens make 6 tens. Then 5 ones.", why: "30 + 35 = 65.", tag: "addsub.number_line" }), sld("Slide to show the answer to 50 + 17 on the number line.", { min: 0, max: 100 }, 67, 0, { hint: "5 tens and 1 ten make 6 tens. Then 7 ones.", why: "50 + 17 = 67.", tag: "addsub.number_line" })] },
      { q: mc("What is the missing number? 7 + ? = 15", "8", ["7", "9"], { hint: "Count on from 7 to 15, or use 15 - 7.", why: "7 + 8 = 15. You can check with 15 - 7 = 8.", tag: "addsub.missing" }), sub: "tens_add", depth: "apply", alts: [mc("What is the missing number? 6 + ? = 14", "8", ["7", "9"], { hint: "Count on from 6 to 14, or use 14 - 6.", why: "6 + 8 = 14. You can check with 14 - 6 = 8.", tag: "addsub.missing" }), mc("What is the missing number? 9 + ? = 17", "8", ["7", "9"], { hint: "Count on from 9 to 17, or use 17 - 9.", why: "9 + 8 = 17. You can check with 17 - 9 = 8.", tag: "addsub.missing" })] },
      { q: mc("Kiran says 8 + 5 = 12. Is Kiran right?", "No. 8 + 2 = 10 and 3 more makes 13", ["Yes, 8 + 5 = 12", "No, it is 14"], { hint: "Make a ten first to check.", why: "8 + 2 = 10, then 10 + 3 = 13, so 8 + 5 is 13.", tag: "addsub.reason" }), sub: "bridge", depth: "reason", alts: [mc("Sara says 9 + 6 = 14. Is Sara right?", "No. 9 + 1 = 10 and 5 more makes 15", ["Yes, 9 + 6 = 14", "No, it is 16"], { hint: "Make a ten first to check.", why: "9 + 1 = 10, then 10 + 5 = 15, so 9 + 6 is 15.", tag: "addsub.reason" }), mc("Zayd says 7 + 5 = 11. Is Zayd right?", "No. 7 + 3 = 10 and 2 more makes 12", ["Yes, 7 + 5 = 11", "No, it is 13"], { hint: "Make a ten first to check.", why: "7 + 3 = 10, then 10 + 2 = 12, so 7 + 5 is 12.", tag: "addsub.reason" })] },
      { q: mc("Why does 34 + 20 not change the 4 in 34?", "We only add tens, so the ones stay the same", ["The 4 is bigger than 20", "You always add the ones"], { hint: "What does the 20 add to?", why: "20 is 2 tens, so only the tens digit changes.", tag: "addsub.reason" }), sub: "tens_add", depth: "reason", alts: [mc("Why does 56 + 30 not change the 6 in 56?", "We only add tens, so the ones stay the same", ["The 6 is bigger than 30", "You always add the ones"], { hint: "What does the 30 add to?", why: "30 is 3 tens, so only the tens digit changes.", tag: "addsub.reason" }), mc("Why does 78 - 40 not change the 8 in 78?", "We only take away tens, so the ones stay the same", ["The 8 is bigger than 40", "You always take away the ones"], { hint: "What does the 40 take away from?", why: "40 is 4 tens, so only the tens digit changes.", tag: "addsub.reason" })] },
      { q: num("Maryam has 36 stickers. She gets 20 more. How many does she have altogether?", 56, { hint: "Altogether means add.", why: "36 + 20 = 56 stickers.", tag: "addsub.word_problem" }), sub: "problems", depth: "reason", alts: [num("Hamza has 44 marbles. He wins 30 more. How many does he have altogether?", 74, { hint: "Altogether means add.", why: "44 + 30 = 74 marbles.", tag: "addsub.word_problem" }), num("Aisha has 27 beads. She finds 40 more. How many does she have altogether?", 67, { hint: "Altogether means add.", why: "27 + 40 = 67 beads.", tag: "addsub.word_problem" })] },
      { q: mc("A baker has 50 buns and sells 20. Which clue word tells you what to do?", "sells, so take away", ["baker, so add", "buns, so add"], { hint: "If some go away, do we add or take away?", why: "Sells means some go away, so we take away: 50 - 20 = 30.", tag: "addsub.reason" }), sub: "problems", depth: "reason", alts: [mc("A shop has 80 pens and sells 30. Which clue word tells you what to do?", "sells, so take away", ["shop, so add", "pens, so add"], { hint: "If some go away, do we add or take away?", why: "Sells means some go away, so we take away: 80 - 30 = 50.", tag: "addsub.reason" }), mc("A farmer has 60 eggs and sells 40. Which clue word tells you what to do?", "sells, so take away", ["farmer, so add", "eggs, so add"], { hint: "If some go away, do we add or take away?", why: "Sells means some go away, so we take away: 60 - 40 = 20.", tag: "addsub.reason" })] },
    ],
  }),
];
