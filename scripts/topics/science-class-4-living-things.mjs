import { SAY, SS, H, T, IMG, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, TABLE, mc, ms, tf, num, ord, mat, fill, hot, sld, st } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC, PK, CAM } from "./_science-kit.mjs";

// Science Class 4, topic 1: Living things (Fatima, age 9). Enquiry type: identifying and classifying.

const groups = {
  id: "groups", kind: "learn", title: "Vertebrates and invertebrates",
  blocks: [
    H("Stop 1: Animals with and without backbones"),
    SAY("Scientists sort living things into groups. This is called classification. The first big split is about the backbone. Vertebrates have a backbone inside their body. Humans, fish, birds, reptiles, amphibians and mammals are all vertebrates. Invertebrates have no backbone at all. Insects, spiders, worms and snails are invertebrates. Over nine in ten animals on Earth are invertebrates!", T("**Vertebrates** have a backbone. **Invertebrates** do not.", "Sorting living things into groups is called **classification**.")),
    EB("meadow", "Two big animal groups",
      SS("This cat is a vertebrate. Inside its body is a backbone made of small bones, called vertebrae, that holds its body up.", S("A cat has a backbone.", ["a", "🐈", 40, 58, 3, "none"], ["b", "🦴", 75, 55, 2, "pulse"])),
      SS("A snail has no backbone. Its body is soft, with a hard shell outside. It is an invertebrate.", S("A snail has no backbone.", ["a", "🐌", 40, 62, 3, "none"])),
      SS("Insects like a butterfly are invertebrates too. They have six legs and a hard outer covering called an exoskeleton.", S("A butterfly: an invertebrate.", ["a", "🦋", 40, 50, 3, "float"]))),
    CHK(mc("Which of these animals is an invertebrate?", "A snail", ["A fish", "A goat"], { hint: "It has no bones inside.", why: "A snail has no backbone, so it is an invertebrate." })),
    H("Stop 2: The five vertebrate groups"),
    SAY("Vertebrates split into five groups. Mammals have hair and feed their young milk. Birds have feathers and lay hard-shelled eggs. Reptiles have dry scales. Amphibians have moist skin and live part of life in water. Fish have gills and fins. Look at one animal from each.", T("The five vertebrate groups are **mammals**, **birds**, reptiles, amphibians and fish.")),
    IMG("🐘 🦅 🐊 🐸 🐟", "A mammal, a bird, a reptile, an amphibian and a fish."),
    CHK(mc("A shark has gills and fins and lives in the sea. Which group is it in?", "Fish", ["Mammals", "Reptiles"], { hint: "Gills and fins.", why: "A shark is a fish. A whale is a mammal, but a shark is a fish." })),
    SAY("Remember. Vertebrates have a backbone and invertebrates do not. Vertebrates are in five groups.", SUM("Vertebrates have a backbone; invertebrates do not", "Vertebrates are mammals, birds, reptiles, amphibians and fish", "Classification means sorting into groups")),
    GLOSS({ vertebrates: "Animals with a backbone.", invertebrates: "Animals with no backbone, like insects and snails.", classification: "Sorting living things into groups by what they have in common.", mammals: "Vertebrates with hair that feed their young milk.", birds: "Vertebrates with feathers that lay eggs." }),
  ],
  mini: [
    mc("Which of these is a vertebrate?", "A sparrow", ["A spider", "A worm"], { hint: "It has a backbone.", why: "A sparrow is a bird, and birds have backbones." }),
    tf("A spider is a vertebrate.", false, { hint: "Does a spider have a backbone?", why: "Spiders have no backbone, so they are invertebrates." }),
    mat("Match each animal to its group.", [["Whale", "Mammal"], ["Eagle", "Bird"], ["Gecko", "Reptile"]], { hint: "Think about their body covering.", why: "A whale is a mammal, an eagle a bird and a gecko a reptile." }),
    num("How many groups of vertebrates are there?", 5, { hint: "Mammals, birds, reptiles, amphibians, fish.", why: "There are five vertebrate groups." }),
  ],
};

const keys = {
  id: "keys", kind: "try", title: "Classification keys",
  blocks: [
    H("Stop 1: How a key works"),
    SAY("A classification key is a tool for naming a living thing. You answer yes or no questions, one at a time. Each answer leads you closer to the name. Watch this key sort four animals. Does it have legs? Does it have wings? Each question splits the group in two.", T("A **classification key** uses yes or no questions to identify a living thing.", "Each question splits the group into two smaller groups.")),
    EB("classroom", "A key in action",
      SS("We start with four animals: a bird, a fish, a snake and a dog.", S("Four animals.", ["a", "🐦", 20, 55, 2, "none"], ["b", "🐟", 40, 55, 2, "none"], ["c", "🐍", 60, 55, 2, "none"], ["d", "🐕", 80, 55, 2, "none"])),
      SS("Question one: does it have legs? The bird and the dog say yes. The fish and the snake say no.", S("Legs: bird and dog. No legs: fish and snake.", ["a", "🐦", 15, 40, 2, "bounce"], ["d", "🐕", 35, 40, 2, "bounce"], ["b", "🐟", 65, 70, 2, "none"], ["c", "🐍", 85, 70, 2, "none"])),
      SS("Question two for the legs group: does it have feathers? The bird says yes, so we have named it. The dog says no.", S("Feathers: bird. No feathers: dog.", ["a", "🐦", 20, 40, 3, "pulse"], ["d", "🐕", 50, 70, 2, "none"]))),
    CHK(mc("Which question would split a fish from a snake?", "Does it have fins?", ["Does it have legs?", "Is it alive?"], { hint: "Both have no legs.", why: "Fish have fins but snakes do not. Neither has legs, so legs would not split them." })),
    H("Stop 2: Build your own key"),
    SAY("Now be the scientist. Sort these animals with the question, does it live in water? Then make your own question for the land animals. Then try the activity with things in your kitchen.", MAN("Key question: lives in water?", "Put water animals in Water, and land animals in Land.", "🐟", 10, ["Water", "Land"])),
    ACT("A key for kitchen items", ["Six kitchen items such as a spoon, a cup, an apple, a pencil, a fork and a key", "Paper and pencil", "A grown-up"], ["Put the six items on the table.", "Write a yes or no question that splits them, for example, is it metal?", "Keep splitting each group with a new question until every item is alone. Draw your key as a tree."]),
    CHK(ms("Pick two good yes or no questions for a key.", ["Does it have wings?", "Does it have a backbone?"], ["Is it nice?", "Do I like it?"], { hint: "A good question has a clear yes or no answer.", why: "Questions about features you can check, like wings or a backbone, make good key questions." })),
    SAY("Remember. A key uses yes or no questions about features to name living things.", SUM("A classification key uses yes or no questions", "Good questions are about features you can see or check")),
    GLOSS({ "classification key": "A set of yes or no questions used to identify a living thing.", feature: "Something about how a living thing looks or what it has, such as wings.", identify: "To say what something is.", species: "A particular kind of living thing." }),
  ],
  mini: [
    tf("A key question should have a clear yes or no answer.", true, { hint: "Think about 'Is it nice?'", why: "Clear yes or no questions make a key work." }),
    mc("Which feature would split birds from fish?", "Feathers", ["Being alive", "Being animals"], { hint: "Only one has these.", why: "Birds have feathers; fish do not." }),
    ord("Put these steps of using a key in order.", ["Look at the living thing", "Answer a yes or no question", "Follow the branch to the name"], { hint: "Start by looking.", why: "You look, answer, then follow the branch." }),
  ],
};

const adapt = {
  id: "adapt", kind: "play", title: "Adaptations",
  blocks: [
    H("Stop 1: Suited to their habitat"),
    SAY("An adaptation is a feature that helps a living thing survive in its habitat. A camel has wide feet that do not sink in sand, long eyelashes to keep sand out, and a hump that stores fat for food. A polar bear has thick fur and a layer of fat to keep warm in the freezing Arctic. Look at these adaptations in action.", T("An **adaptation** is a feature that helps a living thing survive in its **habitat**.", "A camel and a polar bear are adapted to very different homes.")),
    EB("desert", "Adapted to survive",
      SS("A camel's wide, flat feet spread its weight so it does not sink into sand. Its hump stores fat, which it can use as energy when food is scarce.", S("The camel is adapted to the desert.", ["c", "🐪", 50, 58, 3, "none"], ["s", "☀️", 80, 20, 2, "pulse"])),
      SS("A polar bear has thick white fur and a fat layer. They keep it warm, and the white colour helps it hide in the snow.", S("The polar bear is adapted to the Arctic.", ["p", "🐻‍❄️", 50, 58, 3, "none"], ["w", "❄️", 20, 25, 2, "float"], ["w2", "❄️", 80, 30, 2, "float"]))),
    CHK(mc("Why does a polar bear have thick fur and fat?", "To keep warm in the cold", ["To run fast", "To swim like a fish"], { hint: "The Arctic is freezing.", why: "Thick fur and fat are adaptations that keep it warm." })),
    H("Stop 2: Adaptation brain game"),
    SAY("Warm up your memory with a game, then match each animal to its adaptation.", BRAIN("memory_match", "Habitat pairs", "Find the matching pairs.", ["🐪", "🐻‍❄️", "🦉", "🐟"])),
    CHK(mat("Match each animal to its adaptation.", [["Owl", "Large eyes for seeing at night"], ["Fish", "Gills for breathing underwater"], ["Camel", "Hump for storing fat"]], { hint: "Think about each habitat.", why: "Each adaptation suits the animal's way of life." })),
    SAY("Remember. Adaptations are features that help living things survive where they live.", SUM("An adaptation helps a living thing survive in its habitat", "Different habitats need different adaptations")),
    GLOSS({ adaptation: "A feature that helps a living thing survive in its habitat.", habitat: "The place where a living thing lives.", survive: "To stay alive.", Arctic: "The very cold area around the North Pole." }),
  ],
  mini: [
    tf("A camel's hump stores fat for energy.", true, { hint: "It is not full of water.", why: "A camel's hump stores fat." }),
    mc("Why does a fish have gills?", "To breathe underwater", ["To fly", "To dig"], { hint: "Think about where fish live.", why: "Gills let fish take in oxygen from water." }),
    mat("Match the habitat to an adaptation.", [["Desert", "Wide feet"], ["Arctic", "Thick fur"], ["Sea", "Fins"]], { hint: "What does the animal need?", why: "Each adaptation suits its habitat." }),
  ],
};

const chains = {
  id: "chains", kind: "use", title: "Plants, food chains and energy",
  blocks: [
    H("Stop 1: How plants make food"),
    SAY("Plants are special because they make their own food. This is called photosynthesis. The leaves take in light from the Sun and carbon dioxide from the air. Roots take in water. The plant uses them to make sugar for energy, and gives out oxygen. Animals breathe in this oxygen. Without plants there would be no food and little oxygen.", T("Plants make food in their leaves using light, water and carbon dioxide. This is called **photosynthesis**.", "They also give out **oxygen**.")),
    EB("meadow", "Photosynthesis",
      SS("Sunlight shines on the leaves of a plant.", S("Light is absorbed by the leaves.", ["p", "🌿", 50, 58, 3, "none"], ["s", "☀️", 20, 20, 3, "pulse"])),
      SS("The roots take in water and the leaves take in carbon dioxide from the air.", S("Water and carbon dioxide go in.", ["p", "🌿", 50, 58, 3, "none"], ["w", "💧", 22, 82, 2, "bounce"], ["c", "💨", 80, 35, 2, "float"])),
      SS("The plant makes sugar for energy, and releases oxygen into the air.", S("Sugar is made and oxygen comes out.", ["p", "🌿", 50, 58, 3, "pulse"], ["o", "🫧", 80, 25, 2, "float"], ["g", "🍬", 25, 40, 2, "bounce"]))),
    CHK(mc("What do plants release when they make food?", "Oxygen", ["Smoke", "Sugar only"], { hint: "Animals breathe it in.", why: "Plants give out oxygen when they make food." })),
    H("Stop 2: Producers, predators and prey"),
    SAY("In a food chain, the plant is the producer, because it makes food. Animals that eat plants are called herbivores, and animals that eat other animals are carnivores. A predator hunts other animals. The animal it hunts is called its prey. In this chain, grass is eaten by a rabbit, the rabbit is prey, and the fox is the predator.", T("A **producer** makes its own food. A **predator** hunts **prey**.", "A **consumer** eats other living things.")),
    EB("meadow", "A food chain",
      SS("The grass is the producer. It makes its own food from sunlight.", S("Producer: grass.", ["g", "🌱", 15, 70, 3, "grow"], ["s", "☀️", 20, 15, 2, "pulse"])),
      SS("The rabbit eats the grass. It is a consumer, and a herbivore.", S("Rabbit: consumer (herbivore).", ["g", "🌱", 15, 70, 2, "none"], ["a1", "➡️", 33, 70, 2, "none"], ["r", "🐇", 52, 66, 3, "bounce"])),
      SS("The fox hunts the rabbit. The fox is the predator and the rabbit is its prey.", S("Fox: predator. Rabbit: prey.", ["g", "🌱", 10, 70, 2, "none"], ["a1", "➡️", 25, 70, 2, "none"], ["r", "🐇", 42, 66, 2, "none"], ["a2", "➡️", 60, 70, 2, "none"], ["f", "🦊", 82, 62, 3, "bounce"]))),
    CHK(mc("In grass → rabbit → fox, which is the predator?", "The fox", ["The rabbit", "The grass"], { hint: "It hunts another animal.", why: "The fox hunts the rabbit, so it is the predator." })),
    SAY("Remember. Plants make food by photosynthesis. In a food chain the producer is first, and predators hunt prey.", SUM("Plants make food using light, water and carbon dioxide, and release oxygen", "A producer makes food; a consumer eats", "A predator hunts prey")),
    GLOSS({ photosynthesis: "How plants make their own food, using light, water and carbon dioxide.", oxygen: "The gas in the air that animals need to breathe.", producer: "A living thing that makes its own food, like a plant.", predator: "An animal that hunts other animals for food.", prey: "An animal that is hunted by a predator.", consumer: "A living thing that eats other living things.", "carbon dioxide": "A gas in the air that plants use to make food." }),
  ],
  mini: [
    mat("Match each word to its meaning.", [["Producer", "Makes its own food"], ["Predator", "Hunts other animals"], ["Prey", "Is hunted"]], { hint: "Think about the food chain.", why: "Producers make food, predators hunt and prey are hunted." }),
    ord("Put the food chain in order, producer first.", ["Grass", "Rabbit", "Fox"], { hint: "Start with the plant.", why: "Energy goes from the grass to the rabbit to the fox." }),
    tf("Plants release oxygen when they make food.", true, { hint: "Animals need it to breathe.", why: "Photosynthesis releases oxygen." }),
    mc("What do plants take in through their roots?", "Water", ["Oxygen", "Sugar"], { hint: "They drink it from the soil.", why: "Roots take in water." }),
  ],
};

const ALTS = [
  [mc("Which animal is a vertebrate?", "A lizard", ["A slug", "A beetle"], { hint: "It has a backbone.", why: "A lizard is a reptile with a backbone." }), mc("Which animal is an invertebrate?", "A worm", ["A mouse", "A frog"], { hint: "It has no backbone.", why: "A worm has no backbone." })],
  [tf("An insect has a backbone.", false, { hint: "Is an insect a vertebrate?", why: "Insects have no backbone. They are invertebrates." }), tf("A frog is a vertebrate.", true, { hint: "Does it have a backbone?", why: "A frog is an amphibian, so it has a backbone." })],
  [mat("Pair each animal with its group.", [["Dolphin", "Mammal"], ["Penguin", "Bird"], ["Salmon", "Fish"]], { hint: "Think about their features.", why: "A dolphin is a mammal, a penguin is a bird and a salmon is a fish." }), mat("Link each animal to its group.", [["Toad", "Amphibian"], ["Bat", "Mammal"], ["Turtle", "Reptile"]], { hint: "Think about their features.", why: "A toad is an amphibian, a bat is a mammal and a turtle is a reptile." })],
  [ms("Pick two good yes or no questions for a key about animals.", ["Does it have scales?", "Does it have six legs?"], ["Is it cute?", "Is it my favourite?"], { hint: "A good question has a clear answer.", why: "Scales and legs can be checked." }), ms("Pick two features that could split birds from mammals.", ["Feathers", "Hair or fur"], ["Being nice", "Being big"], { hint: "Look at the body covering.", why: "Birds have feathers and mammals have hair or fur." })],
  [hot("Tap the invertebrate.", [["🐌", "Snail", 22, 50], ["🐟", "Fish", 50, 50], ["🐕", "Dog", 78, 50]], ["Snail"], { labels: true, hint: "No backbone.", why: "A snail has no backbone." }), hot("Tap the vertebrate.", [["🐛", "Caterpillar", 22, 50], ["🐸", "Frog", 50, 50], ["🐜", "Ant", 78, 50]], ["Frog"], { labels: true, hint: "It has a backbone.", why: "A frog has a backbone." })],
  [st("What is the word for animals with no backbone?", ["invertebrates", "invertebrate"], { hint: "It starts with in.", why: "Animals with no backbone are invertebrates." }), st("What is the word for animals with a backbone?", ["vertebrates", "vertebrate"], { hint: "It starts with ver.", why: "Animals with a backbone are vertebrates." })],
  [mc("Which question helps split a bird from a dog?", "Does it have feathers?", ["Is it an animal?", "Does it eat?"], { hint: "They are both animals that eat.", why: "Only birds have feathers." }), mc("Which question helps split a snake from a bat?", "Does it have hair?", ["Is it alive?", "Does it have a backbone?"], { hint: "Both have a backbone.", why: "A bat has hair; a snake does not." })],
  [fill("Complete the sentences about adaptations.", "A polar bear has thick {b1} to keep {b2}.", [["fur", "wings", "scales"], ["warm", "cool", "wet"]], { hint: "It lives in the Arctic.", why: "Thick fur keeps a polar bear warm." }), fill("Complete the sentences about camels.", "A camel's {b1} stores {b2}.", [["hump", "tail", "nose"], ["fat", "water", "sand"]], { hint: "It gives energy.", why: "A camel's hump stores fat." })],
  [num("A key splits 8 animals into two equal groups. How many are in each group?", 4, { hint: "Divide 8 by 2.", why: "8 divided by 2 is 4." }), num("A key splits 10 animals into two equal groups. How many animals are in each group?", 5, { hint: "Divide 10 by 2.", why: "10 divided by 2 is 5." })],
  [sld("A garden has 10 animals: 7 are invertebrates. Slide to show how many are vertebrates.", { min: 0, max: 10, unit: "animals" }, 3, 0, { hint: "10 minus 7.", why: "10 - 7 = 3 vertebrates." }), sld("A pond has 12 animals: 9 are invertebrates. Slide to show how many are vertebrates.", { min: 0, max: 12, unit: "animals" }, 3, 0, { hint: "12 minus 9.", why: "12 - 9 = 3 vertebrates." })],
  [ord("Put this food chain in order, producer first.", ["Seaweed", "Small fish", "Seal"], { hint: "The plant first.", why: "The seaweed is eaten by small fish, which are eaten by a seal." }), ord("Order this chain, starting with the producer.", ["Leaf", "Caterpillar", "Robin"], { hint: "The plant first.", why: "A caterpillar eats the leaf and a robin eats the caterpillar." })],
  [mc("Ahmed says a whale is a fish because it lives in the sea. Why is he wrong?", "A whale breathes air and feeds its young milk, so it is a mammal", ["A whale has gills", "A whale is an insect"], { hint: "How do whales feed their young?", why: "Whales are mammals. They breathe air and feed milk." }), mc("Sana says a bat is a bird because it flies. Why is she wrong?", "A bat has fur and feeds its young milk, so it is a mammal", ["A bat has feathers", "A bat is an insect"], { hint: "Look at its body covering.", why: "Bats are mammals with fur." })],
  [mc("Why do camels have wide, flat feet?", "So they do not sink into the sand", ["So they can swim", "So they can fly"], { hint: "Think about walking on sand.", why: "Wide feet spread the weight over the sand." }), mc("Why are polar bears white?", "It helps them hide in the snow", ["It makes them taller", "It helps them swim"], { hint: "Think about camouflage.", why: "White fur helps a polar bear blend in with snow and ice." })],
  [mc("A student says plants get their food from the soil. What is the correct idea?", "Plants make their own food in their leaves using light", ["Plants eat soil", "Plants take sugar from animals"], { hint: "Think about photosynthesis.", why: "Plants make food in their leaves using light, water and carbon dioxide." }), mc("A student says plants do not need light. What is wrong?", "Plants need light to make food", ["Plants need only sugar", "Plants do not make food"], { hint: "Think about the leaf.", why: "Light is needed for photosynthesis." })],
  [mc("Tom says the fox is the producer in leaf → caterpillar → robin. Why is he wrong?", "The leaf makes its own food, so the leaf is the producer", ["A fox is not a predator", "The robin makes food from light"], { hint: "Which one is the plant?", why: "A leaf (a plant) makes its own food, so it is the producer." }), mc("Ruby says the seal is the producer in seaweed → small fish → seal. Why is she wrong?", "Seaweed makes its own food, so seaweed is the producer", ["Seals eat sunlight", "Small fish are producers"], { hint: "Which one is the plant-like organism?", why: "Seaweed makes its own food, so it is the producer." })],
];

export const topics = [
  topicLesson({
    slug: "science-class-4-living-things", subject: "science", cls: 4, topic: 1, title: "Living Things",
    summary: "Vertebrates and invertebrates, classification keys, adaptations, how plants make food and food chains.",
    unit: "Topic 1: Living things", difficulty: 2,
    objectives: ["Sort animals into vertebrate and invertebrate groups", "Use and make a classification key", "Explain adaptations to a habitat", "Describe photosynthesis and a food chain"],
    success_criteria: ["I can sort animals into groups and explain why", "I can use a yes or no key", "I can explain an adaptation", "I can describe how plants make food and name a producer, predator and prey"],
    real_life: "Spotting insects in the garden, naming a bird by its features, and understanding why plants matter.",
    standards: [NC("Y4 living things", "Recognise that living things can be grouped in a variety of ways; use classification keys; recognise environments can change"), NC("Y3 plants (link)", "Explore the part that flowers play in the life cycle; how plants make food"), PK("S-04-A-05"), PK("S-04-A-14"), PK("S-04-A-24"), ...CAM("4Bs.05", "4Bp.03", "4Be.01", "4Be.02", "4Be.03")],
    warm_up: [
      mc("Which group has feathers?", "Birds", ["Fish", "Mammals"], { hint: "Think of a parrot.", why: "Birds have feathers." }),
      tf("Plants need light and water to grow.", true, { hint: "Think of the cress.", why: "Plants need light and water." }),
      mc("What is a habitat?", "The place where a living thing lives", ["A kind of food", "A kind of plant"], { hint: "It is a home.", why: "A habitat is where a living thing lives." }),
    ],
    intro: [
      H("Welcome back, young scientist!"),
      SAY("Welcome back, young scientist! Today's big question is: how do scientists sort the millions of living things on Earth? By the end, you will sort animals into groups, use a key, explain how animals suit their homes, and show how a food chain starts with a plant. Let's go!", T("Today's big question: how do scientists sort living things?", "We will classify, use keys and follow food chains.")),
      IMG("🐘🦋🌿🐟", "Millions of kinds of living things share our planet."),
      GLOSS({ scientists: "People who study the natural world." }),
    ],
    subs: [groups, keys, adapt, chains],
    quiz: [
      Q("groups", "recall", "living4.vertebrates", mc("Which of these animals is a vertebrate?", "A pigeon", ["A slug", "A beetle"], { hint: "It has a backbone.", why: "A pigeon is a bird, and birds have a backbone." }), ...ALTS[0]),
      Q("groups", "recall", "living4.facts", tf("A butterfly is a vertebrate.", false, { hint: "Does it have a backbone?", why: "A butterfly is an insect, so it is an invertebrate." }), ...ALTS[1]),
      Q("groups", "apply", "living4.classify", mat("Which group does each animal belong to? Match them.", [["Shark", "Fish"], ["Lizard", "Reptile"], ["Cow", "Mammal"]], { hint: "Think about their features.", why: "A shark is a fish, a lizard a reptile and a cow a mammal." }), ...ALTS[2]),
      Q("keys", "apply", "living4.key_questions", ms("Pick two good yes or no questions for a key about living things.", ["Does it have wings?", "Does it have a shell?"], ["Is it pretty?", "Do I like it?"], { hint: "A good question can be checked.", why: "Wings and shells can be checked, so they make good questions." }), ...ALTS[3]),
      Q("groups", "recall", "living4.label", hot("Tap the animal with no backbone.", [["🐛", "Caterpillar", 22, 50], ["🐟", "Fish", 50, 50], ["🐦", "Bird", 78, 50]], ["Caterpillar"], { labels: true, hint: "No backbone.", why: "A caterpillar has no backbone." }), ...ALTS[4]),
      Q("groups", "recall", "living4.words", st("What is the word for sorting living things into groups?", ["classification", "classifying", "classify"], { hint: "It starts with cl.", why: "Sorting living things into groups is classification." }),
        st("What do we call animals with a backbone? Write the word.", ["vertebrates", "vertebrate"], { hint: "It starts with ver.", why: "Animals with a backbone are vertebrates." }),
        st("What is the word for animals with no backbone?", ["invertebrates", "invertebrate"], { hint: "It starts with in.", why: "Animals with no backbone are invertebrates." })),
      Q("keys", "apply", "living4.split", mc("Which question helps split a lizard from a rabbit?", "Does it have scales?", ["Is it an animal?", "Does it eat?"], { hint: "Both are animals that eat.", why: "A lizard has scales and a rabbit has fur." }), ...ALTS[6]),
      Q("adapt", "apply", "living4.adapt_fill", fill("Finish the sentences about a desert animal.", "A camel's {b1} stores {b2} for energy.", [["hump", "tail", "nose"], ["fat", "milk", "sand"]], { hint: "It helps in the desert.", why: "A camel's hump stores fat for energy." }), ...ALTS[7]),
      Q("keys", "apply", "living4.key_maths", num("A key splits 6 animals into two equal groups. How many animals are in each group?", 3, { hint: "Divide 6 by 2.", why: "6 divided by 2 is 3." }), ...ALTS[8]),
      Q("groups", "apply", "living4.count", sld("A pond has 8 animals: 5 are invertebrates. Slide to show how many are vertebrates.", { min: 0, max: 10, unit: "animals" }, 3, 0, { hint: "8 minus 5.", why: "8 - 5 = 3 vertebrates." }), ...ALTS[9]),
      Q("chains", "apply", "living4.chain", ord("Arrange this food chain, with the producer first.", ["Grass", "Grasshopper", "Frog"], { hint: "The plant first.", why: "The grasshopper eats the grass, then the frog eats the grasshopper." }), ...ALTS[10]),
      Q("groups", "reason", "living4.reason_group", mc("Zara says a dolphin is a fish because it lives in the sea. Why is she wrong?", "A dolphin breathes air and feeds its young milk, so it is a mammal", ["A dolphin has gills", "A dolphin is an insect"], { hint: "How do dolphins feed their young?", why: "Dolphins are mammals. They breathe air and feed milk." }), ...ALTS[11]),
      Q("adapt", "reason", "living4.reason_adapt", mc("Why do desert animals like camels have wide, flat feet?", "So they do not sink into the sand", ["So they can swim", "So they can fly"], { hint: "Think about walking on sand.", why: "Wide feet spread the weight over the sand." }), ...ALTS[12]),
      Q("chains", "reason", "living4.reason_plants", mc("A student says plants take their food from the soil. What is the correct idea?", "Plants make their own food in their leaves using light", ["Plants eat soil", "Plants take sugar from animals"], { hint: "Think about photosynthesis.", why: "Plants make food in their leaves using light, water and carbon dioxide." }), ...ALTS[13]),
      Q("chains", "reason", "living4.terms", mc("Sam says the rabbit is the producer in grass → rabbit → fox. Why is he wrong?", "The grass makes its own food, so the grass is the producer", ["A rabbit hunts the fox", "The fox makes food from light"], { hint: "Which one is the plant?", why: "Grass makes its own food, so it is the producer." }), ...ALTS[14]),
    ],
  }),
];
