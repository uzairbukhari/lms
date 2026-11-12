import { SAY, SS, H, T, PHOTO, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, mc, ms, tf, ord, mat, fill, hot, sld, st } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC } from "./_science-kit.mjs";

// English Class 1, topic 10: Say what you think and why (Zainab, age 7).
const SWEETS = "english-class-1-say-what-you-think-1-44c665c2.jpg";
const CIRCLE = "english-class-1-say-what-you-think-2-48ba1980.jpg";

// ---------------------------------------------------------------------------------------------- 1. learn
const opinion = {
  id: "opinion", kind: "learn", title: "Opinions and reasons",
  blocks: [
    H("Welcome back, young speaker!"),
    SAY("Today we share what we think. We also say why.", T("Today's big question: how do we say what we think, and why?")),
    SAY("Look at these sweets. Which would you pick? Everyone may choose differently.", PHOTO(SWEETS, "Seven plates of colourful sugary sweets in different shapes arranged on a green table", "Which sweet do you like best? Your answer is your opinion.", "Photo by Analia Baggiano on Unsplash")),
    H("Stop 1: What is an opinion?"),
    SAY("An opinion is what someone thinks or feels. It is not a fact.", T("An **opinion** is what you think or feel.")),
    EB("classroom", "Fact or opinion?",
      SS("A mango is a fruit. That is a fact. It is true for everyone.", S("A fact.", ["m", "🥭", 50, 56, 3])),
      SS("Mangoes are the best fruit. That is an opinion. Others may disagree.", S("An opinion.", ["m", "🥭", 30, 56, 3], ["h", "💭", 72, 40, 3, "pulse"])),
      SS("Your opinion is yours. You can say it and give a reason.", S("Your opinion.", ["z", "👧", 50, 56, 3, "grow"]))),
    CHK(mc("Which one is an opinion?", "Jalebi is the tastiest sweet", ["Jalebi is a sweet", "Jalebi is round and orange"], { hint: "Is it what someone thinks?", why: "Tastiest is what someone thinks.", tag: "opinion.chk1" })),
    H("Stop 2: Because"),
    SAY("A reason says why we think it. We join an opinion and a reason with because.", T("A **reason** says why. Use **because** to join them.")),
    EB("classroom", "Opinion and because",
      SS("I like gulab jamun because they are sweet and soft.", S("Because.", ["g", "🍡", 40, 56, 3], ["b", "➡️", 75, 54, 2, "pulse"])),
      SS("The reason must fit the opinion. A sweet taste fits liking sweets.", S("A good reason.", ["g", "🍡", 50, 56, 3])),
      SS("One clear reason is enough. We do not need a long list.", S("One reason.", ["r", "1️⃣", 50, 56, 3, "grow"]))),
    CHK(tf("The word because joins an opinion to its reason.", true, { hint: "It tells us why.", why: "Because gives the reason.", tag: "opinion.chk2" })),
    SAY("Let us remember. An opinion is what you think. A reason says why. Join them with because.", SUM("An opinion is what you think", "A reason says why", "Because joins them")),
    GLOSS({ opinion: "What you think or feel about something.", fact: "Something that is true.", reason: "Why you think or feel something.", because: "A word that gives the reason.", audience: "The people who listen to you.", sweet: "A tasty treat made with sugar." }),
  ],
  mini: [
    mc("What is an opinion?", "What someone thinks or feels", ["A fact that is true", "A page number"], { hint: "Think of favourite things.", why: "An opinion is what you think or feel." }),
    tf("A fact is true for everyone.", true, { hint: "Think of a mango.", why: "A fact is true." }),
    mc("Which word gives the reason?", "because", ["banana", "under"], { hint: "It tells why.", why: "Because gives the reason." }),
    mc("How many good reasons do we need at least?", "One clear reason", ["Ten long reasons", "None at all"], { hint: "Keep it clear.", why: "One clear reason is enough." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const loud = {
  id: "loud", kind: "try", title: "Loud and clear",
  blocks: [
    H("Stop 1: Your voice"),
    SAY("A good talker uses a clear voice. Not too loud and not too quiet.", T("Speak **clearly**, not too fast.")),
    EB("classroom", "Voice and pace",
      SS("Speak loud enough for the back row to hear. Do not shout.", S("Loud enough.", ["s", "🗣️", 35, 56, 3], ["a", "👥", 75, 58, 3])),
      SS("Go slowly. Pause between ideas so people can think.", S("A good pace.", ["p", "⏸️", 50, 56, 3, "pulse"])),
      SS("Say each word clearly. Finish every sentence.", S("Clear words.", ["w", "💬", 50, 56, 3, "grow"]))),
    CHK(mc("What helps people hear you?", "A clear, steady voice", ["Whispering", "Shouting at them"], { hint: "Not too loud.", why: "A clear, steady voice helps.", tag: "loud.chk1" })),
    H("Stop 2: Face your audience"),
    SAY("Look at your audience. Eye contact shows you care about them.", PHOTO(CIRCLE, "Blue chairs arranged in a circle seen from above", "Chairs in a circle for a group talk. Everyone can see everyone.", "Photo by ObjectType RAW on Unsplash")),
    SAY("Stand tall and stay calm. Smile if you can.", T("Look up and speak out.")),
    SAY("Now sort these tips. Do they help us speak well, or not?", MAN("Helps or not?", "Move each tip. Good tips go in Helps. Bad tips go in Not helping.", "🗣️", 8, ["Helps", "Not helping"])),
    ACT("Practise a talk", ["A mirror or a friend", "A grown-up to help"], ["Say: I think my favourite sweet is...", "Add because and one reason.", "Practise a clear voice and eye contact."]),
    CHK(ord("Put the talk steps in order.", ["Think of an opinion", "Think of a reason", "Speak in a full sentence", "Thank the audience"], { hint: "Think first.", why: "We think, then speak, then thank.", tag: "loud.chk2" })),
    SAY("Let us remember. Speak clearly, look at your audience, and finish each sentence.", SUM("Use a clear steady voice", "Look at your audience", "Speak in a full sentence")),
    GLOSS({ clearly: "In a way that is easy to understand.", "eye contact": "Looking at someone's eyes when you speak.", pace: "How fast you speak.", pause: "A short stop.", calm: "Not worried or rushed." }),
  ],
  mini: [
    mc("How should we speak?", "Clearly and not too fast", ["Very quietly", "As fast as possible"], { hint: "Think of pace.", why: "Clear and steady is best." }),
    tf("Eye contact shows we care about our audience.", true, { hint: "Look at them.", why: "Eye contact shows we care." }),
    mc("What should we say in a full sentence?", "I think cricket is exciting.", ["Cricket.", "Exciting."], { hint: "Say a whole idea.", why: "A full sentence says a whole idea." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const agree = {
  id: "agree", kind: "play", title: "Agree or disagree",
  blocks: [
    H("Stop 1: Choose a side"),
    SAY("In this game we move to a side. Do we agree, or do we disagree?", T("**Agree** means you think the same. **Disagree** means you think differently.")),
    EB("classroom", "Two sides",
      SS("Layla says rain is lovely. Aisha agrees because it feeds the plants.", S("Agree.", ["l", "👧", 30, 58, 3], ["a", "🌧️", 72, 40, 3])),
      SS("Omar disagrees. He likes sunny days because he can play outside.", S("Disagree.", ["o", "👦", 30, 58, 3], ["s", "☀️", 72, 36, 3])),
      SS("Both give a reason. Both are polite. They can still be friends.", S("Polite.", ["l", "👧", 25, 58, 3], ["o", "👦", 75, 58, 3]))),
    CHK(mc("What does disagree mean?", "You think differently", ["You think the same", "You do not listen"], { hint: "Dis means not.", why: "Disagree means you think differently.", tag: "agree.chk1" })),
    H("Stop 2: Brain game"),
    SAY("Warm up your memory. Watch the pictures light up, then copy them.", T("Play the game, then answer a question.")),
    SAY("Watch the order closely. Then copy it.", BRAIN("remember_order", "Talk time", "Watch the order, then copy it. It gets longer each time!", ["💭", "🗣️", "👂", "🙂"])),
    CHK(ms("Pick two polite replies.", ["Thank you for sharing", "I see it differently, because..."], ["That is silly", "Be quiet"], { hint: "Think kindly.", why: "Polite replies are kind.", tag: "agree.chk2" })),
    SAY("Let us remember. We can agree or disagree politely. We always listen first.", SUM("Agree means think the same", "Disagree means think differently", "We listen first and are polite")),
    GLOSS({ agree: "To think the same as someone.", disagree: "To think differently from someone.", polite: "Kind and respectful.", interrupt: "To talk when someone else is talking.", turn: "Your time to speak." }),
  ],
  mini: [
    mc("Which is a polite way to disagree?", "I see it differently, because...", ["That is silly", "Be quiet"], { hint: "Be kind.", why: "It is polite and gives a reason." }),
    tf("It is polite to wait for your turn.", true, { hint: "Do not interrupt.", why: "Waiting is polite." }),
    mc("What do we do first when someone speaks?", "Listen", ["Interrupt", "Look away"], { hint: "Use your ears.", why: "We listen first." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const debate = {
  id: "debate", kind: "use", title: "Mini debate",
  blocks: [
    H("Stop 1: Plan a short talk"),
    SAY("Plan a short talk. Choose a topic you care about.", T("Plan a **talk**: opinion, reason, thanks.")),
    SAY("In Pakistan, many children pick a favourite Eid dessert like sheer khurma.", T("A good topic: a favourite Eid food.")),
    SAY("Others like cricket. Babar Azam and Joe Root both have fans.", T("Another topic: a favourite cricket player.")),
    SAY("In the UK, a class might talk about a favourite show-and-tell treasure.", T("Any topic can work.")),
    EB("classroom", "A mini talk",
      SS("I think sheer khurma is the best Eid dessert. That is my opinion.", S("Opinion.", ["z", "👧", 30, 58, 3], ["d", "🍮", 72, 56, 3])),
      SS("I think so because it is creamy and sweet. That is my reason.", S("Reason.", ["d", "🍮", 50, 56, 3, "pulse"])),
      SS("Thank you for listening. Now I would like to hear your idea.", S("Thanks.", ["z", "👧", 30, 58, 3], ["a", "👥", 75, 58, 3]))),
    CHK(mc("Which is the best reason for: Eid is the best day?", "We share food and visit family", ["My shoe is blue", "Tuesday comes after Monday"], { hint: "The reason should fit.", why: "Sharing and visiting family fits liking Eid.", tag: "debate.chk1" })),
    H("Stop 2: Listen and reply kindly"),
    SAY("When someone finishes, reply kindly. You can agree or disagree.", T("Listen first. Then reply kindly.")),
    EB("classroom", "Reply kindly",
      SS("Aisha finishes her talk. Omar listens with his ears and eyes.", S("Listen.", ["a", "👧", 30, 58, 3], ["o", "👂", 72, 56, 3])),
      SS("Omar replies, I see it differently, because I like jalebi.", S("Reply.", ["o", "👦", 30, 58, 3], ["j", "🍥", 72, 56, 3])),
      SS("They thank each other. Both choices are fine.", S("Thanks.", ["a", "👧", 30, 58, 3], ["o", "👦", 70, 58, 3, "bounce"]))),
    ACT("Mini debate", ["A friend", "A timer", "A grown-up to help"], ["Choose a topic together.", "Each person says an opinion and a reason.", "Listen to each other, then reply kindly.", "Say what went well."]),
    CHK(tf("We can change our mind if we hear a good reason.", true, { hint: "Think of being open.", why: "Listening may change our mind.", tag: "debate.chk2" })),
    SAY("Let us remember. Say what you think, give a reason, listen and reply kindly.", SUM("Say an opinion and give a reason", "Listen to others", "Reply kindly, and change your mind if you want")),
    GLOSS({ talk: "A short speech to an audience.", debate: "A talk where people give different opinions.", reply: "To answer someone.", feedback: "Kind advice about how well something went.", dessert: "A sweet dish eaten at the end of a meal." }),
  ],
  mini: [
    mc("What goes first in a mini talk?", "An opinion", ["A thank you", "A joke"], { hint: "Say what you think.", why: "We start with an opinion." }),
    tf("We listen to others in a debate.", true, { hint: "It is a conversation.", why: "Good talkers listen." }),
    mc("How do we end a talk?", "By thanking the audience", ["By walking away", "By shouting"], { hint: "Be polite.", why: "We thank the audience." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Aisha and the Eid dessert", backdrop: "classroom", caption: "Aisha tells which Eid dessert is best and why, then listens to Omar.",
  scenes: [
    { caption: "A topic.", say: "Our topic today is the best Eid dessert.",
      items: [{ id: "t", emoji: "👩‍🏫", x: 28, y: 58, size: 3 }, { id: "d", emoji: "🍮", x: 72, y: 56, size: 3, anim: "pulse" }] },
    { caption: "Aisha.", say: "I think sheer khurma is the best. That is my opinion.",
      items: [{ id: "a", emoji: "👧", label: "Aisha", x: 30, y: 58, size: 3 }, { id: "d", emoji: "🍮", x: 72, y: 56, size: 3 }] },
    { caption: "Because.", say: "I think so because it is creamy and sweet.",
      items: [{ id: "a", emoji: "👧", x: 30, y: 58, size: 3 }, { id: "c", emoji: "💭", x: 72, y: 36, size: 3, anim: "float" }] },
    { caption: "Eye contact.", say: "She speaks loudly and clearly. She looks at the class.",
      items: [{ id: "a", emoji: "🗣️", x: 35, y: 56, size: 3 }, { id: "c", emoji: "👥", x: 75, y: 58, size: 3 }] },
    { caption: "Omar.", say: "Omar says, I see it differently. I like jalebi.",
      items: [{ id: "o", emoji: "👦", label: "Omar", x: 30, y: 58, size: 3 }, { id: "j", emoji: "🍥", x: 72, y: 56, size: 3 }] },
    { caption: "His reason.", say: "He says, I like it because it is crunchy.",
      items: [{ id: "o", emoji: "👦", x: 30, y: 58, size: 3 }, { id: "c", emoji: "💭", x: 72, y: 36, size: 3, anim: "float" }] },
    { caption: "Listening.", say: "Aisha listens carefully. She does not interrupt.",
      items: [{ id: "a", emoji: "👂", x: 50, y: 56, size: 3, anim: "pulse" }] },
    { caption: "Both happy.", say: "They disagree, but they stay kind. Both choices are good!",
      items: [{ id: "a", emoji: "👧", x: 30, y: 58, size: 3 }, { id: "o", emoji: "👦", x: 70, y: 58, size: 3, effect: "hearts" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- opinion (q1-q8)
  Q("opinion", "recall", "talk.meaning", mc("What does opinion mean?", "What a person thinks or feels about something", ["A fact everyone knows", "A kind of book"], { hint: "Think of favourites.", why: "An opinion is what someone thinks." }),
    mc("Pick the opinion.", "Cricket is the most exciting game", ["Cricket uses a bat", "A cricket ball is hard"], { hint: "Is it what someone thinks?", why: "Most exciting is what someone thinks." })),
  Q("opinion", "recall", "talk.fact_op", mc("Which one is a fact?", "A mango is a fruit", ["Mangoes are the tastiest", "Mangoes are best in July"], { hint: "Can everyone check it?", why: "A mango is a fruit is true for everyone." }),
    mc("Which is a true fact?", "A bus has wheels", ["Buses are the best way to travel", "Buses are too loud"], { hint: "Can everyone check it?", why: "A bus has wheels is true." })),
  Q("opinion", "recall", "talk.reason", mc("What is a reason?", "Why you think or feel something", ["Your favourite colour", "The end of a sentence"], { hint: "It answers why.", why: "A reason says why." }),
    mc("What does a reason do?", "It explains an opinion", ["It starts a story", "It ends a talk"], { hint: "It answers why.", why: "A reason explains why." })),
  Q("opinion", "apply", "talk.because_fill", fill("Complete the sentence.", "I like gulab jamun {b1} they are sweet and soft.", [["because", "but", "or"]], { hint: "Which word gives the reason?", why: "Because gives the reason." }),
    fill("Finish the sentence.", "I think summer is best {b1} the days are long.", [["because", "but", "or"]], { hint: "Which word gives the reason?", why: "Because gives the reason." })),
  Q("opinion", "reason", "talk.fact", mc("Sam says an opinion is a fact. Is he right?", "No, an opinion is what someone thinks, and others may disagree", ["Yes, they are the same", "Yes, opinions are always true"], { hint: "Can others disagree?", why: "A fact is true. An opinion is what someone thinks." }),
    mc("Hana says what she thinks is always a fact. Is she right?", "No, it is her opinion", ["Yes, what she thinks is true for all", "Yes, thoughts are facts"], { hint: "Can others disagree?", why: "It is her opinion." })),
  Q("opinion", "reason", "talk.long", mc("Aisha says you need many long reasons. Is she right?", "No, one clear reason is enough", ["Yes, the longer the better", "Yes, ten reasons are required"], { hint: "Keep it clear.", why: "One clear reason is enough." }),
    mc("Omar says a long list of reasons is best. Is he right?", "No, one clear reason is enough", ["Yes, many long ones", "Yes, never a short one"], { hint: "Keep it clear.", why: "One clear reason is enough." })),
  Q("opinion", "apply", "talk.opinion_tap", hot("Tap the opinion.", [["1️⃣", "Cricket is the best sport.", 22, 50], ["2️⃣", "Cricket has eleven players.", 50, 50], ["3️⃣", "A cricket ball is round.", 78, 50]], ["Cricket is the best sport."], { labels: true, hint: "Which one is what someone thinks?", why: "Best is an opinion." }),
    hot("Tap the fact.", [["1️⃣", "Roses are the loveliest flowers.", 22, 50], ["2️⃣", "A rose is a flower.", 50, 50], ["3️⃣", "Everyone should grow roses.", 78, 50]], ["A rose is a flower."], { labels: true, hint: "Which one is true for all?", why: "A rose is a flower is a fact." })),
  Q("opinion", "apply", "talk.because_tf", tf("Because joins an opinion to its reason.", true, { hint: "It says why.", why: "Because gives the reason." }),
    tf("Because is the word that starts an opinion.", false, { hint: "It comes before the reason.", why: "Because starts the reason, not the opinion." })),
  // ----- loud (q9-q16)
  Q("loud", "apply", "talk.clear", mc("What helps us speak clearly?", "A steady pace and a clear voice", ["A fast, mumbled voice", "Shouting very loudly"], { hint: "Think of the back row.", why: "A steady, clear voice helps." }),
    mc("How should we speak in a class talk?", "Clearly, so everyone can hear", ["In a whisper", "As fast as we can"], { hint: "Think of the audience.", why: "Clear speech helps the audience." })),
  Q("loud", "reason", "talk.shout", mc("Omar says shouting is the best way to be clear. Is he right?", "No, a steady clear voice is better than shouting", ["Yes, shouting is always clearest", "Yes, louder is always better"], { hint: "Think about pace and clarity.", why: "Shouting can be hard to understand." }),
    mc("Mira says a whisper is the best way to be heard. Is she right?", "No, a clear voice is better", ["Yes, whispers carry far", "Yes, quiet is best"], { hint: "Think about the back row.", why: "A whisper is hard to hear." })),
  Q("loud", "apply", "talk.clear_ms", ms("Pick two things that help us be clear.", ["Speak slowly", "Look at the audience"], ["Mumble", "Face the wall"], { hint: "Think of voice and eyes.", why: "Slow speech and eye contact help." }),
    ms("Pick two helpful tips.", ["Use a clear voice", "Pause between ideas"], ["Whisper into your hand", "Rush through it"], { hint: "Think of voice and pace.", why: "A clear voice and pauses help." })),
  Q("loud", "apply", "talk.order", ord("Put the steps of a short talk in order.", ["Think of an opinion", "Think of a reason", "Speak in a full sentence", "Thank the audience"], { hint: "Think first.", why: "We think, then speak, then thank." }),
    ord("Arrange the talk in order.", ["Say your opinion", "Say because and a reason", "Look at your audience", "Say thank you"], { hint: "Opinion first.", why: "We state, justify, connect, then thank." })),
  Q("loud", "apply", "talk.count_sld", sld("Slide to show how many sentences there are: I think mangoes are best. They are sweet. They are juicy.", { min: 0, max: 6, unit: "sentences" }, 3, 0, { hint: "Count the full stops.", why: "There are 3 sentences." }),
    sld("Slide to show how many sentences there are: I like cricket. It is fun.", { min: 0, max: 6, unit: "sentences" }, 2, 0, { hint: "Count the full stops.", why: "There are 2 sentences." })),
  Q("loud", "recall", "talk.opinion_st", st("What do we call what someone thinks or feels about something?", ["opinion", "an opinion"], { hint: "It starts with o.", why: "What someone thinks is an opinion." }),
    st("What do we call the people who listen to a talk?", ["audience", "the audience"], { hint: "It starts with a.", why: "The listeners are the audience." })),
  Q("loud", "apply", "talk.full_sentence", mc("Which is a full sentence opinion?", "I think dogs are friendly.", ["Dogs.", "Friendly dogs."], { hint: "It needs a whole idea.", why: "A full sentence has a whole idea." }),
    mc("Pick the full sentence opinion.", "I believe summer is the best season.", ["Summer.", "Best season."], { hint: "It needs a whole idea.", why: "A full sentence has a whole idea." })),
  Q("loud", "apply", "talk.match_reason", mat("Match each opinion to a reason that fits.", [["I like swimming", "it keeps me cool"], ["I like reading", "I learn new things"], ["I like football", "I play with friends"]], { hint: "Which reason fits?", why: "Each reason fits its opinion." }),
    mat("Join each opinion to a reason that fits.", [["I like rain", "it feeds the plants"], ["I like Eid", "we visit family"], ["I like art", "I make colourful things"]], { hint: "Which reason fits?", why: "Each reason fits its opinion." })),
  // ----- agree (q17-q23)
  Q("agree", "reason", "talk.must_agree", mc("Layla says you must agree with your friends. Is she right?", "No, you can disagree politely and still be friends", ["Yes, always agree", "Yes, disagreeing breaks friendship"], { hint: "Think about the clip.", why: "Friends can think differently." }),
    mc("Sana says you cannot be friends with someone who disagrees. Is she right?", "No, friends can disagree kindly", ["Yes, never disagree", "Yes, agree or leave"], { hint: "Think about Aisha and Omar.", why: "We can disagree and stay friends." })),
  Q("agree", "reason", "talk.no_reason", mc("Zainab says reasons are not needed. Is she right?", "No, a reason helps people understand why we think it", ["Yes, an opinion needs nothing", "Yes, reasons make it boring"], { hint: "Think about because.", why: "A reason explains the opinion." }),
    mc("Ali says just saying what you think is enough. Is he right?", "No, adding a reason makes it stronger", ["Yes, no reason needed", "Yes, reasons are rude"], { hint: "Think about because.", why: "A reason makes the opinion clearer." })),
  Q("agree", "apply", "talk.fit_reason", sld("A talk has 4 children. Each speaks for 2 minutes. Slide to show how many minutes in all.", { min: 0, max: 12, unit: "minutes" }, 8, 0, { hint: "2 + 2 + 2 + 2.", why: "4 children of 2 minutes make 8 minutes." }),
    sld("A talk has 3 children. Each speaks for 3 minutes. Slide to show how many minutes in all.", { min: 0, max: 12, unit: "minutes" }, 9, 0, { hint: "3 + 3 + 3.", why: "3 children of 3 minutes make 9 minutes." })),
  Q("agree", "apply", "talk.polite_ms", ms("Pick two polite replies. Pick two.", ["I understand your idea", "Thank you for sharing"], ["That is silly", "Be quiet"], { hint: "Be kind.", why: "Understanding and thanking are polite." }),
    ms("Pick two kind replies.", ["I see it differently, because...", "That is an interesting idea"], ["Nobody asked you", "You are wrong"], { hint: "Be kind.", why: "Respectful replies are kind." })),
  Q("agree", "reason", "talk.listening", mc("Sam says listening is not part of a talk. Is he right?", "No, listening is part of a good talk", ["Yes, only the speaker matters", "Yes, listening is boring"], { hint: "Think about replies.", why: "Listening lets us reply well." }),
    mc("Mira says good speakers never listen. Is she right?", "No, good speakers also listen", ["Yes, they only talk", "Yes, listening is rude"], { hint: "Think about the debate.", why: "Good speakers listen." })),
  Q("agree", "apply", "talk.wait_tf", tf("It is polite to wait for your turn to speak.", true, { hint: "Do not interrupt.", why: "Waiting is polite." }),
    tf("Interrupting is a polite way to join in.", false, { hint: "Wait your turn.", why: "Interrupting is not polite." })),
  Q("agree", "apply", "talk.polite_match", mat("Match each reply to polite or not polite.", [["I agree because it is sweet", "Polite"], ["That is a silly idea", "Not polite"], ["I see it differently", "Polite"]], { hint: "Be kind.", why: "Kind replies are polite." }),
    mat("Join each reply to polite or not polite.", [["Thank you for sharing", "Polite"], ["Be quiet", "Not polite"], ["Can I add an idea?", "Polite"]], { hint: "Be kind.", why: "Kind replies are polite." })),
  // ----- debate (q24-q30)
  Q("debate", "reason", "talk.because_starts", mc("Aisha says because starts an opinion. Is she right?", "No, because starts the reason", ["Yes, because starts the opinion", "Yes, because ends a talk"], { hint: "Because joins and gives the reason.", why: "Because comes before the reason." }),
    mc("Hamza says we say because before we say what we think. Is he right?", "No, we state the opinion first and the reason after because", ["Yes, because comes first", "Yes, because comes last"], { hint: "Opinion, because, reason.", why: "The order is opinion, because, reason." })),
  Q("debate", "reason", "talk.change_mind", mc("Omar says you can never change your mind. Is he right?", "No, a good reason may change our mind", ["Yes, never change", "Yes, changing is wrong"], { hint: "Think about listening.", why: "We can change our mind when we hear a good reason." }),
    mc("Layla says it is wrong to change your mind. Is she right?", "No, it is fine to change when we learn something new", ["Yes, never", "Yes, always stay the same"], { hint: "Think about learning.", why: "Changing our mind is fine." })),
  Q("debate", "apply", "talk.plan_ord", ord("Put the mini talk plan in order.", ["Choose a topic", "Say an opinion", "Give a reason", "Thank the audience"], { hint: "Choose first.", why: "Choose, opinion, reason, thanks." }),
    ord("Put the mini debate steps in order.", ["Plan a talk", "Practise aloud", "Give the talk", "Listen to feedback"], { hint: "Plan first.", why: "Plan, practise, give, listen." })),
  Q("debate", "apply", "talk.best_reason", hot("Tap the best reason for: Eid is the best day.", [["1️⃣", "We share food and visit family", 22, 50], ["2️⃣", "My shoe is blue", 50, 50], ["3️⃣", "Tuesday comes after Monday", 78, 50]], ["We share food and visit family"], { labels: true, hint: "The reason should fit.", why: "Sharing food and visiting family fits liking Eid." }),
    hot("Tap the best reason for: I like cricket.", [["1️⃣", "It is exciting to watch and play", 22, 50], ["2️⃣", "My pencil is long", 50, 50], ["3️⃣", "The sky is blue", 78, 50]], ["It is exciting to watch and play"], { labels: true, hint: "The reason should fit.", why: "Excitement fits liking cricket." })),
  Q("debate", "recall", "talk.because_st", st("Write the word that joins an opinion to its reason.", ["because"], { hint: "It tells why.", why: "Because gives the reason." }),
    st("Write the word that gives the reason: I like rain ___ it feeds the plants.", ["because"], { hint: "It tells why.", why: "Because gives the reason." })),
  Q("debate", "apply", "talk.fill_listen", fill("Finish the sentences about a talk.", "In a debate we give a {b1} and we {b2} when others speak.", [["reason", "joke", "song"], ["listen", "shout", "hide"]], { hint: "Think about being kind.", why: "We give a reason and we listen." }),
    fill("Complete the lines about a talk.", "A good talker speaks {b1} and replies {b2}.", [["clearly", "quietly", "wildly"], ["kindly", "rudely", "never"]], { hint: "Think about voice and replies.", why: "Good talkers are clear and kind." })),
  Q("debate", "apply", "talk.mind_tf", tf("A good reason can change what we think.", true, { hint: "Be open.", why: "A good reason may change our mind." }),
    tf("We must never change our mind once we have spoken.", false, { hint: "Be open.", why: "We can change our mind." })),
];

export const topics = [
  topicLesson({
    slug: "english-class-1-say-what-you-think", subject: "english", cls: 1, topic: 10, title: "Say What You Think and Why",
    summary: "Speak loudly and clearly, give one reason with because, and listen politely.",
    unit: "Topic 10: Say what you think and why", difficulty: 1,
    objectives: ["Share an opinion in a full sentence", "Add one reason with because", "Listen and respond kindly"],
    success_criteria: ["I can say what I think", "I can add a reason with because", "I can listen and reply kindly"],
    real_life: "Favourite Eid food, a favourite cricket player, show-and-tell in the UK, and class recitation in Pakistan.",
    standards: [NC("Y2 spoken language", "Articulate and justify answers, arguments and opinions; listen and respond to others; speak audibly in full sentences")],
    warm_up: [
      mc("Which word gives a reason?", "because", ["banana", "under"], { hint: "It tells why.", why: "Because gives the reason." }),
      tf("An opinion is what someone thinks.", true, { hint: "Think of favourites.", why: "An opinion is what you think." }),
      mc("How should you speak to the class?", "Clearly and kindly", ["Very quietly", "Very rudely"], { hint: "Think of being heard.", why: "Clear and kind is best." }),
    ],
    intro: [],
    subs: [opinion, loud, agree, debate],
    clip,
    quiz,
  }),
];
