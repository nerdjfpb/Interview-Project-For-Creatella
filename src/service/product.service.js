import axios from 'axios'

const apiEndPoint = 'http://localhost:3000/products'

export const getProducts = (numberOfProductsPerPage, pageNumber, sortBy) => {
	return axios({
		method: 'GET',
		url: apiEndPoint,
		params: {
			_limit: numberOfProductsPerPage,
			_page: pageNumber,
			_sort: sortBy
		}
	})
}
