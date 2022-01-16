import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    //return element(by.css('app-root h1')).getText() as Promise<string>;
    return element(by.xpath('/html/body/app-root/app-login/mat-card/mat-card-title')).getText() as Promise<string>;
  }
}
