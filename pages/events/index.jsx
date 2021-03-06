import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getAllEvents } from '../../data';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/event-detail/events-search';

const AllEventsPage = props => {
	const router = useRouter();
	const events = getAllEvents();
	const findEventsHandler = (year, month) => {
		//navigation programmatically by useRouter
		const fullPath =`/events/${year}/${month}`;
		router.push(fullPath);
	};

	return (
		<Fragment>
			<EventsSearch onSearch={findEventsHandler} />
			<EventList
				items={events}
			/>
		</Fragment>
	);
};

export default AllEventsPage