
class TopFormat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: [],
            form2: [],
            aar: [1969,2018]
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
                               <th>Navn</th>
                               <th>Økt mest</th>
                               <th>{this.state.aar[0]}-{this.state.aar[1]}</th>
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
                       <thead>
                           <tr>
                               <th></th>
                               <th>Minket mest</th>
                               <th></th>
                           </tr>
                       </thead>
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
