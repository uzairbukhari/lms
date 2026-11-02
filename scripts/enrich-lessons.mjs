// Adds the interactive extras (glossary, animated explainer, brain game, move-the-items) to the Week 1 lesson files in
// content/lessons. Safe to re-run: a block is only added when no block of the same type and title is there already.
//   node scripts/enrich-lessons.mjs
// The files are only changed in the repository. To put them in front of the children, import each one in the parent
// area (Lessons > Import): that saves it as a new version, and children who already started keep their earlier attempts.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = join(dirname(fileURLToPath(import.meta.url)), "../content/lessons");
const it = (emoji, x, y, o = {}) => ({ emoji, x, y, ...o });

const EXTRAS = {
  "diag-maths-class-1": {
    glossary: [["check-in", "A friendly game that shows us what you know. It is not a test."], ["adding", "Putting groups together to find how many there are altogether."], ["taking away", "Some things go away, so you count what is left."], ["triangle", "A shape with 3 sides and 3 corners."], ["square", "A shape with 4 equal sides and 4 corners."], ["circle", "A round shape with no corners."], ["pattern", "Something that repeats again and again, like red, blue, red, blue."]],
    after: {
      "Stop 2: Adding": [
        { type: "explainer", title: "Apples and more apples", scenes: [
          { caption: "You have 3 apples.", items: [it("🍎", 20, 50, { id: "a1", size: 3 }), it("🍎", 35, 50, { id: "a2", size: 3 }), it("🍎", 50, 50, { id: "a3", size: 3 })] },
          { caption: "A friend gives you 2 more apples.", items: [it("🍎", 20, 50, { id: "a1", size: 3 }), it("🍎", 35, 50, { id: "a2", size: 3 }), it("🍎", 50, 50, { id: "a3", size: 3 }), it("🍎", 70, 50, { id: "a4", size: 3, anim: "grow" }), it("🍎", 85, 50, { id: "a5", size: 3, anim: "grow" })] },
          { caption: "Count them all together: 3 and 2 make 5 apples!", items: [it("🍎", 20, 55, { id: "a1", size: 3, anim: "bounce" }), it("🍎", 35, 55, { id: "a2", size: 3, anim: "bounce" }), it("🍎", 50, 55, { id: "a3", size: 3, anim: "bounce" }), it("🍎", 65, 55, { id: "a4", size: 3, anim: "bounce" }), it("🍎", 80, 55, { id: "a5", size: 3, anim: "bounce" }), it("5", 50, 15, { label: "3 + 2 = 5", size: 3, anim: "pulse" })] },
        ] },
        { type: "manipulative", title: "Split the treasure", goal: "Split the 10 coins between your two hands. How many can you put in each? Try a different split!", emoji: "🪙", count: 10, zones: ["Left hand", "Right hand"] },
      ],
    },
    brain: { game: "memory_match", title: "Find the matching pairs", goal: "Turn over two cards. Can you find all the pairs?", emojis: ["1️⃣", "2️⃣", "3️⃣", "🔺", "🟦", "⭕"] },
  },
  "diag-maths-class-4": {
    glossary: [["place value", "The value of a digit depends on where it sits in the number: ones, tens, hundreds, thousands."], ["carry", "When a column adds to more than 9, you move the extra ten to the next column."], ["borrow", "When you cannot take away in a column, you swap a ten from the next column."], ["fraction", "A part of a whole, like one half or three quarters."], ["equivalent", "Looks different but has the same value, like 1/2 and 2/4."], ["perimeter", "The distance all the way around the outside of a shape."], ["area", "How much flat space is inside a shape."], ["round", "Change a number to a nearby simpler one, like 47 to 50."]],
    after: {
      "Stop 2: Times tables and division": [
        { type: "explainer", title: "Multiplying is repeated adding", scenes: [
          { caption: "One plate has 4 cookies.", items: [it("🍽️", 50, 70, { id: "p1", size: 3 }), it("🍪", 38, 40, { id: "c1" }), it("🍪", 46, 40, { id: "c2" }), it("🍪", 54, 40, { id: "c3" }), it("🍪", 62, 40, { id: "c4" })] },
          { caption: "Now there are 3 plates with 4 cookies on each.", items: [it("🍽️", 20, 70, { id: "p1", size: 3 }), it("🍽️", 50, 70, { id: "p2", size: 3, anim: "grow" }), it("🍽️", 80, 70, { id: "p3", size: 3, anim: "grow" }), it("🍪", 14, 40, { id: "c1" }), it("🍪", 22, 40, { id: "c2" }), it("🍪", 14, 52, { id: "c3" }), it("🍪", 22, 52, { id: "c4" }), it("🍪", 44, 40, { id: "d1", anim: "grow" }), it("🍪", 52, 40, { id: "d2", anim: "grow" }), it("🍪", 44, 52, { id: "d3", anim: "grow" }), it("🍪", 52, 52, { id: "d4", anim: "grow" }), it("🍪", 74, 40, { id: "e1", anim: "grow" }), it("🍪", 82, 40, { id: "e2", anim: "grow" }), it("🍪", 74, 52, { id: "e3", anim: "grow" })] },
          { caption: "4 + 4 + 4 is the same as 3 × 4. That makes 12 cookies!", items: [it("🍪", 50, 45, { id: "total", size: 3, anim: "pulse", label: "3 × 4 = 12" })] },
        ] },
      ],
    },
    brain: { game: "remember_order", title: "Copy the colours", goal: "Watch the colours light up, then tap them in the same order.", emojis: ["🟥", "🟨", "🟩", "🟦"] },
  },
  "diag-science-class-1": {
    glossary: [["check-in", "A friendly game that shows us what you know. It is not a test."], ["mammal", "An animal with fur or hair that feeds its babies milk, like a dog or a cow."], ["insect", "A small animal with 6 legs, like an ant or a bee."], ["roots", "The part of a plant under the ground that drinks water."], ["stem", "The part of a plant that holds it up and carries water."], ["force", "A push or a pull."], ["waterproof", "Water cannot get through it."], ["materials", "What things are made of, like wood, metal or plastic."]],
    after: {
      "Stop 3: Plants": [
        { type: "explainer", title: "How a seed grows", scenes: [
          { caption: "A tiny seed sits in the soil.", items: [it("🟫", 30, 88, { size: 3 }), it("🟫", 50, 88, { size: 3 }), it("🟫", 70, 88, { size: 3 }), it("🌰", 50, 76, { id: "plant" })] },
          { caption: "Rain and sunshine give it water and light.", items: [it("🟫", 30, 88, { size: 3 }), it("🟫", 50, 88, { size: 3 }), it("🟫", 70, 88, { size: 3 }), it("🌰", 50, 76, { id: "plant" }), it("☀️", 82, 15, { size: 3, anim: "spin" }), it("💧", 50, 25, { anim: "bounce", label: "water" })] },
          { caption: "The roots grow down and a little shoot pushes up.", items: [it("🟫", 30, 88, { size: 3 }), it("🟫", 50, 88, { size: 3 }), it("🟫", 70, 88, { size: 3 }), it("🌱", 50, 66, { id: "plant", size: 3, anim: "grow" })] },
          { caption: "At last it grows into a big flower!", items: [it("🟫", 30, 88, { size: 3 }), it("🟫", 50, 88, { size: 3 }), it("🟫", 70, 88, { size: 3 }), it("🌻", 50, 50, { id: "plant", size: 3, anim: "float" })] },
        ] },
      ],
    },
    brain: { game: "memory_match", title: "Find the living things", goal: "Match the pairs of animals and plants.", emojis: ["🐶", "🐟", "🐦", "🐛", "🌻", "🌳"] },
  },
  "diag-science-class-4": {
    glossary: [["evaporate", "Liquid water turns into an invisible gas called water vapour."], ["condense", "A gas cools down and turns back into tiny drops of liquid."], ["producer", "A plant that makes its own food using sunlight."], ["carnivore", "An animal that eats other animals."], ["herbivore", "An animal that eats only plants."], ["friction", "A force that slows things down when they rub together."], ["gravity", "The force that pulls things toward the ground."], ["circuit", "A complete loop that electricity can flow around."]],
    after: {
      "Stop 2: The water cycle": [
        { type: "explainer", title: "The water cycle", scenes: [
          { caption: "The Sun warms the sea.", items: [it("☀️", 85, 14, { size: 3, anim: "spin" }), it("🌊", 50, 88, { size: 3 }), it("💧", 30, 78, { id: "drop", label: "water" })] },
          { caption: "The warm water evaporates and rises as invisible vapour.", items: [it("☀️", 85, 14, { size: 3, anim: "spin" }), it("🌊", 50, 88, { size: 3 }), it("💧", 30, 40, { id: "drop", label: "evaporates", anim: "float" })] },
          { caption: "High up it cools and condenses into a cloud.", items: [it("☀️", 85, 14, { size: 3, anim: "spin" }), it("🌊", 50, 88, { size: 3 }), it("☁️", 30, 25, { id: "cloud", size: 3, label: "condenses", anim: "grow" })] },
          { caption: "The cloud gets heavy and the water falls as rain. Then it starts all over again!", items: [it("☀️", 85, 14, { size: 3, anim: "spin" }), it("🌊", 50, 88, { size: 3 }), it("🌧️", 30, 25, { id: "cloud", size: 3 }), it("💧", 30, 78, { id: "drop", label: "rain", anim: "bounce" })] },
        ] },
      ],
    },
    brain: { game: "remember_order", title: "Water cycle memory", goal: "Watch the order, then copy it.", emojis: ["🌞", "💧", "☁️", "🌧️"] },
  },
  "diag-data-ai-class-1": {
    glossary: [["instructions", "Clear steps that tell someone exactly what to do."], ["algorithm", "A list of steps to solve a problem, in the right order."], ["pattern", "Something that repeats again and again."], ["sort", "Put things into groups that are alike."], ["data", "Information we collect, like how many of each fruit."], ["pictogram", "A graph that uses little pictures to show numbers."], ["artificial intelligence", "A computer that learns from examples to do clever things."]],
    after: {
      "Stop 1: Instructions in order": [
        { type: "explainer", title: "A sandwich in the right order", scenes: [
          { caption: "First, put the bread on the plate.", items: [it("🍽️", 50, 75, { size: 3 }), it("🍞", 50, 55, { id: "b1", size: 3, anim: "grow" })] },
          { caption: "Next, add the cheese.", items: [it("🍽️", 50, 75, { size: 3 }), it("🍞", 50, 55, { id: "b1", size: 3 }), it("🧀", 50, 38, { id: "ch", size: 2, anim: "grow" })] },
          { caption: "Last, put the other bread on top. Now it is a sandwich! Order matters.", items: [it("🍽️", 50, 75, { size: 3 }), it("🥪", 50, 52, { id: "b1", size: 3, anim: "bounce" })] },
        ] },
      ],
    },
    brain: { game: "memory_match", title: "Computer pairs", goal: "Find the matching pairs.", emojis: ["🤖", "💻", "📊", "🔢", "🔒", "🧩"] },
  },
  "diag-data-ai-class-4": {
    glossary: [["algorithm", "A precise list of steps to solve a problem."], ["loop", "Steps that repeat so you do not have to write them again."], ["debugging", "Finding and fixing mistakes in a program."], ["bar chart", "A graph that uses bars to compare amounts."], ["training data", "The examples an AI learns from."], ["strong password", "A long mix of letters, numbers and symbols that is hard to guess."]],
    after: {
      "Stop 1: Algorithms and loops": [
        { type: "explainer", title: "A loop draws a square", scenes: [
          { caption: "A robot starts in the corner. The loop says: move forward, turn right.", items: [it("🤖", 20, 25, { id: "r", size: 3, label: "start" })] },
          { caption: "Forward and turn right. That was one time round the loop.", items: [it("🤖", 75, 25, { id: "r", size: 3, label: "1" })] },
          { caption: "Repeat! Forward and turn right again.", items: [it("🤖", 75, 75, { id: "r", size: 3, label: "2" })] },
          { caption: "And again. Three times so far.", items: [it("🤖", 20, 75, { id: "r", size: 3, label: "3" })] },
          { caption: "Repeat 4 times and the robot is back at the start, having drawn a square. One loop saved lots of writing!", items: [it("🤖", 20, 25, { id: "r", size: 3, label: "4", anim: "bounce" })] },
        ] },
      ],
    },
    brain: { game: "remember_order", title: "Copy the sequence", goal: "Computers follow steps in order. Watch, then copy the order.", emojis: ["🟥", "🟨", "🟩", "🟦"] },
  },
  "diag-general-knowledge-class-1": {
    glossary: [["check-in", "A friendly game that shows us what you know. It is not a test."], ["continent", "A very large area of land. There are 7 on Earth."], ["ocean", "A huge area of salty water. There are 5 on Earth."], ["farmer", "Someone who grows our food and looks after farm animals."], ["nurse", "Someone who helps people feel better when they are ill."], ["cheetah", "The fastest animal on land."], ["blue whale", "The biggest animal in the world."]],
    after: {
      "Stop 2: Time": [
        { type: "explainer", title: "Why we have day and night", scenes: [
          { caption: "The Sun shines on one side of the Earth. It is day there.", items: [it("☀️", 15, 50, { size: 3, anim: "spin" }), it("🌍", 60, 50, { id: "earth", size: 3 })] },
          { caption: "The Earth slowly spins around.", items: [it("☀️", 15, 50, { size: 3, anim: "spin" }), it("🌍", 60, 50, { id: "earth", size: 3, anim: "spin" })] },
          { caption: "The side facing away from the Sun is dark. That is night. One whole spin takes a day.", items: [it("☀️", 15, 50, { size: 3, anim: "spin" }), it("🌍", 60, 50, { id: "earth", size: 3 }), it("🌙", 88, 25, { size: 2, anim: "float" })] },
        ] },
      ],
    },
    brain: { game: "memory_match", title: "Match the explorers", goal: "Find the matching pairs.", emojis: ["🌍", "🐋", "🐆", "🌾", "🍎", "🐘"] },
  },
  "diag-general-knowledge-class-4": {
    glossary: [["capital city", "The city where a country's government is based."], ["continent", "A very large area of land. There are 7 on Earth."], ["balanced diet", "Eating a mix of different foods so your body gets what it needs."], ["flag", "A piece of cloth with colours and a design that stands for a country."], ["printing press", "A machine that made books quickly, invented about 1440."], ["planet", "A big world that travels around a star. Our Sun has 8."]],
    after: {
      "Stop 3: Space and nature": [
        { type: "explainer", title: "Our Solar System", scenes: [
          { caption: "At the centre of our Solar System is the Sun, a star.", items: [it("☀️", 15, 50, { size: 3, anim: "spin" })] },
          { caption: "8 planets travel around it. Earth is the third one from the Sun.", items: [it("☀️", 15, 50, { size: 3, anim: "spin" }), it("🌍", 45, 50, { id: "earth", size: 2, label: "Earth", anim: "grow" }), it("🔴", 62, 50, { size: 1, label: "Mars", anim: "grow" }), it("🪐", 85, 50, { size: 2, label: "Saturn", anim: "grow" })] },
          { caption: "The Moon travels around the Earth.", items: [it("☀️", 15, 50, { size: 3, anim: "spin" }), it("🌍", 45, 50, { id: "earth", size: 2, label: "Earth" }), it("🔴", 62, 50, { size: 1, label: "Mars" }), it("🪐", 85, 50, { size: 2, label: "Saturn" }), it("🌙", 45, 22, { id: "moon", size: 1, anim: "float", label: "Moon" })] },
        ] },
      ],
    },
    brain: { game: "remember_order", title: "Space memory", goal: "Watch the order, then copy it.", emojis: ["🌍", "🌙", "⭐", "🪐"] },
  },
};

// Drawn pictures for words the lesson introduces (a new word should never come without something to look at).
// They sit right after the paragraph that introduces the word.
const CHARTS = {
  "diag-maths-class-1": {
    "Stop 1: Counting and numbers": [{ type: "chart", kind: "number_line", title: "Each step up is one more", caption: "3 is on the line. One more than 3 is 4.", from: 0, to: 10, marks: [3, 4] }],
    "Stop 3: Taking away": [{ type: "chart", kind: "number_line", title: "Taking away 3 from 8", caption: "Start at 8 and hop back 3 steps. You land on 5.", from: 0, to: 10, marks: [8, 5] }],
  },
  "diag-maths-class-4": {
    "Stop 4: Fractions": [
      { type: "chart", kind: "fraction", title: "One half", caption: "The whole is cut into 2 equal parts and 1 is coloured.", parts: 2, shaded: 1 },
      { type: "chart", kind: "fraction", title: "Two quarters is also one half", caption: "Equivalent fractions look different but cover the same amount.", parts: 4, shaded: 2 },
    ],
  },
  "diag-data-ai-class-1": {
    "Stop 3: Data and graphs": [
      { type: "chart", kind: "tally", title: "Tally marks: favourite pets", caption: "Every pet we count gets one line. The fifth line crosses the other four.", rows: [{ label: "Dogs", value: 7, emoji: "🐶" }, { label: "Cats", value: 4, emoji: "🐱" }, { label: "Fish", value: 5, emoji: "🐟" }] },
      { type: "chart", kind: "pictogram", title: "A pictogram: fruit we like", caption: "Each picture stands for one child. Bananas have more pictures, so bananas are more popular.", rows: [{ label: "Apples", value: 3, emoji: "🍎" }, { label: "Bananas", value: 5, emoji: "🍌" }, { label: "Grapes", value: 2, emoji: "🍇" }] },
    ],
  },
  "diag-data-ai-class-4": {
    "Stop 3: Data": [
      { type: "chart", kind: "table", title: "A table: our favourite sports", caption: "A table stores data in rows and columns.", rows: [{ label: "Cricket", value: 8 }, { label: "Football", value: 12 }, { label: "Swimming", value: 5 }] },
      { type: "chart", kind: "bar_chart", title: "A bar chart of the same data", caption: "The taller the bar, the more votes. Football is the tallest.", rows: [{ label: "Cricket", value: 8 }, { label: "Football", value: 12 }, { label: "Swimming", value: 5 }] },
    ],
  },
};


// A picture for every stop: sections that still had only words get an emoji picture or an animated explainer.
const img = (emoji, caption) => ({ type: "image", emoji, caption });
const VISUALS = {
  "diag-data-ai-class-1": {
    "Stop 2: Patterns and sorting": [{ type: "explainer", title: "Sorting into groups", scenes: [
      { caption: "Here are some fruits all mixed up.", items: [it("🍎", 20, 30, { id: "f1", size: 3 }), it("🍌", 45, 55, { id: "f2", size: 3 }), it("🍎", 70, 25, { id: "f3", size: 3 }), it("🍌", 25, 75, { id: "f4", size: 3 }), it("🍎", 60, 78, { id: "f5", size: 3 }), it("🍌", 85, 50, { id: "f6", size: 3 })] },
      { caption: "To sort them, put things that are alike in the same group. Apples go together and bananas go together.", items: [it("🍎", 20, 30, { id: "f1", size: 3, label: "Apples" }), it("🍌", 75, 30, { id: "f2", size: 3, label: "Bananas" }), it("🍎", 20, 55, { id: "f3", size: 3 }), it("🍌", 75, 55, { id: "f4", size: 3 }), it("🍎", 20, 80, { id: "f5", size: 3 }), it("🍌", 75, 80, { id: "f6", size: 3 })] },
    ] }],
  },
  "diag-data-ai-class-4": {
    "Stop 2: Decisions": [{ type: "explainer", title: "If, then, else", scenes: [
      { caption: "A program asks a question. Here it asks: is it raining?", items: [it("🤖", 20, 50, { size: 3, anim: "float" }), it("❓", 60, 40, { size: 3, anim: "pulse", label: "Is it raining?" })] },
      { caption: "IF the answer is yes, THEN the program takes an umbrella.", items: [it("🌧️", 25, 45, { size: 3, label: "if yes" }), it("☂️", 70, 45, { size: 3, anim: "grow", label: "then umbrella" })] },
      { caption: "ELSE, when the answer is no, it does something different. It puts on sunglasses.", items: [it("☀️", 25, 45, { size: 3, label: "else (no rain)" }), it("😎", 70, 45, { size: 3, anim: "grow", label: "sunglasses" })] },
    ] }],
    "Stop 4: How AI learns": [{ type: "explainer", title: "How an AI learns from examples", scenes: [
      { caption: "First we show the AI lots of examples, each with the right answer. This is the training data.", items: [it("🐱", 20, 30, { size: 2, label: "cat" }), it("🐶", 45, 30, { size: 2, label: "dog" }), it("🐱", 70, 30, { size: 2, label: "cat" }), it("🐶", 30, 70, { size: 2, label: "dog" }), it("🐱", 60, 70, { size: 2, label: "cat" })] },
      { caption: "The AI looks for patterns, such as pointy ears and whiskers.", items: [it("🤖", 50, 50, { id: "ai", size: 3, anim: "pulse" }), it("💭", 75, 30, { size: 2, anim: "float", label: "patterns" })] },
      { caption: "Now it can guess about a new picture it has never seen. It says: cat!", items: [it("🤖", 25, 50, { id: "ai", size: 3 }), it("🐱", 70, 50, { size: 3, anim: "grow", label: "new picture" }), it("💬", 50, 20, { size: 2, label: "cat!", anim: "bounce" })] },
    ] }],
  },
  "diag-general-knowledge-class-1": {
    "Stop 1: Our planet": [img("🌍🌏🌎", "Planet Earth has 7 continents and 5 oceans.")],
    "Stop 3: People who help us": [img("🚒🏥🏫🚜", "Firefighters, doctors and nurses, teachers and farmers all help us.")],
    "Stop 4: Food and health": [img("🥕🍎🥛💧", "Fruit, vegetables, milk and water help our bodies stay healthy.")],
  },
  "diag-general-knowledge-class-4": {
    "Stop 1: Maps and the world": [img("🗺️🧭", "A map shows where places are. A compass shows which way is north.")],
    "Stop 2: Inventions and history": [{ type: "explainer", title: "A line of inventions", scenes: [
      { caption: "Long ago people invented the wheel. It helped them carry heavy things.", items: [it("🛞", 15, 50, { id: "wheel", size: 3, label: "wheel", anim: "spin" })] },
      { caption: "About 1440 the printing press made books quickly.", items: [it("🛞", 15, 50, { id: "wheel", size: 2, label: "wheel" }), it("🖨️", 38, 50, { id: "press", size: 3, label: "printing press", anim: "grow" })] },
      { caption: "Then came the telephone, so people could talk from far away.", items: [it("🛞", 15, 50, { id: "wheel", size: 2, label: "wheel" }), it("🖨️", 38, 50, { id: "press", size: 2, label: "printing press" }), it("☎️", 62, 50, { id: "phone", size: 3, label: "telephone", anim: "grow" })] },
      { caption: "The light bulb lit our homes at night. And the computer changed how we learn and work.", items: [it("🛞", 15, 50, { id: "wheel", size: 2, label: "wheel" }), it("🖨️", 35, 50, { id: "press", size: 2, label: "printing press" }), it("☎️", 55, 50, { id: "phone", size: 2, label: "telephone" }), it("💡", 73, 50, { id: "bulb", size: 2, label: "light bulb", anim: "grow" }), it("💻", 90, 50, { id: "pc", size: 2, label: "computer", anim: "grow" })] },
    ] }],
    "Stop 4: Healthy living and helpful habits": [img("😴🥦🏃🧼", "Sleep well, eat well, move your body and keep clean.")],
  },
  "diag-maths-class-1": {
    "Stop 4: Shapes and measuring": [img("🔺🟦⭕", "A triangle has 3 sides. A square has 4 equal sides. A circle has no corners.")],
  },
  "diag-maths-class-4": {
    "Stop 1: Place value and big numbers": [{ type: "chart", kind: "table", title: "Place value of 4,825", caption: "4 thousands, 8 hundreds, 2 tens and 5 ones make four thousand, eight hundred and twenty-five.", rows: [{ label: "Thousands", value: 4 }, { label: "Hundreds", value: 8 }, { label: "Tens", value: 2 }, { label: "Ones", value: 5 }] }],
    "Stop 3: Adding and taking away big numbers": [{ type: "explainer", title: "What carrying means", scenes: [
      { caption: "Add the ones: 8 ones and 7 ones.", items: [it("🟦", 25, 50, { id: "o8", size: 3, label: "8 ones" }), it("🟦", 70, 50, { id: "o7", size: 3, label: "7 ones" })] },
      { caption: "That makes 15 ones. Ten of them make a group of ten, and 5 are left over.", items: [it("🔟", 28, 50, { id: "ten", size: 3, label: "1 ten", anim: "grow" }), it("🟦", 70, 50, { id: "o7", size: 3, label: "5 ones left" })] },
      { caption: "Write the 5 in the ones column and carry the 1 ten across to the tens column.", items: [it("🔟", 80, 50, { id: "ten", size: 3, label: "tens column", anim: "bounce" }), it("🟦", 25, 50, { id: "o7", size: 3, label: "ones column" })] },
    ] }],
  },
  "diag-science-class-1": {
    "Stop 1: Living things": [img("🐕🌳🧒", "Living things grow, move, need food and water and have babies.")],
    "Stop 2: Animals": [img("🐕🐦🐟🐛", "Mammals, birds, fish and insects are animal groups.")],
    "Stop 4: Materials": [img("🪵🔩🧵", "Wood, metal and cloth are different materials with different jobs.")],
  },
  "diag-science-class-4": {
    "Stop 1: Solids, liquids and gases": [{ type: "explainer", title: "Three states of water", scenes: [
      { caption: "Ice is a solid. It keeps its shape.", items: [it("🧊", 50, 50, { id: "w", size: 3, label: "solid" })] },
      { caption: "When it melts it becomes a liquid. A liquid flows and takes the shape of its container.", items: [it("💧", 50, 50, { id: "w", size: 3, label: "liquid", anim: "float" })] },
      { caption: "When it boils it becomes a gas called water vapour. A gas spreads out to fill the space.", items: [it("♨️", 50, 40, { id: "w", size: 3, label: "gas", anim: "float" })] },
    ] }],
    "Stop 3: Food chains": [{ type: "explainer", title: "A food chain", scenes: [
      { caption: "Every food chain starts with a producer. A plant uses sunlight to make its own food.", items: [it("☀️", 15, 25, { size: 3, anim: "spin" }), it("🌱", 20, 70, { id: "plant", size: 3, label: "producer" })] },
      { caption: "A rabbit eats the plant. It is a herbivore, because it eats only plants.", items: [it("☀️", 15, 25, { size: 3, anim: "spin" }), it("🌱", 20, 70, { id: "plant", size: 3, label: "producer" }), it("🐰", 50, 70, { id: "rabbit", size: 3, label: "herbivore", anim: "grow" })] },
      { caption: "A fox eats the rabbit. It is a carnivore, because it eats other animals. Energy passes along the chain.", items: [it("☀️", 15, 25, { size: 3, anim: "spin" }), it("🌱", 20, 70, { id: "plant", size: 3, label: "producer" }), it("🐰", 50, 70, { id: "rabbit", size: 3, label: "herbivore" }), it("🦊", 80, 70, { id: "fox", size: 3, label: "carnivore", anim: "grow" })] },
    ] }],
    "Stop 4: Forces and magnets": [{ type: "explainer", title: "A magnet pulls", scenes: [
      { caption: "A magnet has an invisible force around it. Here are a magnet, a nail and a piece of wood.", items: [it("🧲", 20, 50, { id: "mag", size: 3 }), it("🔩", 70, 30, { id: "nail", size: 2, label: "iron nail" }), it("🪵", 70, 75, { id: "wood", size: 2, label: "wood" })] },
      { caption: "The magnet pulls the iron nail towards it. The wood does not move, because wood is not magnetic.", items: [it("🧲", 20, 50, { id: "mag", size: 3 }), it("🔩", 38, 45, { id: "nail", size: 2, label: "pulled!", anim: "pulse" }), it("🪵", 70, 75, { id: "wood", size: 2, label: "not magnetic" })] },
    ] }],
  },
};

// More meanings, so the words a lesson puts in bold can all be explained.
const MORE_TERMS = {
  "diag-data-ai-class-1": [["AI", "Short for artificial intelligence: a computer that can learn from examples."], ["password", "A secret word or code that keeps your things safe. Never share it."], ["order", "The way things come one after another, first, next, last."]],
  "diag-data-ai-class-4": [["data", "Facts and information we collect, like how many votes each sport got."], ["charts", "Pictures that show data so it is easy to compare, like bar charts."], ["tables", "Data written in rows and columns."], ["if", "A word that asks a question for the computer: if this is true..."], ["then", "What the computer does when the answer to the if question is yes."], ["else", "What the computer does when the answer to the if question is no."], ["examples", "Real cases we learn from, like lots of photos of cats."], ["mistakes", "Things that went wrong. Fixing them helps us learn."]],
  "diag-general-knowledge-class-1": [["Earth", "The planet we live on."], ["doctor", "Someone who helps keep us healthy and treats us when we are ill."], ["firefighter", "Someone who puts out fires and rescues people."], ["teacher", "Someone who helps us learn."]],
  "diag-general-knowledge-class-4": [["Amazon", "A giant rainforest and river in South America."], ["Asia", "The biggest continent on Earth."], ["Moon", "The big rock that travels around the Earth and shines by reflecting sunlight."], ["Pacific", "The biggest and deepest ocean on Earth."], ["Sahara", "The biggest hot desert in the world, in Africa."], ["computer", "A machine that follows instructions to store information and solve problems."], ["light bulb", "An invention that makes light from electricity so we can see at night."], ["telephone", "An invention that lets people talk to each other from far away."], ["wheel", "A round object that turns. It helps things roll and move."]],
  "diag-maths-class-1": [["one more", "The number that comes straight after. One more than 3 is 4."]],
  "diag-maths-class-4": [["fact family", "Numbers that go together, like 3 + 4 = 7 and 7 - 4 = 3."]],
  "diag-science-class-1": [["birds", "Animals with feathers and wings. Most can fly."], ["fish", "Animals that live in water and breathe with gills."], ["flowers", "The colourful part of a plant that makes seeds."], ["leaves", "The flat green parts of a plant that catch sunlight to make food."], ["grow", "To get bigger over time."], ["move", "To go from one place to another."], ["sense", "To notice the world with eyes, ears, nose, tongue and skin."]],
  "diag-science-class-4": [["boil", "When a liquid gets so hot it bubbles and turns into a gas."], ["freeze", "When a liquid gets so cold it turns into a solid."], ["gas", "Something with no fixed shape that spreads out to fill the space, like air."], ["liquid", "Something that flows and takes the shape of its container, like water."], ["solid", "Something that keeps its own shape, like a rock."], ["melt", "When a solid gets warm and turns into a liquid."], ["magnet", "An object that pulls iron and steel towards it."], ["rain", "Water drops that fall from clouds."], ["shadow", "A dark shape made when something blocks light."], ["vibrations", "Tiny, fast shakes that make sound."]],
};

for (const [slug, x] of Object.entries(EXTRAS)) {
  const path = join(dir, `${slug}.json`);
  const file = JSON.parse(readFileSync(path, "utf8"));
  const blocks = file.blocks;
  const has = (b) => blocks.some((o) => o.type === b.type && (o.title ?? o.caption ?? "") === (b.title ?? b.caption ?? ""));
  const insertAt = (heading, add) => {
    const h = blocks.findIndex((b) => b.type === "heading" && b.text === heading);
    if (h < 0) throw new Error(`${slug}: no heading "${heading}"`);
    let end = blocks.findIndex((b, i) => i > h && (b.type === "heading" || b.type === "summary"));
    if (end < 0) end = blocks.length;
    for (const b of add) if (!has(b)) { blocks.splice(end, 0, b); end++; }
  };
  for (const [heading, add] of Object.entries(x.after)) insertAt(heading, add);
  const afterIntro = { ...(CHARTS[slug] ?? {}) };
  for (const [heading, add] of Object.entries(VISUALS[slug] ?? {})) afterIntro[heading] = [...(afterIntro[heading] ?? []), ...add];
  for (const [heading, add] of Object.entries(afterIntro)) {
    const h = blocks.findIndex((b) => b.type === "heading" && b.text === heading);
    if (h < 0) throw new Error(`${slug}: no heading "${heading}"`);
    let at = blocks.findIndex((b, i) => i > h && b.type === "text") + 1;
    for (const b of add) if (!has(b)) { blocks.splice(at, 0, b); at++; }
  }
  const brain = { type: "brain_game", ...x.brain };
  if (!has(brain)) { const s = blocks.findIndex((b) => b.type === "summary"); blocks.splice(s < 0 ? blocks.length : s, 0, brain); }
  let glossary = blocks.find((b) => b.type === "glossary");
  if (!glossary) { glossary = { type: "glossary", terms: [] }; blocks.push(glossary); }
  for (const [term, meaning] of [...x.glossary, ...(MORE_TERMS[slug] ?? [])]) if (!glossary.terms.some((t) => t.term.toLowerCase() === term.toLowerCase())) glossary.terms.push({ term, meaning });
  writeFileSync(path, `${JSON.stringify(file, null, 2)}\n`);
  console.log(`${slug}: ${blocks.length} blocks`);
}
