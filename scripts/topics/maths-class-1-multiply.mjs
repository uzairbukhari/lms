import { SAY, SS, H, T, IMG, TIP, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, NLINE, S, EXP, ROW, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Class 1 Maths topic 5: multiplying and sharing (format 3.0). Standards from docs/CURRICULUM_V2.md.
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });
// A grid of items: `rows` rows of `cols`, ids prefix-r-c. Evenly spaced in the middle of the stage.
const GRID = (prefix, emoji, rows, cols, size = 2) => {
  const out = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) out.push([`${prefix}${r}${c}`, emoji, 50 + (c - (cols - 1) / 2) * 13, 40 + (r - (rows - 1) / 2) * 24, size]);
  return out;
};

const groups = {
  id: "groups", kind: "learn", title: "Equal groups and arrays",
  blocks: [
    H("Stop 1: Equal groups"),
    SAY("Multiplying is a quick way to add the same number again and again. Look at three plates, with two cakes on each. Two and two and two is six. We can write that as three groups of two. That is three times two, and the answer is six. Equal groups means every group has the same number.", T("**Multiplying** is adding **equal groups**.", "3 groups of 2 is 2 + 2 + 2 = 6. We write 3 x 2 = 6.")),
    EXPP("3 groups of 2",
      SS("Here is the first plate with two cakes.", S("1 group of 2.", ["a1", "🧁", 18, 36, 2], ["a2", "🧁", 26, 36, 2])),
      SS("A second plate, with two more cakes. Two and two make four.", S("2 groups of 2 is 4.", ["a1", "🧁", 18, 36, 2], ["a2", "🧁", 26, 36, 2], ["b1", "🧁", 46, 36, 2], ["b2", "🧁", 54, 36, 2])),
      SS("And a third plate. Two, four, six. Three groups of two make six. Three times two is six!", S("3 groups of 2 is 6. 3 x 2 = 6.", ["a1", "🧁", 18, 36, 2], ["a2", "🧁", 26, 36, 2], ["b1", "🧁", 46, 36, 2], ["b2", "🧁", 54, 36, 2], ["c1", "🧁", 74, 36, 2], ["c2", "🧁", 82, 36, 2], ["s", "✅", 50, 86, 2, "bounce", "3 x 2 = 6"]))),
    CHK(num("What is 4 groups of 2?", 8, { hint: "2 + 2 + 2 + 2.", why: "4 groups of 2 is 8.", tag: "multiply.groups" })),
    H("Stop 2: Arrays"),
    SAY("An array is a neat grid of rows and columns. Here are two rows of five stars. Each row has five. Two rows of five make ten. We can also read it the other way, five columns of two. Two times five and five times two are both ten. You can multiply in any order and the answer stays the same.", T("An **array** is a grid of equal rows and columns.", "2 rows of 5 is 10. 2 x 5 = 5 x 2 = 10.")),
    EXPP("2 rows of 5",
      SS("Here is one row of five stars.", S("1 row of 5.", ...GRID("s", "⭐", 1, 5))),
      SS("Add a second row of five. Two rows of five make ten stars.", S("2 rows of 5 is 10.", ...GRID("s", "⭐", 2, 5), ["t", "✅", 50, 88, 2, "bounce", "2 x 5 = 10"]))),
    CHK(mc("A grid has 3 rows of 4. How many in all?", "12", ["7", "10"], { hint: "4 + 4 + 4.", why: "3 rows of 4 is 12.", tag: "multiply.arrays" })),
    SAY("Remember. Multiplying is adding equal groups. An array shows the groups in rows and columns. The order does not change the answer.", SUM("Multiplying is adding equal groups", "An array shows groups in rows and columns", "The order does not change the answer")),
    GLOSS({ multiply: "Add the same number many times.", "equal groups": "Groups that all have the same number.", array: "A grid of rows and columns.", row: "A line going across.", column: "A line going down." }),
  ],
  mini: [
    num("What is 2 + 2 + 2 + 2 + 2?", 10, { hint: "5 groups of 2.", why: "5 groups of 2 is 10." }),
    num("What is 3 groups of 5?", 15, { hint: "5 + 5 + 5.", why: "3 groups of 5 is 15." }),
    tf("2 x 5 and 5 x 2 have the same answer.", true, { hint: "Think of rows and columns.", why: "Both are 10." }),
    mc("An array has 2 rows of 3. How many in all?", "6", ["5", "8"], { hint: "3 + 3.", why: "2 rows of 3 is 6." }),
  ],
};

const tables = {
  id: "tables", kind: "try", title: "The 2, 5 and 10 times tables",
  blocks: [
    H("Stop 1: Counting in twos, fives and tens"),
    SAY("A times table is counting in equal jumps. The two times table is two, four, six, eight, ten. The five times table is five, ten, fifteen, twenty. The ten times table is ten, twenty, thirty, forty. Look at the last digit. In the five times table it is always five or zero. In the ten times table it is always zero. Spotting patterns makes tables easy.", T("Count in **twos**: 2, 4, 6, 8, 10. Count in **fives**: 5, 10, 15, 20. Count in **tens**: 10, 20, 30, 40.", "5s end in 5 or 0. 10s end in 0.")),
    NLINE("Counting in fives", 0, 50, [0, 10, 20, 30, 40, 50], "Jumps of 5: 5, 10, 15, 20 and on to 50.", 5),
    EXPP("Count in 5s on the number line",
      SS("Start at zero.", S("Start at 0.", ["f", { kind: "number_line", from: 0, to: 50, value: 0 }, 50, 46, 3])),
      SS("Five. Ten. Fifteen. Twenty. Every hop is five.", S("0, 5, 10, 15, 20.", ["f", { kind: "number_line", from: 0, to: 50, value: 20 }, 50, 46, 3, "pulse"]))),
    CHK(num("Count in fives: 5, 10, 15, ... What comes next?", 20, { hint: "Add 5.", why: "15 + 5 = 20.", tag: "multiply.tables" })),
    H("Stop 2: Make the groups"),
    SAY("Now make the groups yourself. Take twenty apples. Put them in groups of five, or groups of two. How many groups can you make? Try with real things at home too, like pasta or beads.", T("Make groups of 2, 5 or 10 and count how many groups you get.")),
    MAN("Make groups of 5", "You have 20 apples. Put them into groups of 5. How many groups did you make?", "🍎", 20, ["Group 1", "Group 2"]),
    ACT("Groups at home", ["20 small things (beads, buttons or pasta)", "Cups or bowls"], ["Put the things into groups of 2. How many groups?", "Now make groups of 5. How many groups?", "Now make groups of 10. How many groups?", "What did you notice?"]),
    CHK(mc("How many fives make 30?", "6", ["5", "7"], { hint: "Count in fives to 30.", why: "5, 10, 15, 20, 25, 30. That is 6 jumps.", tag: "multiply.tables" })),
    SAY("Remember. Tables are counting in equal jumps. Twos go up by two, fives by five and tens by ten. Look for the pattern.", SUM("Tables are counting in equal jumps", "Look for the pattern in the last digit")),
    GLOSS({ "times table": "A list of equal jumps, like 2, 4, 6, 8.", fives: "Counting by 5.", tens: "Counting by 10.", pattern: "Something that repeats in a regular way.", jump: "One step along a number line.", twos: "Counting by 2." }),
  ],
  mini: [
    num("Count in twos: 2, 4, 6, ... What comes next?", 8, { hint: "Add 2.", why: "6 + 2 = 8." }),
    num("What is 3 x 10?", 30, { hint: "3 tens.", why: "3 x 10 = 30." }),
    mc("Numbers in the 5 times table end in...", "5 or 0", ["1 or 6", "2 or 8"], { hint: "5, 10, 15, 20.", why: "5s always end in 5 or 0." }),
    tf("6 is in the 5 times table.", false, { hint: "Count in fives.", why: "5, 10, 15. 6 is not there." }),
  ],
};

const sharing = {
  id: "sharing", kind: "play", title: "Sharing and grouping",
  blocks: [
    H("Stop 1: Sharing equally"),
    SAY("Dividing is the opposite of multiplying. It means sharing into equal groups. We have twelve strawberries and three children. We share them fairly, one at a time. One each, one each, one each. Four times. Each child gets four strawberries. Twelve shared between three is four. We write twelve divided by three equals four.", T("**Sharing** means making equal groups.", "12 shared between 3 is 4 each. 12 ÷ 3 = 4.")),
    EXPP("12 shared between 3",
      SS("Here are three children and twelve strawberries ready to share.", S("12 strawberries, 3 children.", ["k1", "🧒", 22, 30, 2], ["k2", "🧒", 50, 30, 2], ["k3", "🧒", 78, 30, 2], ["p", "🍓", 50, 72, 3, "bounce", "12 strawberries"])),
      SS("Share them out equally, one each at a time. Now each child has four strawberries.", S("Each child gets 4. 12 ÷ 3 = 4.", ["k1", "🧒", 22, 30, 2], ["k2", "🧒", 50, 30, 2], ["k3", "🧒", 78, 30, 2], ["a", "🍓", 22, 70, 2, "pulse", "4 each"], ["b", "🍓", 50, 70, 2, "pulse", "4 each"], ["c", "🍓", 78, 70, 2, "pulse", "4 each"]))),
    SAY("Flip the cards and find the matching pairs.", BRAIN("memory_match", "Share match", "Find the matching pairs of cards.", ["🍓", "🍎", "🍌", "🍇", "🍊", "🥝"])),
    CHK(num("Share 10 sweets equally between 2 children. How many each?", 5, { hint: "5 + 5 = 10.", why: "10 ÷ 2 = 5.", tag: "multiply.sharing" })),
    H("Stop 2: Grouping"),
    SAY("There is another way to divide. Grouping. We have twelve sweets. We put them into bags of three. How many bags? Make a bag of three, and another, and another. Four bags. Twelve divided into groups of three is four groups. The answer is the same, but now we count the groups.", T("**Grouping** means putting things into groups of a set size.", "12 sweets in bags of 3 makes 4 bags.")),
    IMG("🛍️", "12 sweets in bags of 3 makes 4 bags."),
    CHK(mc("20 pencils go into packs of 5. How many packs?", "4", ["3", "5"], { hint: "Count in fives to 20.", why: "5, 10, 15, 20. That is 4 packs.", tag: "multiply.grouping" })),
    SAY("Remember. Dividing is sharing equally or making groups. It is the opposite of multiplying.", SUM("Dividing is sharing equally or making groups", "It is the opposite of multiplying")),
    GLOSS({ divide: "Share equally or make equal groups.", sharing: "Giving out equally so everyone gets the same.", share: "To give out equally.", fair: "The same for everyone.", group: "A set of things together." }),
  ],
  mini: [
    num("Share 6 cakes between 2 children. How many each?", 3, { hint: "3 + 3 = 6.", why: "6 ÷ 2 = 3." }),
    num("12 eggs go into boxes of 2. How many boxes?", 6, { hint: "Count in twos to 12.", why: "12 ÷ 2 = 6." }),
    tf("Sharing 8 between 4 gives 3 each.", false, { hint: "4 x 3 = 12.", why: "8 ÷ 4 = 2 each." }),
    mc("Dividing is the opposite of...", "multiplying", ["adding", "counting"], { hint: "Think of the times tables.", why: "Division undoes multiplication." }),
  ],
};

const oddEven = {
  id: "odd_even", kind: "use", title: "Odd and even",
  blocks: [
    H("Stop 1: Pairs and leftovers"),
    SAY("Here is a number secret. Some numbers can be split into pairs with nothing left. Those are even numbers. Six shoes make three pairs. Even! Some numbers always have one left over. Those are odd numbers. Seven shoes make three pairs and one lonely shoe. Odd! Look at the last digit. Even numbers end in zero, two, four, six or eight.", T("**Even** numbers split into pairs. **Odd** numbers have one left over.", "Even numbers end in 0, 2, 4, 6 or 8.")),
    EXPP("Even and odd",
      SS("Six shoes make three pairs. Nothing is left over, so six is even.", S("6 is even.", ["a", "👟", 14, 44, 2], ["b", "👟", 24, 44, 2], ["c", "👟", 40, 44, 2], ["d", "👟", 50, 44, 2], ["e", "👟", 66, 44, 2], ["f", "👟", 76, 44, 2])),
      SS("Seven shoes make three pairs and one left over. The lonely shoe means seven is odd.", S("7 is odd.", ["a", "👟", 12, 44, 2], ["b", "👟", 22, 44, 2], ["c", "👟", 36, 44, 2], ["d", "👟", 46, 44, 2], ["e", "👟", 60, 44, 2], ["f", "👟", 70, 44, 2], ["g", "👟", 88, 44, 2, "bounce", "odd one"]))),
    CHK(mc("Which number is even?", "14", ["13", "15"], { hint: "Does it end in 0, 2, 4, 6 or 8?", why: "14 ends in 4, so it is even.", tag: "multiply.odd_even" })),
    H("Stop 2: Odd or even detectives"),
    SAY("Time to be a detective. Is nineteen odd or even? It ends in nine, so it is odd. What about thirty-two? It ends in two, so it is even. You can check any number, even a big one, just by looking at the last digit. Let's try some more.", T("Look at the last digit to check if a big number is odd or even.", "32 is even. 19 is odd.")),
    IMG("🔎", "Look at the last digit to tell odd from even."),
    REVEAL("Is 100 odd or even? Have a think first.", "Even. It ends in 0, so it splits into pairs with none left over."),
    CHK(mc("Which number is odd?", "27", ["26", "30"], { hint: "Look at the last digit.", why: "27 ends in 7, so it is odd.", tag: "multiply.odd_even" })),
    SAY("Remember. Even numbers make pairs with none left. Odd numbers have one left over. Look at the last digit.", SUM("Even numbers make pairs with none left over", "Odd numbers have one left over", "Look at the last digit")),
    GLOSS({ even: "A number that splits into pairs with none left over.", odd: "A number that has one left over when split into pairs.", pair: "Two things together.", digit: "One of the number symbols 0 to 9." }),
  ],
  mini: [
    mc("Which number is even?", "8", ["7", "9"], { hint: "Can you make pairs?", why: "8 makes 4 pairs." }),
    mc("Which number is odd?", "15", ["12", "20"], { hint: "Look at the last digit.", why: "15 ends in 5, so it is odd." }),
    tf("Every number ending in 0 is even.", true, { hint: "10, 20, 30.", why: "Numbers ending in 0 split into pairs." }),
    num("What is the next even number after 12?", 14, { hint: "Add 2.", why: "12 + 2 = 14." }),
  ],
};

export const topics = [
  topicLesson({
    slug: "maths-class-1-multiply-share", subject: "maths", cls: 1, topic: 5, title: "Multiplying and Sharing",
    summary: "Equal groups, arrays, the 2, 5 and 10 times tables, sharing and grouping, and odd and even.",
    unit: "Topic 5: Multiply and share", difficulty: 1,
    objectives: ["Make and count equal groups", "Use arrays", "Count in 2s, 5s and 10s", "Share and group equally", "Tell odd from even"],
    success_criteria: ["I can say how many in equal groups", "I can count in 2s, 5s and 10s", "I can share things equally", "I can tell if a number is odd or even"],
    real_life: "Sharing sweets fairly, packs of pencils and pairs of shoes.",
    standards: [
      { framework: "nc_england", code: "Y2 mult/div", text: "Recall and use multiplication and division facts for the 2, 5 and 10 multiplication tables" },
      { framework: "pk_ncc", code: "M-01-A-14" }, { framework: "pk_ncc", code: "M-01-A-17" }, { framework: "pk_ncc", code: "M-01-A-19" },
      { framework: "cambridge", code: "2Nc.05" }, { framework: "cambridge", code: "2Ni.05" },
    ],
    warm_up: [
      num("What is 5 + 5?", 10, { hint: "Double 5.", why: "5 + 5 = 10." }),
      num("What is 10 + 10 + 10?", 30, { hint: "3 tens.", why: "10 + 10 + 10 = 30." }),
      tf("12 is bigger than 21.", false, { hint: "Compare the tens.", why: "21 has 2 tens, so it is bigger." }),
    ],
    intro: [
      H("Welcome back, number explorer!"),
      SAY("Welcome back, number explorer! Today we learn two big ideas. Multiplying, a speedy way to add equal groups. And dividing, which is sharing things fairly. You will also find out how to tell odd numbers from even numbers just by looking.", T("Today we multiply, share equally and sort odd and even numbers.")),
      IMG("✖️", "Multiplying and sharing."),
      GLOSS({ "multiplying and sharing": "Adding equal groups and splitting things fairly." }),
    ],
    subs: [groups, tables, sharing, oddEven],
    quiz: [
      { q: num("What is 4 groups of 5?", 20, { hint: "5 + 5 + 5 + 5.", why: "4 groups of 5 is 20.", tag: "multiply.groups" }), sub: "groups", depth: "recall", alts: [num("What is 3 groups of 4?", 12, { hint: "4 + 4 + 4.", why: "3 groups of 4 is 12.", tag: "multiply.groups" }), num("What is 5 groups of 2?", 10, { hint: "2 + 2 + 2 + 2 + 2.", why: "5 groups of 2 is 10.", tag: "multiply.groups" })] },
      { q: tf("3 x 2 means 3 groups of 2.", true, { hint: "Read it as groups.", why: "3 x 2 is 3 groups of 2.", tag: "multiply.groups" }), sub: "groups", depth: "recall", alts: [tf("4 x 5 means 4 groups of 5.", true, { hint: "Read it as groups.", why: "4 x 5 is 4 groups of 5.", tag: "multiply.groups" }), tf("2 x 3 means 2 groups of 5.", false, { hint: "Read it as groups.", why: "2 x 3 is 2 groups of 3.", tag: "multiply.groups" })] },
      { q: num("Count in tens: 10, 20, 30, ... What comes next?", 40, { hint: "Add 10.", why: "30 + 10 = 40.", tag: "multiply.tables" }), sub: "tables", depth: "recall", alts: [num("Count in fives: 25, 30, 35, ... What comes next?", 40, { hint: "Add 5.", why: "35 + 5 = 40.", tag: "multiply.tables" }), num("Count in twos: 10, 12, 14, ... What comes next?", 16, { hint: "Add 2.", why: "14 + 2 = 16.", tag: "multiply.tables" })] },
      { q: fill("Finish the pattern.", "5, 10, {b1}, 20, {b2}", [["15", "12", "14"], ["25", "22", "30"]], { hint: "Count in fives.", why: "5, 10, 15, 20, 25.", tag: "multiply.tables" }), sub: "tables", depth: "apply", alts: [fill("Complete the pattern.", "2, 4, {b1}, 8, {b2}", [["6", "5", "7"], ["10", "9", "12"]], { hint: "Count in twos.", why: "2, 4, 6, 8, 10.", tag: "multiply.tables" }), fill("Fill in the pattern.", "10, 20, {b1}, 40, {b2}", [["30", "25", "35"], ["50", "45", "60"]], { hint: "Count in tens.", why: "10, 20, 30, 40, 50.", tag: "multiply.tables" })] },
      { q: ms("Which numbers are in the 5 times table? Pick two.", ["15", "40"], ["12", "26"], { hint: "They end in 5 or 0.", why: "15 and 40 are both in the 5 times table.", tag: "multiply.tables" }), sub: "tables", depth: "apply", alts: [ms("Which numbers are in the 2 times table? Pick two.", ["12", "18"], ["13", "19"], { hint: "They end in 0, 2, 4, 6 or 8.", why: "12 and 18 are even, so they are in the 2 times table.", tag: "multiply.tables" }), ms("Which numbers are in the 10 times table? Pick two.", ["30", "70"], ["35", "75"], { hint: "They end in 0.", why: "30 and 70 both end in 0.", tag: "multiply.tables" })] },
      { q: ord("Put these in order, smallest first.", ["2 x 5", "3 x 5", "4 x 5", "6 x 5"], { hint: "Work out each answer.", why: "10, 15, 20 and 30 are in order.", tag: "multiply.tables" }), sub: "tables", depth: "apply", alts: [ord("Order these answers, smallest first.", ["2 x 2", "4 x 2", "6 x 2", "9 x 2"], { hint: "Work out each answer.", why: "4, 8, 12 and 18 are in order.", tag: "multiply.tables" }), ord("Arrange these, smallest first.", ["1 x 10", "3 x 10", "5 x 10", "8 x 10"], { hint: "Work out each answer.", why: "10, 30, 50 and 80 are in order.", tag: "multiply.tables" })] },
      { q: mat("Match each sum to its answer.", [["2 x 5", "10"], ["3 x 10", "30"], ["4 x 2", "8"]], { hint: "Think of equal groups.", why: "2 x 5 = 10, 3 x 10 = 30, 4 x 2 = 8.", tag: "multiply.tables" }), sub: "tables", depth: "apply", alts: [mat("Join each sum to its answer.", [["3 x 5", "15"], ["5 x 10", "50"], ["6 x 2", "12"]], { hint: "Think of equal groups.", why: "3 x 5 = 15, 5 x 10 = 50, 6 x 2 = 12.", tag: "multiply.tables" }), mat("Pair each sum with its answer.", [["4 x 5", "20"], ["5 x 2", "10"], ["7 x 10", "70"]], { hint: "Think of equal groups.", why: "4 x 5 = 20, 5 x 2 = 10, 7 x 10 = 70.", tag: "multiply.tables" })] },
      { q: hot("Tap the tray that shows 3 rows of 4.", [["🍪", "Tray A: 3 rows of 4", 22, 50], ["🍪", "Tray B: 4 rows of 2", 50, 50], ["🍪", "Tray C: 2 rows of 5", 78, 50]], ["Tray A: 3 rows of 4"], { labels: true, hint: "Read each label.", why: "Tray A has 3 rows of 4.", tag: "multiply.arrays" }), sub: "groups", depth: "apply", alts: [hot("Tap the tray that shows 2 rows of 5.", [["🍪", "Tray A: 3 rows of 4", 22, 50], ["🍪", "Tray B: 2 rows of 5", 50, 50], ["🍪", "Tray C: 5 rows of 3", 78, 50]], ["Tray B: 2 rows of 5"], { labels: true, hint: "Read each label.", why: "Tray B has 2 rows of 5.", tag: "multiply.arrays" }), hot("Tap the tray that shows 4 rows of 2.", [["🍪", "Tray A: 2 rows of 4", 22, 50], ["🍪", "Tray B: 3 rows of 3", 50, 50], ["🍪", "Tray C: 4 rows of 2", 78, 50]], ["Tray C: 4 rows of 2"], { labels: true, hint: "Read each label.", why: "Tray C has 4 rows of 2.", tag: "multiply.arrays" })] },
      { q: sld("Slide to show the answer to 6 x 5 on the number line.", { min: 0, max: 50 }, 30, 0, { hint: "Count in fives six times.", why: "6 x 5 = 30.", tag: "multiply.tables" }), sub: "tables", depth: "apply", alts: [sld("Slide to show the answer to 7 x 5 on the number line.", { min: 0, max: 50 }, 35, 0, { hint: "Count in fives seven times.", why: "7 x 5 = 35.", tag: "multiply.tables" }), sld("Slide to show the answer to 4 x 10 on the number line.", { min: 0, max: 50 }, 40, 0, { hint: "Count in tens four times.", why: "4 x 10 = 40.", tag: "multiply.tables" })] },
      { q: num("Share 15 stickers equally between 3 children. How many does each child get?", 5, { hint: "3 groups of what make 15?", why: "15 ÷ 3 = 5.", tag: "multiply.sharing" }), sub: "sharing", depth: "apply", alts: [num("Share 12 sweets equally between 4 children. How many does each child get?", 3, { hint: "4 groups of what make 12?", why: "12 ÷ 4 = 3.", tag: "multiply.sharing" }), num("Share 20 marbles equally between 2 friends. How many does each friend get?", 10, { hint: "2 groups of what make 20?", why: "20 ÷ 2 = 10.", tag: "multiply.sharing" })] },
      { q: mc("Which number out of these is odd?", "35", ["30", "34"], { hint: "Look at the last digit.", why: "35 ends in 5, so it is odd.", tag: "multiply.odd_even" }), sub: "odd_even", depth: "recall", alts: [mc("Which of these numbers is odd?", "47", ["40", "48"], { hint: "Look at the last digit.", why: "47 ends in 7, so it is odd.", tag: "multiply.odd_even" }), mc("Pick the odd number.", "61", ["60", "62"], { hint: "Look at the last digit.", why: "61 ends in 1, so it is odd.", tag: "multiply.odd_even" })] },
      { q: mc("Why is 12 an even number?", "It can be split into pairs with none left over", ["It is bigger than 10", "It ends in 1"], { hint: "Think of 12 shoes.", why: "12 shoes make 6 pairs with none left over.", tag: "multiply.reason" }), sub: "odd_even", depth: "reason", alts: [mc("Why is 9 an odd number?", "When you make pairs, one is left over", ["It is smaller than 10", "It ends in 0"], { hint: "Think of 9 shoes.", why: "9 shoes make 4 pairs and one is left over.", tag: "multiply.reason" }), mc("Why is 20 an even number?", "It can be split into pairs with none left over", ["It is bigger than 10", "It ends in 2"], { hint: "Think of 20 shoes.", why: "20 shoes make 10 pairs with none left over.", tag: "multiply.reason" })] },
      { q: mc("Amir says 3 x 5 = 8. Is he right?", "No. 3 x 5 means 5 + 5 + 5, which is 15", ["Yes, 3 + 5 = 8", "No, it is 12"], { hint: "x means groups, not plus.", why: "3 groups of 5 is 15, not 8.", tag: "multiply.reason" }), sub: "groups", depth: "reason", alts: [mc("Hana says 4 x 2 = 6. Is she right?", "No. 4 x 2 means 2 + 2 + 2 + 2, which is 8", ["Yes, 4 + 2 = 6", "No, it is 10"], { hint: "x means groups, not plus.", why: "4 groups of 2 is 8, not 6.", tag: "multiply.reason" }), mc("Zain says 2 x 10 = 12. Is he right?", "No. 2 x 10 means 10 + 10, which is 20", ["Yes, 2 + 10 = 12", "No, it is 30"], { hint: "x means groups, not plus.", why: "2 groups of 10 is 20, not 12.", tag: "multiply.reason" })] },
      { q: mc("Sara has 9 sweets and shares them between 2 friends. Why can she not share them equally?", "9 is odd, so there is one left over", ["9 is too small", "9 is even"], { hint: "Is 9 odd or even?", why: "9 is odd. It cannot be split into two equal groups.", tag: "multiply.reason" }), sub: "odd_even", depth: "reason", alts: [mc("Omar has 11 stickers and shares them between 2 friends. Why can he not share them equally?", "11 is odd, so there is one left over", ["11 is too small", "11 is even"], { hint: "Is 11 odd or even?", why: "11 is odd. It cannot be split into two equal groups.", tag: "multiply.reason" }), mc("Mia has 15 beads and shares them between 2 friends. Why can she not share them equally?", "15 is odd, so there is one left over", ["15 is too small", "15 is even"], { hint: "Is 15 odd or even?", why: "15 is odd. It cannot be split into two equal groups.", tag: "multiply.reason" })] },
      { q: num("A box holds 5 pencils. How many pencils are in 6 boxes?", 30, { hint: "Count in fives six times.", why: "6 x 5 = 30 pencils.", tag: "multiply.word_problem" }), sub: "tables", depth: "reason", alts: [num("A bag holds 10 marbles. How many marbles are in 4 bags?", 40, { hint: "Count in tens four times.", why: "4 x 10 = 40 marbles.", tag: "multiply.word_problem" }), num("A plate holds 2 cakes. How many cakes are on 7 plates?", 14, { hint: "Count in twos seven times.", why: "7 x 2 = 14 cakes.", tag: "multiply.word_problem" })] },
    ],
  }),
];
