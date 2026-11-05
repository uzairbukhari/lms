import { SAY, SS, H, T, IMG, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld, st } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC, PK, CAM } from "./_science-kit.mjs";

// Science Class 1, topic 6: Light and shadows (Zainab, age 7). Stretch topic (NC Y3). Enquiry type: pattern seeking.

const sources = {
  id: "sources", kind: "learn", title: "Light and how we see",
  blocks: [
    H("Stop 1: Where does light come from?"),
    SAY("Light helps us see. Some things make their own light. We call them light sources. The Sun is the biggest light source we know. A torch, a lamp and a candle are light sources too. The Moon is not a light source. It only looks bright because the Sun's light bounces off it. Look at some light sources.", T("A **light source** makes its own light.", "The Sun, a torch and a lamp are light sources. The Moon is not.")),
    EB("space", "Light sources",
      SS("The Sun makes its own light. It lights up our whole day.", S("The Sun is a light source.", ["a", "☀️", 50, 45, 3, "pulse"])),
      SS("A torch makes light too. So does a lamp.", S("A torch and a lamp are light sources.", ["a", "🔦", 30, 55, 3, "pulse"], ["b", "💡", 70, 55, 3, "pulse"])),
      SS("The Moon does not make light. It only reflects the Sun's light, so it shines in the sky.", S("The Moon only reflects light.", ["a", "🌙", 50, 45, 3, "float"], ["s", "☀️", 85, 20, 2, "pulse"]))),
    CHK(mc("Which of these is a light source?", "A torch", ["A book", "The Moon"], { hint: "It makes its own light.", why: "A torch makes its own light. A book and the Moon do not." })),
    H("Stop 2: How do we see?"),
    SAY("A long time ago, a Muslim scientist called Ibn al-Haytham worked out how we see. He lived in Basra and Cairo about a thousand years ago. He showed that light travels in straight lines. Light bounces off things and goes into our eyes. That is how we see them. In the dark, there is no light to bounce, so we cannot see.", T("**Ibn al-Haytham** showed that we see when light bounces off things into our eyes.", "In the dark, there is no light, so we cannot see.")),
    EB("home", "How we see a ball",
      SS("A lamp sends out light. It travels in straight lines.", S("Light from a lamp.", ["l", "💡", 15, 40, 3, "pulse"], ["r", "➡️", 35, 40, 2, "none"])),
      SS("The light hits the ball and bounces off.", S("Light bounces off the ball.", ["l", "💡", 15, 40, 3, "pulse"], ["b", "⚽", 50, 50, 3, "none"], ["r", "↗️", 65, 30, 2, "none"])),
      SS("The light goes into your eye. Now you can see the ball!", S("The light goes into the eye.", ["l", "💡", 15, 40, 3, "none"], ["b", "⚽", 45, 55, 3, "none"], ["e", "👁️", 85, 35, 3, "pulse"]))),
    CHK(tf("We can see things in complete darkness.", false, { hint: "What does light do?", why: "We need light to bounce off things into our eyes, so we cannot see in complete darkness." })),
    SAY("Let us remember. Light sources make light. Light bounces into our eyes so we can see.", SUM("A light source makes its own light", "Light travels in straight lines", "We see when light bounces into our eyes")),
    GLOSS({ "light source": "Something that makes its own light, like the Sun.", "Ibn al-Haytham": "A Muslim scientist who lived about 1,000 years ago and explained how we see.", darkness: "When there is no light." }),
  ],
  mini: [
    mc("Which of these makes its own light?", "The Sun", ["The Moon", "A mirror"], { hint: "It is a star.", why: "The Sun makes its own light." }),
    tf("Light travels in straight lines.", true, { hint: "Think of a torch beam.", why: "Light goes in straight lines." }),
    mat("Match each thing to what it does with light.", [["Torch", "Makes light"], ["Moon", "Reflects light"], ["Eye", "Takes in light"]], { hint: "Think about each one.", why: "A torch makes light, the Moon reflects it and an eye takes it in." }),
    mc("Who explained how we see?", "Ibn al-Haytham", ["A baker", "A king"], { hint: "A scientist from long ago.", why: "Ibn al-Haytham explained how light helps us see." }),
  ],
};

const shadows = {
  id: "shadows", kind: "try", title: "Making shadows",
  blocks: [
    H("Stop 1: What is a shadow?"),
    SAY("A shadow is a dark shape. It forms when something blocks the light. Light cannot go through an opaque thing like you, so a dark patch appears behind you. That dark patch is your shadow. A shadow is the same shape as the thing blocking the light. Watch a shadow form.", T("A **shadow** forms when something blocks the light.", "The shadow has the same shape as the object.")),
    EB("meadow", "A shadow forms",
      SS("The sun shines on a girl. Her body blocks the light.", S("The Sun shines on the girl.", ["s", "☀️", 20, 20, 3, "pulse"], ["g", "🧍", 40, 55, 3, "none"])),
      SS("A dark shadow appears on the ground behind her, on the side away from the Sun.", S("The shadow is on the other side.", ["s", "☀️", 20, 20, 3, "pulse"], ["g", "🧍", 40, 55, 3, "none"], ["sh", "🌑", 65, 72, 2, "grow"]))),
    CHK(mc("What makes a shadow?", "Something blocks the light", ["The wind", "A loud noise"], { hint: "Light cannot get through.", why: "A shadow forms where an object blocks the light." })),
    H("Stop 2: Shadow play"),
    SAY("Time to play with shadows! Use a torch and your hands. Move your hand close to the wall and then further away. Which shadow is bigger? Try it, and put the objects into the boxes.", MAN("Does it make a shadow?", "Opaque things make a shadow. See-through things make a faint shadow. Sort them.", "🧱", 8, ["Dark shadow", "Faint or no shadow"])),
    ACT("Shadow puppets", ["A torch", "A plain wall", "Your hands", "A grown-up"], ["Switch off the big light and hold the torch pointing at the wall.", "Make an animal shape with your hands in front of the torch.", "Move your hands closer to the torch. What happens to the shadow? Is it bigger or smaller?"]),
    CHK(mc("You move your hand closer to the torch. What happens to the shadow?", "It gets bigger", ["It gets smaller", "It disappears"], { hint: "Try it with a torch.", why: "The closer the object is to the light, the bigger its shadow." })),
    SAY("Remember. A shadow is made when something blocks light. Moving the object changes the shadow.", SUM("A shadow forms when something blocks light", "Closer to the light makes a bigger shadow")),
    GLOSS({ shadow: "A dark shape made when something blocks light.", opaque: "Not able to be seen through, so it blocks light.", torch: "A small lamp you hold in your hand.", faint: "Not very dark or clear." }),
  ],
  mini: [
    tf("A shadow is the same shape as the thing that makes it.", true, { hint: "Think of a hand puppet.", why: "A shadow has the same outline as the object." }),
    mc("Which would make the darkest shadow?", "A wooden box", ["A clear glass jar", "Clear plastic wrap"], { hint: "Which is opaque?", why: "An opaque wooden box blocks all the light." }),
    ord("Put these shadows in order, smallest first, as the hand moves closer to the torch.", ["Far away", "Halfway", "Very close"], { hint: "Closer is bigger.", why: "A shadow grows as the object nears the light." }),
  ],
};

const sunshadow = {
  id: "sunshadow", kind: "play", title: "Shadows through the day",
  blocks: [
    H("Stop 1: The Sun moves across the sky"),
    SAY("The Sun looks as if it moves across the sky from morning to evening. Really it is the Earth turning. This changes our shadows. In the morning the Sun is low, so shadows are long. At midday the Sun is high, so shadows are short. In the evening the Sun is low again, so shadows are long again. Watch a shadow change.", T("Shadows are **long** when the Sun is low and **short** when the Sun is high.")),
    EB("meadow", "A shadow through the day",
      SS("In the morning the Sun is low. The tree has a long shadow.", S("Morning: a long shadow.", ["s", "☀️", 15, 35, 3, "pulse"], ["t", "🌳", 45, 55, 3, "none"], ["sh", "🌑", 75, 72, 3, "none"])),
      SS("At midday the Sun is high. The shadow is short, right under the tree.", S("Midday: a short shadow.", ["s", "☀️", 45, 12, 3, "pulse"], ["t", "🌳", 45, 55, 3, "none"], ["sh", "🌑", 50, 76, 1, "none"])),
      SS("In the evening the Sun is low again, on the other side. The shadow is long again.", S("Evening: a long shadow again.", ["s", "☀️", 85, 35, 3, "pulse"], ["t", "🌳", 55, 55, 3, "none"], ["sh", "🌑", 25, 72, 3, "none"]))),
    CHK(mc("When is a shadow shortest?", "At midday", ["In the morning", "In the evening"], { hint: "The Sun is highest.", why: "At midday the Sun is high, so shadows are short." })),
    H("Stop 2: Brain game"),
    SAY("Time for a brain game. Find the pairs. Then work out when your shadow is the longest.", BRAIN("memory_match", "Sun and shadow", "Find the pairs.", ["☀️", "🌙", "🌳", "🔦"])),
    CHK(ms("Pick two times when shadows are long.", ["Morning", "Evening"], ["Midday", "Noon"], { hint: "The Sun is low.", why: "Shadows are long in the morning and evening." })),
    SAY("Remember. Shadows change length through the day.", SUM("The Sun is low in the morning and evening, so shadows are long", "The Sun is high at midday, so shadows are short")),
    GLOSS({ long: "A lot of length from one end to the other.", short: "Not long.", midday: "The middle of the day, about twelve o'clock.", evening: "The end of the day, before night." }),
  ],
  mini: [
    mc("When is your shadow longest?", "Early morning", ["Midday", "Noon"], { hint: "The Sun is low.", why: "A low Sun makes long shadows." }),
    tf("Shadows are the same length all day.", false, { hint: "Think of the tree.", why: "Shadows change length through the day." }),
    mc("Where is the Sun at midday?", "High in the sky", ["Low in the sky", "Behind the Moon"], { hint: "Think of the shortest shadow.", why: "At midday the Sun is high." }),
  ],
};

const useIt = {
  id: "useit", kind: "use", title: "Light and safety",
  blocks: [
    H("Stop 1: Seeing and being seen"),
    SAY("Light keeps us safe. At night, people wear bright or shiny clothes so drivers can see them. Cyclists use lights on their bikes. Street lamps help us see the road. Reflective strips bounce a car's light back so a person shows up in the dark. Look at things that help us be seen.", T("**Reflective** materials bounce light back, so we can be seen in the dark.")),
    SAY("Here are three helpers: a bike light, a bright jacket and a street lamp.", IMG("🚲 🦺 💡", "A bike light, a bright jacket and a street lamp help us be seen.")),
    CHK(mc("Why do cyclists wear reflective strips at night?", "So drivers can see them", ["So they go faster", "So they feel warm"], { hint: "Light bounces back.", why: "Reflective strips bounce car light back, so drivers can see the cyclist." })),
    H("Stop 2: Sun safety"),
    SAY("The Sun gives us light but its rays can harm our eyes and skin. Never look straight at the Sun. Wear sunglasses and a hat when it is bright, and stay in the shade at midday. Let's look at the shade made by a tree.", IMG("🌳 😎 🧢", "A tree gives shade. Sunglasses and a hat protect us from strong sun.")),
    SAY("Now try this on a sunny day with a grown-up. Find the shade and see how it feels.", ACT("Find the shade", ["A sunny day", "A grown-up"], ["Go outside on a sunny day.", "Find a shadow made by a building or tree. Is it cooler there?", "Draw where you would sit to stay safe from strong sun."])),
    CHK(tf("Sunglasses can help protect our eyes in bright sun.", true, { hint: "Think about squinting.", why: "Sunglasses make strong light safer for our eyes." })),
    SAY("Remember. Reflective things help us be seen. Stay safe from the Sun.", SUM("Reflective strips and lights help us be seen in the dark", "Never look straight at the Sun")),
    GLOSS({ reflective: "Able to bounce light back.", shade: "A cool place out of the Sun.", rays: "Beams of light from the Sun." }),
  ],
  mini: [
    mc("What is shade?", "A place out of the sun", ["A kind of food", "A light source"], { hint: "Cool and dark under a tree.", why: "Shade is a place where the sun is blocked." }),
    tf("A street lamp is a light source.", true, { hint: "It makes light.", why: "A street lamp makes its own light." }),
    ms("Pick two things that help us be seen at night.", ["Bike light", "Reflective jacket"], ["A black coat", "A dark hat"], { hint: "Think of bright and shiny.", why: "Lights and reflective clothes help people see us." }),
  ],
};

const ALTS = [
  [mc("Which one of these is a source of light?", "A lamp", ["A rock", "A pillow"], { hint: "It makes its own light.", why: "A lamp makes its own light." }), mc("Which one gives out its own light?", "A candle flame", ["A cup", "A mirror"], { hint: "It makes light and heat.", why: "A candle flame makes light." })],
  [tf("The Moon makes its own light.", false, { hint: "What lights up the Moon?", why: "The Moon reflects the Sun's light." }), tf("The Sun is a light source.", true, { hint: "It makes light.", why: "The Sun makes its own light." })],
  [mat("Pair each thing with what it does.", [["Lamp", "Makes light"], ["Moon", "Reflects light"], ["Eyes", "See light"]], { hint: "Think about each one.", why: "A lamp makes light, the Moon reflects it and eyes see it." }), mat("Link each to its job with light.", [["Sun", "Makes light"], ["Mirror", "Bounces light"], ["Eye", "Takes in light"]], { hint: "Think about each one.", why: "The Sun makes light, a mirror bounces it and an eye takes it in." })],
  [ms("Pick two light sources.", ["Torch", "Candle"], ["Book", "Stone"], { hint: "They make their own light.", why: "A torch and a candle make light." }), ms("Pick two things that make shadows.", ["A tree", "A box"], ["A clear window", "Thin air"], { hint: "They block light.", why: "Trees and boxes block light." })],
  [hot("Tap the light source.", [["💡", "Lamp", 22, 50], ["📕", "Book", 50, 50], ["🪨", "Rock", 78, 50]], ["Lamp"], { labels: true, hint: "It makes light.", why: "A lamp makes light." }), hot("Tap the thing that makes light.", [["🔦", "Torch", 22, 50], ["🧸", "Toy", 50, 50], ["🪑", "Chair", 78, 50]], ["Torch"], { labels: true, hint: "It makes its own light.", why: "A torch makes light." })],
  [st("What do we call a dark shape made when light is blocked?", ["shadow", "a shadow"], { hint: "It starts with sh.", why: "A shadow forms when light is blocked." }), st("What do we call something that makes its own light? Write two words.", ["light source", "a light source"], { hint: "The Sun is one.", why: "A light source makes its own light." })],
  [mc("A girl holds a toy close to a torch. What happens to the shadow?", "It gets bigger", ["It gets smaller", "It goes away"], { hint: "Closer is bigger.", why: "A shadow grows as the object nears the light." }), mc("A boy moves his hand far from the torch. What happens to the shadow?", "It gets smaller", ["It gets bigger", "It turns blue"], { hint: "Further is smaller.", why: "A shadow shrinks as the object moves away from the light." })],
  [fill("Finish the sentences about shadows.", "A shadow is made when {b1} the light. It has the same {b2} as the object.", [["something blocks", "something makes", "something eats"], ["shape", "taste", "sound"]], { hint: "Think about a hand shadow.", why: "A shadow forms when light is blocked, and it has the object's shape." }), fill("Finish the sentences about seeing.", "We see when {b1} bounces into our {b2}.", [["light", "sound", "wind"], ["eyes", "ears", "feet"]], { hint: "Think about Ibn al-Haytham.", why: "We see when light bounces into our eyes." })],
  [num("The Sun, a torch and a lamp are light sources. How many light sources is that?", 3, { hint: "Count them.", why: "There are three light sources." }), num("Morning, midday and evening: how many times of day is that?", 3, { hint: "Count them.", why: "There are three." })],
  [sld("Slide to show when your shadow is shortest, as an hour from 6 am to 6 pm (24 hour clock 6 to 18).", { min: 6, max: 18, unit: "h" }, 12, 1, { hint: "The Sun is highest.", why: "Shadows are shortest around midday, 12 o'clock." }), sld("Slide to show a time when the Sun is high (hour 6 to 18).", { min: 6, max: 18, unit: "h" }, 12, 2, { hint: "Around the middle of the day.", why: "The Sun is highest around midday." })],
  [ord("Put these in order, from the longest shadow to the shortest, through the morning.", ["Early morning", "Mid morning", "Midday"], { hint: "The Sun gets higher.", why: "As the Sun rises, the shadow gets shorter." }), ord("Put the times of day in order.", ["Morning", "Midday", "Evening"], { hint: "Start with sunrise.", why: "The day goes from morning to midday to evening." })],
  [mc("Ali says we can see in the dark because our eyes make light. Why is he wrong?", "Eyes do not make light; they need light to bounce in", ["Eyes are light sources", "Eyes only work at night"], { hint: "Think about Ibn al-Haytham.", why: "We see when light bounces into our eyes." }), mc("Sara says the Moon is a light source. Why is she wrong?", "It only reflects the Sun's light", ["It is made of glass", "It is too small"], { hint: "What lights the Moon?", why: "The Moon reflects the Sun's light." })],
  [mc("Why is your shadow short at midday?", "The Sun is high in the sky", ["The Sun is far away", "You are taller"], { hint: "Where is the Sun at midday?", why: "A high Sun makes short shadows." }), mc("Why is your shadow long in the morning?", "The Sun is low in the sky", ["The Sun is high", "The Sun is hot"], { hint: "Where is the Sun in the morning?", why: "A low Sun makes long shadows." })],
  [mc("Hana says glass makes the darkest shadow. Why is she wrong?", "Clear glass lets light through, so the shadow is faint", ["Glass is opaque", "Glass is made of wood"], { hint: "Can you see through glass?", why: "Transparent glass lets light through, so its shadow is faint." }), mc("Noor says a clear window blocks all light. Why is she wrong?", "A clear window lets most light through", ["A window is opaque", "A window makes light"], { hint: "Can you see through it?", why: "A clear window is transparent." })],
  [mc("Why do cyclists wear reflective strips?", "They bounce light back so drivers can see them", ["They keep the wind out", "They make the bike faster"], { hint: "Think about headlights.", why: "Reflective strips bounce car light back." }), mc("Why do bikes have lights at night?", "So people can see the bike", ["So the bike is warmer", "So the bike is quieter"], { hint: "Lights help us be seen.", why: "Bike lights help others see the cyclist." })],
];

export const topics = [
  topicLesson({
    slug: "science-class-1-light-shadows", subject: "science", cls: 1, topic: 6, title: "Light and Shadows",
    summary: "Light sources, how we see, shadows and how they change, and staying safe with light and sun.",
    unit: "Topic 6: Light and shadows", difficulty: 1,
    objectives: ["Say what a light source is", "Explain how we see, with Ibn al-Haytham", "Make and describe shadows", "Say how shadows change through the day"],
    success_criteria: ["I can name light sources", "I can say how we see things", "I can say what makes a shadow", "I can say when shadows are long and short"],
    real_life: "Shadow puppets, walking in the sun, and being seen on a bike at night.",
    standards: [NC("Y3 light (stretch)", "Recognise that we need light to see things and that dark is the absence of light; notice that light is reflected from surfaces; recognise that shadows are formed when light is blocked"), ...CAM("2Ps.01", "2Ps.02", "2ESs.01")],
    warm_up: [
      mc("Which season comes after summer?", "Autumn", ["Spring", "Winter"], { hint: "Leaves fall.", why: "Autumn comes after summer." }),
      mc("What does a thermometer measure?", "How hot or cold it is", ["How wet it is", "How loud it is"], { hint: "It shows a number in degrees.", why: "A thermometer measures temperature." }),
      mc("Which material can you see through?", "Glass", ["Wood", "Metal"], { hint: "Think of a window.", why: "Glass is transparent." }),
    ],
    intro: [
      H("Welcome back, young scientist!"),
      SAY("Welcome back, young scientist! Today's big question is: how do we see, and what is a shadow? By the end, you will tell light sources from other things, explain how light helps us see, and make shadows grow and shrink. Let's go!", T("Today's big question: how do we see?", "We will meet a famous Muslim scientist and play with shadows.")),
      IMG("🔦🌙☀️", "Light comes from the Sun, torches and lamps."),
      GLOSS({ light: "What lets us see things." }),
    ],
    subs: [sources, shadows, sunshadow, useIt],
    quiz: [
      Q("sources", "recall", "light.sources", mc("Which one of these gives out its own light?", "A candle", ["A pillow", "A book"], { hint: "It has a flame.", why: "A candle makes its own light." }), ...ALTS[0]),
      Q("sources", "recall", "light.facts", tf("The Moon is a light source.", false, { hint: "What lights the Moon?", why: "The Moon reflects the Sun's light." }), ...ALTS[1]),
      Q("sources", "apply", "light.match", mat("Which job does each thing do with light? Match them.", [["Candle", "Makes light"], ["Moon", "Reflects light"], ["Eye", "Takes in light"]], { hint: "Think about each one.", why: "A candle makes light, the Moon reflects it and an eye takes it in." }), ...ALTS[2]),
      Q("shadows", "apply", "light.shadow_makers", ms("Pick two things that make a dark shadow.", ["A wooden chair", "A person"], ["A clear glass", "Thin air"], { hint: "They block light.", why: "Chairs and people block light." }), ...ALTS[3]),
      Q("sources", "recall", "light.label", hot("Tap the thing that gives out light.", [["🔦", "Torch", 22, 50], ["🧸", "Teddy", 50, 50], ["🪨", "Stone", 78, 50]], ["Torch"], { labels: true, hint: "It makes light.", why: "A torch makes light." }), ...ALTS[4]),
      Q("shadows", "recall", "light.words", st("What is the word for a dark shape made when light is blocked?", ["shadow", "a shadow"], { hint: "It starts with sh.", why: "A shadow forms when light is blocked." }), ...ALTS[5]),
      Q("shadows", "apply", "light.size", mc("A child moves a toy nearer to a torch. What happens to its shadow on the wall?", "It gets bigger", ["It gets smaller", "It disappears"], { hint: "Closer is bigger.", why: "A shadow grows as the object nears the light." }), ...ALTS[6]),
      Q("sources", "apply", "light.fill", fill("Complete the sentences.", "We see when {b1} bounces off things into our {b2}.", [["light", "sound", "heat"], ["eyes", "ears", "hands"]], { hint: "Think about Ibn al-Haytham.", why: "We see when light bounces into our eyes." }), ...ALTS[7]),
      Q("sunshadow", "recall", "light.count", num("The Sun, a torch, a candle and a lamp are light sources. How many is that?", 4, { hint: "Count them.", why: "There are four light sources." }), ...ALTS[8]),
      Q("sunshadow", "apply", "light.time", sld("At what time of day is your shadow shortest? Slide to the hour (6 am to 6 pm).", { min: 6, max: 18, unit: "h" }, 12, 1, { hint: "The Sun is highest.", why: "Shadows are shortest around midday." }), ...ALTS[9]),
      Q("sunshadow", "apply", "light.order", ord("Put these times of day in order.", ["Morning", "Midday", "Evening"], { hint: "Start with sunrise.", why: "The day goes from morning to midday to evening." }), ...ALTS[10]),
      Q("sources", "reason", "light.see", mc("Tia says we can see in the dark because our eyes make light. Why is she wrong?", "Eyes do not make light; they need light to bounce in", ["Eyes are light sources", "Eyes only work at night"], { hint: "Think about Ibn al-Haytham.", why: "We see when light bounces into our eyes." }), ...ALTS[11]),
      Q("sunshadow", "reason", "light.long", mc("Why is your shadow long in the early morning?", "The Sun is low in the sky", ["The Sun is high", "You grow in the morning"], { hint: "Where is the Sun in the morning?", why: "A low Sun makes long shadows." }), ...ALTS[12]),
      Q("shadows", "reason", "light.transparent", mc("Omar says a clear glass makes the darkest shadow. Why is he wrong?", "Clear glass lets light through, so the shadow is faint", ["Glass is opaque", "Glass is made of wood"], { hint: "Can you see through glass?", why: "Transparent glass lets light through, so its shadow is faint." }), ...ALTS[13]),
      Q("useit", "reason", "light.safety", mc("Why is a reflective jacket a good idea for a cyclist at night?", "They bounce light back so drivers can see them", ["They keep the rain out", "They make people run faster"], { hint: "Think about headlights.", why: "Reflective jackets bounce light back." }), ...ALTS[14]),
    ],
  }),
];
