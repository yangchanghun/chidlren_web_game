import { supabase } from "../supabase";

// DB 테이블 구조에 맞는 타입 정의
export interface ScoreRecord {
  id?: number;
  name: string;
  score: number;
  created_at?: string;
}

// 1. 랭킹 불러오기 (Read)
export const getTopScores = async (
  limit: number = 5,
): Promise<ScoreRecord[]> => {
  const { data, error } = await supabase
    .from("surf_scores")
    .select("*")
    .order("score", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("랭킹 로드 실패:", error);
    return [];
  }
  return data || [];
};

// 2. 점수 등록하기 (Create)
export const addScore = async (
  name: string,
  score: number,
): Promise<boolean> => {
  const { error } = await supabase
    .from("surf_scores")
    .insert([{ name, score }]);

  if (error) {
    console.error("점수 등록 실패:", error);
    return false; // 실패 시 false 반환
  }
  return true; // 성공 시 true 반환
};
