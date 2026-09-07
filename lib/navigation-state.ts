export function activePanelForPath<PanelId extends string>(
  panel: { id: PanelId; pathname: string },
  currentPathname: string
): PanelId | "none" {
  return panel.pathname === currentPathname ? panel.id : "none";
}
