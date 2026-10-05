// Everything a couple would personalise lives in this file.
// Names, dates, venues, family details, gallery captions and nearby places.

export const couple = {
  groom: "Arjun",
  bride: "Meenakshi",
  hashtag: "#ArjunWedsMeenakshi",
};

export const wedding = {
  // Start of the muhurtham in India Standard Time. Drives the countdown.
  startsAt: "2027-04-24T10:30:00+05:30",
  weekday: "Saturday",
  day: "24",
  month: "April",
  year: "2027",
  longDate: "Saturday, 24 April 2027",
  muhurtham: "10:30 in the morning",
  town: "Munnar",
  rsvpBy: "24 March 2027",
};

export const invocation = "॥ श्री गणेशाय नमः ॥";

export const message = {
  greeting: "Dear family & friends,",
  lines: [
    "We are excited to celebrate this special day with the people who mean the most to us.",
    "Thank you for being part of our journey.",
  ],
  signoff: "Arjun & Meenakshi",
};

export const families = [
  {
    side: "The groom’s family",
    person: "Arjun",
    relation: "Son of",
    father: "Sri. Raghavan Nair",
    mother: "Smt. Lakshmi Raghavan",
    home: "Sreenilayam, Thrissur",
  },
  {
    side: "The bride’s family",
    person: "Meenakshi",
    relation: "Daughter of",
    father: "Sri. Krishnan Menon",
    mother: "Smt. Saraswathi Krishnan",
    home: "Krishnakripa, Palakkad",
  },
];

// Coordinates are placeholders. Replace with the real venue pins.
export const events = [
  {
    id: "ceremony",
    icon: "lamp",
    label: "The muhurtham",
    title: "Wedding Ceremony",
    date: "Saturday, 24 April 2027",
    dateTime: "2027-04-24T10:30+05:30",
    time: "10:30 – 11:15 AM",
    note: "Kindly be seated by 10:00 AM",
    venue: "Sree Bhagavathy Kalyana Mandapam",
    address: "Old Munnar, Idukki, Kerala 685612",
    coords: { lat: 10.0889, lng: 77.0595 },
  },
  {
    id: "reception",
    icon: "moon",
    label: "The evening",
    title: "Reception",
    date: "Saturday, 24 April 2027",
    dateTime: "2027-04-24T19:00+05:30",
    time: "7:00 PM onwards",
    note: "Dinner, music and a little dancing",
    venue: "The Tea Valley Courtyard",
    address: "Chithirapuram, Munnar, Kerala 685565",
    coords: { lat: 10.0386, lng: 77.0547 },
  },
];

// The gallery reads as a story. Entries without an image render as a
// "chapter still to come" card, which is the wedding day itself.
export const memories = [
  {
    image: "couple-laughter",
    chapter: "Chapter I",
    title: "The laugh that started it all",
    note: "Fort Kochi · 2021",
    alt: "Arjun and Meenakshi laughing together, wearing red and gold flower garlands",
  },
  {
    image: "couple-stage",
    chapter: "Chapter II",
    title: "Nischayam: both families say yes",
    note: "Palakkad · 2025",
    alt: "The couple standing together in front of a wall of white flowers, wearing lotus garlands",
  },
  {
    image: "couple-garland",
    chapter: "Chapter III",
    title: "Practising for forever",
    note: "Munnar · 2026",
    alt: "The couple in traditional Kerala attire with jasmine garlands, the groom in a gold shirt and mundu",
  },
  {
    chapter: "Chapter IV",
    title: "The next page",
    note: "24 April 2027",
    body: "Still unwritten, and we would love you in it.",
  },
];

// Photos: Wikimedia Commons (credited on each card). Distances are from the
// ceremony venue and are placeholders.
const commons = (path) => `https://upload.wikimedia.org/wikipedia/commons/thumb/${path}`;

export const nearby = [
  {
    name: "Kolukkumalai Tea Estate",
    kind: "Tea estate",
    distance: "38 km",
    travel: "1 hr 30 min",
    description:
      "Sunrise over rows of tea, high in the Western Ghats. Book the early jeep from Suryanelli for the last stretch up.",
    image: {
      src: commons(
        "e/e7/Tea_plantation_hills_at_sunrise_near_Kolukkumalai%2C_Kerala.jpg/960px-Tea_plantation_hills_at_sunrise_near_Kolukkumalai%2C_Kerala.jpg",
      ),
      width: 960,
      height: 720,
      alt: "Tea plantation hills at sunrise near Kolukkumalai",
    },
    credit: {
      author: "Musheer1999",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Tea_plantation_hills_at_sunrise_near_Kolukkumalai,_Kerala.jpg",
    },
  },
  {
    name: "Top Station",
    kind: "Hill view point",
    distance: "32 km",
    travel: "1 hr",
    description:
      "A cliff-edge lookout on the Kerala–Tamil Nadu border. Go before noon, while the valley is still clear of mist.",
    image: {
      src: commons("c/c5/Munnar_Top_station.jpg/960px-Munnar_Top_station.jpg"),
      width: 960,
      height: 592,
      alt: "Tea-covered slopes falling away to misty blue hills at Top Station",
    },
    credit: {
      author: "Bimal K C",
      license: "CC BY 2.0",
      url: "https://commons.wikimedia.org/wiki/File:Munnar_Top_station.jpg",
    },
  },
  {
    name: "Old Munnar Temple",
    kind: "Heritage temple",
    distance: "2 km",
    travel: "10 min",
    description:
      "A painted gopuram above the old town. Visit at dusk for the evening deeparadhana, when every lamp is lit.",
    image: {
      src: commons("d/dd/Views_around_Munnar%2C_Kerala_%28121%29.jpg/960px-Views_around_Munnar%2C_Kerala_%28121%29.jpg"),
      width: 960,
      height: 1280,
      alt: "Brightly painted temple gopuram in Munnar",
    },
    credit: {
      author: "Vinayaraj",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Views_around_Munnar,_Kerala_(121).jpg",
    },
  },
  {
    name: "Munnar Flower Garden",
    kind: "Botanical garden",
    distance: "4 km",
    travel: "15 min",
    description:
      "Terraced beds of roses, anthuriums and hill-country orchids. An unhurried hour between the two celebrations.",
    image: {
      src: commons("4/43/Flower_garden_Munnar_02.jpg/960px-Flower_garden_Munnar_02.jpg"),
      width: 960,
      height: 540,
      alt: "Flower beds and hanging baskets under a garden arch in Munnar",
    },
    credit: {
      author: "Harvinder Chandigarh",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Flower_garden_Munnar_02.jpg",
    },
  },
  {
    name: "Munnar Bazaar",
    kind: "Local market",
    distance: "1 km",
    travel: "5 min walk",
    description:
      "Sacks of cardamom and pepper, home-made chocolate and fresh estate tea. The easiest gifts to carry home.",
    image: {
      src: commons("9/9e/Spices_in_a_shop_Kerala.jpg/960px-Spices_in_a_shop_Kerala.jpg"),
      width: 960,
      height: 720,
      alt: "Open sacks of cardamom and pepper in a Kerala spice shop",
    },
    credit: {
      author: "Saiphani02",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Spices_in_a_shop_Kerala.jpg",
    },
  },
];

export const studio = {
  name: "ISOFORM",
  url: "https://isoform.studio",
  cta: "Celebrate your story with ISOFORM",
};
