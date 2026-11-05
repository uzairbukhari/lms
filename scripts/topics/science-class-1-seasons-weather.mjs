import { SAY, SS, H, T, IMG, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, TABLE, BAR, mc, ms, tf, num, ord, mat, fill, hot, sld, st } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC, PK, CAM } from "./_science-kit.mjs";

// Science Class 1, topic 5: Seasons and weather (Zainab, age 7). Enquiry type: pattern seeking.

const seasons = {
  id: "seasons", kind: "learn", title: "The four seasons",
  blocks: [
    H("Stop 1: Four seasons in the UK"),
    SAY("A year is split into seasons. In the UK there are four. Spring is when new leaves and flowers grow, and baby animals are born. Summer is warm and sunny, with long days. Autumn is when leaves turn red and brown and fall. Winter is cold, with short days and sometimes snow. Then spring comes again. It is a circle that goes round and round.", T("The UK has four **seasons**: spring, summer, autumn and winter.", "They come round in the same order every year.")),
    EB("meadow", "Four seasons of a tree",
      SS("In spring, the tree grows fresh green leaves and flowers.", S("Spring: new leaves.", ["t", "🌳", 50, 58, 3, "grow"], ["f", "🌸", 25, 70, 2, "bounce"])),
      SS("In summer, the tree is full of leaves. The days are long and warm.", S("Summer: warm and sunny.", ["t", "🌳", 50, 58, 3, "none"], ["s", "☀️", 80, 20, 3, "pulse"])),
      SS("In autumn, the leaves turn orange and fall down.", S("Autumn: falling leaves.", ["t", "🍂", 50, 58, 3, "none"], ["l", "🍁", 30, 75, 2, "float"])),
      SS("In winter, the branches are bare. It is cold and it may snow.", S("Winter: cold and bare.", ["t", "🌲", 50, 58, 3, "none"], ["w", "❄️", 25, 30, 2, "float"], ["w2", "❄️", 75, 25, 2, "float"]))),
    CHK(ord("Put the seasons in order, starting with spring.", ["Spring", "Summer", "Autumn", "Winter"], { hint: "Spring, then the sunny one.", why: "The order is spring, summer, autumn and winter." })),
    H("Stop 2: Seasons in Pakistan"),
    SAY("In Pakistan the seasons look different. Summer is very hot, and in many places the monsoon brings heavy rain in July and August. Autumn is mild. Winter is cool and sometimes it snows in the north, on the mountains. Then spring brings blossom, like almond flowers. So the same year has different weather in different countries.", T("Pakistan has hot summers, a rainy **monsoon**, mild autumns and cool winters.", "Different places have different weather in the same season.")),
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
    SAY("The weather is what it is like outside today. It can be sunny, rainy, windy, cloudy, snowy or foggy. It changes from day to day. Look at four kinds of weather.", T("**Weather** is what it is like outside: sunny, rainy, windy or cloudy.", "It can change every day.")),
    EB("sky", "Kinds of weather",
      SS("A sunny day. The sun is bright and the sky is blue.", S("Sunny.", ["a", "☀️", 50, 35, 3, "pulse"])),
      SS("A rainy day. Clouds are grey and raindrops fall.", S("Rainy.", ["a", "☁️", 50, 30, 3, "float"], ["r", "🌧️", 50, 55, 3, "bounce"])),
      SS("A windy day. The wind blows and makes things move.", S("Windy.", ["a", "💨", 40, 35, 3, "float"], ["k", "🪁", 70, 35, 3, "bounce"])),
      SS("A snowy day. Cold white snow falls from the sky.", S("Snowy.", ["a", "☃️", 50, 58, 3, "bounce"], ["s", "❄️", 25, 25, 2, "float"], ["s2", "❄️", 75, 25, 2, "float"]))),
    CHK(mc("Which kind of weather has raindrops falling?", "Rainy", ["Sunny", "Windy"], { hint: "Look at the clouds.", why: "Rainy weather has raindrops." })),
    H("Stop 2: How hot is it?"),
    SAY("A thermometer measures how hot or cold it is. The number on it is called the temperature. We measure it in degrees. The red line goes up when it is warm and goes down when it is cold. Look at what happens on a hot day.", EB("home", "A thermometer", SS("On a cold winter day, the thermometer shows a low number.", S("Cold: 5 degrees.", ["t", { kind: "thermometer", value: 5, from: -10, to: 50 }, 50, 52, 3, "none"])), SS("On a warm spring day, the number goes up.", S("Warm: 20 degrees.", ["t", { kind: "thermometer", value: 20, from: -10, to: 50 }, 50, 52, 3, "none"])), SS("On a very hot summer day in Lahore, it is even higher.", S("Hot: 40 degrees.", ["t", { kind: "thermometer", value: 40, from: -10, to: 50 }, 50, 52, 3, "none"])))),
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
    SAY("We choose clothes to suit the season and the weather. In winter we wear a coat, a scarf and gloves. In hot summer we wear light clothes and a sun hat. On rainy days we need a raincoat and boots. In Ramadan or at Eid, we wear special clothes too, but we still dress for the weather. Look at three outfits.", T("We choose clothes to suit the **weather**.", "Warm clothes for cold days, light clothes for hot days.")),
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
    intro: [
      H("Welcome back, young scientist!"),
      SAY("Welcome back, young scientist! Today's big question is: how does the weather change through the year? By the end, you will put the seasons in order, read a thermometer, and look for patterns in a weather chart. Let's go!", T("Today's big question: how does the weather change through the year?", "We will look for patterns.")),
      IMG("☀️🌧️❄️🍂", "Sun, rain, snow and autumn leaves."),
      GLOSS({ weather: "What it is like outside today." }),
    ],
    subs: [seasons, weather, diary, prepare],
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
    ],
  }),
];
