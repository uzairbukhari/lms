import { SAY, SS, H, T, IMG, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, BAR, mc, ms, tf, num, ord, mat, fill, hot, sld, st, PHOTO } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC, PK, CAM } from "./_science-kit.mjs";

// Science Class 4, topic 6: Earth, space and forces (Fatima, age 9). Enquiry type: fair testing.

const EARTH = "science-class-4-earth-space-forces-2-bf85e2aa.jpg";
const MOON = "science-class-4-earth-space-forces-1-a6d0f2a7.jpg";
const BRAKE = "science-class-4-earth-space-forces-3-db528748.jpg";

const space = {
  id: "space", kind: "learn", title: "Earth, Sun and Moon",
  blocks: [
    H("Welcome back, young scientist!"),
    SAY("Today we explore Earth, the Moon and forces. How do they work?", T("Today's big question: how do Earth and forces work?")),
    SAY("This is Earth from space. Our planet spins and travels around the Sun.", PHOTO(EARTH, "Planet Earth seen from space, with white clouds over Africa", "Earth from space. Our planet spins and orbits the Sun.", "Photo by NASA on Unsplash")),
    H("Stop 1: Day and night, and the seasons"),
    SAY("The Sun is a star. It is the centre of our solar system. Earth is one of the planets that travel around it. Earth spins like a top. It takes twenty-four hours to spin once, and this spin is what gives us day and night. The side of Earth facing the Sun has daytime. The side facing away has night. Earth also travels around the Sun once every year, and its tilt gives us the seasons.", T("The **Sun** is a star. Earth **orbits** it once a year.", "Earth **rotates** once in 24 hours, which gives us day and night.")),
    EB("space", "Earth and the Sun",
      SS("Earth spins. The side facing the Sun has day, and Pakistan sees the Sun rise in the morning.", S("Facing the Sun: day.", ["s", "☀️", 20, 50, 3, "pulse"], ["e", "🌍", 70, 55, 3, "spin"])),
      SS("As Earth keeps turning, our side faces away from the Sun, and it becomes night.", S("Facing away: night.", ["s", "☀️", 20, 50, 3, "pulse"], ["e", "🌏", 70, 55, 3, "spin"], ["n", "🌙", 85, 30, 2, "float"]))),
    CHK(mc("What causes day and night?", "Earth spinning on its axis", ["The Sun moving round Earth", "The Moon covering the Sun"], { hint: "Earth turns once in 24 hours.", why: "Earth rotates, so different places face the Sun at different times." })),
    H("Stop 2: The Moon"),
    SAY("We see the Moon because it reflects light from the Sun.", PHOTO(MOON, "The Moon with craters against a dark sky", "The Moon reflects light from the Sun.", "Photo by Dmytro Koplyk on Unsplash")),
    SAY("The Moon is a natural satellite, which means it orbits a planet. It orbits Earth about once a month. The Moon does not make its own light. We see it because it reflects light from the Sun. As the Moon travels around Earth, we see different amounts of its lit half. These are the phases of the Moon. They include the new moon, the crescent, the half moon and the full moon. Muslims use the new crescent moon to mark the start of each Islamic month.", T("The Moon is a **satellite** that orbits Earth.", "The Moon reflects sunlight. Its **phases** change over about a month.")),
    EB("sky", "Moon phases",
      SS("A thin crescent moon. Only a small part of the lit half faces us.", S("Crescent moon.", ["m", "🌙", 50, 45, 3, "float"])),
      SS("A full moon. The whole lit half faces us, so it looks like a bright circle.", S("Full moon.", ["m", "🌕", 50, 45, 3, "pulse"]))),
    CHK(tf("The Moon makes its own light.", false, { hint: "It reflects light.", why: "The Moon reflects light from the Sun." })),
    SAY("Remember. Earth spins to give day and night and orbits the Sun. The Moon orbits Earth.", SUM("Earth rotates once in 24 hours", "Earth orbits the Sun once a year", "The Moon orbits Earth and reflects sunlight")),
    GLOSS({ axis: "An imaginary line through Earth from the North Pole to the South Pole.", Sun: "The star at the centre of our solar system.", orbits: "Travels in a curved path around something.", rotates: "Spins around.", satellite: "An object that orbits a planet.", phases: "The different shapes of the Moon that we see." }),
  ],
  mini: [
    mc("How long does Earth take to spin once?", "24 hours", ["One year", "One month"], { hint: "One day.", why: "Earth rotates once every 24 hours." }),
    tf("Earth orbits the Sun once a year.", true, { hint: "Think about a year.", why: "One orbit of the Sun takes one year." }),
    mat("Match each to what it does.", [["Earth", "Orbits the Sun"], ["Moon", "Orbits Earth"], ["Sun", "Is a star"]], { hint: "Who goes around whom?", why: "Earth orbits the Sun, the Moon orbits Earth and the Sun is a star." }),
    ord("Put these in order from biggest to smallest.", ["Sun", "Earth", "Moon"], { hint: "The Sun is huge.", why: "The Sun is much bigger than Earth, and Earth is bigger than the Moon." }),
  ],
};

const forces = {
  id: "forces", kind: "try", title: "Forces: gravity, friction and air resistance",
  blocks: [
    H("Stop 1: Pushes, pulls and gravity"),
    SAY("A force is a push or a pull. Forces can make things start moving, stop, speed up, slow down or change direction. Gravity is a force that pulls objects towards the centre of the Earth. It is why things fall down when you drop them, and why we stay on the ground. We measure forces in newtons, using a forcemeter. A heavier object has more weight, because gravity pulls it harder.", T("A **force** is a push or a pull.", "**Gravity** pulls objects towards the centre of Earth.")),
    EB("classroom", "Gravity at work",
      SS("An apple falls from a tree. Gravity pulls it down towards the ground.", S("Gravity pulls things down.", ["t", "🌳", 25, 50, 3, "none"], ["a", "🍎", 55, 35, 2, "bounce"], ["g", "⬇️", 80, 55, 2, "pulse"])),
      SS("A heavier object is pulled harder. We measure the pull in newtons.", S("Heavier means a bigger pull.", ["h", "🏋️", 40, 55, 3, "none"], ["g", "⬇️", 75, 55, 3, "pulse"]))),
    CHK(mc("Which force pulls things towards the Earth?", "Gravity", ["Friction", "Magnetism"], { hint: "Why do things fall?", why: "Gravity pulls objects towards the centre of the Earth." })),
    H("Stop 2: Friction and air resistance"),
    SAY("Friction is a force between two surfaces that rub together. It slows things down. A rough surface such as carpet has lots of friction. A smooth surface such as ice has very little. Air resistance and water resistance are forces that push against things moving through air or water. A parachute has a large surface, so it catches lots of air and falls slowly. A fair test of parachutes changes only the size of the canopy. Weight and drop height stay the same.", MAN("Rough or smooth?", "Put surfaces with lots of friction in High and surfaces with little friction in Low.", "🛷", 8, ["High friction", "Low friction"])),
    ACT("Parachute test", ["A small toy or a coin", "Thread and a plastic bag or cloth", "A stopwatch", "A grown-up to help you drop safely"], ["Make two parachutes of different sizes, but the same weight attached.", "Drop each one from the same height. Time how long each takes to land.", "Which fell more slowly? Write your pattern. What did you keep the same?"]),
    CHK(mc("Which surface has the least friction?", "Ice", ["Carpet", "Sandpaper"], { hint: "Think about sliding.", why: "Ice is smooth, so it has very little friction." })),
    SAY("Remember. Gravity pulls things down, friction slows things down and air resistance slows things moving through air.", SUM("Forces are pushes or pulls", "Gravity pulls things towards Earth", "Friction and air resistance slow things down")),
    GLOSS({ force: "A push or a pull.", gravity: "A force that pulls objects towards the centre of the Earth.", friction: "A force that slows things down when surfaces rub together.", "air resistance": "A force that pushes against things moving through the air.", newtons: "The units for measuring force.", canopy: "The large part of a parachute that catches the air." }),
  ],
  mini: [
    tf("A heavier object feels a bigger pull from gravity.", true, { hint: "Weight.", why: "Gravity pulls a heavier object harder." }),
    mc("A big parachute falls...", "More slowly", ["More quickly", "At exactly the same speed as no parachute"], { hint: "It catches more air.", why: "A large canopy has more air resistance, so it falls more slowly." }),
    mat("Match each force to its job.", [["Gravity", "Pulls towards Earth"], ["Friction", "Slows sliding"], ["Air resistance", "Slows falling"]], { hint: "Think about what each does.", why: "Each force has a different effect on movement." }),
  ],
};

const earth = {
  id: "earth", kind: "play", title: "Inside the Earth",
  blocks: [
    H("Stop 1: Layers of the Earth"),
    SAY("Earth is made of layers, like a peach. On the outside is the crust, a thin layer of rock where we live. Under the crust is the mantle, which is a thick layer of hot rock. At the centre is the core, which is extremely hot and made mostly of iron. The crust is broken into huge pieces called tectonic plates. These plates move very slowly, only a few centimetres a year. Look at the layers.", T("Earth has layers: the **crust**, the **mantle** and the **core**.", "The crust is broken into slow moving **tectonic plates**.")),
    EB("space", "Layers of Earth",
      SS("The crust is the thin outer layer, where we live.", S("The crust.", ["e", "🌍", 50, 50, 3, "none"])),
      SS("Under the crust is a thick layer of hot rock called the mantle. In the centre is the very hot core.", S("The mantle and core.", ["m", "🟠", 50, 50, 3, "pulse"], ["c", "🔴", 50, 50, 2, "pulse"]))),
    CHK(mc("Which is the thin, outer layer of the Earth?", "The crust", ["The core", "The mantle"], { hint: "It is where we live.", why: "The crust is the thin outer layer of rock." })),
    H("Stop 2: Volcanoes and earthquakes"),
    SAY("Where plates push against each other, rub past each other or pull apart, we find volcanoes and earthquakes. A volcano erupts when hot melted rock, called magma, rises up and bursts out. Once it is above ground, we call it lava. An earthquake is a shaking of the ground when plates suddenly move. Pakistan sits near the edge of two plates, so it can have earthquakes. Scientists measure them to help keep people safe. Try a memory game, then see if you can match the words.", BRAIN("memory_match", "Earth words", "Find the matching pairs.", ["🌋", "🌍", "🪨", "🌡️"])),
    CHK(mat("Match each word to what it means.", [["Magma", "Melted rock under the ground"], ["Lava", "Melted rock above ground"], ["Earthquake", "Shaking of the ground"]], { hint: "Under or above the ground?", why: "Magma is underground, lava is above ground and an earthquake shakes the ground." })),
    SAY("Remember. Earth has layers. Moving plates cause volcanoes and earthquakes.", SUM("Earth has a crust, a mantle and a core", "The crust is made of slow moving plates", "Plates cause earthquakes and volcanoes")),
    GLOSS({ crust: "The thin outer layer of rock on Earth.", mantle: "The thick layer of hot rock under the crust.", core: "The very hot centre of the Earth.", "tectonic plates": "Huge pieces of the Earth's crust.", magma: "Melted rock under the ground.", lava: "Melted rock above the ground." }),
  ],
  mini: [
    tf("The core is the coolest layer of the Earth.", false, { hint: "It is at the centre.", why: "The core is the hottest layer." }),
    mc("What is melted rock above the ground called?", "Lava", ["Magma", "Crust"], { hint: "It comes out of a volcano.", why: "Lava is melted rock that has reached the surface." }),
    ord("Put these layers in order from the outside to the centre.", ["Crust", "Mantle", "Core"], { hint: "Start where we live.", why: "From the outside, the layers are the crust, then the mantle, then the core." }),
  ],
};

const safe = {
  id: "safe", kind: "use", title: "Forces and safety in real life",
  blocks: [
    H("Stop 1: Using forces to stay safe"),
    SAY("Bike brakes press on the wheel. Friction slows the bike down.", PHOTO(BRAKE, "A bicycle brake close to the wheel rim", "Bike brakes use friction to slow the wheel.", "Photo by Rafał Karoń on Unsplash")),
    SAY("We use what we know about forces every day. Seat belts hold us in our seats when a car stops suddenly. Brakes use friction to slow down a bike or a car. Tyres with a good grip give more friction on the road. Bike helmets protect our heads if we fall. Crumple zones in cars soak up a crash. A skydiver uses a parachute to increase air resistance. All of them help to keep people safe.", T("Forces help us stay safe: **seat belts**, **brakes** and **helmets**.", "Friction helps brakes and tyres to grip.")),
    SAY("Seat belts, brakes and helmets all use what we know about forces.", IMG("🚗 🚲 ⛑️", "Seat belts, brakes and helmets keep us safe.")),
    CHK(mc("What do brakes use to slow a bike down?", "Friction", ["Gravity", "Light"], { hint: "Rubbing surfaces.", why: "Brakes rub against the wheel, and friction slows it." })),
    H("Stop 2: Earthquake safety"),
    SAY("Earthquakes can be frightening, but knowing what to do keeps us safe. If the ground shakes, drop to the ground, take cover under a strong table, and hold on. Stay away from windows and heavy furniture. When the shaking stops, walk outside carefully to an open space, away from buildings. We remember the people hurt in earthquakes. We pray for them and help in any way we can. Make a family plan.", ACT("My family safety plan", ["Paper and pencil", "A grown-up"], ["Draw a plan of your home. Mark strong tables and the exits.", "Choose a meeting place outside, away from buildings.", "Practise Drop, Cover and Hold with your family."])),
    SAY("Under a strong table, away from windows, is a safe place to take cover.", IMG("🪑 🏃 🏠", "Take cover under a strong table, then go to an open space.")),
    CHK(tf("In an earthquake, you should hide next to a large window.", false, { hint: "Glass can break.", why: "You should stay away from windows and take cover under a strong table." })),
    SAY("Remember. We use forces and our science knowledge to stay safe.", SUM("Seat belts, brakes and helmets keep us safe", "Friction helps brakes and tyres grip", "In an earthquake, drop, cover and hold")),
    GLOSS({ "seat belts": "Straps that hold us in our seats in a car.", brakes: "Parts that slow down or stop a vehicle.", helmets: "Hard hats that protect the head.", cover: "To shelter under something strong." }),
  ],
  mini: [
    mc("Why do bikes have tyres with a rough grip?", "To increase friction on the road", ["To reduce friction", "To make them lighter"], { hint: "Grip.", why: "A rough grip increases friction, so the bike does not slip." }),
    ms("Pick two things to do in an earthquake.", ["Take cover under a strong table", "Stay away from windows"], ["Run towards the glass", "Stand next to a heavy cupboard"], { hint: "Think about safety.", why: "Taking cover and avoiding windows keeps you safe." }),
    tf("A seat belt helps keep you safe when a car stops suddenly.", true, { hint: "Think about forces.", why: "A seat belt holds you in place when the car stops suddenly." }),
  ],
};

const ALTS = [
  [mc("Which of these happens when Earth rotates once?", "One day and one night pass", ["One year passes", "One month passes"], { hint: "24 hours.", why: "One rotation of Earth takes 24 hours, giving a day and night." }), mc("What does Earth orbit?", "The Sun", ["The Moon", "Mars"], { hint: "A star.", why: "Earth orbits the Sun." })],
  [tf("The Moon is a source of its own light.", false, { hint: "Reflected light.", why: "The Moon only reflects sunlight." }), tf("The Sun is a star.", true, { hint: "It gives out light.", why: "The Sun is a star." })],
  [mat("Link each space object to its type.", [["Sun", "Star"], ["Earth", "Planet"], ["Moon", "Satellite"]], { hint: "What is each?", why: "The Sun is a star, Earth is a planet and the Moon is a satellite." }), mat("Link each layer to its description.", [["Crust", "Thin outer rock"], ["Mantle", "Thick hot rock"], ["Core", "Very hot centre"]], { hint: "Outside to centre.", why: "Each layer of Earth has a different description." })],
  [ms("Pick two things gravity does.", ["Pulls things towards Earth", "Keeps us on the ground"], ["Makes things float upwards", "Makes things disappear"], { hint: "Pulling down.", why: "Gravity pulls us and objects towards Earth." }), ms("Pick two things that have lots of friction.", ["Carpet", "Sandpaper"], ["Ice", "A wet tile"], { hint: "Rough surfaces.", why: "Carpet and sandpaper are rough, so they have lots of friction." })],
  [hot("Tap the surface that is best for sliding on.", [["🧊", "Ice", 22, 50], ["🧶", "Carpet", 50, 50], ["🪨", "Rough rock", 78, 50]], ["Ice"], { labels: true, hint: "It is smooth.", why: "Ice is smooth, so it has very little friction." }), hot("Tap the layer at the very centre of the Earth.", [["🪨", "Crust", 22, 50], ["🟠", "Mantle", 50, 50], ["🔴", "Core", 78, 50]], ["Core"], { labels: true, hint: "It is in the middle.", why: "The core is at the centre of the Earth." })],
  [st("What is the name for a push or a pull?", ["force"], { hint: "It starts with f.", why: "A force is a push or a pull." }), st("What is the name of the force that pulls things down to Earth?", ["gravity"], { hint: "It starts with g.", why: "Gravity pulls objects towards the Earth." })],
  [mc("Layla drops two parachutes with the same weight. One has a big canopy, one a small canopy. Which falls more slowly?", "The big canopy", ["The small canopy", "They fall at the same rate"], { hint: "More air resistance.", why: "A bigger canopy has more air resistance, so it falls more slowly." }), mc("Bilal wants a fair parachute test. What should he change?", "Only the size of the canopy", ["The weight and the height too", "The room and the time of day"], { hint: "Only change one thing.", why: "A fair test changes just one thing and keeps the rest the same." })],
  [fill("Finish the sentences about Earth.", "Earth {b1} once every 24 hours. It {b2} the Sun once a year.", [["rotates", "orbits", "freezes"], ["orbits", "rotates", "melts"]], { hint: "Spin and travel.", why: "Earth rotates once a day and orbits the Sun once a year." }), fill("Finish the sentences about forces.", "A force is a {b1} or a {b2}.", [["push", "shadow", "sound"], ["pull", "colour", "star"]], { hint: "Two actions.", why: "A force is a push or a pull." })],
  [num("The Moon orbits Earth about once every 28 days. How many days is that in 2 orbits?", 56, { hint: "28 times 2.", why: "28 x 2 = 56 days." }), num("A year has 12 months. How many months are there in 3 years?", 36, { hint: "12 times 3.", why: "12 x 3 = 36 months." })],
  [sld("About how many hours does Earth take to rotate once? Slide to show it.", { min: 0, max: 48, unit: "hours" }, 24, 2, { hint: "One day.", why: "Earth rotates once in 24 hours." }), sld("About how many months does the Moon take to orbit Earth? Slide to show it.", { min: 0, max: 6, unit: "months" }, 1, 0, { hint: "A month.", why: "The Moon orbits Earth about once a month." })],
  [ord("Put these in order for daytime turning into night.", ["The Sun is overhead", "Earth keeps spinning", "Our side turns away from the Sun", "Night begins"], { hint: "Follow the spin.", why: "As Earth spins, our side turns away from the Sun and night begins." }), ord("Put these steps in order for an earthquake.", ["Drop to the ground", "Take cover under a strong table", "Hold on until the shaking stops", "Walk to an open space"], { hint: "Drop, cover, hold.", why: "Drop, take cover, hold on and then go to an open space." })],
  [mc("Hamza says the Sun goes around the Earth to make day and night. What is the real reason?", "Earth spins on its axis", ["The Moon blocks the Sun", "The Sun switches off"], { hint: "Earth turns.", why: "Earth rotates once in 24 hours, giving day and night." }), mc("Noor says we have seasons because Earth is closer to the Sun in summer. What is the real reason?", "Earth is tilted as it orbits the Sun", ["The Moon is closer", "The Sun gets bigger"], { hint: "Think about the tilt.", why: "Earth's tilt gives us seasons." })],
  [mc("What is the job of a parachute for a person jumping from a plane?", "To increase air resistance and fall more slowly", ["To increase gravity", "To fall faster"], { hint: "A big canopy.", why: "A parachute increases air resistance, which slows the fall." }), mc("Why do tyres have patterns cut into them?", "To grip the road with more friction", ["To make them heavier", "To reduce friction"], { hint: "Grip.", why: "The patterns grip the road, giving more friction." })],
  [mc("What is the reason that earthquakes happen in northern Pakistan?", "It sits near the edges of tectonic plates", ["It is too hot", "It has too many dunes of sand"], { hint: "Moving plates.", why: "Plates push against each other near Pakistan, causing earthquakes." }), mc("Why is it better to shelter under a strong table in an earthquake?", "It protects you from falling objects", ["Tables stop the shaking", "Tables make you taller"], { hint: "Falling things.", why: "A strong table protects you from things that fall." })],
  [mc("Sami says the Moon is a star because we can see it shine. Why is he wrong?", "The Moon only reflects light from the Sun", ["The Moon is too small to shine", "The Moon is made of light"], { hint: "Reflected light.", why: "The Moon does not make light. It reflects sunlight." }), mc("Dina says gravity only works on Earth. Why is she wrong?", "Gravity pulls on everything with mass, including the Moon", ["Gravity is a kind of light", "Gravity only works at night"], { hint: "The Moon orbits Earth.", why: "Gravity pulls the Moon too, keeping it in orbit." })],
];

const clip = {
  title: "Fatima looks at the sky", backdrop: "space", caption: "Follow Earth, the Moon and forces through one day.",
  scenes: [
    { caption: "Our star.", say: "The Sun is a star. Earth and the other planets orbit it.",
      items: [{ id: "s", emoji: "☀️", x: 25, y: 50, size: 3, effect: "glow" }, { id: "e", emoji: "🌍", x: 72, y: 50, size: 3, anim: "spin" }] },
    { caption: "Day and night.", say: "Earth spins once in 24 hours. The side facing the Sun has day.",
      items: [{ id: "s", emoji: "☀️", x: 22, y: 50, size: 3 }, { id: "e", emoji: "🌏", x: 70, y: 50, size: 3, anim: "spin" }] },
    { caption: "The Moon.", say: "The Moon orbits Earth about once a month. It reflects sunlight.",
      items: [{ id: "e", emoji: "🌍", x: 40, y: 55, size: 3 }, { id: "m", emoji: "🌙", x: 72, y: 40, size: 2, anim: "float" }] },
    { caption: "Gravity.", say: "Gravity pulls things towards Earth. That is why apples fall down.",
      items: [{ id: "t", emoji: "🌳", x: 30, y: 55, size: 3 }, { id: "a", emoji: "🍎", x: 60, y: 30, size: 2, anim: "bounce" }, { id: "g", emoji: "⬇️", x: 80, y: 55, size: 2, anim: "pulse" }] },
    { caption: "Friction.", say: "Brakes press on the wheel. Friction slows the bike down.",
      items: [{ id: "b", emoji: "🚲", x: 45, y: 58, size: 3 }, { id: "f", emoji: "🛑", label: "friction", x: 78, y: 45, size: 2 }] },
    { caption: "Air resistance.", say: "A parachute catches the air. Air resistance slows the fall.",
      items: [{ id: "p", emoji: "🪂", x: 50, y: 45, size: 3, anim: "float" }] },
    { caption: "Inside Earth.", say: "Earth has a thin crust, a hot mantle and a very hot core.",
      items: [{ id: "c", emoji: "🌋", label: "plates move", x: 40, y: 55, size: 3 }, { id: "l", emoji: "🔴", label: "core", x: 75, y: 50, size: 2, anim: "pulse" }] },
    { caption: "Stay safe.", say: "In an earthquake, drop, take cover and hold on.",
      items: [{ id: "t", emoji: "🪑", x: 40, y: 58, size: 3 }, { id: "p", emoji: "🧎", x: 70, y: 58, size: 3, enter: "pop" }] },
  ],
};

export const topics = [
  topicLesson({
    slug: "science-class-4-earth-space-forces", subject: "science", cls: 4, topic: 6, title: "Earth, Space and Forces",
    summary: "Earth, Sun and Moon, the layers of the Earth, earthquakes and volcanoes, and the forces of gravity, friction and air resistance.",
    unit: "Topic 6: Earth, space and forces", difficulty: 2,
    objectives: ["Describe the movement of Earth and the Moon", "Describe the layers of the Earth", "Describe gravity, friction and air resistance", "Plan a fair test of parachutes"],
    success_criteria: ["I can explain day and night", "I can name the layers of the Earth", "I can name three forces and what they do", "I can say how to stay safe in an earthquake"],
    real_life: "Seeing the new moon for the start of a month, braking on a bike and knowing what to do in an earthquake.",
    standards: [NC("Y5 Earth and space; forces", "Describe the movement of Earth and the Moon; explain day and night; identify gravity, air resistance, water resistance and friction"), PK("S-04-C"), ...CAM("4ESs.01", "4ESs.02", "4ESs.03", "4ESs.04", "4ESp.01", "4ESp.02", "4ESp.03")],
    warm_up: [
      mc("What does a switch do in a circuit?", "Opens or closes it", ["Makes it longer", "Makes it colder"], { hint: "Open or closed.", why: "A switch opens or closes the circuit." }),
      tf("Plastic is an electrical conductor.", false, { hint: "It covers wires.", why: "Plastic is an insulator." }),
      mc("What is energy never?", "Used up", ["Transferred", "Useful"], { hint: "It just changes form.", why: "Energy is never used up. It is transferred." }),
    ],
    intro: [],
    subs: [space, forces, earth, safe],
    clip,
    quiz: [
      Q("space", "recall", "earth.rotate", mc("What happens during one full rotation of Earth?", "One day and one night pass", ["One year passes", "One month passes"], { hint: "24 hours.", why: "One rotation of Earth takes 24 hours, giving a day and night." }), ...ALTS[0]),
      Q("space", "recall", "earth.moon", tf("The Moon gives out its own light.", false, { hint: "Reflected light.", why: "The Moon only reflects sunlight." }), ...ALTS[1]),
      Q("space", "apply", "earth.objects", mat("Match each space object to what it is.", [["Sun", "Star"], ["Earth", "Planet"], ["Moon", "Satellite"]], { hint: "What is each?", why: "The Sun is a star, Earth is a planet and the Moon is a satellite." }), ...ALTS[2]),
      Q("forces", "apply", "earth.gravity", ms("Which two of these does gravity do?", ["Pulls things towards Earth", "Keeps us on the ground"], ["Makes things float upwards", "Makes things disappear"], { hint: "Pulling down.", why: "Gravity pulls us and objects towards Earth." }), ...ALTS[3]),
      Q("forces", "apply", "earth.friction", hot("Tap the surface with the least friction.", [["🧊", "Ice", 22, 50], ["🧶", "Carpet", 50, 50], ["🪨", "Rough rock", 78, 50]], ["Ice"], { labels: true, hint: "It is smooth.", why: "Ice is smooth, so it has very little friction." }), ...ALTS[4]),
      Q("forces", "recall", "earth.words", st("Write the word for a push or a pull.", ["force"], { hint: "It starts with f.", why: "A force is a push or a pull." }), ...ALTS[5]),
      Q("forces", "apply", "earth.parachute", mc("Amna drops two parachutes with the same weight. One has a big canopy and one has a small canopy. Which falls more slowly?", "The big canopy", ["The small canopy", "They fall at the same rate"], { hint: "More air resistance.", why: "A bigger canopy has more air resistance, so it falls more slowly." }), ...ALTS[6]),
      Q("space", "apply", "earth.fill", fill("Complete the sentences about Earth.", "Earth {b1} once every 24 hours. It {b2} the Sun once a year.", [["rotates", "orbits", "freezes"], ["orbits", "rotates", "melts"]], { hint: "Spin and travel.", why: "Earth rotates once a day and orbits the Sun once a year." }), ...ALTS[7]),
      Q("space", "apply", "earth.maths", num("The Moon orbits Earth about once every 28 days. How many days is that in 3 orbits?", 84, { hint: "28 times 3.", why: "28 x 3 = 84 days." }), ...ALTS[8]),
      Q("space", "apply", "earth.slider", sld("About how many hours does Earth take to spin once? Slide to show it.", { min: 0, max: 48, unit: "hours" }, 24, 2, { hint: "One day.", why: "Earth spins once in 24 hours." }), ...ALTS[9]),
      Q("safe", "apply", "earth.order", ord("Put these in order for an earthquake.", ["Drop to the ground", "Take cover under a strong table", "Hold on until the shaking stops", "Walk to an open space"], { hint: "Drop, cover, hold.", why: "Drop, take cover, hold on and then go to an open space." }), ...ALTS[10]),
      Q("space", "reason", "earth.reason_day", mc("Hamza says the Sun goes around Earth to make day and night. What is the real reason?", "Earth spins on its axis", ["The Moon blocks the Sun", "The Sun switches off"], { hint: "Earth turns.", why: "Earth rotates once in 24 hours, giving day and night." }), ...ALTS[11]),
      Q("forces", "reason", "earth.reason_chute", mc("Why does a skydiver open a parachute?", "To increase air resistance and fall more slowly", ["To increase gravity", "To fall faster"], { hint: "A big canopy.", why: "A parachute increases air resistance, which slows the fall." }), ...ALTS[12]),
      Q("earth", "reason", "earth.reason_quake", mc("Why can Pakistan have earthquakes?", "It sits near the edges of tectonic plates", ["It is too hot", "It has too many dunes of sand"], { hint: "Moving plates.", why: "Plates push against each other near Pakistan, causing earthquakes." }), ...ALTS[13]),
      Q("space", "reason", "earth.reason_moon", mc("Sami says the Moon is a star because it shines. Why is he wrong?", "The Moon only reflects light from the Sun", ["The Moon is too small to shine", "The Moon is made of light"], { hint: "Reflected light.", why: "The Moon does not make light. It reflects sunlight." }), ...ALTS[14]),
      // ----- upgrade: 15 new mains (q16-q30), 1 variant each
      Q("space", "recall", "earth.orbit_ms", ms("Which two of these travel in an orbit?", ["Earth", "The Moon"], ["A stone on the ground", "A parked bus"], { hint: "They go around something.", why: "Earth orbits the Sun and the Moon orbits Earth." }),
        ms("Pick two things that Earth does.", ["Rotates once a day", "Orbits the Sun"], ["Stands still", "Orbits the Moon"], { hint: "Spinning and travelling.", why: "Earth rotates and orbits the Sun." })),
      Q("space", "recall", "earth.star_hot", hot("Tap the object that is a star.", [["☀️", "Sun", 22, 50], ["🌍", "Earth", 50, 50], ["🌙", "Moon", 78, 50]], ["Sun"], { labels: true, hint: "It gives out its own light.", why: "The Sun is a star." }),
        hot("Tap the object that orbits Earth.", [["☀️", "Sun", 22, 50], ["🌍", "Earth", 50, 50], ["🌙", "Moon", 78, 50]], ["Moon"], { labels: true, hint: "It is a satellite.", why: "The Moon orbits Earth." })),
      Q("space", "recall", "earth.year_tf", tf("Earth takes about a year to orbit the Sun.", true, { hint: "Think about the calendar.", why: "One orbit of the Sun takes a year." }),
        tf("The Sun orbits the Earth.", false, { hint: "Which is the star?", why: "Earth orbits the Sun." })),
      Q("forces", "recall", "earth.friction_tf", tf("Friction slows moving things down.", true, { hint: "Think about rubbing.", why: "Friction acts against movement." }),
        tf("Gravity pushes objects away from Earth.", false, { hint: "Gravity pulls.", why: "Gravity pulls objects towards Earth." })),
      Q("forces", "apply", "earth.force_mat", mat("Match each example to the force it shows.", [["Brakes on a bike", "Friction"], ["Parachute opening", "Air resistance"], ["Apple falling", "Gravity"]], { hint: "Slowing or pulling?", why: "Brakes use friction, parachutes use air resistance and apples fall because of gravity." }),
        mat("Match each surface to the friction it gives.", [["Rough tyre tread", "More grip"], ["Ice", "Little friction"], ["Carpet", "Lots of friction"]], { hint: "Rough or smooth?", why: "Rough surfaces give more friction." })),
      Q("earth", "apply", "earth.layer_fill", fill("Complete the sentences about the Earth's layers.", "The thin outer layer is the {b1}. The very hot centre is the {b2}.", [["crust", "core", "mantle"], ["core", "crust", "plate"]], { hint: "Outside and inside.", why: "The crust is outside and the core is at the centre." }),
        fill("Complete the sentences about melted rock.", "Melted rock under the ground is {b1}. Above the ground it is {b2}.", [["magma", "lava", "crust"], ["lava", "magma", "core"]], { hint: "Under or above?", why: "Magma is underground and lava is above ground." })),
      Q("forces", "recall", "earth.resist_st", st("What is the name of the force that slows things moving through the air?", ["air resistance"], { hint: "Two words, starts with a.", why: "Air resistance pushes against things moving through the air." }),
        st("What are the units for measuring force called?", ["newtons", "newton", "n"], { hint: "It starts with n.", why: "Forces are measured in newtons." })),
      Q("forces", "apply", "earth.newton_num", num("A shoe needs 4 newtons to slide on lino and 9 newtons on carpet. How many more newtons does carpet need?", 5, { hint: "9 minus 4.", why: "9 - 4 = 5 newtons." }),
        num("A shoe needs 3 newtons on ice and 11 newtons on sandpaper. How many more newtons does sandpaper need?", 8, { hint: "11 minus 3.", why: "11 - 3 = 8 newtons." })),
      Q("space", "apply", "earth.days_sld", sld("A day has 24 hours. Slide to show the hours in 2 days.", { min: 0, max: 100, unit: "hours" }, 48, 0, { hint: "24 times 2.", why: "24 x 2 = 48 hours." }),
        sld("A day has 24 hours. Slide to show the hours in 3 days.", { min: 0, max: 100, unit: "hours" }, 72, 0, { hint: "24 times 3.", why: "24 x 3 = 72 hours." })),
      Q("space", "apply", "earth.phase_ord", ord("Put these Moon phases in order, starting with the new moon.", ["New moon", "Crescent", "Half moon", "Full moon"], { hint: "The lit part grows.", why: "The lit part grows from new moon to full moon." }),
        ord("Put these steps of a parachute test in order.", ["Make two parachutes", "Drop them from the same height", "Time each fall", "Compare the times"], { hint: "Build, test, compare.", why: "Build, drop, time and then compare." })),
      Q("earth", "recall", "earth.layer_mc", mc("What is the very hot centre of the Earth called?", "The core", ["The crust", "The mantle"], { hint: "It is in the middle.", why: "The core is the hottest layer at the centre." }),
        mc("What are the huge moving pieces of the Earth's crust called?", "Tectonic plates", ["Volcanoes", "Satellites"], { hint: "They move slowly.", why: "The crust is broken into tectonic plates." })),
      Q("space", "reason", "earth.reason_phases", mc("Sana says the Moon really changes shape in the sky. Why is she wrong?", "The Moon stays the same. We see different amounts of its lit half", ["The Moon melts and grows", "Clouds cut the Moon"], { hint: "Think about the lit half.", why: "The Moon's phases come from how much of its lit half we see." }),
        mc("Ahmed says clouds cover part of the Moon to make its phases. Why is he wrong?", "Phases happen because we see different amounts of the lit half", ["Clouds change the Moon's size", "The Moon turns off"], { hint: "Think about the orbit.", why: "As the Moon orbits Earth, we see more or less of its lit half." })),
      Q("forces", "reason", "earth.reason_friction", mc("Ali says friction is always bad and we should remove it. Why is he wrong?", "Friction helps us grip, walk and brake", ["Friction makes things fall", "Friction makes light"], { hint: "Think about brakes.", why: "Friction is useful for grip and braking." }),
        mc("Rida says there is no friction on a smooth floor. Why is she wrong?", "All surfaces have some friction. Smooth ones have less", ["Floors cannot have friction", "Only rough things have friction"], { hint: "Smooth is not zero.", why: "Every surface has some friction." })),
      Q("earth", "reason", "earth.reason_core", mc("Hana says the core is cold because it is far from the Sun. Why is she wrong?", "The core is the hottest layer of the Earth", ["The Sun heats the core", "The core is made of ice"], { hint: "It is deep inside.", why: "The core is extremely hot." }),
        mc("Bilal says Earth is solid rock all the way through. Why is he wrong?", "It has layers: a thin crust, a hot mantle and a core", ["It is made of water", "It is empty inside"], { hint: "Think about the peach.", why: "Earth has a crust, a mantle and a core." })),
      Q("safe", "reason", "earth.reason_run", mc("Faisal says it is safest to run outside during the shaking. Why is he wrong?", "Falling objects could hurt him. Drop, cover and hold is safer", ["Running stops the shaking", "Outside is always unsafe"], { hint: "Things can fall.", why: "During the shaking, drop, cover and hold on." }),
        mc("Layla says a seat belt is not needed on a short trip. Why is she wrong?", "A sudden stop can throw you forward, even on a short trip", ["Short trips have no forces", "Seat belts only work at night"], { hint: "Think about stopping suddenly.", why: "A seat belt holds you when a car stops suddenly." })),
    ],
  }),
];
