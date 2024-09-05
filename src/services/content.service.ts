import Data from '../bacarus.json'
import {delay} from "./product.service";

export const ContentService = {
  async getHeader() {
    await delay(300);
    return Data.header;
  },
  async getFooter() {
    await delay(300);
    return Data.footer;
  },
  async getNotFound() {
    await delay(300);
    return Data.pages.notFound.sections[0];
  },
  async getMainPageSections() {
    await delay(300);
    return Data.pages.mainPage.sections;
  },
  async getAboutPageSections() {
    await delay(300);
    return Data.pages.about.sections;
  },
  async getCatalogSections() {
    await delay(300);
    return Data.pages.catalogPage.sections;
  },
  async getContactsSections() {
    await delay(300);
    return Data.pages.contacts.sections;
  },
  async getDeliverySections() {
    await delay(300);
    return Data.pages.delivery.sections;
  },
  async getThanksSections() {
    await delay(300);
    return Data.pages.thanks.sections[0];
  }
}