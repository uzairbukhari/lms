import { SAY, SS, H, T, REVEAL, ACT, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Coteach diagrams (see content/media/manifest.d/maths-class-1-time-five-minutes.json).
const COTEACH_A = {"type":"image","asset":"maths-class-1-time-five-minutes-d1-dbb57a9b.png","alt":"A clock face with the five-minute numbers 5 to 60 outside the hour numbers","caption":"Count in fives round the clock."};
const COTEACH_B = {"type":"image","asset":"maths-class-1-time-five-minutes-d2-c928dc2d.png","alt":"Two clocks showing ten past four and ten to four with the minute hands highlighted","caption":"Ten past 4 and ten to 4."};
// Class 1 Maths topic 11: telling the time to five minutes.
// Story thread: Zara's school day in Lahore.
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });
const HB = (text, backdrop) => ({ ...H(text), backdrop });
const OK = (label) => ["ok", "✅", 50, 90, 2, "bounce", label];
const CK = (id, emoji, x, y, label, anim = "none") => [id, emoji, x, y, 3, anim, label];

const PHOTO = "maths-class-1-time-five-minutes-2-e7f528bb.jpg";

// ---------------------------------------------------------------------------------------------- 1. learn
const minutes = {
  id: "minutes", kind: "learn", title: "Minutes and hours",
  blocks: [
    HB("Zara and the school clock", "classroom"),
    SAY("Meet Zara. She has a big wall clock in her classroom. The clock tells her when to learn and when to play. Let's learn to read it.",
      { type: "image", asset: PHOTO, alt: "A small round alarm clock with numbers 1 to 12 on a dark table", caption: "An alarm clock with a long and a short hand.", credit: "Photo by Suhas Hanjar on Unsplash" }),
    HB("Stop 1: Minutes and hours", "classroom"),
    SAY("A minute is a short time. An hour is longer. There are sixty minutes in one hour. There are twenty-four hours in one whole day.",
      T("A **minute** is a short time. 60 minutes make 1 **hour**.", "24 hours make 1 day and night.")),
    EXPP("Count the minutes",
      SS("The long hand is the minute hand. It goes round the clock in one hour.", S("Minute hand: one trip = 60 minutes.", CK("c", "🕛", 50, 46, "12"))),
      SS("It stops at each number. Each number is five minutes. Count with me: five, ten, fifteen.", S("1 = 5, 2 = 10, 3 = 15.", CK("c", "🕒", 50, 46, "3 = 15 minutes", "pulse"))),
      SS("At the six, it is thirty minutes. All the way round is sixty!", S("6 = 30, 12 = 60.", CK("c", "🕡", 50, 46, "6 = 30 minutes", "pulse"), OK("60 minutes = 1 hour")))),
    SAY("The big numbers count in fives. The minute hand points at them.", COTEACH_A),
    CHK(num("How many minutes are in 1 hour?", 60, { hint: "Once round the clock.", why: "There are 60 minutes in 1 hour.", tag: "time5.minutes_hour" })),
    HB("Stop 2: Counting in fives", "classroom"),
    SAY("The short hand is the hour hand. It tells us the hour. The long hand tells us the minutes. Count in fives to read it.",
      T("The short **hour hand** shows the hour.", "The long **minute hand** shows the minutes. Count in fives.")),
    EXPP("Count in fives",
      SS("Start at the twelve. Zero minutes. That is o'clock.", S("12 = o'clock.", CK("c", "🕐", 50, 46, "1 o'clock"))),
      SS("Move to the one. Five minutes past. Move to the two. Ten minutes past.", S("1 = 5 past, 2 = 10 past.", CK("c", "🕐", 50, 46, "5 past 1", "pulse"))),
      SS("At the three it is fifteen. At the six it is thirty. That is half past.", S("3 = 15, 6 = 30.", CK("c", "🕜", 50, 46, "half past 1", "pulse"), OK("Count in fives")))),
    CHK(num("Count in fives: 5, 10, 15, what comes next?", 20, { hint: "Add 5 more.", why: "15 + 5 = 20.", tag: "time5.count_fives" })),
    SAY("Remember. Sixty minutes in an hour. Twenty-four hours in a day. Count round the clock in fives.", SUM("60 minutes = 1 hour", "24 hours = 1 day", "Each number on the clock is 5 more minutes")),
    GLOSS({ minute: "A short time. There are 60 in an hour.", hour: "A longer time. 60 minutes.", "hour hand": "The short hand. It shows the hour.", "minute hand": "The long hand. It shows the minutes.", day: "All 24 hours, day and night." }),
  ],
  mini: [
    num("How many hours are in a day and night?", 24, { hint: "Morning to morning.", why: "There are 24 hours in a day." }),
    mc("Which hand is the long one?", "The minute hand", ["The hour hand", "The wheel"], { hint: "Long for minutes.", why: "The long hand is the minute hand." }),
    num("The minute hand is on the 3. How many minutes past is it?", 15, { hint: "3 × 5.", why: "3 fives make 15." }),
    tf("There are 60 minutes in an hour.", true, { hint: "Once round.", why: "60 minutes make 1 hour." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const past = {
  id: "past", kind: "try", title: "Minutes past",
  blocks: [
    HB("Stop 1: 5, 10, 20 and 25 past", "classroom"),
    SAY("The first half of the hour uses the word past. The hand has gone past the hour. Zara's bus comes at ten past seven.",
      T("**Past** means minutes after the hour, up to half past.", "10 past 7 is 7:10.")),
    EXPP("10 past 7",
      SS("The hour hand is just after the seven.", S("Hour hand just past 7.", CK("c", "🕖", 50, 46, "7 o'clock"))),
      SS("The minute hand is on the two. Two fives make ten minutes.", S("2 = 10 minutes.", CK("c", "🕖", 50, 46, "minute hand on 2", "pulse"))),
      SS("Ten minutes past seven. We write it as seven ten.", S("10 past 7 = 7:10.", CK("c", "🕖", 50, 46, "7:10", "pulse"), OK("10 past 7")))),
    SAY("Ten past four and ten to four. The minute hands are in orange.", COTEACH_B),
    CHK(num("The minute hand is on the 5. How many minutes past is it?", 25, { hint: "5 fives.", why: "5 × 5 = 25.", tag: "time5.read_past" })),
    HB("Stop 2: Set a clock", "classroom"),
    SAY("Now set the clock. For twenty past four, put the minute hand on the four. Then the hour hand sits just after four.",
      T("20 past 4 is 4:20.", "Hour hand just after 4, minute hand on 4.")),
    EXPP("20 past 4",
      SS("Twenty minutes. Count in fives: five, ten, fifteen, twenty.", S("4 fives = 20.", CK("c", "🕓", 50, 46, "4 = 20 minutes"))),
      SS("Put the long hand on the four. The short hand moves a little past the four.", S("Hour hand just past 4.", CK("c", "🕓", 50, 46, "20 past 4", "pulse"), OK("4:20")))),
    ACT("Make a paper clock", ["A paper plate", "Two paper strips for the hands"], ["Write 1 to 12 round the plate.", "Make a long minute hand and a short hour hand.", "Show 5 past 3.", "Now show 20 past 3."]),
    CHK(mc("What is the time when the minute hand is on 2 and the hour hand is just past 6?", "10 past 6", ["10 past 2", "2 past 6"], { hint: "Hour hand first, then count the minutes.", why: "2 is 10 minutes. The hour is 6. So 10 past 6.", tag: "time5.read_time" })),
    SAY("Remember. Minute hand on the number times five. Past means after the hour. Hour hand sits just after the hour.", SUM("Number on the clock times 5 = minutes", "Past means after the hour", "The hour hand sits just past the hour")),
    GLOSS({ past: "After the hour.", "o'clock": "The minute hand is on the 12.", minutes: "Short units of time.", digital: "Time written like 7:10." }),
  ],
  mini: [
    num("The minute hand is on the 1. How many minutes past?", 5, { hint: "1 five.", why: "1 × 5 = 5." }),
    num("The minute hand is on the 4. How many minutes past?", 20, { hint: "4 fives.", why: "4 × 5 = 20." }),
    mc("Which time is the same as 7:10?", "10 past 7", ["7 past 10", "10 to 7"], { hint: "The first number is the hour.", why: "7:10 is 10 minutes past 7." }),
    tf("At 5 past 3, the hour hand is just after the 3.", true, { hint: "A little past 3.", why: "It is just after 3 o'clock." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const to = {
  id: "to", kind: "play", title: "Minutes to",
  blocks: [
    HB("Stop 1: 5, 10, 20 and 25 to", "classroom"),
    SAY("After half past, the minute hand goes up the right side. Now we count how many minutes are left to the next hour. We say to.",
      T("**To** means minutes before the next hour.", "10 to 4 is 3:50.")),
    EXPP("10 to 4",
      SS("The minute hand is on the ten. That is fifty minutes past three.", S("10 on the clock = 50 minutes.", CK("c", "🕒", 50, 46, "3:50"))),
      SS("How far to the twelve? Two fives. Ten minutes left!", S("10 minutes left.", CK("c", "🕒", 50, 46, "10 left", "pulse"))),
      SS("So it is ten to four. The next hour is four.", S("10 to 4 = 3:50.", CK("c", "🕓", 50, 46, "10 to 4", "pulse"), OK("10 to 4")))),
    CHK(num("The minute hand is on the 11. How many minutes to the next hour?", 5, { hint: "One step from the 12.", why: "11 is 55 minutes, so 5 minutes to the hour.", tag: "time5.read_to" })),
    HB("Stop 2: What time will it be?", "classroom"),
    SAY("Race time! It is ten to nine. What time will it be in ten minutes? Hop on the minute hand to the twelve.",
      T("Past is before half past. To is after half past.", "10 to 9 plus 10 minutes is 9 o'clock.")),
    EXPP("10 to 9, then 9 o'clock",
      SS("Ten to nine. The minute hand is on the ten.", S("8:50.", CK("c", "🕗", 50, 46, "10 to 9"))),
      SS("Hop two fives. Five, then ten. The hand is on the twelve!", S("+ 10 minutes.", CK("c", "🕘", 50, 46, "9 o'clock", "pulse"), OK("9:00")))),
    SAY("Flip the cards and find the matching pairs. A little brain break!", BRAIN("memory_match", "Clock match", "Find the matching pairs.", ["🕐", "🕑", "🕒", "🕓", "🕔", "🕕"])),
    CHK(mc("It is 5 to 6. What time will it be in 5 minutes?", "6 o'clock", ["5 past 6", "half past 5"], { hint: "5 to 6 is 5:55.", why: "5 minutes more reaches 6 o'clock.", tag: "time5.next_time" })),
    SAY("Remember. Past is after the hour. To is before the next hour. Use the next hour for to.", SUM("Past: up to half past", "To: minutes left to the next hour", "10 to 4 is 3:50")),
    GLOSS({ to: "Minutes before the next hour.", past: "After the hour.", "half past": "30 minutes after the hour.", "next hour": "The hour that comes after." }),
  ],
  mini: [
    num("The minute hand is on the 10. How many minutes to the hour?", 10, { hint: "10 is 50, so 10 more.", why: "60 - 50 = 10." }),
    mc("Which time is the same as 4:55?", "5 to 5", ["5 past 5", "5 past 4"], { hint: "5 minutes left to 5 o'clock.", why: "4:55 is 5 minutes to 5." }),
    tf("It is 20 to 3. The next hour is 3 o'clock.", true, { hint: "To means the next hour.", why: "20 to 3 is 2:40 and 3 comes next." }),
    num("What is half of 60 minutes?", 30, { hint: "Two equal parts.", why: "30 + 30 = 60." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const day = {
  id: "day", kind: "use", title: "My day timetable",
  blocks: [
    HB("Stop 1: Zara's school day", "town"),
    SAY("Zara wakes for Fajr at five o'clock. The bus comes at half past seven. School starts at eight. Home time is quarter past three.",
      T("A **quarter hour** is 15 minutes. A **half hour** is 30 minutes.", "Times of the day go in order.")),
    EXPP("Zara's day",
      SS("Five o'clock. Zara wakes up for Fajr.", S("5:00 Fajr.", ["a", "🌅", 30, 46, 3, "none", "5:00"], ["z", "👧", 70, 46, 3])),
      SS("Half past seven. The bus comes.", S("7:30 Bus.", ["a", "🚌", 30, 46, 3, "none", "7:30"], ["z", "👧", 70, 46, 3])),
      SS("Quarter past three. School is over. Time to go home!", S("3:15 Home time.", ["a", "🏠", 30, 46, 3, "none", "3:15"], ["z", "👧", 70, 46, 3], OK("Day in order")))),
    CHK(mc("Which time is earlier in the day: 7:30 or 3:15 in the afternoon?", "7:30 in the morning", ["3:15 in the afternoon", "They are the same time"], { hint: "Morning comes first.", why: "Morning comes before the afternoon.", tag: "time5.sequence" })),
    HB("Stop 2: How long is it?", "town"),
    SAY("How long is a lesson? Maths starts at nine and ends at ten. One hour passes. We call the time between two times an interval.",
      T("An **interval** is the time between two times.", "9:00 to 10:00 is 1 hour.")),
    EXPP("How long is Maths?",
      SS("Maths starts at nine o'clock.", S("9:00 start.", CK("c", "🕘", 50, 46, "start 9:00"))),
      SS("It ends at ten o'clock. The minute hand went round once.", S("10:00 end.", CK("c", "🕙", 50, 46, "end 10:00", "pulse"))),
      SS("One hour! Sixty minutes in the lesson.", S("1 hour = 60 minutes.", CK("c", "🕙", 50, 46, "1 hour", "pulse"), OK("1 hour")))),
    REVEAL("Which is longer: half an hour or 45 minutes? Have a think first.", "45 minutes. Half an hour is only 30 minutes."),
    CHK(num("Zara's lesson starts at 2 o'clock and lasts 1 hour. At what hour does it end?", 3, { hint: "Add 1 hour.", why: "2 o'clock plus 1 hour is 3 o'clock.", tag: "time5.one_hour_later" })),
    SAY("Remember. Put the day in order. Compare how long things take. Use quarter hour and half hour.", SUM("Morning comes before afternoon", "Quarter hour = 15 minutes", "Half hour = 30 minutes")),
    GLOSS({ "quarter hour": "15 minutes.", "half hour": "30 minutes.", interval: "The time between two times.", Fajr: "The first prayer, before sunrise.", timetable: "A list of what happens and when." }),
  ],
  mini: [
    num("A quarter of an hour is how many minutes?", 15, { hint: "60 split into 4.", why: "4 × 15 = 60." }),
    mc("Which is longer?", "1 hour", ["10 minutes", "They are the same"], { hint: "An hour is 60 minutes.", why: "60 minutes is more than 10 minutes." }),
    tf("Fajr is early in the morning.", true, { hint: "Before sunrise.", why: "Fajr comes before sunrise." }),
    num("School starts at 8:00 and breaks at 10:00. How many hours is that?", 2, { hint: "8 to 9 to 10.", why: "That is 2 hours." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Zara follows the minute hand", backdrop: "home", caption: "Zara counts the clock in fives through her day.",
  scenes: [
    { caption: "5 o'clock. Fajr.", say: "It is five o'clock. Zara wakes up for Fajr.",
      items: [{ id: "z", emoji: "👧", label: "Zara", x: 30, y: 56, size: 3, enter: "walk_right" }, { id: "c", emoji: "🕔", label: "5:00", x: 70, y: 40, size: 3, enter: "pop" }] },
    { caption: "Minute hand on 12.", say: "The minute hand points to the twelve. That is o'clock.",
      items: [{ id: "c", emoji: "🕛", label: "o'clock", x: 50, y: 46, size: 3, enter: "grow" }] },
    { caption: "5, 10, 15.", say: "It hops round in fives. Five, ten, fifteen.",
      items: [{ id: "c", emoji: "🕒", label: "15 minutes", x: 50, y: 46, size: 3, effect: "sparkle" }] },
    { caption: "Half past 7: the bus!", say: "Later it is half past seven. The bus is here!",
      items: [{ id: "b", emoji: "🚌", label: "7:30", x: 70, y: 50, size: 3, enter: "slide_left" }, { id: "z", emoji: "👧", x: 30, y: 56, size: 3 }] },
    { caption: "10 to 8.", say: "Now the hand is on the ten. It is ten to eight.",
      items: [{ id: "c", emoji: "🕗", label: "10 to 8", x: 50, y: 46, size: 3, effect: "glow" }] },
    { caption: "8 o'clock.", say: "Two more hops. Eight o'clock. School starts!",
      items: [{ id: "s", emoji: "🏫", label: "8:00", x: 50, y: 46, size: 3, enter: "pop" }] },
    { caption: "Quarter past 3.", say: "At quarter past three, school ends.",
      items: [{ id: "c", emoji: "🕞", label: "3:15", x: 50, y: 46, size: 3 }, { id: "z", emoji: "👧", x: 20, y: 56, size: 3, anim: "bounce" }] },
    { caption: "A full day!", say: "Sixty minutes in an hour. Twenty-four hours in a day. Well done, Zara!",
      items: [{ id: "z", emoji: "👧", x: 30, y: 56, size: 3, anim: "bounce" }, { id: "m", emoji: "🌙", x: 70, y: 30, size: 3, effect: "hearts", label: "24 hours" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });

const quiz = [
  // ----- learn (q1-q8)
  Q(num("A film lasts 1 hour. How many minutes is that?", 60, { hint: "Once round the clock.", why: "1 hour is 60 minutes.", tag: "time5.minutes_hour" }), "minutes", "recall",
    [num("A swimming lesson is 1 whole hour. How many minutes is that?", 60, { hint: "Once round the clock.", why: "1 hour is 60 minutes.", tag: "time5.minutes_hour" })]),
  Q(num("How many hours are there from one midnight to the next?", 24, { hint: "That is one whole day.", why: "There are 24 hours in a day.", tag: "time5.hours_day" }), "minutes", "recall",
    [num("How many hours are in 1 whole day and night?", 24, { hint: "Count the full day.", why: "There are 24 hours in a day.", tag: "time5.hours_day" })]),
  Q(fill("Count in fives round the clock.", "5, 10, {b1}, 20, {b2}", [["15", "12", "14"], ["25", "30", "24"]], { hint: "Add 5 each time.", why: "5, 10, 15, 20, 25.", tag: "time5.count_fives" }), "minutes", "apply",
    [fill("Keep counting in fives.", "10, 15, {b1}, 25, {b2}", [["20", "18", "22"], ["30", "35", "28"]], { hint: "Add 5 each time.", why: "10, 15, 20, 25, 30.", tag: "time5.count_fives" })]),
  Q(mc("Sam says the minute hand on the 9 means 9 minutes past. Is he right?", "No. The 9 means 9 fives, which is 45 minutes", ["Yes, 9 minutes", "No, it means 90 minutes"], { hint: "Each number is 5 more minutes.", why: "9 × 5 = 45, so the hand on 9 means 45 minutes.", tag: "time5.reason_hand_number" }), "minutes", "reason",
    [mc("Ben says the minute hand on the 4 means 4 minutes past. Is he right?", "No. The 4 means 4 fives, which is 20 minutes", ["Yes, 4 minutes", "No, it means 40 minutes"], { hint: "Each number is 5 more minutes.", why: "4 × 5 = 20, so the hand on 4 means 20 minutes.", tag: "time5.reason_hand_number" })]),
  Q(mc("The minute hand points to the 6. How many minutes past the hour?", "30", ["6", "60"], { hint: "6 fives.", why: "6 × 5 = 30.", tag: "time5.minute_hand" }), "minutes", "apply",
    [mc("The minute hand points to the 3. How many minutes past the hour?", "15", ["3", "30"], { hint: "3 fives.", why: "3 × 5 = 15.", tag: "time5.minute_hand" })]),
  Q(mc("Omar says a day is only the time we are awake. Is he right?", "No. A day is 24 hours, including the night", ["Yes, a day is about 12 hours", "No, a day is 60 hours"], { hint: "Does the clock stop when you sleep?", why: "The clock keeps going all night. A whole day is 24 hours.", tag: "time5.reason_day" }), "minutes", "reason",
    [mc("Ben says a day is only from sunrise to sunset. Is he right?", "No. A day is 24 hours, including the night", ["Yes, a day is about 10 hours", "No, a day is 100 hours"], { hint: "Does the clock stop at sunset?", why: "The clock keeps going after sunset. A whole day is 24 hours.", tag: "time5.reason_day" })]),
  Q(ms("Which two are parts of the day? Pick two.", ["morning", "evening"], ["minute", "hour"], { hint: "Think of the sun and the moon.", why: "Morning and evening are parts of a day. Minute and hour are units of time.", tag: "time5.parts_of_day" }), "minutes", "apply",
    [ms("Which two are parts of the day? Choose two.", ["afternoon", "night"], ["clock", "hand"], { hint: "Think of the sun and the moon.", why: "Afternoon and night are parts of a day. A clock and a hand are things.", tag: "time5.parts_of_day" })]),
  Q(tf("The short hand on a clock shows the hours.", true, { hint: "Short hand, hour hand.", why: "The short hand is the hour hand.", tag: "time5.hands" }), "minutes", "recall",
    [tf("The long hand on a clock shows the hours.", false, { hint: "Long hand shows minutes.", why: "The long hand is the minute hand.", tag: "time5.hands" })]),

  // ----- try (q9-q16)
  Q(sld("Slide to how many minutes past when the minute hand is on the 2.", { min: 0, max: 60 }, 10, 0, { hint: "2 fives.", why: "2 × 5 = 10 minutes.", tag: "time5.read_past" }), "past", "apply",
    [sld("Slide to how many minutes past when the minute hand is on the 4.", { min: 0, max: 60 }, 20, 0, { hint: "4 fives.", why: "4 × 5 = 20 minutes.", tag: "time5.read_past" })]),
  Q(mc("It is 5 past 3. Where is the minute hand?", "On the 1", ["On the 5", "On the 3"], { hint: "How many fives in 5?", why: "5 minutes is 1 five, so the hand is on the 1.", tag: "time5.set_hands" }), "past", "apply",
    [mc("It is 25 past 7. Where is the minute hand?", "On the 5", ["On the 25", "On the 7"], { hint: "How many fives in 25?", why: "25 minutes is 5 fives, so the hand is on the 5.", tag: "time5.set_hands" })]),
  Q(mat("Match each time to its words.", [["3:05", "5 past 3"], ["3:10", "10 past 3"], ["3:25", "25 past 3"]], { hint: "The number after the colon is the minutes.", why: "3:05 is 5 past 3, 3:10 is 10 past 3 and 3:25 is 25 past 3.", tag: "time5.digital_match" }), "past", "apply",
    [mat("Join each time to its words.", [["8:05", "5 past 8"], ["8:20", "20 past 8"], ["8:25", "25 past 8"]], { hint: "The number after the colon is the minutes.", why: "8:05 is 5 past 8, 8:20 is 20 past 8 and 8:25 is 25 past 8.", tag: "time5.digital_match" })]),
  Q(mc("Mira says 20 past is where the minute hand points to the 2. Is she right?", "No. The minute hand points to the 4", ["Yes, 2 means 20", "No, it points to the 5"], { hint: "Each number is 5 minutes.", why: "20 minutes is 4 fives, so the hand points to the 4.", tag: "time5.reason_twenty_past" }), "past", "reason",
    [mc("Ben says 25 past is where the minute hand points to the 4. Is he right?", "No. The minute hand points to the 5", ["Yes, 4 means 25", "No, it points to the 6"], { hint: "Each number is 5 minutes.", why: "25 minutes is 5 fives, so the hand points to the 5.", tag: "time5.reason_twenty_past" })]),
  Q(hot("Tap the clock that shows 10 past 6.", [["🕕", "long hand on 2, short hand past 6", 22, 50], ["🕙", "long hand on 10, short hand near 6", 50, 50], ["🕖", "long hand on 2, short hand past 7", 78, 50]], ["long hand on 2, short hand past 6"], { labels: true, hint: "10 minutes is the number 2.", why: "10 past 6 has the long hand on 2 and the short hand just past 6.", tag: "time5.tap_clock" }), "past", "apply",
    [hot("Tap the clock that shows 20 past 4.", [["🕓", "long hand on 4, short hand past 4", 22, 50], ["🕓", "long hand on 2, short hand past 4", 50, 50], ["🕔", "long hand on 4, short hand past 5", 78, 50]], ["long hand on 4, short hand past 4"], { labels: true, hint: "20 minutes is the number 4.", why: "20 past 4 has the long hand on 4 and the short hand just past 4.", tag: "time5.tap_clock" })]),
  Q(sld("The minute hand is on the 5. Slide to how many minutes past.", { min: 0, max: 60 }, 25, 0, { hint: "5 fives.", why: "5 × 5 = 25 minutes.", tag: "time5.five_jumps" }), "past", "apply",
    [sld("The minute hand is on the 3. Slide to how many minutes past.", { min: 0, max: 60 }, 15, 0, { hint: "3 fives.", why: "3 × 5 = 15 minutes.", tag: "time5.five_jumps" })]),
  Q(ord("Put these times in order, earliest first.", ["5 past 2", "10 past 2", "20 past 2", "25 past 2"], { hint: "More minutes means later.", why: "5, 10, 20, 25 minutes past 2 go up in order.", tag: "time5.order_times" }), "past", "apply",
    [ord("Order these times, earliest first.", ["5 past 9", "15 past 9", "20 past 9", "25 past 9"], { hint: "More minutes means later.", why: "5, 15, 20, 25 minutes past 9 go up in order.", tag: "time5.order_times" })]),
  Q(mc("Hamza says half past 4 and 5 past 4 are the same time. Is he right?", "No. Half past is 30 minutes and 5 past is only 5 minutes", ["Yes, both are past 4", "No, 5 past 4 is later"], { hint: "How many minutes is each?", why: "Half past 4 is 4:30. 5 past 4 is 4:05.", tag: "time5.reason_half_past" }), "past", "reason",
    [mc("Ben says half past 5 and 20 past 5 are the same time. Is he right?", "No. Half past is 30 minutes and 20 past is only 20 minutes", ["Yes, both are past 5", "No, 20 past 5 is later"], { hint: "How many minutes is each?", why: "Half past 5 is 5:30. 20 past 5 is 5:20.", tag: "time5.reason_half_past" })]),

  // ----- play (q17-q23)
  Q(num("The minute hand is on the 10. How many minutes to the next hour?", 10, { hint: "10 is 50 minutes. How far to 60?", why: "60 - 50 = 10 minutes to the hour.", tag: "time5.minutes_to" }), "to", "apply",
    [num("The minute hand is on the 11. How many minutes are left to the next hour?", 5, { hint: "11 is 55 minutes. How far to 60?", why: "60 - 55 = 5 minutes to the hour.", tag: "time5.minutes_to" })]),
  Q(mc("Aisha says 10 to 4 and 10 past 4 are the same time. Is she right?", "No. 10 past 4 is 4:10 and 10 to 4 is 3:50", ["Yes, both have 10", "No, 10 to 4 is 4:50"], { hint: "Write each as digits.", why: "10 past 4 is 4:10. 10 to 4 is ten minutes before 4, which is 3:50.", tag: "time5.reason_to_past" }), "to", "reason",
    [mc("Ben says 5 to 7 and 5 past 7 are the same time. Is he right?", "No. 5 past 7 is 7:05 and 5 to 7 is 6:55", ["Yes, both have 5", "No, 5 to 7 is 7:55"], { hint: "Write each as digits.", why: "5 past 7 is 7:05. 5 to 7 is five minutes before 7, which is 6:55.", tag: "time5.reason_to_past" })]),
  Q(mat("Match each clock time to its words.", [["3:50", "10 to 4"], ["3:55", "5 to 4"], ["3:35", "25 to 4"]], { hint: "Count how many minutes to the next hour.", why: "3:50 is 10 to 4, 3:55 is 5 to 4 and 3:35 is 25 to 4.", tag: "time5.to_match" }), "to", "apply",
    [mat("Join each clock time to its words.", [["8:40", "20 to 9"], ["8:50", "10 to 9"], ["8:55", "5 to 9"]], { hint: "Count how many minutes to the next hour.", why: "8:40 is 20 to 9, 8:50 is 10 to 9 and 8:55 is 5 to 9.", tag: "time5.to_match" })]),
  Q(mc("Ali says 5 to 6 is after 6 o'clock. Is he right?", "No. 5 to 6 is 5:55, which is before 6", ["Yes, 5 to 6 is 6:05", "No, 5 to 6 is 6:55"], { hint: "To means before the hour.", why: "5 to 6 is five minutes before 6, so 5:55.", tag: "time5.reason_five_to" }), "to", "reason",
    [mc("Mina says 10 to 8 is after 8 o'clock. Is she right?", "No. 10 to 8 is 7:50, which is before 8", ["Yes, 10 to 8 is 8:10", "No, 10 to 8 is 8:50"], { hint: "To means before the hour.", why: "10 to 8 is ten minutes before 8, so 7:50.", tag: "time5.reason_five_to" })]),
  Q(ms("Which two mean 5:15? Pick two.", ["quarter past 5", "15 minutes past 5"], ["quarter to 5", "5 minutes to 5"], { hint: "A quarter hour is 15 minutes.", why: "Quarter past 5 and 15 minutes past 5 are both 5:15.", tag: "time5.quarter" }), "to", "apply",
    [ms("Which two mean 7:45? Pick two.", ["quarter to 8", "15 minutes to 8"], ["quarter past 7", "quarter past 8"], { hint: "45 minutes is 15 minutes to the next hour.", why: "Quarter to 8 and 15 minutes to 8 are both 7:45.", tag: "time5.quarter" })]),
  Q(ord("Put Zara's day in order, earliest first.", ["Wake up for Fajr at 5:00", "Bus to school at 7:30", "Lunch at 12:30", "Home at 3:15"], { hint: "Morning, then afternoon.", why: "Times go 5:00, 7:30, 12:30 and then 3:15 in the afternoon.", tag: "time5.order_day" }), "to", "apply",
    [ord("Put Hana's day in order, earliest first.", ["Breakfast at 7:00", "Playtime at 10:30", "Reading at 1:00", "Tea at 5:00"], { hint: "Morning, then afternoon.", why: "Times go 7:00, 10:30 and then 1:00 and 5:00 in the afternoon.", tag: "time5.order_day" })]),
  Q(fill("Complete the times.", "5 to 4 is {b1}:55. 5 past 4 is 4:{b2}.", [["3", "4", "5"], ["05", "50", "15"]], { hint: "5 to 4 is before 4 o'clock.", why: "5 to 4 is 3:55 and 5 past 4 is 4:05.", tag: "time5.to_digits" }), "to", "apply",
    [fill("Finish the times.", "10 to 8 is {b1}:50. 10 past 8 is 8:{b2}.", [["7", "8", "9"], ["10", "50", "05"]], { hint: "10 to 8 is before 8 o'clock.", why: "10 to 8 is 7:50 and 10 past 8 is 8:10.", tag: "time5.to_digits" })]),

  // ----- use (q24-q30)
  Q(tf("A quarter of an hour is 15 minutes.", true, { hint: "60 split into 4 equal parts.", why: "4 × 15 = 60, so a quarter hour is 15 minutes.", tag: "time5.quarter_hour" }), "day", "apply",
    [tf("Half an hour is 20 minutes.", false, { hint: "Half of 60.", why: "Half of 60 is 30, so half an hour is 30 minutes.", tag: "time5.half_hour" })]),
  Q(mc("Which takes longer: a 20 minute walk or a 10 minute bus ride?", "The 20 minute walk", ["The 10 minute bus ride", "They take the same time"], { hint: "Compare the minutes.", why: "20 minutes is more than 10 minutes.", tag: "time5.compare_time" }), "day", "apply",
    [mc("Which takes longer: a 45 minute lesson or a 15 minute break?", "The 45 minute lesson", ["The 15 minute break", "They take the same time"], { hint: "Compare the minutes.", why: "45 minutes is more than 15 minutes.", tag: "time5.compare_time" })]),
  Q(mc("Hamza says half an hour is longer than 45 minutes. Is he right?", "No. Half an hour is 30 minutes, which is shorter than 45", ["Yes, half is bigger", "No, they are the same"], { hint: "Turn half an hour into minutes.", why: "Half an hour is 30 minutes. 30 is less than 45.", tag: "time5.reason_interval" }), "day", "reason",
    [mc("Ben says a quarter of an hour is longer than 20 minutes. Is he right?", "No. A quarter hour is 15 minutes, which is shorter than 20", ["Yes, a quarter is bigger", "No, they are the same"], { hint: "Turn a quarter hour into minutes.", why: "A quarter of an hour is 15 minutes. 15 is less than 20.", tag: "time5.reason_interval" })]),
  Q(num("Zara's lesson starts at 9 o'clock and lasts 1 hour. At what hour does it end?", 10, { hint: "Add 1 hour.", why: "9 o'clock plus 1 hour is 10 o'clock.", tag: "time5.one_hour_later" }), "day", "apply",
    [num("Football starts at 4 o'clock and lasts 1 hour. At what hour does it end?", 5, { hint: "Add 1 hour.", why: "4 o'clock plus 1 hour is 5 o'clock.", tag: "time5.one_hour_later" })]),
  Q(mc("Zainab says 60 minutes past 3 is a time we say. Is she right?", "No. 60 minutes is 1 hour, so we say 4 o'clock", ["Yes, we say 60 past 3", "No, we say half past 3"], { hint: "How many minutes in an hour?", why: "60 minutes make 1 hour, so 3 o'clock plus 1 hour is 4 o'clock.", tag: "time5.reason_sixty" }), "day", "reason",
    [mc("Ben says 60 minutes past 5 is a time we say. Is he right?", "No. 60 minutes is 1 hour, so we say 6 o'clock", ["Yes, we say 60 past 5", "No, we say half past 5"], { hint: "How many minutes in an hour?", why: "60 minutes make 1 hour, so 5 o'clock plus 1 hour is 6 o'clock.", tag: "time5.reason_sixty" })]),
  Q(hot("Tap the lesson that starts first.", [["📖", "Maths 9:00", 22, 50], ["🎨", "Art 10:30", 50, 50], ["⚽", "PE 1:15", 78, 50]], ["Maths 9:00"], { labels: true, hint: "Look for the earliest time.", why: "9:00 in the morning is before 10:30 and 1:15.", tag: "time5.timetable" }), "day", "apply",
    [hot("Tap the lesson that starts last.", [["📚", "Reading 8:45", 22, 50], ["🔬", "Science 9:30", 50, 50], ["🎵", "Music 2:00", 78, 50]], ["Music 2:00"], { labels: true, hint: "Look for the latest time.", why: "2:00 in the afternoon is after 8:45 and 9:30.", tag: "time5.timetable" })]),
  Q(num("School ends at 3:00. Zara gets home 25 minutes later. How many minutes past 3 is that?", 25, { hint: "Add 25 minutes to 3:00.", why: "25 minutes after 3:00 is 25 past 3.", tag: "time5.story" }), "day", "apply",
    [num("The bus leaves at 4:00 and arrives at 4:40. How many minutes to 5 o'clock is that?", 20, { hint: "4:40 is how far from 5:00?", why: "60 - 40 = 20, so it arrives at 20 to 5.", tag: "time5.story" })]),
];

export const topics = [
  topicLesson({
    slug: "maths-class-1-time-five-minutes", subject: "maths", cls: 1, topic: 11, title: "Telling the Time to Five Minutes",
    summary: "Read and write the time to five minutes, past and to the hour, on an analogue clock.",
    unit: "Topic 11: Telling the time to five minutes", difficulty: 2,
    objectives: ["Count in fives round the clock", "Tell the time five minutes past and to", "Compare lengths of time"],
    success_criteria: ["I can count in fives round the clock", "I can read times like 10 past 7 and 10 to 4", "I can say which time takes longer"],
    real_life: "Knowing when the school bus comes, when lessons start and how long a break lasts.",
    standards: [
      { framework: "nc_england", code: "Y2 time", text: "Tell and write the time to five minutes, including quarter past/to the hour, and draw the hands on a clock face; know the number of minutes in an hour and hours in a day" },
      { framework: "cambridge", code: "2Mt.01" }, { framework: "cambridge", code: "2Mt.02" },
    ],
    warm_up: [
      num("What comes next: 5, 10, 15, ...?", 20, { hint: "Add 5.", why: "15 + 5 = 20." }),
      num("How many minutes in half an hour?", 30, { hint: "Half of 60.", why: "30 + 30 = 60." }),
      tf("The clock shows o'clock when the long hand is on the 12.", true, { hint: "Long hand straight up.", why: "Minute hand on 12 means o'clock." }),
    ],
    intro: [],
    subs: [minutes, past, to, day],
    clip,
    quiz,
  }),
];
