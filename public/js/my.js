function deleteWithId(tableName,id,sessionVal){
    swal({
        title:'Are you sure?',
        text: "You will not be able to recover this imaginary file!",
        type:'warning',
        showCancelButton:true,
        confirmButtonColor:'#DD6B55',
        confirmButtonText:'Yes, delete it!',
        cancelButtonText:'No, cancel please',
        closeOnConfirm:false,
        closeOnCancel:true
    },function(confirm){
        if (confirm===false){return false;}
        if(confirm){
            $.ajax({
                url:'action/deleteWith_id.php',
                type:'POST',
                data:{tableName:tableName,id:id,sessionVal:sessionVal},
                beforeSend: function(){
                    swal.disableButtons();
                },
                success:function(data){
                    var data=JSON.parse(data);
                    if(data.status){
                        swal({
                            title:'Delete Successfully',
                            text: "Your imaginary file has been deleted!",
                            type:'success',
                            html:true
                        });
                        $('[trId='+id+']').hide();
                    }else{
                        swal({
                            title:'Delete Cancelled',
                            text:'Your imaginary file is safe!',
                            type:'error',
                            html:true
                        });
                    }
                }
            });
        }

    });
}
