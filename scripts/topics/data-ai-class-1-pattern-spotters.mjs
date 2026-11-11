import { SAY, SS, H, T, PHOTO, ACT, MAN, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Computer Science, Data & AI, Class 1 (Aisha, age 7), topic 10: Pattern spotters.
// Story thread: Aisha teaches a robot friend to sort striped and spotty scarves.
const TILES = "data-ai-class-1-pattern-spotters-1-743f59b6.jpg";
const WEAVE = "data-ai-class-1-pattern-spotters-2-4307bf4f.jpg";
const OKM = (label) => ["ok", "✅", 50, 88, 2, "bounce", label];
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });

// ---------------------------------------------------------------------------------------------- 1. learn
const patterns = {
  id: "patterns", kind: "learn", title: "Patterns everywhere",
  blocks: [
    H("Welcome back, pattern spotter!"),
    SAY("Today we look for patterns. Aisha wants to teach her robot friend to spot them.",
      T("Today's big question: how do machines find patterns?")),
    SAY("Look at this floor. The same shapes come again and again. That is a pattern.",
      PHOTO(TILES, "A floor of black, white and grey square tiles in a repeating pattern", "A tiled floor with a repeating pattern.", "Photo by note thanun on Unsplash")),
    H("Stop 1: Patterns in shapes and sounds"),
    SAY("A pattern is something that repeats in a set way. Colours, shapes and sounds can make patterns.",
      T("A **pattern** repeats in a set way.")),
    EXP("Spot the pattern",
      SS("Red, blue, red, blue. The colours take turns. It is a pattern.", S("Colour pattern.", ["a", "🔴", 15, 50, 3], ["b", "🔵", 38, 50, 3], ["c", "🔴", 61, 50, 3], ["d", "🔵", 84, 50, 3, "pulse"])),
      SS("Clap, stamp, clap, stamp. Sounds can make a pattern too.", S("Sound pattern.", ["a", "👏", 20, 50, 3, "bounce"], ["b", "🦶", 45, 50, 3, "bounce"], ["c", "👏", 70, 50, 3, "bounce"])),
      SS("After a pattern, we can say what comes next.", S("What is next?", ["a", "🔴", 20, 50, 3], ["b", "🔵", 45, 50, 3], ["c", "🔴", 70, 50, 3], ["q", "❓", 90, 30, 2, "pulse"]))),
    CHK(mc("Red, blue, red, blue, ... What comes next?", "Red", ["Green", "Yellow"], { hint: "The colours take turns.", why: "The pattern goes red then blue, so red is next.", tag: "pattern.next" })),
    H("Stop 2: Patterns in days"),
    SAY("Days make a pattern. Monday, Tuesday, Wednesday, and then Monday again after Sunday.",
      T("Days of the week repeat in a **cycle**.")),
    EXP("The week",
      SS("Seven days make one week. They go in the same order.", S("A week.", ["w", "📅", 50, 50, 3, "pulse", "7 days"])),
      SS("After Sunday, a new week starts with Monday.", S("Again.", ["s", "☀️", 30, 50, 3], ["m", "📅", 70, 50, 3, "bounce", "Monday"])),
      SS("A pattern that repeats is a cycle.", S("A cycle.", ["c", "🔁", 50, 50, 3, "pulse"], OKM("a cycle")))),
    CHK(tf("The days of the week form a repeating pattern.", true, { hint: "Think about Monday after Sunday.", why: "The days repeat in order.", tag: "pattern.days" })),
    SAY("Let us remember. Patterns repeat. They can be colours, shapes, sounds or days.",
      SUM("A pattern repeats in a set way", "Patterns can be seen and heard", "A repeating pattern is a cycle")),
    GLOSS({ pattern: "Something that repeats in a set way.", cycle: "A pattern that goes round and round.", next: "What comes after.", repeat: "To happen again.", colour: "How something looks, like red or blue." }),
  ],
  mini: [
    mc("What is a pattern?", "Something that repeats in a set way", ["A kind of food", "A loud noise"], { hint: "Think about red, blue, red, blue.", why: "A pattern repeats." }),
    tf("A sound can make a pattern.", true, { hint: "Think about clap, stamp.", why: "Sounds can repeat." }),
    mc("Which day comes after Sunday in a new week?", "Monday", ["Friday", "Wednesday"], { hint: "A new week starts.", why: "Monday starts the week again." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const sort = {
  id: "sort", kind: "try", title: "Sort like a machine",
  blocks: [
    H("Stop 1: Sort by looks"),
    SAY("A machine can sort things into groups. It looks at things that are alike.",
      T("To **sort** is to put things that are alike into groups.")),
    EXP("Sort the cups",
      SS("Here are cups in many colours. Aisha will sort them.", S("Many cups.", ["a", "🔴", 20, 50, 3], ["b", "🔵", 40, 50, 3], ["c", "🔴", 60, 50, 3], ["d", "🔵", 80, 50, 3])),
      SS("Red cups go in one box. Blue cups go in another.", S("Two groups.", ["r", "🔴", 25, 50, 3, "pulse"], ["b", "🔵", 75, 50, 3, "pulse"])),
      SS("Sorting by colour is one way to sort.", S("Sorted.", ["r", "🔴", 25, 50, 3], ["b", "🔵", 75, 50, 3], OKM("sorted")))),
    CHK(mc("Aisha sorts cups by colour. How many groups for red and blue cups?", "Two", ["One", "Five"], { hint: "Red and blue.", why: "Red cups are one group. Blue cups are another.", tag: "pattern.sort_groups" })),
    H("Stop 2: Sort with a rule"),
    SAY("A rule says how to sort. Rule: put animals with four legs in one box.",
      T("A **rule** says how to sort.")),
    EXP("A rule for legs",
      SS("The rule: four legs go in the first box. Others go in the second.", S("The rule.", ["r", "📏", 50, 40, 3, "pulse", "four legs?"])),
      SS("A cat has four legs. A bird has two legs.", S("Apply the rule.", ["c", "🐱", 30, 50, 3, "bounce", "4 legs"], ["b", "🐦", 70, 50, 3, "bounce", "2 legs"])),
      SS("The cat goes in box one. The bird goes in box two.", S("Sorted by the rule.", ["c", "🐱", 30, 50, 3], ["b", "🐦", 70, 50, 3], OKM("rule used")))),
    SAY("Now you try. Sort things at home with a grown-up.",
      ACT("Sort at home", ["Some socks, spoons or toys", "A grown-up"], ["Choose one rule, such as colour or size.", "Sort everything into groups using your rule.", "Try a different rule. Do the groups change?"])),
    CHK(tf("The same things can be sorted in different ways.", true, { hint: "Colour, size, legs.", why: "Different rules make different groups.", tag: "pattern.sort_rules" })),
    SAY("Let us remember. Sorting puts alike things together. A rule says how.",
      SUM("Sort alike things together", "A rule says how to sort", "Different rules make different groups")),
    GLOSS({ sort: "To put things that are alike into groups.", rule: "A sentence that says how to do something.", group: "Things that belong together.", legs: "Parts an animal walks on.", box: "A container to hold a group." }),
  ],
  mini: [
    mc("What does a rule do when sorting?", "Says how to sort", ["Mixes things up", "Hides things"], { hint: "It tells you what to do.", why: "A rule says how to sort." }),
    tf("There is only one way to sort a pile of toys.", false, { hint: "Colour, size, kind...", why: "There are many ways to sort." }),
    mc("A bird has two legs. Which box for the rule 'four legs'?", "Not in the four-leg box", ["In the four-leg box", "In the sky box"], { hint: "Count the legs.", why: "Two legs does not fit four legs." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const guess = {
  id: "guess", kind: "play", title: "Guess the next one",
  blocks: [
    H("Stop 1: Predict the pattern"),
    SAY("Spotting a pattern lets us guess what comes next. A machine does this too.",
      T("A pattern helps us **predict** the next one.")),
    EXP("What comes next?",
      SS("Spot, stripe, spot, stripe. What is next?", S("Look.", ["a", "🔵", 15, 50, 3], ["b", "🟨", 38, 50, 3], ["c", "🔵", 61, 50, 3], ["d", "🟨", 84, 50, 3])),
      SS("The pattern is spot, stripe. So the next one is a spot.", S("Predict.", ["q", "🔵", 50, 50, 3, "pulse", "next"])),
      SS("The guess can be wrong. We check the next one.", S("Check.", ["q", "🔵", 40, 50, 3], ["t", "🤔", 75, 40, 3, "pulse"], OKM("a guess")))),
    CHK(mc("Spot, stripe, spot, stripe. What is next?", "A spot", ["A stripe", "A star"], { hint: "They take turns.", why: "After a stripe comes a spot.", tag: "pattern.predict" })),
    H("Stop 2: Brain game"),
    SAY("First a memory game. Then find the odd one out.",
      T("Play the memory game. Then find the **odd one out**.")),
    BRAIN("memory_match", "Pattern pairs", "Find the pairs.", ["🔴", "🔵", "🟨", "🟩"]),
    CHK(hot("Tap the odd one out.", [["🔴", "Red", 22, 50], ["🔴", "Red", 50, 50], ["🔵", "Blue", 78, 50]], ["Blue"], { labels: true, hint: "Two are the same.", why: "Blue is different from the two reds.", tag: "pattern.odd_one" })),
    SAY("Let us remember. A pattern helps us guess. A guess can be wrong.",
      SUM("Spot a pattern to guess what comes next", "The odd one out is different", "A guess can be wrong")),
    GLOSS({ predict: "To say what will come next.", "odd one out": "The one that is different from the others.", guess: "To say what you think without being sure.", check: "To make sure.", stripe: "A long line of colour." }),
  ],
  mini: [
    mc("Red, red, blue, red, red, blue. What is next?", "Red", ["Blue", "Green"], { hint: "Two reds then a blue.", why: "The pattern is red, red, blue." }),
    tf("A guess from a pattern can sometimes be wrong.", true, { hint: "Patterns can change.", why: "A guess is not always right." }),
    mc("What is the odd one out?", "The one that is different", ["The biggest one", "The first one"], { hint: "Think about different.", why: "The odd one out is different from the rest." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const teach = {
  id: "teach", kind: "use", title: "Teach a robot friend",
  blocks: [
    H("Stop 1: Show examples"),
    SAY("Aisha wants her robot friend to tell striped scarves from spotty ones. She shows examples.",
      T("An **example** shows what something is like.")),
    SAY("This cloth has a woven pattern. Aisha shows the robot many scarves with different patterns.",
      PHOTO(WEAVE, "A close-up of woven fabric in orange, blue, red and turquoise threads", "A woven cloth. Aisha shows her robot different patterns.", "Photo by Mikaela Wiedenhoff on Unsplash")),
    SAY("She shows a striped scarf and says, striped. She shows a spotty scarf and says, spotty.",
      T("Each example has a **label**.")),
    SAY("More examples help the robot learn. One example is not enough.",
      ACT("Teach a friend", ["Some striped and spotty things", "A grown-up or a friend"], ["Show five striped things. Say: striped.", "Show five spotty things. Say: spotty.", "Show a new thing. Can your friend guess?"])),
    CHK(mc("Why does Aisha show many examples?", "To help the robot learn the pattern", ["To tire the robot", "To hide the scarves"], { hint: "More practice helps.", why: "Many examples help a machine learn.", tag: "pattern.many_examples" })),
    H("Stop 2: Test with a new one"),
    SAY("Now Aisha shows a new scarf. The robot guesses. It says, striped. It is right.",
      T("**Test** with a new example the robot has not seen.")),
    EXP("Test the robot",
      SS("A new scarf with thin stripes comes in.", S("A new scarf.", ["s", "🧣", 50, 50, 3, "bounce"])),
      SS("The robot guesses: striped. Aisha says, correct!", S("Good guess.", ["r", "🤖", 30, 50, 3, "bounce"], ["t", "✅", 70, 50, 3])),
      SS("A scarf with spots and a few stripes confuses it. It guesses wrong.", S("A mistake.", ["r", "🤖", 30, 50, 3], ["q", "❓", 70, 40, 3, "pulse", "wrong?"], OKM("learn from it")))),
    CHK(mc("The robot guesses wrong. What can Aisha do?", "Show more examples and try again", ["Be angry", "Throw it away"], { hint: "Teach it more.", why: "More examples can fix mistakes.", tag: "pattern.fix" })),
    SAY("Let us remember. Show many examples with labels. Test with new ones.",
      SUM("Show many labelled examples", "Test with a new example", "Mistakes help us teach better")),
    GLOSS({ example: "One case that shows what something is like.", label: "A name that says what something is.", test: "To try something new to see if it works.", robot: "A machine that follows instructions.", teach: "To help someone or something learn." }),
  ],
  mini: [
    mc("What is a label?", "A name for an example", ["A kind of cloth", "A number"], { hint: "Like a name tag.", why: "A label names an example." }),
    tf("A new example is a good way to test the robot.", true, { hint: "It has not seen it before.", why: "A new example tests what it learned." }),
    mc("What helps a robot learn best?", "Many different examples", ["One example only", "No examples"], { hint: "Practice helps.", why: "Many examples help." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Aisha's scarf robot", backdrop: "classroom", caption: "Aisha shows her robot friend striped and spotty scarves.",
  scenes: [
    { caption: "A robot friend.", say: "Aisha has a robot friend. She wants to teach it patterns.",
      items: [{ id: "a", emoji: "👧", label: "Aisha", x: 25, y: 56, size: 3, enter: "walk_right" }, { id: "r", emoji: "🤖", x: 72, y: 50, size: 3, enter: "pop" }] },
    { caption: "A striped scarf.", say: "She shows a striped scarf. She says the label: striped.",
      items: [{ id: "s", emoji: "🧣", label: "striped", x: 50, y: 48, size: 3, enter: "grow" }] },
    { caption: "A spotty scarf.", say: "Then a spotty scarf. She says: spotty.",
      items: [{ id: "s", emoji: "🧶", label: "spotty", x: 50, y: 48, size: 3, enter: "grow" }] },
    { caption: "Only a few.", say: "She only shows two. The robot gets confused.",
      items: [{ id: "r", emoji: "🤖", x: 35, y: 50, size: 3 }, { id: "q", emoji: "❓", x: 70, y: 35, size: 3, anim: "pulse" }] },
    { caption: "More examples.", say: "So she shows many more. Each one has a label.",
      items: [{ id: "a", emoji: "🧣", x: 25, y: 50, size: 2 }, { id: "b", emoji: "🧶", x: 50, y: 50, size: 2 }, { id: "c", emoji: "🧣", x: 75, y: 50, size: 2 }] },
    { caption: "A new scarf.", say: "Now a new scarf. The robot looks for the pattern.",
      items: [{ id: "n", emoji: "🧣", x: 35, y: 50, size: 3 }, { id: "s", emoji: "🔍", x: 70, y: 45, size: 3, effect: "sparkle" }] },
    { caption: "A guess.", say: "The robot guesses: striped. It is right!",
      items: [{ id: "r", emoji: "🤖", x: 35, y: 50, size: 3, anim: "bounce" }, { id: "t", emoji: "✅", x: 70, y: 45, size: 3, effect: "glow" }] },
    { caption: "Guesses can be wrong.", say: "But a robot can still be wrong. People check its guesses.",
      items: [{ id: "a", emoji: "👧", x: 30, y: 56, size: 3 }, { id: "h", emoji: "👀", x: 70, y: 45, size: 3, effect: "hearts" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- patterns (q1-q8)
  Q(mc("Which best tells what a pattern is?", "Something that repeats in a set way", ["A mix with no order", "A kind of toy"], { hint: "Think about red, blue, red, blue.", why: "A pattern repeats in a set way.", tag: "pattern.meaning" }), "patterns", "recall",
    [mc("What do we call things that repeat in a set order, like red, blue, red, blue?", "A pattern", ["A mess", "A secret"], { hint: "They repeat.", why: "A repeating order is a pattern.", tag: "pattern.meaning" })]),
  Q(mc("Circle, square, circle, square, circle, ... What comes next?", "Square", ["Circle", "Star"], { hint: "They take turns.", why: "After a circle comes a square.", tag: "pattern.next_shape" }), "patterns", "apply",
    [mc("Cat, dog, cat, dog, cat, ... What comes next?", "Dog", ["Cat", "Fish"], { hint: "They take turns.", why: "After a cat comes a dog.", tag: "pattern.next_shape" })]),
  Q(tf("A pattern repeats in a set way.", true, { hint: "Think about the tiles.", why: "Patterns repeat.", tag: "pattern.repeat" }), "patterns", "recall",
    [tf("A pattern never repeats.", false, { hint: "Think about the tiles.", why: "A pattern repeats.", tag: "pattern.repeat" })]),
  Q(mat("Match each set to its pattern name.", [["Red, blue, red, blue", "AB, AB"], ["Red, blue, blue, red, blue, blue", "ABB, ABB"], ["Red, red, red", "A, A, A"]], { hint: "Use letters for colours.", why: "Each set follows its own pattern.", tag: "pattern.names" }), "patterns", "apply",
    [mat("Join each pattern to its letters.", [["Clap, stamp, clap, stamp", "AB, AB"], ["Up, up, down, up, up, down", "AAB, AAB"], ["Sun, sun, sun", "A, A, A"]], { hint: "Use letters for sounds.", why: "Each set follows its own pattern.", tag: "pattern.names" })]),
  Q(hot("Tap the repeating pattern.", [["🔴🔵🔴🔵", "Red blue red blue", 22, 50], ["🔴🟨🟩⚪", "Four colours", 50, 50], ["⭐", "One star", 78, 50]], ["Red blue red blue"], { labels: true, hint: "Look for repeats.", why: "Red blue repeats.", tag: "pattern.tap" }), "patterns", "recall",
    [hot("Tap the pattern that repeats.", [["🌙⭐🌙⭐", "Moon star moon star", 22, 50], ["🌙", "One moon", 50, 50], ["⭐🌙🍎", "Three different", 78, 50]], ["Moon star moon star"], { labels: true, hint: "Look for repeats.", why: "Moon star repeats.", tag: "pattern.tap" })]),
  Q(mc("Sam says a pattern must repeat exactly three times to count. Is he right?", "No. A pattern can repeat any number of times", ["Yes, exactly three", "Yes, exactly two"], { hint: "Think about a tiled floor.", why: "A pattern repeats as many times as it needs.", tag: "pattern.reason_three" }), "patterns", "reason",
    [mc("Ben says patterns stop after two repeats. Is he right?", "No. A pattern can keep repeating", ["Yes, always two", "Yes, always three"], { hint: "Think about a tiled floor.", why: "A pattern can continue.", tag: "pattern.reason_three" })]),
  Q(mc("Zainab says patterns only exist in pictures. Is she right?", "No. Sounds, days and actions can make patterns too", ["Yes, only pictures", "Yes, only on floors"], { hint: "Think about clap, stamp.", why: "Patterns can be heard and done as well.", tag: "pattern.reason_pictures" }), "patterns", "reason",
    [mc("Mina says you cannot hear a pattern. Is she right?", "No. A drum beat can make a pattern", ["Yes, never", "Yes, only see them"], { hint: "Think about clap, stamp.", why: "Sounds can make patterns.", tag: "pattern.reason_pictures" })]),
  Q(fill("Finish the sentences about patterns.", "A {b1} repeats in a set way. A pattern that goes round again and again is a {b2}.", [["pattern", "puddle", "pencil"], ["cycle", "chair", "cloud"]], { hint: "Think about the week.", why: "A pattern repeats. A cycle goes round again.", tag: "pattern.fill_cycle" }), "patterns", "recall",
    [fill("Complete the sentences about days.", "There are {b1} days in a week. After Sunday comes {b2}.", [["seven", "ten", "two"], ["Monday", "Friday", "Wednesday"]], { hint: "Think about the week.", why: "A week has seven days and Monday follows Sunday.", tag: "pattern.fill_cycle" })]),
  // ----- sort (q9-q15)
  Q(mc("Aisha sorts cups into red cups and blue cups. What did she use to sort?", "Colour", ["Smell", "Time"], { hint: "Look at the cups.", why: "She sorted by colour.", tag: "pattern.sort_by" }), "sort", "apply",
    [mc("Sam sorts shapes into big and small. What did he use to sort?", "Size", ["Colour", "Smell"], { hint: "Look at the shapes.", why: "He sorted by size.", tag: "pattern.sort_by" })]),
  Q(ord("Put the sorting steps in order.", ["Look at all the things", "Choose a rule", "Put each thing in its group"], { hint: "Look first.", why: "Look, choose a rule, then sort.", tag: "pattern.sort_steps" }), "sort", "apply",
    [ord("Put these steps for sorting shoes in order.", ["Pile the shoes up", "Pick a rule, like colour", "Make groups"], { hint: "Pile first.", why: "Pile, choose a rule, then make groups.", tag: "pattern.sort_steps" })]),
  Q(sld("There are 10 shapes. 6 are red. Slide to show how many are not red.", { min: 0, max: 12 }, 4, 0, { hint: "10 take away 6.", why: "10 - 6 = 4 shapes.", tag: "pattern.not_red" }), "sort", "apply",
    [sld("There are 9 shapes. 5 are blue. Slide to show how many are not blue.", { min: 0, max: 12 }, 4, 0, { hint: "9 take away 5.", why: "9 - 5 = 4 shapes.", tag: "pattern.not_red" })]),
  Q(num("There are 9 animals. 4 have four legs. How many do not have four legs?", 5, { hint: "9 take away 4.", why: "9 - 4 = 5 animals.", tag: "pattern.legs_count" }), "sort", "apply",
    [num("There are 8 animals. 3 can fly. How many cannot fly?", 5, { hint: "8 take away 3.", why: "8 - 3 = 5 animals.", tag: "pattern.legs_count" })]),
  Q(ms("Which two rules could sort animals? Pick two.", ["How many legs they have", "Whether they can fly"], ["What time it is", "The smell of tea"], { hint: "Think about the animals.", why: "Legs and flying describe animals.", tag: "pattern.rule_pick" }), "sort", "apply",
    [ms("Which two rules could sort toys? Pick two.", ["The colour", "The size"], ["The weather", "The day of the month"], { hint: "Think about the toys.", why: "Colour and size describe toys.", tag: "pattern.rule_pick" })]),
  Q(mc("Sam says the odd one out is always wrong. Is he right?", "No. It is just different from the others", ["Yes, it is wrong", "Yes, it must be thrown away"], { hint: "Different is not wrong.", why: "The odd one out is only different.", tag: "pattern.reason_odd" }), "sort", "reason",
    [mc("Hana says a different shape in a row is a mistake. Is she right?", "No. It might just be the odd one out", ["Yes, always a mistake", "Yes, delete it"], { hint: "Different is not wrong.", why: "It may be an odd one out on purpose.", tag: "pattern.reason_odd" })]),
  Q(mat("Match each rule to the group it makes.", [["Has four legs", "Cat and dog"], ["Has two legs", "Bird and person"], ["Has no legs", "Fish and snake"]], { hint: "Count the legs.", why: "Each rule makes a different group.", tag: "pattern.rule_group" }), "sort", "apply",
    [mat("Join each rule to its group.", [["Is red", "Apple and tomato"], ["Is yellow", "Banana and lemon"], ["Is green", "Lime and pea"]], { hint: "Think about colours.", why: "Each rule picks its own group.", tag: "pattern.rule_group" })]),
  // ----- guess (q16-q23)
  Q(mc("Red, blue, blue, red, blue, blue, red, ... What comes next?", "Blue", ["Red", "Green"], { hint: "Red then two blues.", why: "The pattern is red, blue, blue.", tag: "pattern.abb" }), "guess", "apply",
    [mc("Star, moon, moon, star, moon, moon, star, ... What comes next?", "Moon", ["Star", "Sun"], { hint: "Star then two moons.", why: "The pattern is star, moon, moon.", tag: "pattern.abb" })]),
  Q(tf("A machine can find patterns by looking at many examples.", true, { hint: "Think about the robot.", why: "Machines find patterns in examples.", tag: "pattern.machine_finds" }), "guess", "recall",
    [tf("A machine can find patterns with no examples at all.", false, { hint: "It needs examples.", why: "Machines need examples to find patterns.", tag: "pattern.machine_finds" })]),
  Q(fill("Finish the sentences about guessing.", "A pattern helps us {b1} what comes {b2}.", [["predict", "ignore", "lose"], ["next", "never", "blue"]], { hint: "Think about guessing.", why: "A pattern helps us predict what comes next.", tag: "pattern.fill_predict" }), "guess", "recall",
    [fill("Complete the sentences about the odd one out.", "The odd one out is {b1} from the others. We {b2} the odd one out.", [["different", "the same", "bigger"], ["spot", "hide", "break"]], { hint: "Think about different.", why: "The odd one out is different and we spot it.", tag: "pattern.fill_predict" })]),
  Q(hot("Tap the one that is not a fruit.", [["🍎", "Apple", 22, 50], ["🍌", "Banana", 50, 50], ["🚗", "Car", 78, 50]], ["Car"], { labels: true, hint: "Two are fruit.", why: "A car is not fruit.", tag: "pattern.tap_odd" }), "guess", "apply",
    [hot("Tap the one that does not belong.", [["🐱", "Cat", 22, 50], ["🐶", "Dog", 50, 50], ["🪑", "Chair", 78, 50]], ["Chair"], { labels: true, hint: "Two are animals.", why: "A chair is not an animal.", tag: "pattern.tap_odd" })]),
  Q(mc("Aisha says a machine always guesses right. Is she right?", "No. A machine can guess wrong, so people check", ["Yes, always right", "Yes, machines cannot be wrong"], { hint: "Think about the scarf that confused the robot.", why: "Machines can make mistakes.", tag: "pattern.reason_always_right" }), "guess", "reason",
    [mc("Omar says a robot's guess must be true. Is he right?", "No. A robot's guess can be wrong", ["Yes, must be true", "Yes, robots know everything"], { hint: "Think about the confused robot.", why: "Machines can be wrong.", tag: "pattern.reason_always_right" })]),
  Q(num("The pattern is 2, 4, 6, ... What number comes next?", 8, { hint: "Add 2 each time.", why: "2, 4, 6, 8 adds 2 each time.", tag: "pattern.number" }), "guess", "apply",
    [num("The pattern is 5, 10, 15, ... What number comes next?", 20, { hint: "Add 5 each time.", why: "5, 10, 15, 20 adds 5 each time.", tag: "pattern.number" })]),
  Q(ord("Put the pattern steps in order.", ["Look at the pattern", "Say the rule", "Guess what comes next", "Check your guess"], { hint: "Look first.", why: "Look, find the rule, guess, then check.", tag: "pattern.guess_steps" }), "guess", "apply",
    [ord("Put these steps in order for finding the next one.", ["See the first few items", "Spot the repeat", "Predict the next one", "Test it"], { hint: "See first.", why: "See, spot, predict, then test.", tag: "pattern.guess_steps" })]),
  Q(mc("Omar says a rule never needs changing. Is he right?", "No. If the rule fails we can change it", ["Yes, rules never change", "Yes, a rule is always right"], { hint: "Think about the confused robot.", why: "We can improve a rule when it fails.", tag: "pattern.reason_rule" }), "guess", "reason",
    [mc("Sana says a rule that fails must never be changed. Is she right?", "No. We can change it to work better", ["Yes, never", "Yes, rules are fixed for ever"], { hint: "Think about the confused robot.", why: "Rules can be improved.", tag: "pattern.reason_rule" })]),
  // ----- teach (q24-q30)
  Q(mc("Which helps a robot learn a pattern best?", "Many different examples", ["One example", "No examples"], { hint: "Think about practice.", why: "More examples help a machine learn.", tag: "pattern.good_examples" }), "teach", "apply",
    [mc("What makes a robot learn better?", "More labelled examples", ["Fewer labelled examples", "No labels"], { hint: "Think about practice.", why: "More labelled examples help.", tag: "pattern.good_examples" })]),
  Q(mc("Omar says one example is enough to teach a robot. Is he right?", "No. A robot needs many examples", ["Yes, one is enough", "Yes, a robot learns instantly"], { hint: "Think about the two scarves.", why: "Many examples help it learn.", tag: "pattern.reason_one" }), "teach", "reason",
    [mc("Layla says one picture teaches a robot all cats. Is she right?", "No. Cats look different, so it needs many", ["Yes, one picture", "Yes, all cats look the same"], { hint: "Think about the two scarves.", why: "One example cannot show every kind.", tag: "pattern.reason_one" })]),
  Q(mc("Layla says if the rule fails, it is the robot's fault. Is she right?", "No. The examples or rule may need improving", ["Yes, always the robot's fault", "Yes, robots are lazy"], { hint: "Who chose the examples?", why: "Better examples and rules fix mistakes.", tag: "pattern.reason_fault" }), "teach", "reason",
    [mc("Ben says a wrong guess means the robot is bad. Is he right?", "No. It might need better examples", ["Yes, bad robot", "Yes, throw it away"], { hint: "Who chose the examples?", why: "More examples can help.", tag: "pattern.reason_fault" })]),
  Q(mc("Aisha says people do not need patterns. Is she right?", "No. People use patterns to learn, plan and guess", ["Yes, people never use patterns", "Yes, only machines use them"], { hint: "Think about days of the week.", why: "People use patterns too.", tag: "pattern.reason_people" }), "teach", "reason",
    [mc("Zayd says only machines notice patterns. Is he right?", "No. People notice patterns every day", ["Yes, only machines", "Yes, patterns are only for computers"], { hint: "Think about days of the week.", why: "People notice patterns.", tag: "pattern.reason_people" })]),
  Q(sld("The robot saw 3 striped scarves and 2 spotty scarves. Slide to show how many scarves it saw.", { min: 0, max: 10 }, 5, 0, { hint: "3 + 2.", why: "3 + 2 = 5 scarves.", tag: "pattern.scarf_count" }), "teach", "apply",
    [sld("The robot saw 4 striped scarves and 3 spotty scarves. Slide to show how many scarves it saw.", { min: 0, max: 10 }, 7, 0, { hint: "4 + 3.", why: "4 + 3 = 7 scarves.", tag: "pattern.scarf_count" })]),
  Q(ms("Which two help you teach a robot well? Pick two.", ["Many examples", "Different kinds of examples"], ["One blurry example", "No examples"], { hint: "Think about practice.", why: "Many and varied examples help.", tag: "pattern.teach_pick" }), "teach", "apply",
    [ms("Which two make a good test for a robot? Pick two.", ["A new example it has not seen", "A clear picture"], ["An example it already saw", "A blank page"], { hint: "Think about testing.", why: "A new and clear example makes a good test.", tag: "pattern.teach_pick" })]),
  Q(mc("When should you ask a person to check the robot's answer?", "When the answer matters", ["Never", "Only when it is right"], { hint: "Think about important choices.", why: "A person should check answers that matter.", tag: "pattern.ask_person" }), "teach", "apply",
    [mc("Who can check a robot's guess about something important?", "A trusted adult", ["Nobody", "Another robot only"], { hint: "Think about someone you trust.", why: "A trusted adult can check.", tag: "pattern.ask_person" })]),
];

export const topics = [
  topicLesson({
    slug: "data-ai-class-1-pattern-spotters", subject: "data-ai", cls: 1, topic: 10, title: "Pattern Spotters",
    summary: "Find patterns in pictures and sounds the way a machine does to sort things.",
    unit: "Topic 10: Pattern spotters", difficulty: 1,
    objectives: ["Find a pattern in a set of examples", "Say how a machine uses patterns to sort", "Know a pattern guess can be wrong"],
    success_criteria: ["I can say what comes next in a pattern", "I can sort things with a rule", "I know a machine's guess can be wrong"],
    real_life: "Rangoli and truck art, tiled floors and the days of the week.",
    standards: [
      { framework: "ai4k12", code: "Big Idea 3", text: "Learning: computers can learn from data" },
      { framework: "csta", code: "1A-DA-07", text: "Identify and describe patterns in data visualisations" },
    ],
    warm_up: [
      mc("What does IT stand for?", "Information technology", ["Indoor toys", "Instant tea"], { hint: "Computers and information.", why: "IT is information technology." }),
      mc("What is a bug?", "A mistake in a program", ["A flower", "A sprite"], { hint: "Not an insect.", why: "A bug is a mistake." }),
      num("What is 9 + 1?", 10, { hint: "Count on from 9.", why: "9 + 1 = 10." }),
    ],
    intro: [],
    subs: [patterns, sort, guess, teach],
    clip,
    quiz,
  }),
];
