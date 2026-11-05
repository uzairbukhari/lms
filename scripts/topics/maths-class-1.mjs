import { SAY, SS, H, T, IMG, TIP, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, NLINE, S, EXP, ROW, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Pilot topic lesson (format 3.0): Zainab, Class 1, Maths topic 2. Standards from docs/CURRICULUM_V2.md.
const tensOnes = {
  id: "tens_ones", kind: "learn", title: "Tens and ones",
  blocks: [
    H("Stop 1: Two-digit numbers"),
    SAY("Look at this number: thirty-four. Is it just one big lump? No! It is made of two parts. One part is tens. The other part is ones. A ten is a bundle of ten things, like ten sticks tied together. A one is a single thing on its own. Let's see thirty-four built from tens and ones.", T("Every two-digit number is made of **tens** and **ones**.", "In 34 the 3 means 3 tens. The 4 means 4 **ones**.")),
    EXP("34 is 3 tens and 4 ones",
      SS("First, the tens. Count the blue sticks with me. One ten, two tens, three tens. Each stick is a bundle of ten, so three sticks is thirty.", S("Here are 3 tens. Each blue stick is a ten.", ...ROW("t", "🟦", 3, 12, 36, 45, 2))),
      SS("Now the ones. Each blue dot is just one. Count them: one, two, three, four. Four single ones.", S("And here are 4 ones. Each dot is one.", ...ROW("t", "🟦", 3, 12, 36, 45, 2), ...ROW("o", "🔵", 4, 58, 88, 45, 2))),
      SS("Put them together: thirty, and four more, makes thirty-four. So in thirty-four, the three is the tens, and the four is the ones. Tens first, then ones.", S("3 tens and 4 ones make 34.", ...ROW("t", "🟦", 3, 12, 36, 45, 2), ...ROW("o", "🔵", 4, 58, 88, 45, 2), ["n", "🔢", 50, 12, 2, "pulse", "34"]))),
    CHK(mc("In the number 52, how many tens are there?", "5", ["2", "52"], { hint: "The first digit is the tens.", why: "52 is 5 tens and 2 ones.", tag: "placevalue.tens" })),
    H("Stop 2: Which digit is which?"),
    SAY("Here is a secret. Where a digit sits matters. The digit on the left tells us the tens. The digit on the right tells us the ones. Look at forty-seven and seventy-four. They use the very same digits, a four and a seven. But they are different numbers! In forty-seven there are four tens. In seventy-four there are seven tens. Seven tens is much bigger.", T("The digit on the left shows the tens. The digit on the right shows the ones.", "The same digits in a different order make a different number!")),
    SAY("Forty-seven and seventy-four. Same digits, different places, different numbers.", IMG("🔄", "47 and 74 use the same digits but are different numbers.")),
    CHK(tf("In 47 the 4 means 4 ones.", false, { hint: "Which side are the tens on?", why: "The 4 is on the left, so it means 4 tens.", tag: "placevalue.digits" })),
    SAY("Let us remember. A two-digit number is made of tens and ones. The left digit is the tens. The right digit is the ones.", SUM("A two-digit number is tens and ones", "The left digit is the tens, the right digit is the ones")),
    GLOSS({ tens: "Groups of ten. In 34 there are 3 tens.", ones: "Single things. In 34 there are 4 ones.", digit: "One of the number symbols 0 to 9." }),
  ],
  mini: [
    mc("How many tens are in 63?", "6", ["3", "9"], { hint: "Look at the left digit.", why: "63 is 6 tens and 3 ones." }),
    num("How many ones are in 85?", 5, { hint: "Look at the right digit.", why: "85 is 8 tens and 5 ones." }),
    fill("Fill in the gaps.", "{b1} tens and {b2} ones make 26.", [["2", "6", "26"], ["6", "2", "8"]], { hint: "26: the 2 is the tens.", why: "26 is 2 tens and 6 ones." }),
    tf("In 90 there are 9 tens and 0 ones.", true, { hint: "0 ones means no single ones.", why: "90 is exactly 9 tens." }),
  ],
};

const partition = {
  id: "partition", kind: "try", title: "Partition and count in tens",
  blocks: [
    H("Stop 1: Count in tens"),
    SAY("Counting in tens is a speedy way to count. Instead of one, two, three, we jump by ten each time. Ten, twenty, thirty, forty, fifty. Each jump is one more ten. Say it with me, and keep going all the way to one hundred.", T("Counting in **tens** is quick: 10, 20, 30, 40, 50 and on to 100.", "Each jump is one more ten.")),
    SAY("Here is the number line. Look at the jumps of ten as we go along from zero to one hundred.", NLINE("Count in tens", 0, 100, [0, 20, 40, 60, 80, 100], "Every jump of ten along the number line: 10, 20, 30 and on to 100.", 10)),
    CHK(mc("Count in tens: 30, 40, 50, ... What comes next?", "60", ["55", "51"], { hint: "Add one more ten.", why: "50 and 10 more is 60.", tag: "placevalue.count_tens" })),
    H("Stop 2: Make a number"),
    SAY("Now a big word: partition. It just means splitting a number into its tens and its ones. Take thirty-six. We can split it into thirty and six. Thirty is three tens. Six is six ones. Time for you to try it!", T("To **partition** a number means to split it into tens and ones. 36 is 30 and 6.")),
    SAY("Here are twenty stars. Every star is one. Drag ten stars into the Tens box to make one ten. Do that three times. Then put six stars in the Ones box. That makes thirty-six!", MAN("Make 36", "Put 3 tens and 6 ones in the right boxes. Use the stars: each star is one. Move 10 stars to make a ten!", "⭐", 20, ["Ones", "Tens"])),
    SAY("Now try it for real at home. Find about twenty small things, like buttons. Make bundles of ten. Then make twenty-four, with two bundles of ten and four on their own. Then make thirty-one. How many bundles? How many ones?", ACT("Tens and ones at home", ["20 small things (buttons, pasta or coins)", "A cup"], ["Make groups of 10 from your small things.", "Make the number 24: 2 groups of ten and 4 on their own.", "Make 31. How many groups of ten? How many ones?"])),
    CHK(num("What number is 4 tens and 9 ones?", 49, { hint: "Say 40 and 9.", why: "40 + 9 = 49.", tag: "placevalue.partition" })),
    SAY("Think about this. Could forty-five be made another way, like three tens and fifteen ones? Have a think, then tap to find out.", REVEAL("Can 45 be made another way, like 3 tens and 15 ones?", "Yes! 3 tens is 30, and 15 more makes 45. But 4 tens and 5 ones is the easiest way.")),
    SAY("Remember. Partition means splitting a number into tens and ones. Thirty-six is thirty plus six.", SUM("Partition means splitting into tens and ones", "36 = 30 + 6")),
    GLOSS({ tens: "Groups of ten.", partition: "To split a number into tens and ones.", number: "A word or symbol that tells us how many." }),
  ],
  mini: [
    mc("What is 20 + 7?", "27", ["207", "72"], { hint: "2 tens and 7 ones.", why: "20 + 7 = 27." }),
    num("What number is 5 tens and 3 ones?", 53, { hint: "50 and 3.", why: "50 + 3 = 53." }),
    ord("Put these counting-in-tens numbers in order.", ["10", "20", "30", "40"], { hint: "Start with the smallest.", why: "Each jump adds 10." }),
    mat("Match each number to its tens and ones.", [["45", "4 tens 5 ones"], ["70", "7 tens 0 ones"], ["18", "1 ten 8 ones"]], { hint: "The left digit is the tens.", why: "Tens first, then ones." }),
  ],
};

const numberline = {
  id: "numberline", kind: "play", title: "Number line detective",
  blocks: [
    H("Stop 1: The number line to 100"),
    SAY("A number line is like a ruler for numbers. The numbers sit in order, small ones on the left and big ones on the right. As you move to the right, the numbers get bigger. Let's use it to find a number.", T("A **number line** shows numbers in order. Numbers get bigger as you go right.")),
    NLINE("0 to 100 in tens", 0, 100, [0, 25, 50, 75, 100], "The marks show 0, 25, 50, 75 and 100.", 25),
    EXP("Find 65",
      SS("Let's find sixty-five. First ask: which two tens is it between? Sixty-five is six tens and five ones. So it is past sixty, but not yet seventy.", S("65 is between 60 and 70.", ["a", "📍", 60, 55, 2, "none", "60"], ["b", "📍", 80, 55, 2, "none", "70"])),
      SS("Five is halfway between zero and ten. So sixty-five is halfway between sixty and seventy. We put our star right in the middle!", S("It is halfway, so it sits in the middle.", ["a", "📍", 60, 55, 2, "none", "60"], ["b", "📍", 80, 55, 2, "none", "70"], ["c", "⭐", 70, 30, 3, "bounce", "65"]))),
    CHK(mc("65 is between which two tens?", "60 and 70", ["50 and 60", "70 and 80"], { hint: "6 tens is 60.", why: "65 is 6 tens and 5 ones, so it is past 60 and before 70.", tag: "numberline.between" })),
    H("Stop 2: Brain game"),
    SAY("Warm up your memory first. Watch the lights, then copy the order. After that, be a number detective. Here is a clue: a mystery number is hiding between forty and fifty.", T("Play the game, then solve the detective puzzle: a number is hiding between 40 and 50.")),
    SAY("Watch the lights carefully, then copy them in the same order.", BRAIN("remember_order", "Number lights", "Watch the order, then copy it. It gets longer each time!", ["🔴", "🔵", "🟡", "🟢"])),
    CHK(mc("A number is halfway between 40 and 50. What is it?", "45", ["44", "46"], { hint: "Halfway between 0 and 10 is 5.", why: "45 is exactly halfway between 40 and 50.", tag: "numberline.halfway" })),
    SAY("Remember. Numbers go in order on a number line. Round numbers like sixty and seventy help us find the numbers in between.", SUM("Numbers go in order on a number line", "Round numbers like 60 and 70 help us find the ones in between")),
    GLOSS({ "number line": "A line that shows numbers in order, with small numbers on the left.", halfway: "In the middle between two things.", detective: "Someone who works out a puzzle by looking at clues." }),
  ],
  mini: [
    mc("Which number is halfway between 20 and 30?", "25", ["22", "28"], { hint: "Halfway between 0 and 10 is 5.", why: "25 is halfway between 20 and 30." }),
    sld("Slide to show 40 on the number line.", { min: 0, max: 100 }, 40, 0, { hint: "4 tens.", why: "40 is 4 tens." }),
    tf("52 is between 40 and 50.", false, { hint: "Is 52 bigger than 50?", why: "52 is after 50, so it is between 50 and 60." }),
  ],
};

const compare = {
  id: "compare", kind: "use", title: "Compare and order",
  blocks: [
    H("Stop 1: Which is bigger?"),
    SAY("Which is bigger, seventy-two or twenty-seven? They use the same two digits, so it can be tricky! Here is the trick. Always look at the tens first. The number with more tens is the bigger number. Only if the tens are the same do we look at the ones.", T("To compare two numbers, look at the **tens** first. The one with more tens is bigger.", "If the tens match, look at the ones.")),
    EXP("72 or 27?",
      SS("Seventy-two has seven tens. Here are seven blue sticks.", S("72 has 7 tens.", ...ROW("a", "🟦", 7, 8, 62, 28, 1))),
      SS("Twenty-seven has only two tens. Just two green sticks. Seven sticks is far more than two sticks!", S("27 has only 2 tens.", ...ROW("a", "🟦", 7, 8, 62, 28, 1), ...ROW("b", "🟩", 2, 8, 20, 68, 1))),
      SS("So seventy-two is bigger than twenty-seven. The tens decided it.", S("So 72 is bigger than 27.", ...ROW("a", "🟦", 7, 8, 62, 28, 1), ...ROW("b", "🟩", 2, 8, 20, 68, 1), ["s", "✅", 84, 48, 2, "bounce", "72 > 27"]))),
    SAY("We have two special signs. Greater than looks like this, a mouth that opens towards the bigger number. Less than is the other way round. And the equals sign means exactly the same. Think of the mouth as hungry: it always wants to eat the bigger number!", T("The signs: **greater than** is >, **less than** is <, and = means the same. The mouth eats the bigger number!")),
    CHK(mc("Which sign goes in 56 __ 65?", "<", [">", "="], { hint: "Which has more tens?", why: "65 has 6 tens and 56 has 5 tens, so 56 < 65.", tag: "compare.signs" })),
    H("Stop 2: Shop shelf"),
    SAY("Let's use tens and ones in a shop. Pencils come in packs of ten. Ali has three packs and eight loose pencils. That is thirty, and eight more. He needs forty pencils for his class. Tens and ones will help us work out how many more he needs.", T("A shop puts 10 pencils in each pack. Ali has 3 packs and 8 loose pencils.", "He needs 40. We use tens and ones to see how many more!")),
    SAY("Three packs of ten, and eight loose ones. That makes thirty-eight.", IMG("✏️", "3 packs of ten and 8 loose pencils make 38.")),
    CHK(num("Zara has 27 stickers. She needs 30. How many more stickers does she need?", 3, { hint: "Count on from 27 to 30.", why: "27 and 3 more make 30.", tag: "compare.real_life" })),
    H("Stop 3: First, second, third"),
    SAY("Two more ideas. Ordinal numbers tell us the place in a race: first, second, third, fourth. And rounding. When we round to the nearest ten, we pick the ten that is closest. Forty-six is just four away from fifty, but six away from forty. So forty-six rounds to fifty.", T("**Ordinal** numbers tell us the place: first, second, third, fourth.", "When we **round** to the nearest ten, we pick the closest ten. 46 rounds to 50.")),
    SAY("First, second and third place in a race.", IMG("🥇🥈🥉", "First, second and third place.")),
    CHK(mc("46 rounded to the nearest ten is...", "50", ["40", "60"], { hint: "Is 46 closer to 40 or 50?", why: "46 is only 4 from 50 but 6 from 40.", tag: "compare.round" })),
    SAY("Remember. More tens means a bigger number. Use the less than and greater than signs to compare. And round to the nearest ten by picking the closest ten.", SUM("More tens means a bigger number", "Use < and > to compare", "Round to the nearest ten")),
    GLOSS({ "greater than": "Bigger than. The sign is >.", "less than": "Smaller than. The sign is <.", ordinal: "A number that tells the place, like first or second.", round: "To change a number to the nearest ten.", tens: "Groups of ten." }),
  ],
  mini: [
    mc("Which is bigger?", "83", ["38", "They are the same"], { hint: "Compare the tens.", why: "83 has 8 tens; 38 has 3 tens." }),
    mc("What sign goes in 41 __ 14?", ">", ["<", "="], { hint: "4 tens or 1 ten?", why: "41 has more tens, so 41 > 14." }),
    num("Round 73 to the nearest ten.", 70, { hint: "Is 73 closer to 70 or 80?", why: "73 is closer to 70." }),
    ord("Put these in order from smallest to biggest.", ["19", "34", "58", "91"], { hint: "Look at the tens.", why: "Smaller tens come first." }),
  ],
};


// Retake variants: same skill and question type as each main question, with different numbers or words.
const ALTS = [
  [mc("In the number 83, how many tens are there?", "8", ["3", "83"], { hint: "The left digit is the tens.", why: "83 is 8 tens and 3 ones.", tag: "placevalue.tens" }), mc("In the number 29, how many tens are there?", "2", ["9", "29"], { hint: "The left digit is the tens.", why: "29 is 2 tens and 9 ones.", tag: "placevalue.tens" })],
  [num("How many ones are in 94?", 4, { hint: "The right digit is the ones.", why: "94 is 9 tens and 4 ones.", tag: "placevalue.ones" }), num("How many ones are in 57?", 7, { hint: "The right digit is the ones.", why: "57 is 5 tens and 7 ones.", tag: "placevalue.ones" })],
  [tf("In 62 the 6 means 6 ones.", false, { hint: "Which side are the tens on?", why: "The 6 is on the left, so it means 6 tens.", tag: "placevalue.digits" }), tf("In 38 the 3 means 3 tens.", true, { hint: "The left digit is the tens.", why: "The 3 is on the left, so it means 3 tens.", tag: "placevalue.digits" })],
  [fill("Finish the sentence about 74.", "{b1} tens and {b2} ones make 74.", [["7", "4", "74"], ["4", "7", "11"]], { hint: "74: the 7 is the tens.", why: "74 is 7 tens and 4 ones.", tag: "placevalue.partition" }), fill("Finish the sentence about 36.", "{b1} tens and {b2} ones make 36.", [["3", "6", "9"], ["6", "3", "36"]], { hint: "36: the 3 is the tens.", why: "36 is 3 tens and 6 ones.", tag: "placevalue.partition" })],
  [ms("Which are ways to split 58 into tens and ones? Pick two.", ["50 + 8", "5 tens and 8 ones"], ["8 tens and 5 ones", "5 + 8"], { hint: "58 has 5 tens and 8 ones.", why: "58 is 50 + 8, or 5 tens and 8 ones.", tag: "placevalue.partition" }), ms("Which are ways to split 41 into tens and ones? Pick two.", ["40 + 1", "4 tens and 1 one"], ["1 ten and 4 ones", "4 + 1"], { hint: "41 has 4 tens and 1 one.", why: "41 is 40 + 1, or 4 tens and 1 one.", tag: "placevalue.partition" })],
  [num("What number is 6 tens and 2 ones?", 62, { hint: "Say 60 and 2.", why: "60 + 2 = 62.", tag: "placevalue.partition" }), num("What number is 9 tens and 5 ones?", 95, { hint: "Say 90 and 5.", why: "90 + 5 = 95.", tag: "placevalue.partition" })],
  [ord("Arrange these numbers, smallest first.", ["27", "43", "72", "98"], { hint: "Look at the tens first.", why: "Smaller tens come first.", tag: "compare.order" }), ord("Sort these numbers from the smallest.", ["15", "38", "61", "86"], { hint: "Look at the tens first.", why: "Smaller tens come first.", tag: "compare.order" })],
  [mc("Ben says 30 + 6 and 60 + 3 both make 36. Who is right?", "Only 30 + 6 makes 36", ["Both make 36", "Only 60 + 3 makes 36"], { hint: "60 + 3 has 6 tens.", why: "60 + 3 makes 63. Only 30 + 6 makes 36.", tag: "placevalue.reason" }), mc("Nora says 20 + 7 and 70 + 2 both make 27. Who is right?", "Only 20 + 7 makes 27", ["Both make 27", "Only 70 + 2 makes 27"], { hint: "70 + 2 has 7 tens.", why: "70 + 2 makes 72. Only 20 + 7 makes 27.", tag: "placevalue.reason" })],
  [sld("Slide to show 35 on the number line.", { min: 0, max: 100 }, 35, 0, { hint: "Between 30 and 40.", why: "35 sits halfway between 30 and 40.", tag: "numberline.place" }), sld("Slide to show 85 on the number line.", { min: 0, max: 100 }, 85, 0, { hint: "Between 80 and 90.", why: "85 sits halfway between 80 and 90.", tag: "numberline.place" })],
  [hot("Tap the bag that holds 41 sweets.", [["🛍️", "Bag A: 1 ten and 4 ones", 22, 50], ["🛍️", "Bag B: 4 tens and 11 ones", 50, 50], ["🛍️", "Bag C: 4 tens and 1 one", 78, 50]], ["Bag C: 4 tens and 1 one"], { labels: true, hint: "41 is 4 tens and 1 one.", why: "Bag C has 4 tens and 1 one, which is 41.", tag: "placevalue.partition" }), hot("Tap the box that holds 52 crayons.", [["📦", "Box A: 2 tens and 5 ones", 22, 50], ["📦", "Box B: 5 tens and 2 ones", 50, 50], ["📦", "Box C: 5 tens and 12 ones", 78, 50]], ["Box B: 5 tens and 2 ones"], { labels: true, hint: "52 is 5 tens and 2 ones.", why: "Box B has 5 tens and 2 ones, which is 52.", tag: "placevalue.partition" })],
  [mat("Match each number to how it is built.", [["53", "5 tens 3 ones"], ["26", "2 tens 6 ones"], ["90", "9 tens 0 ones"]], { hint: "The left digit is the tens.", why: "Tens first, then ones.", tag: "placevalue.partition" }), mat("Match each number to its parts.", [["47", "4 tens 7 ones"], ["81", "8 tens 1 one"], ["30", "3 tens 0 ones"]], { hint: "The left digit is the tens.", why: "Tens first, then ones.", tag: "placevalue.partition" })],
  [mc("Tia says 82 is nearer to 80 than to 90. Is Tia right?", "Yes, 82 is only 2 from 80", ["No, it is nearer to 90", "No, it is exactly halfway"], { hint: "Count the steps from 82 to 80.", why: "82 is 2 steps from 80 but 8 steps from 90.", tag: "numberline.reason" }), mc("Omar says 38 is nearer to 40 than to 30. Is Omar right?", "Yes, 38 is only 2 from 40", ["No, it is nearer to 30", "No, it is exactly halfway"], { hint: "Count the steps from 38 to 40.", why: "38 is 2 steps from 40 but 8 steps from 30.", tag: "numberline.reason" })],
  [mc("Which sign goes in 71 __ 17?", ">", ["<", "="], { hint: "Which has more tens?", why: "71 has 7 tens and 17 has 1 ten, so 71 > 17.", tag: "compare.signs" }), mc("Which sign goes in 29 __ 92?", "<", [">", "="], { hint: "Which has more tens?", why: "92 has 9 tens and 29 has 2 tens, so 29 < 92.", tag: "compare.signs" })],
  [mc("Why is 85 bigger than 58, when both use an 8 and a 5?", "85 has 8 tens but 58 has only 5 tens", ["85 has more ones", "They are the same size"], { hint: "Compare the tens first.", why: "The tens decide: 8 tens is more than 5 tens.", tag: "compare.reason" }), mc("Why is 63 bigger than 36, when both use a 6 and a 3?", "63 has 6 tens but 36 has only 3 tens", ["63 has more ones", "They are the same size"], { hint: "Compare the tens first.", why: "The tens decide: 6 tens is more than 3 tens.", tag: "compare.reason" })],
  [num("Lena has 2 packs of 10 stickers and 9 loose ones. She needs 30. How many more does she need?", 1, { hint: "She has 29. Count on to 30.", why: "29 and 1 more make 30.", tag: "compare.real_life" }), num("Hamza has 4 bags of 10 marbles and 6 loose ones. He needs 50. How many more does he need?", 4, { hint: "He has 46. Count on to 50.", why: "46 and 4 more make 50.", tag: "compare.real_life" })],
];

export const topics = [
  topicLesson({
    slug: "maths-class-1-place-value", subject: "maths", cls: 1, topic: 2, title: "Place Value to 100",
    summary: "Tens and ones, partitioning, the number line to 100, and comparing numbers.",
    unit: "Topic 2: Place value", difficulty: 1,
    objectives: ["Know what the digits in a two-digit number mean", "Partition numbers into tens and ones", "Place numbers on a number line to 100", "Compare and order numbers with < and >"],
    success_criteria: ["I can say the tens and ones in a number to 100", "I can show a number on a number line", "I can compare two numbers using < and >"],
    real_life: "Counting pocket money, packs of pencils and pages in a book.",
    standards: [
      { framework: "nc_england", code: "Y2 place value", text: "Recognise the place value of each digit in a two-digit number" },
      { framework: "pk_ncc", code: "M-01-A-03" },
      { framework: "cambridge", code: "2Nc.01" }, { framework: "cambridge", code: "2Nc.02" }, { framework: "cambridge", code: "2Nc.03" }, { framework: "cambridge", code: "2Nc.04" }, { framework: "cambridge", code: "2Np.01" },
    ],
    warm_up: [
      mc("What do 7 and 3 make together?", "10", ["9", "11"], { hint: "Count on from 7.", why: "7 and 3 are a pair that makes 10." }),
      num("What is double 4?", 8, { hint: "4 + 4.", why: "Double 4 is 8." }),
      tf("10 is bigger than 9.", true, { hint: "Count: 9 then 10.", why: "10 comes after 9, so it is bigger." }),
    ],
    intro: [
      H("Welcome back, number explorer!"),
      SAY("Welcome back, number explorer! Today we have a big question. How can we read big numbers, like forty-seven and eighty-three, quickly? The secret is tens and ones. By the end, you will be able to tell what any number up to one hundred is made of, find it on a number line, and say which of two numbers is bigger. Let's go!", T("Today's big question: how can we read big numbers like 47 and 83 quickly?", "We will use tens and ones to find out.")),
      IMG("🔢", "Tens and ones make every number to 100."),
      GLOSS({ "tens and ones": "The two parts of a number up to 100." }),
    ],
    subs: [tensOnes, partition, numberline, compare],
    quiz: [
      { q: mc("In the number 47, how many tens are there?", "4", ["7", "47"], { hint: "The left digit is the tens.", why: "47 is 4 tens and 7 ones.", tag: "placevalue.tens" }), sub: "tens_ones", depth: "recall" },
      { q: num("How many ones are in 63?", 3, { hint: "The right digit is the ones.", why: "63 is 6 tens and 3 ones.", tag: "placevalue.ones" }), sub: "tens_ones", depth: "recall" },
      { q: tf("In 85 the 8 means 8 ones.", false, { hint: "Which side are the tens on?", why: "The 8 is on the left, so it means 8 tens.", tag: "placevalue.digits" }), sub: "tens_ones", depth: "recall" },
      { q: fill("Complete the sentence about 52.", "{b1} tens and {b2} ones make 52.", [["5", "2", "52"], ["2", "5", "7"]], { hint: "52: the 5 is the tens.", why: "52 is 5 tens and 2 ones.", tag: "placevalue.partition" }), sub: "tens_ones", depth: "apply" },
      { q: ms("Which are ways to split 36 into tens and ones? Pick two.", ["30 + 6", "3 tens and 6 ones"], ["6 tens and 3 ones", "3 + 6"], { hint: "36 has 3 tens and 6 ones.", why: "36 is 30 + 6, or 3 tens and 6 ones.", tag: "placevalue.partition" }), sub: "partition", depth: "apply" },
      { q: num("What number is 7 tens and 1 one?", 71, { hint: "Say 70 and 1.", why: "70 + 1 = 71.", tag: "placevalue.partition" }), sub: "partition", depth: "apply" },
      { q: ord("Order these numbers, smallest first.", ["49", "58", "85", "94"], { hint: "Look at the tens first.", why: "Smaller tens come first.", tag: "compare.order" }), sub: "compare", depth: "apply" },
      { q: mc("Mia says 40 + 5 and 50 + 4 both make 45. Who is right?", "Only 40 + 5 makes 45", ["Both make 45", "Only 50 + 4 makes 45"], { hint: "50 + 4 has 5 tens.", why: "50 + 4 makes 54. Only 40 + 5 makes 45.", tag: "placevalue.reason" }), sub: "partition", depth: "reason" },
      { q: sld("Slide to show 65 on the number line.", { min: 0, max: 100 }, 65, 0, { hint: "Between 60 and 70.", why: "65 sits halfway between 60 and 70.", tag: "numberline.place" }), sub: "numberline", depth: "apply" },
      { q: hot("Tap the bag that holds 23 sweets.", [["🛍️", "Bag A: 3 tens and 2 ones", 22, 50], ["🛍️", "Bag B: 2 tens and 3 ones", 50, 50], ["🛍️", "Bag C: 2 tens and 13 ones", 78, 50]], ["Bag B: 2 tens and 3 ones"], { labels: true, hint: "23 is 2 tens and 3 ones.", why: "Bag B has 2 tens and 3 ones, which is 23.", tag: "placevalue.partition" }), sub: "partition", depth: "apply" },
      { q: mat("Match each number to what it is made of.", [["34", "3 tens 4 ones"], ["62", "6 tens 2 ones"], ["80", "8 tens 0 ones"]], { hint: "The left digit is the tens.", why: "Tens first, then ones.", tag: "placevalue.partition" }), sub: "partition", depth: "apply" },
      { q: mc("Sam says 61 is nearer to 60 than to 70. Is Sam right?", "Yes, 61 is only 1 from 60", ["No, it is nearer to 70", "No, it is exactly halfway"], { hint: "Count the steps from 61 to 60.", why: "61 is 1 step from 60 but 9 steps from 70.", tag: "numberline.reason" }), sub: "numberline", depth: "reason" },
      { q: mc("Which sign goes in 38 __ 83?", "<", [">", "="], { hint: "Which has more tens?", why: "83 has 8 tens and 38 has 3 tens, so 38 < 83.", tag: "compare.signs" }), sub: "compare", depth: "recall" },
      { q: mc("Why is 72 bigger than 27, when both use a 7 and a 2?", "72 has 7 tens but 27 has only 2 tens", ["72 has more ones", "They are the same size"], { hint: "Compare the tens first.", why: "The tens decide: 7 tens is more than 2 tens.", tag: "compare.reason" }), sub: "compare", depth: "reason" },
      { q: num("Ali has 3 packs of 10 pencils and 8 loose ones. He needs 40. How many more does he need?", 2, { hint: "He has 38. Count on to 40.", why: "38 and 2 more make 40.", tag: "compare.real_life" }), sub: "compare", depth: "reason" },
    ].map((x, i) => ({ ...x, alts: ALTS[i] })),
  }),
];
