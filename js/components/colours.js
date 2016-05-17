var ColourComponent = (function(){

  var ColoursApp = React.createClass({
    getColoursJson: function(){
      $.ajax({
          url: this.props.urlGetColours,
          dataType: 'json',
          type: 'GET',
          cache: false,
          success: function(data) {
            console.log('Get colours JSON', data);
            console.log(typeof data);
            this.setState({coloursArr: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.urlGetColours, status, err.toString());
          }.bind(this)
        });
    },
    getInitialState: function(){
      //this runs when component is first created
      return {coloursArr: []};
    },
    componentDidMount: function(){
      //This fires when the component runs
      console.log('componentDidMount');
      this.getColoursJson();
    },
    render: function(){

      return(
        <div>
          <h3>COLOURS GO HERE!!</h3>
          <p>{this.props.urlGetColours}</p>
          <div className="row">
            <ul className="col-xs-12 colour-list">       
              {this.state.coloursArr.map(function(colour){
                return (
                  <Colour key={colour.id} colourName={colour.name} colourHex={colour.hex} />
                );
              })}
            </ul>
          </div>
        </div>
      )
    }
  });

  var Colour = React.createClass({
    render: function(){
      //Inline styles need to be an object.
      return(
        <li className="col-xs-3 col-sm-2 col-md-1 colour-block" style={ {backgroundColor: this.props.colourHex} }>{this.props.colourName} {this.props.colourHex}</li>
      )
    }
  });

  return {
      init: function(){
        ReactDOM.render(
          <ColoursApp urlGetColours="/data/colours.json" />,
          document.getElementById('colours')
        )
      }
  }
})();

ColourComponent.init();
