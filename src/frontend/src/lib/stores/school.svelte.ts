import { mockSchools } from '$lib/data/mockData';
import type { School, SchoolStatus, SubscriptionPlan } from '$lib/types';

export function createSchoolStore() {
	let schools = $state(mockSchools);
	let selectedSchool = $state<School | null>(null);
	let filters = $state({
		state: 'All',
		plan: 'All' as SubscriptionPlan | 'All',
		status: 'All' as SchoolStatus | 'All',
		search: ''
	});

	const filteredSchools = $derived(() => {
		return schools.filter((school) => {
			const matchState = filters.state === 'All' || school.state === filters.state;
			const matchPlan = filters.plan === 'All' || school.subscriptionPlan === filters.plan;
			const matchStatus = filters.status === 'All' || school.status === filters.status;
			const matchSearch =
				!filters.search ||
				school.name.toLowerCase().includes(filters.search.toLowerCase()) ||
				school.district.toLowerCase().includes(filters.search.toLowerCase());
			return matchState && matchPlan && matchStatus && matchSearch;
		});
	});

	return {
		get schools() { return schools; },
		get selectedSchool() { return selectedSchool; },
		set selectedSchool(v) { selectedSchool = v; },
		get filters() { return filters; },
		get filteredSchools() { return filteredSchools(); },
		setFilters(f: Partial<typeof filters>) {
			filters = { ...filters, ...f };
		}
	};
}

export const schoolStore = createSchoolStore();
