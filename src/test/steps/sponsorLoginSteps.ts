import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

setDefaultTimeout(150 * 1000);

Given('the sponsor navigates to the login page', async function () {
      this.loginPage = this.poManager.getSponsorLoginPage();
      await this.loginPage.goTo();
      this.page.logger?.info("Navigated to the URL");
      // (this.page as any).logger.info("Navigated to the URL");

    });

When("the sponsor enters a valid username as {string} and valid password as {string}", async function (userName,pwd) {
      await this.loginPage.login(userName,pwd);
      this.page.logger?.info("Entered Username and Password");
})

When("the sponsor clicks on the sign in button", async function(){
      await this.loginPage.clickSignin();
      this.page.logger?.info("Clicked Sign in button");
})

Then("the sponsor should be logged in", async function (){
      // await this.loginPage.assertLoginIsSuccessful()
      // this.page.logger?.info("Assert the sign in is successful");

})



