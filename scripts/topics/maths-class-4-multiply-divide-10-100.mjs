import { SAY, SS, H, T, IMG, PHOTO, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Coteach diagrams (see content/media/manifest.d/maths-class-4-multiply-divide-10-100.json).
const COTEACH_A = {"type":"image","asset":"maths-class-4-multiply-divide-10-100-d1-c8423e8e.png","alt":"A place value chart with an arrow showing 4 tens multiplied by 10 becomes 4 hundreds","caption":"× 10 moves a digit one place left."};
const COTEACH_B = {"type":"image","asset":"maths-class-4-multiply-divide-10-100-d2-4b83efa8.png","alt":"Blocks showing 3 hundreds, 30 tens and 300 ones","caption":"3 hundreds = 30 tens = 300 ones."};
// Class 4 Maths topic 7: Multiplying and dividing by 10 and 100 (NEW, format 3.0).
// Story thread: Zara's uncle Bilal sells mangoes and rupee notes at a stall in Lahore.
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });
const HB = (text, backdrop) => ({ ...H(text), backdrop });
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });
const OK = (label) => ["ok", "✅", 50, 90, 2, "bounce", label];

// ---------------------------------------------------------------------------------------------- 1. learn
const tensTimes = {
  id: "tens_times", kind: "learn", title: "Ten times bigger",
  blocks: [
    HB("Zara and the mango boxes", "town"),
    SAY("Zara's uncle Bilal packs mangoes in boxes. Each box holds ten mangoes. Ten boxes make a bigger pile. When we multiply by ten, every number gets ten times bigger. Let's see what happens to the digits.",
      T("Today's big question: what happens to the digits when we multiply by 10 and 100?")),
    PHOTO("maths-class-4-multiply-divide-10-100-1-8d5cde76.jpg", "Twelve white eggs arranged together on a white surface", "A group of twelve. Ten groups of ten would make one hundred.", "Photo by Mae Mu on Unsplash"),
    HB("Stop 1: Moving up a column", "classroom"),
    SAY("Here is a secret. When we multiply by ten, each digit moves one place to the left. The digits do not change. Only their places change. Look at four. Four times ten is forty. The four moves up one column, into the tens.",
      T("**Multiplying by 10** moves every digit one place to the left.", "4 × 10 = 40. The 4 moves into the tens column.")),
    EXPP("4 × 10 with place value",
      SS("Four ones. The 4 sits in the ones column.", S("4 ones", ["a", "🟥", 30, 50, 2, "none", "4 ones"])),
      SS("Multiply by ten. The 4 moves one place left, into the tens column.", S("4 × 10", ["a", "🟥", 30, 50, 2, "none", "4 ones"], ["b", "🟨", 70, 50, 3, "pulse", "4 tens"])),
      SS("Four tens is forty. The zero fills the ones place.", S("4 × 10 = 40", ["b", "🟨", 70, 50, 3, "none", "4 tens"], OK("4 × 10 = 40")))),
    SAY("When we multiply by ten, every digit moves one place to the left. Four tens become four hundreds.", COTEACH_A),
    CHK(num("What is 53 × 10?", 530, { hint: "Each digit moves one place left.", why: "53 × 10 = 530. The 5 moves to the hundreds, the 3 to the tens, and a zero fills the ones.", tag: "tens.times10" })),
    HB("Stop 2: Two places for times 100", "classroom"),
    SAY("Times one hundred moves each digit two places to the left. Six times one hundred is six hundred. The six moves from the ones, past the tens, into the hundreds. Two zeros fill the gaps.",
      T("**Multiplying by 100** moves every digit two places to the left.", "6 × 100 = 600.")),
    IMG("🔟💯", "Each place is ten times bigger than the place on its right."),
    CHK(mc("Which is 36 × 100?", "3,600", ["360", "36,000"], { hint: "Move each digit two places left.", why: "36 × 100 = 3,600.", tag: "tens.times100" })),
    SAY("Remember. Times ten moves digits one place left. Times one hundred moves them two places left. Zeros fill the empty places.", SUM("Times 10: one place left", "Times 100: two places left", "Zeros fill the empty places")),
    GLOSS({ "multiplying by 10": "Making a number ten times bigger, like 4 becomes 40.", "multiplying by 100": "Making a number a hundred times bigger, like 4 becomes 400.", "ten times the size": "Ten times bigger, like 4 becomes 40.", placeholder: "A zero that holds a place, like the zero in 40.", "place value": "What each digit is worth.", product: "The answer when you multiply." }),
  ],
  mini: [
    num("What is 8 × 10?", 80, { hint: "Move the 8 one place left.", why: "8 × 10 = 80." }),
    num("What is 9 × 100?", 900, { hint: "Move the 9 two places left.", why: "9 × 100 = 900." }),
    tf("7 × 10 and 70 are the same number.", true, { hint: "Move the 7 one place left.", why: "7 × 10 = 70." }),
    mc("Which number is 10 times the size of 25?", "250", ["2,500", "35"], { hint: "Move each digit one place left.", why: "25 × 10 = 250." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const tensDivide = {
  id: "tens_divide", kind: "try", title: "One tenth the size",
  blocks: [
    HB("Stop 1: Dividing by 10 moves digits right", "classroom"),
    SAY("Now the other way. Dividing by ten makes a number one tenth the size. So each digit moves one place to the right. Look at three hundred. Divide by ten and you get thirty. The three moves from the hundreds into the tens.",
      T("**Dividing by 10** moves every digit one place to the right.", "300 ÷ 10 = 30.")),
    EXPP("300 ÷ 10",
      SS("Three hundreds. The 3 sits in the hundreds column.", S("300", ["a", "🟦", 30, 50, 3, "none", "300"])),
      SS("Divide by ten. The 3 moves one place right, into the tens.", S("300 ÷ 10", ["a", "🟦", 30, 50, 2, "none", "300"], ["b", "🟨", 70, 50, 3, "pulse", "30"])),
      SS("Thirty. Check: thirty times ten is three hundred.", S("300 ÷ 10 = 30", ["b", "🟨", 70, 50, 3, "none", "30"], OK("300 ÷ 10 = 30")))),
    SAY("Three hundreds, thirty tens and three hundred ones are all the same amount.", COTEACH_B),
    CHK(num("What is 8,100 ÷ 10?", 810, { hint: "Move each digit one place right.", why: "8,100 ÷ 10 = 810.", tag: "tens.divide10" })),
    IMG("➗", "Divide by 10 moves digits one place right. Divide by 100 moves them two places right."),
    HB("Stop 2: Dividing by 100", "classroom"),
    SAY("Divide by one hundred and the digits move two places to the right. Take nine hundred. Divide by one hundred and you get nine. Check it with the opposite. Nine times one hundred is nine hundred.",
      T("**Dividing by 100** moves every digit two places to the right.", "900 ÷ 100 = 9.")),
    IMG("➗", "2,400 becomes 24 when the digits move two places right."),
    CHK(tf("2,400 ÷ 100 = 24.", true, { hint: "Move each digit two places right.", why: "The digits move two places right: 2,400 becomes 24.", tag: "tens.divide100" })),
    ACT("Shopping cards", ["A hundred paper cards or coins", "A pencil"], ["Make 10 piles of 10 cards each. How many cards in all?", "Divide the 100 cards into 10 piles. How many in each pile?", "Divide the 100 cards into 100 piles of 1. Which number do you divide by?", "Write the sum for each and check with a times fact."]),
    SAY("Remember. Divide by ten: digits move one place right. Divide by one hundred: digits move two places right.", SUM("÷ 10: one place right", "÷ 100: two places right", "Check with the opposite times fact")),
    GLOSS({ "dividing by 10": "Making a number one tenth the size, like 300 becomes 30.", "dividing by 100": "Making a number one hundredth the size, like 900 becomes 9.", quotient: "The answer when you divide.", "one tenth": "One part out of ten equal parts.", check: "Test an answer with the opposite operation." }),
  ],
  mini: [
    num("What is 600 ÷ 10?", 60, { hint: "Move the 6 one place right.", why: "600 ÷ 10 = 60." }),
    num("What is 7,000 ÷ 100?", 70, { hint: "Move each digit two places right.", why: "7,000 ÷ 100 = 70." }),
    tf("80 ÷ 10 = 8.", true, { hint: "8 tens divided by 10.", why: "80 ÷ 10 = 8." }),
    mc("Which fact checks that 50 ÷ 10 = 5?", "5 × 10 = 50", ["5 × 100 = 50", "50 × 10 = 5"], { hint: "Divide and multiply undo each other.", why: "5 × 10 = 50, so 50 ÷ 10 = 5 is right." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const scaling = {
  id: "scaling", kind: "play", title: "Scaling facts",
  blocks: [
    HB("Stop 1: Six sevens and sixty sevens", "classroom"),
    SAY("You already know six times seven is forty-two. Now look at sixty times seven. Sixty is ten times six. So the answer is ten times forty-two. That is four hundred and twenty. We scaled the fact.",
      T("**Scaling**: if one factor is 10 times bigger, the product is 10 times bigger.", "6 × 7 = 42, so 60 × 7 = 420.")),
    EXPP("6 × 7 scaled to 60 × 7",
      SS("Start with the fact you know: 6 × 7 = 42.", S("6 × 7 = 42", ["a", "✖️", 50, 50, 3, "none", "6 × 7 = 42"])),
      SS("Sixty is ten times six. So 60 × 7 is ten times bigger than 6 × 7.", S("60 × 7", ["a", "✖️", 50, 50, 2, "none", "6 × 7 = 42"], ["b", "🔟", 70, 50, 3, "pulse", "ten times"])),
      SS("Ten times forty-two is four hundred and twenty.", S("60 × 7 = 420", ["b", "🔟", 70, 50, 2, "none", "ten times"], OK("60 × 7 = 420")))),
    CHK(num("9 × 4 = 36. What is 90 × 4?", 360, { hint: "90 is ten times 9.", why: "Ten times 36 is 360.", tag: "tens.scale" })),
    HB("Stop 2: Scale a division fact", "classroom"),
    SAY("Division scales too. We know that forty-two divided by six is seven. What about four thousand two hundred divided by six? Four thousand two hundred is one hundred times forty-two. So the answer is one hundred times seven, which is seven hundred.",
      T("42 ÷ 6 = 7, so 4,200 ÷ 6 = 700 because 4,200 is 100 times 42.", "Scale the number you divide, and the answer scales too.")),
    CHK(tf("If 56 ÷ 7 = 8, then 560 ÷ 7 = 80.", true, { hint: "560 is ten times 56.", why: "Ten times the number gives ten times the answer when the divisor stays the same.", tag: "tens.scale_divide" })),
    SAY("Brain break. Match the pairs.", BRAIN("memory_match", "Scaled pairs", "Find the matching facts.", ["✖️", "➗", "🔟", "💯", "🟦", "🟩"])),
    REVEAL("Can you scale 5 × 9 to 500 × 9 in your head?", "Yes! 5 × 9 = 45, so 500 × 9 = 4,500, because 500 is 100 times 5."),
    SAY("Remember. Scale one fact by ten or a hundred, and the answer is scaled by the same amount.", SUM("Know one fact, scale it", "Times 10 or 100 scales the answer", "Division scales the same way")),
    GLOSS({ scaling: "Changing a fact by the same amount in each part, like 6 × 7 becoming 60 × 7.", scale: "Make a number bigger or smaller by a set amount.", factor: "A number that multiplies another.", product: "The answer to a multiplication." }),
  ],
  mini: [
    num("3 × 9 = 27. What is 30 × 9?", 270, { hint: "30 is ten times 3.", why: "10 times 27 is 270." }),
    num("What is 40 × 5?", 200, { hint: "4 × 5 = 20, then times 10.", why: "40 × 5 = 200." }),
    tf("5 × 8 = 40, so 500 × 8 = 4,000.", true, { hint: "500 is 100 times 5.", why: "100 times 40 is 4,000." }),
    mc("If 7 × 4 = 28, which fact is 70 × 4?", "280", ["28", "2,800"], { hint: "70 is ten times 7.", why: "70 × 4 = 280." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const moneyScale = {
  id: "money_scale", kind: "use", title: "Money, packs and notes",
  blocks: [
    HB("Stop 1: Packs of pencils", "home"),
    SAY("Zara's school buys pencils in packs. Each pack has 24 pencils. The school buys 10 packs. How many pencils is that? Ten packs means ten times 24. Multiply by ten and the digits move one place left.",
      T("A pack of 24 times 10 packs is 240 pencils.", "24 × 10 = 240.")),
    EXPP("24 pencils, ten packs",
      SS("One pack has 24 pencils.", S("24", ["p", "✏️", 50, 50, 3, "none", "24 pencils"])),
      SS("Ten packs. Multiply by ten. The digits move one place left.", S("24 × 10", ["p", "✏️", 40, 50, 2, "none", "24"], ["q", "📦", 70, 50, 3, "pulse", "10 packs"])),
      SS("Two hundred and forty pencils.", S("240", ["p", "✏️", 50, 50, 2, "none"], OK("24 × 10 = 240")))),
    CHK(num("A bag has 15 sweets. How many sweets are in 10 bags?", 150, { hint: "Move the digits one place left.", why: "15 × 10 = 150.", tag: "tens.pack" })),
    HB("Stop 2: Notes and coins", "town"),
    SAY("A shop has a hundred notes of fifty rupees each. How much money is that? Fifty times one hundred is five thousand rupees. Two zeros move the digits two places left.",
      T("50 × 100 = 5,000. Two places left.", "Rs 50 × 100 notes = Rs 5,000.")),
    IMG("💵", "A hundred notes of Rs 50 make Rs 5,000."),
    CHK(mc("Mina has 100 coins of Rs 5. How much money does she have?", "Rs 500", ["Rs 50", "Rs 5,000"], { hint: "5 × 100.", why: "5 × 100 = 500 rupees.", tag: "tens.money" })),
    SAY("Remember. Multiplying by ten moves digits one place left. Multiplying by a hundred moves them two places left.", SUM("Times 10: one place left", "Times 100: two places left", "Check with a real-life example")),
    GLOSS({ pack: "A set of things sold together.", note: "A paper money note.", coin: "A round piece of metal money.", total: "All of it added together." }),
  ],
  mini: [
    num("A box has 30 rulers. How many in 10 boxes?", 300, { hint: "30 × 10.", why: "30 × 10 = 300." }),
    num("One bag holds 2 kg. How many kg in 100 bags?", 200, { hint: "2 × 100.", why: "200 kg." }),
    mc("A lollipop costs Rs 20. How much for 10 lollipops?", "Rs 200", ["Rs 30", "Rs 2,000"], { hint: "20 × 10.", why: "20 × 10 = 200." }),
    tf("A note of Rs 100 times 10 is Rs 1,000.", true, { hint: "Move the digit one place left.", why: "100 × 10 = 1,000." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "The sticky worm", backdrop: "classroom", caption: "A sticky-tack worm grows ten times longer, then is cut back into tens.",
  scenes: [
    { caption: "A little worm.", say: "This is Zara's sticky-tack worm. It is four blobs long.",
      items: [{ id: "z", emoji: "👧", label: "Zara", x: 22, y: 56, size: 3, anim: "bounce", enter: "walk_right" }, { id: "w", emoji: "🐛", label: "4 blobs", x: 70, y: 46, size: 3, enter: "pop" }] },
    { caption: "Ten times longer.", say: "Zara makes the worm ten times longer. How many blobs now?",
      items: [{ id: "w", emoji: "🐛", label: "4 × 10", x: 50, y: 46, size: 3, enter: "grow" }] },
    { caption: "Forty blobs.", say: "Four tens is forty blobs. The four moves into the tens column.",
      items: [{ id: "t", emoji: "🟨", label: "40", x: 50, y: 46, size: 3, effect: "glow" }] },
    { caption: "Ten times bigger.", say: "Each blob is now a ten. Ten times bigger, one place to the left.",
      camera: { zoom: 1.2, x: 50, y: 46 },
      items: [{ id: "b", emoji: "🟦", label: "tens", x: 50, y: 46, size: 3, effect: "sparkle" }] },
    { caption: "Back to four.", say: "Now divide by ten. The digits move one place to the right again.",
      items: [{ id: "d", emoji: "✂️", label: "÷ 10", x: 50, y: 46, size: 3, enter: "slide_left" }] },
    { caption: "Zara says shukriya!", say: "Forty divided by ten is four. Shukriya, Zara!",
      items: [{ id: "z", emoji: "👧", label: "Zara", x: 22, y: 56, size: 3, anim: "bounce" }, { id: "r", emoji: "🎉", label: "40 ÷ 10 = 4", x: 70, y: 40, size: 2, effect: "hearts" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- tens_times (q1-q8)
  Q(num("What is 45 × 10?", 450, { hint: "Move each digit one place left.", why: "45 × 10 = 450.", tag: "tens.times10" }), "tens_times", "apply",
    [num("What is 70 × 10?", 700, { hint: "Move the 7 one place left.", why: "70 × 10 = 700.", tag: "tens.times10" })]),
  Q(num("What is 47 × 100?", 4700, { hint: "Move each digit two places left.", why: "47 × 100 = 4,700.", tag: "tens.times100" }), "tens_times", "apply",
    [num("What is 58 × 100?", 5800, { hint: "Move each digit two places left.", why: "58 × 100 = 5,800.", tag: "tens.times100" })]),
  Q(mc("Aisha says 70 × 10 is 710 because you add 10 to 70. Is she right?", "No. 70 × 10 = 700, because the digits move one place left", ["Yes, 710", "No, it is 80"], { hint: "Think about the digits moving.", why: "The digits move one place left, so 7 becomes 7 hundreds.", tag: "tens.reason_addzero" }), "tens_times", "reason",
    [mc("Sam says 9 × 10 is 19 because you add 10 to 9. Is he right?", "No. 9 × 10 = 90, because the 9 moves one place left", ["Yes, 19", "No, it is 900"], { hint: "Where does the 9 move?", why: "The 9 moves one place left, into the tens. So 90.", tag: "tens.reason_addzero" })]),
  Q(tf("7 × 10 is 70.", true, { hint: "Move the 7 one place left.", why: "The 7 moves into the tens, and a zero fills the ones.", tag: "tens.times10" }), "tens_times", "recall",
    [tf("4 × 10 is 400.", false, { hint: "Move the 4 one place left.", why: "4 × 10 = 40.", tag: "tens.times10" })]),
  Q(fill("Complete the place value.", "When you multiply 4 by 100, the 4 moves {b1} places left, so 4 × 100 = {b2}.", [["2", "1", "3"], ["400", "40", "4,000"]], { hint: "Two places left.", why: "4 moves two places left, so 4 × 100 = 400.", tag: "tens.times100" }), "tens_times", "apply",
    [fill("Complete the place value about 9.", "When you multiply 9 by 10, the 9 moves {b1} place left, so 9 × 10 = {b2}.", [["1", "2", "3"], ["90", "9", "900"]], { hint: "One place left.", why: "9 moves one place left, so 9 × 10 = 90.", tag: "tens.times10" })]),
  Q(ms("Which two numbers are ten times the size of 30? Pick two.", ["300", "30 tens"], ["33", "130"], { hint: "Multiply 30 by 10.", why: "30 × 10 = 300, and 30 tens is also 300.", tag: "tens.size" }), "tens_times", "apply",
    [ms("Which two numbers are ten times the size of 70? Pick two.", ["700", "70 tens"], ["77", "170"], { hint: "Multiply 70 by 10.", why: "70 × 10 = 700, and 70 tens is also 700.", tag: "tens.size" })]),
  Q(ord("Put these in order, smallest first.", ["4 × 1", "4 × 10", "4 × 100"], { hint: "Each one is ten times the one before.", why: "4, 40, 400.", tag: "tens.order" }), "tens_times", "apply",
    [ord("Put these in order, biggest first.", ["6 × 100", "6 × 10", "6 × 1"], { hint: "Each one is ten times smaller than the one before.", why: "600, then 60, then 6.", tag: "tens.order" })]),
  Q(mat("Match each times-ten fact to its answer.", [["8 × 10", "80"], ["12 × 10", "120"], ["25 × 10", "250"]], { hint: "Move each digit one place left.", why: "8 × 10 = 80, 12 × 10 = 120, 25 × 10 = 250.", tag: "tens.times10" }), "tens_times", "apply",
    [mat("Join each times-ten fact to its answer.", [["40 × 10", "400"], ["7 × 100", "700"], ["90 × 10", "900"]], { hint: "Move the digits.", why: "40 × 10 = 400, 7 × 100 = 700, 90 × 10 = 900.", tag: "tens.times10" })]),
  // ----- tens_divide (q9-q16)
  Q(num("What is 3,000 ÷ 10?", 300, { hint: "Move each digit one place right.", why: "3,000 ÷ 10 = 300.", tag: "tens.divide10" }), "tens_divide", "apply",
    [num("What is 4,500 ÷ 10?", 450, { hint: "Move each digit one place right.", why: "4,500 ÷ 10 = 450.", tag: "tens.divide10" })]),
  Q(mc("Layla says 500 ÷ 10 = 50 because you take away one zero. Is she right?", "Yes. Dividing by 10 moves each digit one place right, so 500 becomes 50", ["No, 500 ÷ 10 is 500", "No, it is 5"], { hint: "Where does each digit move?", why: "The 5 moves one place right into the tens, so 50.", tag: "tens.reason_divide" }), "tens_divide", "reason",
    [mc("Omar says 800 ÷ 10 = 80 because he moves each digit one place right. Is he right?", "Yes. The 8 moves from the hundreds into the tens, so 80", ["No, it is 800", "No, it is 8"], { hint: "One place for ÷ 10.", why: "8 hundreds ÷ 10 = 8 tens = 80.", tag: "tens.reason_divide" })]),
  Q(tf("700 ÷ 100 = 7.", true, { hint: "Move each digit two places right.", why: "7 hundreds divided by 100 is 7.", tag: "tens.divide100" }), "tens_divide", "recall",
    [tf("900 ÷ 100 = 90.", false, { hint: "Move each digit two places right.", why: "900 ÷ 100 = 9.", tag: "tens.divide100" })]),
  Q(fill("Complete the division.", "2,400 ÷ 100 = {b1}, because the digits move {b2} places right.", [["24", "240", "2.4"], ["two", "one", "three"]], { hint: "Two places for ÷ 100.", why: "2,400 ÷ 100 = 24, and the digits move two places right.", tag: "tens.divide100" }), "tens_divide", "apply",
    [fill("Complete the division about 3,600.", "3,600 ÷ 10 = {b1}, because the digits move {b2} place right.", [["360", "36", "3,060"], ["one", "two", "zero"]], { hint: "One place for ÷ 10.", why: "3,600 ÷ 10 = 360 and the digits move one place right.", tag: "tens.divide10" })]),
  Q(ms("Which two divisions give 60? Pick two.", ["600 ÷ 10", "6,000 ÷ 100"], ["60 ÷ 10", "600 ÷ 100"], { hint: "Work out each answer.", why: "600 ÷ 10 = 60 and 6,000 ÷ 100 = 60.", tag: "tens.divide_facts" }), "tens_divide", "apply",
    [ms("Which two divisions give 300? Pick two.", ["3,000 ÷ 10", "30,000 ÷ 100"], ["300 ÷ 10", "3,000 ÷ 100"], { hint: "Work out each answer.", why: "3,000 ÷ 10 = 300 and 30,000 ÷ 100 = 300.", tag: "tens.divide_facts" })]),
  Q(ord("Put these in order, smallest answer first.", ["500 ÷ 100", "5,000 ÷ 100", "5,000 ÷ 10"], { hint: "Work out each answer.", why: "5, then 50, then 500.", tag: "tens.order" }), "tens_divide", "apply",
    [ord("Order these from the smallest answer.", ["600 ÷ 100", "6,000 ÷ 100", "6,000 ÷ 10"], { hint: "Work out each answer.", why: "6, then 60, then 600.", tag: "tens.order" })]),
  Q(sld("A shop packs 3,000 stickers equally into 100 bags. Slide to show how many stickers are in each bag.", { min: 0, max: 100, step: 1 }, 30, 1, { hint: "Divide by 100: move the digits two places right.", why: "3,000 ÷ 100 = 30.", tag: "tens.divide100" }), "tens_divide", "apply",
    [sld("A shop packs 4,000 stickers equally into 100 bags. Slide to show how many stickers are in each bag.", { min: 0, max: 100, step: 1 }, 40, 1, { hint: "Divide by 100: move the digits two places right.", why: "4,000 ÷ 100 = 40.", tag: "tens.divide100" })]),
  Q(hot("Tap the answer to 8,000 ÷ 100.", [["🔢", "8", 22, 50], ["🔢", "80", 50, 50], ["🔢", "800", 78, 50]], ["80"], { labels: true, hint: "Two places right.", why: "8,000 ÷ 100 = 80.", tag: "tens.divide100" }), "tens_divide", "apply",
    [hot("Tap the answer to 2,500 ÷ 100.", [["🔢", "205", 22, 50], ["🔢", "25", 50, 50], ["🔢", "250", 78, 50]], ["25"], { labels: true, hint: "Two places right.", why: "2,500 ÷ 100 = 25.", tag: "tens.divide100" })]),
  // ----- scaling (q17-q24)
  Q(num("6 × 7 = 42. What is 60 × 7?", 420, { hint: "60 is ten times 6.", why: "Ten times 42 is 420.", tag: "tens.scale" }), "scaling", "apply",
    [num("8 × 6 = 48. What is 80 × 6?", 480, { hint: "80 is ten times 8.", why: "Ten times 48 is 480.", tag: "tens.scale" })]),
  Q(mc("Mira says 6 × 70 = 42 because the tens do not count. Is she right?", "No. 6 × 7 = 42, so 6 × 70 = 420", ["Yes, 42", "No, it is 4,200"], { hint: "Scale 42 by ten.", why: "70 is ten times 7, so the answer is ten times 42.", tag: "tens.reason_scale" }), "scaling", "reason",
    [mc("Sam says 9 × 40 = 36 because 40 has a zero that does not count. Is he right?", "No. 9 × 4 = 36, so 9 × 40 = 360", ["Yes, 36", "No, it is 3,600"], { hint: "40 is ten times 4.", why: "Ten times 36 is 360.", tag: "tens.reason_scale" })]),
  Q(tf("If 7 × 8 = 56, then 70 × 8 = 560.", true, { hint: "70 is ten times 7.", why: "Ten times 56 is 560.", tag: "tens.scale" }), "scaling", "recall",
    [tf("If 7 × 8 = 56, then 70 × 8 = 56.", false, { hint: "70 is ten times 7.", why: "The answer must be ten times 56.", tag: "tens.scale" })]),
  Q(hot("Tap the answer to 30 × 8.", [["✖️", "24", 22, 50], ["✖️", "240", 50, 50], ["✖️", "2,400", 78, 50]], ["240"], { labels: true, hint: "30 is ten times 3.", why: "3 × 8 = 24, so 30 × 8 = 240.", tag: "tens.scale" }), "scaling", "apply",
    [hot("Tap the answer to 50 × 6.", [["✖️", "30", 22, 50], ["✖️", "300", 50, 50], ["✖️", "3,000", 78, 50]], ["300"], { labels: true, hint: "5 × 6 = 30.", why: "50 × 6 = 300.", tag: "tens.scale" })]),
  Q(mat("Match each scaled fact to its answer.", [["3 × 4 = 12, so 30 × 4", "120"], ["5 × 6 = 30, so 50 × 6", "300"], ["9 × 2 = 18, so 90 × 2", "180"]], { hint: "Scale the answer by the same amount.", why: "120, 300 and 180.", tag: "tens.scale" }), "scaling", "apply",
    [mat("Join each scaled fact to its answer.", [["7 × 3 = 21, so 70 × 3", "210"], ["4 × 8 = 32, so 40 × 8", "320"], ["6 × 5 = 30, so 60 × 5", "300"]], { hint: "Scale the answer by ten.", why: "210, 320 and 300.", tag: "tens.scale" })]),
  Q(mc("Ben says 4 × 3 = 12 so 400 × 3 = 120 because the zeros are removed. Is he right?", "No. 4 × 3 = 12, so 400 × 3 = 1,200", ["Yes, 120", "No, 12,000"], { hint: "400 is a hundred times 4.", why: "12 times 100 is 1,200.", tag: "tens.reason_scale" }), "scaling", "reason",
    [mc("Ella says 2 × 5 = 10 so 200 × 5 = 100. Is she right?", "No. 2 × 5 = 10, so 200 × 5 = 1,000", ["Yes, 100", "No, 10,000"], { hint: "200 is a hundred times 2.", why: "10 times 100 is 1,000.", tag: "tens.reason_scale" })]),
  Q(ms("Which two are the same as 60 × 9? Pick two.", ["(6 × 9) × 10", "9 × 6 tens"], ["(6 × 9) × 100", "60 × 90"], { hint: "6 × 9 = 54.", why: "54 times 10 and 9 times 60 both make 540.", tag: "tens.scale" }), "scaling", "apply",
    [ms("Which two are the same as 40 × 5? Pick two.", ["(4 × 5) × 10", "5 × 4 tens"], ["(4 × 5) × 100", "40 × 50"], { hint: "4 × 5 = 20.", why: "20 times 10 and 5 times 40 both make 200.", tag: "tens.scale" })]),
  Q(mc("Sara says 7 × 8 = 56 so 700 × 8 = 560. Is she right?", "No. 700 × 8 = 5,600, because 700 is a hundred times 7", ["Yes, 560", "No, 56,000"], { hint: "700 is a hundred times 7.", why: "56 times 100 is 5,600.", tag: "tens.reason_scale" }), "scaling", "reason",
    [mc("Hamza says 5 × 9 = 45 so 500 × 9 = 450. Is he right?", "No. 500 × 9 = 4,500, because 500 is a hundred times 5", ["Yes, 450", "No, 45,000"], { hint: "500 is a hundred times 5.", why: "45 times 100 is 4,500.", tag: "tens.reason_scale" })]),
  // ----- money_scale (q25-q30)
  Q(sld("Each pack has 10 pencils. A school buys 24 packs. Slide to show how many pencils.", { min: 0, max: 500, step: 10 }, 240, 10, { hint: "24 × 10.", why: "24 × 10 = 240.", tag: "tens.pack" }), "money_scale", "apply",
    [sld("Each pack has 10 pencils. A school buys 36 packs. Slide to show how many pencils.", { min: 0, max: 500, step: 10 }, 360, 10, { hint: "36 × 10.", why: "36 × 10 = 360.", tag: "tens.pack" })]),
  Q(num("A note is Rs 50. How much is 100 notes?", 5000, { hint: "50 × 100.", why: "5 × 100 = 500, then 50 × 100 = 5,000.", tag: "tens.money" }), "money_scale", "apply",
    [num("A coin is Rs 5. How much is 100 coins?", 500, { hint: "5 × 100.", why: "5 × 100 = 500.", tag: "tens.money" })]),
  Q(num("A bag has 2 kg of rice. How many kg are in 100 bags?", 200, { hint: "2 × 100.", why: "200 kg.", tag: "tens.money" }), "money_scale", "apply",
    [num("A bag has 3 kg of flour. How many kg are in 100 bags?", 300, { hint: "3 × 100.", why: "300 kg.", tag: "tens.money" })]),
  Q(mc("Zara says Rs 40 × 10 = Rs 410 because you add 10. Is she right?", "No. Rs 40 × 10 = Rs 400, because the digits move one place left", ["Yes, Rs 410", "No, Rs 50"], { hint: "Think about the digits moving.", why: "40 × 10 = 400.", tag: "tens.reason_money" }), "money_scale", "reason",
    [mc("Ali says Rs 9 × 100 = Rs 109 because you add 100. Is he right?", "No. Rs 9 × 100 = Rs 900, because the digit moves two places left", ["Yes, Rs 109", "No, Rs 90"], { hint: "Two places left for × 100.", why: "9 × 100 = 900.", tag: "tens.reason_money" })]),
  Q(mc("Layla says 100 notes of Rs 20 make Rs 200. Is she right?", "No. 20 × 100 = 2,000, so it is Rs 2,000", ["Yes, Rs 200", "No, Rs 20,000"], { hint: "Multiply 20 by 100.", why: "20 × 100 = 2,000.", tag: "tens.reason_money" }), "money_scale", "reason",
    [mc("Omar says 100 notes of Rs 10 make Rs 100. Is he right?", "No. 10 × 100 = 1,000, so it is Rs 1,000", ["Yes, Rs 100", "No, Rs 10,000"], { hint: "Multiply 10 by 100.", why: "10 × 100 = 1,000.", tag: "tens.reason_money" })]),
  Q(mc("Zainab says 3,000 ÷ 100 = 300 because she removes one zero. Is she right?", "No. Removing two zeros gives 30, so 3,000 ÷ 100 = 30", ["Yes, 300", "No, 3,000"], { hint: "Divide by 100 moves the digits two places right.", why: "3,000 ÷ 100 = 30, not 300.", tag: "tens.reason_divide" }), "money_scale", "reason",
    [mc("Hana says 4,000 ÷ 10 = 40 because she removes two zeros. Is she right?", "No. Removing one zero gives 400, so 4,000 ÷ 10 = 400", ["Yes, 40", "No, it is 4"], { hint: "Divide by 10 moves digits one place right.", why: "4,000 ÷ 10 = 400.", tag: "tens.reason_divide" })]),
];

export const topics = [
  topicLesson({
    slug: "maths-class-4-multiply-divide-10-100", subject: "maths", cls: 4, topic: 7, title: "Multiplying and Dividing by 10 and 100",
    summary: "See that digits move columns when we multiply or divide by 10 and 100, and scale known facts.",
    unit: "Topic 7: Multiplying and dividing by 10 and 100", difficulty: 2,
    objectives: ["Multiply and divide whole numbers by 10 and 100", "Explain it with place value", "Scale known times table facts"],
    success_criteria: ["I can say what happens to the digits when I multiply by 10 or 100", "I can divide by 10 and 100 using place value", "I can scale a fact I know"],
    real_life: "Counting packs of pencils, notes and coins, and scaling a recipe or a shop order.",
    standards: [
      { framework: "nc_england", code: "Y4 place value", text: "Find 1,000 more or less than a given number; multiply and divide by 10 and 100 using place value" },
      { framework: "cambridge", code: "4Nc.02" }, { framework: "cambridge", code: "4Nc.04" }, { framework: "cambridge", code: "4Ni.04" }, { framework: "cambridge", code: "4Ni.05" },
    ],
    warm_up: [
      num("What is 6 + 7?", 13, { hint: "Make a ten first.", why: "6 + 4 = 10, then 3 more is 13." }),
      num("What is 5 × 4?", 20, { hint: "Count in fours.", why: "5 × 4 = 20." }),
      tf("3 tens is 30.", true, { hint: "10 + 10 + 10.", why: "3 tens is 30." }),
    ],
    intro: [],
    subs: [tensTimes, tensDivide, scaling, moneyScale],
    clip,
    quiz,
  }),
];
