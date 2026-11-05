import { SAY, SS, H, T, IMG, ACT, BRAIN, SUM, CHK, S, EXP, GLOSS, REVEAL, mc, ms, tf, st, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// English topic 3 for Zainab (Class 1): Stories and poems. Standards from docs/CURRICULUM_V2.md section 3 (NC Year 2 reading, Cambridge Stage 2).
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });

const story = {
  id: "story", kind: "learn", title: "A folk tale: beginning, middle and end",
  blocks: [
    H("Stop 1: The three parts of a story"),
    SAY("Every story has three parts. The beginning is where we meet the characters and the place. The middle is where the problem happens and the characters try to fix it. The end is where the problem is solved. Think of a sandwich: bread, filling, bread. Let's hear an old tale, The Thirsty Crow, and spot the three parts.", T("Every story has a **beginning**, a **middle** and an **end**.", "Beginning: meet the characters. Middle: the problem. End: it is solved.")),
    EXPP("The Thirsty Crow",
      SS("The beginning. A hot day. A crow is very thirsty. He finds a jug with only a little water at the bottom.", S("Beginning: a thirsty crow finds a jug.", ["c", "🐦‍⬛", 30, 50, 3, "grow", "thirsty crow"], ["j", "🏺", 70, 55, 3, "grow", "jug"])),
      SS("The middle. The crow cannot reach the water. He has a clever idea. He drops pebbles into the jug, one by one.", S("Middle: he drops in pebbles.", ["c", "🐦‍⬛", 30, 40, 3, "bounce", "crow"], ["j", "🏺", 70, 55, 3, "none", "jug"], ["p", "🪨", 70, 20, 1, "bounce", "pebbles"])),
      SS("The end. The water rises to the top. The crow drinks and is happy. His clever idea solved the problem.", S("End: the crow drinks.", ["c", "🐦‍⬛", 30, 50, 3, "bounce", "happy crow"], ["j", "🏺", 70, 55, 3, "none", "full jug"], ["w", "💧", 70, 25, 2, "float", "water"]))),
    CHK(mc("In The Thirsty Crow, what is the problem in the middle?", "The crow cannot reach the water", ["The crow is too heavy", "The jug is broken"], { hint: "What stops the crow drinking?", why: "The water is too low for the crow to reach.", tag: "story.middle" })),
    CHK(mc("What happens at the end of The Thirsty Crow?", "The crow drinks the water", ["The crow flies away thirsty", "The crow breaks the jug"], { hint: "Is the problem solved?", why: "The pebbles raise the water and the crow drinks.", tag: "story.end" })),
    SAY("Let us remember. A story has a beginning, a middle and an end. The problem is in the middle, and it is solved at the end.", SUM("A story has a beginning, a middle and an end", "The problem is in the middle and it is solved at the end")),
    GLOSS({ beginning: "The start of a story, where we meet the characters and the place.", middle: "The part of a story where the problem happens.", end: "The last part of a story, where the problem is solved.", "folk tale": "An old story passed down from long ago.", character: "A person or animal in a story." }),
  ],
  mini: [
    mc("In The Thirsty Crow, who is the main character?", "the crow", ["the jug", "the pebbles"], { hint: "Who is the story about?", why: "The crow is the main character.", tag: "story.character" }),
    mc("Which part of a story is where we meet the characters?", "the beginning", ["the middle", "the end"], { hint: "Think of the start.", why: "We meet the characters at the beginning.", tag: "story.beginning" }),
    tf("The crow solves his problem by dropping pebbles into the jug.", true, { hint: "How did the water rise?", why: "The pebbles pushed the water up.", tag: "story.middle" }),
  ],
};

const predict = {
  id: "predict", kind: "try", title: "Predicting the ending",
  blocks: [
    H("Stop 1: Clues and predictions"),
    SAY("Good readers are clue detectives. A prediction is a clever guess about what will happen next. We use clues from the story and what we already know. If the sky turns dark and grey, what do you think will happen? Rain! The grey clouds were the clue.", T("A **prediction** is a clever guess about what will happen next.", "Clues: dark grey clouds. Prediction: it will rain.")),
    EXPP("Dark clouds",
      SS("Here is a sunny sky. Everything is bright.", S("A sunny sky.", ["s", "☀️", 50, 40, 3, "grow", "sunny"])),
      SS("Now the clouds are dark and grey. That is a clue. What will happen next?", S("Dark clouds are a clue.", ["c", "☁️", 50, 35, 3, "grow", "dark clouds"])),
      SS("Rain! We used the clue to make a prediction, and it came true.", S("It rains.", ["c", "🌧️", 50, 40, 3, "bounce", "rain"]))),
    CHK(mc("Ali put on his swimming shorts and ran to the pool. What will probably happen next?", "He will go swimming", ["He will go to sleep", "He will eat lunch"], { hint: "What are swimming shorts for?", why: "Swimming shorts are a clue that he is going swimming.", tag: "predict.clue" })),
    H("Stop 2: Make your own prediction"),
    SAY("Now it is your turn to predict. Ask a grown-up to read you a picture book, but stop before the end. Use the clues to guess how it will finish, then read on and check.", ACT("Predict the ending", ["A picture book", "A grown-up to read with you"], ["Read the book until the last few pages.", "Stop and look at the clues in the pictures and words.", "Say what you think will happen at the end.", "Read on. Was your prediction right?"])),
    SAY("Here are the clue detectives, magnifying glass at the ready.", IMG("🔍", "Clues in a story help us predict what happens next.")),
    SAY("Here is a puzzle to think about. Can a prediction be wrong? Have a think, then tap to see.", REVEAL("Can a prediction be wrong?", "Yes! A prediction is a clever guess, so sometimes the story surprises us. That is part of the fun.")),
    CHK(mc("The cake is in the oven and it smells sweet. What will probably happen next?", "The cake will be ready soon", ["The cake will fly away", "The cake will turn blue"], { hint: "Think about what happens when something bakes.", why: "A sweet smell tells us the cake is baking and will be ready.", tag: "predict.clue" })),
    SAY("Let us remember. Clues help us predict. A prediction is a clever guess and it can be wrong.", SUM("Clues help us make a prediction", "A prediction is a clever guess, so it can be wrong")),
    GLOSS({ prediction: "A clever guess about what will happen next.", clue: "A small piece of information that helps us work something out.", guess: "What you think, without knowing for sure." }),
  ],
  mini: [
    mc("It is cold and snowing. Zara puts on her hat and gloves. What will probably happen next?", "She will go outside", ["She will go to the beach", "She will plant a tree"], { hint: "What are hats and gloves for?", why: "Hat and gloves are clues she will go out in the snow.", tag: "predict.clue" }),
    tf("A prediction is always right.", false, { hint: "It is a guess.", why: "A prediction is a guess, so it can be wrong.", tag: "predict.def" }),
    mc("Which is a clue that a storm is coming?", "dark clouds", ["a blue sky", "a calm lake"], { hint: "What do we see before rain?", why: "Dark clouds are a clue.", tag: "predict.clue" }),
  ],
};

const rhyme = {
  id: "rhyme", kind: "play", title: "Rhymes and rhythm",
  blocks: [
    H("Stop 1: Rhyme"),
    SAY("Poems love rhyme. Words rhyme when they end with the same sound. Cat and hat. Moon and spoon. Look at the ends of the words, not the beginnings. Listen: cat, hat, mat, sat. They all end with at. Let's watch rhyming words come together.", T("Words **rhyme** when they end with the same sound: cat, hat, mat.")),
    EXPP("Cat and hat",
      SS("Here is a cat.", S("cat", ["c", "🐈", 30, 50, 3, "grow", "cat"])),
      SS("And here is a hat. Cat and hat end with the same sound, at. They rhyme!", S("cat and hat rhyme", ["c", "🐈", 30, 50, 3, "none", "cat"], ["h", "🎩", 70, 50, 3, "grow", "hat"], ["e", "✨", 50, 20, 2, "float", "rhyme"]))),
    CHK(mc("Which word rhymes with moon?", "spoon", ["moth", "map"], { hint: "Listen to the ending.", why: "Moon and spoon both end in oon.", tag: "rhyme.find" })),
    H("Stop 2: Rhythm and a brain game"),
    SAY("A poem also has rhythm, which is its beat. Clap along as you say it: Twinkle, twinkle, little star. Each clap is one beat. Then play the memory game and listen out for the beat.", T("**Rhythm** is the beat of a poem. Clap along to feel it.")),
    BRAIN("memory_match", "Rhyme pairs", "Find the matching pairs.", ["🐈", "🎩", "🌙", "🥄", "🐝", "🌳"]),
    CHK(mc("What is rhythm in a poem?", "the beat you can clap", ["a picture", "the title"], { hint: "Think about clapping along.", why: "Rhythm is the beat of a poem.", tag: "rhyme.rhythm" })),
    SAY("Let us remember. Rhyming words end with the same sound. Rhythm is the beat.", SUM("Rhyming words end with the same sound", "Rhythm is the beat of a poem")),
    GLOSS({ rhyme: "Words that end with the same sound, like cat and hat.", rhythm: "The beat of a poem or song.", poem: "A short piece of writing, often with rhyme and rhythm." }),
  ],
  mini: [
    mc("Which word rhymes with day?", "play", ["dot", "dig"], { hint: "Listen to the ending.", why: "Day and play both end in ay.", tag: "rhyme.find" }),
    tf("Cat and dog rhyme.", false, { hint: "Do they end the same?", why: "Cat ends in at and dog ends in og.", tag: "rhyme.find" }),
    mc("What do we clap along to in a poem?", "the rhythm", ["the title", "the author"], { hint: "It is the beat.", why: "We clap along to the rhythm.", tag: "rhyme.rhythm" }),
  ],
};

const poem = {
  id: "poem", kind: "use", title: "Write four lines",
  blocks: [
    H("Stop 1: Plan a poem"),
    SAY("You can write a poem too! Here is a plan. First, choose a topic, like a cat. Then think of rhyming words, like cat and hat. Then write four short lines. Finally, read it aloud to hear the rhythm. Watch the steps.", T("To write a poem: choose a topic, find rhyming words, write four lines, read it aloud.")),
    EXPP("Making a poem",
      SS("Step one. Choose a topic. We choose a cat.", S("Choose a topic.", ["c", "🐈", 50, 50, 3, "grow", "cat"])),
      SS("Step two. Think of rhyming words. Cat, hat, mat.", S("Find rhyming words.", ["c", "🐈", 25, 50, 3, "none", "cat"], ["h", "🎩", 50, 50, 3, "grow", "hat"], ["m", "🧶", 75, 50, 3, "grow", "mat"])),
      SS("Step three. Write the lines. Little cat on the mat, wearing a tiny hat.", S("Write four lines.", ["c", "🐈", 50, 50, 3, "bounce", "four lines"]))),
    CHK(mc("What do we do first when we plan a poem?", "choose a topic", ["read it aloud", "draw a border"], { hint: "What do we need before we can write?", why: "First we choose what the poem is about.", tag: "poem.plan" })),
    H("Stop 2: Write and share"),
    SAY("Time to write your own. Pick a topic you love, find two rhyming pairs, and write four lines. Read it to someone at home.", ACT("My four-line poem", ["Paper and a pencil", "A grown-up to listen"], ["Choose a topic you love.", "Think of two pairs of rhyming words.", "Write four short lines that end with your rhymes.", "Read it aloud, clapping the beat."])),
    SAY("A poet at work.", IMG("✍️", "A poem with four lines and two rhymes.")),
    CHK(mc("Why do we read our poem aloud?", "to hear the rhythm and rhymes", ["to make it longer", "to hide mistakes"], { hint: "What can we hear?", why: "Reading aloud helps us hear the beat and rhymes.", tag: "poem.aloud" })),
    SAY("Let us remember. Plan a poem: topic, rhymes, four lines, read aloud.", SUM("Plan: topic, rhyming words, four lines", "Read it aloud to hear the rhythm")),
    GLOSS({ topic: "What a piece of writing is about.", line: "One row of words in a poem.", aloud: "Out loud, so people can hear." }),
  ],
  mini: [
    mc("How many lines are in our poem?", "four", ["two", "ten"], { hint: "Look at the plan.", why: "We write four short lines.", tag: "poem.plan" }),
    tf("We read a poem aloud to hear the rhythm.", true, { hint: "What can we hear?", why: "Reading aloud shows the rhythm.", tag: "poem.aloud" }),
    mc("Which is a good topic for a poem?", "my cat", ["the page number", "a full stop"], { hint: "Pick something you love.", why: "A cat is a fun topic for a poem.", tag: "poem.topic" }),
  ],
};

export const topics = [
  topicLesson({
    slug: "english-class-1-stories-poems", subject: "english", cls: 1, topic: 3, title: "Stories and Poems",
    summary: "A folk tale, beginning, middle and end, predicting the ending, rhymes and rhythm, and writing four lines.",
    unit: "Topic 3: Stories and poems", difficulty: 1,
    objectives: ["Retell a story in order: beginning, middle and end", "Predict what happens next using clues", "Spot rhymes and rhythm in a poem", "Plan and write four lines"],
    success_criteria: ["I can tell the beginning, middle and end of a story", "I can use clues to predict what happens next", "I can find words that rhyme", "I can plan a short poem"],
    real_life: "Telling bedtime stories and making up rhymes for a baby brother or sister.",
    standards: [
      { framework: "nc_england", code: "Y2 reading", text: "Discuss the sequence of events, make predictions, and recite poems with rhyme and rhythm" },
      { framework: "cambridge", code: "2Rs.01" }, { framework: "cambridge", code: "2Ri.02" }, { framework: "cambridge", code: "2Ri.03" }, { framework: "cambridge", code: "2Ri.07" }, { framework: "cambridge", code: "2Ri.08" }, { framework: "cambridge", code: "2Ri.11" }, { framework: "cambridge", code: "2Ri.12" }, { framework: "cambridge", code: "2Ri.16" }, { framework: "cambridge", code: "2Ra.05" }, { framework: "cambridge", code: "2Ws.01" }, { framework: "cambridge", code: "2Wc.01" },
    ],
    warm_up: [
      mc("Which word rhymes with hat?", "mat", ["hen", "sun"], { hint: "Listen to the ending.", why: "Hat and mat both end in at." }),
      tf("A sentence starts with a capital letter.", true, { hint: "Look at the first letter.", why: "Every sentence starts with a capital letter." }),
      mc("Which word is a describing word?", "big", ["run", "dog"], { hint: "It tells us what a thing is like.", why: "Big describes a thing." }),
    ],
    intro: [
      H("Welcome back, story explorer!"),
      SAY("Welcome back, story explorer! Today's big question: how do stories and poems work, and how can we make our own? We will hear an old tale, guess what happens next, play with rhymes, and write four lines. Let's go!", T("Today's big question: how do stories and poems work?", "We will read, predict, rhyme and write.")),
      IMG("📚", "Stories and poems are full of surprises."),
      GLOSS({ story: "A tale about characters and what happens to them." }),
    ],
    subs: [story, predict, rhyme, poem],
    quiz: [
      Q(mc("Why does a story need a beginning, a middle and an end?", "So it makes sense from start to finish", ["So it is very long", "So it has more pictures"], { hint: "Think about how a story flows.", why: "The three parts make a story easy to follow.", tag: "story.reason" }), "story", "reason", [
        mc("Why does a story have a problem in the middle?", "It gives the characters something to solve", ["It makes the pictures bigger", "It is the title"], { hint: "What do characters have to do?", why: "The problem gives the story something to happen.", tag: "story.reason" }),
        mc("Why does a story usually end with the problem solved?", "So the reader feels the story is finished", ["So it uses more words", "So the pictures match"], { hint: "How do we feel at the end?", why: "A solved problem makes the story feel complete.", tag: "story.reason" })]),
      Q(tf("In The Thirsty Crow, the crow drops pebbles into the jug.", true, { hint: "How did he reach the water?", why: "The pebbles raise the water.", tag: "story.middle" }), "story", "recall", [
        tf("In The Thirsty Crow, the crow breaks the jug.", false, { hint: "Did the jug break?", why: "The crow does not break the jug; he drops in pebbles.", tag: "story.middle" }),
        tf("At the start of The Thirsty Crow, the crow is thirsty.", true, { hint: "How does the crow feel at the start?", why: "He is very thirsty on a hot day.", tag: "story.beginning" })]),
      Q(ord("Put the story in order.", ["The crow finds a jug with a little water", "The crow drops in pebbles", "The water rises", "The crow drinks"], { hint: "Start with the problem.", why: "First the crow finds the jug, then he fixes the problem.", tag: "story.order" }), "story", "apply", [
        ord("Put the tale in order.", ["The hare races ahead", "The hare has a nap", "The tortoise keeps going", "The tortoise wins"], { hint: "Think about who is fast at the start.", why: "The hare naps, so the tortoise passes him.", tag: "story.order" }),
        ord("Order the events of this tale.", ["A mouse wakes a lion", "The lion lets the mouse go", "The lion is caught in a net", "The mouse chews the net"], { hint: "Which comes first?", why: "The mouse is spared and later returns the favour.", tag: "story.order" })]),
      Q(mat("Match each part of the story to what happens.", [["Beginning", "We meet the crow and the jug"], ["Middle", "The crow tries pebbles"], ["End", "The crow drinks and is happy"]], { hint: "Think about when each thing happens.", why: "We meet characters first, solve the problem in the middle, finish at the end.", tag: "story.parts" }), "story", "recall", [
        mat("Which part of the story is each event?", [["Beginning", "A hare and a tortoise start a race"], ["Middle", "The hare falls asleep"], ["End", "The tortoise crosses the line"]], { hint: "Think about when each thing happens.", why: "The race starts, the hare naps, the tortoise wins.", tag: "story.parts" }),
        mat("Match the story parts.", [["Beginning", "A lion is asleep"], ["Middle", "The lion is in a net"], ["End", "The mouse sets him free"]], { hint: "Think about when each thing happens.", why: "Characters first, the problem in the middle, solution at the end.", tag: "story.parts" })]),
      Q(hot("Tap the picture that shows what happens next: Ali dropped his ice cream on the floor.", [["😢", "sad", 22, 50], ["😴", "sleepy", 50, 50], ["🤩", "excited", 78, 50]], ["sad"], { labels: true, hint: "How would you feel?", why: "Dropping an ice cream would make most people sad.", tag: "predict.clue" }), "predict", "apply", [
        hot("Tap the picture that shows what happens next: Zara won the race.", [["😄", "happy", 22, 50], ["😢", "sad", 50, 50], ["😠", "angry", 78, 50]], ["happy"], { labels: true, hint: "How would you feel?", why: "Winning a race makes us happy.", tag: "predict.clue" }),
        hot("Tap the picture that shows what happens next: Hamza lost his favourite toy.", [["😢", "upset", 22, 50], ["😄", "joyful", 50, 50], ["😴", "sleepy", 78, 50]], ["upset"], { labels: true, hint: "How would you feel?", why: "Losing a favourite toy is upsetting.", tag: "predict.clue" })]),
      Q(mc("The sky is dark and the clouds are grey. What will probably happen next?", "It will rain", ["It will be very hot", "It will snow in summer"], { hint: "What do grey clouds bring?", why: "Dark grey clouds are a clue that rain is coming.", tag: "predict.clue" }), "predict", "apply", [
        mc("Sam put on his coat and boots and took an umbrella. What will probably happen next?", "He will go out in the rain", ["He will go swimming", "He will go to bed"], { hint: "What is an umbrella for?", why: "The umbrella and boots are clues that it is wet.", tag: "predict.clue" }),
        mc("Mum is tying the football boots and picking up a ball. What will probably happen next?", "They will play football", ["They will bake a cake", "They will go to sleep"], { hint: "What are football boots for?", why: "The boots and ball are clues they will play football.", tag: "predict.clue" })]),
      Q(mc("How can clues in a story help us predict the ending?", "They tell us what is likely to happen", ["They tell us the page number", "They make the story longer"], { hint: "What do clues give us?", why: "Clues show what is likely to happen next.", tag: "predict.reason" }), "predict", "reason", [
        mc("Why is it good to check our prediction as we read?", "We can see if our clues were right", ["We can change the ending", "We can skip pages"], { hint: "What do we learn?", why: "Checking shows whether our clues were right.", tag: "predict.reason" }),
        mc("Why can a prediction turn out to be wrong?", "It is a guess, and stories can surprise us", ["Clues are never helpful", "The pictures are different"], { hint: "Is a prediction certain?", why: "A prediction is a guess, so a story can surprise us.", tag: "predict.reason" })]),
      Q(fill("Complete the rhymes.", "Cat rhymes with {b1}. Moon rhymes with {b2}.", [["hat", "hen", "dog"], ["spoon", "sun", "star"]], { hint: "Listen to the endings.", why: "Cat and hat both end in at. Moon and spoon both end in oon.", tag: "rhyme.find" }), "rhyme", "apply", [
        fill("Finish the rhymes.", "Dog rhymes with {b1}. Star rhymes with {b2}.", [["log", "dig", "cat"], ["car", "sun", "moon"]], { hint: "Listen to the endings.", why: "Dog and log end in og. Star and car end in ar.", tag: "rhyme.find" }),
        fill("Fill in the rhymes.", "Bee rhymes with {b1}. Boat rhymes with {b2}.", [["tree", "bed", "cup"], ["coat", "cat", "kite"]], { hint: "Listen to the endings.", why: "Bee and tree end in ee. Boat and coat end in oat.", tag: "rhyme.find" })]),
      Q(ms("Which words rhyme with ball? Pick two.", ["wall", "tall"], ["bell", "bill"], { hint: "Listen to the endings.", why: "Wall and tall end in all, like ball.", tag: "rhyme.find" }), "rhyme", "apply", [
        ms("Pick the two words that rhyme with rain.", ["train", "plane"], ["ran", "run"], { hint: "Listen to the endings.", why: "Train and plane end in ain, like rain.", tag: "rhyme.find" }),
        ms("Choose two words that rhyme with night.", ["light", "kite"], ["nut", "net"], { hint: "Listen to the endings.", why: "Light and kite end in ite, like night.", tag: "rhyme.find" })]),
      Q(sld("Slide to show how many words rhyme with cat: The cat sat on a mat in a hat.", { min: 0, max: 6 }, 3, 0, { hint: "Find words that end in at.", why: "Sat, mat and hat all rhyme with cat.", tag: "rhyme.count" }), "rhyme", "apply", [
        sld("Slide to show how many words rhyme with bug: The bug gave a hug to a slug and a mug.", { min: 0, max: 6 }, 3, 0, { hint: "Find words that end in ug.", why: "Hug, slug and mug rhyme with bug.", tag: "rhyme.count" }),
        sld("Slide to show how many words rhyme with bee: The bee sat in a tree by the sea.", { min: 0, max: 6 }, 2, 0, { hint: "Find words that end in ee.", why: "Tree and sea rhyme with bee.", tag: "rhyme.count" })]),
      Q(mc("Why do poems often use rhyme?", "Matching sounds are fun to hear and easy to remember", ["Poems must be short", "Rhymes make words longer"], { hint: "What do rhymes sound like?", why: "Matching sounds are fun and easy to remember.", tag: "rhyme.reason" }), "rhyme", "reason", [
        mc("Why do we clap along to the beat of a poem?", "To feel the rhythm", ["To make the poem longer", "To change the words"], { hint: "What is the beat called?", why: "Clapping helps us feel the rhythm.", tag: "rhyme.reason" }),
        mc("Why do moon and spoon make a good rhyme?", "They end with the same sound", ["They start with the same letter", "They are both round"], { hint: "Listen to the endings.", why: "Moon and spoon both end in oon.", tag: "rhyme.reason" })]),
      Q(st("Write one word that rhymes with day.", ["play", "say", "way", "stay", "may", "pay", "today", "lay", "hay", "bay", "tray", "clay"], { hint: "Try ay words.", why: "Play, say and way all rhyme with day.", tag: "poem.rhyme" }), "poem", "apply", [
        st("Write one word that rhymes with sun.", ["fun", "run", "bun", "gun", "nun", "done", "won", "ton"], { hint: "Try un words.", why: "Fun, run and bun rhyme with sun.", tag: "poem.rhyme" }),
        st("Write one word that rhymes with tree.", ["bee", "sea", "see", "free", "three", "key", "me", "we", "he", "she", "knee", "flea"], { hint: "Try ee words.", why: "Bee, sea and three rhyme with tree.", tag: "poem.rhyme" })]),
      Q(ord("Put the steps in order for writing a poem.", ["Choose a topic", "Think of rhyming words", "Write four lines", "Read it aloud"], { hint: "What comes first?", why: "Plan first, then write, then read aloud.", tag: "poem.plan" }), "poem", "apply", [
        ord("Put the steps in order for writing a story.", ["Think of characters", "Plan the beginning, middle and end", "Write the story", "Check and read it aloud"], { hint: "What comes first?", why: "Plan first, then write, then check.", tag: "poem.plan" }),
        ord("Arrange the steps for improving your writing.", ["Write a first draft", "Read it aloud", "Fix any mistakes", "Share it with a friend"], { hint: "What comes first?", why: "Draft, read, fix, share.", tag: "poem.plan" })]),
      Q(hot("Tap the picture that rhymes with sun.", [["🐝", "bee", 22, 50], ["🍞", "bun", 50, 50], ["🌙", "moon", 78, 50]], ["bun"], { labels: true, hint: "Listen to the ending.", why: "Sun and bun both end in un.", tag: "poem.rhyme" }), "poem", "apply", [
        hot("Tap the picture that rhymes with log.", [["🐕", "dog", 22, 50], ["🌲", "tree", 50, 50], ["🍎", "apple", 78, 50]], ["dog"], { labels: true, hint: "Listen to the ending.", why: "Log and dog both end in og.", tag: "poem.rhyme" }),
        hot("Tap the picture that rhymes with star.", [["🚗", "car", 22, 50], ["🌙", "moon", 50, 50], ["🐱", "cat", 78, 50]], ["car"], { labels: true, hint: "Listen to the ending.", why: "Star and car both end in ar.", tag: "poem.rhyme" })]),
      Q(mc("Why do poets read poems aloud when checking them?", "To hear whether the rhythm and rhymes sound right", ["To make them longer", "To hide mistakes"], { hint: "What can we hear?", why: "Reading aloud helps us hear the beat and rhymes.", tag: "poem.reason" }), "poem", "reason", [
        mc("Why do we plan a story before writing it?", "So it has a clear beginning, middle and end", ["So it uses more paper", "So the pictures are bigger"], { hint: "What does planning give us?", why: "A plan helps the story make sense.", tag: "poem.reason" }),
        mc("Why do we think of rhyming words before writing a poem?", "So the lines can end with matching sounds", ["So the poem is longer", "So the title is bigger"], { hint: "What do rhymes need?", why: "Rhymes need words that end with matching sounds.", tag: "poem.reason" })]),
    ],
  }),
];
