import RecipeExplorer from "@/components/RecipeExplorer";
import { RECIPES } from "@/lib/recipes";

export default function Home() {
  return <RecipeExplorer recipes={RECIPES} />;
}
