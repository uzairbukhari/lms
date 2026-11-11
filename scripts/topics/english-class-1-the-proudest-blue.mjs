import { SAY, SS, H, T, PHOTO, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, mc, ms, tf, ord, mat, fill, hot, sld, st } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC } from "./_science-kit.mjs";

// English Class 1, topic 8: The Proudest Blue, a story of Eid (Zainab, age 7).
// The lesson talks about the book in general terms and uses a short original passage ("Amna's blue scarf") for retrieval and inference.
const SCARVES = "english-class-1-the-proudest-blue-1-78dc0efd.jpg";
const HOOKS = "english-class-1-the-proudest-blue-2-e86f4701.jpg";

// ---------------------------------------------------------------------------------------------- 1. learn
const meet = {
  id: "meet", kind: "learn", title: "Meet the story",
  blocks: [
    H("Welcome back, young reader!"),
    SAY("Today we read a story about pride. Who is in it, and what happens?", T("Today's big question: how does a story show pride?")),
    SAY("Scarves come in many colours and patterns. One special scarf is at the heart of our story.", PHOTO(SCARVES, "Rows of colourful patterned scarves hanging in a shop", "Scarves in a shop. In our story, a blue scarf is very special.", "Photo by Siora Photography on Unsplash")),
    H("Stop 1: Characters and setting"),
    SAY("The Proudest Blue is a story by Ibtihaj Muhammad and S. K. Ali. A girl called Faizah is proud of her big sister Asiya.", T("A **character** is a person or animal in a story.")),
    SAY("It is the first day of school. Asiya wears her first hijab, a beautiful blue one.", T("The **setting** is where and when a story happens.")),
    EB("town", "Who and where",
      SS("Faizah and Asiya are sisters. They are the main characters.", S("Characters.", ["f", "👧", 30, 58, 3], ["a", "👩", 72, 58, 3])),
      SS("The setting is the first day of school. The morning is full of new things.", S("Setting.", ["s", "🏫", 50, 56, 3, "pulse"])),
      SS("The hijab is a beautiful blue. It matters very much to the family.", S("A blue hijab.", ["h", "🧕", 50, 56, 3, "grow"]))),
    CHK(mc("What is a character?", "A person or animal in a story", ["A place in a story", "The title of a story"], { hint: "Faizah is one.", why: "A character is a person or animal in a story.", tag: "meet.chk1" })),
    H("Stop 2: What happens"),
    SAY("The plot is what happens. Asiya feels proud. Some people are unkind, and Faizah stays strong.", T("The **plot** is what happens in a story.")),
    EB("town", "The plot",
      SS("At the start, Asiya wears her blue hijab for the first time.", S("Beginning.", ["a", "🧕", 50, 56, 3])),
      SS("In the middle, some people say unkind things about it.", S("Middle.", ["u", "🙁", 50, 56, 3])),
      SS("At the end, the sisters stay proud. They know who they are.", S("End.", ["a", "💙", 50, 56, 3, "pulse"]))),
    CHK(tf("The setting is where and when a story happens.", true, { hint: "Think of the school.", why: "Setting means place and time.", tag: "meet.chk2" })),
    SAY("Let us remember. Characters are in the story. The setting is the place. The plot is what happens.", SUM("Characters are people or animals", "The setting is where and when", "The plot is what happens")),
    GLOSS({ character: "A person or animal in a story.", setting: "Where and when a story happens.", plot: "What happens in a story.", hijab: "A scarf that some Muslim women and girls wear to cover their hair.", proud: "Very pleased about who you are or what you did.", theme: "The big idea of a story." }),
  ],
  mini: [
    mc("Who is the main character's big sister in The Proudest Blue?", "Asiya", ["Hana", "Layla"], { hint: "She wears the blue hijab.", why: "Faizah's big sister is Asiya." }),
    tf("The plot is what happens in a story.", true, { hint: "Think of beginning, middle and end.", why: "The plot is what happens." }),
    mc("Where does the story begin?", "On the first day of school", ["On a boat", "In a shop at night"], { hint: "Think of the setting.", why: "It is the first day of school." }),
    mc("Which colour is the hijab in the story?", "Blue", ["Green", "Black"], { hint: "It is in the title.", why: "The proudest blue is the colour of the hijab." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const clues = {
  id: "clues", kind: "try", title: "Clues and feelings",
  blocks: [
    H("Stop 1: Find a fact"),
    SAY("Here is a short story of our own. Amna wore her new blue scarf to school.", T("To **retrieve** is to find a fact in the text.")),
    SAY("Her friend Hana said it was beautiful. Amna smiled and felt proud.", T("Read the words, then find the fact.")),
    EB("classroom", "Amna's scarf",
      SS("Amna put on her new blue scarf. It was soft like the sky.", S("The scarf.", ["a", "👧", 30, 58, 3], ["s", "🧣", 72, 54, 3, "grow"])),
      SS("At school, Hana said, That is beautiful! Amna smiled.", S("A kind word.", ["h", "👧", 30, 58, 3], ["a", "😊", 72, 54, 3])),
      SS("Amna felt proud. She stood tall all day.", S("Proud.", ["a", "💙", 50, 54, 3, "pulse"]))),
    CHK(mc("What colour was Amna's new scarf?", "blue", ["red", "green"], { hint: "Read the first line again.", why: "The scarf was blue.", tag: "clues.chk1" })),
    H("Stop 2: Infer a feeling"),
    SAY("These bags hang by a classroom door. Who might they belong to? We can only guess.", PHOTO(HOOKS, "Children's bags and red hats hanging on hooks by a classroom window", "Bags hang on school hooks on the first day of term.", "Photo by Yosuke Ota on Unsplash")),
    SAY("An **inference** is a clever guess from clues. The story does not say it, but we can work it out.", T("To **infer** is to work something out from clues.")),
    SAY("Now sort the clues. Do they tell us a fact, or a feeling?", MAN("Fact or feeling?", "Move each clue. Things the story says go in Fact. Things we work out go in Feeling.", "💙", 8, ["Fact", "Feeling"])),
    ACT("Find clues", ["Paper and a pencil", "A short story to read"], ["Read a short story.", "Write one fact you found in the words.", "Write one feeling you worked out from the clues."]),
    CHK(mc("Amna smiled and stood tall. How did she feel?", "proud", ["scared", "bored"], { hint: "Smiling and standing tall are clues.", why: "Smiling and standing tall show she felt proud.", tag: "clues.chk2" })),
    SAY("Let us remember. We retrieve facts and infer feelings from clues.", SUM("Retrieve means find a fact in the words", "Infer means work out from clues", "Smiles and standing tall show pride")),
    GLOSS({ retrieve: "To find a fact in the words of a text.", infer: "To work something out from clues.", inference: "A clever guess from clues.", clue: "A small hint that helps you work something out.", beautiful: "Very lovely to see." }),
  ],
  mini: [
    mc("Who said the scarf was beautiful?", "Hana", ["Amna", "Faizah"], { hint: "Read the second part again.", why: "Hana said it was beautiful." }),
    tf("A clue can help us infer a feeling.", true, { hint: "Smiling is a clue.", why: "Clues help us work out feelings." }),
    mc("Which clue shows that Amna felt happy?", "She smiled", ["She sat down", "She opened a book"], { hint: "Look at her face.", why: "A smile is a clue to a happy feeling." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const words = {
  id: "words", kind: "play", title: "Describing words",
  blocks: [
    H("Stop 1: Colours and textures"),
    SAY("Describing words help us see, touch and feel. Soft, bright and shiny are describing words.", T("A **describing word** tells us what something is like.")),
    EB("home", "Describe it",
      SS("A scarf can be soft and silky. We feel it with our fingers.", S("Soft.", ["s", "🧣", 50, 56, 3])),
      SS("A sky can be bright blue. We see it with our eyes.", S("Bright blue.", ["s", "🌤️", 50, 50, 3])),
      SS("A brick wall is rough and hard. We feel the bumps.", S("Rough.", ["w", "🧱", 50, 56, 3]))),
    CHK(mc("Which word describes how a scarf feels?", "soft", ["run", "table"], { hint: "Think about touching.", why: "Soft tells us how it feels.", tag: "words.chk1" })),
    H("Stop 2: Brain game and similes"),
    SAY("Warm up your memory. Watch the colours light up, then copy them.", T("A **simile** says one thing is like another.")),
    SAY("Watch the order closely. Then copy it.", BRAIN("remember_order", "Colour parade", "Watch the order, then copy it. It gets longer each time!", ["🔵", "🔴", "🟡", "🟢"])),
    SAY("Her scarf was as blue as the sky. That is a simile.", T("Use as ... as to compare.")),
    CHK(fill("Finish the simile.", "Her scarf was as blue as the {b1}.", [["sky", "mud", "coal"]], { hint: "Think of something blue.", why: "The sky is blue, so as blue as the sky works.", tag: "words.chk2" })),
    SAY("Let us remember. Describing words and similes help readers see and feel.", SUM("Describing words tell us what things are like", "Colours and textures help us picture things", "A simile compares: as blue as the sky")),
    GLOSS({ "describing word": "A word that tells us what something is like.", simile: "A way of saying something is like something else.", texture: "How something feels when you touch it.", silky: "Smooth and soft like silk.", bright: "Strong and easy to see.", compare: "To say how two things are alike." }),
  ],
  mini: [
    mc("Which word is a colour word?", "blue", ["soft", "loud"], { hint: "You can see it.", why: "Blue is a colour." }),
    tf("Rough is a texture word.", true, { hint: "You feel it.", why: "Rough tells us how something feels." }),
    mc("Which is a simile?", "as soft as a cloud", ["a soft cloud", "the cloud"], { hint: "Look for as ... as.", why: "As soft as a cloud compares two things." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const special = {
  id: "special", kind: "use", title: "My special thing",
  blocks: [
    H("Stop 1: Plan with describing words"),
    SAY("Everyone has something special. It could be a scarf, a toy or a book.", T("Choose something that is **special** to you.")),
    SAY("In Pakistan, many children treasure new clothes for Eid. They feel very proud.", T("Special things can be new clothes for Eid.")),
    SAY("In the UK, you might treasure a teddy or a football shirt.", T("Special things are different for everyone.")),
    SAY("We should talk with respect. Different things matter to different people.", T("Respect what matters to others.")),
    EB("home", "A special thing",
      SS("Zainab's special thing is her red kite. It is bright and fast.", S("A kite.", ["k", "🪁", 50, 44, 3, "float"])),
      SS("It feels light. It sounds like a flap in the wind.", S("Details.", ["k", "🪁", 40, 44, 3], ["w", "💨", 75, 50, 2, "float"])),
      SS("She feels proud when it flies high. Her kite makes her smile.", S("Proud.", ["z", "👧", 30, 58, 3], ["h", "😊", 72, 50, 2, "bounce"]))),
    CHK(mc("Which sentence has a describing word?", "My kite is bright red.", ["My kite is.", "My kite flew."], { hint: "Look for bright or red.", why: "Bright and red describe the kite.", tag: "special.chk1" })),
    H("Stop 2: Write and read aloud"),
    SAY("Write three sentences about your special thing. Add describing words.", T("Write, then read aloud with feeling.")),
    EB("classroom", "Write and share",
      SS("Write your first sentence. Say what your special thing is.", S("Sentence one.", ["w", "✏️", 35, 58, 3], ["p", "📄", 72, 58, 3])),
      SS("Add describing words. Is it soft, bright or shiny?", S("Add detail.", ["p", "📄", 40, 58, 3], ["d", "🌈", 75, 50, 2, "pulse"])),
      SS("Read it aloud with feeling. Your partner listens kindly.", S("Share.", ["r", "🗣️", 35, 56, 3], ["l", "👂", 72, 56, 3]))),
    ACT("My special thing", ["Paper and a pencil", "Your special thing, or a picture of it", "A grown-up to help"], ["Choose your special thing.", "Write three sentences with describing words.", "Check capital letters and full stops.", "Read it aloud with feeling to a listener."]),
    CHK(tf("We listen kindly when a friend reads their writing.", true, { hint: "Be respectful.", why: "Listening kindly is part of sharing.", tag: "special.chk2" })),
    SAY("Let us remember. Choose a special thing. Use describing words. Read aloud and listen kindly.", SUM("Choose something special to you", "Use describing words", "Read aloud with feeling and listen kindly")),
    GLOSS({ special: "Very important to you.", respect: "Kind and polite treatment of others.", treasure: "To keep something because it is very special.", feelings: "How you feel inside.", listener: "Someone who listens." }),
  ],
  mini: [
    mc("What should you choose to write about?", "Something special to you", ["Something you dislike", "A random number"], { hint: "It matters to you.", why: "Choose something special to you." }),
    tf("Different things are special to different people.", true, { hint: "Think of Eid clothes and teddies.", why: "People treasure different things." }),
    mc("How should we read our writing aloud?", "With feeling", ["In a whisper only", "As fast as possible"], { hint: "Think of expression.", why: "Reading with feeling makes it interesting." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Layla's proudest blue", backdrop: "home", caption: "Layla picks her bright blue scarf and says why it is her proudest colour.",
  scenes: [
    { caption: "Choosing.", say: "It is the first day of school. Layla picks her blue scarf.",
      items: [{ id: "l", emoji: "👧", label: "Layla", x: 30, y: 58, size: 3 }, { id: "s", emoji: "🧣", x: 72, y: 54, size: 3, anim: "grow" }] },
    { caption: "Soft.", say: "It is soft and silky. It is as blue as the sky.",
      items: [{ id: "s", emoji: "🧣", x: 50, y: 54, size: 3, effect: "glow" }] },
    { caption: "Nani.", say: "Nani gave it to her for Eid. That makes it special.",
      items: [{ id: "n", emoji: "👵", x: 30, y: 58, size: 3 }, { id: "g", emoji: "🎁", x: 72, y: 58, size: 2, anim: "bounce" }] },
    { caption: "The walk.", say: "Layla walks to school. She feels a little nervous.",
      items: [{ id: "l", emoji: "👧", x: 30, y: 58, size: 3, enter: "walk_right" }, { id: "h", emoji: "🏫", x: 75, y: 54, size: 3 }] },
    { caption: "A friend.", say: "Her friend Hana says, That is beautiful!",
      items: [{ id: "h", emoji: "👧", x: 30, y: 58, size: 3 }, { id: "l", emoji: "👧", x: 70, y: 58, size: 3 }] },
    { caption: "Proud.", say: "Layla smiles and stands tall. She feels proud.",
      items: [{ id: "l", emoji: "😊", x: 50, y: 54, size: 3, effect: "hearts" }] },
    { caption: "Sharing.", say: "In class, she tells everyone why blue is special to her.",
      items: [{ id: "l", emoji: "🗣️", x: 35, y: 54, size: 3 }, { id: "c", emoji: "👥", x: 72, y: 58, size: 3 }] },
    { caption: "The end.", say: "Everyone listens kindly. Different things matter to different people.",
      items: [{ id: "s", emoji: "💙", x: 50, y: 54, size: 3, effect: "sparkle" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- meet (q1-q8)
  Q("meet", "recall", "blue.character", mc("Which one is a character in Amna's scarf story?", "Amna", ["The school gate", "The colour blue"], { hint: "A character is a person or animal.", why: "Amna is a person in the story." }),
    mc("Which one is a character in The Proudest Blue?", "Faizah", ["The first day", "The scarf"], { hint: "A character is a person or animal.", why: "Faizah is a character." })),
  Q("meet", "recall", "blue.setting", mc("Which is a setting?", "A school on the first day of term", ["A girl called Amna", "A kind friend"], { hint: "It is a place and a time.", why: "A setting is where and when." }),
    mc("Which one tells us the setting?", "A busy classroom in the morning", ["A girl who smiled", "A blue scarf"], { hint: "Where and when?", why: "A classroom in the morning gives the place and time." })),
  Q("meet", "recall", "blue.plot", mc("Which one tells the plot?", "Amna wore a scarf and felt proud", ["A soft blue scarf", "Amna and Hana"], { hint: "Plot tells what happens.", why: "It tells what happened." }),
    mc("What does the plot tell us?", "What happens in the story", ["Where the book was printed", "How long the pages are"], { hint: "Think of beginning, middle and end.", why: "The plot is what happens." })),
  Q("meet", "reason", "blue.same", mc("Sam says every child should look exactly the same. Is he right?", "No, people can look different and still be friends", ["Yes, everyone should dress alike", "Yes, differences are always a problem"], { hint: "Think about the sisters.", why: "People can be different and still respect each other." }),
    mc("Zara says it is wrong to be different from others. Is she right?", "No, being different is fine", ["Yes, everyone must be the same", "Yes, different people cannot be friends"], { hint: "Think about kindness.", why: "We can respect each other's differences." })),
  Q("meet", "reason", "blue.only_main", mc("Omar says only the main character matters in a story. Is he right?", "No, other characters matter too", ["Yes, only the main character", "Yes, other characters never speak"], { hint: "Think about Hana.", why: "Other characters help the story happen." }),
    mc("Hana says the helper characters can be left out. Is she right?", "No, they help the story along", ["Yes, helpers are never needed", "Yes, only the hero counts"], { hint: "Think about kind friends.", why: "Other characters matter too." })),
  Q("meet", "apply", "blue.setting_tap", hot("Tap the setting.", [["🏫", "a school gate in the morning", 22, 50], ["😀", "happy", 50, 50], ["🧣", "a blue scarf", 78, 50]], ["a school gate in the morning"], { labels: true, hint: "Where and when?", why: "A school gate in the morning is a place and time." }),
    hot("Tap the character.", [["👧", "Amna", 22, 50], ["🏫", "school", 50, 50], ["🧣", "scarf", 78, 50]], ["Amna"], { labels: true, hint: "A person in the story.", why: "Amna is a character." })),
  Q("meet", "apply", "blue.theme_tf", tf("A theme can be the big idea of a story, like being proud of who you are.", true, { hint: "Think about the sisters.", why: "A theme is the big idea." }),
    tf("The theme is the name of the author.", false, { hint: "Think about the big idea.", why: "A theme is a big idea, not a name." })),
  Q("meet", "recall", "blue.theme_st", st("What do we call the big idea in a story?", ["theme", "the theme"], { hint: "It starts with t.", why: "The big idea is the theme." }),
    st("What do we call the place and time of a story?", ["setting", "the setting"], { hint: "It starts with s.", why: "The place and time is the setting." })),
  // ----- clues (q9-q16)
  Q("clues", "recall", "blue.retrieve", mc("In Amna's story, what was the scarf like?", "Soft and blue", ["Hard and red", "Wet and green"], { hint: "Read the story again.", why: "The scarf was soft and blue." }),
    mc("In Amna's story, who said the scarf was beautiful?", "Hana", ["Amna", "Nani"], { hint: "Read the story again.", why: "Hana said it was beautiful." })),
  Q("clues", "reason", "blue.feelings_shown", mc("Aisha says feelings in a story are never shown in the words. Is she right?", "No, words like smiled show feelings", ["Yes, feelings are always hidden", "Yes, stories have no feelings"], { hint: "Think of Amna smiling.", why: "Actions and words can show feelings." }),
    mc("Layla says we cannot tell how a character feels. Is she right?", "No, clues tell us how they feel", ["Yes, we can never tell", "Yes, only the author knows"], { hint: "Think of clues.", why: "We can infer feelings from clues." })),
  Q("clues", "apply", "blue.infer_feel", mc("Amna's smile was wide. How did she feel?", "proud and happy", ["scared and lost", "bored and tired"], { hint: "A wide smile is a clue.", why: "A wide smile shows she felt happy and proud." }),
    mc("Hana tells Amna the scarf is beautiful. How might Amna feel?", "pleased", ["angry", "sleepy"], { hint: "A kind word is a clue.", why: "A kind word makes her feel pleased." })),
  Q("clues", "apply", "blue.infer_why", mc("Why did Amna smile?", "Her friend said the scarf was beautiful", ["Her pencil was lost", "It was raining indoors"], { hint: "Look at what Hana said.", why: "Hana's kind words made her smile." }),
    mc("Why did Amna stand tall?", "She felt proud of her scarf", ["She was cold", "She lost her way"], { hint: "Think about her feelings.", why: "Standing tall shows pride." })),
  Q("clues", "apply", "blue.order", ord("Put the events of Amna's story in order.", ["Amna put on her scarf", "She walked to school", "Hana said it was beautiful", "Amna smiled"], { hint: "Start with the scarf.", why: "She put it on, walked, heard a kind word, then smiled." }),
    ord("Put these events in order.", ["Amna woke up", "She chose a scarf", "She went to school", "She felt proud"], { hint: "Start with waking up.", why: "Wake, choose, go, feel proud." })),
  Q("clues", "reason", "blue.whisper", mc("Sam says the word whispered means someone is scared of Eid. Is he right?", "No, whispered means spoke very quietly", ["Yes, whispered means afraid", "Yes, whispered means shouted"], { hint: "Think about talking softly.", why: "Whispered means spoke very quietly." }),
    mc("Mira says the word shouted means a character is sleepy. Is she right?", "No, shouted means spoke very loudly", ["Yes, shouted means sleepy", "Yes, shouted means silent"], { hint: "Think about loud voices.", why: "Shouted means spoke very loudly." })),
  Q("clues", "apply", "blue.lessons_sld", sld("The school day has 6 lessons. Amna has done 4. Slide to show how many lessons are left.", { min: 0, max: 8, unit: "lessons" }, 2, 0, { hint: "6 take away 4.", why: "6 - 4 = 2 lessons." }),
    sld("The school day has 7 lessons. Hana has done 3. Slide to show how many lessons are left.", { min: 0, max: 8, unit: "lessons" }, 4, 0, { hint: "7 take away 3.", why: "7 - 3 = 4 lessons." })),
  Q("clues", "recall", "blue.predict", st("Write a describing word to finish: Amna wore a ___ blue scarf.", ["soft", "bright", "silky", "new", "long", "beautiful"], { hint: "How might the scarf be?", why: "Soft, bright and silky describe a scarf." }),
    st("Write a describing word to finish: Zainab flew a ___ red kite.", ["bright", "big", "shiny", "small", "new"], { hint: "How might the kite be?", why: "Bright and big describe a kite." })),
  // ----- words (q17-q23)
  Q("words", "apply", "blue.texture_match", mat("Match each describing word to something it could describe.", [["soft", "a woolly blanket"], ["rough", "a brick wall"], ["shiny", "a silver coin"]], { hint: "Think of touching or seeing.", why: "Each word fits the thing." }),
    mat("Join each word to something it could describe.", [["smooth", "a pebble"], ["warm", "a hot cup"], ["loud", "a drum"]], { hint: "Think of touching or hearing.", why: "Each word fits the thing." })),
  Q("words", "reason", "blue.difference", mc("Layla says being different is a problem. Is she right?", "No, being different is part of who we are", ["Yes, different is bad", "Yes, we should hide differences"], { hint: "Think about respect.", why: "We can respect differences." }),
    mc("Hamza says we should laugh at things we do not understand. Is he right?", "No, we should ask kindly and listen", ["Yes, laughing is fine", "Yes, never ask"], { hint: "Think about kindness.", why: "We respect others by listening." })),
  Q("words", "apply", "blue.simile_fill", fill("Finish the similes.", "Her scarf was as blue as the {b1}. It was as soft as a {b2}.", [["sky", "mud", "coal"], ["cloud", "rock", "brick"]], { hint: "Think of blue and soft.", why: "The sky is blue and a cloud is soft." }),
    fill("Complete the similes.", "The kite was as red as a {b1}. It was as light as a {b2}.", [["tomato", "stone", "wall"], ["feather", "boulder", "bus"]], { hint: "Think of red and light.", why: "A tomato is red and a feather is light." })),
  Q("words", "apply", "blue.colour_ms", ms("Pick the two colour words.", ["blue", "red"], ["soft", "loud"], { hint: "You can see them.", why: "Blue and red are colours." }),
    ms("Choose the two colour words.", ["green", "yellow"], ["rough", "quiet"], { hint: "You can see them.", why: "Green and yellow are colours." })),
  Q("words", "reason", "blue.no_describe", mc("Zainab says describing words are not needed. Is she right?", "No, they help readers picture things", ["Yes, writing is better without them", "Yes, they make it too long"], { hint: "Think of a soft blue scarf.", why: "Describing words help readers see and feel." }),
    mc("Aisha says we should write only the nouns. Is she right?", "No, describing words add detail", ["Yes, nouns are enough", "Yes, details are bad"], { hint: "Compare a scarf and a soft blue scarf.", why: "Describing words add detail." })),
  Q("words", "apply", "blue.count_sld", sld("Slide to show how many describing words there are: A soft, bright blue scarf.", { min: 0, max: 6 }, 3, 0, { hint: "Count soft, bright and blue.", why: "Soft, bright and blue are three describing words." }),
    sld("Slide to show how many describing words there are: The big red kite.", { min: 0, max: 6 }, 2, 0, { hint: "Count big and red.", why: "Big and red are two describing words." })),
  Q("words", "apply", "blue.simile_ms", ms("Pick two describing words in: The soft, bright scarf.", ["soft", "bright"], ["scarf", "The"], { hint: "Which words describe the scarf?", why: "Soft and bright describe the scarf." }),
    ms("Pick two describing words in: The long, warm blanket.", ["long", "warm"], ["blanket", "The"], { hint: "Which words describe the blanket?", why: "Long and warm describe the blanket." })),
  // ----- special (q24-q30)
  Q("special", "reason", "blue.not_share", mc("Aisha says you must not talk about what is special to you. Is she right?", "No, we can share what matters to us, kindly", ["Yes, keep it secret always", "Yes, nobody wants to know"], { hint: "Think about the clip.", why: "We can share what is special and listen kindly." }),
    mc("Omar says it is silly to write about a scarf or a toy. Is he right?", "No, special things make good writing", ["Yes, only big things matter", "Yes, small things are boring"], { hint: "Think about your kite.", why: "Special things can be small and still matter." })),
  Q("special", "reason", "blue.aloud", mc("Omar says reading aloud has no feeling. Is he right?", "No, our voice can show feeling", ["Yes, reading aloud is flat", "Yes, only silent reading has feeling"], { hint: "Think about a happy sentence.", why: "We can read with feeling." }),
    mc("Mira says we should read as fast as we can. Is she right?", "No, slow and clear is best", ["Yes, fast is best", "Yes, skip the commas"], { hint: "Think of listeners.", why: "A clear voice helps listeners." })),
  Q("special", "apply", "blue.steps", ord("Put the writing steps in order.", ["Choose a special thing", "Add describing words", "Write three sentences", "Read it aloud"], { hint: "Choose first.", why: "Choose, add, write, read aloud." }),
    ord("Put these steps in order.", ["Plan my sentences", "Write them neatly", "Check capitals and full stops", "Listen to feedback"], { hint: "Plan first.", why: "Plan, write, check, listen." })),
  Q("special", "apply", "blue.fill_kite", fill("Finish the sentences.", "My special thing is my red kite. It is {b1} and {b2}.", [["bright", "table", "under"], ["fast", "chair", "from"]], { hint: "Which words describe a kite?", why: "Bright and fast are describing words." }),
    fill("Complete the sentences.", "My special thing is my teddy. It is {b1} and {b2}.", [["soft", "window", "above"], ["fluffy", "spoon", "near"]], { hint: "Which words describe a teddy?", why: "Soft and fluffy are describing words." })),
  Q("special", "apply", "blue.kind_tf", tf("It is fine to laugh at a partner's special thing.", false, { hint: "Think about respect.", why: "We listen kindly and respect what matters." }),
    tf("We should listen kindly when a partner reads their writing.", true, { hint: "Think about respect.", why: "We listen with respect." })),
  Q("special", "apply", "blue.desc_tap", hot("Tap the sentence with a describing word.", [["1️⃣", "My bright kite flew high.", 22, 50], ["2️⃣", "My kite flew.", 50, 50], ["3️⃣", "It flew.", 78, 50]], ["My bright kite flew high."], { labels: true, hint: "Look for bright.", why: "Bright describes the kite." }),
    hot("Tap the line that has a describing word.", [["1️⃣", "I have a toy.", 22, 50], ["2️⃣", "I have a soft toy.", 50, 50], ["3️⃣", "I have it.", 78, 50]], ["I have a soft toy."], { labels: true, hint: "Look for soft.", why: "Soft describes the toy." })),
  Q("special", "apply", "blue.desc_match", mat("Match each special thing to a describing word that fits.", [["a scarf", "soft"], ["a kite", "bright"], ["a teddy", "fluffy"]], { hint: "Think about how each feels or looks.", why: "Each word fits the thing." }),
    mat("Join each thing to a describing word that fits.", [["a stone", "smooth"], ["a blanket", "warm"], ["a bell", "loud"]], { hint: "Think about how each feels or sounds.", why: "Each word fits the thing." })),
];

export const topics = [
  topicLesson({
    slug: "english-class-1-the-proudest-blue", subject: "english", cls: 1, topic: 8, title: "The Proudest Blue: A Story of Eid",
    summary: "Read about a girl proud of her sister's first hijab on the first day of school, and write about something special you own.",
    unit: "Topic 8: The Proudest Blue", difficulty: 1,
    objectives: ["Retrieve and infer from a story", "Talk about pride and identity with respect", "Write describing sentences about a special item"],
    success_criteria: ["I can find facts in a story", "I can work out how characters feel", "I can write about something special with describing words"],
    real_life: "First-day-of-school stories in Pakistan and the UK, Eid clothes, and respectful talk about different clothes and customs.",
    standards: [NC("Y2 reading", "Answer and ask questions; draw inferences about characters' feelings; discuss word meanings; write about real things with description")],
    warm_up: [
      mc("What is a character?", "A person or animal in a story", ["A kind of weather", "A page number"], { hint: "Think about stories.", why: "A character is a person or animal in a story." }),
      tf("Soft is a describing word.", true, { hint: "It tells us how something feels.", why: "Soft describes things." }),
      mc("Which word is a colour?", "blue", ["loud", "run"], { hint: "You can see it.", why: "Blue is a colour." }),
    ],
    intro: [],
    subs: [meet, clues, words, special],
    clip,
    quiz,
  }),
];
