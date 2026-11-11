import { SAY, SS, H, T, IMG, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, PHOTO, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC, CAM } from "./_science-kit.mjs";

// Science Class 4, topic 12: Life Cycles and Reproduction (age 9-10). Enquiry types: observing over time, research using secondary sources.
const BUTTERFLY = "science-class-4-life-cycles-1-46cb17ed.jpg";
const LAMB = "science-class-4-life-cycles-2-169524e9.jpg";
const FROGS = "science-class-4-life-cycles-3-4cac4a13.jpg";

// ---------------------------------------------------------------------------------------------- 1. learn
const mammals = {
  id: "mammals", kind: "learn", title: "Mammals and birds",
  blocks: [
    H("Welcome, young scientist!"),
    SAY("Welcome, young scientist! Today we follow the growing-up stories of mammals, birds, frogs and insects.", T("Today we explore **life cycles**.")),
    IMG("🐑🐔🐸🦋", "A lamb, a hen, a frog and a butterfly."),
    H("Stop 1: Mammals"),
    SAY("Mammals have hair or fur. Their babies are born alive, and they drink their mother's milk. Humans are mammals, and mammals are animals.", T("A **mammal** has fur or hair and feeds its young milk.")),
    SAY("This lamb is a young mammal. A mammal's life cycle is baby, young animal, then adult. The adult can have babies of its own.", PHOTO(LAMB, "A white lamb standing in a green field beside two sheep", "A lamb is a young mammal.", "Photo by Matt Seymour on Unsplash")),
    CHK(mc("How does a baby mammal get its first food?", "It drinks its mother's milk", ["It eats leaves", "It hunts alone"], { hint: "Think of a lamb.", why: "Baby mammals drink their mother's milk." })),
    H("Stop 2: Birds"),
    SAY("Birds lay eggs. A hen sits on her eggs to keep them warm. Inside, the chick grows for about three weeks, then hatches.", T("A **bird** lays eggs and sits on them to keep them warm.")),
    EB("home", "A hen's life cycle",
      SS("A hen lays an egg. She keeps it warm in a nest.", S("Egg in the nest.", ["h", "🐔", 30, 50, 3, "pulse"], ["e", "🥚", 70, 60, 3, "none"])),
      SS("After about three weeks, the chick hatches. It grows into a hen that can lay eggs of her own.", S("Chick to adult.", ["c", "🐣", 30, 55, 3, "pulse"], ["a", "🐔", 70, 50, 3, "none"]))),
    CHK(tf("A hen's egg hatches after a few minutes.", false, { hint: "The chick needs time to grow.", why: "A chick needs about three weeks to grow before it hatches." })),
    SAY("Remember. Mammals are born alive and drink milk. Birds lay eggs. Both grow up and have young.", SUM("Mammals are born alive and drink milk", "Birds hatch from eggs", "Humans are mammals")),
    GLOSS({ "life cycles": "The stages of a living thing from birth to having young.", mammal: "An animal with fur or hair that feeds its young milk.", bird: "An animal with feathers that lays eggs.", gestation: "The time a baby grows inside its mother.", offspring: "The young of an animal." }),
  ],
  mini: [
    tf("Humans are mammals.", true, { hint: "We feed babies milk.", why: "Humans are mammals and animals." }),
    mc("Which of these lays eggs?", "A hen", ["A sheep", "A dog"], { hint: "A bird.", why: "A hen is a bird and lays eggs." }),
    mat("Match each animal to its young.", [["Sheep", "Lamb"], ["Hen", "Chick"], ["Dog", "Puppy"]], { hint: "Think of baby names.", why: "A sheep has a lamb, a hen has a chick, a dog has a puppy." }),
    mc("The time a mammal baby grows inside its mother is called...", "gestation", ["hatching", "pupation"], { hint: "Before birth.", why: "Gestation is the time before birth." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const frogs = {
  id: "frogs", kind: "try", title: "Amphibians",
  blocks: [
    H("Stop 1: The frog life cycle"),
    SAY("Frogs are amphibians. A frog starts as frogspawn, a mass of jelly eggs laid in water. Frogs lay lots of eggs in spring.", T("**Frogspawn** is a mass of jelly eggs laid in water.")),
    SAY("These adult frogs live near the pond. After the monsoon rains, frogs gather to breed. A tadpole hatches with gills and a tail. It slowly grows legs and lungs.", PHOTO(FROGS, "Green frogs sitting on a rock in a pond", "Adult frogs by a pond.", "Photo by Denley Photography on Unsplash")),
    EB("lab", "From frogspawn to frog",
      SS("Frogspawn hatches into tadpoles. A tadpole has a tail and gills, and it lives in water.", S("Tadpole: gills and tail.", ["s", "⚪", 30, 60, 3, "none"], ["t", "🐟", 70, 55, 3, "pulse"])),
      SS("Legs grow, the tail shrinks, and lungs develop. A froglet can leave the water, and becomes an adult frog.", S("Froglet to frog.", ["f", "🐸", 30, 55, 3, "pulse"], ["a", "🐸", 70, 50, 3, "none"]))),
    CHK(mc("What does a tadpole breathe with?", "Gills", ["Lungs", "Feathers"], { hint: "It lives in water.", why: "A tadpole breathes with gills. An adult frog uses lungs." })),
    H("Stop 2: Metamorphosis"),
    SAY("A tadpole's change into a frog is called metamorphosis. It is the same animal, with a very different body.", T("**Metamorphosis** is a big change in body shape as an animal grows.")),
    MAN("Order the frog", "Move the pictures to the right pond.", "🐸", 8, ["In the water", "On land"]),
    ACT("Pond watch", ["A notebook", "A pond, if a grown-up can take you", "A pencil"], ["Look for frogspawn in spring. Count the groups.", "Draw what you see.", "Look again each week for tadpoles.", "Return and observe. Never take frogspawn home."]),
    CHK(tf("A tadpole and a frog are two different animals.", false, { hint: "One animal changes shape.", why: "They are the same animal at different stages." })),
    SAY("Remember. Frogspawn, tadpole, froglet, then adult frog. The changes are called metamorphosis.", SUM("Frogspawn becomes a tadpole", "A tadpole grows legs and lungs", "Metamorphosis is a big change in body shape")),
    GLOSS({ amphibians: "Animals like frogs that live in water and on land.", frogspawn: "A mass of jelly eggs.", metamorphosis: "A big change in body shape.", tadpole: "A young frog with a tail and gills.", froglet: "A young frog with legs.", gills: "Parts that let animals breathe underwater." }),
  ],
  mini: [
    ord("Put the stages in order.", ["Frogspawn", "Tadpole", "Froglet", "Adult frog"], { hint: "Egg first.", why: "Frogspawn, tadpole, froglet, then adult frog." }),
    tf("Frogspawn is laid on land.", false, { hint: "Jelly eggs.", why: "Frogspawn is laid in water." }),
    mc("A froglet has...", "legs and a short tail", ["gills only", "wings"], { hint: "Between tadpole and frog.", why: "A froglet has legs and a shrinking tail." }),
    mc("An adult frog breathes with...", "lungs", ["gills", "fins"], { hint: "On land.", why: "Adult frogs use lungs, and their skin too." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const insects = {
  id: "insects", kind: "play", title: "Insects",
  blocks: [
    H("Stop 1: The butterfly life cycle"),
    SAY("A butterfly lays tiny eggs on a leaf. A larva, called a caterpillar, hatches. Its job is to eat and grow.", T("A **larva** hatches from an egg. A caterpillar is a butterfly's larva.")),
    SAY("The caterpillar changes into a pupa. Inside, it is alive and changing. Then an adult butterfly comes out, like this one resting on a leaf. Butterflies fly in the Margalla Hills.", PHOTO(BUTTERFLY, "An orange and black butterfly resting on green leaves", "An adult butterfly.", "Photo by Natalie Wagner on Unsplash")),
    EB("lab", "Complete metamorphosis",
      SS("Egg, then larva. The caterpillar eats leaves and grows.", S("Egg and larva.", ["e", "🥚", 30, 55, 3, "none"], ["l", "🐛", 70, 55, 3, "pulse"])),
      SS("The pupa is not moving, but it is alive. Inside, the body is changing. An adult butterfly emerges.", S("Pupa to adult.", ["p", "🫘", 30, 55, 3, "none"], ["b", "🦋", 70, 50, 3, "pulse"]))),
    CHK(mc("What is the stage after the larva?", "The pupa", ["The egg", "The adult"], { hint: "The case.", why: "A butterfly goes egg, larva, pupa, adult." })),
    H("Stop 2: Compare life cycles"),
    SAY("A frog and a butterfly both change a lot. A frog has four stages. A butterfly has four stages too, but they are different.", T("A frog has gills, then lungs. A butterfly has a pupa stage.")),
    IMG("🐸🦋", "Frog and butterfly: two kinds of metamorphosis."),
    SAY("Flip the cards and find the matching pairs. A little brain break!", BRAIN("memory_match", "Life cycle match", "Find the matching pairs.", ["🥚", "🐛", "🦋", "🐸", "🐣", "🐑"])),
    CHK(tf("The animal in a pupa is dead because it does not move.", false, { hint: "Big changes inside.", why: "The insect is alive and changing inside the pupa." })),
    SAY("Remember. Insects have egg, larva, pupa and adult stages. The pupa is alive.", SUM("Insects go through egg, larva, pupa, adult", "The pupa is alive and changing", "A butterfly's story differs from a frog's")),
    GLOSS({ larva: "The young stage of an insect that hatches from an egg.", pupa: "The stage where an insect changes inside a case.", insect: "An animal with six legs and three body parts.", caterpillar: "The larva of a butterfly or moth.", adult: "The fully grown stage." }),
  ],
  mini: [
    mc("Which is the caterpillar stage?", "Larva", ["Pupa", "Egg"], { hint: "It eats leaves.", why: "The caterpillar is the larva." }),
    tf("A butterfly is an insect.", true, { hint: "Six legs.", why: "A butterfly has six legs and is an insect." }),
    mc("A mosquito larva lives in...", "water", ["the air", "a nest"], { hint: "Think of puddles.", why: "Mosquito larvae live in water." }),
    mc("Which insect changes from larva to pupa?", "A ladybird", ["A hen", "A frog"], { hint: "A beetle.", why: "A ladybird goes through a pupa stage." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const protect = {
  id: "protect", kind: "use", title: "Protect young animals",
  blocks: [
    H("Stop 1: Habitats matter"),
    SAY("A habitat is the place where an animal lives. Young animals need a safe habitat with food, water and shelter.", T("A **habitat** is where an animal lives.")),
    IMG("🌳🐸🐦", "Trees, ponds and nests are habitats."),
    SAY("Some habitats are in danger. If a habitat is lost, animals may become endangered. In Pakistan, the markhor and the snow leopard are endangered.", T("An **endangered** animal could die out.")),
    CHK(mc("Why do young animals need a safe habitat?", "To find food, water and shelter", ["To go on holiday", "To get taller"], { hint: "Think of a nest.", why: "A habitat gives food, water and shelter." })),
    H("Stop 2: How we can help"),
    SAY("Adaptation takes many, many generations. Animals cannot change quickly when a habitat disappears.", T("**Adaptation** takes a very long time.")),
    SAY("Children can help. Keep ponds clean, put up a nest box, plant flowers for insects, and do not disturb nests. Never take frogspawn home.", ACT("Wildlife helper plan", ["Paper and a pencil", "A grown-up"], ["Draw a plan for a small wildlife corner at school.", "Add a bowl of water and some wildflowers.", "Add a nest box or a bug hotel.", "Tell your class about your plan."])),
    IMG("🪺🌼🐸", "A nest box, wildflowers and a clean pond help wildlife."),
    REVEAL("What could happen to tadpoles if a pond is polluted? Have a think first.", "Many would die. They live in the water, so polluted water harms their gills."),
    CHK(tf("Children can help protect young animals.", true, { hint: "Think of nest boxes.", why: "Children can plant flowers, keep ponds clean and build nest boxes." })),
    SAY("Remember. Safe habitats help young animals grow. Everyone can help protect them.", SUM("Young animals need safe habitats", "Habitats in danger lead to endangered animals", "We can all help")),
    GLOSS({ habitat: "The place where an animal lives.", endangered: "In danger of dying out.", adaptation: "A change over many generations that helps animals survive.", pollution: "Harmful things in air, water or soil.", "nest box": "A small wooden house for birds." }),
  ],
  mini: [
    mc("Which action helps frogs?", "Keeping a pond clean", ["Pouring chemicals in", "Draining the pond"], { hint: "Clean water.", why: "Clean ponds help frogs breed." }),
    tf("A nest box gives birds a safe place to lay eggs.", true, { hint: "Like a small house.", why: "Nest boxes help birds raise chicks." }),
    mc("Which animal is endangered in Pakistan?", "The snow leopard", ["The house sparrow", "The pigeon"], { hint: "A big cat.", why: "The snow leopard is endangered." }),
    mc("Planting wildflowers helps...", "insects", ["rocks", "pylons"], { hint: "Nectar.", why: "Wildflowers give food to insects." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Four growing-up stories", backdrop: "home", caption: "A butterfly, a frog, a hen and a lamb each tell their story.",
  scenes: [
    { caption: "A butterfly's story.", say: "First, a butterfly. It starts as a tiny egg on a leaf.",
      items: [{ id: "e", emoji: "🥚", label: "egg", x: 50, y: 55, size: 3, enter: "pop" }] },
    { caption: "Larva and pupa.", say: "A caterpillar hatches and eats leaves. Then it makes a pupa, and changes inside.",
      items: [{ id: "l", emoji: "🐛", label: "larva", x: 30, y: 55, size: 3 }, { id: "p", emoji: "🫘", label: "pupa", x: 70, y: 55, size: 3, effect: "glow" }] },
    { caption: "A butterfly!", say: "An adult butterfly comes out. It is the same animal, but changed.",
      items: [{ id: "b", emoji: "🦋", label: "adult", x: 50, y: 50, size: 3, effect: "sparkle" }] },
    { caption: "A frog's story.", say: "Next, a frog. Frogspawn in the pond hatches into tadpoles.",
      items: [{ id: "s", emoji: "⚪", label: "frogspawn", x: 30, y: 60, size: 3 }, { id: "t", emoji: "🐟", label: "tadpole", x: 70, y: 55, size: 3, anim: "pulse" }] },
    { caption: "Legs and lungs.", say: "The tadpole grows legs and lungs. It becomes a froglet, then a frog.",
      items: [{ id: "f", emoji: "🐸", label: "frog", x: 50, y: 52, size: 3, effect: "sparkle" }] },
    { caption: "A hen's story.", say: "A hen lays an egg and sits on it. After three weeks, a chick hatches.",
      items: [{ id: "h", emoji: "🐔", x: 30, y: 52, size: 3 }, { id: "c", emoji: "🐣", label: "chick", x: 70, y: 55, size: 3, enter: "pop" }] },
    { caption: "A lamb's story.", say: "A lamb is born alive. It drinks milk and grows into a sheep.",
      items: [{ id: "l", emoji: "🐑", label: "lamb", x: 50, y: 52, size: 3, enter: "pop" }] },
    { caption: "Protect them.", say: "Safe habitats help all young animals grow. We can help them too!",
      items: [{ id: "p", emoji: "👧", x: 30, y: 56, size: 3, anim: "bounce" }, { id: "n", emoji: "🪺", label: "nest", x: 70, y: 50, size: 3, effect: "hearts" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- learn (q1-q8)
  Q("mammals", "recall", "life.mammal_milk", tf("A baby mammal is born alive and drinks its mother's milk.", true, { hint: "Think of a lamb.", why: "Baby mammals are born alive and drink milk." }),
    tf("A baby mammal hatches from an egg.", false, { hint: "Think of a lamb.", why: "Mammals are born alive. Birds hatch from eggs." })),
  Q("mammals", "recall", "life.mammal_id", mc("Which of these is a mammal?", "A lamb", ["A hen", "A frog"], { hint: "Fur and milk.", why: "A lamb is a mammal." }),
    mc("Which of these animals is a mammal?", "A dolphin", ["A salmon", "A frog"], { hint: "It feeds its young milk.", why: "A dolphin is a mammal." })),
  Q("mammals", "reason", "life.same_stages", mc("Sam says all animals have the same life stages. Is he right?", "No. Different animals have different life cycles, such as live birth, eggs or metamorphosis", ["Yes, all animals are born the same way", "Yes, all animals lay eggs"], { hint: "Compare a lamb, a hen and a frog.", why: "Life cycles differ between mammals, birds, amphibians and insects." }),
    mc("Mina says every animal goes egg, larva, pupa, adult. Is she right?", "No. That is an insect life cycle. Mammals are born alive", ["Yes, all animals do", "Yes, only the order changes"], { hint: "Compare a lamb and a butterfly.", why: "Only some insects have a pupa stage." })),
  Q("mammals", "apply", "life.fill_hen", fill("Complete the sentence about birds.", "A hen lays an {b1}. Inside it, the chick {b2} before it hatches.", [["egg", "seed", "pup"], ["grows", "sleeps", "melts"]], { hint: "Eggs and growing.", why: "A hen lays an egg and the chick grows inside it." }),
    fill("Complete the sentence about mammals.", "A mammal feeds its young with {b1}. The time a baby grows inside its mother is called {b2}.", [["milk", "grass", "eggs"], ["gestation", "hatching", "pupation"]], { hint: "Mother feeds baby.", why: "Mammals feed milk. Gestation is the time before birth." })),
  Q("mammals", "apply", "life.hotspot_eggs", hot("Tap the animal that lays eggs in a nest.", [["🐔", "Hen", 22, 50], ["🐑", "Sheep", 50, 50], ["🐕", "Dog", 78, 50]], ["Hen"], { labels: true, hint: "A bird.", why: "A hen is a bird that lays eggs." }),
    hot("Tap the animal whose young drink milk.", [["🐑", "Sheep", 22, 50], ["🐔", "Hen", 50, 50], ["🐸", "Frog", 78, 50]], ["Sheep"], { labels: true, hint: "A mammal.", why: "A sheep is a mammal and feeds its lamb milk." })),
  Q("mammals", "apply", "life.hatch_weeks", num("A hen keeps her eggs warm for 21 days. How many weeks is that?", 3, { hint: "7 days in a week.", why: "21 ÷ 7 = 3 weeks." }),
    num("An egg takes 28 days to hatch. How many weeks is that?", 4, { hint: "7 days in a week.", why: "28 ÷ 7 = 4 weeks." })),
  Q("mammals", "apply", "life.mammals_two", ms("Which two are mammals? Pick two.", ["A cow", "A bat"], ["A hen", "A frog"], { hint: "Fur or hair, and milk.", why: "A cow and a bat are mammals." }),
    ms("Which two are mammals? Choose two.", ["A human", "A whale"], ["A butterfly", "A duck"], { hint: "Fur or hair, and milk.", why: "Humans and whales are mammals." })),
  Q("mammals", "reason", "life.humans_animals", mc("Omar says humans are not animals. Is he right?", "No. Humans are animals, and we are mammals too", ["Yes, humans are different", "Yes, animals have fur"], { hint: "Do we grow and have babies?", why: "Humans are mammals, and mammals are animals." }),
    mc("Hana says people cannot be mammals because we are clever. Is she right?", "No. Humans are mammals because we are born alive and feed our babies milk", ["Yes, only animals are mammals", "Yes, people are plants"], { hint: "Check the mammal features.", why: "Humans share the features of mammals." })),

  // ----- try (q9-q16)
  Q("frogs", "apply", "life.frog_match", mat("Match each frog stage to what it has.", [["Frogspawn", "Jelly eggs in water"], ["Tadpole", "Gills and a tail"], ["Adult frog", "Lungs and four legs"]], { hint: "Egg, young, adult.", why: "Frogspawn is jelly eggs, a tadpole has gills and a tail, an adult has lungs and legs." }),
    mat("Link each stage to a fact.", [["Froglet", "Small legs and a short tail"], ["Tadpole", "Lives in water"], ["Frogspawn", "Laid in spring"]], { hint: "Think of each stage.", why: "These are facts about the frog stages." })),
  Q("frogs", "reason", "life.metamorphosis", mc("Zainab says metamorphosis means the animal turns into a different animal. Is she right?", "No. It is the same animal. Its body shape changes a lot", ["Yes, a tadpole becomes another animal", "Yes, it swaps places with another"], { hint: "Is the tadpole a different animal?", why: "Metamorphosis is a big body change in the same animal." }),
    mc("Ben says a caterpillar and a butterfly are two different animals. Is he right?", "No. They are the same animal at different stages", ["Yes, they are different", "Yes, a caterpillar dies first"], { hint: "Same animal, new shape.", why: "A butterfly is the adult of a caterpillar." })),
  Q("frogs", "apply", "life.survive", sld("A frog lays 600 eggs. Only 1 in 100 survives to be an adult. Slide to show how many survive.", { min: 0, max: 20, unit: "frogs" }, 6, 0, { hint: "600 divided by 100.", why: "600 ÷ 100 = 6 adults." }),
    sld("A frog lays 1500 eggs. Only 1 in 100 survives to be an adult. Slide to show how many survive.", { min: 0, max: 20, unit: "frogs" }, 15, 0, { hint: "1500 divided by 100.", why: "1500 ÷ 100 = 15 adults." })),
  Q("frogs", "reason", "life.only_birds", mc("Aisha says only birds lay eggs. Is she right?", "No. Frogs, fish, insects and reptiles lay eggs too", ["Yes, only birds lay eggs", "Yes, only hens lay eggs"], { hint: "Frogspawn is eggs.", why: "Many animals lay eggs, not only birds." }),
    mc("Hana says only hens lay eggs. Is she right?", "No. Many birds, frogs, fish and insects lay eggs", ["Yes, only hens", "Yes, only farm animals"], { hint: "Think of frogspawn.", why: "Lots of animals lay eggs." })),
  Q("frogs", "apply", "life.frog_order", ord("Put the frog life cycle in order.", ["Frogspawn", "Tadpole", "Froglet", "Adult frog"], { hint: "Egg first.", why: "A frog goes from frogspawn to tadpole, froglet and adult frog." }),
    ord("Put the changes of a tadpole in order.", ["Hatches with a tail and gills", "Back legs grow", "Front legs grow and the tail shrinks", "Lungs develop and it leaves the water"], { hint: "Back legs first.", why: "The body changes step by step into a frog." })),
  Q("frogs", "apply", "life.pond_count", num("A pond has 120 tadpoles. In one week, 20 become froglets. How many are still tadpoles?", 100, { hint: "120 minus 20.", why: "120 - 20 = 100 tadpoles." }),
    num("A pond has 90 tadpoles. In one week, 15 become froglets. How many are still tadpoles?", 75, { hint: "90 minus 15.", why: "90 - 15 = 75 tadpoles." })),
  Q("frogs", "apply", "life.breathing_fill", fill("Complete the sentence about breathing.", "A tadpole breathes with {b1}. An adult frog breathes with {b2}.", [["gills", "lungs", "feathers"], ["lungs", "gills", "fins"]], { hint: "Water, then land.", why: "A tadpole uses gills and a frog uses lungs." }),
    fill("Complete the sentence about frogs.", "Frogs lay {b1} in water. The big change from tadpole to frog is called {b2}.", [["jelly eggs", "hard eggs", "seeds"], ["metamorphosis", "hatching", "migration"]], { hint: "Jelly and changing.", why: "Frogspawn is jelly eggs. The change is metamorphosis." })),
  Q("frogs", "recall", "life.froglet", tf("A froglet has legs and a short tail.", true, { hint: "Between tadpole and frog.", why: "A froglet has legs and a shrinking tail." }),
    tf("A tadpole lives on land and breathes with lungs.", false, { hint: "Gills and water.", why: "A tadpole lives in water and breathes with gills." })),

  // ----- play (q17-q23)
  Q("insects", "apply", "life.larva_hot", hot("Tap the caterpillar stage of a butterfly.", [["🐛", "Larva", 22, 50], ["🥚", "Egg", 50, 50], ["🦋", "Adult", 78, 50]], ["Larva"], { labels: true, hint: "It eats leaves.", why: "The larva is the caterpillar stage." }),
    hot("Tap the stage where the insect changes inside a case.", [["🫘", "Pupa", 22, 50], ["🥚", "Egg", 50, 50], ["🐛", "Larva", 78, 50]], ["Pupa"], { labels: true, hint: "Inactive on the outside.", why: "The pupa is where the big changes happen." })),
  Q("insects", "reason", "life.pupa_dead", mc("Layla says the animal inside a pupa is dead because it does not move. Is she right?", "No. It is alive, and its body is changing inside", ["Yes, it is dead until it hatches", "Yes, it is just an empty case"], { hint: "Something comes out.", why: "The insect is alive and changing inside the pupa." }),
    mc("Mina says a pupa is not a living thing because it stays still. Is she right?", "No. A pupa is alive and changing", ["Yes, it is not alive", "Yes, it is just a seed"], { hint: "An adult emerges.", why: "A pupa is alive." })),
  Q("insects", "reason", "life.chick_egg", mc("Hamza says the chick inside an egg is already a tiny bird, so an egg does not change. Is he right?", "No. It starts as a tiny cell and grows into a chick over about three weeks", ["Yes, it is a tiny bird from the start", "Yes, nothing happens inside"], { hint: "It takes three weeks.", why: "A chick develops and grows inside the egg." }),
    mc("Ali says nothing is alive inside a hen's egg. Is he right?", "No. A chick is growing inside, so it is alive", ["Yes, the egg is empty", "Yes, it only starts when it hatches"], { hint: "It hatches after weeks.", why: "A chick is alive and growing in the egg." })),
  Q("insects", "apply", "life.stage_match", mat("Match each butterfly stage to its job.", [["Egg", "Laid on a leaf"], ["Larva", "Eats leaves and grows"], ["Pupa", "Changes inside a case"]], { hint: "Think of the story.", why: "The egg is laid, the larva eats and the pupa changes." }),
    mat("Match each name to its meaning.", [["Adult", "Flies and lays eggs"], ["Caterpillar", "Another name for the larva"], ["Chrysalis", "Another name for the pupa"]], { hint: "Think of the names.", why: "These are other names for the butterfly stages." })),
  Q("insects", "apply", "life.butterfly_order", ord("Put the butterfly life cycle in order.", ["Egg", "Larva", "Pupa", "Adult butterfly"], { hint: "Egg first.", why: "A butterfly goes egg, larva, pupa, adult." }),
    ord("Put the steps of a butterfly's story in order.", ["A butterfly lays an egg", "A caterpillar hatches and eats", "The caterpillar forms a pupa", "An adult butterfly comes out"], { hint: "Egg, eat, pupa, adult.", why: "These steps follow the butterfly life cycle." })),
  Q("insects", "apply", "life.caterpillar_leaves", sld("A caterpillar eats 3 leaves a day. Slide to show how many leaves it eats in 7 days.", { min: 0, max: 30, unit: "leaves" }, 21, 0, { hint: "3 times 7.", why: "3 x 7 = 21 leaves." }),
    sld("A caterpillar eats 4 leaves a day. Slide to show how many leaves it eats in 5 days.", { min: 0, max: 30, unit: "leaves" }, 20, 0, { hint: "4 times 5.", why: "4 x 5 = 20 leaves." })),
  Q("insects", "apply", "life.insects_two", ms("Which two are insects? Pick two.", ["A butterfly", "A ladybird"], ["A spider", "A frog"], { hint: "Six legs.", why: "A butterfly and a ladybird have six legs." }),
    ms("Which two are insects? Choose two.", ["A mosquito", "A bee"], ["A snail", "A worm"], { hint: "Six legs.", why: "A mosquito and a bee are insects." })),

  // ----- use (q24-q30)
  Q("protect", "apply", "life.habitat_need", mc("Why do tadpoles need clean ponds?", "They live in the water, so polluted water harms them", ["They like warm tap water", "They need fast rivers"], { hint: "They breathe with gills.", why: "Polluted water can harm tadpoles." }),
    mc("Why do birds need nest boxes and hedges?", "They give safe places to lay eggs and raise chicks", ["To fly higher", "To get thinner"], { hint: "Think of safety.", why: "Nests give safety for eggs and chicks." })),
  Q("protect", "apply", "life.nest_boxes", num("A school puts up 4 nest boxes. Each box can hold 2 nests. How many nests can the boxes hold?", 8, { hint: "4 times 2.", why: "4 x 2 = 8 nests." }),
    num("A park puts up 5 nest boxes. Each box can hold 3 nests. How many nests can the boxes hold?", 15, { hint: "5 times 3.", why: "5 x 3 = 15 nests." })),
  Q("protect", "reason", "life.adapt_fast", mc("Mira says animals can adapt to any change in their habitat quickly. Is she right?", "No. Adaptation takes many generations. A sudden change can wipe animals out", ["Yes, animals change in a few days", "Yes, animals choose to adapt"], { hint: "How long does adaptation take?", why: "Adaptation happens over many generations, not days." }),
    mc("Ben says animals can adapt overnight if their pond is drained. Is he right?", "No. Adaptation takes a very long time. Many would die", ["Yes, they adapt at once", "Yes, they grow wings"], { hint: "How long does adaptation take?", why: "Adaptation is slow, so a sudden loss of habitat is harmful." })),
  Q("protect", "recall", "life.endangered", tf("The markhor and the snow leopard are endangered animals in Pakistan.", true, { hint: "Both are rare.", why: "Both animals are endangered." }),
    tf("An endangered animal has plenty of habitat left and many young.", false, { hint: "Endangered means in danger.", why: "Endangered animals are at risk of dying out." })),
  Q("protect", "apply", "life.habitat_fill", fill("Complete the sentence about habitats.", "A habitat is the place where an animal {b1}. If it is destroyed, young animals may have nowhere {b2}.", [["lives", "sleeps only", "paints"], ["safe", "tall", "loud"]], { hint: "Where it lives.", why: "A habitat is where an animal lives. Young animals need somewhere safe." }),
    fill("Complete the sentence about pollution.", "Pollution can harm {b1} and tadpoles. Planting wildflowers helps {b2}.", [["frogspawn", "rocks", "metal"], ["insects", "stones", "pylons"]], { hint: "Think of ponds and flowers.", why: "Pollution harms frogspawn. Wildflowers help insects." })),
  Q("protect", "reason", "life.children_help", mc("Ali says children cannot help endangered animals. Is he right?", "No. Children can build a pond, put up a nest box, plant flowers and keep litter out of habitats", ["Yes, only adults can help", "Yes, animals do not need help"], { hint: "Think of small actions.", why: "Everyone can help protect habitats." }),
    mc("Hana says one person can never make a difference to wildlife. Is she right?", "No. Small actions like a nest box or a clean pond help many animals", ["Yes, it makes no difference", "Yes, only governments help"], { hint: "Think of small actions.", why: "Small actions add up." })),
  Q("protect", "apply", "life.help_two", ms("Which two actions help young animals? Pick two.", ["Keeping a pond clean", "Putting up a nest box"], ["Dropping litter in ponds", "Cutting down hedges for fun"], { hint: "Safe places.", why: "Clean ponds and nest boxes help young animals." }),
    ms("Which two actions help wildlife? Choose two.", ["Planting wildflowers", "Not disturbing nests"], ["Taking frogspawn home", "Using chemicals near ponds"], { hint: "Leave it safe.", why: "Wildflowers and leaving nests alone help wildlife." })),
];

export const topics = [
  topicLesson({
    slug: "science-class-4-life-cycles", subject: "science", cls: 4, topic: 12, title: "Life Cycles and Reproduction",
    summary: "Life cycles of mammals, birds, amphibians and insects compared.",
    unit: "Topic 12: Life cycles and reproduction", difficulty: 2,
    objectives: ["Describe the life cycle of a mammal, bird, amphibian and insect", "Compare how they are alike and different", "Explain why habitats matter for young animals"],
    success_criteria: ["I can order the stages in a life cycle", "I can say how a frog and a butterfly change", "I can say how to protect young animals"],
    real_life: "Watching frogspawn in spring, butterflies in the garden and chicks hatching on a farm.",
    standards: [NC("Y5 life cycles", "Describe the life process of reproduction in some plants and animals; describe the life cycle of a mammal, an amphibian, an insect and a bird"), ...CAM("5Bl.01", "5Bl.02")],
    warm_up: [
      mc("Which is an animal?", "A frog", ["A rock", "A chair"], { hint: "It is alive.", why: "A frog is an animal." }),
      tf("All living things grow and change.", true, { hint: "Think of a seed.", why: "Living things grow and change." }),
      mc("Where do fish live?", "In water", ["In trees", "In deserts"], { hint: "Think of a pond.", why: "Fish live in water." }),
    ],
    intro: [],
    subs: [mammals, frogs, insects, protect],
    clip,
    quiz,
  }),
];
