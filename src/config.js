const repoTenantList = [
	{ repo: "penknife-ui", tenant: ["demo", "practifly", "314ecorp","314einternal"] },
	{ repo: "penknife-app", tenant: ["demo", "practifly", "314ecorp","314einternal"]}, //penknife-app and cli same image. 
	{ repo: "practifly-server", tenant: ["demo1","demo2","mhill","phs","nephc"] }, //DNS practifly.com //practifly practifly-cli same image.
	{ repo: "practifly-ui", tenant: ["demo1","demo2","mhill","phs","nephc"] },
];

const apiUrl = "https://slack.com/api";
const githubUrl = "https://api.github.com";

const getRepoList = () => repoTenantList.map((i) => i.repo);

const getTenantList = (repoName) =>
	repoTenantList.filter((i) => i.repo == repoName)[0]?.tenant ?? [];

export { repoTenantList, getRepoList, getTenantList, apiUrl, githubUrl };
