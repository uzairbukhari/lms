import { SAY, SS, H, T, IMG, REVEAL, ACT, BRAIN, SUM, CHK, S, EXP, GLOSS, BAR, TABLE, TALLY, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Computer Science, Data & AI, Class 4 (Fatima, age 9), topic 2: Data detectives.
// Standards: NC Y4 statistics, CSTA 1B data and analysis, PK M-04-E, CAM 4Ss.01-4Ss.03, 4Sp.01, 4Sp.02 (docs/CURRICULUM_V2.md).
const o = (hint, why, tag) => ({ hint, why, tag });

const surveys = {
  id: "surveys", kind: "learn", title: "Surveys and averages",
  blocks: [
    H("Stop 1: Asking questions with a survey"),
    SAY("A data detective starts with a question. To find the answer we run a survey. We ask a group of people the same question and record each answer. The group we ask is called the sample. A bigger, fairer sample gives a more reliable answer. Here a class of twenty chose a favourite sport.", T("A **survey** asks the same question to many people.", "The group we ask is the **sample**. A bigger, fairer sample is more reliable.")),
    TALLY("Favourite sport in class 4", [["Cricket", 8], ["Football", 6], ["Badminton", 4], ["Hockey", 2]], "Twenty children voted. Cricket got the most."),
    CHK(num("In the sport survey, how many children chose football?", 6, o("Read the tally.", "Football got 6 votes.", "data4.survey"))),
    H("Stop 2: The average"),
    SAY("Sometimes we want one number to describe a whole set of numbers. The mean is the fair share. Add the numbers up, then divide by how many there are. Three friends read 3, 5 and 7 books. Together that is 15. Shared fairly between three, each gets 5. So the mean is 5. The mode is the number that appears most often. The median is the middle number when they are in order.", T("The **mean** is the fair share: add up, then divide by how many.", "The **mode** is the most common value. The **median** is the middle one.")),
    EXP("The fair share",
      SS("Three friends read 3, 5 and 7 books. That is 15 books altogether.", S("3 + 5 + 7 = 15 books.", ["a", "📚", 20, 50, 2, "none", "3"], ["b", "📚", 50, 50, 3, "none", "5"], ["c", "📚", 80, 50, 3, "none", "7"])),
      SS("Share them out equally between the three friends.", S("Share 15 equally between 3.", ["a", "📚", 20, 50, 3, "bounce", "5"], ["b", "📚", 50, 50, 3, "bounce", "5"], ["c", "📚", 80, 50, 3, "bounce", "5"])),
      SS("Each friend gets 5. So the mean number of books is 5.", S("15 divided by 3 is 5. The mean is 5!", ["a", "📚", 20, 50, 3, "none", "5"], ["b", "📚", 50, 50, 3, "none", "5"], ["c", "📚", 80, 50, 3, "none", "5"], ["m", "⭐", 50, 20, 3, "bounce", "mean = 5"]))),
    CHK(num("Four friends score 2, 4, 6 and 8 in a game. What is the mean score?", 5, o("Add them up, then divide by 4.", "20 divided by 4 is 5.", "data4.mean"))),
    SAY("Let us remember. A survey asks many people. The mean is the fair share, the mode is the most common and the median is the middle.", SUM("A survey asks the same question to a sample", "Mean: add up, divide by how many", "Mode is most common, median is the middle")),
    GLOSS({ survey: "Asking many people the same question.", sample: "The group of people we ask.", mean: "The fair share: add up the numbers and divide by how many.", mode: "The value that appears most often.", median: "The middle value when numbers are in order." }),
  ],
  mini: [
    mc("What is a survey?", "Asking many people the same question", ["Drawing a graph only", "Deleting data"], o("Think about asking.", "A survey asks many people.")),
    num("Numbers 2, 4, 6. What is the mean?", 4, o("12 divided by 3.", "2 + 4 + 6 = 12, and 12 / 3 = 4.")),
    mc("Numbers: 3, 3, 5, 9. Which is the mode?", "3", ["5", "9"], o("Most often.", "3 appears twice.")),
    tf("The median is the middle value when numbers are in order.", true, o("In the middle.", "That is the median.")),
  ],
};

const honest = {
  id: "honest", kind: "try", title: "Honest charts and databases",
  blocks: [
    H("Stop 1: Charts that tell the truth"),
    SAY("A chart should help people understand, not trick them. An honest bar chart starts its bars at zero, has a clear title, and labels each bar. A tricky chart might squash or stretch the scale so small differences look huge. Always read the numbers, not just the height of the bars. This chart shows rainy days in each month.", T("An honest **bar chart** starts at **zero** and labels every bar.", "Read the numbers, not just the height!")),
    SAY("Look at the bars. Which month is tallest?", BAR("Rainy days per month", [["Jun", 4], ["Jul", 10], ["Aug", 9], ["Sep", 5]], "July had the most rainy days.")),
    CHK(mc("In the rainy days chart, which month had the most rainy days?", "July", ["June", "September"], o("Find the tallest bar.", "July has 10, the most.", "data4.chart"))),
    SAY("Try drawing the same votes two ways and compare them.", ACT("Spot the trick", ["Pencil and paper"], ["Draw a bar chart of 3 votes and 5 votes, starting at zero.", "Now draw it starting at 2. How do the bars look different?", "Which chart is honest? Why?"])),
    H("Stop 2: Databases"),
    SAY("A database stores lots of information in an organised table. Each row is one thing, such as one book. Each column is one kind of fact, called a field, such as the title or the year. Computers can search and sort a database very quickly. Look at this small library database.", T("A **database** is an organised table. Each **row** is one item and each **column** is a **field**.")),
    TABLE("Library database: books read", [["Dragon Tales", 12], ["Space Rocket", 9], ["Sea Secrets", 15], ["Tiny Ants", 7]], "Book title and the number of times borrowed."),
    SAY("Computers can sort this table from the most borrowed to the least borrowed in an instant.", IMG("🔎📚", "A database can be searched and sorted in an instant.")),
    CHK(mc("Which book was borrowed the most?", "Sea Secrets", ["Tiny Ants", "Space Rocket"], o("Find the biggest number.", "Sea Secrets was borrowed 15 times.", "data4.database"))),
    SAY("Let us remember. Honest charts start at zero and are clearly labelled. A database stores facts in rows and columns.", SUM("Honest charts start at zero", "A database has rows and columns")),
    GLOSS({ "bar chart": "A chart that uses bars to compare amounts.", zero: "The starting point of a scale.", database: "An organised table of information.", row: "One item across a table.", column: "One kind of fact down a table.", field: "A column heading, such as title or year." }),
  ],
  mini: [
    mc("An honest bar chart should start at...", "Zero", ["Fifty", "The tallest bar"], o("The beginning of the scale.", "Honest charts start at zero.")),
    tf("A column in a database holds one kind of fact.", true, o("Think of titles.", "A column is one field.")),
    num("A library database shows Dragon Tales 12 and Tiny Ants 7. How many more times was Dragon Tales borrowed?", 5, o("Take 7 from 12.", "12 - 7 = 5.")),
  ],
};

const venn = {
  id: "venn_chance", kind: "play", title: "Venn diagrams and chance experiments",
  blocks: [
    H("Stop 1: Venn diagrams"),
    SAY("A Venn diagram sorts things with two circles. Each circle holds things with one property. The overlap in the middle holds things that have both. Let us sort animals into those with wings and those that swim. A duck has wings and swims, so it goes in the overlap. An eagle has wings only. A fish swims only.", T("A **Venn diagram** uses overlapping circles. The middle holds things with **both** properties.")),
    EXP("Wings or swimming?",
      SS("Here are the animals before sorting: duck, eagle, fish.", S("Three animals to sort.", ["d", "🦆", 25, 50, 3], ["e", "🦅", 50, 50, 3], ["f", "🐟", 75, 50, 3])),
      SS("The Venn diagram has a circle for wings and a circle for swimming.", S("Two circles: wings and swim.", ["v", { kind: "venn", labels: ["Wings", "Swim"] }, 50, 55, 3])),
      SS("The eagle goes in wings only, the fish in swim only, and the duck in the overlap because it has both.", S("The duck goes in the middle.", ["v", { kind: "venn", labels: ["Wings", "Swim"] }, 50, 55, 3], ["e", "🦅", 28, 60, 1, "bounce"], ["f", "🐟", 72, 60, 1, "bounce"], ["d", "🦆", 50, 62, 1, "bounce"]))),
    CHK(mc("Where does a duck go in the wings and swim Venn diagram?", "In the overlap", ["Outside the circles", "Only in wings"], o("It does both.", "A duck has wings and swims, so it goes in the middle.", "data4.venn"))),
    H("Stop 2: Chance experiments"),
    SAY("In a chance experiment we try something many times and record the results. If you toss a coin twenty times, you might get about ten heads. But not exactly ten! The more times you try, the closer the results usually get to what you expect. Data from experiments helps us decide how likely things are. Play a memory game to warm up, then try the experiment at home.", T("A **chance experiment** repeats a test many times and records the results.")),
    BRAIN("memory_match", "Chance pairs", "Find the pairs.", ["🪙", "🎲", "🃏", "🎯"]),
    SAY("Toss a coin twenty times and keep a tally of heads and tails.", ACT("Toss a coin 20 times", ["A coin", "Paper and pencil"], ["Toss the coin 20 times.", "Make a tally of heads and tails.", "Is it exactly 10 each? Is it close?"])),
    CHK(tf("If we toss a coin 20 times we must get exactly 10 heads.", false, o("Chance is not certain.", "We expect about 10 but it can vary.", "data4.chance"))),
    SAY("Let us remember. Venn diagrams sort with overlapping circles. Chance experiments repeat tests and record results.", SUM("A Venn diagram has an overlap for both properties", "Repeat a chance experiment to see what happens")),
    GLOSS({ both: "The two things together.", "venn diagram": "Overlapping circles used to sort things.", overlap: "The part in the middle where circles meet.", experiment: "A test we do to find something out.", chance: "How likely something is.", record: "To write down results." }),
  ],
  mini: [
    mc("The overlap of a Venn diagram holds things that...", "Have both properties", ["Have neither", "Are broken"], o("The middle.", "The overlap is for both.")),
    tf("An experiment can be repeated to get more data.", true, o("Try again.", "More tries give more data.")),
    mc("A fish swims but has no wings. Which part of the wings and swim diagram?", "Swim only", ["Wings only", "The overlap"], o("It does not fly.", "Fish swim only.")),
  ],
};

const useData = {
  id: "use_data", kind: "use", title: "Reading change over time",
  blocks: [
    H("Stop 1: Data over time"),
    SAY("Some data changes over time, like the temperature through a week. We can record it in a table and look for a pattern. Does it go up, go down, or stay the same? Here is the midday temperature in Lahore across four days in autumn.", T("We can look for a **trend**: does the data go up, down or stay the same?")),
    SAY("Look at the table. The numbers get bigger each day.", TABLE("Midday temperature (degrees C)", [["Mon", 28], ["Tue", 30], ["Wed", 31], ["Thu", 33]], "Temperatures rise each day.")),
    CHK(mc("What is the trend in the temperature?", "It goes up each day", ["It goes down", "It stays the same"], o("Compare the numbers.", "28, 30, 31, 33 rise each day.", "data4.trend"))),
    H("Stop 2: Tell the story"),
    SAY("A good detective tells the story of the data in a sentence. For example: the temperature rose by five degrees from Monday to Thursday. Then they ask a new question, like what might happen on Friday. A prediction must say it is a prediction, because we cannot be sure.", T("Describe the story with numbers, then make a careful **prediction**.")),
    SAY("The temperature rose by five degrees from Monday to Thursday.", IMG("🌡️📈", "The temperature rose from 28 to 33 degrees.")),
    SAY("Now collect real data at home.", ACT("My weather table", ["Pencil and paper", "A thermometer or a weather app"], ["Record the temperature at the same time for four days.", "Write one sentence about the trend.", "Make a careful prediction for tomorrow."])),
    REVEAL("Can we be sure the temperature will be 34 on Friday?", "No. A prediction is a sensible guess from the pattern, but the weather can change."),
    CHK(num("The temperature went from 28 on Monday to 33 on Thursday. By how many degrees did it rise?", 5, o("Take 28 from 33.", "33 - 28 = 5.", "data4.compare"))),
    SAY("Let us remember. Tables show change over time. Find the trend and make a careful prediction.", SUM("Look for the trend: up, down or the same", "A prediction is a careful guess")),
    GLOSS({ trend: "The way data changes: up, down or the same.", prediction: "A careful guess about what will happen next.", pattern: "Something that repeats or changes in a regular way." }),
  ],
  mini: [
    mc("What is a trend?", "The way data changes over time", ["A kind of chart colour", "A computer part"], o("Up, down or the same.", "A trend is how data changes.")),
    tf("A prediction is always right.", false, o("It is a guess.", "A prediction can be wrong.")),
    num("Temperatures: 28, 30, 31, 33. What was the rise from Tuesday to Wednesday?", 1, o("31 minus 30.", "31 - 30 = 1.")),
  ],
};

const ALTS = [
  [mc("Which question can a survey answer?", "What is our class's favourite fruit?", ["How tall is Everest?", "What is 6 times 7?"], o("Ask people.", "A survey asks people for their opinions.", "data4.survey")), mc("What do we call asking many people the same question?", "A survey", ["A flowchart", "A bug"], o("Ask people.", "That is a survey.", "data4.survey"))],
  [num("Scores 4, 6, 8. What is the mean?", 6, o("18 divided by 3.", "4 + 6 + 8 = 18, divided by 3 is 6.", "data4.mean")), num("Scores 3, 7, 5, 5. What is the mean?", 5, o("20 divided by 4.", "3 + 7 + 5 + 5 = 20, divided by 4 is 5.", "data4.mean"))],
  [tf("Starting a bar chart at 2 instead of 0 can make small differences look big.", true, o("Think about the trick.", "A truncated scale exaggerates differences.", "data4.chart")), tf("A chart is honest even if the bars are cut off.", false, o("Honest charts start at zero.", "Cut-off bars can mislead.", "data4.chart"))],
  [fill("Finish this sentence about databases.", "A database has {b1} for items and {b2} for facts.", [["rows", "roots", "roofs"], ["columns", "clouds", "caves"]], o("Think of a table.", "Rows are items, columns are fields.", "data4.vocab")), fill("Complete this sentence about averages.", "The {b1} is the middle value and the {b2} is the most common.", [["median", "mean", "total"], ["mode", "range", "map"]], o("Think back.", "Median is the middle and mode is the most common.", "data4.vocab"))],
  [ms("Which are honest chart habits? Pick two.", ["Start the bars at zero", "Label each bar"], ["Stretch the scale", "Hide the title"], o("Think about honesty.", "Zero start and labels are honest.", "data4.chart")), ms("Pick two things a database has.", ["Rows", "Columns"], ["Wheels", "Wings"], o("Think of a table.", "Databases have rows and columns.", "data4.database"))],
  [mat("Pair each average with what it tells us.", [["Mean", "The fair share"], ["Mode", "The most common"], ["Median", "The middle value"]], o("Think back.", "Each average has its own meaning.", "data4.vocab")), mat("Pair each database word with its meaning.", [["Row", "One item"], ["Column", "One kind of fact"], ["Database", "An organised table"]], o("Think back.", "Each word has its own meaning.", "data4.vocab"))],
  [mc("A coin lands heads 6 times out of 10 tosses. What can we say?", "It is close to what we expect, but not exactly 5", ["The coin is broken", "Heads always wins"], o("Chance varies.", "Results vary, but near 5 is normal.", "data4.chance")), mc("A dice is rolled 12 times and lands on six 3 times. What can we say?", "It is close to what we expect, but not exact", ["The dice is broken", "Six always wins"], o("Chance varies.", "Results vary a little.", "data4.chance"))],
  [mc("Idris says the mean is always in the list of numbers. Is he right?", "No, it can be a number that is not in the list", ["Yes, always", "Only for even numbers"], o("Try 2 and 3.", "The mean of 2 and 3 is 2.5, which is not in the list.", "data4.reason")), mc("Rania says a bar chart that starts at 5 is just as honest. Is she right?", "No, starting at zero is more honest", ["Yes, the same", "Only on Tuesdays"], o("Think about the scale.", "Starting above zero can mislead.", "data4.reason"))],
  [sld("Slide to show the mean of 2, 5 and 8.", { min: 0, max: 10 }, 5, 0, o("Add, then divide by 3.", "15 divided by 3 is 5.", "data4.mean")), sld("Slide to show the mean of 4, 6, 8 and 10.", { min: 0, max: 12 }, 7, 0, o("Add, then divide by 4.", "28 divided by 4 is 7.", "data4.mean"))],
  [hot("Tap where the duck belongs in the wings and swim diagram.", [["⭕", "Wings only", 22, 50], ["🔘", "The overlap", 50, 50], ["⭕", "Swim only", 78, 50]], ["The overlap"], { labels: true, ...o("It does both.", "A duck has wings and swims.", "data4.venn") }), hot("Tap where an animal that swims but has no wings belongs.", [["⭕", "Wings only", 22, 50], ["🔘", "The overlap", 50, 50], ["⭕", "Swim only", 78, 50]], ["Swim only"], { labels: true, ...o("No wings.", "It swims but does not fly.", "data4.venn") })],
  [mc("Which of these is the mode of 2, 2, 4, 5?", "2", ["4", "5"], o("Most often.", "2 appears twice.", "data4.mode")), mc("Which is the mode of 7, 8, 8, 9, 8?", "8", ["7", "9"], o("Most often.", "8 appears three times.", "data4.mode"))],
  [num("The temperature was 24 on Monday and 29 on Thursday. By how many degrees did it rise?", 5, o("29 minus 24.", "29 - 24 = 5.", "data4.compare")), num("Lahore was 26 on Tuesday and 31 on Friday. How many degrees did it rise?", 5, o("31 minus 26.", "31 - 26 = 5.", "data4.compare"))],
  [tf("A trend can go up, go down or stay the same.", true, o("Three options.", "Those are the three types of trend.", "data4.trend")), tf("A trend always goes up.", false, o("It can fall.", "A trend can go down too.", "data4.trend"))],
  [mc("Hamza says a prediction is always a fact. Is he right?", "No, it is a careful guess", ["Yes, always true", "Only in maths"], o("We cannot be sure.", "A prediction can be wrong.", "data4.reason")), mc("Mina says we can be sure about tomorrow's weather from one pattern. Is she right?", "No, it is only a prediction", ["Yes, always sure", "Only in autumn"], o("We cannot be sure.", "Weather can change.", "data4.reason"))],
  [ord("Put the data detective jobs in order.", ["Ask a question", "Collect data in a table", "Describe the trend"], o("Question first.", "Ask, collect, then describe.", "data4.process")), ord("Order these survey steps.", ["Choose a fair sample", "Ask everyone the same question", "Show the results in a chart"], o("Plan first.", "Sample, ask, then show.", "data4.process"))],
];

const qd = (q, sub, depth) => ({ q, sub, depth });
export const topics = [
  topicLesson({
    slug: "data-ai-class-4-data-detectives", subject: "data-ai", cls: 4, topic: 2, title: "Data Detectives",
    summary: "Surveys and averages, honest charts, databases, Venn diagrams, chance experiments and trends over time.",
    unit: "Topic 2: Data detectives", difficulty: 2,
    objectives: ["Run a survey and find the mean, mode and median", "Spot an honest chart and read a database", "Sort with a Venn diagram and describe a trend"],
    success_criteria: ["I can find the mean, mode and median", "I can tell whether a chart is honest", "I can sort with a Venn diagram and describe a trend"],
    real_life: "Weather tables, cricket scores, class votes and library records all use data.",
    standards: [
      { framework: "nc_england", code: "Y4 statistics", text: "Interpret and present discrete and continuous data using appropriate graphical methods, including bar charts and time graphs" },
      { framework: "csta", code: "1B-DA-06", text: "Organise and present collected data visually to highlight relationships" },
      { framework: "csta", code: "1B-DA-07", text: "Use data to highlight or propose cause-and-effect relationships and predict outcomes" },
      { framework: "pk_ncc", code: "M-04-E" },
      { framework: "cambridge", code: "4Ss.01" }, { framework: "cambridge", code: "4Ss.02" }, { framework: "cambridge", code: "4Ss.03" }, { framework: "cambridge", code: "4Sp.01" }, { framework: "cambridge", code: "4Sp.02" },
    ],
    warm_up: [
      mc("What do we call a mistake in a program?", "A bug", ["A loop", "A variable"], o("Not an insect.", "A mistake is a bug.")),
      mc("What does a loop do?", "Repeats steps", ["Deletes steps", "Hides steps"], o("Again and again.", "A loop repeats steps.")),
      num("What is 45 + 28?", 73, o("Add tens then ones.", "45 + 28 = 73.")),
    ],
    intro: [
      H("Welcome, data detective!"),
      SAY("Welcome, data detective! Today's big question: how can we trust what data tells us? We will run surveys, find averages, spot tricky charts, search a database, sort with Venn diagrams and look for trends. Let's go!", T("Today's big question: how can we trust what data tells us?", "We will collect, check and describe data like a detective.")),
      IMG("🔍📊", "Good detectives check their data."),
      GLOSS({ data: "Information we collect." }),
    ],
    subs: [surveys, honest, venn, useData],
    quiz: [
      qd(mc("Which question could a survey answer?", "What is our class's favourite fruit?", ["How tall is Everest?", "What is 6 times 7?"], o("Ask people.", "A survey asks people for their opinions.", "data4.survey")), "surveys", "recall"),
      qd(num("Scores 3, 6 and 9. What is the mean?", 6, o("18 divided by 3.", "3 + 6 + 9 = 18, divided by 3 is 6.", "data4.mean")), "surveys", "apply"),
      qd(tf("Starting a bar chart at 3 instead of 0 can make small differences look big.", true, o("Think about the trick.", "A cut-off scale exaggerates differences.", "data4.chart")), "honest", "recall"),
      qd(fill("Complete this sentence about databases.", "A database has {b1} for items and {b2} for facts.", [["rows", "roots", "roofs"], ["columns", "clouds", "caves"]], o("Think of a table.", "Rows are items, columns are fields.", "data4.vocab")), "honest", "recall"),
      qd(ms("Pick the two honest chart habits.", ["Start the bars at zero", "Label each bar"], ["Stretch the scale", "Hide the title"], o("Think about honesty.", "Zero start and labels are honest.", "data4.chart")), "honest", "apply"),
      qd(mat("Pair each averages word with its meaning.", [["Mean", "The fair share"], ["Mode", "The most common"], ["Median", "The middle value"]], o("Think back.", "Each average has its own meaning.", "data4.vocab")), "surveys", "recall"),
      qd(mc("A coin is tossed 10 times and lands heads 6 times. What can we say?", "It is close to what we expect, but not exactly 5", ["The coin is broken", "Heads always wins"], o("Chance varies.", "Results vary, but near 5 is normal.", "data4.chance")), "venn_chance", "reason"),
      qd(mc("Idris says the mean must always be one of the numbers in the list. Is he right?", "No, it can be a number that is not in the list", ["Yes, always", "Only for even numbers"], o("Try 2 and 3.", "The mean of 2 and 3 is 2.5, which is not in the list.", "data4.reason")), "surveys", "reason"),
      qd(sld("Slide to show the mean of 3, 6 and 9.", { min: 0, max: 12 }, 6, 0, o("Add, then divide by 3.", "18 divided by 3 is 6.", "data4.mean")), "surveys", "apply"),
      qd(hot("Tap where a duck belongs in the wings and swim Venn diagram.", [["⭕", "Wings only", 22, 50], ["🔘", "The overlap", 50, 50], ["⭕", "Swim only", 78, 50]], ["The overlap"], { labels: true, ...o("It does both.", "A duck has wings and swims.", "data4.venn") }), "venn_chance", "apply"),
      qd(mc("Which is the mode of 2, 2, 4, 5?", "2", ["4", "5"], o("Most often.", "2 appears twice.", "data4.mode")), "surveys", "recall"),
      qd(num("The temperature was 22 on Monday and 27 on Thursday. By how many degrees did it rise?", 5, o("27 minus 22.", "27 - 22 = 5.", "data4.compare")), "use_data", "apply"),
      qd(tf("A trend can only go up.", false, o("It can fall.", "A trend can go down too.", "data4.trend")), "use_data", "recall"),
      qd(mc("Hamza says a prediction is a fact. Is he right?", "No, it is a careful guess", ["Yes, always true", "Only in maths"], o("We cannot be sure.", "A prediction can be wrong.", "data4.reason")), "use_data", "reason"),
      qd(ord("Put these data detective steps in order.", ["Ask a question", "Collect data in a table", "Describe the trend"], o("Question first.", "Ask, collect, then describe.", "data4.process")), "use_data", "reason"),
    ].map((x, i) => ({ ...x, alts: ALTS[i] })),
  }),
];
