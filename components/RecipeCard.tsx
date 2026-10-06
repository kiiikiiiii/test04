import { categoryLabel, type Recipe } from "@/lib/recipes";
import FavoriteButton from "./FavoriteButton";
import styles from "./RecipeCard.module.css";

interface Props {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onSelect: () => void;
}

export default function RecipeCard({ recipe, isFavorite, onToggleFavorite, onSelect }: Props) {
  return (
    <article className={styles.card}>
      <button
        type="button"
        className={styles.open}
        onClick={onSelect}
        aria-label={`${recipe.title} 상세 보기`}
      >
        <div className={styles.hero} style={{ background: recipe.color }}>
          <span className={styles.emoji} aria-hidden="true">
            {recipe.emoji}
          </span>
        </div>
        <div className={styles.body}>
          <span className={styles.badge}>{categoryLabel(recipe.category)}</span>
          <h3 className={styles.title}>{recipe.title}</h3>
          <p className={styles.desc}>{recipe.description}</p>
          <div className={styles.meta}>
            <span>🔥 {recipe.kcal} kcal</span>
            <span>⏱ {recipe.time}분</span>
            <span>💪 {recipe.protein}g</span>
          </div>
        </div>
      </button>
      <FavoriteButton active={isFavorite} onToggle={onToggleFavorite} className={styles.fav} />
    </article>
  );
}
