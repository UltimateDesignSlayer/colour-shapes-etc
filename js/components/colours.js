var ColourComponent = (function(){

  var Colours = React.createClass({
    render: function(){
      return(
        <div>
          <h3> COLOURS GO HERE!! {this.props.urlGetColours} </h3>
        </div>
      )
    }
  });

  return {
      init: function(){
        console.log('z');
        // ReactDOM.render(
        //   <Colours urlGetColours="/api/comments" />,
        //   document.getElementById('colours')
        // )
      }
  }
})();

ColourComponent.init();


/**
 * Will need to execute this here, but get the data from jsx file?
 */
