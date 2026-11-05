import { SAY, SS, H, T, IMG, ACT, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, st, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// English topic 5 for Zainab (Class 1): Writing to help others. Standards from docs/CURRICULUM_V2.md section 3 (NC Year 2 writing, Cambridge Stage 2).
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });

const instr = {
  id: "instructions", kind: "learn", title: "Instructions and bossy verbs",
  blocks: [
    H("Stop 1: What are instructions?"),
    SAY("Instructions tell someone how to do something, step by step, like a recipe for making a sandwich. They are full of bossy verbs, also called commands. A bossy verb tells you what to do, and it comes first in the step. Spread the butter. Add the cheese. Cut it in half. Each step is one short job, and the steps go in order.", T("**Instructions** tell us how to do something, step by step.", "A bossy verb, or **command**, tells you what to do: spread, add, cut.")),
    EXPP("Make a sandwich",
      SS("Step one. Spread the butter on the bread. Spread is a bossy verb.", S("1. Spread the butter.", ["b", "🍞", 30, 50, 3, "grow", "spread"], ["k", "🧈", 70, 50, 3, "grow", "butter"])),
      SS("Step two. Add the cheese. Add is a bossy verb.", S("2. Add the cheese.", ["b", "🍞", 30, 50, 3, "none", "bread"], ["c", "🧀", 70, 50, 3, "grow", "add"])),
      SS("Step three. Cut it in half. Cut is a bossy verb. Now the sandwich is ready!", S("3. Cut it in half.", ["s", "🥪", 50, 50, 3, "bounce", "cut"]))),
    CHK(mc("Which sentence is an instruction?", "Pour the milk into the bowl.", ["The milk is cold.", "Where is the milk?"], { hint: "Which one tells you what to do?", why: "It starts with a bossy verb, pour.", tag: "instructions.find" })),
    CHK(mc("Which word is a bossy verb?", "stir", ["soup", "hot"], { hint: "Which is a doing word that gives an order?", why: "Stir tells you what to do.", tag: "instructions.verb" })),
    SAY("Let us remember. Instructions go in order. Each step starts with a bossy verb.", SUM("Instructions tell us how to do something in order", "Each step starts with a bossy verb")),
    GLOSS({ instructions: "Steps that tell us how to do something.", command: "A bossy verb that tells you what to do.", step: "One small job in a list of instructions.", recipe: "Instructions for cooking something." }),
  ],
  mini: [
    mc("Which is a bossy verb?", "mix", ["bowl", "yellow"], { hint: "A doing word that gives an order.", why: "Mix tells you what to do.", tag: "instructions.verb" }),
    tf("Instructions can be in any order.", false, { hint: "Think about making a sandwich.", why: "Steps must be in order.", tag: "instructions.order" }),
    mc("Which is an instruction?", "Wash your hands.", ["My hands are clean.", "Do you have hands?"], { hint: "Which tells you what to do?", why: "Wash starts the step with a bossy verb.", tag: "instructions.find" }),
  ],
};

const plan = {
  id: "plan", kind: "try", title: "Plan and write a short story",
  blocks: [
    H("Stop 1: Plan first"),
    SAY("Good writers plan before they write. A story plan has three boxes. In the beginning, we meet the characters and the place. In the middle, a problem happens. At the end, the problem is solved. A plan helps our story make sense, and it stops us getting stuck.", T("A **plan** has a beginning, a middle and an end.")),
    EXPP("A story plan",
      SS("Box one, the beginning. A girl called Mina finds a lost kitten.", S("Beginning: Mina finds a kitten.", ["m", "👧", 30, 50, 3, "grow", "Mina"], ["k", "🐱", 70, 55, 3, "grow", "kitten"])),
      SS("Box two, the middle. The kitten is lost and cries. Mina has to help.", S("Middle: the kitten is lost.", ["k", "🐱", 50, 50, 3, "bounce", "lost"])),
      SS("Box three, the end. Mina finds the kitten's home. Everyone is happy.", S("End: the kitten is home.", ["h", "🏠", 50, 50, 3, "grow", "home"]))),
    CHK(mc("Which comes first when writing a story?", "plan the beginning, middle and end", ["read it aloud", "add a title page"], { hint: "What do we do before writing?", why: "We plan first.", tag: "story.plan" })),
    H("Stop 2: Write it"),
    SAY("Now use your plan to write. Write one or two sentences for each box. Say each sentence in your head first. Use capital letters and full stops.", ACT("Write a short story", ["Paper and a pencil", "A grown-up to help"], ["Fold a paper into three boxes: beginning, middle, end.", "Draw or write your plan in each box.", "Write one or two sentences from each box.", "Read your story to a grown-up."])),
    SAY("A story plan in three boxes.", IMG("📝", "A plan has a beginning, a middle and an end.")),
    CHK(mc("Where does the problem happen in a story?", "in the middle", ["at the start", "after the end"], { hint: "Which box has the problem?", why: "The problem happens in the middle.", tag: "story.plan" })),
    SAY("Let us remember. Plan first, then write. Use capital letters and full stops.", SUM("Plan first: beginning, middle and end", "Write using capital letters and full stops")),
    GLOSS({ plan: "A list of ideas to follow before we start writing.", character: "A person or animal in a story.", problem: "Something that goes wrong in a story." }),
  ],
  mini: [
    mc("Where do we meet the characters in a story?", "at the beginning", ["in the middle", "at the end"], { hint: "Think about the start.", why: "We meet characters at the beginning.", tag: "story.plan" }),
    tf("We plan a story before we write it.", true, { hint: "Planning comes first.", why: "A plan helps our story make sense.", tag: "story.plan" }),
    mc("When is the problem solved?", "at the end", ["at the beginning", "before the story"], { hint: "Think about the last box.", why: "The problem is solved at the end.", tag: "story.plan" }),
  ],
};

const check = {
  id: "check", kind: "play", title: "Check and improve",
  blocks: [
    H("Stop 1: Be a proofreader"),
    SAY("After we write, we check. Good writers are proofreaders. They look for mistakes and fix them. Does each sentence start with a capital letter? Does it end with a full stop, or a question mark? Look at this sentence: the cat sat on the mat. It has no capital letter and no full stop. Let's fix it.", T("**Proofreading** means checking your writing for mistakes.", "Capital letter at the start. Full stop at the end.")),
    EXPP("Fix the sentence",
      SS("Here is a sentence with no capital and no full stop: the cat sat on the mat.", S("the cat sat on the mat", ["s", "🐈", 50, 50, 3, "bounce", "the cat sat on the mat"])),
      SS("Add a capital T at the start and a full stop at the end. The cat sat on the mat. Much better!", S("The cat sat on the mat.", ["s", "🐈", 50, 50, 3, "grow", "The cat sat on the mat."]))),
    CHK(mc("Which sentence is written correctly?", "The dog barked.", ["the dog barked", "the dog barked."], { hint: "Look for a capital and a full stop.", why: "It has a capital letter and a full stop.", tag: "check.punct" })),
    H("Stop 2: Brain game"),
    SAY("Warm up with a memory game, then try to spot more mistakes. Your sharp eyes are the best tool.", BRAIN("memory_match", "Proofreader pairs", "Find the matching pairs.", ["✏️", "🔍", "🔠", "🔴", "❓", "❗"])),
    CHK(mc("Which mark ends a question?", "?", [".", "!"], { hint: "It looks like a hook with a dot.", why: "Questions end with a question mark.", tag: "check.punct" })),
    SAY("Let us remember. A proofreader checks writing for mistakes. Capital letters, full stops and question marks.", SUM("A proofreader checks for mistakes", "Check capital letters, full stops and question marks")),
    GLOSS({ proofreading: "Checking writing for mistakes.", mistake: "Something that is not right.", "capital letter": "A big letter at the start of a sentence or name." }),
  ],
  mini: [
    mc("What does a sentence start with?", "a capital letter", ["a comma", "a full stop"], { hint: "Look at the first letter.", why: "Every sentence starts with a capital letter.", tag: "check.punct" }),
    tf("A statement ends with a full stop.", true, { hint: "Think about the little dot.", why: "A statement ends with a full stop.", tag: "check.punct" }),
    mc("What is proofreading?", "checking writing for mistakes", ["drawing a picture", "reading a book"], { hint: "Think about checking.", why: "Proofreading means looking for mistakes.", tag: "check.def" }),
  ],
};

const aloud = {
  id: "aloud", kind: "use", title: "Read it aloud",
  blocks: [
    H("Stop 1: Reading aloud"),
    SAY("The last step is to read our writing aloud. When we say it out loud, we can hear if something does not sound right. We can hear a missing word, or a sentence that runs on. Read slowly, with a clear voice, and pause at each full stop. Listen to the sentences, like music.", T("To **read aloud** means to read out loud so people can hear.", "Pause at each full stop.")),
    EXPP("Reading aloud",
      SS("A girl reads her story aloud. She reads slowly and clearly.", S("A clear voice.", ["g", "👧", 40, 50, 3, "grow", "reading aloud"], ["s", "📖", 70, 55, 3, "grow", "story"])),
      SS("She stops at the full stop. A little pause, then on to the next sentence.", S("Pause at a full stop.", ["g", "👧", 40, 50, 3, "bounce", "pause"], ["p", "⏸️", 75, 30, 2, "pulse", "full stop"]))),
    CHK(mc("Why do we read our writing aloud?", "to hear if it sounds right", ["to make it longer", "to hide mistakes"], { hint: "What can we hear?", why: "We can hear if something is wrong.", tag: "aloud.why" })),
    H("Stop 2: Share your writing"),
    SAY("Be proud of what you wrote. Read your story or instructions to someone at home. Ask what they liked and one thing to make it even better.", ACT("Read to someone", ["Your writing", "A listener at home"], ["Choose a story or instructions you wrote.", "Read it slowly and clearly.", "Pause at each full stop.", "Ask your listener what they liked."])),
    SAY("A reader and a listener.", IMG("🗣️", "Reading aloud helps us improve our writing.")),
    CHK(mc("What should you do at a full stop?", "pause", ["shout", "skip it"], { hint: "Take a breath.", why: "A full stop means a little pause.", tag: "aloud.why" })),
    SAY("Let us remember. Read aloud to hear mistakes. Pause at full stops.", SUM("Read your writing aloud to hear if it sounds right", "Pause at each full stop")),
    GLOSS({ aloud: "Out loud, so people can hear.", pause: "A short stop.", listener: "A person who listens." }),
  ],
  mini: [
    mc("Why do we read aloud?", "to hear mistakes", ["to make it quieter", "to make it shorter"], { hint: "What can we hear?", why: "We hear what does not sound right.", tag: "aloud.why" }),
    tf("We should pause at a full stop.", true, { hint: "Think about breathing.", why: "A full stop means a short pause.", tag: "aloud.why" }),
    mc("How should we read aloud?", "slowly and clearly", ["very fast", "in a whisper"], { hint: "So everyone can understand.", why: "A slow, clear voice helps listeners.", tag: "aloud.why" }),
  ],
};

export const topics = [
  topicLesson({
    slug: "english-class-1-writing-to-help", subject: "english", cls: 1, topic: 5, title: "Writing to Help Others",
    summary: "Instructions and bossy verbs, planning and writing a short story, checking writing and reading it aloud.",
    unit: "Topic 5: Writing to help others", difficulty: 1,
    objectives: ["Write instructions with bossy verbs", "Plan and write a short story", "Check writing for capital letters and full stops", "Read writing aloud"],
    success_criteria: ["I can write steps that start with a bossy verb", "I can plan a story with a beginning, middle and end", "I can check my writing for mistakes", "I can read my writing aloud"],
    real_life: "Writing a recipe for a friend and a story to read to a younger cousin.",
    standards: [
      { framework: "nc_england", code: "Y2 writing", text: "Plan, write, evaluate and proofread; read aloud writing with appropriate intonation" },
      { framework: "cambridge", code: "2Wg.04" }, { framework: "cambridge", code: "2Ws.01" }, { framework: "cambridge", code: "2Wc.02" }, { framework: "cambridge", code: "2Wc.03" }, { framework: "cambridge", code: "2Wc.04" }, { framework: "cambridge", code: "2Wp.06" }, { framework: "cambridge", code: "2SLp.01" },
    ],
    warm_up: [
      mc("Which sentence ends with a question mark?", "Where is my bag?", ["My bag is red.", "What a big bag!"], { hint: "Which asks something?", why: "Questions end with a question mark." }),
      tf("A fact file has a heading.", true, { hint: "Think about the top of the page.", why: "A fact file starts with a heading." }),
      mc("Which word is a describing word?", "big", ["run", "dog"], { hint: "It tells us what a thing is like.", why: "Big describes a thing." }),
    ],
    intro: [
      H("Welcome back, young writer!"),
      SAY("Welcome back, young writer! Today's big question: how can our writing help other people? Instructions help someone make a sandwich. Stories make someone smile. We will plan, write, check and share. Let's go!", T("Today's big question: how can our writing help other people?", "We will write instructions and stories, then check and share them.")),
      IMG("✏️", "Writers plan, write, check and share."),
      GLOSS({ writer: "Someone who writes." }),
    ],
    subs: [instr, plan, check, aloud],
    quiz: [
      Q(mc("Find the instruction: which sentence is one?", "Mix the flour and the milk.", ["The flour is white.", "Is there any milk?"], { hint: "Which tells you what to do?", why: "It starts with a bossy verb, mix.", tag: "instructions.find" }), "instructions", "recall", [
        mc("Pick the sentence that is an instruction.", "Cut the paper in half.", ["The paper is white.", "Where is the paper?"], { hint: "Which tells you what to do?", why: "It starts with a bossy verb, cut.", tag: "instructions.find" }),
        mc("Spot the instruction.", "Press the button.", ["The button is red.", "Is it a button?"], { hint: "Which tells you what to do?", why: "It starts with a bossy verb, press.", tag: "instructions.find" })]),
      Q(mc("Why do instructions start each step with a bossy verb?", "It tells the reader exactly what to do", ["It makes the steps longer", "It makes them rhyme"], { hint: "What does a bossy verb do?", why: "A bossy verb tells you what to do.", tag: "instructions.reason" }), "instructions", "reason", [
        mc("Why must instructions go in order?", "Doing them in the wrong order would not work", ["The steps are numbers", "It makes the page tidy"], { hint: "Think about making a sandwich.", why: "The wrong order would spoil it.", tag: "instructions.reason" }),
        mc("Why are instructions written in short steps?", "Each step is one small job that is easy to follow", ["So the page looks long", "So they rhyme"], { hint: "How do we follow instructions?", why: "Short steps are easier to follow.", tag: "instructions.reason" })]),
      Q(ord("Put the steps in order.", ["Wash your hands", "Mix the flour and milk", "Pour it into a pan", "Cook until golden"], { hint: "What comes first?", why: "Wash first, then mix, pour and cook.", tag: "instructions.order" }), "instructions", "apply", [
        ord("Put the steps for brushing teeth in order.", ["Put toothpaste on the brush", "Brush your teeth", "Spit out the foam", "Rinse your mouth"], { hint: "What comes first?", why: "Toothpaste first, then brush, spit and rinse.", tag: "instructions.order" }),
        ord("Order the steps for making a sandwich.", ["Get two slices of bread", "Spread the butter", "Add the cheese", "Put the slices together"], { hint: "What comes first?", why: "Bread first, then butter, cheese and join.", tag: "instructions.order" })]),
      Q(fill("Finish the sentences.", "Instructions use {b1} verbs like mix and pour. Each job is a {b2}.", [["bossy", "sleepy", "silent"], ["step", "colour", "rhyme"]], { hint: "Think about commands and small jobs.", why: "Bossy verbs give commands, and each job is a step.", tag: "instructions.parts" }), "instructions", "apply", [
        fill("Complete the sentences.", "A {b1} verb tells you what to do. Instructions go in {b2}.", [["bossy", "sleepy", "colour"], ["order", "circles", "rhymes"]], { hint: "Think about commands.", why: "Bossy verbs give orders and steps go in order.", tag: "instructions.parts" }),
        fill("Fill in the gaps.", "A {b1} for cooking is a set of instructions. Each one starts with a {b2} verb.", [["recipe", "poem", "song"], ["bossy", "sleepy", "silent"]], { hint: "Think about cooking.", why: "A recipe is instructions and begins with bossy verbs.", tag: "instructions.parts" })]),
      Q(mc("What is the first job when writing a story?", "Plan the beginning, middle and end", ["Read it aloud", "Add a title page"], { hint: "What do we do before writing?", why: "We plan first.", tag: "story.plan" }), "plan", "apply", [
        mc("What should writers do before they start a story?", "Make a plan with three boxes", ["Hand it in", "Rub it out"], { hint: "What helps a story make sense?", why: "A plan comes first.", tag: "story.plan" }),
        mc("What helps a writer not get stuck?", "A plan with a beginning, middle and end", ["A long title", "A big picture"], { hint: "What do writers use?", why: "A plan keeps the story clear.", tag: "story.plan" })]),
      Q(hot("Tap the part of the story where the problem happens.", [["🌅", "beginning", 22, 50], ["⚡", "middle", 50, 50], ["🏁", "end", 78, 50]], ["middle"], { labels: true, hint: "Which box has the problem?", why: "The problem happens in the middle.", tag: "story.parts" }), "plan", "apply", [
        hot("Tap the part of the story where we meet the characters.", [["🌅", "beginning", 22, 50], ["⚡", "middle", 50, 50], ["🏁", "end", 78, 50]], ["beginning"], { labels: true, hint: "Which box starts the story?", why: "We meet characters at the beginning.", tag: "story.parts" }),
        hot("Tap the part of the story where the problem is solved.", [["🌅", "beginning", 22, 50], ["⚡", "middle", 50, 50], ["🏁", "end", 78, 50]], ["end"], { labels: true, hint: "Which box finishes the story?", why: "The problem is solved at the end.", tag: "story.parts" })]),
      Q(mc("Why do we plan a story before writing it?", "So it has a clear beginning, middle and end", ["So it takes longer", "So it has more pictures"], { hint: "What does a plan give us?", why: "A plan makes a story easy to follow.", tag: "story.reason" }), "plan", "reason", [
        mc("Why does a story need a problem?", "It gives the characters something to solve", ["It fills the page", "It is the title"], { hint: "What do characters do?", why: "The problem gives the story something to happen.", tag: "story.reason" }),
        mc("Why do we say each part of a story in our head first?", "It helps us write a clear sentence", ["It makes the pencil lighter", "It hides mistakes"], { hint: "Think about making a sentence.", why: "Saying it first makes writing it easier.", tag: "story.reason" })]),
      Q(mat("Match each problem with its fix.", [["No capital letter at the start", "Add a capital letter"], ["No full stop at the end", "Add a full stop"], ["A question without its mark", "Add a question mark"]], { hint: "What does each problem need?", why: "Each fix matches its problem.", tag: "check.punct" }), "check", "recall", [
        mat("Pair each mistake with how to fix it.", [["A name starting with a small letter", "Change it to a capital letter"], ["A sentence that never stops", "Add a full stop"], ["Where is my bag without a mark", "Add a question mark"]], { hint: "What does each mistake need?", why: "Each fix matches its mistake.", tag: "check.punct" }),
        mat("Which fix goes with each mistake?", [["the dog ran", "Add a capital letter"], ["The dog ran", "Add a full stop"], ["Can I play", "Add a question mark"]], { hint: "Look at what is missing.", why: "Each fix matches what is missing.", tag: "check.punct" })]),
      Q(ms("Which sentences are written correctly? Pick two.", ["The dog barked.", "Where is my hat?"], ["the dog barked", "where is my hat"], { hint: "Look for capitals and marks.", why: "The correct ones have capitals and ending marks.", tag: "check.punct" }), "check", "apply", [
        ms("Pick the two correct sentences.", ["We went to the park.", "Can I help?"], ["we went to the park", "can I help"], { hint: "Look for capitals and marks.", why: "The correct ones have capitals and ending marks.", tag: "check.punct" }),
        ms("Choose two correct sentences.", ["Zainab likes mangoes.", "What a big wave!"], ["zainab likes mangoes", "what a big wave"], { hint: "Look for capitals and marks.", why: "The correct ones have capitals and ending marks.", tag: "check.punct" })]),
      Q(sld("Slide to show how many mistakes: the cat sat on the mat", { min: 0, max: 5 }, 2, 0, { hint: "Check the start and the end.", why: "It needs a capital letter and a full stop.", tag: "check.count" }), "check", "apply", [
        sld("Slide to show how many mistakes: Mum made rice", { min: 0, max: 5 }, 1, 0, { hint: "Check the start and the end.", why: "It only needs a full stop.", tag: "check.count" }),
        sld("Slide to show how many mistakes: ali and sara went to lahore", { min: 0, max: 5 }, 4, 0, { hint: "Names need capitals, and the end needs a mark.", why: "Ali, Sara and Lahore need capitals, and it needs a full stop.", tag: "check.count" })]),
      Q(mc("Why do we check our writing after we have written it?", "To find and fix mistakes", ["To make it longer", "To make it quieter"], { hint: "What do proofreaders do?", why: "Checking finds mistakes to fix.", tag: "check.reason" }), "check", "reason", [
        mc("Why do we look for capital letters when we check?", "Every sentence and name should start with one", ["They look pretty", "They make the writing longer"], { hint: "What should start with a capital?", why: "Sentences and names start with capitals.", tag: "check.reason" }),
        mc("Why do we look for full stops when we check?", "Each statement should end with one", ["They look like dots", "They make words longer"], { hint: "What ends a statement?", why: "Statements end with a full stop.", tag: "check.reason" })]),
      Q(st("When we read our finished writing out loud, we read it ___. (one word)", ["aloud"], { hint: "Out loud, so people can hear.", why: "We read it aloud.", tag: "aloud.word" }), "aloud", "recall", [
        st("Which mark ends a question? Write its name (two words).", ["question mark"], { hint: "It looks like a hook with a dot.", why: "It is the question mark.", tag: "aloud.word" }),
        st("What kind of letter starts every sentence? Write two words.", ["capital letter", "a capital letter"], { hint: "It is a big letter.", why: "Every sentence starts with a capital letter.", tag: "aloud.word" })]),
      Q(ord("Put the writing steps in order.", ["Plan", "Write", "Check", "Read aloud"], { hint: "What comes first?", why: "Plan, write, check, then read aloud.", tag: "aloud.steps" }), "aloud", "apply", [
        ord("Arrange the steps for sharing writing.", ["Finish writing", "Read it through", "Fix mistakes", "Share with a friend"], { hint: "What comes first?", why: "Finish, read, fix, share.", tag: "aloud.steps" }),
        ord("Sort the steps for making a poem.", ["Choose a topic", "Think of rhymes", "Write the lines", "Read it aloud"], { hint: "What comes first?", why: "Topic, rhymes, lines, read aloud.", tag: "aloud.steps" })]),
      Q(tf("We should pause at each full stop when we read aloud.", true, { hint: "Think about breathing.", why: "A full stop means a short pause.", tag: "aloud.punct" }), "aloud", "recall", [
        tf("We should read as fast as possible when we read aloud.", false, { hint: "Can listeners understand a rush?", why: "A slow, clear voice is best.", tag: "aloud.punct" }),
        tf("Reading aloud helps us hear mistakes.", true, { hint: "What can we hear?", why: "We hear what does not sound right.", tag: "aloud.punct" })]),
      Q(mc("Why do we read aloud before sharing our writing?", "To hear anything that does not sound right", ["To make it shorter", "To hide mistakes"], { hint: "What can we hear?", why: "Reading aloud shows what to fix.", tag: "aloud.reason" }), "aloud", "reason", [
        mc("Why do we read slowly and clearly?", "So listeners can understand every word", ["So the page is longer", "So we can hide mistakes"], { hint: "Who are we reading to?", why: "Listeners need to understand.", tag: "aloud.reason" }),
        mc("Why do we pause at a full stop?", "It shows where a sentence ends", ["It makes words longer", "It hides a mistake"], { hint: "What does a full stop mean?", why: "A pause shows the sentence has ended.", tag: "aloud.reason" })]),
    ],
  }),
];
