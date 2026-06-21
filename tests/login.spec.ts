import { test } from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';

test('Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.Login('naruto', 'ramen');
    await loginPage.verifyLoginSuccess('naruto');
});

test('Login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.Login('naruto', 'wrongpassword');
    await loginPage.verifyInvalidLogin();
});