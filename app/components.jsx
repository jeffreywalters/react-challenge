

const { OverlayTrigger, Popover } = ReactBootstrap;
//const { createStore } = Redux;
const { createStore, combineReducers } = Redux;


var requests =	[	
    {"id":1, "title":"Request from Nancy","updated_at":"2015-08-15 12:27:01 -0600","created_at":"2015-08-12 08:27:01 -0600","status":"Denied"},
    {"id":2, "title":"Request from David","updated_at":"2015-07-22 11:27:01 -0600","created_at":"2015-07-15 12:27:01 -0600","status":"Approved"},
    {"id":3,"title":"Request from Matt","updated_at":"2015-07-22 11:27:01 -0600","created_at":"2015-06-15 13:27:01 -0600","status":"Pending"},
    {"id":4,"title":"Request from Perry","updated_at":"2015-07-15 13:27:01 -0600","created_at":"2015-07-14 14:27:01 -0600","status":"Pending"},
    {"id":5,"title":"Request from Harrison","updated_at":"2015-08-22 11:27:01 -0600","created_at":"2015-07-29 15:27:01 -0600","status":"Approved"},
    {"id":6,"title":"Request from Josh","updated_at":"2015-07-29 14:27:01 -0600","created_at":"2015-07-15 10:27:01 -0600","status":"Denied"},
    {"id":7,"title":"Request from Michael","updated_at":"2015-06-15 12:27:01 -0600","created_at":"2015-06-13 18:27:01 -0600","status":"Denied"},
    {"id":8,"title":"Request from AJ","updated_at":"2015-09-22 11:10:01 -0600","created_at":"2015-07-15 11:27:01 -0600","status":"Approved"},
    {"id":9,"title":"Request from Jane","updated_at":"2015-09-13 11:18:01 -0600","created_at":"2015-09-10 06:27:01 -0600","status":"Approved"},
    {"id":10,"title":"Request from Jizhen","updated_at":"2015-05-12 08:27:01 -0600","created_at":"2015-04-15 06:27:01 -0600","status":"Pending"},
    {"id":11,"title":"Request from Pardeep","updated_at":"2015-07-28 09:27:01 -0600","created_at":"2015-07-17 05:27:01 -0600","status":"Approved"},
    {"id":12,"title":"Request from Ale","updated_at":"2015-07-22 10:27:01 -0600","created_at":"2015-07-18 15:27:01 -0600","status":"Pending"},
    {"id":13,"title":"Request from Christy","updated_at":"2015-04-22 19:27:01 -0600","created_at":"2015-03-15 16:27:01 -0600","status":"Pending"},
    {"id":14,"title":"Request from Surjadeep","updated_at":"2015-07-01 11:27:01 -0600","created_at":"2015-06-29 17:27:01 -0600","status":"Approved"},
    {"id":15,"title":"Request from Vasanth","updated_at":"2015-07-02 11:27:01 -0600","created_at":"2015-07-01 18:27:01 -0600","status":"Approved"},
    {"id":16,"title":"Request from Moshe","updated_at":"2015-01-22 16:27:01 -0600","created_at":"2014-12-25 11:27:01 -0600","status":"Denied"},
    {"id":17,"title":"Request from Jim","updated_at":"2015-10-22 17:27:01 -0600","created_at":"2015-10-15 13:27:01 -0600","status":"Approved"},
    {"id":18,"title":"Request from Dileep","updated_at":"2015-08-18 18:27:01 -0600","created_at":"2015-07-11 12:27:01 -0600","status":"Denied"},
    {"id":19,"title":"Request from Aaron","updated_at":"2015-06-22 19:27:01 -0600","created_at":"2015-05-28 16:27:01 -0600","status":"Approved"},
    {"id":20,"title":"Request from Vijay","updated_at":"2015-02-14 08:27:01 -0600","created_at":"2015-01-02 12:27:01 -0600","status":"Approved"}
];


const statusFilter = (state = "SHOW_ALL", action) => {
	switch (action.type){
		case ("SET_STATUS_FILTER"):
			return action.filter;
		default:
			return state;
	}
};


const requestsReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_REQUEST':
			return [
				...state,
				reqReducer(undefined, action)
			];
		case 'REMOVE_REQUEST':
			var index = state.findIndex( rqst => rqst.id === +action.id);
			return [
				...state.slice(0, index),
				...state.slice(index + 1)
			];
		case 'CHANGE_STATUS':
			return state.map( st => {return reqReducer(st, action);} );
		default:
			return state
	}
};

const reqReducer = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_REQUEST':
			return {
				id: action.id,
				title: action.title,
				updated_at: action.updated_at,
				created_at: action.created_at,
				status: action.status
			};
		case 'CHANGE_STATUS':
			if (+state.id !== +action.id) return state;
			return { ...state, status: action.status, updated_at: action.updated_at };
		default: 
			return state;
	}
};


const getFilteredRequests = (requests, status) => {
	switch ( status ){
		case "All Status":
			return requests;
		case "Approved":
			return requests.filter( request => request.status === "Approved" );
		case "Pending":
			return requests.filter( request => request.status === "Pending" );
		case "Denied":
			return requests.filter( request => request.status === "Denied" );
		default:
			return requests;
	}
};


const requestApp = combineReducers({
	requestsReducer: requestsReducer,
	statusFilter: statusFilter
});

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const reduxStore = createStore(requestApp);


requests.map( request => {
	/*console.info({ type:'ADD_REQUEST', ...request });
	let action = Object.assign({}, request, { type:'ADD_REQUEST'});
	console.info(action);
	const actn = {
				id: request.id,
				title: request.title,
				updated_at: request.updated_at,
				created_at: request.created_at,
				status: request.status,
				type:'ADD_REQUEST'
			};*/
	reduxStore.dispatch({ type:'ADD_REQUEST', ...request });
});

//console.info(reduxStore.getState().requestsReducer);


const RequestFilter = React.createClass({
	propTypes: { filterchange: React.PropTypes.func.isRequired },
	
	render: function() {
    	//filter select list
    	const statusList = [
    		"All Status", 
			"Approved",
			"Pending",
			"Denied"
		];
		return (
        	<div className="well">
        		Filter By Status:&nbsp;&nbsp;
        		<select name="request_filter" defaultValue="All Status" onChange={this.props.filterchange}>
        		{statusList.map( (type, i) => <option key={i} value={type}>{type}</option>)}
        		</select>
        	</div>
        );
	}
});


class RequestTable extends React.Component {
 
 	//moved
	//static propTypes = {
	//	requests: React.PropTypes.array.isRequired
	//};
	
	//use for date sort
	_compareDates(a,b) {
		if (a.updated_at > b.updated_at) return -1;
		if (a.updated_at < b.updated_at) return 1;
		return 0;
	}
	
    render(){
    	
		//sort dates
		const requests_sorted = this.props.requests.sort(this._compareDates);
		const requests_filtered = getFilteredRequests(requests_sorted, this.props.status);
		
        return(
        	<div>
        	<RequestFilter filterchange={this._handleFilterChange.bind(this)} />
        	<table className="table table-condensed">
        		<thead>
        		<tr>
					<th>Title</th>
					<th>Status</th>
					<th>Updated</th>
					<th>Created</th>
					<th>Delete</th>
        		</tr>
        		</thead>
        		<tbody>
        		{requests_filtered.map( (request) => {
					return (
					<tr key={request.id} data-requestkey={request.id} className={this._getRowColor(request.status)}>
						<td>{request.title}</td>
						<td>
						<OverlayTrigger ref="trigger" trigger="click" rootClose={true}  placement="right" overlay={this._getPopover(request.id, request.status)}>
						<a href="javascript:void(0)">{request.status}</a>
						</OverlayTrigger>
						</td>
						<td>{this._formatDate(request.updated_at)}</td>
						<td>{this._formatDate(request.created_at)}</td>
						<td><a href="javascript:void(0)" onClick={this._handleDeleteClick.bind(this)}>Delete</a></td>
					</tr>
					);
        		})}
        		</tbody>
        	</table>
        	</div>
        );
    }
    
    
    _getRowColor(status){
		if (status == "Approved"){ return 'success'; }
		if (status == "Denied"){ return 'danger'; }
		return '';
    }
    
    
    _formatDate(str){
    	//let fixdate = str.substring(0,19) + str.substring(20);
    	//console.log(fixdate);
    	//return moment.utc(fixdate).format('YYYY-MM-DD');
    	return moment(str, "YYYY-MM-DD HH:mm:SS Z").utc().format('YYYY-MM-DD');
    	//return moment_obj.format('YYYY-MM-DD');
    }
    
    
    _getPopover(requestid, status){
    	let statuses = [ 
			"Approved",
			"Pending",
			"Denied"
    	];
		statuses = statuses.filter( stat => stat != status );
		//console.log(status);
    	return (
    	  <Popover id="popover-positioned-right">
    	  {statuses.map( (status, i) => {
    	  	return (
				<div key={i}><a onClick={this._handleStatusClick.bind(this)} data-id={requestid} data-status={status}>{status}</a></div>
			);
    	  })}
		  </Popover>
    	);
    }
    
    _handleStatusClick(e){
    	let elm = e.target,
    		id = elm.getAttribute('data-id'),
    		newstatus = elm.getAttribute('data-status');
    	//var trigger = this.refs.trigger;
        //trigger.hide();
    	//console.info("trigger",trigger);
        //trigger.setState({
        //    isOverlayShown: false,
        //    show: false
        //});
		reduxStore.dispatch({
				id: id,
				status: newstatus,
				updated_at: moment.utc().format('YYYY-MM-DD HH:mm:SS Z'),
				type: 'CHANGE_STATUS'
		});
    };
    
	_handleDeleteClick(e){
		let anchor = e.target;
		let tr = anchor.parentNode.parentNode;
		//console.info(e.target);
		let id = tr.getAttribute('data-requestkey');
		reduxStore.dispatch({
				id: id,
				type: 'REMOVE_REQUEST'
		});
	}
        
	 _handleFilterChange(e){
		const status = e.target.value;
		reduxStore.dispatch({ type:'SET_STATUS_FILTER', filter: status });
	}

};
RequestTable.propTypes = { requests: React.PropTypes.array.isRequired };


class App extends React.Component {
    render() {
        return (
        <div>
            <h1>Requests</h1>
            <RequestTable requests={reduxStore.getState().requestsReducer} status={reduxStore.getState().statusFilter} />
        </div>
        );
    };
};


const render = () => {
	ReactDOM.render(<App />, document.getElementById('container'));
};

reduxStore.subscribe(render);
render();

