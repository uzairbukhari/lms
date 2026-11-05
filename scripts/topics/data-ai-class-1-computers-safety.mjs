import { SAY, SS, H, T, IMG, REVEAL, ACT, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Computer Science, Data & AI, Class 1 (Zainab, age 7), topic 3: Computers and staying safe.
// Standards: NC KS1 uses of IT and e-safety, CSTA 1A computing systems, networks and impacts, CAM 2Pe.01 (docs/CURRICULUM_V2.md).
const o = (hint, why, tag) => ({ hint, why, tag });

const inOut = {
  id: "in_out", kind: "learn", title: "Inside a computer: in and out",
  blocks: [
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
    GLOSS({ input: "How we put information into a computer.", output: "How a computer gives us information.", tablet: "A flat touch-screen computer.", laptop: "A small computer you can carry.", computer: "A machine that follows instructions." }),
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
    SAY("Being kind online is just like being kind in real life. We say please and thank you. We write friendly messages. If someone is unkind, or something online makes you feel worried, you should tell a grown-up straight away. You will not be in trouble.", T("Be **kind** online. If something worries you, **tell a grown-up**.")),
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
    intro: [
      H("Welcome, computer explorer!"),
      SAY("Welcome, computer explorer! Today's big question: how do we use computers and stay safe? We will find out how computers take in information and give it out, and how to be careful and kind online. Let's go!", T("Today's big question: how do we use computers and stay safe?", "We will learn about inputs, outputs and online safety.")),
      IMG("💻", "Computers help us, and we help ourselves by staying safe."),
      GLOSS({ safe: "Not likely to hurt you." }),
    ],
    subs: [inOut, useWell, play, kindOnline],
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
    ].map((x, i) => ({ ...x, alts: ALTS[i] })),
  }),
];
