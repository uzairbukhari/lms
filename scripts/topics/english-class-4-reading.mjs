import { SAY, SS, H, T, IMG, ACT, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, st, ord, mat, fill, hot, sld, PHOTO } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// English topic 3 for Fatima (Class 4): Reading closely. Standards from docs/CURRICULUM_V2.md section 3 (NC Year 3/4 reading, Cambridge Stage 4).
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });

const NOTES = "english-class-4-reading-closely-1-1149b763.jpg";
const TREE = "english-class-4-reading-closely-2-85fc1fbf.jpg";

const infer = {
  id: "infer", kind: "learn", title: "Retrieval and inference",
  blocks: [
    H("Welcome back, close reader!"),
    SAY("Today we read closely. How do we find facts, work out clues and spot big ideas?", T("Today's big question: how do readers find clues and big ideas?")),
    SAY("Readers keep notes and look for evidence in the text. Handwritten notes like these can record clues.", PHOTO(NOTES, "An old open notebook filled with handwritten ink notes on both pages", "Readers often make notes and find evidence in the text.", "Photo by Gabriela on Unsplash")),
    H("Stop 1: Retrieval"),
    SAY("Reading closely means going back to the text. Retrieval is finding a fact that is stated right there in the words. Read this: Mina packed a torch, two sandwiches and a map. She set off at dawn. When did Mina set off? Dawn. The answer is written in the text, and we just have to find it. Scan for the key word.", T("**Retrieval** means finding a fact written in the text.", "Mina packed a torch, two sandwiches and a map. She set off at dawn.")),
    EXPP("Find it in the text",
      SS("Here is the question: when did Mina set off? The key word is set off.", S("Question: when did Mina set off?", ["q", "❓", 50, 40, 3, "pulse", "when?"])),
      SS("Scan the text for set off. She set off at dawn. The answer is dawn.", S("Answer: dawn.", ["a", "🌅", 50, 50, 3, "grow", "dawn"]))),
    CHK(mc("Mina packed a torch, two sandwiches and a map. How many sandwiches did she pack?", "two", ["three", "one"], { hint: "Scan for sandwiches.", why: "The text says she packed two sandwiches.", tag: "retrieval.find" })),
    H("Stop 2: Inference"),
    SAY("Inference is different. The author does not tell us everything. We work it out from clues in the text and from what we already know. Omar slammed the door and stomped upstairs. It does not say he was angry. But slamming and stomping are clues. We infer that he was angry. And a good reader gives the evidence.", T("**Inference** means working out what is not said, using clues and what you know.", "Omar slammed the door and stomped upstairs. He was angry. Evidence: slammed, stomped.")),
    EXPP("Reading the clues",
      SS("Omar slammed the door and stomped upstairs. What are the clues?", S("Clues: slammed, stomped.", ["o", "🚪", 30, 50, 3, "bounce", "slammed"], ["s", "🦶", 70, 50, 3, "bounce", "stomped"])),
      SS("Slamming and stomping are things we do when we are cross. So we infer that Omar is angry, and we give our evidence.", S("Omar is angry.", ["o", "😠", 50, 50, 3, "grow", "angry"]))),
    CHK(mc("Aisha shivered and pulled her scarf tighter. What can we infer?", "She is cold", ["She is hot", "She is hungry"], { hint: "Why do we shiver?", why: "Shivering and pulling a scarf tighter are clues she is cold.", tag: "inference.find" })),
    SAY("Let us remember. Retrieval finds facts stated in the text. Inference works out what is not said, with evidence.", SUM("Retrieval: find the fact written in the text", "Inference: use clues and evidence to work out what is not said")),
    GLOSS({ retrieval: "Finding a fact that is written in the text.", inference: "Working out something that is not said, using clues.", evidence: "The words in the text that prove your answer.", scan: "To look quickly through a text for a key word." }),
  ],
  mini: [
    mc("Zain fed the ducks at the pond on Sunday. Where did he feed the ducks?", "at the pond", ["at school", "at the shop"], { hint: "Scan for where.", why: "The text says at the pond.", tag: "retrieval.find" }),
    mc("Hana yawned and rubbed her eyes. What can we infer?", "She is sleepy", ["She is excited", "She is angry"], { hint: "Why do we yawn?", why: "Yawning and rubbing eyes are clues she is sleepy.", tag: "inference.find" }),
    tf("Inference means copying a fact straight from the text.", false, { hint: "Which one is retrieval?", why: "Copying a fact is retrieval. Inference uses clues.", tag: "inference.def" }),
  ],
};

const fact = {
  id: "fact", kind: "try", title: "Fact and opinion",
  blocks: [
    H("Stop 1: Fact or opinion?"),
    SAY("A fact can be proved true. Lahore is a city in Pakistan. You can check it in an atlas. An opinion is what someone thinks or feels. Lahore is the best city. Someone else might disagree. Words like best, worst, boring and tastiest often show an opinion. Let's sort some sentences.", T("A **fact** can be checked and proved.", "An **opinion** is what someone thinks or feels. Best, worst and tastiest are opinion words.")),
    EXPP("Fact or opinion?",
      SS("Lahore is a city in Pakistan. Can we check it? Yes, in an atlas. That is a fact.", S("Fact: it can be checked.", ["f", "🗺️", 50, 50, 3, "grow", "fact"])),
      SS("Mangoes are the tastiest fruit. Can we prove it? No, because people like different fruits. That is an opinion.", S("Opinion: people can disagree.", ["o", "🥭", 50, 50, 3, "grow", "opinion"]))),
    CHK(mc("Which sentence is a fact?", "A week has seven days.", ["Mondays are the worst.", "Winter is boring."], { hint: "Which can be proved?", why: "A week has seven days is true and can be checked.", tag: "fact.find" })),
    H("Stop 2: Test it yourself"),
    SAY("Be a fact checker. Write three sentences about your favourite animal. Make some facts and some opinions. Then swap with someone and see if they can sort them.", ACT("Fact checkers", ["Paper and a pencil", "A book about animals"], ["Write two facts about an animal, from a book.", "Write two opinions about the same animal.", "Underline any opinion words, like best or cutest.", "Ask a grown-up to sort them into facts and opinions."])),
    SAY("A fact checker uses evidence.", IMG("🔎", "Facts can be checked. Opinions are what people think.")),
    CHK(mc("Which word is a clue that a sentence is an opinion?", "best", ["Tuesday", "seven"], { hint: "Which word says what someone thinks?", why: "Best shows what someone thinks, not a fact.", tag: "opinion.clue" })),
    SAY("Let us remember. Facts can be proved. Opinions are what people think.", SUM("A fact can be checked and proved", "An opinion is what someone thinks, and people can disagree")),
    GLOSS({ fact: "Something that can be checked and proved true.", opinion: "What someone thinks or feels.", prove: "To show that something is true.", disagree: "To think something different." }),
  ],
  mini: [
    mc("Which sentence is an opinion?", "Cricket is more fun than hockey.", ["Cricket has eleven players.", "A cricket match has two teams."], { hint: "Which one says what someone feels?", why: "More fun is what someone thinks, so it is an opinion.", tag: "fact.find" }),
    tf("An opinion can be proved with a book.", false, { hint: "Can people disagree?", why: "Opinions are what people think, so they cannot be proved.", tag: "opinion.clue" }),
    mc("Which word often shows an opinion?", "tastiest", ["Monday", "ten"], { hint: "Which word says what someone thinks?", why: "Tastiest shows an opinion.", tag: "opinion.clue" }),
  ],
};

const theme = {
  id: "theme", kind: "play", title: "Theme and viewpoint",
  blocks: [
    H("Stop 1: Theme"),
    SAY("A theme is the big idea behind a story. It is the message the author wants us to think about. In the story of the tortoise and the hare, the tortoise never gives up and wins the race. The theme is perseverance, which means keeping going. A theme is not what happens, it is what the story is really about.", T("A **theme** is the big idea behind a story, like perseverance, kindness or honesty.")),
    EXPP("Finding the theme",
      SS("The tortoise is slow, but he keeps going and going.", S("The tortoise never stops.", ["t", "🐢", 40, 55, 3, "bounce", "keeps going"])),
      SS("He wins the race. The big idea, the theme, is perseverance: if you keep trying, you can succeed.", S("Theme: perseverance.", ["t", "🏆", 50, 50, 3, "grow", "perseverance"]))),
    CHK(mc("A boy shares his lunch with a hungry friend. What is the theme?", "kindness", ["speed", "money"], { hint: "What is the big idea?", why: "Sharing shows kindness.", tag: "theme.find" })),
    H("Stop 2: Viewpoint and a brain game"),
    SAY("Many readers love to read under a tree. Quiet time helps us think about clues.", PHOTO(TREE, "A reader sitting against a tree trunk in a park, holding an open book", "Reading under a tree gives time to think about clues.", "Photo by roma on Unsplash")),
    SAY("Viewpoint is whose eyes we see the story through. In first person, the narrator says I. I crept into the cave, my heart pounding. We feel what the narrator feels. And two characters can see the same event very differently. Play the memory game, then think about viewpoint.", T("**Viewpoint** is how a character or narrator sees events. The narrator is the one telling the story.")),
    BRAIN("memory_match", "Feelings match", "Find the matching pairs.", ["😄", "😨", "😠", "😢", "🤩", "😴"]),
    CHK(mc("Mina loves the rain but Zain hates it. Why do they see it differently?", "They have different feelings", ["One of them is wrong", "The rain changed"], { hint: "Think about their feelings.", why: "People can see the same event differently.", tag: "viewpoint.find" })),
    SAY("Let us remember. A theme is the big idea. Viewpoint is whose eyes we see through.", SUM("A theme is the big idea behind a story", "Viewpoint is whose eyes we see the story through")),
    GLOSS({ theme: "The big idea or message of a story.", viewpoint: "How a character or narrator sees events.", narrator: "The person or voice telling the story.", perseverance: "Keeping going even when it is hard." }),
  ],
  mini: [
    mc("A girl tells the truth even when it is hard. What is the theme?", "honesty", ["speed", "cooking"], { hint: "What is the big idea?", why: "Telling the truth shows honesty.", tag: "theme.find" }),
    mc("What is a narrator?", "the one telling the story", ["the title", "the last page"], { hint: "Who tells the story?", why: "The narrator tells the story.", tag: "viewpoint.def" }),
    tf("Two characters can see the same event differently.", true, { hint: "Think about different feelings.", why: "Each character has their own viewpoint.", tag: "viewpoint.find" }),
  ],
};

const devices = {
  id: "devices", kind: "use", title: "Poetry devices",
  blocks: [
    H("Stop 1: Sound patterns"),
    SAY("Poets use tools to make words sound brilliant. Alliteration repeats the same first sound: slippery snake slid silently. Onomatopoeia is a word that sounds like its meaning: buzz, crash, pop. Both make poems fun to read aloud. Let's hear them.", T("**Alliteration** repeats a first sound: slippery snake slid silently.", "**Onomatopoeia** is a word that sounds like its meaning: buzz, crash, pop.")),
    EXPP("Sound tools",
      SS("Slippery snake slid silently. All those s sounds. That is alliteration.", S("Alliteration: s s s.", ["s", "🐍", 50, 50, 3, "bounce", "slippery snake slid silently"])),
      SS("Buzz! The word buzz sounds just like a bee. That is onomatopoeia.", S("Onomatopoeia: buzz.", ["b", "🐝", 50, 50, 3, "bounce", "buzz"]))),
    CHK(mc("Which phrase uses alliteration?", "big brown bears bounce", ["the bears were big", "a brown bear sat"], { hint: "Which repeats a first sound?", why: "Big brown bears bounce repeats the b sound.", tag: "device.alliteration" })),
    H("Stop 2: Giving life to things"),
    SAY("Personification gives human actions to things that are not human. The wind whispered. The sun smiled down. Of course the wind cannot really whisper, but it makes the picture come alive. Try writing one yourself.", T("**Personification** gives human actions to things, like the wind whispered.")),
    SAY("Here is the wind with a voice.", IMG("🌬️", "The wind whispered through the trees.")),
    SAY("Have a go at writing your own. Choose an object and give it a human action, then add a sound word.", ACT("Poet's toolkit", ["Paper and a pencil"], ["Choose something outside, like the sun or the rain.", "Write one sentence that gives it a human action.", "Add a sound word, like splash or whoosh.", "Read it aloud and enjoy the sounds."])),
    CHK(mc("Which sentence uses personification?", "The sun smiled down on us", ["The sun is hot", "The sun is far away"], { hint: "Which gives the sun a human action?", why: "A sun cannot smile, so this gives it a human action.", tag: "device.personification" })),
    SAY("Let us remember. Alliteration repeats sounds. Onomatopoeia sounds like its meaning. Personification gives human actions to things.", SUM("Alliteration repeats a first sound", "Onomatopoeia sounds like its meaning", "Personification gives human actions to things")),
    GLOSS({ alliteration: "Words that repeat the same first sound.", onomatopoeia: "A word that sounds like what it means, like buzz.", personification: "Giving human actions or feelings to something that is not human.", poet: "Someone who writes poems." }),
  ],
  mini: [
    mc("Which word is onomatopoeia?", "splash", ["water", "puddle"], { hint: "Which sounds like the noise?", why: "Splash sounds like the noise it describes.", tag: "device.onomatopoeia" }),
    mc("Which phrase uses alliteration?", "tiny turtles tiptoed", ["the turtle walked", "turtles are slow"], { hint: "Which repeats a first sound?", why: "Tiny turtles tiptoed repeats the t sound.", tag: "device.alliteration" }),
    tf("The clouds danced across the sky uses personification.", true, { hint: "Can clouds really dance?", why: "Giving clouds a human action is personification.", tag: "device.personification" }),
  ],
};

const clip = {
  title: "Reading under the tree", backdrop: "meadow", caption: "A reader looks for clues and evidence in a story.",
  scenes: [
    { caption: "A tree.", say: "Maryam sits under a tree with a good book.",
      items: [{ id: "m", emoji: "👧", label: "Maryam", x: 30, y: 58, size: 3 }, { id: "t", emoji: "🌳", x: 72, y: 50, size: 3 }] },
    { caption: "Retrieval.", say: "The text says Mina set off at dawn. That is retrieval.",
      items: [{ id: "b", emoji: "📖", x: 50, y: 56, size: 3 }, { id: "s", emoji: "🌅", x: 78, y: 28, size: 2 }] },
    { caption: "Inference.", say: "Omar slammed the door. She infers that he was angry.",
      items: [{ id: "d", emoji: "🚪", x: 35, y: 56, size: 3, anim: "bounce" }, { id: "a", emoji: "😠", x: 72, y: 50, size: 3 }] },
    { caption: "Evidence.", say: "She finds a line as evidence. Stomped upstairs proves it.",
      items: [{ id: "e", emoji: "🔍", x: 50, y: 56, size: 3, anim: "pulse" }] },
    { caption: "Opinion.", say: "The most exciting city is an opinion, not a fact.",
      items: [{ id: "o", emoji: "💭", x: 50, y: 40, size: 3 }] },
    { caption: "Theme.", say: "The story shows that kindness matters. That is the theme.",
      items: [{ id: "k", emoji: "🤝", x: 50, y: 56, size: 3, effect: "glow" }] },
    { caption: "Sound.", say: "Crash! The poem uses a sound word.",
      items: [{ id: "c", emoji: "💥", x: 50, y: 50, size: 3, anim: "pulse" }] },
    { caption: "Prediction.", say: "The title is The Last Lantern. What will happen?",
      items: [{ id: "l", emoji: "🏮", x: 50, y: 50, size: 3, effect: "sparkle" }] },
  ],
};

export const topics = [
  topicLesson({
    slug: "english-class-4-reading-closely", subject: "english", cls: 4, topic: 3, title: "Reading Closely",
    summary: "Retrieval and inference, fact and opinion, theme and viewpoint, and poetry devices.",
    unit: "Topic 3: Reading closely", difficulty: 2,
    objectives: ["Retrieve facts and make inferences with evidence", "Tell fact from opinion", "Identify theme and viewpoint", "Spot alliteration, onomatopoeia and personification"],
    success_criteria: ["I can find a fact in a text and give evidence for an inference", "I can tell a fact from an opinion", "I can say the theme of a story", "I can name poetry devices"],
    real_life: "Checking whether something you read online is true, and enjoying poems.",
    standards: [
      { framework: "nc_england", code: "Y3/Y4 reading", text: "Retrieve and record information, draw inferences with evidence, identify themes and recognise some different forms of poetry" },
      { framework: "cambridge", code: "4Ri.07" }, { framework: "cambridge", code: "4Ri.09" }, { framework: "cambridge", code: "4Ri.11" }, { framework: "cambridge", code: "4Ri.12" }, { framework: "cambridge", code: "4Ri.14" }, { framework: "cambridge", code: "4Ri.15" }, { framework: "cambridge", code: "4Ri.16" }, { framework: "cambridge", code: "4Ri.17" }, { framework: "cambridge", code: "4Ra.04" }, { framework: "cambridge", code: "4Rv.08" },
    ],
    warm_up: [
      mc("What does a simile use to compare?", "like or as", ["because or so", "and or but"], { hint: "Think of the two joining words.", why: "A simile uses like or as." }),
      tf("A noun is a naming word.", true, { hint: "Think of cat, school, Lahore.", why: "A noun names a person, place or thing." }),
      mc("Which is a synonym for big?", "huge", ["tiny", "narrow"], { hint: "Which means large?", why: "Big and huge both mean large." }),
    ],
    intro: [],
    subs: [infer, fact, theme, devices],
    clip,
    quiz: [
      Q(mc("Read: Mina packed a torch, a map and a flask of tea. She set off at noon. What time did Mina set off?", "noon", ["dawn", "midnight"], { hint: "Scan for set off.", why: "The text says she set off at noon.", tag: "retrieval.find" }), "infer", "recall", [
        mc("Read: Bilal fed the goats and collected three eggs. He finished before breakfast. What did Bilal collect?", "three eggs", ["two apples", "four books"], { hint: "Scan for collected.", why: "The text says he collected three eggs.", tag: "retrieval.find" }),
        mc("Read: Sana painted a blue boat on the wall of the library. The librarian clapped. Where did Sana paint the boat?", "on the library wall", ["on a canvas", "on the floor"], { hint: "Scan for painted.", why: "The text says she painted it on the wall of the library.", tag: "retrieval.find" })]),
      Q(mc("Omar slammed the door and stomped upstairs. Which words are the best evidence that he is angry?", "slammed the door and stomped", ["went upstairs", "Omar"], { hint: "Which actions show anger?", why: "Slamming and stomping are things we do when angry.", tag: "inference.evidence" }), "infer", "reason", [
        mc("Hana's eyes filled with tears and her voice wobbled. Which words are the best evidence that she is sad?", "eyes filled with tears and her voice wobbled", ["Hana", "her voice"], { hint: "Which actions show sadness?", why: "Tears and a wobbly voice are clues to sadness.", tag: "inference.evidence" }),
        mc("Ali jumped up, grinning from ear to ear. Which words are the best evidence that he is delighted?", "jumped up, grinning from ear to ear", ["Ali", "from"], { hint: "Which actions show delight?", why: "Jumping and grinning are clues to delight.", tag: "inference.evidence" })]),
      Q(fill("Complete the definitions.", "Finding a fact written in the text is called {b1}. Working out what is not said, using clues, is called {b2}.", [["retrieval", "inference", "prediction"], ["inference", "retrieval", "summary"]], { hint: "One finds, one works out.", why: "Retrieval finds facts. Inference uses clues.", tag: "retrieval.def" }), "infer", "apply", [
        fill("Fill in the gaps.", "Looking for the answer in the words on the page is {b1}. Using clues plus what you know is {b2}.", [["retrieval", "inference", "revision"], ["inference", "retrieval", "repetition"]], { hint: "One finds, one works out.", why: "Retrieval finds facts. Inference uses clues.", tag: "retrieval.def" }),
        fill("Choose the right words.", "A question answered by a fact in the text needs {b1}. A question needing clues needs {b2}.", [["retrieval", "inference", "rhyme"], ["inference", "retrieval", "rhythm"]], { hint: "One finds, one works out.", why: "Retrieval finds facts. Inference uses clues.", tag: "retrieval.def" })]),
      Q(ms("Read: Zain fed the ducks at the pond on Sunday. He was very pleased. Which questions can be answered by retrieval? Pick two.", ["Where did Zain feed the ducks?", "When did Zain feed the ducks?"], ["What will Zain do next week?", "Why does Zain love ducks?"], { hint: "Which answers are written in the text?", why: "The pond and Sunday are both stated in the text.", tag: "retrieval.find" }), "infer", "apply", [
        ms("Read: Ayesha baked a lemon cake on Friday for her gran. Which questions can be answered by retrieval? Pick two.", ["What did Ayesha bake?", "When did Ayesha bake it?"], ["What will gran say?", "How does Ayesha feel about gran?"], { hint: "Which answers are written in the text?", why: "The lemon cake and Friday are both stated.", tag: "retrieval.find" }),
        ms("Read: Hamza kicked the ball over the wall at the park. Which questions can be answered by retrieval? Pick two.", ["What did Hamza kick?", "Where did Hamza kick the ball?"], ["Will Hamza get the ball back?", "Is Hamza good at football?"], { hint: "Which answers are written in the text?", why: "The ball and the park are both stated.", tag: "retrieval.find" })]),
      Q(ord("Put the steps in order to decide fact or opinion.", ["Read the sentence", "Ask: can it be proved?", "Check a trusted source", "Decide: fact or opinion"], { hint: "What do we do first?", why: "Read, ask, check, decide.", tag: "fact.steps" }), "fact", "apply", [
        ord("Put the steps in order to make an inference.", ["Read the clue", "Think what you already know", "Work out what is not said", "Check it fits the text"], { hint: "What do we do first?", why: "Clue, knowledge, inference, check.", tag: "fact.steps" }),
        ord("Arrange the steps for retrieving an answer.", ["Read the question", "Find the key word", "Scan the text for it", "Copy the answer from the text"], { hint: "What do we do first?", why: "Question, key word, scan, copy.", tag: "fact.steps" })]),
      Q(tf("Mangoes are the tastiest fruit is an opinion.", true, { hint: "Can people disagree?", why: "Tastiest shows what someone thinks.", tag: "fact.find" }), "fact", "recall", [
        tf("A week has seven days is an opinion.", false, { hint: "Can it be checked?", why: "It is a fact that can be checked.", tag: "fact.find" }),
        tf("Football is more fun than cricket is an opinion.", true, { hint: "Can people disagree?", why: "More fun is what someone thinks.", tag: "fact.find" })]),
      Q(mc("Why is Maths is the hardest subject an opinion?", "People can disagree because it is what someone thinks", ["It can be proved true", "It has a number in it"], { hint: "Can everyone agree?", why: "Opinions are what people think, so people can disagree.", tag: "fact.reason" }), "fact", "reason", [
        mc("Why is The Earth orbits the Sun a fact?", "It can be checked and proved", ["It is what someone feels", "It is a short sentence"], { hint: "Can we prove it?", why: "Facts can be checked and proved.", tag: "fact.reason" }),
        mc("Why do words like best and worst often show an opinion?", "They show what someone thinks, not what can be proved", ["They are long words", "They are always facts"], { hint: "Can we prove best?", why: "Best and worst are judgements, not facts.", tag: "fact.reason" })]),
      Q(mat("Match each story to its theme.", [["A tortoise keeps going and beats a hare", "perseverance"], ["A boy shares his lunch with a hungry friend", "kindness"], ["A girl tells the truth even when it is hard", "honesty"]], { hint: "What is the big idea of each?", why: "Keeping going is perseverance, sharing is kindness, truth is honesty.", tag: "theme.find" }), "theme", "recall", [
        mat("Which theme goes with each story?", [["Ants work together to carry food", "teamwork"], ["A boy returns a lost purse", "honesty"], ["A girl keeps practising until she can swim", "perseverance"]], { hint: "What is the big idea of each?", why: "Working together is teamwork, returning a purse is honesty, practising is perseverance.", tag: "theme.find" }),
        mat("Pair each story with its theme.", [["Neighbours help each other after a flood", "community"], ["A boy says sorry and shares his toys", "kindness"], ["A runner finishes the race even though she is tired", "perseverance"]], { hint: "What is the big idea of each?", why: "Helping neighbours is community, sharing is kindness, finishing is perseverance.", tag: "theme.find" })]),
      Q(hot("Tap the picture that shows how the narrator feels: I crept into the cave, my heart pounding.", [["😨", "scared", 22, 50], ["😴", "sleepy", 50, 50], ["😄", "joyful", 78, 50]], ["scared"], { labels: true, hint: "What does a pounding heart show?", why: "Creeping and a pounding heart are clues to fear.", tag: "viewpoint.feeling" }), "theme", "apply", [
        hot("Tap the picture that shows how the narrator feels: I jumped up and down when I heard the news.", [["🤩", "excited", 22, 50], ["😢", "sad", 50, 50], ["😠", "angry", 78, 50]], ["excited"], { labels: true, hint: "What does jumping up and down show?", why: "Jumping up and down is a clue to excitement.", tag: "viewpoint.feeling" }),
        hot("Tap the picture that shows how the narrator feels: I stared at my empty plate and sighed.", [["😔", "disappointed", 22, 50], ["😄", "joyful", 50, 50], ["😡", "furious", 78, 50]], ["disappointed"], { labels: true, hint: "What does a sigh show?", why: "Staring and sighing are clues to disappointment.", tag: "viewpoint.feeling" })]),
      Q(sld("Slide to show how many different viewpoints there are: Hamza thinks homework is useful. Aisha thinks it is boring. Dad thinks it should be shorter.", { min: 0, max: 6 }, 3, 0, { hint: "Count each person's view.", why: "Three people each have a different view.", tag: "viewpoint.count" }), "theme", "apply", [
        sld("Slide to show how many different viewpoints there are: Ali wants pizza. Sara wants rice. Mum wants soup. Dad wants pasta.", { min: 0, max: 6 }, 4, 0, { hint: "Count each person's view.", why: "Four people each want something different.", tag: "viewpoint.count" }),
        sld("Slide to show how many different viewpoints there are: Mina likes the rain. Zain hates it.", { min: 0, max: 6 }, 2, 0, { hint: "Count each person's view.", why: "Two people have different views.", tag: "viewpoint.count" })]),
      Q(mc("Why might two characters see the same event differently?", "They have different feelings and experiences", ["One of them is wrong", "The event changed"], { hint: "Think about each person.", why: "Each character has their own feelings and experiences.", tag: "viewpoint.reason" }), "theme", "reason", [
        mc("Why does the theme of a story matter?", "It is the big idea the author wants us to think about", ["It is the longest word", "It is the title page"], { hint: "What is a theme?", why: "The theme is the big idea behind the story.", tag: "viewpoint.reason" }),
        mc("Why does the narrator's viewpoint change how a story feels?", "We only see events through their eyes", ["The narrator changes the pictures", "The narrator writes the page numbers"], { hint: "Whose eyes do we use?", why: "We see the story through the narrator's eyes.", tag: "viewpoint.reason" })]),
      Q(mc("Find the alliteration: which phrase uses it?", "slippery snake slid silently", ["the snake was long", "a green snake"], { hint: "Which repeats a first sound?", why: "Slippery snake slid silently repeats the s sound.", tag: "device.alliteration" }), "devices", "recall", [
        mc("Pick the phrase that uses alliteration.", "big brown bears bounce", ["the bears are brown", "a big bear sat"], { hint: "Which repeats a first sound?", why: "Big brown bears bounce repeats the b sound.", tag: "device.alliteration" }),
        mc("Spot the alliteration: which phrase has it?", "peaceful pandas play pleasantly", ["pandas eat bamboo", "a black and white panda"], { hint: "Which repeats a first sound?", why: "Peaceful pandas play pleasantly repeats the p sound.", tag: "device.alliteration" })]),
      Q(fill("Choose the correct terms.", "A word that sounds like its meaning, like buzz, is {b1}. Giving human actions to objects is {b2}.", [["onomatopoeia", "alliteration", "a simile"], ["personification", "a metaphor", "rhyme"]], { hint: "One is about sounds, one about human actions.", why: "Buzz is onomatopoeia. Giving objects human actions is personification.", tag: "device.terms" }), "devices", "apply", [
        fill("Complete the poetry terms.", "Words that repeat a first sound are {b1}. Saying the wind whispered is {b2}.", [["alliteration", "onomatopoeia", "a simile"], ["personification", "a metaphor", "rhyme"]], { hint: "One is about sounds, one about human actions.", why: "Repeating first sounds is alliteration. The wind whispering is personification.", tag: "device.terms" }),
        fill("Fill in the poetry terms.", "The word crash is {b1}. Saying the sun smiled is {b2}.", [["onomatopoeia", "alliteration", "a simile"], ["personification", "a metaphor", "rhyme"]], { hint: "One is about sounds, one about human actions.", why: "Crash is onomatopoeia. The sun smiling is personification.", tag: "device.terms" })]),
      Q(st("Which sound word fits? The bees ___ around the flowers (starts with b).", ["buzzed", "buzz", "buzzing"], { hint: "What noise does a bee make?", why: "Buzzed sounds like the noise bees make.", tag: "device.onomatopoeia" }), "devices", "apply", [
        st("Which sound word fits? The clock went ___ (starts with t) all night.", ["tick", "ticked", "ticking", "tock", "tick-tock"], { hint: "What noise does a clock make?", why: "Tick sounds like a clock.", tag: "device.onomatopoeia" }),
        st("Which sound word fits? The balloon went ___ (starts with p) and burst.", ["pop", "popped"], { hint: "What noise does a balloon make?", why: "Pop sounds like a bursting balloon.", tag: "device.onomatopoeia" })]),
      Q(mc("Why does a poet write the wind whispered instead of the wind blew?", "It gives the wind a gentle, human voice", ["It is shorter", "It is a fact"], { hint: "What does whispered add?", why: "Personification makes the picture come alive.", tag: "device.reason" }), "devices", "reason", [
        mc("Why does a writer use crash to describe a falling tray?", "The word sounds like the noise, so we can hear it", ["It is a longer word", "It is a describing word"], { hint: "What does the word sound like?", why: "Onomatopoeia lets us hear the sound.", tag: "device.reason" }),
        mc("Why does a poet repeat slippery, slithering snake?", "Alliteration makes a sound pattern that adds rhythm", ["It makes the poem shorter", "It is a fact about snakes"], { hint: "What do the repeated sounds do?", why: "Repeated first sounds make a pattern and rhythm.", tag: "device.reason" })]),
      // ----- upgrade: 15 new mains (q16-q30), 1 variant each
      Q(mc("Which question needs inference?", "How did Omar feel when he slammed the door?", ["What did Omar slam?", "When did Omar leave?"], { hint: "The text does not say it directly.", why: "We work out Omar's feelings from clues, so it needs inference.", tag: "infer.type" }), "infer", "apply", [
        mc("Which question can be answered by retrieval?", "What did Mina pack in her bag?", ["Why was Mina nervous?", "What will Mina do next year?"], { hint: "The answer is written in the text.", why: "Retrieval finds facts stated in the text.", tag: "infer.type" })]),
      Q(mat("Match each line to what it shows.", [["Omar slammed the door.", "anger"], ["Mina packed a torch and a map.", "preparation"], ["She smiled and waved.", "happiness"]], { hint: "Think about what each action suggests.", why: "Actions give evidence of feelings and plans.", tag: "infer.evidence" }), "infer", "apply", [
        mat("Pair each line with what it shows.", [["He trembled and hid.", "fear"], ["She checked her list twice.", "care"], ["They cheered and jumped.", "excitement"]], { hint: "Think about what each action suggests.", why: "Actions give evidence of feelings.", tag: "infer.evidence" })]),
      Q(mc("Maryam says a myth must be ancient. Is she right?", "No, writers also create modern myths in the style of old ones", ["Yes, every myth is thousands of years old", "Yes, new stories cannot be myths"], { hint: "Think about stories like Arthur and the Golden Rope.", why: "A modern myth is a new story that uses features of traditional myths.", tag: "theme.myth" }), "theme", "reason", [
        mc("Hamza says folklore only comes from long ago. Is he right?", "No, new tales are still told and shared", ["Yes, it must be ancient", "Yes, only museums have folklore"], { hint: "Think about stories families tell today.", why: "Folklore keeps growing as people share new stories.", tag: "theme.myth" })]),
      Q(tf("A character who shares her food with a stranger shows the theme of kindness.", true, { hint: "Think about what sharing shows.", why: "Sharing with a stranger shows kindness.", tag: "theme.find" }), "theme", "apply", [
        tf("A hero who faces danger bravely shows the theme of laziness.", false, { hint: "Think about what facing danger shows.", why: "Facing danger shows courage, not laziness.", tag: "theme.find" })]),
      Q(ms("Which two sentences show the author's viewpoint? Pick two.", ["Sadly, nobody visits the beautiful old library.", "It was clearly the worst idea ever."], ["The library opens at nine.", "The library has two floors."], { hint: "Look for words that show a judgement.", why: "Sadly, beautiful and worst show opinions.", tag: "viewpoint.find" }), "theme", "apply", [
        ms("Pick the two sentences that show a viewpoint.", ["What a wonderful, peaceful garden!", "Obviously, the plan was foolish."], ["The garden has a gate.", "The plan began at noon."], { hint: "Look for words that show feeling.", why: "Wonderful and foolish show opinions.", tag: "viewpoint.find" })]),
      Q(hot("Tap the opinion.", [["1️⃣", "Lahore is a city in Punjab.", 22, 50], ["2️⃣", "Lahore is the most exciting city.", 50, 50], ["3️⃣", "Lahore has a fort.", 78, 50]], ["Lahore is the most exciting city."], { labels: true, hint: "Can it be proved?", why: "Most exciting is a view, not a fact.", tag: "fact.opinion" }), "fact", "apply", [
        hot("Tap the fact.", [["1️⃣", "Everyone should visit Murree.", 22, 50], ["2️⃣", "Murree is in the mountains.", 50, 50], ["3️⃣", "Murree is the loveliest place.", 78, 50]], ["Murree is in the mountains."], { labels: true, hint: "Can it be checked?", why: "Murree being in the mountains can be checked.", tag: "fact.opinion" })]),
      Q(st("Write the sound that repeats at the start of: slippery snakes slid silently.", ["s", "S"], { hint: "Look at the first letters.", why: "The s sound repeats, which is alliteration.", tag: "alliteration.find" }), "devices", "apply", [
        st("Write the sound that repeats at the start of: Peter picked pink petals.", ["p", "P"], { hint: "Look at the first letters.", why: "The p sound repeats, which is alliteration.", tag: "alliteration.find" })]),
      Q(mc("Choose the onomatopoeic word.", "crash", ["table", "gentle"], { hint: "It copies a sound.", why: "Crash sounds like the noise it names.", tag: "onomatopoeia.find" }), "devices", "apply", [
        mc("Pick the word that imitates a sound.", "sizzle", ["sleepy", "window"], { hint: "It copies a sound.", why: "Sizzle sounds like the noise it names.", tag: "onomatopoeia.find" })]),
      Q(mc("Hamza says an author's viewpoint is always a fact. Is he right?", "No, a viewpoint is what the author thinks, and it may be an opinion", ["Yes, every viewpoint is true", "Yes, authors only write facts"], { hint: "Is it what someone thinks?", why: "A viewpoint is a way of seeing, not necessarily a fact.", tag: "viewpoint.reason" }), "theme", "reason", [
        mc("Zara says a viewpoint and a fact are the same. Is she right?", "No, a fact can be proved but a viewpoint is a personal view", ["Yes, they are the same", "Yes, both are always true"], { hint: "Can others disagree?", why: "Facts can be checked. Viewpoints can differ.", tag: "viewpoint.reason" })]),
      Q(tf("Two characters can see the same event in different ways.", true, { hint: "Think about viewpoints.", why: "Characters often have different viewpoints.", tag: "viewpoint.compare" }), "theme", "apply", [
        tf("Two characters must always have the same viewpoint.", false, { hint: "Think about viewpoints.", why: "Characters can disagree.", tag: "viewpoint.compare" })]),
      Q(mc("Nadia says poets repeat lines because they ran out of ideas. Is she right?", "No, repetition can stress an idea or create rhythm", ["Yes, it is a mistake", "Yes, repetition is lazy"], { hint: "Think about why a chorus repeats.", why: "Repetition adds emphasis and rhythm.", tag: "devices.reason" }), "devices", "reason", [
        mc("Ali says a repeated line is a printing error. Is he right?", "No, poets repeat lines on purpose for effect", ["Yes, it is an error", "Yes, it is always a mistake"], { hint: "Think about a chorus.", why: "Repetition is a deliberate technique.", tag: "devices.reason" })]),
      Q(sld("Paragraphs 1 and 2 are calm. Paragraph 3 has a hint of danger. Paragraph 4 is the rope snapping. Slide to show which paragraph is the peak.", { min: 1, max: 6 }, 4, 0, { hint: "Where is the biggest moment?", why: "The rope snapping in paragraph 4 is the peak of tension.", tag: "tension.peak" }), "theme", "apply", [
        sld("Paragraph 1 is calm. Paragraph 2 has a warning. Paragraph 3 is the escape. Paragraph 4 is quiet again. Slide to show which paragraph is the peak.", { min: 1, max: 6 }, 3, 0, { hint: "Where is the biggest moment?", why: "The escape in paragraph 3 is the peak.", tag: "tension.peak" })]),
      Q(ord("Order the events of the quest.", ["The hero finds a map", "He crosses the river", "He meets the guardian", "He returns home"], { hint: "Follow the journey.", why: "The quest goes from map to river to guardian to home.", tag: "quest.order" }), "infer", "apply", [
        ord("Order the quest events.", ["She hears a rumour", "She sets off at dawn", "She faces the storm", "She brings back the treasure"], { hint: "Follow the journey.", why: "The quest follows the order of rumour, journey, danger and return.", tag: "quest.order" })]),
      Q(mat("Match each word to its meaning.", [["gloomy", "dark and sad-looking"], ["enormous", "extremely big"], ["whispered", "spoke very quietly"]], { hint: "Use the words around each one.", why: "Context helps us work out meaning.", tag: "vocab.context" }), "infer", "apply", [
        mat("Join each word to its meaning.", [["tiny", "very small"], ["sprinted", "ran very fast"], ["peered", "looked closely"]], { hint: "Use the words around each one.", why: "Context helps us work out meaning.", tag: "vocab.context" })]),
      Q(mc("Idris says you cannot predict a story from its title. Is he right?", "No, a title gives clues about the story", ["Yes, titles tell nothing", "Yes, predictions are always wrong"], { hint: "What can a title suggest?", why: "A title can hint at the setting, the character or the theme.", tag: "predict.title" }), "infer", "reason", [
        mc("Maryam says covers and titles are useless for predicting. Is she right?", "No, they give clues we can use", ["Yes, ignore them", "Yes, only the last page helps"], { hint: "Think about The Last Lantern.", why: "Titles and covers give clues.", tag: "predict.title" })]),
    ],
  }),
];
