examplify
=========

**examplify** is a jQuery plugin for turning live JavaScript scripts into working in-page code examples.

## Introduction 

If you've ever written about code, either in your blog, in your documentation, or in example pages for your project, you've run into situations where you wanted to display a working code example in the page.

Your first instinct may be to write the script, and then copy and paste it into a `pre` tag in the page for display.

However, after doing that a few times, you'll realize that you're now editing code in two places: once in your real code, and once in your example. 

(Either that, or you're forgetting to update your example, meaning it's out of sync with your working code and will confuse the hell out of your users when they cut-and-paste the example from your page and it doesn't work.)

**examplify** solves that problem.

## Getting started

Using examplify is easy.

First, include jQuery and examplify at the top of the page. Make sure jQuery is included first.

Then, write each of your code examples in separate `script` tags, preferably in the body of the page.

Give each `script` tag a unique id, prefixed with "examplify".

It doesn't matter what the id is, as long as it starts with the prefix, and it's unique. Could be "examplify-some-example-name" or "examplifySomeExampleName" or "examplify_someExampleName" or whatever convention you prefer.

Then, simply call `$.examplify()` inside `$(document).ready()`, and you're done. Whatever code is in your examplify `script` tags will be spit out into the page inside a `pre` tag immediately after the associated script.

```javascript
$(document).ready(function(){
    $.examplify();
});
```

## It's alive!

The best part about examplify is that all your code is live JavaScript, so it's fully executable as a code sample. 

To see it in action, clone this repo, then open examples/index.html in your browser.

## Advanced usage

**examplify** is highly configurable, so you can customize it to the needs of your site.

All customization is done via an `options` object passed to the `$.examplify()` function:

* `tag`: The HTML tag into which examplify will insert your code example. Defaults to `pre`. If you set this to `null`, no tag will be inserted.
* `attr`: Object containing key-value pairs which will be added as attributes to the HTML tag. Example use-case would be to apply a class and/or id to the example tag.
* `scope`: By default, examplify looks for `script` tags with an id prefixed by "examplify" in the body of the page. If you want to restrict the scope of the search to, say, a specific div inside which all the examplified scripts live, you would pass the jQuery selector for that div as the scope.
* `prefix`: The string with which all of your examplified script ids are prefixed. Defaults to "examplify".
* `onEach`: Function to call each time an example tag has been added to the page. It is passed two arguments: the current example's code, and its example number. If you passed `null` for the `tag` option, then you could use this function to insert the examples into the page yourself.
* `onComplete`: Function to call once all examples have been added to the page.

```javascript
$(document).ready(function(){

    $.examplify({

        // Create custom 'xmp' tag
        tag : 'xmp',

        // Add class="prettyprint lang-js" to xmp tag
        attr : {
            'class' : 'prettyprint lang-js'
        },

        // Only search for examplified scripts inside div with id="examples"
        scope   : '#examples',

        // Look for scripts with ids starting with "foobar"
        prefix  : 'foobar',

        // After each example is added to the page, call this function
        onEach : function(example,counter){
            console.log('Example rendered');
        },

        // Once all examples have been added to the page, call this function
        onComplete : function(){
            console.log('Example rendering complete');
        }
    });
});
```

## FAQ

#### I called `$.examplify()`, but my examples aren't showing in the page. What happened?
First, make sure that you're including jQuery and examplify at the *top* of the page, and that jQuery comes first.

Second, make sure your each example script has an id that begins with the prefix. The default prefix is "examplify". The script ids must be unique. For example, "examplify-1", "examplify-2", etc.

Finally, make sure you're calling `$.examplify()` inside `$(document).ready()`.

#### Does examplify work with included JavaScript files?

Nope. It only works with inline script tags. It's really only designed to display short code samples. If you have an included JavaScript file, chances are it's too long to be a singular example anyway.

#### What if I don't want the example to be inserted immediately after the `script` tag in the page? Can I tell examplify where to insert the tag?

No, but you can use examplify's `onEach()` function to do it yourself. 

First, pass `null` as the `tag` option. That will tell examplify not to insert the tag itself. 

Then, add an `onEach()` function that inserts the example into the page where you want it. The example code is passed as the first argument to `onEach()`. The second argument is the example number, which could be used to disambiguate examples in the page.

#### Do my scripts have to be inline in the body of the page? Can they be in the head instead?

Technically, yes. It's more work though, because you'll have to use a custom `onEach()` function to insert the examples into the page yourself. (If you don't do that, the examplified code will be inserted into the `head` tag.)

To pull examplified scripts from the head instead of the body, you'll need to set the `scope` option to "head." 

#### Is there any way to have multiple examples in a single script tag?

No. Each example must be in its own script tag with its own unique, prefixed id.

#### Does examplify do syntax highlighting?

No, that's outside the scope of this plugin. I highly recommend [Prettify] (http://code.google.com/p/google-code-prettify) for syntax highlighting.

If you do use Prettify, note that you'll need to call its `prettyPrint()` function in a custom `onComplete()` function added to the examplify options. That will run Prettify once all the examples are added to the page. If you follow the Prettify docs and call `prettyPrint()` in the body's onload attribute, your examplified scripts won't be highlighted.

## Questions? Bugs? Suggestions?

Please submit all bugs, questions, and suggestions via the [Issues](https://github.com/wmbenedetto/examplify/issues) section so everyone can benefit from the answer.

If you need to contact me directly, email warren@transfusionmedia.com.

## MIT License

Copyright (c) 2012 Warren Benedetto <warren@transfusionmedia.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
