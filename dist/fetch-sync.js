(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["fetchSync"] = factory();
	else
		root["fetchSync"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { throw err; };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var SyncIdPrefix = exports.SyncIdPrefix = 'FETCH_SYNC__';
	
	var SyncTypes = exports.SyncTypes = {
	  SYNC: 'sync',
	  PERIODIC_SYNC: 'periodicSync'
	};
	
	var CommsChannelStatus = exports.CommsChannelStatus = {
	  OPEN: 1,
	  CLOSED: 0
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ADD_SYNC = exports.ADD_SYNC = 'ADD_SYNC';
	var ADD_SYNCS = exports.ADD_SYNCS = 'ADD_SYNCS';
	
	var REMOVE_SYNC = exports.REMOVE_SYNC = 'REMOVE_SYNC';
	var REMOVE_ALL_SYNCS = exports.REMOVE_ALL_SYNCS = 'REMOVE_ALL_SYNCS';
	
	var SET_SERVICE_WORKER = exports.SET_SERVICE_WORKER = 'SET_SERVICE_WORKER';
	var SET_COMMS_OPEN = exports.SET_COMMS_OPEN = 'SET_COMMS_OPEN';
	
	var Requests = exports.Requests = {
	  OPEN_COMMS: 'OPEN_COMMS',
	  REGISTER_SYNC: 'REGISTER_SYNC',
	  CANCEL_SYNC: 'CANCEL_SYNC',
	  CANCEL_ALL: 'CANCEL_ALL'
	};
	
	var Responses = exports.Responses = {
	  SUCCESS: 'SUCCESS',
	  FAILURE: 'FAILURE'
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.serialiseRequest=t():e.serialiseRequest=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){function r(e){return s.blobToArrayBuffer(e).then(function(e){return String.fromCharCode.apply(null,new Uint16Array(e))})}function o(e,t){return s.base64StringToBlob(e).then(function(e){switch(t){case c.ARRAY_BUFFER:return s.blobToArrayBuffer(e);case c.BLOB:return e;case c.FORM_DATA:throw new Error("Cannot make FormData from serialised Request");case c.JSON:return r(e).then(function(e){return JSON.parse(e)});case c.TEXT:return r(e);default:throw new Error('Unknown requested body type "'+t+'"')}})}function i(e,t){if(!(e instanceof Request))throw new Error("Expecting request to be instance of Request");for(var n=[],r=e.headers.keys(),o=0;o<r.length;o++){var i=r[o];n[i]=e.headers.get(i)}var u={method:e.method,url:e.url,headers:n,context:e.context,referrer:e.referrer,mode:e.mode,credentials:e.credentials,redirect:e.redirect,integrity:e.integrity,cache:e.cache,bodyUsed:e.bodyUsed};return e.blob().then(s.blobToBase64String).then(function(e){return u.__body=e,t?u:JSON.stringify(u)})}function u(e){var t,n;if("string"==typeof e)t=JSON.parse(e),n=t.url;else{if("object"!=typeof e)throw new Error("Expecting serialised request to be a string or object");t=e,n=t.url}const r=new Request(n,t),i={context:{enumerable:!0,value:t.context}},u=Object.keys(c).reduce(function(e,n){const i=f[n];return e[i]={enumerable:!0,value:function(){return r.bodyUsed?Promise.reject(new TypeError("Already used")):(r.bodyUsed=!0,Promise.resolve(o(t.__body,n)))}},e},i);return Object.defineProperties(r,u),r}var a,a,s=n(1),c={ARRAY_BUFFER:"ARRAY_BUFFER",BLOB:"BLOB",FORM_DATA:"FORM_DATA",JSON:"JSON",TEXT:"TEXT"},f={ARRAY_BUFFER:"arrayBuffer",BLOB:"blob",FORM_DATA:"formData",JSON:"json",TEXT:"text"};i.deserialise=u,i.deserialize=u,a=function(){return i}.call(t,n,t,e),!(void 0!==a&&(e.exports=a)),a=function(){return i}.call(t,n,t,e),!(void 0!==a&&(e.exports=a))},function(e,t,n){"use strict";function r(e){for(var t=e.length,n=new ArrayBuffer(t),r=new Uint8Array(n),o=-1;++o<t;)r[o]=e.charCodeAt(o);return n}function o(e){for(var t="",n=new Uint8Array(e),r=n.byteLength,o=-1;++o<r;)t+=String.fromCharCode(n[o]);return t}function i(e,t){return new R(function(n,r){var o=new Image;t&&(o.crossOrigin=t),o.onload=function(){n(o)},o.onerror=r,o.src=e})}function u(e){var t=document.createElement("canvas");t.width=e.width,t.height=e.height;var n=t.getContext("2d");return n.drawImage(e,0,0,e.width,e.height,0,0,e.width,e.height),t}function a(e,t){return t=t||{},"string"==typeof t&&(t={type:t}),new g(e,t)}function s(e){return(window.URL||window.webkitURL).createObjectURL(e)}function c(e){return(window.URL||window.webkitURL).revokeObjectURL(e)}function f(e){return new R(function(t,n){var r=new FileReader,i="function"==typeof r.readAsBinaryString;r.onloadend=function(e){var n=e.target.result||"";return i?t(n):void t(o(n))},r.onerror=n,i?r.readAsBinaryString(e):r.readAsArrayBuffer(e)})}function l(e,t){return R.resolve().then(function(){var n=[r(atob(e))];return t?a(n,{type:t}):a(n)})}function d(e,t){return R.resolve().then(function(){return l(btoa(e),t)})}function h(e){return f(e).then(function(e){return btoa(e)})}function p(e){return R.resolve().then(function(){var t=e.match(/data:([^;]+)/)[1],n=e.replace(/^[^,]+,/,""),o=r(atob(n));return a([o],{type:t})})}function v(e,t,n,r){return t=t||"image/png",i(e,n).then(function(e){return u(e)}).then(function(e){return e.toDataURL(t,r)})}function y(e,t,n){return R.resolve().then(function(){return"function"==typeof e.toBlob?new R(function(r){e.toBlob(r,t,n)}):p(e.toDataURL(t,n))})}function b(e,t,n,r){return t=t||"image/png",i(e,n).then(function(e){return u(e)}).then(function(e){return y(e,t,r)})}function w(e,t){return R.resolve().then(function(){return a([e],t)})}function m(e){return new R(function(t,n){var r=new FileReader;r.onloadend=function(e){var n=e.target.result||new ArrayBuffer(0);t(n)},r.onerror=n,r.readAsArrayBuffer(e)})}var g=n(2),R=n(3);e.exports={createBlob:a,createObjectURL:s,revokeObjectURL:c,imgSrcToBlob:b,imgSrcToDataURL:v,canvasToBlob:y,dataURLToBlob:p,blobToBase64String:h,base64StringToBlob:l,binaryStringToBlob:d,blobToBinaryString:f,arrayBufferToBlob:w,blobToArrayBuffer:m}},function(e,t){(function(t){function n(e){for(var t=0;t<e.length;t++){var n=e[t];if(n.buffer instanceof ArrayBuffer){var r=n.buffer;if(n.byteLength!==r.byteLength){var o=new Uint8Array(n.byteLength);o.set(new Uint8Array(r,n.byteOffset,n.byteLength)),r=o.buffer}e[t]=r}}}function r(e,t){t=t||{};var r=new i;n(e);for(var o=0;o<e.length;o++)r.append(e[o]);return t.type?r.getBlob(t.type):r.getBlob()}function o(e,t){return n(e),new Blob(e,t||{})}var i=t.BlobBuilder||t.WebKitBlobBuilder||t.MSBlobBuilder||t.MozBlobBuilder,u=function(){try{var e=new Blob(["hi"]);return 2===e.size}catch(t){return!1}}(),a=u&&function(){try{var e=new Blob([new Uint8Array([1,2])]);return 2===e.size}catch(t){return!1}}(),s=i&&i.prototype.append&&i.prototype.getBlob;e.exports=function(){return u?a?t.Blob:o:s?r:void 0}()}).call(t,function(){return this}())},function(e,t,n){(function(t){"function"==typeof t.Promise?e.exports=t.Promise:e.exports=n(4)}).call(t,function(){return this}())},function(e,t,n){var r,r;!function(t){e.exports=t()}(function(){return function e(t,n,o){function i(a,s){if(!n[a]){if(!t[a]){var c="function"==typeof r&&r;if(!s&&c)return r(a,!0);if(u)return u(a,!0);throw new Error("Cannot find module '"+a+"'")}var f=n[a]={exports:{}};t[a][0].call(f.exports,function(e){var n=t[a][1][e];return i(n?n:e)},f,f.exports,e,t,n,o)}return n[a].exports}for(var u="function"==typeof r&&r,a=0;a<o.length;a++)i(o[a]);return i}({1:[function(e,t,n){"use strict";function r(){}t.exports=r},{}],2:[function(e,t,n){"use strict";var r=e("./promise"),o=e("./reject"),i=e("./resolve"),u=e("./INTERNAL"),a=e("./handlers"),s=o(new TypeError("must be an array"));t.exports=function(e){function t(e,t){function r(e){c[t]=e,++f===n&!o&&(o=!0,a.resolve(d,c))}i(e).then(r,function(e){o||(o=!0,a.reject(d,e))})}if("[object Array]"!==Object.prototype.toString.call(e))return s;var n=e.length,o=!1;if(!n)return i([]);for(var c=new Array(n),f=0,l=-1,d=new r(u);++l<n;)t(e[l],l);return d}},{"./INTERNAL":1,"./handlers":3,"./promise":5,"./reject":7,"./resolve":8}],3:[function(e,t,n){"use strict";function r(e){var t=e&&e.then;return e&&"object"==typeof e&&"function"==typeof t?function(){t.apply(e,arguments)}:void 0}var o=e("./tryCatch"),i=e("./resolveThenable"),u=e("./states");n.resolve=function(e,t){var a=o(r,t);if("error"===a.status)return n.reject(e,a.value);var s=a.value;if(s)i.safely(e,s);else{e.state=u.FULFILLED,e.outcome=t;for(var c=-1,f=e.queue.length;++c<f;)e.queue[c].callFulfilled(t)}return e},n.reject=function(e,t){e.state=u.REJECTED,e.outcome=t;for(var n=-1,r=e.queue.length;++n<r;)e.queue[n].callRejected(t);return e}},{"./resolveThenable":9,"./states":10,"./tryCatch":11}],4:[function(e,t,n){t.exports=n=e("./promise"),n.resolve=e("./resolve"),n.reject=e("./reject"),n.all=e("./all")},{"./all":2,"./promise":5,"./reject":7,"./resolve":8}],5:[function(e,t,n){"use strict";function r(e){if(!(this instanceof r))return new r(e);if("function"!=typeof e)throw new TypeError("reslover must be a function");this.state=a.PENDING,this.queue=[],this.outcome=void 0,e!==i&&u.safely(this,e)}var o=e("./unwrap"),i=e("./INTERNAL"),u=e("./resolveThenable"),a=e("./states"),s=e("./queueItem");t.exports=r,r.prototype["catch"]=function(e){return this.then(null,e)},r.prototype.then=function(e,t){if("function"!=typeof e&&this.state===a.FULFILLED||"function"!=typeof t&&this.state===a.REJECTED)return this;var n=new r(i);if(this.state!==a.PENDING){var u=this.state===a.FULFILLED?e:t;o(n,u,this.outcome)}else this.queue.push(new s(n,e,t));return n}},{"./INTERNAL":1,"./queueItem":6,"./resolveThenable":9,"./states":10,"./unwrap":12}],6:[function(e,t,n){"use strict";function r(e,t,n){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof n&&(this.onRejected=n,this.callRejected=this.otherCallRejected)}var o=e("./handlers"),i=e("./unwrap");t.exports=r,r.prototype.callFulfilled=function(e){o.resolve(this.promise,e)},r.prototype.otherCallFulfilled=function(e){i(this.promise,this.onFulfilled,e)},r.prototype.callRejected=function(e){o.reject(this.promise,e)},r.prototype.otherCallRejected=function(e){i(this.promise,this.onRejected,e)}},{"./handlers":3,"./unwrap":12}],7:[function(e,t,n){"use strict";function r(e){var t=new o(i);return u.reject(t,e)}var o=e("./promise"),i=e("./INTERNAL"),u=e("./handlers");t.exports=r},{"./INTERNAL":1,"./handlers":3,"./promise":5}],8:[function(e,t,n){"use strict";function r(e){if(e)return e instanceof o?e:u.resolve(new o(i),e);var t=typeof e;switch(t){case"boolean":return a;case"undefined":return c;case"object":return s;case"number":return f;case"string":return l}}var o=e("./promise"),i=e("./INTERNAL"),u=e("./handlers");t.exports=r;var a=u.resolve(new o(i),!1),s=u.resolve(new o(i),null),c=u.resolve(new o(i),void 0),f=u.resolve(new o(i),0),l=u.resolve(new o(i),"")},{"./INTERNAL":1,"./handlers":3,"./promise":5}],9:[function(e,t,n){"use strict";function r(e,t){function n(t){a||(a=!0,o.reject(e,t))}function r(t){a||(a=!0,o.resolve(e,t))}function u(){t(r,n)}var a=!1,s=i(u);"error"===s.status&&n(s.value)}var o=e("./handlers"),i=e("./tryCatch");n.safely=r},{"./handlers":3,"./tryCatch":11}],10:[function(e,t,n){n.REJECTED=["REJECTED"],n.FULFILLED=["FULFILLED"],n.PENDING=["PENDING"]},{}],11:[function(e,t,n){"use strict";function r(e,t){var n={};try{n.value=e(t),n.status="success"}catch(r){n.status="error",n.value=r}return n}t.exports=r},{}],12:[function(e,t,n){"use strict";function r(e,t,n){o(function(){var r;try{r=t(n)}catch(o){return i.reject(e,o)}r===e?i.reject(e,new TypeError("Cannot resolve promise with itself")):i.resolve(e,r)})}var o=e("immediate"),i=e("./handlers");t.exports=r},{"./handlers":3,immediate:13}],13:[function(e,t,n){"use strict";function r(){i=!0;for(var e,t,n=s.length;n;){for(t=s,s=[],e=-1;++e<n;)t[e]();n=s.length}i=!1}function o(e){1!==s.push(e)||i||u()}for(var i,u,a=[e("./nextTick"),e("./messageChannel"),e("./stateChange"),e("./timeout")],s=[],c=-1,f=a.length;++c<f;)if(a[c].test()){u=a[c].install(r);break}t.exports=o},{"./messageChannel":14,"./nextTick":15,"./stateChange":16,"./timeout":17}],14:[function(e,t,n){(function(e){"use strict";n.test=function(){return e.setImmediate?!1:"undefined"!=typeof e.MessageChannel},n.install=function(t){var n=new e.MessageChannel;return n.port1.onmessage=t,function(){n.port2.postMessage(0)}}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],15:[function(e,t,n){(function(e){"use strict";var t=e.MutationObserver||e.WebKitMutationObserver;n.test=function(){return t},n.install=function(n){var r=0,o=new t(n),i=e.document.createTextNode("");return o.observe(i,{characterData:!0}),function(){i.data=r=++r%2}}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],16:[function(e,t,n){(function(e){"use strict";n.test=function(){return"document"in e&&"onreadystatechange"in e.document.createElement("script")},n.install=function(t){return function(){var n=e.document.createElement("script");return n.onreadystatechange=function(){t(),n.onreadystatechange=null,n.parentNode.removeChild(n),n=null},e.document.documentElement.appendChild(n),t}}}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],17:[function(e,t,n){"use strict";n.test=function(){return!0},n.install=function(e){return function(){setTimeout(e,0)}}},{}]},{},[4])(4)})}])});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/* global __DEV__:false */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _miniDefer = __webpack_require__(5);
	
	var _miniDefer2 = _interopRequireDefault(_miniDefer);
	
	var _reduxThunk = __webpack_require__(18);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _reduxLogger = __webpack_require__(17);
	
	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);
	
	var _redux = __webpack_require__(22);
	
	var _actionTypes = __webpack_require__(1);
	
	var _constants = __webpack_require__(0);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var middlewares = [_reduxThunk2.default];
	
	if (true) {
	  middlewares.push((0, _reduxLogger2.default)({ collapsed: true }));
	}
	
	exports.default = (0, _redux.createStore)((0, _redux.combineReducers)({ serviceWorker: serviceWorker, commsChannel: commsChannel, syncs: syncs }), _redux.applyMiddleware.apply(undefined, middlewares));
	
	
	function serviceWorker() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	  var action = arguments[1];
	
	  return action.type === _actionTypes.SET_SERVICE_WORKER ? action.value : state;
	}
	
	function commsChannel() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? _extends({
	    status: _constants.CommsChannelStatus.CLOSED
	  }, (0, _miniDefer2.default)()) : arguments[0];
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _actionTypes.SET_COMMS_OPEN:
	      if (!action.open) {
	        state.reject();
	        return state;
	      }
	      state.resolve();
	      state.status = _constants.CommsChannelStatus.OPEN;
	      return state;
	    default:
	      return state;
	  }
	}
	
	function syncs() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _actionTypes.ADD_SYNC:
	      state = Object.assign({}, state);
	      state[action.sync.id] = action.sync;
	      return state;
	    case _actionTypes.ADD_SYNCS:
	      return Object.assign({}, state, action.syncs);
	    case _actionTypes.REMOVE_SYNC:
	      delete state[action.sync.id];
	      return Object.assign({}, state);
	    case _actionTypes.REMOVE_ALL_SYNCS:
	      return {};
	    default:
	      return state;
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_RESULT__;'use strict'
	
	/* global Response:false, FileReader:false */
	
	// https://gist.github.com/davoclavo/4424731
	function dataURItoBlob (dataURI) {
	  var byteString = atob(dataURI.split(',')[1])
	  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
	  var arrayBuffer = new ArrayBuffer(byteString.length)
	  var _ia = new Uint8Array(arrayBuffer)
	  for (var i = 0; i < byteString.length; i++) {
	    _ia[i] = byteString.charCodeAt(i)
	  }
	  var dataView = new DataView(arrayBuffer)
	  return new Blob([dataView.buffer], {type: mimeString})
	}
	
	/**
	 * Serialise a Response to a string or object.
	 * @param {Response} response
	 */
	function serialiseResponse (response) {
	  if (!(response instanceof Response)) {
	    throw new Error('Expecting response to be instance of Response')
	  }
	
	  var headers = []
	  var headerNames = response.headers.keys()
	  for (var i = 0; i < headerNames.length; i++) {
	    var headerName = headerNames[i]
	    headers[headerName] = response.headers.get(headerName)
	  }
	
	  return new Promise(function (resolve, reject) {
	    var reader = new FileReader()
	    response.blob().then(function (blob) {
	      return reader.readAsDataURL(blob)
	    })
	    reader.onerror = reject
	    reader.onloadend = function () {
	      resolve(JSON.stringify({
	        type: response.type,
	        url: response.url,
	        useFinalURL: response.useFinalURL,
	        status: response.status,
	        ok: response.ok,
	        statusText: response.statusText,
	        headers: headers,
	        __body: reader.result
	      }))
	    }
	  })
	}
	
	/**
	 * De-serialise a Response from a string or object.
	 * @param {Object|String} response
	 */
	function deserialiseResponse (response) {
	  var realResponse
	
	  if (typeof response === 'string') {
	    realResponse = JSON.parse(response)
	  } else if (typeof response === 'object') {
	    realResponse = response
	  } else {
	    throw new Error('Expecting serialised response to be a string or object')
	  }
	
	  return new Response(dataURItoBlob(realResponse.__body))
	}
	
	serialiseResponse.deserialise = deserialiseResponse
	serialiseResponse.deserialize = deserialiseResponse
	
	/* global define:false window:false */
	if (true) {
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return serialiseResponse
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return serialiseResponse
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	} else if (typeof module === 'object' && module.exports) {
	  module.exports = serialiseResponse
	} else if (typeof window !== 'undefined') {
	  window.serialiseResponse = serialiseResponse
	  window.serializeResponse = serialiseResponse
	} else {
	  throw new Error(
	    'Environment is not supported. ' +
	    'Please raise an issue at https://github.com/sdgluck/serialise-response/issues'
	  )
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict'
	
	/* global Promise:false */
	
	/**
	 * Create a deferred.
	 * @returns {Object}
	 */
	module.exports = function defer () {
	  var res
	  var rej
	  var promise = new Promise(function (resolve, reject) {
	    res = resolve
	    rej = reject
	  })
	  return {
	    promise: promise,
	    resolve: res,
	    reject: rej
	  }
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.requestOpenComms = exports.requestCancelAllSyncs = exports.requestCancelSync = exports.requestRegisterSync = exports.setServiceWorker = exports.setCommsOpen = exports.removeAllSyncs = exports.removeSync = exports.addSyncs = exports.addSync = undefined;
	
	var _actionTypes = __webpack_require__(1);
	
	// ---
	// Sync action creators
	// ---
	
	var addSync = exports.addSync = function addSync(sync) {
	  return { type: _actionTypes.ADD_SYNC, sync: sync };
	};
	
	var addSyncs = exports.addSyncs = function addSyncs(syncs) {
	  return { type: _actionTypes.ADD_SYNCS, syncs: syncs };
	};
	
	var removeSync = exports.removeSync = function removeSync(sync) {
	  return { type: _actionTypes.REMOVE_SYNC, sync: sync };
	};
	
	var removeAllSyncs = exports.removeAllSyncs = function removeAllSyncs() {
	  return { type: _actionTypes.REMOVE_ALL_SYNCS };
	};
	
	var setCommsOpen = exports.setCommsOpen = function setCommsOpen(open) {
	  return { type: _actionTypes.SET_COMMS_OPEN, open: open };
	};
	
	var setServiceWorker = exports.setServiceWorker = function setServiceWorker(value) {
	  return { type: _actionTypes.SET_SERVICE_WORKER, value: value };
	};
	
	// ---
	// Async request action creators
	// ---
	
	var requestRegisterSync = exports.requestRegisterSync = function requestRegisterSync(sync) {
	  return {
	    type: _actionTypes.Requests.REGISTER_SYNC,
	    sync: {
	      type: sync.type,
	      id: sync.id,
	      name: sync.name,
	      request: sync.request
	    }
	  };
	};
	
	var requestCancelSync = exports.requestCancelSync = function requestCancelSync(sync) {
	  return { type: _actionTypes.Requests.CANCEL_SYNC, id: sync.id };
	};
	
	var requestCancelAllSyncs = exports.requestCancelAllSyncs = function requestCancelAllSyncs() {
	  return { type: _actionTypes.Requests.CANCEL_ALL };
	};
	
	var requestOpenComms = exports.requestOpenComms = function requestOpenComms() {
	  return { type: _actionTypes.Requests.OPEN_COMMS };
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/* global MessageChannel:false */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.registerSync = registerSync;
	exports.cancelAllSyncs = cancelAllSyncs;
	exports.cancelSync = cancelSync;
	exports.openCommsChannel = openCommsChannel;
	
	var _miniDefer = __webpack_require__(5);
	
	var _miniDefer2 = _interopRequireDefault(_miniDefer);
	
	var _serialiseResponse = __webpack_require__(4);
	
	var _serialiseResponse2 = _interopRequireDefault(_serialiseResponse);
	
	var _creators = __webpack_require__(6);
	
	var _constants = __webpack_require__(0);
	
	var _actionTypes = __webpack_require__(1);
	
	var _store = __webpack_require__(3);
	
	var _store2 = _interopRequireDefault(_store);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function registerSync(sync) {
	  return function (dispatch, getState) {
	    var _getState = getState();
	
	    var syncs = _getState.syncs;
	
	    var request = (0, _creators.requestRegisterSync)(sync);
	
	    // We may have already added the sync when the register
	    // operation was performed without the comms channel open
	    if (!(sync.id in syncs)) {
	      dispatch((0, _creators.addSync)(sync));
	    }
	
	    return postMessage(request).catch(sync.reject);
	  };
	}
	
	function cancelAllSyncs() {
	  return function (dispatch) {
	    dispatch((0, _creators.removeAllSyncs)());
	    return postMessage((0, _creators.requestCancelAllSyncs)());
	  };
	}
	
	function cancelSync(sync) {
	  return function (dispatch) {
	    dispatch((0, _creators.removeSync)(sync));
	    return postMessage((0, _creators.requestCancelSync)(sync));
	  };
	}
	
	/**
	 * Open a MessageChannel that will be used for receiving the results of fetch requests
	 * made on behalf of fetchSync operations and other requests by the client.
	 */
	function openCommsChannel() {
	  return function (dispatch, getState) {
	    var _getState2 = getState();
	
	    var serviceWorker = _getState2.serviceWorker;
	    var commsChannel = _getState2.commsChannel;
	
	
	    if (!serviceWorker) {
	      return Promise.reject(new Error('No service worker'));
	    }
	
	    return new Promise(function (resolve, reject) {
	      var messageChannel = new MessageChannel();
	      var complete = false;
	
	      serviceWorker.postMessage((0, _creators.requestOpenComms)(), [messageChannel.port2]);
	
	      messageChannel.port1.onmessage = function (event) {
	        complete = true;
	
	        // First response is to confirm comms channel is
	        // open and send all named syncs to the client
	        if (commsChannel.status === _constants.CommsChannelStatus.CLOSED) {
	          dispatch((0, _creators.setCommsOpen)(true));
	          dispatch((0, _creators.addSyncs)(event.data.data || []));
	        } else {
	          dispatch(receiveFetchResponse(event));
	        }
	
	        resolve();
	      };
	
	      // Fail after two seconds
	      setTimeout(function () {
	        if (!complete) {
	          dispatch((0, _creators.setCommsOpen)(false));
	          reject(new Error('Connecting to Worker timed out'));
	        }
	      }, 2000);
	    });
	  };
	}
	
	/**
	 * Send a message to the Service Worker. Each message is sent through a new
	 * channel and wrapped in a Promise resolving with the first response.
	 * @param {Object} data
	 * @returns {Promise}
	 */
	function postMessage(data) {
	  var _store$getState = _store2.default.getState();
	
	  var serviceWorker = _store$getState.serviceWorker;
	
	  var _defer = (0, _miniDefer2.default)();
	
	  var promise = _defer.promise;
	  var resolve = _defer.resolve;
	  var reject = _defer.reject;
	
	  var messageChannel = new MessageChannel();
	  var complete = false;
	
	  serviceWorker.postMessage(data, [messageChannel.port2]);
	
	  messageChannel.port1.onmessage = function (event) {
	    if (complete) {
	      return;
	    }
	
	    complete = true;
	    messageChannel.port1.close();
	    messageChannel.port2.close();
	
	    if (event.data.error) {
	      reject(event.data.error);
	      return;
	    }
	
	    resolve(event.data);
	  };
	
	  return promise;
	}
	
	function receiveFetchResponse(event) {
	  return function (dispatch, getState) {
	    var _getState3 = getState();
	
	    var syncs = _getState3.syncs;
	
	    var _JSON$parse = JSON.parse(event.data);
	
	    var type = _JSON$parse.type;
	    var data = _JSON$parse.data;
	
	    var sync = syncs[data.id];
	
	    if (sync) {
	      switch (type) {
	        case _actionTypes.Responses.SUCCESS:
	          handleSyncSuccess(dispatch, sync, data);
	          return;
	        case _actionTypes.Responses.FAILURE:
	          handleSyncFailure(dispatch, sync, data);
	          return;
	        default:
	          throw new Error('Unknown sync type \'' + type + '\'');
	      }
	    }
	  };
	}
	
	function handleSyncSuccess(dispatch, sync, data) {
	  var response = _serialiseResponse2.default.deserialise(data.response);
	
	  if (sync.type === _constants.SyncTypes.PERIODIC_SYNC) {
	    sync.response = response;
	    sync.trigger('sync', response);
	    return;
	  }
	
	  if (sync.type === _constants.SyncTypes.SYNC) {
	    sync.resolve(response);
	    if (sync.name) {
	      sync.response = response;
	    } else {
	      dispatch((0, _creators.removeSync)(sync));
	    }
	  }
	}
	
	function handleSyncFailure(dispatch, sync, data) {
	  if (sync.type === _constants.SyncTypes.PERIODIC_SYNC) {
	    sync.response = null;
	    sync.trigger('error', data.error);
	    return;
	  }
	
	  if (sync.type === _constants.SyncTypes.SYNC) {
	    sync.reject(data.error);
	    if (sync.name) {
	      sync.response = null;
	    } else {
	      dispatch((0, _creators.removeSync)(sync));
	    }
	  }
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = compose;
	/**
	 * Composes single-argument functions from right to left.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing functions from right to
	 * left. For example, compose(f, g, h) is identical to arg => f(g(h(arg))).
	 */
	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }
	
	  return function () {
	    if (funcs.length === 0) {
	      return arguments.length <= 0 ? undefined : arguments[0];
	    }
	
	    var last = funcs[funcs.length - 1];
	    var rest = funcs.slice(0, -1);
	
	    return rest.reduceRight(function (composed, f) {
	      return f(composed);
	    }, last.apply(undefined, arguments));
	  };
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.ActionTypes = undefined;
	exports["default"] = createStore;
	
	var _isPlainObject = __webpack_require__(11);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = exports.ActionTypes = {
	  INIT: '@@redux/INIT'
	};
	
	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [initialState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @param {Function} enhancer The store enhancer. You may optionally specify it
	 * to enhance the store with third-party capabilities such as middleware,
	 * time travel, persistence, etc. The only store enhancer that ships with Redux
	 * is `applyMiddleware()`.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */
	function createStore(reducer, initialState, enhancer) {
	  if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = initialState;
	    initialState = undefined;
	  }
	
	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error('Expected the enhancer to be a function.');
	    }
	
	    return enhancer(createStore)(reducer, initialState);
	  }
	
	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }
	
	  var currentReducer = reducer;
	  var currentState = initialState;
	  var currentListeners = [];
	  var nextListeners = currentListeners;
	  var isDispatching = false;
	
	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }
	
	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }
	
	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all states changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('Expected listener to be a function.');
	    }
	
	    var isSubscribed = true;
	
	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);
	
	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }
	
	      isSubscribed = false;
	
	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
	    };
	  }
	
	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!(0, _isPlainObject2["default"])(action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }
	
	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }
	
	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }
	
	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }
	
	    var listeners = currentListeners = nextListeners;
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i]();
	    }
	
	    return action;
	  }
	
	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    if (typeof nextReducer !== 'function') {
	      throw new Error('Expected the nextReducer to be a function.');
	    }
	
	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }
	
	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });
	
	  return {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  };
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports["default"] = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that you can use this stack
	    // to find the callsite that caused this warning to fire.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var isHostObject = __webpack_require__(23),
	    isObjectLike = __webpack_require__(24);
	
	/** `Object#toString` result references. */
	var objectTag = '[object Object]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var getPrototypeOf = Object.getPrototypeOf;
	
	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) ||
	      objectToString.call(value) != objectTag || isHostObject(value)) {
	    return false;
	  }
	  var proto = getPrototypeOf(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}
	
	module.exports = isPlainObject;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createSync;
	
	var _miniDefer = __webpack_require__(5);
	
	var _miniDefer2 = _interopRequireDefault(_miniDefer);
	
	var _store = __webpack_require__(3);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _constants = __webpack_require__(0);
	
	var _requests = __webpack_require__(7);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createSync(type, name, request) {
	  var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	  var sync = buildSyncObjectForType(type);
	
	  // Assign private properties
	  Object.assign(sync, {
	    name: name,
	    type: type,
	    request: request,
	    options: options,
	    id: uId(),
	    createdOn: Date.now(),
	    syncedOn: null,
	    response: null
	  });
	
	  // Assign public properties
	  Object.assign(sync.public, {
	    name: name,
	    type: type,
	    id: sync.id,
	    createdOn: sync.createdOn,
	    syncedOn: sync.syncedOn
	  });
	
	  // Assign public methods
	  Object.assign(sync.public, {
	    getResponse: function getResponse() {
	      return sync.response;
	    },
	    cancel: function cancel() {
	      if (!sync.cancelled) {
	        sync.cancelled = true;
	        return _store2.default.dispatch((0, _requests.cancelSync)(this));
	      }
	      return Promise.reject(new Error('Sync already cancelled'));
	    },
	    toString: function toString() {
	      var nameString = this.name ? ' name=\'' + this.name + '\'' : '';
	      return '[fetchSync type=\'' + this.type + '\'' + nameString + ']';
	    }
	  });
	
	  return sync;
	}
	
	function buildSyncObjectForType(type) {
	  switch (type) {
	    case _constants.SyncTypes.SYNC:
	      return syncInitialObject();
	    case _constants.SyncTypes.PERIODIC_SYNC:
	      return periodicSyncInitialObject();
	    default:
	      throw new Error('Unknown sync type \'' + type + '\'');
	  }
	}
	
	function syncInitialObject() {
	  var deferred = (0, _miniDefer2.default)();
	  var sync = {
	    promise: deferred.promise,
	    public: deferred.promise
	  };
	
	  return Object.assign(sync, {
	    resolve: deferred.resolve,
	    reject: deferred.reject
	  });
	}
	
	function periodicSyncInitialObject() {
	  var sync = {
	    __onHandlers: [],
	    public: {}
	  };
	
	  return Object.assign(sync.public, {
	    on: function on(event, handler) {
	      sync.__onHandlers.push({ event: event, handler: handler });
	    },
	    trigger: function trigger(event, data) {
	      sync.__onHandlers.forEach(function (_ref) {
	        var type = _ref.type;
	        var handler = _ref.handler;
	
	        if (type === event) {
	          handler(data);
	        }
	      });
	    }
	  });
	}
	
	function uId() {
	  var _store$getState = _store2.default.getState();
	
	  var syncs = _store$getState.syncs;
	
	  var name = _constants.SyncIdPrefix + Date.now();
	  while (name in syncs) {
	    name = name + 1;
	  }return name;
	}
	module.exports = exports['default'];

/***/ },
/* 13 */,
/* 14 */,
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/* global fetch:false, Request:false */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.default = fetchSync;
	
	var _serialiseRequest = __webpack_require__(2);
	
	var _serialiseRequest2 = _interopRequireDefault(_serialiseRequest);
	
	var _createSync = __webpack_require__(12);
	
	var _createSync2 = _interopRequireDefault(_createSync);
	
	var _store = __webpack_require__(3);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _requests = __webpack_require__(7);
	
	var _constants = __webpack_require__(0);
	
	var _creators = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var hasStartedInit = false;
	var hasBackgroundSyncSupport = true;
	
	function environmentHasSupport() {
	  var notSupported = [];
	
	  if (!('serviceWorker' in navigator)) {
	    notSupported.push('Service Workers');
	  }
	
	  if (!('SyncManager' in window)) {
	    notSupported.push('Background Sync');
	  }
	
	  if (notSupported.length) {
	    console.warn('fetchSync: environment does not support ' + notSupported.join(', ') + '.\n      Single sync requests will be forwarded straight to `fetch`.\n      Periodic sync requests will fail silently!');
	  }
	
	  return !notSupported.length;
	}
	
	function createSyncOperation(type, name, request) {
	  var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	  if (typeof request !== 'string' && !(request instanceof Request)) {
	    throw new Error('Expecting URL to be a string or Request');
	  } else if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
	    throw new Error('Expecting options to be an object');
	  }
	
	  var realRequest = request instanceof Request ? request : new Request(request, options);
	
	  return (0, _serialiseRequest2.default)(realRequest).then(function (serialisedRequest) {
	    return (0, _createSync2.default)(type, name, serialisedRequest, options);
	  }).then(function (sync) {
	    return _store2.default.dispatch((0, _requests.registerSync)(sync)).then(function () {
	      return sync.public;
	    });
	  });
	}
	
	function resolveSyncArgs(request, options, extra) {
	  var realName = undefined;
	  var realRequest = request;
	  var realOptions = {};
	
	  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && !(options instanceof Request)) {
	    realOptions = options;
	  }
	
	  if (typeof request === 'string' && (typeof options === 'string' || options instanceof Request)) {
	    realRequest = options;
	    realName = request;
	    if ((typeof extra === 'undefined' ? 'undefined' : _typeof(extra)) === 'object') {
	      realOptions = extra;
	    }
	  }
	
	  return [realName, realRequest, realOptions];
	}
	
	// ---
	// Public
	// ---
	
	/**
	 * Create a 'sync' operation.
	 * @param {String|Request} request
	 * @param {Object|String} [options]
	 * @param {Object} [extra]
	 * @returns {Promise}
	 */
	function fetchSync(request, options, extra) {
	  var args = resolveSyncArgs(request, options, extra);
	
	  if (!hasBackgroundSyncSupport) {
	    return fetch(args[1], args[2]);
	  }
	
	  return createSyncOperation.apply(undefined, [_constants.SyncTypes.SYNC].concat(_toConsumableArray(args)));
	}
	
	fetchSync.sync = fetchSync;
	
	/**
	 * Initialise fetchSync.
	 * @param {Object} options
	 */
	fetchSync.init = function fetchSync_init(options) {
	  if (hasStartedInit) {
	    throw new Error('fetchSync.init() called multiple times');
	  } else if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
	    throw new Error('Expecting options to be an object');
	  } else if (!options.workerUrl) {
	    throw new Error('Expecting `workerUrl` in options object');
	  }
	
	  if (!environmentHasSupport()) {
	    hasBackgroundSyncSupport = false;
	    return Promise.reject(new Error('Environment not supported'));
	  }
	
	  var _store$getState = _store2.default.getState();
	
	  var commsChannel = _store$getState.commsChannel;
	
	
	  hasStartedInit = true;
	
	  navigator.serviceWorker.register(options.workerUrl, options.workerOptions).then(function (registration) {
	    if (options.forceUpdate) {
	      registration.update();
	    }
	    _store2.default.dispatch((0, _creators.setServiceWorker)(navigator.serviceWorker.controller));
	    _store2.default.dispatch((0, _requests.openCommsChannel)());
	  }).catch(function (err) {
	    console.warn('fetchSync: failed to register the Service Worker');
	    throw err;
	  });
	
	  return commsChannel.promise;
	};
	
	/**
	 * Create a 'periodicSync' operation.
	 * @param {String} name
	 * @param {String|Request} request
	 * @param {Object} [options]
	 * @returns {Promise|undefined}
	 */
	fetchSync.periodicSync = function fetchSync_periodicSync(name, request, options) {
	  if (!hasBackgroundSyncSupport) {
	    return;
	  }
	
	  if (typeof name !== 'string') {
	    throw new Error('Expecting name to be a string');
	  } else if (typeof request !== 'string' || !(request instanceof Request)) {
	    throw new Error('Expecting request to be a string or Request');
	  } else if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
	    throw new Error('Expecting options to be an object');
	  }
	
	  return createSyncOperation(_constants.SyncTypes.PERIODIC_SYNC, name, request, options);
	};
	
	/**
	 * Get a sync.
	 * @param {String} name
	 * @returns {Object|Boolean}
	 */
	fetchSync.get = function fetchSync_get(name) {
	  var _store$getState2 = _store2.default.getState();
	
	  var syncs = _store$getState2.syncs;
	
	  var ids = Object.keys(syncs);
	
	  for (var i = 0; i < ids.length; i++) {
	    var sync = syncs[ids[i]];
	    if (sync.name === name) {
	      return sync.public;
	    }
	  }
	
	  return false;
	};
	
	/**
	 * Get all named syncs.
	 * @returns {Array}
	 */
	fetchSync.getAll = function fetchSync_getNames() {
	  var _store$getState3 = _store2.default.getState();
	
	  var syncs = _store$getState3.syncs;
	
	  return Object.keys(syncs).filter(function (sync) {
	    return !!sync.name;
	  });
	};
	
	/**
	 * Cancel a sync.
	 * @param {Object|String} sync
	 * @returns {Promise}
	 */
	fetchSync.cancel = function fetchSync_cancel(sync) {
	  return fetchSync.get((typeof sync === 'undefined' ? 'undefined' : _typeof(sync)) === 'object' ? sync.name : sync).then(function (sync) {
	    return sync.cancel();
	  });
	};
	
	/**
	 * Cancel all syncs.
	 * @returns {Promise}
	 */
	fetchSync.cancelAll = function fetchSync_cancelAll() {
	  return _store2.default.dispatch((0, _requests.cancelAllSyncs)());
	};
	
	Object.keys(fetchSync).forEach(function (methodName) {
	  if (['init', 'register'].indexOf(methodName) === -1) {
	    (function () {
	      var method = fetchSync[methodName];
	      Object.defineProperty(fetchSync, methodName, {
	        enumerable: true,
	        value: function value() {
	          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	          }
	
	          if (!hasStartedInit) {
	            throw new Error('Initialise fetchSync first by calling fetchSync.init(<options>)');
	          }
	
	          var _store$getState4 = _store2.default.getState();
	
	          var commsChannel = _store$getState4.commsChannel;
	
	          return commsChannel.promise.then(function () {
	            return method.apply(undefined, args);
	          });
	        }
	      });
	    })();
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 16 */,
/* 17 */
/***/ function(module, exports) {

	"use strict";
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	var repeat = function repeat(str, times) {
	  return new Array(times + 1).join(str);
	};
	var pad = function pad(num, maxLength) {
	  return repeat("0", maxLength - num.toString().length) + num;
	};
	var formatTime = function formatTime(time) {
	  return "@ " + pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3);
	};
	
	// Use the new performance api to get better precision if available
	var timer = typeof performance !== "undefined" && typeof performance.now === "function" ? performance : Date;
	
	/**
	 * parse the level option of createLogger
	 *
	 * @property {string | function | object} level - console[level]
	 * @property {object} action
	 * @property {array} payload
	 * @property {string} type
	 */
	
	function getLogLevel(level, action, payload, type) {
	  switch (typeof level === "undefined" ? "undefined" : _typeof(level)) {
	    case "object":
	      return typeof level[type] === "function" ? level[type].apply(level, _toConsumableArray(payload)) : level[type];
	    case "function":
	      return level(action);
	    default:
	      return level;
	  }
	}
	
	/**
	 * Creates logger with followed options
	 *
	 * @namespace
	 * @property {object} options - options for logger
	 * @property {string | function | object} options.level - console[level]
	 * @property {boolean} options.duration - print duration of each action?
	 * @property {boolean} options.timestamp - print timestamp with each action?
	 * @property {object} options.colors - custom colors
	 * @property {object} options.logger - implementation of the `console` API
	 * @property {boolean} options.logErrors - should errors in action execution be caught, logged, and re-thrown?
	 * @property {boolean} options.collapsed - is group collapsed?
	 * @property {boolean} options.predicate - condition which resolves logger behavior
	 * @property {function} options.stateTransformer - transform state before print
	 * @property {function} options.actionTransformer - transform action before print
	 * @property {function} options.errorTransformer - transform error before print
	 */
	
	function createLogger() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var _options$level = options.level;
	  var level = _options$level === undefined ? "log" : _options$level;
	  var _options$logger = options.logger;
	  var logger = _options$logger === undefined ? console : _options$logger;
	  var _options$logErrors = options.logErrors;
	  var logErrors = _options$logErrors === undefined ? true : _options$logErrors;
	  var collapsed = options.collapsed;
	  var predicate = options.predicate;
	  var _options$duration = options.duration;
	  var duration = _options$duration === undefined ? false : _options$duration;
	  var _options$timestamp = options.timestamp;
	  var timestamp = _options$timestamp === undefined ? true : _options$timestamp;
	  var transformer = options.transformer;
	  var _options$stateTransfo = options.stateTransformer;
	  var // deprecated
	  stateTransformer = _options$stateTransfo === undefined ? function (state) {
	    return state;
	  } : _options$stateTransfo;
	  var _options$actionTransf = options.actionTransformer;
	  var actionTransformer = _options$actionTransf === undefined ? function (actn) {
	    return actn;
	  } : _options$actionTransf;
	  var _options$errorTransfo = options.errorTransformer;
	  var errorTransformer = _options$errorTransfo === undefined ? function (error) {
	    return error;
	  } : _options$errorTransfo;
	  var _options$colors = options.colors;
	  var colors = _options$colors === undefined ? {
	    title: function title() {
	      return "#000000";
	    },
	    prevState: function prevState() {
	      return "#9E9E9E";
	    },
	    action: function action() {
	      return "#03A9F4";
	    },
	    nextState: function nextState() {
	      return "#4CAF50";
	    },
	    error: function error() {
	      return "#F20404";
	    }
	  } : _options$colors;
	
	  // exit if console undefined
	
	  if (typeof logger === "undefined") {
	    return function () {
	      return function (next) {
	        return function (action) {
	          return next(action);
	        };
	      };
	    };
	  }
	
	  if (transformer) {
	    console.error("Option 'transformer' is deprecated, use stateTransformer instead");
	  }
	
	  var logBuffer = [];
	  function printBuffer() {
	    logBuffer.forEach(function (logEntry, key) {
	      var started = logEntry.started;
	      var startedTime = logEntry.startedTime;
	      var action = logEntry.action;
	      var prevState = logEntry.prevState;
	      var error = logEntry.error;
	      var took = logEntry.took;
	      var nextState = logEntry.nextState;
	
	      var nextEntry = logBuffer[key + 1];
	      if (nextEntry) {
	        nextState = nextEntry.prevState;
	        took = nextEntry.started - started;
	      }
	      // message
	      var formattedAction = actionTransformer(action);
	      var isCollapsed = typeof collapsed === "function" ? collapsed(function () {
	        return nextState;
	      }, action) : collapsed;
	
	      var formattedTime = formatTime(startedTime);
	      var titleCSS = colors.title ? "color: " + colors.title(formattedAction) + ";" : null;
	      var title = "action " + (timestamp ? formattedTime : "") + " " + formattedAction.type + " " + (duration ? "(in " + took.toFixed(2) + " ms)" : "");
	
	      // render
	      try {
	        if (isCollapsed) {
	          if (colors.title) logger.groupCollapsed("%c " + title, titleCSS);else logger.groupCollapsed(title);
	        } else {
	          if (colors.title) logger.group("%c " + title, titleCSS);else logger.group(title);
	        }
	      } catch (e) {
	        logger.log(title);
	      }
	
	      var prevStateLevel = getLogLevel(level, formattedAction, [prevState], "prevState");
	      var actionLevel = getLogLevel(level, formattedAction, [formattedAction], "action");
	      var errorLevel = getLogLevel(level, formattedAction, [error, prevState], "error");
	      var nextStateLevel = getLogLevel(level, formattedAction, [nextState], "nextState");
	
	      if (prevStateLevel) {
	        if (colors.prevState) logger[level]("%c prev state", "color: " + colors.prevState(prevState) + "; font-weight: bold", prevState);else logger[level]("prev state", prevState);
	      }
	
	      if (actionLevel) {
	        if (colors.action) logger[level]("%c action", "color: " + colors.action(formattedAction) + "; font-weight: bold", formattedAction);else logger[level]("action", formattedAction);
	      }
	
	      if (error && errorLevel) {
	        if (colors.error) logger[level]("%c error", "color: " + colors.error(error, prevState) + "; font-weight: bold", error);else logger[level]("error", error);
	      }
	
	      if (nextStateLevel) {
	        if (colors.nextState) logger[level]("%c next state", "color: " + colors.nextState(nextState) + "; font-weight: bold", nextState);else logger[level]("next state", nextState);
	      }
	
	      try {
	        logger.groupEnd();
	      } catch (e) {
	        logger.log("—— log end ——");
	      }
	    });
	    logBuffer.length = 0;
	  }
	
	  return function (_ref) {
	    var getState = _ref.getState;
	    return function (next) {
	      return function (action) {
	        // exit early if predicate function returns false
	        if (typeof predicate === "function" && !predicate(getState, action)) {
	          return next(action);
	        }
	
	        var logEntry = {};
	        logBuffer.push(logEntry);
	
	        logEntry.started = timer.now();
	        logEntry.startedTime = new Date();
	        logEntry.prevState = stateTransformer(getState());
	        logEntry.action = action;
	
	        var returnedValue = undefined;
	        if (logErrors) {
	          try {
	            returnedValue = next(action);
	          } catch (e) {
	            logEntry.error = errorTransformer(e);
	          }
	        } else {
	          returnedValue = next(action);
	        }
	
	        logEntry.took = timer.now() - logEntry.started;
	        logEntry.nextState = stateTransformer(getState());
	
	        printBuffer();
	
	        if (logEntry.error) throw logEntry.error;
	        return returnedValue;
	      };
	    };
	  };
	}
	
	module.exports = createLogger;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	function thunkMiddleware(_ref) {
	  var dispatch = _ref.dispatch;
	  var getState = _ref.getState;
	
	  return function (next) {
	    return function (action) {
	      return typeof action === 'function' ? action(dispatch, getState) : next(action);
	    };
	  };
	}
	
	module.exports = thunkMiddleware;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.__esModule = true;
	exports["default"] = applyMiddleware;
	
	var _compose = __webpack_require__(8);
	
	var _compose2 = _interopRequireDefault(_compose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */
	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }
	
	  return function (createStore) {
	    return function (reducer, initialState, enhancer) {
	      var store = createStore(reducer, initialState, enhancer);
	      var _dispatch = store.dispatch;
	      var chain = [];
	
	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2["default"].apply(undefined, chain)(store.dispatch);
	
	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports["default"] = bindActionCreators;
	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}
	
	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */
	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }
	
	  if (typeof actionCreators !== 'object' || actionCreators === null) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }
	
	  var keys = Object.keys(actionCreators);
	  var boundActionCreators = {};
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var actionCreator = actionCreators[key];
	    if (typeof actionCreator === 'function') {
	      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
	    }
	  }
	  return boundActionCreators;
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports["default"] = combineReducers;
	
	var _createStore = __webpack_require__(9);
	
	var _isPlainObject = __webpack_require__(11);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	var _warning = __webpack_require__(10);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';
	
	  return 'Reducer "' + key + '" returned undefined handling ' + actionName + '. ' + 'To ignore an action, you must explicitly return the previous state.';
	}
	
	function getUnexpectedStateShapeWarningMessage(inputState, reducers, action) {
	  var reducerKeys = Object.keys(reducers);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';
	
	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }
	
	  if (!(0, _isPlainObject2["default"])(inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }
	
	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return !reducers.hasOwnProperty(key);
	  });
	
	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}
	
	function assertReducerSanity(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });
	
	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
	    }
	
	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	    }
	  });
	}
	
	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */
	function combineReducers(reducers) {
	  var reducerKeys = Object.keys(reducers);
	  var finalReducers = {};
	  for (var i = 0; i < reducerKeys.length; i++) {
	    var key = reducerKeys[i];
	    if (typeof reducers[key] === 'function') {
	      finalReducers[key] = reducers[key];
	    }
	  }
	  var finalReducerKeys = Object.keys(finalReducers);
	
	  var sanityError;
	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }
	
	  return function combination() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments[1];
	
	    if (sanityError) {
	      throw sanityError;
	    }
	
	    if (true) {
	      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action);
	      if (warningMessage) {
	        (0, _warning2["default"])(warningMessage);
	      }
	    }
	
	    var hasChanged = false;
	    var nextState = {};
	    for (var i = 0; i < finalReducerKeys.length; i++) {
	      var key = finalReducerKeys[i];
	      var reducer = finalReducers[key];
	      var previousStateForKey = state[key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      nextState[key] = nextStateForKey;
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	    }
	    return hasChanged ? nextState : state;
	  };
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;
	
	var _createStore = __webpack_require__(9);
	
	var _createStore2 = _interopRequireDefault(_createStore);
	
	var _combineReducers = __webpack_require__(21);
	
	var _combineReducers2 = _interopRequireDefault(_combineReducers);
	
	var _bindActionCreators = __webpack_require__(20);
	
	var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);
	
	var _applyMiddleware = __webpack_require__(19);
	
	var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);
	
	var _compose = __webpack_require__(8);
	
	var _compose2 = _interopRequireDefault(_compose);
	
	var _warning = __webpack_require__(10);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	/*
	* This is a dummy function to check if the function name has been altered by minification.
	* If the function has been minified and NODE_ENV !== 'production', warn the user.
	*/
	function isCrushed() {}
	
	if ("development" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
	  (0, _warning2["default"])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
	}
	
	exports.createStore = _createStore2["default"];
	exports.combineReducers = _combineReducers2["default"];
	exports.bindActionCreators = _bindActionCreators2["default"];
	exports.applyMiddleware = _applyMiddleware2["default"];
	exports.compose = _compose2["default"];

/***/ },
/* 23 */
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
/* 24 */
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


/***/ }
/******/ ])
});
;
//# sourceMappingURL=fetch-sync.js.map