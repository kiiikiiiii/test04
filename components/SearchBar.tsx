import styles from "./SearchBar.module.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="search"
      className={styles.input}
      placeholder="레시피 이름이나 재료로 검색"
      aria-label="레시피 검색"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
