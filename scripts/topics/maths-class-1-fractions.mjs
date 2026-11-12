import { SAY, SS, H, T, IMG, TIP, FACT, PHOTO, REVEAL, ACT, MAN, BRAIN, SUM, CHK, FRAC, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Coteach diagrams (see content/media/manifest.d/maths-class-1-fractions.json).
const COTEACH_A = {"type":"image","asset":"maths-class-1-fractions-d1-f1c96342.png","alt":"A fraction bar showing 1/2 above two quarters, showing that 1/2 = 2/4","caption":"1/2 = 2/4."};
const COTEACH_B = {"type":"image","asset":"maths-class-1-fractions-d2-7caa69b5.png","alt":"Two circles split into three parts, one with equal parts and one with unequal parts","caption":"Thirds must be equal parts."};
// Class 1 Maths topic 6: fractions (format 3.0). Standards from docs/CURRICULUM_V2.md.
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });
const PZ = (id, parts, shaded, x = 50, y = 44, size = 3, anim = "none") => [id, { kind: "fraction_pizza", parts, shaded }, x, y, size, anim];

const N = (q, sub, depth, alts) => ({ q, sub, depth, alts });
const APPLE = "maths-class-1-fractions-1-87623ee7.jpg";

const equal = {
  id: "equal", kind: "learn", title: "Equal parts and halves",
  blocks: [
    H("Welcome back, number explorer!"),
    SAY("Welcome back, number explorer! Today we cut things into equal parts. You will meet halves, quarters and thirds. These are fractions. We use them to share fairly.",
      T("Today we learn about fractions: halves, quarters and thirds.")),
    SAY("Look at this apple. It is cut into four slices. Are the slices all the same size? Have a look!",
      PHOTO(APPLE, "A red apple cut into four slices of different sizes", "An apple cut into four slices.", "Photo by Nikolai Chernichenko on Unsplash")),
    H("Stop 1: Equal parts"),
    SAY("A fraction is part of a whole. A whole is the complete thing, like a whole pizza. Fractions only work when the pieces are equal. Equal means exactly the same size. Look at these two cuts of pizza. In the first, the pieces are all the same size. In the second, one piece is huge and one is tiny. Only the first one is fair, so only the first one shows fractions.", T("A **fraction** is part of a **whole**. The parts must be **equal**.", "Equal parts are exactly the same size.")),
    IMG("🍕", "A pizza cut into equal parts shares fairly."),
    SAY("Look at the two bars. One half is the same size as two quarters.", COTEACH_A),
    CHK(mc("Which pizza is shared fairly?", "All the pieces are the same size", ["One piece is much bigger", "One piece is tiny"], { hint: "What does equal mean?", why: "Equal parts are all the same size.", tag: "fractions.equal" })),
    H("Stop 2: Halves"),
    SAY("When we cut something into two equal parts, each part is a half. Two halves make one whole. We write a half like this: one over two. Look at the pizza. Two equal parts, and one is coloured. One of two equal parts is one half.", T("Two equal parts make **halves**. Each part is 1/2 of the whole.", "Two halves make one whole.")),
    EXPP("Halves of a pizza",
      SS("Here is a whole pizza. We want to share it between two friends.", S("A whole pizza.", PZ("p", 1, 1))),
      SS("Cut it into two equal parts. One part is coloured. One of two equal parts is one half.", S("1 of 2 equal parts is 1/2.", PZ("p", 2, 1, 50, 44, 3, "pulse"), ["s", "✅", 50, 90, 2, "bounce", "1/2"]))),
    CHK(num("A cake is cut into 2 equal parts. How many parts make a whole cake?", 2, { hint: "Two halves make one whole.", why: "2 halves make 1 whole.", tag: "fractions.halves" })),
    SAY("Remember. A fraction is part of a whole. The parts must be equal. Two equal parts are halves.", SUM("A fraction is a part of a whole", "The parts must be equal", "Two equal parts are halves")),
    GLOSS({ fractions: "Equal parts of a whole.", fraction: "A part of a whole.", whole: "The complete thing.", equal: "Exactly the same size.", half: "One of two equal parts.", halves: "More than one half." }),
  ],
  mini: [
    mc("How many equal parts does a half come from?", "2", ["1", "4"], { hint: "Half means two parts.", why: "A half is one of 2 equal parts." }),
    tf("Fractions need equal parts.", true, { hint: "Think of sharing fairly.", why: "The parts must all be the same size." }),
    num("How many halves make a whole?", 2, { hint: "Two equal parts.", why: "2 halves make 1 whole." }),
    tf("One big piece and one tiny piece are two halves.", false, { hint: "Are the pieces equal?", why: "Halves must be equal." }),
  ],
};

const quarters = {
  id: "quarters", kind: "try", title: "Quarters and thirds",
  blocks: [
    H("Stop 1: Quarters"),
    SAY("Now cut each half in half again. That makes four equal parts. Each one is a quarter. We write a quarter as one over four. Look at the pizza. Four equal parts, and one coloured. Two quarters make a half. Four quarters make a whole. Fold a paper in half, then in half again. You can see quarters yourself!", T("Four equal parts make **quarters**. Each part is 1/4 of the whole.", "2 quarters make a half. 4 quarters make a whole.")),
    EXPP("Quarters of a pizza",
      SS("Here is one quarter. One of four equal parts.", S("1 of 4 equal parts is 1/4.", PZ("p", 4, 1))),
      SS("Two quarters. That is the same as one half.", S("2 quarters make a half.", PZ("p", 4, 2, 50, 44, 3, "pulse"))),
      SS("All four quarters make the whole pizza.", S("4 quarters make a whole.", PZ("p", 4, 4, 50, 44, 3, "pulse"), ["s", "✅", 50, 90, 2, "bounce", "4/4 = 1 whole"]))),
    ACT("Fold a paper quarter", ["A square of paper", "Colouring pencils"], ["Fold the paper in half. Open it. How many parts? Colour one half.", "Fold the paper in half again, and again the other way.", "Open it up. How many equal parts? Those are quarters.", "Colour one quarter. Colour two quarters. What fraction is that?"]),
    SAY("These circles are both split in three. Only one has equal parts. Equal parts are fair.", COTEACH_B),
    CHK(mc("How many quarters make a whole?", "4", ["2", "3"], { hint: "Four equal parts.", why: "4 quarters make 1 whole.", tag: "fractions.quarters" })),
    H("Stop 2: Thirds"),
    SAY("Cut a whole into three equal parts. Each part is a third. We write a third as one over three. A bar can show it too. Three equal parts, one coloured. One third. Three thirds make a whole.", T("Three equal parts make **thirds**. Each part is 1/3.", "3 thirds make a whole.")),
    FRAC("One third", 3, 1, "The bar has 3 equal parts and 1 is coloured."),
    MAN("Share into thirds", "You have 12 counters. Share them equally into 3 groups. How many in each group?", "🔴", 12, ["Group 1", "Group 2"]),
    CHK(mc("A bar is split into 3 equal parts. One is coloured. What fraction is coloured?", "1/3", ["1/2", "1/4"], { hint: "How many equal parts in all?", why: "1 of 3 equal parts is one third.", tag: "fractions.thirds" })),
    SAY("Remember. Four equal parts are quarters. Three equal parts are thirds. The more parts, the smaller each part is.", SUM("Four equal parts are quarters", "Three equal parts are thirds", "The more parts, the smaller each part")),
    GLOSS({ quarter: "One of four equal parts.", third: "One of three equal parts.", thirds: "Three equal parts of a whole.", quarters: "Four equal parts of a whole." }),
  ],
  mini: [
    mc("2 quarters make...", "a half", ["a whole", "a third"], { hint: "2 out of 4 equal parts.", why: "2 quarters = 1 half." }),
    num("How many quarters make one whole?", 4, { hint: "Four equal parts.", why: "4 quarters = 1 whole." }),
    tf("A third is bigger than a half.", false, { hint: "More parts means smaller parts.", why: "A half is bigger than a third." }),
    num("How many thirds make a whole?", 3, { hint: "Three equal parts.", why: "3 thirds = 1 whole." }),
  ],
};

const amounts = {
  id: "amounts", kind: "play", title: "Fractions of amounts",
  blocks: [
    H("Stop 1: Half of a number"),
    SAY("We can find a half of a group of things too. To find half, share into two equal groups. Half of eight sweets. Share eight between two. Four and four. Half of eight is four. Finding half is the same as dividing by two.", T("To find **half** of a number, share it into 2 equal groups.", "Half of 8 is 4.")),
    EXPP("Half of 8",
      SS("Here are eight sweets, in a pile.", S("8 sweets.", ["s", "🍬", 50, 40, 3, "none", "8 sweets"])),
      SS("Share them into two equal groups. Four in each group. Half of eight is four.", S("Half of 8 is 4.", ["a", "🍬", 28, 40, 3, "none", "4"], ["b", "🍬", 72, 40, 3, "none", "4"], ["t", "✅", 50, 88, 2, "bounce", "1/2 of 8 = 4"]))),
    SAY("Flip the cards and find the matching pairs.", BRAIN("memory_match", "Half match", "Find the matching pairs of cards.", ["🍕", "🍰", "🍪", "🍩", "🥧", "🍫"])),
    CHK(num("What is half of 10?", 5, { hint: "Share 10 into 2 equal groups.", why: "Half of 10 is 5.", tag: "fractions.half_of" })),
    H("Stop 2: A quarter of a number"),
    SAY("A quarter means one of four equal groups. To find a quarter, share into four equal groups. A quarter of twelve. Share twelve between four. Three in each group. A quarter of twelve is three. Here is a trick. Halve it twice. Half of twelve is six. Half of six is three.", T("To find a **quarter**, share into 4 equal groups.", "A quarter of 12 is 3. Or halve it twice: 12 → 6 → 3.")),
    IMG("🍪", "A quarter of 12 biscuits is 3."),
    REVEAL("What is a quarter of 20? Have a think first.", "5. Share 20 between 4 gives 5 each. Or half of 20 is 10, and half of 10 is 5."),
    CHK(mc("What is a quarter of 8?", "2", ["4", "1"], { hint: "Halve 8, then halve again.", why: "Half of 8 is 4. Half of 4 is 2.", tag: "fractions.quarter_of" })),
    SAY("Remember. Half means share into two. A quarter means share into four. Halving twice gives a quarter.", SUM("Half means share into 2 equal groups", "A quarter means share into 4 equal groups", "Halve twice to find a quarter")),
    GLOSS({ half: "One of two equal parts.", quarter: "One of four equal parts.", halve: "To cut or share into two equal parts.", share: "To give out equally." }),
  ],
  mini: [
    num("What is half of 6?", 3, { hint: "Share 6 between 2.", why: "Half of 6 is 3." }),
    num("What is half of 20?", 10, { hint: "Share 20 between 2.", why: "Half of 20 is 10." }),
    num("What is a quarter of 12?", 3, { hint: "Halve 12, then halve again.", why: "12, 6, 3." }),
    tf("Half of 8 is 3.", false, { hint: "4 + 4 = 8.", why: "Half of 8 is 4." }),
  ],
};

const use = {
  id: "use", kind: "use", title: "Fractions in real life",
  blocks: [
    H("Stop 1: Sharing fairly"),
    SAY("Fractions help us share fairly. Ayesha and her brother share a pizza cut in four equal parts. They each eat two parts. Two quarters is one half. So each of them eats half the pizza. If four friends share it, each gets one quarter. The more people, the smaller each share.", T("Fractions help us share. 4 quarters share between 2 people gives 2 quarters each, which is 1/2.", "More people means each share is smaller.")),
    EXPP("Sharing a pizza",
      SS("A pizza is cut into four equal parts. Ayesha and her brother share it.", S("4 quarters shared by 2 people.", PZ("p", 4, 4))),
      SS("Each person has two quarters. Two quarters is one half. Each person gets half the pizza.", S("Each person gets 2 quarters = 1/2.", PZ("p", 4, 2, 50, 44, 3, "pulse"), ["s", "✅", 50, 90, 2, "bounce", "1/2 each"]))),
    CHK(mc("A pizza is cut into 4 equal parts. Mum eats 1 part. What fraction did she eat?", "1/4", ["1/2", "1/3"], { hint: "1 part out of 4.", why: "1 of 4 equal parts is 1/4.", tag: "fractions.real_life" })),
    H("Stop 2: Spot the fraction"),
    SAY("Look around your home and find fractions. A clock face shows quarters. A chocolate bar has equal pieces. A sandwich cut in half. A packet of biscuits shared between four. What fractions can you spot today? Draw them in your book.", T("Look around and spot halves, quarters and thirds in everyday things.")),
    IMG("🔎", "Look for halves and quarters at home."),
    REVEAL("A cake is cut into 8 equal parts. You eat 4. What fraction did you eat? Have a think first.", "One half. 4 of 8 equal parts is the same as 1 of 2."),
    CHK(mc("Which is bigger, a half or a quarter of the same cake?", "A half", ["A quarter", "They are the same"], { hint: "Which piece is bigger when there are fewer parts?", why: "Fewer, bigger parts: a half is bigger than a quarter.", tag: "fractions.compare" })),
    SAY("Remember. Fractions share things fairly. A half is bigger than a quarter. Look for fractions around you.", SUM("Fractions share things fairly", "A half is bigger than a quarter", "Look for fractions around you")),
    GLOSS({ fraction: "A part of a whole.", fair: "The same for everyone.", slice: "A piece cut from something bigger.", share: "To give out equally." }),
  ],
  mini: [
    mc("A pizza is cut into 2 equal parts. You eat 1. What fraction?", "1/2", ["1/4", "1/3"], { hint: "1 of 2 equal parts.", why: "That is one half." }),
    tf("A quarter is smaller than a half.", true, { hint: "More parts, smaller parts.", why: "A quarter is smaller than a half." }),
    num("A pizza has 4 equal slices. You eat 3. How many quarters did you eat?", 3, { hint: "Each slice is a quarter.", why: "3 slices = 3 quarters." }),
    mc("Which fraction is the biggest?", "1/2", ["1/3", "1/4"], { hint: "Fewer parts means bigger parts.", why: "1/2 is bigger than 1/3 and 1/4." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Zara cuts the roti fairly", backdrop: "home", caption: "Zara learns halves and quarters from one roti.",
  scenes: [
    { caption: "One whole roti.", say: "Zara has one whole roti. She wants to share it fairly.",
      items: [{ id: "z", emoji: "👧", label: "Zara", x: 25, y: 56, size: 3, enter: "walk_right" }, { id: "p", prop: { kind: "fraction_pizza", parts: 1, shaded: 1 }, label: "1 whole", x: 72, y: 44, size: 3, enter: "pop" }] },
    { caption: "Cut in 2 equal parts.", say: "First she cuts it in two. Both parts are the same size.",
      items: [{ id: "p", prop: { kind: "fraction_pizza", parts: 2, shaded: 1 }, label: "1/2", x: 50, y: 44, size: 3, effect: "sparkle" }] },
    { caption: "Two halves = 1 whole.", say: "Each part is one half. Two halves make a whole.",
      items: [{ id: "p", prop: { kind: "fraction_pizza", parts: 2, shaded: 2 }, label: "2 halves", x: 50, y: 44, size: 3, effect: "glow" }] },
    { caption: "Cut again: quarters.", say: "Now she cuts each half again. That makes four equal parts.",
      items: [{ id: "p", prop: { kind: "fraction_pizza", parts: 4, shaded: 1 }, label: "1/4", x: 50, y: 44, size: 3, effect: "sparkle" }] },
    { caption: "2 quarters = 1 half.", say: "Two quarters cover the same space as one half!",
      items: [{ id: "p", prop: { kind: "fraction_pizza", parts: 4, shaded: 2 }, label: "2/4 = 1/2", x: 50, y: 44, size: 3, effect: "glow" }] },
    { caption: "A quarter of 12.", say: "Zara has twelve dates. She shares them into four equal groups.",
      items: [{ id: "d", emoji: "🌴", label: "12 dates", x: 50, y: 40, size: 3, anim: "bounce" }] },
    { caption: "3 in each group.", say: "Three dates in each group. A quarter of twelve is three!",
      items: [{ id: "a", emoji: "🌴🌴🌴", label: "3", x: 20, y: 46, size: 2 }, { id: "b", emoji: "🌴🌴🌴", label: "3", x: 40, y: 46, size: 2 }, { id: "c", emoji: "🌴🌴🌴", label: "3", x: 60, y: 46, size: 2 }, { id: "e", emoji: "🌴🌴🌴", label: "3", x: 80, y: 46, size: 2, effect: "sparkle" }] },
    { caption: "Shukriya, Zara!", say: "Equal parts make fair shares. Shukriya, Zara!",
      items: [{ id: "z", emoji: "👧", x: 30, y: 56, size: 3, anim: "bounce" }, { id: "h", emoji: "❤️", x: 70, y: 40, size: 3, effect: "hearts" }] },
  ],
};

export const topics = [
  topicLesson({
    slug: "maths-class-1-fractions", subject: "maths", cls: 1, topic: 6, title: "Fractions",
    summary: "Equal parts, halves, quarters and thirds, and finding fractions of amounts.",
    unit: "Topic 6: Fractions", difficulty: 1,
    objectives: ["Know that fractions are equal parts of a whole", "Name halves, quarters and thirds", "Find a half and a quarter of an amount"],
    success_criteria: ["I can say if parts are equal", "I can name a half, a quarter and a third", "I can find half of a small number"],
    real_life: "Sharing a pizza, cutting a cake and reading a clock.",
    standards: [
      { framework: "nc_england", code: "Y2 fractions", text: "Recognise, find, name and write fractions 1/3, 1/4, 2/4 and 3/4 of a length, shape, set of objects or quantity" },
      { framework: "pk_ncc", code: "M-01-A-21" },
      { framework: "cambridge", code: "2Nf.01" }, { framework: "cambridge", code: "2Nf.02" },
    ],
    warm_up: [
      num("What is 4 + 4?", 8, { hint: "Double 4.", why: "4 + 4 = 8." }),
      num("What is 10 - 5?", 5, { hint: "Half of 10.", why: "10 - 5 = 5." }),
      tf("Even numbers can be split into pairs.", true, { hint: "Think of shoes.", why: "Even numbers make pairs with none left over." }),
    ],
    intro: [],
    subs: [equal, quarters, amounts, use],
    clip,
    quiz: [
      { q: mc("Which shape is split into equal parts?", "A circle cut into 2 same-size parts", ["A circle with one big and one tiny part", "A square with parts of different sizes"], { hint: "Equal means the same size.", why: "Fractions need equal parts.", tag: "fractions.equal" }), sub: "equal", depth: "recall", alts: [mc("Which pizza is cut fairly?", "4 slices that are all the same size", ["3 big slices and 1 tiny slice", "2 slices of different sizes"], { hint: "Equal means the same size.", why: "Fractions need equal parts.", tag: "fractions.equal" }), mc("Which sandwich is cut into halves?", "2 parts that are exactly the same size", ["2 parts, one much bigger", "3 equal parts"], { hint: "A half is one of 2 equal parts.", why: "Halves are 2 equal parts.", tag: "fractions.equal" })] },
      { q: num("A pizza is cut into halves. How many halves make the whole pizza?", 2, { hint: "Two equal parts.", why: "2 halves make 1 whole.", tag: "fractions.halves" }), sub: "equal", depth: "recall", alts: [num("A chocolate bar is cut in halves. How many pieces is that?", 2, { hint: "Two equal parts.", why: "Halves means 2 pieces.", tag: "fractions.halves" }), num("How many halves are in one whole apple?", 2, { hint: "Two equal parts.", why: "2 halves make 1 whole.", tag: "fractions.halves" })] },
      { q: tf("A quarter is one of four equal parts.", true, { hint: "Quarter means four.", why: "A quarter is 1 of 4 equal parts.", tag: "fractions.quarters" }), sub: "quarters", depth: "recall", alts: [tf("A quarter is one of two equal parts.", false, { hint: "Quarter means four.", why: "A quarter is 1 of 4 equal parts.", tag: "fractions.quarters" }), tf("Four quarters make a whole.", true, { hint: "Count the parts.", why: "4 quarters make 1 whole.", tag: "fractions.quarters" })] },
      { q: fill("Complete the sentence.", "{b1} quarters make 1 whole, and {b2} thirds make 1 whole.", [["4", "2", "3"], ["3", "2", "4"]], { hint: "Quarters means four. Thirds means three.", why: "4 quarters and 3 thirds each make 1 whole.", tag: "fractions.parts" }), sub: "quarters", depth: "apply", alts: [fill("Finish the sentence.", "1 whole is {b1} halves or {b2} quarters.", [["2", "3", "4"], ["4", "2", "3"]], { hint: "Halves means two. Quarters means four.", why: "1 whole is 2 halves or 4 quarters.", tag: "fractions.parts" }), fill("Fill in the gaps.", "A whole has {b1} thirds and {b2} halves.", [["3", "2", "4"], ["2", "3", "4"]], { hint: "Thirds means three. Halves means two.", why: "A whole has 3 thirds and 2 halves.", tag: "fractions.parts" })] },
      { q: ms("Which are the same as one half? Pick two.", ["2 quarters", "1 of 2 equal parts"], ["1 of 3 equal parts", "1 of 4 equal parts"], { hint: "Think of the whole.", why: "2 quarters and 1 of 2 equal parts are both one half.", tag: "fractions.halves" }), sub: "quarters", depth: "apply", alts: [ms("Which are the same as one whole? Pick two.", ["4 quarters", "2 halves"], ["3 quarters", "1 half"], { hint: "Add up the parts.", why: "4 quarters and 2 halves both make a whole.", tag: "fractions.parts" }), ms("Which are quarters? Pick two.", ["1 of 4 equal parts", "2 of 8 equal parts"], ["1 of 3 equal parts", "1 of 2 equal parts"], { hint: "A quarter is one of four equal parts.", why: "1 of 4 and 2 of 8 are both a quarter.", tag: "fractions.quarters" })] },
      { q: ord("Put these in order, biggest part first.", ["Half", "Third", "Quarter", "Eighth"], { hint: "More parts means smaller parts.", why: "A half is biggest, then a third, then a quarter, then an eighth.", tag: "fractions.compare" }), sub: "quarters", depth: "apply", alts: [ord("Order these, biggest part first.", ["Whole", "Half", "Third", "Quarter"], { hint: "More parts means smaller parts.", why: "A whole is biggest, then a half, a third, and a quarter.", tag: "fractions.compare" }), ord("Arrange these, biggest part first.", ["Half", "Quarter", "Fifth", "Tenth"], { hint: "More parts means smaller parts.", why: "A half is biggest, then a quarter, a fifth, and a tenth.", tag: "fractions.compare" })] },
      { q: mat("Match each fraction to what it means.", [["1/2", "1 of 2 equal parts"], ["1/3", "1 of 3 equal parts"], ["1/4", "1 of 4 equal parts"]], { hint: "The bottom number is how many parts.", why: "The bottom number says how many equal parts.", tag: "fractions.notation" }), sub: "quarters", depth: "apply", alts: [mat("Join each fraction to its meaning.", [["1/2", "a half"], ["1/3", "a third"], ["1/4", "a quarter"]], { hint: "The bottom number is how many parts.", why: "1/2 is a half, 1/3 a third and 1/4 a quarter.", tag: "fractions.notation" }), mat("Pair each fraction with its meaning.", [["2/2", "a whole"], ["3/3", "a whole"], ["1/2", "a half"]].slice(0, 1).concat([["4/4", "a whole too"], ["2/4", "a half"]]), { hint: "Count the parts.", why: "2/2 is a whole, 4/4 is a whole too, 2/4 is a half.", tag: "fractions.notation" })] },
      { q: hot("Tap the pizza with a quarter coloured.", [["🍕", "Pizza A: 1 of 2 parts", 22, 50], ["🍕", "Pizza B: 1 of 4 parts", 50, 50], ["🍕", "Pizza C: 1 of 3 parts", 78, 50]], ["Pizza B: 1 of 4 parts"], { labels: true, hint: "A quarter is 1 of 4.", why: "Pizza B has 1 of 4 parts coloured.", tag: "fractions.quarters" }), sub: "quarters", depth: "apply", alts: [hot("Tap the pizza with a half coloured.", [["🍕", "Pizza A: 1 of 4 parts", 22, 50], ["🍕", "Pizza B: 1 of 3 parts", 50, 50], ["🍕", "Pizza C: 1 of 2 parts", 78, 50]], ["Pizza C: 1 of 2 parts"], { labels: true, hint: "A half is 1 of 2.", why: "Pizza C has 1 of 2 parts coloured.", tag: "fractions.halves" }), hot("Tap the pizza with a third coloured.", [["🍕", "Pizza A: 1 of 3 parts", 22, 50], ["🍕", "Pizza B: 1 of 2 parts", 50, 50], ["🍕", "Pizza C: 1 of 4 parts", 78, 50]], ["Pizza A: 1 of 3 parts"], { labels: true, hint: "A third is 1 of 3.", why: "Pizza A has 1 of 3 parts coloured.", tag: "fractions.thirds" })] },
      { q: sld("Slide to show half of 16.", { min: 0, max: 20 }, 8, 0, { hint: "Share 16 between 2.", why: "Half of 16 is 8.", tag: "fractions.half_of" }), sub: "amounts", depth: "apply", alts: [sld("Slide to show half of 12.", { min: 0, max: 20 }, 6, 0, { hint: "Share 12 between 2.", why: "Half of 12 is 6.", tag: "fractions.half_of" }), sld("Slide to show half of 18.", { min: 0, max: 20 }, 9, 0, { hint: "Share 18 between 2.", why: "Half of 18 is 9.", tag: "fractions.half_of" })] },
      { q: num("What is a quarter of 16?", 4, { hint: "Halve 16, then halve again.", why: "16, 8, 4.", tag: "fractions.quarter_of" }), sub: "amounts", depth: "apply", alts: [num("What is a quarter of 20?", 5, { hint: "Halve 20, then halve again.", why: "20, 10, 5.", tag: "fractions.quarter_of" }), num("Find a quarter of 12 stickers.", 3, { hint: "Halve 12, then halve again.", why: "12, 6, 3.", tag: "fractions.quarter_of" })] },
      { q: num("Share 12 sweets equally between 3 children. What is one third of 12?", 4, { hint: "Share 12 into 3 equal groups.", why: "One third of 12 is 4.", tag: "fractions.thirds" }), sub: "amounts", depth: "apply", alts: [num("Share 9 apples equally between 3 children. What is one third of 9?", 3, { hint: "Share 9 into 3 equal groups.", why: "One third of 9 is 3.", tag: "fractions.thirds" }), num("Share 15 stickers equally between 3 friends. What is one third of 15?", 5, { hint: "Share 15 into 3 equal groups.", why: "One third of 15 is 5.", tag: "fractions.thirds" })] },
      { q: mc("Sam says a quarter of a pizza is bigger than a half of the same pizza. Is he right?", "No. A half is bigger because there are fewer, bigger parts", ["Yes, 4 is bigger than 2", "Yes, they are the same size"], { hint: "Think about the size of each part.", why: "More parts means smaller parts, so a half is bigger than a quarter.", tag: "fractions.reason" }), sub: "use", depth: "reason", alts: [mc("Nora says a third of a cake is bigger than a half of the same cake. Is she right?", "No. A half is bigger because there are fewer, bigger parts", ["Yes, 3 is bigger than 2", "Yes, they are the same size"], { hint: "Think about the size of each part.", why: "More parts means smaller parts, so a half is bigger than a third.", tag: "fractions.reason" }), mc("Ali says a quarter of a sandwich is bigger than a third of the same sandwich. Is he right?", "No. A third is bigger because there are fewer, bigger parts", ["Yes, 4 is bigger than 3", "Yes, they are the same size"], { hint: "Think about the size of each part.", why: "More parts means smaller parts, so a third is bigger than a quarter.", tag: "fractions.reason" })] },
      { q: mc("Why must the parts be equal to make halves?", "If the parts are not the same size, nobody gets a fair half", ["Because halves are always red", "Because halves have to be small"], { hint: "Think about sharing a pizza fairly.", why: "Halves must be equal parts, or the sharing is not fair.", tag: "fractions.reason" }), sub: "equal", depth: "reason", alts: [mc("Why must the parts be equal to make quarters?", "If the parts are not the same size, they are not fair quarters", ["Because quarters are always round", "Because quarters have to be big"], { hint: "Think about sharing a cake fairly.", why: "Quarters must be equal parts.", tag: "fractions.reason" }), mc("Why must the parts be equal to make thirds?", "If the parts are not the same size, they are not fair thirds", ["Because thirds are always small", "Because thirds are always red"], { hint: "Think about sharing a chocolate bar fairly.", why: "Thirds must be equal parts.", tag: "fractions.reason" })] },
      { q: mc("Aisha cuts a cake into 4 equal parts and eats 2. Her brother cuts a cake of the same size into 2 equal parts and eats 1. Who ate more cake?", "They ate the same amount", ["Aisha ate more", "Her brother ate more"], { hint: "2 quarters is the same as 1 half.", why: "2 quarters equal 1 half, so they ate the same.", tag: "fractions.reason" }), sub: "use", depth: "reason", alts: [mc("Hana cuts a pizza into 4 equal parts and eats 2. Her sister cuts a pizza of the same size into 2 equal parts and eats 1. Who ate more pizza?", "They ate the same amount", ["Hana ate more", "Her sister ate more"], { hint: "2 quarters is the same as 1 half.", why: "2 quarters equal 1 half, so they ate the same.", tag: "fractions.reason" }), mc("Zain cuts a loaf into 4 equal slices and eats 2. His mum cuts a loaf of the same size into 2 equal slices and eats 1. Who ate more bread?", "They ate the same amount", ["Zain ate more", "His mum ate more"], { hint: "2 quarters is the same as 1 half.", why: "2 quarters equal 1 half, so they ate the same.", tag: "fractions.reason" })] },
      { q: mc("Layla says half of 10 is 4 because 4 + 4 = 8, and 8 is nearly 10. Is she right?", "No. Half of 10 is 5, because 5 + 5 = 10", ["Yes, half of 10 is 4", "No, half of 10 is 6"], { hint: "Half means two equal groups that make the whole.", why: "Two equal groups of 5 make 10, so half of 10 is 5.", tag: "fractions.reason" }), sub: "amounts", depth: "reason", alts: [mc("Omar says half of 12 is 5 because 5 + 5 = 10. Is he right?", "No. Half of 12 is 6, because 6 + 6 = 12", ["Yes, half of 12 is 5", "No, half of 12 is 7"], { hint: "Half means two equal groups that make the whole.", why: "Two equal groups of 6 make 12, so half of 12 is 6.", tag: "fractions.reason" }), mc("Mina says half of 14 is 6 because 6 + 6 = 12. Is she right?", "No. Half of 14 is 7, because 7 + 7 = 14", ["Yes, half of 14 is 6", "No, half of 14 is 8"], { hint: "Half means two equal groups that make the whole.", why: "Two equal groups of 7 make 14, so half of 14 is 7.", tag: "fractions.reason" })] },
      // ----- upgrade: 15 new mains (q16-q30), 1 variant each
      N(hot("Tap the shape with one third shaded.", [["🟦", "A: 1 of 3 equal parts", 22, 50], ["🟦", "B: 1 of 2 equal parts", 50, 50], ["🟦", "C: 1 of 4 equal parts", 78, 50]], ["A: 1 of 3 equal parts"], { labels: true, hint: "A third is 1 of 3 equal parts.", why: "Shape A has 1 of 3 equal parts shaded.", tag: "fractions.thirds" }), "quarters", "apply",
        [hot("Tap the bar with one quarter shaded.", [["🟦", "A: 1 of 3 equal parts", 22, 50], ["🟦", "B: 1 of 2 equal parts", 50, 50], ["🟦", "C: 1 of 4 equal parts", 78, 50]], ["C: 1 of 4 equal parts"], { labels: true, hint: "A quarter is 1 of 4 equal parts.", why: "Bar C has 1 of 4 equal parts shaded.", tag: "fractions.quarters" })]),
      N(tf("Three quarters of a pizza is 3 of 4 equal parts.", true, { hint: "Quarters come in fours.", why: "3 quarters is 3 of the 4 equal parts.", tag: "fractions.three_quarters" }), "quarters", "apply",
        [tf("Two thirds of a cake is 2 of 4 equal parts.", false, { hint: "Thirds come in threes.", why: "Two thirds is 2 of 3 equal parts.", tag: "fractions.three_quarters" })]),
      N(fill("Count the quarters.", "1 quarter + 1 quarter = {b1} quarters = 1 {b2}", [["2", "3", "4"], ["half", "whole", "third"]], { hint: "Two quarters make a half.", why: "2 quarters make 1 half.", tag: "fractions.equivalent" }), "quarters", "apply",
        [fill("Count the thirds.", "1 third + 1 third + 1 third = {b1} thirds = 1 {b2}", [["3", "2", "4"], ["whole", "half", "quarter"]], { hint: "Three thirds make the whole.", why: "3 thirds make 1 whole.", tag: "fractions.equivalent" })]),
      N(ms("Which two show a whole? Pick two.", ["3 thirds", "4 quarters"], ["3 quarters", "2 thirds"], { hint: "All the equal parts together.", why: "3 thirds and 4 quarters each make a whole.", tag: "fractions.whole" }), "quarters", "apply",
        [ms("Which two show a whole? Choose two.", ["2 halves", "3 thirds"], ["1 half", "2 quarters"], { hint: "All the equal parts together.", why: "2 halves and 3 thirds each make a whole.", tag: "fractions.whole" })]),
      N(ord("Put these in order, smallest part first.", ["Eighth", "Quarter", "Third", "Half"], { hint: "More parts means smaller parts.", why: "An eighth is smallest, then a quarter, a third and a half.", tag: "fractions.compare" }), "quarters", "apply",
        [ord("Order these, smallest part first.", ["Tenth", "Fifth", "Quarter", "Half"], { hint: "More parts means smaller parts.", why: "A tenth is smallest, then a fifth, a quarter and a half.", tag: "fractions.compare" })]),
      N(mat("Match each picture story to its fraction.", [["Pizza cut in 2, 1 eaten", "1/2"], ["Cake cut in 4, 1 eaten", "1/4"], ["Bar cut in 3, 1 eaten", "1/3"]], { hint: "The bottom number is how many equal parts.", why: "1 of 2 is 1/2, 1 of 4 is 1/4 and 1 of 3 is 1/3.", tag: "fractions.notation" }), "equal", "apply",
        [mat("Match each story to its fraction.", [["Roti cut in 4, 1 eaten", "1/4"], ["Apple cut in 2, 1 eaten", "1/2"], ["Cake cut in 3, 1 eaten", "1/3"]], { hint: "The bottom number is how many equal parts.", why: "1 of 4 is 1/4, 1 of 2 is 1/2 and 1 of 3 is 1/3.", tag: "fractions.notation" })]),
      N(sld("Slide to show a quarter of 8.", { min: 0, max: 10 }, 2, 0, { hint: "Halve 8, then halve again.", why: "8, 4, 2. A quarter of 8 is 2.", tag: "fractions.quarter_of" }), "amounts", "apply",
        [sld("Slide to show a quarter of 20.", { min: 0, max: 10 }, 5, 0, { hint: "Halve 20, then halve again.", why: "20, 10, 5. A quarter of 20 is 5.", tag: "fractions.quarter_of" })]),
      N(num("What is half of 14?", 7, { hint: "Share 14 into 2 equal groups.", why: "7 + 7 = 14, so half of 14 is 7.", tag: "fractions.half_of" }), "amounts", "apply",
        [num("What is half of 18?", 9, { hint: "Share 18 into 2 equal groups.", why: "9 + 9 = 18, so half of 18 is 9.", tag: "fractions.half_of" })]),
      N(mc("What is a third of 6?", "2", ["3", "1"], { hint: "Share 6 into 3 equal groups.", why: "3 groups of 2 make 6, so a third of 6 is 2.", tag: "fractions.third_of" }), "amounts", "apply",
        [mc("What is a third of 15?", "5", ["3", "10"], { hint: "Share 15 into 3 equal groups.", why: "3 groups of 5 make 15, so a third of 15 is 5.", tag: "fractions.third_of" })]),
      N(mc("Zara cuts a roti into 4 equal pieces and eats 1. What fraction of the roti is left?", "3/4", ["1/4", "1/2"], { hint: "How many of the 4 pieces are left?", why: "4 pieces and 1 eaten leaves 3 of the 4, which is 3/4.", tag: "fractions.real_life" }), "use", "apply",
        [mc("Hana cuts a pizza into 3 equal slices and eats 1. What fraction of the pizza is left?", "2/3", ["1/3", "1/2"], { hint: "How many of the 3 slices are left?", why: "3 slices and 1 eaten leaves 2 of the 3, which is 2/3.", tag: "fractions.real_life" })]),
      N(num("Share 8 sweets equally between 4 friends. What is one quarter of 8?", 2, { hint: "Share 8 into 4 equal groups.", why: "8 ÷ 4 = 2, so one quarter of 8 is 2.", tag: "fractions.share_quarter" }), "amounts", "apply",
        [num("Share 20 stickers equally between 4 friends. What is one quarter of 20?", 5, { hint: "Share 20 into 4 equal groups.", why: "20 ÷ 4 = 5, so one quarter of 20 is 5.", tag: "fractions.share_quarter" })]),
      N(mc("Omar says 1/3 is bigger than 1/2 because 3 is bigger than 2. Is he right?", "No. A half is bigger, because 2 parts are bigger than 3 parts", ["Yes, 3 is bigger than 2", "Yes, they are the same size"], { hint: "More parts means each part is smaller.", why: "Sharing into 3 makes smaller parts than sharing into 2, so 1/2 is bigger.", tag: "fractions.reason_compare" }), "use", "reason",
        [mc("Hana says 1/4 is bigger than 1/3 because 4 is bigger than 3. Is she right?", "No. A third is bigger, because 3 parts are bigger than 4 parts", ["Yes, 4 is bigger than 3", "Yes, they are the same size"], { hint: "More parts means each part is smaller.", why: "Sharing into 4 makes smaller parts than sharing into 3, so 1/3 is bigger.", tag: "fractions.reason_compare" })]),
      N(mc("Mira says 2/4 is equal to a half. Is she right?", "Yes. 2 quarters make the same amount as 1 half", ["No, 2/4 is bigger because 4 is bigger", "No, 2/4 is smaller"], { hint: "Fold a paper in half, then in half again.", why: "2 of 4 equal parts cover half of the whole, so 2/4 = 1/2.", tag: "fractions.reason_equivalent" }), "quarters", "reason",
        [mc("Ali says 3/6 is equal to a half. Is he right?", "Yes. 3 of 6 equal parts is half of the whole", ["No, 3/6 is bigger because 6 is bigger", "No, 3/6 is smaller"], { hint: "Half of 6 is 3.", why: "3 of 6 equal parts is half of the whole, so 3/6 = 1/2.", tag: "fractions.reason_equivalent" })]),
      N(mc("Ben says any line down the middle of a shape makes two halves. Is he right?", "No. The two parts must be the same size", ["Yes, any line in the middle works", "No, you must cut in four"], { hint: "Halves must be equal.", why: "Halves are 2 equal parts. A line down the middle may leave unequal parts.", tag: "fractions.reason_equal" }), "equal", "reason",
        [mc("Mina says cutting a pizza into 2 pieces always makes halves. Is she right?", "No. The two pieces must be the same size", ["Yes, 2 pieces are always halves", "No, you must cut in three"], { hint: "Halves must be equal.", why: "Halves are 2 equal parts. Two pieces of different sizes are not halves.", tag: "fractions.reason_equal" })]),
      N(mc("Hana says a quarter of 12 is 4 because a quarter means 4 things. Is she right?", "No. A quarter means 1 of 4 equal groups, so it is 3", ["Yes, a quarter is always 4", "No, it is 6"], { hint: "Share 12 into 4 equal groups.", why: "12 ÷ 4 = 3. The 4 is how many groups, not how many things.", tag: "fractions.reason_quarter_of" }), "amounts", "reason",
        [mc("Zain says a quarter of 20 is 4 because a quarter means 4 things. Is he right?", "No. A quarter means 1 of 4 equal groups, so it is 5", ["Yes, a quarter is always 4", "No, it is 10"], { hint: "Share 20 into 4 equal groups.", why: "20 ÷ 4 = 5. The 4 is how many groups, not how many things.", tag: "fractions.reason_quarter_of" })]),
    ],
  }),
];
