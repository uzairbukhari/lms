import { SAY, SS, H, T, IMG, FACT, REVEAL, ACT, BRAIN, SUM, CHK, BAR, TABLE, S, EXP, GLOSS, mc, ms, tf, st, ord, mat, fill, hot, sld, PHOTO } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// General Knowledge, Class 4 (Fatima, age 9). Topic lessons in format 3.0. Standards come from docs/CURRICULUM_V2.md.
// Distances, heights and sizes are rounded and stated as "about".
const SCENE = (title, backdrop, ...scenes) => ({ ...EXP(title, ...scenes), backdrop });
const P = (id, x, y, label, emoji, size = 2, anim = "none") => [id, emoji, x, y, size, anim, label];
const std = (code, text) => ({ framework: "nc_england", code, ...(text ? { text } : {}) });

// ====================================================================================================
// Topic 1: Pakistan and the UK
// ====================================================================================================

const MINAR = "general-knowledge-class-4-pakistan-and-the-uk-1-a7fa9b14.jpg";
const PEAKS = "general-knowledge-class-4-pakistan-and-the-uk-2-0a17ab3f.jpg";
const CASTLE = "general-knowledge-class-4-pakistan-and-the-uk-3-cd7ad33f.jpg";
const provinces = {
  id: "provinces", kind: "learn", title: "Provinces and cities",
  blocks: [
    H("Welcome, young geographer!"),
    SAY("Today we compare two countries. How are Pakistan and the United Kingdom alike and different?", T("Today's big question: how are Pakistan and the UK alike and different?")),
    SAY("This tower is the Minar-e-Pakistan in Lahore. It is one famous landmark of Pakistan.", PHOTO(MINAR, "A tall white tower rising behind a pool with blue sky and a Pakistani flag in the background", "The Minar-e-Pakistan in Lahore, a landmark of the country.", "Photo by Mixvid Creations on Unsplash")),
    H("Stop 1: Four provinces and a capital"),
    SAY("Pakistan is a big country in South Asia. It is divided into four provinces: Punjab, Sindh, Khyber Pakhtunkhwa and Balochistan. Each province has its own capital city, where its provincial government works. The capital of the whole country is Islamabad. It sits in its own small area, the Islamabad Capital Territory. Balochistan is the largest province by area, while Punjab has the most people.", T("Pakistan has four **provinces**: Punjab, Sindh, Khyber Pakhtunkhwa and Balochistan.", "The country's capital is **Islamabad**. Balochistan is the biggest province by area, and Punjab has the most people.")),
    SCENE("Pakistan's provinces and capitals", "map",
      SS("Here is Pakistan, with mountains in the north and the Arabian Sea in the south.", S("Pakistan: mountains in the north, sea in the south.", P("m", 70, 14, "Mountains", "🏔️", 2), P("s", 80, 86, "Arabian Sea", "🌊", 2))),
      SS("Balochistan is in the west and is the biggest province. Few people live there because much of the land is dry. Its capital is Quetta.", S("Balochistan, capital Quetta.", P("m", 70, 14, "Mountains", "🏔️", 2), P("s", 80, 86, "Arabian Sea", "🌊", 2), P("b", 25, 55, "Balochistan: Quetta", "🟫", 2, "pulse"))),
      SS("In the east is Punjab, the most crowded province. Its capital is Lahore. Sindh is in the south-east, with its capital Karachi, a big port by the sea.", S("Punjab, capital Lahore. Sindh, capital Karachi.", P("m", 70, 14, "Mountains", "🏔️", 2), P("s", 80, 86, "Arabian Sea", "🌊", 2), P("b", 20, 55, "Balochistan: Quetta", "🟫", 2), P("p", 68, 45, "Punjab: Lahore", "🟩", 2, "pulse"), P("sd", 45, 78, "Sindh: Karachi", "🟧", 2, "pulse"))),
      SS("And in the north-west is Khyber Pakhtunkhwa, with its capital Peshawar. In the north, Islamabad, our national capital, sits near the mountains.", S("Khyber Pakhtunkhwa, capital Peshawar. Islamabad is the national capital.", P("b", 15, 58, "Balochistan: Quetta", "🟫", 1), P("p", 78, 50, "Punjab: Lahore", "🟩", 1), P("sd", 50, 80, "Sindh: Karachi", "🟧", 1), P("kp", 45, 25, "Khyber Pakhtunkhwa: Peshawar", "🟦", 2, "pulse"), P("i", 72, 22, "Islamabad", "⭐", 2, "pulse")))),
    CHK(mc("Which city is the capital of the province of Sindh?", "Karachi", ["Lahore", "Quetta"], { hint: "It is a big port by the sea.", why: "Karachi is the capital of Sindh." })),
    H("Stop 2: Cities that matter"),
    SAY("Cities are where lots of people live and work. Karachi is Pakistan's largest city and its biggest port: ships carry goods in and out through it. Lahore is famous for its history, its gardens and the Badshahi Mosque. Peshawar is one of the oldest living cities in South Asia. Quetta sits high in the mountains and is known for its fruit. Pakistan is one of the most populated countries in the world, with more than 240 million people.", T("**Karachi** is the largest city and the main **port**. Lahore is famous for its history.", "Pakistan has more than 240 million people.")),
    IMG("🚢🕌🏔️", "Karachi is a port, Lahore has a famous mosque, and Quetta is high in the mountains."),
    CHK(mc("Why is Karachi important for trade?", "It is a port where ships bring goods in and out", ["It is the capital city", "It is in the mountains"], { hint: "Think about the sea.", why: "Karachi is on the coast, so ships carry goods in and out." })),
    SAY("Let us remember. Pakistan has four provinces, each with its own capital city, and Islamabad is the national capital.", SUM("Pakistan has four provinces: Punjab, Sindh, Khyber Pakhtunkhwa and Balochistan", "The capitals are Lahore, Karachi, Peshawar and Quetta, and Islamabad is the national capital", "Karachi is the biggest city and main port")),
    GLOSS({ provinces: "The big parts that a country is divided into.", Islamabad: "The capital city of Pakistan.", Karachi: "Pakistan's largest city and main port.", port: "A place on the coast where ships load and unload goods." }),
  ],
  mini: [
    mc("What is the capital city of Punjab?", "Lahore", ["Quetta", "Peshawar"], { hint: "It is famous for the Badshahi Mosque.", why: "Lahore is Punjab's capital." }),
    mc("Which province is the largest by area?", "Balochistan", ["Punjab", "Sindh"], { hint: "It is in the west and much of it is dry.", why: "Balochistan is the largest by area." }),
    tf("Islamabad is the capital of the whole country.", true, { hint: "It is where the national government works.", why: "Islamabad is the national capital." }),
    mc("Which province has the most people?", "Punjab", ["Balochistan", "Sindh"], { hint: "It is the most crowded province.", why: "Punjab has the most people." }),
  ],
};

const indus = {
  id: "indus", kind: "try", title: "The Indus and K2",
  blocks: [
    H("Stop 1: The mighty Indus"),
    SAY("The Indus is Pakistan's greatest river, about three thousand kilometres long. It begins high up in the mountains of Tibet, flows through Pakistan, and ends in the Arabian Sea. Along the way, other rivers join it. Its water grows wheat, rice and cotton on the dry plains. Long ago, one of the world's first cities grew up beside the Indus, at a place called Mohenjo-daro. You could say that the Indus is the lifeline of Pakistan.", T("The **Indus** is about 3,000 kilometres long. It begins in the mountains and ends in the Arabian Sea.", "Its water helps farmers grow crops on the dry **plains**.")),
    SCENE("The Indus's journey", "mountain",
      SS("High in the mountains, snow and ice melt and trickle together. This is where the river begins.", S("The river begins in the mountains.", P("m", 50, 16, "Mountains", "🏔️", 3), ["w", "💧", 50, 34, 1, "bounce"])),
      SS("As the river rushes downhill, it flows through valleys and picks up water from other rivers.", S("The river rushes downhill.", P("m", 50, 16, "Mountains", "🏔️", 2), ["w", "💧", 50, 54, 1, "bounce"], P("t", 82, 54, "Other rivers join", "💦", 1))),
      SS("On the plains the river slows down. Farmers use its water to grow wheat, rice and cotton.", S("Farmers use the water on the plains.", P("m", 50, 16, "Mountains", "🏔️", 2), ["w", "💧", 50, 72, 1, "bounce"], P("f", 22, 72, "Farms", "🌾", 2))),
      SS("At last the river reaches the Arabian Sea, near Karachi, and its journey ends.", S("The river reaches the sea.", P("m", 50, 14, "Mountains", "🏔️", 2), ["w", "💧", 50, 84, 1, "bounce"], P("s", 78, 84, "Arabian Sea", "🌊", 2)))),
    CHK(mc("What do farmers use water from the Indus for?", "Growing crops on the plains", ["Making mountains", "Building ships"], { hint: "Think about wheat, rice and cotton.", why: "The Indus brings water to farmland." })),
    H("Stop 2: K2, the savage mountain"),
    SAY("These jagged peaks lie in northern Pakistan. K2 is among them.", PHOTO(PEAKS, "Jagged grey mountain peaks with patches of snow under a cloudy blue sky", "Rugged peaks in the mountains of northern Pakistan.", "Photo by Deena Rehman on Unsplash")),
    SAY("In the far north of Pakistan stands a mountain range called the Karakoram. Its most famous peak is K2. It is 8,611 metres high, the second highest mountain on Earth after Mount Everest. K2 is very hard and dangerous to climb, so it has the nickname the Savage Mountain. Glaciers, which are rivers of ice, are found near K2, and when they melt they feed the Indus.", T("**K2** is 8,611 metres high, the second highest mountain on Earth.", "It stands in the **Karakoram** range. Melting **glaciers** feed the Indus.")),
    IMG("🏔️❄️", "K2 stands in the Karakoram mountains. Melting glaciers feed the Indus river."),
    ACT("Draw the Indus", ["A large sheet of paper", "Blue and brown pencils", "An atlas or map on a tablet"], ["Find the Indus on a map. Where does it begin? Where does it end?", "Draw the river as a long blue line from the mountains to the sea.", "Add K2, three farms, and the city of Karachi.", "Write one sentence about why the river matters."]),
    CHK(tf("The Indus river ends in the Arabian Sea.", true, { hint: "Think of the end of its journey.", why: "The Indus flows into the Arabian Sea." })),
    SAY("Let us remember. The Indus flows from the mountains to the Arabian Sea and brings water to farms. K2 is the second highest mountain on Earth.", SUM("The Indus flows from the mountains to the Arabian Sea", "Its water grows crops on the plains", "K2 in the Karakoram is the second highest mountain on Earth")),
    GLOSS({ Indus: "Pakistan's greatest river, which flows from the mountains to the Arabian Sea.", plains: "Wide, flat areas of land.", K2: "The second highest mountain on Earth, 8,611 metres high.", Karakoram: "A great mountain range in the north of Pakistan.", glaciers: "Slow rivers of ice." }),
  ],
  mini: [
    mc("Where does the Indus end?", "In the Arabian Sea", ["In a desert", "In the Karakoram"], { hint: "Think of Karachi.", why: "The Indus flows into the Arabian Sea." }),
    mc("How high is K2, to the nearest thousand metres?", "9,000 metres", ["3,000 metres", "20,000 metres"], { hint: "It is 8,611 metres.", why: "8,611 metres is about 9,000 metres." }),
    tf("K2 is the highest mountain on Earth.", false, { hint: "Mount Everest is higher.", why: "K2 is second highest, after Mount Everest." }),
    mc("What is a glacier?", "A slow river of ice", ["A fast river", "A kind of desert"], { hint: "It is found in cold mountains.", why: "A glacier is a river of ice that moves slowly." }),
  ],
};

const uk = {
  id: "uk", kind: "play", title: "The four UK nations",
  blocks: [
    H("Stop 1: England, Scotland, Wales and Northern Ireland"),
    SAY("This castle-style building stands on a hill in Edinburgh, the capital of Scotland.", PHOTO(CASTLE, "A stone castle-style building with round towers on a hill under a blue sky", "A castle-style building on a hill in Edinburgh, the capital of Scotland.", "Photo by Hannah Wright on Unsplash")),
    SAY("The United Kingdom, or the UK, is a country of four nations. They are England, Scotland, Wales and Northern Ireland. Each has its own capital: London, Edinburgh, Cardiff and Belfast. London, in England, is also the capital of the whole UK. It is built along the River Thames. About 68 million people live in the UK. England is by far the largest nation, and it has the most people.", T("The **United Kingdom** has four nations: England, Scotland, Wales and Northern Ireland.", "Their capitals are London, Edinburgh, Cardiff and Belfast.")),
    SCENE("The four nations", "map",
      SS("This is the island of Great Britain, with Ireland to its west. England is in the south and east of Great Britain.", S("England is in the south.", P("e", 58, 64, "England: London", "🌹", 2, "pulse"), P("sea", 85, 85, "North Sea", "🌊", 2))),
      SS("In the north is Scotland, with its capital Edinburgh. In the west of Great Britain is Wales, with its capital Cardiff.", S("Scotland is in the north, Wales in the west.", P("e", 58, 64, "England: London", "🌹", 1), P("sc", 50, 20, "Scotland: Edinburgh", "🦄", 2, "pulse"), P("w", 28, 62, "Wales: Cardiff", "🐉", 2, "pulse"), P("sea", 85, 85, "North Sea", "🌊", 2))),
      SS("Northern Ireland is on the island of Ireland, across the Irish Sea. Its capital is Belfast.", S("Northern Ireland: Belfast.", P("e", 62, 66, "England", "🌹", 1), P("sc", 52, 18, "Scotland", "🦄", 1), P("w", 30, 64, "Wales", "🐉", 1), P("n", 12, 38, "Northern Ireland: Belfast", "☘️", 2, "pulse"), P("sea", 85, 85, "North Sea", "🌊", 2)))),
    CHK(mc("Which city is the capital of Wales?", "Cardiff", ["Edinburgh", "Belfast"], { hint: "It begins with C.", why: "Cardiff is the capital of Wales." })),
    H("Stop 2: Mountains and rivers of the UK"),
    SAY("The UK is much smaller than Pakistan, so its mountains are lower too. The highest mountain in the UK is Ben Nevis, in Scotland, which is 1,345 metres high. The highest mountain in Wales is Snowdon, at about 1,085 metres. K2 in Pakistan is more than six times taller than Ben Nevis! The UK has plenty of rain, so it has many rivers, and the longest river is the Severn.", T("**Ben Nevis** in Scotland is the highest mountain in the UK, 1,345 metres.", "K2 is more than six times taller.")),
    IMG("⛰️🌧️", "Ben Nevis in Scotland is the highest mountain in the UK. The UK is often rainy."),
    CHK(tf("K2 is taller than Ben Nevis.", true, { hint: "Compare 8,611 metres with 1,345 metres.", why: "K2 is much taller." })),
    H("Stop 3: Brain game"),
    SAY("Time for a brain break. Find the matching pairs of things from Pakistan and the UK.", T("Turn over two cards at a time. Can you find all the pairs?")),
    BRAIN("memory_match", "Pakistan and the UK", "Find the matching pairs.", ["🌹", "🐉", "🦄", "☘️", "🏔️", "🚢", "🕌", "🌧️"]),
    SAY("Let us remember. The UK is made of four nations with four capitals. Its mountains are lower than the mountains in Pakistan.", SUM("The UK has four nations with their own capitals", "London is the capital of the UK and of England", "Ben Nevis, at 1,345 metres, is the UK's highest mountain")),
    GLOSS({ "United Kingdom": "A country made up of England, Scotland, Wales and Northern Ireland.", "Ben Nevis": "The highest mountain in the UK, in Scotland.", capital: "The main city of a country, nation or province, where its government works." }),
  ],
  mini: [
    mc("Which is the capital of Northern Ireland?", "Belfast", ["Cardiff", "London"], { hint: "It ends with fast.", why: "Belfast is the capital of Northern Ireland." }),
    mc("Where is Ben Nevis?", "Scotland", ["Wales", "England"], { hint: "The unicorn nation.", why: "Ben Nevis is in Scotland." }),
    tf("London is the capital of the whole UK.", true, { hint: "It is also England's capital.", why: "London is the UK's capital." }),
    mc("Which nation has the most people?", "England", ["Wales", "Scotland"], { hint: "It is the biggest nation.", why: "England has the most people." }),
  ],
};

const compare = {
  id: "compare", kind: "use", title: "Pakistan and the UK compared",
  blocks: [
    H("Stop 1: Size, people and weather"),
    SAY("Let us compare the two countries. Pakistan is about 880,000 square kilometres in area. The UK is about 245,000 square kilometres, so Pakistan is more than three times bigger. But the UK is not that small in people. About 68 million people live in the UK. Pakistan has more than 240 million. And the weather differs. The UK has a mild, rainy climate with cool summers. Much of Pakistan is hot and dry in summer, with cold winters in the mountains.", T("Pakistan is **bigger** than the UK, more than three times as large.", "The UK has a mild, rainy **climate**. Much of Pakistan is hot and dry in summer.")),
    BAR("People, in tens of millions", [["Pakistan", 24, "🇵🇰"], ["UK", 7, "🇬🇧"]], "Pakistan has more than 240 million people. The UK has about 68 million. Each unit is 10 million people."),
    CHK(mc("Which country has more people?", "Pakistan", ["The UK", "They have the same"], { hint: "Look at the bar chart.", why: "Pakistan has more than 240 million people; the UK has about 68 million." })),
    H("Stop 2: Time and travel"),
    SAY("The Earth turns, so the Sun reaches different countries at different times. In winter, Pakistan is five hours ahead of the UK. When it is noon in London, it is five o'clock in the afternoon in Islamabad. In summer, the UK moves its clocks one hour forward, so the difference is four hours. A flight from Pakistan to the UK takes about nine hours. Families who live in both countries have to think about this when they call each other!", T("In winter, Pakistan is five hours ahead of the UK.", "A flight takes about nine hours.")),
    SCENE("Noon in London", "plain",
      SS("It is twelve o'clock, noon, in London. Families are having lunch.", S("Noon in London.", ["c1", { kind: "clock", hour: 12, minute: 0 }, 50, 50, 3, "none", "London"])),
      SS("At the very same moment in Islamabad it is five o'clock in the afternoon. Five hours ahead!", S("5 o'clock in Islamabad.", ["c1", { kind: "clock", hour: 5, minute: 0 }, 50, 50, 3, "pulse", "Islamabad"]))),
    ACT("A call across the clocks", ["A pencil and paper", "A grown-up helper"], ["It is 9 a.m. in the UK in winter. What time is it in Pakistan?", "A cousin in the UK wants to call at 6 p.m. their time. What time is that in Pakistan?", "Is that a good time to call? Why or why not?"]),
    CHK(mc("It is 3 p.m. in the UK in winter. What time is it in Pakistan?", "8 p.m.", ["10 a.m.", "3 p.m."], { hint: "Add five hours.", why: "3 p.m. plus five hours is 8 p.m." })),
    SAY("Let us remember. Pakistan is bigger and has more people than the UK. The UK has a mild, rainy climate. In winter, Pakistan is five hours ahead.", SUM("Pakistan is more than three times bigger than the UK", "Pakistan has more people", "In winter Pakistan is five hours ahead of the UK")),
    GLOSS({ climate: "The usual weather of a place over many years.", bigger: "Larger in size.", "square kilometres": "A way to measure the area of land." }),
  ],
  mini: [
    mc("It is 10 a.m. in the UK in winter. What time is it in Pakistan?", "3 p.m.", ["5 a.m.", "10 p.m."], { hint: "Add five hours.", why: "10 a.m. plus five hours is 3 p.m." }),
    tf("The UK has a mild, rainy climate.", true, { hint: "Think about umbrellas.", why: "The UK is often mild and rainy." }),
    mc("About how long is a flight from Pakistan to the UK?", "9 hours", ["1 hour", "30 hours"], { hint: "It is a long flight.", why: "It takes about nine hours." }),
    mc("Pakistan is...", "Bigger than the UK", ["Smaller than the UK", "The same size as the UK"], { hint: "Compare 880,000 with 245,000.", why: "Pakistan is more than three times bigger." }),
  ],
};

const ALTS_C4_1 = [
  [mc("Which province is the biggest by area?", "Balochistan", ["Sindh", "Punjab"], { hint: "It is in the west.", why: "Balochistan is the biggest by area.", tag: "prov.size" }), mc("Which province is the largest in area but has few people?", "Balochistan", ["Punjab", "Khyber Pakhtunkhwa"], { hint: "Much of it is dry land.", why: "Balochistan is large but dry.", tag: "prov.size" })],
  [mat("Join each province to its provincial capital.", [["Punjab", "Lahore"], ["Sindh", "Karachi"], ["Khyber Pakhtunkhwa", "Peshawar"], ["Balochistan", "Quetta"]], { hint: "Each province has one.", why: "Lahore, Karachi, Peshawar and Quetta are provincial capitals.", tag: "prov.capitals" }), mat("Match each capital city to its province.", [["Quetta", "Balochistan"], ["Peshawar", "Khyber Pakhtunkhwa"], ["Karachi", "Sindh"], ["Lahore", "Punjab"]], { hint: "Each province has one.", why: "These are provincial capitals.", tag: "prov.capitals" })],
  [sld("Slide to show the height of K2 to the nearest thousand metres (in thousands).", { min: 0, max: 12 }, 9, 0, { hint: "K2 is 8,611 metres.", why: "8,611 is about 9,000 metres.", tag: "indus.k2" }), sld("Slide to show the height of Everest, 8,849 metres, to the nearest thousand (in thousands).", { min: 0, max: 12 }, 9, 0, { hint: "Round 8,849.", why: "About 9,000 metres.", tag: "indus.k2" })],
  [tf("The Indus river ends in the Arabian Sea near Karachi.", true, { hint: "Think of the end of its journey.", why: "It ends in the Arabian Sea.", tag: "indus.river" }), tf("The Indus begins in the desert.", false, { hint: "Where does snow melt?", why: "It begins in the high mountains.", tag: "indus.river" })],
  [st("Name the mountain range where K2 stands. Write one word.", ["karakoram", "the karakoram", "karakoram range"], { hint: "Starts with K.", why: "K2 is in the Karakoram.", tag: "indus.range" }), st("What do we call a slow river of ice found in mountains? Write one word.", ["glacier", "a glacier", "glaciers"], { hint: "It begins with G.", why: "A glacier is a slow river of ice.", tag: "indus.range" })],
  [fill("Complete the sentences.", "The Indus flows from the {b1} down to the {b2}.", [["mountains", "desert", "city"], ["Arabian Sea", "Pacific Ocean", "Atlantic Ocean"]], { hint: "Think of the Indus's journey.", why: "It flows from the mountains to the Arabian Sea.", tag: "indus.fill" }), fill("Fill in the gaps.", "Farmers on the {b1} use the river's {b2}.", [["plains", "peaks", "glaciers"], ["water", "ice", "sand"]], { hint: "Think about crops.", why: "Farmers on the plains use water.", tag: "indus.fill" })],
  [ord("Order these from the lowest to the highest.", ["Snowdon (about 1,085 m)", "Ben Nevis (1,345 m)", "K2 (8,611 m)"], { hint: "Compare the heights.", why: "1,085 is less than 1,345, which is less than 8,611.", tag: "uk.heights" }), ord("Arrange these mountains from the shortest to the tallest.", ["Ben Nevis (1,345 m)", "K2 (8,611 m)", "Everest (8,849 m)"], { hint: "Compare the heights.", why: "1,345 < 8,611 < 8,849.", tag: "uk.heights" })],
  [mat("Match each UK nation to its capital.", [["England", "London"], ["Scotland", "Edinburgh"], ["Wales", "Cardiff"], ["Northern Ireland", "Belfast"]], { hint: "Each has its own capital.", why: "Each nation has its own capital.", tag: "uk.capitals" }), mat("Match each capital to its nation.", [["Cardiff", "Wales"], ["Edinburgh", "Scotland"], ["Belfast", "Northern Ireland"], ["London", "England"]], { hint: "Each has its own capital.", why: "Each nation has its own capital.", tag: "uk.capitals" })],
  [ms("Which two are capital cities in the UK? Pick two.", ["Cardiff", "Edinburgh"], ["Lahore", "Quetta"], { hint: "Think about the UK nations.", why: "Cardiff and Edinburgh are capitals in the UK.", tag: "uk.pick" }), ms("Pick the two UK nations.", ["Wales", "Scotland"], ["Sindh", "Punjab"], { hint: "Think about the UK.", why: "Wales and Scotland are UK nations.", tag: "uk.pick" })],
  [hot("Tap the mountain that is the tallest in the whole UK.", [["⛰️", "Ben Nevis, Scotland", 22, 50], ["⛰️", "Snowdon, Wales", 50, 50], ["🏔️", "K2, Pakistan", 78, 50]], ["Ben Nevis, Scotland"], { labels: true, hint: "It is in the north of the UK.", why: "Ben Nevis is the UK's highest mountain.", tag: "uk.mountain" }), hot("Tap the mountain that is in Wales.", [["⛰️", "Snowdon", 22, 50], ["⛰️", "Ben Nevis", 50, 50], ["🏔️", "K2", 78, 50]], ["Snowdon"], { labels: true, hint: "Wales has a highest mountain too.", why: "Snowdon is the highest mountain in Wales.", tag: "uk.mountain" })],
  [mc("Ali says the UK is bigger than Pakistan because it has four nations. Is he right?", "No, Pakistan is more than three times bigger in area", ["Yes, four nations make it bigger", "No, they are the same size"], { hint: "Compare 245,000 and 880,000.", why: "Pakistan is much bigger in area.", tag: "compare.size" }), mc("Sara says Pakistan has fewer people than the UK. Is she right?", "No, Pakistan has many more people", ["Yes, the UK has more", "They have the same"], { hint: "Compare 240 million with 68 million.", why: "Pakistan has more people.", tag: "compare.size" })],
  [sld("Slide to show the winter time difference between Pakistan and the UK, in hours.", { min: 0, max: 12 }, 5, 0, { hint: "Noon in London is 5 p.m. in Islamabad.", why: "Pakistan is five hours ahead.", tag: "compare.time" }), sld("Slide to show how many hours Pakistan is ahead of the UK in the UK's summer time.", { min: 0, max: 12 }, 4, 0, { hint: "The UK moves its clocks forward one hour.", why: "The difference is four hours.", tag: "compare.time" })],
  [mc("Why are umbrellas so useful in the UK?", "It rains often in the UK's mild climate", ["It is always snowy", "It is a desert"], { hint: "Think about the weather.", why: "The UK has a mild, rainy climate.", tag: "compare.climate" }), mc("Why do UK summers feel cooler than summers in much of Pakistan?", "The UK has a milder climate", ["The UK is closer to the Equator", "The UK has no Sun"], { hint: "Think about climate.", why: "Much of Pakistan is hotter in summer.", tag: "compare.climate" })],
  [mc("Why is the Indus so important to Pakistani farmers?", "It brings water to dry land", ["It makes mountains", "It stops rain"], { hint: "Think about plains.", why: "The river's water is used to grow crops.", tag: "indus.reason" }), mc("Why has the Indus been called the lifeline of Pakistan?", "People and farms need its water", ["It is the shortest river", "It has no water"], { hint: "Think about farms and cities.", why: "People rely on the river's water.", tag: "indus.reason" })],
  [mc("Why is Karachi's place on the coast useful for trade?", "Ships bring goods in and out", ["It stops the sea", "It is in the mountains"], { hint: "Think of Karachi on the coast.", why: "Ports let ships carry goods in and out.", tag: "prov.reason" }), mc("Why does Pakistan have a port in the south?", "The south has a coast on the Arabian Sea", ["The south has mountains", "The south is far from the sea"], { hint: "Think of the map.", why: "Karachi is on the Arabian Sea.", tag: "prov.reason" })],
];

const clipC1 = {
  title: "Fatima compares two countries", backdrop: "map", caption: "Fatima compares Pakistan and the UK using maps, flags and time zones.",
  scenes: [
    { caption: "Two countries.", say: "Fatima puts two maps side by side. One is Pakistan and one is the UK.",
      items: [{ id: "f", emoji: "👧", label: "Fatima", x: 20, y: 60, size: 3 }, { id: "p", emoji: "🇵🇰", x: 50, y: 50, size: 3 }, { id: "u", emoji: "🇬🇧", x: 80, y: 50, size: 3 }] },
    { caption: "Provinces.", say: "Pakistan has four provinces, and Islamabad is the capital.",
      items: [{ id: "i", emoji: "🏛️", x: 50, y: 52, size: 3, anim: "pulse" }] },
    { caption: "Nations.", say: "The UK has four nations, and London is the capital.",
      items: [{ id: "l", emoji: "🕰️", x: 50, y: 52, size: 3, anim: "pulse" }] },
    { caption: "Mountains.", say: "K2 in Pakistan is far taller than Ben Nevis in Scotland.",
      items: [{ id: "k", emoji: "🏔️", x: 36, y: 46, size: 3 }, { id: "b", emoji: "⛰️", x: 70, y: 58, size: 2 }] },
    { caption: "Time.", say: "When it is noon in London, it is later in Lahore.",
      items: [{ id: "t", emoji: "⏰", x: 50, y: 50, size: 3, anim: "pulse" }] },
    { caption: "Coasts.", say: "The UK is smaller, but its winding coast is longer.",
      items: [{ id: "c", emoji: "🌊", x: 50, y: 56, size: 3, anim: "float" }] },
    { caption: "Links.", say: "Many families link the two countries through the Commonwealth.",
      items: [{ id: "h", emoji: "🤝", x: 50, y: 52, size: 3, anim: "bounce" }] },
    { caption: "Alike and different.", say: "Fatima sees that two countries can be alike and different.",
      items: [{ id: "w", emoji: "🌍", x: 50, y: 52, size: 3, effect: "sparkle" }] },
  ],
};

const t1 = topicLesson({
  slug: "general-knowledge-class-4-pakistan-and-the-uk", subject: "general-knowledge", cls: 4, topic: 1, title: "Pakistan and the UK",
  summary: "Pakistan's provinces and cities, the Indus and K2, the four UK nations, and how the two countries compare.",
  unit: "Topic 1: Pakistan and the UK", difficulty: 2,
  objectives: ["Name Pakistan's provinces, capitals and key places", "Name the four UK nations and their capitals", "Compare Pakistan and the UK in size, people, climate and time"],
  success_criteria: ["I can name the provinces and capitals of Pakistan", "I can name the UK nations and their capitals", "I can compare Pakistan and the UK"],
  real_life: "Calling family in another country, reading a map, and understanding why the weather and time differ.",
  standards: [std("KS2 locational knowledge", "Name and locate counties and cities of the United Kingdom, geographical regions and their identifying human and physical characteristics"), { framework: "pyp", code: "Where we are in place and time" }],
  warm_up: [
    mc("Which continent is Pakistan in?", "Asia", ["Europe", "Africa"], { hint: "It is the biggest continent.", why: "Pakistan is in Asia." }),
    mc("How many continents are there?", "7", ["5", "10"], { hint: "Asia, Africa, Europe, and more.", why: "There are seven." }),
    tf("A map shows a place as seen from above.", true, { hint: "Think of a bird's view.", why: "Maps show places from above." }),
  ],
  intro: [],
  subs: [provinces, indus, uk, compare],
  clip: clipC1,
  quiz: [
    { q: mc("Which Pakistani province covers the biggest area?", "Balochistan", ["Punjab", "Khyber Pakhtunkhwa"], { hint: "It is in the west.", why: "Balochistan is the largest by area.", tag: "prov.size" }), sub: "provinces", depth: "recall" },
    { q: mat("Match each province to its capital city.", [["Punjab", "Lahore"], ["Sindh", "Karachi"], ["Khyber Pakhtunkhwa", "Peshawar"], ["Balochistan", "Quetta"]], { hint: "Each province has one.", why: "These are the provincial capitals.", tag: "prov.capitals" }), sub: "provinces", depth: "apply" },
    { q: sld("Slide to show the height of K2 to the nearest thousand metres. Use thousands.", { min: 0, max: 12 }, 9, 0, { hint: "K2 is 8,611 metres.", why: "8,611 is about 9,000 metres.", tag: "indus.k2" }), sub: "indus", depth: "apply" },
    { q: tf("The Indus flows into the Arabian Sea.", true, { hint: "Think of the end of its journey.", why: "It ends in the Arabian Sea.", tag: "indus.river" }), sub: "indus", depth: "recall" },
    { q: st("In which mountain range does K2 stand? Write one word.", ["karakoram", "the karakoram", "karakoram range"], { hint: "Starts with K.", why: "K2 is in the Karakoram.", tag: "indus.range" }), sub: "indus", depth: "apply" },
    { q: fill("Complete the sentence.", "The Indus begins in the {b1} and ends in the {b2}.", [["mountains", "desert", "city"], ["Arabian Sea", "Pacific Ocean", "Atlantic Ocean"]], { hint: "Think of the journey.", why: "It begins in the mountains and ends in the Arabian Sea.", tag: "indus.fill" }), sub: "indus", depth: "apply" },
    { q: ord("Put these mountains in order, lowest first.", ["Snowdon", "Ben Nevis", "K2"], { hint: "Compare their heights.", why: "Snowdon is lowest, then Ben Nevis, then K2.", tag: "uk.heights" }), sub: "uk", depth: "apply" },
    { q: mat("Match each UK nation to its capital city.", [["England", "London"], ["Scotland", "Edinburgh"], ["Wales", "Cardiff"], ["Northern Ireland", "Belfast"]], { hint: "Each has its own capital.", why: "Each nation has its own capital.", tag: "uk.capitals" }), sub: "uk", depth: "apply" },
    { q: ms("Which are capital cities in the UK? Pick two.", ["Edinburgh", "Belfast"], ["Karachi", "Peshawar"], { hint: "Think about the UK nations.", why: "Edinburgh and Belfast are capitals in the UK.", tag: "uk.pick" }), sub: "uk", depth: "apply" },
    { q: hot("Tap the highest mountain in the UK.", [["⛰️", "Ben Nevis, Scotland", 22, 50], ["⛰️", "Snowdon, Wales", 50, 50], ["🏔️", "K2, Pakistan", 78, 50]], ["Ben Nevis, Scotland"], { labels: true, hint: "It is in Scotland.", why: "Ben Nevis is the UK's highest mountain.", tag: "uk.mountain" }), sub: "uk", depth: "apply" },
    { q: mc("Hamza says the UK is bigger than Pakistan because it has four nations. Is he right?", "No, Pakistan is more than three times bigger in area", ["Yes, four nations make it bigger", "No, they are the same size"], { hint: "Compare 245,000 and 880,000 square kilometres.", why: "Pakistan is much bigger in area.", tag: "compare.size" }), sub: "compare", depth: "reason" },
    { q: sld("Slide to show how many hours Pakistan is ahead of the UK in winter.", { min: 0, max: 12 }, 5, 0, { hint: "Noon in London is 5 p.m. in Islamabad.", why: "Pakistan is five hours ahead.", tag: "compare.time" }), sub: "compare", depth: "apply" },
    { q: mc("Why do people in the UK often carry umbrellas?", "It rains often in the UK's mild climate", ["It is always snowy", "It is a desert"], { hint: "Think about the weather.", why: "The UK has a mild, rainy climate.", tag: "compare.climate" }), sub: "compare", depth: "reason" },
    { q: mc("Why do farmers in Pakistan depend on the Indus?", "It brings water to dry land", ["It makes mountains", "It stops rain"], { hint: "Think of the plains.", why: "The river's water is used to grow crops.", tag: "indus.reason" }), sub: "indus", depth: "reason" },
    { q: mc("Why is a port city like Karachi useful to Pakistan?", "Ships bring goods in and out", ["It stops the sea", "It is in the mountains"], { hint: "Think of Karachi on the coast.", why: "Ports let ships carry goods in and out.", tag: "prov.reason" }), sub: "provinces", depth: "reason" },
    // ----- upgrade: 15 new mains (q16-q30), 1 variant each
    { q: sld("Slide to show how many main provinces Pakistan has.", { min: 0, max: 10 }, 4, 0, { hint: "Punjab, Sindh, Khyber Pakhtunkhwa and Balochistan.", why: "Pakistan has four main provinces.", tag: "pk.provinces" }), sub: "provinces", depth: "recall", alts: [sld("Slide to show how many main provinces and capital territories Pakistan has together, counting Islamabad Capital Territory.", { min: 0, max: 10 }, 5, 0, { hint: "Four provinces plus the capital territory.", why: "Four provinces and Islamabad Capital Territory make five.", tag: "pk.provinces" })] },
    { q: st("Write the name of the capital city of Northern Ireland. It starts with B.", ["belfast"], { hint: "It is on the east coast.", why: "Belfast is the capital of Northern Ireland.", tag: "uk.belfast" }), sub: "uk", depth: "recall", alts: [st("Write the name of the capital city of Wales. It starts with C.", ["cardiff"], { hint: "It is on the south coast.", why: "Cardiff is the capital of Wales.", tag: "uk.cardiff" })] },
    { q: mc("Imran says the UK and Great Britain mean exactly the same thing. Is he right?", "No, Great Britain is England, Scotland and Wales, and the UK also includes Northern Ireland", ["Yes, they are exactly the same", "Yes, because Britain is bigger"], { hint: "Count the nations.", why: "Great Britain is the island with England, Scotland and Wales. The UK adds Northern Ireland.", tag: "uk.reason.gb" }), sub: "uk", depth: "reason", alts: [mc("Zainab says Northern Ireland is part of Great Britain. Is she right?", "No, Northern Ireland is part of the UK but not part of the island of Great Britain", ["Yes, it is part of Great Britain", "Yes, it is in Wales"], { hint: "Which island is it on?", why: "Northern Ireland shares an island with the Republic of Ireland.", tag: "uk.reason.gb" })] },
    { q: hot("Tap the region in the far north of Pakistan, where K2 stands.", [["🏔️", "Gilgit-Baltistan", 22, 50], ["🏜️", "Sindh", 50, 50], ["🌾", "Punjab", 78, 50]], ["Gilgit-Baltistan"], { labels: true, hint: "Think of the Karakoram.", why: "K2 stands in Gilgit-Baltistan.", tag: "pk.gb" }), sub: "provinces", depth: "apply", alts: [hot("Tap the province that includes Karachi.", [["🏖️", "Sindh", 22, 50], ["🏔️", "Gilgit-Baltistan", 50, 50], ["🌲", "Khyber Pakhtunkhwa", 78, 50]], ["Sindh"], { labels: true, hint: "Karachi is on the coast.", why: "Karachi is in Sindh.", tag: "pk.gb" })] },
    { q: tf("Counties are areas that help organise local government in England.", true, { hint: "Think of Kent or Yorkshire.", why: "Counties organise local government in England.", tag: "uk.counties" }), sub: "uk", depth: "recall", alts: [tf("Counties are the same as countries.", false, { hint: "Think about size.", why: "Counties are parts of countries, not countries.", tag: "uk.counties" })] },
    { q: fill("Complete the sentence about summer time.", "In summer Pakistan is {b1} hours ahead of the UK, so 3 pm in London is {b2} in Lahore.", [["4", "5", "6"], ["7 pm", "6 pm", "8 pm"]], { hint: "The UK moves its clocks forward in summer.", why: "In summer Pakistan is four hours ahead, so 3 pm is 7 pm.", tag: "uk.time" }), sub: "compare", depth: "apply", alts: [fill("Complete the sentence about winter time.", "In winter Pakistan is {b1} hours ahead of the UK, so 3 pm in London is {b2} in Lahore.", [["5", "4", "6"], ["8 pm", "7 pm", "9 pm"]], { hint: "In winter the gap is larger.", why: "In winter Pakistan is five hours ahead, so 3 pm is 8 pm.", tag: "uk.time" })] },
    { q: mc("Rafay says a smaller country always has a shorter coastline. Is he right?", "No, the UK is smaller than Pakistan but has a much longer coastline because its coast is very winding", ["Yes, size decides the coast", "Yes, the UK has no coast"], { hint: "Think about the shape of the coast.", why: "A winding coast with many bays is longer.", tag: "uk.reason.coast" }), sub: "compare", depth: "reason", alts: [mc("Sana says an island country has no coast. Is she right?", "No, an island is surrounded by coast", ["Yes, islands have no coast", "Yes, islands are inland"], { hint: "Think about the sea around an island.", why: "Every island has a coast.", tag: "uk.reason.coast" })] },
    { q: ms("Pick two languages spoken in Pakistan.", ["Urdu", "Sindhi"], ["Welsh", "Scottish Gaelic"], { hint: "Think of the provinces.", why: "Urdu and Sindhi are spoken in Pakistan.", tag: "pk.languages" }), sub: "compare", depth: "apply", alts: [ms("Pick two languages native to the UK.", ["Welsh", "Scottish Gaelic"], ["Latin", "Ancient Greek"], { hint: "Think about Wales and Scotland.", why: "Welsh and Scottish Gaelic are native to the UK.", tag: "uk.languages" })] },
    { q: mat("Match each flag to its country or nation.", [["Green with a white crescent and star", "Pakistan"], ["Red, white and blue Union Flag", "United Kingdom"], ["A red dragon on green and white", "Wales"], ["A white diagonal cross on blue", "Scotland"]], { hint: "Think about each flag.", why: "Each flag belongs to its country or nation.", tag: "uk.flags" }), sub: "uk", depth: "apply", alts: [mat("Join each flag to its country or nation.", [["A red cross on white", "England"], ["Green with a white crescent and star", "Pakistan"], ["A red dragon on green and white", "Wales"], ["Red, white and blue Union Flag", "United Kingdom"]], { hint: "Think about each flag.", why: "Each flag belongs to its country or nation.", tag: "uk.flags" })] },
    { q: ord("Put these Pakistani cities in order from north to south.", ["Islamabad", "Lahore", "Multan", "Karachi"], { hint: "Islamabad is nearest the mountains.", why: "From north to south: Islamabad, Lahore, Multan, Karachi.", tag: "pk.cities" }), sub: "provinces", depth: "apply", alts: [ord("Put these UK cities in order from north to south.", ["Edinburgh", "Belfast", "Manchester", "London"], { hint: "Edinburgh is in Scotland.", why: "From north to south: Edinburgh, Belfast, Manchester, London.", tag: "uk.cities" })] },
    { q: sld("Lahore to Karachi is about 1,200 km. Slide to show the distance, to the nearest 100 km.", { min: 0, max: 2000 }, 1200, 100, { hint: "About one thousand two hundred.", why: "Lahore to Karachi is about 1,200 km.", tag: "pk.distance" }), sub: "compare", depth: "apply", alts: [sld("A return trip from Lahore to Karachi and back is about 2,400 km. Slide to show it, to the nearest 100 km.", { min: 0, max: 3000 }, 2400, 100, { hint: "Double 1,200.", why: "Twice 1,200 is 2,400.", tag: "pk.distance" })] },
    { q: mc("Pakistan and the UK are both members of which group of countries?", "The Commonwealth", ["The Arctic Council", "The Silk Road"], { hint: "It links many countries once linked to the British Empire.", why: "Both are members of the Commonwealth.", tag: "uk.commonwealth" }), sub: "compare", depth: "recall", alts: [mc("Which language is an official language in both Pakistan and the UK?", "English", ["Welsh", "Pashto"], { hint: "It is used in courts and offices.", why: "English is official in both.", tag: "uk.commonwealth" })] },
    { q: mc("Sana says Pakistan and the UK have the same weather all year. Is she right?", "No, Pakistan has hot summers and a monsoon, while the UK is cooler, with rain all year", ["Yes, they are the same", "Yes, both are tropical"], { hint: "Think about umbrellas in two seasons.", why: "Their climates are different.", tag: "uk.reason.weather" }), sub: "compare", depth: "reason", alts: [mc("Hamza says the UK is hotter than Pakistan in summer. Is he right?", "No, Pakistan's summers are usually much hotter", ["Yes, the UK is hotter", "Yes, they are the same"], { hint: "Think about Lahore in June.", why: "Pakistan has hotter summers than the UK.", tag: "uk.reason.weather" })] },
    { q: mc("Adeel says Pakistan has fewer people than the UK. Is he right?", "No, Pakistan has more than 240 million people, and the UK has about 68 million", ["Yes, the UK has more people", "Yes, they have the same number"], { hint: "Think about big cities in Pakistan.", why: "Pakistan has far more people than the UK.", tag: "uk.reason.pop" }), sub: "compare", depth: "reason", alts: [mc("Mira says the UK has a larger population than Pakistan because it has four nations. Is she right?", "No, Pakistan has many more people", ["Yes, because of four nations", "Yes, because London is big"], { hint: "Compare the millions.", why: "Pakistan has over 240 million people.", tag: "uk.reason.pop" })] },
    { q: mc("Tahir says people only move to another country for holidays. Is he right?", "No, people also move for work, study, family or safety", ["Yes, only for holidays", "Yes, nobody moves for work"], { hint: "Think about families who moved to the UK.", why: "People move for many reasons.", tag: "uk.reason.move" }), sub: "compare", depth: "reason", alts: [mc("Aliya says everyone who moves countries is on holiday. Is she right?", "No, many move to work or study", ["Yes, on holiday", "Yes, all on holiday"], { hint: "Think about students.", why: "People move for study and work.", tag: "uk.reason.move" })] },
  ].map((x, i) => ({ ...x, alts: x.alts ?? ALTS_C4_1[i] })),
});

// ====================================================================================================
// Topic 2: Our physical world
// ====================================================================================================

const MEANDER = "general-knowledge-class-4-our-physical-world-1-711e4bde.jpg";
const SNOWPEAKS = "general-knowledge-class-4-our-physical-world-2-1da14080.jpg";
const TUNDRA = "general-knowledge-class-4-our-physical-world-3-856f3534.jpg";
const rivers = {
  id: "rivers", kind: "learn", title: "Rivers",
  blocks: [
    H("Welcome, young geographer!"),
    SAY("Today we explore our physical world. How do rivers, mountains and climates shape our planet?", T("Today's big question: how do rivers, mountains and climate zones shape the Earth?")),
    SAY("This river winds through a valley in tight bends. Bends like these are called meanders.", PHOTO(MEANDER, "A river winding in tight bends through a green forested valley seen from above", "A river winds in meanders through a valley.", "Photo by vadim kaipov on Unsplash")),
    H("Stop 1: The journey of a river"),
    SAY("Every river has a journey from start to finish. It begins at a place called the source. This is often high in the hills, where rain falls or snow and ice melt. Smaller streams join to make a bigger river. A smaller river that joins a bigger one is called a tributary. Finally, the river reaches the sea, and the place where it meets the sea is called the mouth. Along its journey, a river carves valleys and carries soil and stones downstream.", T("A river begins at its **source** and ends at its **mouth**, where it meets the sea.", "A smaller river that joins a bigger one is called a **tributary**.")),
    SCENE("A river from source to mouth", "mountain",
      SS("The journey starts at the source, high in the mountains, where snow and rain trickle together.", S("The source of the river.", P("s", 50, 18, "Source", "🏔️", 3), ["w", "💧", 50, 36, 1, "bounce"])),
      SS("Downhill, a smaller stream joins the river. This is a tributary, and it adds more water.", S("A tributary joins the river.", P("s", 50, 14, "Source", "🏔️", 2), ["w", "💧", 50, 54, 1, "bounce"], P("t", 82, 54, "Tributary", "💦", 2, "pulse"))),
      SS("On the flat land the river grows wide and slow, and farms and towns grow beside it.", S("The river flows across the plain.", P("s", 50, 14, "Source", "🏔️", 2), ["w", "💧", 50, 72, 1, "bounce"], P("f", 22, 72, "Farms and towns", "🏘️", 2))),
      SS("At last the river reaches the sea. This is its mouth.", S("The mouth of the river.", P("s", 50, 12, "Source", "🏔️", 2), ["w", "💧", 50, 84, 1, "bounce"], P("m", 78, 84, "Mouth and sea", "🌊", 2, "pulse")))),
    CHK(mc("What do we call the place where a river meets the sea?", "The mouth", ["The source", "A tributary"], { hint: "It is the end of the journey.", why: "A river ends at its mouth." })),
    H("Stop 2: Why rivers matter"),
    SAY("People have always settled near rivers. Rivers give us water to drink and to grow crops. They are used for travel and for carrying goods. Rich soil, left behind when rivers flood, helps crops grow. The Indus, the Nile and the Thames all had cities beside them. But rivers can flood and be polluted too, so we must take care of them.", T("Rivers give water for **crops**, drinking and travel.", "Many cities were built beside rivers.")),
    IMG("🌾🚤🏘️", "Farms, boats and towns grow along rivers."),
    CHK(tf("People often build towns beside rivers.", true, { hint: "Think about water.", why: "Rivers give water, food and routes for travel." })),
    SAY("Let us remember. A river runs from its source to its mouth, and tributaries join it. Rivers give water and good soil.", SUM("A river runs from its source to its mouth", "A tributary is a smaller river that joins a bigger one", "People settle near rivers for water, soil and travel")),
    GLOSS({ source: "The place where a river begins.", mouth: "The place where a river meets the sea.", tributary: "A smaller river that flows into a bigger one.", crops: "Plants that farmers grow for food." }),
  ],
  mini: [
    mc("Where does a river begin?", "At its source", ["At its mouth", "At the sea"], { hint: "Often high in the hills.", why: "A river begins at its source." }),
    mc("What is a tributary?", "A smaller river that joins a bigger one", ["A kind of boat", "The end of a river"], { hint: "It adds water.", why: "A tributary flows into a bigger river." }),
    tf("A river ends at its mouth.", true, { hint: "Where it meets the sea.", why: "The mouth is where it meets the sea." }),
    mc("Why do farmers like to live near rivers?", "They have water for crops", ["Rivers stop the Sun", "Rivers make mountains"], { hint: "Think about plants.", why: "Rivers give water for crops." }),
  ],
};

const mountains = {
  id: "mountains", kind: "try", title: "Mountains",
  blocks: [
    H("Stop 1: How mountains are made"),
    SAY("Snowy peaks rise through the clouds. Tall mountains are cold at the top.", PHOTO(SNOWPEAKS, "Snow-capped mountain peaks rising through white clouds under a blue sky", "Snowy peaks rise through the clouds. Mountains are cold at the top.", "Photo by penta sathwik on Unsplash")),
    SAY("The Earth's surface is not one piece. It is broken into huge slabs called tectonic plates. They move very slowly, about as fast as your fingernails grow. Sometimes two plates push against each other. The land between them crumples and folds upwards, like a rug pushed from both ends. This makes fold mountains. The Himalaya and the Karakoram in the north of Pakistan formed this way, over millions of years.", T("The Earth's surface is made of huge **tectonic plates** that move very slowly.", "When plates push together, the land folds upwards into **fold mountains**.")),
    SCENE("Plates push, mountains rise", "plain",
      SS("Here are two plates of land, side by side.", S("Two plates, side by side.", P("a", 25, 62, "Plate A", "🟫", 3), P("b", 75, 62, "Plate B", "🟫", 3))),
      SS("They move towards each other, very slowly, and push together.", S("The plates push together.", P("a", 38, 62, "Plate A", "🟫", 3), P("b", 62, 62, "Plate B", "🟫", 3), ["arrow1", "➡️", 20, 40, 1, "pulse"], ["arrow2", "⬅️", 80, 40, 1, "pulse"])),
      SS("The land between them has nowhere to go but up. Over millions of years, it folds into mountains.", S("The land folds into mountains.", P("a", 38, 66, "Plate A", "🟫", 2), P("b", 62, 66, "Plate B", "🟫", 2), P("m", 50, 30, "Fold mountains", "🏔️", 3, "grow")))),
    ACT("Make fold mountains", ["A towel or a sheet of paper", "A flat table"], ["Lay the towel flat on the table. This is the Earth's surface.", "Put a hand on each end and slowly push your hands together.", "Watch what happens in the middle. The towel folds up into ridges!", "What would happen if you pushed for a million years?"]),
    CHK(mc("What happens when two plates push together?", "The land folds upwards", ["The land turns to sea", "The land becomes flat"], { hint: "Think of the towel.", why: "The land crumples and folds into mountains." })),
    H("Stop 2: Cold at the top"),
    SAY("Have you noticed that mountain tops are cold? The higher up we go, the colder the air becomes, about six degrees cooler for every thousand metres. The height of land above the sea is called altitude. That is why the tops of high mountains like K2 are covered in snow all year. This is true even in a hot country. And high up, the air is thin, so climbers need extra oxygen.", T("The higher the **altitude**, the colder it gets.", "The peaks of high mountains are snowy all year.")),
    IMG("🏔️🥶", "It gets colder as the altitude rises. The tops of high mountains are covered in snow."),
    CHK(tf("It is colder at the top of a mountain than at the bottom.", true, { hint: "Think about snow on peaks.", why: "Air gets colder with height." })),
    SAY("Let us remember. Fold mountains form when plates push together. It is colder at higher altitudes.", SUM("Tectonic plates move slowly", "Fold mountains form when plates push together", "It gets colder as altitude rises")),
    GLOSS({ "tectonic plates": "Huge slabs that make up the Earth's surface and move very slowly.", "fold mountains": "Mountains made when plates push land upwards in folds.", altitude: "The height of land above the sea." }),
  ],
  mini: [
    mc("What are tectonic plates?", "Huge slabs that make up the Earth's surface", ["Dinner plates", "Types of cloud"], { hint: "They move very slowly.", why: "Tectonic plates are huge pieces of the Earth's surface." }),
    mc("Which mountains formed from plates pushing together?", "The Karakoram", ["The Thar", "The Indus"], { hint: "They are in the north of Pakistan.", why: "The Karakoram is a fold mountain range." }),
    tf("Mountains get warmer as you go higher.", false, { hint: "Think about snow at the top.", why: "It gets colder as you go higher." }),
    mc("What is altitude?", "The height above the sea", ["The speed of wind", "A kind of rock"], { hint: "How high up a place is.", why: "Altitude is height above sea level." }),
  ],
};

const climate = {
  id: "climate", kind: "play", title: "Climate zones",
  blocks: [
    H("Stop 1: Four climates"),
    SAY("Weather changes from day to day, but climate is the usual weather of a place over many years. The Earth has different climate zones. Near the middle of the Earth, around a line called the equator, the Sun's rays shine most strongly. It is hot all year. This is the tropical zone. Some places are dry, with very little rain: these are deserts. Further north and south the climate is temperate, with mild weather and four seasons. And near the North and South Poles it is polar: bitterly cold.", T("**Climate** is the usual weather of a place over many years.", "The **equator** is the imaginary line round the middle of the Earth. Places near it are hot.")),
    SCENE("Four climate zones", "plain",
      SS("In the tropical zone near the equator, it is hot and often wet all year. A typical day is thirty degrees.", S("Tropical: hot all year.", ["t", { kind: "thermometer", value: 30, from: -30, to: 50 }, 50, 50, 3, "none", "Tropical"])),
      SS("In the desert zone, the days are very hot and it hardly ever rains. It can reach forty degrees.", S("Desert: very hot and dry.", ["t", { kind: "thermometer", value: 40, from: -30, to: 50 }, 50, 50, 3, "pulse", "Desert"])),
      SS("In the temperate zone, like the UK, the weather is mild. A typical day is twelve degrees, with four seasons.", S("Temperate: mild.", ["t", { kind: "thermometer", value: 12, from: -30, to: 50 }, 50, 50, 3, "none", "Temperate"])),
      SS("In the polar zone, it is freezing. A typical day can be twenty degrees below zero.", S("Polar: freezing cold.", ["t", { kind: "thermometer", value: -20, from: -30, to: 50 }, 50, 50, 3, "pulse", "Polar"]))),
    CHK(mc("Which climate zone is hot all year, near the equator?", "Tropical", ["Polar", "Temperate"], { hint: "The Sun shines most strongly there.", why: "The tropical zone is hot all year." })),
    H("Stop 2: Where is Pakistan?"),
    SAY("Pakistan has a mix. Much of it is hot and dry, especially the south and the deserts. In the north, high in the mountains, it is cold, even polar on the highest peaks. The lower, greener north and the plains of Punjab have four seasons. So a small country can hold several climates. Altitude changes the weather as well as the distance from the equator.", T("Pakistan has several climates. The plains are hot, the mountains are cold.")),
    IMG("🏜️🏔️🌾", "Pakistan has hot deserts, cold mountains and green farmland."),
    CHK(tf("Pakistan has only one kind of climate.", false, { hint: "Think about deserts and mountains.", why: "Pakistan has hot deserts, farm plains and snowy mountains." })),
    H("Stop 3: Brain game"),
    SAY("Time for a brain break. Match the pairs of weather and climate pictures.", T("Turn over two cards at a time. Can you find all the pairs?")),
    BRAIN("memory_match", "Climate pairs", "Find the matching pairs.", ["🌴", "🏜️", "🌧️", "❄️", "☀️", "🏔️"]),
    SAY("Let us remember. There are tropical, dry, temperate and polar climates. Pakistan has several.", SUM("Climate is the usual weather over many years", "There are tropical, desert, temperate and polar climates", "Pakistan has hot deserts and cold mountains")),
    GLOSS({ climate: "The usual weather of a place over many years.", equator: "The imaginary line round the middle of the Earth.", tropical: "Hot all year, near the equator.", polar: "Very cold, near the North and South Poles.", temperate: "Mild, with four seasons." }),
  ],
  mini: [
    mc("What is climate?", "The usual weather over many years", ["Today's rain", "The name of a season"], { hint: "It is about a long time.", why: "Climate is the usual weather over many years." }),
    mc("Which climate is freezing all year?", "Polar", ["Tropical", "Desert"], { hint: "Near the poles.", why: "The polar climate is very cold." }),
    tf("The UK has a temperate climate.", true, { hint: "Mild and rainy.", why: "The UK has a mild, temperate climate." }),
    mc("What is the equator?", "An imaginary line round the middle of the Earth", ["A kind of river", "A mountain"], { hint: "It is in the middle of the Earth.", why: "The equator is the line round the middle of the Earth." }),
  ],
};

const biomes = {
  id: "biomes", kind: "use", title: "Biomes",
  blocks: [
    H("Stop 1: What is a biome?"),
    SAY("A biome is a huge area with a similar climate. Its plants and animals are suited to it. In a desert, plants like cacti store water, and camels can go many days without a drink. In a rainforest it is warm and wet, so thousands of different plants and animals live there. Grasslands have wide plains with grass and animals that graze. Forests are full of trees. And the tundra is frozen and treeless. Each living thing is adapted to its biome.", T("A **biome** is a huge area with a similar climate, plants and animals.", "Living things are **adapted** to the biome they live in.")),
    SCENE("Biomes", "plain",
      SS("In the desert it is hot and dry. A cactus stores water, and a camel can go many days without a drink.", S("Desert.", P("d", 30, 55, "Cactus", "🌵", 2), P("c", 70, 55, "Camel", "🐪", 2))),
      SS("In the rainforest it is warm and wet, with tall trees and colourful birds.", S("Rainforest.", P("r", 30, 55, "Rainforest", "🌴", 2), P("p", 70, 55, "Parrot", "🦜", 2))),
      SS("On the grassland, lions and zebras roam across the wide plain.", S("Grassland.", P("g", 30, 55, "Grassland", "🌾", 2), P("l", 70, 55, "Lion", "🦁", 2))),
      SS("In the cold tundra, polar bears have thick fur and a layer of fat to keep warm.", S("Tundra.", P("t", 30, 55, "Tundra", "❄️", 2), P("b", 70, 55, "Polar bear", "🐻‍❄️", 2)))),
    CHK(mc("Which animal is adapted to the desert?", "A camel", ["A polar bear", "A parrot"], { hint: "It can go days without water.", why: "A camel stores energy and can live with little water." })),
    H("Stop 2: Adapted to survive"),
    SAY("This cold landscape has only low plants. Animals here are well adapted.", PHOTO(TUNDRA, "A rocky landscape with low yellow and green plants and small pools under low cloud", "Low plants and cold, wet ground. This is a tundra-like landscape.", "Photo by Dmitry Grachyov on Unsplash")),
    SAY("Adaptation means a body part or behaviour that helps a living thing survive in its home. A camel has wide feet to walk on sand and a hump that stores fat. A polar bear has thick fur and a layer of fat. A parrot has a strong beak to crack nuts and bright feathers. If a living thing moved to the wrong biome, it might not survive. That is why protecting biomes protects the animals living in them.", T("An **adaptation** helps a living thing survive in its home.", "Protecting biomes protects the animals that live in them.")),
    IMG("🐪🐻‍❄️🦜", "Each animal is adapted to its biome."),
    REVEAL("Why couldn't a polar bear live in the desert?", "It has thick fur and fat to stay warm in the cold. In the hot desert, it would overheat and could not find the food it needs."),
    CHK(tf("A polar bear's thick fur helps it live in the cold.", true, { hint: "Think about warmth.", why: "Fur and fat keep a polar bear warm." })),
    SAY("Let us remember. A biome has a similar climate, plants and animals. Living things are adapted to their biome.", SUM("A biome has a similar climate, plants and animals", "Animals and plants are adapted to their biome", "Protecting biomes protects living things")),
    GLOSS({ biome: "A huge area with a similar climate, plants and animals.", adapted: "Suited to a certain home or way of living.", adaptation: "A body part or behaviour that helps a living thing survive.", tundra: "A cold, treeless biome." }),
  ],
  mini: [
    mc("Which biome is cold and treeless?", "Tundra", ["Rainforest", "Desert"], { hint: "It is frozen.", why: "The tundra is cold and treeless." }),
    mc("A cactus stores...", "Water", ["Sand", "Snow"], { hint: "It lives in the desert.", why: "A cactus stores water." }),
    tf("A rainforest is warm and wet.", true, { hint: "Think about parrots and tall trees.", why: "The rainforest is warm and wet." }),
    mc("What is an adaptation?", "Something that helps a living thing survive", ["A kind of map", "A type of weather"], { hint: "Think of thick fur.", why: "Adaptations help living things survive." }),
  ],
};

const ALTS_C4_2 = [
  [mc("What do we call the place where a river starts?", "The source", ["The mouth", "The delta"], { hint: "Often in the hills.", why: "A river starts at its source.", tag: "rivers.parts" }), mc("Where is the source of many rivers found?", "High in the hills or mountains", ["Out at sea", "In the middle of a town"], { hint: "Where rain or snow collects.", why: "Many rivers start in high places.", tag: "rivers.parts" })],
  [mat("Match each river word to its meaning.", [["Source", "Where a river begins"], ["Mouth", "Where a river meets the sea"], ["Tributary", "A smaller river joining a bigger one"]], { hint: "Think about the journey.", why: "These are the parts of a river.", tag: "rivers.words" }), mat("Match each part of a river to what it is.", [["Tributary", "Joins a bigger river"], ["Source", "The start"], ["Mouth", "The end"]], { hint: "Think about the journey.", why: "These are the parts of a river.", tag: "rivers.words" })],
  [ord("Order a river's journey, from the start.", ["Snow melts on the mountain", "A tributary joins", "The river crosses the plain", "The river meets the sea"], { hint: "Start in the mountains.", why: "Source, tributary, plain, mouth.", tag: "rivers.order" }), ord("Put these in order, starting with the source.", ["Source in the hills", "River flows downhill", "River widens on the plain", "River reaches the mouth"], { hint: "Start at the beginning.", why: "A river flows from source to mouth.", tag: "rivers.order" })],
  [tf("A river's mouth is where it meets the sea.", true, { hint: "It is the end.", why: "The mouth meets the sea.", tag: "rivers.fact" }), tf("A river flows uphill.", false, { hint: "Think about gravity.", why: "Rivers flow downhill.", tag: "rivers.fact" })],
  [fill("Finish the sentences.", "Fold mountains form when plates {b1}. It is {b2} at the top of a high mountain.", [["push together", "move apart", "melt"], ["colder", "hotter", "wetter"]], { hint: "Think of the towel and the snow.", why: "Plates push together; air gets colder with height.", tag: "mountains.fill" }), fill("Fill in the missing words.", "Tectonic plates move {b1}. Altitude is height above the {b2}.", [["very slowly", "very fast", "never"], ["sea", "sky", "moon"]], { hint: "Think about slow movements.", why: "Plates move slowly; altitude is height above sea level.", tag: "mountains.fill" })],
  [st("Which word describes how high a place is above sea level? Write one word.", ["altitude"], { hint: "It begins with A.", why: "Altitude is height above sea level.", tag: "mountains.alt" }), st("What kind of mountains form when plates push together? Write two words.", ["fold mountains", "fold"], { hint: "Think of the towel.", why: "Fold mountains form when plates push together.", tag: "mountains.alt" })],
  [mc("Which kind of mountain forms when plates push land upwards?", "Fold mountain", ["Sand dune", "Coral reef"], { hint: "Think of folds in a towel.", why: "Fold mountains form this way.", tag: "mountains.type" }), mc("What are the Himalaya and Karakoram?", "Fold mountain ranges", ["Rivers", "Deserts"], { hint: "They formed when plates pushed together.", why: "They are fold mountains.", tag: "mountains.type" })],
  [hot("Tap the zone with hardly any rain.", [["🏜️", "Desert", 22, 50], ["🌴", "Tropical rainforest", 50, 50], ["🌧️", "Rainy temperate land", 78, 50]], ["Desert"], { labels: true, hint: "Think of cacti.", why: "Deserts get very little rain.", tag: "climate.zones" }), hot("Tap the climate zone that is freezing all year.", [["❄️", "Polar", 22, 50], ["🏜️", "Desert", 50, 50], ["🌴", "Tropical", 78, 50]], ["Polar"], { labels: true, hint: "Near the poles.", why: "The polar zone is freezing.", tag: "climate.zones" })],
  [ms("Which two describe the polar climate? Pick two.", ["Freezing cold", "Found near the North and South Poles"], ["Hot all year", "Found near the equator"], { hint: "Think of ice.", why: "Polar climates are freezing and near the poles.", tag: "climate.polar" }), ms("Which two describe the tropical climate?", ["Hot all year", "Found near the equator"], ["Freezing all year", "Found near the poles"], { hint: "Think of the Sun.", why: "Tropical climates are hot and near the equator.", tag: "climate.polar" })],
  [sld("Slide to show how many climate zones we met: tropical, desert, temperate, polar.", { min: 0, max: 12 }, 4, 0, { hint: "Count them.", why: "We met four.", tag: "climate.count" }), sld("Slide to show how many tectonic plates two sliding together make (counting each plate).", { min: 0, max: 12 }, 2, 0, { hint: "Plate A and plate B.", why: "Two plates.", tag: "climate.count" })],
  [mc("Why is it colder at the top of a mountain?", "The air gets colder as you go higher", ["The Sun is farther away", "Mountains are made of ice"], { hint: "Think about altitude.", why: "Air gets colder as altitude increases.", tag: "mountains.reason" }), mc("Why is there snow on K2 even in summer?", "It is so high that the air is freezing", ["The Sun never shines", "It is near the sea"], { hint: "Think about altitude.", why: "The altitude makes it freezing.", tag: "mountains.reason" })],
  [mc("Why is it so hot near the equator?", "The Sun's rays hit them most directly", ["They are close to the Poles", "They have no clouds"], { hint: "Think about the Sun.", why: "The Sun's rays are strongest there.", tag: "climate.reason" }), mc("Why are the Poles so cold?", "The Sun's rays reach them only at a low angle", ["They are near the equator", "They have no ice"], { hint: "Compare with the equator.", why: "The Sun's rays are weak at the Poles.", tag: "climate.reason" })],
  [mat("Join each biome with an animal that lives in it.", [["Desert", "Camel"], ["Rainforest", "Parrot"], ["Grassland", "Lion"], ["Tundra", "Polar bear"]], { hint: "Think of adaptations.", why: "Each animal is adapted to its biome.", tag: "biomes.match" }), mat("Match each animal to its biome.", [["Cactus", "Desert"], ["Zebra", "Grassland"], ["Polar bear", "Tundra"]], { hint: "Think of adaptations.", why: "Each living thing is adapted to its biome.", tag: "biomes.match" })],
  [mc("Why would a polar bear struggle in a rainforest?", "Its thick fur and fat would make it too hot", ["It cannot climb trees", "It dislikes parrots"], { hint: "Think about adaptation.", why: "Thick fur and fat suit the cold tundra.", tag: "biomes.reason" }), mc("Why can camels live in the desert?", "They can go many days without water", ["They need lots of water", "They live in the snow"], { hint: "Think about adaptation.", why: "Camels are adapted to hot, dry places.", tag: "biomes.reason" })],
  [mc("Why do so many villages stand beside rivers?", "Rivers give water for crops and drinking", ["Rivers make mountains", "Rivers stop floods"], { hint: "Think about what plants need.", why: "Rivers give water.", tag: "rivers.reason" }), mc("Why do many big cities lie beside rivers?", "Rivers give water, food and routes for travel", ["Rivers keep cities cold", "Rivers are always empty"], { hint: "Think about what people need.", why: "Rivers give water, food and travel routes.", tag: "rivers.reason" })],
];

const clipC2 = {
  title: "Fatima follows a river to the mountains", backdrop: "mountain", caption: "Fatima traces a river from the mountains to the sea and meets different climates on the way.",
  scenes: [
    { caption: "A source.", say: "Fatima starts at the source, high in the snowy mountains.",
      items: [{ id: "f", emoji: "👧", label: "Fatima", x: 22, y: 60, size: 3 }, { id: "m", emoji: "🏔️", x: 66, y: 40, size: 3 }] },
    { caption: "Melting snow.", say: "Melting snow becomes a small, fast stream.",
      items: [{ id: "s", emoji: "💧", x: 50, y: 52, size: 3, anim: "float" }] },
    { caption: "Tributaries.", say: "Tributaries join the stream, and it grows into a river.",
      items: [{ id: "r", emoji: "🌊", x: 50, y: 54, size: 3, anim: "float" }] },
    { caption: "Climate zones.", say: "Latitude and height give different climates along the way.",
      items: [{ id: "z", emoji: "🧭", x: 50, y: 50, size: 3, anim: "pulse" }] },
    { caption: "Meanders.", say: "On the plain, the river bends into wide meanders.",
      items: [{ id: "m", emoji: "〰️", x: 50, y: 56, size: 3 }] },
    { caption: "A flood.", say: "In the monsoon, the river floods the plain.",
      items: [{ id: "f", emoji: "🌧️", x: 50, y: 40, size: 3, anim: "float" }] },
    { caption: "The mouth.", say: "At the mouth, the river meets the Arabian Sea.",
      items: [{ id: "a", emoji: "🌅", x: 50, y: 52, size: 3 }] },
    { caption: "Biomes.", say: "Fatima has crossed mountain, plain and coast, each with its own biome.",
      items: [{ id: "b", emoji: "🌍", x: 50, y: 52, size: 3, effect: "sparkle" }] },
  ],
};

const t2 = topicLesson({
  slug: "general-knowledge-class-4-our-physical-world", subject: "general-knowledge", cls: 4, topic: 2, title: "Our Physical World",
  summary: "How rivers flow, how mountains form, the Earth's climate zones, and the biomes where plants and animals live.",
  unit: "Topic 2: Our physical world", difficulty: 2,
  objectives: ["Describe the course of a river", "Explain how fold mountains form", "Name the climate zones", "Describe biomes and how living things are adapted"],
  success_criteria: ["I can name the parts of a river", "I can say how mountains form and why they are cold", "I can describe climate zones and biomes"],
  real_life: "Seeing a river or canal, looking at snowy mountains, and noticing how plants and animals suit where they live.",
  standards: [std("KS2 physical geography", "Describe and understand key aspects of physical geography, including climate zones, biomes, rivers and mountains"), { framework: "pyp", code: "How the world works" }],
  warm_up: [
    mc("Which is the longest river in Pakistan?", "The Indus", ["The Thames", "The Nile"], { hint: "It ends at the Arabian Sea.", why: "The Indus is Pakistan's greatest river." }),
    mc("How high is K2, to the nearest thousand metres?", "9,000 metres", ["3,000 metres", "20,000 metres"], { hint: "8,611 metres.", why: "About 9,000 metres." }),
    mc("What is the capital of the UK?", "London", ["Cardiff", "Karachi"], { hint: "It is on the Thames.", why: "London is the capital." }),
  ],
  intro: [],
  subs: [rivers, mountains, climate, biomes],
  clip: clipC2,
  quiz: [
    { q: mc("What is the place where a river begins called?", "The source", ["The mouth", "A tributary"], { hint: "Often in the hills.", why: "A river begins at its source.", tag: "rivers.parts" }), sub: "rivers", depth: "recall" },
    { q: mat("Match each part of a river to its meaning.", [["Source", "Where a river begins"], ["Mouth", "Where a river meets the sea"], ["Tributary", "A smaller river joining a bigger one"]], { hint: "Think about the journey.", why: "These are the parts of a river.", tag: "rivers.words" }), sub: "rivers", depth: "apply" },
    { q: ord("Put a river's journey in order.", ["Snow melts in the mountains", "A tributary joins the river", "The river flows across the plain", "The river reaches the sea"], { hint: "Start in the mountains.", why: "Source, tributary, plain, mouth.", tag: "rivers.order" }), sub: "rivers", depth: "apply" },
    { q: tf("The Indus meets the sea in the south of Pakistan.", true, { hint: "Think of the Arabian Sea.", why: "The Indus ends in the Arabian Sea.", tag: "rivers.fact" }), sub: "rivers", depth: "recall" },
    { q: fill("Complete the sentences.", "Fold mountains form when plates {b1} together. It gets {b2} as altitude rises.", [["push", "pull", "freeze"], ["colder", "hotter", "wetter"]], { hint: "Think of the towel and the snow.", why: "Plates push together; air gets colder with height.", tag: "mountains.fill" }), sub: "mountains", depth: "apply" },
    { q: st("What word means the height of land above the sea? Write one word.", ["altitude"], { hint: "Begins with A.", why: "Altitude is height above sea level.", tag: "mountains.alt" }), sub: "mountains", depth: "apply" },
    { q: mc("What kind of mountains form when tectonic plates push together?", "Fold mountains", ["Sand dunes", "Coral reefs"], { hint: "Think of folds in a towel.", why: "Fold mountains form this way.", tag: "mountains.type" }), sub: "mountains", depth: "recall" },
    { q: hot("Tap the climate zone that gets very little rain.", [["🏜️", "Desert", 22, 50], ["🌴", "Tropical rainforest", 50, 50], ["❄️", "Polar", 78, 50]], ["Desert"], { labels: true, hint: "Think of cacti.", why: "Deserts get very little rain.", tag: "climate.zones" }), sub: "climate", depth: "apply" },
    { q: ms("Which two are true of the polar climate? Pick two.", ["Freezing cold", "Found near the North and South Poles"], ["Hot all year", "Found near the equator"], { hint: "Think of ice.", why: "Polar climates are freezing and near the poles.", tag: "climate.polar" }), sub: "climate", depth: "apply" },
    { q: sld("Slide to show how many climate zones we met in the lesson.", { min: 0, max: 12 }, 4, 0, { hint: "Tropical, desert, temperate and polar.", why: "We met four.", tag: "climate.count" }), sub: "climate", depth: "recall" },
    { q: mc("Why is it colder at the top of a mountain than at the bottom?", "The air gets colder as you go higher", ["The Sun is farther away", "Mountains are made of ice"], { hint: "Think about altitude.", why: "Air gets colder as altitude increases.", tag: "mountains.reason" }), sub: "mountains", depth: "reason" },
    { q: mc("Why are places near the equator hot all year?", "The Sun's rays hit them most directly", ["They are close to the Poles", "They have no clouds"], { hint: "Think about the Sun.", why: "The Sun's rays are strongest there.", tag: "climate.reason" }), sub: "climate", depth: "reason" },
    { q: mat("Match each biome to an animal that lives there.", [["Desert", "Camel"], ["Rainforest", "Parrot"], ["Grassland", "Lion"], ["Tundra", "Polar bear"]], { hint: "Think of adaptations.", why: "Each animal is adapted to its biome.", tag: "biomes.match" }), sub: "biomes", depth: "apply" },
    { q: mc("Why can polar bears live in the tundra but not in the rainforest?", "Their thick fur and fat suit the cold", ["They like heat", "They cannot swim"], { hint: "Think about adaptation.", why: "Thick fur and fat suit the cold tundra.", tag: "biomes.reason" }), sub: "biomes", depth: "reason" },
    { q: mc("Why do farmers build villages near rivers?", "Rivers give water for crops and drinking", ["Rivers make mountains", "Rivers stop floods"], { hint: "Think about what plants need.", why: "Rivers give water.", tag: "rivers.reason" }), sub: "rivers", depth: "reason" },
    // ----- upgrade: 15 new mains (q16-q30), 1 variant each
    { q: mc("Which word means a smaller river that joins a larger river?", "A tributary", ["A delta", "A glacier"], { hint: "It feeds the main river.", why: "A tributary flows into a bigger river.", tag: "river.tributary" }), sub: "rivers", depth: "recall", alts: [mc("A stream flows into the Indus. What is the stream called?", "A tributary", ["A source", "A mouth"], { hint: "It joins a bigger river.", why: "A stream that joins a bigger river is a tributary.", tag: "river.tributary" })] },
    { q: tf("Waterfalls are most often found in the upper course of a river.", true, { hint: "Think about steep land near the source.", why: "Steep rocky land in the upper course makes waterfalls.", tag: "river.waterfall" }), sub: "rivers", depth: "recall", alts: [tf("Meanders are most often found in the upper course of a river.", false, { hint: "Meanders need gentle land.", why: "Meanders form on the gentler middle and lower course.", tag: "river.meander" })] },
    { q: mc("Hina says a river always flows fastest near its source because the land is steepest. Is she right?", "No, a river often flows faster downstream, where the channel is wider, deeper and smoother", ["Yes, always fastest at the source", "Yes, because it has the most water there"], { hint: "Think about rocks and friction.", why: "Near the source, rocks slow the water. Downstream the channel is smoother, so the water often moves faster.", tag: "river.reason.speed" }), sub: "rivers", depth: "reason", alts: [mc("Zainab says a river always slows down as it gets closer to the sea. Is she right?", "No, it often flows faster in a wide, smooth channel, even if the land is flatter", ["Yes, it always slows", "Yes, because the land is flat"], { hint: "Think about friction with the river bed.", why: "A deeper, smoother channel can let water flow faster.", tag: "river.reason.speed" })] },
    { q: st("Write the word for the wearing away of rock and soil by water, wind or ice. It starts with E.", ["erosion"], { hint: "Rivers do this to their banks.", why: "Erosion wears away rock and soil.", tag: "river.erosion" }), sub: "rivers", depth: "recall", alts: [st("Write the word for the place where a river meets the sea. It starts with M.", ["mouth", "the mouth"], { hint: "Where the river ends.", why: "The mouth is where a river meets the sea.", tag: "river.mouth" })] },
    { q: ord("Put these river features in order as you travel downstream.", ["Waterfall", "Meander", "Flood plain", "Delta"], { hint: "From the mountains to the sea.", why: "A river runs from waterfall to meander to flood plain to delta.", tag: "river.features" }), sub: "rivers", depth: "apply", alts: [ord("Put these in order as a river forms its course.", ["Rain falls on the mountains", "A stream begins", "Tributaries join it", "The river reaches the sea"], { hint: "From rain to sea.", why: "Rain feeds a stream, tributaries join it, and the river reaches the sea.", tag: "river.features" })] },
    { q: mc("Rida says weather and climate mean the same thing. Is she right?", "No, weather is what happens today, and climate is the usual pattern over many years", ["Yes, they mean the same", "Yes, climate is just tomorrow's weather"], { hint: "Think about a short time and a long time.", why: "Weather changes daily. Climate is the long-term pattern.", tag: "climate.reason.weather" }), sub: "climate", depth: "reason", alts: [mc("Imran says one hot day means a place has a hot climate. Is he right?", "No, climate is the pattern over many years, not one day", ["Yes, one hot day decides it", "Yes, weather and climate are the same"], { hint: "Think about the long term.", why: "One day shows weather, not climate.", tag: "climate.reason.weather" })] },
    { q: mc("Which line of latitude is at 0 degrees?", "The Equator", ["The Tropic of Cancer", "The Arctic Circle"], { hint: "It goes round the middle of the Earth.", why: "The Equator is at 0 degrees latitude.", tag: "climate.latitude" }), sub: "climate", depth: "recall", alts: [mc("Which latitude marks the North Pole?", "90 degrees north", ["0 degrees", "23.5 degrees south"], { hint: "It is the top of the Earth.", why: "The North Pole is at 90 degrees north.", tag: "climate.latitude" })] },
    { q: ms("Pick two examples of biomes.", ["Tropical rainforest", "Tundra"], ["The Equator", "The Indus River"], { hint: "A biome is a large community of plants and animals.", why: "Rainforest and tundra are biomes.", tag: "biome.examples" }), sub: "biomes", depth: "apply", alts: [ms("Pick two biomes.", ["Hot desert", "Grassland"], ["A tributary", "A volcano"], { hint: "Think of big natural regions.", why: "Desert and grassland are biomes.", tag: "biome.examples" })] },
    { q: mc("Which mountains were formed when two tectonic plates pushed together and folded the land?", "The Himalayas", ["Mount Etna", "Mauna Kea"], { hint: "They are fold mountains.", why: "The Himalayas are fold mountains.", tag: "mountain.fold" }), sub: "mountains", depth: "recall", alts: [mc("Which type of mountain forms when land folds upwards?", "A fold mountain", ["A volcano", "A dune"], { hint: "Plates push together.", why: "Fold mountains form when plates push and fold the land.", tag: "mountain.fold" })] },
    { q: fill("Complete the sentence about volcanoes.", "Molten rock inside a volcano is called {b1}, and when it erupts onto the surface it is called {b2}.", [["magma", "ash", "gas"], ["lava", "water", "soil"]], { hint: "Underground versus above ground.", why: "Magma is underground. Lava is on the surface.", tag: "mountain.volcano" }), sub: "mountains", depth: "apply", alts: [fill("Complete the sentence about volcano parts.", "The opening at the top of a volcano is called the {b1}, and the {b2} is the bowl-shaped hollow around it.", [["vent", "river", "tide"], ["crater", "delta", "plain"]], { hint: "Think about a bowl.", why: "The vent leads up to the crater.", tag: "mountain.volcano" })] },
    { q: sld("Ben Nevis is about 1,345 metres high. Slide to show its height to the nearest 100 metres.", { min: 0, max: 2000 }, 1300, 100, { hint: "Round to the nearest hundred.", why: "1,345 metres rounds to about 1,300 metres.", tag: "mountain.height" }), sub: "mountains", depth: "apply", alts: [sld("Snowdon is about 1,085 metres high. Slide to show its height to the nearest 100 metres.", { min: 0, max: 2000 }, 1100, 100, { hint: "Round to the nearest hundred.", why: "1,085 metres rounds to about 1,100 metres.", tag: "mountain.height" })] },
    { q: mc("Rida says one climate label fits the whole of Pakistan. Is she right?", "No, desert, plains, coast and snowy peaks all have different climates", ["Yes, all Pakistan is hot", "Yes, all Pakistan is cold"], { hint: "Think about the coast and the mountains.", why: "Height and distance from the sea change the climate.", tag: "climate.reason.pakistan" }), sub: "climate", depth: "reason", alts: [mc("Omar says Pakistan has no snow anywhere. Is he right?", "No, its high northern mountains have snow and glaciers", ["Yes, no snow anywhere", "Yes, snow only falls at the Poles"], { hint: "Think about K2.", why: "High mountains get snow.", tag: "climate.reason.pakistan" })] },
    { q: hot("Tap the line of latitude at about 23.5 degrees north.", [["➖", "Tropic of Cancer", 22, 50], ["⭕", "Equator", 50, 50], ["🧊", "Arctic Circle", 78, 50]], ["Tropic of Cancer"], { labels: true, hint: "It is north of the Equator, near the tropics.", why: "The Tropic of Cancer is at about 23.5 degrees north.", tag: "climate.tropic" }), sub: "climate", depth: "apply", alts: [hot("Tap the line of latitude at 0 degrees.", [["⭕", "Equator", 22, 50], ["➖", "Tropic of Cancer", 50, 50], ["🧊", "Arctic Circle", 78, 50]], ["Equator"], { labels: true, hint: "It is the middle of the Earth.", why: "The Equator is at 0 degrees latitude.", tag: "climate.tropic" })] },
    { q: mc("Rafay says tundra animals stay warm because they have thin fur. Is he right?", "No, tundra animals have thick fur or feathers and layers of fat", ["Yes, thin fur keeps them warm", "Yes, they have no fur at all"], { hint: "Think about the cold.", why: "Thick fur and fat keep tundra animals warm.", tag: "biome.reason.tundra" }), sub: "biomes", depth: "reason", alts: [mc("Hana says tundra plants grow tall like rainforest trees. Is she right?", "No, tundra plants are low and close to the ground because of the cold and wind", ["Yes, they grow very tall", "Yes, they are the same"], { hint: "Think about the wind.", why: "Low plants survive cold and wind.", tag: "biome.reason.tundra" })] },
    { q: mc("Laiba says floods happen only because of rain, and people play no part. Is she right?", "No, cutting trees, building on flood plains and blocked drains can make floods worse", ["Yes, only rain matters", "Yes, people cannot affect floods"], { hint: "Think about what people do to the land.", why: "People can make floods worse or better.", tag: "river.reason.flood" }), sub: "biomes", depth: "reason", alts: [mc("Sami says flood plains are never useful. Is he right?", "No, they have rich soil, though they need careful planning", ["Yes, they are useless", "Yes, nobody can farm there"], { hint: "Think about fertile soil.", why: "Flood plains have rich soil but flood sometimes.", tag: "river.reason.flood" })] },
  ].map((x, i) => ({ ...x, alts: x.alts ?? ALTS_C4_2[i] })),
});

export const topics = [t1, t2];
