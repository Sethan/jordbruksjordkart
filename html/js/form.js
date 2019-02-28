class AreaFormat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: []
        }
    }
    componentDidMount()
    {
      let self = this;
        fetch("/getinfo?areal_id=0101", {
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

                       {this.state.form.map(member =>
                        <tr key={member.Aar}>
                        <td>{member.Aar} </td>
                        <td>{member.landbruksareal}</td>
                        <td>{member.areal}</td>
                        <td>{member.percent}</td>
                        </tr>
                        )}
                       </tbody>
                   </table>
               </div>
           </div>
         );
   }
}
ReactDOM.render(<AreaFormat/>, window.document.getElementById("Form"));
