/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Game = __webpack_require__(1);
	
	var _Game2 = _interopRequireDefault(_Game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//this is our game context
	window.Tetris = {
	    canvas: document.getElementById("game-canvas"),
	    entities: new Map(),
	    context: document.getElementById("game-canvas").getContext("2d"),
	    document: document,
	    lost: false,
	    //@TODO this colud go to some settings
	    speed: 1,
	    isStarted: true,
	    withPreview: true
	};
	
	var g = new _Game2.default(Tetris);
	g.start();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Utils = __webpack_require__(2);
	
	var _Utils2 = _interopRequireDefault(_Utils);
	
	var _Render = __webpack_require__(24);
	
	var _Render2 = _interopRequireDefault(_Render);
	
	var _BoardAssemblage = __webpack_require__(32);
	
	var _BoardAssemblage2 = _interopRequireDefault(_BoardAssemblage);
	
	var _ScoreAssemblage = __webpack_require__(44);
	
	var _ScoreAssemblage2 = _interopRequireDefault(_ScoreAssemblage);
	
	var _UserInput = __webpack_require__(47);
	
	var _UserInput2 = _interopRequireDefault(_UserInput);
	
	var _TetrominoGenerator = __webpack_require__(50);
	
	var _TetrominoGenerator2 = _interopRequireDefault(_TetrominoGenerator);
	
	var _ActionQueue = __webpack_require__(57);
	
	var _ActionQueue2 = _interopRequireDefault(_ActionQueue);
	
	var _BoardCheck = __webpack_require__(121);
	
	var _BoardCheck2 = _interopRequireDefault(_BoardCheck);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/* =========================================================================
	 *
	 * Game.js
	 *  This script contains the game logic acts as a controller for the Entity
	 *  Component System
	 *
	 * ========================================================================= */
	
	var _systems = new WeakMap();
	
	/**
	 *
	 * @param entityMap
	 * @param entity
	 * @returns {*}
	 * @private
	 */
	function _addEntity(entityMap, entity) {
	    return entityMap.set(entity.id, entity);
	}
	
	var Game = function () {
	    function Game(GameContext) {
	        _classCallCheck(this, Game);
	
	        this.context = GameContext;
	    }
	
	    _createClass(Game, [{
	        key: 'start',
	        value: function start() {
	            var _this = this;
	
	            _addEntity(_addEntity(this.context.entities, _BoardAssemblage2.default.build()), _ScoreAssemblage2.default.build());
	            _systems.set(this, [new _UserInput2.default(this.context).bindKey(_Utils2.default.ACTION.LEFT, _UserInput2.default.keys.LEFT_ARROW).bindKey(_Utils2.default.ACTION.RIGHT, _UserInput2.default.keys.RIGHT_ARROW).bindKey(_Utils2.default.ACTION.DOWN, _UserInput2.default.keys.DOWN_ARROW).bindKey(_Utils2.default.ACTION.ROTATE, _UserInput2.default.keys.UP_ARROW).bindKey(_Utils2.default.ACTION.START, _UserInput2.default.keys.SPACE), new _TetrominoGenerator2.default(this.context), new _ActionQueue2.default(this.context), new _Render2.default(this.context), new _BoardCheck2.default(this.context)]);
	            requestAnimationFrame(function () {
	                _this._gameLoop();
	            });
	        }
	    }, {
	        key: '_gameLoop',
	        value: function _gameLoop() {
	            var _this2 = this;
	
	            _systems.get(this).forEach(function (system) {
	                //here we could pass only relevant entities
	                system.tick(_this2.context.entities);
	            });
	
	            requestAnimationFrame(function () {
	                _this2._gameLoop();
	            });
	        }
	    }]);
	
	    return Game;
	}();

	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _values = __webpack_require__(3);
	
	var _values2 = _interopRequireDefault(_values);
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Utils = function () {
	    function Utils() {
	        _classCallCheck(this, Utils);
	    }
	
	    _createClass(Utils, null, [{
	        key: 'eachBlock',
	        value: function eachBlock(entity, fn) {
	            var bit,
	                row = 0,
	                col = 0,
	                blocks = entity.components.tetromino.definition.blockList[entity.components.tetromino.rotation];
	            for (bit = 0x8000; bit > 0; bit = bit >> 1) {
	                if (blocks & bit) {
	                    fn(col, row, entity);
	                }
	                if (++col === 4) {
	                    col = 0;
	                    ++row;
	                }
	            }
	        }
	
	        /**
	         *
	         * @param {Entity} tetromino
	         */
	
	    }, {
	        key: 'getCurrentAction',
	        value: function getCurrentAction(tetromino) {
	            return (0, _values2.default)(tetromino.components.actionQueue).reduce(function (previous, current) {
	                if (0 === current.priority) {
	                    return current;
	                }
	                return previous;
	            }, null);
	        }
	    }, {
	        key: 'isOccupied',
	        value: function isOccupied(tetromino, board) {
	
	            var tc = (tetromino.components.position.x - board.components.position.x) / tetromino.components.tetromino.blockSize;
	            var tr = (tetromino.components.position.y - board.components.position.y) / tetromino.components.tetromino.blockSize;
	            var bw = board.components.board.width - 1;
	            var bh = board.components.board.height - 1;
	            var cm = board.components.board.cellMatrix;
	
	            var result = false;
	            Utils.eachBlock(tetromino, function (col, row) {
	                var x = tc + col;
	                var y = tr + row;
	                if (x < 0 || x > bw || y < 0 || y > bh || cm[y][x].type) {
	                    result = true;
	                }
	            });
	            return result;
	        }
	    }, {
	        key: 'ACTION',
	        get: function get() {
	            return {
	                DOWN: 0,
	                LEFT: 1,
	                RIGHT: 2,
	                ROTATE: 3,
	                START: 4
	            };
	        }
	    }]);
	
	    return Utils;
	}();

	exports.default = Utils;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var baseValues = __webpack_require__(4),
	    keys = __webpack_require__(6);
	
	/**
	 * Creates an array of the own enumerable property values of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property values.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.values(new Foo);
	 * // => [1, 2] (iteration order is not guaranteed)
	 *
	 * _.values('hi');
	 * // => ['h', 'i']
	 */
	function values(object) {
	  return object ? baseValues(object, keys(object)) : [];
	}
	
	module.exports = values;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(5);
	
	/**
	 * The base implementation of `_.values` and `_.valuesIn` which creates an
	 * array of `object` property values corresponding to the property names
	 * of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the array of property values.
	 */
	function baseValues(object, props) {
	  return arrayMap(props, function(key) {
	    return object[key];
	  });
	}
	
	module.exports = baseValues;


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array.length,
	      result = Array(length);
	
	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}
	
	module.exports = arrayMap;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(7),
	    baseKeys = __webpack_require__(8),
	    indexKeys = __webpack_require__(9),
	    isArrayLike = __webpack_require__(13),
	    isIndex = __webpack_require__(22),
	    isPrototype = __webpack_require__(23);
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;
	
	  for (var key in object) {
	    if (baseHas(object, key) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = keys;


/***/ },
/* 7 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Used for built-in method references. */
	var objectProto = global.Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Built-in value references. */
	var getPrototypeOf = Object.getPrototypeOf;
	
	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return hasOwnProperty.call(object, key) ||
	    (typeof object == 'object' && key in object && getPrototypeOf(object) === null);
	}
	
	module.exports = baseHas;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;
	
	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @type Function
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}
	
	module.exports = baseKeys;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(10),
	    isArguments = __webpack_require__(11),
	    isArray = __webpack_require__(20),
	    isLength = __webpack_require__(18),
	    isString = __webpack_require__(21);
	
	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) &&
	      (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}
	
	module.exports = indexKeys;


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	
	module.exports = baseTimes;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var isArrayLikeObject = __webpack_require__(12);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';
	
	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}
	
	module.exports = isArguments;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(13),
	    isObjectLike = __webpack_require__(19);
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}
	
	module.exports = isArrayLikeObject;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(14),
	    isFunction = __webpack_require__(16),
	    isLength = __webpack_require__(18);
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null &&
	    !(typeof value == 'function' && isFunction(value)) && isLength(getLength(value));
	}
	
	module.exports = isArrayLike;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(15);
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	module.exports = getLength;


/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	module.exports = baseProperty;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var isObject = __webpack_require__(17);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array constructors, and
	  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	module.exports = isFunction;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 18 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	module.exports = isLength;


/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	module.exports = isArray;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var isArray = __webpack_require__(20),
	    isObjectLike = __webpack_require__(19);
	
	/** `Object#toString` result references. */
	var stringTag = '[object String]';
	
	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}
	
	module.exports = isString;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 22 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}
	
	module.exports = isIndex;


/***/ },
/* 23 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Used for built-in method references. */
	var objectProto = global.Object.prototype;
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	  return value === proto;
	}
	
	module.exports = isPrototype;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _System2 = __webpack_require__(25);
	
	var _System3 = _interopRequireDefault(_System2);
	
	var _Canvas = __webpack_require__(26);
	
	var _Canvas2 = _interopRequireDefault(_Canvas);
	
	var _BoardRenderer = __webpack_require__(28);
	
	var _BoardRenderer2 = _interopRequireDefault(_BoardRenderer);
	
	var _TetrominoRenderer = __webpack_require__(30);
	
	var _TetrominoRenderer2 = _interopRequireDefault(_TetrominoRenderer);
	
	var _ScoreRenderer = __webpack_require__(31);
	
	var _ScoreRenderer2 = _interopRequireDefault(_ScoreRenderer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _canvas = new WeakMap();
	var _score = new WeakMap();
	var _board = new WeakMap();
	var _tetromino = new WeakMap();
	
	var Render = function (_System) {
	    _inherits(Render, _System);
	
	    function Render(gameContext) {
	        _classCallCheck(this, Render);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Render).call(this, gameContext));
	
	        _canvas.set(_this, new _Canvas2.default(gameContext));
	        _score.set(_this, new _ScoreRenderer2.default(_canvas.get(_this)));
	        _board.set(_this, new _BoardRenderer2.default(_canvas.get(_this)));
	        _tetromino.set(_this, new _TetrominoRenderer2.default(_canvas.get(_this)));
	        return _this;
	    }
	
	    _createClass(Render, [{
	        key: 'tick',
	        value: function tick(entitiesMap) {
	            var _this2 = this;
	
	            if (!this.gameContext.isStarted) {
	                return entitiesMap;
	            }
	            _canvas.get(this).clear(500, 700);
	            entitiesMap.forEach(function (entity) {
	
	                if (entity.components.board) {
	                    _this2.drawBoard(entity);
	                }
	
	                if (entity.components.playerControlled) {
	                    _this2.drawTetromino(entity);
	                }
	
	                if (entity.components.score) {
	                    _this2.drawScore(entity);
	                }
	            });
	            return entitiesMap;
	        }
	    }, {
	        key: 'drawBoard',
	        value: function drawBoard(entity) {
	            return _board.get(this).render(entity);
	        }
	    }, {
	        key: 'drawTetromino',
	        value: function drawTetromino(entity) {
	            return _tetromino.get(this).render(entity);
	        }
	    }, {
	        key: 'drawScore',
	        value: function drawScore(entity) {
	            return _score.get(this).render(entity);
	        }
	    }]);
	
	    return Render;
	}(_System3.default);

	exports.default = Render;

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * This is base class defining interface for system
	 */
	
	var System = function () {
	
	    /**
	     * Just instantiates System in given world
	     * @param {Object} gameContext world
	     */
	
	    function System(gameContext) {
	        _classCallCheck(this, System);
	
	        this.gameContext = gameContext;
	    }
	    /**
	     *
	     * @param {Map}  entitiesMap
	     * @returns {Map} entities Map
	     */
	
	    _createClass(System, [{
	        key: 'tick',
	        value: function tick(entitiesMap) {
	            throw new Error('this method should be implemented in child class');
	        }
	
	        //@TODO use it to search for entities in system, but test first :)
	
	    }], [{
	        key: 'reduceEntityMap',
	        value: function reduceEntityMap(entityMap, nameList) {
	            return entityMap.reduce(function (previous, current) {
	                nameList.forEach(function (name) {
	                    if (current.components[name]) {
	                        previous[name] = current;
	                    }
	                });
	                return previous;
	            }, {});
	        }
	    }]);
	
	    return System;
	}();

	exports.default = System;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _isNil = __webpack_require__(27);
	
	var _isNil2 = _interopRequireDefault(_isNil);
	
	var _isObject = __webpack_require__(17);
	
	var _isObject2 = _interopRequireDefault(_isObject);
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _getColor(color) {
	    if ((0, _isObject2.default)(color)) {
	        return 'rgba(' + [color.r, color.g, color.b, color.a] + ')';
	    }
	    return color;
	}
	/**
	 * Just wrapper to manipulate drawing on Canvas
	 */
	
	var Canvas = function () {
	    function Canvas(gameContext) {
	        _classCallCheck(this, Canvas);
	
	        this.gameContext = gameContext;
	        this.gameContext.canvas.width = 500;
	        this.gameContext.canvas.height = 700;
	    }
	
	    _createClass(Canvas, [{
	        key: 'clear',
	        value: function clear() {
	            var width = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	            var height = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	            // Store the current transformation matrix
	            this.gameContext.context.save();
	            // Use the identity matrix while clearing the canvas
	            this.gameContext.context.setTransform(1, 0, 0, 1, 0, 0);
	            this.gameContext.context.clearRect(0, 0, width, height);
	            // Restore the transform
	            this.gameContext.context.restore();
	        }
	    }, {
	        key: 'drawRectangle',
	        value: function drawRectangle(x, y, width, height) {
	            var backgroundColor = arguments.length <= 4 || arguments[4] === undefined ? { r: 128, g: 128, b: 128, a: 1 } : arguments[4];
	            var borderColor = arguments.length <= 5 || arguments[5] === undefined ? { r: 0, g: 0, b: 0, a: 1 } : arguments[5];
	
	            this.gameContext.context.fillStyle = _getColor(backgroundColor);
	            this.gameContext.context.fillRect(x, y, width, height);
	
	            if ((0, _isNil2.default)(borderColor)) {
	                return;
	            }
	            this.gameContext.context.fillStyle = _getColor(borderColor);
	            this.gameContext.context.strokeRect(x, y, width, height);
	
	            return this;
	        }
	    }, {
	        key: 'drawText',
	        value: function drawText(x, y, font, size, text) {
	            var color = arguments.length <= 5 || arguments[5] === undefined ? 'DarkSlateGray' : arguments[5];
	
	            this.gameContext.context.fillStyle = _getColor(color);
	            this.gameContext.context.font = size + 'px ' + font;
	            this.gameContext.context.fillText(text, x, y);
	        }
	    }]);
	
	    return Canvas;
	}();

	exports.default = Canvas;

/***/ },
/* 27 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is `null` or `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
	 * @example
	 *
	 * _.isNil(null);
	 * // => true
	 *
	 * _.isNil(void 0);
	 * // => true
	 *
	 * _.isNil(NaN);
	 * // => false
	 */
	function isNil(value) {
	  return value == null;
	}
	
	module.exports = isNil;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _TertrominoLookup = __webpack_require__(29);
	
	var _TertrominoLookup2 = _interopRequireDefault(_TertrominoLookup);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BoardRenderer = function () {
	    /**
	     *
	     * @param {Canvas} canvas
	     */
	
	    function BoardRenderer(canvas) {
	        _classCallCheck(this, BoardRenderer);
	
	        this.canvas = canvas;
	    }
	
	    _createClass(BoardRenderer, [{
	        key: 'render',
	        value: function render(entity) {
	            return this.drawBackground(entity).drawCells(entity);
	        }
	    }, {
	        key: 'drawBackground',
	        value: function drawBackground(entity) {
	            this.canvas.drawRectangle(entity.components.position.x, entity.components.position.y, entity.components.board.width * entity.components.board.cellSize, entity.components.board.height * entity.components.board.cellSize, entity.components.appearance.backgroundColor, entity.components.appearance.borderColor);
	            return this;
	        }
	    }, {
	        key: 'drawCells',
	        value: function drawCells(entity) {
	            var _this = this;
	
	            entity.components.board.cellMatrix.forEach(function (row) {
	                row.forEach(function (cell) {
	                    _this.canvas.drawRectangle(cell.x + entity.components.position.x, cell.y + entity.components.position.y, cell.width, cell.height, cell.type, entity.components.board.borderColor);
	                });
	            });
	            return this;
	        }
	    }]);
	
	    return BoardRenderer;
	}();

	exports.default = BoardRenderer;

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TertrominoLookup = function () {
	    function TertrominoLookup() {
	        _classCallCheck(this, TertrominoLookup);
	    }
	
	    _createClass(TertrominoLookup, null, [{
	        key: 'tetrominoMap',
	        get: function get() {
	            var map = new Map();
	
	            map.set('i', { size: 4, blockList: [0x0F00, 0x2222, 0x00F0, 0x4444], color: 'cyan' });
	            map.set('j', { size: 3, blockList: [0x44C0, 0x8E00, 0x6440, 0x0E20], color: 'blue' });
	            map.set('l', { size: 3, blockList: [0x4460, 0x0E80, 0xC440, 0x2E00], color: 'orange' });
	            map.set('o', { size: 2, blockList: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: 'yellow' });
	            map.set('s', { size: 3, blockList: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: 'green' });
	            map.set('t', { size: 3, blockList: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: 'purple' });
	            map.set('z', { size: 3, blockList: [0x0C60, 0x4C80, 0xC600, 0x2640], color: 'red' });
	
	            return map;
	        }
	    }]);
	
	    return TertrominoLookup;
	}();

	exports.default = TertrominoLookup;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Utils = __webpack_require__(2);
	
	var _Utils2 = _interopRequireDefault(_Utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TetrominoRenderer = function () {
	    /**
	     *
	     * @param {Canvas} canvas
	     */
	
	    function TetrominoRenderer(canvas) {
	        _classCallCheck(this, TetrominoRenderer);
	
	        this.canvas = canvas;
	    }
	
	    _createClass(TetrominoRenderer, [{
	        key: 'render',
	        value: function render(entity) {
	            var _this = this;
	
	            _Utils2.default.eachBlock(entity, function (col, row, entity) {
	                _this.canvas.drawRectangle(col * entity.components.tetromino.blockSize + entity.components.position.x, row * entity.components.tetromino.blockSize + entity.components.position.y, entity.components.tetromino.blockSize, entity.components.tetromino.blockSize, entity.components.tetromino.definition.color);
	            });
	            return this;
	        }
	    }]);
	
	    return TetrominoRenderer;
	}();

	exports.default = TetrominoRenderer;

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ScoreRenderer = function () {
	    /**
	     *
	     * @param {Canvas} canvas
	     */
	
	    function ScoreRenderer(canvas) {
	        _classCallCheck(this, ScoreRenderer);
	
	        this.canvas = canvas;
	    }
	
	    _createClass(ScoreRenderer, [{
	        key: 'render',
	        value: function render(entity) {
	            return this.drawScore(entity);
	        }
	    }, {
	        key: 'drawScore',
	        value: function drawScore(entity) {
	            this.canvas.drawText(entity.components.position.x, entity.components.position.y, entity.components.text.font, entity.components.text.size, entity.components.score.score + '', entity.components.appearance.color);
	            return this;
	        }
	    }]);
	
	    return ScoreRenderer;
	}();

	exports.default = ScoreRenderer;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Entity = __webpack_require__(33);
	
	var _Entity2 = _interopRequireDefault(_Entity);
	
	var _BoardComponent = __webpack_require__(34);
	
	var _BoardComponent2 = _interopRequireDefault(_BoardComponent);
	
	var _AppearanceComponent = __webpack_require__(42);
	
	var _AppearanceComponent2 = _interopRequireDefault(_AppearanceComponent);
	
	var _PositionComponent = __webpack_require__(43);
	
	var _PositionComponent2 = _interopRequireDefault(_PositionComponent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ScoreAssemblage = function () {
	    function ScoreAssemblage() {
	        _classCallCheck(this, ScoreAssemblage);
	    }
	
	    _createClass(ScoreAssemblage, null, [{
	        key: 'build',
	        value: function build() {
	            return new _Entity2.default().addComponent(new _BoardComponent2.default(10, 30)).addComponent(new _AppearanceComponent2.default({ r: 128, g: 128, b: 128, a: 1 })).addComponent(new _PositionComponent2.default(5, 5));
	        }
	    }]);
	
	    return ScoreAssemblage;
	}();

	exports.default = ScoreAssemblage;

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Entity = function () {
	    function Entity() {
	        _classCallCheck(this, Entity);
	
	        this.id = (+new Date()).toString(16) + Math.random().toString(36).substring(5);
	        // The component data will live in this object
	        this.components = {};
	    }
	
	    _createClass(Entity, [{
	        key: 'addComponent',
	        value: function addComponent(component) {
	            // Add component data to the entity
	            this.components[component.name] = component;
	            return this;
	        }
	    }, {
	        key: 'getByName',
	        value: function getByName(componentName) {
	            if (typeof componentName === 'function') {
	                // get the name from the prototype of the passed component function
	                return componentName.prototype.name;
	            }
	            return componentName;
	        }
	    }, {
	        key: 'removeComponent',
	        value: function removeComponent(componentName) {
	            delete this.components[this.getByName(componentName)];
	            return this;
	        }
	    }, {
	        key: 'print',
	        value: function print() {
	            // Function to print / log information about the entity
	            console.log(JSON.stringify(this, null, 4));
	            return this;
	        }
	    }]);
	
	    return Entity;
	}();

	exports.default = Entity;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _range = __webpack_require__(35);
	
	var _range2 = _interopRequireDefault(_range);
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Component2 = __webpack_require__(41);
	
	var _Component3 = _interopRequireDefault(_Component2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Generate 2 dimm. array filed with given value.
	 *
	 * This could be part of some util module
	 *
	 * @param {Number} width
	 * @param {Number} height
	 * @param {*} value
	 * @returns {Array}
	 */
	function _generateArrayOfSize(width, height, value) {
	    return (0, _range2.default)(height).map(function () {
	        return (0, _range2.default)(width).map(function () {
	            return value;
	        });
	    });
	}
	
	/**
	 * Create matrix of square cells to draw later.
	 *
	 * This also sets boundaries of board
	 *
	 * @param {Number} size
	 * @param {Number} row
	 * @param {Number}column
	 * @param {Array} definition
	 * @param {Array} cellMatrix
	 * @param {Number} offsetX
	 * @param {Number} offsetY
	 * @returns {Array}
	 * @private
	 */
	function _getCellMatrix(size, row, column, definition, cellMatrix) {
	    var offsetX = arguments.length <= 5 || arguments[5] === undefined ? 0 : arguments[5];
	    var offsetY = arguments.length <= 6 || arguments[6] === undefined ? 0 : arguments[6];
	
	    if (definition.length === row) {
	        return cellMatrix;
	    }
	
	    cellMatrix[row][column] = { x: column * size + offsetX, y: row * size + offsetY, height: size, width: size };
	
	    if (column < definition[row].length - 1) {
	        return _getCellMatrix(size, row, ++column, definition, cellMatrix, offsetX, offsetY);
	    } else {
	
	        if (++row === definition.length) {
	            return cellMatrix;
	        }
	        cellMatrix[row] = [];
	        return _getCellMatrix(size, row, 0, definition, cellMatrix, offsetX, offsetY);
	    }
	}
	
	/**
	 * Holds board tetrominoMap
	 * @param params
	 * @constructor
	 */
	
	var BoardComponent = function (_Component) {
	    _inherits(BoardComponent, _Component);
	
	    _createClass(BoardComponent, [{
	        key: 'name',
	        get: function get() {
	            return 'board';
	        }
	    }]);
	
	    function BoardComponent() {
	        var width = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];
	        var height = arguments.length <= 1 || arguments[1] === undefined ? 30 : arguments[1];
	        var cellSize = arguments.length <= 2 || arguments[2] === undefined ? 20 : arguments[2];
	
	        _classCallCheck(this, BoardComponent);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BoardComponent).call(this));
	
	        _this.width = parseInt(width);
	        _this.height = parseInt(height);
	        _this.cellSize = 20;
	        _this.cellMatrix = _getCellMatrix(cellSize, 0, 0, _generateArrayOfSize(_this.width, _this.height, 0), [[]]);
	        return _this;
	    }
	
	    return BoardComponent;
	}(_Component3.default);

	exports.default = BoardComponent;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var createRange = __webpack_require__(36);
	
	/**
	 * Creates an array of numbers (positive and/or negative) progressing from
	 * `start` up to, but not including, `end`. A step of `-1` is used if a negative
	 * `start` is specified without an `end` or `step`. If `end` is not specified
	 * it's set to `start` with `start` then set to `0`.
	 *
	 * **Note:** JavaScript follows the IEEE-754 standard for resolving
	 * floating-point values which can produce unexpected results.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @param {number} [start=0] The start of the range.
	 * @param {number} end The end of the range.
	 * @param {number} [step=1] The value to increment or decrement by.
	 * @returns {Array} Returns the new array of numbers.
	 * @example
	 *
	 * _.range(4);
	 * // => [0, 1, 2, 3]
	 *
	 * _.range(-4);
	 * // => [0, -1, -2, -3]
	 *
	 * _.range(1, 5);
	 * // => [1, 2, 3, 4]
	 *
	 * _.range(0, 20, 5);
	 * // => [0, 5, 10, 15]
	 *
	 * _.range(0, -4, -1);
	 * // => [0, -1, -2, -3]
	 *
	 * _.range(1, 4, 0);
	 * // => [1, 1, 1]
	 *
	 * _.range(0);
	 * // => []
	 */
	var range = createRange();
	
	module.exports = range;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var baseRange = __webpack_require__(37),
	    isIterateeCall = __webpack_require__(38),
	    toNumber = __webpack_require__(40);
	
	/**
	 * Creates a `_.range` or `_.rangeRight` function.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new range function.
	 */
	function createRange(fromRight) {
	  return function(start, end, step) {
	    if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
	      end = step = undefined;
	    }
	    // Ensure the sign of `-0` is preserved.
	    start = toNumber(start);
	    start = start === start ? start : 0;
	    if (end === undefined) {
	      end = start;
	      start = 0;
	    } else {
	      end = toNumber(end) || 0;
	    }
	    step = step === undefined ? (start < end ? 1 : -1) : (toNumber(step) || 0);
	    return baseRange(start, end, step, fromRight);
	  };
	}
	
	module.exports = createRange;


/***/ },
/* 37 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeCeil = Math.ceil,
	    nativeMax = Math.max;
	
	/**
	 * The base implementation of `_.range` and `_.rangeRight` which doesn't
	 * coerce arguments to numbers.
	 *
	 * @private
	 * @param {number} start The start of the range.
	 * @param {number} end The end of the range.
	 * @param {number} step The value to increment or decrement by.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Array} Returns the new array of numbers.
	 */
	function baseRange(start, end, step, fromRight) {
	  var index = -1,
	      length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
	      result = Array(length);
	
	  while (length--) {
	    result[fromRight ? length : ++index] = start;
	    start += step;
	  }
	  return result;
	}
	
	module.exports = baseRange;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(39),
	    isArrayLike = __webpack_require__(13),
	    isIndex = __webpack_require__(22),
	    isObject = __webpack_require__(17);
	
	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    return eq(object[index], value);
	  }
	  return false;
	}
	
	module.exports = isIterateeCall;


/***/ },
/* 39 */
/***/ function(module, exports) {

	/**
	 * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}
	
	module.exports = eq;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(16),
	    isObject = __webpack_require__(17);
	
	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	
	/** Built-in method references without a dependency on `global`. */
	var freeParseInt = parseInt;
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3);
	 * // => 3
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3');
	 * // => 3
	 */
	function toNumber(value) {
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}
	
	module.exports = toNumber;


/***/ },
/* 41 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Component = function () {
	    function Component() {
	        _classCallCheck(this, Component);
	    }
	
	    _createClass(Component, [{
	        key: 'name',
	
	        /**
	         * @returns {String} name of component
	         */
	        get: function get() {
	            throw new Error('name getter must be implemented and return unique string');
	        }
	    }]);
	
	    return Component;
	}();

	exports.default = Component;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Component2 = __webpack_require__(41);
	
	var _Component3 = _interopRequireDefault(_Component2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var AppearanceComponent = function (_Component) {
	    _inherits(AppearanceComponent, _Component);
	
	    _createClass(AppearanceComponent, [{
	        key: 'name',
	        get: function get() {
	            return 'appearance';
	        }
	    }]);
	
	    function AppearanceComponent() {
	        var backgroundColor = arguments.length <= 0 || arguments[0] === undefined ? { r: 255, g: 255, b: 255, a: 1 } : arguments[0];
	        var borderColor = arguments.length <= 1 || arguments[1] === undefined ? { r: 0, g: 0, b: 0, a: 1 } : arguments[1];
	        var color = arguments.length <= 2 || arguments[2] === undefined ? { r: 0, g: 0, b: 0, a: 1 } : arguments[2];
	
	        _classCallCheck(this, AppearanceComponent);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AppearanceComponent).call(this));
	
	        _this.backgroundColor = backgroundColor;
	        _this.borderColor = borderColor;
	        _this.color = color;
	        return _this;
	    }
	
	    return AppearanceComponent;
	}(_Component3.default);
	
	exports.default = AppearanceComponent;
	;

/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PositionComponent = function () {
	    _createClass(PositionComponent, [{
	        key: 'name',
	        get: function get() {
	            return 'position';
	        }
	    }]);
	
	    function PositionComponent() {
	        var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	        var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	        _classCallCheck(this, PositionComponent);
	
	        this.x = parseInt(x);
	        this.y = parseInt(y);
	    }
	
	    return PositionComponent;
	}();

	exports.default = PositionComponent;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Entity = __webpack_require__(33);
	
	var _Entity2 = _interopRequireDefault(_Entity);
	
	var _ScoreComponent = __webpack_require__(45);
	
	var _ScoreComponent2 = _interopRequireDefault(_ScoreComponent);
	
	var _AppearanceComponent = __webpack_require__(42);
	
	var _AppearanceComponent2 = _interopRequireDefault(_AppearanceComponent);
	
	var _PositionComponent = __webpack_require__(43);
	
	var _PositionComponent2 = _interopRequireDefault(_PositionComponent);
	
	var _TextComponent = __webpack_require__(46);
	
	var _TextComponent2 = _interopRequireDefault(_TextComponent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BoardAssemblage = function () {
	    function BoardAssemblage() {
	        _classCallCheck(this, BoardAssemblage);
	    }
	
	    _createClass(BoardAssemblage, null, [{
	        key: 'build',
	        value: function build() {
	            return new _Entity2.default().addComponent(new _ScoreComponent2.default()).addComponent(new _AppearanceComponent2.default({ r: 128, g: 128, b: 128, a: 1 })).addComponent(new _PositionComponent2.default(300, 50)).addComponent(new _TextComponent2.default());
	        }
	    }]);
	
	    return BoardAssemblage;
	}();

	exports.default = BoardAssemblage;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Component2 = __webpack_require__(41);
	
	var _Component3 = _interopRequireDefault(_Component2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ScoreComponent = function (_Component) {
	    _inherits(ScoreComponent, _Component);
	
	    _createClass(ScoreComponent, [{
	        key: 'name',
	        get: function get() {
	            return 'score';
	        }
	    }]);
	
	    function ScoreComponent() {
	        var score = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	        var rows = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	        var price = arguments.length <= 2 || arguments[2] === undefined ? 100 : arguments[2];
	
	        _classCallCheck(this, ScoreComponent);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ScoreComponent).call(this));
	
	        _this.score = score;
	        _this.rows = rows;
	        _this.price = price;
	        return _this;
	    }
	
	    return ScoreComponent;
	}(_Component3.default);

	exports.default = ScoreComponent;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Component2 = __webpack_require__(41);
	
	var _Component3 = _interopRequireDefault(_Component2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TextComponent = function (_Component) {
	    _inherits(TextComponent, _Component);
	
	    _createClass(TextComponent, [{
	        key: 'name',
	        get: function get() {
	            return 'text';
	        }
	    }]);
	
	    function TextComponent() {
	        var font = arguments.length <= 0 || arguments[0] === undefined ? 'Courier New' : arguments[0];
	        var size = arguments.length <= 1 || arguments[1] === undefined ? 24 : arguments[1];
	
	        _classCallCheck(this, TextComponent);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TextComponent).call(this));
	
	        _this.font = font;
	        _this.size = size;
	        return _this;
	    }
	
	    return TextComponent;
	}(_Component3.default);

	exports.default = TextComponent;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _isArray = __webpack_require__(20);
	
	var _isArray2 = _interopRequireDefault(_isArray);
	
	var _isNumber = __webpack_require__(48);
	
	var _isNumber2 = _interopRequireDefault(_isNumber);
	
	var _isUndefined = __webpack_require__(49);
	
	var _isUndefined2 = _interopRequireDefault(_isUndefined);
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _System2 = __webpack_require__(25);
	
	var _System3 = _interopRequireDefault(_System2);
	
	var _Utils = __webpack_require__(2);
	
	var _Utils2 = _interopRequireDefault(_Utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _bindings = new WeakMap();
	var _pressed = new WeakMap();
	var _down = new WeakMap();
	var _released = new WeakMap();
	
	function _getCode(e) {
	    return e.keyCode;
	}
	
	var UserInput = function (_System) {
	    _inherits(UserInput, _System);
	
	    _createClass(UserInput, null, [{
	        key: 'keys',
	        get: function get() {
	            return {
	                SPACE: 32,
	                LEFT_ARROW: 37,
	                UP_ARROW: 38,
	                RIGHT_ARROW: 39,
	                DOWN_ARROW: 40
	            };
	        }
	    }]);
	
	    function UserInput(gameContext) {
	        _classCallCheck(this, UserInput);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UserInput).call(this, gameContext));
	
	        _bindings.set(_this, {});
	        _pressed.set(_this, {});
	        _down.set(_this, {});
	        _released.set(_this, []);
	
	        gameContext.document.onkeydown = function (e) {
	            return _this.onKeyDown(e);
	        };
	        gameContext.document.onkeyup = function (e) {
	            return _this.onKeyUp(e);
	        };
	        return _this;
	    }
	
	    _createClass(UserInput, [{
	        key: 'tick',
	        value: function tick(entityMap) {
	            var _this2 = this;
	
	            entityMap.forEach(function (entity) {
	                if (entity.components.playerControlled && true === entity.components.playerControlled.isControlled) {
	
	                    [_Utils2.default.ACTION.DOWN, _Utils2.default.ACTION.ROTATE, _Utils2.default.ACTION.LEFT, _Utils2.default.ACTION.RIGHT].forEach(function (action) {
	                        if (_this2.pressed(action) !== undefined) {
	                            entity.components.actionQueue.actionQueue[action] = { id: action, priority: 0 };
	                        }
	                    });
	
	                    if (!(0, _isUndefined2.default)(_this2.pressed(_Utils2.default.ACTION.START)) && !_this2.gameContext.lost) {
	                        _this2.gameContext.isStarted = !_this2.gameContext.isStarted;
	                    }
	                }
	            });
	
	            //do sth with entities
	            this.clearPressed();
	            return entityMap;
	        }
	    }, {
	        key: 'bindKey',
	        value: function bindKey(action, keys) {
	            var _this3 = this;
	
	            if ((0, _isNumber2.default)(keys)) {
	                _bindings.get(this)[keys] = action;
	                return this;
	            }
	
	            if ((0, _isArray2.default)(keys)) {
	                keys.forEach(function (key) {
	                    _bindings.get(_this3)[key] = action;
	                });
	            }
	            return this;
	        }
	    }, {
	        key: 'clearPressed',
	        value: function clearPressed() {
	            var _this4 = this;
	
	            _released.get(this).forEach(function (item) {
	                _down.get(_this4)[item] = false;
	            });
	            _pressed.set(this, {});
	            _released.set(this, []);
	        }
	    }, {
	        key: 'pressed',
	        value: function pressed(action) {
	            return _pressed.get(this)[action];
	        }
	    }, {
	        key: 'down',
	        value: function down(action) {
	            return _down.get(this)[action];
	        }
	    }, {
	        key: 'released',
	        value: function released(action) {
	            return _released.get(this).indexOf(action) > -1;
	        }
	    }, {
	        key: 'onKeyDown',
	        value: function onKeyDown(e) {
	            var action = _bindings.get(this)[_getCode(e)];
	            if (action === undefined) {
	                return;
	            }
	            _down.get(this)[action] = true;
	            _pressed.get(this)[action] = _down.get(this)[action];
	            e.preventDefault();
	        }
	    }, {
	        key: 'onKeyUp',
	        value: function onKeyUp(e) {
	            var action = _bindings[_getCode(e)];
	            if (!action) {
	                return;
	            }
	            _released.get(this).push(action);
	            e.preventDefault();
	        }
	    }]);
	
	    return UserInput;
	}(_System3.default);

	exports.default = UserInput;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var isObjectLike = __webpack_require__(19);
	
	/** `Object#toString` result references. */
	var numberTag = '[object Number]';
	
	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Number` primitive or object.
	 *
	 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
	 * as numbers, use the `_.isFinite` method.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isNumber(3);
	 * // => true
	 *
	 * _.isNumber(Number.MIN_VALUE);
	 * // => true
	 *
	 * _.isNumber(Infinity);
	 * // => true
	 *
	 * _.isNumber('3');
	 * // => false
	 */
	function isNumber(value) {
	  return typeof value == 'number' ||
	    (isObjectLike(value) && objectToString.call(value) == numberTag);
	}
	
	module.exports = isNumber;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 49 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	 * @example
	 *
	 * _.isUndefined(void 0);
	 * // => true
	 *
	 * _.isUndefined(null);
	 * // => false
	 */
	function isUndefined(value) {
	  return value === undefined;
	}
	
	module.exports = isUndefined;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _random = __webpack_require__(51);
	
	var _random2 = _interopRequireDefault(_random);
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _TetrominoAssemblage = __webpack_require__(53);
	
	var _TetrominoAssemblage2 = _interopRequireDefault(_TetrominoAssemblage);
	
	var _Utils = __webpack_require__(2);
	
	var _Utils2 = _interopRequireDefault(_Utils);
	
	var _System2 = __webpack_require__(25);
	
	var _System3 = _interopRequireDefault(_System2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _pieceStack = new WeakMap();
	var _previewXDelta = new WeakMap();
	var _previewYDelta = new WeakMap();
	var _previewCoor = new WeakMap();
	
	var TetrominoGenerator = function (_System) {
	    _inherits(TetrominoGenerator, _System);
	
	    function TetrominoGenerator(gameContext) {
	        _classCallCheck(this, TetrominoGenerator);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TetrominoGenerator).call(this, gameContext));
	
	        _this.pieces = [];
	        _pieceStack.set(_this, []);
	        //@FIXME this should be read from some data or settings 
	        _previewXDelta.set(_this, 400);
	        _previewYDelta.set(_this, 35);
	        return _this;
	    }
	
	    _createClass(TetrominoGenerator, [{
	        key: 'tick',
	        value: function tick(entityMap) {
	
	            if (!this.gameContext.isStarted) {
	                return entityMap;
	            }
	
	            var tetromino = null,
	                board = null,
	                freeToSet = true,
	                preview = undefined;
	
	            entityMap.forEach(function (entity) {
	
	                if (entity.components.board) {
	                    board = entity;
	                }
	                if (entity.components.playerControlled && true === entity.components.playerControlled.isControlled) {
	                    freeToSet = false;
	                }
	                if (entity.components.playerControlled && false === entity.components.playerControlled.isControlled) {
	                    preview = entity;
	                }
	            });
	
	            if (!freeToSet) {
	                return entityMap;
	            }
	            //@FIXME this shoudl go to some method
	            if (preview) {
	                //pop
	                tetromino = preview;
	                tetromino.components.playerControlled.isControlled = true;
	                //set x,y
	                tetromino.components.position.x = _previewCoor.get(this).x;
	                tetromino.components.position.y = _previewCoor.get(this).y;
	            } else {
	                //create
	                tetromino = this.createTetromino(board);
	            }
	
	            //place created
	            if (!_Utils2.default.isOccupied(tetromino, board)) {
	                entityMap.set(tetromino.id, tetromino);
	                //create preview and push
	                preview = this.createTetromino(board, false);
	                _previewCoor.set(this, {
	                    x: preview.components.position.x,
	                    y: preview.components.position.y
	                });
	                preview.components.position.x = _previewXDelta.get(this);
	                preview.components.position.y = _previewYDelta.get(this);
	                entityMap.set(preview.id, preview);
	            }
	            return entityMap;
	        }
	    }, {
	        key: 'createTetromino',
	        value: function createTetromino(board) {
	            var playerControlled = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	            var _randomPieceDefinitio = this.randomPieceDefinition(board);
	
	            var type = _randomPieceDefinitio.type;
	            var rotation = _randomPieceDefinitio.rotation;
	            var x = _randomPieceDefinitio.x;
	            var y = _randomPieceDefinitio.y;
	
	            return _TetrominoAssemblage2.default.build(type, rotation, x, y, playerControlled);
	        }
	    }, {
	        key: 'randomPieceDefinition',
	        value: function randomPieceDefinition(boardEntity) {
	
	            if (this.pieces.length === 0) this.pieces = ['i', 'i', 'i', 'i', 'j', 'j', 'j', 'j', 'l', 'l', 'l', 'l', 'o', 'o', 'o', 'o', 's', 's', 's', 's', 't', 't', 't', 't', 'z', 'z', 'z', 'z'];
	            var type = this.pieces.splice((0, _random2.default)(0, this.pieces.length - 1), 1)[0];
	            //@FIXME size from lookup would be better here
	            var index = (0, _random2.default)(boardEntity.components.board.cellMatrix[0].length - 5);
	            return {
	                type: type,
	                rotation: 3,
	                x: boardEntity.components.board.cellMatrix[0][index].x + boardEntity.components.position.x,
	                y: boardEntity.components.position.y
	            };
	        }
	    }]);
	
	    return TetrominoGenerator;
	}(_System3.default);

	exports.default = TetrominoGenerator;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var baseRandom = __webpack_require__(52),
	    isIterateeCall = __webpack_require__(38),
	    toNumber = __webpack_require__(40);
	
	/** Built-in method references without a dependency on `global`. */
	var freeParseFloat = parseFloat;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min,
	    nativeRandom = Math.random;
	
	/**
	 * Produces a random number between the inclusive `lower` and `upper` bounds.
	 * If only one argument is provided a number between `0` and the given number
	 * is returned. If `floating` is `true`, or either `lower` or `upper` are floats,
	 * a floating-point number is returned instead of an integer.
	 *
	 * **Note:** JavaScript follows the IEEE-754 standard for resolving
	 * floating-point values which can produce unexpected results.
	 *
	 * @static
	 * @memberOf _
	 * @category Number
	 * @param {number} [lower=0] The lower bound.
	 * @param {number} [upper=1] The upper bound.
	 * @param {boolean} [floating] Specify returning a floating-point number.
	 * @returns {number} Returns the random number.
	 * @example
	 *
	 * _.random(0, 5);
	 * // => an integer between 0 and 5
	 *
	 * _.random(5);
	 * // => also an integer between 0 and 5
	 *
	 * _.random(5, true);
	 * // => a floating-point number between 0 and 5
	 *
	 * _.random(1.2, 5.2);
	 * // => a floating-point number between 1.2 and 5.2
	 */
	function random(lower, upper, floating) {
	  if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
	    upper = floating = undefined;
	  }
	  if (floating === undefined) {
	    if (typeof upper == 'boolean') {
	      floating = upper;
	      upper = undefined;
	    }
	    else if (typeof lower == 'boolean') {
	      floating = lower;
	      lower = undefined;
	    }
	  }
	  if (lower === undefined && upper === undefined) {
	    lower = 0;
	    upper = 1;
	  }
	  else {
	    lower = toNumber(lower) || 0;
	    if (upper === undefined) {
	      upper = lower;
	      lower = 0;
	    } else {
	      upper = toNumber(upper) || 0;
	    }
	  }
	  if (lower > upper) {
	    var temp = lower;
	    lower = upper;
	    upper = temp;
	  }
	  if (floating || lower % 1 || upper % 1) {
	    var rand = nativeRandom();
	    return nativeMin(lower + (rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1)))), upper);
	  }
	  return baseRandom(lower, upper);
	}
	
	module.exports = random;


/***/ },
/* 52 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeFloor = Math.floor,
	    nativeRandom = Math.random;
	
	/**
	 * The base implementation of `_.random` without support for returning
	 * floating-point numbers.
	 *
	 * @private
	 * @param {number} lower The lower bound.
	 * @param {number} upper The upper bound.
	 * @returns {number} Returns the random number.
	 */
	function baseRandom(lower, upper) {
	  return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
	}
	
	module.exports = baseRandom;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Entity = __webpack_require__(33);
	
	var _Entity2 = _interopRequireDefault(_Entity);
	
	var _TertrominoLookup = __webpack_require__(29);
	
	var _TertrominoLookup2 = _interopRequireDefault(_TertrominoLookup);
	
	var _TetrominoComponent = __webpack_require__(54);
	
	var _TetrominoComponent2 = _interopRequireDefault(_TetrominoComponent);
	
	var _PositionComponent = __webpack_require__(43);
	
	var _PositionComponent2 = _interopRequireDefault(_PositionComponent);
	
	var _AppearanceComponent = __webpack_require__(42);
	
	var _AppearanceComponent2 = _interopRequireDefault(_AppearanceComponent);
	
	var _PlayerControlled = __webpack_require__(55);
	
	var _PlayerControlled2 = _interopRequireDefault(_PlayerControlled);
	
	var _ActionQueueComponent = __webpack_require__(56);
	
	var _ActionQueueComponent2 = _interopRequireDefault(_ActionQueueComponent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TetrominoAssemblage = function () {
	    function TetrominoAssemblage() {
	        _classCallCheck(this, TetrominoAssemblage);
	    }
	
	    _createClass(TetrominoAssemblage, null, [{
	        key: 'build',
	        value: function build(type, rotation, x, y) {
	            var playerControlled = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];
	
	            return new _Entity2.default().addComponent(new _TetrominoComponent2.default(type, rotation, _TertrominoLookup2.default.tetrominoMap.get(type))).addComponent(new _AppearanceComponent2.default(_TertrominoLookup2.default.tetrominoMap.get(type).color)).addComponent(new _PositionComponent2.default(x, y)).addComponent(new _PlayerControlled2.default(playerControlled)).addComponent(new _ActionQueueComponent2.default());
	        }
	    }]);
	
	    return TetrominoAssemblage;
	}();

	exports.default = TetrominoAssemblage;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Component2 = __webpack_require__(41);
	
	var _Component3 = _interopRequireDefault(_Component2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TetrominoComponent = function (_Component) {
	    _inherits(TetrominoComponent, _Component);
	
	    _createClass(TetrominoComponent, [{
	        key: 'name',
	        get: function get() {
	            return 'tetromino';
	        }
	    }]);
	
	    function TetrominoComponent(type, rotation, definition) {
	        var blockSize = arguments.length <= 3 || arguments[3] === undefined ? 20 : arguments[3];
	
	        _classCallCheck(this, TetrominoComponent);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TetrominoComponent).call(this));
	
	        _this.type = type;
	        _this.rotation = parseInt(rotation);
	        _this.definition = definition;
	        _this.blockSize = parseInt(blockSize);
	        return _this;
	    }
	
	    return TetrominoComponent;
	}(_Component3.default);

	exports.default = TetrominoComponent;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Component2 = __webpack_require__(41);
	
	var _Component3 = _interopRequireDefault(_Component2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PlayerControlled = function (_Component) {
	    _inherits(PlayerControlled, _Component);
	
	    _createClass(PlayerControlled, [{
	        key: 'name',
	        get: function get() {
	            return 'playerControlled';
	        }
	    }]);
	
	    function PlayerControlled() {
	        var isControlled = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
	        _classCallCheck(this, PlayerControlled);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PlayerControlled).call(this));
	
	        _this.isControlled = isControlled;
	        return _this;
	    }
	
	    return PlayerControlled;
	}(_Component3.default);

	exports.default = PlayerControlled;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Utils = __webpack_require__(2);
	
	var _Utils2 = _interopRequireDefault(_Utils);
	
	var _Component2 = __webpack_require__(41);
	
	var _Component3 = _interopRequireDefault(_Component2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ActionQueueComponent = function (_Component) {
	    _inherits(ActionQueueComponent, _Component);
	
	    _createClass(ActionQueueComponent, [{
	        key: 'name',
	        get: function get() {
	            return 'actionQueue';
	        }
	        /**
	         *
	         * @param {object} action  { id : of action to resolve and its priority :  0 means will be executed instantly number means how many ticks system should wait }
	         */
	
	    }]);
	
	    function ActionQueueComponent() {
	        var action = arguments.length <= 0 || arguments[0] === undefined ? { id: _Utils2.default.ACTION.DOWN, priority: 0 } : arguments[0];
	
	        _classCallCheck(this, ActionQueueComponent);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ActionQueueComponent).call(this));
	
	        _this.actionQueue = {};
	        _this.actionQueue[action.id] = action;
	        return _this;
	    }
	
	    return ActionQueueComponent;
	}(_Component3.default);

	exports.default = ActionQueueComponent;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _cloneDeep = __webpack_require__(58);
	
	var _cloneDeep2 = _interopRequireDefault(_cloneDeep);
	
	var _forOwn = __webpack_require__(118);
	
	var _forOwn2 = _interopRequireDefault(_forOwn);
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Utils = __webpack_require__(2);
	
	var _Utils2 = _interopRequireDefault(_Utils);
	
	var _System2 = __webpack_require__(25);
	
	var _System3 = _interopRequireDefault(_System2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _rotate(tetromino) {
	    if (tetromino.components.tetromino.rotation === 3) {
	        tetromino.components.tetromino.rotation = 0;
	    } else {
	        tetromino.components.tetromino.rotation++;
	    }
	
	    return tetromino;
	}
	
	var ActionQueue = function (_System) {
	    _inherits(ActionQueue, _System);
	
	    function ActionQueue() {
	        _classCallCheck(this, ActionQueue);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(ActionQueue).apply(this, arguments));
	    }
	
	    _createClass(ActionQueue, [{
	        key: 'tick',
	        value: function tick(entityMap) {
	            if (!this.gameContext.isStarted) {
	                return entityMap;
	            }
	
	            var controlledTetromino = null,
	                board = null;
	
	            entityMap.forEach(function (entity) {
	                if (entity.components.playerControlled && true === entity.components.playerControlled.isControlled) {
	                    controlledTetromino = entity;
	                }
	                if (entity.components.board) {
	                    board = entity;
	                }
	            });
	            if (controlledTetromino) {
	                this.processActions(controlledTetromino, board);
	            }
	            return entityMap;
	        }
	        /**
	         *
	         * @param {Entity} tetromino
	         */
	
	    }, {
	        key: 'processActions',
	        value: function processActions(tetromino, board) {
	            var _this2 = this;
	
	            (0, _forOwn2.default)(tetromino.components.actionQueue.actionQueue, function (action) {
	                if (0 === action.priority) {
	                    return _this2.applyAction(action, tetromino, board);
	                }
	                action.priority--;
	                return action;
	            });
	        }
	    }, {
	        key: 'setDefaultAction',
	        value: function setDefaultAction(tetromino) {
	
	            if (!tetromino.components.actionQueue.actionQueue[_Utils2.default.ACTION.DOWN]) {
	                tetromino.components.actionQueue.actionQueue[_Utils2.default.ACTION.DOWN] = {
	                    id: _Utils2.default.ACTION.DOWN,
	                    priority: Math.abs(this.gameContext.speed - 10)
	                };
	            }
	        }
	    }, {
	        key: 'canDo',
	        value: function canDo(controlledTetromino, board, action) {
	
	            var cloned = (0, _cloneDeep2.default)(controlledTetromino);
	
	            switch (action.id) {
	                case _Utils2.default.ACTION.DOWN:
	                    cloned.components.position.y += cloned.components.tetromino.blockSize;
	                    break;
	                case _Utils2.default.ACTION.LEFT:
	                    cloned.components.position.x -= cloned.components.tetromino.blockSize;
	                    break;
	                case _Utils2.default.ACTION.RIGHT:
	                    cloned.components.position.x += cloned.components.tetromino.blockSize;
	                    break;
	                case _Utils2.default.ACTION.ROTATE:
	                    _rotate(cloned);
	                    break;
	            }
	            return !_Utils2.default.isOccupied(cloned, board);
	        }
	
	        /**
	         *
	         * @param {Number} action @see Utils
	         * @param {Entity} tetromino
	         * @param {Entity} board
	         * @returns {*}
	         */
	
	    }, {
	        key: 'applyAction',
	        value: function applyAction(action, tetromino, board) {
	            delete tetromino.components.actionQueue.actionQueue[action.id];
	
	            if (!this.canDo(tetromino, board, action)) {
	
	                if (action.id === _Utils2.default.ACTION.DOWN) {
	                    tetromino.components.playerControlled.isControlled = false;
	                    tetromino.components.actionQueue.actionQueue = {};
	                    this.setOccupiedCells(board, tetromino);
	                }
	                return;
	            }
	
	            switch (action.id) {
	                case _Utils2.default.ACTION.DOWN:
	                    tetromino.components.position.y += tetromino.components.tetromino.blockSize;
	                    break;
	                case _Utils2.default.ACTION.LEFT:
	                    tetromino.components.position.x -= tetromino.components.tetromino.blockSize;
	                    break;
	                case _Utils2.default.ACTION.RIGHT:
	                    tetromino.components.position.x += tetromino.components.tetromino.blockSize;
	                    break;
	                case _Utils2.default.ACTION.ROTATE:
	                    _rotate(tetromino);
	                    break;
	            }
	
	            return this.setDefaultAction(tetromino);
	        }
	    }, {
	        key: 'setOccupiedCells',
	        value: function setOccupiedCells(board, tetromino) {
	
	            var tc = (tetromino.components.position.x - board.components.position.x) / tetromino.components.tetromino.blockSize;
	            var tr = (tetromino.components.position.y - board.components.position.y) / tetromino.components.tetromino.blockSize;
	
	            _Utils2.default.eachBlock(tetromino, function (col, row, entity) {
	                board.components.board.cellMatrix[row + tr][col + tc].type = entity.components.tetromino.definition.color;
	            });
	            //remove
	            this.gameContext.entities.delete(tetromino.id);
	        }
	    }]);
	
	    return ActionQueue;
	}(_System3.default);

	exports.default = ActionQueue;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var baseClone = __webpack_require__(59);
	
	/**
	 * This method is like `_.clone` except that it recursively clones `value`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to recursively clone.
	 * @returns {*} Returns the deep cloned value.
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var deep = _.cloneDeep(objects);
	 * console.log(deep[0] === objects[0]);
	 * // => false
	 */
	function cloneDeep(value) {
	  return baseClone(value, true);
	}
	
	module.exports = cloneDeep;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(60),
	    arrayEach = __webpack_require__(88),
	    assignValue = __webpack_require__(89),
	    baseAssign = __webpack_require__(90),
	    baseForOwn = __webpack_require__(93),
	    copyArray = __webpack_require__(96),
	    copySymbols = __webpack_require__(97),
	    getTag = __webpack_require__(99),
	    initCloneArray = __webpack_require__(101),
	    initCloneByTag = __webpack_require__(102),
	    initCloneObject = __webpack_require__(116),
	    isArray = __webpack_require__(20),
	    isHostObject = __webpack_require__(76),
	    isObject = __webpack_require__(17);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
	cloneableTags[dateTag] = cloneableTags[float32Tag] =
	cloneableTags[float64Tag] = cloneableTags[int8Tag] =
	cloneableTags[int16Tag] = cloneableTags[int32Tag] =
	cloneableTags[mapTag] = cloneableTags[numberTag] =
	cloneableTags[objectTag] = cloneableTags[regexpTag] =
	cloneableTags[setTag] = cloneableTags[stringTag] =
	cloneableTags[symbolTag] = cloneableTags[uint8Tag] =
	cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] =
	cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[weakMapTag] = false;
	
	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, isDeep, customizer, key, object, stack) {
	  var result;
	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag(value),
	        isFunc = tag == funcTag || tag == genTag;
	
	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      if (isHostObject(value)) {
	        return object ? value : {};
	      }
	      result = initCloneObject(isFunc ? {} : value);
	      if (!isDeep) {
	        return copySymbols(value, baseAssign(result, value));
	      }
	    } else {
	      return cloneableTags[tag]
	        ? initCloneByTag(value, tag, isDeep)
	        : (object ? value : {});
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack);
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);
	
	  // Recursively populate clone (susceptible to call stack limits).
	  (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
	    assignValue(result, key, baseClone(subValue, isDeep, customizer, key, value, stack));
	  });
	  return isArr ? result : copySymbols(value, result);
	}
	
	module.exports = baseClone;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var stackClear = __webpack_require__(61),
	    stackDelete = __webpack_require__(62),
	    stackGet = __webpack_require__(65),
	    stackHas = __webpack_require__(67),
	    stackSet = __webpack_require__(69);
	
	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 */
	function Stack(values) {
	  var index = -1,
	      length = values ? values.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = values[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add functions to the `Stack` cache.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;
	
	module.exports = Stack;


/***/ },
/* 61 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = { 'array': [], 'map': null };
	}
	
	module.exports = stackClear;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var assocDelete = __webpack_require__(63);
	
	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      array = data.array;
	
	  return array ? assocDelete(array, key) : data.map['delete'](key);
	}
	
	module.exports = stackDelete;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var assocIndexOf = __webpack_require__(64);
	
	/** Used for built-in method references. */
	var arrayProto = global.Array.prototype;
	
	/** Built-in value references. */
	var splice = arrayProto.splice;
	
	/**
	 * Removes `key` and its value from the associative array.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function assocDelete(array, key) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = array.length - 1;
	  if (index == lastIndex) {
	    array.pop();
	  } else {
	    splice.call(array, index, 1);
	  }
	  return true;
	}
	
	module.exports = assocDelete;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(39);
	
	/**
	 * Gets the index at which the first occurrence of `key` is found in `array`
	 * of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}
	
	module.exports = assocIndexOf;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var assocGet = __webpack_require__(66);
	
	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  var data = this.__data__,
	      array = data.array;
	
	  return array ? assocGet(array, key) : data.map.get(key);
	}
	
	module.exports = stackGet;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(64);
	
	/**
	 * Gets the associative array value for `key`.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function assocGet(array, key) {
	  var index = assocIndexOf(array, key);
	  return index < 0 ? undefined : array[index][1];
	}
	
	module.exports = assocGet;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var assocHas = __webpack_require__(68);
	
	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  var data = this.__data__,
	      array = data.array;
	
	  return array ? assocHas(array, key) : data.map.has(key);
	}
	
	module.exports = stackHas;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(64);
	
	/**
	 * Checks if an associative array value for `key` exists.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function assocHas(array, key) {
	  return assocIndexOf(array, key) > -1;
	}
	
	module.exports = assocHas;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(70),
	    assocSet = __webpack_require__(86);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache object.
	 */
	function stackSet(key, value) {
	  var data = this.__data__,
	      array = data.array;
	
	  if (array) {
	    if (array.length < (LARGE_ARRAY_SIZE - 1)) {
	      assocSet(array, key, value);
	    } else {
	      data.array = null;
	      data.map = new MapCache(array);
	    }
	  }
	  var map = data.map;
	  if (map) {
	    map.set(key, value);
	  }
	  return this;
	}
	
	module.exports = stackSet;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var mapClear = __webpack_require__(71),
	    mapDelete = __webpack_require__(78),
	    mapGet = __webpack_require__(82),
	    mapHas = __webpack_require__(84),
	    mapSet = __webpack_require__(85);
	
	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 */
	function MapCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = values[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add functions to the `MapCache`.
	MapCache.prototype.clear = mapClear;
	MapCache.prototype['delete'] = mapDelete;
	MapCache.prototype.get = mapGet;
	MapCache.prototype.has = mapHas;
	MapCache.prototype.set = mapSet;
	
	module.exports = MapCache;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(72),
	    Map = __webpack_require__(77);
	
	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapClear() {
	  this.__data__ = { 'hash': new Hash, 'map': Map ? new Map : [], 'string': new Hash };
	}
	
	module.exports = mapClear;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var nativeCreate = __webpack_require__(73);
	
	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;
	
	/**
	 * Creates an hash object.
	 *
	 * @private
	 * @returns {Object} Returns the new hash object.
	 */
	function Hash() {}
	
	// Avoid inheriting from `Object.prototype` when possible.
	Hash.prototype = nativeCreate ? nativeCreate(null) : objectProto;
	
	module.exports = Hash;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(74);
	
	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');
	
	module.exports = nativeCreate;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(75);
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}
	
	module.exports = getNative;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var isFunction = __webpack_require__(16),
	    isHostObject = __webpack_require__(76),
	    isObjectLike = __webpack_require__(19);
	
	/** Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns). */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	
	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = global.Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(funcToString.call(value));
	  }
	  return isObjectLike(value) &&
	    (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
	}
	
	module.exports = isNative;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 76 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}
	
	module.exports = isHostObject;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var getNative = __webpack_require__(74);
	
	/* Built-in method references that are verified to be native. */
	var Map = getNative(global, 'Map');
	
	module.exports = Map;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(77),
	    assocDelete = __webpack_require__(63),
	    hashDelete = __webpack_require__(79),
	    isKeyable = __webpack_require__(81);
	
	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapDelete(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashDelete(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map['delete'](key) : assocDelete(data.map, key);
	}
	
	module.exports = mapDelete;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var hashHas = __webpack_require__(80);
	
	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(hash, key) {
	  return hashHas(hash, key) && delete hash[key];
	}
	
	module.exports = hashDelete;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var nativeCreate = __webpack_require__(73);
	
	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(hash, key) {
	  return nativeCreate ? hash[key] !== undefined : hasOwnProperty.call(hash, key);
	}
	
	module.exports = hashHas;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 81 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return type == 'number' || type == 'boolean' ||
	    (type == 'string' && value !== '__proto__') || value == null;
	}
	
	module.exports = isKeyable;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(77),
	    assocGet = __webpack_require__(66),
	    hashGet = __webpack_require__(83),
	    isKeyable = __webpack_require__(81);
	
	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapGet(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashGet(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.get(key) : assocGet(data.map, key);
	}
	
	module.exports = mapGet;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var nativeCreate = __webpack_require__(73);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(hash, key) {
	  if (nativeCreate) {
	    var result = hash[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(hash, key) ? hash[key] : undefined;
	}
	
	module.exports = hashGet;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(77),
	    assocHas = __webpack_require__(68),
	    hashHas = __webpack_require__(80),
	    isKeyable = __webpack_require__(81);
	
	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapHas(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashHas(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.has(key) : assocHas(data.map, key);
	}
	
	module.exports = mapHas;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(77),
	    assocSet = __webpack_require__(86),
	    hashSet = __webpack_require__(87),
	    isKeyable = __webpack_require__(81);
	
	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache object.
	 */
	function mapSet(key, value) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    hashSet(typeof key == 'string' ? data.string : data.hash, key, value);
	  } else if (Map) {
	    data.map.set(key, value);
	  } else {
	    assocSet(data.map, key, value);
	  }
	  return this;
	}
	
	module.exports = mapSet;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(64);
	
	/**
	 * Sets the associative array `key` to `value`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function assocSet(array, key, value) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    array.push([key, value]);
	  } else {
	    array[index][1] = value;
	  }
	}
	
	module.exports = assocSet;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(73);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function hashSet(hash, key, value) {
	  hash[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	}
	
	module.exports = hashSet;


/***/ },
/* 88 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}
	
	module.exports = arrayEach;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var eq = __webpack_require__(39);
	
	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if ((!eq(objValue, value) ||
	        (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}
	
	module.exports = assignValue;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(91),
	    keys = __webpack_require__(6);
	
	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys(source), object);
	}
	
	module.exports = baseAssign;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var copyObjectWith = __webpack_require__(92);
	
	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object) {
	  return copyObjectWith(source, props, object);
	}
	
	module.exports = copyObject;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(89);
	
	/**
	 * This function is like `copyObject` except that it accepts a function to
	 * customize copied values.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObjectWith(source, props, object, customizer) {
	  object || (object = {});
	
	  var index = -1,
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index],
	        newValue = customizer ? customizer(object[key], source[key], key, object, source) : source[key];
	
	    assignValue(object, key, newValue);
	  }
	  return object;
	}
	
	module.exports = copyObjectWith;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(94),
	    keys = __webpack_require__(6);
	
	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}
	
	module.exports = baseForOwn;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(95);
	
	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();
	
	module.exports = baseFor;


/***/ },
/* 95 */
/***/ function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;
	
	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}
	
	module.exports = createBaseFor;


/***/ },
/* 96 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;
	
	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}
	
	module.exports = copyArray;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(91),
	    getSymbols = __webpack_require__(98);
	
	/**
	 * Copies own symbol properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return copyObject(source, getSymbols(source), object);
	}
	
	module.exports = copySymbols;


/***/ },
/* 98 */
/***/ function(module, exports) {

	/** Built-in value references. */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	
	/**
	 * Creates an array of the own symbol properties of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = getOwnPropertySymbols || function() {
	  return [];
	};
	
	module.exports = getSymbols;


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var Map = __webpack_require__(77),
	    Set = __webpack_require__(100);
	
	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    setTag = '[object Set]';
	
	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = global.Function.prototype.toString;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Used to detect maps and sets. */
	var mapCtorString = Map ? funcToString.call(Map) : '',
	    setCtorString = Set ? funcToString.call(Set) : '';
	
	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function getTag(value) {
	  return objectToString.call(value);
	}
	
	// Fallback for IE 11 providing `toStringTag` values for maps and sets.
	if ((Map && getTag(new Map) != mapTag) || (Set && getTag(new Set) != setTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : null,
	        ctorString = typeof Ctor == 'function' ? funcToString.call(Ctor) : '';
	
	    if (ctorString) {
	      if (ctorString == mapCtorString) {
	        return mapTag;
	      }
	      if (ctorString == setCtorString) {
	        return setTag;
	      }
	    }
	    return result;
	  };
	}
	
	module.exports = getTag;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var getNative = __webpack_require__(74);
	
	/* Built-in method references that are verified to be native. */
	var Set = getNative(global, 'Set');
	
	module.exports = Set;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 101 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Used for built-in method references. */
	var objectProto = global.Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = array.constructor(length);
	
	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}
	
	module.exports = initCloneArray;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var cloneBuffer = __webpack_require__(103),
	    cloneMap = __webpack_require__(105),
	    cloneRegExp = __webpack_require__(109),
	    cloneSet = __webpack_require__(110),
	    cloneSymbol = __webpack_require__(113),
	    cloneTypedArray = __webpack_require__(115);
	
	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return cloneBuffer(object);
	
	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);
	
	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      return cloneTypedArray(object, isDeep);
	
	    case mapTag:
	      return cloneMap(object);
	
	    case numberTag:
	    case stringTag:
	      return new Ctor(object);
	
	    case regexpTag:
	      return cloneRegExp(object);
	
	    case setTag:
	      return cloneSet(object);
	
	    case symbolTag:
	      return cloneSymbol(object);
	  }
	}
	
	module.exports = initCloneByTag;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var Uint8Array = __webpack_require__(104);
	
	/**
	 * Creates a clone of `buffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} buffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneBuffer(buffer) {
	  var Ctor = buffer.constructor,
	      result = new Ctor(buffer.byteLength),
	      view = new Uint8Array(result);
	
	  view.set(new Uint8Array(buffer));
	  return result;
	}
	
	module.exports = cloneBuffer;


/***/ },
/* 104 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Built-in value references. */
	var Uint8Array = global.Uint8Array;
	
	module.exports = Uint8Array;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var addMapEntry = __webpack_require__(106),
	    arrayReduce = __webpack_require__(107),
	    mapToArray = __webpack_require__(108);
	
	/**
	 * Creates a clone of `map`.
	 *
	 * @private
	 * @param {Object} map The map to clone.
	 * @returns {Object} Returns the cloned map.
	 */
	function cloneMap(map) {
	  var Ctor = map.constructor;
	  return arrayReduce(mapToArray(map), addMapEntry, new Ctor);
	}
	
	module.exports = cloneMap;


/***/ },
/* 106 */
/***/ function(module, exports) {

	/**
	 * Adds the key-value `pair` to `map`.
	 *
	 * @private
	 * @param {Object} map The map to modify.
	 * @param {Array} pair The key-value pair to add.
	 * @returns {Object} Returns `map`.
	 */
	function addMapEntry(map, pair) {
	  map.set(pair[0], pair[1]);
	  return map;
	}
	
	module.exports = addMapEntry;


/***/ },
/* 107 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array.length;
	
	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}
	
	module.exports = arrayReduce;


/***/ },
/* 108 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to an array.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);
	
	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}
	
	module.exports = mapToArray;


/***/ },
/* 109 */
/***/ function(module, exports) {

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;
	
	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var Ctor = regexp.constructor,
	      result = new Ctor(regexp.source, reFlags.exec(regexp));
	
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}
	
	module.exports = cloneRegExp;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var addSetEntry = __webpack_require__(111),
	    arrayReduce = __webpack_require__(107),
	    setToArray = __webpack_require__(112);
	
	/**
	 * Creates a clone of `set`.
	 *
	 * @private
	 * @param {Object} set The set to clone.
	 * @returns {Object} Returns the cloned set.
	 */
	function cloneSet(set) {
	  var Ctor = set.constructor;
	  return arrayReduce(setToArray(set), addSetEntry, new Ctor);
	}
	
	module.exports = cloneSet;


/***/ },
/* 111 */
/***/ function(module, exports) {

	/**
	 * Adds `value` to `set`.
	 *
	 * @private
	 * @param {Object} set The set to modify.
	 * @param {*} value The value to add.
	 * @returns {Object} Returns `set`.
	 */
	function addSetEntry(set, value) {
	  set.add(value);
	  return set;
	}
	
	module.exports = addSetEntry;


/***/ },
/* 112 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);
	
	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}
	
	module.exports = setToArray;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(114);
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = Symbol ? symbolProto.valueOf : undefined;
	
	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return Symbol ? Object(symbolValueOf.call(symbol)) : {};
	}
	
	module.exports = cloneSymbol;


/***/ },
/* 114 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Built-in value references. */
	var Symbol = global.Symbol;
	
	module.exports = Symbol;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var cloneBuffer = __webpack_require__(103);
	
	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = typedArray.buffer,
	      Ctor = typedArray.constructor;
	
	  return new Ctor(isDeep ? cloneBuffer(buffer) : buffer, typedArray.byteOffset, typedArray.length);
	}
	
	module.exports = cloneTypedArray;


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(117),
	    isFunction = __webpack_require__(16),
	    isPrototype = __webpack_require__(23);
	
	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  if (isPrototype(object)) {
	    return {};
	  }
	  var Ctor = object.constructor;
	  return baseCreate(isFunction(Ctor) ? Ctor.prototype : undefined);
	}
	
	module.exports = initCloneObject;


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(17);
	
	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(prototype) {
	    if (isObject(prototype)) {
	      object.prototype = prototype;
	      var result = new object;
	      object.prototype = undefined;
	    }
	    return result || {};
	  };
	}());
	
	module.exports = baseCreate;


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(93),
	    toFunction = __webpack_require__(119);
	
	/**
	 * Iterates over own enumerable properties of an object invoking `iteratee`
	 * for each property. The iteratee is invoked with three arguments:
	 * (value, key, object). Iteratee functions may exit iteration early by
	 * explicitly returning `false`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.forOwn(new Foo, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => logs 'a' then 'b' (iteration order is not guaranteed)
	 */
	function forOwn(object, iteratee) {
	  return object && baseForOwn(object, toFunction(iteratee));
	}
	
	module.exports = forOwn;


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(120);
	
	/**
	 * Converts `value` to a function if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Function} Returns the function.
	 */
	function toFunction(value) {
	  return typeof value == 'function' ? value : identity;
	}
	
	module.exports = toFunction;


/***/ },
/* 120 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _System2 = __webpack_require__(25);
	
	var _System3 = _interopRequireDefault(_System2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BoardCheck = function (_System) {
	    _inherits(BoardCheck, _System);
	
	    function BoardCheck() {
	        _classCallCheck(this, BoardCheck);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(BoardCheck).apply(this, arguments));
	    }
	
	    _createClass(BoardCheck, [{
	        key: 'tick',
	        value: function tick(entitiesMap) {
	            if (!this.gameContext.isStarted) {
	                return entitiesMap;
	            }
	
	            var board, score;
	            //@TODO use System.reduceEntityMap
	            entitiesMap.forEach(function (entity) {
	                if (entity.components.board) {
	                    board = entity;
	                }
	                if (entity.components.score) {
	                    score = entity;
	                }
	            });
	            this.checkRows(board, score);
	        }
	    }, {
	        key: 'checkRows',
	        value: function checkRows(board, score) {
	            var _this2 = this;
	
	            board.components.board.cellMatrix.forEach(function (row, index) {
	                var isFilled = true;
	                row.forEach(function (cell) {
	
	                    if (0 === index && undefined !== cell.type) {
	                        //we lost
	                        _this2.gameContext.lost = true;
	                        _this2.gameContext.isStarted = false;
	                    }
	
	                    isFilled &= undefined !== cell.type;
	                });
	                if (isFilled) {
	                    _this2.removeLine(board, index);
	                    _this2.updateScore(score);
	                    //@TODO after some rows filled we should update speed
	                }
	            });
	        }
	    }, {
	        key: 'updateScore',
	        value: function updateScore(score) {
	            score.components.score.price *= this.gameContext.speed;
	            score.components.score.score += score.components.score.price;
	            score.components.score.rows++;
	        }
	    }, {
	        key: 'removeLine',
	        value: function removeLine(board, line) {
	            //@FIXME use gnereics here on array
	            var y = undefined;
	            for (y = line; y >= 0; --y) {
	
	                board.components.board.cellMatrix[y].forEach(function (cell, index) {
	                    if (0 < y) {
	                        cell.type = board.components.board.cellMatrix[y - 1][index].type;
	                    } else {
	                        cell.type = undefined;
	                    }
	                });
	            }
	        }
	    }]);
	
	    return BoardCheck;
	}(_System3.default);

	exports.default = BoardCheck;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map