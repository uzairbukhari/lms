import { SAY, SS, H, T, IMG, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, BAR, TABLE, mc, ms, tf, num, ord, mat, fill, hot, sld, st, PHOTO } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC, PK, CAM } from "./_science-kit.mjs";

// Science Class 4, topic 3: Materials, states of matter (Fatima, age 9). Enquiry type: fair test.

const STEAM = "science-class-4-materials-1-423b2705.jpg";
const ICE = "science-class-4-materials-2-f98b752a.jpg";
const DROPS = "science-class-4-materials-3-856583d1.jpg";

const states = {
  id: "states", kind: "learn", title: "Solids, liquids and gases",
  blocks: [
    H("Welcome back, young scientist!"),
    SAY("Today we explore what things are made of and what happens when we heat them.", T("Today's big question: what happens when materials are heated or cooled?")),
    SAY("A pot of hot water gives off steam. Steam is water in the gas state.", PHOTO(STEAM, "A boiling pot with steam rising from under its lid", "Hot water gives off steam, which is a gas.", "Photo by Sergio Camalich on Unsplash")),
    H("Stop 1: Three states of matter"),
    SAY("All materials are made of tiny pieces called particles. How the particles are arranged decides whether a material is a solid, a liquid or a gas. In a solid, the particles are packed tightly in fixed places, so a solid keeps its shape. In a liquid, the particles are close but slide past each other. So a liquid flows and takes the shape of its container. In a gas, the particles are far apart and move everywhere. So a gas spreads out to fill any space. Watch the particles.", T("A **solid** keeps its shape. A **liquid** flows. A **gas** spreads out.", "They are made of tiny **particles**, arranged in different ways.")),
    EB("lab", "Particles in three states",
      SS("In a solid, such as ice, the particles are packed tightly in a neat pattern. They can only wobble in place.", S("Solid: packed tightly.", ["a", "🧊", 50, 50, 3, "none"], ["b", "🔹", 30, 70, 1, "pulse"], ["c", "🔹", 40, 70, 1, "pulse"], ["d", "🔹", 50, 70, 1, "pulse"], ["e", "🔹", 60, 70, 1, "pulse"], ["f", "🔹", 70, 70, 1, "pulse"])),
      SS("In a liquid, such as water, the particles are close together but can slide around, so water pours.", S("Liquid: sliding past each other.", ["a", "💧", 50, 40, 3, "bounce"], ["b", "🔹", 35, 72, 1, "float"], ["c", "🔹", 50, 75, 1, "float"], ["d", "🔹", 65, 70, 1, "float"])),
      SS("In a gas, such as steam, the particles are far apart and fly in all directions. A gas fills the whole space.", S("Gas: far apart and moving fast.", ["a", "☁️", 50, 30, 3, "float"], ["b", "🔹", 20, 60, 1, "bounce"], ["c", "🔹", 80, 25, 1, "bounce"], ["d", "🔹", 70, 75, 1, "bounce"]))),
    CHK(mc("Which state of matter keeps its own shape?", "Solid", ["Liquid", "Gas"], { hint: "The particles are packed tightly.", why: "A solid keeps its shape because its particles are fixed in place." })),
    H("Stop 2: Sorting materials"),
    SAY("Ice is a solid. Its particles are packed tightly, so it keeps its shape.", PHOTO(ICE, "Clear ice cubes with tiny bubbles", "Ice is water in the solid state.", "Photo by Giorgio Trovato on Unsplash")),
    SAY("Now think about everyday materials. A wooden desk is a solid. Milk is a liquid. The air inside a balloon is a gas. Some materials are tricky, like sand. It pours like a liquid, but each grain is a tiny solid. Let's sort.", IMG("🪑 🥛 🎈", "A desk is a solid, milk is a liquid and the air in a balloon is a gas.")),
    CHK(mc("Which is a gas?", "The air in a balloon", ["Milk", "A desk"], { hint: "It fills the whole balloon.", why: "Air is a gas. It spreads out to fill the balloon." })),
    SAY("Remember. Solids, liquids and gases differ in how their particles are arranged.", SUM("Solid: particles packed tightly; keeps its shape", "Liquid: particles slide past each other; flows", "Gas: particles far apart; spreads out")),
    GLOSS({ "states of matter": "The three forms of matter: solid, liquid and gas.", particles: "The tiny pieces that all materials are made of.", solid: "A material that keeps its own shape.", liquid: "A material that flows and takes the shape of its container.", gas: "A material that spreads out to fill any space.", container: "Something that holds a material, like a jar." }),
  ],
  mini: [
    mat("Match each material to its state.", [["Ice", "Solid"], ["Milk", "Liquid"], ["Steam", "Gas"]], { hint: "Think about how it behaves.", why: "Ice is a solid, milk is a liquid and steam is a gas." }),
    tf("A gas can be poured and keeps its volume.", false, { hint: "Gases spread out.", why: "A gas spreads out to fill any container." }),
    mc("In which state are the particles furthest apart?", "Gas", ["Solid", "Liquid"], { hint: "It spreads out.", why: "Gas particles are far apart." }),
    ms("Pick two features of a solid.", ["Keeps its shape", "Particles packed tightly"], ["Flows easily", "Spreads out to fill a room"], { hint: "Think about ice.", why: "A solid keeps its shape and has tightly packed particles." }),
  ],
};

const heating = {
  id: "heating", kind: "try", title: "Melting, boiling and freezing",
  blocks: [
    H("Stop 1: Changes of state"),
    SAY("When we heat or cool a material, it can change state. Heating ice makes it melt into water. Heating water makes it boil into steam. Cooling steam makes it condense back into water, and cooling water makes it freeze into ice. Each change happens at a particular temperature. Water melts at zero degrees Celsius and boils at one hundred. Watch what happens as we heat ice.", T("**Melting** is solid to liquid. **Freezing** is liquid to solid.", "**Boiling** is liquid to gas. **Condensing** is gas to liquid.")),
    EB("lab", "Heating ice",
      SS("Ice is a solid at minus five degrees. The particles are packed tightly.", S("Ice at -5 °C.", ["t", { kind: "thermometer", value: -5, from: -10, to: 110 }, 30, 52, 3, "none"], ["i", "🧊", 70, 55, 3, "none"])),
      SS("At zero degrees, the ice melts into water.", S("Melting point: 0 °C.", ["t", { kind: "thermometer", value: 0, from: -10, to: 110 }, 30, 52, 3, "none"], ["i", "💧", 70, 55, 3, "pulse"])),
      SS("At one hundred degrees, the water boils and becomes steam, a gas.", S("Boiling point: 100 °C.", ["t", { kind: "thermometer", value: 100, from: -10, to: 110 }, 30, 52, 3, "none"], ["i", "♨️", 70, 50, 3, "float"]))),
    CHK(mc("At what temperature does water boil?", "100 °C", ["0 °C", "50 °C"], { hint: "It is the top of our thermometer.", why: "Water boils at 100 degrees Celsius." })),
    H("Stop 2: A fair test"),
    SAY("Scientists use fair tests to find answers. In a fair test we change only one thing, the independent variable. We measure what happens, the dependent variable. And we keep everything else the same. Let's test which ice cube melts fastest. We change only where the ice sits: in the sun or in the shade.", MAN("Plan a fair test", "Sort the factors. What do we change? What do we keep the same?", "🧊", 6, ["Change", "Keep the same"])),
    ACT("Which melts fastest?", ["Two ice cubes the same size", "Two saucers", "A timer", "A sunny spot and a shady spot", "A grown-up"], ["Put one ice cube in the sun and one in the shade. Use the same size of ice and the same saucers.", "Start the timer. Look every five minutes.", "Write down how long each takes to melt. Which melted faster? Why do you think so?"]),
    CHK(mc("In our ice test we change where the ice sits. What should stay the same?", "The size of the ice cube", ["The place", "The time it melts"], { hint: "Only one thing should change.", why: "To keep a test fair, everything but the one changed variable must stay the same." })),
    SAY("Remember. Heating and cooling change states. A fair test changes one thing.", SUM("Melting, freezing, boiling and condensing are changes of state", "Water melts at 0 °C and boils at 100 °C", "In a fair test, change one thing and keep the rest the same")),
    GLOSS({ melting: "Changing from solid to liquid.", freezing: "Changing from liquid to solid.", boiling: "Changing from liquid to gas, with bubbles.", condensing: "Changing from gas to liquid.", "fair test": "A test where only one thing is changed.", variable: "Something that can change in a test." }),
  ],
  mini: [
    ord("Put these in order as ice is heated.", ["Ice", "Water", "Steam"], { hint: "Heat it up step by step.", why: "Ice melts into water and boils into steam." }),
    mat("Match each change to its meaning.", [["Melting", "Solid to liquid"], ["Boiling", "Liquid to gas"], ["Freezing", "Liquid to solid"]], { hint: "Think about the states.", why: "Each change moves between two states." }),
    tf("Water freezes at 0 °C.", true, { hint: "Same as the melting point.", why: "Water freezes and ice melts at 0 °C." }),
  ],
};

const cycle = {
  id: "cycle", kind: "play", title: "Evaporation and the water cycle",
  blocks: [
    H("Stop 1: Water goes up and comes down"),
    SAY("Look at the droplets. Water vapour cooled on cold glass and condensed into liquid.", PHOTO(DROPS, "Water droplets on a window pane", "Droplets form when water vapour cools.", "Photo by Dmitry Tomashek on Unsplash")),
    SAY("Water does not only change state when it boils. Puddles dry up on a warm day, even though they never boil. This is evaporation. Water on the surface slowly turns into an invisible gas called water vapour, and rises. High up, it is cold. The vapour condenses into tiny droplets that form clouds. When the droplets get heavy, they fall as rain. The rain flows back to rivers and seas. This loop is the water cycle.", T("**Evaporation** is when liquid slowly becomes a gas. **Condensation** is when a gas cools into liquid.", "Together they make the **water cycle**.")),
    EB("sea", "The water cycle",
      SS("The Sun warms the sea. Water evaporates and rises as invisible water vapour.", S("Evaporation.", ["s", "☀️", 80, 15, 3, "pulse"], ["w", "🌊", 25, 78, 3, "none"], ["v", "💨", 25, 50, 2, "float"])),
      SS("High up, it is cold. The vapour condenses into droplets that form clouds.", S("Condensation: clouds form.", ["w", "🌊", 25, 78, 3, "none"], ["c", "☁️", 50, 22, 3, "float"])),
      SS("The droplets grow heavy and fall as rain. The rain runs down mountains into rivers and back to the sea.", S("Precipitation: rain falls.", ["w", "🌊", 25, 78, 3, "none"], ["c", "☁️", 50, 22, 3, "none"], ["r", "🌧️", 50, 50, 3, "bounce"], ["m", "⛰️", 75, 72, 3, "none"]))),
    CHK(ord("Put the water cycle in order.", ["Evaporation", "Condensation", "Rain"], { hint: "Water rises first.", why: "Water evaporates, condenses into clouds and then falls as rain." })),
    H("Stop 2: Brain game"),
    SAY("Warm up your memory first, then work out what makes puddles dry up faster.", BRAIN("memory_match", "Water cycle pairs", "Find the matching pairs.", ["☀️", "☁️", "🌧️", "🌊"])),
    CHK(mc("On which day will a wet towel dry fastest?", "A hot, windy day", ["A cold, still day", "A cool, damp day"], { hint: "Heat and wind help water evaporate.", why: "Warmth and moving air make evaporation faster." })),
    SAY("Remember. Evaporation lifts water into the air. Condensation turns it back into droplets.", SUM("Evaporation: liquid slowly becomes a gas", "Condensation: gas cools into liquid", "These make the water cycle")),
    GLOSS({ evaporation: "When a liquid slowly turns into a gas.", condensation: "When a gas cools and becomes a liquid.", "water cycle": "The way water moves between the sea, the air and the land.", "water vapour": "Water as an invisible gas in the air." }),
  ],
  mini: [
    tf("Puddles can dry up without boiling.", true, { hint: "That is evaporation.", why: "Evaporation happens below boiling point." }),
    mc("What forms clouds?", "Condensing water vapour", ["Boiling rock", "Wind alone"], { hint: "Gas cooling into droplets.", why: "Water vapour condenses into tiny droplets in the cold air." }),
    mat("Match each word to its meaning.", [["Evaporation", "Liquid becomes gas"], ["Condensation", "Gas becomes liquid"], ["Rain", "Water falling from clouds"]], { hint: "Think about the cycle.", why: "Each word describes a step in the water cycle." }),
  ],
};

const dissolving = {
  id: "dissolving", kind: "use", title: "Dissolving and separating",
  blocks: [
    H("Stop 1: Dissolving"),
    SAY("When you stir sugar into tea, it seems to disappear. This is called dissolving. The sugar breaks into tiny particles that mix evenly with the water. Sugar is soluble, which means it can dissolve. The mixture is a solution. Sand does not dissolve, so it is insoluble. Heat helps many solids dissolve faster. Watch sugar dissolve.", T("A **soluble** solid dissolves in a liquid to make a **solution**.", "An **insoluble** solid does not dissolve.")),
    EB("kitchen", "Sugar dissolves",
      SS("A spoon of sugar goes into a glass of water. We can see the grains.", S("Sugar in water.", ["g", "🥛", 50, 58, 3, "none"], ["s", "🍬", 50, 20, 2, "bounce"])),
      SS("We stir. The grains get smaller and smaller until we cannot see them.", S("Stirring.", ["g", "🥛", 50, 58, 3, "pulse"], ["sp", "🥄", 70, 40, 2, "bounce"])),
      SS("The sugar has dissolved. It is still there, as tiny particles spread through the water. The water tastes sweet.", S("A sugar solution.", ["g", "🥛", 50, 58, 3, "none"], ["h", "😋", 80, 25, 2, "bounce"]))),
    CHK(mc("Which of these is soluble in water?", "Sugar", ["Sand", "Pebbles"], { hint: "It disappears when you stir.", why: "Sugar dissolves in water. Sand and pebbles do not." })),
    H("Stop 2: Separating mixtures"),
    SAY("We can get a mixture apart again. To separate sand from water, we filter. Pour the mixture through filter paper. The water passes through but the sand is left behind. To get dissolved salt back, we leave salt water in the sun and let the water evaporate. The salt is left behind. This is how salt is collected from the sea in some countries, including Pakistan's Sindh coast.", T("**Filtering** separates a solid that has not dissolved from a liquid.", "**Evaporating** gets a dissolved solid back from a solution.")),
    ACT("Sort it out", ["Sand", "Salt", "Water", "Two glasses", "Coffee filter paper", "A grown-up"], ["Stir sand into one glass and salt into the other.", "Which dissolved and which did not? Filter both mixtures through filter paper into clean glasses.", "Leave the filtered liquids in the sun for a day. What is left behind?"]),
    IMG("🧂 🏖️ 🧪", "Salt, sand and a filter test."),
    CHK(mc("How can you separate sand from water?", "Filter it", ["Stir it", "Freeze it"], { hint: "The sand is too big to go through the paper.", why: "Filter paper lets water through but holds back the sand." })),
    SAY("Remember. Soluble things dissolve to make a solution. Filtering and evaporating separate mixtures.", SUM("Soluble solids dissolve; insoluble solids do not", "Filtering removes solids that have not dissolved", "Evaporating gets dissolved solids back")),
    GLOSS({ soluble: "Able to dissolve in a liquid.", insoluble: "Not able to dissolve.", solution: "A liquid with a solid dissolved in it.", filtering: "Passing a mixture through paper to catch the solid.", evaporating: "Letting the liquid turn to gas so the solid is left." }),
  ],
  mini: [
    mat("Match each to its word.", [["Dissolves in water", "Soluble"], ["Does not dissolve", "Insoluble"], ["Sugar and water", "Solution"]], { hint: "Think about the names.", why: "Soluble things dissolve; insoluble ones do not; a solution is the mixture." }),
    mc("Which is best for getting salt out of salt water?", "Evaporating the water", ["Filtering", "Freezing"], { hint: "The salt is dissolved.", why: "Filtering cannot remove dissolved salt, but evaporating can." }),
    tf("A filter can separate dissolved sugar from water.", false, { hint: "Dissolved particles are tiny.", why: "Dissolved particles pass through filter paper." }),
    ms("Pick two things that are insoluble in water.", ["Sand", "Stones"], ["Sugar", "Salt"], { hint: "They do not disappear.", why: "Sand and stones do not dissolve." }),
  ],
};

const ALTS = [
  [mc("Which state of matter spreads out to fill any container?", "Gas", ["Solid", "Liquid"], { hint: "Particles far apart.", why: "A gas fills any space." }), mc("Which state of matter flows but keeps the same volume?", "Liquid", ["Solid", "Gas"], { hint: "Particles slide past each other.", why: "A liquid flows and takes the shape of its container." })],
  [tf("A liquid has a fixed shape.", false, { hint: "Water takes the shape of the glass.", why: "A liquid takes the shape of its container." }), tf("Gas particles are close together.", false, { hint: "Gases spread out.", why: "Gas particles are far apart." })],
  [ord("Put these changes in order as ice is warmed up.", ["Ice", "Water", "Steam"], { hint: "Heat it up step by step.", why: "Ice melts and then boils." }), ord("Order the water cycle, starting from the sea.", ["Evaporation", "Cloud formation", "Rain"], { hint: "Water rises first.", why: "Water evaporates, forms clouds and then falls as rain." })],
  [ms("Pick two things that are soluble in water.", ["Sugar", "Salt"], ["Sand", "Wood"], { hint: "They disappear when stirred.", why: "Sugar and salt dissolve in water." }), ms("Pick two ways to make a solid dissolve faster.", ["Stir it", "Use warmer water"], ["Use colder water", "Do not stir"], { hint: "Think about how you make tea.", why: "Stirring and heat speed up dissolving." })],
  [hot("Tap the gas.", [["🧊", "Ice", 22, 50], ["🎈", "Air in a balloon", 50, 50], ["🥛", "Milk", 78, 50]], ["Air in a balloon"], { labels: true, hint: "It spreads to fill the space.", why: "Air is a gas." }), hot("Tap the liquid.", [["🧊", "Ice", 22, 50], ["🎈", "Air in a balloon", 50, 50], ["🥛", "Milk", 78, 50]], ["Milk"], { labels: true, hint: "It flows.", why: "Milk is a liquid." })],
  [st("What is the word for a liquid slowly turning into a gas?", ["evaporation", "evaporating", "evaporate"], { hint: "It starts with e.", why: "Evaporation is a liquid slowly becoming a gas." }), st("What is the word for a solid that dissolves in a liquid?", ["soluble"], { hint: "It starts with s.", why: "A soluble solid can dissolve." })],
  [mat("Which change of state fits each description? Match them.", [["Freezing", "Liquid to solid"], ["Evaporation", "Liquid slowly to gas"], ["Condensation", "Gas to liquid"]], { hint: "Think about the states.", why: "Each change moves between two states." }), mat("Link each water cycle word to what happens.", [["Evaporation", "Water rises as vapour"], ["Condensation", "Vapour forms cloud droplets"], ["Rain", "Droplets fall"]], { hint: "Follow the cycle.", why: "Each word describes a step of the water cycle." })],
  [fill("Complete the sentences about water.", "Water freezes at {b1} °C and boils at {b2} °C.", [["0", "10", "50"], ["100", "50", "200"]], { hint: "The two key temperatures.", why: "Water freezes at 0 and boils at 100 degrees Celsius." }), fill("Complete the sentences about dissolving.", "Sugar is {b1} in water. When it dissolves it makes a {b2}.", [["soluble", "insoluble", "solid"], ["solution", "gas", "rock"]], { hint: "Think about stirring sugar in tea.", why: "Sugar is soluble and makes a solution." })],
  [num("A glass has 200 ml of water. 50 ml evaporates. How many millilitres are left?", 150, { hint: "200 minus 50.", why: "200 - 50 = 150." }), num("A bowl has 300 ml of salty water. 120 ml evaporates. How many millilitres are left?", 180, { hint: "300 minus 120.", why: "300 - 120 = 180." })],
  [sld("Slide to show the temperature at which water boils, in degrees Celsius.", { min: 0, max: 150, unit: "°C" }, 100, 0, { hint: "Top of the thermometer.", why: "Water boils at 100 degrees Celsius." }), sld("Slide to show the melting point of ice, in degrees Celsius.", { min: -20, max: 50, unit: "°C" }, 0, 0, { hint: "Same as the freezing point.", why: "Ice melts at 0 degrees Celsius." })],
  [ord("Put these steps in order to get salt from salt water.", ["Pour salt water in a dish", "Leave it in the sun", "Water evaporates", "Salt is left behind"], { hint: "Follow the process.", why: "The water evaporates and leaves the salt behind." }), ord("Put these steps of filtering in order.", ["Fold the filter paper", "Pour in the mixture", "Water passes through", "Sand is left behind"], { hint: "Follow the process.", why: "The water passes through and the sand is caught." })],
  [mc("Ali says that when sugar dissolves it disappears completely. Why is he wrong?", "It is still there as tiny particles in the water", ["It turns into water", "It melts away"], { hint: "What does the water taste like?", why: "The sugar is still in the water, as tiny particles." }), mc("Sara says a gas has no mass because we cannot see it. Why is she wrong?", "Gases are made of particles with mass", ["Gases are empty", "Gas does not exist"], { hint: "Particles have mass.", why: "Gases are made of particles. They have mass." })],
  [mc("Why does a puddle dry up faster on a warm, windy day?", "Warmth and wind speed up evaporation", ["Wind adds water", "Warmth freezes it"], { hint: "Think about evaporation.", why: "Heat and moving air make water evaporate faster." }), mc("Why do mirrors in a bathroom mist up after a hot shower?", "Warm water vapour condenses on the cool glass", ["The glass melts", "The shower makes a new gas"], { hint: "Gas cooling into liquid.", why: "Water vapour cools on the glass and condenses into droplets." })],
  [mc("Tom wants a fair test of which sugar dissolves fastest. Which is the best plan?", "Change only the water temperature and keep everything else the same", ["Change the sugar and the water together", "Use a different glass each time and different water"], { hint: "Change one thing.", why: "A fair test changes one variable and keeps the others the same." }), mc("Mia wants a fair test of which ice cube melts fastest in the sun or shade. Which is best?", "Use ice cubes of the same size and change only the place", ["Use big ice in the sun and small ice in the shade", "Use a different time for each"], { hint: "Change one thing.", why: "Only the place should change." })],
  [mc("Sara tries to get salt out of salty water by filtering. Why will it not work?", "The dissolved salt is made of tiny particles that pass through the paper", ["Salt is too big", "Filter paper is too thick"], { hint: "Dissolved particles are tiny.", why: "Dissolved particles pass through filter paper. Evaporating works instead." }), mc("Omar stirs sand into water and says it has dissolved because the water looks cloudy. Why is he wrong?", "The sand will settle again because it is insoluble", ["Sand always dissolves", "Cloudy water means a solution"], { hint: "Does sand disappear?", why: "Sand is insoluble. It settles back and can be filtered out." })],
];

const clip = {
  title: "A drop of water's journey", backdrop: "sea", caption: "Follow one drop through the water cycle.",
  scenes: [
    { caption: "A drop in the sea.", say: "This drop of water sits in the sea. It is a liquid.",
      items: [{ id: "w", emoji: "🌊", x: 50, y: 70, size: 3 }, { id: "d", emoji: "💧", label: "liquid", x: 50, y: 40, size: 2, anim: "bounce" }] },
    { caption: "The Sun warms it.", say: "The Sun warms the sea. Heat gives the particles more energy.",
      items: [{ id: "s", emoji: "☀️", x: 80, y: 15, size: 3, effect: "glow" }, { id: "w", emoji: "🌊", x: 40, y: 75, size: 3 }] },
    { caption: "Evaporation.", say: "The drop evaporates. It rises as invisible water vapour, a gas.",
      items: [{ id: "w", emoji: "🌊", x: 40, y: 78, size: 3 }, { id: "v", emoji: "💨", label: "water vapour", x: 50, y: 40, size: 3, anim: "float" }] },
    { caption: "High up it is cold.", say: "High in the sky, the air is cold. The vapour cools down.",
      items: [{ id: "v", emoji: "💨", x: 50, y: 50, size: 2, anim: "float" }, { id: "c", emoji: "🥶", label: "cold air", x: 75, y: 30, size: 2 }] },
    { caption: "Condensation.", say: "The vapour condenses into tiny droplets. They gather to make a cloud.",
      items: [{ id: "c", emoji: "☁️", label: "cloud", x: 50, y: 30, size: 3, effect: "sparkle" }] },
    { caption: "Rain falls.", say: "The droplets grow heavy and fall as rain. This is precipitation.",
      items: [{ id: "c", emoji: "☁️", x: 50, y: 22, size: 3 }, { id: "r", emoji: "🌧️", x: 50, y: 55, size: 3, anim: "bounce" }] },
    { caption: "Back to the sea.", say: "Rivers carry the rain back to the sea. The journey begins again.",
      items: [{ id: "m", emoji: "⛰️", x: 30, y: 65, size: 3 }, { id: "w", emoji: "🌊", x: 72, y: 78, size: 3 }] },
    { caption: "A cycle.", say: "Water never runs out. It keeps moving around the water cycle.",
      items: [{ id: "d", emoji: "💧", x: 30, y: 50, size: 3, anim: "bounce" }, { id: "h", emoji: "🔄", label: "water cycle", x: 70, y: 50, size: 3, anim: "pulse" }] },
  ],
};

export const topics = [
  topicLesson({
    slug: "science-class-4-materials", subject: "science", cls: 4, topic: 3, title: "Materials: States of Matter",
    summary: "Solids, liquids and gases, melting and boiling, evaporation and condensation, the water cycle, dissolving and separating.",
    unit: "Topic 3: Materials", difficulty: 2,
    objectives: ["Describe solids, liquids and gases using particles", "Explain melting, freezing, boiling, evaporation and condensation", "Describe the water cycle", "Dissolve and separate mixtures in a fair test"],
    success_criteria: ["I can describe the three states using particles", "I can name each change of state", "I can explain the water cycle", "I can plan a fair test and separate a mixture"],
    real_life: "Making tea, drying washing, a misty bathroom mirror and salt from the sea.",
    standards: [NC("Y4 states of matter", "Compare and group materials as solids, liquids or gases; observe that some materials change state when heated or cooled; identify the part played by evaporation and condensation in the water cycle"), NC("Y5 properties and changes", "Know that some materials dissolve in liquid to form a solution; use filtering and evaporating to separate mixtures"), PK("S-04-B-02"), ...CAM("4Cm.01", "4Cm.02", "4Cm.03", "4Cp.01", "4Cp.02", "4Cc.01", "4Cc.02", "4Cc.03")],
    warm_up: [
      mc("Which part of the digestive system absorbs nutrients?", "Small intestine", ["Mouth", "Oesophagus"], { hint: "It comes after the stomach.", why: "Nutrients are absorbed in the small intestine." }),
      mc("What does a producer do in a food chain?", "Makes its own food", ["Hunts prey", "Eats other animals"], { hint: "Think of plants.", why: "Producers, like plants, make their own food." }),
      tf("Muscles work in pairs.", true, { hint: "Biceps and triceps.", why: "Muscles pull in pairs." }),
    ],
    intro: [],
    subs: [states, heating, cycle, dissolving],
    clip,
    quiz: [
      Q("states", "recall", "materials4.states", mc("Which state of matter fills any container it is in?", "Gas", ["Solid", "Liquid"], { hint: "Particles far apart.", why: "A gas spreads out to fill any container." }), ...ALTS[0]),
      Q("states", "recall", "materials4.facts", tf("The particles in a solid are far apart.", false, { hint: "Solids are packed tightly.", why: "Solid particles are packed tightly together." }), ...ALTS[1]),
      Q("heating", "apply", "materials4.order", ord("Put these in order as a block of ice is heated.", ["Ice", "Water", "Steam"], { hint: "Heat it up step by step.", why: "Ice melts into water and boils into steam." }), ...ALTS[2]),
      Q("dissolving", "apply", "materials4.soluble", ms("Which two of these dissolve in water?", ["Sugar", "Salt"], ["Sand", "Pebbles"], { hint: "They disappear when stirred.", why: "Sugar and salt are soluble." }), ...ALTS[3]),
      Q("states", "recall", "materials4.label", hot("Tap the solid.", [["🧊", "Ice", 22, 50], ["🎈", "Air in a balloon", 50, 50], ["🥛", "Milk", 78, 50]], ["Ice"], { labels: true, hint: "It keeps its shape.", why: "Ice is a solid." }), ...ALTS[4]),
      Q("cycle", "recall", "materials4.words", st("What is the word for water turning into vapour without boiling, as a puddle dries?", ["evaporation", "evaporating", "evaporate"], { hint: "It starts with e.", why: "Evaporation is a liquid slowly becoming a gas." }), ...ALTS[5]),
      Q("cycle", "apply", "materials4.condense", mat("Match each change of state to what happens.", [["Melting", "Solid to liquid"], ["Condensation", "Gas to liquid"], ["Boiling", "Liquid to gas"]], { hint: "Think about the states.", why: "Each change moves between two states." }), ...ALTS[6]),
      Q("heating", "apply", "materials4.fill", fill("Fill in the two temperatures.", "Ice melts at {b1} °C. Water boils at {b2} °C.", [["0", "10", "50"], ["100", "50", "200"]], { hint: "The two key temperatures.", why: "Ice melts at 0 and water boils at 100 degrees Celsius." }), ...ALTS[7]),
      Q("cycle", "apply", "materials4.maths", num("A glass has 250 ml of water. 70 ml evaporates. How many millilitres are left?", 180, { hint: "250 minus 70.", why: "250 - 70 = 180." }), ...ALTS[8]),
      Q("heating", "apply", "materials4.temp", sld("Slide to show the temperature at which water freezes, in degrees Celsius.", { min: -20, max: 50, unit: "°C" }, 0, 0, { hint: "Same as the melting point.", why: "Water freezes at 0 degrees Celsius." }), ...ALTS[9]),
      Q("dissolving", "apply", "materials4.separate", ord("Arrange these steps for getting salt from salt water.", ["Pour salt water into a dish", "Leave it in the sun", "The water evaporates", "Salt crystals are left"], { hint: "Follow the process.", why: "The water evaporates and the salt is left behind." }), ...ALTS[10]),
      Q("dissolving", "reason", "materials4.reason_dissolve", mc("Hamza says that when sugar dissolves, it disappears completely. Why is he wrong?", "It is still there as tiny particles in the water", ["It turns into water", "It melts away"], { hint: "What does the water taste like?", why: "The sugar is still in the water, as tiny particles." }), ...ALTS[11]),
      Q("cycle", "reason", "materials4.reason_evaporation", mc("Why does washing dry faster on a warm, windy day?", "Warmth and wind speed up evaporation", ["Wind adds water", "Warmth freezes the water"], { hint: "Think about evaporation.", why: "Heat and moving air make water evaporate faster." }), ...ALTS[12]),
      Q("heating", "reason", "materials4.reason_fair", mc("Noor wants a fair test of which ice cube melts fastest on a warm day. Which plan is best?", "Use ice cubes of the same size and change only the place", ["Use a big cube in the sun and a small one in the shade", "Use a different time for each"], { hint: "Change only one thing.", why: "Only the place should change in a fair test." }), ...ALTS[13]),
      Q("dissolving", "reason", "materials4.method", mc("Ali tries to get sugar out of sugar water by filtering. Why will it not work?", "The dissolved sugar is made of tiny particles that pass through the paper", ["Sugar is too big", "Filter paper is too thick"], { hint: "Dissolved particles are tiny.", why: "Dissolved particles pass through filter paper. Evaporating works instead." }), ...ALTS[14]),
      // ----- upgrade: 15 new mains (q16-q30), 1 variant each
      Q("states", "recall", "materials4.gases_ms", ms("Which two of these are gases?", ["Steam", "The air in a balloon"], ["Ice", "Milk"], { hint: "They spread out.", why: "Steam and air are gases." }),
        ms("Which two of these are liquids?", ["Milk", "Water"], ["Ice", "Steam"], { hint: "They flow.", why: "Milk and water are liquids." })),
      Q("states", "recall", "materials4.rock_hot", hot("Tap the picture of a gas.", [["🪨", "Rock", 22, 50], ["💧", "Water", 50, 50], ["💨", "Steam", 78, 50]], ["Steam"], { labels: true, hint: "It spreads out.", why: "Steam is a gas." }),
        hot("Tap the picture of a solid.", [["🪨", "Rock", 22, 50], ["💧", "Water", 50, 50], ["💨", "Steam", 78, 50]], ["Rock"], { labels: true, hint: "It keeps its shape.", why: "Rock is a solid." })),
      Q("states", "recall", "materials4.vapour_tf", tf("Water vapour is a gas.", true, { hint: "It is invisible.", why: "Water vapour is water in the gas state." }),
        tf("Steam is a solid.", false, { hint: "Steam spreads out.", why: "Steam is a gas." })),
      Q("states", "recall", "materials4.volume_tf", tf("A gas has a fixed volume.", false, { hint: "It spreads out.", why: "A gas fills its whole container, so its volume is not fixed." }),
        tf("A liquid takes the shape of its container.", true, { hint: "Think of water in a glass.", why: "A liquid takes the shape of its container." })),
      Q("heating", "apply", "materials4.cooling_ord", ord("Put these in order as steam is cooled.", ["Steam", "Water", "Ice"], { hint: "Cool it step by step.", why: "Steam condenses to water, and water freezes to ice." }),
        ord("Order the states from the most spread-out particles to the least.", ["Gas", "Liquid", "Solid"], { hint: "Gas is most spread out.", why: "Gas particles are far apart. Solid particles are packed tightly." })),
      Q("heating", "apply", "materials4.change_mat", mat("Match each example to its change of state.", [["Ice lolly in the sun", "Melts"], ["Water in a freezer", "Freezes"], ["Steam on a cold window", "Condenses"]], { hint: "Heat or cold?", why: "Heat melts, cold freezes, and cooling steam condenses." }),
        mat("Match each event to what is happening.", [["Washing drying on a line", "Evaporates"], ["Kettle at 100 °C", "Boils"], ["Ice cube on a hot plate", "Melts"]], { hint: "Think about the states.", why: "Each event is a change of state." })),
      Q("heating", "apply", "materials4.change_fill", fill("Complete the sentences about changes of state.", "Melting is solid to {b1}. Boiling is liquid to {b2}.", [["liquid", "gas", "solid"], ["gas", "solid", "liquid"]], { hint: "Heat moves it up.", why: "Melting makes a liquid and boiling makes a gas." }),
        fill("Complete the sentences about cooling.", "Freezing is liquid to {b1}. Condensing is gas to {b2}.", [["solid", "gas", "liquid"], ["liquid", "solid", "gas"]], { hint: "Cooling moves it down.", why: "Freezing makes a solid and condensing makes a liquid." })),
      Q("cycle", "recall", "materials4.vapour_st", st("What is the name for water when it is a gas?", ["water vapour", "vapour"], { hint: "Two words, starts with w.", why: "Water as a gas is called water vapour." }),
        st("What is the word for a gas cooling into a liquid?", ["condensation", "condensing", "condense"], { hint: "It starts with c.", why: "Condensation is a gas cooling into a liquid." })),
      Q("cycle", "apply", "materials4.puddle_num", num("A puddle holds 500 ml of water. 200 ml evaporates. How many millilitres are left?", 300, { hint: "500 minus 200.", why: "500 - 200 = 300." }),
        num("A tray holds 400 ml of water. 150 ml evaporates. How many millilitres are left?", 250, { hint: "400 minus 150.", why: "400 - 150 = 250." })),
      Q("heating", "apply", "materials4.rise_sld", sld("Water is heated from 20 °C to 100 °C. Slide to show how many degrees it rises.", { min: 0, max: 150, unit: "°C" }, 80, 0, { hint: "100 minus 20.", why: "100 - 20 = 80 degrees." }),
        sld("Water is heated from 30 °C to 100 °C. Slide to show how many degrees it rises.", { min: 0, max: 150, unit: "°C" }, 70, 0, { hint: "100 minus 30.", why: "100 - 30 = 70 degrees." })),
      Q("dissolving", "recall", "materials4.tools_mc", mc("Which tool holds back sand but lets water through?", "Filter paper", ["A spoon", "A cup"], { hint: "It has tiny holes.", why: "Filter paper catches the sand and lets water pass." }),
        mc("What do we call sugar mixed evenly into water?", "A solution", ["A solid", "A gas"], { hint: "Sugar has dissolved.", why: "Dissolved sugar and water make a solution." })),
      Q("heating", "reason", "materials4.reason_two_changes", mc("Zain tests which cloth dries fastest. He changes the cloth and the place. Why is this unfair?", "Two things change, so he cannot tell which caused the result", ["Cloths cannot dry", "The sun does not matter"], { hint: "Change one thing.", why: "A fair test changes only one variable." }),
        mc("Hira tests which sugar dissolves fastest. She changes the water temperature and the spoon size. Why is this unfair?", "Two things change, so she cannot tell which caused the result", ["Sugar cannot dissolve", "Spoons do not matter"], { hint: "Change one thing.", why: "A fair test changes only one variable." })),
      Q("cycle", "reason", "materials4.reason_vanish", mc("Imran says a puddle vanishes because the water is destroyed. Why is he wrong?", "It evaporates into the air as water vapour", ["It sinks into space", "It turns into rock"], { hint: "Think of evaporation.", why: "The water becomes invisible water vapour in the air." }),
        mc("Dua says the Earth loses its water when it evaporates. Why is she wrong?", "It condenses and falls again in the water cycle", ["It leaves the Earth for ever", "It turns into soil"], { hint: "Follow the cycle.", why: "Water stays in the water cycle and falls again as rain." })),
      Q("dissolving", "reason", "materials4.reason_sand_sugar", mc("Rida says sand and sugar both dissolve because both go into the water. Why is she wrong?", "Only sugar dissolves. Sand stays as bits and settles", ["Both dissolve", "Only sand dissolves"], { hint: "Which one disappears?", why: "Sugar is soluble. Sand is insoluble." }),
        mc("Zara says stirring makes salt vanish for ever. Why is she wrong?", "The salt is still in the water, and evaporating gets it back", ["Salt turns into water", "Salt stops existing"], { hint: "Taste the water.", why: "Dissolved salt is still there. Evaporating the water leaves it behind." })),
      Q("states", "reason", "materials4.reason_air_mass", mc("Maya says an inflated balloon weighs the same as an empty one because air weighs nothing. Why is she wrong?", "Air is a gas made of particles, so it has mass", ["Air is too light to count", "Balloons stretch"], { hint: "Particles have mass.", why: "A gas is made of particles, so it has mass." }),
        mc("Ahmed says a gas takes up no space. Why is he wrong?", "A gas spreads to fill its whole container, so it has volume", ["Gas has no particles", "Gas is always a liquid"], { hint: "Think of a balloon.", why: "A gas fills its container, so it takes up space." })),
    ],
  }),
];
