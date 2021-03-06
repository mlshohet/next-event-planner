import { Fragment } from 'react';
import { useRouter } from 'next/router';

import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

import { getEventById } from '../../data';

const EventDetailsPage = props => {
	const router = useRouter();

	const eventId = router.query.eventId;
	const event = getEventById(eventId);

	if (!event) {
		return (
			<Fragment>
				<ErrorAlert>
					<p>No events found.</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events' >Back to Events</Button>
				</div>
			</Fragment>
		);
	}

	return (
		<Fragment>
			<EventSummary 
				title={event.title}
			/>
			<EventLogistics
				date={event.date}
				address={event.location}
				image={event.image}
				imageAlt={event.title}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
		</Fragment>

	);
};

export default EventDetailsPage;