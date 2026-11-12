import { SAY, SS, H, T, PHOTO, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld, st } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC } from "./_science-kit.mjs";

// Science Class 1, topic 11: Rocks and soil (Zainab, age 7).
const PEBBLES = "science-class-1-rocks-soil-1-4dd8c260.jpg";
const SPROUT = "science-class-1-rocks-soil-2-d0511079.jpg";
const STREAM = "science-class-1-rocks-soil-3-e10c0f83.jpg";

// ---------------------------------------------------------------------------------------------- 1. learn
const rock = {
  id: "rock", kind: "learn", title: "What is rock?",
  blocks: [
    H("Welcome back, young scientist!"),
    SAY("Today we look at rocks and soil. What are they, and what do we use them for?", T("Today's big question: what are rocks and soil?")),
    SAY("These pebbles come from a beach. Look at their colours and shapes.", PHOTO(PEBBLES, "A close-up of many smooth grey, blue and orange pebbles on a beach", "Pebbles are small, smooth rocks. The sea rubs them smooth over many years.", "Photo by Jan Kraus on Unsplash")),
    H("Stop 1: Natural rock"),
    SAY("Rock is a hard material from the ground. It is natural, not made by people.", T("**Rock** is a natural material from the Earth.")),
    EB("mountain", "Natural or made?",
      SS("A mountain is made of rock. People did not make it.", S("Natural rock.", ["m", "⛰️", 50, 56, 3])),
      SS("A boulder is a very big rock. A pebble is a small one.", S("Boulder and pebble.", ["b", "🪨", 30, 62, 3], ["p", "🪨", 72, 68, 2])),
      SS("A brick is made by people. They bake clay in a hot oven.", S("Man-made.", ["b", "🧱", 50, 62, 3]))),
    CHK(mc("Which one is a natural rock?", "A pebble from a river", ["A brick", "A concrete block"], { hint: "Which one did people not make?", why: "A pebble is natural. Bricks and concrete are made by people.", tag: "rock.chk1" })),
    H("Stop 2: Hard and soft"),
    SAY("Rocks are not all the same. Granite is very hard. Chalk is soft.", T("Some rocks are **hard** and some are **soft**.")),
    EB("mountain", "Different rocks",
      SS("Granite is hard. It is used for strong buildings and worktops.", S("Granite.", ["g", "🪨", 50, 62, 3])),
      SS("Chalk is soft. You can write on a board with it.", S("Chalk.", ["c", "🖍️", 50, 62, 3, "pulse"])),
      SS("Sand is tiny pieces of rock. Each grain was once part of a bigger rock.", S("Sand.", ["s", "🏖️", 50, 58, 3]))),
    CHK(tf("Chalk is a soft rock.", true, { hint: "Think about writing on a board.", why: "Chalk is a soft rock that rubs off easily.", tag: "rock.chk2" })),
    SAY("Let us remember. Rock is natural. Some rocks are hard and some are soft.", SUM("Rock is natural, not man-made", "Pebbles, boulders and sand are rock", "Rocks can be hard or soft")),
    GLOSS({ rock: "A hard natural material that comes from the Earth.", hard: "Not easy to scratch or break.", soft: "Easy to scratch or rub away.", pebble: "A small, smooth stone.", boulder: "A very big rock.", granite: "A very hard rock with sparkly grains.", chalk: "A soft white rock." }),
  ],
  mini: [
    mc("What is a pebble?", "A small smooth stone", ["A kind of plant", "A piece of plastic"], { hint: "You find them on beaches.", why: "A pebble is a small, smooth stone." }),
    tf("People make bricks.", true, { hint: "Clay is baked.", why: "Bricks are made from clay, so they are man-made." }),
    mc("Which rock is soft?", "Chalk", ["Granite", "A boulder"], { hint: "You can write with it.", why: "Chalk is a soft rock." }),
    mc("What is sand made of?", "Tiny bits of rock", ["Tiny bits of plastic", "Tiny seeds"], { hint: "Think about a beach.", why: "Sand is made of tiny pieces of rock." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const detective = {
  id: "detective", kind: "try", title: "Rock detectives",
  blocks: [
    H("Stop 1: Look and feel"),
    SAY("Scientists look closely at rocks. They use their eyes and hands.", T("A **rock detective** looks, feels and tests.")),
    EB("classroom", "Rock tests",
      SS("Look with a magnifier. You may see tiny grains and sparkles.", S("Look.", ["m", "🔍", 30, 58, 3], ["r", "🪨", 72, 64, 3])),
      SS("Feel the rock. Is it rough or smooth? Is it heavy or light?", S("Feel.", ["h", "✋", 30, 58, 3], ["r", "🪨", 72, 64, 3])),
      SS("Scratch it with a coin. A soft rock leaves a scratch.", S("Scratch.", ["c", "🪙", 30, 58, 3], ["r", "🪨", 72, 64, 3]))),
    CHK(mc("Which test tells you if a rock is hard or soft?", "Scratch it", ["Look at it", "Weigh it"], { hint: "A coin helps.", why: "A soft rock gets scratched by a coin.", tag: "detective.chk1" })),
    H("Stop 2: Sorting rocks"),
    SAY("Detectives sort rocks into groups. They can sort by colour or by feel.", T("Sorting helps us compare.")),
    SAY("This mountain stream is full of rocks. Some are big and some are small.", PHOTO(STREAM, "A shallow stream running between large grey boulders and smaller stones in a mountain valley", "Water moves rocks along a stream. Over time it breaks them into smaller pieces.", "Photo by christie greene on Unsplash")),
    SAY("Now sort the stones. Are they rough or smooth?", MAN("Rough or smooth?", "Move each stone. Bumpy ones go in Rough. Sea-worn ones go in Smooth.", "🪨", 8, ["Rough", "Smooth"])),
    ACT("Stone sort", ["Six stones from outside", "A magnifier", "Paper and pencil", "A grown-up to help"], ["Look at each stone with the magnifier.", "Sort the stones by colour or by how they feel.", "Draw your groups and name each one."]),
    CHK(tf("In a fair test we use the same coin for every rock.", true, { hint: "A fair test changes only one thing.", why: "Using the same coin makes the test fair.", tag: "detective.chk2" })),
    SAY("Let us remember. We look, feel and test rocks. We keep tests fair.", SUM("Look closely with a magnifier", "Feel for rough, smooth, heavy and light", "A coin scratch test finds hard and soft")),
    GLOSS({ "rock detective": "A scientist who looks closely at rocks.", rough: "Bumpy, not smooth.", smooth: "Even, with no bumps.", magnifier: "A glass that makes small things look bigger.", scratch: "A thin mark made by rubbing something sharp.", "fair test": "A test where we change only one thing." }),
  ],
  mini: [
    mc("What do you use to see tiny grains in a rock?", "A magnifier", ["A drum", "A ruler"], { hint: "It makes things look bigger.", why: "A magnifier shows tiny grains." }),
    tf("A soft rock is scratched by a coin.", true, { hint: "Soft things scratch easily.", why: "A coin leaves a scratch on a soft rock." }),
    mc("Which word describes a bumpy rock?", "Rough", ["Smooth", "Liquid"], { hint: "It does not feel even.", why: "A bumpy rock feels rough." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const soil = {
  id: "soil", kind: "play", title: "Soil and sand",
  blocks: [
    H("Stop 1: What is soil made of?"),
    SAY("Soil covers much of the ground. It is full of tiny bits of rock and old plants.", T("**Soil** is made of tiny rock pieces and rotted plants.")),
    SAY("This little plant is growing in dark soil. Its roots are hidden below.", PHOTO(SPROUT, "A young nasturtium plant with round green leaves growing from dark soil", "Soil gives a plant water and food, and holds its roots in place.", "Photo by Elly M on Unsplash")),
    EB("farm", "What is in soil?",
      SS("Sand is gritty and drains fast. Water runs straight through it.", S("Sand.", ["s", "🏖️", 50, 58, 3])),
      SS("Clay is sticky when wet. It holds a lot of water.", S("Clay.", ["c", "🟤", 50, 60, 3])),
      SS("Humus is dark and crumbly. It comes from rotted leaves and roots.", S("Humus.", ["h", "🍂", 40, 58, 3], ["w", "🪱", 72, 66, 2, "bounce"]))),
    CHK(mc("What is soil mostly made from?", "Tiny bits of rock and rotted plants", ["Plastic and glass", "Only sand"], { hint: "Think about what is under a garden.", why: "Soil is bits of rock and rotted plants and animals.", tag: "soil.chk1" })),
    H("Stop 2: Soil in water"),
    SAY("Put soil in a jar of water. Shake it, then leave it still.", T("Soil **settles** into layers.")),
    EB("lab", "Soil layers",
      SS("The heavy stones sink first. They sit at the bottom.", S("Stones.", ["j", "🫙", 50, 58, 3], ["s", "🪨", 50, 76, 1])),
      SS("Sand settles on top of the stones. Then comes the clay.", S("Sand then clay.", ["j", "🫙", 50, 58, 3], ["s", "🏖️", 50, 70, 1])),
      SS("Bits of old plants float near the top. The water stays cloudy.", S("Floating bits.", ["j", "🫙", 50, 58, 3], ["p", "🍂", 50, 44, 1, "float"]))),
    SAY("Warm up your memory. Watch the soil jar fill up, then copy the order.", BRAIN("remember_order", "Soil layers", "Watch the order, then copy it. It gets longer each time!", ["🪨", "🏖️", "🟤", "🍂"])),
    CHK(ord("Put the soil layers in order, from the bottom up.", ["Stones", "Sand", "Clay"], { hint: "Heavy things sink first.", why: "Stones sink first, then sand, then clay.", tag: "soil.chk2" })),
    SAY("Let us remember. Soil is rock pieces and rotted plants. It settles into layers.", SUM("Soil is rock pieces and rotted plants", "Sand, clay and humus are parts of soil", "Soil settles into layers in water")),
    GLOSS({ soil: "The top layer of the ground where plants grow.", sand: "Tiny grains of rock.", clay: "Sticky soil that holds water.", humus: "Dark, crumbly bits of rotted plants and animals.", settles: "Sinks slowly to the bottom and stays there.", layers: "Flat parts lying on top of each other." }),
  ],
  mini: [
    mc("Which part of soil is dark and crumbly?", "Humus", ["Sand", "Stones"], { hint: "It comes from rotted leaves.", why: "Humus is dark and crumbly." }),
    tf("Water runs fast through sand.", true, { hint: "Sand is gritty.", why: "Sand drains quickly." }),
    mc("Which animal helps make soil healthy?", "A worm", ["A fish", "A bird"], { hint: "It tunnels.", why: "Worms mix the soil and pull leaves down." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const uses = {
  id: "uses", kind: "use", title: "Rocks and soil in life",
  blocks: [
    H("Stop 1: Using rock"),
    SAY("People have used rock for thousands of years. It is strong and lasts a long time.", T("Rock is **useful**.")),
    SAY("In Pakistan, workers mine rock salt at Khewra. It goes into our food.", T("Khewra salt comes from rock under the ground.")),
    SAY("In Yorkshire, in the UK, farmers build walls from stone. Slate makes roofs.", T("Stone walls and slate roofs last a long time.")),
    EB("town", "Rock at work",
      SS("Gravel makes a path. Small stones are packed hard.", S("Gravel path.", ["g", "🪨", 30, 66, 2], ["p", "🛤️", 70, 62, 3])),
      SS("Slate and marble make roofs and floors. They are strong.", S("Slate and marble.", ["r", "🏠", 50, 56, 3])),
      SS("Rock is ground up and used to make cement for buildings.", S("Cement.", ["b", "🏗️", 50, 56, 3]))),
    CHK(ms("Pick two things made using rock.", ["A stone wall", "A gravel path"], ["A wool jumper", "A paper bag"], { hint: "Think about building.", why: "Walls and paths use rock.", tag: "uses.chk1" })),
    H("Stop 2: Growing food in soil"),
    SAY("Farmers plant seeds in soil. Roots take in water and food from it.", T("Plants need soil to grow.")),
    SAY("In Pakistan, wheat and sarson grow in fields of rich soil.", T("Good soil grows good crops.")),
    SAY("Digging helps. Loose soil lets roots and water move down easily.", T("Digging loosens the soil.")),
    SAY("We look after soil. We add compost and never dump rubbish in it.", T("Care for the soil.")),
    EB("farm", "Soil and crops",
      SS("A farmer digs the soil. It becomes loose and crumbly.", S("Digging.", ["f", "🧑‍🌾", 30, 58, 3], ["s", "🟤", 70, 66, 2])),
      SS("Seeds go in the soil. Roots grow down and leaves grow up.", S("Planting.", ["s", "🌱", 50, 58, 3, "grow"])),
      SS("The crop grows tall. Soil gave it water and food.", S("Crop.", ["w", "🌾", 50, 56, 3, "float"]))),
    ACT("Soil jar", ["A clear jar", "Garden soil", "Water", "A grown-up to help"], ["Fill the jar a third full of soil.", "Add water, shake and leave it still.", "Draw the layers you see after an hour."]),
    CHK(tf("Rock salt can come from under the ground in Pakistan.", true, { hint: "Think of the Khewra mine.", why: "Rock salt is mined at Khewra in Pakistan.", tag: "uses.chk2" })),
    SAY("Let us remember. Rock builds things. Soil grows our food. We look after both.", SUM("We use rock for walls, roofs and paths", "Plants get water and food from soil", "We must look after soil")),
    GLOSS({ useful: "Helpful for a job.", gravel: "Small broken pieces of rock.", slate: "A grey rock that splits into flat sheets.", compost: "Rotted leaves and food scraps that feed the soil.", crop: "A plant that farmers grow for food.", cement: "A grey powder that sets hard when wet." }),
  ],
  mini: [
    mc("Which rock makes a roof tile?", "Slate", ["Chalk", "Sand"], { hint: "It splits into flat sheets.", why: "Slate makes roof tiles." }),
    tf("Plants take water from soil.", true, { hint: "Think about roots.", why: "Roots take in water from the soil." }),
    mc("What should we add to soil to look after it?", "Compost", ["Plastic", "Glass"], { hint: "It is rotted leaves.", why: "Compost feeds the soil." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Pip the pebble", backdrop: "mountain", caption: "A pebble tells how she travelled from a mountain to a beach.",
  scenes: [
    { caption: "On the mountain.", say: "I am Pip. I was once part of a huge mountain rock.",
      items: [{ id: "m", emoji: "⛰️", x: 40, y: 56, size: 3 }, { id: "p", emoji: "🪨", label: "Pip", x: 75, y: 66, size: 2, enter: "pop" }] },
    { caption: "A crack.", say: "Frost made a crack. A piece of me broke off.",
      items: [{ id: "c", emoji: "❄️", x: 30, y: 36, size: 2, anim: "pulse" }, { id: "p", emoji: "🪨", x: 65, y: 66, size: 2 }] },
    { caption: "The stream.", say: "A stream carried me down. I bumped into other stones.",
      items: [{ id: "w", emoji: "🌊", x: 40, y: 62, size: 3 }, { id: "p", emoji: "🪨", x: 70, y: 66, size: 2, anim: "float" }] },
    { caption: "Smooth.", say: "The water rubbed my edges. I became round and smooth.",
      items: [{ id: "p", emoji: "🪨", x: 50, y: 62, size: 3, anim: "grow" }] },
    { caption: "Soil.", say: "I passed a field. The soil there was dark and crumbly.",
      items: [{ id: "s", emoji: "🟤", x: 35, y: 66, size: 3 }, { id: "w", emoji: "🪱", x: 72, y: 66, size: 2, anim: "bounce" }] },
    { caption: "Sand.", say: "Many of my friends were crushed into tiny grains of sand.",
      items: [{ id: "s", emoji: "🏖️", x: 50, y: 60, size: 3, effect: "sparkle" }] },
    { caption: "The beach.", say: "At last I reached the sea. Waves roll me back and forth.",
      items: [{ id: "w", emoji: "🌊", x: 30, y: 62, size: 3 }, { id: "p", emoji: "🪨", x: 72, y: 66, size: 2, anim: "float" }] },
    { caption: "Found!", say: "A child picks me up. I am a beautiful, smooth pebble.",
      items: [{ id: "c", emoji: "🧒", x: 35, y: 58, size: 3 }, { id: "p", emoji: "🪨", x: 72, y: 62, size: 2, effect: "sparkle" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- rock (q1-q8)
  Q("rock", "apply", "rocks.natural_mc", mc("Which of these is natural?", "A boulder on a hill", ["A clay brick", "A concrete path"], { hint: "People did not make it.", why: "A boulder is natural. Bricks and concrete are man-made." }),
    mc("Which of these is man-made?", "A clay brick", ["A boulder on a hill", "A pebble on a beach"], { hint: "Someone baked it.", why: "People make bricks from clay." })),
  Q("rock", "apply", "rocks.made_match", mat("Match each thing to natural or man-made.", [["Pebble", "Natural"], ["Brick", "Man-made"], ["Mountain boulder", "Natural"]], { hint: "Who made it?", why: "Pebbles and boulders are natural. Bricks are made by people." }),
    mat("Join each thing to natural or man-made.", [["Concrete", "Man-made"], ["Slate from a hillside", "Natural"], ["Clay roof tile", "Man-made"]], { hint: "Who made it?", why: "Slate is natural. Concrete and clay tiles are made by people." })),
  Q("rock", "reason", "rocks.brick_rock", mc("Sam says a brick is a rock. Is he right?", "No, people make bricks from clay", ["Yes, a brick is a natural rock", "Yes, bricks grow in the ground"], { hint: "Where do bricks come from?", why: "Bricks are made by people, so they are not natural rock." }),
    mc("Ali says concrete is a rock. Is he right?", "No, concrete is made by mixing cement, sand and water", ["Yes, concrete is a natural rock", "Yes, concrete falls from the sky"], { hint: "Who mixes concrete?", why: "Concrete is man-made, not natural rock." })),
  Q("rock", "recall", "rocks.pebble_st", st("What do we call small smooth stones on a beach or in a river?", ["pebbles", "pebble"], { hint: "It starts with p.", why: "Small smooth stones are pebbles." }),
    st("What do we call the tiny grains on a beach or in a desert?", ["sand"], { hint: "You can pour it.", why: "Tiny grains of rock are sand." })),
  Q("rock", "reason", "rocks.all_hard", mc("Aisha says all rocks are hard. Is she right?", "No, chalk is a soft rock", ["Yes, every rock is very hard", "Yes, rocks never break"], { hint: "Think about writing on a board.", why: "Chalk is soft and rubs off." }),
    mc("Hana says every rock is as hard as granite. Is she right?", "No, some rocks are soft and crumble", ["Yes, all rocks are hard", "Yes, granite is the softest"], { hint: "Think about chalk.", why: "Some rocks, like chalk, are soft." })),
  Q("rock", "apply", "rocks.chalk_tf", tf("Chalk is one of the soft rocks.", true, { hint: "You can write with it.", why: "Chalk is a soft rock." }),
    tf("Granite is a soft rock that crumbles in your hand.", false, { hint: "Is granite strong?", why: "Granite is very hard." })),
  Q("rock", "apply", "rocks.size_ord", ord("Put these in order, from smallest to biggest.", ["Grain of sand", "Pebble", "Boulder"], { hint: "Start with the tiniest.", why: "A grain of sand is smallest and a boulder is biggest." }),
    ord("Arrange these, from smallest to biggest.", ["Pebble", "Boulder", "Mountain"], { hint: "Start with the smallest.", why: "A pebble is smallest and a mountain is biggest." })),
  Q("rock", "apply", "rocks.natural_tap", hot("Tap the natural rock.", [["🪨", "Boulder", 22, 50], ["🧱", "Brick", 50, 50], ["🏺", "Clay pot", 78, 50]], ["Boulder"], { labels: true, hint: "People did not make it.", why: "A boulder is natural." }),
    hot("Tap the thing made by people.", [["🪨", "Boulder", 22, 50], ["🧱", "Brick", 50, 50], ["⛰️", "Mountain", 78, 50]], ["Brick"], { labels: true, hint: "Someone baked it.", why: "A brick is man-made." })),
  // ----- detective (q9-q16)
  Q("detective", "apply", "rocks.test_match", mat("Match each test to what it tells you.", [["Look with a magnifier", "Tiny grains"], ["Feel with your fingers", "Rough or smooth"], ["Scratch with a coin", "Hard or soft"]], { hint: "Think about each test.", why: "A magnifier shows grains, fingers feel the surface and a coin tests hardness." }),
    mat("Join each question to the best test.", [["Is it hard?", "Scratch it"], ["Is it rough?", "Feel it"], ["Does it have sparkles?", "Look closely"]], { hint: "Think about each sense.", why: "We scratch to test hardness, feel for roughness and look for sparkles." })),
  Q("detective", "reason", "rocks.heavy_hard", mc("Omar says heavy rocks are hard. Is he right?", "No, a heavy rock can still be soft", ["Yes, heavy always means hard", "Yes, light rocks are always soft"], { hint: "Weight and hardness are different.", why: "How heavy a rock is does not tell us how hard it is." }),
    mc("Zainab says a light rock must be soft. Is she right?", "No, a light rock can still be hard", ["Yes, light always means soft", "Yes, light rocks are made of air"], { hint: "Test it with a scratch.", why: "Weight does not tell us hardness. We scratch to find out." })),
  Q("detective", "apply", "rocks.describe_ms", ms("Which two words describe how a rock feels? Pick two.", ["Rough", "Smooth"], ["Loud", "Sweet"], { hint: "Think about touching.", why: "Rough and smooth describe touch." }),
    ms("Which two words can describe a rock? Pick two.", ["Hard", "Shiny"], ["Noisy", "Tasty"], { hint: "Think about looking and touching.", why: "Hard and shiny describe rocks." })),
  Q("detective", "apply", "rocks.coin_fill", fill("Finish the sentences about a scratch test.", "A rock that a coin scratches is {b1}. A rock it cannot scratch is {b2}.", [["soft", "hard", "wet"], ["hard", "soft", "warm"]], { hint: "Think about a coin on chalk.", why: "A coin scratches a soft rock but not a hard one." }),
    fill("Finish the sentences about pebbles.", "Pebbles on a beach are {b1} because the sea {b2} them.", [["smooth", "sharp", "sticky"], ["rubs", "freezes", "paints"]], { hint: "Think about waves.", why: "Waves rub pebbles smooth." })),
  Q("detective", "reason", "rocks.press_harder", mc("Hamza says we should press harder on a soft rock in a scratch test. Is he right?", "No, we use the same push for every rock", ["Yes, we press harder on soft rocks", "Yes, we change the coin each time"], { hint: "Think about a fair test.", why: "A fair test keeps everything the same." }),
    mc("Layla says a fair test uses a different coin for every rock. Is she right?", "No, we use the same coin each time", ["Yes, a new coin is fairer", "Yes, coins do not matter"], { hint: "Change only one thing.", why: "A fair test changes only the rock." })),
  Q("detective", "apply", "rocks.rough_sld", sld("Zainab sorts 12 stones. 5 are smooth. Slide to show how many are rough.", { min: 0, max: 15, unit: "stones" }, 7, 0, { hint: "12 take away 5.", why: "12 - 5 = 7 stones." }),
    sld("Bilal sorts 15 stones. 6 are smooth. Slide to show how many are rough.", { min: 0, max: 18, unit: "stones" }, 9, 0, { hint: "15 take away 6.", why: "15 - 6 = 9 stones." })),
  Q("detective", "recall", "rocks.tool_st", st("What do we call a person who looks closely and tests things to find out?", ["scientist", "a scientist"], { hint: "It starts with s.", why: "A scientist looks and tests." }),
    st("What tool makes small things look bigger?", ["magnifier", "magnifying glass", "a magnifying glass", "hand lens"], { hint: "It starts with m.", why: "A magnifier makes small things look bigger." })),
  Q("detective", "recall", "rocks.pebble_num", num("A tray has 10 pebbles. 6 are grey. How many are not grey?", 4, { hint: "10 take away 6.", why: "10 - 6 = 4 pebbles." }),
    num("A tray has 9 pebbles. 4 are white. How many are not white?", 5, { hint: "9 take away 4.", why: "9 - 4 = 5 pebbles." })),
  // ----- soil (q17-q23)
  Q("soil", "reason", "rocks.soil_only_rock", mc("Sana says soil is only tiny pieces of rock. Is she right?", "No, soil also has rotted plants and animals", ["Yes, soil is only rock", "Yes, soil is only water"], { hint: "Think about humus.", why: "Soil has rock pieces and rotted plants and animals." }),
    mc("Bilal says soil has no dead plants in it. Is he right?", "No, rotted plants make the dark humus in soil", ["Yes, soil never has plants in it", "Yes, only sand is in soil"], { hint: "Think about humus.", why: "Rotted plants are part of soil." })),
  Q("soil", "reason", "rocks.just_dirt", mc("Layla says soil is just dirt. Is she right?", "No, soil is a home for worms and feeds plants", ["Yes, soil is useless", "Yes, soil has nothing in it"], { hint: "Think about what grows in it.", why: "Soil feeds plants and shelters animals." }),
    mc("Hamza says all soils are the same. Is he right?", "No, sandy soil drains fast and clay holds water", ["Yes, every soil is the same", "Yes, soil is always black"], { hint: "Think about sand and clay.", why: "Soils differ in what they hold and how they drain." })),
  Q("soil", "apply", "rocks.layers_ord", ord("After shaking, the layers settle. Put them in order from the bottom.", ["Stones", "Sand", "Clay", "Water"], { hint: "Heavy things sink first.", why: "Stones, then sand, then clay, then water on top." }),
    ord("Put the soil jar layers in order, from the bottom up.", ["Sand", "Clay", "Floating bits of plants"], { hint: "Light bits float.", why: "Sand is lowest, then clay and the light bits are on top." })),
  Q("soil", "reason", "rocks.make_soil", mc("Zainab says plants make soil from nothing. Is she right?", "No, soil forms slowly from rock pieces and dead plants", ["Yes, plants make soil overnight", "Yes, soil needs no rock"], { hint: "Think about what soil is made from.", why: "Soil takes a very long time to form." }),
    mc("Mira says soil is made in a day. Is she right?", "No, soil takes many years to form", ["Yes, it is quick", "Yes, a single rainstorm makes it"], { hint: "Think about how slowly rock breaks.", why: "Soil forms very slowly." })),
  Q("soil", "apply", "rocks.water_tap", hot("Tap the soil that holds the most water.", [["🏖️", "Sandy soil", 22, 50], ["🟤", "Clay soil", 50, 50], ["🪨", "Dry gravel", 78, 50]], ["Clay soil"], { labels: true, hint: "It is sticky.", why: "Clay holds a lot of water." }),
    hot("Tap the soil that lets water drain fastest.", [["🏖️", "Sandy soil", 22, 50], ["🟤", "Clay soil", 50, 50], ["🍂", "Humus", 78, 50]], ["Sandy soil"], { labels: true, hint: "It is gritty.", why: "Water runs quickly through sand." })),
  Q("soil", "apply", "rocks.part_match", mat("Match each part of soil to what it is like.", [["Sand", "Gritty and drains fast"], ["Clay", "Sticky when wet"], ["Humus", "Dark and crumbly"]], { hint: "Think about each feel.", why: "Sand is gritty, clay is sticky and humus is dark and crumbly." }),
    mat("Join each helper to its job.", [["Worms", "Mix the soil"], ["Roots", "Hold the soil together"], ["Dead leaves", "Rot to make humus"]], { hint: "Think about what each does.", why: "Worms mix, roots hold and leaves rot to make humus." })),
  Q("soil", "apply", "rocks.worm_tf", tf("Worms help make soil healthy.", true, { hint: "They pull leaves down.", why: "Worms mix soil and pull leaves down." }),
    tf("Soil is the same colour everywhere.", false, { hint: "Think about different gardens.", why: "Soil can be dark, red, brown or pale." })),
  // ----- uses (q24-q30)
  Q("uses", "reason", "rocks.rock_mountains", mc("Mira says rock only comes from mountains. Is she right?", "No, there is rock under the ground, in rivers and on beaches", ["Yes, only mountains have rock", "Yes, rock only grows on hills"], { hint: "Think of pebbles.", why: "Rock is found almost everywhere." }),
    mc("Ali says sand is not a rock. Is he right?", "No, sand is tiny pieces of rock", ["Yes, sand is a plant", "Yes, sand is made of plastic"], { hint: "Think about grains.", why: "Sand is made of tiny pieces of rock." })),
  Q("uses", "apply", "rocks.rock_made_ms", ms("Which two things are made using rock? Pick two.", ["A marble floor", "A gravel path"], ["A plastic cup", "A cotton shirt"], { hint: "Think about stone and paths.", why: "Marble and gravel are rock." }),
    ms("Which two use stone? Pick two.", ["A stone wall", "A slate roof"], ["A paper bag", "A wooden spoon"], { hint: "Think about buildings.", why: "Walls and roofs can be made of stone." })),
  Q("uses", "apply", "rocks.plant_fill", fill("Finish the sentences about plants.", "Roots take {b1} and {b2} from the soil.", [["water", "paint", "sand"], ["food", "glass", "plastic"]], { hint: "Think about what plants need.", why: "Roots take water and food from soil." }),
    fill("Finish the sentences about Pakistan.", "Rock salt is mined at {b1} in {b2}.", [["Khewra", "Mars", "Oxford"], ["Pakistan", "Spain", "Peru"]], { hint: "Think of the salt mine.", why: "Rock salt is mined at Khewra in Pakistan." })),
  Q("uses", "apply", "rocks.slate_tf", tf("Slate is a rock that people use for roofs.", true, { hint: "It splits into flat sheets.", why: "Slate makes roofs in the UK." }),
    tf("Slate roof tiles are made from plastic.", false, { hint: "Slate is natural.", why: "Slate is a natural rock." })),
  Q("uses", "recall", "rocks.wall_num", num("A builder puts 6 stones in each row. She builds 3 rows. How many stones is that?", 18, { hint: "6 + 6 + 6.", why: "6 + 6 + 6 = 18 stones." }),
    num("A path has 4 stones in each row. There are 5 rows. How many stones is that?", 20, { hint: "4 + 4 + 4 + 4 + 4.", why: "5 rows of 4 make 20 stones." })),
  Q("uses", "recall", "rocks.use_st", st("What do we call the dark crumbly ground where plants grow?", ["soil"], { hint: "It starts with s.", why: "Plants grow in soil." }),
    st("What do we call small broken pieces of rock used to make paths?", ["gravel"], { hint: "It starts with g.", why: "Small broken rock is gravel." })),
  Q("uses", "apply", "rocks.dig_sld", sld("A garden bed needs 10 spades of soil. Hamza has dug 4. Slide to show how many are left.", { min: 0, max: 12, unit: "spades" }, 6, 0, { hint: "10 take away 4.", why: "10 - 4 = 6 spades." }),
    sld("A flower bed needs 12 spades of soil. Aisha has dug 5. Slide to show how many are left.", { min: 0, max: 14, unit: "spades" }, 7, 0, { hint: "12 take away 5.", why: "12 - 5 = 7 spades." })),
];

export const topics = [
  topicLesson({
    slug: "science-class-1-rocks-soil", subject: "science", cls: 1, topic: 11, title: "Rocks and Soil",
    summary: "Rocks, pebbles and soil: what they look like, feel like and are used for.",
    unit: "Topic 11: Rocks and soil", difficulty: 1,
    objectives: ["Describe rocks and soil", "Say what rocks and soil are used for", "Explain why soil matters for plants"],
    success_criteria: ["I can say what a rock is like", "I can name some uses of rock and soil", "I can say why plants need soil"],
    real_life: "Khewra rock salt in Pakistan, stone walls and slate roofs in Yorkshire, clay pots and mud houses, and sand dunes in Cholistan.",
    standards: [NC("Y3 rocks and soils", "Compare and group together different kinds of rocks on the basis of their appearance and simple physical properties; recognise that soils are made from rocks and organic matter")],
    warm_up: [
      mc("Which one is a natural rock?", "A pebble", ["A brick", "A plastic toy"], { hint: "People did not make it.", why: "A pebble is a natural rock." }),
      tf("Plants grow in soil.", true, { hint: "Think about a garden.", why: "Plants grow in soil." }),
      mc("What is sand made of?", "Tiny bits of rock", ["Tiny seeds", "Tiny shells of plastic"], { hint: "Think about a beach.", why: "Sand is tiny pieces of rock." }),
    ],
    intro: [],
    subs: [rock, detective, soil, uses],
    clip,
    quiz,
  }),
];
