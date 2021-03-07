export const getData = async () => {
	const eventData = await fetch(`https://nxt-events-planner-default-rtdb.firebaseio.com/events.json`);
	console.log("EventData: ", eventData);
	const jsonEvent = await eventData.json();
	console.log("Json: ", jsonEvent);
	const transformedEvents = [];

	for (const key in jsonEvent) {
		transformedEvents.push({
			id: key,
			...jsonEvent[key]
		});
	}

	console.log("out of getData: ", transformedEvents);
	return transformedEvents;
};

export async function getFeaturedEvents() {
	const data = await getData();
	return data.filter((event) => event.isFeatured);
};

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents= await getData();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
};