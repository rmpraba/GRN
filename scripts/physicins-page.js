/**
 * Created by praba on 2/12/2016.
 */
//JS file for physicins page
Polymer({
  is: "physicins-page",
  ready:function()
  {
    //To initially show current logged role state items requesting service component to make req to the server
    this.$.gs.physicreadService();
  }
});
