import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Heatmap from 'heatmapjs/build/heatmap.js'

class ReactHeatmap extends Component {

	constructor(props) {
		super(props);
		this.setData = this.setData.bind(this);
	}

	componentDidMount() {
		this.heatmap = Heatmap.create({
		  container: ReactDOM.findDOMNode(this),
		  ...this.props.configObject
		});
		this.setData(this.props.max, this.props.data);
	}

	componentWillReceiveProps(newProps) {
		this.setData(newProps.max, newProps.data);
	}

	setData(max, data) {
		this.heatmap.setData({
		  max: max,
		  data: this.computeData(data)
		});
	}

	computeData(data) {
		if(this.props.unit === 'percent') {
			let container = {};
			container.width = ReactDOM.findDOMNode(this).offsetWidth;
			container.height = ReactDOM.findDOMNode(this).offsetHeight;
			return data.map(function(values, index) {
				return {
					x : values.x/100 * container.width,
					y : values.y/100 * container.height,
					value: values.value
				}
			})
		} else {
			return data;
		}
	}

	render () {
		return( 
			<div style={{width: '100%', height: '100%'}}></div>
		);
	}
}

ReactHeatmap.propTypes = {
	max : PropTypes.number,
	data : PropTypes.array,
	unit : PropTypes.string,
	configObject : PropTypes.object
}

ReactHeatmap.defaultProps = {
	max: 5,
	data: [],
	unit: 'percent',
	configObject: {}
}

export default ReactHeatmap
