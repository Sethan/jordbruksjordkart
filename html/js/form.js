

class AreaFormat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: [],
            areal_id:101
        }
    }
    idManager()
    {
      this.state.areal_id=104;
    }

    componentDidMount()
    {
      let self = this;
      var adress;
      if(this.state.areal_id<100)
      {
        adress ="/getinfo?area_id="+this.state.areal_id;
      }
      else {
          adress ="/getinfo?areal_id="+this.state.areal_id;
      }
        fetch(adress, {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({form: data});
        }).catch(err => {
        console.log('caught it!',err);
        })
    }
    render() {
           return (
           <div className="container">
               <div className="panel panel-default p50 uth-panel">
                   <table className="table table-hover">
                       <thead>
                           <tr>
                               <th>År</th>
                               <th>landbruksareal</th>
                               <th>Totalareal</th>
                               <th>Prosent</th>
                           </tr>
                       </thead>
                       <tbody>

                       {this.state.form.map(area =>
                        <tr key={area.aar}>
                        <td>{area.aar} </td>
                        <td>{area.landbruksareal}</td>
                        <td>{area.areal}</td>
                        <td>{area.percent}</td>
                        </tr>
                        )}
                       </tbody>
                   </table>
               </div>
           </div>
         );
   }
}
const areaformat = ReactDOM.render(<AreaFormat/>, window.document.getElementById("Form"));
