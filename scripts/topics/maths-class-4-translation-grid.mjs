import { SAY, SS, H, T, IMG, PHOTO, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Coteach diagrams (see content/media/manifest.d/maths-class-4-translation-grid.json).
const COTEACH_A = {"type":"image","asset":"maths-class-4-translation-grid-d1-735d0c12.png","alt":"A triangle on a coordinate grid translated 3 right and 2 up","caption":"Translate 3 right, 2 up."};
const COTEACH_B = {"type":"image","asset":"maths-class-4-translation-grid-d2-1982f801.png","alt":"Points (3, 2) and (6, 2) on a grid with an arrow labelled 3 right","caption":"(3, 2) moves 3 right to (6, 2)."};
// Class 4 Maths topic 12: Translating shapes on a grid (NEW, format 3.0).
// Story thread: Zara's tiny robot crosses a grid to find a treasure in a courtyard in Lahore.
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });
const HB = (text, backdrop) => ({ ...H(text), backdrop });
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });
const OK = (label) => ["ok", "✅", 50, 90, 2, "bounce", label];

// ---------------------------------------------------------------------------------------------- 1. learn
const gridMoves = {
  id: "grid_moves", kind: "learn", title: "Moves on a grid",
  blocks: [
    HB("Zara's robot", "plain"),
    SAY("Zara has a tiny robot. It can only move on a grid of squares. It moves left, right, up and down, one square at a time. Let's help the robot find the treasure.",
      PHOTO("maths-class-4-translation-grid-1-80e2bc51.jpg", "Square grey paving slabs laid in a grid with gravel between them", "Rows and columns of squares make a grid, like the robot grid.", "Photo by Egor Myznik on Unsplash")),
    HB("Stop 1: Left, right, up, down", "classroom"),
    SAY("Right moves the robot towards the right edge. Left moves it towards the left edge. Up moves it towards the top. Down moves it towards the bottom. Count the squares carefully.",
      T("**Right, left, up, down**: say how many squares, and which way.", "Move 3 squares right.")),
    EXPP("Three squares right",
      SS("The robot starts on a square.", S("start", ["r", "🤖", 20, 50, 3, "none", "start"])),
      SS("Move three squares right. Count them: one, two, three.", S("3 right", ["r", "🤖", 20, 50, 2, "none", "start"], ["p", "📍", 75, 50, 3, "pulse", "3 right"])),
      SS("The robot is now on the treasure square.", S("3 right", ["r", "🤖", 60, 50, 2, "none", "3 right"], OK("3 squares right"))))  ,
    SAY("Every corner of the triangle moves three right and two up.", COTEACH_A),
    CHK(mc("Which way does the robot go to move up?", "Towards the top of the grid", ["Towards the bottom", "Towards the right"], { hint: "Up is the top of the page.", why: "Up moves towards the top of the grid.", tag: "translation.direction" })),
    HB("Stop 2: Count the squares", "classroom"),
    SAY("Counting squares is easy to get wrong. Start from the robot, not from the edge. Count each square you cross, but do not count the square you start on.",
      T("**Count from the start**, one square at a time.", "From the start, 3 right means you count squares 1, 2, 3.")),
    IMG("🔢", "Count each square crossed, starting after the robot's square."),
    CHK(num("A robot starts at 9 across and moves 4 left. Where is it across now?", 5, { hint: "Count 4 squares back from 9.", why: "9 − 4 = 5.", tag: "translation.count" })),
    SAY("Remember. Right and left change across. Up and down change the height. Count from the start.", SUM("Left and right: across", "Up and down: height", "Count from the start, not the edge")),
    GLOSS({ "right, left, up, down": "The four directions a robot can move on a grid.", "count from the start": "Start counting from the robot's square, not from the edge.", grid: "Lines that cross to make squares.", direction: "Which way something moves: left, right, up or down.", across: "Along the grid from left to right.", square: "One small box on a grid." }),
  ],
  mini: [
    num("A robot starts at 1 across and moves 4 right. Where is it across now?", 5, { hint: "1 + 4.", why: "1 + 4 = 5." }),
    mc("Which way is down on a grid?", "Towards the bottom edge", ["Towards the top edge", "Towards the right edge"], { hint: "Think of the floor.", why: "Down is towards the bottom." }),
    tf("A robot moving left changes its height.", false, { hint: "Left goes along the grid.", why: "Left changes the across number only." }),
    ord("Put these moves in order from the start, first first.", ["Right 2", "Up 1", "Left 1"], { hint: "Read the order you make them.", why: "Right, up, left in that order." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const slideShape = {
  id: "slide_shape", kind: "try", title: "Slide a shape",
  blocks: [
    HB("Stop 1: Slide a triangle", "classroom"),
    SAY("A translation slides a shape. Every point moves the same distance in the same direction. The shape does not turn and does not change size. Here is a triangle that slides 3 squares right and 2 squares up.",
      T("A **translation** slides every point the same way.", "Triangle: 3 right and 2 up.")),
    EXPP("Slide 3 right and 2 up",
      SS("The triangle starts in the corner.", S("triangle", ["t", "🔺", 30, 50, 3, "none", "start"])),
      SS("Slide it 3 squares right. Every corner moves 3 right.", S("3 right", ["t", "🔺", 45, 50, 3, "none", "start"], ["a", "➡️", 70, 50, 2, "pulse", "3 right"])),
      SS("Slide it 2 squares up. The shape is the same, only moved.", S("3 right, 2 up", ["t", "🔺", 60, 40, 3, "none", "moved"], ["b", "⬆️", 75, 65, 2, "pulse", "2 up"], OK("Same shape, moved")))),
    SAY("The point moves from three, two to six, two. That is three squares right.", COTEACH_B),
    CHK(num("A point at 2 across moves 3 right. Where is it across now?", 5, { hint: "2 + 3.", why: "2 + 3 = 5.", tag: "translation.slide" })),
    HB("Stop 2: Move point by point", "classroom"),
    SAY("To slide a shape, move each corner the same way. Write the new position of each corner. Then join the corners to draw the new shape. It will be the same size and turned the same way.",
      T("**Move each corner** the same amount, then join them.", "A corner at (1, 1) moves 2 right and 1 up to (3, 2).")),
    IMG("🔷", "Move each corner the same way, then join the new corners."),
    CHK(mc("A corner at (1, 1) moves 2 right and 1 up. Where is the new corner?", "(3, 2)", ["(2, 3)", "(1, 3)"], { hint: "Across first, then up.", why: "1 + 2 = 3 across, and 1 + 1 = 2 up.", tag: "translation.corner" })),
    ACT("Slide a shape", ["Squared paper", "Pencil and ruler"], ["Draw a triangle with corners on the grid.", "Slide each corner 3 right and 1 up.", "Join the new corners.", "Check the shape is the same size."]),
    SAY("Remember. A translation slides, it does not turn or change size.", SUM("Every point moves the same way", "Shape stays the same size", "Move each corner, then join")),
    GLOSS({ translation: "A slide where every point moves the same distance in the same direction.", corner: "A point where two sides meet.", vertex: "A corner of a shape.", slide: "Move a shape without turning it." }),
  ],
  mini: [
    num("A point at 4 across moves 2 right. Where is it now?", 6, { hint: "4 + 2.", why: "4 + 2 = 6." }),
    tf("A translation turns the shape.", false, { hint: "Think of a slide.", why: "A translation slides and does not turn." }),
    mc("A shape slides 2 right and 2 up. What is the shape like now?", "The same shape, moved", ["A bigger shape", "A turned shape"], { hint: "Translation keeps the size.", why: "A translation moves the shape but keeps it the same." }),
    ord("Put these new x-values in order, smallest first.", ["5", "2", "4"], { hint: "Compare the numbers.", why: "2, 4, 5." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const treasureMoves = {
  id: "treasure_moves", kind: "play", title: "Treasure map moves",
  blocks: [
    HB("Stop 1: Coordinates in the first quadrant", "classroom"),
    SAY("Zara's treasure map has coordinates. The first number is across and the second is up. The point (3, 2) is 3 across and 2 up from the corner. Across first, then up.",
      T("**(x, y)**: first across, then up.", "(3, 2) is 3 across and 2 up.")),
    EXPP("Finding (3, 2)",
      SS("Start at the corner, (0, 0).", S("(0, 0)", ["c", "🏁", 15, 80, 2, "none", "(0, 0)"])),
      SS("Move 3 across to the right.", S("3 across", ["c", "🏁", 15, 80, 2, "none", "(0, 0)"], ["d", "📍", 60, 80, 3, "pulse", "3 across"])),
      SS("Move 2 up. The treasure is at (3, 2).", S("(3, 2)", ["c", "🏁", 15, 80, 2, "none", "(0, 0)"], ["e", "📍", 60, 45, 3, "pulse", "(3, 2)"], OK("(3, 2) found")))),
    CHK(num("A point is at 3 across. It moves 4 right. Where is it across now?", 7, { hint: "3 + 4.", why: "3 + 4 = 7.", tag: "translation.coords" })),
    HB("Stop 2: Right changes x, up changes y", "classroom"),
    SAY("Here is a secret. Moving right changes the first number. Moving up changes the second number. Always change the number that matches the direction.",
      T("**Right changes x**, and **up changes y**.", "(2, 3) moved 3 right is (5, 3).")),
    IMG("🗺️", "Right changes the first number. Up changes the second."),
    CHK(mc("The point (2, 3) moves 3 right. Where is it now?", "(5, 3)", ["(2, 6)", "(3, 5)"], { hint: "Change only the first number.", why: "2 + 3 = 5, and y stays 3.", tag: "translation.coords" })),
    SAY("Brain break. Find the pairs.", BRAIN("memory_match", "Treasure pairs", "Find the matching treasure maps.", ["🗺️", "📍", "🏁", "🤖", "🔺", "🔷"])),
    ACT("Treasure map at home", ["Squared paper", "Pencil"], ["Draw a grid from 0 to 6.", "Place a treasure at (4, 2).", "Move it 2 right and 3 up.", "Write the new coordinates."]),
    SAY("Remember. Across first, then up. Right changes the first number, and up changes the second.", SUM("(x, y): across, then up", "Right changes x", "Up changes y")),
    GLOSS({ "x y": "The first number is x (across) and the second is y (up).", "right changes x": "Moving right changes the first number.", "up changes y": "Moving up changes the second number.", coordinates: "Two numbers that give a position on a grid.", "first quadrant": "The top-right part of a grid, where both numbers are positive.", origin: "The corner (0, 0) where we start counting." }),
  ],
  mini: [
    num("A point at (1, 4) moves 2 right. What is the new first number?", 3, { hint: "1 + 2.", why: "1 + 2 = 3." }),
    mc("Which point is 2 across and 5 up?", "(2, 5)", ["(5, 2)", "(2, 2)"], { hint: "Across first.", why: "(2, 5) is 2 across and 5 up." }),
    tf("Moving 3 up changes the first number.", false, { hint: "Up changes height.", why: "Up changes the second number." }),
    num("What is the second number in (4, 7)?", 7, { hint: "The second number says how far up.", why: "7." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const designPath = {
  id: "design_path", kind: "use", title: "Design a path",
  blocks: [
    HB("Stop 1: A route for the robot", "town"),
    SAY("Zara designs a route for the robot. The robot goes 3 right, then 4 right. How many squares right in total? Add the moves in the same direction.",
      T("**Same direction**: add the moves. 3 right + 4 right = 7 right.", "The robot ends 7 squares right.")),
    EXPP("A robot route",
      SS("The robot moves 3 right.", S("3 right", ["p", "🤖", 25, 50, 3, "none", "3 right"])),
      SS("Then it moves 4 more right.", S("3 right", ["p", "🤖", 25, 50, 2, "none", "3 right"], ["q", "➡️", 65, 50, 3, "pulse", "4 more right"])),
      SS("Total: 7 squares right.", S("7 right", ["p", "🤖", 25, 50, 2, "none"], OK("3 + 4 = 7 right")))),
    CHK(num("A robot moves 2 left and then 6 left. How many squares left in total?", 8, { hint: "Add the moves.", why: "2 + 6 = 8.", tag: "translation.route" })),
    HB("Stop 2: Back to the start", "home"),
    SAY("To go back to the start, reverse the route. If the robot went 3 right, it goes 3 left to come back. Reverse each move.",
      T("**Reverse**: right becomes left, up becomes down.", "3 right is reversed by 3 left.")),
    IMG("↩️", "To go back, move the opposite way by the same number of squares."),
    CHK(mc("To reverse a move of 4 up, what do you do?", "Move 4 down", ["Move 4 up again", "Move 4 left"], { hint: "Opposite of up is down.", why: "Down undoes up.", tag: "translation.reverse" })),
    ACT("Design a path", ["Squared paper", "Pencil"], ["Draw a 6 by 6 grid.", "Start at (0, 0) and make 3 moves.", "Reverse the moves to go back.", "Check that you end at the start."]),
    SAY("Remember. Add moves in the same direction. Reverse a route to come back.", SUM("Same direction: add the moves", "Reverse each move to go back", "Check your end point")),
    GLOSS({ "same direction": "Moves that go the same way, so you add them.", route: "The path a robot takes.", reverse: "Go the opposite way." }),
  ],
  mini: [
    num("A robot moves 5 right then 2 right. How many squares right?", 7, { hint: "5 + 2.", why: "5 + 2 = 7." }),
    mc("How do you reverse 6 left?", "6 right", ["6 left", "6 up"], { hint: "The opposite of left.", why: "Right undoes left." }),
    tf("A route with 2 right and 2 left ends at the start.", true, { hint: "The moves cancel.", why: "2 right then 2 left is back where you began." }),
    num("A robot moves 3 up and 3 down. How many squares from the start?", 0, { hint: "The moves cancel.", why: "3 − 3 = 0." }),
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- grid_moves (q1-q8)
  Q(num("A robot starts at 5 across and moves 3 left. Where is it across now?", 2, { hint: "Count 3 squares back from 5.", why: "5 − 3 = 2.", tag: "translation.count" }), "grid_moves", "apply",
    [num("A robot starts at 2 across and moves 4 right. Where is it across now?", 6, { hint: "Count 4 squares forward.", why: "2 + 4 = 6.", tag: "translation.count" })]),
  Q(mc("Ali says up on a grid means towards the bottom edge. Is he right?", "No. Up means towards the top of the grid", ["Yes, down is up", "No, up is to the left"], { hint: "Think about the top of the page.", why: "Up moves towards the top.", tag: "translation.reason_direction" }), "grid_moves", "reason",
    [mc("Hana says right means towards the left edge. Is she right?", "No. Right means towards the right edge", ["Yes, right is left", "No, right is down"], { hint: "Think about the right of the page.", why: "Right moves towards the right edge.", tag: "translation.reason_direction" })]),
  Q(tf("Left and right change the first number of a coordinate.", true, { hint: "Across is the first number.", why: "Across is the first number, so left and right change it.", tag: "translation.direction" }), "grid_moves", "recall",
    [tf("Up and down change the first number of a coordinate.", false, { hint: "Up is the second number.", why: "Up and down change the second number.", tag: "translation.direction" })]),
  Q(fill("Complete the moves from (0, 0) to (2, 3).", "Move two squares {b1} and three squares {b2}.", [["right", "left", "down"], ["up", "down", "right"]], { hint: "Read each direction.", why: "Two right and three up.", tag: "translation.direction" }), "grid_moves", "apply",
    [fill("Complete the moves from (5, 4) to (1, 3).", "Move four squares {b1} and one square {b2}.", [["left", "right", "up"], ["down", "up", "left"]], { hint: "Read each direction.", why: "Four left and one down.", tag: "translation.direction" })]),
  Q(ms("Which two moves are horizontal? Pick two.", ["Left 3", "Right 2"], ["Up 3", "Down 2"], { hint: "Horizontal means side to side.", why: "Left and right are horizontal.", tag: "translation.direction" }), "grid_moves", "apply",
    [ms("Which two moves are vertical? Pick two.", ["Up 4", "Down 1"], ["Left 4", "Right 1"], { hint: "Vertical means up and down.", why: "Up and down are vertical.", tag: "translation.direction" })]),
  Q(ord("Order these x-values from the left edge.", ["0", "2", "4", "7"], { hint: "Smallest is nearest the left edge.", why: "0, 2, 4, 7.", tag: "translation.order" }), "grid_moves", "apply",
    [ord("Order these y-values from the bottom.", ["1", "3", "5"], { hint: "Smallest is nearest the bottom.", why: "1, 3, 5.", tag: "translation.order" })]),
  Q(sld("A robot starts at 2 across and moves 4 right. Slide to show where it is across.", { min: 0, max: 10, step: 1 }, 6, 1, { hint: "2 + 4.", why: "2 + 4 = 6.", tag: "translation.line" }), "grid_moves", "apply",
    [sld("A robot starts at 8 across and moves 5 left. Slide to show where it is across.", { min: 0, max: 10, step: 1 }, 3, 1, { hint: "8 − 5.", why: "8 − 5 = 3.", tag: "translation.line" })]),
  Q(mat("Match each direction to its arrow.", [["Left", "←"], ["Right", "→"], ["Up", "↑"]], { hint: "Think about where the arrow points.", why: "Left ←, right →, up ↑.", tag: "translation.direction" }), "grid_moves", "apply",
    [mat("Join each direction to its arrow.", [["Down", "↓"], ["Right", "→"], ["Left", "←"]], { hint: "Think about where the arrow points.", why: "Down ↓, right →, left ←.", tag: "translation.direction" })]),
  // ----- slide_shape (q9-q16)
  Q(num("A triangle is translated 3 squares right. A point at 2 across moves to where across?", 5, { hint: "2 + 3.", why: "2 + 3 = 5.", tag: "translation.slide" }), "slide_shape", "apply",
    [num("A point at 4 across is translated 2 squares right. Where is it across now?", 6, { hint: "4 + 2.", why: "4 + 2 = 6.", tag: "translation.slide" })]),
  Q(mc("Zainab says a translation makes a shape bigger. Is she right?", "No. A translation slides the shape without changing its size", ["Yes, it gets bigger", "No, it turns"], { hint: "A slide keeps the size.", why: "A translation keeps the size and shape.", tag: "translation.reason_size" }), "slide_shape", "reason",
    [mc("Sam says a translation turns the shape. Is he right?", "No. A translation slides the shape, it does not turn it", ["Yes, it turns", "No, it flips"], { hint: "Think of a slide.", why: "A translation keeps the same direction.", tag: "translation.reason_size" })]),
  Q(tf("Every point of a shape moves the same distance in the same direction in a translation.", true, { hint: "Think of a slide.", why: "That is what a translation is.", tag: "translation.slide" }), "slide_shape", "recall",
    [tf("Each point of a shape moves a different distance in a translation.", false, { hint: "Think of a slide.", why: "Every point moves the same.", tag: "translation.slide" })]),
  Q(fill("A triangle's corner moves from (1, 1) to (4, 3).", "It moves {b1} squares right and {b2} squares up.", [["3", "2", "4"], ["2", "3", "1"]], { hint: "Read the move.", why: "3 right and 2 up.", tag: "translation.slide" }), "slide_shape", "apply",
    [fill("A square's corner moves from (5, 4) to (1, 3).", "It moves {b1} squares left and {b2} squares down.", [["4", "1", "2"], ["1", "4", "2"]], { hint: "Read the move.", why: "4 left and 1 down.", tag: "translation.slide" })]),
  Q(ms("Which two statements describe a translation? Pick two.", ["Every point moves the same way", "The size stays the same"], ["The shape turns", "Every point gets bigger"], { hint: "Think of a slide.", why: "A translation slides and keeps the size.", tag: "translation.describe" }), "slide_shape", "apply",
    [ms("Pick two true statements about translation.", ["The shape slides", "It keeps its shape"], ["It flips over", "It doubles in size"], { hint: "Think of a slide.", why: "A translation slides and keeps its shape.", tag: "translation.describe" })]),
  Q(ord("Put these new x-values in order, smallest first, after moving each point 2 right.", ["3", "4", "6"], { hint: "Start x-values were 1, 2 and 4.", why: "1 + 2 = 3, 2 + 2 = 4, 4 + 2 = 6.", tag: "translation.order" }), "slide_shape", "apply",
    [ord("Put these new x-values in order after moving 3 right: 0, 2 and 5.", ["3", "5", "8"], { hint: "Add 3 to each start.", why: "0 + 3 = 3, 2 + 3 = 5, 5 + 3 = 8.", tag: "translation.order" })]),
  Q(sld("Slide to show the new x-value after moving 5 right from 2.", { min: 0, max: 10, step: 1 }, 7, 1, { hint: "2 + 5.", why: "2 + 5 = 7.", tag: "translation.slide" }), "slide_shape", "apply",
    [sld("Slide to show the new x-value after moving 4 right from 1.", { min: 0, max: 10, step: 1 }, 5, 1, { hint: "1 + 4.", why: "1 + 4 = 5.", tag: "translation.slide" })]),
  Q(hot("Tap the shape that is a slide of the triangle, 3 right.", [["🔺", "Slid 3 right", 22, 50], ["🔺", "Turned 90°", 50, 50], ["🔺", "Doubled", 78, 50]], ["Slid 3 right"], { labels: true, hint: "A slide keeps the shape.", why: "Only the slide keeps the same direction and size.", tag: "translation.pick" }), "slide_shape", "apply",
    [hot("Tap the shape that is a slide of the triangle, 2 up.", [["🔺", "Turned 180°", 22, 50], ["🔺", "Slid 2 up", 50, 50], ["🔺", "Shrunk", 78, 50]], ["Slid 2 up"], { labels: true, hint: "A slide keeps the shape.", why: "Only the slide keeps the same shape and direction.", tag: "translation.pick" })]),
  // ----- treasure_moves (q17-q24)
  Q(num("The point (3, 2) moves 3 right. What is its new first number?", 6, { hint: "Add 3 to the first number.", why: "3 + 3 = 6.", tag: "translation.coords" }), "treasure_moves", "apply",
    [num("The point (1, 5) moves 4 right. What is its new first number?", 5, { hint: "Add 4 to the first number.", why: "1 + 4 = 5.", tag: "translation.coords" })]),
  Q(mc("Hamza says moving up changes the first number. Is he right?", "No. Moving up changes the second number, the one that says how far up", ["Yes, the first number changes", "No, nothing changes"], { hint: "Which number is up?", why: "The second number is up.", tag: "translation.reason_axis" }), "treasure_moves", "reason",
    [mc("Layla says moving right changes the second number. Is she right?", "No. Moving right changes the first number, the across number", ["Yes, the second changes", "No, both change"], { hint: "Which number is across?", why: "The first number is across.", tag: "translation.reason_axis" })]),
  Q(tf("The point (2, 5) is 2 across and 5 up.", true, { hint: "Across first.", why: "The first number is across.", tag: "translation.coords" }), "treasure_moves", "recall",
    [tf("The point (5, 2) is 2 across and 5 up.", false, { hint: "Across first.", why: "(5, 2) is 5 across and 2 up.", tag: "translation.coords" })]),
  Q(hot("Tap the point at (3, 2) after moving 3 right.", [["📍", "(6, 2)", 22, 50], ["📍", "(3, 5)", 50, 50], ["📍", "(6, 5)", 78, 50]], ["(6, 2)"], { labels: true, hint: "Change only the first number.", why: "(3, 2) moved 3 right is (6, 2).", tag: "translation.coords" }), "treasure_moves", "apply",
    [hot("Tap the point after moving (4, 1) 2 up.", [["📍", "(4, 3)", 22, 50], ["📍", "(6, 1)", 50, 50], ["📍", "(2, 3)", 78, 50]], ["(4, 3)"], { labels: true, hint: "Change only the second number.", why: "(4, 1) moved 2 up is (4, 3).", tag: "translation.coords" })]),
  Q(mat("Match each start point to its point after moving 2 right.", [["(1, 3)", "(3, 3)"], ["(4, 2)", "(6, 2)"], ["(0, 0)", "(2, 0)"]], { hint: "Add 2 to the first number.", why: "(3, 3), (6, 2) and (2, 0).", tag: "translation.coords" }), "treasure_moves", "apply",
    [mat("Join each start point to its point after moving 4 right.", [["(5, 1)", "(9, 1)"], ["(2, 6)", "(6, 6)"], ["(3, 4)", "(7, 4)"]], { hint: "Add 4 to the first number.", why: "(9, 1), (6, 6) and (7, 4).", tag: "translation.coords" })]),
  Q(mc("Mira says (2, 3) to (5, 3) is 3 up. Is she right?", "No. (2, 3) to (5, 3) is 3 right, because the second number stays 3", ["Yes, 3 up", "No, 3 down"], { hint: "Which number changes?", why: "The first number changes from 2 to 5.", tag: "translation.reason_axis" }), "treasure_moves", "reason",
    [mc("Ben says (1, 1) to (1, 4) is 3 right. Is he right?", "No. The first number stays 1, and the second goes up by 3", ["Yes, 3 right", "No, 3 left"], { hint: "Which number changes?", why: "The second number changes from 1 to 4.", tag: "translation.reason_axis" })]),
  Q(sld("Slide to show the new first number after moving (3, 2) 4 right.", { min: 0, max: 10, step: 1 }, 7, 1, { hint: "3 + 4.", why: "3 + 4 = 7.", tag: "translation.coords" }), "treasure_moves", "apply",
    [sld("Slide to show the new first number after moving (2, 5) 6 right.", { min: 0, max: 10, step: 1 }, 8, 1, { hint: "2 + 6.", why: "2 + 6 = 8.", tag: "translation.coords" })]),
  Q(mc("Which move takes (1, 1) to (1, 4)?", "3 up", ["3 right", "3 left"], { hint: "Only the second number changes.", why: "1 + 3 = 4 for the second number.", tag: "translation.coords" }), "treasure_moves", "apply",
    [mc("Which move takes (4, 2) to (1, 2)?", "3 left", ["3 up", "3 down"], { hint: "Only the first number changes.", why: "4 − 3 = 1.", tag: "translation.coords" })]),
  // ----- design_path (q25-q30)
  Q(num("A robot moves 3 right and then 4 right. How many squares right in total?", 7, { hint: "Add the moves in the same direction.", why: "3 + 4 = 7.", tag: "translation.route" }), "design_path", "apply",
    [num("A robot moves 6 right and then 3 right. How many squares right in total?", 9, { hint: "Add the moves.", why: "6 + 3 = 9.", tag: "translation.route" })]),
  Q(mc("Layla says to reverse a move of 3 right, you move 3 right again. Is she right?", "No. To go back, move 3 left", ["Yes, 3 right again", "No, 3 up"], { hint: "Reverse means opposite.", why: "Left undoes right.", tag: "translation.reason_reverse" }), "design_path", "reason",
    [mc("Sam says to reverse a move of 4 up, you move 4 up again. Is he right?", "No. To go back, move 4 down", ["Yes, 4 up again", "No, 4 left"], { hint: "Reverse means opposite.", why: "Down undoes up.", tag: "translation.reason_reverse" })]),
  Q(num("A tile pattern moves 2 squares right on each row. After 4 rows, how far right in total?", 8, { hint: "Four lots of two.", why: "4 × 2 = 8.", tag: "translation.route" }), "design_path", "apply",
    [num("A pattern shifts 3 squares right each row. After 5 rows, how far right in total?", 15, { hint: "Five lots of three.", why: "5 × 3 = 15.", tag: "translation.route" })]),
  Q(mc("Zara says a tile pattern slid 2 right and 2 up is the same as turning it. Is she right?", "No. The pattern is slid, not turned", ["Yes, a slide is a turn", "No, it is a flip"], { hint: "A slide keeps the direction.", why: "A slide moves the pattern without turning it.", tag: "translation.reason_slide" }), "design_path", "reason",
    [mc("Ali says a tile that slides 1 right is no longer the same shape. Is he right?", "No. A slide keeps the same shape and size", ["Yes, it changes shape", "No, it grows"], { hint: "A slide keeps the shape.", why: "Sliding keeps the shape.", tag: "translation.reason_slide" })]),
  Q(mc("Ava says a path right 2, up 2, right 1 ends 5 right and 2 up from the start. Is she right?", "No. Right 2 and right 1 make 3 right, so it ends 3 right and 2 up", ["Yes, 5 right", "No, 2 right"], { hint: "Add the right moves.", why: "2 + 1 = 3 right and 2 up.", tag: "translation.reason_path" }), "design_path", "reason",
    [mc("A path goes left 1, down 3, left 2. Where is it compared with the start?", "3 left and 3 down", ["3 left and 1 down", "6 left and 3 down"], { hint: "Add the left moves and the down moves.", why: "1 + 2 = 3 left, and 3 down.", tag: "translation.path" })]),
  Q(mc("Omar says a route of 2 up and 2 down ends back at the start. Is he right?", "Yes. The moves cancel out, so the robot is back at the start", ["No, it is 4 squares away", "No, it is 2 up"], { hint: "Up and down undo each other.", why: "2 up then 2 down is back where it began.", tag: "translation.reason_cancel" }), "design_path", "reason",
    [mc("Nora says a route of 3 left and 1 right ends 2 left of the start. Is she right?", "Yes. 3 left take away 1 right leaves 2 left", ["No, it ends 4 left", "No, it ends 1 right"], { hint: "Add the left moves and take away the right move.", why: "3 − 1 = 2 left.", tag: "translation.reason_cancel" })]),
];

export const topics = [
  topicLesson({
    slug: "maths-class-4-translation-grid", subject: "maths", cls: 4, topic: 12, title: "Translating Shapes on a Grid",
    summary: "Give directions on a grid, translate shapes left, right, up and down, and find new coordinates in the first quadrant.",
    unit: "Topic 12: Translating shapes on a grid", difficulty: 2,
    objectives: ["Give directions on a grid", "Translate a shape left, right, up and down", "Describe a translation with coordinates"],
    success_criteria: ["I can give directions using left, right, up and down", "I can slide a shape and keep its size", "I can find new coordinates after a translation"],
    real_life: "Following a map, moving a robot, and tile patterns that slide across a floor.",
    standards: [
      { framework: "nc_england", code: "Y4 position", text: "Describe positions on a 2-D grid as coordinates in the first quadrant; describe movements between positions as translations" },
      { framework: "cambridge", code: "4Gp.01" }, { framework: "cambridge", code: "4Gp.02" }, { framework: "cambridge", code: "4Gp.03" },
    ],
    warm_up: [
      num("What is 4 + 5?", 9, { hint: "Count on from 4.", why: "4 + 5 = 9." }),
      num("What is 7 + 6?", 13, { hint: "Make a ten first.", why: "7 + 3 = 10 and 3 more is 13." }),
      tf("A square has four equal sides.", true, { hint: "Think about a square tile.", why: "A square has four equal sides." }),
    ],
    intro: [],
    subs: [gridMoves, slideShape, treasureMoves, designPath],
    clip: {
      title: "Robo-Zara crosses the courtyard", backdrop: "plain", caption: "A tiny robot crosses a tiled courtyard grid, and a tile slides one square at a time.",
      scenes: [
        { caption: "The courtyard.", say: "This is a tiled courtyard grid. Zara's tiny robot starts in the corner.",
          items: [{ id: "z", emoji: "👧", label: "Zara", x: 22, y: 56, size: 3, anim: "bounce", enter: "walk_right" }, { id: "r", emoji: "🤖", label: "robot", x: 72, y: 46, size: 3, enter: "pop" }] },
        { caption: "Three right.", say: "The robot moves three squares right, across the courtyard.",
          items: [{ id: "a", emoji: "➡️", label: "3 right", x: 50, y: 46, size: 3, enter: "slide_right" }] },
        { caption: "Two up.", say: "Then it moves two squares up. Now it is on a new tile.",
          items: [{ id: "u", emoji: "⬆️", label: "2 up", x: 50, y: 46, size: 3, enter: "slide_left" }] },
        { caption: "A tile slides.", say: "A pattern tile slides one square at a time. It keeps its shape.",
          items: [{ id: "t", emoji: "🔷", label: "slides", x: 50, y: 46, size: 3, effect: "glow" }] },
        { caption: "The treasure at (3, 2).", say: "The treasure is at three across and two up. Across first, then up.",
          camera: { zoom: 1.2, x: 50, y: 46 },
          items: [{ id: "tr", emoji: "📍", label: "(3, 2)", x: 50, y: 40, size: 3, effect: "sparkle" }] },
        { caption: "Shukriya, Zara!", say: "The robot found the treasure. Shukriya, Zara!",
          items: [{ id: "z", emoji: "👧", label: "Zara", x: 22, y: 56, size: 3, anim: "bounce" }, { id: "h", emoji: "🎉", label: "Found it!", x: 70, y: 40, size: 2, effect: "hearts" }] },
      ],
    },
    quiz,
  }),
];
