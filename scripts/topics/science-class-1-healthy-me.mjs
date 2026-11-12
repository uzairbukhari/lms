import { SAY, SS, H, T, PHOTO, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld, st } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC } from "./_science-kit.mjs";

// Science Class 1, topic 8: Healthy me (Zainab, age 7).
const FRUIT = "science-class-1-healthy-me-1-bf0112bd.jpg";
const WASH = "science-class-1-healthy-me-2-b1863424.jpg";
const BRUSH = "science-class-1-healthy-me-3-0afeb772.jpg";

// ---------------------------------------------------------------------------------------------- 1. learn
const food = {
  id: "food", kind: "learn", title: "Types of food",
  blocks: [
    H("Welcome back, young scientist!"),
    SAY("Today we find out how to stay healthy. What helps our bodies grow strong?", T("Today's big question: how do we stay healthy?")),
    SAY("Look at all these colours. Fruit and vegetables are part of a healthy diet.", PHOTO(FRUIT, "Red apples, strawberries, tomatoes, peppers and raspberries arranged around a white space", "Red fruit and vegetables. A healthy plate has many colours.", "Photo by Jakub Kapusnak on Unsplash")),
    H("Stop 1: Food groups"),
    SAY("Food comes in groups. Each group does a different job for our bodies.", T("A **diet** is all the food we eat.")),
    EB("kitchen", "Four food groups",
      SS("Fruit and vegetables give us vitamins. They keep us healthy.", S("Fruit and veg.", ["a", "🍎", 25, 60, 3], ["b", "🥕", 65, 62, 3])),
      SS("Bread, rice and roti give us energy to run and play.", S("Starchy food.", ["a", "🍞", 25, 60, 3], ["b", "🍚", 65, 62, 3])),
      SS("Meat, fish, eggs and daal are protein. Protein helps us grow.", S("Protein.", ["a", "🥚", 20, 60, 2], ["b", "🐟", 48, 62, 2], ["c", "🫘", 76, 62, 2])),
      SS("Milk, yoghurt and cheese are dairy. They help make strong bones.", S("Dairy.", ["a", "🥛", 25, 60, 3], ["b", "🧀", 65, 62, 3]))),
    CHK(mc("Which food group gives us energy to run and play?", "Bread, rice and roti", ["Sweets", "Water"], { hint: "Think of roti.", why: "Bread, rice and roti give us energy.", tag: "healthy.chk1" })),
    H("Stop 2: Sometimes foods"),
    SAY("Sweets, crisps and fizzy drinks are treats. We eat them only sometimes.", T("**Treats** are for sometimes, not every day.")),
    SAY("Water is the best drink. We drink some all through the day.", T("Water keeps our bodies working well.")),
    EB("kitchen", "Everyday and treat foods",
      SS("Zainab eats fruit chaat after school. That is a healthy snack.", S("Healthy.", ["z", "👧", 25, 58, 3], ["f", "🍓", 65, 62, 3, "bounce"])),
      SS("On Eid she enjoys a sweet treat. That is fine as a treat.", S("A treat.", ["z", "👧", 25, 58, 3], ["s", "🍬", 65, 62, 3, "bounce"])),
      SS("Every day she drinks water or milk, not fizzy drinks.", S("Drinks.", ["z", "👧", 25, 58, 3], ["w", "💧", 65, 62, 3, "bounce"]))),
    CHK(tf("Sweets are a treat to enjoy only sometimes.", true, { hint: "Can we eat sweets all day?", why: "Sweets are for sometimes, not every day.", tag: "healthy.chk2" })),
    SAY("Let us remember. Eat from all the food groups. Treats are for sometimes.", SUM("Food has four groups: fruit and veg, starchy food, protein, dairy", "Each group does a job for our bodies", "Sweets and fizzy drinks are treats")),
    GLOSS({ diet: "All the food and drink we have.", treats: "Foods we eat only sometimes, such as sweets.", vitamins: "Things in food that keep our bodies healthy.", protein: "Food that helps us grow, such as fish, eggs and daal.", dairy: "Foods made from milk.", energy: "What our bodies use to move and work." }),
  ],
  mini: [
    mc("Which one is a vegetable?", "A carrot", ["A mango", "A biscuit"], { hint: "It grows in the ground.", why: "A carrot is a vegetable." }),
    tf("Daal is a protein food.", true, { hint: "Think of lentils.", why: "Daal is a protein food." }),
    mc("What is the best drink?", "Water", ["Fizzy drink", "Sweet squash"], { hint: "It has nothing added.", why: "Water is the healthiest drink." }),
    tf("A rainbow plate has many colours.", true, { hint: "Fruit and veg come in many colours.", why: "Different colours give different vitamins." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const amounts = {
  id: "amounts", kind: "try", title: "Different amounts",
  blocks: [
    H("Stop 1: More and less"),
    SAY("We do not eat the same amount of every food. We eat more of some.", T("Eat **lots** of fruit and veg. Eat a little sweet food.")),
    EB("kitchen", "A healthy plate",
      SS("Half the plate is fruit and vegetables. These are the biggest part.", S("Biggest.", ["v", "🥗", 50, 60, 3, "pulse"])),
      SS("A quarter is starchy food, like rice or roti. A quarter is protein.", S("Medium.", ["r", "🍚", 30, 60, 3], ["p", "🫘", 70, 60, 3])),
      SS("Sweets, crisps and fats are only a tiny part, if any.", S("Tiny.", ["s", "🍬", 50, 62, 2]))),
    CHK(mc("Which should be the biggest part of a healthy plate?", "Fruit and vegetables", ["Sweets", "Crisps"], { hint: "Think of the rainbow plate.", why: "Fruit and vegetables should fill the biggest part.", tag: "healthy.chk3" })),
    H("Stop 2: Pack a lunch box"),
    SAY("Zainab packs her lunch box. She wants it healthy and tasty.", T("A **lunch box** can have food from each group.")),
    SAY("She picks roti with chicken, an apple, carrot sticks and a small yoghurt.", T("Roti, chicken, apple, carrots and yoghurt.")),
    MAN("Lunch box choices", "Move the foods. Healthy choices go in Pack it. Treats go in Sometimes.", "🍎", 8, ["Pack it", "Sometimes"]),
    SAY("Now you try. Plan a lunch box with a grown-up.", ACT("My lunch box", ["Paper and crayons", "A grown-up to help"], ["Draw a lunch box with four spaces.", "Fill one space from each food group.", "Choose water to drink."])),
    CHK(tf("A lunch box can have food from each group.", true, { hint: "Think of Zainab's lunch.", why: "A good lunch has food from each group.", tag: "healthy.chk4" })),
    SAY("Let us remember. Eat more fruit and veg and less sugar and fat.", SUM("Eat lots of fruit and vegetables", "Eat some starchy food and protein", "Eat only a little sugar and fat")),
    GLOSS({ lots: "A large amount.", "lunch box": "A box that holds food to eat at school.", sugar: "A sweet food ingredient that is in treats.", fat: "A part of food that gives energy. We need only a little.", plate: "A flat dish we eat from." }),
  ],
  mini: [
    mc("Which should we eat only a little of?", "Sweets", ["Vegetables", "Water"], { hint: "Think of treats.", why: "Sweets are a treat." }),
    tf("Half a healthy plate is fruit and vegetables.", true, { hint: "It is the biggest part.", why: "Fruit and vegetables fill half the plate." }),
    mc("Which is a healthy lunch box choice?", "An apple", ["A bar of chocolate", "A fizzy drink"], { hint: "Think about vitamins.", why: "An apple is a healthy snack." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const move = {
  id: "move", kind: "play", title: "Move and rest",
  blocks: [
    H("Stop 1: Exercise"),
    SAY("Exercise means moving our bodies. Running, skipping and cricket are all exercise.", T("**Exercise** keeps our bodies strong.")),
    EB("meadow", "Exercise and the heart",
      SS("Zainab runs across the field. Her legs and arms work hard.", S("Running.", ["z", "🏃", 40, 60, 3, "bounce"])),
      SS("Her heart beats faster. It pumps blood to her muscles.", S("A fast heart.", ["h", "❤️", 50, 55, 3, "pulse"])),
      SS("Exercise makes the heart and muscles stronger. It helps us feel happy too.", S("Strong.", ["m", "💪", 50, 58, 3, "bounce"]))),
    CHK(mc("What happens to our heart when we run?", "It beats faster", ["It stops", "It gets smaller"], { hint: "Feel your chest after running.", why: "The heart beats faster to pump blood to our muscles.", tag: "healthy.chk5" })),
    H("Stop 2: Rest and sleep"),
    SAY("Our bodies need rest. Sleep helps us grow and stay well.", T("**Sleep** helps us grow and learn.")),
    SAY("Play a memory game to warm up your brain. Then answer a question.", T("Play the game, then answer.")),
    SAY("Watch the pictures light up, then copy them.", BRAIN("remember_order", "Healthy day", "Watch the order, then copy it. It gets longer each time!", ["🏃", "🍎", "🧼", "😴"])),
    CHK(ms("Pick two things that help us stay healthy.", ["Sleep", "Exercise"], ["Late nights", "Sitting all day"], { hint: "Think about a healthy day.", why: "Sleep and exercise both help us stay healthy.", tag: "healthy.chk6" })),
    SAY("Let us remember. Exercise makes our heart strong. Sleep helps us grow.", SUM("Exercise makes our heart and muscles strong", "Our heart beats faster when we run", "Sleep helps us grow and learn")),
    GLOSS({ exercise: "Moving your body to keep it strong.", heart: "The part of the body that pumps blood.", muscles: "Parts of the body that help us move.", sleep: "Resting with your eyes closed at night.", routine: "Things you do in the same order each day." }),
  ],
  mini: [
    mc("Which is exercise?", "Skipping", ["Watching TV", "Lying in bed"], { hint: "Which one makes you move?", why: "Skipping is exercise." }),
    tf("We need sleep to help us grow.", true, { hint: "Think about bedtime.", why: "Sleep helps us grow and learn." }),
    mc("Which part of the body beats faster when we run?", "The heart", ["The nose", "The hair"], { hint: "Feel your chest.", why: "The heart beats faster when we run." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const germs = {
  id: "germs", kind: "use", title: "Germ busters",
  blocks: [
    H("Stop 1: Washing hands"),
    SAY("Germs are tiny living things. They are too small for us to see.", T("**Germs** can make us ill. We cannot see them.")),
    SAY("Germs spread from hands to food and faces. Washing hands stops them spreading.", T("Soap and water wash germs away.")),
    SAY("Soap lifts dirt and germs off our skin. Water rinses them away.", PHOTO(WASH, "Hands covered in soap suds being washed under a running tap in a sink", "Soap and running water wash germs away.", "Photo by Mélissa Jeanty on Unsplash")),
    EB("home", "Wash your hands",
      SS("First, wet your hands under running water.", S("Wet.", ["w", "🚰", 30, 55, 3, "pulse"], ["h", "🙌", 70, 62, 3])),
      SS("Rub soap on the front, back, thumbs and between your fingers.", S("Soap.", ["s", "🧼", 30, 55, 3, "pulse"], ["h", "🙌", 70, 62, 3, "bounce"])),
      SS("Scrub for about twenty seconds. Sing a short song to count.", S("Scrub.", ["t", "⏱️", 30, 55, 3, "pulse"], ["h", "🙌", 70, 62, 3, "bounce"])),
      SS("Rinse off the soap. Dry with a clean towel.", S("Rinse and dry.", ["r", "💧", 30, 55, 3], ["h", "🙌", 70, 62, 3]))),
    CHK(ord("Put the hand-washing steps in order.", ["Wet your hands", "Rub in soap", "Rinse with water", "Dry your hands"], { hint: "Wet comes first.", why: "Wet, soap, rinse, then dry.", tag: "healthy.chk7" })),
    H("Stop 2: Clean habits"),
    SAY("We wash our hands before eating and after the toilet. We cough into our elbow.", T("Cover coughs and sneezes with your elbow.")),
    SAY("We brush our teeth twice a day. Muslims also wash hands and face for wudu.", PHOTO(BRUSH, "An orange toothbrush with a line of green toothpaste on a yellow background", "Brushing twice a day keeps teeth clean.", "Photo by Tosan Dudun on Unsplash")),
    SAY("Clean habits keep us healthy and keep others healthy too.", T("Clean habits protect everyone.")),
    EB("home", "Healthy habits",
      SS("Zainab washes her hands before lunch every day.", S("Lunch.", ["z", "👧", 30, 58, 3], ["f", "🍽️", 70, 62, 3])),
      SS("She sneezes into her elbow, not into her hands.", S("Elbow.", ["z", "🤧", 40, 58, 3, "pulse"])),
      SS("At night she brushes her teeth. They stay clean and strong.", S("Teeth.", ["b", "🪥", 35, 58, 3], ["t", "🦷", 70, 58, 3, "pulse"]))),
    ACT("Germ buster poster", ["Paper and crayons", "A grown-up to help"], ["Draw your hands with soap bubbles.", "Write three times we wash our hands.", "Put the poster near the sink."]),
    CHK(tf("Soap and water wash germs away.", true, { hint: "Think about the sink.", why: "Soap lifts germs and water rinses them away.", tag: "healthy.chk8" })),
    SAY("Let us remember. Wash hands with soap. Cover coughs. Brush teeth twice a day.", SUM("Germs are tiny and can make us ill", "Wash hands with soap and water", "Cover coughs and brush teeth twice a day")),
    GLOSS({ germs: "Tiny living things that can make us ill.", soap: "Something that helps wash away dirt and germs.", wudu: "The washing Muslims do before prayer.", elbow: "The bend in the middle of your arm.", rinse: "To wash soap away with water.", habit: "Something you do again and again." }),
  ],
  mini: [
    mc("What do we use to wash away germs?", "Soap and water", ["Juice", "Sand"], { hint: "Think of the sink.", why: "Soap and water wash germs away." }),
    tf("We can see germs with our eyes.", false, { hint: "Are they big?", why: "Germs are far too small to see." }),
    mc("Where should we sneeze?", "Into our elbow", ["Into our hands", "At our friends"], { hint: "It stops germs spreading.", why: "Sneezing into an elbow stops germs spreading." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "Zainab fights the germs", backdrop: "kitchen", caption: "Zainab uses soap bubbles and a rainbow plate to stay healthy.",
  scenes: [
    { caption: "Healthy me.", say: "Zainab wants to stay healthy. She has a plan for each day.",
      items: [{ id: "z", emoji: "👧", label: "Zainab", x: 25, y: 58, size: 3, enter: "walk_right" }, { id: "p", emoji: "📋", x: 72, y: 50, size: 3, enter: "pop" }] },
    { caption: "Rainbow plate.", say: "At lunch she eats a rainbow plate. It has fruit, roti and daal.",
      items: [{ id: "a", emoji: "🍎", x: 25, y: 58, size: 2 }, { id: "b", emoji: "🍞", x: 50, y: 58, size: 2 }, { id: "c", emoji: "🫘", x: 75, y: 58, size: 2 }] },
    { caption: "Water.", say: "She drinks water. Fizzy drinks are not for every day.",
      items: [{ id: "w", emoji: "💧", label: "water", x: 40, y: 56, size: 3, anim: "bounce" }, { id: "f", emoji: "🥤", x: 72, y: 58, size: 2 }] },
    { caption: "Exercise.", say: "After school she runs in the park. Her heart beats faster.",
      items: [{ id: "r", emoji: "🏃", x: 35, y: 58, size: 3, anim: "bounce" }, { id: "h", emoji: "❤️", x: 72, y: 50, size: 3, anim: "pulse" }] },
    { caption: "Germs!", say: "Tiny germs sit on the door handle. Zainab cannot see them.",
      items: [{ id: "g", emoji: "🦠", label: "germs", x: 40, y: 52, size: 3, anim: "pulse" }, { id: "d", emoji: "🚪", x: 72, y: 56, size: 3 }] },
    { caption: "Soap bubbles.", say: "She washes her hands with soap and water. The germs wash away!",
      items: [{ id: "s", emoji: "🧼", x: 30, y: 54, size: 3, effect: "sparkle" }, { id: "h", emoji: "🙌", x: 72, y: 60, size: 3 }] },
    { caption: "Clean teeth.", say: "At night she brushes her teeth. Then she goes to sleep.",
      items: [{ id: "b", emoji: "🪥", x: 30, y: 56, size: 3 }, { id: "t", emoji: "🦷", x: 72, y: 56, size: 3, effect: "glow" }] },
    { caption: "A good night.", say: "Sleep helps her grow. Alhamdulillah, she feels well and strong!",
      items: [{ id: "z", emoji: "😴", x: 35, y: 58, size: 3, anim: "float" }, { id: "h", emoji: "🌙", x: 72, y: 35, size: 3, effect: "hearts" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- food (q1-q8)
  Q("food", "apply", "healthy.group_match", mat("Match each food to its group.", [["Apple", "Fruit and veg"], ["Rice", "Starchy food"], ["Chicken", "Protein"]], { hint: "Think about the four groups.", why: "An apple is fruit, rice is starchy food and chicken is protein." }),
    mat("Join each food to its group.", [["Carrot", "Fruit and veg"], ["Roti", "Starchy food"], ["Yoghurt", "Dairy"]], { hint: "Think about the four groups.", why: "A carrot is a vegetable, roti is starchy food and yoghurt is dairy." })),
  Q("food", "recall", "healthy.daal_group", mc("Which food group does daal belong to?", "Protein", ["Fruit", "Dairy"], { hint: "Daal is made of lentils.", why: "Daal is a protein food." }),
    mc("Which group does a boiled egg belong to?", "Protein", ["Starchy food", "Fruit and veg"], { hint: "Eggs help us grow.", why: "An egg is a protein food." })),
  Q("food", "recall", "healthy.dairy_tf", tf("Milk and yoghurt are dairy foods.", true, { hint: "They both come from milk.", why: "Dairy foods are made from milk." }),
    tf("Rice is a dairy food.", false, { hint: "Does rice come from milk?", why: "Rice is a starchy food, not dairy." })),
  Q("food", "reason", "healthy.fizzy_snack", mc("Zayn says a fizzy drink is a good snack every day. Is he right?", "No, fizzy drinks are a treat. Water is better", ["Yes, fizzy drinks are healthy", "Yes, they give us vitamins"], { hint: "Think about sugar.", why: "Fizzy drinks have lots of sugar, so they are only for sometimes." }),
    mc("Hana says sweet squash is the best drink. Is she right?", "No, water is the best drink", ["Yes, squash is healthier than water", "Yes, squash has lots of vitamins"], { hint: "Think about water.", why: "Water is the best drink for our bodies." })),
  Q("food", "apply", "healthy.plants_ms", ms("Which two foods come from plants? Pick two.", ["A mango", "Spinach"], ["Cheese", "An egg"], { hint: "Think about what grows from the ground or on trees.", why: "Mangoes and spinach come from plants." }),
    ms("Which two of these foods come from plants? Pick two.", ["A carrot", "Chapati"], ["Fish", "Milk"], { hint: "Chapati is made from wheat.", why: "Carrots and wheat come from plants." })),
  Q("food", "apply", "healthy.rainbow_fill", fill("Finish the sentences about a healthy plate.", "We should eat lots of fruit and {b1}. A rainbow plate has many {b2}.", [["vegetables", "sweets", "crisps"], ["colours", "spoons", "chairs"]], { hint: "Think about colour.", why: "A healthy plate has lots of fruit and vegetables in many colours." }),
    fill("Finish the sentences about protein.", "Meat, fish, eggs and daal are {b1} foods. They help our bodies {b2}.", [["protein", "fizzy", "sticky"], ["grow", "freeze", "shrink"]], { hint: "Think about growing.", why: "Protein foods help our bodies grow." })),
  Q("food", "reason", "healthy.sweets_all_day", mc("Sam says sweets are fine to eat all day. Is he right?", "No, sweets are a treat in small amounts", ["Yes, sweets are healthy", "Yes, they give us vitamins"], { hint: "Think about treats.", why: "Sweets are for sometimes in small amounts." }),
    mc("Ali says crisps are as healthy as an apple. Is he right?", "No, an apple has vitamins. Crisps are a treat", ["Yes, they are the same", "Yes, crisps have more vitamins"], { hint: "Think about vitamins.", why: "Apples are healthy. Crisps are a treat." })),
  Q("food", "apply", "healthy.fruit_tap", hot("Tap the food that is a fruit.", [["🥕", "Carrot", 22, 50], ["🍌", "Banana", 50, 50], ["🍞", "Bread", 78, 50]], ["Banana"], { labels: true, hint: "It grows on a plant and is sweet.", why: "A banana is a fruit." }),
    hot("Tap the dairy food.", [["🥛", "Milk", 22, 50], ["🍎", "Apple", 50, 50], ["🍚", "Rice", 78, 50]], ["Milk"], { labels: true, hint: "Dairy comes from milk.", why: "Milk is a dairy food." })),
  // ----- amounts (q9-q16)
  Q("amounts", "apply", "healthy.lunch_count", num("Zainab's lunch box has 3 pieces of fruit and 2 vegetable sticks. How many pieces of fruit and veg is that?", 5, { hint: "3 + 2.", why: "3 + 2 = 5 pieces." }),
    num("Bilal's lunch box has 4 pieces of fruit and 3 vegetable sticks. How many pieces is that?", 7, { hint: "4 + 3.", why: "4 + 3 = 7 pieces." })),
  Q("amounts", "apply", "healthy.day_order", ord("Put the meals of the day in order.", ["Breakfast", "School snack", "Lunch", "Dinner"], { hint: "Breakfast comes first.", why: "We eat breakfast, a snack, lunch, then dinner." }),
    ord("Put these in order through the day.", ["Wake up", "Breakfast", "School lunch", "Supper"], { hint: "Waking up comes first.", why: "Wake up, then breakfast, then lunch, then supper." })),
  Q("amounts", "apply", "healthy.portions_sld", sld("Zainab eats 5 portions of fruit and veg each day. Slide to show how many portions in 2 days.", { min: 0, max: 12, unit: "portions" }, 10, 0, { hint: "5 + 5.", why: "5 + 5 = 10 portions." }),
    sld("Hamza eats 3 portions of fruit and veg each day. Slide to show how many portions in 3 days.", { min: 0, max: 12, unit: "portions" }, 9, 0, { hint: "3 + 3 + 3.", why: "3 + 3 + 3 = 9 portions." })),
  Q("amounts", "reason", "healthy.equal_amounts", mc("Omar says healthy means eating equal amounts of every food. Is he right?", "No, we eat more of some foods and less of others", ["Yes, equal amounts of everything", "Yes, no food is better than another"], { hint: "Think about the plate.", why: "We eat lots of fruit and veg and only a little sugar." }),
    mc("Layla says we should eat as many sweets as vegetables. Is she right?", "No, vegetables should fill much more of the plate", ["Yes, the same amount", "Yes, sweets are vegetables"], { hint: "Think about the plate.", why: "Vegetables should be a big part of the plate." })),
  Q("amounts", "reason", "healthy.all_fat", mc("Layla says all fat is bad. Is she right?", "No, our bodies need a little fat, for example from fish and nuts", ["Yes, all fat is harmful", "Yes, fat is poison"], { hint: "Think about fish and nuts.", why: "We need a little fat, but not too much." }),
    mc("Mira says we should never eat any fat. Is she right?", "No, small amounts help our bodies", ["Yes, never", "Yes, fat turns into stone"], { hint: "Think about a balanced diet.", why: "Small amounts of fat are part of a healthy diet." })),
  Q("amounts", "apply", "healthy.amount_match", mat("Match each food to how much we should eat.", [["Fruit and vegetables", "Lots"], ["Sweets", "A little"], ["Water", "Lots through the day"]], { hint: "Think about the plate.", why: "Eat lots of fruit and veg and drink water, but only a little sweet food." }),
    mat("Join each food to how much we should eat.", [["Rice and roti", "Some"], ["Fizzy drinks", "A little"], ["Daal and fish", "Some"]], { hint: "Think about the plate.", why: "Eat some starchy food and protein, but only a little sugary drink." })),
  Q("amounts", "apply", "healthy.fruit_count", num("Hamza eats 2 apples and 3 bananas in a day. How many fruits is that?", 5, { hint: "2 + 3.", why: "2 + 3 = 5 fruits." }),
    num("Aisha eats 4 oranges and 2 pears. How many fruits is that?", 6, { hint: "4 + 2.", why: "4 + 2 = 6 fruits." })),
  Q("amounts", "apply", "healthy.balance_fill", fill("Finish the sentences about a balanced plate.", "A balanced plate is mostly {b1}. We eat sweets only {b2}.", [["vegetables", "sweets", "crisps"], ["sometimes", "always", "twice a meal"]], { hint: "Think about the plate.", why: "A balanced plate is mostly vegetables, and sweets are for sometimes." }),
    fill("Finish the sentences about drinks.", "The best drink is {b1}. Fizzy drinks are a {b2}.", [["water", "cola", "squash"], ["treat", "must", "medicine"]], { hint: "Think about drinks.", why: "Water is best and fizzy drinks are a treat." })),
  // ----- move (q17-q23)
  Q("move", "apply", "healthy.minutes_sld", sld("Zainab runs for 20 minutes each day for 3 days. Slide to show the total minutes.", { min: 0, max: 100, unit: "minutes" }, 60, 0, { hint: "20 + 20 + 20.", why: "20 + 20 + 20 = 60 minutes." }),
    sld("Hamza runs for 10 minutes each day for 5 days. Slide to show the total minutes.", { min: 0, max: 100, unit: "minutes" }, 50, 0, { hint: "Count in tens.", why: "5 x 10 = 50 minutes." })),
  Q("move", "apply", "healthy.heart_tf", tf("Our heart beats faster when we run.", true, { hint: "Feel your chest after running.", why: "The heart pumps faster to give our muscles blood." }),
    tf("Our heart stops beating when we run.", false, { hint: "Feel your chest after running.", why: "The heart never stops. It beats faster." })),
  Q("move", "recall", "healthy.heart_st", st("What part of the body pumps blood around us?", ["heart", "the heart"], { hint: "It beats in your chest.", why: "The heart pumps blood." }),
    st("What do we need at night to help our bodies grow?", ["sleep", "rest"], { hint: "We do it in bed.", why: "Sleep helps us grow." })),
  Q("move", "reason", "healthy.only_fit", mc("Aisha says only fit people are healthy. Is she right?", "No, everyone can be healthy by eating well, moving and resting", ["Yes, only sports stars are healthy", "Yes, healthy means being very fast"], { hint: "Think about the three habits.", why: "Healthy habits help everyone, not only fast runners." }),
    mc("Hamza says exercise is only for sports stars. Is he right?", "No, everyone's body is stronger with exercise", ["Yes, only stars need it", "Yes, children should not move"], { hint: "Think about the playground.", why: "Exercise helps every body." })),
  Q("move", "reason", "healthy.never_ill", mc("Ali says healthy people never get ill. Is he right?", "No, anyone can get ill, but healthy habits help our bodies fight illness", ["Yes, healthy people never get ill", "Yes, illness only comes to lazy people"], { hint: "Think about colds.", why: "Healthy habits help, but anyone can get ill." }),
    mc("Nina says if you wash your hands you can never catch a cold. Is she right?", "No, handwashing helps a lot, but we can still catch colds", ["Yes, never", "Yes, soap stops all colds"], { hint: "Think about germs.", why: "Washing hands helps, but it cannot stop every illness." })),
  Q("move", "apply", "healthy.routine_order", ord("Put a healthy day in order.", ["Wake up and wash", "Eat breakfast", "Play outside", "Go to sleep"], { hint: "Waking up comes first.", why: "Wake, eat, play, then sleep." }),
    ord("Arrange the day, morning to night.", ["Pray and wash", "Go to school", "Run in the park", "Brush teeth and sleep"], { hint: "Morning comes first.", why: "Morning routine first, bedtime last." })),
  Q("move", "apply", "healthy.rest_ms", ms("Which two help us rest well? Pick two.", ["A quiet bedtime", "Enough sleep"], ["Loud music", "Playing games late"], { hint: "Think about bedtime.", why: "A quiet bedtime and enough sleep help us rest." }),
    ms("Which two help our heart stay strong? Pick two.", ["Running", "Skipping"], ["Lying down all day", "Eating sweets"], { hint: "Think about moving.", why: "Running and skipping make the heart strong." })),
  // ----- germs (q24-q30)
  Q("germs", "apply", "healthy.wash_order", ord("Put the steps of washing hands in order.", ["Wet your hands", "Rub in soap", "Scrub for twenty seconds", "Rinse and dry"], { hint: "Wet comes first.", why: "Wet, soap, scrub, then rinse and dry." }),
    ord("Put these steps in order.", ["Turn on the tap", "Add soap", "Rub all over", "Dry with a clean towel"], { hint: "Turn on the tap first.", why: "Tap, soap, rub, then dry." })),
  Q("germs", "apply", "healthy.when_wash", mc("When should we wash our hands?", "Before eating and after the toilet", ["Only on Fridays", "Never"], { hint: "Think about germs on hands.", why: "We wash before eating and after the toilet." }),
    mc("Which is a good time to wash our hands?", "After playing outside", ["Only when they hurt", "Never"], { hint: "Think about dirt.", why: "Hands pick up germs outside." })),
  Q("germs", "reason", "healthy.water_alone", mc("Zainab says water alone washes germs off. Is she right?", "No, soap helps lift germs and dirt away", ["Yes, water is enough", "Yes, soap makes germs grow"], { hint: "Think about soap bubbles.", why: "Soap and rubbing remove germs better than water alone." }),
    mc("Hamza says rinsing for one second is enough. Is he right?", "No, we should scrub with soap for about twenty seconds", ["Yes, one second is enough", "Yes, germs jump off at once"], { hint: "Think about scrubbing.", why: "We should scrub for about twenty seconds." })),
  Q("germs", "reason", "healthy.look_dirty", mc("Hamza says you only need to wash your hands when they look dirty. Is he right?", "No, germs are too small to see", ["Yes, clean-looking hands are always clean", "Yes, germs are big"], { hint: "Can you see germs?", why: "Germs are too small to see, so hands can look clean and still have germs." }),
    mc("Sana says clean-looking hands have no germs. Is she right?", "No, germs are far too tiny to see", ["Yes, no germs on clean hands", "Yes, germs only live on dirt"], { hint: "Can you see germs?", why: "Hands can look clean and still carry germs." })),
  Q("germs", "recall", "healthy.germs_st", st("What do we call tiny living things that can make us ill?", ["germs", "germ"], { hint: "It starts with a g.", why: "Tiny living things that make us ill are called germs." }),
    st("What word means tiny living things that spread illness?", ["germs", "germ"], { hint: "It starts with a g.", why: "Germs are tiny and can make us ill." })),
  Q("germs", "apply", "healthy.clean_tap", hot("Tap the thing that helps clean our teeth.", [["🪥", "Toothbrush", 22, 50], ["🍬", "Sweets", 50, 50], ["🥤", "Fizzy drink", 78, 50]], ["Toothbrush"], { labels: true, hint: "We use it every morning and night.", why: "A toothbrush cleans our teeth." }),
    hot("Tap what we use to wash away germs.", [["🧼", "Soap", 22, 50], ["🍫", "Chocolate", 50, 50], ["🧃", "Juice", 78, 50]], ["Soap"], { labels: true, hint: "We use it at the sink.", why: "Soap washes germs away." })),
  Q("germs", "apply", "healthy.wudu_tf", tf("Wudu is a good habit because it washes our hands and face.", true, { hint: "Think about washing before prayer.", why: "Wudu keeps hands and face clean." }),
    tf("Brushing teeth once a month is enough.", false, { hint: "Think about twice a day.", why: "We should brush our teeth twice a day." })),
];

export const topics = [
  topicLesson({
    slug: "science-class-1-healthy-me", subject: "science", cls: 1, topic: 8, title: "Healthy Me",
    summary: "How food, exercise, sleep and washing keep our bodies healthy.",
    unit: "Topic 8: Healthy me", difficulty: 1,
    objectives: ["Name types of food and how much to eat", "Explain why we need exercise and sleep", "Wash hands properly and keep clean"],
    success_criteria: ["I can name the four food groups", "I know why exercise and sleep matter", "I can wash my hands properly"],
    real_life: "Packing a school lunch with daal, roti and fruit chaat, and washing hands before meals.",
    standards: [NC("Y2 animals incl. humans", "Describe the importance for humans of exercise, eating the right amounts of different types of food, and hygiene")],
    warm_up: [
      mc("What is the best drink?", "Water", ["Cola", "Sugary squash"], { hint: "It has nothing added.", why: "Water is the best drink." }),
      tf("Fruit is good for us.", true, { hint: "Think of apples.", why: "Fruit has vitamins." }),
      mc("What do we use to wash our hands?", "Soap and water", ["Sand", "Paper"], { hint: "At the sink.", why: "Soap and water wash hands." }),
    ],
    intro: [],
    subs: [food, amounts, move, germs],
    clip,
    quiz,
  }),
];
