import { SAY, SS, H, T, IMG, PHOTO, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Coteach diagrams (see content/media/manifest.d/maths-class-4-charts-tables-graphs.json).
const COTEACH_A = {"type":"image","asset":"maths-class-4-charts-tables-graphs-d1-9509dd0c.png","alt":"A bar chart with a scale in 2s from 0 to 10 and labelled bars for cat, dog, fish and rabbit","caption":"A bar chart with a scale in twos."};
const COTEACH_B = {"type":"image","asset":"maths-class-4-charts-tables-graphs-d2-92be0ef2.png","alt":"A pictogram with a key where one picture stands for 4 children and three pictures shown for 12","caption":"3 pictures × 4 = 12 children."};
// Class 4 Maths topic 11: Charts, tables and graphs (NEW, format 3.0).
// Story thread: Zara's class votes on fruit for a picnic, then the class reads weather and rainfall tables.
// Oak has no Year 4 statistics unit; the spec uses the closest Oak lessons (see content/sources).
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });
const HB = (text, backdrop) => ({ ...H(text), backdrop });
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });
const OK = (label) => ["ok", "✅", 50, 90, 2, "bounce", label];
const FRUIT_PHOTO = "maths-class-4-charts-tables-graphs-1-59eb6b5b.jpg";

// ---------------------------------------------------------------------------------------------- 1. learn
const barReading = {
  id: "bar_reading", kind: "learn", title: "Reading a bar chart",
  blocks: [
    HB("Zara's class picks a picnic fruit", "classroom"),
    SAY("Zara's class is planning a picnic. Everyone votes for their favourite fruit. The votes go on a chart so we can see the results at a glance. Let's learn how to read one.",
      PHOTO(FRUIT_PHOTO, "A white bowl of lemons and bananas on a table", "A bowl of fruit: the class votes for their favourite.", "Photo by Martin de Arriba on Unsplash")),
    HB("Stop 1: The scale goes up in steps", "classroom"),
    SAY("A bar chart has a scale up the side. The scale tells us how much each step is worth. If the scale goes up in twos, each line adds two. Count the steps to read a bar.",
      T("The **scale** tells you what each step is worth.", "A scale going up in 2s: 0, 2, 4, 6, 8, 10.")),
    EXPP("Reading the scale in 2s",
      SS("The bottom of the scale is zero. The next line is two.", S("0, 2, 4", ["s", "📊", 30, 50, 2, "none", "0 2 4"])),
      SS("A bar reaches the fourth line. That is eight votes.", S("8 votes", ["s", "📊", 30, 50, 2, "none", "0 2 4"], ["b", "🍌", 70, 50, 3, "pulse", "8 votes"])),
      SS("Each line is worth two, so four lines is eight.", S("4 lines × 2 = 8", ["s", "📊", 30, 50, 2, "none"], OK("4 lines × 2 = 8")))),
    SAY("Check the scale. It goes up in twos. Each bar shows its number.", COTEACH_A),
    CHK(num("A bar reaches the fifth line on a scale that goes up in 2s. How many votes?", 10, { hint: "Five lines, each worth two.", why: "5 × 2 = 10.", tag: "charts.scale" })),
    HB("Stop 2: Pictograms and their key", "classroom"),
    SAY("A pictogram uses pictures. The key tells you what one picture stands for. If one picture is four children, then three pictures are twelve children.",
      T("A **key** says what one picture means: 1 picture = 4 children.", "3 pictures = 3 × 4 = 12 children.")),
    IMG("🍌", "Each banana picture stands for four children."),
    CHK(mc("On a pictogram, one picture = 4. How many children do two pictures show?", "8", ["6", "4"], { hint: "Two lots of four.", why: "2 × 4 = 8.", tag: "charts.key" })),
    SAY("Remember. Read the scale. Read the key. Count the steps or pictures.", SUM("Read the scale: what is each step worth?", "Read the key: what is one picture?", "Count the steps or pictures")),
    GLOSS({ "bar chart": "A chart with bars whose length shows the value.", pictogram: "A chart that uses pictures to show amounts.", key: "Says what one picture stands for.", scale: "The numbers that show how much each step is worth.", title: "The name of the chart. It says what the chart is about." }),
  ],
  mini: [
    num("On a scale that goes up in 5s, a bar reaches the third line. What is its value?", 15, { hint: "Three lines of five.", why: "3 × 5 = 15." }),
    mc("What does a key tell you on a pictogram?", "What one picture stands for", ["The total", "The title"], { hint: "Look at the bottom of the chart.", why: "The key says what one picture is worth." }),
    tf("A bar chart can start its scale at zero.", true, { hint: "Look at the scale.", why: "Many scales start at zero." }),
    ord("Put these steps in order, first first.", ["Read the scale", "Read the key", "Count the bars"], { hint: "Start with the scale.", why: "Scale, then key, then count." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const makeChart = {
  id: "make_chart", kind: "try", title: "Make your own chart",
  blocks: [
    HB("Stop 1: Tally to table", "classroom"),
    SAY("First collect the votes with tally marks. Four lines and a slash make five. Then count the tallies and write them in a table. A table has rows and columns, so it is easy to read.",
      T("A **tally** groups marks in fives: |||| with a slash is 5.", "Turn tallies into a table: apple 8, mango 5.")),
    EXPP("From tallies to a table",
      SS("Apple: four lines and a slash is five, plus three more. That is eight.", S("apple: 8", ["t", "🍎", 30, 50, 3, "none", "apple"])),
      SS("Mango: one tally group of five.", S("mango: 5", ["t", "🍎", 30, 50, 2, "none", "apple 8"], ["m", "🥭", 70, 50, 3, "pulse", "mango 5"])),
      SS("Write both in a table. Apple 8, mango 5.", S("table", ["t", "🍎", 30, 50, 2, "none"], OK("apple 8, mango 5")))),
    SAY("In a pictogram, the key tells us the value. Here one picture means four children.", COTEACH_B),
    CHK(num("Tally: four lines and a slash, then two more. What is the total?", 7, { hint: "Five, then two more.", why: "5 + 2 = 7.", tag: "charts.tally" })),
    HB("Stop 2: Choose a scale", "classroom"),
    SAY("Choose a scale that fits your data. If the biggest number is 20, a scale in 5s from 0 to 20 works well. Draw each bar to match its value on the scale.",
      T("Pick a **scale** that fits the biggest value.", "A scale of 0, 5, 10, 15, 20 fits values up to 20.")),
    IMG("📏", "A bar for 15 reaches the third line of a scale in 5s."),
    CHK(mc("Which scale fits values up to 20?", "0, 5, 10, 15, 20", ["0, 50, 100", "0, 2, 4, 6"], { hint: "The scale must reach the biggest value.", why: "0 to 20 in 5s fits values up to 20.", tag: "charts.scale_choice" })),
    ACT("Survey and tally", ["Paper", "Pencil"], ["Ask five friends their favourite fruit.", "Make a tally mark for each answer.", "Count the tallies in fives.", "Draw a bar for each fruit on a scale."]),
    SAY("Remember. Tallies become a table. A table becomes a bar chart with a scale.", SUM("Tallies in fives", "Choose a scale that fits the data", "Label the axes and write a title")),
    GLOSS({ scale: "The numbers that show how much each step is worth.", tally: "Marks counted in fives, like four lines and a slash.", table: "Information in rows and columns.", axis: "A line with labels, like the side of a bar chart.", data: "Information we collect, like votes." }),
  ],
  mini: [
    num("A tally shows five lines and a slash, then four more. What is the total?", 9, { hint: "Five plus four.", why: "5 + 4 = 9." }),
    tf("A table can be turned into a bar chart.", true, { hint: "Use the numbers in the table.", why: "Yes, the table gives the values for the bars." }),
    mc("Which chart uses pictures?", "A pictogram", ["A bar chart", "A table"], { hint: "Think of the key.", why: "A pictogram uses pictures and a key." }),
    ord("Put these tallies in order, smallest first.", ["7", "3", "9"], { hint: "Compare the numbers.", why: "3, 7, 9." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const dataDetective = {
  id: "data_detective", kind: "play", title: "Data detective",
  blocks: [
    HB("Stop 1: Totals in a table", "classroom"),
    SAY("A table can have totals. Add the numbers in a row to find the total for that row. Each row is one day or one class. Let's be a data detective and add each row.",
      T("To find a **total**, add all the numbers in the row.", "Mon 12 + Tue 9 + Wed 14 = 35.")),
    EXPP("Weekly votes in a table",
      SS("Monday has 12 votes.", S("Mon: 12", ["r", "🗓️", 50, 50, 3, "none", "Mon 12"])),
      SS("Add Tuesday's 9 and Wednesday's 14.", S("12 + 9 + 14", ["r", "🗓️", 30, 50, 2, "none", "Mon 12"], ["q", "➕", 70, 50, 3, "pulse", "9 and 14"])),
      SS("The total is 35 votes.", S("35", ["r", "🗓️", 30, 50, 2, "none"], OK("12 + 9 + 14 = 35")))),
    CHK(num("A table has rows of 7, 11 and 6. What is the total?", 24, { hint: "Add the three numbers.", why: "7 + 11 + 6 = 24.", tag: "charts.total" })),
    HB("Stop 2: Reading a line graph", "classroom"),
    SAY("A line graph shows change over time. Read the start point and the end point, then find the change. From 12 degrees to 18 degrees is a rise of six degrees.",
      T("The **change** is the end value take away the start value.", "18 − 12 = 6 degrees.")),
    IMG("🌡️", "A temperature line that rises from 12 to 18 degrees."),
    CHK(mc("The temperature falls from 30 degrees to 25 degrees. How much did it fall?", "5 degrees", ["55 degrees", "25 degrees"], { hint: "Take the smaller from the bigger.", why: "30 − 25 = 5.", tag: "charts.change" })),
    SAY("Brain break. Find the matching charts.", BRAIN("memory_match", "Chart pairs", "Find the matching charts.", ["📊", "📈", "🔢", "🍌", "🍎", "🥭"])),
    ACT("Data at home", ["Paper and a pencil", "A week of temperatures or a family survey"], ["Write the numbers in a table, one row for each day.", "Add each row to find the totals.", "Find the biggest and smallest number.", "Write one sentence about what you found."]),
    SAY("Remember. Add a row for a total. Take the start from the end to find the change.", SUM("Total: add the row", "Change: end take away start", "Check the answer by adding back")),
    GLOSS({ total: "The answer when you add all the numbers in a row.", "line graph": "A graph with points joined by a line, to show change over time.", change: "How much a value has gone up or down.", "start value": "The first number in the data.", "end value": "The last number in the data." }),
  ],
  mini: [
    num("A row has 5, 8 and 6. What is the total?", 19, { hint: "Add the three numbers.", why: "5 + 8 + 6 = 19." }),
    mc("A line graph goes from 4 degrees to 10 degrees. What is the change?", "6 degrees", ["14 degrees", "4 degrees"], { hint: "End take away start.", why: "10 − 4 = 6." }),
    tf("The change between 8 and 3 is 11.", false, { hint: "Take the smaller from the bigger.", why: "8 − 3 = 5." }),
    num("What is 9 + 9 + 4?", 22, { hint: "Two nines and a four.", why: "18 + 4 = 22." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const questions = {
  id: "questions", kind: "use", title: "Questions from data",
  blocks: [
    HB("Stop 1: Whole-class questions", "classroom"),
    SAY("The class voted. Fourteen children chose mango and nine chose apple. How many children voted in all? Look for words like in all, and add. Then check your answer.",
      T("**In all** means add. 14 + 9 = 23 children.", "Check: 23 − 9 = 14.")),
    EXPP("How many voted in all?",
      SS("Fourteen children chose mango.", S("mango 14", ["v", "🥭", 30, 50, 3, "none", "mango 14"])),
      SS("Nine children chose apple.", S("mango 14", ["v", "🥭", 30, 50, 2, "none"], ["w", "🍎", 70, 50, 3, "pulse", "apple 9"])),
      SS("Together, 23 children voted.", S("23", ["v", "🥭", 30, 50, 2, "none"], OK("14 + 9 = 23")))),
    CHK(num("Eleven children chose lemon and eight chose kiwi. How many in all?", 19, { hint: "Add them.", why: "11 + 8 = 19.", tag: "charts.in_all" })),
    HB("Stop 2: Choose the right chart", "home"),
    SAY("Different charts suit different jobs. A line graph shows how a value changes through the day. A bar chart compares groups. Choose the chart that fits the question.",
      T("**Line graph**: change over time. **Bar chart**: compare groups.", "Pick the chart that matches your question.")),
    IMG("📈", "A line graph suits change over time."),
    CHK(tf("A line graph is good for showing how the temperature changes through the day.", true, { hint: "Think of change over time.", why: "A line graph shows change over time.", tag: "charts.suit" })),
    SAY("Remember. Read the scale. Choose the chart that suits the question. Write a conclusion in words.", SUM("Read the scale and the key", "Choose the chart that suits the question", "Write a conclusion in words")),
    GLOSS({ "bar chart": "A chart with bars whose length shows the value.", "line graph": "A graph with points joined by a line, to show change over time.", conclusion: "A sentence that says what the data shows.", compare: "Look at two things side by side.", "in all": "All together, which usually means add." }),
  ],
  mini: [
    num("Four classes each have 25 children. How many children in all?", 100, { hint: "Four times 25.", why: "4 × 25 = 100." }),
    mc("Which chart compares favourite fruits?", "A bar chart", ["A line graph", "A timer"], { hint: "Groups side by side.", why: "A bar chart compares groups." }),
    tf("A conclusion should say what the chart shows, in words.", true, { hint: "Say it in a sentence.", why: "A conclusion is a sentence about the data." }),
    num("What is 3 × 15?", 45, { hint: "Three fifteens.", why: "3 × 15 = 45." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "The class votes for fruit", backdrop: "classroom", caption: "A class votes for picnic fruit, builds a bar chart from tallies and spots the scale.",
  scenes: [
    { caption: "The class votes.", say: "This is Zara's class. Everyone votes for their favourite picnic fruit.",
      items: [{ id: "z", emoji: "👧", label: "Zara", x: 22, y: 56, size: 3, anim: "bounce", enter: "walk_right" }, { id: "v", emoji: "🗳️", label: "votes", x: 72, y: 46, size: 3, enter: "pop" }] },
    { caption: "Tally marks.", say: "Zara writes tally marks. Four lines and a slash make five.",
      items: [{ id: "t", emoji: "🔢", label: "||||/", x: 50, y: 46, size: 3, enter: "grow" }] },
    { caption: "A table.", say: "The tallies go into a table. Apple has eight votes. Mango has five.",
      items: [{ id: "a", emoji: "🍎", label: "apple 8", x: 30, y: 46, size: 2, enter: "slide_right" }, { id: "m", emoji: "🥭", label: "mango 5", x: 70, y: 46, size: 2, enter: "slide_left" }] },
    { caption: "The scale goes up in twos.", say: "Zara notices the scale on the chart goes up in twos.",
      camera: { zoom: 1.2, x: 50, y: 46 },
      items: [{ id: "s", emoji: "📊", label: "0, 2, 4, 6, 8", x: 50, y: 46, size: 3, effect: "glow" }] },
    { caption: "Count the lines.", say: "Eight votes is four lines on a scale that goes up in twos.",
      items: [{ id: "c", emoji: "🍎", label: "8 votes", x: 50, y: 46, size: 3, effect: "sparkle" }] },
    { caption: "Shukriya, Zara!", say: "Charts help us see the answer quickly. Shukriya, Zara!",
      items: [{ id: "z", emoji: "👧", label: "Zara", x: 22, y: 56, size: 3, anim: "bounce" }, { id: "r", emoji: "🎉", label: "Picnic fruit!", x: 70, y: 40, size: 2, effect: "hearts" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- bar_reading (q1-q8)
  Q(num("On a bar chart, each square is 2 cats. A bar has 5 squares. How many cats?", 10, { hint: "Five lots of two.", why: "5 × 2 = 10 cats.", tag: "charts.scale" }), "bar_reading", "apply",
    [num("On a bar chart, each square is 5 apples. A bar has 3 squares. How many apples?", 15, { hint: "Three lots of five.", why: "3 × 5 = 15 apples.", tag: "charts.scale" })]),
  Q(mc("What does the title on a chart tell you?", "What the chart is about", ["The scale", "The colour"], { hint: "Read the top of the chart.", why: "The title says what the chart shows.", tag: "charts.title" }), "bar_reading", "recall",
    [mc("Which part of a chart says what the chart is about?", "The title", ["The scale", "The key"], { hint: "Read the top of the chart.", why: "The title says what the chart shows.", tag: "charts.title" })]),
  Q(tf("On a pictogram, half a picture can show half of the key value.", true, { hint: "Half of the key value.", why: "If one picture is 4, half is 2.", tag: "charts.key" }), "bar_reading", "recall",
    [tf("If one picture is 10, half a picture shows 10.", false, { hint: "Half of 10.", why: "Half of 10 is 5.", tag: "charts.key" })]),
  Q(fill("Fill in the key.", "The key says 1 picture = {b1}. A row with 3 pictures shows {b2}.", [["4", "3", "5"], ["12", "3", "4"]], { hint: "3 × 4.", why: "1 picture = 4, so 3 pictures = 12.", tag: "charts.key" }), "bar_reading", "apply",
    [fill("Fill in the other key.", "The key says 1 picture = {b1}. A row with 6 pictures shows {b2}.", [["5", "6", "30"], ["30", "6", "5"]], { hint: "6 × 5.", why: "1 picture = 5, so 6 pictures = 30.", tag: "charts.key" })]),
  Q(ms("Which two are things a chart needs? Pick two.", ["Title", "Axis labels"], ["Secret code", "Extra doodle"], { hint: "Think about what a reader needs.", why: "A title and axis labels help a reader.", tag: "charts.parts" }), "bar_reading", "apply",
    [ms("Pick two things that help a reader.", ["Key", "Scale"], ["Doodle", "Stamp"], { hint: "Think about what a reader needs.", why: "A key and a scale help a reader.", tag: "charts.parts" })]),
  Q(ord("Put the steps for making a bar chart in order.", ["Choose a scale", "Draw the bars", "Label the axes", "Write the title"], { hint: "Start with the scale.", why: "Scale, bars, labels, title.", tag: "charts.steps" }), "bar_reading", "apply",
    [ord("Put these steps for a tally table in order.", ["Count the tallies", "Make the table", "Draw the chart", "Check the total"], { hint: "Start with the marks.", why: "Count, table, chart, check.", tag: "charts.steps" })]),
  Q(sld("A bar chart scale goes up in 2s. A bar reaches the 7th line. Slide to show its value.", { min: 0, max: 20, step: 1 }, 14, 1, { hint: "Seven lines, each worth two.", why: "7 × 2 = 14.", tag: "charts.scale_line" }), "bar_reading", "apply",
    [sld("A bar chart scale goes up in 3s. A bar reaches the 3rd line. Slide to show its value.", { min: 0, max: 20, step: 1 }, 9, 1, { hint: "Three lines, each worth three.", why: "3 × 3 = 9.", tag: "charts.scale_line" })]),
  Q(mat("Match each chart word to its meaning.", [["Scale", "numbers along the side"], ["Key", "what one picture means"], ["Title", "what the chart is about"]], { hint: "Think about what each word does.", why: "Scale, key and title each have one job.", tag: "charts.vocab" }), "bar_reading", "apply",
    [mat("Join each word to its meaning.", [["Axis", "a line with labels"], ["Tally", "marks counted in fives"], ["Table", "rows and columns of data"]], { hint: "Think about what each word means.", why: "Axis, tally and table.", tag: "charts.vocab" })]),
  // ----- make_chart (q9-q16)
  Q(num("A tally shows four lines and a slash, then three more. What is the total?", 8, { hint: "Five plus three.", why: "5 + 3 = 8.", tag: "charts.tally" }), "make_chart", "apply",
    [num("A tally shows two groups of four lines and a slash, then two more. What is the total?", 12, { hint: "Five, five, then two.", why: "5 + 5 + 2 = 12.", tag: "charts.tally" })]),
  Q(mc("Aisha says a taller bar always means a bigger category, even when the scale is different. Is she right?", "No. The scale matters, so check the numbers on the side", ["Yes, taller is always bigger", "No, bars are always the same height"], { hint: "Read the scale first.", why: "A bar's height only means something on its own scale.", tag: "charts.reason_scale" }), "make_chart", "reason",
    [mc("Sam says bars for 4 and 8 on the same scale are the same height. Is he right?", "No. 8 is twice as tall as 4 on the same scale", ["Yes, same height", "No, 8 is shorter"], { hint: "Count the steps on the scale.", why: "8 is four steps and 4 is two steps.", tag: "charts.reason_scale" })]),
  Q(tf("You can make a bar chart from a tally table.", true, { hint: "Use the numbers in the table.", why: "The table gives the bar values.", tag: "charts.table" }), "make_chart", "recall",
    [tf("A pictogram must have bars.", false, { hint: "A pictogram uses pictures.", why: "A pictogram uses pictures, not bars.", tag: "charts.table" })]),
  Q(fill("Fill in the table total.", "Apples 5 and bananas 3 make {b1} altogether.", [["8", "9", "2"]], { hint: "Add the two numbers.", why: "5 + 3 = 8.", tag: "charts.total" }), "make_chart", "apply",
    [fill("Fill in the other table total.", "Peaches 6 and plums 7 make {b1} altogether.", [["13", "12", "14"]], { hint: "Add the two numbers.", why: "6 + 7 = 13.", tag: "charts.total" })]),
  Q(ms("Which two are sensible scales for a bar chart? Pick two.", ["Counting in 2s", "Counting in 5s"], ["Jumps of 1 on a big number", "Mixed up numbers"], { hint: "A scale must go up in equal steps.", why: "2s and 5s go up in equal steps.", tag: "charts.scale_choice" }), "make_chart", "apply",
    [ms("Pick two sensible scales for a chart from 0 to 50.", ["0, 10, 20, 30, 40, 50", "0, 25, 50"], ["0, 7, 14", "0, 3, 9, 27"], { hint: "Equal steps that reach 50.", why: "Equal steps of 10 or 25 reach 50.", tag: "charts.scale_choice" })]),
  Q(ord("Order these tallies from the smallest value.", ["4", "7", "9", "12"], { hint: "Compare the numbers.", why: "4, 7, 9, 12.", tag: "charts.order" }), "make_chart", "apply",
    [ord("Sort these tally totals, smallest first.", ["2", "6", "10", "13"], { hint: "Compare the numbers.", why: "2, 6, 10, 13.", tag: "charts.order" })]),
  Q(mc("Hana draws the scale 0, 5, 10, 15, 20 for values up to 20. Is she right?", "Yes. Equal steps of 5 reach 20, the biggest value", ["No, the scale must go up in 1s", "No, the scale must end at 100"], { hint: "Does the scale reach the biggest value?", why: "The scale reaches 20 in equal steps.", tag: "charts.reason_scale" }), "make_chart", "reason",
    [mc("Ben draws a scale of 0, 50, 100 for values up to 20. Is he right?", "No. The steps are too big, so the values cannot be read well", ["Yes, 100 is bigger than 20", "No, it is fine"], { hint: "Can you read 12 on that scale?", why: "The scale is too coarse for values up to 20.", tag: "charts.reason_scale" })]),
  Q(hot("Tap the chart that suits comparing favourite fruit.", [["📊", "Bar chart", 22, 50], ["📈", "Line graph", 50, 50], ["🔢", "Tally", 78, 50]], ["Bar chart"], { labels: true, hint: "Groups side by side.", why: "A bar chart compares groups.", tag: "charts.suit" }), "make_chart", "apply",
    [hot("Tap the chart that suits showing temperature through the day.", [["📈", "Line graph", 22, 50], ["🟦", "Pictogram", 50, 50], ["🔢", "Tally", 78, 50]], ["Line graph"], { labels: true, hint: "Change over time.", why: "A line graph shows change over time.", tag: "charts.suit" })]),
  // ----- data_detective (q17-q24)
  Q(num("Mon 7, Tue 11, Wed 6. What is the total?", 24, { hint: "Add the three numbers.", why: "7 + 11 + 6 = 24.", tag: "charts.total" }), "data_detective", "apply",
    [num("Mon 9, Tue 4, Wed 12. What is the total?", 25, { hint: "Add the three numbers.", why: "9 + 4 + 12 = 25.", tag: "charts.total" })]),
  Q(mc("On a line graph, the temperature at 9 am is 12 degrees and at noon it is 18 degrees. How much did it rise?", "6 degrees", ["12 degrees", "30 degrees"], { hint: "End take away start.", why: "18 − 12 = 6.", tag: "charts.change" }), "data_detective", "apply",
    [mc("The temperature falls from 20 degrees to 15 degrees. How much did it fall?", "5 degrees", ["35 degrees", "15 degrees"], { hint: "End take away start.", why: "20 − 15 = 5.", tag: "charts.change" })]),
  Q(hot("Tap the biggest bar: 6 cats, 9 dogs, 4 birds.", [["📊", "Cats 6", 22, 50], ["📊", "Dogs 9", 50, 50], ["📊", "Birds 4", 78, 50]], ["Dogs 9"], { labels: true, hint: "Which value is largest?", why: "9 is the biggest number.", tag: "charts.biggest" }), "data_detective", "apply",
    [hot("Tap the smallest bar: 6 cats, 9 dogs, 4 birds.", [["📊", "Cats 6", 22, 50], ["📊", "Dogs 9", 50, 50], ["📊", "Birds 4", 78, 50]], ["Birds 4"], { labels: true, hint: "Which value is smallest?", why: "4 is the smallest number.", tag: "charts.biggest" })]),
  Q(mc("Omar says the total of a table is always the same as the tallest bar. Is he right?", "No. The total adds all the bars, so it can be bigger than the tallest", ["Yes, always", "No, the total is always smaller"], { hint: "What does a total do?", why: "A total adds every bar together.", tag: "charts.reason_total" }), "data_detective", "reason",
    [mc("Zainab says the total of bars 9 and 4 is the same as the tallest bar, 9. Is she right?", "No. 9 + 4 = 13, which is more than the tallest bar", ["Yes, 9", "No, the total is 5"], { hint: "A total adds every bar.", why: "9 + 4 = 13.", tag: "charts.reason_total" })]),
  Q(mc("Lina says the difference between 12 and 7 is 19 because 12 + 7 = 19. Is she right?", "No. The difference is 12 − 7 = 5", ["Yes, 19", "No, 7"], { hint: "Difference means take away.", why: "12 − 7 = 5.", tag: "charts.reason_difference" }), "data_detective", "reason",
    [mc("Dan says the difference between 20 and 8 is 28. Is he right?", "No. 20 − 8 = 12", ["Yes, 28", "No, 14"], { hint: "Difference means take away.", why: "20 − 8 = 12.", tag: "charts.reason_difference" })]),
  Q(sld("Slide to show the difference between 15 and 6 on the scale from 0 to 20.", { min: 0, max: 20, step: 1 }, 9, 1, { hint: "15 take away 6.", why: "15 − 6 = 9.", tag: "charts.difference" }), "data_detective", "apply",
    [sld("Slide to show the difference between 18 and 5 on the scale from 0 to 20.", { min: 0, max: 20, step: 1 }, 13, 1, { hint: "18 take away 5.", why: "18 − 5 = 13.", tag: "charts.difference" })]),
  Q(mat("Match each table row to its total.", [["3 + 4 + 5", "12"], ["6 + 2 + 1", "9"], ["7 + 7", "14"]], { hint: "Add each row.", why: "12, 9 and 14.", tag: "charts.total" }), "data_detective", "apply",
    [mat("Join each row to its total.", [["8 + 9", "17"], ["5 + 5 + 5", "15"], ["1 + 6", "7"]], { hint: "Add each row.", why: "17, 15 and 7.", tag: "charts.total" })]),
  Q(mc("Hana says a chart where 1 square = 5 can show 3 squares as 3 people. Is she right?", "No. 3 squares means 3 × 5 = 15 people", ["Yes, 3 people", "No, 8 people"], { hint: "Each square is worth 5.", why: "3 × 5 = 15.", tag: "charts.reason_key" }), "data_detective", "reason",
    [mc("Ali says a key of 1 picture = 4 means 2 pictures = 6. Is he right?", "No. 2 pictures = 2 × 4 = 8", ["Yes, 6", "No, 2"], { hint: "Two lots of four.", why: "2 × 4 = 8.", tag: "charts.reason_key" })]),
  // ----- questions (q25-q30)
  Q(num("Sixteen children chose mango and nine chose apple. How many children voted in all?", 25, { hint: "In all means add.", why: "16 + 9 = 25.", tag: "charts.in_all" }), "questions", "apply",
    [num("Twelve children chose lemon and seven chose kiwi. How many voted in all?", 19, { hint: "In all means add.", why: "12 + 7 = 19.", tag: "charts.in_all" })]),
  Q(mc("Which chart suits showing how the temperature changes through the day?", "A line graph", ["A pictogram", "A tally"], { hint: "Change over time.", why: "A line graph shows change over time.", tag: "charts.suit" }), "questions", "apply",
    [mc("Which chart suits showing how a school's rainfall changes across the year?", "A line graph", ["A tally", "A pictogram"], { hint: "Change over time.", why: "A line graph shows change over the year.", tag: "charts.suit" })]),
  Q(mc("Mira says the weather for two cities can be compared on one line graph. Is she right?", "Yes, both lines can share the same scale", ["No, a line graph can only show one city", "No, line graphs are for bars"], { hint: "Can two lines share one scale?", why: "Two lines on the same scale can be compared.", tag: "charts.reason_compare" }), "questions", "reason",
    [mc("Ali says two lines on one graph must use different scales to be compared. Is he right?", "No. To compare, both lines should share the same scale", ["Yes, different scales are best", "No, line graphs cannot show two lines"], { hint: "Can you compare lines on different scales?", why: "A shared scale makes lines easy to compare.", tag: "charts.reason_compare" })]),
  Q(num("Five classes have 24 children each. How many children in total?", 120, { hint: "Five times 24.", why: "5 × 24 = 120.", tag: "charts.two_step" }), "questions", "apply",
    [num("Four classes have 18 children each. How many children in total?", 72, { hint: "Four times 18.", why: "4 × 18 = 72.", tag: "charts.two_step" })]),
  Q(mc("Layla says a bar chart with a scale of 2s has bars that go up in 1s. Is she right?", "No. A scale of 2s means each step adds 2", ["Yes, up in 1s", "No, up in 5s"], { hint: "Count the steps.", why: "Each step on a scale of 2s adds 2.", tag: "charts.reason_scale" }), "questions", "reason",
    [mc("Zain says a scale of 5s goes 5, 10, 15. Is he right?", "Yes. Each step adds 5", ["No, it is 6, 12, 18", "No, it is 1, 2, 3"], { hint: "Each step adds the same amount.", why: "5, 10, 15 each add 5.", tag: "charts.reason_scale" })]),
  Q(mc("Nora says a bar of 12 on a chart from 0 to 20 is halfway. Is she right?", "No. Halfway on 0 to 20 is 10, so 12 is past halfway", ["Yes, 12 is halfway", "No, 12 is a quarter"], { hint: "Halfway between 0 and 20.", why: "Halfway is 10, so 12 is more than halfway.", tag: "charts.reason_halfway" }), "questions", "reason",
    [mc("Ali says a bar of 5 on a chart from 0 to 20 is a quarter. Is he right?", "Yes. A quarter of 20 is 5", ["No, it is halfway", "No, it is 10"], { hint: "A quarter of 20.", why: "20 ÷ 4 = 5.", tag: "charts.reason_halfway" })]),
];

export const topics = [
  topicLesson({
    slug: "maths-class-4-charts-tables-graphs", subject: "maths", cls: 4, topic: 11, title: "Charts, Tables and Graphs",
    summary: "Read and draw bar charts, pictograms and tables, and answer one- and two-step questions about data.",
    unit: "Topic 11: Charts, tables and graphs", difficulty: 2,
    objectives: ["Read scales on bar charts and keys on pictograms", "Solve one- and two-step questions using data", "Build a chart from a table"],
    success_criteria: ["I can read a scale and a key", "I can turn tallies into a table and a chart", "I can answer a question about data and write a conclusion"],
    real_life: "Class votes, weather and rainfall tables, and school surveys.",
    standards: [
      { framework: "nc_england", code: "Y4 statistics", text: "Interpret and present discrete and continuous data using appropriate graphical methods, including bar charts and time graphs" },
      { framework: "cambridge", code: "4Ds.01" }, { framework: "cambridge", code: "4Ds.02" },
    ],
    warm_up: [
      num("What is 8 + 7?", 15, { hint: "Make a ten first.", why: "8 + 2 = 10 and 5 more is 15." }),
      num("What is 6 × 4?", 24, { hint: "Count in fours.", why: "6 × 4 = 24." }),
      tf("A bar chart uses bars to show values.", true, { hint: "Think of a bar chart.", why: "Bars show the values." }),
    ],
    intro: [],
    subs: [barReading, makeChart, dataDetective, questions],
    clip,
    quiz,
  }),
];
