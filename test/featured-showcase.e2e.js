import { test, expect } from '@playwright/test';

for (const path of ['/', '/en-2/', '/webdesign/graz/', '/en-2/web-design/graz/']) {
	for (const width of [1440, 768, 375]) {
		test(`Featured showcase ${path} at ${width}px`, async ({ page }) => {
			await page.setViewportSize({ width, height: 900 });
			const errors = [];
			page.on('pageerror', error => errors.push(error.message));
			await page.goto(path);
			const showcase = page.locator('#featured-project');
			await expect(showcase.locator('h2')).toHaveText('DR. BOSEDE BALDAUF');
			const banner = page.locator('.cookie-consent');
			await banner.getByRole('button', { name: 'EN', exact: true }).click();
			await banner.getByRole('button', { name: 'Reject', exact: true }).click();
			await expect(showcase.getByRole('tab')).toHaveCount(0);
			await expect(showcase.locator('.search-chart')).toBeVisible();
			await expect(showcase.locator('.project-link')).toHaveAttribute('href', 'https://www.baldauf-uro.at/');
			for (const img of await showcase.locator('img').all()) {
				await img.scrollIntoViewIfNeeded();
				await expect.poll(() => img.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
			}
			const details = showcase.locator('.details-toggle');
			const body = showcase.locator('.feature-detail-body');
			await expect(body.locator('h3')).toHaveText(path.startsWith('/en-2/')
				? 'STRONGER VISIBILITY IN LOCAL GOOGLE SEARCH'
				: 'MEHR SICHTBARKEIT IN DER LOKALEN GOOGLE-SUCHE');
			if (width <= 1024) {
				await expect(details).toHaveAttribute('aria-expanded', 'false');
				await expect(body).toBeHidden();
				await details.click();
				await expect(details).toHaveAttribute('aria-expanded', 'true');
				await expect(body).toBeVisible();
				await details.click();
				await expect(details).toHaveAttribute('aria-expanded', 'false');
				await expect(body).toBeHidden();
			} else {
				await expect(details).toBeHidden();
				await expect(body).toBeVisible();
			}
			await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
			expect(errors).toEqual([]);
		});
	}
}
