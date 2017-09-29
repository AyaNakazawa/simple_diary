
// ----------------------------------------------------------------
// User Class

// ----------------------------------------------------------------
// Model

class UserModel extends CommonModel {
  constructor(
    _initSetting = {
      NAME: 'User Object',
      USER_ID_SELECTOR: '#user-id',
      USER_PASSWORD_SELECTOR: '#user-password',
      USER_CHECK_SELECTOR: '#user-check',
      LOGIN_SELECTOR: '#login-submit',
      LOGIN_TRIGGER: 'click',
      LOGOUT_SELECTOR: '#logout-submit',
      LOGOUT_TRIGGER: 'click',
      SIGNUP_SELECTOR: '#signup-submit',
      SIGNUP_TRIGGER: 'click',
      USER_PASSWORD_OLD_SELECTOR: '#option-old-password',
      USER_PASSWORD_NEW_SELECTOR: '#option-new-password',
      CHANGE_PASSWORD_SELECTOR: '#change-password-submit',
      CHANGE_PASSWORD_TRIGGER: 'click'
    }
  ) {
    super(_initSetting);
    
    this.LOGIN = false;
    this.ID = null;
    this.PASSWORD = null;
    this.HASH = null;
    this.CRYPTO_HASH = null;
    
    this.USER_AREA_SELECTOR = '#user-area';
    this.TEMPLATE_LOGINED_SELECTOR = '#logined-template';
    this.TEMPLATE_NOT_LOGIN_SELECTOR = '#not-login-template';
    
    this.ID_LENGTH_MAX = 31;
    this.ID_LENGTH_MIN = 3;
    
    this.PASSWORD_LENGTH_MIN = 8;
    
    this.SWITCH_LABEL_SELECTOR = '#switch-user';
  }
}

// ----------------------------------------------------------------
// View

class UserView extends CommonView {
  constructor(
    _initSetting = {
      NAME: 'User View'
    }
  ) {
    super(_initSetting);
  }
  
  generateUserArea(
    _alertType = this.MODEL.ALERT_SUCCESS,
    _message = null,
    _close = true,
    _view = false
  ) {
    $(this.MODEL.USER_AREA_SELECTOR).empty();
    this.generateAlert(this.MODEL.USER_AREA_SELECTOR, _alertType, _message, _close);
    
    let template = null;
    if (this.MODEL.LOGIN) {
      // ログインしているとき
      Log.logClass(this.NAME, 'Logined');
      template = this.MODEL.TEMPLATE_LOGINED_SELECTOR;
      $(`${this.MODEL.SWITCH_LABEL_SELECTOR} a`).text('Option');
      
      PS.CONTROLLER.SWITCH.USER.VIEW.setView(_view);
      PS.CONTROLLER.SWITCH.DIARY.VIEW.setView(true);
      
    } else {
      // ログインしていないとき
      Log.logClass(this.NAME, 'Not login');
      template = this.MODEL.TEMPLATE_NOT_LOGIN_SELECTOR;
      $(`${this.MODEL.SWITCH_LABEL_SELECTOR} a`).text('Login');
      
    }
    
    $(this.MODEL.USER_AREA_SELECTOR).append(this.getTemplate(
      template,
      {
        id: this.MODEL.ID,
        password: this.MODEL.PASSWORD
      }
    ));
    
    $(this.MODEL.USER_ID_SELECTOR).focus();
    
    SDProcess.initPopover();
  }
}

// ----------------------------------------------------------------
// Event

class UserEvent extends CommonEvent {
  constructor(
    _initSetting = {
      NAME: 'User Event'
    }
  ) {
    super(_initSetting);
  }
  
  setEvent() {
    this.setClickLogin();
    this.setClickLogout();
    this.setClickSignup();
    this.setPressEnterID();
    this.setPressEnterPassword();
    this.setPressEnterOldPassword();
    this.setPressEnterNewPassword();
    this.setClickChangePassword();
  }
  
  setClickLogin() {
    super.setOn(
      this.CONTROLLER.MODEL.LOGIN_TRIGGER,
      this.CONTROLLER.MODEL.LOGIN_SELECTOR,
      () => {
        this.CONTROLLER.submitLogin();
      }
    );
  }
  
  setClickLogout() {
    super.setOn(
      this.CONTROLLER.MODEL.LOGOUT_TRIGGER,
      this.CONTROLLER.MODEL.LOGOUT_SELECTOR,
      () => {
        new ConfirmController({
          CONFIRM_ID: 'confirm-submit-logout',
          CONFIRM_TITLE: 'ログアウト',
          CONFIRM_MESSAGE: `ログアウトしてもよろしいですか？`,
          AUTO_OPEN: true,
          FUNCTION_YES: () => {
            this.CONTROLLER.submitLogout();
          }
        });
      }
    );
  }
  
  setClickSignup() {
    super.setOn(
      this.CONTROLLER.MODEL.SIGNUP_TRIGGER,
      this.CONTROLLER.MODEL.SIGNUP_SELECTOR,
      () => {
        new ConfirmController({
          CONFIRM_ID: 'confirm-submit-signup',
          CONFIRM_TITLE: 'サインアップ',
          CONFIRM_MESSAGE: `ユーザーをサインアップしてもよろしいですか？`,
          AUTO_OPEN: true,
          FUNCTION_YES: () => {
            this.CONTROLLER.submitSignup();
          }
        });
      }
    );
  }
  
  setPressEnterID() {
    super.setOn(
      'keypress',
      this.CONTROLLER.MODEL.USER_ID_SELECTOR,
      (e) => {
        if (e.keyCode == 13) {
          $(this.CONTROLLER.MODEL.USER_PASSWORD_SELECTOR).focus();
        }
      }
    );
  }
  
  setPressEnterPassword() {
    super.setOn(
      'keypress',
      this.CONTROLLER.MODEL.USER_PASSWORD_SELECTOR,
      (e) => {
        if (e.keyCode == 13) {
          $(this.CONTROLLER.MODEL.LOGIN_SELECTOR).trigger(this.CONTROLLER.MODEL.LOGIN_TRIGGER);
        }
      }
    );
  }
  
  setPressEnterOldPassword() {
    super.setOn(
      'keypress',
      this.CONTROLLER.MODEL.USER_PASSWORD_OLD_SELECTOR,
      (e) => {
        if (e.keyCode == 13) {
          $(this.CONTROLLER.MODEL.USER_PASSWORD_NEW_SELECTOR).focus();
        }
      }
    );
  }
  
  setPressEnterNewPassword() {
    super.setOn(
      'keypress',
      this.CONTROLLER.MODEL.USER_PASSWORD_NEW_SELECTOR,
      (e) => {
        if (e.keyCode == 13) {
          $(this.CONTROLLER.MODEL.CHANGE_PASSWORD_SELECTOR).trigger(this.CONTROLLER.MODEL.CHANGE_PASSWORD_TRIGGER);
        }
      }
    );
  }
  
  setClickChangePassword() {
    super.setOn(
      this.CONTROLLER.MODEL.CHANGE_PASSWORD_TRIGGER,
      this.CONTROLLER.MODEL.CHANGE_PASSWORD_SELECTOR,
      () => {
        new ConfirmController({
          CONFIRM_ID: 'confirm-submit-change-password',
          CONFIRM_TITLE: 'パスワードの変更',
          CONFIRM_MESSAGE: `パスワードを変更してもよろしいですか？`,
          AUTO_OPEN: true,
          FUNCTION_YES: () => {
            this.CONTROLLER.submitChangePassword();
          }
        });
      }
    );
  }
}

// ----------------------------------------------------------------
// Controller

class UserController extends CommonController {
  constructor(
    _model = {},
    _initSetting = {
      NAME: 'User Controller',
      MODEL: new UserModel(),
      VIEW: new UserView(),
      EVENT: new UserEvent()
    }
  ) {
    super(_model, _initSetting);
    
    this.EVENT.setEvent();
    this.VIEW.generateUserArea();
  }
    
  checkValidate() {
    this.MODEL.ID = $(this.MODEL.USER_ID_SELECTOR).val();
    this.MODEL.PASSWORD = $(this.MODEL.USER_PASSWORD_SELECTOR).val();
    if (this.checkIdValidate(this.MODEL.ID) && this.checkPasswordValidate(this.MODEL.PASSWORD)) {
      return true;
    }
    return false;
  }
  
  checkIdValidate(
    _id = null
  ) {
    if (_id == null) {
      return false;
    }
    this.MODEL.ID = _id;
    if (
      !Validate.checkMinLength(
        _id,
        0
      )
    ) {
      this.VIEW.generateUserArea(
        this.MODEL.ALERT_WARNING,
        'ID を入力してください。'
      );
      return false;
    } else if (
      !Validate.checkMinLength(
        _id,
        this.MODEL.ID_LENGTH_MIN
      )
    ) {
      this.VIEW.generateUserArea(
        this.MODEL.ALERT_WARNING,
        `ID は ${this.MODEL.ID_LENGTH_MIN} 文字以上で入力してください。`
      );
      return false;
    } else if (
      !Validate.checkMaxLength(
        _id,
        this.MODEL.ID_LENGTH_MAX
      )
    ) {
      this.VIEW.generateUserArea(
        this.MODEL.ALERT_WARNING,
        `ID は ${this.MODEL.ID_LENGTH_MAX} 文字以下で入力してください。`
      );
      return false;
    }
    return true;
  }
  
  checkPasswordValidate(
    _password = null
  ) {
    if (_password == null) {
      return false;
    }
    if (
      !Validate.checkMinLength(
        _password,
        0
      )
    ) {
      this.VIEW.generateUserArea(
        this.MODEL.ALERT_WARNING,
        'パスワード を入力してください。',
        true,
        true
      );
      return false;
    } else if (
      !Validate.checkMinLength(
        _password,
        this.MODEL.PASSWORD_LENGTH_MIN
      )
    ) {
      this.VIEW.generateUserArea(
        this.MODEL.ALERT_WARNING,
        `パスワード は ${this.MODEL.PASSWORD_LENGTH_MIN} 文字以上で入力してください。`,
        true,
        true
      );
      return false;
    } else if (!Validate.checkIncludeNumber(_password)) {
      this.VIEW.generateUserArea(
        this.MODEL.ALERT_WARNING,
        `パスワード は数字を含めてください。`,
        true,
        true
      );
      return false;
    } else if (!Validate.checkIncludeAlphabet(_password)) {
      this.VIEW.generateUserArea(
        this.MODEL.ALERT_WARNING,
        `パスワード はアルファベットを含めてください。`,
        true,
        true
      );
      return false;
    }
    return true;
  }
  
  submitLogin() {
    Log.logClassKey(this.NAME, 'Submit', 'Login');
    
    if (this.checkValidate() == false) {
      return;
    }
    
    this.MODEL.HASH = SHA256.getHash(this.MODEL.PASSWORD);
    
    this.VIEW.generateLoading(this.MODEL.USER_AREA_SELECTOR, 'ログイン中', `${this.MODEL.ID} でログイン`);
    
    $.ajax({
      url: 'ruby/loginUser.rb',
      data: {
        id: this.MODEL.ID,
        password: this.MODEL.HASH
      },
      success: (_data) => {
        Log.logClassKey(this.NAME, 'ajax loginUser', 'success');
        if (_data.length > 0) {
          this.MODEL.ID = _data;
          this.MODEL.LOGIN = true;
          PS.CONTROLLER.DIARY.setUser(this.MODEL.ID, this.MODEL.HASH);
          this.VIEW.generateUserArea(
            this.MODEL.ALERT_SUCCESS,
            `ユーザー ${this.MODEL.ID} でログインしました。`
          );
        } else {
          this.VIEW.generateUserArea(
            this.MODEL.ALERT_WARNING,
            'IDとパスワードの組み合わせが正しくありません。'
          );
        }
      },
      error: () => {
        Log.logClassKey(this.NAME, 'ajax loginUser', 'failed');
        this.VIEW.generateUserArea(
          this.MODEL.ALERT_DANGER,
          'ajax通信に失敗しました。',
          false
        );
      }
    });
  }
  
  submitLogout() {
    Log.logClassKey(this.NAME, 'Submit', 'Logout');
    this.MODEL.LOGIN = false;
    this.MODEL.ID = null;
    this.MODEL.PASSWORD = null;
    PS.CONTROLLER.DIARY.setUser(null, null);
    PS.CONTROLLER.DIARY_DETAIL.openDiary(null, null, null);
    this.VIEW.generateUserArea(
      'success',
      'ログアウトしました。'
    );
  }
  
  submitSignup() {
    Log.logClassKey(this.NAME, 'Submit', 'Sign Up');
    
    if (this.checkValidate() == false) {
      return;
    }
    
    this.MODEL.HASH = SHA256.getHash(this.MODEL.PASSWORD);
    
    this.VIEW.generateLoading($(this.MODEL.USER_AREA_SELECTOR),'登録中',  `${this.MODEL.ID} でユーザー登録`);
    
    $.ajax({
      url: 'ruby/signupUser.rb',
      data: {
        id: this.MODEL.ID,
        password: this.MODEL.HASH
      },
      success: (_data) => {
        Log.logClassKey(this.NAME, 'ajax signupUser', 'success');
        if (_data.length > 0) {
          this.MODEL.ID = _data;
          this.MODEL.LOGIN = true;
          PS.CONTROLLER.DIARY.setUser(this.MODEL.ID, this.MODEL.HASH);
          this.VIEW.generateUserArea(
            this.MODEL.ALERT_SUCCESS,
            `ユーザー ${this.MODEL.ID} を登録しました。`
          );
        } else {
          this.VIEW.generateUserArea(
            this.MODEL.ALERT_WARNING,
            `ユーザー ${this.MODEL.ID} は登録済みです`
          );
        }
      },
      error: () => {
        Log.logClassKey(this.NAME, 'ajax signupUser', 'failed');
        this.VIEW.generateUserArea(
          this.MODEL.ALERT_DANGER,
          'ajax通信に失敗しました。',
          false
        );
      }
    });
  }
  
  submitChangePassword() {
    Log.logClassKey(this.NAME, 'Submit', 'Change password');
    
    const oldPassword = $(this.MODEL.USER_PASSWORD_OLD_SELECTOR).val();
    const newPassword = $(this.MODEL.USER_PASSWORD_NEW_SELECTOR).val();
    
    if (this.checkPasswordValidate(oldPassword) == false) {
      return;
    }
    if (this.checkPasswordValidate(newPassword) == false) {
      return;
    }
    
    const oldPasswordHash = SHA256.getHash(oldPassword);
    const newPasswordHash = SHA256.getHash(newPassword);
    
    this.MODEL.HASH = newPasswordHash;
    
    this.VIEW.generateLoading($(this.MODEL.USER_AREA_SELECTOR),'更新中',  `ユーザー ${this.MODEL.ID} のパスワードを更新中`);
    
    $.ajax({
      url: 'ruby/changePassword.rb',
      data: {
        name: this.MODEL.ID,
        oldPassword: oldPasswordHash,
        newPassword: newPasswordHash
      },
      success: (_data) => {
        Log.logClassKey(this.NAME, 'ajax changePassword', 'success');
        if (_data.length > 0) {
          this.VIEW.generateUserArea(
            this.MODEL.ALERT_SUCCESS,
            `ユーザー ${this.MODEL.ID} のパスワードを変更しました。`,
            true,
            true
          );
        } else {
          this.MODEL.HASH = oldPasswordHash;
          this.VIEW.generateUserArea(
            this.MODEL.ALERT_WARNING,
            `ユーザー ${this.MODEL.ID} の現在のパスワードが間違っています。`,
            true,
            true
          );
        }
      },
      error: () => {
        Log.logClassKey(this.NAME, 'ajax changePassword', 'failed');
        this.VIEW.generateUserArea(
          this.MODEL.ALERT_DANGER,
          'ajax通信に失敗しました。',
          false,
          true
        );
      }
    });
  }
}
