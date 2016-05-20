var Master = (function(){

  /**
   * TODO::::
   * Call in colour component when in colour section.
   *
   * Call in colour component + the component of the section your in. This is
   * cos we're going to use colours in them.
   *
   */

  var bindEvents = function(){
    $(document).ready(function(){
      $('.activity-selection').on('click', 'a', function(){
        $('.home-container').hide();
      });
    });
  };

  return {
    init: function(){
      bindEvents();
    }
  };
})();

Master.init();
