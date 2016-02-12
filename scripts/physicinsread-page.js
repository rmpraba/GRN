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
    this.$.gs.flowphysicreadService(state);
  }
});
