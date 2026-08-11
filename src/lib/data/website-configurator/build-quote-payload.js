import {
  getGoalById,
  getProjectStatusById,
  getWebsiteTypeById,
} from "$lib/data/website-configurator/configurator-data.js";

import {
  getContentReadinessOption,
  normaliseReferenceUrl,
} from "$lib/data/website-configurator/content-readiness-data.js";

import {
  getPageOptionById,
  getPagesContent,
} from "$lib/data/website-configurator/pages-data.js";

import {
  getFeatureOptionById,
  getFeaturesContent,
} from "$lib/data/website-configurator/features-data.js";

import {
  getTimelineOption,
  getTimelineSupportContent,
} from "$lib/data/website-configurator/timeline-support-data.js";

const PACKAGE_LABELS = {
  essential: "Essential",
  growth: "Growth",
  advanced: "Advanced",
};

const ADVANCED_WEBSITE_TYPES = [
  "online-shop",
  "membership",
  "web-app",
];

const ADVANCED_FEATURE_IDS = [
  "online-payments",
  "product-management",
  "customer-account",
  "subscription-payments",
  "donation-payment",
  "user-registration",
  "member-login",
  "protected-content",
  "user-dashboard",
  "user-roles",
  "booking-system",
  "ticketing",
  "custom-database",
  "external-api",
  "automation",
  "secure-forms",
  "advanced-filtering",
  "interactive-calculator",
  "ai-function",
  "custom-feature",
];

const ADVANCED_FINAL_REQUIREMENT_IDS = [
  "final-payments",
  "final-login",
  "final-external-system",
  "final-ai-feature",
  "final-file-uploads",
];

function cleanString(value) {
  return String(value ?? "").trim();
}

function cleanStringArray(values) {
  if (!Array.isArray(values)) return [];

  return values
    .map((value) => cleanString(value))
    .filter(Boolean);
}

function optionLabel(option) {
  return option?.label
    ? cleanString(option.label)
    : "";
}

function mapOptionLabels(ids, resolver) {
  if (!Array.isArray(ids)) return [];

  return ids
    .map((id) => resolver(id))
    .filter(Boolean)
    .map((option) => optionLabel(option))
    .filter(Boolean);
}

function calculateRecommendedPackage({
  selectedWebsiteType,
  selectedPages,
  customPageNames,
  selectedFeatures,
  websiteLanguages,
  supportNeeds,
  ongoingSupport,
  finalFeatureAdditions,
  customIntegration,
}) {
  const pageCount =
    (Array.isArray(selectedPages)
      ? selectedPages.length
      : 0) +
    cleanStringArray(customPageNames).length;

  const hasAdvancedWebsiteType =
    ADVANCED_WEBSITE_TYPES.includes(
      selectedWebsiteType,
    );

  const hasAdvancedFeature =
    Array.isArray(selectedFeatures) &&
    selectedFeatures.some((id) =>
      ADVANCED_FEATURE_IDS.includes(id),
    );

  const hasAdvancedFinalRequirement =
    Array.isArray(finalFeatureAdditions) &&
    finalFeatureAdditions.some((id) =>
      ADVANCED_FINAL_REQUIREMENT_IDS.includes(
        id,
      ),
    );

  if (
    hasAdvancedWebsiteType ||
    hasAdvancedFeature ||
    hasAdvancedFinalRequirement ||
    pageCount > 12 ||
    selectedFeatures.length > 8 ||
    cleanString(customIntegration)
  ) {
    return "advanced";
  }

  const hasContentSupport =
    Array.isArray(supportNeeds) &&
    supportNeeds.length > 0;

  const isMultilingual =
    websiteLanguages &&
    websiteLanguages !== "one-language";

  if (
    pageCount > 5 ||
    selectedFeatures.length > 3 ||
    cleanStringArray(customPageNames).length >
      0 ||
    hasContentSupport ||
    isMultilingual ||
    ongoingSupport.length > 0
  ) {
    return "growth";
  }

  return "essential";
}

export function buildWebsiteConfiguratorQuotePayload({
  language = "de",
  contact = {},
  answers = {},
}) {
  const pagesContent =
    getPagesContent(language);

  const featuresContent =
    getFeaturesContent(language);

  const timelineContent =
    getTimelineSupportContent(language);

  const websiteType = optionLabel(
    getWebsiteTypeById(
      answers.selectedWebsiteType,
      language,
    ),
  );

  const goals = mapOptionLabels(
    answers.selectedGoals,
    (id) => getGoalById(id, language),
  );

  const projectStatus = optionLabel(
    getProjectStatusById(
      answers.projectStatus,
      language,
    ),
  );

  const contentReadiness = optionLabel(
    getContentReadinessOption(
      "contentOptions",
      answers.contentReadiness,
      language,
    ),
  );

  const visualReadiness = optionLabel(
    getContentReadinessOption(
      "visualOptions",
      answers.visualReadiness,
      language,
    ),
  );

  const brandingReadiness = optionLabel(
    getContentReadinessOption(
      "brandingOptions",
      answers.brandingReadiness,
      language,
    ),
  );

  const designDirection = optionLabel(
    getContentReadinessOption(
      "directionOptions",
      answers.designDirection,
      language,
    ),
  );

  const contentSupport = mapOptionLabels(
    answers.supportNeeds,
    (id) =>
      getContentReadinessOption(
        "supportOptions",
        id,
        language,
      ),
  );

  const designReferences =
    cleanStringArray(
      answers.designReferenceLinks,
    )
      .map((link) =>
        normaliseReferenceUrl(link),
      )
      .filter(Boolean);

  const selectedPageLabels =
    mapOptionLabels(
      answers.selectedPages,
      (id) =>
        getPageOptionById(id, language),
    );

  const customPageLabels = cleanStringArray(
    answers.customPageNames,
  );

  const pageVolume = optionLabel(
    pagesContent.volumeOptions?.find(
      (option) =>
        option.id === answers.pageVolume,
    ),
  );

  const selectedFeatureLabels =
    mapOptionLabels(
      answers.selectedFeatures,
      (id) =>
        getFeatureOptionById(id, language),
    );

  const websiteLanguage = optionLabel(
    featuresContent.languageOptions?.find(
      (option) =>
        option.id ===
        answers.websiteLanguages,
    ),
  );

  const projectStart = optionLabel(
    getTimelineOption(
      "startOptions",
      answers.projectStart,
      language,
    ),
  );

  const launchTimeline = optionLabel(
    getTimelineOption(
      "launchOptions",
      answers.launchTimeline,
      language,
    ),
  );

  const collaborationModel = optionLabel(
    getTimelineOption(
      "collaborationOptions",
      answers.collaborationModel,
      language,
    ),
  );

  const ongoingSupport = mapOptionLabels(
    answers.ongoingSupport,
    (id) =>
      getTimelineOption(
        "supportOptions",
        id,
        language,
      ),
  );

  const trainingPreference = optionLabel(
    getTimelineOption(
      "trainingOptions",
      answers.trainingPreference,
      language,
    ),
  );

  const finalRequirements =
    mapOptionLabels(
      answers.finalFeatureAdditions,
      (id) =>
        timelineContent.finalRequirementOptions?.find(
          (option) => option.id === id,
        ),
    );

  const recommendedPackage =
    calculateRecommendedPackage({
      selectedWebsiteType:
        answers.selectedWebsiteType,
      selectedPages:
        answers.selectedPages ?? [],
      customPageNames:
        answers.customPageNames ?? [],
      selectedFeatures:
        answers.selectedFeatures ?? [],
      websiteLanguages:
        answers.websiteLanguages,
      supportNeeds:
        answers.supportNeeds ?? [],
      ongoingSupport:
        answers.ongoingSupport ?? [],
      finalFeatureAdditions:
        answers.finalFeatureAdditions ?? [],
      customIntegration:
        answers.customIntegration,
    });

  const selectedPackage =
    cleanString(answers.selectedPackage);

  return {
    formType: "website-configurator",

    language,

    submittedAt: new Date().toISOString(),

    sourceUrl:
      typeof window !== "undefined"
        ? window.location.href
        : "",

    website: cleanString(
      contact.website,
    ),

    name: cleanString(contact.fullName),

    email: cleanString(contact.email),

    phone: cleanString(contact.phone),

    company: cleanString(contact.company),

    currentWebsite: cleanString(
      contact.currentWebsite,
    ),

    preferredContact: cleanString(
      contact.preferredContact,
    ),

    comments: cleanString(contact.comments),

    consent: Boolean(contact.consent),

    selectedPackage,

    selectedPackageLabel:
      PACKAGE_LABELS[selectedPackage] ??
      selectedPackage,

    recommendedPackage,

    recommendedPackageLabel:
      PACKAGE_LABELS[recommendedPackage] ??
      recommendedPackage,

    configuration: {
      project: {
        websiteType,
        goals,
        projectStatus,
      },

      contentAndDesign: {
        contentReadiness,
        visualReadiness,
        brandingReadiness,
        designDirection,
        designReferences,
        supportNeeds: contentSupport,
      },

      pagesAndStructure: {
        selectedPages: selectedPageLabels,
        customPages: customPageLabels,
        pageVolume,
      },

      featuresAndTechnology: {
        selectedFeatures:
          selectedFeatureLabels,
        websiteLanguages:
          websiteLanguage,
        customIntegration: cleanString(
          answers.customIntegration,
        ),
        finalRequirements,
        finalRequirementNote: cleanString(
          answers.finalRequirementNote,
        ),
      },

      timelineAndSupport: {
        projectStart,
        launchTimeline,
        collaborationModel,
        ongoingSupport,
        trainingPreference,
        timelineNote: cleanString(
          answers.timelineNote,
        ),
      },
    },
  };
}