import { createClient } from "@supabase/supabase-js";

// Vite 환경 변수 불러오기
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// 단일 Supabase 클라이언트 인스턴스 생성 및 내보내기
export const supabase = createClient(supabaseUrl, supabaseKey);
