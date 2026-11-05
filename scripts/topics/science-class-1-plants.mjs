import { SAY, SS, H, T, IMG, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld, st } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC, PK, CAM } from "./_science-kit.mjs";

// Science Class 1, topic 3: Plants (Zainab, age 7). Enquiry type: comparative test (grow cress).

const parts = {
  id: "parts", kind: "learn", title: "Parts of a plant",
  blocks: [
    H("Stop 1: Roots, stem, leaves and flower"),
    SAY("A plant has four main parts, and each has a job. The roots grow down in the soil. They hold the plant still and drink up water. The stem holds the plant up and carries water to every part. The leaves catch sunlight to make food. And the flower makes seeds. Let's look at each part.", T("A plant has **roots**, a **stem**, **leaves** and a **flower**.", "Each part has a job.")),
    EB("meadow", "Parts of a plant",
      SS("The roots are under the soil. They drink water and hold the plant steady.", S("Roots drink water.", ["p", { kind: "plant", highlight: "roots" }, 50, 52, 3, "none"])),
      SS("The stem holds the plant up. Water travels up inside it, like a straw.", S("The stem holds the plant up.", ["p", { kind: "plant", highlight: "stem" }, 50, 52, 3, "none"])),
      SS("The leaves are green. They catch sunlight, and the plant uses it to make food.", S("Leaves catch light.", ["p", { kind: "plant", highlight: "leaf" }, 50, 52, 3, "none"])),
      SS("The flower makes seeds, so that new plants can grow.", S("The flower makes seeds.", ["p", { kind: "plant", highlight: "flower" }, 50, 52, 3, "none"]))),
    CHK(mc("Which part of a plant drinks water from the soil?", "Roots", ["Leaves", "Flower"], { hint: "It grows down in the soil.", why: "Roots take in water from the soil." })),
    H("Stop 2: Trees and flowers"),
    SAY("Trees have all the same parts, only bigger. The trunk is the tree's stem, and it is very thick and strong. Plants come in many shapes: tall trees, little daisies and juicy fruit trees, like the mango and the date palm.", IMG("🌳 🌼 🌴", "A tree, a daisy and a date palm.")),
    SAY("Trees are plants too. Their trunk is just a thick, woody stem.", T("A tree's **trunk** is its big, strong stem.")),
    CHK(tf("A tree is a plant.", true, { hint: "It has roots, a stem and leaves.", why: "Trees are plants with a very thick stem called a trunk." })),
    SAY("Remember. Roots drink and hold, the stem holds up, leaves catch light and the flower makes seeds.", SUM("Roots take in water and hold the plant", "The stem holds the plant up", "Leaves catch sunlight to make food", "The flower makes seeds")),
    GLOSS({ roots: "The part of a plant under the soil. It drinks water.", stem: "The part that holds a plant up.", leaves: "The green parts that catch sunlight.", flower: "The part that makes seeds.", trunk: "The thick, woody stem of a tree." }),
  ],
  mini: [
    mat("Match each plant part to its job.", [["Roots", "Drink water"], ["Stem", "Holds the plant up"], ["Leaves", "Catch sunlight"]], { hint: "Think about where each part is.", why: "Roots drink, the stem holds up and leaves catch light." }),
    mc("What does the flower make?", "Seeds", ["Soil", "Water"], { hint: "New plants start from them.", why: "A flower makes seeds." }),
    hot("Tap the roots.", [["🌸", "Flower", 50, 20], ["🍃", "Leaves", 50, 45], ["🌱", "Roots", 50, 75]], ["Roots"], { labels: true, hint: "They are under the ground.", why: "Roots grow down in the soil." }),
  ],
};

const cress = {
  id: "cress", kind: "try", title: "Grow cress",
  blocks: [
    H("Stop 1: Seeds and bulbs"),
    SAY("Many plants start as a seed. A seed is like a tiny package with a baby plant inside. Some plants start from a bulb instead, like a tulip or an onion. A bulb is a lump with food stored inside it. Both need water and warmth to start to grow. When a seed begins to grow, we say it germinates. Let's watch it.", T("A **seed** has a baby plant inside.", "A **bulb** stores food to grow a new plant.", "When a seed starts to grow, it **germinates**.")),
    EB("home", "A seed grows",
      SS("A tiny seed sits in the soil.", S("A seed.", ["s", "🌰", 50, 75, 2, "none"])),
      SS("Water and warmth wake it up. A root grows down.", S("The seed germinates.", ["s", "🌱", 50, 72, 2, "grow"], ["w", "💧", 25, 40, 2, "bounce"])),
      SS("A shoot pushes up towards the light.", S("A shoot grows up.", ["s", "🌱", 50, 62, 3, "grow"], ["l", "☀️", 80, 20, 2, "pulse"])),
      SS("Soon there are leaves, and a new plant has grown!", S("A new plant.", ["s", "🪴", 50, 60, 3, "grow"]))),
    CHK(mc("What does a seed need to start growing?", "Water and warmth", ["Sweets and toys", "Only a cold cupboard"], { hint: "Think about what you give a plant.", why: "Seeds need water and warmth to germinate." })),
    H("Stop 2: Our cress experiment"),
    SAY("Let's test what a plant needs. We plant cress seeds in three cups. Cup A has light and water. Cup B has water but is in the dark. Cup C has light but no water. Only one thing is different each time. That is called a fair test. Before you look at the cups, make a prediction. Which cup will grow best?", MAN("Plan the cress test", "Put each cup in the right place: Light and water, or No water.", "🥛", 6, ["Light and water", "Missing something"])),
    ACT("Grow your own cress", ["Cress seeds", "Cotton wool or kitchen paper", "Three cups or small trays", "Water", "A grown-up"], ["Wet the cotton wool in all three cups and sprinkle some seeds on each.", "Cup A: put it on a sunny windowsill and keep it damp.", "Cup B: put it in a dark cupboard. Cup C: put it on the windowsill but give it no water.", "Look every day for a week and draw what you see."]),
    CHK(mc("What is a fair test?", "Only one thing is changed", ["Everything is changed", "No seeds are used"], { hint: "Think about the three cups.", why: "In a fair test we change only one thing, so we know what made the difference." })),
    SAY("Remember. A seed holds a baby plant. It needs water and warmth to germinate. In a fair test, only one thing is changed.", SUM("Seeds and bulbs grow into new plants", "Seeds need water and warmth to germinate", "A fair test changes only one thing")),
    GLOSS({ seed: "A small package with a baby plant inside.", bulb: "A lump that stores food and grows into a plant, like an onion.", germinates: "Starts to grow from a seed.", "fair test": "A test where only one thing is changed.", prediction: "A guess about what will happen, made before we look." }),
  ],
  mini: [
    ord("Put the stages in order.", ["Seed", "Shoot", "New plant"], { hint: "It starts with a seed.", why: "A seed germinates, grows a shoot and becomes a plant." }),
    tf("A seed has a baby plant inside it.", true, { hint: "Seeds grow into plants.", why: "A seed contains a tiny baby plant." }),
    mc("In our cress test, which cup has no water?", "Cup C", ["Cup A", "Cup B"], { hint: "Read the plan again.", why: "Cup C had light but no water." }),
    ms("Pick two things seeds need to grow.", ["Water", "Warmth"], ["Loud music", "A toy"], { hint: "Think about the cress.", why: "Seeds need water and warmth." }),
  ],
};

const needs = {
  id: "needs", kind: "play", title: "What plants need",
  blocks: [
    H("Stop 1: Light, water and air"),
    SAY("Growing plants need water from the soil, light from the sun and air around their leaves. They also need room to grow. A plant makes its own food using light. That is why plants on a dark shelf turn pale and droop. Watch what happens to three plants.", T("Plants need **light**, water, air and space to grow.", "A plant without light turns pale and droops.")),
    EB("home", "Three cress cups",
      SS("Cup A had light and water. After a week, the cress is tall and green.", S("Cup A: light and water. Tall and green!", ["a", "🪴", 50, 60, 3, "grow"], ["l", "☀️", 80, 20, 2, "pulse"], ["w", "💧", 20, 30, 2, "bounce"])),
      SS("Cup B was in the dark. The cress is pale and yellow and floppy.", S("Cup B: dark. Pale and weak.", ["b", "🌾", 50, 66, 3, "none"])),
      SS("Cup C had light but no water. The cress is dry and brown.", S("Cup C: no water. Dry and brown.", ["c", "🍂", 50, 68, 3, "none"], ["l", "☀️", 80, 20, 2, "pulse"]))),
    CHK(mc("Which cup grew best?", "The one with light and water", ["The one in the dark", "The one with no water"], { hint: "Plants need both.", why: "Cress needs light and water to grow well." })),
    H("Stop 2: Brain game"),
    SAY("Warm up your memory with a plant game. Find the matching pairs.", BRAIN("memory_match", "Plant pairs", "Find the pairs.", ["🌱", "🌸", "🌳", "🌴"])),
    SAY("A plant is thirsty. Is it a good idea to put it in a dark cupboard? No. What would you do? Tap to find out.", REVEAL("What does a droopy plant need?", "Water, and a spot in the light!")),
    CHK(ms("Pick two things a plant needs.", ["Light", "Water"], ["Chocolate", "A blanket"], { hint: "Think about the cress cups.", why: "Plants need light and water." })),
    SAY("Remember. Plants need light, water, air and space.", SUM("Plants need light, water, air and space", "Without them, plants become weak")),
    GLOSS({ light: "What comes from the sun and helps plants make food.", droop: "To bend over because it is weak.", space: "Room to grow." }),
  ],
  mini: [
    mc("What happens to a plant with no water?", "It dries out", ["It grows taller", "It gets stronger"], { hint: "Think of Cup C.", why: "Without water a plant dries out and dies." }),
    tf("Plants need sunlight to make food.", true, { hint: "Leaves catch light.", why: "Plants use light to make food." }),
    fill("Finish the sentence.", "Plants need light and {b1} to {b2}.", [["water", "toys", "sand"], ["grow", "sing", "swim"]], { hint: "Think about a garden.", why: "Plants need light and water to grow." }),
  ],
};

const plantsUse = {
  id: "plants_use", kind: "use", title: "Plants around us",
  blocks: [
    H("Stop 1: Why plants matter"),
    SAY("Plants are everywhere and they help us in so many ways. We eat their fruits, seeds and roots. Wood from trees gives us furniture and paper. Plants make the air we breathe, and give animals food and shelter. Muslims are taught to care for nature and to plant trees, because planting a tree is a good deed. Look at plants in our lives.", T("We **eat** plants, build with them and need them for clean air.", "Planting a tree is a kind thing to do.")),
    SAY("Look at these. An apple, a carrot, wheat grains and wood. They all come from plants.", IMG("🍎 🥕 🌾 🪵", "Fruit, vegetables, grain and wood all come from plants.")),
    CHK(mc("Which of these comes from a plant?", "Bread", ["Plastic", "Glass"], { hint: "Bread is made from wheat.", why: "Bread is made from wheat, a plant." })),
    H("Stop 2: Plant detective"),
    SAY("Be a plant detective at home or in the park. Find a plant and look for its parts. Which is the roots? Which is the leaf? Does it have a flower or fruit? Draw what you see.", ACT("Plant detective", ["Paper and pencil", "A plant in a pot, garden or park", "A grown-up"], ["Find a plant and look closely.", "Draw it and label the stem, leaves and flower if it has one.", "Give it water if the soil is dry."])),
    SAY("Plants that grow near you in Pakistan or the UK might look different. A date palm grows in hot places, and a daffodil in cooler places. They are all plants with the same parts.", IMG("🌴 🌷", "A date palm and a tulip: different plants, same parts.")),
    CHK(tf("Plants help to give us food.", true, { hint: "Think about fruit and vegetables.", why: "Many foods, like fruit, rice and vegetables, come from plants." })),
    SAY("Remember. Plants give us food, wood and clean air. We look after them.", SUM("Plants give us food, wood and clean air", "We should look after plants")),
    GLOSS({ eat: "To take in food.", wood: "The hard material from a tree trunk." }),
  ],
  mini: [
    mc("Which of these foods comes from a plant?", "Rice", ["Milk", "Egg"], { hint: "It grows in a field.", why: "Rice is a grain that grows on a plant." }),
    tf("We should look after plants.", true, { hint: "What do they give us?", why: "Plants give us food and clean air, so we care for them." }),
    ms("Pick two things made from trees.", ["Paper", "Wooden table"], ["Plastic bag", "Glass cup"], { hint: "Trees give us wood.", why: "Paper and wooden furniture come from trees." }),
  ],
};

const ALTS = [
  [mc("Which part of a plant holds it up?", "Stem", ["Roots", "Seed"], { hint: "It is like a pole.", why: "The stem holds the plant up." }), mc("Which part of a plant catches sunlight?", "Leaves", ["Stem", "Roots"], { hint: "They are green.", why: "Leaves catch sunlight." })],
  [tf("The roots of a plant are above the ground.", false, { hint: "Where are roots?", why: "Roots grow down in the soil." }), tf("A plant's flower makes seeds.", true, { hint: "New plants start from seeds.", why: "Flowers make seeds so new plants can grow." })],
  [mat("Pair each part with its job.", [["Roots", "Drink water"], ["Leaves", "Catch light"], ["Flower", "Makes seeds"]], { hint: "Think about each job.", why: "Roots drink, leaves catch light and the flower makes seeds." }), mat("Link each plant part to what it does.", [["Stem", "Holds the plant up"], ["Roots", "Hold it in the soil"], ["Leaves", "Make food from light"]], { hint: "Think about each job.", why: "The stem holds up, roots hold in the soil and leaves make food." })],
  [ms("Which two things does a seed need to germinate?", ["Water", "Warmth"], ["Music", "Paper"], { hint: "Think about the cress.", why: "Seeds need water and warmth." }), ms("Which two do plants need to grow well?", ["Light", "Water"], ["Toys", "Sweets"], { hint: "Think about the cress cups.", why: "Plants need light and water." })],
  [hot("Tap the leaf.", [["🌸", "Flower", 50, 20], ["🍃", "Leaf", 50, 45], ["🌱", "Roots", 50, 75]], ["Leaf"], { labels: true, hint: "It is green and catches light.", why: "Leaves catch sunlight." }), hot("Tap the flower.", [["🌸", "Flower", 50, 20], ["🍃", "Leaf", 50, 45], ["🌱", "Roots", 50, 75]], ["Flower"], { labels: true, hint: "It makes seeds.", why: "The flower makes seeds." })],
  [st("What do we call the underground part of a plant that drinks water?", ["roots", "root"], { hint: "It starts with an r.", why: "Roots drink water from the soil." }), st("What is the thick stem of a tree called?", ["trunk", "the trunk"], { hint: "It starts with a t.", why: "A tree's thick stem is its trunk." })],
  [mc("Ali puts a cress cup in a dark cupboard. Why does the cress look pale?", "It has no light", ["It has too much water", "It is happy"], { hint: "What is missing?", why: "Plants need light to make food, so they look pale and weak in the dark." }), mc("Sara forgets to water her pot plant for a month. Why is it brown?", "It has no water", ["It has too much light", "It is sleepy"], { hint: "What is missing?", why: "Plants need water. Without it they dry out." })],
  [fill("Complete the sentence about seeds.", "A seed {b1} when it gets water and {b2}.", [["germinates", "flies", "sings"], ["warmth", "ice", "salt"]], { hint: "Think about how seeds start to grow.", why: "A seed germinates when it gets water and warmth." }), fill("Complete the sentence about plants.", "{b1} catch sunlight and {b2} drink water.", [["Leaves", "Seeds", "Stones"], ["roots", "flowers", "petals"]], { hint: "Think about plant parts.", why: "Leaves catch sunlight and roots drink water." })],
  [num("A plant has roots, a stem, leaves and a flower. How many main parts is that?", 4, { hint: "Count them.", why: "There are four main parts." }), num("How many cups were in our cress test?", 3, { hint: "A, B and C.", why: "There were three cups." })],
  [sld("About how many days did we watch the cress grow?", { min: 0, max: 14, unit: "days" }, 7, 1, { hint: "About one week.", why: "We watched for about a week." }), sld("A plant has 4 main parts. If a tulip has 1 flower, how many parts is that altogether?", { min: 0, max: 8, unit: "parts" }, 4, 0, { hint: "The flower is one of the four.", why: "The flower is one of the four main parts." })],
  [ord("Put these in order for growing a plant.", ["Seed", "Shoot", "Leaves"], { hint: "It starts with a seed.", why: "A seed grows a shoot and then leaves." }), ord("Order these, starting from the seed.", ["Seed", "Root", "Flower"], { hint: "It starts with a seed.", why: "A seed makes a root, then the plant grows a flower." })],
  [mc("Which test is fair?", "Same cress seeds, but one cup has light and one is in the dark", ["Different seeds in every cup", "Different cups, water and light for each"], { hint: "Change only one thing.", why: "A fair test changes just one thing, so we know what made the difference." }), mc("Which test is fair for finding out if cress needs water?", "Same seeds and light, one cup has water and one has none", ["Different seeds, one with water and one without", "Different light and water in each"], { hint: "Change only one thing.", why: "Only the water should be different." })],
  [mc("Noor says leaves are only for decoration. Why is she wrong?", "Leaves catch sunlight to make food", ["Leaves drink water", "Leaves hold the plant up"], { hint: "What do leaves catch?", why: "Leaves catch light so the plant can make food." }), mc("Hamza says a plant does not need a stem. Why is he wrong?", "The stem holds the plant up and carries water", ["The stem makes seeds", "The stem drinks water from the air"], { hint: "What does the stem do?", why: "The stem holds the plant up and carries water." })],
  [mc("Sam's cress had no light and looked pale. What would you advise?", "Put it in a sunny place and give it water", ["Put it in a darker cupboard", "Give it only sweets"], { hint: "What does it need?", why: "Plants need light and water to grow well." }), mc("Layla's plant is droopy and the soil is dry. What should she do?", "Give it water", ["Put it in the dark", "Take off all its leaves"], { hint: "What is missing?", why: "A droopy plant with dry soil needs water." })],
];

export const topics = [
  topicLesson({
    slug: "science-class-1-plants", subject: "science", cls: 1, topic: 3, title: "Plants",
    summary: "Parts of a plant, how seeds grow, a fair cress test, and what plants need.",
    unit: "Topic 3: Plants", difficulty: 1,
    objectives: ["Name the main parts of a plant and say what each does", "Say how a seed grows", "Say what plants need to grow", "Explain a fair test with cress"],
    success_criteria: ["I can name the parts of a plant", "I can say what a plant needs", "I can say how seeds grow", "I can say what makes a test fair"],
    real_life: "Growing cress on a windowsill, or helping to water plants at home.",
    standards: [NC("Y1 plants", "Identify and name the basic structure of common flowering plants, including trees"), NC("Y2 plants", "Observe and describe how seeds and bulbs grow into mature plants; find out what plants need to grow and stay healthy"), ...CAM("2TWSp.01", "2TWSp.02", "2TWSm.01", "2TWSm.02", "2TWSm.03")],
    warm_up: [
      mc("What do animals need to stay alive?", "Food, water, air and shelter", ["Only toys", "Only a bed"], { hint: "Four things.", why: "Animals need food, water, air and shelter." }),
      mc("Where would you find a camel?", "In a desert", ["In a pond", "In the sea"], { hint: "Camels like hot, dry places.", why: "Camels live in deserts." }),
      tf("A stone is a living thing.", false, { hint: "Does a stone grow?", why: "A stone was never alive." }),
    ],
    intro: [
      H("Welcome back, young scientist!"),
      SAY("Welcome back, young scientist! Today's big question is: what do plants need to grow? By the end, you will name the parts of a plant, watch a seed grow, and plan a fair test with cress. Let's go!", T("Today's big question: what do plants need to grow?", "We will grow cress and be plant detectives.")),
      IMG("🌱🌸🌳", "Plants come in all shapes and sizes."),
      GLOSS({ plants: "Living things that grow in soil and make their own food." }),
    ],
    subs: [parts, cress, needs, plantsUse],
    quiz: [
      Q("parts", "recall", "plants.parts", mc("Which plant part sucks up water from the ground?", "Roots", ["Leaves", "Flower"], { hint: "It is under the ground.", why: "Roots take in water from the soil." }), ...ALTS[0]),
      Q("parts", "recall", "plants.facts", tf("The leaves of a plant grow under the soil.", false, { hint: "Where do roots grow?", why: "Leaves are above the soil. Roots are under it." }), ...ALTS[1]),
      Q("parts", "apply", "plants.jobs", mat("Which job does each plant part do? Match them.", [["Stem", "Holds the plant up"], ["Roots", "Drink water"], ["Flower", "Makes seeds"]], { hint: "Think about each job.", why: "The stem holds up, roots drink and the flower makes seeds." }), ...ALTS[2]),
      Q("cress", "apply", "plants.seeds", ms("Pick two things that a seed needs to germinate.", ["Water", "Warmth"], ["Loud music", "A toy"], { hint: "Think about the cress.", why: "Seeds need water and warmth to germinate." }), ...ALTS[3]),
      Q("parts", "apply", "plants.label", hot("Tap the part of the plant that grows under the ground.", [["🌸", "Flower", 50, 20], ["🍃", "Leaves", 50, 45], ["🌱", "Roots", 50, 75]], ["Roots"], { labels: true, hint: "They are under the ground.", why: "Roots grow down in the soil." }), ...ALTS[4]),
      Q("parts", "recall", "plants.words", st("What is the part of a plant that holds it up?", ["stem", "the stem"], { hint: "It starts with an s.", why: "The stem holds the plant up." }), ...ALTS[5]),
      Q("needs", "reason", "plants.dark", mc("Hana puts a cress cup in a dark cupboard. Why does the cress look pale?", "It has no light", ["It has too much water", "It is happy"], { hint: "What is missing?", why: "Plants need light to make food, so they look pale and weak in the dark." }), ...ALTS[6]),
      Q("cress", "apply", "plants.fill", fill("Complete the sentence about cress.", "A seed {b1} when it gets {b2} and warmth.", [["germinates", "flies", "sings"], ["water", "ice", "salt"]], { hint: "Think about how seeds start to grow.", why: "A seed germinates when it gets water and warmth." }), ...ALTS[7]),
      Q("parts", "recall", "plants.count", num("A plant has roots, a stem, leaves and a flower. How many parts is that?", 4, { hint: "Count each one.", why: "There are four main parts." }), ...ALTS[8]),
      Q("needs", "apply", "plants.time", sld("About how many days should we watch our cress grow?", { min: 0, max: 14, unit: "days" }, 7, 1, { hint: "About one week.", why: "We watched for about a week." }), ...ALTS[9]),
      Q("cress", "apply", "plants.order", ord("Put these in order for how a plant grows.", ["Seed", "Shoot", "New plant"], { hint: "It starts with a seed.", why: "A seed grows a shoot and becomes a new plant." }), ...ALTS[10]),
      Q("cress", "reason", "plants.fair", mc("Which cress test is fair, to see if light matters?", "Same seeds and water, one cup in the light and one in the dark", ["Different seeds in every cup", "Different cups, water and light for each"], { hint: "Change only one thing.", why: "A fair test changes just one thing, so we know what made the difference." }), ...ALTS[11]),
      Q("parts", "reason", "plants.reason", mc("Tia says leaves are just for decoration. Why is she wrong?", "Leaves catch sunlight to make food", ["Leaves drink water", "Leaves hold the plant up"], { hint: "What do leaves catch?", why: "Leaves catch light so the plant can make food." }), ...ALTS[12]),
      Q("needs", "reason", "plants.advice", mc("Omar's cress had no light and looked pale. What would you advise?", "Put it in a sunny place and give it water", ["Put it in a darker cupboard", "Give it only sweets"], { hint: "What does it need?", why: "Plants need light and water to grow well." }), ...ALTS[13]),
      Q("plants_use", "recall", "plants.use", mc("Which food on this list is made from a plant?", "Bread", ["Milk", "Egg"], { hint: "It is made from wheat.", why: "Bread is made from wheat, a plant." }),
        mc("Which of these is the fruit of a tree?", "A mango", ["A sausage", "Cheese"], { hint: "It grows on a tree.", why: "A mango is the fruit of a tree." }),
        mc("Which of these things is made from a plant?", "A wooden spoon", ["A glass cup", "A plastic toy"], { hint: "Wood comes from trees.", why: "A wooden spoon is made from wood, which comes from trees." })),
    ],
  }),
];
