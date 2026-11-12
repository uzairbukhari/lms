import { SAY, SS, H, T, IMG, REVEAL, ACT, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld, PHOTO } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Computer Science, Data & AI, Class 4 (Fatima, age 9), topic 4: Networks and safety.
// Standards: NC KS2 networks and e-safety, CSTA 1B networks and the internet (docs/CURRICULUM_V2.md).
const o = (hint, why, tag) => ({ hint, why, tag });

const CABLES = "data-ai-class-4-networks-safety-1-73c31d3d.jpg";
const FIBRE = "data-ai-class-4-networks-safety-2-f46c6c8e.jpg";

const internet = {
  id: "internet", kind: "learn", title: "How the internet works",
  blocks: [
    H("Welcome back, network explorer!"),
    SAY("Today we follow a message across the internet. How do we stay safe on it?", T("Today's big question: how does the internet work, and how do we stay safe?")),
    SAY("These cables plug into a network switch. Switches connect the computers in a school network.", PHOTO(CABLES, "Rows of blue network cables plugged into a network switch with glowing lights", "Cables link a network switch to many computers.", "Photo by Scott Rodgerson on Unsplash")),
    H("Stop 1: Computers that connect"),
    SAY("A network is a group of computers connected so they can share information. The internet is the biggest network in the world. It joins millions of networks together. When you open a website, your device asks a server. A server is a powerful computer that stores websites and sends them to you. The messages travel along cables, through wireless signals, and through routers that point them the right way.", T("A **network** connects computers so they can share. The **internet** joins millions of networks.", "A **server** stores a website. A **router** points messages the right way.")),
    EXP("Opening a website",
      SS("You tap a link on your tablet. That is a request for a web page.", S("Your tablet makes a request.", ["t", "📱", 15, 55, 3, "bounce", "You"])),
      SS("The request goes through your router, and then along cables to the internet.", S("The request travels through a router and cables.", ["t", "📱", 15, 55, 3], ["r", "📡", 40, 55, 3, "pulse", "Router"], ["c", "➡️", 60, 55, 2, "none"])),
      SS("A server far away stores the website. It sends the page back to you, and the page appears on your screen.", S("The server sends the page back.", ["t", "📱", 15, 55, 3], ["r", "📡", 40, 55, 2], ["s", "🖥️", 85, 55, 3, "bounce", "Server"], ["b", "⬅️", 62, 55, 2, "bounce"]))),
    CHK(mc("What does a server do?", "Stores websites and sends them to us", ["Types the words for us", "Charges our battery"], o("Think about a library of websites.", "A server stores websites and sends them to us.", "net.server"))),
    H("Stop 2: Packets"),
    SAY("Some cables carry data as flashes of light. Packets can travel through fibres like these.", PHOTO(FIBRE, "A bundle of glowing optical fibres in the dark", "Optical fibres carry data as flashes of light.", "Photo by Denny Müller on Unsplash")),
    SAY("Big messages do not travel in one piece. They are split into tiny packets. Each packet has a label saying where it is going and which number it is. Packets can take different routes. At the end, the computer puts them back in order, like a jigsaw. If one packet is lost, only that one needs to be sent again.", T("Messages are split into **packets**. Each packet has an address and a number.", "At the end they are put back in order.")),
    EXP("A message in packets",
      SS("Here is a message: HELLO FRIEND.", S("The message.", ["m", "✉️", 50, 50, 3, "bounce", "HELLO FRIEND"])),
      SS("It is split into three packets. Each one has a number.", S("Three numbered packets.", ["p1", "📦", 25, 50, 3, "none", "1: HEL"], ["p2", "📦", 50, 50, 3, "none", "2: LO F"], ["p3", "📦", 75, 50, 3, "none", "3: RIEND"])),
      SS("They travel by different routes, then are put back in order at the other end. The message arrives safely.", S("They are put back in order.", ["p1", "📦", 25, 70, 2, "none", "1"], ["p2", "📦", 50, 40, 2, "none", "2"], ["p3", "📦", 75, 70, 2, "none", "3"], ["ok", "✅", 50, 15, 3, "bounce"]))),
    CHK(mc("Why is a message split into packets?", "Small packets can travel different routes and be put back together", ["To make it slower on purpose", "To hide it from the router"], o("Think about a jigsaw.", "Packets are small and are put back in order.", "net.packets"))),
    SAY("Let us remember. A network connects computers. A server stores websites. Messages travel as packets.", SUM("A network connects computers", "A server stores websites", "Messages are split into numbered packets")),
    GLOSS({ "network switch": "A device that links computers in a network and sends data to the right one.", "internet address": "A number that tells data where to go.", network: "A group of connected computers.", internet: "The biggest network, joining millions of networks.", server: "A powerful computer that stores websites.", router: "A device that points messages the right way.", packets: "Small pieces a message is split into." }),
  ],
  mini: [
    mc("What is the internet?", "A huge network of networks", ["A single computer", "A game"], o("Many connected.", "The internet joins millions of networks.")),
    tf("A router points messages the right way.", true, o("Like a signpost.", "A router directs messages.")),
    ord("Put the steps of loading a website in order.", ["You tap a link", "The request reaches a server", "The page appears on your screen"], o("What first?", "Tap, request reaches a server, then the page appears.")),
    mc("Each packet has...", "An address and a number", ["A smell", "A colour only"], o("So it can be reassembled.", "Packets carry an address and a number.")),
  ],
};

const passwords = {
  id: "passwords", kind: "try", title: "Strong passwords",
  blocks: [
    H("Stop 1: Why passwords matter"),
    SAY("A password is a secret key that protects your accounts. A weak password is easy to guess, like 1234 or your name. A strong password is long, has a mix of letters, numbers and symbols, and is not about you. A great trick is to join three random words, like blue elephant pizza. Then add a number and a symbol. It is easy for you to remember but very hard for others to guess.", T("A **strong password** is long and mixed, and is not easy to guess.", "Never share a **password** except with your parent.")),
    EXP("Weak and strong",
      SS("Here is a weak password. It is short and easy to guess.", S("Weak: 1234", ["w", "🔓", 30, 50, 3, "none", "1234"])),
      SS("Here is a stronger one. It joins random words and adds a number and a symbol.", S("Strong: BlueElephantPizza7!", ["w", "🔓", 15, 50, 2, "none", "1234"], ["s", "🔐", 65, 50, 3, "bounce", "BlueElephantPizza7!"])),
      SS("The longer and more mixed the password, the more guesses a computer would need. The strong one would take far longer to crack.", S("Strong passwords take much longer to guess.", ["w", "🔓", 15, 50, 2], ["s", "🔐", 65, 50, 3, "pulse"], ["t", "⏳", 40, 20, 2, "bounce"]))),
    CHK(mc("Which is the stronger password?", "BlueElephantPizza7!", ["1234", "Fatima"], o("Longer and more mixed.", "It is long, mixed and not about you.", "net.password"))),
    ACT("Make a strong password recipe", ["Paper and pencil"], ["Choose three random words that are not about you.", "Add a number and a symbol.", "Do NOT use this exact password for real. Only practise the recipe, and keep real passwords secret."]),
    H("Stop 2: Keeping passwords safe"),
    SAY("A strong password is only useful if it stays secret. Do not write it where others can see. Do not use the same password everywhere, because if one is stolen, all your accounts are at risk. Ask a parent to help you use a password manager. And never tell your password to a friend or a stranger.", T("Use a different password for each account. Keep it **secret**.")),
    IMG("🔐🤫", "A strong password stays secret."),
    CHK(tf("It is a good idea to use the same password for every account.", false, o("Think about one stolen key.", "If one is stolen, all are at risk.", "net.password"))),
    SAY("Let us remember. Strong passwords are long and mixed. Keep them secret and different for each account.", SUM("Strong passwords are long and mixed", "Keep passwords secret", "Use a different password for each account")),
    GLOSS({ "strong password": "A long, mixed password that is hard to guess.", password: "A secret code that protects an account.", secret: "Known only to you and your parent.", symbol: "A character such as ! or #." }),
  ],
  mini: [
    mc("Which password is weakest?", "1234", ["BlueElephantPizza7!", "T4ble-Lamp-Cloud!"], o("Easy to guess.", "1234 is too easy to guess.")),
    tf("A strong password mixes letters, numbers and symbols.", true, o("Mix it up.", "A mix makes it harder to guess.")),
    mc("Who can you share your password with?", "Only a parent", ["A friend", "Anyone who asks"], o("Keep it secret.", "Only a parent should know it.")),
  ],
};

const phish = {
  id: "safe_game", kind: "play", title: "Spot the risk",
  blocks: [
    H("Stop 1: Tricky messages"),
    SAY("Some messages online are tricks. A scam message might say you won a prize. It may ask you to click a link and type your password. This is called phishing, like fishing for your details. Clues are strange spelling and a rush to act now. Another clue is an offer too good to be true. The safe move is to not click, not reply, and tell a grown-up.", T("**Phishing** messages try to trick you into sharing private details.", "Do not click, do not reply. Tell a grown-up.")),
    IMG("🎣✉️", "A tricky message is like bait on a hook."),
    SAY("Spot the warning signs: a prize, a link and a request for your password.", IMG("🚩✉️", "Warning signs in a message.")),
    CHK(mc("A message says: you won a phone, click here and enter your password. What should you do?", "Do not click, and tell a grown-up", ["Click quickly", "Reply with your password"], o("Too good to be true.", "It is a trick. Do not click and tell a grown-up.", "net.phishing"))),
    H("Stop 2: Brain game"),
    SAY("A memory challenge now. Find the matching pairs, then come back for the next stop.", T("Match the safe pairs.")),
    SAY("Find the matching pairs. Take your time.", BRAIN("memory_match", "Safe pairs", "Find the pairs.", ["🔐", "🛑", "🙋", "🎣"])),
    CHK(tf("A message that says to act right now or lose a prize is a warning sign.", true, o("Pressure is a clue.", "Scammers rush you.", "net.phishing"))),
    SAY("Let us remember. Spot tricky messages, do not click, and tell a grown-up.", SUM("Phishing tries to trick you", "Do not click or reply", "Tell a grown-up")),
    GLOSS({ phishing: "A trick message that tries to steal your details.", scam: "A trick to cheat someone.", link: "Text you tap to go to another page.", clue: "A sign that helps you decide." }),
  ],
  mini: [
    mc("What is phishing?", "A trick to steal your details", ["A kind of fish", "A fast network"], o("Think of bait.", "Phishing tries to trick you.")),
    tf("It is safe to click links in messages from strangers.", false, o("Be careful.", "Do not click links from strangers.")),
    mc("A warning sign in a message is...", "A rush to act now", ["A friendly hello only", "A big picture only"], o("Pressure.", "Scammers rush people.")),
  ],
};

const footprint = {
  id: "footprint", kind: "use", title: "Your digital footprint",
  blocks: [
    H("Stop 1: What you leave behind"),
    SAY("Every time you go online you leave a trail, like footprints in the sand. Photos you post, comments you write and sites you visit can stay for a long time. This trail is called your digital footprint. Some of it is positive, like a nice message. Some can be harmful if it shares private things. Before you post, pause and think: would I be happy for my family and teacher to see this?", T("Your **digital footprint** is the trail you leave online.", "Think before you **post**: it can stay for a long time.")),
    IMG("👣💻", "Everything we post leaves a footprint."),
    CHK(mc("What is a digital footprint?", "The trail of things you leave online", ["The size of your shoe", "A broken screen"], o("Think of footprints.", "It is the trail we leave online.", "net.footprint"))),
    H("Stop 2: Being kind and responsible online"),
    SAY("Be as kind online as you are in person. Do not post unkind comments. Do not share other people's photos without asking. If someone is unkind, or you see something upsetting, tell a grown-up. Save the evidence and do not reply with anger. Every one of us can make the internet a kinder place.", T("Be **kind** online. Tell a grown-up if something upsets you.")),
    SAY("Kind words and asking before sharing make the internet a nicer place.", IMG("💬🤝", "Be kind and ask before sharing.")),
    SAY("Here is a task to try with your family.", ACT("Our family online rules", ["Paper and pencil", "Your family"], ["Talk with your family about how you use the internet.", "Write three rules, such as: ask before sharing a photo.", "Put them somewhere everyone can see."])),
    REVEAL("Can you completely delete something you posted?", "Not always. Others may have copied or saved it, so think before you post."),
    CHK(tf("It is fine to share a friend's photo without asking them.", false, o("Think about permission.", "Always ask first.", "net.footprint"))),
    SAY("Let us remember. Think before you post, be kind, and tell a grown-up about anything upsetting.", SUM("Your digital footprint can last", "Think before you post", "Be kind and ask before sharing")),
    GLOSS({ kind: "Friendly and caring.", "digital footprint": "The trail we leave online.", post: "To put something online.", responsible: "Acting in a careful and sensible way.", permission: "Saying yes before something happens." }),
  ],
  mini: [
    mc("Before posting something, you should...", "Pause and think", ["Post at once", "Delete your account"], o("Slow down.", "Thinking first keeps us safe.")),
    tf("Our online posts can stay for a long time.", true, o("Think about copies.", "Others can save posts.")),
    mc("If something online upsets you, you should...", "Tell a grown-up", ["Keep it secret", "Post it everywhere"], o("Who can help?", "A grown-up can help.")),
  ],
};

const ALTS = [
  [mc("What do we call a computer that stores websites?", "A server", ["A router", "A tablet"], o("It serves pages.", "A server stores websites.", "net.server")), mc("Which device stores a website and sends it to you?", "A server", ["A mouse", "A speaker"], o("It serves pages.", "A server stores websites.", "net.server"))],
  [mc("What does a router do?", "Points messages the right way", ["Stores websites", "Makes passwords"], o("Like a signpost.", "A router directs traffic.", "net.router")), mc("Which device sends messages along the right path?", "A router", ["A keyboard", "A server"], o("Like a signpost.", "A router directs traffic.", "net.router"))],
  [num("A message is split into 6 packets and 2 are lost. How many arrived?", 4, o("6 minus 2.", "6 - 2 = 4.", "net.packets")), num("A message is split into 9 packets and 3 are lost. How many arrived?", 6, o("9 minus 3.", "9 - 3 = 6.", "net.packets"))],
  [fill("Finish this sentence about the internet.", "A {b1} connects computers and the internet joins millions of {b2}.", [["network", "neighbour", "nest"], ["networks", "nests", "nets"]], o("Think back.", "A network connects computers.", "net.vocab")), fill("Complete this sentence about packets.", "A message is split into {b1} and put back in {b2}.", [["packets", "puppets", "pockets"], ["order", "orbit", "oven"]], o("Think back.", "Packets are put back in order.", "net.vocab"))],
  [ms("Which are features of a strong password? Pick two.", ["It is long", "It mixes letters, numbers and symbols"], ["It is your name", "It is 1234"], o("Think back.", "Strong passwords are long and mixed.", "net.password")), ms("Pick two good password habits.", ["Keep it secret", "Use a different one for each account"], ["Share it with friends", "Use the same everywhere"], o("Think back.", "Secret and different.", "net.password"))],
  [mat("Pair each network word with what it means.", [["Server", "Stores websites"], ["Router", "Points messages"], ["Packet", "A small piece of a message"]], o("Think back.", "Each word has its own meaning.", "net.vocab")), mat("Pair each safety word with its meaning.", [["Phishing", "A trick message"], ["Password", "A secret code"], ["Footprint", "A trail online"]], o("Think back.", "Each word has its own meaning.", "net.vocab"))],
  [mc("An email says your account will close unless you reply with your password. What is this?", "A phishing trick", ["A friendly reminder", "A new game"], o("Pressure and password.", "That is phishing.", "net.phishing")), mc("A text says click now to claim a free tablet. What is this?", "A possible scam", ["A real gift", "A school notice"], o("Too good to be true.", "It looks like a scam.", "net.phishing"))],
  [mc("Idris says a short easy password is fine. Is he right?", "No, a short easy password is easy to guess", ["Yes, always", "Only for games"], o("Think about guessing.", "Short passwords are weak.", "net.reason")), mc("Zara says using one password everywhere is safest. Is she right?", "No, if it is stolen all accounts are at risk", ["Yes, always", "Only on school days"], o("One stolen key.", "Use different passwords.", "net.reason"))],
  [sld("A password has 8 characters. Slide to show how many characters a 12 character password has more than it.", { min: 0, max: 12 }, 4, 0, o("12 minus 8.", "12 - 8 = 4.", "net.password")), sld("One password has 10 characters and another has 15. Slide to show the difference.", { min: 0, max: 12 }, 5, 0, o("15 minus 10.", "15 - 10 = 5.", "net.password"))],
  [hot("Tap the password that is hardest to guess.", [["🔓", "pass", 22, 50], ["🔐", "Moon-Tiger-Cloud9!", 50, 50], ["🔓", "ali2015", 78, 50]], ["Moon-Tiger-Cloud9!"], { labels: true, ...o("Long and mixed.", "It is long, random and mixed.", "net.password") }), hot("Tap the weakest password.", [["🔐", "Green-Rocket-Tea4!", 22, 50], ["🔓", "123456", 50, 50], ["🔐", "Cloud-Bat-Pizza8?", 78, 50]], ["123456"], { labels: true, ...o("Easy to guess.", "123456 is the easiest to guess.", "net.password") })],
  [mc("What do we call the trail we leave when we are online?", "A digital footprint", ["A packet", "A router"], o("Think of footprints.", "That is our digital footprint.", "net.footprint")), mc("Which phrase means the things we leave behind online?", "Digital footprint", ["Strong password", "Server"], o("Think of footprints.", "That is the digital footprint.", "net.footprint"))],
  [tf("It is safe to click a link from a stranger.", false, o("Be careful.", "Do not click links from strangers.", "net.phishing")), tf("You should tell a grown-up about a suspicious message.", true, o("Who can help?", "A grown-up can check it.", "net.phishing"))],
  [tf("Asking a friend first before posting their photo is the right thing to do.", true, o("Permission matters.", "Always ask first.", "net.footprint")), tf("We never need to ask before posting a friend's photo.", false, o("Permission matters.", "Always ask first.", "net.footprint"))],
  [mc("Nadia says a deleted post can never be seen again. Is she right?", "No, others may have saved it", ["Yes, always", "Only on Fridays"], o("Think about copies.", "Others can copy posts.", "net.reason")), mc("Hamza says posting is fine because nobody will ever see it. Is he right?", "No, posts can be seen and saved", ["Yes, never seen", "Only by robots"], o("Think about copies.", "Posts can last.", "net.reason"))],
  [ord("Arrange the steps of loading a web page.", ["You tap a link", "A request reaches a server", "The page is sent back to you"], o("Tap first.", "Tap, request, then reply.", "net.process")), ord("Order these steps for staying safe from a tricky message.", ["Spot the warning signs", "Do not click", "Tell a grown-up"], o("Notice first.", "Spot, do not click, then tell.", "net.process"))],
];

const qd = (q, sub, depth) => ({ q, sub, depth });
const qa = (q, sub, depth, alts) => ({ q, sub, depth, alts });
const clip = {
  title: "Fatima follows a message", backdrop: "home", caption: "Fatima follows a message across the internet and spots a trick.",
  scenes: [
    { caption: "A message.", say: "Fatima sends a message to her cousin in Lahore. It is split into packets.",
      items: [{ id: "f", emoji: "👧", label: "Fatima", x: 22, y: 56, size: 3, enter: "walk_right" }, { id: "p", emoji: "📦", label: "packets", x: 72, y: 50, size: 3, enter: "pop" }] },
    { caption: "Numbered packets.", say: "Each packet has an address and a number. They travel by different routes.",
      items: [{ id: "a", emoji: "📦", label: "1", x: 25, y: 35, size: 2, anim: "bounce" }, { id: "b", emoji: "📦", label: "2", x: 50, y: 55, size: 2, anim: "bounce" }, { id: "c", emoji: "📦", label: "3", x: 75, y: 35, size: 2, anim: "bounce" }] },
    { caption: "Switch and router.", say: "A switch and a router send each packet the right way.",
      items: [{ id: "s", emoji: "🔀", label: "switch", x: 30, y: 50, size: 3, anim: "pulse" }, { id: "r", emoji: "📡", label: "router", x: 72, y: 50, size: 3, anim: "pulse" }] },
    { caption: "Put back together.", say: "At the other end the packets are put back in order. The message arrives.",
      items: [{ id: "m", emoji: "✉️", label: "HELLO", x: 50, y: 48, size: 3, effect: "sparkle" }] },
    { caption: "A strong password.", say: "She uses a long mixed password and keeps it secret.",
      items: [{ id: "k", emoji: "🔐", label: "Moon-Tiger-Cloud9!", x: 50, y: 48, size: 3, effect: "glow" }] },
    { caption: "A scam!", say: "A message says: win a phone, click now! That is a phishing clue.",
      items: [{ id: "m", emoji: "🎣", label: "click now!", x: 40, y: 50, size: 3 }, { id: "w", emoji: "⚠️", x: 75, y: 35, size: 3, anim: "pulse" }] },
    { caption: "Tell a grown-up.", say: "Fatima does not click. She tells her teacher straight away.",
      items: [{ id: "f", emoji: "👧", x: 28, y: 56, size: 3 }, { id: "t", emoji: "👩‍🏫", x: 70, y: 52, size: 3, effect: "hearts" }] },
    { caption: "Digital footprint.", say: "She thinks before posting. Everything online leaves a footprint.",
      items: [{ id: "d", emoji: "👣", x: 40, y: 55, size: 3 }, { id: "p", emoji: "🤔", x: 75, y: 40, size: 3, anim: "pulse" }] },
  ],
};

export const topics = [
  topicLesson({
    slug: "data-ai-class-4-networks-safety", subject: "data-ai", cls: 4, topic: 4, title: "Networks and Staying Safe",
    summary: "How the internet works, packets, strong passwords, tricky messages and your digital footprint.",
    unit: "Topic 4: Networks and safety", difficulty: 2,
    objectives: ["Explain how a message travels across the internet", "Make and keep a strong password", "Spot tricky messages and think about my digital footprint"],
    success_criteria: ["I can say what a server, router and packet are", "I can explain what makes a strong password", "I know what to do about a tricky message"],
    real_life: "Video calls with relatives, school logins and games all use the internet, passwords and safe habits.",
    standards: [
      { framework: "nc_england", code: "KS2 networks", text: "Understand computer networks including the internet; use technology safely, respectfully and responsibly" },
      { framework: "csta", code: "1B-NI-04", text: "Model how information is broken down into smaller pieces, transmitted as packets and reassembled" },
      { framework: "csta", code: "1B-NI-05", text: "Discuss real-world cybersecurity problems and how personal information can be protected" },
    ],
    warm_up: [
      mc("What do we call a mistake in a program?", "A bug", ["A loop", "A packet"], o("Not an insect.", "A mistake is a bug.")),
      mc("What does a label tell a machine?", "What an example is", ["How fast it is", "What colour it is"], o("The right answer.", "A label is the right answer.")),
      num("What is 9 x 7?", 63, o("9 sevens.", "9 x 7 = 63.")),
    ],
    intro: [],
    subs: [internet, passwords, phish, footprint],
    clip,
    quiz: [
      qd(mc("What do we call a powerful computer that stores websites?", "A server", ["A router", "A tablet"], o("It serves pages.", "A server stores websites.", "net.server")), "internet", "recall"),
      qd(mc("What does a router do with messages?", "Points them the right way", ["Stores them", "Makes passwords"], o("Like a signpost.", "A router directs traffic.", "net.router")), "internet", "recall"),
      qd(num("A message is split into 8 packets and 3 are lost. How many arrived?", 5, o("8 minus 3.", "8 - 3 = 5.", "net.packets")), "internet", "apply"),
      qd(fill("Complete this sentence about the internet.", "A {b1} connects computers and the internet joins millions of {b2}.", [["network", "neighbour", "nest"], ["networks", "nests", "nets"]], o("Think back.", "A network connects computers.", "net.vocab")), "internet", "recall"),
      qd(ms("Pick the two features of a strong password.", ["It is long", "It mixes letters, numbers and symbols"], ["It is your name", "It is 1234"], o("Think back.", "Strong passwords are long and mixed.", "net.password")), "passwords", "apply"),
      qd(mat("Match each word to its meaning.", [["Server", "Stores websites"], ["Router", "Points messages"], ["Packet", "A small piece of a message"]], o("Think back.", "Each word has its own meaning.", "net.vocab")), "internet", "recall"),
      qd(mc("An email says your account will close unless you send your password. What is this?", "A phishing trick", ["A friendly reminder", "A new game"], o("Pressure and password.", "That is phishing.", "net.phishing")), "safe_game", "reason"),
      qd(mc("Idris says a short password is fine if it is easy to remember. Is he right?", "No, a short easy password is easy to guess", ["Yes, always", "Only for games"], o("Think about guessing.", "Short passwords are weak.", "net.reason")), "passwords", "reason"),
      qd(sld("One password has 9 characters and another has 14. Slide to show the difference.", { min: 0, max: 12 }, 5, 0, o("14 minus 9.", "14 - 9 = 5.", "net.password")), "passwords", "apply"),
      qd(hot("Tap the strongest password.", [["🔓", "pass", 22, 50], ["🔐", "Moon-Tiger-Cloud9!", 50, 50], ["🔓", "ali2015", 78, 50]], ["Moon-Tiger-Cloud9!"], { labels: true, ...o("Long and mixed.", "It is long, random and mixed.", "net.password") }), "passwords", "apply"),
      qd(mc("What trail do we leave when we use the internet?", "A digital footprint", ["A packet", "A router"], o("Think of footprints.", "That is our digital footprint.", "net.footprint")), "footprint", "recall"),
      qd(tf("It is safe to click a link in a message from a stranger.", false, o("Be careful.", "Do not click links from strangers.", "net.phishing")), "safe_game", "recall"),
      qd(tf("We should ask before posting a photo of a friend.", true, o("Permission matters.", "Always ask first.", "net.footprint")), "footprint", "recall"),
      qd(mc("Nadia says a deleted post is gone forever. Is she right?", "No, others may have saved it", ["Yes, always", "Only on Fridays"], o("Think about copies.", "Others can copy posts.", "net.reason")), "footprint", "reason"),
      qd(ord("Put the steps of loading a web page in order.", ["You tap a link", "A request reaches a server", "The page is sent back to you"], o("Tap first.", "Tap, request, then reply.", "net.process")), "internet", "reason"),
      // ----- upgrade: 15 new mains (q16-q30), 1 variant each
      qa(mc("What does a network switch do?", "It connects devices on a network and sends data to the right one", ["It stores websites", "It makes passwords"], o("Think about a junction.", "A switch links devices and directs data between them.", "net.switch")), "internet", "recall",
        [mc("Which device links the computers in a school network so they can share files?", "A network switch", ["A keyboard", "A printer"], o("Think about a junction.", "A switch links devices and directs data.", "net.switch"))]),
      qa(mc("What does the header of a packet hold?", "The address and the packet number", ["The password", "A photo of the sender"], o("Think about delivery.", "The header says where it goes and which piece it is.", "net.header")), "internet", "recall",
        [mc("Why does each packet carry a number?", "So the pieces can be put back in order", ["So it can be louder", "So it can hide"], o("Think about a jigsaw.", "Numbers let the pieces be put back in order.", "net.header"))]),
      qa(mc("Rizwan says every computer in the school is linked directly to every other computer. Is he right?", "No. Devices connect through switches and routers", ["Yes, every one links to every other", "Yes, there are no switches"], o("Think about the cupboard of cables.", "A switch connects many devices, so they do not each link to all the others.", "net.reason_direct")), "internet", "reason",
        [mc("Hana says in a network each device has a cable to every other device. Is she right?", "No. A switch lets many devices share connections", ["Yes, every pair has a cable", "Yes, switches do not exist"], o("Think about the cupboard of cables.", "A switch avoids needing a cable between every pair.", "net.reason_direct"))]),
      qa(ord("Put these steps of loading a web page in order.", ["You type a web address", "Your device asks a server", "The server sends back packets", "Your device puts them together and shows the page"], o("Type first.", "Type, ask, send, then put together.", "net.page_steps")), "internet", "apply",
        [ord("Put these steps for sending a message in order.", ["The message is split into packets", "Packets travel along different routes", "Packets arrive at the other device", "They are put back in order"], o("Split first.", "Split, travel, arrive, then reorder.", "net.page_steps"))]),
      qa(mc("What is an internet address, or IP address, for?", "It identifies a device so data can be sent to the right place", ["It makes the screen brighter", "It saves passwords"], o("Think about post.", "An address says where data should go.", "net.ip")), "internet", "recall",
        [mc("Why does every device on the internet need an address?", "So data knows where to go", ["So it can charge faster", "So it can play music"], o("Think about post.", "An address says where data should go.", "net.ip"))]),
      qa(mc("Idris says the internet and the World Wide Web are the same thing. Is he right?", "No. The web is websites and pages. The internet is the network that carries them", ["Yes, they are identical", "Yes, the web is the cables"], o("Think about roads and shops.", "The internet is the network. The web is a service that runs on it.", "net.reason_web")), "internet", "reason",
        [mc("Layla says email is part of the web, so the internet is only the web. Is she right?", "No. The internet carries email, the web and much more", ["Yes, only the web", "Yes, email is the web"], o("Think about roads and shops.", "The internet carries many services.", "net.reason_web"))]),
      qa(ms("Which two are true about Wi-Fi? Pick two.", ["It sends data by radio waves", "It needs a password to be secure"], ["It needs no router", "It is always faster than a cable"], o("Think about wireless.", "Wi-Fi uses radio waves and should be protected.", "net.wifi")), "internet", "apply",
        [ms("Which two are true about wired connections? Pick two.", ["They use cables", "They are often steadier than Wi-Fi"], ["They send data by radio", "They never need a router"], o("Think about cables.", "Wired links use cables and can be steadier.", "net.wired"))]),
      qa(num("A message is sent as 10 packets. 2 are lost and sent again. How many packets are sent in all?", 12, o("10 plus the 2 resent.", "10 + 2 = 12 packets.", "net.resend")), "internet", "apply",
        [num("A message is sent as 8 packets. 3 are lost and sent again. How many packets are sent in all?", 11, o("8 plus the 3 resent.", "8 + 3 = 11 packets.", "net.resend"))]),
      qa(mat("Match each password to how strong it is.", [["1234", "Weak"], ["Moon-Tiger-Cloud9!", "Strong"], ["Your name and birth year", "Weak"]], o("Long, mixed and not about you.", "Short or personal passwords are weak.", "net.strength")), "passwords", "apply",
        [mat("Pair each password with its strength.", [["password", "Weak"], ["Teapot-Cricket-Rain7?", "Strong"], ["qwerty", "Weak"]], o("Long, mixed and not about you.", "Common words are weak.", "net.strength"))]),
      qa(hot("Tap the phishing clue.", [["⚠️", "Act now or lose your account!", 22, 50], ["✉️", "A photo from your cousin", 50, 50], ["📚", "A library reminder with your name", 78, 50]], ["Act now or lose your account!"], { labels: true, ...o("Look for pressure.", "A rush to act is a phishing clue.", "net.phish_clue") }), "safe_game", "apply",
        [hot("Tap the clue that suggests a scam.", [["🎁", "Win a free phone, click here!", 22, 50], ["📅", "A school trip reminder", 50, 50], ["🔒", "A message from your parent", 78, 50]], ["Win a free phone, click here!"], { labels: true, ...o("Too good to be true.", "A free prize is a scam clue.", "net.phish_clue") })]),
      qa(mc("What is two-step login?", "Proving who you are in two ways, such as a password and a code", ["Typing your password twice", "Logging in twice a day"], o("Think about two checks.", "It uses two different proofs.", "net.two_step")), "passwords", "recall",
        [mc("Why does a two-step login help if someone steals your password?", "They still need the second proof, such as a code", ["The password becomes longer", "The site deletes your account"], o("Think about two checks.", "A thief needs both steps.", "net.two_step"))]),
      qa(sld("A file of 12 MB is sent in packets of 2 MB each. Slide to show how many packets are needed.", { min: 0, max: 12 }, 6, 0, o("12 divided by 2.", "12 / 2 = 6 packets.", "net.packet_count")), "internet", "apply",
        [sld("A file of 15 MB is sent in packets of 3 MB each. Slide to show how many packets are needed.", { min: 0, max: 12 }, 5, 0, o("15 divided by 3.", "15 / 3 = 5 packets.", "net.packet_count"))]),
      qa(mc("Hira says software updates are a waste of time. Is she right?", "No. Updates fix security holes and bugs", ["Yes, updates do nothing", "Yes, updates only change colours"], o("Think about locks.", "Updates repair weaknesses attackers could use.", "net.reason_updates")), "passwords", "reason",
        [mc("Zayd says if a device works, it never needs an update. Is he right?", "No. It may still have security holes that updates fix", ["Yes, never update", "Yes, updates break things"], o("Think about locks.", "Updates repair weaknesses.", "net.reason_updates"))]),
      qa(mc("Faisal says only his friends can see his posts, so nobody else matters. Is he right?", "No. Friends can copy or share a post, and sites may store it", ["Yes, nobody else can ever see", "Yes, friends never share"], o("Think about copies.", "A post can be copied and shared.", "net.reason_footprint")), "footprint", "reason",
        [mc("Maryam says a private chat can never be copied. Is she right?", "No. A friend can screenshot or forward it", ["Yes, never copied", "Yes, chats vanish at once"], o("Think about copies.", "Anything shared can be copied.", "net.reason_footprint"))]),
      qa(fill("Finish the sentences about sharing.", "Before sharing a photo of someone else, ask their {b1}. Think about who could {b2} it later.", [["permission", "picture", "price"], ["see", "eat", "hug"]], o("Think about consent.", "We ask permission, and think about who can see.", "net.fill_share")), "footprint", "apply",
        [fill("Complete the sentences about two-step login.", "A two-step login needs a password and a {b1} code. A stolen password alone is not {b2}.", [["one-time", "funny", "sleepy"], ["enough", "tasty", "round"]], o("Think about two checks.", "A thief needs the code too.", "net.fill_share"))]),
    ].map((x, i) => (x.alts ? x : { ...x, alts: ALTS[i] })),
  }),
];
