import { SAY, SS, H, T, IMG, PHOTO, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, EXP, ROW, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Coteach diagrams (see content/media/manifest.d/maths-class-4-squares-sevens.json).
const COTEACH_A = {"type":"image","asset":"maths-class-4-squares-sevens-d1-87abd838.png","alt":"A 4 by 4 array of dots for 4 × 4 = 16 with the square numbers 1, 4 and 9 beside it","caption":"Square numbers make squares."};
const COTEACH_B = {"type":"image","asset":"maths-class-4-squares-sevens-d2-a056dfec.png","alt":"A bar model for 7 × 6 split into 5 × 6 = 30 and 2 × 6 = 12","caption":"7 × 6 = 30 + 12."};
// Class 4 Maths topic 10: Square numbers and the 7 times table (NEW, format 3.0).
// Story thread: Zara and her cousins count days, lay out tiles and play with patterns in Lahore and London.
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });
const HB = (text, backdrop) => ({ ...H(text), backdrop });
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });
const OK = (label) => ["ok", "✅", 50, 90, 2, "bounce", label];
const TILE_PHOTO = "maths-class-4-squares-sevens-1-c1b97283.jpg";

// ---------------------------------------------------------------------------------------------- 1. learn
const sevens = {
  id: "sevens", kind: "learn", title: "Counting in sevens",
  blocks: [
    HB("Zara counts the days", "home"),
    SAY("Zara counts the days of the week. There are seven days in one week. Two weeks have fourteen days. Counting in sevens gives the seven times table. Let's count in sevens!",
      PHOTO(TILE_PHOTO, "A black and white checkered floor made of square tiles", "Square tiles make rows and columns, just like a times table.", "Photo by Pete Alexopoulos on Unsplash")),
    HB("Stop 1: Count in sevens", "classroom"),
    SAY("Count in sevens: seven, fourteen, twenty-one, twenty-eight. Each step adds seven. Seven times four is twenty-eight. Seven times five is thirty-five.",
      T("**The 7 times table** goes up by 7 each time: 7, 14, 21, 28, 35.", "7 × 4 = 28 and 7 × 5 = 35.")),
    EXPP("Counting in sevens",
      SS("Seven days in one week.", S("7", ["d", "📅", 30, 50, 3, "none", "7 days"])),
      SS("Two weeks is fourteen days. Add another seven.", S("14", ["d", "📅", 30, 50, 2, "none", "7 days"], ["e", "📅", 70, 50, 3, "pulse", "14 days"])),
      SS("Three weeks is twenty-one days. Four weeks is twenty-eight.", S("7 × 4 = 28", ["d", "📅", 30, 50, 2, "none"], ["f", "📅", 70, 50, 2, "none", "28 days"], OK("7 × 4 = 28")))),
    SAY("Four times four makes a square of sixteen dots. One, four and nine are square numbers too.", COTEACH_A),
    CHK(num("What is 7 × 3?", 21, { hint: "Count in sevens: 7, 14, 21.", why: "7 × 3 = 21.", tag: "sevens.fact" })),
    HB("Stop 2: Use facts you know", "classroom"),
    SAY("Here is a trick. Split a hard fact into two easy ones. Seven times six is five sixes plus two sixes. Thirty plus twelve is forty-two.",
      T("**Break up** a fact: 7 × 6 = 5 × 6 + 2 × 6 = 30 + 12 = 42.", "Use facts you already know.")),
    IMG("🧩", "Seven sixes split into five sixes and two sixes."),
    CHK(mc("Which two facts make 7 × 6?", "5 × 6 and 2 × 6", ["4 × 6 and 2 × 6", "5 × 6 and 3 × 6"], { hint: "Five and two make seven.", why: "5 × 6 = 30 and 2 × 6 = 12. Together 42, which is 7 × 6.", tag: "sevens.break" })),
    SAY("Remember. The seven times table goes up by seven. Break a hard fact into easy ones.", SUM("The 7 times table goes up by 7", "Break a fact into easy parts", "Check the answer by adding the parts")),
    GLOSS({ "times table": "A list of multiples of one number.", multiple: "A number in a times table, like 21 in the 7 times table.", "break up": "Split one fact into two easier facts." }),
  ],
  mini: [
    num("What is 7 × 2?", 14, { hint: "Count in sevens.", why: "7 × 2 = 14." }),
    mc("Which is 7 × 9?", "63", ["56", "72"], { hint: "Count in sevens to nine.", why: "7 × 9 = 63." }),
    tf("7 × 9 is 56.", false, { hint: "Count in sevens to nine.", why: "7 × 9 = 63." }),
    ord("Arrange these, smallest first.", ["7 × 9", "7 × 1", "7 × 4"], { hint: "Count in sevens.", why: "7, then 28, then 63." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const oddEven = {
  id: "odd_even", kind: "try", title: "Odd and even patterns",
  blocks: [
    HB("Stop 1: Odd and even", "classroom"),
    SAY("An even number can be shared into two equal groups. An odd number always has one left over. Look at the ones digit. Even numbers end in 0, 2, 4, 6 or 8. Odd numbers end in 1, 3, 5, 7 or 9.",
      T("**Even** numbers end in 0, 2, 4, 6 or 8. **Odd** numbers end in 1, 3, 5, 7 or 9.", "14 is even. 21 is odd.")),
    EXPP("Odd and even products",
      SS("Two rows of three counters. Six counters, all in pairs. Even.", S("2 × 3 = 6", ...ROW("a", "🔴", 3, 30, 50, 2, 2))),
      SS("Three rows of three counters. One is left over. Odd.", S("3 × 3 = 9", ...ROW("a", "🔴", 3, 30, 40, 2, 2), ...ROW("b", "🔵", 3, 30, 65, 2, 2))),
      SS("Even times anything is even. Odd times odd is odd.", S("Even or odd?", ["a", "🔴", 30, 50, 2, "none", "even"], ["b", "🔵", 70, 50, 2, "pulse", "odd"], OK("6 is even, 9 is odd")))),
    SAY("Split seven sixes into five sixes and two sixes. Thirty plus twelve is forty-two.", COTEACH_B),
    CHK(mc("Is 3 × 3 odd or even?", "Odd, because 3 × 3 = 9", ["Even, because 3 × 3 = 8", "Even, because both numbers are small"], { hint: "Three rows of three leave one over.", why: "3 × 3 = 9, which is odd.", tag: "sevens.odd_even" })),
    HB("Stop 2: Spot the pattern", "classroom"),
    SAY("Look at the 7 times table: 7, 14, 21, 28, 35, 42. The answers take turns: odd, even, odd, even. Odd times odd is odd. Even times odd is even.",
      T("Odd times odd is **odd**. Even times odd is **even**.", "3 × 5 = 15 (odd). 2 × 5 = 10 (even).")),
    CHK(tf("Odd times odd is always even.", false, { hint: "Try 3 × 5.", why: "3 × 5 = 15, which is odd.", tag: "sevens.rule" })),
    SAY("Brain break. Find the pairs.", BRAIN("memory_match", "Odd even pairs", "Find the matching products.", ["🔴", "🔵", "⚪", "⚫", "🟢", "🟡"])),
    ACT("Odd or even rows", ["Counters or buttons", "Paper"], ["Make 4 rows of 3. Is the total odd or even?", "Make 3 rows of 3. Is it odd or even?", "Make 5 rows of 2. Is it odd or even?", "Write the rule you found."]),
    SAY("Remember. Even numbers end in 0, 2, 4, 6 or 8. An even factor makes an even product.", SUM("Even times anything is even", "Odd times odd is odd", "Check the ones digit")),
    GLOSS({ odd: "A number that cannot be shared into two equal groups.", even: "A number that can be shared into two equal groups.", product: "The answer to a multiplication.", pattern: "Something that repeats in an order." }),
  ],
  mini: [
    tf("14 is an odd number.", false, { hint: "Look at the ones digit.", why: "14 ends in 4, so it is even." }),
    mc("Which product is odd?", "3 × 5", ["2 × 5", "4 × 6"], { hint: "Odd times odd is odd.", why: "3 × 5 = 15, which is odd." }),
    num("What is 9 × 3?", 27, { hint: "Odd times odd.", why: "9 × 3 = 27, which is odd." }),
    ord("Arrange these products, from the smallest.", ["5 × 1", "2 × 6", "3 × 3"], { hint: "Work out each answer.", why: "5, then 9, then 12." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const squares = {
  id: "squares", kind: "play", title: "Square numbers",
  blocks: [
    HB("Stop 1: Build a square", "classroom"),
    SAY("A square number is made by multiplying a number by itself. Build a square with tiles. Four rows of four tiles make a square of sixteen. Four times four is sixteen.",
      T("A **square number** is a number times itself: 4 × 4 = 16.", "The square numbers start 1, 4, 9, 16, 25.")),
    EXPP("Building 4 × 4",
      SS("One tile. It is 1 × 1, the first square.", S("1 × 1 = 1", ["t", "🟦", 50, 50, 2, "none", "1 × 1"])),
      SS("Two rows of two make a square. Two times two is four.", S("2 × 2 = 4", ["t", "🟦", 40, 40, 2, "none", "2 × 2"], ["u", "🟦", 60, 60, 2, "pulse", "2 × 2"])),
      SS("Four rows of four make sixteen tiles. Four times four is sixteen.", S("4 × 4 = 16", ["t", "🟦", 50, 40, 3, "none", "4 × 4"], OK("4 × 4 = 16")))),
    CHK(num("What is 5 × 5?", 25, { hint: "A square with five tiles on each side.", why: "5 × 5 = 25.", tag: "sevens.square" })),
    HB("Stop 2: Spot a square", "classroom"),
    SAY("Is a number a square? Ask: is it a number times itself? Nine is three times three, so nine is a square. Ten is not. There is no number that times itself makes ten.",
      T("**Square numbers** are 1, 4, 9, 16, 25, 36, 49, 64, 81, 100.", "Ten is not a square number.")),
    IMG("🟦", "A 3 by 3 square has 9 tiles. Ten tiles cannot make a square."),
    CHK(tf("A square array of 5 rows of 5 has 25 tiles.", true, { hint: "Rows and columns are the same.", why: "5 × 5 = 25.", tag: "sevens.array" })),
    SAY("Brain break. Find the matching squares.", BRAIN("memory_match", "Square pairs", "Find the matching squares.", ["🟦", "🟩", "🟨", "🟥", "🟪", "⬛"])),
    ACT("Tile squares", ["Square tiles or paper squares", "Pencil"], ["Make a square with 3 rows of 3 tiles.", "Count the tiles. That is a square number.", "Try 4 rows of 4. What is the square number?", "Try 3 rows of 4. Can you make a square?"]),
    SAY("Remember. A square number is a number times itself. Build it as a square array.", SUM("Square number: a number times itself", "Square arrays have equal rows and columns", "Square numbers: 1, 4, 9, 16, 25")),
    GLOSS({ square: "A shape with four equal sides. A square number makes a square array.", array: "Objects in rows and columns.", "square number": "A number times itself, like 9 = 3 × 3." }),
  ],
  mini: [
    num("What is 8 × 8?", 64, { hint: "A square with eight tiles each side.", why: "8 × 8 = 64." }),
    mc("Which is a square number?", "36", ["30", "40"], { hint: "Six times six.", why: "6 × 6 = 36." }),
    tf("20 is a square number.", false, { hint: "Is 20 a number times itself?", why: "No whole number times itself is 20." }),
    num("What is 3 × 3?", 9, { hint: "Three rows of three.", why: "3 × 3 = 9." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const weeks = {
  id: "weeks_puzzles", kind: "use", title: "Weeks, grids and puzzles",
  blocks: [
    HB("Stop 1: Weeks in a calendar", "home"),
    SAY("A calendar is a grid of weeks. Each row has seven days, one week. Count the rows to count the weeks. Each week has seven days, so three weeks have twenty-one days.",
      T("**One week** = 7 days. Three weeks = 3 × 7 = 21 days.", "Use the 7 times table to count days.")),
    EXPP("Days in weeks",
      SS("One row of seven days.", S("1 week = 7 days", ["c", "📅", 50, 50, 3, "none", "7 days"])),
      SS("Three rows of seven days.", S("3 weeks", ["c", "📅", 30, 50, 2, "none", "7 days"], ["d", "📅", 70, 50, 3, "pulse", "21 days"])),
      SS("Three sevens are twenty-one days.", S("3 × 7 = 21", ["c", "📅", 30, 50, 2, "none"], OK("3 weeks = 21 days")))),
    CHK(num("How many days are in 4 weeks?", 28, { hint: "Four sevens.", why: "4 × 7 = 28.", tag: "sevens.weeks" })),
    HB("Stop 2: Tile puzzles", "home"),
    SAY("Zara has a square floor. It is made of square tiles, five tiles by five tiles. How many tiles are there? Five times five. Five rows of five is twenty-five tiles.",
      T("A **square floor** of 5 by 5 tiles has 5 × 5 = 25 tiles.", "A square number of tiles.")),
    IMG("🏠", "A square floor with 5 rows of 5 tiles has 25 tiles."),
    CHK(mc("A square floor is 8 tiles by 8 tiles. How many tiles?", "64", ["56", "72"], { hint: "Eight times eight.", why: "8 × 8 = 64.", tag: "sevens.floor" })),
    SAY("Remember. A week has seven days. A square floor has a square number of tiles.", SUM("A week has 7 days", "Count weeks with the 7 times table", "A square floor has a square number of tiles")),
    GLOSS({ "square floor": "A floor covered with tiles that form a square, with equal rows and columns.", week: "Seven days in a row.", calendar: "A chart of days and weeks.", tile: "A flat square piece for covering a floor.", puzzle: "A problem to solve by thinking." }),
  ],
  mini: [
    num("How many days are in 2 weeks?", 14, { hint: "Two sevens.", why: "2 × 7 = 14." }),
    num("A square floor is 6 tiles by 6 tiles. How many tiles?", 36, { hint: "6 × 6.", why: "36 tiles." }),
    tf("Three weeks have 24 days.", false, { hint: "3 × 7.", why: "3 × 7 = 21." }),
    mc("Which fact gives the number of days in 5 weeks?", "5 × 7", ["5 × 5", "5 × 6"], { hint: "Each week has seven days.", why: "5 weeks = 5 × 7 days." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Rows of seven", backdrop: "home", caption: "Zara and her cousins make rows of seven, then turn nine children into a square.",
  scenes: [
    { caption: "Zara and her cousins.", say: "This is Zara with her cousins. They line up for the family photo.",
      items: [{ id: "z", emoji: "👧", label: "Zara", x: 22, y: 56, size: 3, anim: "bounce", enter: "walk_right" }, { id: "c", emoji: "👦", label: "cousins", x: 72, y: 56, size: 3, enter: "pop" }] },
    { caption: "Rows of seven.", say: "Seven cousins stand in one row. That is one group of seven.",
      items: [{ id: "r1", emoji: "🧒🧒🧒🧒🧒🧒🧒", label: "7 friends", x: 50, y: 46, size: 2, enter: "slide_left" }] },
    { caption: "Three rows.", say: "Three rows of seven make twenty-one. Three sevens are twenty-one.",
      items: [{ id: "w", emoji: "📅", label: "3 × 7 = 21", x: 50, y: 46, size: 3, effect: "glow" }] },
    { caption: "Nine children.", say: "Now nine children stand in a square, three rows of three.",
      items: [{ id: "n", emoji: "🟦", label: "3 × 3 = 9", x: 50, y: 46, size: 3, enter: "grow" }] },
    { caption: "A square number.", say: "Nine is a square number, because three times three is nine.",
      camera: { zoom: 1.2, x: 50, y: 46 },
      items: [{ id: "s", emoji: "🟩", label: "9", x: 50, y: 40, size: 3, effect: "sparkle" }] },
    { caption: "Shukriya!", say: "Rows of seven and squares of nine. Shukriya, Zara!",
      items: [{ id: "z", emoji: "👧", label: "Zara", x: 22, y: 56, size: 3, anim: "bounce" }, { id: "r", emoji: "🎉", label: "Well done!", x: 70, y: 40, size: 2, effect: "hearts" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- sevens (q1-q8)
  Q(num("What is 7 × 6?", 42, { hint: "Count in sevens: 7, 14, 21, 28, 35, 42.", why: "7 × 6 = 42.", tag: "sevens.fact" }), "sevens", "apply",
    [num("What is 7 × 9?", 63, { hint: "Count in sevens.", why: "7 × 9 = 63.", tag: "sevens.fact" })]),
  Q(mc("Which is 7 × 8?", "56", ["54", "63"], { hint: "Break 8 into 5 and 3.", why: "7 × 8 = 35 + 21 = 56.", tag: "sevens.fact" }), "sevens", "recall",
    [mc("Which is 7 × 4?", "28", ["24", "32"], { hint: "Count in sevens.", why: "7 × 4 = 28.", tag: "sevens.fact" })]),
  Q(tf("7 × 5 is 35.", true, { hint: "Count in sevens to five.", why: "7 × 5 = 35.", tag: "sevens.fact" }), "sevens", "recall",
    [tf("7 × 5 is 30.", false, { hint: "Count in sevens to five.", why: "7 × 5 = 35.", tag: "sevens.fact" })]),
  Q(fill("Fill the gap in the sevens.", "7, 14, 21, {b1}, 35.", [["28", "27", "29"]], { hint: "Add 7 each time.", why: "21 + 7 = 28.", tag: "sevens.count" }), "sevens", "apply",
    [fill("Fill the gap in the sevens about 42.", "42, 49, {b1}, 63.", [["56", "54", "58"]], { hint: "Add 7 each time.", why: "49 + 7 = 56.", tag: "sevens.count" })]),
  Q(ms("Which two numbers are in the 7 times table? Pick two.", ["49", "56"], ["46", "52"], { hint: "Count in sevens.", why: "7 × 7 = 49 and 7 × 8 = 56.", tag: "sevens.table" }), "sevens", "apply",
    [ms("Pick two numbers from the 7 times table.", ["63", "70"], ["62", "68"], { hint: "Count in sevens.", why: "7 × 9 = 63 and 7 × 10 = 70.", tag: "sevens.table" })]),
  Q(ord("Put these in order, smallest first.", ["7 × 1", "7 × 3", "7 × 6", "7 × 9"], { hint: "Work out each answer.", why: "7, 21, 42, 63.", tag: "sevens.order" }), "sevens", "apply",
    [ord("Order these from the biggest answer.", ["7 × 12", "7 × 8", "7 × 5", "7 × 2"], { hint: "Work out each answer.", why: "84, 56, 35, 14.", tag: "sevens.order" })]),
  Q(sld("Slide to show 7 × 7 on the line from 0 to 100.", { min: 0, max: 100, step: 1 }, 49, 1, { hint: "Half of 100 is 50.", why: "7 × 7 = 49.", tag: "sevens.line" }), "sevens", "apply",
    [sld("Slide to show 7 × 11 on the line from 0 to 100.", { min: 0, max: 100, step: 1 }, 77, 1, { hint: "Count in sevens.", why: "7 × 11 = 77.", tag: "sevens.line" })]),
  Q(mat("Match each sevens fact to its answer.", [["7 × 4", "28"], ["7 × 10", "70"], ["7 × 3", "21"]], { hint: "Count in sevens.", why: "28, 70 and 21.", tag: "sevens.fact" }), "sevens", "apply",
    [mat("Join each sevens fact to its answer.", [["7 × 5", "35"], ["7 × 12", "84"], ["7 × 2", "14"]], { hint: "Count in sevens.", why: "35, 84 and 14.", tag: "sevens.fact" })]),
  // ----- odd_even (q9-q16)
  Q(num("7 × 6 = 5 × 6 + 2 × 6. What is 5 × 6?", 30, { hint: "Five sixes.", why: "5 × 6 = 30.", tag: "sevens.breakup" }), "odd_even", "apply",
    [num("7 × 8 = 5 × 8 + 2 × 8. What is 5 × 8?", 40, { hint: "Five eights.", why: "5 × 8 = 40.", tag: "sevens.breakup" })]),
  Q(mc("Layla says all multiples of 7 are odd. Is she right?", "No. 7 × 2 = 14, which is even", ["Yes, all 7s are odd", "No, they are all even"], { hint: "Try 7 × 2.", why: "14 ends in 4, so it is even.", tag: "sevens.reason_odd" }), "odd_even", "reason",
    [mc("Sam says all multiples of 6 are odd. Is he right?", "No. 6 × 2 = 12, which is even", ["Yes, all 6s are odd", "No, they are all odd"], { hint: "Try 6 × 2.", why: "12 is even.", tag: "sevens.reason_odd" })]),
  Q(mc("Layla says even times odd is always odd. Is she right?", "No. Even times odd is always even, because 2 × 3 = 6", ["Yes, always odd", "No, it is always 0"], { hint: "Try 2 × 3.", why: "2 × 3 = 6, which is even.", tag: "sevens.reason_even" }), "odd_even", "reason",
    [mc("Ben says odd times odd is always even. Is he right?", "No. 3 × 5 = 15, which is odd", ["Yes, always even", "No, it is always 0"], { hint: "Try 3 × 5.", why: "15 is odd.", tag: "sevens.reason_even" })]),
  Q(fill("Finish the odd and even rule.", "Odd × odd gives an {b1} answer, because 3 × 5 = {b2}.", [["odd", "even", "square"], ["15", "16", "14"]], { hint: "Work out 3 × 5.", why: "3 × 5 = 15, which is odd.", tag: "sevens.rule" }), "odd_even", "apply",
    [fill("Finish the rule for even numbers.", "Even × odd gives an {b1} answer, because 2 × 7 = {b2}.", [["even", "odd", "square"], ["14", "15", "13"]], { hint: "Work out 2 × 7.", why: "2 × 7 = 14, which is even.", tag: "sevens.rule" })]),
  Q(ms("Which two products are odd? Pick two.", ["3 × 5", "7 × 9"], ["2 × 7", "4 × 6"], { hint: "Odd times odd is odd.", why: "15 and 63 are odd.", tag: "sevens.oddeven" }), "odd_even", "apply",
    [ms("Which two products are even? Pick two.", ["5 × 2", "9 × 4"], ["3 × 5", "7 × 9"], { hint: "Even times anything is even.", why: "10 and 36 are even.", tag: "sevens.oddeven" })]),
  Q(ord("Order these products from smallest.", ["5 × 1", "3 × 3", "2 × 6", "4 × 4"], { hint: "Work out each answer.", why: "5, 9, 12, 16.", tag: "sevens.order" }), "odd_even", "apply",
    [ord("Arrange the products, smallest first.", ["6 × 1", "2 × 9", "5 × 4", "3 × 7"], { hint: "Work out each answer.", why: "6, 18, 20, 21.", tag: "sevens.order" })]),
  Q(sld("Slide to show 3 × 9.", { min: 0, max: 50, step: 1 }, 27, 1, { hint: "Three nines.", why: "3 × 9 = 27.", tag: "sevens.line" }), "odd_even", "apply",
    [sld("Slide to show 5 × 9.", { min: 0, max: 50, step: 1 }, 45, 1, { hint: "Five nines.", why: "5 × 9 = 45.", tag: "sevens.line" })]),
  Q(hot("Tap the odd product.", [["✖️", "4 × 5", 22, 50], ["✖️", "3 × 7", 50, 50], ["✖️", "6 × 2", 78, 50]], ["3 × 7"], { labels: true, hint: "Odd times odd is odd.", why: "3 × 7 = 21, which is odd.", tag: "sevens.oddeven" }), "odd_even", "apply",
    [hot("Tap the even product.", [["✖️", "3 × 3", 22, 50], ["✖️", "5 × 5", 50, 50], ["✖️", "2 × 9", 78, 50]], ["2 × 9"], { labels: true, hint: "An even factor makes an even product.", why: "2 × 9 = 18, which is even.", tag: "sevens.oddeven" })]),
  // ----- squares (q17-q24)
  Q(num("What is 6 × 6?", 36, { hint: "A square with six tiles each side.", why: "6 × 6 = 36.", tag: "sevens.square" }), "squares", "apply",
    [num("What is 9 × 9?", 81, { hint: "A square with nine tiles each side.", why: "9 × 9 = 81.", tag: "sevens.square" })]),
  Q(mc("Sam says 10 is a square number because 5 + 5 = 10. Is he right?", "No. 5 × 5 = 25 is a square, but 10 is not a number times itself", ["Yes, 5 + 5 = 10", "No, 10 is square because 2 × 5"], { hint: "A square number is a number times itself.", why: "No whole number times itself makes 10.", tag: "sevens.reason_square" }), "squares", "reason",
    [mc("Omar says 16 is a square number because 4 × 4 = 16. Is he right?", "Yes. 16 is 4 × 4, so it is a square number", ["No, 16 is 8 × 2", "No, 16 is odd"], { hint: "Is 16 a number times itself?", why: "4 × 4 = 16, so 16 is a square number.", tag: "sevens.reason_square" })]),
  Q(tf("A square array of 4 rows of 4 has 16 tiles.", true, { hint: "Rows and columns are the same.", why: "4 × 4 = 16.", tag: "sevens.square" }), "squares", "recall",
    [tf("A square array of 3 rows of 4 has 12 tiles and is a square.", false, { hint: "Rows and columns must be equal.", why: "3 rows of 4 is not a square.", tag: "sevens.square" })]),
  Q(hot("Tap the square number greater than ten.", [["🟦", "12", 22, 50], ["🟦", "25", 50, 50], ["🟦", "30", 78, 50]], ["25"], { labels: true, hint: "Which is a number times itself?", why: "5 × 5 = 25.", tag: "sevens.square" }), "squares", "apply",
    [hot("Tap the square number greater than ten, in this list.", [["🟦", "9", 22, 50], ["🟦", "36", 50, 50], ["🟦", "20", 78, 50]], ["36"], { labels: true, hint: "Which is a number times itself?", why: "6 × 6 = 36.", tag: "sevens.square" })]),
  Q(mat("Match each square number to its side length.", [["16", "4"], ["36", "6"], ["49", "7"]], { hint: "Side times side.", why: "4 × 4 = 16, 6 × 6 = 36, 7 × 7 = 49.", tag: "sevens.square" }), "squares", "apply",
    [mat("Pair each square number with its side length.", [["64", "8"], ["81", "9"], ["9", "3"]], { hint: "Side times side.", why: "8 × 8 = 64, 9 × 9 = 81, 3 × 3 = 9.", tag: "sevens.square" })]),
  Q(mc("Hamza says the next square number after 25 is 30 because 25 + 5 = 30. Is he right?", "No. 6 × 6 = 36 is the next square number", ["Yes, 30", "No, 49"], { hint: "Think of 5 × 5, then 6 × 6.", why: "After 5 × 5 = 25 comes 6 × 6 = 36.", tag: "sevens.reason_next" }), "squares", "reason",
    [mc("Ali says the next square number after 49 is 56 because 49 + 7 = 56. Is he right?", "No. 8 × 8 = 64 is the next square number", ["Yes, 56", "No, 81"], { hint: "Think of 7 × 7, then 8 × 8.", why: "After 49 comes 64.", tag: "sevens.reason_next" })]),
  Q(ms("Which two are square numbers? Pick two.", ["4", "81"], ["6", "12"], { hint: "Is it a number times itself?", why: "4 = 2 × 2 and 81 = 9 × 9.", tag: "sevens.square" }), "squares", "apply",
    [ms("Pick two square numbers from this list.", ["9", "100"], ["15", "24"], { hint: "Is it a number times itself?", why: "9 = 3 × 3 and 100 = 10 × 10.", tag: "sevens.square" })]),
  Q(num("A square tile floor is 5 tiles by 5 tiles. How many tiles are there?", 25, { hint: "Five times five.", why: "5 × 5 = 25 tiles.", tag: "sevens.floor" }), "squares", "apply",
    [num("A square tile floor is 8 tiles by 8 tiles. How many tiles are there?", 64, { hint: "Eight times eight.", why: "8 × 8 = 64 tiles.", tag: "sevens.floor" })]),
  // ----- weeks_puzzles (q25-q30)
  Q(num("How many days are in 3 weeks?", 21, { hint: "Three sevens.", why: "3 × 7 = 21.", tag: "sevens.weeks" }), "weeks_puzzles", "apply",
    [num("How many days are in 5 weeks?", 35, { hint: "Five sevens.", why: "5 × 7 = 35.", tag: "sevens.weeks" })]),
  Q(mc("A week has 7 days. How many days are in 6 weeks?", "42", ["36", "49"], { hint: "Six sevens.", why: "6 × 7 = 42.", tag: "sevens.weeks" }), "weeks_puzzles", "apply",
    [mc("A week has 7 days. How many days are in 9 weeks?", "63", ["54", "72"], { hint: "Nine sevens.", why: "9 × 7 = 63.", tag: "sevens.weeks" })]),
  Q(mc("Hana says 7 × 8 = 54 because 7 × 7 = 49 and 5 more. Is she right?", "No. 7 × 8 = 49 + 7 = 56, not 54", ["Yes, 54", "No, it is 58"], { hint: "Add one more seven.", why: "49 + 7 = 56.", tag: "sevens.reason_fact" }), "weeks_puzzles", "reason",
    [mc("Zain says 7 × 6 = 42 because 6 × 6 = 36 and 6 more. Is he right?", "Yes. 36 + 6 = 42, which is 7 × 6", ["No, it is 46", "No, it is 40"], { hint: "Add one more six.", why: "36 + 6 = 42.", tag: "sevens.reason_fact" })]),
  Q(mc("Mira says 9 × 9 = 72 because 9 × 8 = 72. Is she right?", "No. 9 × 9 = 81, and 72 is 9 × 8", ["Yes, 9 × 9 is 72", "No, it is 90"], { hint: "Add one more nine.", why: "72 + 9 = 81.", tag: "sevens.reason_fact" }), "weeks_puzzles", "reason",
    [mc("Omar says 8 × 8 = 60 because 8 × 7 = 56 and 4 more. Is he right?", "No. 8 × 8 = 64, which is 56 plus 8", ["Yes, 60", "No, it is 68"], { hint: "Add one more eight.", why: "56 + 8 = 64.", tag: "sevens.reason_fact" })]),
  Q(mc("Ali says 3 by 3 tiles make a square of 6 tiles. Is he right?", "No. A 3 by 3 square has 9 tiles", ["Yes, 6 tiles", "No, 12 tiles"], { hint: "Three rows of three.", why: "3 × 3 = 9.", tag: "sevens.reason_floor" }), "weeks_puzzles", "reason",
    [mc("Nora says 4 by 4 tiles make 8 tiles. Is she right?", "No. 4 × 4 = 16 tiles", ["Yes, 8 tiles", "No, 12 tiles"], { hint: "Four rows of four.", why: "4 × 4 = 16.", tag: "sevens.reason_floor" })]),
  Q(mc("Zara says 7 × 6 = 5 × 6 + 2 × 6 is wrong because you cannot split numbers. Is she right?", "No. Splitting 7 into 5 and 2 works, because 30 + 12 = 42", ["Yes, you cannot split", "No, 7 × 6 = 36"], { hint: "Add the two parts.", why: "30 + 12 = 42, which is 7 × 6.", tag: "sevens.reason_split" }), "weeks_puzzles", "reason",
    [mc("Ben says 8 × 6 = 5 × 6 + 3 × 6 works. Is he right?", "Yes. 30 + 18 = 48, which is 8 × 6", ["No, it is 40", "No, it is 50"], { hint: "Add the two parts.", why: "30 + 18 = 48.", tag: "sevens.reason_split" })]),
];

export const topics = [
  topicLesson({
    slug: "maths-class-4-squares-sevens", subject: "maths", cls: 4, topic: 10, title: "Square Numbers and the 7 Times Table",
    summary: "The 7 times table, odd and even patterns in the times tables, and square numbers.",
    unit: "Topic 10: Square numbers and the 7 times table", difficulty: 2,
    objectives: ["Use the 7 times table", "Spot odd and even patterns in the times tables", "Know and use square numbers"],
    success_criteria: ["I can work out 7 times facts by counting or breaking them up", "I can predict whether a product is odd or even", "I can build and name square numbers"],
    real_life: "Counting days in weeks, tiles on a square floor, and patterns in calendars.",
    standards: [
      { framework: "nc_england", code: "Y4 times tables", text: "Recall multiplication facts up to 12 × 12; recognise square numbers and use odd and even patterns" },
      { framework: "cambridge", code: "4Ni.03" }, { framework: "cambridge", code: "4Ni.04" }, { framework: "cambridge", code: "4Np.02" },
    ],
    warm_up: [
      num("What is 5 × 4?", 20, { hint: "Count in fours.", why: "5 × 4 = 20." }),
      num("What is 10 × 6?", 60, { hint: "Add a zero.", why: "10 × 6 = 60." }),
      tf("12 is an even number.", true, { hint: "Look at the ones digit.", why: "12 ends in 2." }),
    ],
    intro: [],
    subs: [sevens, oddEven, squares, weeks],
    clip,
    quiz,
  }),
];
