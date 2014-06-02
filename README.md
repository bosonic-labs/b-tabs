# &lt;b-tabs&gt;

A [Bosonic](http://bosonic.github.io) element for tabs and tab panels.

## Install

This element is available as a npm package, see the [Bosonic documentation](http://bosonic.github.io/documentation.html) for Bosonic transpiler usage.

```sh
$ npm install --save b-tabs
```

Otherwise, you can download and include in your HTML file the builded CSS & JS files, alongside with Bosonic polyfills, as described in the [Getting Started](http://bosonic.github.io/getting-started.html) guide.

## Usage

The first child of `<b-tabs>` must be an unordered list that will become the *tabs*.

The second child must be an element with a children for each tab, they will become the *contents*.

The ```data-target``` is a selector to the content div linked from a given tab. If missing, the tab won't be (linked to any content (could be use for an action button for example).

The optional ```selected``` attribute indicates which tab is visible.

```html
<b-tabs selected="1">
    <ul>
        <li data-target="#one">Tab 1</li>
        <li data-target="#two">Tab 2</li>
        <li data-target="#three">Tab 3</li>
        <li>+</li>
    </ul>

    <div>
        <div id="one">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, nobis, beatae facere voluptates esse cupiditate sit laboriosam veniam quis facilis laborum distinctio nam ex incidunt architecto molestias eligendi optio? Sunt?
        </div>
        <div id="two">
            Iste, reiciendis expedita officiis sequi suscipit neque ipsa! Architecto, repellendus, quam totam aliquid voluptates consequatur alias aspernatur temporibus amet dicta a modi optio nesciunt. Dicta, voluptatum in veniam consectetur vero.
        </div>
        <div id="three">
            Nisi, ipsum fuga nostrum alias quidem deleniti dignissimos provident veniam culpa optio! Soluta, consequatur, minus corporis dolor repellat non at aperiam error nesciunt reiciendis! Omnis vitae itaque quas nostrum molestiae.
        </div>
    </div>
</b-tabs>
```

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
