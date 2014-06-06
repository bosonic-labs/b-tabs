var mouse = effroi.mouse;

describe("b-tabs", function() {

    beforeEach(function(done) {
        appendComponentToBody.call(this, createBasicTabsList, done);
    });

    afterEach(function() {
        removeComponentFromBody.call(this);
    });

    describe("at startup", function() {

        it("should display the first tab", function() {
            expect(tabIsVisible(this.tabs, 0)).to.be.true;
        });

        it("should hide all tabs expect the first one", function() {
            expect(tabIsHidden(this.tabs, 1)).to.be.true;
            expect(tabIsHidden(this.tabs, 2)).to.be.true;
        });

        it("should display the content targeted by the first tab", function() {
            expect(contentIsVisible("#one")).to.be.true;
        });

        it("should hide all contents not targeted by the first tab", function() {
            expect(contentIsHidden("#two")).to.be.true;
            expect(contentIsHidden("#three")).to.be.true;
        });

        it("should not fire the b-tabs-willChange event", function(done) {

            // Given
            removeComponentFromBody.call(this);

            var eventHasBeenFired = false;

            var wrapper = document.createElement('div');
            wrapper.setAttribute('id', 'b-tabs-wrapper');
            wrapper.addEventListener('b-tabs-willChange', function() {
                eventHasBeenFired = true;
            });

            // When
            this.tabs = createBasicTabsList(wrapper);

            // Then
            setTimeout(function() {
                expect(eventHasBeenFired).to.be.false;
                done();
            }, 1000);
        });

        it("should not fire the b-tabs-hasChanged event", function(done) {

            // Given
            removeComponentFromBody.call(this);

            var eventHasBeenFired = false;

            var wrapper = document.createElement('div');
            wrapper.setAttribute('id', 'b-tabs-wrapper');
            wrapper.addEventListener('b-tabs-hasChanged', function() {
                eventHasBeenFired = true;
            });

            // When
            this.tabs = createBasicTabsList(wrapper);

            // Then
            setTimeout(function() {
                expect(eventHasBeenFired).to.be.false;
                done();
            }, 1000);
        });

        it("should display the selected tab if option is present", function(done) {
            // Given
            removeComponentFromBody.call(this);

            // When
            appendComponentToBody.call(this, createBasicTabsList, function() {
                // Then
                expect(contentIsVisible("#two")).to.be.true;
                done();
            }.bind(this), 1);
        });

        it("should hide all tabs expect the selected one", function(done) {
            // Given
            removeComponentFromBody.call(this);

            // When
            appendComponentToBody.call(this, createBasicTabsList, function() {
                // Then
                expect(tabIsHidden(this.tabs, 0)).to.be.true;
                expect(tabIsHidden(this.tabs, 2)).to.be.true;
                done();
            }.bind(this), 1);
        });
    });

    describe("when clicking on the second tab", function() {

        it("should display the second tab", function() {
            // When
            mouse.click(this.tabs.childNodes[1]);

            // Then
            expect(tabIsVisible(this.tabs, 1)).to.be.true;
        });

        it("should hide the first and third tabs", function() {
            // When
            mouse.click(this.tabs.childNodes[1]);

            // Then
            expect(tabIsHidden(this.tabs, 0)).to.be.true;
            expect(tabIsHidden(this.tabs, 2)).to.be.true;
        });

        it("should display content targeted by the second tab", function() {
            // When
            mouse.click(this.tabs.childNodes[1]);

            // Then
            expect(contentIsVisible("#two")).to.be.true;
        });

        it("should hide all contents not targeted by the second tab", function() {
            // When
            mouse.click(this.tabs.childNodes[1]);

            // Then
            expect(contentIsHidden("#one")).to.be.true;
            expect(contentIsHidden("#three")).to.be.true;
        });

        it("should fire a 'b-tabs-willChange' event before the change", function(done) {

            // Then
            this.wrapper.addEventListener('b-tabs-willChange', function() {
                // Before the change, the first tab is still displayed
                expect(tabIsVisible(this.tabs, 0)).to.be.true;
                done();
            }.bind(this));

            // When
            mouse.click(this.tabs.childNodes[1]);
        });

        it("should fire a 'b-tabs-hasChanged' event after the change", function(done) {

            // Then
            this.wrapper.addEventListener('b-tabs-hasChanged', function() {
                // After the change, the second tab is displayed
                expect(tabIsVisible(this.tabs, 1)).to.be.true;
                done();
            }.bind(this));

            // When
            mouse.click(this.tabs.childNodes[1]);
        });

        it("'b-tabs-willChange' event shall contains the target elements", function(done) {

            // Then
            this.wrapper.addEventListener('b-tabs-willChange', function(e) {
                expect(e.detail.tab).to.be.equal(getNthDataTargetTab(this.tabs, 1));
                expect(e.detail.content).to.be.equal(document.querySelector('#two'));
                done();
            }.bind(this));

            // When
            mouse.click(this.tabs.childNodes[1]);
        });

        it("'b-tabs-hasChanged' event shall contains the target elements", function(done) {

            // Then
            this.wrapper.addEventListener('b-tabs-hasChanged', function(e) {
                expect(e.detail.tab).to.be.equal(getNthDataTargetTab(this.tabs, 1));
                expect(e.detail.content).to.be.equal(document.querySelector('#two'));
                done();
            }.bind(this));

            // When
            mouse.click(this.tabs.childNodes[1]);
        });

    });


    describe("when clicking the selected tab", function() {

        it("should not fire a 'b-tabs-willChange'", function(done) {

            var eventFired = false;

            this.wrapper.addEventListener('b-tabs-willChange', function() {
                eventFired = true;
            }.bind(this));

            // When
            mouse.click(this.tabs.childNodes[0]);

            // Then
            setTimeout(function() {
                expect(eventFired).to.be.false;
                done();
            }, 100)
        });

        it("should not fire a 'b-tabs-hasChanged'", function(done) {

            var eventFired = false;

            this.wrapper.addEventListener('b-tabs-willChange', function() {
                eventFired = true;
            }.bind(this));

            // When
            mouse.click(this.tabs.childNodes[0]);

            // Then
            setTimeout(function() {
                expect(eventFired).to.be.false;
                done();
            }, 100)
        });

    });


    describe("when having a action tab", function() {

        beforeEach(function(done) {
            removeComponentFromBody.call(this);
            appendComponentToBody.call(this, createTabsListWithAction, done);
        });

        it("should display the first tab", function() {
            expect(tabIsVisible(this.tabs, 0)).to.be.true;
        });

        it("should not change the active tab when the action tab is clicked", function() {

            // When
            mouse.click(getNthActionTab(this.tabs, 0));

            // Then
            expect(tabIsVisible(this.tabs, 0)).to.be.true;
        });

    });

    describe("when having an action tab between li", function() {

        beforeEach(function(done) {
            removeComponentFromBody.call(this);
            appendComponentToBody.call(this, createTabsListWithActionBetweenLi, done);
        });

        it("should display the first tab", function() {
            expect(tabIsVisible(this.tabs, 0)).to.be.true;
        });

        it("should not change the active tab when the action tab is clicked", function() {

            // When
            mouse.click(getNthActionTab(this.tabs, 0));

            // Then
            expect(tabIsVisible(this.tabs, 0)).to.be.true;
        });

        it("should display the content targeted by the second for tab when it is clicked", function() {

            // When
            mouse.click(getNthDataTargetTab(this.tabs, 1));

            // Then
            expect(contentIsVisible("#two")).to.be.true;
        });

        it("should display the second for tab when clicked", function() {

            // When
            mouse.click(getNthDataTargetTab(this.tabs, 1));

            // Then
            expect(tabIsVisible(this.tabs, 1)).to.be.true;
        });

    });

    describe("When adding a tab to an existing b-tabs", function() {

        beforeEach(function(done) {
            var $span = document.createElement('span');
            $span.setAttribute('for', 'four');
            $span.innerHTML = 'tab4';
            this.tabs.appendChild($span);

            var $newDiv = document.createElement('div');
            $newDiv.setAttribute('id', 'four');
            $newDiv.innerHTML = 'content 4';
            document.body.appendChild($newDiv);
            setTimeout(done, 100);
        });

        it("should not select the new tab", function() {
            expect(tabIsHidden(this.tabs, 3)).to.be.true;
        });

        it("should hide the new content", function() {
            expect(contentIsHidden('#four')).to.be.true;
        });

        it("should select the new tab when clicked", function() {

            // When
            mouse.click(getNthDataTargetTab(this.tabs, 3));

            // Then
            expect(tabIsVisible(this.tabs, 3)).to.be.true;
            expect(contentIsVisible('#four')).to.be.true;
        });

    });

    describe("when changing the selected attribute, from '0' to '1'", function() {

        it("should display the second tab", function() {
            // When
            this.tabs.setAttribute('selected', 1);

            // Then
            expect(tabIsVisible(this.tabs, 1)).to.be.true;
        });

        it("should hide the first and third tabs", function() {
            // When
            this.tabs.setAttribute('selected', 1);

            // Then
            expect(tabIsHidden(this.tabs, 0)).to.be.true;
            expect(tabIsHidden(this.tabs, 2)).to.be.true;
        });

        it("should display content targeted by the second tab", function() {
            // When
            this.tabs.setAttribute('selected', 1);

            // Then
            expect(contentIsVisible("#two")).to.be.true;
        });

        it("should hide all contents not targeted by the second tab", function() {
            // When
            this.tabs.setAttribute('selected', 1);

            // Then
            expect(contentIsHidden("#one")).to.be.true;
            expect(contentIsHidden("#three")).to.be.true;
        });

        it("should fire a 'b-tabs-willChange' event before the change", function(done) {

            // Then
            this.wrapper.addEventListener('b-tabs-willChange', function() {
                // Before the change, the first tab is still displayed
                expect(tabIsVisible(this.tabs, 0)).to.be.true;
                done();
            }.bind(this));

            // When
            this.tabs.setAttribute('selected', 1);
        });

        it("should fire a 'b-tabs-hasChanged' event after the change", function(done) {

            // Then
            this.wrapper.addEventListener('b-tabs-hasChanged', function() {
                // After the change, the second tab is displayed
                expect(tabIsVisible(this.tabs, 1)).to.be.true;
                done();
            }.bind(this));

            // When
            this.tabs.setAttribute('selected', 1);
        });

        it("'b-tabs-willChange' event shall contains the target elements", function(done) {

            // Then
            this.wrapper.addEventListener('b-tabs-willChange', function(e) {
                expect(e.detail.tab).to.be.equal(getNthDataTargetTab(this.tabs, 1));
                expect(e.detail.content).to.be.equal(document.querySelector('#two'));
                done();
            }.bind(this));

            // When
            this.tabs.setAttribute('selected', 1);
        });

        it("'b-tabs-hasChanged' event shall contains the target elements", function(done) {

            // Then
            this.wrapper.addEventListener('b-tabs-hasChanged', function(e) {
                expect(e.detail.tab).to.be.equal(getNthDataTargetTab(this.tabs, 1));
                expect(e.detail.content).to.be.equal(document.querySelector('#two'));
                done();
            }.bind(this));

            // When
            this.tabs.setAttribute('selected', 1);
        });
    });
});

// ----- Helper functions ----- //


function createTabsList(wrapper, selected, tabsMarkup, contentMarkup) {
    var btabsMarkup = selected ? '<b-tabs selected="'+selected+'">' : '<b-tabs>';
    document.body.appendChild(wrapper);
    wrapper.innerHTML = btabsMarkup + tabsMarkup + '</b-tabs>' + contentMarkup;
    // TODO vraiment nécessaire de retourner un paramètre ?
    return wrapper.querySelector('b-tabs');
}

function createBasicTabsList(wrapper, selected) {
    var tabsMarkup = '<span for="one">tab1</span>' +
                     '<span for="two">tab2</span>' +
                     '<span for="three">tab3</span>';


    var contentMarkup = '<div id="one">content 1</div>' +
                        '<div id="two">content 2</div>' +
                        '<div id="three">content 3</div>';

    return createTabsList(wrapper, selected, tabsMarkup, contentMarkup);
}

function createTabsListWithAction(wrapper, selected) {
    var tabsMarkup = '<span for="one">tab1</span>' +
        '<span for="two">tab2</span>' +
        '<span class="action">Action</span>';

    var contentMarkup = '<div id="one">content 1</div>' +
        '<div id="two">content 2</div>';

    return createTabsList(wrapper, selected, tabsMarkup, contentMarkup);
}

function createTabsListWithActionBetweenLi(wrapper, selected) {
    var tabsMarkup = '<span for="one">tab1</span>' +
        '<span class="action">Action</span>' +
        '<span for="two">tab2</span>';


    var contentMarkup = '<div id="one">content 1</div>' +
        '<div id="two">content 2</div>';

    return createTabsList(wrapper, selected, tabsMarkup, contentMarkup);
}

function appendComponentToBody(tabsAppender, afterComponentAppendedCb, selected) {
    this.wrapper = document.createElement('div');
    this.wrapper.setAttribute('id', 'b-tabs-wrapper');
    this.tabs = tabsAppender(this.wrapper, selected);
    // Let the bosonic's callback happens
    setTimeout(afterComponentAppendedCb, 100);
}

function removeComponentFromBody() {
    var wrapper = document.getElementById('b-tabs-wrapper');
    document.body.removeChild(wrapper);
    this.tabs = null;
}

function tabIsVisible(root, idx) {
    var tab = getNthDataTargetTab(root, idx);
    return tab.classList.contains('b-tabs-visible');
}

function tabIsHidden(root, idx) {
    var tab = getNthDataTargetTab(root, idx);
    return !tab.classList.contains('b-tabs-visible');
}

function getNthDataTargetTab(root, idx) {
    return root.querySelectorAll('[for]')[idx];
}

function getNthActionTab(root, idx) {
    return root.querySelectorAll('.action')[idx];
}

function contentIsVisible(selector) {
    return !document.querySelector(selector).classList.contains('b-tabs-hidden');
}

function contentIsHidden( selector) {
    return document.querySelector(selector).classList.contains('b-tabs-hidden');
}