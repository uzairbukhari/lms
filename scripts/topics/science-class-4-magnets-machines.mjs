import { SAY, SS, H, T, IMG, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, PHOTO, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC, CAM } from "./_science-kit.mjs";

// Science Class 4, topic 10: Magnets and Simple Machines (age 9-10). Enquiry types: comparative and fair test.
const CLIP = "science-class-4-magnets-machines-1-da518795.jpg";
const SEESAW = "science-class-4-magnets-machines-2-51cde3fe.jpg";
const GEARS = "science-class-4-magnets-machines-3-145ece44.jpg";

// ---------------------------------------------------------------------------------------------- 1. learn
const magnets = {
  id: "magnets", kind: "learn", title: "Magnets",
  blocks: [
    H("Welcome, young scientist!"),
    SAY("Welcome, young scientist! Today we test magnets, then look at levers, pulleys and gears.", T("Today we explore **magnets** and simple machines.")),
    IMG("🧲🔩⚙️", "A magnet, an iron nail and a gear."),
    H("Stop 1: Magnetic or not?"),
    SAY("A magnet attracts some materials. Magnetic materials always contain a metal, but not all metals are magnetic.", T("A **magnetic** material is attracted to a magnet.")),
    SAY("Iron is magnetic. Steel is magnetic because it contains iron. Copper, aluminium and gold are metals, but they are not magnetic. This paperclip is steel, so a magnet would pick it up.", PHOTO(CLIP, "A pink coated paperclip on a teal felt surface", "A steel paperclip is magnetic.", "Photo by Андрей Сизов on Unsplash")),
    CHK(mc("Which of these will a magnet attract?", "An iron nail", ["A plastic ruler", "A wooden spoon"], { hint: "Iron is magnetic.", why: "A magnet attracts iron and steel." })),
    H("Stop 2: Poles"),
    SAY("A magnet has two poles, a north pole and a south pole. The pull is strongest at the poles.", T("A magnet has a north and a south **pole**.")),
    SAY("Opposite poles attract. Matching poles repel, which means they push apart. The force acts at a distance, without touching.", T("Opposite poles **attract**. Matching poles **repel**.")),
    EB("lab", "Poles attract and repel",
      SS("North meets south. The two magnets pull together.", S("Opposite poles attract.", ["a", "🧲", 30, 50, 3, "pulse"], ["b", "🧲", 70, 50, 3, "pulse"])),
      SS("North meets north. The two magnets push apart.", S("Matching poles repel.", ["a", "🧲", 22, 50, 3, "none"], ["b", "🧲", 78, 50, 3, "none"], ["x", "↔️", 50, 50, 2, "pulse"]))),
    CHK(tf("Two matching poles pull together.", false, { hint: "Like poles push apart.", why: "Matching poles repel each other." })),
    SAY("Remember. Iron and steel are magnetic. Opposite poles attract and matching poles repel.", SUM("Iron and steel are magnetic", "Magnets have a north and a south pole", "Opposite poles attract, matching poles repel")),
    GLOSS({ magnets: "Objects that attract magnetic materials.", magnet: "An object that attracts iron and steel.", magnetic: "Attracted to a magnet.", pole: "An end of a magnet where the force is strongest.", attract: "To pull towards.", repel: "To push away." }),
  ],
  mini: [
    mc("Which material is magnetic?", "Steel", ["Wood", "Glass"], { hint: "It contains iron.", why: "Steel is magnetic." }),
    tf("Aluminium foil is magnetic.", false, { hint: "Is it iron or steel?", why: "Aluminium is a metal but not magnetic." }),
    mc("Where is a magnet strongest?", "At its poles", ["In the middle", "At the corners only"], { hint: "At the ends.", why: "The pull is strongest at the poles." }),
    mat("Match each pair of poles to what happens.", [["North and south", "Attract"], ["North and north", "Repel"], ["South and south", "Repel"]], { hint: "Opposites attract.", why: "Opposite poles attract and matching poles repel." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const invest = {
  id: "invest", kind: "try", title: "Magnet investigations",
  blocks: [
    H("Stop 1: Through paper, wood and plastic"),
    SAY("Magnetic force can pass through thin paper, wood and plastic. A magnet can move a paperclip through a card.", T("Magnetic force can act through some **materials**.")),
    EB("lab", "A force through card",
      SS("A paperclip sits on a thin card. A magnet is held under the card.", S("Magnet under card.", ["c", "📎", 50, 40, 3, "none"], ["m", "🧲", 50, 75, 3, "none"])),
      SS("The clip is pulled across the card. The force went through the card.", S("The force passes through.", ["c", "📎", 70, 40, 3, "pulse"], ["m", "🧲", 70, 75, 3, "pulse"]))),
    CHK(mc("A magnet moves a clip through a card. What does this show?", "Magnetic force can pass through card", ["The card is magnetic", "Card is heavy"], { hint: "The clip moved.", why: "The magnetic force passed through the card." })),
    H("Stop 2: Strength test"),
    SAY("To compare magnets, count how many paperclips each one picks up. Keep everything else the same, so the test is fair.", T("Count the paperclips each magnet picks up for a **fair test**.")),
    MAN("Count the clips", "Move the paperclips the magnet picks up into the Picked up box.", "📎", 12, ["On the table", "Picked up"]),
    ACT("Magnet strength test", ["Two or three magnets", "A box of paperclips", "A table and a ruler"], ["Predict which magnet is strongest.", "Dip each magnet in the clips and count how many it picks up.", "Record the results in a table.", "Try the test again with a card between the magnet and clips."]),
    CHK(mc("Why do we use the same box of clips for each magnet?", "To make it a fair test", ["To make the clips heavier", "To make the magnets warm"], { hint: "Change one thing.", why: "Using the same clips keeps the test fair." })),
    SAY("Remember. Magnetic force passes through thin materials but weakens with distance. Count clips to compare strength.", SUM("Magnetic force passes through thin materials", "It gets weaker with distance", "Count paperclips to compare magnets")),
    GLOSS({ materials: "What things are made from, such as wood or metal.", "fair test": "A test where only one thing changes.", predict: "To say what you think will happen.", strength: "How strong a magnet is." }),
  ],
  mini: [
    tf("A magnet pulls harder when it is closer.", true, { hint: "Distance matters.", why: "Magnetic force weakens with distance." }),
    ord("Put the strength test in order.", ["Predict", "Pick up clips", "Count the clips", "Record the results"], { hint: "Predict first.", why: "Predict, test, count and record." }),
    mc("Which magnet is strongest?", "The one that picks up the most clips", ["The biggest one", "The brightest one"], { hint: "Count the clips.", why: "More clips means a stronger magnet." }),
    mc("What should you change in a fair test of distance?", "Only the distance", ["The magnet and the clips", "Everything"], { hint: "One thing.", why: "Change only the distance." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const machines = {
  id: "machines", kind: "play", title: "Lever, pulley and gear",
  blocks: [
    H("Stop 1: Levers"),
    SAY("A lever is a bar that turns on a fixed point called a pivot. The thing you lift is the load, and your push is the effort.", T("A **lever** turns on a **pivot**. The **load** is lifted by the **effort**.")),
    SAY("A seesaw is a lever. The pivot is in the middle. Push down on one end, and the other end goes up.", PHOTO(SEESAW, "A blue and yellow spring seesaw on snow", "A seesaw is a lever with a pivot in the middle.", "Photo by Luca Fabbri on Unsplash")),
    EB("lab", "A lever lifts a rock",
      SS("A bar rests on a block, the pivot. A rock sits on the short end.", S("The pivot is the block.", ["r", "🪨", 25, 45, 3, "none"], ["p", "🔺", 45, 70, 2, "none"], ["b", "➖", 60, 55, 3, "none"])),
      SS("Push down on the long end. The rock lifts easily. A small effort moves a heavy load.", S("Push here: the rock lifts.", ["r", "🪨", 25, 30, 3, "pulse"], ["p", "🔺", 45, 70, 2, "none"], ["h", "👇", 80, 40, 3, "pulse"]))),
    CHK(mc("In a lever, what is the load?", "The thing being lifted", ["The fixed point", "The push you give"], { hint: "Load means the thing.", why: "The load is what is being lifted." })),
    H("Stop 2: Pulleys and gears"),
    SAY("A pulley is a wheel with a rope. It helps you lift a load and can change the direction of your pull.", T("A **pulley** is a wheel with a rope.")),
    SAY("Gears are wheels with teeth that fit together. Touching gears turn in opposite directions. Bicycle gears change how hard you pedal.", PHOTO(GEARS, "Bicycle gears and a chain on a rear wheel", "Gear wheels on a bicycle.", "Photo by Wayne Bishop on Unsplash")),
    SAY("Flip the cards and find the matching pairs. A little brain break!", BRAIN("memory_match", "Machine match", "Find the matching pairs.", ["⚙️", "🧲", "🔩", "🚲", "⚖️", "🪝"])),
    CHK(tf("Two gears that touch turn in opposite directions.", true, { hint: "The teeth push each other.", why: "Meshing gears turn in opposite directions." })),
    SAY("Remember. Levers, pulleys and gears are simple machines that make work easier.", SUM("A lever turns on a pivot", "A pulley is a wheel with a rope", "Gears are toothed wheels that turn together")),
    GLOSS({ lever: "A bar that turns on a pivot.", pivot: "The fixed point a lever turns on.", load: "The thing being lifted or moved.", effort: "The force you use to do a job.", pulley: "A wheel with a rope for lifting.", gear: "A wheel with teeth.", machine: "A tool that makes work easier." }),
  ],
  mini: [
    mc("What is the fixed point of a lever called?", "The pivot", ["The load", "The gear"], { hint: "It does not move.", why: "A lever turns on its pivot." }),
    tf("A pulley can change the direction of a pull.", true, { hint: "Pull down, load goes up.", why: "A pulley changes direction." }),
    mc("A wheelbarrow is...", "a lever", ["a pulley", "a magnet"], { hint: "Pivot at the wheel.", why: "A wheelbarrow is a lever." }),
    num("A seesaw has 2 children on one end and 3 on the other. How many children is that?", 5, { hint: "Add them.", why: "2 + 3 = 5." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const home = {
  id: "home", kind: "use", title: "Machines at home",
  blocks: [
    H("Stop 1: Machines in the kitchen"),
    SAY("Many things at home are levers. Scissors, a can opener, a door handle and a wheelbarrow all use a pivot to make work easier.", T("Scissors and wheelbarrows are **levers** that make work easier.")),
    EB("home", "Levers at home",
      SS("Scissors are two levers joined at a pivot. A small squeeze cuts thick card.", S("Scissors: two levers.", ["s", "✂️", 50, 50, 3, "pulse"])),
      SS("A wheelbarrow carries a heavy load. The pivot is the wheel, and you lift the handles.", S("Wheelbarrow: a lever.", ["w", "🛒", 50, 50, 3, "pulse"]))),
    CHK(mc("Which of these is a lever?", "A pair of scissors", ["A plate", "A mug"], { hint: "It has a pivot.", why: "Scissors use a pivot." })),
    H("Stop 2: Magnets in everyday life"),
    SAY("Magnets hold fridge doors shut. At a recycling centre, big magnets lift steel cans out of the rubbish.", T("Magnets **separate** steel from other rubbish.")),
    IMG("🧲🥫♻️", "A magnet picks out steel cans for recycling."),
    REVEAL("Why can a magnet not pick up aluminium cans? Have a think first.", "Aluminium is not magnetic. Steel cans contain iron, so a magnet picks them up."),
    CHK(tf("A recycling magnet picks up aluminium cans.", false, { hint: "Is aluminium magnetic?", why: "Aluminium is not magnetic." })),
    SAY("Remember. Machines make work easier, and they do not need engines. Magnets are useful, but keep them safe.", SUM("Levers, pulleys and gears make work easier", "Simple machines need no engine", "Magnets must be used safely")),
    GLOSS({ levers: "Bars that turn on a pivot.", separate: "To split things into groups.", recycling: "Turning used things into new materials.", engineer: "A person who designs machines.", safely: "In a way that avoids harm." }),
  ],
  mini: [
    mc("What can a pulley help you do?", "Lift a load", ["Make a shadow", "Make a magnet"], { hint: "A bucket on a rope.", why: "Pulleys help lift loads." }),
    tf("Simple machines always need an engine.", false, { hint: "Think of scissors.", why: "Simple machines use our muscle power." }),
    mc("A magnet on a fridge door holds...", "a note", ["a shadow", "a pulley"], { hint: "Steel door.", why: "A magnet holds notes on a steel door." }),
    mc("Why do engineers use gears?", "To change speed or force", ["To make magnets", "To make shadows"], { hint: "Think of a bike.", why: "Gears change speed and force." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "The rescue magnet", backdrop: "town", caption: "A magnet, a lever and a pulley solve three jobs.",
  scenes: [
    { caption: "A lost key.", say: "Hamza drops his steel key down a drain. How can he get it back?",
      items: [{ id: "h", emoji: "👦", label: "Hamza", x: 25, y: 56, size: 3, enter: "walk_right" }, { id: "k", emoji: "🔑", x: 72, y: 70, size: 3, enter: "pop" }] },
    { caption: "The magnet.", say: "He ties a magnet to a string. Steel is magnetic, so the magnet attracts it.",
      items: [{ id: "m", emoji: "🧲", label: "magnet", x: 50, y: 30, size: 3, path: "arc" }, { id: "k", emoji: "🔑", x: 50, y: 70, size: 3, effect: "glow" }] },
    { caption: "Key rescued.", say: "The key jumps up and sticks to the magnet. Magnetic force acts without touching.",
      items: [{ id: "m", emoji: "🧲", x: 50, y: 40, size: 3 }, { id: "k", emoji: "🔑", x: 50, y: 56, size: 3, effect: "sparkle" }] },
    { caption: "A heavy rock.", say: "Next, a big rock blocks the path. It is far too heavy to lift.",
      items: [{ id: "r", emoji: "🪨", label: "heavy load", x: 30, y: 55, size: 3, enter: "pop" }, { id: "h", emoji: "👦", x: 72, y: 56, size: 3 }] },
    { caption: "A lever.", say: "He puts a long bar on a block, the pivot. Pushing down lifts the rock.",
      items: [{ id: "r", emoji: "🪨", x: 25, y: 35, size: 3 }, { id: "p", emoji: "🔺", label: "pivot", x: 45, y: 72, size: 2 }, { id: "b", emoji: "➖", x: 55, y: 58, size: 3 }] },
    { caption: "A pulley.", say: "At the well, a pulley raises the bucket. The rope runs over a wheel.",
      items: [{ id: "w", emoji: "🛞", label: "pulley", x: 50, y: 25, size: 3 }, { id: "b", emoji: "🪣", x: 50, y: 65, size: 3, path: "arc" }] },
    { caption: "Gears turn.", say: "On his bicycle, gears turn in opposite directions to help him up the hill.",
      items: [{ id: "g", emoji: "⚙️", x: 38, y: 50, size: 3, anim: "pulse" }, { id: "h", emoji: "⚙️", x: 62, y: 50, size: 3, anim: "pulse" }] },
    { caption: "Simple machines.", say: "Magnets, levers, pulleys and gears make life easier. No engines needed!",
      items: [{ id: "h", emoji: "👦", x: 30, y: 56, size: 3, anim: "bounce" }, { id: "m", emoji: "🧲", x: 70, y: 40, size: 3, effect: "hearts" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- learn (q1-q8)
  Q("magnets", "recall", "mag.iron", tf("Iron is a magnetic material.", true, { hint: "Think of a nail.", why: "Iron is attracted to magnets." }),
    tf("Plastic is attracted to a magnet.", false, { hint: "Is plastic iron or steel?", why: "Plastic is not magnetic." })),
  Q("magnets", "recall", "mag.pickup", mc("Which of these will a magnet pick up?", "A steel paperclip", ["A plastic ruler", "A wooden pencil"], { hint: "Steel contains iron.", why: "A steel paperclip is magnetic." }),
    mc("Which of these will a magnet NOT pick up?", "An aluminium can", ["An iron nail", "A steel spoon"], { hint: "Aluminium is not magnetic.", why: "Aluminium is not magnetic." })),
  Q("magnets", "reason", "mag.all_metals", mc("Sam says all metals are magnetic. Is he right?", "No. Iron and steel are magnetic, but copper and aluminium are not", ["Yes, every metal is magnetic", "Yes, if it is shiny"], { hint: "Think of copper wire.", why: "Only some metals, such as iron and steel, are magnetic." }),
    mc("Mina says anything silver-coloured is magnetic. Is she right?", "No. Aluminium looks silver but is not magnetic", ["Yes, all silver things are magnetic", "Yes, shiny means magnetic"], { hint: "Think of foil.", why: "Colour does not tell us if something is magnetic." })),
  Q("magnets", "apply", "mag.fill_poles", fill("Complete the sentence about poles.", "Opposite poles {b1}. Matching poles {b2}.", [["attract", "repel", "melt"], ["repel", "attract", "break"]], { hint: "Opposites attract.", why: "Opposite poles attract and matching poles repel." }),
    fill("Complete the sentence about magnets.", "A magnet is strongest at its {b1}. Iron and {b2} are magnetic.", [["poles", "middle", "side"], ["steel", "wood", "glass"]], { hint: "The ends.", why: "A magnet is strongest at its poles. Iron and steel are magnetic." })),
  Q("magnets", "apply", "mag.hotspot", hot("Tap the object a magnet will attract.", [["🔩", "Iron nail", 22, 50], ["🥤", "Plastic cup", 50, 50], ["🪵", "Wooden block", 78, 50]], ["Iron nail"], { labels: true, hint: "Iron.", why: "A magnet attracts an iron nail." }),
    hot("Tap the object a magnet will pick up.", [["🧴", "Plastic bottle", 22, 50], ["📎", "Steel paperclip", 50, 50], ["🧵", "Cotton reel", 78, 50]], ["Steel paperclip"], { labels: true, hint: "Steel.", why: "A magnet picks up a steel paperclip." })),
  Q("magnets", "apply", "mag.count_clips", num("A magnet picks up 7 paperclips on one end and 6 on the other end. How many paperclips is that in total?", 13, { hint: "Add them.", why: "7 + 6 = 13." }),
    num("A magnet picks up 8 paperclips on one end and 9 on the other end. How many paperclips is that in total?", 17, { hint: "Add them.", why: "8 + 9 = 17." })),
  Q("magnets", "apply", "mag.magnetic_two", ms("Which two are magnetic materials? Pick two.", ["Iron", "Steel"], ["Aluminium", "Copper"], { hint: "Iron-containing.", why: "Iron and steel are magnetic." }),
    ms("Which two are NOT magnetic? Pick two.", ["Wood", "Glass"], ["Iron", "Steel"], { hint: "Not metals.", why: "Wood and glass are not magnetic." })),
  Q("magnets", "reason", "mag.touch", mc("Aisha says a magnet must touch an object to pull it. Is she right?", "No. Magnetic force acts at a distance, without touching", ["Yes, magnets only work by touch", "Yes, the force needs contact"], { hint: "Think of two magnets pushing apart.", why: "Magnetic force works at a distance." }),
    mc("Ben says a magnet only works when it touches the metal. Is he right?", "No. A magnet can pull a paperclip across a gap", ["Yes, only by touching", "Yes, it needs glue"], { hint: "Think of clips jumping.", why: "The force acts without contact." })),

  // ----- try (q9-q16)
  Q("invest", "apply", "mag.classify", mat("Match each material to magnetic or non-magnetic.", [["Iron nail", "Magnetic"], ["Aluminium foil", "Non-magnetic"], ["Steel can", "Magnetic"]], { hint: "Iron and steel.", why: "Iron and steel are magnetic. Aluminium is not." }),
    mat("Link each material to magnetic or non-magnetic.", [["Copper wire", "Non-magnetic"], ["Steel spoon", "Magnetic"], ["Plastic bag", "Non-magnetic"]], { hint: "Iron and steel.", why: "Steel is magnetic. Copper and plastic are not." })),
  Q("invest", "reason", "mag.bigger", mc("Layla says bigger magnets are always stronger. Is she right?", "No. Strength depends on the material, not just the size", ["Yes, bigger is always stronger", "Yes, small magnets are weak"], { hint: "Test with clips.", why: "A small strong magnet can beat a big weak one." }),
    mc("Mira says the biggest magnet will pick up the most clips every time. Is she right?", "No. You have to test it, because size does not always decide strength", ["Yes, size decides", "Yes, always"], { hint: "Test with clips.", why: "Strength depends on the material and type." })),
  Q("invest", "apply", "mag.distance_slider", sld("A magnet picks up 20 clips when touching. It picks up 5 fewer clips for every 1 cm of distance. Slide to show how many it picks up at 2 cm.", { min: 0, max: 20, unit: "clips" }, 10, 0, { hint: "5 fewer twice.", why: "20 - 5 - 5 = 10 clips." }),
    sld("A magnet picks up 24 clips when touching. It picks up 6 fewer clips for every 1 cm of distance. Slide to show how many it picks up at 3 cm.", { min: 0, max: 24, unit: "clips" }, 6, 0, { hint: "6 fewer three times.", why: "24 - 18 = 6 clips." })),
  Q("invest", "reason", "mag.poles_split", mc("Omar says if you break a magnet in half, one piece has only a north pole and the other only a south pole. Is he right?", "No. Each piece becomes a new magnet with its own north and south pole", ["Yes, the poles separate", "Yes, one piece loses its magnetism"], { hint: "Can a magnet have one pole?", why: "Magnetic poles always come in pairs." }),
    mc("Ben says you can make a magnet with just one pole. Is he right?", "No. Every magnet has two poles, a north and a south", ["Yes, if you cut it", "Yes, with a strong magnet"], { hint: "Poles come in pairs.", why: "Magnetic poles always come in pairs." })),
  Q("invest", "apply", "mag.test_order", ord("Put the paperclip strength test in order.", ["Place the magnet over a pile of clips", "Count the clips it picks up", "Repeat for the next magnet", "Compare and record the results"], { hint: "Test, count, repeat, compare.", why: "Test, count, repeat and compare." }),
    ord("Put the distance test in order.", ["Put a ruler on the table", "Move the magnet slowly towards a clip", "Mark where the clip jumps", "Record the distance"], { hint: "Set up, move, mark, record.", why: "Set up, move, mark and record." })),
  Q("invest", "apply", "mag.compare", num("Magnet A picks up 15 clips and magnet B picks up 9. How many more clips does magnet A pick up?", 6, { hint: "15 minus 9.", why: "15 - 9 = 6 more." }),
    num("Magnet A picks up 18 clips and magnet B picks up 11. How many more clips does magnet A pick up?", 7, { hint: "18 minus 11.", why: "18 - 11 = 7 more." })),
  Q("invest", "apply", "mag.fill_test", fill("Complete the sentence about magnetic force.", "A magnet can pull through paper and wood. The force gets {b1} with distance and {b2} with thickness.", [["weaker", "stronger", "louder"], ["weaker", "stronger", "hotter"]], { hint: "Further means less.", why: "Magnetic force weakens with distance and thickness." }),
    fill("Complete the sentence about a fair test.", "In a fair test we change one thing and {b1} the others. We count the {b2} each magnet picks up.", [["keep", "change", "remove"], ["paperclips", "poles", "colours"]], { hint: "Fair means the same.", why: "A fair test keeps other things the same and counts the clips." })),
  Q("invest", "recall", "mag.weaker", tf("A magnet's force is weaker when it is further from an object.", true, { hint: "Closer is stronger.", why: "Magnetic force weakens with distance." }),
    tf("Magnetic force can never pass through paper.", false, { hint: "The clip moved across card.", why: "Magnetic force passes through thin paper and card." })),

  // ----- play (q17-q23)
  Q("machines", "apply", "mag.lever_hot", hot("Tap the lever.", [["⚖️", "A seesaw", 22, 50], ["🚲", "A bike wheel", 50, 50], ["💡", "A light bulb", 78, 50]], ["A seesaw"], { labels: true, hint: "It turns on a pivot.", why: "A seesaw is a lever." }),
    hot("Tap the tool that is a lever.", [["✂️", "Scissors", 22, 50], ["🔦", "A torch", 50, 50], ["🪟", "A window", 78, 50]], ["Scissors"], { labels: true, hint: "It has a pivot.", why: "Scissors are levers." })),
  Q("machines", "reason", "mag.through_table", mc("Zainab says magnetism cannot go through a table. Is she right?", "No. Magnetic force can pass through thin wood, though it gets weaker with thickness", ["Yes, tables block all magnetism", "Yes, wood is magnetic"], { hint: "Think of a clip on card.", why: "Magnetic force passes through thin non-magnetic materials." }),
    mc("Ben says magnets cannot work through paper. Is he right?", "No. A magnet can pull a clip through paper", ["Yes, paper blocks magnetism", "Yes, paper is magnetic"], { hint: "Think of a clip on card.", why: "Magnetic force passes through paper." })),
  Q("machines", "reason", "mag.levers_same", mc("Hamza says all levers work the same way. Is he right?", "No. The pivot, load and effort can be in different places, so levers work in different ways", ["Yes, they are all the same", "Yes, they all have the pivot in the middle"], { hint: "Compare a seesaw and wheelbarrow.", why: "The pivot can be in different places." }),
    mc("Ali says a seesaw and a wheelbarrow are the same type of lever. Is he right?", "No. A seesaw has its pivot in the middle. A wheelbarrow has its pivot at the wheel", ["Yes, exactly the same", "Yes, both have a middle pivot"], { hint: "Where is the pivot?", why: "The pivot is in a different place on each." })),
  Q("machines", "apply", "mag.lever_parts", mat("Match each part of a lever to its job.", [["Pivot", "The fixed point it turns on"], ["Load", "The thing being lifted"], ["Effort", "The force you apply"]], { hint: "Think of the seesaw.", why: "A lever has a pivot, a load and an effort." }),
    mat("Match each machine to what it is.", [["Pulley", "A wheel with a rope"], ["Gear", "A wheel with teeth"], ["Lever", "A bar that turns on a pivot"]], { hint: "Think of each one.", why: "These are the simple machines." })),
  Q("machines", "apply", "mag.lift_order", ord("Put the steps of lifting a rock with a lever in order.", ["Place a bar under the rock", "Put a block under the bar as the pivot", "Push down on the long end", "The rock lifts"], { hint: "Set up, then push.", why: "Place the bar, add the pivot, push and lift." }),
    ord("Put the steps of raising a bucket with a pulley in order.", ["Hook the bucket to the rope", "Pass the rope over the wheel", "Pull down on the rope", "The bucket rises"], { hint: "Hook, pass, pull, rise.", why: "Hook, pass, pull and the bucket rises." })),
  Q("machines", "apply", "mag.gear_turns", sld("A gear with 10 teeth turns a gear with 20 teeth. Slide to show how many turns the small gear makes while the big gear turns once.", { min: 0, max: 5, unit: "turns" }, 2, 0, { hint: "20 divided by 10.", why: "The small gear has half the teeth, so it turns 2 times." }),
    sld("A gear with 10 teeth turns a gear with 30 teeth. Slide to show how many turns the small gear makes while the big gear turns once.", { min: 0, max: 5, unit: "turns" }, 3, 0, { hint: "30 divided by 10.", why: "The small gear turns 3 times." })),
  Q("machines", "apply", "mag.machines_two", ms("Which two are simple machines? Pick two.", ["A pulley", "A lever"], ["A torch", "A battery"], { hint: "They make work easier.", why: "A pulley and a lever are simple machines." }),
    ms("Which two are simple machines? Choose two.", ["A gear wheel", "A seesaw"], ["A light bulb", "A cup"], { hint: "They make work easier.", why: "A gear wheel and a seesaw are simple machines." })),

  // ----- use (q24-q30)
  Q("home", "apply", "mag.home_lever", mc("Which of these is a lever used in the kitchen or garden?", "A wheelbarrow", ["A bucket", "A hose"], { hint: "Pivot at the wheel.", why: "A wheelbarrow is a lever." }),
    mc("Which of these is a lever you can use to cut?", "Scissors", ["A plate", "A mug"], { hint: "Two blades on a pivot.", why: "Scissors are two levers." })),
  Q("home", "apply", "mag.fridge", num("A fridge has 6 magnets on each of 3 doors. How many magnets are there?", 18, { hint: "6 times 3.", why: "6 x 3 = 18 magnets." }),
    num("A classroom board has 4 magnets in each of 5 rows. How many magnets are there?", 20, { hint: "4 times 5.", why: "4 x 5 = 20 magnets." })),
  Q("home", "reason", "mag.engine", mc("Mira says machines need engines to work. Is she right?", "No. Simple machines like levers and pulleys work using our muscle power", ["Yes, all machines need engines", "Yes, they need electricity"], { hint: "Think of scissors.", why: "Simple machines need no engine." }),
    mc("Ben says a lever cannot work without electricity. Is he right?", "No. A lever works with just a push", ["Yes, it needs electricity", "Yes, it needs batteries"], { hint: "Think of a seesaw.", why: "A lever works by hand." })),
  Q("home", "recall", "mag.pulley_tf", tf("Using a pulley, you can pull down to lift a load up.", true, { hint: "Pull down, load goes up.", why: "A pulley can change the direction of the force." }),
    tf("A recycling magnet separates plastic from paper.", false, { hint: "Is plastic magnetic?", why: "A magnet separates magnetic materials such as steel." })),
  Q("home", "apply", "mag.fill_lever", fill("Complete the sentence about levers.", "A lever turns around a {b1}. The thing lifted is the {b2}.", [["pivot", "effort", "wheel"], ["load", "pivot", "gear"]], { hint: "Fixed point and lifted thing.", why: "A lever turns on a pivot and lifts a load." }),
    fill("Complete the sentence about machines.", "Machines make jobs {b1}. A gear has {b2}.", [["easier", "slower", "heavier"], ["teeth", "legs", "horns"]], { hint: "Think of a gear wheel.", why: "Machines make work easier, and gears have teeth." })),
  Q("home", "reason", "mag.gears_bikes", mc("Ali says gears are only found on bikes. Is he right?", "No. Gears are also in clocks, cars, hand whisks and can openers", ["Yes, only bikes have gears", "Yes, gears are only for transport"], { hint: "Look in the kitchen.", why: "Gears are in many machines." }),
    mc("Hana says gears are only found in cars. Is she right?", "No. Gears are in clocks, bikes and hand whisks too", ["Yes, only cars have gears", "Yes, gears are only for engines"], { hint: "Think of a hand whisk.", why: "Gears are in many machines." })),
  Q("home", "apply", "mag.safe_magnets", ms("Which two are safe ways to use magnets? Pick two.", ["Keep them away from cards and phones", "Keep small magnets away from young children"], ["Swallow a small magnet", "Throw magnets at friends"], { hint: "Think of safety.", why: "Keep magnets away from cards and small children." }),
    ms("Which two are safe ways to use magnets? Choose two.", ["Use magnets only for the experiment", "Tell a grown-up if a magnet breaks"], ["Hit magnets with a hammer", "Play with magnets near a TV"], { hint: "Think of safety.", why: "Use magnets carefully and tell a grown-up if one breaks." })),
];

export const topics = [
  topicLesson({
    slug: "science-class-4-magnets-machines", subject: "science", cls: 4, topic: 10, title: "Magnets and Simple Machines",
    summary: "Magnetic forces, and levers, pulleys and gears that make work easier.",
    unit: "Topic 10: Magnets and simple machines", difficulty: 2,
    objectives: ["Test materials for magnetism and explain attract and repel", "Explain that magnetic force acts at a distance", "Describe how levers, pulleys and gears help us"],
    success_criteria: ["I can say which materials are magnetic", "I can explain what poles do", "I can name the parts of a lever"],
    real_life: "Fridge magnets, recycling centres, seesaws, wheelbarrows and bicycle gears.",
    standards: [NC("Y4 forces", "Compare how things move; notice that some forces need contact and some act at a distance; describe magnets as having two poles; identify magnetic materials"), ...CAM("4Pf.01", "4Pf.02")],
    warm_up: [
      mc("What is a force?", "A push or a pull", ["A colour", "A sound"], { hint: "Think of pushing a door.", why: "A force is a push or a pull." }),
      tf("Metals are shiny.", true, { hint: "Think of copper.", why: "Most metals are shiny." }),
      mc("Which is a metal?", "Iron", ["Wood", "Plastic"], { hint: "Think of a nail.", why: "Iron is a metal." }),
    ],
    intro: [],
    subs: [magnets, invest, machines, home],
    clip,
    quiz,
  }),
];
