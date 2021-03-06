import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../data';


const HomePage = props => {
	const featuredEvents = getFeaturedEvents();
	console.log("In Home Page");


	return (
		<div>
			<EventList items={featuredEvents} />
		</div>
	);
};

export default HomePage;