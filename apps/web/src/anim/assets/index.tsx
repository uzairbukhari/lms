import fatimaStand from "./kids/fatima-stand.webp";
import fatimaWave from "./kids/fatima-wave.webp";
import fatimaCheer from "./kids/fatima-cheer.webp";
import zainabStand from "./kids/zainab-stand.webp";
import zainabWave from "./kids/zainab-wave.webp";
import zainabCheer from "./kids/zainab-cheer.webp";
import ibrahimStand from "./kids/ibrahim-stand.webp";
import ibrahimWave from "./kids/ibrahim-wave.webp";
import ibrahimCheer from "./kids/ibrahim-cheer.webp";
import mango from "./characters/cut/mango.webp";
import apple from "./characters/cut/apple.webp";
import orange from "./characters/cut/orange.webp";
import baby from "./characters/cut/baby.webp";
import cook from "./characters/cut/cook.webp";
import doctor from "./characters/cut/doctor.webp";
import farmer from "./characters/cut/farmer.webp";
import grandfather from "./characters/cut/grandfather.webp";
import grandmother from "./characters/cut/grandmother.webp";
import headscarf from "./characters/cut/headscarf.webp";
import mother from "./characters/cut/mother.webp";
import scientist from "./characters/cut/scientist.webp";
import teacher from "./characters/cut/teacher.webp";
import uncle from "./characters/cut/uncle.webp";
import bee from "./characters/cut/bee.webp";
import bird from "./characters/cut/bird.webp";
import butterfly from "./characters/cut/butterfly.webp";
import camel from "./characters/cut/camel.webp";
import cat from "./characters/cut/cat.webp";
import caterpillar from "./characters/cut/caterpillar.webp";
import dog from "./characters/cut/dog.webp";
import elephant from "./characters/cut/elephant.webp";
import fish from "./characters/cut/fish.webp";
import frog from "./characters/cut/frog.webp";
import giraffe from "./characters/cut/giraffe.webp";
import hen from "./characters/cut/hen.webp";
import lion from "./characters/cut/lion.webp";
import mouse from "./characters/cut/mouse.webp";
import owl from "./characters/cut/owl.webp";
import penguin from "./characters/cut/penguin.webp";
import rabbit from "./characters/cut/rabbit.webp";
import rabbit2 from "./characters/cut/rabbit-2.webp";
import robot from "./characters/cut/robot.webp";
import sheep from "./characters/cut/sheep.webp";
import snail from "./characters/cut/snail.webp";
import o_mountain from "./characters/cut/mountain.webp";
import o_wave from "./characters/cut/wave.webp";
import o_house from "./characters/cut/house.webp";
import o_mosque from "./characters/cut/mosque.webp";
import o_school from "./characters/cut/school.webp";
import o_shop from "./characters/cut/shop.webp";
import o_museum from "./characters/cut/museum.webp";
import o_desert from "./characters/cut/desert.webp";
import o_bus from "./characters/cut/bus.webp";
import o_car from "./characters/cut/car.webp";
import o_wheat from "./characters/cut/wheat.webp";
import o_snowflake from "./characters/cut/snowflake.webp";
import o_pine from "./characters/cut/pine.webp";
import o_ice from "./characters/cut/ice.webp";
import o_flower from "./characters/cut/flower.webp";
import o_wind from "./characters/cut/wind.webp";
import o_leaf from "./characters/cut/leaf.webp";
import o_herb from "./characters/cut/herb.webp";
import o_log from "./characters/cut/log.webp";
import o_candy from "./characters/cut/candy.webp";
import o_pizza from "./characters/cut/pizza.webp";
import o_cupcake from "./characters/cut/cupcake.webp";
import o_peach from "./characters/cut/peach.webp";
import o_bread from "./characters/cut/bread.webp";
import o_banana from "./characters/cut/banana.webp";
import o_cookie from "./characters/cut/cookie.webp";
import o_milk from "./characters/cut/milk.webp";
import o_rice from "./characters/cut/rice.webp";
import o_pencil from "./characters/cut/pencil.webp";
import o_calendar from "./characters/cut/calendar.webp";
import o_books from "./characters/cut/books.webp";
import o_book from "./characters/cut/book.webp";
import o_ruler from "./characters/cut/ruler.webp";
import o_page from "./characters/cut/page.webp";
import o_chart from "./characters/cut/chart.webp";
import o_notepad from "./characters/cut/notepad.webp";
import o_scroll from "./characters/cut/scroll.webp";
import o_camera from "./characters/cut/camera.webp";
import o_phone from "./characters/cut/phone.webp";
import o_laptop from "./characters/cut/laptop.webp";
import o_mic from "./characters/cut/mic.webp";
import o_abacus from "./characters/cut/abacus.webp";
import o_thermometer from "./characters/cut/thermometer.webp";
import o_scales from "./characters/cut/scales.webp";
import o_torch from "./characters/cut/torch.webp";
import o_battery from "./characters/cut/battery.webp";
import o_bag from "./characters/cut/bag.webp";
import o_brick from "./characters/cut/brick.webp";
import o_jar from "./characters/cut/jar.webp";
import o_coin from "./characters/cut/coin.webp";
import o_shoe from "./characters/cut/shoe.webp";
import o_ball from "./characters/cut/ball.webp";
import o_purse from "./characters/cut/purse.webp";
import o_cart from "./characters/cut/cart.webp";
import o_chair from "./characters/cut/chair.webp";
import o_teddy from "./characters/cut/teddy.webp";
import o_egg from "./characters/cut/egg.webp";
import o_tree from "./characters/cut/tree.webp";
import o_star from "./characters/cut/star.webp";
import o_sun from "./characters/cut/sun.webp";
import o_moon from "./characters/cut/moon.webp";
import o_drop from "./characters/cut/drop.webp";
import o_bulb from "./characters/cut/bulb.webp";
import o_rock from "./characters/cut/rock.webp";
import o_box from "./characters/cut/box.webp";
import o_magnet from "./characters/cut/magnet.webp";
import o_earth from "./characters/cut/earth.webp";
import o_magnifier from "./characters/cut/magnifier.webp";
import o_sprout from "./characters/cut/sprout.webp";
import o_rain from "./characters/cut/rain.webp";

// What stands in for an emoji in an explainer or a clip:
//  - the three children of the splash screen (assets/kids) play the girl, the child and the boy, and change pose with the scene's effect;
//  - the grown-ups and the baby (assets/characters/cut, cut from the owner's artwork) play teacher, mum, uncle and so on;
//  - the animals play the common animals; the robot plays the robot;
//  - things, places, food and the sky (cut-outs of the owner's artwork) play the common objects.
// Anything else stays an emoji. Source sheets live in assets/characters/ (the cut-out script is described in docs/CLIPS.md).

type Pose = "stand" | "wave" | "cheer";
const KIDS: Record<string, Record<Pose, string>> = {
  "👧": { stand: fatimaStand, wave: fatimaWave, cheer: fatimaCheer },
  "🧒": { stand: zainabStand, wave: zainabWave, cheer: zainabCheer },
  "👦": { stand: ibrahimStand, wave: ibrahimWave, cheer: ibrahimCheer },
};

/** A grown-up or a baby: one picture, drawn by height. `scale` shrinks or grows it against a child. */
const PEOPLE: Record<string, { src: string; scale: number }> = {
  teacher: { src: teacher, scale: 1 }, mother: { src: mother, scale: 1 }, uncle: { src: uncle, scale: 1.02 }, grandmother: { src: grandmother, scale: 0.95 },
  grandfather: { src: grandfather, scale: 0.97 }, farmer: { src: farmer, scale: 1.02 }, cook: { src: cook, scale: 1 }, doctor: { src: doctor, scale: 1 },
  scientist: { src: scientist, scale: 1 }, headscarf: { src: headscarf, scale: 1 }, baby: { src: baby, scale: 0.55 },
};
/** An animal: one picture, fitted inside a square box. `scale` makes a small animal smaller and a big one bigger. */
const ANIMALS: Record<string, { src: string; scale: number }> = {
  cat: { src: cat, scale: 1 }, dog: { src: dog, scale: 1 }, fish: { src: fish, scale: 0.95 }, bird: { src: bird, scale: 0.8 }, frog: { src: frog, scale: 0.85 },
  camel: { src: camel, scale: 1.15 }, caterpillar: { src: caterpillar, scale: 0.8 }, owl: { src: owl, scale: 0.9 }, butterfly: { src: butterfly, scale: 0.9 },
  lion: { src: lion, scale: 1.05 }, hen: { src: hen, scale: 0.95 }, elephant: { src: elephant, scale: 1.2 }, bee: { src: bee, scale: 0.6 }, sheep: { src: sheep, scale: 1.05 },
  rabbit: { src: rabbit, scale: 0.95 }, "rabbit-2": { src: rabbit2, scale: 0.95 }, giraffe: { src: giraffe, scale: 1.3 }, snail: { src: snail, scale: 0.75 },
  penguin: { src: penguin, scale: 0.95 }, robot: { src: robot, scale: 1 }, mouse: { src: mouse, scale: 0.75 },
  // Fruit (photo-real cut-outs): fitted in the same box, a little smaller than an animal.
  mango: { src: mango, scale: 0.7 }, apple: { src: apple, scale: 0.6 }, orange: { src: orange, scale: 0.62 },
};

/** Things, places and food (cut-outs from the owner's artwork): fitted in the same box as an animal. `scale` suits the size of the real thing. */
const THINGS: Record<string, { src: string; scale: number }> = {
  egg: { src: o_egg, scale: 0.55 }, tree: { src: o_tree, scale: 1 }, star: { src: o_star, scale: 0.6 }, sun: { src: o_sun, scale: 0.85 }, moon: { src: o_moon, scale: 0.65 }, drop: { src: o_drop, scale: 0.55 }, bulb: { src: o_bulb, scale: 0.65 }, rock: { src: o_rock, scale: 0.75 }, box: { src: o_box, scale: 0.8 }, magnet: { src: o_magnet, scale: 0.7 }, earth: { src: o_earth, scale: 0.85 }, magnifier: { src: o_magnifier, scale: 0.7 }, sprout: { src: o_sprout, scale: 0.8 }, rain: { src: o_rain, scale: 0.85 },
  mountain: { src: o_mountain, scale: 1.5 },
  wave: { src: o_wave, scale: 1 },
  house: { src: o_house, scale: 1.1 },
  mosque: { src: o_mosque, scale: 1.3 },
  school: { src: o_school, scale: 1.3 },
  shop: { src: o_shop, scale: 1.2 },
  museum: { src: o_museum, scale: 1.3 },
  desert: { src: o_desert, scale: 1.6 },
  bus: { src: o_bus, scale: 1.1 },
  car: { src: o_car, scale: 1 },
  wheat: { src: o_wheat, scale: 0.8 },
  snowflake: { src: o_snowflake, scale: 0.8 },
  pine: { src: o_pine, scale: 1.1 },
  ice: { src: o_ice, scale: 0.7 },
  flower: { src: o_flower, scale: 0.8 },
  wind: { src: o_wind, scale: 0.9 },
  leaf: { src: o_leaf, scale: 0.7 },
  herb: { src: o_herb, scale: 0.8 },
  log: { src: o_log, scale: 0.8 },
  candy: { src: o_candy, scale: 0.6 },
  pizza: { src: o_pizza, scale: 0.7 },
  cupcake: { src: o_cupcake, scale: 0.65 },
  peach: { src: o_peach, scale: 0.6 },
  bread: { src: o_bread, scale: 0.7 },
  banana: { src: o_banana, scale: 0.7 },
  cookie: { src: o_cookie, scale: 0.55 },
  milk: { src: o_milk, scale: 0.6 },
  rice: { src: o_rice, scale: 0.65 },
  pencil: { src: o_pencil, scale: 0.75 },
  calendar: { src: o_calendar, scale: 0.8 },
  books: { src: o_books, scale: 0.8 },
  book: { src: o_book, scale: 0.75 },
  ruler: { src: o_ruler, scale: 0.8 },
  page: { src: o_page, scale: 0.7 },
  chart: { src: o_chart, scale: 0.9 },
  notepad: { src: o_notepad, scale: 0.75 },
  scroll: { src: o_scroll, scale: 0.8 },
  camera: { src: o_camera, scale: 0.75 },
  phone: { src: o_phone, scale: 0.75 },
  laptop: { src: o_laptop, scale: 0.9 },
  mic: { src: o_mic, scale: 0.7 },
  abacus: { src: o_abacus, scale: 0.85 },
  thermometer: { src: o_thermometer, scale: 0.8 },
  scales: { src: o_scales, scale: 0.85 },
  torch: { src: o_torch, scale: 0.75 },
  battery: { src: o_battery, scale: 0.65 },
  bag: { src: o_bag, scale: 0.8 },
  brick: { src: o_brick, scale: 0.65 },
  jar: { src: o_jar, scale: 0.7 },
  coin: { src: o_coin, scale: 0.5 },
  shoe: { src: o_shoe, scale: 0.65 },
  ball: { src: o_ball, scale: 0.6 },
  purse: { src: o_purse, scale: 0.65 },
  cart: { src: o_cart, scale: 0.9 },
  chair: { src: o_chair, scale: 0.8 },
  teddy: { src: o_teddy, scale: 0.85 },
};

/** Emoji (variation selector removed) -> the name of a picture in PEOPLE, ANIMALS or THINGS. */
const NAME: Record<string, string> = {
  "👩‍🏫": "teacher", "🧑‍🏫": "teacher", "👨‍🏫": "teacher", "👩": "mother", "👨": "uncle", "👵": "grandmother", "👴": "grandfather",
  "🧑‍🌾": "farmer", "👨‍🌾": "farmer", "👩‍🌾": "farmer", "🧑‍🍳": "cook", "👨‍🍳": "cook", "👩‍🍳": "cook",
  "🧑‍⚕": "doctor", "👩‍⚕": "doctor", "👨‍⚕": "doctor", "🧑‍🔬": "scientist", "👩‍🔬": "scientist", "👨‍🔬": "scientist", "🧕": "headscarf", "👶": "baby",
  "🐱": "cat", "🐈": "cat", "🐶": "dog", "🐕": "dog", "🐟": "fish", "🐠": "fish", "🐡": "fish", "🐦": "bird", "🐸": "frog", "🐪": "camel", "🐫": "camel",
  "🐛": "caterpillar", "🦉": "owl", "🦋": "butterfly", "🦁": "lion", "🐔": "hen", "🐘": "elephant", "🐝": "bee", "🐑": "sheep", "🐇": "rabbit", "🐰": "rabbit-2",
  "🥭": "mango", "🍎": "apple", "🍏": "apple", "🍊": "orange",
  "🦒": "giraffe", "🐌": "snail", "🐧": "penguin", "🤖": "robot", "🐭": "mouse", "🐁": "mouse",
  "🥚": "egg", "🌳": "tree", "⭐": "star", "🌟": "star", "☀": "sun", "🌞": "sun", "🌙": "moon", "💧": "drop", "💡": "bulb", "🪨": "rock", "📦": "box", "🧲": "magnet", "🌍": "earth", "🌎": "earth", "🌏": "earth", "🔍": "magnifier", "🔎": "magnifier", "🌱": "sprout", "🌧": "rain",
  "🏔": "mountain", "⛰": "mountain", "🌊": "wave", "🏠": "house", "🏡": "house", "🕌": "mosque", "🏫": "school", "🏪": "shop", "🏛": "museum", "🏜": "desert", "🚌": "bus", "🚗": "car", "🚙": "car", "🌾": "wheat", "❄": "snowflake", "🌲": "pine", "🧊": "ice", "🌸": "flower", "💨": "wind", "🍃": "leaf", "🌿": "herb", "🪵": "log", "🍬": "candy", "🍕": "pizza", "🧁": "cupcake", "🍑": "peach", "🍞": "bread", "🍌": "banana", "🍪": "cookie", "🥛": "milk", "🍚": "rice", "✏": "pencil", "📅": "calendar", "📚": "books", "📖": "book", "📏": "ruler", "📄": "page", "📊": "chart", "📝": "notepad", "📜": "scroll", "📷": "camera", "📱": "phone", "💻": "laptop", "🎤": "mic", "🧮": "abacus", "🌡": "thermometer", "⚖": "scales", "🔦": "torch", "🔋": "battery", "🎒": "bag", "🧱": "brick", "🫙": "jar", "🪙": "coin", "👟": "shoe", "⚽": "ball", "👛": "purse", "🛒": "cart", "🪑": "chair", "🧸": "teddy",
};
const key = (emoji: string) => emoji.replace(/️/g, "");

/** Width in container units (cqw) for each actor size (1 to 3). */
const KID_W = [0, 10, 15, 20];
/** Height of a grown-up, and the side of the box an animal is fitted into (cqw). */
const PERSON_H = [0, 14, 21, 29];
const ANIMAL_BOX = [0, 9, 13, 18];

export function hasAsset(emoji?: string): boolean {
  if (!emoji) return false;
  const k = key(emoji);
  return !!KIDS[k] || !!NAME[k];
}

export function AssetView({ emoji, size, effect }: { emoji: string; size: number; effect?: string }) {
  const k = key(emoji);
  const kid = KIDS[k];
  if (kid) {
    const pose: Pose = effect === "sparkle" || effect === "confetti" || effect === "hearts" ? "cheer" : "stand";
    return <img src={kid[pose]} alt="" draggable={false} className="block h-auto" style={{ width: `${KID_W[size] ?? KID_W[2]}cqw` }} />;
  }
  const name = NAME[k];
  if (name) {
    const person = PEOPLE[name];
    if (person) return <img src={person.src} alt="" draggable={false} className="block w-auto" style={{ height: `${(PERSON_H[size] ?? PERSON_H[2]!) * person.scale}cqw` }} />;
    const animal = ANIMALS[name] ?? THINGS[name];
    if (animal) {
      const box = (ANIMAL_BOX[size] ?? ANIMAL_BOX[2]!) * animal.scale;
      return (
        <span className="flex items-end justify-center" style={{ width: `${box}cqw`, height: `${box}cqw` }}>
          <img src={animal.src} alt="" draggable={false} className="block" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
        </span>
      );
    }
  }
  return null;
}
