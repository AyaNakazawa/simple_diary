
// ----------------------------------------------------------------
// Diary Class

// ----------------------------------------------------------------
// Model

class DiaryModel extends CommonModel {
  constructor(
    _initSetting = {
      NAME: 'Diary Object',
      VIEW_SPEED_MS: 100,
      HEADER_TEXT: '日記情報'
    }
  ) {
    super(_initSetting);
    
    this.DIARY_AREA_SELECTOR = '#diary-area';
    this.DIARY_TBODY_SELECTOR = '#diary-tbody';
    
    this.DIARY_ADD_SELECTOR = '#diary-submit-add';
    this.DIARY_EDIT_SELECTOR = '#diary-submit-edit';
    this.DIARY_DELETE_SELECTOR = '#diary-submit-delete';
    this.DIARY_REFRESH_SELECTOR = '#diary-submit-refresh';
    
    this.TEMPLATE_DIARY_TABLE_SELECTOR = '#diary-table-template';
    this.TEMPLATE_DIARY_TBODY_SELECTOR = '#diary-tbody-template';
    this.TEMPLATE_DIARY_HOVER_SELECTOR = '#diary-hover-template';
    
    this.DIARY_SEARCH_TEXT_SELECTOR = '#diary-search-text';
    
    this.ID = null;
    this.HASH = null;
    this.DOWNLOAD = null;
    this.DIARYS = null;
    
    this.SEARCH = '';
    
    this.INITIALIZE = true;
    
    this.SELECT = null;
  }
}

// ----------------------------------------------------------------
// View

class DiaryView extends CommonView {
  constructor(
    _initSetting = {
      NAME: 'Diary View'
    }
  ) {
    super(_initSetting);
  }
  
  generateDiaryArea(
    _alertType = this.MODEL.ALERT_SUCCESS,
    _message = null,
    _close = true
  ) {
    $(this.MODEL.DIARY_AREA_SELECTOR).empty();
    $(this.MODEL.DIARY_AREA_SELECTOR).append(Content.getHeader(this.MODEL.HEADER_TEXT));
    this.generateAlert(this.MODEL.DIARY_AREA_SELECTOR, _alertType, _message, _close);
    
    let template = null;
    if (this.MODEL.DOWNLOAD) {
      Log.logClass(this.NAME, 'Diaries is found');
      
      let dataExists = null;
      if (this.MODEL.DIARYS == null) {
        dataExists = false;
      } else {
        dataExists = true;
      }
      
      $(this.MODEL.DIARY_AREA_SELECTOR).append(this.getTemplate(
        this.MODEL.TEMPLATE_DIARY_TABLE_SELECTOR,
        {
          dataExists: dataExists,
          search: this.MODEL.SEARCH
        }
      ));
      
      $.each(this.MODEL.DIARYS, (_id, _val) => {
        this.MODEL.DIARYS[_id][this.MODEL.ACTIVE] = false;
        
        let diaryData = '';
        diaryData += ', ' + _val['title'];
        diaryData += ', ' + _val['content'];
        diaryData += ', ' + _val['registerDate'];
        diaryData += ', ' + _val['updateDate'];
        
        if (diaryData.indexOf(this.MODEL.SEARCH) == -1) {
          return true;
        }
        
        $(this.MODEL.DIARY_TBODY_SELECTOR).append(this.getTemplate(
          this.MODEL.TEMPLATE_DIARY_TBODY_SELECTOR,
          {
            diary: _val,
            id: _id
          }
        ));
        $(this.MODEL.DIARY_AREA_SELECTOR).append(this.getTemplate(
          this.MODEL.TEMPLATE_DIARY_HOVER_SELECTOR,
          {
            diary: _val,
            id: _id
          }
        ));
        this.EVENT.setDiaryClick(_id);
        this.EVENT.setDiaryHover(_id);
        this.EVENT.setEditClick(_id);
        this.EVENT.setDeleteClick(_id);
        this.EVENT.setCloseClick(_id);
        if (_val['imageName'] != null) {
          let imageId = 0;
          for (const imageName of _val['imageName'].split(',')) {
            this.EVENT.setImageClick(_id, imageId, imageName);
            imageId ++;
          }
        }
      });
      PS.CONTROLLER.SCROLL.DIARY.VIEW.scroll();
      
    } else {
      Log.logClass(this.NAME, 'Diaries is not found');
    }
  }
  
  setDiaryPosition(
    _id = null
  ) {
    if (_id != null) {
      $(`#diary-${_id}-detail`).css(
        'top', (
          $(`#diary-${_id}-main`).offset().top + $(`#diary-${_id}-main`).height()
        ) + 'px'
      );
      const diaryTop = $(`#diary-${_id}-main`).offset().top + $(`#diary-${_id}-main`).height();
      const diaryHeight = $(`#diary-${_id}-detail`).height();
      const diaryBottom = diaryTop + diaryHeight + 16;
      const bodyBottom = $('body').height();
      if (diaryBottom > bodyBottom) {
        $('body').height(diaryBottom);
      }
    }
  }
  
  setDetailView(
    _id = null,
    _view = null,
    _type = null,
    _speed = 0
  ) {
    if (_id != null && _view != null && _type != null) {
      if (_view) {
        this.setDiaryPosition(_id);
        if (_type == this.MODEL.HOVER) {
          // ホバーにする
          this.MODEL.DIARYS[_id][this.MODEL.HOVER] = true;
        } else if (_type == this.MODEL.ACTIVE) {
          // アクティブにする
          this.MODEL.SELECT = _id;
          this.setDiaryActive(_id, true);
          $(this.MODEL.DIARY_EDIT_SELECTOR).prop('disabled', false);
          $(this.MODEL.DIARY_DELETE_SELECTOR).prop('disabled', false);
          // ホバー表示済みかで速度を変更
          if (this.MODEL.DIARYS[_id][this.MODEL.HOVER]) {
            _speed = 0;
          } else {
            _speed = this.MODEL.VIEW_SPEED_MS;
          }
        }
        $(`#diary-${_id}-detail`).slideDown(_speed);
      } else {
        if (_type == this.MODEL.HOVER) {
          // ホバーを解除
          this.MODEL.DIARYS[_id][this.MODEL.HOVER] = false;
        } else if (_type == this.MODEL.ACTIVE) {
          // アクティブを解除
          this.MODEL.SELECT = null;
          this.MODEL.DIARYS[_id][this.MODEL.HOVER] = false;
          this.setDiaryActive(_id, false);
          $(this.MODEL.DIARY_EDIT_SELECTOR).prop('disabled', true);
          $(this.MODEL.DIARY_DELETE_SELECTOR).prop('disabled', true);
        }
        $(`#diary-${_id}-detail`).slideUp(_speed);
      }
    }
  }
  
  setDiaryActive(
    _id = null,
    _flg = null
  ) {
    if (_id != null && _flg != null) {
      if (_flg) {
        this.MODEL.DIARYS[_id][this.MODEL.ACTIVE] = true;
        $(`#diary-${_id}-main`).addClass(this.MODEL.ACTIVE);
      } else {
        this.MODEL.DIARYS[_id][this.MODEL.ACTIVE] = false;
        $(`#diary-${_id}-main`).removeClass(this.MODEL.ACTIVE);
      }
    }
  }
}

// ----------------------------------------------------------------
// Event

class DiaryEvent extends CommonEvent {
  constructor(
    _initSetting = {
      NAME: 'Diary Event'
    }
  ) {
    super(_initSetting);
  }
  
  setOnEvent() {
    super.setOn(
      'click',
      this.MODEL.DIARY_ADD_SELECTOR,
      () => {
        this.CONTROLLER.addDiary();
      }
    );
    super.setOn(
      'click',
      this.MODEL.DIARY_EDIT_SELECTOR,
      () => {
        this.CONTROLLER.editDiary(this.MODEL.SELECT);
      }
    );
    super.setOn(
      'click',
      this.MODEL.DIARY_DELETE_SELECTOR,
      () => {
        this.CONTROLLER.deleteDiary(this.MODEL.SELECT);
      }
    );
    super.setOn(
      'click',
      this.MODEL.DIARY_REFRESH_SELECTOR,
      () => {
        this.CONTROLLER.downloadDiary();
      }
    );
    super.setOn(
      'change',
      this.MODEL.DIARY_SEARCH_TEXT_SELECTOR,
      () => {
        this.CONTROLLER.getSearchString();
        if (this.MODEL.SEARCH.length > 0) {
          this.VIEW.generateDiaryArea(this.MODEL.ALERT_SUCCESS, `「${this.MODEL.SEARCH}」で検索しました。`);
        } else {
          this.VIEW.generateDiaryArea(this.MODEL.ALERT_SUCCESS, `日記データを取得しました。`);
        }
      }
    );
  }
  
  setDiaryClick(_id = null) {
    if (_id != null) {
      $(`#diary-${_id}-main`).click(
        () => {
          if (this.MODEL.DIARYS[_id][this.MODEL.ACTIVE]) {
            // 既にアクティブなときは解除
            this.VIEW.setDetailView(_id, false, this.MODEL.ACTIVE, this.MODEL.VIEW_SPEED_MS);
          } else {
            // アクティブにする
            $.each(this.MODEL.DIARYS, (_id2, _val2) => {
              // 他の項目を解除する
              if (_id2 != _id) {
                this.VIEW.setDetailView(_id2, false, this.MODEL.ACTIVE);
              }
            });
            // クリックした項目をアクティブにする
            this.VIEW.setDetailView(_id, true, this.MODEL.ACTIVE);
          }
        }
      );
    }
  }
  
  setDiaryHover(_id = null) {
    if (_id != null) {
      $(`#diary-${_id}-main`).hover(
        () => {
          // なにもアクティブでないとき
          if (this.MODEL.SELECT == null) {
            // ホバーにする
            this.VIEW.setDetailView(_id, true, this.MODEL.HOVER, this.MODEL.VIEW_SPEED_MS);
          }
        },
        () => {
          // アクティブでないとき
          if (!this.MODEL.DIARYS[_id][this.MODEL.ACTIVE]) {
            // ホバー解除
            this.VIEW.setDetailView(_id, false, this.MODEL.HOVER);
          }
        }
      );
    }
  }
  
  setEditClick(_id = null) {
    if (_id != null) {
      $(`.diary-${_id}-edit`).click(
        () => {
          this.CONTROLLER.editDiary(_id);
        }
      );
    }
  }
  
  setDeleteClick(_id = null) {
    if (_id != null) {
      $(`.diary-${_id}-delete`).click(
        () => {
          this.CONTROLLER.deleteDiary(_id);
        }
      );
    }
  }
  
  setCloseClick(_id = null) {
    if (_id != null) {
      $(`.diary-${_id}-close`).click(
        () => {
          this.CONTROLLER.closeDiary(_id);
        }
      );
    }
  }
  
  setImageClick(_id = null, _imageId = null, _imageName = null) {
    if (_id != null || _imageId != null || _imageName != null) {
      $(`.diary-image-${_id}-${_imageId}`).click(
        () => {
          this.CONTROLLER.openImagePreview(_imageName);
        }
      );
    }
  }
}

// ----------------------------------------------------------------
// Controller

class DiaryController extends CommonController {
  constructor(
    _model = {},
    _initSetting = {
      NAME: 'Diary Controller',
      MODEL: new DiaryModel(),
      VIEW: new DiaryView(),
      EVENT: new DiaryEvent()
    }
  ) {
    super(_model, _initSetting);
    
    this.EVENT.setOnEvent();
  }
  
  setUser(_id = this.MODEL.ID, _hash = this.MODEL.HASH) {
    this.MODEL.ID = _id;
    this.MODEL.HASH = _hash;
    
    this.downloadDiary();
  }
  
  downloadDiary(_id = this.MODEL.ID, _hash = this.MODEL.HASH) {
    this.MODEL.DOWNLOAD = false;
    
    this.clearSearchString();
    
    this.VIEW.generateLoading(this.MODEL.DIARY_AREA_SELECTOR, '通信中', `ユーザーID ${_id} の日記データを取得中`);
    
    if (_id != null && _hash != null) {
      $.ajax({
        url: 'ruby/getDiary.rb',
        data: {
          id: _id,
          password: _hash
        },
        dataType: 'json',
        success: (_data) => {
          Log.logClassKey(this.NAME, 'ajax getDiary', 'success');
          this.MODEL.DOWNLOAD = true;
          if (Object.keys(_data).length > 0) {
            this.MODEL.DIARYS = _data;
            if (this.MODEL.INITIALIZE) {
              this.VIEW.generateDiaryArea(this.MODEL.ALERT_SUCCESS, `日記データを取得しました。`);
              
            } else {
              this.VIEW.generateDiaryArea(this.MODEL.ALERT_INFO, `日記データを更新しました。`);
            }
            this.MODEL.INITIALIZE = false;
            
          } else {
            this.MODEL.DIARYS = null;
            this.VIEW.generateDiaryArea(this.MODEL.ALERT_INFO, '日記データは存在しません。', false);
          }
        },
        error: () => {
          Log.logClassKey(this.NAME, 'ajax getDiary', 'failed');
          this.VIEW.generateDiaryArea(this.MODEL.ALERT_DANGER, 'ajax通信に失敗しました。', false);
          this.MODEL.INITIALIZE = true;
        }
      });
    } else {
      this.VIEW.generateDiaryArea(this.MODEL.ALERT_WARNING, 'ログインしてください。', false);
      PS.CONTROLLER.SWITCH.DIARY.VIEW.setView(false);
      this.MODEL.INITIALIZE = true;
    }
  }
  
  addDiary() {
    Log.logClassKey(this.NAME, 'Click', 'Add');
    PS.CONTROLLER.DIARY_DETAIL.openDiary(
      this.MODEL.ID,
      this.MODEL.HASH,
      null
    );
    PS.CONTROLLER.SCROLL.DIARY_DETAIL.VIEW.scroll();
    this.VIEW.setDetailView(this.MODEL.SELECT, false, this.MODEL.ACTIVE, this.MODEL.VIEW_SPEED_MS);
  }
  
  editDiary(_id = null) {
    Log.logClassKey(`${this.NAME}:${_id}`, 'Click', 'Edit');
    PS.CONTROLLER.DIARY_DETAIL.openDiary(
      this.MODEL.ID,
      this.MODEL.HASH,
      this.MODEL.DIARYS[_id]
    );
    PS.CONTROLLER.SCROLL.DIARY_DETAIL.VIEW.scroll();
    this.VIEW.setDetailView(_id, false, this.MODEL.ACTIVE, this.MODEL.VIEW_SPEED_MS);
  }
  
  deleteDiary(_id = null) {
    Log.logClassKey(`${this.NAME}:${_id}`, 'Click', 'Delete');
    PS.CONTROLLER.DIARY_DETAIL.deleteDiary(
      this.MODEL.ID,
      this.MODEL.HASH,
      this.MODEL.DIARYS[_id]
    );
    this.VIEW.setDetailView(_id, false, this.MODEL.ACTIVE, this.MODEL.VIEW_SPEED_MS);
  }
  
  closeDiary(_id = null) {
    Log.logClassKey(`${this.NAME}:${_id}`, 'Click', 'Close');
    this.VIEW.setDetailView(_id, false, this.MODEL.ACTIVE, this.MODEL.VIEW_SPEED_MS);
  }
  
  getSearchString() {
    this.MODEL.SEARCH = $(this.MODEL.DIARY_SEARCH_TEXT_SELECTOR).val();
    Log.logClassKey(`${this.NAME}`, 'Search', this.MODEL.SEARCH, Log.ARROW_INPUT);
  }
  
  clearSearchString() {
    this.MODEL.SEARCH = '';
  }
  
  openImagePreview(
    _imageName = null
  ) {
    if (_imageName == null) {
      Log.logCaution('openImagePreview', 'set image name of first argument');
      return;
    }
    Log.logClassKey(
      'Diary Controller',
      `DIARY`,
      'Open image preview'
    );
    
    new ConfirmController({
      CONFIRM_ID: 'image-preview',
      CONFIRM_TITLE: 'プレビュー',
      IMAGE_URL: `image/${_imageName}`,
      AUTO_OPEN: true,
      TYPE: ConfirmModel.TYPE_1BUTTON,
      YES: '閉じる'
    });
  }
  
}
