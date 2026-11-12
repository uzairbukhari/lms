import { SAY, SS, H, T, PHOTO, ACT, MAN, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Computer Science, Data & AI, Class 4 (Zara, age 9), topic 10: Chatbots and language AI.
// Story thread: Zara and her class explore a school help chatbot, learn it predicts words, and make rules for using it safely.
const PARROT = "data-ai-class-4-chatbots-and-language-ai-1-aa69b44d.jpg";
const DOMINO = "data-ai-class-4-chatbots-and-language-ai-2-c23096ba.jpg";
const OKM = (label) => ["ok", "✅", 50, 88, 2, "bounce", label];
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });

// ---------------------------------------------------------------------------------------------- 1. learn
const chat = {
  id: "chat", kind: "learn", title: "What is a chatbot?",
  blocks: [
    H("Welcome back, curious coder!"),
    SAY("Today we meet chatbots. A chatbot can answer in words. But does it understand us?",
      T("Today's big question: how does a chatbot make its words?")),
    SAY("A parrot can copy words it has heard without knowing what they mean. A chatbot works differently, but it does not think like a person either.",
      PHOTO(PARROT, "A close-up of a red, blue and green macaw parrot against a blurred green background", "A parrot can copy words without knowing their meaning. A chatbot also does not understand like a person.", "Photo by Barbora Dostálová on Unsplash")),
    H("Stop 1: Chatbots are programs"),
    SAY("A chatbot is a computer program that chats in everyday words. People make it, and it runs on a computer.",
      T("A **chatbot** is a program that replies in everyday language.")),
    SAY("Some chatbots are scripted. They pick from ready-written replies. Others use AI trained on lots of text.",
      T("Scripted chatbots use ready-made replies.")),
    EXP("Two kinds of chatbot",
      SS("The school help bot has a menu. Zara taps opening times and gets a ready-made reply.", S("Scripted.", ["z", "👧", 28, 55, 3], ["m", "📋", 72, 50, 3, "pulse", "menu"])),
      SS("A language AI chatbot lets her type any question in her own words.", S("Free typing.", ["k", "⌨️", 28, 50, 3], ["a", "💬", 72, 50, 3, "pulse", "any question"])),
      SS("Both are programs made by people. Neither one is alive or a person.", S("Programs.", ["p", "💻", 50, 48, 3, "pulse"], OKM("just programs")))),
    CHK(mc("Zara taps a menu and gets a ready-made reply about opening times. Which kind of chatbot is this?", "A scripted chatbot", ["A living pet", "A hidden person"], { hint: "The replies are ready-made.", why: "A menu with ready-made replies is scripted.", tag: "chat.scripted_chk" })),
    H("Stop 2: Chatbots do not feel"),
    SAY("A chatbot can write I am happy. That does not mean it feels happy. It only makes words.",
      T("A chatbot makes words. It does not have **feelings**.")),
    EXP("Words without feelings",
      SS("Zara types: are you sad today? The chatbot writes: I am doing well!", S("A reply.", ["z", "👧", 28, 55, 3], ["c", "💬", 72, 50, 3, "pulse", "I am well!"])),
      SS("The reply is built from patterns in text. A program does not feel sad or happy.", S("Patterns.", ["p", "🔤", 28, 50, 3], ["n", "🚫", 72, 50, 3, "pulse", "no feelings"])),
      SS("So we enjoy using it, but remember what it is: a tool.", S("A tool.", ["t", "🧰", 50, 48, 3, "pulse"], OKM("a tool")))),
    CHK(tf("If a chatbot writes I am happy, it must feel happy.", false, { hint: "It only makes words.", why: "A program makes words and has no feelings.", tag: "chat.feel_chk" })),
    SAY("Let us remember. A chatbot is a program. It makes words. It does not feel.",
      SUM("A chatbot is a program that replies in everyday language", "Some use ready-made replies, some use AI trained on text", "A chatbot makes words and has no feelings")),
    GLOSS({ chatbot: "A program that replies in everyday language.", feelings: "Emotions such as happy or sad.", scripted: "Using ready-written replies.", "language ai": "AI trained on lots of text so it can write and answer in words.", program: "Instructions a computer follows.", menu: "A list of choices." }),
  ],
  mini: [
    tf("A chatbot is made by people.", true, { hint: "It is a program.", why: "People write and train chatbots." }),
    mc("What does a scripted chatbot use?", "Ready-written replies", ["Its own secret feelings", "A hidden person's help"], { hint: "Think about the menu.", why: "Scripted bots choose from ready replies." }),
    mc("Can a chatbot feel sad?", "No, it only makes words", ["Yes, when it is switched off", "Yes, when it is lonely"], { hint: "It is a program.", why: "Programs do not have feelings." }),
    mc("Which is a chatbot's reply made from?", "Patterns in text or ready-made replies", ["Its feelings", "Magic"], { hint: "Think about how it works.", why: "Replies come from patterns or scripts." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const predict = {
  id: "predict", kind: "try", title: "Predicting the next word",
  blocks: [
    H("Stop 1: One word at a time"),
    SAY("Language AI learns from huge amounts of text. It finds patterns in which words usually follow other words.",
      T("**Training text** is the words the AI learned patterns from.")),
    SAY("When you type, it predicts a likely next word. Then it predicts the next one, like a line of dominoes.",
      PHOTO(DOMINO, "A long line of white dominoes with black dots standing in a row, fading into a blurred white background", "One word leads to the next, like a chain of dominoes.", "Photo by Robert Stump on Unsplash")),
    EXP("Predicting",
      SS("The sentence starts: the cat sat on the. What word is likely next?", S("Start.", ["c", "🐱", 28, 50, 3], ["q", "❓", 72, 45, 3, "pulse", "next word?"])),
      SS("In its training text, the word mat came next many times. So mat is a likely choice.", S("Likely.", ["m", "🧶", 28, 50, 3], ["l", "📊", 72, 50, 3, "pulse", "likely"])),
      SS("It adds mat, then predicts again. A whole reply is built one word at a time.", S("Repeat.", ["r", "🔁", 50, 48, 3, "spin"], OKM("word by word")))),
    CHK(mc("Which word is most likely to finish: I brush my ___ every morning?", "teeth", ["clouds", "tyres"], { hint: "Think about what people brush.", why: "Patterns in text make teeth the likely word.", tag: "chat.next_chk" })),
    H("Stop 2: Try it yourself"),
    SAY("A prediction is a careful guess. It is not a fact. More training text usually gives better guesses.",
      T("A **prediction** is a careful guess, not a fact.")),
    MAN("Sort the sentence endings", "Move the 6 endings into Likely or Unlikely.", "✍️", 6, ["Likely", "Unlikely"]),
    SAY("Now you try. Play a word-prediction game with a partner.",
      ACT("Predict the word", ["Paper and pens", "A partner"], ["Write the start of a sentence, such as at lunch I ate.", "Your partner writes the most likely next word.", "Compare. Did you pick the same word? Why or why not?"])),
    CHK(tf("A prediction is a guess based on patterns, not a certain fact.", true, { hint: "Think about likely words.", why: "Predictions are careful guesses.", tag: "chat.guess_chk" })),
    SAY("Let us remember. Language AI predicts words from patterns in text.",
      SUM("Language AI learns patterns from lots of training text", "It predicts the next word, again and again", "A prediction is a careful guess, not a fact")),
    GLOSS({ "training text": "The words the AI learned patterns from.", prediction: "A careful guess about what comes next.", pattern: "Something that repeats in a regular way.", likely: "Probably going to happen or be right.", domino: "A small tile that can knock over the next one." }),
  ],
  mini: [
    mc("Which word best finishes: the cat sat on the ___?", "mat", ["moon", "soup"], { hint: "Think about the pattern.", why: "Mat often follows that phrase." }),
    tf("More training text usually gives better predictions.", true, { hint: "More patterns to learn.", why: "More text shows more patterns." }),
    mc("How does language AI build a reply?", "One predicted word after another", ["All at once from a secret book", "By asking a person"], { hint: "Think about dominoes.", why: "It predicts word by word." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const wrong = {
  id: "wrong", kind: "play", title: "When chatbots get it wrong",
  blocks: [
    H("Stop 1: Sounding right is not the same as being right"),
    SAY("A chatbot predicts likely words. Likely words can sound right and still be false.",
      T("A chatbot can **make things up** that sound true.")),
    EXP("A made-up answer",
      SS("Zara asks for a book about K2 for children. The chatbot names one.", S("Ask.", ["z", "👧", 28, 55, 3], ["b", "📖", 72, 50, 3, "pulse", "a book"])),
      SS("Zara asks her librarian. That book does not exist. The chatbot made it up.", S("Not real.", ["l", "👩‍🏫", 28, 52, 3], ["x", "❌", 72, 45, 3, "bounce", "not real"])),
      SS("The chatbot was confident. Being confident does not make an answer true.", S("Confident.", ["c", "💬", 30, 50, 3], ["w", "⚠️", 72, 45, 3, "pulse", "check it"], OKM("check")))),
    CHK(mc("A chatbot names a book that no library has. What most likely happened?", "It made something up", ["The library lost it", "It is a secret book"], { hint: "Think about likely words.", why: "Likely-sounding titles can be invented.", tag: "chat.made_up_chk" })),
    H("Stop 2: Old and unfair"),
    SAY("A chatbot learned from old text. It may miss new events, so we cannot trust its news.",
      T("A chatbot can be **out of date**.")),
    SAY("It also learned from text written by people. That text can include unfair ideas, and a chatbot can copy them. First, a memory game.",
      T("Text can include **bias**. Play the memory game.")),
    BRAIN("memory_match", "Chatbot words", "Find the pairs.", ["💬", "🔍", "📅", "🤔"]),
    CHK(hot("Which claim is most worth checking in another source? Tap it.", [["📅", "The score of yesterday's match", 22, 50], ["➕", "Two plus two is four", 50, 50], ["🌞", "The sun is a star", 78, 50]], ["The score of yesterday's match"], { labels: true, hint: "Which one is recent?", why: "Recent events may be missing from its training text.", tag: "chat.check_chk" })),
    SAY("Let us remember. Chatbots can make things up, be out of date, or copy bias. Check.",
      SUM("A chatbot can sound sure and be wrong", "It can be out of date", "It can copy unfair ideas from its text, so we check")),
    GLOSS({ "make things up": "To give an answer that sounds right but is not true.", "out of date": "Missing recent events.", bias: "An unfair leaning for or against something.", confident: "Sounding very sure.", librarian: "A person who looks after a library." }),
  ],
  mini: [
    tf("A chatbot that sounds sure is always right.", false, { hint: "Think about the invented book.", why: "Sounding sure is not proof." }),
    mc("Why might a chatbot miss yesterday's news?", "It learned from older text", ["News is secret", "It is switched off at night"], { hint: "Think about training.", why: "It only knows what was in its training text." }),
    mc("What is bias?", "An unfair leaning", ["A kind of battery", "A fast reply"], { hint: "Think about fairness.", why: "Bias is an unfair leaning." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const safe = {
  id: "safe", kind: "use", title: "Use chatbots safely",
  blocks: [
    H("Stop 1: Safe habits"),
    SAY("Zara's class writes rules for using a chatbot. First, always ask a grown-up before you start.",
      T("Rule 1: ask a grown-up first.")),
    SAY("Rule two: never type private things. That means your address, your password and your full name with your school.",
      T("Rule 2: keep **personal information** private.")),
    SAY("Rule three: check important answers in another source. A chatbot can make things up.",
      T("Rule 3: check important answers.")),
    EXP("Three rules",
      SS("Rule one is a hand up. Ask a grown-up first.", S("Rule 1.", ["r", "🙋", 50, 50, 3, "pulse", "ask first"])),
      SS("Rule two is a padlock. Personal information stays private.", S("Rule 2.", ["r", "🔒", 50, 50, 3, "pulse", "private"])),
      SS("Rule three is a magnifier. Check important answers.", S("Rule 3.", ["r", "🔍", 50, 50, 3, "pulse", "check"], OKM("three rules")))),
    CHK(ord("Put the steps of using a chatbot safely in order.", ["Ask a grown-up first", "Type a question with no private details", "Read the reply carefully", "Check it in another source"], { hint: "Ask first.", why: "Ask, type safely, read, then check.", tag: "chat.safe_steps_chk" })),
    H("Stop 2: Honest and kind"),
    SAY("A chatbot can give ideas. Then you must write your own work. Copying is not learning.",
      T("Use a chatbot for ideas. Write your own work.")),
    SAY("If a chatbot says something unkind or strange, stop. Tell a trusted adult. It is not your fault.",
      T("If it says something unkind, stop and tell a trusted adult.")),
    EXP("Honest and kind",
      SS("Zara asks the chatbot for ideas for her K2 poster. She checks them in a book.", S("Ideas.", ["i", "💡", 28, 50, 3, "pulse"], ["b", "📖", 72, 50, 3])),
      SS("She writes the poster in her own words. That is her own work.", S("Own work.", ["w", "✍️", 28, 50, 3], ["p", "🖼️", 72, 50, 3, "pulse", "her poster"])),
      SS("Once, a reply is unkind. She stops and tells her teacher. That is the right thing.", S("Tell.", ["s", "🛑", 28, 50, 3, "pulse"], ["t", "👩‍🏫", 72, 52, 3], OKM("tell a grown-up")))),
    SAY("Now you try. Write your own class rules for chatbots.",
      ACT("Our chatbot rules", ["Paper and pens", "Your class"], ["Write three rules for using a chatbot safely.", "Add one rule about writing your own work.", "Add who you will tell if a reply upsets you."])),
    CHK(tf("It is fine to hand in a chatbot's answer as your own work.", false, { hint: "Think about learning.", why: "It is not your own work, and you would not learn.", tag: "chat.own_work_chk" })),
    SAY("Let us remember. Ask first, keep private, check, and write your own work.",
      SUM("Ask a grown-up and keep personal information private", "Check important answers and write your own work", "Stop and tell a trusted adult if a reply upsets you")),
    GLOSS({ "personal information": "Facts that could identify you, such as your address or password.", private: "Only for you and your family.", rule: "A sentence that says how we should act.", "trusted adult": "A grown-up you know well and trust.", ideas: "Thoughts to start with." }),
  ],
  mini: [
    mc("Which is personal information?", "Your home address", ["The colour blue", "The number seven"], { hint: "It could identify you.", why: "An address is personal." }),
    tf("A chatbot can give ideas, but we write our own work.", true, { hint: "Think about honesty.", why: "Our own work shows what we learned." }),
    mc("What should you do if a chatbot says something unkind?", "Stop and tell a trusted adult", ["Keep chatting", "Say something unkind back"], { hint: "Get help.", why: "A trusted adult can help." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Zara and the school chatbot", backdrop: "classroom", caption: "Zara learns how a chatbot works and how to use it safely.",
  scenes: [
    { caption: "A chatbot.", say: "Zara's class meets a chatbot. It replies in everyday words.",
      items: [{ id: "z", emoji: "👧", label: "Zara", x: 25, y: 56, size: 3, enter: "walk_right" }, { id: "c", emoji: "💬", label: "chatbot", x: 72, y: 48, size: 3, enter: "pop" }] },
    { caption: "A program.", say: "A chatbot is a program made by people. It is not alive.",
      items: [{ id: "p", emoji: "💻", x: 30, y: 50, size: 3, anim: "pulse" }, { id: "x", emoji: "🚫", label: "not alive", x: 72, y: 50, size: 3 }] },
    { caption: "Predicting.", say: "It predicts the next word, again and again, using patterns from training text.",
      items: [{ id: "a", emoji: "🔤", x: 25, y: 50, size: 2 }, { id: "b", emoji: "🔤", x: 50, y: 50, size: 2 }, { id: "c", emoji: "🔤", x: 75, y: 50, size: 2, anim: "pulse" }] },
    { caption: "Made up.", say: "It names a book about K2. The librarian says the book does not exist.",
      items: [{ id: "b", emoji: "📖", label: "not real", x: 35, y: 50, size: 3 }, { id: "x", emoji: "❌", x: 72, y: 45, size: 3, anim: "bounce" }] },
    { caption: "Check it.", say: "So Zara checks answers in a book. A chatbot can sound sure and be wrong.",
      items: [{ id: "s", emoji: "🔍", x: 30, y: 50, size: 3, effect: "glow" }, { id: "k", emoji: "📚", x: 72, y: 50, size: 3 }] },
    { caption: "Private.", say: "She never types her address or password. Private things stay private.",
      items: [{ id: "l", emoji: "🔒", x: 35, y: 50, size: 3 }, { id: "h", emoji: "🏠", label: "private", x: 72, y: 50, size: 3 }] },
    { caption: "Own work.", say: "She writes her K2 poster in her own words. That is her own work.",
      items: [{ id: "w", emoji: "✍️", x: 30, y: 50, size: 3 }, { id: "p", emoji: "🖼️", x: 72, y: 48, size: 3, effect: "sparkle" }] },
    { caption: "Tell a grown-up.", say: "When a reply is unkind, she stops and tells her teacher.",
      items: [{ id: "z", emoji: "👧", x: 28, y: 56, size: 3 }, { id: "t", emoji: "👩‍🏫", x: 70, y: 52, size: 3, effect: "hearts" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- chat (q1-q8)
  Q(mc("What is a chatbot?", "A program that holds a conversation in text or speech", ["A robot with a face", "A kind of website address"], { hint: "It replies in words.", why: "A chatbot is a program that chats.", tag: "chat.def" }), "chat", "recall",
    [mc("Which best describes a chatbot?", "A computer program that answers in everyday language", ["A person typing very fast", "A search cable"], { hint: "It replies in words.", why: "A chatbot is a program.", tag: "chat.def" })]),
  Q(mc("How does a scripted chatbot choose its replies?", "It follows rules and picks ready-written replies", ["It learns from the whole internet in a second", "It asks the player to write them"], { hint: "Think about the menu.", why: "Scripted bots use ready-made replies.", tag: "chat.scripted" }), "chat", "recall",
    [mc("A shop bot gives only pre-written replies to a few options. What kind of chatbot is it?", "A scripted chatbot", ["A living creature", "A search engine"], { hint: "Think about the menu.", why: "Pre-written replies mean scripted.", tag: "chat.scripted" })]),
  Q(tf("A chatbot is a program made by people.", true, { hint: "Who writes programs?", why: "People write and train chatbots.", tag: "chat.made" }), "chat", "recall",
    [tf("A chatbot is a living creature.", false, { hint: "Who writes programs?", why: "A chatbot is a program.", tag: "chat.made" })]),
  Q(mat("Match each term to its meaning.", [["Chatbot", "A program that talks in words"], ["Prompt", "What you type to guide the reply"], ["Reply", "What the chatbot writes back"]], { hint: "Think about each term.", why: "Each term has its own meaning.", tag: "chat.term_match" }), "chat", "apply",
    [mat("Pair each word with its meaning.", [["Training text", "Words the program learned patterns from"], ["Pattern", "Something that repeats in the data"], ["Prediction", "A careful guess"]], { hint: "Think about each word.", why: "Each word has its own meaning.", tag: "chat.term_match" })]),
  Q(hot("Tap the one that is a chatbot.", [["💬", "A program that answers typed questions", 22, 50], ["📷", "A camera lens", 50, 50], ["🔌", "A plug", 78, 50]], ["A program that answers typed questions"], { labels: true, hint: "It replies in words.", why: "A chatbot is a program that chats.", tag: "chat.tap_bot" }), "chat", "recall",
    [hot("Tap the thing that talks back in words using AI.", [["🔦", "A torch", 22, 50], ["💬", "A chat assistant", 50, 50], ["📏", "A ruler", 78, 50]], ["A chat assistant"], { labels: true, hint: "It replies in words.", why: "A chat assistant is a chatbot.", tag: "chat.tap_bot" })]),
  Q(mc("Zara says a chatbot is a person typing from far away. Is she right?", "No. It is a computer program", ["Yes, a real person always types", "Yes, it lives inside the screen"], { hint: "Who writes programs?", why: "A chatbot is a program.", tag: "chat.reason_person" }), "chat", "reason",
    [mc("Idris says a chatbot is alive because it chats. Is he right?", "No. Chatting does not make a program alive", ["Yes, chatting means alive", "Yes, all programs are alive"], { hint: "Who writes programs?", why: "Chatting does not make it alive.", tag: "chat.reason_person" })]),
  Q(mc("Which is a good job for a chatbot?", "Answering common questions about opening times", ["Deciding who is guilty of a crime", "Keeping your secrets for you"], { hint: "Think about safe, simple jobs.", why: "Simple questions are a sensible job.", tag: "chat.good_job" }), "chat", "apply",
    [mc("Which is a sensible use of a chatbot?", "Explaining a word, then checking with a grown-up", ["Replacing a doctor", "Choosing your passwords"], { hint: "Think about safe, simple jobs.", why: "Ideas to check are sensible.", tag: "chat.good_job" })]),
  Q(fill("Finish the sentences about chatbots.", "A chatbot replies to the {b1} you type. It is a {b2}, not a person.", [["prompt", "pocket", "plate"], ["program", "pupil", "pirate"]], { hint: "Think about input and what it is.", why: "It answers your prompt, and it is a program.", tag: "chat.fill_bot" }), "chat", "recall",
    [fill("Complete the sentences about kinds of chatbot.", "Some chatbots use ready-made {b1}. Others use AI trained on lots of {b2}.", [["replies", "rivers", "rugs"], ["text", "tape", "toys"]], { hint: "Think about the two kinds.", why: "Scripted bots use replies and language AI uses text.", tag: "chat.fill_bot" })]),
  // ----- predict (q9-q15)
  Q(ord("Put the steps of how a language AI writes a reply in order.", ["It reads your prompt", "It predicts the most likely next word", "It adds that word and predicts again", "It shows the finished reply"], { hint: "Read first.", why: "Read, predict, repeat, show.", tag: "chat.reply_steps" }), "predict", "apply",
    [ord("Put these steps in order.", ["Learn patterns from lots of text", "Get a new prompt", "Predict words one at a time", "Show the reply"], { hint: "Learn first.", why: "Learn, prompt, predict, show.", tag: "chat.reply_steps" })]),
  Q(mc("Which word is most likely to finish: the cat sat on the ___?", "mat", ["moon", "soup"], { hint: "Think about the pattern.", why: "Mat often follows that phrase.", tag: "chat.next_word" }), "predict", "apply",
    [mc("Which is most likely to finish: I wash my hands with ___?", "soap", ["clouds", "tyres"], { hint: "Think about the pattern.", why: "Soap often follows that phrase.", tag: "chat.next_word" })]),
  Q(fill("Finish the sentences about prediction.", "Language AI learns {b1} from lots of text. It {b2} the next word.", [["patterns", "parcels", "planets"], ["predicts", "paints", "packs"]], { hint: "Think about how it works.", why: "It learns patterns and predicts words.", tag: "chat.fill_predict" }), "predict", "recall",
    [fill("Complete the sentences about guesses.", "A prediction is a careful {b1}, not a {b2}.", [["guess", "gift", "game"], ["fact", "fork", "fan"]], { hint: "Think about certainty.", why: "A prediction is a guess, not a fact.", tag: "chat.fill_predict" })]),
  Q(mc("Why does more training text usually help a language AI?", "It sees more patterns", ["The screen gets bigger", "Every reply becomes true"], { hint: "Think about learning.", why: "More text shows more patterns.", tag: "chat.more_text" }), "predict", "apply",
    [mc("A program has read only ten sentences. Why might it do badly?", "It has seen too few patterns", ["Ten sentences are too many", "Programs cannot read"], { hint: "Think about learning.", why: "Too little text shows few patterns.", tag: "chat.more_text" })]),
  Q(sld("A prompt has 3 words. The AI adds 1 word at a time until the whole reply has 12 words. Slide to show how many words the AI added.", { min: 0, max: 15 }, 9, 0, { hint: "12 take away 3.", why: "12 - 3 = 9 words.", tag: "chat.words_added" }), "predict", "apply",
    [sld("A prompt has 4 words. The AI adds 1 word at a time until the whole reply has 11 words. Slide to show how many words the AI added.", { min: 0, max: 15 }, 7, 0, { hint: "11 take away 4.", why: "11 - 4 = 7 words.", tag: "chat.words_added" })]),
  Q(tf("Language AI predicts words using patterns it learned from text.", true, { hint: "Think about training.", why: "That is how it picks words.", tag: "chat.uses_patterns" }), "predict", "recall",
    [tf("Language AI looks up every answer in a book of facts that is always right.", false, { hint: "Think about training.", why: "It predicts from patterns, not a book of perfect facts.", tag: "chat.uses_patterns" })]),
  Q(mc("Hamza says a chatbot understands words exactly as a person does. Is he right?", "No. It uses patterns in text and does not understand like a person", ["Yes, exactly like a person", "Yes, it has feelings about words"], { hint: "Think about the parrot.", why: "It uses patterns, not human understanding.", tag: "chat.reason_understand" }), "predict", "reason",
    [mc("Layla says if a chatbot writes I feel happy, it really feels happy. Is she right?", "No. It is producing words, not feeling", ["Yes, it feels happy", "Yes, it blushes"], { hint: "Think about the parrot.", why: "It produces words, not feelings.", tag: "chat.reason_understand" })]),
  // ----- wrong (q16-q23)
  Q(ms("Which two can go wrong with a chatbot? Pick two.", ["It can make things up", "It can be out of date"], ["It always knows today's news", "It can never be wrong"], { hint: "Think about what it learned from.", why: "Chatbots can invent and can be out of date.", tag: "chat.wrong_ms" }), "wrong", "apply",
    [ms("Which two are good reasons to check a chatbot's answer? Pick two.", ["It may sound sure but be wrong", "It may have learned from biased text"], ["It is always right", "It never uses text"], { hint: "Think about what it learned from.", why: "It can be wrong or biased.", tag: "chat.wrong_ms" })]),
  Q(num("A chatbot gives 10 facts. 3 are wrong. How many are right?", 7, { hint: "10 take away 3.", why: "10 - 3 = 7 facts.", tag: "chat.facts_count" }), "wrong", "apply",
    [num("A chatbot gives 15 facts. 4 are wrong. How many are right?", 11, { hint: "15 take away 4.", why: "15 - 4 = 11 facts.", tag: "chat.facts_count" })]),
  Q(mc("What does it mean if a chatbot makes things up?", "It gives an answer that sounds right but is not true", ["It draws a picture", "It deletes your work"], { hint: "Think about the invented book.", why: "Made-up answers sound true but are false.", tag: "chat.make_up" }), "wrong", "recall",
    [mc("A chatbot names a book that does not exist. What happened?", "It made something up", ["The book is secret", "The library hid it"], { hint: "Think about the invented book.", why: "It invented a title.", tag: "chat.make_up" })]),
  Q(mc("Idris says a confident chatbot answer must be correct. Is he right?", "No. It can sound sure and still be wrong", ["Yes, confident means correct", "Yes, chatbots only say true things"], { hint: "Think about the invented book.", why: "Sounding sure is not proof.", tag: "chat.reason_confident" }), "wrong", "reason",
    [mc("Nadia says a long, detailed answer must be true. Is she right?", "No. Long answers can still contain mistakes", ["Yes, detail means true", "Yes, long means correct"], { hint: "Think about the invented book.", why: "Detail is not proof.", tag: "chat.reason_confident" })]),
  Q(mc("Maryam says a chatbot always knows today's news. Is she right?", "No. It may only know what was in its training text", ["Yes, it reads live news", "Yes, it hears the world"], { hint: "Think about older text.", why: "It may be out of date.", tag: "chat.reason_news" }), "wrong", "reason",
    [mc("Omar says a chatbot's information is never out of date. Is he right?", "No. It can be out of date", ["Yes, never", "Yes, it updates every second"], { hint: "Think about older text.", why: "Old training text can miss new events.", tag: "chat.reason_news" })]),
  Q(mc("Hira says a chatbot cannot be unfair because it is a computer. Is she right?", "No. It learns from human text, which can contain unfair ideas", ["Yes, computers are always fair", "Yes, it ignores people"], { hint: "Think about where the text came from.", why: "Text from people can include bias.", tag: "chat.reason_bias" }), "wrong", "reason",
    [mc("Zayn says text from people is always fair, so chatbots are fair too. Is he right?", "No. Some text has bias, and a chatbot can copy it", ["Yes, always fair", "Yes, text cannot be unfair"], { hint: "Think about where the text came from.", why: "Text can include bias.", tag: "chat.reason_bias" })]),
  Q(mat("Match each problem to a good response.", [["An answer sounds odd", "Check another source"], ["It asks for your address", "Do not share it, tell a grown-up"], ["It says something unkind", "Stop and tell a trusted adult"]], { hint: "Think about each problem.", why: "Each problem has a safe response.", tag: "chat.problem_match" }), "wrong", "apply",
    [mat("Pair each risk with its meaning.", [["Made-up answer", "Sounds true but is not"], ["Out of date", "Misses recent events"], ["Bias", "Unfair patterns copied from text"]], { hint: "Think about each risk.", why: "Each risk has its own meaning.", tag: "chat.problem_match" })]),
  Q(hot("Tap the answer you should double check.", [["📅", "The result of last night's match", 22, 50], ["➕", "Two plus two is four", 50, 50], ["🌞", "The sun is a star", 78, 50]], ["The result of last night's match"], { labels: true, hint: "Which one is recent?", why: "Recent events may be missing.", tag: "chat.tap_check" }), "wrong", "apply",
    [hot("Tap the claim most worth checking.", [["📚", "7 x 8 = 56", 22, 50], ["🌦️", "Today's exact weather in my town", 50, 50], ["🔢", "A week has seven days", 78, 50]], ["Today's exact weather in my town"], { labels: true, hint: "Which one changes today?", why: "Today's weather is not in older text.", tag: "chat.tap_check" })]),
  // ----- safe (q24-q30)
  Q(ord("Put the steps of using a chatbot for a school project in order.", ["Choose your own question", "Ask the chatbot for ideas", "Check the ideas in trusted sources", "Write it in your own words"], { hint: "Think first.", why: "Choose, ask, check, then write.", tag: "chat.project_steps" }), "safe", "apply",
    [ord("Put these steps for asking a chatbot in order.", ["Tell a grown-up what you want to ask", "Type it without private details", "Read the reply carefully", "Check anything important"], { hint: "Tell a grown-up first.", why: "Tell, type, read, then check.", tag: "chat.project_steps" })]),
  Q(ms("Which two should you never type into a chatbot? Pick two.", ["Your home address", "Your passwords"], ["Your favourite colour", "A maths question"], { hint: "Think about private things.", why: "Addresses and passwords are private.", tag: "chat.private_ms" }), "safe", "apply",
    [ms("Which two should stay private? Pick two.", ["Your full name with your school", "Your phone number"], ["A fact about Mars", "A joke you heard"], { hint: "Think about private things.", why: "These could identify you.", tag: "chat.private_ms" })]),
  Q(mc("Zara says it is fine to let a chatbot do her homework and hand it in as hers. Is she right?", "No. It is not her own work and she would not learn", ["Yes, it is faster", "Yes, teachers like it"], { hint: "Think about learning.", why: "Handing in others' work is not honest.", tag: "chat.reason_homework" }), "safe", "reason",
    [mc("Idris says copying a chatbot's answer is the same as thinking for himself. Is he right?", "No. He needs to understand and write his own", ["Yes, same thing", "Yes, copying is clever"], { hint: "Think about learning.", why: "Copying is not thinking.", tag: "chat.reason_homework" })]),
  Q(mc("Maryam says a chatbot is a friend who keeps all her secrets. Is she right?", "No. It is a program. Private things stay private and worries go to trusted adults", ["Yes, it keeps secrets forever", "Yes, it is her best friend"], { hint: "Is it a person?", why: "A chatbot is a program, not a friend.", tag: "chat.reason_friend" }), "safe", "reason",
    [mc("Omar says it is safe to tell a chatbot his worries instead of an adult. Is he right?", "No. A trusted adult can really help", ["Yes, it is safer", "Yes, adults are too busy"], { hint: "Who can truly help?", why: "A trusted adult can help.", tag: "chat.reason_friend" })]),
  Q(mc("Hana says if a chatbot is rude, she must keep chatting. Is she right?", "No. Stop and tell a trusted adult", ["Yes, keep going", "Yes, rude is normal"], { hint: "Think about getting help.", why: "We stop and tell an adult.", tag: "chat.reason_rude" }), "safe", "reason",
    [mc("Sana says unkind chatbot replies mean she did something wrong. Is she right?", "No. Stop and tell a trusted adult. It is not her fault", ["Yes, it is her fault", "Yes, she must apologise"], { hint: "Think about getting help.", why: "It is not her fault.", tag: "chat.reason_rude" })]),
  Q(num("Zara asks 4 questions and checks each answer in 2 sources. How many checks in all?", 8, { hint: "4 groups of 2.", why: "4 x 2 = 8 checks.", tag: "chat.checks" }), "safe", "apply",
    [num("Idris asks 5 questions and checks each answer in 3 sources. How many checks in all?", 15, { hint: "5 groups of 3.", why: "5 x 3 = 15 checks.", tag: "chat.checks" })]),
  Q(sld("Zara plans 3 minutes to ask and 4 minutes to check each question. She has 5 questions. Slide to show the total minutes.", { min: 0, max: 40 }, 35, 0, { hint: "7 minutes for each question.", why: "(3 + 4) x 5 = 35 minutes.", tag: "chat.minutes" }), "safe", "apply",
    [sld("Maryam plans 2 minutes to ask and 3 minutes to check each question. She has 6 questions. Slide to show the total minutes.", { min: 0, max: 40 }, 30, 0, { hint: "5 minutes for each question.", why: "(2 + 3) x 6 = 30 minutes.", tag: "chat.minutes" })]),
];

export const topics = [
  topicLesson({
    slug: "data-ai-class-4-chatbots-and-language-ai", subject: "data-ai", cls: 4, topic: 10, title: "Chatbots and Language AI",
    summary: "Find out what a chatbot is, how language AI predicts words, when chatbots get it wrong and how to use them safely and honestly.",
    unit: "Topic 10: Chatbots and language AI", difficulty: 2,
    objectives: ["Explain that a chatbot is a program and language AI predicts words from patterns", "Explain why chatbots can make things up, be out of date or be biased", "Use chatbots safely, check answers and write your own work"],
    success_criteria: ["I can say what a chatbot is and that it has no feelings", "I can explain that language AI predicts words from patterns", "I keep personal information private, check answers and tell a trusted adult"],
    real_life: "A school help chatbot, or a voice helper asked for ideas for a project, with answers checked by a grown-up.",
    standards: [
      { framework: "ai4k12", code: "Big Idea 3", text: "Learning: computers can learn from data, and models make predictions from patterns" },
      { framework: "ai4k12", code: "Big Idea 5", text: "Societal impact: AI can impact the world in positive and negative ways" },
    ],
    warm_up: [
      mc("What is a pattern?", "Something that repeats in a regular way", ["A broken program", "A kind of cable"], { hint: "Think about stripes.", why: "A pattern repeats." }),
      mc("What is training data?", "Examples a program learns from", ["The power cable", "A password"], { hint: "Think about the cat spotter.", why: "Programs learn from examples." }),
      num("What is 7 x 6?", 42, { hint: "6 sevens.", why: "7 x 6 = 42." }),
    ],
    intro: [],
    subs: [chat, predict, wrong, safe],
    clip,
    quiz,
  }),
];
