"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "diet-recipes:favorites";
const EMPTY: number[] = [];

const listeners = new Set<() => void>();
let favorites: number[] | null = null;

function load(): number[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === "number") : [];
  } catch {
    return [];
  }
}

function getSnapshot(): number[] {
  if (favorites === null) favorites = load();
  return favorites;
}

function getServerSnapshot(): number[] {
  return EMPTY;
}

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  // 다른 탭에서 즐겨찾기를 바꾸면 동기화
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    favorites = load();
    emit();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function toggleFavorite(id: number) {
  const current = getSnapshot();
  favorites = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // 저장소를 쓸 수 없는 환경에서는 현재 세션에서만 유지
  }
  emit();
}

export function useFavorites() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isFavorite = useCallback((id: number) => ids.includes(id), [ids]);
  return { ids, isFavorite, toggleFavorite };
}
