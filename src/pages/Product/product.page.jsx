import React, { useState, useRef, useCallback } from 'react'
import { Row, Col } from 'react-bootstrap'
import { uuid } from 'uuidv4'

import useProductSearch from '../../customHook/useProductSearch'
import Card from '../../components/Card/card.component'

const ProductPage = () => {
	const numberOfProductsPerPage = 20
	const [pageNumber, setPageNumber] = useState(1)
	const [sortBy, setSortBy] = useState('price')
	const [endLoading, setEndLoading] = useState(false)

	const { products, hasMore, loading, error } = useProductSearch(
		numberOfProductsPerPage,
		pageNumber,
		sortBy
	)

	const observer = useRef()
	const lastProductElementRef = useCallback(
		node => {
			if (loading) return
			if (observer.current) observer.current.disconnect()
			observer.current = new IntersectionObserver(entries => {
				if (!hasMore) {
					setEndLoading(true)
				} else {
					if (entries[0].isIntersecting) {
						setPageNumber(prevPageNumber => prevPageNumber + 1)
					}
				}
			})
			if (node) observer.current.observe(node)
		},
		[loading, hasMore]
	)

	const handleSortByChange = event => {
		event.preventDefault()
		setSortBy(event.target.value)
	}

	return (
		<Row className='m-5'>
			<Col md={12} className='text-center display-4 mb-5'>
				Products
			</Col>

			<Col md={12} className='mb-5 text-right lead'>
				Sort By &nbsp;
				<select onChange={handleSortByChange}>
					<option value='price'>Price</option>
					<option value='id'>Id</option>
					<option value='size'>Size</option>
				</select>
			</Col>

			{products.map((product, index) => {
				if ((index + 1) % 20 === 0 && products.length !== index + 1) {
					return (
						<React.Fragment key={product.id}>
							<Col md={3}>
								<Card product={product} />
							</Col>
							<Col md={12}>
								<img
									src={`http://localhost:3000/ads/?r=${uuid()}`}
									alt='ads'
									style={{
										width: '100%'
									}}
								/>
							</Col>
						</React.Fragment>
					)
				}
				if (products.length === index + 1) {
					return (
						<Col md={3} ref={lastProductElementRef} key={product.id}>
							<Card product={product} />
						</Col>
					)
				} else {
					return (
						<Col md={3} key={product.id}>
							<Card product={product} />
						</Col>
					)
				}
			})}

			{loading && (
				<Col md={12} className='text-center'>
					<div className='spinner-border m-5 text-primary' role='status'>
						<span className='sr-only'>Loading...</span>
					</div>
				</Col>
			)}

			{error && (
				<Col md={12} className='bg-danger text-center text-white p-3'>
					{error}
				</Col>
			)}

			{endLoading && (
				<Col md={12} className='bg-danger text-center text-white p-3'>
					End of catalogue
				</Col>
			)}
		</Row>
	)
}

export default ProductPage
