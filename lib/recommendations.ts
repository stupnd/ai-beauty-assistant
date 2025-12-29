export type SkinType = "oily" | "dry" | "combo" | "normal";
export type Concern = "acne" | "dryness" | "redness" | "dark_circles";
export type Budget = "drugstore" | "mid" | "high";

export type RoutineStep = {
  step: string;
  why: string;
};

export type RecommendationResult = {
  headline: string;
  routineAM: RoutineStep[];
  routinePM: RoutineStep[];
  ingredientsToLookFor: string[];
  ingredientsToAvoid: string[];
  productIdeas: { name: string; category: string; note: string }[];
};

const BUDGET_NOTE: Record<Budget, string> = {
  drugstore: "Budget-friendly picks",
  mid: "Mid-range picks",
  high: "Premium picks",
};

export function getRecommendations(input: {
  skinType: SkinType;
  sensitive: boolean;
  concern: Concern;
  budget: Budget;
}): RecommendationResult {
  const { skinType, sensitive, concern, budget } = input;

  const ingredientsToLookFor: string[] = [];
  const ingredientsToAvoid: string[] = [];

  // Base routine
  const routineAM: RoutineStep[] = [
    { step: "Gentle cleanser", why: "Removes oil + sweat without stripping." },
    { step: "Moisturizer", why: "Protects your barrier so your skin stays balanced." },
    { step: "Sunscreen (SPF 30+)", why: "Prevents dark spots + irritation and protects results." },
  ];

  const routinePM: RoutineStep[] = [
    { step: "Cleanser", why: "Cleans off sunscreen and daily buildup." },
    { step: "Moisturizer", why: "Repairs barrier overnight." },
  ];

  // Adjust by skin type
  if (skinType === "oily") {
    ingredientsToLookFor.push("niacinamide", "salicylic acid (BHA)", "lightweight gel moisturizers");
  }
  if (skinType === "dry") {
    ingredientsToLookFor.push("ceramides", "glycerin", "hyaluronic acid", "squalane");
    ingredientsToAvoid.push("harsh foaming cleansers", "over-exfoliating daily");
  }
  if (skinType === "combo") {
    ingredientsToLookFor.push("niacinamide", "ceramides", "gentle exfoliation 2–3x/week");
  }
  if (skinType === "normal") {
    ingredientsToLookFor.push("simple barrier support (ceramides)", "daily SPF");
  }

  // Adjust by concern
  if (concern === "acne") {
    routinePM.splice(1, 0, {
      step: "Acne active (2–4 nights/week)",
      why: "Targets breakouts while reducing irritation risk.",
    });
    ingredientsToLookFor.push("salicylic acid (BHA)", "benzoyl peroxide (spot)", "adapalene (retinoid)");
  }

  if (concern === "dryness") {
    routinePM.splice(1, 0, {
      step: "Hydrating serum (optional)",
      why: "Adds water + plumps skin before moisturizer.",
    });
    ingredientsToLookFor.push("hyaluronic acid", "glycerin", "panthenol");
  }

  if (concern === "redness") {
    routinePM.splice(1, 0, {
      step: "Soothing step (optional)",
      why: "Calms irritation and supports barrier recovery.",
    });
    ingredientsToLookFor.push("centella (cica)", "panthenol", "azelaic acid (gentle)");
    ingredientsToAvoid.push("strong acids daily", "fragrance (if you react)");
  }

  if (concern === "dark_circles") {
    routineAM.splice(2, 0, {
      step: "Eye step (optional)",
      why: "Targets puffiness/appearance with consistent use.",
    });
    ingredientsToLookFor.push("caffeine (eye)", "vitamin C (gentle)", "retinol (low %) for night (careful)");
  }

  // Sensitive toggle
  if (sensitive) {
    ingredientsToAvoid.push("fragrance", "high % acids", "too many actives at once");
  }

  // Product ideas (generic, not brand-specific yet)
  const productIdeas = [
    { category: "Cleanser", name: "Gentle cleanser", note: "Non-stripping, no strong fragrance." },
    { category: "Moisturizer", name: "Barrier moisturizer", note: "Look for ceramides/glycerin." },
    { category: "Sunscreen", name: "SPF 30+ daily", note: "Comfortable finish so you’ll actually wear it." },
  ];

  // Add an “active” based on concern
  if (concern === "acne") {
    productIdeas.push({
      category: "Treatment",
      name: "BHA or adapalene (start slow)",
      note: "2–3 nights/week, moisturize well.",
    });
  } else if (concern === "redness") {
    productIdeas.push({
      category: "Treatment",
      name: "Azelaic acid (gentle)",
      note: "Helps redness/texture with lower irritation risk.",
    });
  } else if (concern === "dryness") {
    productIdeas.push({
      category: "Serum",
      name: "Hydrating serum",
      note: "Layer under moisturizer at night.",
    });
  } else if (concern === "dark_circles") {
    productIdeas.push({
      category: "Eye",
      name: "Caffeine eye product (optional)",
      note: "Best for puffiness/appearance; sleep matters too.",
    });
  }

  const headline = `${BUDGET_NOTE[budget]} • Focus: ${concern.replace("_", " ")}`;

  return {
    headline,
    routineAM,
    routinePM,
    ingredientsToLookFor: dedupe(ingredientsToLookFor),
    ingredientsToAvoid: dedupe(ingredientsToAvoid),
    productIdeas,
  };
}

function dedupe(arr: string[]) {
  return Array.from(new Set(arr));
}
