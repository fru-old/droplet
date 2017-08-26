export function getPreview({levelDifference, bounds, direction, center}, options) {
  let space = options.extraSpacing;
  let {x, y, width, height} = bounds;

  if (direction === 0 || direction === 2) {
    x += levelDifference * options.levelWidth;

    if (center) {
      return { x, width, height: space, y: y + height / 2 - space / 2 };
    } else if (direction === 0) {
      return { x, width, height: space, y: y - space };
    } else if (direction === 2) {
      return { x, width, height: space, y: y + height };
    }
  }



}
