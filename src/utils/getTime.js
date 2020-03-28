export const getTimeDifference = date => {
	let currentDate = new Date(Date.now())
	let oldDate = new Date(date)

	let differenceInDays = Math.round(
		(currentDate - oldDate) / (1000 * 60 * 60 * 24)
	)

	let differenceInHours = Math.round((currentDate - oldDate) / (1000 * 60 * 60))

	if (differenceInDays <= 7) {
		if (differenceInDays === 0) return `${differenceInHours} hours ago`
		if (differenceInDays === 1) return `${differenceInDays} day ago`
		else if (differenceInDays === 7) return '1 week ago'
		else return `${differenceInDays} days ago`
	} else {
		return date
	}
}
