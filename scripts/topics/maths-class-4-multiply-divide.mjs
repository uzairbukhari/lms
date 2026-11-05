import { SAY, SS, H, T, IMG, TIP, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, NLINE, TABLE, S, EXP, ROW, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Class 4 (Fatima) Maths topic 2: Multiplying and dividing. Standards from docs/CURRICULUM_V2.md.
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });
const EXPK = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "kitchen" });

const tables = {
  id: "tables_factors", kind: "learn", title: "Tables, factors and multiples",
  blocks: [
    H("Stop 1: Arrays and times tables"),
    SAY("A times table is just repeated adding. An array is a picture of it, with rows and columns. Look at the eggs. Three rows, with four eggs in every row. Three fours are twelve. And if we turn it round, four threes are twelve too. Multiplying in any order gives the same answer.", T("An **array** shows multiplying in rows and columns.", "3 × 4 = 12 and 4 × 3 = 12. Multiplying works in any order.")),
    EXPK("Eggs in rows",
      SS("Here is the first row of four eggs.", S("1 row of 4 eggs = 4", ...ROW("a", "🥚", 4, 30, 70, 30))),
      SS("Add a second row of four. Two rows of four make eight.", S("2 rows of 4 = 8", ...ROW("a", "🥚", 4, 30, 70, 30), ...ROW("b", "🥚", 4, 30, 70, 55))),
      SS("And a third row. Three rows of four make twelve. Three times four is twelve.", S("3 rows of 4 = 12", ...ROW("a", "🥚", 4, 30, 70, 25), ...ROW("b", "🥚", 4, 30, 70, 50), ...ROW("c", "🥚", 4, 30, 70, 75)))),
    CHK(mc("What is 7 × 6?", "42", ["36", "48"], { hint: "Count in sixes: 6, 12, 18...", why: "7 × 6 = 42, and 6 × 7 = 42 too.", tag: "muldiv.tables" })),
    H("Stop 2: Factors and multiples"),
    SAY("Two big words. A multiple is a number in a times table. The multiples of three are three, six, nine, twelve and so on. A factor is a number that divides exactly into another. We find factors in pairs. Twelve has the factor pairs one and twelve, two and six, three and four. So the factors of twelve are one, two, three, four, six and twelve.", T("**Multiples** are in the times table: 3, 6, 9, 12 ...", "**Factors** divide exactly: the factors of 12 are 1, 2, 3, 4, 6 and 12.")),
    EXPP("Factor pairs of 12",
      SS("Twelve counters in one row. One times twelve is twelve. So one and twelve are a factor pair.", S("1 × 12 = 12", ["r", "🟡", 50, 50, 1, "none", "1 row of 12"])),
      SS("Two rows of six. Two times six is twelve. Two and six are a factor pair.", S("2 × 6 = 12", ["r", "🟡", 35, 50, 2, "none", "2 rows of 6"])),
      SS("Three rows of four. Three times four is twelve. Three and four are a factor pair. That is all the pairs!", S("3 × 4 = 12", ["r", "🟡", 35, 50, 2, "none", "3 rows of 4"], ["f", "✅", 75, 50, 3, "bounce", "1, 2, 3, 4, 6, 12"]))),
    CHK(ms("Which numbers are factors of 10? Pick two.", ["2", "5"], ["3", "4"], { hint: "Which numbers divide into 10 exactly?", why: "2 × 5 = 10, so 2 and 5 are factors of 10.", tag: "muldiv.factors" })),
    H("Stop 3: Divisibility tricks"),
    SAY("Here are some speedy tricks to see if a number divides exactly. A number is divisible by two if it ends in an even digit. By five if it ends in five or zero. By ten if it ends in zero. And by three if its digits add up to a number in the three times table. Take one hundred and forty-seven. One plus four plus seven is twelve. Twelve is in the three times table, so one hundred and forty-seven is divisible by three.", T("Divisible by 2: ends in an even digit. By 5: ends in 0 or 5. By 10: ends in 0.", "By 3: the digits add to a number in the 3 times table.")),
    TABLE("Digit sums", [["123: 1+2+3", 6], ["147: 1+4+7", 12], ["250: 2+5+0", 7]], "123 and 147 have digit sums in the 3 times table. 250 does not."),
    CHK(tf("225 is divisible by 5.", true, { hint: "Look at the last digit.", why: "225 ends in 5, so it is divisible by 5.", tag: "muldiv.divisible" })),
    SAY("Remember. Multiples are in the times table. Factors divide exactly. Use the tricks to check quickly.", SUM("A multiple is in a times table", "A factor divides exactly, and factors come in pairs", "Use divisibility tricks for 2, 3, 5 and 10")),
    GLOSS({ array: "Objects in rows and columns to show multiplying.", multiples: "Numbers in a times table, like 3, 6, 9.", factors: "Numbers that divide exactly into another number.", divisible: "Can be divided exactly with nothing left over." }),
  ],
  mini: [
    num("What is 9 × 8?", 72, { hint: "9 × 8 is 10 × 8 take away 8.", why: "9 × 8 = 72." }),
    mc("Which is a multiple of 4?", "28", ["26", "30"], { hint: "Count in fours.", why: "4 × 7 = 28." }),
    tf("5 is a factor of 35.", true, { hint: "5 × 7 = ?", why: "5 × 7 = 35." }),
    mc("Which number is divisible by 3?", "126", ["124", "128"], { hint: "Add the digits.", why: "1 + 2 + 6 = 9, which is in the 3 times table." }),
  ],
};

const multiply = {
  id: "multiply", kind: "try", title: "Grid and column multiplying",
  blocks: [
    H("Stop 1: The grid method"),
    SAY("How would you work out thirty-six times seven? Break thirty-six into thirty and six. Draw a grid. Thirty times seven is two hundred and ten. Six times seven is forty-two. Now add the two parts: two hundred and ten plus forty-two is two hundred and fifty-two.", T("The **grid method** splits a number into tens and ones. 36 × 7 = (30 × 7) + (6 × 7).")),
    EXPP("36 × 7 with a grid",
      SS("Split thirty-six into thirty and six.", S("36 = 30 + 6", ["a", "🔢", 50, 35, 3, "pulse", "36 × 7"])),
      SS("Thirty times seven is two hundred and ten.", S("30 × 7 = 210", ["a", "🔢", 50, 20, 2, "none", "36 × 7"], ["b", "🟦", 30, 65, 3, "pulse", "30 × 7 = 210"])),
      SS("Six times seven is forty-two.", S("6 × 7 = 42", ["a", "🔢", 50, 20, 2, "none", "36 × 7"], ["b", "🟦", 30, 65, 2, "none", "210"], ["c", "🟩", 70, 65, 3, "pulse", "6 × 7 = 42"])),
      SS("Add the parts. Two hundred and ten plus forty-two is two hundred and fifty-two.", S("210 + 42 = 252", ["a", "🔢", 50, 20, 2, "none", "36 × 7"], ["b", "🟦", 30, 65, 2, "none", "210"], ["c", "🟩", 70, 65, 2, "none", "42"], ["d", "🎉", 50, 45, 3, "bounce", "252"]))),
    CHK(num("Use a grid to work out 24 × 5.", 120, { hint: "20 × 5 and 4 × 5.", why: "20 × 5 = 100 and 4 × 5 = 20, so 100 + 20 = 120.", tag: "muldiv.grid" })),
    SAY("Now make it yourself. Here are twenty-four stars. Share them equally into the boxes to show equal groups. Try to make three groups of eight, then four groups of six.", MAN("Equal groups of stars", "Share the 24 stars equally into the groups. How many in each group?", "⭐", 20, ["Group A", "Group B", "Group C", "Group D"])),
    H("Stop 2: Column multiplication"),
    SAY("The column method does the same job in a neat way. Write two hundred and thirty-four, and multiply by three. Three fours are twelve. Write two and carry one. Three threes are nine, and the carried one makes ten. Write zero and carry one. Three twos are six and the carried one makes seven. The answer is seven hundred and two.", T("In the **column method** you multiply each digit, starting with the ones, and **carry** when needed.", "234 × 3 = 702.")),
    IMG("🧮", "Multiply the ones, then the tens, then the hundreds, carrying as you go."),
    CHK(num("What is 123 × 4?", 492, { hint: "3 × 4 = 12. Carry the 1.", why: "123 × 4 = 492.", tag: "muldiv.column" })),
    SAY("A real-life job for your hands now.", ACT("Rows and columns at home", ["20 buttons, coins or dried pasta", "A tray or table"], ["Make an array of 4 rows with 6 in each row. How many altogether?", "Turn the tray round. What do you notice?", "Make an array for 5 × 7.", "Write the multiplication that goes with each array."])),
    SAY("Remember. Split the number to use a grid, or use the column method and carry. Both give the same answer.", SUM("Grid method: split into tens and ones, then add", "Column method: ones first, carry when needed", "Both methods give the same answer")),
    GLOSS({ "grid method": "A way to multiply by splitting a number into parts.", "column method": "Multiplying digit by digit in columns, carrying when needed.", carry: "Move a ten into the next column.", array: "Objects in rows and columns.", equal: "The same size or amount." }),
  ],
  mini: [
    num("What is 30 × 4?", 120, { hint: "3 × 4 = 12, then times 10.", why: "30 × 4 = 120." }),
    num("What is 13 × 6?", 78, { hint: "10 × 6 and 3 × 6.", why: "60 + 18 = 78." }),
    mc("Which two parts could you use for 42 × 3?", "40 × 3 and 2 × 3", ["4 × 3 and 2 × 3", "40 × 30 and 2 × 3"], { hint: "Split 42 into tens and ones.", why: "42 = 40 + 2." }),
    num("What is 212 × 3?", 636, { hint: "Multiply each digit by 3.", why: "212 × 3 = 636." }),
  ],
};

const divide = {
  id: "division", kind: "play", title: "Sharing, grouping and remainders",
  blocks: [
    H("Stop 1: Dividing by sharing"),
    SAY("Division means sharing equally, or putting into equal groups. Let's share ninety-six marbles between four friends. Break ninety-six into eighty and sixteen. Eighty shared four ways is twenty each. Sixteen shared four ways is four each. So each friend gets twenty plus four, which is twenty-four.", T("**Divide** means to share equally. 96 ÷ 4 = 80 ÷ 4 + 16 ÷ 4 = 20 + 4 = 24.")),
    EXPP("Share 96 marbles between 4",
      SS("Split ninety-six into eighty and sixteen. They are easier to share.", S("96 = 80 + 16", ["m", "🔵", 50, 50, 3, "pulse", "96 marbles"])),
      SS("Eighty shared between four is twenty each.", S("80 ÷ 4 = 20", ["a", "🔵", 50, 30, 3, "none", "80 ÷ 4 = 20"])),
      SS("Sixteen shared between four is four each.", S("16 ÷ 4 = 4", ["a", "🔵", 30, 50, 2, "none", "20"], ["b", "🔵", 70, 50, 3, "pulse", "16 ÷ 4 = 4"])),
      SS("Add them up. Twenty and four makes twenty-four each.", S("20 + 4 = 24", ["r", "🎉", 50, 50, 3, "bounce", "24 each"]))),
    CHK(num("What is 84 ÷ 4?", 21, { hint: "80 ÷ 4 and 4 ÷ 4.", why: "80 ÷ 4 = 20 and 4 ÷ 4 = 1, so 21.", tag: "muldiv.divide" })),
    H("Stop 2: Remainders"),
    SAY("Sometimes things do not share out exactly. Seventeen sweets shared between five friends. Each friend gets three, because five threes are fifteen. Two sweets are left over. We call what is left over the remainder. We write it three remainder two.", T("A **remainder** is what is left over. 17 ÷ 5 = 3 remainder 2.")),
    EXPK("17 sweets for 5 friends",
      SS("Here are seventeen sweets.", S("17 sweets", ["s", "🍬", 50, 50, 3, "pulse", "17 sweets"])),
      SS("Give each of the five friends three sweets. That uses fifteen.", S("5 groups of 3 = 15", ["g", "👧", 50, 40, 3, "none", "5 friends get 3 each"])),
      SS("Two sweets are left over. That is the remainder.", S("17 ÷ 5 = 3 remainder 2", ["g", "👧", 35, 50, 3, "none", "3 each"], ["l", "🍬", 75, 50, 3, "pulse", "2 left over"]))),
    CHK(mc("What is 23 ÷ 5?", "4 remainder 3", ["4 remainder 2", "5 remainder 1"], { hint: "How many fives fit in 23?", why: "5 × 4 = 20 and 23 − 20 = 3.", tag: "muldiv.remainder" })),
    H("Stop 3: Brain break"),
    SAY("Take a brain break. Find the pairs that match.", BRAIN("memory_match", "Match the pairs", "Find the matching cards.", ["🥚", "🍬", "🔵", "⭐", "🟦", "🟩"])),
    CHK(num("12 pencils are put into packs of 5. How many full packs?", 2, { hint: "How many fives fit in 12?", why: "5 × 2 = 10, with 2 left over. So 2 full packs.", tag: "muldiv.remainder" })),
    SAY("Remember. Division is sharing equally. Split the number into easy parts. A remainder is what is left over.", SUM("Divide means share equally", "Split a number into easy parts", "The remainder is what is left over")),
    GLOSS({ divide: "To share equally into groups.", remainder: "What is left over after dividing.", groups: "Equal sets of things.", share: "Divide into equal parts." }),
  ],
  mini: [
    num("What is 48 ÷ 6?", 8, { hint: "6 × ? = 48", why: "6 × 8 = 48." }),
    mc("What is 19 ÷ 4?", "4 remainder 3", ["4 remainder 1", "5 remainder 1"], { hint: "4 × 4 = 16.", why: "19 − 16 = 3." }),
    tf("There is no remainder when 20 is divided by 5.", true, { hint: "5 × 4 = 20.", why: "20 divides exactly by 5." }),
  ],
};

const useIt = {
  id: "real_world", kind: "use", title: "Problems at the Eid party",
  blocks: [
    H("Stop 1: Planning gift bags"),
    SAY("It is nearly Eid and Aisha is making gift bags. Each bag holds twelve dates. She makes seven bags. How many dates does she need? Seven times twelve. Seven tens are seventy, and seven twos are fourteen. Seventy plus fourteen is eighty-four dates.", T("7 bags with 12 dates in each. 7 × 12 = 70 + 14 = 84.", "Always think: is this multiplying or dividing?")),
    IMG("🎁", "7 gift bags with 12 dates in each."),
    CHK(num("Aisha buys 8 packs of cards. Each pack has 125 cards. How many cards is that?", 1000, { hint: "8 × 100 and 8 × 25.", why: "800 + 200 = 1,000.", tag: "muldiv.real_life" })),
    H("Stop 2: Does it fit?"),
    SAY("Sometimes the remainder matters. Fifty-three people need a ride to the party. Each minibus seats eight. Fifty-three divided by eight is six remainder five. Six minibuses are not enough, because five people would be left behind. We need seven minibuses. So we round up.", T("Sometimes you must **round up** the answer. 53 people ÷ 8 seats = 6 remainder 5, so you need 7 minibuses.")),
    EXPP("53 people, 8 seats each",
      SS("Each minibus takes eight people.", S("8 seats", ["m", "🚐", 50, 50, 3, "none", "8 seats each"])),
      SS("Six minibuses take forty-eight people. But five people are left behind!", S("6 × 8 = 48. 5 people left", ["m", "🚐", 25, 50, 3, "none", "6 full minibuses"], ["l", "🧍", 75, 50, 3, "pulse", "5 left"])),
      SS("So we need one more minibus. Seven minibuses.", S("7 minibuses", ["m", "🚐", 25, 50, 3, "none", "6"], ["n", "🚐", 75, 50, 3, "bounce", "+1 = 7"]))),
    CHK(num("Cars seat 5 people. How many cars are needed for 32 people?", 7, { hint: "32 ÷ 5 has a remainder.", why: "32 ÷ 5 = 6 remainder 2, so we need 7 cars.", tag: "muldiv.remainder_context" })),
    SAY("Now plan your own party problem.", ACT("Party planner", ["Pencil and paper"], ["Choose a party for 30 people.", "Work out how many tables of 4 are needed. Is there a remainder?", "Work out the cost if one drink costs Rs 25 and you need 30 drinks.", "Write one multiplying and one dividing problem for someone else."])),
    SAY("Remember. Think about what the problem asks. Multiply for equal groups, divide to share, and round up when a remainder still needs a place.", SUM("Multiply for equal groups", "Divide to share", "Sometimes round up the remainder")),
    GLOSS({ "round up": "Go to the next whole number because a remainder still needs a place.", equal: "The same size or amount.", total: "All of them added together.", cost: "How much you pay." }),
  ],
  mini: [
    num("Tea cups cost Rs 45. Ahmed buys 6. What is the total cost in rupees?", 270, { hint: "6 × 45 = 6 × 40 + 6 × 5.", why: "240 + 30 = 270." }),
    num("There are 60 chairs in rows of 12. How many rows?", 5, { hint: "12 × ? = 60", why: "12 × 5 = 60." }),
    mc("Egg boxes hold 6. How many boxes for 20 eggs?", "4", ["3", "5"], { hint: "20 ÷ 6 has a remainder.", why: "3 boxes hold 18; 2 eggs are left, so 4 boxes." }),
  ],
};

const ALTS = [
  [mc("What is 9 × 6?", "54", ["45", "63"], { hint: "Count in nines.", why: "9 × 6 = 54.", tag: "muldiv.tables" }), mc("What is 12 × 7?", "84", ["72", "96"], { hint: "10 × 7 and 2 × 7.", why: "12 × 7 = 70 + 14 = 84.", tag: "muldiv.tables" })],
  [num("What is 56 ÷ 7?", 8, { hint: "7 × ? = 56", why: "7 × 8 = 56.", tag: "muldiv.divide_facts" }), num("What is 108 ÷ 12?", 9, { hint: "12 × ? = 108", why: "12 × 9 = 108.", tag: "muldiv.divide_facts" })],
  [tf("48 is a multiple of 9.", false, { hint: "Count in nines: 45, 54...", why: "48 is not in the 9 times table.", tag: "muldiv.multiples" }), tf("63 is a multiple of 7.", true, { hint: "7 × 9 = ?", why: "7 × 9 = 63.", tag: "muldiv.multiples" })],
  [fill("Finish the sentence about 35.", "35 ÷ 7 = {b1}, so 35 is a {b2} of 7.", [["5", "28", "42"], ["multiple", "factor", "remainder"]], { hint: "7 × 5 = 35.", why: "35 ÷ 7 = 5, and 35 is in the 7 times table, so it is a multiple of 7.", tag: "muldiv.fact_language" }), fill("Complete the facts about 9 × 8.", "9 × 8 = {b1}, so 9 is a {b2} of 72.", [["72", "17", "98"], ["factor", "multiple", "remainder"]], { hint: "9 × 8 = 72.", why: "9 × 8 = 72 so 9 divides into 72 exactly: it is a factor of 72.", tag: "muldiv.fact_language" })],
  [ms("Which numbers are factors of 30? Pick two.", ["5", "6"], ["4", "7"], { hint: "Which numbers divide into 30 exactly?", why: "5 × 6 = 30.", tag: "muldiv.factors" }), ms("Which numbers are factors of 36? Pick two.", ["4", "9"], ["5", "8"], { hint: "Which numbers divide into 36 exactly?", why: "4 × 9 = 36.", tag: "muldiv.factors" })],
  [ord("Arrange these from the smallest answer.", ["3 × 11", "4 × 9", "5 × 8", "7 × 6"], { hint: "Work out each answer.", why: "33, 36, 40 and 42.", tag: "muldiv.order" }), ord("Sort these by their answers, smallest first.", ["2 × 12", "3 × 9", "4 × 8", "5 × 7"], { hint: "Work out each answer.", why: "24, 27, 32 and 35.", tag: "muldiv.order" })],
  [sld("Slide to the answer of 7 × 8.", { min: 0, max: 100 }, 56, 0, { hint: "Count in sevens.", why: "7 × 8 = 56.", tag: "muldiv.tables" }), sld("Slide to show 12 × 5.", { min: 0, max: 100 }, 60, 0, { hint: "10 × 5 and 2 × 5.", why: "12 × 5 = 60.", tag: "muldiv.tables" })],
  [num("What is 52 × 4?", 208, { hint: "50 × 4 and 2 × 4.", why: "200 + 8 = 208.", tag: "muldiv.grid" }), num("What is 27 × 5?", 135, { hint: "20 × 5 and 7 × 5.", why: "100 + 35 = 135.", tag: "muldiv.grid" })],
  [mc("Dan says 256 is divisible by 3. How can he check?", "Add the digits: 2 + 5 + 6 = 13, which is not in the 3 times table", ["It ends in 6, so it is divisible by 3", "256 is even so it is divisible by 3"], { hint: "Use the digit sum trick.", why: "13 is not in the 3 times table, so 256 is not divisible by 3.", tag: "muldiv.divisible_reason" }), mc("Lina says 4,125 is divisible by 5. How can she check?", "Look at the last digit: it is 5", ["It is odd so it cannot be", "Add the digits to get 12"], { hint: "Check the last digit.", why: "Numbers ending in 5 or 0 are divisible by 5.", tag: "muldiv.divisible_reason" })],
  [mat("Which remainder answer goes with each division?", [["19 ÷ 6", "3 r 1"], ["22 ÷ 5", "4 r 2"], ["31 ÷ 8", "3 r 7"]], { hint: "Find the nearest multiple below.", why: "19 = 3 × 6 + 1, 22 = 4 × 5 + 2, 31 = 3 × 8 + 7.", tag: "muldiv.remainder" }), mat("Pair each division with its remainder answer.", [["26 ÷ 4", "6 r 2"], ["19 ÷ 3", "6 r 1"], ["40 ÷ 9", "4 r 4"]], { hint: "Find the nearest multiple below.", why: "26 = 6 × 4 + 2, 19 = 6 × 3 + 1, 40 = 4 × 9 + 4.", tag: "muldiv.remainder" })],
  [hot("Tap the tray that holds 36 cupcakes.", [["🧁", "Tray A: 5 rows of 6", 22, 50], ["🧁", "Tray B: 4 rows of 9", 50, 50], ["🧁", "Tray C: 6 rows of 7", 78, 50]], ["Tray B: 4 rows of 9"], { labels: true, hint: "Work out each tray.", why: "4 × 9 = 36.", tag: "muldiv.arrays" }), hot("Tap the garden bed that has 28 plants.", [["🌱", "Bed A: 3 rows of 9", 22, 50], ["🌱", "Bed B: 4 rows of 7", 50, 50], ["🌱", "Bed C: 5 rows of 6", 78, 50]], ["Bed B: 4 rows of 7"], { labels: true, hint: "Work out each bed.", why: "4 × 7 = 28.", tag: "muldiv.arrays" })],
  [mc("41 stickers are shared between 5 children. Ben says each gets 9. Is he right?", "No, 9 each needs 45 stickers, so each gets 8 with 1 left", ["Yes, each gets 9", "No, each gets 7"], { hint: "Check 5 × 9.", why: "5 × 9 = 45 is more than 41. 5 × 8 = 40 with 1 left.", tag: "muldiv.remainder_reason" }), mc("50 pencils are put into boxes of 6. Mia says she fills 9 boxes. Is she right?", "No, 9 boxes need 54 pencils, so she fills 8 boxes", ["Yes, she fills 9 boxes", "No, she fills 7 boxes"], { hint: "Check 6 × 9.", why: "6 × 9 = 54 is more than 50. 6 × 8 = 48 with 2 left.", tag: "muldiv.remainder_reason" })],
  [num("What is 84 ÷ 7?", 12, { hint: "7 × 10 = 70, then 14 more.", why: "70 ÷ 7 = 10 and 14 ÷ 7 = 2, so 12.", tag: "muldiv.divide" }), num("What is 135 ÷ 5?", 27, { hint: "100 ÷ 5 and 35 ÷ 5.", why: "20 + 7 = 27.", tag: "muldiv.divide" })],
  [mc("Sana says every number in the 5 times table ends in 5. Is she right?", "No, they end in 5 or 0", ["Yes, always 5", "No, they end in 0 only"], { hint: "List 5, 10, 15, 20.", why: "Multiples of 5 end in 5 or 0.", tag: "muldiv.pattern_reason" }), mc("Zain says every number in the 9 times table is odd. Is he right?", "No, 9 × 2 = 18 is even", ["Yes, 9 is odd so all are odd", "No, they are all even"], { hint: "List 9, 18, 27.", why: "They alternate odd, even, odd, even.", tag: "muldiv.pattern_reason" })],
  [num("Egg boxes hold 6. How many boxes are needed for 40 eggs?", 7, { hint: "6 × 6 = 36, with eggs left.", why: "40 ÷ 6 = 6 remainder 4, so 7 boxes.", tag: "muldiv.remainder_context" }), num("Rickshaws carry 3 people. How many are needed for 22 people?", 8, { hint: "22 ÷ 3 has a remainder.", why: "22 ÷ 3 = 7 remainder 1, so 8 rickshaws.", tag: "muldiv.remainder_context" })],
];

export const topics = [
  topicLesson({
    slug: "maths-class-4-multiply-divide", subject: "maths", cls: 4, topic: 2, title: "Multiplying and Dividing",
    summary: "Times tables to 12 × 12, factors and multiples, divisibility tricks, grid and column multiplying, sharing and remainders.",
    unit: "Topic 2: Multiplying and dividing", difficulty: 2,
    objectives: ["Know my times tables to 12 × 12", "Multiply and divide bigger numbers", "Understand remainders"],
    success_criteria: ["I can use factors, multiples and divisibility tricks", "I can multiply a 2- or 3-digit number by a 1-digit number", "I can divide and say what the remainder means"],
    real_life: "Sharing sweets at Eid, working out the cost of lots of the same thing, and planning how many cars or buses you need.",
    standards: [
      { framework: "nc_england", code: "Y4 mult/div", text: "Recall multiplication and division facts to 12 × 12; multiply 2- and 3-digit numbers by one digit" },
      { framework: "pk_ncc", code: "M-04-A-16" }, { framework: "pk_ncc", code: "M-04-A-17" },
      { framework: "cambridge", code: "4Nc.02" }, { framework: "cambridge", code: "4Nc.05" }, { framework: "cambridge", code: "4Ni.03" }, { framework: "cambridge", code: "4Ni.04" }, { framework: "cambridge", code: "4Ni.05" }, { framework: "cambridge", code: "4Ni.06" }, { framework: "cambridge", code: "4Ni.07" }, { framework: "cambridge", code: "4Ni.08" }, { framework: "cambridge", code: "4Np.02" },
    ],
    warm_up: [
      num("What is 3,000 + 400?", 3400, { hint: "Add the thousands and the hundreds.", why: "3,000 + 400 = 3,400." }),
      mc("Round 3,462 to the nearest 100.", "3,500", ["3,400", "3,000"], { hint: "Look at the tens digit.", why: "6 rounds up, so 3,500." }),
      tf("−5 is smaller than −1.", true, { hint: "Think of a thermometer.", why: "−5 is further below zero." }),
    ],
    intro: [
      H("Welcome back, number explorer!"),
      SAY("Welcome back, number explorer! Imagine your family is planning a big Eid party. How many dates do you need for seven gift bags? How many cars for thirty-two guests? Multiplying and dividing help us answer questions like these quickly. Today you will use times tables, factors, grids and sharing to solve them. Let's go!", T("Today's big question: how can multiplying and dividing help us plan a party?")),
      IMG("🎁", "Gift bags, tables and cars: all solved by multiplying and dividing."),
      GLOSS({ "multiplying and dividing": "Multiplying finds equal groups; dividing shares equally." }),
    ],
    subs: [tables, multiply, divide, useIt],
    quiz: [
      { q: mc("What is 8 × 7?", "56", ["54", "63"], { hint: "Count in sevens.", why: "8 × 7 = 56.", tag: "muldiv.tables" }), sub: "tables_factors", depth: "recall" },
      { q: num("What is 72 ÷ 9?", 8, { hint: "9 × ? = 72", why: "9 × 8 = 72.", tag: "muldiv.divide_facts" }), sub: "tables_factors", depth: "recall" },
      { q: tf("36 is a multiple of 9.", true, { hint: "Count in nines.", why: "9 × 4 = 36.", tag: "muldiv.multiples" }), sub: "tables_factors", depth: "recall" },
      { q: fill("Complete the facts.", "24 ÷ 6 = {b1}, so 6 is a {b2} of 24.", [["4", "18", "30"], ["factor", "multiple", "remainder"]], { hint: "6 × 4 = 24.", why: "24 ÷ 6 = 4, so 6 divides exactly into 24: it is a factor.", tag: "muldiv.fact_language" }), sub: "tables_factors", depth: "apply" },
      { q: ms("Which numbers are factors of 24? Pick two.", ["6", "8"], ["5", "7"], { hint: "Which numbers divide into 24 exactly?", why: "6 × 4 = 24 and 8 × 3 = 24.", tag: "muldiv.factors" }), sub: "tables_factors", depth: "apply" },
      { q: ord("Put these in order, smallest answer first.", ["6 × 7", "9 × 5", "8 × 6", "7 × 7"], { hint: "Work out each answer.", why: "42, 45, 48 and 49.", tag: "muldiv.order" }), sub: "tables_factors", depth: "apply" },
      { q: sld("Slide to show the answer to 6 × 9.", { min: 0, max: 100 }, 54, 0, { hint: "Count in nines.", why: "6 × 9 = 54.", tag: "muldiv.tables" }), sub: "tables_factors", depth: "apply" },
      { q: num("What is 43 × 6?", 258, { hint: "40 × 6 and 3 × 6.", why: "240 + 18 = 258.", tag: "muldiv.grid" }), sub: "multiply", depth: "apply" },
      { q: mc("Amna says 147 is divisible by 3. How can she check?", "Add the digits: 1 + 4 + 7 = 12, which is in the 3 times table", ["It ends in 7, so it is divisible by 3", "147 is odd so it is divisible by 3"], { hint: "Use the digit sum trick.", why: "12 is in the 3 times table, so 147 is divisible by 3.", tag: "muldiv.divisible_reason" }), sub: "tables_factors", depth: "reason" },
      { q: mat("Match each division to its answer with remainder.", [["17 ÷ 5", "3 r 2"], ["25 ÷ 4", "6 r 1"], ["30 ÷ 7", "4 r 2"]], { hint: "Find the nearest multiple below.", why: "17 = 3 × 5 + 2, 25 = 6 × 4 + 1, 30 = 4 × 7 + 2.", tag: "muldiv.remainder" }), sub: "division", depth: "apply" },
      { q: hot("Tap the box that holds 24 eggs.", [["🥚", "Box A: 4 rows of 5", 22, 50], ["🥚", "Box B: 3 rows of 8", 50, 50], ["🥚", "Box C: 5 rows of 6", 78, 50]], ["Box B: 3 rows of 8"], { labels: true, hint: "Work out each box.", why: "3 × 8 = 24.", tag: "muldiv.arrays" }), sub: "multiply", depth: "apply" },
      { q: mc("29 sweets are shared between 6 children. Hamza says each gets 5. Is he right?", "No, 5 each needs 30 sweets, so each gets 4 with 5 left", ["Yes, each gets 5", "No, each gets 3"], { hint: "Check 6 × 5.", why: "6 × 5 = 30 is more than 29. 6 × 4 = 24 with 5 left.", tag: "muldiv.remainder_reason" }), sub: "division", depth: "reason" },
      { q: num("What is 96 ÷ 4?", 24, { hint: "80 ÷ 4 and 16 ÷ 4.", why: "20 + 4 = 24.", tag: "muldiv.divide" }), sub: "division", depth: "apply" },
      { q: mc("Ali says every number in the 6 times table is even. Is he right?", "Yes, 6 is even, so adding 6 always gives an even number", ["No, some are odd", "Only the first few are even"], { hint: "List 6, 12, 18, 24.", why: "Even plus even is always even.", tag: "muldiv.pattern_reason" }), sub: "tables_factors", depth: "reason" },
      { q: num("Minibuses seat 8. How many minibuses are needed for 53 people?", 7, { hint: "53 ÷ 8 has a remainder.", why: "53 ÷ 8 = 6 remainder 5, so 7 minibuses.", tag: "muldiv.remainder_context" }), sub: "real_world", depth: "reason" },
    ].map((x, i) => ({ ...x, alts: ALTS[i] })),
  }),
];
