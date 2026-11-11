import { SAY, SS, H, T, IMG, TIP, FACT, REVEAL, ACT, BRAIN, SUM, CHK, S, EXP, ROW, GLOSS, mc, ms, tf, num, st, ord, mat, fill, hot, sld, PHOTO } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// English topic lessons for Zainab (Class 1, age 7). Standards from docs/CURRICULUM_V2.md section 3 (NC Year 2, Cambridge Stage 2).
// A quiz entry: Q(main question, sub-lesson id, depth, [two retake variants of the same type and skill]).
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });

/* ---------------------------------------------------------------------------------------------
   Topic 1: Sentences and grammar
   --------------------------------------------------------------------------------------------- */

const PENCIL = "english-class-1-sentences-1-cea467fd.jpg";
const WRITING = "english-class-1-sentences-2-b966b845.jpg";

const describe = {
  id: "describe", kind: "learn", title: "Describing words, plurals and verbs",
  blocks: [
    H("Welcome back, word explorer!"),
    SAY("Today we explore sentences. How can we make them clear and exciting?", T("Today's big question: how can we make our sentences clear and exciting?")),
    SAY("Sentence builders choose words and marks with care. Let us find out how.", PHOTO(PENCIL, "A hand holding a yellow pencil above a lined spiral notebook", "Writers choose their words and marks with care.", "Photo by Thought Catalog on Unsplash")),
    H("Stop 1: Describing words"),
    SAY("Look at these two dogs. Both of them are dogs. But they are not the same! One is big and one is small. Big and small are describing words. A describing word tells us more about a thing. It helps us see the picture in our head. A big dog. A small dog. A fluffy dog. Let's watch the describing words appear.", T("A **describing word** tells us more about a thing.", "A big dog. A small dog. Big and small describe the dog.")),
    EXPP("Big dog, small dog",
      SS("Here is a dog. Just a dog. We cannot tell much about it yet.", S("A dog.", ["d1", "🐕", 50, 55, 3, "grow", "dog"])),
      SS("Now there are two dogs. This one is big. Big tells us how large the dog is.", S("A big dog.", ["d1", "🐕", 30, 55, 3, "none", "big dog"], ["d2", "🐕", 74, 62, 2, "grow", "dog"])),
      SS("And this one is small. Small is a describing word too. Big and small tell us what each dog is like.", S("A big dog and a small dog.", ["d1", "🐕", 30, 55, 3, "none", "big dog"], ["d2", "🐕", 74, 62, 2, "bounce", "small dog"]))),
    CHK(mc("Which is the describing word in: the tall tree?", "tall", ["the", "tree"], { hint: "Which word tells us more about the tree?", why: "Tall tells us what the tree is like.", tag: "describing.find" })),
    CHK(tf("Soft is a describing word.", true, { hint: "Can you say a soft blanket?", why: "Soft tells us how a thing feels, so it is a describing word.", tag: "describing.find" })),
    H("Stop 2: One or lots?"),
    SAY("Now let's count. One cat. Two cats. When there is more than one, we say the word is plural. Most words just need an s on the end. One cat, two cats. One book, two books. But some words need es instead. A box becomes boxes. A bus becomes buses. A dish becomes dishes. Say it out loud and you can hear the extra bit.", T("**Plural** means more than one.", "Most words add s: one cat, two cats.", "Words ending in s, x, sh or ch add es: one box, two boxes.")),
    EXPP("One cat, two cats",
      SS("One cat. Just one.", S("One cat.", ["c1", "🐈", 50, 55, 3, "grow", "one cat"])),
      SS("Now there are two. We add an s. Two cats.", S("Two cats. Add s.", ...ROW("c", "🐈", 2, 35, 65, 55, 3, "grow"), ["l", "✏️", 50, 18, 1, "none", "cats"]))),
    EXPP("One box, two boxes",
      SS("One box.", S("One box.", ["b1", "📦", 50, 55, 3, "grow", "one box"])),
      SS("Box ends in x. So we do not add just s. We add es. Two boxes. You can hear the extra part: box-es.", S("Two boxes. Add es.", ...ROW("b", "📦", 2, 35, 65, 55, 3, "grow"), ["l", "✏️", 50, 18, 1, "none", "boxes"]))),
    CHK(mc("One bus, two ...", "buses", ["buss", "buses'"], { hint: "Bus ends in s, so add es.", why: "Words ending in s add es: bus, buses.", tag: "plural.es" })),
    CHK(mc("Which word means more than one?", "dogs", ["dog", "a dog"], { hint: "Look for the s.", why: "Dogs has an s, so it means more than one.", tag: "plural.s" })),
    H("Stop 3: Now or before?"),
    SAY("Doing words tell us what someone does. Jump, kick, walk. We can change the ending to say when it happens. Add ing when it is happening now. I am jumping. Add ed when it already happened. Yesterday I jumped. Watch the girl jump, and see how the word changes.", T("A **verb** is a doing word: jump, kick, walk.", "Add -ing for now: I am jumping.", "Add -ed for before: Yesterday I jumped.")),
    EXPP("Jump, jumping, jumped",
      SS("Jump. This is the doing word, jump.", S("Jump.", ["g", "🧒", 50, 60, 3, "grow", "jump"])),
      SS("Now she is in the air. Right now, she is jumping. We add ing for now.", S("I am jumping. Add -ing.", ["g", "🧒", 50, 30, 3, "bounce", "jumping"])),
      SS("And now she is back on the ground. Before, she jumped. We add ed for something that is finished.", S("Yesterday I jumped. Add -ed.", ["g", "🧒", 50, 60, 3, "none", "jumped"], ["t", "🕐", 80, 25, 2, "none", "yesterday"]))),
    CHK(mc("Which one is happening now?", "I am kicking the ball.", ["I kicked the ball.", "I will kick the ball."], { hint: "Look for -ing.", why: "Kicking with am means it is happening now.", tag: "verbs.ing" })),
    CHK(mc("Yesterday I ___ the door.", "opened", ["opening", "opens"], { hint: "Yesterday means it is finished.", why: "Opened ends in -ed, so it already happened.", tag: "verbs.ed" })),
    SAY("Let us remember. A describing word tells us more about a thing. A plural means more than one. Add s, or es for words like box and bus. And add ing for now, or ed for before.", SUM("A describing word tells us more about a thing", "Plural means more than one: cats, boxes", "-ing means now, -ed means before")),
    GLOSS({ "describing word": "A word that tells us more about a thing, like big, soft or red.", plural: "More than one. One cat, two cats.", noun: "A word for a person, animal, place or thing.", verb: "A doing word, like jump, kick or walk.", "-ing": "Adding ing shows it is happening now.", "-ed": "Adding ed shows it already happened." }),
  ],
  mini: [
    mc("Which is the describing word in: the red kite?", "red", ["the", "kite"], { hint: "Which word tells us the colour?", why: "Red tells us more about the kite.", tag: "describing.find" }),
    mc("One fox, two ...", "foxes", ["foxs", "fox's"], { hint: "Fox ends in x.", why: "Words ending in x add es: foxes.", tag: "plural.es" }),
    mc("Which one already happened?", "We walked home.", ["We are walking home.", "We walk home."], { hint: "Look for -ed.", why: "Walked ends in -ed, so it is finished.", tag: "verbs.ed" }),
    tf("Cats is a plural word.", true, { hint: "How many cats does it mean?", why: "Cats means more than one cat.", tag: "plural.s" }),
    ms("Pick two describing words.", ["happy", "tiny"], ["jump", "pencil"], { hint: "Describing words tell us what a thing is like.", why: "Happy and tiny describe things. Jump and pencil do not.", tag: "describing.find" }),
  ],
};

const joining = {
  id: "joining", kind: "try", title: "Joining with and, but and because",
  blocks: [
    H("Stop 1: Three joining words"),
    SAY("Short sentences are fine. But joining them makes our writing sound smooth. Today we have three joining words. And, but, and because. And adds more. I have a hat and a scarf. But shows something different. I like apples but I do not like pears. Because tells us why. I took my umbrella because it was raining. Let's see each one working.", T("**And** adds more: I have a hat and a scarf.", "**But** shows something different: I like apples but not pears.", "**Because** tells us why: I took my umbrella because it was raining.")),
    EXPP("Joining ideas",
      SS("And adds one more thing. A hat and a scarf. We have two things together.", S("I have a hat and a scarf.", ["h", "🧢", 30, 55, 3, "grow", "a hat"], ["a", "➕", 50, 55, 2, "none", "and"], ["s", "🧣", 70, 55, 3, "grow", "a scarf"])),
      SS("But shows something different. I like apples. But I do not like pears. The two ideas pull in different ways.", S("I like apples but not pears.", ["h", "🍎", 28, 55, 3, "grow", "I like apples"], ["a", "↔️", 50, 55, 2, "none", "but"], ["s", "🍐", 72, 55, 3, "bounce", "not pears"])),
      SS("Because tells us why. I took my umbrella. Why? Because it was raining!", S("I took my umbrella because it was raining.", ["h", "☂️", 28, 60, 3, "grow", "I took my umbrella"], ["a", "❓", 50, 55, 2, "none", "because"], ["s", "🌧️", 72, 40, 3, "grow", "it was raining"]))),
    CHK(mc("Pick the best word: I like tea ___ I do not like coffee.", "but", ["and", "because"], { hint: "Are the two ideas different?", why: "Liking tea and not liking coffee are different, so we use but.", tag: "joining.but" })),
    CHK(mc("Pick the best word: We stayed inside ___ it was raining.", "because", ["but", "and"], { hint: "Which part tells us why?", why: "The rain is the reason we stayed in, so we use because.", tag: "joining.because" })),
    H("Stop 2: Make your own"),
    SAY("Saying your sentences out loud first makes them easier to write.", PHOTO(WRITING, "A child's hand writing in an exercise book with a red pencil", "Every sentence starts with a capital letter and ends with a mark.", "Photo by eleni koureas on Unsplash")),
    SAY("Now it is your turn to build. Say a sentence out loud with and. Then one with but. Then one with because. Saying them first makes writing them much easier. A grown-up can help you write them down.", ACT("Join the sentences", ["Paper and a pencil", "A grown-up to read with you"], ["Finish this sentence three ways: I like ...", "Use and. For example: I like cake and ice cream.", "Use but. For example: I like cake but I do not like jelly.", "Use because. For example: I like cake because it is sweet."])),
    SAY("Do you have it? Here are three friends doing the same job, one with each joining word.", IMG("🧩", "And, but and because join two ideas into one sentence.")),
    SAY("Here is a question to think about. Can you finish this one: I was happy because ...? Have a think, then tap to see one idea.", REVEAL("Finish it: I was happy because ...", "Lots of endings work! For example: I was happy because it was my birthday.")),
    SAY("Let us remember. And adds more. But shows something different. Because tells us why.", SUM("And adds more", "But shows something different", "Because tells us why")),
    GLOSS({ and: "A joining word that adds one more thing.", but: "A joining word that shows something different.", because: "A joining word that tells us the reason why." }),
  ],
  mini: [
    mc("Pick the best word: I had a pencil ___ a ruler.", "and", ["but", "because"], { hint: "We are adding one more thing.", why: "Both things are added together, so we use and.", tag: "joining.and" }),
    mc("Pick the best word: Hana wore boots ___ the grass was wet.", "because", ["but", "and"], { hint: "Why did Hana wear boots?", why: "The wet grass is the reason, so we use because.", tag: "joining.because" }),
    mc("Pick the best word: It was sunny ___ it was cold.", "but", ["because", "and"], { hint: "Sunny and cold do not usually go together.", why: "Sunny and cold are different, so we use but.", tag: "joining.but" }),
    ord("Put the words in order to make a sentence.", ["I", "like", "milk", "and", "bread."], { hint: "Start with I.", why: "I like milk and bread.", tag: "joining.order" }),
  ],
};

const types = {
  id: "sentence_types", kind: "play", title: "Statements, questions and exclamations",
  blocks: [
    H("Stop 1: Three kinds of sentence"),
    SAY("Sentences do different jobs! A statement tells us something. The sun is hot. It ends with a full stop. A question asks something. Is the sun hot? It ends with a question mark. An exclamation shows a big feeling. The sun is so hot! It ends with an exclamation mark. Look at the marks. They are like little signs telling us what kind of sentence it is.", T("A **statement** tells us something and ends with a full stop.", "A **question** asks something and ends with a question mark.", "An **exclamation** shows a big feeling and ends with an exclamation mark.")),
    EXPP("Three jobs for sentences",
      SS("A statement. The sun is hot. It tells us a fact. It stops with a full stop.", S("The sun is hot.", ["s", "☀️", 30, 50, 3, "grow", "statement"], ["m", "🔴", 80, 62, 1, "grow", "full stop"])),
      SS("A question. Is the sun hot? It asks us something, so it ends with a question mark.", S("Is the sun hot?", ["s", "☀️", 30, 50, 3, "none", "question"], ["m", "❓", 80, 55, 3, "grow", "question mark"])),
      SS("An exclamation. The sun is so hot! It shows a big feeling, so it ends with an exclamation mark.", S("The sun is so hot!", ["s", "🥵", 30, 50, 3, "bounce", "exclamation"], ["m", "❗", 80, 55, 3, "grow", "exclamation mark"]))),
    CHK(mc("Which mark ends a question?", "?", [".", "!"], { hint: "It looks like a hook with a dot.", why: "A question ends with a question mark.", tag: "types.marks" })),
    CHK(mc("Which sentence is a question?", "Where is my bag?", ["My bag is red.", "What a big bag!"], { hint: "Which one asks something?", why: "Where is my bag? asks something, so it is a question.", tag: "types.find" })),
    H("Stop 2: Brain game"),
    SAY("Time for a brain break. Watch the pictures light up, then copy the order. After that, try the sentence puzzle. Is it a statement, a question, or an exclamation? Read it, then decide.", BRAIN("remember_order", "Sentence signs", "Watch the order, then copy it. It gets longer each time!", ["🔴", "❓", "❗", "⭐"])),
    SAY("Here is a puzzle. Is this a statement, a question or an exclamation? What a brilliant day!", IMG("🎉", "What a brilliant day! shows a big feeling.")),
    CHK(mc("What a brilliant day! What kind of sentence is this?", "an exclamation", ["a question", "a statement"], { hint: "Does it show a big feeling?", why: "It shows a big feeling and ends with an exclamation mark.", tag: "types.find" })),
    SAY("Let us remember. A statement tells. A question asks. An exclamation shows a big feeling. Look at the mark at the end.", SUM("A statement tells us something", "A question asks something", "An exclamation shows a big feeling")),
    GLOSS({ statement: "A sentence that tells us something. It ends with a full stop.", question: "A sentence that asks something. It ends with a question mark.", exclamation: "A sentence that shows a big feeling. It ends with an exclamation mark." }),
  ],
  mini: [
    mc("Which mark ends a statement?", ".", ["?", "!"], { hint: "It is a small round dot.", why: "A statement ends with a full stop.", tag: "types.marks" }),
    mc("Which sentence is a statement?", "The cat is asleep.", ["Is the cat asleep?", "How sleepy the cat is!"], { hint: "Which one just tells us something?", why: "The cat is asleep. tells us something.", tag: "types.find" }),
    tf("A question ends with an exclamation mark.", false, { hint: "Which mark looks like a hook?", why: "A question ends with a question mark.", tag: "types.marks" }),
    mat("Match each sentence to its kind.", [["It is raining.", "statement"], ["Is it raining?", "question"], ["It is pouring!", "exclamation"]], { hint: "Look at the mark at the end.", why: "The mark at the end shows the kind of sentence.", tag: "types.find" }),
  ],
};

const capitals = {
  id: "capitals_commas", kind: "use", title: "Capital letters and commas",
  blocks: [
    H("Stop 1: Special names"),
    SAY("Some words are so special they get a big letter at the start. A capital letter. Names of people get one. Zainab. Names of places get one. Lahore. And so do days of the week. Monday. We call these special names proper nouns. Also, every sentence starts with a capital letter. Watch the big letters grow.", T("Names of people, places and days start with a **capital letter**: Zainab, Lahore, Monday.", "Every sentence starts with a capital letter too.")),
    EXPP("Capital letters",
      SS("A girl called zainab. Hold on, that does not look right. A name needs a big letter at the start.", S("zainab needs a capital.", ["g", "👧", 50, 55, 3, "grow", "zainab"])),
      SS("There it is! Zainab, with a capital Z. Names of places get a capital too, like Lahore. And days, like Monday.", S("Zainab, Lahore and Monday.", ["g", "👧", 22, 55, 3, "none", "Zainab"], ["p", "🕌", 50, 55, 3, "grow", "Lahore"], ["d", "📅", 78, 55, 3, "grow", "Monday"]))),
    CHK(mc("Which name is written correctly?", "Ali", ["ali", "aLi"], { hint: "A name starts with a big letter.", why: "Names start with a capital letter, so Ali is right.", tag: "capitals.names" })),
    H("Stop 2: Lists with commas"),
    SAY("When we write a list of things, we use a comma between them. A comma is a little tail that tells us to take a tiny pause. I packed an apple, a banana and a sandwich. There is a comma after apple. Then and joins the last two. We do not need a comma before and.", T("A **comma** keeps things in a list apart.", "I packed an apple, a banana and a sandwich.")),
    EXPP("A packed lunch list",
      SS("Here are three things in the lunch box. An apple, a banana and a sandwich.", S("An apple, a banana and a sandwich.", ["a", "🍎", 25, 55, 3, "grow", "apple,"], ["b", "🍌", 50, 55, 3, "grow", "banana"], ["s", "🥪", 75, 55, 3, "grow", "sandwich"])),
      SS("We put a comma after apple, a tiny pause. And joins the last two. Say it out loud: apple, banana and sandwich.", S("apple, banana and sandwich", ["a", "🍎", 25, 55, 3, "none", "apple,"], ["b", "🍌", 50, 55, 3, "none", "banana"], ["j", "➕", 62, 30, 1, "none", "and"], ["s", "🥪", 75, 55, 3, "none", "sandwich"]))),
    CHK(mc("Which list has the comma in the right place?", "I like red, blue and green.", ["I like red blue, and green.", "I like, red blue and green."], { hint: "Put the comma after the first thing.", why: "The comma goes between the first and second things.", tag: "commas.list" })),
    SAY("Time to use it for real. Write a shopping list for your family with a grown-up. Use capital letters for names and commas between the things.", ACT("Write a real list", ["Paper and a pencil"], ["Write a sentence about what you would put in a picnic bag.", "Use commas between the things.", "Start with a capital letter and end with a full stop.", "Write one more sentence using the name of a friend."])),
    SAY("Let us remember. Names, places and days start with a capital letter. A comma keeps things in a list apart.", SUM("Names, places and days start with a capital letter", "A comma keeps things in a list apart")),
    GLOSS({ "capital letter": "A big letter at the start of a sentence or a name, like A or Z.", comma: "A little mark that keeps things in a list apart.", list: "Several things written one after another." }),
  ],
  mini: [
    mc("Which day is written correctly?", "Friday", ["friday", "fRiday"], { hint: "Days start with a big letter.", why: "Days of the week start with a capital letter.", tag: "capitals.names" }),
    mc("Which sentence starts correctly?", "The bird sang.", ["the bird sang.", "the Bird sang."], { hint: "A sentence starts with a capital.", why: "Every sentence starts with a capital letter.", tag: "capitals.sentence" }),
    mc("Which list uses commas well?", "We saw cows, goats and sheep.", ["We saw cows goats, and sheep.", "We saw, cows goats and sheep."], { hint: "Put commas between the things.", why: "Commas keep the things in the list apart.", tag: "commas.list" }),
  ],
};

const clip = {
  title: "Sam the sentence builder", backdrop: "classroom", caption: "Sam builds sentences with word blocks.",
  scenes: [
    { caption: "Meet Sam.", say: "I am Sam. I build sentences with word blocks.",
      items: [{ id: "s", emoji: "🧒", label: "Sam", x: 30, y: 58, size: 3, enter: "pop" }, { id: "b", emoji: "🧱", x: 72, y: 62, size: 2 }] },
    { caption: "A describing word.", say: "A big dog is better than just a dog.",
      items: [{ id: "d", emoji: "🐕", label: "big dog", x: 50, y: 58, size: 3, anim: "grow" }] },
    { caption: "Joining.", say: "I like tea and milk. I like tea but not coffee.",
      items: [{ id: "t", emoji: "🍵", x: 30, y: 62, size: 2 }, { id: "m", emoji: "🥛", x: 55, y: 62, size: 2 }, { id: "c", emoji: "☕", x: 80, y: 62, size: 2 }] },
    { caption: "Because.", say: "I took my umbrella because it was raining.",
      items: [{ id: "u", emoji: "☂️", x: 35, y: 58, size: 3 }, { id: "r", emoji: "🌧️", x: 72, y: 36, size: 3, anim: "float" }] },
    { caption: "Three kinds.", say: "A statement tells. A question asks. An exclamation shouts!",
      items: [{ id: "a", emoji: "🔴", x: 25, y: 60, size: 2 }, { id: "b", emoji: "❓", x: 50, y: 60, size: 2 }, { id: "c", emoji: "❗", x: 75, y: 60, size: 2, anim: "pulse" }] },
    { caption: "Capitals.", say: "Zainab and Lahore both need a big first letter.",
      items: [{ id: "z", emoji: "👧", x: 30, y: 58, size: 3 }, { id: "l", emoji: "🕌", x: 70, y: 58, size: 3 }] },
    { caption: "A list.", say: "I packed an apple, a banana and a sandwich.",
      items: [{ id: "a", emoji: "🍎", x: 25, y: 60, size: 2 }, { id: "b", emoji: "🍌", x: 50, y: 60, size: 2 }, { id: "s", emoji: "🥪", x: 75, y: 60, size: 2 }] },
    { caption: "Well done!", say: "Now my sentence is clear and ready to read!",
      items: [{ id: "s", emoji: "🧒", x: 50, y: 58, size: 3, effect: "sparkle" }] },
  ],
};

export const topics = [
  topicLesson({
    slug: "english-class-1-sentences", subject: "english", cls: 1, topic: 1, title: "Sentences and Grammar",
    summary: "Describing words, plurals, joining sentences with and, but and because, the three kinds of sentence, capital letters and commas, and -ed and -ing.",
    unit: "Topic 1: Sentences and grammar", difficulty: 1,
    objectives: ["Use describing words to say more about a thing", "Make plurals with s and es", "Join ideas with and, but and because", "Know statements, questions and exclamations", "Use capital letters for names and commas in lists", "Use -ed and -ing endings"],
    success_criteria: ["I can find a describing word in a sentence", "I can join two ideas with and, but or because", "I can tell a statement, a question and an exclamation", "I can use capital letters and commas in a list"],
    real_life: "Writing a message to a friend, a shopping list and a postcard.",
    standards: [
      { framework: "nc_england", code: "Y2 grammar", text: "Use expanded noun phrases, co-ordination (and, but) and subordination (because), and the correct sentence punctuation" },
      { framework: "cambridge", code: "2Wg.01" }, { framework: "cambridge", code: "2Wg.02" }, { framework: "cambridge", code: "2Wg.03" }, { framework: "cambridge", code: "2Wg.04" }, { framework: "cambridge", code: "2Rg.02" }, { framework: "cambridge", code: "2Rg.03" }, { framework: "cambridge", code: "2Ww.04" },
    ],
    warm_up: [
      mc("What is the first sound in the word cat?", "c", ["a", "t"], { hint: "Say the word slowly.", why: "Cat starts with the sound c." }),
      tf("A sentence is a group of words that makes sense.", true, { hint: "Does 'The cat sat' make sense?", why: "A sentence is a group of words that makes sense." }),
      mc("Which word rhymes with hat?", "mat", ["hen", "sun"], { hint: "Listen to the ending.", why: "Hat and mat both end in -at." }),
    ],
    intro: [],
    subs: [describe, joining, types, capitals],
    clip,
    quiz: [
      Q(mc("Which word is the describing word in: The fluffy cat sat.", "fluffy", ["cat", "sat"], { hint: "Which word tells us what the cat is like?", why: "Fluffy tells us more about the cat.", tag: "describing.find" }), "describe", "recall", [
        mc("Which word is the describing word in: The tall giraffe ate.", "tall", ["giraffe", "ate"], { hint: "Which word tells us what the giraffe is like?", why: "Tall tells us more about the giraffe.", tag: "describing.find" }),
        mc("Which word is the describing word in: The sweet mango fell.", "sweet", ["mango", "fell"], { hint: "Which word tells us what the mango is like?", why: "Sweet tells us more about the mango.", tag: "describing.find" })]),
      Q(tf("The plural of box is boxs.", false, { hint: "Box ends in x.", why: "Words ending in x add es, so the plural is boxes.", tag: "plural.es" }), "describe", "recall", [
        tf("The plural of bus is buss.", false, { hint: "Bus ends in s.", why: "Words ending in s add es, so the plural is buses.", tag: "plural.es" }),
        tf("The plural of dog is dogs.", true, { hint: "Most words just add s.", why: "Dog adds s to make dogs.", tag: "plural.s" })]),
      Q(fill("Make the plurals.", "One cat, two {b1}. One fox, two {b2}.", [["cats", "cat", "cates"], ["foxes", "foxs", "fox"]], { hint: "Most add s. Words ending in x add es.", why: "Cats adds s. Foxes adds es because fox ends in x.", tag: "plural.s" }), "describe", "apply", [
        fill("Finish the plurals.", "One dog, two {b1}. One bus, two {b2}.", [["dogs", "dog", "doges"], ["buses", "buss", "bus"]], { hint: "Most add s. Words ending in s add es.", why: "Dogs adds s. Buses adds es because bus ends in s.", tag: "plural.s" }),
        fill("Write the plurals.", "One book, two {b1}. One dish, two {b2}.", [["books", "book", "bookes"], ["dishes", "dishs", "dish"]], { hint: "Most add s. Words ending in sh add es.", why: "Books adds s. Dishes adds es because dish ends in sh.", tag: "plural.s" })]),
      Q(ms("Which are describing words? Pick two.", ["cold", "loud"], ["swim", "table"], { hint: "Describing words say what a thing is like.", why: "Cold and loud describe things. Swim and table do not.", tag: "describing.find" }), "describe", "apply", [
        ms("Pick the two describing words.", ["shiny", "brave"], ["sing", "window"], { hint: "Describing words say what a thing is like.", why: "Shiny and brave describe things. Sing and window do not.", tag: "describing.find" }),
        ms("Choose two describing words.", ["gentle", "bumpy"], ["run", "garden"], { hint: "Describing words say what a thing is like.", why: "Gentle and bumpy describe things. Run and garden do not.", tag: "describing.find" })]),
      Q(mc("Pick the best word: I wore my coat ___ it was cold.", "because", ["but", "or"], { hint: "Which part tells us why?", why: "The cold is the reason for the coat, so we use because.", tag: "joining.because" }), "joining", "apply", [
        mc("Pick the best word: Ali likes rice ___ he does not like peas.", "but", ["because", "or"], { hint: "Are the two ideas different?", why: "Liking rice and not liking peas are different, so we use but.", tag: "joining.but" }),
        mc("Pick the best word: The sun came out ___ we went to the park.", "and", ["but", "because"], { hint: "Is the second part a reason or a different idea?", why: "It simply adds what happened next, so and works best.", tag: "joining.and" })]),
      Q(ord("Build the sentence: which order is right?", ["The", "cat", "sat", "on", "the", "mat."], { hint: "Start with The.", why: "The cat sat on the mat.", tag: "joining.order" }), "joining", "apply", [
        ord("Arrange the words into a sentence.", ["My", "friend", "likes", "red", "apples."], { hint: "Start with My.", why: "My friend likes red apples.", tag: "joining.order" }),
        ord("Sort the words to make a sentence about a friend.", ["We", "play", "in", "the", "garden."], { hint: "Start with We.", why: "We play in the garden.", tag: "joining.order" })]),
      Q(mc("Why do we use but in: I like apples but I do not like pears?", "The two ideas are different", ["One idea gives the reason for the other", "The two ideas are the same"], { hint: "Liking and not liking pull different ways.", why: "But shows that the two ideas are different.", tag: "joining.reason" }), "joining", "reason", [
        mc("Why do we use because in: We stayed in because it was raining?", "The second part tells us why", ["The two ideas are opposites", "It tells us what came first"], { hint: "Which part is the reason?", why: "Because tells us the reason why.", tag: "joining.reason" }),
        mc("Why do we use and in: I packed a book and a pencil?", "It adds one more thing", ["It shows a different idea", "It gives a reason"], { hint: "Is it adding or showing a difference?", why: "And adds one more thing to the first.", tag: "joining.reason" })]),
      Q(mat("Which kind is each sentence?", [["The sky is blue.", "statement"], ["Where is my bag?", "question"], ["What a big wave!", "exclamation"]], { hint: "Look at the mark at the end.", why: "The mark shows the kind of sentence.", tag: "types.find" }), "sentence_types", "recall", [
        mat("Sort these sentences by kind.", [["Frogs can hop.", "statement"], ["Can frogs swim?", "question"], ["How loud that is!", "exclamation"]], { hint: "Look at the mark at the end.", why: "The mark shows the kind of sentence.", tag: "types.find" }),
        mat("Pair each sentence with its job.", [["I have a red kite.", "statement"], ["Do you have a kite?", "question"], ["Look how high it flies!", "exclamation"]], { hint: "Look at the mark at the end.", why: "The mark shows the kind of sentence.", tag: "types.find" })]),
      Q(hot("Tap the mark that ends a question.", [["❓", "question mark", 22, 50], ["❗", "exclamation mark", 50, 50], ["⚫", "full stop", 78, 50]], ["question mark"], { labels: true, hint: "It looks like a hook with a dot.", why: "A question ends with a question mark.", tag: "types.marks" }), "sentence_types", "apply", [
        hot("Tap the mark that ends an exclamation.", [["❓", "question mark", 22, 50], ["❗", "exclamation mark", 50, 50], ["⚫", "full stop", 78, 50]], ["exclamation mark"], { labels: true, hint: "It is a line with a dot, showing a big feeling.", why: "An exclamation ends with an exclamation mark.", tag: "types.marks" }),
        hot("Tap the mark that ends a statement.", [["❓", "question mark", 22, 50], ["❗", "exclamation mark", 50, 50], ["⚫", "full stop", 78, 50]], ["full stop"], { labels: true, hint: "It is a small round dot.", why: "A statement ends with a full stop.", tag: "types.marks" })]),
      Q(sld("Slide to show how many sentences there are: Cats purr. Dogs bark. Birds sing.", { min: 0, max: 6 }, 3, 0, { hint: "Count the full stops.", why: "Each full stop ends one sentence, so there are 3.", tag: "types.count" }), "sentence_types", "apply", [
        sld("Slide to show how many sentences there are: Ducks swim. Fish splash.", { min: 0, max: 6 }, 2, 0, { hint: "Count the full stops.", why: "Each full stop ends one sentence, so there are 2.", tag: "types.count" }),
        sld("Slide to show how many sentences there are: Rain falls. Puddles grow. Frogs jump. Children laugh.", { min: 0, max: 6 }, 4, 0, { hint: "Count the full stops.", why: "Each full stop ends one sentence, so there are 4.", tag: "types.count" })]),
      Q(mc("Why does Can we go to the park? end with a question mark?", "Because it asks something", ["Because it shows excitement", "Because it is very long"], { hint: "What is the sentence doing?", why: "A sentence that asks something ends with a question mark.", tag: "types.reason" }), "sentence_types", "reason", [
        mc("Why does Wow, what a huge cake! end with an exclamation mark?", "Because it shows a big feeling", ["Because it asks something", "Because it tells a plain fact"], { hint: "What feeling does it show?", why: "An exclamation shows a big feeling.", tag: "types.reason" }),
        mc("Why does The bus is red. end with a full stop?", "Because it is a plain statement", ["Because it asks something", "Because it shows a big feeling"], { hint: "Is it asking or telling?", why: "A statement tells us something and ends with a full stop.", tag: "types.reason" })]),
      Q(st("Write the name that needs a capital letter: The kind girl is called amina.", ["amina", "Amina"], { hint: "Which word is a person's name?", why: "Names start with a capital letter: Amina.", tag: "capitals.names" }), "capitals_commas", "recall", [
        st("Write the day that needs a capital letter: We go swimming on friday.", ["friday", "Friday"], { hint: "Which word is a day?", why: "Days start with a capital letter: Friday.", tag: "capitals.names" }),
        st("Write the place that needs a capital letter: My nani lives in karachi.", ["karachi", "Karachi"], { hint: "Which word is the name of a place?", why: "Places start with a capital letter: Karachi.", tag: "capitals.names" })]),
      Q(mc("Why does I packed a hat, a bottle and a snack. use commas?", "To keep the things in the list apart", ["To show it is a question", "To show a big feeling"], { hint: "What are the commas between?", why: "Commas keep the things in a list apart.", tag: "commas.reason" }), "capitals_commas", "reason", [
        mc("Why does We saw cows, sheep and goats. use commas?", "To keep the animals in the list apart", ["To show it is a question", "To show a big feeling"], { hint: "What are the commas between?", why: "Commas keep the things in a list apart.", tag: "commas.reason" }),
        mc("Why does She bought milk, eggs and bread. use commas?", "To keep the things she bought apart", ["To show it is a question", "To show a big feeling"], { hint: "What are the commas between?", why: "Commas keep the things in a list apart.", tag: "commas.reason" })]),
      Q(fill("Choose the right endings.", "Yesterday I {b1} a ball. Now I am {b2} it.", [["kicked", "kicking", "kicks"], ["kicking", "kicked", "kicks"]], { hint: "Yesterday needs -ed. Now needs -ing.", why: "Kicked is before. Kicking is now.", tag: "verbs.ed" }), "describe", "apply", [
        fill("Pick the right verb endings.", "Yesterday Dad {b1} the car. Now he is {b2} it again.", [["washed", "washing", "washes"], ["washing", "washed", "washes"]], { hint: "Yesterday needs -ed. Now needs -ing.", why: "Washed is before. Washing is now.", tag: "verbs.ed" }),
        fill("Choose the endings that fit.", "Yesterday we {b1} a story. Now we are {b2} a song.", [["listened", "listening", "listens"], ["singing", "sang", "sings"]], { hint: "Yesterday needs -ed. Now needs -ing.", why: "Listened is before. Singing is now.", tag: "verbs.ed" })]),
      Q(mc("Zara says I am jumped is correct. Is she right?", "No, am goes with -ing: I am jumping", ["Yes, -ed always goes with am", "No, it should be jumps"], { hint: "Is it happening now or before?", why: "Am goes with -ing for now: I am jumping. -ed is for before: I jumped.", tag: "verbs.reason" }), "describe", "reason", [
        mc("Ben says Yesterday I playing is correct. Is he right?", "No, yesterday needs -ed: I played", ["Yes, -ing is always right", "No, it should be plays"], { hint: "Is yesterday now or before?", why: "Yesterday means before, so we use -ed: I played.", tag: "verbs.reason" }),
        mc("Nora says Right now I walked is correct. Is she right?", "No, right now needs -ing: I am walking", ["Yes, -ed means right now", "No, it should be walks"], { hint: "Right now means it is happening now.", why: "Right now needs -ing: I am walking.", tag: "verbs.reason" })]),
      // ----- upgrade: 15 new mains (q16-q30), 1 variant each
      Q(mc("Which sentence joins these ideas well? Hana likes tea. She does not like coffee.", "Hana likes tea but she does not like coffee.", ["Hana likes tea because she does not like coffee.", "Hana likes tea and she does not like coffee because."], { hint: "The two ideas are different.", why: "Liking tea and not liking coffee are different ideas, so we join them with but.", tag: "joining.but" }), "joining", "apply", [
        mc("Which sentence joins these ideas well? Ali is small. He is very strong.", "Ali is small but he is very strong.", ["Ali is small because he is very strong.", "Ali is small and but he is very strong."], { hint: "Small and strong pull in different directions.", why: "Small and strong are different ideas, so but joins them.", tag: "joining.but" })]),
      Q(fill("Choose the joining words.", "Bilal has a bat {b1} a ball. He wants to play, {b2} it is raining.", [["and", "but", "because"], ["but", "and", "or"]], { hint: "One adds a thing. One shows a difference.", why: "And adds the ball. But shows the rain is a problem.", tag: "joining.choose" }), "joining", "apply", [
        fill("Pick the joining words that fit.", "Amna can walk {b1} ride to school. She packed fruit {b2} a sandwich.", [["or", "but", "because"], ["and", "but", "or"]], { hint: "One is a choice. One adds more.", why: "Or shows a choice. And adds one more thing.", tag: "joining.choose" })]),
      Q(mc("Layla says I like tea and is a full sentence. Is she right?", "No, it stops in the middle, so it is not finished", ["Yes, it has a capital letter", "Yes, any sentence with and is finished"], { hint: "Does the idea feel finished?", why: "After and we need another part, so the sentence is not finished.", tag: "joining.reason" }), "joining", "reason", [
        mc("Hamza says We went to the shop because is a full sentence. Is he right?", "No, it needs the reason after because", ["Yes, because ends a sentence", "Yes, it has three words"], { hint: "What is the reason?", why: "Because needs a reason after it, so the sentence is not finished.", tag: "joining.reason" })]),
      Q(sld("Slide to show how many commas are needed: I packed an apple a banana a sandwich and a pear.", { min: 0, max: 6 }, 2, 0, { hint: "Commas go between the things, and and joins the last two.", why: "Apple, banana, sandwich and pear needs 2 commas.", tag: "commas.list" }), "capitals_commas", "apply", [
        sld("Slide to show how many commas are needed: We saw cows goats sheep hens and ducks.", { min: 0, max: 6 }, 3, 0, { hint: "Commas go between the things, and and joins the last two.", why: "Cows, goats, sheep, hens and ducks needs 3 commas.", tag: "commas.list" })]),
      Q(st("Write the mark that ends this sentence: How tall that tree is", ["!", "exclamation mark"], { hint: "It shows a big feeling.", why: "A big feeling ends with an exclamation mark.", tag: "types.marks" }), "sentence_types", "apply", [
        st("Write the mark that ends this sentence: Where is my other shoe", ["?", "question mark"], { hint: "It asks something.", why: "A sentence that asks ends with a question mark.", tag: "types.marks" })]),
      Q(mc("Omar says a question can end with a full stop. Is he right?", "No, a question ends with a question mark", ["Yes, all sentences end with full stops", "Yes, questions have no mark"], { hint: "Which mark looks like a hook?", why: "A question needs a question mark.", tag: "types.reason" }), "sentence_types", "reason", [
        mc("Aisha says an exclamation ends with a question mark. Is she right?", "No, it ends with an exclamation mark", ["Yes, exclamations ask things", "Yes, every sentence ends with a question mark"], { hint: "It shows a big feeling.", why: "An exclamation ends with an exclamation mark.", tag: "types.reason" })]),
      Q(ord("Build a sentence from the cards.", ["Aisha", "packed", "a", "book", "and", "a", "pen."], { hint: "Start with the name.", why: "Aisha packed a book and a pen.", tag: "joining.order" }), "joining", "apply", [
        ord("Arrange the cards into a sentence.", ["Hamza", "likes", "mangoes", "but", "not", "plums."], { hint: "Start with the name.", why: "Hamza likes mangoes but not plums.", tag: "joining.order" })]),
      Q(mat("Match each sentence to its doing word.", [["The girl kicked the ball.", "kicked"], ["Birds sing at dawn.", "sing"], ["Dad cooks the rice.", "cooks"]], { hint: "Which word shows what someone does?", why: "Kicked, sing and cooks are the doing words.", tag: "verbs.find" }), "describe", "apply", [
        mat("Pair each sentence with its verb.", [["The baby giggled loudly.", "giggled"], ["Fish swim in the pond.", "swim"], ["Mum reads a story.", "reads"]], { hint: "Which word shows what someone does?", why: "Giggled, swim and reads are the verbs.", tag: "verbs.find" })]),
      Q(mc("Sam says only names need a capital letter. Is he right?", "No, every sentence starts with a capital too", ["Yes, only names get capitals", "Yes, capitals are only for days"], { hint: "Look at the first letter of a sentence.", why: "Every sentence starts with a capital letter, as well as names, places and days.", tag: "capitals.reason" }), "capitals_commas", "reason", [
        mc("Zara says a sentence can start with a small letter. Is she right?", "No, every sentence starts with a capital letter", ["Yes, small letters are fine", "Yes, only the last word needs a capital"], { hint: "Think of the first word.", why: "Every sentence starts with a capital letter.", tag: "capitals.reason" })]),
      Q(tf("We use because to give a reason.", true, { hint: "Because tells us why.", why: "Because gives the reason for something.", tag: "joining.because" }), "joining", "apply", [
        tf("We use because to show two different ideas.", false, { hint: "Which joining word shows a difference?", why: "But shows a difference. Because gives a reason.", tag: "joining.because" })]),
      Q(st("Write the plural of dish.", ["dishes"], { hint: "Dish ends in sh.", why: "Words ending in sh add es, so dish becomes dishes.", tag: "plural.es" }), "describe", "recall", [
        st("Write the plural of bench.", ["benches"], { hint: "Bench ends in ch.", why: "Words ending in ch add es, so bench becomes benches.", tag: "plural.es" })]),
      Q(ms("Pick the two describing words: The ripe yellow mango fell.", ["ripe", "yellow"], ["mango", "fell"], { hint: "Which words tell us what the mango is like?", why: "Ripe and yellow describe the mango.", tag: "describing.find" }), "describe", "apply", [
        ms("Pick the two describing words: The crunchy green apple rolled.", ["crunchy", "green"], ["apple", "rolled"], { hint: "Which words tell us what the apple is like?", why: "Crunchy and green describe the apple.", tag: "describing.find" })]),
      Q(hot("Tap the sentence with the right mark.", [["1️⃣", "Where is Hamza?", 22, 50], ["2️⃣", "Where is Hamza.", 50, 50], ["3️⃣", "Where is Hamza!", 78, 50]], ["Where is Hamza?"], { labels: true, hint: "Hamza is being asked about.", why: "A question needs a question mark.", tag: "types.marks" }), "sentence_types", "apply", [
        hot("Tap the sentence that ends correctly.", [["1️⃣", "What a lovely kite?", 22, 50], ["2️⃣", "What a lovely kite.", 50, 50], ["3️⃣", "What a lovely kite!", 78, 50]], ["What a lovely kite!"], { labels: true, hint: "It shows a big feeling.", why: "An exclamation needs an exclamation mark.", tag: "types.marks" })]),
      Q(mc("Aisha says a comma goes after every word in a list. Is she right?", "No, commas go between the things, and and joins the last two", ["Yes, put a comma after every word", "Yes, commas always go at the end"], { hint: "Look at the packed lunch list.", why: "Commas keep things apart, and and joins the last two.", tag: "commas.reason" }), "capitals_commas", "reason", [
        mc("Ben says a list needs no commas at all. Is he right?", "No, commas keep the things in a list apart", ["Yes, lists never need commas", "Yes, commas only go in questions"], { hint: "How can we tell the things apart?", why: "Commas help the reader see where each thing ends.", tag: "commas.reason" })]),
      Q(mc("Which words need a capital letter in: zainab went to lahore on monday?", "zainab, lahore and monday all need one", ["only zainab needs one", "only monday needs one"], { hint: "People, places and days all start with capitals.", why: "Names of people, places and days all start with a capital letter.", tag: "capitals.names" }), "capitals_commas", "apply", [
        mc("Which words need a capital letter in: hamza visits karachi on friday?", "hamza, karachi and friday all need one", ["only karachi needs one", "none of them need one"], { hint: "People, places and days all start with capitals.", why: "Names of people, places and days all start with a capital letter.", tag: "capitals.names" })]),
    ],
  }),
];
