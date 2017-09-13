
// ----------------------------------------------------------------
// DiaryDetail Class

// ----------------------------------------------------------------
// Model

class DiaryDetailModel extends CommonModel {
  constructor(
    _initSetting = {
      NAME: 'Diary Detail Object'
    }
  ) {
    super(_initSetting);
    
    this.DIARY_DETAIL_AREA_SELECTOR = '#diary-detail-area';
    this.TEMPLATE_DIARY_DETAIL_SELECTOR = '#diary-detail-template';
    
    this.DIARY_DETAIL_ADD_SELECTOR = '#detail-submit-add';
    this.DIARY_DETAIL_SAVE_SELECTOR = '#detail-submit-save';
    this.DIARY_DETAIL_DELETE_SELECTOR = '#detail-submit-delete';
    this.DIARY_DETAIL_CLOSE_SELECTOR = '#detail-submit-close';
    
    this.DIARY_DETAIL_IMAGE_PREVIEW_SELECTOR = '.detail-image-preview';
    this.DIARY_DETAIL_CHOOSE_FILE_SELECTOR = '.detail-choose-file';
    this.DIARY_DETAIL_UPLOAD_FILE_SELECTOR = '.detail-upload-file';
    this.DIARY_DETAIL_FILE_NAME_SELECTOR = '.upload-file-name';
    
    this.DIARY_DETAIL_UPLOAD_SELECTOR = '.detail-upload';
    
    this.ID = null;
    this.HASH = null;
    this.DIARY = null;
    this.ADD = true;
    this.COPY = false;
    
    this.IMAGE_NAME_1 = "";
    this.IMAGE_NAME_2 = "";
    
    this.UPLOAD_IMAGE_1 = false;
    this.UPLOAD_IMAGE_2 = false;
    
    this.DIARY_EDIT = null;
    
    this.TYPE_ADD = 'add';
    this.TYPE_UPDATE = 'update';
    this.TYPE_DELETE = 'delete';
  }
}

// ----------------------------------------------------------------
// View

class DiaryDetailView extends CommonView {
  constructor(
    _initSetting = {
      NAME: 'Diary Detail View'
    }
  ) {
    super(_initSetting);
  }
  
  generateDiaryDetailArea(
    _alertType = this.MODEL.ALERT_SUCCESS,
    _message = null,
    _close = true
  ) {
    $(this.MODEL.DIARY_DETAIL_AREA_SELECTOR).empty();
    
    let body = '';
    let ruby = '';
    if (this.MODEL.DIARY == null) {
      body = '新規作成';
    } else {
      body = this.MODEL.DIARY['name'];
      ruby = this.MODEL.DIARY['nameKana'];
    }
    $(this.MODEL.DIARY_DETAIL_AREA_SELECTOR).append(
      Content.getHeader(
        this.getTemplate(
          this.MODEL.TEMPLATE_RUBY,
          {
            body: body,
            ruby: ruby
          }
        )
      )
    );
    super.generateAlert(
      this.MODEL.DIARY_DETAIL_AREA_SELECTOR,
      _alertType,
      _message,
      _close
    );
    if (this.MODEL.DIARY != null) {
      // カードがある場合
      $(this.MODEL.DIARY_DETAIL_AREA_SELECTOR).append(this.getTemplate(
        this.MODEL.TEMPLATE_DIARY_DETAIL_SELECTOR,
        {
          diary: this.MODEL.DIARY,
          add: this.MODEL.COPY
        }
      ));
    } else {
      // カードがない場合
      $(this.MODEL.DIARY_DETAIL_AREA_SELECTOR).append(this.getTemplate(
        this.MODEL.TEMPLATE_DIARY_DETAIL_SELECTOR,
        {
          diary: {
            imageName1: "",
            imageName2: "",
            registerDate: (new Date()).getString(),
            updateDate: (new Date()).getString()
          },
          add: this.MODEL.ADD
        }
      ));
    }
  }
  
  getDiaryEdit() {
    let diary = {
      address1: $('#detail-address1').val(),
      address2: $('#detail-address2').val(),
      cellphone: $('#detail-cellphone').val(),
      companyName: $('#detail-company-name').val(),
      companyNameKana: $('#detail-company-name-kana').val(),
      department: $('#detail-department').val(),
      fax: $('#detail-fax').val(),
      mail: $('#detail-mail').val(),
      name: $('#detail-name').val(),
      nameKana: $('#detail-name-kana').val(),
      note: $('#detail-note').val(),
      post: $('#detail-post').val(),
      telephone: $('#detail-telephone').val(),
      url: $('#detail-url').val(),
      userId: $('#detail-user-id').val(),
      zipCode: $('#detail-zip-code').val(),
      imageName1: $('#detail-image1 .upload-file-name').val(),
      imageName2: $('#detail-image2 .upload-file-name').val(),
      registerDate: (new Date()).getString(),
      updateDate: (new Date()).getString()
    }
    if (this.MODEL.DIARY != null) {
      diary['id'] = this.MODEL.DIARY['id'];
    }
    return diary;
  }
}

// ----------------------------------------------------------------
// Event

class DiaryDetailEvent extends CommonEvent {
  constructor(
    _initSetting = {
      NAME: 'Diary Detail Event'
    }
  ) {
    super(_initSetting);
  }
  
  setEvent() {
    this.setAddClick();
    this.setSaveClick();
    this.setDeleteClick();
    this.setCloseClick();
    
    this.setImagePreviewClick();
    this.setChooseFileClick();
    this.setChooseFile();
  }
  
  setAddClick() {
    super.setOn(
      'click',
      this.MODEL.DIARY_DETAIL_ADD_SELECTOR,
      () => {
        this.CONTROLLER.saveDiary(
          this.MODEL.ID,
          this.MODEL.HASH,
          this.VIEW.getDiaryEdit(),
          this.MODEL.TYPE_ADD
        );
      }
    );
  }
  
  setSaveClick() {
    super.setOn(
      'click',
      this.MODEL.DIARY_DETAIL_SAVE_SELECTOR,
      () => {
        this.CONTROLLER.saveDiary(
          this.MODEL.ID,
          this.MODEL.HASH,
          this.VIEW.getDiaryEdit(),
          this.MODEL.TYPE_UPDATE
        );
      }
    );
  }
  
  setDeleteClick() {
    super.setOn(
      'click',
      this.MODEL.DIARY_DETAIL_DELETE_SELECTOR,
      () => {
        this.CONTROLLER.deleteDiary();
      }
    );
  }
  
  setCloseClick() {
    super.setOn(
      'click',
      this.MODEL.DIARY_DETAIL_CLOSE_SELECTOR,
      () => {
        PS.CONTROLLER.SCROLL.DIARY.VIEW.scroll();
        PS.CONTROLLER.SWITCH.DIARY_DETAIL.VIEW.setView(false);
      }
    );
  }
  
  setImagePreviewClick() {
    super.setOn(
      'click',
      this.MODEL.DIARY_DETAIL_IMAGE_PREVIEW_SELECTOR,
      function () {
        PS.CONTROLLER.DIARY_DETAIL.openImagePreview($(this).parent().parent().attr("id"));
      }
    );
  }
  
  setChooseFileClick() {
    super.setOn(
      'click',
      this.MODEL.DIARY_DETAIL_CHOOSE_FILE_SELECTOR,
      function () {
        PS.CONTROLLER.DIARY_DETAIL.openChooseFile($(this).parent().parent().attr("id"));
      }
    );
  }
  
  setChooseFile() {
    super.setOn(
      'change',
      this.MODEL.DIARY_DETAIL_UPLOAD_SELECTOR,
      function () {
        PS.CONTROLLER.DIARY_DETAIL.choosedFile($(this).parent().attr("id"));
      }
    );
  }
}

// ----------------------------------------------------------------
// Controller

class DiaryDetailController extends CommonController {
  constructor(
    _model = {},
    _initSetting = {
      NAME: 'Diary Detail Controller',
      MODEL: new DiaryDetailModel(),
      VIEW: new DiaryDetailView(),
      EVENT: new DiaryDetailEvent()
    }
  ) {
    super(_model, _initSetting);
    
    this.EVENT.setEvent();
  }
  
  openDiary(
    _id = null,
    _hash = null,
    _diary = null,
    _copy = false
  ) {
    this.MODEL.ID = _id;
    this.MODEL.HASH = _hash;
    this.MODEL.DIARY = _diary;
    this.MODEL.COPY = _copy;
    
    if (_id != null && _hash != null) {
      if (_diary == null) {
        // カードがない場合
        if (PS.CONTROLLER.USER.MODEL.LOGIN) {
          // ログイン済み
          // カードの追加
          this.VIEW.generateDiaryDetailArea(
            this.MODEL.ALERT_SUCCESS,
            'カードを追加できます。'
          );
          PS.CONTROLLER.SWITCH.DIARY_DETAIL.VIEW.setView(true);
        } else {
          // ログインしていない
          // カードの選択
          this.VIEW.generateDiaryDetailArea(
            this.MODEL.ALERT_WARNING,
            'カードを選択してください。'
          );
          PS.CONTROLLER.SWITCH.DIARY_DETAIL.VIEW.setView(false);
        }
      } else {
        if (_copy) {
          // カードの編集
          this.VIEW.generateDiaryDetailArea(
            this.MODEL.ALERT_SUCCESS,
            'コピーしたカードを追加できます。'
          );
          PS.CONTROLLER.SWITCH.DIARY_DETAIL.VIEW.setView(true);
        } else {
          // カードの編集
          this.VIEW.generateDiaryDetailArea(
            this.MODEL.ALERT_SUCCESS,
            'カードを編集できます。'
          );
          PS.CONTROLLER.SWITCH.DIARY_DETAIL.VIEW.setView(true);
        }
      }
    } else {
      // 情報がない
      this.VIEW.generateDiaryDetailArea(
        this.MODEL.ALERT_WARNING,
        'ログインしてください。'
      );
      PS.CONTROLLER.SWITCH.DIARY_DETAIL.VIEW.setView(false);
    }
  }
  
  checkValidate(
    _diary = this.MODEL.DIARY
  ) {
    if (_diary['name'].length < 1) {
      this.MODEL.DIARY = _diary;
      this.MODEL.COPY = true;
      this.VIEW.generateDiaryDetailArea(
        this.MODEL.ALERT_WARNING,
        '氏名 を入力してください。'
      );
      PS.CONTROLLER.SCROLL.DIARY_DETAIL.VIEW.scroll();
      return false;
    }
    return true;
  }
  
  saveDiary(
    _id = this.MODEL.ID,
    _hash = this.MODEL.HASH,
    _diary = this.MODEL.DIARY,
    _type = null
  ) {
    
    this.CONTROLLER.uploadImage(1, this.MODEL.UPLOAD_IMAGE_1);
    this.CONTROLLER.uploadImage(2, this.MODEL.UPLOAD_IMAGE_2);
    
    if (_type == this.MODEL.TYPE_ADD) {
      this.VIEW.generateLoading($(this.MODEL.DIARY_DETAIL_AREA_SELECTOR),'日記追加中',  `日記を追加中`);
    } else if (_type == this.MODEL.TYPE_UPDATE) {
      this.VIEW.generateLoading($(this.MODEL.DIARY_DETAIL_AREA_SELECTOR),'日記更新中',  `日記を更新中`);
    } else if (_type == this.MODEL.TYPE_DELETE) {
      this.VIEW.generateLoading($(this.MODEL.DIARY_DETAIL_AREA_SELECTOR),'日記削除中',  `日記を削除中`);
    }
    
    if (!this.checkValidate(_diary)) {
      return;
    }
    
    $.ajax({
      url: 'ruby/saveDiary.rb',
      data: {
        type: _type,
        userName: _id,
        password: _hash,
        id: _diary['id'],
        address1: _diary['address1'],
        address2: _diary['address2'],
        cellphone: _diary['cellphone'],
        companyName: _diary['companyName'],
        companyNameKana: _diary['companyNameKana'],
        department: _diary['department'],
        fax: _diary['fax'],
        mail: _diary['mail'],
        name: _diary['name'],
        nameKana: _diary['nameKana'],
        note: _diary['note'],
        post: _diary['post'],
        registerDate: _diary['registerDate'],
        telephone: _diary['telephone'],
        updateDate: (new Date()).getString(),
        url: _diary['url'],
        zipCode: _diary['zipCode'],
        imageName1: _diary['imageName1'],
        imageName2: _diary['imageName2']
      },
      success: (_data) => {
        Log.logClassKey(this.NAME, 'ajax saveDiary', 'success');
        if (_data.length > 0) {
          PS.CONTROLLER.DIARY.setUser();
          PS.CONTROLLER.SCROLL.DIARY.VIEW.scroll();
          PS.CONTROLLER.SWITCH.DIARY.VIEW.setView(true);
          PS.CONTROLLER.SWITCH.DIARY_DETAIL.VIEW.setView(false);
        } else {
          this.VIEW.generateDiaryDetailArea(
            this.MODEL.ALERT_WARNING,
            `日記の登録に失敗しました。`
          );
        }
      },
      error: () => {
        Log.logClassKey(this.NAME, 'ajax saveDiary', 'failed');
        this.VIEW.generateDiaryDetailArea(
          this.MODEL.ALERT_DANGER,
          'ajax通信に失敗しました。',
          false
        );
      }
    });
  }
  
  deleteDiary(
    _id = this.MODEL.ID,
    _hash = this.MODEL.HASH,
    _diary = this.MODEL.DIARY
  ) {
    if (_id != null && _hash != null && _diary != null) {
      const confirmDiaryDelete = new ConfirmController({
        CONFIRM_ID: 'confirm-diary-delete',
        CONFIRM_TITLE: '日記の削除',
        CONFIRM_MESSAGE: `${_diary.name}(${_diary.companyName}) さんの日記を本当に削除しますか？`,
        AUTO_OPEN: true,
        FUNCTION_YES: () => {
          this.saveDiary(
            _id,
            _hash,
            _diary,
            this.MODEL.TYPE_DELETE
          );
        }
      });
    }
  }
  
  openImagePreview(
    _selector = null
  ) {
    if (_selector == null) {
      Log.logCaution("openImagePreview", "set selector of first argument");
      return;
    }
    Log.logClassKey(
      "Diary Detail Controller",
      `DIARY: ${this.MODEL.DIARY["id"]}: ${_selector}`,
      "Open image preview"
    );
    
    let imageName = '';
    if (_selector.slice(-1) == '1') {
      imageName = this.MODEL.DIARY['imageName1']
    } else {
      imageName = this.MODEL.DIARY['imageName2']
    }
    
    new ConfirmController({
      CONFIRM_ID: 'image-preview',
      CONFIRM_TITLE: 'プレビュー',
      IMAGE_URL: `image/${imageName}`,
      AUTO_OPEN: true,
      TYPE: ConfirmModel.TYPE_1BUTTON,
      YES: '閉じる'
    });
  }
  
  openChooseFile(
    _selector = null
  ) {
    if (_selector == null) {
      Log.logCaution("openChooseFile", "set selector of first argument");
      return;
    }
    Log.logClassKey(
      "Diary Detail Controller",
      `DIARY: ${this.MODEL.DIARY["id"]}: ${_selector}`,
      "Open file chooser"
    );
    
    $(`#${_selector} ${this.MODEL.DIARY_DETAIL_UPLOAD_SELECTOR}`).click();
  }
  
  uploadImage(
    _selectorId = null,
    _uploadFlg = null
  ) {
    if (_selectorId == null || _uploadFlg == null) {
      Log.logCaution("uploadImage", "set upload flag of first argument");
      return;
    }
    Log.logClassKey(
      "Upload image",
      `DIARY: ${this.MODEL.DIARY["id"]}: ${_selectorId}`,
      _uploadFlg
    );
    
    let _file = new FormData();
    _file.append(
      'file',
      $(`#detail-image${_selectorId} ${this.MODEL.DIARY_DETAIL_UPLOAD_SELECTOR}`).prop('files')[0]
    );
    
    if (_uploadFlg) {
      $.ajax({
        url: 'ruby/uploadImage.rb',
        type : "POST",
        data: _file,
        processData : false,
        contentType : false,
        success: (_data) => {
          Log.logClassKey(this.NAME, 'ajax uploadImage', 'success');
          Log.logClass('upload return', _data);
        },
        error: () => {
          Log.logClassKey(this.NAME, 'ajax uploadImage', 'failed');
          this.VIEW.generateDiaryDetailArea(
            this.MODEL.ALERT_DANGER,
            'ajax通信に失敗しました。',
            false
          );
        }
      });
    }
  }
  
  choosedFile(
    _selector = null
  ) {
    if (_selector == null) {
      Log.logCaution("choosedFile", "set selector of first argument");
      return;
    }
    Log.logClassKey(
      "Diary Detail Controller",
      `DIARY: ${this.MODEL.DIARY["id"]}: ${_selector}`,
      "Choosed file"
    );
    
    
    const filename = $(`#${_selector} ${this.MODEL.DIARY_DETAIL_UPLOAD_SELECTOR}`).val().replace(/\\/g, '/').replace(/.*\//, '');
    Log.logClassKey('Choosed file', `DIARY: ${this.MODEL.DIARY["id"]}: ${_selector}`, filename);
    $(`#${_selector} ${this.MODEL.DIARY_DETAIL_FILE_NAME_SELECTOR}`).val(filename);
    
    if (filename.length == 0) {
      Log.logClass('Diary Detail Controller', 'Upload cancel');
      if (_selector.slice(-1) == '1') {
        this.MODEL.UPLOAD_IMAGE_1 = false;
        
      } else {
        this.MODEL.UPLOAD_IMAGE_2 = false;
        
      }
    } else {
      Log.logClass('Diary Detail Controller', 'Make a upload flg');
      if (_selector.slice(-1) == '1') {
        this.MODEL.UPLOAD_IMAGE_1 = true;
        
      } else {
        this.MODEL.UPLOAD_IMAGE_2 = true;
        
      }
    }
  }
}
