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
                    this.init();
                    this.addListeners();
                }
            },
            childListChangedCallback: {
                enumerable: true,
                value: function (removedNodes, addedNodes) {
                    if (addedNodes) {
                        Array.prototype.filter.call(addedNodes, this.nodeIsATab).forEach(this.hideElement.bind(this));
                    }
                }
            },
            attributeChangedCallback: {
                enumerable: true,
                value: function (name) {
                    if (name === 'selected') {
                        this.displayTabAndFireEvents(this.getAllTabs()[this.selectedIndex]);
                    }
                }
            },
            detachedCallback: {
                enumerable: true,
                value: function () {
                    this.removeListeners();
                }
            },
            init: {
                enumerable: true,
                value: function () {
                    var allTabs = this.getAllTabs();
                    Array.prototype.forEach.call(allTabs, function (tab) {
                        this.hideElement(tab);
                    }.bind(this));
                    this.displayTab(allTabs[this.selectedIndex]);
                }
            },
            addListeners: {
                enumerable: true,
                value: function () {
                    this.displayListener = this.display.bind(this);
                    this.addEventListener('click', this.displayListener);
                }
            },
            removeListeners: {
                enumerable: true,
                value: function () {
                    if (this.displayListener) {
                        this.removeEventListener('click', this.displayListener);
                        this.displayListener = null;
                    }
                }
            },
            display: {
                enumerable: true,
                value: function (e) {
                    var tab = this.findTab(e.target);
                    this.displayTabAndFireEvents(tab);
                }
            },
            displayTabAndFireEvents: {
                enumerable: true,
                value: function (tab) {
                    if (tab && tab !== this.displayedTab) {
                        var contentToDisplay = document.getElementById(tab.getAttribute('for'));
                        var CustomEventInit = {
                                bubbles: true,
                                detail: {
                                    tab: tab,
                                    content: contentToDisplay
                                }
                            };
                        this.dispatchEvent(new CustomEvent('b-tabs-willChange', CustomEventInit));
                        this.displayTab(tab);
                        this.dispatchEvent(new CustomEvent('b-tabs-hasChanged', CustomEventInit));
                    }
                }
            },
            displayTab: {
                enumerable: true,
                value: function (tab) {
                    this.hideElement(this.displayedTab);
                    this.displayedTab = tab;
                    this.displayCurrentContent();
                    this.displayCurrentTab();
                }
            },
            displayCurrentContent: {
                enumerable: true,
                value: function () {
                    var contentToDisplay = document.getElementById(this.displayedTab.getAttribute('for'));
                    contentToDisplay.classList.remove('b-tabs-hidden');
                }
            },
            displayCurrentTab: {
                enumerable: true,
                value: function () {
                    this.displayedTab.classList.add('b-tabs-visible');
                }
            },
            hideElement: {
                enumerable: true,
                value: function (tab) {
                    if (tab) {
                        this.hideContent(tab);
                        this.hideTab(tab);
                    }
                }
            },
            hideContent: {
                enumerable: true,
                value: function (tab) {
                    var elementToHide = document.getElementById(tab.getAttribute('for'));
                    elementToHide.classList.add('b-tabs-hidden');
                }
            },
            hideTab: {
                enumerable: true,
                value: function (tab) {
                    tab.classList.remove('b-tabs-visible');
                }
            },
            findTab: {
                enumerable: true,
                value: function (target) {
                    var currentNode = target;
                    var tab = null;
                    while (tab === null && currentNode !== document.body) {
                        if (this.nodeIsATab(currentNode)) {
                            tab = currentNode;
                        } else {
                            currentNode = currentNode.parentNode;
                        }
                    }
                    return tab;
                }
            },
            nodeIsATab: {
                enumerable: true,
                value: function (node) {
                    return node.hasAttribute && node.hasAttribute('for');
                }
            },
            getAllTabs: {
                enumerable: true,
                value: function () {
                    return this.querySelectorAll('[for]');
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