import { SAY, SS, H, T, PHOTO, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, mc, ms, tf, ord, mat, fill, hot, sld, st } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC } from "./_science-kit.mjs";

// English Class 1, topic 6: Writing a recount, our trip (Zainab, age 7).
const GIRAFFES = "english-class-1-writing-a-recount-1-2e5d476b.jpg";
const GIRAFFE = "english-class-1-writing-a-recount-2-0bf766a8.jpg";

// ---------------------------------------------------------------------------------------------- 1. learn
const features = {
  id: "features", kind: "learn", title: "Features of a recount",
  blocks: [
    H("Welcome back, young writer!"),
    SAY("Today we write about a trip. How do we tell what happened, in order?", T("Today's big question: how do we tell what happened, in order?")),
    SAY("These giraffes live at a zoo. Imagine you saw them on a school trip.", PHOTO(GIRAFFES, "Two giraffes with crossed necks standing against a cloudy sky and green trees", "Two giraffes at a zoo. A recount tells what happened on a trip like this.", "Photo by JavyGo on Unsplash")),
    H("Stop 1: I and the past"),
    SAY("A recount tells what happened. It is about something that is already finished.", T("A **recount** tells what already happened.")),
    SAY("We write I or we, because we were there. We write in the past tense.", T("Use **I** or **we**, and the **past tense**: walked, saw, ate.")),
    EB("town", "Telling a trip",
      SS("I went to the zoo with my class. We walked to the gate.", S("Past tense.", ["z", "👧", 25, 58, 3, "bounce"], ["g", "🏞️", 72, 56, 3])),
      SS("We saw a tall giraffe. It ate leaves from a tree.", S("What we saw.", ["g", "🦒", 50, 54, 3, "float"])),
      SS("I felt amazed. A recount can say how you felt.", S("A feeling.", ["z", "👧", 30, 58, 3], ["h", "😮", 72, 50, 2, "pulse"]))),
    CHK(mc("Which sentence is from a recount?", "We walked to the gate.", ["We will walk to the gate.", "Walk to the gate."], { hint: "It already happened.", why: "We walked tells us it already happened.", tag: "features.chk1" })),
    H("Stop 2: Time order"),
    SAY("A recount goes in order. Time words help us: first, then, next and finally.", T("**First, then, finally** show the order of events.")),
    EB("town", "Time words",
      SS("First, we got on the bus. Everyone was excited.", S("First.", ["b", "🚌", 50, 58, 3, "bounce"])),
      SS("Then we saw the lions. One lion roared loudly.", S("Then.", ["l", "🦁", 50, 56, 3, "pulse"])),
      SS("Finally, we ate lunch and went home.", S("Finally.", ["l", "🥪", 30, 60, 3], ["h", "🏠", 72, 56, 3]))),
    CHK(tf("A recount tells the events in the order they happened.", true, { hint: "Think of first, then, finally.", why: "A recount follows time order.", tag: "features.chk2" })),
    SAY("Let us remember. A recount tells what happened, in order, using I and the past tense.", SUM("A recount tells what already happened", "It uses I or we and the past tense", "Time words show the order")),
    GLOSS({ recount: "A piece of writing that tells what already happened.", "past tense": "Words that show something already happened, like walked.", I: "The word a writer uses to tell about themselves.", we: "The word for the writer and other people.", "first, then, finally": "Time words that show the order of events.", trip: "A journey to visit a place." }),
  ],
  mini: [
    mc("Which word shows the past?", "walked", ["walk", "walking"], { hint: "It already happened.", why: "Walked is the past tense." }),
    tf("A recount uses I or we.", true, { hint: "We were there.", why: "A recount uses I or we because the writer was there." }),
    mc("Which time word comes at the start?", "First", ["Finally", "Last"], { hint: "It begins the list.", why: "First begins a recount." }),
    mc("What is a trip?", "A journey to visit a place", ["A kind of food", "A sleepy cat"], { hint: "Think of the zoo.", why: "A trip is a journey to visit a place." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const pick = {
  id: "pick", kind: "try", title: "Pick the big moments",
  blocks: [
    H("Stop 1: Key moments"),
    SAY("We cannot write every tiny detail. We choose the big moments.", T("A **key moment** is a big or special thing that happened.")),
    EB("meadow", "Big or small?",
      SS("Seeing a baby giraffe is a big moment. We should write it.", S("Big moment.", ["g", "🦒", 50, 54, 3, "grow"])),
      SS("Tying a shoelace is a tiny detail. We can leave it out.", S("Small detail.", ["s", "👟", 50, 62, 3])),
      SS("Feeding the goats is a big moment. It was special.", S("Big moment.", ["g", "🐐", 40, 60, 3], ["h", "🌿", 75, 62, 2, "bounce"]))),
    CHK(mc("Which is a big moment on a zoo trip?", "Seeing a lion roar", ["Tying a shoelace", "Finding a pencil"], { hint: "Which one would you tell a friend?", why: "A roaring lion is a special moment worth writing about.", tag: "pick.chk1" })),
    H("Stop 2: Plan with pictures"),
    SAY("This giraffe stuck out its tongue at us. That is a moment to remember.", PHOTO(GIRAFFE, "A young giraffe with its tongue sticking out against a dark background", "A funny moment on a trip is worth writing about.", "Photo by Andy Holmes on Unsplash")),
    SAY("Draw four or five pictures in order. Each picture is one key moment.", T("A plan shows each key moment in order.")),
    SAY("Now sort these moments. Which are key moments, and which are tiny details?", MAN("Key moment or detail?", "Move each moment. Big special things go in Key moment. Tiny things go in Detail.", "🦒", 8, ["Key moment", "Detail"])),
    ACT("Draw a trip plan", ["Paper and crayons", "A grown-up to help"], ["Think of a trip you went on.", "Draw four pictures in time order.", "Write a time word under each picture."]),
    CHK(ord("Put the trip moments in order.", ["We got on the bus", "We saw the lions", "We ate lunch", "We went home"], { hint: "Start with the bus.", why: "The trip began on the bus and ended at home.", tag: "pick.chk2" })),
    SAY("Let us remember. Choose the key moments. Plan them in order with pictures.", SUM("Choose the big moments, not every detail", "Draw pictures in time order", "Add a time word to each one")),
    GLOSS({ "key moment": "A big or special thing that happened.", detail: "A tiny fact that does not matter much.", plan: "A way to get ready before you write.", order: "One thing after another, in the right line.", tongue: "The soft part in your mouth that you taste with." }),
  ],
  mini: [
    mc("What do we choose for a recount?", "The big moments", ["Every tiny detail", "Only the last thing"], { hint: "Think of the zoo trip.", why: "We choose the big moments." }),
    tf("A plan can have pictures.", true, { hint: "We drew four pictures.", why: "Pictures in order make a good plan." }),
    mc("Which word starts a time order?", "First", ["Banana", "Under"], { hint: "It begins the list.", why: "First begins a recount." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const tense = {
  id: "tense", kind: "play", title: "Past tense swap",
  blocks: [
    H("Stop 1: Change it to the past"),
    SAY("To write a recount we change now words into past words. Most add ed.", T("Many words add **ed**: walk becomes walked.")),
    EB("classroom", "Now and then",
      SS("Walk becomes walked. Jump becomes jumped. We add ed.", S("Add ed.", ["w", "🚶", 30, 58, 3], ["j", "🤸", 72, 58, 3, "bounce"])),
      SS("Some words change. Eat becomes ate. Go becomes went.", S("Odd ones.", ["e", "🍽️", 30, 58, 3], ["g", "🚌", 72, 58, 3])),
      SS("See becomes saw. We saw a tall giraffe yesterday.", S("Saw.", ["s", "👀", 30, 58, 3], ["g", "🦒", 72, 54, 3]))),
    CHK(mc("What is the past tense of jump?", "jumped", ["jumping", "jumps"], { hint: "Add ed.", why: "Jump adds ed to make jumped.", tag: "tense.chk1" })),
    H("Stop 2: Brain game"),
    SAY("Warm up your memory. Watch the trip pictures light up, then copy them.", T("Play the game, then answer a question.")),
    SAY("Watch the order closely. Then copy it.", BRAIN("remember_order", "Trip order", "Watch the order, then copy it. It gets longer each time!", ["🚌", "🦁", "🦒", "🥪"])),
    CHK(mc("Which word is past tense?", "went", ["go", "going"], { hint: "It already happened.", why: "Went is the past tense of go.", tag: "tense.chk2" })),
    SAY("Let us remember. Most past words end in ed. Some, like ate and went, change.", SUM("Many words add ed", "Some words change: ate, went, saw", "Use the past tense in a recount")),
    GLOSS({ ed: "An ending that shows a word is in the past.", irregular: "A word that does not just add ed, like went.", yesterday: "The day before today.", tense: "The time of an action: now, before or later." }),
  ],
  mini: [
    mc("What is the past tense of walk?", "walked", ["walking", "walks"], { hint: "Add ed.", why: "Walk adds ed." }),
    tf("Went is the past of go.", true, { hint: "Say it in a sentence.", why: "Yesterday we went to the zoo." }),
    mc("Which is the past tense of eat?", "ate", ["eated", "eating"], { hint: "It changes a lot.", why: "Eat becomes ate." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const write = {
  id: "write", kind: "use", title: "Write our trip recount",
  blocks: [
    H("Stop 1: Plan and begin"),
    SAY("Now we write a recount. Think of a trip you really went on.", T("Write about a **real** trip.")),
    SAY("Maybe you visited Lahore Zoo, the Margalla Hills or a UK farm.", T("Choose a trip you remember well.")),
    SAY("An Eid picnic with your family makes a lovely recount too.", T("Eid picnics are good trips to write about.")),
    SAY("Start with who, where and when. Then use your pictures.", T("Begin with an opening sentence.")),
    EB("meadow", "An opening",
      SS("Last Friday, my class went to Lahore Zoo.", S("Opening.", ["z", "🏞️", 50, 56, 3, "grow"])),
      SS("First, we got on the bus. I sat by the window.", S("First.", ["b", "🚌", 50, 58, 3])),
      SS("Then we saw a giraffe. I felt amazed.", S("Then.", ["g", "🦒", 50, 54, 3, "float"]))),
    CHK(mc("Which is the best opening sentence?", "Last Friday, we went to Lahore Zoo.", ["Zoo.", "I like cats."], { hint: "Who, where and when?", why: "It says when, who and where.", tag: "write.chk1" })),
    H("Stop 2: Write and check"),
    SAY("Write two sentences for each picture. Use time words and the past tense.", T("Write, check and read aloud.")),
    EB("classroom", "Write and check",
      SS("Write your sentences with a sharp pencil. Start each one with a capital.", S("Write.", ["w", "✏️", 35, 58, 3], ["p", "📄", 72, 58, 3])),
      SS("Check for capital letters and full stops. Fix any mistakes.", S("Check.", ["c", "🔍", 35, 58, 3], ["p", "📄", 72, 58, 3, "pulse"])),
      SS("Read it aloud. Share it with someone and listen to their ideas.", S("Share.", ["r", "🗣️", 35, 56, 3], ["f", "👂", 72, 56, 3]))),
    ACT("Write a recount", ["Your trip plan", "Paper and a pencil", "A grown-up to help"], ["Write an opening sentence.", "Write two sentences for each picture.", "Use first, then and finally.", "Check capital letters and full stops, then read it aloud."]),
    CHK(tf("We should check capital letters and full stops.", true, { hint: "Proofreaders do this.", why: "Checking helps us find mistakes.", tag: "write.chk2" })),
    SAY("Let us remember. Plan, write in order, check, then read aloud and share kindly.", SUM("Plan with pictures", "Write in the past tense with time words", "Check and read aloud")),
    GLOSS({ real: "True, not made up.", opening: "The first sentence of a piece of writing.", proofread: "To check writing for mistakes.", aloud: "Out loud, so people can hear.", feedback: "Kind advice that helps you improve." }),
  ],
  mini: [
    mc("What should an opening sentence say?", "Who, where and when", ["Only a colour", "A song"], { hint: "Think of the zoo opening.", why: "An opening tells who, where and when." }),
    tf("We read our recount aloud to check it.", true, { hint: "We can hear mistakes.", why: "Reading aloud shows mistakes." }),
    mc("Which time word is for the last event?", "Finally", ["First", "Next"], { hint: "It comes at the end.", why: "Finally comes last." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Layla's day at Lahore Zoo", backdrop: "town", caption: "Layla tells her trip to Lahore Zoo in order.",
  scenes: [
    { caption: "Last Friday.", say: "Last Friday, my class went to Lahore Zoo.",
      items: [{ id: "l", emoji: "👧", label: "Layla", x: 28, y: 58, size: 3, enter: "walk_right" }, { id: "z", emoji: "🏞️", x: 72, y: 56, size: 3 }] },
    { caption: "First.", say: "First, we got on the bus. I sat next to my friend.",
      items: [{ id: "b", emoji: "🚌", x: 50, y: 58, size: 3, anim: "bounce" }] },
    { caption: "Then.", say: "Then we saw the giraffes. They ate leaves from the trees.",
      items: [{ id: "g", emoji: "🦒", x: 40, y: 54, size: 3 }, { id: "t", emoji: "🌳", x: 78, y: 54, size: 3 }] },
    { caption: "Next.", say: "Next, we heard a lion roar. I felt a little scared.",
      items: [{ id: "l", emoji: "🦁", x: 50, y: 56, size: 3, anim: "pulse" }] },
    { caption: "Lunch.", say: "After that, we ate lunch on the grass.",
      items: [{ id: "s", emoji: "🥪", x: 35, y: 62, size: 3 }, { id: "g", emoji: "🌿", x: 72, y: 62, size: 3 }] },
    { caption: "The shop.", say: "Later, I bought a small toy elephant.",
      items: [{ id: "e", emoji: "🐘", x: 50, y: 58, size: 3, enter: "pop" }] },
    { caption: "Finally.", say: "Finally, we went home. I was tired but happy.",
      items: [{ id: "h", emoji: "🏠", x: 70, y: 56, size: 3 }, { id: "l", emoji: "👧", x: 30, y: 58, size: 3 }] },
    { caption: "The end.", say: "My recount tells what happened, in order.",
      items: [{ id: "n", emoji: "📝", x: 50, y: 56, size: 3, effect: "sparkle" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- features (q1-q8)
  Q("features", "recall", "recount.meaning", mc("What is a recount?", "A retelling of something that already happened, in order", ["A made-up story about the future", "A list of food"], { hint: "Think about the zoo trip.", why: "A recount tells what happened, in order." }),
    mc("What does a recount do?", "It tells what happened on a day or trip", ["It tells what will happen next year", "It tells a joke"], { hint: "Think about the zoo trip.", why: "A recount tells what already happened." })),
  Q("features", "reason", "recount.every_detail", mc("Sam says a recount must include every single detail. Is he right?", "No, we choose the big moments", ["Yes, even tying a shoelace", "Yes, details are the only thing that matters"], { hint: "Think of key moments.", why: "A recount tells the key moments, not every tiny detail." }),
    mc("Mira says a recount must tell everything that happened all day. Is she right?", "No, we pick the moments that matter", ["Yes, every minute must be written", "Yes, tiny details are the best"], { hint: "Think of key moments.", why: "We choose the most important moments." })),
  Q("features", "recall", "recount.past_word", mc("Which word shows that it already happened?", "walked", ["walk", "walking"], { hint: "Look for ed.", why: "Walked is in the past tense." }),
    mc("Which word is in the past tense?", "ate", ["eat", "eating"], { hint: "It already happened.", why: "Ate is the past tense of eat." })),
  Q("features", "apply", "recount.order_events", ord("Put the events of a trip in order.", ["First we got on the bus", "Then we saw the lions", "Finally we went home"], { hint: "Follow the time words.", why: "First, then, finally show the order." }),
    ord("Put the events of a farm visit in order.", ["First we fed the hens", "Then we milked the goat", "Finally we ate lunch"], { hint: "Follow the time words.", why: "First, then, finally show the order." })),
  Q("features", "apply", "recount.time_words", mat("Match each time word to where it goes.", [["First", "At the start"], ["Then", "In the middle"], ["Finally", "At the end"]], { hint: "Think of an order.", why: "First starts, then continues and finally ends." }),
    mat("Join each time word to its job.", [["Next", "Comes after the first event"], ["Later", "Shows some time has passed"], ["In the end", "Shows the last event"]], { hint: "Think of an order.", why: "Time words show when things happened." })),
  Q("features", "reason", "recount.future", mc("Aisha says a recount is written in the future. Is she right?", "No, a recount tells what already happened", ["Yes, it says what will happen", "Yes, it uses the word will"], { hint: "Think about the zoo trip.", why: "A recount uses the past tense." }),
    mc("Hamza says we write a recount before the trip happens. Is he right?", "No, we write it after, about what already happened", ["Yes, before the trip", "Yes, during sleep"], { hint: "Think about when the events happened.", why: "A recount tells about events that are finished." })),
  Q("features", "apply", "recount.time_tap", hot("Tap the time word.", [["⏱️", "First", 22, 50], ["🦁", "lion", 50, 50], ["🚌", "bus", 78, 50]], ["First"], { labels: true, hint: "It shows order.", why: "First is a time word." }),
    hot("Tap the word that shows order.", [["🦒", "giraffe", 22, 50], ["🥪", "lunch", 50, 50], ["🏁", "Finally", 78, 50]], ["Finally"], { labels: true, hint: "It shows order.", why: "Finally is a time word." })),
  Q("features", "apply", "recount.count_sld", sld("We arrived. We saw lions. We ate lunch. We went home. Slide to show how many events.", { min: 0, max: 8, unit: "events" }, 4, 0, { hint: "Count the sentences.", why: "There are 4 events." }),
    sld("We fed the hens. We milked the goat. We ate lunch. Slide to show how many events.", { min: 0, max: 8, unit: "events" }, 3, 0, { hint: "Count the sentences.", why: "There are 3 events." })),
  // ----- pick (q9-q16)
  Q("pick", "apply", "recount.big_moment", mc("Which is a big moment on a trip to a farm?", "Feeding a baby lamb", ["Finding a pencil in a bag", "Tying a shoelace"], { hint: "Which one would you tell a friend?", why: "Feeding a lamb is special." }),
    mc("Which is a big moment at the zoo?", "Seeing a giraffe eat leaves", ["Dropping a tissue", "Counting my buttons"], { hint: "Which one would you tell a friend?", why: "Seeing a giraffe is special." })),
  Q("pick", "reason", "recount.end_first", mc("Zainab says you can start with the ending. Is she right?", "No, a recount follows the order that things happened", ["Yes, the ending always comes first", "Yes, order does not matter"], { hint: "Think of first, then, finally.", why: "A recount goes in time order." }),
    mc("Ali says we should begin the trip story in the middle. Is he right?", "No, we start at the beginning", ["Yes, middle first", "Yes, any place is fine"], { hint: "Think of time order.", why: "A recount starts at the beginning." })),
  Q("pick", "apply", "recount.missing_time", fill("Add the missing time words.", "{b1} we got on the bus. {b2} we arrived at the zoo.", [["First", "Banana", "Under"], ["Then", "Pencil", "Puddle"]], { hint: "Which words show order?", why: "First and then show the order." }),
    fill("Fill in the time words.", "{b1} we saw the elephants. {b2} we went home.", [["Next", "Table", "Hat"], ["Finally", "Window", "Spoon"]], { hint: "Which words show order?", why: "Next and finally show the order." })),
  Q("pick", "apply", "recount.order_four", ord("Order four moments from a picnic.", ["We packed the food", "We drove to the park", "We ate under a tree", "We went home"], { hint: "Start with packing.", why: "Packing, driving, eating and going home is the order." }),
    ord("Order four moments from a school trip.", ["We lined up", "We walked to the hills", "We had a snack", "We walked back"], { hint: "Start with lining up.", why: "Lining up, walking, snack and walking back is the order." })),
  Q("pick", "apply", "recount.key_ms", ms("Pick the two key moments for a trip. Pick two.", ["We fed the goats", "We saw a baby giraffe"], ["I tied my shoelace twice", "The bus had blue seats"], { hint: "Which are special?", why: "Feeding goats and seeing a baby giraffe are special." }),
    ms("Pick two big moments. Pick two.", ["We heard a lion roar", "We rode a camel"], ["I found a button", "My bag was green"], { hint: "Which are special?", why: "A roaring lion and a camel ride are special." })),
  Q("pick", "reason", "recount.time_words", mc("Omar says time words do not matter. Is he right?", "No, they show the order of events", ["Yes, they can be left out", "Yes, they make writing longer"], { hint: "Think of first, then, finally.", why: "Time words help the reader follow the order." }),
    mc("Layla says first, then and finally only matter in stories. Is she right?", "No, they help in a recount too", ["Yes, only in stories", "Yes, only in poems"], { hint: "Think of the trip plan.", why: "Time words help in a recount." })),
  Q("pick", "apply", "recount.pictures_sld", sld("A plan has 5 pictures. Zainab has drawn 2. Slide to show how many are left to draw.", { min: 0, max: 8, unit: "pictures" }, 3, 0, { hint: "5 take away 2.", why: "5 - 2 = 3 pictures." }),
    sld("A plan has 6 pictures. Aisha has drawn 4. Slide to show how many are left to draw.", { min: 0, max: 8, unit: "pictures" }, 2, 0, { hint: "6 take away 4.", why: "6 - 4 = 2 pictures." })),
  Q("pick", "apply", "recount.opening", mc("Which is the best opening for a recount?", "Last Friday, my class went to Lahore Zoo.", ["Zoo.", "Cats are nice."], { hint: "Who, where and when?", why: "It says when, who and where." }),
    mc("Pick the better opening for a recount.", "Yesterday, my family went to the park for an Eid picnic.", ["Picnic.", "I am tall."], { hint: "Who, where and when?", why: "It says when, who and where." })),
  // ----- tense (q17-q23)
  Q("tense", "apply", "recount.swap_match", mat("Match each word to its past tense.", [["walk", "walked"], ["jump", "jumped"], ["eat", "ate"]], { hint: "Add ed, or change the word.", why: "Walk adds ed, jump adds ed and eat changes to ate." }),
    mat("Join each word to its past tense.", [["play", "played"], ["go", "went"], ["see", "saw"]], { hint: "Add ed, or change the word.", why: "Play adds ed, go becomes went and see becomes saw." })),
  Q("tense", "reason", "recount.yesterday", mc("Layla says I went to the zoo yesterday is present tense. Is she right?", "No, went is the past tense", ["Yes, it is happening now", "Yes, yesterday means now"], { hint: "Did it already happen?", why: "Went and yesterday show the past." }),
    mc("Sana says We saw a giraffe is happening now. Is she right?", "No, saw is the past tense", ["Yes, saw means now", "Yes, giraffes only live now"], { hint: "Did it already happen?", why: "Saw is the past tense." })),
  Q("tense", "recall", "recount.go_st", st("Write the past tense of go.", ["went"], { hint: "It changes a lot.", why: "Go becomes went." }),
    st("Write the past tense of see.", ["saw"], { hint: "It changes a lot.", why: "See becomes saw." })),
  Q("tense", "apply", "recount.tense_tf", tf("We saw the elephants yesterday is in the past tense.", true, { hint: "Did it already happen?", why: "Saw and yesterday show the past." }),
    tf("We eat lunch yesterday is correct.", false, { hint: "Yesterday needs the past.", why: "It should be we ate lunch yesterday." })),
  Q("tense", "reason", "recount.no_we", mc("Sam says we is not used in recounts. Is he right?", "No, we can say we when it happened to a group", ["Yes, only I is allowed", "Yes, we is for questions"], { hint: "Think of a class trip.", why: "A recount can use I or we." }),
    mc("Aisha says a recount cannot say we. Is she right?", "No, we is fine for a trip with others", ["Yes, only he and she", "Yes, only they"], { hint: "Think of a class trip.", why: "We shows the writer and others." })),
  Q("tense", "apply", "recount.tense_fill", fill("Finish with the past tense.", "Yesterday we {b1} to the zoo and {b2} a lion.", [["went", "go", "going"], ["saw", "see", "seeing"]], { hint: "Use the past.", why: "Went and saw are past tense." }),
    fill("Complete with past tense words.", "Last week we {b1} a picnic and {b2} sandwiches.", [["had", "have", "having"], ["ate", "eat", "eating"]], { hint: "Use the past.", why: "Had and ate are past tense." })),
  Q("tense", "apply", "recount.past_ms", ms("Pick the two past tense words. Pick two.", ["jumped", "ate"], ["walk", "see"], { hint: "They already happened.", why: "Jumped and ate are past tense." }),
    ms("Pick two past tense words. Pick two.", ["played", "went"], ["jump", "run"], { hint: "They already happened.", why: "Played and went are past tense." })),
  // ----- write (q24-q30)
  Q("write", "reason", "recount.feelings", mc("Aisha says feelings do not belong in a recount. Is she right?", "No, a recount can say how you felt", ["Yes, feelings are never allowed", "Yes, only facts are allowed"], { hint: "I felt amazed.", why: "A recount can include feelings." }),
    mc("Sam says a recount must never say I felt happy. Is he right?", "No, feelings make a recount more interesting", ["Yes, feelings are banned", "Yes, only places can be named"], { hint: "Think of the zoo.", why: "Feelings can be part of a recount." })),
  Q("write", "reason", "recount.no_check", mc("Omar says there is no need to check your writing. Is he right?", "No, checking finds mistakes", ["Yes, writing is always perfect", "Yes, checking wastes time"], { hint: "What do proofreaders do?", why: "Checking helps us fix mistakes." }),
    mc("Mira says we should never read our work aloud. Is she right?", "No, reading aloud helps us hear mistakes", ["Yes, silence is best", "Yes, aloud hides mistakes"], { hint: "How do we hear a missing word?", why: "Reading aloud helps us find mistakes." })),
  Q("write", "apply", "recount.feel_st", st("Write a feeling word to finish: I felt ___ when the lion roared.", ["excited", "scared", "amazed", "nervous", "surprised", "afraid"], { hint: "How might you feel?", why: "Feeling words tell how the writer felt." }),
    st("Write a feeling word to finish: I felt ___ when we ate lunch.", ["happy", "hungry", "pleased", "full", "relaxed", "glad"], { hint: "How might you feel?", why: "Feeling words tell how the writer felt." })),
  Q("write", "apply", "recount.write_steps", ord("Put the writing steps in order.", ["Plan with pictures", "Write the opening", "Write the middle", "Check and read aloud"], { hint: "Plan first.", why: "We plan, write, then check." }),
    ord("Put the recount steps in order.", ["Choose a trip", "Draw the moments", "Write sentences", "Share it kindly"], { hint: "Choose first.", why: "We choose, draw, write, then share." })),
  Q("write", "apply", "recount.capital_tap", hot("Tap the sentence written correctly.", [["1️⃣", "we saw a zebra.", 22, 50], ["2️⃣", "We saw a zebra.", 50, 50], ["3️⃣", "We saw a zebra", 78, 50]], ["We saw a zebra."], { labels: true, hint: "Capital letter and full stop.", why: "A sentence starts with a capital and ends with a full stop." }),
    hot("Tap the correct sentence.", [["1️⃣", "Then we ate lunch.", 22, 50], ["2️⃣", "then we ate lunch.", 50, 50], ["3️⃣", "Then we ate lunch", 78, 50]], ["Then we ate lunch."], { labels: true, hint: "Capital letter and full stop.", why: "A sentence starts with a capital and ends with a full stop." })),
  Q("write", "apply", "recount.edit_fill", fill("Finish the editing rule.", "Every sentence starts with a {b1} and ends with a {b2}.", [["capital letter", "small letter", "picture"], ["full stop", "comma", "capital"]], { hint: "Proofreaders check this.", why: "Sentences start with a capital letter and end with a full stop." }),
    fill("Complete the editing rule.", "The name of a place starts with a {b1} letter, like {b2}.", [["capital", "small", "wavy"], ["Lahore", "lahore", "zoo"]], { hint: "Names get capitals.", why: "Places start with a capital, like Lahore." })),
  Q("write", "apply", "recount.share_tf", tf("When we share our recount, we can say one thing we liked.", true, { hint: "Be kind.", why: "Kind feedback helps us improve." }),
    tf("When we share, we should say that the writing is bad.", false, { hint: "Be kind.", why: "We share kindly and helpfully." })),
];

export const topics = [
  topicLesson({
    slug: "english-class-1-writing-a-recount", subject: "english", cls: 1, topic: 6, title: "Writing a Recount: Our Trip",
    summary: "Plan and write a recount of a trip in time order, using I and the past tense.",
    unit: "Topic 6: Writing a recount", difficulty: 1,
    objectives: ["Say what a recount is", "Plan the key moments in order", "Write four to six sentences in the past tense"],
    success_criteria: ["I can say what a recount is", "I can plan my trip in order", "I can write sentences in the past tense"],
    real_life: "A trip to Lahore Zoo or the Margalla Hills, a UK farm visit, or an Eid picnic with family.",
    standards: [NC("Y2 writing", "Write narratives about personal experiences, in the correct tense, with capital letters and full stops; plan and read aloud writing")],
    warm_up: [
      mc("Which word shows something already happened?", "walked", ["walk", "walks"], { hint: "It ends in ed.", why: "Walked is the past tense." }),
      tf("A sentence starts with a capital letter.", true, { hint: "Look at the first letter.", why: "Every sentence starts with a capital." }),
      mc("Which time word comes first?", "First", ["Finally", "Last"], { hint: "It starts the order.", why: "First comes at the start." }),
    ],
    intro: [],
    subs: [features, pick, tense, write],
    clip,
    quiz,
  }),
];
