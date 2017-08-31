import { browser, by, element } from 'protractor';

import { EnvironmentMenu } from './environmentMenu';
import { FiltersMenu } from './filtersMenu';
import { ViewMenu } from './viewMenu';

export class Accordion {
  environmentMenu: EnvironmentMenu;
  filtersMenu: FiltersMenu;
  viewMenu: ViewMenu

  constructor() {
    this.environmentMenu = new EnvironmentMenu(this);
    this.filtersMenu = new FiltersMenu(this);
    this.viewMenu = new ViewMenu(this);
  }

  get activeMenu() {
    const active = element(by.xpath(`//app-twiglet-mode-left-bar//div[@class="card-header active"]//a`));
    return active.isPresent().then(present => {
      if (present) {
        return active.getText();
      }
      return undefined;
    });
  }

  goToMenu(text: 'Environment' | 'Filter' | 'View') {
    const elementToClick =
      element(by.xpath(`//app-twiglet-mode-left-bar//div[contains(@class, "card-header")]//a[contains(text(), '${text}')]`));
    elementToClick.click();
  }
}
