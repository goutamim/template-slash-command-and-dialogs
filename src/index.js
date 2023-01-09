import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { isVerified } from "./verifySignature.js";
import api from "./api.js";
import { approvalRequest } from "./payloads.js";
import { getRepoList, getTenantList } from "./config.js";

dotenv.config();
const app = express();

const rawBodyBuffer = (req, res, buf, encoding) => {
	if (buf && buf.length) {
		req.rawBody = buf.toString(encoding || "utf8");
	}
};

app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
app.use(bodyParser.json({ verify: rawBodyBuffer }));

app.get("/", (req, res) => {
	res.send("<h2>The Slash Command /deploy app is running</h2> ");
});

app.post("/deploy", async (req, res) => {
	// Verify the signing secret
	if (!isVerified(req)) {
		return res.status(404).send();
	}

	// extract the slash command text, and trigger ID from payload
	const { text, user_id, channel_id } = req.body;
	console.log(req.body);
	const repoName = text.split(" ")[0];
	const tenantName = text.split(" ")[1];
	//const buildStaus = getBuildStatus

	if (
		getRepoList().includes(repoName) &&
		getTenantList(repoName)?.includes(tenantName)
	) {
		//post in production channel

		console.log("repo exists");
		let data = {
			requester: user_id,
			reponame: text,
			channel: "C049H541U15",
		};
		console.log(await api.getLastRunStatusOfaWorkflow());
		process.exit(0);
		await api.callAPIMethodPost("chat.postMessage", approvalRequest(data));
		console.log("called  approval  message api to send to channel");
	} else {
		// repo or tenant  dont exist
		console.log("repo or tenant dont exist");
		//return res.status(404).send("tenant  or repo not found");
		let data = { requester: user_id, reponame: text, channel: channel_id };
		await api.norepoTenant(data);
		console.log("calling norepoTenant api");
	}

	return res.send("");
});

/*
 * Endpoint to receive the dialog submission. Checks the verification token
 * and creates a Helpdesk ticket
 */
app.post("/interactive", async (req, res) => {
	// Verify the signing secret
	if (!isVerified(req)) {
		return res.status(404).send();
	}

	const payload = JSON.parse(req.body.payload);
	console.log(payload);
	if (payload.type === "block_actions") {
		// acknowledge the event before doing heavy-lifting on our servers
		res.status(200).send();

		let action = payload.actions[0];

		switch (action.action_id) {
			case "approve":
				console.log("approval started");
				await api.callgitAPIMethodPost(JSON.parse(action.value));
				console.log("github api called");
				await api.postApproval(payload, JSON.parse(action.value));
				console.log("approved");
				break;
			case "reject":
				await api.rejectApproval(payload, JSON.parse(action.value));
				console.log("rejected");
				break;
		}
	} else if (payload.type === "view_submission") {
		return handleViewSubmission(payload, res);
	}

	res.send("");
});

const server = app.listen(process.env.PORT || 5000, () => {
	console.log(
		"Express server listening on port %d in %s mode",
		server.address().port,
		app.settings.env
	);
});
