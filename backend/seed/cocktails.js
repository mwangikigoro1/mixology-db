const cocktails = [
  // === KENYAN SPECIALS ===
  {
    name: "Dawa",
    nameSwahili: "Dawa",
    category: "Kenyan Special",
    ingredients: [
      { name: "Vodka", amount: "50", unit: "ml" },
      { name: "Lime", amount: "1", unit: "whole" },
      { name: "Honey", amount: "2", unit: "tsp" },
      { name: "Ice", amount: "Cubes", unit: "whole" },
      { name: "Mint Leaves", amount: "3", unit: "whole" }
    ],
    instructions: "Muddle lime and mint in a glass. Add honey, vodka, and ice. Stir well. Top with soda water if desired.",
    instructionsSwahili: "Ponda limau na majani ya mint kwenye glasi. Ongeza asali, vodka, na barafu. Koroga vizuri. Ongeza maji ya soda ukipenda.",
    glass: "Highball",
    garnish: "Lime wedge and mint sprig",
    substitutions: [
      { ingredient: "Vodka", substitute: "White Rum or Gin", note: "Rum gives a sweeter, tropical note." },
      { ingredient: "Honey", substitute: "Agave syrup", note: "Agave keeps it vegan and pours easier." }
    ],
    images: [
      "https://ik.imagekit.io/vjt1kualr/drinks/kenyan_dawa/main-image.jpg"
    ],
    image: "https://ik.imagekit.io/vjt1kualr/drinks/kenyan_dawa/main-image.jpg",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    priceKES: 600,
    prepTime: 5,
    difficulty: "Easy",
    occasions: ["Casual", "Party"],
    isLocal: true,
    rating: 4.8,
    totalReviews: 156
  },
  {
    name: "Amarula Sunset",
    nameSwahili: "Machweo ya Amarula",
    category: "Kenyan Special",
    ingredients: [
      { name: "Amarula Cream", amount: "45", unit: "ml" },
      { name: "Pineapple Juice", amount: "60", unit: "ml" },
      { name: "Grenadine", amount: "15", unit: "ml" },
      { name: "Ice", amount: "Cubes", unit: "whole" }
    ],
    instructions: "Pour Amarula and pineapple juice over ice. Slowly add grenadine to create a sunset effect. Do not stir.",
    instructionsSwahili: "Mimina Amarula na maji ya mananasi juu ya barafu. Ongeza grenadine polepole ili kuunda sura ya machweo. Usikoroge.",
    glass: "Collins",
    garnish: "Pineapple wedge and cherry",
    substitutions: [
      { ingredient: "Amarula Cream", substitute: "Baileys Irish Cream", note: "Baileys works in a pinch but lacks the marula fruit flavour." }
    ],
    images: [
      "https://colournature.com.au/cdn/shop/articles/Sunset_Cocktail.jpg?v=1700959759"
    ],
    image: "https://colournature.com.au/cdn/shop/articles/Sunset_Cocktail.jpg?v=1700959759",
    videoUrl: null,
    priceKES: 750,
    prepTime: 3,
    difficulty: "Easy",
    occasions: ["Romantic", "Celebration"],
    isLocal: true,
    rating: 4.6,
    totalReviews: 89
  },
  {
    name: "Kenyan Coffee Martini",
    nameSwahili: "Martini ya Kahawa ya Kenya",
    category: "Kenyan Special",
    ingredients: [
      { name: "Vodka", amount: "40", unit: "ml" },
      { name: "Coffee Liqueur", amount: "20", unit: "ml" },
      { name: "Freshly Brewed Kenyan Coffee", amount: "30", unit: "ml" },
      { name: "Simple Syrup", amount: "10", unit: "ml" },
      { name: "Coffee Beans", amount: "3", unit: "whole" }
    ],
    instructions: "Shake all ingredients with ice. Strain into a chilled martini glass. Garnish with coffee beans.",
    instructionsSwahili: "Tikisa viungo vyote na barafu. Chuja ndani ya glasi ya martini iliyopozwa. Pamba na buni za kahawa.",
    glass: "Martini",
    garnish: "Coffee beans",
    substitutions: [
      { ingredient: "Coffee Liqueur", substitute: "Kahlúa or Tia Maria", note: "Both are widely available and work equally well." },
      { ingredient: "Freshly Brewed Kenyan Coffee", substitute: "Any strong espresso", note: "Use freshly pulled espresso for the best crema." }
    ],
    images: [
      "https://cocktail-strapi-prod-assets.s3.amazonaws.com/medium_Adobe_Stock_256543787_b41ff7bc89.jpeg"
    ],
    image: "https://cocktail-strapi-prod-assets.s3.amazonaws.com/medium_Adobe_Stock_256543787_b41ff7bc89.jpeg",
    videoUrl: null,
    priceKES: 900,
    prepTime: 5,
    difficulty: "Medium",
    occasions: ["Romantic", "Celebration"],
    isLocal: true,
    rating: 4.7,
    totalReviews: 67
  },

  // === INTERNATIONAL CLASSICS ===
  {
    name: "Margarita",
    nameSwahili: "Margarita",
    category: "Tequila",
    ingredients: [
      { name: "Tequila", amount: "50", unit: "ml" },
      { name: "Lime Juice", amount: "25", unit: "ml" },
      { name: "Triple Sec", amount: "20", unit: "ml" },
      { name: "Salt", amount: "Rim", unit: "whole" },
      { name: "Ice", amount: "Cubes", unit: "whole" }
    ],
    instructions: "Rim a glass with salt. Shake tequila, lime juice, and triple sec with ice. Strain into the glass.",
    instructionsSwahili: "Paka chumvi kwenye ukingo wa glasi. Tikisa tequila, maji ya limau, na triple sec na barafu. Chuja ndani ya glasi.",
    glass: "Margarita",
    garnish: "Lime wheel",
    substitutions: [
      { ingredient: "Triple Sec", substitute: "Cointreau or Grand Marnier", note: "Grand Marnier adds a richer cognac-based depth." },
      { ingredient: "Tequila", substitute: "Mezcal", note: "Mezcal gives a smoky Margarita twist." }
    ],
    images: [
      "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg"
    ],
    image: "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    priceKES: 700,
    prepTime: 5,
    difficulty: "Easy",
    occasions: ["Party", "Casual"],
    isLocal: false,
    rating: 4.9,
    totalReviews: 342
  },
  {
    name: "Mojito",
    nameSwahili: "Mojito",
    category: "Rum",
    ingredients: [
      { name: "White Rum", amount: "50", unit: "ml" },
      { name: "Lime", amount: "1", unit: "whole" },
      { name: "Sugar", amount: "2", unit: "tsp" },
      { name: "Mint Leaves", amount: "8", unit: "whole" },
      { name: "Soda Water", amount: "Top", unit: "whole" },
      { name: "Ice", amount: "Cubes", unit: "whole" }
    ],
    instructions: "Muddle mint, lime, and sugar. Add rum and ice. Top with soda water. Stir gently.",
    instructionsSwahili: "Ponda majani ya mint, limau, na sukari. Ongeza ramu na barafu. Ongeza maji ya soda. Koroga taratibu.",
    glass: "Highball",
    garnish: "Mint sprig and lime wedge",
    substitutions: [
      { ingredient: "White Rum", substitute: "Gin or Vodka", note: "Gin creates a floral twist; vodka keeps it neutral." },
      { ingredient: "Sugar", substitute: "Simple syrup (1 tsp)", note: "Syrup integrates more smoothly than granulated sugar." }
    ],
    images: [
      "https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg"
    ],
    image: "https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg",
    videoUrl: null,
    priceKES: 650,
    prepTime: 7,
    difficulty: "Easy",
    occasions: ["Casual", "Party"],
    isLocal: false,
    rating: 4.8,
    totalReviews: 289
  },
  {
    name: "Negroni",
    nameSwahili: "Negroni",
    category: "Gin",
    ingredients: [
      { name: "Gin", amount: "30", unit: "ml" },
      { name: "Campari", amount: "30", unit: "ml" },
      { name: "Sweet Vermouth", amount: "30", unit: "ml" },
      { name: "Orange Peel", amount: "1", unit: "whole" },
      { name: "Ice", amount: "Cubes", unit: "whole" }
    ],
    instructions: "Stir all ingredients with ice. Strain into a rocks glass over fresh ice. Garnish with orange peel.",
    instructionsSwahili: "Koroga viungo vyote na barafu. Chuja ndani ya glasi ya mawe juu ya barafu mpya. Pamba na ganda la chungwa.",
    glass: "Rocks",
    garnish: "Orange peel",
    substitutions: [
      { ingredient: "Campari", substitute: "Aperol", note: "Aperol makes a lighter, less bitter Negroni." },
      { ingredient: "Sweet Vermouth", substitute: "Dry Vermouth", note: "Creates a drier, more aromatic profile." }
    ],
    images: [
      "https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg"
    ],
    image: "https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg",
    videoUrl: null,
    priceKES: 800,
    prepTime: 5,
    difficulty: "Easy",
    occasions: ["Casual", "Relaxation"],
    isLocal: false,
    rating: 4.7,
    totalReviews: 201
  },
  {
    name: "Espresso Martini",
    nameSwahili: "Martini ya Espresso",
    category: "Vodka",
    ingredients: [
      { name: "Vodka", amount: "50", unit: "ml" },
      { name: "Coffee Liqueur", amount: "30", unit: "ml" },
      { name: "Espresso", amount: "30", unit: "ml" },
      { name: "Simple Syrup", amount: "10", unit: "ml" },
      { name: "Coffee Beans", amount: "3", unit: "whole" }
    ],
    instructions: "Shake all ingredients with ice until frothy. Strain into a chilled martini glass. Garnish with coffee beans.",
    instructionsSwahili: "Tikisa viungo vyote na barafu mpaka viwe na povu. Chuja ndani ya glasi ya martini iliyopozwa. Pamba na buni za kahawa.",
    glass: "Martini",
    garnish: "Coffee beans",
    substitutions: [
      { ingredient: "Vodka", substitute: "Dark Rum", note: "Dark rum adds a molasses richness that complements coffee." }
    ],
    images: [
      "https://www.thecocktaildb.com/images/media/drink/n0sx531504372951.jpg"
    ],
    image: "https://www.thecocktaildb.com/images/media/drink/n0sx531504372951.jpg",
    videoUrl: null,
    priceKES: 850,
    prepTime: 5,
    difficulty: "Medium",
    occasions: ["Romantic", "Celebration"],
    isLocal: false,
    rating: 4.6,
    totalReviews: 178
  },
  {
    name: "Old Fashioned",
    nameSwahili: "Old Fashioned",
    category: "Whisky",
    ingredients: [
      { name: "Bourbon", amount: "60", unit: "ml" },
      { name: "Sugar Cube", amount: "1", unit: "whole" },
      { name: "Angostura Bitters", amount: "2", unit: "dash" },
      { name: "Orange Peel", amount: "1", unit: "whole" },
      { name: "Ice", amount: "Cubes", unit: "whole" }
    ],
    instructions: "Muddle sugar cube and bitters. Add bourbon and ice. Stir well. Express orange peel over the glass.",
    instructionsSwahili: "Ponda cube ya sukari na bitters. Ongeza bourbon na barafu. Koroga vizuri. Kanda ganda la chungwa juu ya glasi.",
    glass: "Rocks",
    garnish: "Orange peel and cherry",
    substitutions: [
      { ingredient: "Bourbon", substitute: "Rye Whiskey or Scotch", note: "Rye is spicier; Scotch adds a smoky, peaty note." },
      { ingredient: "Sugar Cube", substitute: "Simple syrup (5 ml)", note: "Syrup blends faster and more evenly." }
    ],
    images: [
      "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg"
    ],
    image: "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg",
    videoUrl: null,
    priceKES: 950,
    prepTime: 5,
    difficulty: "Easy",
    occasions: ["Relaxation", "Casual"],
    isLocal: false,
    rating: 4.8,
    totalReviews: 245
  },
  {
    name: "Virgin Sunrise",
    nameSwahili: "Macheo Safi",
    category: "Non-Alcoholic",
    ingredients: [
      { name: "Orange Juice", amount: "120", unit: "ml" },
      { name: "Grenadine", amount: "15", unit: "ml" },
      { name: "Ice", amount: "Cubes", unit: "whole" },
      { name: "Orange Slice", amount: "1", unit: "whole" }
    ],
    instructions: "Pour orange juice over ice. Slowly add grenadine to create a sunrise effect. Garnish with orange slice.",
    instructionsSwahili: "Mimina maji ya chungwa juu ya barafu. Ongeza grenadine polepole kuunda sura ya macheo. Pamba na kipande cha chungwa.",
    glass: "Collins",
    garnish: "Orange slice and cherry",
    substitutions: [
      { ingredient: "Grenadine", substitute: "Raspberry cordial", note: "Gives a berry twist to the sunrise gradient." }
    ],
    images: [
      "https://irepo.primecp.com/2021/04/489043/1617415734_552139_Large400_ID-4262567.png?v=4262567"
    ],
    image: "https://irepo.primecp.com/2021/04/489043/1617415734_552139_Large400_ID-4262567.png?v=4262567",
    videoUrl: null,
    priceKES: 400,
    prepTime: 3,
    difficulty: "Easy",
    occasions: ["Casual", "Party"],
    isLocal: false,
    rating: 4.5,
    totalReviews: 134
  },

  // === ADDITIONAL COCKTAILS ===
  {
    name: "Passion Fruit Martini",
    nameSwahili: "Martini ya Passion",
    category: "Vodka",
    ingredients: [
      { name: "Vodka", amount: "45", unit: "ml" },
      { name: "Passion Fruit Puree", amount: "30", unit: "ml" },
      { name: "Lime Juice", amount: "15", unit: "ml" },
      { name: "Simple Syrup", amount: "10", unit: "ml" }
    ],
    instructions: "Shake all ingredients with ice and double-strain into a chilled martini glass. Garnish with half a passion fruit.",
    instructionsSwahili: "Tikisa viungo vyote na barafu, chujia mara mbili ndani ya glasi ya martini iliyopozwa. Pamba kwa nusu ya passion fruit.",
    glass: "Martini",
    garnish: "Half passion fruit",
    substitutions: [
      { ingredient: "Passion Fruit Puree", substitute: "Passion fruit cordial (20 ml + less syrup)", note: "Cordial is easier to find and works well." }
    ],
    images: [
      "https://www.thecocktaildb.com/images/media/drink/6trfve1582473527.jpg"
    ],
    image: "https://www.thecocktaildb.com/images/media/drink/6trfve1582473527.jpg",
    videoUrl: null,
    priceKES: 850,
    prepTime: 6,
    difficulty: "Medium",
    occasions: ["Romantic", "Celebration"],
    isLocal: false,
    rating: 4.6,
    totalReviews: 78
  },
  {
    name: "Paloma",
    category: "Tequila",
    ingredients: [
      { name: "Tequila", amount: "50", unit: "ml" },
      { name: "Grapefruit Soda", amount: "120", unit: "ml" },
      { name: "Lime Juice", amount: "15", unit: "ml" },
      { name: "Salt", amount: "Rim", unit: "whole" }
    ],
    instructions: "Fill a highball glass with ice. Add tequila and lime juice, top with grapefruit soda. Stir gently and garnish with a lime wedge.",
    glass: "Highball",
    garnish: "Lime wedge",
    substitutions: [
      { ingredient: "Grapefruit Soda", substitute: "Fresh grapefruit juice + soda water (equal parts)", note: "Fresher taste with full control over sweetness." }
    ],
    images: [
      "https://www.thecocktaildb.com/images/media/drink/samm5j1513706393.jpg"
    ],
    image: "https://www.thecocktaildb.com/images/media/drink/samm5j1513706393.jpg",
    videoUrl: null,
    priceKES: 650,
    prepTime: 4,
    difficulty: "Easy",
    occasions: ["Casual", "Party"],
    isLocal: false,
    rating: 4.5,
    totalReviews: 112
  },
  {
    name: "Pisco Sour",
    category: "Liqueur",
    ingredients: [
      { name: "Pisco", amount: "60", unit: "ml" },
      { name: "Lime Juice", amount: "30", unit: "ml" },
      { name: "Simple Syrup", amount: "20", unit: "ml" },
      { name: "Egg White", amount: "1", unit: "whole" }
    ],
    instructions: "Dry shake (no ice) all ingredients first, then add ice and shake again. Strain into a chilled glass and garnish with bitters.",
    glass: "Coupe",
    garnish: "Angostura bitters",
    substitutions: [
      { ingredient: "Pisco", substitute: "Pisco Portón or any Peruvian/Chilean Pisco", note: "Peruvian and Chilean Pisco have slightly different flavour profiles." },
      { ingredient: "Egg White", substitute: "Aquafaba (15 ml)", note: "Perfect vegan foam alternative." }
    ],
    images: [
      "https://www.thecocktaildb.com/images/media/drink/tsssur1439907622.jpg"
    ],
    image: "https://www.thecocktaildb.com/images/media/drink/tsssur1439907622.jpg",
    videoUrl: null,
    priceKES: 780,
    prepTime: 6,
    difficulty: "Medium",
    occasions: ["Romantic", "Celebration"],
    isLocal: false,
    rating: 4.6,
    totalReviews: 54
  },
  {
    name: "French 75",
    category: "Gin",
    ingredients: [
      { name: "Gin", amount: "30", unit: "ml" },
      { name: "Lemon Juice", amount: "15", unit: "ml" },
      { name: "Simple Syrup", amount: "10", unit: "ml" },
      { name: "Champagne", amount: "Top", unit: "whole" }
    ],
    instructions: "Shake gin, lemon juice, and syrup with ice. Strain into a flute and top with champagne. Garnish with a lemon twist.",
    glass: "Flute",
    garnish: "Lemon twist",
    substitutions: [
      { ingredient: "Champagne", substitute: "Prosecco or Cava", note: "More affordable alternatives with a similar dry sparkle." },
      { ingredient: "Gin", substitute: "Cognac", note: "The original 1915 recipe actually used cognac." }
    ],
    images: [
      "https://www.thecocktaildb.com/images/media/drink/hrxfbl1606773109.jpg"
    ],
    image: "https://www.thecocktaildb.com/images/media/drink/hrxfbl1606773109.jpg",
    videoUrl: null,
    priceKES: 1200,
    prepTime: 5,
    difficulty: "Medium",
    occasions: ["Celebration", "Romantic"],
    isLocal: false,
    rating: 4.7,
    totalReviews: 98
  },
  {
    name: "Clover Club",
    category: "Gin",
    ingredients: [
      { name: "Gin", amount: "45", unit: "ml" },
      { name: "Lemon Juice", amount: "15", unit: "ml" },
      { name: "Raspberry Syrup", amount: "15", unit: "ml" },
      { name: "Egg White", amount: "1", unit: "whole" }
    ],
    instructions: "Dry shake with egg white, then add ice and shake again. Strain into a chilled coupe and garnish with raspberries.",
    glass: "Coupe",
    garnish: "Fresh raspberries",
    substitutions: [
      { ingredient: "Raspberry Syrup", substitute: "Grenadine or strawberry syrup", note: "Any red berry syrup works as a stand-in." },
      { ingredient: "Egg White", substitute: "Aquafaba (15 ml)", note: "Ideal vegan foam substitute." }
    ],
    images: [
      "https://www.cocktailemporium.com/cdn/shop/articles/Clover_Club_500x.png?v=1729872999"
    ],
    image: "https://www.cocktailemporium.com/cdn/shop/articles/Clover_Club_500x.png?v=1729872999",
    videoUrl: null,
    priceKES: 820,
    prepTime: 7,
    difficulty: "Medium",
    occasions: ["Romantic", "Relaxation"],
    isLocal: false,
    rating: 4.4,
    totalReviews: 37
  },
  {
    name: "Tropical Rum Punch",
    category: "Rum",
    ingredients: [
      { name: "Dark Rum", amount: "45", unit: "ml" },
      { name: "Pineapple Juice", amount: "60", unit: "ml" },
      { name: "Orange Juice", amount: "30", unit: "ml" },
      { name: "Grenadine", amount: "10", unit: "ml" }
    ],
    instructions: "Combine all ingredients in a shaker with ice, strain into a large glass filled with crushed ice and garnish with tropical fruit.",
    glass: "Collins",
    garnish: "Pineapple wedge",
    substitutions: [
      { ingredient: "Dark Rum", substitute: "White Rum + a barspoon of molasses", note: "Replicates the dark rum depth on a budget." }
    ],
    images: [
      "https://www.platingsandpairings.com/wp-content/uploads/2023/04/Rum-punch-8_compressed-768x1148.jpg"
    ],
    image: "https://www.platingsandpairings.com/wp-content/uploads/2023/04/Rum-punch-8_compressed-768x1148.jpg",
    videoUrl: null,
    priceKES: 680,
    prepTime: 5,
    difficulty: "Easy",
    occasions: ["Party", "Casual"],
    isLocal: false,
    rating: 4.5,
    totalReviews: 76
  },
  {
    name: "Cucumber Cooler (Mocktail)",
    category: "Non-Alcoholic",
    ingredients: [
      { name: "Cucumber", amount: "6", unit: "whole" },
      { name: "Lime Juice", amount: "20", unit: "ml" },
      { name: "Simple Syrup", amount: "15", unit: "ml" },
      { name: "Soda Water", amount: "Top", unit: "whole" }
    ],
    instructions: "Muddle cucumber with syrup and lime, add ice and top with soda. Garnish with cucumber ribbon.",
    glass: "Highball",
    garnish: "Cucumber ribbon",
    substitutions: [
      { ingredient: "Simple Syrup", substitute: "Elderflower cordial", note: "Adds a beautiful floral note alongside the cucumber." }
    ],
    images: [
      "https://www.cocktail-maestro.com/_next/image?q=75&url=%2Fapi%2Fimage%2Fcucumber-cooler-cocktail&w=3840"
    ],
    image: "https://www.cocktail-maestro.com/_next/image?q=75&url=%2Fapi%2Fimage%2Fcucumber-cooler-cocktail&w=3840",
    videoUrl: null,
    priceKES: 350,
    prepTime: 3,
    difficulty: "Easy",
    occasions: ["Casual", "Relaxation"],
    isLocal: false,
    rating: 4.3,
    totalReviews: 24
  },

  // ============================================================
  // NEW KENYAN SPECIALS
  // ============================================================
  {
    name: "Tusker Shandy",
    nameSwahili: "Shandy ya Tusker",
    category: "Kenyan Special",
    ingredients: [
      { name: "Tusker Lager", amount: "330", unit: "ml" },
      { name: "Lemonade", amount: "150", unit: "ml" },
      { name: "Lime Juice", amount: "15", unit: "ml" },
      { name: "Ice", amount: "Cubes", unit: "whole" }
    ],
    instructions: "Pour chilled Tusker into a large glass. Add lemonade and a squeeze of lime. Stir gently once and serve immediately.",
    instructionsSwahili: "Mimina Tusker baridi kwenye glasi kubwa. Ongeza lemonade na limau. Koroga mara moja na utumie mara moja.",
    glass: "Pint",
    garnish: "Lime wedge",
    substitutions: [
      { ingredient: "Tusker Lager", substitute: "Any light lager (White Cap, Pilsner)", note: "Tusker gives the authentic Kenyan taste." },
      { ingredient: "Lemonade", substitute: "Sprite or 7UP", note: "Works just as well and is easy to find." }
    ],
    images: ["https://images.unsplash.com/photo-1547595628-c61a29f498af?w=500&q=80"],
    image: "https://images.unsplash.com/photo-1547595628-c61a29f498af?w=500&q=80",
    videoUrl: null,
    priceKES: 450,
    prepTime: 2,
    difficulty: "Easy",
    occasions: ["Casual", "Party"],
    isLocal: true,
    rating: 4.4,
    totalReviews: 203
  },
  {
    name: "Nairobi Nights",
    nameSwahili: "Usiku wa Nairobi",
    category: "Kenyan Special",
    ingredients: [
      { name: "Kenya Cane Spirit", amount: "45", unit: "ml" },
      { name: "Passion Fruit Juice", amount: "60", unit: "ml" },
      { name: "Ginger Beer", amount: "90", unit: "ml" },
      { name: "Lime Juice", amount: "15", unit: "ml" },
      { name: "Ice", amount: "Cubes", unit: "whole" }
    ],
    instructions: "Fill a glass with ice. Pour cane spirit and passion fruit juice. Top with ginger beer and a squeeze of lime. Garnish with a lime wheel.",
    instructionsSwahili: "Jaza glasi na barafu. Mimina roho ya miwa na maji ya passion fruit. Ongeza ginger beer na limau. Pamba na kipande cha limau.",
    glass: "Highball",
    garnish: "Lime wheel and passion fruit half",
    substitutions: [
      { ingredient: "Kenya Cane Spirit", substitute: "White Rum or Vodka", note: "Vodka gives a cleaner background; rum adds sweetness." },
      { ingredient: "Passion Fruit Juice", substitute: "Mango juice", note: "Mango creates a richer, tropical variant." }
    ],
    images: ["https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=500&q=80"],
    image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=500&q=80",
    videoUrl: null,
    priceKES: 700,
    prepTime: 4,
    difficulty: "Easy",
    occasions: ["Party", "Casual"],
    isLocal: true,
    rating: 4.5,
    totalReviews: 118
  },
  {
    name: "Safari Sour",
    nameSwahili: "Safari Sour",
    category: "Kenyan Special",
    ingredients: [
      { name: "Konyagi", amount: "45", unit: "ml" },
      { name: "Lemon Juice", amount: "20", unit: "ml" },
      { name: "Simple Syrup", amount: "15", unit: "ml" },
      { name: "Egg White", amount: "1", unit: "whole" },
      { name: "Angostura Bitters", amount: "2", unit: "dash" }
    ],
    instructions: "Dry shake all ingredients (no ice) to emulsify the egg white. Add ice and shake again vigorously. Strain into a coupe. Dot bitters on the foam for garnish.",
    instructionsSwahili: "Tikisa viungo vyote bila barafu ili kuchanganya wazungu wa yai. Ongeza barafu na tikisa tena kwa nguvu. Chuja ndani ya coupe.",
    glass: "Coupe",
    garnish: "Angostura bitters dots",
    substitutions: [
      { ingredient: "Konyagi", substitute: "Gin or Whisky", note: "Gin brightens it; whisky deepens it." },
      { ingredient: "Egg White", substitute: "15ml aquafaba (chickpea water)", note: "Perfect vegan substitute for egg white foam." }
    ],
    images: ["https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&q=80"],
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&q=80",
    videoUrl: null,
    priceKES: 650,
    prepTime: 7,
    difficulty: "Medium",
    occasions: ["Casual", "Relaxation"],
    isLocal: true,
    rating: 4.5,
    totalReviews: 54
  },
  {
    name: "Mombasa Breeze",
    nameSwahili: "Upepo wa Mombasa",
    category: "Kenyan Special",
    ingredients: [
      { name: "Coconut Rum", amount: "45", unit: "ml" },
      { name: "Pineapple Juice", amount: "60", unit: "ml" },
      { name: "Coconut Cream", amount: "30", unit: "ml" },
      { name: "Blue Curaçao", amount: "15", unit: "ml" },
      { name: "Ice", amount: "Cubes", unit: "whole" }
    ],
    instructions: "Blend coconut rum, pineapple juice, and coconut cream with ice until smooth. Pour into a glass and float Blue Curaçao on top for the ocean-blue layer.",
    instructionsSwahili: "Koroga ramu ya nazi, maji ya mananasi, na krimu ya nazi na barafu hadi laini. Mimina kwenye glasi na ongeza Blue Curaçao juu kwa safu ya buluu ya bahari.",
    glass: "Hurricane",
    garnish: "Pineapple wedge and cocktail umbrella",
    substitutions: [
      { ingredient: "Coconut Rum", substitute: "Malibu + white rum", note: "Mix equal parts for the same coconut character." },
      { ingredient: "Blue Curaçao", substitute: "Triple Sec", note: "Flavour stays the same, you lose the ocean tint." }
    ],
    images: ["https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=500&q=80"],
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=500&q=80",
    videoUrl: null,
    priceKES: 850,
    prepTime: 6,
    difficulty: "Medium",
    occasions: ["Party", "Celebration", "Romantic"],
    isLocal: true,
    rating: 4.7,
    totalReviews: 91
  },
  {
    name: "Rift Valley G&T",
    nameSwahili: "Gin na Tonic ya Bonde la Ufa",
    category: "Kenyan Special",
    ingredients: [
      { name: "Procera African Gin", amount: "50", unit: "ml" },
      { name: "Tonic Water", amount: "150", unit: "ml" },
      { name: "Cucumber Slices", amount: "3", unit: "whole" },
      { name: "Pink Peppercorns", amount: "4", unit: "whole" },
      { name: "Ice", amount: "Cubes", unit: "whole" }
    ],
    instructions: "Fill a large balloon glass with ice. Add Procera gin and gently pour tonic down the side. Add cucumber and pink peppercorns. Do not stir.",
    instructionsSwahili: "Jaza glasi kubwa na barafu. Ongeza gin ya Procera na mimina tonic polepole ukando wa glasi. Ongeza matembele ya tango na pilipili nyekundu. Usikoroge.",
    glass: "Balloon",
    garnish: "Cucumber ribbon and dried citrus wheel",
    substitutions: [
      { ingredient: "Procera African Gin", substitute: "Hendrick's or Tanqueray", note: "Hendrick's mirrors the botanical, cucumber-forward profile." }
    ],
    images: ["https://images.unsplash.com/photo-1560508180-03f285f67ded?w=500&q=80"],
    image: "https://images.unsplash.com/photo-1560508180-03f285f67ded?w=500&q=80",
    videoUrl: null,
    priceKES: 1100,
    prepTime: 3,
    difficulty: "Easy",
    occasions: ["Casual", "Relaxation"],
    isLocal: true,
    rating: 4.9,
    totalReviews: 76
  },
  {
    name: "Savanna Mule",
    nameSwahili: "Nyumbu wa Savanna",
    category: "Kenyan Special",
    ingredients: [
      { name: "Konyagi", amount: "45", unit: "ml" },
      { name: "Ginger Beer", amount: "120", unit: "ml" },
      { name: "Lime Juice", amount: "15", unit: "ml" },
      { name: "Angostura Bitters", amount: "2", unit: "dash" },
      { name: "Ice", amount: "Cubes", unit: "whole" }
    ],
    instructions: "Fill a copper mug or tall glass with ice. Add Konyagi and lime juice. Top with ginger beer and a dash of bitters. Garnish with a lime wedge.",
    instructionsSwahili: "Jaza kikombe cha shaba na barafu. Ongeza Konyagi na maji ya limau. Ongeza ginger beer na matone ya bitters. Pamba na kipande cha limau.",
    glass: "Copper Mug",
    garnish: "Lime wedge and candied ginger",
    substitutions: [
      { ingredient: "Konyagi", substitute: "Vodka or white rum", note: "A clean vodka base keeps the ginger flavour front and centre." }
    ],
    images: ["https://images.unsplash.com/photo-1574966739987-65fca8c3d4a8?w=500&q=80"],
    image: "https://images.unsplash.com/photo-1574966739987-65fca8c3d4a8?w=500&q=80",
    videoUrl: null,
    priceKES: 600,
    prepTime: 3,
    difficulty: "Easy",
    occasions: ["Casual", "Party"],
    isLocal: true,
    rating: 4.4,
    totalReviews: 62
  },

  // ============================================================
  // NEW INTERNATIONAL CLASSICS
  // ============================================================
  {
    name: "Aperol Spritz",
    nameSwahili: "Aperol Spritz",
    category: "Liqueur",
    ingredients: [
      { name: "Aperol", amount: "60", unit: "ml" },
      { name: "Prosecco", amount: "90", unit: "ml" },
      { name: "Soda Water", amount: "Splash", unit: "whole" },
      { name: "Orange Slice", amount: "1", unit: "whole" },
      { name: "Ice", amount: "Cubes", unit: "whole" }
    ],
    instructions: "Fill a wine glass with ice. Add Aperol, then Prosecco, then a splash of soda. Stir once gently. Garnish with an orange slice.",
    glass: "Wine",
    garnish: "Orange slice",
    substitutions: [
      { ingredient: "Prosecco", substitute: "Cava or dry sparkling wine", note: "Any dry bubbly will do the job." },
      { ingredient: "Aperol", substitute: "Campari (use 30 ml)", note: "Campari is more bitter so use less." }
    ],
    images: ["https://images.unsplash.com/photo-1570598912132-0ba1dc952b7d?w=500&q=80"],
    image: "https://images.unsplash.com/photo-1570598912132-0ba1dc952b7d?w=500&q=80",
    videoUrl: null,
    priceKES: 950,
    prepTime: 3,
    difficulty: "Easy",
    occasions: ["Casual", "Celebration", "Party"],
    isLocal: false,
    rating: 4.6,
    totalReviews: 315
  },
  {
    name: "Whisky Sour",
    nameSwahili: "Whisky Sour",
    category: "Whisky",
    ingredients: [
      { name: "Bourbon", amount: "60", unit: "ml" },
      { name: "Lemon Juice", amount: "30", unit: "ml" },
      { name: "Simple Syrup", amount: "20", unit: "ml" },
      { name: "Egg White", amount: "1", unit: "whole" },
      { name: "Angostura Bitters", amount: "2", unit: "dash" }
    ],
    instructions: "Dry shake egg white and all ingredients without ice. Add ice and shake again. Strain over ice into a rocks glass. Dash bitters on foam.",
    glass: "Rocks",
    garnish: "Angostura bitters and cherry",
    substitutions: [
      { ingredient: "Egg White", substitute: "Aquafaba (15 ml)", note: "Perfect vegan alternative, same silky foam." },
      { ingredient: "Bourbon", substitute: "Rye or Scotch", note: "Rye lends a spicier backbone." }
    ],
    images: ["https://www.thecocktaildb.com/images/media/drink/ssurle1472667335.jpg"],
    image: "https://www.thecocktaildb.com/images/media/drink/ssurle1472667335.jpg",
    videoUrl: null,
    priceKES: 900,
    prepTime: 7,
    difficulty: "Medium",
    occasions: ["Casual", "Relaxation"],
    isLocal: false,
    rating: 4.7,
    totalReviews: 187
  },
  {
    name: "Daiquiri",
    nameSwahili: "Daiquiri",
    category: "Rum",
    ingredients: [
      { name: "White Rum", amount: "60", unit: "ml" },
      { name: "Lime Juice", amount: "30", unit: "ml" },
      { name: "Simple Syrup", amount: "20", unit: "ml" },
      { name: "Ice", amount: "Cubes", unit: "whole" }
    ],
    instructions: "Shake all ingredients vigorously with ice. Double-strain into a chilled coupe glass.",
    glass: "Coupe",
    garnish: "Lime wheel",
    substitutions: [
      { ingredient: "White Rum", substitute: "Cachaça", note: "Creates a Caipirinha-style daiquiri with more funk." },
      { ingredient: "Simple Syrup", substitute: "Honey syrup (1:1)", note: "Adds floral, full-bodied sweetness." }
    ],
    images: ["https://www.thecocktaildb.com/images/media/drink/mrz9091589574515.jpg"],
    image: "https://www.thecocktaildb.com/images/media/drink/mrz9091589574515.jpg",
    videoUrl: null,
    priceKES: 750,
    prepTime: 4,
    difficulty: "Easy",
    occasions: ["Casual", "Romantic"],
    isLocal: false,
    rating: 4.7,
    totalReviews: 223
  },
  {
    name: "Dark & Stormy",
    nameSwahili: "Giza na Dhoruba",
    category: "Rum",
    ingredients: [
      { name: "Dark Rum", amount: "60", unit: "ml" },
      { name: "Ginger Beer", amount: "120", unit: "ml" },
      { name: "Lime Juice", amount: "15", unit: "ml" },
      { name: "Ice", amount: "Cubes", unit: "whole" }
    ],
    instructions: "Fill a highball glass with ice. Add lime juice, then ginger beer. Float dark rum on top by pouring slowly over the back of a spoon.",
    glass: "Highball",
    garnish: "Lime wedge and candied ginger",
    substitutions: [
      { ingredient: "Dark Rum", substitute: "Goslings Black Seal is traditional; any dark rum works", note: "Goslings is the official rum for a proper Dark & Stormy." }
    ],
    images: ["https://www.thecocktaildb.com/images/media/drink/erwusg1454513072.jpg"],
    image: "https://www.thecocktaildb.com/images/media/drink/erwusg1454513072.jpg",
    videoUrl: null,
    priceKES: 780,
    prepTime: 3,
    difficulty: "Easy",
    occasions: ["Casual", "Relaxation"],
    isLocal: false,
    rating: 4.5,
    totalReviews: 142
  },
  {
    name: "Moscow Mule",
    nameSwahili: "Moscow Mule",
    category: "Vodka",
    ingredients: [
      { name: "Vodka", amount: "50", unit: "ml" },
      { name: "Ginger Beer", amount: "120", unit: "ml" },
      { name: "Lime Juice", amount: "15", unit: "ml" },
      { name: "Ice", amount: "Cubes", unit: "whole" }
    ],
    instructions: "Fill a copper mug with ice. Add vodka and lime juice. Top with ginger beer. Stir gently and garnish with a lime wedge and mint.",
    glass: "Copper Mug",
    garnish: "Lime wedge and mint sprig",
    substitutions: [
      { ingredient: "Vodka", substitute: "Gin or White Rum", note: "Gin creates a floral mule; rum creates a tropical variation." },
      { ingredient: "Ginger Beer", substitute: "Ginger Ale", note: "Ginger ale is milder and less spicy." }
    ],
    images: ["https://www.thecocktaildb.com/images/media/drink/3pylqc1504370988.jpg"],
    image: "https://www.thecocktaildb.com/images/media/drink/3pylqc1504370988.jpg",
    videoUrl: null,
    priceKES: 750,
    prepTime: 3,
    difficulty: "Easy",
    occasions: ["Casual", "Party"],
    isLocal: false,
    rating: 4.6,
    totalReviews: 278
  },
  {
    name: "Cosmopolitan",
    nameSwahili: "Cosmopolitan",
    category: "Vodka",
    ingredients: [
      { name: "Citrus Vodka", amount: "45", unit: "ml" },
      { name: "Triple Sec", amount: "20", unit: "ml" },
      { name: "Cranberry Juice", amount: "30", unit: "ml" },
      { name: "Lime Juice", amount: "15", unit: "ml" }
    ],
    instructions: "Shake all ingredients with ice until very cold. Strain into a chilled martini glass. Garnish with a flamed orange peel.",
    glass: "Martini",
    garnish: "Flamed orange peel",
    substitutions: [
      { ingredient: "Citrus Vodka", substitute: "Plain Vodka + a strip of lemon peel in the shaker", note: "Shaking with the peel infuses enough citrus oil." }
    ],
    images: ["https://www.thecocktaildb.com/images/media/drink/kpsajh1504368362.jpg"],
    image: "https://www.thecocktaildb.com/images/media/drink/kpsajh1504368362.jpg",
    videoUrl: null,
    priceKES: 850,
    prepTime: 5,
    difficulty: "Easy",
    occasions: ["Celebration", "Romantic", "Party"],
    isLocal: false,
    rating: 4.5,
    totalReviews: 196
  },
  {
    name: "Tom Collins",
    nameSwahili: "Tom Collins",
    category: "Gin",
    ingredients: [
      { name: "London Dry Gin", amount: "50", unit: "ml" },
      { name: "Lemon Juice", amount: "25", unit: "ml" },
      { name: "Simple Syrup", amount: "15", unit: "ml" },
      { name: "Soda Water", amount: "90", unit: "ml" },
      { name: "Ice", amount: "Cubes", unit: "whole" }
    ],
    instructions: "Shake gin, lemon juice, and syrup with ice. Strain into a Collins glass over fresh ice. Top with soda water. Garnish with a lemon slice and cherry.",
    glass: "Collins",
    garnish: "Lemon slice and cherry",
    substitutions: [
      { ingredient: "London Dry Gin", substitute: "Hendrick's or any quality gin", note: "Floral gins give an elegant twist to this classic." }
    ],
    images: ["https://www.thecocktaildb.com/images/media/drink/px3ped1504687115.jpg"],
    image: "https://www.thecocktaildb.com/images/media/drink/px3ped1504687115.jpg",
    videoUrl: null,
    priceKES: 800,
    prepTime: 5,
    difficulty: "Easy",
    occasions: ["Casual", "Party"],
    isLocal: false,
    rating: 4.4,
    totalReviews: 134
  },
  {
    name: "Piña Colada",
    nameSwahili: "Piña Colada",
    category: "Rum",
    ingredients: [
      { name: "White Rum", amount: "50", unit: "ml" },
      { name: "Coconut Cream", amount: "50", unit: "ml" },
      { name: "Pineapple Juice", amount: "120", unit: "ml" },
      { name: "Crushed Ice", amount: "1 cup", unit: "whole" }
    ],
    instructions: "Blend rum, coconut cream, and pineapple juice with crushed ice until smooth. Pour into a chilled hurricane glass. Garnish with a pineapple wedge.",
    glass: "Hurricane",
    garnish: "Pineapple wedge and cherry",
    substitutions: [
      { ingredient: "Coconut Cream", substitute: "Coconut milk (80 ml)", note: "Coconut milk is lighter; use more for similar creaminess." }
    ],
    images: ["https://www.thecocktaildb.com/images/media/drink/cpf4j51504371346.jpg"],
    image: "https://www.thecocktaildb.com/images/media/drink/cpf4j51504371346.jpg",
    videoUrl: null,
    priceKES: 850,
    prepTime: 5,
    difficulty: "Easy",
    occasions: ["Party", "Relaxation", "Casual"],
    isLocal: false,
    rating: 4.7,
    totalReviews: 304
  },
  {
    name: "Tequila Sunrise",
    nameSwahili: "Macheo ya Tequila",
    category: "Tequila",
    ingredients: [
      { name: "Tequila", amount: "45", unit: "ml" },
      { name: "Orange Juice", amount: "120", unit: "ml" },
      { name: "Grenadine", amount: "15", unit: "ml" },
      { name: "Ice", amount: "Cubes", unit: "whole" }
    ],
    instructions: "Pour tequila and orange juice over ice. Slowly drizzle grenadine down the side of the glass to create the sunrise gradient. Do not stir.",
    glass: "Highball",
    garnish: "Orange slice and cherry",
    substitutions: [
      { ingredient: "Grenadine", substitute: "Pomegranate syrup", note: "Real pomegranate syrup gives a more tart, complex sweetness." }
    ],
    images: ["https://www.thecocktaildb.com/images/media/drink/quqyqp1480879103.jpg"],
    image: "https://www.thecocktaildb.com/images/media/drink/quqyqp1480879103.jpg",
    videoUrl: null,
    priceKES: 750,
    prepTime: 3,
    difficulty: "Easy",
    occasions: ["Party", "Casual"],
    isLocal: false,
    rating: 4.5,
    totalReviews: 267
  },
  {
    name: "Boulevardier",
    nameSwahili: "Boulevardier",
    category: "Whisky",
    ingredients: [
      { name: "Bourbon", amount: "45", unit: "ml" },
      { name: "Campari", amount: "30", unit: "ml" },
      { name: "Sweet Vermouth", amount: "30", unit: "ml" },
      { name: "Ice", amount: "Cubes", unit: "whole" }
    ],
    instructions: "Stir all ingredients with ice in a mixing glass until well chilled. Strain into a rocks glass over one large ice cube. Express and place an orange peel.",
    glass: "Rocks",
    garnish: "Orange peel",
    substitutions: [
      { ingredient: "Bourbon", substitute: "Rye Whiskey", note: "Rye's spice balances Campari's bitterness beautifully." }
    ],
    images: ["https://images.unsplash.com/photo-1582056009559-23c05022a609?w=500&q=80"],
    image: "https://images.unsplash.com/photo-1582056009559-23c05022a609?w=500&q=80",
    videoUrl: null,
    priceKES: 1000,
    prepTime: 5,
    difficulty: "Easy",
    occasions: ["Relaxation", "Casual"],
    isLocal: false,
    rating: 4.7,
    totalReviews: 101
  },
  {
    name: "Sidecar",
    nameSwahili: "Sidecar",
    category: "Brandy",
    ingredients: [
      { name: "Cognac", amount: "50", unit: "ml" },
      { name: "Cointreau", amount: "25", unit: "ml" },
      { name: "Lemon Juice", amount: "25", unit: "ml" },
      { name: "Sugar", amount: "Rim", unit: "whole" }
    ],
    instructions: "Rim a coupe glass with sugar. Shake cognac, Cointreau, and lemon juice with ice. Strain into the prepared glass.",
    glass: "Coupe",
    garnish: "Sugared rim and lemon twist",
    substitutions: [
      { ingredient: "Cognac", substitute: "Armagnac or Brandy", note: "Any aged French brandy delivers the correct flavour profile." },
      { ingredient: "Cointreau", substitute: "Triple Sec or Grand Marnier", note: "Grand Marnier adds extra richness." }
    ],
    images: ["https://www.thecocktaildb.com/images/media/drink/iuwspt1504370134.jpg"],
    image: "https://www.thecocktaildb.com/images/media/drink/iuwspt1504370134.jpg",
    videoUrl: null,
    priceKES: 1100,
    prepTime: 5,
    difficulty: "Medium",
    occasions: ["Romantic", "Celebration"],
    isLocal: false,
    rating: 4.6,
    totalReviews: 88
  },
  {
    name: "Gin Fizz",
    nameSwahili: "Gin Fizz",
    category: "Gin",
    ingredients: [
      { name: "Gin", amount: "50", unit: "ml" },
      { name: "Lemon Juice", amount: "25", unit: "ml" },
      { name: "Simple Syrup", amount: "15", unit: "ml" },
      { name: "Soda Water", amount: "Top", unit: "whole" },
      { name: "Ice", amount: "Cubes", unit: "whole" }
    ],
    instructions: "Shake gin, lemon juice, and syrup with ice. Strain into a chilled glass (no ice). Top with cold soda water. Do not stir.",
    glass: "Highball",
    garnish: "Lemon slice",
    substitutions: [
      { ingredient: "Gin", substitute: "Vodka", note: "Creates a Vodka Fizz — just as refreshing." }
    ],
    images: ["https://www.thecocktaildb.com/images/media/drink/i9suxe1504361520.jpg"],
    image: "https://www.thecocktaildb.com/images/media/drink/i9suxe1504361520.jpg",
    videoUrl: null,
    priceKES: 800,
    prepTime: 4,
    difficulty: "Easy",
    occasions: ["Casual", "Party"],
    isLocal: false,
    rating: 4.4,
    totalReviews: 143
  },
  {
    name: "Watermelon Mint Cooler",
    nameSwahili: "Baridi ya Tikiti na Mint",
    category: "Non-Alcoholic",
    ingredients: [
      { name: "Fresh Watermelon Juice", amount: "150", unit: "ml" },
      { name: "Mint Leaves", amount: "6", unit: "whole" },
      { name: "Lime Juice", amount: "20", unit: "ml" },
      { name: "Simple Syrup", amount: "10", unit: "ml" },
      { name: "Soda Water", amount: "Splash", unit: "whole" }
    ],
    instructions: "Blend watermelon until smooth then strain. Muddle mint with lime juice and syrup. Combine in a glass over ice, top with a soda splash. Stir gently.",
    instructionsSwahili: "Koroga tikiti hadi laini, kisha chuja. Ponda mint na maji ya limau na syrup. Changanya kwenye glasi juu ya barafu, ongeza kidogo ya soda.",
    glass: "Highball",
    garnish: "Watermelon wedge and mint sprig",
    substitutions: [],
    images: ["https://images.unsplash.com/photo-1497534446932-c925b458314e?w=500&q=80"],
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=500&q=80",
    videoUrl: null,
    priceKES: 380,
    prepTime: 5,
    difficulty: "Easy",
    occasions: ["Casual", "Party"],
    isLocal: false,
    rating: 4.6,
    totalReviews: 57
  },
  {
    name: "Mango Lassi Mocktail",
    nameSwahili: "Mocktail ya Embe",
    category: "Non-Alcoholic",
    ingredients: [
      { name: "Fresh Mango Puree", amount: "120", unit: "ml" },
      { name: "Yoghurt", amount: "60", unit: "ml" },
      { name: "Milk", amount: "60", unit: "ml" },
      { name: "Cardamom", amount: "Pinch", unit: "whole" },
      { name: "Honey", amount: "1", unit: "tsp" }
    ],
    instructions: "Blend mango puree, yoghurt, milk, honey, and cardamom until smooth and frothy. Pour over ice in a tall glass.",
    instructionsSwahili: "Koroga puree ya embe, mtindi, maziwa, asali, na cardamom hadi laini. Mimina juu ya barafu kwenye glasi ndefu.",
    glass: "Collins",
    garnish: "Cardamom pod and mango slice",
    substitutions: [
      { ingredient: "Yoghurt", substitute: "Coconut yoghurt", note: "Makes it dairy-free with a tropical twist." },
      { ingredient: "Fresh Mango Puree", substitute: "Canned Alphonso mango pulp", note: "Intensely sweet and aromatic." }
    ],
    images: ["https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80"],
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80",
    videoUrl: null,
    priceKES: 420,
    prepTime: 5,
    difficulty: "Easy",
    occasions: ["Casual", "Party"],
    isLocal: false,
    rating: 4.7,
    totalReviews: 83
  }
];

module.exports = cocktails;

