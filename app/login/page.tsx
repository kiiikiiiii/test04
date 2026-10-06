import type { Metadata } from "next";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "로그인 · 가벼운 한 끼",
};

export default function LoginPage() {
  return (
    <AuthCard
      title="로그인"
      description="저장해 둔 레시피를 어디서든 확인하세요."
      footer={
        <>
          아직 계정이 없나요? <Link href="/signup">회원가입</Link>
        </>
      }
    >
      <LoginForm />
    </AuthCard>
  );
}
