import { SAY, SS, H, T, IMG, FACT, REVEAL, ACT, BRAIN, SUM, CHK, BAR, TABLE, S, EXP, GLOSS, mc, ms, tf, st, ord, mat, fill, hot, sld, PHOTO } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// General Knowledge, Class 4 (Fatima, age 9), topics 3 and 4. Standards come from docs/CURRICULUM_V2.md.
// Dates and figures are widely agreed approximations and are written as "about" where they are not exact.
// History stays factual and gentle; no religious text is quoted from memory.
const SCENE = (title, backdrop, ...scenes) => ({ ...EXP(title, ...scenes), backdrop });
const P = (id, x, y, label, emoji, size = 2, anim = "none") => [id, emoji, x, y, size, anim, label];
const std = (code, text) => ({ framework: "nc_england", code, ...(text ? { text } : {}) });

// ====================================================================================================
// Topic 3: People who shaped the world
// ====================================================================================================

const MADRASA = "general-knowledge-class-4-people-who-shaped-the-world-1-eedd81b0.jpg";
const CARAVAN = "general-knowledge-class-4-people-who-shaped-the-world-2-fc390c19.jpg";
const COMPASS = "general-knowledge-class-4-people-who-shaped-the-world-3-d069c4af.jpg";
const golden = {
  id: "golden", kind: "learn", title: "Golden Age thinkers",
  blocks: [
    H("Welcome, young historian!"),
    SAY("Today we meet people whose ideas shaped the world. How did knowledge travel?", T("Today's big question: how did people and ideas from the Golden Age shape our world?")),
    SAY("This courtyard is a place of learning, with tall arches and tile patterns. Scholars once gathered in places like it.", PHOTO(MADRASA, "The silhouette of a person in a doorway looking at a courtyard with tall brick arches and blue tile patterns", "A historic madrasa courtyard with arches and tile patterns, a place of learning.", "Photo by Mehmet Can Özgümüş on Unsplash")),
    H("Stop 1: A golden age of learning"),
    SAY("From about the year 750 to 1250, scholars in the Muslim world made great discoveries. They worked in maths, medicine, astronomy and engineering. This time is often called the Golden Age. A famous centre of learning was the House of Wisdom in Baghdad. Scholars gathered books from many lands and translated them. They added new ideas of their own. Let us meet four of these remarkable people.", T("From about 750 to 1250, scholars in the Muslim world made great discoveries. This time is called the **Golden Age**.", "Many worked in the **House of Wisdom** in Baghdad.")),
    SCENE("Four great thinkers", "plain",
      SS("Al-Khwarizmi lived in Baghdad about 1,200 years ago. He wrote a famous book about solving problems with numbers. We get the word algebra from its title. And our word algorithm comes from his name!", S("Al-Khwarizmi gave us algebra and the word algorithm.", P("a", 50, 50, "Al-Khwarizmi: algebra", "🔢", 3))),
      SS("Ibn al-Haytham studied light. He showed that we see because light bounces off objects into our eyes. He tested his ideas with careful experiments. That is why he is called a pioneer of the scientific method.", S("Ibn al-Haytham studied light.", P("a", 20, 50, "Al-Khwarizmi", "🔢", 2), P("b", 62, 50, "Ibn al-Haytham: light", "👁️", 3))),
      SS("Al-Zahrawi was a famous surgeon in Córdoba, in Spain. He wrote a huge medical book. He drew pictures of surgical tools, many of them his own inventions.", S("Al-Zahrawi was a great surgeon.", P("a", 12, 50, "Al-Khwarizmi", "🔢", 1), P("b", 32, 50, "Ibn al-Haytham", "👁️", 1), P("c", 66, 50, "Al-Zahrawi: surgery", "🩺", 3))),
      SS("And Fatima al-Fihri was from a family who moved to Fez, in Morocco. She used her inheritance to found a place of learning, the al-Qarawiyyin, in 859. It is often called the oldest university still working today.", S("Fatima al-Fihri founded al-Qarawiyyin.", P("a", 10, 50, "Al-Khwarizmi", "🔢", 1), P("b", 30, 50, "Ibn al-Haytham", "👁️", 1), P("c", 50, 50, "Al-Zahrawi", "🩺", 1), P("d", 78, 50, "Fatima al-Fihri: a university", "🎓", 3)))),
    CHK(mc("Which scholar's name gave us the word algorithm?", "Al-Khwarizmi", ["Ibn al-Haytham", "Al-Zahrawi"], { hint: "He also wrote about algebra.", why: "The word algorithm comes from Al-Khwarizmi's name." })),
    H("Stop 2: Why they matter"),
    SAY("Why do we still remember these people? Because their ideas are still used. Algebra is taught in schools around the world. Ibn al-Haytham's experiments are a model for how scientists work today. Surgeons still use tools like those Al-Zahrawi drew. And Fatima al-Fihri shows that a person with a vision can build something that lasts a thousand years.", T("Their ideas are still used today. Many students study **algebra** and science in the same way.", "Good scientists test their ideas with **experiments**.")),
    IMG("🔢👁️🩺🎓", "Algebra, the study of light, surgery and universities all grew from Golden Age scholars."),
    CHK(tf("Fatima al-Fihri founded a university in Fez, Morocco.", true, { hint: "It was in the year 859.", why: "She founded al-Qarawiyyin in Fez." })),
    SAY("Let us remember. The Golden Age gave us algebra, the study of light, surgery tools and a famous university.", SUM("The Golden Age ran from about 750 to 1250", "Al-Khwarizmi gave us algebra, and Ibn al-Haytham studied light and tested ideas", "Al-Zahrawi was a surgeon, and Fatima al-Fihri founded a university")),
    GLOSS({ "Golden Age": "A time of great learning and discoveries in the Muslim world, about 750 to 1250.", "House of Wisdom": "A famous centre of learning in Baghdad.", algebra: "A branch of maths that uses letters and symbols for numbers.", experiments: "Careful tests used to find out if an idea is true." }),
  ],
  mini: [
    mc("Where was the House of Wisdom?", "Baghdad", ["Fez", "Karachi"], { hint: "A great city in Iraq.", why: "The House of Wisdom was in Baghdad." }),
    mc("Who studied light and used experiments?", "Ibn al-Haytham", ["Al-Zahrawi", "Al-Khwarizmi"], { hint: "He showed how we see.", why: "Ibn al-Haytham studied light." }),
    tf("Al-Zahrawi was a surgeon.", true, { hint: "He drew surgical tools.", why: "Al-Zahrawi was a great surgeon." }),
    mc("What did Fatima al-Fihri found?", "A university", ["A railway", "A bank"], { hint: "It is called al-Qarawiyyin.", why: "She founded al-Qarawiyyin." }),
  ],
};

const battuta = {
  id: "battuta", kind: "try", title: "Ibn Battuta's journey",
  blocks: [
    H("Stop 1: The great traveller"),
    SAY("A camel caravan crosses a dune at dusk. Travellers like Ibn Battuta used routes like this.", PHOTO(CARAVAN, "A line of four camels with a guide walking along a sand dune at dusk in silhouette", "A camel caravan at dusk. Caravans carried goods and ideas along trade routes.", "Photo by Bernice Tong on Unsplash")),
    SAY("Ibn Battuta was born in 1304 in Tangier, in Morocco. When he was twenty-one, he set off to make the pilgrimage to Makkah. But he did not stop there! He kept on travelling for about thirty years, through Egypt, Arabia, Persia, East Africa, India and beyond. He travelled over a hundred thousand kilometres, a distance few people had ever covered. On his way he crossed the area that is today Pakistan, including Sindh and Multan.", T("**Ibn Battuta** was born in Morocco in 1304 and travelled for about 30 years.", "He covered over 100,000 kilometres and visited the area of today's Pakistan.")),
    SCENE("Ibn Battuta's journey", "map",
      SS("The journey begins in Tangier, in Morocco, in the far west. Ibn Battuta is twenty-one and sets out for Makkah.", S("The journey starts in Morocco.", P("m", 12, 40, "Tangier, Morocco", "🏠", 2), ["t", "🧳", 12, 58, 1, "bounce"])),
      SS("He reaches Makkah and completes the pilgrimage. But he is only just beginning!", S("Makkah.", P("m", 12, 40, "Tangier", "🏠", 1), P("k", 42, 50, "Makkah", "🕋", 2), ["t", "🧳", 42, 68, 1, "bounce"])),
      SS("He travels on, across Persia and Central Asia. He arrives in Sindh and Multan, on the Indus, in what is now Pakistan. Then on to Delhi.", S("Sindh, Multan and Delhi.", P("m", 12, 40, "Tangier", "🏠", 1), P("k", 38, 50, "Makkah", "🕋", 1), P("p", 66, 40, "Sindh and Multan", "🏯", 2, "pulse"), ["t", "🧳", 66, 60, 1, "bounce"])),
      SS("In the end, he returns home to Morocco. He tells his story in a famous book called the Rihla, which means journey.", S("He writes the Rihla.", P("m", 15, 45, "Home to Morocco", "🏠", 2), P("b", 60, 45, "The Rihla", "📖", 3, "pulse")))),
    CHK(mc("Where was Ibn Battuta born?", "Morocco", ["Pakistan", "China"], { hint: "He was born in Tangier.", why: "Ibn Battuta was born in Morocco." })),
    H("Stop 2: Why his book matters"),
    SAY("Why is his book so valuable? Because he wrote about what he saw: the cities, the markets, the food, and the people he met. Today, historians use the Rihla as a source. It shows what life was like in many places about seven hundred years ago. Travellers then needed courage: there were no planes or maps like ours, and the journeys could be dangerous.", T("The **Rihla** describes the places and people he met.", "Historians use it as a **source** about the past.")),
    IMG("📖🗺️", "The Rihla tells us what the world was like about 700 years ago."),
    ACT("Plan a journey like Ibn Battuta", ["A world map", "String or a pencil", "Sticky notes"], ["Find Morocco, Makkah, Pakistan and China on the map.", "Use string to show a route from Morocco, through Makkah, to Pakistan.", "Write one question you would ask a traveller from Morocco.", "How long would the journey take with a camel, and how long by plane?"]),
    CHK(tf("The Rihla is a book of Ibn Battuta's travels.", true, { hint: "It means journey.", why: "The Rihla describes his travels." })),
    SAY("Let us remember. Ibn Battuta travelled for about thirty years and wrote the Rihla, a source about the past.", SUM("Ibn Battuta was born in Morocco in 1304", "He travelled for about 30 years, over 100,000 kilometres, including through Sindh and Multan", "His book, the Rihla, tells us about life long ago")),
    GLOSS({ "Ibn Battuta": "A great traveller from Morocco, born in 1304.", Rihla: "Ibn Battuta's book about his journeys. The word means journey.", source: "Something that gives us information about the past.", pilgrimage: "A special journey to a holy place." }),
  ],
  mini: [
    mc("What is the name of Ibn Battuta's book?", "The Rihla", ["The Atlas", "The Algebra"], { hint: "It means journey.", why: "His book is the Rihla." }),
    mc("About how long did Ibn Battuta travel?", "About 30 years", ["About 3 days", "About 300 years"], { hint: "It was most of his adult life.", why: "He travelled for about 30 years." }),
    tf("Ibn Battuta travelled through the area of today's Pakistan.", true, { hint: "Think of Sindh and Multan.", why: "He crossed Sindh and Multan." }),
    mc("What is a source in history?", "Something that gives us information about the past", ["A kind of river", "A kind of tool"], { hint: "Historians use sources.", why: "A source gives information about the past." }),
  ],
};

const inventions = {
  id: "inventions", kind: "play", title: "Inventions that changed life",
  blocks: [
    H("Stop 1: Ideas and inventions"),
    SAY("A compass shows north. Sailors used it to cross the seas.", PHOTO(COMPASS, "An open brass compass lying on a dark wooden surface", "A brass compass. Sailors used compasses to find north.", "Photo by Aaron Burden on Unsplash")),
    SAY("Many things we use every day grew from old ideas. Paper became common in the Muslim world about twelve hundred years ago. It made books cheaper to make and share. Algebra helps us solve problems in science, building and computers. Hospitals, called bimaristans, cared for sick people and trained doctors. And Al-Jazari was an engineer who lived about 900 years ago. He built clever machines, including water clocks and a hand-washing machine like a modern tap.", T("**Paper** made books cheaper. **Algebra** helps solve problems.", "Al-Jazari built clever machines, including water clocks.")),
    SCENE("Ideas that changed life", "plain",
      SS("Paper. Before paper, books were copied by hand onto expensive materials. With paper, many more people could read and learn.", S("Paper.", P("p", 50, 50, "Paper", "📜", 3))),
      SS("Algebra. Letters stand for numbers we do not know yet, so we can solve a problem step by step.", S("Algebra.", P("p", 22, 50, "Paper", "📜", 2), P("a", 62, 50, "Algebra", "🔢", 3))),
      SS("Hospitals. Doctors treated patients and taught students, and recorded what they learnt.", S("Hospitals.", P("p", 12, 50, "Paper", "📜", 1), P("a", 32, 50, "Algebra", "🔢", 1), P("h", 66, 50, "Hospitals", "🏥", 3))),
      SS("And Al-Jazari's machines. His water clock used the flow of water to tell the time.", S("Al-Jazari's water clock.", P("p", 10, 50, "Paper", "📜", 1), P("a", 28, 50, "Algebra", "🔢", 1), P("h", 46, 50, "Hospitals", "🏥", 1), P("w", 76, 50, "Al-Jazari's water clock", "⏰", 3)))),
    CHK(mc("Which idea made books cheaper to make and share?", "Paper", ["Algebra", "Water clocks"], { hint: "Think of the material pages are made from.", why: "Paper made books cheaper." })),
    H("Stop 2: Brain game"),
    SAY("Time for a brain break. Find the matching pairs of ideas and inventions.", T("Turn over two cards at a time. Can you find all the pairs?")),
    BRAIN("memory_match", "Ideas and inventions", "Find the matching pairs.", ["🔢", "🏥", "📜", "⏰", "🔭", "⚙️"]),
    CHK(mc("Who built a famous water clock about 900 years ago?", "Al-Jazari", ["Al-Khwarizmi", "Ibn Battuta"], { hint: "He was an engineer.", why: "Al-Jazari built water clocks and other machines." })),
    SAY("Let us remember. Paper, algebra, hospitals and clever machines all have roots in the Golden Age.", SUM("Paper made books cheaper", "Algebra solves problems step by step", "Al-Jazari built water clocks and other machines")),
    GLOSS({ paper: "A thin material made from plant fibres, used for writing.", algebra: "Maths that uses letters for numbers we do not know yet.", "Al-Jazari": "An engineer who lived about 900 years ago and built clever machines.", bimaristans: "Hospitals of the Muslim world that cared for patients and trained doctors." }),
  ],
  mini: [
    mc("What did Al-Jazari build?", "Water clocks and clever machines", ["Paper", "A university"], { hint: "He was an engineer.", why: "Al-Jazari built machines like water clocks." }),
    tf("Paper made it easier to share books.", true, { hint: "Think about the cost.", why: "Paper made books cheaper." }),
    mc("What were bimaristans?", "Hospitals", ["Libraries", "Markets"], { hint: "Doctors worked there.", why: "Bimaristans were hospitals." }),
    mc("Which of these uses letters for numbers?", "Algebra", ["Paper", "A water clock"], { hint: "Think of Al-Khwarizmi.", why: "Algebra uses letters for numbers." }),
  ],
};

const pakistanBegan = {
  id: "pakistan", kind: "use", title: "How Pakistan began",
  blocks: [
    H("Stop 1: A homeland for Muslims"),
    SAY("Now let us come home to our own country. Until 1947, the land we call Pakistan was part of British India. Many Muslims wanted a homeland where they could live their way of life freely. In 1930, the poet and thinker Allama Muhammad Iqbal shared an idea. It was a Muslim homeland in the north-west. In 1940, on the twenty-third of March, a resolution was passed in Lahore asking for it. The leader of this movement was Muhammad Ali Jinnah, whom we call Quaid-e-Azam.", T("Until 1947, the land of Pakistan was part of British India.", "Allama Iqbal shared the idea in 1930. The **Lahore Resolution** was passed in 1940.")),
    SCENE("The road to Pakistan", "plain",
      SS("In 1930, Allama Muhammad Iqbal, a poet and thinker, shared the idea of a homeland for Muslims.", S("1930: Iqbal's idea.", P("a", 50, 50, "1930: Allama Iqbal's idea", "💡", 3))),
      SS("In 1940, on 23 March, a resolution was passed in Lahore. It is called the Lahore Resolution, and it set out the goal of a homeland.", S("1940: The Lahore Resolution.", P("a", 22, 50, "1930", "💡", 2), P("b", 62, 50, "1940: Lahore Resolution", "📜", 3))),
      SS("And on 14 August 1947, Pakistan became a new, independent country. Muhammad Ali Jinnah was its first Governor-General.", S("1947: Pakistan is born.", P("a", 12, 50, "1930", "💡", 1), P("b", 32, 50, "1940", "📜", 1), P("c", 68, 50, "14 August 1947: Pakistan", "🇵🇰", 3, "pulse")))),
    CHK(mc("On what date did Pakistan become an independent country?", "14 August 1947", ["23 March 1940", "1 January 2000"], { hint: "We celebrate Independence Day.", why: "Pakistan became independent on 14 August 1947." })),
    H("Stop 2: Remembering the founders"),
    SAY("Many people helped create Pakistan. Muhammad Ali Jinnah was the founder and first Governor-General. Allama Iqbal is our national poet. Liaquat Ali Khan became the first Prime Minister. Karachi was the first capital, and later Islamabad was built as the new capital. It was also a hard time. Many families had to leave their homes and move to a new place. We remember their courage and hope.", T("**Quaid-e-Azam** Muhammad Ali Jinnah was the founder of Pakistan.", "Allama Iqbal is the national poet. We remember the courage of the families who moved.")),
    IMG("🇵🇰🌙⭐", "Pakistan's flag has a crescent and a star. We celebrate Independence Day on 14 August."),
    ACT("My family and Pakistan", ["A grown-up helper", "Paper and pencil"], ["Ask an older relative: what is a story your family tells about Pakistan's early years?", "Write down two things you learn.", "Draw a picture of Independence Day, with green and white flags."]),
    CHK(tf("Karachi was the first capital of Pakistan.", true, { hint: "Islamabad was built later.", why: "Karachi was the first capital." })),
    SAY("Let us remember. Pakistan was born on 14 August 1947. Iqbal shared the idea, the Lahore Resolution set the goal, and Quaid-e-Azam led the way.", SUM("Pakistan became independent on 14 August 1947", "Allama Iqbal shared the idea of a homeland in 1930", "The Lahore Resolution was passed on 23 March 1940, and Quaid-e-Azam led the movement")),
    GLOSS({ "Lahore Resolution": "The resolution passed on 23 March 1940 that called for a homeland.", "Quaid-e-Azam": "Muhammad Ali Jinnah, the founder of Pakistan.", independence: "Being free to govern yourself." }),
  ],
  mini: [
    mc("Who is known as Quaid-e-Azam?", "Muhammad Ali Jinnah", ["Allama Iqbal", "Al-Khwarizmi"], { hint: "He was Pakistan's founder.", why: "Quaid-e-Azam is Muhammad Ali Jinnah." }),
    mc("What is Allama Iqbal known as?", "The national poet", ["The first doctor", "A famous traveller"], { hint: "He was a poet and thinker.", why: "Allama Iqbal is Pakistan's national poet." }),
    tf("The Lahore Resolution was passed in 1940.", true, { hint: "On 23 March.", why: "It was passed on 23 March 1940." }),
    mc("When do we celebrate Independence Day?", "14 August", ["23 March", "25 December"], { hint: "It is in the summer.", why: "Independence Day is 14 August." }),
  ],
};

const ALTS_C4_3 = [
  [mc("Which Golden Age scholar wrote about algebra and gave his name to the word algorithm?", "Al-Khwarizmi", ["Al-Jazari", "Al-Zahrawi"], { hint: "Starts with Al-Kh.", why: "Al-Khwarizmi's name gave us algorithm.", tag: "golden.who" }), mc("The word algorithm comes from the name of a scholar. Who?", "Al-Khwarizmi", ["Ibn Battuta", "Ibn al-Haytham"], { hint: "He wrote about algebra.", why: "Al-Khwarizmi.", tag: "golden.who" })],
  [mat("Match each scholar to what they are known for.", [["Al-Khwarizmi", "Algebra"], ["Ibn al-Haytham", "Light and experiments"], ["Al-Zahrawi", "Surgery"], ["Fatima al-Fihri", "Founding a university"]], { hint: "Think about each person.", why: "Each was a great figure of the Golden Age.", tag: "golden.match" }), mat("Match each person to their contribution.", [["Al-Jazari", "Water clocks"], ["Ibn Battuta", "A travel book"], ["Al-Zahrawi", "Surgical tools"]], { hint: "Think about each person.", why: "These are famous figures.", tag: "golden.match" })],
  [tf("Al-Qarawiyyin is in Fez, Morocco.", true, { hint: "Fatima al-Fihri founded it.", why: "It was founded in Fez.", tag: "golden.fact" }), tf("Fatima al-Fihri lived in the 20th century.", false, { hint: "She founded it in 859.", why: "She lived over 1,000 years ago.", tag: "golden.fact" })],
  [ord("Arrange these from the earliest to the latest.", ["Al-Khwarizmi (about 820)", "Fatima al-Fihri (859)", "Ibn al-Haytham (about 1020)", "Al-Jazari (1206)"], { hint: "Compare the dates.", why: "820 < 859 < 1020 < 1206.", tag: "golden.order" }), ord("Which order shows these people from the earliest to the latest?", ["Fatima al-Fihri founds al-Qarawiyyin (859)", "Ibn Battuta is born (1304)", "Pakistan is founded (1947)"], { hint: "Compare the dates.", why: "859 < 1304 < 1947.", tag: "golden.order" })],
  [st("Ibn Battuta wrote a famous travel book. What is it called? Write one word.", ["rihla", "the rihla", "al-rihla"], { hint: "It means journey.", why: "The book is the Rihla.", tag: "battuta.book" }), st("What word means a journey, and is the title of Ibn Battuta's book? Write one word.", ["rihla"], { hint: "It begins with R.", why: "Rihla means journey.", tag: "battuta.book" })],
  [sld("Slide to show roughly how long Ibn Battuta spent travelling, in years.", { min: 0, max: 60 }, 30, 2, { hint: "He set out at 21 and travelled most of his life.", why: "About 30 years.", tag: "battuta.years" }), sld("Slide to show his age when he set off from Morocco.", { min: 0, max: 60 }, 21, 1, { hint: "Born in 1304, left in 1325.", why: "He was 21.", tag: "battuta.years" })],
  [fill("Finish the sentences.", "Ibn Battuta was born in {b1}. He travelled through the area of today's {b2}.", [["Morocco", "Egypt", "China"], ["Pakistan", "Brazil", "Canada"]], { hint: "He crossed Sindh and Multan.", why: "He was born in Morocco and crossed what is now Pakistan.", tag: "battuta.fill" }), fill("Fill in the gaps.", "His book is called the {b1}. It tells us what life was like {b2} years ago.", [["Rihla", "Algebra", "Atlas"], ["about 700", "about 7", "about 7,000"]], { hint: "Think about the book's name and date.", why: "The Rihla tells about life about 700 years ago.", tag: "battuta.fill" })],
  [hot("Tap the machine that used moving water to measure time.", [["⏰", "Water clock", 22, 50], ["📱", "Mobile phone", 50, 50], ["🚗", "Car", 78, 50]], ["Water clock"], { labels: true, hint: "Al-Jazari built one.", why: "A water clock uses flowing water.", tag: "inventions.pic" }), hot("Tap the idea that made books cheaper.", [["📜", "Paper", 22, 50], ["🔢", "Algebra", 50, 50], ["🏥", "Hospital", 78, 50]], ["Paper"], { labels: true, hint: "Think of pages.", why: "Paper made books cheaper.", tag: "inventions.pic" })],
  [ms("Which two ideas came from Golden Age scholars? Pick two.", ["Algebra", "Surgical tools drawn in books"], ["The light bulb", "Smartphones"], { hint: "Think of Al-Khwarizmi and Al-Zahrawi.", why: "Algebra and surgical tools come from the Golden Age.", tag: "inventions.pick" }), ms("Pick the two that Golden Age scholars worked on.", ["Light and optics", "Medicine"], ["Space rockets", "Television"], { hint: "Think of Ibn al-Haytham and Al-Zahrawi.", why: "They studied light and medicine.", tag: "inventions.pick" })],
  [mc("Why do people say Ibn al-Haytham helped begin the scientific method?", "He tested his ideas with careful experiments", ["He built a clock", "He travelled to China"], { hint: "Think about how he studied light.", why: "He used experiments to test ideas.", tag: "golden.reason" }), mc("Why do scientists still copy Ibn al-Haytham's way of working?", "Testing ideas with experiments gives reliable answers", ["He wrote in Arabic", "He lived in Baghdad"], { hint: "Think about experiments.", why: "Experiments show whether an idea is true.", tag: "golden.reason" })],
  [mc("Why is the Rihla a helpful source for historians?", "It records what places and people were like long ago", ["It is a map", "It is a recipe book"], { hint: "It is a source.", why: "It describes the world about 700 years ago.", tag: "battuta.reason" }), mc("Why do historians read Ibn Battuta's book?", "To learn how people lived 700 years ago", ["To find a recipe", "To learn algebra"], { hint: "It is a source.", why: "It describes the places and people he met.", tag: "battuta.reason" })],
  [mc("On which date did Pakistan become independent?", "14 August 1947", ["23 March 1940", "25 December 1930"], { hint: "We celebrate it every year.", why: "Pakistan became independent on 14 August 1947.", tag: "pakistan.date" }), mc("Which year did Pakistan become an independent country?", "1947", ["1940", "1930"], { hint: "14 August.", why: "Pakistan was founded in 1947.", tag: "pakistan.date" })],
  [mat("Match each date to its event.", [["1930", "Iqbal shared the idea of a homeland"], ["23 March 1940", "Lahore Resolution"], ["14 August 1947", "Pakistan became independent"]], { hint: "Think about the order.", why: "These are key dates.", tag: "pakistan.match" }), mat("Match each person to their role.", [["Muhammad Ali Jinnah", "Founder, first Governor-General"], ["Allama Iqbal", "National poet and thinker"], ["Liaquat Ali Khan", "First Prime Minister"]], { hint: "Think about their roles.", why: "These are Pakistan's key founders.", tag: "pakistan.match" })],
  [mc("Why does the Lahore Resolution matter in the story of Pakistan?", "It was a key step towards Pakistan's creation", ["It built Islamabad", "It ended the Golden Age"], { hint: "It was passed on 23 March 1940.", why: "It set out the goal of a homeland.", tag: "pakistan.reason" }), mc("Why do we celebrate 14 August?", "It is the day Pakistan became independent", ["It is the longest day", "It is a harvest day"], { hint: "It is Independence Day.", why: "Pakistan became independent on 14 August.", tag: "pakistan.reason" })],
  [mc("Why did paper matter so much for learning?", "Books could be made and shared more cheaply", ["It was heavy", "It was only for kings"], { hint: "Think about cost.", why: "Paper made books cheaper.", tag: "inventions.reason" }), mc("Why did paper help spread new ideas?", "More people could own and read books", ["It was waterproof", "It cost a fortune"], { hint: "Think about more readers.", why: "Cheaper books reached more people.", tag: "inventions.reason" })],
];

const clipC3 = {
  title: "Fatima follows a scholar's idea", backdrop: "town", caption: "Fatima follows one idea from the House of Wisdom as it travels along trade routes.",
  scenes: [
    { caption: "Baghdad.", say: "Fatima visits Baghdad in the Golden Age of learning.",
      items: [{ id: "f", emoji: "👧", label: "Fatima", x: 22, y: 60, size: 3 }, { id: "b", emoji: "🕌", x: 70, y: 52, size: 3 }] },
    { caption: "A new idea.", say: "A scholar writes a new idea in a book.",
      items: [{ id: "s", emoji: "📜", x: 50, y: 52, size: 3, anim: "pulse" }] },
    { caption: "Translators.", say: "Translators from many faiths turn the book into other languages.",
      items: [{ id: "t", emoji: "🔤", x: 50, y: 52, size: 3 }] },
    { caption: "A caravan.", say: "The book travels on a camel caravan along trade routes.",
      items: [{ id: "c", emoji: "🐪", x: 50, y: 56, size: 3, enter: "walk_right" }] },
    { caption: "A compass.", say: "On the sea, sailors use a compass to find north.",
      items: [{ id: "k", emoji: "🧭", x: 50, y: 52, size: 3, anim: "spin" }] },
    { caption: "Cordoba.", say: "In Cordoba, scholars read the book and add their own ideas.",
      items: [{ id: "r", emoji: "📚", x: 50, y: 52, size: 3 }] },
    { caption: "A source.", say: "Today we study letters and books as sources.",
      items: [{ id: "h", emoji: "🔎", x: 50, y: 52, size: 3, anim: "pulse" }] },
    { caption: "Shared.", say: "Shared knowledge grew, and it still shapes our world.",
      items: [{ id: "w", emoji: "🌍", x: 50, y: 52, size: 3, effect: "sparkle" }] },
  ],
};

const t3 = topicLesson({
  slug: "general-knowledge-class-4-people-who-shaped-the-world", subject: "general-knowledge", cls: 4, topic: 3, title: "People Who Shaped the World",
  summary: "Golden Age scholars, the traveller Ibn Battuta, ideas and inventions that changed life, and how Pakistan began.",
  unit: "Topic 3: People who shaped the world", difficulty: 2,
  objectives: ["Name Golden Age scholars and what they gave the world", "Explain who Ibn Battuta was and why his book matters", "Describe key ideas and inventions", "Tell the story of how Pakistan began"],
  success_criteria: ["I can name Golden Age scholars and their ideas", "I can say who Ibn Battuta was", "I can tell key dates in Pakistan's story"],
  real_life: "Hearing family stories about Pakistan, celebrating Independence Day, and noticing how old ideas like algebra and paper are part of daily life.",
  standards: [std("KS2 early Islamic civilisation", "A study of Islamic civilisation, including Baghdad c. AD 900"), { framework: "pyp", code: "Where we are in place and time" }],
  warm_up: [
    mc("What is the capital of Pakistan?", "Islamabad", ["Karachi", "Lahore"], { hint: "It is in the north.", why: "Islamabad is the capital." }),
    mc("What is a source of a river?", "Where it begins", ["Where it ends", "A bridge"], { hint: "Often in the mountains.", why: "A river begins at its source." }),
    tf("K2 is the second highest mountain on Earth.", true, { hint: "Everest is higher.", why: "K2 is second highest." }),
  ],
  intro: [],
  subs: [golden, battuta, inventions, pakistanBegan],
  clip: clipC3,
  quiz: [
    { q: mc("Whose name gave us the word algorithm?", "Al-Khwarizmi", ["Ibn al-Haytham", "Al-Jazari"], { hint: "He also wrote about algebra.", why: "Algorithm comes from Al-Khwarizmi's name.", tag: "golden.who" }), sub: "golden", depth: "recall" },
    { q: mat("Match each person to what they are known for.", [["Al-Khwarizmi", "Algebra"], ["Ibn al-Haytham", "Light and experiments"], ["Al-Zahrawi", "Surgery"], ["Fatima al-Fihri", "Founding a university"]], { hint: "Think about each person.", why: "Each was a great figure of the Golden Age.", tag: "golden.match" }), sub: "golden", depth: "apply" },
    { q: tf("Al-Qarawiyyin was founded in Fez, Morocco.", true, { hint: "Fatima al-Fihri founded it.", why: "It was founded in Fez.", tag: "golden.fact" }), sub: "golden", depth: "recall" },
    { q: ord("Put these in date order, earliest first.", ["Al-Khwarizmi (about 820)", "Fatima al-Fihri (859)", "Ibn al-Haytham (about 1020)", "Al-Jazari (1206)"], { hint: "Compare the dates.", why: "820, 859, 1020, 1206.", tag: "golden.order" }), sub: "golden", depth: "apply" },
    { q: st("What is the name of Ibn Battuta's famous travel book? Write one word.", ["rihla", "the rihla", "al-rihla"], { hint: "It means journey.", why: "The book is the Rihla.", tag: "battuta.book" }), sub: "battuta", depth: "apply" },
    { q: sld("Slide to show about how many years Ibn Battuta travelled for.", { min: 0, max: 60 }, 30, 2, { hint: "He set out at 21 and travelled most of his adult life.", why: "About 30 years.", tag: "battuta.years" }), sub: "battuta", depth: "apply" },
    { q: fill("Complete the sentences.", "Ibn Battuta was born in {b1}. He travelled through the area of today's {b2}, among many places.", [["Morocco", "Egypt", "China"], ["Pakistan", "Brazil", "Canada"]], { hint: "He crossed Sindh and Multan.", why: "He was born in Morocco and crossed what is now Pakistan.", tag: "battuta.fill" }), sub: "battuta", depth: "apply" },
    { q: hot("Tap the invention that told the time using flowing water.", [["⏰", "Water clock", 22, 50], ["📱", "Mobile phone", 50, 50], ["🚗", "Car", 78, 50]], ["Water clock"], { labels: true, hint: "Al-Jazari built one.", why: "A water clock uses flowing water.", tag: "inventions.pic" }), sub: "inventions", depth: "apply" },
    { q: ms("Which two are linked to scholars of the Golden Age? Pick two.", ["Algebra", "Surgical tools drawn in books"], ["The light bulb", "Smartphones"], { hint: "Think of Al-Khwarizmi and Al-Zahrawi.", why: "Algebra and surgical tools come from the Golden Age.", tag: "inventions.pick" }), sub: "inventions", depth: "apply" },
    { q: mc("Why is Ibn al-Haytham called a pioneer of the scientific method?", "He tested his ideas with careful experiments", ["He built a clock", "He travelled to China"], { hint: "Think about how he studied light.", why: "He used experiments to test ideas.", tag: "golden.reason" }), sub: "golden", depth: "reason" },
    { q: mc("Why is the Rihla useful to historians?", "It records what places and people were like long ago", ["It is a map", "It is a recipe book"], { hint: "It is a source.", why: "It describes the world about 700 years ago.", tag: "battuta.reason" }), sub: "battuta", depth: "reason" },
    { q: mc("On which date did Pakistan become an independent country?", "14 August 1947", ["23 March 1940", "25 December 1930"], { hint: "We celebrate it every year.", why: "Pakistan became independent on 14 August 1947.", tag: "pakistan.date" }), sub: "pakistan", depth: "recall" },
    { q: mat("Match each date to what happened.", [["1930", "Iqbal shared the idea of a homeland"], ["23 March 1940", "The Lahore Resolution"], ["14 August 1947", "Pakistan became independent"]], { hint: "Think about the order.", why: "These are key dates.", tag: "pakistan.match" }), sub: "pakistan", depth: "apply" },
    { q: mc("Why is the Lahore Resolution important in Pakistan's story?", "It was a key step towards Pakistan's creation", ["It built Islamabad", "It ended the Golden Age"], { hint: "It was passed on 23 March 1940.", why: "It set out the goal of a homeland.", tag: "pakistan.reason" }), sub: "pakistan", depth: "reason" },
    { q: mc("Why was paper so important for learning?", "Books could be made and shared more cheaply", ["It was heavy", "It was only for kings"], { hint: "Think about cost.", why: "Paper made books cheaper.", tag: "inventions.reason" }), sub: "inventions", depth: "reason" },
    // ----- upgrade: 15 new mains (q16-q30), 1 variant each
    { q: mc("What was a caliph in the early Islamic world?", "A leader of the Muslim community and its lands", ["A kind of astronomer", "A traveller's book"], { hint: "Think about the rulers of Baghdad.", why: "A caliph led the Muslim community and its lands.", tag: "golden.caliph" }), sub: "golden", depth: "recall", alts: [mc("Who gave support to scholars in Baghdad's House of Wisdom?", "The caliphs", ["The sailors", "The farmers"], { hint: "They were the rulers.", why: "The caliphs supported scholars and learning.", tag: "golden.caliph" })] },
    { q: mc("Rida says only Muslims worked in the House of Wisdom. Is she right?", "No, scholars of different faiths and backgrounds worked there, including Christians and Jews", ["Yes, only Muslims", "Yes, no other scholars were allowed"], { hint: "Think about translators.", why: "Many scholars of different faiths worked together.", tag: "golden.reason.faiths" }), sub: "golden", depth: "reason", alts: [mc("Imran says the House of Wisdom was only for one group of people. Is he right?", "No, it brought together scholars from many places and faiths", ["Yes, one group only", "Yes, it was closed to visitors"], { hint: "Think about translators and scholars.", why: "It welcomed scholars from many backgrounds.", tag: "golden.reason.faiths" })] },
    { q: tf("Scholars in Baghdad translated Greek texts into Arabic.", true, { hint: "Think about the translation movement.", why: "Scholars translated Greek and other texts into Arabic.", tag: "golden.translate" }), sub: "golden", depth: "recall", alts: [tf("Scholars in Baghdad refused to read texts from other cultures.", false, { hint: "They collected knowledge from many places.", why: "They translated texts from Greece, Persia and India.", tag: "golden.translate" })] },
    { q: st("Write the word for the branch of maths developed by al-Khwarizmi. It starts with A.", ["algebra"], { hint: "It comes from al-jabr.", why: "Al-Khwarizmi helped to develop algebra.", tag: "golden.algebra" }), sub: "golden", depth: "recall", alts: [st("Write the word for the study of light that Ibn al-Haytham advanced. It starts with O.", ["optics"], { hint: "It is about how we see.", why: "Ibn al-Haytham advanced the study of optics.", tag: "golden.optics" })] },
    { q: mc("Ibn al-Haytham explained that we see because...", "light bounces off objects and enters our eyes", ["our eyes send out rays", "the Sun draws pictures"], { hint: "Think about experiments with a dark room.", why: "He showed that light enters the eye.", tag: "golden.light" }), sub: "golden", depth: "apply", alts: [mc("Which method did Ibn al-Haytham use to test his ideas?", "Careful experiments", ["Guessing", "Copying old books only"], { hint: "Think about the scientific method.", why: "He tested ideas with experiments.", tag: "golden.light" })] },
    { q: mc("Zara says women could not found universities in the past. Is she right?", "No, Fatima al-Fihri founded the Al-Qarawiyyin university in Fez", ["Yes, only men could", "Yes, there were no universities then"], { hint: "Think about Fez in Morocco.", why: "Fatima al-Fihri founded Al-Qarawiyyin, a famous centre of learning.", tag: "golden.reason.fihri" }), sub: "golden", depth: "reason", alts: [mc("Hamza says no woman has ever helped build a centre of learning. Is he right?", "No, Fatima al-Fihri helped found Al-Qarawiyyin", ["Yes, no woman did", "Yes, only men built them"], { hint: "Think about Fez.", why: "Fatima al-Fihri founded Al-Qarawiyyin.", tag: "golden.reason.fihri" })] },
    { q: sld("The Hijra took place in 622 CE. Slide to show the year.", { min: 500, max: 700 }, 622, 5, { hint: "It is the start of the Islamic calendar.", why: "The Hijra was in 622 CE.", tag: "golden.hijra" }), sub: "battuta", depth: "recall", alts: [sld("The Lahore Resolution was passed in 1940. Slide to show the year.", { min: 1900, max: 1960 }, 1940, 2, { hint: "It was in the 1940s.", why: "The Lahore Resolution was in 1940.", tag: "pak.lahore" })] },
    { q: mc("On which date is Pakistan Day, remembering the Lahore Resolution?", "23 March", ["14 August", "25 December"], { hint: "Think of spring.", why: "Pakistan Day is on 23 March.", tag: "pak.day" }), sub: "pakistan", depth: "recall", alts: [mc("In which year was the Lahore Resolution passed?", "1940", ["1947", "1930"], { hint: "It was seven years before independence.", why: "The Lahore Resolution was in 1940.", tag: "pak.day" })] },
    { q: mc("Rafay says Pakistan was created by only one person. Is he right?", "No, many leaders and millions of people worked for it, with Muhammad Ali Jinnah as a key leader", ["Yes, one person alone", "Yes, no one else helped"], { hint: "Think about Allama Iqbal and many others.", why: "Many people took part, and Jinnah led the movement.", tag: "pak.reason.founders" }), sub: "pakistan", depth: "reason", alts: [mc("Sana says Allama Iqbal and Muhammad Ali Jinnah did the same job. Is she right?", "No, Iqbal was a poet and thinker, and Jinnah led the movement as a lawyer and politician", ["Yes, the same job", "Yes, both were sailors"], { hint: "Think about a poet and a lawyer.", why: "They played different roles.", tag: "pak.reason.founders" })] },
    { q: mc("Ali says all inventions come from one place. Is he right?", "No, ideas such as paper, numbers and the compass travelled between many places", ["Yes, all from one place", "Yes, all from Baghdad"], { hint: "Think about the Silk Road.", why: "Ideas spread and were improved in many places.", tag: "inv.reason.place" }), sub: "inventions", depth: "reason", alts: [mc("Hira says paper was invented in Baghdad. Is she right?", "No, paper came from China and spread to Baghdad", ["Yes, Baghdad invented it", "Yes, from Spain"], { hint: "Think about the Silk Road.", why: "Paper-making came from China.", tag: "inv.reason.place" })] },
    { q: hot("Tap the instrument with a magnetic needle that shows north.", [["🧭", "Compass", 22, 50], ["🔭", "Telescope", 50, 50], ["⏳", "Hourglass", 78, 50]], ["Compass"], { labels: true, hint: "Sailors used it to find direction.", why: "A compass shows north.", tag: "inv.compass" }), sub: "inventions", depth: "apply", alts: [hot("Tap the instrument that helps find the position of the stars.", [["🌟", "Astrolabe", 22, 50], ["⚖️", "Scales", 50, 50], ["🔨", "Hammer", 78, 50]], ["Astrolabe"], { labels: true, hint: "Sailors and astronomers used it.", why: "An astrolabe helps to measure the stars.", tag: "inv.compass" })] },
    { q: fill("Complete the sentence about Baghdad and Cordoba.", "Both Baghdad and Cordoba had great {b1} and welcomed {b2}.", [["libraries", "volcanoes", "deserts"], ["scholars", "tigers", "storms"]], { hint: "Think about learning.", why: "Both cities were centres of learning.", tag: "inv.cordoba" }), sub: "inventions", depth: "apply", alts: [fill("Complete the sentence about Cordoba.", "Cordoba was in {b1}, which Muslims called {b2}.", [["Spain", "Egypt", "Iran"], ["Al-Andalus", "Al-Hind", "Al-Sham"]], { hint: "Think about southern Europe.", why: "Cordoba was in Spain, called Al-Andalus.", tag: "inv.cordoba" })] },
    { q: ord("Put these stages of Ibn Battuta's life in order.", ["He leaves Tangier", "He makes Hajj in Makkah", "He travels to India", "His Rihla is written down"], { hint: "Follow his journey.", why: "He left Tangier, went to Makkah, travelled to India and later told his story.", tag: "bat.order" }), sub: "battuta", depth: "apply", alts: [ord("Put the steps of a historical enquiry in order.", ["Ask a question", "Find sources", "Compare the sources", "Write a conclusion"], { hint: "Ask first.", why: "Historians ask, find, compare and conclude.", tag: "bat.order" })] },
    { q: ms("Pick two primary sources about the past.", ["A letter written at the time", "A coin from the period"], ["A modern textbook", "A museum website written today"], { hint: "Primary sources come from the time itself.", why: "A letter and a coin come from the time.", tag: "bat.primary" }), sub: "battuta", depth: "apply", alts: [ms("Pick two secondary sources about the past.", ["A modern textbook", "A documentary made today"], ["A coin from the period", "A diary written at the time"], { hint: "Secondary sources are written later.", why: "Textbooks and documentaries come later.", tag: "bat.primary" })] },
    { q: mc("Hamza says keeping knowledge secret helps civilisation grow faster. Is he right?", "No, sharing knowledge lets others test, improve and use ideas", ["Yes, secrets help most", "Yes, sharing slows things down"], { hint: "Think about translation and books.", why: "Shared knowledge spreads and improves.", tag: "pak.reason.share" }), sub: "pakistan", depth: "reason", alts: [mc("Aliya says an idea is better if only one person knows it. Is she right?", "No, sharing lets many people improve it", ["Yes, only one person", "Yes, secrets are better"], { hint: "Think about the House of Wisdom.", why: "Shared ideas can grow and help many.", tag: "pak.reason.share" })] },
  ].map((x, i) => ({ ...x, alts: x.alts ?? ALTS_C4_3[i] })),
});

// ====================================================================================================
// Topic 4: Living together on one planet
// ====================================================================================================

const SOLAR = "general-knowledge-class-4-living-together-on-one-planet-1-ce50edd5.jpg";
const TURBINES = "general-knowledge-class-4-living-together-on-one-planet-2-84b1db67.jpg";
const CARGO = "general-knowledge-class-4-living-together-on-one-planet-3-f4f27ac9.jpg";
const pollution = {
  id: "pollution", kind: "learn", title: "Pollution and recycling",
  blocks: [
    H("Welcome, young citizen of the world!"),
    SAY("Today we ask a big question. How can we live together on one planet and look after it?", T("Today's big question: how can we live sustainably on one planet?")),
    SAY("These homes use solar panels to make electricity from sunshine. Many homes in Pakistan are adding them too.", PHOTO(SOLAR, "Houses with blue solar panels on their red roofs, a rainbow in the sky and green fields behind", "Solar panels on rooftops, turning sunlight into electricity.", "Photo by Lara John on Unsplash")),
    H("Stop 1: What is pollution?"),
    SAY("Pollution is when harmful things get into the air, water or land and make them dirty or unsafe. Smoke from factories and cars pollutes the air. Chemicals and rubbish in rivers pollute the water. And plastic bags and bottles left on the ground pollute the land. Pollution harms people, animals and plants. Plastic is a big problem, because it can take hundreds of years to break down.", T("**Pollution** is when harmful things get into the air, water or land.", "Plastic can take hundreds of years to break down.")),
    SCENE("Three kinds of pollution", "town",
      SS("Smoke and fumes from factories and cars pollute the air. This is air pollution.", S("Air pollution.", P("f", 28, 50, "Factory smoke", "🏭", 3), P("c", 72, 60, "Car fumes", "🚗", 2))),
      SS("Rubbish and chemicals in rivers pollute the water, and fish can be harmed.", S("Water pollution.", P("r", 30, 60, "Dirty river", "🌊", 3), P("fi", 70, 60, "Harmed fish", "🐟", 2))),
      SS("Litter on the ground, like plastic bottles, pollutes the land and can hurt animals.", S("Land pollution.", P("l", 30, 55, "Litter", "🗑️", 3), P("b", 72, 55, "Plastic bottle", "🧴", 2)))),
    CHK(mc("What is pollution?", "Harmful things in air, water or land", ["Clean rain", "A kind of weather"], { hint: "It makes places dirty or unsafe.", why: "Pollution is harmful things in air, water or land." })),
    H("Stop 2: Reduce, reuse, recycle"),
    SAY("We can fight pollution with three Rs: reduce, reuse and recycle. Reduce means to use less, for example by carrying a cloth bag. Reuse means to use things again, like refilling a bottle. Recycle means turning used things into new ones, like paper, glass, metal and some plastics. At a recycling centre, materials are sorted, cleaned and made into new things. Using buses, bikes or walking also reduces air pollution.", T("The three Rs are **reduce**, **reuse** and **recycle**.", "Recycling turns used materials into new things.")),
    IMG("♻️📄🥫", "Paper, glass, metal and some plastics can be recycled."),
    CHK(tf("Recycling turns used materials into new things.", true, { hint: "Think of old paper.", why: "Recycling gives materials a new life." })),
    SAY("Let us remember. Pollution harms the air, water and land. Reduce, reuse and recycle to help.", SUM("Pollution is harmful things in the air, water or land", "Plastic can last hundreds of years", "Reduce, reuse and recycle")),
    GLOSS({ pollution: "Harmful things in the air, water or land.", reduce: "To use less.", reuse: "To use again.", recycle: "To turn used things into new things." }),
  ],
  mini: [
    mc("Which is an example of air pollution?", "Smoke from a factory", ["Rain", "A river"], { hint: "It goes up into the air.", why: "Factory smoke pollutes the air." }),
    mc("What does reuse mean?", "Use something again", ["Throw it away", "Use it less"], { hint: "Think of refilling a bottle.", why: "To reuse is to use again." }),
    tf("Plastic breaks down in a few days.", false, { hint: "Think about how long it lasts.", why: "Plastic can take hundreds of years." }),
    mc("Which helps reduce air pollution?", "Walking or cycling", ["Driving short trips", "Burning rubbish"], { hint: "Think of cleaner travel.", why: "Walking and cycling make no fumes." }),
  ],
};

const saving = {
  id: "saving", kind: "try", title: "Saving water and energy",
  blocks: [
    H("Stop 1: Precious water"),
    SAY("Water is precious. About ninety-seven percent of the water on Earth is salty. Most of the rest is frozen in ice. Only a very small amount is fresh water that we can use. That is why we must not waste it. Turn off the tap while brushing teeth. Fix dripping taps and take short showers. Water plants with leftover water. In Pakistan, the Indus gives much of our fresh water, so saving it helps farmers and cities.", T("About 97 percent of Earth's water is salty. Only a little is **fresh water** we can use.", "We can save water by fixing leaks and not leaving taps running.")),
    BAR("Earth's water, in tens of per cent", [["Salty", 97, "🌊"], ["Fresh", 3, "💧"]], "About 97 out of every 100 parts of water are salty, and about 3 are fresh. Most fresh water is frozen as ice."),
    CHK(tf("Most of the water on Earth is fresh water.", false, { hint: "Look at the bar chart.", why: "About 97 percent is salty." })),
    H("Stop 2: Energy from the Sun and wind"),
    SAY("Wind turbines turn on a green hillside. Wind is another renewable source of energy.", PHOTO(TURBINES, "White wind turbines on green hills lit by golden light, with mist below", "Wind turbines on hills. Wind is a renewable source of energy.", "Photo by Zetong Li on Unsplash")),
    SAY("We use energy for light, cooking, and moving machines. Coal, oil and gas are fossil fuels. They took millions of years to form and will run out, and they cause pollution when burned. Renewable energy comes from sources that do not run out, like the Sun, wind and flowing water. Pakistan has dams like Tarbela on the Indus that make electricity from water. Many homes now use solar panels.", T("Coal, oil and gas are **fossil fuels**. They will run out and cause pollution.", "**Renewable** energy comes from the Sun, wind and water, and does not run out.")),
    SCENE("Where energy comes from", "plain",
      SS("Fossil fuels, like coal, oil and gas, are burned to make energy. They produce smoke and will run out.", S("Fossil fuels run out.", P("f", 30, 50, "Coal, oil and gas", "🛢️", 3), P("s", 72, 50, "Smoke", "💨", 2))),
      SS("Solar panels turn sunlight into electricity. The Sun will shine for billions of years.", S("Solar power.", P("a", 30, 50, "Solar panels", "☀️", 3), P("e", 72, 50, "Electricity", "💡", 2, "pulse"))),
      SS("Wind turbines and dams use moving wind and water. These are renewable too.", S("Wind and water power.", P("w", 30, 50, "Wind turbine", "🌬️", 3), P("d", 72, 50, "Dam on a river", "🏞️", 2)))),
    ACT("Home energy and water detective", ["Paper and pencil", "A grown-up helper"], ["Walk round your home with a grown-up. List every place that uses water, and every light or machine that uses electricity.", "Tick the ones that were left on or running when nobody needed them.", "Write three ways your family could save water and energy.", "Try them for a week. What changed?"]),
    CHK(mc("Which of these is a renewable energy source?", "Sunlight", ["Coal", "Oil"], { hint: "It does not run out.", why: "The Sun's energy is renewable." })),
    SAY("Let us remember. Fresh water is limited. Renewable energy, like solar and wind, does not run out.", SUM("Only about 3 percent of Earth's water is fresh", "Fossil fuels run out and cause pollution", "Renewable energy comes from the Sun, wind and water")),
    GLOSS({ "fresh water": "Water that is not salty, which we can drink.", "fossil fuels": "Coal, oil and gas, which formed over millions of years and will run out.", renewable: "A source that does not run out, like sunlight.", energy: "The power that makes lights and machines work." }),
  ],
  mini: [
    mc("About what share of Earth's water is salty?", "About 97 per cent", ["About 3 per cent", "About 50 per cent"], { hint: "Most of Earth's water is in the oceans.", why: "About 97 percent is salty." }),
    mc("Which is a fossil fuel?", "Coal", ["Wind", "Sunlight"], { hint: "It is burned for energy.", why: "Coal is a fossil fuel." }),
    tf("Solar panels use the Sun's energy.", true, { hint: "Think of the word solar.", why: "Solar panels turn sunlight into electricity." }),
    mc("Which saves water?", "Fixing a dripping tap", ["Leaving the tap on", "Washing the car daily"], { hint: "Think about waste.", why: "Fixing leaks saves water." }),
  ],
};

const money = {
  id: "money", kind: "play", title: "Money and trade",
  blocks: [
    H("Stop 1: Needs, wants and money"),
    SAY("Money helps us get the things we need. A need is something we must have to live well, such as food, water, clothes and a home. A want is something nice to have but not essential, such as a new toy. People earn money by working, and they can spend it or save it. Saving means keeping some for later, so we have enough for something important. Wise people think before they spend.", T("A **need** is something we must have. A **want** is something nice to have.", "People earn money, and can spend it or save it.")),
    IMG("🍞🏠🧸🎮", "Bread and a home are needs. A toy and a game are wants."),
    CHK(mc("Which of these is a need?", "Food", ["A new video game", "A toy robot"], { hint: "We must have it to live.", why: "Food is a need." })),
    H("Stop 2: Trading between countries"),
    SAY("No country has everything it needs. So countries trade. Goods that a country sells to other countries are called exports. Goods that a country buys from other countries are called imports. Pakistan exports rice, cotton cloth, leather goods and sports goods, such as the footballs made in Sialkot. It imports things like oil and machines. Trade helps everyone get more of what they need.", T("**Exports** are sold to other countries. **Imports** are bought from other countries.", "Pakistan exports rice, cloth and footballs. It imports oil and machines.")),
    SCENE("Exports and imports", "map",
      SS("Pakistan grows rice and makes cotton cloth and footballs. These are sold to other countries. They are exports.", S("Pakistan's exports.", P("p", 22, 55, "Pakistan", "🇵🇰", 2), P("e", 68, 38, "Rice", "🍚", 2), P("e2", 68, 72, "Footballs", "⚽", 2), ["a", "➡️", 46, 55, 1, "pulse"])),
      SS("Pakistan buys oil and machines from other countries. These are imports.", S("Pakistan's imports.", P("p", 72, 55, "Pakistan", "🇵🇰", 2), P("i", 25, 38, "Oil", "🛢️", 2), P("i2", 25, 72, "Machines", "⚙️", 2), ["a", "⬅️", 48, 55, 1, "pulse"]))),
    CHK(tf("Exports are goods that a country sells to other countries.", true, { hint: "Think of the footballs.", why: "Exports are sold to other countries." })),
    H("Stop 3: Brain game"),
    SAY("Time for a brain break. Find the matching pairs of money and trade pictures.", T("Turn over two cards at a time. Can you find all the pairs?")),
    BRAIN("memory_match", "Trade pairs", "Find the matching pairs.", ["🍚", "🧵", "⚽", "🛢️", "🚢", "💰"]),
    SAY("Let us remember. Needs are essential and wants are extras. Countries trade because none has everything.", SUM("A need is something we must have, a want is nice to have", "Exports are sold, imports are bought", "Countries trade because none has everything")),
    GLOSS({ need: "Something we must have to live well.", want: "Something nice to have but not essential.", exports: "Goods a country sells to other countries.", imports: "Goods a country buys from other countries.", trade: "Buying and selling goods." }),
  ],
  mini: [
    mc("What is an import?", "Goods bought from another country", ["Goods sold abroad", "A kind of boat"], { hint: "Import means bring in.", why: "Imports are goods bought from other countries." }),
    mc("Which is a want?", "A new toy", ["Water", "Food"], { hint: "It is not essential.", why: "A toy is a want." }),
    tf("Pakistan exports footballs.", true, { hint: "Think of Sialkot.", why: "Pakistan exports footballs." }),
    mc("What does saving money mean?", "Keeping some for later", ["Spending it all", "Losing it"], { hint: "Think about the future.", why: "Saving is keeping money for later." }),
  ],
};

const silk = {
  id: "silk", kind: "use", title: "The Silk Road",
  blocks: [
    H("Stop 1: A road of many roads"),
    SAY("A cargo ship carries goods across the sea. Trade links countries around the world.", PHOTO(CARGO, "A cargo ship seen from above, loaded with rows of coloured containers on blue-green sea", "A cargo ship loaded with containers. Most world trade goes by sea.", "Photo by Venti Views on Unsplash")),
    SAY("About two thousand years ago, traders began to carry goods from China to the Mediterranean Sea. This network of routes was named the Silk Road, because silk was one of the most precious goods. The routes crossed deserts, mountains and rivers. Traders travelled in caravans of camels, because camels can carry heavy loads over long distances in the desert. Some routes passed through what is now northern Pakistan, and cities like Taxila were busy trading places.", T("The **Silk Road** was a network of trade routes between China and the Mediterranean.", "Traders travelled in **caravans** of camels.")),
    SCENE("A Silk Road caravan", "map",
      SS("The journey begins in China, where silk is made and packed.", S("China: silk is packed.", P("c", 10, 50, "China", "🏯", 2), ["cam", "🐪", 10, 70, 2, "bounce"])),
      SS("The caravan crosses deserts and high mountains, including the Karakoram in the north of Pakistan.", S("The caravan crosses the mountains.", P("c", 10, 50, "China", "🏯", 1), P("m", 40, 40, "Karakoram", "🏔️", 2), ["cam", "🐪", 40, 70, 2, "bounce"])),
      SS("In cities such as Taxila, traders swapped goods, and ideas as well as goods were exchanged.", S("Taxila and trading cities.", P("c", 8, 50, "China", "🏯", 1), P("m", 30, 40, "Karakoram", "🏔️", 1), P("t", 60, 40, "Taxila", "🏛️", 2), ["cam", "🐪", 60, 70, 2, "bounce"])),
      SS("At the far end, in the Mediterranean, silk and spices reached the markets of Europe.", S("The goods reach the Mediterranean.", P("c", 6, 50, "China", "🏯", 1), P("m", 22, 40, "Karakoram", "🏔️", 1), P("t", 44, 40, "Taxila", "🏛️", 1), P("e", 84, 40, "Mediterranean", "🏰", 2), ["cam", "🐪", 84, 70, 2, "bounce"]))),
    CHK(mc("What was a caravan?", "A group of travellers and animals together", ["A kind of silk", "A mountain"], { hint: "Think of camels.", why: "A caravan is a group of traders and animals travelling together." })),
    H("Stop 2: Goods and ideas"),
    SAY("Traders did not only carry silk. They also carried spices like pepper, glass, paper, tea, horses and precious stones. But something even more important travelled too: ideas. Inventions such as paper and new ideas in maths, medicine and religion spread along the roads. The Silk Road shows us that when people trade and meet, they share knowledge. Everyone learns from each other.", T("Silk, spices, glass and paper travelled the Silk Road.", "**Ideas** and inventions travelled too.")),
    IMG("🧵🌶️📜💡", "Silk, spices, paper and ideas travelled along the Silk Road."),
    REVEAL("Why were the Silk Road routes so important to the world?", "They connected distant places, so goods, ideas, inventions and cultures could travel. People learnt from each other."),
    CHK(tf("Only silk was carried on the Silk Road.", false, { hint: "Think about spices and ideas.", why: "Many goods and ideas travelled." })),
    SAY("Let us remember. The Silk Road linked China and the Mediterranean, and goods and ideas travelled along it.", SUM("The Silk Road linked China and the Mediterranean", "Traders used camel caravans", "Goods and ideas travelled along it, and routes passed through northern Pakistan")),
    GLOSS({ "Silk Road": "A network of ancient trade routes between China and the Mediterranean.", caravans: "Groups of traders and animals travelling together.", ideas: "Thoughts and knowledge that people share.", spices: "Strong-tasting plant parts, like pepper, used to flavour food." }),
  ],
  mini: [
    mc("What was silk?", "A precious cloth", ["A spice", "A river"], { hint: "It was made in China.", why: "Silk is a precious cloth." }),
    mc("Which animals carried loads on the Silk Road?", "Camels", ["Penguins", "Dolphins"], { hint: "They cross deserts.", why: "Camels carried heavy loads." }),
    tf("Ideas travelled along the Silk Road as well as goods.", true, { hint: "Think about paper and maths.", why: "Ideas and inventions spread too." }),
    mc("Which Pakistani city was an old trading place on the Silk Road?", "Taxila", ["Islamabad", "Karachi"], { hint: "It is an ancient city.", why: "Taxila was a busy trading city." }),
  ],
};

const ALTS_C4_4 = [
  [mc("What do we call harmful things in air, water or land?", "Pollution", ["Weather", "Recycling"], { hint: "It makes places dirty.", why: "Pollution is harmful things in the environment.", tag: "pollution.what" }), mc("Which word describes dirty or harmful things in air, water or land?", "Pollution", ["Climate", "Energy"], { hint: "It harms people and animals.", why: "That is pollution.", tag: "pollution.what" })],
  [ms("Which two choices cut down pollution? Pick two.", ["Recycling bottles", "Taking the bus instead of a car"], ["Burning rubbish", "Dropping litter"], { hint: "Think about the three Rs.", why: "Recycling and using the bus help.", tag: "pollution.actions" }), ms("Pick the two that help our environment.", ["Reusing a water bottle", "Cycling to school"], ["Throwing rubbish in a river", "Leaving taps on"], { hint: "Think about reducing waste.", why: "Reusing and cycling help.", tag: "pollution.actions" })],
  [ord("Order the steps for recycling paper.", ["Paper is collected", "It is sorted at a recycling centre", "It is cleaned and made into pulp", "It becomes new paper"], { hint: "Start with collecting.", why: "Collect, sort, clean, new paper.", tag: "pollution.order" }), ord("Put the recycling steps in order.", ["We put the can in the bin", "A lorry collects it", "The can is melted", "A new can is made"], { hint: "Start with the bin.", why: "Bin, collect, melt, new can.", tag: "pollution.order" })],
  [tf("Only a small share of Earth's water is fresh.", true, { hint: "Most is salty.", why: "About 3 percent is fresh.", tag: "saving.water" }), tf("Most of Earth's water is in lakes and rivers.", false, { hint: "Most is in the oceans.", why: "Most water is salty ocean water.", tag: "saving.water" })],
  [mc("Why is solar power a good choice for the future?", "The Sun's energy will not run out", ["It makes lots of smoke", "It needs coal"], { hint: "It is renewable.", why: "Sunlight is renewable.", tag: "saving.reason" }), mc("Why are renewable sources better than fossil fuels?", "They do not run out and cause less pollution", ["They are heavier", "They are older"], { hint: "Think about the long term.", why: "Renewables last and are cleaner.", tag: "saving.reason" })],
  [fill("Finish the sentences.", "Oil and gas are {b1} fuels. Wind and sunlight are {b2} sources.", [["fossil", "fresh", "soft"], ["renewable", "limited", "fossil"]], { hint: "Think about what runs out.", why: "Oil and gas are fossil fuels; wind and sunlight are renewable.", tag: "saving.fill" }), fill("Fill in the gaps.", "Solar panels use the {b1}. Dams use flowing {b2}.", [["Sun", "wind", "oil"], ["water", "sand", "smoke"]], { hint: "Think about the energy sources.", why: "Solar panels use the Sun; dams use flowing water.", tag: "saving.fill" })],
  [sld("Slide to show about what per cent of Earth's water is fresh.", { min: 0, max: 100 }, 3, 2, { hint: "It is a very small amount.", why: "About 3 percent.", tag: "saving.percent" }), sld("Slide to show roughly the share of Earth's water that is salt water, as a per cent.", { min: 0, max: 100 }, 97, 2, { hint: "It is most of it.", why: "About 97 percent.", tag: "saving.percent" })],
  [mat("Match each word to the idea it names.", [["Export", "Sold to other countries"], ["Import", "Bought from other countries"], ["Need", "Something we must have"], ["Want", "Something nice to have"]], { hint: "Think about each word.", why: "These are key money words.", tag: "money.words" }), mat("Match each word to what it means.", [["Earn", "Get money for work"], ["Save", "Keep money for later"], ["Spend", "Use money to buy"]], { hint: "Think about money.", why: "These are money words.", tag: "money.words" })],
  [hot("Tap the product that Pakistan sells abroad.", [["⚽", "Footballs from Sialkot", 22, 50], ["🛢️", "Crude oil bought from abroad", 50, 50], ["🚗", "Imported cars", 78, 50]], ["Footballs from Sialkot"], { labels: true, hint: "It is made in Sialkot.", why: "Footballs are an export.", tag: "money.export" }), hot("Tap the export of Pakistan.", [["🍚", "Rice", 22, 50], ["🛢️", "Imported oil", 50, 50], ["⚙️", "Imported machines", 78, 50]], ["Rice"], { labels: true, hint: "Pakistan grows it.", why: "Rice is an export.", tag: "money.export" })],
  [mc("Why do countries swap goods with one another?", "No country has everything it needs", ["Trade is a game", "All countries are the same"], { hint: "Think about oil and rice.", why: "Countries trade to get what they lack.", tag: "money.reason" }), mc("Why is trade useful for people?", "It gives access to goods they cannot make themselves", ["It makes goods vanish", "It stops people working"], { hint: "Think about imports.", why: "Trade gives people more goods.", tag: "money.reason" })],
  [st("Name the web of old trade routes linking China to the Mediterranean. Write two words.", ["silk road", "the silk road"], { hint: "It is named after a precious cloth.", why: "It is called the Silk Road.", tag: "silk.name" }), st("Which cloth gave the Silk Road its name? Write one word.", ["silk"], { hint: "It was made in China.", why: "The route is named after silk.", tag: "silk.name" })],
  [ms("Which two things moved along the Silk Road? Pick two.", ["Spices", "New ideas"], ["Aeroplanes", "Mobile phones"], { hint: "Think of long ago.", why: "Spices and ideas travelled along it.", tag: "silk.pick" }), ms("Pick the two that were carried by caravans.", ["Silk cloth", "Paper"], ["Electricity", "Petrol"], { hint: "Think of goods from long ago.", why: "Silk and paper were carried.", tag: "silk.pick" })],
  [mc("Why did Silk Road traders rely on camels?", "They can carry heavy loads over long desert journeys", ["They can fly", "They live in water"], { hint: "Think of deserts.", why: "Camels carry heavy loads across deserts.", tag: "silk.reason" }), mc("Why did traders use camel caravans?", "Camels can cross dry land with little water", ["Camels are very fast", "Camels were free"], { hint: "Think of deserts.", why: "Camels can go long distances without water.", tag: "silk.reason" })],
  [mc("Pick the item that is a want, not a need.", "A new video game", ["Clean water", "A warm coat"], { hint: "It is nice, but not essential.", why: "A video game is a want.", tag: "money.needs" }), mc("Which is a need?", "Clean water", ["A toy robot", "A new bike"], { hint: "We must have it to live.", why: "Water is a need.", tag: "money.needs" })],
  [mc("Why does plastic in the sea cause harm?", "It lasts hundreds of years and can harm sea animals", ["It melts quickly", "It makes fish bigger"], { hint: "Think about how long plastic lasts.", why: "Plastic lasts hundreds of years and harms wildlife.", tag: "pollution.reason" }), mc("Why should we not drop plastic bags on the ground?", "They stay a long time and can harm animals", ["They turn into flowers", "They float away safely"], { hint: "Think about how long plastic lasts.", why: "Plastic stays for hundreds of years.", tag: "pollution.reason" })],
];

const clipC4 = {
  title: "Fatima's planet-friendly day", backdrop: "town", caption: "Fatima follows her family's energy, waste and trade choices for a day and learns what sustainable means.",
  scenes: [
    { caption: "Morning sun.", say: "Fatima's family has solar panels on the roof of their home.",
      items: [{ id: "f", emoji: "👧", label: "Fatima", x: 22, y: 60, size: 3 }, { id: "s", emoji: "☀️", x: 66, y: 34, size: 3, anim: "pulse" }] },
    { caption: "Renewable.", say: "Sunlight is renewable energy. It will not run out.",
      items: [{ id: "p", emoji: "🔋", x: 50, y: 52, size: 3, anim: "pulse" }] },
    { caption: "Saving water.", say: "She turns off the tap while she brushes her teeth.",
      items: [{ id: "w", emoji: "🚰", x: 50, y: 54, size: 3 }] },
    { caption: "Three Rs.", say: "At school, they reduce, reuse and then recycle.",
      items: [{ id: "r", emoji: "♻️", x: 50, y: 52, size: 3, anim: "pulse" }] },
    { caption: "Food miles.", say: "She chooses local fruit with fewer food miles.",
      items: [{ id: "a", emoji: "🍎", x: 50, y: 54, size: 3, anim: "bounce" }] },
    { caption: "Trade by sea.", say: "Cargo ships carry goods between countries.",
      items: [{ id: "c", emoji: "🚢", x: 50, y: 54, size: 3, anim: "float" }] },
    { caption: "Fair trade.", say: "Fair trade helps farmers get a fair price.",
      items: [{ id: "f", emoji: "🤝", x: 50, y: 52, size: 3, anim: "bounce" }] },
    { caption: "Sustainable.", say: "Small choices by many people help our one planet.",
      items: [{ id: "g", emoji: "🌍", x: 50, y: 52, size: 3, effect: "sparkle" }] },
  ],
};

const t4 = topicLesson({
  slug: "general-knowledge-class-4-living-together-on-one-planet", subject: "general-knowledge", cls: 4, topic: 4, title: "Living Together on One Planet",
  summary: "Pollution and recycling, saving water and energy, money and trade, and the Silk Road.",
  unit: "Topic 4: Living together on one planet", difficulty: 2,
  objectives: ["Explain pollution and how recycling helps", "Say how to save water and energy", "Explain needs, wants, exports and imports", "Describe the Silk Road and why it mattered"],
  success_criteria: ["I can say what pollution is and how to reduce it", "I can name renewable energy sources and ways to save water", "I can explain trade, exports and imports", "I can say what the Silk Road was"],
  real_life: "Recycling at home, switching off lights, choosing what to buy, and seeing 'made in' labels on things in shops.",
  standards: [std("KS2 human geography", "Describe and understand key aspects of human geography, including economic activity, trade links and the distribution of natural resources, including energy and water"), { framework: "pyp", code: "Sharing the planet" }, { framework: "cambridge", code: "4SIC.05" }],
  warm_up: [
    mc("Which route linked China with the Mediterranean?", "The Silk Road", ["The Indus", "The Thames"], { hint: "Named after a precious cloth.", why: "That is the Silk Road." }),
    mc("What does a river's mouth mean?", "Where it meets the sea", ["Where it begins", "A small stream"], { hint: "It is the end of the journey.", why: "The mouth meets the sea." }),
    tf("Pakistan has more people than the UK.", true, { hint: "240 million against 68 million.", why: "Pakistan has many more people." }),
  ],
  intro: [],
  subs: [pollution, saving, money, silk],
  clip: clipC4,
  quiz: [
    { q: mc("What do we call things that make air, water or land dirty or harmful?", "Harmful things in the air, water or land", ["Clean rain", "A kind of weather"], { hint: "It makes places dirty or unsafe.", why: "Pollution is harmful things in the environment.", tag: "pollution.what" }), sub: "pollution", depth: "recall" },
    { q: ms("Which two actions help reduce pollution? Pick two.", ["Recycling paper and cans", "Walking or cycling short trips"], ["Burning plastic", "Dropping litter"], { hint: "Think about the three Rs.", why: "Recycling and walking help.", tag: "pollution.actions" }), sub: "pollution", depth: "apply" },
    { q: ord("Put the steps for recycling paper in order.", ["Paper is collected", "It is sorted at a recycling centre", "It is cleaned and made into pulp", "It becomes new paper"], { hint: "Start with collecting.", why: "Collect, sort, clean, new paper.", tag: "pollution.order" }), sub: "pollution", depth: "apply" },
    { q: tf("Most of the water on Earth is fresh and ready to drink.", false, { hint: "Most water is in the oceans.", why: "About 97 percent is salty.", tag: "saving.water" }), sub: "saving", depth: "recall" },
    { q: mc("Why is solar power a good choice?", "The Sun's energy is renewable and will not run out", ["It makes lots of smoke", "It needs coal"], { hint: "Renewable.", why: "Sunlight is renewable.", tag: "saving.reason" }), sub: "saving", depth: "reason" },
    { q: fill("Complete the sentences.", "Coal, oil and gas are {b1} fuels. The Sun and wind are {b2} energy.", [["fossil", "fresh", "soft"], ["renewable", "limited", "fossil"]], { hint: "Think about what runs out.", why: "Coal, oil and gas are fossil fuels; the Sun and wind are renewable.", tag: "saving.fill" }), sub: "saving", depth: "apply" },
    { q: sld("Slide to show about what per cent of Earth's water is salty.", { min: 0, max: 100 }, 97, 2, { hint: "It is most of it.", why: "About 97 percent is salty.", tag: "saving.percent" }), sub: "saving", depth: "recall" },
    { q: mat("Match each word to its meaning.", [["Export", "Sold to other countries"], ["Import", "Bought from other countries"], ["Need", "Something we must have"], ["Want", "Something nice to have"]], { hint: "Think about each word.", why: "These are key money words.", tag: "money.words" }), sub: "money", depth: "apply" },
    { q: hot("Tap the item that Pakistan sells to other countries.", [["⚽", "Footballs from Sialkot", 22, 50], ["🛢️", "Crude oil bought from abroad", 50, 50], ["🚗", "Imported cars", 78, 50]], ["Footballs from Sialkot"], { labels: true, hint: "It is made in Sialkot.", why: "Footballs are an export.", tag: "money.export" }), sub: "money", depth: "apply" },
    { q: mc("Why do countries trade with each other?", "No country has everything it needs", ["Trade is a game", "All countries are the same"], { hint: "Think about oil and rice.", why: "Countries trade to get what they lack.", tag: "money.reason" }), sub: "money", depth: "reason" },
    { q: st("What was the network of trade routes between China and the Mediterranean called? Write two words.", ["silk road", "the silk road"], { hint: "It is named after a precious cloth.", why: "It is the Silk Road.", tag: "silk.name" }), sub: "silk", depth: "apply" },
    { q: ms("Which two travelled along the Silk Road? Pick two.", ["Spices", "New ideas"], ["Aeroplanes", "Mobile phones"], { hint: "Think of long ago.", why: "Spices and ideas travelled along it.", tag: "silk.pick" }), sub: "silk", depth: "apply" },
    { q: mc("Why were camels so useful for Silk Road traders?", "They can carry heavy loads over long desert journeys", ["They can fly", "They live in water"], { hint: "Think of deserts.", why: "Camels carry heavy loads across deserts.", tag: "silk.reason" }), sub: "silk", depth: "reason" },
    { q: mc("Which of these is a want, not a need?", "A new video game", ["Clean water", "A warm coat"], { hint: "It is nice, but not essential.", why: "A video game is a want.", tag: "money.needs" }), sub: "money", depth: "recall" },
    { q: mc("Why is plastic left in the sea a problem?", "It lasts hundreds of years and can harm sea animals", ["It melts quickly", "It makes fish bigger"], { hint: "Think about how long plastic lasts.", why: "Plastic lasts hundreds of years and harms wildlife.", tag: "pollution.reason" }), sub: "pollution", depth: "reason" },
    // ----- upgrade: 15 new mains (q16-q30), 1 variant each
    { q: fill("Complete the sentence about energy sources.", "Wind and solar are {b1} energy sources because they {b2}.", [["renewable", "non-renewable", "dangerous"], ["will not run out", "cost nothing", "always make noise"]], { hint: "Think about sunshine and wind.", why: "Wind and sun do not run out, so they are renewable.", tag: "energy.renewable" }), sub: "saving", depth: "recall", alts: [fill("Complete the sentence about fossil fuels.", "Coal and oil are {b1} because they {b2}.", [["non-renewable", "renewable", "quick"], ["will run out one day", "never run out", "grow back quickly"], ], { hint: "They took millions of years to form.", why: "Fossil fuels will run out, so they are non-renewable.", tag: "energy.renewable" })] },
    { q: mc("Rida says net zero means a country makes zero emissions. Is she right?", "No, net zero means the emissions put into the air are balanced by emissions taken out", ["Yes, no emissions at all", "Yes, it means no factories"], { hint: "Think about balance.", why: "Net zero balances emissions released with emissions removed.", tag: "energy.reason.netzero" }), sub: "saving", depth: "reason", alts: [mc("Imran says net zero means the whole country switches everything off. Is he right?", "No, it means balancing the greenhouse gases added and removed", ["Yes, everything is switched off", "Yes, nobody uses energy"], { hint: "Think about balance.", why: "Net zero is about balance, not switching everything off.", tag: "energy.reason.netzero" })] },
    { q: hot("Tap the best place for solar panels at home in Pakistan.", [["🏠", "A sunny, south-facing roof", 22, 50], ["🌳", "Under a big tree", 50, 50], ["🏚️", "Inside a dark cellar", 78, 50]], ["A sunny, south-facing roof"], { labels: true, hint: "Panels need strong sunlight.", why: "Solar panels work best in open sunshine.", tag: "energy.solar" }), sub: "saving", depth: "apply", alts: [hot("Tap the best place for a wind turbine.", [["⛰️", "A windy hilltop", 22, 50], ["🏢", "A sheltered city street", 50, 50], ["🕳️", "Inside a cave", 78, 50]], ["A windy hilltop"], { labels: true, hint: "Turbines need strong wind.", why: "Windy places make the most power.", tag: "energy.solar" })] },
    { q: mc("Which action best reduces your carbon footprint?", "Walking or cycling instead of going by car", ["Leaving lights on", "Buying lots of new things"], { hint: "Think about fuel and emissions.", why: "Walking and cycling make far fewer emissions.", tag: "energy.footprint" }), sub: "saving", depth: "apply", alts: [mc("Which choice gives off the least carbon per person?", "A full bus", ["A car with one person", "A short flight"], { hint: "Share the journey.", why: "A full bus shares emissions between many people.", tag: "energy.footprint" })] },
    { q: tf("A dripping tap can waste many litres of water over a day.", true, { hint: "Think about drops adding up.", why: "Small drips add up to many litres.", tag: "water.drip" }), sub: "saving", depth: "apply", alts: [tf("Turning off the tap while brushing teeth saves no water at all.", false, { hint: "Think about running water.", why: "Turning off the tap saves litres.", tag: "water.drip" })] },
    { q: ms("Pick two goods Pakistan exports.", ["Rice", "Cotton cloth"], ["Snow", "Sand from the Arctic"], { hint: "Think about Pakistan's farms and mills.", why: "Pakistan exports rice and cotton goods.", tag: "trade.exports" }), sub: "money", depth: "apply", alts: [ms("Pick two things that help ships carry goods across the sea.", ["Ports", "Cargo containers"], ["Camels", "Bicycles"], { hint: "Think about harbours.", why: "Ports and containers help sea trade.", tag: "trade.sea" })] },
    { q: mat("Match each trade word to its meaning.", [["Import", "goods brought into a country"], ["Export", "goods sold to other countries"], ["Port", "where ships load and unload"], ["Trade", "buying and selling goods"]], { hint: "Think about direction.", why: "Each word has a clear meaning.", tag: "trade.words" }), sub: "money", depth: "recall", alts: [mat("Join each word to its meaning.", [["Merchant", "a person who buys and sells goods"], ["Tariff", "a tax on imported goods"], ["Cargo", "goods carried by a ship"], ["Profit", "money left after costs"]], { hint: "Think about trade.", why: "Each word has a clear meaning.", tag: "trade.words" })] },
    { q: mc("Hamza says recycling fixes all waste problems. Is he right?", "No, recycling helps, but reducing and reusing come first, and some things cannot be recycled", ["Yes, recycling fixes everything", "Yes, nothing is ever wasted"], { hint: "Think about the three Rs in order.", why: "Reduce and reuse come before recycling.", tag: "waste.reason.recycle" }), sub: "pollution", depth: "reason", alts: [mc("Mira says if we recycle everything, we can buy as much as we like. Is she right?", "No, making and moving things still uses energy, so buying less matters most", ["Yes, buy as much as we like", "Yes, recycling uses no energy"], { hint: "Think about energy used to recycle.", why: "Recycling uses energy and not everything can be recycled.", tag: "waste.reason.recycle" })] },
    { q: ord("Put the three Rs in order from the best choice to the last choice.", ["Reduce", "Reuse", "Recycle"], { hint: "Using less comes first.", why: "Reduce first, then reuse, then recycle.", tag: "waste.three" }), sub: "pollution", depth: "apply", alts: [ord("Put these in order for a plastic bottle's second life.", ["Collect the bottle", "Sort it with plastics", "Melt it down", "Make a new product"], { hint: "From bin to new product.", why: "Collect, sort, melt, make.", tag: "waste.three" })] },
    { q: mc("Sana says the longer food travels, the better for the planet. Is she right?", "No, long journeys use fuel, so local food usually has fewer food miles", ["Yes, longer is better", "Yes, travel makes food fresher"], { hint: "Think about fuel.", why: "Long transport adds emissions.", tag: "trade.reason.foodmiles" }), sub: "money", depth: "reason", alts: [mc("Adeel says food miles do not matter at all. Is he right?", "No, food miles show how far food travels and the fuel used", ["Yes, they do not matter", "Yes, food never travels far"], { hint: "Think about fuel.", why: "Food miles relate to emissions.", tag: "trade.reason.foodmiles" })] },
    { q: sld("Solar power gave about 5 out of every 100 units of the world's electricity in 2023. Slide to show the percentage.", { min: 0, max: 100 }, 5, 2, { hint: "It is a small but growing share.", why: "Solar provided about 5 per cent of the world's electricity in 2023.", tag: "energy.percent" }), sub: "saving", depth: "apply", alts: [sld("Wind and solar together gave about 13 out of every 100 units of the world's electricity in 2023. Slide to show the percentage.", { min: 0, max: 100 }, 13, 2, { hint: "Wind is about 8 and solar about 5.", why: "Wind and solar together gave about 13 per cent.", tag: "energy.percent" })] },
    { q: st("Write the name of the fabric that gave the Silk Road its name. It starts with S.", ["silk"], { hint: "It was made by silkworms.", why: "The Silk Road was named after silk.", tag: "silk.goods" }), sub: "silk", depth: "recall", alts: [st("Write the word for people who buy and sell goods along a trade route. It starts with M.", ["merchant", "merchants", "traders", "trader"], { hint: "They carried goods between cities.", why: "Merchants bought and sold goods along the route.", tag: "silk.merchants" })] },
    { q: mc("Hira says fair trade means farmers get paid less. Is she right?", "No, fair trade aims to give farmers and workers a fair price and safe conditions", ["Yes, paid less", "Yes, workers get nothing"], { hint: "Think about the word fair.", why: "Fair trade aims for fair pay and safe work.", tag: "trade.reason.fair" }), sub: "silk", depth: "reason", alts: [mc("Omar says fair trade only helps rich buyers. Is he right?", "No, it is meant to help producers get a fair deal", ["Yes, only rich buyers", "Yes, producers get nothing"], { hint: "Think about producers.", why: "Fair trade helps producers.", tag: "trade.reason.fair" })] },
    { q: mc("What is a problem with sending too much waste to landfill?", "It takes up land and can pollute soil and release gases", ["It makes the Sun hotter", "It grows more food"], { hint: "Think about what happens underground.", why: "Landfill uses space and can pollute.", tag: "waste.landfill" }), sub: "pollution", depth: "apply", alts: [mc("Why is a landfill site hard to reuse?", "The buried waste can release gases and leak liquids for many years", ["It is too small", "It is full of gold"], { hint: "Think about rotting waste.", why: "Landfill waste breaks down slowly and causes problems.", tag: "waste.landfill" })] },
    { q: mc("Omar says living sustainably only matters for rich countries. Is he right?", "No, every country and every person can use resources wisely so they last", ["Yes, only rich countries", "Yes, poor countries do not matter"], { hint: "Think about everyone sharing one planet.", why: "Sustainability matters to everyone.", tag: "sustain.reason.all" }), sub: "silk", depth: "reason", alts: [mc("Aliya says one person's choices can never matter. Is she right?", "No, many people's small choices together make a big difference", ["Yes, never matter", "Yes, only governments matter"], { hint: "Think about adding up.", why: "Small choices add up.", tag: "sustain.reason.all" })] },
  ].map((x, i) => ({ ...x, alts: x.alts ?? ALTS_C4_4[i] })),
});

export const topics = [t3, t4];
