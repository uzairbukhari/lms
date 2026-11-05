import { SAY, SS, H, T, IMG, REVEAL, ACT, BRAIN, SUM, CHK, S, EXP, GLOSS, TALLY, PICTO, BAR, TABLE, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Computer Science, Data & AI, Class 1 (Zainab, age 7), topic 2: Data detectives.
// Standards: NC Y2 statistics, CSTA 1A data and analysis, PK M-01-E, CAM 2Ss.01-2Ss.03, 2Sp.01, 2Sp.02 (docs/CURRICULUM_V2.md).
const o = (hint, why, tag) => ({ hint, why, tag });

const sorting = {
  id: "sorting", kind: "learn", title: "Sorting and tally marks",
  blocks: [
    H("Stop 1: Sorting into groups"),
    SAY("Detectives look for clues, and clues are called data. Data is information we collect. The first job of a data detective is to sort. We put things that are alike into the same group. Here are a bird, a fish, an eagle and a goldfish. Birds fly. Fish swim. Let us sort them into two boxes.", T("**Data** is information we collect.", "To **sort** is to put things that are alike into the same **group**.")),
    EXP("Sort the animals",
      SS("Here are four animals in a jumble.", S("Four animals, all mixed up.", ["a", "🐦", 20, 45, 3], ["b", "🐟", 40, 45, 3], ["c", "🦅", 60, 45, 3], ["d", "🐠", 80, 45, 3])),
      SS("Birds can fly. The bird and the eagle go in the fly group.", S("Birds go in the fly group.", ["bx", { kind: "sorting_boxes", labels: ["Fly", "Swim"] }, 50, 70, 3], ["a", "🐦", 28, 70, 2, "bounce"], ["c", "🦅", 40, 70, 2, "bounce"], ["b", "🐟", 40, 25, 2], ["d", "🐠", 62, 25, 2])),
      SS("Fish live in water. The fish and the goldfish go in the swim group. Now everything is sorted!", S("Fish go in the swim group.", ["bx", { kind: "sorting_boxes", labels: ["Fly", "Swim"] }, 50, 70, 3], ["a", "🐦", 28, 70, 2], ["c", "🦅", 40, 70, 2], ["b", "🐟", 62, 70, 2, "bounce"], ["d", "🐠", 74, 70, 2, "bounce"]))),
    CHK(mc("Which animal goes in the swim group?", "🐟", ["🐦", "🦅"], o("Where does it live?", "The fish swims in water.", "data.sorting"))),
    H("Stop 2: Counting with tally marks"),
    SAY("After sorting, we count. A tally mark is a little stroke for each thing we count. Every fifth stroke goes across the other four, like a gate. That makes counting in fives easy. Here, the class voted for a favourite pet.", T("A **tally** uses a stroke for each vote. Four strokes and one across makes a bundle of five.")),
    TALLY("Favourite pets", [["Cats", 5], ["Dogs", 3], ["Fish", 2]], "Each stroke is one vote. Five is a bundle."),
    CHK(num("Cats got 5 tally marks. Dogs got 3. How many votes did cats get?", 5, o("Count the strokes.", "5 strokes means 5 votes.", "data.tally"))),
    SAY("Let us remember. We sort things into groups, and we count them with tally marks.", SUM("Sorting puts alike things in a group", "A tally mark is one stroke for each vote")),
    GLOSS({ data: "Information we collect.", sort: "To put things that are alike together.", group: "Things that belong together.", tally: "Strokes we make to count, with every fifth stroke across the four." }),
  ],
  mini: [
    mc("What do we call information that we collect?", "Data", ["A bug", "A loop"], o("Detectives collect it.", "Information we collect is data.")),
    mc("Which one belongs in a group of fruit?", "🍎", ["🚗", "🐶"], o("You can eat it.", "An apple is a fruit.")),
    num("Count the strokes: 4 strokes and one across. How many is that?", 5, o("Four and one more.", "Four strokes and the gate make 5.")),
    tf("A tally mark is one stroke for each thing we count.", true, o("One stroke each.", "Each stroke counts one thing.")),
  ],
};

const picto = {
  id: "pictograms", kind: "try", title: "Pictograms and block graphs",
  blocks: [
    H("Stop 1: Pictures that count"),
    SAY("A pictogram uses pictures to show data. Each picture stands for one vote. The longer the row of pictures, the more votes. Look at our class's favourite fruit. Which row is the longest?", T("A **pictogram** uses pictures to show **data**. Each picture is one vote.")),
    SAY("Count the pictures in each row. Mango has the longest row.", PICTO("Favourite fruit", [["Mango", 6, "🥭"], ["Apple", 4, "🍎"], ["Banana", 3, "🍌"], ["Orange", 2, "🍊"]], 1, "Each picture is one child's vote. Mango has the most.")),
    CHK(mc("In the fruit pictogram, which fruit has the most pictures?", "Mango", ["Orange", "Banana"], o("Find the longest row.", "Mango has 6 pictures, the most.", "data.pictogram"))),
    H("Stop 2: Block graphs"),
    SAY("A block graph uses blocks stacked up to show the same data. A tall stack means lots of votes. A short stack means fewer votes. Now try it yourself with the family shoes survey.", T("A **block graph** stacks blocks. The tallest stack has the most.")),
    SAY("Here are the same votes as blocks. The tallest stack is mango.", BAR("Favourite fruit blocks", [["Mango", 6, "🥭"], ["Apple", 4, "🍎"], ["Banana", 3, "🍌"], ["Orange", 2, "🍊"]], "The tallest bar is mango.")),
    SAY("Here is a job for a real detective. Count the shoes by the front door at home.", ACT("Count the shoes", ["Pencil and paper", "The shoes by your front door"], ["Sort the shoes into groups, such as trainers, sandals and boots.", "Make a tally for each group.", "Which group has the most shoes?"])),
    CHK(num("A block graph shows mango 6 and apple 4. How many more votes does mango have?", 2, o("Take 4 away from 6.", "6 - 4 = 2.", "data.compare"))),
    SAY("Let us remember. A pictogram uses pictures. A block graph uses blocks. Both show data at a glance.", SUM("A pictogram uses pictures for votes", "A block graph uses stacked blocks")),
    GLOSS({ pictogram: "A graph that uses pictures to show data.", "block graph": "A graph that uses stacks of blocks.", vote: "A choice we count.", data: "Information we collect." }),
  ],
  mini: [
    mc("What does each picture in a pictogram stand for?", "One vote", ["The whole class", "A colour"], o("Check the caption.", "Each picture is one vote.")),
    tf("A taller stack on a block graph means more votes.", true, o("Tall means more.", "The tallest stack has the most.")),
    num("The orange row has 2 pictures. The banana row has 3. How many pictures in all?", 5, o("Add 2 and 3.", "2 + 3 = 5.")),
  ],
};

const chance = {
  id: "chance", kind: "play", title: "Heads or tails",
  blocks: [
    H("Stop 1: What might happen?"),
    SAY("Detectives also ask what might happen. When we toss a coin, it lands heads or tails. We cannot know which one before it lands. The words for this are chance and might. A coin has two sides, so each side has an equal chance. Watch the coin spin and land.", T("**Chance** is how likely something is.", "A coin toss can land **heads** or **tails**. We cannot know which!")),
    EXP("Toss the coin",
      SS("The coin is in the air.", S("The coin spins.", ["c", "🪙", 50, 40, 3, "spin"])),
      SS("It lands. This time it is heads.", S("Heads this time.", ["c", "🪙", 50, 70, 3, "bounce", "Heads"])),
      SS("Toss again. It may be heads or tails. We never know for sure!", S("Toss again. Heads or tails?", ["c", "🪙", 50, 40, 3, "spin"], ["q", "❓", 80, 20, 2, "pulse"]))),
    CHK(mc("A coin has two sides. What are they called?", "Heads and tails", ["Up and down", "Red and blue"], o("Think about money.", "A coin has heads and tails.", "data.chance"))),
    H("Stop 2: Brain game"),
    SAY("Here is a memory game to sharpen your detective brain. Find the matching pairs. Keep your eyes sharp!", T("Play the memory game and find the pairs.")),
    BRAIN("memory_match", "Detective pairs", "Find the pairs.", ["🔍", "📊", "🪙", "🎲"]),
    CHK(tf("Before we toss a coin, we can be sure it will land heads.", false, o("Can we know?", "We cannot know. It might be heads or tails.", "data.chance"))),
    SAY("Let us remember. Chance means how likely something is. We cannot always know what will happen.", SUM("Chance is how likely something is", "A coin lands heads or tails")),
    GLOSS({ chance: "How likely something is to happen.", heads: "One side of a coin.", tails: "The other side of a coin.", might: "Could happen, but not for sure." }),
  ],
  mini: [
    mc("Which is a word for how likely something is?", "Chance", ["Order", "Stack"], o("Think about luck.", "Chance is how likely something is.")),
    tf("A coin always lands on heads.", false, o("Is it always the same?", "It may land on heads or tails.")),
    mc("A coin is tossed. How many different ways can it land?", "2", ["1", "6"], o("It has two sides.", "It can land heads or tails.")),
  ],
};

const useData = {
  id: "use_data", kind: "use", title: "Answering questions with data",
  blocks: [
    H("Stop 1: Reading a table"),
    SAY("Now use your skills to answer a question. Our class has voted for favourite playground games. Look at the table. It tells us how many children chose each game.", T("A **table** lists data in rows.", "We can read a table to find which has the **most** and which has the **fewest**.")),
    TABLE("Favourite playground games", [["Tag", 7], ["Skipping", 4], ["Hide and seek", 5], ["Cricket", 9]], "How many children chose each game."),
    CHK(mc("Which game was chosen by the most children?", "Cricket", ["Skipping", "Tag"], o("Find the biggest number.", "Cricket has 9, the biggest number.", "data.read"))),
    H("Stop 2: Ask and answer"),
    SAY("A good detective asks a question first. What would you like to find out? Maybe your family's favourite colour, or what pets your cousins have. Then collect data, tally it, and draw a pictogram. Finally share what you found.", T("A good **detective** asks a question, collects data, makes a graph and shares what they found.")),
    SAY("Ask a question, collect the data, tally it, draw a graph and share what you found.", IMG("🔍📊", "Ask, collect, tally, graph, share.")),
    SAY("Time to be a data detective at home.", ACT("My own survey", ["Pencil and paper", "Five family members or friends"], ["Choose a question, such as: what is your favourite fruit?", "Ask five people and make a tally.", "Draw a pictogram.", "Which has the most votes? Tell your family."])),
    REVEAL("What do you think would happen if you asked ten people instead of five?", "You would get more data, so the answer would be more reliable."),
    CHK(num("Tag had 7 votes and skipping had 4. How many more votes did tag get?", 3, o("Take 4 away from 7.", "7 - 4 = 3.", "data.compare"))),
    SAY("Let us remember. We use tables and graphs to answer questions. A detective asks, collects, graphs and shares.", SUM("Read tables and graphs to answer questions", "Ask, collect, graph, share")),
    GLOSS({ table: "A list of data in rows.", most: "The biggest number.", fewest: "The smallest number.", detective: "Someone who uses clues to find out.", survey: "Asking people questions to collect data." }),
  ],
  mini: [
    mc("Which is the first thing a data detective does?", "Ask a question", ["Draw a picture", "Go to sleep"], o("What do we want to find out?", "A detective starts with a question.")),
    num("A table says cricket 9, skipping 4. How many more chose cricket?", 5, o("Take away 4 from 9.", "9 - 4 = 5.")),
    tf("The fewest votes means the smallest number.", true, o("Fewest is not most.", "Fewest is the smallest number.")),
  ],
};

const ALTS = [
  [mc("Which of these can fly, so it joins the fly group?", "🦅", ["🐠", "🐟"], o("Which has wings?", "The eagle flies.", "data.sorting")), mc("Which one goes in the swim group?", "🐠", ["🐦", "🦅"], o("Where does it live?", "The goldfish swims.", "data.sorting"))],
  [mc("What is a group of things that are alike called?", "A group", ["A bug", "A coin"], o("Alike things sit together.", "Things that are alike form a group.", "data.sorting")), mc("What do we do when we put alike things together?", "Sort them", ["Lose them", "Break them"], o("Think about boxes.", "We sort them into groups.", "data.sorting"))],
  [num("A tally has 2 bundles of five. How many votes is that?", 10, o("5 + 5.", "Two bundles of five make 10.", "data.tally")), num("A tally has one bundle of five and 3 more strokes. How many votes?", 8, o("5 + 3.", "5 + 3 = 8.", "data.tally"))],
  [fill("Complete this sentence about information.", "{b1} is information we {b2}.", [["Data", "Bugs", "Stars"], ["collect", "eat", "lose"]], o("Use the lesson words.", "Data is information we collect.", "data.vocab")), fill("Finish this sentence about sorting.", "We {b1} things into {b2}.", [["sort", "bake", "hide"], ["groups", "ears", "coins"]], o("Use the lesson words.", "We sort things into groups.", "data.vocab"))],
  [ms("Which can be used to show data? Pick two.", ["A pictogram", "A block graph"], ["A sandwich", "A pillow"], o("They show votes.", "A pictogram and block graph both show data.", "data.vocab")), ms("Which are ways to count votes? Pick two.", ["Tally marks", "A table"], ["A cushion", "A hat"], o("They organise data.", "Tally marks and tables record votes.", "data.vocab"))],
  [mat("Match each data word to its meaning.", [["Data", "Information we collect"], ["Tally", "Strokes that count"], ["Pictogram", "Pictures that show votes"]], o("Think back to the stops.", "Each word has its own meaning.", "data.vocab")), mat("Match each graph to its picture idea.", [["Pictogram", "Uses pictures"], ["Block graph", "Uses stacked blocks"], ["Tally", "Uses strokes"]], o("Think about how each looks.", "Each kind of chart looks different.", "data.vocab"))],
  [mc("In the fruit pictogram, mango has 6 and orange has 2. Which has fewer?", "Orange", ["Mango", "They are the same"], o("Fewer means a smaller number.", "2 is less than 6.", "data.pictogram")), mc("In the fruit pictogram, apple has 4 and banana has 3. Which has fewer?", "Banana", ["Apple", "They are the same"], o("Fewer means a smaller number.", "3 is less than 4.", "data.pictogram"))],
  [mc("Ria says a coin must land heads three times in a row. Is she right?", "No, it might land heads or tails each time", ["Yes, always", "Only on Fridays"], o("Think about chance.", "Each toss can be heads or tails.", "data.reason")), mc("Omar says he knows the coin will land tails. Is he sure?", "No, he cannot be sure", ["Yes, tails always wins", "Only with a red coin"], o("Think about chance.", "We cannot be sure before it lands.", "data.reason"))],
  [sld("Slide to show the number of votes for cricket.", { min: 0, max: 12 }, 9, 0, o("Look at the table.", "Cricket had 9 votes.", "data.read")), sld("Slide to show how many votes tag had in our table.", { min: 0, max: 12 }, 7, 0, o("Look at the table.", "Tag had 7 votes.", "data.read"))],
  [hot("Tap the picture of a tally mark for 5.", [["🔢", "Five: four strokes and one across", 22, 50], ["🔤", "Letters", 50, 50], ["🎨", "Paint", 78, 50]], ["Five: four strokes and one across"], { labels: true, ...o("Four strokes and a gate.", "A bundle of five has a stroke across four.", "data.tally") }), hot("Tap the picture that shows the coin.", [["🪙", "A coin", 22, 50], ["🎲", "A dice", 50, 50], ["🧸", "A teddy", 78, 50]], ["A coin"], { labels: true, ...o("It has heads and tails.", "A coin has two sides.", "data.chance") })],
  [mc("Which graph uses a picture for each vote?", "A pictogram", ["A tally", "A table"], o("Think of pictures.", "A pictogram uses pictures.", "data.pictogram")), mc("Which graph uses stacked blocks?", "A block graph", ["A pictogram", "A tally"], o("Think about stacks.", "A block graph uses blocks.", "data.pictogram"))],
  [num("A table says tag 7 and hide and seek 5. How many children chose both games in all?", 12, o("Add 7 and 5.", "7 + 5 = 12.", "data.compare")), num("A table says skipping 4 and cricket 9. How many in all?", 13, o("Add 4 and 9.", "4 + 9 = 13.", "data.compare"))],
  [tf("The most votes means the biggest number.", true, o("Most is biggest.", "The most votes is the biggest number.", "data.read")), tf("The fewest votes means the biggest number.", false, o("Fewest is small.", "The fewest votes is the smallest number.", "data.read"))],
  [mc("Hamza says a graph with a longer row has fewer votes. Is he right?", "No, a longer row has more votes", ["Yes", "Only for tally"], o("Long means more.", "A longer row means more votes.", "data.reason")), mc("Layla says the tallest stack has the least. Is she right?", "No, the tallest stack has the most", ["Yes", "Only for tables"], o("Tall means more.", "The tallest stack means the most votes.", "data.reason"))],
  [ord("Put the data detective jobs in order.", ["Ask a question", "Collect the data", "Make a graph"], o("What comes first?", "Ask, collect, then graph.", "data.process")), ord("Put these data steps in order.", ["Sort the things", "Count with tally", "Draw the pictogram"], o("What comes first?", "Sort, tally, then draw.", "data.process"))],
];

const qd = (q, sub, depth) => ({ q, sub, depth });
export const topics = [
  topicLesson({
    slug: "data-ai-class-1-data-detectives", subject: "data-ai", cls: 1, topic: 2, title: "Data Detectives",
    summary: "Sorting, tally charts, pictograms, block graphs, a first look at chance, and answering questions with data.",
    unit: "Topic 2: Data detectives", difficulty: 1,
    objectives: ["Sort things and count them with tally marks", "Read pictograms and block graphs", "Use data to answer a question"],
    success_criteria: ["I can sort things into groups", "I can read a pictogram or block graph", "I can say which has the most and the fewest"],
    real_life: "Counting shoes by the door, votes for a family game and how many of each fruit are in the bowl.",
    standards: [
      { framework: "nc_england", code: "Y2 statistics", text: "Interpret and construct simple pictograms, tally charts, block diagrams and simple tables" },
      { framework: "csta", code: "1A-DA-05", text: "Store, copy, search, retrieve, modify and delete information using a computing device" },
      { framework: "csta", code: "1A-DA-07", text: "Identify and describe patterns in data visualisations" },
      { framework: "pk_ncc", code: "M-01-E" },
      { framework: "cambridge", code: "2Ss.01" }, { framework: "cambridge", code: "2Ss.02" }, { framework: "cambridge", code: "2Ss.03" }, { framework: "cambridge", code: "2Sp.01" }, { framework: "cambridge", code: "2Sp.02" },
    ],
    warm_up: [
      mc("What is a loop in an algorithm?", "Instructions that repeat", ["A mistake", "A star"], o("Think about doing it again.", "A loop repeats instructions.")),
      mc("A mistake in instructions is called a...", "Bug", ["Loop", "Pattern"], o("Not a real insect.", "A mistake is a bug.")),
      num("What is 6 + 4?", 10, o("Count on from 6.", "6 and 4 make 10.")),
    ],
    intro: [
      H("Welcome, data detective!"),
      SAY("Welcome, data detective! Today's big question: how can we find answers by counting? Detectives collect clues, sort them, count them and draw them. By the end you will make a tally, read a pictogram, and answer questions from a graph. Let's go!", T("Today's big question: how can we find answers by counting clues?", "We will sort, tally and make graphs.")),
      IMG("🔍", "Data detectives collect clues and count them."),
      GLOSS({ clues: "Pieces of information that help us find out." }),
    ],
    subs: [sorting, picto, chance, useData],
    quiz: [
      qd(mc("Which animal goes in the fly group?", "🦅", ["🐟", "🐠"], o("Which has wings?", "The eagle flies.", "data.sorting")), "sorting", "recall"),
      qd(mc("What do we do when we put things that are alike together?", "Sort them", ["Lose them", "Break them"], o("Think about boxes.", "We sort them into groups.", "data.sorting")), "sorting", "recall"),
      qd(num("A tally has one bundle of five and 2 more strokes. How many votes is that?", 7, o("5 + 2.", "5 + 2 = 7.", "data.tally")), "sorting", "apply"),
      qd(fill("Finish this sentence about data.", "{b1} is information we {b2}.", [["Data", "Bugs", "Stars"], ["collect", "eat", "lose"]], o("Use the lesson words.", "Data is information we collect.", "data.vocab")), "sorting", "recall"),
      qd(ms("Which can show data? Pick two.", ["A pictogram", "A block graph"], ["A sandwich", "A pillow"], o("They show votes.", "A pictogram and a block graph both show data.", "data.vocab")), "pictograms", "apply"),
      qd(mat("Match each word to what it means.", [["Data", "Information we collect"], ["Tally", "Strokes that count"], ["Pictogram", "Pictures that show votes"]], o("Think back to the stops.", "Each word has its own meaning.", "data.vocab")), "pictograms", "recall"),
      qd(mc("In the fruit pictogram, mango has 6 and apple has 4. Which has fewer?", "Apple", ["Mango", "They are the same"], o("Fewer means a smaller number.", "4 is less than 6.", "data.pictogram")), "pictograms", "reason"),
      qd(mc("Ria says a coin must land heads every time. Is she right?", "No, it might land heads or tails", ["Yes, always", "Only on Fridays"], o("Think about chance.", "Each toss can be heads or tails.", "data.reason")), "chance", "reason"),
      qd(sld("Slide to show how many votes cricket had in our table.", { min: 0, max: 12 }, 9, 0, o("Look at the table.", "Cricket had 9 votes.", "data.read")), "use_data", "apply"),
      qd(hot("Tap the picture of a coin.", [["🪙", "A coin", 22, 50], ["🎲", "A dice", 50, 50], ["🧸", "A teddy", 78, 50]], ["A coin"], { labels: true, ...o("It has heads and tails.", "A coin has two sides.", "data.chance") }), "chance", "recall"),
      qd(mc("Which graph uses pictures to show each vote?", "A pictogram", ["A tally", "A table"], o("Think of pictures.", "A pictogram uses pictures.", "data.pictogram")), "pictograms", "recall"),
      qd(num("A table says tag 7 and skipping 4. How many children chose both games in all?", 11, o("Add 7 and 4.", "7 + 4 = 11.", "data.compare")), "use_data", "apply"),
      qd(tf("The most votes is the biggest number.", true, o("Fewest is small.", "The fewest votes is the smallest number.", "data.read")), "use_data", "recall"),
      qd(mc("Hamza says a longer row on a pictogram has fewer votes. Is he right?", "No, a longer row has more votes", ["Yes", "Only for tally"], o("Long means more.", "A longer row means more votes.", "data.reason")), "pictograms", "reason"),
      qd(ord("Put the detective steps in order.", ["Ask a question", "Collect the data", "Make a graph"], o("What comes first?", "Ask, collect, then graph.", "data.process")), "use_data", "reason"),
    ].map((x, i) => ({ ...x, alts: ALTS[i] })),
  }),
];
