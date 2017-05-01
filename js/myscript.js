
$(() => {
  
	$('#test-modal-button').click(() => {
		$('#test-modal').modal();
	});
  
});

// ----------------------------------------------------------------
// Functions

// ----------------------------------------------------------------
// Object Classes

class DateClass {
  constructor(_date = new Date()) {
    this.date = new Date(_date);
  }
  getFullYear() {
    return this.date.getFullYear();
  }
  getMonth() {
    return this.date.getMonth();
  }
  getDate() {
    return this.date.getDate();
  }
  getHours() {
    return this.date.getHours();
  }
  getMinutes() {
    return this.date.getMinutes();
  }
  getSeconds() {
    return this.date.getSeconds();
  }
}

// ----------------------------------------------------------------
// Classes

class DatePlus extends DateClass {
  
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
    format = format.replace('%Y', ("000" + super.getFullYear()).slice(-4));
    format = format.replace('%y', ("0" + super.getFullYear()).slice(-2));
    format = format.replace('%m', ("0" + (super.getMonth() + 1)).slice(-2));
    format = format.replace('%d', ("0" + super.getDate()).slice(-2));
    format = format.replace('%H', ("0" + super.getHours()).slice(-2));
    format = format.replace('%M', ("0" + super.getMinutes()).slice(-2));
    format = format.replace('%S', ("0" + super.getSeconds()).slice(-2));
    return format;
  }
}
