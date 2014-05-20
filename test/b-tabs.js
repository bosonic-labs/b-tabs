var mouse = effroi.mouse;

function createTabsList() {
    var wrapper = document.createElement('div');
    wrapper.setAttribute('id', 'b-tabs-wrapper');
    wrapper.innerHTML = '<b-tabs><ul><li>tab1</li><li>tab2</li><li>tab3</li></ul><div class="content-wrapper"><div>content 1</div><div>content 2</div><div>content 3</div></div></b-tabs>';
    document.body.appendChild(wrapper);
    return document.querySelector('b-tabs');
}

describe("b-tabs", function() {

    beforeEach(function(done) {
        this.tabs = createTabsList();
        setTimeout(function() { done();}, 100);
    });

    afterEach(function(done) {
        var wrapper = document.getElementById('b-tabs-wrapper');
        document.body.removeChild(wrapper);
        setTimeout(function() { done();}, 100);
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
    });

    describe("when clicking on the second tab", function() {

        beforeEach(function() {
            mouse.click(this.tabs.querySelectorAll('li')[1]);
        });

        it("should display the second tab", function() {
            expect(tabIsVisible(this.tabs, 1)).to.be.true;
        });

        it("should display the first and third tabs", function() {
            expect(tabIsHidden(this.tabs, 0)).to.be.true;
            expect(tabIsHidden(this.tabs, 2)).to.be.true;
        });

        it("should display the second content", function() {
            expect(contentIsVisible(this.tabs, 1)).to.be.true;
        });

        it("should hide first and second content", function() {
            expect(contentIsHidden(this.tabs, 0)).to.be.true;
            expect(contentIsHidden(this.tabs, 2)).to.be.true;
        });

    });

});

// ----- Helper functions ----- //

function tabIsVisible(tabs, idx) {
    var lis = tabs.querySelectorAll('li');
    return !lis[idx].classList.contains('b-tabs-hidden')
}

function tabIsHidden(tabs, idx) {
    var lis = tabs.querySelectorAll('li');
    return lis[idx].classList.contains('b-tabs-hidden')
}

function contentIsVisible(tabs, idx) {
    var divs = tabs.querySelector('.content-wrapper').querySelectorAll('div');
    return !divs[idx].classList.contains('b-tabs-hidden');
}

function contentIsHidden(tabs, idx) {
    var divs = tabs.querySelector('.content-wrapper').querySelectorAll('div');
    return divs[idx].classList.contains('b-tabs-hidden');
}