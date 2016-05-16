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
          <ColourList coloursArr={this.state.coloursArr} testData='Oi' />
        </div>
      )
    }
  });

  var ColourList = React.createClass({
    render: function(){
      var ColourNode = this.props.coloursArr.map(function(colour){
        return(
          <Colour colourName={colour.name} colourHex={colour.hex} key={colour.id} />
        );
      });
      console.log(this.props.coloursArr[0], this.props.coloursArr[1]);

      return(
        <ul className="colour-list">
          <li>{ColourNode}</li>
        </ul>
      )
    }
  });

  var Colour = React.createClass({
    render: function(){
      return(
        <li>{this.props.colourName}</li>
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
