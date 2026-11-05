import { SAY, SS, H, T, IMG, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, ROW, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld, st } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC, PK, CAM } from "./_science-kit.mjs";

// Science Class 1, topic 1: Living things and habitats (Zainab, age 7). Standards from docs/CURRICULUM_V2.md section 3.

const alive = {
  id: "alive", kind: "learn", title: "Alive, dead or never alive",
  blocks: [
    H("Stop 1: What makes something alive?"),
    SAY("Is a puppy alive? Yes! And is a stone alive? No! How can we tell? Living things do some special jobs. They move. They need food and water. They grow bigger. And they can have babies of their own. Let's watch a puppy do these jobs.", T("**Living** things move, feed, grow and have babies.", "A puppy does all of these jobs. A stone does none of them.")),
    EB("meadow", "A puppy is alive",
      SS("Here is a puppy. It runs and jumps. That is moving. All living things move in some way, even plants, but slowly.", S("The puppy moves.", ["p", "🐕", 30, 62, 2, "bounce"])),
      SS("The puppy is hungry! It eats a bone and drinks water. Living things need food and water to stay alive.", S("The puppy eats and drinks.", ["p", "🐕", 30, 62, 2, "none"], ["f", "🦴", 55, 70, 1, "bounce"], ["w", "💧", 70, 70, 1, "bounce"])),
      SS("Soon the puppy grows bigger. It is a big dog now! Living things grow.", S("The puppy grows into a big dog.", ["p", "🐕", 40, 58, 3, "grow"])),
      SS("And one day the dog has puppies of its own. Living things can have babies.", S("The dog has babies.", ["p", "🐕", 35, 58, 3, "none"], ["b1", "🐶", 62, 66, 2, "bounce"], ["b2", "🐶", 78, 66, 2, "bounce"]))),
    CHK(mc("Which of these things is alive?", "A kitten", ["A pebble", "A toy car"], { hint: "Alive things move, grow and need food.", why: "A kitten eats, grows and moves. A pebble and a toy car do not." })),
    H("Stop 2: Dead and never alive"),
    SAY("Some things were alive once, but are not any more. We say they are dead. A fallen leaf, a bone and a log were all alive once. Other things were never alive at all. A stone, a spoon and a toy never ate, grew or had babies. Look at the two groups.", T("Some things are **dead**: they were alive once, like a leaf or a bone.", "Some things are **never alive**: a stone or a spoon.")),
    IMG("🍂 🦴 🪵", "Once alive: a leaf, a bone and a log."),
    IMG("🪨 🥄 🧸", "Never alive: a stone, a spoon and a toy."),
    CHK(mc("A stone has never been alive. Which word fits a stone?", "Never alive", ["Dead", "Living"], { hint: "Did a stone ever eat or grow?", why: "A stone was never alive, so it is not dead either. It is a never alive thing." })),
    SAY("Let us remember. Living things move, feed, grow and have babies. Dead things were alive once. Never alive things never were.", SUM("Living things move, need food, grow and have babies", "Dead things were alive once", "Never alive things were never alive")),
    GLOSS({ living: "Alive. A living thing moves, feeds, grows and has babies.", dead: "Something that was alive once but is not now.", "never alive": "Something that was never alive, like a stone." }),
  ],
  mini: [
    tf("A living thing needs food and water.", true, { hint: "Think of your pet or yourself.", why: "All living things need food and water." }),
    mc("Which one is dead (it was alive once)?", "A fallen leaf", ["A shiny coin", "A plastic cup"], { hint: "Which one came from a tree?", why: "A leaf grew on a tree, so it was alive once." }),
    mat("Match each thing to its group.", [["Dog", "Living"], ["Dry bone", "Dead"], ["Spoon", "Never alive"]], { hint: "Was it ever alive?", why: "A dog is living, a bone was alive once, a spoon never was." }),
    ms("Which jobs do living things do? Pick two.", ["Grow", "Need food"], ["Melt in the sun", "Break when dropped"], { hint: "Think about a puppy.", why: "Living things grow and need food." }),
  ],
};

const habitats = {
  id: "habitats", kind: "try", title: "Habitat hunt",
  blocks: [
    H("Stop 1: A home for living things"),
    SAY("Every animal and plant lives somewhere that suits it. That place is called its habitat. A fish lives in the pond. A camel lives in the desert. A squirrel lives in the woods. A habitat gives living things the food, water and shelter they need. Look at four habitats.", T("A **habitat** is the place where a plant or animal lives.", "It gives them food, water and shelter.")),
    EB("pond", "Four habitats",
      SS("A pond is wet. Frogs, fish and ducks live here. It has plenty of water.", S("A pond: frog, fish and duck.", ["a", "🐸", 25, 60, 2, "bounce"], ["b", "🐟", 50, 72, 2, "float"], ["c", "🦆", 75, 55, 2, "float"])),
      SS("A woodland has trees. Squirrels and owls live here, and so do hedgehogs, safe in the leaves.", S("A wood: squirrel, owl and hedgehog.", ["a", "🐿️", 25, 60, 2, "bounce"], ["b", "🦉", 50, 38, 2, "none"], ["c", "🦔", 75, 70, 2, "none"])),
      SS("A desert is hot and dry. Camels and lizards live here. They can manage with very little water.", S("A desert: camel and lizard.", ["a", "🐪", 30, 60, 3, "none"], ["b", "🦎", 70, 70, 2, "bounce"])),
      SS("The sea is salty and deep. Fish, turtles and crabs live there.", S("The sea: fish, turtle and crab.", ["a", "🐠", 25, 50, 2, "float"], ["b", "🐢", 55, 62, 2, "float"], ["c", "🦀", 80, 78, 2, "bounce"]))),
    CHK(mc("Where does a camel live?", "The desert", ["The pond", "The sea"], { hint: "Camels can go a long time without water.", why: "Camels live in hot, dry deserts.", })),
    H("Stop 2: Match the animal to its home"),
    SAY("Now it is your turn to be a nature detective. Here are lots of animals. Drag the water animals into the Water box, and the land animals into the Land box. Think about where each one likes to live.", MAN("Water or land?", "Move the animals. Water animals go in Water. Land animals go in Land.", "🐸", 10, ["Water", "Land"])),
    ACT("A habitat walk", ["A grown-up", "A garden, park or balcony", "Paper and a pencil"], ["Go outside and look for one small animal, like an ant, a bird or a snail.", "Where is it? Is it in the soil, under a stone, in a tree or in water?", "Draw the animal and its home. Say why it likes to live there."]),
    CHK(tf("A habitat gives an animal food, water and a safe place to live.", true, { hint: "Why do animals stay in their habitat?", why: "A habitat gives animals what they need to live." })),
    SAY("Remember. A habitat is where a plant or animal lives. Different animals live in different habitats.", SUM("A habitat is where a plant or animal lives", "A habitat gives food, water and shelter")),
    GLOSS({ habitat: "The place where a plant or animal lives.", shelter: "A safe place to hide or rest.", desert: "A very dry place with little rain." }),
  ],
  mini: [
    mc("Where does a fish live?", "In the water", ["In a desert", "In a tree"], { hint: "Fish breathe in water.", why: "Fish live in ponds, rivers and the sea." }),
    mat("Match each animal to its habitat.", [["Owl", "Wood"], ["Camel", "Desert"], ["Crab", "Sea"]], { hint: "Where is its food and shelter?", why: "Owls nest in trees, camels cope in deserts, crabs live in the sea." }),
    tf("All animals live in the same habitat.", false, { hint: "Is a fish at home in a desert?", why: "Different animals live in different habitats." }),
    fill("Finish the sentence.", "A {b1} is the place where an animal {b2}.", [["habitat", "colour", "number"], ["lives", "dances", "sings"]], { hint: "Home for plants and animals.", why: "A habitat is where an animal lives." }),
  ],
};

const needs = {
  id: "needs", kind: "play", title: "What animals need",
  blocks: [
    H("Stop 1: Food, water, air and shelter"),
    SAY("All animals need four things to stay alive. They need food to give them energy. They need water to drink. They need air to breathe. And they need shelter, a safe place to rest and hide. Look at a rabbit and see what it has.", T("Animals need **food**, water, air and **shelter** to stay alive.")),
    EB("meadow", "What a rabbit needs",
      SS("The rabbit eats grass and carrots. That is its food.", S("Food: grass and carrots.", ["r", "🐇", 30, 62, 3, "bounce"], ["f", "🥕", 65, 70, 2, "bounce"], ["g", "🌿", 80, 72, 2, "none"])),
      SS("It drinks water from a stream.", S("Water to drink.", ["r", "🐇", 30, 62, 3, "none"], ["w", "💧", 70, 70, 2, "bounce"])),
      SS("And it breathes air all the time, even if we cannot see it.", S("Air to breathe.", ["r", "🐇", 30, 62, 3, "none"], ["a", "💨", 70, 40, 2, "float"])),
      SS("Last, the rabbit hides in its burrow. That is its shelter.", S("Shelter: a burrow.", ["r", "🐇", 35, 66, 2, "none"], ["h", "🕳️", 60, 70, 3, "pulse"]))),
    CHK(mc("Which one does a rabbit NOT need to stay alive?", "A toy", ["Water", "Food"], { hint: "Think about what keeps animals alive.", why: "Rabbits need food, water, air and shelter, but not a toy." })),
    H("Stop 2: Brain game"),
    SAY("Warm up your memory with a game. Watch the animals light up, then copy them in the same order. After that, tell me what an animal needs.", T("Play the game, then answer: what do animals need?")),
    SAY("Watch the animals carefully, then copy the order.", BRAIN("remember_order", "Animal lights", "Watch the order, then copy it. It gets longer each time!", ["🐇", "🐟", "🐿️", "🐪"])),
    CHK(ms("Pick two things a fish needs.", ["Water", "Food"], ["A burrow", "A wood"], { hint: "Think about where a fish lives.", why: "A fish needs water and food." })),
    SAY("Let us remember. Animals need food, water, air and shelter.", SUM("Animals need food, water, air and shelter")),
    GLOSS({ food: "What an animal eats to get energy.", shelter: "A safe place to hide or rest.", burrow: "A hole in the ground where an animal lives." }),
  ],
  mini: [
    ms("Pick two things animals need.", ["Water", "Air"], ["A bike", "A hat"], { hint: "What keeps you alive?", why: "Animals need water and air." }),
    tf("A rabbit's burrow is its shelter.", true, { hint: "A burrow is a safe place.", why: "A burrow is a safe home, so it is a shelter." }),
    mc("What does a hungry rabbit eat?", "Grass", ["Stones", "Plastic"], { hint: "Rabbits eat plants.", why: "Rabbits eat grass and vegetables." }),
  ],
};

const chains = {
  id: "chains", kind: "use", title: "Food chains",
  blocks: [
    H("Stop 1: Who eats whom?"),
    SAY("Animals and plants are linked by what they eat. A plant makes its own food from sunlight. A rabbit eats the plant. A fox eats the rabbit. Each step shows where the energy goes. We draw it as a food chain, with arrows that point to the eater.", T("A **food chain** shows who eats what. The arrow points to the eater.", "Plants make their own food, so a chain starts with a plant.")),
    EB("meadow", "A food chain",
      SS("It starts with the sun. The sun gives light to the grass.", S("The Sun helps the grass grow.", ["sun", "☀️", 20, 20, 3, "pulse"], ["g", "🌱", 25, 70, 3, "grow"])),
      SS("The rabbit eats the grass. The arrow points from the grass to the rabbit.", S("Grass → rabbit.", ["g", "🌱", 15, 70, 2, "none"], ["a1", "➡️", 38, 70, 2, "none"], ["r", "🐇", 55, 66, 3, "bounce"])),
      SS("Then the fox eats the rabbit. The arrow points from the rabbit to the fox.", S("Grass → rabbit → fox.", ["g", "🌱", 12, 70, 2, "none"], ["a1", "➡️", 28, 70, 2, "none"], ["r", "🐇", 45, 66, 2, "none"], ["a2", "➡️", 62, 70, 2, "none"], ["f", "🦊", 82, 64, 3, "bounce"]))),
    CHK(mc("In a food chain, what does the arrow point to?", "The one that eats", ["The one that is eaten", "The sun"], { hint: "The energy goes to the eater.", why: "The arrow points to the animal that eats, showing where the energy goes." })),
    H("Stop 2: Build your own chain"),
    SAY("Now put a pond food chain in order. Small plants in the water are eaten by a tadpole. A fish eats the tadpole. A heron eats the fish. Can you drag them into the right order?", IMG("🌿➡️🐸➡️🐟➡️🐦", "A pond food chain: plant, tadpole, fish, heron.")),
    CHK(ord("Put the pond food chain in order, from the plant first.", ["Pond plant", "Tadpole", "Fish", "Heron"], { hint: "Start with the plant.", why: "A food chain starts with a plant, then goes to what eats it." })),
    FACT("Muslims say **SubhanAllah** (glory to Allah) when they see how wonderfully everything in nature is connected."),
    SAY("Remember. A food chain shows who eats what. It starts with a plant, and the arrow points to the eater.", SUM("A food chain shows who eats what", "It starts with a plant", "The arrow points to the eater")),
    GLOSS({ "food chain": "A line of living things showing who eats what.", SubhanAllah: "An Arabic phrase meaning glory to Allah. Muslims say it when they admire something wonderful.", plant: "A living thing that grows in soil and makes its own food." }),
  ],
  mini: [
    ord("Put the food chain in order, plant first.", ["Grass", "Rabbit", "Fox"], { hint: "Start with the plant.", why: "Grass is eaten by a rabbit, and the rabbit by a fox." }),
    mc("What does a fox eat in our food chain?", "A rabbit", ["Grass", "The sun"], { hint: "Fox is the last in the chain.", why: "The fox eats the rabbit." }),
    tf("A food chain always starts with a plant.", true, { hint: "Who makes food from sunlight?", why: "Plants make their own food, so chains start with them." }),
  ],
};

const ALTS = [
  [mc("Which of these is a living thing?", "A goldfish", ["A shoe", "A rock"], { hint: "Which one grows and eats?", why: "A goldfish eats, grows and moves." }), mc("Which one of these is alive and growing?", "A daisy", ["A chair", "A coin"], { hint: "Which one grows?", why: "A daisy grows from a seed and needs water." })],
  [tf("A cup is a living thing.", false, { hint: "Does a cup eat or grow?", why: "A cup is made, not born. It is never alive." }), tf("A teddy bear is a living thing.", false, { hint: "Does a toy grow?", why: "A teddy bear is a toy that was never alive." })],
  [mc("A dry bone was part of an animal once. What do we call it?", "Dead", ["Never alive", "Living"], { hint: "Was it alive once?", why: "It was alive once, so we call it dead." }), mc("A dry stick fell from a tree. What do we call it?", "Dead", ["Never alive", "Living"], { hint: "Was it alive once?", why: "It grew on a tree once, so it is dead." })],
  [mat("Match each one to the right group.", [["Cat", "Living"], ["Wooden log", "Dead"], ["Marble", "Never alive"]], { hint: "Was it ever alive?", why: "A cat is living, a log was alive once, a marble never was." }), mat("Which group does each thing belong to? Match them.", [["Bird", "Living"], ["Dry leaf", "Dead"], ["Brick", "Never alive"]], { hint: "Was it ever alive?", why: "A bird is living, a dry leaf was alive once, a brick never was." })],
  [ms("Pick the two things that every living thing can do.", ["It grows", "It needs food"], ["It never changes", "It is made in a factory"], { hint: "Think of a puppy.", why: "Living things grow and need food." }), ms("Which two jobs show that a thing is alive?", ["It moves", "It has babies"], ["It melts", "It is switched on"], { hint: "Think of a rabbit.", why: "Living things move and have babies." })],
  [hot("Tap the habitat where a camel lives.", [["🏜️", "Desert", 22, 50], ["🌊", "Sea", 50, 50], ["🌳", "Wood", 78, 50]], ["Desert"], { labels: true, hint: "Camels are used to heat.", why: "Camels live in the desert." }), hot("Tap the habitat where a turtle swims.", [["🏜️", "Desert", 22, 50], ["🌊", "Sea", 50, 50], ["🌳", "Wood", 78, 50]], ["Sea"], { labels: true, hint: "Where can a turtle swim?", why: "Sea turtles live in the sea." })],
  [st("What is the word for an animal's home in nature?", ["habitat", "a habitat"], { hint: "It starts with an h.", why: "A habitat is where an animal lives." }), st("What is the word for a safe place to hide and rest?", ["shelter", "a shelter", "home"], { hint: "It starts with an s.", why: "A shelter is a safe place." })],
  [mc("Mia says a seed is not alive because it does not move. Is she right?", "No, a seed is alive and grows into a plant", ["Yes, a seed is a stone", "Yes, only animals are alive"], { hint: "What does a seed turn into?", why: "A seed is alive. It grows when it has water and warmth." }), mc("Ali says a tree is not alive because it does not walk. Is he right?", "No, a tree grows and needs water", ["Yes, only animals are alive", "Yes, a tree is a stone"], { hint: "Does a tree grow?", why: "A tree is alive. It grows, makes seeds and needs water." })],
  [fill("Fill in the gaps.", "Animals need food, {b1}, air and {b2}.", [["water", "paper", "toys"], ["shelter", "paint", "music"]], { hint: "Four needs of animals.", why: "Animals need food, water, air and shelter." }), fill("Choose the missing words.", "Animals need {b1}, water, air and {b2}.", [["food", "games", "money"], ["shelter", "sweets", "shoes"]], { hint: "Four needs of animals.", why: "Animals need food, water, air and shelter." })],
  [num("Food, water, air and shelter: how many needs is that for an animal?", 4, { hint: "Count them.", why: "Food, water, air and shelter make four." }), num("A hedgehog needs food, water, air and shelter. How many needs is that?", 4, { hint: "Count each one.", why: "There are four needs." })],
  [sld("A food chain has a plant, a rabbit and a fox. How many animals are in it?", { min: 0, max: 6, unit: "animals" }, 2, 0, { hint: "A plant is not an animal.", why: "The rabbit and the fox are the two animals." }), sld("A pond chain has a plant, a tadpole, a fish and a heron. How many animals are in it?", { min: 0, max: 6, unit: "animals" }, 3, 0, { hint: "A plant is not an animal.", why: "The tadpole, fish and heron are three animals." })],
  [ord("Order the food chain, starting with the plant.", ["Grass", "Grasshopper", "Frog"], { hint: "Plant first.", why: "The grasshopper eats the grass, then the frog eats the grasshopper." }), ord("Arrange this food chain, plant first.", ["Seed", "Mouse", "Owl"], { hint: "Plant first.", why: "The mouse eats the seed, then the owl eats the mouse." })],
  [mc("In the chain grass → rabbit → fox, what does the fox get from eating the rabbit?", "Energy", ["Seeds", "Water only"], { hint: "Why do animals eat?", why: "Animals eat to get energy." }), mc("In the chain seed → mouse → owl, what does the owl get from eating the mouse?", "Energy", ["Seeds", "Water only"], { hint: "Why do animals eat?", why: "Animals eat to get energy." })],
  [mc("A rabbit wanders into a desert with no grass. What will happen?", "It will struggle to find food", ["It will be fine", "It will turn into a camel"], { hint: "Does the desert have the rabbit's food?", why: "Animals need their habitat to give them the right food and water." }), mc("A fish is put on dry land. Why can it not live there?", "It cannot get the water and air it needs", ["It is too big", "It is too happy"], { hint: "Where do fish live?", why: "Fish need water to live." })],
];

export const topics = [
  topicLesson({
    slug: "science-class-1-living-things", subject: "science", cls: 1, topic: 1, title: "Living Things and Habitats",
    summary: "What makes something alive, where animals live, what they need, and how food chains link them.",
    unit: "Topic 1: Living things", difficulty: 1,
    objectives: ["Sort things into living, dead and never alive", "Name habitats and the animals that live there", "Say what animals need to stay alive", "Build a simple food chain"],
    success_criteria: ["I can tell if something is alive, dead or never alive", "I can match an animal to its habitat", "I can say what animals need", "I can put a food chain in order"],
    real_life: "Looking for snails, birds and insects in your garden or park.",
    standards: [NC("Y2 living things", "Explore and compare things that are living, dead and never alive"), NC("Y2 habitats", "Identify that most living things live in habitats to which they are suited"), PK("GK-01-F-10"), ...CAM("2Be.01", "2Be.02", "2Be.03")],
    warm_up: [
      mc("Which of these is an animal?", "A cat", ["A table", "A cloud"], { hint: "Animals move and eat.", why: "A cat is an animal." }),
      tf("Plants need water.", true, { hint: "Think of watering a flower.", why: "Plants need water to grow." }),
      mc("Where would you find a fish?", "In water", ["In the sky", "In a tree"], { hint: "Fish swim.", why: "Fish live in water." }),
    ],
    intro: [
      H("Welcome back, young scientist!"),
      SAY("Welcome back, young scientist! Today's big question is: how can we tell what is alive? And where do animals live? By the end, you will sort living things from things that are not, match animals to their homes, and build a food chain. Let's go!", T("Today's big question: how can we tell what is alive?", "We will meet animals in their homes.")),
      IMG("🐸🌳🐟🐪", "Animals live in different places."),
      GLOSS({ alive: "Living. Able to move, feed, grow and have babies." }),
    ],
    subs: [alive, habitats, needs, chains],
    quiz: [
      Q("alive", "recall", "living.alive", mc("Which of these is alive?", "A tulip", ["A pencil", "A pebble"], { hint: "Which one grows?", why: "A tulip grows from a bulb and needs water." }), ...ALTS[0]),
      Q("alive", "recall", "living.not_alive", tf("A bicycle is a living thing.", false, { hint: "Does a bike eat or grow?", why: "A bike is made in a factory. It was never alive." }), ...ALTS[1]),
      Q("alive", "apply", "living.dead", mc("A leaf fell off a tree and is dry and brown. What do we call it?", "Dead", ["Never alive", "Living"], { hint: "Was it alive once?", why: "It was alive on the tree once, so it is dead." }), ...ALTS[2]),
      Q("alive", "apply", "living.sort", mat("Sort these things into living, dead or never alive.", [["Fish", "Living"], ["Old shell", "Dead"], ["Plastic ball", "Never alive"]], { hint: "Was it ever alive?", why: "A fish is living, an old shell was alive once, a plastic ball never was." }), ...ALTS[3]),
      Q("alive", "apply", "living.jobs", ms("Which are jobs a living thing does? Pick two.", ["It grows", "It moves"], ["It rusts", "It is switched on"], { hint: "Think of a puppy.", why: "Living things grow and move." }), ...ALTS[4]),
      Q("habitats", "recall", "habitats.match", hot("Tap the habitat where a duck swims.", [["🏜️", "Desert", 22, 50], ["🌊", "Pond", 50, 50], ["🌳", "Wood", 78, 50]], ["Pond"], { labels: true, hint: "Ducks like water.", why: "Ducks swim in ponds." }), ...ALTS[5]),
      Q("habitats", "recall", "habitats.word", st("What do we call the place where an animal lives?", ["habitat", "a habitat", "home"], { hint: "It starts with h.", why: "That place is a habitat." }), ...ALTS[6]),
      Q("alive", "reason", "living.reason", mc("Sara says a seed is not alive because it does not move. Is she right?", "No, a seed is alive and grows into a plant", ["Yes, a seed is a pebble", "Yes, only animals are alive"], { hint: "What does a seed grow into?", why: "A seed is alive. It grows when it has water and warmth." }), ...ALTS[7]),
      Q("needs", "apply", "needs.complete", fill("Complete the sentence.", "Animals need {b1}, water, {b2} and shelter.", [["food", "games", "money"], ["air", "paint", "sweets"]], { hint: "Four needs of animals.", why: "Animals need food, water, air and shelter." }), ...ALTS[8]),
      Q("needs", "recall", "needs.count", num("How many things do animals need to stay alive (food, water, air, shelter)?", 4, { hint: "Count the four needs.", why: "There are four needs." }), ...ALTS[9]),
      Q("chains", "apply", "chains.count", sld("A food chain has grass, a rabbit and a fox. How many animals are in it?", { min: 0, max: 6, unit: "animals" }, 2, 0, { hint: "Grass is a plant.", why: "The rabbit and the fox are the two animals." }), ...ALTS[10]),
      Q("chains", "apply", "chains.order", ord("Put this food chain in order, plant first.", ["Leaf", "Caterpillar", "Bird"], { hint: "Plant first.", why: "The caterpillar eats the leaf, then the bird eats the caterpillar." }), ...ALTS[11]),
      Q("chains", "reason", "chains.energy", mc("In the chain grass → rabbit → fox, why does the fox eat the rabbit?", "To get energy", ["To get seeds", "To get a home"], { hint: "Why do animals eat?", why: "Animals eat to get energy." }), ...ALTS[12]),
      Q("habitats", "reason", "habitats.reason", mc("A polar bear is moved to a hot desert. Why would it struggle?", "The desert does not give it the right food, water and shelter", ["Polar bears are too fast", "Polar bears never need food"], { hint: "Is a desert like its home?", why: "Animals are suited to their own habitat, which gives them what they need." }), ...ALTS[13]),
      Q("needs", "reason", "needs.reason", mc("Sam says a rabbit only needs food to live. What is missing?", "It also needs water, air and shelter", ["Nothing is missing", "It needs a toy"], { hint: "How many needs are there?", why: "A rabbit needs food, water, air and shelter." }),
        mc("Nina says a fish only needs food. What is missing?", "It also needs water, air and shelter", ["Nothing is missing", "It needs a toy"], { hint: "How many needs are there?", why: "A fish needs food, water, air and shelter." }),
        mc("Hamza says a bird only needs a nest. What is missing?", "It also needs food, water and air", ["Nothing is missing", "It needs a toy"], { hint: "How many needs are there?", why: "A bird needs food, water, air and shelter." })),
    ],
  }),
];
