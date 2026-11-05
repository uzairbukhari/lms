import { SAY, SS, H, T, IMG, TIP, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Class 1 Maths topic 7: measuring and time (format 3.0). Standards from docs/CURRICULUM_V2.md.
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });
const CL = (id, hour, minute, x = 50, y = 44, size = 3, anim = "none") => [id, { kind: "clock", hour, minute }, x, y, size, anim];
const TH = (id, value, x = 50, y = 46, size = 1, anim = "none") => [id, { kind: "thermometer", value, from: -10, to: 50 }, x, y, size, anim];

const measure = {
  id: "measure", kind: "learn", title: "Length, mass, capacity and temperature",
  blocks: [
    H("Stop 1: Measuring things"),
    SAY("We measure things to say how big, how heavy or how much. Length tells us how long or tall something is, and we use a ruler. Mass tells us how heavy something is, and we use scales. Capacity tells us how much a container holds, and we use a measuring jug. Each one has its own tool.", T("**Length** is how long. **Mass** is how heavy. **Capacity** is how much a container holds.", "We use a ruler, scales and a measuring jug.")),
    IMG("📏", "A ruler measures length. Scales measure mass. A jug measures capacity."),
    CHK(mc("Which tool measures how heavy something is?", "Scales", ["A ruler", "A measuring jug"], { hint: "Heavy is about mass.", why: "Scales measure mass.", tag: "measure.tools" })),
    SAY("In school we often use centimetres for length. A pencil is about fifteen centimetres long. We use grams and kilograms for mass. A big bag of rice is one kilogram. And millilitres and litres for capacity. A bottle of water holds about one litre.", T("Length: centimetres. Mass: grams and kilograms. Capacity: millilitres and litres.")),
    CHK(mc("A pencil is about 15...", "centimetres", ["kilograms", "litres"], { hint: "Which unit is for length?", why: "Length is measured in centimetres.", tag: "measure.units" })),
    H("Stop 2: How hot or cold?"),
    SAY("Temperature tells us how hot or cold something is. We use a thermometer. Look at the red line. When it is cold, the line is low. When it is hot, the line rises. A cold winter day in England can be near zero degrees. A summer day in Pakistan can be forty degrees or more. Temperature is measured in degrees Celsius.", T("**Temperature** is how hot or cold. We measure it in degrees Celsius with a thermometer.", "The higher the red line, the hotter it is.")),
    EXPP("A thermometer",
      SS("A cold winter morning. The thermometer shows five degrees.", S("5 degrees: cold.", TH("t", 5))),
      SS("A warm spring day. Twenty degrees.", S("20 degrees: warm.", TH("t", 20, 50, 46, 1, "pulse"))),
      SS("A hot summer day. Forty degrees. The red line has gone way up!", S("40 degrees: very hot.", TH("t", 40, 50, 46, 1, "pulse")))),
    CHK(mc("Which temperature is the hottest?", "40 degrees", ["5 degrees", "20 degrees"], { hint: "Higher means hotter.", why: "40 is the highest, so it is the hottest.", tag: "measure.temperature" })),
    SAY("Remember. Length is how long, mass is how heavy, capacity is how much it holds, and temperature is how hot or cold. Each one has its own tool.", SUM("Length, mass, capacity and temperature", "Ruler, scales, jug and thermometer")),
    GLOSS({ length: "How long or tall something is.", mass: "How heavy something is.", capacity: "How much a container holds.", temperature: "How hot or cold something is.", thermometer: "A tool that measures temperature.", centimetres: "Small units for length.", kilograms: "Units for heavy things.", litres: "Units for how much a container holds.", ruler: "A tool for measuring length.", scales: "A tool for measuring mass." }),
  ],
  mini: [
    mc("Which tool measures length?", "A ruler", ["Scales", "A jug"], { hint: "Length is how long.", why: "A ruler measures length." }),
    mc("A bottle holds about one...", "litre", ["kilogram", "centimetre"], { hint: "Capacity is in litres.", why: "A bottle holds about 1 litre." }),
    tf("A thermometer measures how heavy something is.", false, { hint: "What does temperature mean?", why: "A thermometer measures how hot or cold." }),
    mc("Which is the coldest?", "0 degrees", ["20 degrees", "35 degrees"], { hint: "Lower means colder.", why: "0 is the lowest." }),
  ],
};

const oclock = {
  id: "oclock", kind: "try", title: "O'clock and half past",
  blocks: [
    H("Stop 1: O'clock"),
    SAY("A clock has two hands. The short hand is the hour hand. The long hand is the minute hand. When the long hand points straight up to the twelve, it is an o'clock time. The short hand tells us which hour. Here the short hand points to three. So it is three o'clock.", T("The short hand shows the **hour**. When the long hand points to 12, it is **o'clock**.", "Long hand on 12, short hand on 3: three o'clock.")),
    EXPP("Three o'clock",
      SS("The long hand points straight up at twelve. That means o'clock.", S("Long hand on 12: o'clock.", CL("c", 3, 0))),
      SS("The short hand points to three. So the time is three o'clock.", S("It is 3 o'clock.", CL("c", 3, 0, 50, 44, 3, "pulse"), ["s", "✅", 50, 90, 2, "bounce", "3 o'clock"]))),
    CHK(mc("The long hand is on 12 and the short hand is on 7. What time is it?", "7 o'clock", ["12 o'clock", "7:30"], { hint: "The short hand tells the hour.", why: "Long hand on 12 and short hand on 7 is 7 o'clock.", tag: "time.oclock" })),
    H("Stop 2: Half past"),
    SAY("Half past means the long hand has gone half way round the clock. It points straight down to the six. The short hand is half way between two hours. Here it is half way between three and four. So it is half past three.", T("**Half past**: the long hand points to 6, and the short hand is half way between two numbers.", "Half past 3 is 3:30.")),
    EXPP("Half past three",
      SS("The long hand points straight down to six. That is half way round.", S("Long hand on 6: half past.", CL("c", 3, 30))),
      SS("The short hand sits between three and four. It is half past three.", S("It is half past 3.", CL("c", 3, 30, 50, 44, 3, "pulse"), ["s", "✅", 50, 90, 2, "bounce", "half past 3"]))),
    ACT("Make a paper clock", ["A paper plate or card", "Two strips of card", "A split pin", "A pen"], ["Write the numbers 1 to 12 round the plate.", "Fix two hands in the middle with the split pin. Make the short one the hour hand.", "Show 4 o'clock, then 9 o'clock.", "Now show half past 2 and half past 8."]),
    CHK(mc("The long hand is on 6 and the short hand is between 5 and 6. What time is it?", "Half past 5", ["5 o'clock", "Half past 6"], { hint: "Long hand on 6 means half past.", why: "Half past 5 is 5:30.", tag: "time.half_past" })),
    SAY("Remember. The short hand tells the hour. The long hand on twelve is o'clock. The long hand on six is half past.", SUM("The short hand tells the hour", "Long hand on 12 is o'clock", "Long hand on 6 is half past")),
    GLOSS({ clock: "A tool that tells the time.", "hour hand": "The short hand on a clock.", "minute hand": "The long hand on a clock.", "o'clock": "When the long hand points to 12.", "half past": "When the long hand points to 6." }),
  ],
  mini: [
    mc("Long hand on 12, short hand on 9. What time?", "9 o'clock", ["12 o'clock", "Half past 9"], { hint: "Short hand tells the hour.", why: "It is 9 o'clock." }),
    mc("Long hand on 6, short hand just past 2. What time?", "Half past 2", ["2 o'clock", "Half past 3"], { hint: "6 means half past.", why: "It is half past 2." }),
    tf("The long hand is the hour hand.", false, { hint: "Which hand is short?", why: "The short hand is the hour hand." }),
    num("How many minutes in half an hour?", 30, { hint: "An hour is 60 minutes.", why: "Half of 60 is 30." }),
  ],
};

const quarter = {
  id: "quarter", kind: "play", title: "Quarter past, quarter to and five minutes",
  blocks: [
    H("Stop 1: Quarter past and quarter to"),
    SAY("A quarter is one of four equal parts. A clock can be split into four quarters. Quarter past means the long hand has moved a quarter of the way round. It points to the three. Quarter to means it still has a quarter of the way to go. It points to the nine. Quarter past three is three fifteen. Quarter to four is three forty-five.", T("**Quarter past**: long hand on 3. **Quarter to**: long hand on 9.", "Quarter past 3 is 3:15. Quarter to 4 is 3:45.")),
    EXPP("Quarter past and quarter to",
      SS("The long hand points to three. A quarter of the way round. It is quarter past three.", S("Quarter past 3.", CL("c", 3, 15))),
      SS("Now the long hand points to nine. Three quarters of the way round. The time is quarter to four.", S("Quarter to 4.", CL("c", 3, 45, 50, 44, 3, "pulse")))),
    SAY("Flip the cards and find the matching pairs.", BRAIN("memory_match", "Clock match", "Find the matching pairs of cards.", ["⏰", "🕒", "🕠", "🕘", "🕐", "🕧"])),
    CHK(mc("The long hand is on 3. It is...", "quarter past", ["quarter to", "half past"], { hint: "A quarter of the way round.", why: "The long hand on 3 means quarter past.", tag: "time.quarter" })),
    H("Stop 2: Five-minute times"),
    SAY("The minute hand jumps in fives. When it points to one, that is five minutes past. Two is ten minutes past. Count in fives around the clock. Five, ten, fifteen, twenty, twenty-five, thirty. Thirty minutes is half an hour. Here the minute hand is on two. That is ten past three.", T("Count in **fives** round the clock: the 1 is 5 minutes, the 2 is 10 minutes, the 3 is 15 minutes.", "Long hand on 2 is ten past.")),
    EXPP("Ten past three",
      SS("The long hand moves from twelve to one. That is five minutes. Five past three.", S("5 minutes past 3.", CL("c", 3, 5))),
      SS("It moves on to two. That is ten minutes. Ten past three.", S("10 minutes past 3.", CL("c", 3, 10, 50, 44, 3, "pulse")))),
    CHK(mc("The long hand is on 2. How many minutes past is it?", "10", ["2", "15"], { hint: "Count in fives.", why: "The 2 means 10 minutes past.", tag: "time.five_minute" })),
    SAY("Remember. Quarter past has the long hand on three. Quarter to has it on nine. Each number on the clock is five minutes.", SUM("Quarter past: long hand on 3", "Quarter to: long hand on 9", "Each number is 5 minutes")),
    GLOSS({ "quarter past": "15 minutes after the hour.", "quarter to": "15 minutes before the next hour.", minutes: "Small parts of an hour. There are 60 in an hour.", fives: "Counting by 5." }),
  ],
  mini: [
    mc("Long hand on 9. It is...", "quarter to", ["quarter past", "half past"], { hint: "Three quarters of the way round.", why: "Long hand on 9 means quarter to." }),
    num("The long hand is on 4. How many minutes past?", 20, { hint: "Count in fives.", why: "4 x 5 = 20." }),
    mc("How many minutes in a quarter of an hour?", "15", ["10", "30"], { hint: "A quarter of 60.", why: "60 divided by 4 is 15." }),
    tf("The long hand on 1 means 5 minutes.", true, { hint: "Count in fives.", why: "Each number is 5 minutes." }),
  ],
};

const calendar = {
  id: "calendar", kind: "use", title: "Days, weeks and the calendar",
  blocks: [
    H("Stop 1: Days of the week and months"),
    SAY("A calendar helps us keep track of time. There are seven days in a week. Monday, Tuesday, Wednesday, Thursday, Friday, Saturday and Sunday. There are twelve months in a year. January, February, March and on to December. Some months have thirty days, some thirty-one, and February has only twenty-eight. Muslims also follow the Islamic months, like Ramadan, which move around the year.", T("There are seven days in a **week** and twelve months in a **year**.", "Muslims also use the Islamic calendar, which includes Ramadan.")),
    IMG("📅", "A calendar shows days, weeks and months."),
    CHK(num("How many days are in one week?", 7, { hint: "Monday to Sunday.", why: "There are 7 days in a week.", tag: "calendar.week" })),
    H("Stop 2: Using a calendar"),
    SAY("Let us use a calendar. Find today's date. What day of the week is it? How many days until the weekend? Count the days on the calendar. If today is Wednesday, Thursday is one, Friday is two, Saturday is three. Three days until Saturday. Calendars help us plan for birthdays, trips and Eid.", T("Count days on the calendar to find out how long until an event.", "Wednesday to Saturday is 3 days.")),
    SAY("Count the days on the calendar, like Wednesday to Saturday.", IMG("🗓️", "Counting days on a calendar.")),
    SAY("Now make a calendar for your family. Write the seven days across the top, find today, and count the days to a birthday.", ACT("Make a family calendar", ["A piece of paper or a printed calendar", "Coloured pens"], ["Write the 7 days of the week across the top.", "Find today and circle it.", "Write down one family birthday or event.", "Count how many days until it."])),
    CHK(mc("Today is Monday. What day is it in 3 days?", "Thursday", ["Wednesday", "Friday"], { hint: "Count on: Tuesday, Wednesday, Thursday.", why: "Monday plus 3 days is Thursday.", tag: "calendar.days" })),
    SAY("Remember. There are seven days in a week and twelve months in a year. Use a calendar to count days and plan.", SUM("7 days in a week", "12 months in a year", "Use a calendar to count days")),
    GLOSS({ calendar: "A chart that shows the days, weeks and months of the year.", week: "Seven days.", year: "Twelve months.", month: "A part of a year, about four weeks.", date: "The day, month and year." }),
  ],
  mini: [
    num("How many months are in a year?", 12, { hint: "January to December.", why: "There are 12 months in a year." }),
    mc("Which day comes after Friday?", "Saturday", ["Thursday", "Sunday"], { hint: "Think of the weekend.", why: "Saturday comes after Friday." }),
    mc("Today is Tuesday. What day is tomorrow?", "Wednesday", ["Monday", "Thursday"], { hint: "Tomorrow is the next day.", why: "Wednesday comes after Tuesday." }),
    tf("There are 10 days in a week.", false, { hint: "Monday to Sunday.", why: "There are 7 days in a week." }),
  ],
};

export const topics = [
  topicLesson({
    slug: "maths-class-1-measure-time", subject: "maths", cls: 1, topic: 7, title: "Measuring and Time",
    summary: "Length, mass, capacity, temperature, telling the time and reading a calendar.",
    unit: "Topic 7: Measure and time", difficulty: 1,
    objectives: ["Choose the right tool to measure", "Read o'clock, half past and quarter times", "Use a calendar"],
    success_criteria: ["I can say which tool measures length, mass, capacity and temperature", "I can read o'clock, half past, quarter past and quarter to", "I can use a calendar to count days"],
    real_life: "Telling the time for school, cooking with a jug and checking the weather.",
    standards: [
      { framework: "nc_england", code: "Y2 measurement", text: "Choose and use appropriate standard units to estimate and measure length, mass, temperature and capacity; tell and write the time to five minutes" },
      { framework: "cambridge", code: "2Gg.03" }, { framework: "cambridge", code: "2Gg.04" }, { framework: "cambridge", code: "2Gt.01" }, { framework: "cambridge", code: "2Gt.02" },
    ],
    warm_up: [
      num("What is 3 x 5?", 15, { hint: "Count in fives.", why: "3 x 5 = 15." }),
      num("What is half of 60?", 30, { hint: "Share 60 between 2.", why: "Half of 60 is 30." }),
      tf("A quarter is one of four equal parts.", true, { hint: "Quarter means four.", why: "A quarter is 1 of 4 equal parts." }),
    ],
    intro: [
      H("Welcome back, number explorer!"),
      SAY("Welcome back, number explorer! Today we measure and tell the time. How long is your pencil? How heavy is your bag? And what is the time right now? By the end you will know which tool to pick, read a clock, and use a calendar.", T("Today we learn how to measure and how to tell the time.")),
      IMG("⏰", "Measuring and telling the time."),
      GLOSS({ measure: "To find out how big, heavy, long or hot something is." }),
    ],
    subs: [measure, oclock, quarter, calendar],
    quiz: [
      { q: mc("Which tool would you use to measure how long a book is?", "A ruler", ["Scales", "A thermometer"], { hint: "Length is how long.", why: "A ruler measures length.", tag: "measure.tools" }), sub: "measure", depth: "recall", alts: [mc("Which tool would you use to find out how heavy an apple is?", "Scales", ["A ruler", "A thermometer"], { hint: "Heavy is about mass.", why: "Scales measure mass.", tag: "measure.tools" }), mc("Which tool would you use to find out how hot soup is?", "A thermometer", ["A ruler", "Scales"], { hint: "Hot or cold is temperature.", why: "A thermometer measures temperature.", tag: "measure.tools" })] },
      { q: mc("Which unit is best for the length of a pencil?", "Centimetres", ["Kilograms", "Litres"], { hint: "Length units.", why: "Length is measured in centimetres.", tag: "measure.units" }), sub: "measure", depth: "recall", alts: [mc("Which unit is best for how much water is in a bucket?", "Litres", ["Centimetres", "Kilograms"], { hint: "Capacity units.", why: "Capacity is measured in litres.", tag: "measure.units" }), mc("Which unit is best for the mass of a bag of rice?", "Kilograms", ["Centimetres", "Litres"], { hint: "Mass units.", why: "Mass is measured in kilograms.", tag: "measure.units" })] },
      { q: tf("A hot day has a high temperature.", true, { hint: "The red line goes up.", why: "Hotter means a higher number.", tag: "measure.temperature" }), sub: "measure", depth: "recall", alts: [tf("A cold day has a high temperature.", false, { hint: "The red line goes down.", why: "Colder means a lower number.", tag: "measure.temperature" }), tf("30 degrees is hotter than 10 degrees.", true, { hint: "Higher is hotter.", why: "30 is more than 10.", tag: "measure.temperature" })] },
      { q: fill("Finish the sentences.", "The {b1} hand is short. The {b2} hand is long.", [["hour", "minute", "second"], ["minute", "hour", "day"]], { hint: "Which hand tells the hour?", why: "The hour hand is short and the minute hand is long.", tag: "time.hands" }), sub: "oclock", depth: "recall", alts: [fill("Complete these.", "The {b1} hand shows the hour. The {b2} hand shows the minutes.", [["short", "long", "red"], ["long", "short", "thin"]], { hint: "Which hand is short?", why: "The short hand shows the hour. The long hand shows the minutes.", tag: "time.hands" }), fill("Fill in the gaps.", "At o'clock the long hand points to {b1}. At half past it points to {b2}.", [["12", "6", "3"], ["6", "12", "9"]], { hint: "Top of the clock and bottom of the clock.", why: "O'clock is 12. Half past is 6.", tag: "time.hands" })] },
      { q: ms("Which times have the long hand on 6? Pick two.", ["Half past 4", "Half past 10"], ["4 o'clock", "Quarter past 10"], { hint: "Half past means long hand on 6.", why: "Both half past times have the long hand on 6.", tag: "time.half_past" }), sub: "oclock", depth: "apply", alts: [ms("Which times have the long hand on 12? Pick two.", ["3 o'clock", "8 o'clock"], ["Half past 3", "Quarter to 8"], { hint: "O'clock means long hand on 12.", why: "Both o'clock times have the long hand on 12.", tag: "time.oclock" }), ms("Which times have the long hand on 3? Pick two.", ["Quarter past 2", "Quarter past 9"], ["Quarter to 2", "Half past 9"], { hint: "Quarter past means long hand on 3.", why: "Both quarter past times have the long hand on 3.", tag: "time.quarter" })] },
      { q: ord("Put these times in order through the day, earliest first.", ["6 o'clock", "Half past 6", "Quarter to 7", "7 o'clock"], { hint: "Think of the clock going round.", why: "6:00, 6:30, 6:45 and 7:00 are in order.", tag: "time.order" }), sub: "quarter", depth: "apply", alts: [ord("Order these times, earliest first.", ["3 o'clock", "Quarter past 3", "Half past 3", "Quarter to 4"], { hint: "Think of the clock going round.", why: "3:00, 3:15, 3:30 and 3:45 are in order.", tag: "time.order" }), ord("Arrange these times, earliest first.", ["9 o'clock", "Quarter past 9", "Quarter to 10", "10 o'clock"], { hint: "Think of the clock going round.", why: "9:00, 9:15, 9:45 and 10:00 are in order.", tag: "time.order" })] },
      { q: mat("Match each time to the number the long hand points to.", [["O'clock", "12"], ["Quarter past", "3"], ["Half past", "6"]], { hint: "Think of the clock face.", why: "O'clock is 12, quarter past is 3, half past is 6.", tag: "time.quarter" }), sub: "quarter", depth: "apply", alts: [mat("Join each time to the number the long hand points to.", [["Quarter to", "9"], ["Half past", "6"], ["O'clock", "12"]], { hint: "Think of the clock face.", why: "Quarter to is 9, half past is 6, o'clock is 12.", tag: "time.quarter" }), mat("Pair each time with where the long hand points.", [["Quarter past", "3"], ["Quarter to", "9"], ["Half past", "6"]], { hint: "Think of the clock face.", why: "Quarter past is 3, quarter to is 9, half past is 6.", tag: "time.quarter" })] },
      { q: hot("Tap the clock that shows half past 3.", [["🕞", "Clock A: half past 3", 22, 50], ["🕒", "Clock B: 3 o'clock", 50, 50], ["🕔", "Clock C: 5 o'clock", 78, 50]], ["Clock A: half past 3"], { labels: true, hint: "Half past means long hand on 6.", why: "Clock A shows half past 3.", tag: "time.half_past" }), sub: "oclock", depth: "apply", alts: [hot("Tap the clock that shows 8 o'clock.", [["🕗", "Clock A: 8 o'clock", 22, 50], ["🕣", "Clock B: half past 8", 50, 50], ["🕘", "Clock C: 9 o'clock", 78, 50]], ["Clock A: 8 o'clock"], { labels: true, hint: "O'clock means long hand on 12.", why: "Clock A shows 8 o'clock.", tag: "time.oclock" }), hot("Tap the clock that shows 1 o'clock.", [["🕐", "Clock A: 1 o'clock", 22, 50], ["🕜", "Clock B: half past 1", 50, 50], ["🕑", "Clock C: 2 o'clock", 78, 50]], ["Clock A: 1 o'clock"], { labels: true, hint: "O'clock means long hand on 12.", why: "Clock A shows 1 o'clock.", tag: "time.oclock" })] },
      { q: sld("Slide to show how many minutes are in half an hour.", { min: 0, max: 60 }, 30, 0, { hint: "Half of 60.", why: "Half an hour is 30 minutes.", tag: "time.minutes" }), sub: "quarter", depth: "apply", alts: [sld("Slide to show how many minutes are in a quarter of an hour.", { min: 0, max: 60 }, 15, 0, { hint: "A quarter of 60.", why: "A quarter of an hour is 15 minutes.", tag: "time.minutes" }), sld("Slide to show how many minutes are in a whole hour.", { min: 0, max: 60 }, 60, 0, { hint: "The full clock face.", why: "An hour is 60 minutes.", tag: "time.minutes" })] },
      { q: num("The long hand is on 5. How many minutes past the hour is it?", 25, { hint: "Count in fives.", why: "5 x 5 = 25 minutes.", tag: "time.five_minute" }), sub: "quarter", depth: "apply", alts: [num("The long hand is on 7. How many minutes past the hour is it?", 35, { hint: "Count in fives.", why: "7 x 5 = 35 minutes.", tag: "time.five_minute" }), num("The long hand is on 2. How many minutes past the hour is it?", 10, { hint: "Count in fives.", why: "2 x 5 = 10 minutes.", tag: "time.five_minute" })] },
      { q: mc("It is Friday. What day will it be in 2 days?", "Sunday", ["Saturday", "Monday"], { hint: "Count on: Saturday, Sunday.", why: "Friday plus 2 days is Sunday.", tag: "calendar.days" }), sub: "calendar", depth: "apply", alts: [mc("It is Tuesday. What day will it be in 3 days?", "Friday", ["Thursday", "Saturday"], { hint: "Count on: Wednesday, Thursday, Friday.", why: "Tuesday plus 3 days is Friday.", tag: "calendar.days" }), mc("It is Sunday. What day will it be in 4 days?", "Thursday", ["Wednesday", "Friday"], { hint: "Count on: Monday, Tuesday, Wednesday, Thursday.", why: "Sunday plus 4 days is Thursday.", tag: "calendar.days" })] },
      { q: mc("Hana says half past 3 is when the long hand is on 3. Is she right?", "No. At half past the long hand is on 6", ["Yes, half past is the 3", "No, it is on 12"], { hint: "Half way round the clock.", why: "Half past means half way round, so the long hand is on 6.", tag: "time.reason" }), sub: "oclock", depth: "reason", alts: [mc("Omar says o'clock is when the long hand is on 6. Is he right?", "No. At o'clock the long hand is on 12", ["Yes, o'clock is the 6", "No, it is on 3"], { hint: "At the very top of the clock.", why: "At o'clock the long hand points to 12.", tag: "time.reason" }), mc("Mina says quarter past is when the long hand is on 9. Is she right?", "No. At quarter past the long hand is on 3", ["Yes, quarter past is the 9", "No, it is on 12"], { hint: "A quarter of the way round.", why: "Quarter past means a quarter of the way round, so the long hand is on 3.", tag: "time.reason" })] },
      { q: mc("Why does the thermometer's red line rise on a hot day?", "A higher temperature makes the red line go higher", ["Because it is heavier", "Because it is longer"], { hint: "Think about hot and cold.", why: "The hotter it is, the higher the red line goes.", tag: "measure.reason" }), sub: "measure", depth: "reason", alts: [mc("Why is a 30 degree day hotter than a 10 degree day?", "30 is a higher number, so it is warmer", ["30 is a smaller number", "Because 10 is bigger"], { hint: "Higher means hotter.", why: "A bigger temperature number means hotter.", tag: "measure.reason" }), mc("Why do we use a thermometer, not a ruler, to check if a drink is hot?", "A thermometer measures temperature, a ruler measures length", ["A ruler is heavier", "A thermometer is longer"], { hint: "What does each tool measure?", why: "A thermometer measures temperature and a ruler measures length.", tag: "measure.reason" })] },
      { q: mc("Aisha says 15 minutes after 3 is quarter to 4. Is she right?", "No. 15 minutes after 3 is quarter past 3", ["Yes, it is quarter to 4", "No, it is half past 3"], { hint: "A quarter of the way round from 12.", why: "15 minutes after 3 is quarter past 3.", tag: "time.reason" }), sub: "quarter", depth: "reason", alts: [mc("Zain says 45 minutes after 6 is quarter past 7. Is he right?", "No. 45 minutes after 6 is quarter to 7", ["Yes, it is quarter past 7", "No, it is half past 6"], { hint: "Three quarters of the way round.", why: "45 minutes after 6 is quarter to 7.", tag: "time.reason" }), mc("Layla says 30 minutes after 2 is quarter past 2. Is she right?", "No. 30 minutes after 2 is half past 2", ["Yes, it is quarter past 2", "No, it is quarter to 3"], { hint: "Half way round.", why: "30 minutes after 2 is half past 2.", tag: "time.reason" })] },
      { q: num("It is Monday. Mira's birthday is on Friday. How many days until her birthday?", 4, { hint: "Count on from Monday: Tuesday is 1.", why: "Tuesday, Wednesday, Thursday, Friday. That is 4 days.", tag: "calendar.reason" }), sub: "calendar", depth: "reason", alts: [num("It is Tuesday. Omar's trip is on Saturday. How many days until the trip?", 4, { hint: "Count on from Tuesday: Wednesday is 1.", why: "Wednesday, Thursday, Friday, Saturday. That is 4 days.", tag: "calendar.reason" }), num("It is Wednesday. Sara has swimming on Sunday. How many days until swimming?", 4, { hint: "Count on from Wednesday: Thursday is 1.", why: "Thursday, Friday, Saturday, Sunday. That is 4 days.", tag: "calendar.reason" })] },
    ],
  }),
];
