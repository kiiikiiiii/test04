import type { ReactNode } from "react";
import styles from "./AuthCard.module.css";

interface Props {
  title: string;
  description?: string;
  /** 카드 하단 안내 (예: "계정이 없나요? 회원가입") */
  footer?: ReactNode;
  children: ReactNode;
}

export default function AuthCard({ title, description, footer, children }: Props) {
  return (
    <section className={styles.wrap}>
      <div className={styles.card}>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.desc}>{description}</p>}
        {children}
      </div>
      {footer && <p className={styles.footer}>{footer}</p>}
    </section>
  );
}
