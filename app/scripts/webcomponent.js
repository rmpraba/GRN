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
    }
  });
})();
