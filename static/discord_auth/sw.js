self.addEventListener("install", () => {
	console.log("설치중...")
});

self.addEventListener("activate", () => {
	console.log("작동 시작.")
});

self.addEventListener("message", e => {
	console.log(e.data);
	if (e.data === "run") {
		const c = new self.WebSocket("ws://localhost:6463/?client_id=409389243211710464");
		c.onopen = function() {
			console.log("WS 연결됨.")
			c.send(JSON.stringify({
				nonce: "f48f6176-4afb-4c03-b118-d960861f5216",
				args: {
					client_id: "409389243211710464",
					scopes: ["rpc", "identify"]
				},
				cmd: "AUTHORIZE"
			}));
		}

		c.onmessage = function(m) {
			console.log(m)
		}

		c.onclose = function() {
			console.log("WS 연결닫힘.")
		}

		c.onerror = function(e) {
			console.error(e)
		}
	}
});