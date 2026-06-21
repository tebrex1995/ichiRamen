import { test } from '@playwright/test';
import { MenuPage } from '../pages/MenuPage';


test('Search filters menu by keyword', async ({ page }) => {
  const menu = new MenuPage(page);
  await menu.goto();
  await menu.typeInSearchBox('miso');
  await menu.verifyMenuItemVisible('Miso Ramen');
  await menu.verifyMenuItemCount(1);
});

test('Category tab filters cards', async ({ page }) => {
  const menu = new MenuPage(page);
  await menu.goto();
  await menu.clickCategoryTab('Tonkotsu');
  await menu.verifyMenuItemVisible('Tonkotsu');
  await menu.verifyMenuItemCount(1);
  await menu.verifyYouMightAlsoLikeCount(3);
});

test('Add item updates cart count', async ({ page }) => {
  const menu = new MenuPage(page);
  await menu.goto();
  await menu.addItemToCart('Miso Ramen');
  await menu.verifyCartCount(1);
});


test('No-match search shows empty state', async ({ page }) => {
  const menu = new MenuPage(page);
  await menu.goto();
  await menu.typeInSearchBox('pizza');
  await menu.verifyEmptySearchTextVisible();
});


test('Same item added twice increments count', async ({ page }) => {
  const menu = new MenuPage(page);
  await menu.goto();
  await menu.addItemToCart('Miso Ramen');
  await menu.addItemToCart('Miso Ramen');
  await menu.verifyCartCount(2);
});

test('Card tabs switch visible content', async ({ page }) => {
    const menu = new MenuPage(page);
    await menu.goto();
    await menu.openReviewsTabForItem('Miso Ramen');
    await menu.verifyReviewVisibleForItem('Miso Ramen', 'Naruto Uzumaki', '5 stars');
});


test('Delivery address dropdown changes selection', async ({ page }) => {
    const menu = new MenuPage(page);
    await menu.goto();
    await menu.changeAddress('Hokage Tower, 3rd Floor');
    await menu.verifyNewAddressSelected('Hokage Tower, 3rd Floor');
});