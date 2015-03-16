var DateComponents = function () {

    var handleDatePickers = function () {
        if (jQuery().datepicker) {
            $('.date-picker').datepicker({
                rtl : App.isRTL()
            });
        }
    }
    
    return {
	    init: function () {
	        handleDatePickers();
	    }
    };
    
}();