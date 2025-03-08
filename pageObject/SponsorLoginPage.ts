import { expect, Page, Locator, } from '@playwright/test';


class SponsorLoginPage{
    public page:Page;
    public username:Locator;
    public pwd:Locator;
    public signInButton:Locator;
    public dashboardText:Locator;

    constructor(page:Page){
        this.page = page;
        this.username = this.page.locator("#uname");
        this.pwd = this.page.locator("#pass");
        this.signInButton = this.page.locator("#signIn");
        this.dashboardText = this.page.locator(".h3.mb-3");
    }

 async goTo() {
    try {
        await this.page.goto(process.env.BASEURL!);
    } catch (error) {
        console.error(`Failed to navigate to ${process.env.BASEURL}: ${error}`);
        throw error;
    }
}

    async login(email:string, pwd:string){
        await this.username.fill(email);
        await this.pwd.fill(pwd)
    }

    async clickSignin(){
        await this.signInButton.click();
    }

    async assertLoginIsSuccessful(){
        await expect(this.dashboardText).toBeVisible({ timeout: 50000 });
        await expect(this.page).toHaveTitle("Dashboard");
     }
}



export default SponsorLoginPage;