/**
 * Created by praba on 2/13/2016.
 */
//JS page for outwardslip page
Polymer({
  is: "outwardslip-page",
  ready:function()
  {
    //Showing customerinfo page as the initial page in outwardslip page
    localStorage.setItem("curr_sess_saveflag","false");
    if(sessionStorage.getItem("curr_sess_roleflag")=="0")
    {
      this.page="Customer Detail";
    }
  },
  setPage:function(page)
  {
    //Changing page view in Outwardslip page
    this.page=page;
  }
});
