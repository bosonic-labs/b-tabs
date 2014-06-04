# &lt;b-tabs&gt;

A [Bosonic](http://bosonic.github.io) element for tabs and tab panels.

## Install

This element is available as a npm package, see the [Bosonic documentation](http://bosonic.github.io/documentation.html) for Bosonic transpiler usage.

```sh
$ npm install --save b-tabs
```

Otherwise, you can download and include in your HTML file the builded CSS & JS files, alongside with Bosonic polyfills, as described in the [Getting Started](http://bosonic.github.io/getting-started.html) guide.

## Usage

```<b-tabs>``` contains a list of tabs. Each tab has a ```for``` attribute targeting a DOM element by his ID.

If we want to add a tab without a target, we just have to ommit the ```for``` attribute. It could be usefull to create an action button.

The optional ```selected``` attribute on ```<b-tabs>```, starting at 0, indicates which tab is visible.

```html
<b-tabs selected="1">
    <span for="one">Tab 1</span>
    <span for="two">Tab 2</span>
    <span for="three">Tab 3</span>
    <span>+</span>
</b-tabs>

<div id="one">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, nobis, beatae facere voluptates esse cupiditate sit laboriosam veniam quis facilis laborum distinctio nam ex incidunt architecto molestias eligendi optio? Sunt?
</div>
<div id="two">
    Iste, reiciendis expedita officiis sequi suscipit neque ipsa! Architecto, repellendus, quam totam aliquid voluptates consequatur alias aspernatur temporibus amet dicta a modi optio nesciunt. Dicta, voluptatum in veniam consectetur vero.
</div>
<div id="three">
    Nisi, ipsum fuga nostrum alias quidem deleniti dignissimos provident veniam culpa optio! Soluta, consequatur, minus corporis dolor repellat non at aperiam error nesciunt reiciendis! Omnis vitae itaque quas nostrum molestiae.
</div>
```

It is possible to add a tab after inserting ```<b-tabs>``` in the DOM. However, the content element must be inserted before the tab.

### Events

 * _b-tabs-willChange_ event is fired when the current tab is going to change.
 * _b-tabs-hasChanged_ event is fired when the current tab has changed.
  
Both events contains a _detail_ property which contains target _tab_ and _content_ elements :

```js
document.querySelector('b-tabs').addEventListener('b-tabs-willChange', function(e) {
    console.log('tab: '+e.detail.tab);
    console.log('content: '+e.detail.content);
});

document.querySelector('b-tabs').addEventListener('b-tabs-hasChanged', function(e) {
    console.log('tab: '+e.detail.tab);
    console.log('content: '+e.detail.content);
});
```
