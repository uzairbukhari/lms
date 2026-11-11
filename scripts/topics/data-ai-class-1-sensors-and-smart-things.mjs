import { SAY, SS, H, T, PHOTO, ACT, MAN, BRAIN, SUM, CHK, S, EXP, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Computer Science, Data & AI, Class 1 (Zainab, age 7), topic 11: Sensors and smart things.
// Story thread: Zainab's nightlight turns on when the room gets dark.
const STREET = "data-ai-class-1-sensors-and-smart-things-1-51c4d9c8.jpg";
const LANTERN = "data-ai-class-1-sensors-and-smart-things-2-1c057573.jpg";
const OKM = (label) => ["ok", "✅", 50, 88, 2, "bounce", label];
const Q = (q, sub, depth, alts) => ({ q, sub, depth, alts });

// ---------------------------------------------------------------------------------------------- 1. learn
const senses = {
  id: "senses", kind: "learn", title: "Machines have senses",
  blocks: [
    H("Welcome back, smart-thing spotter!"),
    SAY("Today we meet sensors. Zainab's nightlight comes on when her room gets dark.",
      T("Today's big question: how do machines notice the world?")),
    SAY("This street light glows after dark. Many street lights use a light sensor.",
      PHOTO(STREET, "A single street lamp glowing orange in the dark night", "A street lamp that glows in the dark.", "Photo by Julian Hochgesang on Unsplash")),
    H("Stop 1: A sensor notices"),
    SAY("A sensor is a part that notices something. It can notice light, sound, heat or movement.",
      T("A **sensor** is a part that notices light, sound, heat or movement.")),
    EXP("Sensors notice",
      SS("A light sensor notices if a room is bright or dark.", S("Light sensor.", ["l", "💡", 30, 50, 3, "pulse"], ["s", "🌙", 70, 40, 3, "float"])),
      SS("A sound sensor notices a clap. A heat sensor notices warmth.", S("Sound and heat.", ["c", "👏", 30, 50, 3, "bounce"], ["h", "🌡️", 70, 50, 3, "pulse"])),
      SS("A movement sensor notices when something moves past it.", S("Movement.", ["m", "🚶", 30, 50, 3, "bounce"], ["s", "📡", 70, 50, 3, "pulse"], OKM("noticed")))),
    CHK(mc("Which sensor notices light?", "A light sensor", ["A sound sensor", "A heat sensor"], { hint: "Its name tells you.", why: "A light sensor notices bright or dark.", tag: "sensor.light" })),
    H("Stop 2: Eyes, ears and touch"),
    SAY("A camera is a bit like an eye. A microphone is a bit like an ear. A touch sensor feels a press.",
      T("A **camera** is like an eye. A **microphone** is like an ear.")),
    EXP("Machine senses",
      SS("A camera takes pictures. It is like an eye for a machine.", S("Camera.", ["c", "📷", 50, 50, 3, "pulse", "eye"])),
      SS("A microphone hears sound. It is like an ear.", S("Microphone.", ["m", "🎤", 50, 50, 3, "pulse", "ear"])),
      SS("But a machine does not think or feel like us. It only follows a program.", S("A program.", ["c", "📷", 25, 50, 3], ["m", "🎤", 50, 50, 3], ["p", "💻", 78, 50, 3, "pulse"], OKM("a program")))),
    CHK(mc("A microphone is a bit like which body part?", "An ear", ["An eye", "A foot"], { hint: "It listens.", why: "A microphone hears, like an ear.", tag: "sensor.mic" })),
    SAY("Let us remember. Sensors notice the world. A program decides what to do.",
      SUM("A sensor notices light, sound, heat or movement", "A camera is like an eye, a microphone like an ear", "A machine only follows its program")),
    GLOSS({ sensor: "A part that notices something, like light or sound.", camera: "A machine that takes pictures.", microphone: "A machine that hears sound.", program: "Instructions a machine follows.", notice: "To find out that something is there." }),
  ],
  mini: [
    mc("What does a sensor do?", "Notices something", ["Cooks food", "Paints a picture"], { hint: "It picks up information.", why: "A sensor notices something." }),
    tf("A sound sensor can notice a clap.", true, { hint: "A clap is a sound.", why: "Sound sensors notice sound." }),
    mc("Which one is like an eye for a machine?", "A camera", ["A microphone", "A speaker"], { hint: "It sees.", why: "A camera sees pictures." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const hunt = {
  id: "hunt", kind: "try", title: "Sensor hunt at home",
  blocks: [
    H("Stop 1: Lights that switch on"),
    SAY("Zainab's nightlight has a light sensor. When it gets dark, the light turns on.",
      T("If it is **dark**, then the light turns on.")),
    EXP("The nightlight",
      SS("In the daytime the room is bright. The nightlight is off.", S("Bright: off.", ["n", "💡", 30, 50, 3, "none", "off"], ["s", "☀️", 70, 30, 3, "pulse"])),
      SS("At night the room is dark. The light sensor notices.", S("Dark: sensor notices.", ["s", "📡", 30, 50, 3, "pulse", "sensor"], ["m", "🌙", 70, 30, 3, "float"])),
      SS("The program says: if dark, then light on. The nightlight glows.", S("Light on.", ["n", "💡", 50, 50, 3, "bounce", "on"], OKM("if dark, then on")))),
    MAN("Lights out", "Move the 6 lights as the evening gets dark: the ones that turn on go in On.", "💡", 6, ["On", "Off"]),
    CHK(mc("A light sensor notices it is dark. What does the nightlight do?", "Turns on", ["Turns off", "Sings"], { hint: "If dark, then light.", why: "The program says: if dark, light on.", tag: "sensor.nightlight" })),
    H("Stop 2: Doors that open"),
    SAY("Some doors open by themselves. A sensor notices someone coming. The door slides open.",
      T("An **automatic** door opens when its sensor notices movement.")),
    SAY("Here is a different light. It glows in the evening in a garden.",
      PHOTO(LANTERN, "A glass lantern with small flames glowing in a garden at dusk", "A lantern glowing as the evening gets dark.", "Photo by John Oswald on Unsplash")),
    EXP("An automatic door",
      SS("A movement sensor above the door watches for someone.", S("Watch.", ["s", "📡", 50, 20, 3, "pulse", "sensor"], ["d", "🚪", 50, 60, 3])),
      SS("A person walks up. The sensor notices movement.", S("Movement.", ["p", "🚶", 20, 60, 3, "bounce"], ["s", "📡", 50, 20, 3, "pulse"], ["d", "🚪", 70, 60, 3])),
      SS("The door slides open. It does not know who the person is.", S("Open.", ["d", "🚪", 70, 60, 3, "grow"], ["p", "🚶", 40, 60, 3], OKM("opens for anyone")))),
    SAY("Now you try. Find sensors at home with a grown-up.",
      ACT("Sensor hunt", ["Paper and a pencil", "A grown-up"], ["Walk round your home or school.", "Find three things that notice light, sound or movement.", "Draw each one and say what it senses."])),
    CHK(tf("An automatic door knows who you are.", false, { hint: "It only notices movement.", why: "It notices movement, not who you are.", tag: "sensor.door" })),
    SAY("Let us remember. Sensors help lights and doors work by themselves.",
      SUM("A light sensor turns lights on in the dark", "A movement sensor opens automatic doors", "Sensors do not know who you are")),
    GLOSS({ dark: "With no light, or very little.", automatic: "Working by itself, without a person pressing a button.", movement: "Moving from place to place.", nightlight: "A small light that turns on in the dark.", dusk: "The time when the evening gets dark.", "light sensor": "A sensor that notices light." }),
  ],
  mini: [
    mc("What turns on an automatic door?", "A sensor noticing movement", ["A wish", "A broom"], { hint: "It notices movement.", why: "A movement sensor opens the door." }),
    tf("A nightlight can use a light sensor.", true, { hint: "It notices dark.", why: "Light sensors notice dark." }),
    mc("If it is dark, then the nightlight...", "Turns on", ["Turns blue", "Falls over"], { hint: "That is its job.", why: "Dark makes it turn on." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const which = {
  id: "which", kind: "play", title: "Which sensor?",
  blocks: [
    H("Stop 1: Match sensor to job"),
    SAY("Sensors are inputs. They send information in. The machine then does an output, like light or sound.",
      T("A sensor is an **input**. What the machine does is the **output**.")),
    EXP("Input and output",
      SS("A light sensor notices dark. That is the input.", S("Input.", ["s", "📡", 30, 50, 3, "pulse", "input"], ["m", "🌙", 70, 40, 3])),
      SS("The program tells the nightlight to turn on. That is the output.", S("Output.", ["n", "💡", 50, 50, 3, "bounce", "output"])),
      SS("Sense first, then act. In, then out.", S("In then out.", ["s", "📡", 25, 50, 3], ["a", "➡️", 50, 50, 2], ["n", "💡", 75, 50, 3, "pulse"], OKM("sense then act")))),
    CHK(mc("A sensor is an...", "Input", ["Output", "Insect"], { hint: "It sends information in.", why: "A sensor is an input.", tag: "sensor.input" })),
    H("Stop 2: Brain game"),
    SAY("First a memory game. Then match each sensor to its job.",
      T("Play the memory game. Then match sensors to jobs.")),
    BRAIN("memory_match", "Sensor pairs", "Find the pairs.", ["📡", "💡", "🔊", "🌡️"]),
    CHK(mat("Match each sensor to what it notices.", [["Light sensor", "Bright or dark"], ["Sound sensor", "Noise"], ["Heat sensor", "Warm or cold"]], { hint: "Think about each name.", why: "Each sensor notices one thing.", tag: "sensor.match" })),
    SAY("Let us remember. Sensors are inputs. The machine acts after it senses.",
      SUM("A sensor is an input", "The machine does an output next", "Each sensor notices one kind of thing")),
    GLOSS({ input: "Information that goes into a machine.", output: "What a machine does or shows.", sense: "To notice something.", act: "To do something.", job: "What something is for." }),
  ],
  mini: [
    mc("What does a machine do after it senses?", "Acts, like turning on a light", ["Falls asleep", "Eats a snack"], { hint: "It follows its program.", why: "It acts as the program says." }),
    tf("A light turning on is an output.", true, { hint: "It is what the machine does.", why: "An output is what the machine does." }),
    mc("Which is an input?", "A sensor", ["A light turning on", "A buzzer"], { hint: "It sends information in.", why: "A sensor is an input." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const plan = {
  id: "plan", kind: "use", title: "Plan a smart helper",
  blocks: [
    H("Stop 1: Pick sensor and action"),
    SAY("Zainab wants a smart plant helper. It should water the plant when the soil is dry.",
      T("A smart helper uses a sensor and an **action**.")),
    SAY("She picks a sensor: one that notices dry soil. She picks an action: pour some water.",
      T("Choose the sensor first, then the action.")),
    SAY("She writes the plan as if-then. If the soil is dry, then pour water.",
      T("Use if-then to plan what the helper does.")),
    EXP("The plant helper",
      SS("A sensor in the soil notices if the soil is dry.", S("Sense.", ["s", "📡", 30, 50, 3, "pulse", "dry soil"], ["p", "🪴", 70, 50, 3])),
      SS("If the soil is dry, then the helper pours water.", S("Act.", ["w", "💧", 30, 50, 3, "bounce"], ["p", "🪴", 70, 50, 3, "pulse"])),
      SS("The plant is happy. Sense first, then act.", S("Done.", ["p", "🪴", 50, 50, 3, "bounce"], OKM("sense then act")))),
    SAY("A plan helps her check that the helper will work.",
      ACT("Plan a helper", ["Paper and a pencil", "A grown-up"], ["Pick a job, like watering a plant or lighting a path.", "Choose a sensor that fits the job.", "Write: if ..., then ..."])),
    CHK(mc("A plant helper should water dry soil. Which sensor fits?", "A sensor that notices dry soil", ["A sound sensor", "A speaker"], { hint: "It must notice the soil.", why: "The sensor must notice what matters for the job.", tag: "sensor.pick" })),
    H("Stop 2: Check it is safe"),
    SAY("A smart helper must be safe. Check it with a grown-up. A camera in a bedroom is not private.",
      T("Check **safety** and privacy with a grown-up.")),
    EXP("Safe and private",
      SS("Water and electricity do not mix. The helper must be safe.", S("Safe.", ["w", "💧", 30, 50, 3], ["p", "🔌", 70, 50, 3], ["x", "⚠️", 50, 20, 2, "pulse"])),
      SS("Cameras and microphones can hear and see private things.", S("Private.", ["c", "📷", 30, 50, 3], ["m", "🎤", 70, 50, 3], ["l", "🔒", 50, 20, 2, "pulse", "private"])),
      SS("Always ask a grown-up first. They help keep us safe.", S("Ask first.", ["g", "👩", 30, 52, 3], ["h", "🧒", 70, 52, 3], OKM("ask first")))),
    CHK(tf("We should ask a grown-up before using a smart helper.", true, { hint: "Safety first.", why: "A grown-up helps check safety.", tag: "sensor.ask" })),
    SAY("Let us remember. Pick a sensor, pick an action, and check it is safe.",
      SUM("Choose a sensor that fits the job", "Write an if-then plan", "Ask a grown-up and keep things private")),
    GLOSS({ action: "What the helper does after it senses.", safety: "Being safe from harm.", private: "Only for you and your family.", plan: "Steps you decide before you build.", helper: "Something that does a job for you." }),
  ],
  mini: [
    mc("What do we choose first for a helper?", "A sensor to fit the job", ["A paint colour", "A new name"], { hint: "What must it notice?", why: "The sensor fits the job." }),
    tf("Cameras at home can notice private things.", true, { hint: "Think about the bedroom.", why: "Cameras can see private things." }),
    mc("Who checks that a helper is safe?", "A grown-up", ["Nobody", "A stranger online"], { hint: "Someone who looks after you.", why: "A grown-up checks safety." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Zainab's nightlight", backdrop: "home", caption: "Zainab works out which sensor switches on her nightlight.",
  scenes: [
    { caption: "Bedtime.", say: "It is bedtime. Zainab's room gets dark.",
      items: [{ id: "z", emoji: "👧", label: "Zainab", x: 25, y: 56, size: 3, enter: "walk_right" }, { id: "m", emoji: "🌙", x: 78, y: 25, size: 3, anim: "float" }] },
    { caption: "The light sensor.", say: "A light sensor in her nightlight notices the dark.",
      items: [{ id: "n", emoji: "💡", x: 40, y: 50, size: 3 }, { id: "s", emoji: "📡", label: "light sensor", x: 72, y: 45, size: 3, anim: "pulse" }] },
    { caption: "If dark, then on.", say: "The program says: if dark, then turn on.",
      items: [{ id: "i", emoji: "❓", x: 30, y: 50, size: 3 }, { id: "n", emoji: "💡", x: 70, y: 50, size: 3, effect: "glow" }] },
    { caption: "It glows.", say: "The nightlight glows. Zainab feels safe.",
      items: [{ id: "n", emoji: "💡", x: 50, y: 48, size: 3, anim: "bounce", effect: "glow" }] },
    { caption: "An automatic door.", say: "At school, a door opens by itself. A movement sensor noticed her.",
      items: [{ id: "z", emoji: "👧", x: 25, y: 56, size: 3, anim: "bounce" }, { id: "d", emoji: "🚪", x: 72, y: 52, size: 3, enter: "grow" }] },
    { caption: "Not magic.", say: "The door does not know her name. It only notices movement.",
      items: [{ id: "q", emoji: "🤔", x: 50, y: 40, size: 3, anim: "pulse" }] },
    { caption: "Sensors can be wrong.", say: "Sometimes a sensor gets it wrong. A person can fix it.",
      items: [{ id: "s", emoji: "📡", x: 35, y: 50, size: 3 }, { id: "b", emoji: "🐛", x: 70, y: 35, size: 2, anim: "bounce" }] },
    { caption: "Ask first.", say: "Zainab asks her mum before using any new smart thing.",
      items: [{ id: "z", emoji: "👧", x: 30, y: 56, size: 3 }, { id: "m", emoji: "👩", x: 70, y: 52, size: 3, effect: "hearts" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- senses (q1-q8)
  Q(mc("What is a sensor?", "A part that notices something like light or sound", ["A kind of battery", "A toy robot"], { hint: "It notices.", why: "A sensor notices things.", tag: "sensor.meaning" }), "senses", "recall",
    [mc("Which word means a part that notices light, sound, heat or movement?", "Sensor", ["Cable", "Sprite"], { hint: "It notices.", why: "A sensor notices things.", tag: "sensor.meaning" })]),
  Q(mc("What does a light sensor do?", "Notices if it is bright or dark", ["Notices a clap", "Notices warmth"], { hint: "Its name tells you.", why: "A light sensor notices bright or dark.", tag: "sensor.light_job" }), "senses", "recall",
    [mc("Which sensor would tell if a room is dark?", "A light sensor", ["A sound sensor", "A heat sensor"], { hint: "Its name tells you.", why: "A light sensor notices dark.", tag: "sensor.light_job" })]),
  Q(tf("A microphone is a bit like an ear for a machine.", true, { hint: "It hears sounds.", why: "A microphone picks up sound.", tag: "sensor.mic_ear" }), "senses", "recall",
    [tf("A microphone is like an eye for a machine.", false, { hint: "It hears sounds.", why: "A microphone is more like an ear.", tag: "sensor.mic_ear" })]),
  Q(mat("Match every sensor to the thing it notices.", [["Light sensor", "Bright or dark"], ["Sound sensor", "A clap"], ["Movement sensor", "Someone walking past"]], { hint: "Think about each name.", why: "Each sensor notices one thing.", tag: "sensor.match_notice" }), "senses", "apply",
    [mat("Join each sensor to what it notices.", [["Heat sensor", "Warmth"], ["Touch sensor", "A press"], ["Camera", "A picture"]], { hint: "Think about each name.", why: "Each sensor notices one thing.", tag: "sensor.match_notice" })]),
  Q(hot("Tap the sensor on the door.", [["📡", "Movement sensor", 22, 50], ["🚪", "Door", 50, 50], ["🧱", "Wall", 78, 50]], ["Movement sensor"], { labels: true, hint: "It notices someone coming.", why: "The movement sensor notices people.", tag: "sensor.tap_door" }), "senses", "recall",
    [hot("Tap the part that hears sound.", [["📡", "Sensor", 22, 50], ["🎤", "Microphone", 50, 50], ["🔋", "Battery", 78, 50]], ["Microphone"], { labels: true, hint: "It is like an ear.", why: "A microphone hears sound.", tag: "sensor.tap_mic" })]),
  Q(mc("Sam says a sensor can think about what it feels. Is he right?", "No. A sensor only notices. A program decides what to do", ["Yes, sensors think", "Yes, sensors have feelings"], { hint: "Think about the nightlight.", why: "A sensor only notices things.", tag: "sensor.reason_think" }), "senses", "reason",
    [mc("Mina says a sensor decides how to feel. Is she right?", "No. A sensor notices, and the program decides what to do", ["Yes, it decides feelings", "Yes, sensors have moods"], { hint: "Think about the nightlight.", why: "A sensor only notices things.", tag: "sensor.reason_think" })]),
  Q(mc("Aisha says only phones have sensors. Is she right?", "No. Many machines have sensors, like doors and street lights", ["Yes, only phones", "Yes, only laptops"], { hint: "Think about the street light.", why: "Sensors are in many machines.", tag: "sensor.reason_phones" }), "senses", "reason",
    [mc("Ben says sensors are only inside phones. Is he right?", "No. They are in doors, lights and cars too", ["Yes, only phones", "Yes, only tablets"], { hint: "Think about the street light.", why: "Sensors are in many places.", tag: "sensor.reason_phones" })]),
  Q(fill("Finish the sentences about sensors.", "A {b1} notices light, sound, heat or movement. A camera is like an {b2}.", [["sensor", "spoon", "table"], ["eye", "ear", "foot"]], { hint: "Think about senses.", why: "A sensor notices things. A camera is like an eye.", tag: "sensor.fill_senses" }), "senses", "recall",
    [fill("Complete the sentences about the senses.", "A microphone is like an {b1}. A touch sensor feels a {b2}.", [["ear", "eye", "nose"], ["press", "smell", "song"]], { hint: "Think about senses.", why: "A microphone is like an ear and a touch sensor feels a press.", tag: "sensor.fill_senses" })]),
  // ----- hunt (q9-q15)
  Q(num("A street has 6 lights. 4 are on. How many lights are off?", 2, { hint: "6 take away 4.", why: "6 - 4 = 2 lights off.", tag: "sensor.lights_off" }), "hunt", "apply",
    [num("A corridor has 8 lights. 5 are on. How many lights are off?", 3, { hint: "8 take away 5.", why: "8 - 5 = 3 lights off.", tag: "sensor.lights_off" })]),
  Q(ord("Put the steps for the nightlight in order.", ["The room gets dark", "The light sensor notices", "The nightlight turns on"], { hint: "Dark first.", why: "Dark, notice, then light on.", tag: "sensor.nightlight_steps" }), "hunt", "apply",
    [ord("Put the steps for an automatic door in order.", ["Someone walks up", "The sensor notices movement", "The door opens"], { hint: "Walking first.", why: "Walk, notice, then open.", tag: "sensor.nightlight_steps" })]),
  Q(sld("The nightlight is on from 7 o'clock until 10 o'clock. Slide to show how many hours it is on.", { min: 0, max: 12 }, 3, 0, { hint: "10 take away 7.", why: "7 to 10 is 3 hours.", tag: "sensor.hours_on" }), "hunt", "apply",
    [sld("A lantern is on from 6 o'clock until 11 o'clock. Slide to show how many hours it is on.", { min: 0, max: 12 }, 5, 0, { hint: "11 take away 6.", why: "6 to 11 is 5 hours.", tag: "sensor.hours_on" })]),
  Q(tf("If it is dark, then a street light with a light sensor can turn on.", true, { hint: "Think about the nightlight.", why: "A light sensor notices dark.", tag: "sensor.if_dark" }), "hunt", "recall",
    [tf("A street light with a light sensor turns on in bright sunshine.", false, { hint: "Think about dark.", why: "It turns on when dark, not in bright sun.", tag: "sensor.if_dark" })]),
  Q(mc("Omar says sensors never go wrong. Is he right?", "No. Sensors can make mistakes, like a dirty sensor missing a signal", ["Yes, never wrong", "Yes, sensors are perfect"], { hint: "Think about a dirty window.", why: "Sensors can get things wrong.", tag: "sensor.reason_wrong" }), "hunt", "reason",
    [mc("Hana says a sensor is always right. Is she right?", "No. A sensor can be wrong, for example in bad weather", ["Yes, always right", "Yes, sensors cannot fail"], { hint: "Think about a dirty window.", why: "Sensors can fail.", tag: "sensor.reason_wrong" })]),
  Q(mc("Aisha says automatic doors know who you are. Is she right?", "No. They only notice movement", ["Yes, they know your name", "Yes, they know your age"], { hint: "Think about the door.", why: "A door notices movement only.", tag: "sensor.reason_door" }), "hunt", "reason",
    [mc("Layla says an automatic door knows if you are kind. Is she right?", "No. It only notices that something moved", ["Yes, it knows", "Yes, it reads minds"], { hint: "Think about the door.", why: "A door notices movement only.", tag: "sensor.reason_door" })]),
  Q(mat("Match each device to its sensor.", [["Nightlight", "Light sensor"], ["Automatic door", "Movement sensor"], ["Clap lamp", "Sound sensor"]], { hint: "Think about each device.", why: "Each device uses its own sensor.", tag: "sensor.match_device" }), "hunt", "apply",
    [mat("Join each device to its sensor.", [["Street light", "Light sensor"], ["Fire alarm", "Heat or smoke sensor"], ["Doorbell camera", "Camera"]], { hint: "Think about each device.", why: "Each device uses its own sensor.", tag: "sensor.match_device" })]),
  // ----- which (q16-q23)
  Q(mc("Which of these is an input to a machine?", "A sensor noticing something", ["A light turning on", "A speaker playing"], { hint: "It sends information in.", why: "A sensor is an input.", tag: "sensor.in_out" }), "which", "recall",
    [mc("Which is an output?", "A light turning on", ["A sensor noticing dark", "A microphone hearing"], { hint: "It is what the machine does.", why: "A light turning on is an output.", tag: "sensor.in_out" })]),
  Q(ms("Which two are outputs? Pick two.", ["A light turning on", "A buzzer sounding"], ["A light sensor", "A microphone"], { hint: "They are what the machine does.", why: "Light and buzzer are outputs.", tag: "sensor.outputs" }), "which", "apply",
    [ms("Which two are inputs? Pick two.", ["A light sensor", "A touch sensor"], ["A speaker", "A screen"], { hint: "They send information in.", why: "Sensors are inputs.", tag: "sensor.inputs" })]),
  Q(num("A robot vacuum bumps into 3 chairs and 2 tables. How many things does it bump into?", 5, { hint: "3 + 2.", why: "3 + 2 = 5 things.", tag: "sensor.bumps" }), "which", "apply",
    [num("A robot vacuum bumps into 4 chairs and 3 toys. How many things does it bump into?", 7, { hint: "4 + 3.", why: "4 + 3 = 7 things.", tag: "sensor.bumps" })]),
  Q(hot("Tap the sensor.", [["📡", "Light sensor", 22, 50], ["💡", "Light", 50, 50], ["🔊", "Speaker", 78, 50]], ["Light sensor"], { labels: true, hint: "It notices.", why: "The light sensor notices.", tag: "sensor.tap_sensor" }), "which", "recall",
    [hot("Tap the output.", [["📡", "Sensor", 22, 50], ["💡", "Light", 50, 50], ["🎤", "Microphone", 78, 50]], ["Light"], { labels: true, hint: "It is what the machine does.", why: "The light is the output.", tag: "sensor.tap_output" })]),
  Q(mc("Sam says a sensor is an output. Is he right?", "No. A sensor is an input", ["Yes, an output", "Yes, both"], { hint: "It sends information in.", why: "A sensor is an input.", tag: "sensor.reason_output" }), "which", "reason",
    [mc("Noor says the nightlight turning on is an input. Is she right?", "No. It is an output", ["Yes, an input", "Yes, a sensor"], { hint: "It is what the machine does.", why: "A light turning on is an output.", tag: "sensor.reason_output" })]),
  Q(mc("Zainab says a camera sees like a person. Is she right?", "No. A camera records dots of colour and a program works out patterns", ["Yes, exactly like a person", "Yes, a camera understands everything"], { hint: "Think about the program.", why: "A camera does not understand like a person.", tag: "sensor.reason_camera" }), "which", "reason",
    [mc("Hana says a camera understands what it sees. Is she right?", "No. A program looks for patterns and can make mistakes", ["Yes, it understands", "Yes, it never errs"], { hint: "Think about the program.", why: "A camera records. A program works out patterns.", tag: "sensor.reason_camera" })]),
  Q(tf("A machine only does what its program tells it to do.", true, { hint: "Think about the nightlight.", why: "A machine follows its program.", tag: "sensor.only_program" }), "which", "recall",
    [tf("A machine can do anything it likes, whatever its program.", false, { hint: "Think about the nightlight.", why: "A machine follows its program.", tag: "sensor.only_program" })]),
  Q(ord("Put these in order: act, notice, decide.", ["Notice with a sensor", "Decide with the program", "Act with an output"], { hint: "Sense first.", why: "Notice, decide, then act.", tag: "sensor.sense_act" }), "which", "apply",
    [ord("Put these steps in order for a clap lamp.", ["You clap", "The sound sensor notices", "The lamp turns on"], { hint: "Clap first.", why: "Clap, notice, then lamp on.", tag: "sensor.sense_act" })]),
  // ----- plan (q24-q30)
  Q(mc("Which sensor fits a path light that turns on when someone walks by?", "A movement sensor", ["A sound sensor", "A speaker"], { hint: "It must notice walking.", why: "A movement sensor notices people.", tag: "sensor.pick_path" }), "plan", "apply",
    [mc("Which sensor fits a lamp that turns on when you clap?", "A sound sensor", ["A light sensor", "A heat sensor"], { hint: "It must notice a clap.", why: "A sound sensor notices clapping.", tag: "sensor.pick_clap" })]),
  Q(ms("Which two actions could a smart helper do? Pick two.", ["Turn on a light", "Sound a buzzer"], ["Eat a sandwich", "Read a book"], { hint: "Think about outputs.", why: "A light and a buzzer are outputs.", tag: "sensor.actions" }), "plan", "apply",
    [ms("Which two could a helper do after a sensor notices? Pick two.", ["Open a door", "Switch on a fan"], ["Sing a lullaby for ever", "Climb a tree"], { hint: "Think about outputs.", why: "Opening a door and a fan are outputs.", tag: "sensor.actions" })]),
  Q(sld("Zainab plans 7 smart things. She has planned 4. Slide to show how many are left to plan.", { min: 0, max: 10 }, 3, 0, { hint: "7 take away 4.", why: "7 - 4 = 3 left.", tag: "sensor.plan_left" }), "plan", "apply",
    [sld("A plan has 8 steps. 5 are done. Slide to show how many are left.", { min: 0, max: 10 }, 3, 0, { hint: "8 take away 5.", why: "8 - 5 = 3 left.", tag: "sensor.plan_left" })]),
  Q(mc("Layla says a smart home needs no rules. Is she right?", "No. Families need rules to stay safe and keep things private", ["Yes, no rules at all", "Yes, devices make their own rules"], { hint: "Think about cameras and privacy.", why: "Rules help keep us safe and private.", tag: "sensor.reason_rules" }), "plan", "reason",
    [mc("Ben says a smart home can decide its own rules. Is he right?", "No. Grown-ups decide the rules for smart things", ["Yes, it decides", "Yes, the devices vote"], { hint: "Think about grown-ups.", why: "Grown-ups set the rules.", tag: "sensor.reason_rules" })]),
  Q(mc("Omar says smart things need no electricity. Is he right?", "No. Smart things need power, from a plug, battery or the Sun", ["Yes, no power needed", "Yes, they run on wishes"], { hint: "Think about the nightlight.", why: "Smart things need power.", tag: "sensor.reason_power" }), "plan", "reason",
    [mc("Sana says a smart lamp works without any power. Is she right?", "No. It needs a plug, a battery or sunlight", ["Yes, no power", "Yes, only in the dark"], { hint: "Think about the nightlight.", why: "A lamp needs power.", tag: "sensor.reason_power" })]),
  Q(mc("Which is a safe choice about a camera at home?", "Ask a grown-up where it can be placed", ["Put it in the bathroom", "Share its pictures with strangers"], { hint: "Think about privacy.", why: "A grown-up decides where a camera goes.", tag: "sensor.privacy" }), "plan", "apply",
    [mc("Which keeps private things private?", "Not putting a camera in a bedroom", ["Putting a camera everywhere", "Telling strangers the password"], { hint: "Think about privacy.", why: "Cameras should not go in private places.", tag: "sensor.privacy" })]),
  Q(fill("Finish the sentences about helpers.", "Write the plan as an {b1}-then rule. The sensor is the {b2}.", [["if", "go", "blue"], ["input", "output", "bug"]], { hint: "Think about the plan.", why: "If-then plans use sensors as inputs.", tag: "sensor.fill_plan" }), "plan", "apply",
    [fill("Complete the sentences about plans.", "First choose the {b1}. Then choose the {b2}.", [["sensor", "colour", "snack"], ["action", "nap", "shoe"]], { hint: "Think about the plan.", why: "We choose a sensor and then an action.", tag: "sensor.fill_plan" })]),
];

export const topics = [
  topicLesson({
    slug: "data-ai-class-1-sensors-and-smart-things", subject: "data-ai", cls: 1, topic: 11, title: "Sensors and Smart Things",
    summary: "Learn how sensors help machines notice light, heat, sound and movement.",
    unit: "Topic 11: Sensors and smart things", difficulty: 1,
    objectives: ["Name a sensor and what it senses", "Match sensors to smart things", "Say what a machine does with what it senses"],
    success_criteria: ["I can name a sensor and what it notices", "I can say a sensor is an input", "I know a sensor does not think and can be wrong"],
    real_life: "Street lights in Lahore and London, automatic doors at airports and solar lanterns.",
    standards: [
      { framework: "ai4k12", code: "Big Idea 1", text: "Perception: computers perceive the world using sensors" },
      { framework: "csta", code: "1A-CS-01", text: "Select and operate appropriate software and hardware to perform a variety of tasks" },
    ],
    warm_up: [
      mc("What is a pattern?", "Something that repeats", ["A mess", "A wall"], { hint: "Think about red, blue, red, blue.", why: "A pattern repeats." }),
      mc("What is IT?", "Information technology", ["Indoor toys", "Instant tea"], { hint: "Computers.", why: "IT is information technology." }),
      num("What is 7 + 5?", 12, { hint: "Count on from 7.", why: "7 + 5 = 12." }),
    ],
    intro: [],
    subs: [senses, hunt, which, plan],
    clip,
    quiz,
  }),
];
