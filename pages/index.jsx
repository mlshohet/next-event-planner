import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../utils/api-util';

const HomePage = props => {
	const { events } = props;
	console.log("In Home Page");


	return (
		<div>
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