
// グローバル変数

// 定数
$(function() {
  
  // ----------------------------------------------------------------
  // 初期化
  
});

// ----------------------------------------------------------------
// Functions

// ----------------------------------------------------------------
// Dateオブジェクトからゼロ埋めした日付文字列を生成
// _date: new Date()
//  Dateオブジェクト
// _format: '%Y/%m/%d %H:%M:%S'
//  %Y: 年4桁
//  %y: 年2桁
//  %m: 月
//  %d: 日
//  %H: 時
//  %M: 分
//  %S: 秒
function getDateString(_date, _format){
  var date = _date || new Date();
  var dateString = _format || '%Y/%m/%d %H:%M:%S';
  
  if (dateString.indexOf('%Y') >= 0) {
    dateString = dateString.replace('%Y', ("000" + _date.getFullYear()).slice(-4));
  }
  if (dateString.indexOf('%y') >= 0) {
    dateString = dateString.replace('%y', ("0" + _date.getFullYear()).slice(-2));
  }
  if (dateString.indexOf('%m') >= 0) {
    dateString = dateString.replace('%m', ("0" + (_date.getMonth() + 1)).slice(-2));
  }
  if (dateString.indexOf('%d') >= 0) {
    dateString = dateString.replace('%d', ("0" + _date.getDate()).slice(-2));
  }
  if (dateString.indexOf('%H') >= 0) {
    dateString = dateString.replace('%H', ("0" + _date.getHours()).slice(-2));
  }
  if (dateString.indexOf('%M') >= 0) {
    dateString = dateString.replace('%M', ("0" + _date.getMinutes()).slice(-2));
  }
  if (dateString.indexOf('%S') >= 0) {
    dateString = dateString.replace('%S', ("0" + _date.getSeconds()).slice(-2));
  }
  return dateString;
}

// ----------------------------------------------------------------
// 通常モーダルウィンドウ
function showDialog(_dialogTitle, _dialogContent) {
  var dialogTitle = _dialogTitle || "タイトル";
  var dialogContent = _dialogContent || "内容";
  
  // モーダルウィンドウを表示
  $("#modalDialog").html(dialogContent);
  $("#modalDialog").dialog({
    modal: true,
    title: dialogTitle
  });
}

// ----------------------------------------------------------------
// 確認モーダルウィンドウ
function showConfirmDialog(_dialogTitle, _dialogContent, _callbackFunction) {
  var dialogTitle = _dialogTitle || "確認";
  var dialogContent = _dialogContent || "内容";
  var callbackFunction = _callbackFunction || function(){};
  
  // モーダルウィンドウを表示
  $("#modalConfirmDialog").html(dialogContent);
  $("#modalConfirmDialog").dialog({
    modal: true,
    title: dialogTitle,
    buttons: {
      "OK": function() {
        callbackFunction(true);
        $(this).dialog("close");
      },
      "キャンセル": function() {
        callbackFunction(false);
        $(this).dialog("close");
      }
    }
  });
}

// ----------------------------------------------------------------
// true false をスイッチ
function toggleBoolean(_bool) {
  return !_bool;
}
