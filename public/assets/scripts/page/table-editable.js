var TableEditable = function () {

    return {

        //main function to initiate the module
        init: function (db,url,index) {

            var oTable = $('#sample_editable_1').dataTable({
                "aLengthMenu": [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"] // change per page values here
                ],
                // set the initial value
                "iDisplayLength": 15,
                "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
                "sPaginationType": "bootstrap",
                "oLanguage": {
                    "sLengthMenu": "_MENU_ 选择几列表示",
                    "sSearch": "検索:",
                    "sInfo": "_TOTAL_ 件中 _START_ 件目 〜 _END_ 件目",
                    "oPaginate": {
                        "sPrevious": "Prev",
                        "sNext": "Next"
                    }
                },
                "bSort":false,
                "bFilter":false,
                "bPaginate":false,
                "bInfo":false,
                "aoColumnDefs": [
                	{
	                    'bSortable': false,
	                    'aTargets': [index]
                	}
                ],
                "aaSorting": [
					[ 0, "desc" ]
				],
            });
            $('#sample_editable_1 a.edit').live('click', function (e) {
                e.preventDefault();
 					 var nRow = $(this).parents('tr')[0];
					 var aData = oTable.fnGetData(nRow);
					 
                    window.location = url + "?id=" + aData[0];
             });


            $('#sample_editable_1 a.delete').live('click', function (e) {
                e.preventDefault();

                if (confirm("Are you sure to delete this row ?") == false) {
                    return;
                }

				var nRow = $(this).parents('tr')[0];
				var aData = oTable.fnGetData(nRow);

                //  alert(nRow[0].cells[0].innerText);
                var cclass = AV.Object.extend(db);
                var query = new AV.Query(cclass);
                query.get(aData[0], {
                    success: function (obj) {
		        var originObj = obj;
                        obj.destroy({
                            success: function (obj) {
			        if (db == "video") {
				    var videoFile = originObj.get("video");
				    var coverFile = originObj.get("image");
				    if (videoFile) {
					videoFile.destroy();
					console.dir("delete video file");
				    }
				    if (coverFile) {
					coverFile.destroy();
					console.dir("delete cover file");
				    }
				} else if (db == "_User") {
				    var iFile = originObj.get("image");
				    if (iFile) {
					iFile.destroy();
				    }
				} else if (db == "channel") {
				    var iphoneImage = originObj.get("image_iphone");
				    var ipadImage = originObj.get("image_ipad_large");
				    if (iphoneImage) {
					    iphoneImage.destroy();
				    }
				    if (ipadImage) {
					    ipadImage.destroy();
				    }
				}
                                oTable.fnDeleteRow(nRow);
                            },error: function (obj, error) {
								alert("Error: " + error.code + " " + error.message);
                            }
                        });
                    },error: function (object, error) {
						alert("Error: " + error.code + " " + error.message);
                    }
                });
            });
        }
    };

}();

