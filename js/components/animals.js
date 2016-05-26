var AnimalsApp = (function(){

  var Animals = React.createClass({
    getInitialState: function(){
      
    }
  });


  return {
    init: function(){
      ReactDOM.render(
        <Animals getAnimalsDataURL="" />, document.getElementById('appContainer')
      )
    }
  }

})();
