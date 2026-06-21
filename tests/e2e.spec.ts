import {test} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {MenuPage} from '../pages/MenuPage';


test('Login and add item to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const menu = new MenuPage(page);

    await loginPage.goto();
    await loginPage.Login('naruto', 'ramen');
    await loginPage.verifyLoginSuccess('naruto');

    await menu.addItemToCart('Miso Ramen');
    await menu.verifyCartCount(1);
})