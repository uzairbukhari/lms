import { SAY, SS, H, T, IMG, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, PHOTO, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC, CAM } from "./_science-kit.mjs";

// Science Class 4, topic 8: Plants: Roots, Flowers and Seeds (age 9-10). Enquiry types: observing over time, fair test.
const DAISY = "science-class-4-plants-reproduction-3-ba46f4fe.jpg";
const BEE = "science-class-4-plants-reproduction-1-430b870e.jpg";
const SEEDS = "science-class-4-plants-reproduction-2-c323252a.jpg";

// ---------------------------------------------------------------------------------------------- 1. learn
const parts = {
  id: "parts", kind: "learn", title: "Roots, stems and leaves",
  blocks: [
    H("Welcome, young scientist!"),
    SAY("Welcome, young scientist! Today we find out what each plant part does and how flowering plants make new plants.", T("Today we explore how **plants** live and make seeds.")),
    SAY("These yellow flowers sit on a stem with leaves. Underground, the same plant has roots. Every part has a job.", PHOTO(DAISY, "A bee flying near yellow flowers on a leafy stem", "A flowering plant with stems, leaves and flowers.", "Photo by Brad Huchteman on Unsplash")),
    H("Stop 1: Roots and stems"),
    SAY("Roots grow in the soil. They hold the plant firmly in place, and they absorb water and nutrients.", T("**Roots** anchor the plant and **absorb** water and nutrients.")),
    SAY("The stem holds the plant up. It also carries water and nutrients from the roots to the leaves and flowers.", T("The **stem** supports the plant and carries water upwards.")),
    EB("lab", "Roots and stem at work",
      SS("Water is in the soil. The roots absorb it, and they anchor the plant too.", S("Roots absorb water.", ["r", "🌱", 30, 60, 3, "none"], ["w", "💧", 70, 70, 3, "pulse"])),
      SS("The stem carries the water up to the leaves and flowers.", S("The stem carries water up.", ["s", "🌿", 50, 50, 3, "pulse"], ["w", "💧", 50, 82, 2, "float"]))),
    CHK(mc("What is the main job of the roots?", "To take in water and hold the plant in the soil", ["To make seeds", "To make food from sunlight"], { hint: "Underground jobs.", why: "Roots absorb water and nutrients, and anchor the plant." })),
    H("Stop 2: Leaves make food"),
    SAY("Leaves make food for the plant. They use sunlight, water and air to do it. Plants do not eat the soil.", T("**Leaves** make food using sunlight, water and air.", "Roots only take in water and nutrients.")),
    IMG("🌿☀️💧", "Leaves use sunlight and water to make food."),
    CHK(tf("Plants make most of their food in their leaves.", true, { hint: "Think about sunlight.", why: "Leaves make food using sunlight." })),
    SAY("Remember. Roots anchor and absorb. Stems support and carry. Leaves make food.", SUM("Roots anchor and absorb water", "Stems carry water to the leaves", "Leaves make food using sunlight")),
    GLOSS({ plants: "Living things that make their own food, like trees and grass.", roots: "The part of a plant that grows in the soil.", absorb: "To soak up, like a sponge.", stem: "The part that holds the plant up.", leaves: "The flat green parts that make food.", nutrients: "Minerals that help plants grow healthy." }),
  ],
  mini: [
    mc("Which part holds a plant firmly in the ground?", "The roots", ["The petals", "The seeds"], { hint: "Underground.", why: "Roots anchor the plant." }),
    tf("A stem carries water up to the leaves.", true, { hint: "Water must travel up.", why: "The stem carries water and nutrients." }),
    mat("Match each part to its job.", [["Roots", "Absorb water"], ["Stem", "Carries water up"], ["Leaves", "Make food"]], { hint: "Think about where each part is.", why: "Roots absorb, the stem carries and leaves make food." }),
    mc("Which of these does a plant NOT take in through its roots?", "Sunlight", ["Water", "Nutrients"], { hint: "Light comes from above.", why: "Roots take in water and nutrients, not sunlight." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const water = {
  id: "water", kind: "try", title: "Water on the move",
  blocks: [
    H("Stop 1: Celery in coloured water"),
    SAY("Let's follow the water. A stick of celery stands in coloured water. After some hours, the colour rises up the stem.", T("Coloured water shows how water travels up a **stem**.")),
    EB("lab", "Celery experiment",
      SS("A celery stick stands in water with red food colouring.", S("Start: celery in red water.", ["c", "🥬", 50, 50, 3, "none"], ["w", "🥤", 50, 80, 2, "none"])),
      SS("After a day, the red colour has moved up the stem and into the leaves.", S("Later: colour in the leaves.", ["c", "🥬", 50, 50, 3, "pulse"], ["w", "🔴", 50, 80, 2, "pulse"]))),
    CHK(mc("What does the colour moving up the celery show?", "Water travels up the stem", ["Roots make colour", "Leaves drink the colour first"], { hint: "Follow the colour.", why: "The colour marks the path of the water up the stem." })),
    H("Stop 2: A paper towel model"),
    SAY("Roots do not suck water like a straw. They absorb it, like a paper towel soaking up water from the edge.", T("Roots **absorb** water over their surface, like a paper towel.")),
    MAN("Water the roots", "Move the water drops to the root hairs, then to the stem.", "💧", 10, ["Soil", "Plant"]),
    ACT("Celery test", ["Celery sticks with leaves", "Cups, water and food colouring", "A ruler"], ["Put one celery stick in plain water and one in red water.", "Wait for several hours.", "Measure how high the colour has gone.", "Keep the amount of water the same each time for a fair test."]),
    CHK(tf("In a fair test, you change only one thing.", true, { hint: "Think about the colour.", why: "A fair test changes one thing and keeps the rest the same." })),
    SAY("Remember. Water travels from the soil, through the roots and stem, to the leaves.", SUM("Roots absorb water", "The stem carries water to the leaves", "A fair test changes only one thing")),
    GLOSS({ stem: "The part that carries water up.", absorb: "To soak up water.", "fair test": "A test where only one thing changes.", predict: "To say what you think will happen." }),
  ],
  mini: [
    ord("Put the celery test in order.", ["Set up the celery", "Wait", "Measure the colour", "Record the result"], { hint: "Set up first.", why: "You set up, wait, measure and record." }),
    mc("Why do we use food colouring?", "To see where the water goes", ["To feed the plant", "To make leaves bigger"], { hint: "Make it visible.", why: "The colour lets us see the water's path." }),
    tf("The colour will reach the leaves straight away.", false, { hint: "It takes time.", why: "Water moves slowly, so the colour takes hours." }),
    mc("What should stay the same in a fair test?", "The amount of water and the type of celery", ["The colour only", "Nothing at all"], { hint: "Keep it fair.", why: "Only the thing you test should change." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const flower = {
  id: "flower", kind: "play", title: "Flower power",
  blocks: [
    H("Stop 1: Parts of a flower"),
    SAY("A flower has petals, which attract insects. In the middle are the stamens and the carpel.", T("**Petals** attract insects.", "The **stamen** makes pollen. The **carpel** makes seeds.")),
    SAY("The anther is part of the stamen. It makes pollen. The stigma is the sticky tip of the carpel. It catches pollen.", T("The **anther** makes **pollen**.", "The **stigma** catches pollen.")),
    SAY("This bee is visiting for nectar. Look at the pollen on its legs.", PHOTO(BEE, "A bumblebee on a yellow flower", "A bee carries pollen from flower to flower.", "Photo by Celine Lityo on Unsplash")),
    CHK(mc("Which part of the flower makes pollen?", "The anther", ["The stigma", "The petal"], { hint: "Part of the stamen.", why: "The anther makes and holds pollen." })),
    H("Stop 2: Pollination"),
    SAY("Pollination is when pollen moves from an anther to a stigma. Insects and wind can carry pollen.", T("**Pollination** moves pollen from an anther to a stigma.")),
    EB("home", "A bee pollinates",
      SS("A bee lands on a flower to drink nectar. Pollen sticks to its body.", S("Pollen sticks to the bee.", ["b", "🐝", 30, 45, 3, "pulse"], ["f", "🌼", 30, 70, 3, "none"])),
      SS("It flies to another flower. Some pollen touches the stigma. That is pollination.", S("Pollen reaches the stigma.", ["b", "🐝", 70, 45, 3, "pulse"], ["f", "🌸", 70, 70, 3, "none"]))),
    SAY("Flip the cards and find the matching pairs. A little brain break!", BRAIN("memory_match", "Flower match", "Find the matching pairs.", ["🌼", "🐝", "🌸", "🦋", "🌻", "🍃"])),
    CHK(tf("Wind can carry pollen between flowers.", true, { hint: "Grasses use wind.", why: "Some plants are pollinated by wind." })),
    SAY("Remember. Petals attract insects. Anthers make pollen. Pollination carries it to the stigma.", SUM("Petals attract insects", "The anther makes pollen", "Pollination moves pollen to the stigma")),
    GLOSS({ petals: "The bright parts of a flower.", stamen: "The male part of a flower.", carpel: "The female part of a flower.", anther: "The part of the stamen that makes pollen.", pollen: "A fine powder that helps to make seeds.", stigma: "The sticky top of the carpel.", pollination: "Moving pollen from an anther to a stigma." }),
  ],
  mini: [
    mc("Which part of a flower catches pollen?", "The stigma", ["The petal", "The root"], { hint: "It is sticky.", why: "The stigma catches pollen." }),
    tf("Pollination happens inside the soil.", false, { hint: "Flowers are above ground.", why: "Pollination happens in flowers." }),
    mc("Why do many flowers have a sweet smell?", "To attract insects", ["To scare them", "To keep warm"], { hint: "Think of bees.", why: "Smell and colour attract pollinators." }),
    mat("Match each flower part to its job.", [["Petals", "Attract insects"], ["Anther", "Makes pollen"], ["Stigma", "Catches pollen"]], { hint: "Think of the bee's visit.", why: "Each part has its own job." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const seeds = {
  id: "seeds", kind: "use", title: "Seeds on the move",
  blocks: [
    H("Stop 1: Seed dispersal"),
    SAY("After pollination, the flower makes seeds. Seeds must spread away from the parent plant, so they have space to grow.", T("**Seed dispersal** is how seeds spread away from the plant.")),
    SAY("Dandelion seeds have tiny parachutes. The wind carries them far away. Sycamore seeds spin like helicopters.", PHOTO(SEEDS, "Dandelion seeds with fluffy parachutes floating in the air", "Dandelion seeds travel on the wind.", "Photo by Hasan Almasi on Unsplash")),
    CHK(mc("How do dandelion seeds spread?", "On the wind", ["By swimming", "By pollination"], { hint: "Parachutes.", why: "Dandelion seeds are carried by the wind." })),
    H("Stop 2: The life cycle"),
    SAY("A seed germinates and grows into a seedling. The seedling becomes an adult plant, which flowers and makes new seeds.", T("The **life cycle** of a flowering plant goes round and round.")),
    EB("home", "A bean's life cycle",
      SS("A bean seed is planted in soil. It germinates and a root grows.", S("Seed to seedling.", ["s", "🫘", 25, 65, 3, "none"], ["r", "🌱", 70, 55, 3, "pulse"])),
      SS("The seedling grows into a plant that flowers and makes new beans.", S("Plant, flower, new seeds.", ["p", "🪴", 25, 55, 3, "none"], ["f", "🌸", 55, 45, 3, "pulse"], ["b", "🫘", 85, 65, 3, "none"]))),
    REVEAL("Why do seeds need to spread away from the parent plant? Have a think first.", "So they do not crowd each other. They need space, light and water to grow."),
    CHK(ord("Put the plant life cycle in order.", ["Seed", "Seedling", "Adult plant with flowers", "New seeds"], { hint: "Start and end with seeds.", why: "A plant grows from a seed, flowers, and makes new seeds." })),
    SAY("Remember. Seeds spread by wind, water and animals. Then they germinate and the life cycle goes on.", SUM("Seeds spread by wind, water and animals", "A seed germinates into a seedling", "The life cycle goes round and round")),
    GLOSS({ "seed dispersal": "How seeds are spread away from the plant.", "life cycle": "The stages of a living thing from start to start again.", germinate: "When a seed starts to grow.", seedling: "A young plant just starting to grow." }),
  ],
  mini: [
    mc("A burr that sticks to your socks is dispersed by...", "animals", ["wind", "water"], { hint: "It catches on fur.", why: "Burrs stick to fur and clothes." }),
    tf("A coconut can be carried by water.", true, { hint: "It floats.", why: "Coconuts float away on the sea." }),
    mc("What does germinate mean?", "To start to grow", ["To make pollen", "To fall off"], { hint: "A seed in the soil.", why: "Germinate means a seed starts to grow." }),
    mc("Why do some fruits taste sweet?", "Animals eat them and spread the seeds", ["To keep leaves green", "To block sunlight"], { hint: "Think of birds.", why: "Animals eat the fruit and drop seeds elsewhere." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "The bee and the mustard flower", backdrop: "home", caption: "A bee carries pollen and a seed takes flight.",
  scenes: [
    { caption: "A mustard field.", say: "In a Punjab field, mustard flowers shine yellow in the morning sun.",
      items: [{ id: "f", emoji: "🌼", x: 25, y: 55, size: 3 }, { id: "g", emoji: "🌼", x: 50, y: 60, size: 3 }, { id: "h", emoji: "🌼", x: 75, y: 55, size: 3 }] },
    { caption: "A bee arrives.", say: "A bee buzzes in. She wants sweet nectar to drink.",
      items: [{ id: "b", emoji: "🐝", label: "bee", x: 30, y: 36, size: 3, enter: "slide_right" }, { id: "f", emoji: "🌼", x: 30, y: 62, size: 3 }] },
    { caption: "Pollen sticks.", say: "Yellow pollen sticks to her furry body as she drinks.",
      items: [{ id: "b", emoji: "🐝", label: "pollen on her legs", x: 30, y: 46, size: 3, effect: "sparkle" }] },
    { caption: "Another flower.", say: "She flies to another flower. Some pollen touches the sticky stigma.",
      items: [{ id: "b", emoji: "🐝", x: 70, y: 40, size: 3, path: "arc" }, { id: "f", emoji: "🌸", label: "stigma", x: 70, y: 66, size: 3, effect: "glow" }] },
    { caption: "Pollination!", say: "That is pollination. Now the flower can make seeds.",
      items: [{ id: "f", emoji: "🌸", label: "pollination", x: 50, y: 50, size: 3, effect: "sparkle" }] },
    { caption: "Seeds grow.", say: "Weeks later, the flower has made seeds in a pod.",
      items: [{ id: "p", emoji: "🫘", label: "seeds", x: 50, y: 50, size: 3, enter: "grow" }] },
    { caption: "A seed takes flight.", say: "A sycamore seed spins away on its helicopter wing. It is dispersal!",
      items: [{ id: "s", emoji: "🍁", label: "dispersal", x: 60, y: 30, size: 3, path: "arc", effect: "sparkle" }] },
    { caption: "A new plant.", say: "Far away, the seed germinates. A new plant begins!",
      items: [{ id: "n", emoji: "🌱", label: "new plant", x: 50, y: 55, size: 3, effect: "hearts" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- learn (q1-q8)
  Q("parts", "recall", "plants.roots", tf("Roots hold a plant firmly in the soil.", true, { hint: "Think of a tree in the wind.", why: "Roots anchor the plant." }),
    tf("Roots are where plants make food using sunlight.", false, { hint: "Is there light underground?", why: "Leaves make food using sunlight. Roots are underground." })),
  Q("parts", "recall", "plants.jobs", mc("What is the main job of the stem?", "To hold the plant up and carry water to the leaves", ["To make seeds", "To make food from soil"], { hint: "Support and carry.", why: "The stem supports the plant and carries water." }),
    mc("Which part makes food using sunlight?", "The leaves", ["The roots", "The seeds"], { hint: "Green and flat.", why: "Leaves make food using sunlight." })),
  Q("parts", "reason", "plants.leaves_water", mc("Sam says leaves drink the water that plants need. Is he right?", "No. Roots take in the water, and the stem carries it up to the leaves", ["Yes, leaves drink the rain", "Yes, water goes in through the flowers"], { hint: "Where is the water?", why: "Roots absorb water from the soil. The stem carries it up." }),
    mc("Ben says flowers take in the water for the plant. Is he right?", "No. Roots take in the water", ["Yes, flowers drink the water", "Yes, seeds drink the water"], { hint: "Where is the water?", why: "Roots are the part that absorb water." })),
  Q("parts", "apply", "plants.fill_roots", fill("Complete the sentence about roots.", "Roots {b1} water and {b2} the plant in the soil.", [["absorb", "make", "reflect"], ["anchor", "feed", "paint"]], { hint: "Two jobs.", why: "Roots absorb water and anchor the plant." }),
    fill("Complete the sentence about leaves.", "Leaves make {b1} using {b2}.", [["food", "water", "soil"], ["sunlight", "rain", "wind"]], { hint: "What do leaves need?", why: "Leaves make food using sunlight." })),
  Q("parts", "apply", "plants.hotspot", hot("Tap the part that takes in water from the soil.", [["🌱", "Roots", 22, 50], ["🍃", "Leaf", 50, 50], ["🌼", "Flower", 78, 50]], ["Roots"], { labels: true, hint: "Underground.", why: "Roots absorb water." }),
    hot("Tap the part that makes food using sunlight.", [["🌱", "Roots", 22, 50], ["🍃", "Leaf", 50, 50], ["🌼", "Flower", 78, 50]], ["Leaf"], { labels: true, hint: "Green and flat.", why: "Leaves make food." })),
  Q("parts", "apply", "plants.root_count", num("A plant has 3 main roots. Each splits into 4 smaller roots. How many smaller roots are there?", 12, { hint: "3 times 4.", why: "3 x 4 = 12 smaller roots." }),
    num("A plant has 2 main roots. Each splits into 5 smaller roots. How many smaller roots are there?", 10, { hint: "2 times 5.", why: "2 x 5 = 10 smaller roots." })),
  Q("parts", "apply", "plants.needs", ms("Which two things do plants need to grow? Pick two.", ["Water", "Light"], ["Chocolate", "Plastic"], { hint: "Think about the garden.", why: "Plants need water and light." }),
    ms("Which two things help a plant grow well? Choose two.", ["Air", "Warmth"], ["Sweets", "Cold metal"], { hint: "Think about the garden.", why: "Plants need air and warmth." })),
  Q("parts", "reason", "plants.soil_food", mc("Ali says plants take all their food from the soil. Is he right?", "No. Plants make their own food in their leaves. Roots take in water and nutrients", ["Yes, plants eat soil", "Yes, soil is plant food"], { hint: "Where is food made?", why: "Leaves make food using sunlight. Soil gives water and nutrients." }),
    mc("Hana says plants eat the soil through their roots. Is she right?", "No. Plants make their own food in the leaves", ["Yes, they eat the soil", "Yes, soil is their only food"], { hint: "Where is food made?", why: "Plants make their own food in leaves." })),

  // ----- try (q9-q16)
  Q("water", "apply", "plants.jobs_match", mat("Match each plant part to its job.", [["Roots", "Absorb water and anchor"], ["Stem", "Carries water upwards"], ["Leaves", "Make food"]], { hint: "Underground, middle, top.", why: "Roots absorb, the stem carries and leaves make food." }),
    mat("Link each plant part to its job.", [["Flower", "Makes seeds"], ["Stem", "Holds the plant up"], ["Roots", "Take in nutrients"]], { hint: "Think about each part.", why: "Flowers make seeds, stems support and roots take in nutrients." })),
  Q("water", "reason", "plants.straws", mc("Aisha says roots work like drinking straws, sucking water in through their tips only. Is she right?", "No. Roots absorb water over their surface, like a paper towel soaking it up", ["Yes, only the tips take water", "Yes, roots pump the water"], { hint: "Think of the paper towel.", why: "Roots absorb water across their whole surface." }),
    mc("Ben says roots only take in water at the very end. Is he right?", "No. Water is absorbed along the roots, not just at the end", ["Yes, only the end works", "Yes, roots are hollow pipes"], { hint: "Think of the paper towel.", why: "Water is absorbed over the whole root surface." })),
  Q("water", "apply", "plants.celery_rate", sld("Colour rises 2 cm each hour up a celery stem. Slide to show how high it is after 4 hours.", { min: 0, max: 20, unit: "cm" }, 8, 0, { hint: "2 times 4.", why: "2 x 4 = 8 cm." }),
    sld("Colour rises 3 cm each hour up a celery stem. Slide to show how high it is after 5 hours.", { min: 0, max: 20, unit: "cm" }, 15, 0, { hint: "3 times 5.", why: "3 x 5 = 15 cm." })),
  Q("water", "reason", "plants.no_roots", mc("Layla says a plant can stand up without roots, so roots are not needed. Is she right?", "No. Roots anchor the plant and take in water, so it would fall over and dry out", ["Yes, the stem can do it all", "Yes, leaves can take in the water"], { hint: "Anchor and absorb.", why: "Without roots the plant cannot stay up or get water." }),
    mc("Mina says a plant without roots can drink through its leaves. Is she right?", "No. Roots are the part that absorb water, so it would dry out", ["Yes, leaves absorb the water", "Yes, flowers absorb the water"], { hint: "Anchor and absorb.", why: "Roots absorb water. A plant without them would wilt." })),
  Q("water", "apply", "plants.water_path", ord("Put the journey of water in order.", ["Water in the soil", "Absorbed by the roots", "Carried up the stem", "Reaches the leaves"], { hint: "Bottom to top.", why: "Water goes from the soil, into the roots, up the stem and to the leaves." }),
    ord("Put the celery investigation in order.", ["Put celery in coloured water", "Leave it for some hours", "Look for colour in the stem and leaves", "Record what you see"], { hint: "Set up, wait, look, record.", why: "Set up, wait, observe, then record." })),
  Q("water", "apply", "plants.rate_time", num("Water rises 6 cm up a stem in 2 hours. At the same rate, how far does it rise in 6 hours?", 18, { hint: "6 hours is 3 lots of 2.", why: "3 x 6 = 18 cm." }),
    num("Water rises 4 cm up a stem in 2 hours. At the same rate, how far does it rise in 8 hours?", 16, { hint: "8 hours is 4 lots of 2.", why: "4 x 4 = 16 cm." })),
  Q("water", "apply", "plants.fill_water", fill("Complete the sentence about water.", "Water goes up the {b1} to the {b2}.", [["stem", "root", "seed"], ["leaves", "soil", "pot"]], { hint: "From the roots to the top.", why: "Water goes up the stem to the leaves." }),
    fill("Complete the sentence about the celery test.", "The {b1} moves up the stem. This shows the stem carries {b2}.", [["colour", "soil", "heat"], ["water", "light", "seeds"]], { hint: "What does the colour show?", why: "The colour shows water moving up the stem." })),
  Q("water", "recall", "plants.fair_test", tf("Coloured water in celery shows where water travels in the plant.", true, { hint: "The colour follows the water.", why: "The colour marks the path of water." }),
    tf("In a fair celery test you should use different amounts of water in each cup.", false, { hint: "Change one thing only.", why: "A fair test keeps the amount of water the same." })),

  // ----- play (q17-q23)
  Q("flower", "apply", "plants.flower_hotspot", hot("Tap the part of the flower that makes pollen.", [["🌼", "Anther", 22, 50], ["🌸", "Petal", 50, 50], ["🌱", "Stem", 78, 50]], ["Anther"], { labels: true, hint: "Part of the stamen.", why: "The anther makes pollen." }),
    hot("Tap the sticky part that catches pollen.", [["🌼", "Stigma", 22, 50], ["🌸", "Petal", 50, 50], ["🍃", "Leaf", 78, 50]], ["Stigma"], { labels: true, hint: "Top of the carpel.", why: "The stigma catches pollen." })),
  Q("flower", "reason", "plants.flower_looks", mc("Omar says flowers are only there to look nice. Is he right?", "No. Bright petals attract insects, and flowers make seeds", ["Yes, they are just for decoration", "Yes, they are for people to pick"], { hint: "What do petals do for the plant?", why: "Flowers attract pollinators and make seeds." }),
    mc("Mina says flowers smell sweet only for people. Is she right?", "No. The smell attracts insects that pollinate them", ["Yes, only for people", "Yes, smell does nothing"], { hint: "What do insects do?", why: "Smell attracts insects that carry pollen." })),
  Q("flower", "reason", "plants.bee_helps", mc("Hamza says bees pollinate flowers to help them. Is he right?", "No. Bees visit for nectar. Pollination happens as a side effect", ["Yes, bees plan to help flowers", "Yes, bees are paid by the flowers"], { hint: "What do bees want?", why: "Bees visit for food. Pollination is a by-product." }),
    mc("Ali says butterflies pollinate flowers on purpose to help them. Is he right?", "No. Butterflies come for nectar, and carry pollen by accident", ["Yes, butterflies plan to pollinate", "Yes, butterflies need the flowers to survive"], { hint: "What do butterflies want?", why: "They visit for nectar. Pollination is a side effect." })),
  Q("flower", "apply", "plants.parts_match", mat("Match each part of a flower to its job.", [["Petals", "Attract insects"], ["Anther", "Makes pollen"], ["Stigma", "Catches pollen"]], { hint: "Think of the bee.", why: "Petals attract, anthers make pollen and the stigma catches it." }),
    mat("Link each flower part to its job.", [["Nectar", "Food for insects"], ["Ovary", "Makes seeds"], ["Stamen", "Male part"]], { hint: "Think of the bee.", why: "Nectar feeds insects, the ovary makes seeds and the stamen is the male part." })),
  Q("flower", "apply", "plants.pollination_order", ord("Put the steps of insect pollination in order.", ["An insect lands on a flower", "Pollen sticks to its body", "It visits another flower", "Pollen touches the stigma"], { hint: "Visit, stick, travel, touch.", why: "The insect picks up pollen, travels, and leaves some on the stigma." }),
    ord("Put the steps of wind pollination in order.", ["Pollen is made in the anther", "The wind blows the pollen", "Pollen lands on a stigma", "Pollination is complete"], { hint: "Make, blow, land, done.", why: "Pollen is made, carried by wind, lands, and pollination is complete." })),
  Q("flower", "apply", "plants.bee_visits", sld("A bee visits 12 flowers in 1 minute. Slide to show how many flowers it visits in 5 minutes at that rate.", { min: 0, max: 100, unit: "flowers" }, 60, 0, { hint: "12 times 5.", why: "12 x 5 = 60 flowers." }),
    sld("A bee visits 8 flowers in 1 minute. Slide to show how many flowers it visits in 5 minutes at that rate.", { min: 0, max: 100, unit: "flowers" }, 40, 0, { hint: "8 times 5.", why: "8 x 5 = 40 flowers." })),
  Q("flower", "apply", "plants.insect_flower", ms("Which two clues suggest a flower is pollinated by insects? Pick two.", ["Bright petals", "Sweet smell"], ["Small dull flowers", "No smell"], { hint: "Think of what attracts insects.", why: "Bright petals and a sweet smell attract insects." }),
    ms("Which two clues suggest a flower is pollinated by wind? Pick two.", ["Small dull flowers", "No scent"], ["Bright petals", "Sweet smell"], { hint: "Wind does not need attracting.", why: "Wind-pollinated flowers are small and dull with no scent." })),

  // ----- use (q24-q30)
  Q("seeds", "apply", "plants.dispersal", mc("A sycamore seed has a wing that spins. How is it dispersed?", "By wind", ["By water", "By animals"], { hint: "Helicopter wings.", why: "The wing makes it spin and travel on the wind." }),
    mc("A burr sticks to a dog's fur. How is it dispersed?", "By animals", ["By wind", "By water"], { hint: "Hooks on fur.", why: "Burrs hook onto fur and are carried away." })),
  Q("seeds", "apply", "plants.seed_count", num("A plant makes 25 seeds. The wind carries away 10 and animals carry away 8. How many seeds are left?", 7, { hint: "Take away 10, then 8.", why: "25 - 10 - 8 = 7 seeds." }),
    num("A plant makes 30 seeds. The wind carries away 12 and animals carry away 9. How many seeds are left?", 9, { hint: "Take away 12, then 9.", why: "30 - 12 - 9 = 9 seeds." })),
  Q("seeds", "reason", "plants.pollen_seed", mc("Zainab says pollen is a seed. Is she right?", "No. Pollen is a powder made by the anther. A seed forms after pollination", ["Yes, pollen grows into a plant", "Yes, they are the same"], { hint: "What makes pollen?", why: "Pollen helps make seeds, but it is not a seed." }),
    mc("Ben says pollen grows straight into a new plant. Is he right?", "No. Pollen must reach a stigma first, then a seed forms", ["Yes, pollen is a baby plant", "Yes, pollen is a root"], { hint: "What comes after pollination?", why: "After pollination a seed forms, and the seed grows." })),
  Q("seeds", "recall", "plants.seed_grow", tf("A seed can grow into a new plant.", true, { hint: "Think of a bean.", why: "A seed germinates and grows into a plant." }),
    tf("Seeds spread away from the parent plant so they have to compete for the same space.", false, { hint: "Why spread out?", why: "Spreading gives seeds more space to grow." })),
  Q("seeds", "apply", "plants.fill_cycle", fill("Complete the sentence about the life cycle.", "A seed germinates and grows into a {b1}, then into an adult {b2}.", [["seedling", "fruit", "root"], ["plant", "stone", "pond"]], { hint: "Young plant, then adult.", why: "A seed grows into a seedling and then an adult plant." }),
    fill("Complete the sentence about seeds.", "Seeds are {b1} away from the parent plant so they have more {b2} to grow.", [["spread", "glued", "buried"], ["space", "noise", "cold"]], { hint: "Why spread out?", why: "Seeds spread so they have space to grow." })),
  Q("seeds", "reason", "plants.pollination_vs_dispersal", mc("Mira says pollination and seed dispersal are the same thing. Is she right?", "No. Pollination moves pollen between flowers. Dispersal moves seeds away from the plant", ["Yes, they are the same", "No, dispersal comes before pollination"], { hint: "Pollen or seed?", why: "Pollination moves pollen. Dispersal moves seeds." }),
    mc("Ali says seed dispersal means moving pollen to the stigma. Is he right?", "No. That is pollination. Dispersal moves seeds", ["Yes, dispersal moves pollen", "Yes, they mean the same"], { hint: "Pollen or seed?", why: "Pollen to the stigma is pollination. Dispersal moves seeds." })),
  Q("seeds", "apply", "plants.dispersal_two", ms("Which two are ways seeds can be dispersed? Pick two.", ["Wind", "Animals"], ["Photosynthesis", "Roots"], { hint: "Think of dandelions and burrs.", why: "Wind and animals spread seeds." }),
    ms("Which two are ways seeds can be dispersed? Choose two.", ["Water", "An animal eating a fruit"], ["Stem", "Leaves"], { hint: "Think of coconuts and berries.", why: "Water and animals spread seeds." })),
];

export const topics = [
  topicLesson({
    slug: "science-class-4-plants-reproduction", subject: "science", cls: 4, topic: 8, title: "Plants: Roots, Flowers and Seeds",
    summary: "What each plant part does and how flowering plants make new plants.",
    unit: "Topic 8: Plants: roots, flowers and seeds", difficulty: 2,
    objectives: ["Explain the jobs of roots, stems and leaves", "Name the parts of a flower and describe pollination", "Order the life cycle of a flowering plant"],
    success_criteria: ["I can say what roots, stems and leaves do", "I can explain pollination", "I can describe how seeds spread"],
    real_life: "Watering plants, bees in the garden and seeds that fly in the wind.",
    standards: [NC("Y4 plants", "Describe the functions of the parts of flowering plants; investigate how water is transported in plants; explore the role of flowers in the life cycle"), ...CAM("4Bp.01", "4Bp.02")],
    warm_up: [
      mc("What do plants need to make food?", "Light", ["Plastic", "Sand"], { hint: "From the Sun.", why: "Plants use light to make food." }),
      tf("All plants have roots.", true, { hint: "Think of a tree.", why: "Most plants have roots." }),
      mc("Which is a living thing?", "A tree", ["A stone", "A table"], { hint: "It grows.", why: "A tree is alive." }),
    ],
    intro: [],
    subs: [parts, water, flower, seeds],
    clip,
    quiz,
  }),
];
