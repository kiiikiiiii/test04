import { createClient } from "@supabase/supabase-js";

// NEXT_PUBLIC_ 변수는 빌드 시 코드에 그대로 치환되므로 반드시 이 형태로 참조해야 한다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase 환경 변수가 없습니다. 프로젝트 루트의 .env.local에 " +
      "NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY를 설정하세요.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
