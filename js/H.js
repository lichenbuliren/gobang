/**
 * Heaven's JS 库
 * @version 1.0.0
 * @author Heaven
 * @description 常用的JS库，原生JS操作;联系方式：lichenbuliren@gmail.com/https://github.com/lichenbuliren
 * @return {[type]} [description]
 */
(function (w, d) {

    if (!window.H) {
        window.H = {};
    }

    var location = window.location,
        dElements = d.documentElement,
        userAgent = navigator.userAgent.toLowerCase(),
        ie6 = /msie 6.0/.test(userAgent),
        opera = /opera/.test(userAgent),
        ie = /msie/.test(userAgent) && !opera,
        safari = /webkit/.test(userAgent),
        ff = /firefox/.test(userAgent);

    var tip = {
        require: '缺少参数，参数为必须的',
        rule: '参数不合法'
    }

    H = {
        name: 'Heaven\'s Javascript Libary',
        version: '1.0.0',
        debug: true,
        namespace: function (name) {
            var parts = name.split('.'),
                cur = H;
            for (var i in parts) {
                if (!cur[parts[i]]) {
                    cur[parts[i]] = {};
                }
                cur = cur[parts[i]];
            }
        },

        Dom: {
            getElementById: function (id) {
                return typeof id === 'string' ? d.getElementById(id) : id;
            },
            /**
             * 根据类名获取dom元素
             * @param  {String} parent    父级元素
             * @param  {String} cls       查询的类名
             * @return {[type]}           [description]
             */
            getByClass: function (cls, parent) {
                parent = parent || d;
                if (parent.getElementsByClassName) {
                    return parent.getElementsByClassName(cls);
                } else {
                    var res = [],
                        reg = new RegExp('^|\\s' + cls + '($|\\s)', 'i'),
                        ele = parent.getElementsByTagName('*');
                    for (var i = 0; i < ele.length; i++) {
                        if (reg.test(ele[i].className)) {
                            res.push(ele[i]);
                        }
                    }
                    return res;
                }
            },

            /**
             * 构建dom元素
             * @param  {[type]} type [description]
             * @param  {[type]} prop [description]
             * @return {[type]}      [description]
             */
            createElement: function (type, prop) {
                var tmp = d.createElement(type);
                for (var i in prop) {
                    tmp.setAttribute(i, prop[i]);
                }
                return tmp;
            },

            /**
             * 判断dom对象是否包含class类
             * @param  {[type]}  obj [description]
             * @param  {[type]}  cls [description]
             * @return {Boolean}     [description]
             */
            hasClass: function (obj, cls) {
                return obj.className.match(new RegExp('^|\\s' + cls + '$|\\s', 'i'));
            },

            /**
             * 添加class
             * @param {[type]} obj [description]
             * @param {[type]} cls [description]
             */
            addClass: function (obj, cls) {
                if (!this.hasClass(obj, cls)) {
                    obj.className += ' ' + cls;
                }
            },

            /**
             * 移除dom元素的class
             * @param  {[type]} obj [description]
             * @param  {[type]} cls [description]
             * @return {[type]}     [description]
             */
            removeClass: function (obj, cls) {
                if (this.hasClass(obj, cls)) {
                    var reg = new RegExp('^|\\s' + cls + '$|\\s');
                    obj.className = obj.className.replace(reg, '');
                }
            },

            toggleClass: function (obj, cls) {
                if (this.hasClass(obj, cls)) {
                    this.removeClass(obj, cls);
                } else {
                    this.addClass(obj, cls);
                }
            },

            html: function (obj, html) {
                if (html) {
                    obj.innerHTML = html;
                } else {
                    return obj.innerHTML;
                }
            },

            text: function (obj, text) {
                if (text) {
                    if (document.textContent) {
                        obj.textContent = text;
                    } else {
                        obj.innerText = text;
                    }
                } else {
                    return obj.innerText;
                }
            }
        },

        Events: {
            // 添加事件
            addEvent: function (element, type, handler) {
                if (element.addEventListener) {
                    //事件类型、需要执行的函数、是否捕捉
                    element.addEventListener(type, handler, false);
                } else if (element.attachEvent) {
                    element.attachEvent('on' + type, function () {
                        handler.call(element);
                    });
                } else {
                    element['on' + type] = handler;
                }
            },
            // 移除事件
            removeEvent: function (element, type, handler) {
                if (element.removeEnentListener) {
                    element.removeEnentListener(type, handler, false);
                } else if (element.datachEvent) {
                    element.detachEvent('on' + type, function () {
                        handler.call(element);
                    });
                } else {
                    element['on' + type] = null;
                }
            },
            // 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
            stopPropagation: function (ev) {
                if (ev.stopPropagation) {
                    ev.stopPropagation();
                } else {
                    ev.cancelBubble = true;
                }
            },
            // 取消事件的默认行为
            preventDefault: function (event) {
                if (event.preventDefault) {
                    event.preventDefault();
                } else {
                    event.returnValue = false;
                }
            },
            // 获取事件目标
            getTarget: function (event) {
                return event.target || event.srcElement;
            },
            // 获取event对象的引用，取到事件的所有信息，确保随时能使用event；
            getEvent: function (e) {
                var ev = e || window.event;
                if (!ev) {
                    var c = this.getEvent.caller;
                    while (c) {
                        ev = c.arguments[0];
                        if (ev && Event == ev.constructor) {
                            break;
                        }
                        c = c.caller;
                    }
                }
                return ev;
            }
        }
    }

})(window, document);