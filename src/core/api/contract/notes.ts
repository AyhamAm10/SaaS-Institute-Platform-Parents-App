/** A note the institute wrote for the family (GET /mobile/students/:id/notes, guardians only). */
export interface FamilyNote {
  id: number;
  body: string;
  /** ISO instant. */
  createdAt: string;
  /** Who wrote it, null when unknown. */
  author: string | null;
}
