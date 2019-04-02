class TopFormat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: [],
            form2: [],
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
        fetch("/gettop?aar="+this.state.aar, {
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
      fetch("/getbot?aar="+this.state.aar, {
          method: 'GET'
      }).then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      }).then(function(data) {
          self.setState({form2: data});
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
                        <tr key={area.id}>
                        <td>{area.navn} </td>
                        <td>{area.percent}%</td>
                        </tr>
                        )}
                       </tbody>
                       <tbody>

                       {this.state.form2.map(area =>
                        <tr key={area.id}>
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
