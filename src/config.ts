export type Role = "sales" | "hr" | "engineer";
export type LineSource = Role | "overview";
// 2026-10-19に提供された流入元別の正式LINE URL。
export const lineUrls: Record<LineSource, string | null> = {
  overview: "https://s.lmes.jp/landing-qr/1657893371-rRVdmjzQ?uLand=DEUpQ8",
  sales: "https://s.lmes.jp/landing-qr/1657893371-rRVdmjzQ?uLand=nRXMPl",
  hr: "https://s.lmes.jp/landing-qr/1657893371-rRVdmjzQ?uLand=XJFhyu",
  engineer: "https://s.lmes.jp/landing-qr/1657893371-rRVdmjzQ?uLand=WxzOIt",
};
export const roleNames: Record<Role, string> = {
  sales: "営業",
  hr: "人事",
  engineer: "エンジニア",
};
