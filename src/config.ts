export type Role = "sales" | "hr" | "engineer";
// 正式URLの提供後、職種ごとに設定する。未設定のURLを捏造しない。
export const lineUrls: Record<Role, string | null> = {
  sales: null,
  hr: null,
  engineer: null,
};
export const roleNames: Record<Role, string> = {
  sales: "営業",
  hr: "人事",
  engineer: "エンジニア",
};
