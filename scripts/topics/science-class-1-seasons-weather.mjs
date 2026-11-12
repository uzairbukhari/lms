import { SAY, SS, H, T, IMG, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, TABLE, BAR, mc, ms, tf, num, ord, mat, fill, hot, sld, st, PHOTO } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC, PK, CAM } from "./_science-kit.mjs";

// Science Class 1, topic 5: Seasons and weather (Zainab, age 7). Enquiry type: pattern seeking.

const AUTUMN = "science-class-1-seasons-weather-1-7600d823.jpg";
const FROST = "science-class-1-seasons-weather-2-c0cc2d96.jpg";
const MONSOON = "science-class-1-seasons-weather-3-6c2c5c45.jpg";

const seasons = {
  id: "seasons", kind: "learn", title: "The four seasons",
  blocks: [
    H("Welcome back, young scientist!"),
    SAY("Today we explore the seasons and the weather. How does the year change?", T("Today's big question: how does the weather change through the year?")),
    SAY("These leaves are turning red and gold. That is a sign of autumn.", PHOTO(AUTUMN, "Red, orange and yellow autumn leaves on a branch against a soft sky", "Leaves turn red, orange and gold in autumn.", "Photo by Aaron Burden on Unsplash")),
    H("Stop 1: Four seasons in the UK"),
    SAY("A year is split into seasons. In the UK there are four. Spring is when new leaves and flowers grow, and baby animals are born. Summer is warm and sunny, with long days. Autumn is when leaves turn red and brown and fall. Winter is cold, with short days and sometimes snow. Then spring comes again. It is a circle that goes round and round.", T("The UK has four **seasons**: spring, summer, autumn and winter.", "They come round in the same order every year.")),
    EB("meadow", "Four seasons of a tree",
      SS("In spring, the tree grows fresh green leaves and flowers.", S("Spring: new leaves.", ["t", "🌳", 50, 58, 3, "grow"], ["f", "🌸", 25, 70, 2, "bounce"])),
      SS("In summer, the tree is full of leaves. The days are long and warm.", S("Summer: warm and sunny.", ["t", "🌳", 50, 58, 3, "none"], ["s", "☀️", 80, 20, 3, "pulse"])),
      SS("In autumn, the leaves turn orange and fall down.", S("Autumn: falling leaves.", ["t", "🍂", 50, 58, 3, "none"], ["l", "🍁", 30, 75, 2, "float"])),
      SS("In winter, the branches are bare. It is cold and it may snow.", S("Winter: cold and bare.", ["t", "🌲", 50, 58, 3, "none"], ["w", "❄️", 25, 30, 2, "float"], ["w2", "❄️", 75, 25, 2, "float"]))),
    CHK(ord("Put the seasons in order, starting with spring.", ["Spring", "Summer", "Autumn", "Winter"], { hint: "Spring, then the sunny one.", why: "The order is spring, summer, autumn and winter." })),
    H("Stop 2: Seasons in Pakistan"),
    SAY("This is monsoon rain. It falls in summer in Pakistan and makes the fields green.", PHOTO(MONSOON, "Heavy rain falling over green fields and tall trees under a grey sky", "Monsoon rain falls over green fields in summer.", "Photo by Mr Cool Hitman on Unsplash")),
    SAY("In Pakistan the seasons look different. Summer is very hot. In many places the monsoon brings heavy rain in July and August. Autumn is mild. Winter is cool and sometimes it snows in the north, on the mountains. Then spring brings blossom, like almond flowers. So the same year has different weather in different countries.", T("Pakistan has hot summers, a rainy **monsoon**, mild autumns and cool winters.", "Different places have different weather in the same season.")),
    IMG("🌧️ 🏔️ 🌸", "Monsoon rain, snowy mountains and spring blossom."),
    CHK(mc("When does the monsoon bring heavy rain to Pakistan?", "Summer", ["Winter", "Spring"], { hint: "It comes with the heat.", why: "The monsoon rains come in summer." })),
    SAY("Let us remember. A year has four seasons. They come in the same order. Places have different weather.", SUM("The four seasons are spring, summer, autumn and winter", "They come in the same order every year", "Weather can be different in different countries")),
    GLOSS({ seasons: "The four parts of the year: spring, summer, autumn and winter.", monsoon: "The heavy summer rains in South Asia.", blossom: "The flowers on a tree in spring." }),
  ],
  mini: [
    mc("Which season comes after summer?", "Autumn", ["Winter", "Spring"], { hint: "Leaves fall.", why: "Autumn comes after summer." }),
    mat("Match each season to what you see.", [["Spring", "New flowers"], ["Autumn", "Falling leaves"], ["Winter", "Bare trees"]], { hint: "Think about the tree.", why: "Spring has flowers, autumn falling leaves and winter bare trees." }),
    tf("Winter is the hottest season in the UK.", false, { hint: "Is it cold or hot?", why: "Winter is the coldest season." }),
    num("How many seasons are there in a year?", 4, { hint: "Spring, summer, autumn, winter.", why: "There are four seasons." }),
  ],
};

const weather = {
  id: "weather", kind: "try", title: "Measuring the weather",
  blocks: [
    H("Stop 1: Kinds of weather"),
    SAY("Frost forms when the air is very cold. It makes grass white and icy.", PHOTO(FROST, "Blades of grass covered in white frost in the golden light of a winter morning", "Frost makes grass white and icy on cold winter mornings.", "Photo by Michael Held on Unsplash")),
    SAY("The weather is what it is like outside today. It can be sunny, rainy, windy, cloudy, snowy or foggy. It changes from day to day. Look at four kinds of weather.", T("**Weather** is what it is like outside: sunny, rainy, windy or cloudy.", "It can change every day.")),
    EB("sky", "Kinds of weather",
      SS("A sunny day. The sun is bright and the sky is blue.", S("Sunny.", ["a", "☀️", 50, 35, 3, "pulse"])),
      SS("A rainy day. Clouds are grey and raindrops fall.", S("Rainy.", ["a", "☁️", 50, 30, 3, "float"], ["r", "🌧️", 50, 55, 3, "bounce"])),
      SS("A windy day. The wind blows and makes things move.", S("Windy.", ["a", "💨", 40, 35, 3, "float"], ["k", "🪁", 70, 35, 3, "bounce"])),
      SS("A snowy day. Cold white snow falls from the sky.", S("Snowy.", ["a", "☃️", 50, 58, 3, "bounce"], ["s", "❄️", 25, 25, 2, "float"], ["s2", "❄️", 75, 25, 2, "float"]))),
    CHK(mc("Which kind of weather has raindrops falling?", "Rainy", ["Sunny", "Windy"], { hint: "Look at the clouds.", why: "Rainy weather has raindrops." })),
    H("Stop 2: How hot is it?"),
    SAY("A thermometer measures how hot or cold it is. The number on it is called the temperature. We measure it in degrees. The red line goes up when it is warm. It goes down when it is cold. Look at what happens on a hot day.", EB("home", "A thermometer", SS("On a cold winter day, the thermometer shows a low number.", S("Cold: 5 degrees.", ["t", { kind: "thermometer", value: 5, from: -10, to: 50 }, 50, 52, 3, "none"])), SS("On a warm spring day, the number goes up.", S("Warm: 20 degrees.", ["t", { kind: "thermometer", value: 20, from: -10, to: 50 }, 50, 52, 3, "none"])), SS("On a very hot summer day in Lahore, it is even higher.", S("Hot: 40 degrees.", ["t", { kind: "thermometer", value: 40, from: -10, to: 50 }, 50, 52, 3, "none"])))),
    SAY("Words in bold: a thermometer measures temperature.", T("A **thermometer** measures the **temperature**.", "A high number means it is hot. A low number means it is cold.")),
    CHK(mc("What does a thermometer measure?", "How hot or cold it is", ["How windy it is", "How wet it is"], { hint: "It shows the temperature.", why: "A thermometer measures temperature." })),
    ACT("Weather diary", ["Paper and pencil", "A grown-up"], ["Look out of the window every day for a week.", "Draw the weather and write the day.", "At the end, count how many days were sunny, rainy and cloudy."]),
    SAY("Remember. Weather changes. A thermometer measures how hot or cold it is.", SUM("Weather is sunny, rainy, windy, cloudy or snowy", "A thermometer measures temperature")),
    GLOSS({ weather: "What it is like outside today.", thermometer: "A tool for measuring how hot or cold it is.", temperature: "How hot or cold something is.", degrees: "The units we use to measure temperature." }),
  ],
  mini: [
    mc("Which weather is shown by a umbrella?", "Rain", ["Sun", "Snow"], { hint: "An umbrella keeps us dry.", why: "We use an umbrella when it rains." }),
    tf("A high temperature means it is hot.", true, { hint: "40 degrees is hot.", why: "A high number means hot." }),
    mat("Match the weather to what we wear.", [["Rainy", "Raincoat"], ["Sunny", "Sun hat"], ["Snowy", "Warm coat"]], { hint: "What keeps you comfortable?", why: "We dress to suit the weather." }),
  ],
};

const diary = {
  id: "diary", kind: "play", title: "Weather detectives",
  blocks: [
    H("Stop 1: Reading a weather chart"),
    SAY("A weather chart is a good way to see patterns. This chart shows the weather in one week. Look for the weather that happened most often. That is the pattern in the week.", TABLE("Weather this week", [["Sunny", 4, "☀️"], ["Cloudy", 2, "☁️"], ["Rainy", 1, "🌧️"]], "Four sunny days, two cloudy days and one rainy day.")),
    CHK(mc("Which weather happened most in this week?", "Sunny", ["Rainy", "Cloudy"], { hint: "Find the biggest number.", why: "Sunny had the biggest number, 4 days." })),
    SAY("A week has seven days. We can add the days up: four sunny, two cloudy and one rainy.", IMG("📅", "A week has seven days.")),
    H("Stop 2: Brain game"),
    SAY("Warm up your memory with a weather game. Watch the weather lights, then copy them in the same order.", BRAIN("remember_order", "Weather lights", "Watch the order, then copy it.", ["☀️", "🌧️", "💨", "❄️"])),
    CHK(num("How many days are in the weather chart altogether (4 + 2 + 1)?", 7, { hint: "Add them up.", why: "4 + 2 + 1 = 7, a whole week." })),
    SAY("A good detective looks for patterns. If it rains most days in winter, we can guess winter is wet. Think about your own town.", REVEAL("Which season do you think is the rainiest where you live?", "It depends on where you live! In Pakistan, the monsoon in summer. In the UK, autumn and winter are often wet.")),
    SAY("Remember. A chart shows patterns in the weather.", SUM("A weather chart shows which weather happened most", "Patterns help us guess what will happen")),
    GLOSS({ pattern: "Something that happens again and again in the same way.", chart: "A picture that shows numbers.", detective: "Someone who finds things out by looking for clues." }),
  ],
  mini: [
    mc("In our chart, which weather had only 1 day?", "Rainy", ["Sunny", "Cloudy"], { hint: "Find the smallest number.", why: "Rainy happened on 1 day." }),
    num("How many sunny days were in the chart?", 4, { hint: "Look at the sunny row.", why: "There were 4 sunny days." }),
    tf("A pattern is something that happens again and again.", true, { hint: "Think about the seasons.", why: "A pattern repeats." }),
  ],
};

const prepare = {
  id: "prepare", kind: "use", title: "Dressing for the weather",
  blocks: [
    H("Stop 1: What shall I wear?"),
    SAY("We choose clothes to suit the season and the weather. In winter we wear a coat, a scarf and gloves. In hot summer we wear light clothes and a sun hat. On rainy days we need a raincoat and boots. In Ramadan or at Eid, we wear special clothes too. We still dress for the weather. Look at three outfits.", T("We choose clothes to suit the **weather**.", "Warm clothes for cold days, light clothes for hot days.")),
    SAY("Winter clothes: a coat, a scarf and gloves.", IMG("🧥 🧣 🧤", "Winter clothes: a coat, a scarf and gloves.")),
    SAY("Summer clothes: a sun hat, shorts and sunglasses.", IMG("👒 🩳 🕶️", "Summer clothes: a sun hat, shorts and sunglasses.")),
    CHK(mc("What should you wear on a very hot day?", "Light clothes and a sun hat", ["A big coat", "A scarf and gloves"], { hint: "Keep cool.", why: "Light clothes and a hat keep us cool." })),
    H("Stop 2: Stay safe in the sun"),
    SAY("The sun is strong in summer. Too much sun can burn our skin. So we wear a hat, drink water, and stay in the shade at midday. Never look straight at the sun, because it can hurt your eyes.", ACT("Sun safety plan", ["Paper and pencil"], ["Draw yourself with a sun hat on.", "Write three things that keep you safe in the sun.", "Tell a grown-up your plan."])),
    IMG("🧢 💧 ⛱️", "A sun hat, water and a shady umbrella keep us safe."),
    CHK(tf("It is safe to look straight at the sun.", false, { hint: "The sun is very bright.", why: "Looking at the sun can hurt your eyes." })),
    SAY("Remember. We dress for the weather and stay safe in the sun.", SUM("Dress to suit the weather", "In the sun: wear a hat, drink water and find shade")),
    GLOSS({ weather: "What it is like outside today.", shade: "A cool place out of the sun.", safe: "Not in danger." }),
  ],
  mini: [
    mc("Which is best for a rainy day?", "A raincoat", ["Sandals", "Sunglasses"], { hint: "It keeps you dry.", why: "A raincoat keeps rain off." }),
    ms("Pick two ways to stay safe in the sun.", ["Wear a hat", "Drink water"], ["Stare at the sun", "Wear a thick coat"], { hint: "Think about heat.", why: "A hat and water keep us safe in the sun." }),
    tf("In winter we wear warm clothes.", true, { hint: "It is cold.", why: "Warm clothes keep us warm." }),
  ],
};

const ALTS = [
  [mc("Which season comes straight after winter?", "Spring", ["Autumn", "Summer"], { hint: "Flowers start to grow.", why: "Spring comes after winter." }), mc("Which season comes straight before winter?", "Autumn", ["Spring", "Summer"], { hint: "Leaves are falling.", why: "Autumn comes before winter." })],
  [tf("Autumn is when leaves fall from some trees.", true, { hint: "Think of orange leaves.", why: "In autumn many trees lose their leaves." }), tf("It never rains in Pakistan.", false, { hint: "What is the monsoon?", why: "The monsoon brings heavy rain." })],
  [mat("Pair each season with what happens.", [["Summer", "Long, warm days"], ["Winter", "Short, cold days"], ["Spring", "New flowers"]], { hint: "Think about each season.", why: "Summer is warm, winter is cold and spring has new flowers." }), mat("Link each weather to its picture word.", [["Rainy", "Raindrops"], ["Sunny", "Bright sun"], ["Snowy", "Snowflakes"]], { hint: "Think about each weather.", why: "Rain has drops, sun is bright and snow has flakes." })],
  [ms("Pick two kinds of weather.", ["Windy", "Rainy"], ["Square", "Loud"], { hint: "What is it like outside?", why: "Windy and rainy are kinds of weather." }), ms("Pick two seasons.", ["Spring", "Winter"], ["Monday", "Morning"], { hint: "Parts of the year.", why: "Spring and winter are seasons." })],
  [hot("Tap the tool that measures temperature.", [["🌡️", "Thermometer", 22, 50], ["🔭", "Telescope", 50, 50], ["⏰", "Clock", 78, 50]], ["Thermometer"], { labels: true, hint: "It shows hot and cold.", why: "A thermometer measures temperature." }), hot("Tap the thing we use when it rains.", [["☂️", "Umbrella", 22, 50], ["🕶️", "Sunglasses", 50, 50], ["🧣", "Scarf", 78, 50]], ["Umbrella"], { labels: true, hint: "It keeps rain off.", why: "An umbrella keeps us dry in the rain." })],
  [st("What do we call the heavy summer rains in South Asia?", ["monsoon", "the monsoon"], { hint: "It starts with m.", why: "The monsoon brings heavy rain." }), st("What is the word for how hot or cold it is?", ["temperature"], { hint: "A thermometer measures it.", why: "Temperature tells us how hot or cold it is." })],
  [mc("A weather chart shows 3 sunny days, 1 rainy day and 2 windy days. Which weather happened most?", "Sunny", ["Rainy", "Windy"], { hint: "Find the biggest number.", why: "Sunny had 3 days, the most." }), mc("A chart shows 2 sunny days, 4 rainy days and 1 windy day. Which weather happened most?", "Rainy", ["Sunny", "Windy"], { hint: "Find the biggest number.", why: "Rainy had 4 days, the most." })],
  [fill("Finish the sentences.", "A {b1} measures the {b2}.", [["thermometer", "clock", "ruler"], ["temperature", "time", "length"]], { hint: "It shows hot and cold.", why: "A thermometer measures temperature." }), fill("Complete the sentences about the year.", "A year has {b1} seasons. They begin with {b2}.", [["four", "two", "ten"], ["spring", "Monday", "morning"]], { hint: "Spring, summer, autumn, winter.", why: "There are four seasons, starting with spring." })],
  [num("A week has sunny, cloudy and rainy days: 3 + 2 + 2. How many days is that?", 7, { hint: "Add them.", why: "3 + 2 + 2 = 7 days." }), num("A weather chart shows 5 sunny days and 2 rainy days. How many days is that altogether?", 7, { hint: "Add them.", why: "5 + 2 = 7." })],
  [sld("Slide to show a hot summer day in Lahore, in degrees.", { min: -10, max: 50, unit: "°C" }, 40, 3, { hint: "Very hot.", why: "A hot summer day in Lahore can be around 40 degrees." }), sld("Slide to show a cold winter day in the UK, in degrees.", { min: -10, max: 50, unit: "°C" }, 3, 3, { hint: "Very cold, near freezing.", why: "A cold UK winter day is often around 0 to 5 degrees." })],
  [ord("Put the seasons in order, starting with summer.", ["Summer", "Autumn", "Winter", "Spring"], { hint: "Summer, then the leaf-falling one.", why: "After summer comes autumn, winter and spring." }), ord("Put the seasons in order, starting with winter.", ["Winter", "Spring", "Summer", "Autumn"], { hint: "Winter, then flowers.", why: "After winter comes spring, summer and autumn." })],
  [mc("Ali says seasons are different every year, in a new order. Why is he wrong?", "They always come in the same order", ["They change order each month", "There are no seasons"], { hint: "Spring, summer, autumn, winter.", why: "The seasons repeat in the same order every year." }), mc("Sara says winter comes before autumn. Why is she wrong?", "Autumn comes first, then winter", ["Winter is a month", "Winter never comes"], { hint: "Leaves fall first.", why: "The order is autumn, then winter." })],
  [mc("Why is it a good idea to wear a hat in hot sun?", "It protects your head from the sun", ["It makes the sun colder", "It makes you taller"], { hint: "Think about sunburn.", why: "A hat gives shade and helps protect from sunburn." }), mc("Why do we wear a coat in winter?", "To keep warm", ["To keep cool", "To see better"], { hint: "It is cold.", why: "Coats keep us warm." })],
  [mc("Hana says all places have the same weather at the same time. Why is she wrong?", "Different places can have different weather", ["It is always sunny everywhere", "Weather never changes"], { hint: "Think of Pakistan and the UK.", why: "Weather is different in different places." }), mc("Nina says it snows everywhere in winter. Why is she wrong?", "Many places, like Karachi, never get snow", ["Snow is hot", "Winter has no weather"], { hint: "Think of warm places.", why: "Only cold places get snow." })],
];

const clip = {
  title: "Zainab's year", backdrop: "meadow", caption: "Zainab watches the seasons change from Lahore to the hills.",
  scenes: [
    { caption: "Spring.", say: "In spring, blossom opens and lambs skip in the fields.",
      items: [{ id: "z", emoji: "👧", label: "Zainab", x: 25, y: 58, size: 3, enter: "walk_right" }, { id: "b", emoji: "🌸", x: 72, y: 45, size: 3, effect: "sparkle" }] },
    { caption: "Summer.", say: "In summer it is hot and the days are long. She wears a sun hat.",
      items: [{ id: "s", emoji: "☀️", x: 70, y: 25, size: 3, anim: "pulse" }, { id: "h", emoji: "👒", x: 35, y: 58, size: 3 }] },
    { caption: "Monsoon.", say: "In July the monsoon arrives. Heavy rain fills the streets.",
      items: [{ id: "r", emoji: "🌧️", label: "monsoon", x: 50, y: 32, size: 3, anim: "float" }, { id: "u", emoji: "☔", x: 50, y: 62, size: 3 }] },
    { caption: "Autumn.", say: "In autumn, leaves turn red and gold and fall to the ground.",
      items: [{ id: "l", emoji: "🍂", x: 35, y: 50, size: 3, anim: "float" }, { id: "t", emoji: "🍁", x: 70, y: 55, size: 3 }] },
    { caption: "Winter.", say: "In winter it is cold. The northern mountains are covered in snow.",
      items: [{ id: "m", emoji: "🏔️", label: "snow", x: 50, y: 50, size: 3, effect: "glow" }] },
    { caption: "Daylight.", say: "Winter days are short. The sun sets early and the nights are long.",
      items: [{ id: "n", emoji: "🌙", x: 70, y: 28, size: 3, anim: "float" }, { id: "z", emoji: "👧", x: 30, y: 58, size: 3 }] },
    { caption: "Thermometer.", say: "A thermometer shows how hot or cold it is. Today it reads ten degrees.",
      items: [{ id: "t", emoji: "🌡️", label: "10 degrees", x: 50, y: 50, size: 3, effect: "glow" }] },
    { caption: "Dress for it.", say: "Zainab dresses for the weather. SubhanAllah, every season has its gifts!",
      items: [{ id: "z", emoji: "👧", x: 30, y: 58, size: 3, anim: "bounce" }, { id: "h", emoji: "🧣", x: 70, y: 55, size: 3, effect: "hearts" }] },
  ],
};

export const topics = [
  topicLesson({
    slug: "science-class-1-seasons-weather", subject: "science", cls: 1, topic: 5, title: "Seasons and Weather",
    summary: "The four seasons, seasons in Pakistan, kinds of weather, measuring temperature and dressing for the weather.",
    unit: "Topic 5: Seasons and weather", difficulty: 1,
    objectives: ["Name the four seasons in order", "Describe weather in the UK and Pakistan", "Read a thermometer and a weather chart", "Dress and stay safe for the weather"],
    success_criteria: ["I can put the seasons in order", "I can name kinds of weather", "I can say what a thermometer measures", "I can read a simple weather chart"],
    real_life: "Choosing clothes each morning and noticing how the weather changes through the year.",
    standards: [NC("Y1 seasonal changes", "Observe changes across the four seasons; observe and describe weather associated with the seasons and how day length varies"), ...CAM("2TWSc.03", "2TWSc.06")],
    warm_up: [
      mc("Which material is a window made of?", "Glass", ["Wood", "Fabric"], { hint: "You can see through it.", why: "Windows are made of glass." }),
      mc("What does a plant need to grow?", "Water and light", ["Sweets", "Toys"], { hint: "Think of the cress.", why: "Plants need water and light." }),
      tf("Ice melts when it gets warm.", true, { hint: "Think of an ice lolly.", why: "Warmth melts ice." }),
    ],
    intro: [],
    subs: [seasons, weather, diary, prepare],
    clip,
    quiz: [
      Q("seasons", "recall", "weather.order", mc("Which season comes straight after summer?", "Autumn", ["Spring", "Winter"], { hint: "Leaves turn orange.", why: "Autumn comes after summer." }), ...ALTS[0]),
      Q("seasons", "recall", "weather.facts", tf("Winter is the coldest season in the UK.", true, { hint: "Think of snow.", why: "Winter is the coldest season." }), ...ALTS[1]),
      Q("seasons", "apply", "weather.seasons", mat("Match each season to what happens in it.", [["Autumn", "Leaves fall"], ["Spring", "Baby animals are born"], ["Summer", "Long, sunny days"]], { hint: "Think about each season.", why: "Autumn has falling leaves, spring has new life, summer is long and sunny." }), ...ALTS[2]),
      Q("weather", "apply", "weather.kinds", ms("Pick two things that are kinds of weather.", ["Sunny", "Snowy"], ["Round", "Quiet"], { hint: "What is it like outside?", why: "Sunny and snowy are kinds of weather." }), ...ALTS[3]),
      Q("weather", "recall", "weather.tools", hot("Tap the tool that measures how hot it is.", [["🌡️", "Thermometer", 22, 50], ["📏", "Ruler", 50, 50], ["⚖️", "Scales", 78, 50]], ["Thermometer"], { labels: true, hint: "It shows temperature.", why: "A thermometer measures temperature." }), ...ALTS[4]),
      Q("seasons", "recall", "weather.words", st("What is the word for the heavy summer rains in Pakistan?", ["monsoon", "the monsoon"], { hint: "It starts with m.", why: "The monsoon brings heavy rain." }), ...ALTS[5]),
      Q("diary", "apply", "weather.chart", mc("A chart shows 5 sunny days, 1 rainy day and 1 windy day. Which weather happened most?", "Sunny", ["Rainy", "Windy"], { hint: "Find the biggest number.", why: "Sunny had 5 days, the most." }), ...ALTS[6]),
      Q("weather", "apply", "weather.fill", fill("Complete the sentence.", "A thermometer measures {b1}. A high number means it is {b2}.", [["temperature", "time", "speed"], ["hot", "cold", "dark"]], { hint: "Think about the red line.", why: "A thermometer measures temperature. A high number means hot." }), ...ALTS[7]),
      Q("diary", "recall", "weather.add", num("A weather chart shows 4 sunny days, 2 cloudy days and 1 rainy day. How many days is that altogether?", 7, { hint: "Add them.", why: "4 + 2 + 1 = 7." }), ...ALTS[8]),
      Q("weather", "apply", "weather.temp", sld("Slide to show how hot a very warm summer day might be.", { min: -10, max: 50, unit: "°C" }, 35, 5, { hint: "Quite hot.", why: "A hot summer day can be 30 to 40 degrees." }), ...ALTS[9]),
      Q("seasons", "apply", "weather.cycle", ord("Put the seasons in order, starting with autumn.", ["Autumn", "Winter", "Spring", "Summer"], { hint: "Autumn, then the coldest.", why: "After autumn come winter, spring and summer." }), ...ALTS[10]),
      Q("seasons", "reason", "weather.reason", mc("Tia says the seasons come in a different order each year. Why is she wrong?", "They always come in the same order", ["They change order each month", "There are no seasons"], { hint: "Spring, summer, autumn, winter.", why: "The seasons repeat in the same order every year." }), ...ALTS[11]),
      Q("prepare", "reason", "weather.dress", mc("Why do we wear a sun hat in hot weather?", "It protects us from the sun", ["It makes the sun colder", "It makes us taller"], { hint: "Think about sunburn.", why: "A hat gives shade and helps protect from sunburn." }), ...ALTS[12]),
      Q("seasons", "reason", "weather.places", mc("Omar says all places have the same weather at the same time. Why is he wrong?", "Different places can have different weather", ["It is always sunny everywhere", "Weather never changes"], { hint: "Think of Pakistan and the UK.", why: "Weather is different in different places." }), ...ALTS[13]),
      Q("prepare", "reason", "weather.safety", mc("Layla wants to stare at the sun to watch it. Why is that a bad idea?", "It can hurt her eyes", ["It will make her cold", "It will make her taller"], { hint: "The sun is very bright.", why: "Looking at the sun can hurt your eyes." }),
        mc("Sam wants to play outside at midday with no hat or water. Why is that a bad idea?", "He could get too hot and sunburnt", ["He will get too cold", "He will turn into a plant"], { hint: "Think about strong sun.", why: "Strong sun can burn skin and make us too hot." }),
        mc("Nina wants to wear a big coat on a very hot day. Why is that a bad idea?", "She would get too hot", ["She would get too cold", "The coat would melt"], { hint: "Which clothes suit hot weather?", why: "Light clothes keep us cool on hot days." })),
      // ----- upgrade: 15 new mains (q16-q30), 1 variant each
      Q("seasons", "apply", "seasons.conkers", tf("Conkers fall from horse chestnut trees in autumn.", true, { hint: "Think about falling leaves.", why: "Conkers ripen and fall in autumn." }),
        tf("Conkers fall from trees in spring.", false, { hint: "Think about new buds.", why: "Spring is for buds and blossom. Conkers fall in autumn." })),
      Q("seasons", "apply", "seasons.spring_signs", mc("Zainab sees new buds and baby lambs. Which season is it?", "Spring", ["Autumn", "Winter"], { hint: "Think about new life.", why: "Buds and lambs are signs of spring." }),
        mc("Blossom appears and birds build nests. Which season is it?", "Spring", ["Winter", "Autumn"], { hint: "Think about new life.", why: "Blossom and nests are signs of spring." })),
      Q("weather", "apply", "weather.weather_match", mat("Match each weather to what it brings.", [["Rain", "Puddles"], ["Frost", "Icy grass"], ["Wind", "Moving leaves"]], { hint: "What can we see?", why: "Rain makes puddles, frost makes icy grass and wind moves leaves." }),
        mat("Join each weather to what it brings.", [["Snow", "White ground"], ["Sun", "Shadows"], ["Fog", "Hard to see far"]], { hint: "What can we see?", why: "Snow covers the ground, sun makes shadows and fog hides things far away." })),
      Q("weather", "apply", "weather.tools_ms", ms("Which two tools measure the weather? Pick two.", ["A thermometer", "A rain gauge"], ["A torch", "A ruler"], { hint: "One shows hot or cold. One shows rain.", why: "A thermometer measures temperature and a rain gauge measures rain." }),
        ms("Which two things tell us about the weather? Pick two.", ["A wind sock", "A thermometer"], ["A calculator", "A pencil"], { hint: "Think about wind and temperature.", why: "A wind sock shows the wind and a thermometer shows the temperature." })),
      Q("diary", "reason", "weather.wind_use", mc("Hamza says a windy day is no good for anything. Is he right?", "No, wind helps us fly kites and dry washing", ["Yes, wind is always bad", "Yes, wind stops everything"], { hint: "Think about kites.", why: "Wind is useful for kites and drying washing." }),
        mc("Layla says rain is no good for anything. Is she right?", "No, rain helps plants grow and fills rivers", ["Yes, rain is always bad", "Yes, plants hate water"], { hint: "Think about the garden.", why: "Plants and rivers need rain." })),
      Q("seasons", "apply", "seasons.year_order", ord("Put these signs of the year in order, from spring to winter.", ["Blossom", "Hot sun", "Falling leaves", "Frost"], { hint: "Spring comes first.", why: "Blossom is spring, hot sun is summer, falling leaves are autumn and frost is winter." }),
        ord("Arrange these signs of the year, from spring to winter.", ["New lambs", "Beach days", "Conkers", "Snow"], { hint: "Spring comes first.", why: "Lambs are spring, beach days are summer, conkers are autumn and snow is winter." })),
      Q("prepare", "apply", "seasons.clothes_clue", mc("Zainab wears a woolly hat, gloves and boots. What is the weather like?", "Cold", ["Hot", "Very hot"], { hint: "Think about warm clothes.", why: "We wear hats, gloves and boots when it is cold." }),
        mc("Hamza wears sandals and a sun hat. What is the weather like?", "Hot and sunny", ["Cold and snowy", "Freezing"], { hint: "Think about light clothes.", why: "Sandals and a sun hat suit hot, sunny weather." })),
      Q("diary", "apply", "seasons.daylight_gap", sld("A winter day has 8 hours of daylight and a summer day has 14. Slide to show how many more hours there are in summer.", { min: 0, max: 12, unit: "hours" }, 6, 0, { hint: "14 take away 8.", why: "14 - 8 = 6 more hours." }),
        sld("A winter day has 7 hours of daylight and a summer day has 16. Slide to show how many more hours there are in summer.", { min: 0, max: 12, unit: "hours" }, 9, 0, { hint: "16 take away 7.", why: "16 - 7 = 9 more hours." })),
      Q("diary", "apply", "seasons.after_winter", st("What do we call the season that comes after winter?", ["spring", "springtime"], { hint: "It starts with s and has new buds.", why: "Spring comes after winter." }),
        st("What do we call the season that comes after spring?", ["summer", "summertime"], { hint: "It starts with s and is hot.", why: "Summer comes after spring." })),
      Q("diary", "apply", "seasons.daylight_fill", fill("Finish the sentences about daylight.", "In winter the days are {b1} and the nights are {b2}.", [["short", "long", "hot"], ["long", "short", "green"]], { hint: "Think about when it gets dark.", why: "Winter days are short and the nights are long." }),
        fill("Finish the sentences about summer.", "In summer the days are {b1} and the sun is {b2} in the sky.", [["long", "short", "frosty"], ["high", "hiding", "frozen"]], { hint: "Think about long light evenings.", why: "Summer days are long and the sun is high in the sky." })),
      Q("seasons", "apply", "seasons.months_num", num("A year has 4 seasons of 3 months each. How many months is that?", 12, { hint: "4 groups of 3.", why: "3 + 3 + 3 + 3 = 12 months." }),
        num("Spring and summer each have 3 months. How many months is that?", 6, { hint: "3 + 3.", why: "3 + 3 = 6 months." })),
      Q("seasons", "apply", "seasons.pakistan_tap", hot("Tap the picture that shows the monsoon.", [["🌧️", "Heavy rain", 22, 50], ["❄️", "Snow", 50, 50], ["🏜️", "Dry sand", 78, 50]], ["Heavy rain"], { labels: true, hint: "It is the wet summer season.", why: "The monsoon brings heavy rain." }),
        hot("Tap the sign of winter in the mountains of northern Pakistan.", [["❄️", "Snow on mountains", 22, 50], ["🌴", "Palm trees", 50, 50], ["☀️", "Hot sun", 78, 50]], ["Snow on mountains"], { labels: true, hint: "Think of Murree or Hunza.", why: "Snow falls on the northern mountains in winter." })),
      Q("diary", "reason", "seasons.summer_rain", mc("Zainab says summer has no rain. Is she right?", "No, in Pakistan the monsoon brings heavy rain in summer", ["Yes, summer is always dry", "Yes, rain only falls in winter"], { hint: "Think about July and August.", why: "The monsoon brings heavy rain in summer." }),
        mc("Aisha says it never rains in the UK in summer. Is she right?", "No, the UK can have showers in summer", ["Yes, summer is always dry in the UK", "Yes, rain only falls in winter"], { hint: "Think about a summer shower.", why: "It can rain in any season." })),
      Q("diary", "reason", "seasons.daylight_longer", mc("Sam says days are longer in winter. Is he right?", "No, winter days are shorter", ["Yes, winter days are longest", "Yes, days never change"], { hint: "Think about the sun setting early.", why: "Winter has the shortest days." }),
        mc("Mira says the sun rises at the same time all year. Is she right?", "No, it rises later in winter and earlier in summer", ["Yes, it always rises at six", "Yes, it never rises in winter"], { hint: "Think about dark winter mornings.", why: "Sunrise changes through the year." })),
      Q("prepare", "reason", "seasons.cloud_burn", mc("Omar says you cannot get sunburnt on a cloudy day. Is he right?", "No, harmful sun rays can still reach us through cloud", ["Yes, clouds block all the sun", "Yes, only hot days burn"], { hint: "Think about sun safety.", why: "We can burn even when it is cloudy, so we use shade, a hat and sun cream." }),
        mc("Hira says a sun hat is only needed when it is hot. Is she right?", "No, bright sun can burn even when it is not hot", ["Yes, heat is the only danger", "Yes, hats are only for winter"], { hint: "Think about the sun's rays.", why: "Bright sun can burn skin even on cooler days." })),
    ],
  }),
];
