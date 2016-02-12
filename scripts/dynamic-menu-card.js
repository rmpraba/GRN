/**
 * Created by praba on 2/11/2016.
 */

(function() {
  var value="null";
  var menus=[];
  Polymer({is:"dynamic-menu-card",
    ready:function(){
    },
    /*Function which bind the selected menu value to the Inwardslip-page iron pages,accordingly which render the page to the user*/
    FnSelectMenu:function(){
      /*DOM styles for selected menu  in tab*/
      if(value!="null")
      {
      document.getElementById(value).style.border = "none";
      }
      document.getElementById(this.menulabel).style.border="groove";
      document.getElementById(this.menulabel).style.borderRadius="4px";
      document.getElementById(this.menulabel).style.borderColor="#e5efe2";
      document.getElementById(this.menulabel).style.borderBottom="none";
      document.getElementById(this.menulabel).style.borderBottomWidth="5px";
      value=this.menulabel;
      if(sessionStorage.getItem("curr_sess_roleflag")=="0"&&value=="Vehicle Info")
        document.querySelector("inwardslip-page").setPage(this.menulabel);
      else if(sessionStorage.getItem("curr_sess_roleflag")=="0"&&value=="Item Detail"){
        document.querySelector("vehicle-page").FnVehicleInfoSubmit();
      }
    }
  });
})();
