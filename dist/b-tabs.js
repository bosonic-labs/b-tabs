(function () {
    var BTabsPrototype = Object.create(HTMLElement.prototype, {
            selectedIndex: {
                enumerable: true,
                get: function () {
                    return this.getAttribute('selected') || 0;
                }
            },
            createdCallback: {
                enumerable: true,
                value: function () {
                    this.appendChild(this.template.content.cloneNode(true));
                    this.tabsNavigation = this.querySelector('ul');
                    this.tabsContainer = this.querySelector('div');
                    this.initClasses();
                    this.initContainer();
                    this.addListeners();
                }
            },
            detachedCallback: {
                enumerable: true,
                value: function () {
                    this.removeListeners();
                }
            },
            initClasses: {
                enumerable: true,
                value: function () {
                    if (this.tabsNavigation) {
                        this.tabsNavigation.classList.add('b-tabs-navigation');
                    }
                    if (this.tabsContainer) {
                        this.tabsContainer.classList.add('b-tabs-container');
                    }
                }
            },
            initContainer: {
                enumerable: true,
                value: function () {
                    if (this.tabsContainer) {
                        var allLis = this.tabsNavigation.querySelectorAll('li[data-target]');
                        Array.prototype.forEach.call(allLis, function (li) {
                            this.hideElement(li);
                        }.bind(this));
                        this.displayTab(allLis[this.selectedIndex]);
                    }
                }
            },
            addListeners: {
                enumerable: true,
                value: function () {
                    if (this.tabsNavigation) {
                        this.displayListener = this.display.bind(this);
                        this.tabsNavigation.addEventListener('click', this.displayListener);
                    }
                }
            },
            removeListeners: {
                enumerable: true,
                value: function () {
                    if (this.tabsNavigation && this.displayListener) {
                        this.tabsNavigation.removeEventListener('click', this.displayListener);
                        this.displayListener = null;
                    }
                }
            },
            display: {
                enumerable: true,
                value: function (e) {
                    var li = this.findLi(e.target);
                    if (li) {
                        var contentToDisplay = this.querySelector(li.getAttribute('data-target'));
                        var CustomEventInit = {
                                bubbles: true,
                                detail: {
                                    tab: li,
                                    content: contentToDisplay
                                }
                            };
                        this.dispatchEvent(new CustomEvent('b-tabs-willChange', CustomEventInit));
                        this.displayTab(li);
                        this.dispatchEvent(new CustomEvent('b-tabs-hasChanged', CustomEventInit));
                    }
                }
            },
            displayTab: {
                enumerable: true,
                value: function (li) {
                    this.hideElement(this.displayedLi);
                    this.displayedLi = li;
                    this.displayCurrentContent();
                    this.displayCurrentTab();
                }
            },
            displayCurrentContent: {
                enumerable: true,
                value: function () {
                    var contentToDisplay = this.querySelector(this.displayedLi.getAttribute('data-target'));
                    contentToDisplay.classList.remove('b-tabs-hidden');
                }
            },
            displayCurrentTab: {
                enumerable: true,
                value: function () {
                    this.displayedLi.classList.remove('b-tabs-hidden');
                    this.displayedLi.classList.add('b-tabs-visible');
                }
            },
            hideElement: {
                enumerable: true,
                value: function (li) {
                    if (li) {
                        this.hideContent(li);
                        this.hideTab(li);
                    }
                }
            },
            hideContent: {
                enumerable: true,
                value: function (li) {
                    var elementToHide = this.querySelector(li.getAttribute('data-target'));
                    elementToHide.classList.add('b-tabs-hidden');
                }
            },
            hideTab: {
                enumerable: true,
                value: function (li) {
                    li.classList.add('b-tabs-hidden');
                    li.classList.remove('b-tabs-visible');
                }
            },
            findLi: {
                enumerable: true,
                value: function (target) {
                    var currentNode = target;
                    var li = null;
                    while (currentNode.tagName !== 'B-TABS' && li === null) {
                        if (currentNode.tagName === 'LI' && currentNode.getAttribute('data-target'))
                            li = currentNode;
                        currentNode = currentNode.parentNode;
                    }
                    return li;
                }
            }
        });
    window.BTabs = document.registerElement('b-tabs', { prototype: BTabsPrototype });
    Object.defineProperty(BTabsPrototype, 'template', {
        get: function () {
            var fragment = document.createDocumentFragment();
            var div = fragment.appendChild(document.createElement('div'));
            div.innerHTML = ' ';
            while (child = div.firstChild) {
                fragment.insertBefore(child, div);
            }
            fragment.removeChild(div);
            return { content: fragment };
        }
    });
}());