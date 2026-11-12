import { SAY, SS, H, T, PHOTO, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld, st } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC } from "./_science-kit.mjs";

// Science Class 1, topic 10: Pushes, pulls and magnets (Zainab, age 7).
const SWING = "science-class-1-magnets-pushes-pulls-1-522e7dfe.jpg";
const PINS = "science-class-1-magnets-pushes-pulls-2-5da93dc6.jpg";
const SCREWS = "science-class-1-magnets-pushes-pulls-3-209fe097.jpg";

// ---------------------------------------------------------------------------------------------- 1. learn
const pushpull = {
  id: "pushpull", kind: "learn", title: "Pushes and pulls",
  blocks: [
    H("Welcome back, young scientist!"),
    SAY("Today we find out what makes things move. What is a push, and what is a pull?", T("Today's big question: what makes things move?")),
    SAY("This swing is waiting. What would you do to make it move?", PHOTO(SWING, "An empty wooden swing with a pink seat hanging in a garden", "To start a swing you push it or pull it back. That is a force.", "Photo by Markus Spiske on Unsplash")),
    H("Stop 1: Pushes and pulls"),
    SAY("A push moves something away from you. A pull brings something towards you.", T("A **push** moves things away. A **pull** brings things closer.")),
    EB("home", "Push or pull?",
      SS("You kick a football. Your foot pushes the ball away.", S("A push.", ["z", "👧", 25, 58, 3], ["b", "⚽", 68, 66, 2, "bounce"])),
      SS("You open a drawer. You pull the handle towards you.", S("A pull.", ["d", "🗄️", 40, 58, 3], ["h", "✋", 72, 58, 2, "pulse"])),
      SS("You close a door. Your hand pushes it shut.", S("A push.", ["d", "🚪", 45, 58, 3], ["h", "✋", 75, 58, 2, "pulse"]))),
    CHK(mc("You kick a football. Is that a push or a pull?", "A push", ["A pull", "Neither"], { hint: "Which way does the ball go?", why: "Your foot pushes the ball away from you.", tag: "pushpull.chk1" })),
    H("Stop 2: Forces"),
    SAY("Pushes and pulls are both forces. A force can start, stop or change a movement.", T("A **force** is a push or a pull.")),
    EB("town", "Forces at play",
      SS("A big push sends a toy car far. A small push sends it a short way.", S("Push strength.", ["c", "🚗", 30, 62, 3], ["a", "➡️", 68, 62, 3, "pulse"])),
      SS("A swing needs a pull back and a push forward. Then it swings.", S("A swing.", ["s", "🎠", 50, 58, 3, "pulse"])),
      SS("A goalkeeper uses a force to stop the ball. Forces can stop things.", S("Stopping.", ["g", "🧤", 30, 58, 3], ["b", "⚽", 70, 62, 2]))),
    CHK(tf("A bigger push sends a toy car farther.", true, { hint: "Think about pushing hard and gently.", why: "The bigger the push, the farther the car goes.", tag: "pushpull.chk2" })),
    SAY("Let us remember. Pushes and pulls are forces. They make things move, stop or change.", SUM("A push moves things away", "A pull brings things closer", "A bigger force can move things farther")),
    GLOSS({ push: "A force that moves something away from you.", pull: "A force that brings something towards you.", force: "A push or a pull.", swing: "A seat that moves backwards and forwards on ropes.", goalkeeper: "The player who stops the ball going into the goal." }),
  ],
  mini: [
    mc("You open a drawer by its handle. What do you use?", "A pull", ["A push", "A twist"], { hint: "The drawer comes towards you.", why: "You pull the drawer towards you." }),
    tf("A push can make a ball go faster.", true, { hint: "Think about a kick.", why: "A push gives a ball speed." }),
    mc("What do we call a push or a pull?", "A force", ["A shape", "A colour"], { hint: "It is a science word.", why: "A push or pull is called a force." }),
    mc("Which bigger force sends a toy car farther?", "A big push", ["A tiny tap", "No push at all"], { hint: "Think of kicking hard.", why: "A big push gives the car more speed." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const test = {
  id: "test", kind: "try", title: "Magnet test",
  blocks: [
    H("Stop 1: What sticks?"),
    SAY("A magnet pulls on some things. We test things to find out which ones.", T("A **magnet** pulls on some metals. Things it pulls are **magnetic**.")),
    EB("lab", "Magnet test",
      SS("Hold the magnet near an iron nail. The nail jumps to the magnet.", S("Magnetic.", ["n", "🔩", 35, 62, 3, "bounce"], ["m", "🧲", 70, 58, 3, "pulse"])),
      SS("Try a wooden pencil. Nothing happens. Wood is not magnetic.", S("Not magnetic.", ["p", "✏️", 35, 62, 3], ["m", "🧲", 70, 58, 3])),
      SS("Try aluminium foil. It is a shiny metal, but it is not magnetic.", S("Foil.", ["f", "🪙", 35, 62, 3], ["m", "🧲", 70, 58, 3]))),
    CHK(ms("Which two does a magnet pick up? Pick two.", ["An iron nail", "A steel pin"], ["A wooden pencil", "A plastic comb"], { hint: "Think about iron and steel.", why: "Iron and steel are magnetic.", tag: "test.chk1" })),
    H("Stop 2: Testing carefully"),
    SAY("These steel safety pins are small. A magnet will pull on them.", PHOTO(PINS, "Two steel safety pins standing on a stack of yellow sticky notes", "Steel pins are made from iron, so a magnet pulls them. Test before you decide.", "Photo by Jamaica Cabahug on Unsplash")),
    SAY("A magnet can pull through thin paper. The force still reaches the metal.", T("A magnet works through thin paper.")),
    SAY("Now sort the things. Which are magnetic, and which are not?", MAN("Magnetic or not?", "Move each item. Things a magnet picks up go in Magnetic. The rest go in Not magnetic.", "🔩", 8, ["Magnetic", "Not magnetic"])),
    ACT("Magnet hunt", ["A magnet", "Things from around the house", "Paper and pencil", "A grown-up to help"], ["Guess if each thing is magnetic. Write your guess.", "Test each thing with the magnet.", "Make a table. Did your guess match the test?"]),
    CHK(tf("All shiny things stick to a magnet.", false, { hint: "Think about aluminium foil.", why: "Foil is shiny but it is not magnetic. Only some metals are.", tag: "test.chk2" })),
    SAY("Let us remember. Magnets pull on iron and steel. They do not pull on most other things.", SUM("A magnet picks up iron and steel", "Wood and plastic are not magnetic", "Test things, do not just guess")),
    GLOSS({ magnet: "An object that pulls on some metals.", magnetic: "Pulled by a magnet.", iron: "A hard grey metal that magnets pull.", steel: "A strong metal made mostly from iron.", aluminium: "A light silver metal that magnets do not pull.", predict: "To say what you think will happen." }),
  ],
  mini: [
    mc("Which material is magnetic?", "Iron", ["Wood", "Plastic"], { hint: "Think about a nail.", why: "A magnet pulls on iron." }),
    tf("A magnet can pull a steel pin through thin paper.", true, { hint: "The force reaches through.", why: "Magnetic force works through thin paper." }),
    mc("What should you do before you test an object?", "Predict what will happen", ["Throw it away", "Paint it"], { hint: "Make a guess first.", why: "We predict first, then test to check." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const poles = {
  id: "poles", kind: "play", title: "Attract or repel",
  blocks: [
    H("Stop 1: Two magnets"),
    SAY("Every magnet has two ends. They are called poles. One is north and one is south.", T("The ends of a magnet are called **poles**.")),
    EB("lab", "Two magnets meet",
      SS("A north pole and a south pole pull together. They attract.", S("Attract.", ["a", "🧲", 30, 60, 3], ["b", "🧲", 70, 60, 3, "pulse"])),
      SS("Two north poles push apart. They repel each other.", S("Repel.", ["a", "🧲", 25, 60, 3], ["b", "🧲", 75, 60, 3, "pulse"])),
      SS("Two south poles also repel. Like poles push apart.", S("Like poles.", ["a", "🧲", 25, 60, 3], ["b", "🧲", 75, 60, 3, "pulse"]))),
    CHK(mc("What happens when a north pole meets a south pole?", "They attract", ["They repel", "Nothing"], { hint: "Opposite poles are friends.", why: "A north pole and a south pole attract.", tag: "poles.chk1" })),
    H("Stop 2: Brain game"),
    SAY("Warm up your memory. Watch the magnets light up, then copy them.", T("Play the game, then answer a question.")),
    SAY("Watch the order closely. Then copy it.", BRAIN("remember_order", "Magnet march", "Watch the order, then copy it. It gets longer each time!", ["🧲", "🔩", "📎", "🧲"])),
    CHK(tf("Two north poles push each other away.", true, { hint: "Same poles repel.", why: "Like poles repel, so two norths push apart.", tag: "poles.chk2" })),
    SAY("Let us remember. Magnets attract or repel. The force works without touching.", SUM("Opposite poles attract", "Like poles repel", "Magnetic force works without touching")),
    GLOSS({ pole: "One of the two ends of a magnet.", poles: "The two ends of a magnet, north and south.", attract: "To pull towards.", repel: "To push away.", north: "One end of a magnet.", south: "The other end of a magnet." }),
  ],
  mini: [
    mc("What do we call the ends of a magnet?", "Poles", ["Legs", "Wheels"], { hint: "North and south.", why: "The ends of a magnet are poles." }),
    tf("Two south poles attract each other.", false, { hint: "Same poles repel.", why: "Two south poles repel." }),
    mc("Which word means push away?", "Repel", ["Attract", "Carry"], { hint: "It starts with r.", why: "Repel means push away." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const work = {
  id: "work", kind: "use", title: "Magnets at work",
  blocks: [
    H("Stop 1: Magnets help us"),
    SAY("Magnets do useful jobs every day. Many fridge doors close with a magnet inside.", T("Magnets are **useful**.")),
    SAY("Some toys use magnets to join together. Magnets hold train carriages in a line.", T("Toys can use magnets.")),
    SAY("In Pakistan and the UK, recycling centres use big magnets too.", T("A big magnet lifts steel cans.")),
    EB("kitchen", "Magnets at home",
      SS("A magnet in the fridge door pulls the door shut.", S("Fridge door.", ["f", "🧊", 40, 58, 3], ["m", "🧲", 75, 58, 2, "pulse"])),
      SS("A magnet holds a steel tin lid in place. It will not slide.", S("Holding.", ["l", "🥫", 40, 62, 3], ["m", "🧲", 75, 58, 2, "pulse"])),
      SS("A magnetic game has little fish. A magnet on a rod catches them.", S("Fishing game.", ["g", "🎣", 40, 58, 3], ["f", "🐟", 75, 64, 2, "bounce"]))),
    CHK(ms("Pick two places where magnets are used.", ["A fridge door", "A magnetic toy"], ["A pillow", "A wooden spoon"], { hint: "Think about the kitchen and toy box.", why: "Fridge doors and magnetic toys use magnets.", tag: "work.chk1" })),
    H("Stop 2: Sort and be safe"),
    SAY("A magnet can sort rubbish. It lifts steel and leaves the rest.", PHOTO(SCREWS, "Many steel screws, bolts and washers standing on a white surface", "Screws, bolts and nuts are often made of steel, so a magnet lifts them.", "Photo by Roberto Sorin on Unsplash")),
    SAY("Keep strong magnets away from phones and tablets. They can be damaged.", T("Use magnets with **care**.")),
    SAY("Never put a magnet in your mouth. Small magnets are dangerous to swallow.", T("Small magnets are not toys for little ones.")),
    ACT("Design a magnet game", ["A magnet", "Paper and pencil", "Paper clips", "A grown-up to help"], ["Draw a fishing game with paper fish.", "Add a steel paperclip to each fish.", "Tie a magnet to a string and go fishing."]),
    CHK(tf("Strong magnets should be kept away from phones and tablets.", true, { hint: "Think about safe use.", why: "A strong magnet can harm a phone or tablet.", tag: "work.chk2" })),
    SAY("Let us remember. Magnets hold things and sort things. Use them with care.", SUM("Magnets hold fridge doors shut", "A magnet can sort steel from rubbish", "Keep magnets away from screens and young children")),
    GLOSS({ useful: "Helpful for a job.", care: "Being careful and safe.", recycling: "Sorting used things so they can be made into something new.", tablet: "A flat computer with a touch screen.", "magnetic game": "A game where a magnet lifts steel pieces." }),
  ],
  mini: [
    mc("What can a recycling magnet lift?", "Steel cans", ["Glass jars", "Paper bags"], { hint: "It picks up steel.", why: "A magnet lifts steel and iron." }),
    tf("A fridge magnet will stick to a plastic door.", false, { hint: "Plastic is not magnetic.", why: "A magnet needs steel or iron to stick to." }),
    mc("Where should strong magnets be kept away from?", "A phone", ["A pencil", "A wooden toy"], { hint: "Think about safety.", why: "Strong magnets can damage phones." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Max the magnet robot", backdrop: "classroom", caption: "A magnet-loving robot tests things in a toy room.",
  scenes: [
    { caption: "Meet Max.", say: "I am Max the robot. I love magnets and I love tests.",
      items: [{ id: "r", emoji: "🤖", label: "Max", x: 35, y: 58, size: 3, enter: "pop" }, { id: "m", emoji: "🧲", x: 72, y: 58, size: 3, anim: "pulse" }] },
    { caption: "A paperclip.", say: "I hold my magnet near a steel paperclip. Click! It sticks.",
      items: [{ id: "p", emoji: "📎", x: 30, y: 62, size: 3, enter: "walk_right" }, { id: "m", emoji: "🧲", x: 72, y: 58, size: 3 }] },
    { caption: "A nail.", say: "An iron nail jumps to my magnet. Iron is magnetic.",
      items: [{ id: "n", emoji: "🔩", x: 35, y: 62, size: 3, anim: "bounce" }, { id: "m", emoji: "🧲", x: 72, y: 58, size: 3 }] },
    { caption: "Foil.", say: "Foil is shiny, but nothing happens. It stays behind.",
      items: [{ id: "f", emoji: "🪙", x: 35, y: 62, size: 3 }, { id: "m", emoji: "🧲", x: 72, y: 58, size: 3 }] },
    { caption: "A pencil.", say: "My wooden pencil does not stick either. Wood is not magnetic.",
      items: [{ id: "p", emoji: "✏️", x: 35, y: 62, size: 3 }, { id: "m", emoji: "🧲", x: 72, y: 58, size: 3 }] },
    { caption: "Through paper.", say: "I hide the clip under paper. My magnet still pulls it.",
      items: [{ id: "p", emoji: "📄", x: 40, y: 60, size: 3 }, { id: "m", emoji: "🧲", x: 72, y: 50, size: 3, anim: "float" }] },
    { caption: "Two magnets.", say: "My two magnets push apart. Like poles repel each other.",
      items: [{ id: "a", emoji: "🧲", x: 25, y: 60, size: 3 }, { id: "b", emoji: "🧲", x: 75, y: 60, size: 3, anim: "pulse" }] },
    { caption: "All sorted.", say: "I sort my things. Magnetic ones go left. The rest stay right!",
      items: [{ id: "r", emoji: "🤖", x: 50, y: 58, size: 3, effect: "sparkle" }, { id: "a", emoji: "📎", x: 20, y: 66, size: 2 }, { id: "b", emoji: "✏️", x: 82, y: 66, size: 2 }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- pushpull (q1-q8)
  Q("pushpull", "apply", "magnets.door_mc", mc("You open a cupboard by its handle. Is that a push or a pull?", "A pull", ["A push", "Neither one"], { hint: "The cupboard moves towards you.", why: "You pull the cupboard door towards you." }),
    mc("A cricket bat hits a ball away. Is that a push or a pull?", "A push", ["A pull", "Neither one"], { hint: "Which way does the ball go?", why: "The bat pushes the ball away from the batter." })),
  Q("pushpull", "apply", "magnets.action_match", mat("Match each action to push or pull.", [["Kicking a ball", "Push"], ["Opening a drawer", "Pull"], ["Closing a door", "Push"]], { hint: "Away or towards you?", why: "Kicking and closing a door are pushes. Opening a drawer is a pull." }),
    mat("Join each job to push or pull.", [["Throwing a ball", "Push"], ["Pulling a wagon", "Pull"], ["Pressing a button", "Push"]], { hint: "Away or towards you?", why: "Throwing and pressing are pushes. Pulling a wagon is a pull." })),
  Q("pushpull", "reason", "magnets.kick_push", mc("Aisha says a kick is not a push. Is she right?", "No, a kick pushes the ball away", ["Yes, a kick is a pull", "Yes, a kick is not a force"], { hint: "Which way does the ball go?", why: "A kick is a push because the ball moves away." }),
    mc("Mira says throwing is not a force. Is she right?", "No, a throw is a push, so it is a force", ["Yes, only pulling is a force", "Yes, a ball moves by itself"], { hint: "What starts the ball moving?", why: "Throwing pushes the ball, so it uses a force." })),
  Q("pushpull", "recall", "magnets.force_st", st("A push and a pull both have the same science name. What is it?", ["force", "a force"], { hint: "It starts with f.", why: "A push or a pull is a force." }),
    st("What kind of force do you use to close a door?", ["push", "a push"], { hint: "Your hand moves the door away.", why: "You push a door to close it." })),
  Q("pushpull", "recall", "magnets.trolley_num", num("Zainab pushes a toy car 5 metres, then 3 more metres. How many metres is that in all?", 8, { hint: "5 + 3.", why: "5 + 3 = 8 metres." }),
    num("Bilal pulls a wagon 6 metres, then 4 more metres. How many metres is that in all?", 10, { hint: "6 + 4.", why: "6 + 4 = 10 metres." })),
  Q("pushpull", "reason", "magnets.bigger_push", mc("Sam says a small push and a big push send a car the same distance. Is he right?", "No, a bigger push sends it farther", ["Yes, size makes no difference", "Yes, a small push goes farther"], { hint: "Think about a gentle tap.", why: "A bigger force makes the car go farther." }),
    mc("Layla says a bigger pull makes a trolley move faster. Is she right?", "Yes, a bigger force gives more speed", ["No, a bigger pull slows it down", "No, pulls do nothing"], { hint: "Think about pulling hard.", why: "A bigger pull makes the trolley go faster." })),
  Q("pushpull", "apply", "magnets.swing_ord", ord("Put the swing movements in order.", ["Pull the swing back", "Let go", "The swing moves forward"], { hint: "You pull before you let go.", why: "We pull the swing back, let go and it moves forward." }),
    ord("Order the push strengths from smallest to biggest.", ["A finger tap", "A hand push", "A hard kick"], { hint: "Start with the gentlest.", why: "A tap is smallest and a hard kick is biggest." })),
  Q("pushpull", "apply", "magnets.pull_tap", hot("Tap the thing you pull to open.", [["🗄️", "Drawer", 22, 50], ["⚽", "Football", 50, 50], ["🔔", "Doorbell", 78, 50]], ["Drawer"], { labels: true, hint: "You grab the handle.", why: "You pull a drawer handle to open it." }),
    hot("Tap the thing you can pull along on wheels.", [["🧳", "Suitcase", 22, 50], ["🏀", "Basketball", 50, 50], ["🥫", "Tin", 78, 50]], ["Suitcase"], { labels: true, hint: "It has a handle and wheels.", why: "You pull a suitcase along on its wheels." })),
  // ----- test (q9-q16)
  Q("test", "apply", "magnets.material_match", mat("Match each thing to magnetic or not magnetic.", [["Iron nail", "Magnetic"], ["Wooden spoon", "Not magnetic"], ["Plastic ruler", "Not magnetic"]], { hint: "Only iron and steel are magnetic.", why: "An iron nail is magnetic. Wood and plastic are not." }),
    mat("Join each thing to magnetic or not magnetic.", [["Steel paperclip", "Magnetic"], ["Aluminium foil", "Not magnetic"], ["Glass marble", "Not magnetic"]], { hint: "Only iron and steel are magnetic.", why: "A steel paperclip is magnetic. Foil and glass are not." })),
  Q("test", "reason", "magnets.all_metals", mc("Sam says all metals stick to magnets. Is he right?", "No, aluminium foil does not stick", ["Yes, every metal is magnetic", "Yes, magnets pick up everything"], { hint: "Think about foil.", why: "Only some metals, such as iron and steel, are magnetic." }),
    mc("Hamza says all shiny things are magnetic. Is he right?", "No, shiny foil and shiny plastic are not magnetic", ["Yes, shiny always means magnetic", "Yes, only dull things are magnetic"], { hint: "Look at a shiny wrapper.", why: "Shiny does not mean magnetic." })),
  Q("test", "recall", "magnets.magnetic_ms", ms("Which two things is a magnet able to pick up? Pick two.", ["A steel pin", "An iron bolt"], ["A rubber band", "A glass jar"], { hint: "Look for steel and iron.", why: "Steel and iron are magnetic." }),
    ms("Which two would stick to a magnet? Pick two.", ["A steel screw", "An iron nail"], ["A paper cup", "A wooden block"], { hint: "Look for steel and iron.", why: "Steel and iron are magnetic." })),
  Q("test", "apply", "magnets.plastic_tf", tf("A magnet picks up a plastic cup.", false, { hint: "Is plastic magnetic?", why: "Plastic is not magnetic." }),
    tf("A magnet picks up a steel paperclip.", true, { hint: "Is steel magnetic?", why: "Steel is magnetic." })),
  Q("test", "apply", "magnets.magnet_fill", fill("Finish the sentences about magnets.", "A magnet picks up things made of {b1} or steel. It does not pick up {b2}.", [["iron", "wood", "paper"], ["plastic", "nails", "pins"]], { hint: "Think about what is magnetic.", why: "Magnets pick up iron and steel. They do not pick up plastic." }),
    fill("Finish the sentences about a test.", "We {b1} what will happen. Then we use a {b2} to check.", [["predict", "forget", "hide"], ["magnet", "ruler", "spoon"]], { hint: "Think about a fair test.", why: "We predict first, then use a magnet to test." })),
  Q("test", "recall", "magnets.metal_st", st("What word describes things that a magnet can pick up?", ["magnetic"], { hint: "It sounds like magnet.", why: "Things a magnet picks up are magnetic." }),
    st("Which metal are most nails made from? Answer iron or steel.", ["iron", "steel", "iron or steel"], { hint: "It is strong and grey.", why: "Most nails are made from iron or steel." })),
  Q("test", "apply", "magnets.test_sld", sld("Zainab tests 10 things. 4 are magnetic. Slide to show how many are not magnetic.", { min: 0, max: 12, unit: "things" }, 6, 0, { hint: "10 take away 4.", why: "10 - 4 = 6 things." }),
    sld("Hamza tests 12 things. 5 are magnetic. Slide to show how many are not magnetic.", { min: 0, max: 14, unit: "things" }, 7, 0, { hint: "12 take away 5.", why: "12 - 5 = 7 things." })),
  Q("test", "reason", "magnets.paper_stop", mc("Zainab says a thin sheet of paper stops magnetic force. Is she right?", "No, a magnet still pulls through thin paper", ["Yes, paper always blocks it", "Yes, magnets only work in the dark"], { hint: "Remember the test.", why: "Magnetic force works through thin paper." }),
    mc("Mira says a magnet cannot work through a thin card. Is she right?", "No, the force passes through thin card", ["Yes, card blocks every force", "Yes, a magnet must touch the clip"], { hint: "Remember the paper test.", why: "A magnet can pull a clip through thin card." })),
  // ----- poles (q17-q23)
  Q("poles", "apply", "magnets.pole_match", mat("Match each pair of poles to what happens.", [["North and south", "Attract"], ["Two norths", "Repel"], ["Two souths", "Repel"]], { hint: "Opposites attract.", why: "Opposite poles attract. Like poles repel." }),
    mat("Join each pair to what happens.", [["Like poles", "Repel"], ["Unlike poles", "Attract"], ["Magnet and wood", "Nothing happens"]], { hint: "Like or unlike?", why: "Like poles repel, unlike poles attract and wood is not magnetic." })),
  Q("poles", "reason", "magnets.always_stick", mc("Mira says two magnets always stick together. Is she right?", "No, two like poles push apart", ["Yes, magnets always attract", "Yes, they cannot repel"], { hint: "Think about two north poles.", why: "Two like poles repel." }),
    mc("Bilal says two north poles pull on each other. Is he right?", "No, they push each other away", ["Yes, they attract strongly", "Yes, they stick for ever"], { hint: "Like poles repel.", why: "Two north poles repel." })),
  Q("poles", "reason", "magnets.must_touch", mc("Layla says magnets must touch to work. Is she right?", "No, a magnet can pull from a distance", ["Yes, they must touch", "Yes, they only work underwater"], { hint: "Remember the paper test.", why: "Magnetic force works without touching." }),
    mc("Hana says a magnet can pull a clip without touching it. Is she right?", "Yes, the force works at a distance", ["No, it must touch first", "No, only batteries can do that"], { hint: "Think about the clip jumping.", why: "A magnet pulls things from a distance." })),
  Q("poles", "apply", "magnets.north_tf", tf("When two north poles meet, they repel.", true, { hint: "Like poles repel.", why: "Two norths repel." }),
    tf("A north pole and a south pole push each other away.", false, { hint: "Opposites attract.", why: "A north and a south attract." })),
  Q("poles", "recall", "magnets.attract_st", st("What word means a magnet pulls something towards it?", ["attract", "attracts"], { hint: "It starts with a.", why: "Attract means pull towards." }),
    st("What word means a magnet pushes something away?", ["repel", "repels"], { hint: "It starts with r.", why: "Repel means push away." })),
  Q("poles", "apply", "magnets.repel_tap", hot("Tap the pair that will repel.", [["🧲🧲", "North and north", 22, 50], ["🧲", "North and south", 50, 50], ["🪵", "Magnet and wood", 78, 50]], ["North and north"], { labels: true, hint: "Like poles repel.", why: "Two north poles repel." }),
    hot("Tap the pair that will attract.", [["🧲🧲", "North and north", 22, 50], ["🧲", "North and south", 50, 50], ["🪵", "Magnet and wood", 78, 50]], ["North and south"], { labels: true, hint: "Opposites attract.", why: "A north and a south pole attract." })),
  Q("poles", "apply", "magnets.strong_sld", sld("A magnet picks up 9 clips at its end and 3 in the middle. Slide to show how many more it picks up at the end.", { min: 0, max: 12, unit: "clips" }, 6, 0, { hint: "9 take away 3.", why: "9 - 3 = 6 more clips at the end." }),
    sld("A magnet picks up 8 clips at its end and 5 in the middle. Slide to show how many more it picks up at the end.", { min: 0, max: 12, unit: "clips" }, 3, 0, { hint: "8 take away 5.", why: "8 - 5 = 3 more clips at the end." })),
  // ----- work (q24-q30)
  Q("work", "reason", "magnets.bigger_magnet", mc("Omar says a bigger magnet is always stronger. Is he right?", "No, the metal and shape matter too", ["Yes, big always means strong", "Yes, small magnets never work"], { hint: "Think about a small strong magnet.", why: "Size does not decide strength by itself." }),
    mc("Ali says a force can only pull. Is he right?", "No, a force can push too", ["Yes, a force only pulls", "Yes, pushes are not forces"], { hint: "Think about a kick.", why: "A force can be a push or a pull." })),
  Q("work", "apply", "magnets.used_ms", ms("Which two things use magnets? Pick two.", ["A fridge door", "A magnetic toy"], ["A pillow", "A wooden spoon"], { hint: "Think about the kitchen and toys.", why: "Fridge doors and some toys use magnets." }),
    ms("Which two use a magnet to hold something? Pick two.", ["A cupboard catch", "A fridge magnet"], ["A rubber duck", "A paper cup"], { hint: "Think about holding things shut.", why: "Catches and fridge magnets use magnets." })),
  Q("work", "apply", "magnets.recycle_fill", fill("Finish the sentences about recycling.", "A recycling magnet lifts {b1} but leaves {b2} behind.", [["steel cans", "glass jars", "paper bags"], ["aluminium foil", "iron nails", "steel tins"]], { hint: "Think about what is magnetic.", why: "A magnet lifts steel cans and leaves aluminium foil." }),
    fill("Finish the sentences about a cupboard catch.", "A magnetic catch keeps a {b1} door shut because the door has {b2} in it.", [["cupboard", "glass", "water"], ["steel", "wood", "foam"]], { hint: "The door must be magnetic.", why: "The catch pulls on the steel in the door." })),
  Q("work", "reason", "magnets.phone_safe", mc("Hamza says a strong magnet is fine next to a phone. Is he right?", "No, it can damage the phone", ["Yes, phones love magnets", "Yes, nothing can harm a phone"], { hint: "Think about safe use.", why: "Strong magnets can damage phones and tablets." }),
    mc("Layla says it is safe to swallow a small magnet. Is she right?", "No, swallowing a magnet is dangerous", ["Yes, it is harmless", "Yes, it makes you strong"], { hint: "Think about safe use.", why: "Small magnets are dangerous to swallow. Tell a grown-up." })),
  Q("work", "recall", "magnets.pole_st", st("What do we call the ends of a magnet, where the pull is strongest?", ["poles", "pole", "the poles"], { hint: "North and south.", why: "The ends of a magnet are the poles." }),
    st("What do we call a push or a pull that works without touching?", ["magnetic force", "magnetism", "magnetic"], { hint: "It has a magnet in the name.", why: "A magnet's pull is magnetic force." })),
  Q("work", "apply", "magnets.fix_ord", ord("Fix the problem: steel pins have spilled. Put the steps in order.", ["Get a magnet", "Hold it over the pins", "Lift the pins away"], { hint: "Get the tool first.", why: "We get a magnet, hold it over the pins and lift them." }),
    ord("Make a magnetic fishing game. Put the steps in order.", ["Add a clip to each paper fish", "Tie a magnet to a string", "Dip the magnet to catch fish"], { hint: "Prepare the fish first.", why: "We add clips, tie the magnet and then go fishing." })),
  Q("work", "recall", "magnets.fish_num", num("A magnetic game has 12 steel fish. Aisha catches 5. How many fish are left?", 7, { hint: "12 take away 5.", why: "12 - 5 = 7 fish." }),
    num("A magnetic game has 9 steel fish. Hamza catches 4. How many fish are left?", 5, { hint: "9 take away 4.", why: "9 - 4 = 5 fish." })),
];

export const topics = [
  topicLesson({
    slug: "science-class-1-magnets-pushes-pulls", subject: "science", cls: 1, topic: 10, title: "Pushes, Pulls and Magnets",
    summary: "Pushes and pulls are forces, and magnets pull on some metals.",
    unit: "Topic 10: Pushes, pulls and magnets", difficulty: 1,
    objectives: ["Say that pushes and pulls are forces", "Test what a magnet picks up", "Show that magnets attract and repel"],
    success_criteria: ["I can say if an action is a push or a pull", "I can test what a magnet picks up", "I can say when magnets attract and repel"],
    real_life: "Fridge magnets, a swing in the park, toy cars, and steel spoons and foil in the kitchen.",
    standards: [NC("Y3 forces and magnets", "Compare how things move; notice that some forces need contact and magnetic forces act at a distance; observe how magnets attract or repel and attract some materials and not others")],
    warm_up: [
      mc("You throw a ball. Is that a push or a pull?", "A push", ["A pull", "A twist"], { hint: "The ball moves away.", why: "Throwing pushes the ball away." }),
      tf("A push or a pull is a force.", true, { hint: "It is a science word.", why: "Pushes and pulls are forces." }),
      mc("Which one sticks to a magnet?", "An iron nail", ["A wooden pencil", "A plastic cup"], { hint: "Think about metal.", why: "A magnet pulls on iron." }),
    ],
    intro: [],
    subs: [pushpull, test, poles, work],
    clip,
    quiz,
  }),
];
