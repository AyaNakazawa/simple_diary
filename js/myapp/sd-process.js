
class SDProcess extends CommonProcess {
  constructor(
    _initSetting = {
      NAME: `${Project.NAME} Process`
    }
  ) {
    super(_initSetting);
    
    this.run();
  }
  
  run() {
    this.initContent();
    SDProcess.initPopover();
    this.initController();
    this.show();
  }
  
  initContent() {
    $('main').empty();
  }
  
  static initPopover() {
  }
  
  initController() {
    this.CONTROLLER = {
      
    };
    
    this.CONTROLLER.SWITCH = {
      
    };
    
    this.CONTROLLER.SCROLL = {
      
    };
  }
  
  show() {
    $('main').slideDown(300);
    Log.log();
    Log.logClass(this.NAME, 'Start');
  }
}
