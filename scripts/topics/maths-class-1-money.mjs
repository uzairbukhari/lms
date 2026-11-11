import { SAY, SS, H, T, IMG, TIP, FACT, PHOTO, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Coteach diagrams (see content/media/manifest.d/maths-class-1-money.json).
const COTEACH_A = {"type":"image","asset":"maths-class-1-money-d1-fd7f44bc.png","alt":"Coins 50p, 20p and 5p with running totals 50p, 70p and 75p","caption":"50p + 20p + 5p = 75p."};
const COTEACH_B = {"type":"image","asset":"maths-class-1-money-d2-db6568e7.png","alt":"A part-whole bar with 50p split into a 35p price and a question mark for the change","caption":"50p take away 35p leaves the change."};
// Class 1 Maths topic 4: money, in pounds and pence and in rupees (format 3.0). Standards from docs/CURRICULUM_V2.md.
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });
const C = (id, label, x, y = 44, size = 1, anim = "none") => [id, { kind: "coin", highlight: label }, x, y, size, anim];

const N = (q, sub, depth, alts) => ({ q, sub, depth, alts });
const PIGGY = "maths-class-1-money-1-f5830553.jpg";

const coins = {
  id: "coins", kind: "learn", title: "Coins and notes",
  blocks: [
    H("Welcome back, number explorer!"),
    SAY("Welcome back, number explorer! Today we learn about money. We meet pounds, pence and rupees. We add coins and work out change.",
      T("Today we use **money**: coins, totals and change.")),
    SAY("This piggy bank saves coins for a rainy day. What would you save up for?",
      PHOTO(PIGGY, "A pink ceramic piggy bank on a pink background", "A piggy bank for saving coins.", "Photo by Pawel Czerwinski on Unsplash")),
    H("Stop 1: Pounds and pence"),
    SAY("Money helps us buy things. In the United Kingdom people use pounds and pence. A hundred pence make one pound. The coins are one pence, two pence and five pence. Then ten pence, twenty pence and fifty pence. Then the pound coin and the two pound coin. Bigger numbers on a coin do not always mean a bigger coin. Always read the number!", T("In the UK, 100 **pence** make 1 **pound**.", "Coins: 1p, 2p, 5p, 10p, 20p, 50p, £1 and £2. Notes start at £5.")),
    EXPP("UK coins",
      SS("Here are the small coins. One pence, two pence and five pence. These are worth the least.", S("1p, 2p and 5p.", C("a", "1p", 22, 44, 2), C("b", "2p", 50, 44, 2), C("c", "5p", 78, 44, 2))),
      SS("Now bigger coins. Ten pence, twenty pence and fifty pence. A fifty pence coin is worth a lot more than a ten pence coin.", S("10p, 20p and 50p.", C("a", "10p", 22, 44, 2), C("b", "20p", 50, 44, 2), C("c", "50p", 78, 44, 2))),
      SS("And the pound coins. One pound is one hundred pence. Two pounds is two hundred pence.", S("£1 and £2.", C("a", "£1", 30, 44, 2, "pulse"), C("b", "£2", 70, 44, 2)))),
    SAY("Add the coins one at a time. Fifty pence, then seventy, then seventy-five.", COTEACH_A),
    CHK(mc("How many pence make one pound?", "100", ["10", "1000"], { hint: "It is a very round number.", why: "100 pence make 1 pound.", tag: "money.uk" })),
    H("Stop 2: Rupees and paisas"),
    SAY("In Pakistan people use rupees. The coins are one rupee, two rupees and five rupees. The notes are ten, twenty, fifty, one hundred and bigger. A hundred paisa make a rupee. But today we mostly use whole rupees. A friend in Pakistan and a friend in England can both count money. The coins and names are different, but adding works the same way.", T("In Pakistan people use **rupees**. Coins: Rs 1, 2 and 5. Notes: Rs 10, 20, 50, 100 and more.", "Adding money works the same way with pounds or rupees.")),
    IMG("🇵🇰", "Pakistan uses rupees. The UK uses pounds."),
    CHK(mc("Which country uses rupees?", "Pakistan", ["The UK", "France"], { hint: "Think about where Zainab's family comes from.", why: "Pakistan uses rupees. The UK uses pounds.", tag: "money.rupees" })),
    SAY("Remember. Read the number on a coin to find its value. In the UK, one hundred pence make a pound. In Pakistan we use rupees.", SUM("Read the number on a coin to find its value", "100 pence make 1 pound", "Pakistan uses rupees")),
    GLOSS({ money: "Coins and notes used to buy things.", pence: "Small UK money. 100 pence make 1 pound.", pound: "A UK coin worth 100 pence.", rupee: "Money used in Pakistan.", coin: "A round piece of money.", note: "Paper money." }),
  ],
  mini: [
    num("How many pence are in 1 pound?", 100, { hint: "It is a hundred.", why: "100 pence make 1 pound." }),
    mc("Which coin is worth the most?", "50p", ["10p", "20p"], { hint: "Compare the numbers.", why: "50p is more than 20p and 10p." }),
    tf("Pakistan uses pounds.", false, { hint: "Which money do we use in Pakistan?", why: "Pakistan uses rupees." }),
    mc("Which is the smallest coin?", "1p", ["5p", "2p"], { hint: "Look for the smallest number.", why: "1p is worth the least." }),
  ],
};

const making = {
  id: "making", kind: "try", title: "Making totals",
  blocks: [
    H("Stop 1: Add coins together"),
    SAY("We can make a total by adding coins. Take a ten pence, a five pence and two one pence coins. Start with the biggest. Ten. Add five to make fifteen. Then one more is sixteen, and one more is seventeen. So the total is seventeen pence. Always count the biggest coin first.", T("To find a **total**, start with the biggest coin and count on.", "10p + 5p + 1p + 1p = 17p.")),
    EXPP("Count the coins: 17p",
      SS("Start with the biggest coin. Ten pence.", S("10p", C("a", "10p", 20, 44, 2))),
      SS("Add a five pence. Ten, and five more. Fifteen pence.", S("10p + 5p = 15p", C("a", "10p", 20, 44, 2), C("b", "5p", 40, 44, 2))),
      SS("Now two one pence coins. Sixteen. Seventeen. The total is seventeen pence.", S("15p + 1p + 1p = 17p", C("a", "10p", 16), C("b", "5p", 32), C("c", "1p", 48), C("d", "1p", 62), ["s", "✅", 84, 44, 3, "bounce", "17p"]))),
    SAY("Here is fifty pence. The price is thirty-five pence. What is the change?", COTEACH_B),
    CHK(num("What is 10p + 10p + 5p in pence?", 25, { hint: "Count 10, 20, 25.", why: "10 + 10 + 5 = 25p.", tag: "money.total" })),
    H("Stop 2: Make it with coins"),
    SAY("Let us practise with real coins, or with buttons pretending to be coins. Make a total of twenty pence in two ways. You could use two ten pence coins. Or one ten, one five and five one pence coins. Different coins can make the same total.", T("The same total can be made in different ways: 20p = 10p + 10p, or 10p + 5p + 5p.")),
    MAN("Make 20p", "You have 20 pennies. Group them into tens and fives to make 20p in different ways.", "🪙", 20, ["Pennies", "Tens and fives"]),
    ACT("Make 25p in different ways", ["Coins or buttons", "Paper and pencil"], ["Count out 25 pence using any coins.", "Now make 25p a different way.", "How many different ways can you find?", "Write them down like 10p + 10p + 5p."]),
    CHK(mc("Which makes 20p?", "10p + 5p + 5p", ["10p + 5p + 2p", "5p + 5p + 5p"], { hint: "Add each one up.", why: "10 + 5 + 5 = 20p.", tag: "money.total" })),
    SAY("Remember. Count the biggest coin first. The same total can be made in different ways.", SUM("Count the biggest coin first", "The same total can be made in different ways")),
    GLOSS({ total: "How much money there is altogether.", biggest: "The coin or number with the most value.", penny: "A 1p coin.", pretend: "To act as if something is something else." }),
  ],
  mini: [
    num("What is 5p + 5p + 5p?", 15, { hint: "Count in fives.", why: "5, 10, 15." }),
    num("What is 20p + 10p?", 30, { hint: "2 tens and 1 ten.", why: "20 + 10 = 30p." }),
    mc("Which two coins make 15p?", "10p and 5p", ["10p and 2p", "5p and 5p"], { hint: "Add the pairs.", why: "10 + 5 = 15p." }),
    tf("Two 10p coins make 20p.", true, { hint: "10 + 10.", why: "10 + 10 = 20p." }),
  ],
};

const change = {
  id: "change", kind: "play", title: "Giving change",
  blocks: [
    H("Stop 1: How much change?"),
    SAY("When we pay with more money than the price, the shop gives us change. A pencil costs thirty pence. We give a fifty pence coin. How much change? Count on from thirty to fifty. Forty, fifty. That is twenty pence. Or take away. Fifty take away thirty is twenty. Twenty pence change.", T("**Change** is the money you get back. Count on from the price to what you paid.", "50p - 30p = 20p change.")),
    EXPP("30p pencil, pay 50p",
      SS("The pencil costs thirty pence. We hand over a fifty pence coin.", S("Price 30p. Paid 50p.", C("a", "30p", 28, 44, 2), C("b", "50p", 72, 44, 2))),
      SS("Count on from thirty to fifty. That is a jump of twenty. So the shop gives us twenty pence change.", S("50p - 30p = 20p change.", C("a", "30p", 28, 44, 2), C("b", "50p", 72, 44, 2), ["s", "✅", 50, 86, 2, "bounce", "20p change"]))),
    SAY("Flip the cards and find the matching pairs.", BRAIN("memory_match", "Shop match", "Find the matching pairs of cards.", ["🍎", "🍌", "✏️", "📒", "🍪", "🥤"])),
    CHK(num("A sticker costs 20p. You pay with 50p. How much change?", 30, { hint: "Take 20 away from 50.", why: "50 - 20 = 30p change.", tag: "money.change" })),
    H("Stop 2: The shop game"),
    SAY("Now play shopkeeper. Put prices on a few things at home. Ask your family to buy them. Take their coins, add them up, and give the right change. A real shop helps you remember. Which is more fun, buying or selling?", T("Play shop at home: put prices on things, take coins and give change.")),
    IMG("🏪", "Play shop at home with prices and coins."),
    CHK(mc("A bun costs 40p. You pay 50p. How much change?", "10p", ["20p", "5p"], { hint: "How far from 40 to 50?", why: "50 - 40 = 10p change.", tag: "money.change" })),
    SAY("Remember. Change is what you get back. Count on from the price, or take the price away from what you paid.", SUM("Change is the money you get back", "Count on from the price, or take the price away")),
    GLOSS({ change: "Money you get back when you pay with too much.", price: "How much something costs.", shopkeeper: "A person who sells things in a shop.", paid: "The money you give to buy something." }),
  ],
  mini: [
    num("A pen costs 40p. You pay 50p. How much change?", 10, { hint: "50 - 40.", why: "50 - 40 = 10p." }),
    num("An apple costs 30p. You pay 50p. How much change?", 20, { hint: "50 - 30.", why: "50 - 30 = 20p." }),
    tf("Change is the money you give to the shop.", false, { hint: "Who gets the change?", why: "Change is the money you get back." }),
    mc("A toy costs 60p. You pay 70p. How much change?", "10p", ["20p", "30p"], { hint: "How far from 60 to 70?", why: "70 - 60 = 10p." }),
  ],
};

const shop = {
  id: "shop", kind: "use", title: "Shopping stories",
  blocks: [
    H("Stop 1: Two things, one total"),
    SAY("Shopping problems often have two prices. A pencil is twenty pence and a rubber is fifteen pence. How much for both? Add them. Twenty plus fifteen is thirty-five. Thirty-five pence. Can we pay with a fifty pence coin? Yes, because fifty is more than thirty-five. How much change? Fifteen pence.", T("Add the prices to find the **cost**.", "20p + 15p = 35p. Pay 50p and get 15p change.")),
    EXPP("Pencil and rubber",
      SS("A pencil costs twenty pence. A rubber costs fifteen pence.", S("20p and 15p.", C("a", "20p", 28, 44, 2), C("b", "15p", 72, 44, 2))),
      SS("Add them. Twenty and fifteen make thirty-five pence. That is the total cost.", S("20p + 15p = 35p.", C("a", "20p", 28, 44, 2), C("b", "15p", 72, 44, 2), ["s", "✅", 50, 86, 2, "bounce", "35p total"]))),
    CHK(num("A sweet costs 10p and a biscuit costs 25p. How much for both?", 35, { hint: "Add the two prices.", why: "10 + 25 = 35p.", tag: "money.shopping" })),
    H("Stop 2: Can I afford it?"),
    SAY("Zainab has fifty pence. She wants a drink for thirty-five pence and a cake for twenty pence. Can she buy both? Add the prices. Thirty-five plus twenty is fifty-five. That is more than fifty. So no, she cannot buy both. Checking first saves a lot of trouble!", T("Zainab has 50p. A drink is 35p and a cake is 20p. 35p + 20p = 55p, which is more than 50p.", "No, she cannot buy both.")),
    IMG("🥤", "A drink for 35p and a cake for 20p cost 55p altogether."),
    REVEAL("You have 20p. A toy costs 15p. How much change? Have a think first.", "5p change. 20p - 15p = 5p."),
    CHK(mc("Aisha has 50p. A toy costs 45p. Can she buy it?", "Yes, with 5p change", ["No, it costs too much", "Yes, with 10p change"], { hint: "Is 45 smaller than 50?", why: "50 - 45 = 5p change.", tag: "money.afford" })),
    SAY("Remember. Add prices to find the total. Check that you have enough. Then work out your change.", SUM("Add the prices to find the total", "Check that you have enough money", "Work out your change")),
    GLOSS({ cost: "How much you pay for something.", afford: "To have enough money to buy something.", total: "All the prices added together.", enough: "As much as you need." }),
  ],
  mini: [
    num("A pencil costs 10p and a rubber costs 20p. How much for both?", 30, { hint: "10 + 20.", why: "10 + 20 = 30p." }),
    num("A bun costs 25p and a juice costs 25p. How much for both?", 50, { hint: "Double 25.", why: "25 + 25 = 50p." }),
    mc("You have 30p. A toy costs 40p. Can you buy it?", "No, it costs too much", ["Yes", "Yes, with 10p change"], { hint: "Is 40 more than 30?", why: "40p is more than 30p, so no." }),
    tf("You always get change from a 50p coin.", false, { hint: "What if the price is 50p?", why: "If the price is 50p there is no change." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Zainab goes to the corner shop", backdrop: "town", caption: "Zainab pays with coins and gets change.",
  scenes: [
    { caption: "Zainab has 50p.", say: "Zainab has a fifty pence coin. She goes to the corner shop.",
      items: [{ id: "z", emoji: "👧", label: "Zainab", x: 25, y: 56, size: 3, enter: "walk_right" }, { id: "c", prop: { kind: "coin", highlight: "50p" }, x: 72, y: 44, size: 2, enter: "pop" }] },
    { caption: "A drink costs 35p.", say: "A drink costs thirty-five pence. She wants it!",
      items: [{ id: "d", emoji: "🥤", label: "35p", x: 50, y: 44, size: 3, enter: "grow" }] },
    { caption: "Pay with 50p.", say: "She hands over her fifty pence coin.",
      items: [{ id: "c", prop: { kind: "coin", highlight: "50p" }, x: 30, y: 44, size: 2, enter: "slide_right" }, { id: "d", emoji: "🥤", label: "35p", x: 72, y: 44, size: 3 }] },
    { caption: "Count on to 40.", say: "Count on from thirty-five. Five more makes forty.",
      items: [{ id: "a", prop: { kind: "coin", highlight: "5p" }, x: 50, y: 44, size: 2, effect: "sparkle" }] },
    { caption: "Count on to 50.", say: "Ten more makes fifty. Five and ten is fifteen.",
      items: [{ id: "a", prop: { kind: "coin", highlight: "5p" }, x: 35, y: 44, size: 2 }, { id: "b", prop: { kind: "coin", highlight: "10p" }, x: 65, y: 44, size: 2, effect: "sparkle" }] },
    { caption: "15p change.", say: "The shopkeeper gives her fifteen pence change.",
      items: [{ id: "k", emoji: "🧑‍🍳", label: "Shopkeeper", x: 72, y: 50, size: 3 }, { id: "z", emoji: "👧", x: 28, y: 56, size: 3, anim: "bounce", label: "15p change" }] },
    { caption: "50p - 35p = 15p.", say: "Fifty take away thirty-five is fifteen. Both ways agree!",
      items: [{ id: "e", emoji: "✅", label: "50 - 35 = 15", x: 50, y: 44, size: 3, effect: "glow" }] },
    { caption: "Shukriya!", say: "Shukriya, shopkeeper! Zainab saves her change in the piggy bank.",
      items: [{ id: "z", emoji: "👧", x: 28, y: 56, size: 3, anim: "bounce" }, { id: "p", emoji: "🐷", x: 72, y: 44, size: 3, effect: "hearts" }] },
  ],
};

export const topics = [
  topicLesson({
    slug: "maths-class-1-money", subject: "maths", cls: 1, topic: 4, title: "Money",
    summary: "UK coins and notes, Pakistani rupees, making totals, giving change and shopping stories.",
    unit: "Topic 4: Money", difficulty: 1,
    objectives: ["Name UK coins and Pakistani money", "Make totals with coins", "Find change", "Solve shopping stories"],
    success_criteria: ["I can say what each coin is worth", "I can add coins to make a total", "I can work out change from 50p"],
    real_life: "Pocket money, buying sweets and paying in a shop.",
    standards: [
      { framework: "nc_england", code: "Y2 money", text: "Recognise and use symbols for pounds and pence; combine amounts; find change" },
      { framework: "cambridge", code: "2Nm.01" }, { framework: "cambridge", code: "2Nm.02" },
    ],
    warm_up: [
      num("What is 10 + 10?", 20, { hint: "Double 10.", why: "10 + 10 = 20." }),
      num("What is 50 - 30?", 20, { hint: "5 tens take away 3 tens.", why: "50 - 30 = 20." }),
      tf("20 is bigger than 15.", true, { hint: "Compare 20 and 15.", why: "20 is more than 15." }),
    ],
    intro: [],
    subs: [coins, making, change, shop],
    clip,
    quiz: [
      { q: num("How many pence make 1 pound?", 100, { hint: "It is a hundred.", why: "100 pence make 1 pound.", tag: "money.uk" }), sub: "coins", depth: "recall", alts: [num("How many pence are in 2 pounds?", 200, { hint: "2 lots of 100.", why: "2 pounds is 200 pence.", tag: "money.uk" }), num("How many pence are in half a pound?", 50, { hint: "Half of 100.", why: "Half a pound is 50p.", tag: "money.uk" })] },
      { q: mc("Which of these coins is worth the most?", "20p", ["5p", "2p"], { hint: "Read the number on each coin.", why: "20p is worth more than 5p and 2p.", tag: "money.uk" }), sub: "coins", depth: "recall", alts: [mc("Which coin is worth the least?", "1p", ["10p", "50p"], { hint: "Read the number on each coin.", why: "1p is worth the least.", tag: "money.uk" }), mc("Pick the coin that is worth the most.", "50p", ["10p", "20p"], { hint: "Read the number on each coin.", why: "50p is worth the most.", tag: "money.uk" })] },
      { q: tf("In Pakistan people use pounds.", false, { hint: "Which money does Pakistan use?", why: "Pakistan uses rupees.", tag: "money.rupees" }), sub: "coins", depth: "recall", alts: [tf("In England people use pounds and pence.", true, { hint: "Which money does the UK use?", why: "The UK uses pounds and pence.", tag: "money.uk" }), tf("Rupees are used in France.", false, { hint: "Which country uses rupees?", why: "Pakistan uses rupees.", tag: "money.rupees" })] },
      { q: fill("Finish the total.", "10p + 5p + {b1}p = 17p", [["2", "1", "3"]], { hint: "17 - 15.", why: "10 + 5 + 2 = 17p.", tag: "money.total" }), sub: "making", depth: "apply", alts: [fill("Finish this total.", "20p + 5p + {b1}p = 28p", [["3", "2", "4"]], { hint: "28 - 25.", why: "20 + 5 + 3 = 28p.", tag: "money.total" }), fill("Complete the total.", "10p + 10p + {b1}p = 24p", [["4", "3", "5"]], { hint: "24 - 20.", why: "10 + 10 + 4 = 24p.", tag: "money.total" })] },
      { q: ms("Which make 15p? Pick two.", ["10p + 5p", "5p + 5p + 5p"], ["10p + 2p", "5p + 5p + 2p"], { hint: "Add each one up.", why: "10 + 5 = 15p and 5 + 5 + 5 = 15p.", tag: "money.total" }), sub: "making", depth: "apply", alts: [ms("Which make 25p? Pick two.", ["20p + 5p", "10p + 10p + 5p"], ["20p + 2p", "10p + 10p + 2p"], { hint: "Add each one up.", why: "20 + 5 = 25p and 10 + 10 + 5 = 25p.", tag: "money.total" }), ms("Which make 30p? Pick two.", ["20p + 10p", "10p + 10p + 10p"], ["20p + 5p", "10p + 10p + 5p"], { hint: "Add each one up.", why: "20 + 10 = 30p and 10 + 10 + 10 = 30p.", tag: "money.total" })] },
      { q: ord("Put these amounts in order, smallest first.", ["5p", "15p", "35p", "50p"], { hint: "Compare the tens.", why: "5p, 15p, 35p and 50p are in order.", tag: "money.order" }), sub: "making", depth: "apply", alts: [ord("Order these amounts from smallest.", ["10p", "25p", "40p", "60p"], { hint: "Compare the tens.", why: "10p, 25p, 40p and 60p are in order.", tag: "money.order" }), ord("Arrange these amounts, smallest first.", ["2p", "12p", "32p", "50p"], { hint: "Compare the tens.", why: "2p, 12p, 32p and 50p are in order.", tag: "money.order" })] },
      { q: mat("Match each coin sum to its total.", [["10p + 10p", "20p"], ["20p + 5p", "25p"], ["50p + 10p", "60p"]], { hint: "Add the coins.", why: "10 + 10 = 20, 20 + 5 = 25, 50 + 10 = 60.", tag: "money.total" }), sub: "making", depth: "apply", alts: [mat("Join each coin sum to its total.", [["5p + 5p", "10p"], ["20p + 10p", "30p"], ["50p + 20p", "70p"]], { hint: "Add the coins.", why: "5 + 5 = 10, 20 + 10 = 30, 50 + 20 = 70.", tag: "money.total" }), mat("Pair each coin sum with its total.", [["10p + 5p", "15p"], ["20p + 20p", "40p"], ["50p + 5p", "55p"]], { hint: "Add the coins.", why: "10 + 5 = 15, 20 + 20 = 40, 50 + 5 = 55.", tag: "money.total" })] },
      { q: hot("Tap the purse that holds 25p.", [["👛", "Purse A: 20p + 5p", 22, 50], ["👛", "Purse B: 10p + 10p", 50, 50], ["👛", "Purse C: 50p", 78, 50]], ["Purse A: 20p + 5p"], { labels: true, hint: "Add the coins in each purse.", why: "20 + 5 = 25p.", tag: "money.total" }), sub: "making", depth: "apply", alts: [hot("Tap the purse that holds 30p.", [["👛", "Purse A: 10p + 10p", 22, 50], ["👛", "Purse B: 20p + 10p", 50, 50], ["👛", "Purse C: 50p", 78, 50]], ["Purse B: 20p + 10p"], { labels: true, hint: "Add the coins in each purse.", why: "20 + 10 = 30p.", tag: "money.total" }), hot("Tap the purse that holds 15p.", [["👛", "Purse A: 10p + 10p", 22, 50], ["👛", "Purse B: 5p + 5p", 50, 50], ["👛", "Purse C: 10p + 5p", 78, 50]], ["Purse C: 10p + 5p"], { labels: true, hint: "Add the coins in each purse.", why: "10 + 5 = 15p.", tag: "money.total" })] },
      { q: sld("Slide to show how much change from 50p for something that costs 35p.", { min: 0, max: 50 }, 15, 0, { hint: "Count on from 35 to 50.", why: "50 - 35 = 15p.", tag: "money.change" }), sub: "change", depth: "apply", alts: [sld("Slide to show how much change from 50p for something that costs 40p.", { min: 0, max: 50 }, 10, 0, { hint: "Count on from 40 to 50.", why: "50 - 40 = 10p.", tag: "money.change" }), sld("Slide to show how much change from 50p for something that costs 25p.", { min: 0, max: 50 }, 25, 0, { hint: "Count on from 25 to 50.", why: "50 - 25 = 25p.", tag: "money.change" })] },
      { q: num("A ball costs 30p. You pay 50p. How much change?", 20, { hint: "Take 30 away from 50.", why: "50 - 30 = 20p.", tag: "money.change" }), sub: "change", depth: "recall", alts: [num("A comic costs 45p. You pay 50p. How much change?", 5, { hint: "Take 45 away from 50.", why: "50 - 45 = 5p.", tag: "money.change" }), num("A game costs 20p. You pay 50p. How much change?", 30, { hint: "Take 20 away from 50.", why: "50 - 20 = 30p.", tag: "money.change" })] },
      { q: num("A pencil costs 15p and a rubber costs 20p. How much for both?", 35, { hint: "Add the two prices.", why: "15 + 20 = 35p.", tag: "money.shopping" }), sub: "shop", depth: "apply", alts: [num("A sweet costs 25p and a biscuit costs 20p. How much for both?", 45, { hint: "Add the two prices.", why: "25 + 20 = 45p.", tag: "money.shopping" }), num("A ruler costs 30p and a pen costs 15p. How much for both?", 45, { hint: "Add the two prices.", why: "30 + 15 = 45p.", tag: "money.shopping" })] },
      { q: mc("Layla says 20p + 5p makes 30p. Is she right?", "No, 20p + 5p makes 25p", ["Yes, it makes 30p", "No, it makes 15p"], { hint: "Add the tens, then the ones.", why: "20 + 5 = 25p.", tag: "money.reason" }), sub: "making", depth: "reason", alts: [mc("Sam says 10p + 5p makes 20p. Is he right?", "No, 10p + 5p makes 15p", ["Yes, it makes 20p", "No, it makes 5p"], { hint: "Add the tens, then the ones.", why: "10 + 5 = 15p.", tag: "money.reason" }), mc("Noor says 50p + 5p makes 60p. Is she right?", "No, 50p + 5p makes 55p", ["Yes, it makes 60p", "No, it makes 45p"], { hint: "Add the tens, then the ones.", why: "50 + 5 = 55p.", tag: "money.reason" })] },
      { q: mc("Why is a 2p coin worth less than a 5p coin, even though it is bigger?", "Because the number on the coin tells its value, not its size", ["Because it is heavier", "Because it is a different colour"], { hint: "What does the number on a coin tell you?", why: "The number on a coin tells its value. 2 is less than 5.", tag: "money.reason" }), sub: "coins", depth: "reason", alts: [mc("Why is a 10p coin worth more than a 5p coin?", "Because 10 is more than 5", ["Because it is shinier", "Because it is smaller"], { hint: "Read the numbers on the coins.", why: "The number on a coin tells its value. 10 is more than 5.", tag: "money.reason" }), mc("Why is a 1p coin worth less than a 2p coin, even though it is bigger?", "Because the number on the coin tells its value, not its size", ["Because it is heavier", "Because it is a different colour"], { hint: "What does the number on a coin tell you?", why: "The number on a coin tells its value. 1 is less than 2.", tag: "money.reason" })] },
      { q: mc("Mira has 50p. A drink costs 30p and a snack costs 25p. Can she buy both?", "No, they cost 55p, which is more than 50p", ["Yes, they cost 45p", "Yes, they cost 50p"], { hint: "Add the prices first.", why: "30 + 25 = 55p, which is more than 50p.", tag: "money.afford" }), sub: "shop", depth: "reason", alts: [mc("Ali has 50p. A toy costs 35p and a sweet costs 20p. Can he buy both?", "No, they cost 55p, which is more than 50p", ["Yes, they cost 45p", "Yes, they cost 50p"], { hint: "Add the prices first.", why: "35 + 20 = 55p, which is more than 50p.", tag: "money.afford" }), mc("Sana has 50p. A pen costs 20p and a rubber costs 20p. Can she buy both?", "Yes, they cost 40p", ["No, they cost 60p", "No, they cost 50p"], { hint: "Add the prices first.", why: "20 + 20 = 40p, which is less than 50p.", tag: "money.afford" })] },
      { q: num("Sana has 50p. She buys a bun for 20p and a juice for 15p. How much money does she have left?", 15, { hint: "Add 20 and 15, then take it from 50.", why: "20 + 15 = 35p spent. 50 - 35 = 15p left.", tag: "money.shopping" }), sub: "shop", depth: "reason", alts: [num("Omar has 50p. He buys a pencil for 10p and a ruler for 25p. How much does he have left?", 15, { hint: "Add 10 and 25, then take it from 50.", why: "10 + 25 = 35p spent. 50 - 35 = 15p left.", tag: "money.shopping" }), num("Mina has 50p. She buys a sticker for 15p and a ball for 15p. How much does she have left?", 20, { hint: "Add 15 and 15, then take it from 50.", why: "15 + 15 = 30p spent. 50 - 30 = 20p left.", tag: "money.shopping" })] },
      // ----- upgrade: 15 new mains (q16-q30), 1 variant each
      N(num("What is 20p + 10p + 5p in pence?", 35, { hint: "Start with the biggest coin: 20, 30, 35.", why: "20 + 10 + 5 = 35p.", tag: "money.total" }), "making", "apply",
        [num("What is 50p + 20p + 10p in pence?", 80, { hint: "Start with the biggest coin: 50, 70, 80.", why: "50 + 20 + 10 = 80p.", tag: "money.total" })]),
      N(mc("Which uses the fewest coins to make 35p?", "20p + 10p + 5p", ["10p + 10p + 10p + 5p", "20p + 5p + 5p + 5p"], { hint: "Use the biggest coins you can.", why: "20p, 10p and 5p is only 3 coins. The others use 4 coins.", tag: "money.fewest_coins" }), "making", "apply",
        [mc("Which uses the fewest coins to make 45p?", "20p + 20p + 5p", ["20p + 10p + 10p + 5p", "10p + 10p + 10p + 10p + 5p"], { hint: "Use the biggest coins you can.", why: "20p, 20p and 5p is only 3 coins. The others use 4 or 5 coins.", tag: "money.fewest_coins" })]),
      N(ms("Which two ways make 20p? Pick two.", ["10p + 10p", "10p + 5p + 5p"], ["10p + 5p + 2p", "5p + 5p + 5p"], { hint: "Add each one up.", why: "10 + 10 = 20p and 10 + 5 + 5 = 20p. The others make 17p and 15p.", tag: "money.two_ways" }), "making", "apply",
        [ms("Which two ways make 40p? Pick two.", ["20p + 20p", "20p + 10p + 10p"], ["20p + 10p + 5p", "10p + 10p + 10p"], { hint: "Add each one up.", why: "20 + 20 = 40p and 20 + 10 + 10 = 40p. The others make 35p and 30p.", tag: "money.two_ways" })]),
      N(num("Zara has 20p. She buys a sweet for 15p. How much change does she get?", 5, { hint: "Take 15 away from 20.", why: "20 - 15 = 5p change.", tag: "money.change" }), "change", "apply",
        [num("Hana has 20p. A rubber costs 8p. How much change does she get?", 12, { hint: "Take 8 away from 20.", why: "20 - 8 = 12p change.", tag: "money.change" })]),
      N(mat("Match each amount to the same amount in pence.", [["£1", "100p"], ["£2", "200p"], ["£1.50", "150p"]], { hint: "£1 is 100p.", why: "£1 = 100p, £2 = 200p and £1.50 = 150p.", tag: "money.pounds_pence" }), "coins", "apply",
        [mat("Join each amount to the same amount in pence.", [["£3", "300p"], ["£1.20", "120p"], ["£2.50", "250p"]], { hint: "£1 is 100p.", why: "£3 = 300p, £1.20 = 120p and £2.50 = 250p.", tag: "money.pounds_pence" })]),
      N(hot("Tap the way to pay exactly 35p.", [["👛", "A: 20p + 10p + 5p", 22, 50], ["👛", "B: 20p + 10p + 2p", 50, 50], ["👛", "C: 50p", 78, 50]], ["A: 20p + 10p + 5p"], { labels: true, hint: "Add the coins in each purse.", why: "20 + 10 + 5 = 35p. B is 32p and C is 50p.", tag: "money.pay_exactly" }), "making", "apply",
        [hot("Tap the way to pay exactly 45p.", [["👛", "A: 20p + 10p + 10p", 22, 50], ["👛", "B: 20p + 20p + 5p", 50, 50], ["👛", "C: 50p", 78, 50]], ["B: 20p + 20p + 5p"], { labels: true, hint: "Add the coins in each purse.", why: "20 + 20 + 5 = 45p. A is 40p and C is 50p.", tag: "money.pay_exactly" })]),
      N(fill("Write the money in pounds.", "150p is £{b1}.{b2}", [["1", "2", "0"], ["50", "15", "5"]], { hint: "100p is £1. Then 50p more.", why: "150p is 100p and 50p, which is £1.50.", tag: "money.write_pounds" }), "coins", "apply",
        [fill("Change pence to pounds.", "120p is £{b1}.{b2}", [["1", "12", "2"], ["20", "12", "2"]], { hint: "100p is £1. Then 20p more.", why: "120p is 100p and 20p, which is £1.20.", tag: "money.write_pounds" })]),
      N(mc("Hamza says 54p is less than 45p because 4 is less than 5. Is he right?", "No. 54p has 5 tens and 45p has 4 tens, so 54p is more", ["Yes, 4 is less than 5", "No, they are the same"], { hint: "Compare the tens first.", why: "5 tens is more than 4 tens, so 54p is more than 45p.", tag: "money.reason_compare" }), "shop", "reason",
        [mc("Nora says 62p is less than 26p because 2 is less than 6. Is she right?", "No. 62p has 6 tens and 26p has 2 tens, so 62p is more", ["Yes, 2 is less than 6", "No, they are the same"], { hint: "Compare the tens first.", why: "6 tens is more than 2 tens, so 62p is more than 26p.", tag: "money.reason_compare" })]),
      N(tf("In Pakistan, a Rs 5 coin is worth more than a Rs 2 coin.", true, { hint: "Read the numbers on the coins.", why: "Rs 5 is more than Rs 2.", tag: "money.rupees" }), "coins", "recall",
        [tf("In Pakistan, a Rs 1 coin is worth more than a Rs 5 coin.", false, { hint: "Read the numbers on the coins.", why: "Rs 5 is more than Rs 1.", tag: "money.rupees" })]),
      N(ord("Put these prices in order, cheapest first.", ["8p", "18p", "40p", "65p"], { hint: "Compare the tens first.", why: "8p, 18p, 40p and 65p go up in order.", tag: "money.order_prices" }), "shop", "apply",
        [ord("Order these prices, cheapest first.", ["9p", "29p", "36p", "70p"], { hint: "Compare the tens first.", why: "9p, 29p, 36p and 70p go up in order.", tag: "money.order_prices" })]),
      N(mc("You need 35p. You have a 20p coin and a 10p coin. Which coin is missing?", "5p", ["10p", "2p"], { hint: "20 + 10 = 30. How much more?", why: "20 + 10 = 30p, so you need 5p more.", tag: "money.missing_coin" }), "change", "apply",
        [mc("You need 45p. You have two 20p coins. Which coin is missing?", "5p", ["10p", "1p"], { hint: "20 + 20 = 40. How much more?", why: "20 + 20 = 40p, so you need 5p more.", tag: "money.missing_coin" })]),
      N(sld("Slide to show the total of 20p + 20p + 10p.", { min: 0, max: 100 }, 50, 0, { hint: "20, 40, 50.", why: "20 + 20 + 10 = 50p.", tag: "money.total" }), "making", "apply",
        [sld("Slide to show the total of 50p + 20p + 5p.", { min: 0, max: 100 }, 75, 0, { hint: "50, 70, 75.", why: "50 + 20 + 5 = 75p.", tag: "money.total" })]),
      N(mc("Zainab says three 5p coins are worth more than one 10p coin. Is she right?", "Yes. 5p + 5p + 5p = 15p, which is more than 10p", ["No, a 10p coin is always worth more", "No, they are worth the same"], { hint: "Add the three 5p coins.", why: "3 fives make 15p. 15p is more than 10p.", tag: "money.reason_coins" }), "making", "reason",
        [mc("Ali says four 2p coins are worth more than one 5p coin. Is he right?", "Yes. 2p + 2p + 2p + 2p = 8p, which is more than 5p", ["No, a 5p coin is always worth more", "No, they are worth the same"], { hint: "Add the four 2p coins.", why: "4 twos make 8p. 8p is more than 5p.", tag: "money.reason_coins" })]),
      N(mc("Omar says the change from 50p for something that costs 30p is 30p. Is he right?", "No. The change is 20p, because 50 - 30 = 20", ["Yes, the change is 30p", "No, the change is 80p"], { hint: "Take 30 away from 50.", why: "50 - 30 = 20p. Omar used the price, not the change.", tag: "money.reason_change" }), "change", "reason",
        [mc("Ben says the change from 50p for something that costs 20p is 20p. Is he right?", "No. The change is 30p, because 50 - 20 = 30", ["Yes, the change is 20p", "No, the change is 70p"], { hint: "Take 20 away from 50.", why: "50 - 20 = 30p. Ben used the price, not the change.", tag: "money.reason_change" })]),
      N(mc("Sam says one pound and twenty pence is written £1.20p. Is he right?", "No. We use only one sign, so it is £1.20", ["Yes, use both signs", "No, it is 1.20p"], { hint: "Do we use £ and p together?", why: "We write £1.20 or 120p, never both signs together.", tag: "money.reason_symbols" }), "coins", "reason",
        [mc("Mira says one pound and five pence is written £1.5. Is she right?", "No. The pence need two digits, so it is £1.05", ["Yes, £1.5 is right", "No, it is £5.1"], { hint: "How many digits for the pence?", why: "5 pence is 05, so one pound five pence is £1.05.", tag: "money.reason_symbols" })]),
    ],
  }),
];
