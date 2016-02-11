/**
 * Created by praba on 2/10/2016.
 */

//JS file for login-card
Polymer({
  is: "login-card",
  ready:function()
  {

  },
  //Response received after authenticating user,if it is valid user navigating to indexhome.html page otherwise it will give alert message to the user
  Response:function(e){
    var logflag=e.detail.response.returnval;
    if(logflag!="invalid")
    {
      localStorage.setItem("curr_sess_wardflag","0");
      sessionStorage.setItem("loggeduser",this.username);
      sessionStorage.setItem("loggedrole",logflag);
      window.location.href="elements/indexhome.html";
    }
    else
      alert("Invalid user!!");
  },
  //It is a method which receives Global Url from url.json file
  setUrl:function(url){
    this.url=url+"login-card";
    //alert(this.url);
  },
  //Function which invokes for keyboard enter of the login card
  FnLoginSubmit:function()
  {

    this.$.Form_Login.submit();
  }
});