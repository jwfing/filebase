var FormComponents = function () {

    var handleSelect2 = function () {
        $('.select2').select2({
            allowClear: true
        });
    }
    
    
    return {
        
    init: function () {
        handleSelect2();
    }
        
    };
    
}();