import { useRef, useState } from 'react';
import Head from 'next/head';

import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../utils/api-util';

const HomePage = props => {
	const [feedbackItems, setFeedbackItems] = useState([]);

	const emailInputRef = useRef();
	const feedbackInputRef = useRef();

	const submitFormHandler = event => {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredFeedback = feedbackInputRef.current.value;

		const reqBody = {
			email: enteredFeedback,
			text: enteredFeedback
		};

		// Sending collected data from the form
		fetch('/api/feedback', {
					method: 'POST',
					body: JSON.stringify(reqBody),
					headers: {
						'Content-Type': 'application/json'
				}				
		}).then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.log(error));
	};

	function loadFeedbackHandler() {
		fetch('/api/feedback')
			.then(response => response.json())
			.then(data => setFeedbackItems(data.feedback))
			.catch(error => console.log(error));
	};

	const { events } = props;
	console.log("In Home Page");


	return (
		<div>
		<h1 className='center'>Form submission</h1>
		<form onSubmit={submitFormHandler} className="center">
			<div>
				<label htmlFor="email">Email Address</label>
				<input type="email" id='email' ref={emailInputRef}/>
			</div>
			<div>
				<label htmlFor="feedback">Message</label>
				<textarea type="text" rows='5' id='feedback' ref={feedbackInputRef}></textarea>
			</div>
			<button>Send feedback</button>
		</form>
		<hr />
		<div className="center">
			<button onClick={loadFeedbackHandler}>Load Form</button>
			<ul>
				{feedbackItems.map(item => <li key={item.id}>{item.text}</li>)}
			</ul>
		</div>
		<Head>
			<title>
				Pick a Cool Events
			</title>
			<meta 
       			name='description'
       			content="FInd a lot of great events to make your life good" 
       		/>
		</Head>
			<EventList items={events} />
		</div>
	);
};

export async function getStaticProps() {
	const featuredEvents = await getFeaturedEvents();
	return {
		props: {
			events: featuredEvents
		},

		revalidate: 1800 // every half hour the page is regenarates for new requests
	};
}

export default HomePage;