import { SAY, SS, H, T, PHOTO, ACT, MAN, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Computer Science, Data & AI, Class 1 (Zainab, age 7), topic 5: Paint on a computer.
// Story thread: Zainab paints a skyline and an Eid card on a tablet.
const BRUSHES = "data-ai-class-1-paint-on-a-computer-1-f1bd43d8.jpg";
const DOME = "data-ai-class-1-paint-on-a-computer-2-9dcdecfa.jpg";
const OKM = (label) => ["ok", "✅", 50, 88, 2, "bounce", label];
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });

// ---------------------------------------------------------------------------------------------- 1. learn
const tools = {
  id: "tools", kind: "learn", title: "Tools in a paint app",
  blocks: [
    H("Welcome back, digital artist!"),
    SAY("Today we paint with a computer. Zainab is going to make a picture on her tablet.",
      T("Today's big question: how do we paint on a screen?")),
    SAY("These are real brushes and real paint. Today we paint with tools on a screen.",
      PHOTO(BRUSHES, "A wooden palette covered in pink and orange paint with many brushes", "Real brushes and paint. A paint app has tools too.", "Photo by Jennie Razumnaya on Unsplash")),
    H("Stop 1: What does digital mean?"),
    SAY("Digital means made or shown on a computer. A digital picture lives on a screen.",
      T("A **digital** picture is made on a computer, not on paper.")),
    EXP("Paper or screen",
      SS("Zainab can paint on paper. She uses a brush and wet paint.", S("Paper: brush and paint.", ["p", "🖌️", 30, 50, 3, "none", "paper"], ["w", "🎨", 70, 50, 3, "pulse"])),
      SS("Or she can paint on a tablet. She uses her finger or a stylus.", S("Screen: finger and tools.", ["t", "📱", 30, 50, 3, "none", "screen"], ["f", "👆", 70, 50, 3, "bounce"])),
      SS("The tablet picture is digital. It can be saved and opened again.", S("Digital: saved on a computer.", ["t", "📱", 50, 46, 3, "pulse"], OKM("digital picture")))),
    CHK(mc("A picture made on a tablet is called...", "Digital", ["Wooden", "Wet"], { hint: "It is made on a computer.", why: "A picture made on a computer or tablet is digital.", tag: "paint.digital" })),
    H("Stop 2: Line, shape and fill"),
    SAY("A paint app has tools. The line tool draws a line. The shape tool makes a square or a circle.",
      T("The **line tool** draws lines. The **shape tool** makes shapes.")),
    SAY("The fill tool pours colour inside a shape. The undo tool takes back your last step.",
      T("The **fill tool** colours inside. The **undo tool** takes back a step.")),
    EXP("Four tools",
      SS("The line tool draws a straight line across the screen.", S("Line tool.", ["l", "📏", 50, 50, 3, "pulse", "line"])),
      SS("The shape tool makes a circle, a square or a triangle.", S("Shape tool.", ["s", "🔷", 30, 50, 3, "none", "shape"], ["c", "🔴", 70, 50, 3, "bounce"])),
      SS("The fill tool colours the inside of the shape yellow.", S("Fill tool.", ["f", "🟨", 50, 50, 3, "pulse", "fill"])),
      SS("Oops, a mistake. Undo takes back the last step.", S("Undo tool.", ["u", "↩️", 50, 50, 3, "bounce", "undo"]))),
    CHK(mc("Which tool colours inside a shape?", "Fill", ["Line", "Undo"], { hint: "It pours colour in.", why: "The fill tool colours the inside of a shape.", tag: "paint.fill" })),
    SAY("Let us remember. A digital picture is made on a computer. Tools draw lines and shapes.",
      SUM("Digital means made on a computer", "Line and shape tools draw", "Fill colours inside, undo takes a step back")),
    GLOSS({ digital: "Made or shown on a computer.", "line tool": "A tool that draws a line.", "shape tool": "A tool that makes shapes.", "fill tool": "A tool that colours inside a shape.", "undo tool": "A tool that takes back your last step.", tool: "Something that helps you do a job.", brush: "A tool that paints soft lines.", stylus: "A pen you use on a screen." }),
  ],
  mini: [
    mc("What does digital mean?", "Made or shown on a computer", ["Made of wood", "Very heavy"], { hint: "Think of a tablet.", why: "Digital means on a computer." }),
    mc("Which tool takes back the last step?", "Undo", ["Fill", "Line"], { hint: "It goes backwards.", why: "Undo takes back the last step." }),
    tf("A shape tool can make a circle.", true, { hint: "Think of round shapes.", why: "The shape tool makes circles and squares." }),
    mc("Which tool draws a straight line?", "Line tool", ["Fill tool", "Undo tool"], { hint: "Its name says it.", why: "The line tool draws lines." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const house = {
  id: "house", kind: "try", title: "Draw with shapes",
  blocks: [
    H("Stop 1: Build a house from shapes"),
    SAY("Shapes can build a house. A square is the wall. A triangle is the roof.",
      T("Make a picture from **shapes**: a square wall and a triangle roof.")),
    EXP("A house from shapes",
      SS("First the shape tool makes a big square for the wall.", S("Square wall.", ["w", "🟦", 50, 56, 3, "grow", "wall"])),
      SS("Next a triangle on top is the roof.", S("Triangle roof.", ["w", "🟦", 50, 62, 3], ["r", "🔺", 50, 32, 3, "grow", "roof"])),
      SS("Last a small rectangle is the door. Then fill in the colours.", S("Rectangle door.", ["w", "🟦", 50, 62, 3], ["r", "🔺", 50, 32, 3], ["d", "🟫", 50, 72, 2, "grow", "door"]))),
    MAN("Build the house", "Move the shapes into the picture. Use 3 shapes.", "🔷", 3, ["Shapes in the picture", "Waiting"]),
    CHK(mc("Which shape makes a good roof?", "A triangle", ["A circle", "A star"], { hint: "It has a point at the top.", why: "A triangle makes a sloping roof.", tag: "paint.roof" })),
    H("Stop 2: Fix it with undo"),
    SAY("Everyone makes mistakes. Zainab fills the door green by mistake. She taps undo.",
      T("Do not start again. Tap **undo** to fix a mistake.")),
    EXP("Undo a mistake",
      SS("Oh no. The door is green. Zainab wanted brown.", S("Wrong colour.", ["d", "🟩", 50, 50, 3, "pulse", "green door"])),
      SS("She taps the undo tool. The last step goes away.", S("Tap undo.", ["u", "↩️", 30, 50, 3, "bounce", "undo"], ["d", "🟩", 70, 50, 3])),
      SS("Now the door is plain again. She fills it brown.", S("Fixed.", ["d", "🟫", 50, 50, 3, "pulse"], OKM("mistake fixed")))),
    SAY("Now you try at home. Ask a grown-up to open a paint app.",
      ACT("Shape house", ["A tablet or computer with a paint app", "A grown-up"], ["Draw a square for the wall and a triangle for the roof.", "Fill the wall with a colour. Fill the roof with another.", "Make a mistake on purpose. Tap undo to fix it."])),
    CHK(tf("Undo takes back your last step.", true, { hint: "It goes backwards one step.", why: "Undo takes back the last thing you did.", tag: "paint.undo" })),
    SAY("Let us remember. Shapes build pictures. Undo fixes mistakes.",
      SUM("A square wall and a triangle roof make a house", "Undo takes back a mistake")),
    GLOSS({ undo: "Takes back your last step.", shape: "A flat form like a square, circle or triangle.", triangle: "A shape with three sides.", rectangle: "A shape with four sides and square corners.", mistake: "Something that went wrong.", roof: "The top of a house." }),
  ],
  mini: [
    mc("Which shape is a good wall?", "A square", ["A triangle", "A star"], { hint: "Think of a box.", why: "A square makes a wall." }),
    tf("If you make a mistake, you must start the whole picture again.", false, { hint: "Is there a tool?", why: "Undo can fix a mistake." }),
    mc("What do we do after drawing a shape?", "Fill it with colour", ["Delete the tablet", "Close the eyes"], { hint: "Which tool pours colour?", why: "Fill makes the shape colourful." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const match = {
  id: "match", kind: "play", title: "Tool match-up",
  blocks: [
    H("Stop 1: Name that tool"),
    SAY("A paint app has many tools. Each one has a job. Let us match them up.",
      T("Each **tool** has its own job.")),
    EXP("Tool jobs",
      SS("A pencil icon draws a thin line. A brush icon paints soft lines.", S("Pencil and brush.", ["p", "✏️", 30, 50, 3, "pulse", "line"], ["b", "🖌️", 70, 50, 3, "pulse", "brush"])),
      SS("A bucket icon fills. A shape icon makes shapes.", S("Bucket and shape.", ["k", "🪣", 30, 50, 3, "pulse", "fill"], ["s", "🔷", 70, 50, 3, "pulse", "shape"])),
      SS("An arrow icon goes back. That is undo.", S("Undo arrow.", ["u", "↩️", 50, 50, 3, "bounce", "undo"]))),
    CHK(mc("Which tool paints soft, wavy lines?", "Brush", ["Shape", "Undo"], { hint: "Think of a paint brush.", why: "A brush paints soft lines.", tag: "paint.brush" })),
    H("Stop 2: Brain game"),
    SAY("First, a memory game. Then choose the best tool for each job.",
      T("Play the memory game. Then pick the best tool.")),
    BRAIN("memory_match", "Paint pairs", "Find the pairs.", ["🖌️", "🪣", "🔷", "↩️"]),
    CHK(mat("Match each job to the best tool.", [["Colour inside a square", "Fill"], ["Draw a circle", "Shape"], ["Take back a mistake", "Undo"]], { hint: "Think about each job.", why: "Fill colours, shape draws shapes and undo takes back.", tag: "paint.matchjob" })),
    SAY("Let us remember. Pick the tool that fits the job.",
      SUM("Brush for soft lines", "Fill colours inside, shape makes shapes", "Undo takes back a step")),
    GLOSS({ tool: "Something that helps you do a job.", icon: "A small picture on a screen that you tap.", bucket: "The picture for the fill tool.", job: "What a tool is for.", wavy: "Going up and down, like waves." }),
  ],
  mini: [
    mc("Which tool makes a circle?", "Shape tool", ["Undo", "Brush"], { hint: "Shapes!", why: "The shape tool makes circles." }),
    tf("You can use more than one tool in a picture.", true, { hint: "Think of a house.", why: "Pictures use many tools together." }),
    mc("Which tool is a bucket icon?", "Fill", ["Line", "Shape"], { hint: "It pours colour.", why: "The bucket is the fill tool." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const card = {
  id: "card", kind: "use", title: "Paint a card",
  blocks: [
    H("Stop 1: Plan the card"),
    SAY("Zainab will paint an Eid card for her cousin. First she plans on paper.",
      T("Plan first. Think about shapes, colours and a message.")),
    SAY("She wants a dome, a crescent moon and some stars. Domes and moons are shapes.",
      PHOTO(DOME, "A mosque dome and two minarets in silhouette against an orange sunset", "A dome and minarets at sunset. Zainab uses this idea.", "Photo by Simon Infanger on Unsplash")),
    SAY("She picks dark blue for the sky and yellow for the moon. Those colours are easy to see.",
      T("Pick colours that are easy to see together.")),
    SAY("Planning saves time. You know which tools you need.",
      ACT("Plan an Eid card", ["Paper and a pencil", "A grown-up"], ["Draw a small plan of your card.", "Write which tools you will use for each part.", "Choose colours that are easy to see."])),
    CHK(ord("Put the card steps in order.", ["Plan on paper", "Draw the shapes", "Fill in the colours"], { hint: "Plan comes first.", why: "We plan, then draw, then fill.", tag: "paint.order" })),
    H("Stop 2: Paint it and compare with paper"),
    SAY("Now she paints it on the tablet. She makes a dome with shapes. She fills the sky.",
      T("Use tools to build the picture. Undo fixes mistakes.")),
    EXP("Zainab paints her card",
      SS("She draws a big dome with the shape tool.", S("Draw the dome.", ["d", "🕌", 50, 52, 3, "grow", "dome"])),
      SS("She fills the sky dark blue and the moon yellow.", S("Fill the colours.", ["m", "🌙", 70, 30, 3, "pulse", "yellow moon"], ["d", "🕌", 40, 56, 3])),
      SS("She saves the card. A digital card can be sent or printed.", S("Save the card.", ["c", "💌", 50, 50, 3, "bounce", "saved"], OKM("saved")))),
    SAY("Paper paint is real and wet. Digital paint can be undone and saved. Both are real art.",
      T("Paper and screen are different. Both can make good art.")),
    CHK(mc("What can digital paint do that paper paint cannot?", "Undo a mistake", ["Smell of paint", "Get wet"], { hint: "Think about the arrow tool.", why: "Digital paint has undo. Paper paint cannot undo.", tag: "paint.compare" })),
    SAY("Let us remember. Plan first, then paint. Both paper and digital art are real art.",
      SUM("Plan before you paint", "Choose colours that are easy to see", "Paper and digital art are both real art")),
    GLOSS({ plan: "A picture or list of what you will make.", crescent: "A thin curved moon shape.", compare: "Look at two things to see what is the same and different.", save: "Keep your work so you can open it later.", dome: "A round roof, like half a ball." }),
  ],
  mini: [
    mc("What do we do before painting a card?", "Plan it", ["Delete it", "Hide it"], { hint: "Think before you start.", why: "A plan makes painting easier." }),
    tf("A digital picture can be saved and opened later.", true, { hint: "Think of a tablet.", why: "Digital pictures can be saved." }),
    mc("Which colours are easy to read together?", "Dark blue and yellow", ["Pink and pink", "White and white"], { hint: "They should look different.", why: "Different colours are easy to see." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Zainab paints an Eid card", backdrop: "home", caption: "Zainab paints a mosque skyline and fixes a mistake with undo.",
  scenes: [
    { caption: "A tablet and an idea.", say: "Zainab wants to make an Eid card for her cousin.",
      items: [{ id: "z", emoji: "👧", label: "Zainab", x: 25, y: 56, size: 3, enter: "walk_right" }, { id: "t", emoji: "📱", x: 72, y: 50, size: 3, enter: "pop" }] },
    { caption: "Draw the dome.", say: "She uses the shape tool to draw a big dome.",
      items: [{ id: "d", emoji: "🕌", label: "dome", x: 50, y: 50, size: 3, enter: "grow" }] },
    { caption: "Fill the sky.", say: "The fill tool pours dark blue into the sky.",
      items: [{ id: "f", emoji: "🪣", x: 30, y: 45, size: 3, anim: "bounce" }, { id: "s", emoji: "🟦", x: 70, y: 45, size: 3, effect: "glow" }] },
    { caption: "Add a moon.", say: "She draws a yellow moon and some stars.",
      items: [{ id: "m", emoji: "🌙", x: 40, y: 35, size: 3, enter: "pop" }, { id: "st", emoji: "⭐", x: 70, y: 35, size: 2, effect: "sparkle" }] },
    { caption: "Oh no!", say: "Oops! She fills the dome pink by mistake.",
      items: [{ id: "p", emoji: "🟪", x: 50, y: 50, size: 3, anim: "pulse" }, { id: "q", emoji: "😮", x: 80, y: 30, size: 2 }] },
    { caption: "Tap undo.", say: "She taps undo. The mistake goes away.",
      items: [{ id: "u", emoji: "↩️", label: "undo", x: 35, y: 50, size: 3, anim: "bounce" }, { id: "d", emoji: "🕌", x: 70, y: 50, size: 3, effect: "sparkle" }] },
    { caption: "Eid Mubarak!", say: "She types Eid Mubarak on her card.",
      items: [{ id: "c", emoji: "💌", label: "Eid Mubarak", x: 50, y: 48, size: 3, effect: "hearts" }] },
    { caption: "Saved and shared.", say: "She saves the card and sends it with her mum's help.",
      items: [{ id: "z", emoji: "👧", x: 30, y: 56, size: 3, anim: "bounce" }, { id: "m", emoji: "👩", x: 70, y: 52, size: 3 }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- tools (q1-q8)
  Q(mc("Which word means made or shown on a computer?", "Digital", ["Wooden", "Heavy"], { hint: "Think of a tablet.", why: "Digital means made or shown on a computer.", tag: "paint.digital" }), "tools", "recall",
    [mc("A picture painted on a tablet is called...", "A digital picture", ["A paper picture", "A wooden picture"], { hint: "It is on a screen.", why: "A picture on a screen is a digital picture.", tag: "paint.digital" })]),
  Q(mc("Which tool draws a thin straight line?", "Line tool", ["Fill tool", "Undo tool"], { hint: "Its name has the answer.", why: "The line tool draws lines.", tag: "paint.line" }), "tools", "recall",
    [mc("Which tool makes a square or a circle?", "Shape tool", ["Fill tool", "Undo tool"], { hint: "Think about shapes.", why: "The shape tool makes shapes.", tag: "paint.shape" })]),
  Q(tf("The fill tool colours the inside of a shape.", true, { hint: "Think of a bucket.", why: "Fill pours colour inside a shape.", tag: "paint.fill" }), "tools", "recall",
    [tf("The fill tool draws a new line.", false, { hint: "Fill pours colour.", why: "Fill colours inside. It does not draw lines.", tag: "paint.fill" })]),
  Q(mat("Match each tool to its job.", [["Line tool", "Draws a line"], ["Shape tool", "Makes a shape"], ["Fill tool", "Colours inside"]], { hint: "Think about each name.", why: "Each tool does a different job.", tag: "paint.matchtool" }), "tools", "apply",
    [mat("Join each tool to its job.", [["Undo tool", "Takes back a step"], ["Brush", "Paints soft lines"], ["Fill tool", "Colours inside"]], { hint: "Think about each name.", why: "Each tool has its own job.", tag: "paint.matchtool" })]),
  Q(hot("Tap the brush.", [["🖌️", "Brush", 22, 50], ["✂️", "Scissors", 50, 50], ["📎", "Paper clip", 78, 50]], ["Brush"], { labels: true, hint: "It paints.", why: "A brush paints soft lines.", tag: "paint.brush" }), "tools", "recall",
    [hot("Tap the undo arrow.", [["↩️", "Undo", 22, 50], ["🔷", "Shape", 50, 50], ["🪣", "Fill", 78, 50]], ["Undo"], { labels: true, hint: "It goes backwards.", why: "The back arrow is undo.", tag: "paint.undo" })]),
  Q(mc("Aisha says undo deletes the whole picture. Is she right?", "No. Undo only takes back the last step", ["Yes, it deletes everything", "Yes, it turns the tablet off"], { hint: "Think about one step.", why: "Undo takes back only your last step.", tag: "paint.reason_undo" }), "tools", "reason",
    [mc("Hana says undo wipes the whole screen. Is she right?", "No. It takes back only the last thing you did", ["Yes, it clears the screen", "Yes, it breaks the app"], { hint: "It goes back one step.", why: "Undo takes back one step at a time.", tag: "paint.reason_undo" })]),
  Q(mc("Zainab says the fill tool draws lines. Is she right?", "No. The fill tool colours inside a shape", ["Yes, fill draws lines", "Yes, fill makes circles"], { hint: "Think about the bucket.", why: "Fill pours colour into a space. It does not draw lines.", tag: "paint.reason_fill" }), "tools", "reason",
    [mc("Sam says the shape tool pours colour. Is he right?", "No. The fill tool pours colour", ["Yes, shape pours colour", "Yes, shape deletes"], { hint: "Think about the bucket.", why: "Fill pours colour. Shape makes shapes.", tag: "paint.reason_fill" })]),
  Q(mc("Sam says you can only use the shape tool and never the brush. Is he right?", "No. You can use many tools in one picture", ["Yes, only one tool at a time", "Yes, the brush is not allowed"], { hint: "Think of the house.", why: "A picture can use many tools together.", tag: "paint.reason_tools" }), "tools", "reason",
    [mc("Layla says a picture can use only one tool. Is she right?", "No. Artists use many tools together", ["Yes, only one", "Yes, because it is digital"], { hint: "Think of the house.", why: "We combine tools to make a picture.", tag: "paint.reason_tools" })]),
  // ----- house (q9-q16)
  Q(ord("Put the steps for the house in order.", ["Draw the square wall", "Add the triangle roof", "Fill in the colours"], { hint: "Wall first.", why: "Wall, roof, then colours.", tag: "paint.house_order" }), "house", "apply",
    [ord("Put the steps for a tree in order.", ["Draw the brown trunk", "Draw a green circle on top", "Add leaves with the brush"], { hint: "Trunk first.", why: "Trunk, top, then leaves.", tag: "paint.house_order" })]),
  Q(num("A house has 1 square, 1 triangle and 1 rectangle door. How many shapes is that?", 3, { hint: "Count each one.", why: "1 + 1 + 1 = 3 shapes.", tag: "paint.count_shapes" }), "house", "apply",
    [num("A picture has 2 squares, 1 triangle and 1 circle. How many shapes is that?", 4, { hint: "Count each one.", why: "2 + 1 + 1 = 4 shapes.", tag: "paint.count_shapes" })]),
  Q(mc("You filled the door green by mistake. Which tool fixes it?", "Undo", ["Shape", "Line"], { hint: "It takes back a step.", why: "Undo takes back your mistake.", tag: "paint.undo_fix" }), "house", "apply",
    [mc("You drew a line in the wrong place. Which tool fixes it quickly?", "Undo", ["Fill", "Shape"], { hint: "It goes back a step.", why: "Undo takes back the line.", tag: "paint.undo_fix" })]),
  Q(fill("Finish the sentences about a house.", "A {b1} is a good shape for the wall, and a {b2} is a good shape for the roof.", [["square", "star", "heart"], ["triangle", "circle", "cloud"]], { hint: "Think of a real house.", why: "A square makes a wall and a triangle makes a roof.", tag: "paint.house_shapes" }), "house", "apply",
    [fill("Complete the sentences about tools.", "The {b1} tool colours inside, and the {b2} tool takes back a step.", [["fill", "line", "shape"], ["undo", "fill", "brush"]], { hint: "Think about the jobs.", why: "Fill colours inside and undo takes back a step.", tag: "paint.house_shapes" })]),
  Q(ord("Put these steps in order to fix a mistake.", ["Notice the mistake", "Tap undo", "Carry on painting"], { hint: "Notice first.", why: "Notice, undo, then carry on.", tag: "paint.fix_order" }), "house", "apply",
    [ord("Put these steps in order for painting a sun.", ["Draw a circle", "Fill it yellow", "Add lines for rays"], { hint: "Circle first.", why: "Circle, fill, then rays.", tag: "paint.fix_order" })]),
  Q(sld("A street has 5 houses. Each roof is 1 triangle. Slide to show how many triangles there are.", { min: 0, max: 10 }, 5, 0, { hint: "One roof for each house.", why: "5 houses with 1 roof each need 5 triangles.", tag: "paint.slider_triangles" }), "house", "apply",
    [sld("A street has 6 houses. Each roof is 1 triangle. Slide to show how many triangles there are.", { min: 0, max: 10 }, 6, 0, { hint: "One roof for each house.", why: "6 houses need 6 triangles.", tag: "paint.slider_triangles" })]),
  Q(mc("Sam says one mistake means you must start the whole picture again. Is he right?", "No. You can tap undo and keep going", ["Yes, always start again", "Yes, delete the app"], { hint: "Is there a tool?", why: "Undo lets you fix a mistake and keep going.", tag: "paint.reason_start_again" }), "house", "reason",
    [mc("Mina says a wrong colour means her picture is ruined. Is she right?", "No. She can undo it and try again", ["Yes, it is ruined", "Yes, she must stop"], { hint: "Is there a tool?", why: "Undo or a new fill fixes the colour.", tag: "paint.reason_start_again" })]),
  Q(ms("Which two ways fix a wrong colour? Pick two.", ["Tap undo", "Fill it with the right colour"], ["Turn the tablet upside down", "Hide the screen"], { hint: "Use tools in the app.", why: "Undo or a new fill both fix a wrong colour.", tag: "paint.fix_ways" }), "house", "apply",
    [ms("Which two help fix a mistake? Pick two.", ["The undo tool", "Painting over it"], ["Shouting at the screen", "Closing your eyes"], { hint: "Use tools in the app.", why: "Undo and painting over both fix mistakes.", tag: "paint.fix_ways" })]),
  // ----- match (q17-q23)
  Q(mat("Match each job to the tool that does it.", [["Colour inside a square", "Fill"], ["Draw a circle", "Shape"], ["Take back a mistake", "Undo"]], { hint: "Think about each job.", why: "Fill colours, shape draws and undo takes back.", tag: "paint.matchjob" }), "match", "apply",
    [mat("Pair each job with the best tool.", [["Paint a soft line", "Brush"], ["Make a triangle", "Shape"], ["Colour the sky", "Fill"]], { hint: "Think about each job.", why: "Each tool has a job.", tag: "paint.matchjob" })]),
  Q(tf("You can use undo on a paper painting.", false, { hint: "Paper paint is wet and real.", why: "Undo is a digital tool. Paper cannot undo.", tag: "paint.paper_screen" }), "match", "recall",
    [tf("You can save a digital picture and open it later.", true, { hint: "Think of a tablet.", why: "Digital pictures can be saved.", tag: "paint.paper_screen" })]),
  Q(mc("Which tool is best for a soft, wavy line?", "Brush", ["Shape", "Undo"], { hint: "Think of a paint brush.", why: "A brush paints soft lines.", tag: "paint.brush" }), "match", "apply",
    [mc("Which tool is best for a neat straight line?", "Line tool", ["Brush", "Undo"], { hint: "Think of a ruler.", why: "The line tool makes straight lines.", tag: "paint.line_brush" })]),
  Q(mc("Aisha says the brush and the line tool do exactly the same job. Is she right?", "No. A brush paints soft lines. The line tool makes straight lines", ["Yes, they are the same", "Yes, both only fill"], { hint: "Compare the lines they make.", why: "A brush is soft and wavy. A line tool is straight.", tag: "paint.reason_brush_line" }), "match", "reason",
    [mc("Omar says the shape tool and the fill tool are the same. Is he right?", "No. Shape draws shapes and fill colours them", ["Yes, they are the same", "Yes, both undo"], { hint: "Compare their jobs.", why: "Shape draws. Fill colours.", tag: "paint.reason_brush_line" })]),
  Q(sld("A paint app shows 3 tools: line, shape and fill. Slide to show how many tools.", { min: 0, max: 8 }, 3, 0, { hint: "Count them.", why: "Line, shape and fill make 3 tools.", tag: "paint.slider_tools" }), "match", "apply",
    [sld("A paint app shows 5 tools. You use 2. Slide to show how many are left unused.", { min: 0, max: 8 }, 3, 0, { hint: "5 take away 2.", why: "5 - 2 = 3 tools unused.", tag: "paint.slider_tools" })]),
  Q(fill("Finish the sentence about saving.", "We {b1} a picture so we can {b2} it later.", [["save", "lose", "melt"], ["open", "eat", "wash"]], { hint: "Think about keeping your work.", why: "We save a picture so we can open it later.", tag: "paint.save" }), "match", "recall",
    [fill("Complete the sentence about digital art.", "A digital picture is made on a {b1} or {b2}.", [["tablet", "bucket", "shoe"], ["computer", "banana", "ladder"]], { hint: "Think about screens.", why: "Digital pictures are made on a tablet or a computer.", tag: "paint.save" })]),
  Q(mc("Omar says computer pictures cannot be as nice as paper paintings. Is he right?", "No. Both can be lovely. They are just different", ["Yes, paper is always better", "Yes, computers cannot make art"], { hint: "Think about the Eid card.", why: "Digital and paper art can both be beautiful.", tag: "paint.reason_nice" }), "match", "reason",
    [mc("Sana says only paper paint is real art. Is she right?", "No. Digital art is real art too", ["Yes, only paper counts", "Yes, screens cannot be art"], { hint: "Think about the Eid card.", why: "Digital and paper art are both real art.", tag: "paint.reason_nice" })]),
  // ----- card (q24-q30)
  Q(ord("Put these steps for making the card in order.", ["Plan on paper", "Draw the shapes", "Fill the colours", "Save the card"], { hint: "Plan first, save last.", why: "Plan, draw, fill, then save.", tag: "paint.card_order" }), "card", "apply",
    [ord("Put these steps for an Eid card in order.", ["Choose colours", "Draw the moon and dome", "Add a message", "Share it kindly"], { hint: "Plan first, share last.", why: "Choose, draw, write, then share.", tag: "paint.card_order" })]),
  Q(ms("Which two colour pairs are easy to see? Pick two.", ["Dark blue and yellow", "Black and white"], ["Pink on pink", "Yellow on white"], { hint: "They should look very different.", why: "Dark colours and light colours stand out.", tag: "paint.colours" }), "card", "apply",
    [ms("Which two colour pairs are easy to read? Pick two.", ["Navy and cream", "Green and white"], ["Grey on grey", "Light yellow on white"], { hint: "They should look very different.", why: "Strong differences are easy to read.", tag: "paint.colours" })]),
  Q(mc("Layla says planning first wastes time. Is she right?", "No. A plan helps you know which tools to use", ["Yes, never plan", "Yes, planning is slow"], { hint: "Think about the card plan.", why: "A plan saves time and helps you choose tools.", tag: "paint.reason_plan" }), "card", "reason",
    [mc("Ben says he does not need a plan for a big picture. Is he right?", "No. A plan helps with a big picture", ["Yes, plans are useless", "Yes, big pictures plan themselves"], { hint: "Think about the card plan.", why: "A plan helps you choose shapes, colours and tools.", tag: "paint.reason_plan" })]),
  Q(hot("Tap the clearest card to read.", [["📕", "Dark blue on yellow", 22, 50], ["📗", "Green on green", 50, 50], ["📘", "Blue on blue", 78, 50]], ["Dark blue on yellow"], { labels: true, hint: "Look for colours that stand out.", why: "Dark blue on yellow is easy to read.", tag: "paint.clear_card" }), "card", "apply",
    [hot("Tap the card with colours that stand out.", [["📙", "White on yellow", 22, 50], ["📘", "Black on white", 50, 50], ["📗", "Green on green", 78, 50]], ["Black on white"], { labels: true, hint: "Look for very different colours.", why: "Black on white stands out.", tag: "paint.clear_card" })]),
  Q(num("Zainab uses 3 colours and 2 shapes on her card. How many things is that in all?", 5, { hint: "Add 3 and 2.", why: "3 + 2 = 5.", tag: "paint.count_card" }), "card", "apply",
    [num("A card has 4 stars and 3 moons. How many shapes is that in all?", 7, { hint: "Add 4 and 3.", why: "4 + 3 = 7.", tag: "paint.count_card" })]),
  Q(mc("Omar says a computer picture is not real art. Is he right?", "No. A digital picture is real art", ["Yes, only paper is art", "Yes, screens cannot be art"], { hint: "Think about the Eid card.", why: "Digital art takes ideas, plans and skill.", tag: "paint.reason_real" }), "card", "reason",
    [mc("Aisha says art must be made with paint to count. Is she right?", "No. Art can be made on paper or on a screen", ["Yes, only paint counts", "Yes, screens are not art"], { hint: "Think about the Eid card.", why: "Art can be made in many ways.", tag: "paint.reason_real" })]),
  Q(mc("Which is a kind thing to say about a friend's picture?", "I like the colours you chose", ["That is rubbish", "I do not like it"], { hint: "Be kind and helpful.", why: "Kind feedback names something good.", tag: "paint.kind" }), "card", "apply",
    [mc("A friend shares a picture. What kind thing could you say?", "Your moon looks lovely", ["Yours is the worst", "Delete it"], { hint: "Be kind and helpful.", why: "Kind words help friends keep trying.", tag: "paint.kind" })]),
];

export const topics = [
  topicLesson({
    slug: "data-ai-class-1-paint-on-a-computer", subject: "data-ai", cls: 1, topic: 5, title: "Paint on a Computer",
    summary: "Use line, shape, fill, brush and undo tools to make a digital picture.",
    unit: "Topic 5: Paint on a computer", difficulty: 1,
    objectives: ["Use line and shape tools", "Use undo to fix a mistake", "Say how digital painting differs from paper painting"],
    success_criteria: ["I can name the line, shape, fill and undo tools", "I can fix a mistake with undo", "I can say one way digital and paper art differ"],
    real_life: "Making an Eid card, a poster for a school fair or a picture on a family tablet.",
    standards: [
      { framework: "nc_england", code: "KS1 uses of IT", text: "Use technology purposefully to create, organise, store, manipulate and retrieve digital content" },
      { framework: "csta", code: "1A-CS-01", text: "Select and operate appropriate software and hardware to perform a variety of tasks" },
    ],
    warm_up: [
      mc("What is a bug in a program?", "A mistake", ["A flower", "A button"], { hint: "It is not an insect.", why: "A bug is a mistake in instructions." }),
      mc("Which is private?", "A password", ["A favourite colour", "A funny joke"], { hint: "A secret key.", why: "Passwords are private." }),
      num("What is 4 + 3?", 7, { hint: "Count on from 4.", why: "4 + 3 = 7." }),
    ],
    intro: [],
    subs: [tools, house, match, card],
    clip,
    quiz,
  }),
];
