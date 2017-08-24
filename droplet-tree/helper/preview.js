export function getPreview({levelDifference, box, direction, selected}, options) {
  let space = options.extraSpacing;
  let {x, y, width, height} = box;

  if (direction === 0 || direction === 2) {
    x += levelDifference * options.levelWidth;

    if (selected) {
      return { x, width, height: space, y: y + height / 2 - space / 2 };
    } else if (direction === 0) {
      return { x, width, height: space, y: y - space };
    } else if (direction === 2) {
      return { x, width, height: space, y: y + height };
    }
  }



}
