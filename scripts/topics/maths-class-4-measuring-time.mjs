import { SAY, SS, H, T, IMG, TIP, FACT, REVEAL, ACT, MAN, BRAIN, SUM, CHK, NLINE, TABLE, S, EXP, ROW, GLOSS, mc, ms, tf, num, ord, mat, fill, hot, sld } from "../lesson-kit.mjs";
import { topicLesson } from "../topic-kit.mjs";

// Class 4 (Fatima) Maths topic 4: Measuring and time. Standards from docs/CURRICULUM_V2.md.
const EXPP = (title, ...scenes) => ({ ...EXP(title, ...scenes), backdrop: "plain" });
const clock = (id, hour, minute, x = 50, y = 50, size = 3) => [id, { kind: "clock", hour, minute }, x, y, size];

const units = {
  id: "units", kind: "learn", title: "Length, mass and capacity",
  blocks: [
    H("Stop 1: Length"),
    SAY("We measure how long something is in millimetres, centimetres, metres and kilometres. There are ten millimetres in one centimetre. There are one hundred centimetres in one metre. And there are one thousand metres in one kilometre. The words give us a clue. Kilo means one thousand. Centi means one hundred. Milli means one thousand. To change a big unit to a smaller one, we multiply.", T("10 mm = 1 cm. 100 cm = 1 m. 1,000 m = 1 km.", "To change to a smaller unit we **multiply**. To change to a bigger unit we **divide**.")),
    EXPP("From metres to centimetres",
      SS("Here is a metre stick. It is one metre long.", S("1 m", ["m", "📏", 50, 50, 3, "none", "1 metre"])),
      SS("A metre is a hundred centimetres. So two metres is two hundred centimetres.", S("2 m = 200 cm", ["m", "📏", 30, 50, 2, "none", "1 m"], ["n", "📏", 70, 50, 2, "pulse", "2 m = 200 cm"])),
      SS("To change metres to centimetres, multiply by one hundred. To change centimetres to metres, divide by one hundred. Two hundred and fifty centimetres is two metres and fifty centimetres.", S("250 cm = 2 m 50 cm", ["m", "📏", 50, 40, 3, "none", "250 cm"], ["a", "➗", 50, 78, 2, "pulse", "250 ÷ 100 = 2.5 m"]))),
    CHK(num("How many centimetres are in 3 metres?", 300, { hint: "Multiply by 100.", why: "3 × 100 = 300 cm.", tag: "measure.length" })),
    H("Stop 2: Mass and capacity"),
    SAY("We measure how heavy something is, its mass, in grams and kilograms. A kilogram is one thousand grams. And we measure how much a container holds, its capacity, in millilitres and litres. A litre is one thousand millilitres. Look at the scales. Two kilograms is two thousand grams.", T("**Mass** is how heavy something is: 1 kg = 1,000 g.", "**Capacity** is how much a container holds: 1 litre = 1,000 ml.")),
    EXPP("Weighing and pouring",
      SS("A bag of rice is one kilogram. That is one thousand grams.", S("1 kg = 1,000 g", ["r", "🍚", 50, 50, 3, "none", "1 kg = 1,000 g"])),
      SS("A bottle of water is one litre. That is one thousand millilitres.", S("1 l = 1,000 ml", ["w", "🍶", 50, 50, 3, "none", "1 litre = 1,000 ml"])),
      SS("Half a litre is five hundred millilitres. Half a kilogram is five hundred grams.", S("½ l = 500 ml, ½ kg = 500 g", ["w", "🍶", 30, 50, 2, "none", "500 ml"], ["r", "🍚", 70, 50, 2, "none", "500 g"]))),
    CHK(mc("Which is the heaviest?", "2 kg", ["1,500 g", "900 g"], { hint: "Change them all to grams.", why: "2 kg = 2,000 g, which is more than 1,500 g and 900 g.", tag: "measure.mass" })),
    SAY("Remember. Multiply to go to a smaller unit and divide to go to a bigger one. One kilo or one kilometre is one thousand.", SUM("10 mm = 1 cm, 100 cm = 1 m, 1,000 m = 1 km", "1 kg = 1,000 g and 1 l = 1,000 ml", "Multiply for smaller units, divide for bigger")),
    GLOSS({ multiply: "Make bigger by repeated adding, like 3 × 100.", divide: "Share into equal parts, like 300 ÷ 100.", mass: "How heavy something is.", capacity: "How much a container holds.", kilometre: "One thousand metres." }),
  ],
  mini: [
    num("How many millimetres are in 4 cm?", 40, { hint: "10 mm in 1 cm.", why: "4 × 10 = 40 mm." }),
    num("How many grams are in 2 kg?", 2000, { hint: "1 kg = 1,000 g.", why: "2 × 1,000 = 2,000 g." }),
    mc("Which is longest?", "2 m", ["150 cm", "1,000 mm"], { hint: "Change to centimetres.", why: "2 m = 200 cm, 1,000 mm = 100 cm." }),
    tf("2,500 ml is the same as 2 litres and 500 ml.", true, { hint: "1 l = 1,000 ml.", why: "2,500 = 2,000 + 500." }),
  ],
};

const area = {
  id: "perimeter_area", kind: "try", title: "Perimeter and area",
  blocks: [
    H("Stop 1: Perimeter"),
    SAY("The perimeter is the distance all the way around the outside of a shape. Imagine walking round the edge of a garden. This garden is six metres long and four metres wide. Six plus four plus six plus four. That is twenty metres. Perimeter is a length, so we use metres, centimetres or other length units.", T("The **perimeter** is the distance around the outside. Add all the sides.", "Rectangle 6 m by 4 m: 6 + 4 + 6 + 4 = 20 m.")),
    EXPP("Walking round a garden",
      SS("Start with the long side, six metres.", S("6 m", ["g", "🌳", 50, 50, 3, "none", "garden"], ["a", "👣", 50, 15, 2, "pulse", "6 m"])),
      SS("Then the short side, four metres.", S("6 + 4", ["g", "🌳", 50, 50, 3, "none", "garden"], ["a", "👣", 50, 15, 2, "none", "6 m"], ["b", "👣", 85, 50, 2, "pulse", "4 m"])),
      SS("Then six metres back and four metres home. Six, four, six, four makes twenty metres.", S("6 + 4 + 6 + 4 = 20 m", ["g", "🌳", 50, 50, 3, "none", "garden"], ["a", "👣", 50, 15, 2, "none", "6"], ["b", "👣", 85, 50, 2, "none", "4"], ["c", "👣", 50, 85, 2, "none", "6"], ["d", "👣", 15, 50, 2, "pulse", "4"]))),
    CHK(num("A rectangle is 9 cm long and 5 cm wide. What is its perimeter?", 28, { hint: "Add all four sides.", why: "9 + 5 + 9 + 5 = 28 cm.", tag: "measure.perimeter" })),
    H("Stop 2: Area"),
    SAY("Area is the amount of flat space inside a shape. We measure it by counting squares. A rectangle that is four squares long and three squares wide has three rows of four. Three fours are twelve. So the area is twelve square centimetres. For rectangles, multiply the length by the width.", T("**Area** is the space inside a shape, counted in squares. Rectangle: length × width.", "4 × 3 = 12 square cm.")),
    EXPP("Counting squares",
      SS("One row of four squares. That is four.", S("1 row = 4", ...ROW("a", "🟦", 4, 30, 70, 30, 2))),
      SS("Add a second row. Two rows of four make eight.", S("2 rows = 8", ...ROW("a", "🟦", 4, 30, 70, 30, 2), ...ROW("b", "🟦", 4, 30, 70, 55, 2))),
      SS("A third row. Three rows of four make twelve square centimetres.", S("3 × 4 = 12 square cm", ...ROW("a", "🟦", 4, 30, 70, 20, 2), ...ROW("b", "🟦", 4, 30, 70, 45, 2), ...ROW("c", "🟦", 4, 30, 70, 70, 2)))),
    CHK(num("A rectangle is 6 squares long and 3 squares wide. What is its area in squares?", 18, { hint: "Length × width.", why: "6 × 3 = 18 squares.", tag: "measure.area" })),
    SAY("Make a rectangle yourself. Here are twenty square tiles.", MAN("Tiles for a floor", "Put the tiles in two groups to make rectangles. How many rows and columns?", "🟦", 20, ["Row 1", "Row 2", "Row 3", "Row 4"])),
    SAY("A job to try at home.", ACT("Measure a room", ["A ruler or tape measure", "Paper and pencil"], ["Measure the length and width of a table or book.", "Add all four sides to find the perimeter.", "Multiply length by width to find the area.", "Say which is a length and which is a space."])),
    SAY("Remember. Perimeter is all the way around. Area is the space inside. Don't mix them up!", SUM("Perimeter: add the sides", "Area: length × width for a rectangle", "Perimeter is a length, area is square units")),
    GLOSS({ perimeter: "The distance around the outside of a shape.", area: "The flat space inside a shape.", length: "How long something is.", width: "How wide something is.", rectangle: "A shape with four sides and four right angles." }),
  ],
  mini: [
    num("A square has sides of 7 cm. What is its perimeter?", 28, { hint: "7 + 7 + 7 + 7.", why: "4 × 7 = 28 cm." }),
    num("A rectangle is 5 squares by 4 squares. What is its area?", 20, { hint: "5 × 4.", why: "20 squares." }),
    mc("Perimeter or area? \"The fence all round a field\"", "Perimeter", ["Area", "Neither"], { hint: "All the way around.", why: "A fence goes round the edge." }),
    tf("The area of a 2 by 6 rectangle is 12.", true, { hint: "2 × 6.", why: "2 × 6 = 12." }),
  ],
};

const time = {
  id: "time", kind: "play", title: "Clocks, 24-hour time and timetables",
  blocks: [
    H("Stop 1: 12-hour and 24-hour clocks"),
    SAY("A day has twenty-four hours, but a clock face only shows twelve. So we use am for the morning and pm for the afternoon and evening. Timetables often use the twenty-four hour clock instead. After midday, just add twelve. Three in the afternoon, three pm, is fifteen hundred hours, written fifteen oh oh.", T("**12-hour** time uses am and pm. **24-hour** time runs from 00:00 to 23:59.", "3:00 pm is 15:00. Add 12 to afternoon hours.")),
    EXPP("3:00 pm becomes 15:00",
      SS("Here is a clock at three o'clock.", S("3:00", clock("c", 3, 0))),
      SS("In the afternoon, we add twelve to the hour. Three plus twelve is fifteen.", S("3:00 pm = 15:00", clock("c", 15, 0))),
      SS("And twenty to eight in the evening, seven forty pm, is nineteen forty.", S("7:40 pm = 19:40", clock("c", 19, 40)))),
    CHK(mc("What is 6:30 pm in 24-hour time?", "18:30", ["16:30", "06:30"], { hint: "Add 12 to the hour.", why: "6 + 12 = 18, so 18:30.", tag: "time.24hour" })),
    H("Stop 2: Time intervals and timetables"),
    SAY("A timetable tells us when things happen. To find how long a journey takes, count on in easy steps. A train leaves at nine forty and arrives at twelve ten. Nine forty to ten is twenty minutes. Ten to twelve is two hours. Twelve to twelve ten is ten minutes. Add them: twenty, one hundred and twenty, ten. That is two hours and thirty minutes.", T("To find a **time interval**, count on in steps: to the next hour, then whole hours, then minutes.", "09:40 to 12:10 is 2 hours 30 minutes.")),
    EXPP("09:40 to 12:10",
      SS("The train leaves at nine forty.", S("09:40", clock("c", 9, 40))),
      SS("First count on to ten o'clock. That is twenty minutes.", S("+20 minutes → 10:00", clock("c", 10, 0))),
      SS("Then count on to twelve o'clock. That is two whole hours, one hundred and twenty minutes.", S("+2 hours → 12:00", clock("c", 12, 0))),
      SS("Finally ten more minutes to twelve ten. Twenty, plus one hundred and twenty, plus ten, makes one hundred and fifty minutes: two and a half hours.", S("+10 minutes → 12:10. Total 150 minutes", clock("c", 12, 10)))),
    CHK(num("A film starts at 14:15 and finishes at 15:45. How many minutes long is it?", 90, { hint: "14:15 to 15:15 is 60 minutes.", why: "60 + 30 = 90 minutes.", tag: "time.interval" })),
    H("Stop 3: Brain break"),
    SAY("Brain break time. Watch the order, then copy it.", BRAIN("remember_order", "Clock lights", "Watch, then copy.", ["🕐", "🕑", "🕒", "🕓"])),
    CHK(tf("Ten minutes past 5 in the evening is 17:10.", true, { hint: "5 + 12 = 17.", why: "17:10.", tag: "time.24hour" })),
    SAY("Remember. In 24-hour time, add twelve for the afternoon. Count on in steps to find how long something takes.", SUM("24-hour time: add 12 after midday", "Count on to find a time interval", "Timetables use the 24-hour clock")),
    GLOSS({ "12-hour": "Time with am and pm, counted twice around the clock.", "24-hour": "Time counted from 00:00 to 23:59.", "time interval": "How much time passes between two times.", timetable: "A list of times when things happen." }),
  ],
  mini: [
    mc("What is 08:15 in 12-hour time?", "8:15 am", ["8:15 pm", "6:15 am"], { hint: "It is before 12.", why: "08:15 is in the morning." }),
    num("How many minutes from 10:20 to 11:00?", 40, { hint: "Count on to the next hour.", why: "20 + 20 = 40." }),
    mat("Match the 12-hour time to the 24-hour time.", [["2:00 pm", "14:00"], ["9:00 am", "09:00"], ["11:00 pm", "23:00"]], { hint: "Add 12 for pm.", why: "2 + 12 = 14, 11 + 12 = 23." }),
  ],
};

const real = {
  id: "real_world", kind: "use", title: "Measuring our water",
  blocks: [
    H("Stop 1: How much water?"),
    SAY("Your family project this term is about using less water and energy. First, we measure. If a tap fills a four litre bucket in one minute, then in five minutes it would fill twenty litres. Let's work out how a dripping tap wastes water. One drip a second might look tiny, but a drop is about a twentieth of a millilitre. Over a day, it adds up to a lot.", T("Project: how can our family use less water and energy?", "Measure first, then plan. 4 litres each minute for 5 minutes is 20 litres.")),
    IMG("🚰", "A tap that runs 4 litres every minute."),
    CHK(num("A tap runs 6 litres every minute. How many litres in 5 minutes?", 30, { hint: "6 × 5.", why: "6 × 5 = 30 litres.", tag: "measure.real_life" })),
    H("Stop 2: Recipe and timetable"),
    SAY("Measuring helps in the kitchen too. A recipe for sixteen samosas needs two hundred and fifty grams of flour. For thirty-two samosas, we double everything: five hundred grams. If they bake from four fifteen for thirty-five minutes, when are they ready? Four fifteen plus thirty-five is four fifty.", T("Double a recipe by multiplying every amount by 2.", "Samosas baked from 4:15 for 35 minutes are ready at 4:50.")),
    EXPP("Baking samosas",
      SS("Sixteen samosas need two hundred and fifty grams of flour.", S("16 samosas = 250 g flour", ["f", "🌾", 50, 50, 3, "none", "250 g"])),
      SS("Double it for thirty-two samosas. Five hundred grams.", S("32 samosas = 500 g flour", ["f", "🌾", 30, 50, 3, "none", "250 g"], ["g", "🌾", 70, 50, 3, "pulse", "500 g"])),
      SS("They go in the oven at four fifteen for thirty-five minutes.", S("4:15 + 35 minutes", clock("c", 4, 15))),
      SS("Ready at four fifty!", S("Ready at 4:50", clock("c", 4, 50)))),
    CHK(mc("A cake goes in the oven at 13:30 and bakes for 45 minutes. When is it ready?", "14:15", ["13:75", "14:45"], { hint: "13:30 + 30 minutes is 14:00.", why: "13:30 + 45 minutes = 14:15.", tag: "time.interval" })),
    SAY("Time for your project work.", ACT("Water audit milestone", ["A measuring jug or 1-litre bottle", "A timer", "Paper and pencil"], ["Run the kitchen tap for 30 seconds into a bucket.", "Measure the litres. Double it to get litres per minute.", "Work out the litres used for a 2 minute tooth brushing with the tap running.", "Write down one way your family could save water."])),
    SAY("Remember. Measure, convert and calculate. Double a recipe by multiplying everything, and count on to find the finish time.", SUM("Measure and convert units", "Double a recipe by multiplying everything by 2", "Count on to find a finish time")),
    GLOSS({ litre: "A unit of capacity. 1 litre = 1,000 ml.", recipe: "Instructions and amounts for cooking.", double: "Make twice as big, multiply by 2.", project: "A bigger task you plan and do over time." }),
  ],
  mini: [
    num("A bucket holds 10 litres. A tap fills it in 2 minutes. How many litres per minute?", 5, { hint: "10 ÷ 2.", why: "10 ÷ 2 = 5." }),
    num("A recipe uses 150 g of sugar. How much for double the recipe?", 300, { hint: "150 × 2.", why: "300 g." }),
    mc("A bus leaves at 15:40 and the trip takes 25 minutes. When does it arrive?", "16:05", ["15:65", "16:15"], { hint: "15:40 + 20 minutes is 16:00.", why: "16:00 + 5 = 16:05." }),
  ],
};

const ALTS = [
  [mc("How many millimetres are in 1 centimetre?", "10", ["100", "1,000"], { hint: "Think of a ruler.", why: "10 mm = 1 cm.", tag: "measure.length" }), mc("How many metres are in 1 kilometre?", "1,000", ["100", "10,000"], { hint: "Kilo means one thousand.", why: "1 km = 1,000 m.", tag: "measure.length" })],
  [num("How many millilitres are in 4 litres?", 4000, { hint: "1 l = 1,000 ml.", why: "4 × 1,000 = 4,000 ml.", tag: "measure.capacity" }), num("How many grams are in 5 kg?", 5000, { hint: "1 kg = 1,000 g.", why: "5 × 1,000 = 5,000 g.", tag: "measure.mass" })],
  [tf("1 kilometre is 100 metres.", false, { hint: "Kilo means one thousand.", why: "1 km = 1,000 m.", tag: "measure.units" }), tf("10 mm make 1 cm.", true, { hint: "Look at a ruler.", why: "10 mm = 1 cm.", tag: "measure.units" })],
  [fill("Change 340 cm.", "340 cm = {b1} m and {b2} cm.", [["3", "34", "340"], ["40", "4", "34"]], { hint: "100 cm in 1 m.", why: "340 cm = 3 m 40 cm.", tag: "measure.convert" }), fill("Change 125 cm.", "125 cm = {b1} m and {b2} cm.", [["1", "12", "125"], ["25", "5", "12"]], { hint: "100 cm in 1 m.", why: "125 cm = 1 m 25 cm.", tag: "measure.convert" })],
  [ms("Which are the same as 3 litres? Pick two.", ["3,000 ml", "2,000 ml + 1,000 ml"], ["300 ml", "30 ml"], { hint: "1 l = 1,000 ml.", why: "3 l = 3,000 ml.", tag: "measure.convert" }), ms("Which are the same as 5 m? Pick two.", ["500 cm", "5,000 mm"], ["50 cm", "5,000 cm"], { hint: "100 cm = 1 m.", why: "5 m = 500 cm = 5,000 mm.", tag: "measure.convert" })],
  [ord("Arrange these lengths from the shortest.", ["300 mm", "40 cm", "0.5 m", "1 m"], { hint: "Change all to centimetres.", why: "30 cm, 40 cm, 50 cm, 100 cm.", tag: "measure.order" }), ord("Sort these masses from the lightest.", ["800 g", "1 kg", "1,500 g", "2 kg"], { hint: "Change all to grams.", why: "800 g, 1,000 g, 1,500 g, 2,000 g.", tag: "measure.order" })],
  [sld("Slide to show how many millilitres are in 1 litre.", { min: 0, max: 2000, step: 100 }, 1000, 0, { hint: "Kilo-like prefix: milli.", why: "1 l = 1,000 ml.", tag: "measure.estimate" }), sld("Slide to show 1.5 kg in grams.", { min: 0, max: 3000, step: 100 }, 1500, 0, { hint: "1 kg = 1,000 g.", why: "1.5 kg = 1,500 g.", tag: "measure.estimate" })],
  [num("A rectangle is 10 cm long and 6 cm wide. What is its perimeter in cm?", 32, { hint: "Add all four sides.", why: "10 + 6 + 10 + 6 = 32.", tag: "measure.perimeter" }), num("A rectangle is 7 m long and 3 m wide. What is its perimeter in metres?", 20, { hint: "Add all four sides.", why: "7 + 3 + 7 + 3 = 20.", tag: "measure.perimeter" })],
  [mc("Aisha says a 5 cm by 2 cm rectangle has area 14 because she added 5 + 2 + 5 + 2. Is she right?", "No, 14 is the perimeter. The area is 5 × 2 = 10 square cm", ["Yes, 14 is the area", "No, the area is 7"], { hint: "Area is length × width.", why: "Adding all the sides gives the perimeter.", tag: "measure.perimeter_area" }), mc("Bilal says a square with sides of 3 cm has area 12 because 4 × 3. Is he right?", "No, 12 is the perimeter. The area is 3 × 3 = 9 square cm", ["Yes, 12 is the area", "No, the area is 6"], { hint: "Area is length × width.", why: "4 × 3 adds the four sides, which is the perimeter.", tag: "measure.perimeter_area" })],
  [mat("Which 24-hour time goes with each 12-hour time?", [["9:15 am", "09:15"], ["6:00 pm", "18:00"], ["10:50 pm", "22:50"]], { hint: "Add 12 for pm.", why: "6 + 12 = 18, 10 + 12 = 22.", tag: "time.24hour" }), mat("Pair each 12-hour time with its 24-hour time.", [["1:05 pm", "13:05"], ["8:20 am", "08:20"], ["9:35 pm", "21:35"]], { hint: "Add 12 for pm.", why: "1 + 12 = 13, 9 + 12 = 21.", tag: "time.24hour" })],
  [hot("Tap the rectangle with an area of 18 squares.", [["🟦", "A: 3 by 5", 22, 50], ["🟦", "B: 3 by 6", 50, 50], ["🟦", "C: 2 by 6", 78, 50]], ["B: 3 by 6"], { labels: true, hint: "Multiply the sides.", why: "3 × 6 = 18.", tag: "measure.area" }), hot("Tap the rectangle with an area of 20 squares.", [["🟦", "A: 4 by 4", 22, 50], ["🟦", "B: 4 by 5", 50, 50], ["🟦", "C: 3 by 6", 78, 50]], ["B: 4 by 5"], { labels: true, hint: "Multiply the sides.", why: "4 × 5 = 20.", tag: "measure.area" })],
  [mc("A lesson starts at 09:20 and lasts 50 minutes. Zain says it ends at 10:30. Is he right?", "No, 09:20 + 40 minutes is 10:00, plus 10 more is 10:10", ["Yes, 10:30", "No, it ends at 09:70"], { hint: "Count on to 10:00 first.", why: "09:20 + 50 minutes = 10:10.", tag: "time.interval_reason" }), mc("A bus leaves at 16:45 and the trip takes 2 hours 30 minutes. Mia says it arrives at 18:15. Is she right?", "No, 16:45 + 2 hours is 18:45, plus 30 minutes is 19:15", ["Yes, 18:15", "No, it arrives at 17:15"], { hint: "Add the hours first.", why: "16:45 + 2:30 = 19:15.", tag: "time.interval_reason" })],
  [num("A film starts at 13:50 and finishes at 15:35. How many minutes long is it?", 105, { hint: "13:50 to 14:00 is 10 minutes.", why: "10 + 60 + 35 = 105 minutes.", tag: "time.interval" }), num("A bus leaves at 08:25 and arrives at 11:05. How many minutes is the journey?", 160, { hint: "08:25 to 09:00 is 35 minutes.", why: "35 + 120 + 5 = 160 minutes.", tag: "time.interval" })],
  [mc("Zara says 1.5 kg is lighter than 800 g because 1.5 is less than 800. Is she right?", "No, 1.5 kg is 1,500 g, which is heavier than 800 g", ["Yes, 1.5 is less than 800", "No, they are the same"], { hint: "Change to the same unit.", why: "1.5 kg = 1,500 g.", tag: "measure.units_reason" }), mc("Ali says 3 m is shorter than 250 cm because 3 is less than 250. Is he right?", "No, 3 m is 300 cm, which is longer than 250 cm", ["Yes, 3 is less than 250", "No, they are the same"], { hint: "Change to the same unit.", why: "3 m = 300 cm.", tag: "measure.units_reason" })],
  [num("A tap drips 40 ml every minute. How many litres is wasted in 50 minutes?", 2, { hint: "40 × 50 = 2,000 ml.", why: "2,000 ml = 2 litres.", tag: "measure.real_life" }), num("A dripping tap wastes 20 ml every minute. How many litres is wasted in 50 minutes?", 1, { hint: "20 × 50 = 1,000 ml.", why: "1,000 ml = 1 litre.", tag: "measure.real_life" })],
];

export const topics = [
  topicLesson({
    slug: "maths-class-4-measuring-time", subject: "maths", cls: 4, topic: 4, title: "Measuring and Time",
    summary: "Length, mass and capacity, converting units, perimeter and area, 12-hour and 24-hour clocks, timetables and time intervals.",
    unit: "Topic 4: Measuring and time", difficulty: 2,
    objectives: ["Convert between units of length, mass and capacity", "Find perimeter and area", "Read 24-hour time and work out time intervals"],
    success_criteria: ["I can change between metres and centimetres, grams and kilograms, litres and millilitres", "I can find the perimeter and area of a rectangle", "I can read a timetable and find how long something takes"],
    real_life: "Cooking recipes, planning journeys with timetables, and measuring how much water our family uses.",
    standards: [
      { framework: "nc_england", code: "Y4 measurement", text: "Convert between units of measure; find the perimeter of rectilinear shapes and the area by counting squares" },
      { framework: "nc_england", code: "Y4 time", text: "Read, write and convert time between analogue and digital 12- and 24-hour clocks" },
      { framework: "cambridge", code: "4Gg.02" }, { framework: "cambridge", code: "4Gg.03" }, { framework: "cambridge", code: "4Gg.04" }, { framework: "cambridge", code: "4Gg.09" },
      { framework: "cambridge", code: "4Gt.01" }, { framework: "cambridge", code: "4Gt.02" }, { framework: "cambridge", code: "4Gt.03" }, { framework: "cambridge", code: "4Gt.04" },
    ],
    warm_up: [
      mc("What is 3/4 of 8?", "6", ["4", "3"], { hint: "8 ÷ 4 = 2, then times 3.", why: "2 × 3 = 6." }),
      mc("Which fraction equals 1/2?", "2/4", ["1/4", "2/3"], { hint: "Multiply top and bottom by 2.", why: "1/2 = 2/4." }),
      num("What is 8 × 9?", 72, { hint: "Count in nines.", why: "8 × 9 = 72." }),
    ],
    intro: [
      H("Welcome back, number explorer!"),
      SAY("Welcome back, number explorer! Your family wants to use less water and energy this term. To do that, we need to measure carefully. How much water does a tap use? How long does a bus journey take? How big is a garden? Today you will learn to measure length, weight and liquid, work out perimeter and area, and read the twenty-four hour clock. Let's measure!", T("Today's big question: how can we measure our world, and our time, accurately?")),
      IMG("📏", "Rulers, scales, jugs and clocks: tools for measuring."),
      GLOSS({ measure: "To find out how big, heavy or long something is." }),
    ],
    subs: [units, area, time, real],
    quiz: [
      { q: mc("How many centimetres are in 1 metre?", "100", ["10", "1,000"], { hint: "Think of a metre ruler.", why: "100 cm = 1 m.", tag: "measure.length" }), sub: "units", depth: "recall" },
      { q: num("How many grams are in 3 kg?", 3000, { hint: "1 kg = 1,000 g.", why: "3 × 1,000 = 3,000 g.", tag: "measure.mass" }), sub: "units", depth: "recall" },
      { q: tf("1 litre is 1,000 millilitres.", true, { hint: "Milli means one thousandth.", why: "1 l = 1,000 ml.", tag: "measure.units" }), sub: "units", depth: "recall" },
      { q: fill("Change 250 cm.", "250 cm = {b1} m and {b2} cm.", [["2", "25", "250"], ["50", "5", "25"]], { hint: "100 cm in 1 m.", why: "250 cm = 2 m 50 cm.", tag: "measure.convert" }), sub: "units", depth: "apply" },
      { q: ms("Which are the same as 2 kg? Pick two.", ["2,000 g", "1,000 g + 1,000 g"], ["200 g", "20 g"], { hint: "1 kg = 1,000 g.", why: "2 kg = 2,000 g.", tag: "measure.convert" }), sub: "units", depth: "apply" },
      { q: ord("Put these lengths in order, shortest first.", ["1,000 mm", "120 cm", "1.5 m", "2 m"], { hint: "Change all to centimetres.", why: "100 cm, 120 cm, 150 cm, 200 cm.", tag: "measure.order" }), sub: "units", depth: "apply" },
      { q: sld("Slide to show the height of a door in centimetres.", { min: 0, max: 300, step: 10 }, 200, 20, { hint: "A door is about 2 m tall.", why: "A door is about 200 cm.", tag: "measure.estimate" }), sub: "units", depth: "apply" },
      { q: num("A rectangle is 8 cm long and 5 cm wide. What is its perimeter in cm?", 26, { hint: "Add all four sides.", why: "8 + 5 + 8 + 5 = 26.", tag: "measure.perimeter" }), sub: "perimeter_area", depth: "apply" },
      { q: mc("Zara says a 4 cm by 3 cm rectangle has a perimeter of 12 because 4 × 3 = 12. Is she right?", "No, 12 is the area. The perimeter is 4 + 3 + 4 + 3 = 14 cm", ["Yes, 12 is the perimeter", "No, the perimeter is 7 cm"], { hint: "Perimeter means all the way around.", why: "Multiplying gives the area.", tag: "measure.perimeter_area" }), sub: "perimeter_area", depth: "reason" },
      { q: mat("Which 24-hour time matches each clock time?", [["3:00 pm", "15:00"], ["7:30 am", "07:30"], ["11:45 pm", "23:45"]], { hint: "Add 12 for pm.", why: "3 + 12 = 15, 11 + 12 = 23.", tag: "time.24hour" }), sub: "time", depth: "apply" },
      { q: hot("Tap the rectangle with an area of 12 squares.", [["🟦", "A: 3 by 5", 22, 50], ["🟦", "B: 3 by 4", 50, 50], ["🟦", "C: 2 by 5", 78, 50]], ["B: 3 by 4"], { labels: true, hint: "Multiply the sides.", why: "3 × 4 = 12.", tag: "measure.area" }), sub: "perimeter_area", depth: "apply" },
      { q: mc("A film starts at 14:15 and lasts 1 hour 30 minutes. Hana says it ends at 16:15. Is she right?", "No, 14:15 + 1 hour is 15:15, plus 30 minutes is 15:45", ["Yes, 16:15", "No, it ends at 14:45"], { hint: "Add the hour, then the minutes.", why: "14:15 + 1:30 = 15:45.", tag: "time.interval_reason" }), sub: "time", depth: "reason" },
      { q: num("A train leaves at 09:40 and arrives at 12:10. How many minutes is the journey?", 150, { hint: "09:40 to 10:00 is 20 minutes.", why: "20 + 120 + 10 = 150 minutes.", tag: "time.interval" }), sub: "time", depth: "apply" },
      { q: mc("Sara says 2 litres is less than 500 ml because 2 is less than 500. Is she right?", "No, 2 litres is 2,000 ml, which is more than 500 ml", ["Yes, 2 is less than 500", "No, they are the same"], { hint: "Change to the same unit.", why: "2 l = 2,000 ml.", tag: "measure.units_reason" }), sub: "units", depth: "reason" },
      { q: num("A dripping tap wastes 50 ml every minute. How many litres is wasted in 60 minutes?", 3, { hint: "50 × 60 = 3,000 ml.", why: "3,000 ml = 3 litres.", tag: "measure.real_life" }), sub: "real_world", depth: "reason" },
    ].map((x, i) => ({ ...x, alts: ALTS[i] })),
  }),
];
