import { SAY, SS, H, T, IMG, REVEAL, ACT, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld, PHOTO } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Computer Science, Data & AI, Class 1 (Zainab, age 7), topic 4: Smart machines (AI).
// Standards: AI4K12 Big Ideas 1 (perception), 3 (learning) and 5 (societal impact), ages 5 to 7 (docs/CURRICULUM_V2.md).
const o = (hint, why, tag) => ({ hint, why, tag });

const CATDOG = "data-ai-class-1-smart-machines-1-e85558a2.jpg";
const SOFA = "data-ai-class-1-smart-machines-2-7c801029.jpg";

const whatIsAI = {
  id: "what_is_ai", kind: "learn", title: "What is AI?",
  blocks: [
    H("Welcome back, AI explorer!"),
    SAY("Today we meet smart machines. How do they see, hear and learn?", T("Today's big question: how do smart machines work?")),
    SAY("You can tell a cat from a dog. A machine has to learn how.", PHOTO(CATDOG, "A tabby cat and a black and white puppy lying on grass", "A cat and a dog. Can a machine tell them apart?", "Photo by Andrew S on Unsplash")),
    H("Stop 1: Smart machines"),
    SAY("Some machines seem clever. A phone can answer a question. A map app can find the way home. We call this kind of clever computer program artificial intelligence, or AI. Artificial means made by people. Intelligence means being able to learn and work things out. But AI is not alive. It is a computer program that people made.", T("**AI** is a computer program that can do things that seem clever.", "AI is **made by people**. It is not alive.")),
    IMG("🤖🧠", "AI is a clever computer program made by people."),
    CHK(mc("Who makes AI?", "People", ["Rabbits", "Clouds"], o("It is a computer program.", "People write the programs that make AI.", "ai.what"))),
    H("Stop 2: AI is all around"),
    SAY("AI is in places you might not expect. A voice helper, a face-finding camera and a game opponent all use it. But a toaster, a bicycle and a spade are not AI. Let us see the difference.", T("Some machines use **AI**: voice helpers, smart cameras and game opponents.", "A toaster or a spade is not AI.")),
    EXP("AI or not AI?",
      SS("A voice helper listens and answers. This uses AI.", S("Voice helper: AI.", ["a", "📱", 25, 55, 3, "bounce", "AI"])),
      SS("A smart camera picks out faces in a photo. This uses AI too.", S("Smart camera: AI.", ["a", "📱", 20, 55, 3, "none", "AI"], ["b", "📷", 50, 55, 3, "bounce", "AI"])),
      SS("A spade just digs. A spade is not AI.", S("Spade: not AI.", ["a", "📱", 15, 55, 2, "none", "AI"], ["b", "📷", 38, 55, 2, "none", "AI"], ["c", "⛏️", 70, 55, 3, "pulse", "Not AI"]))),
    CHK(mc("Which of these uses AI?", "A voice helper", ["A spade", "A pencil"], o("Does it listen and answer?", "A voice helper uses AI to understand you.", "ai.what"))),
    SAY("Let us remember. AI is a clever computer program made by people. It is not alive.", SUM("AI is a clever program made by people", "AI is not alive")),
    GLOSS({ machine: "A thing that does a job, often with a computer.", sensor: "A part that picks up light, sound or touch.", AI: "A computer program that can do things that seem clever.", "artificial intelligence": "Another name for AI.", "made by people": "Created by humans, not alive.", program: "Instructions that tell a computer what to do." }),
  ],
  mini: [
    tf("AI is a living creature.", false, o("It is a program.", "AI is a computer program, not alive.")),
    mc("What does AI stand for?", "Artificial intelligence", ["Apple ice", "All ideas"], o("Two words.", "AI stands for artificial intelligence.")),
    mc("Which one does NOT use AI?", "A spade", ["A voice helper", "A smart camera"], o("It has no computer.", "A spade is just a tool.")),
    mc("Why do some machines seem clever?", "People wrote clever programs for them", ["They are alive", "They eat food"], o("Who makes programs?", "People write the programs.")),
  ],
};

const seeHear = {
  id: "see_hear", kind: "try", title: "How machines see and hear",
  blocks: [
    H("Stop 1: Machines that see"),
    SAY("A camera is like an eye for a machine. It takes a picture. But a picture is just a lot of tiny dots of colour. The computer has to work out what the dots show. Round dots that look like a face tell it: that is a face. Machines learn to spot things from lots and lots of pictures. This is called perception.", T("A machine can **see** with a **camera**. It looks for patterns in the dots of a picture.")),
    EXP("A camera spots a cat",
      SS("The camera takes a picture of a cat.", S("The camera takes a picture.", ["cam", "📷", 20, 55, 3, "bounce"], ["cat", "🐱", 70, 55, 3])),
      SS("The computer looks for patterns in the dots: pointy ears, whiskers, a round face.", S("It looks for patterns: ears, whiskers, a face.", ["cam", "📷", 20, 55, 3], ["cat", "🐱", 70, 55, 3, "pulse"], ["q", "🔍", 45, 30, 2, "bounce"])),
      SS("It decides: this looks like a cat! But it might sometimes be wrong.", S("It says: cat! But it can be wrong.", ["cam", "📷", 20, 55, 3], ["cat", "🐱", 70, 55, 3], ["t", "✅", 45, 30, 2, "bounce", "cat"]))),
    CHK(mc("What does a camera help a machine do?", "See", ["Sleep", "Taste"], o("It is like an eye.", "A camera lets a machine see.", "ai.perception"))),
    H("Stop 2: Machines that hear"),
    SAY("A microphone is like an ear for a machine. It records sound waves. A voice helper listens for patterns in your voice and turns it into words. Sometimes it gets the wrong word, especially if there is noise. It learns from lots of voices. Now try it for yourself.", T("A machine can **hear** with a **microphone**. It listens for patterns in sound.")),
    IMG("🎤👂", "A microphone is like an ear for a machine."),
    SAY("Let us play a little detective game at home.", ACT("What can the machine see?", ["A tablet with a camera or a toy", "A grown-up"], ["Ask a grown-up to show you a camera app or a talking toy.", "Point the camera at three things. What does it show?", "Does it ever get it wrong? Tell a grown-up."])),
    CHK(tf("A voice helper always understands us perfectly.", false, o("Think about noise.", "Sometimes it hears the wrong word.", "ai.perception"))),
    SAY("Let us remember. Cameras are eyes for machines and microphones are ears. They look for patterns.", SUM("A camera is an eye for a machine", "A microphone is an ear for a machine", "They can make mistakes")),
    GLOSS({ camera: "A machine that takes pictures.", microphone: "A machine that hears sound.", see: "To take in a picture and work out what it shows.", hear: "To take in sound and work out what it says.", pattern: "Something that repeats or looks alike." }),
  ],
  mini: [
    mc("A microphone is like an...", "Ear", ["Eye", "Nose"], o("It hears.", "A microphone is an ear for a machine.")),
    tf("A machine's camera can sometimes be wrong.", true, o("Nothing is perfect.", "Machines can make mistakes.")),
    mc("What do machines look for in pictures?", "Patterns", ["Treats", "Songs"], o("Things that repeat.", "Machines look for patterns in pictures.")),
  ],
};

const teach = {
  id: "teach", kind: "play", title: "Teaching a computer with examples",
  blocks: [
    H("Stop 1: Learning from examples"),
    SAY("Each photo is an example. A label says cat or dog.", PHOTO(SOFA, "A grey cat on a sofa with a fluffy dog behind it", "Each photo is an example. A label says cat or dog.", "Photo by Tran Mau Tri Tam on Unsplash")),
    SAY("How does a machine learn what a cat looks like? We show it lots of examples. Here are cats and here are dogs. We label each one, which means we say what it is. After many examples, the machine starts to spot the difference. The more good examples, the better it learns. This is called training.", T("To **train** a machine, we show it many **examples** with **labels**.")),
    EXP("Train the machine",
      SS("We show the machine a picture of a cat and say: cat.", S("Example 1: cat.", ["c1", "🐱", 25, 50, 3, "bounce", "cat"])),
      SS("Then a dog, and say: dog.", S("Example 2: dog.", ["c1", "🐱", 20, 50, 2, "none", "cat"], ["d1", "🐶", 50, 50, 3, "bounce", "dog"])),
      SS("Many more examples. After lots of practice, the machine learns the difference.", S("Many examples, then the machine learns.", ["c1", "🐱", 15, 50, 2, "none", "cat"], ["d1", "🐶", 38, 50, 2, "none", "dog"], ["c2", "🐈", 62, 50, 2, "none", "cat"], ["d2", "🐕", 85, 50, 2, "none", "dog"], ["b", "🧠", 50, 20, 2, "pulse"]))),
    CHK(mc("What do we show a machine to teach it?", "Lots of examples", ["A blank page", "Nothing"], o("Think about training.", "We teach machines with many examples.", "ai.learning"))),
    H("Stop 2: Brain game"),
    SAY("Time for a brain game. It is like training your own memory. Match the pairs.", T("Train your own brain! Match the pairs.")),
    BRAIN("memory_match", "Training pairs", "Find the pairs.", ["🐱", "🐶", "🐟", "🐦"]),
    CHK(tf("Showing a machine only one example is enough to teach it well.", false, o("The more the better.", "Machines need many examples.", "ai.learning"))),
    SAY("Let us remember. We teach machines with many labelled examples. The more examples, the better.", SUM("We train a machine with many examples", "Labels tell the machine what each one is")),
    GLOSS({ train: "To teach a machine with many examples.", example: "One case that shows what something is.", label: "A name that tells what something is.", learn: "To get better at something with practice." }),
  ],
  mini: [
    mc("What is a label?", "A name that says what something is", ["A kind of food", "A bug"], o("Like a name tag.", "A label names what something is.")),
    tf("The more examples a machine sees, the better it can learn.", true, o("Think about practice.", "More good examples help.")),
    mc("To teach a machine the difference between cats and dogs, we show it...", "Many labelled pictures", ["One blurry picture", "Nothing at all"], o("Examples with names.", "Many labelled pictures.")),
  ],
};

const useAI = {
  id: "cannot_do", kind: "use", title: "What AI cannot do",
  blocks: [
    H("Stop 1: Clever, but not everything"),
    SAY("AI is good at some things. It can sort photos or spot a word. But AI cannot do everything. It does not feel happy or sad. It cannot truly understand a joke like you do. It does not know right from wrong unless people teach it. And it can make mistakes, so a grown-up should check important answers.", T("AI cannot **feel** things like happiness or sadness.", "AI can make **mistakes**, so we check with a grown-up.")),
    IMG("🤖❓", "AI can be wrong. We always check important things."),
    CHK(mc("What can AI NOT do?", "Feel happy or sad", ["Sort photos", "Spot a word"], o("Think about feelings.", "Only living beings feel emotions.", "ai.limits"))),
    H("Stop 2: Using AI wisely"),
    SAY("Use AI wisely. Ask a grown-up before using it. Never share private things like your name or address with it. And remember, a person is better than a machine for kindness and for hugs. When an answer matters, check with a grown-up or a book.", T("Use AI **wisely**: ask a grown-up first, keep private things private and **check** answers.")),
    SAY("A grown-up can sit with you and help you use AI safely.", IMG("👨‍👩‍👧🤖", "A grown-up helps us use AI safely.")),
    SAY("Time to tell a story about a helpful machine.", ACT("My helper machine", ["Paper and crayons"], ["Draw a machine that could help your family.", "What can it do? What can it NOT do?", "Show your drawing to a grown-up."])),
    REVEAL("Could an AI ever really be your best friend?", "AI can be helpful, but it does not truly care or feel. Real friends and family do."),
    CHK(tf("We should check important AI answers with a grown-up.", true, o("AI can be wrong.", "A grown-up can help check.", "ai.limits"))),
    SAY("Let us remember. AI is useful but it makes mistakes, and it cannot feel. Check with a grown-up.", SUM("AI cannot feel and can make mistakes", "Use it wisely and check with a grown-up")),
    GLOSS({ feel: "To have emotions like happy or sad.", wisely: "In a careful and sensible way.", check: "To make sure something is right.", mistake: "Something that is wrong." }),
  ],
  mini: [
    mc("Who should you ask before using AI?", "A grown-up", ["A stranger", "No one"], o("Someone who looks after you.", "Always ask a grown-up first.")),
    tf("AI always gets the right answer.", false, o("Think about mistakes.", "AI can make mistakes.")),
    mc("Which is something AI cannot truly do?", "Care about you like family", ["Sort pictures", "Play a game"], o("Think about love.", "Only people truly care.")),
  ],
};

const ALTS = [
  [mc("Who writes the programs that make AI work?", "People", ["Clouds", "Frogs"], o("Not alive.", "People write AI programs.", "ai.what")), mc("Who made the computer programs that power AI?", "People", ["Birds", "Rain"], o("Not alive.", "People make AI.", "ai.what"))],
  [tf("A voice helper on a phone uses AI.", true, o("It listens and answers.", "A voice helper uses AI.", "ai.what")), tf("A spade uses AI to dig.", false, o("It is just a tool.", "A spade is not AI.", "ai.what"))],
  [fill("Finish this sentence about AI.", "AI stands for {b1} {b2}.", [["artificial", "apple", "ant"], ["intelligence", "island", "icing"]], o("Two big words.", "AI is artificial intelligence.", "ai.vocab")), fill("Complete the sentence about training.", "We {b1} a machine by showing it many {b2}.", [["train", "bake", "sleep"], ["examples", "ears", "eggs"]], o("Think about practice.", "We train a machine with many examples.", "ai.vocab"))],
  [mc("What is like an eye for a machine?", "A camera", ["A speaker", "A battery"], o("It sees.", "A camera lets a machine see.", "ai.perception")), mc("What is like an ear for a machine?", "A microphone", ["A screen", "A wheel"], o("It hears.", "A microphone is an ear.", "ai.perception"))],
  [ms("Which two do machines use to sense the world? Pick two.", ["A camera", "A microphone"], ["A pencil", "A spoon"], o("Eyes and ears.", "Cameras and microphones sense the world.", "ai.perception")), ms("Pick the two ways a machine learns about the world.", ["Cameras for seeing", "Microphones for hearing"], ["Pillows for sleeping", "Hats for wearing"], o("Eyes and ears.", "Cameras and microphones.", "ai.perception"))],
  [mat("Match each part to what it does for a machine.", [["Camera", "Sees"], ["Microphone", "Hears"], ["Program", "Gives instructions"]], o("Think about eyes and ears.", "Each has its own job.", "ai.perception")), mat("Pair each word with its meaning.", [["Label", "A name for something"], ["Example", "One case that shows"], ["Train", "Teach with many examples"]], o("Think back to the stops.", "Each word has its own meaning.", "ai.vocab"))],
  [tf("Showing a machine many pictures of cats helps it spot a cat.", true, o("Think about training.", "Examples teach the machine.", "ai.learning")), tf("A machine learns best from just one blurry picture.", false, o("More is better.", "It needs many clear examples.", "ai.learning"))],
  [mc("Noor says AI never makes a mistake. Is she right?", "No, AI can be wrong", ["Yes, never", "Only on Sundays"], o("Nothing is perfect.", "AI can make mistakes.", "ai.reason")), mc("Yusuf says we do not need to check AI answers. Is he right?", "No, we should check important answers", ["Yes, never check", "Only on Fridays"], o("Nothing is perfect.", "Check important answers.", "ai.reason"))],
  [sld("A machine is shown 10 pictures of cats. Slide to show how many it was shown.", { min: 0, max: 20 }, 10, 0, o("Read the number.", "It was shown 10 pictures.", "ai.learning")), sld("A machine is shown 8 pictures of dogs. Slide to show how many it was shown.", { min: 0, max: 20 }, 8, 0, o("Read the number.", "It was shown 8 pictures.", "ai.learning"))],
  [hot("Tap the one that is a smart machine.", [["📱", "Voice helper", 22, 50], ["⛏️", "Spade", 50, 50], ["🪑", "Chair", 78, 50]], ["Voice helper"], { labels: true, ...o("It listens and answers.", "A voice helper uses AI.", "ai.what") }), hot("Tap the tool that is NOT AI.", [["📷", "Smart camera", 22, 50], ["🔨", "Hammer", 50, 50], ["📱", "Voice helper", 78, 50]], ["Hammer"], { labels: true, ...o("It has no program.", "A hammer is just a tool.", "ai.what") })],
  [num("A machine sees 7 cat pictures and 4 dog pictures. How many in all?", 11, o("Add 7 and 4.", "7 + 4 = 11.", "ai.learning")), num("A machine sees 8 bird pictures and 5 fish pictures. How many in all?", 13, o("Add 8 and 5.", "8 + 5 = 13.", "ai.learning"))],
  [mc("What should you do before using AI?", "Ask a grown-up", ["Share your address", "Tell it a secret"], o("Someone who looks after you.", "Always ask first.", "ai.safe")), mc("Which is wise when using AI?", "Keep private things private", ["Share your password", "Share your address"], o("Think about what is private.", "Keep private things private.", "ai.safe"))],
  [tf("AI is something alive that eats and sleeps.", false, o("It is a program.", "AI is a computer program.", "ai.what")), tf("AI was made by people.", true, o("People write programs.", "AI is made by people.", "ai.what"))],
  [mc("Lina says a label tells the machine what something is. Is she right?", "Yes, a label names an example", ["No, it is a game", "No, it is a snack"], o("Like a name tag.", "A label names the example.", "ai.reason")), mc("Kamil says labels are not needed to train a machine. Is he right?", "No, labels tell the machine what each one is", ["Yes, never needed", "Only for dogs"], o("Like a name tag.", "Labels name the examples.", "ai.reason"))],
  [ord("Put the steps of machine learning in order.", ["See an example", "Get a label", "Learn the pattern"], o("What comes first?", "See, label, then learn.", "ai.learning")), ord("Put these training steps in order.", ["Collect pictures", "Add labels", "Test the machine"], o("What comes first?", "Collect, label, test.", "ai.learning"))],
];

const qd = (q, sub, depth) => ({ q, sub, depth });
const qa = (q, sub, depth, alts) => ({ q, sub, depth, alts });
const clip = {
  title: "Zainab teaches a machine", backdrop: "classroom", caption: "Zainab teaches a machine to tell cats from dogs.",
  scenes: [
    { caption: "A smart machine.", say: "This machine is a computer program. People made it. It is not alive.",
      items: [{ id: "z", emoji: "👧", label: "Zainab", x: 25, y: 56, size: 3, enter: "walk_right" }, { id: "r", emoji: "🤖", x: 72, y: 50, size: 3, enter: "pop" }] },
    { caption: "Eyes and ears.", say: "A camera is its eye. A microphone is its ear.",
      items: [{ id: "c", emoji: "📷", label: "eye", x: 28, y: 50, size: 3 }, { id: "m", emoji: "🎤", label: "ear", x: 72, y: 50, size: 3 }] },
    { caption: "Examples.", say: "Zainab shows it a cat. She says the label: cat.",
      items: [{ id: "c", emoji: "🐱", label: "cat", x: 50, y: 48, size: 3, enter: "grow" }] },
    { caption: "More examples.", say: "She shows many more, cats and dogs. Each has a label.",
      items: [{ id: "a", emoji: "🐱", label: "cat", x: 25, y: 50, size: 2 }, { id: "b", emoji: "🐶", label: "dog", x: 50, y: 50, size: 2 }, { id: "c", emoji: "🐈", label: "cat", x: 75, y: 50, size: 2 }] },
    { caption: "Learning.", say: "The machine looks for patterns. It starts to spot the difference.",
      items: [{ id: "b", emoji: "🧠", x: 50, y: 45, size: 3, anim: "pulse" }, { id: "s", emoji: "🔍", x: 78, y: 40, size: 2, effect: "sparkle" }] },
    { caption: "A new picture.", say: "Now a new picture. The machine says dog, and it is right!",
      items: [{ id: "d", emoji: "🐕", x: 35, y: 50, size: 3 }, { id: "t", emoji: "✅", label: "dog", x: 72, y: 45, size: 3, anim: "bounce" }] },
    { caption: "A mistake.", say: "Sometimes it gets one wrong. AI can make mistakes.",
      items: [{ id: "q", emoji: "❓", x: 50, y: 40, size: 3, anim: "float" }] },
    { caption: "Ask a grown-up.", say: "So Zainab asks a grown-up to check important answers.",
      items: [{ id: "z", emoji: "👧", x: 30, y: 56, size: 3 }, { id: "m", emoji: "👩", x: 70, y: 52, size: 3, effect: "hearts" }] },
  ],
};

export const topics = [
  topicLesson({
    slug: "data-ai-class-1-smart-machines", subject: "data-ai", cls: 1, topic: 4, title: "Smart Machines",
    summary: "What AI is, how machines see and hear, how we teach a computer with examples, and what AI cannot do.",
    unit: "Topic 4: Smart machines", difficulty: 1,
    objectives: ["Say what AI is and what it is not", "Explain how a machine can see, hear and learn from examples", "Know that AI can make mistakes and cannot feel"],
    success_criteria: ["I can say what AI is", "I can say how we teach a machine", "I know AI can be wrong"],
    real_life: "Voice helpers, photo apps and games that seem clever on the family phone.",
    standards: [
      { framework: "ai4k12", code: "Big Idea 1", text: "Perception: computers perceive the world using sensors" },
      { framework: "ai4k12", code: "Big Idea 3", text: "Learning: computers can learn from data" },
      { framework: "ai4k12", code: "Big Idea 5", text: "Societal impact: AI can impact the world in positive and negative ways" },
    ],
    warm_up: [
      mc("Which is an input?", "A keyboard", ["A speaker", "A screen"], o("We type on it.", "A keyboard is an input.")),
      tf("We should tell a grown-up if something online worries us.", true, o("Who can help?", "A grown-up can help.")),
      num("What is 3 + 4?", 7, o("Count on from 3.", "3 and 4 make 7.")),
    ],
    intro: [],
    subs: [whatIsAI, seeHear, teach, useAI],
    clip,
    quiz: [
      qd(mc("Who creates the computer programs that make AI work?", "People", ["Clouds", "Frogs"], o("Not alive.", "People write AI programs.", "ai.what")), "what_is_ai", "recall"),
      qd(tf("A phone voice helper uses AI.", true, o("It listens and answers.", "A voice helper uses AI.", "ai.what")), "what_is_ai", "recall"),
      qd(fill("Complete this sentence about AI.", "AI stands for {b1} {b2}.", [["artificial", "apple", "ant"], ["intelligence", "island", "icing"]], o("Two big words.", "AI is artificial intelligence.", "ai.vocab")), "what_is_ai", "recall"),
      qd(mc("What works like an eye for a machine?", "A camera", ["A speaker", "A battery"], o("It sees.", "A camera lets a machine see.", "ai.perception")), "see_hear", "recall"),
      qd(ms("Which two help a machine sense the world? Pick two.", ["A camera", "A microphone"], ["A pencil", "A spoon"], o("Eyes and ears.", "Cameras and microphones sense the world.", "ai.perception")), "see_hear", "apply"),
      qd(mat("Match each part to its job.", [["Camera", "Sees"], ["Microphone", "Hears"], ["Program", "Gives instructions"]], o("Think about eyes and ears.", "Each has its own job.", "ai.perception")), "see_hear", "apply"),
      qd(tf("A machine can learn the difference between cats and dogs from examples.", true, o("Think about training.", "Examples teach the machine.", "ai.learning")), "teach", "apply"),
      qd(mc("Samira says AI never makes a mistake. Is she right?", "No, AI can be wrong", ["Yes, never", "Only on Sundays"], o("Nothing is perfect.", "AI can make mistakes.", "ai.reason")), "cannot_do", "reason"),
      qd(sld("A machine is shown 12 pictures of birds. Slide to show how many it was shown.", { min: 0, max: 20 }, 12, 0, o("Read the number.", "It was shown 12 pictures.", "ai.learning")), "teach", "apply"),
      qd(hot("Tap the machine that uses AI.", [["📱", "Voice helper", 22, 50], ["⛏️", "Spade", 50, 50], ["🪑", "Chair", 78, 50]], ["Voice helper"], { labels: true, ...o("It listens and answers.", "A voice helper uses AI.", "ai.what") }), "what_is_ai", "apply"),
      qd(num("A machine sees 6 cat pictures and 5 dog pictures. How many pictures is that in all?", 11, o("Add 6 and 5.", "6 + 5 = 11.", "ai.learning")), "teach", "apply"),
      qd(mc("What is the wise thing to do before using AI?", "Ask a grown-up", ["Share your address", "Tell it a secret"], o("Someone who looks after you.", "Always ask first.", "ai.safe")), "cannot_do", "reason"),
      qd(tf("AI is a living animal.", false, o("It is a program.", "AI is a computer program.", "ai.what")), "what_is_ai", "recall"),
      qd(mc("Lina says a label tells a machine what an example is. Is she right?", "Yes, a label names an example", ["No, it is a game", "No, it is a snack"], o("Like a name tag.", "A label names the example.", "ai.reason")), "teach", "reason"),
      qd(ord("Put these in the order a machine learns.", ["See an example", "Get a label", "Learn the pattern"], o("What comes first?", "See, label, then learn.", "ai.learning")), "teach", "reason"),
      // ----- upgrade: 15 new mains (q16-q30), 1 variant each
      qa(fill("Finish the sentences about senses.", "A {b1} is like an eye for a machine, and a {b2} is like an ear.", [["camera", "spade", "cup"], ["microphone", "pencil", "shoe"]], o("Think about eyes and ears.", "A camera sees and a microphone hears.", "ai.perception")), "see_hear", "apply",
        [fill("Complete the sentences about mistakes.", "A machine finds {b1} in pictures. It can still make a {b2}.", [["patterns", "pillows", "pears"], ["mistake", "lunch", "hat"]], o("Nothing is perfect.", "Machines look for patterns and can still make mistakes.", "ai.perception"))]),
      qa(ms("Which two might use AI? Pick two.", ["A voice helper", "A robot vacuum"], ["A wooden spoon", "A bicycle"], o("Which have a computer inside?", "A voice helper and a robot vacuum use programs.", "ai.what")), "what_is_ai", "apply",
        [ms("Which two use a camera to see? Pick two.", ["A phone face finder", "A smart doorbell"], ["A paper plate", "A shoe"], o("Which have cameras?", "A phone face finder and a smart doorbell use cameras.", "ai.perception"))]),
      qa(mat("Match each sense to a machine part.", [["Seeing", "Camera"], ["Hearing", "Microphone"], ["Touching", "Touch sensor"]], o("Think about what each part does.", "Each part helps a machine sense the world.", "ai.perception")), "see_hear", "apply",
        [mat("Match each word to its meaning.", [["Mistake", "Something wrong"], ["Example", "One case that shows"], ["Label", "A name for an example"]], o("Think back to the stops.", "Each word has its own meaning.", "ai.vocab"))]),
      qa(sld("A machine needs 20 examples to learn a fruit. It has seen 12. Slide to show how many more it needs.", { min: 0, max: 20 }, 8, 0, o("20 take away 12.", "20 - 12 = 8 more examples.", "ai.learning")), "teach", "apply",
        [sld("A machine needs 15 examples to learn a bird. It has seen 9. Slide to show how many more it needs.", { min: 0, max: 20 }, 6, 0, o("15 take away 9.", "15 - 9 = 6 more examples.", "ai.learning"))]),
      qa(hot("Tap the part that hears for a machine.", [["🎤", "Microphone", 22, 50], ["📷", "Camera", 50, 50], ["🔋", "Battery", 78, 50]], ["Microphone"], { labels: true, ...o("It is like an ear.", "A microphone hears for a machine.", "ai.perception") }), "see_hear", "recall",
        [hot("Tap the part that sees for a machine.", [["🎤", "Microphone", 22, 50], ["📷", "Camera", 50, 50], ["🔋", "Battery", 78, 50]], ["Camera"], { labels: true, ...o("It is like an eye.", "A camera sees for a machine.", "ai.perception") })]),
      qa(num("A machine learns from 9 apple pictures and 6 mango pictures. How many pictures is that?", 15, o("Add 9 and 6.", "9 + 6 = 15.", "ai.learning")), "teach", "apply",
        [num("A machine learns from 12 plum pictures and 6 grape pictures. How many pictures is that?", 18, o("Add 12 and 6.", "12 + 6 = 18.", "ai.learning"))]),
      qa(ord("Put the steps in order for teaching a machine about fruit.", ["Show many fruit pictures", "Add a label to each", "Test it with a new picture"], o("What first?", "Show, label, then test.", "ai.learning")), "teach", "apply",
        [ord("Put these in order for checking an AI answer.", ["Hear the answer", "Ask a grown-up", "Check in a book"], o("What first?", "Hear it, ask, then check.", "ai.safe"))]),
      qa(mc("Hana says her smart speaker is alive. Is she right?", "No. It is a computer program made by people", ["Yes, it is a pet", "Yes, it eats"], o("Is it a living thing?", "A smart speaker runs a program. It is not alive.", "ai.reason")), "what_is_ai", "reason",
        [mc("Omar says his toy robot is alive because it moves. Is he right?", "No. It follows a program people wrote", ["Yes, it moves like a pet", "Yes, it is hungry"], o("Does it need food and sleep?", "A toy robot follows a program. It is not alive.", "ai.reason"))]),
      qa(mc("Sam says if a picture looks real, it must be real. Is he right?", "No. A picture can be made by a computer, so ask a grown-up", ["Yes, pictures never lie", "Yes, if it is clear"], o("Can computers make pictures?", "Pictures can be changed or made up.", "ai.reason")), "cannot_do", "reason",
        [mc("Aisha says a photo on a screen is always true. Is she right?", "No. Photos can be changed or made by computers", ["Yes, screens only show true things", "Yes, if it is colourful"], o("Can computers make pictures?", "Photos can be changed or made up.", "ai.reason"))]),
      qa(mc("Zainab shows a machine only 2 cat pictures. Omar says it now knows every cat. Is he right?", "No. It needs many different examples", ["Yes, 2 is plenty", "Yes, cats all look the same"], o("Do all cats look alike?", "A machine learns better from many different examples.", "ai.reason")), "teach", "reason",
        [mc("Layla says one picture is enough to teach a machine. Is she right?", "No. It needs many examples to learn well", ["Yes, one is enough", "Yes, if it is big"], o("Think about practice.", "More examples help a machine learn.", "ai.reason"))]),
      qa(mc("Ben says a camera sees like a person. Is he right?", "No. It records dots of colour and looks for patterns", ["Yes, it understands everything", "Yes, it feels what it sees"], o("What is a picture made of?", "A camera records dots of colour. A program looks for patterns.", "ai.reason")), "see_hear", "reason",
        [mc("Mina says a microphone understands words like a friend. Is she right?", "No. It listens for patterns in sound and can make mistakes", ["Yes, it understands feelings", "Yes, it never gets it wrong"], o("Does a microphone have feelings?", "It listens for patterns and can get words wrong.", "ai.reason"))]),
      qa(mc("Who made the AI in a voice helper?", "People who wrote the program", ["The helper itself", "The clouds"], o("Who writes programs?", "People write the programs for AI.", "ai.what")), "what_is_ai", "recall",
        [mc("Where does an AI get its clever skills?", "From people and many examples", ["From magic", "From sleeping"], o("Think about training.", "People write programs and give examples.", "ai.what"))]),
      qa(mc("A voice helper gives an answer that seems wrong. What should you do?", "Ask a grown-up to check", ["Believe it", "Tell it your address"], o("AI can make mistakes.", "Check answers that seem wrong with a grown-up.", "ai.safe")), "cannot_do", "apply",
        [mc("An AI gave a strange answer. What is the best next step?", "Check with a book or a grown-up", ["Trust it more", "Ignore everyone"], o("AI can make mistakes.", "Check strange answers.", "ai.safe"))]),
      qa(mc("We show a machine pictures that say cat or not cat. What are these pictures called?", "Examples", ["Snacks", "Bugs"], o("They teach the machine.", "Pictures that teach a machine are examples.", "ai.learning")), "teach", "recall",
        [mc("What do we call the word that says what a picture shows?", "A label", ["A snack", "A bug"], o("Like a name tag.", "A label names what a picture shows.", "ai.learning"))]),
      qa(tf("A smart speaker can feel happy or sad.", false, o("Is it alive?", "A speaker is a program. It cannot feel.", "ai.limits")), "cannot_do", "recall",
        [tf("A computer program can be wrong.", true, o("Nothing is perfect.", "Programs can make mistakes.", "ai.limits"))]),
    ].map((x, i) => (x.alts ? x : { ...x, alts: ALTS[i] })),
  }),
];
