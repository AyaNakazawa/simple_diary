
// グローバル変数

// 定数
$(function() {
  
  // ----------------------------------------------------------------
  // 初期化
	$('#test-modal-button').click(function() {
		$('#test-modal').modal();
	});
  
});

// ----------------------------------------------------------------
// Functions

// ----------------------------------------------------------------
// Classes

class DatePlus extends Date {
  getString(format = '%Y/%m/%d %H:%M:%S') {
    // Dateオブジェクトからゼロ埋めした日付文字列を生成
    // format: '%Y/%m/%d %H:%M:%S'
    //  %Y: 年4桁
    //  %y: 年2桁
    //  %m: 月
    //  %d: 日
    //  %H: 時
    //  %M: 分
    //  %S: 秒
    format = format.replace('%Y', ("000" + this.getFullYear()).slice(-4));
    format = format.replace('%y', ("0" + this.getFullYear()).slice(-2));
    format = format.replace('%m', ("0" + (this.getMonth() + 1)).slice(-2));
    format = format.replace('%d', ("0" + this.getDate()).slice(-2));
    format = format.replace('%H', ("0" + this.getHours()).slice(-2));
    format = format.replace('%M', ("0" + this.getMinutes()).slice(-2));
    format = format.replace('%S', ("0" + this.getSeconds()).slice(-2));
    return format;
  }
}
