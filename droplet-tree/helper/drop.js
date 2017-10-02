/*function drop(hoverInfo, hoverPath, beforePath, afterPath) {
  if (hoverInfo.isFirstChildOfBefore) {
    insertAtIndex(beforePath, 0);

  } else if (hoverInfo.isDirectParentOfAfter) {
    moveChildrenIntoLastSelected(afterPath.getParentRow(), afterPath.getIndex());
    let parent = afterPath.getParentRow();
    insertAtIndex(parent.getParentRow(), parent.getIndex());
    // -> split children before after, insert after parent of after

  } else {
    let parent = beforePath.getAncestorRow(hoverInfo.level);
    insertAtIndex(parent.getParentRow(), parent.getIndex());
  }
}*/
