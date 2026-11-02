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

for (const [slug, x] of Object.entries(EXTRAS)) {
  const path = join(dir, `${slug}.json`);
  const file = JSON.parse(readFileSync(path, "utf8"));
  const blocks = file.blocks;
  const has = (b) => blocks.some((o) => o.type === b.type && (o.title ?? "") === (b.title ?? ""));
  const insertAt = (heading, add) => {
    const h = blocks.findIndex((b) => b.type === "heading" && b.text === heading);
    if (h < 0) throw new Error(`${slug}: no heading "${heading}"`);
    let end = blocks.findIndex((b, i) => i > h && (b.type === "heading" || b.type === "summary"));
    if (end < 0) end = blocks.length;
    for (const b of add) if (!has(b)) { blocks.splice(end, 0, b); end++; }
  };
  for (const [heading, add] of Object.entries(x.after)) insertAt(heading, add);
  const brain = { type: "brain_game", ...x.brain };
  if (!has(brain)) { const s = blocks.findIndex((b) => b.type === "summary"); blocks.splice(s < 0 ? blocks.length : s, 0, brain); }
  if (!blocks.some((b) => b.type === "glossary")) blocks.push({ type: "glossary", terms: x.glossary.map(([term, meaning]) => ({ term, meaning })) });
  writeFileSync(path, `${JSON.stringify(file, null, 2)}\n`);
  console.log(`${slug}: ${blocks.length} blocks`);
}
