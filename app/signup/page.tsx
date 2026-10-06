import type { Metadata } from "next";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "회원가입 · 가벼운 한 끼",
};

export default function SignupPage() {
  return (
    <AuthCard
      title="회원가입"
      description="가입하고 나만의 다이어트 레시피를 모아 보세요."
      footer={
        <>
          이미 계정이 있나요? <Link href="/login">로그인</Link>
        </>
      }
    >
      <SignupForm />
    </AuthCard>
  );
}
