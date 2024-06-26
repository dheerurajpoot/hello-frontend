// export const USER_API_END_POINT =
// 	"https://hello-backend-baz0.onrender.com/api/v1/user";
// export const POST_API_END_POINT =
// 	"https://hello-backend-baz0.onrender.com/api/v1/post";
export const USER_API_END_POINT = "http://localhost:3000/api/v1/user";
export const POST_API_END_POINT = "http://localhost:3000/api/v1/post";
export const CHAT_API_END_POINT = "http://localhost:3000/api/v1/chat";
export const MESSAGE_API_END_POINT = "http://localhost:3000/api/v1/message";

export const postTiming = (timestamp) => {
	let time = Date.parse(timestamp);
	let now = Date.now();
	let secondsPast = (now - time) / 1000;
	let suffix = "ago";

	let intervals = {
		year: 31536000,
		month: 2592000,
		week: 604800,
		day: 86400,
		hour: 3600,
		minute: 60,
		second: 1,
	};

	for (let i in intervals) {
		let interval = intervals[i];
		if (secondsPast >= interval) {
			let count = Math.floor(secondsPast / interval);
			return `${count} ${i} ${count > 1 ? "" : ""} ${suffix}`;
		}
	}
};
