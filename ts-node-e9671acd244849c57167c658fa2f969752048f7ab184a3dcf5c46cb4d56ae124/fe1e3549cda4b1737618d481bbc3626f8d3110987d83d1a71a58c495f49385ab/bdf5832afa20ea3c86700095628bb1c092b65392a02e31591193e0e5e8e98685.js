"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var app_po_1 = require("../PageObjects/app.po");
var utils_1 = require("../utils");
describe('Filtering Twiglets', function () {
    var page;
    beforeAll(function () {
        page = new app_po_1.TwigPage();
        page.navigateTo();
        page.header.twigletTab.deleteTwigletIfNeeded(utils_1.twigletName, page);
        protractor_1.browser.waitForAngular();
        utils_1.createDefaultJsonImportedTwiglet(page);
        protractor_1.browser.waitForAngular();
    });
    afterAll(function () {
        // browser.manage().logs().get('browser').then(function(browserLog) {
        //   console.log('log: ' + require('util').inspect(browserLog));
        // });
        utils_1.deleteDefaultJsonImportedTwiglet(page);
    });
    it('can filter out a set of nodes', function () {
        page.accordion.filtersMenu.filters[0].type = 'ent1';
        protractor_1.browser.waitForAngular();
        expect(page.twigletGraph.nodeCount).toEqual(2);
        expect(page.twigletGraph.linkCount).toEqual(0);
    });
    it('affects the side by when nodes are filtered', function () {
        expect(page.nodeList.entities.ent1.count).toEqual(2);
        expect(page.nodeList.entities.ent3.count).toEqual(0);
    });
    it('can add a target to a filter', function () {
        page.accordion.filtersMenu.filters[0].addTarget();
        protractor_1.browser.waitForAngular();
        page.accordion.filtersMenu.filters[0].target.type = 'ent3';
        protractor_1.browser.waitForAngular();
        expect(page.twigletGraph.nodeCount).toEqual(6);
        expect(page.nodeList.entities.ent3.count).toEqual(4);
    });
    it('can add multiple filters', function () {
        page.accordion.filtersMenu.addFilter();
        protractor_1.browser.waitForAngular();
        expect(page.accordion.filtersMenu.filterCount).toEqual(2);
    });
    it('does not affect other filters when a new filter is set', function () {
        page.accordion.filtersMenu.filters[1].type = 'ent5';
        protractor_1.browser.waitForAngular();
        expect(page.nodeList.entities.ent1.count).toEqual(2);
        expect(page.nodeList.entities.ent3.count).toEqual(4);
    });
    it('filters are additive', function () {
        expect(page.twigletGraph.nodeCount).toEqual(8);
        expect(page.nodeList.entities.ent5.count).toEqual(2);
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3R3aWcvZTJlL2pvdXJuZXlzL3R3aWdsZXQtZmlsdGVyaW5nLmUyZS1zcGVjLnRzIiwic291cmNlcyI6WyIvdHdpZy9lMmUvam91cm5leXMvdHdpZ2xldC1maWx0ZXJpbmcuZTJlLXNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5Q0FBcUM7QUFDckMsZ0RBQWlEO0FBQ2pELGtDQUlrQjtBQUVsQixRQUFRLENBQUMsb0JBQW9CLEVBQUU7SUFDN0IsSUFBSSxJQUFjLENBQUM7SUFFbkIsU0FBUyxDQUFDO1FBQ1IsSUFBSSxHQUFHLElBQUksaUJBQVEsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxtQkFBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hFLG9CQUFPLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDekIsd0NBQWdDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsb0JBQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQztRQUNQLHFFQUFxRTtRQUNyRSxnRUFBZ0U7UUFDaEUsTUFBTTtRQUNOLHdDQUFnQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLCtCQUErQixFQUFFO1FBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ3BELG9CQUFPLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw2Q0FBNkMsRUFBRTtRQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw4QkFBOEIsRUFBRTtRQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbEQsb0JBQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFDM0Qsb0JBQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMEJBQTBCLEVBQUU7UUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdkMsb0JBQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHdEQUF3RCxFQUFFO1FBQzNELElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ3BELG9CQUFPLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckQsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsc0JBQXNCLEVBQUU7UUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBicm93c2VyIH0gZnJvbSAncHJvdHJhY3Rvcic7XG5pbXBvcnQgeyBUd2lnUGFnZSB9IGZyb20gJy4uL1BhZ2VPYmplY3RzL2FwcC5wbyc7XG5pbXBvcnQge1xuICBjcmVhdGVEZWZhdWx0SnNvbkltcG9ydGVkVHdpZ2xldCxcbiAgZGVsZXRlRGVmYXVsdEpzb25JbXBvcnRlZFR3aWdsZXQsXG4gIHR3aWdsZXROYW1lXG59IGZyb20gJy4uL3V0aWxzJztcblxuZGVzY3JpYmUoJ0ZpbHRlcmluZyBUd2lnbGV0cycsICgpID0+IHtcbiAgbGV0IHBhZ2U6IFR3aWdQYWdlO1xuXG4gIGJlZm9yZUFsbCgoKSA9PiB7XG4gICAgcGFnZSA9IG5ldyBUd2lnUGFnZSgpO1xuICAgIHBhZ2UubmF2aWdhdGVUbygpO1xuICAgIHBhZ2UuaGVhZGVyLnR3aWdsZXRUYWIuZGVsZXRlVHdpZ2xldElmTmVlZGVkKHR3aWdsZXROYW1lLCBwYWdlKTtcbiAgICBicm93c2VyLndhaXRGb3JBbmd1bGFyKCk7XG4gICAgY3JlYXRlRGVmYXVsdEpzb25JbXBvcnRlZFR3aWdsZXQocGFnZSk7XG4gICAgYnJvd3Nlci53YWl0Rm9yQW5ndWxhcigpO1xuICB9KTtcblxuICBhZnRlckFsbCgoKSA9PiB7XG4gICAgLy8gYnJvd3Nlci5tYW5hZ2UoKS5sb2dzKCkuZ2V0KCdicm93c2VyJykudGhlbihmdW5jdGlvbihicm93c2VyTG9nKSB7XG4gICAgLy8gICBjb25zb2xlLmxvZygnbG9nOiAnICsgcmVxdWlyZSgndXRpbCcpLmluc3BlY3QoYnJvd3NlckxvZykpO1xuICAgIC8vIH0pO1xuICAgIGRlbGV0ZURlZmF1bHRKc29uSW1wb3J0ZWRUd2lnbGV0KHBhZ2UpO1xuICB9KTtcblxuICBpdCgnY2FuIGZpbHRlciBvdXQgYSBzZXQgb2Ygbm9kZXMnLCAoKSA9PiB7XG4gICAgcGFnZS5hY2NvcmRpb24uZmlsdGVyc01lbnUuZmlsdGVyc1swXS50eXBlID0gJ2VudDEnO1xuICAgIGJyb3dzZXIud2FpdEZvckFuZ3VsYXIoKTtcbiAgICBleHBlY3QocGFnZS50d2lnbGV0R3JhcGgubm9kZUNvdW50KS50b0VxdWFsKDIpO1xuICAgIGV4cGVjdChwYWdlLnR3aWdsZXRHcmFwaC5saW5rQ291bnQpLnRvRXF1YWwoMCk7XG4gIH0pO1xuXG4gIGl0KCdhZmZlY3RzIHRoZSBzaWRlIGJ5IHdoZW4gbm9kZXMgYXJlIGZpbHRlcmVkJywgKCkgPT4ge1xuICAgIGV4cGVjdChwYWdlLm5vZGVMaXN0LmVudGl0aWVzLmVudDEuY291bnQpLnRvRXF1YWwoMik7XG4gICAgZXhwZWN0KHBhZ2Uubm9kZUxpc3QuZW50aXRpZXMuZW50My5jb3VudCkudG9FcXVhbCgwKTtcbiAgfSk7XG5cbiAgaXQoJ2NhbiBhZGQgYSB0YXJnZXQgdG8gYSBmaWx0ZXInLCAoKSA9PiB7XG4gICAgcGFnZS5hY2NvcmRpb24uZmlsdGVyc01lbnUuZmlsdGVyc1swXS5hZGRUYXJnZXQoKTtcbiAgICBicm93c2VyLndhaXRGb3JBbmd1bGFyKCk7XG4gICAgcGFnZS5hY2NvcmRpb24uZmlsdGVyc01lbnUuZmlsdGVyc1swXS50YXJnZXQudHlwZSA9ICdlbnQzJztcbiAgICBicm93c2VyLndhaXRGb3JBbmd1bGFyKCk7XG4gICAgZXhwZWN0KHBhZ2UudHdpZ2xldEdyYXBoLm5vZGVDb3VudCkudG9FcXVhbCg2KTtcbiAgICBleHBlY3QocGFnZS5ub2RlTGlzdC5lbnRpdGllcy5lbnQzLmNvdW50KS50b0VxdWFsKDQpO1xuICB9KTtcblxuICBpdCgnY2FuIGFkZCBtdWx0aXBsZSBmaWx0ZXJzJywgKCkgPT4ge1xuICAgIHBhZ2UuYWNjb3JkaW9uLmZpbHRlcnNNZW51LmFkZEZpbHRlcigpO1xuICAgIGJyb3dzZXIud2FpdEZvckFuZ3VsYXIoKTtcbiAgICBleHBlY3QocGFnZS5hY2NvcmRpb24uZmlsdGVyc01lbnUuZmlsdGVyQ291bnQpLnRvRXF1YWwoMik7XG4gIH0pO1xuXG4gIGl0KCdkb2VzIG5vdCBhZmZlY3Qgb3RoZXIgZmlsdGVycyB3aGVuIGEgbmV3IGZpbHRlciBpcyBzZXQnLCAoKSA9PiB7XG4gICAgcGFnZS5hY2NvcmRpb24uZmlsdGVyc01lbnUuZmlsdGVyc1sxXS50eXBlID0gJ2VudDUnO1xuICAgIGJyb3dzZXIud2FpdEZvckFuZ3VsYXIoKTtcbiAgICBleHBlY3QocGFnZS5ub2RlTGlzdC5lbnRpdGllcy5lbnQxLmNvdW50KS50b0VxdWFsKDIpO1xuICAgIGV4cGVjdChwYWdlLm5vZGVMaXN0LmVudGl0aWVzLmVudDMuY291bnQpLnRvRXF1YWwoNCk7XG4gIH0pO1xuXG4gIGl0KCdmaWx0ZXJzIGFyZSBhZGRpdGl2ZScsICgpID0+IHtcbiAgICBleHBlY3QocGFnZS50d2lnbGV0R3JhcGgubm9kZUNvdW50KS50b0VxdWFsKDgpO1xuICAgIGV4cGVjdChwYWdlLm5vZGVMaXN0LmVudGl0aWVzLmVudDUuY291bnQpLnRvRXF1YWwoMik7XG4gIH0pO1xufSk7XG4iXX0=