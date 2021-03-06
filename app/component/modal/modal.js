'use strict';

require('./_modal.scss');

module.exports = {
  template: require('./modal.html'),
  controller: ['$log', ModalController],
  controllerAs: 'modalCtrl',
  bindings: {
    modalInstance: '<',
    resolve: '<',
  },
};

function ModalController($log){
  $log.debug('init modalCtrl');

  this.$onInit = function(){
    this.modalData = this.resolve.imageToggle;
    this.title = this.modalData.title;
    this.category = this.modalData.category;
    this.url = this.modalData.url;
  };

  this.handleClose = function() {
    this.modalInstance.close();
  };

}
