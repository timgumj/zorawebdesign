import { test, expect } from '@playwright/test';

for (const path of ['/', '/en-2/', '/webdesign/graz/', '/en-2/web-design/graz/']) {
 for (const width of [1440, 768, 375]) {
  test(`Featured showcase ${path} at ${width}px`, async ({ page }) => {
   await page.setViewportSize({ width, height: 900 });
   const errors = [];
   page.on('pageerror', error => errors.push(error.message));
   await page.goto(path);
   const banner = page.locator('.cookie-consent');
   await banner.getByRole('button', { name: 'EN', exact: true }).click();
   await banner.getByRole('button', { name: 'Reject', exact: true }).click();
   const showcase = page.locator('#featured-project');
   const baldauf = showcase.getByRole('tab', { name: 'DR. BOSEDE BALDAUF' });
   const eva = showcase.getByRole('tab', { name: 'EVA EICHINGER' });
   const english = path.startsWith('/en-2/');
   await expect(showcase.getByRole('tab')).toHaveCount(2);
   await expect(baldauf).toHaveAttribute('aria-selected', 'true');
   await expect(showcase.locator('.baldauf-layout')).toBeVisible();
   await expect(showcase.locator('.graph-link')).toHaveAttribute('href', english ? '/en-2/dr-bosede-baldauf/' : '/dr-bosede-baldauf/');
   await eva.click();
   await expect(eva).toHaveAttribute('aria-selected', 'true');
   await expect(baldauf).toHaveAttribute('aria-selected', 'false');
   await expect(showcase.locator('.eva-layout')).toBeVisible();
   await expect(showcase.locator('.graph-link')).toHaveAttribute('href', english ? '/en-2/featured-project/' : '/referenzprojekt/');
   await eva.press('ArrowLeft');
   await expect(baldauf).toHaveAttribute('aria-selected', 'true');
   await expect(showcase.locator('.baldauf-layout')).toBeVisible();
   await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
   expect(errors).toEqual([]);
  });
 }
}
