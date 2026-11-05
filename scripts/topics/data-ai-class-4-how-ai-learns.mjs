import { SAY, SS, H, T, IMG, REVEAL, ACT, BRAIN, SUM, CHK, S, EXP, GLOSS, TABLE, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Computer Science, Data & AI, Class 4 (Fatima, age 9), topic 3: How AI learns.
// Standards: AI4K12 Big Idea 3 (learning) and Big Idea 5 (societal impact), ages 8 to 11 (docs/CURRICULUM_V2.md).
const o = (hint, why, tag) => ({ hint, why, tag });

const trainingData = {
  id: "training", kind: "learn", title: "Training data and labels",
  blocks: [
    H("Stop 1: Machines learn from data"),
    SAY("A normal program follows rules a programmer wrote. But a machine learning program works differently. Nobody writes every rule. Instead we give it lots of examples, called training data, and it finds the patterns itself. Think of teaching a child to spot a mango. You do not list rules. You show many mangoes, and say: this is a mango.", T("**Machine learning** finds patterns in **training data**.", "Nobody writes every rule. The machine learns from examples.")),
    EXP("Learning from examples",
      SS("We show the machine pictures of fruit.", S("Training data: pictures of fruit.", ["a", "🥭", 20, 50, 3], ["b", "🍌", 50, 50, 3], ["c", "🍎", 80, 50, 3])),
      SS("Each picture has a label that says what it is: mango, banana, apple. The labels are the right answers.", S("Each picture has a label.", ["a", "🥭", 20, 50, 3, "none", "mango"], ["b", "🍌", 50, 50, 3, "none", "banana"], ["c", "🍎", 80, 50, 3, "none", "apple"])),
      SS("After thousands of labelled examples, the machine learns the patterns: the colour, the shape and the size. Now it can name a fruit it has never seen before.", S("It learns the patterns.", ["a", "🥭", 20, 70, 2, "none", "mango"], ["b", "🍌", 50, 70, 2, "none", "banana"], ["c", "🍎", 80, 70, 2, "none", "apple"], ["m", "🧠", 50, 25, 3, "pulse", "model"]))),
    CHK(mc("What is training data?", "Examples we show a machine so it can learn", ["The rules a programmer typed in", "The screen of a computer"], o("Think about teaching with examples.", "Training data is the set of examples a machine learns from.", "ai4.training"))),
    H("Stop 2: Labels"),
    SAY("A label is the right answer attached to an example. If the labels are wrong, the machine learns the wrong thing. Imagine a photo of a lemon labelled as an orange. The machine would be confused. Good labels are accurate and consistent. That is why people check labels carefully.", T("A **label** is the right answer for an example. Wrong labels teach wrong things.")),
    TABLE("A tiny labelled data set", [["Round, red, shiny", 1, "🍎"], ["Long, yellow", 2, "🍌"], ["Round, orange", 3, "🍊"]], "Each row is an example. The label is the fruit."),
    CHK(tf("If a photo of a lemon is labelled as an orange, the machine could learn the wrong thing.", true, o("Think about wrong labels.", "A wrong label teaches a wrong pattern.", "ai4.labels"))),
    SAY("Let us remember. Machine learning finds patterns in labelled training data. Good labels matter.", SUM("Machine learning learns from training data", "Labels are the right answers", "Wrong labels teach wrong things")),
    GLOSS({ "machine learning": "A way for computers to learn patterns from examples.", "training data": "The examples a machine learns from.", label: "The right answer attached to an example.", pattern: "Something that repeats or looks alike.", model: "What a machine builds after learning from data." }),
  ],
  mini: [
    mc("In machine learning, who writes every rule?", "Nobody. The machine finds patterns", ["The user", "The screen"], o("Think about examples.", "The machine finds patterns itself.")),
    tf("A label is the right answer attached to an example.", true, o("Like a name tag.", "A label names the example.")),
    mc("What does a machine learning program learn from?", "Training data", ["Its battery", "Its charger"], o("Examples.", "It learns from training data.")),
    mc("Why do people check labels?", "Wrong labels teach the wrong thing", ["Labels look pretty", "Labels use more power"], o("Accuracy matters.", "A wrong label teaches the wrong pattern.")),
  ],
};

const testing = {
  id: "testing", kind: "try", title: "Patterns and testing",
  blocks: [
    H("Stop 1: Finding patterns"),
    SAY("When a machine looks at lots of examples, it searches for patterns that tell the groups apart. For cats and dogs, it might spot that cats have pointed ears and whiskers while dogs have longer noses. It does not truly understand animals. It matches patterns in the numbers that make up the pictures. The more varied the examples, the better the patterns.", T("The machine looks for **patterns** that tell groups apart. It does not truly understand.")),
    EXP("Patterns tell cats from dogs",
      SS("Here are some cats and dogs. The machine compares them.", S("Cats and dogs.", ["c1", "🐱", 20, 40, 3], ["c2", "🐈", 35, 40, 3], ["d1", "🐶", 65, 40, 3], ["d2", "🐕", 80, 40, 3])),
      SS("It notices patterns: pointed ears and whiskers on one side, longer noses on the other.", S("Patterns: ears, whiskers, noses.", ["c1", "🐱", 20, 55, 3, "none", "pointed ears"], ["c2", "🐈", 35, 55, 3, "none", "whiskers"], ["d1", "🐶", 65, 55, 3, "none", "long nose"], ["d2", "🐕", 80, 55, 3, "none", "long nose"])),
      SS("Then it uses those patterns to guess about a new picture.", S("Now it guesses about a new picture.", ["n", "❓", 50, 40, 3, "pulse"], ["m", "🧠", 50, 75, 2, "bounce"]))),
    CHK(mc("What does a machine learning program search for in examples?", "Patterns", ["Jokes", "Passwords"], o("Things that repeat.", "It searches for patterns.", "ai4.patterns"))),
    H("Stop 2: Testing"),
    SAY("How do we know if the machine really learned? We test it with new examples it has never seen. If we tested with the same pictures it trained on, it could just remember them. Out of twenty new pictures, if it gets eighteen right, that is ninety percent accuracy. If it gets only ten right, it needs more or better training.", T("We **test** with new examples. **Accuracy** is how many it gets right.")),
    IMG("🧪🐱🐶", "Test a machine with new pictures."),
    SAY("Be the trainer. Teach a friend with cards, then test them.", ACT("Train and test a friend", ["10 drawn cards: 5 cats and 5 dogs", "A friend"], ["Show your friend 6 cards with labels.", "Hide the labels and show them the 4 other cards.", "How many did they get right? That is their accuracy."])),
    CHK(num("A machine is tested on 20 new pictures and gets 16 right. How many did it get wrong?", 4, o("20 minus 16.", "20 - 16 = 4.", "ai4.testing"))),
    SAY("Let us remember. Machines find patterns in examples. We test with new ones to check accuracy.", SUM("Machines look for patterns", "Test with new examples to check accuracy")),
    GLOSS({ pattern: "Something that repeats or looks alike.", test: "To try something with new examples to see if it works.", accuracy: "How many answers are right.", "new examples": "Examples the machine did not see during training." }),
  ],
  mini: [
    mc("Why do we test a machine with new examples?", "To see if it really learned", ["To use up its battery", "To make it faster"], o("Not just remembering.", "New examples show real learning.")),
    num("A machine gets 9 out of 10 right. How many wrong?", 1, o("10 minus 9.", "10 - 9 = 1.")),
    tf("Accuracy tells us how many answers are right.", true, o("Right answers.", "Accuracy is about right answers.")),
  ],
};

const wrong = {
  id: "gets_wrong", kind: "play", title: "When AI gets it wrong",
  blocks: [
    H("Stop 1: Why mistakes happen"),
    SAY("AI makes mistakes. Often the reason is the training data. If a machine only saw pictures of white cats, it might not recognise a black cat. That is because the examples were not varied enough. This problem is called bias. A fair machine needs training data from many kinds of examples. Also, if the world changes, old training data can go out of date.", T("**Bias** happens when training data is not varied or fair.", "Machines can get things wrong if they have not seen enough different examples.")),
    EXP("The white cat problem",
      SS("The machine is trained only on white cats.", S("Only white cats in training.", ["w1", "🐈", 25, 50, 3], ["w2", "🐈", 50, 50, 3], ["w3", "🐈", 75, 50, 3], ["l", "⬜", 50, 25, 2, "none", "only white"])),
      SS("Then it sees a black cat. It has never seen one like this, so it may say: not a cat.", S("A black cat. It says: not a cat?", ["b", "🐈‍⬛", 50, 50, 3, "bounce"], ["q", "❓", 75, 30, 2, "pulse"])),
      SS("The fix is more varied training data: cats of every colour and size.", S("The fix: more varied examples.", ["w1", "🐈", 20, 50, 2], ["b", "🐈‍⬛", 40, 50, 2], ["g", "🐱", 60, 50, 2], ["t", "🐅", 80, 50, 2], ["ok", "✅", 50, 20, 3, "bounce"]))),
    CHK(mc("A machine only trained on white cats misses a black cat. What is the best fix?", "Train it on cats of many colours", ["Switch it off forever", "Show it only white cats again"], o("More variety.", "Varied training data helps it learn better.", "ai4.bias"))),
    H("Stop 2: Brain game"),
    SAY("Time for a memory game. Mistakes are fine when we are learning. Find the matching pairs.", T("Brains learn from mistakes too. Match the pairs.")),
    BRAIN("memory_match", "Learning pairs", "Find the pairs.", ["🐱", "🐶", "🐦", "🐟"]),
    CHK(tf("A machine can be wrong if its training data is not varied enough.", true, o("Think about the white cat.", "Narrow data causes mistakes.", "ai4.bias"))),
    SAY("Let us remember. Machines make mistakes when training data is narrow, unfair or out of date.", SUM("Narrow training data causes mistakes", "Bias is when data is not fair or varied", "More varied data helps")),
    GLOSS({ bias: "When data or decisions are not fair or varied enough.", varied: "Including many different kinds.", "out of date": "No longer true because things have changed." }),
  ],
  mini: [
    mc("What is bias in AI?", "When the training data is not fair or varied", ["A fast computer", "A kind of battery"], o("Think about the white cats.", "Bias comes from unfair or narrow data.")),
    tf("AI never makes mistakes.", false, o("Think of the black cat.", "AI can be wrong.")),
    mc("How can we make AI fairer?", "Use varied training data", ["Use fewer examples", "Hide the labels"], o("More variety.", "Varied data helps.")),
  ],
};

const checking = {
  id: "checking", kind: "use", title: "Checking AI answers",
  blocks: [
    H("Stop 1: Do not just trust it"),
    SAY("AI tools can sound very sure, even when they are wrong. A smart user checks. First, ask: does this make sense? Second, look for the same fact in a trusted source such as a school book, an encyclopaedia or a grown-up. If two good sources agree, it is more likely to be right. If they disagree, keep investigating. Never share private details like your full name, address or school with an AI.", T("Always **check** AI answers with a trusted **source**.", "Never share private details with an AI tool.")),
    IMG("🤖🔍📚", "Check the answer with a trusted book or a grown-up."),
    CHK(mc("An AI gives you a surprising fact. What should you do?", "Check it in a trusted book or with a grown-up", ["Believe it at once", "Tell everyone"], o("Be a detective.", "Check with trusted sources.", "ai4.check"))),
    H("Stop 2: Using AI fairly and kindly"),
    SAY("Using AI is also about being honest. If AI helped with your homework, say so. Copying AI answers and calling them your own is not honest. AI is a helper for learning, not a replacement for thinking. Ask it to explain, then try yourself. And remember that people matter more than machines: be kind and fair, and ask a grown-up when unsure.", T("Be **honest** about using AI. Use it to help you think, not to think for you.")),
    SAY("Being fair and honest with AI means saying when it helped you.", IMG("🤝🤖", "Be honest about when AI helps you.")),
    SAY("Here is a short fair-use activity to try with a grown-up.", ACT("Fact check detective", ["A grown-up", "A trusted book or website"], ["Ask a grown-up to show you an AI answer to a science question.", "Find the same fact in a trusted source.", "Do they agree? Write one sentence about what you found."])),
    REVEAL("Is it okay to copy an AI answer and say you wrote it?", "No. That is not honest. You can use AI to help you learn, but the words and thinking should be yours."),
    CHK(tf("If two trusted sources agree with an AI answer, it is more likely to be right.", true, o("Agreement helps.", "Matching sources give more confidence.", "ai4.check"))),
    SAY("Let us remember. Check AI answers, keep private things private and be honest about using AI.", SUM("Check AI answers with trusted sources", "Be honest about using AI", "Keep private things private")),
    GLOSS({ check: "To make sure something is true.", source: "A place where information comes from, such as a book.", honest: "Telling the truth and not pretending.", trusted: "Known to be reliable." }),
  ],
  mini: [
    mc("Which is a trusted source?", "A school textbook", ["A rumour", "A random comment"], o("Reliable.", "A textbook is checked by experts.")),
    tf("AI always sounds unsure when it is wrong.", false, o("Think about confident mistakes.", "AI can sound sure even when wrong.")),
    mc("What is the honest way to use AI for homework?", "Use it to help you learn, and say so", ["Copy and claim it", "Hide it"], o("Be truthful.", "Use AI as a helper and be honest.")),
  ],
};

const ALTS = [
  [mc("What name do we give the examples a machine learns from?", "Training data", ["A loop", "A flowchart"], o("Teaching examples.", "Training data teaches the machine.", "ai4.training")), mc("Which set of examples is used to teach a machine?", "Training data", ["The charger", "The screen"], o("Teaching examples.", "Training data teaches the machine.", "ai4.training"))],
  [tf("A label names an example for the machine.", true, o("The right answer.", "A label is the right answer.", "ai4.labels")), tf("Labels are never needed in training data.", false, o("The right answer.", "Labelled data helps machines learn.", "ai4.labels"))],
  [num("A machine is tested on 10 new pictures and gets 8 right. How many wrong?", 2, o("10 minus 8.", "10 - 8 = 2.", "ai4.testing")), num("A machine is tested on 25 new pictures and gets 20 right. How many wrong?", 5, o("25 minus 20.", "25 - 20 = 5.", "ai4.testing"))],
  [fill("Complete this sentence about how machines learn.", "A machine learns {b1} in {b2} data.", [["patterns", "pizzas", "paints"], ["training", "tiring", "trading"]], o("Think back.", "A machine finds patterns in training data.", "ai4.vocab")), fill("Complete this sentence about labels.", "A {b1} is the right {b2} for an example.", [["label", "loop", "lid"], ["answer", "angle", "animal"]], o("Think back.", "A label is the right answer.", "ai4.vocab"))],
  [ms("Which are good things for training data? Pick two.", ["Many different examples", "Correct labels"], ["Only one kind of example", "Wrong labels"], o("Variety and accuracy.", "Good data is varied and correctly labelled.", "ai4.bias")), ms("Pick two ways to make AI fairer.", ["Use varied data", "Check for mistakes"], ["Use less data", "Hide results"], o("Variety and checking.", "Varied data and checking help.", "ai4.bias"))],
  [mat("Pair each AI word with what it means.", [["Training data", "Examples to learn from"], ["Label", "The right answer"], ["Bias", "Unfair or narrow data"]], o("Think back.", "Each word has its own meaning.", "ai4.vocab")), mat("Pair each AI idea with its job.", [["Testing", "Checks if it learned"], ["Pattern", "Helps tell groups apart"], ["Accuracy", "How many are right"]], o("Think back.", "Each idea has its own job.", "ai4.vocab"))],
  [mc("A machine trained only on photos taken in daylight struggles at night. Why?", "It has not seen enough night examples", ["Night is broken", "Machines hate the dark"], o("Think about variety.", "Narrow data causes mistakes.", "ai4.bias")), mc("A machine trained only on summer pictures struggles with snow. Why?", "It has not seen enough snowy examples", ["Snow is not real", "The screen is cold"], o("Think about variety.", "Narrow data causes mistakes.", "ai4.bias"))],
  [mc("Sana says an AI that sounds sure must be right. Is she right?", "No, confident answers can still be wrong", ["Yes, always", "Only in maths"], o("Think about confident mistakes.", "AI can be wrong even when it sounds sure.", "ai4.reason")), mc("Bilal says we never need to check an AI answer. Is he right?", "No, we should check important answers", ["Yes, never check", "Only for games"], o("Think about being a detective.", "Checking is important.", "ai4.reason"))],
  [sld("A machine gets 18 of 20 test pictures right. Slide to show the number it got right.", { min: 0, max: 20 }, 18, 0, o("Read the question.", "It got 18 right.", "ai4.testing")), sld("A machine gets 15 of 20 test pictures right. Slide to show the number it got right.", { min: 0, max: 20 }, 15, 0, o("Read the question.", "It got 15 right.", "ai4.testing"))],
  [hot("Tap the training set with more variety.", [["🐈", "Only white cats", 22, 50], ["🐱", "Cats of many colours", 50, 50], ["🐈", "Only one cat photo", 78, 50]], ["Cats of many colours"], { labels: true, ...o("Variety helps.", "Many colours give better learning.", "ai4.bias") }), hot("Tap the better set of training pictures.", [["🍎", "Only one apple", 22, 50], ["🍎", "Apples of many colours and sizes", 50, 50], ["🍎", "Only green apples", 78, 50]], ["Apples of many colours and sizes"], { labels: true, ...o("Variety helps.", "A varied set teaches better.", "ai4.bias") })],
  [mc("Which source could you trust to check a fact?", "An encyclopaedia", ["A rumour", "A guess"], o("Reliable.", "An encyclopaedia is checked.", "ai4.check")), mc("Which is the best way to check a science fact from AI?", "Look in a school book", ["Ask a random post", "Just believe it"], o("Reliable.", "A school book is a trusted source.", "ai4.check"))],
  [tf("It is safe to tell an AI your home address.", false, o("Is it private?", "Keep private things private.", "ai4.safe")), tf("We should keep our school name private when using AI.", true, o("Is it private?", "Keep private things private.", "ai4.safe"))],
  [tf("Saying you wrote something an AI wrote is honest.", false, o("Be truthful.", "That is not honest.", "ai4.check")), tf("Telling a teacher that AI helped you is being honest.", true, o("Be truthful.", "Being open is honest.", "ai4.check"))],
  [mc("Tariq says AI helps but cannot do his thinking for him. Is he right?", "Yes, we should still think for ourselves", ["No, AI should think for us", "Only on Mondays"], o("Use AI as a helper.", "AI helps but does not replace thinking.", "ai4.reason")), mc("Mina says if AI wrote her homework she is just as honest. Is she right?", "No, she should say AI helped", ["Yes", "Only for maths"], o("Be truthful.", "Honesty means being open.", "ai4.reason"))],
  [ord("Arrange these steps for checking an AI answer.", ["Read the AI answer", "Find the same fact in a trusted source", "Decide if they agree"], o("Read first.", "Read, find, then compare.", "ai4.check")), ord("Put these steps for training a model in order.", ["Collect examples", "Add labels", "Test with new examples"], o("Collect first.", "Collect, label, then test.", "ai4.process"))],
];

const qd = (q, sub, depth) => ({ q, sub, depth });
export const topics = [
  topicLesson({
    slug: "data-ai-class-4-how-ai-learns", subject: "data-ai", cls: 4, topic: 3, title: "How AI Learns",
    summary: "Training data and labels, patterns and testing, when AI gets it wrong, and checking its answers.",
    unit: "Topic 3: How AI learns", difficulty: 2,
    objectives: ["Explain how a machine learns from labelled examples", "Say how we test a machine and why AI can be biased", "Check AI answers and use AI honestly"],
    success_criteria: ["I can explain training data and labels", "I can say why AI makes mistakes", "I know how to check an AI answer"],
    real_life: "Photo apps that sort faces, voice helpers and homework helpers all learn from data and can make mistakes.",
    standards: [
      { framework: "ai4k12", code: "Big Idea 3", text: "Learning: computers can learn from data; machine learning uses training data and finds patterns" },
      { framework: "ai4k12", code: "Big Idea 5", text: "Societal impact: AI can impact the world in positive and negative ways, including bias" },
    ],
    warm_up: [
      mc("What is the middle number in 2, 5, 9?", "5", ["2", "9"], o("It is in the middle.", "5 is in the middle.")),
      mc("What does a variable store?", "A value", ["A picture only", "A sound only"], o("A named box.", "A variable stores a value.")),
      num("What is 7 x 6?", 42, o("6 sevens.", "7 x 6 = 42.")),
    ],
    intro: [
      H("Welcome, AI investigator!"),
      SAY("Welcome, AI investigator! Today's big question: how does a computer learn? We will see how machines learn from examples, how to test them, why they sometimes get things wrong, and how we should check their answers. Let's go!", T("Today's big question: how does a computer learn?", "We will explore training data, testing and fairness.")),
      IMG("🤖📚", "Machines learn from examples, but people must check."),
      GLOSS({ investigator: "Someone who looks closely to find out the truth." }),
    ],
    subs: [trainingData, testing, wrong, checking],
    quiz: [
      qd(mc("Which is the set of examples used to teach a machine?", "Training data", ["A loop", "A flowchart"], o("Teaching examples.", "Training data teaches the machine.", "ai4.training")), "training", "recall"),
      qd(tf("A label tells a machine what an example is.", true, o("The right answer.", "A label is the right answer.", "ai4.labels")), "training", "recall"),
      qd(num("A machine is tested on 30 new pictures and gets 24 right. How many did it get wrong?", 6, o("30 minus 24.", "30 - 24 = 6.", "ai4.testing")), "testing", "apply"),
      qd(fill("Finish this sentence about machine learning.", "A machine learns {b1} in {b2} data.", [["patterns", "pizzas", "paints"], ["training", "tiring", "trading"]], o("Think back.", "A machine finds patterns in training data.", "ai4.vocab")), "training", "recall"),
      qd(ms("Pick the two good things for training data.", ["Many different examples", "Correct labels"], ["Only one kind of example", "Wrong labels"], o("Variety and accuracy.", "Good data is varied and correctly labelled.", "ai4.bias")), "gets_wrong", "apply"),
      qd(mat("Match each AI word to its meaning.", [["Training data", "Examples to learn from"], ["Label", "The right answer"], ["Bias", "Unfair or narrow data"]], o("Think back.", "Each word has its own meaning.", "ai4.vocab")), "gets_wrong", "recall"),
      qd(mc("A machine trained only on daytime photos struggles at night. Why?", "It has not seen enough night examples", ["Night is broken", "Machines hate the dark"], o("Think about variety.", "Narrow data causes mistakes.", "ai4.bias")), "gets_wrong", "reason"),
      qd(mc("Sana says an AI that sounds confident must be right. Is she right?", "No, confident answers can still be wrong", ["Yes, always", "Only in maths"], o("Think about confident mistakes.", "AI can be wrong even when it sounds sure.", "ai4.reason")), "checking", "reason"),
      qd(sld("A machine gets 17 of 20 test pictures right. Slide to show the number it got right.", { min: 0, max: 20 }, 17, 0, o("Read the question.", "It got 17 right.", "ai4.testing")), "testing", "apply"),
      qd(hot("Tap the set of training pictures that is more varied.", [["🐈", "Only white cats", 22, 50], ["🐱", "Cats of many colours", 50, 50], ["🐈", "Only one cat photo", 78, 50]], ["Cats of many colours"], { labels: true, ...o("Variety helps.", "Many colours give better learning.", "ai4.bias") }), "gets_wrong", "apply"),
      qd(mc("Which is a trusted source for checking a fact?", "An encyclopaedia", ["A rumour", "A guess"], o("Reliable.", "An encyclopaedia is checked.", "ai4.check")), "checking", "recall"),
      qd(tf("It is safe to tell an AI tool your home address.", false, o("Is it private?", "Keep private things private.", "ai4.safe")), "checking", "recall"),
      qd(tf("Copying an AI answer and saying you wrote it yourself is honest.", false, o("Be truthful.", "That is not honest.", "ai4.check")), "checking", "recall"),
      qd(mc("Tariq says AI is a good helper but cannot replace his own thinking. Is he right?", "Yes, we should still think for ourselves", ["No, AI should think for us", "Only on Mondays"], o("Use AI as a helper.", "AI helps but does not replace thinking.", "ai4.reason")), "checking", "reason"),
      qd(ord("Put these steps for checking an AI answer in order.", ["Read the AI answer", "Find the same fact in a trusted source", "Decide if they agree"], o("Read first.", "Read, find, then compare.", "ai4.check")), "checking", "reason"),
    ].map((x, i) => ({ ...x, alts: ALTS[i] })),
  }),
];
