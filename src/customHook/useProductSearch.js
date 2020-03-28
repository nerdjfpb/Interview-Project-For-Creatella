import { useEffect, useState } from 'react'
import { getProducts } from '../service/product.service'

export default function useProduct(
	numberOfProductsPerPage,
	pageNumber,
	sortBy
) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [products, setProducts] = useState([])
	const [hasMore, setHasMore] = useState(false)

	useEffect(() => {
		setProducts([])
	}, [sortBy])

	useEffect(() => {
		setLoading(true)
		setError(false)

		getProducts(numberOfProductsPerPage, pageNumber, sortBy)
			.then(res => {
				setProducts(prevState => {
					return [...prevState, ...res.data]
				})
				setHasMore(res.data.length > 0)
				setLoading(false)
			})
			.catch(error => {
				setError(error.message)
				setLoading(false)
			})
	}, [numberOfProductsPerPage, pageNumber, sortBy])

	return { loading, error, products, hasMore }
}
