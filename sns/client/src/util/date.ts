export default function parseDate(tDate: string) {
	const created = new Date(Date.parse(tDate));
	const now = new Date();
	const diff = Math.floor((now.getTime() - created.getTime()) / 1000);

	if (diff <= 1) {
		return 'just now';
	}
	if (diff < 60) {
		return `${diff} seconds ago`;
	}
	if (diff <= 3540) {
		return `${Math.round(diff / 60)} minutes ago`;
	}
	if (diff <= 86400) {
		return `${Math.round(diff / 3600)} hours ago`;
	}
	if (diff < 604800) {
		return `${Math.round(diff / 86400)} days ago`;
	}
	if (diff <= 777600) {
		return '1 week ago';
	}

	const month = created.toLocaleDateString('default', { month: 'long' });
	return `on ${month} ${created.getDate()}`;
}
