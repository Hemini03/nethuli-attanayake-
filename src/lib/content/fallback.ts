import type {
  Collection,
  FashionImage,
  Localized,
  ProcessItem,
  SiteContent,
} from "./types";

function photo(
  id: string,
  alt: Localized,
  photographer: string,
  photographerUrl: string,
  width = 1600,
  height = 2133,
): FashionImage {
  return {
    src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=80`,
    alt,
    photographer,
    photographerUrl,
    width,
    height,
  };
}

function processItem(
  kind: ProcessItem["kind"],
  title: Localized,
  caption: Localized,
  image: FashionImage,
): ProcessItem {
  return { kind, title, caption, image };
}

const collections: Collection[] = [
  {
    slug: "la-premiere",
    title: "La Première",
    season: "PE 26",
    year: "2026",
    excerpt: {
      fr: "Collection de diplôme. Une architecture de la taille, de l’épaule, et du vide entre les pièces.",
      en: "Graduate collection. An architecture of waist, shoulder, and the space between garments.",
    },
    story: {
      fr: "La Première est une collection de diplôme pensée comme une enfilade de pièces. Chaque look construit un volume — plis, coutures apparentes, laine froide — puis le laisse respirer. L’atelier précède l’image : toile, épingle, grain. La France ici n’est pas un décor, c’est une discipline de coupe.",
      en: "La Première is a graduate collection built as a sequence of rooms. Each look constructs a volume — pleats, exposed seams, cool wool — then lets it breathe. The atelier comes before the image: toile, pin, grain. France here is not a backdrop; it is a discipline of cut.",
    },
    cover: photo(
      "photo-1524504388940-b1c1722653e1",
      {
        fr: "Look 01, La Première — silhouette debout, lumière d’atelier",
        en: "Look 01, La Première — standing silhouette, atelier light",
      },
      "Aiony Haust",
      "https://unsplash.com/@aiony",
    ),
    looks: [
      {
        number: "01",
        title: { fr: "Colonne", en: "Column" },
        image: photo(
          "photo-1524504388940-b1c1722653e1",
          { fr: "Look 01 — Colonne", en: "Look 01 — Column" },
          "Aiony Haust",
          "https://unsplash.com/@aiony",
        ),
      },
      {
        number: "02",
        title: { fr: "Épaule", en: "Shoulder" },
        image: photo(
          "photo-1515886657613-9f3515b0c78f",
          { fr: "Look 02 — Épaule", en: "Look 02 — Shoulder" },
          "Laura Chouette",
          "https://unsplash.com/@laurachouette",
        ),
      },
      {
        number: "03",
        title: { fr: "Voile", en: "Veil" },
        image: photo(
          "photo-1539008835657-9e8e9680c956",
          { fr: "Look 03 — Voile", en: "Look 03 — Veil" },
          "Alora Griffiths",
          "https://unsplash.com/@aloragriffiths",
        ),
      },
      {
        number: "04",
        title: { fr: "Ligne blanche", en: "White line" },
        image: photo(
          "photo-1515372039744-b8f02a3ae446",
          { fr: "Look 04 — Ligne blanche", en: "Look 04 — White line" },
          "Tamara Bellis",
          "https://unsplash.com/@tamarabellis",
        ),
      },
      {
        number: "05",
        title: { fr: "Jardin", en: "Garden" },
        image: photo(
          "photo-1496747611176-843222e1e57c",
          { fr: "Look 05 — Jardin", en: "Look 05 — Garden" },
          "Tamara Bellis",
          "https://unsplash.com/@tamarabellis",
        ),
      },
      {
        number: "06",
        title: { fr: "Portrait", en: "Portrait" },
        image: photo(
          "photo-1534528741775-53994a69daeb",
          { fr: "Look 06 — Portrait", en: "Look 06 — Portrait" },
          "Aiony Haust",
          "https://unsplash.com/@aiony",
        ),
      },
    ],
    process: [
      processItem(
        "sketch",
        { fr: "Étude d’épaule", en: "Shoulder study" },
        {
          fr: "Croquis de volume : la ligne part de la clavicule et tombe sans casser la hanche.",
          en: "Volume sketch: the line leaves the clavicle and falls without breaking at the hip.",
        },
        photo(
          "photo-1455390582262-044cdead277a",
          { fr: "Croquis d’atelier", en: "Atelier sketch" },
          "Aaron Burden",
          "https://unsplash.com/@aaronburden",
          1600,
          1200,
        ),
      ),
      processItem(
        "fabric",
        { fr: "Laine froide", en: "Cool wool" },
        {
          fr: "Un lainage compact, presque papier. Il tient le pli comme une architecture.",
          en: "A compact wool, almost paper. It holds a fold like architecture.",
        },
        photo(
          "photo-1434389677669-e08b4cac3105",
          { fr: "Matière — laine", en: "Cloth — wool" },
          "Unsplash",
          "https://unsplash.com",
          1600,
          1200,
        ),
      ),
      processItem(
        "toile",
        { fr: "Toile 03", en: "Toile 03" },
        {
          fr: "Premier moulage. Les épingles marquent ce que la photo ne montrera jamais.",
          en: "First draping. The pins mark what the photograph will never show.",
        },
        photo(
          "photo-1558171813-4c088753af8f",
          { fr: "Toile sur mannequin", en: "Toile on the form" },
          "Michael Burrows",
          "https://unsplash.com/@michaelburrows",
          1600,
          1200,
        ),
      ),
    ],
  },
  {
    slug: "clair-obscur",
    title: "Clair-Obscur",
    season: "AH 25/26",
    year: "2025",
    excerpt: {
      fr: "Hiver. Manteaux, noirs profonds, laines brossées. La lumière entre trop tard dans l’atelier.",
      en: "Winter. Coats, deep blacks, brushed wools. Light arrives too late in the atelier.",
    },
    story: {
      fr: "Clair-Obscur est une collection d’hiver écrite pour les rues étroites et les heures sans soleil. Les noirs ne sont pas plats : ils absorbent, ils rendent. Le manteau est une pièce-meuble — il occupe l’espace avant de vêtir le corps.",
      en: "Clair-Obscur is a winter collection written for narrow streets and hours without sun. The blacks are not flat: they absorb, they return. The coat is a piece of furniture — it occupies space before it dresses the body.",
    },
    cover: photo(
      "photo-1487222477894-8943e31ef7b2",
      {
        fr: "Look 01, Clair-Obscur — manteau noir",
        en: "Look 01, Clair-Obscur — black coat",
      },
      "Clem Onojeghuo",
      "https://unsplash.com/@clemono",
    ),
    looks: [
      {
        number: "01",
        title: { fr: "Manteau", en: "Coat" },
        image: photo(
          "photo-1487222477894-8943e31ef7b2",
          { fr: "Look 01 — Manteau", en: "Look 01 — Coat" },
          "Clem Onojeghuo",
          "https://unsplash.com/@clemono",
        ),
      },
      {
        number: "02",
        title: { fr: "Rue", en: "Street" },
        image: photo(
          "photo-1488161628813-04466f872be2",
          { fr: "Look 02 — Rue", en: "Look 02 — Street" },
          "Ivana Cajina",
          "https://unsplash.com/@von_co",
        ),
      },
      {
        number: "03",
        title: { fr: "Laine", en: "Wool" },
        image: photo(
          "photo-1469334031218-e382a71b716b",
          { fr: "Look 03 — Laine", en: "Look 03 — Wool" },
          "freestocks",
          "https://unsplash.com/@freestocks",
        ),
      },
      {
        number: "04",
        title: { fr: "Longueur", en: "Length" },
        image: photo(
          "photo-1490481651871-ab68de25d43d",
          { fr: "Look 04 — Longueur", en: "Look 04 — Length" },
          "Tamara Bellis",
          "https://unsplash.com/@tamarabellis",
        ),
      },
      {
        number: "05",
        title: { fr: "Ombre", en: "Shade" },
        image: photo(
          "photo-1502716119720-b23a93e5fe1b",
          { fr: "Look 05 — Ombre", en: "Look 05 — Shade" },
          "freestocks",
          "https://unsplash.com/@freestocks",
        ),
      },
      {
        number: "06",
        title: { fr: "Studio", en: "Studio" },
        image: photo(
          "photo-1487412720507-e7ab37603c6f",
          { fr: "Look 06 — Studio", en: "Look 06 — Studio" },
          "Unsplash",
          "https://unsplash.com",
        ),
      },
    ],
    process: [
      processItem(
        "sketch",
        { fr: "Coupe du manteau", en: "Coat cut" },
        {
          fr: "Le dos est une seule pièce. Les manches portent le poids.",
          en: "The back is a single piece. The sleeves carry the weight.",
        },
        photo(
          "photo-1581091226825-a6a2a5aee158",
          { fr: "Dessin technique", en: "Technical drawing" },
          "ThisisEngineering",
          "https://unsplash.com/@thisisengineering",
          1600,
          1200,
        ),
      ),
      processItem(
        "fabric",
        { fr: "Noir brossé", en: "Brushed black" },
        {
          fr: "Un drap qui mange la lumière du matin.",
          en: "A cloth that eats the morning light.",
        },
        photo(
          "photo-1558769132-cb1aea458c5e",
          { fr: "Pièces suspendues", en: "Hanging garments" },
          "Lauren Fleischmann",
          "https://unsplash.com/@laurenfleischmann",
          1600,
          1200,
        ),
      ),
      processItem(
        "toile",
        { fr: "Essayage", en: "Fitting" },
        {
          fr: "On ajuste l’épaule jusqu’à ce que le manteau tienne tout seul.",
          en: "The shoulder is adjusted until the coat stands on its own.",
        },
        photo(
          "photo-1445205170230-053b83016050",
          { fr: "Pendaison d’atelier", en: "Atelier rail" },
          "Priscilla Du Preez",
          "https://unsplash.com/@priscilladupreez",
          1600,
          1200,
        ),
      ),
    ],
  },
  {
    slug: "les-heures-creuses",
    title: "Les Heures Creuses",
    season: "Capsule",
    year: "2026",
    excerpt: {
      fr: "La ville entre deux métros. Des pièces qui marchent vite, qui ne parlent pas trop fort.",
      en: "The city between two metros. Pieces that walk quickly and do not speak too loudly.",
    },
    story: {
      fr: "Les Heures Creuses est une capsule pour le temps mort — l’attente, le trajet, la rue encore chaude. Les imprimés et les lignes graphiques arrivent comme un contrepoint au tailoring. Rien n’est costumé. Tout doit pouvoir quitter l’atelier et tenir à 18h, Porte de Pantin ou République.",
      en: "Les Heures Creuses is a capsule for dead time — waiting, transit, a street still warm. Prints and graphic lines arrive as a counterpoint to tailoring. Nothing is costumed. Everything must leave the atelier and hold at 6pm, Porte de Pantin or République.",
    },
    cover: photo(
      "photo-1509631179647-0177331693ae",
      {
        fr: "Look 01, Les Heures Creuses — rayures en mouvement",
        en: "Look 01, Les Heures Creuses — stripes in motion",
      },
      "Tamara Bellis",
      "https://unsplash.com/@tamarabellis",
    ),
    looks: [
      {
        number: "01",
        title: { fr: "Rayure", en: "Stripe" },
        image: photo(
          "photo-1509631179647-0177331693ae",
          { fr: "Look 01 — Rayure", en: "Look 01 — Stripe" },
          "Tamara Bellis",
          "https://unsplash.com/@tamarabellis",
        ),
      },
      {
        number: "02",
        title: { fr: "Couleur", en: "Colour" },
        image: photo(
          "photo-1529139574466-a303027c1d8b",
          { fr: "Look 02 — Couleur", en: "Look 02 — Colour" },
          "Matheus Ferrero",
          "https://unsplash.com/@matheusferrero",
        ),
      },
      {
        number: "03",
        title: { fr: "Trajet", en: "Transit" },
        image: photo(
          "photo-1483985988355-763728e1935b",
          { fr: "Look 03 — Trajet", en: "Look 03 — Transit" },
          "freestocks",
          "https://unsplash.com/@freestocks",
        ),
      },
      {
        number: "04",
        title: { fr: "Pause", en: "Pause" },
        image: photo(
          "photo-1581044777550-4cfa60707c03",
          { fr: "Look 04 — Pause", en: "Look 04 — Pause" },
          "Ayo Ogunseinde",
          "https://unsplash.com/@armedshutter",
        ),
      },
      {
        number: "05",
        title: { fr: "Soir", en: "Evening" },
        image: photo(
          "photo-1617137968427-85924c800a22",
          { fr: "Look 05 — Soir", en: "Look 05 — Evening" },
          "Unsplash",
          "https://unsplash.com",
        ),
      },
      {
        number: "06",
        title: { fr: "Allure", en: "Stride" },
        image: photo(
          "photo-1515886657613-9f3515b0c78f",
          { fr: "Look 06 — Allure", en: "Look 06 — Stride" },
          "Laura Chouette",
          "https://unsplash.com/@laurachouette",
        ),
      },
    ],
    process: [
      processItem(
        "sketch",
        { fr: "Rythme de la rayure", en: "Stripe rhythm" },
        {
          fr: "La rayure n’est pas un motif. C’est une mesure, comme une partition.",
          en: "The stripe is not a print. It is a measure, like a score.",
        },
        photo(
          "photo-1455390582262-044cdead277a",
          { fr: "Carnet de recherche", en: "Research notebook" },
          "Aaron Burden",
          "https://unsplash.com/@aaronburden",
          1600,
          1200,
        ),
      ),
      processItem(
        "fabric",
        { fr: "Jersey tendu", en: "Taut jersey" },
        {
          fr: "Une matière qui suit le pas sans s’alourdir.",
          en: "A cloth that follows the stride without gaining weight.",
        },
        photo(
          "photo-1523381294911-8d3cead13475",
          { fr: "Pli de jersey", en: "Jersey fold" },
          "Laura Chouette",
          "https://unsplash.com/@laurachouette",
          1600,
          1200,
        ),
      ),
      processItem(
        "toile",
        { fr: "Marche", en: "Walk" },
        {
          fr: "On teste la pièce dans le couloir de l’atelier, pas sous le flash.",
          en: "The piece is tested in the atelier corridor, not under flash.",
        },
        photo(
          "photo-1558171813-4c088753af8f",
          { fr: "Travail de coupe", en: "Cutting work" },
          "Michael Burrows",
          "https://unsplash.com/@michaelburrows",
          1600,
          1200,
        ),
      ),
    ],
  },
  {
    slug: "etude-de-drape",
    title: "Étude de Drapé",
    season: "Recherche",
    year: "2025",
    excerpt: {
      fr: "Toile, épingle, grain. Le travail avant la photographie — le vrai métier.",
      en: "Toile, pin, grain. The work before photography — the actual craft.",
    },
    story: {
      fr: "Étude de Drapé n’est pas une collection à vendre. C’est un cahier de recherche : comment un tissu quitte le rouleau et devient une forme. Ces images-là — pendaisons, toiles, mains — sont le cœur d’un portfolio de designeuse. Elles disent comment Nethuli travaille, pas seulement ce qu’on photographie ensuite.",
      en: "Étude de Drapé is not a collection for sale. It is a research book: how cloth leaves the roll and becomes a form. These images — rails, toiles, hands — are the heart of a designer’s portfolio. They show how Nethuli works, not only what is photographed later.",
    },
    cover: photo(
      "photo-1558769132-cb1aea458c5e",
      {
        fr: "Étude de Drapé — pièces suspendues",
        en: "Étude de Drapé — hanging pieces",
      },
      "Lauren Fleischmann",
      "https://unsplash.com/@laurenfleischmann",
      1600,
      2000,
    ),
    looks: [
      {
        number: "01",
        title: { fr: "Pendaison", en: "Hanging" },
        image: photo(
          "photo-1558769132-cb1aea458c5e",
          { fr: "Étude 01 — Pendaison", en: "Study 01 — Hanging" },
          "Lauren Fleischmann",
          "https://unsplash.com/@laurenfleischmann",
        ),
      },
      {
        number: "02",
        title: { fr: "Rail", en: "Rail" },
        image: photo(
          "photo-1445205170230-053b83016050",
          { fr: "Étude 02 — Rail", en: "Study 02 — Rail" },
          "Priscilla Du Preez",
          "https://unsplash.com/@priscilladupreez",
        ),
      },
      {
        number: "03",
        title: { fr: "Main", en: "Hand" },
        image: photo(
          "photo-1558171813-4c088753af8f",
          { fr: "Étude 03 — Main", en: "Study 03 — Hand" },
          "Michael Burrows",
          "https://unsplash.com/@michaelburrows",
        ),
      },
      {
        number: "04",
        title: { fr: "Pli", en: "Fold" },
        image: photo(
          "photo-1434389677669-e08b4cac3105",
          { fr: "Étude 04 — Pli", en: "Study 04 — Fold" },
          "Unsplash",
          "https://unsplash.com",
        ),
      },
      {
        number: "05",
        title: { fr: "Costume", en: "Suiting" },
        image: photo(
          "photo-1594938298603-c8148c4dae35",
          { fr: "Étude 05 — Costume", en: "Study 05 — Suiting" },
          "Liam McKenna",
          "https://unsplash.com/@liammckenna",
        ),
      },
      {
        number: "06",
        title: { fr: "Pile", en: "Stack" },
        image: photo(
          "photo-1523381294911-8d3cead13475",
          { fr: "Étude 06 — Pile", en: "Study 06 — Stack" },
          "Laura Chouette",
          "https://unsplash.com/@laurachouette",
        ),
      },
    ],
    process: [
      processItem(
        "sketch",
        { fr: "Grain et biais", en: "Grain and bias" },
        {
          fr: "Le drapé ne commence pas sur le mannequin. Il commence sur la table.",
          en: "Drape does not begin on the form. It begins on the table.",
        },
        photo(
          "photo-1455390582262-044cdead277a",
          { fr: "Notes de grain", en: "Grain notes" },
          "Aaron Burden",
          "https://unsplash.com/@aaronburden",
          1600,
          1200,
        ),
      ),
      processItem(
        "fabric",
        { fr: "Mousseline", en: "Muslin" },
        {
          fr: "Une toile pauvre pour une forme riche.",
          en: "A poor cloth for a rich form.",
        },
        photo(
          "photo-1434389677669-e08b4cac3105",
          { fr: "Étoffe", en: "Cloth" },
          "Unsplash",
          "https://unsplash.com",
          1600,
          1200,
        ),
      ),
      processItem(
        "toile",
        { fr: "Moulage", en: "Draping" },
        {
          fr: "Chaque épingle est une décision qu’on pourra encore défaire.",
          en: "Each pin is a decision that can still be undone.",
        },
        photo(
          "photo-1558171813-4c088753af8f",
          { fr: "Moulage en cours", en: "Draping in progress" },
          "Michael Burrows",
          "https://unsplash.com/@michaelburrows",
          1600,
          1200,
        ),
      ),
    ],
  },
];

export const fallbackContent: SiteContent = {
  designer: "Nethuli Attanayake",
  location: {
    fr: "Paris — France",
    en: "Paris — France",
  },
  email: "atelier@nethuliattanayake.com",
  instagram: "@nethuliattanayake",
  instagramUrl: "https://instagram.com/nethuliattanayake",
  address: {
    fr: "Atelier, 11e arrondissement\nParis, France",
    en: "Atelier, 11th arrondissement\nParis, France",
  },
  manifesto: {
    fr: "La silhouette est une architecture. Je travaille le drapé, la coupe et le grain comme on construit une pièce : avec patience, avec la main, avec la lumière de l’atelier. La France m’a appris la discipline ; le vêtement m’apprend encore le silence.",
    en: "Silhouette is architecture. I work drape, cut and grain the way one builds a room: with patience, with the hand, with the light of the atelier. France taught me discipline; clothing is still teaching me silence.",
  },
  availability: {
    fr: "Disponible pour maisons, stages, collaborations et direction de collection.",
    en: "Available for houses, internships, collaborations, and collection direction.",
  },
  bio: {
    fr: "Nethuli Attanayake est une designeuse récemment diplômée, basée en France. Elle développe un langage de silhouette entre tailoring et drapé, avec une attention particulière au métier d’atelier — coupe, toile, matière. Ce site est un échantillon de portfolio : les collections, les textes et les images sont à remplacer par son travail réel.",
    en: "Nethuli Attanayake is a recently graduated fashion designer based in France. She is building a silhouette language between tailoring and drape, with particular attention to atelier craft — cut, toile, cloth. This site is a portfolio sample: collections, copy and images are meant to be replaced with her real work.",
  },
  education: [
    {
      year: "2026",
      school: {
        fr: "Diplôme — Design de mode, France",
        en: "Degree — Fashion design, France",
      },
      detail: {
        fr: "Collection de diplôme : La Première. Remplacer par l’école réelle.",
        en: "Graduate collection: La Première. Replace with the actual school.",
      },
    },
    {
      year: "2025",
      school: {
        fr: "Recherche matière & drapé",
        en: "Material & drape research",
      },
      detail: {
        fr: "Cahier d’études, atelier personnel. Remplacer par stages et ateliers.",
        en: "Study book, personal atelier. Replace with internships and studios.",
      },
    },
  ],
  skills: [
    { fr: "Drapé & moulage", en: "Drape & moulage" },
    { fr: "Tailoring", en: "Tailoring" },
    { fr: "Modélisme", en: "Pattern cutting" },
    { fr: "Recherche textile", en: "Textile research" },
    { fr: "Direction de collection", en: "Collection direction" },
    { fr: "Illustration", en: "Illustration" },
  ],
  portrait: photo(
    "photo-1534528741775-53994a69daeb",
    {
      fr: "Portrait de Nethuli Attanayake — image échantillon",
      en: "Portrait of Nethuli Attanayake — sample image",
    },
    "Aiony Haust",
    "https://unsplash.com/@aiony",
  ),
  heroCollectionSlug: "la-premiere",
  collections,
  journal: [
    {
      slug: "la-laine-tient-le-pli",
      title: {
        fr: "La laine tient le pli",
        en: "Wool holds the fold",
      },
      date: "2026-03-12",
      excerpt: {
        fr: "Notes sur un lainage compact trouvé à Paris, et ce qu’il refuse de faire.",
        en: "Notes on a compact wool found in Paris, and what it refuses to do.",
      },
      body: {
        fr: "Il y a des matières qui demandent d’être photographiées, et d’autres qui demandent d’être coupées. Celle-ci appartient à la seconde famille.\n\nUn lainage presque papier, acheté trop tôt le matin, trop près du canal. Il ne tombe pas. Il tient. Le pli n’est pas un accident : il est une décision. Dans l’atelier, on le pose à plat, on le laisse reposer, on revient. La France a ce rythme-là — le métier comme une patience, pas comme une pose.\n\nLa Première est née de ce refus. Si le tissu ne veut pas danser, on construit une pièce autour de son silence.",
        en: "Some cloths ask to be photographed. Others ask to be cut. This one belongs to the second family.\n\nA wool almost like paper, bought too early in the morning, too close to the canal. It does not fall. It holds. A fold is not an accident: it is a decision. In the atelier it is laid flat, left to rest, returned to. France has that rhythm — craft as patience, not as a pose.\n\nLa Première was born from that refusal. If the cloth will not dance, you build a room around its silence.",
      },
      cover: photo(
        "photo-1434389677669-e08b4cac3105",
        { fr: "Laine en atelier", en: "Wool in the atelier" },
        "Unsplash",
        "https://unsplash.com",
        1600,
        1200,
      ),
    },
    {
      slug: "heures-creuses",
      title: {
        fr: "Marcher entre deux rames",
        en: "Walking between two trains",
      },
      date: "2026-01-28",
      excerpt: {
        fr: "Une capsule écrite pour le temps mort de la ville — pas pour le défilé.",
        en: "A capsule written for the city’s dead time — not for the runway.",
      },
      body: {
        fr: "Les Heures Creuses commence à République, pas sous un projecteur. On observe comment une pièce traverse un quai, un hall, une rue trop étroite.\n\nLe vêtement de diplôme a le droit d’être sculptural. Le vêtement de 18h n’a pas ce droit-là, ou alors il doit le cacher. Cette capsule cherche le second temps : une allure qui tient quand personne ne regarde.\n\nRemplacer ces notes par les vraies — un fitting, un tissu, une rue. Le journal n’est pas un blog. C’est la preuve que le travail continue entre les lookbooks.",
        en: "Les Heures Creuses begins at République, not under a lamp. You watch how a piece crosses a platform, a hall, a street that is too narrow.\n\nA graduate garment is allowed to be sculptural. A 6pm garment is not, unless it can hide the sculpture. This capsule looks for that second tempo: a stride that holds when nobody is looking.\n\nReplace these notes with real ones — a fitting, a cloth, a street. The journal is not a blog. It is proof that the work continues between lookbooks.",
      },
      cover: photo(
        "photo-1509631179647-0177331693ae",
        { fr: "Rayures, heures creuses", en: "Stripes, off-hours" },
        "Tamara Bellis",
        "https://unsplash.com/@tamarabellis",
      ),
    },
  ],
};

export function uniquePhotographers(content: SiteContent) {
  const seen = new Map<string, string | undefined>();
  const images: FashionImage[] = [
    content.portrait,
    ...content.collections.flatMap((collection) => [
      collection.cover,
      ...collection.looks.map((look) => look.image),
      ...collection.process.map((item) => item.image),
    ]),
    ...content.journal.map((post) => post.cover),
  ];

  for (const image of images) {
    if (image.photographer && !seen.has(image.photographer)) {
      seen.set(image.photographer, image.photographerUrl);
    }
  }

  return [...seen.entries()].map(([name, url]) => ({ name, url }));
}
