"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import type { RecipeInput } from "@/hooks/useMyRecipes";
import { pickColor, pickEmoji } from "@/lib/recipeIcon";
import TextField from "./TextField";
import { Button } from "./Button";
import fieldStyles from "./TextField.module.css";
import styles from "./RecipeFormModal.module.css";

const MAX_TITLE = 40;

interface Props {
  /** 수정할 때 채워 둘 값. 없으면 새 글 작성 */
  initial?: RecipeInput;
  onSubmit: (input: RecipeInput) => void;
  onClose: () => void;
}

export default function RecipeFormModal({ initial, onSubmit, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const bodyId = useId();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [submitted, setSubmitted] = useState(false);
  const isEdit = initial !== undefined;

  // 마운트되면 바로 연다. 부모가 닫을 때는 컴포넌트를 내린다.
  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const titleError = submitted && !title.trim() ? "음식명을 입력해 주세요." : null;
  const bodyError = submitted && !body.trim() ? "레시피를 입력해 주세요." : null;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    if (!title.trim() || !body.trim()) return;
    onSubmit({ title, body });
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="recipe-form-title"
      onClose={onClose}
      onClick={(e) => {
        // 패널 바깥(배경) 클릭 시 닫기
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <form className={styles.panel} onSubmit={handleSubmit} noValidate>
        <h2 id="recipe-form-title" className={styles.heading}>
          {isEdit ? "레시피 수정" : "새 레시피 작성"}
        </h2>

        <div className={styles.preview}>
          <span className={styles.icon} style={{ background: pickColor(title) }} aria-hidden="true">
            {pickEmoji(title)}
          </span>
          <p>아이콘은 음식명에 맞춰 자동으로 만들어져요.</p>
        </div>

        <TextField
          label="음식명"
          name="title"
          autoFocus
          maxLength={MAX_TITLE}
          placeholder="예) 닭가슴살 덮밥"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={titleError}
        />

        <div className={fieldStyles.field}>
          <label htmlFor={bodyId} className={fieldStyles.label}>
            레시피
          </label>
          <textarea
            id={bodyId}
            name="body"
            rows={7}
            className={`${fieldStyles.input} ${styles.textarea}`}
            placeholder={"한 줄에 한 단계씩 적어 주세요.\n예) 닭가슴살을 한입 크기로 썬다."}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            aria-invalid={bodyError ? true : undefined}
            aria-describedby={`${bodyId}-message`}
          />
          <p id={`${bodyId}-message`} className={bodyError ? fieldStyles.error : fieldStyles.hint}>
            {bodyError ?? "줄을 바꾸면 조리 순서가 나뉘어 보여요."}
          </p>
        </div>

        <div className={styles.actions}>
          <Button type="button" variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button type="submit">{isEdit ? "수정 완료" : "등록"}</Button>
        </div>
      </form>
    </dialog>
  );
}
