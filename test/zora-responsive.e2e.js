import { test, expect } from '@playwright/test';

const viewports = [
	{ name: 'desktop-1440', width: 1440, height: 900 },
	{ name: 'desktop-1280', width: 1280, height: 800 },
	{ name: 'tablet-1024', width: 1024, height: 768 },
	{ name: 'tablet-768', width: 768, height: 1024 },
	{ name: 'mobile-430', width: 430, height: 932 },
	{ name: 'mobile-375', width: 375, height: 812 }
];

for (const viewport of viewports) {
	test(`Homepage responsive — ${viewport.name}`, async ({ page }, testInfo) => {
		await page.setViewportSize({
			width: viewport.width,
			height: viewport.height
		});

		await page.goto('/');

		await page.waitForLoadState('load');

		const pageHasHorizontalOverflow = await page.evaluate(() => {
			return document.documentElement.scrollWidth > window.innerWidth;
		});

		expect(
			pageHasHorizontalOverflow,
			`Horizontal overflow detected at ${viewport.width}px`
		).toBe(false);

		await page.screenshot({
			path: testInfo.outputPath(`homepage-${viewport.name}.png`),
			fullPage: true
		});
	});
}