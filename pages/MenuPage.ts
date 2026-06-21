import {Page, Locator, expect} from '@playwright/test';
import { BasePage } from './BasePage';

export class MenuPage extends BasePage {
    readonly searchBox: Locator;
    readonly menuGrid: Locator;
    readonly youMightAlsoLikeRegion: Locator;

    constructor(page: Page) {
        super(page);
        this.searchBox = page.getByRole('searchbox', { name: 'Search menu' });
        this.menuGrid = page.locator('#menuGrid');
        this.youMightAlsoLikeRegion = page.getByRole('region', { name: 'You Might Also Like' });
    }

    async typeInSearchBox(keyword: string) {
        await this.searchBox.fill(keyword);
    }

    async verifyEmptySearchTextVisible() {
        await expect(this.page.getByText('No bowls match your search.')).toBeVisible();
    }

    async clickCategoryTab(category: string) {
        await this.page.getByRole('tab', { name: category }).click();
    }

    async verifyMenuItemVisible(itemName: string) {
        await expect(this.page.getByRole('listitem', { name: itemName })).toBeVisible();
    }

    async verifyMenuItemCount(expectedCount: number) {
        await expect(this.menuGrid.getByRole('listitem')).toHaveCount(expectedCount);
    }

    async verifyYouMightAlsoLikeCount(expectedCount: number) {
        await expect(this.youMightAlsoLikeRegion.getByRole('article')).toHaveCount(expectedCount);
    }

    async addItemToCart(itemName: string) {
      const btn = this.page.getByRole('button',
          { name: `Add ${itemName} to cart` });
      await btn.waitFor({ state: 'visible' });
      await btn.click();
  }

    async verifyCartCount(expectedCount: number) {
        await expect(this.cartCount).toHaveText(expectedCount.toString());
    }

    async openReviewsTabForItem(itemName: string) {
        await this.page.getByLabel(itemName, { exact: true }).getByRole('tab', { name: 'Reviews' }).click();
    }

    async verifyReviewVisibleForItem(itemName: string, reviewerName: string, rating: string) {
        await expect(this.page.getByLabel(itemName, { exact: true }).getByText(reviewerName)).toBeVisible();
        await expect(this.page.getByLabel(itemName, { exact: true }).getByText(rating)).toBeVisible();
    }

    async changeAddress(newAddress: string) {
        await this.page.getByRole('button', { name: /Konoha Village, Gate 4|Hokage Tower, 3rd Floor/ }).click();
        await this.page.getByRole('option', { name: newAddress }).click();
    }

    async verifyNewAddressSelected(newAddress: string) {
        await expect(this.page.getByRole('button', { name: newAddress })).toBeVisible();
    }
}