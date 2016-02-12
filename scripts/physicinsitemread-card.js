/**
 * Created by praba on 2/12/2016.
 */
(function() {

  Polymer({is:"physicinsitemread-card",
    ready:function(){
      this.$.ps.physicqualifyreadService(this.inwardregno);
    }
  });
})();
