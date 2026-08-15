export function moveVCareerEvidenceIndex(
  current: number,
  direction: -1 | 1,
  count: number,
) {
  if (count <= 0) return 0;
  return Math.min(Math.max(current + direction, 0), count - 1);
}
