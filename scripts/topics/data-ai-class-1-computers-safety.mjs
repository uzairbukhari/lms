import { SAY, SS, H, T, IMG, REVEAL, ACT, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld, PHOTO } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Computer Science, Data & AI, Class 1 (Zainab, age 7), topic 3: Computers and staying safe.
// Standards: NC KS1 uses of IT and e-safety, CSTA 1A computing systems, networks and impacts, CAM 2Pe.01 (docs/CURRICULUM_V2.md).
const o = (hint, why, tag) => ({ hint, why, tag });

const LOCK = "data-ai-class-1-computers-safety-1-a38b89b8.jpg";
const SOCKET = "data-ai-class-1-computers-safety-2-6afe4bdc.jpg";

const inOut = {
  id: "in_out", kind: "learn", title: "Inside a computer: in and out",
  blocks: [
    H("Welcome back, computer explorer!"),
    SAY("Today we learn how computers work and how to stay safe.", T("Today's big question: how do we use computers safely?")),
    SAY("A padlock keeps things safe. A password does the same job for us.", PHOTO(LOCK, "A combination padlock resting on a computer keyboard", "A padlock keeps things safe, like a password.", "Photo by Sasun Bughdaryan on Unsplash")),
    H("Stop 1: How we talk to a computer"),
    SAY("A computer is a machine that follows instructions. But how do we tell it what to do? We use things called inputs. A keyboard is an input. A mouse is an input. A touch screen is an input too. We put information in. The computer thinks, and then it gives us an answer. That answer is called an output.", T("An **input** is how we tell a computer something.", "An **output** is how the computer tells us something.")),
    EXP("In, think, out",
      SS("First, an input. We press a key on the keyboard.", S("Input: a keyboard.", ["k", "⌨️", 18, 55, 3, "bounce"])),
      SS("The computer receives it and works on it. This is the thinking part.", S("The computer works it out.", ["k", "⌨️", 18, 55, 3], ["c", "💻", 50, 55, 3, "pulse"], ["a", "➡️", 34, 55, 2, "none"])),
      SS("Then comes the output. The screen shows the answer, and the speaker plays a sound.", S("Output: a screen and a speaker.", ["k", "⌨️", 18, 55, 3], ["c", "💻", 50, 55, 3], ["a", "➡️", 34, 55, 2], ["b", "➡️", 66, 55, 2], ["s", "🖥️", 82, 40, 2, "bounce"], ["sp", "🔊", 82, 70, 2, "bounce"]))),
    CHK(mc("Which one is an input?", "A keyboard", ["A speaker", "A screen"], o("Do we type on it?", "We use a keyboard to put information in.", "cs.in_out"))),
    H("Stop 2: Many kinds of computers"),
    SAY("Computers come in many shapes. A tablet is a computer. A phone is a computer. A laptop is a computer. Even a washing machine and a car have tiny computers inside. They all take inputs, think, and give outputs.", T("A **tablet**, a **laptop** and a phone are all computers.", "Even a washing machine has a tiny computer inside.")),
    IMG("📱💻🖥️🚗", "A phone, a laptop, a desktop and a car all use computers."),
    CHK(tf("A screen is an output because it shows us information.", true, o("Does it show or tell us?", "A screen shows us things, so it is an output.", "cs.in_out"))),
    SAY("Let us remember. Inputs tell the computer. Outputs tell us. Computers come in many shapes.", SUM("An input tells the computer something", "An output tells us something", "Computers come in many shapes")),
    GLOSS({ trusted: "Someone you know well who looks after you.", input: "How we put information into a computer.", output: "How a computer gives us information.", tablet: "A flat touch-screen computer.", laptop: "A small computer you can carry.", computer: "A machine that follows instructions." }),
  ],
  mini: [
    mc("Which is an output?", "A speaker", ["A mouse", "A keyboard"], o("Does it give us something?", "A speaker plays sound to us.")),
    tf("A mouse is an input.", true, o("We click it to tell the computer.", "A mouse tells the computer what to do.")),
    mc("A touch screen is...", "Both an input and an output", ["Only a speaker", "Only a battery"], o("We touch it and it shows pictures.", "We touch it (input) and it shows things (output).")),
    mc("What does a computer do with the instructions we give it?", "Follows them", ["Ignores them", "Eats them"], o("Think about the robot.", "A computer follows instructions.")),
  ],
};

const useWell = {
  id: "use_well", kind: "try", title: "Sort the devices and use them well",
  blocks: [
    H("Stop 1: Inputs and outputs sort"),
    SAY("Let us sort some everyday things. Some of them put information in, which are inputs. Others give information out, which are outputs. A microphone is an input because it hears you. A speaker is an output because it plays sound to you. Time to try it yourself at home.", T("Sort the machines into **inputs** and **outputs**.")),
    EXP("Input or output?",
      SS("A microphone hears your voice. That is an input.", S("Microphone: input.", ["bx", { kind: "sorting_boxes", labels: ["Input", "Output"] }, 50, 70, 3], ["m", "🎤", 28, 62, 2, "bounce"])),
      SS("A speaker plays sound to you. That is an output.", S("Speaker: output.", ["bx", { kind: "sorting_boxes", labels: ["Input", "Output"] }, 50, 70, 3], ["m", "🎤", 28, 62, 2], ["sp", "🔊", 72, 62, 2, "bounce"])),
      SS("A mouse is an input and a printer is an output.", S("Mouse: input. Printer: output.", ["bx", { kind: "sorting_boxes", labels: ["Input", "Output"] }, 50, 70, 3], ["m", "🎤", 22, 62, 2], ["mo", "🖱️", 38, 62, 2, "bounce"], ["sp", "🔊", 64, 62, 2], ["pr", "🖨️", 80, 62, 2, "bounce"]))),
    SAY("Let us be device detectives at home.", ACT("Device detectives", ["A grown-up", "Paper and pencil"], ["Look around your home for things with a screen or buttons.", "Write down three inputs and three outputs.", "Show your list to a grown-up."])),
    CHK(mc("A printer puts words on paper. It is an...", "Output", ["Input", "Insect"], o("Does it give us something?", "A printer gives us something, so it is an output.", "cs.in_out"))),
    H("Stop 2: Using devices well and being safe with electricity"),
    SAY("This is a wall socket. Never touch it. Ask a grown-up.", PHOTO(SOCKET, "A white wall socket on a blue wall", "A wall socket. Never touch it. Ask a grown-up.", "Photo by Gleb Paniotov on Unsplash")),
    SAY("Devices are fun, but we should use them well. Take breaks, sit up straight and keep the screen at a good distance. Remember to keep your eyes healthy. And electricity is powerful. Never put fingers or things into plug sockets. Never touch plugs with wet hands. Always ask a grown-up to help with plugs and cables.", T("Use devices well: take **breaks**.", "Be safe with **electricity**: never touch sockets and ask a grown-up.")),
    IMG("🔌⚠️", "Never poke things in a plug socket. Ask a grown-up."),
    CHK(tf("It is safe to put a finger in a plug socket.", false, o("Electricity is powerful.", "Never touch sockets. Ask a grown-up.", "cs.electricity"))),
    SAY("Let us remember. Sort inputs and outputs. Take breaks from screens. Keep safe with electricity.", SUM("Inputs go in, outputs come out", "Take breaks from screens", "Never touch plug sockets")),
    GLOSS({ breaks: "Short rests from a screen.", electricity: "Power that makes machines work. It can hurt if we touch it wrongly.", socket: "The holes in the wall where plugs go in.", inputs: "Ways of putting information into a computer.", outputs: "Ways a computer gives information to us.", microphone: "A device that hears sound.", printer: "A machine that puts words on paper." }),
  ],
  mini: [
    mc("A microphone is an...", "Input", ["Output", "Egg"], o("It hears you.", "It takes your voice in, so it is an input.")),
    tf("We should take breaks from screens.", true, o("Rest your eyes.", "Breaks keep our eyes and bodies healthy.")),
    mc("Who should help you with plugs and cables?", "A grown-up", ["A toy", "No one"], o("Electricity is powerful.", "Ask a grown-up to help with plugs.")),
  ],
};

const play = {
  id: "safe_game", kind: "play", title: "Safe or not safe?",
  blocks: [
    H("Stop 1: Spot the safe choice"),
    SAY("Let us play a game. For each picture, decide if it is a safe choice or not. Think about electricity and screens. Here is the first one: a child asks a grown-up before using a plug. Is that safe? Yes! Asking a grown-up is always a good idea.", T("Is it **safe** or **not safe**? Ask a grown-up when you are not sure.")),
    IMG("🙋‍♀️🔌", "Asking a grown-up before using a plug is a safe choice."),
    SAY("Look at the three choices and think about which one is safe.", IMG("✅🔌", "A safe choice keeps you away from danger.")),
    CHK(mc("Which is the safe choice?", "Asking a grown-up to plug in the charger", ["Pulling the plug by its wire", "Using a plug with wet hands"], o("Ask first.", "A grown-up knows how to plug in safely.", "cs.electricity"))),
    H("Stop 2: Brain game"),
    SAY("Warm up your brain with a memory game. Match the pairs of safe things.", T("Play the memory game to find the pairs.")),
    SAY("Find the matching pairs. Take your time and keep your eyes sharp.", BRAIN("memory_match", "Safe things", "Find the pairs.", ["🔌", "🛑", "🙋", "💡"])),
    CHK(tf("If you see a wire that looks broken, you should tell a grown-up.", true, o("A broken wire is not safe.", "A grown-up can fix it safely.", "cs.electricity"))),
    SAY("Let us remember. When we are not sure, we stop and ask a grown-up.", SUM("Ask a grown-up when you are not sure", "Keep away from sockets and broken wires")),
    GLOSS({ safe: "Not likely to hurt you.", wire: "A thin cable that carries electricity.", charger: "A cable that gives a device more power." }),
  ],
  mini: [
    mc("You see a loose wire. What should you do?", "Tell a grown-up", ["Touch it", "Pull it"], o("Do not touch it.", "A grown-up can fix it safely.")),
    tf("Wet hands and plugs are a safe mix.", false, o("Water and electricity do not mix.", "Never touch plugs with wet hands.")),
    mc("A phone charger is for...", "Giving a device power", ["Playing football", "Drawing pictures"], o("Batteries run out.", "A charger gives power back to a device.")),
  ],
};

const kindOnline = {
  id: "online", kind: "use", title: "Private information and being kind online",
  blocks: [
    H("Stop 1: Keep private things private"),
    SAY("Some information is private. Private means only for you and your family. Your full name, your address, your school, and your passwords are all private. We never share them online. A password is like a secret key. If you share it, someone else might get in. Only share a password with your parent.", T("**Private** information is just for you and your family. A **password** is a secret key.")),
    IMG("🔑🔒", "A password is like a secret key. Keep it private."),
    CHK(mc("Which is private information we should NOT share online?", "Our home address", ["Our favourite colour", "A funny joke"], o("Think about where you live.", "Addresses and passwords are private.", "cs.private"))),
    H("Stop 2: Being kind online"),
    SAY("Being kind online is just like being kind in real life. We say please and thank you. We write friendly messages. If someone is unkind, tell a grown-up straight away. Do the same if you feel worried. You will not be in trouble.", T("Be **kind** online. If something worries you, **tell a grown-up**.")),
    SAY("Kind messages make people smile, online and in real life.", IMG("💬❤️", "Kind messages make people smile.")),
    SAY("Time to think about a kind message.", ACT("Kind message card", ["Paper and crayons"], ["Draw a card with a kind message for a friend.", "Ask a grown-up to help you send it.", "How did your friend feel?"])),
    REVEAL("What should you do if someone online is unkind to you?", "Tell a grown-up straight away. It is not your fault."),
    CHK(tf("If something online makes you worried, you should tell a grown-up.", true, o("Who can help?", "A grown-up can help you stay safe.", "cs.kind"))),
    SAY("Let us remember. Keep private things private. Be kind online. Tell a grown-up if you are worried.", SUM("Keep passwords and addresses private", "Be kind online", "Tell a grown-up if you are worried")),
    GLOSS({ "tell a grown-up": "Say what worries you to a parent or teacher so they can help.", private: "Just for you and your family.", password: "A secret code that lets only you in.", kind: "Friendly and caring.", online: "Using the internet." }),
  ],
  mini: [
    mc("Who can you share a password with?", "A parent", ["A stranger", "Everyone online"], o("Who looks after you?", "Only share it with a parent.")),
    tf("We should be kind online, just like in real life.", true, o("Kindness is always good.", "Be kind everywhere.")),
    mc("A stranger online asks where you live. What do you do?", "Tell a grown-up and do not answer", ["Tell them", "Send a photo"], o("Do not share private things.", "Never share your address. Tell a grown-up.")),
  ],
};

const ALTS = [
  [mc("Which of these is an input?", "A mouse", ["A printer", "A speaker"], o("Do we click it?", "A mouse tells the computer what to do.", "cs.in_out")), mc("Which one do we use to put words into a computer?", "A keyboard", ["A speaker", "A screen"], o("Do we type on it?", "A keyboard is an input.", "cs.in_out"))],
  [mc("Which one shows us pictures from the computer?", "A screen", ["A mouse", "A microphone"], o("It is an output.", "A screen is an output.", "cs.in_out")), mc("Which one plays sounds for us?", "A speaker", ["A keyboard", "A mouse"], o("It is an output.", "A speaker plays sound to us.", "cs.in_out"))],
  [tf("A microphone is an input because it hears your voice.", true, o("It takes information in.", "A microphone takes your voice in.", "cs.in_out")), tf("A printer is an input.", false, o("Does it give us something?", "A printer gives us paper, so it is an output.", "cs.in_out"))],
  [fill("Complete this sentence about computers.", "We tell a computer things with an {b1} and it tells us things with an {b2}.", [["input", "egg", "arm"], ["output", "ocean", "orange"]], o("Think back to in and out.", "Input in, output out.", "cs.vocab")), fill("Complete this sentence about devices.", "A {b1} is a computer you can carry, and it has a {b2}.", [["laptop", "wheel", "spoon"], ["screen", "tail", "leaf"]], o("Think about a laptop.", "A laptop is a computer you can carry.", "cs.vocab"))],
  [ms("Which two let us tell a computer something?", ["A keyboard", "A mouse"], ["A speaker", "A printer"], o("We tell the computer with them.", "A keyboard and mouse are inputs.", "cs.in_out")), ms("Which are outputs? Pick two.", ["A speaker", "A screen"], ["A mouse", "A microphone"], o("They give us something.", "A speaker and a screen are outputs.", "cs.in_out"))],
  [mat("Match each machine to its job.", [["Keyboard", "Input"], ["Speaker", "Output"], ["Mouse", "Input"]], o("Think about which way the information flows.", "Keyboard and mouse put information in. A speaker gives it out.", "cs.in_out")), mat("Sort each device by its job.", [["Microphone", "Input"], ["Printer", "Output"], ["Touch pad", "Input"]], o("Which way does the information go?", "A microphone and touch pad are inputs. A printer is an output.", "cs.in_out"))],
  [tf("It is fine to pull a plug out by the wire.", false, o("Be gentle with plugs.", "Ask a grown-up and pull the plug itself.", "cs.electricity")), tf("You should keep your hands dry around plugs.", true, o("Think about water.", "Dry hands keep us safe from electricity.", "cs.electricity"))],
  [mc("Leyla says the computer decides what to do on its own. Is she right?", "No, it follows our instructions", ["Yes, it decides everything", "Only at night"], o("Think back to the robot.", "Computers follow instructions.", "cs.reason")), mc("Ibrahim says a computer cannot do anything without instructions. Is he right?", "Yes, it needs instructions", ["No, it knows everything", "Only for games"], o("Think back to the robot.", "Computers follow instructions.", "cs.reason"))],
  [sld("Slide to show how many inputs are on this list: keyboard, mouse, microphone.", { min: 0, max: 6 }, 3, 0, o("Count each one.", "All three are inputs.", "cs.in_out")), sld("Slide to show how many outputs are on this list: screen, speaker, printer.", { min: 0, max: 6 }, 3, 0, o("Count each one.", "All three are outputs.", "cs.in_out"))],
  [hot("Tap the output.", [["🔊", "Speaker", 22, 50], ["⌨️", "Keyboard", 50, 50], ["🖱️", "Mouse", 78, 50]], ["Speaker"], { labels: true, ...o("It gives us sound.", "A speaker is an output.", "cs.in_out") }), hot("Tap the input.", [["🎤", "Microphone", 22, 50], ["🖨️", "Printer", 50, 50], ["🖥️", "Screen", 78, 50]], ["Microphone"], { labels: true, ...o("It hears us.", "A microphone is an input.", "cs.in_out") })],
  [mc("Which of these is private?", "Our password", ["Our favourite food", "The weather"], o("A secret key.", "Passwords are private.", "cs.private")), mc("Which is private?", "Our home address", ["A funny joke", "The colour blue"], o("Where we live.", "Addresses are private.", "cs.private"))],
  [num("You use a screen for 20 minutes. Then you take a break. How many minutes before the break?", 20, o("Look at the number.", "20 minutes before the break.", "cs.devices")), num("You play a game for 15 minutes, then take a break. How many minutes before the break?", 15, o("Look at the number.", "15 minutes before the break.", "cs.devices"))],
  [tf("It is okay to tell a stranger online your home address.", false, o("Is an address private?", "Never share your address.", "cs.private")), tf("We should never share our school name with strangers online.", true, o("Is it private?", "Keep private things private.", "cs.private"))],
  [mc("Aisha says she should hide it if something online worries her. Is that right?", "No, she should tell a grown-up", ["Yes, hide it", "Yes, post about it"], o("Who can help?", "A grown-up can help her.", "cs.reason")), mc("Zayd says he does not need to tell anyone if someone is unkind online. Is he right?", "No, he should tell a grown-up", ["Yes, say nothing", "Yes, be unkind back"], o("Who can help?", "Tell a grown-up.", "cs.reason"))],
  [ord("Put these kind-message jobs in order.", ["Think of something kind", "Write the message", "Ask a grown-up to help send it"], o("What comes first?", "Think, write, then send with a grown-up.", "cs.kind")), ord("Put these safe-electricity steps in order.", ["See the charger", "Ask a grown-up", "Plug it in together"], o("What comes first?", "See it, ask, then plug in together.", "cs.electricity"))],
];

const qd = (q, sub, depth) => ({ q, sub, depth });
const qa = (q, sub, depth, alts) => ({ q, sub, depth, alts });
const clip = {
  title: "Zainab stays safe", backdrop: "home", caption: "Zainab uses the tablet safely and kindly.",
  scenes: [
    { caption: "A tablet.", say: "Zainab uses the family tablet. A touch screen is input and output.",
      items: [{ id: "z", emoji: "👧", label: "Zainab", x: 25, y: 56, size: 3, enter: "walk_right" }, { id: "t", emoji: "📱", x: 72, y: 50, size: 3, enter: "pop" }] },
    { caption: "Input and output.", say: "The keyboard is an input. The speaker is an output.",
      items: [{ id: "k", emoji: "⌨️", label: "input", x: 28, y: 50, size: 3 }, { id: "s", emoji: "🔊", label: "output", x: 72, y: 50, size: 3, anim: "pulse" }] },
    { caption: "A break.", say: "After twenty minutes, Zainab takes a break. Her eyes need a rest.",
      items: [{ id: "c", emoji: "⏰", label: "20 minutes", x: 35, y: 48, size: 3 }, { id: "e", emoji: "👀", x: 70, y: 48, size: 3, effect: "sparkle" }] },
    { caption: "A password.", say: "Her password is a secret key. Only Mum knows it.",
      items: [{ id: "k", emoji: "🔑", label: "password", x: 35, y: 48, size: 3, effect: "glow" }, { id: "m", emoji: "👩", label: "Mum", x: 72, y: 52, size: 3 }] },
    { caption: "A stranger.", say: "A stranger in a game asks where she lives. She does not answer.",
      items: [{ id: "q", emoji: "❓", x: 35, y: 45, size: 3, anim: "float" }, { id: "n", emoji: "🚫", x: 72, y: 50, size: 3, enter: "pop" }] },
    { caption: "Tell a grown-up.", say: "She tells Mum straight away. Telling is always right.",
      items: [{ id: "z", emoji: "👧", x: 30, y: 56, size: 3 }, { id: "m", emoji: "👩", x: 70, y: 52, size: 3, effect: "hearts" }] },
    { caption: "A kind message.", say: "Then she sends Nani a kind message with Mum's help.",
      items: [{ id: "m", emoji: "💬", x: 35, y: 45, size: 3, enter: "slide_right" }, { id: "h", emoji: "❤️", x: 72, y: 45, size: 3, anim: "bounce" }] },
    { caption: "Plugs.", say: "Plugs are for grown-ups. Zainab never touches sockets.",
      items: [{ id: "p", emoji: "🔌", x: 35, y: 50, size: 3 }, { id: "n", emoji: "🚫", x: 72, y: 50, size: 3 }] },
  ],
};

export const topics = [
  topicLesson({
    slug: "data-ai-class-1-computers-safety", subject: "data-ai", cls: 1, topic: 3, title: "Computers and Staying Safe",
    summary: "Inputs and outputs, using devices well, electricity safety, private information and being kind online.",
    unit: "Topic 3: Computers and staying safe", difficulty: 1,
    objectives: ["Say what inputs and outputs are", "Use devices and electricity safely", "Keep private things private and be kind online"],
    success_criteria: ["I can name an input and an output", "I know what to do if something online worries me", "I know how to stay safe with plugs"],
    real_life: "Using the family tablet, charging a phone and chatting with relatives online.",
    standards: [
      { framework: "nc_england", code: "KS1 uses of IT", text: "Recognise common uses of information technology; use technology safely and respectfully, keeping personal information private" },
      { framework: "csta", code: "1A-CS-01", text: "Select and operate appropriate software and hardware to perform a variety of tasks" },
      { framework: "csta", code: "1A-NI-04", text: "Explain why we keep information private, such as passwords" },
      { framework: "csta", code: "1A-IC-16", text: "Compare how people live and work before and after the adoption of computing technologies" },
      { framework: "cambridge", code: "2Pe.01" },
    ],
    warm_up: [
      mc("What do we call a list of clear steps in order?", "An algorithm", ["A star", "A bug"], o("Think about robots.", "A list of steps is an algorithm.")),
      mc("Which graph uses a picture for every vote?", "A pictogram", ["A tally", "A table"], o("Pictures.", "A pictogram uses pictures.")),
      num("What is 10 - 4?", 6, o("Count back from 10.", "10 take away 4 is 6.")),
    ],
    intro: [],
    subs: [inOut, useWell, play, kindOnline],
    clip,
    quiz: [
      qd(mc("Which one of these lets us tell a computer something?", "A touch pad", ["A speaker", "A printer"], o("We tell the computer with it.", "A touch pad is an input.", "cs.in_out")), "in_out", "recall"),
      qd(mc("Which one shows us words and pictures from the computer?", "A screen", ["A mouse", "A microphone"], o("It is an output.", "A screen is an output.", "cs.in_out")), "in_out", "recall"),
      qd(tf("A speaker is an input because it hears you.", false, o("Does it hear you or play to you?", "A speaker plays sound, so it is an output.", "cs.in_out")), "in_out", "recall"),
      qd(fill("Complete this sentence about input and output.", "We use an {b1} to put information in, and an {b2} to get it out.", [["input", "egg", "arm"], ["output", "ocean", "orange"]], o("Think back to in and out.", "Input in, output out.", "cs.vocab")), "in_out", "recall"),
      qd(ms("Which are inputs? Pick two.", ["A keyboard", "A microphone"], ["A speaker", "A printer"], o("We tell the computer with them.", "A keyboard and microphone are inputs.", "cs.in_out")), "use_well", "apply"),
      qd(mat("Match each device to input or output.", [["Keyboard", "Input"], ["Speaker", "Output"], ["Mouse", "Input"]], o("Think about which way the information flows.", "Keyboard and mouse are inputs. A speaker is an output.", "cs.in_out")), "use_well", "apply"),
      qd(tf("Pulling a plug out by its wire is the safest way.", false, o("Be gentle with plugs.", "Ask a grown-up and pull the plug itself.", "cs.electricity")), "safe_game", "reason"),
      qd(mc("Sana says the computer decides everything on its own. Is she right?", "No, it follows our instructions", ["Yes, it decides everything", "Only at night"], o("Think back to the robot.", "Computers follow instructions.", "cs.reason")), "in_out", "reason"),
      qd(sld("Slide to show how many inputs are in this list: keyboard, mouse, microphone, camera.", { min: 0, max: 6 }, 4, 0, o("Count each one.", "All four are inputs.", "cs.in_out")), "use_well", "apply"),
      qd(hot("Tap the picture of the output.", [["🔊", "Speaker", 22, 50], ["⌨️", "Keyboard", 50, 50], ["🖱️", "Mouse", 78, 50]], ["Speaker"], { labels: true, ...o("It gives us sound.", "A speaker is an output.", "cs.in_out") }), "in_out", "apply"),
      qd(mc("Which of these is private information?", "Our password", ["Our favourite food", "The weather"], o("A secret key.", "Passwords are private.", "cs.private")), "online", "reason"),
      qd(num("You play a game for 25 minutes, then take a break. How many minutes before the break?", 25, o("Look at the number.", "25 minutes before the break.", "cs.devices")), "use_well", "apply"),
      qd(tf("It is fine to tell a stranger online where you live.", false, o("Is an address private?", "Never share your address.", "cs.private")), "online", "recall"),
      qd(mc("Hana says if something online worries her she should hide it. Is she right?", "No, she should tell a grown-up", ["Yes, hide it", "Yes, post about it"], o("Who can help?", "A grown-up can help her.", "cs.reason")), "online", "reason"),
      qd(ord("Put these in the right order for sending a kind message.", ["Think of something kind", "Write the message", "Ask a grown-up to help send it"], o("What comes first?", "Think, write, then send with a grown-up.", "cs.kind")), "online", "reason"),
      // ----- upgrade: 15 new mains (q16-q30), 1 variant each
      qa(fill("Complete the sentences about passwords.", "A {b1} is a secret code. We never {b2} it with friends.", [["password", "apple", "table"], ["share", "eat", "paint"]], o("Think about secret keys.", "A password is secret, so we do not share it.", "cs.private")), "online", "apply",
        [fill("Finish the sentences about passwords.", "Only tell your password to a {b1}. Never tell a {b2}.", [["parent", "stranger", "bus"], ["stranger", "bus", "chair"]], o("Who looks after you?", "Only a parent should know your password.", "cs.private"))]),
      qa(ms("Which two are private? Pick two.", ["Our password", "Our home address"], ["Our favourite colour", "A funny joke"], o("Think about what only family should know.", "Passwords and addresses are private.", "cs.private")), "online", "apply",
        [ms("Which two should we keep private online? Pick two.", ["Our full name", "Our school name"], ["Our favourite fruit", "Our favourite game"], o("Think about who could find you.", "Full names and school names are private.", "cs.private"))]),
      qa(mat("Match each online rule to its reason.", [["Keep passwords private", "Only you can get in"], ["Tell a grown-up if worried", "They can help"], ["Be kind online", "Unkind words hurt"]], o("Why do we have the rule?", "Each rule keeps us safe or kind.", "cs.rules")), "online", "apply",
        [mat("Match each rule to its reason.", [["Take screen breaks", "It rests your eyes"], ["Ask before downloading", "A grown-up checks it is safe"], ["Dry hands near plugs", "Water and electricity are dangerous"]], o("Why do we have the rule?", "Each rule keeps us safe.", "cs.rules"))]),
      qa(sld("Aisha takes a break after every 20 minutes. She plays for 40 minutes. Slide to show how many breaks she takes.", { min: 0, max: 6 }, 2, 0, o("40 is two lots of 20.", "40 minutes is 2 lots of 20, so 2 breaks.", "cs.devices")), "use_well", "apply",
        [sld("Zayd takes a break after every 20 minutes. He plays for 60 minutes. Slide to show how many breaks he takes.", { min: 0, max: 6 }, 3, 0, o("60 is three lots of 20.", "60 minutes is 3 lots of 20, so 3 breaks.", "cs.devices"))]),
      qa(hot("Tap the thing that is private.", [["🏠", "Home address", 22, 50], ["🌈", "Favourite colour", 50, 50], ["⚽", "Favourite game", 78, 50]], ["Home address"], { labels: true, ...o("Where you live.", "An address is private.", "cs.private") }), "online", "apply",
        [hot("Tap the thing that keeps an account safe.", [["🔑", "Password", 22, 50], ["🖍️", "Crayon", 50, 50], ["🍎", "Apple", 78, 50]], ["Password"], { labels: true, ...o("A secret key.", "A password keeps an account safe.", "cs.private") })]),
      qa(num("A family shares one tablet. Each of 3 children gets 15 minutes. How many minutes is that in all?", 45, o("Add 15 three times.", "15 + 15 + 15 = 45 minutes.", "cs.devices")), "use_well", "apply",
        [num("A family shares one tablet. Each of 4 children gets 10 minutes. How many minutes is that in all?", 40, o("Add 10 four times.", "10 + 10 + 10 + 10 = 40 minutes.", "cs.devices"))]),
      qa(ord("Put these in order when a screen scares you.", ["Stop and put the device down", "Go to a grown-up", "Tell them what you saw"], o("What first?", "Stop, go to a grown-up, then tell them.", "cs.kind")), "online", "apply",
        [ord("Put these in order when a stranger messages you.", ["Do not answer", "Tell a grown-up", "Let them help you"], o("What first?", "Do not answer, tell a grown-up, then let them help.", "cs.kind"))]),
      qa(mc("Layla shares her password with a kind friend. Is that okay?", "No. A password is private, even from kind friends", ["Yes, friends are safe", "Yes, if they promise"], o("Who can know your password?", "Only a parent should know your password.", "cs.reason")), "online", "reason",
        [mc("Omar gives his password to a classmate so they can play. Is that okay?", "No. A password is private, even from classmates", ["Yes, they are in his class", "Yes, if it is just once"], o("Who can know your password?", "Only a parent should know your password.", "cs.reason"))]),
      qa(mc("In a game, a kind player asks for Sam's real name. Should Sam tell them?", "No. Even a kind stranger can be unsafe, so tell a grown-up", ["Yes, kind people are safe", "Yes, names are not private"], o("Can we be sure who they are?", "We cannot know who a stranger online really is.", "cs.reason")), "online", "reason",
        [mc("A friendly stranger online asks Aisha which school she goes to. Should she tell?", "No. She should not answer and should tell a grown-up", ["Yes, they seem nice", "Yes, schools are not private"], o("Can we be sure who they are?", "We cannot know who a stranger online really is.", "cs.reason"))]),
      qa(mc("Hamza says home rules for devices are not needed. Why do families have them?", "They help everyone stay safe and take breaks", ["They stop all fun", "They are not useful"], o("Rules help us.", "Home rules keep us safe and healthy.", "cs.reason")), "use_well", "reason",
        [mc("Zara says she can download anything without asking. Why is that wrong?", "Some downloads are not safe, so a grown-up should check", ["All downloads are safe", "Asking is silly"], o("Who can check?", "A grown-up can check that a download is safe.", "cs.reason"))]),
      qa(mc("Nora says all websites are safe because they are on a screen. Is she right?", "No. Some are not safe, so ask a grown-up", ["Yes, screens are safe", "Yes, if they are colourful"], o("Can everything online be trusted?", "Not every website is safe.", "cs.reason")), "online", "reason",
        [mc("Ben says every message online is true. Is he right?", "No. Some are not true, so check with a grown-up", ["Yes, all are true", "Yes, if it is long"], o("Can everything online be trusted?", "Not every message is true.", "cs.reason"))]),
      qa(mc("Which is a good way to keep a tablet safe?", "Keep drinks away from it", ["Put it in the bath", "Leave it on the floor"], o("Water and devices do not mix.", "Spills can damage a device.", "cs.devices")), "use_well", "apply",
        [mc("Which is a good way to look after a charging cable?", "Wind it loosely and keep it tidy", ["Bend it hard", "Chew it"], o("Be gentle with cables.", "A tidy cable lasts longer and is safer.", "cs.electricity"))]),
      qa(tf("All websites are safe to visit.", false, o("Not everything online is safe.", "Some websites are not safe, so ask a grown-up.", "cs.safety")), "online", "recall",
        [tf("A trusted adult can help us if we see something scary online.", true, o("Who can help?", "A trusted adult can help.", "cs.safety"))]),
      qa(mc("A screen shows something that scares you. Who should you tell?", "A trusted adult", ["Nobody", "A stranger online"], o("Who looks after you?", "Tell a trusted adult.", "cs.safety")), "online", "apply",
        [mc("Who is a trusted adult?", "A parent or a teacher", ["A stranger online", "A pop-up message"], o("Who looks after you?", "Parents and teachers are trusted adults.", "cs.safety"))]),
      qa(mc("Which message is kind?", "Well done on your game!", ["You are bad at this", "Give me your password"], o("Be kind.", "Kind messages are friendly.", "cs.kind")), "online", "recall",
        [mc("Which is a kind thing to write?", "Thank you for helping me", ["Nobody likes you", "Tell me your address"], o("Be kind.", "Thanking someone is kind.", "cs.kind"))]),
    ].map((x, i) => (x.alts ? x : { ...x, alts: ALTS[i] })),
  }),
];
