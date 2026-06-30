export type ChoicesType = {
  id: number;
  label: string;
  order: number;
  // 서버로 보낼 때
  image?: string;

  // 프론트 전용
  imageFile?: File;
  imagePreview?: string;
};
