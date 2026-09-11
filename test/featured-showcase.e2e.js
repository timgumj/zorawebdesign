import { test, expect } from '@playwright/test';

for (const path of ['/', '/en-2/', '/webdesign/graz/', '/en-2/web-design/graz/']) {
	for (const width of [1440, 375]) {
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
			const tabs = showcase.getByRole('tab');
			await expect(tabs).toHaveCount(4);
			for (let index = 0; index < 4; index++) {
				await tabs.nth(index).click();
				await expect(tabs.nth(index)).toHaveAttribute('aria-selected', 'true');
				await expect(showcase.getByRole('tabpanel')).toBeVisible();
				for (const img of await showcase.locator('img').all()) {
					await img.scrollIntoViewIfNeeded();
					await expect.poll(() => img.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
				}
				if (width === 375) {
					const details = showcase.locator('.details-toggle');
					await expect(details).toHaveAttribute('aria-expanded', 'false');
					await details.click();
					await expect(details).toHaveAttribute('aria-expanded', 'true');
				}
			}
			await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
			expect(errors).toEqual([]);
		});
	}
}
