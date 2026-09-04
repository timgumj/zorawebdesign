const GLOBAL_THEME_STORAGE_KEY = "site-theme";

const CITY_THEME_PATHS = new Set([
  "/webdesign/salzburg/",
  "/en-2/web-design/salzburg/",
  "/webdesign/graz/",
  "/en-2/web-design/graz/",
  "/webdesign/muenchen/",
  "/en-2/web-design/munich/",
]);

const THEME_ENABLED_PATHS = new Set([
  "/",
  "/en-2/",
  ...CITY_THEME_PATHS,
  "/referenzprojekt/",
  "/en-2/featured-project/",
  "/en-2/reference-project/",
]);

export function normalizeThemePath(pathname = "/") {
  if (pathname === "/") return pathname;
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

export function getThemeSettings(pathname = "/") {
  const normalizedPath = normalizeThemePath(pathname);
  const isCityPage = CITY_THEME_PATHS.has(normalizedPath);

  return {
    defaultTheme:
      normalizedPath === "/webdesign/salzburg/" ? "dark" : "light",
    storageKey: isCityPage
      ? `${GLOBAL_THEME_STORAGE_KEY}:${normalizedPath}`
      : GLOBAL_THEME_STORAGE_KEY,
  };
}

export function getStoredTheme(storage, storageKey, defaultTheme) {
  const savedTheme = storage.getItem(storageKey);
  return savedTheme === "light" || savedTheme === "dark"
    ? savedTheme
    : defaultTheme;
}

export function isThemeEnabledPath(pathname = "/") {
  return THEME_ENABLED_PATHS.has(normalizeThemePath(pathname));
}
