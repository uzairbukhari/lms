import { SAY, SS, H, T, PHOTO, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, mc, ms, tf, ord, mat, fill, hot, sld, st } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC } from "./_science-kit.mjs";

// English Class 1, topic 11: Imaginative poems, The Magic Box (Zainab, age 7).
// The lesson describes the poems in general terms and uses original lines; it does not quote the poems.
const BOX = "english-class-1-magic-box-poems-1-0349749a.jpg";
const LANTERNS = "english-class-1-magic-box-poems-2-38320850.jpg";

// ---------------------------------------------------------------------------------------------- 1. learn
const box = {
  id: "box", kind: "learn", title: "The Magic Box",
  blocks: [
    H("Welcome back, young poet!"),
    SAY("Today we open a magic box. What will we find inside?", T("Today's big question: what can a poet put in a magic box?")),
    SAY("This wooden box is closed. Imagine it holds something amazing.", PHOTO(BOX, "A small old wooden box with metal clasps sitting on dark blue cloth", "A wooden box with a clasp. What could be inside?", "Photo by OWN FILTERS on Unsplash")),
    H("Stop 1: What is in the box?"),
    SAY("The Magic Box is a poem by Kit Wright. The poet imagines a very special box.", T("A **poet** writes poems. A **poem** is words with shape and feeling.")),
    SAY("The box can hold wonderful things. Some are real and some are imagined.", T("A poet can be **imaginative**.")),
    EB("home", "Inside the box",
      SS("A poet can put a sound in the box. Imagine the sound of a bell.", S("A sound.", ["b", "📦", 35, 58, 3], ["s", "🔔", 75, 50, 2, "bounce"])),
      SS("A poet can put a colour or a feeling. Imagine the colour of joy.", S("A feeling.", ["b", "📦", 35, 58, 3], ["j", "🌈", 75, 46, 3, "float"])),
      SS("A poet can put things nobody has seen. That is imagination.", S("Imagination.", ["b", "📦", 35, 58, 3], ["m", "✨", 75, 40, 3, "pulse"]))),
    CHK(mc("What does a poet do?", "Writes poems", ["Fixes cars", "Sells fruit"], { hint: "Think about the word poet.", why: "A poet writes poems.", tag: "box.chk1" })),
    H("Stop 2: Verse and imagery"),
    SAY("A poem is made of lines. A group of lines is a verse.", T("A **verse** is a group of lines in a poem.")),
    SAY("A poet uses imagery. Imagery means words that make a picture in your mind.", T("**Imagery** paints pictures with words.")),
    EB("home", "Lines and pictures",
      SS("Here are two lines. They make a small verse.", S("A verse.", ["v", "📜", 50, 56, 3, "grow"])),
      SS("A pocket of stars is imagery. We can see it in our mind.", S("Imagery.", ["p", "🌌", 50, 50, 3, "float"])),
      SS("The best poems make us see, hear and feel.", S("See, hear, feel.", ["e", "👀", 25, 56, 3], ["h", "👂", 50, 56, 3], ["f", "💗", 75, 56, 3]))),
    CHK(tf("Imagery means words that make a picture in your mind.", true, { hint: "Think of stars in a pocket.", why: "Imagery paints a picture with words.", tag: "box.chk2" })),
    SAY("Let us remember. A poet imagines things. A verse has lines. Imagery makes pictures.", SUM("A poet writes poems", "A verse is a group of lines", "Imagery makes pictures with words")),
    GLOSS({ poet: "A person who writes poems.", poem: "Words with shape, rhythm and feeling.", imaginative: "Full of new and creative ideas.", verse: "A group of lines in a poem.", imagery: "Words that make a picture in your mind.", line: "One row of words in a poem." }),
  ],
  mini: [
    mc("What is a verse?", "A group of lines in a poem", ["A page number", "A kind of box"], { hint: "Think of poem parts.", why: "A verse is a group of lines." }),
    tf("A poet can write about imaginary things.", true, { hint: "Think of the magic box.", why: "Poets can imagine anything." }),
    mc("What does imaginative mean?", "Full of new ideas", ["Very heavy", "Very old"], { hint: "Think of imagination.", why: "Imaginative means full of creative ideas." }),
    mc("What does imagery do?", "Makes pictures with words", ["Counts the lines", "Hides the poem"], { hint: "Think about stars in a pocket.", why: "Imagery paints a picture." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const more = {
  id: "more", kind: "try", title: "More poems",
  blocks: [
    H("Stop 1: Wide Open"),
    SAY("Wide Open is another imaginative poem. It is by Rachel Rooney.", T("Read poems **with expression**.")),
    EB("classroom", "Reading with expression",
      SS("Read slowly when the poem feels calm. Read faster when it feels excited.", S("Pace.", ["r", "📖", 30, 58, 3], ["s", "🐢", 75, 60, 2])),
      SS("Make your voice go up and down. It helps the listener picture it.", S("Voice.", ["v", "🗣️", 50, 56, 3, "pulse"])),
      SS("Pause at the end of a line. Let the picture sink in.", S("Pause.", ["p", "⏸️", 50, 56, 3]))),
    CHK(mc("What does reading with expression do?", "Helps the listener feel the poem", ["Makes the poem shorter", "Hides the words"], { hint: "Think about voice.", why: "Expression helps listeners feel the poem.", tag: "more.chk1" })),
    H("Stop 2: What does laughter look like?"),
    SAY("A poet can describe laughter. It might look bright and bouncy.", PHOTO(LANTERNS, "Hundreds of glowing orange paper lanterns floating into a dark night sky above a crowd", "Lanterns light up the night. A poet might compare joy to light.", "Photo by Jessica Kantak Bailey on Unsplash")),
    SAY("You cannot touch laughter, but you can imagine its colour and shape.", T("Compare feelings to things we can see.")),
    SAY("Now sort the lines. Are they real things or imagined things?", MAN("Real or imagined?", "Move each line. Things you can really find go in Real. Wonderful made-up things go in Imagined.", "📦", 8, ["Real", "Imagined"])),
    ACT("Read with expression", ["A poem you like", "A grown-up to listen"], ["Read the poem silently first.", "Read it aloud with a lively voice.", "Pause at the end of each line."]),
    CHK(mc("Which line is more imaginative?", "I keep the moon in my pocket", ["I keep a pen in my pocket", "I keep my keys in my pocket"], { hint: "Which one is not real?", why: "A moon in a pocket is imagined.", tag: "more.chk2" })),
    SAY("Let us remember. Read with expression. Compare feelings to pictures. Use your imagination.", SUM("Read with expression", "Pause at the end of lines", "Compare feelings to pictures")),
    GLOSS({ expression: "Using your voice to show feeling.", imagined: "Made up in your mind.", real: "Something that truly exists.", compare: "To say how two things are alike.", lantern: "A light inside a paper or glass case." }),
  ],
  mini: [
    mc("What can your voice do when you read a poem?", "Go up and down", ["Stay silent", "Only whisper"], { hint: "Think of expression.", why: "A lively voice shows feeling." }),
    tf("We can pause at the end of a line.", true, { hint: "It helps the listener.", why: "Pausing lets the picture sink in." }),
    mc("Which is an imagined thing?", "a pocket of rainbow", ["a pencil", "a brick"], { hint: "Which is made up?", why: "A pocket of rainbow is imagined." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const pictures = {
  id: "pictures", kind: "play", title: "Word pictures",
  blocks: [
    H("Stop 1: Describe a sound"),
    SAY("A poet can describe a sound. Rain might go pitter-patter.", T("A **sound word** copies a sound.")),
    EB("home", "Sound words",
      SS("A bell goes ding. A drum goes boom.", S("Ding and boom.", ["b", "🔔", 30, 56, 3], ["d", "🥁", 72, 58, 3])),
      SS("Rain goes pitter-patter. The wind goes whoosh.", S("Rain and wind.", ["r", "🌧️", 30, 40, 3], ["w", "💨", 72, 50, 3, "float"])),
      SS("Poets use sound words so we can hear the poem.", S("Hear it.", ["e", "👂", 50, 56, 3, "pulse"]))),
    CHK(mc("Which is a sound word?", "boom", ["table", "cloud"], { hint: "It copies a noise.", why: "Boom copies a noise.", tag: "pictures.chk1" })),
    H("Stop 2: Brain game"),
    SAY("Warm up your memory. Watch the pictures light up, then copy them.", T("Play the game, then answer a question.")),
    SAY("Watch the order closely. Then copy it.", BRAIN("remember_order", "Magic box", "Watch the order, then copy it. It gets longer each time!", ["🌅", "🔔", "🌧️", "✨"])),
    SAY("A feeling can be a picture too. Joy can glow like a lantern.", T("A **feeling picture** compares a feeling to a thing.")),
    CHK(fill("Finish the picture.", "Her laugh was as bright as a {b1}.", [["star", "stone", "mud"]], { hint: "Think of something bright.", why: "A star is bright.", tag: "pictures.chk2" })),
    SAY("Let us remember. Poets use sound words and feeling pictures.", SUM("Sound words copy noises", "Feelings can be pictures", "Poems do not always rhyme")),
    GLOSS({ "sound word": "A word that copies a noise, like boom.", "feeling picture": "A word picture that shows a feeling.", rhyme: "Words that end with the same sound.", simile: "A comparison using as or like.", bright: "Strong and easy to see." }),
  ],
  mini: [
    mc("Which word copies the sound of rain?", "pitter-patter", ["crunch", "roar"], { hint: "Light and quick.", why: "Pitter-patter sounds like rain." }),
    tf("A poem must always rhyme.", false, { hint: "Many poems do not.", why: "Poems can rhyme or not." }),
    mc("A feeling picture compares a feeling to what?", "A thing we can see", ["A page number", "A number"], { hint: "Think of the lantern.", why: "We compare a feeling to a thing." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const mybox = {
  id: "mybox", kind: "use", title: "My magic box",
  blocks: [
    H("Stop 1: Pick things for your box"),
    SAY("Now write your own magic box lines. Choose wonderful things.", T("Pick items for your own magic box.")),
    SAY("A sunrise over Badshahi Mosque could go in a box. So could the smell of rain on a Lahore roof.", T("Use places and smells you know.")),
    SAY("Snow in Gilgit or a lantern at Eid could go in too.", T("Eid lanterns glow in many homes.")),
    SAY("In the UK, you might pick a frosty morning or a church bell.", T("Any special thing can go in your box.")),
    EB("home", "My box",
      SS("Zainab's box holds a sunrise over Badshahi Mosque.", S("A sunrise.", ["b", "📦", 30, 58, 3], ["s", "🌅", 75, 46, 3, "float"])),
      SS("It also holds the smell of rain on a hot roof.", S("A smell.", ["b", "📦", 30, 58, 3], ["r", "🌧️", 75, 46, 3, "float"])),
      SS("It holds the sound of Nani's laughter. That is the best thing.", S("A sound.", ["b", "📦", 30, 58, 3], ["n", "👵", 75, 56, 3, "bounce"]))),
    CHK(mc("Which line is the strongest?", "I will put in my box a sunrise over Badshahi Mosque", ["I will put a thing in my box", "I will put stuff in a box"], { hint: "Which paints a picture?", why: "It has a clear, special image.", tag: "mybox.chk1" })),
    H("Stop 2: Write and perform"),
    SAY("Write two lines. Make them as imaginative as you can.", T("Write two lines, then perform them.")),
    EB("classroom", "Write and perform",
      SS("Write your first line. Start with I will put in my box.", S("Line one.", ["w", "✏️", 35, 58, 3], ["p", "📄", 72, 58, 3])),
      SS("Write a second line. Add one more special thing.", S("Line two.", ["p", "📄", 40, 58, 3], ["s", "✨", 75, 46, 2, "pulse"])),
      SS("Perform your poem with a lively voice. Friends listen and clap.", S("Perform.", ["v", "🗣️", 35, 56, 3], ["c", "👏", 72, 56, 3, "bounce"]))),
    ACT("My magic box", ["Paper and a pencil", "A listener"], ["Pick three special things for your box.", "Write two lines with strong words.", "Read them aloud with expression.", "Listen and clap for others."]),
    CHK(tf("We should perform our poem with expression.", true, { hint: "Make your voice lively.", why: "Expression shows feeling.", tag: "mybox.chk2" })),
    SAY("Let us remember. Pick special things, write strong lines, and perform with expression.", SUM("Pick special things for your box", "Write two strong lines", "Perform with expression and listen kindly")),
    GLOSS({ perform: "To say or act something for an audience.", special: "Very important to you.", smell: "What your nose tells you.", mosque: "A Muslim place of prayer.", frosty: "Covered in tiny ice crystals." }),
  ],
  mini: [
    mc("What goes in your magic box?", "Special things you imagine", ["Only boring things", "Nothing at all"], { hint: "Make it wonderful.", why: "Choose special things." }),
    tf("We listen and clap when others perform.", true, { hint: "Be kind.", why: "Kind listening is polite." }),
    mc("How many lines do we write?", "Two", ["Twenty", "None"], { hint: "Check the activity.", why: "We write two lines." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Zainab's magic box", backdrop: "home", caption: "Zainab opens an imaginary box and pulls out wonderful things.",
  scenes: [
    { caption: "The box.", say: "Zainab finds a magic box. She opens it slowly.",
      items: [{ id: "z", emoji: "👧", label: "Zainab", x: 28, y: 58, size: 3 }, { id: "b", emoji: "📦", x: 72, y: 58, size: 3, anim: "pulse" }] },
    { caption: "A sunrise.", say: "Out comes a sunrise over Badshahi Mosque.",
      items: [{ id: "s", emoji: "🌅", x: 50, y: 46, size: 3, enter: "grow" }, { id: "m", emoji: "🕌", x: 78, y: 60, size: 2 }] },
    { caption: "Rain.", say: "Then the smell of rain on a Lahore roof.",
      items: [{ id: "r", emoji: "🌧️", x: 50, y: 40, size: 3, anim: "float" }] },
    { caption: "A sound.", say: "Pitter-patter, pitter-patter, the rain sings.",
      items: [{ id: "r", emoji: "🌧️", x: 35, y: 40, size: 3 }, { id: "n", emoji: "🎵", x: 72, y: 44, size: 2, anim: "float" }] },
    { caption: "Snow.", say: "Next, snow in Gilgit, soft as a cloud.",
      items: [{ id: "s", emoji: "❄️", x: 50, y: 44, size: 3, anim: "float" }] },
    { caption: "A lantern.", say: "A glowing lantern lights up the room.",
      items: [{ id: "l", emoji: "🏮", x: 50, y: 44, size: 3, effect: "glow" }] },
    { caption: "Nani.", say: "The last thing is Nani's laughter. It warms the whole box.",
      items: [{ id: "n", emoji: "👵", x: 35, y: 58, size: 3 }, { id: "h", emoji: "💗", x: 72, y: 44, size: 3, effect: "hearts" }] },
    { caption: "A poem.", say: "Zainab writes two lines and performs them with expression.",
      items: [{ id: "z", emoji: "🗣️", x: 35, y: 56, size: 3 }, { id: "p", emoji: "📜", x: 72, y: 58, size: 3, effect: "sparkle" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- box (q1-q8)
  Q("box", "apply", "box.items_ms", ms("Which two things could a poet put in a magic box? Pick two.", ["The colour of joy", "The sound of rain"], ["A table", "A worksheet"], { hint: "Think about imagination.", why: "A poet can imagine colours and sounds." }),
    ms("Pick two wonderful things for a magic box.", ["A pocket of stars", "A jar of laughter"], ["A broken chair", "A spare sock"], { hint: "Think about imagination.", why: "Stars and laughter are imaginative." })),
  Q("box", "reason", "box.only_real", mc("Sam says a poet can only list real things. Is he right?", "No, a poet can imagine anything", ["Yes, only real things are allowed", "Yes, imagination is banned"], { hint: "Think about a pocket of stars.", why: "Poets use imagination." }),
    mc("Hana says poets must only write what is true. Is she right?", "No, poets can imagine wonderful things", ["Yes, truth only", "Yes, imagination is wrong"], { hint: "Think about the magic box.", why: "Poets can imagine." })),
  Q("box", "apply", "box.verse_sld", sld("A poem has 3 verses. Each verse has 4 lines. Slide to show how many lines there are in all.", { min: 0, max: 14, unit: "lines" }, 12, 0, { hint: "4 + 4 + 4.", why: "3 verses of 4 lines make 12 lines." }),
    sld("A poem has 2 verses. Each verse has 5 lines. Slide to show how many lines there are in all.", { min: 0, max: 12, unit: "lines" }, 10, 0, { hint: "5 + 5.", why: "2 verses of 5 lines make 10 lines." })),
  Q("box", "recall", "box.imagery", mc("What is imagery?", "Words that make a picture in your mind", ["A way to count words", "A kind of rhyme"], { hint: "Think of pictures.", why: "Imagery paints pictures." }),
    mc("What does imagery help us do?", "See things in our minds", ["Count the lines", "Spell words"], { hint: "Think of pictures.", why: "Imagery helps us picture the poem." })),
  Q("box", "reason", "box.always_rhyme", mc("Aisha says poems always rhyme. Is she right?", "No, many poems do not rhyme", ["Yes, every poem rhymes", "Yes, poems must rhyme"], { hint: "Think of The Magic Box.", why: "Poems can rhyme or not." }),
    mc("Layla says a poem is not a poem unless it rhymes. Is she right?", "No, poems can be free from rhyme", ["Yes, rhyme is a must", "Yes, only rhymes count"], { hint: "Think about imagery.", why: "A poem does not have to rhyme." })),
  Q("box", "apply", "box.item_tap", hot("Tap the best thing for a magic box.", [["🌈", "a pocket of rainbow", 22, 50], ["🪑", "a chair", 50, 50], ["🧱", "a brick", 78, 50]], ["a pocket of rainbow"], { labels: true, hint: "Which is imaginative?", why: "A pocket of rainbow is imaginative." }),
    hot("Tap the item that is most magical.", [["🌌", "a jar of stars", 22, 50], ["🥄", "a spoon", 50, 50], ["📏", "a ruler", 78, 50]], ["a jar of stars"], { labels: true, hint: "Which is imaginative?", why: "A jar of stars is imaginative." })),
  Q("box", "recall", "box.poet_st", st("What do we call a person who writes poems?", ["poet", "a poet"], { hint: "It starts with p.", why: "A poem writer is a poet." }),
    st("What do we call a group of lines in a poem?", ["verse", "a verse", "stanza"], { hint: "It starts with v.", why: "A group of lines is a verse." })),
  Q("box", "apply", "box.imagine_tf", tf("A poem can hold imaginary things.", true, { hint: "Think of the magic box.", why: "A poet can imagine anything." }),
    tf("A poem can only have things from a shop.", false, { hint: "Think about imagination.", why: "Poems can be about imagined things." })),
  // ----- more (q9-q16)
  Q("more", "apply", "box.line_choice", mc("Which of these lines uses more imagination?", "I keep a sunset in my pocket", ["I keep a coin in my pocket", "I keep a bus ticket in my pocket"], { hint: "Which one is not real?", why: "A sunset in a pocket is imagined." }),
    mc("Pick the more imaginative line.", "My hat is made of clouds", ["My hat is made of cotton", "My hat is on my head"], { hint: "Which one is not real?", why: "A hat of clouds is imagined." })),
  Q("more", "reason", "box.expression", mc("Omar says reading with expression changes nothing. Is he right?", "No, expression helps listeners feel the poem", ["Yes, expression is pointless", "Yes, listeners do not care"], { hint: "Think of voice.", why: "Expression helps show feelings." }),
    mc("Mira says a flat voice is the best for poems. Is she right?", "No, a lively voice shows feeling", ["Yes, flat is best", "Yes, never change your voice"], { hint: "Think of the sunrise.", why: "A lively voice helps." })),
  Q("more", "reason", "box.no_imagination", mc("Layla says imagination is not needed for poems. Is she right?", "No, imagination gives poems their special pictures", ["Yes, poems need none", "Yes, imagination spoils poems"], { hint: "Think about magic boxes.", why: "Imagination helps poets create pictures." }),
    mc("Ali says only facts belong in poems. Is he right?", "No, poems use imagination too", ["Yes, facts only", "Yes, imagination is forbidden"], { hint: "Think about stars in a pocket.", why: "Imagination is part of poems." })),
  Q("more", "apply", "box.fill_sound", fill("Complete the lines.", "In my box I will put the {b1} of the sea and the {b2} of rain.", [["sound", "table", "pencil"], ["smell", "chair", "page"]], { hint: "Think about senses.", why: "Sound and smell are things we sense." }),
    fill("Finish the lines.", "I will put in my box the {b1} of a bell and the {b2} of a rainbow.", [["ring", "wall", "shoe"], ["colours", "sock", "knee"]], { hint: "Think about senses.", why: "A bell rings and a rainbow has colours." })),
  Q("more", "apply", "box.line_match", mat("Match each line to the picture it makes.", [["a spoonful of sunshine", "warm gold light"], ["a pocket of stars", "a night sky"], ["a jar of laughter", "happy sounds"]], { hint: "Think about the picture.", why: "Each line paints a picture." }),
    mat("Join each line to its picture.", [["a bag of thunder", "a loud rumble"], ["a cup of moonlight", "silver light"], ["a bowl of snow", "soft white"]], { hint: "Think about the picture.", why: "Each line paints a picture." })),
  Q("more", "apply", "box.poem_ord", ord("Put the lines of this tiny poem in order.", ["Open the box", "Out jumps a rainbow", "Dance and glow", "Then it is gone"], { hint: "Start with opening.", why: "The poem follows the box opening." }),
    ord("Put the lines in order.", ["The box creaks", "A star floats out", "It lights the room", "We say goodnight"], { hint: "Start with the creak.", why: "The poem tells what happens in order." })),
  Q("more", "apply", "box.read_sld", sld("Zainab reads 2 lines of a 6-line poem. Slide to show how many lines are left.", { min: 0, max: 8, unit: "lines" }, 4, 0, { hint: "6 take away 2.", why: "6 - 2 = 4 lines." }),
    sld("Hamza reads 3 lines of a 7-line poem. Slide to show how many lines are left.", { min: 0, max: 8, unit: "lines" }, 4, 0, { hint: "7 take away 3.", why: "7 - 3 = 4 lines." })),
  Q("more", "apply", "box.sound_ms", ms("Pick two sound words.", ["splash", "buzz"], ["table", "sleep"], { hint: "Which copy noises?", why: "Splash and buzz copy noises." }),
    ms("Choose two words that copy a noise.", ["boom", "ding"], ["window", "walk"], { hint: "Which copy noises?", why: "Boom and ding copy noises." })),
  // ----- pictures (q17-q23)
  Q("pictures", "apply", "box.sound_choice", mc("Which describes the sound of rain best?", "pitter-patter on the roof", ["a loud shout", "a slow snore"], { hint: "Light and quick.", why: "Pitter-patter sounds like rain." }),
    mc("Which describes the sound of a bell best?", "a clear ding", ["a quiet snore", "a long yawn"], { hint: "Short and bright.", why: "Ding sounds like a bell." })),
  Q("pictures", "reason", "box.toys_only", mc("Zainab says a magic box must hold toys only. Is she right?", "No, it can hold sounds, colours, feelings and more", ["Yes, toys only", "Yes, only objects are allowed"], { hint: "Think about the poem.", why: "A magic box can hold anything imagined." }),
    mc("Omar says a magic box can only hold things from a shop. Is he right?", "No, it can hold feelings and memories", ["Yes, shop things only", "Yes, no feelings allowed"], { hint: "Think about laughter.", why: "A magic box can hold imaginative things." })),
  Q("pictures", "apply", "box.feel_match", mat("Match each thing to how it feels or looks.", [["sunshine", "warm and gold"], ["thunder", "loud and rumbling"], ["snow", "soft and white"]], { hint: "Think about each picture.", why: "Each thing has its own picture." }),
    mat("Join each thing to how it feels or looks.", [["a lantern", "glowing and soft"], ["a drum", "booming and deep"], ["a feather", "light and fluffy"]], { hint: "Think about each picture.", why: "Each thing has its own picture." })),
  Q("pictures", "apply", "box.simile_fill", fill("Finish the feeling picture.", "Her laugh was as bright as a {b1} and as light as a {b2}.", [["star", "stone", "mud"], ["feather", "rock", "brick"]], { hint: "Think of bright and light.", why: "A star is bright and a feather is light." }),
    fill("Complete the feeling picture.", "His joy was as warm as the {b1} and as big as the {b2}.", [["sun", "ice", "fog"], ["sky", "pin", "dot"]], { hint: "Think of warm and big.", why: "The sun is warm and the sky is big." })),
  Q("pictures", "reason", "box.cannot_see", mc("Sam says you cannot show laughter in a poem because you cannot see it. Is he right?", "No, a poet can compare it to a picture, like light", ["Yes, laughter cannot be written", "Yes, only seen things can be in poems"], { hint: "Think of the lantern.", why: "Poets compare feelings to pictures." }),
    mc("Mira says feelings cannot be in a poem. Is she right?", "No, poems are full of feelings", ["Yes, never", "Yes, feelings are not allowed"], { hint: "Think about joy.", why: "Poems often show feelings." })),
  Q("pictures", "recall", "box.sound_st", st("Write a word for the sound a bell makes.", ["ding", "ring", "dong", "chime", "clang", "ting"], { hint: "It is short and bright.", why: "Ding is a bell sound." }),
    st("Write a word for the sound of rain.", ["pitter-patter", "patter", "drip", "pitter", "splash", "drizzle"], { hint: "It is light and quick.", why: "Pitter-patter sounds like rain." })),
  Q("pictures", "apply", "box.rhyme_tf", tf("A poem can have no rhyme at all.", true, { hint: "Think of poems without rhyme.", why: "Poems do not have to rhyme." }),
    tf("Every poem must use the word magic.", false, { hint: "Think of any poem.", why: "Poems can use any words." })),
  // ----- mybox (q24-q30)
  Q("mybox", "reason", "box.same_box", mc("Aisha says the poet and you imagine exactly the same box. Is she right?", "No, each reader imagines it a little differently", ["Yes, everyone sees the same", "Yes, the poet decides your thoughts"], { hint: "Think about different ideas.", why: "Each reader pictures it differently." }),
    mc("Layla says a poem means the same to everyone. Is she right?", "No, we all picture it a little differently", ["Yes, the same", "Yes, exactly"], { hint: "Think about imagination.", why: "Readers imagine differently." })),
  Q("mybox", "reason", "box.short_poem", mc("Omar says a poem cannot be short. Is he right?", "No, a poem can be just a few lines", ["Yes, poems are always long", "Yes, short poems are banned"], { hint: "We write two lines.", why: "A poem can be short." }),
    mc("Mira says a poem needs at least twenty lines. Is she right?", "No, a poem can be two lines", ["Yes, twenty", "Yes, long only"], { hint: "Think about our activity.", why: "Short poems are poems too." })),
  Q("mybox", "apply", "box.steps_ord", ord("Put the writing steps in order.", ["Pick items for my box", "Write line one", "Write line two", "Read it aloud"], { hint: "Pick first.", why: "Pick, write, write, read." }),
    ord("Put the steps in order.", ["Choose special things", "Write two lines", "Practise with expression", "Perform for friends"], { hint: "Choose first.", why: "Choose, write, practise, perform." })),
  Q("mybox", "apply", "box.strong_line", mc("Which line is strongest?", "I will put in my box the smell of rain on a hot roof", ["I will put a thing in my box", "I will put some stuff in my box"], { hint: "Which paints a picture?", why: "It names something special and clear." }),
    mc("Pick the strongest line.", "I will put in my box a lantern glowing at Eid", ["I will put an object in", "I will put a lantern"], { hint: "Which paints a picture?", why: "It has detail and imagery." })),
  Q("mybox", "apply", "box.imaginative_tap", hot("Tap the most imaginative item.", [["🌅", "a sunrise in a bottle", 22, 50], ["🪑", "a chair", 50, 50], ["🧱", "a brick", 78, 50]], ["a sunrise in a bottle"], { labels: true, hint: "Which one is not real?", why: "A sunrise in a bottle is imagined." }),
    hot("Tap the most imaginative line.", [["1️⃣", "a pocket full of rainbows", 22, 50], ["2️⃣", "a pocket full of keys", 50, 50], ["3️⃣", "a pocket full of lint", 78, 50]], ["a pocket full of rainbows"], { labels: true, hint: "Which one is not real?", why: "Rainbows in a pocket are imagined." })),
  Q("mybox", "apply", "box.fill_mine", fill("Finish the lines for your box.", "My box will hold the {b1} of rain and the {b2} of a lantern.", [["smell", "table", "pencil"], ["glow", "wall", "knee"]], { hint: "Think about senses.", why: "Rain has a smell and a lantern glows." }),
    fill("Complete the lines for your box.", "My box will hold Nani's {b1} and a sunrise over {b2}.", [["laughter", "wall", "table"], ["Lahore", "pencil", "chair"]], { hint: "Think about special things.", why: "Laughter and a Lahore sunrise are special." })),
  Q("mybox", "apply", "box.perform_tf", tf("We should perform our poem with a lively voice.", true, { hint: "Show feeling.", why: "Expression shows feeling." }),
    tf("We should read our poem in a flat voice.", false, { hint: "Show feeling.", why: "A flat voice hides feeling." })),
];

export const topics = [
  topicLesson({
    slug: "english-class-1-magic-box-poems", subject: "english", cls: 1, topic: 11, title: "Imaginative Poems: The Magic Box",
    summary: "Read imaginative poems, then write and perform your own magic box lines.",
    unit: "Topic 11: The Magic Box", difficulty: 1,
    objectives: ["Read a poem with expression", "Find imaginative pictures in words", "Write and perform two lines of your own"],
    success_criteria: ["I can read a poem with expression", "I can find imagery in a poem", "I can write and perform two lines"],
    real_life: "Lanterns at Eid, rain on a Lahore roof, snow in Gilgit, and British nursery rhymes with Urdu rhymes said aloud.",
    standards: [NC("Y2 poetry", "Listen to, discuss and recite poems; read with intonation; discuss word meaning and imagery; write poetry")],
    warm_up: [
      mc("What does a poet write?", "Poems", ["Maps", "Recipes"], { hint: "Think about the word poet.", why: "A poet writes poems." }),
      tf("Rhyming words end with the same sound.", true, { hint: "Think of cat and hat.", why: "Rhymes share an ending sound." }),
      mc("Which word copies a sound?", "boom", ["table", "chair"], { hint: "It copies a noise.", why: "Boom copies a noise." }),
    ],
    intro: [],
    subs: [box, more, pictures, mybox],
    clip,
    quiz,
  }),
];
