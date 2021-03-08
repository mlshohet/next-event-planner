import { Fragment, useState } from 'react';
import { buildFeedbackPath, extractFeedback } from '../api/feedback';

const FeedbackPage = props => {
	const [feedbackData, setFeedbackData] = useState();
	
	function loadFeedbackHandler(id) {
		fetch(`/api/${id}`)
			.then(response => response.json())
			.then(data => {
				setFeedbackData(data.feedback)
			})
			.catch(err => console.log);
	};

	console.log("feedback data: ",feedbackData);

	return (
		<Fragment>
		{
			feedbackData && <p>{feedbackData.email}</p>
		}
		
		<ul>
			{props.feedbackItems.map(item => (
				<li key={item.id}>
					{item.text}
					<button
						onClick={loadFeedbackHandler.bind(null, item.id)}
					>
						Show Details
					</button>
				</li>
			))}
		</ul>
		</Fragment>
	);
};

export async function getStaticProps() {
	const filePath = buildFeedbackPath();
	const data = extractFeedback(filePath);
	return {
		props: {
			feedbackItems: data
		}
	};
};

export default FeedbackPage;