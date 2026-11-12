import { SAY, SS, H, T, IMG, PHOTO, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Coteach diagrams (see content/media/manifest.d/maths-class-4-column-methods.json).
const COTEACH_A = {"type":"image","asset":"maths-class-4-column-methods-d1-8315f39f.png","alt":"One thousand square exchanged for ten hundred squares, so 1 thousand = 10 hundreds","caption":"1 thousand = 10 hundreds."};
const COTEACH_B = {"type":"image","asset":"maths-class-4-column-methods-d2-97cf4ce6.png","alt":"A column subtraction of 4,305 minus 1,278 with the exchange shown: hundreds 2, tens 9, ones 15, giving 3,027","caption":"4,305 − 1,278 = 3,027."};
// Class 4 Maths topic 6: Column methods and checking (NEW, format 3.0).
// Story thread: Ayesha and Ali climb three hills near Murree, then add up their steps and check with an inverse.
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });
const HB = (text, backdrop) => ({ ...H(text), backdrop });
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });
const OK = (label) => ["ok", "✅", 50, 90, 2, "bounce", label];
const MOUNT_PHOTO = "maths-class-4-column-methods-1-885dc3f4.jpg";

// ---------------------------------------------------------------------------------------------- 1. learn
const columnAdd = {
  id: "column_add", kind: "learn", title: "Column addition",
  blocks: [
    HB("Ayesha and Ali go hill walking", "home"),
    SAY("Ayesha and Ali climb three hills near Murree. Each hill has a height in metres. To find the total height, we add. Big numbers are easier in columns. Let's write them neatly and add.",
      PHOTO(MOUNT_PHOTO, "A snowy mountain peak under a starry night sky", "Mountain heights are big numbers, so we use columns to add them.", "Photo by Daniel Leone on Unsplash")),
    HB("Stop 1: Line up the columns", "classroom"),
    SAY("First, line up the digits. Thousands go under thousands, hundreds under hundreds, and so on. Always start adding from the ones on the right. Here are two hills: 2,345 metres and 1,432 metres.",
      T("**Column addition**: line up the place values, then add one column at a time, starting with the ones.", "2,345 + 1,432 = 3,777.")),
    EXPP("2,345 + 1,432 in columns",
      SS("Line up the ones under the ones. The thousands, hundreds and tens line up too.", S("Columns lined up.", ["a", "🔢", 50, 30, 3, "none", "2,345 + 1,432"])),
      SS("Ones: 5 + 2 = 7. Tens: 4 + 3 = 7. Hundreds: 3 + 4 = 7. Thousands: 2 + 1 = 3.", S("Add each column.", ["a", "🔢", 50, 30, 3, "none", "2,345 + 1,432"], ["b", "🟩", 50, 65, 3, "pulse", "7 7 7 3"])),
      SS("Put the digits together: three thousand, seven hundred and seventy-seven.", S("3,777", ["a", "🔢", 50, 30, 2, "none"], ["r", "🎉", 50, 70, 3, "bounce", "3,777"]))),
    SAY("One thousand can be exchanged for ten hundreds. The value stays the same.", COTEACH_A),
    CHK(num("What is 3,120 + 2,455?", 5575, { hint: "Ones, then tens, then hundreds, then thousands.", why: "0 + 5 = 5, 2 + 5 = 7, 1 + 4 = 5, 3 + 2 = 5. So 5,575.", tag: "colmethod.add" })),
    HB("Stop 2: Carry the ten", "classroom"),
    SAY("Sometimes a column makes ten or more. Then we carry. Write the ones digit, and carry the tens digit to the next column. Look at 2,468 plus 1,357. Eight plus seven is fifteen. Write five and carry one ten.",
      T("When a column makes **10 or more**, write the ones digit and **carry** the tens to the next column.", "8 + 7 = 15: write 5, carry 1.")),
    EXPP("2,468 + 1,357 with a carry",
      SS("Ones: 8 + 7 = 15. Write 5, carry 1 ten.", S("Ones: 5, carry 1", ["a", "🔢", 50, 30, 3, "none", "2,468 + 1,357"], ["o", "🟥", 80, 65, 3, "pulse", "ones: 5"])),
      SS("Tens: 6 + 5 + 1 = 12. Write 2, carry 1 hundred.", S("Tens: 2, carry 1", ["a", "🔢", 50, 30, 2, "none", "2,468 + 1,357"], ["t", "🟨", 60, 65, 3, "pulse", "tens: 2"])),
      SS("Hundreds: 4 + 3 + 1 = 8. Thousands: 2 + 1 = 3.", S("3,825", ["a", "🔢", 50, 30, 2, "none"], ["r", "🎉", 50, 70, 3, "bounce", "2,468 + 1,357 = 3,825"], OK("3,825")))),
    CHK(num("What is 1,486 + 2,327?", 3813, { hint: "6 + 7 is 13, so carry 1 ten.", why: "Ones 3, tens 1 + 8 + 2 = 11 so 1 carry, hundreds 4 + 3 + 1 = 8. So 3,813.", tag: "colmethod.carry" })),
    SAY("Remember. Line up the columns, start with the ones, and carry when a column makes ten or more.", SUM("Line up the place values", "Start with the ones on the right", "Carry when a column makes 10 or more")),
    GLOSS({ "10 or more": "A ten or more. A column that makes this must carry.", "column addition": "Adding numbers written one under another in columns.", carry: "Moving a ten (or hundred) to the next column to the left.", "place value": "What each digit is worth, like 3 in 3,000 is three thousand.", total: "The answer when you add." }),
  ],
  mini: [
    num("What is 2,130 + 1,250?", 3380, { hint: "Add the hundreds, then the tens.", why: "2,130 + 1,250 = 3,380." }),
    mc("In 1,675 + 2,458, which column do you start with?", "The ones", ["The thousands", "The tens"], { hint: "Start on the right.", why: "Always start with the ones on the right." }),
    tf("13 tens is the same as 1 hundred and 3 tens.", true, { hint: "10 tens make 1 hundred.", why: "10 tens make 1 hundred, so 13 tens is 1 hundred and 3 tens." }),
    num("What is 4,500 + 1,800?", 6300, { hint: "45 hundreds + 18 hundreds.", why: "63 hundreds = 6,300." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const columnSub = {
  id: "column_sub", kind: "try", title: "Column subtraction",
  blocks: [
    HB("Stop 1: Exchange a ten", "classroom"),
    SAY("Now take away in columns. Look at 4,305 take away 1,278. We cannot take 8 from 5. So we exchange one ten for ten ones. Now we have 15 ones. Fifteen take away eight is seven.",
      T("When you cannot take away, **exchange**: take one from the next column and make ten in this one.", "4,305 − 1,278 = 3,027.")),
    EXPP("4,305 − 1,278",
      SS("Start with the ones. 5 is smaller than 8. There are no tens to swap, so first swap 1 hundred for 10 tens.", S("Ones: 5 is too small", ["a", "🔢", 50, 30, 3, "none", "4,305 − 1,278"], ["o", "🟥", 80, 65, 3, "pulse", "5 < 8"])),
      SS("Now swap 1 ten for 10 ones. We have 15 ones. Fifteen take away eight is seven. Tens: 9 − 7 = 2.", S("Ones: 15 − 8 = 7. Tens: 9 − 7 = 2", ["a", "🔢", 50, 30, 2, "none", "4,305 − 1,278"], ["t", "🟨", 60, 65, 3, "pulse", "9 − 7 = 2"])),
      SS("Hundreds: 2 − 2 = 0. Thousands: 4 − 1 = 3. The answer is 3,027.", S("3,027", ["a", "🔢", 50, 30, 2, "none"], OK("4,305 − 1,278 = 3,027")))),
    SAY("Exchange from the hundreds, then the tens. Now the ones are fifteen, the tens are nine and the hundreds are two.", COTEACH_B),
    CHK(num("What is 7,130 − 4,265?", 2865, { hint: "Exchange a ten for ones first.", why: "Exchange in the tens and the ones, then 7,130 − 4,265 = 2,865.", tag: "colmethod.sub" })),
    HB("Stop 2: Zeros in the middle", "classroom"),
    SAY("Zeros are tricky! Try 4,006 take away 1,238. The tens column has a zero. We cannot exchange from zero. So we go to the thousands first, and pass the zeros along.",
      T("When there are **zeros**, exchange from the nearest column that is not zero.", "4,006: take 1 thousand, make 10 hundreds, then 10 tens, then 10 ones.")),
    EXPP("4,006 − 1,238 over the zeros",
      SS("Exchange 1 thousand for 10 hundreds. Now we have 3 thousands and 10 hundreds.", S("3 thousands, 10 hundreds, 0 tens, 6 ones", ["a", "🔢", 50, 30, 3, "none", "4,006 − 1,238"])),
      SS("Exchange 1 hundred for 10 tens, then 1 ten for 10 ones. Now 16 ones take away 8 is 8.", S("Ones: 16 − 8 = 8", ["a", "🔢", 50, 30, 2, "none"], ["o", "🟥", 80, 65, 3, "pulse", "16 − 8 = 8"])),
      SS("Tens: 9 − 3 = 6. Hundreds: 9 − 2 = 7. Thousands: 3 − 1 = 2. The answer is 2,768.", S("2,768", ["a", "🔢", 50, 30, 2, "none"], OK("4,006 − 1,238 = 2,768")))),
    CHK(tf("To check 4,305 − 1,278 = 3,027, add 1,278 and 3,027.", true, { hint: "Subtraction and addition are opposites.", why: "3,027 + 1,278 = 4,305, so the answer is right.", tag: "colmethod.check" })),
    SAY("Remember. Exchange when you cannot take away. Zeros pass the exchange along to the left.", SUM("Exchange a ten when a digit is too small", "Zeros: go to the nearest non-zero column", "Check by adding back")),
    ACT("Exchange with counters", ["Ten counters or 10 straws", "A small bowl"], ["Make 4,006 with counters: 4 thousands, 0 hundreds, 0 tens, 6 ones.", "Swap 1 thousand for 10 hundreds. Count them.", "Keep swapping until you can take away 1,238.", "Write down your answer and check it."]),
    GLOSS({ exchange: "Swapping one from the next column for ten in this column.", subtract: "To take away.", zero: "A place with nothing in it, like the 0 in 4,006.", check: "Test an answer by doing the opposite sum." }),
  ],
  mini: [
    num("What is 3,000 − 1,250?", 1750, { hint: "Exchange from the thousands.", why: "3,000 − 1,250 = 1,750." }),
    mc("Why do you exchange in 4,006 − 1,238?", "The zeros are in the way, so you go to the thousands", ["Zero is bigger than 1", "You must always add"], { hint: "Look for the nearest non-zero digit.", why: "Zeros cannot give a ten, so you exchange from the thousands." }),
    tf("A check for 2,000 − 750 = 1,250 is 1,250 + 750 = 2,000.", true, { hint: "Add back.", why: "1,250 + 750 = 2,000." }),
    ord("Put these steps for 503 − 268 in order.", ["Exchange 1 hundred for 10 tens", "Exchange 1 ten for 10 ones", "Subtract the ones: 13 − 8 = 5", "Subtract the tens and hundreds"], { hint: "Start on the right.", why: "Exchange, exchange, then subtract the columns." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const shortcuts = {
  id: "shortcuts", kind: "play", title: "Clever shortcuts",
  blocks: [
    HB("Stop 1: Adjust near a hundred", "classroom"),
    SAY("Here is a shortcut. 456 take away 199 is close to 456 take away 200. Take away two hundreds, then add one back, because 199 is one less than 200. Smart and quick!",
      T("**Adjust**: use a near round number, then correct by the difference.", "456 − 199 = 456 − 200 + 1 = 257.")),
    EXPP("456 − 199",
      SS("Take away 200. That is 456 − 200 = 256.", S("456 − 200 = 256", ["a", "🔢", 50, 40, 3, "none", "456 − 199"])),
      SS("But we took away one too many. Add 1 back.", S("256 + 1 = 257", ["a", "🔢", 50, 40, 2, "none"], ["b", "➕", 50, 70, 3, "pulse", "+1"])),
      SS("So 456 − 199 = 257. Check: 257 + 199 = 456.", S("257", ["a", "🔢", 50, 40, 2, "none"], OK("456 − 199 = 257")))),
    CHK(num("What is 812 − 399?", 413, { hint: "Take away 400, then add back 1.", why: "812 − 400 = 412, and 412 + 1 = 413.", tag: "colmethod.adjust" })),
    HB("Stop 2: Add a near number", "classroom"),
    SAY("You can use the same trick for adding. 3,400 plus 1,998 is close to 3,400 plus 2,000. Add two thousand, then take away two.",
      T("For a sum near a round number, add the round number and adjust.", "3,400 + 1,998 = 3,400 + 2,000 − 2 = 5,398.")),
    EXPP("3,400 + 1,998",
      SS("Add 2,000. 3,400 + 2,000 = 5,400.", S("5,400", ["a", "🔢", 50, 40, 3, "none", "3,400 + 1,998"])),
      SS("We added two too many. Take away 2.", S("5,400 − 2 = 5,398", ["a", "🔢", 50, 40, 2, "none"], ["b", "➖", 50, 70, 3, "pulse", "−2"])),
      SS("The answer is 5,398.", S("5,398", ["a", "🔢", 50, 40, 2, "none"], OK("3,400 + 1,998 = 5,398")))),
    CHK(mc("Which is the quick way to do 2,999 + 1,004?", "Add 3,000 + 1,004 = 4,004, then take away 1 to get 4,003", ["Add 2,000 + 1,004 = 3,004, then add 9", "Do the ones first, then the tens"], { hint: "Is 2,999 close to a round number?", why: "2,999 is 1 less than 3,000, so 3,000 + 1,004 − 1 = 4,003.", tag: "colmethod.adjust" })),
    SAY("Brain break. Find the pairs.", BRAIN("memory_match", "Sum pairs", "Find the matching sums.", ["➕", "➖", "🔢", "✅", "🧮", "🎯"])),
    ACT("Shortcut at home", ["Pencil and paper", "A friend"], ["Pick a number near 500, like 497.", "Your friend picks a number from 100 to 300.", "Use the near-500 trick to find the answer.", "Check by adding back."]),
    SAY("Remember. Use a near round number, then adjust. Check with the opposite sum.", SUM("Use a near round number", "Adjust by the difference", "Check with the opposite sum")),
    GLOSS({ adjust: "Correct an answer after using a nearby round number.", "round number": "A number like 100, 200 or 1,000.", estimate: "A close answer found by rounding.", compensate: "Balance one change with an opposite change." }),
  ],
  mini: [
    num("What is 456 − 99?", 357, { hint: "Take away 100, then add 1.", why: "456 − 100 = 356, and 356 + 1 = 357." }),
    num("What is 2,500 + 1,999?", 4499, { hint: "Add 2,000, then take away 1.", why: "4,500 − 1 = 4,499." }),
    tf("348 − 199 is the same as 348 − 200 + 1.", true, { hint: "199 is one less than 200.", why: "Taking away 200 takes one too many, so add 1." }),
    mc("A quick check for 5,000 − 2,999 is...", "Add 2,999 and 2,001 to make 5,000", ["Subtract 2,999 from 2,999", "Add 5,000 and 2,999"], { hint: "Use the opposite.", why: "2,999 + 2,001 = 5,000." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const useBig = {
  id: "use_big", kind: "use", title: "Problems with big numbers",
  blocks: [
    HB("Stop 1: Mangoes in two months", "town"),
    SAY("Uncle Bilal sells mangoes in Lahore. In January he sells 2,486 mangoes. In February he sells 1,375. How many in total? Total means add. Use columns.",
      T("**Total** means add. 2,486 + 1,375 = 3,861.", "Check: 3,861 − 1,375 = 2,486.")),
    EXPP("Mangoes in two months",
      SS("January: 2,486 mangoes.", S("2,486", ["a", "🥭", 30, 50, 3, "none", "2,486"])),
      SS("February: 1,375 mangoes.", S("1,375", ["a", "🥭", 30, 50, 3, "none", "2,486"], ["b", "🥭", 70, 50, 3, "pulse", "1,375"])),
      SS("Together: 3,861 mangoes.", S("3,861", ["r", "🎉", 50, 50, 3, "bounce", "3,861"], OK("2,486 + 1,375 = 3,861")))),
    CHK(num("Hana's shop has 6,400 bags. It sells 2,150. How many are left?", 4250, { hint: "Sold means take away.", why: "6,400 − 2,150 = 4,250.", tag: "colmethod.word" })),
    HB("Stop 2: Two steps", "home"),
    SAY("Zara has 3,250 stickers. She gets 1,480 more. Then she gives 980 away. First add, then take away. Work step by step.",
      T("Solve a two-step problem one step at a time: add first, then take away.", "3,250 + 1,480 = 4,730. Then 4,730 − 980 = 3,750.")),
    IMG("🧮", "Add first, then take away: one step at a time."),
    CHK(num("Zara has 3,250 stickers, gets 1,480 more and gives 980 away. How many now?", 3750, { hint: "Add first, then take away.", why: "3,250 + 1,480 = 4,730 and 4,730 − 980 = 3,750.", tag: "colmethod.two_step" })),
    SAY("Remember. Use columns for big numbers, and check with the opposite sum.", SUM("Columns keep the place values lined up", "Two steps: do one step at a time", "Check with the opposite")),
    GLOSS({ total: "The answer when you add.", "two-step problem": "A problem with two operations, done in order.", check: "Test an answer with the opposite operation." }),
  ],
  mini: [
    num("A shop has 4,100 pens. It sells 1,250. How many are left?", 2850, { hint: "Column subtraction.", why: "4,100 − 1,250 = 2,850." }),
    num("Ali has 2,350 stickers and gets 1,725 more. How many now?", 4075, { hint: "Add in columns.", why: "2,350 + 1,725 = 4,075." }),
    tf("If 3,500 − 1,800 = 1,700, then 1,700 + 1,800 = 3,500.", true, { hint: "Check with the opposite.", why: "1,700 + 1,800 = 3,500." }),
    mc("Which is a good check for 6,000 − 3,455 = 2,545?", "2,545 + 3,455 should make 6,000", ["2,545 − 3,455", "6,000 + 3,455"], { hint: "Use the opposite.", why: "2,545 + 3,455 = 6,000." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Ayesha and Ali add the hills", backdrop: "plain", caption: "Ayesha and Ali add three hill heights in columns and check the answer.",
  scenes: [
    { caption: "Ayesha and Ali.", say: "Ayesha and Ali climb three hills near Murree. They want the total height.",
      items: [{ id: "a", emoji: "🧒", label: "Ayesha", x: 22, y: 56, size: 3, anim: "bounce", enter: "walk_right" }, { id: "l", emoji: "🧑", label: "Ali", x: 78, y: 56, size: 3, enter: "walk_left" }] },
    { caption: "Three heights.", say: "The first hill is 2,345 metres. The second is 1,432 metres.",
      items: [{ id: "h1", emoji: "⛰️", label: "2,345 m", x: 30, y: 46, size: 2, enter: "slide_right" }, { id: "h2", emoji: "🏔️", label: "1,432 m", x: 70, y: 46, size: 2, enter: "slide_left" }] },
    { caption: "Line up the columns.", say: "Line up the digits in columns. Start with the ones on the right.",
      items: [{ id: "c", emoji: "🔢", label: "5 + 2 = 7", x: 50, y: 46, size: 3, effect: "glow" }] },
    { caption: "Tens and hundreds.", say: "Four plus three is seven. Three plus four is seven. No carrying is needed.",
      items: [{ id: "k", emoji: "🟥", label: "4 + 3 = 7", x: 50, y: 46, size: 3, enter: "pop" }] },
    { caption: "3,777 metres in total.", say: "The total is three thousand, seven hundred and seventy-seven metres.",
      camera: { zoom: 1.2, x: 50, y: 46 },
      items: [{ id: "t", emoji: "🎉", label: "3,777 m", x: 50, y: 40, size: 3, effect: "sparkle" }] },
    { caption: "Check by adding back.", say: "Check the answer by taking one hill away. You should get the second hill back.",
      items: [{ id: "a", emoji: "🧒", label: "Ayesha", x: 22, y: 56, size: 3, anim: "bounce" }, { id: "ok", emoji: "✅", label: "checked", x: 70, y: 40, size: 2, effect: "hearts" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- column_add (q1-q8)
  Q(num("What is 2,345 + 1,432?", 3777, { hint: "Start with the ones: 5 + 2.", why: "5 + 2 = 7, 4 + 3 = 7, 3 + 4 = 7, 2 + 1 = 3. So 3,777.", tag: "colmethod.add" }), "column_add", "apply",
    [num("What is 3,215 + 2,164?", 5379, { hint: "Start with the ones: 5 + 4.", why: "9, 7, 3 and 5 make 5,379.", tag: "colmethod.add" })]),
  Q(mc("Sam says when the ones add to 13, you write 13 and carry nothing. Is he right?", "No. Write 3 in the ones and carry 1 ten", ["Yes, write 13", "No, carry 1 hundred"], { hint: "Only one digit goes in each column.", why: "13 is 1 ten and 3 ones. Write 3, carry 1 ten.", tag: "colmethod.reason_carry" }), "column_add", "reason",
    [mc("Ella says when the tens add to 12, you write 12 in the tens. Is she right?", "No. Write 2 in the tens and carry 1 hundred", ["Yes, write 12", "No, carry 1 thousand"], { hint: "Only one digit goes in each column.", why: "12 tens is 1 hundred and 2 tens. Write 2 and carry 1 hundred.", tag: "colmethod.reason_carry" })]),
  Q(tf("When the tens add to 13, you write 3 in the tens and carry 1 into the hundreds.", true, { hint: "13 is one hundred and three tens?", why: "13 tens is 1 hundred and 3 tens. So write 3 and carry 1.", tag: "colmethod.carry" }), "column_add", "recall",
    [tf("When the ones add to 15, you write 5 and carry 2 tens.", false, { hint: "How many tens is 15 ones?", why: "15 ones is 1 ten and 5 ones, so carry 1 ten.", tag: "colmethod.carry" })]),
  Q(fill("Complete the column addition.", "In 2,468 + 1,357, the ones are 8 + 7 = {b1}. Write {b2} and carry 1.", [["15", "5", "12"], ["5", "1", "0"]], { hint: "8 + 7 makes more than 10.", why: "8 + 7 = 15. Write 5 and carry 1.", tag: "colmethod.carry" }), "column_add", "apply",
    [fill("Finish the sum about the tens.", "In 2,468 + 1,357, the tens are 6 + 5 + 1 = {b1}. Write {b2} and carry 1.", [["12", "2", "7"], ["2", "1", "0"]], { hint: "Add the carried 1 too.", why: "6 + 5 + 1 = 12. Write 2 and carry 1.", tag: "colmethod.carry" })]),
  Q(ms("Which two sums need a carry in the tens column? Pick two.", ["67 + 58", "46 + 75"], ["12 + 34", "21 + 13"], { hint: "Add the tens digits. Is the answer ten or more?", why: "6 + 5 = 11 and 4 + 7 = 11, so both carry.", tag: "colmethod.carry" }), "column_add", "apply",
    [ms("Which two sums need a carry in the ones column? Pick two.", ["38 + 47", "29 + 66"], ["21 + 13", "40 + 32"], { hint: "Add the ones digits.", why: "8 + 7 = 15 and 9 + 6 = 15, so both carry.", tag: "colmethod.carry" })]),
  Q(ord("Put the steps for 1,745 + 1,186 in order.", ["Add the ones: 5 + 6 = 11, write 1, carry 1", "Add the tens: 4 + 8 + 1 = 13, write 3, carry 1", "Add the hundreds: 7 + 1 + 1 = 9", "Add the thousands: 1 + 1 = 2"], { hint: "Start with the ones.", why: "Ones first, then tens, then hundreds, then thousands.", tag: "colmethod.steps" }), "column_add", "apply",
    [ord("Put the steps for 2,358 + 1,276 in order.", ["Add the ones: 8 + 6 = 14, write 4, carry 1", "Add the tens: 5 + 7 + 1 = 13, write 3, carry 1", "Add the hundreds: 3 + 2 + 1 = 6", "Add the thousands: 2 + 1 = 3"], { hint: "Start with the ones.", why: "Ones first, then tens, then hundreds, then thousands.", tag: "colmethod.steps" })]),
  Q(sld("Round to the nearest thousand to estimate 2,468 + 1,357. Slide to show your estimate.", { min: 0, max: 5000, step: 500 }, 3000, 100, { hint: "Round 2,468 to 2,000 and 1,357 to 1,000.", why: "2,000 + 1,000 = 3,000.", tag: "colmethod.estimate" }), "column_add", "apply",
    [sld("Round to the nearest thousand to estimate 3,470 + 1,420. Slide to show your estimate.", { min: 0, max: 5000, step: 500 }, 4000, 100, { hint: "Round 3,470 to 3,000 and 1,420 to 1,000.", why: "3,000 + 1,000 = 4,000.", tag: "colmethod.estimate" })]),
  Q(mat("Match each sum to its estimate.", [["2,468 + 1,357", "3,000"], ["4,712 + 2,390", "7,000"], ["3,470 + 1,920", "5,000"]], { hint: "Round each number to the nearest thousand.", why: "2,000 + 1,000 = 3,000; 5,000 + 2,000 = 7,000; 3,000 + 2,000 = 5,000.", tag: "colmethod.estimate" }), "column_add", "apply",
    [mat("Pair each sum with its estimate.", [["1,240 + 3,910", "5,000"], ["6,480 + 1,530", "8,000"], ["2,703 + 1,298", "4,000"]], { hint: "Round to the nearest thousand.", why: "1,000 + 4,000 = 5,000; 6,000 + 2,000 = 8,000; 3,000 + 1,000 = 4,000.", tag: "colmethod.estimate" })]),
  // ----- column_sub (q9-q16)
  Q(num("What is 4,305 − 1,278?", 3027, { hint: "Exchange a ten for ones first.", why: "4,305 − 1,278 = 3,027.", tag: "colmethod.sub" }), "column_sub", "apply",
    [num("What is 5,140 − 2,365?", 2775, { hint: "Exchange a ten for ones.", why: "5,140 − 2,365 = 2,775.", tag: "colmethod.sub" })]),
  Q(mc("Layla says 4,006 − 1,238 needs no exchange because the zero is not a problem. Is she right?", "No. The zero means you must exchange from the thousands first", ["Yes, zeros are not a problem", "No, you should add 1,238"], { hint: "Can you take 3 tens from 0 tens?", why: "You cannot take from zero. You go to the thousands first.", tag: "colmethod.reason_zero" }), "column_sub", "reason",
    [mc("Omar says 3,007 − 1,249 needs no exchange in the tens. Is he right?", "No. The tens are 0 take 4, so you must exchange from the thousands first", ["Yes, zeros are not a problem", "No, the answer is 2,758"], { hint: "Can you take 4 tens from 0 tens?", why: "You cannot take from 0 tens. Exchange from the thousands, then the hundreds.", tag: "colmethod.reason_zero" })]),
  Q(tf("To check 4,305 − 1,278 = 3,027, add 3,027 and 1,278.", true, { hint: "Subtraction and addition are opposites.", why: "3,027 + 1,278 = 4,305.", tag: "colmethod.check" }), "column_sub", "recall",
    [tf("To check 4,305 − 1,278, add 1,278 and 4,305.", false, { hint: "Add back the number you took away.", why: "The check is the answer plus the number taken away.", tag: "colmethod.check" })]),
  Q(fill("Finish the take-away.", "In 745 − 268, the ones are 5 − 8, so you exchange 1 ten to make {b1} ones. The ones digit of the answer is {b2}.", [["15", "7", "5"], ["7", "8", "5"]], { hint: "15 − 8 is 7.", why: "5 + 10 = 15, and 15 − 8 = 7.", tag: "colmethod.sub" }), "column_sub", "apply",
    [fill("Complete the take-away about 632 − 275.", "The ones are 2 − 5, so you exchange 1 ten to make {b1} ones. The ones digit of the answer is {b2}.", [["12", "7", "10"], ["7", "12", "5"]], { hint: "2 + 10 = 12.", why: "12 − 5 = 7.", tag: "colmethod.sub" })]),
  Q(ms("Which two take-aways need an exchange in the ones column? Pick two.", ["62 − 17", "540 − 58"], ["85 − 32", "96 − 40"], { hint: "Can you take the ones digit from the ones digit?", why: "2 is smaller than 7, and 0 is smaller than 8, so both exchange.", tag: "colmethod.sub" }), "column_sub", "apply",
    [ms("Which two take-aways need an exchange in the tens column? Pick two.", ["352 − 78", "405 − 60"], ["94 − 31", "86 − 52"], { hint: "Look at the tens digits.", why: "5 tens is fewer than 7 tens, and 0 tens is fewer than 6 tens, so both exchange.", tag: "colmethod.sub" })]),
  Q(ord("Put the steps for 603 − 285 in order.", ["Exchange 1 hundred for 10 tens", "Exchange 1 ten for 10 ones", "Subtract the ones: 13 − 5 = 8", "Subtract the tens: 9 − 8 = 1", "Subtract the hundreds: 5 − 2 = 3"], { hint: "Start with the ones.", why: "Exchange where needed, then subtract each column. The answer is 318.", tag: "colmethod.steps" }), "column_sub", "apply",
    [ord("Put the steps for 500 − 268 in order.", ["Exchange 1 hundred for 10 tens", "Exchange 1 ten for 10 ones", "Subtract the ones: 10 − 8 = 2", "Subtract the tens: 9 − 6 = 3", "Subtract the hundreds: 4 − 2 = 2"], { hint: "Start with the ones.", why: "The answer is 232.", tag: "colmethod.steps" })]),
  Q(sld("Estimate 5,138 − 2,862 by rounding to the nearest thousand. Slide to show your estimate.", { min: 0, max: 5000, step: 500 }, 2000, 100, { hint: "Round 5,138 to 5,000 and 2,862 to 3,000.", why: "5,000 − 3,000 = 2,000.", tag: "colmethod.sub" }), "column_sub", "apply",
    [sld("Estimate 7,420 − 3,890 by rounding to the nearest thousand. Slide to show your estimate.", { min: 0, max: 5000, step: 500 }, 3000, 100, { hint: "Round 7,420 to 7,000 and 3,890 to 4,000.", why: "7,000 − 4,000 = 3,000.", tag: "colmethod.sub" })]),
  Q(hot("Tap the take-away with a zero in the tens place.", [["🧮", "5,206 − 1,437", 22, 50], ["🧮", "5,638 − 1,437", 50, 50], ["🧮", "5,683 − 1,437", 78, 50]], ["5,206 − 1,437"], { labels: true, hint: "Look at the tens digit.", why: "5,206 has 0 in the tens place. The others do not.", tag: "colmethod.zero" }), "column_sub", "apply",
    [hot("Tap the take-away with a zero in the hundreds place.", [["🧮", "4,371 − 1,235", 22, 50], ["🧮", "4,071 − 1,235", 50, 50], ["🧮", "4,317 − 1,235", 78, 50]], ["4,071 − 1,235"], { labels: true, hint: "Look at the hundreds digit.", why: "4,071 has 0 in the hundreds place.", tag: "colmethod.zero" })]),
  // ----- shortcuts (q17-q24)
  Q(num("What is 456 − 199?", 257, { hint: "Take away 200, then add 1.", why: "456 − 200 = 256, then + 1 = 257.", tag: "colmethod.adjust" }), "shortcuts", "apply",
    [num("What is 723 − 298?", 425, { hint: "Take away 300, then add 2.", why: "723 − 300 = 423, then + 2 = 425.", tag: "colmethod.adjust" })]),
  Q(mc("Zain says 3,400 + 1,998 is easiest as 3,400 + 2,000 − 2. Is he right?", "Yes. 3,400 + 2,000 = 5,400, and 5,400 − 2 = 5,398", ["No, add 1,998 to 3,400 only", "No, it is 5,300"], { hint: "Is 1,998 close to 2,000?", why: "5,400 − 2 = 5,398, which is the right answer.", tag: "colmethod.reason_adjust" }), "shortcuts", "reason",
    [mc("Ben says 5,600 + 1,998 is easiest as 5,600 + 2,000 − 2. Is he right?", "Yes. 5,600 + 2,000 = 7,600, and 7,600 − 2 = 7,598", ["No, add 1,998 to 5,600 only", "No, it is 7,500"], { hint: "Is 1,998 close to 2,000?", why: "7,600 − 2 = 7,598, which is the right answer.", tag: "colmethod.reason_adjust" })]),
  Q(tf("456 − 199 is the same as 456 − 200 + 1.", true, { hint: "199 is one less than 200.", why: "Taking away 200 takes one too many, so add 1 back.", tag: "colmethod.adjust" }), "shortcuts", "recall",
    [tf("348 − 199 is the same as 348 − 200 − 1.", false, { hint: "199 is one less than 200.", why: "You took away one too many, so add 1, not take away 1.", tag: "colmethod.adjust" })]),
  Q(hot("Tap the sum that is easiest to work out in your head.", [["➕", "2,999 + 1,004", 22, 50], ["➕", "2,347 + 1,684", 50, 50], ["➕", "5,412 + 2,938", 78, 50]], ["2,999 + 1,004"], { labels: true, hint: "Is one number close to a round number?", why: "2,999 is 1 less than 3,000, so it is easy to adjust.", tag: "colmethod.choose" }), "shortcuts", "apply",
    [hot("Tap the sum that is nearest to a round number.", [["➕", "3,995 + 1,002", 22, 50], ["➕", "3,123 + 2,456", 50, 50], ["➕", "4,678 + 1,234", 78, 50]], ["3,995 + 1,002"], { labels: true, hint: "Look for numbers close to round numbers.", why: "3,995 is near 4,000, so the answer is easy to adjust.", tag: "colmethod.choose" })]),
  Q(mat("Match each sum to its quick answer.", [["199 + 300", "499"], ["4,998 + 2", "5,000"], ["3,999 + 1", "4,000"]], { hint: "Use the near round numbers.", why: "199 + 300 = 499; 4,998 + 2 = 5,000; 3,999 + 1 = 4,000.", tag: "colmethod.choose" }), "shortcuts", "apply",
    [mat("Join each sum to its quick answer.", [["299 + 200", "499"], ["2,999 + 1", "3,000"], ["5,998 + 2", "6,000"]], { hint: "Use the near round numbers.", why: "299 + 200 = 499; 2,999 + 1 = 3,000; 5,998 + 2 = 6,000.", tag: "colmethod.choose" })]),
  Q(mc("Layla says 456 − 199 = 257 is wrong because you cannot add 1 at the end. Is she right?", "No. 456 − 200 = 256 is one too many, so add 1 back to get 257", ["Yes, add nothing at the end", "No, the answer is 256"], { hint: "Did you take away too much?", why: "The adjustment is needed, so 257 is right.", tag: "colmethod.reason_adjust" }), "shortcuts", "reason",
    [mc("Sam says 723 − 298 = 425 is wrong because you cannot add 2 at the end. Is he right?", "No. 723 − 300 = 423 takes away 2 too many, so add 2 to get 425", ["Yes, add nothing at the end", "No, the answer is 423"], { hint: "Did you take away too much?", why: "The adjustment is needed, so 425 is right.", tag: "colmethod.reason_adjust" })]),
  Q(ms("Which two are good ways to estimate 4,812 + 2,396? Pick two.", ["4,800 + 2,400", "5,000 + 2,000"], ["4,000 + 1,000", "7,000 + 3,000"], { hint: "Round each number to a close, easy value.", why: "4,800 + 2,400 = 7,200 and 5,000 + 2,000 = 7,000 are both close to 7,208.", tag: "colmethod.estimate" }), "shortcuts", "apply",
    [ms("Which two are good ways to estimate 3,118 + 1,905? Pick two.", ["3,100 + 1,900", "3,000 + 2,000"], ["3,000 + 1,000", "5,000 + 5,000"], { hint: "Round to close, easy values.", why: "3,100 + 1,900 = 5,000 and 3,000 + 2,000 = 5,000. Both are close to 5,023.", tag: "colmethod.estimate" })]),
  Q(mc("Hana says the answer to 4,812 + 2,396 is about 9,000. Is she right?", "No. Rounding gives 5,000 + 2,000, which is about 7,000", ["Yes, about 9,000", "No, about 6,000"], { hint: "Round each number to the nearest thousand.", why: "5,000 + 2,000 = 7,000, so the answer is about 7,000, not 9,000.", tag: "colmethod.reason_estimate" }), "shortcuts", "reason",
    [mc("Ravi says the answer to 3,118 + 1,905 is about 8,000. Is he right?", "No. Rounding gives 3,000 + 2,000, which is about 5,000", ["Yes, about 8,000", "No, about 4,000"], { hint: "Round each number to the nearest thousand.", why: "3,000 + 2,000 = 5,000, so the answer is about 5,000.", tag: "colmethod.reason_estimate" })]),
  // ----- use_big (q25-q30)
  Q(num("Uncle Bilal sells 2,486 mangoes in January and 1,375 in February. How many in total?", 3861, { hint: "Total means add.", why: "2,486 + 1,375 = 3,861.", tag: "colmethod.word" }), "use_big", "apply",
    [num("A shop has 3,240 apples in May and 1,118 more in June. How many in total?", 4358, { hint: "Total means add.", why: "3,240 + 1,118 = 4,358.", tag: "colmethod.word" })]),
  Q(num("Hana's shop had 5,200 pencils. It sold 1,845. How many are left?", 3355, { hint: "Sold means take away.", why: "5,200 − 1,845 = 3,355.", tag: "colmethod.word" }), "use_big", "apply",
    [num("A tank holds 4,000 litres. 1,675 litres are used. How many litres are left?", 2325, { hint: "Take away the used litres.", why: "4,000 − 1,675 = 2,325.", tag: "colmethod.word" })]),
  Q(num("Zara has 3,250 stickers. She gets 1,480 more, then gives 980 away. How many now?", 3750, { hint: "Add first, then take away.", why: "3,250 + 1,480 = 4,730, then 4,730 − 980 = 3,750.", tag: "colmethod.two_step" }), "use_big", "apply",
    [num("Omar has 2,400 marbles. He wins 1,350, then loses 900. How many now?", 2850, { hint: "Add first, then take away.", why: "2,400 + 1,350 = 3,750, then 3,750 − 900 = 2,850.", tag: "colmethod.two_step" })]),
  Q(mc("Omar says 6,000 − 2,345 = 3,755 because he takes 2,000 and then 245 from 4,000. Is he right?", "No. He should take away 345 from 4,000, which gives 3,655", ["Yes, 3,755 is right", "No, it is 3,555"], { hint: "Check with the opposite sum.", why: "3,655 + 2,345 = 6,000, so 3,755 is wrong.", tag: "colmethod.reason_check" }), "use_big", "reason",
    [mc("Mira says 7,000 − 1,800 = 5,300 because she takes 1,000 and then 800. Is she right?", "No. 6,000 − 800 = 5,200, and 5,200 + 1,800 = 7,000", ["Yes, 5,300 is right", "No, it is 5,100"], { hint: "Check with the opposite sum.", why: "7,000 − 1,000 = 6,000, and 6,000 − 800 = 5,200, so 5,300 is wrong.", tag: "colmethod.reason_check" })]),
  Q(mc("Zainab says 4,305 − 1,278 = 3,137 because she did 5 − 8 = 3 in the ones. Is she right?", "No. You must exchange a ten first, so the ones are 15 − 8 = 7", ["Yes, 5 − 8 is 3", "No, the answer is 3,127"], { hint: "You cannot take 8 from 5.", why: "Exchange a ten, then 15 − 8 = 7. The answer is 3,027.", tag: "colmethod.reason_exchange" }), "use_big", "reason",
    [mc("Hamza says 2,504 − 1,236 = 1,332 because he did 6 − 4 = 2 in the ones. Is he right?", "No. You cannot take 6 from 4, so you must exchange. The answer is 1,268", ["Yes, you can swap the digits to subtract", "No, the answer is 1,278"], { hint: "Check with the opposite sum: 1,268 + 1,236.", why: "1,268 + 1,236 = 2,504, so the answer is 1,268.", tag: "colmethod.reason_exchange" })]),
  Q(mc("Ali says that you can line up the digits from the left and it works just as well. Is he right?", "No. Line up the ones under the ones, so the columns match", ["Yes, lining up from the left is fine", "No, line up the thousands only"], { hint: "Which digits must match up?", why: "Place values must line up, or the sum is wrong.", tag: "colmethod.reason_align" }), "use_big", "reason",
    [mc("Nora says you can line up 1,234 and 56 by their first digits. Is she right?", "No. Line up the ones under the ones, so 56 sits under 34", ["Yes, lining up the first digit is fine", "No, 56 must go in the thousands"], { hint: "Which column does the 6 belong to?", why: "The ones go under the ones, so 6 sits under 4.", tag: "colmethod.reason_align" })]),
];

export const topics = [
  topicLesson({
    slug: "maths-class-4-column-methods", subject: "maths", cls: 4, topic: 6, title: "Column Methods and Checking",
    summary: "Add and subtract 4-digit numbers in columns, with exchange and carrying, then estimate and check your answer.",
    unit: "Topic 6: Column methods and checking", difficulty: 3,
    objectives: ["Add and subtract 4-digit numbers in columns, with exchange", "Estimate and check answers using the inverse", "Choose a quick method for a sum"],
    success_criteria: ["I can line up columns and carry or exchange", "I can estimate before I calculate", "I can check an answer by adding back"],
    real_life: "Adding the heights of hills, counting mangoes in two months, and working out how many are left in a shop.",
    standards: [
      { framework: "nc_england", code: "Y4 add/sub", text: "Add and subtract numbers with up to four digits using formal written methods of columnar addition and subtraction" },
      { framework: "nc_england", code: "Y4 estimate", text: "Estimate and use inverse operations to check answers to a calculation" },
      { framework: "cambridge", code: "4Nc.05" }, { framework: "cambridge", code: "4Ni.01" }, { framework: "cambridge", code: "4Ni.02" }, { framework: "cambridge", code: "4Np.01" },
    ],
    warm_up: [
      num("What is 3 + 4 + 5?", 12, { hint: "Add them in order.", why: "3 + 4 = 7, then 7 + 5 = 12." }),
      num("What is 60 + 70?", 130, { hint: "6 tens and 7 tens.", why: "13 tens is 130." }),
      tf("1,000 is ten hundreds.", true, { hint: "How many hundreds fit into a thousand?", why: "10 hundreds make 1,000." }),
    ],
    intro: [],
    subs: [columnAdd, columnSub, shortcuts, useBig],
    clip,
    quiz,
  }),
];
