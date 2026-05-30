export type Roast = "light" | "medium" | "dark";
export type Grind = "fine" | "medium" | "coarse";
export type Orientation = "standard" | "inverted";
export type BrewTime = "short" | "medium" | "long";

export interface Step {
  // Elapsed time from brew start, in seconds. Omit for untimed prep steps.
  at?: number;
  instruction: string;
}

export interface Recipe {
  author: string;
  blurb: string;
  // Comandante C40 clicks from zero (closed burr).
  c40Clicks: number;
  coffeeGrams: number;
  grind: Grind;
  id: string;
  name: string;
  orientation: Orientation;
  roast: Roast;
  steps: Step[];
  // Total brew time in seconds, from pour to finished press.
  totalSeconds: number;
  waterGrams: number;
  waterTempC: number;
}

export const ROAST_LABELS: Record<Roast, string> = {
  light: "Light",
  medium: "Medium",
  dark: "Dark",
};

export const GRIND_LABELS: Record<Grind, string> = {
  fine: "Fine",
  medium: "Medium",
  coarse: "Coarse",
};

export const ORIENTATION_LABELS: Record<Orientation, string> = {
  standard: "Standard",
  inverted: "Inverted",
};

export const BREW_TIME_LABELS: Record<BrewTime, string> = {
  short: "Under 2 min",
  medium: "2 - 5 min",
  long: "Over 5 min",
};

export function brewTimeBucket(totalSeconds: number): BrewTime {
  if (totalSeconds < 120) {
    return "short";
  }
  if (totalSeconds <= 300) {
    return "medium";
  }
  return "long";
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) {
    return `${secs}s`;
  }
  if (secs === 0) {
    return `${mins}:00`;
  }
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export const recipes: Recipe[] = [
  {
    id: "hoffmann-ultimate",
    name: "The Ultimate AeroPress",
    author: "James Hoffmann",
    blurb: "A simple, repeatable cup with very little fuss.",
    roast: "medium",
    grind: "fine",
    orientation: "standard",
    coffeeGrams: 11,
    waterGrams: 200,
    waterTempC: 95,
    c40Clicks: 18,
    totalSeconds: 150,
    steps: [
      {
        instruction: "Rinse a paper filter and add 11g of fine ground coffee.",
      },
      { at: 0, instruction: "Pour in 200g of water near boiling." },
      {
        at: 10,
        instruction: "Place plunger on top to stop dripping and wait.",
      },
      {
        at: 120,
        instruction: "Swirl the brewer gently to settle the grounds.",
      },
      { at: 130, instruction: "Press gently for about 20 seconds." },
      {
        at: 150,
        instruction: "Stop pressing when you hear the hiss. Dilute to taste.",
      },
    ],
  },
  {
    id: "wendelboe-classic",
    name: "Nordic Light",
    author: "Tim Wendelboe style",
    blurb: "Bright and tea-like, made for light Scandinavian roasts.",
    roast: "light",
    grind: "medium",
    orientation: "standard",
    coffeeGrams: 14,
    waterGrams: 220,
    waterTempC: 94,
    c40Clicks: 26,
    totalSeconds: 135,
    steps: [
      { instruction: "Rinse filter. Add 14g of medium ground coffee." },
      { at: 0, instruction: "Pour 220g of water and stir twice." },
      { at: 30, instruction: "Insert plunger and let it steep." },
      { at: 105, instruction: "Swirl, then press slowly." },
      { at: 135, instruction: "Finish the press." },
    ],
  },
  {
    id: "world-champ-2018",
    name: "Inverted Champion",
    author: "WAC inspired",
    blurb: "A competition-style inverted brew built for clarity and sweetness.",
    roast: "light",
    grind: "medium",
    orientation: "inverted",
    coffeeGrams: 18,
    waterGrams: 220,
    waterTempC: 82,
    c40Clicks: 25,
    totalSeconds: 90,
    steps: [
      { instruction: "Assemble inverted. Add 18g of medium ground coffee." },
      { at: 0, instruction: "Pour 220g of water at 82C and stir 5 times." },
      { at: 30, instruction: "Cap with a rinsed filter." },
      { at: 60, instruction: "Flip onto the cup carefully." },
      { at: 75, instruction: "Press steadily over 15 seconds." },
      { at: 90, instruction: "Stop before the hiss." },
    ],
  },
  {
    id: "fellow-everyday",
    name: "Everyday Cup",
    author: "Fellow style",
    blurb: "Balanced daily driver for medium roasts.",
    roast: "medium",
    grind: "medium",
    orientation: "standard",
    coffeeGrams: 15,
    waterGrams: 230,
    waterTempC: 92,
    c40Clicks: 24,
    totalSeconds: 105,
    steps: [
      { instruction: "Rinse filter, add 15g of medium ground coffee." },
      { at: 0, instruction: "Pour 230g of water and give a quick stir." },
      { at: 45, instruction: "Insert plunger and steep." },
      { at: 90, instruction: "Press over 15 seconds." },
      { at: 105, instruction: "Done." },
    ],
  },
  {
    id: "espresso-style",
    name: "Faux Espresso",
    author: "AeroPress classic",
    blurb: "A short, intense concentrate. Great as a base for milk drinks.",
    roast: "dark",
    grind: "fine",
    orientation: "standard",
    coffeeGrams: 20,
    waterGrams: 60,
    waterTempC: 88,
    c40Clicks: 12,
    totalSeconds: 60,
    steps: [
      { instruction: "Rinse filter. Add 20g of fine ground coffee." },
      { at: 0, instruction: "Pour 60g of water and stir quickly." },
      { at: 20, instruction: "Insert plunger." },
      { at: 30, instruction: "Press firmly over 30 seconds." },
      { at: 60, instruction: "Finish. Top with hot water or milk." },
    ],
  },
  {
    id: "bold-dark",
    name: "Bold & Dark",
    author: "AeroPress classic",
    blurb: "Rich, full-bodied cup for darker roasts.",
    roast: "dark",
    grind: "medium",
    orientation: "inverted",
    coffeeGrams: 17,
    waterGrams: 240,
    waterTempC: 85,
    c40Clicks: 22,
    totalSeconds: 150,
    steps: [
      { instruction: "Assemble inverted. Add 17g of medium ground coffee." },
      { at: 0, instruction: "Pour 240g of water at 85C and stir." },
      { at: 90, instruction: "Cap with rinsed filter and flip onto the cup." },
      { at: 120, instruction: "Press slowly over 30 seconds." },
      { at: 150, instruction: "Stop at the hiss." },
    ],
  },
  {
    id: "cold-bloom",
    name: "Long Bloom Light",
    author: "Third wave",
    blurb: "Extended steep that draws sweetness from delicate light roasts.",
    roast: "light",
    grind: "fine",
    orientation: "inverted",
    coffeeGrams: 16,
    waterGrams: 230,
    waterTempC: 90,
    c40Clicks: 16,
    totalSeconds: 330,
    steps: [
      { instruction: "Assemble inverted. Add 16g of fine ground coffee." },
      { at: 0, instruction: "Add 50g of water to bloom and stir gently." },
      { at: 45, instruction: "Pour remaining water up to 230g." },
      { at: 300, instruction: "Cap, flip onto the cup." },
      { at: 320, instruction: "Press slowly." },
      { at: 330, instruction: "Finish." },
    ],
  },
  {
    id: "quick-morning",
    name: "Quick Morning",
    author: "AeroPress classic",
    blurb: "Fast and forgiving when you are short on time.",
    roast: "medium",
    grind: "fine",
    orientation: "standard",
    coffeeGrams: 14,
    waterGrams: 200,
    waterTempC: 93,
    c40Clicks: 18,
    totalSeconds: 75,
    steps: [
      { instruction: "Rinse filter. Add 14g of fine ground coffee." },
      { at: 0, instruction: "Pour 200g of water and stir." },
      { at: 30, instruction: "Insert plunger." },
      { at: 45, instruction: "Press over 30 seconds." },
      { at: 75, instruction: "Done." },
    ],
  },
  {
    id: "sweet-spot",
    name: "Sweet Spot",
    author: "Barista pick",
    blurb: "Caramel sweetness and a syrupy body from medium roasts.",
    roast: "medium",
    grind: "coarse",
    orientation: "inverted",
    coffeeGrams: 18,
    waterGrams: 250,
    waterTempC: 90,
    c40Clicks: 30,
    totalSeconds: 165,
    steps: [
      { instruction: "Assemble inverted. Add 18g of coarse ground coffee." },
      { at: 0, instruction: "Pour 250g of water and stir 3 times." },
      { at: 120, instruction: "Cap and flip onto the cup." },
      { at: 140, instruction: "Press over 25 seconds." },
      { at: 165, instruction: "Finish." },
    ],
  },
  {
    id: "high-extract-light",
    name: "High Extraction Light",
    author: "Competition style",
    blurb: "Higher dose and agitation to fully develop bright roasts.",
    roast: "light",
    grind: "fine",
    orientation: "inverted",
    coffeeGrams: 20,
    waterGrams: 200,
    waterTempC: 96,
    c40Clicks: 15,
    totalSeconds: 180,
    steps: [
      { instruction: "Assemble inverted. Add 20g of fine ground coffee." },
      { at: 0, instruction: "Pour 200g of water at 96C and stir vigorously." },
      { at: 60, instruction: "Stir again." },
      { at: 150, instruction: "Cap and flip onto the cup." },
      { at: 165, instruction: "Press over 15 seconds." },
      { at: 180, instruction: "Finish." },
    ],
  },
  {
    id: "smooth-dark",
    name: "Smooth Dark",
    author: "AeroPress classic",
    blurb: "Low temperature brew that tames bitterness in dark roasts.",
    roast: "dark",
    grind: "coarse",
    orientation: "standard",
    coffeeGrams: 16,
    waterGrams: 240,
    waterTempC: 80,
    c40Clicks: 32,
    totalSeconds: 135,
    steps: [
      { instruction: "Rinse filter. Add 16g of coarse ground coffee." },
      { at: 0, instruction: "Pour 240g of water at 80C and stir." },
      { at: 90, instruction: "Insert plunger." },
      { at: 110, instruction: "Press slowly." },
      { at: 135, instruction: "Done." },
    ],
  },
  {
    id: "travel-concentrate",
    name: "Travel Concentrate",
    author: "AeroPress classic",
    blurb: "A strong concentrate to dilute wherever you are.",
    roast: "medium",
    grind: "fine",
    orientation: "inverted",
    coffeeGrams: 22,
    waterGrams: 120,
    waterTempC: 90,
    c40Clicks: 16,
    totalSeconds: 110,
    steps: [
      { instruction: "Assemble inverted. Add 22g of fine ground coffee." },
      { at: 0, instruction: "Pour 120g of water and stir well." },
      { at: 60, instruction: "Cap and flip onto the cup." },
      { at: 80, instruction: "Press over 30 seconds." },
      { at: 110, instruction: "Dilute 1:2 with hot water." },
    ],
  },
  {
    id: "tea-like",
    name: "Tea-Like Light",
    author: "Nordic style",
    blurb: "Coarse grind and gentle press for a clean, delicate cup.",
    roast: "light",
    grind: "coarse",
    orientation: "standard",
    coffeeGrams: 13,
    waterGrams: 220,
    waterTempC: 92,
    c40Clicks: 33,
    totalSeconds: 150,
    steps: [
      { instruction: "Rinse filter. Add 13g of coarse ground coffee." },
      { at: 0, instruction: "Pour 220g of water and stir once." },
      { at: 120, instruction: "Swirl gently." },
      { at: 135, instruction: "Press very slowly." },
      { at: 150, instruction: "Finish." },
    ],
  },
  {
    id: "creamy-medium",
    name: "Creamy Medium",
    author: "Barista pick",
    blurb: "Fine grind and a longer steep for a rounded, creamy body.",
    roast: "medium",
    grind: "fine",
    orientation: "inverted",
    coffeeGrams: 17,
    waterGrams: 230,
    waterTempC: 91,
    c40Clicks: 17,
    totalSeconds: 210,
    steps: [
      { instruction: "Assemble inverted. Add 17g of fine ground coffee." },
      { at: 0, instruction: "Pour 230g of water and stir 3 times." },
      { at: 180, instruction: "Cap and flip onto the cup." },
      { at: 195, instruction: "Press over 15 seconds." },
      { at: 210, instruction: "Finish." },
    ],
  },
  {
    id: "punchy-dark",
    name: "Punchy Dark",
    author: "AeroPress classic",
    blurb: "Quick, strong and bold for a morning kick.",
    roast: "dark",
    grind: "fine",
    orientation: "standard",
    coffeeGrams: 18,
    waterGrams: 180,
    waterTempC: 86,
    c40Clicks: 14,
    totalSeconds: 90,
    steps: [
      { instruction: "Rinse filter. Add 18g of fine ground coffee." },
      { at: 0, instruction: "Pour 180g of water and stir." },
      { at: 30, instruction: "Insert plunger." },
      { at: 60, instruction: "Press over 30 seconds." },
      { at: 90, instruction: "Done." },
    ],
  },
  {
    id: "balanced-coarse",
    name: "Balanced Coarse",
    author: "Everyday brew",
    blurb: "Coarse grind, longer steep, easy to dial in.",
    roast: "medium",
    grind: "coarse",
    orientation: "standard",
    coffeeGrams: 16,
    waterGrams: 250,
    waterTempC: 92,
    c40Clicks: 30,
    totalSeconds: 195,
    steps: [
      { instruction: "Rinse filter. Add 16g of coarse ground coffee." },
      { at: 0, instruction: "Pour 250g of water and stir twice." },
      { at: 165, instruction: "Swirl gently." },
      { at: 180, instruction: "Press over 15 seconds." },
      { at: 195, instruction: "Finish." },
    ],
  },
  {
    id: "ristretto-punch",
    name: "Ristretto Punch",
    author: "AeroPress classic",
    blurb: "Tiny, syrupy shot for dark roasts when you want intensity.",
    roast: "dark",
    grind: "fine",
    orientation: "inverted",
    coffeeGrams: 19,
    waterGrams: 50,
    waterTempC: 87,
    c40Clicks: 11,
    totalSeconds: 75,
    steps: [
      { instruction: "Assemble inverted. Add 19g of fine ground coffee." },
      { at: 0, instruction: "Pour 50g of water and stir quickly." },
      { at: 30, instruction: "Cap and flip onto the cup." },
      { at: 45, instruction: "Press firmly over 30 seconds." },
      { at: 75, instruction: "Top with hot water or steamed milk." },
    ],
  },
  {
    id: "floral-light",
    name: "Floral Filter",
    author: "Third wave",
    blurb: "Light pour-over style cup that keeps florals delicate and clean.",
    roast: "light",
    grind: "medium",
    orientation: "standard",
    coffeeGrams: 13,
    waterGrams: 210,
    waterTempC: 93,
    c40Clicks: 27,
    totalSeconds: 165,
    steps: [
      { instruction: "Rinse filter. Add 13g of medium ground coffee." },
      { at: 0, instruction: "Add 40g of water to bloom and stir." },
      { at: 30, instruction: "Pour remaining water up to 210g." },
      { at: 135, instruction: "Swirl, then insert plunger." },
      { at: 150, instruction: "Press slowly." },
      { at: 165, instruction: "Finish." },
    ],
  },
  {
    id: "choc-medium",
    name: "Chocolate Comfort",
    author: "Barista pick",
    blurb: "Rounded, cocoa-forward cup for comfortable medium roasts.",
    roast: "medium",
    grind: "medium",
    orientation: "standard",
    coffeeGrams: 16,
    waterGrams: 230,
    waterTempC: 90,
    c40Clicks: 23,
    totalSeconds: 150,
    steps: [
      { instruction: "Rinse filter. Add 16g of medium ground coffee." },
      { at: 0, instruction: "Pour 230g of water and stir twice." },
      { at: 60, instruction: "Insert plunger and steep." },
      { at: 130, instruction: "Press over 20 seconds." },
      { at: 150, instruction: "Done." },
    ],
  },
  {
    id: "iced-aeropress",
    name: "Iced AeroPress",
    author: "AeroPress classic",
    blurb: "Strong concentrate pressed straight onto ice for a crisp iced cup.",
    roast: "medium",
    grind: "fine",
    orientation: "inverted",
    coffeeGrams: 18,
    waterGrams: 120,
    waterTempC: 92,
    c40Clicks: 17,
    totalSeconds: 105,
    steps: [
      { instruction: "Fill your cup with ice. Assemble inverted." },
      {
        at: 0,
        instruction: "Add 18g of fine coffee, pour 120g of water, stir.",
      },
      { at: 45, instruction: "Cap and flip onto the iced cup." },
      { at: 75, instruction: "Press over 30 seconds." },
      { at: 105, instruction: "Stir and top with cold water to taste." },
    ],
  },
  {
    id: "decaf-easy",
    name: "Easy Decaf",
    author: "Everyday brew",
    blurb: "Forgiving recipe that keeps decaf sweet and free of harshness.",
    roast: "medium",
    grind: "coarse",
    orientation: "standard",
    coffeeGrams: 17,
    waterGrams: 240,
    waterTempC: 89,
    c40Clicks: 29,
    totalSeconds: 180,
    steps: [
      { instruction: "Rinse filter. Add 17g of coarse ground coffee." },
      { at: 0, instruction: "Pour 240g of water and stir twice." },
      { at: 150, instruction: "Swirl gently." },
      { at: 165, instruction: "Press over 15 seconds." },
      { at: 180, instruction: "Finish." },
    ],
  },
  {
    id: "competition-sweet",
    name: "Sweet Competition",
    author: "Competition style",
    blurb:
      "Long, gentle extraction that chases maximum sweetness in light roasts.",
    roast: "light",
    grind: "fine",
    orientation: "inverted",
    coffeeGrams: 16,
    waterGrams: 240,
    waterTempC: 94,
    c40Clicks: 16,
    totalSeconds: 320,
    steps: [
      { instruction: "Assemble inverted. Add 16g of fine ground coffee." },
      { at: 0, instruction: "Pour 240g of water at 94C and stir 4 times." },
      { at: 90, instruction: "Stir once more." },
      { at: 290, instruction: "Cap and flip onto the cup." },
      { at: 305, instruction: "Press slowly over 15 seconds." },
      { at: 320, instruction: "Finish." },
    ],
  },
];

export function getRecipe(id: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.id === id);
}

export interface Category {
  blurb: string;
  id: string;
  match: (recipe: Recipe) => boolean;
  name: string;
}

export const categories: Category[] = [
  {
    id: "espresso-short",
    name: "Espresso & short",
    blurb: "Small, intense concentrates",
    match: (recipe) => recipe.waterGrams <= 120,
  },
  {
    id: "v60-style",
    name: "V60 style",
    blurb: "Clean, filter-like clarity",
    match: (recipe) =>
      recipe.orientation === "standard" && recipe.grind !== "fine",
  },
  {
    id: "for-two",
    name: "For two",
    blurb: "Bigger batches, 240g and up",
    match: (recipe) => recipe.waterGrams >= 240,
  },
  {
    id: "quick",
    name: "Quick",
    blurb: "Done in under two minutes",
    match: (recipe) => recipe.totalSeconds < 120,
  },
  {
    id: "bold-dark",
    name: "Bold & dark",
    blurb: "Rich cups for darker roasts",
    match: (recipe) => recipe.roast === "dark",
  },
  {
    id: "light-bright",
    name: "Light & bright",
    blurb: "Delicate, fruity light roasts",
    match: (recipe) => recipe.roast === "light",
  },
  {
    id: "all",
    name: "Browse all",
    blurb: "Every recipe",
    match: () => true,
  },
];

export function getCategory(id: string): Category | undefined {
  return categories.find((category) => category.id === id);
}

export function categoryRecipes(category: Category): Recipe[] {
  return recipes.filter(category.match);
}

export interface Filters {
  brewTime: BrewTime | null;
  grind: Grind | null;
  orientation: Orientation | null;
  roast: Roast | null;
}

export function filterRecipes(filters: Filters): Recipe[] {
  return recipes.filter((recipe) => {
    if (filters.roast && recipe.roast !== filters.roast) {
      return false;
    }
    if (filters.grind && recipe.grind !== filters.grind) {
      return false;
    }
    if (filters.orientation && recipe.orientation !== filters.orientation) {
      return false;
    }
    if (
      filters.brewTime &&
      brewTimeBucket(recipe.totalSeconds) !== filters.brewTime
    ) {
      return false;
    }
    return true;
  });
}
