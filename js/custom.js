$(document).ready(function(){
  jQuery('#tabs a').on('click', function(e){
      e.preventDefault();
      var step = jQuery(this).data('step');

      jQuery('#tabs a').removeClass('active');
      jQuery('div[id^="step"]').removeClass('active');

      jQuery('#tabs a[data-step="' + step + '"]').addClass('active');
      jQuery('#step-' + step).addClass('active');
    });
})
