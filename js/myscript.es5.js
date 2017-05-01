(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(function () {

  $('#test-modal-button').click(function () {
    $('#test-modal').modal();
  });
});

// ----------------------------------------------------------------
// Functions

// ----------------------------------------------------------------
// Object Classes

var DateClass = function () {
  function DateClass() {
    var _date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

    _classCallCheck(this, DateClass);

    this.date = new Date(_date);
  }

  _createClass(DateClass, [{
    key: 'getFullYear',
    value: function getFullYear() {
      return this.date.getFullYear();
    }
  }, {
    key: 'getMonth',
    value: function getMonth() {
      return this.date.getMonth();
    }
  }, {
    key: 'getDate',
    value: function getDate() {
      return this.date.getDate();
    }
  }, {
    key: 'getHours',
    value: function getHours() {
      return this.date.getHours();
    }
  }, {
    key: 'getMinutes',
    value: function getMinutes() {
      return this.date.getMinutes();
    }
  }, {
    key: 'getSeconds',
    value: function getSeconds() {
      return this.date.getSeconds();
    }
  }]);

  return DateClass;
}();

// ----------------------------------------------------------------
// Classes

var DatePlus = function (_DateClass) {
  _inherits(DatePlus, _DateClass);

  function DatePlus() {
    _classCallCheck(this, DatePlus);

    return _possibleConstructorReturn(this, (DatePlus.__proto__ || Object.getPrototypeOf(DatePlus)).apply(this, arguments));
  }

  _createClass(DatePlus, [{
    key: 'getString',
    value: function getString() {
      var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '%Y/%m/%d %H:%M:%S';

      // Dateオブジェクトからゼロ埋めした日付文字列を生成
      // format: '%Y/%m/%d %H:%M:%S'
      //  %Y: 年4桁
      //  %y: 年2桁
      //  %m: 月
      //  %d: 日
      //  %H: 時
      //  %M: 分
      //  %S: 秒
      format = format.replace('%Y', ("000" + _get(DatePlus.prototype.__proto__ || Object.getPrototypeOf(DatePlus.prototype), 'getFullYear', this).call(this)).slice(-4));
      format = format.replace('%y', ("0" + _get(DatePlus.prototype.__proto__ || Object.getPrototypeOf(DatePlus.prototype), 'getFullYear', this).call(this)).slice(-2));
      format = format.replace('%m', ("0" + (_get(DatePlus.prototype.__proto__ || Object.getPrototypeOf(DatePlus.prototype), 'getMonth', this).call(this) + 1)).slice(-2));
      format = format.replace('%d', ("0" + _get(DatePlus.prototype.__proto__ || Object.getPrototypeOf(DatePlus.prototype), 'getDate', this).call(this)).slice(-2));
      format = format.replace('%H', ("0" + _get(DatePlus.prototype.__proto__ || Object.getPrototypeOf(DatePlus.prototype), 'getHours', this).call(this)).slice(-2));
      format = format.replace('%M', ("0" + _get(DatePlus.prototype.__proto__ || Object.getPrototypeOf(DatePlus.prototype), 'getMinutes', this).call(this)).slice(-2));
      format = format.replace('%S', ("0" + _get(DatePlus.prototype.__proto__ || Object.getPrototypeOf(DatePlus.prototype), 'getSeconds', this).call(this)).slice(-2));
      return format;
    }
  }]);

  return DatePlus;
}(DateClass);

},{}]},{},[1]);
