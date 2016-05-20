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
      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');

      $.ajax({
          url:'/data/pictures.json',
          type:'GET',
          dataType:'json',
          async: false, //this will not be here in the react app
          success: function(response){
            console.log(response);
            this.setState({picData: response});
          }
      });
    },
    drawPicture: function(){
      var canvas = document.getElementById('colourPicture');
      var ctx = canvas.getContext('2d');

      for(i=0; i<picData.length; i++){
        var picture = picData[i];

        //build picture content
        $('#canvasContainer h3').text(picture.name);
        $('#canvasContainer .desc').text(picture.desc);

        //Level 2
        for(j=0; j<picture.pictureElements.length; j++){
          var pictureElement = picture.pictureElements[j];
          console.log("level 2 element :: " + pictureElement.name);

          ctx.beginPath();
          for (k=0; k < pictureElement.contextItems.length; k++){
            var contextItem = pictureElement.contextItems[k];
            console.log(contextItem.contextPropName);
            console.log(contextItem.contextPropVal);

            /**
             * :: Different types of possible values ::
             * Coords need 2 params passed. So we set as array in JSON and
             * check if value is array before setting context.
             *
             * If something like a stroke colour, we need to set as a property value.
             * e.g. ctx[contextItem.contextPropName] = "#001111";
             *
             * If object method, it's a function and needs to be executed like so:
             * e.g. ctx[contextItem.contextPropName](50, 65);
             **/

            //Check if object is method or property
            if (typeof ctx[contextItem.contextPropName] === "function"){
              //if method, execute function
              ctx[contextItem.contextPropName].apply(ctx, contextItem.contextPropVal);
              //value of param must be an array.
            }
            else{
              ctx[contextItem.contextPropName] = contextItem.contextPropVal;
            }



          }
          ctx.closePath();
        }
      }
    }
    getInitialState: function(){
      return {picData:[]};
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
