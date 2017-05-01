(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(function () {

  $('#test-modal-button').click(function () {
    $('#test-modal').modal();
  });
});

// ----------------------------------------------------------------
// Functions

// ----------------------------------------------------------------
// Classes

var DatePlus = function () {
  function DatePlus() {
    var _date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

    _classCallCheck(this, DatePlus);

    this.date = new Date(_date);
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
      format = format.replace('%Y', ("000" + this.date.getFullYear()).slice(-4));
      format = format.replace('%y', ("0" + this.date.getFullYear()).slice(-2));
      format = format.replace('%m', ("0" + (this.date.getMonth() + 1)).slice(-2));
      format = format.replace('%d', ("0" + this.date.getDate()).slice(-2));
      format = format.replace('%H', ("0" + this.date.getHours()).slice(-2));
      format = format.replace('%M', ("0" + this.date.getMinutes()).slice(-2));
      format = format.replace('%S', ("0" + this.date.getSeconds()).slice(-2));
      return format;
    }
  }]);

  return DatePlus;
}();

},{}]},{},[1]);
