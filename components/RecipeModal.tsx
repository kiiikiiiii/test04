"use client";

import { useEffect, useRef } from "react";
import { categoryLabel, type Recipe } from "@/lib/recipes";
import FavoriteButton from "./FavoriteButton";
import styles from "./RecipeModal.module.css";

interface Props {
  recipe: Recipe | null;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onClose: () => void;
}

export default function RecipeModal({ recipe, isFavorite, onToggleFavorite, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // recipe가 있으면 열고, 없으면 닫는다. <dialog>가 ESC·포커스 이동·포커스 복원을 처리한다.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (recipe && !dialog.open) dialog.showModal();
    if (!recipe && dialog.open) dialog.close();
  }, [recipe]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="recipe-modal-title"
      onClose={onClose}
      onClick={(e) => {
        // 패널 바깥(배경) 클릭 시 닫기
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {recipe && (
        <article className={styles.panel}>
          <button type="button" className={styles.close} onClick={onClose} aria-label="닫기">
            ×
          </button>

          <div className={styles.hero} style={{ background: recipe.color }}>
            <span aria-hidden="true">{recipe.emoji}</span>
          </div>

          <div className={styles.body}>
            <div className={styles.head}>
              <div>
                <span className={styles.badge}>{categoryLabel(recipe.category)}</span>
                <h2 id="recipe-modal-title" className={styles.title}>
                  {recipe.title}
                </h2>
                <p className={styles.desc}>{recipe.description}</p>
              </div>
              <FavoriteButton
                variant="pill"
                active={isFavorite}
                onToggle={() => onToggleFavorite(recipe.id)}
              />
            </div>

            {recipe.kcal !== undefined && (
              <ul className={styles.stats}>
                <li>
                  <strong>{recipe.kcal}</strong>
                  <span>kcal</span>
                </li>
                <li>
                  <strong>{recipe.time}분</strong>
                  <span>조리 시간</span>
                </li>
                <li>
                  <strong>{recipe.protein}g</strong>
                  <span>단백질</span>
                </li>
              </ul>
            )}

            <div className={recipe.ingredients.length > 0 ? styles.cols : styles.single}>
              {recipe.ingredients.length > 0 && (
                <section>
                  <h3>재료</h3>
                  <ul className={styles.ingredients}>
                    {recipe.ingredients.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}
              <section>
                <h3>조리 방법</h3>
                <ol className={styles.steps}>
                  {recipe.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </section>
            </div>

            {recipe.tip && <p className={styles.tip}>💡 {recipe.tip}</p>}
          </div>
        </article>
      )}
    </dialog>
  );
}
