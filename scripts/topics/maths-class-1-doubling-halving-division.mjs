import { SAY, SS, H, T, IMG, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Coteach diagrams (see content/media/manifest.d/maths-class-1-doubling-halving-division.json).
const COTEACH_A = {"type":"image","asset":"maths-class-1-doubling-halving-division-d1-cfebabc9.png","alt":"A bar model showing 12 split into 3 equal parts, each labelled 4","caption":"12 shared into 3 equal parts of 4."};
const COTEACH_B = {"type":"image","asset":"maths-class-1-doubling-halving-division-d2-317ae333.png","alt":"An array of 12 counters in 3 rows of 4 with 12 ÷ 3 = 4","caption":"12 ÷ 3 = 4: three rows of four."};
// Class 1 Maths topic 10: doubling, halving and dividing.
// Story thread: Zara and her cousin Hana share Eid sweets.
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });
const HB = (text, backdrop) => ({ ...H(text), backdrop });
const OK = (label) => ["ok", "✅", 50, 90, 2, "bounce", label];

const PHOTO = "maths-class-1-doubling-halving-division-1-7e2c16b6.jpg";

// ---------------------------------------------------------------------------------------------- 1. learn
const halve = {
  id: "halve", kind: "learn", title: "Doubling and halving",
  blocks: [
    HB("Zara and Hana share Eid sweets", "home"),
    SAY("It is Eid! Zara and her cousin Hana have boxes of sweets and cookies. Today we double and halve. Then we share fairly.",
      { type: "image", asset: PHOTO, alt: "Three clear boxes of Eid cookies on a wooden table", caption: "Eid cookies, ready to share.", credit: "Photo by Bayu Syaits on Unsplash" }),
    HB("Stop 1: Double with a mirror", "classroom"),
    SAY("To double means to make two equal groups. Stand a mirror next to three sweets. You see three more! Three and three make six.",
      T("**Double** means two equal groups.", "Double 3 is 3 + 3 = 6.")),
    EXPP("Double 4 with a mirror",
      SS("Here are four sweets. A mirror stands beside them.", S("4 sweets.", ["a", "🍬🍬🍬🍬", 30, 46, 3], ["m", "🪞", 50, 46, 3])),
      SS("The mirror shows four more. Same number on both sides!", S("4 and 4.", ["a", "🍬🍬🍬🍬", 30, 46, 3], ["b", "🍬🍬🍬🍬", 70, 46, 3, "pulse"])),
      SS("Four and four make eight. Double four is eight!", S("Double 4 = 8.", ["a", "🍬🍬🍬🍬", 30, 46, 3], ["b", "🍬🍬🍬🍬", 70, 46, 3], OK("4 + 4 = 8")))),
    SAY("Look at twelve split into three equal parts. Each part is four.", COTEACH_A),
    CHK(num("What is double 5?", 10, { hint: "Add 5 and 5.", why: "Double 5 is 5 + 5 = 10.", tag: "divide.double" })),
    HB("Stop 2: Halving is sharing in 2", "classroom"),
    SAY("Now the other way. To halve means to share into two equal parts. Zara has eight cookies. She shares them with Hana. How many each?",
      T("**Halve** means to share into 2 equal parts.", "Half of 8 is 4, because 4 + 4 = 8.")),
    EXPP("Half of 8",
      SS("Zara has eight cookies. She gives one to Hana, one to herself.", S("8 cookies.", ["c", "🍪🍪🍪🍪🍪🍪🍪🍪", 50, 46, 3])),
      SS("One for you, one for me. Keep going until they are all gone.", S("Sharing one by one.", ["z", "👧", 25, 40, 2], ["h", "👧🏽", 75, 40, 2], ["c", "🍪🍪🍪🍪", 25, 62, 2], ["d", "🍪🍪🍪🍪", 75, 62, 2, "pulse"])),
      SS("Each girl has four. Half of eight is four!", S("Half of 8 = 4.", ["c", "🍪🍪🍪🍪", 25, 62, 2], ["d", "🍪🍪🍪🍪", 75, 62, 2], OK("half of 8 = 4")))),
    CHK(num("What is half of 12?", 6, { hint: "Share 12 into two equal parts.", why: "6 + 6 = 12, so half of 12 is 6.", tag: "divide.halve" })),
    SAY("Remember. Double makes two equal groups. Half shares into two equal parts. They undo each other.", SUM("Double means two equal groups", "Half means share into 2", "Double and half undo each other")),
    GLOSS({ double: "Two equal groups, so you add a number to itself.", half: "One of two equal parts.", halve: "To share into two equal parts.", equal: "The same amount.", Eid: "A happy festival for Muslims." }),
  ],
  mini: [
    num("What is double 6?", 12, { hint: "Add 6 and 6.", why: "6 + 6 = 12." }),
    num("What is half of 10?", 5, { hint: "Two equal parts.", why: "5 + 5 = 10." }),
    mc("Which is the same as double 4?", "4 + 4", ["4 + 2", "4 - 4"], { hint: "Double adds the number to itself.", why: "Double 4 is 4 + 4 = 8." }),
    tf("Half of 6 is 3.", true, { hint: "3 + 3 = ?", why: "3 + 3 = 6, so half of 6 is 3." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const share = {
  id: "share", kind: "try", title: "Sharing and grouping",
  blocks: [
    HB("Stop 1: Share 12 cookies fairly", "home"),
    SAY("Zara has twelve cookies. Three cousins want some. We share them fairly. Fairly means everyone gets the same. One for you, one for you, one for you!",
      T("**Share** means give out so each gets the same.", "12 cookies shared between 3 cousins: 4 each.")),
    EXPP("Share 12 between 3",
      SS("Twelve cookies and three cousins. Who gets the first cookie?", S("12 cookies, 3 cousins.", ["c", "🍪🍪🍪🍪🍪🍪🍪🍪", 50, 30, 3], ["a", "👧", 20, 66, 2], ["b", "👦", 50, 66, 2], ["d", "👧🏽", 80, 66, 2])),
      SS("Deal them out, one at a time. Round and round.", S("One each, again and again.", ["a", "👧", 20, 66, 2, "pulse", "🍪🍪🍪"], ["b", "👦", 50, 66, 2, "pulse", "🍪🍪🍪"], ["d", "👧🏽", 80, 66, 2, "pulse", "🍪🍪🍪"])),
      SS("Everyone has four cookies. Twelve shared between three is four each!", S("12 shared by 3 = 4 each.", ["a", "👧", 20, 66, 2, "none", "4"], ["b", "👦", 50, 66, 2, "none", "4"], ["d", "👧🏽", 80, 66, 2, "none", "4"], OK("12 shared by 3 = 4")))),
    MAN("Share the cookies", "Share 12 cookies fairly between the two plates. How many on each plate?", "🍪", 12, ["Plate A", "Plate B"]),
    SAY("Here are twelve counters in three rows of four. Twelve divided by three is four.", COTEACH_B),
    CHK(num("12 cookies are shared between 4 plates. How many on each plate?", 3, { hint: "Deal out one at a time.", why: "4 plates of 3 make 12, so 3 each.", tag: "divide.share" })),
    HB("Stop 2: Group 12 into bags of 3", "home"),
    SAY("Now a different job. Put the twelve cookies into bags. Each bag holds three. How many bags? We are making groups, not sharing.",
      T("**Group** means put into sets of the same size.", "12 cookies in bags of 3 makes 4 bags.")),
    EXPP("Group 12 into 3s",
      SS("Twelve cookies. Each bag takes three.", S("Bags of 3.", ["c", "🍪🍪🍪🍪🍪🍪🍪🍪", 50, 40, 3])),
      SS("Fill the first bag. Then the next. Count the bags.", S("1, 2, 3, 4 bags.", ["b1", "🛍️", 20, 50, 2, "none", "3"], ["b2", "🛍️", 40, 50, 2, "none", "3"], ["b3", "🛍️", 60, 50, 2, "none", "3"], ["b4", "🛍️", 80, 50, 2, "pulse", "3"])),
      SS("Four bags! Twelve in groups of three makes four groups.", S("12 in 3s = 4 bags.", ["b1", "🛍️", 20, 50, 2], ["b2", "🛍️", 40, 50, 2], ["b3", "🛍️", 60, 50, 2], ["b4", "🛍️", 80, 50, 2], OK("12 in 3s = 4 groups")))),
    ACT("Share and group at home", ["Twelve buttons or raisins", "Two small bowls"], ["Share the 12 between 2 bowls. How many in each?", "Now make groups of 3. How many groups?", "Try groups of 4. How many groups now?"]),
    CHK(num("Put 10 sweets into bags of 5. How many bags?", 2, { hint: "Count in fives.", why: "5 + 5 = 10, so 2 bags.", tag: "divide.group" })),
    SAY("Remember. Sharing asks how many each. Grouping asks how many groups. Both are division.", SUM("Sharing: how many each?", "Grouping: how many groups?", "Both are division")),
    GLOSS({ share: "Give out so each gets the same.", group: "A set of things together.", fairly: "So everyone gets the same.", bag: "A holder, like a paper bag.", cousin: "The child of your uncle or aunt." }),
  ],
  mini: [
    num("6 sweets are shared between 2 children. How many each?", 3, { hint: "Half of 6.", why: "3 + 3 = 6." }),
    num("8 pencils go in pots of 2. How many pots?", 4, { hint: "Count in twos.", why: "2, 4, 6, 8 is 4 pots." }),
    mc("Which one is sharing between 3 children?", "One each, then another each, until none are left", ["Make bags of 3", "Add 3 to the pile"], { hint: "Sharing deals out one at a time.", why: "Sharing gives each child the same, one at a time." }),
    tf("Sharing fairly means everyone gets the same.", true, { hint: "Fair means equal.", why: "Fair shares are equal shares." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const sentence = {
  id: "sentence", kind: "play", title: "Division sentences",
  blocks: [
    HB("Stop 1: Parts of 12 divided by 3", "classroom"),
    SAY("We can write sharing as a sentence. Twelve divided by three equals four. The sign is a line with a dot above and below. Each number has a job.",
      T("**Divide** means share or group equally.", "12 ÷ 3 = 4. 12 is the **dividend**, 3 is the **divisor**, 4 is the **quotient**.")),
    EXPP("12 ÷ 3 = 4",
      SS("Twelve is the number we divide. It is the dividend.", S("12 is the dividend.", ["a", "🍪🍪🍪🍪🍪🍪🍪🍪", 50, 46, 3, "pulse", "12"])),
      SS("Three is what we divide by. It is the divisor.", S("3 is the divisor.", ["b", "👧👦👧🏽", 50, 46, 3, "pulse", "3"])),
      SS("Four is the answer. It is the quotient. Each child gets four!", S("4 is the quotient.", ["c", "🍪🍪🍪🍪", 50, 46, 3, "pulse", "4"], OK("12 ÷ 3 = 4")))),
    CHK(mc("In 12 ÷ 3 = 4, which number is the answer?", "4", ["12", "3"], { hint: "The answer comes after the equals sign.", why: "The answer to a division is the quotient. Here it is 4.", tag: "divide.words" })),
    HB("Stop 2: Link to times tables", "classroom"),
    SAY("Division and times tables are friends. Three groups of four make twelve. So twelve divided by three is four. Use a times fact to divide!",
      T("3 × 4 = 12, so 12 ÷ 3 = 4 and 12 ÷ 4 = 3.", "These are a **fact family**.")),
    EXPP("A fact family",
      SS("Three rows of four sweets. That is three times four.", S("3 × 4 = 12.", ["a", "🍬🍬🍬🍬", 50, 28, 2], ["b", "🍬🍬🍬🍬", 50, 46, 2], ["c", "🍬🍬🍬🍬", 50, 64, 2])),
      SS("Twelve in three rows gives four in each row. Twelve divided by three is four.", S("12 ÷ 3 = 4.", ["a", "🍬🍬🍬🍬", 50, 28, 2], ["b", "🍬🍬🍬🍬", 50, 46, 2], ["c", "🍬🍬🍬🍬", 50, 64, 2, "pulse"])),
      SS("Twelve in rows of four gives three rows. Twelve divided by four is three!", S("12 ÷ 4 = 3.", ["a", "🍬🍬🍬🍬", 50, 28, 2], ["b", "🍬🍬🍬🍬", 50, 46, 2], ["c", "🍬🍬🍬🍬", 50, 64, 2], OK("12 ÷ 4 = 3")))),
    SAY("Flip the cards and find the matching pairs. A little brain break!", BRAIN("memory_match", "Sweet match", "Find the matching pairs.", ["🍬", "🍪", "🍫", "🍩", "🧁", "🍭"])),
    CHK(num("2 × 5 = 10. What is 10 ÷ 2?", 5, { hint: "Use the times fact backwards.", why: "10 ÷ 2 = 5 because 2 × 5 = 10.", tag: "divide.fact_family" })),
    SAY("Remember. Dividend, divisor, quotient. Use times tables to divide.", SUM("12 ÷ 3 = 4 has three parts", "Use a times fact to divide", "A fact family uses × and ÷")),
    GLOSS({ divide: "To share or group equally.", dividend: "The number being divided.", divisor: "The number we divide by.", quotient: "The answer to a division.", "fact family": "Times and divide facts that use the same three numbers." }),
  ],
  mini: [
    num("What is 8 ÷ 2?", 4, { hint: "Half of 8.", why: "4 + 4 = 8." }),
    num("What is 15 ÷ 5?", 3, { hint: "Count in fives.", why: "5 × 3 = 15." }),
    mc("In 20 ÷ 10 = 2, which number is the divisor?", "10", ["20", "2"], { hint: "It is the number we divide by.", why: "We divide by 10, so 10 is the divisor." }),
    tf("3 × 4 = 12 and 12 ÷ 4 = 3 use the same numbers.", true, { hint: "They are a fact family.", why: "3, 4 and 12 make a fact family." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const fair = {
  id: "fair", kind: "use", title: "Fair shares in real life",
  blocks: [
    HB("Stop 1: Eid sweets", "home"),
    SAY("Zara has fourteen Eid sweets. She shares them with cousin Hana. Two girls, so we divide by two. Fourteen divided by two is seven.",
      T("Shared between 2 means **half**.", "14 ÷ 2 = 7.")),
    EXPP("14 sweets between 2",
      SS("Fourteen sweets. Two cousins.", S("14 sweets, 2 cousins.", ["c", "🍬🍬🍬🍬🍬🍬🍬🍬", 50, 30, 3], ["a", "👧", 30, 66, 2], ["b", "👧🏽", 70, 66, 2])),
      SS("One each, one each, until they are gone.", S("Fair shares.", ["a", "👧", 30, 66, 2, "pulse", "🍬×7"], ["b", "👧🏽", 70, 66, 2, "pulse", "🍬×7"])),
      SS("Seven each! Half of fourteen is seven.", S("14 ÷ 2 = 7.", ["a", "👧", 30, 66, 2, "none", "7"], ["b", "👧🏽", 70, 66, 2, "none", "7"], OK("14 ÷ 2 = 7")))),
    CHK(num("30 sweets are shared between 10 children. How many each?", 3, { hint: "Use the 10 times table.", why: "10 × 3 = 30, so 3 each.", tag: "divide.word_ten" })),
    HB("Stop 2: Packing boxes", "town"),
    SAY("Uncle packs samosas into boxes. Each box holds five. He has twenty samosas. How many boxes? Twenty divided by five is four. What about left-overs? Some numbers do not divide exactly.",
      T("A **left-over** is what remains when a share is not equal.", "13 ÷ 2 = 6 with 1 left over.")),
    EXPP("20 samosas in boxes of 5",
      SS("Twenty samosas. Five in each box.", S("20 samosas.", ["s", "🥟🥟🥟🥟🥟🥟🥟🥟", 50, 40, 3])),
      SS("Fill box one. Fill box two. Keep going.", S("Boxes of 5.", ["b1", "📦", 20, 50, 2, "none", "5"], ["b2", "📦", 40, 50, 2, "none", "5"], ["b3", "📦", 60, 50, 2, "none", "5"], ["b4", "📦", 80, 50, 2, "pulse", "5"])),
      SS("Four boxes, none left over. Twenty divided by five is four!", S("20 ÷ 5 = 4.", ["b1", "📦", 20, 50, 2], ["b2", "📦", 40, 50, 2], ["b3", "📦", 60, 50, 2], ["b4", "📦", 80, 50, 2], OK("20 ÷ 5 = 4")))),
    REVEAL("What is any number divided by 1? Have a think first.", "The same number. 6 ÷ 1 = 6, because one child gets them all."),
    CHK(num("There are 35 dates. 5 dates go in each bowl. How many bowls?", 7, { hint: "Count in fives to 35.", why: "5 × 7 = 35, so 7 bowls.", tag: "divide.word_five" })),
    SAY("Remember. Between 2 is half. Anything divided by 1 stays the same. A number divided by itself is 1.", SUM("Between 2 means half", "A number divided by 1 stays the same", "A number divided by itself is 1")),
    GLOSS({ half: "One of two equal parts.", "left-over": "What is left when a share is not equal.", samosa: "A crispy triangle snack with a filling.", box: "A container for packing things.", divisible: "Can be divided with nothing left over." }),
  ],
  mini: [
    num("16 sweets are shared between 2 children. How many each?", 8, { hint: "Half of 16.", why: "8 + 8 = 16." }),
    num("What is 9 ÷ 1?", 9, { hint: "One child gets all.", why: "Any number divided by 1 is itself." }),
    mc("What is 5 ÷ 5?", "1", ["0", "5"], { hint: "Five shared between five children.", why: "Each child gets 1." }),
    tf("25 sweets can be shared equally between 2 children.", false, { hint: "Is 25 even or odd?", why: "25 is odd, so there is 1 left over." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Zara and Hana share Eid sweets", backdrop: "home", caption: "Share the sweets two ways and get the same answer.",
  scenes: [
    { caption: "A box of Eid sweets.", say: "It is Eid. Zara and her cousin Hana open a box of twelve sweets.",
      items: [{ id: "z", emoji: "👧", label: "Zara", x: 22, y: 56, size: 3, enter: "walk_right" }, { id: "h", emoji: "👧🏽", label: "Hana", x: 78, y: 56, size: 3, enter: "walk_left" }, { id: "b", emoji: "🎁", x: 50, y: 30, size: 3, enter: "pop" }] },
    { caption: "12 sweets.", say: "Twelve sweets. How can they share them fairly?",
      items: [{ id: "s", emoji: "🍬🍬🍬🍬🍬🍬🍬🍬", label: "12", x: 50, y: 46, size: 3, enter: "grow" }] },
    { caption: "One for you, one for me.", say: "First they share one by one. One for Zara, one for Hana.",
      items: [{ id: "z", emoji: "👧", x: 25, y: 40, size: 2 }, { id: "h", emoji: "👧🏽", x: 75, y: 40, size: 2 }, { id: "a", emoji: "🍬", x: 25, y: 62, size: 2, enter: "slide_right" }, { id: "b", emoji: "🍬", x: 75, y: 62, size: 2, enter: "slide_left" }] },
    { caption: "6 each.", say: "They keep going. Six sweets each! Twelve divided by two is six.",
      items: [{ id: "z", emoji: "👧", x: 25, y: 40, size: 2 }, { id: "h", emoji: "👧🏽", x: 75, y: 40, size: 2 }, { id: "a", emoji: "🍬🍬🍬🍬🍬🍬", label: "6", x: 25, y: 62, size: 2 }, { id: "b", emoji: "🍬🍬🍬🍬🍬🍬", label: "6", x: 75, y: 62, size: 2, effect: "sparkle" }] },
    { caption: "Now bags of 3.", say: "Now they try bags. Each bag holds three sweets.",
      items: [{ id: "s", emoji: "🍬🍬🍬🍬🍬🍬🍬🍬", x: 50, y: 40, size: 3 }, { id: "bag", emoji: "🛍️", label: "3 in a bag", x: 50, y: 70, size: 2, enter: "pop" }] },
    { caption: "4 bags.", say: "One, two, three, four bags. Twelve divided by three is four.",
      items: [{ id: "b1", emoji: "🛍️", x: 20, y: 50, size: 2, enter: "pop" }, { id: "b2", emoji: "🛍️", x: 40, y: 50, size: 2, enter: "pop" }, { id: "b3", emoji: "🛍️", x: 60, y: 50, size: 2, enter: "pop" }, { id: "b4", emoji: "🛍️", x: 80, y: 50, size: 2, enter: "pop", effect: "sparkle" }] },
    { caption: "Two bags each?", say: "Four bags. Two bags for Zara and two bags for Hana. Fair again!",
      items: [{ id: "z", emoji: "👧", label: "2 bags", x: 25, y: 56, size: 3 }, { id: "h", emoji: "👧🏽", label: "2 bags", x: 75, y: 56, size: 3 }, { id: "g", emoji: "🛍️🛍️", x: 25, y: 28, size: 2 }, { id: "g2", emoji: "🛍️🛍️", x: 75, y: 28, size: 2 }] },
    { caption: "Eid Mubarak!", say: "Sharing or grouping, the sweets stay the same. Eid Mubarak!",
      items: [{ id: "z", emoji: "👧", x: 22, y: 56, size: 3, anim: "bounce" }, { id: "h", emoji: "👧🏽", x: 78, y: 56, size: 3, anim: "bounce" }, { id: "m", emoji: "🌙", x: 50, y: 30, size: 3, effect: "hearts" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });

const quiz = [
  // ----- learn (q1-q8)
  Q(num("Zara has 6 sweets and her mirror shows 6 more. What is double 6?", 12, { hint: "Add 6 and 6.", why: "Double 6 is 6 + 6 = 12.", tag: "divide.double" }), "halve", "recall",
    [num("Hana has 8 stickers and her mirror shows 8 more. What is double 8?", 16, { hint: "Add 8 and 8.", why: "Double 8 is 8 + 8 = 16.", tag: "divide.double" })]),
  Q(tf("Half of 10 is 5.", true, { hint: "5 + 5 = ?", why: "5 + 5 = 10, so half of 10 is 5.", tag: "divide.halve" }), "halve", "recall",
    [tf("Half of 8 is 3.", false, { hint: "3 + 3 = ?", why: "3 + 3 = 6, not 8. Half of 8 is 4.", tag: "divide.halve" })]),
  Q(mc("Layla says half of 14 is 8. Is she right?", "No. Half of 14 is 7, because 7 + 7 = 14", ["Yes, 8 + 8 = 14", "No, half of 14 is 28"], { hint: "Check by doubling her answer.", why: "Double 8 is 16, not 14. Half of 14 is 7 because 7 + 7 = 14.", tag: "divide.reason_halve" }), "halve", "reason",
    [mc("Ben says half of 18 is 10. Is he right?", "No. Half of 18 is 9, because 9 + 9 = 18", ["Yes, 10 + 10 = 18", "No, half of 18 is 36"], { hint: "Check by doubling his answer.", why: "Double 10 is 20, not 18. Half of 18 is 9 because 9 + 9 = 18.", tag: "divide.reason_halve" })]),
  Q(fill("Complete the doubles.", "Double 30 is {b1} and half of 60 is {b2}.", [["60", "50", "90"], ["30", "20", "40"]], { hint: "3 tens and 3 tens make 6 tens.", why: "Double 30 is 60 and half of 60 is 30.", tag: "divide.double_tens" }), "halve", "apply",
    [fill("Finish the doubles.", "Double 40 is {b1} and half of 80 is {b2}.", [["80", "60", "90"], ["40", "30", "20"]], { hint: "4 tens and 4 tens make 8 tens.", why: "Double 40 is 80 and half of 80 is 40.", tag: "divide.double_tens" })]),
  Q(mc("Ali says double 7 is 15. Is he right?", "No. Double 7 is 7 + 7 = 14", ["Yes, 7 + 8 = 15", "No, double 7 is 21"], { hint: "Add the same number twice.", why: "Double means the same number twice. 7 + 7 = 14, not 15.", tag: "divide.reason_double" }), "halve", "reason",
    [mc("Sam says double 9 is 19. Is he right?", "No. Double 9 is 9 + 9 = 18", ["Yes, 9 + 10 = 19", "No, double 9 is 27"], { hint: "Add the same number twice.", why: "Double means the same number twice. 9 + 9 = 18, not 19.", tag: "divide.reason_double" })]),
  Q(sld("Slide to half of 18.", { min: 0, max: 20 }, 9, 0, { hint: "What and what make 18?", why: "9 + 9 = 18, so half of 18 is 9.", tag: "divide.halve_slider" }), "halve", "apply",
    [sld("Slide to half of 16.", { min: 0, max: 20 }, 8, 0, { hint: "What and what make 16?", why: "8 + 8 = 16, so half of 16 is 8.", tag: "divide.halve_slider" })]),
  Q(mat("Match each number to its double.", [["3", "6"], ["5", "10"], ["8", "16"]], { hint: "Add the number to itself.", why: "3 + 3 = 6, 5 + 5 = 10 and 8 + 8 = 16.", tag: "divide.double_match" }), "halve", "apply",
    [mat("Join each number to its double.", [["4", "8"], ["6", "12"], ["9", "18"]], { hint: "Add the number to itself.", why: "4 + 4 = 8, 6 + 6 = 12 and 9 + 9 = 18.", tag: "divide.double_match" })]),
  Q(mc("Aisha says 15 sweets can be shared equally between 2 girls. Is she right?", "No. 15 is odd, so one sweet is left over", ["Yes, they get 8 each", "Yes, they get 7 each"], { hint: "Try 7 + 7 and 8 + 8.", why: "7 + 7 = 14 and 8 + 8 = 16. No double makes 15, so 15 cannot be halved evenly.", tag: "divide.reason_odd" }), "halve", "reason",
    [mc("Mina says 9 cookies can be shared equally between 2 girls. Is she right?", "No. 9 is odd, so one cookie is left over", ["Yes, they get 5 each", "Yes, they get 4 each"], { hint: "Try 4 + 4 and 5 + 5.", why: "4 + 4 = 8 and 5 + 5 = 10. No double makes 9, so 9 cannot be halved evenly.", tag: "divide.reason_odd" })]),

  // ----- try (q9-q16)
  Q(num("Zara shares 12 cookies between 3 cousins. How many cookies does each cousin get?", 4, { hint: "Deal them out one at a time.", why: "3 groups of 4 make 12, so each gets 4.", tag: "divide.share" }), "share", "apply",
    [num("Hana shares 15 grapes between 3 cousins. How many grapes does each cousin get?", 5, { hint: "Deal them out one at a time.", why: "3 groups of 5 make 15, so each gets 5.", tag: "divide.share" })]),
  Q(num("12 cookies go into bags of 3. How many bags are needed?", 4, { hint: "Count in threes to 12.", why: "3, 6, 9, 12 is 4 bags.", tag: "divide.group" }), "share", "apply",
    [num("15 mangoes go into bags of 5. How many bags are needed?", 3, { hint: "Count in fives to 15.", why: "5, 10, 15 is 3 bags.", tag: "divide.group" })]),
  Q(mc("Mira shares 12 cookies between 3 children and says there are 3 cookies in each group. Which fact is true?", "3 children each get 4 cookies", ["3 cookies each, 4 children", "12 children each get 3 cookies"], { hint: "Who are you sharing between?", why: "Sharing between 3 children means 3 groups. 12 shared between 3 is 4 each.", tag: "divide.reason_share_group" }), "share", "reason",
    [mc("Nora shares 20 sweets between 4 children and says each child gets 4. Which fact is true?", "4 children each get 5 sweets", ["4 sweets each, 5 children", "20 children each get 4 sweets"], { hint: "Who are you sharing between?", why: "Sharing between 4 children means 4 groups. 20 shared between 4 is 5 each.", tag: "divide.reason_share_group" })]),
  Q(hot("Tap the sweets in equal groups of 4.", [["🍬", "4, 4 and 4", 22, 50], ["🍬", "5, 4 and 3", 50, 50], ["🍬", "6 and 6", 78, 50]], ["4, 4 and 4"], { labels: true, hint: "Every group must be the same size.", why: "4, 4 and 4 are equal groups. The others are different sizes or not groups of 4.", tag: "divide.equal_sets" }), "share", "apply",
    [hot("Tap the sweets in equal groups of 5.", [["🍬", "5 and 5", 22, 50], ["🍬", "6 and 4", 50, 50], ["🍬", "7, 2 and 1", 78, 50]], ["5 and 5"], { labels: true, hint: "Every group must be the same size.", why: "5 and 5 are equal groups. The others are different sizes.", tag: "divide.equal_sets" })]),
  Q(ms("Which two ways share 10 sweets fairly? Pick two.", ["5 each between 2 children", "2 each between 5 children"], ["4 each between 2 children", "3 each between 5 children"], { hint: "Multiply to check: does it make 10?", why: "2 × 5 = 10 and 5 × 2 = 10. 2 × 4 = 8 and 5 × 3 = 15.", tag: "divide.fair_ways" }), "share", "apply",
    [ms("Which two ways share 20 sweets fairly? Pick two.", ["10 each between 2 children", "4 each between 5 children"], ["8 each between 2 children", "5 each between 5 children"], { hint: "Multiply to check: does it make 20?", why: "2 × 10 = 20 and 5 × 4 = 20. 2 × 8 = 16 and 5 × 5 = 25.", tag: "divide.fair_ways" })]),
  Q(ord("Put the steps for sharing 12 cookies between 3 plates in order.", ["Put out 3 plates", "Give one cookie to each plate", "Keep dealing until none are left", "Count the cookies on one plate: 4"], { hint: "Set up, deal, then count.", why: "You set out the plates, deal fairly, then count one plate.", tag: "divide.share_steps" }), "share", "apply",
    [ord("Put the steps for sharing 10 sweets between 2 bowls in order.", ["Put out 2 bowls", "Give one sweet to each bowl", "Keep dealing until none are left", "Count the sweets in one bowl: 5"], { hint: "Set up, deal, then count.", why: "You set out the bowls, deal fairly, then count one bowl.", tag: "divide.share_steps" })]),
  Q(num("20 sweets are shared between 10 children. How many does each child get?", 2, { hint: "10 times what makes 20?", why: "10 × 2 = 20, so each child gets 2.", tag: "divide.share_ten" }), "share", "apply",
    [num("30 stickers are shared between 10 children. How many does each child get?", 3, { hint: "10 times what makes 30?", why: "10 × 3 = 30, so each child gets 3.", tag: "divide.share_ten" })]),
  Q(mc("Omar says 10 ÷ 5 = 5 because 5 + 5 = 10. Is he right?", "No. 10 ÷ 5 = 2, because 5 × 2 = 10", ["Yes, 10 ÷ 5 = 5", "No, 10 ÷ 5 = 15"], { hint: "How many fives fit in 10?", why: "5 + 5 = 10 shows two fives. So 10 divided by 5 is 2.", tag: "divide.reason_five" }), "share", "reason",
    [mc("Ben says 12 ÷ 6 = 6 because 6 + 6 = 12. Is he right?", "No. 12 ÷ 6 = 2, because 6 × 2 = 12", ["Yes, 12 ÷ 6 = 6", "No, 12 ÷ 6 = 18"], { hint: "How many sixes fit in 12?", why: "6 + 6 = 12 shows two sixes. So 12 divided by 6 is 2.", tag: "divide.reason_five" })]),

  // ----- play (q17-q23)
  Q(hot("Tap the divisor in 12 ÷ 3 = 4.", [["🔢", "12", 22, 50], ["🔢", "3", 50, 50], ["🔢", "4", 78, 50]], ["3"], { labels: true, hint: "It is the number we divide by.", why: "We divide by 3, so 3 is the divisor.", tag: "divide.words" }), "sentence", "recall",
    [hot("Tap the quotient in 20 ÷ 5 = 4.", [["🔢", "20", 22, 50], ["🔢", "5", 50, 50], ["🔢", "4", 78, 50]], ["4"], { labels: true, hint: "The quotient is the answer.", why: "The answer to the division is 4, so 4 is the quotient.", tag: "divide.words" })]),
  Q(fill("Find the missing number.", "{b1} ÷ 2 = 5, so 2 × 5 = {b2}.", [["10", "8", "12"], ["10", "7", "12"]], { hint: "Half of what is 5?", why: "10 ÷ 2 = 5 and 2 × 5 = 10.", tag: "divide.missing" }), "sentence", "apply",
    [fill("Work out the gap.", "{b1} ÷ 2 = 7, so 2 × 7 = {b2}.", [["14", "12", "9"], ["14", "9", "12"]], { hint: "Half of what is 7?", why: "14 ÷ 2 = 7 and 2 × 7 = 14.", tag: "divide.missing" })]),
  Q(sld("Slide to show 20 ÷ 5.", { min: 0, max: 20 }, 4, 0, { hint: "Count in fives to 20.", why: "5 × 4 = 20, so 20 ÷ 5 = 4.", tag: "divide.by_five" }), "sentence", "apply",
    [sld("Slide to show 35 ÷ 5.", { min: 0, max: 20 }, 7, 0, { hint: "Count in fives to 35.", why: "5 × 7 = 35, so 35 ÷ 5 = 7.", tag: "divide.by_five" })]),
  Q(num("What is 40 ÷ 10?", 4, { hint: "10 times what makes 40?", why: "10 × 4 = 40, so 40 ÷ 10 = 4.", tag: "divide.by_ten" }), "sentence", "apply",
    [num("What is 70 ÷ 10?", 7, { hint: "10 times what makes 70?", why: "10 × 7 = 70, so 70 ÷ 10 = 7.", tag: "divide.by_ten" })]),
  Q(mat("Match each picture story to its sentence.", [["12 shared into 2 groups", "12 ÷ 2 = 6"], ["12 put in groups of 4", "12 ÷ 4 = 3"], ["12 shared into 6 groups", "12 ÷ 6 = 2"]], { hint: "Use the number of groups or the group size.", why: "12 ÷ 2 = 6, 12 ÷ 4 = 3 and 12 ÷ 6 = 2.", tag: "divide.sentence_match" }), "sentence", "apply",
    [mat("Join each story to its sentence.", [["20 shared into 2 groups", "20 ÷ 2 = 10"], ["20 put in groups of 5", "20 ÷ 5 = 4"], ["20 shared into 10 groups", "20 ÷ 10 = 2"]], { hint: "Use the number of groups or the group size.", why: "20 ÷ 2 = 10, 20 ÷ 5 = 4 and 20 ÷ 10 = 2.", tag: "divide.sentence_match" })]),
  Q(mc("Zainab says 0 ÷ 4 = 4. Is she right?", "No. Nothing shared between 4 children gives 0 each", ["Yes, 4 each", "No, the answer is 1"], { hint: "How many sweets are there to share?", why: "With 0 sweets, each child gets 0. So 0 ÷ 4 = 0.", tag: "divide.reason_zero" }), "sentence", "reason",
    [mc("Ben says 0 ÷ 7 = 7. Is he right?", "No. Nothing shared between 7 children gives 0 each", ["Yes, 7 each", "No, the answer is 1"], { hint: "How many sweets are there to share?", why: "With 0 sweets, each child gets 0. So 0 ÷ 7 = 0.", tag: "divide.reason_zero" })]),
  Q(tf("3 × 4 = 12, so 12 ÷ 3 = 4.", true, { hint: "Use the times fact backwards.", why: "A times fact gives two divide facts. 12 ÷ 3 = 4.", tag: "divide.fact_family" }), "sentence", "apply",
    [tf("5 × 3 = 15, so 15 ÷ 5 = 5.", false, { hint: "Use the times fact backwards.", why: "15 ÷ 5 = 3, because 5 × 3 = 15.", tag: "divide.fact_family" })]),

  // ----- use (q24-q30)
  Q(num("Zara has 14 Eid sweets to share between 2 cousins. How many sweets does each cousin get?", 7, { hint: "Between 2 means half.", why: "Half of 14 is 7.", tag: "divide.word_two" }), "fair", "apply",
    [num("Uncle has 18 samosas to share between 2 families. How many samosas does each family get?", 9, { hint: "Between 2 means half.", why: "Half of 18 is 9.", tag: "divide.word_two" })]),
  Q(num("25 dates are shared fairly between 5 bowls. How many dates go in each bowl?", 5, { hint: "5 times what makes 25?", why: "5 × 5 = 25, so 5 dates in each bowl.", tag: "divide.word_five" }), "fair", "apply",
    [num("30 almonds are shared fairly between 5 bags. How many almonds go in each bag?", 6, { hint: "5 times what makes 30?", why: "5 × 6 = 30, so 6 almonds in each bag.", tag: "divide.word_five" })]),
  Q(mc("13 sweets are shared fairly between 2 children. What happens?", "6 each and 1 left over", ["6 each and none left over", "7 each and none left over"], { hint: "6 + 6 = ? and 7 + 7 = ?", why: "6 + 6 = 12, so 1 sweet is left over. 7 each would need 14.", tag: "divide.leftover" }), "fair", "apply",
    [mc("11 stickers are shared fairly between 2 children. What happens?", "5 each and 1 left over", ["5 each and none left over", "6 each and none left over"], { hint: "5 + 5 = ? and 6 + 6 = ?", why: "5 + 5 = 10, so 1 sticker is left over. 6 each would need 12.", tag: "divide.leftover" })]),
  Q(mc("Sam says dividing a number by 1 changes the number, so 8 ÷ 1 is 4. Is he right?", "No. 8 ÷ 1 = 8, because one child gets all 8", ["Yes, 8 ÷ 1 = 4", "No, 8 ÷ 1 = 1"], { hint: "Share 8 sweets with just one child.", why: "One child gets all 8 sweets. A number divided by 1 stays the same.", tag: "divide.reason_one" }), "fair", "reason",
    [mc("Ben says 7 ÷ 1 = 1. Is he right?", "No. 7 ÷ 1 = 7, because one child gets all 7", ["Yes, 7 ÷ 1 = 1", "No, 7 ÷ 1 = 6"], { hint: "Share 7 sweets with just one child.", why: "One child gets all 7 sweets. A number divided by 1 stays the same.", tag: "divide.reason_one" })]),
  Q(mc("Hamza says 6 ÷ 6 = 0. Is he right?", "No. 6 ÷ 6 = 1, because each of 6 children gets 1", ["Yes, 6 ÷ 6 = 0", "No, 6 ÷ 6 = 6"], { hint: "Share 6 sweets between 6 children.", why: "Each child gets 1 sweet. A number divided by itself is 1.", tag: "divide.reason_itself" }), "fair", "reason",
    [mc("Nora says 9 ÷ 9 = 0. Is she right?", "No. 9 ÷ 9 = 1, because each of 9 children gets 1", ["Yes, 9 ÷ 9 = 0", "No, 9 ÷ 9 = 9"], { hint: "Share 9 sweets between 9 children.", why: "Each child gets 1 sweet. A number divided by itself is 1.", tag: "divide.reason_itself" })]),
  Q(ms("Which two numbers can be shared into groups of 10 with none left over? Pick two.", ["30", "50"], ["35", "42"], { hint: "Numbers in the 10 times table end in 0.", why: "30 and 50 are in the 10 times table. 35 and 42 are not.", tag: "divide.divisible" }), "fair", "apply",
    [ms("Which two numbers can be shared into groups of 5 with none left over? Pick two.", ["15", "40"], ["12", "23"], { hint: "Numbers in the 5 times table end in 0 or 5.", why: "15 and 40 are in the 5 times table. 12 and 23 are not.", tag: "divide.divisible" })]),
  Q(ord("Put the steps for packing 20 sweets into boxes of 5 in order.", ["Take 5 sweets for the first box", "Take 5 more for the next box", "Keep going until all 20 are packed", "Count the boxes: 4"], { hint: "Pack, pack, finish, count.", why: "You pack box after box, then count: 20 ÷ 5 = 4.", tag: "divide.pack_steps" }), "fair", "apply",
    [ord("Put the steps for packing 12 eggs into trays of 6 in order.", ["Take 6 eggs for the first tray", "Take 6 more for the next tray", "Check that none are left", "Count the trays: 2"], { hint: "Pack, pack, check, count.", why: "You fill tray after tray, then count: 12 ÷ 6 = 2.", tag: "divide.pack_steps" })]),
];

export const topics = [
  topicLesson({
    slug: "maths-class-1-doubling-halving-division", subject: "maths", cls: 1, topic: 10, title: "Doubling, Halving and Dividing",
    summary: "Double and halve numbers, share and group into equal sets, and read division sentences.",
    unit: "Topic 10: Doubling, halving and dividing", difficulty: 2,
    objectives: ["Double and halve numbers", "Share and group to divide", "Read and write a division sentence"],
    success_criteria: ["I can double and halve small numbers", "I can share and group equally", "I can read a division sentence like 12 ÷ 3 = 4"],
    real_life: "Sharing Eid sweets with cousins, packing samosas into boxes, or splitting dates between bowls.",
    standards: [
      { framework: "nc_england", code: "Y2 mult/div", text: "Solve problems involving multiplication and division, using materials, arrays, repeated addition and mental methods; recognise and find half of a quantity" },
      { framework: "cambridge", code: "2Nc.07" }, { framework: "cambridge", code: "2Nc.08" },
    ],
    warm_up: [
      num("What is 3 + 3?", 6, { hint: "Double 3.", why: "3 + 3 = 6." }),
      num("What is 5 + 5?", 10, { hint: "Double 5.", why: "5 + 5 = 10." }),
      tf("2, 4, 6, 8 is counting in twos.", true, { hint: "Each step adds 2.", why: "Each number is 2 more." }),
    ],
    intro: [],
    subs: [halve, share, sentence, fair],
    clip,
    quiz,
  }),
];
