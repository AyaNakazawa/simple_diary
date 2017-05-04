
$(() => {
  
  let modalView = new ModalView();
  
});

// ----------------------------------------------------------------
// Functions

// ----------------------------------------------------------------
// Backbone

class ModalView extends Backbone.View {
  constructor() {
    super({
      el: '#template-modal',
      events: {
        'click #test-modal-button': 'open'
      },
    });
  }
  open() {
    $('#test-modal').modal();
  }
}

// ----------------------------------------------------------------
// Classes

class DatePlus {
  constructor(_date = new Date()) {
    this.date = new Date(_date);
  }
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
    format = format.replace('%Y', ("000" + this.date.getFullYear()).slice(-4));
    format = format.replace('%y', ("0" + this.date.getFullYear()).slice(-2));
    format = format.replace('%m', ("0" + (this.date.getMonth() + 1)).slice(-2));
    format = format.replace('%d', ("0" + this.date.getDate()).slice(-2));
    format = format.replace('%H', ("0" + this.date.getHours()).slice(-2));
    format = format.replace('%M', ("0" + this.date.getMinutes()).slice(-2));
    format = format.replace('%S', ("0" + this.date.getSeconds()).slice(-2));
    return format;
  }
}
