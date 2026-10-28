import { readFileSync } from "node:fs";
import { test, expect } from "@playwright/test";
import { projects, team, milestones } from "../lib/content/data";

test("content relationships and multilingual data are complete", () => {
  expect(projects).toHaveLength(6);
  expect(team).toHaveLength(8);
  expect(milestones).toHaveLength(6);
  for (const project of projects) {
    expect(
      project.teamMemberIds.every((id) =>
        team.some((member) => member.id === id),
      ),
    ).toBeTruthy();
    expect(project.title.en).toBeTruthy();
    expect(project.title.ja).toBeTruthy();
  }
});
test("required routes and all project pages render in all three languages", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const locale of ["en", "ja", "my"])
    for (const path of [
      "",
      "/projects",
      "/services",
      "/about",
      "/team",
      "/contact",
      ...projects.map((p) => `/projects/${p.slug}`),
    ]) {
      const response = await page.goto(`/${locale}${path}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator("main h1")).toBeVisible();
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
    }
  expect(errors).toEqual([]);
});
test("filters, reset, empty results and locale switching preserve query", async ({
  page,
}) => {
  await page.goto("/en/projects");
  await page
    .getByLabel("Category", { exact: true })
    .selectOption("residential");
  await page.getByRole("button", { name: "Apply filters" }).click();
  await expect(page.getByRole("status")).toHaveText("2 projects");
  await page.getByLabel("Change language").selectOption("ja");
  await expect(page).toHaveURL(/\/ja\/projects\?.*category=residential/);
  await expect(page.getByRole("status")).toHaveText("2件のプロジェクト");
  await page.getByLabel("プロジェクトを検索").fill("unmatchable");
  await page.getByRole("button", { name: "絞り込む" }).click();
  await expect(
    page.getByText("一致するプロジェクトはありません。"),
  ).toBeVisible();
  await page.getByRole("link", { name: "条件をリセット" }).click();
  await expect(page.getByRole("status")).toHaveText("6件のプロジェクト");
});
test("accordion, gallery keyboard controls and demo validation", async ({
  page,
}) => {
  await page.goto("/en");
  const trigger = page.getByRole("button", {
    name: "02 Commercial development",
  });
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("button", { name: "01 Residential construction" }),
  ).toHaveAttribute("aria-expanded", "false");
  await page.goto("/en/projects/the-terrace");
  await page.getByRole("button", { name: "Open image 1", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Close", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Close", exact: true }),
  ).not.toBeVisible();
  await page.goto("/en/contact");
  await page.getByRole("button", { name: "Preview inquiry" }).click();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  await page.getByLabel("Full name").fill("Test Person");
  await page.getByLabel("Email address").fill("test@example.com");
  await page.getByLabel("Project type").selectOption("residential");
  await page
    .getByLabel("Tell us about your project")
    .fill("A courtyard home with space for a growing family.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Preview inquiry" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Nothing was sent or saved.",
  );
});
test("mobile navigation, reduced motion, images and layout", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Projects", exact: true })
    .click();
  await expect(page).toHaveURL("/en/projects");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  for (const path of [
    "/en",
    "/ja",
    "/en/projects",
    "/ja/contact",
    "/my",
    "/my/projects",
    "/my/contact",
    "/en/about",
  ]) {
    await page.goto(path);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
  }
  await page.goto("/en");
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect(page.locator(".hero-image img")).toHaveJSProperty(
    "complete",
    true,
  );
  await expect(page.locator(".hero-image img")).not.toHaveJSProperty(
    "naturalWidth",
    0,
  );
  const broken = await page
    .locator("img")
    .evaluateAll((images) =>
      images
        .filter(
          (img): img is HTMLImageElement =>
            img instanceof HTMLImageElement &&
            img.complete &&
            img.naturalWidth === 0,
        )
        .map((img) => img.src),
    );
  expect(broken).toEqual([]);
  await page.screenshot({ path: "/tmp/northline-mobile.png", fullPage: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/en");
  await page.screenshot({
    path: "/tmp/northline-desktop.png",
    fullPage: false,
  });
});
test("404, locale redirect and SEO endpoints", async ({ page, request }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
  await page.goto("/en/projects/not-a-project");
  await expect(
    page.getByRole("heading", { name: "A little off the blueprint." }),
  ).toBeVisible();
  await page.goto("/ja/missing");
  await expect(
    page.getByRole("heading", { name: "図面から少し外れたようです。" }),
  ).toBeVisible();
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect((await request.get("/robots.txt")).status()).toBe(200);
});

test("translation keys and content cover every supported language", async () => {
  const en = JSON.parse(readFileSync("messages/en.json", "utf8")) as object;
  const ja = JSON.parse(readFileSync("messages/ja.json", "utf8")) as object;
  const my = JSON.parse(readFileSync("messages/my.json", "utf8")) as object;
  function keys(value: object, prefix = ""): string[] {
    return Object.entries(value)
      .flatMap(([key, item]) =>
        typeof item === "object" && item !== null
          ? keys(item, `${prefix}${key}.`)
          : [`${prefix}${key}`],
      )
      .sort();
  }
  expect(keys(ja)).toEqual(keys(en));
  expect(keys(my)).toEqual(keys(en));
  const data = await import("../lib/content/data");
  function check(value: unknown) {
    if (!value || typeof value !== "object") return;
    if ("en" in value) {
      expect(value).toHaveProperty("ja");
      expect(value).toHaveProperty("my");
      for (const text of Object.values(value))
        expect(typeof text === "string" && text.length > 0).toBeTruthy();
    } else Object.values(value).forEach(check);
  }
  Object.values(data).forEach(check);
});

test("Myanmar switching preserves filters and localizes validation and gallery", async ({
  page,
}) => {
  await page.goto("/en/projects?category=residential&status=completed");
  await page.getByLabel("Change language").selectOption("my");
  await expect(page).toHaveURL(
    /\/my\/projects\?category=residential&status=completed/,
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "my");
  await expect(page.getByRole("status")).toHaveText("ပရောဂျက် ၁ ခု");
  await expect(
    page.getByRole("heading", { name: "တယ်ရေ့စ် လူနေအိမ်ရာ" }),
  ).toBeVisible();
  await page.goto("/my/projects/the-terrace");
  await page
    .getByRole("button", { name: "ပုံ ၁ ကို ဖွင့်ရန်", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "ပိတ်ရန်", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await page.goto("/my/contact");
  await page
    .getByRole("button", { name: "စုံစမ်းမေးမြန်းမှုကို စစ်ဆေးရန်" })
    .click();
  await expect(
    page.getByText("မှန်ကန်သော အီးမေးလ်လိပ်စာ ထည့်ပါ။"),
  ).toBeVisible();
  await page.goto("/my/not-a-page");
  await expect(
    page.getByRole("heading", { name: "ရှာနေသော စာမျက်နှာ မတွေ့ပါ။" }),
  ).toBeVisible();
});
