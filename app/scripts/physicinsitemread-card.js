/**
 * Created by praba on 2/12/2016.
 */
(function() {

  Polymer({is:"physicinsitemread-card",
    ready:function(){
      //Calling service component to fetch the Item info
      this.$.ps.physicqualifyreadService(this.inwardregno);
    }
  });
})();
