"use client";

import { useState, type FormEvent } from "react";
import TextField from "./TextField";
import { Button } from "./Button";
import styles from "./AuthForm.module.css";

const ID_PATTERN = /^[a-zA-Z0-9_]{4,20}$/;
const MIN_PASSWORD = 8;

function validate(id: string, password: string, confirm: string) {
  return {
    id: !id.trim()
      ? "아이디를 입력해 주세요."
      : !ID_PATTERN.test(id.trim())
        ? "영문, 숫자, 밑줄(_)로 4~20자 입력해 주세요."
        : null,
    password: !password
      ? "비밀번호를 입력해 주세요."
      : password.length < MIN_PASSWORD
        ? `비밀번호는 ${MIN_PASSWORD}자 이상이어야 해요.`
        : null,
    confirm: !confirm
      ? "비밀번호를 한 번 더 입력해 주세요."
      : confirm !== password
        ? "비밀번호가 일치하지 않아요."
        : null,
  };
}

export default function SignupForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const errors = validate(id, password, confirm);
  // 제출 전에는 비밀번호 확인 불일치만 입력 즉시 알려준다
  const shown = submitted
    ? errors
    : { id: null, password: null, confirm: confirm && errors.confirm ? errors.confirm : null };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    if (errors.id || errors.password || errors.confirm) return;
    // TODO: 회원가입 API 연동
    setNotice(`${id.trim()}님, 회원가입 요청을 받았어요. (아직 서버와 연결되지 않았습니다)`);
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
        error={shown.id}
        hint="영문, 숫자, 밑줄(_) 4~20자"
      />
      <TextField
        label="비밀번호"
        name="new-password"
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={shown.password}
        hint={`${MIN_PASSWORD}자 이상`}
      />
      <TextField
        label="비밀번호 확인"
        name="confirm-password"
        type="password"
        autoComplete="new-password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        error={shown.confirm}
      />
      {notice && (
        <p className={styles.notice} role="status">
          {notice}
        </p>
      )}
      <Button type="submit" block className={styles.submit}>
        회원가입
      </Button>
    </form>
  );
}
