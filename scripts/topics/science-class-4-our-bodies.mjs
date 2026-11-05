import { SAY, SS, H, T, IMG, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, BAR, mc, ms, tf, num, ord, mat, fill, hot, sld, st } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC, PK, CAM } from "./_science-kit.mjs";

// Science Class 4, topic 2: Our bodies (Fatima, age 9). Enquiry type: research using sources.

const skeleton = {
  id: "skeleton", kind: "learn", title: "Skeleton and muscles",
  blocks: [
    H("Stop 1: Your skeleton"),
    SAY("Under your skin is a framework of bones called your skeleton. An adult has 206 bones. The skeleton does three jobs. It supports your body so you can stand up. It protects soft organs. Your skull protects your brain, and your ribs protect your heart and lungs. And it helps you move, together with your muscles. Look at the bones inside the body.", T("The **skeleton** supports, protects and helps us move.", "The skull protects the brain. The ribs protect the heart and lungs.")),
    EB("lab", "The skeleton",
      SS("Here is a body. Its bones form the skeleton. The bones hold the body up.", S("Bones support the body.", ["b", { kind: "body", highlight: "bones" }, 50, 52, 3, "none"])),
      SS("The skull is a hard box that protects the soft brain. The ribs make a cage around the heart and lungs.", S("Bones protect soft organs.", ["b", { kind: "body", highlight: "bones" }, 50, 52, 3, "pulse"]))),
    CHK(mc("Which bones protect your heart and lungs?", "The ribs", ["The skull", "The toes"], { hint: "They form a cage.", why: "The ribs make a cage around the heart and lungs." })),
    H("Stop 2: Muscles move your bones"),
    SAY("Bones cannot move on their own. Muscles move them. A muscle can only pull, never push, so muscles work in pairs. To bend your arm, the biceps muscle on top gets shorter and pulls. To straighten it, the triceps underneath pulls the other way. Tendons join muscles to bones, and joints, like your elbow, let the bones bend.", T("**Muscles** pull on bones to make them move. They work in pairs.", "A **joint**, like the elbow, is where two bones meet and can bend.")),
    EB("lab", "Muscles in pairs",
      SS("To bend the arm, the biceps on top pulls and gets shorter. The triceps relaxes.", S("Biceps pulls: the arm bends.", ["m", { kind: "body", highlight: "muscles" }, 50, 52, 3, "pulse"])),
      SS("To straighten the arm, the triceps pulls and the biceps relaxes. A muscle can only pull, so it needs a partner.", S("Triceps pulls: the arm straightens.", ["m", { kind: "body", highlight: "muscles" }, 50, 52, 3, "none"]))),
    CHK(mc("What can a muscle do?", "Only pull", ["Only push", "Push and pull"], { hint: "That is why they work in pairs.", why: "Muscles can only pull, so they work in pairs to move bones in two directions." })),
    SAY("Remember. The skeleton supports, protects and helps movement. Muscles pull bones, in pairs.", SUM("The skeleton supports, protects and helps us move", "Muscles pull on bones and work in pairs", "Joints are where bones meet")),
    GLOSS({ skeleton: "All the bones in the body.", muscles: "Parts of the body that pull to make bones move.", joint: "A place where two bones meet, such as the elbow.", tendon: "A strong cord that joins a muscle to a bone." }),
  ],
  mini: [
    num("How many bones does an adult have?", 206, { hint: "A little more than 200.", why: "An adult has 206 bones." }),
    mc("What protects your brain?", "The skull", ["The ribs", "The spine"], { hint: "It is a hard box.", why: "The skull protects the brain." }),
    tf("Muscles can push bones.", false, { hint: "Muscles only pull.", why: "A muscle can only pull." }),
    mat("Match each body part to its job.", [["Skeleton", "Supports the body"], ["Muscles", "Pull the bones"], ["Ribs", "Protect the heart"]], { hint: "Think about each job.", why: "The skeleton supports, muscles pull and ribs protect." }),
  ],
};

const digestion = {
  id: "digestion", kind: "try", title: "The digestive system",
  blocks: [
    H("Stop 1: A journey through the body"),
    SAY("Digestion is how your body breaks food down so it can use it. It starts in your mouth. Your teeth chew the food, and saliva makes it soft. You swallow, and the food moves down the oesophagus to the stomach. There, strong acid and churning muscles turn it into a thick liquid. Then it moves into the small intestine. Watch a meal make its journey.", T("**Digestion** breaks food into tiny pieces your body can use.", "Food travels through the mouth, oesophagus, stomach and intestines.")),
    EB("lab", "Digestion",
      SS("In the mouth, teeth chew the food and saliva starts to break it down.", S("Mouth: chewing.", ["f", "🍞", 50, 25, 3, "bounce"], ["m", "👄", 50, 45, 2, "pulse"])),
      SS("The stomach churns the food with acid. It becomes a thick liquid.", S("Stomach: churning.", ["f", "🍞", 50, 45, 2, "pulse"], ["b", { kind: "body", highlight: "stomach" }, 50, 60, 3, "none"])),
      SS("In the small intestine, nutrients pass into the blood. The large intestine takes out water, and the waste leaves the body.", S("Intestines: nutrients absorbed.", ["b", { kind: "body", highlight: "stomach" }, 50, 52, 3, "none"]))),
    CHK(ord("Put the food's journey in order.", ["Mouth", "Oesophagus", "Stomach", "Small intestine"], { hint: "Start with chewing.", why: "Food goes from the mouth down the oesophagus to the stomach and then the small intestine." })),
    H("Stop 2: Model it"),
    SAY("You can show digestion with a model. Put a banana and a little water in a strong bag. Squash it with your hands. That is the stomach churning. Squeeze the mush into a tight sock or tights, and see the liquid come out. That is what the small intestine does with nutrients. Then try matching the parts to jobs.", MAN("Digestion jobs", "Put each job in the right place: Breaks food down or Takes in nutrients.", "🍌", 8, ["Breaks food down", "Takes in nutrients"])),
    ACT("Model digestion", ["A banana", "A clear plastic bag", "Water", "Tights or an old sock", "A grown-up"], ["Put the banana and a little water in the bag and squash it. This is the stomach.", "Pour the mush into the tights. Squeeze the liquid out into a bowl. This is the small intestine.", "Draw what you saw and label the stomach and small intestine."]),
    CHK(mc("Where do nutrients pass into the blood?", "Small intestine", ["Mouth", "Oesophagus"], { hint: "It comes after the stomach.", why: "Nutrients are absorbed in the small intestine." })),
    SAY("Remember. Digestion breaks food down. Nutrients pass into the blood in the small intestine.", SUM("Digestion breaks food down so the body can use it", "Nutrients pass into the blood in the small intestine")),
    GLOSS({ digestion: "Breaking food into tiny pieces the body can use.", saliva: "The watery liquid in your mouth that starts to break food down.", oesophagus: "The tube that carries food from the mouth to the stomach.", nutrients: "The useful parts of food that the body needs.", intestine: "A long tube where nutrients are taken in." }),
  ],
  mini: [
    tf("Digestion starts in the mouth.", true, { hint: "Think about chewing.", why: "Chewing and saliva start digestion." }),
    mc("What does the stomach do to food?", "Churns it with acid", ["Stores it for a year", "Makes it hard"], { hint: "It mixes it.", why: "The stomach churns the food with acid." }),
    ord("Put these in order.", ["Chewing", "Swallowing", "Churning", "Absorbing nutrients"], { hint: "Start in the mouth.", why: "Digestion goes from chewing to swallowing, churning and absorbing." }),
  ],
};

const teeth = {
  id: "teeth", kind: "play", title: "Teeth and caring for them",
  blocks: [
    H("Stop 1: Three kinds of teeth"),
    SAY("You have different teeth for different jobs. Incisors at the front are sharp and cut food, like biting an apple. Canines are pointed and tear food. Molars at the back are flat and grind food. Children have twenty milk teeth, and adults have thirty-two. Look at the three kinds.", T("**Incisors** cut, **canines** tear and **molars** grind.", "Adults have 32 teeth.")),
    SAY("Here they are: the cutting teeth, the pointed teeth and the grinding teeth.", IMG("🦷✂️ 🦷🔺 🦷⚙️", "Incisors cut, canines tear and molars grind.")),
    CHK(mc("Which teeth grind food?", "Molars", ["Incisors", "Canines"], { hint: "They are flat and at the back.", why: "Molars are flat and grind food." })),
    H("Stop 2: Tooth care"),
    SAY("Sugar is bad for teeth. Bacteria in your mouth feed on sugar and make acid, which wears away the tooth. This is tooth decay. To protect your teeth, brush twice a day with fluoride toothpaste, limit sugary snacks, and visit the dentist. Many Muslims also use a miswak. The Prophet, peace be upon him, encouraged keeping the teeth clean. ", T("Brush twice a day with **fluoride** toothpaste, eat less sugar and visit the dentist.")),
    SAY("Warm up your memory with a game, then test your knowledge.", BRAIN("memory_match", "Healthy teeth pairs", "Find the matching pairs.", ["🦷", "🪥", "🍎", "🍬"])),
    CHK(ms("Pick two ways to protect your teeth.", ["Brush twice a day", "Eat fewer sugary snacks"], ["Brush once a week", "Drink fizzy drinks all day"], { hint: "Think about sugar and brushing.", why: "Brushing and cutting down on sugar prevent tooth decay." })),
    SAY("Remember. Teeth have different jobs. Sugar causes decay, so brush twice a day.", SUM("Incisors cut, canines tear, molars grind", "Sugar and bacteria make acid that causes tooth decay", "Brush twice a day")),
    GLOSS({ incisors: "Sharp front teeth that cut food.", canines: "Pointed teeth that tear food.", molars: "Flat back teeth that grind food.", bacteria: "Tiny living things, some of which make us ill.", decay: "When acid wears away a tooth, making holes.", fluoride: "A mineral in toothpaste that makes teeth stronger." }),
  ],
  mini: [
    mat("Match each tooth to its job.", [["Incisor", "Cuts"], ["Canine", "Tears"], ["Molar", "Grinds"]], { hint: "Think about shape.", why: "Incisors cut, canines tear and molars grind." }),
    tf("Bacteria turn sugar into acid that damages teeth.", true, { hint: "Think about decay.", why: "Bacteria make acid from sugar, and it causes decay." }),
    num("How many teeth does an adult usually have?", 32, { hint: "More than 30.", why: "An adult has 32 teeth." }),
  ],
};

const heart = {
  id: "heart", kind: "use", title: "Heart, blood and germs",
  blocks: [
    H("Stop 1: The heart and blood"),
    SAY("Your heart is a muscle that pumps blood all around your body. Blood carries oxygen from the lungs, and nutrients from food, to every part. It also carries waste away. You can feel your heartbeat as a pulse in your wrist. When you exercise, your muscles need more oxygen, so your heart beats faster. Let's look at the heart.", T("The **heart** pumps **blood** around the body.", "Your **pulse** is how many times your heart beats.")),
    EB("lab", "The heart",
      SS("The heart pumps blood out to the whole body, in a loop.", S("The heart pumps blood.", ["h", { kind: "body", highlight: "heart" }, 50, 52, 3, "pulse"])),
      SS("The blood carries oxygen from the lungs to the muscles.", S("Blood carries oxygen.", ["h", { kind: "body", highlight: "lungs" }, 50, 52, 3, "pulse"]))),
    CHK(mc("What does your heart do?", "Pumps blood around the body", ["Digests food", "Grows your hair"], { hint: "It is a muscle.", why: "The heart pumps blood around the body." })),
    SAY("Here are heart rates before and after exercise. When we run, the heart beats faster.", BAR("Heartbeats in one minute", [["Resting", 70], ["After running", 100]], "Your heart beats faster after you run.")),
    CHK(mc("Why does your heart beat faster when you run?", "Your muscles need more oxygen", ["You are bored", "Your bones are growing"], { hint: "Think about the blood.", why: "Muscles need more oxygen, so the heart pumps faster." })),
    H("Stop 2: Germs and medicines"),
    SAY("Germs are tiny living things, like bacteria and viruses, that can make us ill. They spread through coughs, sneezes and dirty hands. We stop them by washing hands with soap, covering coughs, and keeping clean. A hadith teaches that cleanliness is half of faith. Vaccines train the body to fight germs. Antibiotics are medicines that kill bacteria. They do not work on viruses. Only take medicine that a grown-up gives you.", IMG("🧼 🤧 💉", "Soap, covering a sneeze and a vaccine help stop germs.")),
    CHK(tf("Antibiotics kill bacteria.", true, { hint: "They do not work on viruses.", why: "Antibiotics are medicines that kill bacteria." })),
    SAY("Remember. The heart pumps blood with oxygen. Germs can make us ill, so keep clean. Only take medicine from a grown-up.", SUM("The heart pumps blood carrying oxygen", "Germs spread, so wash hands and cover coughs", "Only take medicine from a grown-up")),
    GLOSS({ heart: "The muscle that pumps blood around the body.", blood: "The red liquid that carries oxygen and nutrients.", pulse: "The beat of your heart, felt in your wrist.", germs: "Tiny living things that can cause illness.", vaccine: "A medicine that helps the body fight a germ.", antibiotics: "Medicines that kill bacteria.", viruses: "Tiny germs that are not killed by antibiotics." }),
  ],
  mini: [
    mc("What carries oxygen around the body?", "Blood", ["Bones", "Teeth"], { hint: "Pumped by the heart.", why: "Blood carries oxygen." }),
    tf("Washing your hands helps stop germs spreading.", true, { hint: "Think about soap.", why: "Soap and water remove germs." }),
    mc("Who should give you medicine?", "A trusted grown-up", ["A friend", "Nobody, take it yourself"], { hint: "Medicines can be harmful.", why: "Only take medicine from a grown-up who knows what it is." }),
    ms("Pick two ways to stop germs spreading.", ["Wash hands", "Cover coughs"], ["Share cups", "Rub your eyes"], { hint: "Think about hygiene.", why: "Hand washing and covering coughs stop germs spreading." }),
  ],
};

const ALTS = [
  [mc("Which part of the skeleton protects the brain?", "The skull", ["The ribs", "The knee"], { hint: "It is a hard box.", why: "The skull protects the brain." }), mc("Which part of the skeleton protects the lungs?", "The ribs", ["The skull", "The fingers"], { hint: "They form a cage.", why: "The ribs protect the heart and lungs." })],
  [tf("A muscle can only pull.", true, { hint: "That is why they work in pairs.", why: "Muscles can only pull." }), tf("Bones can move without muscles.", false, { hint: "What pulls the bones?", why: "Muscles pull the bones to make them move." })],
  [ord("Arrange the food's journey from first to last.", ["Mouth", "Stomach", "Small intestine", "Large intestine"], { hint: "Follow the food.", why: "Food goes mouth, stomach, small intestine, large intestine." }), ord("Order these parts of digestion.", ["Oesophagus", "Stomach", "Small intestine"], { hint: "Follow the food.", why: "Food goes down the oesophagus into the stomach and then the small intestine." })],
  [mat("Pair each part with its job.", [["Stomach", "Churns food"], ["Small intestine", "Absorbs nutrients"], ["Mouth", "Chews food"]], { hint: "Think about digestion.", why: "Each part has a job in digestion." }), mat("Link each organ to its job.", [["Heart", "Pumps blood"], ["Lungs", "Take in oxygen"], ["Stomach", "Digests food"]], { hint: "Think about each organ.", why: "Each organ has its own job." })],
  [hot("Tap the organ that pumps blood.", [["❤️", "Heart", 22, 50], ["🧠", "Brain", 50, 50], ["🫁", "Lungs", 78, 50]], ["Heart"], { labels: true, hint: "It beats.", why: "The heart pumps blood." }), hot("Tap the organ you use to breathe.", [["❤️", "Heart", 22, 50], ["🧠", "Brain", 50, 50], ["🫁", "Lungs", 78, 50]], ["Lungs"], { labels: true, hint: "It takes in air.", why: "Lungs take in oxygen." })],
  [st("What is the word for the beat of your heart that you feel in your wrist?", ["pulse"], { hint: "It starts with p.", why: "Your pulse is your heartbeat." }), st("What is the name of the tube from your mouth to your stomach?", ["oesophagus", "esophagus", "food pipe", "gullet"], { hint: "It starts with oes.", why: "The oesophagus carries food to the stomach." })],
  [mc("A boy is chewing a carrot. Which teeth tear and bite the carrot first?", "Incisors", ["Molars", "None"], { hint: "They are at the front.", why: "Incisors cut and bite food." }), mc("Which teeth are best for grinding bread?", "Molars", ["Incisors", "Canines"], { hint: "They are flat.", why: "Molars grind food." })],
  [fill("Finish the sentences about the heart.", "The heart is a {b1} that pumps {b2}.", [["muscle", "bone", "nerve"], ["blood", "water", "air"]], { hint: "It beats.", why: "The heart is a muscle that pumps blood." }), fill("Finish the sentences about bones.", "The {b1} protects the brain and the {b2} protect the heart.", [["skull", "toes", "knee"], ["ribs", "fingers", "ears"]], { hint: "Think about the skeleton.", why: "The skull protects the brain and the ribs protect the heart." })],
  [num("A child has 20 milk teeth. 6 fall out. How many are left?", 14, { hint: "20 minus 6.", why: "20 - 6 = 14." }), num("An adult has 32 teeth. 4 are wisdom teeth. How many are not wisdom teeth?", 28, { hint: "32 minus 4.", why: "32 - 4 = 28." })],
  [sld("About how many times does the heart beat each minute when resting? Slide to show it.", { min: 0, max: 200, unit: "beats" }, 70, 15, { hint: "Between 60 and 100.", why: "A resting heart beats about 60 to 100 times a minute." }), sld("About how many bones does an adult have?", { min: 0, max: 400, unit: "bones" }, 206, 15, { hint: "Just over 200.", why: "An adult has 206 bones." })],
  [ord("Put the steps of tooth decay in order.", ["Sugary food", "Bacteria make acid", "Tooth wears away"], { hint: "Start with the sugar.", why: "Sugar feeds bacteria, which make acid that wears the tooth." }), ord("Order the steps of good tooth care.", ["Eat less sugar", "Brush twice a day", "Visit the dentist"], { hint: "Think about each habit.", why: "Each habit helps protect the teeth." })],
  [mc("Ali says a muscle can push a bone. Why is he wrong?", "Muscles can only pull, so they work in pairs", ["Muscles are made of bone", "Muscles are too big"], { hint: "Think about biceps and triceps.", why: "A muscle can only pull. Pairs pull in opposite directions." }), mc("Sara says bones move on their own. Why is she wrong?", "Muscles pull the bones to make them move", ["Bones are alive and walk", "Bones are soft"], { hint: "What pulls bones?", why: "Bones need muscles to move them." })],
  [mc("Why do we brush our teeth after sweet snacks?", "To remove sugar that bacteria turn into acid", ["To make sugar grow", "To make teeth softer"], { hint: "Think about acid.", why: "Brushing removes sugar and plaque, so there is less acid." }), mc("Why should we visit the dentist?", "To check for decay and keep teeth healthy", ["To get more sugar", "To make teeth fall out"], { hint: "Dentists look after teeth.", why: "Dentists spot problems early." })],
  [mc("Noor says germs only make us ill if we see them. Why is she wrong?", "Germs are too small to see, but can still spread", ["Germs are big", "Germs are not real"], { hint: "How big are germs?", why: "Germs are tiny, so we cannot see them, but they still spread." }), mc("Omar says antibiotics cure colds. Why is he wrong?", "Colds are caused by viruses, and antibiotics only kill bacteria", ["Antibiotics are sweets", "Colds are not real"], { hint: "What causes colds?", why: "Antibiotics do not work on viruses." })],
  [mc("What carries oxygen to your muscles?", "Blood", ["Bones", "Saliva"], { hint: "The heart pumps it.", why: "Blood carries oxygen." }), mc("Why does your heart beat faster during exercise?", "Muscles need more oxygen", ["Your teeth are growing", "You are hungry"], { hint: "Think about muscles.", why: "More oxygen is needed, so the heart pumps faster." })],
];

export const topics = [
  topicLesson({
    slug: "science-class-4-our-bodies", subject: "science", cls: 4, topic: 2, title: "Our Bodies",
    summary: "The skeleton and muscles, digestion, teeth, the heart and blood, germs and medicines.",
    unit: "Topic 2: Our bodies", difficulty: 2,
    objectives: ["Describe what the skeleton and muscles do", "Describe the digestive system", "Name types of teeth and how to care for them", "Explain the heart, blood and how germs spread"],
    success_criteria: ["I can say what the skeleton and muscles do", "I can describe the journey of food", "I can name three types of teeth", "I can explain how to stay healthy"],
    real_life: "Looking after your teeth, staying clean and understanding why exercise makes your heart beat faster.",
    standards: [NC("Y4 animals incl. humans", "Describe the simple functions of the basic parts of the digestive system; identify the different types of teeth and their simple functions"), NC("Y3 animals incl. humans", "Identify that humans have skeletons and muscles for support, protection and movement"), NC("Y6 circulation", "Identify and name the main parts of the human circulatory system"), ...CAM("4Bs.01", "4Bs.02", "4Bs.03", "4Bs.04", "4Bp.01", "4Bp.02", "4Bp.04")],
    warm_up: [
      mc("Which group of animals has a backbone?", "Vertebrates", ["Invertebrates", "Insects"], { hint: "Think about the spine.", why: "Vertebrates have a backbone." }),
      mc("What do plants make using light?", "Food", ["Bones", "Teeth"], { hint: "Photosynthesis.", why: "Plants make food by photosynthesis." }),
      tf("A habitat is where a living thing lives.", true, { hint: "A home.", why: "A habitat is where something lives." }),
    ],
    intro: [
      H("Welcome back, young scientist!"),
      SAY("Welcome back, young scientist! Today's big question is: how does your body work? By the end, you will explain how bones and muscles move you, how food is digested, why we look after our teeth, and how the heart and germs affect your health. Let's go!", T("Today's big question: how does your body work?", "We will look inside the body.")),
      IMG("🦴💪🦷❤️", "Bones, muscles, teeth and a heart."),
      GLOSS({ body: "All the parts that make up a person." }),
    ],
    subs: [skeleton, digestion, teeth, heart],
    quiz: [
      Q("skeleton", "recall", "bodies.protect", mc("Which part of the body protects the brain?", "The skull", ["The ribs", "The elbow"], { hint: "A hard box.", why: "The skull protects the brain." }), ...ALTS[0]),
      Q("skeleton", "recall", "bodies.muscles", tf("Muscles can only pull on bones.", true, { hint: "That is why they work in pairs.", why: "Muscles can only pull." }), ...ALTS[1]),
      Q("digestion", "apply", "bodies.journey", ord("Put the journey of food in order.", ["Mouth", "Oesophagus", "Stomach", "Small intestine"], { hint: "Follow the food.", why: "Food goes down the oesophagus into the stomach and then the small intestine." }), ...ALTS[2]),
      Q("heart", "apply", "bodies.organs", mat("Which job does each organ do? Match them.", [["Heart", "Pumps blood"], ["Lungs", "Take in oxygen"], ["Brain", "Controls the body"]], { hint: "Think about each organ.", why: "The heart pumps, the lungs take in oxygen and the brain controls." }), ...ALTS[3]),
      Q("heart", "recall", "bodies.label", hot("Tap the organ that sends blood around the body.", [["❤️", "Heart", 22, 50], ["🦷", "Tooth", 50, 50], ["🦴", "Bone", 78, 50]], ["Heart"], { labels: true, hint: "It beats.", why: "The heart pumps blood." }), ...ALTS[4]),
      Q("heart", "recall", "bodies.words", st("What is the word for the beat of your heart that you can feel in your wrist?", ["pulse"], { hint: "It starts with p.", why: "Your pulse is your heartbeat." }), ...ALTS[5]),
      Q("teeth", "apply", "bodies.teeth_types", ms("Which two kinds of teeth are used for biting and tearing food?", ["Incisors", "Canines"], ["Molars", "Fillings"], { hint: "Think of sharp and pointed teeth.", why: "Incisors cut and canines tear. Molars grind." }),
        ms("Pick the two things that cause tooth decay.", ["Sugar", "Bacteria"], ["Fluoride", "Brushing"], { hint: "Think about acid.", why: "Bacteria feed on sugar and make the acid that causes decay." }),
        ms("Pick two things that help to prevent tooth decay.", ["Fluoride toothpaste", "Brushing twice a day"], ["Sugary drinks", "Skipping the dentist"], { hint: "Think about good habits.", why: "Fluoride toothpaste and brushing protect the teeth." })),
      Q("heart", "apply", "bodies.fill", fill("Complete the sentences about the heart.", "The heart is a {b1} that pumps {b2} around the body.", [["muscle", "bone", "nerve"], ["blood", "water", "air"]], { hint: "It beats.", why: "The heart is a muscle that pumps blood." }), ...ALTS[7]),
      Q("teeth", "apply", "bodies.teeth_maths", num("A child has 20 milk teeth and loses 8. How many milk teeth are left?", 12, { hint: "20 minus 8.", why: "20 - 8 = 12." }), ...ALTS[8]),
      Q("heart", "apply", "bodies.pulse", sld("About how many times does a resting adult heart beat in a minute?", { min: 0, max: 200, unit: "beats" }, 70, 15, { hint: "Between 60 and 100.", why: "A resting heart beats about 60 to 100 times a minute." }), ...ALTS[9]),
      Q("teeth", "apply", "bodies.decay", ord("Arrange the steps of tooth decay, from first to last.", ["Sugary food", "Bacteria make acid", "Tooth is worn away"], { hint: "Start with the sugar.", why: "Sugar feeds bacteria, which make acid that wears the tooth." }), ...ALTS[10]),
      Q("skeleton", "reason", "bodies.reason_muscles", mc("Zainab says muscles can push bones. Why is she wrong?", "Muscles can only pull, so they work in pairs", ["Muscles are made of bone", "Muscles are too big"], { hint: "Think about biceps and triceps.", why: "A muscle can only pull. Pairs pull in opposite directions." }), ...ALTS[11]),
      Q("teeth", "reason", "bodies.reason_teeth", mc("Why is it a good idea to brush after eating sweets?", "To remove sugar that bacteria turn into acid", ["To make sugar grow", "To make teeth softer"], { hint: "Think about acid.", why: "Brushing removes sugar and plaque, so there is less acid." }), ...ALTS[12]),
      Q("heart", "reason", "bodies.reason_germs", mc("Hamza says germs are not real because he cannot see them. Why is he wrong?", "Germs are too small to see, but can still spread", ["Germs are big", "Germs are not real"], { hint: "How big are germs?", why: "Germs are tiny, so we cannot see them, but they still spread." }), ...ALTS[13]),
      Q("heart", "reason", "bodies.reason_exercise", mc("Why does your heart rate go up during a race?", "Your muscles need more oxygen", ["You are growing", "You are hungry"], { hint: "Think about the blood.", why: "Muscles need more oxygen, so the heart pumps faster." }), ...ALTS[14]),
    ],
  }),
];
