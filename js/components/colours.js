var ColourComponent = (function(){

  var ColoursApp = React.createClass({
    getColoursJson: function(){
      $.ajax({
          url: this.props.urlGetColours,
          dataType: 'json',
          type: 'GET',
          cache: false,
          success: function(data) {
            this.setState({coloursArr: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.urlGetColours, status, err.toString());
          }.bind(this)
        });
    },
    getInitialState: function(){
      //this runs when component is first created
      return {coloursArr: [], currentColourHex: '', currentColourName: ''};
    },
    colourSelected: function(colourHex, colourName){
      console.log(colourHex);
      this.setState({currentColourHex: colourHex, currentColourName: colourName});
    },
    componentDidMount: function(){
      //This fires when the component runs
      console.log('componentDidMount');
      this.getColoursJson();
    },
    render: function(){
      var that = this;
      return(
        <div>
          <h3>COLOURS!!</h3>
          <ColourDisplayer colourHex={this.state.currentColourHex} colourName={this.state.currentColourName} />
          <div className="row">
            <ul className="col-xs-12 colour-list">
              {this.state.coloursArr.map(function(colour){
                return (
                  <Colour key={colour.id} onColourSelect={that.colourSelected} colourName={colour.name} colourHex={colour.hex} />
                );
              })}
            </ul>
          </div>
        </div>
      )
    }
  });

  var ColourDisplayer = React.createClass({
    render: function(){
      return(
        <div className="col-xs-12 colour-display" style={ {backgroundColor:this.props.colourHex} }>{this.props.colourName}</div>
      )
    }
  });

  var Colour = React.createClass({
    selectColour: function(event){
      console.info(this.props.colourName + ' :: ' + this.props.colourHex);
      this.props.onColourSelect(this.props.colourHex, this.props.colourName); //this prop is a function in ColoursApp
    },
    render: function(){
      //Inline styles need to be an object.
      return(
        <li className="col-xs-3 col-sm-2 col-md-1 colour-block" onClick={this.selectColour} style={ {backgroundColor: this.props.colourHex} }>{this.props.colourName} {this.props.colourHex}</li>
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
