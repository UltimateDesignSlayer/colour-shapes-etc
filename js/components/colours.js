var ColourApp = (function(){

  var ColoursComponent = React.createClass({
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
      // this runs when component is first created
      // define states/props here
      return {coloursArr: [], currentColour: {}};
    },
    colourSelected: function(colourHex, colourName){
      var currentColourObj = {
        hex: colourHex,
        name: colourName
      };

      this.setState({currentColour: currentColourObj});
    },
    componentDidMount: function(){
      //This fires when the component runs
      this.getColoursJson();
    },
    render: function(){
      var that = this;
      return(
        <div>
          <h3>COLOURS!!</h3>
          <ColourDisplayer currentColour={this.state.currentColour} />
          <Picture />
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
      var colourDisplayStyle = {
        backgroundColor:this.props.currentColour.hex
      };

      if (this.props.currentColour.hex === "#000000"){
        //Make text inside colour displayer white if the BG is black
        colourDisplayStyle.color = '#ffffff';
      }

      return(
        <div className="col-xs-12 colour-display" style={ colourDisplayStyle }>{this.props.currentColour.name}</div>
      )
    }
  });

  var Colour = React.createClass({
    selectColour: function(event){
      console.info(this.props.colourName + ' :: ' + this.props.colourHex);
      this.props.onColourSelect(this.props.colourHex, this.props.colourName); //this prop is a function in ColoursComponent
    },
    render: function(){
      var colourPaletteStyles = {backgroundColor: this.props.colourHex};

      if (this.props.colourHex === "#000000"){
        //Make text inside colour displayer white if the BG is black
        colourPaletteStyles.color = '#ffffff';
      }

      //Inline styles need to be an object.
      return(
        <li className="col-xs-3 col-sm-2 col-md-1 colour-block" onClick={this.selectColour} style={ colourPaletteStyles }>{this.props.colourName} {this.props.colourHex}</li>
      )
    }
  });

  var Picture = React.createClass({
    getPictureCoords: function(){
      var picCanvas = document.getElementById("colourPicture");
      var context = picCanvas.getContext('2d');
      context.lineWidth = 2;

      context.strokeStyle = '#000000';
      context.save();
      context.translate(439, 81);
      context.scale(1, 1);
      context.beginPath();
      context.arc(0, 0, 59, 0, 6.283185307179586, false);
      context.stroke();
      context.closePath();
      context.restore();

      context.strokeStyle = '#000000';
      context.strokeRect(1, 345, 598, 154);
    },
    componentDidMount: function(){
      this.getPictureCoords();
    },
    render: function(){
      return(
        <canvas id="colourPicture"></canvas>
      )
    }
  });

  return {
      init: function(){
        ReactDOM.render(
          <ColoursComponent urlGetColours="/data/colours.json" />,
          document.getElementById('colours')
        )
      }
  }
})();

ColourApp.init();
