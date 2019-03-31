class TopFormat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: [],
            aar:2017
        }
    }

    getState()
    {
      return this.state;
    }

    componentDidMount()
    {
      let self = this;
      var adress ="/gettop?aar="+this.state.aar;
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
               <div className="panel panel-default p50 uth-panel">
                   <table className="table table-hover">
                       <thead>
                           <tr>
                               <th>Navn</th>
                               <th>Prosent</th>
                               <th>{this.state.aar}</th>
                           </tr>
                       </thead>
                       <tbody>

                       {this.state.form.map(area =>
                        <tr key={area.navn}>
                        <td>{area.navn} </td>
                        <td>{area.percent}%</td>
                        </tr>
                        )}
                       </tbody>
                   </table>
               </div>
           </div>
         );
   }
}
const topformat = ReactDOM.render(<TopFormat/>, window.document.getElementById("TopList"));
