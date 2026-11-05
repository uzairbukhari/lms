import { SAY, SS, H, T, IMG, TIP, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Class 4 (Fatima) Maths topic 5: Shape and position. Standards from docs/CURRICULUM_V2.md.
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });
const clock = (id, hour, minute, x = 50, y = 50, size = 3) => [id, { kind: "clock", hour, minute }, x, y, size];
const AX = [["x1", "🔹", 35, 84, 1, "none", "1"], ["x2", "🔹", 50, 84, 1, "none", "2"], ["x3", "🔹", 65, 84, 1, "none", "3"], ["y1", "🔹", 12, 62, 1, "none", "1"], ["y2", "🔹", 12, 44, 1, "none", "2"]];
const grid = (id, col, row, facing = "right", x = 50, y = 50, size = 3) => [id, { kind: "robot_grid", col, row, facing }, x, y, size];

const angles = {
  id: "shapes_angles", kind: "learn", title: "Angles and polygons",
  blocks: [
    H("Stop 1: Angles"),
    SAY("An angle is the amount of turn between two lines that meet at a point. We measure angles in degrees. Look at a clock. At three o'clock, the hands make a square corner. That is a right angle, exactly ninety degrees. An angle smaller than a right angle is acute. An angle bigger than a right angle, but smaller than a straight line, is obtuse. A straight line is one hundred and eighty degrees.", T("An **angle** is a turn. A **right angle** is 90°. **Acute** is smaller than 90°. **Obtuse** is bigger than 90° but smaller than 180°.", "A straight line is 180°.")),
    EXPP("Angles on a clock",
      SS("At two o'clock the hands make a small, sharp angle. That is an acute angle, sixty degrees.", S("Acute: 60°", clock("c", 2, 0))),
      SS("At three o'clock the hands make a square corner. That is a right angle, ninety degrees.", S("Right angle: 90°", clock("c", 3, 0))),
      SS("At four o'clock the hands open wider. That is an obtuse angle, one hundred and twenty degrees.", S("Obtuse: 120°", clock("c", 4, 0))),
      SS("At six o'clock the hands make a straight line. That is one hundred and eighty degrees.", S("Straight line: 180°", clock("c", 6, 0)))),
    CHK(mc("A clock shows two o'clock. What kind of angle do the hands make?", "Acute", ["Right", "Obtuse"], { hint: "Is it smaller or bigger than a square corner?", why: "At two o'clock the angle is 60°, smaller than a right angle, so it is acute.", tag: "shape.angles" })),
    H("Stop 2: Polygons"),
    SAY("A polygon is a flat shape with straight sides. We name polygons by how many sides they have. Three sides make a triangle. Four make a quadrilateral. Five make a pentagon. Six make a hexagon. Eight make an octagon. A square is a special quadrilateral: it has four equal sides and four right angles. A rectangle has four right angles and opposite sides equal. So every square is a rectangle, but not every rectangle is a square.", T("A **polygon** has straight sides. 3 triangle, 4 quadrilateral, 5 pentagon, 6 hexagon, 8 octagon.", "A square is a special rectangle with four equal sides.")),
    IMG("🔺⬛⬠⬡🛑", "Triangle, square, pentagon, hexagon and octagon."),
    CHK(num("How many sides does a heptagon have?", 7, { hint: "Hepta means seven.", why: "A heptagon has 7 sides.", tag: "shape.polygons" })),
    SAY("Remember. Angles are turns. Right is 90, acute is smaller and obtuse is bigger. Polygons are named by their sides.", SUM("Right angle 90°, acute smaller, obtuse bigger", "A straight line is 180°", "Polygons are named by their number of sides")),
    GLOSS({ angle: "The amount of turn between two lines that meet.", "right angle": "A square corner, 90 degrees.", acute: "An angle smaller than a right angle.", obtuse: "An angle bigger than a right angle but smaller than a straight line.", polygon: "A flat shape with straight sides.", degrees: "The unit we use to measure angles." }),
  ],
  mini: [
    tf("A right angle is 90°.", true, { hint: "Think of a square corner.", why: "A right angle is 90 degrees." }),
    mc("An angle of 120° is...", "obtuse", ["acute", "right"], { hint: "Bigger than 90°?", why: "120° is more than 90°, so it is obtuse." }),
    num("How many sides does a triangle have?", 3, { hint: "Tri means three.", why: "A triangle has 3 sides." }),
    mc("Which is a quadrilateral?", "A square", ["A triangle", "A pentagon"], { hint: "Quad means four.", why: "A square has four sides." }),
  ],
};

const symmetry = {
  id: "symmetry", kind: "try", title: "Symmetry and Islamic star patterns",
  blocks: [
    H("Stop 1: Lines of symmetry"),
    SAY("A shape is symmetrical if you can fold it in half and both sides match exactly. The fold line is called the line of symmetry, or mirror line. Look at the butterfly. Fold it down the middle, and the two wings match. A square has four lines of symmetry. A rectangle that is not a square has two.", T("A shape is **symmetrical** if one half matches the other. The fold is the **line of symmetry**.", "A square has 4 lines of symmetry. A rectangle has 2.")),
    EXPP("Folding a butterfly",
      SS("Here is a butterfly with its wings open.", S("A butterfly", ["b", "🦋", 50, 50, 3, "none", "butterfly"])),
      SS("Draw a line down the middle. This is the line of symmetry.", S("The line of symmetry", ["b", "🦋", 50, 50, 3, "none"], ["l", "│", 50, 50, 3, "pulse"])),
      SS("Fold along the line and the left wing sits exactly on the right wing. They match, so the butterfly is symmetrical.", S("Both halves match", ["b", "🦋", 38, 50, 3, "none", "left"], ["m", "🦋", 62, 50, 3, "pulse", "right"]))),
    CHK(num("How many lines of symmetry does the letter H have?", 2, { hint: "Fold across and down.", why: "The letter H has 2 lines of symmetry.", tag: "shape.symmetry" })),
    SAY("Now try it with shapes. Here are twenty tiles. Make a symmetrical pattern, with the left matching the right.", MAN("Mirror pattern", "Place the tiles in the boxes so the left side is a mirror of the right side.", "🔷", 20, ["Left side", "Right side"])),
    H("Stop 2: Islamic star patterns"),
    SAY("Many mosques have beautiful tile patterns made from symmetrical stars. These patterns are built from simple shapes, like squares, triangles and hexagons, repeated again and again. They have many lines of symmetry. An eight-pointed star has eight lines of symmetry. Artists planned them with only a ruler and compass.", T("Islamic star patterns use **repeating** shapes with many lines of symmetry.", "An eight-pointed star has 8 lines of symmetry.")),
    IMG("🕌✴️", "Star patterns on mosque tiles use repeating shapes and symmetry."),
    CHK(tf("A scalene triangle has 3 lines of symmetry.", false, { hint: "Can you fold it so it matches?", why: "A scalene triangle has no lines of symmetry.", tag: "shape.symmetry" })),
    SAY("Try it at home.", ACT("Make a star pattern", ["Squared paper", "Pencil and ruler", "Coloured pencils"], ["Draw a square and its two diagonals.", "Add a second square turned a little.", "Colour the pattern so it is symmetrical.", "Count the lines of symmetry in your design."])),
    SAY("Remember. A shape is symmetrical if one half is the mirror of the other. Patterns use repeating shapes.", SUM("Symmetrical shapes fold to match", "The fold is the line of symmetry", "Islamic patterns repeat shapes with lots of symmetry")),
    GLOSS({ symmetrical: "A shape that matches when folded along a line.", "line of symmetry": "The fold line that makes both halves match.", repeating: "Happening again and again.", pattern: "Shapes or colours that repeat in an order." }),
  ],
  mini: [
    num("How many lines of symmetry does a regular pentagon have?", 5, { hint: "One through each corner.", why: "It has 5 lines." }),
    tf("A rectangle has 2 lines of symmetry.", true, { hint: "Fold across and down.", why: "A rectangle that is not a square has 2." }),
    mc("Which shape has no lines of symmetry?", "Scalene triangle", ["Square", "Circle"], { hint: "Try folding it.", why: "A scalene triangle has no matching halves." }),
  ],
};

const coords = {
  id: "coordinates", kind: "play", title: "Coordinates and reflection",
  blocks: [
    H("Stop 1: Reading coordinates"),
    SAY("Coordinates tell us exactly where a point is on a grid. Two numbers in brackets. The first number says how far across, the second says how far up. Think of it as along the corridor, then up the stairs. The point three, two is three across and two up. Always across first, then up.", T("**Coordinates** give a position: (3, 2) means 3 across and 2 up.", "Across first, then up.")),
    EXPP("Finding (3, 2)",
      SS("Start at zero, zero in the bottom left corner. The numbers along the bottom count across. The numbers up the side count up.", S("(0, 0)", ["o", "🏁", 12, 80, 2, "pulse", "(0, 0)"], ...AX)),
      SS("Move three squares across.", S("3 across", ["o", "🏁", 12, 80, 2, "none", "(0, 0)"], ...AX, ["p", "📍", 65, 76, 3, "pulse"])),
      SS("Then two squares up. We are at three, two.", S("then 2 up: (3, 2)", ["o", "🏁", 12, 80, 2, "none", "(0, 0)"], ...AX, ["p", "📍", 65, 44, 3, "pulse", "(3, 2)"]))),
    CHK(mc("Which point is 4 across and 1 up?", "(4, 1)", ["(1, 4)", "(4, 4)"], { hint: "Across first, then up.", why: "(4, 1) means 4 across and 1 up.", tag: "shape.coordinates" })),
    H("Stop 2: Mirror images"),
    SAY("When we reflect a shape in a mirror line, every point is the same distance from the mirror, but on the other side. If the mirror is a vertical line, a point two squares to the left of the line ends up two squares to the right. The shape is the same size, just flipped.", T("A **reflection** is a mirror image. Each point is the same distance from the mirror line, on the other side.")),
    EXPP("Reflecting a point",
      SS("A star is two squares to the left of the mirror line.", S("2 left of the mirror", ["s", "⭐", 30, 50, 3, "none", "star"], ["m", "🪞", 50, 50, 3, "none", "mirror"])),
      SS("Its reflection is two squares to the right. Same distance, other side.", S("2 right of the mirror", ["s", "⭐", 30, 50, 3, "none", "star"], ["m", "🪞", 50, 50, 3, "none", "mirror"], ["r", "⭐", 70, 50, 3, "pulse", "reflection"]))),
    CHK(mc("A point is 3 squares left of the mirror. Where is its reflection?", "3 squares right of the mirror", ["3 squares left of the mirror", "6 squares right of the mirror"], { hint: "Same distance, other side.", why: "A reflection is the same distance on the opposite side.", tag: "shape.reflection" })),
    H("Stop 3: Brain break"),
    SAY("Brain break. Find the pairs.", BRAIN("memory_match", "Shape pairs", "Find the matching shapes.", ["🔺", "🟦", "⭐", "🔷", "🟡", "🟩"])),
    CHK(tf("The point (2, 5) is 2 across and 5 up.", true, { hint: "Across first.", why: "The first number is across.", tag: "shape.coordinates" })),
    SAY("Remember. Coordinates are across first, then up. A reflection is the same distance on the other side of the mirror.", SUM("Coordinates: across, then up", "(0, 0) is the corner", "Reflection: same distance, other side")),
    GLOSS({ coordinates: "Numbers that give a position on a grid.", reflection: "A mirror image of a shape.", grid: "Lines that cross to make squares.", axis: "The line along the bottom or up the side of a grid." }),
  ],
  mini: [
    mc("Which point is 2 across and 5 up?", "(2, 5)", ["(5, 2)", "(2, 2)"], { hint: "Across first.", why: "(2, 5)." }),
    num("What is the second number in (4, 7)?", 7, { hint: "It says how far up.", why: "7." }),
    tf("(1, 3) and (3, 1) are the same point.", false, { hint: "Across then up.", why: "They are different points." }),
  ],
};

const solids = {
  id: "solids", kind: "use", title: "3D shapes and nets",
  blocks: [
    H("Stop 1: Faces, edges and vertices"),
    SAY("3D shapes have faces, edges and vertices. A face is a flat surface. An edge is where two faces meet. A vertex is a corner. A cube has six faces, twelve edges and eight vertices. Many buildings use 3D shapes. A minaret is a cylinder, the dome of a mosque is a half sphere, and a pyramid has a square base.", T("**Faces** are flat surfaces, **edges** are where faces meet, and **vertices** are corners.", "A cube has 6 faces, 12 edges and 8 vertices.")),
    IMG("🧊🥫🔺⚽", "Cube, cylinder, pyramid and sphere."),
    CHK(num("How many faces does a cube have?", 6, { hint: "Think of a dice.", why: "A cube has 6 square faces.", tag: "shape.solids" })),
    H("Stop 2: Nets"),
    SAY("A net is a flat pattern that folds up into a 3D shape. The net of a cube is six squares joined together. If you cut a cardboard box along its edges and flatten it, you get a net. Watch six squares fold up into a cube.", T("A **net** is a flat shape that folds into a 3D shape. A cube's net has 6 squares.")),
    EXPP("Folding a cube net",
      SS("Six squares joined in a cross shape. This is a net.", S("A net of 6 squares", ["a", "🟦", 50, 20, 2, "none", "top"], ["b", "🟦", 30, 45, 2, "none", "side"], ["c", "🟦", 50, 45, 2, "none", "front"], ["d", "🟦", 70, 45, 2, "none", "side"], ["e", "🟦", 50, 70, 2, "none", "bottom"], ["f", "🟦", 90, 45, 2, "none", "back"])),
      SS("Fold the sides up. The squares start to make a box.", S("Folding up", ["c", "🟦", 50, 55, 2, "none", "front"], ["b", "🟦", 38, 50, 2, "none", "side"], ["d", "🟦", 62, 50, 2, "none", "side"], ["a", "🟦", 50, 38, 2, "none", "top"])),
      SS("And it is a cube! Six faces, twelve edges and eight vertices.", S("A cube", ["c", "🧊", 50, 50, 3, "pulse", "cube"]))),
    CHK(mc("Which net folds into a cube?", "6 squares in a cross", ["4 squares in a row", "3 squares"], { hint: "A cube has 6 faces.", why: "A cube's net needs 6 squares.", tag: "shape.nets" })),
    SAY("Time to make one.", ACT("Make a cube", ["Squared paper", "Scissors", "Glue or tape"], ["Draw a cross of 6 squares, each 4 cm.", "Cut it out.", "Fold along the lines.", "Tape the edges. Count the faces, edges and corners."])),
    SAY("Remember. 3D shapes have faces, edges and vertices. A net folds into a 3D shape.", SUM("Faces, edges and vertices", "A cube has 6 faces, 12 edges, 8 vertices", "A net is a flat pattern of a 3D shape")),
    GLOSS({ faces: "Flat surfaces of a 3D shape.", edges: "Where two faces meet.", vertices: "Corners of a 3D shape.", net: "A flat pattern that folds into a 3D shape.", cube: "A 3D shape with six square faces." }),
  ],
  mini: [
    num("How many vertices does a square-based pyramid have?", 5, { hint: "4 at the base and 1 at the top.", why: "5 vertices." }),
    mc("What shape is a tin of beans?", "Cylinder", ["Cube", "Cone"], { hint: "It has circle ends.", why: "It is a cylinder." }),
    tf("A square-based pyramid has 5 faces.", true, { hint: "1 square and 4 triangles.", why: "1 + 4 = 5." }),
  ],
};

const ALTS = [
  [mc("Which angle is bigger than a right angle but smaller than a straight line?", "Obtuse", ["Acute", "Right"], { hint: "Between 90° and 180°.", why: "Obtuse angles are between 90° and 180°.", tag: "shape.angles" }), mc("What do we call an angle of exactly 90 degrees?", "A right angle", ["An acute angle", "An obtuse angle"], { hint: "A square corner.", why: "Exactly 90° is a right angle.", tag: "shape.angles" })],
  [num("How many sides does an octagon have?", 8, { hint: "Think of a stop sign.", why: "8 sides.", tag: "shape.polygons" }), num("How many sides does a pentagon have?", 5, { hint: "Penta means five.", why: "5 sides.", tag: "shape.polygons" })],
  [tf("A straight line is 180 degrees.", true, { hint: "Half a full turn.", why: "A straight line is 180°.", tag: "shape.angles" }), tf("An acute angle is bigger than 90°.", false, { hint: "Acute means sharp.", why: "Acute is smaller than 90°.", tag: "shape.angles" })],
  [fill("Finish the sentences about 8-sided shapes.", "A shape with 8 sides is an {b1}. An angle smaller than 90° is {b2}.", [["octagon", "hexagon", "pentagon"], ["acute", "obtuse", "right"]], { hint: "Oct means eight.", why: "Octagon has 8 sides and acute is smaller than 90°.", tag: "shape.language" }), fill("Finish the sentences about 6-sided shapes.", "A shape with 6 sides is a {b1}. An angle of exactly 90° is a {b2} angle.", [["hexagon", "pentagon", "octagon"], ["right", "acute", "obtuse"]], { hint: "Hex means six.", why: "Hexagon has 6 sides and 90° is a right angle.", tag: "shape.language" })],
  [ms("Which shapes can be folded to match exactly? Pick two.", ["Rectangle", "Isosceles triangle"], ["Scalene triangle", "Parallelogram"], { hint: "Look for a mirror line.", why: "Rectangles and isosceles triangles have lines of symmetry.", tag: "shape.symmetry" }), ms("Pick the two shapes that are symmetrical.", ["Square", "Circle"], ["Scalene triangle", "Parallelogram"], { hint: "Look for a mirror line.", why: "Squares and circles have lines of symmetry.", tag: "shape.symmetry" })],
  [ord("Sort these by number of sides, fewest first.", ["triangle", "square", "pentagon", "hexagon"], { hint: "Count the sides.", why: "3, 4, 5, 6.", tag: "shape.polygons" }), ord("Put these turns in order, smallest first.", ["a quarter turn", "a half turn", "a three-quarter turn", "a full turn"], { hint: "Think of how far you turn.", why: "90°, 180°, 270°, 360°.", tag: "shape.angles" })],
  [sld("Slide to show a straight line in degrees.", { min: 0, max: 360, step: 10 }, 180, 0, { hint: "Half a full turn.", why: "A straight line is 180°.", tag: "shape.angles" }), sld("Slide to show a full turn in degrees.", { min: 0, max: 360, step: 10 }, 360, 0, { hint: "All the way round.", why: "A full turn is 360°.", tag: "shape.angles" })],
  [num("How many vertices does a cube have?", 8, { hint: "Count the corners.", why: "8 vertices.", tag: "shape.solids" }), num("How many faces does a cuboid have?", 6, { hint: "Think of a shoebox.", why: "6 faces.", tag: "shape.solids" })],
  [mc("Sara says a rectangle is not always a square. Is she right?", "Yes, a rectangle only needs opposite sides equal; a square needs all 4 sides equal", ["No, every rectangle is a square", "No, they are the same"], { hint: "Compare the sides.", why: "A square is a special rectangle.", tag: "shape.properties" }), mc("Omar says all triangles have a right angle. Is he right?", "No, many triangles have no right angle", ["Yes, all triangles do", "Only big triangles do"], { hint: "Think of an equilateral triangle.", why: "An equilateral triangle has three 60° angles.", tag: "shape.properties" })],
  [mat("Which number of sides goes with each shape?", [["Hexagon", "6"], ["Quadrilateral", "4"], ["Heptagon", "7"]], { hint: "Hex means six.", why: "Hexagon 6, quadrilateral 4, heptagon 7.", tag: "shape.polygons" }), mat("Pair each polygon with its sides.", [["Octagon", "8"], ["Pentagon", "5"], ["Hexagon", "6"]], { hint: "Oct means eight.", why: "Octagon 8, pentagon 5, hexagon 6.", tag: "shape.polygons" })],
  [hot("Tap the treasure at (1, 4).", [["📍", "A: (4, 1)", 22, 50], ["📍", "B: (1, 4)", 50, 50], ["📍", "C: (2, 3)", 78, 50]], ["B: (1, 4)"], { labels: true, hint: "1 across, 4 up.", why: "(1, 4).", tag: "shape.coordinates" }), hot("Tap the treasure at (5, 2).", [["📍", "A: (2, 5)", 22, 50], ["📍", "B: (5, 2)", 50, 50], ["📍", "C: (5, 5)", 78, 50]], ["B: (5, 2)"], { labels: true, hint: "5 across, 2 up.", why: "(5, 2).", tag: "shape.coordinates" })],
  [mc("Mia says (2, 5) is 5 across and 2 up. Is she right?", "No, (2, 5) is 2 across and 5 up", ["Yes, (2, 5) is 5 across and 2 up", "No, it is 2 across and 2 up"], { hint: "Across comes first.", why: "The first number is across.", tag: "shape.coordinates_reason" }), mc("Dan says you read the up number first in a coordinate. Is he right?", "No, read across first, then up", ["Yes, up first", "No, any order works"], { hint: "Think along the corridor, then up the stairs.", why: "Across first, then up.", tag: "shape.coordinates_reason" })],
  [num("How many lines of symmetry does a rectangle that is not a square have?", 2, { hint: "Fold across and down.", why: "2 lines.", tag: "shape.symmetry" }), num("How many lines of symmetry does an equilateral triangle have?", 3, { hint: "One through each corner.", why: "3 lines.", tag: "shape.symmetry" })],
  [mc("Zain says a scalene triangle has 3 lines of symmetry. Is he right?", "No, a scalene triangle has no lines of symmetry", ["Yes, it has 3", "No, it has 1"], { hint: "Its sides are all different.", why: "No fold makes both halves match.", tag: "shape.symmetry_reason" }), mc("Ali says an equilateral triangle has 1 line of symmetry. Is he right?", "No, it has 3 lines of symmetry", ["Yes, it has 1", "No, it has none"], { hint: "One from each corner.", why: "3 lines, one through each vertex.", tag: "shape.symmetry_reason" })],
  [num("A cube has 8 vertices and a square-based pyramid has 5 vertices. How many vertices together?", 13, { hint: "Add them.", why: "8 + 5 = 13.", tag: "shape.solids_reason" }), num("A cylinder has 3 faces and a cube has 6 faces. How many faces together?", 9, { hint: "Add them.", why: "3 + 6 = 9.", tag: "shape.solids_reason" })],
];

export const topics = [
  topicLesson({
    slug: "maths-class-4-shape-position", subject: "maths", cls: 4, topic: 5, title: "Shape and Position",
    summary: "Angles, polygons, symmetry and Islamic star patterns, coordinates, reflection, 3D shapes and nets.",
    unit: "Topic 5: Shape and position", difficulty: 2,
    objectives: ["Name angles and polygons", "Find lines of symmetry and use coordinates", "Describe 3D shapes and nets"],
    success_criteria: ["I can name acute, right and obtuse angles", "I can find lines of symmetry", "I can read coordinates and describe faces, edges and vertices"],
    real_life: "Tile patterns in mosques, reading maps, and buildings made from cubes, cylinders and pyramids.",
    standards: [
      { framework: "nc_england", code: "Y4 geometry", text: "Identify acute and obtuse angles; compare and classify shapes; lines of symmetry; describe positions on a 2-D grid" },
      { framework: "cambridge", code: "4Gg.01" }, { framework: "cambridge", code: "4Gg.05" }, { framework: "cambridge", code: "4Gg.06" }, { framework: "cambridge", code: "4Gg.07" }, { framework: "cambridge", code: "4Gg.08" },
      { framework: "cambridge", code: "4Gp.01" }, { framework: "cambridge", code: "4Gp.02" }, { framework: "cambridge", code: "4Gp.03" },
    ],
    warm_up: [
      num("How many cm are in 2 m?", 200, { hint: "100 cm in 1 m.", why: "2 × 100 = 200." }),
      num("A rectangle is 6 cm by 4 cm. What is its area in square cm?", 24, { hint: "Length × width.", why: "6 × 4 = 24." }),
      mc("What is 3:00 pm in 24-hour time?", "15:00", ["13:00", "03:00"], { hint: "Add 12.", why: "3 + 12 = 15." }),
    ],
    intro: [
      H("Welcome back, number explorer!"),
      SAY("Welcome back, number explorer! Have you ever looked closely at the tiles on a mosque wall? They are made from stars, squares and triangles that fit together perfectly. Mathematicians and artists planned them with angles and symmetry. Today you will learn how shapes work. You will name angles and polygons, find lines of symmetry, plot points on a grid, and fold nets into 3D shapes. Let's go!", T("Today's big question: how do shapes fit together to make beautiful patterns and buildings?")),
      IMG("🕌", "Mosque tiles use shapes and symmetry."),
      GLOSS({ shapes: "Flat or solid forms with sides, corners and faces." }),
    ],
    subs: [angles, symmetry, coords, solids],
    quiz: [
      { q: mc("Which angle is smaller than a right angle?", "Acute", ["Obtuse", "Straight"], { hint: "A right angle is 90°.", why: "Acute angles are smaller than 90°.", tag: "shape.angles" }), sub: "shapes_angles", depth: "recall" },
      { q: num("How many sides does a hexagon have?", 6, { hint: "Hex means six.", why: "6 sides.", tag: "shape.polygons" }), sub: "shapes_angles", depth: "recall" },
      { q: tf("A right angle is 90 degrees.", true, { hint: "Think of a square corner.", why: "A right angle is 90°.", tag: "shape.angles" }), sub: "shapes_angles", depth: "recall" },
      { q: fill("Finish the sentences about shapes.", "A shape with 5 sides is a {b1}. An angle bigger than 90° is {b2}.", [["pentagon", "hexagon", "octagon"], ["obtuse", "acute", "right"]], { hint: "Penta means five.", why: "Pentagon has 5 sides; obtuse is bigger than 90°.", tag: "shape.language" }), sub: "shapes_angles", depth: "apply" },
      { q: ms("Which shapes have a line of symmetry? Pick two.", ["Square", "Circle"], ["Scalene triangle", "Parallelogram"], { hint: "Look for a mirror line.", why: "Squares and circles have lines of symmetry.", tag: "shape.symmetry" }), sub: "symmetry", depth: "apply" },
      { q: ord("Put these in order, smallest angle first.", ["acute angle", "right angle", "obtuse angle", "straight line"], { hint: "Think about degrees.", why: "Acute < right < obtuse < straight.", tag: "shape.angles" }), sub: "shapes_angles", depth: "apply" },
      { q: sld("Slide to show a right angle in degrees.", { min: 0, max: 180, step: 5 }, 90, 0, { hint: "A square corner.", why: "A right angle is 90°.", tag: "shape.angles" }), sub: "shapes_angles", depth: "apply" },
      { q: num("How many edges does a cube have?", 12, { hint: "4 on top, 4 on the bottom, 4 up the sides.", why: "12 edges.", tag: "shape.solids" }), sub: "solids", depth: "apply" },
      { q: mc("Ali says a square is not a rectangle. Is he right?", "No, a square has four right angles and opposite sides equal, so it is a special rectangle", ["Yes, they are different", "Only big squares are rectangles"], { hint: "Compare the angles and sides.", why: "A square is a special rectangle with all sides equal.", tag: "shape.properties" }), sub: "shapes_angles", depth: "reason" },
      { q: mat("Match each shape to its number of sides.", [["Triangle", "3"], ["Pentagon", "5"], ["Octagon", "8"]], { hint: "Tri means three.", why: "Triangle 3, pentagon 5, octagon 8.", tag: "shape.polygons" }), sub: "shapes_angles", depth: "apply" },
      { q: hot("Tap the treasure at (3, 2).", [["📍", "A: (2, 3)", 22, 50], ["📍", "B: (3, 2)", 50, 50], ["📍", "C: (3, 3)", 78, 50]], ["B: (3, 2)"], { labels: true, hint: "3 across, 2 up.", why: "(3, 2).", tag: "shape.coordinates" }), sub: "coordinates", depth: "apply" },
      { q: mc("Zainab says (4, 1) and (1, 4) are the same place. Is she right?", "No, (4, 1) is 4 across and 1 up; (1, 4) is 1 across and 4 up", ["Yes, they are the same", "Only on a small grid"], { hint: "Across first, then up.", why: "The order of the numbers matters.", tag: "shape.coordinates_reason" }), sub: "coordinates", depth: "reason" },
      { q: num("How many lines of symmetry does a square have?", 4, { hint: "Fold across, down and both corners.", why: "4 lines.", tag: "shape.symmetry" }), sub: "symmetry", depth: "apply" },
      { q: mc("Hana says a rectangle has 4 lines of symmetry. Is she right?", "No, a rectangle has 2 lines of symmetry; a square has 4", ["Yes, 4", "No, it has none"], { hint: "Fold across and down.", why: "A rectangle that is not a square has 2 lines.", tag: "shape.symmetry_reason" }), sub: "symmetry", depth: "reason" },
      { q: num("A cube has 6 faces and a square-based pyramid has 5 faces. How many faces together?", 11, { hint: "Add them.", why: "6 + 5 = 11.", tag: "shape.solids_reason" }), sub: "solids", depth: "reason" },
    ].map((x, i) => ({ ...x, alts: ALTS[i] })),
  }),
];
