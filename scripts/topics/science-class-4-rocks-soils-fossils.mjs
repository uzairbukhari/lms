import { SAY, SS, H, T, IMG, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, PHOTO, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC, CAM } from "./_science-kit.mjs";

// Science Class 4, topic 9: Rocks, Fossils and Soils (age 9-10). Enquiry types: comparative and fair test, identifying and classifying.
const TRILO = "science-class-4-rocks-soils-fossils-1-decc4cdc.jpg";
const AMMO = "science-class-4-rocks-soils-fossils-2-ff0e7f62.jpg";
const SOIL = "science-class-4-rocks-soils-fossils-3-33b9efa4.jpg";

// ---------------------------------------------------------------------------------------------- 1. learn
const know = {
  id: "know", kind: "learn", title: "Know your rocks",
  blocks: [
    H("Welcome, young scientist!"),
    SAY("Welcome, young scientist! Today we sort rocks, find out how fossils form, and look at what soil is made of.", T("Today we explore **rocks**, fossils and soil.")),
    IMG("🪨🦴🌱", "Rocks, fossils and soil."),
    H("Stop 1: Rock or not rock?"),
    SAY("Rock is a natural material found in the Earth. People dig it from the ground in quarries.", T("**Rock** is a natural material found in the Earth.")),
    SAY("Brick, concrete and tarmac are not rock. People make them in factories. Rocks such as granite, chalk, slate, marble and sandstone are all natural.", T("Brick, concrete and tarmac are **human-made**.")),
    EB("lab", "Natural or human-made?",
      SS("Granite, chalk and slate come from the ground. They are natural rocks.", S("Natural rocks.", ["g", "🪨", 25, 55, 3, "none"], ["c", "⛰️", 55, 50, 3, "none"], ["s", "🪨", 80, 60, 3, "none"])),
      SS("Brick and tarmac are made by people. They are not rocks.", S("Human-made materials.", ["b", "🧱", 30, 55, 3, "none"], ["t", "🛣️", 70, 55, 3, "none"]))),
    CHK(mc("Which of these is a natural rock?", "Slate", ["Brick", "Concrete"], { hint: "Which comes from the ground?", why: "Slate is a natural rock. Brick and concrete are made by people." })),
    H("Stop 2: Properties of rocks"),
    SAY("We describe rocks by their properties. Some are hard and some are soft. A hard rock does not scratch easily.", T("A **hard** rock is difficult to scratch.")),
    SAY("Some rocks are permeable. They let water soak into them. Impermeable rocks do not.", T("A **permeable** rock lets water soak in.", "An **impermeable** rock does not.")),
    IMG("🪨💧", "Permeable rocks let water soak in."),
    CHK(tf("Granite is a hard rock that water does not soak into easily.", true, { hint: "Think of a granite worktop.", why: "Granite is hard and impermeable." })),
    SAY("Remember. Rock is natural. Brick and tarmac are not. We describe rocks by hardness and permeability.", SUM("Rock is a natural material", "Brick and tarmac are human-made", "Rocks can be hard or soft, permeable or not")),
    GLOSS({ rocks: "Natural solid materials found in the Earth.", rock: "A natural material found in the Earth.", "human-made": "Made by people, not found in nature.", hard: "Difficult to scratch.", permeable: "Lets water soak in.", impermeable: "Does not let water soak in." }),
  ],
  mini: [
    mc("Where do people dig rock from?", "A quarry", ["A factory", "A shop"], { hint: "A big hole in the ground.", why: "Rock is dug from quarries." }),
    tf("Tarmac is a natural rock.", false, { hint: "Who makes it?", why: "Tarmac is made by people." }),
    mat("Match each rock to a use.", [["Slate", "Roof tiles"], ["Marble", "Statues"], ["Granite", "Worktops"]], { hint: "Think of strong or smooth rocks.", why: "Slate is used on roofs, marble for statues and granite for worktops." }),
    mc("A rock soaks up water quickly. It is...", "permeable", ["impermeable", "human-made"], { hint: "Water gets in.", why: "Permeable rocks let water soak in." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const tests = {
  id: "tests", kind: "try", title: "Rock tests",
  blocks: [
    H("Stop 1: Hardness scratch test"),
    SAY("To test hardness, scratch one rock with another. The rock that leaves a scratch on the other is harder.", T("The **scratch test** shows which rock is harder.")),
    EB("lab", "The scratch test",
      SS("A scientist scratches chalk with a fingernail. Chalk is soft, so it leaves a mark.", S("Chalk scratches easily.", ["c", "⚪", 35, 55, 3, "none"], ["f", "☝️", 65, 45, 3, "pulse"])),
      SS("Granite does not scratch with a fingernail. Granite is hard.", S("Granite is hard.", ["g", "🪨", 35, 55, 3, "none"], ["f", "☝️", 65, 45, 3, "none"]))),
    CHK(mc("A rock leaves a scratch on another rock. What does this tell us?", "It is harder than the other rock", ["It is heavier", "It is warmer"], { hint: "The scratcher is harder.", why: "The harder rock scratches the softer one." })),
    H("Stop 2: Water drip test"),
    SAY("To test permeability, drip the same number of drops on each rock. Watch which rock soaks up water fastest.", T("Keep the number of drops the same for a **fair test**.")),
    MAN("Sort the rocks", "Sort the rocks into permeable and impermeable.", "🪨", 8, ["Permeable", "Impermeable"]),
    ACT("Drip test", ["Small pieces of rock such as chalk, granite and sandstone", "A pipette or spoon and water", "A tray"], ["Put each rock on a tray.", "Drip 5 drops on each rock.", "Watch how fast the water soaks in.", "Record which rocks are permeable."]),
    CHK(mc("Why should you use the same number of drops on each rock?", "To make it a fair test", ["To make the rocks wet", "To make it faster"], { hint: "Change only one thing.", why: "Using the same drops keeps the test fair." })),
    SAY("Remember. The scratch test shows hardness. The drip test shows permeability. Keep the test fair.", SUM("Scratch test shows hardness", "Drip test shows permeability", "Keep a test fair")),
    GLOSS({ "scratch test": "A test to see which rock is harder.", "fair test": "A test where only one thing changes.", pipette: "A small tube for dripping liquid.", predict: "To say what you think will happen." }),
  ],
  mini: [
    ord("Put the drip test in order.", ["Choose a rock", "Drip water on it", "Watch it soak in", "Record the result"], { hint: "Set up first.", why: "You choose, test, observe and record." }),
    tf("Chalk is harder than granite.", false, { hint: "Which is easier to scratch?", why: "Granite is harder than chalk." }),
    mc("Which rock would soak up the most water?", "Chalk", ["Granite", "Slate"], { hint: "It is a soft rock.", why: "Chalk is permeable." }),
    mc("Why do we record results in a table?", "To compare them easily", ["To make rocks harder", "To dry them"], { hint: "Think of organising.", why: "A table helps us compare results." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const fossils = {
  id: "fossils", kind: "play", title: "Time travel with fossils",
  blocks: [
    H("Stop 1: How fossils form"),
    SAY("A fossil is the remains or imprint of a living thing, preserved in rock. Fossils tell us about life from long ago.", T("A **fossil** is the remains or imprint of a living thing in rock.")),
    SAY("These fossils are ancient sea animals called trilobites. They were buried in mud, and over millions of years the mud turned to rock.", PHOTO(TRILO, "Fossils of ancient animals pressed into grey rock", "Trilobite fossils in rock.", "Photo by Wes Warren on Unsplash")),
    EB("lab", "How a fossil forms",
      SS("A sea creature dies and sinks to the sea floor. Mud and sand called sediment cover it.", S("Buried in sediment.", ["a", "🐚", 50, 60, 3, "none"], ["s", "🟫", 50, 80, 3, "pulse"])),
      SS("Over a very long time, the layers press down and turn to rock. The shell leaves a fossil.", S("Pressed into rock.", ["a", "🪨", 50, 60, 3, "none"], ["f", "🐚", 50, 45, 3, "pulse"]))),
    CHK(mc("What covers a dead sea creature when it begins to form a fossil?", "Mud and sand called sediment", ["Leaves", "Snow"], { hint: "It settles in layers.", why: "Sediment buries the creature." })),
    SAY("Flip the cards and find the matching pairs. A little brain break!", BRAIN("memory_match", "Fossil match", "Find the matching pairs.", ["🐚", "🦴", "🍃", "🪨", "🦕", "🐟"])),
    H("Stop 2: Mary Anning"),
    SAY("Mary Anning lived in Lyme Regis in Dorset, about two hundred years ago. As a girl, she found huge fossils in the cliffs.", T("**Mary Anning** found fossils on the Dorset coast.")),
    SAY("This rock holds ammonite fossils, ancient spiral-shelled sea animals. Fossils are rare, because most living things rot away.", PHOTO(AMMO, "Spiral ammonite fossils in grey rock beside sand", "Ammonite fossils in rock.", "Photo by Ashleigh Joy Photography on Unsplash")),
    CHK(tf("Every living thing that dies becomes a fossil.", false, { hint: "Fossils are rare.", why: "Most living things rot away. Fossils form only in special conditions." })),
    SAY("Remember. Fossils form when living things are buried and turn to rock. Any living thing can become a fossil.", SUM("A fossil is the remains or imprint of a living thing", "Sediment buries the remains", "Fossils are rare")),
    GLOSS({ fossil: "The remains or imprint of a living thing in rock.", sediment: "Mud and sand that settle in layers.", imprint: "A mark pressed into a surface.", decay: "To break down and rot.", "Mary Anning": "A fossil hunter from Lyme Regis in England." }),
  ],
  mini: [
    mc("Which can become a fossil?", "A shell", ["A plastic toy", "A brick"], { hint: "It was once alive.", why: "Only living things can become fossils." }),
    tf("Fossils help us learn about the past.", true, { hint: "They show ancient life.", why: "Fossils show what lived long ago." }),
    mc("Fossils usually form in...", "sedimentary rock", ["a puddle", "a plastic bag"], { hint: "Mud turns to rock.", why: "Fossils form in rock made from sediment." }),
    num("A museum has 3 boxes with 6 fossils in each. How many fossils is that?", 18, { hint: "3 times 6.", why: "3 x 6 = 18 fossils." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const soil = {
  id: "soil", kind: "use", title: "Soil and the land",
  blocks: [
    H("Stop 1: What is soil?"),
    SAY("Soil is made of tiny pieces of rock, humus, water and air. Humus is rotted dead plants and animals.", T("**Soil** is made of rock pieces, **humus**, water and air.")),
    SAY("Soil takes a very long time to form. Sandy soil has big grains and drains fast. Clay soil has tiny grains and holds water.", PHOTO(SOIL, "Hands pressing dark garden soil around tiny green seedlings", "Soil is full of rock pieces and humus.", "Photo by Sandie Clarke on Unsplash")),
    CHK(mc("What is humus?", "Rotted dead plants and animals in soil", ["A kind of rock", "A kind of clay"], { hint: "Think of leaves rotting.", why: "Humus is decayed plant and animal matter." })),
    H("Stop 2: Weathering and erosion"),
    SAY("Weathering breaks rock into smaller pieces. Rain, wind, ice and plant roots can all do this.", T("**Weathering** breaks rock into smaller pieces.")),
    SAY("Erosion carries those pieces away. Rivers carry silt that makes rich farmland, such as along the Indus.", T("**Erosion** carries broken pieces away.")),
    EB("lab", "Weathering then erosion",
      SS("Rain and frost break a rock into small pieces. That is weathering.", S("Weathering breaks rock.", ["r", "🪨", 40, 50, 3, "none"], ["w", "🌧️", 70, 30, 3, "pulse"])),
      SS("A river carries the pieces downstream. That is erosion.", S("Erosion carries pieces away.", ["p", "🌊", 40, 55, 3, "pulse"], ["s", "🪨", 75, 60, 2, "none"]))),
    REVEAL("How could farmers protect soil from being washed away? Have a think first.", "Plant trees and grass, cover bare ground, and use terraces. Roots hold the soil in place."),
    CHK(mc("A river carries soil away from a hillside. This is...", "erosion", ["weathering", "a fossil"], { hint: "Carried away.", why: "Erosion moves broken pieces away." })),
    SAY("Remember. Soil is rock pieces and humus. Weathering breaks rock. Erosion carries it away. We must protect soil.", SUM("Soil is rock pieces, humus, water and air", "Weathering breaks rock down", "Erosion carries pieces away")),
    GLOSS({ soil: "A mixture of rock pieces, humus, water and air.", humus: "Rotted dead plants and animals in soil.", weathering: "Breaking rock into smaller pieces.", erosion: "Carrying broken pieces away.", silt: "Very fine soil carried by water." }),
  ],
  mini: [
    mc("Which soil holds the most water?", "Clay", ["Sand", "Gravel"], { hint: "Tiny grains.", why: "Clay has tiny grains and holds water." }),
    tf("Plant roots can help weather rocks.", true, { hint: "They grow into cracks.", why: "Roots can split rock." }),
    mc("What helps keep soil in place?", "Plant roots", ["Bare ground", "Heavy rain"], { hint: "Think of grass.", why: "Roots hold soil." }),
    mc("Soil is important because...", "plants grow in it", ["it is a fossil", "it makes rocks"], { hint: "Think of farms.", why: "Plants need soil to grow." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "A shell in the cliff", backdrop: "town", caption: "A fossil shell tells its journey from sea creature to museum.",
  scenes: [
    { caption: "A living shell.", say: "Millions of years ago, a shelled animal lives in a warm sea.",
      items: [{ id: "s", emoji: "🐚", label: "alive", x: 50, y: 55, size: 3, enter: "pop" }, { id: "w", emoji: "🌊", x: 50, y: 78, size: 3 }] },
    { caption: "It dies.", say: "It dies and sinks to the sea floor. Mud and sand cover it.",
      items: [{ id: "s", emoji: "🐚", x: 50, y: 60, size: 3 }, { id: "m", emoji: "🟫", label: "sediment", x: 50, y: 80, size: 3, enter: "slide_right" }] },
    { caption: "Layers build.", say: "Layer on layer builds up. Over a long time, the layers turn to rock.",
      items: [{ id: "r", emoji: "🪨", label: "rock layers", x: 50, y: 55, size: 3, effect: "glow" }] },
    { caption: "A fossil forms.", say: "The shell leaves a fossil in the rock. It stays there for millions of years.",
      items: [{ id: "f", emoji: "🐚", label: "fossil", x: 50, y: 50, size: 3, effect: "sparkle" }] },
    { caption: "Weathering.", say: "Wind, rain and frost weather the cliff. The rock crumbles into pieces.",
      items: [{ id: "c", emoji: "⛰️", x: 40, y: 50, size: 3 }, { id: "w", emoji: "🌧️", x: 70, y: 30, size: 3, effect: "glow" }] },
    { caption: "Erosion and soil.", say: "A river carries bits away. They mix with humus to make soil.",
      items: [{ id: "r", emoji: "🌊", x: 40, y: 60, size: 3, anim: "pulse" }, { id: "p", emoji: "🌱", label: "soil", x: 75, y: 60, size: 3 }] },
    { caption: "Found!", say: "A girl finds the fossil in the cliff, just like Mary Anning did.",
      items: [{ id: "g", emoji: "👧", x: 30, y: 56, size: 3, enter: "walk_right" }, { id: "f", emoji: "🐚", label: "fossil", x: 70, y: 50, size: 3, effect: "sparkle" }] },
    { caption: "In a museum.", say: "Now the fossil sits in a museum. It tells us about life long ago.",
      items: [{ id: "m", emoji: "🏛️", x: 50, y: 40, size: 3 }, { id: "f", emoji: "🐚", label: "fossil", x: 50, y: 65, size: 2, effect: "hearts" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- learn (q1-q8)
  Q("know", "recall", "rocks.brick", tf("Brick is a type of rock.", false, { hint: "Who makes bricks?", why: "Bricks are made by people. They are not natural rock." }),
    tf("Granite is a natural rock.", true, { hint: "Is it dug from the ground?", why: "Granite is a natural rock." })),
  Q("know", "recall", "rocks.natural", mc("Which one of these is a natural rock dug from the ground?", "Chalk", ["Concrete", "Tarmac"], { hint: "Which comes from the ground?", why: "Chalk is a natural rock." }),
    mc("Which of these is made by people, not found as rock?", "Concrete", ["Granite", "Sandstone"], { hint: "Factory made.", why: "Concrete is made by people." })),
  Q("know", "reason", "rocks.tarmac", mc("Sam says the tarmac on the road is a type of rock. Is he right?", "No. Tarmac is made by people from stones and tar, so it is not natural rock", ["Yes, it comes from the ground", "Yes, it is just crushed rock"], { hint: "Is it natural?", why: "Tarmac is a human-made material." }),
    mc("Mina says concrete is a kind of rock. Is she right?", "No. Concrete is made by people from cement, sand and stones", ["Yes, it is natural", "Yes, it is dug from a quarry"], { hint: "Is it natural?", why: "Concrete is human-made." })),
  Q("know", "apply", "rocks.fill_hardness", fill("Complete the sentence about rocks.", "Chalk is a {b1} rock. Granite is a {b2} rock.", [["soft", "hard", "wet"], ["hard", "soft", "liquid"]], { hint: "Think about scratching.", why: "Chalk is soft and granite is hard." }),
    fill("Complete the sentence about soil rocks.", "Rock is a {b1} material found in the {b2}.", [["natural", "made", "soft"], ["Earth", "shop", "factory"]], { hint: "Where does rock come from?", why: "Rock is a natural material from the Earth." })),
  Q("know", "apply", "rocks.use_hot", hot("Tap the rock used for roof tiles.", [["🪨", "Slate", 22, 50], ["🪨", "Chalk", 50, 50], ["🪨", "Sandstone", 78, 50]], ["Slate"], { labels: true, hint: "It splits into thin sheets.", why: "Slate is used for roofs." }),
    hot("Tap the rock often used for statues.", [["🪨", "Marble", 22, 50], ["🪨", "Chalk", 50, 50], ["🪨", "Slate", 78, 50]], ["Marble"], { labels: true, hint: "Smooth and hard.", why: "Marble is used for statues." })),
  Q("know", "apply", "rocks.count", num("A rock collection has 4 granite, 3 chalk and 5 slate rocks. How many rocks is that?", 12, { hint: "Add them up.", why: "4 + 3 + 5 = 12." }),
    num("A rock collection has 6 marble, 2 chalk and 3 slate rocks. How many rocks is that?", 11, { hint: "Add them up.", why: "6 + 2 + 3 = 11." })),
  Q("know", "apply", "rocks.natural_two", ms("Which two are natural rocks? Pick two.", ["Granite", "Limestone"], ["Brick", "Concrete"], { hint: "From the ground.", why: "Granite and limestone are natural rocks." }),
    ms("Which two are human-made? Pick two.", ["Brick", "Tarmac"], ["Slate", "Marble"], { hint: "Made in factories.", why: "Brick and tarmac are made by people." })),
  Q("know", "reason", "rocks.all_hard", mc("Aisha says all rocks are hard. Is she right?", "No. Chalk is soft enough to scratch with a fingernail", ["Yes, rocks are always hard", "Yes, soft things are not rocks"], { hint: "Try scratching chalk.", why: "Chalk is a soft rock." }),
    mc("Ben says all rocks are heavy. Is he right?", "No. Some rocks, like pumice, are light and can even float", ["Yes, all rocks are heavy", "Yes, rocks always sink"], { hint: "Think of pumice.", why: "Some rocks are light." })),

  // ----- try (q9-q16)
  Q("tests", "apply", "rocks.match_props", mat("Match each rock to its property.", [["Chalk", "Soft"], ["Granite", "Hard"], ["Slate", "Splits into layers"]], { hint: "Think of each rock.", why: "Chalk is soft, granite hard and slate splits into layers." }),
    mat("Link each rock to its property.", [["Sandstone", "Permeable"], ["Granite", "Impermeable"], ["Marble", "Hard and smooth"]], { hint: "Think of each rock.", why: "Sandstone is permeable, granite impermeable and marble hard and smooth." })),
  Q("tests", "reason", "rocks.heavy_hard", mc("Layla says heavier rocks are always harder. Is she right?", "No. Hardness is tested by scratching, not by weighing", ["Yes, heavy means hard", "Yes, light rocks are soft"], { hint: "How do we test hardness?", why: "Hardness is shown by the scratch test." }),
    mc("Mira says bigger rocks are harder than small ones. Is she right?", "No. Hardness depends on the rock, not its size", ["Yes, big means hard", "Yes, small rocks are soft"], { hint: "How do we test hardness?", why: "Hardness depends on the type of rock." })),
  Q("tests", "apply", "rocks.hard_scale", sld("On a scale from 1 to 5, chalk scores 1 and granite scores 4. Slide to show how many steps harder granite is.", { min: 0, max: 5, unit: "steps" }, 3, 0, { hint: "4 minus 1.", why: "4 - 1 = 3 steps." }),
    sld("On a scale from 1 to 5, chalk scores 1 and granite scores 5. Slide to show how many steps harder granite is.", { min: 0, max: 5, unit: "steps" }, 4, 0, { hint: "5 minus 1.", why: "5 - 1 = 4 steps." })),
  Q("tests", "reason", "rocks.soil_drain", mc("Ali says all soils drain water at the same speed. Is he right?", "No. Sandy soil drains fast and clay soil drains slowly", ["Yes, all soils drain alike", "No, but only because of the weather"], { hint: "Think of grain size.", why: "Sand has big gaps so water drains fast. Clay holds water." }),
    mc("Hana says water drains through clay as fast as through sand. Is she right?", "No. Clay has tiny grains, so water drains much more slowly", ["Yes, clay and sand are the same", "No, clay drains faster"], { hint: "Think of grain size.", why: "Clay holds water longer than sand." })),
  Q("tests", "apply", "rocks.drip_order", ord("Put the steps of a water drip test in order.", ["Choose a rock", "Drip 5 drops of water on it", "Watch how fast the water soaks in", "Record the result"], { hint: "Set up, test, watch, record.", why: "Choose, drip, observe and record." }),
    ord("Put the steps of a scratch test in order.", ["Pick two rocks", "Scratch one with the other", "Look for scratch marks", "Decide which is harder"], { hint: "Pick, scratch, look, decide.", why: "Pick, scratch, observe and decide." })),
  Q("tests", "apply", "rocks.drip_result", num("In a drip test, 10 drops are put on sandstone and 4 stay on top. How many drops soaked in?", 6, { hint: "10 minus 4.", why: "10 - 4 = 6 drops." }),
    num("In a drip test, 10 drops are put on granite and 9 stay on top. How many drops soaked in?", 1, { hint: "10 minus 9.", why: "10 - 9 = 1 drop." })),
  Q("tests", "apply", "rocks.fair_fill", fill("Complete the sentence about fair tests.", "In a fair test, the {b1} of water stays the {b2}.", [["amount", "colour", "name"], ["same", "different", "hot"]], { hint: "Change only one thing.", why: "The amount of water stays the same in a fair test." }),
    fill("Complete the sentence about permeable rocks.", "A rock that lets water soak in is {b1}. A rock that does not is {b2}.", [["permeable", "impermeable", "hard"], ["impermeable", "permeable", "soft"]], { hint: "In or not in.", why: "Permeable rocks let water in. Impermeable rocks do not." })),
  Q("tests", "recall", "rocks.slate_roof", tf("Slate is a good rock for roofs because water cannot soak through it.", true, { hint: "Think of roof tiles.", why: "Slate is impermeable, so it keeps rain out." }),
    tf("Chalk is a good rock for roofs because it is hard and waterproof.", false, { hint: "Is chalk hard?", why: "Chalk is soft and permeable, so it is not good for roofs." })),

  // ----- play (q17-q23)
  Q("fossils", "apply", "rocks.fossil_hot", hot("Tap the fossil.", [["🐚", "A shell imprint in rock", 22, 50], ["🪙", "An old coin", 50, 50], ["🧱", "A brick", 78, 50]], ["A shell imprint in rock"], { labels: true, hint: "It was once alive.", why: "A shell imprint in rock is a fossil." }),
    hot("Tap the thing that is a fossil.", [["🍃", "A fern leaf imprint in rock", 22, 50], ["🏺", "A clay pot", 50, 50], ["🔩", "An old nail", 78, 50]], ["A fern leaf imprint in rock"], { labels: true, hint: "It was once alive.", why: "A leaf imprint in rock is a fossil." })),
  Q("fossils", "reason", "rocks.only_dinos", mc("Zainab says only dinosaurs become fossils. Is she right?", "No. Shells, fish, leaves and many other living things can become fossils", ["Yes, only dinosaurs", "Yes, only huge animals"], { hint: "Think of shells.", why: "Many kinds of living things can form fossils." }),
    mc("Ben says only big animals become fossils. Is he right?", "No. Tiny shells and leaves can become fossils too", ["Yes, only big animals", "Yes, only animals with bones"], { hint: "Think of leaves.", why: "Plants and small animals can form fossils too." })),
  Q("fossils", "reason", "rocks.old_coin", mc("Hamza says an old coin is a fossil because it is very old. Is he right?", "No. A fossil is the remains or imprint of a living thing. A coin was never alive", ["Yes, old things are fossils", "Yes, metal can fossilise"], { hint: "Was it alive?", why: "Fossils come from living things." }),
    mc("Mina says an old glass bottle is a fossil. Is she right?", "No. A bottle was never alive, so it cannot be a fossil", ["Yes, it is very old", "Yes, glass is a rock"], { hint: "Was it alive?", why: "Only the remains or imprints of living things are fossils." })),
  Q("fossils", "apply", "rocks.words_match", mat("Match each word to its meaning.", [["Fossil", "Remains or imprint of a living thing in rock"], ["Sediment", "Mud or sand that settles in layers"], ["Imprint", "A mark pressed into a surface"]], { hint: "Think of the fossil story.", why: "These are the key words for fossils." }),
    mat("Link each word to its meaning.", [["Decay", "To break down and rot"], ["Pressure", "A force pressing on something"], ["Ammonite", "An ancient spiral-shelled sea animal"]], { hint: "Think of the fossil story.", why: "Decay is rotting, pressure is a push and an ammonite is an ancient sea animal." })),
  Q("fossils", "apply", "rocks.fossil_order", ord("Put the steps of fossil formation in order.", ["A sea creature dies", "It is buried in mud and sand", "The layers press down and turn to rock", "The fossil is found millions of years later"], { hint: "Dies, buried, rock, found.", why: "A fossil forms in this order." }),
    ord("Put the steps of a fossil hunt in order.", ["Walk along the beach", "Spot something in the rock", "Dig it out with care", "Show it to a scientist"], { hint: "Walk, spot, dig, show.", why: "These are the steps of a fossil hunt." })),
  Q("fossils", "apply", "rocks.layers", sld("Layers of mud build up 2 cm every 100 years. Slide to show how thick they are after 500 years.", { min: 0, max: 20, unit: "cm" }, 10, 0, { hint: "500 years is 5 lots of 100.", why: "5 x 2 = 10 cm." }),
    sld("Layers of mud build up 3 cm every 100 years. Slide to show how thick they are after 400 years.", { min: 0, max: 20, unit: "cm" }, 12, 0, { hint: "400 years is 4 lots of 100.", why: "4 x 3 = 12 cm." })),
  Q("fossils", "apply", "rocks.can_fossil", ms("Which two living things could become fossils? Pick two.", ["A shell", "A leaf"], ["A plastic cup", "A glass bottle"], { hint: "Once alive.", why: "Shells and leaves were once living things." }),
    ms("Which two living things could become fossils? Choose two.", ["A fish", "A fern"], ["A coin", "A brick"], { hint: "Once alive.", why: "Fish and ferns were once alive." })),

  // ----- use (q24-q30)
  Q("soil", "recall", "rocks.humus", mc("Which part of soil is made from rotted dead plants and animals?", "Humus", ["Clay", "Sand"], { hint: "Dead and decayed.", why: "Humus is decayed plant and animal matter." }),
    mc("Which soil has the tiniest grains and holds the most water?", "Clay", ["Sand", "Gravel"], { hint: "Tiny grains.", why: "Clay has the tiniest grains." })),
  Q("soil", "apply", "rocks.soil_jar", num("A jar of soil has layers 5 cm of sand, 3 cm of silt and 2 cm of clay. How tall is the soil in the jar?", 10, { hint: "Add the layers.", why: "5 + 3 + 2 = 10 cm." }),
    num("A jar of soil has layers 6 cm of sand, 4 cm of silt and 3 cm of clay. How tall is the soil in the jar?", 13, { hint: "Add the layers.", why: "6 + 4 + 3 = 13 cm." })),
  Q("soil", "reason", "rocks.weather_erosion", mc("Omar says weathering and erosion mean the same thing. Is he right?", "No. Weathering breaks rock into pieces. Erosion carries the pieces away", ["Yes, they are the same", "No, erosion happens first, then weathering"], { hint: "Break or carry?", why: "Weathering breaks rock. Erosion moves the pieces." }),
    mc("Hana says erosion breaks rock down where it stands. Is she right?", "No. That is weathering. Erosion carries pieces away", ["Yes, erosion breaks rock", "Yes, they mean the same"], { hint: "Break or carry?", why: "Weathering breaks rock. Erosion carries it." })),
  Q("soil", "recall", "rocks.weathering_tf", tf("Weathering breaks rock into smaller pieces.", true, { hint: "Rain, wind and ice.", why: "Weathering breaks rock down." }),
    tf("Erosion means rock is broken down where it stands.", false, { hint: "Is it carried or broken?", why: "Erosion carries pieces away. Weathering breaks them." })),
  Q("soil", "apply", "rocks.soil_fill", fill("Complete the sentence about soil.", "Soil is made of rock pieces, {b1}, water and {b2}.", [["humus", "glass", "plastic"], ["air", "paint", "metal"]], { hint: "Four parts.", why: "Soil contains rock pieces, humus, water and air." }),
    fill("Complete the sentence about rivers.", "Rivers carry soil away. This is called {b1}. Planting trees helps {b2} soil.", [["erosion", "weathering", "fossils"], ["protect", "spoil", "melt"]], { hint: "Carrying away.", why: "Erosion carries soil away. Trees protect it." })),
  Q("soil", "reason", "rocks.just_dirt", mc("Mira says soil is just dirt that the Earth always had. Is she right?", "No. Soil forms over a very long time from weathered rock and rotted plants and animals", ["Yes, soil has always been there", "Yes, it is just sand"], { hint: "How is soil made?", why: "Soil takes a very long time to form from rock and humus." }),
    mc("Ben says soil is just crushed sand. Is he right?", "No. Soil also has humus, water, air and living things", ["Yes, it is just sand", "Yes, it is just rock"], { hint: "What else is in soil?", why: "Soil is a mix of rock pieces, humus, water and air." })),
  Q("soil", "apply", "rocks.protect_soil", ms("Which two help protect soil from erosion? Pick two.", ["Planting trees", "Growing grass"], ["Removing all plants", "Leaving bare fields"], { hint: "Roots hold soil.", why: "Trees and grass roots hold the soil together." }),
    ms("Which two help protect soil from erosion? Choose two.", ["Covering soil with plants", "Building terraces on hills"], ["Digging up roots", "Burning crops"], { hint: "Hold the soil in place.", why: "Plants and terraces slow erosion." })),
];

export const topics = [
  topicLesson({
    slug: "science-class-4-rocks-soils-fossils", subject: "science", cls: 4, topic: 9, title: "Rocks, Fossils and Soils",
    summary: "Types of rock, how they wear away, how fossils form and what soil is made of.",
    unit: "Topic 9: Rocks, fossils and soils", difficulty: 2,
    objectives: ["Group rocks by their properties", "Explain weathering, erosion and fossil formation", "Describe what soil is made of"],
    success_criteria: ["I can tell natural rock from human-made materials", "I can explain how a fossil forms", "I can say what soil is made of"],
    real_life: "Spotting rocks on a walk, finding fossils on a beach and caring for garden soil.",
    standards: [NC("Y4 rocks", "Compare and group rocks based on appearance and physical properties; describe how fossils are formed; recognise that soils are made from rocks and organic matter"), ...CAM("4Es.01", "4Es.02")],
    warm_up: [
      mc("Which is a living thing?", "A tree", ["A stone", "A table"], { hint: "It grows.", why: "A tree is alive." }),
      tf("Rocks are natural materials.", true, { hint: "They come from the ground.", why: "Rock is natural." }),
      mc("Which material is hard?", "Granite", ["Cotton", "Wool"], { hint: "Think of a worktop.", why: "Granite is hard." }),
    ],
    intro: [],
    subs: [know, tests, fossils, soil],
    clip,
    quiz,
  }),
];
