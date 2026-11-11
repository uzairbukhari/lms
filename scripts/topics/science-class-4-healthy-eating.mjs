import { SAY, SS, H, T, IMG, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, S, GLOSS, PHOTO, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";
import { EB, Q, NC, CAM } from "./_science-kit.mjs";

// Science Class 4, topic 11: Healthy Eating and Nutrition (age 9-10). Enquiry types: research using secondary sources, comparative test.
const VEG = "science-class-4-healthy-eating-1-58e048ea.jpg";
const PLATE = "science-class-4-healthy-eating-2-6712e260.jpg";
const GRAIN = "science-class-4-healthy-eating-3-49452654.jpg";

// ---------------------------------------------------------------------------------------------- 1. learn
const food = {
  id: "food", kind: "learn", title: "What is in food?",
  blocks: [
    H("Welcome, young scientist!"),
    SAY("Welcome, young scientist! Today we explore what is in our food. We also read labels and build a balanced plate.", T("Today we explore **nutrients** and healthy eating.")),
    IMG("🥦🍞🥛", "Fruit and vegetables, bread and milk."),
    H("Stop 1: Nutrients"),
    SAY("Food gives us nutrients. Carbohydrates give us energy. Protein helps us grow and repair. Fats store energy. Vitamins and minerals keep us healthy.", T("**Carbohydrates** give energy. **Protein** helps growth and repair.")),
    SAY("Fibre helps our digestion, and water is essential for life. These vegetables give us vitamins, minerals and fibre.", PHOTO(VEG, "Carrots, mushrooms, a pepper, an onion and a tomato on a wooden table", "Vegetables give vitamins, minerals and fibre.", "Photo by engin akyurt on Unsplash")),
    EB("home", "What nutrients do",
      SS("Bread, rice and roti are carbohydrates. They give us energy to run and play.", S("Carbohydrates: energy.", ["a", "🍞", 30, 50, 3, "none"], ["b", "🍚", 70, 50, 3, "pulse"])),
      SS("Eggs, fish and daal have protein. It helps us grow and repair our muscles.", S("Protein: growth and repair.", ["a", "🥚", 30, 50, 3, "none"], ["b", "🐟", 70, 50, 3, "pulse"]))),
    CHK(mc("Which nutrient gives us energy to be active?", "Carbohydrates", ["Fibre", "Calcium"], { hint: "Rice, roti and bread.", why: "Carbohydrates give us energy." })),
    H("Stop 2: Plants make food"),
    SAY("Plants are producers. They make their own food in their leaves, using sunlight. Animals cannot, so they eat plants or other animals.", T("Plants are **producers**: they make their own food.")),
    IMG("🌱☀️🐄", "Plants make food. Animals eat plants."),
    CHK(tf("Animals can make their own food from sunlight.", false, { hint: "Only plants can.", why: "Animals must eat plants or other animals." })),
    SAY("Remember. Food gives us nutrients. A mix of foods gives us what our bodies need.", SUM("Carbohydrates give energy", "Protein helps growth and repair", "Plants make food. Animals eat it")),
    GLOSS({ nutrients: "Substances in food that our bodies need.", carbohydrates: "Nutrients that give us energy, such as rice and bread.", protein: "A nutrient that helps us grow and repair, found in eggs and daal.", fats: "A nutrient that stores energy.", vitamins: "Nutrients that keep us healthy.", fibre: "Helps our digestion, found in fruit and vegetables.", producers: "Plants, because they make their own food." }),
  ],
  mini: [
    mc("Which food is rich in protein?", "Eggs", ["Sweets", "Squash"], { hint: "Growth and repair.", why: "Eggs are a good source of protein." }),
    tf("Fibre helps our digestion.", true, { hint: "Think of vegetables.", why: "Fibre helps food move through the body." }),
    mat("Match each food to its group.", [["Rice", "Carbohydrates"], ["Fish", "Protein"], ["Milk", "Dairy"]], { hint: "Think of what each gives.", why: "Rice is a carbohydrate, fish is protein and milk is dairy." }),
    mc("Why do we drink water?", "Our bodies need it to work", ["It gives energy", "It makes bones"], { hint: "We lose water every day.", why: "Our bodies need water to work." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 2. try
const label = {
  id: "label", kind: "try", title: "Read the label",
  blocks: [
    H("Stop 1: Nutrition information"),
    SAY("Most packed foods have a label. It shows how much fat, sugar and salt is in 100 grams. That helps us compare foods fairly.", T("A **label** shows nutrition information per 100 grams.")),
    EB("home", "A snack label",
      SS("Snack A has 18 grams of sugar in every 100 grams. That is a lot.", S("Snack A: 18 g sugar.", ["a", "🍫", 30, 50, 3, "none", "18 g"], ["b", "🍪", 70, 50, 3, "none", "7 g"])),
      SS("Snack B has only 7 grams of sugar in 100 grams. Snack B has less sugar.", S("Snack B: 7 g sugar.", ["a", "🍫", 30, 50, 3, "none", "18 g"], ["b", "🍪", 70, 50, 3, "pulse", "7 g"]))),
    CHK(mc("Why are labels given per 100 grams?", "So we can compare foods fairly", ["To make food heavier", "To hide the sugar"], { hint: "Same amount for each food.", why: "Per 100 g makes comparisons fair." })),
    H("Stop 2: Compare foods"),
    SAY("Compare two snacks by looking at sugar, fat and salt. Red means high, amber is medium and green means low. Check the serving size too.", T("Traffic light colours show if a food is **high** or low in fat, sugar and salt.")),
    MAN("Sort the snacks", "Sort the foods into a lot of sugar and less sugar.", "🍬", 8, ["A lot of sugar", "Less sugar"]),
    ACT("Label detective", ["Clean food packets or pictures of labels", "Paper and a pencil"], ["Find the sugar amount per 100 g on two snacks.", "Which has more sugar?", "Look at the serving size. How much sugar in one serving?", "Write which snack you would choose and why."]),
    CHK(tf("Drinks can have a lot of hidden sugar.", true, { hint: "Check the label.", why: "Many fizzy and juice drinks have a lot of sugar." })),
    SAY("Remember. Labels help us compare foods. Hidden sugar, fat and salt can add up, so check the label.", SUM("Labels show nutrients per 100 g", "Red means high, green means low", "Check serving sizes too")),
    GLOSS({ label: "A sign on a food packet with information.", high: "A large amount of something.", compare: "To see what is the same and different.", portion: "The amount of food you eat at one time.", sugar: "A sweet nutrient that gives quick energy.", salt: "A mineral that makes food taste better but is harmful in large amounts." }),
  ],
  mini: [
    num("A snack has 9 g of sugar per 100 g. How much sugar is in 200 g?", 18, { hint: "Double 9.", why: "9 x 2 = 18 g." }),
    mc("Green on a label means...", "low", ["high", "medium"], { hint: "Like a traffic light.", why: "Green means low." }),
    tf("A serving size can be different from 100 grams.", true, { hint: "Check the pack.", why: "Servings are often different from 100 g." }),
    ord("Put the steps in order.", ["Find the label", "Read the sugar", "Compare two foods", "Choose the better one"], { hint: "Read first.", why: "Find, read, compare and choose." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 3. play
const plate = {
  id: "plate", kind: "play", title: "Build a plate",
  blocks: [
    H("Stop 1: A balanced plate"),
    SAY("A balanced diet has a mix of foods in the right amounts. The biggest parts are fruit and vegetables, and starchy foods such as rice, roti and bread.", T("A **balanced diet** has the right amounts of different foods.")),
    SAY("This colourful spread of fruit and vegetables should fill a big part of the plate. Protein and dairy are smaller parts. Oils and sweet treats are the smallest.", PHOTO(PLATE, "A ring of colourful fruit and vegetables around a wooden board", "Fruit and vegetables should fill a big part of the plate.", "Photo by engin akyurt on Unsplash")),
    CHK(mc("Which foods should make up the biggest parts of the plate?", "Fruit, vegetables and starchy foods", ["Sweets and oils", "Only protein"], { hint: "Think of roti, rice and salad.", why: "Fruit, vegetables and starchy foods fill most of the plate." })),
    H("Stop 2: Plan a day"),
    SAY("Plan meals for a day. For sehri or breakfast, try wholegrain bread and yoghurt. For iftar, dates and water, then roti, daal and sabzi.", T("Aim for **five a day**: five portions of fruit and vegetables.")),
    EB("home", "A balanced day",
      SS("Breakfast: wholegrain bread, an egg and a tomato.", S("Breakfast.", ["a", "🍞", 25, 50, 3, "none"], ["b", "🥚", 50, 50, 3, "none"], ["c", "🍅", 75, 50, 3, "none"])),
      SS("Dinner: roti, daal and vegetables. A mix of food groups.", S("Dinner.", ["a", "🫓", 25, 50, 3, "none"], ["b", "🍲", 50, 50, 3, "pulse"], ["c", "🥗", 75, 50, 3, "none"]))),
    SAY("Flip the cards and find the matching pairs. A little brain break!", BRAIN("memory_match", "Food match", "Find the matching pairs.", ["🥦", "🍞", "🥚", "🥛", "🍎", "🐟"])),
    CHK(num("A child has eaten 3 portions of fruit and vegetables. How many more to reach five a day?", 2, { hint: "5 minus 3.", why: "5 - 3 = 2 more." })),
    SAY("Remember. A balanced diet means the right amounts, not equal amounts. Treats are fine in small amounts.", SUM("Fill most of the plate with fruit, vegetables and starchy foods", "Have smaller amounts of protein and dairy", "Have only a little oil, sugar and salt")),
    GLOSS({ "balanced diet": "A mix of foods in the right amounts.", "five a day": "Five portions of fruit and vegetables each day.", starchy: "Foods such as rice, roti and bread that give energy.", dairy: "Foods made from milk, such as yoghurt.", treats: "Foods we enjoy sometimes in small amounts." }),
  ],
  mini: [
    mc("Which is a starchy food?", "Roti", ["An apple", "Milk"], { hint: "Think of energy foods.", why: "Roti is a starchy food." }),
    tf("Treats should fill the biggest part of the plate.", false, { hint: "Small amounts.", why: "Treats are small parts of a balanced diet." }),
    mc("Which is a dairy food?", "Yoghurt", ["Rice", "Carrot"], { hint: "From milk.", why: "Yoghurt is a dairy food." }),
    mc("A good iftar drink for water balance is...", "water", ["fizzy cola", "energy drinks"], { hint: "Our bodies need it.", why: "Water is best for the body." }),
  ],
};

// ---------------------------------------------------------------------------------------------- 4. use
const farm = {
  id: "farm", kind: "use", title: "Food from field to plate",
  blocks: [
    H("Stop 1: Where food comes from"),
    SAY("Much of our food starts as a plant. Wheat grows in a field. It is made into flour for bread and roti.", T("Many foods come from **crops** grown in fields.")),
    SAY("Wheat grains are ground into flour. Seasonal food is picked at its best time of year, and local food travels fewer food miles.", PHOTO(GRAIN, "A loaf of rustic bread beside a pile of wheat grains", "Wheat grains become flour and bread.", "Photo by Ca D. on Unsplash")),
    CHK(mc("Which food is made from wheat?", "Bread", ["Butter", "Cheese"], { hint: "Flour.", why: "Bread is made from wheat flour." })),
    H("Stop 2: Not all fat is bad"),
    SAY("Our bodies need some fat for energy and to take in some vitamins. Too much fat is the problem, not all fat.", T("Some **fat** is needed. Too much is not healthy.")),
    IMG("🥜🫒🐟", "Nuts, olive oil and fish have healthy fats."),
    REVEAL("Is a ready meal always worse than a home-cooked meal? Have a think first.", "Not always, but ready meals can have more salt, fat or sugar. Read the label and compare."),
    CHK(tf("Our bodies need a small amount of fat.", true, { hint: "Energy and vitamins.", why: "Some fat is an essential part of a healthy diet." })),
    SAY("You can grow vegetables yourself, even in pots. Fresh food from your own garden has no food miles at all.", IMG("🪴🥕🍅", "Growing your own vegetables in pots.")),
    SAY("Remember. Food comes from plants and animals. All nutrients matter, in the right amounts.", SUM("Food comes from plants and animals", "Seasonal and local food is a good choice", "Some fat is needed, but not too much")),
    GLOSS({ crops: "Plants grown for food, such as wheat.", fat: "A nutrient that stores energy. We need a little.", seasonal: "Food picked at its best time of year.", "food miles": "How far food travels to reach us.", ingredient: "One of the foods that go into a dish." }),
  ],
  mini: [
    mc("Local food usually has...", "fewer food miles", ["more packaging", "more sugar"], { hint: "It travels less.", why: "Local food travels a short distance." }),
    tf("You can grow some vegetables yourself.", true, { hint: "Think of a garden.", why: "Many vegetables can be grown at home." }),
    mc("Which is a source of healthy fat?", "Nuts", ["Sweets", "Squash"], { hint: "A crunchy food.", why: "Nuts have healthy fats." }),
    mc("Which is a good ingredient for a nutrient-rich meal?", "Lentils", ["Sugar only", "Fizzy drink"], { hint: "Daal.", why: "Lentils give protein and fibre." }),
  ],
};

// ---------------------------------------------------------------------------------------------- clip
const clip = {
  title: "The canteen robot", backdrop: "classroom", caption: "A canteen robot learns why bread is big and sweets are small.",
  scenes: [
    { caption: "A canteen robot.", say: "A school canteen robot wants to build a plate. It has lots of food.",
      items: [{ id: "r", emoji: "🤖", label: "robot", x: 25, y: 56, size: 3, enter: "walk_right" }, { id: "t", emoji: "🍽️", x: 72, y: 46, size: 3, enter: "pop" }] },
    { caption: "Sweets first!", say: "The robot piles on sweets. Is that a good plate? Not really.",
      items: [{ id: "s", emoji: "🍬", label: "too many sweets", x: 50, y: 46, size: 3, anim: "bounce" }] },
    { caption: "Big vegetables.", say: "Now it adds lots of fruit and vegetables. They fill a big part of the plate.",
      items: [{ id: "v", emoji: "🥦", label: "fruit and veg", x: 35, y: 50, size: 3, enter: "pop" }, { id: "f", emoji: "🍎", x: 65, y: 50, size: 3, enter: "pop" }] },
    { caption: "Starchy food.", say: "Next, roti and rice. They give energy to learn and play.",
      items: [{ id: "r", emoji: "🫓", label: "starchy food", x: 35, y: 50, size: 3 }, { id: "c", emoji: "🍚", x: 65, y: 50, size: 3, effect: "sparkle" }] },
    { caption: "Protein and dairy.", say: "A smaller share of daal, eggs and yoghurt helps muscles grow.",
      items: [{ id: "d", emoji: "🍲", label: "protein", x: 35, y: 50, size: 3 }, { id: "y", emoji: "🥛", label: "dairy", x: 65, y: 50, size: 3 }] },
    { caption: "A tiny treat.", say: "And one small treat. A little bit is fine.",
      items: [{ id: "t", emoji: "🍪", label: "small treat", x: 50, y: 46, size: 2, effect: "glow" }] },
    { caption: "Water to drink.", say: "The robot adds a glass of water. Our bodies need water every day.",
      items: [{ id: "w", emoji: "💧", label: "water", x: 50, y: 46, size: 3, effect: "sparkle" }] },
    { caption: "A balanced plate!", say: "A balanced plate. Big bread, big vegetables, small sweets. Well done, robot!",
      items: [{ id: "r", emoji: "🤖", x: 30, y: 56, size: 3, anim: "bounce" }, { id: "p", emoji: "🍽️", x: 70, y: 46, size: 3, effect: "hearts" }] },
  ],
};

// ---------------------------------------------------------------------------------------------- quiz
const quiz = [
  // ----- learn (q1-q8)
  Q("food", "recall", "food.energy", tf("Carbohydrates give us energy.", true, { hint: "Think of rice and roti.", why: "Carbohydrates are our main source of energy." }),
    tf("Fibre gives the body most of its energy.", false, { hint: "Fibre helps digestion.", why: "Fibre helps digestion. Carbohydrates give energy." })),
  Q("food", "recall", "food.jobs", mc("Which nutrient helps our muscles grow and repair?", "Protein", ["Fibre", "Water"], { hint: "Eggs, fish and daal.", why: "Protein helps growth and repair." }),
    mc("Which nutrient is found in milk and helps build strong bones?", "Calcium", ["Sugar", "Salt"], { hint: "Dairy foods.", why: "Calcium builds bones and teeth." })),
  Q("food", "reason", "food.good_bad", mc("Sam says some foods are good and some are bad. Is he right?", "No. Every food has nutrients. What matters is the amount and how often we eat it", ["Yes, some foods are always bad", "Yes, only vegetables are good"], { hint: "Think about amounts.", why: "No food is good or bad by itself. A balance matters." }),
    mc("Mina says chocolate is a bad food and must never be eaten. Is she right?", "No. A small amount now and then is fine in a balanced diet", ["Yes, never eat it", "Yes, it has no nutrients at all"], { hint: "Think about amounts.", why: "Treats are fine in small amounts." })),
  Q("food", "apply", "food.fill_carbs", fill("Complete the sentence about rice and bread.", "Rice and bread are rich in {b1}, which give us {b2}.", [["carbohydrates", "vitamins", "oil"], ["energy", "bones", "noise"]], { hint: "Starchy foods.", why: "Rice and bread are carbohydrates, which give energy." }),
    fill("Complete the sentence about milk.", "Milk and yoghurt give us {b1} for strong {b2}.", [["calcium", "sugar", "salt"], ["bones", "hair", "shoes"]], { hint: "Dairy foods.", why: "Dairy foods give calcium for strong bones." })),
  Q("food", "apply", "food.protein_hot", hot("Tap the food that is a good source of protein.", [["🥚", "Eggs", 22, 50], ["🍬", "Sweets", 50, 50], ["🍞", "Bread", 78, 50]], ["Eggs"], { labels: true, hint: "Growth and repair.", why: "Eggs are rich in protein." }),
    hot("Tap the food that gives calcium.", [["🥛", "Milk", 22, 50], ["🍬", "Sweets", 50, 50], ["🥤", "Cola", 78, 50]], ["Milk"], { labels: true, hint: "Dairy.", why: "Milk gives calcium." })),
  Q("food", "apply", "food.portions", num("A child eats 5 portions of fruit and vegetables a day. How many portions is that in 7 days?", 35, { hint: "5 times 7.", why: "5 x 7 = 35 portions." }),
    num("A child eats 4 portions of fruit a day. How many portions is that in 5 days?", 20, { hint: "4 times 5.", why: "4 x 5 = 20 portions." })),
  Q("food", "apply", "food.carb_foods", ms("Which two are carbohydrate foods? Pick two.", ["Rice", "Roti"], ["Chicken", "Eggs"], { hint: "Starchy foods.", why: "Rice and roti are carbohydrate foods." }),
    ms("Which two are protein foods? Pick two.", ["Lentils", "Fish"], ["Rice", "Bread"], { hint: "Growth and repair.", why: "Lentils and fish are rich in protein." })),
  Q("food", "reason", "food.water", mc("Ali says water is not important because it has no nutrients. Is he right?", "No. Our bodies need water to work, and we lose it every day", ["Yes, only food matters", "Yes, we only need it when hot"], { hint: "Think about fasting and drinking at iftar.", why: "Water is essential for life." }),
    mc("Hana says we only need to drink when we feel very thirsty. Is she right?", "No. We should drink regularly, because we lose water all the time", ["Yes, only when very thirsty", "Yes, only in summer"], { hint: "Think about what we lose.", why: "We lose water all the time, so we need to drink regularly." })),

  // ----- try (q9-q16)
  Q("label", "apply", "food.nutrient_match", mat("Match each nutrient to its job.", [["Carbohydrates", "Energy"], ["Protein", "Growth and repair"], ["Calcium", "Strong bones and teeth"]], { hint: "Think of each food.", why: "Carbohydrates give energy, protein growth and repair, calcium strong bones." }),
    mat("Link each nutrient to its job.", [["Fibre", "Helps digestion"], ["Vitamins", "Keep us healthy"], ["Fat", "Stores energy"]], { hint: "Think of each nutrient.", why: "Fibre helps digestion, vitamins keep us healthy and fat stores energy." })),
  Q("label", "reason", "food.ready_meals", mc("Zainab says ready meals always have the same nutrients as home-cooked food. Is she right?", "No. Ready meals can have much more salt, fat or sugar, so check the label", ["Yes, they are identical", "Yes, ready meals are always healthier"], { hint: "Compare labels.", why: "Ready meals can be higher in salt, fat and sugar." }),
    mc("Ben says a ready meal is always as good as a meal cooked from fresh food. Is he right?", "No. They can differ a lot, so compare the labels", ["Yes, always as good", "Yes, they are the same"], { hint: "Compare labels.", why: "Nutrients differ, so check the label." })),
  Q("label", "apply", "food.sugar_amount", sld("A snack has 12 g of sugar per 100 g. Slide to show how many grams of sugar there are in 250 g.", { min: 0, max: 50, unit: "g" }, 30, 0, { hint: "250 is 2 and a half lots of 100.", why: "12 x 2.5 = 30 g." }),
    sld("A snack has 8 g of sugar per 100 g. Slide to show how many grams of sugar there are in 250 g.", { min: 0, max: 50, unit: "g" }, 20, 0, { hint: "250 is 2 and a half lots of 100.", why: "8 x 2.5 = 20 g." })),
  Q("label", "reason", "food.diet_drinks", mc("Omar says diet drinks are good for teeth because they have no sugar. Is he right?", "No. They can still contain acids that wear away teeth. Water or milk is better", ["Yes, no sugar means safe", "Yes, they clean teeth"], { hint: "Think about acid.", why: "Acidic drinks can harm teeth even without sugar." }),
    mc("Hana says fizzy drinks with no sugar cannot harm teeth at all. Is she right?", "No. The acid can still wear away tooth enamel", ["Yes, no sugar means no harm", "Yes, fizz protects teeth"], { hint: "Think about acid.", why: "Acid can wear away enamel." })),
  Q("label", "apply", "food.compare_order", ord("Put the steps for comparing two snacks in order.", ["Find the nutrition label", "Look at the amounts per 100 g", "Compare sugar, fat and salt", "Choose the one with less"], { hint: "Find, look, compare, choose.", why: "Find, read, compare, then choose." }),
    ord("Put the steps for choosing a cereal in order.", ["Pick two cereal boxes", "Read the sugar per 100 g on each", "Compare the numbers", "Decide which has less sugar"], { hint: "Pick, read, compare, decide.", why: "Pick, read, compare, then decide." })),
  Q("label", "apply", "food.sugar_diff", num("Snack A has 18 g of sugar. Snack B has 7 g. How much more sugar is in snack A?", 11, { hint: "18 minus 7.", why: "18 - 7 = 11 g." }),
    num("Snack A has 25 g of sugar. Snack B has 9 g. How much more sugar is in snack A?", 16, { hint: "25 minus 9.", why: "25 - 9 = 16 g." })),
  Q("label", "apply", "food.label_fill", fill("Complete the sentence about labels.", "Labels give nutrition per {b1} g and sometimes per {b2}.", [["100", "10", "1000"], ["portion", "bowl", "hour"]], { hint: "A standard amount.", why: "Labels give amounts per 100 g and often per portion." }),
    fill("Complete the sentence about traffic lights.", "Red on a label means {b1}. Green means {b2}.", [["high", "low", "none"], ["low", "high", "none"]], { hint: "Like a traffic light.", why: "Red means high and green means low." })),
  Q("label", "recall", "food.serving", tf("A bigger serving size means more sugar is eaten.", true, { hint: "More food, more sugar.", why: "A bigger serving contains more of everything." }),
    tf("A label showing 5 g per 100 g means a whole pack has only 5 g.", false, { hint: "It is per 100 g.", why: "A larger pack has more than 5 g." })),

  // ----- play (q17-q23)
  Q("plate", "apply", "food.biggest_hot", hot("Tap the food group that should be the biggest part of a balanced plate.", [["🥦", "Fruit and vegetables", 22, 50], ["🍬", "Sweets", 50, 50], ["🧈", "Oils and spreads", 78, 50]], ["Fruit and vegetables"], { labels: true, hint: "Think of five a day.", why: "Fruit and vegetables fill a big part of the plate." }),
    hot("Tap the food group that should be the smallest part of a balanced plate.", [["🥦", "Fruit and vegetables", 22, 50], ["🍞", "Starchy foods", 50, 50], ["🧈", "Oils and spreads", 78, 50]], ["Oils and spreads"], { labels: true, hint: "Only a little.", why: "Oils and spreads are the smallest share." })),
  Q("plate", "reason", "food.equal", mc("Aisha says a balanced diet means equal amounts of every food group. Is she right?", "No. A balanced diet has more fruit, vegetables and starchy foods, and less of foods rich in fat, salt or sugar", ["Yes, equal amounts of everything", "Yes, but only for children"], { hint: "Look at the plate.", why: "Balanced means the right amounts, not equal amounts." }),
    mc("Ben says a balanced plate has the same amount of sweets as vegetables. Is he right?", "No. Vegetables should be a much bigger part than sweets", ["Yes, they should be equal", "Yes, sweets should be bigger"], { hint: "Look at the plate.", why: "Vegetables fill more of the plate than sweets." })),
  Q("plate", "reason", "food.more_food", mc("Mira says eating more food is always healthier. Is she right?", "No. Too much food, even healthy food, can be more than the body needs", ["Yes, more is always better", "Yes, more food makes you stronger"], { hint: "Think about amounts.", why: "The body only needs the right amount." }),
    mc("Zain says drinking more fizzy drink is healthier than less. Is he right?", "No. More sugary drink can harm teeth and health", ["Yes, more is healthier", "Yes, fizzy drinks are healthy"], { hint: "Think about sugar.", why: "More sugary drinks is not healthier." })),
  Q("plate", "apply", "food.group_match", mat("Match each food to its food group.", [["Apple", "Fruit and vegetables"], ["Roti", "Starchy foods"], ["Yoghurt", "Dairy"]], { hint: "Think of the plate.", why: "An apple is fruit, roti is starchy and yoghurt is dairy." }),
    mat("Link each food to its food group.", [["Daal", "Protein"], ["Spinach", "Fruit and vegetables"], ["Rice", "Starchy foods"]], { hint: "Think of the plate.", why: "Daal is protein, spinach is a vegetable and rice is starchy." })),
  Q("plate", "apply", "food.share_order", ord("Put these in order of how much of the plate they should fill, most first.", ["Fruit and vegetables", "Protein foods", "Dairy", "Oils and spreads"], { hint: "Think of the plate.", why: "Fruit and vegetables take most space and oils the least." }),
    ord("Order these by how much of the plate they should fill, largest share first.", ["Starchy foods", "Protein foods", "Dairy", "Oils and spreads"], { hint: "Think of the plate.", why: "Starchy foods fill a lot, and oils the least." })),
  Q("plate", "apply", "food.five_slider", sld("A child has eaten 3 portions of fruit and vegetables. Slide to show how many more are needed to reach five a day.", { min: 0, max: 5, unit: "portions" }, 2, 0, { hint: "5 minus 3.", why: "5 - 3 = 2 more." }),
    sld("A child has eaten 1 portion of fruit and vegetables. Slide to show how many more are needed to reach five a day.", { min: 0, max: 5, unit: "portions" }, 4, 0, { hint: "5 minus 1.", why: "5 - 1 = 4 more." })),
  Q("plate", "apply", "food.snacks", ms("Which two are good snack choices? Pick two.", ["An apple", "Plain yoghurt"], ["A large cake every day", "Sweets all day"], { hint: "Fruit and dairy.", why: "An apple and plain yoghurt are good snacks." }),
    ms("Which two are good snack choices? Choose two.", ["Carrot sticks", "A banana"], ["Fizzy drinks only", "Chocolate bars all day"], { hint: "Fruit and vegetables.", why: "Carrot sticks and a banana are good snacks." })),

  // ----- use (q24-q30)
  Q("farm", "apply", "food.seasonal", mc("Why is local, seasonal food a good choice?", "It travels a shorter distance", ["It is always sweeter", "It has no nutrients"], { hint: "Think about food miles.", why: "Local food travels fewer miles." }),
    mc("Which has fewer food miles?", "Apples grown near your town", ["Apples flown from another country", "Apples shipped across an ocean"], { hint: "Near is fewer.", why: "Apples grown nearby travel the least." })),
  Q("farm", "apply", "food.grow", num("A vegetable patch gives 8 carrots from each of 6 plants. How many carrots is that?", 48, { hint: "8 times 6.", why: "8 x 6 = 48 carrots." }),
    num("A garden gives 7 tomatoes from each of 5 plants. How many tomatoes is that?", 35, { hint: "7 times 5.", why: "7 x 5 = 35 tomatoes." })),
  Q("farm", "reason", "food.fat", mc("Layla says all fat is bad for you. Is she right?", "No. Our bodies need some fat for energy and to take in some vitamins. Too much is the problem", ["Yes, all fat is harmful", "Yes, fat has no use"], { hint: "Think about nuts and oily fish.", why: "Some fat is an essential part of a healthy diet." }),
    mc("Mina says we should cut out all fat from our food. Is she right?", "No. A small amount of fat is needed", ["Yes, cut all of it", "Yes, fat is poison"], { hint: "Think about energy and vitamins.", why: "A small amount of fat is needed." })),
  Q("farm", "recall", "food.fat_tf", tf("Some fat in our food is needed to stay healthy.", true, { hint: "Think of nuts.", why: "Some fat is an essential part of a healthy diet." }),
    tf("Fruit and vegetables only count towards five a day when they are fried.", false, { hint: "Think about fresh fruit.", why: "Fresh, frozen, canned or dried fruit and vegetables can all count." })),
  Q("farm", "apply", "food.producer_fill", fill("Complete the sentence about plants.", "Plants are {b1} because they make their own {b2}.", [["producers", "consumers", "eaters"], ["food", "soil", "water"]], { hint: "They make food.", why: "Plants are producers that make their own food." }),
    fill("Complete the sentence about animals.", "Animals cannot make food, so they {b1} plants or other {b2}.", [["eat", "paint", "grow"], ["animals", "rocks", "clouds"]], { hint: "Think of a cow.", why: "Animals eat plants or other animals." })),
  Q("farm", "reason", "food.plants_eat", mc("Hamza says plants and animals both eat food. Is he right?", "No. Animals eat food, but plants make their own food using sunlight", ["Yes, plants eat the soil", "Yes, plants eat insects"], { hint: "Where do plants get food?", why: "Plants make their own food in their leaves." }),
    mc("Ali says plants eat soil, just as animals eat food. Is he right?", "No. Plants make food in their leaves. Soil gives them water and nutrients", ["Yes, they eat soil", "Yes, soil is their food"], { hint: "Where is food made?", why: "Plants make their own food." })),
  Q("farm", "apply", "food.balanced_two", ms("Which two meals give a good balance? Pick two.", ["Roti with daal and sabzi", "Rice with chicken and salad"], ["Chips and a fizzy drink", "A big bag of sweets"], { hint: "A mix of groups.", why: "These meals have starchy food, protein and vegetables." }),
    ms("Which two meals give a good balance? Choose two.", ["Fruit chaat and yoghurt", "Wholegrain bread, egg and tomato"], ["Sweets for lunch", "Crisps only"], { hint: "A mix of groups.", why: "These meals have a good mix of food groups." })),
];

export const topics = [
  topicLesson({
    slug: "science-class-4-healthy-eating", subject: "science", cls: 4, topic: 11, title: "Healthy Eating and Nutrition",
    summary: "Food groups, amounts, nutrients and where our food comes from.",
    unit: "Topic 11: Healthy eating and nutrition", difficulty: 2,
    objectives: ["Name food groups and what they do for the body", "Plan a balanced meal", "Explain how plants make food and animals find it"],
    success_criteria: ["I can say what carbohydrates, protein and fibre do", "I can read a food label", "I can build a balanced plate"],
    real_life: "Packing a healthy lunch, reading labels and planning sehri and iftar meals.",
    standards: [NC("Y4 nutrition", "Identify that animals, including humans, need the right types and amount of nutrition, and that they cannot make their own food; they get nutrition from what they eat"), ...CAM("4Bn.01", "4Bn.02")],
    warm_up: [
      mc("What do plants need to make food?", "Light", ["Plastic", "Sand"], { hint: "From the Sun.", why: "Plants use light to make food." }),
      tf("Water is important for our bodies.", true, { hint: "We drink it every day.", why: "We need water to live." }),
      mc("Which is a fruit?", "An apple", ["A potato", "A carrot"], { hint: "It grows on a tree.", why: "An apple is a fruit." }),
    ],
    intro: [],
    subs: [food, label, plate, farm],
    clip,
    quiz,
  }),
];
