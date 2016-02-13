/**
 * Created by praba on 2/13/2016.
 */
Polymer({is:"drawermenu-card",
  ready:function(){
  },
  selectedMenu:function(e){
    if(sessionStorage.getItem("loggedrole")=="Security guard"){
      if(e.target.id=="Inwardslip Register"){

        localStorage.setItem("curr_sess_wardflag","0");
        window.location.href="../elements/indexhome.html";
        //document.querySelector('my-app').setPage("inwardslip-page");
      }
      if(e.target.id=="Outgoing Items"){

        localStorage.setItem("curr_sess_wardflag","1");
        window.location.href="../elements/indexhome.html";
        //document.querySelector('my-app').setPage("outwardslip-page");
      }
    }
    else if(sessionStorage.getItem("loggedrole")=="Stores manager"||sessionStorage.getItem("loggedrole")=="Production manager"||sessionStorage.getItem("loggedrole")=="Quality manager"||sessionStorage.getItem("loggedrole")=="Purchase manager")
      document.querySelector('my-app').setPage("home-page");
  }
});
