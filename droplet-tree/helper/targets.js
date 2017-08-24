function extra(rect, options, extraLeft = 0) {
  let spacing = options.extraSpacing;
  return {
    y: rect.y - spacing,
    x: rect.x - spacing - extraLeft,
    height: rect.height + 2 * spacing,
    width:  rect.width  + 2 * spacing + extraLeft
  };
}

export function buildTargets({x, y, width, height}, options, extraLeft) {
  let half = Math.ceil(height / 2);
  let spacing = options.extraSpacing;

  let l = { y, height, width: 0, x };
  let r = { y, height, width: 0, x: x + width };

  let t = { x, width, height: half - spacing, y };
  let b = { x, width, height: height - half - spacing, y: y + half + spacing };
  
  return {
    top:    extra(t, options, extraLeft), left:  extra(l, options),
    bottom: extra(b, options, extraLeft), right: extra(r, options)
  };
}
