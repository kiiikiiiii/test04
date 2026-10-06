"use client";

import { useSyncExternalStore } from "react";
import type { Recipe } from "@/lib/recipes";
import { pickColor, pickEmoji } from "@/lib/recipeIcon";

const STORAGE_KEY = "diet-recipes:my-recipes";
const EMPTY: Recipe[] = [];

const listeners = new Set<() => void>();
let myRecipes: Recipe[] | null = null;

export interface RecipeInput {
  title: string;
  /** 한 줄에 한 단계씩 적은 조리 방법 */
  body: string;
}

function load(): Recipe[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getSnapshot(): Recipe[] {
  if (myRecipes === null) myRecipes = load();
  return myRecipes;
}

function getServerSnapshot(): Recipe[] {
  return EMPTY;
}

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  // 다른 탭에서 글을 추가·수정하면 동기화
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    myRecipes = load();
    emit();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function save(next: Recipe[]) {
  myRecipes = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // 저장소를 쓸 수 없는 환경에서는 현재 세션에서만 유지
  }
  emit();
}

function toRecipe(id: number, { title, body }: RecipeInput): Recipe {
  const name = title.trim();
  const steps = body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return {
    id,
    title: name,
    category: "mine",
    emoji: pickEmoji(name),
    color: pickColor(name),
    description: steps[0] ?? "",
    ingredients: [],
    steps,
  };
}

/** 수정 폼에 채울 수 있도록 레시피를 입력값 형태로 되돌린다 */
export function toRecipeInput(recipe: Recipe): RecipeInput {
  return { title: recipe.title, body: recipe.steps.join("\n") };
}

function addRecipe(input: RecipeInput) {
  // 기본 레시피 id(1~)와 겹치지 않도록 시간값을 id로 쓴다
  save([toRecipe(Date.now(), input), ...getSnapshot()]);
}

function updateRecipe(id: number, input: RecipeInput) {
  save(getSnapshot().map((r) => (r.id === id ? toRecipe(id, input) : r)));
}

export function useMyRecipes() {
  const recipes = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { recipes, addRecipe, updateRecipe };
}
