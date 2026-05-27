const Article = require('../models/Articles');

const articles = [
  {
    slug: 'what-are-dinosaurs',
    title: 'What are dinosaurs?',
    url: 'https://www.nhm.ac.uk/discover/what-are-dinosaurs.html',
    preview:
      'Dinosaurs were a successful group of reptiles that dominated life on land for well over 140 million years.',
    paragraphs: [
      'Dinosaurs were a successful group of reptiles that dominated life on land for well over 140 million years. They appeared during the Triassic Period and later spread into an extraordinary variety of forms, from giant predators and massive long-necked plant-eaters to small, bird-like species.',
      'One important feature that set dinosaurs apart was their upright stance. Their legs were positioned directly under their bodies, giving them stronger support and helping them move efficiently.',
      'Although non-bird dinosaurs disappeared around 66 million years ago, dinosaurs did not vanish completely. Birds are living dinosaurs, which connects the ancient prehistoric world to animals we still see today.',
    ],
  },
  {
    slug: 'why-were-dinosaurs-so-big',
    title: "Why were dinosaurs so big? The secrets of titanosaurs' super size",
    url: 'https://www.nhm.ac.uk/discover/why-were-dinosaurs-so-big.html',
    preview:
      'Some of the largest dinosaurs were titanosaurs, a group of sauropods that became the biggest land animals known to science.',
    paragraphs: [
      'Some of the largest dinosaurs were titanosaurs, a group of sauropods that included enormous animals such as Patagotitan and Argentinosaurus.',
      'Their huge size came from a combination of dinosaur features working together, including upright limbs, efficient support, air-filled bones, and bird-like breathing systems.',
      'Being huge helped these herbivores avoid predators, reach food smaller animals could not, and travel long distances in search of resources.',
    ],
  },
  {
    slug: 'how-are-dinosaur-fossils-formed',
    title: 'How are dinosaur fossils formed?',
    url: 'https://www.nhm.ac.uk/discover/how-are-fossils-formed.html',
    preview:
      'Fossils preserve evidence of ancient life, including bones, teeth, footprints, eggs, and skin impressions.',
    paragraphs: [
      'Dinosaurs lived millions of years ago, yet scientists can still study them because some remains were preserved as fossils.',
      'Fossilisation usually begins when an animal dies and is buried quickly by sediment such as mud, sand, or silt. Fast burial protects remains from scavengers, weather, and decay.',
      'Over time, mineral-rich water can replace or fill spaces in the original material, turning it into stone while preserving the shape and structure of the fossil.',
    ],
  },
  {
    slug: 'when-did-dinosaurs-live',
    title: 'When did dinosaurs live?',
    url: 'https://www.nhm.ac.uk/discover/when-did-dinosaurs-live.html',
    preview:
      'Dinosaurs lived during the Mesozoic Era, across the Triassic, Jurassic, and Cretaceous periods.',
    paragraphs: [
      'Dinosaurs lived during the Mesozoic Era, which is divided into the Triassic, Jurassic, and Cretaceous periods.',
      'In the Triassic, most continents were joined in Pangaea. Dinosaurs first evolved in this world of dramatic environmental extremes.',
      'By the Cretaceous, flowering plants were spreading and dinosaurs continued to evolve into new forms until the extinction event about 66 million years ago.',
    ],
  },
  {
    slug: 'ankylosaurs-built-in-armour',
    title: 'Ankylosaurs: The dinosaurs with built-in armour',
    url: 'https://www.nhm.ac.uk/discover/ankylosaurs-the-dinosaurs-with-built-in-armour.html',
    preview:
      'Ankylosaurs were heavily protected dinosaurs with bony armour and, in some species, powerful tail clubs.',
    paragraphs: [
      'Ankylosaurs were among the most heavily protected dinosaurs ever to evolve. Their bodies were covered in armour made from bony plates and nodules embedded in the skin.',
      'These dinosaurs belonged to a wider armoured group called Thyreophora, which also includes stegosaurs.',
      'Scientists think ankylosaur armour may have helped with defence, display, intimidation, species recognition, and combat between individuals.',
    ],
  },
  {
    slug: 'seven-greatest-dinosaur-discoveries',
    title: 'The seven greatest dinosaur discoveries of the last 200 years',
    url: 'https://www.nhm.ac.uk/discover/200-years-of-dinosaur-discoveries.html',
    preview:
      'Dinosaur science began in the nineteenth century and has changed dramatically through new fossil discoveries.',
    paragraphs: [
      'The modern scientific story of dinosaurs began in the nineteenth century, when researchers recognised that giant fossil bones belonged to a distinct group of extinct reptiles.',
      'Since then, discoveries have shown that dinosaurs were varied and dynamic, including plant eaters, predators, armoured species, fast runners, and feathered forms.',
      'New evidence continues to reshape dinosaur science, making the field exciting even after two centuries of study.',
    ],
  },
  {
    slug: 'how-an-asteroid-ended-the-age-of-dinosaurs',
    title: 'How an asteroid ended the age of the dinosaurs',
    url: 'https://www.nhm.ac.uk/discover/how-an-asteroid-caused-extinction-of-dinosaurs.html?pubDate=20250717',
    preview:
      'About 66 million years ago, a large asteroid impact helped bring the age of non-bird dinosaurs to an end.',
    paragraphs: [
      'About 66 million years ago, a mass extinction event brought the age of non-bird dinosaurs to an end. The leading explanation is that a large asteroid struck Earth near what is now the Yucatan Peninsula.',
      'The impact would have produced shock waves, heat, and widespread destruction. Material blasted into the atmosphere likely reduced sunlight and weakened food chains.',
      'Birds survived, which means dinosaurs as a group did not disappear completely, but the world after the impact was dramatically different.',
    ],
  },
];

const seedArticles = async () => {
  for (const article of articles) {
    await Article.updateOne(
      { slug: article.slug },
      { $setOnInsert: { ...article, isActive: true } },
      { upsert: true },
    );
  }

  console.log('Default articles verified');
};

module.exports = seedArticles;
