export function getHoverInfo(hoverPath, beforePath, afterPath, offset, options) {
  if (!hoverPath || !beforePath) return { level: 0 };

  // Does the positon of 'after' affect the possible hover range?
  let isAfterRestrictive = afterPath && afterPath.getLevel() > 0;

  let maxLevel  = beforePath.getLevel() + 1;
  let minLevel  = 0;
  if (isAfterRestrictive) minLevel = afterPath.getLevel() - 1;

  let indicated = hoverPath.getIndicatedLevel(offset, options);
  let level = Math.max(Math.min(indicated, maxLevel), minLevel);
  
  return {
    level,
    isFirstChildOfBefore: level === maxLevel,
    isDirectParentOfAfter: level === minLevel && isAfterRestrictive
  };
}
