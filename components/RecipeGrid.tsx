import type { Recipe } from "@/lib/recipes";
import RecipeCard from "./RecipeCard";
import styles from "./RecipeGrid.module.css";

interface Props {
  recipes: Recipe[];
  isFavorite: (id: number) => boolean;
  onToggleFavorite: (id: number) => void;
  onSelect: (id: number) => void;
  onEdit: (id: number) => void;
}

export default function RecipeGrid({ recipes, isFavorite, onToggleFavorite, onSelect, onEdit }: Props) {
  return (
    <section className={styles.grid} aria-live="polite">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavorite={isFavorite(recipe.id)}
          onToggleFavorite={() => onToggleFavorite(recipe.id)}
          onSelect={() => onSelect(recipe.id)}
          onEdit={recipe.category === "mine" ? () => onEdit(recipe.id) : undefined}
        />
      ))}
    </section>
  );
}
