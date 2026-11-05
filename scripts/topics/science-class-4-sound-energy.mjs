import { SAY, SS, H, T, IMG, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, BAR, mc, ms, tf, num, ord, mat, fill, hot, sld, st } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC, PK, CAM } from "./_science-kit.mjs";

// Science Class 4, topic 4: Sound and energy (Fatima, age 9). Enquiry type: pattern seeking.

const vibrate = {
  id: "vibrate", kind: "learn", title: "How sound is made and travels",
  blocks: [
    H("Stop 1: Sound is a vibration"),
    SAY("Every sound is made by something vibrating, which means moving quickly backwards and forwards. When you pluck a guitar string, you can see it blur as it vibrates. Your own voice comes from vocal cords in your throat vibrating. Put your fingers on your throat and hum. You can feel it! If the vibrating stops, the sound stops too.", T("Sound is made when something **vibrates**.", "When the vibration stops, the sound stops.")),
    EB("classroom", "A vibrating string",
      SS("A guitar string is plucked. It moves quickly backwards and forwards. That is a vibration.", S("The string vibrates.", ["g", "🎸", 50, 55, 3, "pulse"], ["v", "〰️", 80, 40, 2, "float"])),
      SS("The vibrating string pushes on the air around it, and we hear a sound.", S("The vibration makes sound.", ["g", "🎸", 35, 55, 3, "pulse"], ["w", "🔊", 70, 40, 3, "pulse"])),
      SS("Soon the string stops vibrating, and the sound stops too.", S("No vibration, no sound.", ["g", "🎸", 50, 55, 3, "none"], ["q", "🔇", 80, 40, 2, "none"]))),
    CHK(mc("What makes a sound?", "Something vibrating", ["Something still", "Something cold"], { hint: "Think about the guitar string.", why: "All sounds are made by vibrations." })),
    H("Stop 2: How sound travels"),
    SAY("The vibrations from a sound travel outwards as sound waves. The waves pass through a material. Sound can travel through gases like air, through liquids like water, and through solids like wood or metal. In fact sound travels faster in solids and liquids than in air, because the particles are closer together. But sound cannot travel through a vacuum, which is empty space with no particles at all. In space, no one can hear you.", T("Sound travels as **sound waves** through a **medium** such as air, water or a solid.", "Sound cannot travel through a **vacuum**.")),
    EB("space", "Sound needs a medium",
      SS("On Earth, a bell rings. The vibrations pass through the particles of the air to your ear.", S("Sound travels through air.", ["b", "🔔", 20, 55, 3, "pulse"], ["w", "〰️", 45, 55, 2, "float"], ["e", "👂", 80, 55, 3, "none"])),
      SS("In space there is a vacuum. There are no particles to carry the vibrations, so no sound reaches the listener.", S("In a vacuum, there is no sound.", ["b", "🔔", 20, 55, 3, "pulse"], ["x", "❌", 50, 55, 3, "none"], ["e", "👨‍🚀", 80, 55, 3, "none"]))),
    CHK(mc("Can sound travel through a vacuum?", "No", ["Yes, very fast", "Yes, but slowly"], { hint: "A vacuum has no particles.", why: "Sound needs particles to carry the vibrations, so it cannot travel through a vacuum." })),
    SAY("Remember. Sound is a vibration that travels as a wave through a medium.", SUM("Sound is made by vibrations", "Sound travels as waves through solids, liquids and gases", "Sound cannot travel through a vacuum")),
    GLOSS({ vibrates: "Moves quickly backwards and forwards.", "sound waves": "The way sound vibrations travel outwards.", medium: "The material that sound travels through, such as air.", vacuum: "A space with no particles at all." }),
  ],
  mini: [
    tf("Sound is made by vibrations.", true, { hint: "Think about the guitar.", why: "All sounds come from something vibrating." }),
    mc("Which material can sound travel through?", "Water", ["A vacuum", "Empty space"], { hint: "It needs particles.", why: "Sound can travel through water, but not through a vacuum." }),
    mat("Match each state to how sound travels.", [["Solid", "Fastest"], ["Liquid", "Quite fast"], ["Gas", "Slowest"]], { hint: "Think about how close the particles are.", why: "Sound travels fastest where particles are closest." }),
    ord("Put these in order.", ["Something vibrates", "Waves travel through air", "Ear hears the sound"], { hint: "Start with the vibration.", why: "A vibration makes waves that reach the ear." }),
  ],
};

const pitch = {
  id: "pitch", kind: "try", title: "Pitch and volume",
  blocks: [
    H("Stop 1: High and low sounds"),
    SAY("Pitch means how high or low a sound is. A mouse squeaks with a high pitch. A lion roars with a low pitch. Fast vibrations make a high pitch, and slow vibrations make a low pitch. A short, thin, tight string vibrates fast, so it sounds high. A long, thick, loose string vibrates slowly, so it sounds low. Look at the strings.", T("**Pitch** is how high or low a sound is.", "Fast vibrations make a high pitch; slow vibrations make a low pitch.")),
    EB("classroom", "Pitch of strings",
      SS("This short, thin string vibrates fast. It makes a high-pitched sound.", S("Short and thin: high pitch.", ["a", "🎻", 30, 55, 3, "pulse"], ["h", "🐭", 75, 55, 2, "bounce"])),
      SS("This long, thick string vibrates slowly. It makes a low-pitched sound.", S("Long and thick: low pitch.", ["a", "🎸", 30, 55, 3, "none"], ["l", "🦁", 75, 55, 3, "none"]))),
    CHK(mc("A short, thin string vibrates fast. What sound does it make?", "A high-pitched sound", ["A low-pitched sound", "No sound"], { hint: "Think of the mouse.", why: "Fast vibrations make a high pitch." })),
    H("Stop 2: Loud and quiet"),
    SAY("Volume means how loud or quiet a sound is. A big vibration makes a loud sound. A small vibration makes a quiet sound. As sound spreads out, it gets quieter, so the further you are from the sound, the quieter it seems. We measure loudness in decibels. A whisper is about thirty decibels. A very loud sound can hurt your ears, so we protect our hearing. Sort the sounds, then try making your own instrument.", MAN("Loud or quiet?", "Put loud sounds in Loud and quiet sounds in Quiet.", "🔊", 8, ["Loud", "Quiet"])),
    ACT("Rubber band guitar", ["An empty tissue box or tub", "Three rubber bands of different thickness", "A grown-up"], ["Stretch the rubber bands across the open box.", "Pluck each one. Which sounds highest and which sounds lowest? Which is thickest?", "Tighten one band and pluck it again. What happens to the pitch? Write down your pattern."]),
    CHK(mc("A drum is hit very hard. What happens to the volume?", "It gets louder", ["It gets quieter", "It stays the same"], { hint: "A big vibration.", why: "A harder hit makes a bigger vibration and a louder sound." })),
    SAY("Remember. Fast vibrations make high pitch. Big vibrations make loud sounds.", SUM("Pitch is how high or low a sound is", "Volume is how loud a sound is", "Sound gets quieter as you move away")),
    GLOSS({ volume: "How loud or quiet a sound is.", decibels: "The units for measuring how loud a sound is.", pitch: "How high or low a sound is." }),
  ],
  mini: [
    mc("Which has a low pitch?", "A lion's roar", ["A mouse squeak", "A whistle"], { hint: "Big animals make low sounds.", why: "A lion's roar is low in pitch." }),
    tf("A louder sound has a bigger vibration.", true, { hint: "Think about hitting a drum harder.", why: "Bigger vibrations make louder sounds." }),
    mat("Match each to its pitch.", [["Short thin string", "High"], ["Long thick string", "Low"], ["Tight string", "Higher than loose"]], { hint: "Think about fast and slow vibrations.", why: "Short, thin, tight strings vibrate faster and sound higher." }),
  ],
};

const energy = {
  id: "energy", kind: "play", title: "Energy transfers",
  blocks: [
    H("Stop 1: Energy moves"),
    SAY("Energy is what makes things happen. It makes things move, light up, make sound or get hot. Energy comes in different forms. Light energy, sound energy, heat energy, movement energy and electrical energy. The big idea is that energy can move from one place to another, or change from one form to another. It is never made from nothing and never used up. This is called a transfer. A radio changes electrical energy into sound energy, and some heat. A toaster changes electrical energy into heat.", T("**Energy** makes things happen. It can be **transferred**, which means moved or changed from one form to another.", "Energy is never used up. It just changes form.")),
    EB("home", "Energy transfers",
      SS("A lamp changes electrical energy into light and some heat.", S("Lamp: electrical to light and heat.", ["a", "🔌", 15, 60, 2, "none"], ["b", "💡", 50, 55, 3, "pulse"], ["c", "🌡️", 85, 55, 2, "float"])),
      SS("A radio changes electrical energy into sound energy, and a little heat.", S("Radio: electrical to sound.", ["a", "🔌", 15, 60, 2, "none"], ["b", "📻", 50, 55, 3, "pulse"], ["c", "🔊", 85, 55, 2, "float"])),
      SS("When you clap, movement energy changes into sound energy.", S("Clapping: movement to sound.", ["a", "👏", 40, 55, 3, "bounce"], ["c", "🔊", 80, 55, 2, "float"]))),
    CHK(mc("A radio mainly changes electrical energy into which form?", "Sound", ["Light", "Movement"], { hint: "What does a radio do?", why: "A radio changes electrical energy into sound energy." })),
    H("Stop 2: Brain game"),
    SAY("Warm up your memory with a game, then see if you can match each device to the energy change it makes.", BRAIN("memory_match", "Energy pairs", "Find the matching pairs.", ["💡", "📻", "🍞", "🚲"])),
    CHK(mat("Match each device to its main energy change.", [["Toaster", "Electrical to heat"], ["Lamp", "Electrical to light"], ["Radio", "Electrical to sound"]], { hint: "What does each one do?", why: "Each device transfers electrical energy into a useful form." })),
    SAY("Remember. Energy is transferred between forms. It is never used up.", SUM("Energy makes things happen", "Energy changes from one form to another", "Energy is never used up")),
    GLOSS({ energy: "What makes things happen, like movement, light, heat and sound.", transferred: "Moved or changed from one form to another.", electrical: "To do with electricity.", forms: "The different kinds of energy." }),
  ],
  mini: [
    tf("Energy is used up completely when a lamp is switched on.", false, { hint: "Energy is never used up.", why: "Energy changes form, but it is not destroyed." }),
    mc("A toaster mainly changes electrical energy into...", "Heat", ["Sound", "Light"], { hint: "It cooks bread.", why: "A toaster changes electrical energy into heat." }),
    ms("Pick two forms of energy.", ["Light", "Sound"], ["Rock", "Plastic"], { hint: "Think about what energy can do.", why: "Light and sound are forms of energy." }),
  ],
};

const quiet = {
  id: "quiet", kind: "use", title: "Quiet places and loud sounds",
  blocks: [
    H("Stop 1: Soundproofing"),
    SAY("Sometimes we want to stop sound spreading. Materials that block sound are called sound insulators. Thick, soft materials such as carpet, foam and curtains absorb sound vibrations. Hard, smooth surfaces bounce sound back, which causes echoes. That is why a room with lots of soft furniture sounds quiet, and an empty room echoes. Recording studios use thick foam on their walls. Look at which materials block sound.", T("A **sound insulator** blocks sound. Soft, thick materials are best.", "Hard, smooth surfaces bounce sound back as an **echo**.")),
    SAY("Soft things like foam and sofas absorb sound. Hard walls and mountains bounce it back.", IMG("🧱 🛋️ 🧽 🏔️", "Foam and soft furnishings absorb sound. Mountains and hard walls can make echoes.")),
    CHK(mc("Which material would block sound best?", "Thick foam", ["Glass", "Bare brick"], { hint: "Soft and thick.", why: "Thick soft materials absorb sound vibrations." })),
    H("Stop 2: Protect your hearing"),
    SAY("Very loud noises can damage our hearing for good. Headphones turned up loud, fireworks and heavy machinery can all hurt the tiny parts inside the ear. We should keep the volume down, move away from loud sounds, and wear ear protection if we need to. We should also respect others, and keep our noise low, especially near people who are praying, sleeping or studying.", ACT("A sound survey", ["Paper and pencil", "A grown-up"], ["Walk around your home or school. List five sounds.", "Rate each one: quiet, medium or loud.", "Which ones could harm your ears? What could you do to protect them?"])),
    SAY("Loud headphones, fireworks and machines are all examples of sounds that can harm.", IMG("🎧 🎆 🛠️", "Loud headphones, fireworks and machines can harm hearing.")),
    CHK(tf("Very loud noises can damage your hearing.", true, { hint: "Think about fireworks.", why: "Loud noises can damage the tiny parts of the ear." })),
    SAY("Remember. Soft materials block sound. Loud noises can harm hearing, so protect your ears.", SUM("Soft, thick materials are the best sound insulators", "Loud noises can damage hearing", "Keep the volume down and be considerate")),
    GLOSS({ insulator: "A material that stops something, like sound or heat, from passing through.", echo: "Sound that bounces back off a hard surface.", hearing: "Your ability to hear." }),
  ],
  mini: [
    mc("What causes an echo?", "Sound bouncing off a hard surface", ["Sound travelling in a vacuum", "Soft carpet"], { hint: "Think about a mountain.", why: "An echo is sound reflected from a hard surface." }),
    ms("Pick two ways to protect your hearing.", ["Keep headphones at a low volume", "Move away from very loud sounds"], ["Turn music to maximum", "Stand next to speakers"], { hint: "Think about safety.", why: "Lower volume and distance protect your ears." }),
    tf("Soft materials absorb sound.", true, { hint: "Think about a carpet.", why: "Soft materials absorb sound vibrations." }),
  ],
};

const ALTS = [
  [mc("What must happen for a guitar string to make a sound?", "It must vibrate", ["It must be cold", "It must be still"], { hint: "Sounds come from vibrations.", why: "A string must vibrate to make sound." }), mc("What happens to your throat when you hum?", "Your vocal cords vibrate", ["Your throat freezes", "Nothing moves"], { hint: "Feel your throat.", why: "Vocal cords vibrate to make your voice." })],
  [tf("Sound can travel through a vacuum.", false, { hint: "A vacuum has no particles.", why: "Sound cannot travel through a vacuum." }), tf("Sound travels faster through solids than through air.", true, { hint: "Particles are closer in solids.", why: "Sound travels faster in solids." })],
  [mat("Pair each material with how sound travels through it.", [["Steel", "Very fast"], ["Water", "Fast"], ["Air", "Slower"]], { hint: "Think about particles.", why: "Sound travels faster through materials with particles closer together." }), mat("Link each to its pitch.", [["Mouse squeak", "High"], ["Lion roar", "Low"], ["Whistle", "High"]], { hint: "Think about the sounds.", why: "A mouse and a whistle are high; a lion's roar is low." })],
  [ms("Pick two things that make a high-pitched sound.", ["A short thin string", "A whistle"], ["A big drum", "A lion's roar"], { hint: "Fast vibrations.", why: "Short, thin strings and whistles have a high pitch." }), ms("Which two of these are forms of energy?", ["Light", "Heat"], ["Stone", "Metal"], { hint: "What energy can do.", why: "Light and heat are forms of energy." })],
  [hot("Tap the thing that makes a low-pitched sound.", [["🐭", "Mouse", 22, 50], ["🦁", "Lion", 50, 50], ["🐦", "Small bird", 78, 50]], ["Lion"], { labels: true, hint: "A big animal.", why: "A lion's roar is low-pitched." }), hot("Tap the thing that changes electrical energy into light.", [["💡", "Lamp", 22, 50], ["🍞", "Bread", 50, 50], ["🚲", "Bike", 78, 50]], ["Lamp"], { labels: true, hint: "It lights up.", why: "A lamp changes electrical energy into light." })],
  [st("What is the word for how high or low a sound is?", ["pitch"], { hint: "It starts with p.", why: "Pitch is how high or low a sound is." }), st("What is the word for how loud a sound is?", ["volume", "loudness"], { hint: "It starts with v.", why: "Volume is how loud a sound is." })],
  [mc("Maya plucks a loose, thick string and then a tight, thin string. Which has the higher pitch?", "The tight, thin string", ["The loose, thick string", "They are the same"], { hint: "Fast vibrations.", why: "Tight, thin strings vibrate faster, so they sound higher." }), mc("Zayn moves further from a bell. What happens to the volume?", "It gets quieter", ["It gets louder", "It stays the same"], { hint: "Sound spreads out.", why: "Sound spreads out and gets quieter with distance." })],
  [fill("Finish the sentences about sound.", "Sound is made by {b1}. It cannot travel through a {b2}.", [["vibrations", "colours", "shadows"], ["vacuum", "solid", "liquid"]], { hint: "Two key ideas.", why: "Sound is made by vibrations and cannot travel through a vacuum." }), fill("Finish the sentences about energy.", "Energy is never {b1}. It is {b2} from one form to another.", [["used up", "made", "bought"], ["transferred", "stopped", "hidden"]], { hint: "The big idea about energy.", why: "Energy is never used up. It is transferred." })],
  [num("A sound travels 340 metres each second. How far does it travel in 3 seconds?", 1020, { hint: "340 times 3.", why: "340 x 3 = 1020 metres." }), num("A sound travels 340 metres in one second. How far does it go in 2 seconds?", 680, { hint: "340 times 2.", why: "340 x 2 = 680 metres." })],
  [sld("About how many decibels is a whisper? Slide to show it.", { min: 0, max: 140, unit: "dB" }, 30, 10, { hint: "Very quiet.", why: "A whisper is about 30 decibels." }), sld("About how many decibels is a loud rock concert? Slide to show it.", { min: 0, max: 140, unit: "dB" }, 110, 10, { hint: "Loud enough to hurt ears.", why: "A rock concert can reach 110 decibels or more." })],
  [ord("Put these in order for how you hear a drum.", ["Drum is hit", "Drum skin vibrates", "Sound waves travel through air", "Ear hears the sound"], { hint: "Start with the hit.", why: "The hit makes the skin vibrate, which sends waves to the ear." }), ord("Order the energy changes in a radio.", ["Electrical energy goes in", "The radio changes it", "Sound energy comes out"], { hint: "Follow the energy.", why: "Electrical energy goes in and sound comes out." })],
  [mc("Amir says sound travels through space as fast as light. Why is he wrong?", "Space is a vacuum with no particles to carry sound", ["Space is too hot", "Sound is too heavy"], { hint: "Think about a medium.", why: "Sound needs particles to travel, and space is a vacuum." }), mc("Layla says energy is used up when a toy stops. Why is she wrong?", "The energy has changed form, such as to heat and sound", ["The toy ate the energy", "Energy never moves"], { hint: "Energy is transferred.", why: "Energy is never used up. It is transferred to other forms." })],
  [mc("Why are recording studios lined with foam?", "Foam absorbs sound so it does not echo", ["Foam makes sound louder", "Foam makes sound travel faster"], { hint: "Soft materials absorb sound.", why: "Foam absorbs sound vibrations and stops echoes." }), mc("Why does an empty room echo?", "Hard walls bounce sound back", ["Soft carpet absorbs sound", "There is no air"], { hint: "Think about hard surfaces.", why: "Hard surfaces reflect sound, making an echo." })],
  [mc("Sana's string sounds low. How could she make the pitch higher?", "Tighten the string or use a shorter, thinner one", ["Make it longer and thicker", "Pluck it more slowly"], { hint: "Fast vibrations.", why: "Shorter, thinner, tighter strings vibrate faster and sound higher." }), mc("Ben wants his drum to be quieter. What should he do?", "Hit it more gently", ["Hit it harder", "Turn the drum up"], { hint: "Smaller vibrations.", why: "A gentler hit makes a smaller vibration and a quieter sound." })],
  [mc("Mia says sound needs nothing to travel through. Why is she wrong?", "Sound is a vibration that must pass through particles", ["Sound travels best in a vacuum", "Sound is made of light"], { hint: "Think about a medium.", why: "Sound travels as vibrations through particles of a medium." }), mc("Joe says energy is a kind of material, like wood. Why is he wrong?", "Energy is not a material; it is what makes things happen", ["Energy is heavy", "Energy is a solid"], { hint: "Think about what energy does.", why: "Energy is not a material. It makes things move, light up and make sound." })],
];

export const topics = [
  topicLesson({
    slug: "science-class-4-sound-energy", subject: "science", cls: 4, topic: 4, title: "Sound and Energy",
    summary: "How sounds are made, how they travel, pitch and volume, and how energy is transferred but never used up.",
    unit: "Topic 4: Sound and energy", difficulty: 2,
    objectives: ["Explain that sound is made by vibrations", "Explain how sound travels and why not through a vacuum", "Describe pitch and volume", "Describe energy transfers"],
    success_criteria: ["I can explain how a sound is made", "I can say how sound travels", "I can explain pitch and volume", "I can give an example of an energy transfer"],
    real_life: "Playing a guitar, keeping headphones at a safe volume and choosing a quiet place to study.",
    standards: [NC("Y4 sound", "Identify how sounds are made and travel to the ear; find patterns in pitch and volume; sounds get fainter with distance"), ...CAM("4Pf.01", "4Pf.02", "4Pf.03", "4Pf.04")],
    warm_up: [
      mc("What is the state of matter that spreads out to fill its container?", "Gas", ["Solid", "Liquid"], { hint: "Particles far apart.", why: "Gases spread out to fill any container." }),
      tf("Water boils at 100 degrees Celsius.", true, { hint: "Top of the thermometer.", why: "Water boils at 100 °C." }),
      mc("What pumps blood around the body?", "The heart", ["The stomach", "The skull"], { hint: "It is a muscle.", why: "The heart pumps blood." }),
    ],
    intro: [
      H("Welcome back, young scientist!"),
      SAY("Welcome back, young scientist! Today's big question is: what is sound, and where does energy go? By the end, you will explain how sounds are made and travel, change the pitch and volume of a sound, and follow energy as it changes form. Let's go!", T("Today's big question: what is sound?", "We will also follow energy as it moves.")),
      IMG("🎸🔊🔔", "Sounds are all around us."),
      GLOSS({ sound: "What we hear when something vibrates." }),
    ],
    subs: [vibrate, pitch, energy, quiet],
    quiz: [
      Q("vibrate", "recall", "sound.made", mc("What must happen for a drum skin to make a sound?", "It must vibrate", ["It must be cold", "It must be still"], { hint: "Sounds come from vibrations.", why: "A drum skin must vibrate to make sound." }), ...ALTS[0]),
      Q("vibrate", "recall", "sound.vacuum", tf("Sound can travel through empty space.", false, { hint: "No particles.", why: "Sound cannot travel through a vacuum." }), ...ALTS[1]),
      Q("vibrate", "apply", "sound.speed", mat("Which is fastest and which is slowest? Match each material to how sound moves through it.", [["Steel", "Very fast"], ["Water", "Fast"], ["Air", "Slower"]], { hint: "Think about particles.", why: "Sound travels faster through materials with particles closer together." }), ...ALTS[2]),
      Q("pitch", "apply", "sound.pitch_pick", ms("Which two of these make a high-pitched sound?", ["A short thin string", "A whistle"], ["A big drum", "A lion's roar"], { hint: "Fast vibrations.", why: "Short, thin strings and whistles have a high pitch." }), ...ALTS[3]),
      Q("pitch", "recall", "sound.label", hot("Tap the animal that makes a high-pitched sound.", [["🐭", "Mouse", 22, 50], ["🦁", "Lion", 50, 50], ["🐘", "Elephant", 78, 50]], ["Mouse"], { labels: true, hint: "Small animals squeak.", why: "A mouse makes a high-pitched squeak." }), ...ALTS[4]),
      Q("pitch", "recall", "sound.words", st("Write the word for how high or low a sound is.", ["pitch"], { hint: "It starts with p.", why: "Pitch is how high or low a sound is." }), ...ALTS[5]),
      Q("pitch", "apply", "sound.pattern", mc("Nadia plucks a thick, loose string, then a thin, tight string. Which has the higher pitch?", "The thin, tight string", ["The thick, loose string", "They are the same"], { hint: "Fast vibrations.", why: "Thin, tight strings vibrate faster, so they sound higher." }), ...ALTS[6]),
      Q("energy", "apply", "sound.fill", fill("Complete the sentences about energy.", "Energy is never {b1} up. It is {b2} between forms.", [["used", "made", "bought"], ["transferred", "stopped", "hidden"]], { hint: "The big idea about energy.", why: "Energy is never used up. It is transferred." }), ...ALTS[7]),
      Q("vibrate", "apply", "sound.maths", num("A sound travels 340 metres in one second. How far does it travel in 4 seconds?", 1360, { hint: "340 times 4.", why: "340 x 4 = 1360 metres." }), ...ALTS[8]),
      Q("quiet", "apply", "sound.decibels", sld("About how loud is normal talking, in decibels?", { min: 0, max: 140, unit: "dB" }, 60, 10, { hint: "Between a whisper and a shout.", why: "Normal talking is about 60 decibels." }), ...ALTS[9]),
      Q("vibrate", "apply", "sound.order", ord("Put these in order for how you hear a guitar.", ["String is plucked", "String vibrates", "Sound waves travel through air", "Ear hears the sound"], { hint: "Start with the pluck.", why: "The pluck makes the string vibrate, which sends waves to the ear." }), ...ALTS[10]),
      Q("vibrate", "reason", "sound.reason_space", mc("Fatima says an astronaut can hear a spaceship explosion outside. Why is she wrong?", "Space is a vacuum with no particles to carry sound", ["Space is too hot", "Sound is too heavy"], { hint: "Think about a medium.", why: "Sound needs particles to travel, and space is a vacuum." }), ...ALTS[11]),
      Q("quiet", "reason", "sound.reason_foam", mc("Why do recording studios use foam on the walls?", "Foam absorbs sound so there is no echo", ["Foam makes sound louder", "Foam makes sound travel faster"], { hint: "Soft materials absorb sound.", why: "Foam absorbs sound vibrations and stops echoes." }), ...ALTS[12]),
      Q("pitch", "reason", "sound.reason_pitch", mc("Zara's string sounds low. How could she make the pitch higher?", "Tighten the string or use a shorter, thinner one", ["Make it longer and thicker", "Pluck it more slowly"], { hint: "Fast vibrations.", why: "Shorter, thinner, tighter strings vibrate faster and sound higher." }), ...ALTS[13]),
      Q("vibrate", "reason", "sound.medium", mc("Ravi says light carries sound from a bell to our ears. Why is he wrong?", "Sound is carried by vibrating particles, such as in the air", ["Sound is carried by a vacuum", "Sound is carried by shadows"], { hint: "It needs a medium.", why: "Sound travels as vibrations through the particles of the air." }), ...ALTS[14]),
    ],
  }),
];
