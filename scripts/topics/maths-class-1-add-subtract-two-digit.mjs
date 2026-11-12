import { SAY, SS, H, T, IMG, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, EXP, GLOSS, PV, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Class 1 Maths topic 9: adding and subtracting 2-digit numbers (format 3.0, the pilot for the new standard).
// Story thread: Zara and her uncle Bilal's mango stall in Lahore, then her cousin Hana's corner shop in London.
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });
const HB = (text, backdrop) => ({ ...H(text), backdrop });
const NL = (id, from, to, value, x = 50, y = 46, size = 3, anim = "none") => [id, { kind: "number_line", from, to, value }, x, y, size, anim];
const TF = (id, value, x = 50, y = 44, size = 3, anim = "none", label) => [id, { kind: "ten_frame", value }, x, y, size, anim, label];
const OK = (label) => ["ok", "✅", 50, 90, 2, "bounce", label];

const PHOTO = "maths-class-1-add-subtract-two-digit-1-f3462c9c.jpg";
// Coteach diagrams (see content/media/manifest.d/maths-class-1-add-subtract-two-digit.json).
const DG = (asset, alt, caption) => ({ type: "image", asset, alt, caption });
const D_REGROUP = DG("maths-class-1-add-subtract-two-digit-d1-2f87b765.png", "Base ten blocks for 28 plus 15: 3 tens and 13 ones, with 10 ones swapped for a new ten rod, giving 4 tens and 3 ones", "28 + 15: ten ones swap for one new ten rod.");
const D_HOPS = DG("maths-class-1-add-subtract-two-digit-d2-2ebfb2cc.png", "A number line from 20 to 50 with hops of +2 from 28 to 30, +10 to 40 and +3 to 43", "28 + 2 + 10 + 3 = 43.");
const D_BAR = DG("maths-class-1-add-subtract-two-digit-d3-45f42363.png", "A bar model with a whole of 75 split into a known part of 36 and an unknown part marked with a question mark", "A bar model: 36 and a missing part make 75.");

// ---------------------------------------------------------------------------------------------- 1. learn
const tensOnes = {
  id: "tens_ones", kind: "learn", title: "Tens first, then ones",
  blocks: [
    HB("Meet Zara and the mango stall", "town"),
    SAY("Meet Zara. She helps her uncle Bilal at his mango stall in Lahore. Mangoes, mangoes everywhere! Today Zara must count them all. We will help her. We will add and take away big numbers. We split them into tens and ones.",
      { type: "image", asset: PHOTO, alt: "Ripe mangoes in a box at a market stall with hand-written price signs", caption: "Zara's uncle sells mangoes at a market stall.", credit: "Photo by leila goodman on Unsplash" }),
    HB("Stop 1: Split into tens and ones", "classroom"),
    SAY("Every two-digit number is made of tens and ones. Take thirty-four. It has three tens and four ones. A ten is a long rod. A one is a little square. Let's split thirty-four and twenty-three together.",
      T("A **2-digit number** is made of **tens** and **ones**.", "34 is 3 tens and 4 ones.", "**Partition** means to split a number into parts.")),
    EXPP("34 + 23: split into tens and ones",
      SS("Here is thirty-four. Three tens and four ones. Say it with me: three tens, four ones.", S("34 = 3 tens and 4 ones.", PV("a", 3, 4, 50, 48, 3))),
      SS("Now here is twenty-three. Two tens and three ones. Do we count every single one? No way!", S("34 and 23, split into tens and ones.", PV("a", 3, 4, 27, 48, 1), PV("b", 2, 3, 73, 48, 1, "pulse"))),
      SS("Add the tens first. Three tens and two tens make five tens. That is fifty.", S("30 + 20 = 50. Five tens.", PV("t", 5, 0, 50, 48, 3, "pulse"))),
      SS("Now add the ones. Four ones and three ones make seven ones. Fifty and seven make fifty-seven!", S("4 + 3 = 7 ones. 50 + 7 = 57.", PV("t", 5, 7, 50, 48, 3, "pulse"), OK("34 + 23 = 57")))),
    CHK(num("How many tens are in the number 25?", 2, { hint: "Look at the left digit.", why: "25 is 2 tens and 5 ones.", tag: "addsub2.partition" })),
    HB("Stop 2: Add the tens, then the ones", "classroom"),
    SAY("Here is the trick. Add the tens. Then add the ones. Then put the two answers together. Let's try twenty-five plus fourteen. Watch the frog hop along the number line.",
      T("**Add** the tens, then add the ones, then put them together.", "25 + 14: 20 + 10 = 30 and 5 + 4 = 9, so the **total** is 39.")),
    EXPP("25 + 14 on the number line",
      SS("The frog starts on twenty-five. Fourteen is one ten and four ones.", S("Start at 25.", NL("f", 25, 40, 25))),
      SS("Hop one ten. Twenty-five to thirty-five. That is the tens part.", S("+ 10 makes 35.", NL("f", 25, 40, 35, 50, 46, 3, "pulse"))),
      SS("Now hop four ones. Thirty-six, thirty-seven, thirty-eight, thirty-nine. The frog lands on thirty-nine!", S("+ 4 makes 39. 25 + 14 = 39.", NL("f", 25, 40, 39, 50, 46, 3, "pulse"), OK("25 + 14 = 39")))),
    CHK(num("What is 32 + 15? Add the tens, then the ones.", 47, { hint: "30 + 10 is 40. Then 2 + 5.", why: "30 + 10 = 40 and 2 + 5 = 7, so 32 + 15 = 47.", tag: "addsub2.add_tens_ones" })),
    SAY("Remember. Split into tens and ones. Add the tens. Add the ones. Put them together.", SUM("A 2-digit number is tens and ones", "Add the tens, then add the ones", "Put the two answers together")),
    GLOSS({ "2-digit number": "A number with a tens digit and a ones digit, like 34.", tens: "Groups of ten. In 34 there are 3 tens.", ones: "The single ones. In 34 there are 4 ones.", partition: "To split a number into parts.", add: "To put numbers together.", total: "The answer when you add." }),
  ],
  mini: [
    num("What is 21 + 34?", 55, { hint: "Add the tens, then the ones.", why: "20 + 30 = 50 and 1 + 4 = 5, so 55." }),
    mc("How many tens are in 47?", "4", ["7", "47"], { hint: "The left digit shows the tens.", why: "47 is 4 tens and 7 ones." }),
    tf("In the number 56, the 6 is the tens digit.", false, { hint: "The tens digit is on the left.", why: "In 56 the 5 is the tens digit. The 6 is the ones digit." }),
    num("What is 40 + 3 + 20 + 5?", 68, { hint: "Add the tens, then the ones.", why: "40 + 20 = 60 and 3 + 5 = 8, so 68." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const crossing = {
  id: "cross", kind: "try", title: "Crossing the ten",
  blocks: [
    HB("Stop 1: 28 + 15 with ten frames", "classroom"),
    SAY("Zara has twenty-eight mangoes. Her uncle gives her fifteen more. Look at the ones. Eight and five make more than nine! That means a brand new ten is born. Watch the ten frames.",
      T("When the ones make more than 9, you make a new **ten**.", "This is called **crossing a ten**.")),
    EXPP("28 + 15 with ten frames",
      SS("Twenty-eight is two tens and eight ones. Fifteen is one ten and five ones.", S("28 and 15.", PV("a", 2, 8, 27, 48, 1), PV("b", 1, 5, 73, 48, 1, "pulse"))),
      SS("Add the tens first. Two tens and one ten make three tens. That is thirty.", S("20 + 10 = 30.", PV("t", 3, 0, 50, 48, 3, "pulse"))),
      SS("Now the ones. Eight and five. Each ten frame holds only ten. Will they fit?", S("8 + 5 in ten frames.", TF("f1", 8, 27, 44, 1), TF("f2", 5, 73, 44, 1))),
      SS("Take two from the five to fill the first frame. That makes ten! Three are left over.", S("8 + 2 = 10, and 3 left.", TF("f1", 10, 27, 44, 1, "pulse"), TF("f2", 3, 73, 44, 1), ["m", "➡️", 50, 44, 1, "none"])),
      SS("Eight and five make thirteen. That is one ten and three ones.", S("8 + 5 = 13.", TF("f1", 10, 27, 44, 1), TF("f2", 3, 73, 44, 1), ["e", "✅", 50, 90, 2, "bounce", "13 = 1 ten and 3 ones"])),
      SS("Now thirty and thirteen. Three tens and one more ten make four tens. Four tens and three ones is forty-three!", S("30 + 13 = 43.", PV("t", 4, 3, 50, 48, 3, "pulse"), OK("28 + 15 = 43")))),
    MAN("Make a tray of ten", "Zara has 8 mangoes. Her uncle gives her 5 more. Move 10 mangoes into the Tray of ten. How many are left over?", "🥭", 13, ["Loose mangoes", "Tray of ten"]),
    SAY("Here is the picture. Three tens and thirteen ones. Ten ones swap for one new ten rod. Now we have four tens and three ones.", D_REGROUP),
    CHK(num("You add 7 + 6 and get 13. After you make a ten, how many ones are left?", 3, { hint: "13 is one ten and some ones.", why: "13 is 1 ten and 3 ones.", tag: "addsub2.cross_ones" })),
    HB("Stop 2: Split just one number", "classroom"),
    SAY("Here is a speedy way. Keep twenty-eight whole. Split only the fifteen. Split fifteen into two, ten and three. Hop two to reach thirty. Hop ten to forty. Hop three more.",
      T("Keep one number **whole** and split the other.", "28 + 15: 28 + 2 = 30, 30 + 10 = 40, 40 + 3 = 43.")),
    EXPP("Hop across the ten",
      SS("The frog is on twenty-eight. Fifteen is the same as two, ten and three.", S("Start at 28. 15 = 2 + 10 + 3.", NL("f", 25, 45, 28))),
      SS("Hop two. Twenty-eight and two make thirty. Thirty is a friendly ten!", S("28 + 2 = 30.", NL("f", 25, 45, 30, 50, 46, 3, "pulse"))),
      SS("Now hop one whole ten. Thirty to forty.", S("30 + 10 = 40.", NL("f", 25, 45, 40, 50, 46, 3, "pulse"))),
      SS("Last, hop three. Forty-one, forty-two, forty-three. The frog lands on forty-three. It is the same answer!", S("40 + 3 = 43.", NL("f", 25, 45, 43, 50, 46, 3, "pulse"), OK("28 + 15 = 43")))),
    SAY("Here is the whole hop on one line. Two, then ten, then three. Twenty-eight lands on forty-three.", D_HOPS),
    ACT("Mango trays at home", ["Buttons, pasta shapes or paper circles", "A small bowl for the tray of ten"], ["Count out 36 buttons. How many full trays of ten can you make? How many are loose?", "Now add 17 more buttons.", "Fill up the loose ones to make another ten first.", "How many full trays now? How many loose? What is 36 + 17?"]),
    CHK(num("What is 19 + 14? Split only the 14.", 33, { hint: "19 + 1 makes 20. Then add the rest.", why: "14 is 1 and 13. 19 + 1 = 20 and 20 + 13 = 33.", tag: "addsub2.split_one" })),
    SAY("Remember. When the ones make more than nine, a new ten is born. Fill a ten first, or split just one number.", SUM("Ones more than 9 make a new ten", "Fill a ten first", "Or keep one number whole and split the other")),
    GLOSS({ ten: "A group of 10 things.", "ten frame": "A box with 10 spaces for counters.", "crossing a ten": "When the ones add up to more than 9, so a new ten is made.", whole: "The complete number, not split.", ones: "The single ones, like the 8 in 28." }),
  ],
  mini: [
    num("8 + 7 = 15. That is 1 ten and how many ones?", 5, { hint: "15 is ten and some more.", why: "15 is 1 ten and 5 ones." }),
    mc("Which sum makes a new ten in the ones?", "27 + 15", ["24 + 13", "31 + 42"], { hint: "Add only the ones digits. Is it more than 9?", why: "7 + 5 = 12, so 27 + 15 crosses a ten. The others make 7 and 3 ones." }),
    num("What is 36 + 27?", 63, { hint: "30 + 20 = 50, then 6 + 7 = 13.", why: "50 + 13 = 63." }),
    tf("In 26 + 17, the ones 6 + 7 make 13.", true, { hint: "Six and seven.", why: "6 + 7 = 13." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const takeaway = {
  id: "takeaway", kind: "play", title: "Take-away race",
  blocks: [
    HB("Stop 1: 63 - 24, split the part", "classroom"),
    SAY("Time for a take-away race! Uncle Bilal had sixty-three mangoes. He sold twenty-four. How many are left? To take away means to make a number smaller. Here is the trick. Split only the part you take away.",
      T("To **take away** is to make a number smaller.", "63 - 24: take away 20 first, then take away 4.")),
    EXPP("63 - 24",
      SS("Sixty-three is six tens and three ones. We must take away twenty-four.", S("63 = 6 tens and 3 ones.", PV("a", 6, 3, 50, 48, 3))),
      SS("First take away the two tens. Four tens are left.", S("63 - 20 = 43.", PV("a", 4, 3, 50, 48, 3, "pulse"))),
      SS("Now take away four more. The frog starts on forty-three.", S("Start at 43 and take away 4.", NL("f", 36, 46, 43))),
      SS("Hop back three. That lands on forty. Forty is a friendly ten!", S("43 - 3 = 40.", NL("f", 36, 46, 40, 50, 46, 3, "pulse"))),
      SS("One more to go. Hop back one. Thirty-nine! Zara has thirty-nine mangoes left.", S("40 - 1 = 39. 63 - 24 = 39.", NL("f", 36, 46, 39, 50, 46, 3, "pulse"), OK("63 - 24 = 39")))),
    CHK(num("What is 85 - 32?", 53, { hint: "Take away 30, then take away 2.", why: "85 - 30 = 55 and 55 - 2 = 53.", tag: "addsub2.subtract_no_cross" })),
    HB("Stop 2: Take away across a ten", "classroom"),
    SAY("Careful with the ones! Look at seventy-five take away six. Do not do six take away five. The big number always comes first. Hop back five to reach seventy. Then hop back one more.",
      T("Always start from the big number: 75 - 6.", "75 - 5 = 70, then 70 - 1 = 69.")),
    EXPP("75 - 6",
      SS("The frog is on seventy-five. We take away six.", S("Start at 75. Take away 6.", NL("f", 65, 75, 75))),
      SS("Hop back five. Seventy-five take away five is seventy. That is a friendly ten.", S("75 - 5 = 70.", NL("f", 65, 75, 70, 50, 46, 3, "pulse"))),
      SS("We still have one to take away. Hop back one. Sixty-nine!", S("70 - 1 = 69. 75 - 6 = 69.", NL("f", 65, 75, 69, 50, 46, 3, "pulse"), OK("75 - 6 = 69")))),
    SAY("Flip the cards and find the matching pairs. A little brain break!", BRAIN("memory_match", "Mango match", "Find the matching pairs of fruit.", ["🥭", "🍎", "🍌", "🍇", "🍊", "🍉"])),
    ACT("Take-away race at home", ["A grown-up or friend", "Paper and a pencil"], ["Write a start number between 50 and 99, like 83.", "Your friend picks a number between 10 and 40 to take away.", "Race to work it out. Say how you split the number.", "Check your answer by adding the part back on."]),
    CHK(mc("Which first hop makes 52 - 7 easier?", "Back 2 to reach 50", ["Forward 2 to reach 54", "Do 7 - 2 first"], { hint: "Hop to the nearest friendly ten.", why: "52 - 2 = 50, then take away 5 more to make 45.", tag: "addsub2.subtract_bridge" })),
    SAY("Remember. Split the part you take away. Hop to a friendly ten. Start with the big number.", SUM("Split the part you take away", "Hop back to a friendly ten", "Always start with the big number")),
    GLOSS({ "take away": "To make a number smaller by taking some off.", subtract: "To take away.", part: "A piece of the whole.", "friendly ten": "A number like 30, 40 or 50 that is easy to work with.", ones: "The single ones, like the 3 in 63." }),
  ],
  mini: [
    num("What is 48 - 5?", 43, { hint: "Only the ones change.", why: "8 - 5 = 3, so 48 - 5 = 43." }),
    num("What is 73 - 20?", 53, { hint: "Take away two tens.", why: "7 tens take away 2 tens is 5 tens, so 53." }),
    tf("75 - 6 = 71.", false, { hint: "Hop back to 70, then one more.", why: "75 - 5 = 70 and 70 - 1 = 69. So 75 - 6 = 69." }),
    mc("Zara has 62 mangoes and sells 4. Which first step is a good one?", "Take 2 to reach 60", ["Take 4 from 2", "Add 4 to 62"], { hint: "Go to the nearest ten.", why: "62 - 2 = 60, then take away 2 more to make 58." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const shop = {
  id: "shop", kind: "use", title: "Shop and school problems",
  blocks: [
    HB("Stop 1: Lahore and London", "town"),
    SAY("Uncle Bilal had forty-six mangoes in the morning. By lunchtime he had sold twenty-eight. How many are left? The word sold tells us to take away. Let's see.",
      T("**Sold** means take away. 46 - 28 = ?", "Take away 20 first, then take away 8.")),
    EXPP("46 - 28",
      SS("Forty-six mangoes. Four tens and six ones.", S("46 mangoes.", PV("a", 4, 6, 50, 48, 3))),
      SS("Take away twenty. Two tens go. Twenty-six are left.", S("46 - 20 = 26.", PV("a", 2, 6, 50, 48, 3, "pulse"))),
      SS("Now take away eight. Take six to reach twenty. Then take two more. Eighteen left!", S("26 - 8 = 18.", PV("a", 1, 8, 50, 48, 3, "pulse"), OK("46 - 28 = 18")))),
    SAY("Now fly to London! Zara's cousin Hana helps at a corner shop. The shop has thirty-seven red apples and twenty-six green apples. How many apples in all? In all tells us to add. Fifty and thirteen make sixty-three.",
      IMG("🍎🍏", "37 red apples and 26 green apples. 30 + 20 = 50 and 7 + 6 = 13, so 63 apples.")),
    CHK(num("A stall has 50 samosas. It sells 27. How many samosas are left?", 23, { hint: "Take away 20, then take away 7.", why: "50 - 20 = 30 and 30 - 7 = 23.", tag: "addsub2.word_subtract" })),
    HB("Stop 2: The missing number story", "home"),
    SAY("Zara has twenty-four dates for iftar. Her uncle gives her some more. Now she has forty-one. How many did he give her? We do not know the number. That is the missing number. Count up from twenty-four to forty-one.",
      T("A **missing number** is a number we need to find.", "24 + ? = 41. Count up from 24 to 41.")),
    SAY("Here is a bar model. The whole is seventy-five. One part is thirty-six. The other part is the question mark. Thirty-six and what make seventy-five?", D_BAR),
    EXPP("24 + ? = 41",
      SS("The frog starts on twenty-four. We want to land on forty-one.", S("Start at 24. Target 41.", NL("f", 24, 44, 24))),
      SS("Hop six to reach thirty. That is the first friendly ten.", S("24 + 6 = 30.", NL("f", 24, 44, 30, 50, 46, 3, "pulse"))),
      SS("Hop ten to forty. Then one more to forty-one.", S("30 + 10 = 40, then 40 + 1 = 41.", NL("f", 24, 44, 41, 50, 46, 3, "pulse"))),
      SS("Six, ten and one make seventeen. Uncle gave Zara seventeen dates!", S("6 + 10 + 1 = 17.", NL("f", 24, 44, 41), OK("24 + 17 = 41")))),
    REVEAL("Zara checks with a take-away. What is 41 - 24? Have a think first.", "17. Adding and taking away are opposites, so 41 - 24 gives the missing number too."),
    CHK(num("Ali has 19 stickers. He gets some more and now has 32. How many more did he get?", 13, { hint: "Count up from 19 to 32.", why: "19 + 1 = 20 and 20 + 12 = 32, so he got 13 more.", tag: "addsub2.missing_number" })),
    SAY("Remember. Sold means take away. In all means add. Check an answer with the opposite sum.", SUM("Sold means take away", "In all means add", "Check with the opposite sum")),
    GLOSS({ sold: "Given away for money.", "in all": "Altogether, so we add.", "missing number": "A number we need to find.", opposite: "The sum that goes the other way. Adding is the opposite of taking away.", iftar: "The meal when Muslims break their fast." }),
  ],
  mini: [
    num("A shop has 45 pens and sells 17. How many pens are left?", 28, { hint: "Take away 10, then 7.", why: "45 - 10 = 35 and 35 - 7 = 28." }),
    num("There are 26 red and 38 blue balloons. How many balloons in all?", 64, { hint: "20 + 30 = 50, then 6 + 8 = 14.", why: "50 + 14 = 64." }),
    mc("In a story, the words 'in all' tell you to...", "add", ["take away", "do nothing"], { hint: "In all means altogether.", why: "In all means altogether, so we add." }),
    tf("If 30 + 14 = 44, then 44 - 14 = 30.", true, { hint: "Adding and taking away are opposites.", why: "Taking the 14 off again leaves 30." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Zara fills a tray of ten", backdrop: "town", caption: "Watch Zara cross a ten at the mango stall.",
  scenes: [
    { caption: "Zara at the mango stall.", say: "This is Zara. She helps her uncle Bilal at his mango stall in Lahore.",
      items: [{ id: "z", emoji: "👧", label: "Zara", x: 22, y: 56, size: 3, anim: "bounce", enter: "walk_right" }, { id: "u", emoji: "👨", label: "Uncle Bilal", x: 78, y: 56, size: 3, enter: "walk_left" }, { id: "m", emoji: "🥭", x: 50, y: 30, size: 3, enter: "pop" }] },
    { caption: "27 mangoes, and 16 more.", say: "Uncle has twenty-seven mangoes. A van brings sixteen more. How many mangoes now?",
      items: [{ id: "a", prop: { kind: "base_ten", tens: 2, ones: 7 }, label: "27", x: 28, y: 48, size: 1, enter: "slide_right" }, { id: "b", prop: { kind: "base_ten", tens: 1, ones: 6 }, label: "16", x: 72, y: 48, size: 1, enter: "slide_left", effect: "sparkle" }] },
    { caption: "7 loose mangoes in a tray.", say: "Zara has a tray that holds ten. Twenty-seven is two full trays and seven loose.",
      items: [{ id: "f", prop: { kind: "ten_frame", value: 7 }, label: "7 loose", x: 50, y: 46, size: 3, enter: "grow" }] },
    { caption: "3 more fill the tray.", say: "Zara picks three mangoes from the new box. Seven and three make ten!",
      camera: { zoom: 1.2, x: 50, y: 46 },
      items: [{ id: "f", prop: { kind: "ten_frame", value: 10 }, label: "full tray", x: 50, y: 46, size: 3, effect: "glow" }, { id: "t", emoji: "🥭", label: "+ 3", x: 82, y: 30, size: 2, path: "arc", enter: "slide_left" }] },
    { caption: "16 - 3 = 13 left in the box.", say: "The box had sixteen. Three are gone. Thirteen are left.",
      items: [{ id: "f", prop: { kind: "ten_frame", value: 10 }, label: "full tray", x: 25, y: 46, size: 2 }, { id: "c", prop: { kind: "base_ten", tens: 1, ones: 3 }, label: "13 left", x: 72, y: 48, size: 1, enter: "pop" }] },
    { caption: "Trays: 3 tens. Plus 13.", say: "Now we have three full trays. That is thirty. Plus the thirteen in the box.",
      items: [{ id: "p", prop: { kind: "base_ten", tens: 3, ones: 0 }, label: "30", x: 28, y: 48, size: 1 }, { id: "c", prop: { kind: "base_ten", tens: 1, ones: 3 }, label: "13", x: 72, y: 48, size: 1 }] },
    { caption: "30 + 13 = 43.", say: "Thirty and thirteen. Thirty plus ten is forty. Forty plus three is forty-three!",
      camera: { zoom: 1.2, x: 50, y: 48 },
      items: [{ id: "p", prop: { kind: "base_ten", tens: 4, ones: 3 }, label: "43", x: 50, y: 48, size: 3, effect: "sparkle" }] },
    { caption: "27 + 16 = 43. Shukriya, Zara!", say: "Forty-three mangoes! When the ones go past nine, fill a ten first. Shukriya, Zara!",
      items: [{ id: "z", emoji: "👧", label: "Zara", x: 22, y: 56, size: 3, anim: "bounce" }, { id: "u", emoji: "👨", label: "Uncle Bilal", x: 78, y: 56, size: 3, anim: "bounce" }, { id: "m", emoji: "🥭", x: 50, y: 30, size: 3, effect: "hearts", label: "43" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });

const quiz = [
  // ----- learn (q1-q8)
  Q(fill("Complete the split.", "46 is {b1} tens and {b2} ones.", [["4", "6", "46"], ["6", "4", "46"]], { hint: "The left digit is the tens.", why: "46 is 4 tens and 6 ones.", tag: "addsub2.partition" }), "tens_ones", "recall",
    [fill("Finish the split.", "52 is {b1} tens and {b2} ones.", [["5", "2", "7"], ["2", "5", "7"]], { hint: "The left digit is the tens.", why: "52 is 5 tens and 2 ones.", tag: "addsub2.partition" })]),
  Q(tf("In 43 + 25, the tens add up to 60.", true, { hint: "Use 40 + 20.", why: "4 tens and 2 tens make 6 tens, which is 60.", tag: "addsub2.add_tens" }), "tens_ones", "recall",
    [tf("In 52 + 36, the tens add up to 70.", false, { hint: "Use 50 + 30.", why: "5 tens and 3 tens make 8 tens, which is 80, not 70.", tag: "addsub2.add_tens" })]),
  Q(mc("Omar says that in 45 + 30 the 5 changes, because you add 30 to the whole number. Is he right?", "No. Only the tens change, so the ones stay as 5: the answer is 75", ["Yes, the answer is 48", "Yes, the answer is 35"], { hint: "30 is only tens. Which digit does it change?", why: "30 is 3 tens and no ones, so only the tens change. 45 + 30 = 75.", tag: "addsub2.reason_ones_stay" }), "tens_ones", "reason",
    [mc("Ben says that in 52 + 40 the 2 changes, because you add 40 to the whole number. Is he right?", "No. Only the tens change, so the ones stay as 2: the answer is 92", ["Yes, the answer is 56", "Yes, the answer is 42"], { hint: "40 is only tens. Which digit does it change?", why: "40 is 4 tens and no ones, so only the tens change. 52 + 40 = 92.", tag: "addsub2.reason_ones_stay" })]),
  Q(num("What is 43 + 25?", 68, { hint: "Add the tens, then the ones.", why: "40 + 20 = 60 and 3 + 5 = 8, so 68.", tag: "addsub2.add_no_cross" }), "tens_ones", "apply",
    [num("What is 52 + 36?", 88, { hint: "Add the tens, then the ones.", why: "50 + 30 = 80 and 2 + 6 = 8, so 88.", tag: "addsub2.add_no_cross" })]),
  Q(ms("Which numbers have 4 in the tens place? Pick two.", ["41", "47"], ["14", "24"], { hint: "The tens digit is on the left.", why: "41 and 47 have 4 tens. In 14 and 24 the 4 is in the ones place.", tag: "addsub2.tens_vs_ones" }), "tens_ones", "apply",
    [ms("Which numbers have 6 tens? Pick two.", ["63", "68"], ["36", "46"], { hint: "The tens digit is on the left.", why: "63 and 68 have 6 tens. In 36 and 46 the 6 is in the ones place.", tag: "addsub2.tens_vs_ones" })]),
  Q(hot("Tap the number made of 4 tens and 2 ones.", [["🧱", "24", 22, 50], ["🧱", "42", 50, 50], ["🧱", "40", 78, 50]], ["42"], { labels: true, hint: "Tens go on the left.", why: "4 tens and 2 ones is 42. 24 is 2 tens and 4 ones.", tag: "addsub2.base_ten" }), "tens_ones", "apply",
    [hot("Tap the number made of 6 tens and 3 ones.", [["🧱", "36", 22, 50], ["🧱", "60", 50, 50], ["🧱", "63", 78, 50]], ["63"], { labels: true, hint: "Tens go on the left.", why: "6 tens and 3 ones is 63. 36 is 3 tens and 6 ones.", tag: "addsub2.base_ten" })]),
  Q(ord("Put the steps for 34 + 23 in the right order.", ["Split 34 and 23 into tens and ones", "Add the tens: 30 + 20 = 50", "Add the ones: 4 + 3 = 7", "Put them together: 50 + 7 = 57"], { hint: "Split first, put together last.", why: "Split, then add the tens, then add the ones, then join the two answers.", tag: "addsub2.record_steps" }), "tens_ones", "apply",
    [ord("Put the steps for 45 + 32 in the right order.", ["Split 45 and 32 into tens and ones", "Add the tens: 40 + 30 = 70", "Add the ones: 5 + 2 = 7", "Put them together: 70 + 7 = 77"], { hint: "Split first, put together last.", why: "Split, then add the tens, then add the ones, then join the two answers.", tag: "addsub2.record_steps" })]),
  Q(sld("Slide to show 41 + 18.", { min: 0, max: 100 }, 59, 0, { hint: "40 + 10 = 50 and 1 + 8 = 9.", why: "50 + 9 = 59.", tag: "addsub2.easy_mix" }), "tens_ones", "apply",
    [sld("Slide to show 52 + 17.", { min: 0, max: 100 }, 69, 0, { hint: "50 + 10 = 60 and 2 + 7 = 9.", why: "60 + 9 = 69.", tag: "addsub2.easy_mix" })]),

  // ----- try (q9-q16)
  Q(num("To work out 28 + 15, first make 30. How much of the 15 goes to the 28?", 2, { hint: "How many more does 28 need to reach 30?", why: "28 + 2 = 30, so 2 of the 15 goes to the 28. Then 13 is left.", tag: "addsub2.bridge" }), "cross", "apply",
    [num("To work out 57 + 16, first make 60. How much of the 16 goes to the 57?", 3, { hint: "How many more does 57 need to reach 60?", why: "57 + 3 = 60, so 3 of the 16 goes to the 57. Then 13 is left.", tag: "addsub2.bridge" })]),
  Q(mc("Layla says you must always add the tens first and you can never add the ones first. Is she right?", "No. You can add the ones first or the tens first and the total is the same", ["Yes, tens must always go first", "No, you should never add the tens"], { hint: "Try 24 + 13 both ways.", why: "Adding tens first or ones first both give the same total. 24 + 13 = 37 either way.", tag: "addsub2.reason_order" }), "cross", "reason",
    [mc("Sam says you must always add the ones first and never the tens first. Is he right?", "No. You can add the tens first or the ones first and the total is the same", ["Yes, ones must always go first", "No, you should never add the ones"], { hint: "Try 32 + 15 both ways.", why: "Adding ones first or tens first both give the same total. 32 + 15 = 47 either way.", tag: "addsub2.reason_order" })]),
  Q(fill("Complete the sum.", "In 38 + 27, 8 + 7 = {b1}. That is {b2} ten and {b3} ones.", [["15", "14", "16"], ["1", "2", "0"], ["5", "15", "7"]], { hint: "15 is one ten and some ones.", why: "8 + 7 = 15, which is 1 ten and 5 ones.", tag: "addsub2.ones_over_nine" }), "cross", "apply",
    [fill("Finish the sum.", "In 36 + 27, 6 + 7 = {b1}. That is {b2} ten and {b3} ones.", [["13", "12", "14"], ["1", "2", "0"], ["3", "13", "7"]], { hint: "13 is one ten and some ones.", why: "6 + 7 = 13, which is 1 ten and 3 ones.", tag: "addsub2.ones_over_nine" })]),
  Q(mat("Match each sum to its answer.", [["26 + 17", "43"], ["38 + 25", "63"], ["19 + 34", "53"]], { hint: "Make a ten first.", why: "26 + 17 = 43, 38 + 25 = 63 and 19 + 34 = 53.", tag: "addsub2.cross_sums" }), "cross", "apply",
    [mat("Join each sum to its answer.", [["44 + 19", "63"], ["35 + 17", "52"], ["28 + 36", "64"]], { hint: "Make a ten first.", why: "44 + 19 = 63, 35 + 17 = 52 and 28 + 36 = 64.", tag: "addsub2.cross_sums" })]),
  Q(sld("A frog starts on 28. It hops 2, then 10, then 3. Slide to where it lands.", { min: 0, max: 100 }, 43, 0, { hint: "28 + 2 = 30. Then 30 + 10. Then 3 more.", why: "28 + 2 = 30, 30 + 10 = 40 and 40 + 3 = 43.", tag: "addsub2.number_line_hops" }), "cross", "apply",
    [sld("A frog starts on 37. It hops 3, then 10, then 4. Slide to where it lands.", { min: 0, max: 100 }, 54, 0, { hint: "37 + 3 = 40. Then 40 + 10. Then 4 more.", why: "37 + 3 = 40, 40 + 10 = 50 and 50 + 4 = 54.", tag: "addsub2.number_line_hops" })]),
  Q(tf("28 + 15 gives the same answer as 15 + 28.", true, { hint: "Try swapping the order.", why: "You can add in any order. Both are 43.", tag: "addsub2.swap_check" }), "cross", "apply",
    [tf("36 + 27 gives a different answer from 27 + 36.", false, { hint: "Try swapping the order.", why: "You can add in any order. Both are 63.", tag: "addsub2.swap_check" })]),
  Q(mc("Aisha works out 38 + 27. She does 30 + 20 = 50 and 8 + 7 = 15, then says the answer is 55. What went wrong?", "The 15 is one ten and 5 ones, so she forgot the extra ten: 50 + 15 = 65", ["Nothing went wrong. 55 is right", "She should have said the answer is 15"], { hint: "What is 50 + 15?", why: "She should add all of the 15 to the 50. 50 + 15 = 65.", tag: "addsub2.reason_extra_ten" }), "cross", "reason",
    [mc("Nora works out 47 + 26. She does 40 + 20 = 60 and 7 + 6 = 13, then says the answer is 63. What went wrong?", "The 13 is one ten and 3 ones, so she forgot the extra ten: 60 + 13 = 73", ["Nothing went wrong. 63 is right", "She should have said the answer is 13"], { hint: "What is 60 + 13?", why: "She should add all of the 13 to the 60. 60 + 13 = 73.", tag: "addsub2.reason_extra_ten" })]),
  Q(mc("Hamza says 29 + 4 = 24 because he did 20 + 4. Is he right?", "No. He left out the 9. 29 + 1 = 30 and 30 + 3 = 33", ["Yes, 24 is right", "No, the answer is 25"], { hint: "What happened to the 9?", why: "He forgot the 9 ones. 29 + 4 = 33.", tag: "addsub2.reason_digits" }), "cross", "reason",
    [mc("Mina says 39 + 5 = 34 because she did 30 + 4. Is she right?", "No. She left out the 9. 39 + 1 = 40 and 40 + 4 = 44", ["Yes, 34 is right", "No, the answer is 35"], { hint: "What happened to the 9?", why: "She forgot the 9 ones. 39 + 5 = 44.", tag: "addsub2.reason_digits" })]),

  // ----- play (q17-q23)
  Q(num("What is 78 - 35?", 43, { hint: "Take away the tens, then the ones.", why: "78 - 30 = 48 and 48 - 5 = 43.", tag: "addsub2.subtract_no_cross" }), "takeaway", "apply",
    [num("What is 86 - 24?", 62, { hint: "Take away the tens, then the ones.", why: "86 - 20 = 66 and 66 - 4 = 62.", tag: "addsub2.subtract_no_cross" })]),
  Q(hot("Tap the take-away that needs you to cross a ten.", [["🧮", "68 - 23", 22, 50], ["🧮", "72 - 38", 50, 50], ["🧮", "59 - 14", 78, 50]], ["72 - 38"], { labels: true, hint: "Can you take the ones digit from the ones digit?", why: "In 72 - 38 you cannot take 8 from 2, so you cross a ten. In the others the ones fit.", tag: "addsub2.subtract_cross" }), "takeaway", "apply",
    [hot("Tap the sum where you must cross a ten.", [["🧮", "86 - 41", 22, 50], ["🧮", "55 - 29", 50, 50], ["🧮", "97 - 62", 78, 50]], ["55 - 29"], { labels: true, hint: "Can you take the ones digit from the ones digit?", why: "In 55 - 29 you cannot take 9 from 5, so you cross a ten. In the others the ones fit.", tag: "addsub2.subtract_cross" })]),
  Q(mc("Sam says 74 - 36 = 42 because 6 - 4 = 2 in the ones. Is he right?", "No. You cannot take 6 from 4, so you cross a ten: 74 - 36 = 38", ["Yes, take the small digit from the big digit", "No, the answer is 48"], { hint: "Start with the big number: 74 take away 36.", why: "He turned the ones around. 74 - 30 = 44 and 44 - 6 = 38.", tag: "addsub2.reason_flip" }), "takeaway", "reason",
    [mc("Nora says 83 - 47 = 44 because 7 - 3 = 4 in the ones. Is she right?", "No. You cannot take 7 from 3, so you cross a ten: 83 - 47 = 36", ["Yes, take the small digit from the big digit", "No, the answer is 46"], { hint: "Start with the big number: 83 take away 47.", why: "She turned the ones around. 83 - 40 = 43 and 43 - 7 = 36.", tag: "addsub2.reason_flip" })]),
  Q(mc("Mira says 60 - 1 = 69 because you cannot take 1 from 0, so she swaps them. Is she right?", "No. Taking 1 from 60 gives one less: 59", ["Yes, 69 is right", "No, the answer is 61"], { hint: "What is one less than 60?", why: "60 - 1 = 59, which is one less than 60.", tag: "addsub2.reason_one_less" }), "takeaway", "reason",
    [mc("Zain says 50 - 1 = 59 because you cannot take 1 from 0, so he swaps them. Is he right?", "No. Taking 1 from 50 gives one less: 49", ["Yes, 59 is right", "No, the answer is 51"], { hint: "What is one less than 50?", why: "50 - 1 = 49, which is one less than 50.", tag: "addsub2.reason_one_less" })]),
  Q(mc("Ali says that in 74 - 36 you can take away the 6 first and then the 30, and get the same answer as taking the 30 first. Is he right?", "Yes. You can take away tens and ones in any order and the answer is the same", ["No, tens must always come first", "No, the ones must always come first"], { hint: "Try both: 74 - 6 and 74 - 30.", why: "74 - 6 = 68 and 68 - 30 = 38. 74 - 30 = 44 and 44 - 6 = 38. Same answer.", tag: "addsub2.reason_any_order" }), "takeaway", "reason",
    [mc("Hana says that in 85 - 27 you can take away the 7 first and then the 20, and get the same answer as taking the 20 first. Is she right?", "Yes. You can take away tens and ones in any order and the answer is the same", ["No, tens must always come first", "No, the ones must always come first"], { hint: "Try both: 85 - 7 and 85 - 20.", why: "85 - 7 = 78 and 78 - 20 = 58. 85 - 20 = 65 and 65 - 7 = 58. Same answer.", tag: "addsub2.reason_any_order" })]),
  Q(ord("Put the steps for 63 - 28 in the right order.", ["Take away 20: 63 - 20 = 43", "Take away 3 to reach 40: 43 - 3 = 40", "Take away 5 more: 40 - 5 = 35"], { hint: "Tens first, then hop to the friendly ten.", why: "20 + 3 + 5 = 28, so the hops are 43, then 40, then 35.", tag: "addsub2.subtract_hops" }), "takeaway", "apply",
    [ord("Put the steps for 74 - 36 in the right order.", ["Take away 30: 74 - 30 = 44", "Take away 4 to reach 40: 44 - 4 = 40", "Take away 2 more: 40 - 2 = 38"], { hint: "Tens first, then hop to the friendly ten.", why: "30 + 4 + 2 = 36, so the hops are 44, then 40, then 38.", tag: "addsub2.subtract_hops" })]),
  Q(mat("Match each missing part to its number.", [["47 - ? = 29", "18"], ["61 - ? = 38", "23"], ["50 - ? = 36", "14"]], { hint: "Count up from the small number, or take away.", why: "47 - 29 = 18, 61 - 38 = 23 and 50 - 36 = 14.", tag: "addsub2.missing_part" }), "takeaway", "apply",
    [mat("Join each missing part to its number.", [["72 - ? = 49", "23"], ["80 - ? = 66", "14"], ["55 - ? = 37", "18"]], { hint: "Count up from the small number, or take away.", why: "72 - 49 = 23, 80 - 66 = 14 and 55 - 37 = 18.", tag: "addsub2.missing_part" })]),

  // ----- use (q24-q30)
  Q(num("Uncle Bilal has 34 green mangoes and 29 yellow mangoes. How many mangoes does he have?", 63, { hint: "In all means add.", why: "30 + 20 = 50 and 4 + 9 = 13, so 63.", tag: "addsub2.word_add" }), "shop", "apply",
    [num("Hana's shop has 56 red pens and 27 blue pens. How many pens does it have?", 83, { hint: "In all means add.", why: "50 + 20 = 70 and 6 + 7 = 13, so 83.", tag: "addsub2.word_add" })]),
  Q(num("A stall has 82 mangoes. It sells 37. How many mangoes are left?", 45, { hint: "Sold means take away.", why: "82 - 30 = 52 and 52 - 7 = 45.", tag: "addsub2.word_subtract" }), "shop", "apply",
    [num("A shop has 64 apples. It sells 37. How many apples are left?", 27, { hint: "Sold means take away.", why: "64 - 30 = 34 and 34 - 7 = 27.", tag: "addsub2.word_subtract" })]),
  Q(num("Zara has 25 dates. Her uncle gives her 18 more. At iftar she eats 9. How many dates does she have left?", 34, { hint: "Add first. Then take away.", why: "25 + 18 = 43. Then 43 - 9 = 34.", tag: "addsub2.two_step" }), "shop", "apply",
    [num("Omar has 36 stickers. He gets 27 more. Then he gives 15 away. How many stickers does he have left?", 48, { hint: "Add first. Then take away.", why: "36 + 27 = 63. Then 63 - 15 = 48.", tag: "addsub2.two_step" })]),
  Q(mc("A bar shows a whole of 75, split into two parts. One part is 36. Which sum finds the other part?", "75 - 36", ["75 + 36", "36 - 75"], { hint: "Whole take away the part you know.", why: "To find a missing part, take the known part away from the whole: 75 - 36 = 39.", tag: "addsub2.bar_model" }), "shop", "apply",
    [mc("A bar shows a whole of 82, split into two parts. One part is 47. Which sum finds the other part?", "82 - 47", ["82 + 47", "47 - 82"], { hint: "Whole take away the part you know.", why: "To find a missing part, take the known part away from the whole: 82 - 47 = 35.", tag: "addsub2.bar_model" })]),
  Q(fill("Fill in the gaps.", "24 + {b1} = 41, so 41 - 24 = {b2}.", [["17", "18", "27"], ["17", "27", "18"]], { hint: "Count up from 24 to 41.", why: "24 + 17 = 41, and the opposite sum 41 - 24 = 17.", tag: "addsub2.missing_sentence" }), "shop", "apply",
    [fill("Fill in the missing numbers.", "38 + {b1} = 62, so 62 - 38 = {b2}.", [["24", "34", "23"], ["24", "34", "23"]], { hint: "Count up from 38 to 62.", why: "38 + 24 = 62, and the opposite sum 62 - 38 = 24.", tag: "addsub2.missing_sentence" })]),
  Q(ms("Which two stories match 36 + 25? Pick two.", ["Zara has 36 dates and gets 25 more. How many now?", "A shop has 36 pens and gets 25 more pens. How many pens now?"], ["A shop has 36 pens and sells 25. How many are left?", "Zara has 36 dates and eats 25. How many are left?"], { hint: "Look for the stories where there are more at the end.", why: "36 + 25 means putting groups together. The other two stories take away.", tag: "addsub2.own_problem" }), "shop", "apply",
    [ms("Which two stories match 60 - 24? Pick two.", ["A tray has 60 samosas and 24 are eaten. How many are left?", "Ali has 60 stickers and gives 24 away. How many are left?"], ["A tray has 60 samosas and 24 more arrive. How many now?", "Ali has 24 stickers and gets 60 more. How many now?"], { hint: "Look for the stories where there are fewer at the end.", why: "60 - 24 means taking away. The other two stories add.", tag: "addsub2.own_problem" })]),
  Q(mc("Zainab says 50 - 27 = 23. She did 50 - 30 = 20 and then added 3 back. Why did she add 3?", "She took away 30, which is 3 more than 27, so she gave 3 back", ["Because 3 is the tens digit in 30", "She should not have added. A take-away never adds"], { hint: "Is 30 bigger or smaller than 27?", why: "30 is 3 more than 27, so she took away too much. Adding 3 back fixes it: 20 + 3 = 23.", tag: "addsub2.reason_inverse" }), "shop", "reason",
    [mc("Hamza says 60 - 28 = 32. He did 60 - 30 = 30 and then added 2 back. Why did he add 2?", "He took away 30, which is 2 more than 28, so he gave 2 back", ["Because 2 is the tens digit in 28", "He should not have added. A take-away never adds"], { hint: "Is 30 bigger or smaller than 28?", why: "30 is 2 more than 28, so he took away too much. Adding 2 back fixes it: 30 + 2 = 32.", tag: "addsub2.reason_inverse" })]),
];

export const topics = [
  topicLesson({
    slug: "maths-class-1-add-subtract-two-digit", subject: "maths", cls: 1, topic: 9, title: "Adding and Subtracting 2-Digit Numbers",
    summary: "Add and take away two 2-digit numbers by splitting them into tens and ones, including crossing a ten.",
    unit: "Topic 9: Add and subtract 2-digit numbers", difficulty: 2,
    objectives: ["Add two 2-digit numbers, even when I cross a ten", "Take away two 2-digit numbers, even when I cross a ten", "Solve word problems and find missing numbers"],
    success_criteria: ["I can split numbers into tens and ones to add", "I can cross a ten when I add or take away", "I can solve a story problem and check my answer"],
    real_life: "Counting mangoes at a market stall, pens in a shop, or how many dates are left at iftar.",
    standards: [
      { framework: "nc_england", code: "Y2 add/sub", text: "Add and subtract a two-digit number and ones, and two two-digit numbers, using concrete objects, number lines and mental methods" },
      { framework: "cambridge", code: "2Ni.02" }, { framework: "cambridge", code: "2Ni.04" },
    ],
    warm_up: [
      num("What is 8 + 5?", 13, { hint: "Make a ten first.", why: "8 + 2 = 10 and 10 + 3 = 13." }),
      num("How many tens are in 60?", 6, { hint: "The 6 is the tens digit.", why: "60 is 6 tens." }),
      tf("37 has 3 tens and 7 ones.", true, { hint: "The left digit is the tens.", why: "37 is 3 tens and 7 ones." }),
    ],
    intro: [],
    subs: [tensOnes, crossing, takeaway, shop],
    clip,
    quiz,
  }),
];

