/**
 * Created by praba on 2/10/2016.
 */
(function() {
  Polymer({
    is: "webcomponent-service",
    ready:function()
    {
    },
    callWebcomponentService:function(){
      this.$.webcomponentreadajax.generateRequest();
    },
    webcomponentreadResponse:function(e) {
      var arr = e.detail.response;
        document.querySelector('login-card').setUrl(arr[0].url);

      //Binding labels to login-card
      for (var i = 0; i < arr[1].Label.length; i++) {
        document.querySelector('login-card').user_name = arr[1].Label[i].username;
        document.querySelector('login-card').pass_word = arr[1].Label[i].password;
      }
      for (var i = 0; i < arr[2].ErrorValue.length; i++) {
        document.querySelector('login-card').username_error = arr[2].ErrorValue[i].username;
        document.querySelector('login-card').password_error = arr[2].ErrorValue[i].password;
      }
    },
    /*Receives request after successfull validation of user login and invoke ajax for retrive all roles*/
    roleconfigreadService:function(){
      this.$.roleconfigreadajax.generateRequest();
    },
    /*Role response received*/
    roleconfigreadResponse:function(e){
      var roleconfig=e.detail.response;
      for(var i=0;i<roleconfig[0].role.length;i++){
        /*Checking logged role with role config json if exists returns the flag for the corresponding role then it will navigate to the index home(my-app js) page*/
        if(sessionStorage.getItem("loggedrole")==roleconfig[0].role[i].rolename){
          sessionStorage.setItem("curr_sess_roleflag",roleconfig[0].role[i].RoleFlag);
          if(sessionStorage.getItem("curr_sess_roleflag")!=null)
          window.location.href="../elements/indexhome.html";
        }
      }
    }
  });
})();
