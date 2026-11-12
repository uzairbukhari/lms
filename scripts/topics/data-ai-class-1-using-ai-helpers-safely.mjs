import { SAY, SS, H, T, PHOTO, ACT, MAN, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Computer Science, Data & AI, Class 1 (Sam, age 7), topic 12: Using AI helpers safely.
// Story thread: Sam asks a voice helper when Eid falls, finds it unsure, and checks with Abbu and the calendar.
const BOOK = "data-ai-class-1-using-ai-helpers-safely-1-adb161ec.jpg";
const MOON = "data-ai-class-1-using-ai-helpers-safely-2-1c3ddabc.jpg";
const OKM = (label) => ["ok", "✅", 50, 88, 2, "bounce", label];
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });

// ---------------------------------------------------------------------------------------------- 1. learn
const helpers = {
  id: "helpers", kind: "learn", title: "Helpers that talk",
  blocks: [
    H("Welcome back, safe explorer!"),
    SAY("Today we meet AI helpers. Sam wants to ask his family's voice helper a question.",
      T("Today's big question: how do we use AI helpers safely?")),
    SAY("Sam wants to know the day of Eid. The new crescent moon helps people decide.",
      PHOTO(MOON, "A thin crescent moon in a dark purple evening sky with tree branches", "A thin crescent moon. People watch for it to mark a new month.", "Photo by Rob Wicks on Unsplash")),
    H("Stop 1: Voice helpers use AI"),
    SAY("A voice helper listens and answers. It uses AI, which is a computer program made by people.",
      T("An **AI helper** is a program that can talk or answer questions.")),
    EXP("A voice helper",
      SS("Sam asks a question. The helper listens with a microphone.", S("Listen.", ["s", "🧒", 25, 50, 3, "bounce"], ["m", "🎤", 70, 50, 3, "pulse"])),
      SS("The program finds an answer from lots of information.", S("Find.", ["p", "💻", 40, 50, 3, "pulse"], ["i", "📚", 75, 50, 3])),
      SS("It speaks the answer. It sounds clever. But it is only a program.", S("Answer.", ["h", "🔊", 40, 50, 3, "bounce"], ["a", "🤖", 75, 50, 3, "pulse", "program"], OKM("a program")))),
    CHK(mc("What is a voice helper?", "A program that listens and answers", ["A pet that talks", "A real person inside"], { hint: "It uses AI.", why: "A voice helper is a program made by people.", tag: "helper.meaning" })),
    H("Stop 2: They can be wrong"),
    SAY("A helper sounds sure. But it can be wrong. Sam asks when Eid falls. It says it is unsure.",
      T("A helper can be **wrong**. Check important answers.")),
    EXP("The unsure helper",
      SS("Sam asks: what day is Eid? The helper says, I am not sure.", S("Not sure.", ["s", "🧒", 25, 50, 3], ["h", "🔊", 70, 40, 3, "pulse", "not sure"])),
      SS("Eid depends on the moon. A helper might not know the latest news.", S("The moon.", ["m", "🌙", 30, 40, 3, "float"], ["q", "❓", 72, 50, 3, "pulse"])),
      SS("So Sam checks with Abbu and the calendar. That is wise.", S("Check.", ["a", "👨", 30, 52, 3], ["c", "📅", 70, 50, 3, "pulse"], OKM("check it")))),
    CHK(tf("An AI helper is always right.", false, { hint: "Think about the unsure helper.", why: "A helper can be wrong or unsure.", tag: "helper.wrong" })),
    SAY("Let us remember. An AI helper is a program. It can be wrong. Check important things.",
      SUM("An AI helper is a program made by people", "It can be wrong or unsure", "Check important answers with a grown-up")),
    GLOSS({ "AI helper": "A program that can talk or answer questions.", wrong: "Not correct.", unsure: "Not sure.", program: "Instructions a computer follows.", microphone: "A part that hears sound.", calendar: "A chart that shows the days of the year." }),
  ],
  mini: [
    mc("Who made the AI in a voice helper?", "People", ["Clouds", "Birds"], { hint: "It is a program.", why: "People write programs." }),
    tf("A helper can sound sure and still be wrong.", true, { hint: "Sounding sure is not proof.", why: "A helper can be wrong." }),
    mc("What should Sam do when the helper is unsure?", "Check with a grown-up or a calendar", ["Guess", "Ignore it"], { hint: "Ask someone who knows.", why: "Checking helps." }),
    mc("What does a microphone do?", "Hears sound", ["Takes photos", "Plays music"], { hint: "It listens.", why: "A microphone hears sound." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const askcheck = {
  id: "askcheck", kind: "try", title: "Ask and check",
  blocks: [
    H("Stop 1: Ask a question together"),
    SAY("Sam asks with Abbu beside him. A safe question is about facts, like how far away the Moon is.",
      T("Ask safe questions with a **grown-up** beside you.")),
    EXP("Safe and unsafe questions",
      SS("A safe question: how many days are in a week?", S("Safe.", ["s", "✅", 30, 50, 3, "bounce"], ["q", "📅", 70, 50, 3])),
      SS("An unsafe thing to say: our home address or a password.", S("Unsafe.", ["u", "🚫", 30, 50, 3, "pulse"], ["a", "🏠", 70, 50, 3])),
      SS("Keep private things private, even when it feels friendly.", S("Private.", ["l", "🔒", 50, 50, 3, "pulse", "private"], OKM("keep private")))),
    MAN("Sort the questions", "Move the 6 questions into Safe or Not safe.", "❓", 6, ["Safe to ask", "Not safe"]),
    CHK(mc("Which is a safe thing to ask a helper?", "How many legs does a spider have?", ["What is our home address?", "What is my password?"], { hint: "Not private.", why: "A fact question keeps private things private.", tag: "helper.safe_q" })),
    H("Stop 2: Check with a book or adult"),
    SAY("After the helper answers, Sam checks. He looks in a book. He asks Abbu.",
      T("**Check** an answer with a book or a trusted adult.")),
    SAY("A book is one way to check. A grown-up can help too.",
      PHOTO(BOOK, "An open book with its pages fanned out against a plain background", "Checking in a book is a good way to be sure.", "Photo by Olga Tutunaru on Unsplash")),
    EXP("Check it",
      SS("The helper says: a spider has eight legs.", S("The answer.", ["h", "🔊", 30, 50, 3], ["s", "🕷️", 70, 50, 3])),
      SS("Sam checks in a book. It says eight legs too.", S("Book.", ["b", "📖", 30, 50, 3, "pulse"], ["t", "✅", 70, 50, 3, "bounce"])),
      SS("Now Sam is sure. Checking helps us trust good answers.", S("Sure.", ["s", "🧒", 50, 50, 3, "bounce"], OKM("checked")))),
    SAY("Now you try. Ask a grown-up to help you ask and check.",
      ACT("Ask and check", ["A voice helper or app, with a grown-up", "A book"], ["Ask a safe question together, like how many days are in a week.", "Look up the answer in a book too.", "Did they match? Tell a grown-up."])),
    CHK(tf("It is a good idea to check important answers.", true, { hint: "Helpers can be wrong.", why: "Checking helps us be sure.", tag: "helper.check" })),
    SAY("Let us remember. Ask safe questions with a grown-up. Check the answers.",
      SUM("Ask safe questions with a grown-up", "Never share private things", "Check answers in a book or with an adult")),
    GLOSS({ check: "To make sure something is right.", private: "Only for you and your family.", grown_up: "An adult who looks after you.", "trusted adult": "A grown-up you know well and trust.", fact: "Something that is true." }),
  ],
  mini: [
    mc("Which is private?", "Our home address", ["The days of the week", "The colour blue"], { hint: "Where you live.", why: "An address is private." }),
    tf("A book can help check an answer.", true, { hint: "Look it up.", why: "A book is a good check." }),
    mc("Who should be with you when you use a voice helper?", "A grown-up", ["Nobody", "A stranger"], { hint: "Someone who looks after you.", why: "A grown-up should be nearby." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const real = {
  id: "real", kind: "play", title: "Real or fake?",
  blocks: [
    H("Stop 1: Spot a made-up picture"),
    SAY("A picture can look real but be made up. A computer can make pictures that never happened.",
      T("A picture can look **real** and still be made up.")),
    EXP("Clues in a picture",
      SS("This picture shows a cow with five legs. That is odd.", S("Odd clue.", ["c", "🐄", 50, 50, 3, "pulse", "five legs?"])),
      SS("Cows have four legs. The picture may be made up.", S("Check the facts.", ["c", "🐄", 30, 50, 3], ["q", "❓", 70, 40, 3, "pulse"])),
      SS("We ask a grown-up if we are not sure.", S("Ask.", ["g", "👩", 30, 52, 3], ["s", "🧒", 70, 52, 3], OKM("ask a grown-up")))),
    CHK(mc("A picture shows a cow with five legs. What could that mean?", "The picture may be made up", ["Cows grow extra legs", "It must be real"], { hint: "Think about real cows.", why: "Odd details can show a picture is made up.", tag: "helper.fake_clue" })),
    H("Stop 2: Why people trick us"),
    SAY("Some people make fake pictures to trick us. They may want us to click, or to believe something that is not true.",
      T("Some people **trick** others online. Ask a grown-up.")),
    SAY("First a memory game. Then spot the odd one that cannot be real.",
      T("Play the memory game. Then spot a picture that cannot be real.")),
    BRAIN("memory_match", "Real or fake pairs", "Find the pairs.", ["🔍", "🙋", "📖", "🔒"]),
    CHK(hot("Tap the one that cannot be real.", [["🐘", "Elephant", 22, 50], ["🦄", "Unicorn", 50, 50], ["🐎", "Horse", 78, 50]], ["Unicorn"], { labels: true, hint: "Which animal is a story?", why: "Unicorns are made up.", tag: "helper.cannot_real" })),
    SAY("Let us remember. A picture that looks real can still be fake. Ask a grown-up.",
      SUM("Pictures can be made up", "Odd details can be clues", "Ask a trusted adult if you are unsure")),
    GLOSS({ fake: "Made up to look real when it is not.", trick: "To make someone believe something that is not true.", clue: "A small detail that helps you work something out.", real: "Truly there, not made up.", online: "Using the internet." }),
  ],
  mini: [
    mc("What is a fake picture?", "One made up to look real", ["A picture of a real place", "A drawing you made"], { hint: "Made up.", why: "A fake looks real but is not." }),
    tf("Some pictures online are made up.", true, { hint: "Computers can make pictures.", why: "Not every picture is real." }),
    mc("What should you do if a picture seems odd?", "Ask a grown-up", ["Share it quickly", "Believe it"], { hint: "Someone you trust.", why: "A grown-up can help." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const rules = {
  id: "rules", kind: "use", title: "Our family AI rules",
  blocks: [
    H("Stop 1: Write three rules"),
    SAY("Sam's family writes AI rules. A rule keeps everyone safe. They write three.",
      T("A family can write **rules** for AI helpers.")),
    SAY("Rule one: ask a grown-up before using a helper.",
      T("Rule 1: ask first.")),
    SAY("Rule two: never share private things like our name, address or password.",
      T("Rule 2: keep private things private.")),
    EXP("Three family rules",
      SS("Rule one is a hand up. Ask a grown-up first.", S("Rule 1.", ["r", "🙋", 50, 50, 3, "pulse", "ask first"])),
      SS("Rule two is a padlock. Keep private things private.", S("Rule 2.", ["r", "🔒", 50, 50, 3, "pulse", "private"])),
      SS("Rule three is a magnifier. Check important answers.", S("Rule 3.", ["r", "🔍", 50, 50, 3, "pulse", "check"], OKM("three rules")))),
    SAY("Rule three: check important answers. Tell a grown-up if something worries us.",
      ACT("Our family rules", ["Paper and crayons", "Your family"], ["Write three rules for using AI helpers.", "Draw a picture for each rule.", "Put your rules where everyone can see them."])),
    CHK(mat("Match each rule to its reason.", [["Ask a grown-up first", "They keep us safe"], ["Keep private things private", "Strangers could misuse them"], ["Check answers", "Helpers can be wrong"]], { hint: "Why do we have each rule?", why: "Each rule has a good reason.", tag: "helper.rule_reason" })),
    H("Stop 2: Who to tell"),
    SAY("If something online scares or confuses us, we stop and tell a trusted adult. We are not in trouble.",
      T("**Stop** and tell a trusted adult.")),
    EXP("Tell someone",
      SS("A message on the screen makes Sam feel worried.", S("Worried.", ["s", "🧒", 30, 50, 3, "pulse"], ["m", "📱", 70, 50, 3])),
      SS("He puts the device down and finds Abbu.", S("Stop.", ["d", "📱", 30, 50, 3], ["a", "👨", 70, 52, 3, "bounce"])),
      SS("Abbu listens and helps. Telling was the right thing.", S("Tell.", ["a", "👨", 30, 52, 3], ["s", "🧒", 70, 52, 3], OKM("telling is right")))),
    CHK(tf("We should tell a trusted adult if something online worries us.", true, { hint: "Who can help?", why: "A trusted adult can help.", tag: "helper.tell" })),
    SAY("Let us remember. Rules keep us safe. Always tell a trusted adult.",
      SUM("Write family rules for AI helpers", "Ask first, keep private, check answers", "Stop and tell a trusted adult")),
    GLOSS({ stop: "To pause what you are doing.", rule: "A sentence that says how we should act.", worried: "Feeling that something may not be right.", "trusted adult": "A grown-up you know well and trust.", safe: "Not likely to be hurt." }),
  ],
  mini: [
    mc("What is a family rule for AI helpers?", "Ask a grown-up first", ["Share your password", "Never tell anyone"], { hint: "Think about safety.", why: "Asking first keeps us safe." }),
    tf("We are in trouble if we tell an adult we are worried.", false, { hint: "Telling is good.", why: "We are never in trouble for telling." }),
    mc("Who is a trusted adult?", "A parent or teacher", ["A stranger online", "A pop-up message"], { hint: "Someone who looks after you.", why: "Parents and teachers are trusted." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Sam asks about Eid", backdrop: "home", caption: "Sam asks a voice helper when Eid falls and checks with Abbu.",
  scenes: [
    { caption: "A question.", say: "Sam wants to know the day of Eid. He asks the voice helper.",
      items: [{ id: "s", emoji: "🧒", label: "Sam", x: 25, y: 56, size: 3, enter: "walk_right" }, { id: "h", emoji: "🔊", label: "helper", x: 72, y: 45, size: 3, enter: "pop" }] },
    { caption: "Unsure.", say: "The helper says it is not sure. Eid depends on the moon.",
      items: [{ id: "h", emoji: "🔊", x: 30, y: 50, size: 3, anim: "pulse" }, { id: "m", emoji: "🌙", x: 72, y: 35, size: 3, anim: "float" }] },
    { caption: "Ask Abbu.", say: "So Sam asks Abbu. Abbu listens carefully.",
      items: [{ id: "a", emoji: "👨", label: "Abbu", x: 35, y: 52, size: 3 }, { id: "s", emoji: "🧒", x: 72, y: 52, size: 3 }] },
    { caption: "Check the calendar.", say: "They check the calendar and the news about the moon.",
      items: [{ id: "c", emoji: "📅", x: 35, y: 50, size: 3, effect: "glow" }, { id: "n", emoji: "📰", x: 72, y: 50, size: 3 }] },
    { caption: "Private things.", say: "Sam never tells the helper his address. That is private.",
      items: [{ id: "h", emoji: "🏠", x: 35, y: 50, size: 3 }, { id: "n", emoji: "🚫", x: 72, y: 50, size: 3, enter: "pop" }] },
    { caption: "A fake picture.", say: "Sam sees a picture of a cow with five legs. It looks odd.",
      items: [{ id: "c", emoji: "🐄", label: "five legs?", x: 50, y: 48, size: 3, anim: "pulse" }] },
    { caption: "Tell Abbu.", say: "He tells Abbu. Abbu says, good checking, Sam.",
      items: [{ id: "a", emoji: "👨", x: 30, y: 52, size: 3 }, { id: "s", emoji: "🧒", x: 70, y: 52, size: 3, effect: "hearts" }] },
    { caption: "Family rules.", say: "At home they put up their three AI rules.",
      items: [{ id: "r", emoji: "📜", label: "3 rules", x: 50, y: 48, size: 3, enter: "grow", effect: "glow" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- helpers (q1-q8)
  Q(mc("What is an AI helper?", "A computer program that can talk or answer questions", ["A living pet", "A person hiding in the speaker"], { hint: "It is made by people.", why: "An AI helper is a computer program.", tag: "helper.meaning" }), "helpers", "recall",
    [mc("Which describes an AI helper?", "A program made by people to answer questions", ["A magic friend", "A hidden person"], { hint: "It is made by people.", why: "An AI helper is a program.", tag: "helper.meaning" })]),
  Q(mc("Which is an example of a voice helper?", "A speaker that answers when you ask a question", ["A wooden spoon", "A paper plane"], { hint: "It listens and answers.", why: "A voice helper listens and answers.", tag: "helper.example" }), "helpers", "recall",
    [mc("Which could be a voice helper?", "A phone that answers spoken questions", ["A bucket", "A kite"], { hint: "It listens and answers.", why: "A phone can run a voice helper.", tag: "helper.example" })]),
  Q(tf("An AI helper can be wrong.", true, { hint: "Think about the unsure helper.", why: "A helper can make mistakes.", tag: "helper.wrong" }), "helpers", "recall",
    [tf("An AI helper can never be wrong.", false, { hint: "Think about the unsure helper.", why: "A helper can make mistakes.", tag: "helper.wrong" })]),
  Q(mat("Match each thing to private or fine to share.", [["Home address", "Keep private"], ["Favourite colour", "Fine to share"], ["Password", "Keep private"]], { hint: "Think about what only family should know.", why: "Addresses and passwords are private.", tag: "helper.private_match" }), "helpers", "apply",
    [mat("Sort each thing as private or fine to share.", [["School name", "Keep private"], ["Favourite fruit", "Fine to share"], ["Phone number", "Keep private"]], { hint: "Think about what only family should know.", why: "School names and phone numbers are private.", tag: "helper.private_match" })]),
  Q(hot("Tap the part that listens.", [["🎤", "Microphone", 22, 50], ["🔊", "Speaker", 50, 50], ["🔋", "Battery", 78, 50]], ["Microphone"], { labels: true, hint: "It hears.", why: "A microphone listens.", tag: "helper.tap_mic" }), "helpers", "recall",
    [hot("Tap the part that speaks.", [["🎤", "Microphone", 22, 50], ["🔊", "Speaker", 50, 50], ["🔋", "Battery", 78, 50]], ["Speaker"], { labels: true, hint: "It plays sound.", why: "A speaker plays sound.", tag: "helper.tap_speaker" })]),
  Q(mc("Sam says if an AI helper sounds sure, it must be right. Is he right?", "No. A helper can sound sure and still be wrong", ["Yes, sounding sure means right", "Yes, helpers know everything"], { hint: "Think about checking.", why: "Sounding sure is not proof.", tag: "helper.reason_sure" }), "helpers", "reason",
    [mc("Mina says a loud, clear voice means the answer is true. Is she right?", "No. A clear voice can still give a wrong answer", ["Yes, loud means true", "Yes, clear means true"], { hint: "Think about checking.", why: "Sounding clear is not proof.", tag: "helper.reason_sure" })]),
  Q(mc("Sam says an AI helper can feel sad. Is he right?", "No. It is a program. It does not have feelings", ["Yes, it feels sad", "Yes, it cries"], { hint: "Is it alive?", why: "AI does not feel.", tag: "helper.reason_feel" }), "helpers", "reason",
    [mc("Hana says the helper is lonely when switched off. Is she right?", "No. A program has no feelings", ["Yes, lonely", "Yes, it misses her"], { hint: "Is it alive?", why: "AI does not feel.", tag: "helper.reason_feel" })]),
  Q(fill("Finish the sentences about safety.", "Never share your {b1} or your {b2} with a helper.", [["address", "colour", "age in years"], ["password", "shoe", "lunch"]], { hint: "Think about private things.", why: "Addresses and passwords are private.", tag: "helper.fill_private" }), "helpers", "recall",
    [fill("Complete the sentences about helpers.", "An AI helper is a {b1}. It can be {b2}.", [["program", "person", "pet"], ["wrong", "alive", "hungry"]], { hint: "Think about what it is.", why: "An AI helper is a program and can be wrong.", tag: "helper.fill_private" })]),
  // ----- askcheck (q9-q15)
  Q(mc("Which is a safe question for a helper?", "How many days are in a week?", ["What is our home address?", "What is my password?"], { hint: "Not private.", why: "A fact question is safe.", tag: "helper.safe_question" }), "askcheck", "apply",
    [mc("Which is a safe question to ask a helper?", "How tall is a giraffe?", ["Where do I live?", "What is the family password?"], { hint: "Not private.", why: "A fact question is safe.", tag: "helper.safe_question" })]),
  Q(ms("Which two should you never tell a helper? Pick two.", ["Your home address", "Your password"], ["Your favourite fruit", "A fact you learned"], { hint: "Think about private things.", why: "Addresses and passwords are private.", tag: "helper.never_tell" }), "askcheck", "apply",
    [ms("Which two should stay private? Pick two.", ["Your phone number", "Your full name"], ["Your favourite animal", "A joke"], { hint: "Think about private things.", why: "Phone numbers and full names are private.", tag: "helper.never_tell" })]),
  Q(ord("Put the steps in order.", ["Ask a question with a grown-up", "Hear the answer", "Check it in a book"], { hint: "Ask first.", why: "Ask, hear, then check.", tag: "helper.ask_check_steps" }), "askcheck", "apply",
    [ord("Put the steps in order for checking an answer.", ["The helper gives an answer", "You ask a grown-up", "You decide if it is right"], { hint: "Answer first.", why: "Answer, ask, then decide.", tag: "helper.ask_check_steps" })]),
  Q(sld("Sam checks an answer in 1 book and asks 1 grown-up. Slide to show how many ways he checked.", { min: 0, max: 5 }, 2, 0, { hint: "1 + 1.", why: "1 + 1 = 2 ways.", tag: "helper.ways_checked" }), "askcheck", "apply",
    [sld("Aisha checks in 2 books and asks 1 grown-up. Slide to show how many ways she checked.", { min: 0, max: 5 }, 3, 0, { hint: "2 + 1.", why: "2 + 1 = 3 ways.", tag: "helper.ways_checked" })]),
  Q(mc("Aisha says she does not need to check AI answers. Is she right?", "No. Helpers can be wrong, so important answers need checking", ["Yes, never check", "Yes, helpers are always right"], { hint: "Think about the unsure helper.", why: "Checking keeps us right.", tag: "helper.reason_check" }), "askcheck", "reason",
    [mc("Omar says checking an answer is a waste of time. Is he right?", "No. Checking helps us find mistakes", ["Yes, a waste", "Yes, helpers are never wrong"], { hint: "Think about the unsure helper.", why: "Checking finds mistakes.", tag: "helper.reason_check" })]),
  Q(mc("Aisha says a nice voice helper is her friend who keeps secrets. Is she right?", "No. A helper is a program. Secrets should be told to trusted adults", ["Yes, it keeps secrets", "Yes, it is her best friend"], { hint: "Is it a person?", why: "A helper is a program, not a friend who keeps secrets.", tag: "helper.reason_friend" }), "askcheck", "reason",
    [mc("Ben says he can tell the helper a secret he does not want anyone to know. Is he right?", "No. He should tell a trusted adult instead", ["Yes, helpers keep secrets", "Yes, nobody else can hear"], { hint: "Who can truly help?", why: "A trusted adult is the right person to tell.", tag: "helper.reason_friend" })]),
  Q(ms("Which two ways can you check an AI answer? Pick two.", ["Ask a grown-up", "Look in a book"], ["Believe it at once", "Ask the helper again only"], { hint: "Use another source.", why: "A grown-up and a book are good checks.", tag: "helper.check_ways" }), "askcheck", "apply",
    [ms("Which two help you check an answer? Pick two.", ["A teacher", "A trusted website a grown-up picks"], ["A pop-up advert", "A stranger's message"], { hint: "Use trusted sources.", why: "Teachers and trusted websites help.", tag: "helper.check_ways" })]),
  // ----- real (q16-q23)
  Q(tf("A fake picture can look real.", true, { hint: "Computers can make pictures.", why: "Fakes can look real.", tag: "helper.fake_real" }), "real", "recall",
    [tf("A fake picture always looks fake.", false, { hint: "Some look very real.", why: "Fakes can look real.", tag: "helper.fake_real" })]),
  Q(mc("A picture shows a dog with three tails. What does that clue tell you?", "It may be made up", ["Dogs have three tails", "It is certainly real"], { hint: "Count the tails dogs have.", why: "Odd details can show a made-up picture.", tag: "helper.odd_clue" }), "real", "apply",
    [mc("A photo shows a bird with four wings. What does that clue tell you?", "It may be made up", ["Birds have four wings", "It is certainly real"], { hint: "Count the wings birds have.", why: "Odd details can show a made-up picture.", tag: "helper.odd_clue" })]),
  Q(num("Hana checks 3 pictures. 1 is real. How many pictures might be made up?", 2, { hint: "3 take away 1.", why: "3 - 1 = 2 pictures.", tag: "helper.count_pictures" }), "real", "apply",
    [num("Sam checks 5 pictures. 2 are real. How many might be made up?", 3, { hint: "5 take away 2.", why: "5 - 2 = 3 pictures.", tag: "helper.count_pictures" })]),
  Q(hot("Tap the picture that cannot be real.", [["🐘", "Elephant", 22, 50], ["🐉", "Dragon", 50, 50], ["🐎", "Horse", 78, 50]], ["Dragon"], { labels: true, hint: "Which one is only in stories?", why: "Dragons are made up.", tag: "helper.tap_fake" }), "real", "recall",
    [hot("Tap the picture of something made up.", [["🐄", "Cow", 22, 50], ["🧚", "Fairy", 50, 50], ["🐟", "Fish", 78, 50]], ["Fairy"], { labels: true, hint: "Which one is only in stories?", why: "Fairies are made up.", tag: "helper.tap_fake" })]),
  Q(mc("Omar says a picture that looks real is real. Is he right?", "No. A picture can look real and still be made up", ["Yes, looks decide", "Yes, pictures never lie"], { hint: "Think about the five-legged cow.", why: "Fakes can look real.", tag: "helper.reason_real" }), "real", "reason",
    [mc("Layla says a clear photo cannot be fake. Is she right?", "No. Clear photos can be made up by computers", ["Yes, clear means true", "Yes, fakes are always blurry"], { hint: "Think about the five-legged cow.", why: "Fakes can be clear.", tag: "helper.reason_real" })]),
  Q(mc("Zainab says only strangers can be tricky online. Is she right?", "No. Someone who seems friendly can trick us too", ["Yes, only strangers", "Yes, friends never trick"], { hint: "Think about why people trick.", why: "Anyone online might try to trick us.", tag: "helper.reason_strangers" }), "real", "reason",
    [mc("Ben says only people he does not know can make fake pictures. Is he right?", "No. Anyone can make or share a fake", ["Yes, only strangers", "Yes, friends never do"], { hint: "Think about why people trick.", why: "Anyone can share a fake.", tag: "helper.reason_strangers" })]),
  Q(mc("Why might someone make a fake picture?", "To trick people into believing something untrue", ["To help them see better", "To save the planet"], { hint: "Think about why people trick.", why: "Some fakes are made to trick.", tag: "helper.why_trick" }), "real", "recall",
    [mc("Why do some people share fake pictures?", "They want people to believe something that is not true", ["They are being kind", "They are teaching maths"], { hint: "Think about why people trick.", why: "Some fakes are made to trick.", tag: "helper.why_trick" })]),
  Q(ord("Put the steps in order if something online scares you.", ["Stop and put the device down", "Find a trusted adult", "Tell them what you saw"], { hint: "Stop first.", why: "Stop, find an adult, then tell.", tag: "helper.scared_steps" }), "real", "apply",
    [ord("Put these steps in order if a message worries you.", ["Do not reply", "Show a grown-up", "Let them help"], { hint: "Do not reply first.", why: "Do not reply, show a grown-up, then let them help.", tag: "helper.scared_steps" })]),
  // ----- rules (q24-q30)
  Q(mat("Match each family rule to its reason.", [["Ask a grown-up first", "A grown-up can check it is safe"], ["Keep private things private", "Strangers could misuse them"], ["Check important answers", "Helpers can be wrong"]], { hint: "Why do we have each rule?", why: "Each rule has a good reason.", tag: "helper.rule_match" }), "rules", "apply",
    [mat("Pair each rule with its reason.", [["Take screen breaks", "Eyes and minds need rest"], ["Tell a trusted adult if worried", "They can help"], ["Be kind online", "Kind words help others"]], { hint: "Why do we have each rule?", why: "Each rule has a good reason.", tag: "helper.rule_match" })]),
  Q(mc("Who should you tell if something online worries you?", "A trusted adult", ["Nobody", "A stranger online"], { hint: "Someone who looks after you.", why: "A trusted adult can help.", tag: "helper.who_tell" }), "rules", "recall",
    [mc("Who is best to tell if a message scares you?", "A parent or teacher", ["The sender", "A pop-up"], { hint: "Someone who looks after you.", why: "Parents and teachers help.", tag: "helper.who_tell" })]),
  Q(mc("Layla says she can tell her address to a helper. Is she right?", "No. An address is private and should not be shared", ["Yes, helpers are safe", "Yes, addresses are not private"], { hint: "Think about private things.", why: "Addresses are private.", tag: "helper.reason_address" }), "rules", "reason",
    [mc("Sana says it is fine to give a helper her school name. Is she right?", "No. It is private and should not be shared", ["Yes, fine", "Yes, helpers need to know"], { hint: "Think about private things.", why: "School names are private.", tag: "helper.reason_address" })]),
  Q(mc("Omar says rules for helpers are not needed at home. Is he right?", "No. Rules keep everyone safe", ["Yes, no rules needed", "Yes, helpers make rules"], { hint: "Think about the family rules.", why: "Rules keep us safe.", tag: "helper.reason_rules" }), "rules", "reason",
    [mc("Ben says families do not need AI rules. Is he right?", "No. Rules help families stay safe", ["Yes, no rules", "Yes, helpers write them"], { hint: "Think about the family rules.", why: "Rules keep us safe.", tag: "helper.reason_rules" })]),
  Q(sld("A family has 3 rules for each of 2 helpers. Slide to show how many rules that is.", { min: 0, max: 10 }, 6, 0, { hint: "3 + 3.", why: "2 helpers with 3 rules each is 6 rules.", tag: "helper.rules_count" }), "rules", "apply",
    [sld("A family has 2 rules for each of 4 devices. Slide to show how many rules that is.", { min: 0, max: 10 }, 8, 0, { hint: "2 + 2 + 2 + 2.", why: "4 devices with 2 rules each is 8 rules.", tag: "helper.rules_count" })]),
  Q(num("Sam spends 10 minutes asking safe questions and 5 minutes checking answers. How many minutes in all?", 15, { hint: "10 + 5.", why: "10 + 5 = 15 minutes.", tag: "helper.minutes" }), "rules", "apply",
    [num("Aisha spends 20 minutes asking and 10 minutes checking. How many minutes in all?", 30, { hint: "20 + 10.", why: "20 + 10 = 30 minutes.", tag: "helper.minutes" })]),
  Q(fill("Finish the sentences about family rules.", "Our family rule is to {b1} before using a helper and to {b2} important answers.", [["ask first", "hide", "shout"], ["check", "ignore", "lose"]], { hint: "Think about the three rules.", why: "We ask first and check answers.", tag: "helper.fill_rules" }), "rules", "apply",
    [fill("Complete the sentences about telling.", "If something worries you, {b1} and tell a {b2} adult.", [["stop", "run", "hide"], ["trusted", "stranger", "silent"]], { hint: "Think about telling.", why: "We stop and tell a trusted adult.", tag: "helper.fill_rules" })]),
];

export const topics = [
  topicLesson({
    slug: "data-ai-class-1-using-ai-helpers-safely", subject: "data-ai", cls: 1, topic: 12, title: "Using AI Helpers Safely",
    summary: "Use voice and picture helpers with a grown-up, check what they say and keep private things private.",
    unit: "Topic 12: Using AI helpers safely", difficulty: 1,
    objectives: ["Say what an AI helper can and cannot do", "Keep private information private", "Ask a trusted adult to check answers"],
    success_criteria: ["I can say what an AI helper is", "I can keep private things private", "I know to check answers and tell a trusted adult"],
    real_life: "Asking a voice helper for prayer times or the date of Eid, then checking with family.",
    standards: [
      { framework: "ai4k12", code: "Big Idea 5", text: "Societal impact: AI can impact the world in positive and negative ways" },
      { framework: "nc_england", code: "KS1 online safety", text: "Use technology safely and respectfully, keeping personal information private; identify where to go for help" },
    ],
    warm_up: [
      mc("What is a sensor?", "A part that notices something", ["A kind of cake", "A cable"], { hint: "It notices light, sound or movement.", why: "A sensor notices things." }),
      mc("What does IT stand for?", "Information technology", ["Indoor toys", "Instant tea"], { hint: "Computers.", why: "IT is information technology." }),
      num("What is 6 + 7?", 13, { hint: "Count on from 6.", why: "6 + 7 = 13." }),
    ],
    intro: [],
    subs: [helpers, askcheck, real, rules],
    clip,
    quiz,
  }),
];
