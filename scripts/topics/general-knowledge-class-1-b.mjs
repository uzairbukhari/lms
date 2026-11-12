import { SAY, SS, H, T, IMG, FACT, REVEAL, ACT, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, st, ord, mat, fill, hot, sld, PHOTO } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// General Knowledge, Class 1 (Zainab, age 7), topics 3 and 4. Standards come from docs/CURRICULUM_V2.md.
// Religious content stays general (what families do at Eid); no text is quoted from memory.
const SCENE = (title, backdrop, ...scenes) => ({ ...EXP(title, ...scenes), backdrop });
// A labelled picture on the stage: [id, emoji, x, y, size, anim, label]
const P = (id, x, y, label, emoji, size = 2, anim = "none") => [id, emoji, x, y, size, anim, label];

// ====================================================================================================
// Topic 3: How people live
// ====================================================================================================

const VILLAGE = "general-knowledge-class-1-how-people-live-1-01da49e9.jpg";
const TOWN = "general-knowledge-class-1-how-people-live-2-e0a3e6f3.jpg";
const BIKE = "general-knowledge-class-1-how-people-live-3-c0031692.jpg";
const homes = {
  id: "homes", kind: "learn", title: "Homes around the world",
  blocks: [
    H("Welcome, little explorer!"),
    SAY("Today we ask a big question. How do people live?", T("Today's big question: how do people live, now and long ago?")),
    SAY("This is a village seen from high above. We can see roofs, roads and gardens.", PHOTO(VILLAGE, "An aerial view looking straight down on houses, roads and terraced fields in a village", "A village seen from above. We can see roofs, roads and gardens.", "Photo by Cosmin Andrei Buzamat on Unsplash")),
    H("Stop 1: Many kinds of homes"),
    SAY("Where do you live? Your home is the place where you sleep, eat and feel safe. But homes are not all the same! Some families live in houses made of bricks. Some live in flats, high up in a tall building. Some people, who move from place to place, live in tents. And in many villages, families live in homes made of mud bricks. Every one of these is a home.", T("A **home** is a place where we live and feel safe.", "Homes can be houses, **flats**, **tents** or mud-brick homes.")),
    SCENE("Four kinds of homes", "town",
      SS("Here is a house made of bricks. Many families in towns and cities live in houses like this.", S("A brick house.", P("h", 50, 50, "House", "🏠", 3))),
      SS("Here are flats. Many families live in one tall building, each family in its own flat.", S("Flats in a tall building.", P("h", 20, 50, "House", "🏠", 2), P("f", 50, 50, "Flats", "🏢", 3))),
      SS("Here is a tent. People who move from place to place can pack up their tent. They take it with them.", S("A tent can be moved.", P("h", 15, 50, "House", "🏠", 2), P("f", 38, 50, "Flats", "🏢", 2), P("t", 66, 50, "Tent", "⛺", 3))),
      SS("And here is a mud-brick home, in a village. Mud and straw are free and everywhere. They keep the home cool in summer.", S("A mud-brick home.", P("h", 12, 50, "House", "🏠", 2), P("f", 33, 50, "Flats", "🏢", 2), P("t", 57, 50, "Tent", "⛺", 2), P("m", 82, 50, "Mud-brick home", "🛖", 2)))),
    CHK(mc("Which kind of home can be packed up and carried away?", "A tent", ["A flat", "A brick house"], { hint: "Think of people who move from place to place.", why: "A tent can be packed up and taken with you." })),
    H("Stop 2: Homes and the weather"),
    SAY("These homes are close together in a town. Look at the roofs.", PHOTO(TOWN, "Many white buildings with orange roofs packed together below a green hillside", "Homes close together in a town.", "Photo by Andrii Butko on Unsplash")),
    SAY("Why do homes look different in different places? Because of the weather, and because of what is nearby. In a snowy place, a house often has a steep roof. The heavy snow slides off. In a very hot place, a home has thick walls and shady spaces. They keep the heat out. A home keeps us warm, cool, dry and safe, whatever the weather.", T("People build homes to suit the **weather** and what is nearby.", "A steep roof lets snow slide off. Thick walls keep a home cool.")),
    SCENE("Homes and weather", "plain",
      SS("In a snowy place the roof is steep. Watch the snow slide off and fall to the ground. The roof does not get too heavy.", S("Snowy place: a steep roof.", P("a", 50, 62, "Snowy place", "🏠", 3), ["s", "❄️", 50, 14, 2, "float"])),
      SS("In a hot place the walls are thick and the windows are small. This keeps the home cool inside.", S("Hot place: thick walls keep it cool.", P("b", 50, 62, "Hot place", "🛖", 3), ["su", "☀️", 50, 14, 2, "pulse"]))),
    CHK(tf("Thick walls can help keep a home cool in hot weather.", true, { hint: "Think about the hot place.", why: "Thick walls keep the heat out." })),
    SAY("Let us remember. Homes can be houses, flats, tents or mud-brick homes. People build homes to suit the weather.", SUM("A home is a place where we live and feel safe", "Homes can be houses, flats, tents or mud-brick homes", "People build homes to suit the weather")),
    GLOSS({ home: "A place where we live and feel safe.", flats: "Homes in a tall building. Each family has its own flat.", tents: "Homes made of cloth that can be packed up and moved.", weather: "Whether it is hot, cold, rainy, snowy or windy outside." }),
  ],
  mini: [
    mc("What is a flat?", "A home in a tall building", ["A very tall tree", "A kind of tent"], { hint: "Many families live in one building.", why: "A flat is one family's home inside a bigger building." }),
    tf("People who move from place to place may live in tents.", true, { hint: "Tents can be packed up.", why: "A tent is easy to carry." }),
    mc("Why do snowy places often have steep roofs?", "So the snow slides off", ["To catch more snow", "To look pretty"], { hint: "Think about heavy snow.", why: "Snow slides off a steep roof." }),
    mc("A home keeps us...", "Safe, warm and dry", ["Hungry", "Wet"], { hint: "Think about what a home is for.", why: "A home keeps us safe, warm and dry." }),
  ],
};

const farm = {
  id: "farm", kind: "try", title: "From farm to plate",
  blocks: [
    H("Stop 1: From seed to wheat"),
    SAY("Have you ever wondered where your roti comes from? It starts on a farm! A farmer plants wheat seeds in a field. The sun shines and the rain falls. The seeds grow into tall golden wheat. When the wheat is ready, the farmer cuts it. That is called the harvest.", T("A **farmer** grows food in a **field**.", "When the wheat is ready, the farmer cuts it. This is the **harvest**.")),
    SCENE("Seed to wheat", "farm",
      SS("First, the farmer plants a tiny seed in the field.", S("A seed is planted.", P("s", 50, 70, "Seed", "🌱", 2, "grow"), P("f", 20, 30, "Farmer", "🧑‍🌾", 2))),
      SS("The sun shines, the rain falls, and the seed grows into golden wheat.", S("The seed grows into wheat.", P("s", 50, 70, "Wheat", "🌾", 3, "grow"), P("f", 20, 30, "Farmer", "🧑‍🌾", 2), ["su", "☀️", 82, 18, 2, "pulse"])),
      SS("Then comes the harvest. The farmer cuts the wheat, with a tractor or a sickle.", S("Harvest time.", P("s", 50, 70, "Wheat", "🌾", 3), P("t", 22, 55, "Tractor", "🚜", 3, "bounce")))),
    CHK(mc("What do we call cutting the wheat when it is ready?", "The harvest", ["The mill", "The bake"], { hint: "It happens at the end of the growing time.", why: "Harvest means cutting the crop when it is ready." })),
    H("Stop 2: From wheat to roti"),
    SAY("Now the wheat goes on a journey. A lorry takes it to a mill. The mill grinds the wheat into a soft powder called flour. Then someone mixes the flour with water to make dough. The dough is rolled flat and cooked on a hot tawa. And now we have a roti, ready to eat!", T("The **mill** grinds wheat into **flour**.", "Flour and water make **dough**. Cooked dough becomes a roti.")),
    SCENE("Wheat to roti", "kitchen",
      SS("The wheat goes by lorry to the mill.", S("Wheat goes to the mill.", P("w", 20, 55, "Wheat", "🌾", 2), P("l", 60, 55, "Mill", "🏭", 3))),
      SS("The mill grinds the wheat into soft white flour.", S("The mill makes flour.", P("l", 20, 55, "Mill", "🏭", 2), P("fl", 60, 55, "Flour", "🥣", 3))),
      SS("Mix the flour with water to make dough, and cook it on the tawa. It puffs up into a warm roti!", S("Flour becomes dough, then roti.", P("fl", 18, 55, "Flour", "🥣", 2), P("r", 62, 55, "Roti", "🫓", 3, "pulse")))),
    ACT("My food journey", ["Paper and pencils", "A grown-up helper"], ["Pick a food you ate today: bread, egg, rice or milk.", "Ask a grown-up where it started, before it came to your plate.", "Draw the journey in 3 or 4 pictures, with arrows between them."]),
    CHK(mc("What does a mill make from wheat?", "Flour", ["Milk", "Rice"], { hint: "We mix it with water to make dough.", why: "The mill grinds wheat into flour." })),
    SAY("Let us remember. Farmers grow wheat. The mill makes flour. Flour and water make dough, and dough makes roti.", SUM("A farmer grows wheat in a field", "The mill grinds wheat into flour", "Flour and water make dough, and dough becomes roti")),
    GLOSS({ farmer: "A person who grows food or looks after animals on a farm.", field: "A big open space of land where crops grow.", harvest: "Cutting the crop when it is ready.", mill: "A place that grinds wheat into flour.", flour: "A soft powder made by grinding wheat.", dough: "Flour mixed with water, ready to cook." }),
  ],
  mini: [
    mc("Where does wheat grow?", "In a field", ["In a lift", "In the sea"], { hint: "Think of the farmer.", why: "Wheat grows in a farmer's field." }),
    mc("Which comes first?", "Planting the seed", ["Eating the roti", "Making the dough"], { hint: "It happens before everything else.", why: "A farmer plants the seed first." }),
    tf("Flour is made at the mill.", true, { hint: "The mill grinds wheat.", why: "The mill grinds the wheat into flour." }),
    mc("What do we mix with flour to make dough?", "Water", ["Sand", "Paint"], { hint: "It is a clear liquid we drink.", why: "Flour and water make dough." }),
  ],
};

const transport = {
  id: "transport", kind: "play", title: "Transport then and now",
  blocks: [
    H("Stop 1: Travelling long ago"),
    SAY("This old bicycle has seen many journeys. Bicycles are still used today.", PHOTO(BIKE, "An old black bicycle leaning against a weathered wall in a sunny lane", "An old bicycle. Many families used bicycles long ago, and some still do.", "Photo by Zoshua Colah on Unsplash")),
    SAY("How do you get to school? Maybe by car, by bus or on foot. Long ago, there were no cars. People walked, or rode on camels and horses. Others sat in carts pulled by animals. Then trains came, with big engines and long carriages. Later came cars, and then aeroplanes that fly across the sky.", T("Long ago, people travelled on foot or rode **camels** and horses.", "Then came trains and cars, and now aeroplanes. Ways of travelling are called **transport**.")),
    SCENE("Transport through time", "plain",
      SS("Long ago, people travelled by camel. A camel can carry heavy things across the desert.", S("Long ago: camels.", P("a", 50, 55, "Long ago", "🐪", 3))),
      SS("Then trains were built. A train can carry lots of people and things very far.", S("Then: trains.", P("a", 20, 55, "Long ago", "🐪", 2), P("b", 62, 55, "Then", "🚂", 3))),
      SS("After that came cars and buses. Today we also fly in aeroplanes. A very long journey takes only a few hours!", S("Today: cars and aeroplanes.", P("a", 12, 55, "Long ago", "🐪", 2), P("b", 38, 55, "Then", "🚂", 2), P("c", 62, 55, "Now", "🚗", 2), P("d", 86, 55, "Today", "✈️", 2, "float")))),
    CHK(mc("Which is the fastest way to travel a very long way?", "An aeroplane", ["A camel", "A bicycle"], { hint: "It flies through the sky.", why: "An aeroplane is the fastest for long journeys." })),
    CHK(tf("Camels were used for travel before aeroplanes were invented.", true, { hint: "Which is older?", why: "People rode camels long before aeroplanes." })),
    H("Stop 2: Brain game"),
    SAY("Time for a brain break! Find the matching pairs of things we use to travel.", T("Turn over two cards at a time. Can you find all the pairs?")),
    BRAIN("memory_match", "Pairs of transport", "Find the matching pairs.", ["🐪", "🚂", "🚗", "✈️", "🚲", "🚌"]),
    SAY("Let us remember. Long ago people used camels and carts. Then came trains and cars. Today we can fly.", SUM("Long ago people travelled on foot or by camel and horse", "Then came trains and cars", "Today we can fly in aeroplanes")),
    GLOSS({ camels: "Tall animals with humps that can carry people and heavy things across the desert.", transport: "The ways we travel from place to place." }),
  ],
  mini: [
    mc("Which animal helped people cross the desert long ago?", "A camel", ["A goldfish", "A penguin"], { hint: "It has a hump.", why: "Camels carry people and things across deserts." }),
    mc("Which came later?", "An aeroplane", ["A camel", "A horse cart"], { hint: "Think about what is newest.", why: "Aeroplanes are newer than camels and carts." }),
    tf("Trains can carry many people at once.", true, { hint: "Think of long carriages.", why: "A train has many carriages and carries many people." }),
    mc("What do we call all the ways of travelling?", "Transport", ["Weather", "Harvest"], { hint: "Cars, trains and planes are all examples.", why: "Ways of travelling are called transport." }),
  ],
};

const then = {
  id: "then", kind: "use", title: "Then and now",
  blocks: [
    H("Stop 1: Ask a grown-up"),
    SAY("Here is a secret way to find out about the past. Ask your grandparents, or an older person in your family! They remember what life was like when they were small. What they remember is called living memory. Their stories show us how life has changed.", T("Older people remember life **long ago**. This is **living memory**.", "Their stories show how life has changed.")),
    SAY("Here are a grandmother and a grandfather. They have so many stories to tell.", IMG("👵👴", "Grandparents remember what life was like long ago.")),
    SAY("Now it is your turn to think. What would you like to ask your grandparent? Have a think, then tap to see some ideas.", REVEAL("What could you ask a grandparent about when they were small?", "You could ask: How did you get to school? What games did you play? What food did you eat? Did you have a mobile phone?")),
    CHK(tf("Grandparents can tell us what life was like long ago.", true, { hint: "They remember when they were young.", why: "Older people remember, and their stories teach us about the past." })),
    H("Stop 2: What has changed?"),
    SAY("Lots of things have changed. When your grandparents were small, many families had only one telephone. It had a wire. Some had no television. Today we can talk to someone far away on a mobile phone. We can even see them on a screen! Some things have not changed at all. Families still share meals, and children still love to play.", T("Many things have **changed**. A telephone used to have a wire. Today we carry mobile phones.", "Some things stay the same: families share meals and children play.")),
    SAY("Look at these two telephones. One has a wire, and one fits in your pocket. That is how much things have changed!", IMG("📞📱", "A telephone with a wire long ago, and a mobile phone today.")),
    CHK(mc("Which is newer?", "A mobile phone", ["A telephone with a wire", "A letter by post"], { hint: "You can carry it in your pocket.", why: "Mobile phones are newer than wired telephones." })),
    SAY("Let us remember. Older people remember life long ago. Many things have changed, but some stay the same.", SUM("Older people remember life long ago", "Many things have changed", "Some things stay the same")),
    GLOSS({ "long ago": "A time that was many years before now.", "living memory": "What older people can remember from their own lives.", changed: "Became different from before." }),
  ],
  mini: [
    mc("Who can tell us what life was like long ago?", "Our grandparents", ["A mobile phone", "A tent"], { hint: "They are older than your parents.", why: "Grandparents remember the past." }),
    tf("Everything has changed since our grandparents were small.", false, { hint: "Do families still share meals?", why: "Some things, like sharing meals, stay the same." }),
    mc("What is living memory?", "What older people remember", ["A very old book", "A dream"], { hint: "It is about remembering.", why: "Living memory is what people remember from their own lives." }),
    mc("Which is a good question for a grandparent?", "How did you get to school?", ["Which planet is biggest?", "What is 2 + 2?"], { hint: "Ask about their life.", why: "Ask about their life when they were small." }),
  ],
};

const ALTS3 = [
  [mc("Ali says every home is a house. Is he right?", "No, homes can be flats, tents and other places", ["Yes, all homes are houses", "No, only tents are homes"], { hint: "Think of the four kinds of home.", why: "There are houses, flats, tents and mud-brick homes.", tag: "homes.kinds" }), mc("Mina says a flat is not a real home. Is she right?", "No, a flat is a home in a tall building", ["Yes, only houses are homes", "Yes, flats are shops"], { hint: "Families live in them.", why: "A flat is a real home.", tag: "homes.kinds" })],
  [sld("Slide to show how many kinds of home we met: house, flat, tent and mud-brick home.", { min: 0, max: 12 }, 4, 0, { hint: "Count them one by one.", why: "We met four kinds of home.", tag: "homes.count" }), sld("Slide to show how many things a roti needs from the field to the plate: farmer, mill, dough and cooking.", { min: 0, max: 12 }, 4, 0, { hint: "Count each step.", why: "There are four steps.", tag: "homes.count" })],
  [tf("All homes in the world are made from the same materials.", false, { hint: "Think of tents and brick houses.", why: "Homes are made from bricks, mud, cloth and more.", tag: "homes.materials" }), tf("A tent is made of cloth.", true, { hint: "It can be packed up.", why: "A tent is made of cloth.", tag: "homes.materials" })],
  [mat("Match each kind of home to a good point about it.", [["Tent", "Can be moved"], ["Flat", "Many families in one tall building"], ["Brick house", "Strong walls of baked clay"]], { hint: "Think about each home.", why: "Each home has its own good points.", tag: "homes.match" }), mat("Match each place to the home that suits it.", [["Snowy hills", "Steep roof"], ["Hot desert", "Thick walls"], ["Moving camp", "Tent"]], { hint: "Think about the weather.", why: "Homes suit the weather and the way people live.", tag: "homes.match" })],
  [mc("Which crop is ground into flour for roti?", "Wheat", ["Mangoes", "Spinach"], { hint: "A farmer grows it.", why: "Flour is made from wheat.", tag: "farm.source" }), mc("What does the mill grind wheat into?", "Flour", ["Rice", "Sugar"], { hint: "We use it to make dough.", why: "The mill grinds wheat into flour.", tag: "farm.source" })],
  [fill("Finish the sentence.", "A farmer {b1} rice in the field. The rice is cooked in the {b2}.", [["grows", "paints", "drives"], ["kitchen", "sky", "sea"]], { hint: "Think of food journeys.", why: "A farmer grows food and we cook it in a kitchen.", tag: "farm.fill" }), fill("Fill in the gaps.", "At harvest time the farmer {b1} the wheat. The wheat goes to the {b2}.", [["cuts", "sings to", "paints"], ["mill", "school", "moon"]], { hint: "The harvest is when the crop is ready.", why: "The farmer cuts the wheat and it goes to the mill.", tag: "farm.fill" })],
  [st("Which animal did people ride across the desert long ago? Write one word.", ["camel", "camels", "a camel"], { hint: "It has a hump.", why: "Camels carried people across deserts.", tag: "transport.old" }), st("Which animal pulled carts long ago? Write one word.", ["horse", "horses", "a horse", "bullock", "bullocks", "ox", "oxen"], { hint: "It could also be ridden.", why: "Horses and bullocks pulled carts.", tag: "transport.old" })],
  [hot("Tap the transport that is best for crossing the sea to another country.", [["🚲", "Bicycle", 22, 50], ["✈️", "Aeroplane", 50, 50], ["🛴", "Scooter", 78, 50]], ["Aeroplane"], { labels: true, hint: "It flies fast.", why: "An aeroplane is the best for a very long journey.", tag: "transport.fast" }), hot("Tap the transport that carries the most people at once.", [["🚌", "Bus", 22, 50], ["🚲", "Bicycle", 50, 50], ["🛴", "Scooter", 78, 50]], ["Bus"], { labels: true, hint: "It has lots of seats.", why: "A bus carries many people.", tag: "transport.fast" })],
  [mc("A family in a snowy place builds a house. What roof helps most?", "A steep roof", ["A flat glass roof", "No roof at all"], { hint: "Think about the snow.", why: "A steep roof lets the snow slide off.", tag: "homes.weather" }), mc("Why do hot places often have homes with thick walls?", "To keep the heat out", ["To keep the cold in", "To catch snow"], { hint: "Think about a hot day.", why: "Thick walls keep the heat out.", tag: "homes.weather" })],
  [mc("Why does wheat go to the mill?", "The mill grinds it into flour", ["The mill plants it again", "The mill makes it wet"], { hint: "We need flour for dough.", why: "The mill turns wheat into flour.", tag: "farm.reason" }), mc("Why do we mix flour with water?", "To make dough", ["To make wheat", "To make rice"], { hint: "Think of roti.", why: "Flour and water make dough.", tag: "farm.reason" })],
  [ms("Which two are ways people travelled long ago? Pick two.", ["On a camel", "In a horse cart"], ["In a jet plane", "On an electric scooter"], { hint: "Think about animals.", why: "People rode camels and used horse carts long ago.", tag: "transport.then" }), ms("Pick the two that people used long ago for travelling.", ["Walking", "Riding a horse"], ["Taking a rocket", "Using a modern bus"], { hint: "No machines yet.", why: "People walked and rode horses.", tag: "transport.then" })],
  [tf("Older people can tell us what life was like when they were young.", true, { hint: "They remember.", why: "Older people remember the past.", tag: "then.memory" }), tf("Only books can tell us about long ago.", false, { hint: "Think about your grandparents.", why: "People can tell us too.", tag: "then.memory" })],
  [mc("Ayesha's grandmother had no television when she was little. What does this tell us?", "Life was different long ago", ["Television was never invented", "Grandmothers do not like TV"], { hint: "Compare then and now.", why: "Things have changed since long ago.", tag: "then.reason" }), mc("Omar's grandfather read letters, not messages on a phone. What does this tell us?", "People talked to each other in different ways long ago", ["Phones never exist", "Letters are newer than phones"], { hint: "Compare then and now.", why: "The way people talk has changed.", tag: "then.reason" })],
  [ord("Arrange these ways of travelling, oldest first.", ["Walking", "Horse cart", "Steam train", "Jet plane"], { hint: "The newest is last.", why: "The order is walking, horse cart, steam train, jet plane.", tag: "then.order" }), ord("Order these, oldest first.", ["Letter on paper", "Telephone with a wire", "Mobile phone", "Video call"], { hint: "Think about what was invented first.", why: "Each one came later than the one before.", tag: "then.order" })],
];

const FARMORD = [ord("Order the steps from the field to the roti.", ["Wheat is planted", "Wheat is harvested", "Mill makes flour", "Roti is cooked"], { hint: "Start in the field.", why: "Plant, harvest, mill, cook.", tag: "farm.order" }), ord("Put the steps of making a roti in order.", ["Mix flour and water", "Roll the dough flat", "Cook it on the tawa", "Eat it"], { hint: "Start with the dough.", why: "Mix, roll, cook, eat.", tag: "farm.order" })];
const A3 = [0, 1, 2, 3, 4, 5, -1, 8, 9, 6, 7, 10, 11, 12, 13].map((i) => (i < 0 ? FARMORD : ALTS3[i]));

const clipT3 = {
  title: "Zainab asks about the past", backdrop: "town", caption: "Zainab asks her grandmother how homes and travel were different long ago.",
  scenes: [
    { caption: "A village.", say: "Zainab looks at a photograph of a village from above.",
      items: [{ id: "v", emoji: "🏘️", x: 50, y: 54, size: 3 }] },
    { caption: "Different homes.", say: "She sees houses, flats and a tent.",
      items: [{ id: "h", emoji: "🏠", x: 30, y: 58, size: 3 }, { id: "f", emoji: "🏢", x: 55, y: 54, size: 3 }, { id: "t", emoji: "⛺", x: 80, y: 60, size: 3 }] },
    { caption: "Grandma.", say: "Grandma remembers a mud-brick home from long ago.",
      items: [{ id: "g", emoji: "👵", label: "Grandma", x: 30, y: 58, size: 3 }, { id: "m", emoji: "🛖", x: 72, y: 58, size: 3 }] },
    { caption: "Then and now.", say: "She walked to school. Now Zainab rides a bus.",
      items: [{ id: "w", emoji: "🚶", x: 28, y: 60, size: 3 }, { id: "b", emoji: "🚌", x: 72, y: 58, size: 3, enter: "walk_left" }] },
    { caption: "Old bicycle.", say: "Grandpa once had an old bicycle like this one.",
      items: [{ id: "c", emoji: "🚲", x: 50, y: 56, size: 3, anim: "bounce" }] },
    { caption: "A roti.", say: "A farmer, a miller and a cook all help make roti.",
      items: [{ id: "f", emoji: "🌾", x: 25, y: 58, size: 3 }, { id: "r", emoji: "🫓", x: 75, y: 58, size: 3, anim: "pulse" }] },
    { caption: "A question.", say: "Zainab asks one more question about long ago.",
      items: [{ id: "q", emoji: "❓", x: 50, y: 50, size: 3, anim: "pulse" }] },
    { caption: "Learning.", say: "Older people can tell us how life used to be.",
      items: [{ id: "l", emoji: "💡", x: 50, y: 52, size: 3, effect: "sparkle" }] },
  ],
};

const t3 = topicLesson({
  slug: "general-knowledge-class-1-how-people-live", subject: "general-knowledge", cls: 1, topic: 3, title: "How People Live",
  summary: "Homes around the world, how food gets from the farm to our plate, and how travel and daily life have changed.",
  unit: "Topic 3: How people live", difficulty: 1,
  objectives: ["Describe different kinds of homes and why they differ", "Follow food from farm to plate", "Compare transport and life long ago with today"],
  success_criteria: ["I can name different kinds of homes", "I can tell the journey of a roti from the farm", "I can say how travel and life have changed"],
  real_life: "Seeing a farm or a mill, riding a bus or train, and asking grandparents what life was like when they were small.",
  standards: [
    { framework: "nc_england", code: "KS1 history", text: "Changes within living memory, where appropriate, aspects of change in national life" },
    { framework: "pk_ncc", code: "GK-01-E-01" },
    { framework: "pyp", code: "How we organise ourselves" },
  ],
  warm_up: [
    mc("Which direction does the Sun rise from?", "East", ["West", "North"], { hint: "Never Eat Soggy Waffles.", why: "The Sun rises in the east." }),
    mc("What is the capital city of Pakistan?", "Islamabad", ["Karachi", "London"], { hint: "It is in the north.", why: "Islamabad is the capital." }),
    tf("The Earth spins round once every 24 hours.", true, { hint: "That is one day.", why: "One spin takes about 24 hours." }),
  ],
  intro: [],
  subs: [homes, farm, transport, then],
  clip: clipT3,
  quiz: [
    { q: mc("Fatima says every home is a house. Is she right?", "No, homes can be flats, tents and other places", ["Yes, every home is a house", "No, only tents are homes"], { hint: "Think of the four kinds of home.", why: "There are houses, flats, tents and mud-brick homes.", tag: "homes.kinds" }), sub: "homes", depth: "reason" },
    { q: sld("Slide to show how many kinds of home we met in the lesson.", { min: 0, max: 12 }, 4, 0, { hint: "House, flat, tent and mud-brick home.", why: "We met four kinds of home.", tag: "homes.count" }), sub: "homes", depth: "recall" },
    { q: tf("All homes in the world are made from the same thing.", false, { hint: "Think of a tent and a brick house.", why: "Homes are made from bricks, mud, cloth and more.", tag: "homes.materials" }), sub: "homes", depth: "recall" },
    { q: mat("Match each home to its good point.", [["Tent", "Can be moved"], ["Flat", "Many families in one tall building"], ["Mud-brick home", "Mud keeps it cool"]], { hint: "Think about each home.", why: "Each home has its own good points.", tag: "homes.match" }), sub: "homes", depth: "apply" },
    { q: mc("Where does the flour for roti come from?", "Wheat", ["Rice", "Eggs"], { hint: "A farmer grows it.", why: "Flour is made from wheat.", tag: "farm.source" }), sub: "farm", depth: "recall" },
    { q: fill("Complete the sentence.", "A farmer {b1} wheat in the field. The wheat is ground into {b2} at the mill.", [["grows", "paints", "drives"], ["flour", "sugar", "milk"]], { hint: "Think of the journey to the roti.", why: "A farmer grows wheat and the mill makes flour.", tag: "farm.fill" }), sub: "farm", depth: "apply" },
    { q: ord("Put the journey of a roti in order.", ["Farmer grows wheat", "Mill makes flour", "Cook makes dough", "We eat the roti"], { hint: "Start on the farm.", why: "Wheat, flour, dough, roti.", tag: "farm.order" }), sub: "farm", depth: "apply" },
    { q: mc("Why is a steep roof a good idea in a snowy place?", "So the snow slides off", ["To catch more snow", "To make the house taller"], { hint: "Think about heavy snow.", why: "Snow slides off a steep roof.", tag: "homes.weather" }), sub: "homes", depth: "reason" },
    { q: mc("Why does wheat have to go to the mill before we can make roti?", "The mill grinds it into flour", ["The mill plants it", "The mill makes it wet"], { hint: "We need flour for dough.", why: "The mill turns wheat into flour.", tag: "farm.reason" }), sub: "farm", depth: "reason" },
    { q: st("Which animal carried people across the desert long ago? Write one word.", ["camel", "camels", "a camel"], { hint: "It has a hump.", why: "Camels carried people across deserts.", tag: "transport.old" }), sub: "transport", depth: "apply" },
    { q: hot("Tap the transport that is fastest for a very long journey.", [["🚲", "Bicycle", 22, 50], ["✈️", "Aeroplane", 50, 50], ["🐪", "Camel", 78, 50]], ["Aeroplane"], { labels: true, hint: "It flies.", why: "An aeroplane is the fastest for long journeys.", tag: "transport.fast" }), sub: "transport", depth: "apply" },
    { q: ms("Which two were ways of travelling long ago? Pick two.", ["On a camel", "In a horse cart"], ["In a jet plane", "On an electric scooter"], { hint: "Think of animals.", why: "People rode camels and used horse carts.", tag: "transport.then" }), sub: "transport", depth: "apply" },
    { q: tf("Older relatives remember what life was like when they were young.", true, { hint: "They remember.", why: "Older people remember the past.", tag: "then.memory" }), sub: "then", depth: "recall" },
    { q: mc("Ali's grandpa had no mobile phone when he was young. What does this tell us?", "Life was different long ago", ["Mobile phones are old", "Grandpas do not like phones"], { hint: "Compare then and now.", why: "Things have changed since long ago.", tag: "then.reason" }), sub: "then", depth: "reason" },
    { q: ord("Put these in order, oldest way to travel first.", ["Walking", "Horse cart", "Train", "Aeroplane"], { hint: "The newest is last.", why: "Walking, horse cart, train, aeroplane.", tag: "then.order" }), sub: "then", depth: "apply" },
    // ----- upgrade: 15 new mains (q16-q30), 1 variant each
    { q: sld("A block of flats has 3 floors with 2 flats on each floor. Slide to show how many flats there are.", { min: 0, max: 12 }, 6, 0, { hint: "Count 2, 4, 6.", why: "3 floors with 2 flats each is 6 flats.", tag: "homes.flats" }), sub: "homes", depth: "apply", alts: [sld("A block of flats has 4 floors with 2 flats on each floor. Slide to show how many flats there are.", { min: 0, max: 12 }, 8, 0, { hint: "Count 2, 4, 6, 8.", why: "4 floors with 2 flats each is 8 flats.", tag: "homes.flats" })] },
    { q: mc("Hira says all roofs look alike from above. Is she right?", "No, roofs can have different shapes and colours", ["Yes, every roof looks the same", "Yes, roofs are always round"], { hint: "Think about the photograph of a village from above.", why: "From above we can see roofs of many shapes and colours.", tag: "homes.reason" }), sub: "homes", depth: "reason", alts: [mc("Imran says an aerial photograph shows the front doors of houses. Is he right?", "No, it shows the tops of the houses, such as the roofs", ["Yes, it shows every front door", "Yes, it shows inside the rooms"], { hint: "An aerial photograph is taken from high above.", why: "From above we see roofs, roads and gardens, not doors.", tag: "homes.reason" })] },
    { q: mat("Match each home to where it might be found.", [["Tall block of flats", "a big city"], ["Farmhouse", "the countryside"], ["Houseboat", "a river or lake"], ["Tent", "a camp that moves"]], { hint: "Think about where each one fits.", why: "Different homes suit different places.", tag: "homes.places" }), sub: "homes", depth: "apply", alts: [mat("Join each home to the place that suits it.", [["Mud-brick house", "a hot, dry village"], ["Flat", "a busy town"], ["House on stilts", "a place with floods"], ["Houseboat", "a river"]], { hint: "Think about the weather and land.", why: "Each home suits its place.", tag: "homes.places" })] },
    { q: mc("Which home is best in a place where floods often happen?", "A house on stilts", ["A house dug into sand", "A paper tent"], { hint: "Think about keeping the floor dry.", why: "A house on stilts stays above the water.", tag: "homes.flood" }), sub: "homes", depth: "apply", alts: [mc("Which roof is best for a place with lots of rain?", "A sloping roof", ["A flat paper roof", "A roof with holes"], { hint: "Think about where the rain runs.", why: "A sloping roof lets the rain run off.", tag: "homes.rain" })] },
    { q: fill("Fill in the gaps about bread.", "A baker uses {b1} to make bread. The bread is sold in a {b2}.", [["flour", "stones", "paint"], ["shop", "river", "tree"]], { hint: "Think of the roti journey.", why: "A baker uses flour, and bread is sold in a shop.", tag: "farm.baker" }), sub: "farm", depth: "apply", alts: [fill("Fill in the gaps about the market.", "A farmer sells vegetables at the {b1}. People pay with {b2}.", [["market", "moon", "sea"], ["money", "leaves", "sand"]], { hint: "Think about a busy market.", why: "A farmer sells at the market, and people pay with money.", tag: "farm.market" })] },
    { q: mc("Sami says food just appears in the shop. Is he right?", "No, many people work to grow, carry and sell food", ["Yes, food grows in the shop", "Yes, shops make all the food alone"], { hint: "Think about the journey of a roti.", why: "Farmers, millers, drivers and shopkeepers all help.", tag: "farm.reason" }), sub: "farm", depth: "reason", alts: [mc("Hamza says only the farmer is needed to make roti. Is he right?", "No, the miller and the cook are needed too", ["Yes, only the farmer", "Yes, roti makes itself"], { hint: "Wheat must become flour first.", why: "The farmer, miller and cook all help.", tag: "farm.reason" })] },
    { q: st("Write the name of the person who grows wheat. It starts with F.", ["farmer", "a farmer", "the farmer"], { hint: "They work in the field.", why: "A farmer grows wheat.", tag: "farm.farmer" }), sub: "farm", depth: "recall", alts: [st("Write the name of the place where wheat is ground into flour. It starts with M.", ["mill", "a mill", "the mill"], { hint: "It has big grinding stones or machines.", why: "Wheat is ground into flour at the mill.", tag: "farm.mill" })] },
    { q: hot("Tap the transport that has two wheels and pedals.", [["🚲", "Bicycle", 22, 50], ["🚌", "Bus", 50, 50], ["🚂", "Train", 78, 50]], ["Bicycle"], { labels: true, hint: "You push it with your feet.", why: "A bicycle has two wheels and pedals.", tag: "transport.bike" }), sub: "transport", depth: "recall", alts: [hot("Tap the transport that runs on rails.", [["🚂", "Train", 22, 50], ["🚲", "Bicycle", 50, 50], ["🛵", "Scooter", 78, 50]], ["Train"], { labels: true, hint: "It follows a track.", why: "A train runs on rails.", tag: "transport.train" })] },
    { q: ms("Which two do not need fuel? Pick two.", ["A bicycle", "Walking"], ["A car", "A bus"], { hint: "You move them with your own legs.", why: "A bicycle and walking need your own energy, not fuel.", tag: "transport.fuel" }), sub: "transport", depth: "apply", alts: [ms("Which two use an engine? Pick two.", ["A bus", "A motorbike"], ["A bicycle", "A camel"], { hint: "They run on fuel.", why: "A bus and a motorbike have engines.", tag: "transport.engine" })] },
    { q: mc("Anwar says a camel is faster than an aeroplane. Is he right?", "No, an aeroplane is much faster", ["Yes, a camel is faster", "Yes, they travel at the same speed"], { hint: "Think about a very long journey.", why: "An aeroplane flies far faster than a camel walks.", tag: "transport.reason" }), sub: "transport", depth: "reason", alts: [mc("Bilal says people always travelled by car. Is he right?", "No, long ago people walked or rode animals", ["Yes, cars are very old", "Yes, there were no other ways"], { hint: "Think about camels and horse carts.", why: "Cars are new. Long ago people used animals and walked.", tag: "transport.reason" })] },
    { q: sld("Ali is 7 and his grandpa is 67. Slide to show how many years older Grandpa is.", { min: 0, max: 100 }, 60, 0, { hint: "Take 7 away from 67.", why: "67 take away 7 is 60.", tag: "then.age" }), sub: "then", depth: "apply", alts: [sld("Ali is 7 and his grandma is 57. Slide to show how many years older Grandma is.", { min: 0, max: 100 }, 50, 0, { hint: "Take 7 away from 57.", why: "57 take away 7 is 50.", tag: "then.age" })] },
    { q: mc("Zara says nothing has changed since her grandmother was little. Is she right?", "No, phones, cars and many other things are different now", ["Yes, everything is the same", "Yes, nothing is new"], { hint: "Compare then and now.", why: "Many things have changed in a lifetime.", tag: "then.reason" }), sub: "then", depth: "reason", alts: [mc("Omar says old photos show us nothing about the past. Is he right?", "No, old photos show how people lived", ["Yes, they show nothing", "Yes, they are only pictures of the sky"], { hint: "Think about clothes and buildings.", why: "Old photos give clues about the past.", tag: "then.reason" })] },
    { q: mc("Which question can we ask a grown-up about the past?", "What was your school like when you were little?", ["What is the weather tomorrow?", "How many stars are there?"], { hint: "It is about long ago.", why: "A grown-up can tell us how school used to be.", tag: "then.ask" }), sub: "then", depth: "apply", alts: [mc("Which is a good question about long ago?", "How did you travel to school as a child?", ["What will you eat tomorrow?", "How tall is the Moon?"], { hint: "It asks about their past.", why: "It asks about life long ago.", tag: "then.ask" })] },
    { q: mc("Which of these does a farmer grow?", "Wheat", ["Plastic", "Bricks"], { hint: "It becomes flour.", why: "A farmer grows wheat.", tag: "farm.grow" }), sub: "farm", depth: "recall", alts: [mc("Which of these is made at a mill?", "Flour", ["Rice", "Milk"], { hint: "It is ground from wheat.", why: "Flour is made at the mill.", tag: "farm.flour" })] },
    { q: mc("Farhan says asking grown-ups is no good for finding out about the past. Is he right?", "No, grown-ups remember and can tell us", ["Yes, they never remember", "Yes, only books are useful"], { hint: "Think about your grandparents.", why: "Older people remember the past and can tell us.", tag: "then.reason" }), sub: "then", depth: "reason", alts: [mc("Mina says old things in a museum cannot tell us about the past. Is she right?", "No, they show how people lived long ago", ["Yes, they tell us nothing", "Yes, they are only for decoration"], { hint: "Think about old tools and toys.", why: "Old things are clues about the past.", tag: "then.reason" })] },
  ].map((x, i) => ({ ...x, alts: x.alts ?? A3[i] })),
});

// ====================================================================================================
// Topic 4: Caring for our world
// ====================================================================================================

const SPARROWS = "general-knowledge-class-1-caring-for-our-world-1-9521290a.jpg";
const SPROUT = "general-knowledge-class-1-caring-for-our-world-2-1d64271a.jpg";
const BINS = "general-knowledge-class-1-caring-for-our-world-3-4efa6994.jpg";
const animals = {
  id: "animals", kind: "learn", title: "Animals in danger",
  blocks: [
    H("Welcome, kind friend!"),
    SAY("Today we ask a big question. How can we care for our world?", T("Today's big question: how can we care for animals, nature and each other?")),
    SAY("Two sparrows visit a feeder. Caring for animals is a kind thing to do.", PHOTO(SPARROWS, "Two small brown and grey sparrows perched on a hanging bird feeder full of seed", "Two sparrows at a bird feeder. Feeding birds is a kind act.", "Photo by Damien Campbell on Unsplash")),
    H("Stop 1: What is endangered?"),
    SAY("Some animals are in danger of disappearing for ever. We say they are endangered, because there are very few left. Why does this happen? Often, because their home is cut down, built over or made dirty. An animal's home is called its habitat. If the habitat goes, the animals have nowhere to live.", T("An animal is **endangered** when there are very few left.", "An animal's home is called its **habitat**. Animals are in danger when their habitat is lost.")),
    SCENE("A habitat shrinks", "forest",
      SS("Here is a forest, full of trees. It is the habitat of a deer and a bird. They have plenty of space.", S("A healthy forest habitat.", P("t1", 20, 30, "Tree", "🌳", 2), P("t2", 50, 25, "Tree", "🌳", 2), P("t3", 80, 30, "Tree", "🌳", 2), P("d", 35, 70, "Deer", "🦌", 2), P("b", 70, 70, "Bird", "🐦", 2, "float"))),
      SS("Then the trees are cut down for building. There is less food and fewer places to hide.", S("Trees are cut down.", P("t3", 80, 30, "Tree", "🌳", 2), P("d", 35, 70, "Deer", "🦌", 2), P("b", 70, 70, "Bird", "🐦", 2, "float"), P("c", 25, 25, "Building", "🏗️", 2))),
      SS("Soon the habitat is gone, and the animals have nowhere to live. That is why we must look after nature.", S("The habitat is gone.", P("c", 25, 25, "Building", "🏗️", 2), P("s", 60, 55, "No home", "😟", 2)))),
    CHK(mc("What does it mean when an animal is endangered?", "There are very few left", ["It is very big", "It lives in a zoo"], { hint: "It could disappear for ever.", why: "Endangered animals are at risk of disappearing." })),
    H("Stop 2: Animals of Pakistan"),
    SAY("Pakistan has wonderful wild animals. The snow leopard lives high in the northern mountains. The Indus river dolphin swims in the Indus river. It is one of the rarest dolphins in the world. And the markhor, a mountain goat with twisty horns, is Pakistan's national animal. People are working hard to protect them.", T("The snow leopard lives in the northern mountains.", "The Indus river dolphin lives in the **Indus** river. The markhor is Pakistan's national animal.")),
    IMG("🐆🐬🐐", "A snow leopard, an Indus river dolphin and a markhor are animals of Pakistan that need our help."),
    CHK(tf("The snow leopard lives in a hot desert.", false, { hint: "Think of the word snow.", why: "Snow leopards live in cold mountains." })),
    H("Stop 3: How can we help?"),
    SAY("Even a seven-year-old can help animals. We can plant trees, which give animals homes. We can keep rivers and mountains clean by not leaving litter. And we can learn, and tell others, about animals that need help.", T("We can help animals by planting trees and not dropping litter.")),
    IMG("🌳🐦", "Planting trees gives birds and other animals a home."),
    CHK(mc("Which one helps animals?", "Planting a tree", ["Dropping litter", "Cutting down a forest"], { hint: "Think about giving animals a home.", why: "Trees are homes for animals." })),
    SAY("Let us remember. Endangered animals are in danger of disappearing. Habitat loss is a big reason. We can help by planting trees and keeping nature clean.", SUM("Endangered animals are in danger of disappearing", "Losing their habitat is a big reason", "We can help by planting trees and keeping nature clean")),
    GLOSS({ endangered: "Having very few left, and in danger of disappearing.", habitat: "The natural home of an animal.", Indus: "A very long river in Pakistan." }),
  ],
  mini: [
    mc("What is a habitat?", "An animal's natural home", ["A kind of food", "A pet shop"], { hint: "It is where animals live.", why: "A habitat is where an animal lives." }),
    tf("The Indus river dolphin swims in a river in Pakistan.", true, { hint: "Think of the Indus.", why: "It lives in the Indus river." }),
    mc("What is Pakistan's national animal?", "The markhor", ["The penguin", "The polar bear"], { hint: "A mountain goat with twisty horns.", why: "The markhor is Pakistan's national animal." }),
    mc("Cutting down a forest is bad for animals because...", "They lose their home", ["They get more food", "They like noise"], { hint: "Think about habitat.", why: "The animals lose their habitat." }),
  ],
};

const nature = {
  id: "nature", kind: "try", title: "Protecting nature",
  blocks: [
    H("Stop 1: Reduce, reuse, recycle"),
    SAY("These coloured bins help us sort our rubbish. Look at the four colours.", PHOTO(BINS, "Four coloured bins, yellow, blue, red and green, standing in a row by a grey wall", "Coloured bins help us sort our rubbish and recycling.", "Photo by Pawel Czerwinski on Unsplash")),
    SAY("There are three magic words to help our world. Reduce means use less. Reuse means use something again, instead of throwing it away. And recycle means turn old things into new things. Let us follow a plastic bottle. It goes into the recycling bin. Then it goes to a factory, where it is made into something new.", T("**Reduce** means use less. **Reuse** means use again.", "**Recycle** means make old things into new things.")),
    SCENE("A bottle is recycled", "town",
      SS("We finish our drink. Instead of dropping the bottle, we put it in the recycling bin.", S("The bottle goes in the recycling bin.", P("b", 25, 55, "Bottle", "🧴", 2), P("r", 70, 55, "Recycling bin", "♻️", 3))),
      SS("A lorry takes it to a factory.", S("A lorry takes it away.", P("l", 30, 55, "Lorry", "🚚", 3, "bounce"), P("f", 75, 55, "Factory", "🏭", 3))),
      SS("At the factory the bottle is melted. It is made into something new, like a toy. That is recycling!", S("It becomes something new.", P("f", 25, 55, "Factory", "🏭", 2), P("n", 70, 55, "Something new", "🧸", 3, "pulse")))),
    CHK(mc("What does recycle mean?", "Make old things into new things", ["Throw things in the sea", "Buy more things"], { hint: "Think of the bottle's journey.", why: "To recycle is to turn old things into new things." })),
    H("Stop 2: Little things at home"),
    SAY("A tiny seedling grows in the soil. Planting seeds helps nature.", PHOTO(SPROUT, "A tiny green seedling with small leaves growing out of dark soil", "A tiny seedling grows in soil. We can plant seeds to help nature.", "Photo by Elly M on Unsplash")),
    SAY("There are lots of small ways to help. Turn off the tap while you brush your teeth, to save water. Switch off the light when you leave a room, to save energy. Put litter in a bin. And use both sides of the paper. If everyone does little things, it adds up to a big change!", T("Saving water and **energy** helps our world.", "Put litter in a bin and use both sides of paper.")),
    IMG("💧💡🗑️", "Turning off taps and lights and using a bin all help our world."),
    ACT("Be a litter detective", ["A grown-up helper", "A bag", "Gloves"], ["Walk round your garden or street with a grown-up.", "Wearing gloves, pick up the litter you can see. Never touch glass or sharp things.", "Sort it: what could be recycled, and what must go in the bin?", "Count the pieces. How can we make less litter?"]),
    CHK(mc("Which saves water?", "Turning off the tap while brushing teeth", ["Leaving the tap running", "Washing the car every day"], { hint: "Do not let it run for nothing.", why: "Turning off the tap saves water." })),
    SAY("Let us remember. Reduce, reuse and recycle. Save water and energy. And put litter in a bin.", SUM("Reduce means use less, reuse means use again", "Recycle means make old things into new things", "Save water and energy, and put litter in a bin")),
    GLOSS({ reduce: "To use less of something.", reuse: "To use something again.", recycle: "To turn old things into new things.", energy: "The power that makes lights and machines work." }),
  ],
  mini: [
    mc("What does reuse mean?", "Use something again", ["Throw it away", "Buy it twice"], { hint: "Think of using a jar again.", why: "To reuse is to use again." }),
    mc("Where should an empty plastic bottle go?", "In the recycling bin", ["In a river", "On the road"], { hint: "It can be made into something new.", why: "Plastic can be recycled." }),
    tf("Switching off lights saves energy.", true, { hint: "Lights use energy when they are on.", why: "Switching off a light saves energy." }),
    mc("Which is an example of reduce?", "Using less paper", ["Buying more toys", "Throwing paper on the floor"], { hint: "Reduce means use less.", why: "Using less paper is reducing." }),
  ],
};

const eid = {
  id: "eid", kind: "play", title: "Eid and celebrations",
  blocks: [
    H("Stop 1: Eid ul-Fitr"),
    SAY("A celebration is a special day when families are happy together. One of the happiest celebrations for Muslims is Eid ul-Fitr. It comes right after the month of Ramadan. On Eid, families wear their best clothes. They pray the Eid prayer at the masjid. They eat special food and visit each other. Children often get gifts. And people share with others who may have less.", T("**Eid ul-Fitr** comes after Ramadan.", "Families pray, wear new clothes, share food and visit each other.")),
    SCENE("Eid morning", "town",
      SS("Eid morning! Families walk to the masjid to pray together.", S("Families go to the masjid.", P("m", 50, 40, "Masjid", "🕌", 3), P("f", 25, 70, "Family", "👨‍👩‍👧", 2, "bounce"))),
      SS("After the prayer, families visit each other. They hug and say Eid Mubarak, which means have a blessed Eid.", S("Families visit each other.", P("m", 50, 30, "Masjid", "🕌", 2), P("f", 22, 70, "Family", "👨‍👩‍👧", 2), P("g", 70, 70, "Friends", "🧑‍🤝‍🧑", 2, "bounce"), ["h", "💛", 50, 70, 1, "pulse"])),
      SS("There is delicious food, sweets and gifts. We share them with neighbours and people who need help.", S("Food and gifts to share.", P("s", 25, 55, "Sweets", "🍬", 2), P("gi", 50, 55, "Gifts", "🎁", 2), P("fo", 75, 55, "Food", "🍲", 2)))),
    CHK(mc("When does Eid ul-Fitr come?", "After Ramadan", ["Before Ramadan", "In the summer holidays"], { hint: "Ramadan is the month of fasting.", why: "Eid ul-Fitr comes after Ramadan." })),
    H("Stop 2: Other special days"),
    SAY("There is a second Eid too, called Eid ul-Adha. It comes in the month of Dhul Hijjah. Families share food with relatives, neighbours and people in need. In Pakistan we also celebrate Independence Day on the fourteenth of August. There are flags, green and white everywhere. Other families celebrate other special days, like Christmas or Diwali. We respect everyone's celebrations and are kind to all.", T("**Eid ul-Adha** comes in Dhul Hijjah. Families share food with others.", "Independence Day in Pakistan is on 14 August.", "We respect everyone's special days.")),
    IMG("🇵🇰🎆", "Pakistan celebrates Independence Day on 14 August with flags and fireworks."),
    CHK(mc("When is Independence Day in Pakistan?", "14 August", ["1 January", "31 December"], { hint: "It is in the summer.", why: "Independence Day is on 14 August." })),
    H("Stop 3: Brain game"),
    SAY("Time for a brain break! Match the pairs of celebration things.", T("Turn over two cards at a time. Can you find all the pairs?")),
    BRAIN("memory_match", "Celebration pairs", "Find the matching pairs.", ["🌙", "🕌", "🎁", "🍬", "🇵🇰", "🎆"]),
    SAY("Let us remember. Eid ul-Fitr comes after Ramadan. Eid ul-Adha comes in Dhul Hijjah. We share and respect everyone's celebrations.", SUM("Eid ul-Fitr comes after Ramadan", "Eid ul-Adha comes in Dhul Hijjah", "We share with others and respect everyone's celebrations")),
    GLOSS({ "Eid ul-Fitr": "The celebration after the month of Ramadan.", "Eid ul-Adha": "The celebration in the month of Dhul Hijjah.", celebration: "A special day when people are happy together." }),
  ],
  mini: [
    mc("What do families often say on Eid?", "Eid Mubarak", ["Good night", "Happy Christmas"], { hint: "It means have a blessed Eid.", why: "Eid Mubarak is the Eid greeting." }),
    tf("Families share food on Eid.", true, { hint: "Think about neighbours.", why: "Sharing is part of Eid." }),
    mc("Which month comes just before Eid ul-Fitr?", "Ramadan", ["Muharram", "Rajab"], { hint: "It is the month of fasting.", why: "Ramadan comes just before Eid ul-Fitr." }),
    mc("How do we treat other people's celebrations?", "With respect", ["We laugh at them", "We ignore them"], { hint: "Think about being kind.", why: "We respect everyone's special days." }),
  ],
};

const kind = {
  id: "kind", kind: "use", title: "Kindness",
  blocks: [
    H("Stop 1: What is kindness?"),
    SAY("Being kind is the most important thing of all. Kindness means caring about how other people feel, and helping them. We can be kind by sharing and by saying please and thank you. We can help someone who is stuck. We can include a child who is alone. Look at what happens in this story.", T("**Kindness** means caring about how other people feel.", "We can share, help and include others.")),
    SCENE("A kind friend", "classroom",
      SS("Sara sits alone at lunch. She looks a little sad.", S("Sara sits alone.", P("s", 30, 60, "Sara", "🧒", 3))),
      SS("Her classmate Aisha notices. She walks over and says, may I sit with you?", S("Aisha walks over.", P("s", 30, 60, "Sara", "🧒", 3), P("a", 75, 60, "Aisha", "👧", 3, "bounce"))),
      SS("They share an apple and chat. Sara smiles. A small kind thing made a big difference.", S("They share and smile.", P("s", 30, 60, "Sara", "🧒", 3), P("a", 50, 60, "Aisha", "👧", 3), ["ap", "🍎", 40, 35, 1, "float"], ["h", "💛", 42, 20, 2, "pulse"]))),
    CHK(mc("What did Aisha do?", "She was kind and included Sara", ["She ignored Sara", "She took Sara's apple"], { hint: "Aisha walked over.", why: "Aisha included Sara, which was kind." })),
    H("Stop 2: Kind to everyone and everything"),
    SAY("We can be kind to people, to animals and to our planet. Fill a bowl with water for the birds. Look after the plants. Be gentle with animals. And when we are kind, we feel happy too.", T("We can be kind to people, animals and our planet.")),
    IMG("🐦💧", "A bowl of water for the birds is a kind thing to do."),
    REVEAL("What is one kind thing you could do today?", "Many answers are good: share a toy, help at home, say thank you, put water out for a bird, or smile at someone who looks sad."),
    CHK(tf("Being kind makes other people feel better.", true, { hint: "Think about Sara.", why: "Kindness makes people feel happy and cared for." })),
    SAY("Let us remember. Kindness means caring about others. We can be kind to people, animals and our planet.", SUM("Kindness means caring about how others feel", "We can be kind to people, animals and the planet")),
    GLOSS({ kindness: "Caring about how other people feel and helping them.", kind: "Caring and helpful." }),
  ],
  mini: [
    mc("Which is a kind thing to do?", "Share your snack", ["Take someone's toy", "Ignore a friend"], { hint: "Think about helping.", why: "Sharing is kind." }),
    tf("Only grown-ups can be kind.", false, { hint: "Think about Aisha.", why: "Children can be kind too." }),
    mc("A child is crying. What could you do?", "Ask if they are OK and help", ["Walk away", "Laugh"], { hint: "Care about how they feel.", why: "Kind people help." }),
    mc("How can we be kind to birds?", "Put out water for them", ["Throw stones", "Chase them"], { hint: "Think about helping.", why: "Water helps birds on hot days." }),
  ],
};

const ALTS4 = [
  [mc("An animal has very few left in the world. What do we call it?", "Endangered", ["Healthy", "Common"], { hint: "It may disappear.", why: "Endangered means very few are left.", tag: "animals.endangered" }), mc("What is the word for an animal that could disappear for ever?", "Endangered", ["Friendly", "Hungry"], { hint: "There are very few.", why: "Endangered animals could disappear.", tag: "animals.endangered" })],
  [tf("The markhor is Pakistan's national animal.", true, { hint: "A mountain goat.", why: "The markhor is the national animal.", tag: "animals.pakistan" }), tf("Snow leopards live in rivers.", false, { hint: "They live in the mountains.", why: "Snow leopards live in cold mountains.", tag: "animals.pakistan" })],
  [ms("Pick the two things that can put animals in danger.", ["Cutting down forests", "Dirty water"], ["Planting trees", "Keeping rivers clean"], { hint: "Think about bad things for habitats.", why: "Losing habitat and pollution are dangers.", tag: "animals.causes" }), ms("Which two can put animals at risk?", ["Building over their homes", "Dropping litter"], ["Giving them water", "Planting flowers"], { hint: "Think about their home.", why: "Habitat loss and litter harm animals.", tag: "animals.causes" })],
  [hot("Tap the animal that lives in the Indus river.", [["🐬", "Indus river dolphin", 22, 50], ["🐧", "Penguin", 50, 50], ["🦁", "Lion", 78, 50]], ["Indus river dolphin"], { labels: true, hint: "It swims in a river.", why: "The Indus river dolphin lives in the Indus.", tag: "animals.where" }), hot("Tap the animal with twisty horns that lives in the mountains.", [["🐐", "Markhor", 22, 50], ["🐳", "Whale", 50, 50], ["🦆", "Duck", 78, 50]], ["Markhor"], { labels: true, hint: "It is Pakistan's national animal.", why: "The markhor has twisty horns.", tag: "animals.where" })],
  [ord("Put the recycling journey in order, from the bin to something new.", ["Bin", "Lorry", "Factory", "New toy"], { hint: "Start at the bin.", why: "Bin, lorry, factory, new toy.", tag: "nature.order" }), ord("Order the recycling journey.", ["We drink and finish", "Bottle in recycling bin", "Bottle melted", "New thing made"], { hint: "Start with the drink.", why: "Drink, bin, melt, new thing.", tag: "nature.order" })],
  [mc("Where should an empty can go?", "In the recycling bin", ["In the river", "Under a bush"], { hint: "It can be made into something new.", why: "Cans can be recycled.", tag: "nature.bin" }), mc("What is the best thing to do with an empty plastic bottle?", "Recycle it", ["Throw it on the road", "Bury it in the garden"], { hint: "Make it something new.", why: "Bottles can be recycled.", tag: "nature.bin" })],
  [fill("Finish the sentence.", "Recycle means to make old things into {b1} things. Reduce means to use {b2}.", [["new", "old", "dirty"], ["less", "more", "twice"]], { hint: "Think about the magic words.", why: "Recycle makes new things. Reduce means use less.", tag: "nature.fill" }), fill("Complete the sentence.", "Reuse means to use something {b1}. Saving {b2} means not wasting it.", [["again", "never", "less"], ["water", "stones", "noise"]], { hint: "Think about the magic words.", why: "Reuse means use again. We can save water.", tag: "nature.fill" })],
  [st("What do we do with an old bottle so it becomes a new thing? Write one word.", ["recycle", "recycling", "we recycle"], { hint: "Starts with R and the bin has the sign.", why: "We recycle it.", tag: "nature.word" }), st("What word means to use something again? Write one word.", ["reuse", "re-use", "we reuse"], { hint: "Starts with R.", why: "Reuse means use again.", tag: "nature.word" })],
  [mat("Match each day to when it comes.", [["Eid ul-Fitr", "After Ramadan"], ["Eid ul-Adha", "In Dhul Hijjah"], ["Independence Day", "14 August"]], { hint: "Think about each celebration.", why: "Each has its own time.", tag: "eid.when" }), mat("Match each celebration to its place or time.", [["Eid prayer", "At the masjid"], ["Independence Day", "14 August"], ["Eid ul-Fitr", "After Ramadan"]], { hint: "Think about each one.", why: "Each has its own time and place.", tag: "eid.when" })],
  [mc("Why do people give gifts and share food at Eid?", "To share joy and be kind", ["To be noisy", "Because they have to"], { hint: "Think about sharing.", why: "Sharing at Eid spreads joy and kindness.", tag: "eid.reason" }), mc("Why do we say Eid Mubarak to each other?", "To wish each other a blessed Eid", ["To say goodbye", "To ask the time"], { hint: "It is a greeting.", why: "It means have a blessed Eid.", tag: "eid.reason" })],
  [sld("Slide to show how many Eid celebrations Muslims have each year: Eid ul-Fitr and Eid ul-Adha.", { min: 0, max: 12 }, 2, 0, { hint: "There is one after Ramadan and one in Dhul Hijjah.", why: "There are two Eids.", tag: "eid.count" }), sld("Slide to show the number of months in the Islamic year.", { min: 0, max: 20 }, 12, 0, { hint: "From Muharram to Dhul Hijjah.", why: "There are twelve months.", tag: "eid.count" })],
  [tf("Kind people help everyone, even people they do not know well.", true, { hint: "Think about helping everyone.", why: "Kind people help everyone.", tag: "kind.what" }), tf("Sharing is a kind thing to do.", true, { hint: "Think of sharing your snack.", why: "Sharing is kind.", tag: "kind.what" })],
  [mc("Zayd sees a boy dropping his books. What is the kind thing to do?", "Help pick them up", ["Walk past", "Laugh at him"], { hint: "Care about how he feels.", why: "Helping is kind.", tag: "kind.reason" }), mc("A new girl in your class knows nobody. What is a kind thing to do?", "Say hello and ask her to play", ["Ignore her", "Take her seat"], { hint: "Think about Sara and Aisha.", why: "Including her is kind.", tag: "kind.reason" })],
  [mc("Why is it good to switch off lights we are not using?", "It saves energy and helps our world", ["It makes the room taller", "It wakes the neighbours"], { hint: "Think about energy.", why: "Switching off saves energy.", tag: "nature.reason" }), mc("Why is it good to turn off the tap while brushing our teeth?", "It saves water", ["It makes teeth shiny", "It makes the tap happy"], { hint: "Do not let it run for nothing.", why: "It saves water.", tag: "nature.reason" })],
  [mc("Why is planting trees a good idea?", "Trees give animals homes and clean the air", ["Trees make more litter", "Trees stop the Sun"], { hint: "Think about habitat.", why: "Trees give animals homes and clean the air.", tag: "animals.reason" }), mc("Why do forests matter to animals?", "They are the animals' homes", ["They are for parking", "They stop rain"], { hint: "Think about habitat.", why: "Forests are habitats.", tag: "animals.reason" })],
];

const clipT4 = {
  title: "Zainab cares for her world", backdrop: "meadow", caption: "Zainab feeds the birds, plants a seed and learns to recycle.",
  scenes: [
    { caption: "Birds.", say: "Zainab hangs a feeder in the garden for the birds.",
      items: [{ id: "z", emoji: "👧", label: "Zainab", x: 28, y: 60, size: 3 }, { id: "b", emoji: "🐦", x: 72, y: 40, size: 3, anim: "float" }] },
    { caption: "A seed.", say: "She plants a seed in the soil and gives it water.",
      items: [{ id: "s", emoji: "🌱", x: 50, y: 58, size: 3, anim: "grow" }] },
    { caption: "Endangered.", say: "She learns that some animals are in danger.",
      items: [{ id: "d", emoji: "🐬", x: 50, y: 52, size: 3, anim: "float" }] },
    { caption: "Recycling.", say: "At home she puts her bottle in the recycling bin.",
      items: [{ id: "r", emoji: "♻️", x: 50, y: 54, size: 3, anim: "pulse" }] },
    { caption: "Water.", say: "She turns off the tap while she brushes her teeth.",
      items: [{ id: "w", emoji: "🚰", x: 50, y: 54, size: 3 }] },
    { caption: "Eid.", say: "At Eid she shares food with her neighbours.",
      items: [{ id: "e", emoji: "🌙", x: 30, y: 40, size: 3 }, { id: "f", emoji: "🍲", x: 70, y: 58, size: 3 }] },
    { caption: "Kindness.", say: "Zainab asks a new girl to sit with her.",
      items: [{ id: "k", emoji: "🤝", x: 50, y: 54, size: 3, anim: "bounce" }] },
    { caption: "Small things.", say: "Small kind acts add up to a big help.",
      items: [{ id: "h", emoji: "💚", x: 50, y: 52, size: 3, effect: "sparkle" }] },
  ],
};

const t4 = topicLesson({
  slug: "general-knowledge-class-1-caring-for-our-world", subject: "general-knowledge", cls: 1, topic: 4, title: "Caring for Our World",
  summary: "Animals in danger, protecting nature, Eid and other celebrations, and being kind.",
  unit: "Topic 4: Caring for our world", difficulty: 1,
  objectives: ["Say why some animals are in danger and how we can help", "Reduce, reuse and recycle", "Describe Eid and other celebrations", "Show kindness to people, animals and the planet"],
  success_criteria: ["I can say what endangered means", "I can reduce, reuse and recycle", "I can say how families celebrate Eid", "I can show kindness"],
  real_life: "Putting litter in the bin, recycling at home, celebrating Eid with family, and being kind at school.",
  standards: [
    { framework: "pyp", code: "Sharing the planet" },
    { framework: "pyp", code: "Who we are" },
    { framework: "pk_ncc", code: "GK-01-B" },
    { framework: "cambridge", code: "2ESp.03" },
    { framework: "cambridge", code: "2SIC.04" },
  ],
  warm_up: [
    mc("What does a mill make from wheat?", "Flour", ["Milk", "Rice"], { hint: "We make dough with it.", why: "The mill grinds wheat into flour." }),
    mc("Which month comes just before Eid ul-Fitr?", "Ramadan", ["Muharram", "Rajab"], { hint: "The month of fasting.", why: "Ramadan comes before Eid ul-Fitr." }),
    tf("A home keeps us safe, warm and dry.", true, { hint: "Think about what homes do.", why: "That is the job of a home." }),
  ],
  intro: [],
  subs: [animals, nature, eid, kind],
  clip: clipT4,
  quiz: [
    { q: mc("What does endangered mean?", "There are very few left, and they could disappear", ["The animal is very big", "The animal lives in a zoo"], { hint: "There could be none left.", why: "Endangered means very few are left.", tag: "animals.endangered" }), sub: "animals", depth: "recall" },
    { q: tf("The Indus river dolphin lives in a river in Pakistan.", true, { hint: "Think of the Indus.", why: "It lives in the Indus river.", tag: "animals.pakistan" }), sub: "animals", depth: "recall" },
    { q: ms("Which are reasons animals can be in danger? Pick two.", ["Their homes are cut down or built over", "Their home is polluted"], ["They are too sleepy", "They eat too many vegetables"], { hint: "Think about habitat.", why: "Habitat loss and pollution are dangers.", tag: "animals.causes" }), sub: "animals", depth: "apply" },
    { q: hot("Tap the animal that lives in the snowy mountains of northern Pakistan.", [["🐆", "Snow leopard", 22, 50], ["🐪", "Camel", 50, 50], ["🐠", "Fish", 78, 50]], ["Snow leopard"], { labels: true, hint: "Think of snow.", why: "The snow leopard lives in the northern mountains.", tag: "animals.where" }), sub: "animals", depth: "apply" },
    { q: ord("Put the recycling journey in order.", ["Bottle goes in the recycling bin", "Lorry takes it to a factory", "It is melted", "It becomes something new"], { hint: "Start at the bin.", why: "Bin, lorry, melt, new thing.", tag: "nature.order" }), sub: "nature", depth: "apply" },
    { q: mc("Which is the best thing to do with an empty drink can?", "Put it in the recycling bin", ["Drop it on the road", "Hide it under a bush"], { hint: "It can be made into something new.", why: "Cans can be recycled.", tag: "nature.bin" }), sub: "nature", depth: "recall" },
    { q: fill("Complete the sentences.", "Reduce means to use {b1}. Reuse means to use something {b2}.", [["less", "more", "never"], ["again", "once", "later"]], { hint: "Think about the three magic words.", why: "Reduce is use less. Reuse is use again.", tag: "nature.fill" }), sub: "nature", depth: "apply" },
    { q: st("What do we do with a plastic bottle so it can be made into something new? Write one word.", ["recycle", "recycling", "we recycle"], { hint: "It starts with R.", why: "We recycle it.", tag: "nature.word" }), sub: "nature", depth: "apply" },
    { q: mat("Match each celebration to when it comes.", [["Eid ul-Fitr", "After Ramadan"], ["Eid ul-Adha", "In Dhul Hijjah"], ["Independence Day", "14 August"]], { hint: "Think about each one.", why: "Each has its own time.", tag: "eid.when" }), sub: "eid", depth: "apply" },
    { q: mc("Why do families share food and gifts at Eid?", "To share joy and be kind to others", ["Because they are bored", "To make a mess"], { hint: "Think about sharing.", why: "Sharing at Eid spreads joy and kindness.", tag: "eid.reason" }), sub: "eid", depth: "reason" },
    { q: sld("Slide to show how many Eids there are each year.", { min: 0, max: 12 }, 2, 0, { hint: "One after Ramadan, one in Dhul Hijjah.", why: "There are two Eids.", tag: "eid.count" }), sub: "eid", depth: "recall" },
    { q: tf("Kind people only help their friends.", false, { hint: "Think about helping everyone.", why: "Kind people help everyone.", tag: "kind.what" }), sub: "kind", depth: "recall" },
    { q: mc("Sara sees a new girl sitting alone at lunch. What is a kind thing to do?", "Invite her to sit with you", ["Walk past her", "Take her lunch"], { hint: "Think about Sara and Aisha.", why: "Including her is kind.", tag: "kind.reason" }), sub: "kind", depth: "reason" },
    { q: mc("Why should we switch off the light when we leave a room?", "It saves energy and helps look after our world", ["It makes the room warmer", "It wakes the neighbours"], { hint: "Think about energy.", why: "Switching off saves energy.", tag: "nature.reason" }), sub: "nature", depth: "reason" },
    { q: mc("Why is it a good idea to plant trees?", "Trees give animals homes and clean the air", ["Trees make litter", "Trees stop the Sun"], { hint: "Think about habitat.", why: "Trees give animals homes and clean the air.", tag: "animals.reason" }), sub: "animals", depth: "reason" },
    // ----- upgrade: 15 new mains (q16-q30), 1 variant each
    { q: ord("Put the steps for planting a seed in order.", ["Make a small hole", "Put the seed in", "Cover it with soil", "Give it water"], { hint: "Start by digging.", why: "Dig a hole, put the seed in, cover it, then water it.", tag: "nature.seed" }), sub: "nature", depth: "apply", alts: [ord("Put the steps for feeding wild birds in order.", ["Fill the feeder with seeds", "Hang it up outside", "Stand back and wait", "Watch the birds visit"], { hint: "Fill it first.", why: "Fill it, hang it up, wait, then watch.", tag: "nature.birds" })] },
    { q: mc("Hina says only big animals can be endangered. Is she right?", "No, small animals and birds can be endangered too", ["Yes, only big animals", "Yes, only animals in the sea"], { hint: "Think about the river dolphin and small birds.", why: "Any animal can be in danger if it loses its home.", tag: "animals.reason" }), sub: "animals", depth: "reason", alts: [mc("Rashid says endangered means an animal has already gone for ever. Is he right?", "No, endangered means it could disappear if we do not help", ["Yes, it has already gone", "Yes, it is a baby animal"], { hint: "Think about the word danger.", why: "Endangered animals are still here but are in danger.", tag: "animals.reason" })] },
    { q: mat("Match each animal to its home.", [["Indus river dolphin", "the Indus river"], ["Snow leopard", "high snowy mountains"], ["Green turtle", "the sea shore"], ["Camel", "the desert"]], { hint: "Think about where each one lives.", why: "Each animal has its own home.", tag: "animals.homes" }), sub: "animals", depth: "apply", alts: [mat("Join each animal to its home.", [["Fish", "water"], ["Bird", "a nest in a tree"], ["Bee", "a hive"], ["Rabbit", "a burrow"]], { hint: "Think about where each one lives.", why: "Each animal has its own home.", tag: "animals.homes" })] },
    { q: hot("Tap the animal that lives in water.", [["🐬", "Dolphin", 22, 50], ["🐘", "Elephant", 50, 50], ["🦁", "Lion", 78, 50]], ["Dolphin"], { labels: true, hint: "It swims.", why: "A dolphin lives in water.", tag: "animals.water" }), sub: "animals", depth: "recall", alts: [hot("Tap the animal that lives in the desert.", [["🐪", "Camel", 22, 50], ["🐟", "Fish", 50, 50], ["🐧", "Penguin", 78, 50]], ["Camel"], { labels: true, hint: "It has a hump.", why: "A camel lives in the desert.", tag: "animals.desert" })] },
    { q: st("Write the word for turning old fruit peel into food for the soil. It starts with C.", ["compost", "composting"], { hint: "It is what a garden heap does.", why: "Fruit peel can be turned into compost.", tag: "nature.compost" }), sub: "nature", depth: "recall", alts: [st("Write the word that means keeping something safe from harm. It starts with P.", ["protect", "to protect"], { hint: "We do this for nature.", why: "To protect means to keep safe.", tag: "nature.protect" })] },
    { q: mc("Zayd says one small action cannot help the world. Is he right?", "No, many small actions add up", ["Yes, only big actions help", "Yes, small actions never matter"], { hint: "Think about everyone picking up litter.", why: "When many people do small things, they add up to a big help.", tag: "nature.reason" }), sub: "nature", depth: "reason", alts: [mc("Layla says dropping one wrapper does not matter. Is she right?", "No, many wrappers together become a lot of litter", ["Yes, one wrapper is nothing", "Yes, litter is good for the ground"], { hint: "Think about how many pupils there are.", why: "Lots of wrappers make lots of litter.", tag: "nature.reason" })] },
    { q: fill("Fill in the gaps about the three Rs.", "We can reduce, {b1} and {b2}.", [["reuse", "rubbish", "run"], ["recycle", "waste", "break"]], { hint: "Reduce, reuse, recycle.", why: "The three Rs are reduce, reuse and recycle.", tag: "nature.rs" }), sub: "nature", depth: "recall", alts: [fill("Fill in the gaps about saving water.", "We turn off the {b1} while we brush our {b2}.", [["tap", "light", "door"], ["teeth", "hair", "shoes"]], { hint: "Think about the sink.", why: "We turn off the tap while brushing our teeth.", tag: "nature.water" })] },
    { q: sld("A park has 10 pieces of litter. Pupils pick up 4. Slide to show how many are left.", { min: 0, max: 12 }, 6, 0, { hint: "Take 4 away from 10.", why: "10 take away 4 leaves 6.", tag: "nature.litter" }), sub: "nature", depth: "apply", alts: [sld("A playground has 12 pieces of litter. Pupils pick up 5. Slide to show how many are left.", { min: 0, max: 12 }, 7, 0, { hint: "Take 5 away from 12.", why: "12 take away 5 leaves 7.", tag: "nature.litter" })] },
    { q: ms("Which two do many families do at Eid? Pick two.", ["Share food with neighbours", "Wear new clothes"], ["Stay alone all day", "Forget to say thank you"], { hint: "Think about how families celebrate.", why: "Families share food and often wear new clothes at Eid.", tag: "eid.do" }), sub: "eid", depth: "apply", alts: [ms("Which two are special days for Muslims? Pick two.", ["Eid ul-Fitr", "Eid ul-Adha"], ["A rainy Tuesday", "A busy Monday"], { hint: "They are called Eid.", why: "Eid ul-Fitr and Eid ul-Adha are special days.", tag: "eid.days" })] },
    { q: mc("Imran says Eid is only about getting gifts. Is he right?", "No, Eid is also about thanks, prayer, family and sharing", ["Yes, it is only about gifts", "Yes, it is only about food"], { hint: "Think about everything families do together.", why: "Eid is about giving thanks and being with family.", tag: "eid.reason" }), sub: "eid", depth: "reason", alts: [mc("Sana says only rich people can be kind at Eid. Is she right?", "No, anyone can share a smile or some food", ["Yes, only rich people", "Yes, only adults"], { hint: "Think about small kind acts.", why: "Everyone can be kind.", tag: "eid.reason" })] },
    { q: mat("Match each word to its meaning.", [["Ramadan", "a month of fasting"], ["Eid ul-Fitr", "a happy day after Ramadan"], ["Friday", "a day for Jumu'ah prayer"], ["Zakat", "giving to people in need"]], { hint: "Think about each one.", why: "Each word has its own meaning.", tag: "eid.words" }), sub: "eid", depth: "apply", alts: [mat("Join each word to its meaning.", [["Sadaqah", "a kind gift"], ["Fasting", "not eating from dawn to sunset"], ["Eid", "a day of celebration"], ["Charity", "helping people in need"]], { hint: "Think about each one.", why: "Each word has its own meaning.", tag: "eid.words" })] },
    { q: mc("Maryam says you must be rich to be kind. Is she right?", "No, kindness can be a smile, sharing or helping", ["Yes, only rich people can be kind", "Yes, kindness costs a lot"], { hint: "Think about kind things that cost nothing.", why: "Anyone can be kind.", tag: "kind.reason" }), sub: "kind", depth: "reason", alts: [mc("Tahir says small kindnesses do not matter. Is he right?", "No, small kindnesses make a big difference", ["Yes, they do not matter", "Yes, only big gifts matter"], { hint: "Think about a friendly smile.", why: "Small kind acts can make someone's day.", tag: "kind.reason" })] },
    { q: mc("Which is a kind thing to do at lunch?", "Share your seat with someone", ["Push in front of the queue", "Take someone's food"], { hint: "Think about helping others feel welcome.", why: "Sharing a seat is kind.", tag: "kind.lunch" }), sub: "kind", depth: "apply", alts: [mc("Which is a kind thing to do for a neighbour who is ill?", "Take them some food", ["Make a lot of noise", "Ignore them"], { hint: "Think about helping.", why: "Taking food is kind and helpful.", tag: "kind.neighbour" })] },
    { q: mc("What should we do with our litter?", "Put it in a bin", ["Drop it on the ground", "Hide it under a bench"], { hint: "Think about keeping places clean.", why: "Litter belongs in a bin.", tag: "nature.litterbin" }), sub: "nature", depth: "recall", alts: [mc("What should we do with an empty plastic bottle?", "Put it in the recycling bin", ["Throw it in a river", "Bury it in the garden"], { hint: "Think about recycling.", why: "A plastic bottle can be recycled.", tag: "nature.bottle" })] },
    { q: mc("Hamza says looking after nature is only for grown-ups. Is he right?", "No, children can plant seeds and pick up litter", ["Yes, only grown-ups can help", "Yes, children are too small"], { hint: "Think about what you can do at school.", why: "Everyone can help nature.", tag: "kind.reason" }), sub: "kind", depth: "reason", alts: [mc("Zara says a pet does not need care every day. Is she right?", "No, a pet needs food, water and love every day", ["Yes, pets look after themselves", "Yes, only once a week"], { hint: "Think about a cat or a bird.", why: "Pets need daily care.", tag: "kind.reason" })] },
  ].map((x, i) => ({ ...x, alts: x.alts ?? ALTS4[i] })),
});

export const topics = [t3, t4];
