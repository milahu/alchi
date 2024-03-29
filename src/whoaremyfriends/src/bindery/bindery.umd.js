// bindery.umd.js
// based on https://github.com/evnbr/bindery
// license MIT License, Copyright (c) 2017 Evan Brooks

// TODO incremental rendering in development mode
// https://github.com/evnbr/bindery/issues/129

//const enableRendering = (document.location.hash != '#norender');

//if (enableRendering) {
//}

/* bindery Bindery v2.3.6 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Bindery = factory());
}(this, (function () { 'use strict';

    const BINDERY_VERSION = 'v2.3.6';
    const BINDERY_CLASS_PREFIX = 'bindery-';


    function ___$insertStyle(css) {
      if (!css) {
        return;
      }
      if (typeof window === 'undefined') {
        return;
      }

      var style = document.createElement('style');

      style.setAttribute('type', 'text/css');
      style.innerHTML = css;
      document.head.appendChild(style);
      return css;
    }

    const classPrefix = BINDERY_CLASS_PREFIX;
    var SheetLayout;
    (function (SheetLayout) {
        SheetLayout["PAGES"] = "pages";
        SheetLayout["SPREADS"] = "spreads";
        SheetLayout["BOOKLET"] = "booklet";
    })(SheetLayout || (SheetLayout = {}));
    var SheetMarks;
    (function (SheetMarks) {
        SheetMarks[SheetMarks["NONE"] = 0] = "NONE";
        SheetMarks[SheetMarks["CROP"] = 1] = "CROP";
        SheetMarks[SheetMarks["BLEED"] = 2] = "BLEED";
        SheetMarks[SheetMarks["BOTH"] = 3] = "BOTH";
    })(SheetMarks || (SheetMarks = {}));
    var SheetSize;
    (function (SheetSize) {
        SheetSize["AUTO"] = "auto";
        SheetSize["AUTO_BLEED"] = "auto-bleed";
        SheetSize["AUTO_MARKS"] = "auto-marks";
        SheetSize["LETTER_PORTRAIT"] = "letter-portrait";
        SheetSize["LETTER_LANDSCAPE"] = "letter-landscape";
        SheetSize["A4_PORTRAIT"] = "a4-portrait";
        SheetSize["A4_LANDSCAPE"] = "a4-landscape";
        SheetSize["A5_PORTRAIT"] = "a5-portrait";
        SheetSize["A5_LANDSCAPE"] = "a5-landscape";
    })(SheetSize || (SheetSize = {}));
    var ViewerMode;
    (function (ViewerMode) {
        ViewerMode["FLIPBOOK"] = "flipbook";
        ViewerMode["PREVIEW"] = "preview";
        ViewerMode["PRINT"] = "print";
        ViewerMode["LINEAR"] = "linear";
    })(ViewerMode || (ViewerMode = {}));

    //
    const prefixer = (str) => {
        if (str[0] === '.') {
            return `.${classPrefix}${str.substr(1)}`;
        }
        return `${classPrefix}${str}`;
    };

    const classes = {
        showBleed: 'show-bleed',
        showCrop: 'show-crop',
        showBleedMarks: 'show-bleed-marks',
        isViewing: 'viewing',
        viewPreview: 'view-preview',
        viewPrint: 'view-print',
        viewFlip: 'view-flip',
        viewLinear: 'view-linear',
        inProgress: 'in-progress',
        leftPage: 'left',
        rightPage: 'right',
        isOverflowing: 'is-overflowing',
        printSheet: 'print-sheet',
        sheetSpread: 'print-sheet-spread',
        sheetLeft: 'print-sheet-left',
        sheetRight: 'print-sheet-right',
        toNext: 'continues',
        fromPrev: 'continuation',
    };
    Object.keys(classes).forEach(k => {
        const key = k;
        const val = classes[key];
        classes[key] = prefixer(val);
    });
    const allModeClasses = [
        classes.viewPreview,
        classes.viewPrint,
        classes.viewFlip,
        classes.viewLinear,
    ];
    const classForMode = (mode) => {
      console.log('classForMode') // milahu fixme
        switch (mode) {
            case ViewerMode.PREVIEW:
                return classes.viewPreview;
            case ViewerMode.PRINT:
                return classes.viewPrint;
            case ViewerMode.FLIPBOOK:
                return classes.viewFlip;
            case ViewerMode.LINEAR:
                return classes.viewLinear;
            default:
                throw Error(`Getting class for unknown mode: ${mode}`);
        }
    };

    const isElement = (node) => node.nodeType === Node.ELEMENT_NODE;
    const isFunc = (val) => typeof val === 'function';
    const isElementWrapper = (val) => (val === null || val === void 0 ? void 0 : val.element) && isElement(val.element);
    const h = (tagName, classNames, attrs, ...children) => {
        const el = document.createElement(tagName);
        if (classNames)
            el.className = classNames
                .split('.')
                .filter(txt => txt !== '')
                .map(prefixer)
                .join(' ');
        if (attrs)
            for (const k in attrs) {
                // @ts-ignore TODO replace with hyperscript anyways
                const v = attrs[k];
                // @ts-ignore TODO replace with hyperscript anyways
                if (isFunc(v))
                    el[k] = v;
                else
                    el.setAttribute(k, v);
            }
        if (children) {
            el.append(...children.map(item => {
                return isElementWrapper(item) ? item.element : item;
            }));
        }
        return el;
    };
    const div = (cls, ...children) => {
        return h('div', cls, {}, ...children);
    };
    const button = (cls, attrs, label) => {
        return h('button', cls, attrs, label);
    };
    const select = (cls, attrs, ...optionElements) => {
        return h('select', cls, attrs, ...optionElements);
    };
    const option = (attrs, label) => {
        return h('option', null, attrs, label);
    };

    const safeMeasure = (el, measureCallback) => {
        if (el.parentNode)
            return measureCallback();
        let measureArea = document.querySelector(prefixer('.measure-area'));
        if (!measureArea)
            measureArea = document.body.appendChild(div('.measure-area'));
        if (measureArea.firstElementChild !== el) {
            measureArea.innerHTML = '';
            measureArea.append(el);
        }
        const result = measureCallback();
        return result;
    };

    // Create stylesheet with id
    const addStylesheet = (id) => {
        const style = window.document.createElement('style');
        style.id = id;
        window.document.head.appendChild(style);
        return style;
    };
    // Fetch or create stylesheet with id
    const stylesheet = (id) => {
        var _a;
        return (_a = window.document.querySelector(`#${id}`)) !== null && _a !== void 0 ? _a : addStylesheet(id);
    };
    // Parse html from text
    const parseHTML = (text, selector) => {
        const wrapper = window.document.createElement('div');
        wrapper.innerHTML = text;
        return selector ? wrapper.querySelector(selector) : wrapper;
    };

    // https://github.com/moroshko/shallow-equal/blob/master/src/arrays.js
    const shallowEqual = (a, b) => {
        if (a === b)
            return true;
        if (!a || !b)
            return false;
        const len = a.length;
        if (b.length !== len) {
            return false;
        }
        for (let i = 0; i < len; i += 1) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    };

    const throttleFrame = () => {
        let wasCalled = false;
        let queued;
        const inner = (func) => {
            if (wasCalled) {
                queued = func;
                return;
            }
            wasCalled = true;
            func();
            requestAnimationFrame(() => {
                wasCalled = false;
                if (queued) {
                    const queuedFunc = queued;
                    queued = undefined;
                    inner(queuedFunc);
                }
            });
        };
        return inner;
    };
    const throttleTime = (ms) => {
        let wasCalled = false;
        let queued;
        const inner = (func) => {
            if (wasCalled) {
                queued = func;
                return;
            }
            wasCalled = true;
            func();
            setTimeout(() => {
                wasCalled = false;
                if (queued) {
                    const queuedFunc = queued;
                    queued = undefined;
                    inner(queuedFunc);
                }
            }, ms);
        };
        return inner;
    };

    const formatAsRanges = (pageNumbers) => {
        let str = '';
        let prevNum = pageNumbers[0];
        let isInARange = false;
        const addFirst = (num) => {
            str += `${num}`;
        };
        const continueRange = () => {
            isInARange = true;
        };
        const endRange = (endNum) => {
            isInARange = false;
            str += `–${endNum}`;
        };
        const addComma = (num) => {
            str += `, ${num}`;
        };
        const endAndAdd = (endNum, num) => {
            endRange(endNum);
            addComma(num);
        };
        const addLast = (num, isAdjacent) => {
            if (isAdjacent)
                endRange(num);
            else if (isInARange && !isAdjacent)
                endAndAdd(prevNum, num);
            else
                addComma(num);
        };
        pageNumbers.forEach((num, i) => {
            const isLast = i === pageNumbers.length - 1;
            const isAdjacent = num === prevNum + 1;
            if (i === 0)
                addFirst(num);
            else if (isLast)
                addLast(num, isAdjacent);
            else if (isAdjacent)
                continueRange();
            else if (isInARange && !isAdjacent)
                endAndAdd(prevNum, num);
            else
                addComma(num);
            prevNum = num;
        });
        return str;
    };

    const cssNumberRegEx = /^([+-]?[0-9]+(.?[0-9]+)?)(px|in|cm|mm|pt|pc)$/;
    const isLength = (str) => cssNumberRegEx.test(str);
    const parseLength = (str) => {
        if (!isLength(str))
            throw Error(`Cannot parse css length from "${str}"`);
        const matches = str.match(cssNumberRegEx);
        if (!matches) {
            throw Error(`Failed to parse css length from "${str}"`);
        }
        return {
            val: Number(matches[1]),
            unit: matches[3],
        };
    };

    var defaultPageSetup = {
        bleed: '12pt',
        size: { width: '4in', height: '6in' },
        margin: {
            inner: '24pt',
            outer: '24pt',
            bottom: '40pt',
            top: '48pt',
        },
    };

    const letter = Object.freeze({ width: '8.5in', height: '11in' });
    const a4 = Object.freeze({ width: '210mm', height: '297mm' });
    const a5 = Object.freeze({ width: '148mm', height: '210mm' }); // TODO 210mm or 209mm? maybe need 209mm to avoid extra pagebreaks
//    const a4 = Object.freeze({ width: '200mm', height: '287mm' });
    // Not a really reliable way to know this
    const supportsCustomPageSize = () => !!window.hasOwnProperty('chrome');
    class PageSetup {
        constructor(opts = {}, printOpts = {}) {
            var _a, _b, _c;
            this.size = (_a = opts.size) !== null && _a !== void 0 ? _a : defaultPageSetup.size;
            this.margin = (_b = opts.margin) !== null && _b !== void 0 ? _b : defaultPageSetup.margin;
            this.markLength = '12pt';
            this.paper = supportsCustomPageSize()
                ? printOpts.paper || SheetSize.AUTO
                : SheetSize.AUTO_MARKS;
            this.bleed = (_c = printOpts.bleed) !== null && _c !== void 0 ? _c : defaultPageSetup.bleed;
            this.printTwoUp =
                !!printOpts.layout && printOpts.layout !== SheetLayout.PAGES;
        }
        get displaySize() {
            const width = this.printTwoUp ? this.spreadSize.width : this.size.width;
            const height = this.size.height;
            const bleed = this.bleed;
            return { width, height, bleed };
        }
        get sheetSize() {
            const width = this.printTwoUp ? this.spreadSize.width : this.size.width;
            const height = this.size.height;
            const doubleBleed = `2 * ${this.bleed}`;
            const doubleMarks = `${doubleBleed} + 2 * ${this.markLength}`;
            const singleMarks = `${this.bleed} + ${this.markLength}`;
            switch (this.paper) {
                case SheetSize.AUTO:
                    return { width, height };
                case SheetSize.AUTO_BLEED:
                    return {
                        width: `calc(${width} + ${this.printTwoUp ? doubleBleed : this.bleed})`,
                        height: `calc(${height} + ${doubleBleed})`,
                    };
                case SheetSize.AUTO_MARKS:
                    return {
                        width: `calc(${width} + ${this.printTwoUp ? doubleMarks : singleMarks})`,
                        height: `calc(${height} + ${doubleMarks})`,
                    };
                case SheetSize.LETTER_LANDSCAPE:
                    return { width: letter.height, height: letter.width };
                case SheetSize.LETTER_PORTRAIT:
                    return letter;
                    case SheetSize.A4_PORTRAIT:
                    return a4;
                case SheetSize.A4_LANDSCAPE:
                    return { width: a4.height, height: a4.width };
                case SheetSize.A5_PORTRAIT:
                    return a5;
                case SheetSize.A5_LANDSCAPE:
                    return { width: a5.height, height: a5.width };
                default:
                    throw Error(`Can't get dimensions for unknown paper size: ${this.paper}`);
            }
        }
        get spreadSize() {
            const w = parseLength(this.size.width);
            console.log(`spreadSize.height = ${this.size.height}`)
            return {
                height: this.size.height,
                width: `${w.val * 2}${w.unit}`,
            };
        }
        updateStyleVars() {
            const page = this.size;
            const sheet = this.sheetSize;
            const cssVariables = {
                'spread-width': this.spreadSize.width,
                'page-width': page.width,
                'page-height': page.height,
                'sheet-width': sheet.width,
                'sheet-height': sheet.height,
                'margin-inner': this.margin.inner,
                'margin-outer': this.margin.outer,
                'margin-top': this.margin.top,
                'margin-bottom': this.margin.bottom,
                bleed: this.bleed,
                'mark-length': this.markLength,
            };
            const cssStr = Object.entries(cssVariables)
                .map(([k, v]) => {
                return `--bindery-${k}: ${v};`;
            })
                .join('');
            const rootRule = `:root { ${cssStr} }`;
            const pageRule = `@page { size: ${sheet.width} ${sheet.height}; }`;
            stylesheet('binderyPage').innerHTML = `${rootRule} ${pageRule}`;
        }
    }

    class Rule {
        constructor(options) {
            var _a;
            this.name = (_a = options === null || options === void 0 ? void 0 : options.name) !== null && _a !== void 0 ? _a : 'Unnamed Bindery Rule';
            this.selector = '';
            Object.keys(options).forEach(key => {
                this[key] = options[key];
            });
        }
        setup() { }
    }

    const validateRuntimeOptions = (opts, validOpts) => {
        if (!validOpts)
            throw Error('Valid options not specified');
        Object.keys(opts).forEach(k => {
            var _a;
            if (!validOpts[k]) {
                const setName = (_a = validOpts.name) !== null && _a !== void 0 ? _a : 'This option';
                throw Error(`Unknown option in ${setName}: '${k}'`);
            }
            const val = opts[k];
            const type = validOpts[k];
            if (!type.check(val)) {
                const optName = validOpts.name ? `${validOpts.name}.${k}` : k;
                const valName = JSON.stringify(val);
                throw Error(`Invalid value for '${optName}': ${valName} is not a ${type.name}.`);
            }
        });
        return true;
    };

    const isObj = (val) => typeof val === 'object';
    const isFunc$1 = (val) => typeof val === 'function';
    const isBool = (val) => typeof val === 'boolean';
    const isStr = (val) => typeof val === 'string';
    const isNum = (val) => typeof val === 'number';
    const isArr = (val) => Array.isArray(val);
    const hasProp = (obj, k) => Object.prototype.hasOwnProperty.call(obj, k);
    const hasSameKeys = (opts, required) => {
        const keys = Object.keys(required).filter(k => k !== 'name');
        return !keys.some(k => !hasProp(opts, k));
    };
    const isShape = (template) => {
        return (input) => {
            return isObj(input) && validateRuntimeOptions(input, template);
        };
    };
    const isShapeExact = (template) => {
        return (input) => {
            return (isObj(input) &&
                hasSameKeys(input, template) &&
                validateRuntimeOptions(input, template));
        };
    };
    const isEnum = (cases) => {
        return (str) => {
            return cases.includes(str);
        };
    };
    const lengthChecker = {
        name: 'length (string with absolute units)',
        check: isLength,
    };
    const RuntimeTypes = {
        any: {
            name: 'any',
            check: () => true,
        },
        enum(...cases) {
            return {
                name: `(${cases.map(c => `"${c}"`).join(' | ')})`,
                check: isEnum(cases),
            };
        },
        shapeExact: (template) => ({
            name: `exactly ({${Object.keys(template).join(', ')}})`,
            check: isShapeExact(template),
        }),
        shape: (template) => ({
            name: `shape ({${Object.keys(template).join(', ')}})`,
            check: isShape(template),
        }),
        string: {
            name: 'string',
            check: isStr,
        },
        length: lengthChecker,
        number: {
            name: 'number',
            check: isNum,
        },
        bool: {
            name: 'bool',
            check: isBool,
        },
        func: {
            name: 'func',
            check: isFunc$1,
        },
        obj: {
            name: 'object',
            check: isObj,
        },
        array: {
            name: 'array',
            check: isArr,
        },
        margin: {
            name: 'margin ({ top, inner, outer, bottom })',
            check: isShapeExact({
                name: 'margin',
                top: lengthChecker,
                inner: lengthChecker,
                outer: lengthChecker,
                bottom: lengthChecker,
            }),
        },
        size: {
            name: 'size ({ width, height })',
            check: isShapeExact({
                name: 'size',
                width: lengthChecker,
                height: lengthChecker,
            }),
        },
        function: {
            name: 'function',
            check: (x) => (typeof x == 'function'),
        },
    };

    class Counter extends Rule {
        constructor(options) {
            var _a, _b, _c;
            super(options);
            this.selector = '*';
            this.counterValue = 0;
            this.incrementEl = (_a = options.incrementEl) !== null && _a !== void 0 ? _a : '';
            this.resetEl = (_b = options.resetEl) !== null && _b !== void 0 ? _b : '';
            this.replaceEl = (_c = options.replaceEl) !== null && _c !== void 0 ? _c : '';
            validateRuntimeOptions(options, {
                name: 'Counter',
                replaceEl: RuntimeTypes.string,
                resetEl: RuntimeTypes.string,
                incrementEl: RuntimeTypes.string,
                replace: RuntimeTypes.func,
            });
        }
        setup() {
            this.counterValue = 0;
        }
        beforeAdd(el) {
            if (this.incrementEl.length && el.matches(this.incrementEl))
                this.counterValue += 1;
            if (this.resetEl.length && el.matches(this.resetEl))
                this.counterValue = 0;
            if (this.replaceEl.length && el.matches(this.replaceEl))
                return this.createReplacement(el);
            return el;
        }
        createReplacement(element) {
            return this.replace(element, this.counterValue);
        }
        replace(element, counterValue) {
            element.textContent = `${counterValue}`;
            return element;
        }
    }

    class OutOfFlow extends Rule {
        constructor(options) {
            super(options);
            this.name = 'Out of Flow';
        }
        createOutOfFlowPages(elmt, book, makeNewPage) {
            throw Error('createOutOfFlowPages must be overridden');
        }
        beforeAdd(elmt) {
            // Avoid breaking inside this element. Once it's completely added,
            // it will moved onto the background layer.
            // TODO: this should be handled inside regionize
            elmt.setAttribute('data-ignore-overflow', 'true');
            return elmt;
        }
        afterAdd(elmt, book, continueOnNewPage, makeNewPage) {
            this.createOutOfFlowPages(elmt, book, makeNewPage);
            // Catches cases when we didn't need to create a new page. but unclear
            if (this.continue !== 'same' || book.currentPage.hasOutOfFlowContent) {
                continueOnNewPage();
                if (this.continue === 'left' || this.continue === 'right') {
                    book.currentPage.setPreference(this.continue);
                }
            }
            return elmt;
        }
    }

    class FullBleedSpread extends OutOfFlow {
        constructor(options) {
            var _a, _b;
            options.continue = (_a = options.continue) !== null && _a !== void 0 ? _a : 'same';
            options.rotate = (_b = options.rotate) !== null && _b !== void 0 ? _b : 'none';
            super(options);
            validateRuntimeOptions(options, {
                name: 'FullBleedSpread',
                selector: RuntimeTypes.string,
                continue: RuntimeTypes.enum('next', 'same', 'left', 'right'),
                rotate: RuntimeTypes.enum('none', 'clockwise', 'counterclockwise'),
            });
        }
        createOutOfFlowPages(elmt, book, makeNewPage) {
            if (!!elmt.parentNode) {
                elmt.parentNode.removeChild(elmt);
            }
            let leftPage;
            if (book.currentPage.isEmpty) {
                leftPage = book.currentPage;
            }
            else {
                leftPage = makeNewPage();
                book.addPage(leftPage);
            }
            const rightPage = makeNewPage();
            book.addPage(rightPage);
            if (this.rotate !== 'none') {
                [leftPage, rightPage].forEach(page => {
                    const rotateContainer = div(`.rotate-container.spread-size-rotated.rotate-spread-${this.rotate}`);
                    rotateContainer.append(page.background);
                    page.element.append(rotateContainer);
                });
            }
            leftPage.background.append(elmt);
            leftPage.element.classList.add(prefixer('spread'));
            leftPage.setPreference('left');
            leftPage.isOutOfFlow = this.continue === 'same';
            leftPage.avoidReorder = true;
            leftPage.hasOutOfFlowContent = true;
            rightPage.background.append(elmt.cloneNode(true));
            rightPage.element.classList.add(prefixer('spread'));
            rightPage.setPreference('right');
            rightPage.isOutOfFlow = this.continue === 'same';
            rightPage.avoidReorder = true;
            rightPage.hasOutOfFlowContent = true;
        }
    }

    class FullBleedPage extends OutOfFlow {
        constructor(options) {
            var _a, _b;
            options.continue = (_a = options.continue) !== null && _a !== void 0 ? _a : 'same';
            options.rotate = (_b = options.rotate) !== null && _b !== void 0 ? _b : 'none';
            super(options);
            validateRuntimeOptions(options, {
                name: 'FullBleedPage',
                selector: RuntimeTypes.string,
                continue: RuntimeTypes.enum('next', 'same', 'left', 'right'),
                rotate: RuntimeTypes.enum('none', 'inward', 'outward', 'clockwise', 'counterclockwise'),
            });
        }
        createOutOfFlowPages(elmt, book, makeNewPage) {
            if (elmt.parentNode) {
                elmt.parentNode.removeChild(elmt);
            }
            let newPage;
            if (book.currentPage.isEmpty) {
                newPage = book.currentPage;
            }
            else {
                newPage = makeNewPage();
                book.addPage(newPage);
            }
            if (this.rotate !== 'none') {
                const rotateContainer = div(`.rotate-container.page-size-rotated.rotate-${this.rotate}`);
                rotateContainer.appendChild(newPage.background);
                newPage.element.appendChild(rotateContainer);
            }
            newPage.background.appendChild(elmt);
            newPage.hasOutOfFlowContent = true;
        }
    }

    class Replace extends Rule {
        constructor(options) {
            super(options);
            this.name = 'Replace';
        }
        afterAdd(element, book, continueOnNewPage, makeNewPage, overflowCallback) {
            const parent = element.parentNode;
            if (!parent) {
                console.error(element);
                throw Error(`Bindery.Replace({ selector: '${this.selector}' }).afterAdd called on element that hasn't been added.`);
            }
            const defensiveClone = element.cloneNode(true);
            const replacement = this.createReplacement(book, defensiveClone);
            parent.replaceChild(replacement, element);
            if (book.currentPage.hasOverflowed()) {
                parent.replaceChild(element, replacement);
                return overflowCallback(element);
            }
            return replacement;
        }
        createReplacement(book, element) {
            return this.replace(element);
        }
        replace(element, info) {
            element.insertAdjacentHTML('beforeend', '<sup class="bindery-sup">Default Replacement</sup>');
            return element;
        }
    }

    class Footnote extends Replace {
        constructor(options) {
            super(options);
            validateRuntimeOptions(options, {
                name: 'Footnote',
                selector: RuntimeTypes.string,
                replace: RuntimeTypes.func,
                render: RuntimeTypes.func,
            });
        }
        afterAdd(element, book, continueOnNewPage, makeNewPage, overflowCallback) {
            const number = book.currentPage.footer.children.length + 1;
            const footnote = div('.footnote');
            //console.log(`Footnote. afterAdd: render`);
            const contents = this.render(element, number);
            if (contents instanceof HTMLElement)
                footnote.appendChild(contents);
            else
                footnote.innerHTML = contents;
            book.currentPage.footer.appendChild(footnote);
            return super.afterAdd(element, book, continueOnNewPage, makeNewPage, (overflowEl) => {
                book.currentPage.footer.removeChild(footnote);
                return overflowCallback(overflowEl);
            });
        }
        createReplacement(book, element) {
            const number = book.currentPage.footer.children.length;
            return this.replace(element, number);
        }
        replace(element, number) {
            //element.insertAdjacentHTML('beforeend', `<sup class="bindery-sup">${number}</sup>`);
            element.insertAdjacentHTML('beforeend', ` <span class="bindery-sup">[${number}]</span>`);
            return element;
        }
        render(originalElement, number) {
            return `<sup>${number}</sup> Default footnote (<a href='/bindery/docs/#footnote'>Learn how to change it</a>)`;
        }
    }

    /* bindery Regionize v0.1.7 */
    const div$1 = (cls) => {
        const el = document.createElement('div');
        el.classList.add(cls);
        return el;
    };
    class Region {
        constructor(el) {
            this.suppressErrors = false;
            this.element = el;
            this.content = div$1('region-content');
            this.content.style.position = 'relative';
            this.element.appendChild(this.content);
            this.path = [];
        }
        setPath(newPath) {
            this.path = newPath;
            if (newPath.length > 0)
                this.content.appendChild(newPath[0]);
        }
        get currentElement() {
            const len = this.path.length;
            if (len > 0)
                return this.path[len - 1];
            return this.content;
        }
        isEmpty() {
            const el = this.content;
            if (el.textContent === null)
                return true;
            return el.textContent.trim() === '' && el.offsetHeight < 2;
        }
        isReasonableSize() {
            const box = this.element.getBoundingClientRect();
            return box.height > 100 && box.width > 100; // TODO: Number is arbitrary
        }
        overflowAmount() {
            const contentH = this.content.offsetHeight;
            const boxH = this.element.offsetHeight;
            if (boxH === 0) {
                console.log('overflowAmount: this.element', this.element);
                throw Error('Regionizer: Trying to flow into an element with zero height.');
            }
            return contentH - boxH;
        }
        hasOverflowed() {
            return this.overflowAmount() > -5;
        }
    }

    const isTextNode = (node) => {
        return node.nodeType === Node.TEXT_NODE;
    };
    const isElement$1 = (node) => {
        return node.nodeType === Node.ELEMENT_NODE;
    };
    const isScript = (node) => {
        return node.tagName === 'SCRIPT';
    };
    const isImage = (node) => {
        return node.tagName === 'IMG';
    };
    const isUnloadedImage = (node) => {
        return isImage(node) && !node.naturalWidth;
    };
    const isContentElement = (node) => {
        return isElement$1(node) && !isScript(node);
    };

    const MAX_TIME = 30; // ms
    const rAF = () => new Promise(resolve => {
        requestAnimationFrame(t => resolve(t));
    });
    let lastYieldTime = 0;
    const shouldYield = () => {
        const timeSinceYield = performance.now() - lastYieldTime;
        return timeSinceYield > MAX_TIME;
    };
    const yieldIfNecessary = async () => {
        if (shouldYield())
            lastYieldTime = await rAF();
    };

    const overflowAttr = 'data-ignore-overflow';
    // Walk up the tree to see if we are within
    // an overflow-ignoring node
    const ignoreOverflow = (element) => {
        if (element.hasAttribute(overflowAttr))
            return true;
        if (element.parentElement)
            return ignoreOverflow(element.parentElement);
        return false;
    };

    const SPACE = ' ';
    const nextWordEnd = (text, startIndex) => {
        let newIndex = startIndex + 1;
        while (newIndex < text.length && text.charAt(newIndex) !== SPACE) {
            newIndex += 1;
        }
        return newIndex;
    };
    const previousWordEnd = (text, startIndex) => {
        let newIndex = startIndex;
        if (text.charAt(newIndex) === SPACE) {
            newIndex -= 1;
        }
        while (text.charAt(newIndex) !== SPACE && newIndex > 0) {
            newIndex -= 1;
        }
        return newIndex;
    };

    const createTextNode = (text) => document.createTextNode(text);
    // Try adding a text node in one go.
    // Returns true if all the text fits, false if none fits.
    const addInOneGo = async (textNode, container, hasOverflowed) => {
        container.appendChild(textNode);
        const success = !hasOverflowed();
        if (!success)
            container.removeChild(textNode);
        await yieldIfNecessary();
        return { completed: success };
    };
    // Incrementally add words to the container until it just barely doesnt
    // overflow. Returns a remainder textNode for remaining text.
    const fillWordsUntilOverflow = async (textNode, container, hasOverflowed) => {
        const originalText = textNode.nodeValue || '';
        container.appendChild(textNode);
        if (!hasOverflowed() || ignoreOverflow(container)) {
            // The whole thing fits
            return { completed: true };
        }
        // Clear the node
        let proposedEnd = 0;
        textNode.nodeValue = originalText.substr(0, proposedEnd);
        while (!hasOverflowed() && proposedEnd < originalText.length) {
            // Reveal the next word
            proposedEnd = nextWordEnd(originalText, proposedEnd);
            if (proposedEnd < originalText.length) {
                textNode.nodeValue = originalText.substr(0, proposedEnd);
                await yieldIfNecessary();
            }
        }
        // Back out to word boundary
        const wordEnd = previousWordEnd(originalText, proposedEnd);
        if (wordEnd < 1) {
            // We didn't even add a complete word, don't add node
            textNode.nodeValue = originalText;
            container.removeChild(textNode);
            return { completed: false };
        }
        // trim text to word
        const fittingText = originalText.substr(0, wordEnd);
        const overflowingText = originalText.substr(wordEnd);
        textNode.nodeValue = fittingText;
        // Create a new text node for the next flow box
        return {
            completed: true,
            remainder: createTextNode(overflowingText),
        };
    };
    // Fills text across multiple elements by requesting a continuation
    // once the current element overflows
    const fillWords = async (textNode, container, getNextContainer, hasOverflowed) => {
        const textLayout = await fillWordsUntilOverflow(textNode, container, hasOverflowed);
        if (textLayout.remainder) {
            const nextContainer = getNextContainer();
            return fillWords(textLayout.remainder, nextContainer, getNextContainer, hasOverflowed);
        }
        return textLayout;
    };

    // Shifts this element to the next page. If any of its
    // ancestors cannot be split across page, it will
    // step up the tree to find the first ancestor
    // that can be split, and move all of that descendants
    // to the next page.
    const tryInNextRegion = (region, makeNextRegion, canSplit) => {
        if (region.path.length <= 1) {
            throw Error('Regionize: Attempting to move the top-level element');
        }
        const startLength = region.path.length;
        // So this node won't get cloned. TODO: this is unclear
        const elementToMove = region.path.pop();
        // find the nearest splittable parent
        let nearestMoveableElement = elementToMove;
        const pathToRestore = [];
        while (region.path.length > 1 && !canSplit(region.currentElement)) {
            nearestMoveableElement = region.path.pop();
            pathToRestore.unshift(nearestMoveableElement);
        }
        // Once a node is moved to a new page, it should no longer trigger another
        // move. otherwise tall elements will endlessly get shifted to the next page
        nearestMoveableElement.setAttribute('data-regionize-did-move', 'true');
        const parent = nearestMoveableElement.parentNode;
        parent.removeChild(nearestMoveableElement);
        // If the nearest ancestor would be empty without this node,
        // move it to the next page too.
        if (region.path.length > 1 &&
            region.currentElement.textContent.trim() === '') {
            parent.appendChild(nearestMoveableElement);
            nearestMoveableElement = region.path.pop();
            pathToRestore.unshift(nearestMoveableElement);
            nearestMoveableElement.parentNode.removeChild(nearestMoveableElement);
        }
        let nextRegion;
        if (!region.isEmpty()) {
            if (region.hasOverflowed()) {
                // Recovery failed, maybe the box contains a large
                // unsplittable element.
                region.suppressErrors = true;
            }
            nextRegion = makeNextRegion();
        }
        else {
            // If the page is empty when this node is removed,
            // then it won't help to move it to the next page.
            // Instead continue here until the node is done.
            nextRegion = region;
        }
        // append moved node as first in new page
        nextRegion.currentElement.appendChild(nearestMoveableElement);
        // restore subpath
        pathToRestore.forEach(r => nextRegion.path.push(r));
        nextRegion.path.push(elementToMove);
        if (startLength !== nextRegion.path.length) {
            throw Error('Regionize: Restored path depth does not match original path depth');
        }
    };

    // The path is an array of nested elments,
    // for example .content > article > p > a).
    //
    // It's shallowly cloned every time we move to the next page,
    // to create the illusion that nodes are continuing from page
    // to page.
    //
    // The transition can be customized by setting a Split rule,
    // which lets you add classes to the original and cloned element
    // to customize styling.
    const clone = (el, withChildren) => {
        return el.cloneNode(withChildren);
    };
    const shallowClone = (el) => clone(el, false);
    const deepClone = (el) => clone(el, true);
    const clonePath = (oldPath, applyRules) => {
        const newPath = [];
        const deepCloneWithRules = (el) => {
            const clone = deepClone(el); // could be th > h3 > span;
            applyRules(el, clone);
            return clone;
        };
        for (let i = oldPath.length - 1; i >= 0; i -= 1) {
            const original = oldPath[i];
            const clone = shallowClone(original);
            const nextChild = oldPath[i + 1];
            clone.innerHTML = '';
            applyRules(original, clone, nextChild, deepCloneWithRules);
            if (i < oldPath.length - 1)
                clone.appendChild(newPath[i + 1]);
            newPath[i] = clone;
        }
        return newPath;
    };

    // Polls every 10ms for image.naturalWidth
    // or an error event.
    //
    // Note: Doesn't ever reject, since missing images
    // shouldn't prevent layout from resolving
    const wait10 = () => new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 10);
    });
    const ensureImageLoaded = async (image) => {
        const imgStart = performance.now();
        let failed = false;
        image.addEventListener('error', () => {
            failed = true;
        });
        image.src = image.src; // re-trigger error if already failed
        while (!image.naturalWidth && !failed) {
            await wait10();
        }
        return performance.now() - imgStart;
    };

    const preserveNumbering = (original, clone, nextChild) => {
        // restart numbering
        let prevStart = 1;
        if (original.hasAttribute('start')) {
            // the OL is also a continuation
            prevStart = parseInt(original.getAttribute('start') || '', 10);
        }
        if (nextChild && nextChild.tagName === 'LI') {
            // the first list item is a continuation
            prevStart -= 1;
        }
        const prevCount = original.children.length;
        const newStart = prevStart + prevCount;
        clone.setAttribute('start', `${newStart}`);
    };

    const preserveTableColumns = (original, clone, nextChild, deepClone) => {
        const columns = [...original.children];
        const currentIndex = columns.indexOf(nextChild);
        for (let i = 0; i < currentIndex; i += 1) {
            const origCol = columns[i];
            if (origCol) {
                const clonedCol = deepClone(origCol);
                clone.appendChild(clonedCol);
            }
        }
    };

    const noop = () => { };
    const always = () => true;
    const never = () => false;
    // flow content through FlowBoxes.
    // the caller is responsible for managing
    // and creating regions.
    const flowIntoRegions = async (opts) => {
        var _a, _b, _c, _d, _e, _f;
        const content = opts.content;
        const createRegion = opts.createRegion;
        if (!content)
            throw Error('content not specified');
        if (!createRegion)
            throw Error('createRegion not specified');
        // optional
        const applySplit = (_a = opts.applySplit) !== null && _a !== void 0 ? _a : noop;
        const canSplit = (_b = opts.canSplit) !== null && _b !== void 0 ? _b : always;
        const beforeAdd = (_c = opts.beforeAdd) !== null && _c !== void 0 ? _c : noop;
        const afterAdd = (_d = opts.afterAdd) !== null && _d !== void 0 ? _d : noop;
        const didWaitFor = (_e = opts.didWaitFor) !== null && _e !== void 0 ? _e : noop;
        const shouldTraverse = (_f = opts.shouldTraverse) !== null && _f !== void 0 ? _f : never;
        // currentRegion should hold the only state that persists during traversal.
        let currentRegion = createRegion();
        const hasOverflowed = () => currentRegion.hasOverflowed();
        const canSplitCurrent = () => canSplit(currentRegion.currentElement);
        const ignoreCurrentOverflow = () => ignoreOverflow(currentRegion.currentElement);
        const splitRules = (original, clone, nextChild, deepClone) => {
            if (original.tagName === 'OL') {
                preserveNumbering(original, clone, nextChild);
            }
            if (original.tagName === 'TR' && nextChild && deepClone) {
                preserveTableColumns(original, clone, nextChild, deepClone);
            }
            applySplit(original, clone, nextChild, deepClone);
        };
        const continueInNextRegion = () => {
            const prevRegion = currentRegion;
            currentRegion = createRegion();
            const newPath = clonePath(prevRegion.path, splitRules);
            currentRegion.setPath(newPath);
            return currentRegion;
        };
        const continuedParent = () => {
            continueInNextRegion();
            return currentRegion.currentElement;
        };
        const addText = async (textNode, isSplittable) => {
            const el = currentRegion.currentElement;
            let textLayout;
            if (isSplittable) {
                // Add the text word by word, adding pages as needed
                textLayout = await fillWords(textNode, el, continuedParent, hasOverflowed);
                if (!textLayout.completed && currentRegion.path.length > 1) {
                    tryInNextRegion(currentRegion, continueInNextRegion, canSplit);
                    textLayout = await fillWords(textNode, el, continuedParent, hasOverflowed);
                }
            }
            else {
                // Add the text as a block, trying a new page if needed
                textLayout = await addInOneGo(textNode, currentRegion.currentElement, hasOverflowed);
                if (!textLayout.completed && !ignoreCurrentOverflow()) {
                    tryInNextRegion(currentRegion, continueInNextRegion, canSplit);
                    textLayout = await addInOneGo(textNode, currentRegion.currentElement, hasOverflowed);
                }
            }
            // Something went wrong. Insert the text anyways, ignoring overflow,
            // and move onto the next region.
            if (!textLayout.completed) {
                currentRegion.currentElement.appendChild(textNode);
                if (!ignoreCurrentOverflow() && canSplitCurrent()) {
                    currentRegion.suppressErrors = true;
                    continueInNextRegion();
                }
            }
        };
        const shouldTraverseChildren = (element) => {
            if (hasOverflowed())
                return true;
            if (element.querySelector('img'))
                return true;
            if (shouldTraverse(element))
                return true;
            return false;
        };
        const addElement = async (element) => {
            // Ensure images are loaded before testing for overflow
            if (isUnloadedImage(element)) {
                const waitTime = await ensureImageLoaded(element);
                didWaitFor(waitTime);
            }
            // Transforms before adding
            await beforeAdd(element, continueInNextRegion);
            // Append element and push onto the the stack
            currentRegion.currentElement.appendChild(element);
            currentRegion.path.push(element);
            if (shouldTraverseChildren(element)) {
                // Only if the region overflowed, the content contains
                // an image, or the caller has requested a custom traversal.
                await clearAndAddChildren(element);
            }
            // We're done: Pop off the stack and do any cleanup
            const addedElement = currentRegion.path.pop();
            await afterAdd(addedElement, continueInNextRegion);
        };
        const clearAndAddChildren = async (element) => {
            const childNodes = [...element.childNodes];
            element.innerHTML = '';
            if (hasOverflowed() && !ignoreCurrentOverflow() && canSplitCurrent()) {
                // Overflows when empty
                tryInNextRegion(currentRegion, continueInNextRegion, canSplit);
            }
            const shouldSplit = canSplit(element) && !ignoreOverflow(element);
            for (const child of childNodes) {
                if (isTextNode(child)) {
                    await addText(child, shouldSplit);
                }
                else if (isContentElement(child)) {
                    // this is fast
                    // noisy
                    //console.time(`flowIntoRegions clearAndAddChildren: addElement`);
                    await addElement(child);
                    //console.timeEnd(`flowIntoRegions clearAndAddChildren: addElement`);
                }
            }
        };
        return addElement(content);
    };

    class HierarchyToHeadingAdapter {
        constructor(getter) {
            // console.warn('Deprecated');
            this.getHierarchy = getter;
        }
        textFor(sel) {
            var _a, _b;
            return (_b = (_a = this.getHierarchy()) === null || _a === void 0 ? void 0 : _a.find(entry => (entry === null || entry === void 0 ? void 0 : entry.selector) === sel)) === null || _b === void 0 ? void 0 : _b.text;
        }
        get h1() {
            return this.textFor('h1');
        }
        get h2() {
            return this.textFor('h2');
        }
        get h3() {
            return this.textFor('h3');
        }
        get h4() {
            return this.textFor('h4');
        }
        get h5() {
            return this.textFor('h5');
        }
        get h6() {
            return this.textFor('h6');
        }
    }
    class Page {
        constructor() {
            this.hierarchy = [];
            this.suppress = false;
            this.hasOutOfFlowContent = false;
            this.alwaysLeft = false;
            this.alwaysRight = false;
            this.isOutOfFlow = false; // used by spreads
            this.avoidReorder = false; // used by 2-page spreads
            this.flow = new Region(div('flow-box'));
            this.footer = div('footer');
            this.background = div('page-background');
            this.element = div('page', this.background, this.flow.element, this.footer);
            this.heading = new HierarchyToHeadingAdapter(() => this.hierarchy);
        }
        static isSizeValid() {
            const testPage = new Page();
            return safeMeasure(testPage.element, () => testPage.flow.isReasonableSize);
        }
        setLeftRight(dir) {
            this.side = dir;
            this.element.classList.toggle(classes.leftPage, this.isLeft);
            this.element.classList.toggle(classes.rightPage, !this.isLeft);
        }
        get isLeft() {
            return this.side === 'left';
        }
        get isRight() {
            return this.side === 'right';
        }
        // TODO(milahu) implement
        /* non trivial
        get isLast() {
            return this.side === 'right';
        }
        */
        setPreference(dir) {
            const preferLeft = dir === 'left';
            this.alwaysLeft = preferLeft;
            this.alwaysRight = !preferLeft;
        }
        get suppressErrors() {
            var _a;
            return (_a = this.suppress) !== null && _a !== void 0 ? _a : false;
        }
        set suppressErrors(newVal) {
            this.suppress = newVal;
            this.element.classList.toggle(classes.isOverflowing, newVal);
        }
        get isEmpty() {
            return !this.hasOutOfFlowContent && this.flow.isEmpty();
        }
        validate() {
            if (!this.hasOverflowed())
                return;
            const suspect = this.flow.currentElement;
            if (suspect) {
                console.warn('Bindery: Content overflows, probably due to a style set on:', suspect);
                if (suspect.parentNode) {
                    suspect.parentNode.removeChild(suspect);
                }
            }
            else {
                console.warn('Bindery: Content overflows.');
            }
        }
        validateEnd(allowOverflow) {
            if (!this.hasOverflowed())
                return;
            console.warn(`Bindery: Page ~${this.number} is overflowing`, this.element);
            if (!this.suppressErrors && !this.flow.suppressErrors && !allowOverflow) {
                throw Error('Bindery: Moved to new page when last one is still overflowing');
            }
        }
        hasOverflowed() {
            return safeMeasure(this.element, () => this.flow.hasOverflowed());
        }
    }

    const indexOfNextReorderablePage = (pages, startIndex) => {
        for (let i = startIndex; i < pages.length; i += 1) {
            const pg = pages[i];
            if (!pg.isOutOfFlow && !pg.avoidReorder)
                return i;
        }
        return null;
    };
    // Given an array of pages with alwaysLeft, alwaysRight, and isOutOfFlow
    // properties, orders them so that alwaysLeft and alwaysRight are true.
    const orderPages = (pages, makeNewPage) => {
        const orderedPages = pages.slice();
        for (let i = 0; i < orderedPages.length; i += 1) {
            const page = orderedPages[i];
            const isLeft = i % 2 !== 0;
            if ((isLeft && page.alwaysRight) || (!isLeft && page.alwaysLeft)) {
                if (page.isOutOfFlow) {
                    // If the page is 'out of flow', we'd prefer not to add a blank page.
                    // Instead it floats backwards in the book, pulling the next
                    // in-flow page forward. If several 'out of flow' pages
                    // are next to each other, they will remain in order, all being pushed
                    // backward together.
                    const indexToSwap = indexOfNextReorderablePage(orderedPages, i + 1);
                    if (!indexToSwap) {
                        // No larger index to swap with, perhaps because
                        // we are optimistically rendering before the book is done
                        break;
                    }
                    const pageToMoveUp = orderedPages[indexToSwap];
                    orderedPages.splice(indexToSwap, 1); // remove pg
                    orderedPages.splice(i, 0, pageToMoveUp); // insert pg
                }
                else {
                    // If the page is 'in flow', order must be respected, so extra blank pages
                    // are inserted.
                    orderedPages.splice(i, 0, makeNewPage());
                }
            }
        }
        return orderedPages;
    };

    const MAXIMUM_PAGE_LIMIT = 2000;
    class Book {
        constructor() {
            this.rawPages = [];
            this.orderedPages = [];
        }
        addPage(newPage) {
            this.rawPages.push(newPage);
            this.updatePageOrder();
        }
        get pageCount() {
            return this.orderedPages.length;
        }
        get pages() {
            return this.orderedPages;
        }
        updatePageOrder() {
            this.orderedPages = orderPages(this.rawPages, () => new Page());
        }
        validate() {
            if (this.pageCount > MAXIMUM_PAGE_LIMIT) {
                throw Error('Bindery: Maximum page count exceeded. Suspected runaway layout.');
            }
        }
    }

    const annotatePagesNumbers = (pages, offset) => {
        {
            pages.forEach((page, i) => {
                page.number = offset + i + 1;
                page.setLeftRight(i % 2 === 0 ? 'right' : 'left');
            });
        }
    };
    const annotatePagesHierarchy = (pages, headerSelectorHierarchy) => {
        // ———
        // RUNNING HEADERS
        // Sections to annotate with.
        // This should be a hierarchical list of selectors.
        // Every time one is selected, it annotates all following pages
        // and clears any subselectors.
        let currentHierarchy = [];
        pages.forEach(page => {
            const pageHierarchy = [];
            headerSelectorHierarchy.forEach((selector, i) => {
                var _a;
                const element = page.element.querySelector(selector);
                // A new header level starts on this page
                if (element) {
                    currentHierarchy[i] = {
                        selector: selector,
                        text: (_a = element.textContent) !== null && _a !== void 0 ? _a : '',
                        el: element,
                    };
                    // Clear any lower headers in the hierarchy
                    currentHierarchy = currentHierarchy.slice(0, i + 1);
                    // headerSelectorHierarchy.forEach((lowerSelector, j) => {
                    //   if (j > i) {
                    //     currentHeaders[j] = { selector: lowerSelector, text: '', el: undefined };
                    //   }
                    // });
                }
                // Always decorate this page with current header state.
                if (currentHierarchy[i]) {
                    pageHierarchy[i] = currentHierarchy[i];
                }
            });
            page.hierarchy = pageHierarchy;
        });
    };
    const annotatePages = (pages, offset) => {
        annotatePagesNumbers(pages, offset);
        annotatePagesHierarchy(pages, ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);
    };

    const pageNumbersForTest = (pages, test) => {
        return pages
            .filter(pg => !!pg.number)
            .filter(pg => test(pg.element))
            .map(pg => pg.number);
    };

    // Compatible with ids that start with numbers
    const startsWithNumber = (sel) => {
        return sel.length > 2 && sel[0] === '#' && /^\d+$/.test(sel[1]);
    };
    const safeIDSel = (sel) => {
        return startsWithNumber(sel) ? `[id="${sel.replace('#', '')}"]` : sel;
    };
    class PageReference extends Replace {
        constructor(options) {
            super(options);
            validateRuntimeOptions(options, {
                name: 'PageReference',
                selector: RuntimeTypes.string,
                replace: RuntimeTypes.func,
                createTest: RuntimeTypes.func,
            });
            this.references = [];
            const throttle = throttleTime(10);
            this.throttledUpdate = book => {
                throttle(() => this.updatePageReferences(book.pages));
            };
        }
        eachPage(page, book) {
            this.throttledUpdate(book);
        }
        afterAdd(elmt, book) {
            const test = this.createTest(elmt);
            if (!test)
                return elmt;
            const ref = this.createReference(book, test, elmt);
            return ref.element;
        }
        createReference(book, testFunction, elmt) {
            const ref = {
                testFunction,
                template: elmt,
                element: elmt,
                previousMatches: undefined,
            };
            this.references.push(ref);
            const currentResults = pageNumbersForTest(book.pages, testFunction);
            console.log(`PageReference. createReference: render`);
            this.render(ref, currentResults); // Replace element immediately, to make sure it'll fit
            return ref;
        }
        render(ref, matchingPageNumbers) {
            if (ref.previousMatches && shallowEqual(ref.previousMatches, matchingPageNumbers)) {
                return;
            }
            if (!Array.isArray(matchingPageNumbers)) {
                throw Error('Page search returned unexpected result');
            }
            const hasFoundPage = matchingPageNumbers.length > 0;
            const pageRanges = hasFoundPage ? formatAsRanges(matchingPageNumbers) : '⌧';
            const template = ref.template.cloneNode(true);
            const newRender = this.replace(template, pageRanges);
            if (!hasFoundPage)
                newRender.classList.add(prefixer('placeholder-num'));
            ref.element.parentNode.replaceChild(newRender, ref.element);
            ref.element = newRender;
            ref.previousMatches = matchingPageNumbers;
        }
        createTest(element) {
            const href = element.getAttribute('href');
            if (!href)
                return null;
            const selector = safeIDSel(href);
            return (el) => {
                return !!el.querySelector(selector);
            };
        }
        updatePageReferences(pages) {
            // querySelector first, then rerender
            const results = this.references.map(ref => {
                return { ref, matchingPageNumbers: pageNumbersForTest(pages, ref.testFunction) };
            });
            results.forEach(({ ref, matchingPageNumbers }) => {
              console.log(`PageReference. updatePageReferences: render`);
              this.render(ref, matchingPageNumbers);
            });
        }
        replace(template, number) {
            template.insertAdjacentHTML('beforeend', `, <span>${number}</span>`);
            return template;
        }
    }

    class PageBreak extends Rule {
        constructor(options) {
            var _a, _b;
            super(options);
            if (options.continue == 'same') {
                throw Error("Can't continue on the same pager after a Page Break ");
            }
            this.continue = (_a = options.continue) !== null && _a !== void 0 ? _a : 'next';
            this.position = (_b = options.position) !== null && _b !== void 0 ? _b : 'before';
            validateRuntimeOptions(options, {
                name: 'PageBreak',
                selector: RuntimeTypes.string,
                continue: RuntimeTypes.enum('next', 'left', 'right'),
                position: RuntimeTypes.enum('before', 'after', 'both', 'avoid'),
            });
        }
        get avoidSplit() {
            return this.position === 'avoid';
        }
        beforeAdd(elmt, book, continueOnNewPage) {
            if (this.position === 'before' || this.position === 'both') {
                if (!book.currentPage.isEmpty) {
                    continueOnNewPage();
                }
                if (this.continue !== 'next') {
                    book.currentPage.setPreference(this.continue);
                }
            }
            return elmt;
        }
        afterAdd(elmt, book, continueOnNewPage) {
            if (this.position === 'after' || this.position === 'both') {
                continueOnNewPage();
                if (this.continue !== 'next') {
                    book.currentPage.setPreference(this.continue);
                }
            }
            return elmt;
        }
    }

    // TODO selectorHierarchy: [ String ], ie [ 'h1', 'h2', 'h3.chapter' ]
    class RunningHeader extends Rule {
        constructor(options = {}) {
            super(options);
            validateRuntimeOptions(options, {
                name: 'RunningHeader',
                render: RuntimeTypes.func,
            });
        }
        eachPage(page) {
            if (!page.runningHeader) {
                const elmt = div('.running-header');
                page.element.appendChild(elmt);
                page.runningHeader = elmt;
            }
            // this is fast
            //console.time(`RunningHeader.eachPage: render`);
            page.runningHeader.innerHTML = this.render(page);
            //console.timeEnd(`RunningHeader.eachPage: render`);
        }
        render(page) {
            return `${page.number}`;
        }
    }

    class Split extends Rule {
        constructor(options) {
            super(options);
            this.toNext = options.toNext;
            this.fromPrevious = options.fromPrevious;
            validateRuntimeOptions(options, {
                name: 'Split',
                selector: RuntimeTypes.string,
                toNext: RuntimeTypes.string,
                fromPrevious: RuntimeTypes.string,
                didSplit: RuntimeTypes.func,
            });
        }
        didSplit(original, clone) {
            if (this.toNext)
                original.classList.add(this.toNext);
            if (this.fromPrevious)
                clone.classList.add(this.fromPrevious);
        }
    }

    var rules = {
        Rule,
        Split(options) {
            return new Split(options);
        },
        Counter(options) {
            return new Counter(options);
        },
        FullBleedPage(options) {
            return new FullBleedPage(options);
        },
        Footnote(options) {
            return new Footnote(options);
        },
        RunningHeader(options) {
            return new RunningHeader(options);
        },
        Replace(options) {
            return new Replace(options);
        },
        FullBleedSpread(options) {
            return new FullBleedSpread(options);
        },
        PageBreak(options) {
            return new PageBreak(options);
        },
        PageReference(options) {
            return new PageReference(options);
        },
        createRule(options) {
            return new Rule(options);
        },
    };

    const { PageBreak: PageBreak$1, PageReference: PageReference$1, Footnote: Footnote$1, FullBleedPage: FullBleedPage$1, FullBleedSpread: FullBleedSpread$1, } = rules;
    const replacer = (element, number) => {
        element.textContent = `${number}`;
        return element;
    };
    var attributeRules = [
        PageBreak$1({ selector: '[book-page-break="both"]', position: 'both' }),
        PageBreak$1({ selector: '[book-page-break="avoid"]', position: 'avoid' }),
        PageBreak$1({
            selector: '[book-page-break="after"][book-page-continue="right"]',
            position: 'after',
            continue: 'right',
        }),
        PageBreak$1({
            selector: '[book-page-break="after"][book-page-continue="left"]',
            position: 'after',
            continue: 'left',
        }),
        PageBreak$1({
            selector: '[book-page-break="after"][book-page-continue="next"]',
            position: 'after',
            continue: 'next',
        }),
        PageBreak$1({
            selector: '[book-page-break="before"][book-page-continue="right"]',
            position: 'before',
            continue: 'right',
        }),
        PageBreak$1({
            selector: '[book-page-break="before"][book-page-continue="left"]',
            position: 'before',
            continue: 'left',
        }),
        PageBreak$1({
            selector: '[book-page-break="before"][book-page-continue="next"]',
            position: 'before',
            continue: 'next',
        }),
        FullBleedPage$1({ selector: '[book-full-bleed="page"]' }),
        FullBleedSpread$1({ selector: '[book-full-bleed="spread"]' }),
        Footnote$1({
            selector: '[book-footnote-text]',
            render: (element, number) => {
                const txt = element.getAttribute('book-footnote-text');
                return `<i>${number}</i>${txt}`;
            },
        }),
        PageReference$1({
            selector: '[book-pages-with-text]',
            replace: replacer,
            createTest: (element) => {
                var _a;
                const text = (_a = element.getAttribute('book-pages-with-text')) !== null && _a !== void 0 ? _a : '';
                const term = text.toLowerCase().trim();
                return (pageElement) => {
                    const pageText = pageElement.textContent || '';
                    return pageText.toLowerCase().includes(term);
                };
            },
        }),
        PageReference$1({
            selector: '[book-pages-with-selector]',
            replace: replacer,
            createTest: (element) => {
                var _a;
                const txt = (_a = element.getAttribute('book-pages-with-selector')) !== null && _a !== void 0 ? _a : '';
                const selector = txt.trim();
                return (pageElement) => {
                    return !!pageElement.querySelector(selector);
                };
            },
        }),
        PageReference$1({
            selector: '[book-pages-with]',
            replace: replacer,
            createTest: (element) => {
                var _a;
                const text = (_a = element.textContent) !== null && _a !== void 0 ? _a : '';
                const term = text.toLowerCase().trim();
                return (pageElement) => {
                    var _a;
                    const pageText = (_a = pageElement.textContent) !== null && _a !== void 0 ? _a : '';
                    return pageText.toLowerCase().includes(term);
                };
            },
        }),
    ];

    const isSpread = (rule) => rule instanceof FullBleedSpread;
    const isPage = (rule) => rule instanceof FullBleedPage;
    const isBreak = (rule) => rule instanceof PageBreak;
    const isFullPageRule = (rule) => isSpread(rule) || isPage(rule) || isBreak(rule);
    const dedupe = (inputRules) => {
        const conflictRules = inputRules.filter(isFullPageRule);
        const output = inputRules.filter(rule => !conflictRules.includes(rule));
        const firstSpreadRule = conflictRules.find(isSpread);
        const firstPageRule = conflictRules.find(isPage);
        // Only apply one fullpage or fullspread
        if (firstSpreadRule)
            output.push(firstSpreadRule);
        else if (firstPageRule)
            output.push(firstPageRule);
        else
            output.push(...conflictRules); // but multiple pagebreaks are ok
        return output;
    };

    // TODO:
    // While this does catch overflows, it is pretty hacky to move the entire node to the next page.
    // - 1. there is no guarentee it will fit on the new page
    // - 2. if it had childNodes, those side effects will not be undone,
    // which means footnotes will get left on previous page.
    // - 3. if it is a large paragraph, it will leave a large gap. the
    // ideal approach would be to only need to invalidate the last line of text.
    const recoverFromRule = (el, book, nextRegion) => {
        let removed = el;
        const parent = el.parentNode;
        if (!parent) {
            throw Error("Can't recoverFromRule when element is unparented");
        }
        parent.removeChild(removed);
        let popped;
        if (book.currentPage.hasOverflowed()) {
            parent.appendChild(el);
            removed = parent;
            if (!removed.parentNode) {
                throw Error("Can't recoverFromRule when element is unparented");
            }
            removed.parentNode.removeChild(removed);
            popped = book.currentPage.flow.path.pop();
            if (book.currentPage.hasOverflowed()) {
                console.error('Trying again didnt fix it');
            }
        }
        const newRegion = nextRegion();
        newRegion.currentElement.appendChild(removed);
        if (popped)
            newRegion.path.push(popped);
    };

    const giveUp = (rule, el) => {
        console.warn(`Couldn't apply ${rule.name}, caused overflows twice when adding: `, el);
    };
    function isPageRule(rule) {
        return rule.eachPage;
    }
    function isBeforeAddRule(rule) {
        return !!rule.selector && rule.beforeAdd;
    }
    function isAfterAddRule(rule) {
        return !!rule.selector && rule.afterAdd;
    }
    function isOffsetRule(rule) {
        return rule.pageNumberOffset;
    }
    function isDidSplitRule(rule) {
        return !!rule.selector && rule.didSplit;
    }
    function isAvoidSplitRule(rule) {
        return !!rule.selector && rule.avoidSplit;
    }
    class RuleSet {
        constructor(rules) {
            var _a;
            const offsetRule = rules.find(isOffsetRule);
            this.pageNumberOffset = (_a = offsetRule === null || offsetRule === void 0 ? void 0 : offsetRule.pageNumberOffset) !== null && _a !== void 0 ? _a : 0;
            // Rules for pages
            this.pageRules = rules.filter(isPageRule);
            // Rules for elements
            this.beforeAddRules = rules.filter(isBeforeAddRule);
            this.afterAddRules = rules.filter(isAfterAddRule);
            // Rules for layout
            this.selectorsNotToSplit = rules
                .filter(isAvoidSplitRule)
                .map(r => r.selector);
            this.didSplitRules = rules.filter(isDidSplitRule);
            // setup
            rules.filter(r => r.setup).forEach(r => r.setup());
            this.applySplitRules = this.applySplitRules.bind(this);
            const allSelectors = rules
                .map(r => r.selector)
                .filter(sel => !!sel)
                .join(', ');
            if (allSelectors) {
                const shouldTraverse = (el) => !!el.querySelector(allSelectors);
                this.shouldTraverse = shouldTraverse.bind(this);
            }
            else {
                this.shouldTraverse = () => false;
            }
        }
        applySplitRules(original, clone) {
            original.classList.add(classes.toNext);
            clone.classList.add(classes.fromPrev);
            this.didSplitRules
                .filter(r => original.matches(r.selector))
                .forEach(rule => {
                rule.didSplit(original, clone);
            });
        }
        // Rules for pages
        applyPageDoneRules(pg, book) {
            this.pageRules.forEach(rule => rule.eachPage(pg, book));
        }
        finishEveryPage(book) {
            this.pageRules.forEach(rule => book.pages.forEach(pg => rule.eachPage(pg, book)));
        }
        // Rules for elements
        applyBeforeAddRules(element, book, continueOnNewPage, makeNewPage) {
            let addedElement = element;
            const matchingRules = this.beforeAddRules.filter(rule => addedElement.matches(rule.selector));
            matchingRules.forEach(rule => {
                addedElement = rule.beforeAdd(addedElement, book, continueOnNewPage, makeNewPage);
            });
            return addedElement;
        }
        applyAfterAddRules(originalElement, book, continueOnNewPage, makeNewPage) {
            let addedElement = originalElement;
            const attemptRecovery = (el) => recoverFromRule(el, book, continueOnNewPage);
            const matchingRules = this.afterAddRules.filter(rule => addedElement.matches(rule.selector));
            const uniqueRules = dedupe(matchingRules);
            uniqueRules.forEach(rule => {
                const retry = (el) => {
                    attemptRecovery(el);
                    return rule.afterAdd(el, book, continueOnNewPage, makeNewPage, () => giveUp(rule, el));
                };
                addedElement = rule.afterAdd(addedElement, book, continueOnNewPage, makeNewPage, retry);
            });
            return addedElement;
        }
    }

    const sec = (ms) => (ms / 1000).toFixed(2);
    const estimateFor = (content) => {
        const start = window.performance.now();
        const capacity = content.querySelectorAll('*').length;
        let timeWaiting = 0;
        let completed = 0;
        return {
            increment: () => {
                completed += 1;
            },
            addWaitTime: (t) => {
                timeWaiting += t;
            },
            get progress() {
                return completed / capacity;
            },
            end: () => {
                const end = window.performance.now();
                const total = end - start;
                const layout = total - timeWaiting;
                console.log(`bindery: Layout ready in ${sec(layout)}s (plus ${sec(timeWaiting)}s waiting for images)`);
                const stats = {
                    layout,
                    total,
                    timeWaiting,
                    completed,
                    capacity,
                };
                return stats;
            },
        };
    };
    const makeBook = async (content, rules, updateProgress, onResult) => {
        if (!Page.isSizeValid())
            throw Error('Page is too small');
        const estimator = estimateFor(content);
        const ruleSet = new RuleSet(rules);
        const book = new Book();
        const pageNumberOffset = ruleSet.pageNumberOffset;
        const makeNewPage = () => new Page();
        const finishPage = (page, allowOverflow) => {
            // finished with this page, can display
            book.updatePageOrder();
            annotatePages(book.pages, pageNumberOffset);
            ruleSet.applyPageDoneRules(page, book);
            page.validateEnd(allowOverflow);
            book.validate();
        };
        const addPageToBook = (allowOverflow = false) => {
            const oldPage = book.currentPage;
            if (oldPage)
                finishPage(oldPage, allowOverflow);
            const newPage = makeNewPage();
            book.currentPage = newPage;
            book.addPage(newPage);
            updateProgress(book, estimator.progress);
            newPage.validate();
            return newPage;
        };
        const makeNextRegion = () => {
            const newPage = addPageToBook();
            return newPage.flow;
        };
        const applySplit = ruleSet.applySplitRules;
        const dontSplitSel = ruleSet.selectorsNotToSplit;
        const canSplit = (element) => {
            if (dontSplitSel.some(sel => element.matches(sel))) {
                return false;
            }
            if (element.parentElement)
                return canSplit(element.parentElement);
            return true;
        };
        const beforeAdd = async (elementToAdd, continueInNextRegion) => {
            ruleSet.applyBeforeAddRules(elementToAdd, book, continueInNextRegion, makeNewPage);
        };
        const afterAdd = async (addedElement, continueInNextRegion) => {
            estimator.increment();
            return ruleSet.applyAfterAddRules(addedElement, book, continueInNextRegion, makeNewPage);
        };
        // init
        content.style.margin = '0';
        content.style.padding = '0';
        console.time(`makeBook: flowIntoRegions`);
        await flowIntoRegions({
            content,
            createRegion: makeNextRegion,
            applySplit,
            canSplit,
            beforeAdd,
            afterAdd,
            shouldTraverse: ruleSet.shouldTraverse,
            didWaitFor: t => estimator.addWaitTime(t),
        });
        console.timeEnd(`makeBook: flowIntoRegions`);
        book.updatePageOrder();
        annotatePages(book.pages, pageNumberOffset);
        ruleSet.finishEveryPage(book);
        const stats = estimator.end();
        book.stats = stats;
        if (onResult) onResult(book);
        return book;
    };

    const fetchContent = async (url, selector) => {
        const response = await fetch(url);
        if (response.status !== 200) {
            throw Error(`Response ${response.status}: Could not load file at "${url}"`);
        }
        const fetchedContent = await response.text();
        const el = parseHTML(fetchedContent, selector);
        if (!(el instanceof HTMLElement)) {
            throw Error(`Could not find element that matches selector "${selector}" in response from ${url}`);
        }
        return el;
    };
    const getContentAsElement = async (content) => {
        if (content instanceof HTMLElement)
            return content;
        if (typeof content === 'string') {
            const el = document.querySelector(content);
            if (!(el instanceof HTMLElement)) {
                throw Error(`Could not find element that matches selector "${content}"`);
            }
            return el;
        }
        if (typeof content === 'object' && content.url) {
            return fetchContent(content.url, content.selector);
        }
        throw Error('Content source must be an element or selector');
    };

    // TODO: This is not a particularly robust check.
    const supportsCustomSheetSize = () => !!window.hasOwnProperty('chrome');
    const getSheetSizeLabels = (pageSize) => {
        const sizeName = `${pageSize.width} × ${pageSize.height}`;
        if (!supportsCustomSheetSize()) {
            return [
                [SheetSize.LETTER_PORTRAIT, 'Default Page Size *'],
                [
                    SheetSize.LETTER_PORTRAIT,
                    "Only Chrome supports custom page sizes. Set in your browser's print dialog instead.",
                ],
            ];
        }
        return [
            [SheetSize.AUTO, `${sizeName}`],
            [SheetSize.AUTO_BLEED, `${sizeName} + Bleed`],
            [SheetSize.AUTO_MARKS, `${sizeName} + Marks`],
            [SheetSize.LETTER_PORTRAIT, 'Letter Portrait'],
            [SheetSize.LETTER_LANDSCAPE, 'Letter Landscape'],
            [SheetSize.A4_PORTRAIT, 'A4 Portrait'],
            [SheetSize.A4_LANDSCAPE, 'A4 Landscape'],
            [SheetSize.A5_PORTRAIT, 'A5 Portrait'],
            [SheetSize.A5_LANDSCAPE, 'A5 Landscape'],
        ];
    };
    const marksLabels = [
        [SheetMarks.NONE, 'No Marks'],
        [SheetMarks.CROP, 'Crop Marks'],
        [SheetMarks.BLEED, 'Bleed Marks'],
        [SheetMarks.BOTH, 'Crop and Bleed'],
    ];
    const modeLabels = [
        [ViewerMode.LINEAR, 'Linear'],
        [ViewerMode.PREVIEW, 'Grid'],
        [ViewerMode.FLIPBOOK, 'Flipbook'],
        [ViewerMode.PRINT, 'Print Preview'],
    ];
    const layoutLabels = [
        [SheetLayout.PAGES, '1 Page / Sheet'],
        [SheetLayout.SPREADS, '1 Spread / Sheet'],
        [SheetLayout.BOOKLET, 'Booklet Sheets'],
    ];

    const row = (cls, ...children) => {
        return div(`${cls}.row`, ...children);
    };
    // Button
    const btn = (cls, attrs, label) => {
        return button(`.control.btn${cls}`, attrs, label);
    };
    const dropdown = (attrs, options) => {
        const selectVal = div('.select-val', 'Value');
        const selectEl = select('.select', attrs, ...options);
        selectVal.textContent = selectEl.options[selectEl.selectedIndex].text;
        return div('.select-wrap.control', selectVal, selectEl);
    };
    const enumDropdown = (id, entries, initialValue, changeHandler) => {
        const eventHandler = (e) => {
            const rawVal = e.target.value;
            const chosenEntry = entries.filter(entry => entry[0].toString() === rawVal)[0];
            if (chosenEntry) {
                changeHandler(chosenEntry[0]);
            }
            else {
                throw Error('Selected unknown value');
            }
        };
        return dropdown({ onchange: eventHandler, id }, entries.map(entry => {
            const el = option({ value: entry[0] }, entry[1]);
            if (entry[0] === initialValue) {
                el.selected = true;
            }
            return el;
        }));
    };

    const renderPrintOptions = (state, actions) => {
        const shouldShowMarks = state.paper !== SheetSize.AUTO && state.paper !== SheetSize.AUTO_BLEED;
        const sizeLabels = getSheetSizeLabels(state.pageSize);
        return (
          row(
            '.print-options',
            row(null, enumDropdown('bindery-choose-layout', layoutLabels, state.layout, actions.setLayout)),
            row(null, enumDropdown('bindery-choose-paper', sizeLabels, state.paper, actions.setPaper)),
            shouldShowMarks
              ? row(null, enumDropdown('bindery-choose-marks', marksLabels, state.marks, actions.setMarks))
              : ''
          )
        );
    };
    function binderyExtraButtons(state, actions) {
      return [
        //h('a', '.btn-print.btn-main', { href: 'https://github.com/milahu/alchi' }, 'Github'),
        h('a', '.btn.control', { href: 'https://github.com/milahu/alchi' }, 'Github'),
        // TODO add "Pages" button to select pages to render
        /*
          TODO add "Help" button
          explain print settings:

          print from web browser: google chrome / chromium / ungoogled-chromium (thats what i use)

          maybe select a range of pages (like 1-66) to skip empty last page (bug in bindery)
          resolution: 600 dpi
          enable duplex = print on both sides, flip on short edge
          paper size: A4
          no margins

          chrome creates large PDF files (bug in chrome)
          compress the PDF to 50% file size:
          pdftk input.pdf cat output output.pdf
        */
      ];
    }
    class Controls {
        constructor() {
            this.element = div('.controls');
        }
        update(state, actions) {
            var _a, _b;
            const oldElement = this.element;
            console.log(`Controls.update: render`);
            const newElement = this.render(state, actions);
            const focusedId = document.hasFocus() ? (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.id : undefined;
            oldElement.replaceWith(newElement);
            if (focusedId)
                (_b = document.getElementById(focusedId)) === null || _b === void 0 ? void 0 : _b.focus();
            this.element = newElement;
        }
        render(state, actions) {
            const print = () => {
                actions.setMode(ViewerMode.PRINT);
                setTimeout(window.print, 10);
            };
            const shouldShowPrint = state.mode === ViewerMode.PRINT;
            return (
              div(
                '.controls',
                row('.view-row', enumDropdown('bindery-choose-view', modeLabels, state.mode, actions.setMode)),
                shouldShowPrint ? renderPrintOptions(state, actions) : '',
                ...((binderyExtraButtons && binderyExtraButtons(state, actions)) || []),
                //btn('.btn-print.btn-main', { onclick: print }, 'Print')
                btn('.btn', { onclick: print }, 'Print')
              )
            );
        }
    }

    const padPages = (pages, makePage) => {
        if (pages.length % 2 !== 0) {
            const pg = makePage();
            pages.push(pg);
        }
        const spacerPage = makePage();
        const spacerPage2 = makePage();
        spacerPage.element.style.visibility = 'hidden';
        spacerPage2.element.style.visibility = 'hidden';
        pages.unshift(spacerPage);
        pages.push(spacerPage2);
        return pages;
    };

    const twoPageSpread = (...children) => {
        return div('.spread-wrapper.spread-centered.spread-size', ...children);
    };
    const onePageSpread = (...children) => {
        return div('.spread-wrapper.spread-centered.page-size', ...children);
    };
    function renderLinearViewer(bookPages) {
      console.log('renderLinearViewer')
      const pages = bookPages;
        const linearLayout = document.createDocumentFragment();
        pages.forEach(pg => {
            //console.log(`renderLinearViewer: page`, pg)
            const wrap = onePageSpread(pg.element);
            linearLayout.appendChild(wrap);
        });
        console.log(`renderLinearViewer: return`)
        return {
            element: linearLayout,
        };
    }
    const renderGridViewer = (bookPages, isTwoUp) => {
        const pages = isTwoUp ? padPages(bookPages, () => new Page()) : bookPages;
        const gridLayout = document.createDocumentFragment();
        if (isTwoUp) {
            for (let i = 0; i < pages.length; i += 2) {
                const wrap = twoPageSpread(pages[i].element, pages[i + 1].element);
                gridLayout.appendChild(wrap);
            }
        }
        else {
            pages.forEach(pg => {
                const wrap = onePageSpread(pg.element);
                gridLayout.appendChild(wrap);
            });
        }
        return {
            element: gridLayout,
        };
    };

    const directions = ['top', 'bottom', 'left', 'right'];
    const bleedMarks = () => directions.map(dir => div(`.mark-bleed-${dir}`));
    const cropMarks = () => directions.map(dir => div(`.mark-crop-${dir}`));
    const pageSheetMarks = () => div('.page-size.print-mark-wrap', ...cropMarks(), ...bleedMarks());
    const spreadSheetMarks = () => div('.spread-size.print-mark-wrap', div('.mark-crop-fold'), ...cropMarks(), ...bleedMarks());
    const bookletMeta = (i, len) => {
        const isFront = i % 4 === 0;
        const sheetIndex = Math.round((i + 1) / 4) + 1;
        return div('.print-meta', `Sheet ${sheetIndex} of ${len / 4}: ${isFront ? 'Outside' : 'Inside'}`);
    };

    const orderPagesBooklet = (pages, makePage) => {
        while (pages.length % 4 !== 0) {
            const spacerPage = makePage();
            spacerPage.element.style.visibility = 'hidden';
            pages.push(spacerPage);
        }
        const bookletOrder = [];
        const len = pages.length;
        for (let i = 0; i < len / 2; i += 2) {
            bookletOrder.push(pages[len - 1 - i]);
            bookletOrder.push(pages[i]);
            bookletOrder.push(pages[i + 1]);
            bookletOrder.push(pages[len - 2 - i]);
        }
        return bookletOrder;
    };

    const twoPageSpread$1 = (...children) => {
        return div('.spread-wrapper', ...children);
    };
    const onePageSpread$1 = (...children) => {
        return div('.spread-wrapper', ...children);
    };
    const renderSheetViewer = (bookPages, _doubleSided, layout) => {
        const isTwoUp = layout !== SheetLayout.PAGES;
        const isSpreads = layout === SheetLayout.SPREADS;
        const isBooklet = layout === SheetLayout.BOOKLET;
        let pages = bookPages;
        if (isSpreads)
            pages = padPages(pages, () => new Page());
        else if (isBooklet)
            pages = orderPagesBooklet(pages, () => new Page());
        const printLayout = document.createDocumentFragment();
        const marks = isTwoUp ? spreadSheetMarks : pageSheetMarks;
        const spread = isTwoUp ? twoPageSpread$1 : onePageSpread$1;
        const printSheet = (...children) => {
            return div('.print-sheet', spread(...children));
        };
        if (isTwoUp) {
            for (let i = 0; i < pages.length; i += 2) {
                const spreadMarks = marks();
                if (isBooklet) {
                    const meta = bookletMeta(i, pages.length);
                    spreadMarks.appendChild(meta);
                }
                const sheet = printSheet(div('.page-bleed-clip.page-bleed-clip-left', pages[i]), div('.page-bleed-clip.page-bleed-clip-right', pages[i + 1]), spreadMarks);
                sheet.classList.add(classes.sheetSpread);
                printLayout.appendChild(sheet);
            }
        }
        else {
            pages.forEach(p => {
                const pg = p;
                const sheet = printSheet(pg.element, marks());
                sheet.classList.add(pg.isLeft ? classes.sheetLeft : classes.sheetRight);
                printLayout.appendChild(sheet);
            });
        }
        return {
            element: printLayout,
        };
    };

    const renderFlipbookViewer = (bookPages, doubleSided) => {
        const pages = padPages(bookPages, () => new Page());
        const flipLayout = document.createDocumentFragment();
        const sizer = div('.flipbook-sizer');
        const flapHolder = div('.spread-size.flap-holder');
        sizer.append(flapHolder);
        flipLayout.append(sizer);
        const flaps = [];
        let currentLeaf = -1;
        let leftOffset = 4;
        if (pages.length * leftOffset > 60) {
            leftOffset = 60 / pages.length;
        }
        flapHolder.style.width = `${pages.length * leftOffset}px`;
        const setLeaf = (unclamped) => {
            let n = unclamped;
            if (n === currentLeaf)
                n += 1;
            const newLeaf = Math.min(Math.max(0, n), flaps.length);
            let zScale = 4;
            if (flaps.length * zScale > 200)
                zScale = 200 / flaps.length;
            flaps.forEach((flap, i, arr) => {
                // + 0.5 so left and right are even
                const z = (arr.length - Math.abs(i - newLeaf + 0.5)) * zScale;
                flap.style.transform = `translate3d(${i < newLeaf ? 4 : 0}px,0,${z}px) rotateY(${i < newLeaf ? -180 : 0}deg)`;
            });
            currentLeaf = newLeaf;
        };
        let leafIndex = 0;
        for (let i = 1; i < pages.length - 1; i += doubleSided ? 2 : 1) {
            leafIndex += 1;
            const li = leafIndex;
            const flap = div('.page3d');
            flap.addEventListener('click', () => {
                const newLeaf = li - 1;
                setLeaf(newLeaf);
            });
            const rightPage = pages[i].element;
            let leftPage;
            rightPage.classList.add(prefixer('page3d-front'));
            flap.append(rightPage);
            if (doubleSided) {
                flap.classList.add(prefixer('doubleSided'));
                leftPage = pages[i + 1].element;
            }
            else {
                leftPage = div('.page');
            }
            leftPage.classList.add(prefixer('page3d-back'));
            flap.append(leftPage);
            // TODO: Virtualize stack of pages.
            // Putting 1000s of elements onscreen,
            // espacially as 3d layers, locks up the browser.
            flap.style.left = `${i * leftOffset}px`;
            flaps.push(flap);
            flapHolder.append(flap);
        }
        setLeaf(0);
        return {
            element: flipLayout,
            contentSizer: sizer,
            next: () => setLeaf(currentLeaf + 1),
            previous: () => setLeaf(currentLeaf - 1),
        };
    };

    const getScrollAsPercent = () => {
        if (!document || !document.scrollingElement)
            return 0;
        const el = document.scrollingElement;
        return el.scrollTop / el.scrollHeight;
    };
    const scrollToPercent = (newVal) => {
        if (!document.scrollingElement)
            return;
        const el = document.scrollingElement;
        el.scrollTop = el.scrollHeight * newVal;
    };
    const scrollToBottom = () => {
        const scroll = document.scrollingElement;
        if (!scroll)
            return;
        const scrollMax = scroll.scrollHeight - scroll.offsetHeight;
        scroll.scrollTop = scrollMax;
    };

    /* global BINDERY_VERSION */
    var errorView = (title, text) => {
        return div('.error', div('.error-title', title), div('.error-text', text), div('.error-footer', `Bindery ${BINDERY_VERSION}`));
    };

    const isCommandP = (e) => {
        return (e.ctrlKey || e.metaKey) && e.keyCode === 80;
    };
    // Automatically switch into print mode
    const listenForPrint = (beforePrint) => {
        if (window.matchMedia) {
            const mediaQueryList = window.matchMedia('print');
            mediaQueryList.addListener(mql => {
                if (mql.matches) {
                    // before print
                    beforePrint();
                }
            });
        }
        document.body.addEventListener('keydown', e => {
            if (isCommandP(e)) {
                e.preventDefault();
                beforePrint();
                setTimeout(() => window.print(), 200);
            }
        });
    };

    const throttleProgressBar = throttleFrame();
    const throttleRender = throttleTime(100);
    const throttleResize = throttleTime(50);
    const pageSpread = (...pgs) => {
        return div('.spread-wrapper.spread-centered.spread-size', ...pgs);
    };
    class Viewer {
        constructor({ pageSetup, mode, layout, marks }) {
            this.hasRendered = false;
            this.pageSetup = pageSetup;
            this.controls = new Controls(); // TODO optional
            this.updateControls();
            this.progressBar = div('.progress-bar');
            this.content = div('.zoom-content');
            this.scaler = div('.zoom-scaler', this.content);
            this.element = div('.root', this.progressBar, this.controls.element, this.scaler);
            this.isDoubleSided = true;
            this.sheetLayout = layout;
            this.marks = marks;
            this.mode = mode;
            this.element.classList.add(classes.viewPreview);
            this.currentLeaf = 0;
            listenForPrint(() => {
                this.mode = ViewerMode.PRINT;
                console.log(`Viewer listenForPrint: render`);
                this.render();
            });
            document.body.addEventListener('keydown', (e) => {
                var _a, _b;
                switch (e.key) {
                    case 'ArrowLeft':
                        const prev = (_a = this.currentResult) === null || _a === void 0 ? void 0 : _a.previous;
                        if (prev)
                            prev();
                        break;
                    case 'ArrowRight':
                        const next = (_b = this.currentResult) === null || _b === void 0 ? void 0 : _b.next;
                        if (next)
                            next();
                        break;
                }
            });
            window.addEventListener('resize', () => {
                throttleResize(() => this.scaleToFit());
            });
            this.setInProgress(true);
            this.setMarks(marks);
            this.show();
        }
        updateControls() {
            this.controls.update({
                // Initial props
                paper: this.pageSetup.paper,
                layout: this.sheetLayout,
                mode: this.mode,
                marks: this.marks,
                pageSize: this.pageSetup.displaySize,
            }, {
                // Actions
                setMode: this.setMode.bind(this),
                setPaper: this.setSheetSize.bind(this),
                setLayout: this.setLayout.bind(this), // actions.setLayout
                setMarks: this.setMarks.bind(this),
            });
        }
        setMode(newMode) {
            if (newMode === this.mode)
                return;
            this.mode = newMode;
            this.updateControls();
            console.log(`Viewer setMode: render`);
            this.render();
        }
        get isInProgress() {
            return this.element.classList.contains(classes.inProgress);
        }
        setInProgress(newVal) {
            this.element.classList.toggle(classes.inProgress, newVal);
        }
        get isTwoUp() {
            return this.sheetLayout !== SheetLayout.PAGES;
        }
        setShowingCropMarks(newVal) {
            this.element.classList.toggle(classes.showCrop, newVal);
        }
        setShowingBleedMarks(newVal) {
            this.element.classList.toggle(classes.showBleedMarks, newVal);
        }
        setShowingBleed(newVal) {
            this.element.classList.toggle(classes.showBleed, newVal);
        }
        get isViewing() {
            return window.document.body.classList.contains(classes.isViewing);
        }
        set isViewing(newVal) {
            window.document.body.classList.toggle(classes.isViewing, newVal);
        }
        setSheetSize(newVal) {
            this.pageSetup.paper = newVal;
            this.pageSetup.updateStyleVars();
            this.mode = ViewerMode.PRINT;
            console.log(`Viewer setSheetSize: render`);
            this.render();
            this.scaleToFit();
            setTimeout(() => {
                this.scaleToFit();
            }, 300);
        }
        setLayout(newVal) { // actions.setLayout
            if (newVal === this.sheetLayout)
                return;
            this.sheetLayout = newVal;

            // milahu was here
            // copy-paste from setSheetSize(newVal)
            var sheetSizeChanged = false;
            if (newVal == SheetLayout.PAGES && this.pageSetup.paper != SheetSize.A5_PORTRAIT) {
              this.pageSetup.paper = SheetSize.A5_PORTRAIT;
              sheetSizeChanged = true;
            }
            else if ((newVal == SheetLayout.SPREADS || newVal == SheetLayout.BOOKLET) && this.pageSetup.paper != SheetSize.A4_LANDSCAPE) {
              this.pageSetup.paper = SheetSize.A4_LANDSCAPE;
              sheetSizeChanged = true;
            }

            this.pageSetup.printTwoUp = this.isTwoUp;
            this.pageSetup.updateStyleVars();
            this.mode = ViewerMode.PRINT;
            console.log(`Viewer setLayout: render`);
            this.render();

            // milahu was here
            // copy-paste from setSheetSize(newVal)
            if (sheetSizeChanged) {
              this.scaleToFit();
              setTimeout(() => {
                  this.scaleToFit();
              }, 300);
            }
        }
        setMarks(newVal) {
            this.marks = newVal;
            this.updateControls();
            this.setShowingCropMarks(newVal === SheetMarks.CROP || newVal === SheetMarks.BOTH);
            this.setShowingBleedMarks(newVal === SheetMarks.BLEED || newVal === SheetMarks.BOTH);
        }
        displayError(title, text) {
            this.show();
            if (!this.error) {
                this.error = errorView(title, text);
                this.element.append(this.error);
                scrollToBottom();
                if (this.book) {
                    const flow = this.book.currentPage.flow;
                    if (flow)
                        flow.currentElement.style.outline = '3px solid red';
                }
            }
        }
        clear() {
            this.book = undefined;
            this.lastSpreadInProgress = undefined; // TODO: Make this clearer, after first render
            this.content.innerHTML = '';
        }
        show() {
            if (this.element.parentNode)
                return;
            window.document.body.appendChild(this.element);
            this.isViewing = true;
        }
        hide() {
            var _a;
            // TODO this doesn't work if the target is an existing node
            (_a = this.element.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(this.element);
            this.isViewing = false;
        }
        render(newBook) {
            console.log(`render`);
            if (newBook) {
                console.log(`render: this.book = newBook`);
                this.book = newBook;
            }
            if (!this.book) {
                console.log(`render: this.book is empty -> return`);
                return;
            }
            console.log(`render: add style for mode`);
            this.element.classList.remove(...allModeClasses);
            this.element.classList.add(classForMode(this.mode));
            console.log(`render: show`);
            this.show();
            console.log(`render: updateControls`);
            this.updateControls();
            console.log(`render: updateControls`);
            // FIXME call classForMode earlier
            /*
            this.element.classList.remove(...allModeClasses);
            this.element.classList.add(classForMode(this.mode));
            */
            this.setShowingBleed(this.mode === ViewerMode.PRINT);
            console.log(`render: getScrollAsPercent`);
            const prevScroll = getScrollAsPercent();
            console.log(`render: getScrollAsPercent -> ${prevScroll}`);
            this.setProgressAmount(1);
            console.log(`render: requestAnimationFrame`);

            // FIXME this is where the layout "snaps" after loading
            window.requestAnimationFrame(() => {
                console.log(`render: requestAnimationFrame: renderViewMode`);
                const result = this.renderViewMode();
                this.currentResult = result;
                this.content.innerHTML = '';
                this.content.append(result.element);
                if (!this.hasRendered) {
                    console.log(`render: requestAnimationFrame: hasRendered = true`);
                    this.hasRendered = true;
                }
                else {
                    console.log(`render: requestAnimationFrame: scrollToPercent ${prevScroll}`);
                    scrollToPercent(prevScroll);
                }
                console.log(`render: requestAnimationFrame: scaleToFit`);
                this.scaleToFit();
            });
        }
        renderViewMode() {
            console.log(`renderViewMode`)
            if (!this.book)
                throw Error('Book missing');
            const pages = this.book.pages.slice();
            switch (this.mode) {
                case ViewerMode.PREVIEW:
                    return renderGridViewer(pages, this.isDoubleSided);
                case ViewerMode.FLIPBOOK:
                    return renderFlipbookViewer(pages, this.isDoubleSided);
                    case ViewerMode.PRINT:
                    return renderSheetViewer(pages, this.isDoubleSided, this.sheetLayout);
                case ViewerMode.LINEAR:
                    return renderLinearViewer(pages);
                default:
                    throw Error(`Invalid layout mode: ${this.mode} (type ${typeof this.mode})`);
            }
        }
        setProgressAmount(newVal) {
            if (newVal < 1) {
                throttleProgressBar(() => {
                    this.progressBar.style.transform = `scaleX(${newVal})`;
                });
            }
            else {
                this.progressBar.style.transform = '';
            }
        }
        updateProgress(book, estimatedProgress) {
            this.book = book;
            this.setProgressAmount(estimatedProgress);
            if (!window.document.scrollingElement)
                return;
            const scroller = window.document.scrollingElement;
            // don't bother rerendering if preview is out of view
            const scrollTop = scroller.scrollTop;
            const scrollH = scroller.scrollHeight;
            const h = scroller.offsetHeight;
            if (scrollH > h * 3 && scrollTop < h)
                return;
            // don't rerender too often
            throttleRender(() => this.renderProgress(book, estimatedProgress));
        }
        renderProgress(book, estimatedProgress) {
            const needsZoomUpdate = !this.content.firstElementChild;
            const sideBySide = this.mode === ViewerMode.PREVIEW ||
                (this.mode === ViewerMode.PRINT &&
                    this.sheetLayout !== SheetLayout.PAGES);
            const limit = sideBySide ? 2 : 1;
            book.pages.forEach((page, i) => {
                if (this.content.contains(page.element) &&
                    page.element.parentNode !== this.content)
                    return;
                if (this.lastSpreadInProgress &&
                    this.lastSpreadInProgress.children.length < limit) {
                    this.lastSpreadInProgress.append(page.element);
                    return;
                }
                this.lastSpreadInProgress = pageSpread(page.element);
                if (i === 0 && sideBySide) {
                    const spacer = new Page();
                    spacer.element.style.visibility = 'hidden';
                    this.lastSpreadInProgress.insertBefore(spacer.element, this.lastSpreadInProgress.firstElementChild);
                }
                this.content.append(this.lastSpreadInProgress);
            });
            if (needsZoomUpdate)
                this.scaleToFit();
        }
        scaleToFit() {
            if (!this.content.firstElementChild)
                return;
            const prevScroll = getScrollAsPercent();
            const { xScale, yScale } = this.scaleThatFits();
            const scale = this.mode === ViewerMode.FLIPBOOK
                ? Math.min(1, xScale, yScale)
                : Math.min(1, xScale);
            this.scaler.style.transform = `scale(${scale})`;
            scrollToPercent(prevScroll);
        }
        scaleThatFits() {
            var _a, _b;
            const contentEl = (_b = (_a = this.currentResult) === null || _a === void 0 ? void 0 : _a.contentSizer) !== null && _b !== void 0 ? _b : this.content;
            const availableSize = {
                width: window.innerWidth,
                height: window.innerHeight - 40,
            };
            // Note use of offsetWidth rather than getBoundingClientRect
            // so we can calculate using untransformed/unscaled dimensions
            const contentSize = {
                width: contentEl.offsetWidth,
                height: contentEl.offsetHeight,
            };
            const xScale = availableSize.width / contentSize.width;
            const yScale = availableSize.height / contentSize.height;
            return { xScale, yScale };
        }
    }

    /* global BINDERY_VERSION */
    const vals = (obj) => {
        return Object.keys(obj).map(k => obj[k]);
    };
    const nextFrame = () => new Promise(resolve => {
        requestAnimationFrame(t => resolve(t));
    });
    class Bindery {
        constructor(opts) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            console.log(`bindery Bindery ${BINDERY_VERSION}`);
            validateRuntimeOptions(opts, {
                name: 'makeBook',
                autorun: RuntimeTypes.bool,
                content: RuntimeTypes.any,
                view: RuntimeTypes.enum(...vals(ViewerMode)),
                pageNumberOffset: RuntimeTypes.number,
                pageSetup: RuntimeTypes.shape({
                    name: 'pageSetup',
                    margin: RuntimeTypes.margin,
                    size: RuntimeTypes.size,
                }),
                printSetup: RuntimeTypes.shape({
                    name: 'printSetup',
                    bleed: RuntimeTypes.length,
                    layout: RuntimeTypes.enum(...vals(SheetLayout)),
                    marks: RuntimeTypes.enum(...vals(SheetMarks)),
                    paper: RuntimeTypes.enum(...vals(SheetSize)),
                }),
                rules: RuntimeTypes.array,
                onResult: RuntimeTypes.function,
            });
            this.autorun = (_a = opts.autorun) !== null && _a !== void 0 ? _a : true;
            this.autoupdate = (_b = opts.autoupdate) !== null && _b !== void 0 ? _b : false;
            this.pageSetup = new PageSetup(opts.pageSetup, opts.printSetup);
            const startLayout = (_d = (_c = opts.printSetup) === null || _c === void 0 ? void 0 : _c.layout) !== null && _d !== void 0 ? _d : SheetLayout.PAGES;
            const startMarks = (_f = (_e = opts.printSetup) === null || _e === void 0 ? void 0 : _e.marks) !== null && _f !== void 0 ? _f : SheetMarks.CROP;
            this.viewer = new Viewer({
                pageSetup: this.pageSetup,
                mode: (_g = opts.view) !== null && _g !== void 0 ? _g : ViewerMode.PREVIEW,
                marks: startMarks,
                layout: startLayout,
            });
            if (!opts.content) {
                this.viewer.displayError('Content not specified', 'You must include a source element, selector, or url');
                throw Error('Bindery: You must include a source element or selector');
            }
            if (opts.hasOwnProperty('ControlsComponent')) {
                this.viewer.displayError('Controls are now included', 'Please remove the controls component');
                throw Error('Bindery: controls are now included');
            }
            this.rules = attributeRules;
            this.rules.push(new Rule({ pageNumberOffset: (_h = opts.pageNumberOffset) !== null && _h !== void 0 ? _h : 0 }));
            (_j = opts.rules) === null || _j === void 0 ? void 0 : _j.forEach(rule => {
                if (rule instanceof rules.Rule) {
                    this.rules.push(rule);
                }
                else {
                    throw Error(`Bindery: The following is not an instance of Bindery.Rule and will be ignored: ${rule}`);
                }
            });
            this.onResult = opts.onResult || null;
            if (this.autorun)
                this.makeBook(opts.content);
        }
        // Convenience constructor
        static makeBook(opts) {
            var _a;
            opts.autorun = (_a = opts.autorun) !== null && _a !== void 0 ? _a : true;
            return new Bindery(opts);
        }
        cancel() {
            this.viewer.hide();
            if (this.content)
                this.content.style.display = '';
        }
        async makeBook(contentDescription) {
            try {
                this.content = await getContentAsElement(contentDescription);
            }
            catch (e) {
                this.viewer.show();
                this.viewer.displayError('', e.message);
                // throw e;
                return undefined;
            }
            this.content.style.display = '';
            const content = this.content.cloneNode(true);
            this.content.style.display = 'none';
            this.viewer.clear(); // In case we're updating an existing layout
            this.viewer.show();
            this.pageSetup.updateStyleVars();
            this.viewer.setInProgress(true);
            const onProgress = (currentBook, progress) => {
                this.viewer.updateProgress(currentBook, progress);
            };
            try {
                const book = await makeBook(content, this.rules, onProgress, this.onResult);
                this.viewer.setProgressAmount(1);
                await nextFrame();
                this.viewer.render(book);
                this.viewer.setInProgress(false);
                return book;
            }
            catch (e) {
                this.viewer.setInProgress(false);
                this.viewer.displayError("Layout couldn't complete", e.message);
                // throw e;
                console.error(e);
                return undefined;
            }
        }
    }

    ___$insertStyle(`

.bindery-page {
  width: var(--bindery-page-width);
  height: var(--bindery-page-height);
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.bindery-continuation {
  text-indent: unset !important;
}

li.continuation {
  list-style: none !important;
}

.bindery-flow-box {
  position: relative;
  margin-top: var(--bindery-margin-top);
  flex: 1 1 auto;
  min-height: 0;
}

.bindery-footer {
  margin-top: 8pt;
  margin-bottom: var(--bindery-margin-bottom);
  flex: 0 1 auto;
  z-index: 2;
}

.bindery-flow-box,
.bindery-footer {
  margin-left: var(--bindery-margin-inner);
  margin-right: var(--bindery-margin-outer);
}

.bindery-left .bindery-flow-box,
.bindery-left .bindery-footer {
  margin-left: var(--bindery-margin-outer);
  margin-right: var(--bindery-margin-inner);
}

.bindery-page-background {
  position: absolute;
  z-index: 0;
  overflow: hidden;
  top: calc(-1 * var(--bindery-bleed));
  bottom: calc(-1 * var(--bindery-bleed));
  left: calc(-1 * var(--bindery-bleed));
  right: calc(-1 * var(--bindery-bleed));
}
.bindery-left > .bindery-page-background {
  right: 0;
}
.bindery-right > .bindery-page-background {
  left: 0;
}

.bindery-sup {
  font-size: 0.667em;
}

.bindery-running-header,
.bindery-footer {
  font-size: 10pt;
}

.bindery-running-header {
  position: absolute;
  text-align: center;
  /* quickfix
  https://github.com/evnbr/bindery/issues/128
  running header ignores top margin
  */
  /*top: 0.25in;*/
  top: var(--bindery-margin-top);
  margin-top: -1.5em;
}
.bindery-left .bindery-running-header {
  text-align: left;
  left: var(--bindery-margin-outer);
}
.bindery-right .bindery-running-header {
  right: var(--bindery-margin-outer);
  text-align: right;
}

.bindery-page-size-rotated {
  height: var(--bindery-page-width);
  /* milahu
  width: var(--bindery-page-height);
  */
}

.bindery-spread-size {
  /* milahu
  height: var(--bindery-page-height);
  */
  width: calc(var(--bindery-page-width) * 2);
}

.bindery-spread-size-rotated {
  /* milahu
  width: var(--bindery-page-height);
  */
  height: calc(var(--bindery-page-width) * 2);
}

.bindery-spread.bindery-right > .bindery-page-background {
  left: calc(-100% - var(--bindery-bleed));
}

.bindery-spread.bindery-left > .bindery-page-background {
  right: calc(-100% - var(--bindery-bleed));
}

@media screen {
  .bindery-viewing .bindery-controls {
    display: flex !important;
  }
}

.bindery-controls {
  font: 14px/1.4 -apple-system, BlinkMacSystemFont, "Roboto", sans-serif;
  display: none;
  flex-direction: row;
  align-items: start;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  margin: auto;
  color: var(--bindery-ui-text);
  padding: 8px;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
}
.bindery-controls * {
  font: inherit;
  color: inherit;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.bindery-controls a {
  color: var(--bindery-ui-accent);
  text-decoration: none;
}

.bindery-row {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  cursor: default;
  user-select: none;
}

.bindery-controls .bindery-btn {
  -webkit-appearance: none;
  cursor: pointer;
  display: inline-block;
  margin-right: 8px;
  text-decoration: none;
}
.bindery-controls .bindery-btn:hover {
  background: rgba(0, 0, 0, 0.04);
}
.bindery-controls .bindery-btn:active {
  background: rgba(0, 0, 0, 0.08);
}
.bindery-controls .bindery-btn:last-child {
  margin-right: 0;
}

.bindery-control {
  border-radius: 6px;
  color: var(--bindery-ui-text);
  padding: 4px 8px;
  border: 1px solid #ddd;
  margin-right: 12px;
}

.bindery-controls .bindery-btn-main {
  position: absolute;
  top: 8px;
  right: 8px;
  /*
  background: var(--bindery-ui-accent);
  border-color: var(--bindery-ui-accent);
  color: white;
  */
}
/*
.bindery-controls .bindery-btn-main:hover {
  background: var(--bindery-ui-accent);
  opacity: 0.7;
}
.bindery-controls .bindery-btn-main:active {
  background: black;
  opacity: 1;
}
.bindery-controls .bindery-btn-main:focus {
  outline: 0;
  box-shadow: 0 0 0 1px var(--bindery-ui-bg), 0 0 0 3px rgba(0, 0, 0, 0.3);
}
*/

.bindery-controls .bindery-btn-main:hover {
  background: rgba(0, 0, 0, 0.04);
}
.bindery-controls .bindery-btn-main:active {
  background: rgba(0, 0, 0, 0.08);
}


.bindery-view-row {
  transition: all 0.3s;
}
.bindery-in-progress .bindery-view-row {
  opacity: 0;
  pointer-events: none;
}
.bindery-debug .bindery-view-row {
  display: none;
}

.bindery-btn-print {
  margin-left: auto;
  transition: all 0.3s;
}
.bindery-in-progress .bindery-btn-print {
  opacity: 0;
  pointer-events: none;
}

.bindery-controls .bindery-select-wrap {
  padding-right: 24px;
  transition: all 0.2s;
  white-space: nowrap;
  width: 100%;
  position: relative;
}
.bindery-controls .bindery-select-wrap:after {
  content: "";
  position: absolute;
  right: 9px;
  top: 12px;
  border-bottom: 1px solid;
  border-right: 1px solid;
  padding: 0px;
  border: 4px solid transparent;
  border-top-color: currentColor;
}
.bindery-controls .bindery-select-wrap:hover {
  background: rgba(0, 0, 0, 0.04);
}
.bindery-controls .bindery-select-wrap:active {
  background: rgba(0, 0, 0, 0.08);
}
.bindery-controls .bindery-select-wrap:focus-within {
  outline: 0;
  box-shadow: 0 0 0 1px var(--bindery-ui-bg), 0 0 0 3px rgba(0, 0, 0, 0.3);
}

.bindery-select {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 4px 8px;
  color: black;
  border: transparent;
  width: 100%;
  font-size: 18px;
}

.bindery-view-print .bindery-controls {
  background: var(--bindery-ui-bg);
}

/*
@media screen and (max-width: 960px) {
*/
/* switch: horizontal menu - vertical menu. maybe useful for narrow screens (mobile)
@media screen and (max-width: 500px) {
  .bindery-view-print .bindery-controls,
  .bindery-view-preview .bindery-controls,
  .bindery-view-linear .bindery-controls {
    background: var(--bindery-ui-bg);
    flex-direction: column;
  }
}
*/
@media screen and (max-width: 500px) {
  .bindery-view-print .bindery-controls {
    background: var(--bindery-ui-bg);
  }

  .bindery-view-row {
    margin-bottom: 8px;
  }

  .bindery-print-options {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }
  .bindery-print-options .bindery-row + .bindery-row {
    margin-top: 8px;
  }
  .bindery-print-options .bindery-select-wrap {
    margin: 0;
  }
}
.bindery-rotate-container.bindery-rotate-clockwise,
.bindery-left .bindery-rotate-container.bindery-rotate-spread-clockwise,
.bindery-right .bindery-rotate-container.bindery-rotate-inward,
.bindery-left .bindery-rotate-container.bindery-rotate-outward {
  transform: rotate(90deg) translate3d(0, -100%, 0);
  transform-origin: top left;
}

.bindery-rotate-container.bindery-rotate-counterclockwise,
.bindery-left .bindery-rotate-container.bindery-rotate-spread-counterclockwise,
.bindery-left .bindery-rotate-container.bindery-rotate-inward,
.bindery-right .bindery-rotate-container.bindery-rotate-outward {
  transform: rotate(-90deg) translate3d(-100%, 0, 0);
  transform-origin: top left;
}

.bindery-rotate-container {
  position: absolute;
}
.bindery-left .bindery-rotate-container.bindery-rotate-clockwise .bindery-page-background {
  top: 0;
}
.bindery-right .bindery-rotate-container.bindery-rotate-clockwise .bindery-page-background {
  bottom: 0;
}
.bindery-left .bindery-rotate-container.bindery-rotate-counterclockwise .bindery-page-background {
  bottom: 0;
}
.bindery-right .bindery-rotate-container.bindery-rotate-counterclockwise .bindery-page-background {
  top: 0;
}
.bindery-rotate-container.bindery-rotate-inward .bindery-page-background {
  bottom: 0;
}
.bindery-rotate-container.bindery-rotate-outward .bindery-page-background {
  top: 0;
}
.bindery-right .bindery-rotate-container.bindery-rotate-spread-clockwise {
  transform: rotate(90deg) translate3d(0, -50%, 0);
  transform-origin: top left;
}
.bindery-right .bindery-rotate-container.bindery-rotate-spread-counterclockwise {
  transform: rotate(-90deg) translate3d(-100%, -50%, 0);
  transform-origin: top left;
}

:root {
  --bindery-ui-bg: #f4f4f4;
  --bindery-ui-accent: black;
  --bindery-ui-text: black;
}

@media screen {
  .bindery-root {
    transition: opacity 0.2s;
    opacity: 1;
    background: var(--bindery-ui-bg);
    z-index: 99;
    position: relative;
    min-height: 100vh;
  }

  .bindery-progress-bar {
    transform-origin: top left;
    transform: scaleY(0);
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    background: var(--bindery-ui-accent);
    transition: transform 0.2s;
    height: 2px;
    z-index: 99;
  }
  .bindery-in-progress .bindery-progress-bar {
    transform: scaleX(0);
  }

  .bindery-zoom-content {
    padding: 10px;
    background: var(--bindery-ui-bg);
    margin: auto;
  }
  .bindery-view-preview .bindery-zoom-content {
    min-width: calc(20px + var(--bindery-spread-width));
  }
  .bindery-view-linear .bindery-zoom-content {
    min-width: calc(20px + var(--bindery-page-width));
  }

  .bindery-view-linear .bindery-page {
    zoom: 2; /* quickfix */ /* FIXME this breaks on mobile screens. pages overflow, overflow is hidden */
  }
  @media screen and (max-width: 960px) {
    .bindery-view-linear .bindery-page {
      zoom: 1; /* quickfix for mobile screens */
    }
  }

  .bindery-view-print .bindery-zoom-content {
    min-width: calc(20px + var(--bindery-sheet-width));
  }
  .bindery-zoom-content > .bindery-page {
    margin: auto;
  }

  .bindery-measure-area {
    position: fixed;
    padding: 50px 20px;
    z-index: 99;
    visibility: hidden;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    overflow: hidden;
  }

  .bindery-is-overflowing {
    border-bottom: 1px solid magenta;
  }

  .bindery-print-sheet {
    margin: 0 auto;
  }

  .bindery-error {
    font: 16px/1.4 -apple-system, BlinkMacSystemFont, "Roboto", sans-serif;
    padding: 15vh 15vw;
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(244, 244, 244, 0.7);
  }
  .bindery-error-title {
    font-size: 1.5em;
    margin-bottom: 16px;
  }
  .bindery-error-text {
    margin-bottom: 16px;
    white-space: pre-line;
  }
  .bindery-error-footer {
    opacity: 0.5;
    font-size: 0.66em;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  .bindery-show-bleed .bindery-print-sheet {
    background: white;
    outline: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
    margin: 20px auto;
  }
}
@media screen {
  .bindery-page {
    background: white;
    box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.3);
    overflow: hidden;
  }
  .bindery-show-bleed .bindery-page {
    box-shadow: none;
    overflow: visible;
  }
  /*
  * https://github.com/evnbr/bindery/issues/127
  * cant select text in "print preview" mode
  .bindery-show-bleed .bindery-page:after {
    content: "";
    outline: 1px dotted rgba(0, 255, 255, 0.7);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 99;
  }
  */

  .bindery-placeholder-num {
    visibility: hidden !important;
  }
}
.bindery-print-sheet {
  width: var(--bindery-sheet-width);
  height: var(--bindery-sheet-height);
}

.bindery-page-bleed-clip {
  overflow: hidden;
}

.bindery-page-bleed-clip-left {
  padding-left: calc(var(--bindery-bleed) + 12pt);
}

.bindery-page-bleed-clip-right {
  padding-right: calc(var(--bindery-bleed) + 12pt);
}

.bindery-show-crop .bindery-print-sheet .bindery-page-bleed-clip,
.bindery-show-bleed-marks .bindery-print-sheet .bindery-page-bleed-clip {
  padding-top: calc(var(--bindery-bleed) + 12pt);
  padding-bottom: calc(var(--bindery-bleed) + 12pt);
}

.bindery-print-sheet-spread .bindery-spread-wrapper {
  margin-left: auto;
  margin-right: auto;
}

.bindery-viewing {
  margin: 0;
}

.bindery-zoom-scaler {
  transform-origin: top left;
  transform-style: preserve-3d;
}

.bindery-print-sheet {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.bindery-print-sheet-left {
  justify-content: left;
}

.bindery-print-sheet-right {
  justify-content: right;
}

.bindery-spread-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  margin: auto;
}

.bindery-spread-centered {
  margin: 0 auto 32px;
}

@page {
  margin: 0;
}
@media print {
  .bindery-root * {
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
  }

  .bindery-controls {
    display: none !important;
  }

  .bindery-print-sheet {
    contain: layout;
    /* prevent margin collapse */
    margin: 0 auto;
    page-break-after: always;
  }

  .bindery-zoom-scaler[style] {
    transform: none !important;
  }
}
.bindery-print-mark-wrap {
  display: none;
  position: absolute;
  pointer-events: none;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  margin: auto;
}
.bindery-show-crop .bindery-print-mark-wrap, .bindery-show-bleed-marks .bindery-print-mark-wrap {
  display: block;
}
.bindery-show-crop .bindery-print-mark-wrap > [class*=crop] {
  display: block;
}
.bindery-show-bleed-marks .bindery-print-mark-wrap > [class*=bleed] {
  display: block;
}
.bindery-print-mark-wrap > div {
  display: none;
  position: absolute;
  overflow: hidden;
}
.bindery-print-mark-wrap > div::before, .bindery-print-mark-wrap > div::after {
  content: "";
  display: block;
  position: absolute;
}
.bindery-print-mark-wrap > div:before {
  top: 0;
  left: 0;
}
.bindery-print-mark-wrap > div:after {
  bottom: 0;
  right: 0;
}

.bindery-mark-crop-fold,
.bindery-mark-crop-left,
.bindery-mark-crop-right,
.bindery-mark-bleed-left,
.bindery-mark-bleed-right {
  width: 1px;
  margin: auto;
}
.bindery-mark-crop-fold::before, .bindery-mark-crop-fold:after, .bindery-mark-crop-left::before, .bindery-mark-crop-left:after, .bindery-mark-crop-right::before, .bindery-mark-crop-right:after, .bindery-mark-bleed-left::before, .bindery-mark-bleed-left:after, .bindery-mark-bleed-right::before, .bindery-mark-bleed-right:after {
  width: 1px;
  height: var(--bindery-mark-length);
  background-image: linear-gradient(to right, black 0%, black 51%, transparent 51%);
  background-size: 1px 100%;
}

.bindery-mark-crop-top,
.bindery-mark-crop-bottom,
.bindery-mark-bleed-top,
.bindery-mark-bleed-bottom {
  height: 1px;
}
.bindery-mark-crop-top::before, .bindery-mark-crop-top:after, .bindery-mark-crop-bottom::before, .bindery-mark-crop-bottom:after, .bindery-mark-bleed-top::before, .bindery-mark-bleed-top:after, .bindery-mark-bleed-bottom::before, .bindery-mark-bleed-bottom:after {
  width: var(--bindery-mark-length);
  height: 1px;
  background-image: linear-gradient(to bottom, black 0%, black 51%, transparent 51%);
  background-size: 100% 1px;
}

.bindery-mark-crop-fold {
  right: 0;
  left: 0;
}
.bindery-mark-crop-left {
  left: 0;
}
.bindery-mark-crop-right {
  right: 0;
}
.bindery-mark-crop-top {
  top: 0;
}
.bindery-mark-crop-bottom {
  bottom: 0;
}

.bindery-print-meta {
  padding: var(--bindery-mark-length);
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, "Roboto", sans-serif;
  font-size: 8pt;
  display: block !important;
  position: absolute;
  bottom: -60pt;
  left: 0;
  right: 0;
}

.bindery-mark-bleed-left,
.bindery-mark-bleed-right,
.bindery-mark-crop-left,
.bindery-mark-crop-right,
.bindery-mark-crop-fold {
  top: calc(-1 * var(--bindery-mark-length) - var(--bindery-bleed));
  bottom: calc(-1 * var(--bindery-mark-length) - var(--bindery-bleed));
}

.bindery-mark-bleed-top,
.bindery-mark-bleed-bottom,
.bindery-mark-crop-top,
.bindery-mark-crop-bottom {
  left: calc(-12pt - var(--bindery-bleed));
  right: calc(-12pt - var(--bindery-bleed));
}

.bindery-mark-bleed-left {
  left: calc(-1 * var(--bindery-bleed));
}

.bindery-mark-bleed-right {
  right: calc(-1 * var(--bindery-bleed));
}

.bindery-mark-bleed-top {
  top: calc(-1 * var(--bindery-bleed));
}

.bindery-mark-bleed-bottom {
  bottom: calc(-1 * var(--bindery-bleed));
}

.bindery-root.bindery-view-flip {
  max-height: 100vh;
}

.bindery-view-flip .bindery-zoom-holder {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  display: block;
}
.bindery-view-flip .bindery-zoom-scaler {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  transform-origin: center;
  width: 0;
  height: 0;
}
.bindery-view-flip .bindery-zoom-content {
  min-width: 0;
}

.bindery-flap-holder {
  perspective: 5000px;
  transform-style: preserve-3d;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.bindery-flipbook-sizer {
  --bindery-flipbook-width: calc(var(--bindery-spread-width) * 1.15);
  --bindery-flipbook-height: calc(var(--bindery-page-height) * 1.05);
  position: absolute;
  width: var(--bindery-flipbook-width);
  height: var(--bindery-flipbook-height);
  top: calc(var(--bindery-flipbook-height) * -0.5);
  left: calc(var(--bindery-flipbook-width) * -0.5);
}

.bindery-page3d {
  margin: auto;
  width: var(--bindery-page-width);
  /* milahu
  height: var(--bindery-page-height);
  */
  transform: rotateY(0);
  transform-style: preserve-3d;
  transform-origin: left;
  transition: transform 0.5s, box-shadow 0.1s;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.bindery-page3d:hover {
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.2);
}
.bindery-page3d.bindery-flipped {
  transform: rotateY(-180deg);
}
.bindery-page3d .bindery-page {
  position: absolute;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
}
.bindery-page3d .bindery-page3d-front {
  transform: rotateY(0);
}
.bindery-page3d .bindery-page3d-back {
  transform: rotateY(-180deg);
}

`);

    /* global BINDERY_VERSION */
    const constants = {
        View: ViewerMode,
        Paper: SheetSize,
        Layout: SheetLayout,
        Marks: SheetMarks,
        version: BINDERY_VERSION
    };
    const BinderyWithRules = Object.assign(Bindery, rules, constants);

    return BinderyWithRules;

})));
