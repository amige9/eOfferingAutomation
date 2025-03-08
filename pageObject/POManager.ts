import { Page } from '@playwright/test';
import SponsorLoginPage from '../pageObject/SponsorLoginPage';


class POManager{
    public page:Page;
    public sponsorLoginPage:SponsorLoginPage;
    // public logger;

    constructor(page:Page){
        this.page = page
        this.sponsorLoginPage = new SponsorLoginPage(this.page);
    }


    getSponsorLoginPage(){
        return this.sponsorLoginPage;
    }
}


export default POManager;