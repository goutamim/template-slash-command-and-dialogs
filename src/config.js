const repoTenantList = [
	{ repo: "penknife-ui", tenant: ["demo", "practifly", "314ecorp","314einternal"] },
	{ repo: "penknife-app", tenant: ["demo", "practifly", "314ecorp","314einternal"]}, //penknife-app and cli same image. 
	{ repo: "practifly-server", tenant: ["demo1","demo2","mhill","phs","nephc"] }, //DNS practifly.com //practifly practifly-cli same image.
	{ repo: "practifly-ui", tenant: ["demo1","demo2","mhill","phs","nephc"] },
	{ repo: "heim-ui", tenant:["314e"]}, 
	{ repo: "heim-server",tenant:["314e"]}, //heim.314ecorp.com //only server
	{ repo: "dms-ui", tenant:["demo1"]}, 
	{ repo: "dms-app", tenant:["demo1"]}, //cli and server \
	{ repo: "jeeves-ui", tenant:["314e","demo1","jmh","ryan","sales","uci"]}, 
	{ repo: "jeeves-app", tenant:["314e","demo1","jmh","ryan","sales","uci"]} //cli and server 

];

const apiUrl = "https://slack.com/api";
const githubUrl = "https://api.github.com";

const getRepoList = () => repoTenantList.map((i) => i.repo);

const getTenantList = (repoName) =>
	repoTenantList.filter((i) => i.repo == repoName)[0]?.tenant ?? [];

export { repoTenantList, getRepoList, getTenantList, apiUrl, githubUrl };