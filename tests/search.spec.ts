import { test, expect } from '@playwright/test';

test('Search filters menu by keyword', async ({ page }) => {
  await page.goto('');
  await page.getByRole('searchbox', { name: 'Search menu' }).fill('miso');
  await expect(page.getByRole('listitem', { name: 'Miso Ramen' })).toBeVisible();
  await expect(page.locator('#menuGrid').getByRole('listitem')).toHaveCount(1);
});

test('Category tab filters cards', async ({ page }) => {
  const youMighAlsoLikeRegion =  page.getByRole('region', { name: 'You Might Also Like' });
  await page.goto('');
  await page.getByRole('tab', { name: 'Tonkotsu' }).click();


  await expect(page.locator('#menuGrid').getByRole('listitem', { name: 'Tonkotsu' })).toHaveCount(1);
  await expect(page.getByRole('listitem', { name: 'Tonkotsu' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'You Might Also Like' })).toBeVisible();
  await expect(youMighAlsoLikeRegion.getByRole('article')).toHaveCount(3);
});

test('Add item updates cart count', async ({ page }) => {
  await page.goto('');
  await page.getByRole('button', { name: 'Add Miso Ramen to cart' }).click();
  await expect(page.getByTestId('cart-count')).toHaveText('1');
});


test('No-match search shows empty state', async ({ page }) => {
  await page.goto('');
  await page.getByRole('searchbox', { name: 'Search menu' }).fill('pizza');
  await expect(page.getByText('No bowls match your search.')).toBeVisible();
});


test('Same item added twice increments count', async ({ page }) => {
  await page.goto('');
  await page.getByRole('button', { name: 'Add Miso Ramen to cart' }).click();
  await page.getByRole('button', { name: 'Add Miso Ramen to cart' }).click();
  await expect(page.getByTestId('cart-count')).toHaveText('2');
});

test('Card tabs switch visible content', async ({ page }) => {
    await page.goto('');
    await page.getByLabel('Miso Ramen', { exact: true }).getByRole('tab', { name: 'Reviews' }).click();
    await expect(page.getByText('Naruto U.')).toBeVisible();
    await expect(page.getByLabel('Miso Ramen', { exact: true }).getByText('★★★★★')).toBeVisible();
});


test('Delivery address dropdown changes selection', async ({ page }) => {
    await page.goto('');
    await page.getByRole('button', { name: 'Konoha Village, Gate 4' }).click();
    await page.getByRole('option', { name: 'Hokage Tower, 3rd Floor' }).click();
    await expect(page.getByRole('button', { name: 'Hokage Tower, 3rd Floor' })).toBeVisible();
});