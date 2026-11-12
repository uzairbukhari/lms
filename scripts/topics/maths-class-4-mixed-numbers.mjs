import { SAY, SS, H, T, IMG, PHOTO, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Coteach diagrams (see content/media/manifest.d/maths-class-4-mixed-numbers.json).
const COTEACH_A = {"type":"image","asset":"maths-class-4-mixed-numbers-d1-073da85e.png","alt":"Two pizza diagrams: one whole pizza and three quarters, labelled 1 3/4","caption":"7/4 = 1 3/4."};
const COTEACH_B = {"type":"image","asset":"maths-class-4-mixed-numbers-d2-bfce9b9c.png","alt":"A number line from 0 to 3 in quarters with 1 1/4 and 2 3/4 marked","caption":"Mixed numbers on a number line."};
// Class 4 Maths topic 8: Mixed numbers and improper fractions (NEW, format 3.0).
// Story thread: Ayesha's family shares naan and pizza at an Eid lunch in Karachi.
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });
const HB = (text, backdrop) => ({ ...H(text), backdrop });
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });
const OK = (label) => ["ok", "✅", 50, 90, 2, "bounce", label];
const PIZZA_PHOTO = "maths-class-4-mixed-numbers-1-c806412c.jpg";

// ---------------------------------------------------------------------------------------------- 1. learn
const moreThanOne = {
  id: "more_than_one", kind: "learn", title: "More than one whole",
  blocks: [
    HB("Ayesha and the naan", "home"),
    SAY("It is Eid lunch. Ayesha's family has pizza and naan. Some pieces are bigger than one whole. We can write them in two ways. Let's find out how.",
      PHOTO(PIZZA_PHOTO, "Slices of pepperoni pizza on an orange background", "A pizza cut into slices shows fractions bigger than one whole.", "Photo by Tamas Pap on Unsplash")),
    HB("Stop 1: Quarters make a whole", "classroom"),
    SAY("Cut a naan into quarters. Four quarters make one whole naan. Now take seven quarters. That is one whole naan and three quarters left over. We write it as a mixed number: one and three quarters, or 1 3/4.",
      T("A **mixed number** has a whole part and a fraction part: 1 3/4.", "7 quarters = 1 whole and 3 quarters = 1 3/4.")),
    EXPP("7 quarters is 1 3/4",
      SS("Here is one whole naan, cut into four quarters. All four are shaded.", S("4 quarters = 1 whole", ["n", "🫓", 50, 50, 3, "none", "4/4 = 1"])),
      SS("Add three more quarters. That is seven quarters in all.", S("7 quarters", ["n", "🫓", 30, 50, 3, "none", "4/4"], ["m", "🫓", 70, 50, 2, "pulse", "3/4"])),
      SS("One whole and three quarters. We write it 1 3/4.", S("1 3/4", ["n", "🫓", 30, 50, 2, "none", "1 whole"], ["m", "🫓", 70, 50, 2, "none", "3/4"], OK("7/4 = 1 3/4")))),
    SAY("Seven quarters make one whole pizza and three quarters. We write one and three quarters.", COTEACH_A),
    CHK(mc("How many quarters make one whole?", "4", ["3", "8"], { hint: "Think about four equal pieces.", why: "Four quarters make one whole.", tag: "mixed.whole" })),
    HB("Stop 2: Write it and read it", "classroom"),
    SAY("Read a mixed number in words. Two and one half is 2 1/2. Say the whole first, then 'and', then the fraction. Mind the small words: one and one half, not one one-half.",
      T("Say **the whole, then and, then the fraction**: 2 1/2 is two and a half.", "3 1/3 is three and one third.")),
    IMG("🥖", "Two whole naans and one half naan make 2 1/2."),
    CHK(mc("How do you read 2 1/2?", "Two and a half", ["Two halves", "Twenty-one halves"], { hint: "Whole first, then the fraction.", why: "2 1/2 is two wholes and a half.", tag: "mixed.read" })),
    SAY("Remember. Four quarters make a whole. A mixed number is a whole and a fraction.", SUM("4 quarters make 1 whole", "A mixed number has a whole part and a fraction part", "Say the whole, then and, then the fraction")),
    GLOSS({ "mixed number": "A whole number and a fraction, like 1 3/4.", whole: "A full one, like one whole naan.", quarters: "Four equal parts of one whole.", "improper fraction": "A fraction bigger than one whole, like 7/4." }),
  ],
  mini: [
    num("How many eighths make one whole?", 8, { hint: "Count the equal pieces.", why: "Eight eighths make one whole." }),
    mc("What is 2 and 1 quarter?", "2 1/4", ["2 4/1", "1 2/4"], { hint: "The whole is 2.", why: "Two wholes and one quarter is 2 1/4." }),
    tf("1 2/3 has a whole part of 1.", true, { hint: "Look at the number before the fraction.", why: "The whole part is 1." }),
    ord("Put these in order, smallest first.", ["1 1/4", "1 3/4", "2", "1 1/2"], { hint: "Compare the wholes, then the fractions.", why: "1 1/4, 1 1/2, 1 3/4, 2." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const converting = {
  id: "converting", kind: "try", title: "Improper to mixed, and back",
  blocks: [
    HB("Stop 1: Group the quarters", "classroom"),
    SAY("Here is a big fraction: 13 quarters. Group them in fours. Each group of four is one whole. How many full groups are there? Three groups make 12 quarters. One quarter is left over. So 13/4 = 3 1/4.",
      T("To change **improper to mixed**: group by the bottom number. Count the wholes, then the leftover.", "13/4: 13 ÷ 4 = 3 remainder 1, so 3 1/4.")),
    EXPP("13/4 grouped in fours",
      SS("Thirteen quarters in a row.", S("13 quarters", ["q", "🟦", 50, 50, 3, "none", "13/4"])),
      SS("Make groups of four. Each group is one whole. Three full groups.", S("3 wholes", ["g1", "🟦", 25, 40, 2, "none", "4"], ["g2", "🟦", 50, 40, 2, "none", "4"], ["g3", "🟦", 75, 40, 2, "pulse", "4"])),
      SS("One quarter is left over. So 13/4 is 3 wholes and 1 quarter.", S("13/4 = 3 1/4", ["q", "🟦", 50, 50, 2, "none", "13/4"], OK("13/4 = 3 1/4")))),
    SAY("Find one and a quarter and two and three quarters on the number line.", COTEACH_B),
    CHK(num("How many whole ones are in 17/4?", 4, { hint: "Count full groups of four.", why: "Four groups of four make 16, and 1 quarter is left. So 17/4 = 4 1/4.", tag: "mixed.convert" })),
    HB("Stop 2: Mixed back to improper", "classroom"),
    SAY("Now go back. Two and three quarters is 2 3/4. Each whole has four quarters. Two wholes are eight quarters. Add the three more quarters. Eight add three makes eleven. So 2 3/4 = 11/4.",
      T("To change **mixed to improper**: multiply the whole by the bottom, then add the top.", "2 3/4 = (2 × 4 + 3)/4 = 11/4.")),
    IMG("🧮", "2 × 4 = 8, then 8 + 3 = 11. So 2 3/4 = 11/4."),
    CHK(fill("Convert 3 1/4 to an improper fraction.", "3 1/4 = {b1}/4.", [["13", "12", "14"]], { hint: "3 × 4 + 1.", why: "3 × 4 = 12, and 12 + 1 = 13.", tag: "mixed.convert" })),
    ACT("Quarter strips", ["Paper strips cut into 4 equal parts", "Pencil"], ["Colour 13 quarters across three strips of four, and one spare.", "Count the full strips. That is the whole part.", "Count the spare quarters. That is the fraction part.", "Write the answer as a mixed number."]),
    SAY("Remember. Improper to mixed: group and count. Mixed to improper: whole times bottom, then add the top.", SUM("Improper to mixed: group by the bottom", "Mixed to improper: whole × bottom + top", "The bottom number stays the same")),
    GLOSS({ "improper to mixed": "Changing a fraction bigger than one into a whole and a fraction.", "mixed to improper": "Changing a mixed number into one fraction.", "improper fraction": "A fraction where the top number is bigger than the bottom, like 13/4.", group: "Put things into equal sets.", convert: "Change a number into another form with the same value.", remainder: "What is left over." }),
  ],
  mini: [
    num("How many wholes are in 9/4?", 2, { hint: "Two groups of four.", why: "9/4 = 2 1/4." }),
    mc("What is 3 1/2 as a fraction over 2?", "7/2", ["5/2", "3/2"], { hint: "3 × 2 + 1.", why: "3 × 2 = 6, and 6 + 1 = 7." }),
    tf("9/5 is the same as 1 4/5.", true, { hint: "Five fifths make one whole.", why: "5 fifths are 1 whole, and 4 fifths are left." }),
    ms("Pick the two whole-and-fraction numbers.", ["1 2/3", "2 1/5"], ["5/2", "7/4"], { hint: "A whole number and a fraction together.", why: "1 2/3 and 2 1/5 have a whole part and a fraction part." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const fractionsLine = {
  id: "fractions_line", kind: "play", title: "Fractions on the number line",
  blocks: [
    HB("Stop 1: The 0 to 2 line", "classroom"),
    SAY("Let's put mixed numbers on a number line. The line goes from 0 to 2. Halfway is one. Quarters sit between each whole. One and one quarter sits just after 1.",
      T("On a number line, **1 1/4** sits one quarter past 1.", "Count the quarters: 1, 1 1/4, 1 1/2, 1 3/4, 2.")),
    EXPP("Quarters from 1 to 2",
      SS("Start at 1. Each step is one quarter.", S("1", ["n", "📏", 50, 50, 3, "none", "1"])),
      SS("One step: 1 1/4. Two steps: 1 1/2. Three steps: 1 3/4.", S("1 1/4, 1 1/2, 1 3/4", ["n", "📏", 30, 50, 2, "none", "1"], ["m", "📍", 70, 50, 2, "pulse", "1 3/4"])),
      SS("One more step reaches 2 wholes, which is 8 quarters.", S("2 = 8/4", ["n", "📏", 50, 50, 2, "none"], OK("1 3/4 is just before 2")))),
    CHK(mc("Which mixed number is closer to 2?", "1 4/5", ["1 1/5", "1 2/5"], { hint: "How far is each from 2?", why: "1 4/5 is only one fifth away from 2. 1 1/5 is four fifths away.", tag: "mixed.line" })),
    HB("Stop 2: Bigger or smaller?", "classroom"),
    SAY("Compare mixed numbers. Look at the whole first. Then the fraction. One and three fifths is smaller than one and four fifths. Three fifths is less than four fifths.",
      T("**Compare the wholes first**, then the fractions.", "1 3/5 < 1 4/5.")),
    CHK(tf("1 4/5 is bigger than 1 2/5.", true, { hint: "Compare the fractions.", why: "Four fifths is more than two fifths, so 1 4/5 is bigger.", tag: "mixed.compare" })),
    SAY("Brain break. Match the pairs.", BRAIN("memory_match", "Quarter pairs", "Find the matching fractions.", ["🫓", "🍕", "🥖", "🥧", "🍞", "🥯"])),
    ACT("Number line at home", ["Paper strip", "Pencil and ruler"], ["Draw a line from 0 to 2.", "Mark halves, then quarters.", "Write 1 3/4 at the right place.", "Check: how far is it from 2?"]),
    SAY("Remember. The whole comes first. Between two wholes, count the quarters or fifths.", SUM("Compare the wholes first", "Count equal steps on the line", "Four quarters make one whole")),
    GLOSS({ "1 1/4": "One whole and one quarter.", "number line": "A line with numbers in order, like a ruler.", between: "In the middle of two numbers.", compare: "Look at how two numbers are different.", "is bigger than": "Has a greater value." }),
  ],
  mini: [
    mc("Which is halfway between 1 and 2?", "1 1/2", ["1 1/4", "2 1/2"], { hint: "Halfway is two quarters.", why: "1 1/2 is halfway." }),
    num("How many quarters is 2 wholes?", 8, { hint: "Four quarters per whole.", why: "2 × 4 = 8." }),
    tf("1 1/4 is smaller than 1 1/2.", true, { hint: "One quarter is less than two quarters.", why: "1 1/4 is one quarter after 1." }),
    ord("Put these in order, smallest first.", ["2 1/3", "1 2/3", "2", "1 1/3"], { hint: "Compare the wholes first.", why: "1 1/3, 1 2/3, 2, 2 1/3." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const recipes = {
  id: "recipes", kind: "use", title: "Recipes and pizzas",
  blocks: [
    HB("Stop 1: Rice for the biryani", "home"),
    SAY("Ayesha's mum makes rice for lunch. The recipe needs two and a half cups of rice. She uses one and a half cups for the first pot. How much rice is left for the second pot?",
      T("Two and a half cups take away one and a half cups: 2 1/2 − 1 1/2 = 1.", "Subtract the wholes and the fractions.")),
    EXPP("2 1/2 cups of rice",
      SS("Two whole cups, and half a cup.", S("2 1/2 cups", ["r", "🥣", 50, 50, 3, "none", "2 1/2"])),
      SS("Take away one whole cup and one half cup.", S("2 1/2 − 1 1/2", ["r", "🥣", 30, 50, 2, "none", "2 1/2"], ["t", "➖", 70, 50, 2, "pulse", "1 1/2"])),
      SS("One whole cup is left.", S("1", ["r", "🥣", 50, 50, 2, "none"], OK("2 1/2 − 1 1/2 = 1")))),
    CHK(num("A pizza is cut into 8 slices. Ali eats 3 slices and Sam eats 4. How many eighths are eaten?", 7, { hint: "Add the tops. Keep the bottom.", why: "3 + 4 = 7, so 7/8 is eaten.", tag: "mixed.add" })),
    HB("Stop 2: Adding within a whole", "home"),
    SAY("Add 3/8 and 4/8. The bottoms are the same, so just add the tops. Three eighths and four eighths make seven eighths. The bottom number stays eight.",
      T("**Same bottom number**: add the tops and keep the bottom. 3/8 + 4/8 = 7/8.", "Do not add the bottoms.")),
    EXPP("3/8 + 4/8",
      SS("Three eighths of a pizza.", S("3/8", ["p", "🍕", 50, 50, 3, "none", "3/8"])),
      SS("Add four more eighths. Seven eighths in all.", S("3/8 + 4/8", ["p", "🍕", 30, 50, 2, "none", "3/8"], ["q", "🍕", 70, 50, 2, "pulse", "4/8"])),
      SS("Seven eighths. The pizza is still cut into eight.", S("7/8", ["p", "🍕", 50, 50, 2, "none"], OK("3/8 + 4/8 = 7/8")))),
    CHK(mc("Zara adds 7/8 and 3/8 and gets 10/8. What is 10/8 as a mixed number?", "1 2/8", ["1 3/8", "2 2/8"], { hint: "Eight eighths make one whole.", why: "10/8 = 8/8 + 2/8 = 1 2/8.", tag: "mixed.convert_add" })),
    ACT("Pizza or naan at home", ["Paper circles", "Pencil"], ["Cut a circle into 8 slices.", "Colour 5 slices. What fraction is coloured?", "Add 4 more slices. How many slices now?", "Write the answer as a mixed number if it is more than 1 whole."]),
    SAY("Remember. Same bottom: add the tops. More than one whole: write a mixed number.", SUM("Same bottom: add the tops", "Keep the bottom number", "Over one whole: write a mixed number")),
    GLOSS({ "same bottom number": "Fractions with the same bottom number, so the pieces are the same size.", recipe: "Instructions and amounts for cooking.", "same denominator": "Fractions with the same bottom number.", slice: "One piece of a whole pizza or naan.", "mixed number": "A whole number and a fraction." }),
  ],
  mini: [
    num("Two cups of flour plus one and a half cups. What is the total in cups?", 3.5, { tol: 0.05, hint: "Add the wholes, then the halves.", why: "2 + 1 1/2 = 3 1/2, which is 3.5." }),
    num("What is 2/6 + 3/6 in sixths?", 5, { hint: "Add the tops.", why: "2 + 3 = 5, so 5/6." }),
    mc("What is 5/9 + 2/9?", "7/9", ["7/18", "10/9"], { hint: "Add the tops only.", why: "5 + 2 = 7 and the bottom stays 9." }),
    tf("A pizza of 8 slices with 5 eaten has 3/8 left.", true, { hint: "8 take away 5.", why: "8 − 5 = 3, so 3/8 is left." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "The naan that is more than one", backdrop: "home", caption: "A baker cuts naan into quarters and turns seven quarters into a mixed number.",
  scenes: [
    { caption: "The baker.", say: "This is Uncle Hamid. He bakes naan for the Eid lunch in Karachi.",
      items: [{ id: "h", emoji: "👨", label: "Uncle Hamid", x: 22, y: 56, size: 3, anim: "bounce", enter: "walk_right" }, { id: "n", emoji: "🫓", label: "naan", x: 72, y: 46, size: 3, enter: "pop" }] },
    { caption: "Cut into quarters.", say: "He cuts one naan into four equal quarters. Each piece is one quarter.",
      items: [{ id: "q", prop: { kind: "fraction_bar", parts: 4, shaded: 4 }, label: "4/4 = 1", x: 50, y: 46, size: 3, enter: "grow" }] },
    { caption: "Seven quarters.", say: "Now he has seven quarters. That is more than one whole naan.",
      items: [{ id: "q", prop: { kind: "fraction_bar", parts: 4, shaded: 3 }, label: "3 more quarters", x: 50, y: 46, size: 3, effect: "glow" }] },
    { caption: "Regroup.", say: "One whole naan and three quarters. We write it as one and three quarters.",
      camera: { zoom: 1.2, x: 50, y: 46 },
      items: [{ id: "m", emoji: "🫓", label: "1 3/4", x: 50, y: 42, size: 3, effect: "sparkle" }] },
    { caption: "Shukriya!", say: "Seven quarters is one and three quarters. Shukriya, Uncle Hamid!",
      items: [{ id: "h", emoji: "👨", label: "Uncle Hamid", x: 22, y: 56, size: 3, anim: "bounce" }, { id: "r", emoji: "🎉", label: "7/4 = 1 3/4", x: 70, y: 40, size: 2, effect: "hearts" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- more_than_one (q1-q8)
  Q(num("How many quarters are in 1 whole?", 4, { hint: "Four equal pieces make a whole.", why: "Four quarters make one whole.", tag: "mixed.whole" }), "more_than_one", "recall",
    [num("How many eighths are in 1 whole?", 8, { hint: "Eight equal pieces make a whole.", why: "Eight eighths make one whole.", tag: "mixed.whole" })]),
  Q(mc("Which is 1 and 3 quarters written as a mixed number?", "1 3/4", ["3/4", "13/4"], { hint: "The whole part comes first.", why: "One whole and three quarters is 1 3/4.", tag: "mixed.write" }), "more_than_one", "apply",
    [mc("Which is 2 and 1 half written as a mixed number?", "2 1/2", ["2/1", "21/2"], { hint: "The whole part comes first.", why: "Two wholes and one half is 2 1/2.", tag: "mixed.write" })]),
  Q(tf("7/4 is the same as 1 3/4.", true, { hint: "Four quarters make one whole.", why: "Seven quarters is one whole and three quarters.", tag: "mixed.write" }), "more_than_one", "recall",
    [tf("5/4 is the same as 2 1/4.", false, { hint: "Four quarters make one whole.", why: "5/4 is 1 1/4, not 2 1/4.", tag: "mixed.write" })]),
  Q(fill("Complete the mixed number.", "5/4 = {b1} and {b2}/4.", [["1", "2", "5"], ["1", "2", "0"]], { hint: "Four quarters are one whole.", why: "5/4 is 1 whole and 1 quarter.", tag: "mixed.write" }), "more_than_one", "apply",
    [fill("Complete the mixed number about 9 quarters.", "9/4 = {b1} and {b2}/4.", [["2", "1", "4"], ["1", "2", "0"]], { hint: "Two groups of four.", why: "9/4 is 2 wholes and 1 quarter.", tag: "mixed.write" })]),
  Q(ms("Which two are mixed numbers? Pick two.", ["2 1/3", "1 3/5"], ["7/2", "5/3"], { hint: "A mixed number has a whole part and a fraction.", why: "2 1/3 and 1 3/5 have a whole part and a fraction.", tag: "mixed.mixed" }), "more_than_one", "apply",
    [ms("Pick the two mixed numbers from this list.", ["3 1/4", "2 2/5"], ["9/4", "8/3"], { hint: "A mixed number has a whole part and a fraction.", why: "3 1/4 and 2 2/5 are mixed numbers.", tag: "mixed.mixed" })]),
  Q(ord("Order these mixed numbers, smallest first.", ["1 1/4", "1 1/2", "1 3/4", "2"], { hint: "Compare the wholes, then the fractions.", why: "1 1/4, then 1 1/2, then 1 3/4, then 2.", tag: "mixed.order" }), "more_than_one", "apply",
    [ord("Put these in order, biggest first.", ["2 3/4", "2 1/4", "2", "1 1/2"], { hint: "Compare the wholes, then the fractions.", why: "2 3/4, then 2 1/4, then 2, then 1 1/2.", tag: "mixed.order" })]),
  Q(sld("Slide to show 1 1/2 on the line from 0 to 2.", { min: 0, max: 2, step: 0.25 }, 1.5, 0.25, { hint: "Halfway between 1 and 2.", why: "1 1/2 is halfway between 1 and 2.", tag: "mixed.line" }), "more_than_one", "apply",
    [sld("Slide to show 1 3/4 on the line from 0 to 2.", { min: 0, max: 2, step: 0.25 }, 1.75, 0.25, { hint: "Three quarters past 1.", why: "1 3/4 is three quarters past 1.", tag: "mixed.line" })]),
  Q(mat("Match each word to its mixed number.", [["two and a half", "2 1/2"], ["one and one third", "1 1/3"], ["three and one quarter", "3 1/4"]], { hint: "Whole first, then the fraction.", why: "Two and a half is 2 1/2, one and one third is 1 1/3, three and one quarter is 3 1/4.", tag: "mixed.read" }), "more_than_one", "apply",
    [mat("Join each word to its mixed number.", [["four and three fifths", "4 3/5"], ["one and one eighth", "1 1/8"], ["two and two thirds", "2 2/3"]], { hint: "Whole first, then the fraction.", why: "Four and three fifths is 4 3/5, and so on.", tag: "mixed.read" })]),
  // ----- converting (q9-q16)
  Q(num("How many whole ones are in 11/4?", 2, { hint: "Count full groups of four.", why: "Two groups of four make 8, so 11/4 = 2 3/4.", tag: "mixed.convert" }), "converting", "apply",
    [num("How many whole ones are in 11/5?", 2, { hint: "Count full groups of five.", why: "Two groups of five make 10, so 11/5 = 2 1/5.", tag: "mixed.convert" })]),
  Q(mc("Aisha says 13/4 = 2 5/4. Is she right?", "No. 5/4 is more than one whole, so 13/4 = 3 1/4", ["Yes, 2 5/4", "No, it is 2 1/4"], { hint: "Can the fraction part be bigger than one?", why: "The fraction part must be less than one whole, so 13/4 = 3 1/4.", tag: "mixed.reason_convert" }), "converting", "reason",
    [mc("Sam says 11/5 = 1 6/5. Is he right?", "No. 6/5 is more than one whole, so 11/5 = 2 1/5", ["Yes, 1 6/5", "No, it is 1 5/5"], { hint: "Can the fraction part be bigger than one?", why: "The fraction part must be less than one whole, so 11/5 = 2 1/5.", tag: "mixed.reason_convert" })]),
  Q(tf("13/5 is the same as 2 3/5.", true, { hint: "Five fifths make one whole.", why: "10 fifths are 2 wholes, and 3 fifths are left.", tag: "mixed.convert" }), "converting", "recall",
    [tf("11/4 is the same as 2 1/4.", false, { hint: "Two wholes are 8 quarters.", why: "11/4 = 2 3/4, not 2 1/4.", tag: "mixed.convert" })]),
  Q(fill("Convert 2 3/4 to an improper fraction.", "2 3/4 = {b1}/4.", [["11", "8", "12"]], { hint: "2 × 4 + 3.", why: "2 × 4 = 8, and 8 + 3 = 11.", tag: "mixed.convert" }), "converting", "apply",
    [fill("Convert 3 1/3 to an improper fraction.", "3 1/3 = {b1}/3.", [["10", "9", "4"]], { hint: "3 × 3 + 1.", why: "3 × 3 = 9, and 9 + 1 = 10.", tag: "mixed.convert" })]),
  Q(ms("Which two are improper fractions? Pick two.", ["9/4", "7/3"], ["2 1/4", "1 3/4"], { hint: "The top is bigger than the bottom.", why: "9/4 and 7/3 have a top bigger than the bottom.", tag: "mixed.improper" }), "converting", "apply",
    [ms("Pick the two improper fractions from this list.", ["11/5", "8/3"], ["3 2/5", "1 1/2"], { hint: "The top is bigger than the bottom.", why: "11/5 and 8/3 are improper.", tag: "mixed.improper" })]),
  Q(ord("Order these from the smallest value.", ["1 3/8", "3/2", "7/4", "2 1/4"], { hint: "Change each to a mixed number first.", why: "3/2 is 1 1/2 and 7/4 is 1 3/4. So the order is 1 3/8, 1 1/2, 1 3/4, 2 1/4.", tag: "mixed.order" }), "converting", "apply",
    [ord("Sort these from the biggest value.", ["5/2", "2 1/3", "2", "9/5"], { hint: "Change each to a mixed number first.", why: "5/2 is 2 1/2 and 9/5 is 1 4/5. So the order is 2 1/2, 2 1/3, 2, 1 4/5.", tag: "mixed.order" })]),
  Q(hot("Tap the picture that shows 2 1/2 shaded.", [["🍕", "A: 3 halves shaded", 22, 50], ["🍕", "B: 2 wholes and 1 half", 50, 50], ["🍕", "C: 2 quarters", 78, 50]], ["B: 2 wholes and 1 half"], { labels: true, hint: "Two wholes and a half.", why: "2 wholes and 1 half is 2 1/2.", tag: "mixed.picture" }), "converting", "apply",
    [hot("Tap the picture that shows 1 1/4 shaded.", [["🍕", "A: 3 quarters", 22, 50], ["🍕", "B: 1 whole and 1 quarter", 50, 50], ["🍕", "C: 1 half", 78, 50]], ["B: 1 whole and 1 quarter"], { labels: true, hint: "One whole and a quarter.", why: "1 whole and 1 quarter is 1 1/4.", tag: "mixed.picture" })]),
  Q(hot("Tap the fraction equal to 3 1/2.", [["🔢", "7/2", 22, 50], ["🔢", "3/2", 50, 50], ["🔢", "5/3", 78, 50]], ["7/2"], { labels: true, hint: "3 × 2 + 1.", why: "3 × 2 = 6, and 6 + 1 = 7, so 3 1/2 = 7/2.", tag: "mixed.convert" }), "converting", "apply",
    [hot("Tap the fraction equal to 2 1/5.", [["🔢", "11/5", 22, 50], ["🔢", "7/5", 50, 50], ["🔢", "2/5", 78, 50]], ["11/5"], { labels: true, hint: "2 × 5 + 1.", why: "2 × 5 = 10, and 10 + 1 = 11, so 2 1/5 = 11/5.", tag: "mixed.convert" })]),
  // ----- fractions_line (q17-q24)
  Q(mc("Which mixed number is between 1 and 2 and closer to 2?", "1 4/5", ["1 1/5", "1 2/5"], { hint: "How far is each from 2?", why: "1 4/5 is closer to 2 than 1 1/5 or 1 2/5.", tag: "mixed.line" }), "fractions_line", "apply",
    [mc("Which mixed number is between 3 and 4 and closer to 3?", "3 1/5", ["3 4/5", "3 3/5"], { hint: "How far is each from 3?", why: "3 1/5 is closest to 3.", tag: "mixed.line" })]),
  Q(ms("Which two are bigger than 1 3/5? Pick two.", ["1 4/5", "2"], ["1 1/5", "1 2/5"], { hint: "Compare the wholes, then the fractions.", why: "1 4/5 and 2 are both bigger than 1 3/5.", tag: "mixed.compare" }), "fractions_line", "apply",
    [ms("Which two are bigger than 2 1/3? Pick two.", ["2 2/3", "3"], ["2 1/4", "2 1/3"], { hint: "Compare the wholes, then the fractions.", why: "2 2/3 and 3 are both bigger than 2 1/3.", tag: "mixed.compare" })]),
  Q(tf("1 2/5 is bigger than 1 3/5.", false, { hint: "Compare the fractions.", why: "Two fifths is less than three fifths.", tag: "mixed.compare" }), "fractions_line", "recall",
    [tf("2 4/5 is bigger than 2 3/5.", true, { hint: "Compare the fractions.", why: "Four fifths is more than three fifths.", tag: "mixed.compare" })]),
  Q(mat("Match each fraction to its place on the line.", [["4/4", "1"], ["5/2", "2 1/2"], ["7/4", "1 3/4"]], { hint: "Change each to a mixed number.", why: "4/4 = 1, 5/2 = 2 1/2, 7/4 = 1 3/4.", tag: "mixed.line" }), "fractions_line", "apply",
    [mat("Join each fraction to its mixed number.", [["6/4", "1 2/4"], ["9/2", "4 1/2"], ["5/4", "1 1/4"]], { hint: "Change each to a mixed number.", why: "6/4 = 1 2/4, 9/2 = 4 1/2, 5/4 = 1 1/4.", tag: "mixed.line" })]),
  Q(mc("Layla says 4/4 is written as 1, but it is not a whole, so it cannot be 1. Is she right?", "No. 4/4 is four quarters, which is one whole", ["Yes, 4/4 is not a whole", "No, 4/4 is 2"], { hint: "How many quarters make a whole?", why: "Four quarters make one whole, so 4/4 = 1.", tag: "mixed.reason_whole" }), "fractions_line", "reason",
    [mc("Mira says 3/3 is less than 1 because the top and bottom are the same. Is she right?", "No. 3/3 is three thirds, which is one whole", ["Yes, 3/3 is less than 1", "No, 3/3 is 3"], { hint: "Three thirds make a whole.", why: "3/3 = 1.", tag: "mixed.reason_whole" })]),
  Q(num("How many halves are in 2 1/2?", 5, { hint: "Two wholes have 4 halves, and 1 more half.", why: "4 + 1 = 5 halves.", tag: "mixed.convert" }), "fractions_line", "apply",
    [num("How many thirds are in 3 1/3?", 10, { hint: "Three wholes have 9 thirds, and 1 more third.", why: "9 + 1 = 10 thirds.", tag: "mixed.convert" })]),
  Q(mc("Omar says 1 1/4 means one and four. Is he right?", "No. 1 1/4 means one whole and one quarter", ["Yes, one and four", "No, it means 1/4 only"], { hint: "What is the fraction part?", why: "The fraction part is 1/4, and the whole part is 1.", tag: "mixed.reason_read" }), "fractions_line", "reason",
    [mc("Zara says 2 3/5 means two and five. Is she right?", "No. 2 3/5 means two wholes and three fifths", ["Yes, two and five", "No, it is 2/5"], { hint: "What is the fraction part?", why: "The fraction part is 3/5.", tag: "mixed.reason_read" })]),
  Q(mc("Hamza says 1 3/5 is bigger than 1 4/5 because 3 is smaller than 4. Is he right?", "No. 1 4/5 is bigger, because 4 fifths is more than 3 fifths", ["Yes, 3 is smaller so 1 3/5 is bigger", "No, they are equal"], { hint: "Compare the fraction parts.", why: "4 fifths is more than 3 fifths, so 1 4/5 is bigger.", tag: "mixed.reason_compare" }), "fractions_line", "reason",
    [mc("Ali says 2 1/4 is bigger than 2 3/4 because 1 is bigger than 3. Is he right?", "No. 2 3/4 is bigger, because 3 quarters is more than 1 quarter", ["Yes, 1 is bigger than 3", "No, they are equal"], { hint: "Compare the fraction parts.", why: "3 quarters is more than 1 quarter.", tag: "mixed.reason_compare" })]),
  // ----- recipes (q25-q30)
  Q(num("Ali has 2 1/2 cups of rice. He uses 1 1/2 cups. How many cups are left?", 1, { hint: "Take away the wholes, then the halves.", why: "2 − 1 = 1 and 1/2 − 1/2 = 0, so 1 cup is left.", tag: "mixed.subtract" }), "recipes", "apply",
    [num("Sana has 3 1/4 litres of milk. She uses 1 1/4 litres. How many litres are left?", 2, { hint: "Take away the wholes and the quarters.", why: "3 − 1 = 2 and 1/4 − 1/4 = 0, so 2 litres.", tag: "mixed.subtract" })]),
  Q(sld("Slide to show 2 1/2 on the line from 0 to 3.", { min: 0, max: 3, step: 0.5 }, 2.5, 0.5, { hint: "Halfway between 2 and 3.", why: "2 1/2 is halfway between 2 and 3.", tag: "mixed.line" }), "recipes", "apply",
    [sld("Slide to show 1 1/2 on the line from 0 to 3.", { min: 0, max: 3, step: 0.5 }, 1.5, 0.5, { hint: "Halfway between 1 and 2.", why: "1 1/2 is halfway between 1 and 2.", tag: "mixed.line" })]),
  Q(mc("Zara adds 7/8 and 3/8 and gets 10/8. Is she right?", "Yes. 10/8 = 8/8 + 2/8, which is 1 2/8, or 1 1/4", ["No, it is 10/16", "No, it is 1/8"], { hint: "Eight eighths make a whole.", why: "10/8 = 1 2/8 = 1 1/4, so the total is correct.", tag: "mixed.add" }), "recipes", "reason",
    [mc("Mina says 4/6 + 5/6 = 9/6, which is 1 3/6. Is she right?", "Yes. 9/6 = 6/6 + 3/6, which is 1 3/6", ["No, it is 9/12", "No, it is 1 4/6"], { hint: "Six sixths make a whole.", why: "9/6 = 1 3/6.", tag: "mixed.add" })]),
  Q(mc("Hamza says 3/8 + 4/8 = 7/16 because he adds the bottom numbers too. Is he right?", "No. Add the tops only and keep the bottom: 3/8 + 4/8 = 7/8", ["Yes, 7/16", "No, 12/8"], { hint: "Does the bottom number change when the pieces are the same size?", why: "The pieces stay eighths, so the answer is 7/8.", tag: "mixed.reason_add" }), "recipes", "reason",
    [mc("Nora says 2/5 + 1/5 = 3/10 because she adds the bottoms. Is she right?", "No. Add the tops only: 2/5 + 1/5 = 3/5", ["Yes, 3/10", "No, 2/10"], { hint: "Keep the bottom number.", why: "The fifths stay fifths, so the answer is 3/5.", tag: "mixed.reason_add" })]),
  Q(mc("Sara says 2 1/2 cups is the same as 5 cups. Is she right?", "No. 2 1/2 cups is two and a half cups, not 5 cups", ["Yes, 5 cups", "No, 2 1/2 cups is 25 cups"], { hint: "Half a cup is less than one cup.", why: "Two cups and half a cup is less than 3 cups.", tag: "mixed.reason_value" }), "recipes", "reason",
    [mc("Lina says 3 1/4 litres is the same as 4 litres. Is she right?", "No. 3 1/4 litres is 3 litres and a quarter, not 4 litres", ["Yes, 4 litres", "No, it is 31/4 litres"], { hint: "A quarter is less than one whole.", why: "3 and a quarter is less than 4.", tag: "mixed.reason_value" })]),
  Q(mc("Ali says 1 3/4 pizzas is 7 quarters. Is he right?", "Yes. 1 whole is 4 quarters, and 3 more quarters makes 7 quarters", ["No, 1 3/4 is 13 quarters", "No, it is 4 quarters"], { hint: "Four quarters make one whole.", why: "4 + 3 = 7 quarters.", tag: "mixed.reason_convert" }), "recipes", "reason",
    [mc("Omar says 2 1/2 pizzas is 5 halves. Is he right?", "Yes. 2 wholes are 4 halves, and 1 more half makes 5 halves", ["No, it is 2 halves", "No, it is 25 halves"], { hint: "Two wholes have 4 halves.", why: "4 + 1 = 5 halves.", tag: "mixed.reason_convert" })]),
];

export const topics = [
  topicLesson({
    slug: "maths-class-4-mixed-numbers", subject: "maths", cls: 4, topic: 8, title: "Mixed Numbers and Improper Fractions",
    summary: "Fractions bigger than one: mixed numbers, improper fractions, converting both ways and adding within a whole.",
    unit: "Topic 8: Mixed numbers and improper fractions", difficulty: 3,
    objectives: ["Name and write mixed numbers", "Convert between improper fractions and mixed numbers", "Add and subtract fractions with the same bottom number"],
    success_criteria: ["I can write a mixed number from a picture", "I can change an improper fraction to a mixed number and back", "I can add fractions with the same bottom number"],
    real_life: "Sharing naan and pizza, measuring rice and milk in a recipe, and counting slices at a party.",
    standards: [
      { framework: "nc_england", code: "Y4 fractions", text: "Count up and down in hundredths; recognise and write fractions greater than 1; add and subtract fractions with the same denominator" },
      { framework: "cambridge", code: "4Nf.03" }, { framework: "cambridge", code: "4Nf.04" }, { framework: "cambridge", code: "4Nf.05" }, { framework: "cambridge", code: "4Nf.06" },
    ],
    warm_up: [
      num("What is 4 × 3?", 12, { hint: "Count in threes.", why: "4 × 3 = 12." }),
      mc("What is 1/2 of 10?", "5", ["2", "20"], { hint: "Share 10 into two.", why: "10 ÷ 2 = 5." }),
      tf("3/4 is less than one whole.", true, { hint: "Four quarters make a whole.", why: "3 quarters is less than 4 quarters." }),
    ],
    intro: [],
    subs: [moreThanOne, converting, fractionsLine, recipes],
    clip,
    quiz,
  }),
];
