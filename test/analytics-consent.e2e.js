import { test, expect } from '@playwright/test';

test('analytics loads once after consent and stays disabled after rejection', async ({ page }) => {
	let requests = 0;
	await page.route('https://www.googletagmanager.com/gtag/js**', async (route) => {
		requests += 1;
		await route.fulfill({ contentType: 'application/javascript', body: '' });
	});
	await page.goto('/');
	const banner = page.locator('.cookie-consent');
	await banner.getByRole('button', { name: 'EN', exact: true }).click();
	await expect(page.locator('script[src*="googletagmanager.com/gtag/js"]')).toHaveCount(0);
	await banner.getByRole('button', { name: 'Reject', exact: true }).click();
	await page.reload();
	await expect(banner).toHaveCount(0);
	expect(requests).toBe(0);

	await page.evaluate(() => localStorage.removeItem('cookieConsent'));
	await page.reload();
	await banner.getByRole('button', { name: 'EN', exact: true }).click();
	await banner.getByRole('button', { name: 'Preferences', exact: true }).click();
	await banner.getByRole('checkbox', { name: 'Analytics', exact: true }).check();
	await banner.getByRole('button', { name: 'Save preference', exact: true }).click();
	await expect.poll(() => requests).toBe(1);
	expect(await page.evaluate(() => window['ga-disable-G-BP3ZTYHMEC'])).toBe(false);
	expect(await page.evaluate(() => window.dataLayer.map((args) => Array.from(args))[1]))
		.toEqual(['config', 'G-BP3ZTYHMEC']);

	await page.evaluate(() => {
		window.dispatchEvent(new CustomEvent('zora:consentchange', { detail: { analytics: true } }));
		window.dispatchEvent(new CustomEvent('zora:consentchange', { detail: { analytics: false } }));
	});
	expect(requests).toBe(1);
	expect(await page.evaluate(() => window['ga-disable-G-BP3ZTYHMEC'])).toBe(true);
	await page.reload();
	await expect.poll(() => requests).toBe(2);
	await expect(banner).toHaveCount(0);
});
