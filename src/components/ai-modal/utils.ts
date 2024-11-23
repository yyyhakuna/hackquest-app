export const calculatePosition = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
) => {
  const textRect = (event.target as HTMLSpanElement).getBoundingClientRect()
  const portalWith = 480
  const portalHeight = 600
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const offsetHeight = 10
  const offsetWidth = 80
  let x = 0
  let y = 0

  if (textRect.left < portalWith) {
    x = textRect.left
  }
  if (
    textRect.left > portalWith ||
    viewportWidth - textRect.left < portalWith
  ) {
    x = textRect.left - portalWith + textRect.width - offsetWidth
  }
  if (
    textRect.left < portalWith &&
    viewportWidth - textRect.left < portalWith
  ) {
    x = viewportWidth / 2 - portalWith / 2
  }
  if (textRect.top < portalHeight) {
    y = textRect.top + offsetHeight + textRect.height
  }
  if (
    textRect.top > portalHeight ||
    viewportHeight - textRect.top < portalHeight
  ) {
    y = textRect.top - portalHeight - offsetHeight
  }
  if (
    textRect.top < portalHeight &&
    viewportHeight - textRect.top < portalHeight
  ) {
    y = viewportHeight / 2 - portalHeight / 2
  }

  return { x, y }
}
