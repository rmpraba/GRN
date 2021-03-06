/**
 * Created by praba on 2/12/2016.
 */
//JS file for physicinsitem-card
(function() {
  var arr=[];
  var id="true";
  var clrid="true";
  var regno="";
  var n=1;
  Polymer({is:"physicinsitem-card",
    ready:function(){
      this.icons="icons:arrow-drop-down";
    },
    FnExpandItemcard:function(){
      var n=1;
      var x=-4;
      //Storing expanded card IRN number in sessionstorage
      sessionStorage.setItem("sess_curr_inwardregno",this.inwardregno);
      //Sending IRN number to service component to fetch the expanded card info
      this.$.ps.physicqualifyreadService(this.inwardregno);

      var all=document.querySelectorAll('.expandcard');
      //Expand card toggle logic
      if(id=="true")
      {
        document.querySelector('my-app').setVisible("true");
        id= document.querySelector("#"+this.inwardregno);
        id.toggle();
      }
      else
      {
        if(id!=document.querySelector("#"+this.inwardregno))
        {
          id.opened=false;
        }
        document.querySelector('my-app').setVisible("false");
        id= document.querySelector("#"+this.inwardregno);
        id.toggle();
      }
      //Logic for closing all cards and showing the currently expand card
      if(clrid=="true")
      {
        localStorage.setItem("curr_sess_POchangeflag","0");
        for(var i=0;i<all.length;i++){
          document.querySelector('my-app').setVisible("true");
          if(all[i].id==document.querySelector("#card"+this.inwardregno).id){
            if(i!=0){
              all[i].style.marginTop=((i*(x))-i)+"%";
            }
            if(i>10){
              all[i].style.marginTop=((i*(x+(-.5)))-i)+"%";
            }
            all[i].style.visibility='visible';
          }
          else
            all[i].style.visibility='hidden';
        }
        clrid= document.querySelector("#card"+this.inwardregno);
      }
      else
      {
        if(clrid!=document.querySelector("#card"+this.inwardregno))
        {
          localStorage.setItem("curr_sess_POchangeflag","0");
          document.querySelector('my-app').setVisible("true");
          for(var i=0;i<all.length;i++){
            if(all[i].id==document.querySelector("#card"+this.inwardregno).id){
              all[i].style.visibility='visible';
            }
            else
              all[i].style.visibility='hidden';
          }
          clrid= document.querySelector("#card"+this.inwardregno);
        }
        else
        {
          document.querySelector('my-app').setVisible("flase");
          for(var i=0;i<all.length;i++){
            if(i!=0)
              all[i].style.marginTop=(n)+"%";
            all[i].style.visibility='visible';
          }
          clrid="true";
        }
      }
    },
    setToggle:function()
    {
      var toggleid=sessionStorage.getItem("sess_curr_inwardregno");
      id= document.querySelector("#"+toggleid);
      id.opened=false;
    }
  });
})();
