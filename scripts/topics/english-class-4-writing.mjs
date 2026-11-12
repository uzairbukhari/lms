import { SAY, SS, H, T, IMG, ACT, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, st, ord, mat, fill, hot, sld, PHOTO } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// English topic 4 for Fatima (Class 4): Writing for a purpose. Standards from docs/CURRICULUM_V2.md section 3 (NC Year 3/4 writing, Cambridge Stage 4).
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });

const STALL = "english-class-4-writing-purpose-1-8e8bd3df.jpg";
const CRAYON = "english-class-4-writing-purpose-2-6ed8da95.jpg";

const purposes = {
  id: "purposes", kind: "learn", title: "Reports and persuasive writing",
  blocks: [
    H("Welcome back, young writer!"),
    SAY("Today we write for a purpose. How do writers inform, persuade and entertain?", T("Today's big question: how do writers choose the right words for their purpose?")),
    SAY("This fruit stall is full of colour. A writer could inform people about the fruit or persuade them to buy it.", PHOTO(STALL, "A market stall seen from above with crates of pomegranates, pears, oranges, apricots and melons", "A fruit stall. An advert can persuade people to eat healthy food.", "Photo by Jakub Kapusnak on Unsplash")),
    H("Stop 1: Reports"),
    SAY("Writers choose their style to fit their purpose. A report gives facts about a topic, clearly and in order. It has a title and an opening that says what it is about. It has headings for each part and facts in the present tense. For example: Pandas live in the mountains of China. A report does not give opinions. Watch how a report is built.", T("A **report** gives facts in a clear order, with headings, in the present tense.", "Pandas live in the mountains of China. They eat bamboo.")),
    EXPP("Building a report",
      SS("First, the title and an opening. All About Pandas. Pandas are large black and white bears.", S("Title and opening.", ["t", "🐼", 50, 50, 3, "grow", "All About Pandas"])),
      SS("Then headings for each part, like Where they live and What they eat. Under each heading are facts in the present tense.", S("Headings and facts.", ["h", "🏔️", 30, 50, 3, "grow", "Where they live"], ["e", "🎋", 70, 50, 3, "grow", "What they eat"]))),
    CHK(mc("Which sentence belongs in a report?", "Pandas eat bamboo.", ["Pandas are the cutest animals ever.", "I think pandas should be everywhere."], { hint: "A report gives facts.", why: "It is a fact in the present tense.", tag: "report.find" })),
    H("Stop 2: Persuasion"),
    SAY("Persuasive writing tries to convince the reader to agree. It states an opinion, then gives reasons to back it up. A persuasive writer uses strong words and asks questions. A power of three uses three words together, like safe, clean and fun. Let's persuade someone to recycle.", T("**Persuasive writing** tries to convince the reader.", "A **power of three** puts three words together: safe, clean and fun.")),
    EXPP("Persuading the reader",
      SS("The opinion. We should all recycle. A clear opinion at the start.", S("Opinion: we should recycle.", ["o", "♻️", 50, 50, 3, "grow", "We should recycle"])),
      SS("Now the reasons. Recycling saves energy, protects animals and keeps our streets clean. That is a power of three!", S("Reasons: a power of three.", ["e", "⚡", 25, 50, 3, "grow", "saves energy"], ["a", "🐢", 50, 50, 3, "grow", "protects animals"], ["s", "🧹", 75, 50, 3, "grow", "keeps streets clean"]))),
    CHK(mc("Which is a power of three?", "safe, clean and fun", ["safe and fun", "safe"], { hint: "How many things are in the list?", why: "Three words together make a power of three.", tag: "persuade.three" })),
    SAY("Let us remember. A report gives facts in order. Persuasive writing gives an opinion with reasons.", SUM("A report gives facts in order, with headings", "Persuasive writing gives an opinion backed by reasons and a power of three")),
    GLOSS({ report: "Writing that gives facts about a topic.", purpose: "The reason someone writes something.", "persuasive writing": "Writing that tries to convince the reader.", "power of three": "Three words or phrases together for effect.", "present tense": "The verb form that says what is happening now." }),
  ],
  mini: [
    mc("Which sentence belongs in a report?", "Lions live in groups called prides.", ["I think lions are boring.", "Lions are the best animal."], { hint: "A report gives facts.", why: "It is a fact in the present tense.", tag: "report.find" }),
    mc("What does persuasive writing try to do?", "convince the reader", ["list the contents", "tell a story"], { hint: "Think of its purpose.", why: "Persuasive writing tries to convince the reader.", tag: "persuade.def" }),
    tf("A report usually gives opinions.", false, { hint: "Think about facts.", why: "A report gives facts, not opinions.", tag: "report.find" }),
  ],
};

const story = {
  id: "story", kind: "try", title: "Story mountain and character profiles",
  blocks: [
    H("Stop 1: The story mountain"),
    SAY("Stories climb like a mountain. At the bottom is the opening, where we meet the characters and setting. Then the build-up, where events begin. At the top is the problem or climax, the most exciting part. Then the resolution, where things are sorted out, and the ending. Planning on a mountain keeps your story shaped.", T("A **story mountain** plans the opening, build-up, problem, resolution and ending.")),
    EXPP("Climbing the story mountain",
      SS("The opening. Amna and her little brother arrive at the beach. We meet them and the setting.", S("Opening.", ["a", "🏖️", 20, 70, 3, "grow", "opening"])),
      SS("The build-up and then the problem at the very top. A huge wave sweeps their kite out to sea.", S("Problem at the peak.", ["m", "⛰️", 50, 40, 3, "grow", "problem"], ["k", "🪁", 70, 20, 2, "float", "kite"])),
      SS("Then the resolution. A kind fisherman rescues it, and they all go home happy. That is the ending.", S("Resolution and ending.", ["f", "🎣", 80, 70, 3, "grow", "resolution"]))),
    CHK(mc("Where is the problem on a story mountain?", "at the top", ["at the bottom", "after the end"], { hint: "It is the most exciting part.", why: "The problem or climax is at the peak.", tag: "story.mountain" })),
    H("Stop 2: Character profiles"),
    SAY("A poster needs a plan, just like a story does. Colour and layout matter too.", PHOTO(CRAYON, "A young child colouring a butterfly with a red crayon on white paper", "Colouring and designing help writers plan how a poster will look.", "Photo by Lucas Alexander on Unsplash")),
    SAY("A character profile helps us know a character well before we write. Write their name, age, what they look like, what they like, and one thing they want. Amna is nine. She has bright eyes and a huge laugh. She loves kites. She wants to be brave. Then show it in your writing, rather than telling.", T("A **character profile** describes who a character is, what they like and what they want.")),
    SAY("Here is a character profile on a card.", IMG("🪪", "A profile lists name, age, looks, likes and wants.")),
    SAY("Time to plan your own. Create a character and a story mountain for them to climb.", ACT("Plan a story", ["Paper and a pencil"], ["Draw a mountain and label opening, build-up, problem, resolution, ending.", "Make a character profile: name, age, looks, likes, wants.", "Write one sentence for each part of the mountain.", "Read your plan to a grown-up."])),
    CHK(mc("What does a character profile include?", "name, looks, likes and wants", ["only the title", "only the setting"], { hint: "Who is the character?", why: "A profile describes who the character is.", tag: "character.profile" })),
    SAY("Let us remember. Plan with a story mountain. Know your character with a profile.", SUM("A story mountain has an opening, build-up, problem, resolution and ending", "A character profile lists who the character is")),
    GLOSS({ "story mountain": "A plan that shapes a story into opening, build-up, problem, resolution and ending.", "character profile": "A description of who a character is.", setting: "Where and when a story happens.", climax: "The most exciting part of a story." }),
  ],
  mini: [
    mc("Where do we meet the characters on a story mountain?", "at the opening", ["at the peak", "after the end"], { hint: "Start of the story.", why: "We meet characters in the opening.", tag: "story.mountain" }),
    tf("A character profile describes who a character is.", true, { hint: "Think about name and likes.", why: "A profile is about the character.", tag: "character.profile" }),
    mc("What is the setting of a story?", "where and when it happens", ["who wrote it", "how long it is"], { hint: "Think about the place.", why: "The setting is where and when a story happens.", tag: "story.setting" }),
  ],
};

const script = {
  id: "script", kind: "play", title: "A short playscript",
  blocks: [
    H("Stop 1: How a playscript looks"),
    SAY("A playscript is a story written to be acted. Each speaker's name goes at the start of the line, followed by a colon. No speech marks are needed. Stage directions, which tell the actors what to do, go in brackets. Look at this scene. Amna colon, Look out! The wave is huge! Then in brackets, she points at the sea.", T("A **playscript** has the speaker's name, a colon, then the words.", "**Stage directions** go in brackets: (she points at the sea).")),
    EXPP("A playscript",
      SS("Here is a line. Amna, then a colon, then her words. Look out! The wave is huge!", S("Amna: Look out! The wave is huge!", ["a", "👧", 50, 50, 3, "bounce", "Amna:"])),
      SS("A stage direction tells the actor what to do. It goes in brackets, like this: she points at the sea.", S("(She points at the sea.)", ["a", "👉", 50, 50, 3, "grow", "(she points)"]))),
    CHK(mc("Which is a stage direction?", "(She runs to the shore.)", ["Amna: Look out!", "Scene one"], { hint: "It is in brackets.", why: "Stage directions are in brackets.", tag: "script.direction" })),
    H("Stop 2: Brain game"),
    SAY("Play the memory game, then think about how you would act a line. Where would you pause? What would your voice sound like?", BRAIN("memory_match", "Drama pairs", "Find the matching pairs.", ["🎭", "👧", "🎬", "🌊", "🪁", "🎣"])),
    CHK(mc("What goes after a speaker's name in a playscript?", "a colon", ["speech marks", "a question mark"], { hint: "Two dots, one above the other.", why: "A colon comes after the name.", tag: "script.layout" })),
    SAY("Let us remember. A playscript has names with colons, and stage directions in brackets.", SUM("A playscript has the speaker's name, a colon and the words", "Stage directions go in brackets")),
    GLOSS({ playscript: "A story written to be acted out.", "stage directions": "Instructions in brackets that tell actors what to do.", colon: "A mark that looks like two dots, used after a speaker's name.", scene: "One part of a play in one place." }),
  ],
  mini: [
    mc("In a playscript, where do stage directions go?", "in brackets", ["in speech marks", "after a question mark"], { hint: "They look like (this).", why: "Stage directions go in brackets.", tag: "script.direction" }),
    tf("A playscript needs speech marks around the words.", false, { hint: "The name and colon show who speaks.", why: "Playscripts use names and colons, not speech marks.", tag: "script.layout" }),
    mc("Who is a playscript written for?", "actors", ["map readers", "cooks"], { hint: "It is acted out.", why: "A playscript is written for actors.", tag: "script.layout" }),
  ],
};

const edit = {
  id: "edit", kind: "use", title: "Edit, improve and read aloud",
  blocks: [
    H("Stop 1: Edit and improve"),
    SAY("Great writing is rarely right the first time. Editors read their work again and make it better. They check spelling and punctuation. They swap dull words for stronger ones. They add detail where a part feels thin. Then they read it aloud to hear the flow. Watch a dull sentence get upgraded.", T("To **edit** is to read your writing again and make it better.", "Check spelling, punctuation, word choices and detail.")),
    EXPP("Upgrading a sentence",
      SS("The first draft: The dog was big and ran. It is fine, but dull.", S("Draft: The dog was big and ran.", ["d", "🐕", 50, 50, 2, "none", "The dog was big and ran."])),
      SS("The edit: The enormous dog sprinted across the field. Stronger words and more detail.", S("Edited: The enormous dog sprinted across the field.", ["d", "🐕", 50, 50, 3, "bounce", "enormous, sprinted, field"]))),
    CHK(mc("Which sentence is the better edit?", "The enormous dog sprinted across the field.", ["The dog was big and ran.", "The dog ran."], { hint: "Which has stronger words and detail?", why: "Enormous, sprinted and field give a clearer picture.", tag: "edit.improve" })),
    H("Stop 2: Read it aloud"),
    SAY("The last step is reading aloud. When we hear our writing, we notice clumsy sentences and missing words. Read with expression, pausing at full stops and changing your voice for questions and exclamations. Then make any final fixes.", T("Reading aloud helps us hear the flow of our writing.")),
    SAY("A writer reading to a friend.", IMG("🎙️", "Reading aloud shows what to fix.")),
    SAY("Choose something you wrote earlier. Edit it, then read it to someone and ask for their feedback.", ACT("Edit and share", ["Something you have written", "A coloured pen", "A listener"], ["Read your writing and underline any dull words.", "Swap them for stronger words.", "Check spelling and punctuation with a coloured pen.", "Read it aloud to a listener and ask for one improvement."])),
    CHK(mc("Why do writers read their work aloud?", "to hear how it flows and spot mistakes", ["to make it shorter", "to impress the teacher"], { hint: "What do we hear?", why: "Reading aloud helps us hear what needs fixing.", tag: "edit.aloud" })),
    SAY("Let us remember. Edit for spelling, punctuation and stronger words. Read aloud to hear the flow.", SUM("Edit: check spelling, punctuation and word choice", "Read aloud to hear the flow")),
    GLOSS({ edit: "To read your writing again and make it better.", draft: "A first version of writing.", flow: "How smoothly the writing reads.", feedback: "Helpful comments from a reader." }),
  ],
  mini: [
    mc("What does an editor do?", "makes writing better", ["draws pictures", "counts pages"], { hint: "Think about improving.", why: "An editor improves writing.", tag: "edit.improve" }),
    tf("A first draft is usually perfect.", false, { hint: "Do writers change their drafts?", why: "Drafts are improved by editing.", tag: "edit.improve" }),
    mc("When reading aloud, how should you read a question?", "with a rising voice", ["in a whisper", "very fast"], { hint: "Think about how a question sounds.", why: "A question sounds like it is asking.", tag: "edit.aloud" }),
  ],
};

const clip = {
  title: "The fruit stall poster", backdrop: "town", caption: "A child designs a poster to persuade people to eat fruit.",
  scenes: [
    { caption: "The stall.", say: "Zara visits a colourful fruit stall. She wants to design a poster.",
      items: [{ id: "z", emoji: "👧", label: "Zara", x: 28, y: 58, size: 3 }, { id: "f", emoji: "🍎", x: 72, y: 56, size: 3 }] },
    { caption: "Purpose.", say: "Her purpose is to persuade people. Her audience is her class.",
      items: [{ id: "t", emoji: "🎯", x: 50, y: 52, size: 3, anim: "pulse" }] },
    { caption: "Alliteration.", say: "Her slogan is crunchy, crisp carrots.",
      items: [{ id: "c", emoji: "🥕", x: 50, y: 54, size: 3, anim: "bounce" }] },
    { caption: "A question.", say: "Who doesn't love a juicy mango?",
      items: [{ id: "m", emoji: "🥭", x: 50, y: 54, size: 3, effect: "glow" }] },
    { caption: "Facts.", say: "She adds a fact. Oranges contain vitamin C.",
      items: [{ id: "o", emoji: "🍊", x: 50, y: 54, size: 3 }] },
    { caption: "Edit.", say: "She checks spelling and punctuation. Then she reads it aloud.",
      items: [{ id: "e", emoji: "🔍", x: 40, y: 56, size: 3 }, { id: "p", emoji: "📄", x: 75, y: 56, size: 3 }] },
    { caption: "A better opening.", say: "She swaps a dull word for a sharper one.",
      items: [{ id: "w", emoji: "✏️", x: 50, y: 54, size: 3, anim: "bounce" }] },
    { caption: "Done.", say: "The poster is bright, clear and persuasive.",
      items: [{ id: "p", emoji: "🖼️", x: 50, y: 54, size: 3, effect: "sparkle" }] },
  ],
};

export const topics = [
  topicLesson({
    slug: "english-class-4-writing-purpose", subject: "english", cls: 4, topic: 4, title: "Writing for a Purpose",
    summary: "Reports, persuasive writing, story mountains and character profiles, playscripts, and editing and reading aloud.",
    unit: "Topic 4: Writing for a purpose", difficulty: 2,
    objectives: ["Write a report and persuasive text", "Plan a story with a story mountain and character profile", "Lay out a short playscript", "Edit, improve and read writing aloud"],
    success_criteria: ["I can write a clear report with headings", "I can write persuasively using reasons", "I can plan a story and a character", "I can edit my writing and read it aloud"],
    real_life: "Writing a school report, a letter to persuade the head teacher and a play for assembly.",
    standards: [
      { framework: "nc_england", code: "Y3/Y4 writing", text: "Plan, draft, edit and perform writing for different purposes, including reports, persuasion, stories and playscripts" },
      { framework: "cambridge", code: "4Ri.05" }, { framework: "cambridge", code: "4Ws.01" }, { framework: "cambridge", code: "4Ws.02" }, { framework: "cambridge", code: "4Wc.02" }, { framework: "cambridge", code: "4Wc.03" }, { framework: "cambridge", code: "4Wc.04" }, { framework: "cambridge", code: "4Wc.05" }, { framework: "cambridge", code: "4Wc.06" }, { framework: "cambridge", code: "4Wp.04" }, { framework: "cambridge", code: "4Wp.05" }, { framework: "cambridge", code: "4SLp.01" },
    ],
    warm_up: [
      mc("What does a simile use to compare?", "like or as", ["because or so", "and or but"], { hint: "Think of the two joining words.", why: "A simile uses like or as." }),
      tf("An opinion can be proved with a book.", false, { hint: "Can people disagree?", why: "Opinions are what people think." }),
      mc("Which is the correct past tense of swim?", "swam", ["swimmed", "swum"], { hint: "It is an irregular verb.", why: "Swim becomes swam." }),
    ],
    intro: [],
    subs: [purposes, story, script, edit],
    clip,
    quiz: [
      Q(mc("Which of these sentences would belong in a report?", "Elephants live in herds.", ["Elephants are the cutest animals ever.", "I think elephants should be everywhere."], { hint: "A report gives facts.", why: "It is a fact in the present tense.", tag: "report.find" }), "purposes", "recall", [
        mc("Pick the sentence that belongs in a report.", "Penguins swim in cold seas.", ["Penguins are the funniest birds.", "Everyone should love penguins."], { hint: "A report gives facts.", why: "It is a fact in the present tense.", tag: "report.find" }),
        mc("Choose the report sentence.", "Honey bees collect nectar from flowers.", ["Bees are my favourite insects.", "Bees should be our national animal."], { hint: "A report gives facts.", why: "It is a fact in the present tense.", tag: "report.find" })]),
      Q(mc("Why does a report use the present tense and headings?", "To give facts clearly and in order", ["To tell a story", "To persuade the reader"], { hint: "What is a report's purpose?", why: "A report presents facts clearly.", tag: "report.reason" }), "purposes", "reason", [
        mc("Why does a report use headings?", "They organise the facts into clear parts", ["They make it longer", "They tell a story"], { hint: "Think about finding facts.", why: "Headings organise a report.", tag: "report.reason" }),
        mc("Why does a report avoid opinions?", "It should give facts the reader can trust", ["Opinions are always wrong", "Opinions are too short"], { hint: "What is a report's purpose?", why: "A report is for facts.", tag: "report.reason" })]),
      Q(fill("Fill in the purposes.", "A {b1} gives facts. {b2} writing tries to convince the reader.", [["report", "playscript", "story"], ["Persuasive", "Factual", "Instruction"]], { hint: "One is facts, one is convincing.", why: "A report gives facts and persuasive writing convinces.", tag: "purpose.match" }), "purposes", "apply", [
        fill("Complete the sentences.", "A {b1} is written to be acted. A {b2} tells facts in order.", [["playscript", "report", "poem"], ["report", "playscript", "letter"]], { hint: "One is acted, one gives facts.", why: "A playscript is acted and a report gives facts.", tag: "purpose.match" }),
        fill("Choose the right words.", "A {b1} plans a story's shape. A {b2} describes who a character is.", [["story mountain", "report", "table"], ["character profile", "stage direction", "heading"]], { hint: "One is shape, one is the character.", why: "A story mountain plans the shape and a profile describes a character.", tag: "purpose.match" })]),
      Q(ms("Which are persuasive techniques? Pick two.", ["a power of three", "giving reasons"], ["a list of facts", "stage directions"], { hint: "Think of what convinces readers.", why: "A power of three and reasons both persuade.", tag: "persuade.find" }), "purposes", "apply", [
        ms("Pick two ways to persuade a reader.", ["asking a question", "using strong words"], ["adding a table", "writing in brackets"], { hint: "Think of what convinces readers.", why: "Questions and strong words both persuade.", tag: "persuade.find" }),
        ms("Choose two persuasive techniques.", ["stating an opinion with reasons", "a power of three"], ["scene numbers", "a contents page"], { hint: "Think of what convinces readers.", why: "Opinion with reasons and a power of three both persuade.", tag: "persuade.find" })]),
      Q(ord("Put the story mountain in order.", ["Opening", "Build-up", "Problem", "Resolution"], { hint: "Start at the bottom.", why: "Opening, build-up, problem, then resolution.", tag: "story.mountain" }), "story", "apply", [
        ord("Order the parts of this story.", ["Amna arrives at the beach", "A wave takes her kite", "She calls for help", "A fisherman returns the kite"], { hint: "Start with the opening.", why: "Arrive, problem, help, rescue.", tag: "story.mountain" }),
        ord("Arrange these events from opening to ending.", ["The twins start a quest", "They find a locked door", "A guard blocks the way", "They find the key and go home"], { hint: "Start with the opening.", why: "Quest, door, guard, then the key.", tag: "story.mountain" })]),
      Q(hot("Tap the part of the story mountain where the problem is.", [["🌄", "opening", 22, 50], ["⛰️", "peak", 50, 50], ["🏠", "ending", 78, 50]], ["peak"], { labels: true, hint: "It is the most exciting part.", why: "The problem is at the peak.", tag: "story.mountain" }), "story", "apply", [
        hot("Tap the part where we meet the characters.", [["🌄", "opening", 22, 50], ["⛰️", "peak", 50, 50], ["🏠", "ending", 78, 50]], ["opening"], { labels: true, hint: "It starts the story.", why: "We meet characters in the opening.", tag: "story.mountain" }),
        hot("Tap the part where things are sorted out.", [["🌄", "opening", 22, 50], ["⛰️", "peak", 50, 50], ["🏠", "ending", 78, 50]], ["ending"], { labels: true, hint: "It finishes the story.", why: "Things are sorted out at the ending.", tag: "story.mountain" })]),
      Q(mc("Why do writers make a character profile before writing?", "To know the character well", ["To make the story longer", "To choose the title"], { hint: "What do we learn?", why: "A profile helps us know a character.", tag: "character.reason" }), "story", "reason", [
        mc("Why do writers plan a story on a story mountain?", "To give the story a clear shape", ["To fill the page", "To add pictures"], { hint: "What does a plan give?", why: "A mountain gives a story its shape.", tag: "character.reason" }),
        mc("Why should we show how a character feels rather than just tell?", "It helps the reader picture and feel it", ["It makes the story shorter", "It adds more names"], { hint: "What does the reader need?", why: "Showing helps readers picture the feeling.", tag: "character.reason" })]),
      Q(mc("Which of these is a setting for a story?", "a beach on a sunny morning", ["a girl called Amna", "a lost kite"], { hint: "Where and when does it happen?", why: "A setting is a place and a time.", tag: "story.setting" }), "story", "recall", [
        mc("Which is the setting of a story?", "a quiet library on a rainy day", ["a boy called Zain", "a missing key"], { hint: "Where and when does it happen?", why: "A setting is a place and a time.", tag: "story.setting" }),
        mc("Pick the setting.", "a busy market at dawn", ["a brave fisherman", "a stolen lantern"], { hint: "Where and when does it happen?", why: "A setting is a place and a time.", tag: "story.setting" })]),
      Q(mat("Match each part of a playscript to its job.", [["Amna:", "shows who is speaking"], ["(she points)", "tells the actor what to do"], ["Scene one", "shows where the play happens"]], { hint: "What does each part do?", why: "Names, directions and scene headings each have a job.", tag: "script.layout" }), "script", "recall", [
        mat("Pair each playscript part with its job.", [["Hamza:", "shows who is speaking"], ["(he laughs)", "tells the actor what to do"], ["Scene two", "shows a new place"]], { hint: "What does each part do?", why: "Names, directions and scene headings each have a job.", tag: "script.layout" }),
        mat("Which job does each playscript part do?", [["Mum:", "names the speaker"], ["(she waves)", "is a stage direction"], ["Scene three", "starts a new scene"]], { hint: "What does each part do?", why: "Names, directions and scene headings each have a job.", tag: "script.layout" })]),
      Q(sld("Slide to show how many speakers there are: Amna: Look! Hamza: Where? Amna: Over there! Mum: Careful!", { min: 0, max: 6 }, 3, 0, { hint: "Count the different names.", why: "Amna, Hamza and Mum speak.", tag: "script.count" }), "script", "apply", [
        sld("Slide to show how many speakers there are: Zain: Ready? Sara: Yes! Zain: Go! Dad: Well done!", { min: 0, max: 6 }, 3, 0, { hint: "Count the different names.", why: "Zain, Sara and Dad speak.", tag: "script.count" }),
        sld("Slide to show how many speakers there are: Ali: Hello! Mina: Hi! Ali: How are you? Mina: Fine!", { min: 0, max: 6 }, 2, 0, { hint: "Count the different names.", why: "Ali and Mina speak.", tag: "script.count" })]),
      Q(mc("Why does a playscript use stage directions?", "To tell actors what to do and how", ["To make the play longer", "To name the writer"], { hint: "What do actors need?", why: "Stage directions guide the actors.", tag: "script.reason" }), "script", "reason", [
        mc("Why does a playscript put the speaker's name before the words?", "So actors know who says each line", ["So it looks tidy", "So it is shorter"], { hint: "What do actors need to know?", why: "The name shows who speaks.", tag: "script.reason" }),
        mc("Why is a playscript laid out differently from a story?", "It is written to be acted, not just read", ["It is shorter", "It has no characters"], { hint: "Who uses it?", why: "A playscript is for actors.", tag: "script.reason" })]),
      Q(st("What do we call a first version of writing, before we edit it? One word, starting with d.", ["draft"], { hint: "It is the first version.", why: "A first version is a draft.", tag: "edit.word" }), "edit", "recall", [
        st("What do we call the mark after a speaker's name in a playscript? One word, starting with c.", ["colon"], { hint: "It looks like two dots.", why: "It is a colon.", tag: "edit.word" }),
        st("What do we call the three-word list that persuades a reader? Power of ... (one word).", ["three", "3"], { hint: "How many words in the list?", why: "It is a power of three.", tag: "edit.word" })]),
      Q(ord("Put the editing steps in order.", ["Read the draft again", "Swap dull words for stronger ones", "Check spelling and punctuation", "Read it aloud"], { hint: "What comes first?", why: "Reread, improve words, check, read aloud.", tag: "edit.steps" }), "edit", "apply", [
        ord("Order the steps for writing a report.", ["Choose a topic", "Research the facts", "Write with headings", "Edit and read aloud"], { hint: "What comes first?", why: "Choose, research, write, edit.", tag: "edit.steps" }),
        ord("Arrange the steps for a persuasive letter.", ["State your opinion", "Give your reasons", "Add a power of three", "Edit and read aloud"], { hint: "What comes first?", why: "Opinion, reasons, power of three, edit.", tag: "edit.steps" })]),
      Q(tf("Editing means making your writing better.", true, { hint: "Think about improving.", why: "Editing improves writing.", tag: "edit.def" }), "edit", "recall", [
        tf("A first draft never needs changing.", false, { hint: "Do writers improve drafts?", why: "Drafts are improved by editing.", tag: "edit.def" }),
        tf("Reading aloud can help you spot mistakes.", true, { hint: "What can we hear?", why: "We hear what does not sound right.", tag: "edit.def" })]),
      Q(mc("Why do writers read their work aloud and ask for feedback?", "To find ways to improve it", ["To make it shorter", "To show it is finished"], { hint: "What does feedback give?", why: "Hearing and feedback show what to improve.", tag: "edit.reason" }), "edit", "reason", [
        mc("Why swap the word big for enormous when editing?", "It gives a stronger picture", ["It is shorter", "It is a fact"], { hint: "What does a stronger word do?", why: "Stronger words give a clearer picture.", tag: "edit.reason" }),
        mc("Why do we check punctuation when editing?", "So the reader can follow our meaning", ["So the page looks full", "So the words are longer"], { hint: "What does punctuation do?", why: "Punctuation helps the reader follow.", tag: "edit.reason" })]),
      // ----- upgrade: 15 new mains (q16-q30), 1 variant each
      Q(st("Write the word that means to try to make someone agree. It starts with p.", ["persuade"], { hint: "What does an advert do?", why: "An advert tries to persuade people.", tag: "purpose.advert" }), "purposes", "recall", [
        st("Write the word for the purpose of a report: to i_____ people. It starts with i.", ["inform"], { hint: "A report gives facts.", why: "A report informs readers.", tag: "purpose.report" })]),
      Q(mc("Which is a rhetorical question for an advert?", "Who doesn't love a juicy mango?", ["What time is it?", "How many mangoes are there?"], { hint: "It does not need a real answer.", why: "A rhetorical question makes the reader think the answer is obvious.", tag: "persuasion.rhetorical" }), "purposes", "apply", [
        mc("Which is a rhetorical question for a healthy snack advert?", "Why would anyone choose anything else?", ["Where is the shop?", "How much is a bag?"], { hint: "It does not need a real answer.", why: "It is meant to make the reader agree.", tag: "persuasion.rhetorical" })]),
      Q(mc("Hina says all adverts sell things. Is she right?", "No, some adverts give public information, like washing hands", ["Yes, every advert sells a product", "Yes, adverts never help people"], { hint: "Think about health posters.", why: "Some adverts persuade people to do something good, not to buy.", tag: "advert.reason" }), "purposes", "reason", [
        mc("Omar says an advert can only be on television. Is he right?", "No, adverts can be posters, leaflets and more", ["Yes, only television", "Yes, only radio"], { hint: "Think about posters.", why: "Adverts come in many forms.", tag: "advert.reason" })]),
      Q(sld("A story mountain has 5 parts. The climax is part 3. Slide to show how many parts come after the climax.", { min: 0, max: 6, unit: "parts" }, 2, 0, { hint: "5 take away 3.", why: "5 - 3 = 2 parts.", tag: "mountain.count" }), "story", "apply", [
        sld("A story mountain has 5 parts. The climax is part 4. Slide to show how many parts come after the climax.", { min: 0, max: 6, unit: "parts" }, 1, 0, { hint: "5 take away 4.", why: "5 - 4 = 1 part.", tag: "mountain.count" })]),
      Q(hot("Tap the exaggeration.", [["1️⃣", "The best fruit in the entire universe!", 22, 50], ["2️⃣", "Apples contain fibre.", 50, 50], ["3️⃣", "Pears can be green or yellow.", 78, 50]], ["The best fruit in the entire universe!"], { labels: true, hint: "Which one is too big to be true?", why: "The entire universe is an exaggeration.", tag: "persuasion.exaggeration" }), "purposes", "apply", [
        hot("Tap the fact.", [["1️⃣", "The tastiest snack ever invented!", 22, 50], ["2️⃣", "Carrots contain vitamin A.", 50, 50], ["3️⃣", "Nothing is better than carrots!", 78, 50]], ["Carrots contain vitamin A."], { labels: true, hint: "Which one can be checked?", why: "That carrots contain vitamin A is a fact.", tag: "persuasion.exaggeration" })]),
      Q(mc("Maryam says every report must be written in the past tense. Is she right?", "No, reports usually use the present tense for facts", ["Yes, always the past", "Yes, never the present"], { hint: "Think about how facts are stated.", why: "A report states facts in the present tense, like Bees live in hives.", tag: "report.reason" }), "purposes", "reason", [
        mc("Ali says a report should tell a story about one day. Is he right?", "No, a report gives facts under headings", ["Yes, reports are stories", "Yes, reports have no headings"], { hint: "Think about the purpose.", why: "A report informs with facts.", tag: "report.reason" })]),
      Q(st("Write the name of the part of a story mountain where the problem is at its biggest.", ["climax", "the climax", "peak", "the peak"], { hint: "It is the top of the mountain.", why: "The climax is the peak of the story.", tag: "mountain.climax" }), "story", "recall", [
        st("Write the name of the part of a story mountain where the problem is solved.", ["resolution", "the resolution", "ending", "the ending"], { hint: "It comes after the climax.", why: "The resolution solves the problem.", tag: "mountain.resolution" })]),
      Q(mc("Idris says persuading means shouting and being rude. Is he right?", "No, good persuasion uses clear reasons and strong, polite words", ["Yes, the louder the better", "Yes, rude words work best"], { hint: "Think about how a good advert sounds.", why: "Persuasion uses reasons and techniques, not rudeness.", tag: "persuasion.reason" }), "purposes", "reason", [
        mc("Hamza says a persuasive writer should never give reasons. Is he right?", "No, reasons make persuasion stronger", ["Yes, never", "Yes, reasons are boring"], { hint: "Think about convincing someone.", why: "Reasons help convince the reader.", tag: "persuasion.reason" })]),
      Q(tf("In a playscript, stage directions tell actors what to do and are often in brackets.", true, { hint: "Think about the script layout.", why: "Stage directions are instructions for actors, written in brackets.", tag: "script.direction" }), "script", "apply", [
        tf("Stage directions are the words the actors say aloud.", false, { hint: "Think about the difference.", why: "Stage directions are instructions, not spoken words.", tag: "script.direction" })]),
      Q(ms("Pick two features of a poster for young children. Pick two.", ["Large bright pictures", "Short simple words"], ["Long paragraphs", "Tiny grey text"], { hint: "Think about the audience.", why: "Young children need simple words and bright pictures.", tag: "audience.poster" }), "purposes", "apply", [
        ms("Pick two features of a poster for adults about a charity run.", ["Clear facts and times", "A strong, simple slogan"], ["Only cartoon pictures", "No details at all"], { hint: "Think about the audience.", why: "Adults need clear facts and a strong message.", tag: "audience.poster" })]),
      Q(mat("Match each phrase to formal or informal.", [["Dear Sir or Madam", "formal"], ["Hiya!", "informal"], ["We regret to inform you", "formal"]], { hint: "Think about the tone.", why: "Dear Sir or Madam and We regret to inform you are formal. Hiya is informal.", tag: "register.match" }), "edit", "apply", [
        mat("Pair each phrase with its tone.", [["Yours faithfully", "formal"], ["Cheers, mate", "informal"], ["Please find attached", "formal"]], { hint: "Think about the tone.", why: "Yours faithfully and Please find attached are formal.", tag: "register.match" })]),
      Q(ord("Sequence the stages of editing.", ["Read the draft", "Fix spelling", "Check punctuation", "Read it aloud"], { hint: "Read before you fix.", why: "Read, fix spelling, check punctuation, then read aloud.", tag: "edit.order" }), "edit", "apply", [
        ord("Order these editing steps.", ["Reread your work", "Improve weak words", "Correct mistakes", "Share with a partner"], { hint: "Reread first.", why: "Reread, improve, correct, then share.", tag: "edit.order" })]),
      Q(fill("Add the missing punctuation.", "Do you like mangoes{b1} I love them{b2}", [["?", ".", "!"], ["!", ".", ","]], { hint: "A question and then an excited statement.", why: "Do you like mangoes? needs a question mark and an excited statement can end with an exclamation mark.", tag: "edit.punct" }), "edit", "apply", [
        fill("Add the missing marks.", "Where is the market{b1} It opens at nine{b2}", [["?", ".", "!"], [".", ",", "?"]], { hint: "A question and then a statement.", why: "Where is the market? needs a question mark. It opens at nine. is a statement.", tag: "edit.punct" })]),
      Q(mc("Which is the stronger opening to a story?", "A cold wind slithered through the broken window.", ["It was a day.", "There was a window."], { hint: "Which one makes you want to read on?", why: "It has a strong verb and a sense of atmosphere.", tag: "edit.opening" }), "edit", "apply", [
        mc("Which opening is stronger?", "Thunder rattled the old shutters as the lights went out.", ["It was night.", "The lights were off."], { hint: "Which one builds atmosphere?", why: "It uses sound and action.", tag: "edit.opening" })]),
      Q(mc("Idris says reading aloud cannot help with editing. Is he right?", "No, reading aloud helps you hear missing words and awkward sentences", ["Yes, it makes no difference", "Yes, editing is only for spelling"], { hint: "What can you hear that you might miss?", why: "Reading aloud shows where writing sounds wrong.", tag: "edit.reason" }), "edit", "reason", [
        mc("Zara says editing only means fixing spelling. Is she right?", "No, editing also improves words, sentences and structure", ["Yes, only spelling", "Yes, nothing else"], { hint: "Think about the full list.", why: "Editing covers spelling, punctuation and wording.", tag: "edit.reason" })]),
    ],
  }),
];
