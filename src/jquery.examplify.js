/** @license examplify | MIT License | https://github.com/wmbenedetto/examplify#mit-license */
if (typeof MINIFIED === 'undefined'){
    MINIFIED = false;
}
/**
 *                                 _ _  __
 *   _____  ____ _ _ __ ___  _ __ | (_)/ _|_   _
 *  / _ \ \/ / _` | '_ ` _ \| '_ \| | | |_| | | |
 * |  __/>  < (_| | | | | | | |_) | | |  _| |_| |
 *  \___/_/\_\__,_|_| |_| |_| .__/|_|_|_|  \__, |
 *                          |_|            |___/
 *
 * examplify : Turn live JavaScript snippets into in-page code examples
 *
 * Copyright (c) 2012 Warren Benedetto <warren@transfusionmedia.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function($) {

    var cache               = {};

    /**
     * Constructs opening tag, adding attributes if needed
     *
     * @param options Object containing tag and attr object containing tag attributes
     * @return {String} Opening tag
     */
    var buildOpeningTag = function(options){

        var tag             = '<' + options.tag;

        if (typeof options.attr !== null && typeof options.attr === 'object'){
            for (var a in options.attr){
                if (options.attr.hasOwnProperty(a)){
                    tag    += ' ' + a + '=' + '"' + options.attr[a] + '"';
                }
            }
        }

        tag                += '>';

        return tag;
    };

    /**
     * First, it crawls the page source for script tags containing ids prefixed with
     * "examplify", such as id="examplify-1" or id="examplifySomeFooExample". (Custom
     * prefix can be configured in options object.)
     *
     * For each examplify script that is found, an html tag is inserted immediately
     * following the script tag, with the contents of the script tag inside it.
     *
     * Using the options object, you can fully configure the tag that is created:
     *
     * {
     *     tag          : 'code',           // The HTML tag into which you want your example to be inserted. Defaults to 'pre'
     *     scope        : 'body',           // Selector for tag inside which the examplify script tags will be found. Defaults to 'body'
     *     prefix       : 'foobar',         // The prefix used in the id of each examplify example script. Defaults to 'examplify'
     *     attr : {
     *         class    : 'prettyprint'     // Object containing key-value pairs which will be added as attributes to the example tag
     *     },
     *     onEach : function(){             // Optional function to call each time example tag has been inserted
     *         console.log('tag inserted');
     *     },
     *     onComplete : function(){         // Optional function to call once all example tags have been inserted
     *         console.log('done!');
     *     }
     * }
     *
     * @param options Object containing config options
     */
    $.examplify = function(options) {

        options             = options               || {};
        options.tag         = options.tag           || 'pre';
        options.attr        = options.attr          || null;
        options.scope       = options.scope         || 'body';
        options.prefix      = options.prefix        || 'examplify';
        options.onEach      = options.onEach        || null;
        options.onComplete  = options.onComplete    || null;

        var scripts         = $(options.scope + ' script');
        var totalScripts    = scripts.length;
        var counter         = 0;

        scripts.each(function(){

            counter        += 1;
            var $this       = $(this);
            var id          = $this.attr('id');

            if (!(id in cache)){

                cache[id]   = true;

                if (typeof id === 'string' && id.indexOf(options.prefix) > -1 && typeof options.tag !== null){
                    $this.after(buildOpeningTag(options) + $this.html() + '</'+options.tag+'>');
                }

                if (typeof options.onEach === 'function'){
                    options.onEach(counter);
                }

                if (counter === totalScripts && typeof options.onComplete === 'function'){
                    options.onComplete();
                }
            }
        });

        return this;
    };

})(jQuery);