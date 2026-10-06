import { CATEGORIES, type CategoryFilter as Filter } from "@/lib/recipes";
import styles from "./CategoryFilter.module.css";

interface Props {
  active: Filter;
  counts: Record<Filter, number>;
  onChange: (category: Filter) => void;
}

export default function CategoryFilter({ active, counts, onChange }: Props) {
  return (
    <div className={styles.filters} role="group" aria-label="카테고리 필터">
      {CATEGORIES.map((c) => {
        const isActive = c.id === active;
        const className = [
          styles.chip,
          isActive && styles.active,
          c.id === "favorites" && styles.fav,
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <button
            key={c.id}
            type="button"
            className={className}
            aria-pressed={isActive}
            onClick={() => onChange(c.id)}
          >
            {c.label} <span className={styles.count}>{counts[c.id]}</span>
          </button>
        );
      })}
    </div>
  );
}
