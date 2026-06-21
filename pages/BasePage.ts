import { Page, Locator } from '@playwright/test';

export class BasePage  {
    readonly cartCount: Locator;
    private cartButton: Locator
    
    constructor(protected readonly page: Page) {
        this.cartCount = page.getByTestId('cart-count');
        this.cartButton = page.getByRole('button', { name: 'Cart' });
    }

     async goto() {
      await this.page.goto('');
  }

    async openCart() {
        await this.cartButton.click();
    }


}