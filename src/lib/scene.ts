type Cleanup = (() => void) | void;

export function onScene(name: string, init: (root: HTMLElement) => Cleanup) {
  const cleanups = new Map<HTMLElement, () => void>();

  const start = () => {
    document.querySelectorAll<HTMLElement>(`[data-scene="${name}"]`).forEach((root) => {
      if (cleanups.has(root)) return;
      const c = init(root);
      cleanups.set(root, c ?? (() => {}));
    });
  };
  const stop = () => {
    cleanups.forEach((c) => c());
    cleanups.clear();
  };

  start(); // initial load (module scripts run after the DOM is parsed)
  document.addEventListener("astro:page-load", start); // later navigations with ClientRouter
  document.addEventListener("astro:before-swap", stop);
}
