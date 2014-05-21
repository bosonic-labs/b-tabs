var mouse = effroi.mouse;

function createTabsList(wrapper, selected) {
    var btabsMarkup = selected ? '<b-tabs selected="'+selected+'">' : '<b-tabs>';
    wrapper.innerHTML = btabsMarkup+'<ul><li>tab1</li><li>tab2</li><li>tab3</li></ul><div class="content-wrapper"><div>content 1</div><div>content 2</div><div>content 3</div></div></b-tabs>';
    document.body.appendChild(wrapper);
    return document.querySelector('b-tabs');
}

describe("b-tabs", function() {

    beforeEach(function(done) {
        appendComponentToBody.call(this, done);
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

        it("should display the first content", function() {
            expect(contentIsVisible(this.tabs, 0)).to.be.true;
        });

        it("should hide all content expect the first one", function() {
            expect(contentIsHidden(this.tabs, 1)).to.be.true;
            expect(contentIsHidden(this.tabs, 2)).to.be.true;
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
            this.tabs = createTabsList(wrapper);

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
            this.tabs = createTabsList(wrapper);

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
            appendComponentToBody.call(this , function() {
                // Then
                expect(contentIsVisible(this.tabs, 1)).to.be.true;
                done();
            }.bind(this), 1);
        });

        it("should hide all tabs expect the selected one", function(done) {
            // Given
            removeComponentFromBody.call(this);

            // When
            appendComponentToBody.call(this, function() {
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
            mouse.click(this.tabs.querySelectorAll('li')[1]);

            // Then
            expect(tabIsVisible(this.tabs, 1)).to.be.true;
        });

        it("should hide the first and third tabs", function() {
            // When
            mouse.click(this.tabs.querySelectorAll('li')[1]);

            // Then
            expect(tabIsHidden(this.tabs, 0)).to.be.true;
            expect(tabIsHidden(this.tabs, 2)).to.be.true;
        });

        it("should display the second content", function() {
            // When
            mouse.click(this.tabs.querySelectorAll('li')[1]);

            // Then
            expect(contentIsVisible(this.tabs, 1)).to.be.true;
        });

        it("should hide the first and second content", function() {
            // When
            mouse.click(this.tabs.querySelectorAll('li')[1]);

            // Then
            expect(contentIsHidden(this.tabs, 0)).to.be.true;
            expect(contentIsHidden(this.tabs, 2)).to.be.true;
        });

        it("should fire a 'b-tabs-willChange' event before the change", function(done) {

            // Then
            this.wrapper.addEventListener('b-tabs-willChange', function() {
                // Before the change, the first tab is still displayed
                expect(tabIsVisible(this.tabs, 0)).to.be.true;
                done();
            }.bind(this));

            // When
            mouse.click(this.tabs.querySelectorAll('li')[1]);
        });

        it("should fire a 'b-tabs-hasChanged' event after the change", function(done) {

            // Then
            this.wrapper.addEventListener('b-tabs-hasChanged', function() {
                // After the change, the second tab is displayed
                expect(tabIsVisible(this.tabs, 1)).to.be.true;
                done();
            }.bind(this));

            // When
            mouse.click(this.tabs.querySelectorAll('li')[1]);
        });

        it("'b-tabs-willChange' event shall contains the target elements", function(done) {

            // Then
            this.wrapper.addEventListener('b-tabs-willChange', function(e) {
                expect(e.detail.tab).to.be.equal(getNthTab(this.tabs, 1));
                expect(e.detail.content).to.be.equal(getNthContent(this.tabs, 1));
                done();
            }.bind(this));

            // When
            mouse.click(this.tabs.querySelectorAll('li')[1]);
        });

        it("'b-tabs-hasChanged' event shall contains the target elements", function(done) {

            // Then
            this.wrapper.addEventListener('b-tabs-hasChanged', function(e) {
                expect(e.detail.tab).to.be.equal(getNthTab(this.tabs, 1));
                expect(e.detail.content).to.be.equal(getNthContent(this.tabs, 1));
                done();
            }.bind(this));

            // When
            mouse.click(this.tabs.querySelectorAll('li')[1]);
        });

    });

});

// ----- Helper functions ----- //

function appendComponentToBody(afterComponentAppendedCb, selected) {
    this.wrapper = document.createElement('div');
    this.wrapper.setAttribute('id', 'b-tabs-wrapper');
    this.tabs = createTabsList(this.wrapper, selected);
    // Let the bosonic's callback happens
    setTimeout(afterComponentAppendedCb, 100);
}

function removeComponentFromBody() {
    var wrapper = document.getElementById('b-tabs-wrapper');
    document.body.removeChild(wrapper);
    this.tabs = null;
}

function tabIsVisible(root, idx) {
    return !getNthTab(root, idx).classList.contains('b-tabs-hidden')
}

function tabIsHidden(root, idx) {
    return getNthTab(root, idx).classList.contains('b-tabs-hidden')
}

function getNthTab(root, idx) {
    return root.querySelectorAll('li')[idx];
}

function contentIsVisible(root, idx) {
    return !getNthContent(root, idx).classList.contains('b-tabs-hidden');
}

function contentIsHidden(root, idx) {
    return getNthContent(root, idx).classList.contains('b-tabs-hidden');
}

function getNthContent(root, idx) {
    return root.querySelector('.content-wrapper').querySelectorAll('div')[idx];
}