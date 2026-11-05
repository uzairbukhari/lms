import { SAY, SS, H, T, IMG, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, BAR, mc, ms, tf, num, ord, mat, fill, hot, sld, st } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC, PK, CAM } from "./_science-kit.mjs";

// Science Class 4, topic 5: Electricity (Fatima, age 9). Enquiry type: comparative and fair test.

const circuit = {
  id: "circuit", kind: "learn", title: "Circuits and what they need",
  blocks: [
    H("Stop 1: A complete circuit"),
    SAY("Electricity is a form of energy that flows around a loop. A loop of wire joined to a power source is called a circuit. The power source can be a cell, which is what we often call a battery. A bulb, a buzzer or a motor in the loop is a component that uses the energy. For the bulb to light, the circuit must be complete, with no gaps. If there is a gap anywhere, the electricity cannot flow and the bulb stays off.", T("A **circuit** is a loop that electricity flows around.", "It must be **complete**, with no gaps, for the bulb to light.")),
    EB("lab", "A simple circuit",
      SS("This circuit has a cell, wires and a bulb joined in a complete loop. The bulb lights up.", S("A complete circuit works.", ["c", "🔋", 20, 60, 3, "none"], ["b", "💡", 75, 45, 3, "pulse"], ["w", "➰", 50, 70, 3, "none"])),
      SS("Here a wire has come loose, so there is a gap. The electricity cannot flow, and the bulb stays off.", S("A gap stops the flow.", ["c", "🔋", 20, 60, 3, "none"], ["b", "🌑", 75, 45, 3, "none"], ["x", "❌", 50, 70, 3, "pulse"]))),
    CHK(mc("A bulb in a circuit will not light. What could be wrong?", "There is a gap in the circuit", ["The wires are too clean", "The cell is too warm"], { hint: "Think about the loop.", why: "Electricity can only flow if the circuit is complete, with no gaps." })),
    H("Stop 2: Switches"),
    SAY("A switch is a way to open or close a circuit. When the switch is closed, the gap is joined up, so electricity flows and the bulb lights. When the switch is open, there is a gap, so the bulb goes off. Every light switch at home works this way. It lets us control a circuit without pulling wires apart.", T("A **switch** opens or closes a circuit.", "Closed switch: the bulb is on. Open switch: the bulb is off.")),
    EB("home", "A switch at work",
      SS("The switch is closed. The circuit is complete, so the lamp is on.", S("Closed switch: lamp on.", ["s", "🔘", 25, 60, 3, "none"], ["l", "💡", 75, 45, 3, "pulse"])),
      SS("The switch is open. There is a gap, so the lamp is off.", S("Open switch: lamp off.", ["s", "⭕", 25, 60, 3, "none"], ["l", "🌑", 75, 45, 3, "none"]))),
    CHK(tf("When a switch is open, the bulb is on.", false, { hint: "Open means a gap.", why: "An open switch makes a gap, so the bulb is off." })),
    SAY("Remember. A complete circuit with a power source lets electricity flow. A switch opens or closes it.", SUM("A circuit is a complete loop", "A gap in the circuit stops the flow", "A switch opens or closes a circuit")),
    GLOSS({ circuit: "A complete loop that electricity can flow around.", complete: "Joined up with no gaps.", switch: "A part that opens or closes a circuit." }),
  ],
  mini: [
    mc("What does a cell provide in a circuit?", "Energy", ["Shadows", "Sound only"], { hint: "It is the power source.", why: "A cell is the power source that supplies electrical energy." }),
    tf("A circuit with a gap will still light a bulb.", false, { hint: "Electricity needs a loop.", why: "A gap stops the electricity flowing." }),
    mat("Match each part to its job.", [["Cell", "Supplies energy"], ["Bulb", "Gives light"], ["Switch", "Opens or closes the circuit"]], { hint: "Think about what each does.", why: "The cell gives energy, the bulb gives light and the switch controls the circuit." }),
    ord("Put these in order for turning a lamp on.", ["Close the switch", "The circuit is complete", "The bulb lights"], { hint: "Start with the switch.", why: "Closing the switch completes the circuit, so the bulb lights." }),
  ],
};

const conduct = {
  id: "conduct", kind: "try", title: "Conductors and insulators",
  blocks: [
    H("Stop 1: Which materials let electricity through?"),
    SAY("Some materials let electricity flow through them easily. These are called electrical conductors. Metals such as copper, iron and aluminium are good conductors. That is why wires have a metal centre. Other materials do not let electricity flow. These are called electrical insulators. Plastic, rubber, wood and glass are insulators. That is why wires are covered in plastic, and why a plug has a plastic case. Look at which materials are which.", T("An electrical **conductor** lets electricity flow through it. Metals are conductors.", "An electrical **insulator** does not. Plastic, rubber, wood and glass are insulators.")),
    EB("lab", "Conductors and insulators",
      SS("A copper wire completes the circuit and the bulb lights. Copper is a conductor.", S("Copper conducts.", ["c", "🔋", 20, 60, 3, "none"], ["m", "🔩", 50, 60, 3, "none"], ["b", "💡", 80, 45, 3, "pulse"])),
      SS("A wooden spoon is put in the gap instead. The bulb stays off, because wood is an insulator.", S("Wood does not conduct.", ["c", "🔋", 20, 60, 3, "none"], ["m", "🥄", 50, 60, 3, "none"], ["b", "🌑", 80, 45, 3, "none"]))),
    CHK(mc("Which of these is an electrical conductor?", "A copper wire", ["A rubber band", "A wooden spoon"], { hint: "Think about metals.", why: "Metals such as copper are good conductors." })),
    H("Stop 2: Test materials fairly"),
    SAY("Now you can test materials yourself. This is a comparative test, which means we compare different things. To make the test fair, we change only the material. Everything else stays the same: the same cell, the same bulb and the same wires. If the bulb lights, the material in the gap is a conductor. Use a battery-powered kit, never the mains.", MAN("Conductor or insulator?", "Put conductors in one group and insulators in the other.", "🔌", 8, ["Conductor", "Insulator"])),
    ACT("Conductor test", ["A cell, a bulb and wires, or a circuit kit", "Objects such as a paperclip, a coin, a pencil, a rubber, a key and a plastic spoon", "A grown-up"], ["Build a circuit with a gap. Check that the bulb lights when you close the gap with a wire.", "Place each object in the gap, one at a time. Write down whether the bulb lights.", "Sort the objects into conductors and insulators. What do the conductors have in common?"]),
    CHK(ms("Which two of these are electrical insulators?", ["Plastic", "Rubber"], ["Copper", "Iron"], { hint: "They cover wires.", why: "Plastic and rubber do not let electricity flow, so they are insulators." })),
    SAY("Remember. Metals conduct electricity. Plastic, rubber, wood and glass are insulators.", SUM("Conductors let electricity flow", "Insulators do not let electricity flow", "A fair test changes only the material")),
    GLOSS({ conductor: "A material that lets electricity flow through it easily.", insulator: "A material that does not let electricity flow through it.", metals: "Shiny, hard materials such as copper and iron.", "fair test": "A test where only one thing is changed." }),
  ],
  mini: [
    mc("Why are wires covered in plastic?", "Plastic is an insulator, so it keeps us safe", ["Plastic is a conductor", "Plastic is heavier"], { hint: "It stops electricity escaping.", why: "Plastic is an insulator, so it stops electricity reaching people." }),
    tf("Metals are good electrical conductors.", true, { hint: "Think about copper wire.", why: "Metals let electricity flow through them easily." }),
    mat("Match each material to its type.", [["Copper", "Conductor"], ["Rubber", "Insulator"], ["Iron", "Conductor"]], { hint: "Metals are conductors.", why: "Copper and iron are conductors. Rubber is an insulator." }),
  ],
};

const build = {
  id: "build", kind: "play", title: "Build and fix circuits",
  blocks: [
    H("Stop 1: Add more to the circuit"),
    SAY("What happens if you add more bulbs or more cells? More bulbs sharing one cell each shine more dimly. More cells make the bulb shine more brightly, because there is more energy. A buzzer in the loop makes a sound instead of light, and a motor makes something spin. Different components turn electrical energy into different things.", T("More cells make a bulb **brighter**.", "More bulbs on one cell make each bulb **dimmer**.")),
    EB("lab", "Changing a circuit",
      SS("One cell and one bulb. The bulb shines at normal brightness.", S("One cell, one bulb.", ["c", "🔋", 25, 60, 3, "none"], ["b", "💡", 75, 45, 3, "pulse"])),
      SS("Two cells and one bulb. The bulb is brighter, because there is more energy.", S("More cells: brighter.", ["c", "🔋", 25, 60, 3, "none"], ["d", "🔋", 45, 60, 3, "none"], ["b", "🌟", 78, 45, 3, "pulse"])),
      SS("One cell and two bulbs. Each bulb is dimmer, because they share the energy.", S("More bulbs: dimmer.", ["c", "🔋", 20, 60, 3, "none"], ["b", "💡", 55, 45, 2, "float"], ["e", "💡", 80, 45, 2, "float"]))),
    CHK(mc("What happens to a bulb if you add a second cell?", "It shines more brightly", ["It goes out", "It shines more dimly"], { hint: "More energy.", why: "More cells give more energy, so the bulb is brighter." })),
    H("Stop 2: Brain game"),
    SAY("Time for a game, then see if you can fix a broken circuit.", BRAIN("memory_match", "Circuit parts", "Find the matching pairs.", ["🔋", "💡", "🔘", "🔔"])),
    CHK(ord("A bulb will not light. Put the fixes in a sensible order.", ["Check that the switch is closed", "Check the wires are joined", "Check the cell has energy"], { hint: "Start with the easiest check.", why: "Checking the switch, then the wires, then the cell is a sensible way to find the fault." })),
    SAY("Remember. More cells make a bulb brighter, and more bulbs make each one dimmer.", SUM("More cells make a bulb brighter", "More bulbs on one cell make each dimmer", "Check switch, wires and cell to fix a faulty circuit")),
    GLOSS({ components: "The parts in a circuit, such as bulbs and buzzers.", brighter: "Giving out more light.", dimmer: "Giving out less light.", faulty: "Not working properly." }),
  ],
  mini: [
    tf("Adding a second cell makes a bulb dimmer.", false, { hint: "More energy.", why: "More cells make a bulb brighter." }),
    mc("A buzzer in a circuit makes...", "Sound", ["Light", "Cold"], { hint: "Think of a doorbell.", why: "A buzzer turns electrical energy into sound." }),
    ms("Pick two components that could be in a circuit.", ["A bulb", "A buzzer"], ["A pencil", "A stone"], { hint: "They use electricity.", why: "Bulbs and buzzers are components that use electrical energy." }),
  ],
};

const safety = {
  id: "safety", kind: "use", title: "Staying safe with electricity",
  blocks: [
    H("Stop 1: Mains electricity"),
    SAY("The electricity in our homes comes from the mains. It is much stronger than the electricity in a small cell, and it can hurt or even kill. Never play with plugs, sockets or wires, and never poke anything into a socket. Water is a good conductor, so never touch electrical things with wet hands. Never fly a kite near pylons or overhead power lines. If someone is in danger, do not touch them. Switch off the power if it is safe, or call a grown-up for help.", T("**Mains** electricity is strong and can be dangerous.", "Water conducts electricity, so keep electrical things away from it.")),
    SAY("Sockets, plugs and wet hands do not mix with electricity.", IMG("🔌 💧 ⚡", "Plugs, sockets and wet hands are dangerous together.")),
    CHK(mc("Why should you never touch a plug with wet hands?", "Water conducts electricity", ["Water is an insulator", "Plugs are heavy"], { hint: "Think about conductors.", why: "Water is a good conductor, so electricity could flow through you." })),
    H("Stop 2: Using electricity wisely"),
    SAY("Electricity costs money and often comes from burning fuels, which can harm the environment. So we should use it wisely. We should switch off lights and fans when we leave a room, and unplug chargers we are not using. We can also use energy saving LED bulbs. In Pakistan, where power cuts can happen, saving electricity helps the whole family. Make a plan for your home.", ACT("My energy saving plan", ["Paper and pencil", "A grown-up"], ["Walk around your home. List five things that use electricity.", "For each one, write how we could save electricity.", "Choose one change to try for a week and tell your family."])),
    SAY("Switching off lights and fans when no one is using them saves energy.", IMG("💡 🌀 🔌", "Switching things off saves electricity.")),
    CHK(tf("It is a good idea to leave lights on in empty rooms.", false, { hint: "Think about wasting energy.", why: "Switching off lights in empty rooms saves electricity." })),
    SAY("Remember. Mains electricity is dangerous, so stay safe, and save electricity.", SUM("Mains electricity can be dangerous", "Water conducts electricity, so keep away from it", "Switch things off to save electricity")),
    GLOSS({ mains: "The strong electricity supply that comes into our homes.", socket: "The place on a wall where you plug something in.", pylons: "Tall towers that carry power lines.", wisely: "In a sensible way that does not waste." }),
  ],
  mini: [
    mc("What should you do if you see a fallen power line?", "Stay far away and tell a grown-up", ["Pick it up", "Touch it with a stick"], { hint: "Keep safe.", why: "Never go near a fallen power line. Tell an adult straight away." }),
    ms("Pick two ways to save electricity.", ["Switch off lights you do not need", "Unplug unused chargers"], ["Leave fans on all night", "Keep every light on"], { hint: "Think about waste.", why: "Switching off and unplugging saves electricity." }),
    tf("It is safe to put a metal object into a socket.", false, { hint: "Metal conducts.", why: "Putting anything into a socket is very dangerous." }),
  ],
};

const ALTS = [
  [mc("A lamp is plugged in but is off. The switch is open. Why is it off?", "The open switch makes a gap in the circuit", ["The bulb is too bright", "The wire is made of plastic"], { hint: "Think about a gap.", why: "An open switch breaks the circuit, so electricity cannot flow." }), mc("Which part of a circuit supplies the energy?", "The cell", ["The wire", "The switch"], { hint: "It is the power source.", why: "The cell supplies electrical energy to the circuit." })],
  [tf("A bulb will light if the circuit has a gap in it.", false, { hint: "Electricity needs a loop.", why: "A gap stops electricity flowing, so the bulb stays off." }), tf("A circuit must be a complete loop for a bulb to light.", true, { hint: "No gaps.", why: "Electricity flows only around a complete circuit." })],
  [mat("Link each part of a circuit to its symbol picture.", [["Cell", "🔋"], ["Bulb", "💡"], ["Buzzer", "🔔"]], { hint: "Match the part with its picture.", why: "The battery is the cell, the lamp is the bulb and the bell is the buzzer." }), mat("Link each material to its type.", [["Aluminium", "Conductor"], ["Glass", "Insulator"], ["Wood", "Insulator"]], { hint: "Metals conduct.", why: "Aluminium is a conductor. Glass and wood are insulators." })],
  [ms("Pick two materials that are conductors.", ["Copper", "Iron"], ["Plastic", "Wood"], { hint: "Metals.", why: "Copper and iron are metals, so they are conductors." }), ms("Pick two safe things to do with electricity.", ["Dry your hands first", "Tell an adult about a damaged wire"], ["Poke a key into a socket", "Fly a kite near pylons"], { hint: "Keep safe.", why: "Dry hands and telling an adult keep you safe." })],
  [hot("Tap the thing that would NOT let electricity flow.", [["🔩", "Iron nail", 22, 50], ["🥄", "Wooden spoon", 50, 50], ["🪙", "Coin", 78, 50]], ["Wooden spoon"], { labels: true, hint: "Not a metal.", why: "Wood is an insulator." }), hot("Tap the object that is an electrical conductor.", [["🧴", "Plastic bottle", 22, 50], ["🔑", "Metal key", 50, 50], ["🪵", "Wood block", 78, 50]], ["Metal key"], { labels: true, hint: "Shiny metal.", why: "A metal key is a conductor." })],
  [st("What is the word for a material that lets electricity flow through it?", ["conductor"], { hint: "It starts with c.", why: "A conductor lets electricity flow through it." }), st("What is the word for a material that does not let electricity flow through it?", ["insulator"], { hint: "It starts with i.", why: "An insulator does not let electricity flow." })],
  [mc("Ali tests a paperclip, a rubber and a coin in a circuit. Which will make the bulb light?", "The paperclip and the coin", ["The rubber", "None of them"], { hint: "Metals conduct.", why: "The paperclip and the coin are metals, so they conduct." }), mc("Ali wants the test to be fair. What should he keep the same?", "The cell, the bulb and the wires", ["The material in the gap", "The shape of the room"], { hint: "Only change one thing.", why: "In a fair test, only the material changes." })],
  [fill("Finish the sentences about circuits.", "A circuit must be {b1}. A {b2} opens or closes it.", [["complete", "broken", "wet"], ["switch", "pencil", "wall"]], { hint: "Two key ideas.", why: "A circuit must be complete, and a switch opens or closes it." }), fill("Finish the sentences about conductors.", "Metals are good {b1}. Plastic is an {b2}.", [["conductors", "insulators", "shadows"], ["insulator", "conductor", "energy"]], { hint: "Metals let electricity through.", why: "Metals are conductors, and plastic is an insulator." })],
  [num("A torch uses 3 cells. How many cells do 4 torches use?", 12, { hint: "3 times 4.", why: "3 x 4 = 12 cells." }), num("A circuit kit has 5 bulbs in each box. How many bulbs are in 6 boxes?", 30, { hint: "5 times 6.", why: "5 x 6 = 30 bulbs." })],
  [sld("How many cells make a bulb brightest? Slide to show it: one, two or three cells.", { min: 0, max: 5, unit: "cells" }, 3, 0, { hint: "More cells, more energy.", why: "Three cells give the most energy, so the bulb is brightest." }), sld("A torch has 2 cells. Slide to show how many cells it has.", { min: 0, max: 5, unit: "cells" }, 2, 0, { hint: "Count them.", why: "The torch has 2 cells." })],
  [ord("Put these in order to build a circuit.", ["Join the cell to the bulb with wire", "Add a switch to the loop", "Close the switch", "The bulb lights"], { hint: "Build, then switch on.", why: "Build the loop, add the switch, close it and the bulb lights." }), ord("Put these in order for testing a material.", ["Make a circuit with a gap", "Put the material in the gap", "Watch the bulb", "Record the result"], { hint: "Set up, test, observe, record.", why: "A test is set up first, then run, then observed and recorded." })],
  [mc("Sara says a plastic spoon will complete a circuit. Why is she wrong?", "Plastic is an insulator and will not let electricity flow", ["Plastic is a metal", "Plastic is too cold"], { hint: "Think about insulators.", why: "Plastic is an insulator, so the circuit stays incomplete." }), mc("Omar says all metals are insulators. Why is he wrong?", "Metals are conductors and let electricity flow", ["Metals are made of plastic", "Metals have no particles"], { hint: "Think about copper wire.", why: "Metals are good conductors of electricity." })],
  [mc("What is the job of the metal inside a wire, and of the plastic around it?", "Metal carries the electricity and plastic keeps us safe", ["Metal is an insulator", "Plastic is a conductor"], { hint: "One conducts, one insulates.", why: "The metal centre conducts electricity. The plastic is an insulator that protects us." }), mc("Why do electricians wear rubber gloves and boots?", "Rubber is an insulator and protects them", ["Rubber conducts electricity", "Rubber is brighter"], { hint: "Insulators stop the flow.", why: "Rubber is an insulator, so electricity does not flow through the person." })],
  [mc("Hana adds three bulbs to one cell. What happens to the brightness of each bulb?", "Each bulb is dimmer", ["Each bulb is brighter", "They are all the same"], { hint: "They share the energy.", why: "More bulbs on one cell share the energy, so each is dimmer." }), mc("Yusuf adds a second cell to a circuit. What should happen to a bulb?", "It should shine more brightly", ["It should go out", "It should be dimmer"], { hint: "More energy.", why: "More cells give more energy, so the bulb is brighter." })],
  [mc("What is the danger of switching on a lamp with dripping wet hands?", "Water conducts electricity and could carry it to you", ["Water insulates the switch", "Wet hands make the bulb brighter"], { hint: "Water is a conductor.", why: "Water conducts electricity, so it can carry a shock to you." }), mc("Why should you never fly a kite near pylons?", "The string could conduct electricity to you", ["Pylons are too small", "Pylons make kites heavy"], { hint: "Think about the string.", why: "A damp string can conduct electricity from the power lines to you." })],
];

export const topics = [
  topicLesson({
    slug: "science-class-4-electricity", subject: "science", cls: 4, topic: 5, title: "Electricity",
    summary: "Build complete circuits, test conductors and insulators fairly, and stay safe around electricity.",
    unit: "Topic 5: Electricity", difficulty: 2,
    objectives: ["Describe a complete circuit and its parts", "Explain how a switch works", "Sort conductors and insulators using a fair test", "Describe how to stay safe with electricity"],
    success_criteria: ["I can say why a bulb will or will not light", "I can say what a switch does", "I can sort conductors and insulators", "I can explain how to stay safe with electricity"],
    real_life: "Switching on a light, plugging in a charger safely and saving electricity at home.",
    standards: [NC("Y4 electricity", "Identify common appliances that run on electricity; construct a series circuit; recognise a switch, conductors and insulators"), ...CAM("4Pe.01", "4Pe.02", "4Pe.03", "4Pe.04")],
    warm_up: [
      mc("What is the name for how high or low a sound is?", "Pitch", ["Volume", "Echo"], { hint: "It is not about loudness.", why: "Pitch is how high or low a sound is." }),
      tf("Sound can travel through a vacuum.", false, { hint: "No particles.", why: "Sound needs particles to travel." }),
      mc("Which is a form of energy?", "Light", ["Rock", "Plastic"], { hint: "Think about what energy can do.", why: "Light is a form of energy." }),
    ],
    intro: [
      H("Welcome back, young scientist!"),
      SAY("Welcome back, young scientist! Today's big question is: how does electricity flow, and how do we use it safely? By the end, you will build a circuit in your mind, sort conductors and insulators, and explain how to stay safe. Let's go!", T("Today's big question: how does electricity flow?", "We will also learn to stay safe.")),
      IMG("🔋💡🔘", "Electricity is all around us."),
      GLOSS({ electricity: "A form of energy that flows around a circuit." }),
    ],
    subs: [circuit, conduct, build, safety],
    quiz: [
      Q("circuit", "recall", "elec.switch", mc("A bulb is off because a switch is open. Why?", "The open switch makes a gap in the circuit", ["The bulb is too bright", "The wire is made of plastic"], { hint: "Think about a gap.", why: "An open switch breaks the circuit, so electricity cannot flow." }), ...ALTS[0]),
      Q("circuit", "recall", "elec.complete", tf("A bulb will light if the circuit has a gap.", false, { hint: "Electricity needs a loop.", why: "A gap stops the electricity flowing, so the bulb stays off." }), ...ALTS[1]),
      Q("circuit", "recall", "elec.parts", mat("Match each part of a circuit to its picture.", [["Cell", "🔋"], ["Bulb", "💡"], ["Buzzer", "🔔"]], { hint: "Match the part to its picture.", why: "The battery is the cell, the lamp is the bulb and the bell is the buzzer." }), ...ALTS[2]),
      Q("conduct", "apply", "elec.conductors", ms("Which two of these are electrical conductors?", ["Copper", "Iron"], ["Plastic", "Wood"], { hint: "Metals.", why: "Copper and iron are metals, so they are conductors." }), ...ALTS[3]),
      Q("conduct", "apply", "elec.sort", hot("Tap the object that is an electrical insulator.", [["🔩", "Iron nail", 22, 50], ["🥄", "Wooden spoon", 50, 50], ["🪙", "Coin", 78, 50]], ["Wooden spoon"], { labels: true, hint: "Not a metal.", why: "Wood is an insulator." }), ...ALTS[4]),
      Q("conduct", "recall", "elec.words", st("Write the word for a material that lets electricity flow through it.", ["conductor"], { hint: "It starts with c.", why: "A conductor lets electricity flow through it." }), ...ALTS[5]),
      Q("conduct", "apply", "elec.test", mc("Aisha tests a paperclip, a rubber and a coin in a circuit. Which makes the bulb light?", "The paperclip and the coin", ["The rubber", "None of them"], { hint: "Metals conduct.", why: "The paperclip and the coin are metals, so they conduct." }), ...ALTS[6]),
      Q("circuit", "apply", "elec.fill", fill("Complete the sentences about circuits.", "A circuit must be {b1}. A {b2} opens or closes it.", [["complete", "broken", "wet"], ["switch", "pencil", "wall"]], { hint: "Two key ideas.", why: "A circuit must be complete, and a switch opens or closes it." }), ...ALTS[7]),
      Q("build", "apply", "elec.maths", num("A torch uses 3 cells. How many cells do 5 torches use?", 15, { hint: "3 times 5.", why: "3 x 5 = 15 cells." }), ...ALTS[8]),
      Q("build", "apply", "elec.cells", sld("A bulb is brightest with the most cells. If you add one cell to two cells, how many cells are there?", { min: 0, max: 5, unit: "cells" }, 3, 0, { hint: "Two plus one.", why: "2 + 1 = 3 cells." }), ...ALTS[9]),
      Q("build", "apply", "elec.order", ord("Put these in order to light a bulb.", ["Join the cell to the bulb with wire", "Add a switch to the loop", "Close the switch", "The bulb lights"], { hint: "Build, then switch on.", why: "Build the loop, add the switch, close it and the bulb lights." }), ...ALTS[10]),
      Q("conduct", "reason", "elec.reason_plastic", mc("Zain says a plastic spoon will complete a circuit. Why is he wrong?", "Plastic is an insulator and will not let electricity flow", ["Plastic is a metal", "Plastic is too cold"], { hint: "Think about insulators.", why: "Plastic is an insulator, so the circuit stays incomplete." }), ...ALTS[11]),
      Q("conduct", "reason", "elec.reason_wires", mc("Why are electrical wires made of metal inside but covered in plastic?", "Metal conducts the electricity and plastic keeps us safe", ["Metal is an insulator", "Plastic is a conductor"], { hint: "One conducts, one insulates.", why: "The metal centre conducts electricity. The plastic is an insulator that protects us." }), ...ALTS[12]),
      Q("build", "reason", "elec.reason_bulbs", mc("Hira adds three bulbs to one cell. What happens to the brightness of each bulb?", "Each bulb is dimmer", ["Each bulb is brighter", "They are all the same"], { hint: "They share the energy.", why: "More bulbs on one cell share the energy, so each is dimmer." }), ...ALTS[13]),
      Q("safety", "reason", "elec.reason_wet", mc("Why is it dangerous to touch a switch with wet hands?", "Water conducts electricity and could carry it to you", ["Water insulates the switch", "Wet hands make the bulb brighter"], { hint: "Water is a conductor.", why: "Water conducts electricity, so it can carry a shock to you." }), ...ALTS[14]),
    ],
  }),
];
