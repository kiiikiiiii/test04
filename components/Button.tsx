import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import styles from "./Button.module.css";

type Variant = "primary" | "outline";

function classes(variant: Variant, block?: boolean, extra?: string) {
  return [styles.button, styles[variant], block && styles.block, extra].filter(Boolean).join(" ");
}

/** 버튼처럼 보이는 링크 (페이지 이동용) */
export function ButtonLink({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={classes(variant)}>
      {children}
    </Link>
  );
}

/** 기본 버튼 (폼 제출 등) */
export function Button({
  variant = "primary",
  block,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; block?: boolean }) {
  return <button className={classes(variant, block, className)} {...props} />;
}
