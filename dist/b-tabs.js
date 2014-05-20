(function () {
    var BTabsPrototype = Object.create(HTMLElement.prototype, {
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
                        for (var i = 0; i < this.tabsContainer.children.length; i++) {
                            this.hideElement(i);
                        }
                        this.displayTabAt(0);
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
                        var toDisplayIdx = Array.prototype.indexOf.call(this.tabsNavigation.children, li);
                        this.displayTabAt(toDisplayIdx);
                    }
                }
            },
            displayTabAt: {
                enumerable: true,
                value: function (idx) {
                    this.hideElement(this.displayedElementIdx);
                    this.displayedElementIdx = idx;
                    this.displayCurrentContent();
                    this.displayCurrentTab();
                }
            },
            displayCurrentContent: {
                enumerable: true,
                value: function () {
                    if (this.displayedElementIdx < this.tabsContainer.children.length) {
                        var elementToDisplay = this.tabsContainer.children[this.displayedElementIdx];
                        elementToDisplay.classList.remove('b-tabs-hidden');
                    }
                }
            },
            displayCurrentTab: {
                enumerable: true,
                value: function () {
                    if (this.displayedElementIdx < this.tabsNavigation.children.length) {
                        var elementToDisplay = this.tabsNavigation.children[this.displayedElementIdx];
                        elementToDisplay.classList.remove('b-tabs-hidden');
                    }
                }
            },
            hideElement: {
                enumerable: true,
                value: function (idx) {
                    if (idx !== undefined) {
                        this.hideContent(idx);
                        this.hideTab(idx);
                    }
                }
            },
            hideContent: {
                enumerable: true,
                value: function (idx) {
                    var elementToHide = this.tabsContainer.children[idx];
                    elementToHide.classList.add('b-tabs-hidden');
                }
            },
            hideTab: {
                enumerable: true,
                value: function (idx) {
                    var elementToHide = this.tabsNavigation.children[idx];
                    elementToHide.classList.add('b-tabs-hidden');
                }
            },
            findLi: {
                enumerable: true,
                value: function (target) {
                    var currentNode = target;
                    var li = null;
                    while (currentNode.tagName !== 'B-TABS' && li === null) {
                        if (currentNode.tagName === 'LI')
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