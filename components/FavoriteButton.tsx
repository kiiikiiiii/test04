import styles from "./FavoriteButton.module.css";

interface Props {
  active: boolean;
  onToggle: () => void;
  /** "icon": 카드 위 원형 아이콘, "pill": 모달 안 텍스트 버튼 */
  variant?: "icon" | "pill";
  className?: string;
}

export default function FavoriteButton({ active, onToggle, variant = "icon", className }: Props) {
  const classes = [styles.button, styles[variant], active && styles.active, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classes}
      aria-pressed={active}
      aria-label={active ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      onClick={onToggle}
    >
      {variant === "pill" ? (active ? "♥ 저장됨" : "♡ 즐겨찾기") : active ? "♥" : "♡"}
    </button>
  );
}
