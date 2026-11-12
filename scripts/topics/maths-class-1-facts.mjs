import { SAY, SS, H, T, IMG, TIP, FACT, PHOTO, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Coteach diagrams (see content/media/manifest.d/maths-class-1-number-facts.json).
const COTEACH_A = {"type":"image","asset":"maths-class-1-number-facts-d1-ca2a00a8.png","alt":"A ten frame showing 8 + 5: filled to 10 with 3 counters left over","caption":"8 + 5 = 13."};
const COTEACH_B = {"type":"image","asset":"maths-class-1-number-facts-d2-1bf913d5.png","alt":"A part-part-whole diagram with a whole of 20, one part 12 and the other a question mark","caption":"20 = 12 + ?"};
// Class 1 Maths topic 1: number facts (format 3.0). Standards from docs/CURRICULUM_V2.md.
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });
const TF = (id, value, x = 50, y = 44, size = 3, anim = "none") => [id, { kind: "ten_frame", value }, x, y, size, anim];
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });
const DOMINO = "maths-class-1-number-facts-1-30735f05.jpg";

const bonds = {
  id: "bonds", kind: "learn", title: "Number bonds to 10",
  blocks: [
    H("Welcome back, number explorer!"),
    SAY("Welcome back, number explorer! Today we collect super facts to keep in your head. Number bonds, doubles and fact families. When you know them by heart, sums get faster.",
      T("Today we learn **number facts** to keep in our heads: bonds, doubles and fact families.")),
    SAY("Look at these dominoes. Each end has dots. Pairs and doubles are hiding in them!",
      PHOTO(DOMINO, "A pile of white dominoes with coloured dots", "Dominoes show doubles and pairs.", "Photo by Ryan Quintal on Unsplash")),
    H("Stop 1: Pairs that make ten"),
    SAY("Some numbers are best friends. They always go together to make ten. Look at the ten frame. Seven counters, and three empty spaces. Seven and three make ten. We call a pair like this a number bond. Seven and three is a bond to ten.", T("A **number bond** is a pair of numbers that make a total.", "7 and 3 is a bond to 10, because 7 + 3 = 10.")),
    EXPP("7 and 3 make 10",
      SS("Here is a ten frame with seven red counters. Count them: seven.", S("7 counters in the ten frame.", TF("f", 7))),
      SS("There are three empty spaces. How many more do we need to fill the frame? Three more.", S("3 empty spaces are left.", TF("f", 7), ["q", "❓", 50, 86, 2, "bounce", "3 more?"])),
      SS("Fill them in. The frame is full: ten! So seven and three is a number bond to ten.", S("7 + 3 = 10.", TF("f", 10, 50, 44, 3, "pulse"), ["s", "✅", 50, 88, 2, "bounce", "7 + 3 = 10"]))),
    SAY("Fill the ten frame first. Eight and two make ten. Three are left over.", COTEACH_A),
    CHK(num("What goes with 6 to make 10?", 4, { hint: "How many empty spaces in a ten frame with 6 counters?", why: "6 + 4 = 10.", tag: "facts.bonds10" })),
    H("Stop 2: The bond works both ways"),
    SAY("Here is a secret. Bonds work both ways. Seven plus three is ten. And three plus seven is ten too. The numbers swap places but the total stays the same. If seven plus three is ten, then ten take away seven is three. One fact gives us a whole family of facts.", T("Bonds work both ways: 7 + 3 = 10 and 3 + 7 = 10.", "Take away uses the bond too: 10 - 7 = 3.")),
    IMG("🔟", "Pairs like 1 and 9, 2 and 8, 3 and 7, 4 and 6 and 5 and 5 all make 10."),
    CHK(mc("Which pair does NOT make 10?", "4 and 7", ["6 and 4", "9 and 1"], { hint: "Add each pair.", why: "4 + 7 = 11. The others make 10.", tag: "facts.bonds10" })),
    SAY("Let us remember. A number bond is a pair that makes a total. The pairs to ten are one and nine, two and eight. Three and seven, four and six. And five and five.", SUM("A number bond is a pair that makes a total", "Pairs to 10: 1 and 9, 2 and 8, 3 and 7, 4 and 6, 5 and 5", "Bonds work both ways")),
    GLOSS({ "number facts": "Sums you know without counting.", "number bond": "Two numbers that make a total, like 7 and 3 make 10.", total: "How many there are altogether.", pair: "Two things that go together.", "ten frame": "A box with 10 spaces for counters." }),
  ],
  mini: [
    num("What goes with 8 to make 10?", 2, { hint: "8 + ? = 10.", why: "8 + 2 = 10." }),
    num("What goes with 5 to make 10?", 5, { hint: "Half of 10.", why: "5 + 5 = 10." }),
    tf("3 and 6 make 10.", false, { hint: "3 + 6 = ?", why: "3 + 6 = 9. 3 and 7 make 10." }),
    mc("10 - 4 = ?", "6", ["5", "7"], { hint: "Use the bond 4 + 6 = 10.", why: "4 + 6 = 10, so 10 - 4 = 6." }),
  ],
};

const bonds20 = {
  id: "bonds20", kind: "try", title: "Bonds to 20",
  blocks: [
    H("Stop 1: Doubling the bonds"),
    SAY("Once you know your bonds to ten, bonds to twenty are easy. Look at the digits. Seven and three make ten. So seventeen and three make twenty! Only the tens change. Try it with the stars. Move the stars to find pairs that make twenty.", T("If you know 7 + 3 = 10, you know 17 + 3 = 20.", "Bonds to **twenty** use the same ones digits.")),
    SAY("Here are twenty stars. Split them into two groups. Try twelve and eight, or fifteen and five. Do both groups always make twenty?", MAN("Make twenty", "You have 20 stars. Split them into two groups. How many in each group? Try 12 and 8, or 15 and 5.", "⭐", 20, ["Group A", "Group B"])),
    SAY("The whole is twenty. One part is twelve. What is the other part?", COTEACH_B),
    CHK(num("What goes with 14 to make 20?", 6, { hint: "4 + 6 = 10, so 14 + 6 = 20.", why: "14 + 6 = 20.", tag: "facts.bonds20" })),
    H("Stop 2: Find the pairs at home"),
    SAY("Time to be a number detective at home. Find twenty small things, like buttons, spoons or pasta. Split them into two groups in different ways. How many different pairs can you find? Write them down.", T("Find 20 small things and split them into two groups in different ways.")),
    IMG("🔍", "Splitting 20 buttons into two groups in different ways."),
    SAY("Now try it at home. Count out twenty buttons, split them into two groups, and write the pair. How many different pairs can you find?", ACT("Twenty buttons", ["20 buttons, coins or pasta shapes", "Paper and a pencil"], ["Count out exactly 20 things.", "Split them into two groups. Count each group.", "Write the pair, like 12 + 8.", "Split them a different way. How many pairs can you find?"])),
    CHK(mc("Which pair makes 20?", "13 and 7", ["13 and 6", "12 and 9"], { hint: "3 + 7 = 10, so 13 + 7 = 20.", why: "13 + 7 = 20.", tag: "facts.bonds20" })),
    SAY("Remember. Use the bonds to ten to find the bonds to twenty. Only the tens digit changes.", SUM("Use bonds to 10 to find bonds to 20", "Only the tens digit changes")),
    GLOSS({ twenty: "Two tens. The number 20.", groups: "Things split into sets.", detective: "Someone who finds answers by looking carefully." }),
  ],
  mini: [
    num("What goes with 12 to make 20?", 8, { hint: "2 + 8 = 10, so 12 + 8 = 20.", why: "12 + 8 = 20." }),
    num("What goes with 16 to make 20?", 4, { hint: "6 + 4 = 10.", why: "16 + 4 = 20." }),
    tf("11 and 9 make 20.", true, { hint: "1 + 9 = 10.", why: "11 + 9 = 20." }),
    mc("20 - 5 = ?", "15", ["14", "16"], { hint: "Use 15 + 5 = 20.", why: "15 + 5 = 20, so 20 - 5 = 15." }),
  ],
};

const doubles = {
  id: "doubles", kind: "play", title: "Doubles and near doubles",
  blocks: [
    H("Stop 1: Doubles"),
    SAY("A double is a number added to itself. Double four is four plus four. That is eight. Think of a ladybird. It has the same number of spots on each wing. Four spots here and four spots there. Eight spots in all. Doubles are great to learn by heart. They help with so many sums.", T("A **double** is a number added to itself.", "Double 4 is 4 + 4 = 8.")),
    EXPP("Double 4 on a ladybird",
      SS("Here is one wing of a ladybird. Four spots.", S("4 spots on one wing.", ["a", "🔴", 22, 44, 3, "none", "4 spots"])),
      SS("The other wing is the same. Four more spots. Four and four make eight. Double four is eight!", S("Double 4 is 4 + 4 = 8.", ["a", "🔴", 22, 44, 3, "none", "4 spots"], ["b", "🔴", 78, 44, 3, "pulse", "4 spots"], ["s", "✅", 50, 86, 2, "bounce", "4 + 4 = 8"]))),
    SAY("Flip the cards and find the matching pairs.", BRAIN("memory_match", "Double match", "Find the matching pairs of cards.", ["🐞", "🦋", "🐝", "🐛", "🐜", "🦗"])),
    CHK(num("What is double 6?", 12, { hint: "6 + 6.", why: "Double 6 is 12.", tag: "facts.doubles" })),
    H("Stop 2: Near doubles"),
    SAY("Near doubles are sums that are very close to a double. Take six plus seven. That is a double with one extra. Double six is twelve. Add one more. Thirteen. So six plus seven is thirteen. You can also use double seven, which is fourteen, and take one away. Both give you the right answer.", T("A **near double** is a sum close to a double.", "6 + 7: double 6 is 12, plus 1 more makes 13.")),
    IMG("🐞", "A near double: 6 + 7 is double 6 and 1 more."),
    CHK(mc("What is 5 + 6?", "11", ["10", "12"], { hint: "Double 5 is 10. Add 1 more.", why: "5 + 5 = 10, and 1 more is 11.", tag: "facts.near_doubles" })),
    SAY("Remember. A double is a number added to itself. A near double is a double with one more or one less.", SUM("A double is a number added to itself", "A near double is a double plus or minus 1")),
    GLOSS({ double: "A number added to itself, like 4 + 4.", "near double": "A sum that is close to a double, like 6 + 7.", ladybird: "A small red beetle with black spots." }),
  ],
  mini: [
    num("What is double 5?", 10, { hint: "5 + 5.", why: "Double 5 is 10." }),
    num("What is double 8?", 16, { hint: "8 + 8.", why: "Double 8 is 16." }),
    mc("7 + 8 is a near double. What is it?", "15", ["14", "16"], { hint: "Double 7 is 14. Add 1.", why: "7 + 7 = 14, and 1 more is 15." }),
    tf("Double 9 is 18.", true, { hint: "9 + 9.", why: "9 + 9 = 18." }),
  ],
};

const families = {
  id: "families", kind: "use", title: "Fact families",
  blocks: [
    H("Stop 1: Four facts from three numbers"),
    SAY("Three numbers can make a whole family of facts. Take two, three and five. Two plus three is five. Three plus two is five. Five take away two is three. Five take away three is two. Four facts from just three numbers. That is a fact family. The biggest number, five, is the total.", T("A **fact family** is a group of facts that use the same three numbers.", "2, 3 and 5: 2 + 3 = 5, 3 + 2 = 5, 5 - 2 = 3, 5 - 3 = 2.")),
    EXPP("The 2, 3 and 5 family",
      SS("Here is the family: two, three and five. Five is the total at the top.", S("The family is 2, 3 and 5.", ["t", "🔺", 50, 28, 3, "none", "5"], ["a", "2️⃣", 30, 62, 2], ["b", "3️⃣", 70, 62, 2])),
      SS("Add the two small numbers. Two plus three is five. Three plus two is five too.", S("2 + 3 = 5 and 3 + 2 = 5.", ["t", "🔺", 50, 28, 3, "none", "5"], ["a", "2️⃣", 30, 62, 2], ["b", "3️⃣", 70, 62, 2], ["s", "➕", 50, 86, 2, "bounce", "2 + 3 = 5"])),
      SS("Now take away. Five take away two is three. Five take away three is two. Four facts!", S("5 - 2 = 3 and 5 - 3 = 2.", ["t", "🔺", 50, 28, 3, "none", "5"], ["a", "2️⃣", 30, 62, 2], ["b", "3️⃣", 70, 62, 2], ["s", "➖", 50, 86, 2, "bounce", "5 - 2 = 3"]))),
    CHK(num("In the family 4, 6 and 10: what is 10 - 4?", 6, { hint: "Use 4 + 6 = 10.", why: "10 - 4 = 6.", tag: "facts.families" })),
    H("Stop 2: Use the family to solve a problem"),
    SAY("Fact families help with stories too. Aisha has ten sweets. She gives four to her brother. How many are left? We know four plus six is ten. So ten take away four is six. Six sweets are left. One family, one answer.", T("Aisha has 10 sweets and gives away 4. 10 - 4 = 6 sweets left.", "Use the family 4, 6 and 10.")),
    IMG("🍬", "10 sweets, 4 given away, 6 left."),
    REVEAL("The family is 3, 7 and 10. What are all four facts? Have a think first.", "3 + 7 = 10, 7 + 3 = 10, 10 - 3 = 7 and 10 - 7 = 3."),
    CHK(mc("Which fact is in the family 5, 8 and 13?", "13 - 5 = 8", ["13 - 5 = 9", "8 - 5 = 13"], { hint: "13 is the total. Take the other number away.", why: "13 - 5 = 8 uses all three numbers.", tag: "facts.families" })),
    SAY("Remember. Three numbers make four facts. The biggest number is the total. Use a fact you know to find the others.", SUM("Three numbers make four facts", "The biggest number is the total", "Use a fact you know to find the others")),
    GLOSS({ "fact family": "Facts that use the same three numbers.", total: "The biggest number in the family, the answer to the add.", fact: "A sum you know is true." }),
  ],
  mini: [
    num("In the family 3, 4 and 7: what is 3 + 4?", 7, { hint: "Add the two small numbers.", why: "3 + 4 = 7." }),
    num("In the family 3, 4 and 7: what is 7 - 3?", 4, { hint: "Use 3 + 4 = 7.", why: "7 - 3 = 4." }),
    tf("The family 2, 3 and 5 has four facts.", true, { hint: "Two adds and two take-aways.", why: "2 + 3, 3 + 2, 5 - 2 and 5 - 3." }),
    mc("Which number is the total in 6, 9 and 15?", "15", ["6", "9"], { hint: "The biggest number.", why: "6 + 9 = 15, so 15 is the total." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Pairs, doubles and mango boxes", backdrop: "home", caption: "Two friends find pairs that make ten.",
  scenes: [
    { caption: "Zara and Hana at the stall.", say: "Zara and her cousin Hana have a box of ten mangoes.",
      items: [{ id: "z", emoji: "👧", label: "Zara", x: 22, y: 56, size: 3, enter: "walk_right" }, { id: "h", emoji: "👧🏽", label: "Hana", x: 78, y: 56, size: 3, enter: "walk_left" }, { id: "m", emoji: "🥭", x: 50, y: 30, size: 3, enter: "pop" }] },
    { caption: "A ten frame with 7.", say: "Seven mangoes sit in a ten frame. Three spaces are empty.",
      items: [{ id: "f", prop: { kind: "ten_frame", value: 7 }, label: "7", x: 50, y: 46, size: 3, enter: "grow" }] },
    { caption: "7 + 3 = 10.", say: "Add three more. The frame is full. Seven and three make ten!",
      items: [{ id: "f", prop: { kind: "ten_frame", value: 10 }, label: "7 + 3 = 10", x: 50, y: 46, size: 3, effect: "sparkle" }] },
    { caption: "Swap them: 3 + 7.", say: "Swap them round. Three and seven make ten too.",
      items: [{ id: "f", prop: { kind: "ten_frame", value: 10 }, label: "3 + 7 = 10", x: 50, y: 46, size: 3, effect: "glow" }] },
    { caption: "A double: 4 + 4.", say: "Hana has two trays of four mangoes. Double four is eight.",
      items: [{ id: "a", emoji: "🥭🥭🥭🥭", label: "4", x: 28, y: 46, size: 3, enter: "slide_right" }, { id: "b", emoji: "🥭🥭🥭🥭", label: "4", x: 72, y: 46, size: 3, enter: "slide_left" }] },
    { caption: "A near double: 4 + 5.", say: "One more mango joins. Four and five is double four, plus one. Nine!",
      items: [{ id: "a", emoji: "🥭🥭🥭🥭", label: "4", x: 28, y: 46, size: 3 }, { id: "b", emoji: "🥭🥭🥭🥭🥭", label: "5", x: 72, y: 46, size: 3, effect: "sparkle" }] },
    { caption: "A fact family.", say: "Four, five and nine are a family. Four facts from three numbers!",
      items: [{ id: "t", emoji: "🔺", label: "9", x: 50, y: 30, size: 3 }, { id: "a", emoji: "4️⃣", x: 30, y: 62, size: 2 }, { id: "b", emoji: "5️⃣", x: 70, y: 62, size: 2 }] },
    { caption: "Shukriya, Hana!", say: "Pairs, doubles and families make sums quick. Shukriya, Hana!",
      items: [{ id: "z", emoji: "👧", x: 22, y: 56, size: 3, anim: "bounce" }, { id: "h", emoji: "👧🏽", x: 78, y: 56, size: 3, anim: "bounce" }, { id: "m", emoji: "🥭", x: 50, y: 30, size: 3, effect: "hearts" }] },
  ],
};

export const topics = [
  topicLesson({
    slug: "maths-class-1-number-facts", subject: "maths", cls: 1, topic: 1, title: "Number Facts",
    summary: "Number bonds to 10 and 20, doubles and near doubles, and fact families.",
    unit: "Topic 1: Number facts", difficulty: 1,
    objectives: ["Know the number bonds to 10 and 20", "Use doubles and near doubles", "Use fact families to add and take away"],
    success_criteria: ["I can say pairs that make 10 and 20", "I can double a number and use near doubles", "I can write four facts from three numbers"],
    real_life: "Sharing sweets, counting change and quick sums in your head.",
    standards: [
      { framework: "nc_england", code: "Y2 add/sub facts", text: "Recall and use addition and subtraction facts to 20 fluently" },
      { framework: "cambridge", code: "2Ni.02" }, { framework: "cambridge", code: "2Ni.03" },
    ],
    warm_up: [
      mc("What do 5 and 5 make?", "10", ["9", "11"], { hint: "Count on from 5.", why: "5 + 5 = 10." }),
      num("What is 3 + 2?", 5, { hint: "Count on 2 from 3.", why: "3 + 2 = 5." }),
      tf("10 is bigger than 8.", true, { hint: "Count: 8, 9, 10.", why: "10 comes after 8." }),
    ],
    intro: [],
    subs: [bonds, bonds20, doubles, families],
    clip,
    quiz: [
      { q: num("What goes with 7 to make 10?", 3, { hint: "7 + ? = 10.", why: "7 + 3 = 10.", tag: "facts.bonds10" }), sub: "bonds", depth: "recall", alts: [num("What goes with 4 to make 10?", 6, { hint: "4 + ? = 10.", why: "4 + 6 = 10.", tag: "facts.bonds10" }), num("What goes with 9 to make 10?", 1, { hint: "9 + ? = 10.", why: "9 + 1 = 10.", tag: "facts.bonds10" })] },
      { q: tf("6 and 5 make 10.", false, { hint: "Add them.", why: "6 + 5 = 11. 6 and 4 make 10.", tag: "facts.bonds10" }), sub: "bonds", depth: "recall", alts: [tf("8 and 2 make 10.", true, { hint: "Add them.", why: "8 + 2 = 10.", tag: "facts.bonds10" }), tf("3 and 8 make 10.", false, { hint: "Add them.", why: "3 + 8 = 11. 3 and 7 make 10.", tag: "facts.bonds10" })] },
      { q: mc("What is 10 - 6?", "4", ["3", "5"], { hint: "Use the bond 6 + 4 = 10.", why: "6 + 4 = 10, so 10 - 6 = 4.", tag: "facts.bonds10" }), sub: "bonds", depth: "recall", alts: [mc("What is 10 - 3?", "7", ["6", "8"], { hint: "Use the bond 3 + 7 = 10.", why: "3 + 7 = 10, so 10 - 3 = 7.", tag: "facts.bonds10" }), mc("What is 10 - 8?", "2", ["1", "3"], { hint: "Use the bond 8 + 2 = 10.", why: "8 + 2 = 10, so 10 - 8 = 2.", tag: "facts.bonds10" })] },
      { q: fill("Finish the bond to 20.", "{b1} + 6 = 20", [["14", "13", "15"]], { hint: "4 + 6 = 10, so 14 + 6 = 20.", why: "14 + 6 = 20.", tag: "facts.bonds20" }), sub: "bonds20", depth: "apply", alts: [fill("Finish the bond to 20 here.", "{b1} + 8 = 20", [["12", "11", "13"]], { hint: "2 + 8 = 10, so 12 + 8 = 20.", why: "12 + 8 = 20.", tag: "facts.bonds20" }), fill("Complete this bond to 20.", "{b1} + 3 = 20", [["17", "16", "18"]], { hint: "7 + 3 = 10, so 17 + 3 = 20.", why: "17 + 3 = 20.", tag: "facts.bonds20" })] },
      { q: ms("Which pairs make 20? Pick two.", ["12 + 8", "15 + 5"], ["12 + 7", "15 + 4"], { hint: "Use the bonds to 10.", why: "12 + 8 = 20 and 15 + 5 = 20.", tag: "facts.bonds20" }), sub: "bonds20", depth: "apply", alts: [ms("Which sums are equal to 20? Pick two.", ["13 + 7", "11 + 9"], ["13 + 6", "11 + 8"], { hint: "Use the bonds to 10.", why: "13 + 7 = 20 and 11 + 9 = 20.", tag: "facts.bonds20" }), ms("Which pairs total 20? Pick two.", ["16 + 4", "18 + 2"], ["16 + 3", "18 + 1"], { hint: "Use the bonds to 10.", why: "16 + 4 = 20 and 18 + 2 = 20.", tag: "facts.bonds20" })] },
      { q: num("What is double 7?", 14, { hint: "7 + 7.", why: "Double 7 is 14.", tag: "facts.doubles" }), sub: "doubles", depth: "recall", alts: [num("What is double 9?", 18, { hint: "9 + 9.", why: "Double 9 is 18.", tag: "facts.doubles" }), num("What is double 10?", 20, { hint: "10 + 10.", why: "Double 10 is 20.", tag: "facts.doubles" })] },
      { q: ord("Put these doubles in order, smallest first.", ["Double 2", "Double 5", "Double 7", "Double 9"], { hint: "Work out each double.", why: "4, 10, 14 and 18 are in order.", tag: "facts.doubles" }), sub: "doubles", depth: "apply", alts: [ord("Order these doubles from smallest.", ["Double 3", "Double 6", "Double 8", "Double 10"], { hint: "Work out each double.", why: "6, 12, 16 and 20 are in order.", tag: "facts.doubles" }), ord("Arrange these doubles, smallest first.", ["Double 1", "Double 4", "Double 6", "Double 9"], { hint: "Work out each double.", why: "2, 8, 12 and 18 are in order.", tag: "facts.doubles" })] },
      { q: mat("Match each sum to its answer.", [["6 + 6", "12"], ["6 + 7", "13"], ["7 + 7", "14"]], { hint: "Double 6 is 12.", why: "6 + 6 = 12, 6 + 7 = 13, 7 + 7 = 14.", tag: "facts.near_doubles" }), sub: "doubles", depth: "apply", alts: [mat("Join each sum to its answer.", [["5 + 5", "10"], ["5 + 6", "11"], ["6 + 6", "12"]], { hint: "Double 5 is 10.", why: "5 + 5 = 10, 5 + 6 = 11, 6 + 6 = 12.", tag: "facts.near_doubles" }), mat("Pair up each sum with its answer.", [["8 + 8", "16"], ["8 + 9", "17"], ["9 + 9", "18"]], { hint: "Double 8 is 16.", why: "8 + 8 = 16, 8 + 9 = 17, 9 + 9 = 18.", tag: "facts.near_doubles" })] },
      { q: hot("Tap the bag that shows 7 + 8.", [["🛍️", "Bag A: 14", 22, 50], ["🛍️", "Bag B: 15", 50, 50], ["🛍️", "Bag C: 16", 78, 50]], ["Bag B: 15"], { labels: true, hint: "Double 7 is 14. Add 1.", why: "7 + 8 = 15.", tag: "facts.near_doubles" }), sub: "doubles", depth: "apply", alts: [hot("Tap the bag that shows 6 + 7.", [["🛍️", "Bag A: 12", 22, 50], ["🛍️", "Bag B: 13", 50, 50], ["🛍️", "Bag C: 14", 78, 50]], ["Bag B: 13"], { labels: true, hint: "Double 6 is 12. Add 1.", why: "6 + 7 = 13.", tag: "facts.near_doubles" }), hot("Tap the bag that shows 8 + 9.", [["🛍️", "Bag A: 16", 22, 50], ["🛍️", "Bag B: 17", 50, 50], ["🛍️", "Bag C: 18", 78, 50]], ["Bag B: 17"], { labels: true, hint: "Double 8 is 16. Add 1.", why: "8 + 9 = 17.", tag: "facts.near_doubles" })] },
      { q: sld("Slide to show double 8 on the number line.", { min: 0, max: 20 }, 16, 0, { hint: "8 + 8.", why: "Double 8 is 16.", tag: "facts.doubles" }), sub: "doubles", depth: "recall", alts: [sld("Slide to show double 9 on the number line.", { min: 0, max: 20 }, 18, 0, { hint: "9 + 9.", why: "Double 9 is 18.", tag: "facts.doubles" }), sld("Slide to show double 7 on the number line.", { min: 0, max: 20 }, 14, 0, { hint: "7 + 7.", why: "Double 7 is 14.", tag: "facts.doubles" })] },
      { q: mc("Which fact is in the family 6, 9 and 15?", "15 - 6 = 9", ["15 - 6 = 8", "9 - 6 = 15"], { hint: "15 is the total.", why: "15 - 6 = 9 uses all three numbers.", tag: "facts.families" }), sub: "families", depth: "apply", alts: [mc("Which fact is in the family 7, 8 and 15?", "15 - 7 = 8", ["15 - 7 = 9", "8 - 7 = 15"], { hint: "15 is the total.", why: "15 - 7 = 8 uses all three numbers.", tag: "facts.families" }), mc("Which fact is in the family 4, 9 and 13?", "13 - 4 = 9", ["13 - 4 = 8", "9 - 4 = 13"], { hint: "13 is the total.", why: "13 - 4 = 9 uses all three numbers.", tag: "facts.families" })] },
      { q: mc("Hana says 6 + 7 = 12 because double 6 is 12. Is Hana right?", "No. Double 6 is 12, and 7 is one more, so the answer is 13", ["Yes, 6 + 7 = 12", "No, the answer is 14"], { hint: "7 is one more than 6.", why: "6 + 7 is one more than double 6, so it is 13.", tag: "facts.reason" }), sub: "doubles", depth: "reason", alts: [mc("Ravi says 8 + 9 = 16 because double 8 is 16. Is Ravi right?", "No. Double 8 is 16, and 9 is one more, so the answer is 17", ["Yes, 8 + 9 = 16", "No, the answer is 18"], { hint: "9 is one more than 8.", why: "8 + 9 is one more than double 8, so it is 17.", tag: "facts.reason" }), mc("Mina says 5 + 6 = 10 because double 5 is 10. Is Mina right?", "No. Double 5 is 10, and 6 is one more, so the answer is 11", ["Yes, 5 + 6 = 10", "No, the answer is 12"], { hint: "6 is one more than 5.", why: "5 + 6 is one more than double 5, so it is 11.", tag: "facts.reason" })] },
      { q: mc("Why does 17 + 3 = 20 when 7 + 3 = 10?", "Only the tens change. The ones still make 10", ["Because 17 is bigger than 7", "Because 3 is a double"], { hint: "Look at the ones digits.", why: "The ones 7 and 3 make 10, and the tens 1 and the 1 from the ten make 20.", tag: "facts.reason" }), sub: "bonds20", depth: "reason", alts: [mc("Why does 14 + 6 = 20 when 4 + 6 = 10?", "Only the tens change. The ones still make 10", ["Because 14 is bigger than 4", "Because 6 is a double"], { hint: "Look at the ones digits.", why: "The ones 4 and 6 make 10, so with the extra ten the total is 20.", tag: "facts.reason" }), mc("Why does 12 + 8 = 20 when 2 + 8 = 10?", "Only the tens change. The ones still make 10", ["Because 12 is bigger than 2", "Because 8 is a double"], { hint: "Look at the ones digits.", why: "The ones 2 and 8 make 10, so with the extra ten the total is 20.", tag: "facts.reason" })] },
      { q: num("Aisha has 10 sweets and gives 3 to her friend. How many sweets does she have left?", 7, { hint: "Use the bond 3 + 7 = 10.", why: "10 - 3 = 7 sweets.", tag: "facts.families" }), sub: "families", depth: "reason", alts: [num("Omar has 10 stickers and gives 6 to his sister. How many stickers does he have left?", 4, { hint: "Use the bond 6 + 4 = 10.", why: "10 - 6 = 4 stickers.", tag: "facts.families" }), num("Maya has 10 beads and loses 8 of them. How many beads does she have left?", 2, { hint: "Use the bond 8 + 2 = 10.", why: "10 - 8 = 2 beads.", tag: "facts.families" })] },
      { q: mc("A friend says 9 + 9 = 17. Which fact helps you check?", "Double 9 is 18, so 9 + 9 = 18", ["9 + 8 = 17, so 9 + 9 = 17", "Double 9 is 16"], { hint: "Think about the double of 9.", why: "Double 9 is 18, so 9 + 9 is not 17.", tag: "facts.reason" }), sub: "doubles", depth: "reason", alts: [mc("A friend says 8 + 8 = 15. Which fact helps you check?", "Double 8 is 16, so 8 + 8 = 16", ["8 + 7 = 15, so 8 + 8 = 15", "Double 8 is 14"], { hint: "Think about the double of 8.", why: "Double 8 is 16, so 8 + 8 is not 15.", tag: "facts.reason" }), mc("A friend says 7 + 7 = 13. Which fact helps you check?", "Double 7 is 14, so 7 + 7 = 14", ["7 + 6 = 13, so 7 + 7 = 13", "Double 7 is 12"], { hint: "Think about the double of 7.", why: "Double 7 is 14, so 7 + 7 is not 13.", tag: "facts.reason" })] },
      // ----- upgrade: 15 new mains (q16-q30), 1 variant each
      Q(num("Zara has 10 mangoes. 4 are green and the rest are yellow. How many are yellow?", 6, { hint: "Use the bond 4 + 6 = 10.", why: "4 + 6 = 10, so 6 are yellow.", tag: "facts.bonds10" }), "bonds", "apply",
        [num("Hana has 10 dates. 7 are soft and the rest are hard. How many are hard?", 3, { hint: "Use the bond 7 + 3 = 10.", why: "7 + 3 = 10, so 3 are hard.", tag: "facts.bonds10" })]),
      Q(fill("Find the missing number to make 10.", "{b1} + 3 = 10", [["7", "6", "8"]], { hint: "3 + 7 = 10.", why: "7 + 3 = 10.", tag: "facts.bonds10" }), "bonds", "apply",
        [fill("Which number makes 10 here?", "{b1} + 5 = 10", [["5", "4", "6"]], { hint: "Half of 10.", why: "5 + 5 = 10.", tag: "facts.bonds10" })]),
      Q(mc("Sam says 10 - 7 = 4 because 7 + 4 = 10. Is he right?", "No. 7 + 3 = 10, so 10 - 7 = 3", ["Yes, 7 + 4 = 10", "No, 10 - 7 = 5"], { hint: "What goes with 7 to make 10?", why: "7 + 4 = 11, not 10. 7 + 3 = 10, so 10 - 7 = 3.", tag: "facts.reason" }), "bonds", "reason",
        [mc("Nora says 10 - 4 = 5 because 4 + 5 = 10. Is she right?", "No. 4 + 6 = 10, so 10 - 4 = 6", ["Yes, 4 + 5 = 10", "No, 10 - 4 = 7"], { hint: "What goes with 4 to make 10?", why: "4 + 5 = 9, not 10. 4 + 6 = 10, so 10 - 4 = 6.", tag: "facts.reason" })]),
      Q(hot("Tap the picture that shows 6 + 7.", [["🔟", "A: a full frame and 3 more", 22, 50], ["🔟", "B: a full frame and 4 more", 50, 50], ["🔟", "C: a half frame and 7", 78, 50]], ["A: a full frame and 3 more"], { labels: true, hint: "6 + 4 fills the frame. How many are left?", why: "6 + 4 = 10 and 3 more is 13, so a full frame and 3 more.", tag: "facts.make_ten" }), "bonds20", "apply",
        [hot("Tap the picture that shows 6 + 8.", [["🔟", "A: a full frame and 3 more", 22, 50], ["🔟", "B: a full frame and 4 more", 50, 50], ["🔟", "C: a half frame and 8", 78, 50]], ["B: a full frame and 4 more"], { labels: true, hint: "6 + 4 fills the frame. How many are left?", why: "6 + 4 = 10 and 4 more is 14, so a full frame and 4 more.", tag: "facts.make_ten" })]),
      Q(sld("Slide to show double 10.", { min: 0, max: 20 }, 20, 0, { hint: "10 + 10.", why: "Double 10 is 20.", tag: "facts.doubles" }), "doubles", "recall",
        [sld("Slide to show double 6.", { min: 0, max: 20 }, 12, 0, { hint: "6 + 6.", why: "Double 6 is 12.", tag: "facts.doubles" })]),
      Q(num("What is 8 + 9?", 17, { hint: "Double 8 is 16. Add 1.", why: "8 + 8 = 16, and 1 more is 17.", tag: "facts.near_doubles" }), "doubles", "apply",
        [num("What is 9 + 10?", 19, { hint: "Double 9 is 18. Add 1.", why: "9 + 9 = 18, and 1 more is 19.", tag: "facts.near_doubles" })]),
      Q(ms("Which facts belong to the family 3, 6 and 9? Pick two.", ["3 + 6 = 9", "9 - 3 = 6"], ["9 - 6 = 4", "3 + 9 = 6"], { hint: "9 is the total.", why: "3 + 6 = 9 and 9 - 3 = 6 use all three numbers.", tag: "facts.families" }), "families", "apply",
        [ms("Which facts belong to the family 4, 5 and 9? Pick two.", ["4 + 5 = 9", "9 - 4 = 5"], ["9 + 4 = 5", "5 - 9 = 4"], { hint: "9 is the total.", why: "4 + 5 = 9 and 9 - 4 = 5 use all three numbers.", tag: "facts.families" })]),
      Q(mc("Which fact does NOT belong to the family 4, 7 and 11?", "11 - 7 = 3", ["4 + 7 = 11", "11 - 4 = 7"], { hint: "11 - 7 should give the other small number.", why: "11 - 7 = 4, not 3. The other facts are right.", tag: "facts.families" }), "families", "apply",
        [mc("Which fact does NOT belong to the family 5, 6 and 11?", "11 - 5 = 7", ["5 + 6 = 11", "11 - 6 = 5"], { hint: "11 - 5 should give the other small number.", why: "11 - 5 = 6, not 7. The other facts are right.", tag: "facts.families" })]),
      Q(mc("Zainab says in 3 + 7 + 4 you must add 3 + 7 first, or the answer changes. Is she right?", "No. The order does not change the total. 3 + 7 = 10 is just easier, then 14", ["Yes, the answer changes", "No, the total is 13"], { hint: "Try 4 + 3 first.", why: "4 + 3 = 7 and 7 + 7 = 14. Any order gives 14, but making 10 first is easier.", tag: "facts.reason" }), "families", "reason",
        [mc("Ben says in 6 + 4 + 5 you must add 4 + 5 first, or the answer changes. Is he right?", "No. The order does not change the total. 6 + 4 = 10 is just easier, then 15", ["Yes, the answer changes", "No, the total is 14"], { hint: "Try 6 + 4 first.", why: "6 + 4 = 10 and 10 + 5 = 15. Any order gives 15, but making 10 first is easier.", tag: "facts.reason" })]),
      Q(ord("Put these sums in order, smallest answer first.", ["5 + 4", "6 + 5", "7 + 7", "9 + 9"], { hint: "Work out each answer.", why: "The answers are 9, 11, 14 and 18.", tag: "facts.order_sums" }), "doubles", "apply",
        [ord("Order these sums, smallest answer first.", ["3 + 3", "4 + 5", "8 + 4", "10 + 10"], { hint: "Work out each answer.", why: "The answers are 6, 9, 12 and 20.", tag: "facts.order_sums" })]),
      Q(mc("Mira says 9 + 9 = 18, so 9 + 8 = 17. Is she right?", "Yes. 9 + 8 is one less than 9 + 9", ["No, 9 + 8 = 16", "No, 9 + 8 = 18"], { hint: "8 is one less than 9.", why: "Taking 1 off one 9 takes 1 off the answer, so 18 - 1 = 17.", tag: "facts.reason" }), "doubles", "reason",
        [mc("Ali says 7 + 7 = 14, so 7 + 6 = 13. Is he right?", "Yes. 7 + 6 is one less than 7 + 7", ["No, 7 + 6 = 12", "No, 7 + 6 = 14"], { hint: "6 is one less than 7.", why: "Taking 1 off one 7 takes 1 off the answer, so 14 - 1 = 13.", tag: "facts.reason" })]),
      Q(mat("Match each number to the double it comes from.", [["12", "double of 6"], ["16", "double of 8"], ["14", "double of 7"]], { hint: "Think of half.", why: "6 + 6 = 12, 8 + 8 = 16 and 7 + 7 = 14.", tag: "facts.doubles" }), "doubles", "apply",
        [mat("Join each number to the double it comes from.", [["18", "double of 9"], ["10", "double of 5"], ["8", "double of 4"]], { hint: "Think of half.", why: "9 + 9 = 18, 5 + 5 = 10 and 4 + 4 = 8.", tag: "facts.doubles" })]),
      Q(fill("Find the missing number.", "20 = {b1} + 12", [["8", "7", "9"]], { hint: "2 + 8 = 10, so 12 + 8 = 20.", why: "12 + 8 = 20.", tag: "facts.bonds20" }), "bonds20", "apply",
        [fill("Find the gap.", "20 = {b1} + 15", [["5", "4", "6"]], { hint: "5 + 5 = 10, so 15 + 5 = 20.", why: "15 + 5 = 20.", tag: "facts.bonds20" })]),
      Q(mc("Omar says 4 + 6 and 6 + 4 give different answers. Is he right?", "No. Both make 10. We can swap the numbers", ["Yes, 4 + 6 = 10 and 6 + 4 = 11", "Yes, the bigger number first is bigger"], { hint: "Count on from either number.", why: "Adding in either order gives the same total. 4 + 6 = 6 + 4 = 10.", tag: "facts.reason" }), "families", "reason",
        [mc("Ali says 3 + 8 and 8 + 3 give different answers. Is he right?", "No. Both make 11. We can swap the numbers", ["Yes, 3 + 8 = 11 and 8 + 3 = 12", "Yes, the bigger number first is bigger"], { hint: "Count on from either number.", why: "Adding in either order gives the same total. 3 + 8 = 8 + 3 = 11.", tag: "facts.reason" })]),
      Q(tf("Two less than 8 is 6.", true, { hint: "Count back 2.", why: "8, 7, 6. Two less than 8 is 6.", tag: "facts.one_more_less" }), "families", "recall",
        [tf("One more than 9 is 11.", false, { hint: "Count on 1.", why: "One more than 9 is 10, not 11.", tag: "facts.one_more_less" })]),
    ],
  }),
];
