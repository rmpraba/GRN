/**
 * Created by praba on 2/10/2016.
 */
(function() {
  Polymer({
    is: "webcomponent-service",
    ready:function()
    {
      //localStorage.setItem("curr_sess_showpage","login-card");
    },
    callWebcomponentService:function(){
      //alert("calling....");
      this.$.webcomponentreadajax.generateRequest();
    },
    webcomponentreadResponse:function(e) {
      this.current_page=localStorage.getItem("curr_sess_showpage");
      //alert(this.current_page);
      var arr = e.detail.response;
      //alert(arr.length);
      var labelvalue=[];
      var errorlabelvalue=[];
      //Binding labels to login-card
      for(var i=1;i<arr.length;i++) {
        //alert(arr[i].Page[0].page[0]);
        if ((arr[i].Page[0].page[0]) == this.current_page) {
          labelvalue = arr[i].Page[1].Label;
          /*Binding Labels and error message to the respective card*/
          document.querySelector(arr[i].Page[0].page[1]).label = labelvalue;
        }
      }
    },
    /*Receives request after successfull validation of user login and invoke ajax for retrive all roles*/
    roleconfigreadService:function(){
      this.$.roleconfigreadajax.generateRequest();
    },
    /*Role response received*/
    roleconfigreadResponse:function(e){
      var roleconfig=e.detail.response;
      //alert(JSON.stringify(roleconfig));
      for(var i=0;i<roleconfig[0].role.length;i++){
        /*Checking logged role with role config json if exists returns the flag for the corresponding role then it will navigate to the index home(my-app js) page*/
        if(sessionStorage.getItem("loggedrole")==roleconfig[0].role[i].rolename){
          sessionStorage.setItem("curr_sess_roleflag",roleconfig[0].role[i].RoleFlag);
          localStorage.setItem("curr_sess_currflowstatus",roleconfig[0].role[i].status);
          localStorage.setItem("curr_sess_currflownewstatus",roleconfig[0].role[i].newstatus);
          localStorage.setItem("curr_sess_currflowupdatestatus",roleconfig[0].role[i].updatestatus);
          //alert(roleconfig[0].role[i].RoleFlag+" "+roleconfig[0].role[i].status+" "+roleconfig[0].role[i].newtatus+" "+roleconfig[0].role[i].updatetatus);
          if(sessionStorage.getItem("curr_sess_roleflag")!=null)
          window.location.href="../elements/indexhome.html";
        }
      }
    }
  });
})();
