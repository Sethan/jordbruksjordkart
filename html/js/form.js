class AreaFormat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: [],
            areal_id:"Norge"
        }
    }

    getState()
    {
      return this.state;
    }

    componentDidMount()
    {
      let self = this;
      var adress ="/getinfo?area_id="+this.state.areal_id;
        fetch(adress, {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({form: data});
            updateChart(self.getState());
        }).catch(err => {
        console.log('caught it!',err);
      });
    }
    render() {
           return (
           <div className="container">
               <div className="formcontainer">
                   <table className="table table-hover">
                       <thead>
                          <tr>
                            <th>{this.state.areal_id}</th>
                          </tr>
                           <tr>
                               <th>År</th>
                               <th>Landbruksareal</th>
                               <th>Prosent</th>
                           </tr>
                       </thead>
                       <tbody>

                       {this.state.form.map(area =>
                        <tr key={area.aar}>
                        <td>{area.aar} </td>
                        <td>{area.landbruksareal}</td>
                        <td>{area.percent}%</td>
                        </tr>
                        )}
                       </tbody>
                   </table>
                   {checkChange(this.state) &&
                     <p>Dette området har endret areal</p>
                   }
               </div>
           </div>
         );
   }
}
const areaformat = ReactDOM.render(<AreaFormat/>, window.document.getElementById("Form"));

function checkChange(object)
{
  if(object.areal_id.toUpperCase()==="NORGE")
  {
    return false;
  }
  object=object.form;
  if(object[0]!==undefined)
  {
      if(object[0].areal-object[object.length-1].areal)
      {
        return true;
      }
  }
  return false;
}
