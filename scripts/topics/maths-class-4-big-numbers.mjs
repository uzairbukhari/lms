import { SAY, SS, H, T, IMG, TIP, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, NLINE, TABLE, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Class 4 (Fatima) Maths topic 1: Big numbers. Standards from docs/CURRICULUM_V2.md.
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });

const placeValue = {
  id: "place_value", kind: "learn", title: "Place value to 10,000 and rounding",
  blocks: [
    H("Stop 1: Thousands, hundreds, tens and ones"),
    SAY("Big numbers are not scary. They are built from four little parts, called places. From the right they are ones, tens, hundreds and thousands. Let's build the number four thousand, three hundred and seventy-two, one place at a time. Watch how the number grows.", T("A number up to 9,999 has four places: **thousands**, **hundreds**, **tens** and **ones**.", "Each place is ten times bigger than the one on its right.")),
    EXPP("Build 4,372",
      SS("Start on the left with the thousands. There are four thousands. That is four thousand.", S("4 thousands = 4,000", ["th", "🟦", 20, 45, 3, "pulse", "4 thousands"])),
      SS("Next, the hundreds. Three hundreds make three hundred.", S("3 hundreds = 300", ["th", "🟦", 20, 45, 3, "none", "4 thousands"], ["hu", "🟩", 40, 45, 3, "pulse", "3 hundreds"])),
      SS("Then seven tens, which is seventy, and two ones, which is two.", S("7 tens = 70 and 2 ones = 2", ["th", "🟦", 20, 45, 3, "none", "4 thousands"], ["hu", "🟩", 40, 45, 3, "none", "3 hundreds"], ["te", "🟨", 60, 45, 3, "pulse", "7 tens"], ["on", "🟥", 80, 45, 3, "pulse", "2 ones"])),
      SS("Put them all together and we get four thousand, three hundred and seventy-two. We write it 4,372, with a comma after the thousands.", S("4,000 + 300 + 70 + 2 = 4,372", ["th", "🟦", 20, 30, 2, "none", "4 thousands"], ["hu", "🟩", 40, 30, 2, "none", "3 hundreds"], ["te", "🟨", 60, 30, 2, "none", "7 tens"], ["on", "🟥", 80, 30, 2, "none", "2 ones"], ["n", "🔢", 50, 72, 3, "pulse", "4,372"]))),
    CHK(mc("In the number 2,764, what does the 7 stand for?", "700", ["7", "70"], { hint: "Which place is the 7 in?", why: "The 7 is in the hundreds place, so it is worth 700.", tag: "bignumbers.value" })),
    H("Stop 2: 10 more, 100 more, 1,000 more"),
    SAY("Here is a super power. To make a number ten more, only the tens digit changes. For one hundred more, only the hundreds digit changes. For one thousand more, only the thousands digit changes. The other digits stay still. Try with three thousand, two hundred and fifty. One thousand more is four thousand, two hundred and fifty.", T("To add 1,000 only the thousands digit changes: 3,250 becomes 4,250.", "10 more changes the tens digit and 100 more changes the hundreds digit.")),
    IMG("🔟", "10 more, 100 more or 1,000 more changes one digit only."),
    CHK(num("What is 1,000 more than 6,305?", 7305, { hint: "Only the thousands digit changes.", why: "6,305 + 1,000 = 7,305.", tag: "bignumbers.more_less" })),
    H("Stop 3: Rounding"),
    SAY("Rounding gives us a friendly number that is close. To round to the nearest hundred, look at the tens digit. Four or less, stay where you are. Five or more, go up to the next hundred. Look at three hundred and seventy-two on the number line. It sits between three hundred and four hundred. It is closer to four hundred, so it rounds up to four hundred.", T("To **round** to the nearest 100, look at the tens digit. 5 or more rounds up. 4 or less rounds down.", "372 is closer to 400, so it rounds to 400.")),
    NLINE("372 on the line from 300 to 400", 300, 400, [300, 350, 372, 400], "372 is past the halfway mark of 350, so it rounds up to 400.", 10),
    CHK(num("Round 5,382 to the nearest 100.", 5400, { hint: "Look at the tens digit, 8.", why: "The tens digit 8 is 5 or more, so round up to 5,400.", tag: "bignumbers.round" })),
    SAY("Remember. Each place is ten times bigger than the place on its right. To round, look at the digit just to the right of the place you are rounding to.", SUM("Four places: thousands, hundreds, tens, ones", "10, 100 or 1,000 more changes one digit", "Round: 5 or more goes up, 4 or less stays")),
    GLOSS({ thousands: "Big groups of one thousand. In 4,372 there are 4 thousands.", hundreds: "Groups of one hundred. In 4,372 there are 3 hundreds.", tens: "Groups of ten.", ones: "Single things.", round: "To change a number to a close, easier one, such as the nearest 100." }),
  ],
  mini: [
    mc("What is the value of the 7 in 7,260?", "7,000", ["700", "70"], { hint: "Which place is the 7 in?", why: "The 7 is in the thousands place, so it is worth 7,000." }),
    num("What is 100 less than 4,520?", 4420, { hint: "Only the hundreds digit changes.", why: "4,520 − 100 = 4,420." }),
    tf("8,615 rounded to the nearest 10 is 8,620.", true, { hint: "Look at the ones digit, 5.", why: "5 rounds up, so 8,615 rounds to 8,620." }),
    ord("Put these numbers in order, smallest first.", ["2,909", "3,019", "3,190", "3,901"], { hint: "Compare the thousands first.", why: "Compare thousands, then hundreds, then tens." }),
  ],
};

const addSub = {
  id: "add_sub", kind: "try", title: "Adding and taking away big numbers",
  blocks: [
    H("Stop 1: Column addition"),
    SAY("To add big numbers, line them up in columns, ones under ones, tens under tens. Always start with the ones on the right. Let's add two thousand, four hundred and sixty-eight, and one thousand, three hundred and fifty-seven. Eight and seven make fifteen. We write five and carry one ten across.", T("Write numbers in columns. Start with the **ones** and **carry** when a column makes ten or more.", "Add 2,468 + 1,357 one column at a time.")),
    EXPP("2,468 + 1,357",
      SS("Ones first. Eight plus seven is fifteen. Write five, and carry one ten to the tens column.", S("8 + 7 = 15. Write 5, carry 1.", ["a", "🔢", 50, 25, 3, "none", "2,468 + 1,357"], ["o", "🟥", 80, 65, 3, "pulse", "ones: 5, carry 1"])),
      SS("Tens next. Six plus five plus the carried one makes twelve. Write two, and carry one hundred.", S("6 + 5 + 1 = 12. Write 2, carry 1.", ["a", "🔢", 50, 25, 3, "none", "2,468 + 1,357"], ["o", "🟥", 80, 65, 2, "none", "ones: 5"], ["t", "🟨", 60, 65, 3, "pulse", "tens: 2, carry 1"])),
      SS("Hundreds. Four plus three plus one is eight. Then thousands. Two plus one is three.", S("4 + 3 + 1 = 8, then 2 + 1 = 3.", ["a", "🔢", 50, 25, 3, "none", "2,468 + 1,357"], ["o", "🟥", 80, 65, 2, "none", "ones: 5"], ["t", "🟨", 60, 65, 2, "none", "tens: 2"], ["h", "🟩", 40, 65, 3, "pulse", "hundreds: 8"], ["k", "🟦", 20, 65, 3, "pulse", "thousands: 3"])),
      SS("The answer is three thousand, eight hundred and twenty-five.", S("2,468 + 1,357 = 3,825", ["a", "🔢", 50, 30, 3, "none", "2,468 + 1,357"], ["r", "🎉", 50, 70, 3, "bounce", "3,825"]))),
    CHK(num("What is 1,236 + 2,145?", 3381, { hint: "Start with the ones: 6 + 5.", why: "6 + 5 = 11, 3 + 4 + 1 = 8, 2 + 1 = 3, 1 + 2 = 3. So 3,381.", tag: "bignumbers.add" })),
    SAY("Here are twenty blocks. Each block is one hundred. Drag ten of them into the Thousands box. Ten hundreds make one thousand! That trade is exactly what carrying means.", MAN("Trade hundreds for a thousand", "Each block is 100. Drag 10 blocks into the Thousands box to make 1,000.", "🟩", 20, ["Hundreds", "Thousands"])),
    H("Stop 2: Taking away with exchange"),
    SAY("Taking away works the same way, but we exchange instead of carry. Look at five thousand, two hundred and four, take away two thousand, eight hundred and seventeen. We cannot take seven from four. So we swap one ten for ten ones. When a place has nothing to swap, we go to the next place left. Finally, always check with the opposite sum. Add your answer back and you should get the number you started with.", T("When you cannot take away, **exchange**: swap one from the next place left for ten here.", "Check with the opposite: 2,387 + 2,817 should make 5,204.")),
    IMG("🔁", "Subtract, then check by adding the answer back."),
    CHK(num("What is 5,204 − 2,817?", 2387, { hint: "Exchange from the hundreds, then the tens.", why: "5,204 − 2,817 = 2,387. Check: 2,387 + 2,817 = 5,204.", tag: "bignumbers.subtract" })),
    SAY("Time to try it away from the screen. Use a pencil and paper and a few real prices.", ACT("Shop receipt maths", ["Pencil and paper", "A real shopping receipt or a price list"], ["Pick two prices from the receipt that are in rupees or pounds and are over 1,000 pence or rupees.", "Add them in columns.", "Take the smaller from the bigger in columns.", "Check each answer using the opposite sum."])),
    REVEAL("Is 1,000 + 1,000 + 1,000 + 1,000 + 1,000 + 1,000 + 1,000 + 1,000 + 1,000 + 1,000 the same as 10,000?", "Yes! Ten thousands make ten thousand. That is the next place to the left after the thousands."),
    SAY("Remember. Add and take away in columns, starting from the ones. Carry when a column makes ten or more, and exchange when you cannot take away. Always check with the opposite sum.", SUM("Line up columns and start with the ones", "Carry when a column makes ten or more", "Exchange when you cannot take away, then check with the opposite sum")),
    GLOSS({ carry: "Moving ten from one column into the next column to the left.", exchange: "Swapping one from the next place for ten in this place when taking away.", column: "Numbers lined up, ones under ones, tens under tens.", ones: "Single things.", "opposite sum": "Adding to check a take away, or taking away to check an add." }),
  ],
  mini: [
    num("What is 3,450 + 2,300?", 5750, { hint: "Add the hundreds and thousands.", why: "3,450 + 2,300 = 5,750." }),
    num("What is 7,000 − 4,000?", 3000, { hint: "7 thousands take away 4 thousands.", why: "7,000 − 4,000 = 3,000." }),
    mc("Which sum checks that 6,000 − 2,500 = 3,500?", "3,500 + 2,500", ["3,500 − 2,500", "6,000 + 2,500"], { hint: "Use the opposite operation.", why: "3,500 + 2,500 = 6,000, so the answer is right." }),
    tf("When you add 9 and 8 in the ones column you carry 1 ten.", true, { hint: "9 + 8 = 17.", why: "17 is one ten and 7 ones, so write 7 and carry 1." }),
  ],
};

const negatives = {
  id: "negatives", kind: "play", title: "Below zero and Roman numerals",
  blocks: [
    H("Stop 1: Numbers below zero"),
    SAY("Have you ever seen a temperature of minus three? Numbers below zero are called negative numbers. On a thermometer, zero is freezing, and the numbers keep going down below zero. Watch the mercury drop from five degrees, past zero, to minus three.", T("**Negative numbers** are below zero. −3 is colder than 0.", "The further below zero, the smaller the number.")),
    EXPP("Dropping below zero",
      SS("It is five degrees. That is a cool day in Murree.", S("5°C", ["t", { kind: "thermometer", value: 5, from: -10, to: 20 }, 50, 50, 3, "none"])),
      SS("The temperature falls to zero. Water would freeze now.", S("0°C", ["t", { kind: "thermometer", value: 0, from: -10, to: 20 }, 50, 50, 3, "none"])),
      SS("It keeps falling to minus three. That is three degrees below zero. Minus three is smaller than zero.", S("−3°C", ["t", { kind: "thermometer", value: -3, from: -10, to: 20 }, 50, 50, 3, "pulse"]))),
    CHK(mc("Which is the coldest temperature?", "−6°C", ["0°C", "−2°C"], { hint: "The further below zero, the colder.", why: "−6°C is the furthest below zero.", tag: "bignumbers.negative" })),
    H("Stop 2: Roman numerals"),
    SAY("Long ago, Romans wrote numbers using letters. I is one, V is five, X is ten, L is fifty and C is one hundred. When a smaller letter comes before a bigger one, you take it away. IV is four, which is five take away one. When it comes after, you add. VI is six. You can still see Roman numerals on clock faces.", T("**Roman numerals** use letters: I = 1, V = 5, X = 10, L = 50, C = 100.", "A smaller letter before a bigger one is taken away: IV = 4. After it, we add: VI = 6.")),
    TABLE("Roman numerals", [["I", 1], ["V", 5], ["X", 10], ["L", 50], ["C", 100]], "The five Roman letters we use."),
    CHK(num("What number is XIV?", 14, { hint: "X is 10 and IV is 4.", why: "XIV = 10 + 4 = 14.", tag: "bignumbers.roman" })),
    H("Stop 3: Brain break"),
    SAY("Time to play. Watch the lights, then copy the order.", BRAIN("remember_order", "Number lights", "Watch the order, then copy it.", ["🔴", "🔵", "🟡", "🟢"])),
    CHK(tf("−10 is bigger than −2.", false, { hint: "Which is closer to zero?", why: "−2 is closer to zero, so −2 is bigger than −10.", tag: "bignumbers.negative" })),
    SAY("Remember. Negative numbers are below zero, and the further below zero the smaller they are. Roman numerals use letters, and a smaller letter before a bigger one is taken away.", SUM("Negative numbers are below zero", "−6 is smaller than −2", "Roman numerals use letters: IV = 4, VI = 6")),
    GLOSS({ "negative numbers": "Numbers below zero, like −3.", thermometer: "A tool that measures temperature.", "Roman numerals": "Numbers written with letters, like XIV for 14.", zero: "The number between the positive and negative numbers." }),
  ],
  mini: [
    mc("Which number is smallest?", "−9", ["−3", "0"], { hint: "Further below zero is smaller.", why: "−9 is furthest below zero." }),
    num("What is the temperature 5 degrees below 2°C?", -3, { hint: "Count back past zero.", why: "2 − 5 = −3, so −3°C." }),
    num("What number is XX?", 20, { hint: "X is 10.", why: "X + X = 20." }),
    mat("Match the Roman numeral to the number.", [["IX", "9"], ["XV", "15"], ["L", "50"]], { hint: "IX is 10 take away 1.", why: "IX = 9, XV = 15, L = 50." }),
  ],
};

const realWorld = {
  id: "real_world", kind: "use", title: "Mountains, money and number patterns",
  blocks: [
    H("Stop 1: How much higher?"),
    SAY("Big numbers help us compare real things. K2 in Pakistan is the second highest mountain in the world. It is eight thousand, six hundred and eleven metres high. Ben Nevis in Scotland is the highest mountain in the United Kingdom. It is one thousand, three hundred and forty-five metres high. To find out how much higher K2 is, we take away.", T("K2 is 8,611 m high. Ben Nevis is 1,345 m high.", "To find **the difference**, take the smaller number away from the bigger one.")),
    EXPP("Two mountains",
      SS("Here is K2. It is 8,611 metres high.", S("K2: 8,611 m", ["k", "🏔️", 30, 45, 3, "none", "K2 8,611 m"])),
      SS("Here is Ben Nevis. It is 1,345 metres high. It is much smaller.", S("Ben Nevis: 1,345 m", ["k", "🏔️", 30, 45, 3, "none", "K2 8,611 m"], ["b", "⛰️", 72, 60, 2, "pulse", "Ben Nevis 1,345 m"])),
      SS("The difference is eight thousand, six hundred and eleven take away one thousand, three hundred and forty-five. That is seven thousand, two hundred and sixty-six metres.", S("8,611 − 1,345 = 7,266 m", ["k", "🏔️", 30, 45, 3, "none", "K2"], ["b", "⛰️", 72, 60, 2, "none", "Ben Nevis"], ["d", "📏", 50, 15, 2, "bounce", "7,266 m higher"]))),
    CHK(num("A tower is 3,200 m high. A hill is 1,150 m high. How many metres higher is the tower?", 2050, { hint: "Take the smaller from the bigger.", why: "3,200 − 1,150 = 2,050.", tag: "bignumbers.real_life" })),
    H("Stop 2: Number sequences"),
    SAY("A sequence is a list of numbers that follows a rule. Look at three thousand, three thousand five hundred, four thousand, four thousand five hundred. The rule is add five hundred each time. Once you spot the rule, you can find any number that comes next.", T("A **sequence** follows a rule. 3,000, 3,500, 4,000, 4,500 ... the rule is add 500.", "Find the rule, then keep going.")),
    EXPP("Add 500 each time",
      SS("Start at three thousand.", S("3,000", ["s1", "🔢", 15, 50, 3, "pulse", "3,000"])),
      SS("Add five hundred. That is three thousand five hundred.", S("+500 → 3,500", ["s1", "🔢", 15, 50, 2, "none", "3,000"], ["s2", "🔢", 38, 50, 3, "pulse", "3,500"])),
      SS("Add five hundred again. Four thousand. And again, four thousand five hundred.", S("+500 → 4,000 → 4,500", ["s1", "🔢", 12, 50, 2, "none", "3,000"], ["s2", "🔢", 33, 50, 2, "none", "3,500"], ["s3", "🔢", 54, 50, 2, "none", "4,000"], ["s4", "🔢", 78, 50, 3, "pulse", "4,500"]))),
    CHK(num("Find the next number: 2,000, 2,250, 2,500, 2,750, ...", 3000, { hint: "Work out how much it goes up each time.", why: "The rule is add 250, so 2,750 + 250 = 3,000.", tag: "bignumbers.sequence" })),
    SAY("Now be a number detective with a real list of heights or prices.", ACT("Number detective", ["Pencil and paper", "A book about mountains or an atlas"], ["Find three tall mountains or buildings and write their heights.", "Put them in order from tallest to shortest.", "Work out the difference between the tallest and the shortest.", "Write a sequence of your own and ask someone to find the rule."])),
    SAY("Remember. The difference is the bigger number take away the smaller. A sequence follows a rule, so find the rule first.", SUM("The difference: bigger take away smaller", "A sequence follows a rule", "Find the rule, then continue the pattern")),
    GLOSS({ difference: "How much bigger one number is than another. Found by taking away.", sequence: "A list of numbers that follows a rule.", rule: "What changes each time, like add 500.", metre: "A unit of length. A door is about 2 metres high." }),
  ],
  mini: [
    num("Karachi to Lahore is about 1,200 km by road. Lahore to Peshawar is about 500 km. How far is it in total?", 1700, { hint: "Add the two distances.", why: "1,200 + 500 = 1,700 km." }),
    num("The rule is add 100. What comes after 4,800?", 4900, { hint: "4,800 + 100.", why: "4,800 + 100 = 4,900." }),
    mc("What is the rule? 9,000, 8,000, 7,000, 6,000", "Take away 1,000", ["Add 1,000", "Take away 100"], { hint: "Is it going up or down?", why: "Each number is 1,000 less." }),
  ],
};

// Retake variants: same skill and question type as each main question.
const ALTS = [
  [mc("In the number 3,962, what does the 9 stand for?", "900", ["9", "90"], { hint: "Which place is the 9 in?", why: "The 9 is in the hundreds place, so it is worth 900.", tag: "bignumbers.value" }), mc("In the number 7,805, what does the 8 stand for?", "800", ["8", "80"], { hint: "Which place is the 8 in?", why: "The 8 is in the hundreds place, so it is worth 800.", tag: "bignumbers.value" })],
  [num("How many thousands are in 9,351?", 9, { hint: "Look at the left-hand digit.", why: "9,351 has 9 thousands.", tag: "bignumbers.thousands" }), num("How many thousands are in 4,086?", 4, { hint: "Look at the left-hand digit.", why: "4,086 has 4 thousands.", tag: "bignumbers.thousands" })],
  [tf("In 7,031 the 0 means there are no hundreds.", true, { hint: "The 0 is in the hundreds place.", why: "A 0 in the hundreds place means no hundreds.", tag: "bignumbers.zero" }), tf("In 2,908 the 0 means there are no thousands.", false, { hint: "Which place is the 0 in?", why: "The 0 is in the tens place, so there are no tens.", tag: "bignumbers.zero" })],
  [fill("Complete the number story for 6,148.", "6,148 = {b1} + 100 + 40 + 8. The 1 is worth {b2}.", [["6,000", "600", "60"], ["100", "1", "10"]], { hint: "6 is in the thousands place.", why: "6,148 is 6,000 + 100 + 40 + 8. The 1 is worth 100.", tag: "bignumbers.expanded" }), fill("Complete the number story for 8,275.", "8,275 = {b1} + 200 + 70 + 5. The 2 is worth {b2}.", [["8,000", "800", "80"], ["200", "2", "20"]], { hint: "8 is in the thousands place.", why: "8,275 is 8,000 + 200 + 70 + 5. The 2 is worth 200.", tag: "bignumbers.expanded" })],
  [ms("Which are the same as 5,308? Pick two.", ["5,000 + 300 + 8", "five thousand, three hundred and eight"], ["5,380", "5,000 + 30 + 8"], { hint: "There are no tens.", why: "5,308 = 5,000 + 300 + 8 = five thousand, three hundred and eight.", tag: "bignumbers.expanded" }), ms("Which are the same as 7,042? Pick two.", ["7,000 + 40 + 2", "seven thousand and forty-two"], ["7,420", "7,000 + 400 + 2"], { hint: "There are no hundreds.", why: "7,042 = 7,000 + 40 + 2 = seven thousand and forty-two.", tag: "bignumbers.expanded" })],
  [ord("Arrange these numbers from the smallest.", ["3,799", "3,897", "7,389", "9,837"], { hint: "Compare the thousands first.", why: "Compare thousands, then hundreds.", tag: "bignumbers.order" }), ord("Put these in order, smallest first.", ["1,567", "1,675", "5,176", "6,751"], { hint: "Compare the thousands first.", why: "Compare thousands, then hundreds.", tag: "bignumbers.order" })],
  [sld("Slide to show 3,000 on the line.", { min: 0, max: 5000, step: 100 }, 3000, 100, { hint: "Three fifths of the way along.", why: "3,000 is more than halfway along 0 to 5,000.", tag: "bignumbers.line" }), sld("Slide to show 1,000 on the line.", { min: 0, max: 5000, step: 100 }, 1000, 100, { hint: "One fifth of the way along.", why: "1,000 is one fifth of 5,000.", tag: "bignumbers.line" })],
  [num("Round 3,462 to the nearest 100.", 3500, { hint: "Look at the tens digit, 6.", why: "6 is 5 or more, so round up to 3,500.", tag: "bignumbers.round" }), num("Round 8,129 to the nearest 100.", 8100, { hint: "Look at the tens digit, 2.", why: "2 is less than 5, so round down to 8,100.", tag: "bignumbers.round" })],
  [mc("Why does 6,450 round up to 6,500 to the nearest 100?", "The tens digit is 5, which rounds up", ["The 6 is bigger than 5", "450 is closer to 400"], { hint: "Halfway numbers go up.", why: "The tens digit is 5, so it rounds up.", tag: "bignumbers.round_reason" }), mc("Why does 2,350 round up to 2,400 to the nearest 100?", "The tens digit is 5, which rounds up", ["The 2 is smaller than 5", "350 is closer to 300"], { hint: "Halfway numbers go up.", why: "The tens digit is 5, so it rounds up.", tag: "bignumbers.round_reason" })],
  [mat("Which number goes with each Roman numeral?", [["XIX", "19"], ["XL", "40"], ["XIV", "14"]], { hint: "Small before big takes away.", why: "XIX = 19, XL = 40, XIV = 14.", tag: "bignumbers.roman" }), mat("Pair up the Roman numerals and the numbers.", [["XXIV", "24"], ["LX", "60"], ["IX", "9"]], { hint: "L is 50, X is 10.", why: "XXIV = 24, LX = 60, IX = 9.", tag: "bignumbers.roman" })],
  [hot("Tap the warmest place.", [["🌡️", "Lahore 6°C", 22, 50], ["🌡️", "Murree −2°C", 50, 50], ["🌡️", "Skardu −7°C", 78, 50]], ["Lahore 6°C"], { labels: true, hint: "Above zero is warmer.", why: "6°C is above zero, so it is the warmest.", tag: "bignumbers.negative" }), hot("Tap the place with the lowest temperature.", [["🌡️", "Quetta 3°C", 22, 50], ["🌡️", "London 1°C", 50, 50], ["🌡️", "Gilgit −5°C", 78, 50]], ["Gilgit −5°C"], { labels: true, hint: "Below zero is colder.", why: "−5°C is the furthest below zero.", tag: "bignumbers.negative" })],
  [mc("Zara says −9 is bigger than −3 because 9 is bigger than 3. Is she right?", "No, −3 is closer to zero so it is bigger", ["Yes, 9 is bigger than 3", "No, they are the same"], { hint: "Think about a thermometer.", why: "−3 is warmer than −9, so −3 is bigger.", tag: "bignumbers.negative_reason" }), mc("Ali says −1 is smaller than −7 because 1 is smaller than 7. Is he right?", "No, −1 is closer to zero so it is bigger", ["Yes, 1 is smaller than 7", "No, they are the same"], { hint: "Think about a thermometer.", why: "−1 is warmer than −7, so −1 is bigger.", tag: "bignumbers.negative_reason" })],
  [num("What is 2,718 + 3,405?", 6123, { hint: "Start with the ones: 8 + 5.", why: "2,718 + 3,405 = 6,123.", tag: "bignumbers.add" }), num("What is 4,563 + 1,879?", 6442, { hint: "Start with the ones: 3 + 9.", why: "4,563 + 1,879 = 6,442.", tag: "bignumbers.add" })],
  [mc("Omar says 6,000 − 3,452 = 3,548. How can he check?", "Add 3,548 and 3,452: it should make 6,000", ["Subtract again the same way", "Add 6,000 and 3,452"], { hint: "Use the opposite operation.", why: "3,548 + 3,452 = 7,000, not 6,000, so Omar is wrong. The answer is 2,548.", tag: "bignumbers.check" }), mc("Hana says 8,000 − 2,375 = 5,625. How can she check?", "Add 5,625 and 2,375: it should make 8,000", ["Subtract again the same way", "Add 8,000 and 2,375"], { hint: "Use the opposite operation.", why: "5,625 + 2,375 = 8,000, so Hana is right.", tag: "bignumbers.check" })],
  [num("Mount Everest is 8,849 m high. K2 is 8,611 m. How many metres higher is Everest?", 238, { hint: "Take the smaller from the bigger.", why: "8,849 − 8,611 = 238 m.", tag: "bignumbers.real_life" }), num("A plane flies at 9,500 m. A mountain is 4,260 m high. How many metres between them?", 5240, { hint: "Take the smaller from the bigger.", why: "9,500 − 4,260 = 5,240 m.", tag: "bignumbers.real_life" })],
];

export const topics = [
  topicLesson({
    slug: "maths-class-4-big-numbers", subject: "maths", cls: 4, topic: 1, title: "Big Numbers",
    summary: "Place value to 10,000, rounding, adding and taking away big numbers, negative numbers, Roman numerals and sequences.",
    unit: "Topic 1: Big numbers", difficulty: 2,
    objectives: ["Read, write and order numbers to 10,000", "Round, add and take away big numbers", "Use negative numbers and Roman numerals"],
    success_criteria: ["I can say what each digit in a number to 10,000 is worth", "I can add and take away 4-digit numbers", "I can find a rule in a number sequence"],
    real_life: "Reading the height of mountains, the price of things in rupees and pounds, and the temperature on a winter day.",
    standards: [
      { framework: "nc_england", code: "Y4 place value", text: "Recognise the place value of each digit in a four-digit number; round to the nearest 10, 100 or 1,000" },
      { framework: "nc_england", code: "Y4 add and subtract", text: "Add and subtract numbers with up to four digits using columns" },
      { framework: "cambridge", code: "4Nc.01" }, { framework: "cambridge", code: "4Nc.02" }, { framework: "cambridge", code: "4Nc.03" }, { framework: "cambridge", code: "4Nc.04" },
      { framework: "cambridge", code: "4Ni.01" }, { framework: "cambridge", code: "4Ni.02" }, { framework: "cambridge", code: "4Np.01" }, { framework: "cambridge", code: "4Np.03" }, { framework: "cambridge", code: "4Np.04" }, { framework: "cambridge", code: "4Np.05" },
    ],
    warm_up: [
      mc("What is 7 × 8?", "56", ["54", "63"], { hint: "Count in sevens or eights.", why: "7 × 8 = 56." }),
      num("What is 345 + 120?", 465, { hint: "Add the hundreds and tens.", why: "345 + 120 = 465." }),
      tf("The 5 in 5,000 is worth five thousand.", true, { hint: "Which place is the 5 in?", why: "The 5 is in the thousands place." }),
    ],
    intro: [
      H("Welcome, number explorer!"),
      SAY("Welcome, number explorer! K2, the second highest mountain in the world, is in Pakistan. It is eight thousand, six hundred and eleven metres high. How do we read, write and compare numbers that big? Today you will become a big number expert. You will read numbers up to ten thousand, round them, add and take away, explore negative numbers, and spot patterns. Let's climb!", T("Today's big question: how do we read, write and compare really big numbers, like the height of K2 (8,611 m)?")),
      IMG("🏔️", "K2 in Pakistan is 8,611 metres high."),
      GLOSS({ "big numbers": "Numbers in the thousands, like 8,611." }),
    ],
    subs: [placeValue, addSub, negatives, realWorld],
    quiz: [
      { q: mc("In the number 5,418, what does the 4 stand for?", "400", ["4", "40"], { hint: "Which place is the 4 in?", why: "The 4 is in the hundreds place, so it is worth 400.", tag: "bignumbers.value" }), sub: "place_value", depth: "recall" },
      { q: num("How many thousands are in 7,135?", 7, { hint: "Look at the left-hand digit.", why: "7,135 has 7 thousands.", tag: "bignumbers.thousands" }), sub: "place_value", depth: "recall" },
      { q: tf("In 5,046 the 0 means there are no hundreds.", true, { hint: "The 0 is in the hundreds place.", why: "A 0 in the hundreds place means no hundreds.", tag: "bignumbers.zero" }), sub: "place_value", depth: "recall" },
      { q: fill("Complete the number story for 3,725.", "3,725 = {b1} + 700 + 20 + 5. The 7 is worth {b2}.", [["3,000", "300", "30"], ["700", "7", "70"]], { hint: "3 is in the thousands place.", why: "3,725 is 3,000 + 700 + 20 + 5. The 7 is worth 700.", tag: "bignumbers.expanded" }), sub: "place_value", depth: "apply" },
      { q: ms("Which are the same as 4,206? Pick two.", ["4,000 + 200 + 6", "four thousand, two hundred and six"], ["4,260", "4,000 + 20 + 6"], { hint: "There are no tens.", why: "4,206 = 4,000 + 200 + 6 = four thousand, two hundred and six.", tag: "bignumbers.expanded" }), sub: "place_value", depth: "apply" },
      { q: ord("Order these from smallest to biggest.", ["4,809", "4,908", "8,094", "9,048"], { hint: "Compare the thousands first.", why: "Compare thousands, then hundreds.", tag: "bignumbers.order" }), sub: "place_value", depth: "apply" },
      { q: sld("Slide to show 2,500 on the line.", { min: 0, max: 5000, step: 100 }, 2500, 100, { hint: "Halfway along.", why: "2,500 is exactly halfway between 0 and 5,000.", tag: "bignumbers.line" }), sub: "place_value", depth: "apply" },
      { q: num("Round 6,748 to the nearest 100.", 6700, { hint: "Look at the tens digit.", why: "4 is less than 5, so round down to 6,700.", tag: "bignumbers.round" }), sub: "place_value", depth: "apply" },
      { q: mc("Why does 4,350 round up to 4,400 to the nearest 100?", "The tens digit is 5, which rounds up", ["The 4 is bigger than 3", "350 is closer to 300"], { hint: "Halfway numbers go up.", why: "The tens digit is 5, so it rounds up.", tag: "bignumbers.round_reason" }), sub: "place_value", depth: "reason" },
      { q: mat("Match each Roman numeral to its number.", [["XIV", "14"], ["XL", "40"], ["XIX", "19"]], { hint: "Small before big takes away.", why: "XIV = 14, XL = 40, XIX = 19.", tag: "bignumbers.roman" }), sub: "negatives", depth: "apply" },
      { q: hot("Tap the coldest place.", [["🌡️", "Lahore 4°C", 22, 50], ["🌡️", "Murree −3°C", 50, 50], ["🌡️", "London 2°C", 78, 50]], ["Murree −3°C"], { labels: true, hint: "Below zero is colder.", why: "−3°C is below zero, so it is the coldest.", tag: "bignumbers.negative" }), sub: "negatives", depth: "apply" },
      { q: mc("Sara says −8 is bigger than −2 because 8 is bigger than 2. Is she right?", "No, −2 is closer to zero so it is bigger", ["Yes, 8 is bigger than 2", "No, they are the same"], { hint: "Think about a thermometer.", why: "−2 is warmer than −8, so −2 is bigger.", tag: "bignumbers.negative_reason" }), sub: "negatives", depth: "reason" },
      { q: num("What is 3,486 + 2,538?", 6024, { hint: "Start with the ones: 6 + 8.", why: "3,486 + 2,538 = 6,024.", tag: "bignumbers.add" }), sub: "add_sub", depth: "apply" },
      { q: mc("Hamza says 5,000 − 2,634 = 3,466. How can you check?", "Add 3,466 and 2,634: it should make 5,000", ["Subtract again the same way", "Add 5,000 and 2,634"], { hint: "Use the opposite operation.", why: "3,466 + 2,634 = 6,100, not 5,000, so Hamza is wrong. The answer is 2,366.", tag: "bignumbers.check" }), sub: "add_sub", depth: "reason" },
      { q: num("K2 is 8,611 m high. Ben Nevis is 1,345 m high. How many metres higher is K2?", 7266, { hint: "Take the smaller from the bigger.", why: "8,611 − 1,345 = 7,266 m.", tag: "bignumbers.real_life" }), sub: "real_world", depth: "reason" },
    ].map((x, i) => ({ ...x, alts: ALTS[i] })),
  }),
];
