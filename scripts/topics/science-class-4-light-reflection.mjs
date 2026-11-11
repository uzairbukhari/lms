import { SAY, SS, H, T, IMG, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, PHOTO, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC, CAM } from "./_science-kit.mjs";

// Science Class 4, topic 7: Light, Reflection and Shadows (age 9-10). Enquiry types: observing over time, fair test.
const TREE = "science-class-4-light-reflection-1-b330144d.jpg";
const GLASS = "science-class-4-light-reflection-2-67503b5b.jpg";
const LAKE = "science-class-4-light-reflection-3-dce141da.jpg";

// ---------------------------------------------------------------------------------------------- 1. learn
const seeing = {
  id: "seeing", kind: "learn", title: "Light and seeing",
  blocks: [
    H("Welcome, young scientist!"),
    SAY("Welcome, young scientist! Today we find out how light helps us see, how it bounces, and how shadows form.", T("Today we explore **light**, reflection and shadows.")),
    SAY("A torch, a mirror and the Sun will help us.", IMG("☀️🔦🪞", "A light source, a torch and a mirror.")),
    H("Stop 1: Sources and reflectors"),
    SAY("A light source makes its own light. The Sun, a torch, a candle flame and a lamp are all light sources.", T("A **light source** makes its own light.", "The Sun, a torch and a candle are light sources.")),
    SAY("Most things are not light sources. We can see them because light bounces off them and into our eyes. The Moon is one of these.", T("To **reflect** is to bounce light off a surface.", "The Moon only reflects light from the Sun.")),
    EB("lab", "Source or reflector?",
      SS("The Sun makes its own light. It is a light source.", S("The Sun: a light source.", ["a", "☀️", 25, 40, 3, "pulse"], ["b", "🌍", 75, 60, 3, "none"])),
      SS("The Moon makes no light. It reflects light from the Sun, so we can see it at night.", S("The Moon reflects sunlight.", ["a", "☀️", 20, 30, 3, "none"], ["m", "🌙", 80, 55, 3, "pulse"]))),
    CHK(mc("Which of these is NOT a light source?", "The Moon", ["A candle flame", "A torch"], { hint: "Which one only bounces light?", why: "The Moon reflects the Sun's light. It does not make its own." })),
    H("Stop 2: Light travels in straight lines"),
    SAY("Light travels in straight lines. We see an object when light bounces off it and enters our eyes.", T("Light travels in **straight lines**.", "We see when light enters the eye.")),
    SAY("Look at this still lake. Light bounces off the mountains onto the water. The calm water then reflects the mountains back to your eyes, like a mirror.", PHOTO(LAKE, "Mountains reflected in a calm blue lake", "Still water reflects the mountains.", "Photo by Shai Pal on Unsplash")),
    CHK(tf("We see a book because light bounces off the book and enters our eyes.", true, { hint: "Light must reach the eyes.", why: "A book is not a light source. We see it because light reflects off it into our eyes." })),
    SAY("Remember. Light sources make light. Other things reflect it. We see when light enters our eyes.", SUM("A light source makes its own light", "Other things reflect light into our eyes", "Light travels in straight lines")),
    GLOSS({ light: "Energy that lets us see. It comes from a source.", "light source": "Something that makes its own light, like the Sun.", reflect: "To bounce light off a surface.", "straight lines": "Light does not bend. It goes directly from one place to another." }),
  ],
  mini: [
    mc("What do our eyes need to see an object?", "Light entering them", ["Heat from the object", "Sound from the object"], { hint: "Think about what reaches the eyes.", why: "We see when light enters our eyes." }),
    tf("A street lamp is a light source.", true, { hint: "Does it make light?", why: "A lit lamp makes its own light." }),
    mat("Match each item to the right group.", [["Sun", "Light source"], ["Mirror", "Reflector"], ["Candle", "Light source"]], { hint: "Which make light?", why: "The Sun and a candle make light. A mirror only reflects it." }),
    mc("Light travels in...", "straight lines", ["zigzags", "circles"], { hint: "Think of a torch beam.", why: "Light travels in straight lines." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const materials = {
  id: "materials", kind: "try", title: "Which materials let light through?",
  blocks: [
    H("Stop 1: Transparent, translucent and opaque"),
    SAY("Some materials let all light through. We can see clearly through them. These are transparent, like clear glass.", T("**Transparent** materials let all light through.")),
    SAY("Translucent materials let some light through, but we cannot see clearly through them. Look at this rough, frosted glass. Opaque materials, like wood, let no light through.", PHOTO(GLASS, "Rough frosted glass with a bumpy surface", "Frosted glass lets some light through.", "Photo by Zhiqiang Wang on Unsplash")),
    T("**Translucent** lets some light through. **Opaque** lets none through."),
    EB("lab", "Three kinds of material",
      SS("A torch shines on clear glass. All the light passes through, so the glass is transparent.", S("Transparent: all light passes.", ["t", "🔦", 15, 50, 3, "pulse"], ["g", "🪟", 50, 50, 3, "none"], ["w", "💡", 85, 50, 3, "pulse"])),
      SS("Frosted glass lets only some light through. It is translucent.", S("Translucent: some light passes.", ["t", "🔦", 15, 50, 3, "none"], ["g", "🧊", 50, 50, 3, "none"], ["w", "🌫️", 85, 50, 3, "none"])),
      SS("A wooden board stops all the light. It is opaque.", S("Opaque: no light passes.", ["t", "🔦", 15, 50, 3, "none"], ["g", "🚪", 50, 50, 3, "none"], ["w", "🌑", 85, 50, 3, "none"]))),
    CHK(mc("Frosted glass lets some light through but you cannot see clearly. It is...", "translucent", ["transparent", "opaque"], { hint: "Some light, but not clear.", why: "Translucent materials let some light through." })),
    H("Stop 2: A fair test"),
    SAY("To test materials fairly, use the same torch, the same distance and a dark room. Change only the material.", T("A **fair test** changes only one thing.", "Keep the torch, distance and room the same.")),
    MAN("Sort the materials", "Sort 8 materials into those that let light through and those that do not.", "🪟", 8, ["Lets light through", "Blocks light"]),
    ACT("Light test", ["A torch", "Materials such as paper, foil, clear plastic and card", "A dark room and a grown-up"], ["Shine the torch at each material in a dark room.", "Look at how much light passes through.", "Record: transparent, translucent or opaque.", "Test shiny foil and dull card too. Which reflects more light?"]),
    CHK(mc("In a fair test of materials, what changes?", "Only the material", ["The torch and the distance", "The room and the torch"], { hint: "One thing at a time.", why: "A fair test changes only the one thing being tested." })),
    SAY("Remember. Transparent, translucent and opaque describe how much light gets through. Shiny surfaces reflect more.", SUM("Transparent lets all light through", "Translucent lets some light through", "Opaque lets no light through")),
    GLOSS({ transparent: "Lets all light through so you can see clearly.", translucent: "Lets some light through but not clearly.", opaque: "Lets no light through.", "fair test": "A test where only one thing changes." }),
  ],
  mini: [
    tf("Clear glass is opaque.", false, { hint: "Can you see through it?", why: "Clear glass is transparent." }),
    mc("Which material is opaque?", "A wooden door", ["A clear window", "A plastic bottle of water"], { hint: "No light passes.", why: "Wood lets no light through." }),
    mc("Why do we test in a dark room?", "So we can see how much light passes through", ["So the torch is heavier", "So the material is warmer"], { hint: "Think about seeing the light.", why: "A dark room makes it easier to see light passing through." }),
    ord("Put the steps in order.", ["Pick a material", "Shine the torch at it", "Observe the light", "Record the result"], { hint: "Set up first.", why: "You choose, test, observe and then record." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const shadows = {
  id: "shadows", kind: "play", title: "Shadow lab",
  blocks: [
    H("Stop 1: How shadows form"),
    SAY("A shadow forms when an opaque object blocks light. The shadow is dark, and it has the same outline as the object.", T("A **shadow** forms when an object blocks light.", "The shadow has the same shape as the object.")),
    SAY("See the dark branch shapes on the grass. Sunlight cannot pass through the opaque branches, so they leave shadows.", PHOTO(TREE, "Shadows of tree branches on green grass", "Branches block sunlight and make shadows.", "Photo by Marija Zaric on Unsplash")),
    CHK(mc("What must an object do to make a shadow?", "Block the light", ["Make light", "Reflect all colours"], { hint: "Think about what shadows are.", why: "A shadow forms where an object blocks light." })),
    H("Stop 2: Changing the size"),
    SAY("Move the object closer to the torch and the shadow gets bigger. Move it away and the shadow gets smaller.", T("Closer to the light means a **bigger** shadow.", "Further away means a **smaller** shadow.")),
    EB("lab", "Shadow size",
      SS("The toy is close to the torch. Its shadow on the wall is big.", S("Close: big shadow.", ["t", "🔦", 12, 50, 3, "pulse"], ["o", "🧸", 38, 50, 3, "none"], ["s", "⬛", 80, 50, 3, "none"])),
      SS("Now the toy is far from the torch. Its shadow is smaller.", S("Far: small shadow.", ["t", "🔦", 12, 50, 3, "none"], ["o", "🧸", 65, 50, 3, "none"], ["s", "⬛", 88, 50, 2, "none"]))),
    SAY("Flip the cards and find the matching pairs. A little brain break!", BRAIN("memory_match", "Light match", "Find the matching pairs.", ["☀️", "🔦", "🕯️", "💡", "🌙", "🪞"])),
    CHK(mc("The torch moves further from the toy. What happens to the shadow?", "It gets smaller", ["It gets bigger", "It turns blue"], { hint: "Further away.", why: "The further the light, the smaller the shadow." })),
    SAY("Remember. Shadows form where light is blocked. Their size depends on the distance from the light.", SUM("Opaque objects make shadows", "A shadow has the shape of the object", "Closer to the light means a bigger shadow")),
    GLOSS({ shadow: "A dark shape made when an object blocks light.", bigger: "Larger in size.", smaller: "Not as large in size.", outline: "The shape around the edge of something." }),
  ],
  mini: [
    tf("A shadow shows the colours of an object.", false, { hint: "It is dark.", why: "A shadow is a dark shape." }),
    mc("A sundial uses a shadow to show...", "the time", ["the weather", "the wind"], { hint: "The Sun moves.", why: "The Sun's moving shadow shows the time." }),
    mc("Which can make a clear shadow?", "A cardboard shape", ["Clear plastic", "Clean glass"], { hint: "Opaque.", why: "Opaque objects make clear shadows." }),
    num("A shadow is 12 cm long. The torch moves closer and the shadow doubles. How long is it now?", 24, { hint: "Double 12.", why: "12 x 2 = 24 cm." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const safety = {
  id: "safety", kind: "use", title: "Staying safe in the Sun",
  blocks: [
    H("Stop 1: Protect your eyes and skin"),
    SAY("The Sun is very bright. Never look straight at it, even for a moment. It can damage your eyes for ever.", T("Never look straight at the **Sun**.", "Sunglasses with UV protection help in bright light.")),
    SAY("Sun safety needs a hat, shade and sunglasses.", IMG("😎🧢☀️", "Sunglasses and a hat for Sun safety.")),
    SAY("Sunglasses cut down glare, but they are not safe for looking at the Sun. UV light passes through thin cloud too, so cover up on cloudy days. Every skin tone needs sun protection.", ACT("Sun safety plan", ["Paper and pencil"], ["List three ways to stay safe in strong sunshine.", "Pick the shadiest spot in your school playground.", "Tell a friend one thing you learned."])),
    CHK(mc("Why must you never look straight at the Sun?", "Its light can damage your eyes", ["It makes your eyes cold", "It makes shadows blue"], { hint: "Think about safety.", why: "The Sun is so bright it can damage the eyes." })),
    H("Stop 2: Being seen in the dark"),
    SAY("Reflective strips on jackets and bikes bounce light from car headlights back to the driver. That helps drivers see people at night.", T("**Reflective** strips bounce light back.", "Bike lights make their own light.")),
    EB("town", "Seen at night",
      SS("A car's headlights shine on a cycling jacket. The strips reflect the light back.", S("Reflective strips glow.", ["c", "🚗", 15, 55, 3, "pulse"], ["j", "🚴", 70, 50, 3, "pulse"])),
      SS("Without reflective strips, the cyclist is hard to see in the dark.", S("Dark clothes are hard to see.", ["c", "🚗", 15, 55, 3, "none"], ["j", "🌑", 70, 50, 3, "none"]))),
    CHK(tf("Reflective strips make their own light.", false, { hint: "They bounce light.", why: "Reflective strips only reflect light from other sources." })),
    SAY("Remember. Protect your eyes and skin from the Sun. Wear reflective clothing to be seen at night.", SUM("Never look at the Sun", "Protect your skin on bright days", "Wear reflective strips at night")),
    GLOSS({ Sun: "The star that gives us light and heat.", reflective: "Bouncing light back to where it came from.", UV: "Ultraviolet light from the Sun that can harm skin and eyes.", glare: "Very bright light that is hard to look at." }),
  ],
  mini: [
    mc("Which keeps you safer in strong Sun?", "A sun hat and shade", ["Staring at the Sun", "Wearing nothing"], { hint: "Think about protection.", why: "Hats and shade protect skin and eyes." }),
    tf("UV light can reach you on a cloudy day.", true, { hint: "Clouds are thin.", why: "UV passes through thin cloud." }),
    mc("Why do bikes have reflectors?", "To bounce light back to drivers", ["To make their own light", "To make the bike lighter"], { hint: "Headlights.", why: "Reflectors bounce headlight beams back." }),
    mc("Lights left on at night all over a city can cause...", "light pollution", ["more shadows at noon", "colder weather"], { hint: "Too much light.", why: "Too much artificial light is light pollution." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "A night walk with a torch", backdrop: "town", caption: "A torch shows how light reflects and shadows change.",
  scenes: [
    { caption: "A night walk.", say: "Fatima and her dad go for a walk at night. Fatima has a torch.",
      items: [{ id: "f", emoji: "👧", label: "Fatima", x: 25, y: 56, size: 3, enter: "walk_right" }, { id: "t", emoji: "🔦", x: 70, y: 40, size: 3, enter: "pop" }] },
    { caption: "A light source.", say: "The torch makes its own light. It is a light source.",
      items: [{ id: "t", emoji: "🔦", label: "light source", x: 30, y: 46, size: 3, effect: "glow" }, { id: "b", emoji: "💡", x: 72, y: 46, size: 3, effect: "sparkle" }] },
    { caption: "Cat's eyes shine.", say: "Two eyes shine in the bushes. A cat! Its eyes reflect the torch light.",
      items: [{ id: "c", emoji: "🐈", label: "cat", x: 70, y: 52, size: 3, enter: "pop" }, { id: "e", emoji: "✨", label: "reflects light", x: 70, y: 28, size: 2, effect: "sparkle" }] },
    { caption: "A big shadow.", say: "Fatima holds a toy near the torch. Its shadow on the wall is big.",
      items: [{ id: "o", emoji: "🧸", x: 38, y: 50, size: 3 }, { id: "s", emoji: "⬛", label: "big shadow", x: 80, y: 50, size: 3, enter: "grow" }] },
    { caption: "A small shadow.", say: "She moves the toy away from the torch. The shadow gets smaller.",
      items: [{ id: "o", emoji: "🧸", x: 62, y: 50, size: 3 }, { id: "s", emoji: "⬛", label: "small shadow", x: 88, y: 50, size: 2, enter: "grow" }] },
    { caption: "A glowing jacket.", say: "A cyclist rides by. The reflective strips on his jacket glow in the headlights.",
      items: [{ id: "c", emoji: "🚗", x: 15, y: 56, size: 3, effect: "glow" }, { id: "j", emoji: "🚴", label: "reflective strips", x: 72, y: 50, size: 3, effect: "sparkle" }] },
    { caption: "Home safely.", say: "Light helps us see and stay safe. We reflect it, block it, and use it wisely.",
      items: [{ id: "f", emoji: "👧", x: 30, y: 56, size: 3, anim: "bounce" }, { id: "m", emoji: "🌙", x: 70, y: 30, size: 3, effect: "hearts" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- learn (q1-q8)
  Q("seeing", "recall", "light.sources", tf("The Moon is a light source.", false, { hint: "Does it make light?", why: "The Moon reflects light from the Sun. It does not make light." }),
    tf("A candle flame is a light source.", true, { hint: "Does it make light?", why: "A flame makes its own light." })),
  Q("seeing", "recall", "light.source_id", mc("Which of these is a light source?", "A burning candle", ["A mirror", "The Moon"], { hint: "Which one makes light?", why: "A burning candle makes its own light." }),
    mc("Which of these makes its own light?", "A lit torch", ["A white wall", "A book"], { hint: "Which one makes light?", why: "A lit torch is a light source." })),
  Q("seeing", "reason", "light.dark", mc("Sam says we can see in a completely dark room if we wait long enough. Is he right?", "No. With no light at all, no light enters the eyes, so we cannot see", ["Yes, our eyes make their own light", "Yes, eyes work better in the dark"], { hint: "What must enter the eye?", why: "We need light to enter our eyes. In total darkness there is none." }),
    mc("Mina says cats can see in total darkness. Is she right?", "No. Cats see in very dim light, but with no light at all they cannot see either", ["Yes, cats make their own light", "Yes, cats need no light"], { hint: "What must enter the eye?", why: "Every animal needs some light to see. Cats just use very little." })),
  Q("seeing", "apply", "light.seeing", fill("Complete the sentence about seeing.", "We see an object when light {b1} into our {b2}.", [["enters", "leaves", "stops"], ["eyes", "hands", "ears"]], { hint: "Light must reach the eyes.", why: "We see when light enters our eyes." }),
    fill("Complete the sentence about light.", "A {b1} makes its own light. A mirror only {b2} light.", [["light source", "reflector", "shadow"], ["reflects", "makes", "absorbs"]], { hint: "Source or reflector?", why: "A light source makes light. A mirror reflects it." })),
  Q("seeing", "apply", "light.hotspot", hot("Tap the light source.", [["☀️", "The Sun", 22, 50], ["🌙", "The Moon", 50, 50], ["🪞", "A mirror", 78, 50]], ["The Sun"], { labels: true, hint: "Which one makes its own light?", why: "The Sun makes light. The Moon and a mirror reflect it." }),
    hot("Tap the object that makes its own light.", [["🔦", "A torch", 22, 50], ["📖", "A book", 50, 50], ["🪨", "A rock", 78, 50]], ["A torch"], { labels: true, hint: "Which one has a bulb?", why: "A torch makes its own light." })),
  Q("seeing", "apply", "light.rays", num("A lamp sends one straight ray to each of 4 toys. How many rays are there?", 4, { hint: "One for each toy.", why: "1 ray x 4 toys = 4 rays." }),
    num("A lamp sends one straight ray to each of 6 toys. How many rays are there?", 6, { hint: "One for each toy.", why: "1 ray x 6 toys = 6 rays." })),
  Q("seeing", "apply", "light.natural", ms("Which two light sources are natural? Pick two.", ["The Sun", "Lightning"], ["The Moon", "A mirror"], { hint: "Not made by people.", why: "The Sun and lightning are natural light sources." }),
    ms("Which two light sources are made by people? Pick two.", ["A torch", "A street lamp"], ["The Sun", "Lightning"], { hint: "Made by people.", why: "A torch and a street lamp are made by people." })),
  Q("seeing", "reason", "light.moon", mc("Zainab says the Moon makes its own light because it glows at night. Is she right?", "No. The Moon reflects light from the Sun", ["Yes, the Moon is a star", "Yes, it glows by itself"], { hint: "What lights the Moon?", why: "The Moon only reflects sunlight." }),
    mc("Hamza says the planet Venus shines because it makes its own light. Is he right?", "No. Venus reflects light from the Sun", ["Yes, Venus is a star", "Yes, it glows by itself"], { hint: "What lights the planets?", why: "Planets reflect sunlight. They do not make light." })),

  // ----- try (q9-q16)
  Q("materials", "apply", "light.classify", mat("Match each material to how it lets light through.", [["Clear glass", "Transparent"], ["Frosted glass", "Translucent"], ["Wood", "Opaque"]], { hint: "Clear, cloudy or blocked?", why: "Clear glass is transparent, frosted glass translucent and wood opaque." }),
    mat("Link each material to how it lets light through.", [["Window pane", "Transparent"], ["Tracing paper", "Translucent"], ["Metal tray", "Opaque"]], { hint: "Clear, cloudy or blocked?", why: "A pane is transparent, tracing paper translucent and a metal tray opaque." })),
  Q("materials", "reason", "light.translucent", mc("Aisha says translucent and transparent mean the same, because both let light through. Is she right?", "No. Transparent lets you see clearly. Translucent lets some light through but you cannot see clearly", ["Yes, they are exactly the same", "No, translucent materials let no light through"], { hint: "Can you see clearly?", why: "Transparent materials let you see clearly. Translucent ones do not." }),
    mc("Ben says frosted glass is transparent because light gets through it. Is he right?", "No. Frosted glass is translucent, because you cannot see clearly through it", ["Yes, light gets through, so it is transparent", "No, frosted glass is opaque"], { hint: "Can you see clearly?", why: "Frosted glass lets some light through but not a clear view, so it is translucent." })),
  Q("materials", "apply", "light.count_opaque", sld("Ten materials were tested. Six let some or all light through. Slide to show how many were opaque.", { min: 0, max: 10, unit: "materials" }, 4, 0, { hint: "10 minus 6.", why: "Opaque materials let no light through, so 10 - 6 = 4." }),
    sld("Ten materials were tested. Three let light through. Slide to show how many were opaque.", { min: 0, max: 10, unit: "materials" }, 7, 0, { hint: "10 minus 3.", why: "10 - 3 = 7 were opaque." })),
  Q("materials", "reason", "light.reflect", mc("Layla says only mirrors reflect light. Is she right?", "No. Most objects reflect some light, which is how we see them", ["Yes, only mirrors reflect", "Yes, only shiny metals reflect"], { hint: "How do we see a book?", why: "We see objects because they reflect light into our eyes." }),
    mc("Ben says dull things reflect no light at all. Is he right?", "No. Dull things reflect light too, but scatter it in all directions", ["Yes, only shiny things reflect", "Yes, dull things absorb all light"], { hint: "How do we see a dull cloth?", why: "We see dull objects because they reflect some light." })),
  Q("materials", "apply", "light.test_order", ord("Put the steps of the light test in order.", ["Choose a material", "Shine a torch at it in a dark room", "Check how much light passes through", "Record the result in a table"], { hint: "Set up, test, observe, record.", why: "Choose, test, observe, then record." }),
    ord("Put the steps of a reflection test in order.", ["Shine the torch at the material", "Look at the bright spot on the wall", "Compare shiny and dull materials", "Record the results"], { hint: "Test, observe, compare, record.", why: "Test, observe, compare, then record." })),
  Q("materials", "apply", "light.table", num("A table shows 3 transparent, 2 translucent and 5 opaque materials. How many materials were tested?", 10, { hint: "Add them up.", why: "3 + 2 + 5 = 10." }),
    num("A table shows 4 transparent, 3 translucent and 6 opaque materials. How many materials were tested?", 13, { hint: "Add them up.", why: "4 + 3 + 6 = 13." })),
  Q("materials", "apply", "light.fill_types", fill("Finish the sentences about materials.", "A {b1} material lets all light through. An {b2} material lets none through.", [["transparent", "opaque", "translucent"], ["opaque", "transparent", "translucent"]], { hint: "All or none.", why: "Transparent lets all light through. Opaque lets none." }),
    fill("Complete the sentences about light and surfaces.", "A {b1} material lets only some light through. A shiny surface {b2} more light than a dull one.", [["translucent", "opaque", "transparent"], ["reflects", "absorbs", "makes"]], { hint: "Some light, and shiny surfaces.", why: "Translucent lets some through. Shiny surfaces reflect more." })),
  Q("materials", "recall", "light.shiny", tf("A shiny surface reflects more light than a dull one.", true, { hint: "Think of a mirror.", why: "Shiny surfaces reflect more light." }),
    tf("A dull black cloth reflects more light than a mirror.", false, { hint: "Think of a mirror.", why: "A mirror reflects far more light than a dull black cloth." })),

  // ----- play (q17-q23)
  Q("shadows", "apply", "light.shadow_big", hot("Tap the picture where the shadow will be biggest.", [["🔦", "Torch close to the toy", 22, 50], ["🔦", "Torch far from the toy", 50, 50], ["🔦", "Torch very far away", 78, 50]], ["Torch close to the toy"], { labels: true, hint: "Closer light, bigger shadow.", why: "The closer the torch, the bigger the shadow." }),
    hot("Tap the picture where the shadow will be smallest.", [["🔦", "Torch close to the toy", 22, 50], ["🔦", "Torch far from the toy", 50, 50], ["🔦", "Torch very close indeed", 78, 50]], ["Torch far from the toy"], { labels: true, hint: "Further light, smaller shadow.", why: "The further the torch, the smaller the shadow." })),
  Q("shadows", "reason", "light.shadow_detail", mc("Omar says a shadow shows the details of a face, like the eyes and nose. Is he right?", "No. A shadow is a dark shape that only shows the outline", ["Yes, shadows show every detail", "Yes, shadows show the colours too"], { hint: "Is a shadow dark all over?", why: "A shadow is a dark outline. It has no detail or colour." }),
    mc("Mina says the shadow of a red hat is red. Is she right?", "No. A shadow is dark, whatever colour the object is", ["Yes, shadows copy the colour", "Yes, shadows are always red"], { hint: "Is a shadow dark all over?", why: "A shadow is a dark shape with no colour." })),
  Q("shadows", "reason", "light.shadow_change", mc("Hamza says a shadow's size never changes. Is he right?", "No. Moving the object closer to the torch makes the shadow bigger", ["Yes, it always stays the same", "No, but only the colour changes"], { hint: "Try moving the toy.", why: "Shadow size changes with the distance from the light." }),
    mc("Ben says a shadow outside stays the same length all day. Is he right?", "No. The Sun moves across the sky, so the shadow changes length", ["Yes, it never changes", "No, it only changes at night"], { hint: "The Sun moves.", why: "As the Sun moves, shadows change length and direction." })),
  Q("shadows", "apply", "light.shadow_match", mat("Match each change to what happens to the shadow.", [["Object moves closer to the torch", "Shadow gets bigger"], ["Object moves away from the torch", "Shadow gets smaller"], ["An opaque object blocks the light", "A shadow forms"]], { hint: "Closer is bigger.", why: "Closer makes it bigger, further makes it smaller, and a blocked light forms a shadow." }),
    mat("Match each change to its effect on the shadow.", [["Torch moves closer to the object", "Shadow gets bigger"], ["Torch moves away from the object", "Shadow gets smaller"], ["Object is clear glass", "Hardly any shadow"]], { hint: "Closer is bigger.", why: "Closer light, bigger shadow. Clear glass hardly blocks light." })),
  Q("shadows", "apply", "light.distance_order", ord("Put these torch distances in order, giving the smallest shadow first.", ["100 cm away", "60 cm away", "30 cm away", "10 cm away"], { hint: "Further means smaller.", why: "The further the torch, the smaller the shadow." }),
    ord("Order these torch distances so the smallest shadow comes first.", ["80 cm away", "50 cm away", "25 cm away", "5 cm away"], { hint: "Further means smaller.", why: "The further the torch, the smaller the shadow." })),
  Q("shadows", "apply", "light.shadow_clock", sld("A shadow stick casts a 10 cm shadow at midday. In the afternoon it is twice as long. Slide to its length.", { min: 0, max: 40, unit: "cm" }, 20, 0, { hint: "Double 10.", why: "10 x 2 = 20 cm." }),
    sld("A shadow stick casts a 15 cm shadow at midday. In the afternoon it is twice as long. Slide to its length.", { min: 0, max: 40, unit: "cm" }, 30, 0, { hint: "Double 15.", why: "15 x 2 = 30 cm." })),
  Q("shadows", "apply", "light.make_shadow", ms("Which two things will make a clear shadow? Pick two.", ["A wooden board", "A metal tray"], ["Clear glass", "A clean plastic bag"], { hint: "Opaque things.", why: "Wood and metal are opaque, so they make clear shadows." }),
    ms("Which two things will make a clear shadow? Choose two.", ["A thick book", "A cardboard box"], ["A clear window", "Clear plastic wrap"], { hint: "Opaque things.", why: "A book and a box are opaque, so they make clear shadows." })),

  // ----- use (q24-q30)
  Q("safety", "recall", "light.sun_eyes", mc("What is the main danger of looking straight at the Sun?", "Its bright light can damage your eyes", ["It makes your eyes cold", "It turns shadows blue"], { hint: "Think about safety.", why: "The Sun is so bright it can damage the eyes." }),
    mc("What should you do if the Sun is too bright?", "Look away and wear sunglasses and a hat", ["Look at it for a few seconds", "Close the curtains and stare"], { hint: "Protect your eyes.", why: "Look away and wear sunglasses and a hat. Never stare at the Sun." })),
  Q("safety", "apply", "light.strips", num("A cycling jacket has 4 reflective strips on each of its 2 sleeves. How many sleeve strips are there?", 8, { hint: "4 times 2.", why: "4 x 2 = 8 strips." }),
    num("A school bag has 5 reflective patches on each of its 2 straps. How many strap patches are there?", 10, { hint: "5 times 2.", why: "5 x 2 = 10 patches." })),
  Q("safety", "reason", "light.sunglasses", mc("Mira says wearing sunglasses makes it safe to stare at the Sun. Is she right?", "No. It is never safe to stare at the Sun, even with sunglasses", ["Yes, sunglasses block all the light", "Yes, dark glasses are enough"], { hint: "Is the Sun still too bright?", why: "Ordinary sunglasses do not make staring at the Sun safe." }),
    mc("Zain says very dark sunglasses are safe for staring at the Sun. Is he right?", "No. It is never safe, however dark the lenses are", ["Yes, if they are dark enough", "Yes, for a short time"], { hint: "Is the Sun still too bright?", why: "Never stare at the Sun, whatever you wear." })),
  Q("safety", "recall", "light.reflective", tf("Reflective strips on clothing help drivers see people at night.", true, { hint: "They bounce headlight beams.", why: "Reflective strips bounce car headlights back to the driver." }),
    tf("Dark clothes are the easiest for drivers to see at night.", false, { hint: "Which are easiest to see?", why: "Dark clothes are hard to see. Bright or reflective clothes help." })),
  Q("safety", "apply", "light.fill_safety", fill("Complete the sentence about bikes.", "A bike {b1} reflects light from car headlights so riders are {b2}.", [["reflector", "shadow", "window"], ["seen", "hidden", "heavy"]], { hint: "Think of bike safety.", why: "A reflector bounces headlight beams, so the rider is seen." }),
    fill("Complete the sentence about cities.", "Too many bright lights cause light {b1}, which makes it hard to see {b2}.", [["pollution", "reflection", "shadows"], ["stars", "wood", "books"]], { hint: "Think about the night sky.", why: "Light pollution hides the stars from view." })),
  Q("safety", "reason", "light.skin", mc("Ali says only people with fair skin need sun protection. Is he right?", "No. Everyone's skin can be damaged by the Sun, whatever skin tone", ["Yes, darker skin never burns", "Yes, only fair skin has UV damage"], { hint: "Does UV care about skin tone?", why: "UV light can harm any skin, so everyone needs protection." }),
    mc("Hana says darker skin never needs hats or shade. Is she right?", "No. All skin tones need protection from strong sunshine", ["Yes, darker skin is fully safe", "Yes, only children need protection"], { hint: "Does UV care about skin tone?", why: "Everyone needs shade, hats and sunscreen in strong sun." })),
  Q("safety", "apply", "light.safe_two", ms("Which two keep you safe in strong sunshine? Pick two.", ["A sun hat", "Shade at midday"], ["Looking at the Sun", "Sunbathing at midday"], { hint: "Protect eyes and skin.", why: "A hat and shade protect you. Looking at the Sun is dangerous." }),
    ms("Which two keep you safe in strong sunshine? Choose two.", ["Sunscreen", "Sunglasses with UV protection"], ["Looking at the Sun", "Standing in full Sun all day"], { hint: "Protect eyes and skin.", why: "Sunscreen and UV sunglasses protect you." })),
];

export const topics = [
  topicLesson({
    slug: "science-class-4-light-reflection", subject: "science", cls: 4, topic: 7, title: "Light, Reflection and Shadows",
    summary: "How light lets us see, how it bounces off surfaces, and how shadows form and change.",
    unit: "Topic 7: Light, reflection and shadows", difficulty: 2,
    objectives: ["Explain that we see because light enters the eye", "Compare transparent, translucent and opaque materials", "Investigate shadow size and reflection"],
    success_criteria: ["I can say why we need light to see", "I can sort materials by how much light they let through", "I can explain what changes a shadow's size"],
    real_life: "Staying safe in the Sun, being seen on a bike at night and understanding why shadows change.",
    standards: [NC("Y4 light", "Recognise that we need light to see things and that light is reflected from surfaces; recognise that shadows are formed when light is blocked by an opaque object"), ...CAM("4Pl.01", "4Pl.02")],
    warm_up: [
      mc("What do we need to see things?", "Light", ["Sound", "Heat"], { hint: "Think about the dark.", why: "We need light to see." }),
      tf("A torch makes its own light.", true, { hint: "It has a bulb.", why: "A torch is a light source." }),
      mc("Which is a form of energy?", "Light", ["Rock", "Plastic"], { hint: "Think about what energy can do.", why: "Light is a form of energy." }),
    ],
    intro: [],
    subs: [seeing, materials, shadows, safety],
    clip,
    quiz,
  }),
];
