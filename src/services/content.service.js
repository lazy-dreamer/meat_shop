import Data from '../bacarus.json'

export const ContentService = {
  async getHeader() {
    return Data.header;
  },
  async getFooter() {
    return Data.footer;
  },
  async getNotFound() {
    return Data.pages.notFound.sections[0];
  },
  async getMainPageSections() {
    return Data.pages.mainPage.sections;
  },
  async getAboutPageSections() {
    return Data.pages.about.sections;
  },
  async getCatalogSections() {
    return Data.pages.catalogPage.sections;
  },
  async getContactsSections() {
    return Data.pages.contacts.sections;
  },
  async getDeliverySections() {
    return Data.pages.delivery.sections;
  },
  async getThanksSections() {
    return Data.pages.thanks.sections[0];
  }
}