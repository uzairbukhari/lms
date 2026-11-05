import { SAY, SS, H, T, IMG, TIP, FACT, WARN, REVEAL, ACT, BRAIN, SUM, CHK, TABLE, S, EXP, GLOSS, mc, ms, tf, st, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// General Knowledge, Class 1 (Zainab, age 7). Topic lessons in format 3.0. Standards come from docs/CURRICULUM_V2.md.
// Facts used here are well established; Islamic content is kept simple and never quotes text from memory.
const MAP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "map" });
const SKY = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "space" });
// Map pins are drawn one size smaller than asked so labelled places do not overlap on the stage.
const P = (id, x, y, label, emoji = "📍", size = 2, anim = "none") => [id, emoji, x, y, Math.max(1, size - 1), anim, label];

// ====================================================================================================
// Topic 1: Where in the world?
// ====================================================================================================

const maps = {
  id: "maps", kind: "learn", title: "Maps and directions",
  blocks: [
    H("Stop 1: What is a map?"),
    SAY("Imagine you are a bird flying high above your school. What would you see? You would see the roof of the school, the playground and the road. A map is a picture like that. It shows a place as if we are looking down from above. A map uses little pictures for things like a mosque, a shop and a park. A box called a key tells us what each little picture means.", T("A **map** is a picture of a place seen from above.", "A **key** tells us what each little picture on the map means.")),
    MAP("A map of our street",
      SS("Here is a bird flying high above our street. What can it see from up there?", S("A bird looks down from above.", ["b", "🦅", 50, 18, 3, "float"])),
      SS("Now we draw what the bird sees. Here is the school, the mosque, the shop and the park. The bird's view is turned into a map.", S("The map shows the school, mosque, shop and park.", P("s", 25, 30, "School", "🏫", 3), P("m", 72, 30, "Mosque", "🕌", 3), P("sh", 25, 72, "Shop", "🏪", 3), P("p", 72, 72, "Park", "🌳", 3))),
      SS("The little pictures are the key. The key tells us a school is this picture and a park is that picture. With a map and a key, we can find our way!", S("The key tells us what each picture means.", P("s", 25, 30, "School", "🏫", 3), P("m", 72, 30, "Mosque", "🕌", 3), P("sh", 25, 72, "Shop", "🏪", 3), P("p", 72, 72, "Park", "🌳", 3, "pulse"), ["k", "🔑", 50, 58, 2, "bounce", "Key"]))),
    CHK(mc("What does a map show us?", "A place seen from above", ["A song", "A story about a bird"], { hint: "Think of the bird looking down.", why: "A map shows a place as if we are looking down from above." })),
    H("Stop 2: North, east, south and west"),
    SAY("Maps use special words for directions. There are four main ones: north, east, south and west. A compass is a tool that shows us which way is north. Here is a trick to remember the order: Never Eat Soggy Waffles. North, East, South, West, going round like a clock. And here is a helpful fact. The Sun rises in the east in the morning, and it sets in the west in the evening.", T("There are four main directions: **north**, **east**, **south** and **west**.", "A **compass** shows us which way is north.", "The Sun rises in the east and sets in the west.")),
    MAP("The four directions",
      SS("This is a compass. It helps us find our way.", S("A compass shows directions.", ["c", "🧭", 50, 50, 3, "spin"])),
      SS("North is at the top of the map. Like the top of a mountain, we say up north.", S("North is at the top.", ["c", "🧭", 50, 50, 3], P("n", 50, 14, "North", "⬆️", 2, "pulse"))),
      SS("East is to the right, where the Sun comes up in the morning.", S("East is on the right.", ["c", "🧭", 50, 50, 3], P("n", 50, 14, "North", "⬆️"), P("e", 84, 50, "East", "➡️", 2, "pulse"), ["su", "🌅", 84, 28, 2, "float"])),
      SS("South is at the bottom, and west is on the left, where the Sun goes down in the evening. Never Eat Soggy Waffles: North, East, South, West.", S("South is at the bottom, west is on the left.", ["c", "🧭", 50, 50, 3], P("n", 50, 14, "North", "⬆️"), P("e", 84, 50, "East", "➡️"), P("s", 50, 86, "South", "⬇️", 2, "pulse"), P("w", 16, 50, "West", "⬅️", 2, "pulse")))),
    CHK(tf("The Sun rises in the east.", true, { hint: "Where is the Sun when you wake up?", why: "The Sun rises in the east and sets in the west." })),
    CHK(mc("Which direction is at the top of a map?", "North", ["South", "West"], { hint: "Think of the top of the compass.", why: "North is at the top of a map." })),
    SAY("Let us remember. A map shows a place from above. A key explains the pictures. And there are four directions: north, east, south and west.", SUM("A map shows a place from above", "A key tells us what the pictures mean", "The four directions are north, east, south and west")),
    GLOSS({ map: "A picture of a place seen from above.", key: "A box on a map that tells us what each picture means.", north: "The direction at the top of a map.", east: "The direction to the right, where the Sun rises.", south: "The direction at the bottom of a map.", west: "The direction to the left, where the Sun sets.", compass: "A tool with a needle that shows which way is north." }),
  ],
  mini: [
    mc("What does a key on a map do?", "It tells us what the pictures mean", ["It locks the map", "It tells us the time"], { hint: "Think about the little pictures.", why: "The key explains each picture on the map." }),
    mc("Which direction is opposite to south?", "North", ["East", "West"], { hint: "Opposite means the other end of the line.", why: "North and south are opposite each other." }),
    tf("A compass helps us find north.", true, { hint: "Think about the needle.", why: "The needle of a compass points north." }),
    mc("In the evening the Sun sets in the...", "West", ["East", "North"], { hint: "It rises in the east.", why: "It rises in the east, so it sets in the west." }),
  ],
};

const pakistan = {
  id: "pakistan", kind: "try", title: "Pakistan",
  blocks: [
    H("Stop 1: Our country"),
    SAY("Let us explore our own country. Pakistan is a country in Asia. Its capital city is Islamabad, which is where the leaders work. Pakistan is split into four big parts called provinces. They are Punjab, Sindh, Khyber Pakhtunkhwa and Balochistan. Karachi, by the sea, is the biggest city.", T("**Pakistan** is our country. Its capital city is **Islamabad**.", "Pakistan has four **provinces**: Punjab, Sindh, Khyber Pakhtunkhwa and Balochistan.")),
    MAP("Pakistan and its provinces",
      SS("This is the shape of Pakistan. It has mountains in the north and the sea in the south.", S("Pakistan has mountains in the north and the sea in the south.", P("k", 72, 16, "Mountains", "🏔️", 3), P("sea", 80, 86, "Arabian Sea", "🌊", 3))),
      SS("Pakistan has four provinces. Balochistan is in the west. Sindh is in the south-east. Punjab is in the east. And Khyber Pakhtunkhwa is in the north-west.", S("The four provinces of Pakistan.", P("k", 72, 16, "Mountains", "🏔️", 3), P("sea", 80, 86, "Arabian Sea", "🌊", 3), P("b", 25, 58, "Balochistan", "🟫", 2, "pulse"), P("s", 55, 76, "Sindh", "🟧", 2, "pulse"), P("p", 68, 45, "Punjab", "🟩", 2, "pulse"), P("kp", 48, 26, "Khyber Pakhtunkhwa", "🟦", 2, "pulse"))),
      SS("Islamabad is our capital city, in the north. Karachi is a big port city by the sea. Lahore is a famous city in Punjab.", S("Islamabad is the capital. Karachi and Lahore are big cities.", P("k", 72, 16, "Mountains", "🏔️", 3), P("sea", 80, 86, "Arabian Sea", "🌊", 3), P("i", 48, 40, "Islamabad", "⭐", 2, "pulse"), P("l", 78, 55, "Lahore", "🏙️", 2), P("kar", 36, 76, "Karachi", "🚢", 2)))),
    CHK(mc("What is the capital city of Pakistan?", "Islamabad", ["Lahore", "Karachi"], { hint: "It is the city in the north where the leaders work.", why: "Islamabad is the capital of Pakistan." })),
    H("Stop 2: Mountains, rivers and our flag"),
    SAY("Pakistan has amazing places. The Indus is a very long river. It starts in the high mountains and flows all the way south to the sea. And K2 is one of the tallest mountains in the whole world! Our flag is green and white. It has a crescent and a star. The green shows the Muslim majority, and the white stripe shows people of other faiths.", T("The **Indus** is a very long river that flows to the sea.", "**K2** is the second tallest mountain in the world.", "Pakistan's flag is green and white, with a crescent and a star.")),
    MAP("The Indus river's journey",
      SS("High in the mountains, snow melts into water. Here is where the river begins.", S("The river begins in the mountains.", P("m", 50, 15, "K2 and the mountains", "🏔️", 3), ["w", "💧", 50, 32, 2, "bounce"])),
      SS("The water flows down, past farms and towns. The Indus brings water to the farmers' fields.", S("The river flows past farms and towns.", P("m", 50, 15, "K2 and the mountains", "🏔️", 3), ["w", "💧", 50, 56, 2, "bounce"], P("f", 22, 56, "Farm", "🌾", 2))),
      SS("At last the river reaches the Arabian Sea. What a long journey from the mountains to the sea!", S("The river reaches the Arabian Sea.", P("m", 50, 15, "K2 and the mountains", "🏔️", 3), ["w", "💧", 50, 82, 2, "bounce"], P("f", 22, 56, "Farm", "🌾", 2), P("s", 50, 90, "Arabian Sea", "🌊", 3)))),
    ACT("Find Pakistan", ["A globe, an atlas or a map on a tablet", "A grown-up helper"], ["Find Pakistan on the globe or map.", "Point to the mountains in the north and the sea in the south.", "Find Islamabad, then try to find where your family lives."]),
    CHK(tf("The Indus flows from the mountains down to the sea.", true, { hint: "Think about the river's journey.", why: "The Indus starts in the mountains and flows to the Arabian Sea." })),
    SAY("Let us remember. Pakistan has four provinces and its capital is Islamabad. The Indus river flows to the sea. K2 is a giant mountain.", SUM("Pakistan has four provinces", "Islamabad is the capital", "The Indus river flows from the mountains to the sea", "K2 is a giant mountain")),
    GLOSS({ Pakistan: "Our country, in the continent of Asia.", Islamabad: "The capital city of Pakistan.", provinces: "The big parts that a country is split into.", Indus: "A very long river in Pakistan.", K2: "A giant mountain in the north of Pakistan." }),
  ],
  mini: [
    mc("How many provinces does Pakistan have?", "4", ["2", "7"], { hint: "Punjab, Sindh, Khyber Pakhtunkhwa and Balochistan.", why: "Pakistan has four provinces." }),
    mc("Which of these is the capital city of our country?", "Islamabad", ["Peshawar", "Quetta"], { hint: "The leaders of Pakistan work there.", why: "Islamabad is the capital." }),
    tf("K2 is a river in Pakistan.", false, { hint: "K2 is very tall.", why: "K2 is a giant mountain, not a river." }),
    mc("Where does the Indus river end?", "In the Arabian Sea", ["In a desert", "In a mountain"], { hint: "It flows south.", why: "The Indus flows to the Arabian Sea." }),
  ],
};

const uk = {
  id: "uk", kind: "play", title: "The United Kingdom",
  blocks: [
    H("Stop 1: Four nations"),
    SAY("Now let us visit another country, far away from Pakistan. It is called the United Kingdom, or the UK. The UK is made of four parts, called nations. They are England, Scotland, Wales and Northern Ireland. The capital city of the UK is London. Each nation has its own capital too: Edinburgh in Scotland, Cardiff in Wales and Belfast in Northern Ireland.", T("The **United Kingdom** is made of four nations: England, Scotland, Wales and Northern Ireland.", "The capital city of the UK is **London**.")),
    MAP("The four nations",
      SS("Here is the United Kingdom. It is a group of islands in the north-west of Europe.", S("The UK is a group of islands.", P("sea", 85, 85, "Sea", "🌊", 3))),
      SS("In the north is Scotland. Its special animal is the unicorn! In the south is England. Its flower is the rose.", S("Scotland is in the north, England is in the south.", P("sc", 50, 20, "Scotland", "🦄", 3, "pulse"), P("en", 58, 62, "England", "🌹", 3, "pulse"), P("sea", 85, 85, "Sea", "🌊", 3))),
      SS("To the west is Wales. Its special animal is the red dragon! And across the sea is Northern Ireland.", S("Wales is in the west. Northern Ireland is across the sea.", P("sc", 50, 20, "Scotland", "🦄", 3), P("en", 58, 62, "England", "🌹", 3), P("wa", 30, 60, "Wales", "🐉", 3, "pulse"), P("ni", 14, 34, "Northern Ireland", "☘️", 3, "pulse"), P("sea", 85, 85, "Sea", "🌊", 3)))),
    CHK(mc("How many nations are in the United Kingdom?", "4", ["3", "7"], { hint: "England, Scotland, Wales and Northern Ireland.", why: "The UK has four nations." })),
    H("Stop 2: The UK and Pakistan"),
    SAY("How far is the UK from Pakistan? Quite far! A plane takes about nine hours to fly from Pakistan to London. The UK is in the continent of Europe, and Pakistan is in Asia. The UK is also often cooler and rainier than Pakistan, so people carry umbrellas and wear warm coats!", T("The UK is in Europe. Pakistan is in Asia.", "A plane takes about nine hours to fly from Pakistan to London.")),
    IMG("✈️", "A plane flies from Pakistan to the UK in about nine hours."),
    FACT("The UK is often rainy, so people carry an umbrella. Some Pakistani families live in the UK, and many love cricket in both places!"),
    CHK(tf("The UK is in the continent of Asia.", false, { hint: "Pakistan is in Asia. Where is the UK?", why: "The UK is in Europe." })),
    H("Stop 3: Brain game"),
    SAY("Time for a brain break! Find the matching pairs. You will see a unicorn, a dragon, a rose, a shamrock, a mosque and a mountain.", T("Turn over two cards at a time. Can you find all the pairs?")),
    BRAIN("memory_match", "Pairs from Pakistan and the UK", "Turn over two cards and find the pairs.", ["🦄", "🐉", "🌹", "☘️", "🕌", "🏔️"]),
    SAY("Let us remember. The UK has four nations, and London is its capital. The UK is in Europe.", SUM("The UK has four nations", "London is the capital of the UK", "The UK is in Europe, a long flight from Pakistan")),
    GLOSS({ "United Kingdom": "A country made of four nations: England, Scotland, Wales and Northern Ireland.", London: "The capital city of the United Kingdom.", nations: "The four parts that make up the UK." }),
  ],
  mini: [
    mc("What is the capital of the UK?", "London", ["Cardiff", "Islamabad"], { hint: "It has a famous clock tower called Big Ben.", why: "London is the capital of the UK." }),
    mc("Which nation is in the north of the UK?", "Scotland", ["Wales", "England"], { hint: "The unicorn nation.", why: "Scotland is in the north." }),
    tf("Wales is one of the four nations of the UK.", true, { hint: "Think of the red dragon.", why: "Wales is one of the four nations." }),
    mc("Which continent is the UK in?", "Europe", ["Asia", "Africa"], { hint: "Pakistan is in Asia.", why: "The UK is in Europe." }),
  ],
};

const continents = {
  id: "continents", kind: "use", title: "Continents and oceans",
  blocks: [
    H("Stop 1: Seven continents"),
    SAY("Now let us zoom out and look at the whole Earth. The land on Earth is split into seven huge areas called continents. They are Asia, Africa, North America, South America, Antarctica, Europe and Australia. Pakistan is in Asia. The United Kingdom is in Europe.", T("The land on Earth is split into seven **continents**.", "Pakistan is in **Asia**. The UK is in **Europe**.")),
    MAP("The seven continents",
      SS("This is our home, planet Earth. It is a big ball, turning slowly.", S("Planet Earth.", ["g", { kind: "globe" }, 50, 50, 3, "none"])),
      SS("The land is split into seven continents. Each has a special animal. A panda for Asia, a lion for Africa, a bison for North America, a llama for South America, a penguin for Antarctica, a castle for Europe, and a kangaroo for Australia.", S("Seven continents, seven pictures.", P("as", 70, 25, "Asia", "🐼", 2), P("af", 50, 50, "Africa", "🦁", 2), P("na", 20, 25, "North America", "🦬", 2), P("sa", 28, 70, "South America", "🦙", 2), P("an", 50, 90, "Antarctica", "🐧", 2), P("eu", 50, 12, "Europe", "🏰", 2), P("au", 82, 72, "Australia", "🦘", 2))),
      SS("Look at Asia. This is where we live. Pakistan is in Asia, with lots of other countries.", S("Pakistan is in Asia.", P("as", 70, 25, "Asia", "🐼", 3, "pulse"), P("pk", 60, 45, "Pakistan", "📍", 2, "bounce")))),
    CHK(mc("Which continent is Pakistan in?", "Asia", ["Africa", "Europe"], { hint: "It has a panda.", why: "Pakistan is in the continent of Asia." })),
    CHK(tf("There are seven continents.", true, { hint: "Count the animals: panda, lion, bison, llama, penguin, castle, kangaroo.", why: "There are seven continents." })),
    H("Stop 2: Five oceans"),
    SAY("Most of our planet is covered with water. The big areas of salty water are called oceans. There are five: the Pacific, the Atlantic, the Indian, the Southern and the Arctic. The Pacific Ocean is the biggest. Pakistan's coast is on the Arabian Sea, which is part of the Indian Ocean.", T("There are five **oceans**: Pacific, Atlantic, Indian, Southern and Arctic.", "The Pacific is the biggest ocean.")),
    IMG("🌊", "Oceans cover most of our planet."),
    CHK(mc("Which is the biggest ocean?", "The Pacific Ocean", ["The Arctic Ocean", "The Indian Ocean"], { hint: "It is the biggest of the five.", why: "The Pacific is the biggest ocean." })),
    H("Stop 3: Plan a journey"),
    SAY("Let us use what we know. Aisha lives in Pakistan and wants to visit her cousin in the UK. She will fly in a plane. Which continent does she start in? And which continent does she land in? Have a think, then tap to see.", T("Aisha flies from Pakistan to the UK.", "Which two continents does she travel between?")),
    IMG("🛫", "Aisha flies from Pakistan to the UK."),
    REVEAL("Which two continents does Aisha travel between?", "She flies from **Asia** to **Europe**. And did she cross any ocean? Not really! She flew over land and across seas."),
    SAY("Let us remember. There are seven continents and five oceans. Pakistan is in Asia and the UK is in Europe.", SUM("There are seven continents", "There are five oceans", "Pakistan is in Asia and the UK is in Europe")),
    GLOSS({ continents: "The seven huge areas of land on Earth.", Asia: "The biggest continent, where Pakistan is.", Europe: "The continent where the UK is.", oceans: "The five huge areas of salty water.", Pacific: "The biggest ocean.", "Pacific Ocean": "The biggest ocean." }),
  ],
  mini: [
    num0("How many oceans are there?", "5", ["3", "7"], "There are five oceans."),
    mc("Which continent is the UK in?", "Europe", ["Asia", "Antarctica"], { hint: "Aisha flew there from Asia.", why: "The UK is in Europe." }),
    mc("Where do penguins live?", "Antarctica", ["Africa", "Australia"], { hint: "It is very cold there.", why: "Penguins live in cold Antarctica." }),
    tf("Pakistan is a continent.", false, { hint: "Pakistan is inside Asia.", why: "Pakistan is a country in the continent of Asia." }),
  ],
};
function num0(prompt, right, wrongs, why) { return mc(prompt, right, wrongs, { hint: "Count them one by one.", why }); }

const ALTS1 = [
  [mc("Which one shows a place from above?", "A map", ["A song", "A recipe"], { hint: "It is a picture drawn from above.", why: "A map shows a place from above.", tag: "maps.what" }), mc("What would you use to find the way to the park?", "A map", ["A clock", "A spoon"], { hint: "It shows places from above.", why: "A map helps us find the way.", tag: "maps.what" })],
  [tf("The Sun sets in the east.", false, { hint: "It sets where it does not rise.", why: "The Sun sets in the west.", tag: "maps.sun" }), tf("North, east, south and west are the four main directions.", true, { hint: "Never Eat Soggy Waffles.", why: "Those are the four main directions.", tag: "maps.sun" })],
  [mc("Which direction is opposite to north?", "South", ["East", "West"], { hint: "Top and bottom of the compass.", why: "South is opposite north.", tag: "maps.direction" }), mc("Which direction is opposite to west?", "East", ["North", "South"], { hint: "Left and right of the compass.", why: "East is opposite west.", tag: "maps.direction" })],
  [ord("Put the directions in order going round, starting at east.", ["East", "South", "West", "North"], { hint: "Going round like a clock.", why: "After east comes south, then west, then north.", tag: "maps.order" }), ord("Put the directions in order going round, starting at south.", ["South", "West", "North", "East"], { hint: "Going round like a clock.", why: "After south comes west, then north, then east.", tag: "maps.order" })],
  [mc("Islamabad is the capital of which country?", "Pakistan", ["England", "Egypt"], { hint: "It is our country.", why: "Islamabad is the capital of Pakistan.", tag: "pakistan.capital" }), mc("Which city is Pakistan's capital: Peshawar, Islamabad or Quetta?", "Islamabad", ["Peshawar", "Quetta"], { hint: "It is in the north.", why: "Islamabad is the capital.", tag: "pakistan.capital" })],
  [ms("Pick the two names that are provinces in Pakistan.", ["Khyber Pakhtunkhwa", "Balochistan"], ["England", "Wales"], { hint: "They are parts of Pakistan.", why: "Khyber Pakhtunkhwa and Balochistan are provinces.", tag: "pakistan.provinces" }), ms("Which two are Pakistani provinces?", ["Punjab", "Sindh"], ["Scotland", "Northern Ireland"], { hint: "They are parts of Pakistan.", why: "Punjab and Sindh are provinces.", tag: "pakistan.provinces" })],
  [st("Which very long river flows through Pakistan to the Arabian Sea? Write its name.", ["indus", "the indus", "indus river", "river indus"], { hint: "Starts with I.", why: "The Indus is a long river.", tag: "pakistan.river" }), st("Name the giant mountain in Pakistan that is the second tallest in the world.", ["k2", "mount k2", "k 2"], { hint: "It is a letter and a number.", why: "K2 is the second tallest mountain.", tag: "pakistan.river" })],
  [mc("Anna sees a tiny tree on a map. How can she find out what it means?", "Look at the key", ["Ask the tree", "Turn the map upside down"], { hint: "The key explains the pictures.", why: "The key tells us what each picture means.", tag: "maps.key" }), mc("What is the job of a map key?", "It explains the pictures on the map", ["It shows the time", "It opens the map"], { hint: "Think of the little pictures.", why: "The key explains the pictures.", tag: "maps.key" })],
  [hot("Tap the continent where the UK is.", [["🌍", "Europe", 22, 50], ["🌏", "Asia", 50, 50], ["🌎", "North America", 78, 50]], ["Europe"], { labels: true, hint: "Aisha flew there from Asia.", why: "The UK is in Europe.", tag: "continents.where" }), hot("Tap the frozen continent where penguins live.", [["🐧", "Antarctica", 22, 50], ["🦁", "Africa", 50, 50], ["🐼", "Asia", 78, 50]], ["Antarctica"], { labels: true, hint: "It is the coldest place on Earth.", why: "Penguins live in Antarctica.", tag: "continents.where" })],
  [fill("Finish the sentences.", "Pakistan has {b1} provinces. Its capital city is {b2}.", [["4", "3", "7"], ["Islamabad", "Lahore", "London"]], { hint: "Think about the four provinces.", why: "Pakistan has four provinces. The capital is Islamabad.", tag: "uk.nations" }), fill("Finish the sentences about Scotland.", "The UK has {b1} nations. The capital of Scotland is {b2}.", [["4", "7", "2"], ["Edinburgh", "London", "Cardiff"]], { hint: "England, Scotland, Wales and Northern Ireland.", why: "The UK has four nations. Edinburgh is Scotland's capital.", tag: "uk.nations" })],
  [mat("Match each capital city to its nation.", [["London", "England"], ["Edinburgh", "Scotland"], ["Cardiff", "Wales"], ["Belfast", "Northern Ireland"]], { hint: "Each nation has its own capital.", why: "Each nation of the UK has its own capital.", tag: "uk.capitals" }), mat("Match three UK nations to their capital cities.", [["Scotland", "Edinburgh"], ["Wales", "Cardiff"], ["England", "London"]], { hint: "Each nation has its own capital.", why: "Each nation of the UK has its own capital.", tag: "uk.capitals" })],
  [sld("Slide to show how many oceans there are.", { min: 0, max: 12 }, 5, 0, { hint: "Pacific, Atlantic, Indian, Southern and Arctic.", why: "There are five oceans.", tag: "continents.count" }), sld("Slide to show how many main directions a compass has.", { min: 0, max: 12 }, 4, 0, { hint: "North, east, south and west.", why: "A compass has four main directions.", tag: "continents.count" })],
  [mc("Ruqayya lives in Pakistan. Her pen friend lives in the UK. Which continents do they live in?", "Asia and Europe", ["Africa and Asia", "Both in Europe"], { hint: "Pakistan is in Asia.", why: "Pakistan is in Asia and the UK is in Europe.", tag: "continents.reason" }), mc("Hamza lives in Africa. Aisha lives in Europe. Do they live in the same continent?", "No, they live in different continents", ["Yes, both live in Africa", "Yes, both live in Europe"], { hint: "Africa and Europe are two continents.", why: "Africa and Europe are different continents.", tag: "continents.reason" })],
  [mc("Zara says the UK is a continent. Is she right?", "No, the UK is a country in the continent of Europe", ["Yes, it is a continent", "No, it is an ocean"], { hint: "There are seven continents.", why: "The UK is a country in Europe.", tag: "continents.reason" }), mc("Bilal says Asia is a country. Is he right?", "No, Asia is a continent that holds many countries", ["Yes, it is a country", "No, it is an ocean"], { hint: "Pakistan is inside Asia.", why: "Asia is a continent with many countries.", tag: "continents.reason" })],
  [mc("Sam says England and the UK mean exactly the same. Who is right?", "England is one of four nations inside the UK", ["They are the same", "England is bigger than the UK"], { hint: "How many nations are in the UK?", why: "England is one of the four nations in the UK.", tag: "uk.reason" }), mc("Hana says Wales is a part of the UK. Is she right?", "Yes, Wales is one of the four nations of the UK", ["No, Wales is in Asia", "No, Wales is in Pakistan"], { hint: "Think of the red dragon.", why: "Wales is one of the four UK nations.", tag: "uk.reason" })],
];

const t1 = topicLesson({
  slug: "general-knowledge-class-1-where-in-the-world", subject: "general-knowledge", cls: 1, topic: 1, title: "Where in the World?",
  summary: "Maps and directions, our country Pakistan, the United Kingdom, and the continents and oceans of our planet.",
  unit: "Topic 1: Where in the world?", difficulty: 1,
  objectives: ["Read a simple map and use the four directions", "Name the provinces, capital and special places of Pakistan", "Name the four UK nations and their capitals", "Name the seven continents and five oceans"],
  success_criteria: ["I can use north, east, south and west", "I can say something about Pakistan and the UK", "I can name the continents and oceans"],
  real_life: "Finding the way on a map in the car, spotting the Sun in the east, and talking to family who live far away.",
  standards: [
    { framework: "nc_england", code: "KS1 geography", text: "Name and locate the world's continents and oceans, and the four countries of the United Kingdom and their capital cities" },
    { framework: "pk_ncc", code: "GK-01-D-01" }, { framework: "pk_ncc", code: "GK-01-D-03" },
    { framework: "pyp", code: "Where we are in place and time" },
  ],
  warm_up: [
    mc("How many days are in a week?", "7", ["5", "10"], { hint: "Monday to Sunday.", why: "There are seven days in a week." }),
    mc("What is the name of the planet we live on?", "Earth", ["Mars", "The Sun"], { hint: "It is our home.", why: "We live on planet Earth." }),
    tf("The Sun gives us light and heat.", true, { hint: "Think of a sunny day.", why: "The Sun gives us light and heat." }),
  ],
  intro: [
    H("Welcome, world explorer!"),
    SAY("Welcome, world explorer! Today we have a big question. Where in the world are we, and what is out there? We will learn to read a map, visit Pakistan and the United Kingdom, and zoom out to see the whole Earth. This is a game, not a test. Let's go!", T("Today's big question: where in the world are we?", "We will use maps to find out.")),
    IMG("🗺️", "A map helps us find places in the world."),
    GLOSS({ world: "All of the Earth and everything on it." }),
  ],
  subs: [maps, pakistan, uk, continents],
  quiz: [
    { q: mc("What do we call a picture of a place drawn as if we are looking from above?", "A map", ["A story", "A song"], { hint: "It shows places from above.", why: "A map shows a place from above.", tag: "maps.what" }), sub: "maps", depth: "recall" },
    { q: tf("The Sun rises in the west.", false, { hint: "Where does it come up in the morning?", why: "The Sun rises in the east.", tag: "maps.sun" }), sub: "maps", depth: "recall" },
    { q: mc("Which direction is opposite to east?", "West", ["North", "South"], { hint: "Look at the compass.", why: "West is opposite east.", tag: "maps.direction" }), sub: "maps", depth: "apply" },
    { q: ord("Put the directions in order going round, starting at north.", ["North", "East", "South", "West"], { hint: "Never Eat Soggy Waffles.", why: "The order is north, east, south, west.", tag: "maps.order" }), sub: "maps", depth: "apply" },
    { q: mc("Which city is the capital of Pakistan?", "Islamabad", ["Lahore", "Karachi"], { hint: "It is in the north.", why: "Islamabad is the capital.", tag: "pakistan.capital" }), sub: "pakistan", depth: "recall" },
    { q: ms("Which are provinces of Pakistan? Pick two.", ["Punjab", "Sindh"], ["Scotland", "Wales"], { hint: "They are parts of Pakistan.", why: "Punjab and Sindh are provinces.", tag: "pakistan.provinces" }), sub: "pakistan", depth: "apply" },
    { q: st("What is the long river in Pakistan that flows down to the sea? Write its name.", ["indus", "the indus", "indus river", "river indus"], { hint: "Starts with I.", why: "The Indus flows to the Arabian Sea.", tag: "pakistan.river" }), sub: "pakistan", depth: "apply" },
    { q: mc("Why does a map have a key?", "It tells us what the little pictures mean", ["It tells us the time", "It makes the map bigger"], { hint: "Think of the little pictures.", why: "The key explains the pictures.", tag: "maps.key" }), sub: "maps", depth: "reason" },
    { q: hot("Tap the continent where Pakistan is.", [["🌏", "Asia", 22, 50], ["🌍", "Africa", 50, 50], ["🌎", "South America", 78, 50]], ["Asia"], { labels: true, hint: "It is the biggest continent.", why: "Pakistan is in Asia.", tag: "continents.where" }), sub: "continents", depth: "apply" },
    { q: fill("Complete the sentences.", "The UK has {b1} nations. Its capital city is {b2}.", [["4", "3", "7"], ["London", "Cardiff", "Islamabad"]], { hint: "England, Scotland, Wales and Northern Ireland.", why: "The UK has four nations. London is the capital.", tag: "uk.nations" }), sub: "uk", depth: "apply" },
    { q: mat("Match each nation to its capital city.", [["England", "London"], ["Scotland", "Edinburgh"], ["Wales", "Cardiff"], ["Northern Ireland", "Belfast"]], { hint: "Each nation has its own capital.", why: "Each nation has its own capital city.", tag: "uk.capitals" }), sub: "uk", depth: "apply" },
    { q: sld("Slide to show how many continents there are.", { min: 0, max: 12 }, 7, 0, { hint: "Panda, lion, bison, llama, penguin, castle, kangaroo.", why: "There are seven continents.", tag: "continents.count" }), sub: "continents", depth: "recall" },
    { q: mc("Aisha flies from Pakistan to the UK. Which continents does she travel between?", "Asia and Europe", ["Africa and Asia", "Europe and Antarctica"], { hint: "Pakistan is in Asia.", why: "She flies from Asia to Europe.", tag: "continents.reason" }), sub: "continents", depth: "reason" },
    { q: mc("Zayd says Pakistan is a continent. Is he right?", "No, Pakistan is a country in the continent of Asia", ["Yes, it is a continent", "No, it is an ocean"], { hint: "There are seven continents.", why: "Pakistan is a country inside Asia.", tag: "continents.reason" }), sub: "continents", depth: "reason" },
    { q: mc("Fatima says Scotland and the UK are the same thing. Who is right?", "Scotland is one of four nations inside the UK", ["They are exactly the same", "Scotland is bigger than the UK"], { hint: "How many nations are in the UK?", why: "Scotland is one of the four nations of the UK.", tag: "uk.reason" }), sub: "uk", depth: "reason" },
  ].map((x, i) => ({ ...x, alts: ALTS1[i] })),
});

// ====================================================================================================
// Topic 2: Earth and sky
// ====================================================================================================

const sun = {
  id: "sun", kind: "learn", title: "The Sun and the planets",
  blocks: [
    H("Stop 1: Our star, the Sun"),
    SAY("Look up in the daytime and you will see the Sun. The Sun is a star. It is a giant, glowing ball of hot gas. It is much, much bigger than the Earth. The Sun gives us light and warmth. Without it, Earth would be dark and freezing. But remember, never look straight at the Sun, because it can hurt your eyes.", T("The **Sun** is a **star**. It gives us light and heat.", "The Sun is much bigger than the Earth.")),
    IMG("☀️", "The Sun is a star that gives us light and heat."),
    WARN("Never look straight at the Sun. It can hurt your eyes."),
    CHK(mc("What is the Sun?", "A star", ["A planet", "A cloud"], { hint: "It shines on its own.", why: "The Sun is a star." })),
    H("Stop 2: The eight planets"),
    SAY("Our Earth is a planet. A planet is a big round ball that goes around a star. Our Sun has eight planets going around it. In order from the Sun they are: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune. Earth is the third planet from the Sun. Jupiter is the biggest planet.", T("A **planet** is a big ball that goes around a star.", "There are **eight** planets that go around the Sun.", "Earth is the third planet from the Sun.")),
    SKY("The planets in order",
      SS("In the middle is the Sun. All the planets travel around it.", S("The Sun is in the middle.", ["sun", "☀️", 14, 50, 3, "pulse"])),
      SS("Close to the Sun are four small rocky planets. Mercury, Venus, Earth and Mars. Earth is our home.", S("The four planets closest to the Sun.", ["sun", "☀️", 14, 50, 3], P("me", 28, 50, "Mercury", "⚫", 1), P("ve", 40, 50, "Venus", "🟠", 1), P("ea", 52, 50, "Earth", "🌍", 2, "pulse"), P("ma", 64, 50, "Mars", "🔴", 1))),
      SS("Further away are the four giants. Jupiter is the biggest. Saturn has beautiful rings. Then Uranus and Neptune, far, far away.", S("The four giant planets are far away.", ["sun", "☀️", 14, 50, 3], P("me", 28, 50, "Mercury", "⚫", 1), P("ve", 40, 50, "Venus", "🟠", 1), P("ea", 52, 50, "Earth", "🌍", 2), P("ma", 64, 50, "Mars", "🔴", 1), P("ju", 72, 22, "Jupiter", "🟤", 3), P("sa", 82, 62, "Saturn", "🪐", 3), P("ur", 62, 82, "Uranus", "🔵", 2), P("ne", 90, 28, "Neptune", "🔷", 2)))),
    CHK(num_mc("Which planet do we live on?", "Earth", ["Mars", "Jupiter"], "We live on planet Earth.")),
    REVEAL("Which planet is the biggest?", "**Jupiter** is the biggest planet. It is so big that all the other planets could fit inside it!"),
    SAY("Let us remember. The Sun is a star. There are eight planets. Earth is the third planet.", SUM("The Sun is a star that gives us light and heat", "There are eight planets going around the Sun", "Earth is the third planet from the Sun")),
    GLOSS({ Sun: "The star in the middle of our solar system.", star: "A giant ball of hot, glowing gas, like the Sun.", planet: "A big round ball that goes around a star.", eight: "The number of planets that go around the Sun.", Earth: "The planet we live on." }),
  ],
  mini: [
    mc("What gives us light and heat in the day?", "The Sun", ["The Moon", "A planet"], { hint: "It is a star.", why: "The Sun gives us light and heat." }),
    mc("How many planets go around the Sun?", "8", ["5", "12"], { hint: "Mercury to Neptune.", why: "There are eight planets." }),
    mc("Which planet is third from the Sun?", "Earth", ["Mars", "Venus"], { hint: "It is our home.", why: "Earth is the third planet." }),
    tf("It is safe to look straight at the Sun.", false, { hint: "Think about your eyes.", why: "Looking straight at the Sun can hurt your eyes." }),
  ],
};
function num_mc(prompt, right, wrongs, why) { return mc(prompt, right, wrongs, { hint: "Think about our home.", why }); }

const daynight = {
  id: "daynight", kind: "try", title: "Day and night",
  blocks: [
    H("Stop 1: Why do we have day and night?"),
    SAY("Why is it light in the day and dark at night? The Earth is always spinning, like a top. It takes about twenty-four hours, one whole day, to spin all the way round. The side of the Earth facing the Sun has daytime. The side turned away from the Sun has night time. As Earth spins, our side moves into the light, and then back into the dark.", T("The Earth **spins** round once every 24 hours.", "The side facing the Sun has **day**. The side turned away has **night**.")),
    SKY("Earth spins",
      SS("Here is the Earth, with the Sun on the left. Watch it spin slowly. This is morning, and our side is just coming into the light.", S("Morning: our side meets the light.", ["se", { kind: "sun_earth", value: 6 }, 50, 50, 3, "none"])),
      SS("Now it is noon. Our side faces the Sun. It is the middle of the day!", S("Noon: our side faces the Sun.", ["se", { kind: "sun_earth", value: 12 }, 50, 50, 3, "none"])),
      SS("The Earth keeps spinning. Now our side is turning away from the Sun. The evening is here.", S("Evening: our side turns away.", ["se", { kind: "sun_earth", value: 18 }, 50, 50, 3, "none"])),
      SS("Now it is the middle of the night. Our side is facing away from the Sun. Everything is dark. By morning, the Earth will have spun round again.", S("Night: our side faces away from the Sun.", ["se", { kind: "sun_earth", value: 24 }, 50, 50, 3, "none"]))),
    CHK(mc("What makes day and night?", "The Earth spinning", ["The Sun going out", "The Moon covering the Sun"], { hint: "Think of a spinning top.", why: "Day and night happen because the Earth spins." })),
    H("Stop 2: The Sun's journey across the sky"),
    SAY("Here is something to notice. In the morning, the Sun rises in the east. At lunchtime, it is high in the sky. Then in the evening, it sets in the west. Of course, it is really the Earth that is spinning. Shadows change too. In the morning and evening your shadow is long. At noon, when the Sun is high, it is short.", T("The Sun **rises** in the east and **sets** in the west.", "Your shadow is long in the morning and evening, and short at noon.")),
    IMG("🌅", "The Sun rises in the east in the morning and sets in the west in the evening."),
    ACT("Torch and ball day and night", ["A torch", "A ball or an orange", "A sticker", "A dark room"], ["Stick the sticker on the ball. The sticker is you!", "Shine the torch on the ball. That torch is the Sun.", "Slowly turn the ball. Is it day or night at your sticker?", "Turn until your sticker moves out of the light. That is night time!"]),
    CHK(tf("Your shadow is short at noon.", true, { hint: "The Sun is high in the sky at noon.", why: "When the Sun is high, shadows are short." })),
    SAY("Let us remember. The Earth spins. When our side faces the Sun it is day, and when it faces away it is night.", SUM("The Earth spins once every 24 hours", "The side facing the Sun has day", "The side facing away has night", "The Sun rises in the east and sets in the west")),
    GLOSS({ spins: "Turns round and round.", day: "The time when our side of the Earth faces the Sun.", night: "The time when our side of the Earth faces away from the Sun.", rises: "Comes up. The Sun rises in the east.", sets: "Goes down. The Sun sets in the west." }),
  ],
  mini: [
    mc("How long does the Earth take to spin round once?", "About 24 hours", ["About 1 hour", "About 1 week"], { hint: "It is one whole day.", why: "One spin takes about 24 hours." }),
    mc("When our side of Earth faces away from the Sun, it is...", "Night", ["Day", "Noon"], { hint: "It is dark.", why: "Facing away from the Sun means night." }),
    tf("The Sun sets in the west.", true, { hint: "It rises in the east.", why: "The Sun sets in the west." }),
    mc("When is your shadow longest?", "In the morning and evening", ["At noon", "At midnight"], { hint: "The Sun is low then.", why: "Shadows are long when the Sun is low." }),
  ],
};

const moon = {
  id: "moon", kind: "play", title: "The Moon's shapes",
  blocks: [
    H("Stop 1: Our Moon"),
    SAY("At night we can often see the Moon. The Moon is not a star, and it is not a planet. It is a giant ball of rock that travels around the Earth. The Moon does not make its own light. It looks bright because it bounces back light from the Sun, like a mirror.", T("The **Moon** is a ball of rock that goes around the Earth.", "The Moon does not make its own light. It reflects light from the Sun.")),
    SKY("The Moon shines",
      SS("Here is the Sun, the Earth and the Moon. The Moon travels around the Earth.", S("The Moon goes around the Earth.", ["su", "☀️", 12, 50, 3, "pulse"], ["ea", "🌍", 55, 50, 3], ["mo", "🌕", 80, 30, 1, "float"])),
      SS("The Sun lights up one half of the Moon, like a torch lighting a ball. That is why the Moon seems to shine.", S("The Sun lights half of the Moon.", ["su", "☀️", 12, 50, 3, "pulse"], ["ea", "🌍", 55, 50, 3], ["mo", "🌓", 80, 30, 1], ["ar", "➡️", 40, 40, 1, "float"]))),
    CHK(tf("The Moon makes its own light.", false, { hint: "It reflects light from the Sun.", why: "The Moon reflects the light of the Sun." })),
    H("Stop 2: The Moon changes shape"),
    SAY("Have you ever noticed that the Moon looks different on different nights? Some nights it is a thin curve, called a crescent. Some nights it is half. Some nights it is a big full circle, called a full moon. And on one night it is dark and we cannot see it at all, called a new moon. The Moon goes through all its shapes in about one month.", T("The Moon looks different shapes: **new moon**, **crescent**, half moon and **full moon**.", "It goes through all its shapes in about one month.")),
    SKY("The shapes of the Moon",
      SS("It starts as a new moon. The Moon is there, but we cannot see it because its lit side faces away from us.", S("New moon: we cannot see it.", ["m", "🌑", 50, 50, 3, "none", "New moon"])),
      SS("A few days later we see a thin curve of light. This is a crescent moon. It is getting bigger.", S("A crescent moon.", ["m", "🌒", 50, 50, 3, "grow", "Crescent"])),
      SS("A week later it is half lit, like a half moon.", S("A half moon.", ["m", "🌓", 50, 50, 3, "none", "Half moon"])),
      SS("Soon it is a big bright circle. This is a full moon!", S("A full moon.", ["m", "🌕", 50, 50, 3, "pulse", "Full moon"])),
      SS("Then it shrinks again, back to a thin crescent, and then a new moon. And it starts all over again.", S("Back to a thin crescent.", ["m", "🌘", 50, 50, 3, "none", "Crescent again"]))),
    CHK(mc("What do we call a big, bright, round Moon?", "A full moon", ["A new moon", "A crescent"], { hint: "It is completely lit.", why: "A big round Moon is a full moon." })),
    H("Stop 3: Brain game"),
    SAY("Time for a brain break! Find the matching pairs of moons and stars.", T("Turn over two cards at a time. Can you find all the pairs?")),
    BRAIN("memory_match", "Moon and sky pairs", "Find the matching pairs.", ["🌑", "🌒", "🌓", "🌕", "⭐", "🪐"]),
    SAY("Let us remember. The Moon goes around the Earth. It reflects the Sun's light. It looks like a different shape through the month.", SUM("The Moon goes around the Earth", "The Moon reflects light from the Sun", "It looks like a crescent, a half moon or a full moon, and takes about a month to change")),
    GLOSS({ Moon: "A ball of rock that goes around the Earth.", reflects: "Bounces light back, like a mirror.", "new moon": "When the Moon is dark and we cannot see it.", crescent: "A thin curve of light on the Moon.", "full moon": "When the whole Moon is bright and round." }),
  ],
  mini: [
    mc("What is the Moon?", "A ball of rock that goes around the Earth", ["A star", "A cloud"], { hint: "It travels around us.", why: "The Moon is a ball of rock that goes around the Earth." }),
    mc("Why does the Moon look bright?", "It reflects light from the Sun", ["It makes its own light", "It is a big torch"], { hint: "Think of a mirror.", why: "The Moon reflects the Sun's light." }),
    mc("What shape is a thin curve of light on the Moon?", "A crescent", ["A full moon", "A new moon"], { hint: "It looks like a smile.", why: "A thin curve is a crescent." }),
    tf("The Moon is in the sky for a whole month before it changes shape.", false, { hint: "The Moon changes a little each night.", why: "The Moon changes a little every night, and goes through all its shapes in about a month." }),
  ],
};

const months = {
  id: "months", kind: "use", title: "The Islamic months",
  blocks: [
    H("Stop 1: A calendar that follows the Moon"),
    SAY("Muslims use a special calendar called the Islamic calendar. It follows the Moon. It has twelve months. Each month has twenty-nine or thirty days. A new month starts when the new crescent moon is seen in the sky. That is why people look at the sky when a month is about to end.", T("The **Islamic calendar** follows the Moon and has twelve months.", "A new month starts when the new **crescent** moon is seen.")),
    IMG("🌙", "A new month begins when the new crescent moon is seen."),
    CHK(num_mc2("How many months are in the Islamic calendar?", "12", ["7", "30"], "There are twelve Islamic months.")),
    H("Stop 2: The twelve months"),
    SAY("Here are the twelve Islamic months in order. The first month is Muharram. The ninth month is Ramadan, the month of fasting. The tenth month is Shawwal. Eid ul-Fitr is on the first day of Shawwal. The twelfth month is Dhul Hijjah, when the Hajj happens, and Eid ul-Adha is in this month.", T("**Muharram** is the first month. **Ramadan** is the ninth month.", "Eid ul-Fitr is at the start of Shawwal. Eid ul-Adha is in Dhul Hijjah, the twelfth month.")),
    SAY("Here are the first six months. Muharram, Safar, Rabi al-Awwal, Rabi al-Thani, Jumada al-Awwal and Jumada al-Thani.", TABLE("The Islamic months, 1 to 6", [["Muharram", 1], ["Safar", 2], ["Rabi al-Awwal", 3], ["Rabi al-Thani", 4], ["Jumada al-Awwal", 5], ["Jumada al-Thani", 6]], "The first six months in order.")),
    SAY("And the last six. Rajab, Shaban, Ramadan, Shawwal, Dhul Qadah and Dhul Hijjah.", TABLE("The Islamic months, 7 to 12", [["Rajab", 7], ["Shaban", 8], ["Ramadan", 9], ["Shawwal", 10], ["Dhul Qadah", 11], ["Dhul Hijjah", 12]], "The last six months in order. Ramadan is month 9.")),
    CHK(mc("Which is the first Islamic month?", "Muharram", ["Ramadan", "Shawwal"], { hint: "It starts the Islamic year.", why: "Muharram is the first month." })),
    H("Stop 3: Why we look for the crescent"),
    SAY("Why do families go outside to look for the new crescent? Because it tells us a new month is starting. At the end of Shaban, people look for the new crescent to see if Ramadan has begun. And at the end of Ramadan, they look for the new crescent to see if it is Eid! Let us think about it.", T("People look for the new crescent to know when a month begins.")),
    IMG("🌒", "A new crescent moon shows that a new month is beginning."),
    REVEAL("Why do people look for the new crescent moon at the end of a month?", "Because the new crescent moon shows that a **new Islamic month** is about to begin."),
    SAY("Let us remember. The Islamic calendar follows the Moon. It has twelve months. Ramadan is the ninth month.", SUM("The Islamic calendar follows the Moon", "It has twelve months of 29 or 30 days", "A new month begins when the new crescent is seen", "Ramadan is the ninth month")),
    GLOSS({ "Islamic calendar": "A calendar that follows the Moon, with twelve months.", crescent: "A thin curve of light on the Moon.", Muharram: "The first month of the Islamic calendar.", Ramadan: "The ninth Islamic month, the month of fasting.", "new Islamic month": "A month that starts when the new crescent is seen." }),
  ],
  mini: [
    mc("What does the Islamic calendar follow?", "The Moon", ["The Sun", "The planets"], { hint: "Think about the crescent.", why: "The Islamic calendar follows the Moon." }),
    mc("Which month is the ninth Islamic month?", "Ramadan", ["Safar", "Rajab"], { hint: "It is the month of fasting.", why: "Ramadan is the ninth month." }),
    tf("A new month begins when the new crescent moon is seen.", true, { hint: "It is how a month starts.", why: "A new Islamic month begins when the new crescent is seen." }),
    mc("How many days does an Islamic month have?", "29 or 30", ["7 or 8", "60"], { hint: "It follows the Moon, about one month.", why: "A month has 29 or 30 days." }),
  ],
};
function num_mc2(prompt, right, wrongs, why) { return mc(prompt, right, wrongs, { hint: "Count the months.", why }); }

const ALTS2 = [
  [mc("What gives us light in the daytime?", "A star called the Sun", ["The Moon", "A planet"], { hint: "It is a star.", why: "The Sun is the star that lights our day.", tag: "sun.what" }), mc("Which of these is a star?", "The Sun", ["The Moon", "Earth"], { hint: "It shines on its own.", why: "The Sun is a star.", tag: "sun.what" })],
  [sld("Slide to show how many planets there are in our solar system.", { min: 0, max: 12 }, 8, 0, { hint: "Mercury to Neptune.", why: "There are eight planets.", tag: "sun.count" }), sld("Slide to show how many planets are closer to the Sun than Earth.", { min: 0, max: 12 }, 2, 0, { hint: "Mercury and Venus come first.", why: "Mercury and Venus are closer than Earth.", tag: "sun.count" })],
  [mc("Omar says Earth is a star like the Sun. Is he right?", "No, Earth is a planet that goes around the Sun", ["Yes, Earth is a star", "No, Earth is a moon"], { hint: "Earth does not make its own light.", why: "Earth is a planet.", tag: "sun.reason" }), mc("Aisha says the Sun is a planet. Is she right?", "No, the Sun is a star", ["Yes, it is a planet", "No, it is a moon"], { hint: "The Sun gives out its own light.", why: "The Sun is a star.", tag: "sun.reason" })],
  [ord("Order these planets, starting with the one closest to the Sun.", ["Venus", "Earth", "Mars", "Jupiter"], { hint: "Earth is third.", why: "Venus, Earth, Mars, Jupiter, going outwards.", tag: "sun.order" }), ord("Order these planets from nearest to the Sun.", ["Mercury", "Venus", "Earth", "Mars"], { hint: "Mercury is the closest.", why: "Mercury, Venus, Earth, Mars.", tag: "sun.order" })],
  [tf("Night happens on the side of Earth facing away from the Sun.", true, { hint: "That side is dark.", why: "The side facing away from the Sun has night.", tag: "daynight.what" }), tf("It is day on the side of Earth turned away from the Sun.", false, { hint: "That side is dark.", why: "The side turned away has night.", tag: "daynight.what" })],
  [mc("Why do we have night time?", "Our side of the Earth turns away from the Sun", ["The Sun goes out", "A cloud covers the Sun"], { hint: "Think of the spinning Earth.", why: "Our side turns away from the Sun.", tag: "daynight.why" }), mc("What spins round to give us day and night?", "The Earth", ["The Sun", "The Moon"], { hint: "It spins like a top.", why: "The Earth spins.", tag: "daynight.why" })],
  [hot("Tap the picture that shows night time.", [["🌅", "Sunrise", 22, 50], ["🌌", "Dark sky with stars", 50, 50], ["🌞", "Bright midday Sun", 78, 50]], ["Dark sky with stars"], { labels: true, hint: "It is dark.", why: "Stars in a dark sky mean night.", tag: "daynight.pic" }), hot("Tap the picture that shows daytime.", [["🌞", "Bright Sun in the sky", 22, 50], ["🌙", "Crescent moon at night", 50, 50], ["⭐", "Stars twinkling", 78, 50]], ["Bright Sun in the sky"], { labels: true, hint: "The Sun is up.", why: "A bright Sun means day.", tag: "daynight.pic" })],
  [st("In which direction does the Sun set? Write one word.", ["west", "the west"], { hint: "Opposite to east.", why: "The Sun sets in the west.", tag: "daynight.east" }), st("From which direction does the Sun come up in the morning? Write one word.", ["east", "the east"], { hint: "Never Eat Soggy Waffles.", why: "The Sun rises in the east.", tag: "daynight.east" })],
  [mc("Why can we see the Moon shine in the night sky?", "It reflects light from the Sun", ["It is a very big star", "It makes its own light"], { hint: "Think of a mirror.", why: "The Moon reflects the Sun's light.", tag: "moon.light" }), mc("Where does the light of the Moon come from?", "From the Sun", ["From the Earth", "From the planets"], { hint: "The Moon is like a mirror.", why: "The Moon reflects sunlight.", tag: "moon.light" })],
  [ord("Put the Moon shapes in order, from a thin crescent to full.", ["Crescent", "Half moon", "Bright round moon", "Full moon"], { hint: "It gets bigger each night.", why: "The Moon grows from a crescent to full.", tag: "moon.order" }), ord("Order the Moon shapes from the dark moon to a half moon.", ["New moon", "Thin crescent", "Fat crescent", "Half moon"], { hint: "It gets bigger each night.", why: "The Moon grows from new to half.", tag: "moon.order" })],
  [ms("Pick two true facts about the Moon.", ["It goes around the Earth", "It changes shape through the month"], ["It is a star", "It is a planet"], { hint: "Think of the shapes.", why: "The Moon goes around Earth and seems to change shape.", tag: "moon.facts" }), ms("Which two are true about the Moon?", ["It reflects light from the Sun", "It is a ball of rock"], ["It is made of fire", "It is bigger than Earth"], { hint: "It does not make its own light.", why: "The Moon is a rocky ball that reflects sunlight.", tag: "moon.facts" })],
  [fill("Finish the sentence.", "The Islamic calendar has {b1} months. A new month begins when we see the new {b2}.", [["12", "7", "30"], ["crescent", "Sun", "planet"]], { hint: "Count the months.", why: "There are 12 months, and a new one starts with the crescent.", tag: "months.what" }), fill("Finish the sentence about Ramadan.", "Each Islamic month has {b1} or 30 days. Ramadan is month number {b2}.", [["29", "7", "40"], ["9", "1", "12"]], { hint: "It follows the Moon.", why: "A month is 29 or 30 days. Ramadan is the ninth.", tag: "months.what" })],
  [mat("Match each month to its number.", [["Safar", "2nd month"], ["Rajab", "7th month"], ["Shaban", "8th month"], ["Dhul Qadah", "11th month"]], { hint: "Use the table of months.", why: "Safar is 2nd, Rajab 7th, Shaban 8th, Dhul Qadah 11th.", tag: "months.order" }), mat("Match each month to where it comes in the year.", [["Muharram", "1st month"], ["Ramadan", "9th month"], ["Shawwal", "10th month"]], { hint: "Use the table of months.", why: "Muharram is 1st, Ramadan 9th, Shawwal 10th.", tag: "months.order" })],
  [mc("Layla says day and night happen because the Sun goes around the Earth. Is she right?", "No, day and night happen because the Earth spins", ["Yes, the Sun goes around the Earth", "No, the Moon makes night"], { hint: "Think of the torch and ball.", why: "The Earth spins, so our side moves into the light and out of it.", tag: "daynight.reason" }), mc("Sami says it is night because the Sun stops shining. Is he right?", "No, our side of the Earth has turned away from the Sun", ["Yes, the Sun stops shining", "No, the Moon has switched it off"], { hint: "Think of the torch and ball.", why: "The Sun still shines. Our side turned away.", tag: "daynight.reason" })],
  [mc("Why do people look for the new crescent at the end of an Islamic month?", "It shows that a new month is starting", ["It makes the Sun rise", "It changes day into night"], { hint: "Remember the Islamic calendar.", why: "The new crescent shows a new month is starting.", tag: "months.reason" }), mc("Why do families look for the crescent at the end of Ramadan?", "To find out whether the next month, Shawwal, has begun", ["To find out the time", "To measure the Moon"], { hint: "Eid is the first day of Shawwal.", why: "The crescent tells us whether the new month has begun.", tag: "months.reason" })],
];

const t2 = topicLesson({
  slug: "general-knowledge-class-1-earth-and-sky", subject: "general-knowledge", cls: 1, topic: 2, title: "Earth and Sky",
  summary: "The Sun and planets, day and night, the shapes of the Moon, and the Islamic months.",
  unit: "Topic 2: Earth and sky", difficulty: 1,
  objectives: ["Say what the Sun and planets are", "Explain why we have day and night", "Describe the Moon's shapes", "Name some of the Islamic months and how a month begins"],
  success_criteria: ["I can say why we have day and night", "I can name the Sun, Earth and Moon and say what each one is", "I can say how an Islamic month begins"],
  real_life: "Watching the Sun set, looking for the new crescent before Ramadan and Eid, and noticing the Moon's shape from the window.",
  standards: [
    { framework: "pyp", code: "How the world works" },
    { framework: "pk_ncc", code: "GK-01-H" },
    { framework: "cambridge", code: "2ESs.01" },
  ],
  warm_up: [
    mc("Which direction does the Sun rise from?", "East", ["West", "South"], { hint: "Think of the morning.", why: "The Sun rises in the east." }),
    mc("How many continents are there?", "7", ["5", "10"], { hint: "Panda, lion, bison, llama, penguin, castle, kangaroo.", why: "There are seven continents." }),
    mc("In which continent is Pakistan?", "Asia", ["Europe", "Africa"], { hint: "It has a panda.", why: "Pakistan is in Asia." }),
  ],
  intro: [
    H("Welcome, sky watcher!"),
    SAY("Welcome, sky watcher! Today we have a big question. What is up there in the sky, and why do we have day and night? We will meet the Sun, the planets and the Moon, and learn how the Moon helps Muslims know when a new month begins. This is a game, not a test. Let's go!", T("Today's big question: what is in the sky, and why do we have day and night?", "We will meet the Sun, the planets and the Moon.")),
    IMG("🌌", "The Sun, planets and Moon are all in the sky."),
    GLOSS({ sky: "Everything we see above us when we look up." }),
  ],
  subs: [sun, daynight, moon, months],
  quiz: [
    { q: mc("What kind of thing is the Sun?", "A star", ["A planet", "A moon"], { hint: "It shines on its own.", why: "The Sun is a star.", tag: "sun.what" }), sub: "sun", depth: "recall" },
    { q: sld("Slide to show how many planets go around the Sun.", { min: 0, max: 12 }, 8, 0, { hint: "Mercury to Neptune.", why: "There are eight planets.", tag: "sun.count" }), sub: "sun", depth: "recall" },
    { q: mc("Zayd says Earth is a star like the Sun. Is he right?", "No, Earth is a planet that goes around the Sun", ["Yes, Earth is a star", "No, Earth is a moon"], { hint: "Earth does not make its own light.", why: "Earth is a planet.", tag: "sun.reason" }), sub: "sun", depth: "reason" },
    { q: ord("Put these planets in order, nearest to the Sun first.", ["Mercury", "Venus", "Earth", "Mars"], { hint: "Earth is third.", why: "Mercury, Venus, Earth, Mars.", tag: "sun.order" }), sub: "sun", depth: "apply" },
    { q: tf("Day happens on the side of Earth that faces the Sun.", true, { hint: "That side is light.", why: "The side facing the Sun has day.", tag: "daynight.what" }), sub: "daynight", depth: "recall" },
    { q: mc("Which of these causes day and night?", "The Earth spinning", ["The Sun going out", "The Moon hiding the Sun"], { hint: "Think of a spinning top.", why: "The Earth spins.", tag: "daynight.why" }), sub: "daynight", depth: "apply" },
    { q: hot("Tap the picture that shows night.", [["🌞", "Bright Sun at noon", 22, 50], ["🌙", "Moon and stars in a dark sky", 50, 50], ["🌈", "Rainbow", 78, 50]], ["Moon and stars in a dark sky"], { labels: true, hint: "It is dark.", why: "A dark sky with the Moon and stars means night.", tag: "daynight.pic" }), sub: "daynight", depth: "apply" },
    { q: st("In which direction does the Sun rise? Write one word.", ["east", "the east"], { hint: "Never Eat Soggy Waffles.", why: "The Sun rises in the east.", tag: "daynight.east" }), sub: "daynight", depth: "apply" },
    { q: mc("Why can we see the Moon shining at night?", "It reflects light from the Sun", ["It makes its own light", "It is a small star"], { hint: "Think of a mirror.", why: "The Moon reflects the Sun's light.", tag: "moon.light" }), sub: "moon", depth: "reason" },
    { q: ord("Put the Moon shapes in order, from new to full.", ["New moon", "Crescent", "Half moon", "Full moon"], { hint: "It grows brighter each night.", why: "The Moon grows from new to full.", tag: "moon.order" }), sub: "moon", depth: "apply" },
    { q: ms("Which are true about the Moon? Pick two.", ["It goes around the Earth", "It looks like different shapes during the month"], ["It is a star", "It makes its own light"], { hint: "Think about what you learnt.", why: "The Moon goes around the Earth and seems to change shape.", tag: "moon.facts" }), sub: "moon", depth: "apply" },
    { q: fill("Complete the sentence.", "The Islamic calendar has {b1} months. A new month begins when we see the new {b2}.", [["12", "7", "30"], ["crescent", "full moon", "planet"]], { hint: "Count the months.", why: "There are 12 months, and a new month starts with the crescent.", tag: "months.what" }), sub: "months", depth: "apply" },
    { q: mat("Match each month to its place in the year.", [["Muharram", "1st month"], ["Ramadan", "9th month"], ["Shawwal", "10th month"], ["Dhul Hijjah", "12th month"]], { hint: "Use the table of months.", why: "Muharram is first, Ramadan ninth, Shawwal tenth and Dhul Hijjah twelfth.", tag: "months.order" }), sub: "months", depth: "apply" },
    { q: mc("Aisha says we have day and night because the Sun goes around the Earth. Is she right?", "No, we have day and night because the Earth spins", ["Yes, the Sun goes around us", "No, the Moon switches the Sun off"], { hint: "Think of the torch and ball.", why: "The Earth spins, so our side moves in and out of the light.", tag: "daynight.reason" }), sub: "daynight", depth: "reason" },
    { q: mc("Why do Muslims look for the new crescent moon at the end of a month?", "It shows that a new Islamic month is starting", ["It makes the Sun rise", "It turns day into night"], { hint: "Remember the Islamic calendar.", why: "The new crescent shows a new month is starting.", tag: "months.reason" }), sub: "months", depth: "reason" },
  ].map((x, i) => ({ ...x, alts: ALTS2[i] })),
});

export const topics = [t1, t2];
