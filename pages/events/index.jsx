import Head from 'next/head';
import { Fragment } from 'react';
import { useRouter } from 'next/router';

import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/event-detail/events-search';

import { getData } from '../../utils/api-util';

const AllEventsPage = props => {
	const { events } = props;
	const router = useRouter();

	const findEventsHandler = (year, month) => {
		//navigation programmatically by useRouter
		const fullPath =`/events/${year}/${month}`;
		router.push(fullPath);
	};

	return (
		<Fragment>
			<Head>
				<title>
					Pick a Cool Events
				</title>
				<meta 
	       			name='description'
	       			content="FInd a lot of great events to make your life good" 
	       		/>
			</Head>
			<EventsSearch onSearch={findEventsHandler} />
			<EventList
				items={events}
			/>
		</Fragment>
	);
};

export async function getStaticProps () {
	const events = await getData();

	return {
		props: {
			events: events
		},
		revalidate: 60 //every min regenerates for new requests
	};
};


export default AllEventsPage




