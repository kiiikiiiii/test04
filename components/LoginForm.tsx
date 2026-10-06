"use client";

import { useState, type FormEvent } from "react";
import TextField from "./TextField";
import { Button } from "./Button";
import styles from "./AuthForm.module.css";

export default function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const idError = submitted && !id.trim() ? "아이디를 입력해 주세요." : null;
  const passwordError = submitted && !password ? "비밀번호를 입력해 주세요." : null;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    if (!id.trim() || !password) return;
    // TODO: 인증 서버 연동
    setNotice(`${id.trim()}님, 로그인 요청을 받았어요. (아직 서버와 연결되지 않았습니다)`);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <TextField
        label="아이디"
        name="username"
        autoComplete="username"
        autoFocus
        value={id}
        onChange={(e) => setId(e.target.value)}
        error={idError}
      />
      <TextField
        label="비밀번호"
        name="password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={passwordError}
      />
      {notice && (
        <p className={styles.notice} role="status">
          {notice}
        </p>
      )}
      <Button type="submit" block className={styles.submit}>
        로그인
      </Button>
    </form>
  );
}
