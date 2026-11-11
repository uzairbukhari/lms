import { SAY, SS, H, T, IMG, TIP, FACT, PHOTO, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Coteach diagrams (see content/media/manifest.d/maths-class-1-shape.json).
const COTEACH_A = {"type":"image","asset":"maths-class-1-shape-d1-a8828d00.png","alt":"A shape and its mirror image either side of a dashed fold line","caption":"A line of symmetry."};
const COTEACH_B = {"type":"image","asset":"maths-class-1-shape-d2-f203440b.png","alt":"Turn arrows around a robot showing a quarter, a half and a three-quarter turn","caption":"Quarter, half and three-quarter turns."};
// Class 1 Maths topic 8: shape and position (format 3.0). Standards from docs/CURRICULUM_V2.md.
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });
const RG = (id, col, row, facing, x = 50, y = 46, size = 3, anim = "none") => [id, { kind: "robot_grid", col, row, facing }, x, y, size, anim];

const N = (q, sub, depth, alts) => ({ q, sub, depth, alts });
const DICE = "maths-class-1-shape-1-70891d3b.jpg";

const flat = {
  id: "flat", kind: "learn", title: "Flat shapes",
  blocks: [
    H("Welcome back, number explorer!"),
    SAY("Welcome back, number explorer! Today we look at shapes. We meet flat shapes and solid shapes. We spot shapes that match on both sides. And we help a robot find its way.",
      T("Today we explore **shapes**, symmetry and directions.")),
    SAY("Look at this little dice. It is a cube! How many faces can you see? Let's find out.",
      PHOTO(DICE, "A small white dice with coloured dots on a grey surface", "A dice is a cube.", "Photo by Maxim Tolchinskiy on Unsplash")),
    H("Stop 1: Sides and corners"),
    SAY("Flat shapes are called two D shapes. Every flat shape has sides and corners. A side is a straight edge. A corner is where two sides meet. A triangle has three sides and three corners. A square has four sides and four corners. All its sides are the same length. A rectangle has four sides and four corners too. Its long sides are longer than its short sides.", T("Flat shapes have **sides** and **corners**.", "A triangle has 3 sides. A square and a rectangle have 4 sides.")),
    EXPP("Count the sides",
      SS("A triangle. Count the sides: one, two, three. Three corners as well.", S("Triangle: 3 sides, 3 corners.", ["a", "🔺", 50, 40, 3, "none", "triangle"])),
      SS("A square. Four sides, all the same length. And four corners.", S("Square: 4 equal sides, 4 corners.", ["a", "🟦", 50, 40, 3, "pulse", "square"])),
      SS("A circle. It has no straight sides and no corners at all. It is round all the way.", S("Circle: 0 sides, 0 corners.", ["a", "🔵", 50, 40, 3, "pulse", "circle"]))),
    SAY("Fold along the dashed line. Both sides match. That is a line of symmetry.", COTEACH_A),
    CHK(num("How many sides does a triangle have?", 3, { hint: "Tri means three.", why: "A triangle has 3 sides.", tag: "shape.sides" })),
    H("Stop 2: Which shape is which?"),
    SAY("Let us sort shapes by their sides. Shapes with three sides are triangles. Shapes with four sides are squares and rectangles. A shape with five sides is a pentagon, and with six sides a hexagon. Look around you. A door is a rectangle. A clock is a circle. A road sign can be a triangle.", T("3 sides: triangle. 4 sides: square or rectangle. 5 sides: **pentagon**. 6 sides: **hexagon**.")),
    IMG("🔷", "Shapes are named by the number of their sides."),
    CHK(mc("A shape has 4 equal sides. What is it?", "A square", ["A triangle", "A circle"], { hint: "Four equal sides and corners.", why: "A square has 4 equal sides.", tag: "shape.names" })),
    SAY("Remember. Flat shapes have sides and corners. A circle has none. Count the sides to name the shape.", SUM("Flat shapes have sides and corners", "A circle has no sides or corners", "Count the sides to name a shape")),
    GLOSS({ shapes: "The outline or form of things.", side: "A straight edge of a shape.", corner: "Where two sides meet.", triangle: "A shape with 3 sides.", square: "A shape with 4 equal sides.", rectangle: "A shape with 4 sides and 4 corners.", circle: "A round shape.", pentagon: "A shape with 5 sides.", hexagon: "A shape with 6 sides." }),
  ],
  mini: [
    num("How many corners does a square have?", 4, { hint: "Count where sides meet.", why: "A square has 4 corners." }),
    mc("Which shape has no corners?", "Circle", ["Square", "Triangle"], { hint: "It is round.", why: "A circle has no corners." }),
    tf("A rectangle has 5 sides.", false, { hint: "Count the sides of a door.", why: "A rectangle has 4 sides." }),
    num("How many sides does a hexagon have?", 6, { hint: "Hex means six.", why: "A hexagon has 6 sides." }),
  ],
};

const solid = {
  id: "solid", kind: "try", title: "Solid shapes",
  blocks: [
    H("Stop 1: Three D shapes"),
    SAY("Solid shapes are called three D shapes. You can pick them up and hold them. A cube is like a dice. It has six flat faces, and all of them are squares. A sphere is like a ball. It is round all over. A cylinder is like a tin of beans. It has two flat circles and one curved side. A cone is like an ice cream cone. It has one flat circle and a point.", T("A **cube** has 6 flat faces. A **sphere** is round. A **cylinder** has 2 circles. A **cone** has a point.", "Solid shapes have faces, edges and corners.")),
    EXPP("Four solid shapes",
      SS("A cube, like a dice. Six square faces.", S("Cube.", ["a", "🎲", 50, 40, 3, "none", "cube"])),
      SS("A sphere, like a ball. It rolls because it is round all over.", S("Sphere.", ["a", "⚽", 50, 40, 3, "pulse", "sphere"])),
      SS("A cylinder like a tin. A cone like an ice cream cone.", S("Cylinder and cone.", ["a", "🥫", 28, 40, 3, "none", "cylinder"], ["b", "🍦", 72, 40, 3, "pulse", "cone"]))),
    SAY("The robot can turn a quarter, a half or three quarters.", COTEACH_B),
    CHK(mc("Which solid shape is like a ball?", "Sphere", ["Cube", "Cone"], { hint: "It rolls in every direction.", why: "A ball is a sphere.", tag: "shape.solid" })),
    H("Stop 2: Shape hunt"),
    SAY("Time for a shape hunt at home. Find a cube, a sphere, a cylinder and a cone. Look in the kitchen, your toy box and your school bag. A tin is a cylinder. A tissue box is a cuboid. Draw or tick each one you find.", T("Go on a shape hunt at home and find a cube, sphere, cylinder and cone.")),
    SAY("Look for solid shapes at home. Find a ball, a tin, a box and a cone.", IMG("🔎", "A shape hunt at home.")),
    ACT("Shape hunt", ["Paper and a pencil", "A parent to help"], ["Find something shaped like a ball. What is it?", "Find something shaped like a tin. What is it?", "Find something shaped like a box.", "Which shape did you find most of?"]),
    CHK(mc("A tin of beans is a...", "cylinder", ["cube", "sphere"], { hint: "It has two flat circles.", why: "A tin is a cylinder.", tag: "shape.solid" })),
    SAY("Remember. Solid shapes are three D. A cube has square faces. A sphere is round. A cylinder has two circles. A cone has a point.", SUM("Solid shapes are 3D", "Cube, sphere, cylinder and cone")),
    GLOSS({ cube: "A solid shape with 6 square faces.", sphere: "A solid ball shape.", cylinder: "A solid shape like a tin.", cone: "A solid shape with a point.", face: "A flat surface of a solid shape.", cuboid: "A solid shape like a box." }),
  ],
  mini: [
    num("How many faces does a cube have?", 6, { hint: "Think of a dice.", why: "A cube has 6 faces." }),
    mc("An ice cream cone is a...", "cone", ["cube", "cylinder"], { hint: "It has a point.", why: "It is a cone." }),
    tf("A sphere has flat faces.", false, { hint: "A ball is round.", why: "A sphere has no flat faces." }),
    mc("Which shape could roll like a ball?", "Sphere", ["Cube", "Cuboid"], { hint: "Round all over.", why: "A sphere rolls." }),
  ],
};

const symmetry = {
  id: "symmetry", kind: "play", title: "Symmetry and patterns",
  blocks: [
    H("Stop 1: Mirror lines"),
    SAY("Some shapes look the same on both sides. That is called symmetry. Imagine folding a butterfly down the middle. The left wing matches the right wing exactly. The fold line is the line of symmetry, or mirror line. A butterfly, a heart and a square all have symmetry. A shape is symmetrical if one half is the mirror image of the other.", T("**Symmetry** means one half is the mirror image of the other half.", "The fold is the **line of symmetry**.")),
    EXPP("A symmetrical butterfly",
      SS("Here is a butterfly. Look at its left wing.", S("Look at the left wing.", ["a", "🦋", 50, 40, 3])),
      SS("The right wing is the mirror image. The line down the middle is the line of symmetry.", S("Left matches right. The line is the mirror line.", ["a", "🦋", 50, 40, 3, "pulse"], ["l", "➖", 50, 86, 2, "none", "mirror line"]))),
    SAY("Flip the cards and find the matching pairs.", BRAIN("memory_match", "Symmetry match", "Find the matching pairs of cards.", ["🦋", "🐞", "❤️", "⭐", "🌸", "🍀"])),
    CHK(mc("A butterfly's wings are the same on both sides. This is called...", "symmetry", ["a corner", "a face"], { hint: "Mirror image.", why: "When both sides match it is symmetry.", tag: "shape.symmetry" })),
    H("Stop 2: Islamic patterns"),
    SAY("Many mosques have beautiful tile patterns. They use shapes that fit together with no gaps, like squares, triangles and stars. The patterns repeat again and again. Many of them are symmetrical too. Look at a pattern and ask: what shapes can I see? What repeats? Where is the mirror line?", T("Islamic tile patterns use shapes that repeat, and many are symmetrical.", "Look for squares, triangles and stars.")),
    IMG("🕌", "Islamic tile patterns repeat shapes and are often symmetrical."),
    REVEAL("Which shape has the most lines of symmetry: a circle, a square or a triangle? Have a think first.", "A circle has endless lines of symmetry. A square has 4. An equilateral triangle has 3."),
    CHK(mc("A pattern that repeats again and again is called...", "a repeating pattern", ["a corner", "a mirror line"], { hint: "It goes on and on.", why: "A repeating pattern repeats the same shapes.", tag: "shape.patterns" })),
    SAY("Remember. Symmetry means both halves match. The fold is the mirror line. Patterns repeat shapes.", SUM("Symmetry means both halves match", "The fold is the mirror line", "Patterns repeat shapes")),
    GLOSS({ symmetry: "When one half is the mirror image of the other.", "line of symmetry": "The line you could fold along so both halves match.", pattern: "Shapes or colours that repeat.", mosque: "A place where Muslims pray.", tile: "A flat piece used to cover a floor or wall." }),
  ],
  mini: [
    tf("A heart has a line of symmetry.", true, { hint: "Fold it down the middle.", why: "Both halves of a heart match." }),
    num("How many lines of symmetry does a square have?", 4, { hint: "Across, down and two corners.", why: "A square has 4 lines of symmetry." }),
    mc("A mirror line is also called a...", "line of symmetry", ["corner", "face"], { hint: "The fold.", why: "A mirror line is a line of symmetry." }),
    tf("A pattern repeats the same shapes.", true, { hint: "Repeats again and again.", why: "A pattern repeats." }),
  ],
};

const turns = {
  id: "turns", kind: "use", title: "Turns and directions",
  blocks: [
    H("Stop 1: Left, right and turns"),
    SAY("We use turns to give directions. A quarter turn is a turn to the left or the right. A half turn takes us all the way around to face the other way. A whole turn takes us right back to where we started. Look at the robot. It faces right. If it makes a quarter turn to the right, it will face down.", T("A **quarter turn** is a turn to the left or right. A **half turn** faces the other way.", "A whole turn takes you back to the start.")),
    EXPP("The robot turns",
      SS("The robot faces right, on its grid.", S("The robot faces right.", RG("r", 0, 0, "right"))),
      SS("A quarter turn to the right. Now it faces down.", S("A quarter turn right: facing down.", RG("r", 0, 0, "down", 50, 46, 3, "pulse"))),
      SS("Another quarter turn. Now it faces left. Two quarter turns make a half turn.", S("Two quarter turns make a half turn.", RG("r", 0, 0, "left", 50, 46, 3, "pulse")))),
    CHK(mc("How many quarter turns make a whole turn?", "4", ["2", "3"], { hint: "Think of four quarters.", why: "4 quarter turns make a whole turn.", tag: "shape.turns" })),
    H("Stop 2: Giving directions"),
    SAY("Now be the robot's boss. Tell it to move forward two squares, then turn right, then forward one square. Where does it end up? Walk the steps yourself in the room. Giving clear directions is also what coders do when they write programs.", T("Give directions with moves and turns. Coders do this too.", "Forward 2, turn right, forward 1.")),
    EXPP("Move the robot",
      SS("The robot starts here, facing right. Forward two squares.", S("Forward 2.", RG("r", 2, 0, "right"))),
      SS("Turn right, now facing down. Forward one square. It ends up here.", S("Turn right, forward 1.", RG("r", 2, 1, "down", 50, 46, 3, "pulse")))),
    REVEAL("The robot faces right and makes a half turn. Which way does it face now? Have a think first.", "Left. A half turn faces the opposite way."),
    CHK(mc("You face forward and make a half turn. Which way are you facing now?", "Backwards", ["Forwards", "Sideways"], { hint: "Half way round.", why: "A half turn faces the opposite way.", tag: "shape.turns" })),
    SAY("Remember. A quarter turn is left or right. A half turn faces the other way. Give directions with moves and turns.", SUM("A quarter turn is left or right", "A half turn faces the other way", "Give directions with moves and turns")),
    GLOSS({ "quarter turn": "A turn to the left or right.", "half turn": "A turn to face the opposite way.", direction: "The way something is facing or moving.", forward: "Straight ahead." }),
  ],
  mini: [
    num("How many half turns make a whole turn?", 2, { hint: "Half plus half.", why: "2 half turns make a whole turn." }),
    mc("A quarter turn to the right from facing up faces...", "right", ["left", "down"], { hint: "Turn like a clock hand.", why: "Up turned right is right." }),
    tf("A whole turn leaves you facing the same way.", true, { hint: "All the way round.", why: "A whole turn takes you back to the start." }),
    mc("Which turn faces the opposite way?", "Half turn", ["Quarter turn", "Whole turn"], { hint: "Half way round.", why: "A half turn faces the opposite way." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Zara finds shapes in the mosque", backdrop: "town", caption: "Zara spots shapes, symmetry and turns on a walk.",
  scenes: [
    { caption: "Shapes on a walk.", say: "Zara goes for a walk with her brother. She spots shapes everywhere.",
      items: [{ id: "z", emoji: "👧", label: "Zara", x: 25, y: 56, size: 3, enter: "walk_right" }, { id: "s", emoji: "🔷", x: 72, y: 40, size: 3, enter: "pop" }] },
    { caption: "A cube, a sphere, a cone.", say: "A dice is a cube. A ball is a sphere. A party hat is a cone.",
      items: [{ id: "a", emoji: "🎲", label: "cube", x: 22, y: 46, size: 3, enter: "pop" }, { id: "b", emoji: "⚽", label: "sphere", x: 50, y: 46, size: 3, enter: "pop" }, { id: "c", emoji: "🍦", label: "cone", x: 78, y: 46, size: 3, enter: "pop" }] },
    { caption: "Tile pattern.", say: "At the mosque there is a tile pattern. Squares and triangles repeat.",
      items: [{ id: "m", emoji: "🕌", label: "mosque", x: 50, y: 40, size: 3, enter: "grow" }] },
    { caption: "A mirror line.", say: "Fold the star down the middle. Both halves match. That is symmetry!",
      items: [{ id: "t", emoji: "⭐", label: "mirror line", x: 50, y: 46, size: 3, effect: "glow" }] },
    { caption: "A robot facing right.", say: "Zara's brother has a toy robot. It faces right.",
      items: [{ id: "r", prop: { kind: "robot_grid", col: 0, row: 0, facing: "right" }, x: 50, y: 46, size: 3, enter: "grow" }] },
    { caption: "A quarter turn.", say: "A quarter turn to the right. Now the robot faces down.",
      items: [{ id: "r", prop: { kind: "robot_grid", col: 0, row: 0, facing: "down" }, x: 50, y: 46, size: 3, effect: "sparkle" }] },
    { caption: "A half turn.", say: "Another quarter turn makes a half turn. It faces left!",
      items: [{ id: "r", prop: { kind: "robot_grid", col: 0, row: 0, facing: "left" }, x: 50, y: 46, size: 3, effect: "sparkle" }] },
    { caption: "Shukriya, Zara!", say: "Shapes, symmetry and turns are everywhere. Shukriya, Zara!",
      items: [{ id: "z", emoji: "👧", x: 30, y: 56, size: 3, anim: "bounce" }, { id: "h", emoji: "⭐", x: 70, y: 40, size: 3, effect: "hearts" }] },
  ],
};

export const topics = [
  topicLesson({
    slug: "maths-class-1-shape", subject: "maths", cls: 1, topic: 8, title: "Shape and Position",
    summary: "Flat and solid shapes, symmetry, Islamic patterns, and turns and directions.",
    unit: "Topic 8: Shape and position", difficulty: 1,
    objectives: ["Name and describe flat and solid shapes", "Spot symmetry and patterns", "Use turns and directions"],
    success_criteria: ["I can name flat shapes by their sides", "I can name solid shapes", "I can spot a line of symmetry", "I can use quarter and half turns"],
    real_life: "Spotting shapes at home, patterns in mosques and giving directions.",
    standards: [
      { framework: "nc_england", code: "Y2 geometry", text: "Identify and describe the properties of 2-D and 3-D shapes; order and arrange mathematical objects in patterns; use mathematical vocabulary to describe position, direction and movement" },
      { framework: "cambridge", code: "2Gg.01" }, { framework: "cambridge", code: "2Gg.02" }, { framework: "cambridge", code: "2Gg.05" }, { framework: "cambridge", code: "2Gp.01" },
    ],
    warm_up: [
      num("How many sides does a triangle have?", 3, { hint: "Tri means three.", why: "A triangle has 3 sides." }),
      num("What is 4 + 4?", 8, { hint: "Double 4.", why: "4 + 4 = 8." }),
      tf("A circle has corners.", false, { hint: "It is round.", why: "A circle has no corners." }),
    ],
    intro: [],
    subs: [flat, solid, symmetry, turns],
    clip,
    quiz: [
      { q: num("How many sides does a square have?", 4, { hint: "Count the edges.", why: "A square has 4 sides.", tag: "shape.sides" }), sub: "flat", depth: "recall", alts: [num("How many corners does a rectangle have?", 4, { hint: "Count where sides meet.", why: "A rectangle has 4 corners.", tag: "shape.sides" }), num("How many sides does a pentagon have?", 5, { hint: "Penta means five.", why: "A pentagon has 5 sides.", tag: "shape.sides" })] },
      { q: tf("A circle has 3 corners.", false, { hint: "A circle is round.", why: "A circle has no corners.", tag: "shape.sides" }), sub: "flat", depth: "recall", alts: [tf("A triangle has 3 corners.", true, { hint: "Count where sides meet.", why: "A triangle has 3 corners.", tag: "shape.sides" }), tf("A hexagon has 4 sides.", false, { hint: "Hex means six.", why: "A hexagon has 6 sides.", tag: "shape.sides" })] },
      { q: mc("Which solid shape is like a dice?", "Cube", ["Sphere", "Cone"], { hint: "Six square faces.", why: "A dice is a cube.", tag: "shape.solid" }), sub: "solid", depth: "recall", alts: [mc("Which solid shape is like a football?", "Sphere", ["Cube", "Cylinder"], { hint: "Round all over.", why: "A football is a sphere.", tag: "shape.solid" }), mc("Which solid shape is like a party hat?", "Cone", ["Cube", "Sphere"], { hint: "It has a point.", why: "A party hat is a cone.", tag: "shape.solid" })] },
      { q: fill("Finish the sentences.", "A cube has {b1} faces. A triangle has {b2} sides.", [["6", "4", "8"], ["3", "4", "5"]], { hint: "Think of a dice.", why: "A cube has 6 faces and a triangle has 3 sides.", tag: "shape.properties" }), sub: "solid", depth: "apply", alts: [fill("Complete the sentences.", "A square has {b1} sides. A circle has {b2} corners.", [["4", "3", "5"], ["0", "1", "4"]], { hint: "A circle is round.", why: "A square has 4 sides and a circle has 0 corners.", tag: "shape.properties" }), fill("Fill in the gaps.", "A hexagon has {b1} sides. A rectangle has {b2} corners.", [["6", "5", "8"], ["4", "3", "5"]], { hint: "Hex means six.", why: "A hexagon has 6 sides and a rectangle has 4 corners.", tag: "shape.properties" })] },
      { q: ms("Which shapes have 4 sides? Pick two.", ["Square", "Rectangle"], ["Triangle", "Circle"], { hint: "Count the sides.", why: "A square and a rectangle both have 4 sides.", tag: "shape.sides" }), sub: "flat", depth: "apply", alts: [ms("Which shapes have no straight sides? Pick two.", ["Circle", "Oval"], ["Square", "Triangle"], { hint: "Round shapes.", why: "A circle and an oval have no straight sides.", tag: "shape.sides" }), ms("Which shapes have corners? Pick two.", ["Triangle", "Square"], ["Circle", "Oval"], { hint: "Where two sides meet.", why: "A triangle and a square both have corners.", tag: "shape.sides" })] },
      { q: ord("Put these shapes in order of the number of sides, fewest first.", ["Triangle", "Square", "Pentagon", "Hexagon"], { hint: "Count the sides of each.", why: "3, 4, 5 and 6 sides in order.", tag: "shape.sides" }), sub: "flat", depth: "apply", alts: [ord("Order these shapes by number of sides, fewest first.", ["Circle", "Triangle", "Rectangle", "Hexagon"], { hint: "Count the sides of each.", why: "0, 3, 4 and 6 sides in order.", tag: "shape.sides" }), ord("Arrange these shapes, fewest sides first.", ["Triangle", "Rectangle", "Pentagon", "Hexagon"], { hint: "Count the sides of each.", why: "3, 4, 5 and 6 sides in order.", tag: "shape.sides" })] },
      { q: mat("Match each solid shape to a real thing.", [["Cube", "Dice"], ["Sphere", "Football"], ["Cylinder", "Tin of beans"]], { hint: "Think of the shape.", why: "A dice is a cube, a football is a sphere, a tin is a cylinder.", tag: "shape.solid" }), sub: "solid", depth: "apply", alts: [mat("Join each solid shape to a real thing.", [["Cone", "Ice cream cone"], ["Sphere", "Marble"], ["Cube", "Building block"]], { hint: "Think of the shape.", why: "An ice cream cone is a cone, a marble is a sphere, a block is a cube.", tag: "shape.solid" }), mat("Pair each solid shape with a real thing.", [["Cylinder", "Drinks can"], ["Cone", "Party hat"], ["Cuboid", "Cereal box"]], { hint: "Think of the shape.", why: "A can is a cylinder, a party hat is a cone, a cereal box is a cuboid.", tag: "shape.solid" })] },
      { q: hot("Tap the shape that has symmetry.", [["🦋", "A butterfly", 22, 50], ["🧩", "A jigsaw piece", 50, 50], ["🪨", "A rough rock", 78, 50]], ["A butterfly"], { labels: true, hint: "Both halves match.", why: "A butterfly's wings match.", tag: "shape.symmetry" }), sub: "symmetry", depth: "apply", alts: [hot("Tap the thing that is symmetrical.", [["🪨", "A rough rock", 22, 50], ["❤️", "A heart", 50, 50], ["🧩", "A jigsaw piece", 78, 50]], ["A heart"], { labels: true, hint: "Both halves match.", why: "A heart's two halves match.", tag: "shape.symmetry" }), hot("Tap the shape that has a mirror line.", [["⭐", "A star", 22, 50], ["🪨", "A rough rock", 50, 50], ["🧩", "A jigsaw piece", 78, 50]], ["A star"], { labels: true, hint: "Both halves match.", why: "A star has mirror lines.", tag: "shape.symmetry" })] },
      { q: sld("Slide to show how many lines of symmetry a square has.", { min: 0, max: 8 }, 4, 0, { hint: "Across, down and two corner to corner.", why: "A square has 4 lines of symmetry.", tag: "shape.symmetry" }), sub: "symmetry", depth: "apply", alts: [sld("Slide to show how many sides a hexagon has.", { min: 0, max: 8 }, 6, 0, { hint: "Hex means six.", why: "A hexagon has 6 sides.", tag: "shape.sides" }), sld("Slide to show how many faces a cube has.", { min: 0, max: 8 }, 6, 0, { hint: "Think of a dice.", why: "A cube has 6 faces.", tag: "shape.solid" })] },
      { q: mc("A robot faces up and makes a quarter turn to the right. Which way does it face?", "Right", ["Left", "Down"], { hint: "Turn like a clock hand.", why: "Up turned right is right.", tag: "shape.turns" }), sub: "turns", depth: "apply", alts: [mc("A robot faces right and makes a quarter turn to the right. Which way does it face?", "Down", ["Up", "Left"], { hint: "Turn like a clock hand.", why: "Right turned right is down.", tag: "shape.turns" }), mc("A robot faces down and makes a half turn. Which way does it face?", "Up", ["Left", "Right"], { hint: "Half way round.", why: "A half turn faces the opposite way.", tag: "shape.turns" })] },
      { q: num("How many quarter turns make a half turn?", 2, { hint: "Quarter plus quarter.", why: "2 quarter turns make a half turn.", tag: "shape.turns" }), sub: "turns", depth: "apply", alts: [num("A robot turns a quarter turn four times. How many whole turns is that?", 1, { hint: "Four quarters make a whole.", why: "4 quarter turns make 1 whole turn.", tag: "shape.turns" }), num("You do two half turns in a row. How many whole turns is that?", 1, { hint: "Half and half.", why: "2 half turns make 1 whole turn.", tag: "shape.turns" })] },
      { q: mc("Hana says a circle has 4 corners because it is round. Is she right?", "No. A circle has no corners, because it has no straight sides", ["Yes, a circle has 4 corners", "No, a circle has 2 corners"], { hint: "Corners are where two sides meet.", why: "A circle has no sides, so no corners.", tag: "shape.reason" }), sub: "flat", depth: "reason", alts: [mc("Omar says a triangle has 4 sides. Is he right?", "No. A triangle has 3 sides", ["Yes, a triangle has 4 sides", "No, a triangle has 5 sides"], { hint: "Count the sides.", why: "A triangle has 3 sides.", tag: "shape.reason" }), mc("Mina says a cube has 4 faces. Is she right?", "No. A cube has 6 faces, like a dice", ["Yes, a cube has 4 faces", "No, a cube has 8 faces"], { hint: "Think of a dice.", why: "A cube has 6 faces.", tag: "shape.reason" })] },
      { q: mc("Why does a sphere roll but a cube does not roll easily?", "A sphere is round all over, but a cube has flat faces and corners", ["A sphere is heavier", "A cube is smaller"], { hint: "Think of a ball and a dice.", why: "A sphere is round, so it rolls. A cube has flat faces.", tag: "shape.reason" }), sub: "solid", depth: "reason", alts: [mc("Why does a tin of beans roll on its side but not stand easily on a point?", "A cylinder has a curved side that rolls", ["It is heavy", "It is a cube"], { hint: "Think of a tin rolling.", why: "A cylinder has a curved side, so it rolls on its side.", tag: "shape.reason" }), mc("Why can you stack cubes but not spheres?", "Cubes have flat faces, but spheres are round and roll away", ["Spheres are heavier", "Cubes are bigger"], { hint: "Think about flat faces.", why: "Flat faces stack. Round shapes roll.", tag: "shape.reason" })] },
      { q: mc("Sara folds a heart down the middle and both halves match. What does this show?", "The fold is a line of symmetry", ["The heart has corners", "The heart is a cube"], { hint: "Both halves are mirror images.", why: "When both halves match, the fold is a line of symmetry.", tag: "shape.reason" }), sub: "symmetry", depth: "reason", alts: [mc("Zain folds a butterfly's picture and both wings match. What does this show?", "The fold is a line of symmetry", ["The butterfly has corners", "The butterfly is a cone"], { hint: "Both halves are mirror images.", why: "When both halves match, the fold is a line of symmetry.", tag: "shape.reason" }), mc("Layla folds a leaf and one half is much bigger. What does this show?", "The leaf is not symmetrical", ["The leaf is a cube", "The leaf has corners"], { hint: "Do both halves match?", why: "If the halves do not match, it is not symmetrical.", tag: "shape.reason" })] },
      { q: mc("A robot faces left and makes a half turn. Aisha says it now faces left again. Is she right?", "No. A half turn faces the opposite way, so it now faces right", ["Yes, it faces left again", "No, it faces up"], { hint: "Half way round.", why: "A half turn faces the opposite way, so left becomes right.", tag: "shape.reason" }), sub: "turns", depth: "reason", alts: [mc("A robot faces up and makes a half turn. Ravi says it now faces up. Is he right?", "No. A half turn faces the opposite way, so it now faces down", ["Yes, it faces up again", "No, it faces right"], { hint: "Half way round.", why: "A half turn faces the opposite way, so up becomes down.", tag: "shape.reason" }), mc("A robot faces right and makes a whole turn. Sana says it faces left. Is she right?", "No. A whole turn brings it back to face right", ["Yes, it faces left", "No, it faces down"], { hint: "All the way round.", why: "A whole turn brings it back to the start.", tag: "shape.reason" })] },
      // ----- upgrade: 15 new mains (q16-q30), 1 variant each
      N(tf("A cone has one flat circle and a point.", true, { hint: "Think of an ice cream cone.", why: "A cone has one flat circular face and one point.", tag: "shape.solid" }), "solid", "recall",
        [tf("A cylinder has a point.", false, { hint: "Think of a tin.", why: "A cylinder has two flat circles and no point.", tag: "shape.solid" })]),
      N(fill("Count the faces and corners.", "A cube has {b1} faces and {b2} corners.", [["6", "4", "8"], ["8", "6", "12"]], { hint: "Think of a dice.", why: "A cube has 6 faces and 8 corners.", tag: "shape.properties" }), "solid", "apply",
        [fill("Count the sides and corners.", "A pentagon has {b1} sides and {b2} corners.", [["5", "4", "6"], ["5", "4", "6"]], { hint: "Penta means five.", why: "A pentagon has 5 sides and 5 corners.", tag: "shape.properties" })]),
      N(ms("Which two shapes are flat shapes? Pick two.", ["Hexagon", "Pentagon"], ["Sphere", "Cube"], { hint: "Flat shapes can be drawn on paper.", why: "A hexagon and a pentagon are flat 2D shapes.", tag: "shape.names" }), "flat", "apply",
        [ms("Which two shapes are flat shapes? Choose two.", ["Triangle", "Circle"], ["Cone", "Cylinder"], { hint: "Flat shapes can be drawn on paper.", why: "A triangle and a circle are flat 2D shapes.", tag: "shape.names" })]),
      N(ord("Put these turns in order, smallest first.", ["Quarter turn", "Half turn", "Three-quarter turn", "Whole turn"], { hint: "Think of 1, 2, 3 and 4 quarters.", why: "A quarter, a half, three quarters and a whole turn go up in order.", tag: "shape.turns" }), "turns", "apply",
        [ord("Order these turns, smallest first.", ["Quarter turn", "Half turn", "Whole turn", "Two whole turns"], { hint: "Think of quarters and wholes.", why: "A quarter, a half, a whole and two whole turns go up in order.", tag: "shape.turns" })]),
      N(mat("Match each solid shape to the flat shape on its faces.", [["Cube", "Square faces"], ["Cylinder", "Circle ends"], ["Cone", "Circle base"]], { hint: "Each face of a solid is a flat shape.", why: "A cube has square faces, a cylinder has circle ends and a cone has a circle base.", tag: "shape.faces" }), "solid", "apply",
        [mat("Match each solid shape to its flat faces.", [["Cuboid", "Rectangle faces"], ["Cylinder", "Circle ends"], ["Sphere", "No flat faces"]], { hint: "Each face of a solid is a flat shape.", why: "A cuboid has rectangle faces, a cylinder circle ends and a sphere no flat faces.", tag: "shape.faces" })]),
      N(hot("Tap the shape that is a hexagon.", [["🔷", "A: 6 sides", 22, 50], ["🔷", "B: 5 sides", 50, 50], ["🔷", "C: 3 sides", 78, 50]], ["A: 6 sides"], { labels: true, hint: "Hex means six.", why: "A hexagon has 6 sides.", tag: "shape.names" }), "flat", "apply",
        [hot("Tap the shape that is a pentagon.", [["🔷", "A: 6 sides", 22, 50], ["🔷", "B: 5 sides", 50, 50], ["🔷", "C: 3 sides", 78, 50]], ["B: 5 sides"], { labels: true, hint: "Penta means five.", why: "A pentagon has 5 sides.", tag: "shape.names" })]),
      N(sld("Slide to show how many edges a cube has.", { min: 0, max: 14 }, 12, 0, { hint: "4 on the top, 4 on the bottom and 4 going down.", why: "A cube has 12 edges.", tag: "shape.properties" }), "solid", "apply",
        [sld("Slide to show how many faces a cuboid has.", { min: 0, max: 8 }, 6, 0, { hint: "Think of a cereal box.", why: "A cuboid has 6 faces.", tag: "shape.properties" })]),
      N(mc("Which solid shape has one flat circle and a point?", "Cone", ["Cylinder", "Sphere"], { hint: "Think of a party hat.", why: "A cone has one flat circle and one point.", tag: "shape.solid" }), "solid", "apply",
        [mc("Which solid shape has two flat circles and a curved side?", "Cylinder", ["Cone", "Cube"], { hint: "Think of a tin.", why: "A cylinder has two flat circles and a curved side.", tag: "shape.solid" })]),
      N(mc("A robot faces up and makes a three-quarter turn to the right. Which way does it face?", "Left", ["Right", "Down"], { hint: "Turn right three times: right, down, left.", why: "Three quarter turns right from up is right, down, then left.", tag: "shape.turns" }), "turns", "apply",
        [mc("A robot faces right and makes a three-quarter turn to the right. Which way does it face?", "Up", ["Down", "Left"], { hint: "Turn right three times: down, left, up.", why: "Three quarter turns right from right is down, left, then up.", tag: "shape.turns" })]),
      N(num("A robot moves forward 3 squares, turns right, then moves forward 2 squares. How many squares did it move in all?", 5, { hint: "Turning does not move it. Add the moves.", why: "3 + 2 = 5 squares.", tag: "shape.route" }), "turns", "apply",
        [num("A robot moves forward 4 squares, turns left, then moves forward 3 squares. How many squares did it move in all?", 7, { hint: "Turning does not move it. Add the moves.", why: "4 + 3 = 7 squares.", tag: "shape.route" })]),
      N(mc("Which shape is a clock on the wall?", "Circle", ["Square", "Triangle"], { hint: "It is round.", why: "A wall clock is a circle.", tag: "shape.real_life" }), "flat", "apply",
        [mc("Which shape is a classroom door?", "Rectangle", ["Circle", "Triangle"], { hint: "Four sides, two long and two short.", why: "A door is a rectangle.", tag: "shape.real_life" })]),
      N(mc("Omar says a square is not a rectangle. Is he right?", "No. A square has 4 sides and 4 corners, so it is a special rectangle", ["Yes, they are different shapes", "No, a square is a triangle"], { hint: "Count the sides and corners.", why: "A square has 4 sides and 4 square corners, like a rectangle. It is a rectangle with equal sides.", tag: "shape.reason_square" }), "flat", "reason",
        [mc("Sam says a square cannot be a rectangle because all its sides are equal. Is he right?", "No. A square has 4 sides and 4 corners, so it is a special rectangle", ["Yes, they are different shapes", "No, a square is a circle"], { hint: "Count the sides and corners.", why: "A square has 4 sides and 4 square corners, like a rectangle. It is a rectangle with equal sides.", tag: "shape.reason_square" })]),
      N(mc("Zainab says a cylinder has 3 flat faces. Is she right?", "No. It has 2 flat faces and one curved surface", ["Yes, 3 flat faces", "No, it has 1 flat face"], { hint: "Run your finger over a tin.", why: "A cylinder has 2 flat circles. The curved side is a surface, not a flat face.", tag: "shape.reason_faces" }), "solid", "reason",
        [mc("Ben says a cone has 3 flat faces. Is he right?", "No. It has 1 flat face and one curved surface", ["Yes, 3 flat faces", "No, it has 2 flat faces"], { hint: "Run your finger over a cone.", why: "A cone has 1 flat circle. The curved side is a surface, not a flat face.", tag: "shape.reason_faces" })]),
      N(mc("Ben says the line from corner to corner on a rectangle is a line of symmetry. Is he right?", "No. If you fold along it, the two halves do not match", ["Yes, any line down the middle works", "No, a rectangle has no lines of symmetry"], { hint: "Imagine folding it along that line.", why: "Folding a rectangle corner to corner leaves the halves not matching. Its lines go through the middle of the sides.", tag: "shape.reason_symmetry" }), "symmetry", "reason",
        [mc("Mina says any line down the middle of a shape is a line of symmetry. Is she right?", "No. Both halves must match when you fold", ["Yes, any middle line works", "No, shapes never have symmetry"], { hint: "Imagine folding along the line.", why: "A line of symmetry must make two halves that match exactly.", tag: "shape.reason_symmetry" })]),
      N(mc("Mina says a cube is a square because a cube has square faces. Is she right?", "No. A cube is a solid shape. A square is a flat shape", ["Yes, they are the same", "No, a cube is a circle"], { hint: "Can you pick it up?", why: "A square is flat, but a cube is solid. A cube has square faces.", tag: "shape.reason_2d_3d" }), "solid", "reason",
        [mc("Ali says a sphere is a circle because it is round. Is he right?", "No. A sphere is a solid shape. A circle is a flat shape", ["Yes, they are the same", "No, a sphere is a square"], { hint: "Can you pick it up?", why: "A circle is flat, but a sphere is solid like a ball.", tag: "shape.reason_2d_3d" })]),
    ],
  }),
];
