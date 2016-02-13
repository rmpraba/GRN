/**
 * Created by praba on 2/12/2016.
 */
Polymer({
  is: "physicinsread-page",
  ready:function()
  {

  },
  setState:function(state){
    //alert(state);
    //Setting state for reading the items under current IRN no
    this.$.gs.flowphysicreadService(state);
  }
});
