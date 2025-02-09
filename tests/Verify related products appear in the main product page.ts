import { expect, test } from '@playwright/test';

test('Verify related products appear in the main product page', async ({ page }) => {
  await page.goto('https://www.ebay.com/');
  await page.getByRole('combobox', { name: 'Search for anything' }).click();
  await page.getByRole('combobox', { name: 'Search for anything' }).fill('wallet men');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByAltText('Mens RFID Blocking Genuine').click();
  const page1 = await page1Promise;
  await expect(page1.getByRole('link', { name: 'Buy It Now' })).toBeVisible();
  await page.waitForTimeout(1000);
  await expect(page1.getByRole('heading', { name: 'Similar items' })).toBeVisible();
  await page1.locator('.PIgf').click();
  await page1.waitForSelector('[data-testid="x-atf-left-bottom-river"]');
  const buttonCount = await page1.locator('[data-testid="x-atf-left-bottom-river"] a[data-track]').count();
  //Number of buttons with data-ebayui inside
  console.log(`Number of Related products [data-testid="x-atf-left-bottom-river"]: ${buttonCount}`);
});