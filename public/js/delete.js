/**
 * Created by Steven on 12/2/2016.
 */

function deleteThis(id){
    console.log("Deleting");
    if(confirm("Are you sure you want to delete this post?")){
        document.getElementById(id).submit();
    }
}
