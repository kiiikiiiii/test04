import Link from "next/link";
import { ButtonLink } from "./Button";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            🥗 가벼운 한 끼
          </Link>
          <p className={styles.tagline}>맛있게 먹고 가볍게 관리하는 다이어트 레시피</p>
        </div>
        <nav className={styles.actions} aria-label="계정">
          <ButtonLink href="/login" variant="outline">
            로그인
          </ButtonLink>
          <ButtonLink href="/signup">회원가입</ButtonLink>
        </nav>
      </div>
    </header>
  );
}
