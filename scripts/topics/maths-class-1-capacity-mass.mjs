import { SAY, SS, H, T, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Class 1 Maths topic 12: capacity, mass and volume.
// Story thread: Zara helps in Aunty Noor's kitchen and the corner shop.
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });
const HB = (text, backdrop) => ({ ...H(text), backdrop });
const OK = (label) => ["ok", "✅", 50, 90, 2, "bounce", label];

const PHOTO = "maths-class-1-capacity-mass-2-520c3b53.jpg";
// Coteach diagrams (see content/media/manifest.d/maths-class-1-capacity-mass.json).
const DG = (asset, alt, caption) => ({ type: "image", asset, alt, caption });
const D_JUG = DG("maths-class-1-capacity-mass-d1-e323b9f3.png", "A measuring jug marked from 0 to 1 litre with the 500 ml mark labelled and the water at 700 ml", "The water is at 700 ml.");
const D_SCALES = DG("maths-class-1-capacity-mass-d2-1a45a32a.png", "Balance scales with a rice bag in one pan and a 1 kg weight in the other, the rice side tipping down because it is heavier", "The heavier side goes down.");

// ---------------------------------------------------------------------------------------------- 1. learn
const hold = {
  id: "hold", kind: "learn", title: "How much does it hold?",
  blocks: [
    HB("Zara in Aunty Noor's kitchen", "home"),
    SAY("Meet Zara. She helps Aunty Noor in the kitchen. They pour, they weigh and they bake. Look at this measuring cup. Today we measure how much things hold.",
      { type: "image", asset: PHOTO, alt: "A clear glass measuring cup with millilitre marks up its side", caption: "A measuring cup with marks for millilitres.", credit: "Photo by Steve A Johnson on Unsplash" }),
    HB("Stop 1: Capacity and volume", "home"),
    SAY("A jug can hold water. How much it can hold is its capacity. How much water is in it now is its volume.",
      T("**Capacity** is how much a container can hold.", "**Volume** is how much is inside it now.")),
    EXPP("Capacity and volume",
      SS("Here is an empty jug. It can hold one litre. That is its capacity.", S("Capacity: 1 litre.", ["j", "🫙", 50, 46, 3, "none", "capacity 1 litre"])),
      SS("Pour in some water. The jug is half full.", S("Volume: half a litre.", ["j", "🫙", 30, 46, 3, "none", "half full"], ["w", "💧", 70, 46, 3, "pulse", "500 ml"])),
      SS("The capacity stays the same. Only the volume changes!", S("Capacity same, volume changes.", ["j", "🫙", 50, 46, 3, "pulse"], OK("capacity stays 1 litre")))),
    CHK(mc("Which word means how much a jug can hold?", "capacity", ["volume of water now", "weight"], { hint: "It is the most it can hold.", why: "Capacity is how much a container can hold.", tag: "capmass.capacity" })),
    HB("Stop 2: Litres and millilitres", "home"),
    SAY("We measure capacity in litres. A big juice carton holds one litre. A tiny drop is one millilitre. One litre is one thousand millilitres.",
      T("A **litre** is about a big carton of juice.", "A **millilitre** is a tiny amount, about a drop. 1 litre = 1000 millilitres.")),
    EXPP("Litres and millilitres",
      SS("A big carton holds one litre. It is for drinks.", S("1 litre.", ["c", "🧃", 50, 46, 3, "none", "1 litre"])),
      SS("A spoon holds a few millilitres. That is for medicine.", S("A spoon: millilitres.", ["s", "🥄", 50, 46, 3, "pulse", "5 ml"])),
      SS("Half a litre is five hundred millilitres.", S("500 ml + 500 ml = 1 litre.", ["c", "🧃", 50, 46, 3], OK("1 litre = 1000 ml")))),
    SAY("Look at this jug. It goes up to one litre. Half way is five hundred millilitres. The water is at seven hundred.", D_JUG),
    CHK(num("How many millilitres make 1 litre?", 1000, { hint: "A thousand.", why: "1 litre is 1000 millilitres.", tag: "capmass.litre_ml" })),
    SAY("Remember. Capacity is what it can hold. Volume is what is in it. Litres for big, millilitres for small.", SUM("Capacity: the most it can hold", "Volume: how much is in it now", "1 litre = 1000 millilitres")),
    GLOSS({ capacity: "How much a container can hold.", volume: "How much is inside it now.", litre: "A big unit for liquid.", millilitre: "A tiny unit for liquid. 1000 make a litre.", container: "Something that holds things, like a jug." }),
  ],
  mini: [
    mc("Which unit is best for a spoon of medicine?", "millilitres", ["litres", "kilograms"], { hint: "A spoon is small.", why: "A tiny amount is measured in millilitres." }),
    mc("A full jug holds 1 litre. After pouring half out, what changes?", "The volume", ["The capacity", "Nothing"], { hint: "What is inside now?", why: "The volume changes. The capacity is still 1 litre." }),
    num("How many millilitres are in half a litre?", 500, { hint: "Half of 1000.", why: "500 + 500 = 1000." }),
    tf("A bucket holds more than a teaspoon.", true, { hint: "Think of the sizes.", why: "A bucket is much bigger." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const pour = {
  id: "pour", kind: "try", title: "Pour and compare",
  blocks: [
    HB("Stop 1: Pour a cup into a jug", "home"),
    SAY("Zara fills a cup. She pours it into a jug. How many cups fill the jug? Let's count the pours.",
      T("To **compare** is to see which is more or less.", "4 cups of 250 ml fill a 1 litre jug.")),
    EXPP("Cups into a jug",
      SS("One cup holds two hundred and fifty millilitres.", S("1 cup = 250 ml.", ["c", "🥛", 30, 46, 3, "none", "250 ml"], ["j", "🫙", 70, 46, 3])),
      SS("Pour one, two, three, four cups. The jug is full!", S("4 cups.", ["c", "🥛🥛🥛🥛", 30, 46, 3, "pulse"], ["j", "🫙", 70, 46, 3, "pulse", "full"])),
      SS("Four cups make one litre. Now we can compare!", S("4 × 250 ml = 1000 ml.", ["j", "🫙", 50, 46, 3], OK("4 cups = 1 litre")))),
    MAN("Pour the juice", "Fill 1 litre of juice into the jug by moving 10 little cups. Move all of them into the jug.", "🥤", 10, ["Cups", "Jug"]),
    CHK(num("A jug holds 1 litre. A glass holds 100 millilitres. How many glasses fill the jug?", 10, { hint: "How many hundreds in 1000?", why: "10 glasses of 100 ml make 1000 ml.", tag: "capmass.cups_fill" })),
    HB("Stop 2: Estimate then check", "home"),
    SAY("Before you pour, guess. A guess is an estimate. Then pour and check. A tall jug is not always bigger. Always check!",
      T("To **estimate** is to make a sensible guess.", "Then measure to check your estimate.")),
    EXPP("A tall jug and a wide jug",
      SS("One jug is tall and thin. One is short and wide.", S("Two jugs.", ["a", "🥛", 30, 46, 3, "none", "tall"], ["b", "🫙", 70, 46, 3, "none", "wide"])),
      SS("Pour water from the tall one into the wide one. It fits exactly!", S("Same capacity.", ["a", "🥛", 30, 46, 3, "pulse"], ["b", "🫙", 70, 46, 3, "pulse"])),
      SS("Both hold one litre. A tall shape can fool your eyes!", S("Both = 1 litre.", ["a", "🥛", 30, 46, 3], ["b", "🫙", 70, 46, 3], OK("tall is not always more")))),
    ACT("Pour at home", ["A cup", "A jug or bowl", "Water"], ["Guess how many cups fill the jug.", "Pour one cup at a time and count.", "Was your guess close?", "Try a different jug and compare."]),
    CHK(mc("Which holds more: 1 litre or 750 millilitres?", "1 litre", ["750 millilitres", "They hold the same"], { hint: "1 litre is 1000 ml.", why: "1000 is more than 750.", tag: "capmass.compare_cap" })),
    SAY("Remember. Pour and count. Estimate first. Do not trust a tall shape.", SUM("Pour and count the cups", "Estimate first, then check", "Tall does not mean bigger")),
    GLOSS({ compare: "To see which is more or less.", estimate: "A sensible guess.", pour: "To tip a liquid from one container to another.", jug: "A container with a handle for liquids." }),
  ],
  mini: [
    num("A cup holds 200 millilitres. How many cups make 400 millilitres?", 2, { hint: "200 + 200.", why: "2 cups make 400 ml." }),
    mc("Which is more: 3 litres or 300 millilitres?", "3 litres", ["300 millilitres", "The same"], { hint: "3 litres is 3000 ml.", why: "3000 ml is more than 300 ml." }),
    tf("An estimate is a sensible guess.", true, { hint: "Guess then check.", why: "You estimate first and measure after." }),
    num("2 half-litre bottles fill how many litres?", 1, { hint: "500 + 500.", why: "That is 1000 ml, or 1 litre." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const heavy = {
  id: "heavy", kind: "play", title: "Heavy or light?",
  blocks: [
    HB("Stop 1: Balance scales", "classroom"),
    SAY("Now we weigh things. How heavy something is, is its mass. A balance has two pans. The heavier side goes down.",
      T("**Mass** is how heavy something is.", "On a **balance**, the heavier side goes down.")),
    EXPP("Balance scales",
      SS("A mango on one side. A grape on the other.", S("Mango and grape.", ["m", "🥭", 30, 40, 3], ["g", "🍇", 70, 40, 3], ["b", "⚖️", 50, 66, 3])),
      SS("The mango side goes down. It is heavier!", S("Mango is heavier.", ["m", "🥭", 30, 56, 3, "pulse"], ["g", "🍇", 70, 30, 3], OK("heavier goes down"))),
      SS("The grape side goes up. It is lighter.", S("Grape is lighter.", ["m", "🥭", 30, 56, 3], ["g", "🍇", 70, 30, 3, "pulse"], OK("lighter goes up")))),
    SAY("Look at these scales. The rice bag is in one pan. A one kilogram weight is in the other. The heavier side goes down.", D_SCALES),
    CHK(mc("On a balance, which side goes down?", "The heavier side", ["The lighter side", "The left side"], { hint: "Heavy pulls down.", why: "The heavier side goes down.", tag: "capmass.balance" })),
    HB("Stop 2: Grams and kilograms", "classroom"),
    SAY("We measure mass in grams and kilograms. A raisin is about one gram. A bunch of bananas is about one kilogram. One kilogram is one thousand grams.",
      T("A **gram** is tiny, about a raisin.", "A **kilogram** is big, about a bunch of bananas. 1 kg = 1000 g.")),
    EXPP("Grams and kilograms",
      SS("A raisin is one gram. A paper clip is one gram too.", S("About 1 gram.", ["r", "🍇", 50, 46, 3, "none", "1 g"])),
      SS("A bag of rice is one kilogram. It is much heavier!", S("1 kilogram.", ["r", "🍚", 50, 46, 3, "pulse", "1 kg"])),
      SS("One thousand grams make one kilogram.", S("1000 g = 1 kg.", ["r", "🍚", 50, 46, 3], OK("1 kg = 1000 g")))),
    SAY("Flip the cards and find the matching pairs. A little brain break!", BRAIN("memory_match", "Kitchen match", "Find the matching pairs.", ["🥭", "🍚", "🥛", "🍋", "🥕", "🍞"])),
    CHK(num("How many grams are in 1 kilogram?", 1000, { hint: "A thousand.", why: "1 kg is 1000 g.", tag: "capmass.kg_g" })),
    SAY("Remember. Mass is how heavy. Grams are small. Kilograms are big. Big things are not always heavy.", SUM("Heavier side goes down", "Grams are small, kilograms are big", "Big does not mean heavy")),
    GLOSS({ mass: "How heavy something is.", balance: "Scales with two pans.", gram: "A tiny unit of mass.", kilogram: "A big unit of mass. 1000 grams.", scale: "A tool with numbers to read." }),
  ],
  mini: [
    mc("Which is lighter?", "A feather", ["A brick", "A bag of rice"], { hint: "Which floats?", why: "A feather is very light." }),
    mc("Which unit is best for a bag of rice?", "kilograms", ["grams", "millilitres"], { hint: "It is big.", why: "A bag of rice is measured in kilograms." }),
    tf("A raisin is about 1 gram.", true, { hint: "It is tiny.", why: "A raisin is about 1 gram." }),
    num("2 kilograms is how many grams?", 2000, { hint: "2 × 1000.", why: "2 kg is 2000 g." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const kitchen = {
  id: "kitchen", kind: "use", title: "Kitchen and market",
  blocks: [
    HB("Stop 1: A bag of rice", "town"),
    SAY("At the shop in Lahore, Zara buys a bag of rice. It says five kilograms. The needle on the scale shows how heavy it is.",
      T("A **scale** has numbers to read.", "Read where the needle or water stops.")),
    EXPP("Read the scale",
      SS("The scale goes from zero to ten kilograms.", S("0 to 10 kg.", ["s", "⚖️", 50, 46, 3, "none", "0 to 10 kg"])),
      SS("The needle is halfway. Halfway between zero and ten is five.", S("Halfway = 5.", ["s", "⚖️", 50, 46, 3, "pulse", "5 kg"])),
      SS("The rice is five kilograms. Read the needle, not the bag!", S("5 kg of rice.", ["r", "🍚", 50, 46, 3, "none", "5 kg"], OK("5 kg")))),
    CHK(num("Zara buys 2 kg of rice and 3 kg of flour. How many kilograms in all?", 5, { hint: "Add the two masses.", why: "2 + 3 = 5 kilograms.", tag: "capmass.combine" })),
    HB("Stop 2: The lemonade jug", "home"),
    SAY("Aunty Noor makes lemonade. She uses two hundred and fifty millilitres of lemon juice. She adds seven hundred and fifty millilitres of water.",
      T("**Altogether** means add the amounts.", "250 ml + 750 ml = 1000 ml, or 1 litre.")),
    EXPP("Lemonade",
      SS("Pour in the lemon juice. Two hundred fifty millilitres.", S("250 ml.", ["l", "🍋", 30, 46, 3, "none", "250 ml"], ["j", "🫙", 70, 46, 3])),
      SS("Now add water. Seven hundred fifty millilitres.", S("+ 750 ml.", ["w", "💧", 30, 46, 3, "none", "750 ml"], ["j", "🫙", 70, 46, 3, "pulse"])),
      SS("That makes one thousand millilitres. A full litre jug!", S("1000 ml = 1 litre.", ["j", "🫙", 50, 46, 3, "pulse"], OK("1 litre")))),
    REVEAL("Which is heavier: a kilogram of feathers or a kilogram of rice? Have a think first.", "They are the same. Both are one kilogram. The feathers just take up more space."),
    CHK(num("A jug has 600 millilitres of water. Zara adds 400 millilitres. How many millilitres now?", 1000, { hint: "600 + 400.", why: "600 + 400 = 1000 millilitres.", tag: "capmass.word_cap" })),
    SAY("Remember. Read the scale where the needle stops. Add amounts with the same unit. Choose a sensible container.", SUM("Read the scale carefully", "Add amounts with the same unit", "Pick the right unit for the job")),
    GLOSS({ scale: "A tool with numbers to read.", altogether: "In all, so we add.", recipe: "Instructions for making food.", needle: "The pointer on a dial." }),
  ],
  mini: [
    num("A recipe uses 300 ml of milk and 200 ml of water. How many millilitres altogether?", 500, { hint: "Add them.", why: "300 + 200 = 500 ml." }),
    num("A bag of sugar is 1 kg. How many bags make 4 kg?", 4, { hint: "1 + 1 + 1 + 1.", why: "4 bags of 1 kg make 4 kg." }),
    mc("Which unit is best for a big bucket of water?", "litres", ["millilitres", "grams"], { hint: "It is a lot of liquid.", why: "A bucket holds many litres." }),
    tf("500 g is half a kilogram.", true, { hint: "Half of 1000.", why: "500 + 500 = 1000 g." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "The tall jug and the wide jug", backdrop: "home", caption: "A baker finds out the tall jug does not hold more.",
  scenes: [
    { caption: "A small bakery.", say: "Baker Imran has a small shop. Today he makes milk bread.",
      items: [{ id: "b", emoji: "👨‍🍳", label: "Imran", x: 30, y: 56, size: 3, enter: "walk_right" }, { id: "o", emoji: "🍞", x: 70, y: 40, size: 3, enter: "pop" }] },
    { caption: "Weigh the flour.", say: "First he weighs the flour. One kilogram is one thousand grams.",
      items: [{ id: "s", emoji: "⚖️", label: "balance", x: 35, y: 46, size: 3, enter: "grow" }, { id: "f", emoji: "🌾", label: "1 kg", x: 70, y: 46, size: 3, enter: "slide_left" }] },
    { caption: "The heavier side goes down.", say: "The heavier side goes down. When they match, it is just right.",
      items: [{ id: "s", emoji: "⚖️", x: 50, y: 46, size: 3, effect: "glow" }] },
    { caption: "Two jugs of milk.", say: "Now the milk. Imran has a tall jug and a wide jug.",
      items: [{ id: "a", emoji: "🥛", label: "tall", x: 30, y: 46, size: 3, enter: "pop" }, { id: "w", emoji: "🫙", label: "wide", x: 70, y: 46, size: 3, enter: "pop" }] },
    { caption: "Which holds more?", say: "Which one holds more? It looks like the tall one!",
      items: [{ id: "a", emoji: "🥛", label: "tall", x: 30, y: 46, size: 3, anim: "bounce" }, { id: "w", emoji: "🫙", label: "wide", x: 70, y: 46, size: 3 }] },
    { caption: "Pour the tall into the wide.", say: "Imran pours the tall jug into the wide jug.",
      camera: { zoom: 1.2, x: 50, y: 46 },
      items: [{ id: "a", emoji: "🥛", x: 30, y: 36, size: 3, path: "arc" }, { id: "w", emoji: "🫙", x: 70, y: 52, size: 3, effect: "sparkle" }] },
    { caption: "Both hold 1 litre.", say: "It fits exactly! Both jugs hold one litre.",
      items: [{ id: "a", emoji: "🥛", label: "1 litre", x: 30, y: 46, size: 3 }, { id: "w", emoji: "🫙", label: "1 litre", x: 70, y: 46, size: 3, effect: "glow" }] },
    { caption: "Check, do not guess!", say: "Shape can fool our eyes. Always measure. Shukriya, Imran!",
      items: [{ id: "b", emoji: "👨‍🍳", x: 30, y: 56, size: 3, anim: "bounce" }, { id: "o", emoji: "🍞", x: 70, y: 40, size: 3, effect: "hearts" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });

const quiz = [
  // ----- learn (q1-q8)
  Q(mc("Which word means how much liquid a jug can hold when it is full?", "capacity", ["mass", "height"], { hint: "It is the most it can hold.", why: "Capacity is how much a container can hold.", tag: "capmass.capacity" }), "hold", "recall",
    [mc("Which word means the most a bucket can hold?", "capacity", ["mass", "width"], { hint: "It is the most it can hold.", why: "Capacity is how much a container can hold.", tag: "capmass.capacity" })]),
  Q(tf("A teaspoon of medicine is measured in millilitres.", true, { hint: "It is a very small amount.", why: "Tiny amounts of liquid use millilitres.", tag: "capmass.unit_sense" }), "hold", "recall",
    [tf("A bath of water is best measured in millilitres.", false, { hint: "A bath holds a lot.", why: "A bath holds lots of water, so litres are better.", tag: "capmass.unit_sense" })]),
  Q(mc("Sam says the tall bottle must hold more than the short wide bottle. Is he right?", "No. You must measure, because a tall bottle can hold the same or less", ["Yes, tall always holds more", "Yes, because it is thinner"], { hint: "Think of the tall jug and wide jug.", why: "Height alone does not tell capacity. A short wide bottle can hold the same.", tag: "capmass.reason_tall" }), "hold", "reason",
    [mc("Mina says the tall glass must hold more than the wide bowl. Is she right?", "No. You must measure, because a tall glass can hold less", ["Yes, tall always holds more", "Yes, because it is higher"], { hint: "Think of a wide bowl.", why: "Height alone does not tell capacity. A wide bowl often holds more.", tag: "capmass.reason_tall" })]),
  Q(sld("Slide to how many millilitres are in 1 litre.", { min: 0, max: 2000 }, 1000, 0, { hint: "A thousand.", why: "1 litre is 1000 millilitres.", tag: "capmass.litre_ml" }), "hold", "apply",
    [sld("Slide to how many millilitres are in half a litre.", { min: 0, max: 2000 }, 500, 0, { hint: "Half of 1000.", why: "Half of 1000 is 500 millilitres.", tag: "capmass.litre_ml" })]),
  Q(hot("Tap the jug that is half full.", [["🫙", "empty", 22, 50], ["🫙", "half full", 50, 50], ["🫙", "full", 78, 50]], ["half full"], { labels: true, hint: "Not empty, not full.", why: "Half full is in the middle.", tag: "capmass.full_half" }), "hold", "apply",
    [hot("Tap the jug that is full.", [["🫙", "empty", 22, 50], ["🫙", "half full", 50, 50], ["🫙", "full", 78, 50]], ["full"], { labels: true, hint: "Water to the top.", why: "Full means it holds as much as it can.", tag: "capmass.full_half" })]),
  Q(mc("Ali says volume and capacity always mean the same thing. Is he right?", "No. Capacity is the most a container can hold. Volume is how much is in it now", ["Yes, they are the same", "No, volume is always bigger"], { hint: "A half full jug has a volume and a capacity.", why: "Capacity is the most a container holds. Volume is the amount inside it now.", tag: "capmass.reason_vol_cap" }), "hold", "reason",
    [mc("Ben says the capacity of a 1 litre jug changes when you pour some out. Is he right?", "No. The capacity stays 1 litre. Only the volume changes", ["Yes, the capacity goes down", "Yes, the capacity goes up"], { hint: "Is the jug itself different?", why: "The jug is the same, so its capacity is the same. The volume in it changes.", tag: "capmass.reason_vol_cap" })]),
  Q(mat("Match each container to what it can hold.", [["Teaspoon", "5 millilitres"], ["Large juice carton", "1 litre"], ["Small glass", "200 millilitres"]], { hint: "Teaspoon is tiny, carton is large.", why: "A teaspoon is about 5 ml, a big carton is 1 litre and a small glass is about 200 ml.", tag: "capmass.object_unit" }), "hold", "apply",
    [mat("Join each container to what it can hold.", [["Raindrop", "1 millilitre"], ["Big water bottle", "2 litres"], ["Small cup", "100 millilitres"]], { hint: "Think small to large.", why: "A raindrop is about 1 ml, a big bottle is 2 litres and a small cup is about 100 ml.", tag: "capmass.object_unit" })]),
  Q(ord("Put these in order of what they can hold, smallest first.", ["Teaspoon", "Mug", "Jug", "Bucket"], { hint: "Think of how much water each holds.", why: "A teaspoon holds least, then a mug, a jug and a bucket holds most.", tag: "capmass.order_cap" }), "hold", "apply",
    [ord("Order these by what they can hold, smallest first.", ["Spoon", "Cup", "Water bottle", "Bath"], { hint: "Think of how much water each holds.", why: "A spoon holds least, then a cup, a bottle and a bath holds most.", tag: "capmass.order_cap" })]),

  // ----- try (q9-q16)
  Q(num("A jug holds 1 litre. A cup holds 250 millilitres. How many cups fill the jug?", 4, { hint: "Count up in 250s to 1000.", why: "250, 500, 750, 1000 is 4 cups.", tag: "capmass.cups_fill" }), "pour", "apply",
    [num("A big jug holds 1 litre. A small glass holds 200 millilitres. How many glasses fill it?", 5, { hint: "Count up in 200s to 1000.", why: "200, 400, 600, 800, 1000 is 5 glasses.", tag: "capmass.cups_fill" })]),
  Q(mc("Which holds more: a 2 litre bottle or a 500 millilitre bottle?", "The 2 litre bottle", ["The 500 millilitre bottle", "They hold the same"], { hint: "2 litres is 2000 ml.", why: "2000 ml is more than 500 ml.", tag: "capmass.compare_cap" }), "pour", "apply",
    [mc("Which holds more: a 1 litre jug or a 750 millilitre jug?", "The 1 litre jug", ["The 750 millilitre jug", "They hold the same"], { hint: "1 litre is 1000 ml.", why: "1000 ml is more than 750 ml.", tag: "capmass.compare_cap" })]),
  Q(fill("Complete the measures.", "1 litre is {b1} millilitres. Half a litre is {b2} millilitres.", [["1000", "100", "10"], ["500", "50", "250"]], { hint: "Half of 1000.", why: "1 litre is 1000 ml and half is 500 ml.", tag: "capmass.litre_ml" }), "pour", "apply",
    [fill("Finish the measures.", "2 litres is {b1} millilitres. A quarter of a litre is {b2} millilitres.", [["2000", "200", "1000"], ["250", "25", "400"]], { hint: "A quarter of 1000.", why: "2 litres is 2000 ml and a quarter litre is 250 ml.", tag: "capmass.litre_ml2" })]),
  Q(mc("Layla says 1 litre of juice and 1 litre of water have different capacities. Is she right?", "No. A litre is a litre. Both are the same amount", ["Yes, juice is bigger", "Yes, water is bigger"], { hint: "A litre is a fixed amount.", why: "A litre is always the same amount of liquid, whatever the liquid is.", tag: "capmass.reason_same_litre" }), "pour", "reason",
    [mc("Ben says 1 litre of milk is more liquid than 1 litre of water. Is he right?", "No. A litre is a litre. Both are the same amount", ["Yes, milk is bigger", "Yes, water is bigger"], { hint: "A litre is a fixed amount.", why: "A litre is always the same amount of liquid, whatever the liquid is.", tag: "capmass.reason_same_litre" })]),
  Q(hot("Tap the jug that has water at 500 millilitres.", [["🫗", "level at 250 ml", 22, 50], ["🫗", "level at 500 ml", 50, 50], ["🫗", "level at 750 ml", 78, 50]], ["level at 500 ml"], { labels: true, hint: "500 is half of 1000.", why: "500 ml is halfway up a 1 litre jug.", tag: "capmass.tap_level" }), "pour", "apply",
    [hot("Tap the jug that has water at 250 millilitres.", [["🫗", "level at 250 ml", 22, 50], ["🫗", "level at 500 ml", 50, 50], ["🫗", "level at 750 ml", 78, 50]], ["level at 250 ml"], { labels: true, hint: "250 is a quarter of 1000.", why: "250 ml is one quarter of the way up a 1 litre jug.", tag: "capmass.tap_level" })]),
  Q(sld("The jug scale goes up in 100s. The water is at the 7th mark. Slide to the reading.", { min: 0, max: 1000 }, 700, 0, { hint: "7 marks of 100.", why: "7 × 100 = 700 millilitres.", tag: "capmass.scale_marks" }), "pour", "apply",
    [sld("The jug scale goes up in 100s. The water is at the 4th mark. Slide to the reading.", { min: 0, max: 1000 }, 400, 0, { hint: "4 marks of 100.", why: "4 × 100 = 400 millilitres.", tag: "capmass.scale_marks" })]),
  Q(ord("Put these amounts in order, smallest first.", ["200 ml", "500 ml", "1 litre"], { hint: "1 litre is 1000 ml.", why: "200 is less than 500, and 1 litre is 1000 ml.", tag: "capmass.order_vol" }), "pour", "apply",
    [ord("Order these amounts, smallest first.", ["100 ml", "750 ml", "2 litres"], { hint: "2 litres is 2000 ml.", why: "100 is less than 750, and 2 litres is 2000 ml.", tag: "capmass.order_vol" })]),
  Q(mc("Mira says a spoon of medicine is measured in litres. Is she right?", "No. A spoon holds a tiny amount, so we use millilitres", ["Yes, always litres", "No, we use kilograms"], { hint: "Is a spoon big or small?", why: "Tiny amounts are measured in millilitres. Litres are for bigger amounts.", tag: "capmass.reason_unit" }), "pour", "reason",
    [mc("Ben says a bucket of water is best measured in millilitres. Is he right?", "No. A bucket holds a lot, so we use litres", ["Yes, always millilitres", "No, we use grams"], { hint: "Is a bucket big or small?", why: "Big amounts are measured in litres. Millilitres are for tiny amounts.", tag: "capmass.reason_unit" })]),

  // ----- play (q17-q23)
  Q(mc("Which is heavier: a laptop or a raisin?", "A laptop", ["A raisin", "They have the same mass"], { hint: "One is about 1 kg, one about 1 g.", why: "A laptop is about 1 kg. A raisin is about 1 g.", tag: "capmass.heavier" }), "heavy", "apply",
    [mc("Which is lighter: a paper clip or a bunch of bananas?", "A paper clip", ["A bunch of bananas", "They have the same mass"], { hint: "One is about 1 g, one about 1 kg.", why: "A paper clip is about 1 g. A bunch of bananas is about 1 kg.", tag: "capmass.heavier" })]),
  Q(mc("Aisha says the bigger box is always heavier. Is she right?", "No. A big box of feathers can be lighter than a small box of stones", ["Yes, big is always heavy", "Yes, because it is wider"], { hint: "Think of feathers and stones.", why: "Size does not tell mass. Light things can take up lots of space.", tag: "capmass.reason_big_heavy" }), "heavy", "reason",
    [mc("Ben says the bigger balloon is heavier than a small stone. Is he right?", "No. A big balloon is full of air, so it is lighter than the stone", ["Yes, big is always heavy", "Yes, because it floats"], { hint: "Which one would you carry more easily?", why: "A balloon is big but very light. A stone is small but heavier.", tag: "capmass.reason_big_heavy" })]),
  Q(mc("Zainab says a balance leans down on the lighter side. Is she right?", "No. The heavier side goes down", ["Yes, the lighter side goes down", "No, it stays flat"], { hint: "Heavy pulls down.", why: "The heavier side goes down and the lighter side goes up.", tag: "capmass.reason_balance" }), "heavy", "reason",
    [mc("Ben says the higher side of a balance is the heavier side. Is he right?", "No. The heavier side goes down, so the higher side is lighter", ["Yes, the high side is heavier", "No, both sides are equal"], { hint: "Which way does heavy go?", why: "The heavier side goes down. The higher side is the lighter one.", tag: "capmass.reason_balance" })]),
  Q(mat("Match each thing to its mass.", [["Paper clip", "about 1 gram"], ["Bunch of bananas", "about 1 kilogram"], ["Apple", "about 150 grams"]], { hint: "Small things are in grams.", why: "A paper clip is about 1 g, bananas about 1 kg and an apple about 150 g.", tag: "capmass.mass_match" }), "heavy", "apply",
    [mat("Join each thing to its mass.", [["Raisin", "about 1 gram"], ["Bag of sugar", "about 1 kilogram"], ["Orange", "about 200 grams"]], { hint: "Small things are in grams.", why: "A raisin is about 1 g, a bag of sugar 1 kg and an orange about 200 g.", tag: "capmass.mass_match" })]),
  Q(ord("Put these in order of mass, lightest first.", ["Paper clip", "Mango", "Bag of rice", "Bicycle"], { hint: "Think about lifting each one.", why: "A paper clip is lightest, then a mango, a bag of rice and a bicycle is heaviest.", tag: "capmass.order_mass" }), "heavy", "apply",
    [ord("Order these by mass, lightest first.", ["Feather", "Orange", "Bag of flour", "Sofa"], { hint: "Think about lifting each one.", why: "A feather is lightest, then an orange, a bag of flour and a sofa is heaviest.", tag: "capmass.order_mass" })]),
  Q(mc("Omar says 2 kilograms is lighter than 500 grams. Is he right?", "No. 2 kilograms is 2000 grams, which is more than 500 grams", ["Yes, 2 is less than 500", "No, they are the same"], { hint: "Change kilograms to grams.", why: "2 kg is 2000 g. 2000 is more than 500.", tag: "capmass.reason_kg_g" }), "heavy", "reason",
    [mc("Ben says 1 kilogram is lighter than 800 grams. Is he right?", "No. 1 kilogram is 1000 grams, which is more than 800 grams", ["Yes, 1 is less than 800", "No, they are the same"], { hint: "Change kilograms to grams.", why: "1 kg is 1000 g. 1000 is more than 800.", tag: "capmass.reason_kg_g" })]),
  Q(sld("The needle is halfway between 0 and 10 kilograms. Slide to the reading.", { min: 0, max: 10 }, 5, 0, { hint: "Half of 10.", why: "Halfway between 0 and 10 is 5 kg.", tag: "capmass.dial" }), "heavy", "apply",
    [sld("The needle is halfway between 0 and 20 kilograms. Slide to the reading.", { min: 0, max: 20 }, 10, 0, { hint: "Half of 20.", why: "Halfway between 0 and 20 is 10 kg.", tag: "capmass.dial" })]),

  // ----- use (q24-q30)
  Q(num("A lemonade recipe uses 250 millilitres of lemon juice and 750 millilitres of water. How many millilitres is that in all?", 1000, { hint: "Add 250 and 750.", why: "250 + 750 = 1000 millilitres, which is 1 litre.", tag: "capmass.recipe" }), "kitchen", "apply",
    [num("A drink uses 200 millilitres of syrup and 800 millilitres of water. How many millilitres is that in all?", 1000, { hint: "Add 200 and 800.", why: "200 + 800 = 1000 millilitres, which is 1 litre.", tag: "capmass.recipe" })]),
  Q(fill("Add the masses.", "2 kg + 3 kg = {b1} kg, so 5 kg - 3 kg = {b2} kg.", [["5", "6", "1"], ["2", "3", "8"]], { hint: "Add, then take away.", why: "2 + 3 = 5 and 5 - 3 = 2.", tag: "capmass.combine" }), "kitchen", "apply",
    [fill("Work out the masses.", "4 kg + 3 kg = {b1} kg, so 7 kg - 4 kg = {b2} kg.", [["7", "12", "1"], ["3", "4", "11"]], { hint: "Add, then take away.", why: "4 + 3 = 7 and 7 - 4 = 3.", tag: "capmass.combine" })]),
  Q(num("A bag of atta is 5 kilograms. A bag of rice is 2 kilograms. How many kilograms heavier is the atta?", 3, { hint: "Take away 2 from 5.", why: "5 - 2 = 3, so the atta is 3 kg heavier.", tag: "capmass.difference" }), "kitchen", "apply",
    [num("A sack of flour is 9 kilograms. A sack of sugar is 4 kilograms. How many kilograms heavier is the flour?", 5, { hint: "Take away 4 from 9.", why: "9 - 4 = 5, so the flour is 5 kg heavier.", tag: "capmass.difference" })]),
  Q(ms("Which two containers are best for 5 litres of water? Pick two.", ["A bucket", "A bath"], ["A teaspoon", "An egg cup"], { hint: "5 litres is a lot.", why: "A bucket and a bath hold lots of water. A teaspoon and an egg cup are too small.", tag: "capmass.choose_container" }), "kitchen", "apply",
    [ms("Which two containers are best for 5 millilitres of syrup? Pick two.", ["A teaspoon", "A small spoon"], ["A bucket", "A bath"], { hint: "5 millilitres is tiny.", why: "A teaspoon and a small spoon hold tiny amounts. A bucket and a bath are far too big.", tag: "capmass.choose_container" })]),
  Q(mc("Hamza says to read a jug you look at the number at the top of the jug, not where the water reaches. Is he right?", "No. You read the number where the top of the water reaches", ["Yes, always read the top number", "No, read the bottom number"], { hint: "Where does the water stop?", why: "The reading is where the water level reaches on the scale.", tag: "capmass.reason_read_scale" }), "kitchen", "reason",
    [mc("Ben says to read a jug you look at the number at the bottom, not where the water reaches. Is he right?", "No. You read the number where the top of the water reaches", ["Yes, always read the bottom number", "No, read the top number of the jug"], { hint: "Where does the water stop?", why: "The reading is where the water level reaches on the scale.", tag: "capmass.reason_read_scale" })]),
  Q(tf("1 kilogram is the same as 1000 grams.", true, { hint: "A thousand.", why: "1 kg is 1000 g.", tag: "capmass.kg_g" }), "kitchen", "recall",
    [tf("1 litre is the same as 100 millilitres.", false, { hint: "A thousand.", why: "1 litre is 1000 millilitres, not 100.", tag: "capmass.litre_ml" })]),
  Q(ms("Which two things are best measured in kilograms? Pick two.", ["A bag of rice", "A bunch of bananas"], ["A raisin", "A paper clip"], { hint: "Kilograms are for heavier things.", why: "Rice and bananas are about a kilogram. A raisin and a paper clip are about a gram.", tag: "capmass.choose_unit" }), "kitchen", "apply",
    [ms("Which two things are best measured in litres? Pick two.", ["A bucket of water", "A large juice carton"], ["A teaspoon of honey", "A raindrop"], { hint: "Litres are for larger amounts.", why: "A bucket and a juice carton hold litres. A teaspoon and a raindrop hold millilitres.", tag: "capmass.choose_unit" })]),
];

export const topics = [
  topicLesson({
    slug: "maths-class-1-capacity-mass", subject: "maths", cls: 1, topic: 12, title: "Capacity, Mass and Volume",
    summary: "Measure how much a container holds and how heavy things are, using litres, millilitres, grams and kilograms.",
    unit: "Topic 12: Capacity, mass and volume", difficulty: 2,
    objectives: ["Measure and compare capacity", "Measure and compare mass", "Read scales and choose the right unit"],
    success_criteria: ["I can say how much a container holds in litres or millilitres", "I can say how heavy something is in grams or kilograms", "I can read a scale and choose a sensible unit"],
    real_life: "Pouring lemonade, buying a bag of rice at the shop, or baking with Aunty Noor.",
    standards: [
      { framework: "nc_england", code: "Y2 measure", text: "Choose and use appropriate standard units to estimate and measure mass (kg/g) and capacity (litres/ml) to the nearest appropriate unit, using scales and measuring vessels; compare and order" },
      { framework: "cambridge", code: "2Mm.01" }, { framework: "cambridge", code: "2Mm.02" },
    ],
    warm_up: [
      mc("Which is bigger?", "A bucket", ["A cup", "A spoon"], { hint: "Think about the sizes.", why: "A bucket is the biggest." }),
      num("What is 500 + 500?", 1000, { hint: "5 hundreds and 5 hundreds.", why: "500 + 500 = 1000." }),
      tf("A feather is lighter than a brick.", true, { hint: "Which one would you lift easily?", why: "A feather is very light." }),
    ],
    intro: [],
    subs: [hold, pour, heavy, kitchen],
    clip,
    quiz,
  }),
];
