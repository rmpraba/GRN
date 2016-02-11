/**
 * Created by praba on 2/11/2016.
 */

//JS page for the inwardslip-page element

Polymer({
  is: "inwardslip-page",
  ready:function()
  {
    /*Flag is setting for repeat save validation*/
    localStorage.setItem("curr_sess_saveflag","false");
    /*Initially when security logged in it enables vehicle info page of the Inward slip page*/
    if(sessionStorage.getItem("loggedrole")=="Security guard")
    {
      this.page="Vehicle Info";
    }
  },
  /*Method used to change the page view for the security inward slip entry either from vehicle page to item page or vice versa*/
  setPage:function(page)
  {
    this.page=page;
  }
});
