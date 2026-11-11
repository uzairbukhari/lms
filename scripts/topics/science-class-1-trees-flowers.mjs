import { SAY, SS, H, T, PHOTO, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld, st } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC } from "./_science-kit.mjs";

// Science Class 1, topic 12: Trees and flowering plants (Zainab, age 7).
const OAK = "science-class-1-trees-flowers-1-584e1752.jpg";
const PINE = "science-class-1-trees-flowers-2-e267c577.jpg";
const DAISY = "science-class-1-trees-flowers-3-5b956b21.jpg";

// ---------------------------------------------------------------------------------------------- 1. learn
const parts = {
  id: "parts", kind: "learn", title: "Parts of a tree",
  blocks: [
    H("Welcome back, young scientist!"),
    SAY("Today we meet trees and flowers. What are their parts called?", T("Today's big question: what are the parts of a tree?")),
    SAY("This old oak tree stands alone in a field. Its leaves have turned golden.", PHOTO(OAK, "A large oak tree with golden autumn leaves standing in a grassy field", "An oak tree in autumn. Its leaves change colour before they fall.", "Photo by Sabin Zablau on Unsplash")),
    H("Stop 1: Trunk, branches, roots and leaves"),
    SAY("A tree is a very big plant. It has four main parts.", T("A tree is a **plant** with a **trunk**, branches, roots and leaves.")),
    EB("forest", "Parts of a tree",
      SS("The trunk is the thick middle. It holds the tree up.", S("Trunk.", ["t", "🪵", 50, 60, 3])),
      SS("Branches grow out from the trunk. Leaves grow on the branches.", S("Branches and leaves.", ["t", "🌳", 50, 56, 3, "pulse"])),
      SS("Roots grow under the ground. They take in water and hold the tree.", S("Roots.", ["r", "🌱", 50, 52, 3], ["g", "🟤", 50, 74, 3]))),
    CHK(mc("Which part of a tree holds it up?", "The trunk", ["The leaves", "The petals"], { hint: "It is thick and strong.", why: "The trunk holds the tree up.", tag: "parts.chk1" })),
    H("Stop 2: Trees are plants"),
    SAY("Some people think trees are not plants. But trees are plants, just very big ones.", T("**Bark** is the tough skin of a tree.")),
    EB("forest", "Tree facts",
      SS("The bark covers the trunk. It protects the tree.", S("Bark.", ["b", "🪵", 50, 60, 3, "pulse"])),
      SS("Leaves catch sunlight. A tree uses it to make food.", S("Leaves.", ["l", "🍃", 40, 52, 3], ["s", "☀️", 75, 30, 2, "pulse"])),
      SS("Trees can be small or very tall. A young tree is still a tree.", S("Small and tall.", ["s", "🌱", 30, 66, 2], ["t", "🌳", 70, 56, 3]))),
    CHK(tf("A tree is a plant.", true, { hint: "Trees grow from seeds and need water.", why: "Trees are big plants with roots, trunks and leaves.", tag: "parts.chk2" })),
    SAY("Let us remember. A tree is a plant. It has roots, a trunk, branches and leaves.", SUM("A tree is a big plant", "Roots hold the tree and take in water", "Leaves catch sunlight to make food")),
    GLOSS({ plant: "A living thing that grows in the ground and makes its own food.", trunk: "The thick, strong stem of a tree.", bark: "The tough skin that covers a trunk.", roots: "Parts under the ground that take in water.", branches: "Arms that grow out of the trunk.", leaves: "Flat green parts that catch sunlight." }),
  ],
  mini: [
    mc("What do roots do?", "Hold the tree and take in water", ["Make flowers", "Make sounds"], { hint: "They are underground.", why: "Roots hold a tree and take in water." }),
    tf("Bark covers the trunk.", true, { hint: "It is the tree's skin.", why: "Bark protects the trunk." }),
    mc("Where do leaves grow?", "On branches", ["Under the ground", "Inside the trunk"], { hint: "They catch the sun.", why: "Leaves grow on the branches." }),
    mc("What do leaves catch?", "Sunlight", ["Rain only", "Stones"], { hint: "Trees make food with it.", why: "Leaves catch sunlight." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const evergreen = {
  id: "evergreen", kind: "try", title: "Evergreen and deciduous",
  blocks: [
    H("Stop 1: Trees that drop their leaves"),
    SAY("Many trees lose their leaves in autumn. They are called deciduous trees.", T("**Deciduous** trees lose their leaves in autumn.")),
    EB("forest", "A deciduous year",
      SS("In spring, oak buds open. New green leaves unfold.", S("Spring.", ["t", "🌳", 50, 56, 3, "grow"])),
      SS("In autumn, the leaves turn gold and brown. They fall to the ground.", S("Autumn.", ["t", "🍂", 50, 52, 3, "float"])),
      SS("In winter, the branches are bare. The tree is resting, not dead.", S("Winter.", ["t", "🌲", 50, 58, 3], ["s", "❄️", 78, 30, 2, "pulse"]))),
    CHK(mc("What happens to an oak tree in autumn?", "Its leaves fall", ["It grows flowers", "It runs away"], { hint: "They turn gold first.", why: "Deciduous trees lose their leaves in autumn.", tag: "evergreen.chk1" })),
    H("Stop 2: Trees that stay green"),
    SAY("Pine trees have thin, sharp needles. These are their leaves.", PHOTO(PINE, "A close-up of long, thin dark green pine needles", "Pine needles stay green all year. A pine is an evergreen tree.", "Photo by matthew Feeney on Unsplash")),
    SAY("An evergreen tree keeps its leaves all year. It loses a few at a time.", T("**Evergreen** trees stay green all year.")),
    SAY("Now sort the trees. Do they drop their leaves, or stay green?", MAN("Deciduous or evergreen?", "Move each tree. Trees that drop leaves go in Deciduous. Trees that stay green go in Evergreen.", "🌳", 8, ["Deciduous", "Evergreen"])),
    ACT("Leaf hunt", ["Paper and crayons", "A grown-up to help"], ["Look for leaves on the ground in autumn, or pictures of leaves.", "Draw three different leaf shapes.", "Say if each leaf is from a deciduous or an evergreen tree."]),
    CHK(tf("Pine needles are leaves.", true, { hint: "They grow on the branches.", why: "Needles are thin leaves on a pine tree.", tag: "evergreen.chk2" })),
    SAY("Let us remember. Deciduous trees drop leaves. Evergreen trees stay green.", SUM("Deciduous trees lose leaves in autumn", "Evergreens keep their leaves all year", "A bare tree in winter is resting, not dead")),
    GLOSS({ deciduous: "Dropping leaves in autumn.", evergreen: "Staying green all year.", needles: "Thin, sharp leaves, like on a pine tree.", bud: "A tiny closed shoot that opens into leaves or a flower.", resting: "Not growing for a while, but still alive." }),
  ],
  mini: [
    mc("Which tree keeps its leaves in winter?", "A pine", ["An oak", "A beech"], { hint: "Its needles stay green.", why: "A pine is evergreen." }),
    tf("A bare tree in winter is dead.", false, { hint: "Buds are ready for spring.", why: "It is resting, ready to grow leaves in spring." }),
    mc("What colour do many leaves turn in autumn?", "Gold and brown", ["Bright pink", "Pure white"], { hint: "Think of the oak photo.", why: "Many leaves turn gold or brown." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const flower = {
  id: "flower", kind: "play", title: "Flowering plants",
  blocks: [
    H("Stop 1: Parts of a flowering plant"),
    SAY("Daisies, roses and tulips are flowering plants. Each has four parts.", T("A flowering plant has a **root**, a stem, leaves and a flower.")),
    SAY("These daisies grow wild in a meadow. They have white petals and yellow centres.", PHOTO(DAISY, "Wild daisies with white petals and yellow centres in a sunny meadow", "Daisies grow in meadows. The petals attract bees and butterflies.", "Photo by Daiga Ellaby on Unsplash")),
    EB("meadow", "A flowering plant",
      SS("The root holds the plant in the soil. It drinks water.", S("Root.", ["r", "🌱", 50, 52, 3], ["g", "🟤", 50, 76, 3])),
      SS("The stem carries water up. It holds the flower high.", S("Stem.", ["s", "🌿", 50, 58, 3])),
      SS("The petals are bright. Bees come to the flower for nectar.", S("Petals.", ["f", "🌼", 40, 56, 3], ["b", "🐝", 75, 40, 2, "float"]))),
    CHK(mc("Which part of a plant holds up the flower?", "The stem", ["The root", "The bark"], { hint: "It carries water too.", why: "The stem holds up the flower.", tag: "flower.chk1" })),
    H("Stop 2: Brain game"),
    SAY("Flowers come in many colours. Mango blossom is creamy. Roses can be red.", T("Play the game, then answer a question.")),
    SAY("Warm up your memory. Watch the flowers light up, then copy them.", BRAIN("remember_order", "Flower parade", "Watch the order, then copy it. It gets longer each time!", ["🌼", "🌹", "🌷", "🌻"])),
    CHK(ms("Pick two parts of a flowering plant.", ["Stem", "Petals"], ["Wheels", "Pages"], { hint: "Look at the daisy.", why: "A flowering plant has a stem and petals.", tag: "flower.chk2" })),
    SAY("Let us remember. A flowering plant has roots, a stem, leaves and a flower.", SUM("Roots, stem, leaves and flower", "Petals attract bees", "Flowers come in many colours")),
    GLOSS({ root: "The part of a plant under the ground.", stem: "The part that holds the plant up.", petal: "A coloured part of a flower.", petals: "The coloured parts of a flower.", blossom: "Flowers on a tree.", nectar: "The sweet juice in a flower." }),
  ],
  mini: [
    mc("What do petals attract?", "Bees", ["Stones", "Fish"], { hint: "They visit for nectar.", why: "Bright petals attract bees." }),
    tf("All flowers look the same.", false, { hint: "Think of a daisy and a rose.", why: "Flowers differ in colour and shape." }),
    mc("Which part is under the ground?", "The root", ["The petal", "The leaf"], { hint: "It takes in water.", why: "Roots grow under the ground." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const area = {
  id: "area", kind: "use", title: "Plants in my area",
  blocks: [
    H("Stop 1: Wild and garden plants"),
    SAY("Wildflowers grow by themselves. Wind, birds and animals carry their seeds.", T("**Wildflowers** grow without anyone planting them.")),
    SAY("In the UK, daisies and buttercups grow wild on grass and by roads.", T("Look out for wild plants near you.")),
    SAY("In Pakistan, bright yellow sarson flowers cover fields in late winter.", T("Fields of sarson turn the land yellow.")),
    EB("meadow", "Plants near me",
      SS("A mango tree blossoms in spring. Later it makes fruit.", S("Mango.", ["m", "🥭", 40, 54, 3], ["b", "🐝", 75, 40, 2, "float"])),
      SS("A neem tree gives cool shade near a school or mosque.", S("Neem shade.", ["n", "🌳", 40, 56, 3], ["s", "🕌", 78, 58, 2])),
      SS("A rose in a garden is planted by a gardener.", S("Garden plant.", ["r", "🌹", 50, 56, 3, "pulse"]))),
    CHK(tf("Wildflowers need a gardener to plant them.", false, { hint: "Think about seeds blowing in the wind.", why: "Wildflowers grow from seeds spread by wind, birds and animals.", tag: "area.chk1" })),
    H("Stop 2: A safe garden walk"),
    SAY("Go on a plant walk with a grown-up. Look, draw and count, but do not pick.", T("Observe plants **safely**.")),
    SAY("Never taste a plant or berry you do not know. Some are poisonous.", T("Never taste an unknown plant.")),
    SAY("Leave wildflowers growing. Bees and butterflies need their nectar.", T("Leave wildflowers for the bees.")),
    SAY("Muslims are taught to look after the earth and its plants. Let us care for them.", T("Look after plants.")),
    EB("meadow", "Plant walk safety",
      SS("Look closely with your eyes. Draw what you see in a notebook.", S("Look.", ["z", "👧", 25, 58, 3], ["f", "🌼", 68, 62, 2])),
      SS("Ask a grown-up what a plant is called. They can use a chart.", S("Ask.", ["z", "👧", 25, 58, 3], ["a", "🧑", 70, 58, 3])),
      SS("Wash your hands after touching plants. Then count how many you saw.", S("Wash.", ["z", "👧", 25, 58, 3], ["w", "🧼", 68, 62, 2]))),
    ACT("Plant spotting chart", ["Paper and pencil", "A grown-up to help"], ["Make a table with Plant, Colour and Place.", "Walk outside and spot five plants.", "Fill in the table. Do not pick or taste anything."]),
    CHK(ms("Pick two safe things to do on a plant walk.", ["Look and draw", "Ask a grown-up the name"], ["Taste unknown berries", "Pull up every flower"], { hint: "Think about safety and kindness.", why: "Looking, drawing and asking are safe. Tasting and pulling are not.", tag: "area.chk2" })),
    SAY("Let us remember. Wild and garden plants grow all around us. We look but do not pick.", SUM("Wildflowers grow by themselves", "Look, draw and ask, but do not taste", "Leave flowers for the bees")),
    GLOSS({ wildflowers: "Flowers that grow on their own, not planted by people.", safely: "In a way that does not hurt you or the plants.", poisonous: "Able to make you ill if eaten.", shade: "A cool, dark place under something.", chart: "A picture list that helps you name things.", sarson: "A plant with bright yellow flowers grown in Pakistan." }),
  ],
  mini: [
    mc("What should you do before touching an unknown plant?", "Ask a grown-up", ["Taste it", "Pull it out"], { hint: "Think about safety.", why: "Ask a grown-up first." }),
    tf("Bees visit flowers for nectar.", true, { hint: "It is sweet.", why: "Bees collect nectar from flowers." }),
    mc("Which tree gives shade near a school in Pakistan?", "A neem", ["A pine", "A cactus"], { hint: "It has a wide, leafy top.", why: "A neem tree gives cool shade." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "A walk with Zainab", backdrop: "meadow", caption: "A child spots which leaves fall and which stay on a seasonal walk.",
  scenes: [
    { caption: "Setting out.", say: "Zainab goes for a walk. She will visit three plants.",
      items: [{ id: "z", emoji: "👧", label: "Zainab", x: 30, y: 58, size: 3, enter: "walk_right" }] },
    { caption: "The oak.", say: "First is an oak tree. Its leaves are green in summer.",
      items: [{ id: "t", emoji: "🌳", x: 60, y: 54, size: 3 }, { id: "z", emoji: "👧", x: 25, y: 62, size: 2 }] },
    { caption: "Autumn.", say: "In autumn, the oak leaves turn gold and fall down.",
      items: [{ id: "t", emoji: "🍂", x: 50, y: 52, size: 3, anim: "float" }] },
    { caption: "Winter.", say: "In winter the oak is bare. It is only resting.",
      items: [{ id: "t", emoji: "🌲", x: 50, y: 58, size: 3 }, { id: "s", emoji: "❄️", x: 75, y: 28, size: 2, anim: "pulse" }] },
    { caption: "The pine.", say: "Next is a pine tree. Its needles stay green all year.",
      items: [{ id: "p", emoji: "🌲", x: 55, y: 54, size: 3, effect: "glow" }] },
    { caption: "Wildflowers.", say: "Then a meadow of wildflowers. Nobody planted them.",
      items: [{ id: "f", emoji: "🌼", x: 30, y: 62, size: 2 }, { id: "g", emoji: "🌻", x: 60, y: 60, size: 2 }, { id: "h", emoji: "🌷", x: 82, y: 64, size: 2 }] },
    { caption: "Bees.", say: "A bee visits a flower for sweet nectar. Zainab watches quietly.",
      items: [{ id: "f", emoji: "🌼", x: 40, y: 60, size: 3 }, { id: "b", emoji: "🐝", x: 70, y: 40, size: 2, anim: "float" }] },
    { caption: "Home.", say: "Zainab draws what she saw. She did not pick a single flower.",
      items: [{ id: "z", emoji: "👧", x: 40, y: 58, size: 3 }, { id: "d", emoji: "📝", x: 72, y: 62, size: 2, effect: "sparkle" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- parts (q1-q8)
  Q("parts", "apply", "trees.part_match", mat("Match each part of a tree to its job.", [["Roots", "Take in water"], ["Trunk", "Holds the tree up"], ["Leaves", "Catch sunlight"]], { hint: "Think about where each part is.", why: "Roots drink, the trunk supports and leaves catch sunlight." }),
    mat("Join each tree part to its job.", [["Branches", "Hold the leaves up"], ["Bark", "Protects the trunk"], ["Roots", "Hold the tree in the ground"]], { hint: "Think about where each part is.", why: "Branches hold leaves, bark protects and roots anchor the tree." })),
  Q("parts", "reason", "trees.not_plants", mc("Sam says trees are not plants. Is he right?", "No, trees are very big plants", ["Yes, trees are animals", "Yes, only small things are plants"], { hint: "Trees grow from seeds.", why: "Trees are plants with roots, stems and leaves." }),
    mc("Bilal says a tree is not a plant because it is tall. Is he right?", "No, tall trees are still plants", ["Yes, plants must be small", "Yes, tall things are rocks"], { hint: "Trees grow from seeds.", why: "A tree is a plant, however tall." })),
  Q("parts", "recall", "trees.bark_st", st("What is the tough outer skin of a tree trunk called?", ["bark"], { hint: "A dog does it too.", why: "The skin of a trunk is called bark." }),
    st("Which part of a tree grows under the ground and takes in water?", ["roots", "root", "the roots"], { hint: "It starts with r.", why: "Roots take in water under the ground." })),
  Q("parts", "apply", "trees.trunk_tap", hot("Tap the part that holds up the tree.", [["🍃", "Leaves", 22, 50], ["🪵", "Trunk", 50, 50], ["🌼", "Flower", 78, 50]], ["Trunk"], { labels: true, hint: "It is thick and strong.", why: "The trunk holds up the tree." }),
    hot("Tap the part that catches sunlight.", [["🍃", "Leaves", 22, 50], ["🪵", "Trunk", 50, 50], ["🟤", "Soil", 78, 50]], ["Leaves"], { labels: true, hint: "It is green and flat.", why: "Leaves catch sunlight." })),
  Q("parts", "apply", "trees.ground_ord", ord("Put the tree parts in order, from the ground up.", ["Roots", "Trunk", "Branches", "Leaves"], { hint: "Roots start underground.", why: "Roots are lowest, then the trunk, branches and leaves." }),
    ord("Put these in order, from smallest to biggest.", ["Leaf", "Branch", "Trunk"], { hint: "A leaf is small.", why: "A leaf is smallest and the trunk is biggest." })),
  Q("parts", "apply", "trees.tree_tf", tf("A tree is a kind of plant.", true, { hint: "It grows from a seed.", why: "Trees are plants." }),
    tf("A tree is a kind of animal.", false, { hint: "Does it have roots?", why: "A tree is a plant, not an animal." })),
  Q("parts", "reason", "trees.all_tall", mc("Layla says every tree is as tall as a house. Is she right?", "No, trees can be small or tall", ["Yes, all trees are huge", "Yes, small trees are bushes"], { hint: "Think about a young tree.", why: "Trees come in many sizes." }),
    mc("Aisha says a small tree is not a tree. Is she right?", "No, a small tree still has a trunk and branches", ["Yes, only tall things are trees", "Yes, small trees are flowers"], { hint: "Look at the parts.", why: "A young tree is still a tree." })),
  Q("parts", "recall", "trees.leaf_num", num("A tree has 4 branches. Each branch has 3 leaves. How many leaves is that?", 12, { hint: "3 + 3 + 3 + 3.", why: "4 branches of 3 leaves make 12 leaves." }),
    num("A small tree has 5 branches. Each branch has 2 leaves. How many leaves is that?", 10, { hint: "2 + 2 + 2 + 2 + 2.", why: "5 branches of 2 leaves make 10 leaves." })),
  // ----- evergreen (q9-q16)
  Q("evergreen", "apply", "trees.type_match", mat("Match each tree to deciduous or evergreen.", [["Pine", "Evergreen"], ["Oak", "Deciduous"], ["Mango", "Evergreen"]], { hint: "Which lose leaves in autumn?", why: "Pine and mango stay green. Oak loses its leaves." }),
    mat("Join each tree to deciduous or evergreen.", [["Holly", "Evergreen"], ["Beech", "Deciduous"], ["Shisham", "Deciduous"]], { hint: "Which lose leaves?", why: "Holly stays green. Beech and shisham lose their leaves." })),
  Q("evergreen", "reason", "trees.all_lose", mc("Aisha says all trees lose their leaves in autumn. Is she right?", "No, evergreen trees keep their leaves", ["Yes, every tree loses leaves", "Yes, pine trees go bald too"], { hint: "Think about pine needles.", why: "Evergreen trees stay green all year." }),
    mc("Ali says every tree is bare in winter. Is he right?", "No, pine and holly trees stay green", ["Yes, all trees are bare", "Yes, only oaks are green"], { hint: "Think about pine trees.", why: "Evergreens keep their leaves in winter." })),
  Q("evergreen", "reason", "trees.pine_dead", mc("Mira says pine trees are dead in winter. Is she right?", "No, their green needles show they are alive", ["Yes, they all die in winter", "Yes, green means dead"], { hint: "Look at the needles.", why: "Pine needles stay green all year." }),
    mc("Hana says a bare oak tree in winter is dead. Is she right?", "No, it is resting and has buds ready for spring", ["Yes, bare means dead", "Yes, oaks die every winter"], { hint: "Think about spring buds.", why: "A bare deciduous tree is only resting." })),
  Q("evergreen", "apply", "trees.decid_ms", ms("Which two trees lose their leaves in autumn? Pick two.", ["Oak", "Beech"], ["Pine", "Holly"], { hint: "They are deciduous.", why: "Oak and beech are deciduous." }),
    ms("Which two trees stay green all year? Pick two.", ["Pine", "Holly"], ["Oak", "Beech"], { hint: "They are evergreen.", why: "Pine and holly are evergreen." })),
  Q("evergreen", "apply", "trees.autumn_fill", fill("Finish the sentences about a deciduous tree.", "In autumn a deciduous tree {b1} its leaves. In spring it grows new {b2}.", [["drops", "keeps", "eats"], ["leaves", "wheels", "shells"]], { hint: "Think about the seasons.", why: "A deciduous tree drops its leaves and grows new ones." }),
    fill("Finish the sentences about an evergreen tree.", "An evergreen tree stays {b1} all {b2}.", [["green", "bare", "blue"], ["year", "night", "week"]], { hint: "It keeps its needles.", why: "An evergreen stays green all year." })),
  Q("evergreen", "apply", "trees.park_sld", sld("A park has 15 trees. 9 are evergreen. Slide to show how many are deciduous.", { min: 0, max: 18, unit: "trees" }, 6, 0, { hint: "15 take away 9.", why: "15 - 9 = 6 trees." }),
    sld("A forest path has 14 trees. 6 are evergreen. Slide to show how many are deciduous.", { min: 0, max: 18, unit: "trees" }, 8, 0, { hint: "14 take away 6.", why: "14 - 6 = 8 trees." })),
  Q("evergreen", "apply", "trees.needle_tf", tf("Needles on a pine tree are its leaves.", true, { hint: "They grow on the branches.", why: "Needles are thin leaves." }),
    tf("Needles are the roots of a pine tree.", false, { hint: "Roots are underground.", why: "Needles are leaves, not roots." })),
  Q("evergreen", "recall", "trees.decid_st", st("What word describes a tree that drops its leaves in autumn?", ["deciduous"], { hint: "It starts with d.", why: "A tree that drops its leaves in autumn is deciduous." }),
    st("What word describes a tree that stays green all year?", ["evergreen"], { hint: "It has green in it.", why: "A tree that keeps its leaves is evergreen." })),
  // ----- flower (q17-q23)
  Q("flower", "apply", "trees.flower_match", mat("Match each part of a flowering plant to its job.", [["Root", "Takes in water"], ["Stem", "Holds the plant up"], ["Petals", "Attract bees"]], { hint: "Think about each part.", why: "Roots drink, stems support and petals attract bees." }),
    mat("Join each plant part to what it does.", [["Flower", "Makes seeds"], ["Leaf", "Catches sunlight"], ["Stem", "Carries water up"]], { hint: "Think about each part.", why: "Flowers make seeds, leaves catch sunlight and stems carry water." })),
  Q("flower", "reason", "trees.same_look", mc("Hamza says all flowers look the same. Is he right?", "No, flowers have many colours and shapes", ["Yes, every flower is white", "Yes, flowers have no petals"], { hint: "Think about a rose and a daisy.", why: "Flowers differ in colour and shape." }),
    mc("Layla says every flower has white petals. Is she right?", "No, petals can be red, yellow, pink and many more colours", ["Yes, all petals are white", "Yes, petals have no colour"], { hint: "Think about a rose.", why: "Petals come in many colours." })),
  Q("flower", "reason", "trees.no_flower_dead", mc("Omar says a plant with no flower is dead. Is he right?", "No, plants only flower at some times of the year", ["Yes, no flower means dead", "Yes, only flowers are alive"], { hint: "Think about seasons.", why: "Many living plants flower only for a short time." }),
    mc("Ali says a flower always means it is spring. Is he right?", "No, some plants flower in summer or winter", ["Yes, flowers only open in spring", "Yes, flowers never open in winter"], { hint: "Think about sarson in late winter.", why: "Different plants flower in different seasons." })),
  Q("flower", "recall", "trees.petal_num", num("A buttercup has 5 petals. How many petals do 2 buttercups have?", 10, { hint: "5 + 5.", why: "5 + 5 = 10 petals." }),
    num("A flower has 6 petals. How many petals do 3 flowers have?", 18, { hint: "6 + 6 + 6.", why: "6 + 6 + 6 = 18 petals." })),
  Q("flower", "recall", "trees.petal_st", st("What do we call the bright parts of a flower that attract bees?", ["petals", "petal"], { hint: "It starts with p.", why: "The bright parts are petals." }),
    st("What part of a plant carries water up and holds the flower?", ["stem", "the stem"], { hint: "It starts with s.", why: "The stem carries water up." })),
  Q("flower", "apply", "trees.flower_tap", hot("Tap the part that attracts bees.", [["🌸", "Petals", 22, 50], ["🌿", "Stem", 50, 50], ["🟤", "Soil", 78, 50]], ["Petals"], { labels: true, hint: "It is bright.", why: "Bright petals attract bees." }),
    hot("Tap the flowering plant.", [["🌼", "Daisy", 22, 50], ["🌲", "Pine", 50, 50], ["🪨", "Rock", 78, 50]], ["Daisy"], { labels: true, hint: "It has petals.", why: "A daisy is a flowering plant." })),
  Q("flower", "apply", "trees.plant_ord", ord("Put the parts of a flowering plant in order, from the ground up.", ["Root", "Stem", "Leaf", "Flower"], { hint: "Roots are underground.", why: "Root, then stem, then leaf, then flower at the top." }),
    ord("Put a plant's life in order.", ["Seed", "Seedling", "Flower"], { hint: "It starts as a seed.", why: "A seed grows into a seedling, then a flower." })),
  // ----- area (q24-q30)
  Q("area", "reason", "trees.wild_planted", mc("Zainab says wildflowers need people to plant them. Is she right?", "No, wind and animals carry their seeds", ["Yes, only people plant seeds", "Yes, wildflowers never grow alone"], { hint: "Think about a meadow.", why: "Wildflowers grow from seeds spread by wind, birds and animals." }),
    mc("Sana says all wild plants are planted by farmers. Is she right?", "No, wild plants grow without help", ["Yes, farmers plant every plant", "Yes, wild plants come from shops"], { hint: "Think about a meadow.", why: "Wild plants grow on their own." })),
  Q("area", "reason", "trees.taste_safe", mc("Sam says it is safe to taste any berry he finds. Is he right?", "No, some are poisonous, so ask a grown-up", ["Yes, all berries are sweet", "Yes, wild berries are always safe"], { hint: "Think about safety.", why: "Never taste a plant you do not know." }),
    mc("Bilal says it is fine to pick every wildflower to take home. Is he right?", "No, bees need them, so leave them growing", ["Yes, wildflowers always grow back overnight", "Yes, picking helps the bees"], { hint: "Think about bees.", why: "Wildflowers give food to bees and butterflies." })),
  Q("area", "apply", "trees.safe_ms", ms("Which two are safe things to do on a plant walk? Pick two.", ["Look and draw", "Ask a grown-up for names"], ["Taste unknown berries", "Pull up every flower"], { hint: "Be safe and kind.", why: "Looking and asking are safe." }),
    ms("Which two help us to name a plant? Pick two.", ["Use a plant chart", "Ask a grown-up"], ["Rub unknown leaves on your skin", "Eat the seeds"], { hint: "Be safe and careful.", why: "A chart and a grown-up can help." })),
  Q("area", "apply", "trees.bee_tf", tf("Bees visit flowers to collect nectar.", true, { hint: "It is sweet.", why: "Bees drink nectar." }),
    tf("Bees visit flowers to eat the roots.", false, { hint: "Where is nectar?", why: "Bees take nectar from flowers." })),
  Q("area", "apply", "trees.local_fill", fill("Finish the sentences about Pakistan.", "Fields of yellow {b1} flower in {b2}.", [["sarson", "cactus", "seaweed"], ["late winter", "a minute", "a stone"]], { hint: "Think of a yellow field.", why: "Sarson flowers in late winter in Pakistan." }),
    fill("Finish the sentences about shade.", "A {b1} tree gives shade near a mosque or {b2}.", [["neem", "plastic", "metal"], ["school", "sea", "cave"]], { hint: "Think about a hot day.", why: "A neem tree gives shade near a school or mosque." })),
  Q("area", "apply", "trees.spot_sld", sld("A garden walk has 12 plants. Aisha spots 7 with flowers. Slide to show how many have no flowers.", { min: 0, max: 15, unit: "plants" }, 5, 0, { hint: "12 take away 7.", why: "12 - 7 = 5 plants." }),
    sld("A park walk has 15 plants. Hamza spots 9 with flowers. Slide to show how many have no flowers.", { min: 0, max: 18, unit: "plants" }, 6, 0, { hint: "15 take away 9.", why: "15 - 9 = 6 plants." })),
  Q("area", "reason", "trees.only_gardens", mc("Mira says plants only live in gardens and pots. Is she right?", "No, wild plants grow in fields, forests and by roads", ["Yes, plants need a gardener", "Yes, plants cannot live outside"], { hint: "Think about a meadow.", why: "Wild plants grow in many places." }),
    mc("Hana says only people can plant trees. Is she right?", "No, trees grow from seeds that animals and wind spread", ["Yes, trees grow only in gardens", "Yes, seeds cannot move"], { hint: "Think about acorns and squirrels.", why: "Wind, birds and animals spread seeds." })),
];

export const topics = [
  topicLesson({
    slug: "science-class-1-trees-flowers", subject: "science", cls: 1, topic: 12, title: "Trees and Flowering Plants",
    summary: "Trees and flowers around us: their parts, their kinds and how they change with the seasons.",
    unit: "Topic 12: Trees and flowering plants", difficulty: 1,
    objectives: ["Name parts of a tree and of a flowering plant", "Tell evergreen and deciduous trees apart", "Name some wild and garden plants"],
    success_criteria: ["I can name parts of a tree", "I can say if a tree is evergreen or deciduous", "I can name some wild and garden plants"],
    real_life: "Oak, pine and daisies in the UK, and neem, mango, shisham and sarson fields in Pakistan, with neem trees giving shade by schools and mosques.",
    standards: [NC("Y1 plants", "Identify and name common wild and garden plants, including deciduous and evergreen trees; describe the basic structure of common flowering plants, including trees")],
    warm_up: [
      mc("What is a tree?", "A big plant", ["An animal", "A rock"], { hint: "It has roots.", why: "A tree is a big plant." }),
      tf("Roots grow under the ground.", true, { hint: "They drink water.", why: "Roots grow underground." }),
      mc("Which part of a plant has petals?", "The flower", ["The root", "The trunk"], { hint: "It is bright.", why: "Petals are part of a flower." }),
    ],
    intro: [],
    subs: [parts, evergreen, flower, area],
    clip,
    quiz,
  }),
];
