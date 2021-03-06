
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
    
    this.TEMPLATE_DIARY_DETAIL_TITLE_SELECTOR = '#diary-detail-title-template';
    this.TEMPLATE_DIARY_DETAIL_CONTENT_SELECTOR = '#diary-detail-content-template';
    this.TEMPLATE_DIARY_DETAIL_IMAGE_BUTTON_SELECTOR = '#diary-detail-image-button-template';
    this.TEMPLATE_DIARY_DETAIL_IMAGE_SPAN_SELECTOR = '#diary-detail-image-span-template';
    this.TEMPLATE_DIARY_DETAIL_IMAGE_SELECTOR = '#diary-detail-image-template';
    this.TEMPLATE_DIARY_DETAIL_DATE_SELECTOR = '#diary-detail-date-template';
    this.TEMPLATE_DIARY_DETAIL_LAST_BUTTON_SELECTOR = '#diary-detail-last-button-template';
    
    this.DIARY_DETAIL_ADD_SELECTOR = '#detail-submit-add';
    this.DIARY_DETAIL_SAVE_SELECTOR = '#detail-submit-save';
    this.DIARY_DETAIL_DELETE_SELECTOR = '#detail-submit-delete';
    this.DIARY_DETAIL_CLOSE_SELECTOR = '#detail-submit-close';
    
    this.DIARY_DETAIL_IMAGE_PREVIEW_SELECTOR = '.detail-image-preview';
    this.DIARY_DETAIL_IMAGE_DELETE_SELECTOR = '.detail-image-delete';
    this.DIARY_DETAIL_UPLOAD_FILE_SELECTOR = '.detail-upload-file';
    this.DIARY_DETAIL_FILE_NAME_SELECTOR = '.upload-file-name';
    
    this.DIARY_DETAIL_CHOOSE_FILE_SELECTOR = '#detail-choose-file';
    this.DIARY_DETAIL_IMAGE_SPAN_SELECTOR = '#detail-image-span';
    this.DIARY_DETAIL_UPLOAD_SELECTOR = '#detail-upload';
    
    this.ID = null;
    this.HASH = null;
    this.CRYPTO_HASH = null;
    this.ID_HASH = null;
    this.DIARY = null;
    this.IMAGES = [];
    this.ADD_FLAG = true;
    
    this.IMAGE_ID = 0;
    
    this.DIARY_EDIT = null;
    
    this.SRC_TYPE_UPLOAD = 'upload';
    this.SRC_TYPE_READER = 'reader';
    
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
    if (this.MODEL.DIARY == null) {
      body = '新規作成';
      this.MODEL.DIARY = this.getDiaryEdit();
    } else {
      body = this.MODEL.DIARY['title'];
    }
    $(this.MODEL.DIARY_DETAIL_AREA_SELECTOR).append(
      Content.getHeader(body)
    );
    super.generateAlert(
      this.MODEL.DIARY_DETAIL_AREA_SELECTOR,
      _alertType,
      _message,
      _close
    );
    
    // タイトル
    $(this.MODEL.DIARY_DETAIL_AREA_SELECTOR).append(this.getTemplate(
      this.MODEL.TEMPLATE_DIARY_DETAIL_TITLE_SELECTOR,
      {
        diary: this.MODEL.DIARY
      }
    ));
    
    // 内容
    $(this.MODEL.DIARY_DETAIL_AREA_SELECTOR).append(this.getTemplate(
      this.MODEL.TEMPLATE_DIARY_DETAIL_CONTENT_SELECTOR,
      {
        diary: this.MODEL.DIARY
      }
    ));
    
    // 内容の行数に合わせる
    if ($('#detail-content').val().getRows() >= 3) {
      $('#detail-content').attr('rows', $('#detail-content').val().getRows());
    }
    
    // 画像選択ボタン
    $(this.MODEL.DIARY_DETAIL_AREA_SELECTOR).append(this.getTemplate(
      this.MODEL.TEMPLATE_DIARY_DETAIL_IMAGE_BUTTON_SELECTOR
    ));
    
    // 画像リストボタン
    $(this.MODEL.DIARY_DETAIL_AREA_SELECTOR).append(this.getTemplate(
      this.MODEL.TEMPLATE_DIARY_DETAIL_IMAGE_SPAN_SELECTOR
    ));
    
    // 画像単体
    for (const image of this.MODEL.IMAGES) {
      if (image.length > 0) {
        $(this.MODEL.DIARY_DETAIL_IMAGE_SPAN_SELECTOR).append(this.getTemplate(
          this.MODEL.TEMPLATE_DIARY_DETAIL_IMAGE_SELECTOR,
          {
            type: this.MODEL.SRC_TYPE_UPLOAD,
            imageData: image,
            imageId: this.MODEL.IMAGE_ID
          }
        ));
        this.MODEL.IMAGE_ID ++;
      }
    }
    
    // // 日時
    // $(this.MODEL.DIARY_DETAIL_AREA_SELECTOR).append(this.getTemplate(
    //   this.MODEL.TEMPLATE_DIARY_DETAIL_DATE_SELECTOR,
    //   {
    //     diary: this.MODEL.DIARY
    //   }
    // ));
    
    // 下のボタン
    $(this.MODEL.DIARY_DETAIL_AREA_SELECTOR).append(this.getTemplate(
      this.MODEL.TEMPLATE_DIARY_DETAIL_LAST_BUTTON_SELECTOR,
      {
        add: this.MODEL.ADD_FLAG
      }
    ));
  }
  
  getDiaryEdit() {
    let diary = {
      title: $('#detail-title').val(),
      content: $('#detail-content').val(),
      image: this.MODEL.IMAGES,
      registerDate: (new Date()).getString(),
      updateDate: (new Date()).getString()
    };
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
    this.setImageDeleteClick();
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
        PS.CONTROLLER.DIARY_DETAIL.openImagePreview($(this).attr('id'));
      }
    );
  }
  
  setImageDeleteClick() {
    super.setOn(
      'click',
      this.MODEL.DIARY_DETAIL_IMAGE_DELETE_SELECTOR,
      function () {
        PS.CONTROLLER.DIARY_DETAIL.openImageDelete($(this).attr('id'));
      }
    );
  }
  
  setChooseFileClick() {
    super.setOn(
      'click',
      this.MODEL.DIARY_DETAIL_CHOOSE_FILE_SELECTOR,
      function () {
        PS.CONTROLLER.DIARY_DETAIL.openChooseFile();
      }
    );
  }
  
  setChooseFile() {
    super.setOn(
      'change',
      this.MODEL.DIARY_DETAIL_UPLOAD_SELECTOR,
      function () {
        PS.CONTROLLER.DIARY_DETAIL.choosedFile();
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
    _cryptoHash = null,
    _idHash = null,
    _images = []
  ) {
    this.MODEL.ID = _id;
    this.MODEL.HASH = _hash;
    this.MODEL.CRYPTO_HASH = _cryptoHash;
    this.MODEL.ID_HASH = _idHash;
    this.MODEL.DIARY = _diary;
    this.MODEL.IMAGES = _images;
    
    this.MODEL.IMAGE_ID = 0;
    
    this.MODEL.ADD_FLAG = true;
    
    if (_id != null && _hash != null) {
      if (_diary == null) {
        // 日記がない場合
        if (PS.CONTROLLER.USER.MODEL.LOGIN) {
          // ログイン済み
          // 日記の追加
          this.VIEW.generateDiaryDetailArea(
            this.MODEL.ALERT_SUCCESS,
            '日記を追加できます。'
          );
          PS.CONTROLLER.SWITCH.DIARY_DETAIL.VIEW.setView(true);
        } else {
          // ログインしていない
          // 日記の選択
          this.VIEW.generateDiaryDetailArea(
            this.MODEL.ALERT_WARNING,
            '日記を選択してください。'
          );
          PS.CONTROLLER.SWITCH.DIARY_DETAIL.VIEW.setView(false);
        }
      } else {
        // 日記の編集
        this.MODEL.ADD_FLAG = false;
        this.VIEW.generateDiaryDetailArea(
          this.MODEL.ALERT_SUCCESS,
          '日記を編集できます。'
        );
        PS.CONTROLLER.SWITCH.DIARY_DETAIL.VIEW.setView(true);
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
    this.MODEL.DIARY = _diary;
    
    this.checkTitleValidate();
    if (this.checkContentValidate()) {
      return true;
    }
    
    PS.CONTROLLER.SCROLL.DIARY_DETAIL.VIEW.scroll();
    return false;
  }
  
  checkTitleValidate() {
    if (!Validate.checkMinLength(this.MODEL.DIARY['title'], 1)) {
      this.MODEL.DIARY['title'] = this.MODEL.DIARY['content'].substr(0, 10);
    }
  }
  
  checkContentValidate() {
    if (Validate.checkMinLength(this.MODEL.DIARY['content'], 1)) {
      return true;
    }
    this.VIEW.generateDiaryDetailArea(
      this.MODEL.ALERT_WARNING,
      '内容 を入力してください。'
    );
    return false;
  }
  
  saveDiary(
    _id = this.MODEL.ID,
    _hash = this.MODEL.HASH,
    _diary = this.MODEL.DIARY,
    _type = null
  ) {
    
    if (!this.checkValidate(_diary)) {
      return;
    }
    
    if (_type == this.MODEL.TYPE_ADD) {
      this.VIEW.generateLoading($(this.MODEL.DIARY_DETAIL_AREA_SELECTOR),'日記追加中',  `日記を追加中`);
    } else if (_type == this.MODEL.TYPE_UPDATE) {
      this.VIEW.generateLoading($(this.MODEL.DIARY_DETAIL_AREA_SELECTOR),'日記更新中',  `日記を更新中`);
    } else if (_type == this.MODEL.TYPE_DELETE) {
      this.VIEW.generateLoading($(this.MODEL.DIARY_DETAIL_AREA_SELECTOR),'日記削除中',  `日記を削除中`);
    }
    
    const encryptImageData = this.CONTROLLER.encryptImage();
    if (encryptImageData.length > 950000) {
      this.MODEL.IMAGE_ID = 0;
      this.VIEW.generateDiaryDetailArea(
        this.MODEL.ALERT_WARNING,
        '画像ファイルが大きすぎます。'
      );
      return;
    }
    
    const encryptTitle = Crypto.encrypt(
      _diary['title'],
      this.MODEL.CRYPTO_HASH
    );
    const encryptContent = Crypto.encrypt(
      _diary['content'],
      this.MODEL.CRYPTO_HASH
    );
    
    $.ajax({
      url: 'ruby/saveDiary.rb',
      data: {
        type: _type,
        userName: this.MODEL.ID_HASH,
        password: this.MODEL.HASH,
        id: _diary['id'],
        title: encryptTitle,
        content: encryptContent,
        registerDate: _diary['registerDate'],
        updateDate: (new Date()).getString(),
        images: encryptImageData
      },
      success: (_data) => {
        super.log('ajax saveDiary', 'success');
        if (_data.length > 0) {
          PS.CONTROLLER.DIARY.setUser();
          PS.CONTROLLER.SCROLL.DIARY.VIEW.scroll();
          PS.CONTROLLER.SWITCH.DIARY.VIEW.setView(true);
          PS.CONTROLLER.SWITCH.DIARY_DETAIL.VIEW.setView(false);
        } else {
          this.MODEL.IMAGE_ID = 0;
          this.VIEW.generateDiaryDetailArea(
            this.MODEL.ALERT_WARNING,
            `日記の登録に失敗しました。`
          );
        }
      },
      error: () => {
        super.log('ajax saveDiary', 'failed');
        this.MODEL.IMAGE_ID = 0;
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
        CONFIRM_MESSAGE: `日記「${_diary.title}」を本当に削除しますか？`,
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
      Log.logCaution('openImagePreview', 'set selector of first argument');
      return;
    }
    Log.logClassKey(
      'Diary Detail Controller',
      `DIARY ${_selector}`,
      'Open image preview'
    );
    
    const imageId = parseInt(_selector.slice(-1));
    const imageData = this.MODEL.IMAGES[imageId];
    
    new ConfirmController({
      CONFIRM_ID: 'image-preview',
      CONFIRM_TITLE: 'プレビュー',
      IMAGE_URL: imageData,
      AUTO_OPEN: true,
      TYPE: ConfirmModel.TYPE_1BUTTON,
      YES: '閉じる'
    });
  }
  
  openImageDelete(
    _selector = null
  ) {
    if (_selector == null) {
      Log.logCaution('openImageDelete', 'set selector of first argument');
      return;
    }
    Log.logClassKey(
      'Diary Detail Controller',
      `DIARY ${_selector}`,
      'Open image delete'
    );
    
    const imageId = parseInt(_selector.slice(-1));
    const imageData = this.MODEL.IMAGES[imageId];
    
    new ConfirmController({
      CONFIRM_ID: 'image-delete',
      CONFIRM_TITLE: '画像の削除',
      CONFIRM_MESSAGE: 'この画像を削除しますか？',
      IMAGE_URL: imageData,
      AUTO_OPEN: true,
      TYPE: ConfirmModel.TYPE_2BUTTON,
      FUNCTION_YES: () => {
        this.deleteImage(imageId);
      }
    });
  }
  
  deleteImage(
    _imageId = null
  ) {
    if (_imageId == null) {
      Log.logCaution('deleteImage', 'set selector of first argument');
      return;
    }
    Log.logClassKey(
      'Diary Detail Controller',
      `Image ID: ${_imageId}`,
      'Delete image'
    );
    
    this.VIEW.removeHTML(`#detail-image-${_imageId}`);
    this.MODEL.IMAGES[_imageId] = null;
  }
  
  openChooseFile() {
    Log.logClassKey(
      'Diary Detail Controller',
      `openChooseFile`,
      'Open file chooser'
    );
    
    $(`${this.MODEL.DIARY_DETAIL_UPLOAD_SELECTOR}`).click();
  }
  
  encryptImage() {
    Log.logClass(
      'Diary Detail',
      'Upload image'
    );
    
    let imageData = '';
    for (const image of this.MODEL.IMAGES) {
      if (image != null) {
        const encryptImage = Crypto.encrypt(
          image,
          this.MODEL.CRYPTO_HASH
        );
        
        imageData += ',' + encryptImage;
      }
    }
    
    imageData = imageData.substr(1);
    return imageData;
  }
  
  choosedFile() {
    Log.logClassKey(
      'Diary Detail Controller',
      'Diary Detail',
      'Choosed file'
    );
    
    const file = $(`${this.MODEL.DIARY_DETAIL_UPLOAD_SELECTOR}`);
    const fileData = file.prop('files')[0];
    const filename = file.val().replace(/\\/g, '/').replace(/.*\//, '');
    Log.logClassKey('Choosed file', `Diary Detail`, filename);
    
    if(file[0].files[0].type.indexOf("image") < 0){
      return;
    }
    
    if (filename.length == 0) {
      Log.logClass('Diary Detail Controller', 'Upload cancel');
      return;
      
    }
    
    Log.logClass('Diary Detail Controller', 'File choosed');
    
    const reader = new FileReader();
    
    reader.onload = () => {
      $(this.MODEL.DIARY_DETAIL_IMAGE_SPAN_SELECTOR).append(this.VIEW.getTemplate(
        this.MODEL.TEMPLATE_DIARY_DETAIL_IMAGE_SELECTOR,
        {
          type: this.MODEL.SRC_TYPE_READER,
          imageData: reader.result,
          imageId: this.MODEL.IMAGE_ID
        }
      ));
      this.MODEL.IMAGES[this.MODEL.IMAGE_ID] = reader.result;
      this.MODEL.IMAGE_ID ++;
    };
    
    reader.readAsDataURL(fileData);
  }
}
