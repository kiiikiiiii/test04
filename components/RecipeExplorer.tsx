"use client";

import { useMemo, useRef, useState } from "react";
import type { CategoryFilter as Filter, Recipe } from "@/lib/recipes";
import { useFavorites } from "@/hooks/useFavorites";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import RecipeGrid from "./RecipeGrid";
import RecipeModal from "./RecipeModal";
import Pagination from "./Pagination";
import styles from "./RecipeExplorer.module.css";

const PAGE_SIZE = 12;

interface Props {
  recipes: Recipe[];
}

export default function RecipeExplorer({ recipes }: Props) {
  const [category, setCategory] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const countRef = useRef<HTMLParagraphElement>(null);
  const { ids: favoriteIds, isFavorite, toggleFavorite } = useFavorites();

  const counts = useMemo(() => {
    const result: Record<Filter, number> = {
      all: recipes.length,
      salad: 0,
      protein: 0,
      lowcarb: 0,
      soup: 0,
      snack: 0,
      favorites: favoriteIds.length,
    };
    recipes.forEach((r) => result[r.category]++);
    return result;
  }, [recipes, favoriteIds]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recipes.filter((r) => {
      if (category === "favorites" && !favoriteIds.includes(r.id)) return false;
      if (category !== "all" && category !== "favorites" && r.category !== category) return false;
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.ingredients.some((i) => i.toLowerCase().includes(q))
      );
    });
  }, [recipes, category, query, favoriteIds]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  // 즐겨찾기 해제 등으로 결과가 줄어들면 마지막 페이지로 맞춘다
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function changeCategory(next: Filter) {
    setCategory(next);
    setPage(1);
  }

  function changeQuery(next: string) {
    setQuery(next);
    setPage(1);
  }

  function changePage(next: number) {
    setPage(next);
    countRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const selected = recipes.find((r) => r.id === selectedId) ?? null;

  const emptyMessage =
    category === "favorites" && !query
      ? "아직 즐겨찾기한 레시피가 없어요. 카드의 ♡ 버튼을 눌러 추가해 보세요."
      : "조건에 맞는 레시피가 없어요. 다른 검색어나 카테고리를 선택해 보세요.";

  return (
    <>
      <section className={styles.toolbar}>
        <SearchBar value={query} onChange={changeQuery} />
        <CategoryFilter active={category} counts={counts} onChange={changeCategory} />
      </section>

      <p ref={countRef} className={styles.count}>
        {filtered.length}개의 레시피
      </p>

      {filtered.length > 0 ? (
        <>
          <RecipeGrid
            recipes={paged}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            onSelect={setSelectedId}
          />
          <Pagination page={currentPage} totalPages={totalPages} onChange={changePage} />
        </>
      ) : (
        <p className={styles.empty}>{emptyMessage}</p>
      )}

      <RecipeModal
        recipe={selected}
        isFavorite={selected ? isFavorite(selected.id) : false}
        onToggleFavorite={toggleFavorite}
        onClose={() => setSelectedId(null)}
      />
    </>
  );
}
