import { SAY, SS, H, T, PHOTO, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, mc, ms, tf, ord, mat, fill, hot, sld, st } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC } from "./_science-kit.mjs";

// English Class 1, topic 7: Dear Diary (Zainab, age 7).
const NOTEBOOK = "english-class-1-dear-diary-1-7d92ab0b.jpg";
const PEN = "english-class-1-dear-diary-2-2761f39c.jpg";

// ---------------------------------------------------------------------------------------------- 1. learn
const what = {
  id: "what", kind: "learn", title: "What is a diary?",
  blocks: [
    H("Welcome back, young writer!"),
    SAY("Today we meet the diary. What is it, and what goes inside?", T("Today's big question: what goes in a diary?")),
    SAY("This empty notebook is ready for a diary entry. Someone will fill it soon.", PHOTO(NOTEBOOK, "An open lined notebook with a pen lying on the page and pencils on a wooden desk", "A diary is a notebook where you write about your own days.", "Photo by Clay Banks on Unsplash")),
    H("Stop 1: A personal book"),
    SAY("A diary is a book about you. You write about your own days.", T("A **diary** is a personal book about your own days.")),
    SAY("Famous people kept diaries too. Florence Nightingale wrote about caring for others.", T("People write diaries to remember.")),
    SAY("Abdul Sattar Edhi also cared for others in Pakistan. Many people wrote about his kindness.", T("Caring people are remembered.")),
    EB("home", "A diary",
      SS("A diary is private. You choose who reads it.", S("Private.", ["d", "📔", 40, 58, 3], ["k", "🔒", 75, 52, 2, "pulse"])),
      SS("You can write about happy days. You can write about sad days too.", S("Any kind of day.", ["h", "😀", 30, 58, 3], ["s", "😢", 72, 58, 3])),
      SS("A diary helps you remember. You can read it years later.", S("Remember.", ["d", "📔", 50, 58, 3, "grow"]))),
    CHK(mc("What is a diary?", "A personal book about your own days", ["A shopping list", "A story about a king"], { hint: "It is about you.", why: "A diary is a personal book where you write about your days.", tag: "what.chk1" })),
    H("Stop 2: Features of an entry"),
    SAY("Each entry starts with the date. Then we write Dear Diary.", T("An **entry** starts with the date and Dear Diary.")),
    EB("home", "An entry",
      SS("First, the date. Friday the fifth of May.", S("The date.", ["d", "📅", 50, 56, 3, "grow"])),
      SS("Then, Dear Diary. I write to my diary like a friend.", S("Dear Diary.", ["d", "📔", 50, 58, 3, "pulse"])),
      SS("I write in the past tense. I went, I saw, I felt.", S("Past and I.", ["z", "👧", 30, 58, 3], ["w", "✏️", 72, 58, 3, "bounce"]))),
    CHK(tf("A diary entry starts with the date.", true, { hint: "Think of the top of the page.", why: "Entries begin with the date.", tag: "what.chk2" })),
    SAY("Let us remember. A diary is personal. Entries have a date, I, the past tense and feelings.", SUM("A diary is a personal book", "An entry has a date and Dear Diary", "We use I, the past tense and feelings")),
    GLOSS({ diary: "A personal book where you write about your own days.", entry: "One piece of writing in a diary for one day.", date: "The day, month and year.", private: "Only for you, unless you choose to share.", feelings: "How you feel inside, like happy or sad.", "first person": "Writing with I, as if you are telling it." }),
  ],
  mini: [
    mc("What goes at the top of a diary entry?", "The date", ["A recipe", "A picture of a cat"], { hint: "It tells us which day.", why: "An entry starts with the date." }),
    tf("A diary is for everyone to read.", false, { hint: "It is personal.", why: "A diary is private." }),
    mc("Which tense does a diary use?", "The past tense", ["The future tense", "No tense at all"], { hint: "It tells what happened.", why: "A diary entry tells what already happened." }),
    mc("Which word starts most diary entries?", "Dear", ["Banana", "Under"], { hint: "Dear Diary.", why: "Many entries begin Dear Diary." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const plan = {
  id: "plan", kind: "try", title: "Plan an entry",
  blocks: [
    H("Stop 1: What happened first?"),
    SAY("Plan before you write. First, think what happened.", T("A plan lists what happened, in order.")),
    EB("kitchen", "Zainab's evening",
      SS("Zainab helped Nani cook for Eid. She washed the rice first.", S("First.", ["z", "👧", 25, 58, 3], ["r", "🍚", 72, 62, 3])),
      SS("Then she stirred the pot of biryani. It smelled wonderful.", S("Then.", ["p", "🍲", 40, 58, 3], ["s", "🥄", 75, 52, 2, "bounce"])),
      SS("At last, the family sat down to eat. Everyone smiled.", S("At last.", ["f", "👨‍👩‍👧", 50, 56, 3, "pulse"]))),
    CHK(ord("Put what happened in order.", ["Zainab washed the rice", "She stirred the pot", "The family ate together"], { hint: "Follow first, then, last.", why: "She washed, stirred, then the family ate.", tag: "plan.chk1" })),
    H("Stop 2: How did I feel?"),
    SAY("A diary also says how you felt. This is what makes it personal.", PHOTO(PEN, "A silver pen resting on an open notebook on a wooden desk", "A pen waits to write about a day and how it felt.", "Photo by Zoran Borojevic on Unsplash")),
    SAY("Add a feeling to each part. I felt happy. I felt proud.", T("Write a **feeling** sentence for each part.")),
    SAY("Now sort the feelings. Are they happy or sad?", MAN("Happy or sad?", "Move each feeling word. Cheerful ones go in Happy. Gloomy ones go in Sad.", "😀", 8, ["Happy", "Sad"])),
    ACT("Plan an entry", ["Paper and a pencil", "A grown-up to help"], ["Choose a day you remember.", "Write three things that happened, in order.", "Write a feeling word beside each one."]),
    CHK(mc("Which sentence says how Zainab felt?", "I felt proud of my biryani.", ["I washed the rice.", "The pot was hot."], { hint: "Look for I felt.", why: "I felt proud says how she felt.", tag: "plan.chk2" })),
    SAY("Let us remember. Plan what happened and how you felt.", SUM("List what happened in order", "Add a feeling to each part", "Choose a day you remember")),
    GLOSS({ plan: "A way to get ready before writing.", feeling: "How you feel inside, like happy, sad or proud.", proud: "Very pleased about something you did.", biryani: "A tasty dish made with rice, spices and meat or vegetables.", "at last": "After a long time." }),
  ],
  mini: [
    mc("What do we do before writing an entry?", "Plan what happened", ["Close the book", "Hide the pen"], { hint: "Think of the plan.", why: "A plan helps us get ready." }),
    tf("A diary says how you felt.", true, { hint: "It is personal.", why: "A diary includes feelings." }),
    mc("Which word below is a feeling?", "proud", ["rice", "pot"], { hint: "It is inside you.", why: "Proud is a feeling." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const feel = {
  id: "feel", kind: "play", title: "Feeling words",
  blocks: [
    H("Stop 1: Pick the best word"),
    SAY("Happy is a good word. But there are better ones. Glad, joyful and delighted are happy words.", T("Different feeling words say different things.")),
    EB("classroom", "Feeling words",
      SS("Glad and joyful are happy words. Delighted means very happy.", S("Happy words.", ["h", "😄", 50, 56, 3, "bounce"])),
      SS("Gloomy and tearful are sad words. Heartbroken means very sad.", S("Sad words.", ["s", "😢", 50, 56, 3])),
      SS("Nervous and scared are worry words. We feel them before something big.", S("Worry words.", ["n", "😰", 50, 56, 3, "pulse"]))),
    CHK(mc("Which word means very happy?", "delighted", ["gloomy", "nervous"], { hint: "It is a very happy word.", why: "Delighted means very happy.", tag: "feel.chk1" })),
    H("Stop 2: Brain game"),
    SAY("Warm up your memory. Watch the feelings light up, then copy them.", T("Play the game, then answer a question.")),
    SAY("Watch the order closely. Then copy it.", BRAIN("remember_order", "Feeling faces", "Watch the order, then copy it. It gets longer each time!", ["😄", "😢", "😰", "😍"])),
    CHK(ms("Pick two happy words.", ["glad", "joyful"], ["gloomy", "tearful"], { hint: "Think of smiling.", why: "Glad and joyful are happy words.", tag: "feel.chk2" })),
    SAY("Let us remember. Pick feeling words that match the day. Use different ones.", SUM("Happy words: glad, joyful, delighted", "Sad words: gloomy, tearful", "Different words say different things")),
    GLOSS({ delighted: "Very happy.", gloomy: "Sad and heavy.", nervous: "A little worried about what will happen.", joyful: "Full of happiness.", heartbroken: "Very, very sad." }),
  ],
  mini: [
    mc("Which word is a sad word?", "gloomy", ["glad", "joyful"], { hint: "It feels heavy.", why: "Gloomy means sad." }),
    tf("Delighted is a sad word.", false, { hint: "It means very happy.", why: "Delighted means very happy." }),
    mc("Which word tells us someone is worried?", "nervous", ["joyful", "delighted"], { hint: "Think of a big day.", why: "Nervous means a little worried." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const two = {
  id: "two", kind: "use", title: "Write two entries",
  blocks: [
    H("Stop 1: The first entry"),
    SAY("Now we write two diary entries. They tell about two parts of one day.", T("Write two **linked** entries.")),
    SAY("In Pakistan, many families cook and share food in Ramadan. That makes a lovely entry.", T("Ramadan evenings are good diary days.")),
    SAY("In the UK, you might write about a rainy walk with family.", T("Any kind of day can be a diary entry.")),
    SAY("Begin with the date. Then write Dear Diary and what happened first.", T("Start the first entry.")),
    EB("home", "Entry one",
      SS("Friday 5 May. Dear Diary, today I helped Nani cook.", S("Opening.", ["z", "👧", 30, 58, 3], ["n", "👵", 72, 58, 3])),
      SS("First, I washed the rice. I felt proud to help.", S("What happened.", ["r", "🍚", 40, 60, 3], ["h", "😊", 75, 50, 2, "bounce"])),
      SS("Then I stirred the pot. It smelled delicious.", S("Then.", ["p", "🍲", 50, 58, 3, "pulse"]))),
    CHK(mc("Which is the best start to an entry?", "Friday 5 May. Dear Diary, today I helped Nani.", ["Cooking.", "Rice pot."], { hint: "Date, Dear Diary, what happened.", why: "It starts with the date and Dear Diary.", tag: "two.chk1" })),
    H("Stop 2: The second entry"),
    SAY("The second entry follows the first. It tells what happened next.", T("The second entry continues the day.")),
    EB("home", "Entry two",
      SS("That evening, we all sat down to eat. The biryani tasted wonderful.", S("Later.", ["f", "👨‍👩‍👧", 50, 56, 3, "pulse"])),
      SS("I felt delighted. Everyone said thank you to Nani and me.", S("A feeling.", ["z", "😊", 50, 56, 3, "bounce"])),
      SS("Before bed, I closed my diary. It was a lovely day.", S("The end.", ["d", "📔", 40, 58, 3], ["m", "🌙", 75, 30, 2, "float"]))),
    ACT("Write two entries", ["Your plan", "A notebook", "A grown-up to help"], ["Write the date and Dear Diary.", "Tell what happened first and how you felt.", "Write a second entry for later that day.", "Check capital letters and full stops, then read aloud."]),
    CHK(tf("The second entry tells what happened next.", true, { hint: "It follows the first.", why: "The second entry continues the day.", tag: "two.chk2" })),
    SAY("Let us remember. Date, Dear Diary, what happened and how you felt. Check and read aloud.", SUM("Start with the date and Dear Diary", "Tell what happened and how you felt", "Check and read aloud, then share with permission")),
    GLOSS({ linked: "Joined, one after the other.", entry: "One piece of writing in a diary.", permission: "A yes from someone before you do something.", share: "Let someone else read or hear.", ramadan: "The holy month when Muslims fast from dawn to sunset." }),
  ],
  mini: [
    mc("What should an entry start with?", "The date", ["A joke", "The page number"], { hint: "Which day is it?", why: "An entry starts with the date." }),
    tf("We share our diary only with permission.", true, { hint: "A diary is private.", why: "We share only if the writer says yes." }),
    mc("What does the second entry do?", "Tells what happened next", ["Repeats the first", "Tells a made-up story"], { hint: "It continues the day.", why: "The second entry continues the day." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Zainab's Eid diary", backdrop: "kitchen", caption: "Zainab writes about helping Nani cook for Eid.",
  scenes: [
    { caption: "A busy kitchen.", say: "Today I helped Nani cook for Eid.",
      items: [{ id: "z", emoji: "👧", label: "Zainab", x: 28, y: 58, size: 3 }, { id: "n", emoji: "👵", x: 72, y: 58, size: 3 }] },
    { caption: "The rice.", say: "First, I washed the rice in cold water.",
      items: [{ id: "r", emoji: "🍚", x: 50, y: 60, size: 3, anim: "bounce" }] },
    { caption: "The pot.", say: "Then I stirred the big pot. It smelled delicious.",
      items: [{ id: "p", emoji: "🍲", x: 50, y: 58, size: 3, anim: "pulse" }] },
    { caption: "A feeling.", say: "I felt proud. Nani said I helped so much.",
      items: [{ id: "z", emoji: "😊", x: 50, y: 56, size: 3, effect: "hearts" }] },
    { caption: "Dear Diary.", say: "That night, I opened my diary and wrote the date.",
      items: [{ id: "d", emoji: "📔", x: 40, y: 58, size: 3 }, { id: "c", emoji: "📅", x: 75, y: 58, size: 2 }] },
    { caption: "Writing.", say: "Dear Diary, today was wonderful. I felt delighted.",
      items: [{ id: "w", emoji: "✏️", x: 40, y: 58, size: 3, anim: "bounce" }, { id: "d", emoji: "📔", x: 72, y: 58, size: 3 }] },
    { caption: "Checking.", say: "I checked my capitals and full stops. Then I read it aloud.",
      items: [{ id: "c", emoji: "🔍", x: 40, y: 58, size: 3 }, { id: "s", emoji: "🗣️", x: 75, y: 50, size: 2 }] },
    { caption: "Goodnight.", say: "I closed my diary. It is my private book.",
      items: [{ id: "d", emoji: "📔", x: 40, y: 58, size: 3 }, { id: "k", emoji: "🔒", x: 70, y: 52, size: 2, effect: "sparkle" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- what (q1-q8)
  Q("what", "recall", "diary.meaning", mc("Why do people keep a diary?", "To remember their days and feelings", ["To sell it in a shop", "To tell the whole class"], { hint: "It is personal.", why: "People keep a diary to remember." }),
    mc("What is a diary used for?", "Writing about your own days", ["Finding the way", "Learning to count"], { hint: "It is personal.", why: "A diary is for your own days." })),
  Q("what", "reason", "diary.sad_days", mc("Sam says a diary is only for sad days. Is he right?", "No, you can write about any kind of day", ["Yes, only sad days count", "Yes, happy days are not allowed"], { hint: "Think of Zainab and Eid.", why: "A diary can hold happy and sad days." }),
    mc("Hana says a diary is only for birthdays. Is she right?", "No, you can write about any day", ["Yes, only birthdays count", "Yes, other days are boring"], { hint: "Think of an ordinary day.", why: "A diary can tell about any day." })),
  Q("what", "reason", "diary.future", mc("Aisha says a diary is written in the future. Is she right?", "No, a diary tells what already happened", ["Yes, it says what will happen", "Yes, it uses the word will"], { hint: "Think of I went and I saw.", why: "A diary uses the past tense." }),
    mc("Ali says we write a diary entry before the day happens. Is he right?", "No, we write it after, about what happened", ["Yes, before the day", "Yes, in the morning only"], { hint: "Think of past tense.", why: "We write about events that are finished." })),
  Q("what", "recall", "diary.first_st", st("What one-letter word do we use to write about ourselves?", ["I", "i"], { hint: "It is a capital letter.", why: "We use I in a diary." }),
    st("What two-letter word do we use for ourselves and others?", ["we", "We"], { hint: "It starts with w.", why: "We means the writer and others." })),
  Q("what", "apply", "diary.feelings_tf", tf("A diary can say how you felt.", true, { hint: "It is personal.", why: "Diaries include feelings." }),
    tf("A diary should never say how you felt.", false, { hint: "It is personal.", why: "Feelings belong in a diary." })),
  Q("what", "reason", "diary.everyone", mc("Layla says everyone must read your diary. Is she right?", "No, a diary is private", ["Yes, it is for everyone", "Yes, the teacher must read it"], { hint: "Think about privacy.", why: "You choose who reads your diary." }),
    mc("Zara says it is fine to read someone's diary without asking. Is she right?", "No, we only read it if they say yes", ["Yes, it is fine", "Yes, diaries have no owner"], { hint: "Think about permission.", why: "A diary is private. We ask first." })),
  Q("what", "apply", "diary.date_tap", hot("Tap the date in this diary entry.", [["📅", "Friday 5 May", 22, 50], ["🐕", "dog", 50, 50], ["😀", "happy", 78, 50]], ["Friday 5 May"], { labels: true, hint: "It shows the day.", why: "Friday 5 May is the date." }),
    hot("Tap the opening of an entry.", [["📔", "Dear Diary", 22, 50], ["🐕", "dog", 50, 50], ["🍚", "rice", 78, 50]], ["Dear Diary"], { labels: true, hint: "It greets the diary.", why: "Dear Diary starts an entry." })),
  Q("what", "apply", "diary.who_reads", mc("Who should read your diary?", "Only you, or someone you choose", ["Anybody who finds it", "The whole street"], { hint: "It is private.", why: "A diary is private." }),
    mc("When can you share your diary?", "When you say yes", ["When anyone asks", "Never, not even to you"], { hint: "Think about permission.", why: "We share when we choose to." })),
  // ----- plan (q9-q16)
  Q("plan", "reason", "diary.dates", mc("Zainab says dates do not matter in a diary. Is she right?", "No, the date shows which day you wrote about", ["Yes, dates are never needed", "Yes, only the title matters"], { hint: "Think about reading it later.", why: "The date helps us remember when it happened." }),
    mc("Omar says you can leave out the date. Is he right?", "No, the date tells when it happened", ["Yes, never write one", "Yes, dates are only for homework"], { hint: "Think about years later.", why: "Dates help us remember the day." })),
  Q("plan", "apply", "diary.order", ord("Put the day's events in order.", ["I woke up", "I went to school", "I played with my friend", "I did my homework"], { hint: "Start with waking up.", why: "Waking, school, play, homework." }),
    ord("Put the evening in order.", ["I ate dinner", "I washed my hands", "I read a book", "I went to bed"], { hint: "Start with dinner.", why: "Dinner, washing, book, bed." })),
  Q("plan", "apply", "diary.fill_feeling", fill("Finish the diary sentences.", "Dear Diary, I {b1} to the market. I felt {b2}.", [["went", "go", "going"], ["excited", "table", "pencil"]], { hint: "Use the past tense and a feeling.", why: "Went is past tense and excited is a feeling." }),
    fill("Complete the diary lines.", "Dear Diary, we {b1} a picnic. I felt {b2}.", [["had", "have", "having"], ["happy", "window", "spoon"]], { hint: "Use the past tense and a feeling.", why: "Had is past tense and happy is a feeling." })),
  Q("plan", "apply", "diary.feeling_word", mc("Which word shows a feeling?", "proud", ["pencil", "table"], { hint: "It is inside you.", why: "Proud is a feeling." }),
    mc("Which word is a feeling word?", "nervous", ["window", "carpet"], { hint: "It is inside you.", why: "Nervous is a feeling." })),
  Q("plan", "reason", "diary.no_feelings", mc("Omar says a diary should not have feelings. Is he right?", "No, feelings make a diary personal", ["Yes, only facts are allowed", "Yes, feelings are banned"], { hint: "Think about Zainab's entry.", why: "Feelings are what make a diary personal." }),
    mc("Layla says a diary entry should be only a list of facts. Is she right?", "No, we also say how we felt", ["Yes, facts only", "Yes, never say how you felt"], { hint: "Think about I felt.", why: "A diary includes feelings." })),
  Q("plan", "apply", "diary.entry_parts", ms("Pick two things that belong in an entry.", ["The date", "How I felt"], ["A shopping list", "A recipe"], { hint: "Think of an entry.", why: "An entry has a date and feelings." }),
    ms("Pick two parts of a diary entry.", ["Dear Diary", "What happened"], ["A song", "A maths sum"], { hint: "Think of an entry.", why: "An entry has Dear Diary and what happened." })),
  Q("plan", "apply", "diary.words_sld", sld("I felt happy because I saw Nani. Slide to show how many words are in the sentence.", { min: 0, max: 12, unit: "words" }, 7, 0, { hint: "Count every word.", why: "There are 7 words." }),
    sld("Today I went to the park. Slide to show how many words are in the sentence.", { min: 0, max: 12, unit: "words" }, 6, 0, { hint: "Count every word.", why: "There are 6 words." })),
  Q("plan", "apply", "diary.event_match", mat("Match each event to a feeling that fits.", [["I got a new toy", "happy"], ["I lost my kite", "sad"], ["I heard loud thunder", "scared"]], { hint: "How would you feel?", why: "Each event matches a feeling." }),
    mat("Join each event to a feeling that fits.", [["I won a prize", "proud"], ["I fell and hurt my knee", "sore"], ["I waited for a big test", "nervous"]], { hint: "How would you feel?", why: "Each event matches a feeling." })),
  // ----- feel (q17-q23)
  Q("feel", "apply", "diary.sentences_sld", sld("Zainab wrote 3 sentences on Monday and 4 on Tuesday. Slide to show how many sentences in all.", { min: 0, max: 10, unit: "sentences" }, 7, 0, { hint: "3 + 4.", why: "3 + 4 = 7 sentences." }),
    sld("Hamza wrote 5 sentences and then 3 more. Slide to show how many sentences in all.", { min: 0, max: 10, unit: "sentences" }, 8, 0, { hint: "5 + 3.", why: "5 + 3 = 8 sentences." })),
  Q("feel", "reason", "diary.same_word", mc("Sam says using the same word for every feeling is best. Is he right?", "No, different feeling words say different things", ["Yes, happy is enough for everything", "Yes, one word is neater"], { hint: "Glad, joyful, delighted.", why: "Different words show different feelings." }),
    mc("Mira says we should only use the word nice. Is she right?", "No, stronger words say more", ["Yes, nice is best", "Yes, never use other words"], { hint: "Think of delighted.", why: "Better words paint a clearer picture." })),
  Q("feel", "apply", "diary.happy_ms", ms("Which two words are happy words? Pick two.", ["glad", "joyful"], ["gloomy", "tearful"], { hint: "Think of smiling.", why: "Glad and joyful are happy words." }),
    ms("Pick the two happy words.", ["delighted", "cheerful"], ["heartbroken", "gloomy"], { hint: "Think of smiling.", why: "Delighted and cheerful are happy words." })),
  Q("feel", "apply", "diary.word_match", mat("Match each word to happy or sad.", [["glad", "happy"], ["gloomy", "sad"], ["delighted", "happy"]], { hint: "Which one feels light?", why: "Glad and delighted are happy. Gloomy is sad." }),
    mat("Join each word to happy or sad.", [["joyful", "happy"], ["tearful", "sad"], ["cheerful", "happy"]], { hint: "Which one feels light?", why: "Joyful and cheerful are happy. Tearful is sad." })),
  Q("feel", "reason", "diary.he_she", mc("Aisha says a diary uses he and she. Is she right?", "No, a diary uses I, because you are the writer", ["Yes, always he and she", "Yes, a diary is about other people"], { hint: "Who is writing?", why: "A diary uses I because it is about you." }),
    mc("Omar says a diary should say Zainab did this and that. Is he right?", "No, you write I did this and that", ["Yes, use names for yourself", "Yes, write as a stranger"], { hint: "You are the writer.", why: "A diary uses I." })),
  Q("feel", "apply", "diary.so_fill", fill("Join the ideas with so.", "I felt tired, {b1} I went to bed early. I was thirsty, {b2} I drank some water.", [["so", "but", "or"], ["so", "but", "or"]], { hint: "One thing happened because of the other.", why: "So shows a result." }),
    fill("Use so to join ideas.", "It was raining, {b1} I took an umbrella. I was cold, {b2} I wore a coat.", [["so", "but", "or"], ["so", "but", "or"]], { hint: "One thing happened because of the other.", why: "So shows a result." })),
  Q("feel", "apply", "diary.tense_tf", tf("Delighted and glad are both happy words.", true, { hint: "Think of smiling.", why: "Both mean happy." }),
    tf("Gloomy is a very happy word.", false, { hint: "Think of how gloomy feels.", why: "Gloomy means sad." })),
  // ----- two (q24-q30)
  Q("two", "apply", "diary.steps_ord", ord("Put the writing steps in order.", ["Write the date", "Write Dear Diary", "Tell what happened", "Say how you felt"], { hint: "Date first.", why: "Date, Dear Diary, what happened, feelings." }),
    ord("Put the entry steps in order.", ["Plan the day", "Write the entry", "Check the punctuation", "Read it aloud"], { hint: "Plan first.", why: "Plan, write, check, read aloud." })),
  Q("two", "reason", "diary.long_day", mc("Omar says you cannot write about a long day. Is he right?", "No, you choose the key parts and write them", ["Yes, only short days work", "Yes, long days are secret"], { hint: "We pick key moments.", why: "You can pick the big moments of a long day." }),
    mc("Layla says a diary entry must tell every minute. Is she right?", "No, we choose what mattered most", ["Yes, every minute", "Yes, even the tiny details"], { hint: "Think of key moments.", why: "We write the parts that mattered." })),
  Q("two", "apply", "diary.punct_tap", hot("Tap the correct sentence.", [["1️⃣", "i felt happy.", 22, 50], ["2️⃣", "I felt happy.", 50, 50], ["3️⃣", "I felt happy", 78, 50]], ["I felt happy."], { labels: true, hint: "Capital letter and full stop.", why: "A sentence starts with a capital and ends with a full stop." }),
    hot("Tap the sentence with the right punctuation.", [["1️⃣", "We cooked rice", 22, 50], ["2️⃣", "we cooked rice.", 50, 50], ["3️⃣", "We cooked rice.", 78, 50]], ["We cooked rice."], { labels: true, hint: "Capital letter and full stop.", why: "A sentence starts with a capital and ends with a full stop." })),
  Q("two", "apply", "diary.both_mc", mc("Which sentence tells what happened and how you felt?", "I won the race and I felt proud.", ["I won the race.", "I felt proud."], { hint: "It needs both.", why: "It says what happened and how you felt." }),
    mc("Pick the line that says what happened and how you felt.", "I fell off my bike and I felt sore.", ["I fell off my bike.", "I felt sore."], { hint: "It needs both.", why: "It says what happened and how you felt." })),
  Q("two", "recall", "diary.feeling_st", st("Write a feeling word to finish: I got a gold star and I felt ___.", ["proud", "happy", "delighted", "pleased", "excited", "glad"], { hint: "How would you feel?", why: "Proud, happy and pleased all show how you felt." }),
    st("Write a feeling word to finish: I lost my kite and I felt ___.", ["sad", "gloomy", "upset", "disappointed", "unhappy", "tearful"], { hint: "How would you feel?", why: "Sad and upset show how you felt." })),
  Q("two", "apply", "diary.share_tf", tf("We share a diary entry only if we want to.", true, { hint: "A diary is private.", why: "We share a diary only with permission." }),
    tf("Anyone may read your diary without asking.", false, { hint: "A diary is private.", why: "We should ask permission first." })),
  Q("two", "apply", "diary.check_fill", fill("Finish the checking rule.", "Every sentence starts with a {b1} and ends with a {b2}.", [["capital letter", "small letter", "picture"], ["full stop", "comma", "capital"]], { hint: "Proofreaders check this.", why: "Sentences start with a capital letter and end with a full stop." }),
    fill("Complete the checking rule.", "My name Zainab starts with a {b1} letter. The date, such as Friday, also starts with a {b2} letter.", [["capital", "small", "wavy"], ["capital", "small", "round"]], { hint: "Names and days start with capitals.", why: "Names and days begin with capital letters." })),
];

export const topics = [
  topicLesson({
    slug: "english-class-1-dear-diary", subject: "english", cls: 1, topic: 7, title: "Dear Diary",
    summary: "Write a short diary entry that tells what happened and how you felt.",
    unit: "Topic 7: Dear Diary", difficulty: 1,
    objectives: ["Say what a diary is for", "Use I, the past tense and feeling words", "Write two linked diary entries"],
    success_criteria: ["I can say what a diary is for", "I can use I, the past tense and a feeling", "I can write two entries"],
    real_life: "A Ramadan evening diary, helping Nani cook for Eid, or a rainy walk in the UK.",
    standards: [NC("Y2 writing", "Write about real events, in the correct tense, with capital letters and full stops; say what to write and read it aloud")],
    warm_up: [
      mc("Which word tells us it already happened?", "went", ["go", "going"], { hint: "It is the past.", why: "Went is the past tense." }),
      tf("A sentence starts with a capital letter.", true, { hint: "Look at the first letter.", why: "Every sentence starts with a capital." }),
      mc("Which word names a feeling?", "happy", ["table", "pen"], { hint: "It is inside you.", why: "Happy is a feeling." }),
    ],
    intro: [],
    subs: [what, plan, feel, two],
    clip,
    quiz,
  }),
];
