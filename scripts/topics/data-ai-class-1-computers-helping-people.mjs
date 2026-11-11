import { SAY, SS, H, T, PHOTO, ACT, MAN, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Computer Science, Data & AI, Class 1 (Omar, age 7), topic 9: Computers that help people.
// Story thread: Omar follows his mum's trolley through a supermarket in Lahore.
const LIGHT = "data-ai-class-1-computers-helping-people-1-2a358416.jpg";
const NIGHT = "data-ai-class-1-computers-helping-people-2-9d51802d.jpg";
const OKM = (label) => ["ok", "✅", 50, 88, 2, "bounce", label];
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });

// ---------------------------------------------------------------------------------------------- 1. learn
const what = {
  id: "what", kind: "learn", title: "What is IT?",
  blocks: [
    H("Welcome back, tech explorer!"),
    SAY("Today we spot computers that help people. Omar is going shopping with his mum.",
      T("Today's big question: how do computers help people?")),
    SAY("This traffic light is controlled by a computer. It helps cars and people stay safe.",
      PHOTO(LIGHT, "A traffic light showing green with a camera on the pole beside it, against a blue sky", "A traffic light is controlled by a computer.", "Photo by Eliobed Suarez on Unsplash")),
    H("Stop 1: IT works with a computer"),
    SAY("IT stands for information technology. IT means using computers to work with information.",
      T("**Information technology** means using computers to work with information.")),
    EXP("IT is more than a desk computer",
      SS("A laptop is IT. So is a tablet. They help us read and write.", S("Laptop and tablet.", ["l", "💻", 30, 50, 3, "pulse"], ["t", "📱", 70, 50, 3, "pulse"])),
      SS("A cash machine is IT. It counts money and gives it out.", S("A cash machine.", ["a", "🏧", 50, 50, 3, "bounce", "IT"])),
      SS("Many machines have a tiny computer inside. They are IT too.", S("Tiny computers inside.", ["m", "🧺", 30, 50, 3], ["c", "💻", 70, 40, 2, "pulse", "inside"], OKM("IT is everywhere")))),
    CHK(mc("What does IT stand for?", "Information technology", ["Indoor toys", "Instant tea"], { hint: "It uses computers.", why: "IT means information technology.", tag: "it.meaning" })),
    H("Stop 2: IT in school"),
    SAY("School uses IT too. A smartboard shows lessons. Tablets help us learn.",
      T("A school has **interactive** screens and tablets.")),
    EXP("IT at school",
      SS("The teacher uses a smartboard. It shows pictures and videos.", S("Smartboard.", ["s", "🖥️", 50, 50, 3, "pulse", "smartboard"])),
      SS("Children use tablets to read and draw.", S("Tablets.", ["t", "📱", 30, 50, 3, "bounce"], ["b", "📖", 70, 50, 3, "pulse"])),
      SS("The school office uses a computer to keep records.", S("Records.", ["c", "🗂️", 50, 50, 3, "pulse", "records"], OKM("IT at school")))),
    CHK(mc("Which of these is IT at school?", "A smartboard", ["A chalk stick", "A skipping rope"], { hint: "It is a computer screen.", why: "A smartboard is a computer screen.", tag: "it.school" })),
    SAY("Let us remember. IT means using computers to work with information. It is all around us.",
      SUM("IT means information technology", "IT is in school, shops and on roads", "Many machines have a tiny computer inside")),
    GLOSS({ "information technology": "Using computers to work with information.", interactive: "Something you can touch or use to make it respond.", smartboard: "A big touch screen used in a class.", records: "Information that is kept and saved.", computer: "A machine that follows instructions." }),
  ],
  mini: [
    mc("Which is IT?", "A tablet", ["A spoon", "A pencil"], { hint: "It has a computer.", why: "A tablet is a computer." }),
    tf("IT is only a computer on a desk.", false, { hint: "Think about the cash machine.", why: "IT is in many places." }),
    mc("What does interactive mean?", "You can use it and it responds", ["It is very old", "It is very heavy"], { hint: "Think about a touch screen.", why: "An interactive screen responds to you." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const spotter = {
  id: "spotter", kind: "try", title: "IT spotter walk",
  blocks: [
    H("Stop 1: IT in shops and barcodes"),
    SAY("In the supermarket, Omar spots a scanner. It reads a barcode on a packet.",
      T("A **barcode** is a pattern of lines that holds a number.")),
    EXP("The checkout",
      SS("A packet of biscuits has a barcode on the back.", S("A barcode.", ["p", "🍪", 30, 50, 3, "none", "barcode"], ["b", "▮▮▯▮▯▮", 70, 50, 3])),
      SS("The scanner reads the lines. It finds the price.", S("Scan.", ["s", "📟", 30, 50, 3, "pulse", "scan"], ["p", "🍪", 70, 50, 3])),
      SS("The checkout shows the price and adds it to the bill.", S("Price.", ["c", "🧾", 50, 50, 3, "bounce", "price added"], OKM("IT at the shop")))),
    MAN("Scan the shopping", "Move the 5 items past the scanner one at a time.", "🛒", 5, ["Scanned", "Waiting"]),
    CHK(mc("What does a barcode scanner read?", "The pattern of lines", ["The colour of the packet", "The weight of the shopper"], { hint: "Look at the stripes.", why: "A scanner reads the pattern of lines.", tag: "it.barcode" })),
    H("Stop 2: IT on the road and at the doctor"),
    SAY("On the road, traffic lights are IT. At the doctor, computers keep health records safe.",
      T("**Traffic lights** and hospital computers are IT.")),
    SAY("A computer changes the lights from red to green in order. Cars stop and go safely.",
      PHOTO(NIGHT, "A traffic light at night with red, amber and green lights glowing", "A traffic light at night. A computer controls the colours.", "Photo by Tsvetoslav Hristov on Unsplash")),
    EXP("More IT around us",
      SS("A hospital receptionist types a patient's name. The record appears.", S("A record.", ["h", "🏥", 30, 50, 3], ["c", "🗂️", 70, 50, 3, "pulse"])),
      SS("A doctor can see the record on a tablet and treat people better.", S("A tablet at the clinic.", ["d", "🧑‍⚕️", 30, 50, 3, "bounce"], ["t", "📱", 70, 50, 3, "pulse"])),
      SS("Traffic lights, shops and clinics all use IT.", S("IT helps everyone.", ["t", "🚦", 25, 50, 3], ["s", "🛒", 50, 50, 3], ["h", "🏥", 75, 50, 3], OKM("IT is everywhere")))),
    SAY("Now you try. Be an IT spotter on your next walk with a grown-up.",
      ACT("IT spotter", ["Paper and a pencil", "A grown-up"], ["Walk to the shop, school or street with a grown-up.", "Find five things that use IT.", "Draw them and say how each one helps."])),
    CHK(tf("Traffic lights are controlled by a computer.", true, { hint: "Think about the changing colours.", why: "A computer changes the lights in order.", tag: "it.traffic" })),
    SAY("Let us remember. IT is in shops, roads and clinics.",
      SUM("Barcodes hold numbers for scanners to read", "Traffic lights use IT", "Clinics use IT to keep records")),
    GLOSS({ barcode: "A pattern of lines that holds a number.", scanner: "A machine that reads a barcode.", "traffic lights": "Lights that tell cars when to stop and go.", record: "Information that is saved.", receptionist: "A person who greets and helps visitors." }),
  ],
  mini: [
    mc("Where might you see a barcode?", "On a packet in a shop", ["On a cloud", "On a pencil's tip"], { hint: "Think about shopping.", why: "Packets have barcodes." }),
    tf("A scanner reads a barcode.", true, { hint: "That is its job.", why: "A scanner reads barcodes." }),
    mc("Which uses IT on the road?", "Traffic lights", ["A kite", "A rock"], { hint: "They change colour.", why: "Traffic lights use IT." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const helpful = {
  id: "helpful", kind: "play", title: "Helpful or not?",
  blocks: [
    H("Stop 1: Sort IT jobs"),
    SAY("IT helps in many ways. It can make jobs safer, easier, quicker and more accurate.",
      T("IT can make jobs **safer**, easier and more accurate.")),
    EXP("How IT helps",
      SS("A card machine is quick. You do not need to count coins.", S("Easier.", ["c", "💳", 30, 50, 3, "pulse"], ["t", "✅", 70, 50, 3, "bounce", "easy"])),
      SS("A scanner is accurate. It reads the number the same way each time.", S("Accurate.", ["s", "📟", 50, 50, 3, "pulse", "accurate"])),
      SS("Traffic lights keep us safe at busy roads.", S("Safer.", ["t", "🚦", 50, 50, 3, "bounce", "safer"], OKM("IT helps")))),
    CHK(mc("Which is a way IT helps?", "It makes some jobs safer", ["It makes homework vanish", "It makes everyone tall"], { hint: "Think about traffic lights.", why: "IT can make jobs safer.", tag: "it.benefit" })),
    H("Stop 2: Brain game"),
    SAY("First a memory game. Then sort the benefits of IT.",
      T("Play the memory game. Then think about **benefits**.")),
    BRAIN("memory_match", "IT pairs", "Find the pairs.", ["💳", "🚦", "📟", "🏥"]),
    CHK(mat("Match each IT tool to how it helps.", [["Traffic lights", "Keep roads safe"], ["Barcode scanner", "Reads prices accurately"], ["Card machine", "Makes paying easy"]], { hint: "Think about each job.", why: "Each tool helps in a different way.", tag: "it.match_benefit" })),
    SAY("Let us remember. IT helps in many ways. But it is not always perfect.",
      SUM("IT can make jobs safer and easier", "IT can be more accurate", "IT can make mistakes too")),
    GLOSS({ benefit: "A good thing that something gives you.", accurate: "Exactly right.", safer: "Less likely to cause harm.", easier: "Not so hard to do.", backup: "A plan for when something stops working." }),
  ],
  mini: [
    mc("Which is a benefit of IT?", "Jobs can be done more accurately", ["It makes rain", "It grows trees"], { hint: "Think about the scanner.", why: "IT can be more accurate." }),
    tf("IT can only save time.", false, { hint: "It can make things safer too.", why: "IT has many benefits." }),
    mc("What should we have if IT stops working?", "A backup plan", ["Nothing", "A bigger screen"], { hint: "Think about the shop.", why: "A backup plan helps if IT stops." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const choices = {
  id: "choices", kind: "use", title: "My IT choices",
  blocks: [
    H("Stop 1: Pick IT for a job"),
    SAY("Omar helps plan the family day. He picks IT only when it helps.",
      T("Use IT when it **helps**. Think about the job first.")),
    SAY("A map app helps find the shop. A calculator helps check the bill. A phone call can say hello.",
      T("Pick the right tool for the job.")),
    EXP("IT or a person?",
      SS("A map app helps find the shop. That is a job for IT.", S("IT job.", ["m", "🗺️", 30, 50, 3, "pulse"], ["t", "📱", 70, 50, 3, "bounce"])),
      SS("A hug or a smile needs a person. IT cannot do it.", S("A person's job.", ["h", "🤗", 50, 50, 3, "bounce", "person"])),
      SS("Pick the best helper for each job.", S("Pick the best.", ["m", "🗺️", 25, 50, 3], ["h", "🤗", 75, 50, 3], OKM("choose well")))),
    SAY("A good choice asks: does IT make this job better?",
      ACT("My IT choices", ["Paper and a pencil", "A grown-up"], ["List five jobs in your day.", "Mark which ones could use IT to help.", "Mark which ones need a person."])),
    CHK(mc("Which job is best done with a calculator?", "Adding up a long bill", ["Giving a hug", "Telling a bedtime story"], { hint: "Which job needs maths?", why: "A calculator is good for adding.", tag: "it.choose" })),
    H("Stop 2: When to switch off"),
    SAY("IT is useful, but we need breaks. Eyes get tired. Switch off at meal times and bedtime.",
      T("Take **breaks** from screens. Ask a grown-up first.")),
    EXP("Switch off",
      SS("At meal time, the family switches off phones and talks.", S("Meal time.", ["f", "🍽️", 50, 50, 3, "pulse"], ["p", "📵", 80, 30, 2])),
      SS("At bedtime, screens are off. Eyes and brains can rest.", S("Bedtime.", ["b", "🛏️", 50, 50, 3, "pulse"], ["m", "🌙", 80, 30, 2, "float"])),
      SS("Using IT wisely means knowing when to stop.", S("Use wisely.", ["w", "🕰️", 50, 50, 3, "bounce"], OKM("switch off")))),
    CHK(tf("It is wise to switch screens off at bedtime.", true, { hint: "Eyes need rest.", why: "Screens off at bedtime helps us rest.", tag: "it.switch_off" })),
    SAY("Let us remember. Pick IT when it helps. Switch off when we need a break.",
      SUM("Choose IT when it helps", "Some jobs need people", "Switch off for rest and family time")),
    GLOSS({ helps: "Makes something easier or better.", choice: "Picking one thing instead of another.", wisely: "In a sensible way.", breaks: "Rests from a screen.", calculator: "A tool that adds and subtracts numbers.", "ask first": "Check with a grown-up before using IT." }),
  ],
  mini: [
    mc("Which job needs a person, not IT?", "A bedtime hug", ["Adding a bill", "Finding a map"], { hint: "Think about care.", why: "Hugs need people." }),
    tf("We should take breaks from screens.", true, { hint: "Eyes need rest.", why: "Breaks keep us healthy." }),
    mc("Who should you ask before using IT?", "A grown-up", ["A stranger", "Nobody"], { hint: "Someone who looks after you.", why: "Ask a grown-up first." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Omar at the supermarket", backdrop: "town", caption: "Omar follows his mum through a supermarket in Lahore and spots IT.",
  scenes: [
    { caption: "To the shop.", say: "Omar goes to the supermarket with his mum.",
      items: [{ id: "o", emoji: "👦", label: "Omar", x: 22, y: 56, size: 3, enter: "walk_right" }, { id: "s", emoji: "🛒", x: 72, y: 52, size: 3, enter: "pop" }] },
    { caption: "A scale.", say: "The fruit scale shows the weight on a screen.",
      items: [{ id: "f", emoji: "🍎", x: 35, y: 50, size: 3 }, { id: "w", emoji: "⚖️", label: "weight", x: 70, y: 50, size: 3, effect: "glow" }] },
    { caption: "A barcode.", say: "A packet has a barcode. It is a pattern of lines.",
      items: [{ id: "p", emoji: "🍪", x: 35, y: 50, size: 3 }, { id: "b", emoji: "▮▯▮▮▯▮", x: 70, y: 50, size: 3, effect: "sparkle" }] },
    { caption: "Scan.", say: "The scanner reads the barcode and finds the price.",
      items: [{ id: "s", emoji: "📟", label: "scan", x: 35, y: 50, size: 3, anim: "pulse" }, { id: "p", emoji: "🏷️", label: "price", x: 70, y: 50, size: 3, enter: "pop" }] },
    { caption: "Pay.", say: "Mum pays with a card machine. It is quick.",
      items: [{ id: "c", emoji: "💳", x: 35, y: 50, size: 3 }, { id: "m", emoji: "🧾", x: 70, y: 50, size: 3, enter: "grow" }] },
    { caption: "Traffic lights.", say: "Outside, traffic lights keep the road safe.",
      items: [{ id: "t", emoji: "🚦", x: 50, y: 48, size: 3, anim: "pulse" }] },
    { caption: "A clinic.", say: "Omar's cousin's clinic uses a computer for health records.",
      items: [{ id: "h", emoji: "🏥", x: 35, y: 50, size: 3 }, { id: "c", emoji: "🗂️", x: 70, y: 50, size: 3 }] },
    { caption: "Switch off.", say: "At home, the family switches off screens for dinner.",
      items: [{ id: "d", emoji: "🍽️", x: 40, y: 50, size: 3 }, { id: "p", emoji: "📵", x: 75, y: 40, size: 3, effect: "hearts" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- what (q1-q8)
  Q(mc("What is information technology, or IT?", "Using computers to work with information", ["Making toys by hand", "Cooking with a stove"], { hint: "It uses computers.", why: "IT is using computers to work with information.", tag: "it.meaning" }), "what", "recall",
    [mc("Which describes IT?", "Computers and devices that handle information", ["Only paper and pencils", "Only farm tools"], { hint: "It uses computers.", why: "IT uses computers to handle information.", tag: "it.meaning" })]),
  Q(tf("A cash machine counts and gives out money using a computer.", true, { hint: "It has a computer inside.", why: "A cash machine uses IT.", tag: "it.inside" }), "what", "recall",
    [tf("A wooden spoon uses a computer inside.", false, { hint: "Does a spoon have a screen?", why: "A spoon has no computer.", tag: "it.inside" })]),
  Q(mat("Match each place to the IT you might find there.", [["Classroom", "Smartboard"], ["Supermarket", "Barcode scanner"], ["Road", "Traffic lights"]], { hint: "Think about each place.", why: "Each place has IT that helps.", tag: "it.match_place" }), "what", "apply",
    [mat("Join each place to its IT.", [["Clinic", "Computer records"], ["Bank", "Cash machine"], ["Playground", "Fixed sensor sign"]], { hint: "Think about each place.", why: "Each place uses IT.", tag: "it.match_place" })]),
  Q(hot("Tap the IT in the shop.", [["📟", "Barcode scanner", 22, 50], ["🧺", "Empty basket", 50, 50], ["🥕", "Carrots", 78, 50]], ["Barcode scanner"], { labels: true, hint: "It reads a barcode.", why: "A scanner is IT.", tag: "it.tap_shop" }), "what", "recall",
    [hot("Tap the IT in the school.", [["🖥️", "Smartboard", 22, 50], ["🪑", "Chair", 50, 50], ["✏️", "Pencil", 78, 50]], ["Smartboard"], { labels: true, hint: "It is a computer screen.", why: "A smartboard is IT.", tag: "it.tap_school" })]),
  Q(fill("Finish the sentences about IT.", "IT stands for {b1} technology. Computers help us work with {b2}.", [["information", "indoor", "instant"], ["information", "stones", "bricks"]], { hint: "Think about what IT does.", why: "IT is information technology.", tag: "it.fill_meaning" }), "what", "recall",
    [fill("Complete the sentences about screens.", "An {b1} screen responds when we touch it. A smartboard is a big {b2} screen.", [["interactive", "wooden", "silent"], ["touch", "paper", "mud"]], { hint: "Think about a smartboard.", why: "Interactive screens respond to touch.", tag: "it.fill_meaning" })]),
  Q(mc("Sam says IT is only a computer on a desk. Is he right?", "No. IT is in shops, roads, clinics and many machines", ["Yes, only desk computers", "Yes, only laptops"], { hint: "Think about the cash machine.", why: "IT is in many places, not just on a desk.", tag: "it.reason_desk" }), "what", "reason",
    [mc("Mina says IT is only found at school. Is she right?", "No. IT is also in shops, roads and homes", ["Yes, only at school", "Yes, only in offices"], { hint: "Think about the supermarket.", why: "IT is all around us.", tag: "it.reason_desk" })]),
  Q(mc("Aisha says IT is only used in rich countries. Is she right?", "No. People use IT in many countries, including Pakistan and the UK", ["Yes, only in rich countries", "Yes, only in cities of the UK"], { hint: "Think about Omar in Lahore.", why: "IT is used all over the world.", tag: "it.reason_countries" }), "what", "reason",
    [mc("Ben says Pakistan has no IT. Is he right?", "No. Shops, schools and roads in Pakistan use IT", ["Yes, none", "Yes, only in cinemas"], { hint: "Think about Omar in Lahore.", why: "IT is used in Pakistan.", tag: "it.reason_countries" })]),
  Q(sld("A classroom has 2 computers and 3 tablets. Slide to show how many devices.", { min: 0, max: 10 }, 5, 0, { hint: "2 + 3.", why: "2 + 3 = 5 devices.", tag: "it.count_devices" }), "what", "apply",
    [sld("A classroom has 3 computers and 4 tablets. Slide to show how many devices.", { min: 0, max: 10 }, 7, 0, { hint: "3 + 4.", why: "3 + 4 = 7 devices.", tag: "it.count_devices" })]),
  // ----- spotter (q9-q15)
  Q(mc("What does a barcode help a shop do?", "Find the price of an item", ["Grow the food", "Wash the floor"], { hint: "The scanner reads it.", why: "A barcode holds a number to find the price.", tag: "it.barcode_job" }), "spotter", "recall",
    [mc("Why do packets have barcodes?", "So a scanner can read the item", ["So they look heavy", "So they float"], { hint: "The scanner reads it.", why: "Barcodes let scanners read items.", tag: "it.barcode_job" })]),
  Q(ms("Which two shop things use IT? Pick two.", ["A barcode scanner", "A card machine"], ["A paper bag", "A shelf"], { hint: "They have computers inside.", why: "A scanner and a card machine are IT.", tag: "it.shop_it" }), "spotter", "apply",
    [ms("Which two use IT at a checkout? Pick two.", ["A scanner", "A screen showing the bill"], ["A trolley wheel", "A shopping list on paper"], { hint: "They have computers inside.", why: "A scanner and a bill screen are IT.", tag: "it.shop_it" })]),
  Q(ord("Put the steps for scanning an item in order.", ["Pick up the packet", "Scan the barcode", "See the price on screen"], { hint: "Pick up first.", why: "Pick up, scan, then see the price.", tag: "it.scan_steps" }), "spotter", "apply",
    [ord("Put these steps for paying in order.", ["Scan all the items", "Tap the card", "Take the receipt"], { hint: "Scan first.", why: "Scan, pay, then take the receipt.", tag: "it.scan_steps" })]),
  Q(num("Omar scans 3 tins and 5 packets. How many items does he scan in all?", 8, { hint: "Add 3 and 5.", why: "3 + 5 = 8 items.", tag: "it.count_items" }), "spotter", "apply",
    [num("Mum scans 6 apples and 4 pears. How many items is that in all?", 10, { hint: "Add 6 and 4.", why: "6 + 4 = 10 items.", tag: "it.count_items" })]),
  Q(mc("Omar says shops do not use IT. Is he right?", "No. Shops use scanners, card machines and computers", ["Yes, shops use no IT", "Yes, only banks do"], { hint: "Think about the checkout.", why: "Shops use IT for pricing and payment.", tag: "it.reason_shops" }), "spotter", "reason",
    [mc("Hana says a corner shop has no IT. Is she right?", "No. Many corner shops use card machines or phones", ["Yes, none at all", "Yes, only supermarkets"], { hint: "Think about paying.", why: "Corner shops can use IT too.", tag: "it.reason_shops" })]),
  Q(mc("Sam says barcodes and QR codes are exactly the same. Is he right?", "No. A barcode is a row of lines. A QR code is a square pattern that can hold a link", ["Yes, identical", "Yes, both are only on cars"], { hint: "Look at their shapes.", why: "They look different and hold information in different ways.", tag: "it.reason_codes" }), "spotter", "reason",
    [mc("Layla says a QR code is just a long barcode. Is she right?", "No. A QR code is a square pattern and a barcode is lines", ["Yes, same thing", "Yes, QR codes are bigger"], { hint: "Look at their shapes.", why: "They are different kinds of code.", tag: "it.reason_codes" })]),
  Q(mat("Match each place to what it uses IT for.", [["Traffic lights", "Telling cars when to go"], ["Clinic", "Keeping health records"], ["Checkout", "Reading barcodes"]], { hint: "Think about each place.", why: "Each place uses IT for its own job.", tag: "it.match_job" }), "spotter", "apply",
    [mat("Pair each place with its IT job.", [["School office", "Keeping records"], ["Bank machine", "Giving out money"], ["Smartboard", "Showing lessons"]], { hint: "Think about each place.", why: "Each place uses IT for its own job.", tag: "it.match_job" })]),
  // ----- helpful (q16-q23)
  Q(tf("IT can make some jobs safer.", true, { hint: "Think about traffic lights.", why: "Traffic lights make roads safer.", tag: "it.safer" }), "helpful", "recall",
    [tf("IT can never help with safety.", false, { hint: "Think about traffic lights.", why: "IT can help keep us safe.", tag: "it.safer" })]),
  Q(mc("Why is a barcode scanner more accurate than typing prices by hand?", "It reads the same number every time", ["It is bigger", "It talks loudly"], { hint: "Think about typing mistakes.", why: "A scanner reads the exact number each time.", tag: "it.accurate" }), "helpful", "apply",
    [mc("Why can a card machine be easier than counting coins?", "You do not need to count each coin", ["It makes coins bigger", "It needs no card"], { hint: "Think about paying.", why: "A card machine saves counting.", tag: "it.easier" })]),
  Q(ord("Put these in order from the first to the last when you pay by card.", ["The items are scanned", "The bill appears", "You tap your card", "You get a receipt"], { hint: "Scan first.", why: "Scan, bill, tap, receipt.", tag: "it.pay_steps" }), "helpful", "apply",
    [ord("Put these steps for using a cash machine in order.", ["Put in your card", "Type your secret number", "Choose an amount", "Take your money"], { hint: "Card first.", why: "Card, number, amount, then money.", tag: "it.pay_steps" })]),
  Q(mc("Aisha says IT is only useful for saving time. Is she right?", "No. IT can also make jobs safer and more accurate", ["Yes, only for time", "Yes, only for fun"], { hint: "Think about traffic lights and scanners.", why: "IT has many benefits.", tag: "it.reason_time" }), "helpful", "reason",
    [mc("Zayd says the only benefit of IT is speed. Is he right?", "No. IT can be safer, easier and more accurate too", ["Yes, only speed", "Yes, only prettiness"], { hint: "Think about traffic lights and scanners.", why: "IT has many benefits.", tag: "it.reason_time" })]),
  Q(mc("Layla says IT never makes mistakes. Is she right?", "No. IT can be wrong, so we need a backup plan", ["Yes, never wrong", "Yes, computers are perfect"], { hint: "What if the power goes off?", why: "IT can fail or make mistakes.", tag: "it.reason_perfect" }), "helpful", "reason",
    [mc("Noor says a scanner always reads every barcode perfectly. Is she right?", "No. Sometimes it misses and the cashier tries again", ["Yes, always perfect", "Yes, it cannot fail"], { hint: "What if the barcode is bent?", why: "IT can make mistakes.", tag: "it.reason_perfect" })]),
  Q(fill("Finish the sentences about benefits.", "IT can make jobs {b1} and more {b2}.", [["safer", "silent", "soggy"], ["accurate", "sticky", "hungry"]], { hint: "Think about what IT does well.", why: "IT can make jobs safer and more accurate.", tag: "it.fill_benefits" }), "helpful", "apply",
    [fill("Complete the sentences about IT.", "A card machine makes paying {b1}. A scanner finds prices {b2}.", [["easier", "taller", "wetter"], ["quickly", "never", "slowly"]], { hint: "Think about the checkout.", why: "IT can be easier and quick.", tag: "it.fill_benefits" })]),
  Q(sld("A clinic has 5 computers. 2 are being fixed. Slide to show how many are working.", { min: 0, max: 8 }, 3, 0, { hint: "5 take away 2.", why: "5 - 2 = 3 computers working.", tag: "it.working" }), "helpful", "apply",
    [sld("A school has 7 computers. 3 are being fixed. Slide to show how many are working.", { min: 0, max: 10 }, 4, 0, { hint: "7 take away 3.", why: "7 - 3 = 4 computers working.", tag: "it.working" })]),
  Q(num("A clinic has 6 computers. Each room has 2 of them. How many rooms are there?", 3, { hint: "6 shared into 2s.", why: "6 shared into groups of 2 makes 3 rooms.", tag: "it.share_computers" }), "helpful", "apply",
    [num("A school has 8 tablets. Each class gets 4. How many classes are there?", 2, { hint: "8 shared into 4s.", why: "8 shared into groups of 4 makes 2 classes.", tag: "it.share_computers" })]),
  // ----- choices (q24-q30)
  Q(mc("Which job is best done with a map app?", "Finding the way to a new shop", ["Giving a hug", "Smelling a flower"], { hint: "Which job needs directions?", why: "A map app helps find the way.", tag: "it.choose_map" }), "choices", "apply",
    [mc("Which job is a good one for a calculator?", "Checking a long bill", ["Telling a bedtime story", "Smiling at a friend"], { hint: "Which job needs numbers?", why: "A calculator is good for sums.", tag: "it.choose_calc" })]),
  Q(ms("Which two are good times to switch off screens? Pick two.", ["At bedtime", "During a family meal"], ["While walking across a busy road", "Never"], { hint: "Think about rest and family.", why: "Bedtime and meals are good times to rest from screens.", tag: "it.switch_times" }), "choices", "apply",
    [ms("Which two times suit a screen break? Pick two.", ["After homework", "When your eyes feel tired"], ["Only on Sundays", "Never"], { hint: "Think about your eyes.", why: "Breaks help tired eyes.", tag: "it.switch_times" })]),
  Q(mc("Zainab says we must use IT for every job. Is she right?", "No. Some jobs are better without IT", ["Yes, always IT", "Yes, never use people"], { hint: "Think about a hug.", why: "We choose IT only when it helps.", tag: "it.reason_every" }), "choices", "reason",
    [mc("Sam says we should use IT even to say good morning to someone next to us. Is he right?", "No. A smile and a hello is better", ["Yes, always type it", "Yes, always call"], { hint: "Think about a smile.", why: "Some jobs are best done by people.", tag: "it.reason_every" })]),
  Q(mc("Omar says IT can replace all people. Is he right?", "No. People care for others and make good choices", ["Yes, all people", "Yes, nurses are not needed"], { hint: "Think about a kind nurse.", why: "IT helps people but cannot replace care.", tag: "it.reason_replace" }), "choices", "reason",
    [mc("Hana says a robot can be a teacher's only helper for ever. Is she right?", "No. Teachers care, listen and explain in ways machines cannot", ["Yes, only robots", "Yes, teachers are not needed"], { hint: "Think about a kind teacher.", why: "People do jobs that need care.", tag: "it.reason_replace" })]),
  Q(hot("Tap the job a person does best.", [["🤗", "Giving a hug", 22, 50], ["🧮", "Adding big numbers", 50, 50], ["🗺️", "Finding a route", 78, 50]], ["Giving a hug"], { labels: true, hint: "Think about care.", why: "A hug needs a person.", tag: "it.person_job" }), "choices", "apply",
    [hot("Tap the job where IT helps most.", [["🤗", "Giving a hug", 22, 50], ["🧮", "Adding big numbers", 50, 50], ["😊", "Smiling at a friend", 78, 50]], ["Adding big numbers"], { labels: true, hint: "Think about numbers.", why: "IT is good at adding numbers.", tag: "it.person_job" })]),
  Q(mc("What should you do before using a new device or app?", "Ask a grown-up", ["Share your password", "Download it at once"], { hint: "Someone who looks after you.", why: "Ask a grown-up first.", tag: "it.ask_first" }), "choices", "recall",
    [mc("Who should check a new app before you use it?", "A grown-up", ["A stranger online", "Nobody"], { hint: "Someone who looks after you.", why: "A grown-up should check first.", tag: "it.ask_first" })]),
  Q(tf("When IT stops working, a backup plan can still help.", true, { hint: "Think about a power cut.", why: "A backup plan helps when IT stops.", tag: "it.backup" }), "choices", "recall",
    [tf("If IT stops working, nothing can be done.", false, { hint: "Think about a power cut.", why: "A backup plan can help.", tag: "it.backup" })]),
];

export const topics = [
  topicLesson({
    slug: "data-ai-class-1-computers-helping-people", subject: "data-ai", cls: 1, topic: 9, title: "Computers That Help People",
    summary: "Spot information technology in school, shops and hospitals and say how it helps.",
    unit: "Topic 9: Computers that help people", difficulty: 1,
    objectives: ["Name uses of IT beyond school", "Explain why people use IT", "Make safe, sensible choices with IT"],
    success_criteria: ["I can say what IT is", "I can name three places that use IT", "I can say when to use IT and when to switch off"],
    real_life: "Scanning shopping, crossing at traffic lights and visiting a clinic.",
    standards: [
      { framework: "nc_england", code: "KS1 uses of IT", text: "Recognise common uses of information technology beyond school" },
      { framework: "csta", code: "1A-IC-16", text: "Compare how people live and work before and after the adoption of computing technologies" },
    ],
    warm_up: [
      mc("What does a quiz need?", "A question and an answer", ["Only a question", "Only a screen"], { hint: "Think about the cat.", why: "A quiz has both." }),
      mc("What is a bug?", "A mistake in a program", ["A flower", "A sprite"], { hint: "Not an insect.", why: "A bug is a mistake." }),
      num("What is 8 + 2?", 10, { hint: "Count on from 8.", why: "8 + 2 = 10." }),
    ],
    intro: [],
    subs: [what, spotter, helpful, choices],
    clip,
    quiz,
  }),
];
