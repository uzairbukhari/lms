import { SAY, SS, H, T, IMG, ACT, BRAIN, SUM, CHK, S, EXP, TABLE, GLOSS, mc, ms, tf, st, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// English topic 4 for Zainab (Class 1): Reading to find out. Standards from docs/CURRICULUM_V2.md section 3 (NC Year 2 non-fiction, Cambridge Stage 2).
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });

const contents = {
  id: "contents", kind: "learn", title: "Contents, headings and index",
  blocks: [
    H("Stop 1: Finding your way in a book"),
    SAY("Some books tell stories. Others, called non-fiction books, tell us true facts. They have special parts to help us find things quickly. The contents page, near the front, lists the chapters and their page numbers. Headings tell us what each section is about. And the index, at the very back, lists words in alphabetical order with page numbers. Let's open a book about animals.", T("A **contents page** lists the chapters and page numbers.", "A **heading** tells us what a section is about.", "An **index** at the back lists words in ABC order with page numbers.")),
    EXPP("Parts of a book",
      SS("The contents page is near the front. It lists the chapters, like Frogs on page four and Birds on page eight.", S("Contents: Frogs 4, Birds 8.", ["c", "📑", 50, 50, 3, "grow", "contents"])),
      SS("Each chapter has a heading. The heading Frogs tells us this part is all about frogs.", S("Heading: Frogs.", ["h", "🐸", 50, 50, 3, "grow", "heading"])),
      SS("At the back is the index. Words go in ABC order, and each has a page number. We can find frog fast.", S("Index: ABC order.", ["i", "🔤", 50, 50, 3, "grow", "index"]))),
    CHK(mc("Where do you look to find which page a chapter starts on?", "the contents page", ["the cover", "the last sentence"], { hint: "It is near the front and lists chapters.", why: "The contents page lists chapters and page numbers.", tag: "nonfiction.contents" })),
    CHK(mc("Which part of a book is in alphabetical order at the back?", "the index", ["the contents page", "the title"], { hint: "It lists words and page numbers.", why: "The index lists words in ABC order.", tag: "nonfiction.index" })),
    SAY("Let us remember. The contents page lists chapters. A heading says what a section is about. The index is in ABC order at the back.", SUM("The contents page lists chapters and page numbers", "A heading says what a section is about", "The index is in ABC order at the back")),
    GLOSS({ "non-fiction": "A book that tells true facts.", "contents page": "A list of the chapters and their page numbers.", heading: "A title that tells us what a section is about.", index: "A list of words in ABC order, with page numbers, at the back of a book.", chapter: "One section of a book." }),
  ],
  mini: [
    mc("What does a heading tell us?", "what a section is about", ["who wrote it", "how many pages there are"], { hint: "It is a title for a section.", why: "A heading tells us what a section is about.", tag: "nonfiction.heading" }),
    mc("Where is the contents page?", "near the front", ["at the very back", "on the last page"], { hint: "Think about where we start.", why: "The contents page is near the front.", tag: "nonfiction.contents" }),
    tf("A non-fiction book tells true facts.", true, { hint: "Is it a story or facts?", why: "Non-fiction books give true information.", tag: "nonfiction.def" }),
  ],
};

const diagrams = {
  id: "diagrams", kind: "try", title: "Diagrams and tables",
  blocks: [
    H("Stop 1: Labelled diagrams"),
    SAY("A diagram is a picture that explains something. It has labels, which are words with lines pointing to the parts. Look at a diagram of a flower. The label petal points to the coloured bit, and the label stem points to the long green part. Labels tell us the name of each part.", T("A **diagram** is a picture that explains something.", "A **label** names a part of the diagram.")),
    EXPP("A labelled flower",
      SS("Here is a flower. A plain picture, but no names.", S("A flower.", ["f", "🌸", 50, 40, 3, "grow", "flower"])),
      SS("Now we add labels. The petals are on top, and the stem holds the flower up. Labels name each part.", S("Labels name the parts.", ["f", "🌸", 30, 40, 3, "none", "petals"], ["s", "🌿", 70, 55, 3, "grow", "stem"]))),
    CHK(mc("What does a label do?", "names a part of the picture", ["makes it bigger", "colours it in"], { hint: "Think about the words with the lines.", why: "A label names a part.", tag: "diagram.label" })),
    H("Stop 2: Tables"),
    SAY("A table puts facts in rows and columns so they are easy to find. Here is a table about pets. Read across the row to find an animal, and read along to see how many legs it has. Cat, four legs. Bird, two legs. Spider, eight legs.", T("A **table** puts facts in rows and columns.")),
    TABLE("Legs", [["Cat", 4, "🐈"], ["Bird", 2, "🐦"], ["Spider", 8, "🕷️"]], "Cat has 4 legs, bird has 2 legs, spider has 8 legs."),
    SAY("Time to make your own. Collect facts about three pets or toys, and put them in a table with a grown-up.", ACT("My own table", ["Paper and a pencil", "A ruler"], ["Draw a table with two columns.", "Write three animals in the first column.", "Write how many legs each has in the second column.", "Ask a grown-up a question that your table can answer."])),
    CHK(mc("Look at the legs table. Which animal has the most legs?", "spider", ["cat", "bird"], { hint: "Find the biggest number.", why: "Spider has 8 legs, the most.", tag: "table.read" })),
    SAY("Let us remember. A diagram has labels that name its parts. A table puts facts in rows and columns.", SUM("Labels name the parts of a diagram", "A table puts facts in rows and columns")),
    GLOSS({ diagram: "A picture that explains something.", label: "A word that names a part of a picture.", table: "Facts organised in rows and columns.", column: "A line of facts going down." }),
  ],
  mini: [
    mc("What is a diagram?", "a picture that explains something", ["a very long story", "a kind of book"], { hint: "It helps us understand.", why: "A diagram is a picture that explains something.", tag: "diagram.def" }),
    mc("Look at the legs table. Which animal has two legs?", "bird", ["cat", "spider"], { hint: "Find the 2.", why: "Bird has 2 legs.", tag: "table.read" }),
    tf("A table puts facts in rows and columns.", true, { hint: "Think of lines across and down.", why: "Tables organise facts in rows and columns.", tag: "table.def" }),
  ],
};

const facts = {
  id: "facts", kind: "play", title: "Fact hunt",
  blocks: [
    H("Stop 1: True or made up?"),
    SAY("A fact is something that is true. Spiders have eight legs. A made-up idea is something that is not true, like cats can fly. Non-fiction books are full of facts. Fiction books are full of stories. When we read to find out, we look for the facts.", T("A **fact** is something that is true.", "**Fiction** is a made-up story.")),
    EXPP("Fact or made-up?",
      SS("A spider has eight legs. Is it true? Yes, we can check it in a book. That is a fact.", S("Fact: a spider has 8 legs.", ["s", "🕷️", 50, 50, 3, "grow", "fact"])),
      SS("A cat can fly. Is it true? No! That is made up, like in a story.", S("Made up: a flying cat.", ["c", "🐈", 50, 50, 3, "float", "made up"]))),
    CHK(mc("Which is a fact?", "Fish live in water.", ["Fish can sing songs.", "Fish drive cars."], { hint: "Which is really true?", why: "Fish do live in water.", tag: "fact.find" })),
    H("Stop 2: Brain game"),
    SAY("Time to hunt for facts. First a memory game, then a quick sorting job. Think about where you would look to find out a fact.", BRAIN("memory_match", "Fact hunt", "Find the matching pairs.", ["📖", "🔎", "🐸", "🌱", "☀️", "🌧️"])),
    CHK(mc("Where could you find out how many legs a spider has?", "in a non-fiction book", ["in a made-up story", "in a song"], { hint: "Which has true facts?", why: "Non-fiction books give true facts.", tag: "fact.source" })),
    SAY("Let us remember. A fact is true. Non-fiction books give facts.", SUM("A fact is something true", "Non-fiction books are full of facts")),
    GLOSS({ fact: "Something that is true.", fiction: "A story that is made up.", true: "Real and correct." }),
  ],
  mini: [
    mc("Which is a fact?", "Bees make honey.", ["Bees drive buses.", "Bees live on the Moon."], { hint: "Which is really true?", why: "Bees make honey.", tag: "fact.find" }),
    tf("Fiction is full of true facts.", false, { hint: "Fiction is a story.", why: "Fiction is made up.", tag: "fact.def" }),
    mc("Which is a good place to look for facts?", "a non-fiction book", ["a fairy tale", "a cartoon"], { hint: "Which gives true information?", why: "Non-fiction books are for facts.", tag: "fact.source" }),
  ],
};

const filecard = {
  id: "filecard", kind: "use", title: "Make a fact file",
  blocks: [
    H("Stop 1: What goes in a fact file"),
    SAY("A fact file is a short page of true facts about one topic. It has a heading, a few facts, and a labelled picture. Let's plan a fact file about cats. The heading is All About Cats. A fact: cats have whiskers. A picture of a cat with the label whiskers.", T("A **fact file** has a heading, some facts and a labelled picture.")),
    EXPP("A fact file about cats",
      SS("First the heading. All about cats.", S("Heading: All About Cats.", ["h", "🐈", 50, 40, 3, "grow", "All About Cats"])),
      SS("Then a fact and a labelled picture. Cats have whiskers. The label points to them.", S("A fact and a label.", ["c", "😺", 40, 50, 3, "none", "whiskers"], ["f", "📝", 75, 50, 3, "grow", "fact"]))),
    CHK(mc("What goes at the top of a fact file?", "a heading", ["a story", "a poem"], { hint: "It says what the page is about.", why: "A heading tells us the topic.", tag: "factfile.parts" })),
    H("Stop 2: Make yours"),
    SAY("Now make a fact file about an animal you love. Find facts in a book, and write them clearly.", ACT("My fact file", ["Paper and a pencil", "A non-fiction book"], ["Choose an animal and write a heading.", "Find three facts in a book and write them.", "Draw a picture and add labels.", "Read your fact file to a grown-up."])),
    SAY("A fact file in the making.", IMG("📋", "A fact file has a heading, facts and a labelled picture.")),
    CHK(mc("Where do we get the facts for a fact file?", "from a non-fiction book", ["from our imagination", "from a joke"], { hint: "Where are true facts?", why: "Facts must be true, so we check a non-fiction book.", tag: "factfile.source" })),
    SAY("Let us remember. A fact file has a heading, facts and a labelled picture.", SUM("A fact file has a heading, facts and a labelled picture", "Facts come from non-fiction books")),
    GLOSS({ "fact file": "A short page of true facts about one topic.", topic: "What a piece of writing is about.", picture: "A drawing or photo." }),
  ],
  mini: [
    mc("Which is a good heading for a fact file about frogs?", "All About Frogs", ["My Funny Day", "Once Upon a Time"], { hint: "It names the topic.", why: "The heading says the page is about frogs.", tag: "factfile.parts" }),
    tf("A fact file can have a labelled picture.", true, { hint: "Think of diagrams.", why: "A labelled picture helps explain the facts.", tag: "factfile.parts" }),
    mc("Which belongs in a fact file?", "a true fact", ["a made-up story", "a silly joke"], { hint: "A fact file is for facts.", why: "A fact file has true facts.", tag: "factfile.source" }),
  ],
};

export const topics = [
  topicLesson({
    slug: "english-class-1-reading-to-find-out", subject: "english", cls: 1, topic: 4, title: "Reading to Find Out",
    summary: "Contents pages, headings and indexes, labelled diagrams and tables, finding facts and making a fact file.",
    unit: "Topic 4: Reading to find out", difficulty: 1,
    objectives: ["Use contents pages, headings and an index", "Read labelled diagrams and tables", "Tell facts from made-up ideas", "Make a simple fact file"],
    success_criteria: ["I can use a contents page to find a chapter", "I can read a labelled diagram and a table", "I can tell a fact from something made up", "I can make a fact file"],
    real_life: "Looking up facts about animals and planets in books and finding answers on a poster.",
    standards: [
      { framework: "nc_england", code: "Y2 reading", text: "Read and discuss non-fiction, using contents pages, headings and diagrams to retrieve information" },
      { framework: "cambridge", code: "2Ri.01" }, { framework: "cambridge", code: "2Ri.04" }, { framework: "cambridge", code: "2Ri.09" }, { framework: "cambridge", code: "2Ri.14" },
    ],
    warm_up: [
      mc("Which word rhymes with moon?", "spoon", ["moth", "map"], { hint: "Listen to the ending.", why: "Moon and spoon both end in oon." }),
      tf("A story has a beginning, a middle and an end.", true, { hint: "Think of the three parts.", why: "Stories have three parts." }),
      mc("What does a question end with?", "a question mark", ["a full stop", "a comma"], { hint: "It looks like a hook with a dot.", why: "Questions end with a question mark." }),
    ],
    intro: [
      H("Welcome back, fact finder!"),
      SAY("Welcome back, fact finder! Today's big question: how can we find out true facts quickly from a book? Non-fiction books have secret helpers, like contents pages, headings and tables. We will learn how to use them all. Let's go!", T("Today's big question: how can we find true facts quickly in a book?", "We will use contents, headings, diagrams and tables.")),
      IMG("🔎", "Fact finders use clues in books."),
      GLOSS({ fact: "Something that is true." }),
    ],
    subs: [contents, diagrams, facts, filecard],
    quiz: [
      Q(mc("Which part of a book tells you the page where a chapter starts?", "the contents page", ["the cover", "the last sentence"], { hint: "It is near the front and lists chapters.", why: "The contents page lists chapters and page numbers.", tag: "nonfiction.contents" }), "contents", "recall", [
        mc("Where would you look to find a word quickly at the back of a book?", "the index", ["the cover", "the title"], { hint: "It is in ABC order.", why: "The index lists words in ABC order.", tag: "nonfiction.contents" }),
        mc("What tells you what a section is about?", "the heading", ["the page number", "the cover"], { hint: "It is a title for the section.", why: "A heading tells us what a section is about.", tag: "nonfiction.contents" })]),
      Q(mc("Why is a contents page helpful?", "It shows what is in the book and which page to find it on", ["It makes the book longer", "It has the pictures"], { hint: "Think about finding a chapter.", why: "It lists chapters and page numbers.", tag: "nonfiction.reason" }), "contents", "reason", [
        mc("Why do non-fiction books have headings?", "They tell us what each part is about", ["They make the pages heavier", "They hide the facts"], { hint: "What does a heading say?", why: "Headings tell us what each section is about.", tag: "nonfiction.reason" }),
        mc("Why is an index in alphabetical order?", "So we can find a word quickly", ["So the book is longer", "So the pictures fit"], { hint: "How do we find a word?", why: "ABC order helps us find words fast.", tag: "nonfiction.reason" })]),
      Q(ord("Put these in the order you meet them in a non-fiction book.", ["Cover", "Contents page", "Chapters", "Index"], { hint: "Start at the front.", why: "Cover, contents, chapters, then the index at the back.", tag: "nonfiction.order" }), "contents", "apply", [
        ord("Order the parts of a non-fiction book from the front to the back.", ["Title", "Contents", "Facts and headings", "Glossary"], { hint: "Start at the front.", why: "Title and contents come first, glossary last.", tag: "nonfiction.order" }),
        ord("Arrange these book parts from the front to the back.", ["Front cover", "Contents", "Headings", "Index"], { hint: "Start at the front.", why: "Cover, contents, headings, then the index.", tag: "nonfiction.order" })]),
      Q(fill("Complete the sentences.", "The {b1} page lists the chapters. The {b2} is in ABC order at the back.", [["contents", "cover", "index"], ["index", "contents", "title"]], { hint: "One is at the front, one is at the back.", why: "The contents page is at the front; the index is at the back.", tag: "nonfiction.parts" }), "contents", "apply", [
        fill("Fill in the gaps.", "A {b1} tells us what a section is about. The {b2} lists words and page numbers.", [["heading", "cover", "page"], ["index", "title", "picture"]], { hint: "One names a section, one lists words.", why: "A heading names a section and the index lists words.", tag: "nonfiction.parts" }),
        fill("Choose the right words.", "A book of true facts is {b1}. The page near the front that lists chapters is the {b2}.", [["non-fiction", "fiction", "poetry"], ["contents", "index", "cover"]], { hint: "True facts and the front.", why: "Non-fiction books tell facts and the contents page is at the front.", tag: "nonfiction.parts" })]),
      Q(mc("A table shows: Cat 4 legs, Bird 2 legs, Spider 8 legs. Which animal has the most legs?", "spider", ["cat", "bird"], { hint: "Find the biggest number.", why: "Spider has 8 legs.", tag: "table.read" }), "diagrams", "apply", [
        mc("A table shows: Apple 5, Banana 3, Mango 7. Which fruit was eaten the most?", "mango", ["apple", "banana"], { hint: "Find the biggest number.", why: "Mango has 7.", tag: "table.read" }),
        mc("A table shows rain: Monday 2 cm, Tuesday 5 cm, Wednesday 3 cm. Which day had the most rain?", "Tuesday", ["Monday", "Wednesday"], { hint: "Find the biggest number.", why: "Tuesday has 5 cm.", tag: "table.read" })]),
      Q(hot("Tap the thing that helps you read a diagram.", [["🏷️", "label", 22, 50], ["🎨", "colour", 50, 50], ["📏", "border", 78, 50]], ["label"], { labels: true, hint: "It names the parts.", why: "Labels name the parts of a diagram.", tag: "diagram.label" }), "diagrams", "apply", [
        hot("Tap the thing that shows facts in rows and columns.", [["📊", "table", 22, 50], ["🖼️", "frame", 50, 50], ["✏️", "pencil", 78, 50]], ["table"], { labels: true, hint: "Facts in rows and columns.", why: "A table has rows and columns.", tag: "diagram.label" }),
        hot("Tap the part of a book that says what a section is about.", [["🔠", "heading", 22, 50], ["🔢", "page number", 50, 50], ["📎", "paper clip", 78, 50]], ["heading"], { labels: true, hint: "It is a title.", why: "A heading names the section.", tag: "diagram.label" })]),
      Q(mc("Why do diagrams have labels?", "They name the parts so we know what each part is", ["They make the picture bigger", "They are just decoration"], { hint: "What do the words do?", why: "Labels name the parts.", tag: "diagram.reason" }), "diagrams", "reason", [
        mc("Why do we use a table to show facts?", "It puts facts in rows and columns so they are easy to find", ["It makes the facts longer", "It hides the numbers"], { hint: "Think about finding a fact fast.", why: "A table organises facts.", tag: "diagram.reason" }),
        mc("Why does a diagram use arrows?", "To point to the part being named", ["To make it look busy", "To show a story"], { hint: "What do arrows point to?", why: "Arrows link labels to parts.", tag: "diagram.reason" })]),
      Q(mat("Match each book to non-fiction or fiction.", [["A book about how frogs grow", "non-fiction"], ["A story about a talking frog", "fiction"], ["A fact file about the Moon", "non-fiction"]], { hint: "True facts or a made-up story?", why: "Facts are non-fiction; stories are fiction.", tag: "fact.sort" }), "facts", "recall", [
        mat("Sort each book into non-fiction or fiction.", [["A book that tells how plants grow", "non-fiction"], ["A story about a dragon who bakes", "fiction"], ["A map of Pakistan", "non-fiction"]], { hint: "True facts or a made-up story?", why: "Facts are non-fiction; stories are fiction.", tag: "fact.sort" }),
        mat("Which kind of book is each one?", [["A guide to garden birds", "non-fiction"], ["A tale about a magic teapot", "fiction"], ["A poster about the planets", "non-fiction"]], { hint: "True facts or a made-up story?", why: "Facts are non-fiction; stories are fiction.", tag: "fact.sort" })]),
      Q(ms("Which are true facts? Pick two.", ["A spider has eight legs", "Fish live in water"], ["Cats can fly", "The Sun is cold"], { hint: "Which are really true?", why: "A spider has 8 legs and fish live in water.", tag: "fact.find" }), "facts", "apply", [
        ms("Pick the two facts.", ["Birds have feathers", "A week has seven days"], ["Dogs have wings", "Snow is hot"], { hint: "Which are really true?", why: "Birds have feathers and a week has seven days.", tag: "fact.find" }),
        ms("Choose two true facts.", ["Bees make honey", "Plants need water"], ["Fish climb trees", "Stars are made of cheese"], { hint: "Which are really true?", why: "Bees make honey and plants need water.", tag: "fact.find" })]),
      Q(sld("Slide to show how many are facts: Cats purr. Cats have whiskers. Cats are the cutest.", { min: 0, max: 5 }, 2, 0, { hint: "Which can be checked?", why: "Cats purr and have whiskers are facts; the cutest is an opinion.", tag: "fact.count" }), "facts", "apply", [
        sld("Slide to show how many are facts: Frogs jump. Frogs are scary. Frogs lay eggs.", { min: 0, max: 5 }, 2, 0, { hint: "Which can be checked?", why: "Jumping and laying eggs are facts; scary is an opinion.", tag: "fact.count" }),
        sld("Slide to show how many are facts: Bees buzz. Bees make honey. Bees have wings. Bees are scary.", { min: 0, max: 5 }, 3, 0, { hint: "Which can be checked?", why: "Three of them are facts; scary is an opinion.", tag: "fact.count" })]),
      Q(mc("Why can we trust a non-fiction book more than a made-up story for facts?", "It is written to give true information", ["It has more pictures", "It is shorter"], { hint: "What is non-fiction for?", why: "Non-fiction books are written to tell true facts.", tag: "fact.reason" }), "facts", "reason", [
        mc("Why do we say a flying cat is made up?", "Cats cannot really fly", ["Cats are too small", "Cats do not like the sky"], { hint: "Is it really true?", why: "It is not true, so it is made up.", tag: "fact.reason" }),
        mc("Why do we look in a book to check a fact?", "A non-fiction book gives true information", ["A book is heavier", "A book has more words"], { hint: "Where are true facts?", why: "Non-fiction books are written to give facts.", tag: "fact.reason" })]),
      Q(st("What do we call a short page of true facts about one topic? Two words, starting with f.", ["fact file", "factfile"], { hint: "It is what we make in this lesson.", why: "It is called a fact file.", tag: "factfile.name" }), "filecard", "recall", [
        st("What is the list of words and their meanings at the back of a book called? One word, starting with g.", ["glossary"], { hint: "It explains the hard words.", why: "It is called a glossary.", tag: "factfile.name" }),
        st("What is the page near the front that lists the chapters called? One word, starting with c.", ["contents"], { hint: "It lists what is in the book.", why: "It is called the contents page.", tag: "factfile.name" })]),
      Q(ord("Put the steps in order for making a fact file.", ["Choose a topic", "Find facts in a book", "Write a heading and the facts", "Add a labelled picture"], { hint: "What comes first?", why: "Choose, find, write, then add a picture.", tag: "factfile.steps" }), "filecard", "apply", [
        ord("Arrange the steps for using a contents page.", ["Open the contents page", "Find the chapter's page number", "Turn to that page", "Read the heading"], { hint: "What comes first?", why: "Open, find, turn, read.", tag: "factfile.steps" }),
        ord("Sort the steps for finding a word in the index.", ["Think of the first letter", "Open the index", "Find the word", "Turn to the page"], { hint: "What comes first?", why: "First letter, open index, find, turn.", tag: "factfile.steps" })]),
      Q(tf("A fact file can include a labelled picture.", true, { hint: "Think of diagrams.", why: "A labelled picture helps explain facts.", tag: "factfile.parts" }), "filecard", "recall", [
        tf("A fact file should have made-up facts.", false, { hint: "A fact file is for facts.", why: "Facts must be true.", tag: "factfile.parts" }),
        tf("A heading tells us what a section is about.", true, { hint: "It is a title.", why: "A heading names the section.", tag: "factfile.parts" })]),
      Q(mc("Why do we check facts in a book before adding them to a fact file?", "So our fact file is true", ["So it is longer", "So it has more colours"], { hint: "What must facts be?", why: "Facts must be true, so we check a book.", tag: "factfile.reason" }), "filecard", "reason", [
        mc("Why does a fact file have a heading?", "It tells the reader what the page is about", ["It makes the page heavier", "It hides the facts"], { hint: "What does a heading say?", why: "A heading says what the topic is.", tag: "factfile.reason" }),
        mc("Why do we add labels to the picture in a fact file?", "They name the parts so readers understand", ["They make it look busy", "They are the title"], { hint: "What do labels do?", why: "Labels name the parts of the picture.", tag: "factfile.reason" })]),
    ],
  }),
];
