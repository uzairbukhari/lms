import { SAY, SS, H, T, IMG, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld, st } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC, PK, CAM } from "./_science-kit.mjs";

// Science Class 1, topic 4: Materials (Zainab, age 7). Enquiry type: comparative test.

const names = {
  id: "names", kind: "learn", title: "Materials and their properties",
  blocks: [
    H("Stop 1: What is it made of?"),
    SAY("Everything around us is made of something. A spoon might be made of metal. A cup might be made of glass or plastic. A chair might be made of wood. The stuff something is made from is called a material. Look at five materials and the things we make with them.", T("A **material** is what something is made from.", "Wood, metal, plastic, glass and **fabric** are all materials.")),
    EB("kitchen", "Five materials",
      SS("Wood comes from trees. We make tables, pencils and doors from wood.", S("Wood: a table and a pencil.", ["a", "🪑", 30, 62, 3, "none"], ["b", "✏️", 70, 62, 2, "bounce"])),
      SS("Metal is hard and shiny. Spoons, keys and cooking pots are made of metal.", S("Metal: a spoon and a key.", ["a", "🥄", 30, 62, 3, "none"], ["b", "🔑", 70, 62, 2, "bounce"])),
      SS("Plastic can be made into any shape. Toys and bottles are often plastic.", S("Plastic: a bottle and a toy.", ["a", "🧴", 30, 62, 3, "none"], ["b", "🧸", 70, 62, 2, "bounce"])),
      SS("Glass is see-through and breaks easily. Windows and glasses are made of glass.", S("Glass: a window and a glass.", ["a", "🪟", 30, 58, 3, "none"], ["b", "🥛", 70, 62, 2, "bounce"])),
      SS("Fabric is soft and bendy. Clothes and curtains are made of fabric.", S("Fabric: a shirt and socks.", ["a", "👕", 30, 58, 3, "none"], ["b", "🧦", 70, 62, 2, "bounce"]))),
    CHK(mc("Which material is a spoon usually made of?", "Metal", ["Glass", "Fabric"], { hint: "It is hard and shiny.", why: "Spoons are usually made of metal." })),
    H("Stop 2: Describing materials"),
    SAY("We can describe a material by its properties. A property tells us what a material is like. Is it hard or soft? Is it rough or smooth? Is it see-through, which we call transparent? Or can you not see through it, which is called opaque? Let's look at a window and a wall.", T("A **property** tells us what a material is like: hard, soft, rough, smooth.", "**Transparent** means you can see through it. **Opaque** means you cannot.")),
    IMG("🪟 🧱", "A glass window is transparent. A brick wall is opaque."),
    CHK(mc("Glass is see-through. Which word describes it?", "Transparent", ["Opaque", "Rough"], { hint: "You can look through it.", why: "A see-through material is transparent." })),
    SAY("Remember. A material is what something is made from. Properties tell us what it is like.", SUM("A material is what something is made from", "A property tells us what a material is like", "Transparent means see-through; opaque means not see-through")),
    GLOSS({ material: "What something is made from, like wood or metal.", fabric: "A soft, bendy material, like cloth.", property: "What a material is like, such as hard, soft or smooth.", transparent: "Able to be seen through, like glass.", opaque: "Not able to be seen through, like wood." }),
  ],
  mini: [
    mc("Which of these is made of wood?", "A door", ["A key", "A window"], { hint: "Wood comes from trees.", why: "Doors are often made of wood." }),
    mat("Match each object to its material.", [["Window", "Glass"], ["Spoon", "Metal"], ["Jumper", "Fabric"]], { hint: "Think about what each is made of.", why: "Windows are glass, spoons are metal and jumpers are fabric." }),
    tf("An opaque material lets you see through it.", false, { hint: "Opaque is the opposite of transparent.", why: "You cannot see through an opaque material." }),
    mc("Which word describes how a pebble feels?", "Hard", ["Soft", "Bendy"], { hint: "Press on a pebble.", why: "A pebble is hard." }),
  ],
};

const forces = {
  id: "forces", kind: "try", title: "Squash, bend, twist and stretch",
  blocks: [
    H("Stop 1: Changing the shape of things"),
    SAY("Some materials change shape when we push or pull them. We can squash a sponge. We can bend a plastic ruler. We can twist a cloth. And we can stretch a rubber band. When we let go, some materials spring back, and some stay changed. Watch what happens.", T("We can **squash**, **bend**, **twist** and **stretch** some materials.")),
    EB("classroom", "Changing shape",
      SS("A sponge is squashed flat by a hand. When we let go, it springs back.", S("Squash: a sponge.", ["a", "🧽", 40, 60, 3, "pulse"], ["h", "✋", 40, 25, 2, "bounce"])),
      SS("A rubber band is pulled and gets longer. That is stretching.", S("Stretch: a rubber band.", ["a", "➰", 50, 60, 3, "grow"])),
      SS("A cloth is twisted round and round. That is twisting.", S("Twist: a cloth.", ["a", "🌀", 50, 60, 3, "spin"]))),
    CHK(mc("What do we do to a rubber band to make it longer?", "Stretch it", ["Squash it", "Twist it"], { hint: "Pull both ends.", why: "Pulling a rubber band makes it stretch." })),
    H("Stop 2: Testing materials"),
    SAY("Let's test some materials. We will squash each one and see if it changes. Put the materials that can be squashed in one box and the materials that cannot in the other. Then try it at home.", MAN("Squash test", "Put things you can squash in Squashy. Put things you cannot in Hard.", "🧽", 8, ["Squashy", "Hard"])),
    ACT("A squash and stretch test", ["A sponge", "A rubber band", "A wooden spoon", "A grown-up"], ["Squash each object gently. Does it change shape?", "Stretch the rubber band. What happens when you let go?", "Write down which objects were squashy, stretchy or hard."]),
    CHK(ms("Pick two things that you can squash.", ["Sponge", "Play dough"], ["Stone", "Metal spoon"], { hint: "Which ones are soft?", why: "Sponges and play dough can be squashed." })),
    SAY("Remember. Some materials squash, bend, twist and stretch. Others stay hard.", SUM("We can squash, bend, twist and stretch some materials", "Some materials spring back and some do not")),
    GLOSS({ squash: "To press something so it gets flatter.", bend: "To make something curve without breaking.", twist: "To turn something round and round.", stretch: "To pull something so it gets longer." }),
  ],
  mini: [
    mat("Match each action to the object.", [["Stretch", "Rubber band"], ["Squash", "Sponge"], ["Twist", "Cloth"]], { hint: "Think about how each one changes.", why: "A rubber band stretches, a sponge squashes and a cloth twists." }),
    tf("A stone is easy to squash.", false, { hint: "Is a stone hard or soft?", why: "A stone is hard, so it does not squash." }),
    mc("What does a squashed sponge do when you let go?", "Springs back", ["Turns to glass", "Melts"], { hint: "Try it with a sponge.", why: "A sponge springs back to its shape." }),
  ],
};

const jobs = {
  id: "jobs", kind: "play", title: "The right material for the job",
  blocks: [
    H("Stop 1: Choosing materials"),
    SAY("We choose a material because of its properties. Windows are glass because we want to see through them. Raincoats are plastic because water cannot get through. Saucepans are metal because metal does not burn easily. A pillow is soft fabric because we want it comfy. Let's pick the right material for four jobs.", T("We pick a material for its **properties**. A raincoat must keep out water.", "A good material is **waterproof**, strong or soft depending on the job.")),
    EB("home", "Right material, right job",
      SS("An umbrella must keep us dry. So it is made of waterproof plastic or fabric.", S("Umbrella: waterproof.", ["a", "☂️", 50, 60, 3, "bounce"], ["r", "🌧️", 50, 20, 2, "float"])),
      SS("A saucepan is made of metal, because metal can be heated without burning.", S("Saucepan: metal.", ["a", "🍳", 50, 60, 3, "pulse"])),
      SS("A pillow is soft, so it is filled with soft fabric.", S("Pillow: soft.", ["a", "🛏️", 50, 60, 3, "none"]))),
    CHK(mc("Why is a raincoat made of plastic?", "Water cannot get through it", ["It is see-through", "It is hard to bend"], { hint: "What do we want to keep out?", why: "Plastic is waterproof, so it keeps us dry." })),
    H("Stop 2: Brain game"),
    SAY("Warm up your memory first. Watch the objects light up, then copy the order. Then pick the best material for a rain hat.", BRAIN("memory_match", "Material pairs", "Find the matching pairs.", ["🪵", "🥄", "🧴", "🪟"])),
    CHK(mc("Which material is best for a window?", "Glass", ["Wood", "Brick"], { hint: "We need to see through it.", why: "Glass is transparent, so we can see through it." })),
    SAY("Remember. We choose materials for their properties.", SUM("We choose a material for its properties", "A raincoat needs to be waterproof; a window needs to be see-through")),
    GLOSS({ properties: "What a material is like.", waterproof: "Does not let water through.", strong: "Not easy to break.", comfy: "Soft and nice to rest on." }),
  ],
  mini: [
    mc("Which material is best for a saucepan?", "Metal", ["Paper", "Fabric"], { hint: "It must not burn.", why: "Metal can be heated without burning." }),
    tf("A waterproof coat keeps you dry.", true, { hint: "Waterproof means water cannot get through.", why: "A waterproof coat keeps rain out." }),
    mat("Match each job to the best material.", [["Window", "Glass"], ["Rain boots", "Rubber"], ["Pillow", "Soft fabric"]], { hint: "Think about each job.", why: "Each material has the right property for its job." }),
  ],
};

const changes = {
  id: "changes", kind: "use", title: "Melting, freezing and rocks",
  blocks: [
    H("Stop 1: Solid and liquid"),
    SAY("Some materials can change. When ice gets warm, it melts into water. When water gets very cold, it freezes into ice. Chocolate melts too, if it gets hot. Watch an ice cube on a warm day.", T("Ice **melts** when it gets warm. Water **freezes** when it gets very cold.")),
    EB("kitchen", "Ice melts",
      SS("Here is an ice cube. It is cold and hard.", S("An ice cube is solid.", ["i", "🧊", 50, 55, 3, "none"])),
      SS("It sits in the warm sun. It starts to melt into water.", S("The ice melts.", ["i", "💧", 50, 60, 3, "pulse"], ["s", "☀️", 80, 20, 2, "pulse"])),
      SS("Now put the water in the freezer. It freezes back into ice!", S("The water freezes.", ["i", "🧊", 50, 55, 3, "grow"], ["f", "❄️", 20, 25, 2, "float"]))),
    CHK(mc("What happens to ice when it gets warm?", "It melts", ["It freezes", "It turns to wood"], { hint: "Think of an ice lolly in the sun.", why: "Warmth makes ice melt into water." })),
    H("Stop 2: Rocks, quarries and mines"),
    SAY("Rocks are natural materials from the ground. People dig them from places called quarries and mines. Stone from quarries is used for building and roads. Marble from the mountains of Pakistan and Italy is used for beautiful buildings, and the Badshahi Mosque uses red sandstone. Look at some rocks.", T("**Rocks** are hard natural materials from the ground.", "A **quarry** is a place where stone is dug out.")),
    IMG("🪨 ⛰️ 🕌", "Rock, a mountain and a mosque built with stone."),
    CHK(tf("Stone from a quarry can be used to build things.", true, { hint: "Think of walls and roads.", why: "Quarry stone is used for building walls, roads and mosques." })),
    SAY("Remember. Ice melts and water freezes. Rocks are natural materials that people dig from quarries.", SUM("Heat melts ice; cold freezes water", "Rocks are natural materials from the ground", "Quarries are where stone is dug out")),
    GLOSS({ melts: "Changes from solid to liquid when heated.", freezes: "Changes from liquid to solid when cooled.", rocks: "Hard natural materials from the ground.", quarry: "A place where stone is dug out of the ground." }),
  ],
  mini: [
    mc("What does water turn into when it freezes?", "Ice", ["Steam", "Sand"], { hint: "Think of the freezer.", why: "Water freezes into ice." }),
    tf("Rocks come from the ground.", true, { hint: "Where do people dig for stone?", why: "Rocks are natural materials from the ground." }),
    ord("Put these in order.", ["Ice cube", "Melting", "Water"], { hint: "Start with the cold ice.", why: "The ice cube melts and becomes water." }),
  ],
};

const ALTS = [
  [mc("Which of these things is made of glass?", "A window", ["A pencil", "A spoon"], { hint: "It is see-through.", why: "Windows are made of glass." }), mc("Which object is usually made of wood?", "A table", ["A window", "A key"], { hint: "It comes from trees.", why: "Tables are often made of wood." })],
  [tf("A key is usually made of metal.", true, { hint: "Is a key hard and shiny?", why: "Keys are made of metal." }), tf("A jumper is made of glass.", false, { hint: "Is a jumper soft?", why: "A jumper is made of soft fabric." })],
  [mat("Pair each object with its material.", [["Pencil", "Wood"], ["Bottle", "Plastic"], ["Curtain", "Fabric"]], { hint: "Think about what each is made of.", why: "Pencils are wood, bottles plastic and curtains fabric." }), mat("Link each thing to what it is made of.", [["Key", "Metal"], ["Window", "Glass"], ["Table", "Wood"]], { hint: "Think about what each is made of.", why: "A key is metal, a window is glass and a table is wood." })],
  [ms("Pick two materials that are transparent.", ["Glass", "Clear plastic"], ["Wood", "Metal"], { hint: "Which ones can you see through?", why: "Glass and clear plastic are see-through." }), ms("Pick two materials that can be stretched.", ["Rubber band", "Elastic"], ["Stone", "Brick"], { hint: "Which ones can you pull longer?", why: "Rubber bands and elastic stretch." })],
  [hot("Tap the thing that is made of metal.", [["🥄", "Spoon", 22, 50], ["🧸", "Toy", 50, 50], ["🧦", "Sock", 78, 50]], ["Spoon"], { labels: true, hint: "Which is hard and shiny?", why: "A spoon is made of metal." }), hot("Tap the thing that is made of fabric.", [["🥄", "Spoon", 22, 50], ["🪑", "Chair", 50, 50], ["👕", "Shirt", 78, 50]], ["Shirt"], { labels: true, hint: "Which is soft?", why: "A shirt is made of fabric." })],
  [st("What word describes a material you can see through?", ["transparent"], { hint: "Glass is this.", why: "A see-through material is transparent." }), st("What word means that water cannot get through a material?", ["waterproof", "water proof"], { hint: "Raincoats are this.", why: "Waterproof means water cannot get through." })],
  [mc("Which job is metal best for?", "Making a saucepan", ["Making a window", "Making a pillow"], { hint: "It must not burn.", why: "Metal can be heated safely." }), mc("Which job is fabric best for?", "Making a soft curtain", ["Making a saucepan", "Making a window"], { hint: "It is soft and bendy.", why: "Fabric is soft and bendy, so it suits curtains." })],
  [fill("Finish the sentences about materials.", "A window is made of {b1} because it is {b2}.", [["glass", "wood", "metal"], ["transparent", "opaque", "rough"]], { hint: "You can see through a window.", why: "Glass is transparent." }), fill("Finish the sentences about raincoats.", "A raincoat is made of {b1} because it is {b2}.", [["plastic", "paper", "sponge"], ["waterproof", "see-through", "heavy"]], { hint: "It keeps us dry.", why: "Plastic is waterproof." })],
  [num("Wood, metal, plastic, glass and fabric: how many materials are in this list?", 5, { hint: "Count each one.", why: "There are five materials." }), num("Squash, bend, twist and stretch: how many actions are there?", 4, { hint: "Count each one.", why: "There are four actions." })],
  [sld("Slide to show the temperature at which water freezes, in degrees.", { min: -10, max: 30, unit: "°C" }, 0, 0, { hint: "It is the number between plus and minus.", why: "Water freezes at 0 degrees Celsius." }), sld("Ice starts to melt when it warms up to this temperature. Slide to show it.", { min: -10, max: 30, unit: "°C" }, 0, 0, { hint: "The same number as the freezing point.", why: "Ice melts at 0 degrees Celsius." })],
  [ord("Put the changes of water in order, starting cold.", ["Ice", "Water", "Steam"], { hint: "Start with the coldest.", why: "Ice melts into water, which becomes steam when it is heated." }), ord("Put these in order as the chocolate gets hot.", ["Solid chocolate", "Soft chocolate", "Melted chocolate"], { hint: "Start with cold chocolate.", why: "Heat makes chocolate softer and then liquid." })],
  [mc("Ali says a rubber band is a hard material. Why is he wrong?", "It can be stretched and bent", ["It is made of glass", "It is opaque"], { hint: "Can you stretch it?", why: "A rubber band changes shape when pulled, so it is not hard." }), mc("Sara says a sponge cannot change shape. Why is she wrong?", "It can be squashed and springs back", ["It is made of metal", "It is made of glass"], { hint: "Try squashing it.", why: "A sponge squashes and springs back." })],
  [mc("Why are saucepans not made of paper?", "Paper would burn", ["Paper is too heavy", "Paper is too shiny"], { hint: "Think about heat.", why: "Paper burns, but metal can be heated safely." }), mc("Why are windows not made of wood?", "You cannot see through wood", ["Wood is too shiny", "Wood is too cold"], { hint: "What do windows need to be?", why: "Wood is opaque. Windows need to be see-through." })],
  [mc("Noor leaves an ice lolly in the sun. What will happen?", "It will melt", ["It will freeze harder", "It will turn into glass"], { hint: "Warm things melt ice.", why: "Heat from the sun melts ice." }), mc("Hamza puts a cup of water in the freezer. What will happen?", "It will freeze", ["It will melt", "It will turn into a rock"], { hint: "The freezer is very cold.", why: "Very cold makes water freeze." })],
  [mc("Ali says a quarry is where fish live. What is a quarry?", "A place where stone is dug out", ["A kind of plant", "A kind of animal"], { hint: "Think of rocks.", why: "A quarry is where stone is dug from the ground." }), mc("Hana says rocks are made in a factory. Is she right?", "No, rocks are natural and come from the ground", ["Yes, rocks are made of plastic", "Yes, rocks are made of fabric"], { hint: "Are rocks natural or made?", why: "Rocks are natural materials from the ground." })],
];

export const topics = [
  topicLesson({
    slug: "science-class-1-materials", subject: "science", cls: 1, topic: 4, title: "Materials",
    summary: "Naming materials, describing their properties, changing their shape, choosing the right one for a job, melting, freezing and rocks.",
    unit: "Topic 4: Materials", difficulty: 1,
    objectives: ["Name common materials and the things made from them", "Describe materials using words like hard, soft and transparent", "Say how some materials change shape", "Choose the best material for a job"],
    success_criteria: ["I can name materials and what is made from them", "I can describe how a material feels or looks", "I can say how to squash, bend, twist or stretch it", "I can pick the right material for a job"],
    real_life: "Choosing a raincoat, a cup or a pan, and noticing what things around the house are made of.",
    standards: [NC("Y1 materials", "Distinguish between an object and the material from which it is made; describe the simple physical properties of materials"), NC("Y2 materials", "Identify and compare the suitability of everyday materials; find out how shapes can be changed by squashing, bending, twisting and stretching"), ...CAM("2Cm.01", "2Cp.01", "2Cp.02", "2Cp.03", "2Cc.01", "2Pf.02", "2ESp.01", "2ESp.02")],
    warm_up: [
      mc("What do plants need to grow?", "Light and water", ["Only toys", "Only sweets"], { hint: "Think of the cress.", why: "Plants need light and water." }),
      mc("Which part of a plant drinks water from the soil?", "Roots", ["Flower", "Leaves"], { hint: "They grow underground.", why: "Roots drink water." }),
      tf("A dog is a mammal.", true, { hint: "Does it have fur?", why: "A dog has fur and feeds its puppies milk." }),
    ],
    intro: [
      H("Welcome back, young scientist!"),
      SAY("Welcome back, young scientist! Today's big question is: why do we use different materials for different things? By the end, you will name materials, describe how they feel, squash and stretch them, and pick the best material for a job. Let's go!", T("Today's big question: why do we use different materials?", "We will test them and choose.")),
      IMG("🪵🥄🧴🪟", "Wood, metal, plastic and glass."),
      GLOSS({ materials: "What things are made from, like wood or metal." }),
    ],
    subs: [names, forces, jobs, changes],
    quiz: [
      Q("names", "recall", "materials.names", mc("Which of these is made of glass?", "A drinking glass", ["A pencil", "A spoon"], { hint: "It is see-through.", why: "A drinking glass is made of glass." }), ...ALTS[0]),
      Q("names", "recall", "materials.facts", tf("A spoon is usually made of metal.", true, { hint: "Is a spoon hard and shiny?", why: "Spoons are usually made of metal." }), ...ALTS[1]),
      Q("names", "apply", "materials.match", mat("Which material is each object made of? Match them.", [["Bottle", "Plastic"], ["Shirt", "Fabric"], ["Door", "Wood"]], { hint: "Think about what each is made of.", why: "A bottle is plastic, a shirt is fabric and a door is wood." }), ...ALTS[2]),
      Q("names", "apply", "materials.properties", ms("Pick two materials that are opaque.", ["Wood", "Brick"], ["Glass", "Clear plastic"], { hint: "Which ones can you NOT see through?", why: "Wood and brick are opaque." }), ...ALTS[3]),
      Q("names", "recall", "materials.label", hot("Tap the thing that is made of wood.", [["🪑", "Chair", 22, 50], ["🥄", "Spoon", 50, 50], ["🧸", "Toy", 78, 50]], ["Chair"], { labels: true, hint: "It comes from trees.", why: "A chair is often made of wood." }), ...ALTS[4]),
      Q("names", "recall", "materials.words", st("What word means that you can see through a material?", ["transparent"], { hint: "Glass is this.", why: "Transparent means see-through." }), ...ALTS[5]),
      Q("jobs", "apply", "materials.jobs", mc("Which job is rubber best for?", "Making boots that keep your feet dry", ["Making a window", "Making a spoon"], { hint: "It is waterproof and bendy.", why: "Rubber is waterproof and flexible." }), ...ALTS[6]),
      Q("jobs", "apply", "materials.fill", fill("Finish the sentence about a pan.", "A pan is made of {b1} because it is {b2}.", [["metal", "paper", "fabric"], ["strong", "see-through", "soft"]], { hint: "A pan must not burn.", why: "Metal is strong and can be heated safely." }), ...ALTS[7]),
      Q("forces", "recall", "materials.count", num("Squash, bend, twist, stretch. How many ways are there to change the shape of a material?", 4, { hint: "Count each action.", why: "There are four ways." }), ...ALTS[8]),
      Q("changes", "apply", "materials.temp", sld("At about what temperature does water freeze? Slide to show it.", { min: -10, max: 30, unit: "°C" }, 0, 0, { hint: "Between plus and minus.", why: "Water freezes at 0 degrees Celsius." }), ...ALTS[9]),
      Q("changes", "apply", "materials.melt", ord("Put the stages in order for a melting ice cube.", ["Ice cube", "Melting", "Puddle of water"], { hint: "Start with the cold ice.", why: "The ice cube melts and becomes a puddle." }), ...ALTS[10]),
      Q("forces", "reason", "materials.shape", mc("Tia says a rubber band is a hard material. Why is she wrong?", "It can be stretched and bent", ["It is made of glass", "It is opaque"], { hint: "Can you stretch it?", why: "A rubber band changes shape when pulled, so it is not hard." }), ...ALTS[11]),
      Q("jobs", "reason", "materials.reason", mc("Why are cooking pots not made of paper?", "Paper would burn", ["Paper is too heavy", "Paper is too shiny"], { hint: "Think about heat.", why: "Paper burns, but metal can be heated safely." }), ...ALTS[12]),
      Q("changes", "reason", "materials.predict", mc("Zara leaves an ice cream in the sun. What will happen?", "It will melt", ["It will freeze harder", "It will turn into glass"], { hint: "Warm things melt ice.", why: "Heat from the sun melts ice cream." }), ...ALTS[13]),
      Q("changes", "reason", "materials.rocks", mc("Omar says a quarry is a place to grow plants. Why is he wrong?", "A quarry is a place where stone is dug out", ["A quarry is a kind of animal", "A quarry is a kind of fabric"], { hint: "Think of rocks.", why: "A quarry is where stone is dug from the ground." }), ...ALTS[14]),
    ],
  }),
];
