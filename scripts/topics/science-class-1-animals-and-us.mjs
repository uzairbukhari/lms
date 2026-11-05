import { SAY, SS, H, T, IMG, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld, st } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC, PK, CAM } from "./_science-kit.mjs";

// Science Class 1, topic 2: Animals and us (Zainab, age 7). Standards from docs/CURRICULUM_V2.md section 3.

const groups = {
  id: "groups", kind: "learn", title: "Animal groups",
  blocks: [
    H("Stop 1: Mammals, birds and fish"),
    SAY("Scientists put animals into groups by looking at how they are alike. Mammals have fur or hair, and the babies drink milk. A cat, a goat and you are mammals! Birds have feathers and wings, and they lay eggs. Fish have scales and fins, and they live in water. Let's meet each group.", T("**Mammals** have fur or hair and feed their babies milk.", "**Birds** have feathers and lay eggs.", "**Fish** have scales and fins.")),
    EB("meadow", "Three animal groups",
      SS("Mammals have hair or fur. Goats, cats and cows are mammals. Their babies drink milk from their mothers.", S("Mammals: goat, cat and cow.", ["a", "🐐", 25, 60, 2, "bounce"], ["b", "🐈", 50, 62, 2, "bounce"], ["c", "🐄", 75, 58, 2, "bounce"])),
      SS("Birds have feathers and wings. A sparrow and a parrot are birds. Most birds can fly, and every bird lays eggs.", S("Birds: sparrow, parrot and hen.", ["a", "🐦", 25, 45, 2, "float"], ["b", "🦜", 50, 45, 2, "float"], ["c", "🐔", 75, 62, 2, "bounce"])),
      SS("Fish live in water. They have scales and fins, and they breathe with gills.", S("Fish live in water.", ["a", "🐟", 30, 55, 2, "float"], ["b", "🐠", 55, 65, 2, "float"], ["c", "🐡", 78, 50, 2, "float"]))),
    CHK(mc("Which group has feathers?", "Birds", ["Fish", "Mammals"], { hint: "Think of a parrot.", why: "Birds are the animals with feathers." })),
    H("Stop 2: Reptiles and amphibians"),
    SAY("Two more groups. Reptiles have dry skin covered in scales. Snakes, lizards and crocodiles are reptiles. Amphibians, like frogs, start life in water and have wet, smooth skin. Look at one animal from each group.", T("**Reptiles** have dry, scaly skin.", "**Amphibians** have wet skin and start life in water.")),
    IMG("🐍 🦎 🐊", "Reptiles: a snake, a lizard and a crocodile."),
    IMG("🐸 🐸 🐸", "Amphibians: frogs."),
    CHK(mc("A frog starts life in water and has wet skin. What group is a frog in?", "Amphibians", ["Reptiles", "Birds"], { hint: "Wet skin, starts in water.", why: "Frogs are amphibians." })),
    SAY("Let us remember. Mammals have fur and milk. Birds have feathers. Fish have scales and fins. Reptiles have dry scales. Amphibians start in water.", SUM("Mammals have fur or hair and feed their babies milk", "Birds have feathers and lay eggs", "Fish have scales and fins", "Reptiles have dry scales; amphibians start in water")),
    GLOSS({ mammals: "Animals with fur or hair that feed their babies milk.", birds: "Animals with feathers and wings that lay eggs.", fish: "Animals with scales and fins that live in water.", reptiles: "Animals with dry, scaly skin, like snakes and lizards.", amphibians: "Animals with wet skin that start life in water, like frogs." }),
  ],
  mini: [
    mc("Which animal is a mammal?", "A goat", ["A parrot", "A goldfish"], { hint: "Which has fur and drinks milk as a baby?", why: "A goat has hair and feeds its babies milk." }),
    tf("All birds have feathers.", true, { hint: "Look at a hen.", why: "Feathers are what make an animal a bird." }),
    mat("Match each animal to its group.", [["Lizard", "Reptile"], ["Sparrow", "Bird"], ["Cat", "Mammal"]], { hint: "Think about their skin or covering.", why: "A lizard has scales, a sparrow has feathers and a cat has fur." }),
    mc("Which group lives in water and has fins?", "Fish", ["Mammals", "Birds"], { hint: "Think of a goldfish.", why: "Fish have fins to swim." }),
  ],
};

const senses = {
  id: "senses", kind: "try", title: "My body and my senses",
  blocks: [
    H("Stop 1: Five senses"),
    SAY("You find out about the world with your five senses. Your eyes see. Your ears hear. Your nose smells. Your tongue tastes. And your skin feels things like soft, rough, hot and cold. Look at all five.", T("We have five **senses**: sight, hearing, smell, taste and touch.", "Each sense uses a part of the body.")),
    EB("classroom", "Five senses",
      SS("Your eyes help you see colours, shapes and your family.", S("Sight: eyes.", ["a", "👁️", 50, 50, 3, "pulse"])),
      SS("Your ears help you hear voices, birds and the call to prayer.", S("Hearing: ears.", ["a", "👂", 50, 50, 3, "pulse"])),
      SS("Your nose helps you smell rice cooking.", S("Smell: nose.", ["a", "👃", 50, 50, 3, "pulse"])),
      SS("Your tongue helps you taste sweet mangoes and sour lemons.", S("Taste: tongue.", ["a", "👅", 50, 50, 3, "pulse"])),
      SS("Your skin helps you feel soft, rough, hot and cold things.", S("Touch: skin.", ["a", "✋", 50, 50, 3, "pulse"]))),
    CHK(mc("Which part of your body helps you hear?", "Ears", ["Eyes", "Nose"], { hint: "Which part is on the side of your head?", why: "We hear with our ears." })),
    H("Stop 2: Sense detective"),
    SAY("Time to use your senses! Put each thing in the right box. Does it use your eyes to see, or your nose to smell? Then try the senses walk with a grown-up.", MAN("Which sense?", "Sort the things. Put things you see in See. Put things you smell in Smell.", "🌸", 8, ["See", "Smell"])),
    ACT("A senses walk", ["A grown-up", "A garden, park or kitchen"], ["Stand still for one minute. Close your eyes.", "Name one thing you hear, one thing you smell and one thing you feel.", "Open your eyes. Tell a grown-up what you saw."]),
    CHK(ms("Pick two senses that use your face.", ["Sight", "Smell"], ["Touch with your toe", "Walking"], { hint: "Eyes and nose are on your face.", why: "We see with our eyes and smell with our nose." })),
    SAY("Remember. We have five senses and each one uses a body part.", SUM("We have five senses: sight, hearing, smell, taste and touch", "Eyes see, ears hear, nose smells, tongue tastes, skin feels")),
    GLOSS({ senses: "The five ways we find out about the world: sight, hearing, smell, taste and touch.", skin: "The covering of your body. It helps you feel things." }),
  ],
  mini: [
    mc("Which part of your body do you use to taste?", "Tongue", ["Ears", "Eyes"], { hint: "It is inside your mouth.", why: "We taste with our tongue." }),
    num("How many senses do we have?", 5, { hint: "See, hear, smell, taste, touch.", why: "We have five senses." }),
    mat("Match each body part to its sense.", [["Eyes", "Sight"], ["Nose", "Smell"], ["Skin", "Touch"]], { hint: "What does each part do?", why: "Eyes see, a nose smells and skin feels." }),
  ],
};

const teeth = {
  id: "teeth", kind: "play", title: "Teeth and being healthy",
  blocks: [
    H("Stop 1: Looking after our teeth"),
    SAY("We use our teeth to bite and chew. Our first teeth are milk teeth. They wobble and fall out when we are about six or seven, and bigger teeth grow in their place. Those grown-up teeth must last all our lives, so we look after them. We brush twice a day, eat fewer sweets, and visit the dentist. Many Muslims also clean their teeth with a miswak, a small twig, following the Sunnah.", T("**Teeth** help us bite and chew food.", "Brush twice a day, eat fewer sweets and visit the dentist.")),
    EB("home", "Clean teeth",
      SS("A tooth with sugar on it can get a hole. The sugar is eaten by tiny germs, and they make acid.", S("Sugar can harm teeth.", ["t", "🦷", 40, 55, 3, "none"], ["s", "🍬", 70, 40, 2, "bounce"])),
      SS("Brushing washes the sugar away. Now the tooth is clean and shiny.", S("Brushing cleans teeth.", ["t", "🦷", 40, 55, 3, "pulse"], ["b", "🪥", 70, 40, 2, "bounce"], ["sp", "✨", 20, 40, 2, "float"]))),
    CHK(mc("How often should we brush our teeth?", "Twice a day", ["Once a year", "Never"], { hint: "Morning and night.", why: "We brush in the morning and at night." })),
    H("Stop 2: Staying healthy"),
    SAY("To stay healthy, a body needs good food, water, sleep, exercise and clean hands. Washing your hands with soap stops germs spreading. Muslims wash their hands and faces for wudu before prayer, so it is a good habit already. Play the memory game, then tell me which habit you do best.", MAN("Healthy or not?", "Put healthy things in Healthy. Put things we should have fewer of in Not often.", "🍎", 8, ["Healthy", "Not often"])),
    SAY("Warm up your memory. Watch the healthy things light up, then copy the order.", BRAIN("remember_order", "Healthy lights", "Watch the order, then copy it.", ["🍎", "💧", "😴", "🧼"])),
    CHK(tf("Washing your hands with soap helps stop germs spreading.", true, { hint: "Why do doctors wash their hands?", why: "Soap and water remove germs." })),
    SAY("Remember. Look after your teeth. Eat well, sleep well, move, and wash your hands.", SUM("Brush your teeth twice a day", "Good food, water, sleep, exercise and clean hands keep us healthy")),
    GLOSS({ teeth: "The hard white parts in your mouth for biting and chewing.", germs: "Tiny living things that can make us ill.", healthy: "Well and strong.", exercise: "Moving your body, like running or playing." }),
  ],
  mini: [
    tf("Sweets and fizzy drinks are good for our teeth.", false, { hint: "Sugar is not kind to teeth.", why: "Sugar can harm our teeth." }),
    mc("Which is a healthy habit?", "Washing your hands", ["Staying up all night", "Eating only sweets"], { hint: "It keeps germs away.", why: "Washing hands helps keep us healthy." }),
    ms("Pick two things that keep us healthy.", ["Sleep", "Exercise"], ["Lots of sweets", "Never washing"], { hint: "What makes your body strong?", why: "Sleep and exercise keep us strong." }),
  ],
};

const growing = {
  id: "growing", kind: "use", title: "Growing up",
  blocks: [
    H("Stop 1: A chicken grows up"),
    SAY("All animals grow and change. This is called a life cycle. A hen lays an egg. A chick grows inside, and then it hatches. The chick grows into a hen, and the hen lays eggs. Let us watch the life cycle go round.", T("A **life cycle** shows how an animal grows and changes.", "An egg hatches into a chick, and the chick grows into a hen.")),
    EB("farm", "A chicken's life cycle",
      SS("A hen lays an egg.", S("An egg.", ["e", "🥚", 50, 60, 3, "pulse"])),
      SS("The egg cracks, and a chick comes out. Cheep cheep!", S("A chick hatches.", ["e", "🐣", 50, 60, 3, "bounce"])),
      SS("The chick grows bigger and gets feathers.", S("The chick grows.", ["e", "🐥", 50, 60, 3, "grow"])),
      SS("In time it is a hen, and the hen can lay eggs of her own.", S("A hen.", ["e", "🐔", 50, 60, 3, "bounce"], ["f", "🥚", 80, 70, 2, "bounce"]))),
    CHK(ord("Put the chicken life cycle in order.", ["Egg", "Chick", "Hen"], { hint: "Starts with an egg.", why: "An egg hatches into a chick that grows into a hen." })),
    H("Stop 2: How I have changed"),
    SAY("You have a life cycle too. You were a baby, then a toddler, a child, and one day you will be a grown-up. Think about how you have changed since you were a baby. You are taller, you can run, you can read. Talk to a grown-up about your baby photos.", IMG("👶 🧒 🧑", "A baby, a child and a grown-up.")),
    ACT("My growing up chart", ["Paper and pencils", "A grown-up", "Baby photos if you have them"], ["Draw yourself as a baby, as you are now, and as a grown-up.", "Write one thing you could not do as a baby but can do now.", "Show your chart to your family."]),
    CHK(mc("Which comes first in a chicken's life cycle?", "Egg", ["Hen", "Chick"], { hint: "It starts in a shell.", why: "The life cycle starts with an egg." })),
    SAY("Remember. Animals have life cycles. A chicken goes from egg to chick to hen. Humans grow and change too.", SUM("A life cycle shows how an animal grows and changes", "Egg, chick, hen", "People grow and change too")),
    GLOSS({ "life cycle": "The stages an animal goes through as it grows up.", hatch: "To come out of an egg.", baby: "A very young animal or person." }),
  ],
  mini: [
    ord("Put these in order, youngest first.", ["Baby", "Child", "Grown-up"], { hint: "Start with the smallest.", why: "We grow from baby to child to adult." }),
    mc("What comes out of a hen's egg?", "A chick", ["A calf", "A kitten"], { hint: "A baby hen.", why: "A chick hatches from a hen's egg." }),
    tf("Animals stay the same size all their lives.", false, { hint: "Think about a puppy.", why: "Animals grow bigger as they get older." }),
  ],
};

const ALTS = [
  [mc("Which animal is a bird?", "A sparrow", ["A whale", "A frog"], { hint: "Which one has feathers?", why: "A sparrow has feathers and lays eggs." }), mc("Which of these animals has feathers and lays eggs?", "A peacock", ["A bat", "A lizard"], { hint: "Which one has feathers?", why: "A peacock has feathers and lays eggs." })],
  [mc("A snake has dry, scaly skin. What group is a snake in?", "Reptiles", ["Amphibians", "Mammals"], { hint: "Dry scaly skin.", why: "Snakes are reptiles." }), mc("A crocodile has dry, scaly skin and lays eggs. What group is it in?", "Reptiles", ["Fish", "Birds"], { hint: "Dry scaly skin.", why: "Crocodiles are reptiles." })],
  [tf("A whale is a fish.", false, { hint: "Does a whale feed its babies milk?", why: "A whale is a mammal. It feeds milk to its baby." }), tf("A bat is a bird.", false, { hint: "Does it have feathers?", why: "A bat is a mammal with fur." })],
  [mat("Pair each animal with its group.", [["Eagle", "Bird"], ["Frog", "Amphibian"], ["Goldfish", "Fish"]], { hint: "Look at how its body is covered.", why: "An eagle has feathers, a frog has wet skin and a goldfish has scales." }), mat("Link each animal to its group.", [["Camel", "Mammal"], ["Gecko", "Reptile"], ["Shark", "Fish"]], { hint: "Look at how its body is covered.", why: "A camel has hair, a gecko has scales and a shark is a fish." })],
  [ms("Which two animals are mammals?", ["Cow", "Rabbit"], ["Hen", "Snake"], { hint: "Which ones have fur or hair?", why: "Cows and rabbits are mammals." }), ms("Which two of these animals feed their babies milk?", ["Goat", "Horse"], ["Eagle", "Crocodile"], { hint: "Which ones have hair and drink milk as babies?", why: "Goats and horses are mammals." })],
  [hot("Tap the part of the body we use to see.", [["👁️", "Eyes", 22, 50], ["👂", "Ears", 50, 50], ["👃", "Nose", 78, 50]], ["Eyes"], { labels: true, hint: "It lets us see colours.", why: "We see with our eyes." }), hot("Tap the part of the body we use to smell.", [["👁️", "Eyes", 22, 50], ["👂", "Ears", 50, 50], ["👃", "Nose", 78, 50]], ["Nose"], { labels: true, hint: "It is in the middle of your face.", why: "We smell with our nose." })],
  [st("What is the word for the hard white things in your mouth that bite and chew?", ["teeth", "tooth"], { hint: "You brush them.", why: "Teeth help us bite and chew." }), st("What sense do we use our skin for? Write the word.", ["touch", "feel", "feeling"], { hint: "Think about holding something soft.", why: "Our skin helps us touch and feel." })],
  [mc("Ali says only people grow and change. Is he right?", "No, all animals grow and change", ["Yes, animals stay the same", "Yes, only people have a life cycle"], { hint: "Think of a chick and a hen.", why: "Every animal has a life cycle and grows and changes." }), mc("Zara says a chick never changes. Is she right?", "No, a chick grows into a hen", ["Yes, a chick stays small", "Yes, a chick turns into an egg"], { hint: "What is a chick when it is older?", why: "A chick grows into a hen." })],
  [fill("Fill in the gaps.", "We see with our {b1} and hear with our {b2}.", [["eyes", "feet", "hands"], ["ears", "knees", "elbows"]], { hint: "Think about two senses.", why: "We see with eyes and hear with ears." }), fill("Choose the right words.", "We smell with our {b1} and taste with our {b2}.", [["nose", "knees", "toes"], ["tongue", "elbow", "ear"]], { hint: "Think about two senses.", why: "We smell with the nose and taste with the tongue." })],
  [num("A hen lays eggs and chicks hatch. How many stages are there in egg, chick, hen?", 3, { hint: "Count each one.", why: "There are three stages." }), num("Baby, child, grown-up: how many stages is that?", 3, { hint: "Count each one.", why: "There are three stages." })],
  [sld("About how many times a day should we brush our teeth?", { min: 0, max: 6, unit: "times" }, 2, 0, { hint: "Morning and night.", why: "We brush twice a day." }), sld("How many senses do people have?", { min: 0, max: 10, unit: "senses" }, 5, 0, { hint: "See, hear, smell, taste, touch.", why: "We have five senses." })],
  [ord("Arrange the stages in order, youngest first.", ["Egg", "Chick", "Hen"], { hint: "It starts in a shell.", why: "An egg hatches into a chick, and the chick grows into a hen." }), ord("Order these, starting with the youngest.", ["Baby", "Child", "Grown-up"], { hint: "Start with the smallest.", why: "People grow from baby to child to adult." })],
  [mc("Why do we wash our hands with soap before eating?", "To wash away germs", ["To make the soap wet", "To make food taste of soap"], { hint: "Germs can make us ill.", why: "Soap washes away germs that can make us ill." }), mc("Why do we visit the dentist?", "To keep our teeth healthy", ["To get new toys", "To make our teeth fall out"], { hint: "Dentists look after teeth.", why: "A dentist helps keep teeth healthy." })],
  [mc("Hamza says a bat is a bird because it flies. Why is he wrong?", "A bat has fur and feeds its babies milk, so it is a mammal", ["A bat is a fish", "Bats cannot fly"], { hint: "Think about how a mammal is covered.", why: "A bat has fur and feeds milk to its babies. It is a mammal." }), mc("Nina says a whale is a fish because it lives in water. Why is she wrong?", "A whale feeds its babies milk, so it is a mammal", ["A whale has feathers", "Whales cannot swim"], { hint: "How do whale babies feed?", why: "A whale is a mammal. It breathes air and feeds milk to its baby." })],
  [mc("Sam eats lots of sweets and never brushes. What might happen?", "His teeth could get holes", ["His teeth will grow bigger", "Nothing at all"], { hint: "Sugar and germs make acid.", why: "Sugar not brushed away can make holes in teeth." }), mc("Lena never washes her hands before eating. What might happen?", "She could get germs in her tummy", ["She will grow taller", "She will become a bird"], { hint: "Think about germs.", why: "Germs on hands can make us ill." })],
];

export const topics = [
  topicLesson({
    slug: "science-class-1-animals-and-us", subject: "science", cls: 1, topic: 2, title: "Animals and Us",
    summary: "Animal groups, our five senses, caring for our teeth and bodies, and how animals and people grow.",
    unit: "Topic 2: Animals and us", difficulty: 1,
    objectives: ["Sort animals into groups", "Name the five senses and the body part for each", "Say how to look after teeth and stay healthy", "Put a life cycle in order"],
    success_criteria: ["I can say which group an animal belongs to", "I can name the five senses", "I can say how to keep my teeth and body healthy", "I can put a life cycle in order"],
    real_life: "Brushing your teeth, washing your hands and noticing animals at the park.",
    standards: [NC("Y1 animals incl. humans", "Identify and name a variety of common animals including fish, amphibians, reptiles, birds and mammals"), NC("Y1 senses", "Identify, name, draw and label the basic parts of the human body and say which part is associated with each sense"), NC("Y2 animals incl. humans", "Describe the importance for humans of exercise, eating the right amounts of different types of food, and hygiene"), PK("GK-01-F-03"), ...CAM("2Bs.01", "2Bs.02", "2Bp.01", "2Bp.02", "2Bp.03", "2Bp.04")],
    warm_up: [
      mc("Which of these is a living thing?", "A cat", ["A chair", "A spoon"], { hint: "Living things grow.", why: "A cat is alive. A chair and a spoon never were." }),
      mc("Where does a fish live?", "In water", ["In a nest", "In a desert"], { hint: "Fish swim.", why: "Fish live in water." }),
      ms("Pick two things animals need.", ["Food", "Water"], ["Toys", "Phones"], { hint: "What keeps animals alive?", why: "Animals need food and water." }),
    ],
    intro: [
      H("Welcome back, young scientist!"),
      SAY("Welcome back, young scientist! Today's big question is: how are animals and people the same, and how are they different? By the end, you will sort animals into groups, use your five senses, look after your body and teeth, and see how animals grow. Let's go!", T("Today's big question: how are animals and people alike?", "We will find out about groups, senses and growing up.")),
      IMG("🐈🐦🐟🧒", "Animals and people have a lot in common."),
      GLOSS({ animals: "Living things that move, eat and have babies." }),
    ],
    subs: [groups, senses, teeth, growing],
    quiz: [
      Q("groups", "recall", "animals.groups", mc("Which of these animals is a mammal?", "A cow", ["A hen", "A frog"], { hint: "Which one has hair and drinks milk as a baby?", why: "A cow is a mammal. It feeds its calf milk." }), ...ALTS[0]),
      Q("groups", "recall", "animals.reptile", mc("A lizard has dry, scaly skin. What group is it in?", "Reptiles", ["Mammals", "Fish"], { hint: "Dry scaly skin.", why: "Lizards are reptiles." }), ...ALTS[1]),
      Q("groups", "recall", "animals.myth", tf("A dolphin is a fish.", false, { hint: "Does a dolphin feed its baby milk?", why: "A dolphin is a mammal. It breathes air and feeds milk to its baby." }), ...ALTS[2]),
      Q("groups", "apply", "animals.sort", mat("Which group does each animal belong to? Match them.", [["Penguin", "Bird"], ["Toad", "Amphibian"], ["Trout", "Fish"]], { hint: "Look at how its body is covered.", why: "A penguin has feathers, a toad has wet skin and a trout is a fish." }), ...ALTS[3]),
      Q("groups", "apply", "animals.mammals", ms("Pick the two mammals.", ["Camel", "Sheep"], ["Hen", "Snake"], { hint: "Which ones have hair and drink milk as babies?", why: "Camels and sheep are mammals." }), ...ALTS[4]),
      Q("senses", "recall", "senses.parts", hot("Tap the part of the body we use to hear.", [["👁️", "Eyes", 22, 50], ["👂", "Ears", 50, 50], ["👃", "Nose", 78, 50]], ["Ears"], { labels: true, hint: "It is on the side of your head.", why: "We hear with our ears." }), ...ALTS[5]),
      Q("teeth", "recall", "health.teeth", st("What is the word for the hard white things in your mouth that you brush?", ["teeth", "tooth"], { hint: "You brush them twice a day.", why: "Teeth help us bite and chew." }), ...ALTS[6]),
      Q("growing", "reason", "growing.change", mc("Omar says only people grow and change. Is he right?", "No, all animals grow and change", ["Yes, animals stay the same", "Yes, only people have a life cycle"], { hint: "Think of a chick and a hen.", why: "Every animal has a life cycle and grows and changes." }), ...ALTS[7]),
      Q("senses", "apply", "senses.fill", fill("Complete the sentence.", "We touch with our {b1} and see with our {b2}.", [["skin", "ears", "nose"], ["eyes", "feet", "toes"]], { hint: "Think about two senses.", why: "We feel with our skin and see with our eyes." }), ...ALTS[8]),
      Q("growing", "recall", "growing.stages", num("A butterfly goes from egg to caterpillar to butterfly. How many stages is that?", 3, { hint: "Count each one.", why: "There are three stages." }), ...ALTS[9]),
      Q("teeth", "apply", "health.brush", sld("Dentists say to brush every day. How many times a day?", { min: 0, max: 8, unit: "times" }, 2, 0, { hint: "Morning and night.", why: "We brush twice a day." }), ...ALTS[10]),
      Q("growing", "apply", "growing.order", ord("Put the life cycle in order.", ["Egg", "Chick", "Hen"], { hint: "It starts in a shell.", why: "An egg hatches into a chick, and the chick grows into a hen." }), ...ALTS[11]),
      Q("teeth", "reason", "health.why", mc("Why do we brush our teeth after sweet food?", "To wash away sugar that can make holes", ["To make the sugar grow", "To make our teeth fall out"], { hint: "What does sugar do to teeth?", why: "Brushing removes sugar that could harm our teeth." }), ...ALTS[12]),
      Q("groups", "reason", "animals.reason", mc("Ali says a penguin is a mammal because it cannot fly. Why is he wrong?", "A penguin has feathers and lays eggs, so it is a bird", ["A penguin is a fish", "A penguin has fur"], { hint: "Look at what covers its body.", why: "A penguin has feathers and lays eggs. It is a bird that swims instead of flies." }), ...ALTS[13]),
      Q("teeth", "reason", "health.reason", mc("Noor eats lots of sweets and never brushes. What might happen to her teeth?", "They could get holes", ["They will grow bigger", "Nothing at all"], { hint: "Sugar and germs make acid.", why: "Sugar not brushed away can make holes in teeth." }), ...ALTS[14]),
    ],
  }),
];
