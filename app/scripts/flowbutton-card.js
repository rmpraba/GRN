/**
 * Created by praba on 2/12/2016.
 */
Polymer({
  is: "flowbutton-card",
  ready:function()
  {
    if(sessionStorage.getItem("curr_sess_roleflag")=="1")
      this.label='Inward Accept';
    if(sessionStorage.getItem("curr_sess_roleflag")=="2")
      this.label='Physical Inspection';
    else if(sessionStorage.getItem("curr_sess_roleflag")=="3")
      this.label='Quality Inspection';
    else if(sessionStorage.getItem("curr_sess_roleflag")=="4")
      this.label='Confirm purchase';
  },
  click:function(){

    //alert(localStorage.getItem("curr_sess_PONumber")+"   "+localStorage.getItem("curr_sess_POchangeflag"));
    if(sessionStorage.getItem("curr_sess_roleflag")=="1"){
      if(localStorage.getItem("curr_sess_PONumber")==null||localStorage.getItem("curr_sess_POchangeflag")==0)
        alert("Please enter PO Number!");
      else{
        document.querySelector('physicinsitem-card').setToggle();
        this.$.pqs.physicupdateService(sessionStorage.getItem("sess_curr_inwardregno"));
      }
    }
    else
    {
      document.querySelector('physicinsitem-card').setToggle();
      this.$.pqs.physicupdateService(sessionStorage.getItem("sess_curr_inwardregno"));
    }

  }
});
