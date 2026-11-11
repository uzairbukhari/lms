import { SAY, SS, H, T, PHOTO, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld, st } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC } from "./_science-kit.mjs";

// Science Class 1, topic 7: New life and growing up (Zainab, age 7).
const CHICK = "science-class-1-new-life-1-c68f38b1.jpg";
const SPAWN = "science-class-1-new-life-2-dcd4c6c9.jpg";
const LAMBS = "science-class-1-new-life-3-90e57dbe.jpg";

// ---------------------------------------------------------------------------------------------- 1. learn
const young = {
  id: "young", kind: "learn", title: "Young animals",
  blocks: [
    H("Welcome back, young scientist!"),
    SAY("Today we meet baby animals. How do animals grow and change?", T("Today's big question: how do animals grow and change?")),
    SAY("This chick is only a few days old. It is a baby bird.", PHOTO(CHICK, "A fluffy yellow chick standing in short green grass", "A chick is a young bird. It will grow into a hen or a rooster.", "Photo by Murphy Stay on Unsplash")),
    H("Stop 1: Young animals"),
    SAY("A baby animal is called a young animal. Many young animals look like their parents.", T("**Young** animals are baby animals. Many look like a smaller parent.")),
    EB("farm", "Parents and their young",
      SS("A hen has chicks. The chicks look like tiny hens.", S("Hen and chicks.", ["h", "🐔", 28, 60, 3], ["c", "🐥", 68, 68, 2, "bounce"])),
      SS("A cow has a calf. A calf looks like a small cow.", S("Cow and calf.", ["h", "🐄", 28, 60, 3], ["c", "🐄", 68, 68, 2, "bounce"])),
      SS("A sheep has a lamb. The lamb stays close to its mother.", S("Sheep and lamb.", ["h", "🐑", 28, 60, 3], ["c", "🐑", 68, 68, 2, "bounce"]))),
    CHK(mc("Which one of these is a young animal?", "A lamb", ["A hen", "A cow"], { hint: "Which one is a baby?", why: "A lamb is a baby sheep.", tag: "young.chk1" })),
    H("Stop 2: Young animals that look different"),
    SAY("Some babies look very different from their parents. They change a lot as they grow.", T("A **tadpole** looks very different from a frog.")),
    EB("pond", "Different babies",
      SS("A tadpole has a tail and no legs. It lives in water.", S("A tadpole.", ["t", "🐟", 30, 62, 2, "float"], ["w", "💧", 70, 62, 2])),
      SS("A frog has legs and no tail. It can live on land.", S("A frog.", ["f", "🐸", 50, 60, 3, "bounce"])),
      SS("A caterpillar has no wings. A butterfly has big colourful wings.", S("Caterpillar and butterfly.", ["c", "🐛", 28, 62, 2], ["b", "🦋", 68, 45, 3, "float"]))),
    CHK(tf("A tadpole looks just like a grown-up frog.", false, { hint: "Does a tadpole have legs?", why: "A tadpole has a tail and no legs. It changes as it grows.", tag: "young.chk2" })),
    SAY("Let us remember. Young animals are babies. Some look like their parents. Some look very different.", SUM("Young animals are baby animals", "Many look like their parents", "A tadpole and a caterpillar look very different")),
    GLOSS({ young: "A baby animal.", tadpole: "A baby frog that lives in water and has a tail.", parent: "A mother or father animal.", calf: "A baby cow.", lamb: "A baby sheep.", caterpillar: "A baby butterfly with no wings." }),
  ],
  mini: [
    mc("What do we call a baby hen?", "A chick", ["A calf", "A lamb"], { hint: "It is yellow and fluffy.", why: "A baby hen is a chick." }),
    tf("A calf looks like a small cow.", true, { hint: "Think of a baby cow.", why: "A calf looks like a small cow." }),
    mc("Which baby has a tail and lives in water?", "A tadpole", ["A lamb", "A chick"], { hint: "It becomes a frog.", why: "A tadpole lives in water." }),
    mc("A caterpillar will become which animal?", "A butterfly", ["A frog", "A hen"], { hint: "It gets wings.", why: "A caterpillar turns into a butterfly." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const cycles = {
  id: "cycles", kind: "try", title: "Life cycles",
  blocks: [
    H("Stop 1: From egg to hen"),
    SAY("A hen lays an egg. A chick grows inside the egg. Then the chick hatches.", T("A **life cycle** shows the stages of an animal's life.")),
    EB("farm", "A hen's life",
      SS("First there is an egg. The egg is warm and safe.", S("An egg.", ["e", "🥚", 50, 62, 3, "pulse"])),
      SS("The chick hatches. It is small and fluffy.", S("A chick.", ["c", "🐥", 50, 62, 3, "bounce"])),
      SS("The chick grows into a hen. She can lay eggs too.", S("A hen.", ["h", "🐔", 40, 60, 3], ["e", "🥚", 72, 70, 2, "pulse"]))),
    CHK(mc("What comes first in a hen's life?", "An egg", ["A hen", "A chick"], { hint: "A chick hatches from it.", why: "A hen's life begins as an egg.", tag: "cycles.chk1" })),
    H("Stop 2: Frogs and butterflies"),
    SAY("Frogs lay eggs in water. These eggs are called frogspawn. Tadpoles hatch from them.", PHOTO(SPAWN, "A cluster of clear frog eggs with dark centres floating among dry reeds in a pond", "Frogspawn is a mass of frog eggs. Each egg has a tiny tadpole inside.", "Photo by Barnabas Davoti on Unsplash")),
    EB("pond", "Two life cycles",
      SS("A frog goes from frogspawn to tadpole to froglet to frog.", S("Frog stages.", ["a", "🫧", 15, 62, 2], ["b", "🐟", 38, 62, 2], ["c", "🐸", 60, 62, 2], ["d", "🐸", 84, 60, 3])),
      SS("A butterfly goes from egg to caterpillar to chrysalis to butterfly.", S("Butterfly stages.", ["a", "🥚", 15, 62, 2], ["b", "🐛", 38, 62, 2], ["c", "🛖", 60, 62, 2], ["d", "🦋", 84, 50, 3, "float"])),
      SS("Both animals have more than two stages. Many animals do.", S("More than two.", ["m", "4️⃣", 50, 55, 3, "pulse"]))),
    SAY("Now sort the animals. Are they young or grown-up?", MAN("Young or adult?", "Move the animals. Young animals go in Young. Grown-up animals go in Adult.", "🐣", 8, ["Young", "Adult"])),
    ACT("Draw a life cycle", ["Paper and crayons", "A grown-up to help"], ["Draw a frog's life in four boxes.", "Draw frogspawn, a tadpole, a froglet and a frog.", "Add arrows to show the cycle goes round."]),
    CHK(tf("A caterpillar changes into a butterfly.", true, { hint: "It grows wings.", why: "A caterpillar turns into a chrysalis, then a butterfly.", tag: "cycles.chk2" })),
    SAY("Let us remember. A life cycle shows the stages of an animal's life.", SUM("A hen goes from egg to chick to hen", "A frog and a butterfly have more stages", "A life cycle goes round and round")),
    GLOSS({ "life cycle": "The stages of an animal's life, from egg to adult.", frogspawn: "A mass of frog eggs in jelly.", chrysalis: "The case a caterpillar sits in while it changes.", hatch: "To come out of an egg.", stage: "One step in a life cycle." }),
  ],
  mini: [
    ms("Which two are stages of a hen's life? Pick two.", ["Egg", "Chick"], ["Tadpole", "Chrysalis"], { hint: "Think of a farm.", why: "A hen's life has an egg, a chick and a hen." }),
    mc("What do we call frog eggs?", "Frogspawn", ["Chrysalis", "A calf"], { hint: "They float in jelly.", why: "Frog eggs are called frogspawn." }),
    tf("A life cycle goes round and round.", true, { hint: "Adults lay eggs again.", why: "Adults have young, so the cycle starts again." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const growing = {
  id: "growing", kind: "play", title: "Growing up",
  blocks: [
    H("Stop 1: Baby to older adult"),
    SAY("People have a life cycle too. We start as babies and grow bigger.", T("People **grow** and change through their whole lives.")),
    SAY("These lambs are only a few days old. Soon they will be bigger and stronger.", PHOTO(LAMBS, "A ewe standing on green grass with two newborn lambs beside her", "A mother sheep with her new lambs. Lambs grow quickly in spring.", "Photo by Nick Fewings on Unsplash")),
    EB("home", "A person grows",
      SS("A baby needs milk and sleep. Babies grow fast.", S("A baby.", ["b", "👶", 50, 62, 3, "bounce"])),
      SS("A child learns, plays and gets taller. Baby teeth fall out.", S("A child.", ["c", "🧒", 50, 60, 3])),
      SS("An adult is fully grown. Adults can work and look after children.", S("An adult.", ["a", "🧑", 35, 60, 3], ["c", "🧒", 70, 66, 2])),
      SS("Older adults change too. Their hair can turn grey.", S("An older adult.", ["o", "🧓", 50, 60, 3]))),
    CHK(mc("Which stage comes straight after a child?", "An adult", ["A baby", "A tadpole"], { hint: "Think of growing up.", why: "A child grows into an adult.", tag: "growing.chk1" })),
    H("Stop 2: Brain game"),
    SAY("Warm up your memory. Watch the pictures light up, then copy them.", T("Play the game, then answer a question.")),
    SAY("Watch the stages carefully. Then copy the order.", BRAIN("remember_order", "Growing up", "Watch the order, then copy it. It gets longer each time!", ["👶", "🧒", "🧑", "🧓"])),
    CHK(ms("Pick two things that change as a child grows.", ["Height", "Teeth"], ["Birthday cake", "Family name"], { hint: "Look at a photo of yourself as a baby.", why: "A child gets taller and loses baby teeth.", tag: "growing.chk2" })),
    SAY("Let us remember. People grow through stages. We change all our lives.", SUM("People go from baby to child to adult", "We change as we grow", "Good food, sleep and care help us grow")),
    GLOSS({ grow: "To get bigger and change over time.", baby: "A very young child.", adult: "A fully grown person.", toddler: "A small child who is learning to walk.", teeth: "The hard white parts in your mouth." }),
  ],
  mini: [
    mc("What does a baby need to grow?", "Milk and sleep", ["Cola and crisps", "Nothing"], { hint: "Babies need care.", why: "Babies need milk and sleep." }),
    tf("Children lose their baby teeth.", true, { hint: "Think of a wobbly tooth.", why: "Baby teeth fall out and bigger ones grow." }),
    mc("Who is fully grown?", "An adult", ["A baby", "A toddler"], { hint: "Think of parents.", why: "An adult is fully grown." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const needs = {
  id: "needs", kind: "use", title: "What animals need",
  blocks: [
    H("Stop 1: Food, water, air and shelter"),
    SAY("All animals need four things to stay alive. They need food and water.", T("Animals need **food**, water, air and shelter.")),
    SAY("They also need air to breathe. And they need shelter, a safe place to rest.", T("Young animals need these things even more.")),
    SAY("Young animals need care from their parents. A lamb drinks its mother's milk.", T("Parents **care** for their young.")),
    EB("farm", "What a lamb needs",
      SS("A lamb drinks milk to grow. Later it eats grass.", S("Food.", ["l", "🐑", 30, 62, 3], ["m", "🥛", 70, 66, 2, "bounce"])),
      SS("It drinks water from a trough. All animals need water.", S("Water.", ["l", "🐑", 30, 62, 3], ["w", "💧", 70, 66, 2, "bounce"])),
      SS("It breathes air and sleeps in a barn. That is its shelter.", S("Air and shelter.", ["l", "🐑", 30, 62, 3], ["b", "🛖", 70, 58, 3, "pulse"]))),
    CHK(ms("Pick two things that every animal needs.", ["Water", "Air"], ["A toy", "A bicycle"], { hint: "Think about what keeps animals alive.", why: "Every animal needs water and air.", tag: "needs.chk1" })),
    H("Stop 2: Caring for a pet"),
    SAY("A pet cannot look after itself. We must care for it every day.", T("A pet needs **care** from us.")),
    SAY("Muslims are taught to be kind to animals. Giving a pet water is a good deed.", T("Be kind to animals.")),
    SAY("Zainab's rabbit needs fresh food, clean water and a dry hutch.", T("Food, water and a safe home.")),
    EB("home", "Zainab's rabbit",
      SS("Zainab gives her rabbit fresh carrots and hay.", S("Food.", ["z", "👧", 25, 58, 3], ["c", "🥕", 65, 66, 2, "bounce"])),
      SS("She changes the water every morning. The bowl stays clean.", S("Water.", ["z", "👧", 25, 58, 3], ["w", "💧", 65, 66, 2, "bounce"])),
      SS("She cleans the hutch so the rabbit has a safe, dry home.", S("Shelter.", ["z", "👧", 25, 58, 3], ["h", "🏠", 65, 58, 3, "pulse"]))),
    ACT("Pet care chart", ["Paper and pens", "A grown-up to help"], ["Draw a pet you know or would like.", "List its food, water and shelter.", "Say who looks after it each day."]),
    CHK(tf("A pet can look after itself without any help.", false, { hint: "Who gives it food and water?", why: "A pet depends on people to care for it.", tag: "needs.chk2" })),
    SAY("Let us remember. Animals need food, water, air and shelter. We care for our pets.", SUM("Animals need food, water, air and shelter", "Parents care for their young", "We must care for pets every day")),
    GLOSS({ food: "What an animal eats to get energy.", shelter: "A safe place to rest and hide.", care: "Looking after someone or something.", hutch: "A small wooden house for a rabbit.", trough: "A long bowl that holds water or food for animals." }),
  ],
  mini: [
    mc("What does a pet rabbit need every day?", "Food and water", ["A phone", "A toy car"], { hint: "Think of what keeps it alive.", why: "Pets need food and water every day." }),
    tf("A shelter is a safe place to rest.", true, { hint: "Think of a hutch or a barn.", why: "A shelter keeps an animal safe." }),
    mc("Who cares for a lamb?", "Its mother", ["A stone", "A lorry"], { hint: "Think about milk.", why: "A mother sheep feeds and protects her lamb." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Tara the tadpole", backdrop: "pond", caption: "A tadpole tells how she grows into a frog.",
  scenes: [
    { caption: "A tiny egg.", say: "I am Tara. I start life as an egg in a pond.",
      items: [{ id: "e", emoji: "🫧", label: "frogspawn", x: 35, y: 62, size: 3, anim: "pulse" }, { id: "t", emoji: "🐟", x: 72, y: 60, size: 2, enter: "pop" }] },
    { caption: "A tadpole.", say: "I hatch! I have a tail and no legs. I swim.",
      items: [{ id: "t", emoji: "🐟", label: "Tara", x: 50, y: 60, size: 3, anim: "float" }] },
    { caption: "A duckling.", say: "A duckling paddles by. She looks like a small duck.",
      items: [{ id: "d", emoji: "🐥", x: 30, y: 58, size: 3 }, { id: "p", emoji: "🦆", x: 70, y: 52, size: 3, anim: "float" }] },
    { caption: "A lamb.", say: "A lamb drinks by the pond. She looks like a small sheep.",
      items: [{ id: "l", emoji: "🐑", x: 40, y: 58, size: 3 }, { id: "m", emoji: "🐑", x: 72, y: 56, size: 3 }] },
    { caption: "Back legs.", say: "My back legs grow. I am a froglet now.",
      items: [{ id: "f", emoji: "🐸", label: "froglet", x: 50, y: 60, size: 3, anim: "grow" }] },
    { caption: "A frog!", say: "My tail is gone. I am a frog and I can hop on land.",
      items: [{ id: "f", emoji: "🐸", x: 40, y: 58, size: 3, anim: "bounce" }, { id: "l", emoji: "🌿", x: 72, y: 62, size: 3 }] },
    { caption: "My needs.", say: "I need food, water, air and shelter, just like you.",
      items: [{ id: "a", emoji: "🪰", x: 25, y: 50, size: 2 }, { id: "w", emoji: "💧", x: 50, y: 62, size: 2 }, { id: "h", emoji: "🏠", x: 78, y: 58, size: 2 }] },
    { caption: "New eggs.", say: "One day I lay eggs. The life cycle begins again!",
      items: [{ id: "f", emoji: "🐸", x: 30, y: 58, size: 3 }, { id: "e", emoji: "🫧", x: 70, y: 62, size: 3, effect: "sparkle" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- young (q1-q8)
  Q("young", "recall", "newlife.baby_cow", st("What do we call a baby cow?", ["calf", "a calf"], { hint: "It starts with c.", why: "A baby cow is a calf." }),
    st("What do we call a baby sheep?", ["lamb", "a lamb"], { hint: "It starts with l.", why: "A baby sheep is a lamb." })),
  Q("young", "apply", "newlife.parent_match", mat("Match each baby to its parent.", [["Chick", "Hen"], ["Calf", "Cow"], ["Kitten", "Cat"]], { hint: "Think about a farm.", why: "A chick belongs to a hen, a calf to a cow and a kitten to a cat." }),
    mat("Join each young animal to its parent.", [["Lamb", "Sheep"], ["Puppy", "Dog"], ["Duckling", "Duck"]], { hint: "Think about a farm.", why: "A lamb belongs to a sheep, a puppy to a dog and a duckling to a duck." })),
  Q("young", "reason", "newlife.bird_eggs", mc("Zainab says a bird cannot lay eggs. Is she right?", "No, all birds lay eggs", ["Yes, only fish lay eggs", "Yes, birds have live babies"], { hint: "Think of a hen.", why: "All birds lay eggs." }),
    mc("Hamza says only hens lay eggs. Is he right?", "No, many birds lay eggs, such as ducks and sparrows", ["Yes, only hens lay eggs", "Yes, other birds do not have babies"], { hint: "Think of a duck.", why: "All birds lay eggs, not only hens." })),
  Q("young", "reason", "newlife.caterpillar_diff", mc("Aisha says a caterpillar is a different animal from a butterfly. Is she right?", "No, the caterpillar turns into the butterfly", ["Yes, they are never linked", "Yes, a butterfly eats caterpillars"], { hint: "Think about the life cycle.", why: "A caterpillar is the young stage of a butterfly." }),
    mc("Layla says a tadpole and a frog are different animals. Is she right?", "No, a tadpole grows into a frog", ["Yes, tadpoles are fish", "Yes, they never meet"], { hint: "Think about the life cycle.", why: "A tadpole is the young stage of a frog." })),
  Q("young", "apply", "newlife.baby_bird_tap", hot("Tap the baby bird.", [["🐥", "Chick", 22, 50], ["🐔", "Hen", 50, 50], ["🥚", "Egg", 78, 50]], ["Chick"], { labels: true, hint: "It is small and yellow.", why: "A chick is a baby bird." }),
    hot("Tap the baby dog.", [["🐕", "Dog", 22, 50], ["🐶", "Puppy", 50, 50], ["🐈", "Cat", 78, 50]], ["Puppy"], { labels: true, hint: "It is small and playful.", why: "A puppy is a baby dog." })),
  Q("young", "reason", "newlife.same_looks", mc("Sam says every baby animal looks like its parent. Is he right?", "No, a tadpole looks very different from a frog", ["Yes, every baby looks the same as its parent", "Yes, babies are always the same size"], { hint: "Think about a tadpole.", why: "Some young animals look very different from their parents." }),
    mc("Mira says a caterpillar looks like a butterfly. Is she right?", "No, a caterpillar has no wings and looks very different", ["Yes, they look the same", "Yes, both have big wings"], { hint: "Look at their bodies.", why: "A caterpillar looks very different from a butterfly." })),
  Q("young", "recall", "newlife.baby_frog_st", st("What do we call a baby frog before it has legs?", ["tadpole", "a tadpole"], { hint: "It has a tail.", why: "A baby frog is called a tadpole." }),
    st("What do we call a baby cat?", ["kitten", "a kitten"], { hint: "It starts with k.", why: "A baby cat is a kitten." })),
  Q("young", "apply", "newlife.egg_fill", fill("Finish the sentences about hens.", "A hen lays an {b1}. A {b2} hatches from it.", [["egg", "stone", "seed"], ["chick", "calf", "kitten"]], { hint: "Think about a farm.", why: "A hen lays an egg and a chick hatches from it." }),
    fill("Finish the sentences about cows.", "A cow gives birth to a {b1}. It drinks {b2}.", [["calf", "chick", "tadpole"], ["milk", "juice", "soup"]], { hint: "Think about a baby cow.", why: "A cow has a calf, and the calf drinks milk." })),
  // ----- cycles (q9-q16)
  Q("cycles", "apply", "newlife.hen_order", ord("Put the life of a chicken in order.", ["Egg", "Chick", "Hen"], { hint: "An egg comes first.", why: "An egg hatches into a chick, and the chick grows into a hen." }),
    ord("Order the frog's life, from first to last.", ["Frogspawn", "Tadpole", "Froglet", "Frog"], { hint: "Frogspawn comes first.", why: "Frogspawn hatches into a tadpole, then a froglet, then a frog." })),
  Q("cycles", "recall", "newlife.stage_count", num("A chicken's life has 3 stages: egg, chick and hen. How many stages is that?", 3, { hint: "Count them.", why: "Egg, chick and hen make 3 stages." }),
    num("A butterfly has 4 stages: egg, caterpillar, chrysalis and butterfly. How many stages is that?", 4, { hint: "Count them.", why: "There are 4 stages." })),
  Q("cycles", "apply", "newlife.lay_eggs_ms", ms("Which two animals lay eggs? Pick two.", ["A hen", "A frog"], ["A dog", "A cat"], { hint: "Think about a farm and a pond.", why: "Hens and frogs lay eggs." }),
    ms("Which two animals start life as an egg? Pick two.", ["A butterfly", "A duck"], ["A lamb", "A kitten"], { hint: "Think about a pond and a garden.", why: "Butterflies and ducks hatch from eggs." })),
  Q("cycles", "reason", "newlife.frog_stages", mc("Layla says a frog only has two stages in its life. Is she right?", "No, a frog has egg, tadpole, froglet and frog", ["Yes, only egg and frog", "Yes, tadpoles are not part of it"], { hint: "Think about frogspawn.", why: "A frog has four stages." }),
    mc("Ali says a butterfly goes straight from egg to butterfly. Is he right?", "No, it is a caterpillar and a chrysalis first", ["Yes, there are no stages in between", "Yes, caterpillars are a different animal"], { hint: "Think about the caterpillar.", why: "A butterfly has four stages." })),
  Q("cycles", "apply", "newlife.stages_left", sld("A butterfly has 4 stages. Zainab has seen 2. Slide to show how many are left to see.", { min: 0, max: 6, unit: "stages" }, 2, 0, { hint: "4 take away 2.", why: "4 - 2 = 2 stages." }),
    sld("A frog has 4 stages. Hamza has seen 1. Slide to show how many are left to see.", { min: 0, max: 6, unit: "stages" }, 3, 0, { hint: "4 take away 1.", why: "4 - 1 = 3 stages." })),
  Q("cycles", "reason", "newlife.only_people", mc("Ali says only people have a life cycle. Is he right?", "No, every animal and plant has a life cycle", ["Yes, only people have one", "Yes, animals just stay the same"], { hint: "Think about frogs and hens.", why: "All living things have a life cycle." }),
    mc("Sana says a lamb never changes. Is she right?", "No, a lamb grows into a sheep", ["Yes, it stays a lamb for ever", "Yes, it turns into a frog"], { hint: "Think about how it grows.", why: "A lamb grows into an adult sheep." })),
  Q("cycles", "apply", "newlife.stage_match", mat("Match each stage to its animal.", [["Frogspawn", "Frog"], ["Chrysalis", "Butterfly"], ["Chick", "Hen"]], { hint: "Think about each life cycle.", why: "Frogspawn belongs to a frog, a chrysalis to a butterfly and a chick to a hen." }),
    mat("Join each stage to its animal.", [["Tadpole", "Frog"], ["Caterpillar", "Butterfly"], ["Egg", "Duck"]], { hint: "Think about each life cycle.", why: "A tadpole becomes a frog, a caterpillar a butterfly and a duck starts as an egg." })),
  Q("cycles", "apply", "newlife.not_stage", hot("Tap the stage that is NOT part of a frog's life.", [["🫧", "Frogspawn", 22, 50], ["🐸", "Frog", 50, 50], ["🦋", "Butterfly", 78, 50]], ["Butterfly"], { labels: true, hint: "Which one is an insect?", why: "A butterfly is not part of a frog's life cycle." }),
    hot("Tap the stage that is NOT part of a hen's life.", [["🥚", "Egg", 22, 50], ["🐛", "Caterpillar", 50, 50], ["🐔", "Hen", 78, 50]], ["Caterpillar"], { labels: true, hint: "Which one belongs to a butterfly?", why: "A caterpillar is not part of a hen's life cycle." })),
  // ----- growing (q17-q23)
  Q("growing", "apply", "newlife.people_order", ord("Put the stages of a person's life in order.", ["Baby", "Child", "Adult", "Older adult"], { hint: "A baby comes first.", why: "A baby grows into a child, then an adult, then an older adult." }),
    ord("Arrange the stages of growing up.", ["Baby", "Toddler", "Child", "Adult"], { hint: "A baby comes first.", why: "A baby becomes a toddler, a child and then an adult." })),
  Q("growing", "apply", "newlife.growth_sign", mc("Which is a sign that a child is growing?", "Their shoes feel too small", ["They get a new name", "They like a different colour"], { hint: "Think about size.", why: "Growing feet make shoes feel too small." }),
    mc("What changes as a baby grows into a child?", "It gets taller and gets teeth", ["It gets smaller", "It never changes"], { hint: "Think about size and teeth.", why: "A child gets taller and grows teeth." })),
  Q("growing", "apply", "newlife.height_sld", sld("Amna was 90 cm tall. She grew 6 cm. Slide to show how tall she is now.", { min: 80, max: 120, unit: "cm" }, 96, 0, { hint: "90 + 6.", why: "90 + 6 = 96 cm." }),
    sld("Bilal was 100 cm tall. He grew 5 cm. Slide to show how tall he is now.", { min: 80, max: 120, unit: "cm" }, 105, 0, { hint: "100 + 5.", why: "100 + 5 = 105 cm." })),
  Q("growing", "reason", "newlife.adults_change", mc("Mira says adults stop changing. Is she right?", "No, adults change too. Their hair can turn grey", ["Yes, adults never change", "Yes, adults get younger"], { hint: "Think about grandparents.", why: "Adults keep changing as they get older." }),
    mc("Hana says grown-ups never change at all. Is she right?", "No, bodies and hair change as people get older", ["Yes, they stay the same", "Yes, they shrink to babies"], { hint: "Think about grandparents.", why: "People change all their lives." })),
  Q("growing", "reason", "newlife.babies_food", mc("Hamza says babies do not need food. Is he right?", "No, babies need milk to grow", ["Yes, babies need nothing", "Yes, babies eat stones"], { hint: "Think about a baby's bottle.", why: "Babies need milk to grow." }),
    mc("Mira says a newborn lamb does not need to drink. Is she right?", "No, a lamb drinks its mother's milk", ["Yes, lambs need nothing", "Yes, lambs only eat grass at birth"], { hint: "Think about a lamb and its mother.", why: "A newborn lamb drinks milk." })),
  Q("growing", "apply", "newlife.teeth_tf", tf("Children lose their baby teeth and grow bigger teeth.", true, { hint: "Think of a wobbly tooth.", why: "Baby teeth fall out and bigger teeth grow in." }),
    tf("A person keeps the same teeth all their life.", false, { hint: "Think of a wobbly tooth.", why: "Children lose their baby teeth." })),
  Q("growing", "apply", "newlife.age_match", mat("Match each age to what a person can do.", [["Baby", "Drinks milk"], ["Child", "Goes to school"], ["Adult", "Goes to work"]], { hint: "Think about each age.", why: "Babies drink milk, children go to school and adults go to work." }),
    mat("Join each age to what a person does.", [["Toddler", "Learns to walk"], ["Child", "Plays and learns"], ["Older adult", "Has grandchildren"]], { hint: "Think about each age.", why: "Toddlers learn to walk, children play and learn, and older adults may have grandchildren." })),
  // ----- needs (q24-q30)
  Q("needs", "recall", "newlife.needs_ms", ms("Which two things does every animal need? Pick two.", ["Water", "Food"], ["A toy", "A bed with pillows"], { hint: "Think about staying alive.", why: "Every animal needs water and food." }),
    ms("Which two do all animals need to stay alive? Pick two.", ["Air", "Shelter"], ["Music", "Games"], { hint: "Think about breathing and safety.", why: "Animals need air and shelter." })),
  Q("needs", "apply", "newlife.pet_fill", fill("Finish the sentences about a pet.", "A pet needs food, {b1}, a safe {b2} and care.", [["water", "paint", "sand"], ["home", "phone", "tree"]], { hint: "Think about a rabbit.", why: "A pet needs food, water, a safe home and care." }),
    fill("Finish the sentences about animals.", "Animals need {b1} to give them {b2}.", [["food", "paint", "toys"], ["energy", "feathers", "wheels"]], { hint: "Think about eating.", why: "Food gives animals energy." })),
  Q("needs", "apply", "newlife.missing_need", mc("Zainab's rabbit hutch has food and a roof but no water bowl. What is missing?", "Water", ["Air", "Light"], { hint: "What does the rabbit drink from?", why: "The rabbit needs water to drink." }),
    mc("A hamster has food, water and a cage, but the cage has no cover and is in the cold. What is missing?", "A warm shelter", ["More toys", "A mirror"], { hint: "Think about a safe place to rest.", why: "A hamster needs a warm, safe shelter." })),
  Q("needs", "recall", "newlife.count_needs", num("Food, water, air and shelter: how many needs is that?", 4, { hint: "Count them.", why: "Food, water, air and shelter make 4 needs." }),
    num("A pet needs food, water, air, shelter and care. How many needs is that?", 5, { hint: "Count them.", why: "There are 5 needs." })),
  Q("needs", "reason", "newlife.diff_needs", mc("Omar says a fish needs different things from a cow to stay alive. Is he right?", "No, all animals need food, water, air and shelter", ["Yes, fish need nothing", "Yes, cows need no water"], { hint: "Think about the four needs.", why: "All animals need food, water, air and shelter, each in their own way." }),
    mc("Aisha says only pets need water. Is she right?", "No, all animals need water", ["Yes, only pets drink", "Yes, wild animals never drink"], { hint: "Think about a deer in a forest.", why: "All animals need water." })),
  Q("needs", "apply", "newlife.shelter_tap", hot("Tap the best shelter for a hen.", [["🛖", "Hen house", 22, 50], ["🌵", "Cactus", 50, 50], ["🪑", "Chair", 78, 50]], ["Hen house"], { labels: true, hint: "Where does a hen sleep?", why: "A hen house keeps a hen safe." }),
    hot("Tap the best home for a duck.", [["🪷", "Pond", 22, 50], ["🏜️", "Desert", 50, 50], ["🧊", "Ice", 78, 50]], ["Pond"], { labels: true, hint: "Ducks swim.", why: "A pond gives a duck water and shelter." })),
  Q("needs", "apply", "newlife.farmer_tf", tf("A farmer cares for animals by giving them food, water and shelter.", true, { hint: "Think about a farm.", why: "Farmers look after their animals." }),
    tf("Pets can look after themselves with no help from people.", false, { hint: "Who gives them food?", why: "Pets depend on people." })),
];

export const topics = [
  topicLesson({
    slug: "science-class-1-new-life", subject: "science", cls: 1, topic: 7, title: "New Life and Growing Up",
    summary: "Baby animals, how animals and people grow and change, and what animals need to stay alive.",
    unit: "Topic 7: New life and growing up", difficulty: 1,
    objectives: ["Say that animals have young that grow into adults", "Put a life cycle in order", "Name what animals need to stay alive"],
    success_criteria: ["I can name some baby animals", "I can put a life cycle in order", "I can say what animals need to stay alive"],
    real_life: "Lambs and goats on a farm, hens in a village, and ducklings in a park in spring.",
    standards: [NC("Y2 animals incl. humans", "Notice that animals, including humans, have offspring which grow into adults; find out about and describe the basic needs of animals, including humans, for survival (water, food and air)")],
    warm_up: [
      mc("What do we call a baby cat?", "A kitten", ["A calf", "A chick"], { hint: "It says miaow.", why: "A baby cat is a kitten." }),
      tf("A hen lays eggs.", true, { hint: "Think of a farm.", why: "Hens lay eggs." }),
      mc("What do animals drink?", "Water", ["Paint", "Sand"], { hint: "Animals need it to live.", why: "Animals need water." }),
    ],
    intro: [],
    subs: [young, cycles, growing, needs],
    clip,
    quiz,
  }),
];
