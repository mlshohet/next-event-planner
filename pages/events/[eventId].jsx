import Head from 'next/head';
import { Fragment } from 'react';

import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

import { getData, getFeaturedEvents } from '../../utils/api-util';

const EventDetailsPage = props => {

	const { loadedEvent } = props;

	if (!loadedEvent) {
		return (
			<Fragment>
				<Head>
					<title>
						{event.title }
					</title>
					<meta 
		       			name='description'
		       			content={event.description} 
		       		/>
				</Head>
				<div className="center">
					<p>Loading...</p>
				</div>
			</Fragment>
		);
	}

	return (
		<Fragment>
			<EventSummary title={loadedEvent.title} />
			<EventLogistics 
				date={loadedEvent.date}
				address={loadedEvent.location}
				image={loadedEvent.image}
				imageAlt={loadedEvent.title}
			/>
			<EventContent>			
				<p>{loadedEvent.description}</p>
			</EventContent>
		</Fragment>
	);
};

export async function getStaticProps(context) {
	const { params } = context;
	console.log("Params: ",params);

	const eventId = params.eventId;

	const data = await getData();

  	const event = data.find(event =>
  		event.id === eventId
  	);

  	console.log('event ID: ', event);

  	return {
  		props: {
  			loadedEvent: event
  		},
  		revalidate: 60 // every 30 seconds a page regenerates for a new request
  	};
}

export async function getStaticPaths() {
	const events = await getFeaturedEvents();

	const ids = events.map(event => event.id);

	const pathsWithParams = ids.map(id => ({
	 	params: {
	 		eventId: id
	 	}
	 }));
 	
	return {
			paths: pathsWithParams,
			fallback: true // there are more pages that were registered with static paths
		};
}

export default EventDetailsPage;