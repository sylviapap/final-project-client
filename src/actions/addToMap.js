import {API_ROOT, headers} from '../services/api'

const addToMap = (event, markerData, history) => {
  return (dispatch) => {
    return fetch(`${API_ROOT}/map_markers`, {
      method: "POST", 
      headers: headers,
      body: JSON.stringify(markerData)
    })
    .then(response => response.json())
    .catch(error => {
			if (error) {
				console.log(error);
				dispatch({ type: "SET_ERROR", messages: error })
			}
			else {
				return window.alert("addToMap error")
			}
		})
    .then(json => {
      console.log(json);
      dispatch({ type: "ADD_TO_MAP", marker: json })
      history.push('/')
    })
  }
}

export default addToMap