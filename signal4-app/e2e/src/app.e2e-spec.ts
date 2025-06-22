import { browser, by, element } from 'protractor';

describe('Anwendung End-to-End Tests', () => {
    it('sollte die Startseite laden', () => {
        browser.get('/');
        expect(browser.getTitle()).toEqual('Erwarteter Titel');
    });

    it('sollte ein Element auf der Seite finden', () => {
        const myElement = element(by.css('selector-für-element'));
        expect(myElement.isPresent()).toBe(true);
    });
});