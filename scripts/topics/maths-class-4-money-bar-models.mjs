import { SAY, SS, H, T, IMG, PHOTO, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Coteach diagrams (see content/media/manifest.d/maths-class-4-money-bar-models.json).
const COTEACH_A = {"type":"image","asset":"maths-class-4-money-bar-models-d1-1dd76969.png","alt":"A bar model of £10 split into £6.40 cost and £3.60 change","caption":"£10 − £6.40 = £3.60."};
const COTEACH_B = {"type":"image","asset":"maths-class-4-money-bar-models-d2-5a9dce08.png","alt":"A number line from £0 to £10 counting on from £7.25 in jumps of £0.75, £1 and £1","caption":"£7.25 + £2.75 = £10."};
// Class 4 Maths topic 9: Money problems and bar models (NEW, format 3.0).
// Story thread: Zara and her cousin Hana run a bake sale and a school fair stall in Lahore and London.
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });
const HB = (text, backdrop) => ({ ...H(text), backdrop });
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });
const OK = (label) => ["ok", "✅", 50, 90, 2, "bounce", label];
const COIN_PHOTO = "maths-class-4-money-bar-models-1-551d216f.jpg";

// ---------------------------------------------------------------------------------------------- 1. learn
const poundsPence = {
  id: "pounds_pence", kind: "learn", title: "Pounds and pence",
  blocks: [
    HB("Zara's bake sale", "town"),
    SAY("Zara runs a bake sale at school. Every price has a pound sign and a decimal point. Let's learn how to write money properly. Money is a decimal, and there are two places after the point.",
      PHOTO(COIN_PHOTO, "A tall stack of coins on a wooden table", "Coins stack up to make pounds, and pence are the small parts.", "Photo by Matthew Lancaster on Unsplash")),
    HB("Stop 1: Pounds and pence", "classroom"),
    SAY("A pound is one hundred pence. The number before the point is the pounds. The two numbers after the point are the pence. So £2.40 is two pounds and forty pence.",
      T("**£2.40** means 2 pounds and 40 pence. There are 100 pence in a pound.", "£2.40 = 240p.")),
    EXPP("£2.40 in coins",
      SS("Two pound coins. That is two pounds.", S("£2", ["c", "🪙", 30, 50, 3, "none", "£2"])),
      SS("Four ten-pence coins. That is forty pence.", S("£2 and 40p", ["c", "🪙", 30, 50, 2, "none", "£2"], ["d", "🟡", 70, 50, 3, "pulse", "40p"])),
      SS("Together: £2.40, or 240 pence.", S("£2.40 = 240p", ["c", "🪙", 30, 50, 2, "none"], OK("£2.40 = 240p")))),
    SAY("Ten pounds take away six pounds forty. The change is three pounds sixty.", COTEACH_A),
    CHK(num("How many pence are in £4.15?", 415, { hint: "A pound is 100 pence.", why: "£4 is 400p and 15p more is 415p.", tag: "money.pence" })),
    HB("Stop 2: Write it properly", "classroom"),
    SAY("Always use the pound sign and a decimal point. Write four pounds and six pence as £4.06. Six pence is zero point zero six, so the zero holds the tenths place.",
      T("**Two digits after the point**: 6p is £0.06, and 60p is £0.60.", "£4.06 is four pounds and six pence.")),
    IMG("💷", "£4.06 is four pounds and six pence. £4.60 is four pounds and sixty pence."),
    CHK(mc("Which is four pounds and sixty pence?", "£4.60", ["£4.06", "£46.0"], { hint: "Sixty pence is 0.60.", why: "£4.60 is four pounds and sixty pence.", tag: "money.write" })),
    SAY("Remember. Pounds come before the point. Pence come after it, in two places.", SUM("Pounds before the point", "Pence after the point, two places", "A pound is 100 pence")),
    GLOSS({ "240": "Two hundred and forty pence, the same as £2.40.", "two digits after the point": "The two places after the decimal point hold the pence.", "pounds and pence": "A pound is 100 pence. Money is written with a decimal point.", decimal: "A number with a point, like 2.40.", pence: "Small parts of a pound.", "decimal point": "The dot between pounds and pence." }),
  ],
  mini: [
    num("How many pence are in £1.50?", 150, { hint: "A pound is 100 pence.", why: "£1 is 100p and 50p more makes 150p." }),
    mc("How do you write 7 pounds and 5 pence?", "£7.05", ["£7.5", "£75"], { hint: "Five pence is 0.05.", why: "Five pence is written 05 after the point." }),
    tf("£5.10 means five pounds and ten pence.", true, { hint: "Ten pence is 0.10.", why: "£5.10 is five pounds and ten pence." }),
    ord("Put these amounts in order, smallest first.", ["£0.90", "£1.05", "£1.50"], { hint: "Compare the pounds, then the pence.", why: "90p, then £1.05, then £1.50." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const efficientAdding = {
  id: "efficient_adding", kind: "try", title: "Adding prices efficiently",
  blocks: [
    HB("Stop 1: Near a whole pound", "classroom"),
    SAY("Zara adds two prices. One cake costs £1.99 and a biscuit costs £1.01. Add the pound first. Then add the last penny.",
      T("**Near a whole**: £1.99 is just 1p short of £2.", "£1.99 + £1 = £2.99, and £2.99 + 1p = £3.00.")),
    EXPP("£1.99 + £1.01",
      SS("Start with the cake: £1.99.", S("£1.99", ["a", "🧁", 30, 50, 3, "none", "£1.99"])),
      SS("Add £1.00 to make £2.99. Now add the biscuit's pennies.", S("£1.99 + £1.00 = £2.99", ["a", "🧁", 30, 50, 2, "none", "£1.99"], ["b", "🍪", 70, 50, 3, "pulse", "£1.01"])),
      SS("£2.99 + 1p = £3.00. The total is £3.00.", S("£3.00", ["a", "🧁", 30, 50, 2, "none"], OK("£1.99 + £1.01 = £3.00")))),
    SAY("Count on from seven pounds twenty-five. Count to eight pounds, then nine, then ten.", COTEACH_B),
    CHK(fill("Add the prices: £2.35 + £1.40.", "£2.35 + £1.40 = £{b1}.{b2}.", [["3", "4", "2"], ["75", "35", "15"]], { hint: "Add the pounds, then the pence.", why: "£2 + £1 = £3, and 35p + 40p = 75p.", tag: "money.add" })),
    HB("Stop 2: Line up the points", "classroom"),
    SAY("When you add money in columns, line up the decimal points. Pounds go under pounds. Pence go under pence. Then add each column, just like any other column sum.",
      T("**Line up the decimal points** before you add.", "£4.20 + £2.45: 420p + 245p = 665p, so £6.65.")),
    IMG("🧮", "£4.20 + £2.45 = £6.65, with the decimal points lined up."),
    CHK(num("What is £4.20 + £2.45?", 6.65, { tol: 0.005, hint: "Line up the points.", why: "20p + 45p = 65p, and £4 + £2 = £6. So £6.65.", tag: "money.columns" })),
    SAY("Remember. Add near a whole pound first, or line up the points in columns.", SUM("Near a whole pound: add, then adjust", "Line up the decimal points", "Check the pence add to 100")),
    ACT("Price tags", ["Paper price tags", "Pencil"], ["Write two prices in pounds and pence on tags.", "Line up the decimal points on paper.", "Add the pounds, then the pence.", "Check by adding the pence to make a whole pound."]),
    GLOSS({ "near a whole": "A number close to a whole pound, like £1.99, which is easy to adjust.", total: "All the prices added together.", column: "Numbers lined up one under another.", adjust: "Correct an answer after using an easy number.", "decimal points": "Lined up when adding money." }),
  ],
  mini: [
    num("What is £2.50 + £1.50?", 4, { tol: 0.005, hint: "50p + 50p is £1.", why: "£2 + £1 + £1 = £4." }),
    mc("Which is the total of £3.20 and £0.80?", "£4.00", ["£3.00", "£4.20"], { hint: "20p + 80p = £1.", why: "£3 + £1 = £4." }),
    tf("£4.50 + £0.50 makes £5.", true, { hint: "50p + 50p is £1.", why: "£4 + £1 = £5." }),
    ord("Put these totals in order, smallest first.", ["£2.10", "£1.99", "£3.05"], { hint: "Compare the pounds, then the pence.", why: "£1.99, then £2.10, then £3.05." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const change = {
  id: "change", kind: "play", title: "Change challenge",
  blocks: [
    HB("Stop 1: Count on to find change", "classroom"),
    SAY("Hana buys a pen for £3.70 and pays with a £5 note. How much change should she get? Count on from the price to the money paid. Let's count on.",
      T("**Count on** from the price to the money paid to find the change.", "£3.70 to £5: 30p to £4, then £1 to £5. Change is £1.30.")),
    EXPP("£5 − £3.70 by counting on",
      SS("Start at £3.70, the price of the pen.", S("£3.70", ["p", "🖊️", 30, 50, 3, "none", "£3.70"])),
      SS("Count on 30p to reach £4.00.", S("+30p → £4.00", ["p", "🖊️", 30, 50, 2, "none", "£3.70"], ["q", "➕", 70, 50, 3, "pulse", "30p"])),
      SS("Count on £1 to reach £5. Total change: 30p + £1 = £1.30.", S("Change £1.30", ["p", "🖊️", 30, 50, 2, "none"], OK("£5 − £3.70 = £1.30")))),
    CHK(num("A toy costs £6.20. Zara pays with £10. What is the change?", 3.8, { tol: 0.005, hint: "Count on from £6.20 to £10.", why: "80p to £7, then £3 to £10. Change £3.80.", tag: "money.change" })),
    HB("Stop 2: Fewest coins", "town"),
    SAY("Shops give change with the fewest coins and notes. For a £6.20 toy, pay with a £10 note, not a £5 note. Hana gets back £3.80 with the fewest notes and coins.",
      T("Pay with the **smallest note that covers the price**.", "£6.20 costs less than £10, but more than £5.")),
    IMG("💷", "A £10 note covers a £6.20 toy. A £5 note does not."),
    CHK(mc("Which note covers a £14.50 meal?", "£20", ["£10", "£5"], { hint: "The note must be bigger than the price.", why: "£10 and £5 are less than £14.50, so use £20.", tag: "money.note" })),
    SAY("Brain break. Find the matching coins.", BRAIN("memory_match", "Coin pairs", "Find the matching coins.", ["🪙", "💷", "💰", "🟡", "🪙", "💷"])),
    SAY("Remember. Count on from the price to the money paid. Use the smallest note that covers the price.", SUM("Count on to find change", "Pay with a note bigger than the price", "Fewest coins for change")),
    GLOSS({ change: "The money given back when you pay more than the price.", "count on": "Add on in steps until you reach the money paid.", note: "A paper money note.", price: "How much something costs." }),
  ],
  mini: [
    num("A pen costs £1.40. You pay £2. What is the change?", 0.6, { tol: 0.005, hint: "Count on 60p to £2.", why: "£1.40 + 60p = £2, so the change is 60p." }),
    mc("A book costs £4.75. You pay £5. What is the change?", "25p", ["75p", "£1.25"], { hint: "Count on from £4.75 to £5.", why: "£4.75 + 25p = £5." }),
    tf("You can count on from the price to the money paid to find change.", true, { hint: "Count the steps.", why: "Counting on works for change." }),
    num("A snack costs £2.30. You pay £3. What is the change in pence?", 70, { hint: "Count on 70p to £3.", why: "£2.30 + 70p = £3." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const barModels = {
  id: "bar_models", kind: "use", title: "Multi-step shopping and bar models",
  blocks: [
    HB("Stop 1: Draw the bar", "classroom"),
    SAY("Draw a bar for the money. The whole bar is the money paid. Split it into the prices. The missing part is the change. A bar model makes a money problem easy to see.",
      T("A **bar model** shows the whole and the parts: whole = part + part.", "£10 = £6.40 + the change, so the change is £3.60.")),
    EXPP("£10 bar model",
      SS("The whole bar is £10.", S("£10", ["b", "🟦", 50, 50, 3, "none", "£10"])),
      SS("Split it: a £6.40 item takes up most of the bar.", S("£6.40 + ?", ["b", "🟦", 30, 50, 2, "none", "£6.40"], ["c", "🟩", 70, 50, 2, "pulse", "?"])),
      SS("The missing part is £3.60, the change.", S("£6.40 + £3.60 = £10", ["b", "🟦", 30, 50, 2, "none", "£6.40"], ["c", "🟩", 70, 50, 2, "none", "£3.60"], OK("£10 − £6.40 = £3.60")))),
    CHK(num("A bar of £20 has a £12.25 part. What is the missing part?", 7.75, { tol: 0.005, hint: "Take the known part from the whole.", why: "£20 − £12.25 = £7.75.", tag: "money.bar" })),
    HB("Stop 2: Altogether can be a trap", "home"),
    SAY("Careful: altogether does not always mean add. When you pay for two things, you add the prices. When you want the change, you take the total away from the money.",
      T("**Altogether** means add the prices. **Change** means take the total away from the money paid.", "Two items: £2.40 + £1.60 = £4. Change from £5 is £1.")),
    IMG("🧾", "Add the prices first, then find the change from the note."),
    CHK(mc("Zara buys a £2.40 cake and a £1.60 juice and pays £5. What is the change?", "£1.00", ["£2.00", "£3.00"], { hint: "Add the prices first.", why: "£2.40 + £1.60 = £4.00, and £5 − £4 = £1.", tag: "money.two_step" })),
    SAY("Remember. Use a bar model for money problems. Add the prices, then take the total away from the money paid.", SUM("Draw a bar for the whole money", "Add prices for the total", "Take the total from the money for change")),
    GLOSS({ change: "The money given back when you pay more than the price.", "bar model": "A drawing of the whole split into parts.", total: "All of it added together.", altogether: "All together, which usually means add.", whole: "The full amount." }),
  ],
  mini: [
    num("A cup costs £1.20 and a plate costs £2.30. What is the total?", 3.5, { tol: 0.005, hint: "Add the pounds, then the pence.", why: "£1.20 + £2.30 = £3.50." }),
    mc("A bar of £10 has a £4.50 part. What is the other part?", "£5.50", ["£6.50", "£4.50"], { hint: "Take the known part away.", why: "£10 − £4.50 = £5.50." }),
    tf("In a bar model, the whole is the parts added together.", true, { hint: "Look at the bar.", why: "The whole is made from the parts." }),
    num("Two tickets cost £4.25 each. What is the total?", 8.5, { tol: 0.005, hint: "£4.25 + £4.25.", why: "£8.50." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "The school fair till", backdrop: "classroom", caption: "A child at the school fair adds the toys, counts on to find the change and draws a bar model.",
  scenes: [
    { caption: "The school fair.", say: "This is Hana at the school fair. She sells toys and keeps the money safe.",
      items: [{ id: "h", emoji: "👧", label: "Hana", x: 22, y: 56, size: 3, anim: "bounce", enter: "walk_right" }, { id: "t", emoji: "🧸", label: "toys", x: 72, y: 46, size: 3, enter: "pop" }] },
    { caption: "Add the prices.", say: "A toy costs £3.40 and a ball costs £1.60. Let's add them.",
      items: [{ id: "a", emoji: "🧸", label: "£3.40", x: 30, y: 46, size: 2, enter: "slide_right" }, { id: "b", emoji: "⚽", label: "£1.60", x: 70, y: 46, size: 2, enter: "slide_left" }] },
    { caption: "The total is £5.", say: "Three pounds forty plus one pound sixty makes exactly five pounds.",
      items: [{ id: "s", emoji: "🧾", label: "£5.00", x: 50, y: 46, size: 3, effect: "glow" }] },
    { caption: "Count on to £10.", say: "The customer pays with a ten pound note. Count on from five pounds to ten.",
      items: [{ id: "n", emoji: "💷", label: "£10", x: 50, y: 46, size: 3, enter: "grow" }] },
    { caption: "Bar model.", say: "Draw a bar. The whole is ten pounds, and five pounds is the change.",
      camera: { zoom: 1.2, x: 50, y: 46 },
      items: [{ id: "bar", prop: { kind: "fraction_bar", parts: 2, shaded: 1 }, label: "£10 = £5 + £5", x: 50, y: 46, size: 3, effect: "glow" }] },
    { caption: "Shukriya, Hana!", say: "Ten pounds take away five pounds is five pounds of change. Shukriya, Hana!",
      items: [{ id: "h", emoji: "👧", label: "Hana", x: 22, y: 56, size: 3, anim: "bounce" }, { id: "r", emoji: "🎉", label: "£5 change", x: 70, y: 40, size: 2, effect: "hearts" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- pounds_pence (q1-q8)
  Q(num("How many pence are in £2.40?", 240, { hint: "A pound is 100 pence.", why: "£2 is 200p and 40p more is 240p.", tag: "money.pence" }), "pounds_pence", "apply",
    [num("How many pence are in £3.05?", 305, { hint: "A pound is 100 pence.", why: "£3 is 300p and 5p more is 305p.", tag: "money.pence" })]),
  Q(mc("Ben says £4.6 means four pounds and six pence. Is he right?", "No. £4.6 means four pounds and sixty pence, so write £4.06 for six pence", ["Yes, four pounds and six pence", "No, it is £46"], { hint: "Pence come after the point, in two places.", why: "Six pence is 0.06, so £4.06. £4.6 is sixty pence.", tag: "money.reason_pence" }), "pounds_pence", "reason",
    [mc("Sana says £7.4 means seven pounds and four pence. Is she right?", "No. £7.4 means seven pounds and forty pence, so write £7.04 for four pence", ["Yes, seven pounds and four pence", "No, it is £74"], { hint: "Pence come after the point, in two places.", why: "Four pence is 0.04, so £7.04. £7.4 is forty pence.", tag: "money.reason_pence" })]),
  Q(tf("£3.40 means three pounds and forty pence.", true, { hint: "Forty pence is 0.40.", why: "The two digits after the point are the pence.", tag: "money.write" }), "pounds_pence", "recall",
    [tf("£3.04 means three pounds and forty pence.", false, { hint: "Which digits are the pence?", why: "£3.04 is three pounds and four pence.", tag: "money.write" })]),
  Q(fill("Write the amount in pounds.", "Four pounds and seventy pence is £{b1}.{b2}.", [["4", "40", "7"], ["70", "07", "7"]], { hint: "Seventy pence is 0.70.", why: "£4.70.", tag: "money.write" }), "pounds_pence", "apply",
    [fill("Write the amount for six pounds and five pence.", "Six pounds and five pence is £{b1}.{b2}.", [["6", "60", "5"], ["05", "50", "5"]], { hint: "Five pence is 0.05.", why: "£6.05.", tag: "money.write" })]),
  Q(ms("Which two show the same amount as £1.50? Pick two.", ["150p", "one pound and fifty pence"], ["£1.05", "£15"], { hint: "A pound is 100 pence.", why: "£1.50 is 150p and one pound fifty pence.", tag: "money.same" }), "pounds_pence", "apply",
    [ms("Pick two amounts that equal £2.25.", ["225p", "two pounds and twenty-five pence"], ["£2.52", "£22.5"], { hint: "Twenty-five pence is 0.25.", why: "£2.25 is 225p and two pounds twenty-five pence.", tag: "money.same" })]),
  Q(ord("Order these prices from cheapest.", ["£1.05", "£1.50", "£2.04", "£2.40"], { hint: "Compare the pounds, then the pence.", why: "£1.05, £1.50, £2.04, £2.40.", tag: "money.order" }), "pounds_pence", "apply",
    [ord("Order these amounts from the biggest.", ["£5.10", "£4.95", "£4.09", "£1.99"], { hint: "Compare the pounds first.", why: "£5.10, £4.95, £4.09, £1.99.", tag: "money.order" })]),
  Q(sld("A sticker costs 350p. Slide to show its price in pounds.", { min: 0, max: 5, step: 0.1 }, 3.5, 0.1, { hint: "100p make £1.", why: "350p is £3.50.", tag: "money.line" }), "pounds_pence", "apply",
    [sld("A pencil case costs 420p. Slide to show its price in pounds.", { min: 0, max: 5, step: 0.1 }, 4.2, 0.1, { hint: "100p make £1.", why: "420p is £4.20.", tag: "money.line" })]),
  Q(mat("Match each amount to its words.", [["£2.05", "two pounds and five pence"], ["£5.50", "five pounds and fifty pence"], ["£1.20", "one pound and twenty pence"]], { hint: "Pounds first, then pence.", why: "£2.05, £5.50 and £1.20.", tag: "money.words" }), "pounds_pence", "apply",
    [mat("Join each amount to its words.", [["£3.30", "three pounds and thirty pence"], ["£8.08", "eight pounds and eight pence"], ["£6.60", "six pounds and sixty pence"]], { hint: "Pounds first, then pence.", why: "£3.30, £8.08 and £6.60.", tag: "money.words" })]),
  // ----- efficient_adding (q9-q16)
  Q(tf("£1.99 + £1.01 gives £3.00.", true, { hint: "Add £1, then add 1p.", why: "£1.99 + £1.01 = £3.00.", tag: "money.add" }), "efficient_adding", "recall",
    [tf("£2.98 + £1.02 gives £3.90.", false, { hint: "Add £1 to £2.98, then add 2p.", why: "£2.98 + £1.02 = £4.00.", tag: "money.add" })]),
  Q(mc("Aisha says £3 and 40p is £3.04. Is she right?", "No. 40p is 0.40, so the total is £3.40", ["Yes, £3.04", "No, it is £3.44"], { hint: "Forty pence is 0.40.", why: "The pence 40 go in the two places after the point.", tag: "money.reason_pence" }), "efficient_adding", "reason",
    [mc("Sam says £2 and 5p is £2.50. Is he right?", "No. 5p is 0.05, so the total is £2.05", ["Yes, £2.50", "No, it is £7"], { hint: "Five pence is 0.05.", why: "The 5 goes in the second place after the point.", tag: "money.reason_pence" })]),
  Q(fill("Add the prices.", "£3.25 + £2.40 = £{b1}.{b2}.", [["5", "6", "4"], ["65", "85", "25"]], { hint: "Add the pounds, then the pence.", why: "£3 + £2 = £5, and 25p + 40p = 65p. So £5.65.", tag: "money.add" }), "efficient_adding", "apply",
    [fill("Add the other prices.", "£3.15 + £1.60 = £{b1}.{b2}.", [["4", "5", "3"], ["75", "45", "55"]], { hint: "Add the pounds, then the pence.", why: "£3 + £1 = £4, and 15p + 60p = 75p. So £4.75.", tag: "money.add" })]),
  Q(ms("Which two totals are more than £10? Pick two.", ["£6.40 + £4.20", "£9.99 + £1.01"], ["£3.50 + £2.10", "£4.99 + £2.00"], { hint: "Add each pair.", why: "£10.60 and £11.00 are more than £10.", tag: "money.totals" }), "efficient_adding", "apply",
    [ms("Which two totals are less than £5? Pick two.", ["£2.49 + £1.99", "£1.25 + £3.00"], ["£3.50 + £1.75", "£4.10 + £1.20"], { hint: "Add each pair.", why: "£4.48 and £4.25 are less than £5.", tag: "money.totals" })]),
  Q(ord("Work out the totals, then order them smallest first.", ["£0.99 + £0.99", "£2.20 + £0.50", "£1.50 + £1.50", "£1.00 + £2.10"], { hint: "Add each pair first.", why: "£1.98, £2.70, £3.00 and £3.10.", tag: "money.totals" }), "efficient_adding", "apply",
    [ord("Work out the totals, then order them largest first.", ["£3.40 + £0.10", "£2.00 + £0.20", "£1.05 + £1.05", "£0.75 + £0.75"], { hint: "Add each pair first.", why: "£3.50, £2.20, £2.10 and £1.50.", tag: "money.totals" })]),
  Q(sld("Slide to show the total of £2.50 + £2.50 on the line from £0 to £10.", { min: 0, max: 10, step: 0.1 }, 5, 0.1, { hint: "Two halves of £5 make £5.", why: "£2.50 + £2.50 = £5.00.", tag: "money.line" }), "efficient_adding", "apply",
    [sld("Slide to show the total of £1.25 + £1.25 on the line from £0 to £10.", { min: 0, max: 10, step: 0.1 }, 2.5, 0.1, { hint: "Double £1.25.", why: "£1.25 + £1.25 = £2.50.", tag: "money.line" })]),
  Q(hot("Tap the pair of prices that makes exactly £10.", [["🛒", "£6.40 + £3.60", 22, 50], ["🛒", "£6.40 + £3.10", 50, 50], ["🛒", "£5.50 + £4.00", 78, 50]], ["£6.40 + £3.60"], { labels: true, hint: "Add the pounds, then the pence.", why: "£6.40 + £3.60 = £10.00. The others make £9.50.", tag: "money.round" }), "efficient_adding", "apply",
    [hot("Tap the pair of prices that makes exactly £5.", [["🛒", "£2.75 + £2.25", 22, 50], ["🛒", "£2.75 + £2.50", 50, 50], ["🛒", "£3.20 + £1.60", 78, 50]], ["£2.75 + £2.25"], { labels: true, hint: "Add the pounds, then the pence.", why: "£2.75 + £2.25 = £5.00. The others make £5.25 and £4.80.", tag: "money.round" })]),
  Q(num("Hana pays £5 for a £3.70 pen. How many pounds of change?", 1.3, { tol: 0.005, hint: "Count on from £3.70 to £5.", why: "£3.70 + 30p = £4, then + £1 = £5. Change £1.30.", tag: "money.change" }), "change", "apply",
    [num("Zara pays £10 for a £6.45 book. How many pounds of change?", 3.55, { tol: 0.005, hint: "Count on from £6.45 to £10.", why: "55p to £7, then £3 to £10. Change £3.55.", tag: "money.change" })]),
  Q(mc("Mira says £5 minus £3.70 is £2.30. Is she right?", "No. £3.70 + £1.30 = £5, so the change is £1.30", ["Yes, £2.30", "No, it is £1.70"], { hint: "Count on to check.", why: "£3.70 + £1.30 = £5.00.", tag: "money.reason_change" }), "change", "reason",
    [mc("Hana says £10 minus £6.45 is £4.45. Is she right?", "No. The change is £3.55, because £6.45 + £3.55 = £10", ["Yes, £4.45", "No, it is £3.45"], { hint: "Count on to check.", why: "£6.45 + £3.55 = £10.00.", tag: "money.reason_change" })]),
  Q(mc("Layla says change is found by adding the price to the money given. Is she right?", "No. You take the price away from the money given, or count on", ["Yes, add them", "No, multiply them"], { hint: "Change is what is left over.", why: "Price + change = money given, so change = money given − price.", tag: "money.reason_change" }), "change", "reason",
    [mc("Dan says change is found by multiplying the price by the money given. Is he right?", "No. Change is found by taking the price away from the money given", ["Yes, multiply them", "No, add them"], { hint: "Change is what is left over.", why: "Multiplying does not find what is left over.", tag: "money.reason_change" })]),
  Q(hot("Tap the note to pay for a £6.20 toy with the smallest note that covers it.", [["💷", "£10", 22, 50], ["💷", "£5", 50, 50], ["💷", "£20", 78, 50]], ["£10"], { labels: true, hint: "The note must be bigger than the price.", why: "£5 is not enough, so £10 is the smallest note that covers £6.20.", tag: "money.note" }), "change", "apply",
    [hot("Tap the note to pay for a £12.30 shirt with the smallest note that covers it.", [["💷", "£10", 22, 50], ["💷", "£20", 50, 50], ["💷", "£5", 78, 50]], ["£20"], { labels: true, hint: "The note must be bigger than the price.", why: "£10 is not enough, so £20 is the smallest note that covers £12.30.", tag: "money.note" })]),
  Q(mat("Match each price to its change from £5.", [["£3.20", "£1.80"], ["£4.10", "£0.90"], ["£1.50", "£3.50"]], { hint: "Count on to £5.", why: "£1.80, £0.90 and £3.50.", tag: "money.change" }), "change", "apply",
    [mat("Join each price to its change from £10.", [["£6.00", "£4.00"], ["£7.50", "£2.50"], ["£8.25", "£1.75"]], { hint: "Count on to £10.", why: "£4.00, £2.50 and £1.75.", tag: "money.change" })]),
  Q(mc("Zara says £4.35 to £5 is 75p because 35 + 40 = 75. Is she right?", "No. 35p + 65p makes £1, so the count-on is 65p", ["Yes, 75p", "No, 55p"], { hint: "Count on to the next whole pound.", why: "£4.35 + 65p = £5.00.", tag: "money.reason_count" }), "change", "reason",
    [mc("Ben says £2.60 to £3 is 30p because he counts on 30p. Is he right?", "No. 60p + 40p makes £1, so the count-on is 40p", ["Yes, 30p", "No, 50p"], { hint: "How many pence make a whole pound?", why: "60p + 40p makes a whole pound.", tag: "money.reason_count" })]),
  Q(mc("A toy costs £7.25 and you pay £10. What is the change?", "£2.75", ["£3.25", "£2.25"], { hint: "Count on from £7.25 to £10.", why: "£7.25 + £2.75 = £10.", tag: "money.change" }), "change", "apply",
    [mc("A jacket costs £12.60 and you pay £20. What is the change?", "£7.40", ["£8.40", "£7.60"], { hint: "Count on from £12.60 to £20.", why: "£12.60 + £7.40 = £20.", tag: "money.change" })]),
  Q(mc("Hana says a £7.25 item paid with £10 gives £3.25 change because 10 − 7 = 3 and then add 25p. Is she right?", "No. 10 − 7 = 3, then take away 25p, which gives £2.75", ["Yes, £3.25", "No, £2.25"], { hint: "Take away the pence too.", why: "£7.25 + £2.75 = £10, so the change is £2.75.", tag: "money.reason_change" }), "change", "reason",
    [mc("Sam says a £4.60 item paid with £5 gives 60p change. Is he right?", "No. £5 − £4.60 = 40p, because 60p + 40p = £1", ["Yes, 60p", "No, 50p"], { hint: "Count on from £4.60 to £5.", why: "£4.60 + 40p = £5.", tag: "money.reason_change" })]),
  Q(sld("Slide to show the change from £10 for a £8.60 bag.", { min: 0, max: 10, step: 0.1 }, 1.4, 0.1, { hint: "Count on from £8.60 to £10.", why: "£8.60 + £1.40 = £10.", tag: "money.change" }), "change", "apply",
    [sld("Slide to show the change from £20 for a £15.30 jacket.", { min: 0, max: 20, step: 0.1 }, 4.7, 0.1, { hint: "Count on from £15.30 to £20.", why: "£15.30 + £4.70 = £20.", tag: "money.change" })]),
  // ----- bar_models (q25-q30)
  Q(num("Ali buys a pen for £1.20, a book for £3.45 and a ruler for 85p. What is the total in pounds?", 5.5, { tol: 0.005, hint: "Add all three prices.", why: "£1.20 + £3.45 + 85p = £5.50.", tag: "money.two_step" }), "bar_models", "apply",
    [num("Mina buys 2 cards at £1.50 each and a bag for £2.75. What is the total in pounds?", 5.75, { tol: 0.005, hint: "Add the cards, then the bag.", why: "£3.00 + £2.75 = £5.75.", tag: "money.two_step" })]),
  Q(mc("Omar says £1.05 is bigger than £1.50 because 105 is bigger than 50. Is he right?", "No. £1.50 is more than £1.05, because 50p is more than 5p", ["Yes, 105 is bigger", "No, they are the same"], { hint: "Compare the pence.", why: "£1.50 has 50p. £1.05 has 5p.", tag: "money.reason_compare" }), "bar_models", "reason",
    [mc("Zainab says £2.09 is more than £2.90 because 9 is bigger than 0. Is she right?", "No. £2.90 is more than £2.09, because 90p is more than 9p", ["Yes, 9 is bigger than 0", "No, they are the same"], { hint: "Compare the tenths first.", why: "90p is more than 9p.", tag: "money.reason_compare" })]),
  Q(fill("Fill the missing part in the bar.", "£10 = £4.25 + £{b1}.{b2}", [["5", "6", "4"], ["75", "25", "50"]], { hint: "Take £4.25 from £10.", why: "£10 − £4.25 = £5.75.", tag: "money.bar" }), "bar_models", "apply",
    [fill("Fill the missing part in the other bar.", "£20 = £12.60 + £{b1}.{b2}", [["7", "8", "6"], ["40", "60", "20"]], { hint: "Take £12.60 from £20.", why: "£20 − £12.60 = £7.40.", tag: "money.bar" })]),
  Q(mc("Ravi says a £10 bar split into £6.40 and £3.60 is correct because 6.40 + 3.60 = 10. Is he right?", "Yes. £6.40 + £3.60 = £10.00", ["No, it is £9.60", "No, it is £10.60"], { hint: "Add the two parts.", why: "£6.40 + £3.60 = £10.00.", tag: "money.reason_bar" }), "bar_models", "reason",
    [mc("Lina says a £8 bar split into £5.25 and £2.85 is correct. Is she right?", "No. The parts make £8.10, not £8", ["Yes, they make £8", "No, they make £7.90"], { hint: "Add the two parts.", why: "£5.25 + £2.85 = £8.10.", tag: "money.reason_bar" })]),
  Q(sld("Slide to show the total for 3 items at £1.25 each.", { min: 0, max: 5, step: 0.05 }, 3.75, 0.05, { hint: "Three times £1.25.", why: "£1.25 + £1.25 + £1.25 = £3.75.", tag: "money.two_step" }), "bar_models", "apply",
    [sld("Slide to show the total for 2 items at £2.40 each.", { min: 0, max: 5, step: 0.05 }, 4.8, 0.05, { hint: "Two times £2.40.", why: "£2.40 + £2.40 = £4.80.", tag: "money.two_step" })]),
  Q(hot("Tap the shop with the cheaper total for 2 pens.", [["🏪", "Shop A: £2.40 each", 22, 50], ["🏪", "Shop B: £4.50 for 2", 50, 50], ["🏪", "Shop C: £2.60 each", 78, 50]], ["Shop B: £4.50 for 2"], { labels: true, hint: "Work out each total for 2.", why: "A is £4.80, B is £4.50, C is £5.20.", tag: "money.compare" }), "bar_models", "apply",
    [hot("Tap the shop with the cheaper total for 3 books.", [["🏪", "Shop A: £2.50 each", 22, 50], ["🏪", "Shop B: £6.90 for 3", 50, 50], ["🏪", "Shop C: £2.10 each", 78, 50]], ["Shop C: £2.10 each"], { labels: true, hint: "Work out each total for 3.", why: "A is £7.50, B is £6.90, C is £6.30.", tag: "money.compare" })]),
];

export const topics = [
  topicLesson({
    slug: "maths-class-4-money-bar-models", subject: "maths", cls: 4, topic: 9, title: "Money Problems and Bar Models",
    summary: "Add, subtract and find change with pounds and pence, using bar models to plan multi-step money problems.",
    unit: "Topic 9: Money problems and bar models", difficulty: 2,
    objectives: ["Convert and write pounds and pence", "Add and subtract money efficiently", "Solve multi-step money problems, including change"],
    success_criteria: ["I can write money with a decimal point", "I can add prices in columns and near a whole pound", "I can draw a bar model to find change"],
    real_life: "Bake sales, school fairs, shop change and comparing prices at the market.",
    standards: [
      { framework: "nc_england", code: "Y4 money", text: "Estimate, compare and calculate different measures, including money in pounds and pence" },
      { framework: "cambridge", code: "4Nf.06" }, { framework: "cambridge", code: "4Nc.05" }, { framework: "cambridge", code: "4Ni.06" },
    ],
    warm_up: [
      num("What is 45 + 38?", 83, { hint: "Add the tens, then the ones.", why: "40 + 30 = 70 and 5 + 8 = 13, so 83." }),
      num("How many pence are in one pound?", 100, { hint: "Think of a pound coin.", why: "One pound is 100 pence." }),
      tf("0.5 is the same as 50 hundredths.", true, { hint: "Five tenths.", why: "0.5 = 50/100." }),
    ],
    intro: [],
    subs: [poundsPence, efficientAdding, change, barModels],
    clip,
    quiz,
  }),
];
