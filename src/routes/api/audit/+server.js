import { json } from '@sveltejs/kit';
import { PAGESPEED_API_KEY } from '$env/static/private';
import { isAuditExcludedUrl } from '$lib/data/audit-excluded-hosts.js';
import tls from 'node:tls';


const ACCENT_COLOR = '#0043ff';

function removeHtmlTags(text = '') {
	return text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function decodeHtmlEntities(text = '') {
	return text
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'")
		.trim();
}

function normalizeUrl(inputUrl = '') {
	const trimmed = inputUrl.trim();
	return trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
}

function clampScore(score) {
	return Math.max(0, Math.min(100, Math.round(score)));
}

function getScoreStatus(score) {
	if (score >= 90) {
		return {
			label: 'Excellent',
			color: ACCENT_COLOR,
			level: 'excellent'
		};
	}

	if (score >= 50) {
		return {
			label: 'Needs work',
			color: '#f4b400',
			level: 'medium'
		};
	}

	return {
		label: 'Poor',
		color: '#ff3b30',
		level: 'poor'
	};
}

function getCoreVitalStatus(score) {
	if (score >= 90) {
		return {
			label: 'Good',
			color: ACCENT_COLOR,
			level: 'good'
		};
	}

	if (score >= 50) {
		return {
			label: 'Needs improvement',
			color: '#f4b400',
			level: 'medium'
		};
	}

	return {
		label: 'Poor',
		color: '#ff3b30',
		level: 'poor'
	};
}

function getMetricStatus(metricKey, numericValue) {
	const rules = {
		firstContentfulPaint: { good: 1800, medium: 3000, lowerIsBetter: true },
		largestContentfulPaint: { good: 2500, medium: 4000, lowerIsBetter: true },
		totalBlockingTime: { good: 200, medium: 600, lowerIsBetter: true },
		cumulativeLayoutShift: { good: 0.1, medium: 0.25, lowerIsBetter: true },
		speedIndex: { good: 3400, medium: 5800, lowerIsBetter: true }
	};

	const rule = rules[metricKey];

	if (!rule || numericValue === null || numericValue === undefined) {
		return {
			label: 'Unknown',
			color: '#9ca3af',
			level: 'unknown'
		};
	}

	if (numericValue <= rule.good) {
		return {
			label: 'Good',
			color: ACCENT_COLOR,
			level: 'good'
		};
	}

	if (numericValue <= rule.medium) {
		return {
			label: 'Needs improvement',
			color: '#f4b400',
			level: 'medium'
		};
	}

	return {
		label: 'Poor',
		color: '#ff3b30',
		level: 'poor'
	};
}

function formatMetricValue(metricKey, value) {
	if (value === null || value === undefined) return 'Not available';

	if (metricKey === 'cumulativeLayoutShift') {
		return Number(value).toFixed(3);
	}

	if (value >= 1000) {
		return `${(value / 1000).toFixed(1)} s`;
	}

	return `${Math.round(value)} ms`;
}

function getAttributeValues(html, attributeName) {
	const regex = new RegExp(`${attributeName}=["']([^"']+)["']`, 'gi');
	return [...html.matchAll(regex)].map((match) => match[1]);
}

function getAssets(html) {
	const srcValues = getAttributeValues(html, 'src');
	const hrefValues = getAttributeValues(html, 'href');
	return [...srcValues, ...hrefValues].filter(Boolean);
}

function getMetaContent(html, nameOrProperty) {
	const nameRegex = new RegExp(
		`<meta[^>]*(?:name|property)=["']${nameOrProperty}["'][^>]*content=["']([^"']*)["'][^>]*>`,
		'i'
	);

	const reverseRegex = new RegExp(
		`<meta[^>]*content=["']([^"']*)["'][^>]*(?:name|property)=["']${nameOrProperty}["'][^>]*>`,
		'i'
	);

	const match = html.match(nameRegex) || html.match(reverseRegex);
	return match ? decodeHtmlEntities(match[1]) : '';
}

function getLinkHref(html, relValue) {
	const regex = new RegExp(
		`<link[^>]*rel=["'][^"']*${relValue}[^"']*["'][^>]*href=["']([^"']+)["'][^>]*>`,
		'i'
	);

	const reverseRegex = new RegExp(
		`<link[^>]*href=["']([^"']+)["'][^>]*rel=["'][^"']*${relValue}[^"']*["'][^>]*>`,
		'i'
	);

	const match = html.match(regex) || html.match(reverseRegex);
	return match ? match[1] : '';
}

function getHtmlLang(html) {
	const match = html.match(/<html[^>]*lang=["']([^"']+)["'][^>]*>/i);
	return match ? match[1] : '';
}

function getVersionFromUrl(url = '') {
	const queryVersion = url.match(/[?&](?:ver|version|v)=([0-9][^&#"']*)/i);
	if (queryVersion) return queryVersion[1];

	const fileVersion = url.match(/[-.]v?([0-9]+\.[0-9]+(?:\.[0-9]+)?)/i);
	if (fileVersion) return fileVersion[1];

	return '';
}

function normalizePluginName(slug = '') {
	const pluginMap = {
		'contact-form-7': 'Contact Form 7',
		'wordpress-seo': 'Yoast SEO',
		'wordpress-seo-premium': 'Yoast SEO',
		polylang: 'Polylang',
		woocommerce: 'WooCommerce',
		elementor: 'Elementor',
		'elementor-pro': 'Elementor Pro',
		'wp-rocket': 'WP Rocket',
		wordfence: 'Wordfence',
		'wordfence-security': 'Wordfence',
		'rank-math': 'Rank Math',
		'seo-by-rank-math': 'Rank Math',
		'advanced-custom-fields': 'Advanced Custom Fields',
		'advanced-custom-fields-pro': 'Advanced Custom Fields Pro',
		gravityforms: 'Gravity Forms',
		'wpforms-lite': 'WPForms',
		wpforms: 'WPForms',
		'mailchimp-for-wp': 'Mailchimp for WordPress',
		'the-events-calendar': 'The Events Calendar',
		'wpml-string-translation': 'WPML',
		'sitepress-multilingual-cms': 'WPML',
		'litespeed-cache': 'LiteSpeed Cache',
		'w3-total-cache': 'W3 Total Cache',
		autoptimize: 'Autoptimize',
		'complianz-gdpr': 'Complianz',
		'cookie-law-info': 'CookieYes',
		redirection: 'Redirection',
		'duplicate-post': 'Duplicate Post'
	};

	if (pluginMap[slug]) return pluginMap[slug];

	return slug
		.split('-')
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ');
}

function normalizeThemeName(slug = '') {
	const themeMap = {
		Divi: 'Divi',
		divi: 'Divi',
		twentytwentyfour: 'Twenty Twenty Four',
		twentytwentythree: 'Twenty Twenty Three',
		twentytwentytwo: 'Twenty Twenty Two',
		astra: 'Astra',
		oceanwp: 'OceanWP',
		generatepress: 'GeneratePress',
		'hello-elementor': 'Hello Elementor',
		avada: 'Avada',
		flatsome: 'Flatsome',
		betheme: 'Betheme'
	};

	if (themeMap[slug]) return themeMap[slug];

	return slug
		.split('-')
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ');
}

function getTechnologyIcon(name = '') {
	const icons = {
		WordPress: 'wordpress',
		Joomla: 'joomla',
		Drupal: 'drupal',
		TYPO3: 'layout-template',
		Wix: 'wand',
		Squarespace: 'layout-template',
		Webflow: 'layout-grid',
		Shopify: 'shopping-bag',
		WooCommerce: 'shopping-cart',
		Magento: 'shopping-bag',
		PrestaShop: 'shopping-bag',
		Ghost: 'ghost',
		Strapi: 'database',
		'Craft CMS': 'layout-template',
		Blogger: 'pen-square',
		'HubSpot CMS': 'badge-check',
		Framer: 'frame',
		Duda: 'layout-template',
		'GoDaddy Website Builder': 'layout-template',
		Divi: 'layout-template',
		Elementor: 'layout-panel-left',
		'Oxygen Builder': 'layout-panel-top',
		'Bricks Builder': 'brick-wall',
		WPBakery: 'layout-panel-left',
		React: 'atom',
		'Next.js': 'triangle',
		SvelteKit: 'flame',
		Vue: 'badge-check',
		Nuxt: 'triangle',
		Angular: 'shield',
		Bootstrap: 'blocks',
		'Tailwind CSS': 'wind',
		jQuery: 'code',
		Apache: 'server',
		LiteSpeed: 'server',
		Nginx: 'server',
		'Meta Pixel': 'target',
		PHP: 'file-code',
		MySQL: 'database',
		Cloudflare: 'cloud',
		'Google Analytics': 'bar-chart',
		GA4: 'bar-chart',
		'Google Tag Manager': 'tag',
		Yoast: 'search',
		'Yoast SEO': 'search',
		'Rank Math': 'search'
	};

	return icons[name] || 'circle-dot';
}

function checkViewport(html) {
	const hasViewport = /<meta[^>]+name=["']viewport["'][^>]*>/i.test(html);

	return {
		score: hasViewport ? 100 : 0,
		status: getScoreStatus(hasViewport ? 100 : 0),
		passed: hasViewport,
		title: 'Viewport',
		message: hasViewport
			? 'Viewport meta tag found. This is good for responsive design.'
			: 'Viewport meta tag is missing. This can cause poor mobile responsiveness.'
	};
}

function checkPageTitle(html) {
	const match = html.match(/<title>(.*?)<\/title>/is);
	const title = match ? decodeHtmlEntities(removeHtmlTags(match[1])) : '';
	const ideal = title.length >= 30 && title.length <= 60;

	let score = 0;

	if (title.length > 0) score = 70;
	if (ideal) score = 100;
	if (title.length > 60) score = 75;
	if (title.length > 70) score = 55;
	if (title.length < 20 && title.length > 0) score = 60;

	return {
		title,
		length: title.length,
		ideal,
		passed: title.length > 0 && title.length <= 70,
		score,
		status: getScoreStatus(score),
		message: ideal
			? 'The title length is within a strong SEO range.'
			: 'The title should ideally be between 30 and 60 characters.'
	};
}

function checkMetaDescription(html) {
	const description = getMetaContent(html, 'description');
	const ideal = description.length >= 120 && description.length <= 160;

	let score = 0;

	if (description.length > 0) score = 70;
	if (ideal) score = 100;
	if (description.length > 160) score = 75;
	if (description.length > 180) score = 55;
	if (description.length < 80 && description.length > 0) score = 60;

	return {
		description,
		length: description.length,
		ideal,
		passed: description.length > 0,
		score,
		status: getScoreStatus(score),
		message: ideal
			? 'The meta description length is within a strong SEO range.'
			: 'The meta description should ideally be between 120 and 160 characters.'
	};
}

function checkMetaKeywords(html) {
	const keywords = getMetaContent(html, 'keywords');

	return {
		keywords,
		missing: keywords.length === 0,
		score: keywords.length > 0 ? 75 : 45,
		status: getScoreStatus(keywords.length > 0 ? 75 : 45),
		message:
			keywords.length > 0
				? 'Keywords meta tag found.'
				: 'Keywords are missing. This is not critical for modern SEO, but it can still be shown in the audit summary.'
	};
}

function checkRobotsMeta(html) {
	const robots = getMetaContent(html, 'robots');

	let score = 70;

	if (robots) score = 100;
	if (/noindex|nofollow/i.test(robots)) score = 35;

	return {
		robots: robots || 'Not found',
		score,
		status: getScoreStatus(score),
		passed: !/noindex/i.test(robots),
		message: robots
			? `Robots tag detected: ${robots}`
			: 'No robots meta tag found. Search engines will usually use default index and follow behavior.'
	};
}

function checkCanonical(html, pageUrl) {
	const canonical = getLinkHref(html, 'canonical');

	const score = canonical ? 100 : 0;

	return {
		canonical,
		pageUrl,
		missing: !canonical,
		score,
		status: getScoreStatus(score),
		message: canonical
			? 'Canonical URL found.'
			: 'Canonical URL is missing. This can make duplicate URL handling weaker.'
	};
}

function checkAuthorPublisher(html) {
	const author = getMetaContent(html, 'author');
	const publisher =
		getMetaContent(html, 'publisher') ||
		getMetaContent(html, 'article:publisher') ||
		getMetaContent(html, 'og:site_name');

	const authorScore = author ? 100 : 45;
	const publisherScore = publisher ? 100 : 45;
	const score = Math.round((authorScore + publisherScore) / 2);

	return {
		author: author || 'Author is missing.',
		publisher: publisher || 'Publisher is missing.',
		score,
		status: getScoreStatus(score),
		message:
			author && publisher
				? 'Author and publisher metadata found.'
				: 'Author or publisher metadata is missing.'
	};
}

function checkLanguage(html) {
	const lang = getHtmlLang(html);
	const score = lang ? 100 : 30;

	return {
		lang: lang || 'Language is missing.',
		score,
		status: getScoreStatus(score),
		passed: Boolean(lang),
		message: lang ? `HTML language detected: ${lang}` : 'The html lang attribute is missing.'
	};
}

function checkHeadings(html) {
	const headingMatches = [...html.matchAll(/<h([1-6])[^>]*>(.*?)<\/h\1>/gis)];

	const headings = headingMatches.map((match) => ({
		level: Number(match[1]),
		tag: `H${match[1]}`,
		text: decodeHtmlEntities(removeHtmlTags(match[2]))
	}));

	const counts = {
		h1: headings.filter((heading) => heading.level === 1).length,
		h2: headings.filter((heading) => heading.level === 2).length,
		h3: headings.filter((heading) => heading.level === 3).length,
		h4: headings.filter((heading) => heading.level === 4).length,
		h5: headings.filter((heading) => heading.level === 5).length,
		h6: headings.filter((heading) => heading.level === 6).length
	};

	const issues = [];

	if (counts.h1 === 0) issues.push('No H1 heading found.');
	if (counts.h1 > 1) issues.push(`Multiple H1 headings found: ${counts.h1}.`);

	for (let i = 1; i < headings.length; i++) {
		const previous = headings[i - 1].level;
		const current = headings[i].level;

		if (current - previous > 1) {
			issues.push(`Heading jumps from H${previous} to H${current}.`);
		}
	}

	let score = 100;

	if (counts.h1 === 0) score -= 45;
	if (counts.h1 > 1) score -= 30;
	score -= issues.filter((issue) => issue.includes('jumps')).length * 12;

	score = clampScore(score);

	return {
		score,
		status: getScoreStatus(score),
		total: headings.length,
		counts,
		h1Count: counts.h1,
		headings: headings.slice(0, 40),
		passed: issues.length === 0,
		issues,
		layout: {
			leftColumnTitle: 'Heading summary',
			rightColumnTitle: 'Detected heading structure'
		}
	};
}

function checkImages(html) {
	const imageMatches = [...html.matchAll(/<img\b[^>]*>/gi)];
	const sourceMatches = [...html.matchAll(/<source\b[^>]*>/gi)];
	const inlineUrlMatches = [...html.matchAll(/url\(["']?([^"')]+)["']?\)/gi)];

	function getAttr(tag, name) {
		const regex = new RegExp(`\\s${name}=["']([^"']*)["']`, 'i');
		const match = tag.match(regex);
		return match ? match[1] : '';
	}

	function getImageFormat(src = '') {
		const clean = src.split('?')[0].split('#')[0].toLowerCase();
		const match = clean.match(/\.([a-z0-9]+)$/);
		const ext = match?.[1] || 'unknown';

		if (ext === 'jpg') return 'jpg';
		if (ext === 'jpeg') return 'jpeg';
		if (ext === 'png') return 'png';
		if (ext === 'webp') return 'webp';
		if (ext === 'avif') return 'avif';
		if (ext === 'gif') return 'gif';
		if (ext === 'svg') return 'svg';

		return 'unknown';
	}

	function extractSrcsetUrls(srcset = '') {
		return srcset
			.split(',')
			.map((item) => item.trim().split(/\s+/)[0])
			.filter(Boolean);
	}

	const images = imageMatches.map((match) => {
		const tag = match[0];

		const src = getAttr(tag, 'src');
		const srcset = getAttr(tag, 'srcset');
		const alt = getAttr(tag, 'alt');
		const width = getAttr(tag, 'width');
		const height = getAttr(tag, 'height');
		const loading = getAttr(tag, 'loading');

		const srcsetUrls = extractSrcsetUrls(srcset);
		const allSources = [src, ...srcsetUrls].filter(Boolean);
		const formats = [...new Set(allSources.map(getImageFormat))];

		return {
			src,
			srcset,
			sources: allSources,
			formats,
			primaryFormat: getImageFormat(src),
			hasAlt: tag.match(/\salt=["'][^"']*["']/i) !== null,
			altText: alt.trim(),
			hasWidth: Boolean(width),
			hasHeight: Boolean(height),
			loading,
			hasModernSource: formats.includes('webp') || formats.includes('avif')
		};
	});

	const sourceImages = sourceMatches.flatMap((match) => {
		const tag = match[0];
		const srcset = getAttr(tag, 'srcset');
		const type = getAttr(tag, 'type');
		const urls = extractSrcsetUrls(srcset);

		return urls.map((src) => ({
			src,
			srcset,
			type,
			format: type.includes('avif')
				? 'avif'
				: type.includes('webp')
					? 'webp'
					: getImageFormat(src),
			fromSourceTag: true
		}));
	});

	const inlineImages = inlineUrlMatches
		.map((match) => match[1])
		.filter((src) => /\.(png|jpe?g|webp|avif|gif|svg)(\?|#|$)/i.test(src))
		.map((src) => ({
			src,
			format: getImageFormat(src),
			fromInlineStyle: true
		}));

	const allDetectedSources = [
		...images.flatMap((image) => image.sources.length ? image.sources : [image.src]),
		...sourceImages.map((image) => image.src),
		...inlineImages.map((image) => image.src)
	].filter(Boolean);

	const uniqueSources = [...new Set(allDetectedSources)];

	const formatCounts = {
		webp: 0,
		avif: 0,
		jpg: 0,
		jpeg: 0,
		png: 0,
		gif: 0,
		svg: 0,
		unknown: 0
	};

	for (const src of uniqueSources) {
		const format = getImageFormat(src);
		formatCounts[format] = (formatCounts[format] || 0) + 1;
	}

	for (const sourceImage of sourceImages) {
		if (sourceImage.format === 'webp' || sourceImage.format === 'avif') {
			formatCounts[sourceImage.format] = Math.max(formatCounts[sourceImage.format], 1);
		}
	}

	const missingAlt = images.filter((image) => !image.hasAlt || image.altText === '');
	const missingDimensions = images.filter((image) => !image.hasWidth || !image.hasHeight);
	const lazyImages = images.filter((image) => image.loading.toLowerCase() === 'lazy');

	const modernCount = (formatCounts.webp || 0) + (formatCounts.avif || 0);
	const legacyCount = (formatCounts.jpg || 0) + (formatCounts.jpeg || 0) + (formatCounts.png || 0);
	const rasterCount = modernCount + legacyCount + (formatCounts.gif || 0);

	const imagesNeedingModernFormat = images.filter((image) => {
		const legacyPrimary = ['jpg', 'jpeg', 'png'].includes(image.primaryFormat);
		return legacyPrimary && !image.hasModernSource;
	});

	const altScore =
		images.length === 0
			? 100
			: Math.round(((images.length - missingAlt.length) / images.length) * 100);

	const dimensionScore =
		images.length === 0
			? 100
			: Math.round(((images.length - missingDimensions.length) / images.length) * 100);

	const lazyScore =
		images.length === 0
			? 100
			: Math.round((lazyImages.length / images.length) * 100);

	const formatScore =
		rasterCount === 0 ? 100 : Math.round((modernCount / rasterCount) * 100);

	const score = clampScore(
		altScore * 0.35 +
			dimensionScore * 0.2 +
			lazyScore * 0.15 +
			formatScore * 0.3
	);

	const optimizationPriority =
		imagesNeedingModernFormat.length >= 10
			? 'High'
			: imagesNeedingModernFormat.length >= 4
				? 'Medium'
				: imagesNeedingModernFormat.length > 0
					? 'Low'
					: 'None';

	const estimatedSavingsKb = imagesNeedingModernFormat.length * 120;

	const formats = {
		total: uniqueSources.length,
		modern: modernCount,
		legacy: legacyCount,
		counts: formatCounts,
		needsWebp: imagesNeedingModernFormat.length > 0,
		needsModernFormats: imagesNeedingModernFormat.length > 0,
		priority: optimizationPriority,
		estimatedSavingsKb,
		estimatedSavings:
			estimatedSavingsKb >= 1000
				? `${(estimatedSavingsKb / 1000).toFixed(1)} MB`
				: `${estimatedSavingsKb} KB`,
		message:
			imagesNeedingModernFormat.length > 0
				? `${imagesNeedingModernFormat.length} image or images should be converted to WebP or AVIF.`
				: 'Detected images already use modern formats or no legacy raster images were found.'
	};

	return {
		score,
		status: getScoreStatus(score),
		total: images.length,
		detectedSourcesCount: uniqueSources.length,
		missingAltCount: missingAlt.length,
		missingDimensionsCount: missingDimensions.length,
		lazyLoadedCount: lazyImages.length,
		legacyImageCount: legacyCount,
		modernImageCount: modernCount,
		imagesNeedingModernFormatCount: imagesNeedingModernFormat.length,
		optimizationPriority,
		estimatedSavingsKb,
		formats: {
			...formats,
			modernCount: modernCount,
			legacyCount: legacyCount,
			needsWebp: imagesNeedingModernFormat.length > 0,
			priority: optimizationPriority,
			estimatedSavingsKb,
			estimatedSavings:
				estimatedSavingsKb >= 1000
					? `${(estimatedSavingsKb / 1000).toFixed(1)} MB`
					: `${estimatedSavingsKb} KB`,
			message:
				imagesNeedingModernFormat.length > 0
					? `${imagesNeedingModernFormat.length} image or images should be converted to WebP or AVIF.`
					: 'Detected images already use modern formats or no legacy raster images were found.'
		},
		passed: missingAlt.length === 0 && imagesNeedingModernFormat.length === 0,
		missingAlt: missingAlt.slice(0, 10),
		missingDimensions: missingDimensions.slice(0, 10),
		needsModernFormat: imagesNeedingModernFormat.slice(0, 12),
		all: images.slice(0, 40),
		items: images.slice(0, 20),
		sourceImages: sourceImages.slice(0, 20),
		inlineImages: inlineImages.slice(0, 20),
		backgroundImages: inlineImages.slice(0, 20),
		pictureSources: sourceImages.slice(0, 20),
		lazyLoaded: lazyImages.slice(0, 10),
		message:
			images.length === 0
				? 'No image tags were detected on this page.'
				: imagesNeedingModernFormat.length > 0
					? `${images.length} image tags found. ${imagesNeedingModernFormat.length} should be converted to WebP or AVIF.`
					: missingAlt.length === 0
						? 'Images look good. Alt text and modern image formats are mostly handled.'
						: `${missingAlt.length} image or images are missing alt text.`
	};
}

function extractVisibleText(html = '') {
	const withoutScripts = html.replace(/<(script|style|noscript)[^>]*>[\s\S]*?<\/\1>/gi, ' ');
	return decodeHtmlEntities(removeHtmlTags(withoutScripts))
		.replace(/\s+/g, ' ')
		.trim();
}

function checkSeoAdvanced(html, pageUrl) {
	const canonicalMatches = [
		...html.matchAll(/<link\b[^>]*rel=["'][^"']*canonical[^"']*["'][^>]*href=["']([^"']+)["'][^>]*>/gi)
	];
	const canonicalLinks = canonicalMatches.map((match) => match[1]).filter(Boolean);
	const canonical = canonicalLinks[0] || '';
	const canonicalAbsolute = /^https?:\/\//i.test(canonical);
	const canonicalHttps = /^https:\/\//i.test(canonical);
	let canonicalHostMatches = false;

	if (canonicalAbsolute) {
		try {
			canonicalHostMatches = new URL(canonical).host === new URL(pageUrl).host;
		} catch {
			canonicalHostMatches = false;
		}
	}

	const metaCharset = /<meta[^>]+charset=["'][^"']+["'][^>]*>/i.test(html) || /<meta[^>]+http-equiv=["']content-type["'][^>]*charset=["'][^"']+["'][^>]*>/i.test(html);
	const favicon = /<link[^>]+rel=["'][^"']*(?:icon|shortcut icon)[^"']*["'][^>]+>/i.test(html);
	const appleTouchIcon = /<link[^>]+rel=["'][^"']*apple-touch-icon[^"']*["'][^>]+>/i.test(html);
	const manifest = Boolean(getLinkHref(html, 'manifest'));
	const themeColor = Boolean(getMetaContent(html, 'theme-color'));
	const preconnectLinks = [...html.matchAll(/<link\b[^>]*rel=["'][^"']*preconnect[^"']*["'][^>]*>/gi)].length;
	const dnsPrefetchLinks = [...html.matchAll(/<link\b[^>]*rel=["'][^"']*dns-prefetch[^"']*["'][^>]*>/gi)].length;
	const preloadLinks = [...html.matchAll(/<link\b[^>]*rel=["'][^"']*preload[^"']*["'][^>]*>/gi)].length;
	const modulepreloadLinks = [...html.matchAll(/<link\b[^>]*rel=["'][^"']*modulepreload[^"']*["'][^>]*>/gi)].length;

	const robotsMeta = getMetaContent(html, 'robots');
	const googlebotMeta = getMetaContent(html, 'googlebot');
	const robotsValue = [robotsMeta, googlebotMeta].filter(Boolean).join(' ');
	const robotsDirectives = parseRobotsDirectives(robotsValue);
	const issues = [];

	if (!metaCharset) issues.push('Missing a character encoding declaration.');
	if (!favicon) issues.push('Favicon link is missing.');
	if (!manifest) issues.push('Web app manifest link is missing.');
	if (!themeColor) issues.push('Theme color meta tag is missing.');
	if (!canonical) issues.push('Canonical tag is missing.');
	if (canonical && !canonicalAbsolute) issues.push('Canonical URL is not absolute.');
	if (canonical && !canonicalHttps) issues.push('Canonical URL does not use HTTPS.');
	if (canonical && !canonicalHostMatches) issues.push('Canonical URL host does not match the current page host.');
	if (canonicalLinks.length > 1) issues.push('Multiple canonical tags were found.');

	let score = 100;
	if (!metaCharset) score -= 14;
	if (!favicon) score -= 10;
	if (!manifest) score -= 8;
	if (!themeColor) score -= 6;
	if (!canonical) score -= 16;
	if (canonical && !canonicalAbsolute) score -= 8;
	if (canonical && !canonicalHttps) score -= 8;
	if (canonical && !canonicalHostMatches) score -= 8;
	if (canonicalLinks.length > 1) score -= 10;
	if (robotsDirectives.noindex) score -= 20;
	if (robotsDirectives.nofollow) score -= 8;

	score = clampScore(score);

	return {
		score,
		status: getScoreStatus(score),
		passed: score >= 80,
		message:
			issues.length === 0
				? 'Core SEO head tags, canonical signals and resource hints look strong.'
				: `Advanced SEO checks found ${issues.length} issue or issues.`,
		metaCharset,
		favicon,
		appleTouchIcon,
		manifest,
		themeColor,
		preconnectLinks,
		dnsPrefetchLinks,
		preloadLinks,
		modulepreloadLinks,
		canonical: {
			exists: Boolean(canonical),
			value: canonical,
			isAbsolute: canonicalAbsolute,
			usesHttps: canonicalHttps,
			matchesCurrentHost: canonicalHostMatches,
			multipleCanonicalTags: canonicalLinks.length > 1
		},
		robotsMeta: {
			value: robotsValue,
			index: !robotsDirectives.noindex,
			follow: !robotsDirectives.nofollow,
			noindex: robotsDirectives.noindex,
			nofollow: robotsDirectives.nofollow,
			maxImagePreview: robotsDirectives.maxImagePreview,
			maxSnippet: robotsDirectives.maxSnippet,
			maxVideoPreview: robotsDirectives.maxVideoPreview
		},
		issues,
		recommendations:
			issues.length === 0
				? []
				: issues.map((issue) => ({
					title: issue,
					text: issue
				}))
	};
}

function parseRobotsDirectives(robots = '') {
	const direct = robots.toLowerCase();
	const directives = {
		noindex: /noindex/i.test(robots),
		nofollow: /nofollow/i.test(robots),
		maxImagePreview: '',
		maxSnippet: '',
		maxVideoPreview: ''
	};

	const maxImageMatch = robots.match(/max-image-preview:\s*([^,\s]+)/i);
	const maxSnippetMatch = robots.match(/max-snippet:\s*([^,\s]+)/i);
	const maxVideoMatch = robots.match(/max-video-preview:\s*([^,\s]+)/i);

	if (maxImageMatch) directives.maxImagePreview = maxImageMatch[1];
	if (maxSnippetMatch) directives.maxSnippet = maxSnippetMatch[1];
	if (maxVideoMatch) directives.maxVideoPreview = maxVideoMatch[1];

	return directives;
}

function checkContentAnalysis(html) {
	const visibleText = extractVisibleText(html);
	const paragraphs = [...html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
		.map((match) => decodeHtmlEntities(removeHtmlTags(match[1])).replace(/\s+/g, ' ').trim())
		.filter((paragraph) => paragraph.length >= 20);
	const paragraphItems = paragraphs.length > 0 ? paragraphs : visibleText ? visibleText.split(/\n{2,}/) : [];
	const wordCount = (visibleText.match(/\b[\w’'-]+\b/g) || []).length;
	const characterCount = visibleText.length;
	const sentenceMatches = visibleText.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];
	const sentenceCount = sentenceMatches.length || (visibleText ? 1 : 0);
	const paragraphCount = paragraphItems.length || (visibleText ? 1 : 0);
	const readingTime = Math.max(1, Math.ceil(wordCount / 200));
	const averageSentenceLength = sentenceCount > 0 ? Math.round(wordCount / sentenceCount) : 0;
	const averageParagraphLength = paragraphCount > 0 ? Math.round(wordCount / paragraphCount) : 0;
	const textToHtmlRatio = html.length > 0 ? Math.round((characterCount / html.length) * 100) : 0;
	const normalizedParagraphs = paragraphItems.map((paragraph) => paragraph.toLowerCase().replace(/\s+/g, ' ').trim());
	const duplicateParagraphCount = normalizedParagraphs.filter((paragraph, index) => normalizedParagraphs.indexOf(paragraph) !== index).length;
	const longestParagraphWordCount = paragraphItems.reduce((max, paragraph) => {
		const words = (paragraph.match(/\b[\w’'-]+\b/g) || []).length;
		return Math.max(max, words);
	}, 0);
	const thinContentWarning = wordCount < 250 || paragraphCount < 2 || averageParagraphLength < 20;

	let contentScore = 35;
	if (wordCount >= 250) contentScore += 20;
	if (paragraphCount >= 2) contentScore += 15;
	if (sentenceCount >= 3) contentScore += 10;
	if (averageParagraphLength >= 20) contentScore += 10;
	if (!thinContentWarning) contentScore += 10;
	contentScore = clampScore(contentScore);

	return {
		score: contentScore,
		status: getScoreStatus(contentScore),
		wordCount,
		characterCount,
		sentenceCount,
		paragraphCount,
		readingTime,
		averageSentenceLength,
		averageParagraphLength,
		textToHtmlRatio,
		thinContentWarning,
		duplicateParagraphCount,
		longestParagraphWordCount,
		contentScore,
		visibleText: visibleText.slice(0, 400),
		message: thinContentWarning
			? 'The content is fairly thin for SEO and generative search signals.'
			: 'The content appears substantial and readable enough for stronger SEO performance.'
	};
}

function checkSocialPreview(html) {
	const fields = {
		'og:title': getMetaContent(html, 'og:title'),
		'og:description': getMetaContent(html, 'og:description'),
		'og:image': getMetaContent(html, 'og:image'),
		'og:type': getMetaContent(html, 'og:type'),
		'og:url': getMetaContent(html, 'og:url'),
		'og:site_name': getMetaContent(html, 'og:site_name'),
		'twitter:card': getMetaContent(html, 'twitter:card'),
		'twitter:title': getMetaContent(html, 'twitter:title'),
		'twitter:description': getMetaContent(html, 'twitter:description'),
		'twitter:image': getMetaContent(html, 'twitter:image')
	};

	const presentFields = Object.entries(fields).filter(([, value]) => Boolean(value));
	const missingFields = Object.entries(fields)
		.filter(([, value]) => !value)
		.map(([field]) => field);
	const completeness = Math.round((presentFields.length / Object.keys(fields).length) * 100);
	const score = clampScore(completeness);

	return {
		score,
		status: getScoreStatus(score),
		complete: missingFields.length === 0,
		completeness,
		missingFields,
		fields,
		message:
			missingFields.length === 0
				? 'Open Graph and Twitter Card metadata are present.'
				: `Missing social preview fields: ${missingFields.join(', ')}.`
	};
}

function collectJsonLdTypes(value, types = []) {
	if (Array.isArray(value)) {
		value.forEach((item) => collectJsonLdTypes(item, types));
		return types;
	}

	if (value && typeof value === 'object') {
		if (typeof value['@type'] === 'string') {
			types.push(value['@type']);
		}

		Object.values(value).forEach((item) => collectJsonLdTypes(item, types));
	}

	return types;
}

function checkStructuredData(html) {
	const matches = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
	const blocks = matches.map((match) => match[1].trim()).filter(Boolean);
	const validBlocks = [];
	const invalidBlocks = [];
	const errors = [];
	const schemaTypeCounts = {
		Organization: 0,
		LocalBusiness: 0,
		Person: 0,
		Product: 0,
		Event: 0,
		FAQPage: 0,
		BreadcrumbList: 0,
		WebSite: 0,
		Article: 0,
		BlogPosting: 0,
		VideoObject: 0,
		Review: 0
	};

	blocks.forEach((block, index) => {
		try {
			const parsed = JSON.parse(block.replace(/^\s*<!--|-->\s*$/g, ''));
			validBlocks.push(parsed);
			const types = collectJsonLdTypes(parsed);
			types.forEach((type) => {
				if (schemaTypeCounts[type] !== undefined) {
					schemaTypeCounts[type] += 1;
				}
			});
		} catch (error) {
			invalidBlocks.push({ index, error: error.message });
			errors.push({ index, message: error.message });
		}
	});

	const schemaTypesDetected = [...new Set(validBlocks.flatMap((item) => collectJsonLdTypes(item)))].filter(Boolean);
	const score = clampScore(validBlocks.length > 0 ? 100 : 45);

	return {
		score,
		status: getScoreStatus(score),
		totalJsonLdBlocks: blocks.length,
		validBlocks: validBlocks.length,
		invalidBlocks: invalidBlocks.length,
		schemaTypesDetected,
		Organization: schemaTypeCounts.Organization,
		LocalBusiness: schemaTypeCounts.LocalBusiness,
		Person: schemaTypeCounts.Person,
		Product: schemaTypeCounts.Product,
		Event: schemaTypeCounts.Event,
		FAQPage: schemaTypeCounts.FAQPage,
		BreadcrumbList: schemaTypeCounts.BreadcrumbList,
		WebSite: schemaTypeCounts.WebSite,
		Article: schemaTypeCounts.Article,
		BlogPosting: schemaTypeCounts.BlogPosting,
		VideoObject: schemaTypeCounts.VideoObject,
		Review: schemaTypeCounts.Review,
		errors,
		message:
			validBlocks.length > 0
				? `Detected ${validBlocks.length} valid JSON-LD block or blocks.`
				: 'No valid JSON-LD structured data blocks were detected.'
	};
}

function checkLocalSeo(html, structuredData = null) {
	const visibleText = extractVisibleText(html);
	const phoneNumbers = (visibleText.match(/\+?[0-9][0-9\s().-]{7,}/g) || []).filter((match) => match.replace(/\D/g, '').length >= 8);
	const telLinks = [...html.matchAll(/<a[^>]+href=["']tel:[^"']+["'][^>]*>/gi)].length;
	const emailAddresses = [...visibleText.matchAll(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)].map((match) => match[0]);
	const mailtoLinks = [...html.matchAll(/<a[^>]+href=["']mailto:[^"']+["'][^>]*>/gi)].length;
	const addressText = (visibleText.match(/\b\d+\s+[A-Za-z0-9.\- ]+(?:street|st|road|rd|avenue|ave|boulevard|blvd|lane|ln|drive|dr|way|place|pl|court|ct|circle|cir|parkway|pkwy|route|rt)\b/gi) || []).slice(0, 6);
	const mapsEmbeds = [...html.matchAll(/<iframe[^>]+src=["'][^"']*(google\.com\/maps|maps\.google\.[^"']+)[^"']*["'][^>]*>/gi)].length;
	const openingHoursText = (visibleText.match(/\b(?:mon(?:day)?|tue(?:sday)?|wed(?:nesday)?|thu(?:rsday)?|fri(?:day)?|sat(?:urday)?|sun(?:day)?)\b[^.]{0,40}(?:open|closed|hours?|from|to)\b/gi) || []).slice(0, 6);
	const localBusinessSchema = Boolean(structuredData?.LocalBusiness);
	const localSignals = [phoneNumbers.length > 0, telLinks > 0, emailAddresses.length > 0, mailtoLinks > 0, addressText.length > 0, mapsEmbeds > 0, openingHoursText.length > 0].filter(Boolean).length;

	let score = 30;
	if (phoneNumbers.length > 0) score += 14;
	if (telLinks > 0) score += 10;
	if (emailAddresses.length > 0) score += 10;
	if (addressText.length > 0) score += 10;
	if (mapsEmbeds > 0) score += 8;
	if (openingHoursText.length > 0) score += 8;
	if (localBusinessSchema) score += 10;
	score = clampScore(score);

	const recommendations = [];
	if (localSignals > 0 && !localBusinessSchema) {
		recommendations.push('Add LocalBusiness schema to make local business details machine-readable.');
	}
	if (phoneNumbers.length === 0 && telLinks === 0) {
		recommendations.push('Make the business phone number easy to find.');
	}
	if (addressText.length === 0 && mapsEmbeds === 0) {
		recommendations.push('Add a clear business address or embed a Google Maps location.');
	}

	return {
		score,
		status: getScoreStatus(score),
		phoneNumbers: phoneNumbers.slice(0, 10),
		telLinks,
		emailAddresses: emailAddresses.slice(0, 10),
		mailtoLinks,
		addressText,
		googleMapsEmbeds: mapsEmbeds,
		openingHoursText,
		localBusinessSchema,
		hasLocalBusinessSignals: localSignals > 0,
		recommendations,
		message:
			localSignals > 0
				? 'The page shows local business signals and can benefit from structured local SEO markup.'
				: 'No strong local business signals were detected.'
	};
}

function checkSemanticAccessibility(html) {
	const hasMain = /<main\b/i.test(html);
	const hasNav = /<nav\b/i.test(html);
	const hasHeader = /<header\b/i.test(html);
	const hasFooter = /<footer\b/i.test(html);
	const formCount = [...html.matchAll(/<form\b[^>]*>/gi)].length;
	const labelCount = [...html.matchAll(/<label\b[^>]*>/gi)].length;
	const buttonMatches = [...html.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/gi)];
	const linkMatches = [...html.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)];
	const buttonsWithoutText = buttonMatches.filter((match) => removeHtmlTags(match[1]).trim().length === 0).length;
	const linksWithoutText = linkMatches.filter((match) => removeHtmlTags(match[1]).trim().length === 0).length;
	const ariaLabelCount = [...html.matchAll(/aria-label=["'][^"']+["']/gi)].length;

	let score = 40;
	if (hasMain) score += 15;
	if (hasNav) score += 10;
	if (hasHeader) score += 10;
	if (hasFooter) score += 10;
	if (formCount > 0) score += 5;
	if (labelCount > 0) score += 5;
	if (buttonsWithoutText === 0) score += 5;
	if (linksWithoutText === 0) score += 5;
	if (ariaLabelCount > 0) score += 5;
	score = clampScore(score);

	return {
		score,
		status: getScoreStatus(score),
		hasMain,
		hasNav,
		hasHeader,
		hasFooter,
		formCount,
		labelCount,
		buttonsWithoutText,
		linksWithoutText,
		ariaLabelCount,
		message:
			score >= 80
				? 'The page uses clear semantic landmarks and accessible link/button patterns.'
				: 'Some semantic landmarks or accessibility labels are missing.'
	};
}

function checkAiReadiness({ html, content, structuredData, localSeo, headings, seoAdvanced, socialPreview, semanticAccessibility }) {
	const signals = [];
	const issues = [];

	if (headings?.h1Count > 0 && headings?.counts?.h2 > 0) {
		signals.push('Clear heading hierarchy');
	} else {
		issues.push('Add a clear heading hierarchy with an H1 and supporting H2s.');
	}

	if (structuredData?.validBlocks > 0 || structuredData?.schemaTypesDetected?.length > 0) {
		signals.push('Structured data present');
	} else {
		issues.push('Add structured data to support rich result eligibility.');
	}

	if (content?.wordCount >= 250) {
		signals.push('Substantial content body');
	} else {
		issues.push('Add more body content to make the page more useful and context-rich.');
	}

	if (/<(ul|ol|table)\b/i.test(html)) {
		signals.push('Lists or tables help scannability');
	} else {
		issues.push('Use lists or tables where helpful to improve scannability.');
	}

	if (localSeo?.phoneNumbers?.length > 0 || localSeo?.emailAddresses?.length > 0 || localSeo?.googleMapsEmbeds > 0) {
		signals.push('Contact or trust information present');
	} else {
		issues.push('Add contact or trust details such as a phone number or address.');
	}

	if (content?.paragraphCount >= 2 && content?.averageSentenceLength <= 28) {
		signals.push('Readable paragraph structure');
	} else {
		issues.push('Break long blocks of text into shorter, reader-friendly paragraphs.');
	}

	if (socialPreview?.completeness >= 70 || seoAdvanced?.score >= 80) {
		signals.push('Entity-rich metadata');
	} else {
		issues.push('Strengthen metadata to better support generative search interpretation.');
	}

	if (semanticAccessibility?.score >= 80) {
		signals.push('Semantic accessibility structure');
	} else {
		issues.push('Add semantic landmarks and labels to improve accessibility and structure.');
	}

	let score = 30;
	if (signals.includes('Clear heading hierarchy')) score += 12;
	if (signals.includes('Structured data present')) score += 12;
	if (signals.includes('Substantial content body')) score += 12;
	if (signals.includes('Lists or tables help scannability')) score += 8;
	if (signals.includes('Contact or trust information present')) score += 8;
	if (signals.includes('Readable paragraph structure')) score += 8;
	if (signals.includes('Entity-rich metadata')) score += 6;
	if (signals.includes('Semantic accessibility structure')) score += 4;
	score = clampScore(score);

	return {
		score,
		status: getScoreStatus(score),
		signals,
		issues,
		recommendations:
			issues.length === 0
				? []
				: issues.map((issue) => ({
					title: issue,
					text: issue
				})),
		message:
			issues.length === 0
				? 'The page shows strong generative-search readiness signals.'
				: 'The page has some generative-search readiness gaps that can be improved with better structure and metadata.'
	};
}

function checkLinks(html, pageUrl) {
	const linkMatches = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gis)];

	const links = linkMatches.map((match) => {
		const href = match[1];
		const text = decodeHtmlEntities(removeHtmlTags(match[2]));

		return {
			href,
			text,
			isExternal: /^https?:\/\//i.test(href) && !href.includes(new URL(pageUrl).hostname),
			isEmpty: text.length === 0,
			isAnchor: href.startsWith('#'),
			isMailOrPhone: href.startsWith('mailto:') || href.startsWith('tel:')
		};
	});

	const emptyLinks = links.filter((link) => link.isEmpty);
	const externalLinks = links.filter((link) => link.isExternal);
	const internalLinks = links.filter(
		(link) => !link.isExternal && !link.isMailOrPhone && !link.isAnchor
	);

	const score =
		links.length === 0
			? 40
			: clampScore(((links.length - emptyLinks.length) / links.length) * 100);

	return {
		score,
		status: getScoreStatus(score),
		total: links.length,
		internalCount: internalLinks.length,
		externalCount: externalLinks.length,
		emptyCount: emptyLinks.length,
		items: links,
		message:
			emptyLinks.length === 0
				? 'Links have readable text.'
				: `${emptyLinks.length} link or links have no readable text.`
	};
}

function checkSocial(html) {
	const socialPlatforms = [
		{ name: 'Facebook', pattern: /facebook\.com/i },
		{ name: 'Instagram', pattern: /instagram\.com/i },
		{ name: 'LinkedIn', pattern: /linkedin\.com/i },
		{ name: 'TikTok', pattern: /tiktok\.com/i },
		{ name: 'X Twitter', pattern: /(twitter\.com|x\.com)/i },
		{ name: 'YouTube', pattern: /youtube\.com/i },
		{ name: 'Pinterest', pattern: /pinterest\.com/i }
	];

	const found = socialPlatforms
		.filter((platform) => platform.pattern.test(html))
		.map((platform) => ({
			name: platform.name,
			icon: platform.name.toLowerCase().replace(/\s+/g, '-')
		}));

	const score = found.length > 0 ? 100 : 45;

	return {
		score,
		status: getScoreStatus(score),
		total: found.length,
		platforms: found,
		message:
			found.length > 0
				? `${found.length} social platform or platforms detected.`
				: 'No social media links were detected.'
	};
}

async function checkFileAvailability(baseUrl, fileName) {
	try {
		const targetUrl = new URL(fileName, baseUrl).toString();
		const response = await fetch(targetUrl, {
			method: 'GET',
			redirect: 'follow'
		});

		return {
			url: targetUrl,
			found: response.ok,
			statusCode: response.status,
			score: response.ok ? 100 : 35,
			status: getScoreStatus(response.ok ? 100 : 35)
		};
	} catch {
		return {
			url: new URL(fileName, baseUrl).toString(),
			found: false,
			statusCode: null,
			score: 35,
			status: getScoreStatus(35)
		};
	}
}

function checkSecurity(url, response) {
	const headers = response.headers;

	const requiredHeaders = [
		{ key: 'strict-transport-security', label: 'Strict Transport Security' },
		{ key: 'content-security-policy', label: 'Content Security Policy' },
		{ key: 'x-frame-options', label: 'X Frame Options' },
		{ key: 'x-content-type-options', label: 'X Content Type Options' },
		{ key: 'referrer-policy', label: 'Referrer Policy' },
		{ key: 'permissions-policy', label: 'Permissions Policy' }
	];

	const checks = requiredHeaders.map((header) => ({
		name: header.label,
		found: headers.has(header.key),
		value: headers.get(header.key) || '',
		status: getScoreStatus(headers.has(header.key) ? 100 : 35)
	}));

	const httpsEnabled = url.startsWith('https://');
	const foundHeaders = checks.filter((check) => check.found).length;

	const score = clampScore(
		(((httpsEnabled ? 1 : 0) + foundHeaders) / (requiredHeaders.length + 1)) * 100
	);

	return {
		score,
		status: getScoreStatus(score),
		httpsEnabled,
		headers: checks,
		passed: score >= 70,
		message:
			score >= 90
				? 'Strong security header setup detected.'
				: 'Some recommended security headers are missing.'
	};
}

function getW3cStandardNote(message = '') {
	const lower = message.toLowerCase();

	if (lower.includes('duplicate id')) {
		return 'W3C HTML Standard · WCAG 2.1 Criterion 4.1.1';
	}

	if (lower.includes('aria')) {
		return 'W3C HTML Standard · WAI ARIA · WCAG 2.1';
	}

	if (lower.includes('alt')) {
		return 'W3C HTML Standard · WCAG 2.1 Criterion 1.1.1';
	}

	if (lower.includes('heading') || lower.includes('h1') || lower.includes('h2')) {
		return 'W3C HTML Standard · WCAG 2.1 Criterion 1.3.1';
	}

	if (lower.includes('label')) {
		return 'W3C HTML Standard · WCAG 2.1 Criterion 3.3.2';
	}

	if (lower.includes('button') || lower.includes('link')) {
		return 'W3C HTML Standard · WCAG 2.1 Criterion 4.1.2';
	}

	if (lower.includes('contrast')) {
		return 'WCAG 2.1 Criterion 1.4.3';
	}

	if (lower.includes('void elements') || lower.includes('trailing slash')) {
		return 'W3C HTML Standard';
	}

	return 'W3C HTML Standard';
}

function getW3cIssueTitle(message = '') {
	const lower = message.toLowerCase();

	if (lower.includes('duplicate id')) {
		return 'Using an ID multiple times is invalid and can cause JavaScript or accessibility issues.';
	}

	if (lower.includes('aria')) {
		return 'ARIA markup does not follow the expected accessibility standard.';
	}

	if (lower.includes('alt')) {
		return 'Image alternative text is missing or not valid.';
	}

	if (lower.includes('label')) {
		return 'A form control may be missing a proper label.';
	}

	if (lower.includes('trailing slash') || lower.includes('void elements')) {
		return 'HTML syntax does not fully conform to the W3C standard.';
	}

	return 'HTML source code does not fully conform to the W3C standard.';
}

function normalizeW3cIssue(item = {}, fallbackType = 'warning') {
	const type = item.type === 'error' ? 'W3C ERROR' : 'W3C WARNING';
	const severity = item.type === 'error' ? 'critical' : 'warning';
	const message = decodeHtmlEntities(removeHtmlTags(item.message || 'HTML validation issue.'));

	return {
		type,
		severity,
		line: item.lastLine || item.firstLine || null,
		column: item.lastColumn || item.firstColumn || null,
		title: getW3cIssueTitle(message),
		message,
		extract: item.extract || '',
		standard: getW3cStandardNote(message),
		status: getScoreStatus(item.type === 'error' ? 25 : 55),
		rawType: item.type || fallbackType
	};
}

async function getW3cValidationReport(url) {
	try {
		const validatorUrl = new URL('https://validator.w3.org/nu/');
		validatorUrl.searchParams.set('doc', url);
		validatorUrl.searchParams.set('out', 'json');

		const response = await fetch(validatorUrl, {
			headers: {
				'user-agent': 'Mozilla/5.0 Website Audit Tool W3C Accessibility Truth Check'
			}
		});

		if (!response.ok) {
			return {
				available: false,
				score: 0,
				status: getScoreStatus(0),
				title: 'Accessibility Truth Check',
				source: 'W3C HTML Validator',
				summary: 'The W3C validator could not be loaded for this page.',
				criticalErrors: 0,
				importantWarnings: 0,
				recommendationCount: 0,
				errors: [],
				warnings: [],
				allIssuesCount: 0,
				validatorUrl: `https://validator.w3.org/nu/?doc=${encodeURIComponent(url)}`
			};
		}

		const data = await response.json();
		const messages = Array.isArray(data.messages) ? data.messages : [];

		const errorItems = messages.filter((item) => item.type === 'error');
		const warningItems = messages.filter(
			(item) => item.type === 'info' || item.type === 'warning'
		);

		const errors = errorItems.map((item) => normalizeW3cIssue(item, 'error'));
		const warnings = warningItems.map((item) => normalizeW3cIssue(item, 'warning'));

		const criticalErrors = errors.length;
		const importantWarnings = warnings.length;

		const score = clampScore(100 - criticalErrors * 4 - importantWarnings * 0.8);
		const perfect = criticalErrors === 0 && importantWarnings === 0;

		return {
			available: true,
			score,
			status: getScoreStatus(score),
			title: 'Accessibility Truth Check',
			source: 'W3C HTML Validator',
			analyzedUrl: url,
			criticalErrors,
			importantWarnings,
			recommendationCount: criticalErrors + importantWarnings,
			perfect,
			summary: perfect
				? 'Perfect! Your website does everything right.'
				: `The HTML source code contains ${criticalErrors} errors and ${importantWarnings} warnings that browsers, validators, JavaScript or screen readers may interpret differently.`,
			errors: errors.slice(0, 30),
			warnings: warnings.slice(0, 30),
			allIssuesCount: messages.length,
			hiddenErrorsCount: Math.max(0, criticalErrors - 30),
			hiddenWarningsCount: Math.max(0, importantWarnings - 30),
			validatorUrl: `https://validator.w3.org/nu/?doc=${encodeURIComponent(url)}`
		};
	} catch {
		return {
			available: false,
			score: 0,
			status: getScoreStatus(0),
			title: 'Accessibility Truth Check',
			source: 'W3C HTML Validator',
			summary: 'The W3C validator could not be reached. Try again later.',
			criticalErrors: 0,
			importantWarnings: 0,
			recommendationCount: 0,
			errors: [],
			warnings: [],
			allIssuesCount: 0,
			validatorUrl: `https://validator.w3.org/nu/?doc=${encodeURIComponent(url)}`
		};
	}
}

function detectTechnologies(html, headers, url = '', assets = []) {
	const safeHeaders =
		headers && typeof headers.entries === 'function' && typeof headers.get === 'function'
			? headers
			: {
				entries() {
					return [];
				},
				get() {
					return '';
				}
			};

	const htmlLower = String(html || '').toLowerCase();
	const urlLower = String(url || '').toLowerCase();
	const allAssets = (assets || []).filter(Boolean);
	const allAssetsLower = allAssets.map((asset) => String(asset).toLowerCase());
	const scriptAssets = getAttributeValues(html, 'src').filter(Boolean);
	const linkAssets = getAttributeValues(html, 'href').filter(Boolean);
	const imageAssets = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map((m) => m[1]);
	const comments = [...html.matchAll(/<!--([\s\S]*?)-->/g)].map((m) => m[1]).join(' ').toLowerCase();
	const classValues = [...html.matchAll(/class=["']([^"']+)["']/gi)].map((m) => m[1].toLowerCase());
	const classTokens = classValues
		.flatMap((value) => value.split(/\s+/))
		.map((token) => token.trim())
		.filter(Boolean);
	const generatorMeta = getMetaContent(html, 'generator').toLowerCase();

	const headerMap = {};
	for (const [key, value] of safeHeaders.entries()) {
		headerMap[key.toLowerCase()] = String(value || '');
	}

	const setCookieList =
		typeof safeHeaders.getSetCookie === 'function'
			? safeHeaders.getSetCookie()
			: safeHeaders.get('set-cookie')
				? [safeHeaders.get('set-cookie')]
				: [];
	const cookieBlob = setCookieList.join('; ').toLowerCase();

	const helpers = {
		containsHtml: (pattern) => pattern.test(htmlLower),
		containsUrl: (pattern) => pattern.test(urlLower),
		containsComment: (pattern) => pattern.test(comments),
		hasAsset: (pattern) => allAssetsLower.some((asset) => pattern.test(asset)),
		firstAsset: (pattern) => allAssets.find((asset) => pattern.test(asset.toLowerCase())) || '',
		hasScript: (pattern) => scriptAssets.some((asset) => pattern.test(asset.toLowerCase())),
		firstScript: (pattern) => scriptAssets.find((asset) => pattern.test(asset.toLowerCase())) || '',
		hasLink: (pattern) => linkAssets.some((asset) => pattern.test(asset.toLowerCase())),
		firstLink: (pattern) => linkAssets.find((asset) => pattern.test(asset.toLowerCase())) || '',
		hasImage: (pattern) => imageAssets.some((asset) => pattern.test(asset.toLowerCase())),
		firstImage: (pattern) => imageAssets.find((asset) => pattern.test(asset.toLowerCase())) || '',
		hasClass: (pattern) => classTokens.some((token) => pattern.test(token)),
		classCount: (pattern) => classTokens.filter((token) => pattern.test(token)).length,
		headerValue: (name) => (headerMap[name.toLowerCase()] || '').toLowerCase(),
		hasHeader: (name, pattern) => pattern.test((headerMap[name.toLowerCase()] || '').toLowerCase()),
		hasCookie: (pattern) => pattern.test(cookieBlob),
		metaGeneratorContains: (pattern) => pattern.test(generatorMeta)
	};

	const detections = new Map();

	function makeSignal(strength, passed, evidence) {
		return { strength, passed: Boolean(passed), evidence: evidence || '' };
	}

	function toConfidenceLabel(score) {
		if (score >= 80) return 'High';
		if (score >= 65) return 'Medium';
		return 'Low';
	}

	function upsertTechnology({ name, category, icon, signals = [] }) {
		const passed = signals.filter((signal) => signal.passed);
		const strongCount = passed.filter((signal) => signal.strength === 'strong').length;
		const mediumCount = passed.filter((signal) => signal.strength === 'medium').length;

		if (!(strongCount >= 1 || mediumCount >= 2)) {
			return;
		}

		const strongScore = strongCount * 45;
		const mediumScore = mediumCount * 25;
		const lowScore = passed.filter((signal) => signal.strength === 'low').length * 12;
		const bonus = Math.max(0, passed.length - 1) * 4;
		const confidence = Math.min(100, strongScore + mediumScore + lowScore + bonus);

		if (confidence < 55) {
			return;
		}

		const confidenceLabel = toConfidenceLabel(confidence);
		const evidence = passed.map((signal) => signal.evidence).filter(Boolean);
		const existing = detections.get(name);

		const next = {
			name,
			category,
			confidence,
			confidenceLabel,
			evidence: [...new Set(evidence)].slice(0, 8),
			icon: icon || getTechnologyIcon(name),
			score: confidence,
			status: getScoreStatus(confidence),
			verified: confidence >= 65
		};

		if (!existing) {
			detections.set(name, next);
			return;
		}

		const mergedConfidence = Math.max(existing.confidence, next.confidence);
		detections.set(name, {
			...existing,
			...next,
			category: mergedConfidence === existing.confidence ? existing.category : next.category,
			confidence: mergedConfidence,
			confidenceLabel: toConfidenceLabel(mergedConfidence),
			score: mergedConfidence,
			status: getScoreStatus(mergedConfidence),
			evidence: [...new Set([...(existing.evidence || []), ...(next.evidence || [])])].slice(0, 8)
		});
	}

	const wordpressPluginSlugs = new Set();
	const wordpressThemeSlugs = new Set();

	for (const asset of allAssets) {
		const pluginMatch = asset.match(/\/wp-content\/plugins\/([^/]+)/i);
		const themeMatch = asset.match(/\/wp-content\/themes\/([^/]+)/i);
		if (pluginMatch) wordpressPluginSlugs.add(pluginMatch[1]);
		if (themeMatch) wordpressThemeSlugs.add(themeMatch[1]);
	}

	const patterns = [
		{
			name: 'WordPress',
			category: 'CMS',
			signals: [
				makeSignal('strong', helpers.metaGeneratorContains(/wordpress/), 'meta generator contains WordPress'),
				makeSignal('strong', helpers.hasAsset(/\/wp-content\//), '/wp-content/ detected'),
				makeSignal('strong', helpers.hasAsset(/\/wp-includes\//), '/wp-includes/ detected'),
				makeSignal('strong', helpers.containsHtml(/\/wp-json\b/) || helpers.containsUrl(/\/wp-json\b/), 'wp-json endpoint detected'),
				makeSignal('medium', helpers.containsHtml(/\bwp-embed\b/), 'wp-embed fingerprint found'),
				makeSignal('medium', helpers.hasClass(/wp-block/), 'wp-block class detected'),
				makeSignal('strong', wordpressPluginSlugs.size > 0, '/wp-content/plugins/ path detected'),
				makeSignal('strong', wordpressThemeSlugs.size > 0, '/wp-content/themes/ path detected')
			]
		},
		{
			name: 'Joomla',
			category: 'CMS',
			signals: [
				makeSignal('strong', helpers.metaGeneratorContains(/joomla/), 'meta generator contains Joomla'),
				makeSignal('strong', helpers.hasAsset(/\/media\/system\//), '/media/system/ detected'),
				makeSignal('strong', helpers.hasAsset(/\/media\/vendor\//), '/media/vendor/ detected'),
				makeSignal('medium', helpers.hasAsset(/\/templates\//), '/templates/ path detected'),
				makeSignal('medium', helpers.containsHtml(/\/administrator\//), '/administrator/ path detected'),
				makeSignal('medium', helpers.containsHtml(/com_content|option=com_/), 'com_content or option=com_ detected'),
				makeSignal('strong', helpers.containsHtml(/joomla-script-options|Joomla\.getOptions/i), 'joomla-script-options detected'),
				makeSignal('medium', helpers.hasClass(/com-content|view-article|joomla/), 'Joomla-specific classes detected')
			]
		},
		{
			name: 'Drupal',
			category: 'CMS',
			signals: [
				makeSignal('strong', helpers.metaGeneratorContains(/drupal/), 'meta generator contains Drupal'),
				makeSignal('strong', helpers.hasAsset(/\/sites\/default\//), '/sites/default/ detected'),
				makeSignal('strong', helpers.containsHtml(/drupalsettings|drupal\.settings|\/core\/misc\/drupal\.js/), 'Drupal runtime fingerprint detected'),
				makeSignal('medium', helpers.hasClass(/node--type-|region-|block--/), 'Drupal class naming detected')
			]
		},
		{
			name: 'TYPO3',
			category: 'CMS',
			signals: [
				makeSignal('strong', helpers.metaGeneratorContains(/typo3/), 'meta generator contains TYPO3'),
				makeSignal('strong', helpers.hasAsset(/\/typo3(?:conf|temp)?\//), 'TYPO3 folder fingerprint detected'),
				makeSignal('medium', helpers.hasCookie(/typo3/), 'TYPO3 cookie fingerprint detected')
			]
		},
		{
			name: 'Wix',
			category: 'Website Builder',
			signals: [
				makeSignal('strong', helpers.containsHtml(/static\.wixstatic\.com/), 'Wix static host detected'),
				makeSignal('strong', helpers.containsHtml(/wix-thunderbolt|_wixbi|x-wix-request-id/), 'Wix runtime fingerprint detected'),
				makeSignal('medium', helpers.hasClass(/wixui|wix-/), 'Wix class fingerprint detected')
			]
		},
		{
			name: 'Squarespace',
			category: 'Website Builder',
			signals: [
				makeSignal('strong', helpers.containsHtml(/static1\.squarespace\.com|squarespace\.com/), 'Squarespace assets detected'),
				makeSignal('medium', helpers.hasClass(/sqs-|squarespace/), 'Squarespace class fingerprint detected'),
				makeSignal('medium', helpers.containsComment(/squarespace/), 'Squarespace comment fingerprint detected')
			]
		},
		{
			name: 'Webflow',
			category: 'Website Builder',
			signals: [
				makeSignal('strong', helpers.hasScript(/webflow(?:\.min)?\.js/), 'webflow.js detected'),
				makeSignal('strong', helpers.containsHtml(/data-wf-page|data-wf-site/), 'Webflow page fingerprint detected'),
				makeSignal('medium', helpers.hasClass(/^w-(?:nav|container|row|col|richtext|button)$/), 'Webflow class names detected')
			]
		},
		{
			name: 'Shopify',
			category: 'Ecommerce',
			signals: [
				makeSignal('strong', helpers.containsHtml(/cdn\.shopify\.com|myshopify\.com/), 'Shopify CDN or domain detected'),
				makeSignal('strong', helpers.containsHtml(/shopifyanalytics|window\.shopify|shopify\.theme/), 'Shopify JS object detected'),
				makeSignal('medium', helpers.hasCookie(/_shopify|cart_sig/), 'Shopify cookie fingerprint detected')
			]
		},
		{
			name: 'WooCommerce',
			category: 'Ecommerce',
			signals: [
				makeSignal('strong', helpers.hasAsset(/\/wp-content\/plugins\/woocommerce\//), 'WooCommerce plugin path detected'),
				makeSignal('strong', helpers.containsHtml(/wc-ajax|woocommerce(?:\.min)?\.(?:js|css)/), 'WooCommerce runtime asset detected'),
				makeSignal('medium', helpers.hasClass(/woocommerce-(?:page|cart|checkout)/), 'WooCommerce page class detected')
			]
		},
		{
			name: 'Magento',
			category: 'Ecommerce',
			signals: [
				makeSignal('strong', helpers.hasAsset(/\/static\/version\d+\/frontend\//), 'Magento static frontend path detected'),
				makeSignal('strong', helpers.containsHtml(/Mage\.Cookies|Magento_Ui|mage\/cookies/), 'Magento runtime fingerprint detected'),
				makeSignal('strong', helpers.hasHeader('x-magento-cache-debug', /./) || helpers.hasHeader('x-magento-tags', /./), 'Magento response header detected')
			]
		},
		{
			name: 'PrestaShop',
			category: 'Ecommerce',
			signals: [
				makeSignal('strong', helpers.metaGeneratorContains(/prestashop/), 'meta generator contains PrestaShop'),
				makeSignal('strong', helpers.containsHtml(/prestashop|presta\./), 'PrestaShop runtime fingerprint detected'),
				makeSignal('medium', helpers.hasAsset(/\/themes\/.+\/assets\//), 'PrestaShop theme assets detected')
			]
		},
		{
			name: 'Ghost',
			category: 'CMS',
			signals: [
				makeSignal('strong', helpers.metaGeneratorContains(/ghost/), 'meta generator contains Ghost'),
				makeSignal('strong', helpers.containsHtml(/\/ghost\//), '/ghost/ path detected'),
				makeSignal('medium', helpers.containsHtml(/ghost-sdk|ghost-content-api/), 'Ghost SDK fingerprint detected')
			]
		},
		{
			name: 'Strapi',
			category: 'CMS',
			signals: [
				makeSignal('strong', helpers.hasHeader('x-powered-by', /strapi/), 'X-Powered-By header contains Strapi'),
				makeSignal('strong', helpers.containsHtml(/strapi|\/uploads\//), 'Strapi content fingerprint detected'),
				makeSignal('medium', helpers.hasCookie(/strapi/), 'Strapi cookie fingerprint detected')
			]
		},
		{
			name: 'Craft CMS',
			category: 'CMS',
			signals: [
				makeSignal('strong', helpers.hasHeader('x-powered-by', /craft cms/), 'X-Powered-By header contains Craft CMS'),
				makeSignal('strong', helpers.hasAsset(/\/cpresources\//), '/cpresources/ path detected'),
				makeSignal('medium', helpers.containsHtml(/craftcms|craft\./), 'Craft CMS runtime fingerprint detected')
			]
		},
		{
			name: 'Blogger',
			category: 'CMS',
			signals: [
				makeSignal('strong', helpers.metaGeneratorContains(/blogger/), 'meta generator contains Blogger'),
				makeSignal('strong', helpers.containsHtml(/blogspot\.com|data:blog\./), 'Blogger fingerprint detected'),
				makeSignal('medium', helpers.containsComment(/blogger/), 'Blogger comment fingerprint detected')
			]
		},
		{
			name: 'HubSpot CMS',
			category: 'CMS',
			signals: [
				makeSignal('strong', helpers.containsHtml(/js\.hs-scripts\.com|hsforms\.net|hubspot/), 'HubSpot scripts detected'),
				makeSignal('medium', helpers.containsHtml(/_hsq|hbspt\.forms/), 'HubSpot JS globals detected'),
				makeSignal('medium', helpers.hasCookie(/hubspotutk|__hssc|__hstc/), 'HubSpot cookie fingerprint detected')
			]
		},
		{
			name: 'Framer',
			category: 'Website Builder',
			signals: [
				makeSignal('strong', helpers.containsHtml(/framer\.app|framerusercontent\.com/), 'Framer host fingerprint detected'),
				makeSignal('medium', helpers.containsHtml(/data-framer-name|framer-motion/), 'Framer runtime fingerprint detected')
			]
		},
		{
			name: 'Duda',
			category: 'Website Builder',
			signals: [
				makeSignal('strong', helpers.containsHtml(/duda|dudaone|dmcdn\.net/), 'Duda asset fingerprint detected'),
				makeSignal('medium', helpers.hasCookie(/duda|dm_session/), 'Duda cookie fingerprint detected')
			]
		},
		{
			name: 'GoDaddy Website Builder',
			category: 'Website Builder',
			signals: [
				makeSignal('strong', helpers.containsHtml(/godaddysites\.com|secureserver\.net|websitebuilder\.com/), 'GoDaddy builder host fingerprint detected'),
				makeSignal('medium', helpers.containsComment(/godaddy/), 'GoDaddy comment fingerprint detected')
			]
		},
		{
			name: 'Elementor',
			category: 'Page Builder',
			signals: [
				makeSignal('strong', helpers.hasAsset(/\/wp-content\/plugins\/elementor/), 'Elementor plugin path detected'),
				makeSignal('strong', helpers.containsHtml(/data-elementor-type|data-elementor-id|elementor-frontend/), 'Elementor runtime attribute detected'),
				makeSignal('medium', helpers.hasClass(/elementor-/), 'Elementor class fingerprint detected')
			]
		},
		{
			name: 'Divi',
			category: 'Page Builder',
			signals: [
				makeSignal('strong', helpers.hasAsset(/\/wp-content\/themes\/divi\//), 'Divi theme path detected'),
				makeSignal('medium', helpers.hasClass(/et_pb_|et_builder/), 'Divi class fingerprint detected'),
				makeSignal('medium', helpers.containsHtml(/et-core-unified|elegantthemes/), 'Divi runtime fingerprint detected')
			]
		},
		{
			name: 'Oxygen Builder',
			category: 'Page Builder',
			signals: [
				makeSignal('strong', helpers.hasAsset(/\/oxygen\//), 'Oxygen assets detected'),
				makeSignal('medium', helpers.containsHtml(/ct_builder_shortcodes|oxy-/), 'Oxygen runtime fingerprint detected')
			]
		},
		{
			name: 'Bricks Builder',
			category: 'Page Builder',
			signals: [
				makeSignal('strong', helpers.hasAsset(/\/wp-content\/themes\/bricks\//), 'Bricks theme path detected'),
				makeSignal('medium', helpers.hasClass(/bricks-/), 'Bricks class fingerprint detected')
			]
		},
		{
			name: 'WPBakery',
			category: 'Page Builder',
			signals: [
				makeSignal('strong', helpers.hasAsset(/js_composer|wpbakery/), 'WPBakery assets detected'),
				makeSignal('medium', helpers.hasClass(/vc_row|wpb_/), 'WPBakery class fingerprint detected')
			]
		},
		{
  name: 'Next.js',
  category: 'JavaScript Framework',
  signals: [
    makeSignal(
      'strong',
      helpers.containsHtml(/\/_next\/static\//),
      '/_next/static asset path detected'
    ),
    makeSignal(
      'strong',
      helpers.hasAsset(/\/_next\/static\//),
      '/_next/static asset detected'
    ),
    makeSignal(
      'strong',
      helpers.containsHtml(/__next_data__/i),
      '__NEXT_DATA__ detected'
    ),
    makeSignal(
      'strong',
      helpers.containsHtml(/self\.__next_f\.push/i),
      'Next.js App Router flight data detected'
    ),
    makeSignal(
      'strong',
      helpers.containsHtml(/next-router-state-tree/i),
      'Next.js router state detected'
    ),
    makeSignal(
      'strong',
      helpers.hasHeader('x-powered-by', /next\.js/i),
      'x-powered-by: Next.js response header detected'
    ),
    makeSignal(
      'strong',
      helpers.hasHeader('x-nextjs-cache', /./),
      'x-nextjs-cache response header detected'
    ),
    makeSignal(
      'strong',
      helpers.hasHeader('x-nextjs-prerender', /./),
      'x-nextjs-prerender response header detected'
    ),
    makeSignal(
      'strong',
      helpers.hasHeader('x-nextjs-stale-time', /./),
      'x-nextjs-stale-time response header detected'
    ),
    makeSignal(
      'medium',
      helpers.containsHtml(/id=["']__next["']/),
      '#__next root detected'
    ),
    makeSignal(
      'medium',
      helpers.containsHtml(/data-nextjs-scroll-focus-boundary/i),
      'Next.js scroll boundary marker detected'
    ),
    makeSignal(
      'medium',
      helpers.containsHtml(/next\/dist\/|next-route-announcer/i),
      'Next.js runtime marker detected'
    ),
    makeSignal(
      'medium',
      helpers.hasScript(/\/_next\//),
      'Next.js script asset detected'
    ),
    makeSignal(
      'medium',
      helpers.hasLink(/\/_next\//),
      'Next.js linked asset detected'
    )
  ]
},
		{
			name: 'SvelteKit',
			category: 'JavaScript Framework',
			signals: [
				makeSignal('strong', helpers.containsHtml(/\/_app\/immutable/), '/_app/immutable detected'),
				makeSignal('strong', helpers.containsHtml(/__sveltekit|data-sveltekit/), 'SvelteKit runtime marker detected'),
				makeSignal('medium', helpers.containsComment(/svelte/), 'Svelte comment fingerprint detected')
			]
		},
		{
			name: 'React',
			category: 'JavaScript Framework',
			signals: [
				makeSignal('strong', helpers.hasScript(/react(?:-dom)?(?:\.production(?:\.min)?)?\.js/), 'React script detected'),
				makeSignal('medium', helpers.containsHtml(/data-reactroot|__react/), 'React runtime marker detected')
			]
		},
		{
			name: 'Vue',
			category: 'JavaScript Framework',
			signals: [
				makeSignal('strong', helpers.hasScript(/vue(?:\.runtime)?(?:\.global)?(?:\.prod)?\.js/), 'Vue script detected'),
				makeSignal('medium', helpers.containsHtml(/__vue__|data-v-[a-f0-9]+/), 'Vue runtime marker detected')
			]
		},
		{
			name: 'Nuxt',
			category: 'JavaScript Framework',
			signals: [
				makeSignal('strong', helpers.containsHtml(/\/_nuxt\//), '/_nuxt/ assets detected'),
				makeSignal('strong', helpers.containsHtml(/__nuxt/), '__NUXT__ marker detected')
			]
		},
		{
			name: 'Angular',
			category: 'JavaScript Framework',
			signals: [
				makeSignal('strong', helpers.containsHtml(/ng-version|<app-root|ng-app/), 'Angular root/version marker detected'),
				makeSignal('medium', helpers.hasScript(/runtime\.[a-z0-9]+\.js/) && helpers.hasScript(/polyfills\.[a-z0-9]+\.js/), 'Angular bundle pattern detected')
			]
		},
		{
			name: 'jQuery',
			category: 'JavaScript Library',
			signals: [
				makeSignal('strong', helpers.hasScript(/jquery(?:\.min)?\.js/), `${helpers.firstScript(/jquery(?:\.min)?\.js/) || 'jQuery script'} detected`),
				makeSignal('medium', helpers.containsHtml(/jQuery\(|\$\(/), 'jQuery global usage detected')
			]
		},
		{
			name: 'Bootstrap',
			category: 'CSS Framework',
			signals: [
				makeSignal('strong', helpers.hasAsset(/bootstrap(?:\.bundle)?(?:\.min)?\.(?:js|css)/), `${helpers.firstAsset(/bootstrap(?:\.bundle)?(?:\.min)?\.(?:js|css)/) || 'Bootstrap asset'} detected`),
				makeSignal('medium', helpers.hasClass(/container-fluid|row|col-(?:sm|md|lg|xl)|navbar/), 'Bootstrap class naming detected')
			]
		},
		{
			name: 'Tailwind CSS',
			category: 'CSS Framework',
			signals: [
				makeSignal('strong', helpers.hasAsset(/tailwind(?:\.min)?\.css/) || helpers.containsHtml(/tailwindcss/), 'Tailwind asset fingerprint detected'),
				makeSignal('medium', helpers.classCount(/^(?:sm:|md:|lg:|xl:|2xl:)?(?:text-|bg-|px-|py-|mx-|my-|rounded-|shadow-|font-|grid|flex|items-|justify-)/) >= 6, 'Tailwind utility class pattern detected')
			]
		},
		{
			name: 'Cloudflare',
			category: 'CDN',
			signals: [
				makeSignal('strong', helpers.hasHeader('server', /cloudflare/), `Server header contains ${helpers.headerValue('server')}`),
				makeSignal('strong', helpers.hasHeader('cf-ray', /./) || helpers.hasHeader('cf-cache-status', /./), 'Cloudflare response headers detected')
			]
		},
		{
			name: 'Apache',
			category: 'Web Server',
			signals: [makeSignal('strong', helpers.hasHeader('server', /apache/), `Server header contains ${helpers.headerValue('server')}`)]
		},
		{
			name: 'Nginx',
			category: 'Web Server',
			signals: [makeSignal('strong', helpers.hasHeader('server', /nginx/), `Server header contains ${helpers.headerValue('server')}`)]
		},
		{
			name: 'LiteSpeed',
			category: 'Web Server',
			signals: [makeSignal('strong', helpers.hasHeader('server', /litespeed/), `Server header contains ${helpers.headerValue('server')}`)]
		},
		{
			name: 'Google Analytics',
			category: 'Analytics',
			signals: [
				makeSignal('strong', helpers.containsHtml(/google-analytics\.com|googletagmanager\.com\/gtag\/js\?id=g-/), 'Google Analytics script detected'),
				makeSignal('medium', helpers.containsHtml(/gtag\(/), 'gtag() usage detected')
			]
		},
		{
			name: 'Google Tag Manager',
			category: 'Tag Manager',
			signals: [
				makeSignal('strong', helpers.containsHtml(/googletagmanager\.com\/gtm\.js/), 'gtm.js script detected'),
				makeSignal('medium', /GTM-[A-Z0-9]+/.test(html), 'GTM container ID detected')
			]
		},
		{
			name: 'Meta Pixel',
			category: 'Analytics',
			signals: [
				makeSignal('strong', helpers.containsHtml(/connect\.facebook\.net\/.*fbevents\.js/), 'Meta Pixel script detected'),
				makeSignal('medium', helpers.containsHtml(/fbq\(/), 'fbq() runtime detected')
			]
		}
	];

	for (const pattern of patterns) {
		upsertTechnology({
			name: pattern.name,
			category: pattern.category,
			icon: getTechnologyIcon(pattern.name),
			signals: pattern.signals
		});
	}

	const technologies = [...detections.values()]
		.sort((a, b) => b.confidence - a.confidence)
		.map((tech) => ({
			...tech,
			evidence: [...new Set(tech.evidence || [])].slice(0, 8),
			confidenceLabel: tech.confidenceLabel || toConfidenceLabel(tech.confidence)
		}));

	const categories = technologies.reduce((acc, tech) => {
		if (!acc[tech.category]) acc[tech.category] = [];
		acc[tech.category].push(tech);
		return acc;
	}, {});

	const mainTechnology =
		technologies.find((tech) => ['CMS', 'Website Builder', 'Ecommerce', 'Page Builder'].includes(tech.category)) ||
		technologies.find((tech) => tech.category === 'JavaScript Framework') ||
		technologies.find((tech) => ['Web Server', 'CDN'].includes(tech.category)) ||
		technologies[0] ||
		null;

	return {
		detected: technologies.length > 0,
		mainTechnology,
		technologies,
		categories,
		cardDisplay: technologies.slice(0, 12)
	};
}

function detectTechnology(html, response, url = '') {
	const headers = response?.headers;
	const assets = getAssets(html);
	return detectTechnologies(html, headers, url, assets);
}
function extractPageSpeedMetrics(data) {
	const lighthouse = data.lighthouseResult;
	const categories = lighthouse?.categories;
	const audits = lighthouse?.audits;

	if (!categories || !audits) return null;

	const metricMap = {
		firstContentfulPaint: 'first-contentful-paint',
		largestContentfulPaint: 'largest-contentful-paint',
		totalBlockingTime: 'total-blocking-time',
		cumulativeLayoutShift: 'cumulative-layout-shift',
		speedIndex: 'speed-index'
	};

	const metrics = Object.entries(metricMap).reduce((acc, [key, auditKey]) => {
		const audit = audits[auditKey];

		acc[key] = {
			key,
			title: audit?.title || key,
			displayValue: audit?.displayValue || 'Not available',
			numericValue: audit?.numericValue ?? null,
			formattedValue: formatMetricValue(key, audit?.numericValue ?? null),
			score:
				audit?.score !== null && audit?.score !== undefined
					? Math.round(audit.score * 100)
					: null,
			status: getMetricStatus(key, audit?.numericValue ?? null),
			description: audit?.description || ''
		};

		return acc;
	}, {});

	const scores = {
		performance: Math.round(categories.performance.score * 100),
		accessibility: Math.round(categories.accessibility.score * 100),
		bestPractices: Math.round(categories['best-practices'].score * 100),
		seo: Math.round(categories.seo.score * 100)
	};

	return {
		scores: {
			performance: {
				value: scores.performance,
				status: getCoreVitalStatus(scores.performance)
			},
			accessibility: {
				value: scores.accessibility,
				status: getCoreVitalStatus(scores.accessibility)
			},
			bestPractices: {
				value: scores.bestPractices,
				status: getCoreVitalStatus(scores.bestPractices)
			},
			seo: {
				value: scores.seo,
				status: getCoreVitalStatus(scores.seo)
			}
		},
		metrics,
		finalUrl: lighthouse.finalUrl || '',
		fetchTime: lighthouse.fetchTime || ''
	};
}

async function getPageSpeedScores(url, strategy = 'mobile') {
	if (!PAGESPEED_API_KEY) {
		return null;
	}

	const apiUrl = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');

	apiUrl.searchParams.set('url', url);
	apiUrl.searchParams.set('key', PAGESPEED_API_KEY);
	apiUrl.searchParams.set('strategy', strategy);

	apiUrl.searchParams.append('category', 'performance');
	apiUrl.searchParams.append('category', 'accessibility');
	apiUrl.searchParams.append('category', 'best-practices');
	apiUrl.searchParams.append('category', 'seo');

	const response = await fetch(apiUrl);

	if (!response.ok) {
		return null;
	}

	const data = await response.json();
	return extractPageSpeedMetrics(data);
}

async function getPageSpeedReport(url) {
	const [mobile, desktop] = await Promise.all([
		getPageSpeedScores(url, 'mobile'),
		getPageSpeedScores(url, 'desktop')
	]);

	return {
		available: Boolean(mobile || desktop),
		mobile,
		desktop,
		colorRules: {
			good: {
				min: 90,
				color: ACCENT_COLOR,
				label: 'Good'
			},
			medium: {
				min: 50,
				color: '#f4b400',
				label: 'Needs improvement'
			},
			poor: {
				max: 49,
				color: '#ff3b30',
				label: 'Poor'
			}
		}
	};
}

function calculatePageSpeedAverage(pageSpeed) {
	if (!pageSpeed?.available) return null;

	const deviceScores = [];

	for (const strategy of ['mobile', 'desktop']) {
		const report = pageSpeed[strategy];

		if (!report) continue;

		const performance = report.scores.performance.value;
		const accessibility = report.scores.accessibility.value;
		const bestPractices = report.scores.bestPractices.value;
		const seo = report.scores.seo.value;

		const weightedScore = Math.round(
			performance * 0.55 + accessibility * 0.2 + bestPractices * 0.15 + seo * 0.1
		);

		deviceScores.push({
			strategy,
			score: weightedScore,
			status: getCoreVitalStatus(weightedScore)
		});
	}

	if (deviceScores.length === 0) return null;

	const mobileScore = deviceScores.find((item) => item.strategy === 'mobile')?.score;
	const desktopScore = deviceScores.find((item) => item.strategy === 'desktop')?.score;

	const finalScore =
		mobileScore !== undefined && desktopScore !== undefined
			? Math.round(mobileScore * 0.65 + desktopScore * 0.35)
			: deviceScores[0].score;

	return {
		score: clampScore(finalScore),
		status: getCoreVitalStatus(finalScore),
		devices: deviceScores
	};
}

function calculateLocalScore(checks, w3cValidation = null) {
	const w3cScore = w3cValidation?.available ? w3cValidation.score : 60;

	const score = clampScore(
		checks.pageTitle.score * 0.08 +
			checks.metaDescription.score * 0.08 +
			checks.responsiveness.score * 0.06 +
			checks.headings.score * 0.08 +
			checks.images.score * 0.08 +
			checks.links.score * 0.05 +
			checks.security.score * 0.11 +
			checks.language.score * 0.03 +
			checks.canonical.score * 0.05 +
			(checks.seoAdvanced?.score || 100) * 0.05 +
			(checks.content?.score || 100) * 0.05 +
			(checks.structuredData?.score || 100) * 0.03 +
			(checks.socialPreview?.score || 100) * 0.03 +
			(checks.localSeo?.score || 100) * 0.03 +
			(checks.semanticAccessibility?.score || 100) * 0.04 +
			(checks.aiReadiness?.score || 100) * 0.03 +
			w3cScore * 0.12
	);

	return {
		score,
		status: getScoreStatus(score),
		w3cScore
	};
}

function calculateOverallScore(localScore, pageSpeedAverage) {
	if (!pageSpeedAverage) {
		return {
			score: localScore.score,
			status: getScoreStatus(localScore.score),
			formula:
				'Overall score is based on local technical, SEO, accessibility, security, W3C validation and structure checks.'
		};
	}

	const score = clampScore(pageSpeedAverage.score * 0.7 + localScore.score * 0.3);

	return {
		score,
		status: getScoreStatus(score),
		formula:
			'Overall score uses strict weighting. Core Web Vitals and Google Lighthouse scores count for 70 percent. Local audit checks, including W3C validation, count for 30 percent.'
	};
}

function createRecommendations({
	checks,
	pageSpeed,
	pageSpeedAverage,
	localScore,
	overallScore,
	w3cValidation
}) {
	const recommendations = [];

	function add(type, title, text, priority = 'medium') {
		const score = type === 'success' ? 100 : priority === 'high' ? 25 : 55;

		recommendations.push({
			type,
			priority,
			title,
			text,
			status: getScoreStatus(score)
		});
	}

	if (!checks.pageTitle.passed || !checks.pageTitle.ideal) {
		add(
			'warning',
			'Improve the page title',
			`Current title length is ${checks.pageTitle.length} characters. Aim for 30 to 60 characters.`,
			'medium'
		);
	} else {
		add('success', 'Page title looks strong', 'The title is present and within a good SEO range.', 'low');
	}

	if (!checks.metaDescription.passed || !checks.metaDescription.ideal) {
		add(
			'warning',
			'Improve the meta description',
			`Current description length is ${checks.metaDescription.length} characters. Aim for 120 to 160 characters.`,
			'medium'
		);
	} else {
		add(
			'success',
			'Meta description looks strong',
			'The meta description is present and within a good SEO range.',
			'low'
		);
	}

	if (!checks.responsiveness.passed) {
		add(
			'warning',
			'Add a viewport meta tag',
			'The page is missing the viewport meta tag, which can damage mobile presentation.',
			'high'
		);
	}

	if (!checks.headings.passed) {
		add('warning', 'Improve heading structure', checks.headings.issues.join(' '), 'medium');
	}

	if (checks.images.missingAltCount > 0) {
		add(
			'warning',
			'Add alt text to images',
			`${checks.images.missingAltCount} image or images are missing alt text.`,
			'medium'
		);
	}

	if (checks.security.score < 90) {
		add(
			'warning',
			'Improve security headers',
			'Add missing headers like Content Security Policy, Strict Transport Security, X Frame Options and Referrer Policy.',
			'high'
		);
	}

	if (checks.images.formats?.needsWebp || checks.images.imagesNeedingModernFormatCount > 0) {
		add(
			'warning',
			'Convert legacy images to modern formats',
			'The page still uses legacy image formats that can be improved with WebP or AVIF for smaller files and better performance.',
			'medium'
		);
	}

	if (checks.seoAdvanced?.score < 80) {
		add(
			'warning',
			'Improve advanced SEO head tags',
			'Add or fix favicon, manifest, theme-color, canonical and resource hint metadata for better crawlability and browser support.',
			'medium'
		);
	}

	if (checks.structuredData?.validBlocks === 0) {
		add(
			'warning',
			'Add structured data',
			'JSON-LD structured data is missing, which can limit rich result opportunities and search interpretation.',
			'medium'
		);
	}

	if (checks.socialPreview?.missingFields?.length > 0) {
		add(
			'warning',
			'Add Open Graph and Twitter card metadata',
			'Social preview metadata is incomplete and can reduce the quality of link previews.',
			'medium'
		);
	}

	if (checks.content?.thinContentWarning) {
		add(
			'warning',
			'Expand thin content',
			'The page content is fairly short or thin, which can weaken topical depth and generative search relevance.',
			'medium'
		);
	}

	if (checks.localSeo?.hasLocalBusinessSignals && !checks.localSeo?.localBusinessSchema) {
		add(
			'warning',
			'Add LocalBusiness schema',
			'The page shows local business signals, so LocalBusiness schema can improve local search clarity.',
			'medium'
		);
	}

	if (checks.semanticAccessibility?.score < 80) {
		add(
			'warning',
			'Add semantic landmarks and labels',
			'Adding main, nav, header, footer and label structure can improve accessibility and content organization.',
			'medium'
		);
	}

	if (checks.aiReadiness?.score < 70) {
		add(
			'warning',
			'Improve generative search readiness',
			'Better headings, structured data, metadata and content organization can strengthen AI and generative-search readiness.',
			'medium'
		);
	}

	if (checks.canonical.missing) {
		add(
			'warning',
			'Add a canonical URL',
			'The canonical tag is missing. This can weaken duplicate content handling.',
			'medium'
		);
	}

	if (!checks.language.passed) {
		add(
			'warning',
			'Add the html language attribute',
			'The page should define a language on the root html element.',
			'medium'
		);
	}

	if (w3cValidation?.available && w3cValidation.criticalErrors > 0) {
		add(
			'warning',
			'Fix W3C HTML validation errors',
			`The W3C validator found ${w3cValidation.criticalErrors} critical error or errors and ${w3cValidation.importantWarnings} warning or warnings. These issues can affect browsers, JavaScript and screen readers.`,
			'high'
		);
	}

	if (w3cValidation?.available && w3cValidation.criticalErrors === 0) {
		add(
			'success',
			'W3C validation has no critical errors',
			'The Accessibility Truth Check did not find critical W3C HTML validation errors.',
			'low'
		);
	}

	if (pageSpeed?.mobile?.scores.performance.value < 70) {
		add(
			'warning',
			'Improve mobile performance',
			`Mobile performance is ${pageSpeed.mobile.scores.performance.value}/100. This should be a top priority.`,
			'high'
		);
	}

	if (pageSpeed?.desktop?.scores.performance.value < 70) {
		add(
			'warning',
			'Improve desktop performance',
			`Desktop performance is ${pageSpeed.desktop.scores.performance.value}/100. Optimize scripts, images and caching.`,
			'high'
		);
	}

	if (pageSpeed?.mobile?.scores.accessibility.value < 90) {
		add(
			'warning',
			'Improve accessibility',
			`Mobile accessibility is ${pageSpeed.mobile.scores.accessibility.value}/100. Review contrast, labels, buttons, alt text and ARIA usage.`,
			'medium'
		);
	}

	if (pageSpeedAverage) {
		add(
			pageSpeedAverage.score >= 90 ? 'success' : 'warning',
			'Core Web Vitals weighted score',
			`The weighted Google score is ${pageSpeedAverage.score}/100. Mobile results are weighted more heavily than desktop.`,
			pageSpeedAverage.score >= 90 ? 'low' : 'high'
		);
	}

	add(
		overallScore.score >= 90 ? 'success' : 'warning',
		'Final audit score',
		`The final score is ${overallScore.score}/100. This version uses stricter scoring so weak Core Web Vitals and W3C validation issues reduce the total score more strongly.`,
		overallScore.score >= 90 ? 'low' : 'high'
	);

	return recommendations;
}

function createSummary({
	url,
	checks,
	robotsTxt,
	sitemapXml,
	overallScore,
	localScore,
	pageSpeedAverage,
	w3cValidation
}) {
	return {
		url,
		score: overallScore,
		localScore,
		googleCoreVitalsScore: pageSpeedAverage,
		w3cValidation,
		title: {
			value: checks.pageTitle.title || 'Title is missing.',
			length: checks.pageTitle.length,
			status: checks.pageTitle.status
		},
		description: {
			value: checks.metaDescription.description || 'Description is missing.',
			length: checks.metaDescription.length,
			status: checks.metaDescription.status
		},
		keywords: {
			value: checks.keywords.keywords || 'Keywords are missing.',
			status: checks.keywords.status
		},
		canonical: {
			value: checks.canonical.canonical || 'Canonical is missing.',
			status: checks.canonical.status
		},
		robotsTag: {
			value: checks.robotsMeta.robots,
			status: checks.robotsMeta.status
		},
		author: {
			value: checks.authorPublisher.author,
			status: checks.authorPublisher.status
		},
		publisher: {
			value: checks.authorPublisher.publisher,
			status: checks.authorPublisher.status
		},
		lang: {
			value: checks.language.lang,
			status: checks.language.status
		},
		counts: {
			h1: checks.headings.counts.h1,
			h2: checks.headings.counts.h2,
			h3: checks.headings.counts.h3,
			h4: checks.headings.counts.h4,
			h5: checks.headings.counts.h5,
			h6: checks.headings.counts.h6,
			images: checks.images.total,
			links: checks.links.total
		},
		files: {
			robotsTxt,
			sitemapXml
		}
	};
}

function getSslCertificateReport(targetUrl) {
	return new Promise((resolve) => {
		try {
			const parsedUrl = new URL(targetUrl);

			if (parsedUrl.protocol !== 'https:') {
				resolve({
					available: false,
					valid: false,
					status: 'Not using HTTPS',
					issuer: 'Not available',
					validFrom: null,
					expires: null,
					daysUntilExpiry: null,
					protocol: 'Not available',
					message: 'The audited website does not use HTTPS.'
				});

				return;
			}

			const hostname = parsedUrl.hostname;
			const port = Number(parsedUrl.port || 443);

			const socket = tls.connect(
				{
					host: hostname,
					port,
					servername: hostname,
					rejectUnauthorized: false,
					timeout: 10000
				},
				() => {
					try {
						const certificate = socket.getPeerCertificate();
						const protocol = socket.getProtocol() || 'Unknown';

						if (!certificate || Object.keys(certificate).length === 0) {
							socket.end();

							resolve({
								available: false,
								valid: false,
								status: 'Certificate unavailable',
								issuer: 'Not available',
								validFrom: null,
								expires: null,
								daysUntilExpiry: null,
								protocol,
								message: 'The SSL certificate could not be read.'
							});

							return;
						}

						const validFromDate = certificate.valid_from
							? new Date(certificate.valid_from)
							: null;

						const expiryDate = certificate.valid_to
							? new Date(certificate.valid_to)
							: null;

						const now = new Date();

						const daysUntilExpiry = expiryDate
							? Math.ceil(
									(expiryDate.getTime() - now.getTime()) /
										(1000 * 60 * 60 * 24)
								)
							: null;

						const valid =
							Boolean(expiryDate) &&
							expiryDate.getTime() > now.getTime() &&
							Boolean(validFromDate) &&
							validFromDate.getTime() <= now.getTime();

						const issuer =
							certificate.issuer?.O ||
							certificate.issuer?.CN ||
							certificate.issuer?.OU ||
							'Not detected';

						socket.end();

						resolve({
							available: true,
							valid,
							status: valid ? 'Valid' : 'Invalid or expired',
							issuer,
							validFrom: validFromDate
								? validFromDate.toISOString()
								: null,
							expires: expiryDate
								? expiryDate.toISOString()
								: null,
							daysUntilExpiry,
							protocol,
							authorized: socket.authorized === true,
							authorizationError: socket.authorizationError || '',
							message: valid
								? `The SSL certificate is valid for another ${daysUntilExpiry} day${
										daysUntilExpiry === 1 ? '' : 's'
									}.`
								: 'The SSL certificate is invalid, expired or not yet valid.'
						});
					} catch (error) {
						socket.destroy();

						resolve({
							available: false,
							valid: false,
							status: 'Certificate check failed',
							issuer: 'Not available',
							validFrom: null,
							expires: null,
							daysUntilExpiry: null,
							protocol: 'Unknown',
							message: error.message || 'The SSL certificate check failed.'
						});
					}
				}
			);

			socket.on('timeout', () => {
				socket.destroy();

				resolve({
					available: false,
					valid: false,
					status: 'Connection timed out',
					issuer: 'Not available',
					validFrom: null,
					expires: null,
					daysUntilExpiry: null,
					protocol: 'Unknown',
					message: 'The SSL connection timed out.'
				});
			});

			socket.on('error', (error) => {
				socket.destroy();

				resolve({
					available: false,
					valid: false,
					status: 'Connection failed',
					issuer: 'Not available',
					validFrom: null,
					expires: null,
					daysUntilExpiry: null,
					protocol: 'Unknown',
					message: error.message || 'The SSL connection failed.'
				});
			});
		} catch (error) {
			resolve({
				available: false,
				valid: false,
				status: 'Invalid URL',
				issuer: 'Not available',
				validFrom: null,
				expires: null,
				daysUntilExpiry: null,
				protocol: 'Unknown',
				message: error.message || 'The URL could not be checked.'
			});
		}
	});
}

export async function POST({ request }) {
	try {
		const { url } = await request.json();

		if (!url) {
			return json({ error: 'Website URL is required.' }, { status: 400 });
		}

		if (isAuditExcludedUrl(url)) {
			return json(
				{ error: 'This website cannot be audited with this tool. Please check the URL.' },
				{ status: 400 }
			);
		}

		const formattedUrl = normalizeUrl(url);
		const response = await fetch(formattedUrl, {
			redirect: 'follow',
			headers: {
				'user-agent':
					'Mozilla/5.0 Website Audit Bot for technical SEO, accessibility and performance checks'
			}
		});

		if (!response.ok) {
			return json(
				{ error: 'Could not fetch this website. Please check the URL.' },
				{ status: 400 }
			);
		}

		const html = await response.text();

		const pageTitle = checkPageTitle(html);
		const metaDescription = checkMetaDescription(html);
		const keywords = checkMetaKeywords(html);
		const robotsMeta = checkRobotsMeta(html);
		const canonical = checkCanonical(html, formattedUrl);
		const authorPublisher = checkAuthorPublisher(html);
		const language = checkLanguage(html);
		const responsiveness = checkViewport(html);
		const headings = checkHeadings(html);
		const images = checkImages(html);
		const links = checkLinks(html, formattedUrl);
		const social = checkSocial(html);
		const security = checkSecurity(formattedUrl, response);
		const technology = detectTechnology(html, response, formattedUrl);
		const seoAdvanced = checkSeoAdvanced(html, formattedUrl);
		const content = checkContentAnalysis(html);
		const socialPreview = checkSocialPreview(html);
		const structuredData = checkStructuredData(html);
		const localSeo = checkLocalSeo(html, structuredData);
		const semanticAccessibility = checkSemanticAccessibility(html);
		const aiReadiness = checkAiReadiness({
			html,
			content,
			structuredData,
			localSeo,
			headings,
			seoAdvanced,
			socialPreview,
			semanticAccessibility
		});

		const [robotsTxt, sitemapXml, pageSpeed, w3cValidation, sslCertificate] =
	await Promise.all([
		checkFileAvailability(formattedUrl, '/robots.txt'),
		checkFileAvailability(formattedUrl, '/sitemap.xml'),
		getPageSpeedReport(formattedUrl),
		getW3cValidationReport(formattedUrl),
		getSslCertificateReport(formattedUrl)
	]);

		const infrastructure = {
	statusCode: response.status,
	statusText: response.statusText || '',
	finalUrl: response.url || formattedUrl,
	redirected: response.redirected === true,
	server: response.headers.get('server') || 'Not detected',
	contentEncoding: response.headers.get('content-encoding') || 'None',
	contentType: response.headers.get('content-type') || 'Not detected',
	poweredBy: response.headers.get('x-powered-by') || 'Not detected',
	sslCertificate,
	robotsTxt,
	sitemapXml,
	canonical,
	securityHeaders: security.headers
};

		const checks = {
			pageTitle,
			metaDescription,
			keywords,
			robotsMeta,
			canonical,
			authorPublisher,
			language,
			responsiveness,
			headings,
			images,
			links,
			social,
			security,
			technology,
			seoAdvanced,
			content,
			structuredData,
			socialPreview,
			localSeo,
			semanticAccessibility,
			aiReadiness,
			w3cValidation
		};

		const localScore = calculateLocalScore(checks, w3cValidation);
		const pageSpeedAverage = calculatePageSpeedAverage(pageSpeed);
		const overallScore = calculateOverallScore(localScore, pageSpeedAverage);

		const recommendations = createRecommendations({
			checks,
			pageSpeed,
			pageSpeedAverage,
			localScore,
			overallScore,
			w3cValidation
		});

		const summary = createSummary({
			url: formattedUrl,
			checks,
			robotsTxt,
			sitemapXml,
			overallScore,
			localScore,
			pageSpeedAverage,
			w3cValidation
		});

		return json({
			url: formattedUrl,
			message: 'Audit completed.',
			htmlLength: html.length,
			theme: {
				background: '#000000',
				accent: ACCENT_COLOR,
				success: ACCENT_COLOR,
				warning: '#f4b400',
				danger: '#ff3b30',
				text: '#ffffff',
				mutedText: '#a1a1aa',
				card: '#0b0b0f',
				border: 'rgba(255, 255, 255, 0.12)'
			},
			overallScore,
			localScore,
			googleScore: pageSpeedAverage,
			pageSpeed,
			w3cValidation,
			summary,
			sections: {
				summary,
				headers: headings,
				images,
				links,
				social,
				infrastructure,
				accessibilityTruthCheck: w3cValidation,
				tools: {
					robotsTxt,
					sitemapXml,
					securityHeaders: security.headers,
					viewport: responsiveness,
					w3cValidation
				},
				technology,
				seoAdvanced,
				content,
				structuredData,
				socialPreview,
				localSeo,
				semanticAccessibility,
				aiReadiness
			},
			checks,
			recommendations
		});
	} catch (error) {
		console.error(error);

		return json(
			{ error: 'Something went wrong while checking the website.' },
			{ status: 500 }
		);
	}
}