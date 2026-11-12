import { SAY, SS, H, T, PHOTO, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld, st } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC } from "./_science-kit.mjs";

// Science Class 1, topic 9: Mini-beasts and micro-habitats (Zainab, age 7).
const SNAIL = "science-class-1-minibeasts-1-859970c7.jpg";
const HOTEL = "science-class-1-minibeasts-2-68991355.jpg";
const MOSS = "science-class-1-minibeasts-3-877a83ed.jpg";

// ---------------------------------------------------------------------------------------------- 1. learn
const homes = {
  id: "homes", kind: "learn", title: "Tiny homes",
  blocks: [
    H("Welcome back, young scientist!"),
    SAY("Today we look for tiny animals. Where do they live?", T("Today's big question: where do tiny animals live?")),
    SAY("This snail is out after the rain. Its shell is its own little house.", PHOTO(SNAIL, "A garden snail with a stripy shell on a green leaf covered in raindrops", "A snail loves wet weather. Its shell protects its soft body.", "Photo by Olivier Piau on Unsplash")),
    H("Stop 1: Mini-beasts"),
    SAY("Small animals are called mini-beasts. Snails, worms, ants and spiders are all mini-beasts.", T("**Mini-beasts** are small animals without a backbone.")),
    EB("meadow", "Meet the mini-beasts",
      SS("A snail has no legs. It glides on one soft foot.", S("A snail.", ["s", "🐌", 50, 62, 3, "float"])),
      SS("An ant has six legs. It carries food to its nest.", S("An ant.", ["a", "🐜", 50, 62, 3, "bounce"])),
      SS("A spider has eight legs. A spider is not an insect.", S("A spider.", ["p", "🕷️", 50, 55, 3, "pulse"]))),
    CHK(mc("Which one of these is a mini-beast?", "A snail", ["A cow", "A sparrow"], { hint: "It is small and has a shell.", why: "A snail is a very small animal, so it is a mini-beast.", tag: "homes.chk1" })),
    H("Stop 2: Micro-habitats"),
    SAY("A habitat is the place where an animal lives. A tiny habitat is called a micro-habitat.", T("A **micro-habitat** is a very small place where animals live.")),
    EB("forest", "Tiny homes",
      SS("Under a log it is dark and damp. Woodlice like it there.", S("Under a log.", ["l", "🪵", 40, 62, 3], ["w", "🪲", 72, 70, 2, "bounce"])),
      SS("Soil is the home of the earthworm. It tunnels underground.", S("In soil.", ["s", "🟤", 40, 66, 3], ["w", "🪱", 72, 66, 2, "bounce"])),
      SS("A flower is a home too. Bees visit it for sweet nectar.", S("On a flower.", ["f", "🌼", 40, 58, 3], ["b", "🐝", 72, 50, 2, "float"]))),
    CHK(tf("A micro-habitat can be as small as one stone.", true, { hint: "Think about what lives under a stone.", why: "Small animals shelter under one stone, so it is a micro-habitat.", tag: "homes.chk2" })),
    SAY("Let us remember. Mini-beasts are small animals. They live in tiny habitats.", SUM("Mini-beasts are small animals", "A micro-habitat is a tiny home", "Logs, soil and flowers are micro-habitats")),
    GLOSS({ "mini-beasts": "Small animals without a backbone, such as snails and ants.", "micro-habitat": "A very small place where animals live.", habitat: "The place where an animal or plant lives.", nectar: "The sweet juice inside a flower.", woodlouse: "A small grey animal with many legs that lives in damp places." }),
  ],
  mini: [
    mc("How many legs does a spider have?", "Eight", ["Six", "Four"], { hint: "Count the legs in a picture.", why: "A spider has eight legs." }),
    tf("A snail has six legs.", false, { hint: "Look at how a snail moves.", why: "A snail has no legs. It glides on one foot." }),
    mc("Where do earthworms live?", "In the soil", ["In the sky", "On a roof"], { hint: "They tunnel.", why: "Earthworms live and tunnel in soil." }),
    mc("What do bees collect from flowers?", "Nectar", ["Stones", "Water from the sea"], { hint: "It is sweet.", why: "Bees drink nectar from flowers." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const hunt = {
  id: "hunt", kind: "try", title: "Bug hunt",
  blocks: [
    H("Stop 1: Hunting kindly"),
    SAY("Let us go on a bug hunt. We look gently and we never hurt anything.", T("A **bug hunt** means looking for mini-beasts and putting them back.")),
    EB("meadow", "Bug hunt rules",
      SS("Lift a log slowly. Small animals may be hiding underneath.", S("Lift slowly.", ["z", "👧", 25, 58, 3], ["l", "🪵", 68, 64, 3])),
      SS("Use a magnifying glass. It helps us see tiny legs.", S("Look closely.", ["z", "👧", 25, 58, 3], ["m", "🔍", 68, 58, 3, "pulse"])),
      SS("Put the log back as you found it. That keeps their home safe.", S("Put it back.", ["l", "🪵", 40, 64, 3], ["h", "🏠", 74, 58, 2, "pulse"]))),
    CHK(ord("Put the bug hunt steps in order.", ["Lift a log gently", "Look and count", "Put the log back"], { hint: "Look before you put back.", why: "We lift the log, look and count, then put the log back.", tag: "hunt.chk1" })),
    H("Stop 2: Who did we find?"),
    SAY("This red and black bug is walking on moss. Moss is a damp, soft micro-habitat.", PHOTO(MOSS, "A small red and black bug walking down a clump of green moss on a log", "Moss holds water, so it makes a soft, damp home for tiny animals.", "Photo by An Shved on Unsplash")),
    SAY("Now sort the mini-beasts. Where would you look for each one?", MAN("Where do they live?", "Move each mini-beast. Damp and dark things go in Under a log. Sunny things go in On a flower.", "🐛", 8, ["Under a log", "On a flower"])),
    ACT("Make a bug count", ["Paper and pencil", "A magnifying glass", "A grown-up to help"], ["Look under a leaf or a stone in the garden or park.", "Draw each mini-beast you find and count them.", "Put everything back gently and wash your hands."]),
    CHK(tf("After a bug hunt we should leave the log upside down.", false, { hint: "Think about the animals' home.", why: "We put the log back the way it was so the home stays safe.", tag: "hunt.chk2" })),
    SAY("Let us remember. A bug hunt is gentle. We look, count and put things back.", SUM("Lift logs slowly and look gently", "A magnifying glass helps us see tiny legs", "Always put mini-beasts and homes back")),
    GLOSS({ "bug hunt": "Looking for mini-beasts and putting them back safely.", moss: "A soft green plant that grows in damp places.", magnifier: "A glass that makes small things look bigger.", gently: "Slowly and carefully, without hurting anything." }),
  ],
  mini: [
    mc("What helps you see tiny legs on a beetle?", "A magnifying glass", ["A drum", "A ruler"], { hint: "It makes things look bigger.", why: "A magnifying glass makes small things look bigger." }),
    tf("A bug hunt means catching mini-beasts and keeping them.", false, { hint: "Do we keep wild animals?", why: "We look, then put them back where they live." }),
    mc("Which place is damp and dark?", "Under a log", ["On a bright wall", "On a hot road"], { hint: "Woodlice like it there.", why: "It is damp and dark under a log." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const wherelive = {
  id: "wherelive", kind: "play", title: "Who lives where?",
  blocks: [
    H("Stop 1: The right home"),
    SAY("Every mini-beast has a home that suits it. Some need damp, some need warmth.", T("Each mini-beast needs the **right home**.")),
    EB("forest", "Matching homes",
      SS("An earthworm needs damp soil. Dry soil would hurt its skin.", S("Worm.", ["w", "🪱", 30, 66, 3], ["s", "🟤", 70, 66, 3])),
      SS("A woodlouse hides in a dark place. The damp keeps its body safe.", S("Woodlouse.", ["w", "🪲", 30, 66, 2], ["l", "🪵", 70, 62, 3])),
      SS("A spider spins its web in a corner. Flies get caught in it.", S("Spider.", ["s", "🕷️", 30, 56, 3], ["w", "🕸️", 70, 56, 3, "pulse"]))),
    CHK(mc("Where would you find an earthworm?", "In damp soil", ["On a bright rooftop", "In a hot oven"], { hint: "Think about tunnels.", why: "Earthworms live in damp soil.", tag: "wherelive.chk1" })),
    H("Stop 2: Brain game"),
    SAY("Warm up your memory. Watch the mini-beasts march, then copy them.", T("Play the game, then answer a question.")),
    SAY("Watch the order closely. Then copy it.", BRAIN("remember_order", "Mini-beast march", "Watch the order, then copy it. It gets longer each time!", ["🐌", "🐜", "🐞", "🪱"])),
    CHK(ms("Pick two mini-beasts that live in or near soil.", ["Worm", "Ant"], ["Eagle", "Camel"], { hint: "Think about tunnels and nests.", why: "Worms and ants live in or near the soil.", tag: "wherelive.chk2" })),
    SAY("Let us remember. Each mini-beast needs its own kind of home.", SUM("Worms need damp soil", "Woodlice like dark, damp places", "Spiders build webs in quiet corners")),
    GLOSS({ "right home": "A place with the food, shelter and damp or warmth an animal needs.", web: "A sticky net of thread made by a spider.", tunnel: "A long hole under the ground.", shelter: "A safe place to hide." }),
  ],
  mini: [
    mc("What does a spider make to catch flies?", "A web", ["A shell", "A nest of mud"], { hint: "It is sticky.", why: "A spider spins a web to catch flies." }),
    tf("Worms need damp soil.", true, { hint: "Dry skin hurts a worm.", why: "A worm dries out in dry soil." }),
    mc("Which mini-beast hides under logs?", "A woodlouse", ["A sparrow", "A goat"], { hint: "It is grey and small.", why: "A woodlouse hides in dark, damp places." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const protect = {
  id: "protect", kind: "use", title: "Protect small homes",
  blocks: [
    H("Stop 1: Why small homes matter"),
    SAY("Small animals lose their homes when we tidy too much. A tidy garden can be empty.", T("We can **protect** mini-beasts by leaving their homes alone.")),
    SAY("Mini-beasts do big jobs. Worms mix soil and bees carry pollen.", T("Mini-beasts help plants grow.")),
    SAY("Birds and hedgehogs eat mini-beasts. So they are part of a food chain.", T("Many animals need mini-beasts to eat.")),
    EB("meadow", "Helping mini-beasts",
      SS("Leave a pile of logs in a quiet corner. Beetles will move in.", S("Log pile.", ["l", "🪵", 40, 62, 3], ["b", "🪲", 74, 66, 2, "bounce"])),
      SS("Plant flowers for the bees. They will visit all summer.", S("Flowers.", ["f", "🌼", 40, 58, 3], ["b", "🐝", 74, 48, 2, "float"])),
      SS("Do not use poison. It harms every small animal, not only pests.", S("No poison.", ["p", "🚫", 50, 58, 3, "pulse"]))),
    CHK(ms("Pick two ways to help mini-beasts.", ["Leave a log pile", "Plant flowers"], ["Spray poison", "Cover the soil with concrete"], { hint: "Think about giving them homes and food.", why: "Logs give shelter and flowers give food.", tag: "protect.chk1" })),
    H("Stop 2: Build a bug hotel"),
    SAY("A bug hotel is a pile of logs, bark and pine cones. Small animals shelter in the holes.", PHOTO(HOTEL, "A tall bug hotel built from wooden pallets, filled with logs, drilled wood and pine cones", "A bug hotel gives small animals a dry and safe place to stay.", "Photo by Mika Baumeister on Unsplash")),
    SAY("In Pakistan, gardens and fields are full of ants and beetles after the rain.", T("Mini-beasts live in gardens and fields all over the world.")),
    SAY("In the UK, hedges and gardens hide slugs, ladybirds and bees.", T("Look after small animals wherever you live.")),
    SAY("Muslims are taught to be kind to all living things. Small ones too.", T("Be kind to every living thing.")),
    ACT("Plan a bug hotel", ["Paper and pencils", "A grown-up to help"], ["Draw a bug hotel with three floors.", "Label logs, bark, pine cones and dry leaves.", "Say which mini-beast will live on each floor."]),
    CHK(tf("A bug hotel can be made from logs, bark and pine cones.", true, { hint: "Look at the photo.", why: "A bug hotel uses natural things like wood, bark and cones.", tag: "protect.chk2" })),
    SAY("Let us remember. We protect mini-beasts by giving them food and shelter.", SUM("Leave logs, leaves and flowers in a corner", "Do not use poison", "A bug hotel gives small animals a safe home")),
    GLOSS({ protect: "To keep something safe from harm.", pollen: "The yellow dust in a flower that helps make seeds.", "food chain": "Who eats what, in order.", "bug hotel": "A pile of wood and natural things that gives small animals shelter.", pests: "Animals that harm crops or plants." }),
  ],
  mini: [
    mc("What gives a beetle shelter in a garden?", "A log pile", ["A tin can", "A clean path"], { hint: "Think about a dark, damp corner.", why: "A log pile gives beetles a safe, damp home." }),
    tf("Poison only hurts pests and not other animals.", false, { hint: "Can poison tell animals apart?", why: "Poison harms all small animals." }),
    mc("What do bees need from flowers?", "Nectar", ["Plastic", "Stones"], { hint: "It tastes sweet.", why: "Bees drink nectar from flowers." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Sana the snail", backdrop: "meadow", caption: "A snail tells where she and her friends live.",
  scenes: [
    { caption: "Hello!", say: "I am Sana the snail. I am small, but my garden is big.",
      items: [{ id: "s", emoji: "🐌", label: "Sana", x: 50, y: 60, size: 3, enter: "pop" }] },
    { caption: "My house.", say: "My shell is my house. It keeps my soft body safe.",
      items: [{ id: "s", emoji: "🐌", x: 40, y: 60, size: 3 }, { id: "h", emoji: "🏠", x: 72, y: 58, size: 2, anim: "pulse" }] },
    { caption: "After the rain.", say: "I love rainy days. The wet leaves are my favourite.",
      items: [{ id: "r", emoji: "🌧️", x: 50, y: 25, size: 3 }, { id: "s", emoji: "🐌", x: 50, y: 64, size: 3, anim: "float" }] },
    { caption: "Worm friend.", say: "Wazir the worm lives in damp soil. He has no legs either.",
      items: [{ id: "w", emoji: "🪱", label: "Wazir", x: 60, y: 66, size: 3, anim: "bounce" }, { id: "s", emoji: "🐌", x: 28, y: 62, size: 2 }] },
    { caption: "Woodlouse.", say: "Wafa the woodlouse hides under a log. It is dark and damp there.",
      items: [{ id: "l", emoji: "🪵", x: 65, y: 64, size: 3 }, { id: "w", emoji: "🪲", label: "Wafa", x: 35, y: 66, size: 2, enter: "pop" }] },
    { caption: "Bees.", say: "Bees visit the flowers. They drink sweet nectar.",
      items: [{ id: "f", emoji: "🌼", x: 35, y: 62, size: 3 }, { id: "b", emoji: "🐝", x: 70, y: 40, size: 2, anim: "float" }] },
    { caption: "A big shadow.", say: "Oh no! A big child lifts the log. We stay very still.",
      items: [{ id: "g", emoji: "🧒", x: 25, y: 56, size: 3 }, { id: "l", emoji: "🪵", x: 68, y: 62, size: 3 }] },
    { caption: "Safe again.", say: "The child puts the log back. Our home is safe. Goodnight!",
      items: [{ id: "l", emoji: "🪵", x: 40, y: 62, size: 3 }, { id: "s", emoji: "🐌", x: 72, y: 62, size: 2, effect: "sparkle" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- homes (q1-q8)
  Q("homes", "recall", "minibeasts.microhabitat_st", st("What do we call a very small place where small animals live?", ["micro-habitat", "microhabitat", "a micro-habitat", "a microhabitat"], { hint: "It starts with micro.", why: "A very small home is a micro-habitat." }),
    st("What name do we give very small animals such as snails and worms?", ["mini-beast", "minibeast", "mini-beasts", "minibeasts", "a mini-beast"], { hint: "It sounds like tiny beast.", why: "Small animals without a backbone are mini-beasts." })),
  Q("homes", "apply", "minibeasts.home_match", mat("Match each mini-beast to its home.", [["Woodlouse", "Under a log"], ["Earthworm", "In the soil"], ["Snail", "On a damp leaf"]], { hint: "Think about damp, dark and wet.", why: "A woodlouse hides under a log, a worm digs in soil and a snail glides on a damp leaf." }),
    mat("Join each small animal to where it lives.", [["Spider", "In a web in a corner"], ["Ant", "In a nest in the ground"], ["Ladybird", "On a plant"]], { hint: "Think of a garden.", why: "A spider has a web, an ant has a nest and a ladybird lives on plants." })),
  Q("homes", "reason", "minibeasts.all_insects", mc("Sam says all mini-beasts are insects. Is he right?", "No, snails and spiders are not insects", ["Yes, every mini-beast is an insect", "Yes, because they are all small"], { hint: "Count legs. Insects have six.", why: "Snails and spiders are mini-beasts but not insects." }),
    mc("Ali says a snail is an insect. Is he right?", "No, a snail has no legs and no six-legged body", ["Yes, all small animals are insects", "Yes, because it lives in a garden"], { hint: "Does a snail have six legs?", why: "An insect has six legs. A snail is a different kind of mini-beast." })),
  Q("homes", "apply", "minibeasts.tap_microhab", hot("Tap the micro-habitat.", [["🪵", "Log pile", 22, 50], ["🌊", "Ocean", 50, 50], ["🏔️", "Mountain", 78, 50]], ["Log pile"], { labels: true, hint: "It is small enough to fit in a garden.", why: "A log pile is a tiny home for small animals." }),
    hot("Tap the best place for a woodlouse to hide.", [["🪨", "Under a stone", 22, 50], ["🛣️", "Busy road", 50, 50], ["🏜️", "Hot sand", 78, 50]], ["Under a stone"], { labels: true, hint: "It likes dark and damp.", why: "Under a stone is dark and damp, so it suits a woodlouse." })),
  Q("homes", "reason", "minibeasts.forest_micro", mc("Layla says a whole forest is a micro-habitat. Is she right?", "No, a micro-habitat is very small, like one log", ["Yes, a forest is tiny", "Yes, a forest is a micro-habitat because it has trees"], { hint: "Think about the word micro.", why: "A micro-habitat is a very small place, such as under one log." }),
    mc("Omar says a single stone can be a micro-habitat. Is he right?", "Yes, small animals shelter under it", ["No, only a forest can be a habitat", "No, stones are too hard"], { hint: "Think about what hides under a stone.", why: "One stone can shelter small animals, so it is a micro-habitat." })),
  Q("homes", "apply", "minibeasts.microhab_tf", tf("A micro-habitat is a very small place where animals live.", true, { hint: "Think about the word micro.", why: "Micro means very small." }),
    tf("A micro-habitat is as big as a whole country.", false, { hint: "Think about the word micro.", why: "A micro-habitat is tiny, not as big as a country." })),
  Q("homes", "recall", "minibeasts.spider_legs_num", num("A spider has 8 legs. Two spiders sit under a log. How many legs are there in all?", 16, { hint: "8 + 8.", why: "8 + 8 = 16 legs." }),
    num("A beetle has 6 legs. Two beetles hide under a stone. How many legs are there in all?", 12, { hint: "6 + 6.", why: "6 + 6 = 12 legs." })),
  Q("homes", "recall", "minibeasts.minibeast_ms", ms("Which two are mini-beasts? Pick two.", ["Snail", "Ant"], ["Sparrow", "Rabbit"], { hint: "They are very small and have no backbone.", why: "Snails and ants are mini-beasts." }),
    ms("Which two are small animals found in soil? Pick two.", ["Worm", "Beetle"], ["Fox", "Hen"], { hint: "Think about a garden.", why: "Worms and beetles are mini-beasts that live in soil." })),
  // ----- hunt (q9-q15)
  Q("hunt", "apply", "minibeasts.hunt_order", ord("Put the log lift in order.", ["Find a log", "Lift it slowly", "Put it back"], { hint: "Find it before you lift it.", why: "We find the log, lift it slowly, then put it back." }),
    ord("Order a safe look at a snail.", ["Spot the snail", "Look with a magnifier", "Leave it where it was"], { hint: "Spot it first.", why: "We spot it, look closely, then leave it where it was." })),
  Q("hunt", "reason", "minibeasts.dark_damp", mc("Aisha says all mini-beasts like the dark and the damp. Is she right?", "No, bees and ladybirds like sunny flowers", ["Yes, they all hide in the dark", "Yes, all mini-beasts hate sunshine"], { hint: "Think about bees.", why: "Some mini-beasts like warm, sunny places." }),
    mc("Zainab says every mini-beast hides under stones. Is she right?", "No, some live on flowers or in the air", ["Yes, they all hide under stones", "Yes, none of them like leaves"], { hint: "Think about a bee.", why: "Mini-beasts live in many different places." })),
  Q("hunt", "apply", "minibeasts.woodlouse_fill", fill("Finish the sentences about woodlice.", "A woodlouse likes a {b1} and {b2} place.", [["dark", "bright", "hot"], ["damp", "dry", "sandy"]], { hint: "Think about under a log.", why: "A woodlouse likes dark and damp places." }),
    fill("Finish the sentences about bees.", "A bee visits {b1} flowers in {b2} weather.", [["colourful", "grey", "plastic"], ["sunny", "icy", "stormy"]], { hint: "Think about a summer garden.", why: "Bees visit colourful flowers in sunny weather." })),
  Q("hunt", "apply", "minibeasts.count_sld", sld("A bug hunt found 7 ants and 5 beetles. Slide to show how many mini-beasts were found.", { min: 0, max: 20, unit: "mini-beasts" }, 12, 0, { hint: "7 + 5.", why: "7 + 5 = 12 mini-beasts." }),
    sld("Hamza found 9 snails and 4 worms. Slide to show how many mini-beasts he found.", { min: 0, max: 20, unit: "mini-beasts" }, 13, 0, { hint: "9 + 4.", why: "9 + 4 = 13 mini-beasts." })),
  Q("hunt", "apply", "minibeasts.hunt_tool", mc("Which tool helps you see tiny legs on a mini-beast?", "A magnifying glass", ["A saucepan", "A kite"], { hint: "It makes things look bigger.", why: "A magnifying glass makes small things look bigger." }),
    mc("What should you use to look at a mini-beast without touching it?", "A hand lens", ["A hammer", "A bucket of water"], { hint: "It is a small round lens.", why: "A hand lens lets you look closely without touching." })),
  Q("hunt", "reason", "minibeasts.catch_keep", mc("Hamza says a bug hunt means catching and keeping mini-beasts. Is he right?", "No, we look gently and put them back", ["Yes, we keep them in a jar for a week", "Yes, we take them home to eat"], { hint: "Think about their home.", why: "A bug hunt means looking gently and returning them." }),
    mc("Mira says it is fine to squash a spider to count it. Is she right?", "No, we look and never hurt them", ["Yes, squashing makes it easier", "Yes, spiders do not matter"], { hint: "Are they alive?", why: "Mini-beasts are living things and we must not hurt them." })),
  Q("hunt", "apply", "minibeasts.putback_tf", tf("After a bug hunt we put the log back as we found it.", true, { hint: "Think about the animals' home.", why: "Putting it back keeps the home safe." }),
    tf("It is fine to leave the log upside down after a bug hunt.", false, { hint: "Think about the animals' home.", why: "We put the log back the right way up." })),
  // ----- wherelive (q16-q23)
  Q("wherelive", "apply", "minibeasts.where_match", mat("Match each mini-beast to where we find it.", [["Earthworm", "Soil"], ["Spider", "Web"], ["Bee", "Flower"]], { hint: "Think about their homes.", why: "A worm lives in soil, a spider in a web and a bee visits flowers." }),
    mat("Join each mini-beast to its home.", [["Ant", "Nest"], ["Snail", "Shell"], ["Woodlouse", "Under a log"]], { hint: "Think about their homes.", why: "An ant has a nest, a snail has a shell and a woodlouse hides under a log." })),
  Q("wherelive", "apply", "minibeasts.worm_tap", hot("Tap the place where an earthworm lives.", [["🟤", "Soil", 22, 50], ["☁️", "Cloud", 50, 50], ["🏠", "Roof", 78, 50]], ["Soil"], { labels: true, hint: "It tunnels.", why: "An earthworm lives in the soil." }),
    hot("Tap the place a spider spins its web.", [["🕸️", "Corner of a shed", 22, 50], ["🌊", "Sea", 50, 50], ["🏜️", "Desert sand", 78, 50]], ["Corner of a shed"], { labels: true, hint: "Quiet corners are good.", why: "A spider spins its web in a quiet corner." })),
  Q("wherelive", "reason", "minibeasts.worms_dry", mc("Hamza says worms need dry soil. Is he right?", "No, worms need damp soil or they dry out", ["Yes, worms like hot dry soil", "Yes, water hurts all animals"], { hint: "Think about the rain.", why: "Worms breathe through damp skin, so they need damp soil." }),
    mc("Ali says snails love hot, dry sun. Is he right?", "No, snails like damp places and come out in the rain", ["Yes, snails love the desert", "Yes, snails need no water"], { hint: "Think about rain.", why: "Snails need damp air or their soft bodies dry out." })),
  Q("wherelive", "reason", "minibeasts.plants_living", mc("Omar says plants cannot be a habitat because they are not alive. Is he right?", "No, plants are living things and give animals food and shelter", ["Yes, plants are not alive", "Yes, only animals can be habitats"], { hint: "Do plants grow?", why: "Plants are alive and give small animals food and shelter." }),
    mc("Bilal says a dead log is no use because it is not alive. Is he right?", "No, a dead log still gives food and shelter", ["Yes, only live trees help", "Yes, dead wood kills mini-beasts"], { hint: "Think about beetles in a log pile.", why: "Dead wood is a home and food for many mini-beasts." })),
  Q("wherelive", "apply", "minibeasts.ground_order", ord("Put these in order from the ground up.", ["Soil", "Stone", "Leaf on a bush"], { hint: "Soil is on the ground.", why: "Soil is lowest, the stone sits on it and the leaf is highest." }),
    ord("Put these in order from smallest to largest.", ["Ant", "Snail", "Hedgehog"], { hint: "An ant is tiny.", why: "An ant is smallest and a hedgehog is largest." })),
  Q("wherelive", "recall", "minibeasts.spider_st", st("What do we call the mini-beast with eight legs that spins a web?", ["spider", "a spider"], { hint: "It starts with s.", why: "A spider has eight legs and spins webs." }),
    st("What do we call the long thin mini-beast with no legs that lives in soil?", ["worm", "a worm", "earthworm", "an earthworm"], { hint: "It starts with w.", why: "A worm is long and thin and lives in soil." })),
  Q("wherelive", "reason", "minibeasts.spider_legs", mc("Ali says a spider has six legs, so it is an insect. Is he right?", "No, a spider has eight legs and is not an insect", ["Yes, all mini-beasts have six legs", "Yes, a spider has two legs"], { hint: "Count the legs again.", why: "A spider has eight legs. Insects have six." }),
    mc("Sam says a beetle has eight legs. Is he right?", "No, a beetle has six legs", ["Yes, all small animals have eight legs", "Yes, a beetle has no legs"], { hint: "Beetles are insects.", why: "A beetle is an insect, so it has six legs." })),
  Q("wherelive", "recall", "minibeasts.group_num", num("6 woodlice are on one stone and 3 are on another. How many woodlice are there?", 9, { hint: "6 + 3.", why: "6 + 3 = 9 woodlice." }),
    num("5 ants are at a log and 8 ants are at a stone. How many ants are there?", 13, { hint: "5 + 8.", why: "5 + 8 = 13 ants." })),
  // ----- protect (q24-q30)
  Q("protect", "reason", "minibeasts.move_stones", mc("Mira says it is fine to move all the stones in the garden. Is she right?", "No, moving them takes away homes", ["Yes, stones do nothing", "Yes, the animals will not mind"], { hint: "Think about woodlice.", why: "Stones are homes for small animals." }),
    mc("Sam says cutting all the long grass does not matter. Is he right?", "No, long grass is a home and hiding place for mini-beasts", ["Yes, grass has no animals", "Yes, short grass is better for every animal"], { hint: "Think about spiders and beetles.", why: "Long grass shelters many small animals." })),
  Q("protect", "apply", "minibeasts.help_ms", ms("Which two things help mini-beasts? Pick two.", ["Build a bug hotel", "Leave leaves in a corner"], ["Pour weedkiller", "Pave the whole garden"], { hint: "Think about homes and food.", why: "A bug hotel and leaf pile give shelter." }),
    ms("Which two help bees? Pick two.", ["Plant flowers", "Leave a bowl of water"], ["Spray poison", "Cut every flower"], { hint: "Bees need food and drink.", why: "Flowers give nectar and water gives a drink." })),
  Q("protect", "apply", "minibeasts.hotel_fill", fill("Finish the sentences about a bug hotel.", "A bug hotel gives small animals a {b1} and {b2} place.", [["safe", "loud", "freezing"], ["dry", "burning", "empty"]], { hint: "Think about shelter.", why: "A bug hotel is safe and dry." }),
    fill("Finish the sentences about fallen leaves.", "Leaves on the ground give worms {b1} and {b2}.", [["food", "paint", "glass"], ["shelter", "noise", "wheels"]], { hint: "Think about a worm's meal.", why: "Leaves are food and shelter for worms." })),
  Q("protect", "apply", "minibeasts.hotel_tf", tf("Wood, bark and cones are good things to put in a bug hotel.", true, { hint: "Natural things are best.", why: "A bug hotel uses natural materials." }),
    tf("A bug hotel should be made of glass and plastic.", false, { hint: "Think about natural homes.", why: "Natural materials like wood make better homes." })),
  Q("protect", "recall", "minibeasts.hotel_st", st("What do we call a pile of wood with holes that gives small animals shelter?", ["bug hotel", "a bug hotel", "insect hotel", "an insect hotel"], { hint: "It sounds like a place to stay.", why: "It is called a bug hotel." }),
    st("What mini-beast pulls leaves into the soil and makes it healthy?", ["worm", "a worm", "earthworm", "an earthworm"], { hint: "It has no legs.", why: "Worms pull leaves down and enrich the soil." })),
  Q("protect", "apply", "minibeasts.action_match", mat("Match each action to its help.", [["Leave a leaf pile", "Shelter for worms"], ["Plant flowers", "Food for bees"], ["Add a water dish", "A drink for small animals"]], { hint: "Think about each need.", why: "Leaves shelter worms, flowers feed bees and water gives a drink." }),
    mat("Join each action to its help.", [["Stack logs", "A home for beetles"], ["Leave stones in place", "Shelter for woodlice"], ["Leave long grass", "A hiding place for spiders"]], { hint: "Think about each home.", why: "Logs, stones and grass are homes for different mini-beasts." })),
  Q("protect", "apply", "minibeasts.holes_sld", sld("A bug hotel has 8 holes. Beetles use 3 of them. Slide to show how many holes are left.", { min: 0, max: 10, unit: "holes" }, 5, 0, { hint: "8 take away 3.", why: "8 - 3 = 5 holes." }),
    sld("A bug hotel has 10 holes. Bees use 4 of them. Slide to show how many holes are left.", { min: 0, max: 12, unit: "holes" }, 6, 0, { hint: "10 take away 4.", why: "10 - 4 = 6 holes." })),
];

export const topics = [
  topicLesson({
    slug: "science-class-1-minibeasts", subject: "science", cls: 1, topic: 9, title: "Mini-beasts and Micro-habitats",
    summary: "Small animals, the tiny places where they live, how to look for them kindly, and how to protect their homes.",
    unit: "Topic 9: Mini-beasts and micro-habitats", difficulty: 1,
    objectives: ["Name some mini-beasts and say where they live", "Describe a micro-habitat", "Say how to look after mini-beasts and their homes"],
    success_criteria: ["I can name a mini-beast and its home", "I can say what a micro-habitat is", "I can say how to protect small animals"],
    real_life: "Ants and beetles after rain in a Pakistani field, and slugs, ladybirds and bees in a UK garden.",
    standards: [NC("Y2 living things and habitats", "Identify that most living things live in habitats to which they are suited; identify and name a variety of plants and animals in their habitats, including micro-habitats")],
    warm_up: [
      mc("How many legs does an ant have?", "Six", ["Two", "Eight"], { hint: "Count them in a picture.", why: "An ant has six legs." }),
      tf("A snail lives in a shell.", true, { hint: "Think of a garden.", why: "A snail carries its shell." }),
      mc("Where do worms live?", "In soil", ["In the sky", "In a fire"], { hint: "They tunnel.", why: "Worms live in soil." }),
    ],
    intro: [],
    subs: [homes, hunt, wherelive, protect],
    clip,
    quiz,
  }),
];
