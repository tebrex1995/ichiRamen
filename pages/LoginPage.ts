import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    private submitButton: Locator;
    private loginButton: Locator;
    private logoutButton: Locator;
    private usernameInput: Locator;
    private passwordInput: Locator;
    readonly loginSuccessMessage: Locator;
    readonly memberName: Locator;
    readonly invalidLoginMessage: Locator;


    constructor(page: Page) {
        super(page);
        this.loginButton = this.page.getByRole('button', { name: 'Log in' });
        this.submitButton = this.page.getByRole('button', { name: 'Sign in' });
        this.logoutButton = this.page.getByRole('button', { name: 'Log out' });
        this.usernameInput = this.page.getByLabel('Username');
        this.passwordInput = this.page.getByLabel('Password');
        this.loginSuccessMessage = this.page.getByText('Welcome back, ');
        this.memberName = this.page.locator('#memberName');
        this.invalidLoginMessage = this.page.locator('#loginError');
    }

    async openLoginModal(){
        await this.loginButton.click();
        await expect(this.submitButton).toBeVisible();
    }

    async Login(username: string, password: string) {
        await this.openLoginModal();
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    async verifyLoginSuccess(name: string) {
        await expect(this.loginSuccessMessage).toBeVisible();
        await expect(this.memberName).toHaveText(name);
    }

    async verifyInvalidLogin() {
        await expect(this.invalidLoginMessage).toBeVisible();
        await expect(this.invalidLoginMessage).toHaveText('Invalid credentials');
    }

    async Logout() {
        await this.logoutButton.click();
        await expect(this.loginButton).toBeVisible();
    }
}