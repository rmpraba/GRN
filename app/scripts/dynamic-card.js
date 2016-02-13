/**
 * Created by praba on 2/11/2016.
 */

/*JS file for dynamic menu card of securities inward slip page*/
Polymer({is:"dynamic-card",
  ready:function(){
    /*It loads the security menu json configurable file*/
    if(sessionStorage.getItem("curr_sess_roleflag")=="0"){
      if(localStorage.getItem("curr_sess_wardflag")!="1")
      this.url="../../config/secmenu.json";
    if(localStorage.getItem("curr_sess_wardflag")=="1")
        this.url="../../config/outwardmenu.json";
    }
    /*It loads the flow json configurable file*/
    //if(sessionStorage.getItem('loggedrole')=='Stores manager'||sessionStorage.getItem('loggedrole')=='Production manager'||sessionStorage.getItem('loggedrole')=='Quality manager'||sessionStorage.getItem('loggedrole')=='Purchase manager')
    if(sessionStorage.getItem("curr_sess_roleflag")!="0")
    {
      this.url="menu.json";
    }
  },
  /*which receives the menu response of security menu json file,bind it to the dynamic card*/
  menureadResponse:function(e){
    this.menus=e.detail.response;
   }

});
